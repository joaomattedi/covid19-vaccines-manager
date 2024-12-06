'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Vaccine } from '@/app/vaccines/VaccineListPage';
import { Employee } from '../EmployeeListPage';
import { createEmployee, updateEmployee } from '@/services/employees.service';

type Props = {
  onSuccess: () => void;
  employee?: Employee;
};

const EmployeeForm = ({ onSuccess, employee }: Props) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [formData, setFormData] = useState<Employee>({
    id: employee?.id,
    cpf: employee?.cpf || '',
    full_name: employee?.full_name || '',
    birth_date: employee?.birth_date || '',
    date_first_dose: employee?.date_first_dose || '',
    date_second_dose: employee?.date_second_dose || '',
    date_third_dose: employee?.date_third_dose || '',
    comorbidity_carrier: employee?.comorbidity_carrier || false,
    vaccine_id: employee?.vaccine_id || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await api.get('/vaccines');
        setVaccines(response.data.data || []);
      } catch (error) {
        console.error('Erro ao carregar vacinas', error);
      }
    };

    fetchVaccines();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!!employee?.id) {
        await updateEmployee(formData);
      } else {
        console.log(formData);
        
        await createEmployee(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar funcionário. Verifique os dados e tente novamente.', error);
    }
  };

  return (
    <div>
      <h2>Criar Novo Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="full_name">Nome Completo:</label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birth_date">Data de Nascimento:</label>
          <input
            type="date"
            name="birth_date"
            id="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date_first_dose">Data da 1ª Dose:</label>
          <input
            type="date"
            name="date_first_dose"
            id="date_first_dose"
            value={formData.date_first_dose!}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_second_dose">Data da 2ª Dose:</label>
          <input
            type="date"
            name="date_second_dose"
            id="date_second_dose"
            value={formData.date_second_dose!}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date_third_dose">Data da 3ª Dose:</label>
          <input
            type="date"
            name="date_third_dose"
            id="date_third_dose"
            value={formData.date_third_dose!}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="comorbidity_carrier">Portador de Comorbidade:</label>
          <input
            type="checkbox"
            name="comorbidity_carrier"
            id="comorbidity_carrier"
            checked={formData.comorbidity_carrier}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="vaccine_id">Vacina:</label>
          <select
            id="vaccine_id"
            name="vaccine_id"
            value={formData.vaccine_id!}
            onChange={handleChange}
          >
            <option value="">Nenhuma</option>
            {vaccines.map((vaccine) => (
              <option key={vaccine.id} value={vaccine.id}>
                {vaccine.name} (Lote: {vaccine.batch})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
