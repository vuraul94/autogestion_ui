<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { JobCardProps } from '../../../types/cards/job-card';

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<JobCardProps>(), {
  name: 'Lorem Ipsum',
  state: 'Lorem',
  schedule: 'Lorem Ipsum',
  color: 'dark-2',
  labels:{
    name: 'Label Puesto',
    state: 'Label Estado',
    schedule: 'Label Horario',
  }
});

const jobCardTypeConfig = {
  'main': {
    subcardClass : 'card--main' ,
    iconClass: 'icon-pill--main'
  },
  'dark-2': {
    subcardClass : 'card--dark-2' ,
    iconClass: 'icon-pill--dark-2'
  },
}

</script>

<template>
  <div class="job-card card">
    <div class="job-card__content card__content">
      <div class="flex items-center space-x-4">
        <div :class="jobCardTypeConfig[color].iconClass">
          <FontAwesomeIcon :icon="['fas', 'fa-user']" />
        </div>
        <div class="text-sm">
          <span class="block font-semibold">{{labels.name}}</span>
          <span class="block text-dark-4">{{name}}</span>
        </div>
      </div>


      <div class="job-card__cards-container">
        <div :class="jobCardTypeConfig[color].subcardClass">
          <div class="job-card__subcard-content card__content">
            <span class="block">{{labels.state}}</span>
            <span class="block font-bold">{{state}}</span>
          </div>
        </div>

        <div :class="jobCardTypeConfig[color].subcardClass">
          <div class="job-card__subcard-content card__content">
            <span class="block">{{labels.schedule}}</span>
            <span class="block font-bold">{{schedule}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.job-card{
  &__content{
    @apply space-y-4;
  }
  &__cards-container{
    @apply grid grid-cols-1 sm:grid-cols-2 gap-4;
  }
  &__subcard-content{
    @apply flex flex-col items-center justify-start text-xs space-y-2 text-sm;
  }
}
</style>
