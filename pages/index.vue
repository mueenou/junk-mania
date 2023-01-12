<template>
    <div class="text-white mt-16 w-full lg:w-[600px] md:w-[600px] mx-auto">
      <div class="fixed flex flex-row justify-between py-3 md:w-[600px] md:border-x border-gray-700 top-0 left-1/2 -translate-x-1/2 w-full z-50 backdrop-blur-lg px-2 items-center">
        <div>
          <h1 class="text-xl font-extrabold my-2 text-center">Home</h1>
        </div>
        <button @click="userCookie = null" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold h-10 w-16 rounded">
          <span v-if="userCookie">Logout</span>
          <nuxt-link v-else to="/login">
            <span>Login</span>
          </nuxt-link>
        </button>
      </div>
      <div v-if="userCookie">
        <form class="flex flex-col gap-y-4 border-b border-gray-700 py-2 px-2 md:border-x" @submit.prevent="addJunk">
          <p class="p-2 text-white capitalize font-bold text-lg"> {{ authorName || userCookie?.username }}</p>
          <textarea v-model="junkText" type="text" placeholder="Write your junk here..." class="p-2 text-md text-white outline-none bg-black border-b border-gray-700 resize-none overflow-y-auto ml-14 w-100"></textarea>
          <button type="submit" class="group bg-yellow-500 w-14 text-black self-end rounded-full h-10">
            <div class="group-hover:rotate-[30deg] duration-500 ease-out">
              <Icon size="25px" name="mi:delete-alt"/>
            </div>
          </button>
        </form>
      </div>
      <div class="border-b border-gray-700 py-2 px-2 md:border-x text-center" v-else>
        <p class="text-xs">You are not connected.</p>
      </div>
      <div class="border-b border-gray-700 h-16 md:border-x py-4 hover:cursor-pointer hover:bg-gray-900/20" @click="refresh()">
        <div v-if="pending" class="text-center">
          <Icon size="30px" class="text-yellow-400" name="line-md:loading-twotone-loop"/>
        </div>
        <p v-else class="text-center">Latest junks...</p>
      </div>
      <div class="message bg-black hover:bg-gray-900/20 px-2 py-16 last:border-b-0 md:border-x border-b border-gray-700" v-for="(junk, index) in junks" :key="junk._id+index">
        <div v-if="junk.author" class="flex justify-end mb-2">
          <span>
            <p class="text-xs font-light text-gray-500 capitalize">- {{ junk.author.username || "" }} -</p>
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
            <button @click="addRate(index, 'hearts', junk._id)" :class="`relative interaction-button group duration-300 heart hover:bg-gray-700/30 text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1 ${userCookie ? junk.hearts.includes(userCookie.id) ? 'bg-gray-700/30' : '' : ''}`" >
              <Icon name="noto:heart-suit" size="20px" :class="{'animate-bounce': heartAdding && (index == currentId)}" />
              <div v-if="junk.hearts.length > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
                {{ junk.hearts.length }}
              </div>
            </button>
          </div>
          <div class="flex flex-col items-center justify-center">
            <button @click="addRate(index, 'thumbsUps', junk._id)" :class="`relative interaction-button group duration-300 thumbs-up hover:bg-gray-700/30 text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1 ${userCookie ? junk.thumbsUps.includes(userCookie.id) ? 'bg-gray-700/30' : '' : ''}`">
              <Icon name="noto:thumbs-up" size="20px" :class="{'animate-bounce': thumbsupAdding && (index == currentId)}" />
              <div v-if="junk.thumbsUps.length > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
                {{ junk.thumbsUps.length }}
              </div>
            </button>
          </div>
          <div class="flex flex-col items-center justify-center">
            <button @click="addRate(index, 'okays', junk._id)" :class="`relative interaction-button group duration-300 okay hover:bg-gray-700/30 text-black font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1 ${userCookie ? junk.okays.includes(userCookie.id) ? 'bg-gray-700/30' : '' : ''}`">
              <Icon name="noto:ok-hand" size="20px" :class="{'animate-bounce': okayAdding && (index == currentId)}" />
              <div v-if="junk.okays.length > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
                {{ junk.okays.length }}
              </div>
            </button>
          </div>
          <div class="flex flex-col items-center justify-center">
            <button @click="addRate(index, 'garbages', junk._id)" :class="`relative interaction-button group duration-300 hover:bg-gray-700/30 garbage text-white font-bold py-2 px-4 rounded-full text-lg h-14 w-14 flex items-center justify-center mb-1 ${userCookie ? junk.garbages.includes(userCookie.id) ? 'bg-gray-700/30' : '' : ''}`">
              <Icon name="noto:thumbs-down" size="20px" :class="{'animate-bounce': garbageAdding && (index == currentId)}" />
              <div v-if="junk.garbages.length > 0" class="absolute top-0 -right-1 bg-yellow-800 w-6 rounded-full text-xs text-gray-200">
                {{ junk.garbages.length }}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="py-4 text-center">
        <div v-if="pending" class="text-center">
          <Icon size="30px" class="text-yellow-400" name="line-md:loading-twotone-loop"/>
        </div>
        <button v-else class="mx-auto" @click="next()">
          <Icon name="line-md:align-justify" size="30px"/>
        </button>
      </div>
    </div>
  </template>
  
  <script setup> 
  const userCookie = useCookie('user') ? useCookie('user') : {}
  
  const userName = ref("")
  userName.value = userCookie.length > 0 ? userCookie.value.username : ""
  const authorInputHandler = (e) => {
    authorName.value = e.target.value
  }
  
  let page = ref(0)
  
  const {data: junks, refresh, pending} = useAsyncData(
    'junks',
    async () =>
      await $fetch(`/api/stylish_junks`, {
        params: {
          page: page.value,
        },
      }),
    {
      watch: [page],
    }
  );
  
  async function next() {
    page.value = page.value + 1
    refresh()
  }
  let authorName = ref("")
  let junkText = ref("")
  const addJunk = async () => {
    if ((authorName.value || userName) && junkText.value) {
      const { data: addedJunkRes } = await useAsyncData('add_junk', () => $fetch(`/api/stylish_junks`,{
        method: 'post',
        body: {
          text: junkText.value,
          author: userCookie.value.id,
          username: userName.value
        }
      })
      )
      authorName.value = ""
      junkText.value = ""
      refresh()
    }
    window.scrollTo(0, 0);
  }
  
  const currentId = ref(null)
  const heartAdding = ref(false)
  const thumbsupAdding = ref(false)
  const okayAdding = ref(false)
  const garbageAdding = ref(false)
  
  const addRate = async (index, value, id) => {
    if(!userCookie.value) {
      alert('Please connect to your account or create an account first.')
      return
    }
    switch (value) {
      case 'hearts':
        heartAdding.value = true
        currentId.value = index
        break;
      case 'thumbsUps':
        thumbsupAdding.value = true
        currentId.value = index
        break;
      case 'okays':
        okayAdding.value = true
        currentId.value = index
        break;
      case 'garbages':
        garbageAdding.value = true
        currentId.value = index
        break;
      default:
        break;
    }
    setTimeout(async () => {
      const {data: resAddRate} = await useAsyncData('add_rate', () => $fetch(`/api/stylish_junks/${value}?junkId=${id}`, {
        method: 'put',
        body: {
            userId: userCookie.value.id
        }
      }))
      refresh()
      resetInteraction(false)
      }, 200)
    }

    function resetInteraction(bool) {
      heartAdding.value = bool
      thumbsupAdding.value = bool
      okayAdding.value = bool
      garbageAdding.value = bool
      currentId.value = null
    }
  </script>
  