<script lang="ts">
  import { defineComponent } from 'vue';
  import ColorBox from './ColorBox.vue';

  export default defineComponent({
    name: 'ThemeColorField',
    components: {
      ColorBox,
    },
    props: {
      color: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['click'],
  });
</script>

<template>
  <div class="theme-color-field" @click="$emit('click')">
    <div class="theme-color-field__left">
      <ColorBox :color="color" :size="1.6"></ColorBox>
      <slot />
    </div>
    <div
      v-show="checked"
      class="theme-color-field__check material-icons"
      :style="{ color: color }"
    >
      check
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .theme-color-field {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    @include height-and-line-height(3.6rem);
    padding: 0 1.2rem;
    @include button-cursor;
    background: $white;

    &__left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    &__check {
      font-size: $font-large;
      font-weight: 700;
    }

    &:active {
      @include field-active;
    }
  }
</style>
