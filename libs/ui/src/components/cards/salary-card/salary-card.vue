<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { SalaryCardProps } from '../../../types/cards/salary-card';

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<SalaryCardProps>(), {
  nominaId: 0,
  currency: 'Colones',
  startDate: '01/01/2001',
  endDate:'01/01/2001',
  docLink: '/ruta-a-mi-doc',
  tipoNominaId:0,
  labels: {
    period: 'Label Periodo',
    download: 'Label Descargar',
    seeMore: 'Label Ver Mas'
  }
});

const currencyIconConfig = {
  'Colones': {
    icon : ['fas', 'colon-sign'] ,
  },
  'Dólares': {
    icon : ['fas', 'dollar-sign'] ,
  },
}

</script>

<template>
  <div class="salary-card card relative">
    <div class="salary-card__content card__content">
      <div class="grid grid-cols-4 md:grid-cols-[40px_1fr_1fr_1fr_1fr] gap-4">
        <div class="icon-pill--main col-span-1">
          <FontAwesomeIcon :icon="currencyIconConfig[currency].icon" />
        </div>
        <div class="text-base text-center md:text-left col-span-2 md:col-span-4">
          <div>
            <span class="font-mulish text-dark-2">{{ labels.period }}</span>
          </div>
          <div class="flex flex-col md:flex-row md:gap-2 general-title">
            <span>{{ startDate }}</span>
            <span>-</span>
            <span>{{ endDate }}</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-[40px_1fr_1fr_1fr_1fr] gap-4  mt-10 md:mt-0">
        <!-- <a :href="docLink" class="salary-card__download-btn btn--main">
          <FontAwesomeIcon :icon="['fas', 'download']" class="mr-2"></FontAwesomeIcon>{{ labels.download }}</a> -->
        <a 
          :href="'/salaries/'+ nominaId +'/' + tipoNominaId" 
          class="salary-card__open-btn btn--main btn--small  col-start-2"
        >{{ labels.seeMore }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.salary-card{
  &__download-btn{
    @apply flex items-center justify-center font-mulish font-bold text-sm;
    @media screen and (min-width:768px) {
      @apply bg-transparent text-main border-none px-0 col-start-2 justify-start !important;
    }
  }
  &__open-btn{
    @apply text-sm static md:absolute bottom-6 right-6 flex items-center justify-center font-mulish font-bold;
  }
  &__content{
    @apply space-y-10 md:space-y-0;
  }
}
</style>
