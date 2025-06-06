// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectsPage from '../src/pages/projects-page/projects-page';
import BoardPage from '../src/pages/board-page/board-page';
import IssuesPage from '../src/pages/issues-page/issues-page';
import { GlobalStyle } from '../src/styles/theme';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/boards" element={<ProjectsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
