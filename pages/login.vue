<template>
   <form @submit.prevent="handleSubmit()" class="bg-yellow-900/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-[600px] mx-auto mt-10">
    <h1 class="text-white font-bold text-center">Login to your account</h1>
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
        Username:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" v-model="userName" type="text" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="email">
        Email:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" v-model="email" type="email" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="password">
        Password:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" v-model="password" type="password" />
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold h-10 w-16 rounded focus:outline-none focus:shadow-outline" type="submit">
        Log In
      </button>
      <button @click="cancelLogin()" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold h-10 w-16 rounded focus:outline-none focus:shadow-outline" type="cancel">
        Cancel
      </button>
    </div>
    <div>
      <nuxt-link to="/register">
       <p class="text-xs text-white text-center mt-4 hover:text-blue-600 hover:underline">
        Don't have an account? Create your own and be a new Junker !
       </p> 
      </nuxt-link>
    </div>
  </form>
</template>

<script setup>
const userName = ref('')
const email = ref('')
const password = ref('')

const userFromCookie = useCookie('user')

async function handleSubmit() {
    const body = {
        username: userName.value, email: email.value, password: password.value
    }
    await $fetch('/api/users/login/', {
      method: 'post',
      body
    }).then(async res => {
      userFromCookie.value = res.user
      await navigateTo({
        path: '/',
      })
    })
}

async function cancelLogin() {
  await navigateTo({
    path: '/'
  })
}

</script>

<style>

</style>