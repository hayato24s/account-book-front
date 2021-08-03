<script lang="ts">
  import { defineComponent } from 'vue';

  type CustomProp = {
    '--active-color': string;
  };

  export default defineComponent({
    name: 'NavigationItem',
    props: {
      iconName: {
        type: String,
        required: true,
      },
      activeColor: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['click'],
    setup(props) {
      const style: CustomProp = {
        '--active-color': props.activeColor,
      };

      return { style };
    },
  });
</script>

<template>
  <div
    :class="{ 'navigation-item': true, '--active': isActive }"
    :style="style"
    @click="$emit('click')"
  >
    <div class="navigation-item__icon material-icons">
      {{ iconName }}
    </div>
    <div class="navigation-item__name">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .navigation-item {
    // --active-color

    @include flex-column;
    align-items: center;
    width: 5rem;
    padding: 0.4rem 0;
    color: $text-icon;
    &.--active {
      color: var(--active-color);
    }
    @include button-cursor;

    &__icon {
      font-size: 3.2rem;
    }

    &__name {
      font-size: $font-x-small;
    }
  }
</style>
