<template>

  <section class="section loginPage">
    <div class="section__inner">
      <h2 class="user__test">
        Well howdy, it appears you're not logged in yet?
      </h2>

        <!-- <input type="text" placeholder="username" v-model="username" />
        <input type="password" placeholder="password" v-model="password" />
        <button @click="login" :disabled="!isValid">LOGIN</button> -->
      <div class="login__actions">
        <button class="btn btn--shadowed" @click="loginWithGoogle"><span>Login with Google</span></button>
        <p>{{error}}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">


import { useLogin } from '@/use/auth/useLogin'

export default {
  setup () {
    const state = useLogin()

    return {
      ...state
    }
  }
}
</script>
