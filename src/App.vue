<template>
  <div class="container mt-4">
    <div class="container-funcional">
      <h1 class="mb-4">Agendamento de Transferências</h1>
      <FormularioTransferencia ref="formulario" :erro="erro" @submit="cadastrar" />
      <ListaTransferencias :agendamentos="agendamentos" />
    </div>
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
.container-funcional {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
