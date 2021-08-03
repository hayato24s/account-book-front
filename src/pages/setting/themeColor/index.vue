<template>
  <Header :color="themeColor" :left="16.9">
    <template #left>
      <HeaderItem :font-size="1.6" @click="clickCancel">戻る</HeaderItem>
    </template>
    <template #center> テーマカラー </template>
  </Header>
  <div class="main">
    <div class="main__theme-colors">
      <template v-for="(color, i) in defaultThemeColors" :key="color.code">
        <AutoBorder
          :index="i"
          :length="defaultThemeColors.length + 1"
          :option="autoBorderOption"
        >
          <ThemeColorField
            :color="color.code"
            :checked="color.code === selectedColor"
            @click="update(color.code)"
          >
            {{ color.name }}
          </ThemeColorField>
        </AutoBorder>
      </template>
      <AutoBorder
        :index="defaultThemeColors.length"
        :length="defaultThemeColors.length + 1"
        :option="autoBorderOption"
      >
        <ThemeColorField
          color="custom"
          :checked="customed"
          @click="$router.push('/setting/themeColor/custom')"
        >
          カスタム
        </ThemeColorField>
      </AutoBorder>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AutoBorder, {
    createAutoBorderOption,
  } from '../../../components/AutoBorder.vue';
  import Header from '../../../components/Header.vue';
  import HeaderItem from '../../../components/HeaderItem.vue';
  import ThemeColorField from '../../../components/ThemeColorField.vue';
  import { defaultThemeColors } from '../../../entities/themeColor';
  import { usePorts } from '../../../usecases';
  import { useSelectedColor } from '../../../usecases/useSelectedColor';
  import { useThemeColor } from '../../../usecases/useThemeColor';

  export default defineComponent({
    name: 'ThemeColor',
    components: {
      AutoBorder,
      Header,
      HeaderItem,
      ThemeColorField,
    },
    setup() {
      const ports = usePorts();
      const router = useRouter();
      const resetSelectedColor = ref(false);

      // header
      const { themeColor, updateThemeColor, customed } = useThemeColor(ports);
      const clickCancel = () => {
        resetSelectedColor.value = true;
        router.back();
      };

      // colors
      const { selectedColor, updateSelectedColor } = useSelectedColor(ports);
      if (!selectedColor.value) updateSelectedColor(themeColor.value);
      else updateThemeColor(selectedColor.value);
      const update = (color: string) => {
        updateSelectedColor(color);
        if (!selectedColor.value) return;
        updateThemeColor(selectedColor.value);
      };

      const autoBorderOption = createAutoBorderOption(true, true, true);

      onBeforeUnmount(() => {
        if (!resetSelectedColor.value) return;
        updateSelectedColor(null);
      });

      return {
        themeColor,
        customed,
        clickCancel,
        selectedColor,
        defaultThemeColors,
        autoBorderOption,
        update,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;
    height: 0;
    @include flex-column;

    &__theme-colors {
      flex: 1 1 auto;
      height: 0;

      overflow-y: auto;
      margin-top: 3.2rem;
    }
  }
</style>
