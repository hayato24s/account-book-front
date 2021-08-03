<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export type BorderColor = 'base' | 'gray' | 'calendar';

  export default defineComponent({
    name: 'Border',
    props: {
      color: {
        type: String as PropType<BorderColor>,
        default: 'base',
      },
      lacking: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<template>
  <div class="border">
    <div v-if="lacking" class="border__left"></div>
    <div
      :class="{
        border__right: true,
        '--base': color === 'base',
        '--gray': color === 'gray',
        '--calendar': color === '--calendar',
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .border {
    width: 100%;
    height: 1px; // 0.1remだと太さが不安定になる
    display: flex;

    &__left {
      width: 1.2rem;
      background: $white;
    }

    &__right {
      flex-grow: 1;

      &.--base {
        background: $border-base;
      }
      &.--gray {
        background: $border-gray;
      }
      &.--calendar {
        background: $border-calendar;
      }
    }
  }
</style>
