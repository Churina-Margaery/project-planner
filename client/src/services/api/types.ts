export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Backlog" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
  assignee?: AssigneeUser;
  boardId?: number;
  boardName?: string;
}

export interface TasksResponse {
  data: Task[];
}

export interface AssigneeUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

