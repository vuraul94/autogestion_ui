<template>
  <div class="accordion dropdown-card">
    <div class="card accordion-section overflow-hidden">
      <div
        class="dropdown-card__header accordion-header"
        @click="toggleSection()"
      >
        <FontAwesomeIcon :icon="icon" class="dropdown-card__icon" />
        <h3>{{ title }}</h3>
      </div>

      <div v-if="isOpen" class="dropdown-card__content accordion-content">
        <!-- Content -->
        <div v-for="(section, index) in sections" :key="index" class="dropdown-card__section">
          <h4>{{ section.title }}</h4>
          <input :value="section.content" readonly class="text-center border-dark-4 font-normal">
        </div>
        <a :href="link" class="btn--main inline-block mt-4 font-semibold">{{ buttonText }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
// Types
import type { DropdownCardProps } from '../../../types/cards/dropdown-card';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = withDefaults(defineProps<DropdownCardProps>(), {
  title: 'Title',
  icon: ['fas', 'user'],
  sections: [
    { title: 'Title1', content: 'Lorem Ipsum 1' },
    { title: 'Title2', content: 'Lorem Ipsum 2' },
    { title: 'Title3', content: 'Lorem Ipsum 3' },
  ],
  link: '/custom-link',
  buttonText: 'Ver Detalles'
});

// Variables y lógica
const isOpen = ref(window.innerWidth > 1024);

const toggleSection = () => {
  if(window.innerWidth < 1024)
    isOpen.value = !isOpen.value;
};

const handleResize = () => {
  isOpen.value = window.innerWidth>1024;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<style scoped lang="postcss">
.dropdown-card{
  @apply text-base;
  &__header{
    @apply bg-main text-white p-5 cursor-pointer lg:pointer-events-none flex flex-col items-center gap-2;
    h3{
      @apply font-semibold;
    }
  }
  &__icon{
    @apply h-8 w-8 text-white;
  }
  &__content{
    @apply text-dark px-8 py-12 text-center flex flex-col gap-2 items-center;
  }
  &__section{
    @apply flex flex-col items-center gap-2;

  }
  input{
    @apply font-normal !important;
  }
  h4{
    @apply font-mulish whitespace-nowrap;
  }
}

</style>
