export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface BoardsResponse {
  data: Board[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Backlog" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
  assignee?: User;
  boardId?: number;
  boardName?: string;
}

export interface TasksResponse {
  data: Task[];
}

export interface UsersResponse {
  data: User[];
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  description: string,
  tasksCount: number,
  teamId: number,
  teamName: string,
}
