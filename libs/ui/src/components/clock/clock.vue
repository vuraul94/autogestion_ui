<template>
  <div class="clock clock--container flex flex-col items-center">
    <!-- Reloj analógico -->
    <div class="clock__analog relative">
      <div class="clock_mark clock_mark--12"></div>
      <div class="clock_mark clock_mark--3"></div>
      <div class="clock_mark clock_mark--5"></div>
      <div class="clock_mark clock_mark--9"></div>
      <div class="clock__hand clock__hand--hour" :style="hourStyle"></div>
      <div class="clock__hand clock__hand--minute" :style="minuteStyle"></div>
      <div class="clock__center--cover"></div>
      <div class="clock__center"></div>
      <div class="clock__hand clock__hand--second" :style="secondStyle"></div>
    </div>

    <!-- Reloj digital (debajo) -->
    <div class="clock__digital mt-4 text-xl font-semibold">
      {{ formattedTime }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';

export default defineComponent({
  name: 'Clock',
  props: {
    timezone: {
      type: String,
      default: 'America/Costa_Rica', // Zona horaria por defecto (GMT-6)
    },
  },
  setup(props) {
    const time = ref(new Date());

    // Actualizar el reloj cada segundo
    let intervalId: number;
    onMounted(() => {
      intervalId = window.setInterval(() => {
        time.value = getLocalTimeInTimezone(props.timezone);
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    // Función para obtener la hora local según la zona horaria seleccionada
    const getLocalTimeInTimezone = (timezone: string) => {
      const utcTime = new Date();
      const localTime = new Date(
        utcTime.toLocaleString('en-US', { timeZone: timezone })
      );
      return localTime;
    };

    // Computar los estilos para las manecillas usando la zona horaria seleccionada
    const hourStyle = computed(() => {
      const hours = time.value.getHours();
      const minutes = time.value.getMinutes();
      return {
        transform: `rotate(${(hours % 12) * 30 + minutes / 2 - 90}deg)`,
        transition: hours === 0 ? 'none' : 'transform 0.5s ease-in-out',
      };
    });

    const minuteStyle = computed(() => {
      const minutes = time.value.getMinutes();
      return {
        transform: `rotate(${minutes * 6 - 90}deg)`,
        transition: minutes === 0 ? 'none' : 'transform 0.5s ease-in-out',
      };
    });

    const secondStyle = computed(() => {
      const seconds = time.value.getSeconds();
      return {
        transform: `rotate(${seconds * 6 - 90}deg)  translate(-15px)`,
        transition: seconds === 0 ? 'none' : 'transform 0.5s ease-in-out',
      };
    });

    // Formatear la hora digital según la zona horaria seleccionada
    const formattedTime = computed(() => {
      let hours = time.value.getHours();
      const minutes = String(time.value.getMinutes()).padStart(2, '0');
      const seconds = String(time.value.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convertir formato de 24 horas a 12 horas
      hours = hours % 12;
      hours = hours ? hours : 12; // La hora '0' debe ser '12'

      return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    });

    return {
      hourStyle,
      minuteStyle,
      secondStyle,
      formattedTime,
    };
  },
});
</script>

<style scoped lang="postcss">
.clock--container {
  @apply flex flex-col items-center;
}

.clock__analog {
  @apply w-48 h-48 border rounded-full relative;
  border-color: rgba(166, 166, 166, 0.25);
  box-shadow: inset 2px 2px 10px rgba(166, 166, 166, 0.25);
}

.clock__hand {
  @apply absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-dark;
  transform-origin: 0% 50%;
  transition: transform 0.5s ease-in-out;

  &--hour {
    @apply w-1/4 h-1 rounded-full;
  }

  &&--minute {
    @apply w-1/3 rounded-full;
  }

  &&--second {
    @apply w-6/12 bg-main;
    transform-origin: 0% 40%;
  }
}

.clock__center {
  @apply w-2.5 h-2.5 bg-main rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.clock__center--cover {
  @apply bg-white w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full;
}

.clock__digital {
  @apply mt-4 text-xl font-semibold text-dark;
}

.clock_mark {
  @apply block absolute bg-dark-3 h-0.5 w-5;

  &--12 {
    @apply top-5 left-1/2 transform -translate-x-1/2 rotate-90;
  }
  &--3 {
    @apply bottom-[48%] left-3 transform -translate-y-1/2;
  }
  &--5 {
    @apply bottom-[48%] right-3 transform -translate-y-1/2;
  }
  &--9 {
    @apply bottom-5 left-1/2 transform -translate-x-1/2 rotate-90;
  }
}
</style>
