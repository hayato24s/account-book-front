<template>
  <Header :color="themeColor" :left="16.9">
    <template #left>
      <HeaderItem :font-size="1.6" @click="clickCancel">キャンセル</HeaderItem>
    </template>
    <template #center> カテゴリー作成 </template>
  </Header>
  <div class="main">
    <div class="main__form">
      <Border></Border>
      <TextField
        :value="inputCategoryName"
        placeholder="カテゴリー名"
        @update:value="updateInputCategoryName"
      ></TextField>
      <Border lacking></Border>
      <SettingField @click="$router.push('/color')">
        <template #left>グラフの色</template>
        <template #right>
          <ColorBox :color="selectedColor" :size="1.6"></ColorBox>
        </template>
      </SettingField>
      <Border></Border>
    </div>
    <div class="main__save" @click="save">
      <Border></Border>
      <CenterField>保存</CenterField>
      <Border></Border>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Border from '../../components/Border.vue';
  import CenterField from '../../components/CenterField.vue';
  import ColorBox from '../../components/ColorBox.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import SettingField from '../../components/SettingField.vue';
  import TextField from '../../components/TextField.vue';
  import { getInitDefaultColor } from '../../entities/colorBox';
  import { usePorts } from '../../usecases';
  import { addCategoryPriority } from '../../usecases/addCategoryPriority';
  import { createCategory } from '../../usecases/createCategory';
  import { getCategories } from '../../usecases/getCategories';
  import { useInputCategoryName } from '../../usecases/useInputCategoryName';
  import { useSelectedColor } from '../../usecases/useSelectedColor';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    components: {
      Border,
      CenterField,
      ColorBox,
      Header,
      HeaderItem,
      SettingField,
      TextField,
    },
    setup() {
      const ports = usePorts();
      const route = useRoute();
      const router = useRouter();
      const type = route.query.type as string;
      if (type !== 'Expense' && type !== 'Income') {
        router.back();
        throw new Error('invalid type.');
      }
      const reset = ref(false);

      // header
      const { themeColor } = useThemeColor(ports);
      const clickCancel = () => {
        reset.value = true;
        router.back();
      };

      // form
      const categories = getCategories(ports);
      const { inputCategoryName, updateInputCategoryName } =
        useInputCategoryName(ports);
      const { selectedColor, updateSelectedColor } = useSelectedColor(ports);
      if (!inputCategoryName.value) updateInputCategoryName('');
      if (!selectedColor.value)
        updateSelectedColor(getInitDefaultColor(categories));

      // save
      const save = async () => {
        if (!inputCategoryName.value || !selectedColor.value) return;
        const category = await createCategory(ports, {
          type,
          name: inputCategoryName.value,
          color: selectedColor.value,
        });
        addCategoryPriority(ports, category.type, category.id);
        reset.value = true;
        router.back();
      };

      onBeforeUnmount(() => {
        if (!reset.value) return;
        updateInputCategoryName(null);
        updateSelectedColor(null);
      });

      return {
        clickCancel,
        themeColor,
        inputCategoryName,
        updateInputCategoryName,
        selectedColor,
        save,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;

    position: relative;

    &__form {
      margin: 3.2rem 0;
    }
  }
</style>
