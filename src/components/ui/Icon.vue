<template>
  <span v-html="selectedIcon">
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IIconProps } from '@/types/Icon'

export default defineComponent({
  props: {
    iconProperties: {
      type: Object as PropType<IIconProps>,
      required: true
    }
  },
  setup (props) {
    // console.log(props.iconProperties)
    // const test = 'test'
    const paths = {
      'check': '20 6 9 17 4 12',
      'unCheck': '20 6 9 17 4 12',
      'shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
    }

    // console.log(paths[props.iconProperties.name])

    // const selectedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${props.iconProperties.size}" height="${props.iconProperties.size}" viewBox="0 0 24 24" fill="none" stroke=${props.iconProperties.strokeColor} stroke-width="${props.iconProperties.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="${paths[props.iconProperties.name]}"></polyline></svg>`
    const selectedIcon = `<img src="/assets/icons/feather/${props.iconProperties.name}.svg"/>`
    return {
      selectedIcon
    }
  }
})
</script>

<style scoped>

</style>
