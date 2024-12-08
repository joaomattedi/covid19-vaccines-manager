"use client";

import api from '@/services/api';

import { useState } from "react";
import { Vaccine } from '../VaccineListPage';
import { createVaccine, updateVaccine } from '@/services/vaccines.service';

type Props = {
  onSuccess: () => void;
  vaccine?: Vaccine;
};

const VaccineForm = ({ onSuccess, vaccine }: Props) => {
  const [formData, setFormData] = useState<Vaccine>({
    id: vaccine?.id,
    name: vaccine?.name || '',
    batch: vaccine?.batch || '',
    expiration_date: vaccine?.expiration_date || '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!!vaccine?.id) {
        await updateVaccine(formData);
      } else {        
        await createVaccine(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar vacina. Verifique os dados e tente novamente.', error);
    }
    setError(null);
    setSuccess(false);
  };

  return (
    <div>
      <h2 className='text-xl font-bold mb-4 text-emerald-600'>Cadastro de Vacinas</h2>
      {success && <p style={{ color: "green" }}>Vacina cadastrada com sucesso!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className='text-emerald-600' onSubmit={handleSubmit}>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="name" className='w-full'>Nome da Vacina</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='focus:outline-none border-b-2 border-emerald-200 placeholder:italic placeholder:text-emerald-600 placeholder:opacity-40'
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="batch" className='w-full'>Lote</label>
          <input
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
            className='focus:outline-none border-b-2 border-emerald-200 placeholder:italic placeholder:text-emerald-600 placeholder:opacity-40'
          />
        </div>
        <div className='flex flex-wrap mb-4'>
          <label htmlFor="expiration_date" className='w-full'>Data de Validade</label>
          <input
            type="date"
            id="expiration_date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            required
            className='focus:outline-none border-b-2 border-emerald-200 placeholder:italic placeholder:text-emerald-600 placeholder:opacity-40'
          />
        </div>
        <button type="submit" className='text-white font-semibold bg-emerald-600 py-2 px-4 rounded'>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default VaccineForm;
