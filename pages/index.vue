<template>
  <section class="my-24 p-6 md:p-3">
      <div class="container mx-auto">
        <h1 class="text-4xl font-semibold text-gray-900 border-b pb-6 border-gray-300 text-center md:text-left">Blog</h1> 
        <div class="hidden md:flex items-center gap-2 pt-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Highlighted posts</span>
        </div>
        <div class="flex justify-center items-center my-8">
          <Highlighted/>
        </div>
        <div class="flex justify-center items-center">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="col-span-2">
              <div class="grid grid-cols-1">
                <div v-for="n in 3" :key="n">
                  <Post/>
                </div>
              </div>
              <div class="flex items-center text-gray-400">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
              </div>
            </div>
            <div class="col-span-1">
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>

export default {
  name: 'index',

}
</script>
