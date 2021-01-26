<template>
  <div>
    <div class="contentEditableField" @keyup="handleKeyUp" @keydown="handleKeyDown" @click="handleFocus" :class="[equalToPlaceHolder ? 'placeholder' : '', getClassname()]" contenteditable="true" v-html="content"></div>
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
    // const contentField = ref()
    const contentField = ref()

    const contenteditableHeader = ref()
    const contenteditableBody = ref()


    const getClassname = () => {
      return props.className
    }

    // Handles focus, setting cursor position
    const handleFocus = (e: { target: HTMLInputElement }) => {
      // const el: HTMLInputElement = e.target

      // if (el.innerText !== beasty.value) return

      // const setpos = document.createRange()
      // const set = window.getSelection()

      // setpos.setStart(el.childNodes[0], 0)
      // setpos.collapse(true)

      // if (set) set.removeAllRanges()
      // if (set) set.addRange(setpos)

      // el.focus()
    }

    // You can call this from anywhere to reset all values
    const resetView = () => {
      const contenteditableFields = document.querySelectorAll('.contentEditableField')

      beasty.value = `It's called Gratitude`

      for (const el of contenteditableFields) {
        el[0].innerText = ''
        el[0].innerText = beasty.value
        equalToPlaceHolder.value = (el[0].innerText === beasty.value)
      }
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

      // handles classname if there is / is not any text / placeholder
      equalToPlaceHolder.value = (el.innerText === beasty.value)

      context.emit('update-content', el.innerText)
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
      contentField,
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
