<template>
  <div class="hello">
    <div class="home--wrapper">
      <section class="section">
        <div class="section__inner">
          <Hero />
        </div>
      </section>
      <section class="section">
        <div class="section__inner">
          <DateBar @dateSelected="onDateSelection" @resetDateSelection="onResetDateSelection" />
        </div>
      </section>
      <section class="section">
        <div class="section__inner">
          <MonthsAgo :currentDate="thisDayAMonthAgo" @onclicked="goToDetailPage" />
        </div>
      </section>
      <section class="section">
        <div class="section__inner">
          <GratitudeCard style="position: relative; z-index: 2;" v-for="gratitude in filteredGratitudes" :key="gratitude.id" :gratitudeData="gratitude" @click="goToDetailPage(gratitude)" />
        </div>
      </section>
    </div>
    <div v-if="filteredGratitudes.length">yes, gevonden
    </div><div v-else>Not yet</div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, reactive, computed, onMounted, toRefs, watch } from 'vue'
import store from '@/store'
import router from '@/router'

// Components
import DateBar from '@/components/ui/DateBar.vue'
import Hero from '@/components/hero/hero.vue'
import GratitudeCard from '@/components/cards/GratitudeCard.vue'
import MonthsAgo from '@/components/toast/MonthsAgo.vue'

// Composables
import useDate from '@/use/useDate'
import useGratitudeFilters from '@/use/gratitude/useGratitudeFilters'
import { IGratitudeWrapper } from '@/types/Gratitude'
import { useGyro } from '@/use/useGyro'

// Interfaces


// Go Time
export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: String
  },

  components: {
    DateBar,
    GratitudeCard,
    MonthsAgo,
    Hero
  },

  setup () {
    const state = reactive({
      filteredGratitudes: [] as Array<IGratitudeWrapper>,
      thisDayAMonthAgo: new Date(),
      orientation: useGyro(),
      scrollTop: 0,
      beta: 0
    })

    const gratitudes = computed(() => {
      return state.filteredGratitudes
    })

    // List with all itesm, sorted by date
    const gratitudeList = () => {
      const set = new Set([...state.filteredGratitudes])
      return Array.from(set).sort(
        (a, b) => b.data.timeStamp.toDate() - a.data.timeStamp.toDate()
      )
    }

    // Returns the date as words (eg. one day ago) until x-days ago
    const getReadableDate = (_date: Date): string => useDate().formatDateToWordsWithLimit(_date, 10)

    // Select a date to only show items for that day
    const onDateSelection = (_date: Date): void => {
      state.filteredGratitudes = useGratitudeFilters().getGratitudesPerDay(_date)

      state.thisDayAMonthAgo = _date
    }

    // Resets date selection
    const onResetDateSelection = (): void => {
      state.filteredGratitudes = store.getters['gratitudeStore/getGratitudes']
      state.filteredGratitudes = gratitudeList()
    }

    // Update scroll position based on gyro
    const updateScrollPosition = () => {
      const h = document.getElementById('app')
      const h2 = (h) ? h.clientHeight - window.innerHeight : 0

      if (state.scrollTop < 0) {
        state.scrollTop = 0
        return
      }

      if (state.scrollTop >= h2) {
        state.scrollTop = h2
        return
      }

      state.scrollTop += (state.beta / 100)

      // window.scrollTo(0, state.scrollTop)
      requestAnimationFrame(updateScrollPosition)
    }

    // Handle Gyro updates
    const handleChange = (val) => {
      state.beta = val
      updateScrollPosition()
    }

    // Watch Gyro updates
    watch(state.orientation, (first, second) => {
      const { alpha, beta, gamma } = second

      handleChange(beta)
    })

    onMounted(() => {
      console.log('MOUNTED', store.getters['gratitudeStore/getGratitudes'])
      state.filteredGratitudes = []
      state.filteredGratitudes = store.getters['gratitudeStore/getGratitudes']
      state.filteredGratitudes = gratitudeList()
    })

    const goToDetailPage = (gratitude: IGratitudeWrapper): void => {
      router.push({ name: 'gratitude/detail', params: { id: gratitude.id } })
    }

    return {
      ...toRefs(state),
      gratitudes,
      gratitudeList,
      getReadableDate,
      goToDetailPage,
      onDateSelection,
      onResetDateSelection
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home--wrapper {
  margin-top: 10vh;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
