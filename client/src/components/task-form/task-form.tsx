import { Drawer, Form, Input, Select, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    // Показываем значения только если boards есть
    if (boards.length && initialValues) {
      // Явно приведи к числу:
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


  // Обработчик формы
  const handleFinish = async (values: TaskFormValues) => {
    setSaving(true);
    try {
      const boardId = values.boardId ?? initialValues?.boardId;
      const board = boards.find(b => b.id === boardId);
      const dataToSend = { ...values, boardId, boardName: board?.name ?? "" };
      // console.log(initialValues, boardId, board, dataToSend)
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

        <Form.Item label="Описание" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Проект" name="boardId">
          <Select disabled={isProjectLocked} placeholder="Выберите проект"
            options={boards.map(b => ({
              value: b.id,
              label: b.name
            }))} />
        </Form.Item>

        <Form.Item label="Приоритет" name="priority">
          <Select options={priorityOptions} />
        </Form.Item>

        <Form.Item label="Статус" name="status">
          <Select options={statusOptions} disabled={!isEditing} />
        </Form.Item>

        <Form.Item label="Исполнитель" name="assigneeId">
          <Select options={users.map(u => ({
            value: u.id,
            label: u.fullName || u.email
          }))} />
        </Form.Item>

        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          {showGotoBoard && <NavLink to={`/board/${boardIdCur}`}>Перейти на доску</NavLink>}
          <Button type="primary" htmlType="submit">{initialValues ? 'Обновить' : 'Создать'}</Button>
        </Space>
      </Form>
    </Drawer>
  );
};
