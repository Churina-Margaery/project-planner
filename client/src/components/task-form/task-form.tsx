// src/components/TaskFormDrawer.tsx
import { Drawer, Form, Input, Select, Button, Space } from 'antd';

export interface TaskFormValues {
  title: string;
  description?: string;
  projectId?: string;
  priority?: string;
  status?: string;
  assignee?: string;
}

interface Props {
  open: boolean;
  initialValues?: Partial<TaskFormValues>;
  projectLocked?: boolean;      // если открыто с доски
  showGotoBoard?: boolean;      // если открыто со “всех задач”
  onClose: () => void;
  onSubmit: (v: TaskFormValues) => void;
}

export const TaskForm: React.FC<Props> = ({
  open,
  initialValues,
  projectLocked,
  showGotoBoard,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  return (
    <Drawer
      width={420}
      title={initialValues ? 'Редактирование задачи' : 'Создание задачи'}
      open={open}
      onClose={onClose}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item label="Название" name="title" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Проект" name="projectId">
          <Select disabled={projectLocked} placeholder="Выберите проект" options={[]} />
        </Form.Item>

        <Form.Item label="Приоритет" name="priority">
          <Select options={[]} />
        </Form.Item>

        <Form.Item label="Статус" name="status">
          <Select options={[]} />
        </Form.Item>

        <Form.Item label="Исполнитель" name="assignee">
          <Select options={[]} />
        </Form.Item>

        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          {showGotoBoard && <Button>Перейти на доску</Button>}
          <Button type="primary" htmlType="submit">Создать/обновить</Button>
        </Space>
      </Form>
    </Drawer>
  );
};
