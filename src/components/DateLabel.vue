<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'DateLabel',
  });
</script>

<template>
  <div class="date-label">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .date-label {
    padding: 0.2rem 0 0.2rem 1.2rem;
    background: $base;
    font-size: 0.2rem;
  }
</style>
