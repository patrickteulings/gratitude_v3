<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import store from '@/store'

// Interfaces / Types
import { IGratitudeWrapper } from '@/types/Gratitude'
import { IMood } from '@/types/Mood'
import { IHabit } from '@/types/Habit'

const loadUserData = async () => {
  const user = computed(() => store.getters['userStore/getUser'])

  await store.dispatch('gratitudeStore/loadGratitudesPromise', user.value).then((result: firebase.firestore.QuerySnapshot) => {
    result.forEach((item: firebase.firestore.DocumentData) => {
      // re-format our data for conveniece
      const gratitude: IGratitudeWrapper = { data: item.data(), id: item.id }
      store.dispatch('gratitudeStore/addSingleGratitude', gratitude)
    })
  })
}

const loadUserMoods = async () => {
  const user = computed(() => store.getters['userStore/getUser'])

  await store.dispatch('moodStore/loadMoods', user.value).then((result: firebase.firestore.QuerySnapshot) => {
    result.forEach((item: firebase.firestore.DocumentData) => {
      const mood: IMood = { id: item.id, ...item.data() }
      store.dispatch('moodStore/addSingleMood', mood)
    })
  })
}

const loadUserHabits = async () => {
  const user = computed(() => store.getters['userStore/getUser'])

  await store.dispatch('habitStore/loadHabits', user.value).then((result: firebase.firestore.QuerySnapshot) => {
    result.forEach((item: firebase.firestore.DocumentData) => {
      const habit: IHabit = { id: item.id, ...item.data() }
      store.dispatch('habitStore/addSingleHabit', habit)
    })
  })
}

function handleRejection (p) {
  return p.catch((error) => ({
    error
  }))
}

async function waitForAll (...ps) {
  console.log('started...')
  if (store.getters['gratitudeStore/getGratitudes'].length) return Promise.resolve()
  return Promise.all(ps.map(handleRejection))
}

export default defineComponent({
  name: 'RouteWrapper',

  async setup () {
    // const userData = await loadUserData()
    const userData = await waitForAll(loadUserData(), loadUserMoods(), loadUserHabits()).then((results) => console.log('done', results))

    return {
      userData
    }
  }
})
</script>

<style scoped></style>
