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

export async function deleteVaccine(vaccine: Vaccine) {
  const { data } = await api.delete(`/vaccines/${vaccine.id}`);
  return data;
}

export async function updateVaccine(vaccine: Vaccine) {
  const { data } = await api.put(`/vaccines/${vaccine.id}`, vaccine);
  return data;
}