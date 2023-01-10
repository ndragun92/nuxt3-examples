<template>
  <div class="min-h-screen flex flex-col bg-primary-900 text-primary-300">
    <nav
      class="bg-black bg-opacity-10 border-b border-primary-800 border-opacity-50 px-4"
    >
      <div
        class="w-full max-w-[1280px] mx-auto flex items-center justify-between h-20"
      >
        <nuxt-link to="/" class="flex items-center">
          <div class="relative">
            <img class="w-24" src="/logo.svg" alt="Logo" />
            <span class="absolute -top-2 -right-4 text-xl text-emerald-500"
              >3</span
            >
          </div>
          <sup class="uppercase text-xs ml-6 tracking-wider">Examples</sup>
        </nuxt-link>
        <div class="flex items-center gap-4">
          <a
            class="hover:text-emerald-500"
            aria-label="Github Repository"
            href="https://github.com/ndragun92/nuxt3-examples"
            target="_blank"
          >
            <Icon size="30" name="mdi:github" />
          </a>
          <a
            class="hover:text-blue-500"
            aria-label="Discord Channel"
            href="https://discord.gg/cfYJbewNcz"
            target="_blank"
          >
            <Icon size="30" name="ic:baseline-discord" />
          </a>
          <button
            aria-label="Mobile Menu"
            class="block md:hidden"
            type="button"
            @click="toggleMobileMenu"
          >
            <Icon
              v-show="showMobileMenu"
              size="30"
              name="material-symbols:close-rounded"
            />
            <Icon
              v-show="!showMobileMenu"
              size="30"
              name="charm:menu-hamburger"
            />
          </button>
        </div>
      </div>
    </nav>
    <div class="wrapper mb-10 h-full flex-1 w-full max-w-[1280px] mx-auto">
      <aside
        class="aside__mobile mt-10 md:block relative z-10 border-r border-primary-800 border-opacity-50 px-4"
        :class="{ 'aside__mobile--open': showMobileMenu }"
      >
        <div
          v-for="(categoryValue, categoryKey) in navigation"
          :key="categoryKey"
          class="mb-2"
        >
          <div
            class="flex items-center gap-4 mb-2 cursor-pointer hover:text-emerald-500"
            @click="onToggleFolder(categoryKey)"
          >
            <Icon
              v-show="expandedFolders.data.includes(categoryKey)"
              class="w-6 h-6"
              name="material-symbols:folder-open-rounded"
            />
            <Icon
              v-show="!expandedFolders.data.includes(categoryKey)"
              class="w-6 h-6"
              name="material-symbols:folder-rounded"
            />
            <div
              class="relative top-[1px] truncate flex-1"
              v-text="formatCategoryName(categoryKey)"
            />
          </div>
          <ul v-if="expandedFolders.data.includes(categoryKey)" class="pl-10">
            <li v-for="link in categoryValue" :key="link.path">
              <nuxt-link
                class="flex items-baseline gap-1 text-primary-500 hover:text-emerald-500"
                :to="link.path"
              >
                <Icon
                  class="relative top-[2px] text-emerald-500"
                  name="ic:baseline-minus" />
                <span class="flex-1 text-sm" v-text="link.meta.title"
              /></nuxt-link>
            </li>
          </ul>
        </div>
      </aside>
      <main>
        <slot />
      </main>
    </div>
    <footer
      class="text-center py-2 px-4 bg-black bg-opacity-10 border-t border-primary-800 border-opacity-50 text-xs flex flex-col md:flex-row items-center justify-between gap-2"
    >
      <a
        href="https://github.com/ndragun92/nuxt3-examples"
        target="_blank"
        class="flex items-center gap-2"
      >
        <Icon class="animate-bounce" size="16" name="twemoji:star" />
        <div
          class="relative top-[1px] text-white"
          v-text="data?.stargazers_count"
        />
      </a>
      <div>
        <a
          class="text-emerald-500 hover:text-white"
          href="https://ndragun92.github.io/portfolio/"
          target="_blank"
          >ndragun92.github.io/portfolio</a
        >
        <span> &copy; {{ year }} All Rights Reserved</span>
      </div>
      <div class="flex items-center gap-2">
        <div>Made with</div>
        <div class="relative">
          <Icon
            class="animate-ping absolute top-1 left-0"
            name="twemoji:red-heart"
          />
          <Icon name="twemoji:red-heart" />
        </div>
        <div>
          by
          <a
            class="text-bold text-white hover:underline"
            href="https://www.linkedin.com/in/nemanja-dragun/"
            target="_blank"
            >Nemanja Dragun</a
          >
          in Bielefeld
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>

<script lang="ts" setup>
const { toggleValue: showMobileMenu, toggle: toggleMobileMenu } = useHelpers();

const { data } = useLazyAsyncData<{ stargazers_count: number }>(() =>
  $fetch("https://api.github.com/repos/ndragun92/nuxt3-examples")
);

const year = computed(() => {
  return useDateFormat(useNow(), "YYYY").value;
});

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
    case "data-table":
      return "Data Tables";
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
aside {
  a {
    &.router-link-active,
    &:hover {
      @apply text-emerald-500;
    }
  }
}
.aside__mobile {
  @include media-md-max {
    @apply fixed top-[calc(5rem+1px)] left-0 bottom-0 w-[300px] z-50 bg-primary-900 overflow-y-auto overflow-x-hidden p-4;
    @apply -translate-x-full;
    @include transition;
    &--open {
      @apply translate-x-0;
    }
  }
}
.wrapper {
  @apply grid;
  @apply grid-cols-[minmax(0,1fr)] md:grid-cols-[300px,minmax(0,1fr)];
}
</style>
