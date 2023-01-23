<template>
  <main class="prose">
    <ContentDoc />
  </main>
</template>

<script lang="ts">
export default {
  name: "PageContent",
};
</script>

<script lang="ts" setup>
const test = await queryContent("articles").limit(5).find();
console.log("console", test);
</script>
