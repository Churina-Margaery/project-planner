import { api } from './axios';
import type { Task, Board } from './types';


export async function getBoards(): Promise<Board[]> {
  const { data } = await api.get<Board[]>("/boards");
  return data;
}


export async function getBoardTasks(boardId: number): Promise<Task[]> {
  const { data } = await api.get<Task[]>(`/boards/${boardId}`);
  return data;
}
