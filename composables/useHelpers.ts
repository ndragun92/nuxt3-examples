export default function useHelpers() {
  const toggleValue = ref(false);
  const toggle = () => {
    toggleValue.value = !toggleValue.value;
  };

  return { toggleValue, toggle };
}
