<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import SelectItem from '../components/SelectItem.vue';
  import AutoBorder, {
    createAutoBorderOption,
    AutoBorderOption,
  } from '../components/AutoBorder.vue';
  import Border from '../components/Border.vue';

  export type Option = {
    id: string;
  } & Record<string, any>;

  export default defineComponent({
    name: 'SelectModal',
    components: {
      AutoBorder,
      Border,
      SelectItem,
    },
    props: {
      options: {
        type: Object as PropType<Option[]>,
        required: true,
      },
      selectedOption: {
        type: Object as PropType<Option>,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
    emits: ['update:selectedOption', 'click:left', 'click:right'],
    setup() {
      const autoBorderOption: AutoBorderOption = createAutoBorderOption(
        false,
        true,
        false,
        false,
        false,
        false
      );

      return {
        autoBorderOption,
      };
    },
  });
</script>

<template>
  <div class="select-modal">
    <div class="select-modal__header header" :style="{ color: color }">
      <div class="header__left" @click="$emit('click:left')">
        <slot name="left"></slot>
      </div>
      <div class="header__right" @click="$emit('click:right')">
        <slot name="header-right"></slot>
      </div>
    </div>
    <Border color="gray" :lacking="false"></Border>
    <div class="select-modal__options">
      <template v-for="(option, i) in options" :key="option.id">
        <AutoBorder
          :length="options.length"
          :index="i"
          :option="autoBorderOption"
        >
          <SelectItem
            :selected="option.id === selectedOption.id"
            @click="$emit('update:selectedOption', option)"
          >
            <slot :option="option"></slot>
          </SelectItem>
        </AutoBorder>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .select-modal {
    width: 80%;
    max-width: 300px;
    max-height: 70vh;
    @include center-fixed;
    z-index: 30;

    @include flex-column;

    &__header {
      border-radius: 0.4rem 0.4rem 0 0;
    }

    &__options {
      overflow-y: auto;
      border-radius: 0 0 0.4rem 0.4rem;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    @include height-and-line-height(2.4rem);
    padding: 0 1.2rem;
    background: $gray;
    font-size: $font-small;

    &__left,
    &__right {
      @include button-cursor;
    }
  }
</style>
