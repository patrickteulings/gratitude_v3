// Core
import { computed } from 'vue'
import store from '@/store'

import isSameDay from 'date-fns/isSameDay'
import subMonths from 'date-fns/subMonths'

// Interfaces
import { IGratitudeWrapper } from '@/types/Gratitude'
import { subWeeks } from 'date-fns'

export const useGratitudeFilters = () => {
  const allGratitudes: Array<IGratitudeWrapper> = store.getters['gratitudeStore/getGratitudes']

  const getGratitudesPerDay = (_date: Date): Array<IGratitudeWrapper> => {
    const duplicate: Array<IGratitudeWrapper> = [...allGratitudes]
    const filteredGratitudes: IGratitudeWrapper[] = []

    duplicate.map((gratitudewrapper: IGratitudeWrapper) => {
      const { data: gratitude } = gratitudewrapper
      const dayStamp = gratitude.dayStamp.toDate()

      if (isSameDay(dayStamp, _date)) filteredGratitudes.push(gratitudewrapper)
    })

    return filteredGratitudes
  }

  const getLastMonthsGratitude = (_date: Date = new Date(), _monthsToSubtract = 1) => {
    const duplicate: Array<IGratitudeWrapper> = [...allGratitudes]
    const pastDate = subMonths(_date, _monthsToSubtract)
    const filteredGratitudes: IGratitudeWrapper[] = []
    console.log(pastDate)
    duplicate.map((gratitudewrapper: IGratitudeWrapper) => {
      const { data: gratitude } = gratitudewrapper
      const dayStamp = gratitude.dayStamp.toDate()

      if (isSameDay(dayStamp, pastDate)) filteredGratitudes.push(gratitudewrapper)
    })

    return filteredGratitudes
  }

  const getLastWeeksGratitude = (_date: Date = new Date(), _weeksToSubtract = 1) => {
    const duplicate: Array<IGratitudeWrapper> = [...allGratitudes]
    const pastDate = subWeeks(_date, _weeksToSubtract)
    const filteredGratitudes: IGratitudeWrapper[] = []

    duplicate.map((gratitudewrapper: IGratitudeWrapper) => {
      const { data: gratitude } = gratitudewrapper
      const dayStamp = gratitude.dayStamp.toDate()

      if (isSameDay(dayStamp, pastDate)) filteredGratitudes.push(gratitudewrapper)
    })

    return filteredGratitudes
  }

  return {
    getGratitudesPerDay,
    getLastMonthsGratitude,
    getLastWeeksGratitude,
    allGratitudes
  }
}

export default useGratitudeFilters
