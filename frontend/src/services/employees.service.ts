import { Employee, PaginatedResponse } from "@/app/employees/EmployeeListPage";
import api from "./api";

export async function getEmployees(page: number, filters: any) {
  const { data } = await api.get<PaginatedResponse>('/employees', {
    params: { page, ...filters },

  });

  return data;
}

export async function createEmployee(employee: Employee): Promise<Employee> {
  const { data } = await api.post('/employees', employee);
  return data;
}

export async function deleteEmployee(employee: Employee) {
  const { data } = await api.delete(`/employees/${employee.id}`);
  return data;
}

export async function updateEmployee(employee: Employee): Promise<Employee> {
  const { data } = await api.put(`/employees/${employee.id}`, employee);
  return data;
}