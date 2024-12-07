import { PaginatedResponse } from "@/app/vaccines/VaccineListPage";
import api from "./api";
import { Vaccine } from "@/app/vaccines/VaccineListPage";

export async function getVaccines(page: number) {
  const { data } = await api.get<PaginatedResponse>('/vaccines', {
    params: { page },
  });

  return data;
}

export async function createVaccine(vaccine: Vaccine): Promise<Vaccine> {
  const { data } = await api.post('/vaccines', vaccine);
  return data;
}