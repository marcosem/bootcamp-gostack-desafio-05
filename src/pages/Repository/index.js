import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  States,
  StateButton,
  Navigation,
  NavButton,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    states: 'open', // Possible states: all, open, and closed. open is the default
    redrawing: false,
    repoName: '',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { states, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    // Two url is called together, no need to wait one before start another
    // const response = await api.get(`/repos/${repoName}`);
    // const issues = await api.get(`/repos/${repoName}/issues`);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: states, // 'open',
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      repoName,
    });
  }

  reLoadPage = async () => {
    const { repoName, states, page } = this.state;

    await this.setState({
      redrawing: true,
    });

    const issues = await api.get(
      `/repos/${repoName}/issues?state=${states}&per-page=5&page=${page}`
    );

    this.setState({
      issues: issues.data,
      redrawing: false,
    });
  };

  handleStateChange = async e => {
    const { states } = this.state;

    if (e.target.id === states) {
      return;
    }

    await this.setState({
      states: e.target.id,
      page: 1,
    });

    this.reLoadPage();
  };

  handlePageChange = async action => {
    const { page } = this.state;
    const newPage = action === 'next' ? page + 1 : page - 1;

    await this.setState({
      page: newPage,
    });

    this.reLoadPage();
  };

  render() {
    const { repository, issues, loading, redrawing, states, page } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Return</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <States>
          <StateButton
            id="all"
            onClick={this.handleStateChange}
            redrawing={redrawing ? 1 : 0}
            states={states}
            disabled={states === 'all'}
          >
            All
          </StateButton>
          <StateButton
            id="open"
            onClick={this.handleStateChange}
            redrawing={redrawing ? 1 : 0}
            states={states}
            disabled={states === 'open'}
          >
            Opened
          </StateButton>
          <StateButton
            id="closed"
            onClick={this.handleStateChange}
            redrawing={redrawing ? 1 : 0}
            states={states}
            disabled={states === 'closed'}
          >
            Closed
          </StateButton>
        </States>
        <Navigation>
          <NavButton
            id="back"
            onClick={() => this.handlePageChange('back')}
            disabled={page < 2 || redrawing}
          >
            <FaChevronLeft color="#fff" size={10} />
          </NavButton>
          <strong>{`Page ${page}`}</strong>
          <NavButton
            id="next"
            onClick={() => this.handlePageChange('next')}
            disabled={redrawing}
          >
            <FaChevronRight color="#fff" size={10} />
          </NavButton>
        </Navigation>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
