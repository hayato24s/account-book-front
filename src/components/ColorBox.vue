<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'ColorBox',
    props: {
      color: {
        type: String, // #000000 ~ #ffffff & custom
        required: true,
      },
      size: {
        type: Number,
        default: 3.2, // rem
      },
      checked: {
        type: Boolean,
        default: null,
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div
    class="color-box"
    :style="{
      background: `${
        color === 'custom'
          ? 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)'
          : color
      }`,
      width: `${size}rem`,
      height: `${size}rem`,
      'border-radius': `${size / 4}rem`,
    }"
    @click="$emit('click')"
  >
    <div
      v-if="checked != undefined"
      :class="{
        'color-box__check': true,
        'material-icons': true,
        '--checked': checked,
      }"
    >
      check
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .color-box {
    display: flex;
    justify-content: center;
    align-items: center;
    @include button-cursor;

    &__check {
      color: $white;
      font-weight: 700;
      opacity: 0.5;

      &.--checked {
        opacity: 1;
      }
    }
  }
</style>
