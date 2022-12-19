<template>
  <div class="loading__bg" :class="{ 'loading__bg--finish': loading === 100 }">
    <div
      class="loading__progress h-full flex items-center"
      :style="{ width: `${loading}%` }"
    >
      <div class="flex items-center h-full gap-4 pr-8 justify-end">
        <span class="relative -top-[1px] flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          />
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
          />
        </span>
        <span class="uppercase font-bold tracking-widest">Loading</span>
      </div>
    </div>
    <div
      class="loading__progress loading__progress--mobile flex justify-center"
      :style="{ height: `${loading}%` }"
    >
      <div class="flex items-center gap-2 pr-4 h-full">
        <span class="relative -top-[1px] flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          />
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
          />
        </span>
        <span class="uppercase font-bold tracking-widest">Loading</span>
      </div>
    </div>
    <div class="fixed right-0 bottom-10 left-0 z-50 text-center">
      <button
        class="bg-black bg-opacity-10 border border-primary-800 border-opacity-50 mx-auto py-2 px-4 uppercase text-xs hover:bg-opacity-50"
        type="button"
        @click="loading = 100"
      >
        Skip Animation
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { promiseTimeout } from "@vueuse/core";

const loading = ref(25);
onMounted(async () => {
  await promiseTimeout(1250);
  onProgress(45);
  await promiseTimeout(1750);
  onProgress(60);
  await promiseTimeout(1000);
  onProgress(95);
  await promiseTimeout(1250);
  onProgress(100);
});

const onProgress = (progress) => {
  if (loading.value === 100) return;
  loading.value = progress;
};
</script>

<style lang="scss" scoped>
.loading__bg {
  @apply fixed top-0 right-0 bottom-0 left-0 bg-white z-50 opacity-100;
  transition: 1s;
  &--finish {
    @apply opacity-0 pointer-events-none;
  }
}
.loading__progress {
  @apply fixed top-0 right-0 bottom-0 left-0 bg-primary-900 z-50 w-[10%] hidden md:block;
  transition: width 1s;
  &--mobile {
    transition: height 1s;
    @apply w-full h-[10%] flex md:hidden;
  }
}
</style>
