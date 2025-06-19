<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// Recibe el valor inicial del v-model
const props = defineProps<{
  modelValue: string,
  placeholder?: string,
  datePattern?: string,  // Para visualizar el formato amigable
  readonly?: boolean,
}>();

// Para emitir eventos del v-model
const emit = defineEmits(['update:modelValue']);

// Variables reactivas
const displayDate = ref<string>('');  // Mostrar formato amigable
const internalDate = ref<string>(props.modelValue || '');  // Guardar valor en formato ISO (YYYY-MM-DD)
const inputEl = ref<HTMLInputElement | null>(null);  // Referencia al input visible
let isInternalChange = false;  // Bandera para evitar doble actualización

// Función para formatear la fecha de acuerdo al patrón definido
const formatToDisplay = (dateStr: string, pattern: string): string => {
  let retorno = '';
   
  if (dateStr !== undefined && dateStr !== null && dateStr !== ''){
    pattern = localStorage.getItem('dateFormat');
    if(!pattern ){
      pattern = 'd-m-Y';
    }
    const [year, month, dayWithHour] = dateStr.split('-');
    const [day, hour] = dayWithHour.split("T");
    retorno = pattern.replace('d', day).replace('m', month).replace('Y', year);
  }

  return retorno;
};

// Observador de `modelValue` para actualizar `displayDate`
watch(() => props.modelValue, (newValue) => {
  if (isInternalChange) {
    isInternalChange = false;
    return;
  }
  internalDate.value = newValue;
  if (newValue) {
    displayDate.value = formatToDisplay(newValue, props.datePattern || 'd-m-Y');
  } else {
    displayDate.value = ''; // Deja displayDate vacío si no hay valor en modelValue
  }
});

// Inicializar flatpickr
const initializeFlatpickr = () => {
  if (inputEl.value) {
    inputEl.value.readOnly = props.readonly; // Ajusta el readonly directamente

    flatpickr(inputEl.value, {
      defaultDate: props.modelValue || null, // Solo inicializa flatpickr si hay valor en modelValue
      dateFormat: props.datePattern || 'd-m-Y',
      allowInput: true,
      disableMobile: "true",
      locale: locale.value === 'es' ? {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        },
        months: {
          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
      } : {},
      clickOpens: !props.readonly,
      onChange: (selectedDates) => {
        if (selectedDates.length > 0) {
          const date = selectedDates[0];
          const isoDate = date.toISOString(); // Convertir a formato ISO
          displayDate.value = formatToDisplay(isoDate, props.datePattern || 'd-m-Y'); // Mostrar formato amigable
          internalDate.value = isoDate; // Guardar en formato ISO
          isInternalChange = true;
          emit('update:modelValue', internalDate.value); // Emitir valor en formato ISO (YYYY-MM-DD)
        }
      },
    });
  }
};

const handleInput = () => {
  const input = displayDate.value.trim();
  
  if (!input) {
    internalDate.value = '';
    emit('update:modelValue', '');
    return;
  }

  const parsedDate = flatpickr.parseDate(input, props.datePattern || 'd-m-Y');

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    const isoDate = parsedDate.toISOString(); // Convertir a formato ISO
    internalDate.value = isoDate;
    emit('update:modelValue', isoDate);
  } else {
    internalDate.value = '';
    emit('update:modelValue', '');
  }
};

// Observa cambios en locale para reinicializar flatpickr
watch(() => locale.value, () => {
  initializeFlatpickr();
});

// Inicializar flatpickr y displayDate cuando el componente se monte
onMounted(() => {
  if (props.modelValue) {
    displayDate.value = formatToDisplay(props.modelValue, props.datePattern || 'd-m-Y'); // Inicializa displayDate con el valor de modelValue
  } else {
    displayDate.value = ''; // Si modelValue no está definido, displayDate se mantiene vacío
  }
  initializeFlatpickr();
});
</script>

<template>
  <div class="input--with-icon">
    <!-- Campo visible que muestra el formato amigable -->
    <input
      ref="inputEl"
      v-model="displayDate"
      type="text"
      :placeholder="props.placeholder || 'd-m-Y'"
      :readonly="props.readonly"
      @input="handleInput"
    >
    <!-- Campo oculto que almacena la fecha en formato ISO -->
    <input
      type="hidden"
      :value="internalDate"
      :readonly="props.readonly"
    >
    <FontAwesomeIcon :icon="['fas', 'fa-calendar']" />
  </div>
</template>

<style scoped>
/* Puedes añadir estilos personalizados aquí */
</style>
