<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TextFieldAmount',
    props: {
      amount: {
        type: String,
        required: true,
      },
    },
    emits: ['update:amount'],
    setup(props, { emit }) {
      const update = (val: string) => {
        // validation
        if (!/^\d*$/.test(val)) {
          (
            document.getElementById('text-field-amount') as HTMLInputElement
          ).value = props.amount;
        } else if (/^0{2,}$/.test(val)) {
          (
            document.getElementById('text-field-amount') as HTMLInputElement
          ).value = '0';
        } else if (/^0+[1-9]\d*$/.test(val)) {
          (
            document.getElementById('text-field-amount') as HTMLInputElement
          ).value = val.replace(/0+/, '');
        } else {
          emit('update:amount', val);
        }
      };

      return { update };
    },
  });
</script>

<template>
  <input
    id="text-field-amount"
    class="text-field-amount"
    :value="amount"
    type="text"
    placeholder="金額"
    maxlength="12"
    @input="update($event.target.value)"
  />
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .text-field-amount {
    // reset
    border: none;
    outline: none;
    padding: 0;

    width: 100%;
    height: 3.6rem;
    padding-left: 1.2rem;
    color: $text-main;
    background: $white;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: $font-medium;

    &::placeholder {
      color: $text-sub-light;
    }
  }
</style>
