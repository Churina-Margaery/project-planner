import { api } from "./axios";
import type { User, UsersResponse } from "./types";


export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<UsersResponse>("/users");
  return data.data;
}