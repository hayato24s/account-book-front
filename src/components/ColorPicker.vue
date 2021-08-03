<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ColorSlider from './ColorSlider.vue';
  import ColorWheel from './ColorWheel.vue';
  import { hex2hsv, HSV, hsv2hex } from '../entities/color';

  export default defineComponent({
    name: 'ColorPicker',
    components: {
      ColorSlider,
      ColorWheel,
    },
    props: {
      color: {
        type: String,
        required: true,
      },
    },
    emits: ['update:color'],
    setup(props, { emit }) {
      const color = ref(props.color);
      const hsvColor = ref(hex2hsv(color.value));
      const updateColor = (hsvColor: HSV) => {
        emit('update:color', hsv2hex(hsvColor));
      };

      return {
        color,
        hsvColor,
        updateColor,
      };
    },
  });
</script>

<template>
  <div class="color-picker">
    <div class="color-picker__wheel">
      <ColorWheel
        v-model:color="hsvColor"
        :length="200"
        :border-width="4"
        @update:color="updateColor"
      ></ColorWheel>
    </div>
    <div class="color-picker__slider">
      <ColorSlider
        v-model:color="hsvColor"
        :height="200"
        :border-width="4"
        @update:color="updateColor"
      ></ColorSlider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .color-picker {
    display: flex;
    gap: 2rem;
  }
</style>
