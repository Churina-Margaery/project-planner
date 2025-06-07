import { createGlobalStyle } from 'styled-components';

export const ACCENT = '#c7b7ff';
export const ACCENT_DARK = '#795fd3';

export const GlobalStyle = createGlobalStyle`

  html, body, #root {
    height: 100%;
  }
    
  :root {
    --accent: ${ACCENT};
    --accent-dark: ${ACCENT_DARK};
    --text-main: #000;
    --bg-main:  #f5f5f5 !important;
  }

  body {
    background: var(--bg-main);
    color: var(--text-main);
  }

  .ant-btn-primary, .ant-tabs-ink-bar {
    background: var(--accent) !important;
    border: none !important;
  }
  
  .ant-btn-primary:hover,
  .ant-btn-primary:focus, {
    transform: scale(1.07);
    border: none !important;
    transition: all 0.3s ease !important;
    outline: none !important;
    box-shadow: none !important;
    border: var(--accent-dark) 1px solid !important;
  };
`;
