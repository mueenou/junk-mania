<template>
   <form @submit.prevent="handleSubmit" class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[40%] mx-auto mt-10">
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
        Username:
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" v-model="username" type="text" />
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
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Log In
      </button>
    </div>
  </form>
</template>

<script setup>
const userName = ref('')
const email = ref('')
const password = ref('')

const userFromCookie = useCookie('user')

function handleSubmit() {
    const body = {
        username: userName.value, email: email.value, password: password.value
    }
    const {data: loginRes} = useFetch('/api/users/login/', {
        method: 'post',
        body
    })
    userFromCookie.value = loginRes.value.user;
    const router = useRouter();
    router.push({ path: "/home" });
}

</script>

<style>

</style>