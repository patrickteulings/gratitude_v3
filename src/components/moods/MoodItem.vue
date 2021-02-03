<template>
  <div class="moods-item">
    <div class="moods-item__inner">
      <div class="moods-item__color" @click="handleItemClick">
        <span class="moods-item__color-dot" :style="{backgroundColor: selectedColor}"></span>
      </div>
      <div class="moods-item__label" contenteditable="true" @keyup="handleLabelChange">
        {{ label }}
      </div>
    </div>
    <div class="moods-item-colors" :class="{ open: editColor }">
      <div v-for="color in colors" :key="color" class="moods-item-colors__item" :style="{backgroundColor: color}" @click="handleColorSelect(color)"></div>
      <div class="moods-item-colors__underlay" @click="handleItemClick"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { IMood } from '@/types/Mood'

export default defineComponent({
  name: 'DropDown',
  props: {
    moodData: {
      type: Object as PropType<IMood>
    }
  },
  setup (props) {
    const mood: IMood = (props.moodData !== undefined) ? props.moodData : {}
    const { label } = mood
    const editColor = ref(false)
    const colors = ['#013439', '#CFB495', '#547276', '#A7A233']
    const selectedColor = ref((props.moodData) ? props.moodData.value : '#DFA3CF')

    const handleItemClick = (el) => {
      editColor.value = !editColor.value
    }

    const handleColorSelect = (color: string) => {
      selectedColor.value = color
      mood.value = color
    }

    const handleLabelChange = (e: {target: HTMLDivElement}) => {
      mood.label = e.target.innerText
    }

    return {
      mood,
      label,
      colors,
      selectedColor,
      editColor,
      handleItemClick,
      handleColorSelect,
      handleLabelChange
    }
  }
})
</script>
