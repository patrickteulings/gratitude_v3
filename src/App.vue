<template>
  <div id="app">
    <top-bar />
    <navigation-drawer />
    <div v-if="loading">
      <SplashScreen />
    </div>

    <div v-if="user && !loading">
      <Suspense>
        <template #default>
          <route-wrapper />
        </template>
        <template #fallback>
          <h1>
            Add a loading template here
          </h1>
        </template>
      </Suspense>
    </div>
    <login-form v-else-if="!user && !loading" />
    <div v-else>No satisfying user found</div>
    <div v-if="error">error</div>

    <div v-if="response.results" hidden>
      {{ response.results[9].address_components[0].long_name }} <br>
      {{ locationLoading }} {{ msg }} {{ latitude }} {{ longitude }} <br>
      weatherLoading {{ weatherLoading }}<br>
      weaherresponse {{ weatherResponse }}
    </div>
  </div>
</template>

<script lang="ts">
// Core
import { defineComponent, computed, watch } from 'vue'
import store from '@/store/index'

// Components
import TopBar from '@/components/navigation/TopBar.vue'
import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue'
import LoginForm from '@/components/user/LoginForm.vue'
import SplashScreen from '@/components/splash/SplashScreen.vue'
import RouteWrapper from '@/components/RouteWrapper.vue'

// Composables
import { useLogin } from '@/use/auth/useLogin'
import useAuth from '@/use/auth/useAuth'
import useLocation from '@/use/useLocation'
import useWeather from '@/use/useWeather'
import { IResponse } from '@/types/Gratitude'
import { ILocation } from '@/types/Location'
// Setup
export default defineComponent({
  name: 'App',

  components: {
    TopBar,
    NavigationDrawer,
    LoginForm,
    SplashScreen,
    RouteWrapper
  },

  setup () {
    const { user, loading, error } = useAuth()
    const loginState = useLogin()
    const { latitude, longitude, msg, response, locationLoading = false } = useLocation()
    const { weatherResponse, getWeather, weatherLoading } = useWeather()
    // const { latitude, longitude, msg, response, locationLoading = false } = useWeather()

    // Watch Google Lat/Long updates
    // If we have a location, also get the weather!!
    watch([response, latitude], ([first, firstLat], [second, sencondLat]) => {
      let cityName = ''
      console.log('lat:', response)
      if (response !== null) {
        const resp = response.value as IResponse
        if (resp.results) {
          resp.results.map((item) => {
            const types = item.types.map((isLocality) => {
              if (isLocality === 'locality') {
                cityName = item.address_components[0].long_name
              }
            })
          })
        }
        const location = { coordinates: { latitude: latitude.value, longitude: longitude.value }, city: cityName }

        getWeather({ coords: { latitude: latitude.value, longitude: longitude.value } }).then((result) => {
          console.log('App.vue - getWeather - results', result)
          const weather = {
            temp: result.main.temp,
            feelsLike: result.main.feels_like,
            weatherID: result.weather[0].id,
            weatherIcon: result.weather[0].icon,
            description: result.weather[0].main,
            descriptionLong: result.weather[0].description
          }
          store.dispatch('gratitudeStore/setWeather', weather)
        })
        // console.log(getWeather({ coords: { latitude: latitude.value, longitude: longitude.value } }))
        store.dispatch('gratitudeStore/setLocation', location)
      }

      if (latitude !== null) {
        console.log('latitude!!!!', cityName)
      }
    })

    return {
      user,
      loading,
      latitude,
      longitude,
      response,
      msg,
      locationLoading,
      weatherLoading,
      weatherResponse,
      error: computed(() => (loginState.error || error).value),
      logout: loginState.logout
    }
  }
})
</script>

<style lang="scss" src="@/styles/style.scss">
.app-wrapper {
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
