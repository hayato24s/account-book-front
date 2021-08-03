<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HeaderItem',
    props: {
      fontSize: {
        type: Number,
        default: 1.8,
      },
      iconName: {
        type: String,
        default: '',
      },
      iconSize: {
        type: Number,
        default: 2.4,
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div
    class="header-item"
    :style="{ 'font-size': `${fontSize}rem` }"
    @click="$emit('click')"
  >
    <div class="header-item__icon" :style="{ 'font-size': `${iconSize}rem` }">
      {{ iconName }}
    </div>
    <div class="header-item__label">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .header-item {
    display: flex;
    align-items: center;
    @include height-and-line-height(3.2rem);
    color: $text-white;
    font-weight: 300;
    @include button-cursor;

    &__icon {
      font-family: 'Material Icons';
    }
  }
</style>
