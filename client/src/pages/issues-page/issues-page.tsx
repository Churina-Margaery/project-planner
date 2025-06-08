import { useEffect, useState } from "react";
import { Layout, Button, Row, Col, Input, Card, Spin, Typography, Select } from "antd";
import styled from "styled-components";

import { Navigation } from "../../components/header/navigation";
import { TaskForm } from "../../components/task-form/task-form";
import type { TaskFormValues } from "../../components/task-form/task-form";
import { getTasks } from "../../services/api/tasks";
import type { Board, Task } from "../../services/api/types";
import { getBoards } from "../../services/api/boards";

const { Content } = Layout;

const TaskCard = styled(Card)`
  margin-bottom: 16px;
  margin: 2px;
  display: flex;
  border-radius: 8px;
  .ant-card-body {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 30px 24px;
    width: 100%;
    background: transparent;
  }
  &:hover,
  &:focus-within {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 1px var(--accent);
  }
`;

const TasksScrollArea = styled.div`
  max-height: 60vh;
  min-height: 240px;
  overflow-y: auto;
  margin-bottom: 32px;
`;

const BottomBar = styled.div`
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  position: sticky;
  bottom: 0;
  z-index: 2;
`;

export default function IssuesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialValues, setInitinalValues] = useState<Partial<TaskFormValues> | undefined>(undefined);
  const [reloadKey, setReloadKey] = useState(0);
  const reloadTasks = () => setReloadKey((k) => k + 1);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardClickHandler = (task: Task) => {
    setDrawerOpen(true);
    setInitinalValues({
      id: task.id,
      title: task.title,
      description: task.description,
      boardId: task.boardId,
      priority: task.priority,
      status: task.status,
      assigneeId: task.assignee?.id,
      boardName: task.boardName,
    });
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAssignee, setSearchAssignee] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [boardFilter, setBoardFilter] = useState<number | undefined>(undefined);

  const [boards, setBoards] = useState<Board[]>([]);

  const filteredTasks = tasks.filter(task => {
    const matchesTitle = task.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAssignee = task.assignee?.fullName?.toLowerCase().includes(searchAssignee.toLowerCase()) ||
      task.assignee?.email?.toLowerCase().includes(searchAssignee.toLowerCase()) || false;

    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesBoard = boardFilter ? task.boardId === boardFilter : true;

    return matchesTitle && matchesAssignee && matchesStatus && matchesBoard;
  });


  useEffect(() => {
    getBoards().then(setBoards);
  }, []);


  useEffect(() => {
    setLoading(true);
    setError(null);
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e?.message || "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, [reloadKey]);

  console.log("issues-page", boards, filteredTasks);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", height: "100vh" }}>
        <Row gutter={16} style={{ marginBottom: 32, alignItems: "flex-end" }}>
          <Col flex="auto">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Input.Search
                placeholder="Поиск по названию задачи"
                allowClear
                size="large"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
              />
              <Input.Search
                placeholder="Поиск по исполнителю"
                allowClear
                size="large"
                value={searchAssignee}
                onChange={e => setSearchAssignee(e.target.value)}
              />
            </div>
          </Col>
          <Col>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Select
                placeholder='Статус'
                allowClear
                size='large'
                style={{ minWidth: 140 }}
                value={statusFilter}
                onChange={v => setStatusFilter(v)}
                options={[
                  { value: 'Backlog', label: 'Backlog' },
                  { value: 'InProgress', label: 'In Progress' },
                  { value: 'Done', label: 'Done' }
                ]}
              />
              <Select
                placeholder="Доска"
                allowClear
                size='large'
                style={{ minWidth: 140 }}
                value={boardFilter}
                onChange={v => setBoardFilter(v)}
                options={boards?.map(b => ({ value: b.id, label: b.name }))}
              />
            </div>
          </Col>
        </Row>


        <TasksScrollArea>
          {loading && <Spin />}
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
          {!loading && !error && filteredTasks?.map((task) => (
            <TaskCard key={task.id} onClick={() => cardClickHandler(task)}>
              {task.title}
            </TaskCard>
          ))}
        </TasksScrollArea>


        <BottomBar>
          <Button type="primary" size="large" onClick={() => setDrawerOpen(true)}>
            Создать задачу
          </Button>
        </BottomBar>
      </Content>

      <TaskForm
        key={drawerOpen + JSON.stringify(initialValues ?? {})}
        open={drawerOpen}
        initialValues={initialValues}
        onClose={() => {
          setDrawerOpen(false);
          setInitinalValues(undefined);
          reloadTasks();
        }}
        showGotoBoard
      />
    </Layout>
  );
}
