import { Button } from 'antd';

export default function TaskButton() {
  return (
    <Button type="primary" onClick={() => handler()}>Создать задачу</Button>
  );
};
