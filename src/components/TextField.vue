<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TextField',
    props: {
      value: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: '',
      },
    },
    emits: ['update:value'],
  });
</script>

<template>
  <input
    class="text-field"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .text-field {
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
