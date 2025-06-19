<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { PaymentCardProps } from '../../../types/cards/payment-card';

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<PaymentCardProps>(), {
  name: 'Lorem Ipsum',
  bank: 'Lorem Ipsum',
  currency: 'Colones',
  account: 'Lorem Ipsum',
  labels: {
    name: 'Label Forma de Pago',
    bank: 'Label Banco',
    currency: 'Label Moneda',
    account: 'Label Cuenta',
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
  <div class="payment-card card">
    <div class="payment-card__content card__content">
      <div class="flex items-start space-x-4">
        <div class="text-base grow space-y-2">
          <div>
            <span class="payment-card__title">{{labels.name}}</span>
            <span class="payment-card__info general-title">{{name}}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span class="payment-card__title">{{labels.bank}}</span>
              <span class="payment-card__info general-title">{{bank}}</span>
            </div>
            <div>
              <span class="payment-card__title">{{labels.currency}}</span>
              <span class="payment-card__info general-title">{{currency}}</span>
            </div>
          </div>
        </div>
        <div class="icon-pill--main">
          <FontAwesomeIcon :icon="currencyIconConfig[currency].icon" />
        </div>
      </div>
    </div>
    <div class="card__footer text-base">
      <span class="payment-card__title">{{labels.account}}</span>
      <span class="payment-card__info general-title">{{account}}</span>
    </div>
  </div>
</template>

<style scoped lang="postcss">

.payment-card{
  &__content{
    @apply space-y-4;
  }
  &__title{
    @apply block text-dark-4 font-mulish;
  }
  &__info{
    @apply block;
  }
}
</style>
