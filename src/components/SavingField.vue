<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SavingField',
    props: {
      month: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      mom: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const displayedAmount = `${props.amount.toLocaleString()}円`;

      return {
        displayedAmount,
      };
    },
  });
</script>

<template>
  <div class="saving-field">
    <div class="saving-field__month">
      {{ month }}
    </div>
    <div class="saving-field__amount">
      {{ displayedAmount }}
    </div>
    <div class="saving-field__mom">前年比: {{ mom }}</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .saving-field {
    display: grid;
    grid-template:
      'month ... amount' auto
      'month ... mom' auto
      / auto 1fr auto;

    width: 100%;
    height: 3.6rem;
    padding: 0.4rem 1.2rem;

    &__month {
      grid-area: month;
      align-self: center;
    }

    &__amount {
      grid-area: amount;
      justify-self: end;
      align-self: center;
    }

    &__mom {
      grid-area: mom;
      justify-self: end;
      align-self: end;

      font-size: $font-x-small;
      color: $text-sub;
      font-weight: 300;
    }
  }
</style>
