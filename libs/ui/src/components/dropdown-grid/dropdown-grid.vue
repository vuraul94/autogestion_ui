<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Types
import type { DropdownGridProps, DropdownGridOption } from '../../types/dropdown-grid';

const props = defineProps<DropdownGridProps>();
const emit = defineEmits(['onOptionSelected']);

const dropdown = ref(null);
const isOpen = ref(false);
const selected = ref<DropdownGridOption | null>(props.value || null);
const searchInputs = ref(Array(props.keys.length).fill('')); // Array para almacenar los inputs de búsqueda


const toggleDropdown = () => isOpen.value = !isOpen.value;

onClickOutside(dropdown, () => isOpen.value = false);

const selectOption = (option?: DropdownGridOption) => {
  selected.value = option || null;
  isOpen.value = false;
  emit('onOptionSelected', option);
}

// Método para hacer la petición de filtrado
const fetchFilteredOptions = (key, index) => {
  // Lógica para filtrar los options
  // Usar searchInputs para enviar la búsqueda a la API
  console.log('Realizando búsqueda de key:'+key.value+' con valor: '+ searchInputs.value[index]);
  // Implementar lógica de filtrado o petición a la API
  // Resetear los demas searchInputs
  for(let i=0; i<searchInputs.value.length;i++){
    if(i!=index){
      searchInputs.value[i] = '';
    }
  }
};

</script>

<template>
  <div
    ref="dropdown"
    class="dropdown"
  >
    <div
      class="select"
      @click="toggleDropdown"
    >
      {{ selected?.columns[0].value || 'Seleccione una opción...' }}
    </div>

    <div
      v-if="isOpen"
      class="dropdown__menu-holder card p-4"
    >
      <div class="overflow-auto w-max min-w-full">
        <div :class="'grid divide-x divide-dark-4 gap-4 grid-cols-'+keys.length">
          <div v-for="(k, i) in keys" :key="i" class="whitespace-nowrap p-2">
            <span class="pb-2 block">{{ k.label }}</span>
            <div class="relative">
            <input v-model="searchInputs[i]"
                    class="search-input"
                    @input="fetchFilteredOptions(k,i)">
              <FontAwesomeIcon :icon="['fa', 'search']" class="absolute left-3 top-3"></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <ul class="dropdown__menu">
          <li
            v-for="(option, index) in options"
            :key="index"
            class="dropdown__menu-item"
            :class="{ active: option.value === selected?.value }"
            @click="selectOption(option)"
          >
            <div :class="'grid divide-x divide-dark-4 gap-4 grid-cols-'+keys.length">
              <div v-for="(col, i) in option.columns" :key="i" class="whitespace-nowrap p-2">
                {{ col.value }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.dropdown {
  @apply relative;

  &__menu-holder {
    @apply absolute z-10 mt-2 w-full overflow-auto text-sm max-h-[400px];
  }

  &__menu {
    @apply py-0;

    &-item {
      @apply py-0 cursor-pointer hover:bg-light-2 text-sm;

      &.active {
        @apply bg-light-2;
      };
    }
  }
}
input.search-input{
  @apply pl-10 !important;
}
</style>

