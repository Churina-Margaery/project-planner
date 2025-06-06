// src/components/BoardColumn.tsx
import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

const ColumnWrapper = styled.div`
  flex: 1;
  min-width: 240px;
  border: 1px solid #1677ff;
  border-top: none;
`;

const ColumnHeader = styled.div`
  font-weight: 600;
  text-align: center;
  padding: 8px;
  border-top: 4px solid #1677ff;
  color: #1677ff;
`;

export const BoardColumn: React.FC<{ title: string; children?: ReactNode }> = ({ title, children }) => (
  <ColumnWrapper>
    <ColumnHeader>{title}</ColumnHeader>
    <div style={{ padding: 12 }}>{children}</div>
  </ColumnWrapper>
);
