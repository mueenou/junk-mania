<template>
  <div class="p-2 text-white mb-32 w-full lg:w-[600px] md:w-[600px] mx-auto">
    <h1 class="text-xl font-extrabold my-2 text-center">Junk Mania</h1>
    <blockquote class="italic text-center text-sm mb-2 text-gray-500">- A place where junks matter -</blockquote>
    <div class="message bg-gray-800 rounded-xl shadow-xl px-2 py-5 mb-2" v-for="junk in filteredJunks" :key="junk._id">
      <div v-if="junk.author" class="flex justify-end mb-2">
        <span>
          <p class="text-xs font-light text-gray-500">- {{ junk.author }} -</p>
        </span>
      </div>
      <div class="w-1/4 mx-auto border-[0.01px] border-gray-700"></div>
      <div class="text text-center italic leading-loose py-6">
        <blockquote class="drop-shadow">
          " {{ junk.text }} "
        </blockquote>
      </div>
      <div class="w-1/4 mx-auto border-[0.01px] border-gray-700"></div>
      <div class="interactions mt-10 flex justify-evenly">
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('heart', junk._id)" class="interaction-button heart  hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full text-lg border h-10 w-10 flex items-center justify-center border-gray-700 mb-1" >
            ❤️
          </button>
          <div class="text-xs text-gray-400">
            {{ junk.heart }}
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('thumbsup', junk._id)" class="interaction-button thumbs-up hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full text-lg border h-10 w-10 flex items-center justify-center border-gray-700 mb-1">
            👍
          </button>
          <div class="text-xs text-gray-400">
            {{ junk.thumbsUp }}
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('okay', junk._id)" class="interaction-button okay hover:bg-yellow-800 text-black font-bold py-2 px-4 rounded-full text-lg border h-10 w-10 flex items-center justify-center border-gray-700 mb-1">
            👌
          </button>
          <div class="text-xs text-gray-400">
            {{ junk.okay }}
          </div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('garbage', junk._id)" class="interaction-button hover:bg-gray-700 garbage text-white font-bold py-2 px-4 rounded-full text-lg border h-10 w-10 flex items-center justify-center border-gray-700 mb-1">
            🗑️
          </button>
          <div class="text-xs text-gray-400">
            {{ junk.garbage }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed w-[95%] bottom-6 text-center bg-gray-700 rounded-full md:w-[570px] shadow-xl px-5 py-5 mt-2 left-1/2 -translate-x-1/2">
    <form class="flex gap-x-4" @submit.prevent="addJunk">
      <input :value="userFromCookie || authorName" @change="(e)=>authorInputHandler(e)" type="text" placeholder="What's your name?" class="rounded-full text-center w-[25%] h-12 p-2 text-black">
      <input v-model="junkText" type="text" placeholder="Write your junk here..." class="rounded-full w-[60%] h-12 p-2 text-black">
      <button type="submit" class="group bg-white rounded-full w-14 text-black">
        <div class="group-hover:rotate-[30deg] duration-500 ease-out">🗑️</div>
      </button>
    </form>
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'bg-gray-900'
  }
})

const userFromCookie = useCookie('user')


const authorInputHandler = (e) => {
  authorName.value = e.target.value
  userFromCookie.value = authorName.value
}

const {data: junks, refresh} = useFetch('/api/stylish_junks/stylish_junks')

const filteredJunks = computed(() => {
  const newJunksList = junks.value.filter((junk) => junk.garbage < 5)
  return newJunksList.reverse()
})

let authorName = ref("")
let junkText = ref("")

const addJunk = async () => {
  if ((authorName.value || userFromCookie.value) && junkText.value) {
    const { data } = await useFetch('/api/stylish_junks/stylish_junks', {
      method: 'post',
      body: {
        text: junkText.value,
        author: authorName.value || userFromCookie.value
      }
    })
    authorName.value = ""
    junkText.value = ""
  }
  refresh()
  window.scrollTo(0, 0);
}

const addRate = async (value, id) => {
  const {data: resAddRate} = await useFetch(`/api/stylish_junks/stylish_junks?id=${id}&rating=${value}`, {
    method: 'put',
  })
  refresh()
}

</script>
