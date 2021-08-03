<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import Border, { BorderColor } from '../components/Border.vue';

  export type AutoBorderOption = {
    first: {
      display: boolean;
      lacking: boolean;
    };
    middle: {
      display: boolean;
      lacking: boolean;
    };
    last: {
      display: boolean;
      lacking: boolean;
    };
  };

  export const createAutoBorderOption = (
    firstDisplay: boolean,
    middleDisplay: boolean,
    lastDisplay: boolean,
    firstLacking = false,
    middleLacking = true,
    lastLacking = false
  ): AutoBorderOption => ({
    first: {
      display: firstDisplay,
      lacking: firstLacking,
    },
    middle: {
      display: middleDisplay,
      lacking: middleLacking,
    },
    last: {
      display: lastDisplay,
      lacking: lastLacking,
    },
  });

  export default defineComponent({
    name: 'AutoBorder',
    components: {
      Border,
    },
    props: {
      index: {
        type: Number,
        required: true,
      },
      length: {
        type: Number,
        required: true,
      },
      color: {
        type: String as PropType<BorderColor>,
        default: 'base',
      },
      option: {
        type: Object as PropType<AutoBorderOption>,
        default: createAutoBorderOption(false, true, false),
      },
    },
    setup(props) {
      const topBorder = computed(() => ({
        display: props.index === 0 && props.option.first.display,
        lacking:
          props.index === 0
            ? props.option.first.lacking
            : props.option.middle.lacking,
      }));

      const bottomBorder = computed(() => ({
        display:
          props.index === props.length - 1
            ? props.option.last.display
            : props.option.middle.display,
        lacking:
          props.index === props.length - 1
            ? props.option.last.lacking
            : props.option.middle.lacking,
      }));

      return {
        topBorder,
        bottomBorder,
      };
    },
  });
</script>

<template>
  <div class="auto-border">
    <Border
      v-if="topBorder.display"
      :color="color"
      :lacking="topBorder.lacking"
      class="--first"
    ></Border>
    <slot />
    <Border
      v-if="bottomBorder.display"
      :color="color"
      :lacking="bottomBorder.lacking"
      class="--last"
    ></Border>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .auto-border {
    width: 100%;
    position: relative;

    .border {
      &.--first {
        position: absolute;
        top: 0;
      }
      &.--last {
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
