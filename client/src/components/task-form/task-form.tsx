// src/components/TaskFormDrawer.tsx
import { Drawer, Form, Input, Select, Button, Space } from 'antd';
import styled from 'styled-components';


const ButtonStyled = styled(Button)`
  border: none !important;
  padding: 14px 32px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  cursor: pointer !important;
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    font-size: 16px !important;
    padding: 0 24px !important;
  }

  &:hover,
  &:focus {
    transform: scale(1.07);
    background: #000 !important;
    -color: $000 !important;
    border: none !important;
    transition: all 0.3s ease !important;
  };
`;

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
          {showGotoBoard && <ButtonStyled>Перейти на доску</ButtonStyled>}
          <Button type="primary" htmlType="submit">Создать/обновить</Button>
        </Space>
      </Form>
    </Drawer>
  );
};
