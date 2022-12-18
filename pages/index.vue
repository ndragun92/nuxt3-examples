<template>
  <div class="flex-1 w-full h-full flex items-center justify-center">
    <div
      class="px-4 py-8 max-w-[500px] bg-neutral-900 border border-neutral-700 text-white text-center"
    >
      <h1 class="text-2xl font-bold mb-4">Hello and welcome!</h1>
      <p class="text-neutral-300">
        I have decided today to build something for this awesome community! I
        decided to start a new project where I will put examples of how you can
        build stuff with Nuxt 3/Vue 3! You can use
        <a
          class="font-bold underline text-blue-500 hover:text-blue-300"
          href="https://github.com/ndragun92/nuxt3-examples/discussions"
          target="_blank"
          >discussions</a
        >
        in GitHub Repository and suggest something you would like to see. Based
        on your ideas/needs I will build examples and add them to this public
        repository so everyone will be able to learn by examples
      </p>
      <div class="mt-10 flex flex-col">
        <a
          class="block flex items-center gap-2 self-center hover:text-blue-500"
          href="https://github.com/ndragun92/nuxt3-examples/discussions"
          target="_blank"
        >
          <Icon size="30" name="mdi:github" />
          <span>Start a new discussion</span>
          <Icon size="30" name="mdi:github" />
        </a>
      </div>
      <div class="mt-4 flex flex-col">
        <a
          class="block flex items-center gap-2 self-center hover:text-blue-500"
          href="https://github.com/ndragun92/nuxt3-examples"
          target="_blank"
        >
          <Icon size="30" name="mdi:github" />
          <span>Project Repository</span>
          <Icon size="30" name="mdi:github" />
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
