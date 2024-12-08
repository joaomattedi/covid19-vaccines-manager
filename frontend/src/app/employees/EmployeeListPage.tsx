'use client';

import React, { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import EmployeeForm from './new/EmployeeForm';
import EmployeeInfo from '@/components/EmployeeInfo';
import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa';

import { Vaccine } from '../vaccines/VaccineListPage';

import { annonymousCpf } from '@/helpers/format';
import { deleteEmployee, getEmployees } from '@/services/employees.service';

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
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState({
    cpf: '',
    fullName: '',
  });
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchEmployees = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEmployees(page, filters)
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

  const handleUpdateClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setUpdateModalOpen(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchEmployees(1);
  }

  if (error) return <p>{error}</p>;

  return (
    <div className='w-4/5 m-auto flex justify-center flex-wrap gap-10'>
      <div className='flex flex-wrap justify-between items-center w-full border-b-2 mt-4 pb-2 border-emerald-600'>
        <h1 className='text-emerald-600 font-semibold text-2xl w-full pb-2'>Lista de Funcionários</h1>

        <div className='flex justify-start items-end py-2 rounded gap-2 text-emerald-600'>
          <div className='flex flex-wrap items-center'>
            <label className='w-full' htmlFor="cpf">CPF</label>
            <input
              type="text"
              name="cpf"
              id="cpf" 
              placeholder='Busque por CPF...'
              value={filters.cpf}
              onChange={handleFilterChange}
              className='border-b-2 py-2 border-emerald-600 px-2'
            />
          </div>
          <div className='flex flex-wrap'>
            <label htmlFor="fullName" className='w-full'>Nome</label>
            <input
              type="text"
              name="fullName"
              id="fullName" 
              placeholder='Busque por nome...'
              value={filters.fullName}
              onChange={handleFilterChange}
              className='border-b-2 py-2 border-emerald-600 px-2'
            />
          </div>
        </div>

        <div className='cursor-pointer flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 px-4 py-2 rounded' onClick={handleSearchClick}>
          <FaSearch/> Buscar
        </div>
        <button
          onClick={toggleModal}
          className='flex items-center gap-2 text-lg font-semibold bg-emerald-600 text-white rounded px-4 py-2'
        >
          <FaPlus /> Criar Novo Funcionário
        </button>


      </div>
      <div className='flex-1'>
        {
          loading ? <div className='flex justify-center items-center text-2xl font-semibold text-emerald-500'>Carregando vacinas...</div>
          : <table className='w-full text-emerald-700 h-full'>
              <thead>
                <tr className='mb-4'>
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
                  <tr key={employee.id} className='hover:bg-emerald-50'>
                    <td className='text-center'>{employee.id}</td>
                    <td className='text-center pl-2'>{annonymousCpf(employee.cpf)}</td>
                    <td className='text-center'>{employee.full_name}</td>
                    <td className='text-center'>{new Date(employee.birth_date).toLocaleDateString()}</td>
                    <td className='text-center'>{employee.date_first_dose && new Date(employee.date_first_dose).toLocaleDateString()}</td>
                    <td className='text-center'>{employee.date_second_dose && new Date(employee.date_second_dose).toLocaleDateString()}</td>
                    <td className='text-center'>{employee.date_third_dose && new Date(employee.date_third_dose).toLocaleDateString()}</td>
                    <td className='text-center'>{employee.comorbidity_carrier ? 'Sim' : 'Não'}</td>
                    <td className='text-center'>{employee.vaccine?.name}</td>
                    <td className='flex justify-center items-center h-full gap-4'>
                      <FaEdit 
                        color='#059669'
                        onClick={() => handleUpdateClick(employee)}
                      />
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
      </div>

      <div className='flex justify-center gap-4 w-full mt-6 items-center text-emerald-500'>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='flex items-center justify-center py-4 px-6'
        >
          <FaChevronCircleLeft size={24}/>
        </button>
        <span className='text-lg font-semibold'>Página {currentPage} de {lastPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          className='flex items-center justify-center py-4 px-6'
        >
          <FaChevronCircleRight size={24} />
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <EmployeeForm onSuccess={async () => {
          toggleModal();
          await fetchEmployees(currentPage);
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

      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <EmployeeForm employee={selectedEmployee!} onSuccess={async () => {
          setUpdateModalOpen(false);
          await fetchEmployees(currentPage);
        }} />
      </Modal>
    </div>
  );
};

export default EmployeeListPage;
