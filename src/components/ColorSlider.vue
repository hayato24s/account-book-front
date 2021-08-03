<script lang="ts">
  import { computed, defineComponent, onMounted, PropType } from 'vue';
  import { HSV, hsv2hex } from '../entities/color';
  import { selectBorderColor } from './ColorWheel.vue';

  const divideColor = (color: HSV): string[] => {
    const colors: string[] = [];
    for (var i = 100; i >= 0; i -= 5) {
      colors.push(
        hsv2hex({
          H: color.H,
          S: color.S,
          V: i,
        })
      );
    }
    return colors;
  };

  export default defineComponent({
    name: 'ColorSlider',
    props: {
      color: {
        type: Object as PropType<HSV>,
        required: true,
      },
      height: {
        type: Number, // px
        required: true,
      },
      borderWidth: {
        type: Number, // px
        default: 0,
      },
      borderColor: {
        type: String,
        default: '#eaeaea',
      },
    },
    emits: ['update:color'],
    setup(props, { emit }) {
      const colorName = computed(() => hsv2hex(props.color));
      const colors = computed(() => divideColor(props.color));
      let el: HTMLElement | null;

      const contentsStyle = computed(() => ({
        left: `${19 - props.borderWidth}px`,
      }));

      const containerStyle = computed(() => ({
        border: `solid ${props.borderWidth}px ${props.borderColor}`,
      }));

      const nameStyle = computed(() => ({
        border: `solid 1px ${
          selectBorderColor(props.color) === 'dark' ? 'black' : '#f5f5f5'
        }`,
        background: colorName.value,
        color: `${
          selectBorderColor(props.color) === 'dark' ? 'black' : '#f5f5f5'
        }`,
      }));

      const getBrightness = () => {
        if (!el) return;
        const brightness = Math.round(100 - (el.scrollTop / 420) * 100);
        emit('update:color', { ...props.color, V: brightness });
      };

      onMounted(() => {
        el = document.getElementById('brightness');
        if (!el) return;
        el.scrollTop = ((100 - props.color.V) / 100) * 420;
      });

      return {
        colorName,
        colors,
        contentsStyle,
        containerStyle,
        nameStyle,
        getBrightness,
      };
    },
  });
</script>

<template>
  <div class="color-slider" :style="{ height: `${height}px` }">
    <div class="color-slider__name" :style="nameStyle">{{ colorName }}</div>
    <div
      id="brightness"
      class="color-slider__contents"
      :style="contentsStyle"
      @scroll="getBrightness"
    >
      <div
        class="color-slider__padding"
        :style="{ height: `${height / 2 - borderWidth}px` }"
      />
      <div class="color-slider__container" :style="containerStyle">
        <div
          v-for="c in colors"
          :key="c"
          class="color-slider__flat-box"
          :style="{ background: c }"
        ></div>
      </div>
      <div
        class="color-slider__padding"
        :style="{ height: `${height / 2 - borderWidth}px` }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .color-slider {
    width: 66px;
    position: relative;
    overflow: hidden;
    user-select: none;

    &__name {
      width: 56px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: $font-x-small;
      z-index: 1;
      border-radius: 4px;
      box-shadow: 0 2px 4px 1px #999999;
    }

    &__contents {
      position: absolute;
      top: 0;
      bottom: 0;
      padding-right: 30px;
      overflow-y: scroll;
    }

    &__padding {
      width: 100%;
    }

    &__container {
      border-radius: 4px;
    }

    &__flat-box {
      width: 28px;
      height: 20px;
    }
  }
</style>
