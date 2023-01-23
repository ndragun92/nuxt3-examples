<template>
  <el-github-example-banner />
  <!--  If you want to disable smooth scroll delete this class from HTML-->
  <Html class="smoothScroll"></Html>
  <div class="container__main">
    <section
      class="text-2xl font-bold mb-4 text-center md:text-left text-white h-[1200px] flex items-center justify-center"
    >
      <div class="text-center">
        <h2>Example with smooth scroll enabled</h2>
        <div class="mt-4">
          <nuxt-link :to="`#section2`">
            <div
              class="relative top-[1px] truncate flex-1"
              v-text="`Go to Section 2`"
            />
          </nuxt-link>
        </div>
      </div>
    </section>
    <section
      v-for="section in 2"
      :id="`section${section}`"
      :key="section"
      class="text-2xl font-bold mb-4 text-center md:text-left text-white h-[800px] flex items-center justify-center"
      :class="section === 1 ? 'bg-yellow-500' : 'bg-blue-500'"
    >
      <div class="text-center">
        <h6>Section {{ section }}</h6>

        <nuxt-link :to="`#section${section === 2 ? 1 : 2}`">
          <div
            class="relative top-[1px] truncate flex-1"
            v-text="`Scroll to Section ${section === 2 ? 1 : 2}`"
          />
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageMockScrollToPage1",
};
</script>

<script lang="ts" setup>
definePageMeta({
  layout: "scroll-to-simple",
});
</script>

<style>
.smoothScroll {
  scroll-behavior: smooth;
}
</style>
