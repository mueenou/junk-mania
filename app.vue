<template>
  <div class="text-white mt-20 w-full lg:w-[600px] md:w-[600px] mx-auto">
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-lg">
      <h1 class="text-xl font-extrabold my-2 text-center">Junk Mania</h1>
      <blockquote class="italic text-center text-sm mb-2 text-gray-300">- A place where junks matter -</blockquote>
    </div>
    <div>
      <form class="flex flex-col gap-y-4 border-b border-gray-700 py-2 px-2 md:border-x" @submit.prevent="addJunk">
        <input :value="userFromCookie || authorName" @change="(e)=>authorInputHandler(e)" type="text" placeholder="What's your name?" class="w-[25%] h-12 p-2 text-white bg-black outline-none border-b border-gray-700">
        <textarea v-model="junkText" type="text" placeholder="Write your junk here..." class="p-2 text-md text-white outline-none bg-black border-b border-gray-700 resize-none overflow-y-auto ml-14 w-100"></textarea>
        <button type="submit" class="group bg-yellow-500 w-14 text-black self-end rounded-full h-10">
          <div class="group-hover:rotate-[30deg] duration-500 ease-out">
            <Icon size="25px" name="mi:delete-alt"/>
          </div>
        </button>
      </form>
    </div>
    <div class="border-b border-gray-700 md:border-x py-4 hover:cursor-pointer hover:bg-gray-900/20" @click="refresh()">
      <div v-if="pending" class="text-center">
        <Icon size="30px" class="text-yellow-400" name="line-md:loading-twotone-loop"/>
      </div>
      <p v-else class="text-center">Latest junks...</p>
    </div>
    <div class="message bg-black hover:bg-gray-900/20 px-2 py-5 last:border-b-0 md:border-x border-b border-gray-700" v-for="junk in filteredJunks" :key="junk._id">
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
          <button @click="addRate('heart', junk._id)" class="relative interaction-button duration-300 heart hover:bg-gray-700/30 text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1" >
            <Icon name="noto:heart-suit" size="20px" />
            <div v-if="junk.heart > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
              {{ junk.heart }}
            </div>
          </button>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('thumbsup', junk._id)" class="relative interaction-button duration-300 thumbs-up hover:bg-gray-700/30 text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1">
            <Icon name="noto:thumbs-up" size="20px" />
            <div v-if="junk.thumbsUp > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
              {{ junk.thumbsUp }}
            </div>
          </button>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('okay', junk._id)" class="relative interaction-button duration-300 okay hover:bg-gray-700/30 text-black font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1">
            <Icon name="noto:ok-hand" size="20px" />
            <div v-if="junk.okay > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
              {{ junk.okay }}
            </div>
          </button>
        </div>
        <div class="flex flex-col items-center justify-center">
          <button @click="addRate('garbage', junk._id)" class="relative interaction-button duration-300 hover:bg-gray-700/30 garbage text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1">
            <Icon name="noto:thumbs-down" size="20px" />
            <div v-if="junk.garbage > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
              {{ junk.garbage }}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: 'bg-black'
  }
})

const userFromCookie = useCookie('user')


const authorInputHandler = (e) => {
  authorName.value = e.target.value
  userFromCookie.value = authorName.value
}

const {data: junks, refresh, pending} = useFetch('/api/stylish_junks/stylish_junks')

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
    refresh()
  }
  window.scrollTo(0, 0);
}

const addRate = async (value, id) => {
  const {data: resAddRate} = await useFetch(`/api/stylish_junks/stylish_junks?id=${id}&rating=${value}`, {
    method: 'put',
  })
  refresh()
}

</script>
