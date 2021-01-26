import { reactive, toRefs } from 'vue'

import distanceInWords from 'date-fns/formatDistance'
import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import startOfWeek from 'date-fns/startOfWeek'
import isFuture from 'date-fns/isFuture'

export const useDate = () => {
  const state = {
    originalDate: new Date(0)
  }

  // Date helper
  const isValidDate = (d) => d instanceof Date

  // Format date to words (distance) if not too long ago, otherwise return formatted date
  const formatDateToWordsWithLimit = (_date, _limit = 20): string => {
    state.originalDate = new Date(_date)

    return (differenceInDays(new Date(), _date) < _limit)
      ? distanceInWords(_date, new Date(), { addSuffix: true, includeSeconds: true })
      : format(_date, 'eee do MMMM yyyy')
  }

  // Returns date in distance eg '2 days ago'
  const formatDateToWords = (_date: Date) => {
    state.originalDate = new Date(_date)
    return distanceInWords(_date, new Date(), { addSuffix: true, includeSeconds: true })
  }

  // Returns the first day (date) of the week for any given date
  const getStartOfWeek = (date: Date = new Date(Date.now())): any => {
    // console.log('hier', date, startOfWeek(date, { weekStartsOn: 1 }))
    return startOfWeek(date, { weekStartsOn: 1 })
  }

  // returns the day's name in short format (mon, tue etc)
  const getToday = (_date: Date) => format(_date, 'eeee do')


  // returns the day's name in short format (mon, tue etc)
  const getDayName = (_date: Date) => format(_date, 'eee')

  // Returns the app's default format (UK)
  const getDefaultFormat = (date: Date): string => format(date, 'eee do MMM yyyy')

  // Return the date at the start of day (00:00hrs)
  const getDayStamp = (_date: Date = new Date()): Date => {
    return new Date(_date.setHours(0, 0, 0, 0))
  }

  // Simple check to see if a date is in the future (uses Date-fns)
  const isDateInFuture = (date: Date) => {
    return isFuture(date)
  }

  return {
    state,
    isValidDate,
    formatDateToWords,
    formatDateToWordsWithLimit,
    getStartOfWeek,
    getDefaultFormat,
    getDayName,
    getDayStamp,
    isDateInFuture,
    getToday
  }
}

export default useDate
