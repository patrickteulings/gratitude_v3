import { toRefs, reactive } from 'vue'
import useGeoLocationApi from '@/use/useGeolocationApi'
import { GOOGLE_API_KEY } from '@/config/google'


interface IState {
  msg: string | null;
  locationLoading: boolean;
  error: boolean | null;
  latitude: number | null;
  longitude: number | null;
}

interface IGeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface IGeolocationPositionError {
  code: number;
}


export default function () {
  // our reactive properties...
  const state: IState = reactive({
    msg: null,
    locationLoading: true,
    status: '',
    error: false,
    latitude: null,
    longitude: null
  })

  const { response, fetching, fetchError, getStreetAddressFrom } = useGeoLocationApi()

  const success = (position: IGeolocationPosition) => {
    console.log('GEO SUCCESS', position)
    state.locationLoading = false
    state.msg = 'Location success'
    state.latitude = position.coords.latitude
    state.longitude = position.coords.longitude

    getStreetAddressFrom(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.latitude},${state.longitude}&key=${GOOGLE_API_KEY}`, {})
  }


  const error = (positionError: IGeolocationPositionError) => {
    console.log('GEO error')
    if (positionError) {
      console.log(positionError.code)
      state.locationLoading = false
      state.error = true
    }
    // Code
    // 1: permission denied
    // 2: position unavailable
    // 3: timeout
  }

  if (!navigator.geolocation) {
    state.msg = 'Geolocation is not supported by your browser'
    console.log('NO GEO available')
  } else {
    state.msg = 'Locating…'
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      {
        enableHighAccuracy: true,
        maximumAge: 15000
      }
    )
  }


  // return all of the properties from the function
  return {
    ...toRefs(state),
    response
  }
}
