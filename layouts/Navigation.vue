<template>
    <div>
        <header class="bg-gray-nav body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nuxt-link to="/" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span class="ml-3 text-xl">HesselP</span>
                </nuxt-link>
                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center gap-3 md:gap-6">
                    <nuxt-link to="/" class="text-white hover:text-gray-400 border-b border-gray-300 hover:border-gray-400 pb-1">Blog</nuxt-link>
                    <nuxt-link to="/" class="text-white hover:text-gray-400 border-b border-gray-300 hover:border-gray-400 pb-1">About me</nuxt-link>
                </nav>
            </div>
        </header>
    </div>
</template>
<script>
  export default {

  }
</script>
