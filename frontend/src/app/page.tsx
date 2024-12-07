'use client';

import React, { useState } from 'react';
import VaccineListPage from './vaccines/VaccineListPage';
import EmployeeListPage from './employees/EmployeeListPage';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'vacinas' | 'funcionarios'>('funcionarios');

  return (
    <div>
      <h1>Employee Vaccines Manager</h1>

      <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('funcionarios')}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 'funcionarios' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'funcionarios' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Funcionários
        </button>
        <button
          onClick={() => setActiveTab('vacinas')}
          style={{
            padding: '10px',
            backgroundColor: activeTab === 'vacinas' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'vacinas' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Vacinas
        </button>
      </nav>

      <div>
        {activeTab === 'vacinas' && <VaccineListPage />}
        {activeTab === 'funcionarios' && <EmployeeListPage />}
      </div>
    </div>
  );
};

export default HomePage;
