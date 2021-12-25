<template>
  <div class="hidden md:grid grid-cols-3 gap-x-3 gap-y-6 border-b border-gray-300 pb-8">
    <div v-for="n in 6" :key="n">
      <div class="flex flex-col space-y-3">
        <div class="flex items-center gap-3">
          <img class="object-center object-cover rounded-full h-10 w-10" src="https://images.unsplash.com/photo-1497021707778-a743a0bb2961?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
          <span>Hessel P</span>
        </div>
        <div class="text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
        <div class="text-xs text-gray-400">
          <span>8 Dec 11:52</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>