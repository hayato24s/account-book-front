<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export type ToastType =
    | 'warning-amount'
    | 'success-saving'
    | 'warning-category';

  const toastInfoMap: Record<ToastType, { icon: string; text: string }> = {
    'warning-amount': { icon: 'clear', text: '金額を入力して下さい' },
    'warning-category': { icon: 'clear', text: 'カテゴリーを選択して下さい' },
    'success-saving': { icon: 'check', text: '保存しました' },
  };

  export default defineComponent({
    name: 'Toast',
    props: {
      type: {
        type: String as PropType<ToastType>,
        required: true,
      },
    },
    setup(props) {
      const icon = toastInfoMap[props.type].icon;
      const text = toastInfoMap[props.type].text;

      return {
        icon,
        text,
      };
    },
  });
</script>

<template>
  <div class="toast">
    <div class="toast__icons material-icons">{{ icon }}</div>
    <div class="toast__text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .toast {
    @include center-absolute;
    top: 42%;
    padding: 0.8rem 1.2rem 1.2rem;
    background: #000000bb;
    color: $text-white-sub;
    border-radius: 0.8rem;
  }

  .toast {
    &__icons {
      width: 100%;
      text-align: center;
      font-size: 4rem;
      margin-bottom: 0.4rem;
    }

    &__text {
      font-size: $font-small;
    }
  }
</style>
