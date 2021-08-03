<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'CenterField',
    props: {
      color: {
        type: String as PropType<'normal' | 'red'>,
        default: 'normal',
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div
    :class="{
      'center-field': true,
      '--normal': color === 'normal',
      '--red': color === 'red',
    }"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .center-field {
    width: 100%;
    @include height-and-line-height(3.6rem);
    text-align: center;
    background: $white;
    @include button-cursor;
    &:active {
      @include field-active;
    }

    &.--normal {
      color: $text-main;
    }

    &.--red {
      color: $text-red;
    }
  }
</style>
