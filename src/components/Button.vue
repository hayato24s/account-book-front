<script lang="ts">
  import { defineComponent } from 'vue';

  type CustomProps = {
    '--color': string;
    '--darkened-color': string;
  };

  export default defineComponent({
    name: 'Button',
    props: {
      color: {
        type: String,
        required: true,
      },
      darkenedColor: {
        type: String,
        required: true,
      },
    },
    emits: ['click'],
    setup: (props) => {
      const style: CustomProps = {
        '--color': props.color,
        '--darkened-color': props.darkenedColor,
      };

      return {
        style,
      };
    },
  });
</script>

<template>
  <button class="button" :style="style" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped lang="scss">
  @import '~/scss/main';

  .button {
    // --color;
    // --darkened-color;

    appearance: none;
    border: none;

    display: block;
    width: 80%;
    height: 3.6rem;
    margin: 0 auto;
    font-weight: 700;
    color: $text-white;
    background-color: var(--color);
    border-radius: 0.8rem;

    @include button-cursor;

    &:active {
      color: rgba($text-white, 0.4);
      background-color: var(--darkened-color);
    }

    &:focus {
      outline: none;
    }
  }
</style>
