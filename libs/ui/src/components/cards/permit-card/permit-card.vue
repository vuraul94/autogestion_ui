<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PermitCardProps } from '../../../types/cards/permit-card';

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<PermitCardProps>(), {
  name: 'Lorem Ipsum',
  applicationNumber: 10000,
  id: 10000,
  actionType: 'Lorem',
  registrationDate: '01/01/2001',
  startDate: '01/01/2001',
  endDate: '01/01/2001',
  reason: 'Lorem Ipsum',
  state: 'Lorem',
  doc: 'Doc Lorem Ipsum',
  time: '00:00',
  labels: {
    name: 'Label Nombre Completo',
    applicationNumber: 'Label No. Solicitud',
    id: 'Label Identificacion',
    actionType: 'Label Tipo de Accion',
    registrationDate: 'Label Fecha Registro',
    startDate: 'Label Fecha Inicio',
    endDate: 'Label Fecha Final',
    reason: 'Label Justificacion',
    state: 'Label Estado',
    doc: 'Label Documento',
    time: 'Label Tiempo',
    detailBtn: 'Label Detail Button',
    detailURL: '/'
  }
});

</script>

<template>
  <div class="permit-card card">
    <div class="card__content relative">
      <div class="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div class="col-span-1 md:col-span-10">
          <h4>{{ labels.name }}</h4>
          <span class="general-title">{{ name }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.applicationNumber }}</h4>
          <span class="general-title">{{ applicationNumber }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.id }}</h4>
          <span class="general-title">{{ id }}</span>
        </div>
        <div class="col-span-1 md:col-span-4">
          <h4>{{ labels.actionType }}</h4>
          <span class="general-title">{{ actionType }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.registrationDate }}</h4>
          <span class="general-title">{{ formatToDisplay(registrationDate) }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.startDate }}</h4>
          <span class="general-title">{{ formatToDisplay(startDate) }}</span>
        </div>
        <div class="col-span-1 md:col-span-4">
          <h4>{{ labels.endDate }}</h4>
          <span class="general-title">{{ formatToDisplay(endDate) }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.reason }}</h4>
          <span class="general-title">{{ reason }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.state }}</h4>
          <span class="general-title">{{ state }}</span>
        </div>
        <div class="col-span-1 md:col-span-4">
          <h4>{{ labels.doc }}</h4>
          <span class="general-title">{{ doc }}</span>
        </div>
        <div class="col-span-1 md:col-span-3">
          <h4>{{ labels.time }}</h4>
          <span class="general-title">{{ time }}</span>
        </div>
      </div>
      <a
        class="btn--info btn--small absolute bottom-5 right-5"
        :href="detailURL"
      >{{ labels.detailBtn }}</a>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.permit-card{
  h4{
    @apply font-mulish text-base text-dark-4;
  }
}
</style>
