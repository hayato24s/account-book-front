<script lang="ts">
  import { computed, defineComponent } from 'vue';
  export default defineComponent({
    name: 'BOP',
    props: {
      expense: {
        type: Number,
        default: 0,
      },
      income: {
        type: Number,
        default: 0,
      },
    },
    setup(props) {
      const total = computed(() => props.income - props.expense);

      return {
        total,
      };
    },
  });
</script>

<template>
  <div class="bop">
    <div class="bop__income income">
      <div class="income__label">収入</div>
      <div class="income__amount">{{ income.toLocaleString() }}円</div>
    </div>
    <div class="bop__expense expense">
      <div class="expense__label">支出</div>
      <div class="expense__amount">{{ expense.toLocaleString() }}円</div>
    </div>
    <div class="bop__total total">
      <div class="total__label">合計</div>
      <div class="total__amount">{{ total.toLocaleString() }}円</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .bop {
    width: 100%;
    height: 3.6rem;
    position: relative;

    background: $white;
    user-select: none;

    &__income {
      position: absolute;
      left: 1.2rem;
    }

    &__expense {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &__total {
      position: absolute;
      right: 1.2rem;
    }
  }

  .income,
  .expense,
  .total {
    padding: 0.4rem 0;
    text-align: center;

    &__label {
      font-size: $font-x-small;
      color: $text-sub;
      font-weight: 300;
      margin-bottom: 0.2rem;
    }

    &__amount {
      font-size: $font-large;
    }
  }
</style>
