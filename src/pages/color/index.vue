<template>
  <Header :color="themeColor">
    <template #left>
      <HeaderItem
        :font-size="1.6"
        icon-name="arrow_back_ios"
        :size="2"
        @click="$router.back()"
        >戻る</HeaderItem
      >
    </template>
    <template #center>色選択</template>
  </Header>
  <div class="main">
    <div class="main__colors">
      <template v-for="data in colorBoxData" :key="data.color">
        <ColorBox
          :color="data.color"
          :checked="
            selectedColor === data.color ? true : data.used ? false : null
          "
          @click="updateSelectedColor(data.color)"
        ></ColorBox>
      </template>
      <ColorBox
        color="custom"
        :checked="customed ? true : null"
        @click="$router.push('/color/custom')"
      ></ColorBox>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ColorBox from '../../components/ColorBox.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import { makeColorBoxData } from '../../entities/colorBox';
  import { usePorts } from '../../usecases';
  import { getCategories } from '../../usecases/getCategories';
  import { useSelectedColor } from '../../usecases/useSelectedColor';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Color',
    components: {
      ColorBox,
      Header,
      HeaderItem,
    },
    setup() {
      const ports = usePorts();

      // header
      const { themeColor } = useThemeColor(ports);

      // color-box
      const categories = getCategories(ports);
      const colorBoxData = ref(makeColorBoxData(categories));
      const { selectedColor, updateSelectedColor, customed } =
        useSelectedColor(ports);

      return {
        themeColor,
        colorBoxData,
        selectedColor,
        updateSelectedColor,
        customed,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    &__colors {
      padding-top: 3.2rem;

      display: grid;
      grid-template-columns: repeat(4, auto);
      row-gap: 2.4rem;
      column-gap: 3.2rem;
      justify-content: center;
    }
  }
</style>
