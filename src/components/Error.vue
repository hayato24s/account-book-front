<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Error',
  });
</script>

<template>
  <div class="error">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .error {
    width: 100%;
    @include height-and-line-height(3.6rem);
    text-align: center;
    margin-top: 2rem;
  }
</style>
