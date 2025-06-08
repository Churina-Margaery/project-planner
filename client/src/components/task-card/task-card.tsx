import { Card } from 'antd';
import styled from 'styled-components';

export const TaskCard = styled(Card).attrs({ size: 'small' }) <{ onClick?: () => void }>`
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  transition: border-color 0.2s;

  &:hover,
  &:focus-within {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 1px var(--accent);
  }
`;
