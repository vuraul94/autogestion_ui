<template>
  <div v-if="isVisible" :class="alertTypeConfig[type].cssClass">
    <div class="alert__container">
      <FontAwesomeIcon :icon="alertTypeConfig[type].icon" class="icon" />
      <div>
        <h4>{{ title }}</h4>
        <div v-html="content" class="text-white"></div>
      </div>
    </div>
    <FontAwesomeIcon @click="hideAlert" :icon="['fas', 'xmark']" class="alert__close" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, defineExpose } from 'vue';

const isVisible = ref(false);
const title = ref<string>('Toast title');
const content = ref<string>('');
const type = ref<'success' | 'error' | 'warning' | 'info'>('success');

const alertTypeConfig = {
  success: { cssClass: 'alert--success', icon: ['fas', 'circle-check'] },
  error: { cssClass: 'alert--error', icon: ['fas', 'ban'] },
  warning: { cssClass: 'alert--warning', icon: ['fas', 'circle-exclamation'] },
  info: { cssClass: 'alert--info', icon: ['fas', 'circle-info'] },
};

const showAlert = (alertType, alertTitle, alertContent) => {
  type.value = alertType;
  title.value = alertTitle;
  content.value = alertContent;
  isVisible.value = true;

  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
};

const hideAlert = () => {
  isVisible.value = false;
};

defineExpose({
  showAlert,
  hideAlert,
});
</script>

<style scoped>
/* Aquí los estilos de los diferentes tipos de alertas */
</style>
