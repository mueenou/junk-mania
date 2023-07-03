<template>
   <form @submit.prevent="handleSubmit()" class="bg-yellow-900/50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-[600px] mx-auto mt-10">
    <!-- <button @click="signIn(`github`)">LOGIN</button> -->
    <a href="#" @click="signIn(`github`)" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.88 8.14 6.84 9.49.5.09.68-.22.68-.49v-1.71c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.34-1.08.62-1.33-2.17-.25-4.46-1.09-4.46-4.85 0-1.07.38-1.94 1.03-2.63-.1-.25-.45-1.24.1-2.59 0 0 .82-.26 2.7 1 .78-.22 1.62-.33 2.45-.33.83 0 1.67.11 2.45.33 1.88-1.26 2.7-1 2.7-1 .55 1.35.2 2.34.1 2.59.65.69 1.03 1.56 1.03 2.63 0 3.77-2.29 4.6-4.47 4.85.35.3.67.91.67 1.84v2.73c0 .27.18.58.69.49C19.12 20.14 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
      </svg>
      Sign in with GitHub
    </a>
    <!-- <h1 class="text-white font-bold text-center">Login to your account</h1>
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
    </div> -->
  </form>
</template>

<script setup>
const { signIn, signOut, session, status, cookies } = useAuth()
console.log(cookies)

// const userName = ref('')
// const email = ref('')
// const password = ref('')

// const userFromCookie = useCookie('user')

// async function handleSubmit() {
//     const body = {
//         username: userName.value, email: email.value, password: password.value
//     }
//     await $fetch('/api/users/login/', {
//       method: 'post',
//       body
//     }).then(async res => {
//       userFromCookie.value = res.user
//       await navigateTo({
//         path: '/',
//       })
//     })
// }

// async function cancelLogin() {
//   await navigateTo({
//     path: '/'
//   })
// }

</script>