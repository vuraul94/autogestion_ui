<template>
  <div class="top-bar" ref="topBar">
    <div class="top-bar__mobile">
      <button
        class="top-bar__mobile__side-menu-toggle"
        @click="emit('onToggleClick')"
      >
        <FontAwesomeIcon
          :icon="isMobileMenuVisible ? ['fas', 'bars'] : ['fas', 'times']"
        />
      </button>

      <img src="../../images/logo-menu.svg" alt="Logo" />
      <div class="absolute -right-4">
        <ActionsDropdown
          :actions="profileOptions"
          @click="closeDropdowns"
          menu-dir="left"
        >
          <!-- Botón principal que muestra el label -->
          <img
            :src="data.profileURL"
            alt="profile"
            @click="toggleDropdownProfile"
            class="rounded-full w-12 h-12 object-cover aspect-square"
          />
        </ActionsDropdown>
      </div>
    </div>

    <div class="top-bar__desktop">
      <div>
        <button
          v-if="isChildRoute"
          class="inli9ne-flex bg-light-3 justify-center items-center p-2 py-4 rounded-lg text-main font-bold text-lg m-4"
          @click="router.back()"
        >
          <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
        </button>
        <h1 class="inline-flex">
          {{ $t('titles.' + $route.meta.title) }}
        </h1>
      </div>

      <div class="ml-4 flex gap-4 items-center h-full w-auto">
        <Dropdown
          :options="data.companies"
          :value="data.companies[0]?.nodoOrganizacionId?? 0"
          @onOptionSelected="changeCompany"
          class="whitespace-nowrap w-80"
          valueKey="nodoOrganizacionId"
          labelKey="nombre"
          @click="closeDropdowns"
        />

        <ActionsDropdown :actions="notifications" @click="closeDropdowns">
          <button class="bg-light-4 rounded-full h-12 w-12 relative">
            <FontAwesomeIcon
              :icon="['far', 'bell']"
              class="text-main w-5 h-5"
            />
            <FontAwesomeIcon
              v-if="haveNewNotifications"
              :icon="['fas', 'circle']"
              class="text-error w-2 h-2 absolute right-[14px] top-3"
            />
            <FontAwesomeIcon
              v-else
              :icon="['far', 'circle']"
              class="text-main w-2 h-2 absolute right-[14px] top-3"
            />
          </button>
        </ActionsDropdown>
        <ActionsDropdown :actions="profileOptions" @click="closeDropdowns">
          <!-- Botón principal que muestra el label -->
          <img
            :src="data.profileURL"
            alt="profile"
            @click="toggleDropdownProfile"
            class="rounded-full w-14 h-14 object-cover aspect-square cursor-pointer"
          />
        </ActionsDropdown>
      </div>
      <ActionsDropdown
        :actions="languageActions"
        @click="closeDropdowns"
        menu-dir="left"
      >
        <!-- Botón principal que muestra el label -->
        <button
          class="flex items-center space-x-2 text-main hover:text-info font-bold"
        >
          <span>{{ $t('misc.language') }}</span>
          <!-- Uso del componente FontAwesomeIcon para mostrar la flecha -->
          <FontAwesomeIcon :icon="['fas', 'globe']" class="text-base" />
        </button>
      </ActionsDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
import { ActionsDropdown, Dropdown } from '@autogestion/ui';
import { onClickOutside } from '@vueuse/core';
const router = useRouter();
const route = useRoute();
const isChildRoute = computed(() => {
  const splitedPath = route.path.split('/');
  return splitedPath.length > 2 || ['/contract'].includes(route.path);
});

defineProps({
  isMobileMenuVisible: Boolean,
});

const emit = defineEmits(['onToggleClick']);

const languageActions = [
  {
    label: 'Español',
    clickHandler: () => {
      locale.value = 'es';
      localStorage.setItem('user-locale', 'es');
    },
  },
  {
    label: 'English',
    clickHandler: () => {
      locale.value = 'en';
      localStorage.setItem('user-locale', 'en');
    },
  },
];
type Company = {
  nodoOrganizacionId: number;
  nombre: string;
};

const data = ref<{
  profileURL: string;
  companies: Company[];
}>({
  profileURL: localStorage.getItem('imagenPerfil') || "",
  companies: [],
});


const cargarCompanias = async () => {
  try {
    // const response: Company[] = await axiosHelper.get({
    //   url: '/Organizacion'
    // }, router); // originally this was fetching from the backend but now I'm using a static data for demonstration purposes
    data.value.companies = [
      { nodoOrganizacionId: 1, nombre: 'Company 1' },
      { nodoOrganizacionId: 2, nombre: 'Company 2' },
      { nodoOrganizacionId: 3, nombre: 'Company 3' },
    ];
    // Guardar el NodoOrganizacionId
    localStorage.setItem("nodoOrganizacionId", response[0].nodoOrganizacionId.toString());
  } catch (error) {
    console.log(error);
  }
}

const cargarImagen = async () => {
  const response = await axiosHelper.get({ url: '/PersonaView' }, router);
  if (response != undefined && response?.imagen != undefined && response?.imagen != null)
  {
    localStorage.setItem('imagenPerfil', "data:image/*;base64," + response?.imagen);
  }
}

onMounted(async () => {
  await cargarCompanias();
  await cargarImagen();
});

const topBar = ref(null);
const openNotMenu = ref(false);
const toggleDropdownNot = () => {
  if (!openNotMenu.value) openProfileMenu.value = false;
  openNotMenu.value = !openNotMenu.value;
};
const openProfileMenu = ref(false);
const toggleDropdownProfile = () => {
  if (!openProfileMenu.value) openNotMenu.value = false;
  openProfileMenu.value = !openProfileMenu.value;
};
onClickOutside(topBar, () => {
  closeDropdowns();
});

const notifications = ref([
  { label: 'Lorem Ipsum 1', href: '/not1', isNew: true },
  { label: 'Lorem Ipsum 2', href: '/not2', isNew: false },
  { label: 'Lorem Ipsum 3', href: '/not3', isNew: false },
]);

const haveNewNotifications = computed(() => {
  let response = false;
  for (let i = 0; i < notifications.value.length; i++) {
    if (notifications.value[i].isNew) {
      response = true;
    }
  }
  return response;
});

const profileOptions = ref([
  { label: 'Cambiar Contraseña', href: '/renew-password' },
  { label: 'Configuracion', href: '/profile' },
]);

const changeCompany = (e: string) => {
  if(e != undefined && e != null && e != "")
  {
    localStorage.setItem("nodoOrganizacionId", e);
  }
};

const closeDropdowns = () => {
  openNotMenu.value = false;
  openProfileMenu.value = false;
};
</script>

<style lang="postcss" scoped>
.top-bar {
  @apply min-h-[80px] sm:min-h-[100px] border-b border-light flex items-center px-10 md:px-6;

  &__mobile {
    @apply lg:hidden w-full relative flex items-center justify-center;

    &__side-menu-toggle {
      @apply absolute -left-4 text-main;

      svg {
        @apply h-[20px];
      }
    }
  }

  &__desktop {
    @apply hidden lg:flex w-full justify-between items-center gap-2;

    h1 {
      @apply text-main text-2xl font-bold;
    }
  }
}
</style>
