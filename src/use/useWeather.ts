import { toRefs, reactive } from 'vue'

interface IState {
  msg: string | null;
  weatherLoading: boolean;
  error: boolean;
  fetchError: any;
  weatherResponse: any;
  APIURL: string;
  APIKEY: string;
}

interface IGeolocationPosition {
  coords: {
    latitude: number | null;
    longitude: number | null;
  };
}
export default function () {
  // our reactive properties...
  const state: IState = reactive({
    msg: null,
    weatherLoading: true,
    error: false,
    fetchError: {},
    weatherResponse: {},
    APIKEY: 'ea8619a8f88dc06dcddfd36682d398a2',
    APIURL: 'https://api.openweathermap.org/data/2.5/weather?'
  })


  const getWeather = async (position: IGeolocationPosition) => {
    state.weatherLoading = true
    console.log('aangeroepen')
    const { longitude, latitude } = position.coords
    try {
      const response = await fetch(`${state.APIURL}lat=${latitude}&lon=${longitude}&appid=${state.APIKEY}&units=metric`)
      const json = await response.json()
      state.weatherResponse = json
    } catch (error) {
      state.fetchError = error
    } finally {
      state.weatherLoading = false
    }
    console.log(state.weatherResponse)
    return state.weatherResponse
  }

  // return all of the properties from the function
  return {
    ...toRefs(state),
    getWeather
  }
}
