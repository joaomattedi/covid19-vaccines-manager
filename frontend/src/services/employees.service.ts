import { PaginatedResponse } from "@/app/employees/EmployeeListPage";
import api from "./api";

export async function getEmployees(page: number) {
  const { data } = await api.get<PaginatedResponse>('/employees', {
    params: { page },
  });

  return data;
}