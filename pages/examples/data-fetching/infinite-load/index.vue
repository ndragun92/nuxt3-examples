<template>
  <el-github-example-banner />
  <div class="p-10">
    <h1 class="text-2xl font-bold text-center mb-4">Infinite Load Example</h1>
    <div v-if="pending" class="text-center">Loading...</div>
    <ul class="flex flex-col gap-4 max-h-full overflow-auto">
      <li
        v-for="beer in beers?.data"
        :key="beer.id"
        class="border border-black border-dotted p-4 flex gap-4 items-center"
      >
        <div class="w-32 h-32 bg-neutral-100 p-2">
          <client-only>
            <img
              class="block w-full h-full object-contain"
              :src="beer.image_url"
              :alt="beer.name"
            />
          </client-only>
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-lg mb-4" v-text="beer.name" />
          <p v-text="beer.description" />
        </div>
      </li>
      <template v-if="beers?.data?.length">
        <el-infinite-load v-if="!pending" @load-data="onLoadData" />
        <lazy-el-data-load v-else />
      </template>
    </ul>
    <div v-if="beers?.data?.length" class="text-center mt-4">
      Loaded: {{ beers?.data?.length }} of {{ beers?.total }} records
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageExamplesDataFetchingInfiniteLoad",
};
</script>

<script lang="ts" setup>
import { promiseTimeout } from "@vueuse/core";

definePageMeta({
  title: "Infinite Load",
});

interface BeersDataInterface {
  page?: number; // For internal caching
  total: number;
  data: {
    name: string;
    description: string;
    image_url: string;
  }[];
}

const page = ref(1);
const cacheEnabled = true; // Enables/Disabled cache
const cacheLoaded = ref(false);

const route = useRoute();
// Cache key has to be unique key across all the pages
const cacheKey = computed(() => {
  return route.fullPath;
});

const {
  pending,
  data: beers,
  refresh,
} = useLazyAsyncData<BeersDataInterface>(cacheKey.value, async (nuxtApp) => {
  const {
    page: cachedPage,
    total: cachedTotal,
    data: cachedData,
  } = nuxtApp?.payload?.data[cacheKey.value] || {}; // Checks payload and cached data
  // Validates if cache was loaded and if it exists
  if (cacheEnabled && !cacheLoaded.value && cachedPage) {
    // Load cached data
    cacheLoaded.value = true; // We need to load cached data only once on page load
    page.value = cachedPage; // Gets last fetched page, so we can continue fetch with correct page and just append new data to cached data
    return {
      page: page.value,
      total: cachedTotal,
      data: cachedData,
    };
  }
  // Load fresh data from API
  await promiseTimeout(1000); // Fake API timeout for 1 second for demo, so we can see spinner
  const apiResponse: any[] = await $fetch(
    `https://api.punkapi.com/v2/beers?page=${page.value}&per_page=25`
  );

  const response = {
    total: 300, // Fake total of 300 since API does not return total available records but in ideal scenario we usually get total back from API
    data: apiResponse,
  };

  let data: any[] = response.data;
  // Check if page is greater than 1, if it is then just append new data on current
  if (beers.value?.page && beers.value.page > 1) {
    data = [...beers.value.data, ...response.data];
  }

  return {
    page: page.value,
    total: response.total,
    data,
  };
});

// Triggered on scroll to bottom
const onLoadData = async ($state) => {
  page.value++;
  // Validates if we did load all data
  if (beers.value?.data && beers.value.data.length >= beers.value.total) {
    $state.complete();
  } else {
    await refresh();
    $state.loaded();
  }
};
</script>
