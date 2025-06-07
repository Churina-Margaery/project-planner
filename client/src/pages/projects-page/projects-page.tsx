import { useState } from 'react';
import { Layout, Card } from 'antd';
import styled from 'styled-components';
import { Navigation } from '../../components/header/navigation';
import { TaskForm } from '../../components/task-form/task-form';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const BoardCard = styled(Card)`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between !important;

  .ant-card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 10px;
    gap: 60px;
    width: 100%;
  }
`;

export default function BoardsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      < Content style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
        {
          [1, 2, 3, 34567, 456789, 4567, 3456, 1234, 234567, 789].map((id) => (
            <BoardCard key={id} >
              <span>Название проекта {id} </span>
              {/* < Button type="link" > Перейти к доске </Button> */}
              <Link to={`/board/${id}`}>Перейти к доске</Link>
            </BoardCard>
          ))
        }
      </Content>

      < TaskForm open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={() => { }} />
    </Layout >
  );
}
