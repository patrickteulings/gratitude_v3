<template>
  <div>
    <div class="contentEditableField" @keyup="handleKeyUp" @keydown="handleKeyDown" @input="handleKeyUp" @click="handleFocus" :class="[equalToPlaceHolder ? 'placeholder' : '', getClassname()]" contenteditable="true" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType, SetupContext } from 'vue'
import { UseBeastie } from '@/use/useBeastie'

const ContentEditable = defineComponent({
  props: {
    className: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props, context: SetupContext) {
    const beasty = ref<string>('')
    const content = ref<string>('')

    const equalToPlaceHolder = ref<boolean>(true)

    const contenteditableHeader = ref()
    const contenteditableBody = ref()

    // Props
    const getClassname = () => {
      return props.className
    }

    // Handles focus, setting cursor position
    const handleFocus = (e: { target: HTMLInputElement }) => {
      const el: HTMLInputElement = e.target
      context.emit('on-focus')
    }

    // You can call this from anywhere to reset all values
    const resetView = () => {
      // Props could add multiple classname, let's take the first one!
      const firstClassName = props.className.split(' ')[0]
      const contenteditableField: HTMLDivElement = document.querySelector(`.${firstClassName}`) as HTMLDivElement

      beasty.value = `It's called Gratitude`

      if (contenteditableField) contenteditableField.innerText = beasty.value

      equalToPlaceHolder.value = (contenteditableField.innerText === beasty.value)
    }

    // Handles placeholder, deletes placeholder on keydown
    const handleKeyDown = (e: { target: HTMLInputElement }): void => {
      const el: HTMLInputElement = e.target

      if (el.innerText === beasty.value) el.innerText = ''
    }

    // Handles placeholder text and classnames
    // Beware!! Only do this on KeyUp because of scrolling glitches on keydown
    const handleKeyUp = (e: { target: HTMLInputElement }): void => {
      const el: HTMLInputElement = e.target

      // Reset to placeholder if no text is entered
      if (!el.innerText.length) el.innerText = beasty.value
      console.log('CAPS')
      // handles classname if there is / is not any text / placeholder
      equalToPlaceHolder.value = (el.innerText === beasty.value)
      context.emit('update-content', el.innerHTML)

      // @todo
      // Contenteditable doesn't recognise it when an emoji is inserted. It does not have an 'onInput' event.
      // OIf we don't type anything after an emoji, to trigger the content update, the emoji wont be saved
    }

    onMounted(() => {
      beasty.value = UseBeastie()
      content.value = beasty.value
    })

    return {
      beasty,
      handleKeyUp,
      handleKeyDown,
      handleFocus,
      content,
      contenteditableHeader,
      contenteditableBody,
      equalToPlaceHolder,
      getClassname,
      resetView
    }
  }
})

export default ContentEditable

</script>


<style scoped lang="scss">

.placeholder {
  opacity: 0.5;
}
</style>
