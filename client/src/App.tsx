import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import ProjectsPage from '../src/pages/projects-page/projects-page';
import BoardPage from '../src/pages/board-page/board-page';
import IssuesPage from '../src/pages/issues-page/issues-page';
import { GlobalStyle } from '../src/styles/theme';

const AppContainer = styled.div`
  min-height: 100vh;
  height: 100vh;
  min-width: 100vw;
  display: flex;
  flex: 1;
  overflow: auto;
`;

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/issues" replace />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/boards" element={<ProjectsPage />} />
          <Route path="/board/:id" element={<BoardPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}
