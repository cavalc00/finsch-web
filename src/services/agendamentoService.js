import axios from 'axios';

const API_URL = 'http://localhost:8080/agendamentos';

export const listarAgendamentos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const cadastrarAgendamento = async (dados) => {
  const response = await axios.post(API_URL, dados);
  return response.data;
};
