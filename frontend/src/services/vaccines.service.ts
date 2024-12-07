import { PaginatedResponse } from "@/app/vaccines/VaccineListPage";
import api from "./api";

export async function getVaccines(page: number) {
  const { data } = await api.get<PaginatedResponse>('/vaccines', {
    params: { page },
  });

  return data;
}