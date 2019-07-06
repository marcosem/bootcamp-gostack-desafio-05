import { createGlobalStyle } from 'styled-components';

// box-sizing: border-box - make the element box not resize when adding a padding to it
// 280px of box + 10px of padding is not equal to 300px, it will be 260px of box and
// 10px of padding each side

// -webkit-font-smoothing - Make the fonts more defined

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

`;
