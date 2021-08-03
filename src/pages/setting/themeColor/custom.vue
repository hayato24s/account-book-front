<template>
  <Header :color="selectedColor">
    <template #left>
      <HeaderItem
        :font-size="1.6"
        icon-name="arrow_back_ios"
        :size="2"
        @click="$router.back()"
        >戻る</HeaderItem
      >
    </template>
    <template #center>カスタムカラー</template>
  </Header>
  <div class="main">
    <div class="main__color-picker">
      <ColorPicker
        :color="selectedColor"
        :width="20"
        @update:color="updateSelectedColor"
      ></ColorPicker>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ColorPicker from '../../../components/ColorPicker.vue';
  import Header from '../../../components/Header.vue';
  import HeaderItem from '../../../components/HeaderItem.vue';
  import { usePorts } from '../../../usecases';
  import { useSelectedColor } from '../../../usecases/useSelectedColor';

  export default defineComponent({
    name: 'ThemeColorCustom',
    components: {
      ColorPicker,
      Header,
      HeaderItem,
    },
    setup() {
      const ports = usePorts();
      const { selectedColor, updateSelectedColor } = useSelectedColor(ports);

      return {
        selectedColor,
        updateSelectedColor,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    &__color-picker {
      width: min-content;
      margin: 2rem auto 0;
    }
  }
</style>
