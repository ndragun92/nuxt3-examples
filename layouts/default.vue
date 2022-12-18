<template>
  <div class="page__wrapper">
    <nav
      class="bg-neutral-900 text-white h-20 flex items-center px-4 border-b border-neutral-700"
    >
      <div class="font-bold">
        <nuxt-link class="block flex items-center gap-2" to="/">
          <Icon size="20" name="vscode-icons:file-type-nuxt" />
          <span>Nuxt 3 Examples</span></nuxt-link
        >
      </div>
    </nav>
    <div class="page__content">
      <div
        class="bg-neutral-800 text-white w-[300px] border-r border-neutral-700"
      >
        <div
          v-for="(categoryValue, categoryKey) in navigation"
          :key="categoryKey"
          class="cursor-pointer"
        >
          <div
            class="px-2 py-4 flex items-center gap-2 hover:opacity-70"
            @click="onToggleFolder(categoryKey)"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <Icon class="w-6 h-6" name="dashicons:category" />
            </div>
            <span
              class="truncate flex-1"
              v-text="formatCategoryName(categoryKey)"
            />
          </div>
          <ul
            v-if="expandedFolders.data.includes(categoryKey)"
            class="pl-12 pr-2 py-2"
          >
            <li v-for="link in categoryValue" :key="link.path">
              <nuxt-link class="flex items-baseline gap-2" :to="link.path">
                <Icon class="text-green-500" name="ic:baseline-minus" />
                <span v-text="link.meta.title"
              /></nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <footer
      class="text-center py-2 px-3 bg-neutral-900 text-white text-xs border-t border-neutral-700"
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
  name: "LayoutDefault",
};
</script>

<script lang="ts" setup>
const router = useRouter();

const navigation = computed(() => {
  const routes = router.getRoutes();
  const formatRoutes = routes
    .filter((route) => route.path.startsWith("/examples/"))
    .map((obj) => {
      return {
        path: obj.path,
        name: obj.name,
        meta: obj.meta,
      };
    });
  const buildNavigation = {};
  formatRoutes.forEach((route) => {
    const splitRoute = route.path.replace("/examples/", "").split("/");
    const category = splitRoute[0];
    if (!buildNavigation[category]) {
      buildNavigation[category] = [];
    }
    buildNavigation[category].push({
      ...route,
    });
  });
  return buildNavigation;
});

const formatCategoryName = (category: string) => {
  switch (category) {
    case "data-fetching":
      return "Data Fetching";
    case "pagination":
      return "Pagination";
    default:
      return category;
  }
};

const expandedFolders = reactive<{ data: string[] }>({ data: [] });

const onToggleFolder = (category: string) => {
  if (!expandedFolders.data.includes(category)) {
    expandedFolders.data.push(category);
  } else {
    expandedFolders.data = expandedFolders.data.filter(
      (folder) => folder !== category
    );
  }
};

onMounted(() => {
  const firstCategory = Object.keys(navigation.value)[0];
  // Expand first category by default
  expandedFolders.data.push(firstCategory);
});
</script>

<style lang="scss" scoped>
a {
  @apply text-neutral-400;
  &.router-link-active,
  &:hover {
    @apply text-green-500;
  }
}
</style>
