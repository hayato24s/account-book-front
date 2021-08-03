<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { lighten } from '../entities/color';

  type CustomProps = {
    '--base-color': string;
    '--lighter-color': string;
    '--left': string;
  };

  export default defineComponent({
    name: 'Header',
    props: {
      color: {
        type: String,
        required: true,
      },
      gradation: {
        type: Boolean,
        default: true,
      },
      left: {
        type: Number, // rem
        default: 0,
      },
    },
    setup(props) {
      const style = computed<CustomProps>(() => ({
        '--base-color': props.color,
        '--lighter-color': props.gradation
          ? lighten(props.color, 30)
          : props.color,
        '--left': `${props.left}rem`,
      }));

      return { style };
    },
  });
</script>

<template>
  <div class="header" :style="style">
    <div class="header__left">
      <slot name="left"></slot>
    </div>
    <div class="header__center">
      <slot name="center"></slot>
    </div>
    <div class="header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .header {
    // --base-color
    // --lighter-color
    // --left

    position: relative;
    line-height: 3.2rem;
    user-select: none;
    &__left {
      position: absolute;
      left: 1.6rem;
      bottom: 0.8rem;
    }
    &__center {
      position: absolute;
      left: max(50%, var(--left));
      transform: translateX(-50%);
      bottom: 0.8rem;
    }
    &__right {
      position: absolute;
      right: 1.6rem;
      bottom: 0.8rem;
    }

    width: 100%;
    height: 5.6rem;

    background: linear-gradient(var(--lighter-color), var(--base-color));
    color: $text-white;
    font-size: $font-x-large;
    font-weight: 300;

    &__left {
      font-size: $font-large;
    }
  }
</style>
