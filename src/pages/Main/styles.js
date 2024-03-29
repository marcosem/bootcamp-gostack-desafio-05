import styled, { keyframes, css } from 'styled-components';

/*
export const Title = styled.h1`
  color: #fff;
`;

box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
0 0 (x e y), 20px blur, color 10% of oppacity

padding: 10px 15px;
10px top and botton, 15px left and right
*/

/*
  Align the content to the center
  display: flex;
  justify-content: center;
  align-items: center;
*/

/*
  & + li { }  Only apply the css if the condition is li followed by li
*/

/* -- Moved to ../../components/Container/index.js
export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;
*/

export const Form = styled.form.attrs(props => ({
  bNotFound: props.bNotFound,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }

  ${props =>
    props.bNotFound &&
    css`
      input {
        border: 2px solid #f00;
      }
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 15px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
