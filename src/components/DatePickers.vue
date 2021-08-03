<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'DatePickers',
    props: {
      date: {
        type: String,
        required: true,
      },
    },
    emits: ['update:date'],
  });
</script>

<template>
  <div class="date-pickers">
    <label for="date" class="date-pickers__label"> 日付 </label>
    <input
      id="date"
      type="date"
      :value="date"
      class="date-pickers__input"
      min="2001-01-01"
      max="2100-12-31"
      @input="$emit('update:date', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .date-pickers {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: 3.6rem;
    background: $white;

    &__label {
      padding: 0 1.2rem;
      flex: 1;
      line-height: 3.6rem;
    }
    &__input {
      // reset
      border: none;
      outline: none;
      padding: 0;

      padding-right: 1.2rem;
      color: $text-sub;
      background: $white;
      font-size: $font-medium;

      &::-webkit-calendar-picker-indicator {
        margin-left: 0.4rem;
      }
    }
  }
</style>
