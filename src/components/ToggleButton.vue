<script lang="ts">
  import { defineComponent, PropType, watchEffect } from 'vue';
  import { darken } from '../entities/color';

  export type Colors = {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    sliderColor: string;
  };

  type CustomProps = {
    '--color': string;
    '--selected-color': string;
    '--background-color': string;
    '--slider-color': string;
    '--border-color': string;
    '--total': number;
    '--nth': number;
  };

  export default defineComponent({
    props: {
      selected: {
        type: String,
        required: true,
      },
      labels: {
        type: Array as PropType<string[]>,
        required: true,
      },
      colors: {
        type: Object as PropType<Colors>,
        required: true,
      },
    },
    emits: ['update:selected'],
    setup(props) {
      const style: CustomProps = {
        '--color': props.colors.color,
        '--selected-color': props.colors.selectedColor,
        '--background-color': props.colors.backgroundColor,
        '--slider-color': props.colors.sliderColor,
        '--border-color': darken(props.colors.backgroundColor, 10),
        '--total': props.labels.length,
        '--nth':
          props.labels.findIndex((label) => label === props.selected) ?? 0,
      };

      watchEffect(() => {
        style['--nth'] =
          props.labels.findIndex((label) => label === props.selected) ?? 0;
      });

      return {
        style,
      };
    },
  });
</script>

<template>
  <div class="toggle-button" :style="style">
    <template v-for="(label, i) in labels" :key="label">
      <transition name="fade">
        <div
          v-if="i !== 0 && style['--nth'] !== i && style['--nth'] !== i - 1"
          class="toggle-button__border"
        ></div>
      </transition>
      <div
        class="toggle-button__label"
        @click="$emit('update:selected', label)"
      >
        {{ label }}
      </div>
    </template>
    <div class="toggle-button__slider">
      {{ selected }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '~/scss/main';

  .toggle-button {
    // --color
    // --selected-color
    // --background-color
    // --slider-color
    // --border-color
    // --total
    // --nth
    --width: min(10rem, calc(100vw * 0.8 / var(--total)));

    position: relative;
    display: flex;
    width: min-content;
    background: var(--background-color);
    border-radius: 0.8rem;
    font-size: $font-small;
    font-weight: 300;
    text-align: center;
    @include button-cursor;

    &__label {
      width: var(--width);
      color: var(--color);
      line-height: 2.8rem;

      &:nth-child(1) {
        padding-left: 0.1rem;
      }
    }

    &__border {
      width: 0.1rem;
      height: 1.6rem;
      align-self: center;
      background: var(--border-color);
    }

    &__slider {
      position: absolute;
      width: calc(var(--width) - 0.4rem);
      line-height: 2.4rem;
      color: var(--selected-color);
      background: var(--slider-color);
      border-radius: 0.6rem;
      transform: translate(
        calc((0.1rem + var(--width)) * var(--nth) + 0.2rem),
        0.2rem
      ); // xは (border + label) * nth
      transition: $transition-all;
    }
  }
</style>
