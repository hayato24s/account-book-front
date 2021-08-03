<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Modal',
    props: {
      leftBtnColor: {
        type: String,
        default: 'blue',
      },
      rightBtnColor: {
        type: String,
        default: 'red',
      },
    },
    emits: ['click:left-btn', 'click:right-btn'],
  });
</script>

<template>
  <div class="modal">
    <div class="modal__title">
      <slot name="title"></slot>
    </div>
    <div class="modal__contents">
      <slot name="contents"></slot>
    </div>
    <div
      class="modal__left-btn"
      :style="{ color: leftBtnColor }"
      @click="$emit('click:left-btn')"
    >
      <slot name="left-btn"></slot>
    </div>
    <div
      class="modal__right-btn"
      :style="{ color: rightBtnColor }"
      @click="$emit('click:right-btn')"
    >
      <slot name="right-btn"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .modal {
    width: 80%;
    max-width: 500px;
    @include center-fixed;

    display: grid;
    grid-template:
      'title title title' auto
      'contents contents contents' auto
      '... ... ...' 1px
      'left-btn ... right-btn' 4rem
      / 1fr 1px 1fr;

    background: $border-base;
    text-align: center;
    z-index: 30;
    border-radius: 1.2rem;
    user-select: none;

    &__title {
      grid-area: title;
      padding: 2.4rem 0 1.2rem;

      font-weight: 700;
      background: $base;
      border-radius: 1.2rem 1.2rem 0 0;
    }

    &__contents {
      grid-area: contents;
      padding-bottom: 2rem;

      font-size: $font-x-small;
      line-height: 1.4rem;
      background: $base;
    }

    &__left-btn {
      grid-area: left-btn;
      line-height: 4rem;
      background: $base;
      border-radius: 0 0 0 1.2rem;
      @include button-cursor;

      &:active {
        background: $selected;
      }
    }

    &__right-btn {
      grid-area: right-btn;
      line-height: 4rem;
      background: $base;
      border-radius: 0 0 1.2rem;
      @include button-cursor;

      &:active {
        background: $selected;
      }
    }
  }
</style>
