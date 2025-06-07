// src/components/NavigationBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Layout, Button } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

const NavLink = styled(Link) <{ $active?: boolean }>`
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'inherit')};
  margin-right: 16px;
`;

interface Props {
  onCreateClick?: () => void;
}

export const Navigation: React.FC<Props> = ({ onCreateClick }) => {
  const { pathname } = useLocation();
  return (
    <Header style={{ background: 'transparent', paddingInline: 24, display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <NavLink to="/issues" $active={pathname.startsWith('/issues')}>Все задачи</NavLink>
        <NavLink to="/boards" $active={pathname.startsWith('/boards') || pathname.startsWith('/board')}>Проекты</NavLink>
      </div>

      <Button style={{ margin: '20px' }} type="primary" onClick={onCreateClick}>Создать задачу</Button>
    </Header>
  );
};
