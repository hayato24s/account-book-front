<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import NavigationItem from './NavigationItem.vue';

  type ItemInfo = {
    page: string;
    value: string;
    iconName: string;
  }[];

  export default defineComponent({
    name: 'Navigation',
    components: {
      NavigationItem,
    },
    props: {
      activeColor: {
        type: String,
        required: true,
      },
    },
    emits: ['click'],
    setup() {
      const route = useRoute();
      const currentPage = computed(() => route.path.replace('/', ''));

      const itemInfo: ItemInfo = [
        { page: 'record/add', value: '入力', iconName: 'edit' },
        { page: 'record', value: 'カレンダー', iconName: 'event_note' },
        { page: 'graph', value: 'グラフ', iconName: 'pie_chart' },
        { page: 'setting', value: '設定', iconName: 'settings' },
      ];

      return { itemInfo, currentPage };
    },
  });
</script>

<template>
  <div class="navigation">
    <NavigationItem
      v-for="data in itemInfo"
      :key="data.page"
      :icon-name="data.iconName"
      :active-color="activeColor"
      :is-active="data.page === currentPage"
      @click="$router.push(`/${data.page}`)"
      >{{ data.value }}</NavigationItem
    >
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .navigation {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border: solid $border-gray;
    border-width: 0.1rem 0;
    z-index: 1;
  }
</style>
