import { Drawer, Form, Input, Select, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { updateTask, createTask } from '../../services/api/tasks';
import { getBoards } from '../../services/api/boards';
import { getUsers } from '../../services/api/users';

export interface TaskFormValues {
  id: number;
  title: string;
  description: string;
  boardId: number;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "InProgress" | "Done";
  assigneeId: number;
}

interface Props {
  open: boolean;
  initialValues?: Partial<TaskFormValues>;
  projectLocked?: boolean;
  showGotoBoard?: boolean;
  onClose: () => void;
}

export const TaskForm: React.FC<Props> = ({
  open,
  initialValues,
  projectLocked,
  showGotoBoard,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [boards, setBoards] = useState<any[]>([]);
  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];
  const statusOptions = [
    { value: 'Backlog', label: 'Backlog' },
    { value: 'InProgress', label: 'InProgress' },
    { value: 'Done', label: 'Done' },
  ];

  useEffect(() => {
    getUsers().then(setUsers);
    getBoards().then(setBoards);
  }, []);

  // Обработчик формы
  const handleFinish = async (values: TaskFormValues) => {
    setSaving(true);
    try {
      console.log(values);
      if (initialValues) {
        await updateTask(Number(initialValues.id), values);
      } else {
        await createTask(values);
      }
      console.log(values);
      onClose();
      // TODO обновить задачи в родителе
    } catch (err) {
      // обработать ошибку (например, message.error)
      console.log(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      width={420}
      title={initialValues ? 'Редактирование задачи' : 'Создание задачи'}
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item label="Название" name="title" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Проект" name="boardId">
          <Select disabled={projectLocked} placeholder="Выберите проект"
            options={boards.map(b => ({
              value: b.id,
              label: b.name
            }))} />
        </Form.Item>

        <Form.Item label="Приоритет" name="priority">
          <Select options={priorityOptions} />
        </Form.Item>

        <Form.Item label="Статус" name="status">
          <Select options={statusOptions} />
        </Form.Item>

        <Form.Item label="Исполнитель" name="assigneeId">
          <Select options={users.map(u => ({
            value: u.id,
            label: u.fullName || u.email
          }))} />
        </Form.Item>

        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          {showGotoBoard && <NavLink to={`/board/${1}`}>Перейти на доску</NavLink>}
          <Button type="primary" htmlType="submit">{initialValues ? 'Обновить' : 'Создать'}</Button>
        </Space>
      </Form>
    </Drawer>
  );
};
