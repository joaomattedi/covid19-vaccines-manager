'use client';

import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees } from '@/services/employees.service';
import { Vaccine } from '../vaccines/VaccineListPage';
import Modal from '@/components/Modal';
import CreateEmployeeForm from './new/CreateEmployeeForm';
import { FaTrashAlt } from 'react-icons/fa';
import EmployeeInfo from '@/components/EmployeeInfo';

export type Employee = {
  id?: number;
  cpf: string;
  full_name: string;
  birth_date: string;
  date_first_dose: string | null;
  date_second_dose: string | null;
  date_third_dose: string | null;
  comorbidity_carrier: boolean;
  vaccine?: Vaccine;
  vaccine_id: string | null;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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

  const handleDeleteEmployee = async (employee: Employee) => {
    try {
      await deleteEmployee(employee);;
      fetchEmployees(currentPage);
    } catch (error) {
      console.error('Erro ao excluir funcionário', error);
    } finally {
      setSelectedEmployee(null);
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Funcionários</h2>
      <button
        onClick={toggleModal}
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
      {
        loading ? <p>Carregando vacinas...</p>
        : <table>
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.cpf}</td>
                  <td>{employee.full_name}</td>
                  <td>{new Date(employee.birth_date).toLocaleDateString()}</td>
                  <td>{employee.date_first_dose && new Date(employee.date_first_dose).toLocaleDateString()}</td>
                  <td>{employee.date_second_dose && new Date(employee.date_second_dose).toLocaleDateString()}</td>
                  <td>{employee.date_third_dose && new Date(employee.date_third_dose).toLocaleDateString()}</td>
                  <td>{employee.comorbidity_carrier ? 'Sim' : 'Não'}</td>
                  <td>{employee.vaccine?.name}</td>
                  <td>
                    <FaTrashAlt 
                      color='#ef4444' 
                      onClick={() => handleDeleteClick(employee)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }

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

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <CreateEmployeeForm onSuccess={() => {
          toggleModal();
        }} />
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Tem certeza que deseja excluir?</h3>
            <EmployeeInfo employee={selectedEmployee!}/>
            <div className="flex justify-end">
              <button
                className="mr-4 text-gray-500"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => selectedEmployee?.id && handleDeleteEmployee(selectedEmployee)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeListPage;
