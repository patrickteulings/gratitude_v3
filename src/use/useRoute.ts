
import { reactive, toRefs } from 'vue'
import router from '@/router'


export const useRoute = () => {
  const state = reactive({
    appRoute: {}
  })

  router.afterEach(route => {
    state.appRoute = route
  })

  return {
    ...toRefs(state)
  }
}
