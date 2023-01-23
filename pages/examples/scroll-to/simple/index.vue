<template>
  <el-github-example-banner />
  <div class="container__main">
    <h1 class="text-2xl font-bold mb-4 text-center md:text-left">
      Scroll to simple example
    </h1>
    <p>
      Click on left menu <code class="text-emerald-500">Sections</code> to
      scroll to autoscroll to desired section
    </p>
    <p>or</p>
    <nuxt-link
      class="text-emerald-500 hover:underline"
      to="/mock/scroll-to/page-1"
      >Click here</nuxt-link
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "PageExamplesScrollToSimple",
};
</script>

<script lang="ts" setup>
definePageMeta({
  title: "Simple",
  layout: "scroll-to-simple",
});
</script>
