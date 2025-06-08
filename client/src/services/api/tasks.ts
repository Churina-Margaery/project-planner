// src/shared/api/tasks.ts
import { api } from "./axios";
import type { Task, TasksResponse } from './types';


export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<TasksResponse>("/tasks");
  return data.data;
}


export async function getTaskById(id: number): Promise<Task> {
  const { data } = await api.get<Task>(`/tasks/${id}`);
  return data;
}


export async function createTask(input: {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: "Low" | "Medium" | "High";
  title: string;
}): Promise<{ id: number }> {
  const { data } = await api.post<{ id: number }>("/tasks/create", input);
  return data;
}


export async function updateTask(taskId: number, input: {
  assigneeId: number;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Backlog" | "InProgress" | "Done";
  title: string;
}) {
  const { data } = await api.put(`/tasks/update/${taskId}`, input);
  return data;
}


export async function updateTaskStatus(taskId: number, status: "Backlog" | "InProgress" | "Done") {
  const { data } = await api.put(`/tasks/updateStatus/${taskId}`, { status });
  return data;
}
