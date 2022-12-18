<template>
  <a
    class="w-full max-w-[640px] mx-auto h-10 sticky top-0 right-0 left-0 bg-primary-900 bg-opacity-90 border border-primary-800 border-opacity-50 border-t-transparent hover:text-emerald-500 text-center flex items-center justify-center text-primary-200"
    :href="`https://github.com/ndragun92/nuxt3-examples/blob/main${githubPath}`"
    target="_blank"
  >
    <span class="flex items-center gap-2 text-sm">
      <Icon size="20" name="mdi:github" />
      <span
        >View this example on
        <span class="text-emerald-500 font-bold">GitHub</span></span
      >
    </span>
  </a>
</template>

<script lang="ts" setup>
const route = useRoute();
const githubPath = computed(() => `/pages/${route.path}/index.vue`);
</script>
