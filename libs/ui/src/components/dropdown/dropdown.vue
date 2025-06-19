<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Types
type DropdownOption = Record<string, any>; // Permitir acceso dinámico a las propiedades de DropdownOption

const props = defineProps({
  value: {
    type: [String, Number, null],
    default: null
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  options: {
    type: Array as () => DropdownOption[],
    required: true
  },
  icon: {
    type: [String, Array],
    default: null
  }
});

const emit = defineEmits(['onOptionSelected']);

const dropdown = ref(null);
const isOpen = ref(false);
const selected = ref<DropdownOption | null>(null);

// Computed para obtener el label y el value utilizando las llaves alternativas
const getOptionLabel = (option: DropdownOption | null) => {
  return option ? option[props.labelKey] || '' : '';
};

const getOptionValue = (option: DropdownOption | null) => {
  return option ? option[props.valueKey] : null;
};

// Función para establecer el valor predeterminado basado en la clave de `valueKey`
const setDefaultSelected = () => {
  if (props.value !== null) {
    selected.value = props.options.find(option => getOptionValue(option) === props.value) || null;
  }
};


// Watch para actualizar selected si props.value cambia
watch(
  [() => props.value, () => props.options],
  () => {
    setDefaultSelected();
  },
  { immediate: true, deep: true }
);

// Alternar la visibilidad del menú desplegable
const toggleDropdown = () => (isOpen.value = !isOpen.value);

// Cerrar el menú desplegable si se hace clic fuera
onClickOutside(dropdown, () => (isOpen.value = false));

// Seleccionar una opción y emitir el evento
const selectOption = (option?: DropdownOption) => {
  selected.value = option || null;
  isOpen.value = false;
  emit('onOptionSelected', getOptionValue(option));
};

// Inicializar el valor seleccionado al cargar el componente
setDefaultSelected();
</script>

<template>
  <div
    ref="dropdown"
    class="dropdown"
    :class="{
      'select--with-icon': !!icon
    }"
  >
    <FontAwesomeIcon
      v-if="!!icon"
      :icon="icon"
    />

    <div
      class="select--main"
      @click="toggleDropdown"
    >
      {{ selected ? getOptionLabel(selected) : t('misc.selectOption') }}
    </div>

    <div
      v-if="isOpen"
      class="dropdown__menu-holder card"
    >
      <ul class="dropdown__menu">
        <li
          v-for="(option, index) in props.options"
          :key="index"
          class="dropdown__menu-item"
          :class="{ active: getOptionValue(option) === getOptionValue(selected) }"
          @click="selectOption(option)"
        >
          {{ getOptionLabel(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.dropdown {
  @apply relative;

  &__menu-holder {
    @apply absolute z-10 mt-2 w-full overflow-hidden;
  }

  &__menu {
    @apply overflow-x-auto py-2 max-h-[200px];

    &-item {
      @apply px-4 py-2 cursor-pointer hover:bg-light-2 text-sm text-dark;

      &.active {
        @apply bg-light-2;
      };
    }
  }
}
</style>
