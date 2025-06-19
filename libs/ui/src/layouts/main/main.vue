<script setup lang="ts">
import { onMounted, useTemplateRef, ref } from 'vue';
import { useRouter } from 'vue-router';

// Components
import SideMenu from '../../components/side-menu/side-menu.vue';
import TopBar from '../../components/top-bar/top-bar.vue';
import logo from '../../images/logo-menu.svg';

const router = useRouter();

function setupSessionTimeout() {
  // const token = localStorage.getItem('authToken');
  // const expirationTime = localStorage.getItem('expiresAt');

  //   console.log(expirationTime);
  //   if (token && expirationTime > 0) {

  //   if (timeRemaining > 0) {
  //     setTimeout(() => {
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('expiresAt');
  //       router.push('/login'); // Redirige al login cuando la sesión expira
  //     }, timeRemaining);
  //   } else {
  //     // Si el tiempo restante es 0 o negativo, redirige de inmediato
  //     localStorage.removeItem('authToken');
  //     localStorage.removeItem('expiresAt');
  //     router.push('/login');
  //   }
  // }
}
const sideMenuLinksData = ref(null);

// const sideMenuLinks = async () => // originally this function was async but now it's not needed
const sideMenuLinks = () =>
{ 
  // const data = await axiosHelper.get({ url: '/Menu' }, router); //data came originally from the backend but now i'm using a static data for demonstration purposes
  sideMenuLinksData.value = [
    {
      text: 'dashboard',
      icon: ['fas', 'tachometer-alt'],
      route: '/dashboard'
    },
    {
      text: 'users',
      icon: ['fas', 'users'],
      route: '/users'
    },
    {
      text: 'settings',
      icon: ['fas', 'cog'],
      route: '/settings'
    },
    {
      text: 'help',
      icon: ['fas', 'question-circle'],
      route: '/help'
    }
  ];
};

onMounted(() => {
// Llama a setupSessionTimeout cuando la aplicación esté montada
  setupSessionTimeout();
  sideMenuLinks();
});

const mobileSideMenu = useTemplateRef<typeof SideMenu>('mobile-side-menu')
</script>

<template>
  <div class="layout">
    <aside>
      <SideMenu
        :links="sideMenuLinksData"
        :logo-src="logo"
      />
    </aside>

    <main>
      <header>
        <TopBar
          :is-mobile-menu-visible="mobileSideMenu?.isCollapsed"
          @on-toggle-click="mobileSideMenu?.toggleMenu()"
        />
        <div class="side-menu__mobile-container">
          <SideMenu
            ref="mobile-side-menu"
            :is-mobile="true"
            :links="sideMenuLinksData"
          />
        </div>
      </header>

      <section>
        <slot />
      </section>
    </main>
  </div>
</template>

<style lang="postcss" scoped>
.layout {
  @apply flex h-full overflow-hidden;

  aside {
    @apply hidden lg:block border-r border-light;
  }

  header {
    @apply relative;

    .side-menu__mobile-container {
      @apply lg:hidden h-screen absolute top-[80px] z-10;
    }
  }

  main {
    @apply h-full grow flex flex-col overflow-hidden;

    section {
      @apply flex-1 overflow-y-auto bg-light-4;
    }
  }
}
</style>
