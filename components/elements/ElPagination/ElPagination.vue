<template>
  <div class="flex justify-between items-center gap-4">
    <ul>
      <li
        v-if="!hideSearch && page <= total"
        class="el__pagination_item el__pagination_item--search"
      >
        <label for="goToPage">Search for page...</label>
        <input
          id="goToPage"
          v-model="inputPage"
          aria-label="Search for page..."
          type="text"
          placeholder="..."
        />
      </li>
    </ul>
    <ul
      v-if="total > 1"
      class="el__pagination"
      :class="[`el__pagination--${props?.type || 'default'}`]"
    >
      <li
        v-if="page > 1"
        class="el__pagination_item el__pagination_item--first"
      >
        <button type="button" aria-label="Move to first page" @click="page = 1">
          <Icon name="material-symbols:first-page" />
        </button>
      </li>
      <li
        v-if="page - 1 > 1"
        class="el__pagination_item el__pagination_item--backward"
      >
        <button
          type="button"
          aria-label="Move to previous page"
          @click="page = page - 1"
        >
          <Icon name="grommet-icons:form-previous" />
        </button>
      </li>
      <template
        v-for="prevPage in arrayCreate(prevShowCount).reverse()"
        :key="`prevPage--${prevPage._id}}`"
      >
        <li
          v-if="page - prevPage._id > 0"
          class="el__pagination_item el__pagination_item--prev"
        >
          <button
            type="button"
            :aria-label="`Move to page ${page - prevPage._id}`"
            @click="page = page - prevPage._id"
            v-text="page - prevPage._id"
          />
        </li>
      </template>
      <li class="el__pagination_item el__pagination_item--current">
        <button type="button" v-text="page" />
      </li>
      <template
        v-for="nextPage in arrayCreate(nextShowCount)"
        :key="`nextPage--${nextPage._id}}`"
      >
        <li
          v-if="page + nextPage._id <= total"
          class="el__pagination_item el__pagination_item--next"
        >
          <button
            type="button"
            :aria-label="`Move to page ${page + nextPage._id}`"
            @click="page = page + nextPage._id"
            v-text="page + nextPage._id"
          />
        </li>
      </template>
      <li
        v-if="page + 1 < total"
        class="el__pagination_item el__pagination_item--forward"
      >
        <button
          type="button"
          aria-label="Move to next page"
          @click="page = page + 1"
        >
          <Icon name="grommet-icons:form-next" />
        </button>
      </li>
      <li
        v-if="page < total"
        class="el__pagination_item el__pagination_item--last"
      >
        <button
          type="button"
          aria-label="Move to last page"
          @click="page = total"
        >
          <Icon name="material-symbols:last-page" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import debounce from "lodash-es/debounce";
const props = defineProps<{
  type?: "square" | "rounded";
  total: number;
  prevShowCount: number;
  nextShowCount: number;
  modelValue: number;
  query?: boolean;
  hideSearch?: boolean;
  disableScrollTop?: boolean;
}>();

const page = ref<number>(props?.modelValue);

watch(
  () => props?.modelValue,
  async (val) => {
    console.log("update");
    page.value = val;
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", payload: number): void;
}>();

const { arrayCreate } = useHelpers();

const inputPage = ref(page.value);
if (!props?.hideSearch) {
  watch(inputPage, (newInputPage) => {
    validatePage(newInputPage);
  });

  const validatePage = debounce((newInputPage) => {
    const newInputPageValue = +newInputPage;
    if (newInputPageValue > 0 && newInputPageValue <= props?.total) {
      page.value = newInputPageValue;
    } else {
      inputPage.value = page.value;
    }
  }, 1000);
}

if (props?.query) {
  const route = useRoute();
  const router = useRouter();

  const query = computed(() => {
    return route.query;
  });

  // Initial page population disable for now since we do it in root component
  // if (query.value.page) {
  //   page.value = +query.value.page || props?.modelValue;
  //   emit("update:modelValue", +page.value);
  // }

  watch(page, (newPage) => {
    router.push({ query: { ...query.value, page: `${newPage}` } });
    inputPage.value = +newPage;
    emit("update:modelValue", +newPage);
    if (!props?.disableScrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
} else {
  watch(page, (newPage) => {
    inputPage.value = +newPage;
    emit("update:modelValue", +newPage);
    if (!props?.disableScrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
</script>

<style lang="scss">
.el__pagination {
  @apply flex items-center;
  &--default {
    @apply gap-1;
    .el__pagination_item {
      @apply rounded-sm;
    }
  }
  &--square {
    .el__pagination_item {
      @apply border border-blue-500;
      &--search {
        @apply w-14;
      }
      &--current {
        @apply text-white;
      }
      &:not(:last-child) {
        border-right: none;
      }
    }
  }
  &--rounded {
    @apply gap-1;
    .el__pagination_item {
      @apply border border-blue-500 rounded-full;
      &--search {
        @apply w-10 overflow-hidden;
        input {
          @apply rounded-full;
        }
      }
    }
  }
  &_item {
    @apply w-10 h-10 flex items-center justify-center text-center text-blue-500;
    button {
      @apply w-full h-full;
    }
    &--first,
    &--backward,
    &--prev,
    &--current,
    &--next,
    &--forward,
    &--last {
      @apply hover:bg-blue-500 hover:text-white;
    }
    &--first,
    &--backward,
    &--prev,
    &--next,
    &--forward,
    &--last {
      @apply cursor-pointer;
    }
    &--first,
    &--backward,
    &--forward,
    &--last {
      button {
        svg {
          @apply w-5 h-5;
        }
      }
    }
    &--current {
      @apply bg-blue-500 text-white;
    }
    &--search {
      @apply w-auto bg-primary-800 overflow-hidden rounded-sm;
      label {
        @apply block whitespace-nowrap px-4 text-primary-200 text-xs;
      }
      input {
        @apply border-l border-primary-900 bg-primary-800 text-white w-10 h-full focus:outline-none text-center;
      }
    }
  }
}
</style>
