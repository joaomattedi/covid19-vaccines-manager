'use client';

import React, { useEffect, useState } from 'react';
import { deleteVaccine, getVaccines } from '@/services/vaccines.service';
import Modal from '@/components/Modal';
import CreateVaccineForm from './new/CreateVaccineForm';
import { FaChevronCircleLeft, FaChevronCircleRight, FaPlus, FaTrashAlt } from 'react-icons/fa';

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
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);

  const fetchVaccines = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVaccines(page);
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

  if (error) return <p>{error}</p>;

  return (
    <div className='w-4/5 m-auto flex justify-between flex-wrap h-4/5 gap-10'>
      <div className='flex justify-between items-center py-6 w-full'>
        <h1 className='text-emerald-500 font-semibold text-2xl'>Lista de Vacinas</h1>

        <button
          onClick={toggleModal}
          className='flex items-center gap-2 text-lg font-semibold text-emerald-500 hover:bg-emerald-500 hover:text-white hover:rounded px-4 py-2'
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
                    <td className='flex justify-center gap-4'>
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
        <CreateVaccineForm onSuccess={() => {
          toggleModal();
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
