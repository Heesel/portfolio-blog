<template v-if="post && post.body">
    <div class="flex flex-col md:flex-row my-8">
        <div class="w-full md:w-6/12 rounded overflow-hidden">
            <img class="object w-full h-auto" src="https://cdn.pixabay.com/photo/2020/02/03/00/12/fiber-4814456_960_720.jpg" alt="" />
        </div>
        <div class="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
            <h2 class="text-lg font-semibold leading-tight text-gray-800">{{post.title}}</h2>
            <ContentfulRichTextRenderer :body="post.body" :character-limit="200" />
            <nuxt-link to="/">
                <div class="flex items-center">
                    <span class=" hover:underline text-blue-600">Read more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 mt-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import ContentfulRichTextRenderer from "./ContentfulRichTextRenderer.vue";

export default {
    name: "Post",
    props: {
        post: {
            type: Object,
            required: true,
        }
    },

    components: { ContentfulRichTextRenderer }
}
</script>
