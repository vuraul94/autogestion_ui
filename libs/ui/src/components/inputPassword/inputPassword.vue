<template>
  <div class="relative">
    <!-- Input de tipo password -->
    <input
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      class="password-input"
      v-model="internalValue"
      @input="updateValue"
      v-bind="$attrs"
    />

    <button type="button" @click="togglePasswordVisibility" class="password-toggle">
      <FontAwesomeIcon :icon="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);
const internalValue = ref(props.modelValue);

// Actualiza el valor interno cuando cambia el prop
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

// Emitir el nuevo valor cuando se escriba en el input
const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  internalValue.value = value;
  emit('update:modelValue', value);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped lang="scss">
@import '@fortawesome/fontawesome-free/css/all.min.css';

.password-input {
  &:disabled {
    @apply bg-light text-dark-4 cursor-not-allowed;
  }

  &::placeholder {
    @apply text-dark-3;
  }
}

.password-toggle {
  @apply absolute right-4 top-1/2 -translate-y-1/2 text-xl cursor-pointer text-dark-3;
}
</style>
