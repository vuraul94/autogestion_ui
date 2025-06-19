<template>
  <div
    class="relative inline-block text-left cursor-pointer flex gap-1"
    @click="toggleDropdown"
    ref="dropdownRef"
  >
    <slot />

    <!-- Dropdown que aparece al hacer clic -->
    <div
      v-if="isDropdownOpen"
      :class="[
        'action-dropdown',
        dropdownAlignment === 'right' ? 'left-0' : 'right-0',
      ]"
      ref="dropdownBoxRef"
    >
      <ul class="py-1">
        <li
          v-for="(action, index) in actions"
          :key="index"
          class="block w-full"
        >
          <template v-if="action.clickHandler">
            <button
              @click="handleClick(action)"
              class="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-light-2 hover:text-info flex"
            >
              {{ action.label }}
            </button>
          </template>
          <template v-else-if="action.href">
            <a
              :href="action.href"
              class="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-light-2 hover:text-info"
            >
              {{ action.label }}
            </a>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  dropdownLabel: {
    type: String,
    default: 'Actions',
  },
  actions: {
    type: Array,
    required: true,
    default: () => [], // Cambiado a una función que retorna un array vacío
  },
  icon: {
    type: Array,
    default: () => ['fas', 'chevron-down'], // Cambiado a una función que retorna un array
  },
  menuDir: {
    type: String,
    default: 'right',
  },
  container: {
    type: Object as () => HTMLElement | null, // Ahora acepta un nodo HTML o null
    default: null,
  },
});

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownBoxRef = ref<HTMLElement | null>(null);
const dropdownAlignment = ref(props.menuDir);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  
  if (isDropdownOpen.value) {
    // Restablecer alineación antes de recalcular
    dropdownAlignment.value = props.menuDir;
    
    nextTick(() => {
      setTimeout(() => {
        adjustDropdownPosition();
      }, 10);
    });
  }
};

const handleClick = (action: { clickHandler?: Function }) => {
  if (action.clickHandler) {
    action.clickHandler();
  }
  isDropdownOpen.value = false;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

const adjustDropdownPosition = () => {
  if (!dropdownBoxRef.value) return;

  nextTick(() => {
    const dropdownBox = dropdownBoxRef.value.getBoundingClientRect();
    const containerBox = props.container ? props.container.getBoundingClientRect() : null;

    const viewportWidth = containerBox ? containerBox.right : window.innerWidth;

    // Verifica si el dropdown se sale por la derecha o la izquierda
    if (dropdownBox.right > viewportWidth) {
      dropdownAlignment.value = 'left';
    } else if (dropdownBox.left < (containerBox ? containerBox.left : 0)) {
      dropdownAlignment.value = 'right';
    } else {
      dropdownAlignment.value = props.menuDir;
    }
  });
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="postcss" scoped>
.action-dropdown {
  @apply absolute w-60 lg:w-96 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10;
  ul {
    @apply divide-y px-4 py-2;
  }
  li {
    @apply font-mulish text-dark-2 p-2;
  }
}
</style>
