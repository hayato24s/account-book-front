<template>
  <!-- 支出・収入 -->
  <Header
    v-show="selectedType === 'Expense' || selectedType === 'Income'"
    :color="themeColor"
  >
    <template #left>
      <HeaderItem
        :font-size="1.6"
        icon-name="arrow_back_ios"
        @click="changeMonth(-1)"
      ></HeaderItem>
    </template>
    <template #center>{{ displayedMonth }}</template>
    <template #right>
      <HeaderItem
        icon-name="arrow_forward_ios"
        @click="changeMonth(1)"
      ></HeaderItem>
    </template>
  </Header>

  <!-- 貯金額 -->
  <Header v-show="selectedType === 'Saving'" :color="themeColor">
    <template #center>貯金額</template>
  </Header>

  <!-- 支出・収入 -->
  <div
    v-show="selectedType === 'Expense' || selectedType === 'Income'"
    class="main"
  >
    <ToggleButton
      v-model:selected="selectedLabel"
      :labels="labels"
      :colors="labelColors"
    ></ToggleButton>
    <div class="main__pie-chart">
      <PieChart
        :labels="PieChartGraphData.labels"
        :data="PieChartGraphData.data"
        :background-color="PieChartGraphData.backgroundColor"
        :total-amount="totalAmount"
        :empty="PieChartGraphData.empty"
      ></PieChart>
    </div>
    <Border color="gray"></Border>
    <SettingField
      right-font-color="normal"
      @click="
        $router.push({ path: '/graph/total', query: { type: selectedType } })
      "
    >
      <template #left>合計</template>
      <template #right>{{ totalAmount.toLocaleString() }}円</template>
    </SettingField>
    <Border color="gray"></Border>
    <div class="main__categories">
      <template v-for="(data, i) in categoryFieldData" :key="data.amount">
        <AutoBorder
          :index="i"
          :length="categoryFieldData.length"
          color="base"
          :option="autoBorderOption"
        >
          <CategoryField
            :key="data.categoryId"
            :category="data.categoryName"
            :category-id="data.categoryId"
            :color="data.categoryColor"
            :amount="data.amount"
            @click="$router.push(`/graph/${data.categoryId}`)"
          ></CategoryField>
        </AutoBorder>
      </template>
    </div>
  </div>

  <!-- 貯金額 -->
  <div v-show="selectedType === 'Saving' || initRendering" class="main">
    <ToggleButton
      v-model:selected="selectedLabel"
      :labels="labels"
      :colors="labelColors"
    ></ToggleButton>
    <div class="main__bar-chart">
      <BarChart
        :selected-month="baseMonth"
        :base-months="barChartGraphData.baseMonths"
        :labels="barChartGraphData.labels"
        :data="barChartGraphData.data"
        :color="barChartColor.base"
        :active-color="barChartColor.active"
      ></BarChart>
    </div>
    <Border color="gray"></Border>
    <div class="main__saving-fields">
      <template v-for="({ year, data }, i) in savingFieldData" :key="year">
        <Border v-if="i !== 0" color="gray"></Border>
        <DateLabel>{{ year }}</DateLabel>
        <Border color="gray"></Border>
        <template v-for="({ month, amount, mom }, j) in data" :key="month">
          <AutoBorder :index="j" :length="data.length">
            <SavingField
              :month="month"
              :amount="amount"
              :mom="mom"
            ></SavingField>
          </AutoBorder>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    ComputedRef,
    defineComponent,
    onMounted,
    ref,
    watchEffect,
  } from 'vue';
  import { Category, Record } from '../../api/@types';
  import AutoBorder, {
    AutoBorderOption,
    createAutoBorderOption,
  } from '../../components/AutoBorder.vue';
  import BarChart from '../../components/BarChart.vue';
  import Border from '../../components/Border.vue';
  import CategoryField from '../../components/CategoryField.vue';
  import DateLabel from '../../components/DateLabel.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import PieChart from '../../components/PieChart.vue';
  import SavingField from '../../components/SavingField.vue';
  import SettingField from '../../components/SettingField.vue';
  import ToggleButton, { Colors } from '../../components/ToggleButton.vue';
  import { makeBarChartData } from '../../entities/barChart';
  import { makeCategoryFieldData } from '../../entities/categoryField';
  import { desaturate, lighten } from '../../entities/color';
  import { addMonth, formatBaseMonth } from '../../entities/date';
  import {
    jaToRecordType,
    RecordTypeJa,
    recordTypeToJa,
  } from '../../entities/record';
  import { makeSavingFieldData } from '../../entities/savingField';
  import { usePorts } from '../../usecases';
  import { getCategories } from '../../usecases/getCategories';
  import { getRecords } from '../../usecases/getRecords';
  import { useGraphBaseMonth } from '../../usecases/useGraphBaseMonth';
  import { useSelectedTypeForGraph } from '../../usecases/useSelectedTypeForGraph';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Graph',
    components: {
      AutoBorder,
      BarChart,
      Border,
      CategoryField,
      DateLabel,
      Header,
      HeaderItem,
      PieChart,
      SavingField,
      SettingField,
      ToggleButton,
    },
    setup() {
      const ports = usePorts();
      const { baseMonth, updateBaseMonth } = useGraphBaseMonth(ports);
      const { selectedType, updateSelectedType } =
        useSelectedTypeForGraph(ports);

      const records: ComputedRef<Record[]> = computed(() =>
        getRecords(ports, {
          baseMonth: baseMonth.value,
        })
      );
      const categories: ComputedRef<Category[]> = computed(() =>
        getCategories(ports)
      );

      // header
      const { themeColor } = useThemeColor(ports);
      const displayedMonth = computed(() =>
        formatBaseMonth('YYYY年MM月', baseMonth.value)
      );
      const changeMonth = (n: number) => {
        updateBaseMonth(addMonth(baseMonth.value, n));
      };

      // toggle-button
      const labels: (RecordTypeJa | '貯金額')[] = ['支出', '収入', '貯金額'];
      const selectedLabel = ref<RecordTypeJa | '貯金額'>(
        selectedType.value === 'Saving'
          ? '貯金額'
          : recordTypeToJa(selectedType.value)
      );
      const labelColors: Colors = {
        color: '#2c3e50',
        selectedColor: '#2c3e50',
        backgroundColor: '#ededed',
        sliderColor: '#fefefe',
      };
      watchEffect(() => {
        updateSelectedType(
          selectedLabel.value === '貯金額'
            ? 'Saving'
            : jaToRecordType(selectedLabel.value)
        );
      });

      // categories
      const categoryFieldData = computed(() =>
        makeCategoryFieldData(
          records.value,
          categories.value,
          selectedType.value === 'Saving' ? 'Expense' : selectedType.value
        )
      );
      const totalAmount = computed(() =>
        categoryFieldData.value.reduce((total, d) => total + d.amount, 0)
      );
      const autoBorderOption: AutoBorderOption = createAutoBorderOption(
        false,
        true,
        true,
        false,
        true,
        true
      );

      // pie-chart
      const PieChartGraphData = computed(() => {
        const length = categoryFieldData.value.length;
        const empty = categoryFieldData.value.every((d) => d.amount === 0);
        return {
          empty,
          labels: categoryFieldData.value.map((d) => d.categoryName),
          data: empty
            ? Array(length).fill(100 / length)
            : categoryFieldData.value.map((d) => d.amount),
          backgroundColor: categoryFieldData.value.map((d) =>
            empty
              ? lighten(desaturate(d.categoryColor, 5), 10)
              : d.categoryColor
          ),
        };
      });

      // bar-chart
      const barChartGraphData = computed(() =>
        makeBarChartData(getRecords(ports), true)
      );
      const barChartColor = {
        base: themeColor.value,
        active: themeColor.value,
      };
      const initRendering = ref(true);

      onMounted(() => (initRendering.value = false));

      // saving-field
      const savingFieldData = computed(() =>
        makeSavingFieldData(barChartGraphData.value)
      );

      return {
        baseMonth,
        themeColor,
        selectedType,
        displayedMonth,
        changeMonth,
        labels,
        selectedLabel,
        labelColors,
        categoryFieldData,
        totalAmount,
        autoBorderOption,
        PieChartGraphData,
        barChartGraphData,
        barChartColor,
        initRendering,
        savingFieldData,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    @include re-calculate-flex-height;
    @include flex-column;

    background: $white;

    &__pie-chart {
      width: 100%;
      height: 30vh;
      padding-bottom: 0.8rem;
    }

    &__categories {
      @include re-calculate-flex-height;
      overflow-y: auto;

      margin-bottom: -1px;
    }

    .toggle-button {
      margin: 0.4rem auto;
    }

    &__bar-chart {
      width: 100%;
      height: 30vh;
    }

    &__saving-fields {
      @include re-calculate-flex-height;

      overflow-y: auto;
      margin-bottom: -1px;
    }
  }
</style>
