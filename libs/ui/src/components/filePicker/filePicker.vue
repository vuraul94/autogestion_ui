<template>
  <div class="file-picker">
    <!-- Input personalizado para arrastrar o hacer clic -->
    <div
      v-if="uploadedFiles === 0"
      class="file-picker__dropzone"
      :class="isDragging ? 'bg-gray-200' : ''"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <p class="text-dark-2">
        {{ boxLabel }}
      </p>
      <input
        ref="fileInput"
        type="file"
        class="file-picker__input"
        @change="handleFileChange"
      >
    </div>
    <!-- Datos de archivo seleccionado -->
    <div
      v-else
      class="file-picker__selectedzone"
    >
      <div class="file-picker__preview-container">
        <FontAwesomeIcon
          :icon="['fas', 'file-export']"
          class="file-picker__file-icon"
        />
        <h2>{{ file.name }}</h2>
      </div>
      <FontAwesomeIcon
        :icon="currentIcon"
        class="file-picker__delete-icon"
        @mouseover="deleteBtnOnHovered = true"
        @mouseleave="deleteBtnOnHovered = false"
        @click="deleteFile"
      />      
    </div>
    <!-- Modal de progreso y confirmación -->
    <div
      v-if="showModal"
      class="file-picker__modal-container"
    >
      <div class="file-picker__modal">
        <h2 class="file-picker__modal-title">
          {{ uploadFileLabel }}
        </h2>
        <div class="file-picker__modal-preview-container">
          <!-- Vista previa del archivo -->
          <div
            v-if="file"
            class="file-picker__preview-container"
          >
            <FontAwesomeIcon
              :icon="['fas', 'file-export']"
              class="file-picker__file-icon"
            />
            <p class="file-picker__file-name">
              {{ fileLabel }}: {{ file.name }}
            </p>
          </div>

          <!-- Barra de progreso -->
          <div class="file-picker__progress-bar">
            <div
              class="file-picker__info-progress-bar"
              :style="{ width: `${progress}%` }"
            />
            <span class="file-picker__progress-bar-indicator">{{ progress + " %" }}</span>
          </div>
        </div>
        <div class="file-picker__modal-footer">
          <p class="file-picker__modal-footer-info">
            {{ uploadedFiles }} {{ stateLabel }}
          </p>
          <!-- Botones -->
          <div class="file-picker__modal-buttons-container">
            <button
              class="btn--info btn--outline"
              @click="cancelUpload"
            >
              {{ cancelBtnLabel }}
            </button>
            <button
              id="upload-btn"
              type="button"
              class="btn--info"
              @click="confirmUpload"
            >
              {{ saveBtnLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { FilePickerProps } from '../../types/filePicker';

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<FilePickerProps>(), {
  boxLabel:'Arrastre o Presione esta caja para subir un archivo.',
  uploadFileLabel: 'Subir Archivo',
  fileLabel: 'Archivo',
  stateLabel: 'de 1 archivo subido',
  cancelBtnLabel:'Cancelar',
  saveBtnLabel: 'Subir',
  alertSuccessTitle: 'Archivo Subido',
  alertSuccessText: 'Archivo Correctamente Subido', 
});

// Emitimos el archivo seleccionado al componente padre
const emit = defineEmits();


const showAlert = inject<(type: string, title: string, content: string) => void>('showAlert');

// Definir los tipos de las referencias
const fileInput = ref<HTMLInputElement | null>(null);
const showModal = ref<boolean>(false);
const isDragging = ref<boolean>(false);
const file = ref<File | null>(null);
const progress = ref<number>(0);
const uploadedFiles = ref<number>(0);
const deleteBtnOnHovered = ref<boolean>(false);

// Computed properties
const currentIcon = computed(() => deleteBtnOnHovered.value ? ['far', 'circle-xmark'] : ['far', 'circle-check']);

let isFirstClick = true;

// Abrir el modal y manejar la subida
const triggerFileInput = () => {
  if (isFirstClick) {
    isFirstClick = false;
  } else {
    fileInput.value?.click();
  }
};

// Manejar el archivo seleccionado
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0] || null; // Manejar archivos
  if (file.value) {
    showModal.value = true;
  }
};

// Manejar el arrastrar y soltar
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    file.value = files[0];
    showModal.value = true;
  }
};

// Simular progreso de subida
const confirmUpload = () => {
  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
      uploadedFiles.value = 1;
      showModal.value = false;
      // Emitimos el archivo seleccionado para que el componente padre lo reciba
      if (file.value) {
        emit('file-selected', file.value); // Enviamos el archivo seleccionado
      }
      showAlert('success','Archivo Subido','Archivo Correctamente Subido');
    }
  }, 200);
};

// Cancelar la subida
const cancelUpload = () => {
  progress.value = 0;
  file.value = null;
  uploadedFiles.value = 0;
  isFirstClick = true;
  showModal.value = false;

};

// Quitar el archivo
const deleteFile = () => {
  file.value = null;
  uploadedFiles.value = 0;
  progress.value = 0;
  isFirstClick = true;
};

</script>

<style scoped lang="postcss">
.file-picker {

    &__dropzone{
      @apply border border-dark-4 rounded-[4px] p-3 text-center relative cursor-pointer hover:bg-gray-100;
    }
  &__input{
    @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
  }
  &__selectedzone{
    @apply border border-dark-4 p-3 flex justify-between items-center rounded-[4px];
  }
  &__preview-container{
    @apply flex items-center gap-2;
  }
  &__file-icon{
    @apply w-8 h-8 text-info;
  }
  &__delete-icon{
    @apply cursor-pointer justify-self-end h-6 w-6 text-success hover:text-error;
  }
  &__modal-container{
    @apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center;
  }
  &__modal{
    @apply bg-white p-6 rounded-[25px] shadow-lg w-4/5 sm:w-3/5;
  }
  &__modal-title{
    @apply text-lg font-bold mb-2 text-center text-dark;
  }
  &__modal-preview-container{
    @apply flex flex-col sm:flex-row items-center gap-5 sm:gap-3 border-y border-dark-4 p-3;
  }
  &__file-name{
    @apply text-dark-3;
  }
  &__progress-bar{
    @apply w-full bg-dark-4 rounded-full h-6 relative;
  }
  &__info-progress-bar{
    @apply bg-info h-6 rounded-full;
  }
  &__progress-bar-indicator{
    @apply absolute w-full h-full text-center text-white top-0 left-0;
  }
  &__modal-footer{
    @apply flex flex-col sm:flex-row justify-between pt-4;
  }
  &__modal-footer-info{
    @apply text-dark-3;
  }
  &__modal-buttons-container{
    @apply flex flex-col-reverse sm:flex-row justify-between gap-3 items-center sm:items-end mt-6 sm:mt-0;
  }
  }

</style>
