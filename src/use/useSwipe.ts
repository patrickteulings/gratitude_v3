
import { reactive, computed, ref, toRefs, watch } from 'vue'

export const useSwipe = (element?: any) => {
  console.log(element)
  const distance = ref(0)
  const direction = ref('left')
  const el = element
  const isInputDeviceDown = ref(false)
  const startX = ref(0)
  const currentX = ref(0)
  const counter = ref(0)
  const endX = ref(0)
  const diffX = ref(0)
  const elementX = ref(0)

  const handleStart = (e) => {
    console.log('handleStart')
    isInputDeviceDown.value = true
    diffX.value = 0
    startX.value = Math.round((e.touches) ? e.touches[0].screenX : e.screenX)
  }

  const handleMove = (e): number => {
    if (isInputDeviceDown.value === true) {
      currentX.value = Math.round((e.touches) ? e.touches[0].screenX : e.screenX)
      diffX.value = startX.value - currentX.value

      el.value.style.transform = `translateX(${elementX.value - diffX.value}px)`
      console.log(endX.value, currentX.value, diffX.value, (endX.value - diffX.value))
    }

    return currentX.value
  }

  const handleEnd = (e) => {
    elementX.value = elementX.value - diffX.value

    if (elementX.value > 0) {
      elementX.value = 0
      el.value.style.transform = `translateX(0px)`
    }
    if (elementX.value < -320) {
      elementX.value = -320
      el.value.style.transform = `translateX(-320px)`
    }

    console.log(elementX.value)
    // endX.value = currentX.value
    isInputDeviceDown.value = false
  }

  const setCurrentX = () => {
    counter.value += 210
  }

  const getNewPosition = () => {
    el.style.transform = `translateX(${diffX.value}px)`
    // return { transform: `translateX(${highlightsPosition.value}px)` }
  }

  const addEvents = () => {
    console.log('ss', el.value)

    if (el.value === null) return
    const track = el.value
    // track.addEventListener('touchstart', handleStart, false)
    // track.addEventListener('mousedown', handleStart, false)
    // track.addEventListener('touchend', handleEnd, false)
    // track.addEventListener('mouseup', handleEnd, false)
    // track.addEventListener('touchcancel', handleEnd, false)
    // track.addEventListener('touchmove', handleMove, false)
    // track.addEventListener('mousemove', handleMove, false)
  }

  watch(element, oldelement => {
    addEvents()
  })

  return {
    current: counter,
    counter,
    currentX,
    diffX,
    isInputDeviceDown,
    getNewPosition,
    setCurrentX,
    handleMove
  }
}
