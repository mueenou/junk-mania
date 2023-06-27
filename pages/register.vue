<template>
  <form @submit.prevent="handleSubmit()" class="bg-yellow-900/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-[600px] mx-auto mt-10">
    <h1 class="text-white font-bold text-center">Create your account</h1>
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="name">
      First Name:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" v-model="name" type="text" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="lastname">
      Last Name:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" v-model="lastname" type="text" />
    </div>
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
      Sign up
      </button>
      <button @click="cancelLogin()" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold h-10 w-16 rounded focus:outline-none focus:shadow-outline" type="cancel">
      Cancel
      </button>
    </div>
 </form>
</template>

<script setup>
const userName = ref('')
const email = ref('')
const password = ref('')
const name = ref('')
const lastname = ref('')

const userFromCookie = useCookie('user')

async function handleSubmit() {
   const body = {
       username: userName.value, email: email.value, password: password.value, name: name.value, lastname: lastname.value
   }
   await $fetch('/api/users/register/', {
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