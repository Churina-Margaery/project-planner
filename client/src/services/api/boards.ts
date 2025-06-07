import { api } from './axios';
import type { Task, Board, BoardsResponse, TasksResponse } from './types';


export async function getBoards(): Promise<Board[]> {
  const { data } = await api.get<BoardsResponse>("/boards");
  return data.data;
}


export async function getBoardTasks(boardId: number): Promise<Task[]> {
  const { data } = await api.get<TasksResponse>(`/boards/${boardId}`);
  return data.data;
}
