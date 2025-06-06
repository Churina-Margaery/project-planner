// src/pages/BoardsPage.tsx
import { useState } from 'react';
import { Layout, Card, Button, Space } from 'antd';
import styled from 'styled-components';
import { Navigation } from '../../components/header/navigation';
import { TaskForm } from '../../components/task-form/task-form';

const { Content } = Layout;

const BoardCard = styled(Card)`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

export default function BoardsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      < Content style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        {
          [1, 2, 3].map((id) => (
            <BoardCard key={id} >
              <span>Название проекта {id} </span>
              < Button type="link" > Перейти к доске </Button>
            </BoardCard>
          ))
        }
      </Content>

      < TaskForm open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={() => { }} />
    </Layout>
  );
}
