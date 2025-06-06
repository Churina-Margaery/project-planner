// src/components/TaskCard.tsx
import { Card } from 'antd';
import styled from 'styled-components';

export const TaskCard = styled(Card).attrs({ size: 'small', bordered: true })`
  margin-bottom: 12px;
`;
