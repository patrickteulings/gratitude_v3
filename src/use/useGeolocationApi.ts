import { toRefs, reactive } from 'vue'
import { IResponse } from '@/types/Gratitude'

interface IState {
  response: IResponse;
  fetchError: boolean | null;
  fetching: boolean;
}


export default function () {
  // our reactive properties...
  const state: IState = reactive({
    response: { results: null, status: null },
    fetchError: null,
    fetching: true
  })

  const getStreetAddressFrom = async (url: string, options: object) => {
    try {
      const response = await fetch(url, options)
      const json = await response.json()
      state.response = json
    } catch (error) {
      state.fetchError = error
    } finally {
      state.fetching = false
    }
  }

  // return all of the properties from the function
  return {
    ...toRefs(state),
    getStreetAddressFrom
  }
}
