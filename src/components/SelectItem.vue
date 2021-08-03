<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'SelectItem',
    props: {
      selected: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div
    :class="{ 'select-item': true, '--selected': selected }"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .select-item {
    width: 100%;
    @include height-and-line-height(3.6rem);
    text-align: left;
    background: $base;
    padding: 0 1.2rem;
    @include button-cursor;

    &.--selected {
      background: $selected;
    }
  }
</style>
