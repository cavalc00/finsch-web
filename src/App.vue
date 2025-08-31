<template>
  <div class="container mt-4">
    <h1 class="mb-4">Agendamento de Transferências</h1>
    <FormularioTransferencia ref="formulario" :erro="erro" @submit="cadastrar" />
    <ListaTransferencias :agendamentos="agendamentos" />
  </div>
</template>

<script>
import { listarAgendamentos, cadastrarAgendamento } from './services/agendamentoService.js'
import FormularioTransferencia from './components/FormularioTransferencia.vue'
import ListaTransferencias from './components/ListaTransferencias.vue'

export default {
  components: {
    FormularioTransferencia,
    ListaTransferencias,
  },
  data() {
    return {
      agendamentos: [],
      erro: '',
    }
  },
  methods: {
    async listar() {
      this.agendamentos = await listarAgendamentos()
    },
    async cadastrar(dados) {
      try {
        await cadastrarAgendamento(dados)
        this.listar()
        this.$refs.formulario.resetar()
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
}
</style>
