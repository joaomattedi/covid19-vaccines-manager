'use client';

import React, { useEffect, useState } from 'react';
import { deleteVaccine, getVaccines } from '@/services/vaccines.service';
import Modal from '@/components/Modal';
import CreateVaccineForm from './new/CreateVaccineForm';
import { FaTrashAlt } from 'react-icons/fa';

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
    <div>
      <h1>Lista de Vacinas</h1>

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
        Criar Nova Vacina
      </button>
      {
        loading ? <p>Carregando vacinas...</p>
        : <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Lote</th>
                <th>Data de Validade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.id}</td>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.batch}</td>
                  <td>{new Date(vaccine.expiration_date).toLocaleDateString()}</td>
                  <td>
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
