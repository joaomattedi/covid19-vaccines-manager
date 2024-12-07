"use client";

import api from '@/services/api';

import { useState } from "react";
import { Vaccine } from '../VaccineListPage';

const NewVaccine = () => {
  const [formData, setFormData] = useState<Vaccine>({
    name: "",
    batch: "",
    expiration_date: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/vaccines", formData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({ name: "", batch: "", expiration_date: "" });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar a vacina.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Cadastro de Vacinas</h1>
      {success && <p style={{ color: "green" }}>Vacina cadastrada com sucesso!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Nome da Vacina</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="batch">Lote</label>
          <input
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="expiration_date">Data de Validade</label>
          <input
            type="date"
            id="expiration_date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white" }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NewVaccine;
