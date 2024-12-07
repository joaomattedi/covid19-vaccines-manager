import { Employee } from '@/app/employees/EmployeeListPage'
import React from 'react'

interface Props {
  employee: Employee;
}
export default function EmployeeInfo({ employee }: Props) {
  return (
    <div>
      <h2>{employee.full_name}</h2>
      <p>CPF: {employee.cpf}</p>
      <p>Data de Nascimento: {new Date(employee.birth_date).toLocaleDateString()}</p>
      <p>Data da primeira dose: {employee.date_first_dose && new Date(employee.date_first_dose).toLocaleDateString()}</p>
      <p>Data da segunda dose: {employee.date_second_dose && new Date(employee.date_second_dose).toLocaleDateString()}</p>
      <p>Data da terceira dose: {employee.date_third_dose && new Date(employee.date_third_dose).toLocaleDateString()}</p>
      <p>Portador de comorbidades: {employee.comorbidity_carrier ? 'Sim' : 'Não'}</p>
    </div>
  )
}
