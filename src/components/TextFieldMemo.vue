<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TextFieldMemo',
    props: {
      memo: {
        type: String,
        required: true,
      },
    },
    emits: ['update:memo'],
  });
</script>

<template>
  <div class="text-field-memo">
    <label class="text-field-memo__label" for="memo">メモ</label>
    <input
      id="memo"
      type="text"
      :value="memo"
      placeholder="品目やお店"
      class="text-field-memo__input"
      @input="$emit('update:memo', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .text-field-memo {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 3.6rem;

    background: $white;

    &__label {
      padding: 0 1.2rem;
      line-height: 3.6rem;
    }
    &__input {
      // reset
      border: none;
      outline: none;
      padding: 0;

      padding-right: 1.2rem;
      flex: 1;

      text-align: right;
      color: $text-main;
      background: $white;
      font-family: 'Noto Sans JP', sans-serif;
      font-size: $font-medium;
      &::placeholder {
        color: $text-sub-light;
      }
    }
  }
</style>
