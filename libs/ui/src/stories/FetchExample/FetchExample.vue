<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div>Respuesta:</div>
    <pre>{{ dataResponse }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useFetchData } from '../../hooks/useFetchData';

const url = 'https://mocki.io/v1/edc34442-49b3-45ea-b588-70e8a911dd6b';

// Llama al hook con la URL y usa alias para los datos
const { data: dataResponse, loading, error } = useFetchData(url);

</script>
