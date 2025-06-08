import { Drawer, Form, Input, Select, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateTask, createTask } from '../../services/api/tasks';
import { getBoards } from '../../services/api/boards';
import { getUsers } from '../../services/api/users';
import type { Board, User } from '../../services/api/types';

export interface TaskFormValues {
  id: number;
  title: string;
  description: string;
  boardId: number;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "InProgress" | "Done";
  assigneeId: number;
  boardName: string;
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
  const [users, setUsers] = useState<User[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const boardIdCur = initialValues?.boardId;
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
  const isEditing = !!initialValues && !!initialValues.id;
  if (isEditing) {
    console.log('edit', initialValues);
  }
  const isProjectLocked = projectLocked ?? isEditing;

  useEffect(() => {
    getUsers().then(setUsers);
    getBoards().then(setBoards);
  }, []);

  useEffect(() => {
    if (!open) return;
    form.resetFields();
    if (boards.length && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        boardId: Number(initialValues.boardId),
      });
      console.log('setFieldsValue:', initialValues, boards);
    } else {
      form.setFieldsValue(initialValues || {});
      console.log('fallback setFieldsValue:', initialValues, boards);
    }
  }, [open, initialValues, boards, form]);


  const navigate = useNavigate();
  const handleGotoBoard = () => {
    navigate(`/board/${initialValues?.boardId}?task=${initialValues?.id}`);
  };

  // Обработчик формы
  const handleFinish = async (values: TaskFormValues) => {
    setSaving(true);
    try {
      const boardId = values.boardId ?? initialValues?.boardId;
      const board = boards.find(b => b.id === boardId);
      const dataToSend = { ...values, boardId, boardName: board?.name ?? "" };
      if (initialValues && initialValues.id) {
        console.log('upd', dataToSend)
        await updateTask(Number(initialValues.id), dataToSend);
      } else {
        console.log('cre', dataToSend)
        await createTask(dataToSend);
      }
      onClose();
    } catch (err) {
      console.log((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  console.log("task-form", users, boards);


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
        // initialValues={initialValues}
        onFinish={handleFinish}
      >
        <Form.Item label="Название" name="title" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Проект" name="boardId" rules={[{ required: true, message: 'Выберите проект' }]}>
          {boards && <Select disabled={isProjectLocked} placeholder="Выберите проект"
            options={boards?.map(b => ({
              value: b.id,
              label: b.name
            }))} />}
        </Form.Item>

        <Form.Item label="Приоритет" name="priority" rules={[{ required: true, message: 'Выберите приоритет' }]}>
          <Select options={priorityOptions} />
        </Form.Item>

        <Form.Item label="Статус" name="status">
          <Select options={statusOptions} disabled={!isEditing} />
        </Form.Item>

        <Form.Item label="Исполнитель" name="assigneeId" rules={[{ required: true, message: 'Выберите исполнителя' }]}>
          {users && <Select options={users?.map(u => ({
            value: u.id,
            label: u.fullName || u.email
          }))} />}
        </Form.Item>

        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          {showGotoBoard && <Button onClick={handleGotoBoard}>Перейти на доску</Button>}
          <Button type="primary" htmlType="submit">{initialValues ? 'Обновить' : 'Создать'}</Button>
        </Space>
      </Form>
    </Drawer>
  );
};
