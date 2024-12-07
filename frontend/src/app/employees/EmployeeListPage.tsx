'use client';

import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { getEmployees } from '@/services/employees.service';

type Employee = {
  id: number;
  cpf: string;
  full_name: string;
  birth_date: string;
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome Completo</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.cpf}</td>
              <td>{employee.full_name}</td>
              <td>{new Date(employee.birth_date).toLocaleDateString()}</td>
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
