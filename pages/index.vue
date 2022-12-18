<template>
  <div class="flex-1 w-full h-full flex items-center justify-center">
    <div
      class="max-w-[500px] overflow-hidden bg-black text-primary-100 bg-opacity-10 border border-primary-800 border-opacity-50 text-center rounded-lg"
    >
      <div class="px-8 pb-8 pt-4">
        <h1 class="text-2xl font-bold mb-4">Hello and welcome!</h1>
        <p class="text-primary-300">
          I have decided today to build something for this awesome community! I
          decided to start a new project where I will put examples of how you
          can build stuff with Nuxt 3/Vue 3! You can use
          <a
            class="font-bold text-emerald-500 hover:underline"
            href="https://github.com/ndragun92/nuxt3-examples/discussions"
            target="_blank"
            >discussions</a
          >
          in GitHub Repository and suggest something you would like to see.
          Based on your ideas/needs I will build examples and add them to this
          public repository so everyone will be able to learn by examples
        </p>
      </div>
      <div
        class="flex items-center h-12 bg-black bg-opacity-20 border-t border-primary-800 border-opacity-50"
      >
        <a
          class="flex items-center justify-center gap-2 h-full flex-1 hover:text-emerald-500"
          href="https://github.com/ndragun92/nuxt3-examples/discussions"
          target="_blank"
          ><Icon class="relative -top-[1px]" size="20" name="mdi:github" />Start
          a New Discussion</a
        >
        <div class="w-[1px] h-full bg-primary-800 bg-opacity-50" />
        <a
          class="flex items-center justify-center gap-2 h-full flex-1 hover:text-emerald-500"
          href="https://github.com/ndragun92/nuxt3-examples"
          target="_blank"
          ><Icon class="relative -top-[1px]" size="20" name="mdi:github" />
          Check Repository</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageHomepage",
};
</script>
