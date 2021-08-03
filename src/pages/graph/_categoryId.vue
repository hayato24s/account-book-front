<template>
  <Header :color="category.color" :gradation="false">
    <template #left>
      <HeaderItem
        :font-size="1.6"
        icon-name="arrow_back_ios"
        :size="2"
        @click="$router.back()"
        >戻る</HeaderItem
      >
    </template>
    <template #center>{{ headerTitle }}</template>
  </Header>
  <div class="main">
    <div class="main__bar-chart">
      <BarChart
        v-model:selectedMonth="baseMonth"
        :base-months="graphData.baseMonths"
        :labels="graphData.labels"
        :data="graphData.data"
        :color="barChartColor.base"
        :active-color="barChartColor.active"
        @update:selectedMonth="baseMonth"
      ></BarChart>
    </div>
    <Border color="gray"></Border>
    <div class="main__records">
      <template v-for="(data, i) in displayedRecords" :key="i">
        <Border v-if="i !== 0" color="gray"></Border>
        <DateLabel>{{ data.displayedDate }}</DateLabel>
        <Border color="gray"></Border>
        <template v-for="(record, j) in data.records" :key="record.id">
          <RecordField
            :category="record.category"
            :memo="record.memo"
            :amount="record.amount"
            :type="record.type"
            @click="$router.push(`/record/${record.id}`)"
          ></RecordField>
          <Border
            v-if="data.length !== 1 && j + 1 !== data.length"
            lacking
          ></Border>
        </template>
      </template>
      <Border v-if="displayedRecords.length" color="gray" lacking></Border>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Record } from '../../api/@types';
  import BarChart from '../../components/BarChart.vue';
  import Border from '../../components/Border.vue';
  import DateLabel from '../../components/DateLabel.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import RecordField from '../../components/RecordField.vue';
  import { makeBarChartData } from '../../entities/barChart';
  import { makeRecordFieldData } from '../../entities/recordField';
  import { useDayjs, usePorts } from '../../usecases';
  import { getCategoryById } from '../../usecases/getCategoryById';
  import { getRecords } from '../../usecases/getRecords';
  import { useGraphBaseMonth } from '../../usecases/useGraphBaseMonth';
  import { darken, lighten, saturate } from '../../entities/color';
  import { formatBaseMonth } from '../../entities/date';

  export default defineComponent({
    name: 'GraphDetail',
    components: {
      BarChart,
      Border,
      DateLabel,
      Header,
      HeaderItem,
      RecordField,
    },
    setup() {
      const ports = usePorts();
      const route = useRoute();
      const router = useRouter();
      const categoryId = route.params.categoryId as string;
      const category = getCategoryById(ports, categoryId);
      if (!category) {
        router.back();
        throw new Error("can't find a category matched categoryId.");
      }
      const records: Record[] = getRecords(ports, {
        categoryId,
      });

      // header
      const baseMonth = ref(useGraphBaseMonth(ports).baseMonth.value);
      const thisYear = useDayjs().year();
      const headerTitle = computed(() =>
        formatBaseMonth(
          `${category.name}(${
            baseMonth.value.year !== thisYear ? 'YYYY年' : ''
          }M月)`,
          baseMonth.value
        )
      );

      // records
      const recordsInBaseMonth: ComputedRef<Record[]> = computed(() =>
        records.filter((r) => {
          const date = useDayjs(r.date);
          return (
            date.year() === baseMonth.value.year &&
            date.month() === baseMonth.value.month
          );
        })
      );
      const displayedRecords = computed(() =>
        makeRecordFieldData(recordsInBaseMonth.value)
      );

      // bar-chart
      const graphData = computed(() => makeBarChartData(records));
      const barChartColor = {
        base: lighten(category.color, 5),
        active: darken(saturate(category.color, 15), 15),
      };

      return {
        baseMonth,
        category,
        headerTitle,
        displayedRecords,
        graphData,
        barChartColor,
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

    &__bar-chart {
      width: 100%;
      height: calc(100vh * 0.3);
    }

    &__records {
      flex: 1 1 auto;
      height: 0;

      overflow-y: auto;
      margin-bottom: -1px;
    }
  }
</style>
