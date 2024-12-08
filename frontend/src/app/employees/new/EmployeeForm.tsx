'use client';

import React, { ErrorInfo, useEffect, useState } from 'react';
import api from '@/services/api';
import { Vaccine } from '@/app/vaccines/VaccineListPage';
import { Employee } from '../EmployeeListPage';
import { createEmployee, updateEmployee } from '@/services/employees.service';
import Modal from '@/components/Modal';
import { AxiosError } from 'axios';

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
  const [error, setError] = useState<Error | null>(null);
  const [openModal, setOpenModal] = useState(false);

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
      validateFormData(formData);
      if (!!employee?.id) {
        await updateEmployee(formData);
      } else {
        await createEmployee(formData);
      }
      onSuccess();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      } else {
        setError(error);
      }
      setOpenModal(true)
      console.error('Erro ao criar funcionário. Verifique os dados e tente novamente.', error);
    }
  };

  function validateFormData(formData: Employee) {
    if (!!formData.cpf === false || formData.cpf.length !== 11) {
      throw new Error('CPF inválido');
    }

    if (!!formData.full_name === false || formData.full_name.trim().length === 0) {
      throw new Error('Nome completo é obrigatório');
    }

    if (!!formData.birth_date === false) {
      throw new Error('Data de nascimento é obrigatória');
    }
  }

  return (
    <div>
      <h2 className='text-xl font-bold mb-4 text-emerald-600'>Criar Novo Funcionário</h2>
      <form className='text-emerald-600' onSubmit={handleSubmit}>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="cpf" className='w-full'>CPF</label>
          <input
            className='border-b-2 border-emerald-200 placeholder:italic placeholder:text-emerald-600 placeholder:opacity-40'
            placeholder='Insira o CPF'
            type="text"
            name="cpf"
            id="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="full_name" className='w-full'>Nome Completo</label>
          <input
            className='border-b-2 border-emerald-200 placeholder:italic placeholder:text-emerald-600 placeholder:opacity-40'
            type="text"
            name="full_name"
            id="full_name"
            placeholder='Insira o nome completo'
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="birth_date" className='w-full'>Data de Nascimento</label>
          <input
            type="date"
            name="birth_date"
            id="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="date_first_dose" className='w-full'>Data da 1ª Dose</label>
          <input
            type="date"
            name="date_first_dose"
            id="date_first_dose"
            value={formData.date_first_dose!}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="date_second_dose" className='w-full'>Data da 2ª Dose</label>
          <input
            type="date"
            name="date_second_dose"
            id="date_second_dose"
            value={formData.date_second_dose!}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="date_third_dose" className='w-full'>Data da 3ª Dose</label>
          <input
            type="date"
            name="date_third_dose"
            id="date_third_dose"
            value={formData.date_third_dose!}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center mb-4'>
          <label htmlFor="comorbidity_carrier" className='mr-4'>Portador de Comorbidade?</label>
          <input
            type="checkbox"
            name="comorbidity_carrier"
            id="comorbidity_carrier"
            checked={formData.comorbidity_carrier}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="vaccine_id" className='w-full mb-2'>Vacina</label>
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
        <button type="submit" className='text-white font-semibold bg-emerald-600 py-2 px-4 rounded'>Salvar</button>
      </form>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h1 className='font-bold mb-2'>Ocorreu um erro!</h1>
        <p>{error?.message}</p>
      </Modal>
    </div>
  );
};

export default EmployeeForm;
