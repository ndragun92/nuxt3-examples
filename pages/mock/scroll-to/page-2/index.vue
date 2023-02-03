<template>
  <div>
    <el-github-example-banner />
    <div class="container__main">
      <section
        class="text-2xl font-bold mb-4 text-center md:text-left text-white h-[1200px] flex items-center justify-center"
      >
        Page 2 without smooth scroll enabled
      </section>
      <section
        v-for="(result, index) in results"
        :id="`section${index + 1}`"
        :key="index"
        class="text-2xl font-bold mb-4 text-center md:text-left text-white h-[800px] flex items-center justify-center"
        :class="!index ? 'bg-yellow-500' : 'bg-blue-500'"
      >
        <div class="text-center">
          <h6>Section {{ index + 1 }}</h6>
          <p class="text-xs">{{ result.name }}</p>

          <nuxt-link v-if="index" :to="`#section${index}`">
            <div
              class="relative top-[1px] truncate flex-1"
              v-text="'Scroll to Section 1'"
            />
          </nuxt-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageMockScrollToPage2",
};
</script>

<script lang="ts" setup>
definePageMeta({
  layout: "scroll-to-advanced",
});

const { data: results } = await useLazyFetch(
  "https://api.punkapi.com/v2/beers?page=1&per_page=2"
);
</script>
