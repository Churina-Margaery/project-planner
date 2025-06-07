import { useState } from 'react';
import { Layout, Card, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';

import { Navigation } from '../../components/header/navigation';
import { TaskForm } from '../../components/task-form/task-form';
import { getBoards } from '../../services/api/boards';
import type { Board } from '../../services/api/types';

const { Content } = Layout;

const BoardCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;

  .ant-card-body {
    display: flex;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 30px;
    padding-bottom: 30px;
    gap: 30px;
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  margin-left: auto; // всегда прижимает к правому краю
`;

export default function BoardsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBoards()
      .then(setBoards)
      .catch((e) => setError(e?.message || 'Ошибка загрузки проектов'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        {loading && <Spin />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}

        {!loading && !error && boards.map((board) => (
          <BoardCard key={board.id}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{board.name}</div>
              <div style={{ color: '#888', marginTop: 4, marginBottom: 4 }}>{board.description}</div>
              <div style={{ color: '#b89cff' }}>Задач: {board.taskCount}</div>
            </div>
            <StyledLink to={`/board/${board.id}`}>Перейти к доске</StyledLink>
          </BoardCard>
        ))}
      </Content>

      < TaskForm open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={() => { }} />
    </Layout >
  );
}
