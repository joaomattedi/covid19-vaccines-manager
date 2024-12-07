'use client';

import React, { useEffect, useState } from 'react';
import { getVaccines } from '@/services/vaccines.service';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import CreateVaccineForm from './new/CreateVaccineForm';

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
  const router = useRouter();

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
              </tr>
            </thead>
            <tbody>
              {vaccines.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.id}</td>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.batch}</td>
                  <td>{new Date(vaccine.expiration_date).toLocaleDateString()}</td>
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
    </div>
  );
};

export default VaccineListPage;
