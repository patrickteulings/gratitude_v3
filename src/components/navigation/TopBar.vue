<template>
  <div v-if="fullMenu">
    <div v-if="user" class="topbar">
      <div></div>
      <div class="avatar--small">
        <img :src="user.photoURL" :alt="user.displayName">
      </div>
    </div>
  </div>
  <div v-else class="topBarEdit">
    <div class="topBarEdit__back" @click="handleBackButton"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
    <div class="topBarEdit__title"><h2>
      {{ topBarTitle }}
    </h2></div>
    <div class="topBarEdit__save"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, computed, watch, reactive, toRefs } from 'vue'
import store from '@/store'
import router from '@/router'

// Interfaces

// Composables
import { useRoute } from '@/use/useRoute'

export default defineComponent({
  setup () {
    const user = computed(() => store.getters['userStore/getUser'])
    // const appRoute = reactive(useRoute())

    const state = reactive({
      fullMenu: true,
      topBarTitle: '',
      appRoute: reactive(useRoute())
    })

    const handleRouteChange = (route) => {
      // appRoute = route
      if (route && route.name === 'editMoods') {
        state.fullMenu = false
        state.topBarTitle = 'Moods'
      } else {
        state.fullMenu = true
        state.topBarTitle = ''
      }
    }

    const handleBackButton = () => {
      history.back()
    }

    watch(state.appRoute, (args) => {
      console.log('watch', args.appRoute)
      // const { path } = second

      handleRouteChange(args.appRoute)
    })

    return {
      user,
      ...toRefs(state),
      handleBackButton
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
