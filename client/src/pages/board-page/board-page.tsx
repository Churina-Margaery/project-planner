// src/pages/BoardPage.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout, Space, Spin, Typography } from 'antd';
import { Navigation } from '../../components/header/navigation';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskForm } from '../../components/task-form/task-form';
import type { Task } from '../../services/api/types';
import { getBoardTasks } from '../../services/api/boards';

const { Content } = Layout;
export default function BoardPage() {
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getBoardTasks(Number(id))
      .then(setTasks)
      .catch((e) => setError(e?.message || 'Ошибка загрузки задач'))
      .finally(() => setLoading(false));
  }, [id]);

  const todo = tasks.filter(t => t.status === 'Backlog');
  const inProgress = tasks.filter(t => t.status === 'InProgress');
  const done = tasks.filter(t => t.status === 'Done');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>Название проекта {id}</h2>

        {loading && <Spin />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}

        {!loading && !error && (
          <Space align="start" size={16} style={{ display: 'flex' }}>
            <BoardColumn title="To do">
              {todo.map((task) => (
                <TaskCard key={task.id} onClick={() => setDrawerOpen(true)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
            <BoardColumn title="In progress">
              {inProgress.map((task) => (
                <TaskCard key={task.id} onClick={() => setDrawerOpen(true)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
            <BoardColumn title="Done">
              {done.map((task) => (
                <TaskCard key={task.id} onClick={() => setDrawerOpen(true)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
          </Space>
        )}
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