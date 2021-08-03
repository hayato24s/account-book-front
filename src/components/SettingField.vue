<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  export default defineComponent({
    name: 'SettingField',
    props: {
      rightFontColor: {
        type: String as PropType<'normal' | 'light'>,
        default: 'light',
      },
      showArrow: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div class="setting-field" @click="$emit('click')">
    <div class="setting-field__left">
      <slot name="left"></slot>
    </div>
    <div
      :class="{
        'setting-field__right': true,
        '--light': rightFontColor === 'light',
        '--arrow': showArrow,
      }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .setting-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.6rem;
    background: $white;

    @include button-cursor;

    &__left {
      padding-left: 1.2rem;
      display: flex;
      align-items: center;
    }

    &__right {
      padding-right: 1.2rem;
      display: flex;
      align-items: center;

      &.--light {
        color: $text-sub;
      }

      &.--arrow {
        padding-right: 0.4rem;
        &::after {
          font-family: 'Material Icons';
          content: 'chevron_right';
          font-size: 2rem;
          color: $text-sub;
          vertical-align: text-bottom;
        }
      }
    }

    &:active {
      @include field-active;
    }
  }
</style>
