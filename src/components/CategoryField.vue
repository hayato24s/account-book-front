<script lang="ts">
  import { defineComponent } from 'vue';

  type CustomProp = {
    '--circle-color': string;
  };

  export default defineComponent({
    name: 'CategoryField',
    props: {
      category: {
        type: String,
        required: true,
      },
      categoryId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
    emits: ['click'],
    setup(props) {
      const displayedAmount = props.amount.toLocaleString();
      const style: CustomProp = { '--circle-color': props.color };

      return {
        displayedAmount,
        style,
      };
    },
  });
</script>

<template>
  <div class="category-field" :style="style" @click="$emit('click')">
    <div class="category-field__circle"></div>
    <div class="category-field__category">{{ category }}</div>
    <div class="category-field__amount">{{ displayedAmount }}円</div>
  </div>
</template>

<style scoped lang="scss">
  @import '~/scss/main';

  .category-field {
    // --circle-color;

    display: grid;
    grid-template:
      '... ... ... ... ... ... ...' 0.8rem
      '... circle ... category ... amount ...' 2rem
      '... ... ... ... ... ... ...' 0.8rem
      / 1.2rem 1rem 0.8rem auto 1fr auto 0.4rem;

    background: $white;
    align-items: center;
    @include button-cursor;

    &__circle {
      grid-area: circle;
      height: 1rem;
      border-radius: 50%;
      background: var(--circle-color);
    }
    &__category {
      grid-area: category;
    }
    &__amount {
      grid-area: amount;

      &::after {
        font-family: 'Material Icons';
        content: 'chevron_right';
        font-size: 2rem;
        color: $text-sub;
        vertical-align: text-bottom;
      }
    }

    &:active {
      background: $selected;
    }
  }
</style>
