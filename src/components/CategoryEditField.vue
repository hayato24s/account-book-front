<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'CategoryEditField',
    emits: ['click'],
    setup(_, { emit }) {
      const clickHandler = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('category-edit-field__drag')) return;
        emit('click');
      };

      // active時のstyle
      const isActive = ref(false);
      const mouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        isActive.value = !target.classList.contains(
          'category-edit-field__drag'
        );
      };
      const mouseUp = () => {
        isActive.value = false;
      };

      return {
        clickHandler,
        isActive,
        mouseDown,
        mouseUp,
      };
    },
  });
</script>

<template>
  <div
    :class="{ 'category-edit-field': true, '--active': isActive }"
    @click="clickHandler"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <div class="category-edit-field__name">
      <slot />
    </div>
    <div class="category-edit-field__arrow material-icons">chevron_right</div>
    <div class="category-edit-field__drag material-icons">menu</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .category-edit-field {
    width: 100%;
    display: flex;
    background: $white;
    @include height-and-line-height(3.6rem);
    @include button-cursor;

    &__name {
      padding-left: 1.2rem;
      flex-grow: 1;
    }

    &__arrow {
      font-size: 2rem;
      color: $text-icon;
    }

    &__drag {
      font-size: 2rem;
      color: $text-icon;

      border: solid $border-base;
      border-width: 0 0 0 1px;
      padding: 0 1.2rem 0 0.8rem;
    }

    &.--active:active {
      @include field-active;
    }
  }
</style>
