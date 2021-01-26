<template>
  <section class="section navigationDrawer" :class="[menuOpen ? 'opened' : 'closed']">
    <div class="section__inner">
      <button v-if="fullMenu" class="btn--reset btn--hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navigationDrawer__profile" v-if="user">
        <div class="profile__avatar">
          <div class="avatar">
            <img :src="user.photoURL" :alt="user.displayName">
          </div>
        </div>
        <div class="profile__information">
          <div class="profile__name">{{ user.displayName }}</div>
          <a class="profile__edit">Click to edit</a>
        </div>
      </div>

      <nav role="navigation" class="navigation">
        <ul class="navigation__list">
          <li class="navigation__item">
            <span class="navigation__icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></span>
            <a class="navigation__link" @click.prevent="navigateTo('/')" href="/">Home</a>
          </li>
          <li class="navigation__item">
            <span class="navigation__icon icon-sun"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span>
            <a class="navigation__link" @click.prevent="navigateTo('/moods/edit')" href="/moods/edit">Moods</a>
          </li>
          <li class="navigation__item">
            <span class="navigation__icon"><svg xmlns="http://www.w3.org/2000/svg" width=18 height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-toggle-left"><rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle></svg></span>
            <a class="navigation__link" @click.prevent="navigateTo('/gratitude/habits')" href="/gratitude/habits">Habits</a>
          </li>
          <li class="navigation__item">
            <span class="navigation__icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span>
            <a class="navigation__link" @click.prevent="navigateTo('/gratitude/settings')" href="/gratitude/settings">Settings</a>
          </li>
          <li class="navigation__item add">
            <span class="navigation__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></span>
            <a class="navigation__link" @click.prevent="navigateTo('/gratitude/new')" href="/gratitude/new">Add new</a>
          </li>
          <li class="navigation__item last">
            <div class="spacer">
              <span class="navigation__icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>
              <a class="navigation__link" @click.prevent="navigateTo('/about')" href="/about">About this beautifull app</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="navigationDrawer__illustration">
        <div class="illustration-tree"><img src="/assets/images/menu/tree.svg" role="presentation"></div>
        <div class="illustration-mountain-left"><img src="/assets/images/menu/mountain-left.svg" role="presentation"></div>
        <div class="illustration-mountain-right"><img src="/assets/images/menu/mountain-right.svg" role="presentation"></div>
      </div>
    </div>
    <div @click="toggleMenu" class="navigationDrawer__underlay" title="click to close menu"></div>
  </section>
</template>

<script lang="ts">
// Core
import { defineComponent, ref, computed, reactive, watch } from 'vue'
import router from '@/router'
import store from '@/store'

// Composables
import { useRoute } from '@/use/useRoute'

export default defineComponent({
  name: 'NavigationDrawer',
  setup () {
    const menuOpen = ref<boolean>(false)
    const user = computed(() => store.getters['userStore/getUser'])
    // const bodyElement = document.getElementsByTagName('body')[0]
    const appRoute = reactive(useRoute())
    const fullMenu = ref(true)

    const openMenu = (): void => {
      // bodyElement.style.overflow = 'hidden'
      menuOpen.value = true
    }

    const closeMenu = (): void => {
      // bodyElement.style.overflow = 'auto'
      menuOpen.value = false
    }

    const toggleMenu = (): void => {
      (menuOpen.value === true) ? closeMenu() : openMenu()
    }

    const navigateTo = (_path: string): void => {
      router.push({ path: _path })
      closeMenu()
    }

    const handleRouteChange = (route) => {
      if (route && route.name === 'editMoods') {
        fullMenu.value = false
      } else {
        fullMenu.value = true
      }

      console.log('handleRouteChange', fullMenu.value)
    }

    watch(appRoute, (args) => {
      handleRouteChange(args.appRoute)
    })

    return {
      user,
      toggleMenu,
      openMenu,
      closeMenu,
      menuOpen,
      navigateTo,
      fullMenu
    }
  }
})
</script>

<style scoped lang="scss">

</style>
