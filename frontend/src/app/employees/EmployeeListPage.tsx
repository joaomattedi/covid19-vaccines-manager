'use client';

import React, { useEffect, useState } from 'react';
import { getEmployees } from '@/services/employees.service';
import { useRouter } from 'next/navigation';
import { Vaccine } from '../vaccines/VaccineListPage';

export type Employee = {
  id?: number;
  cpf: string;
  full_name: string;
  birth_date: string;
  date_first_dose: string;
  date_second_dose: string;
  date_third_dose: string;
  comorbidity_carrier: boolean;
  vaccine?: Vaccine;
};

export type PaginatedResponse = {
  data: Employee[];
  current_page: number;
  last_page: number;
  total: number;
};

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchEmployees = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEmployees(page)
      setEmployees(response.data);
      setCurrentPage(response.current_page);
      setLastPage(response.last_page);
    } catch (err) {
      setError('Erro ao carregar os funcionários. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p>Carregando funcionários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <button
        onClick={() => router.push('/employees/new')}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Criar Novo Funcionário
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome Completo</th>
            <th>Data de Nascimento</th>
            <th>Data da primeira dose</th>
            <th>Data da segunda dose</th>
            <th>Data da terceira dose</th>
            <th>Portador de comorbidades</th>
            <th>Vacina aplicada</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.cpf}</td>
              <td>{employee.full_name}</td>
              <td>{new Date(employee.birth_date).toLocaleDateString()}</td>
              <td>{new Date(employee.date_first_dose).toLocaleDateString()}</td>
              <td>{new Date(employee.date_second_dose).toLocaleDateString()}</td>
              <td>{new Date(employee.date_third_dose).toLocaleDateString()}</td>
              <td>{employee.comorbidity_carrier ? 'Sim' : 'Não'}</td>
              <td>{employee.vaccine?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ padding: '10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          Página Anterior
        </button>
        <span>Página {currentPage} de {lastPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          style={{ padding: '10px', cursor: currentPage === lastPage ? 'not-allowed' : 'pointer' }}
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
};

export default EmployeeListPage;
