<template>
  <div>
    <nav class="hidden md:flex w-full h-screen">
        <div class="w-full flex mx-auto px-6 py-8">
          <div class="w-full h-full text-gray-900 text-xl border-l border-gray-300 p-6">
              <div class="flex flex-col justify-start space-y-3">
                  <div class="space-y-3">
                    <span class="text-base text-gray-900 font-semibold">Discover categories</span>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ButtonTag text="General"/>
                        <ButtonTag text="Life"/>
                        <ButtonTag text="Tech"/>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </nav>
  </div>
</template>
<script>
export default {
    data() {
        return {
            open: false
        }
    }
}
</script>