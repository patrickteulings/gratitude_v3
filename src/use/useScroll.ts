
import { reactive, onMounted, onBeforeUnmount, toRefs } from 'vue'

interface IState {
  scrollX: number | null;
  scrollY: number | null;
}

export const useScroll = () => {
  const state: IState = reactive({
    scrollX: null,
    scrollY: null
  })

  const handleScroll = () => {
    state.scrollY = window.pageYOffset
    state.scrollX = window.pageXOffset
  }

  onMounted(() => {
    document.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', handleScroll)
  })

  return {
    ...toRefs(state),
    handleScroll
  }
}
