<template>
  <div>
    <el-github-example-banner />
    <div class="container__main">
      <h1 class="text-2xl font-bold mb-4 text-center md:text-left">
        Nuxt Content - Infinite Load Example
      </h1>
      <ul v-if="posts?.data?.length" class="grid grid-cols-3 gap-4">
        <li
          v-for="post in posts?.data"
          :key="post._id"
          class="bg-primary-800 min-h-[300px]"
        >
          <div class="h-40 bg-black">
            <img
              class="w-full h-full cover"
              :src="post.image?.src || 'https://via.placeholder.com/350x150'"
              :alt="post.title"
            />
          </div>
          <div class="p-4">
            <h2 class="font-bold text-lg" v-text="post.title" />
            <p class="mt-2 text-sm" v-text="post.description" />
          </div>
        </li>
        <template v-if="posts?.data?.length">
          <el-infinite-load v-if="!pending" @load-data="onLoadData" />
          <lazy-el-data-load v-else />
        </template>
      </ul>
      <div v-if="posts?.length" class="text-center mt-4">
        Loaded: {{ posts?.length }} of {{ totalPosts?.length }} records
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageExamplesNuxtContentInfiniteLoad",
};
</script>

<script lang="ts" setup>
const ElInfiniteLoad = defineAsyncComponent(
  () => import("~/components/elements/ElInfiniteLoad/ElInfiniteLoad.vue")
);

definePageMeta({
  title: "Infinite Load",
});

const pending = ref(false);
const page = ref(0);
const limit = ref(2);
const posts = reactive({
  data: await queryContent("blog/post").skip(0).limit(limit.value).find(),
});
const totalPosts = await queryContent("blog/post").only("id").find();

const loadMorePosts = async () => {
  pending.value = true;
  const newPosts = await queryContent("blog/post")
    .skip(skip.value)
    .limit(limit.value)
    .find();
  posts.data = [...posts.data, ...newPosts];
  pending.value = false;
};

const skip = computed(() => page.value * limit.value);

const onLoadData = async ($state) => {
  page.value++;
  await nextTick();
  // Validates if we did load all data
  if (posts?.data && posts.data.length >= totalPosts.length) {
    $state.complete();
  } else {
    await loadMorePosts();
    $state.loaded();
  }
};
</script>
