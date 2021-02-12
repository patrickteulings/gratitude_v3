<template>
  <div class="monthAgo" v-if="pastEntries.length">
    <div class="monthAgo__inner">
      <h5 style="color: white;">Lookback at your entries from one month ago</h5>
      <div v-for="(gratitude) in pastEntries" :key="gratitude.id" @click="handleClick(gratitude)">
        <small>{{ getDate(gratitude.data.timeStamp) }}</small>
        <h3 style="color: #C6C150">{{ gratitude.data.title }}</h3>
        <p>{{ gratitude.data.body }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, SetupContext } from 'vue'

// Composables
import useGratitudeFilters from '@/use/gratitude/useGratitudeFilters'
import useDate from '@/use/useDate'

// Interfaces
import { IGratitudeWrapper } from '@/types/Gratitude'

export default defineComponent({
  props: {
    currentDate: {
      type: Date,
      required: true
    }
  },

  setup (props, { emit }: SetupContext) {
    console.log('SETUP')
    const propsDate = ref(new Date(props.currentDate))
    const pastEntries = ref<IGratitudeWrapper[]>([])
    const getDate = (date): string => useDate().getDefaultFormat(date.toDate())

    const handleClick = (gratitude: IGratitudeWrapper): void => {
      emit('onclicked', gratitude)
    }

    const handleDate = () => {
      pastEntries.value = useGratitudeFilters().getLastWeeksGratitude(propsDate.value)
      console.log('getLastWeeksGratitude ', useGratitudeFilters().getLastWeeksGratitude(propsDate.value))
    }

    onMounted(() => {
      // const theDate = new Date(props.currentDate)
      console.log(useGratitudeFilters().getLastMonthsGratitude(propsDate.value))
      handleDate()
    })


    watch(props, (props) => {
      console.log('SUBWEEKS')
      propsDate.value = new Date(props.currentDate)
      pastEntries.value = []
      handleDate()
      console.log('getLastMonthsGratitude ', useGratitudeFilters().getLastMonthsGratitude(propsDate.value))
      console.log('getLastWeeksGratitude ', useGratitudeFilters().getLastWeeksGratitude(propsDate.value))
      const el = useGratitudeFilters().getLastMonthsGratitude(propsDate.value)

      el.forEach((gratitude) => {
        pastEntries.value.push(gratitude)
      })
    })

    return {
      propsDate,
      pastEntries,
      handleClick,
      handleDate,
      getDate
    }
  }
})
</script>

<style scoped>

</style>
