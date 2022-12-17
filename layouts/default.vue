<template>
  <div class="page__wrapper">
    <nav
      class="bg-neutral-800 text-white h-20 flex items-center justify-between px-4"
    >
      <div class="font-bold">
        <nuxt-link to="/">Nuxt 3 Examples</nuxt-link>
      </div>
      <ul class="flex items-center gap-4">
        <li>
          <nuxt-link to="/examples/data-fetching/infinite-load">
            Infinite Load
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="page__content">
      <slot />
    </div>
    <footer class="text-center py-2 px-3 bg-neutral-800 text-white text-xs">
      <a href="https://ndragun92.github.io/portfolio/" target="_blank"
        >ndragun92.github.io/portfolio</a
      >
      &copy; Nemanja Dragun. All Rights Reserve
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>
