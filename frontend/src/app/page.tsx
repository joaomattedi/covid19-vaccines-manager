'use client';

import React, { useState } from 'react';
import VaccineListPage from './vaccines/VaccineListPage';
import EmployeeListPage from './employees/EmployeeListPage';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'vacinas' | 'funcionarios'>('funcionarios');

  return (
    <div className='h-full'>
      <div className='flex pt-8 px-6 justify-between align-center border-b-2 border-emerald-600'>
        <h1 className='font-bold text-3xl text-emerald-600'>GESTÃO DE FUNCIONÁRIOS VACINADOS</h1>

        <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('funcionarios')}
            className={`${ activeTab === 'funcionarios' ? 'bg-emerald-600 text-white' : 'bg-transparent text-emerald-600 border border-emerald-600 '} px-4 py-2 rounded`}
          >
            Funcionários
          </button>
          <button
            onClick={() => setActiveTab('vacinas')}
            className={`${ activeTab === 'vacinas' ? 'bg-emerald-600 text-white' : 'bg-transparent text-emerald-600 border border-emerald-600 '} px-4 py-2 rounded`}
          >
            Vacinas
          </button>
        </nav>
      </div>
      <>
        {activeTab === 'vacinas' && <VaccineListPage />}
        {activeTab === 'funcionarios' && <EmployeeListPage />}
      </>
    </div>
  );
};

export default HomePage;
