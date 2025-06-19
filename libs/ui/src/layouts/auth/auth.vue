<script setup lang="ts">
// defineProps<{}>()
import logoDev from '../../images/logo-developers.svg';
import logoVert from '../../images/logo-vertical.png';
import logoHor from '../../images/logo-menu.svg';
import logoBac from '../../images/logo-bac.png';
import { ref } from 'vue';

//const imageRoutes = ref([logoHor, logoBac])
const imageRoutes = ref([logoVert])
</script>

<template>
  <div
    class="bg-gray-100 flex min-h-full flex-col justify-center items-center md:py-12 sm:px-6 lg:px-8"
    data-test="auth-layout"
  >
    <div class="mt-4 md:mt-10 sm:mx-auto w-11/12 sm:max-w-[730px]">
      <div class="card px-2 py-6 md:p-14 flex justify-center items-center">
        <div class="m-auto w-full max-w-md min-h-[136px] flex items-center justify-center divide-x divide-dark-3 my-4">
          <img
            v-for="(route, index) in imageRoutes"
            :key="index"
            class=" w-1/2 max-w-[170px] h-auto p-6"
            :src="route"
            alt=""
          >
        </div>
        <slot />
        <img
          class="mx-auto h-12 w-auto mb-7 mt-12"
          :src="logoDev"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
