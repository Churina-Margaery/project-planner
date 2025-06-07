import { useEffect, useState } from "react";
import { Layout, Button, Row, Col, Input, Space, Card, Spin, Typography } from "antd";
import styled from "styled-components";
import { Navigation } from "../../components/header/navigation";
import { TaskForm } from "../../components/task-form/task-form";
import { getTasks } from "../../services/api/tasks";
import type { Task } from "../../services/api/types";

const { Content } = Layout;

const TaskCard = styled(Card)`
  margin-bottom: 16px;
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

export default function IssuesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTasks()
      .then(setTasks)
      .catch((e) => setError(e?.message || "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
        <Row gutter={16} style={{ marginBottom: 32 }}>
          <Col flex="auto">
            <Input.Search placeholder="Поиск" allowClear size="large" />
          </Col>
          <Col>
            <Button size="large">Фильтры</Button>
          </Col>
        </Row>

        {loading && <Spin />}
        {error && (
          <Typography.Text type="danger">{error}</Typography.Text>
        )}

        {!loading && !error && tasks.map((task) => (
          <TaskCard key={task.id} onClick={() => setDrawerOpen(true)}>
            {task.title}
          </TaskCard>
        ))}

        <Space style={{ width: "100%", justifyContent: "flex-end", marginTop: 32 }}>
          <Button type="primary" size="large" onClick={() => setDrawerOpen(true)}>
            Создать задачу
          </Button>
        </Space>
      </Content>

      <TaskForm
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={() => { }}
        showGotoBoard
      />
    </Layout>
  );
}
