<template>
  <div class="moods-item">
    <div class="moods-item__inner">
      <div class="moods-item__color" @click="handleItemClick">
        <span class="moods-item__color-dot" :style="{backgroundColor: selectedColor}"></span>
      </div>
      <div class="moods-item__label" contenteditable="true" @keyup="handleLabelChange">
        {{ label }}
      </div>
      <div class="moods-item__save" :class="{saving: isUpdating}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
    </div>
    <div class="moods-item-colors" :class="{ open: editColor }">
      <div v-for="color in colors" :key="color" class="moods-item-colors__item" :style="{backgroundColor: color}" @click="handleColorSelect(color)"></div>
      <div class="moods-item-colors__underlay" @click="handleItemClick"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, SetupContext } from 'vue'
import store from '@/store'

import { db } from '@/config/firebaseConfigTypeScript'

import { IMood } from '@/types/Mood'

export default defineComponent({
  name: 'DropDown',
  props: {
    moodData: {
      type: Object as PropType<IMood>
    }
  },
  setup (props, context: SetupContext) {
    const mood: IMood = (props.moodData !== undefined) ? props.moodData : {}
    const { label } = mood
    const editColor = ref(false)
    const colors = ['#013439', '#CFB495', '#547276', '#A7A233']
    const selectedColor = ref((props.moodData) ? props.moodData.value : '#DFA3CF')
    const isUpdating = ref(false)

    const handleItemClick = () => {
      editColor.value = !editColor.value
    }

    // Save Updates to Database
    const handleUpdate = () => {
      isUpdating.value = true
      const payload = { mood: mood, user: store.getters['userStore/getUser'] }

      store.dispatch('moodStore/updateMood', payload).then(() => {
        console.log('responseDone,')
        isUpdating.value = false
      })
    }

    // Update the color visually and in Mood object
    const handleColorSelect = (color: string) => {
      selectedColor.value = color
      mood.value = color
      handleUpdate()
    }

    // Update the label value, on every keypress (UP)
    const handleLabelChange = (e: {target: HTMLDivElement}) => {
      mood.label = e.target.innerText
      handleUpdate()
    }

    return {
      mood,
      label,
      colors,
      selectedColor,
      editColor,
      handleItemClick,
      handleColorSelect,
      handleLabelChange,
      isUpdating
    }
  }
})
</script>
