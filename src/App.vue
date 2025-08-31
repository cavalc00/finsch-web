<template>
  <div class="container">
    <h1>Agendamento de Transferências</h1>

    <div v-if="erro" class="alert alert-danger" role="alert">
      {{ erro }}
    </div>

    <form @submit.prevent="cadastrar">
      <input v-model="form.valor" type="number" step="0.01" placeholder="Valor" required />
      <input v-model="form.contaOrigem" type="text" placeholder="Conta Origem" required />
      <input v-model="form.contaDestino" type="text" placeholder="Conta Destino" required />
      <input v-model="form.dataTransferencia" type="date" required />
      <button type="submit">Cadastrar</button>
    </form>
    <hr />

    <h2>Agendamentos</h2>
    <ul>
      <li v-for="item in agendamentos" :key="item.id">
        {{ item.contaOrigem }} → {{ item.contaDestino }} | R$ {{ item.valor }} | Taxa:
        {{ item.taxa }} | Total: {{ item.valorTotal }} | Data: {{ item.dataTransferencia }}
      </li>
    </ul>
  </div>
</template>

<script>
import { listarAgendamentos, cadastrarAgendamento } from './services/agendamentoService'

export default {
  data() {
    return {
      form: {
        valor: '',
        contaOrigem: '',
        contaDestino: '',
        dataTransferencia: '',
      },
      agendamentos: [],
      erro: '',
    }
  },
  methods: {
    async listar() {
      this.agendamentos = await listarAgendamentos()
    },
    async cadastrar() {
      try {
        await cadastrarAgendamento(this.form)
        this.form = { valor: '', contaOrigem: '', contaDestino: '', dataTransferencia: '' }
        this.listar()
        this.erro = ''
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.erro = error.response.data.message
        } else {
          this.erro = 'Erro inesperado ao cadastrar.'
        }
      }
    },
  },
  mounted() {
    this.listar()
  },
}
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
button {
  padding: 8px;
  background: #2d89ef;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
