export default function useHelpers() {
  const arrayCreate = (count = 1, data = {}) => {
    return [...Array(count)].map((_, i) => {
      return {
        _id: i + 1,
        ...data,
      };
    });
  };

  const toggleValue = ref(false);
  const toggle = () => {
    toggleValue.value = !toggleValue.value;
  };

  return { arrayCreate, toggleValue, toggle };
}
