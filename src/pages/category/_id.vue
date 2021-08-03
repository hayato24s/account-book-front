<template>
  <Header :color="themeColor" :left="16.9">
    <template #left>
      <HeaderItem :font-size="1.6" @click="clickCancel">キャンセル</HeaderItem>
    </template>
    <template #center> カテゴリー編集 </template>
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
      <CenterField @click="save">保存</CenterField>
      <Border></Border>
    </div>
    <div class="main__delete">
      <Border></Border>
      <CenterField color="red" @click="modal = true"
        >このカテゴリーを削除</CenterField
      >
      <Border></Border>
    </div>
    <Modal
      v-if="modal"
      @click:left-btn="modal = false"
      @click:right-btn="removeCategory"
    >
      <template #title>カテゴリー削除</template>
      <template #contents
        >関連する支出・収入も削除されます。<br />本当に削除して宜しいでしょうか？</template
      >
      <template #left-btn>キャンセル</template>
      <template #right-btn>削除</template>
    </Modal>
    <GrayFilter v-if="modal" @click="modal = false"></GrayFilter>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Border from '../../components/Border.vue';
  import CenterField from '../../components/CenterField.vue';
  import ColorBox from '../../components/ColorBox.vue';
  import GrayFilter from '../../components/GrayFilter.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import Modal from '../../components/Modal.vue';
  import SettingField from '../../components/SettingField.vue';
  import TextField from '../../components/TextField.vue';
  import { usePorts } from '../../usecases';
  import { deleteCategory } from '../../usecases/deleteCategory';
  import { deleteCategoryPriority } from '../../usecases/deleteCategoryPriority';
  import { getCategoryById } from '../../usecases/getCategoryById';
  import { updateCategory } from '../../usecases/updateCategory';
  import { useInputCategoryName } from '../../usecases/useInputCategoryName';
  import { useSelectedColor } from '../../usecases/useSelectedColor';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    components: {
      Border,
      CenterField,
      ColorBox,
      GrayFilter,
      Header,
      HeaderItem,
      Modal,
      SettingField,
      TextField,
    },
    setup() {
      const ports = usePorts();
      const route = useRoute();
      const router = useRouter();
      const id = route.params.id as string;
      const category = getCategoryById(ports, id);
      if (!category) {
        router.back();
        throw new Error("can't find category matched given id.");
      }
      const reset = ref(false);

      // header
      const { themeColor } = useThemeColor(ports);
      const clickCancel = () => {
        reset.value = true;
        router.back();
      };

      // form
      const { inputCategoryName, updateInputCategoryName } =
        useInputCategoryName(ports);
      const { selectedColor, updateSelectedColor } = useSelectedColor(ports);
      if (!inputCategoryName.value) updateInputCategoryName(category.name);
      if (!selectedColor.value) updateSelectedColor(category.color);

      // modal
      const modal = ref(false);

      const save = async () => {
        if (!inputCategoryName.value || !selectedColor.value) return;
        await updateCategory(ports, id, {
          type: category.type,
          name: inputCategoryName.value,
          color: selectedColor.value,
        });
        reset.value = true;
        router.back();
      };

      const removeCategory = async () => {
        modal.value = false;
        await deleteCategory(ports, id);
        deleteCategoryPriority(ports, category.type, id);
        reset.value = true;
        router.back();
      };

      onBeforeUnmount(() => {
        if (!reset.value) return;
        updateInputCategoryName(null);
        updateSelectedColor(null);
      });

      return {
        themeColor,
        clickCancel,
        inputCategoryName,
        updateInputCategoryName,
        selectedColor,
        modal,
        save,
        removeCategory,
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

    &__delete {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
</style>
