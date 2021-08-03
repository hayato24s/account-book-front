<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'GrayFilter',
    emits: ['click'],
  });
</script>

<template>
  <div class="gray-filter" @click="$emit('click')"></div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .gray-filter {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    background: $filter-gray;
  }
</style>
