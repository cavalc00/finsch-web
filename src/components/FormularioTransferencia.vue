<template>
  <div>
    <div v-if="erro" class="alert alert-danger" role="alert">
      {{ erro }}
    </div>

    <form @submit.prevent="handleSubmit" class="d-grid gap-2">
      <input
        v-model="localForm.valor"
        type="number"
        step="0.01"
        placeholder="Valor"
        required
        class="form-control"
      />
      <input
        v-model="localForm.contaOrigem"
        type="text"
        placeholder="Conta Origem"
        required
        class="form-control"
      />
      <input
        v-model="localForm.contaDestino"
        type="text"
        placeholder="Conta Destino"
        required
        class="form-control"
      />
      <input v-model="localForm.dataTransferencia" type="date" required class="form-control" />
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    erro: String,
  },
  emits: ['submit'],
  data() {
    return {
      localForm: {
        valor: '',
        contaOrigem: '',
        contaDestino: '',
        dataTransferencia: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.localForm })
    },
    resetar() {
      this.localForm = {
        valor: '',
        contaOrigem: '',
        contaDestino: '',
        dataTransferencia: '',
      }
    },
  },
}
</script>
