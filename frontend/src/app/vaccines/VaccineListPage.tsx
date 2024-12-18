'use client';

import React, { useEffect, useState } from 'react';
import { deleteVaccine, getVaccines } from '@/services/vaccines.service';
import Modal from '@/components/Modal';
import VaccineForm from './new/VaccineForm';
import { FaChevronCircleLeft, FaChevronCircleRight, FaEdit, FaPlus, FaSearch, FaTrashAlt } from 'react-icons/fa';

export type Vaccine = {
  id?: number;
  name: string;
  batch: string;
  expiration_date: string;
}

export type PaginatedResponse = {
  data: Vaccine[];
  current_page: number;
  last_page: number;
  total: number;
};

const VaccineListPage = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
  const [filters, setFilters] = useState({
    name: '',
    batch: '',
  });

  const fetchVaccines = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVaccines(page, filters);
      setVaccines(response.data);
      setCurrentPage(response.current_page);
      setLastPage(response.last_page);
    } catch (err) {
      setError('Erro ao carregar as vacinas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines(currentPage);
  }, [currentPage]);

  const handleDeleteVaccine = async (vaccine: Vaccine) => {
    try {
      await deleteVaccine(vaccine);
      fetchVaccines(currentPage);
    } catch (error) {
      console.error('Erro ao excluir vacina', error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteClick = (vaccine: Vaccine) => {
    setSelectedVaccine(vaccine);
    setDeleteModalOpen(true);
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleUpdateClick = (vaccine: Vaccine) => {
    setSelectedVaccine(vaccine);
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
    fetchVaccines(1);
  }

  if (error) return <p>{error}</p>;

  return (
    <div className='w-4/5 m-auto flex justify-between flex-wrap gap-10'>
      <div className='flex flex-wrap justify-between items-center w-full border-b-2 mt-4 pb-2 border-emerald-600'>
        <h1 className='text-emerald-600 font-semibold text-2xl w-full pb-2'>Lista de Vacinas</h1>

        <div className='flex justify-start items-end py-2 rounded gap-2 text-emerald-600'>
          <div className='flex flex-wrap items-center'>
            <label className='w-full' htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name" 
              placeholder='Busque por nome...'
              value={filters.name}
              onChange={handleFilterChange}
              className='border-b-2 py-2 border-emerald-600 px-2'
            />
          </div>
          <div className='flex flex-wrap'>
            <label htmlFor="batch" className='w-full'>Lote</label>
            <input
              type="text"
              name="batch"
              id="batch" 
              placeholder='Busque por lote...'
              value={filters.batch}
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
          className='flex items-center gap-2 text-lg font-semibold text-white bg-emerald-600 rounded px-4 py-2'
        >
          <FaPlus /> Criar Nova Vacina
        </button>

      </div>
      <div className='flex-1'>
        {
          loading ? <div className='flex justify-center items-center text-2xl font-semibold text-emerald-500'>Carregando vacinas...</div>
          : <table className='w-full text-emerald-700 h-full'>
              <thead>
                <tr className='mb-4'>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Lote</th>
                  <th>Data de Validade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine) => (
                  <tr key={vaccine.id} className='hover:bg-emerald-50'>
                    <td className='text-center'>{vaccine.id}</td>
                    <td className='text-center'>{vaccine.name}</td>
                    <td className='text-center'>{vaccine.batch}</td>
                    <td className='text-center'>{new Date(vaccine.expiration_date).toLocaleDateString()}</td>
                    <td className='flex justify-center items-center h-full gap-4'>
                      <FaEdit 
                        color='#059669'
                        onClick={() => handleUpdateClick(vaccine)}
                      />
                      <FaTrashAlt 
                        color='#ef4444' 
                        onClick={() => handleDeleteClick(vaccine)}
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
        <VaccineForm onSuccess={async () => {
          toggleModal();
          await fetchVaccines(currentPage);
        }} />
      </Modal>

      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <VaccineForm vaccine={selectedVaccine!} onSuccess={async () => {
          setUpdateModalOpen(false);
          await fetchVaccines(currentPage);
        }} />
      </Modal>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl mb-4">Tem certeza que deseja excluir?</h3>
            <div className="flex justify-end">
              <button
                className="mr-4 text-gray-500"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => selectedVaccine?.id && handleDeleteVaccine(selectedVaccine)}
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

export default VaccineListPage;
