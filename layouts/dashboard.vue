<template>
  <div class="min-h-screen flex flex-col bg-primary-900 text-primary-300">
    <nav
      class="bg-black bg-opacity-10 border-b border-primary-800 border-opacity-50"
    >
      <div
        class="w-full max-w-[1280px] mx-auto flex items-center justify-between h-20"
      >
        <div>Logo</div>
        <div>Github</div>
      </div>
    </nav>
    <div class="my-10 wrapper h-full flex-1 w-full max-w-[1280px] mx-auto">
      <aside
        class2="bg-black bg-opacity-5 bg-slate-900 bg-opacity-100 border border-black border-opacity-10 rounded-lg"
        class="relative z-10 border-r border-primary-800 border-opacity-25"
      >
        <div v-for="cat in 3" :key="cat" class="mb-2">
          <div>{{ cat }}. Category</div>
          <ul class="pl-4">
            <li v-for="link in 10" :key="link">{{ link }}. Link</li>
          </ul>
        </div>
      </aside>
      <main class="">
        <slot />
      </main>
    </div>
    <footer
      class="text-center py-2 px-3 bg-black bg-opacity-10 border-t border-primary-800 border-opacity-50 text-xs"
    >
      <a
        class="hover:text-white"
        href="https://ndragun92.github.io/portfolio/"
        target="_blank"
        >ndragun92.github.io/portfolio</a
      >
      &copy; Nemanja Dragun. All Rights Reserve
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDashboard",
};
</script>

<style lang="scss" scoped>
.wrapper {
  @apply grid gap-10;
  grid-template-columns: 300px 1fr;
}
.wrapper2 {
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(
    45deg,
    #0f172a,
    #1e293b,
    #334155,
    #475569 //#ffdc18,
    //#ff3706
  );
  background-size: 600% 100%;
  animation: gradient 16s linear infinite;
  animation-direction: alternate;
}
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
