<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { RecordType } from '../api/@types';

  export default defineComponent({
    name: 'RecordField',
    props: {
      memo: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      type: {
        type: String as PropType<RecordType>,
        required: true,
      },
    },
    emits: ['click'],
    setup(props) {
      return {
        displayedAmount: props.amount.toLocaleString(),
      };
    },
  });
</script>

<template>
  <div
    :class="{
      'record-field': true,
      '--expense': type === 'Expense',
      '--income': type === 'Income',
    }"
    @click="$emit('click')"
  >
    <div class="record-field__category">{{ category }}</div>
    <div v-if="memo" class="record-field__memo">（{{ memo }}）</div>
    <div class="record-field__amount">{{ displayedAmount }}円</div>
  </div>
</template>

<style scoped lang="scss">
  @import '~/scss/main';

  .record-field {
    display: grid;
    grid-template:
      '... ... ... ... ... ...' 0.8rem
      '... category memo ... amount ...' 2rem
      '... ... ... ... ... ...' 0.8rem
      / 1.2rem auto auto 1fr auto 1.2rem;

    @include button-cursor;

    &.--expense {
      background: $white;
    }

    &.--income {
      background: #f0f8ff;
    }

    &__category {
      grid-area: category;
      padding-top: 0.4rem;
    }
    &__memo {
      grid-area: memo;
      padding-top: 0.4rem;
      color: $text-sub;
    }
    &__amount {
      grid-area: amount;
      padding-top: 0.4rem;
    }

    &:active {
      background: $selected;
    }
  }
</style>
