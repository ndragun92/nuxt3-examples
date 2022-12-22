export default function usePagination() {
  const router = useRouter();
  const route = useRoute();

  const query = computed(() => {
    return route.query;
  });
  const getCurrentPage = (query = false, page: number) => {
    if (query) {
      const route = useRoute();

      const query = computed(() => {
        return route.query;
      });

      if (query.value.page) {
        return +query.value.page;
      }
    }
    return page;
  };

  const getTotalPages = (total: number, limit: number): number => {
    return Math.ceil(+total / +limit) || 0;
  };

  const resetPageQuery = () => {
    router.push({ query: { ...query.value, page: undefined } });
  };

  return { getCurrentPage, getTotalPages, resetPageQuery, query };
}
