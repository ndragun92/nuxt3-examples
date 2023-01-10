<template>
  <el-github-example-banner />
  <div class="container__main">
    <h1 class="text-2xl font-bold mb-4 text-center md:text-left">
      Pagination Example
    </h1>
    <div v-if="pending" class="text-center">Loading...</div>
    <ul class="flex flex-col gap-4 max-h-full overflow-auto">
      <li
        v-for="beer in returnData"
        :key="beer.id"
        class="border border-primary-800 border-opacity-50 bg-black bg-opacity-20 p-4 text-center md:text-left flex flex-col md:flex-row gap-4 items-center"
      >
        <div class="w-32 h-32 bg-primary-900 p-2">
          <client-only>
            <img
              class="block w-full h-full object-contain"
              :src="beer.image_url"
              :alt="beer.name"
            />
          </client-only>
        </div>
        <div class="flex-1">
          <h3
            class="font-bold text-lg mb-4 text-primary-100"
            v-text="beer.name"
          />
          <p v-text="beer.description" />
        </div>
      </li>
    </ul>
    <div class="mt-4">
      <el-pagination
        v-if="beers?.total"
        v-model.number="page"
        :query="true"
        :total="getTotalPages(beers?.total, limit)"
        :prev-show-count="3"
        :next-show-count="3"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageExamplesPaginationSimple",
};
</script>

<script lang="ts" setup>
definePageMeta({
  title: "Simple",
});

const ElPagination = defineAsyncComponent(
  () => import("~/components/elements/ElPagination/ElPagination.vue")
);

interface BeersDataInterface {
  total: number;
  data: {
    [key: string]: {
      name: string;
      description: string;
      image_url: string;
    }[];
  };
}

const { getCurrentPage, getTotalPages, query } = usePagination();
const page = ref(getCurrentPage(true, 1));
const limit = 3;

const route = useRoute();
const cacheEnabled = true; // Enables/Disabled cache

// Cache key has to be unique key across all the pages
const cacheKey = computed(() => {
  return route.path;
});

// Cache key has to be unique key to store correct page data
const cacheKeyPage = computed(() => {
  return route.fullPath;
});

const {
  pending,
  data: beers,
  refresh,
} = useLazyAsyncData<BeersDataInterface>(cacheKey.value, async (nuxtApp) => {
  const cachedData = nuxtApp?.payload?.data[cacheKey.value] || {}; // Checks payload and cached data

  // Check if we have data in cache, if so then return cached data and skip API call
  if (
    cacheEnabled &&
    cachedData?.data &&
    cachedData?.data[cacheKeyPage.value]
  ) {
    return cachedData;
  }
  // Make API request with page/limit to get fresh data
  const apiResponse = await $fetch(
    `https://api.punkapi.com/v2/beers?page=${page.value}&per_page=${limit}`
  );

  // Custom logic to handle cache based on limit/current page
  return {
    data: {
      ...(cachedData?.data || {}),
      [cacheKeyPage.value]: apiResponse,
    },
    total: 300, // Fake for testing since this api does not return total
  } as BeersDataInterface;
});

// Set page to 1 if page query does not exist
watch(
  () => query.value.page,
  async (value) => {
    if (!value) {
      page.value = 1;
    }
    // On page change refresh data
    await refresh();
  }
);

// Return data with cached key
const returnData = computed(() => {
  return beers?.value?.data[cacheKeyPage.value];
});
</script>
