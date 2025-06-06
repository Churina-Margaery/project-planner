// src/pages/IssuesPage.tsx
import { useState } from 'react';
import { Layout, Input, Button, List, Space, Row, Col } from 'antd';
import { Navigation } from '../../components/header/navigation';
import { TaskForm } from '../../components/task-form/task-form';

const { Content } = Layout;

export default function IssuesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const data = ['Задача 1', 'Задача 2', 'Задача 3'];

  return (
    <Layout>
      <Navigation onCreateClick={() => setDrawerOpen(true)} />
      <Content style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input.Search placeholder="Поиск" allowClear />
          </Col>
          <Col>
            <Button>Фильтры</Button>
          </Col>
        </Row>

        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ padding: 0 }}>
              <Button type="text" style={{ width: '100%', textAlign: 'left', padding: '12px 16px' }}>
                {item}
              </Button>
            </List.Item>
          )}
        />

        <Space style={{ width: '100%', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button type="primary" onClick={() => setDrawerOpen(true)}>Создать задачу</Button>
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
