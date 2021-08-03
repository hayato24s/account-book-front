<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    reactive,
  } from 'vue';
  import { HSV, hsv2hex } from '../entities/color';

  type Pos = {
    x: number;
    y: number;
  };
  const calcDistance = (a: Pos, b: Pos): number => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  };
  const mod = (a: number, b: number): number => ((a % b) + b) % b;
  const adjustEvent = (e: MouseEvent | TouchEvent): MouseEvent | Touch => {
    return e.type.slice(0, 5) === 'mouse'
      ? (e as MouseEvent)
      : (e as TouchEvent).changedTouches[0];
  };
  export const selectBorderColor = (color: HSV): 'dark' | 'light' => {
    return color.S <= 50 && color.V >= 60 ? 'dark' : 'light';
  };

  export default defineComponent({
    name: 'ColorWheel',
    props: {
      color: {
        type: Object as PropType<HSV>,
        required: true,
      },
      length: {
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
      const R = props.length / 2 - props.borderWidth;
      const centerPos: Pos = {
        x: R,
        y: R,
      };

      let startPosition: (Pos & { pageX: number; pageY: number }) | null = null;

      const colorToPos = (color: HSV): Pos => {
        const r = R * (color.S / 100);
        const theta = (color.H * Math.PI) / 180; // ラジアン
        return {
          x: R + r * Math.cos(theta),
          y: R + r * Math.sin(2 * Math.PI - theta),
        };
      };

      const posToColor = (pos: Pos): HSV => {
        const r = calcDistance(pos, centerPos);
        const theta = Math.atan2(-(pos.y - centerPos.y), pos.x - centerPos.y);
        return {
          H: mod((theta * 180) / Math.PI, 360), // 度
          S: (r / R) * 100,
          V: props.color.V,
        };
      };

      const cursor = reactive<Pos>(colorToPos(props.color));

      const mouseDown = (e: MouseEvent | TouchEvent) => {
        const event = adjustEvent(e);
        startPosition = {
          x: cursor.x,
          y: cursor.y,
          pageX: event.pageX,
          pageY: event.pageY,
        };
        document.body.addEventListener('mousemove', mouseMove, false);
        document.body.addEventListener('touchmove', mouseMove, false);
        e.preventDefault();
      };

      const mouseMove = (e: MouseEvent | TouchEvent) => {
        if (!startPosition) return;
        const event = adjustEvent(e);
        const newPos = {
          x: event.pageX - startPosition.pageX + startPosition.x,
          y: event.pageY - startPosition.pageY + startPosition.y,
        };
        const r = calcDistance(newPos, centerPos);
        if (r <= R) {
          cursor.x = newPos.x;
          cursor.y = newPos.y;
        } else {
          const theta = Math.atan2(
            newPos.y - centerPos.y,
            newPos.x - centerPos.x
          );
          cursor.x = centerPos.x + R * Math.cos(theta);
          cursor.y = centerPos.y + R * Math.sin(theta);
        }
        emit('update:color', posToColor(cursor));
      };

      const mouseUp = () => {
        startPosition = null;
        document.body.removeEventListener('mousemove', mouseMove);
        document.body.removeEventListener('touchmove', mouseMove);
      };

      const style = computed(() => ({
        width: `${props.length}px`,
        height: `${props.length}px`,
        border: `solid ${props.borderWidth}px ${props.borderColor}`,
      }));

      const lightnessStyle = computed(() => ({
        opacity: 1 - props.color.V / 100,
      }));

      const cursorStyle = computed(() => ({
        left: `${cursor.x}px`,
        top: `${cursor.y}px`,
        background: hsv2hex(props.color),
        border: `solid 1px ${
          selectBorderColor(props.color) === 'dark' ? 'black' : '#f5f5f5'
        }`,
      }));

      onMounted(() => {
        document.body.addEventListener('mouseup', mouseUp, false);
        document.body.addEventListener('touchend', mouseUp, false);
      });

      return {
        mouseDown,
        style,
        lightnessStyle,
        cursorStyle,
      };
    },
  });
</script>

<template>
  <div class="color-wheel" :style="style">
    <div class="color-wheel__hue"></div>
    <div class="color-wheel__saturation"></div>
    <div class="color-wheel__lightness" :style="lightnessStyle"></div>
    <div
      class="color-wheel__cursor"
      :style="cursorStyle"
      @mousedown="mouseDown"
      @touchstart="mouseDown"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
  .color-wheel {
    position: relative;
    box-sizing: border-box;
    border-radius: 50%;
    user-select: none;

    &__hue,
    &__saturation,
    &__lightness,
    &__border {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      border-radius: 50%;
    }

    &__hue {
      transform: rotateZ(90deg);
      background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red);
    }

    &__saturation {
      background: radial-gradient(circle closest-side, #fff, transparent);
    }

    &__lightness {
      background: #000;
    }

    &__cursor {
      width: 2rem;
      height: 2rem;

      position: absolute;
      transform: translate(-50%, -50%);

      border-radius: 50%;
      box-shadow: 0 2px 4px 1px #999999;
      cursor: pointer;
    }
  }
</style>
