<template>
  <div class="flex-1 w-full h-full flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-3xl font-bold uppercase">Welcome</h1>
      <div class="mt-10">
        <a
          class="block flex items-center gap-2"
          href="https://github.com/ndragun92/nuxt3-examples"
          target="_blank"
        >
          <Icon size="30" name="mdi:github" />
          <span>Github Repository</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageHomepage",
};
</script>
