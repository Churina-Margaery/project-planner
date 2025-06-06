import { createGlobalStyle } from 'styled-components';

export const ACCENT = '#c7b7ff';

export const GlobalStyle = createGlobalStyle`
  :root {
    --accent: ${ACCENT};
    --text-main: #000;
    --bg-main:  #fff;
  }

  body {
    background: var(--bg-main);
    color: var(--text-main);
  }

  .ant-btn-primary, .ant-tabs-ink-bar {
    background: var(--accent) !important;
  }
`;
