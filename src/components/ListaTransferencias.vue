<template>
  <div>
    <h2 class="mt-4 mb-3">Agendamentos</h2>
    <div class="row row-cols-1 g-3">
      <div v-for="item in agendamentos" :key="item.id" class="col">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center gap-2">
              <span class="badge bg-secondary">{{ item.contaOrigem }}</span>
              <i class="bi bi-arrow-right"></i>
              <span class="badge bg-success">{{ item.contaDestino }}</span>
            </h5>
            <p class="card-text mb-1">
              <strong>Valor:</strong> R$ {{ item.valor }}<br />
              <strong>Taxa:</strong> {{ item.taxa }}%<br />
              <strong>Total:</strong> R$ {{ item.valorTotal }}<br />
              <strong>Data:</strong> {{ formatarData(item.dataTransferencia) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    agendamentos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatarData(dataISO) {
      const [ano, mes, dia] = dataISO.split('-')
      return `${dia}/${mes}/${ano}`
    },
  },
}
</script>
