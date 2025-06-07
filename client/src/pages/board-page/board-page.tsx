// src/pages/BoardPage.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Layout, Space } from 'antd';
import { Navigation } from '../../components/header/navigation';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskForm } from '../../components/task-form/task-form';

const { Content } = Layout;

export default function BoardPage() {
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>Название проекта {id}</h2>

        <Space align="start" size={16} style={{ display: 'flex' }}>
          <BoardColumn title="To do">
            <TaskCard onClick={() => setDrawerOpen(true)} >Задача 1</TaskCard>
            <TaskCard>Задача 3</TaskCard>
          </BoardColumn>

          <BoardColumn title="In progress">
            <TaskCard>Задача 4</TaskCard>
          </BoardColumn>

          <BoardColumn title="Done">
            <TaskCard>Задача 2</TaskCard>
          </BoardColumn>
        </Space>
      </Content>

      <TaskForm
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={() => { }}
        initialValues={{ projectId: id }}
        projectLocked
      />
    </Layout>
  );
}
