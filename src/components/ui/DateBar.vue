<template>
  <div class="gooey"></div>
  <div class="datebar">
    <div></div>
    <div class="datebar__inner">
      <div
        v-for="weekday in weekdays"
        @click="selectDate(weekday)"
        :key="weekday"
        class="datebar__item" :class="[isDateInFuture(weekday) ? 'future' : '', dayHasEntry(weekday) ? 'hasEntry': 'hasNoEntry', (selectedDate === weekday) ? 'active' : '']"
        :title="getDefaultFormat(weekday)"
      >
        <div class="datebar__number" :class="dayHasEntry(weekday) ? 'hasEntry': 'hasNoEntry'">
          <div class="datebar__number--number">{{ getDayName(weekday) }}</div>
          <!-- <div class="datebar__icon--wrapper"><Icon class="datebar__icon" :iconProperties="{name: 'shield', size: '16', strokeColor: '#9CB210', strokeWidth: 2}" /></div> -->
        </div>
        <span class="datebar__number--hidden-number">{{ getDefaultFormat(weekday) }}</span>
      </div>
      <div class="datebar__kebab">
        <div class="datebar__number">...</div>
      </div>
    </div>
  </div>
  <div style="padding: 1rem;">
    <h5 style="color: white;">Hi Patrick</h5>
    <p>You've done some amazing things this week</p>
  </div>
</template>

<script lang="ts">
// src/components/ui/DateBar.vue

// Core
import { defineComponent, computed, ref, SetupContext } from 'vue'
import store from '@/store'

// Components
import Icon from '@/components/ui/Icon.vue'

// Composables
import { useDate } from '@/use/useDate'

// Interfaces
import { IGratitude } from '@/types/Gratitude'

// Third Party
import isSameDay from 'date-fns/isSameDay'

// Go Time
export default defineComponent({
  name: 'DateBar',

  props: {
    msg: String
  },

  components: {
    // Icon
  },

  emits: ['resetDateSelection', 'dateSelected'],

  setup (props, context: SetupContext) {
    const getWeekDays = () => Array.from({ length: 7 }, (v, i) => {
      const startOfWeek = useDate().getStartOfWeek()

      return new Date(startOfWeek.setDate(startOfWeek.getDate() + i))
    })

    const selectedDate = ref<Date | null>()

    const allGratitudes = computed(() => {
      const gratitudes: Array<IGratitude> = store.getters['gratitudeStore/getGratitudes']

      return gratitudes.length ? gratitudes : []
    })

    const dayHasEntry = (date: Date): boolean => {
      let isSameDate = false
      const gratitudes = store.getters['gratitudeStore/getGratitudes']

      gratitudes.map((gratitude) => {
        const dayStamp = gratitude.data.dayStamp.toDate()
        if (isSameDay(date, dayStamp)) isSameDate = true
      })

      return isSameDate
    }

    const getDefaultFormat = (date: Date) => useDate().getDefaultFormat(date)
    const isDateInFuture = (date: Date): boolean => useDate().isDateInFuture(date)
    const getDayName = (date: Date) => useDate().getDayName(new Date(date))

    const selectDate = (date: Date): void => {
      const { emit } = context

      selectedDate.value = (selectedDate.value === date) ? null : date

      emit((selectedDate.value === null) ? 'resetDateSelection' : 'dateSelected', date)
    }

    const weekdays = getWeekDays()

    return {
      weekdays,
      allGratitudes,
      getWeekDays,
      dayHasEntry,
      getDefaultFormat,
      getDayName,
      isDateInFuture,
      selectDate,
      selectedDate
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
