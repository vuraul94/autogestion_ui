<template>
  <div class="file-picker">
    <!-- Input personalizado para arrastrar o hacer clic -->
    <div class="relative">
      <img :src="selectedImageURL" alt="profile" class="rounded-full w-full object-cover aspect-square">
      <button class="profile-edit-btn" @click="triggerFileInput">
        <FontAwesomeIcon :icon="['fas', 'pencil']" class="profile-edit-btn__icon"></FontAwesomeIcon>
      </button>
      <input
        ref="fileInput"
        type="file"
        class="file-picker__input"
        @change="handleFileChange"
        accept="image/*"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { ProfileImagePickerProps } from '../../types/profileImagePicker';

const emit = defineEmits();

// Definir las props y sus valores por defecto con withDefaults
const props = withDefaults(defineProps<ProfileImagePickerProps>(), {
  currentImageURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
});

const showAlert =
  inject<(type: string, title: string, content: string) => void>('showAlert');


// Definir los tipos de las referencias
const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<File | null>(null);
const selectedImageURL = ref(props.currentImageURL);

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
  const files = target.files;

  if (files && files.length > 0) {
    const fileAux = files[0];

    // Validar que el archivo sea una imagen
    if (fileAux && fileAux.type.startsWith('image/')) {
      selectedImageURL.value = URL.createObjectURL(fileAux);
      file.value = fileAux;
      emit('file-selected', file.value);
    } else {
      alert("Por favor, selecciona un archivo de imagen.");
      //showAlert('error', 'Por favor, selecciona un archivo de imagen.', '');
    }
  }
};

watch(() => props.currentImageURL, (newUrl) => { 
  selectedImageURL.value = newUrl;
 });

</script>

<style scoped lang="postcss">
.file-picker {

  &__input{
    @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
  }
}

.profile-edit-btn{
  @apply absolute rounded-full bg-main text-white p-0 flex items-center justify-center;
  right:5%;
  bottom:5%;
  width:20%;
  height:20%;
  &__icon svg{
    width:40%;
    height:auto;
  }

}


</style>
