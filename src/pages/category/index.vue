<template>
  <Header :color="themeColor" :left="12.7">
    <template #left>
      <HeaderItem :font-size="1.6" @click="$router.back()">閉じる</HeaderItem>
    </template>
    <template #center> カテゴリー編集 </template>
  </Header>
  <div class="main">
    <div class="main__explain">右端をドラッグで並び替え↓</div>
    <div class="main__drag-and-drop">
      <DragAndDrop
        :data="categoryEditFieldData"
        draggable-element="category-edit-field__drag"
        @update:data="update"
      >
        <template #default="{ item, index }">
          <AutoBorder
            :key="index"
            :index="index"
            :length="categoryEditFieldData.length"
            color="base"
            :option="autoBorderOption"
          >
            <CategoryEditField @click="$router.push(`/category/${item.id}`)">
              {{ item.name }}
            </CategoryEditField>
          </AutoBorder>
        </template>
      </DragAndDrop>
    </div>
    <div class="main__add">
      <Border></Border>
      <CenterField
        @click="
          $router.push({ path: '/category/add', query: { type: recordType } })
        "
        >カテゴリー追加</CenterField
      >
      <Border></Border>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { RecordType } from '../../api/@types';
  import AutoBorder, {
    AutoBorderOption,
    createAutoBorderOption,
  } from '../../components/AutoBorder.vue';
  import Border from '../../components/Border.vue';
  import CategoryEditField from '../../components/CategoryEditField.vue';
  import CenterField from '../../components/CenterField.vue';
  import DragAndDrop, {
    Data as CategoryEditFieldData,
  } from '../../components/DragAndDrop.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import { usePorts } from '../../usecases';
  import { getCategories } from '../../usecases/getCategories';
  import { sortCategoryByPriority } from '../../usecases/sortCategoryByPriority';
  import { updateCategoryPriority } from '../../usecases/updateCategoryPriority';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    components: {
      AutoBorder,
      Border,
      CategoryEditField,
      CenterField,
      DragAndDrop,
      Header,
      HeaderItem,
    },
    setup() {
      const ports = usePorts();
      const route = useRoute();
      const router = useRouter();
      const { themeColor } = useThemeColor(ports);
      const recordType = route.query.type;
      if (recordType !== 'Expense' && recordType !== 'Income') {
        router.back();
        throw new Error('Invalid type');
      }
      const categories = getCategories(ports, recordType);
      const categoryEditFieldData = ref<CategoryEditFieldData[]>(
        categories.map((c) => ({
          id: c.id,
          name: c.name,
        }))
      );

      // categories
      const update = (data: CategoryEditFieldData[]) => {
        if (
          JSON.stringify(categoryEditFieldData.value) === JSON.stringify(data)
        )
          return;
        categoryEditFieldData.value = data;
        const priority = data.map((d) => d.id);
        updateCategoryPriority(ports, recordType, priority);
        sortCategoryByPriority(ports, recordType);
      };
      const autoBorderOption: AutoBorderOption = createAutoBorderOption(
        true,
        true,
        true
      );

      return {
        themeColor,
        recordType,
        categoryEditFieldData,
        update,
        autoBorderOption,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    @include re-calculate-flex-height;
    @include flex-column;
    overflow-y: auto;

    position: relative;

    &__explain {
      position: absolute;
      top: 2rem;
      right: 1.6rem;
      transform: translateY(-50%);
      color: $text-sub;
      font-size: $font-small;
      user-select: none;
    }

    &__drag-and-drop {
      margin-top: 4rem;
    }

    &__add {
      margin: 3.2rem 0;
    }
  }
</style>
