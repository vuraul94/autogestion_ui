<template>
  <div
    class="side-menu"
    :class="{
      collapsed: isCollapsed,
      mobile: isMobile,
    }"
    ref="sideMenu"
  >
    <div v-if="!isMobile" class="side-menu__header">
      <img
        v-if="!isCollapsed"
        :src="logoSrc"
        class="h-[30px]"
        alt="logo"
      />
      <button @click="toggleMenu">
        <FontAwesomeIcon
          :icon="isCollapsed ? ['fas', 'bars'] : ['fas', 'times']"
        />
      </button>
    </div>

    <div v-if="isMobile" class="side-menu__header--subsection mt-4">
      <img
        :src="data.profileURL"
        alt="profile"
        @click="toggleDropdownProfile"
        class="rounded-full w-14 h-14 object-cover aspect-square cursor-pointer"
      />
      <span class="font-bold text-dark">{{ data.nameUser }}</span>
      <span class="text-dark-2">{{ data.userPosition }}</span>
      <Dropdown
        :options="data.companies"
        :value="data.companies && data.companies[0]"
        @onOptionSelected="changeCompany"
        @click="closeDropdowns"
      />
    </div>

    <div
      v-if="!isCollapsed"
      class="side-menu__header--subsection border-y border-light"
    >
      <div class="input--with-icon-left input--with-icon-gray">
        <input
          type="text"
          v-model="searchTerm"
          :placeholder="t('misc.search')"
        />
        <FontAwesomeIcon
          :icon="['fas', 'magnifying-glass']"
          class="text-dark-3"
        />
      </div>
    </div>

    <div v-if="!isCollapsed" class="side-menu__navigation">
      <ul :style="`min-height:${filteredLinks?.length * 60 + 40}px`">
        <li>
          <RouterLink to="/" class="side-menu__navigation-item group">
            <FontAwesomeIcon icon="home" class="side-menu__navigation-item-icon" />
            <span v-if="!isCollapsed">
              {{ t('menu.general') }}
            </span>
          </RouterLink>
        </li>
        <li v-for="(link, index) in filteredLinks" :key="index">
          <RouterLink
            :to="link.route"
            class="side-menu__navigation-item group"
            @click="collapseMenu"
          >
            <FontAwesomeIcon
              :icon="link.icon"
              class="side-menu__navigation-item-icon"
            />
            <span v-if="!isCollapsed">
              {{ t('menu.' + link.text) }}
            </span>
          </RouterLink>
        </li>
        <li v-if="isMobile" class="side-menu__navigation-item group mt-8">
          <button class="side-menu__footer-link">
            <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" />
            <span>{{ $t('misc.logout') }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div v-if="!isCollapsed && !isMobile" class="side-menu__footer">
      <button class="side-menu__footer-link">
        <FontAwesomeIcon :icon="['fas', 'sign-out-alt']" />
        <span>{{ $t('misc.logout') }}</span>
      </button>
      <img src="../../images/logo-developers.svg" alt="Footer Logo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';
import type { SideMenuProps } from '../../types/side-menu';
import { Dropdown } from '@autogestion/ui';

const props = defineProps<SideMenuProps>();
const { t } = useI18n();

const isCollapsed = ref(props.isMobile);
const isMobile = ref(props.isMobile);

const sideMenu = ref(null);
const topBar = ref(null); // Ahora como ref vacía

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Nueva función para colapsar el menú
const collapseMenu = () => {
  if (isMobile.value) {
    isCollapsed.value = true;
  }
};

// Obtener la referencia de `topBar` al montar el componente
onMounted(() => {
  topBar.value = document.querySelector('.top-bar');
});

// Diccionario de sinónimos y rutas anidadas para coincidencias internas
const synonyms: { [key: string]: string[] } = {
  general: [
    'menu.general',
    'general',
    'overview',
    'summary',
    'contract',
    'record',
    'expediente',
  ],
};

const searchTerm = ref('');

// Filtrado de enlaces usando `props.links`, sinónimos y texto traducido
const filteredLinks = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) return props.links;

  return props.links.filter((link) => {
    const mainText = t('menu.' + link.text).toLowerCase();
    const synonymsList = link.text in synonyms ? synonyms[link.text] : [];

    // Verificar coincidencia en texto traducido o en sinónimos traducidos
    return (
      mainText.includes(term) || // Coincidencia en el texto principal
      synonymsList.some((synonym: any) =>
        t(synonym).toLowerCase().includes(term)
      ) // Coincidencia con sinónimos traducidos
    );
  });
});

// Handler para detectar clics fuera del menú en mobile
const clickOutsideHandler = (event: MouseEvent) => {
  if (
    isMobile.value &&
    sideMenu.value &&
    !sideMenu.value.contains(event.target) &&
    topBar.value &&
    !topBar.value.contains(event.target)
  ) {
    isCollapsed.value = true;
  }
};

// Observa cambios en `isMobile` para agregar o eliminar el evento
watch(isMobile, (newVal) => {
  if (newVal) {
    document.addEventListener('click', clickOutsideHandler);
  } else {
    document.removeEventListener('click', clickOutsideHandler);
  }
});

// Agregar el evento si `isMobile` ya es true al montar
onMounted(() => {
  if (isMobile.value) {
    document.addEventListener('click', clickOutsideHandler);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideHandler);
});

defineExpose({
  isCollapsed,
  toggleMenu,
});

const data = {
  profileURL:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  nameUser: 'Jane Doe',
  userPosition: 'Developer',
  companies: [
    { label: 'Company 1', value: 'company1' },
    { label: 'Company 2', value: 'company2' },
    { label: 'Company 3', value: 'company3' },
    { label: 'Company 4', value: 'company4' },
  ],
};
</script>

<style lang="postcss" scoped>
.side-menu {
  @apply min-w-[250px] w-[250px] bg-white h-full flex flex-col transition-all duration-300 ease-in-out;

  &__header {
    @apply min-h-[100px] flex items-center justify-center mb-8 relative;

    button {
      @apply absolute text-main right-[25px];

      svg {
        @apply h-[25px];
      }
    }

    &--subsection {
      @apply flex flex-col text-white p-4 gap-2;
    }
  }

  &__navigation {
    @apply flex-1 space-y-1 mt-4 overflow-y-auto;

    &-item {
      @apply h-[60px] pl-[35px] relative flex items-center font-bold text-dark-3 space-x-4;

      &:hover {
        @apply text-main;
      }

      &-icon {
        @apply h-[25px];
      }

      &.router-link-active {
        @apply text-main;

        &::before {
          content: '';
          @apply absolute left-0 h-full w-1 bg-main rounded-tr rounded-br;
        }
      }
    }
  }

  &__footer {
    @apply flex flex-col items-center space-y-4 py-10;

    &-link {
      @apply flex items-center text-lg font-medium text-dark-3 hover:text-error space-x-6;
    }
  }

  &.collapsed {
    @apply min-w-[75px] w-[75px];

    .side-menu__header {
      button {
        @apply right-auto;
        svg {
          @apply h-[20px];
        }
      }
    }
  }

  &.mobile {
    @apply min-w-[250px] w-[250px] pb-24 overflow-scroll;

    .side-menu__navigation-item {
      &.router-link-active {
        &::before {
          @apply hidden;
        }
      }
    }

    &.collapsed {
      @apply hidden;
    }
  }
}
</style>
