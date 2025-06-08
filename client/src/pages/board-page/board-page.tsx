import { useEffect, useState } from 'react';
import { Layout, Space, Spin, Typography } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { Navigation } from '../../components/header/navigation';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskForm } from '../../components/task-form/task-form';
import type { Board, Task } from '../../services/api/types';
import type { TaskFormValues } from '../../components/task-form/task-form';
import { getBoards, getBoardTasks } from '../../services/api/boards';

const { Content } = Layout;
export default function BoardPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();


  const params = new URLSearchParams(location.search);
  const openTaskId = params.get('task');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<TaskFormValues> | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [wasTaskOpened, setWasTaskOpened] = useState(false);

  useEffect(() => {
    getBoards().then(setBoards);
  }, []);

  const board = boards.find(b => b.id === Number(id));

  const fetchTasks = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getBoardTasks(Number(id))
      .then(setTasks)
      .catch((e) => setError(e?.message || 'Ошибка загрузки задач'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!tasks.length || !openTaskId || drawerOpen) return;
    const task = tasks.find(t => t.id === Number(openTaskId));
    if (task) {
      setInitialValues({
        id: task.id,
        title: task.title,
        description: task.description,
        boardId: Number(id),
        priority: task.priority,
        status: task.status,
        assigneeId: task.assignee?.id,
        boardName: task.boardName,
      });
      setDrawerOpen(true);
      setWasTaskOpened(true);
    }
  }, [tasks, openTaskId, wasTaskOpened, id, drawerOpen]);

  const handleCardClick = (task: Task) => {
    if (openTaskId) return;
    setInitialValues({
      id: task.id,
      title: task.title,
      description: task.description,
      boardId: Number(id),
      priority: task.priority,
      status: task.status,
      assigneeId: task.assignee?.id,
      boardName: task.boardName,
    });
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (drawerOpen && openTaskId) {
      navigate(`/board/${id}`, { replace: true });
    }
  }, [drawerOpen, openTaskId, id, navigate]);


  const handleCreateClick = () => {
    setInitialValues(undefined);
    setInitialValues({ boardId: Number(id) });
    setDrawerOpen(true);
  };

  const todo = tasks.filter(t => t.status === 'Backlog');
  const inProgress = tasks.filter(t => t.status === 'InProgress');
  const done = tasks.filter(t => t.status === 'Done');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation onCreateClick={handleCreateClick} />
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ marginBottom: 24 }}>{board?.name}</h2>

        {loading && <Spin />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}

        {!loading && !error && (
          <Space align="start" size={16} style={{ display: 'flex' }}>
            <BoardColumn title="To do">
              {todo.map((task) => (
                <TaskCard key={task.id} onClick={() => handleCardClick(task)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
            <BoardColumn title="In progress">
              {inProgress.map((task) => (
                <TaskCard key={task.id} onClick={() => handleCardClick(task)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
            <BoardColumn title="Done">
              {done.map((task) => (
                <TaskCard key={task.id} onClick={() => handleCardClick(task)}>
                  {task.title}
                </TaskCard>
              ))}
            </BoardColumn>
          </Space>
        )}
      </Content>

      <TaskForm
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setInitialValues(undefined);
          fetchTasks();
        }}
        initialValues={initialValues}
        projectLocked
      />

    </Layout>
  );
}
