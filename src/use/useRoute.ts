
import { reactive, computed, toRefs, onMounted } from 'vue'
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
