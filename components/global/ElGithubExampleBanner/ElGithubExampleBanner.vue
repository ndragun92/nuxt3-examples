<template>
  <a
    class="w-full h-10 sticky top-0 right-0 left-0 bg-neutral-700 hover:bg-neutral-600 text-white text-center flex items-center justify-center"
    :href="`https://github.com/ndragun92/nuxt3-examples/blob/main${githubPath}`"
    target="_blank"
  >
    <span class="flex items-center gap-2 text-sm">
      <Icon size="20" name="mdi:github" />
      <span>View code on GitHub</span>
      <Icon size="20" name="mdi:github" />
    </span>
  </a>
</template>

<script lang="ts" setup>
const route = useRoute();
const githubPath = computed(() => `/pages/${route.path}/index.vue`);
</script>
