<template>
  <div>
    Navbar
    <div class="page__content">
      <slot />
    </div>
    Footer
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>
