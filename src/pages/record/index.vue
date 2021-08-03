<template>
  <Header :color="themeColor">
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
  <div class="main">
    <div class="main__calendar">
      <Calendar
        :year="baseMonth.year"
        :month="baseMonth.month"
        :record-data="recordDataForCalendar"
        :today-color="todayColor"
      ></Calendar>
    </div>
    <div class="main__bop">
      <BOP :expense="expense" :income="income"></BOP>
      <Border color="gray"></Border>
    </div>
    <div class="main__records">
      <template v-for="(data, i) in recordFieldData" :key="i">
        <Border v-if="i !== 0" color="gray"></Border>
        <DateLabel>{{ data.displayedDate }}</DateLabel>
        <Border color="gray"></Border>
        <template v-for="(record, j) in data.records" :key="record.id">
          <AutoBorder :index="j" :length="data.records.length">
            <RecordField
              :category="record.category"
              :memo="record.memo"
              :amount="record.amount"
              :type="record.type"
              @click="$router.push(`/record/${record.id}`)"
            ></RecordField>
          </AutoBorder>
        </template>
      </template>
      <Border v-if="recordFieldData.length" color="gray" lacking></Border>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent } from 'vue';
  import { Record } from '../../api/@types';
  import AutoBorder from '../../components/AutoBorder.vue';
  import Border from '../../components/Border.vue';
  import BOP from '../../components/BOP.vue';
  import Calendar from '../../components/Calendar.vue';
  import DateLabel from '../../components/DateLabel.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import RecordField from '../../components/RecordField.vue';
  import { darken } from '../../entities/color';
  import { addMonth, formatBaseMonth } from '../../entities/date';
  import { usePorts } from '../../usecases';
  import { getRecords } from '../../usecases/getRecords';
  import { useCalendarBaseMonth } from '../../usecases/useCalendarBaseMonth';
  import { useThemeColor } from '../../usecases/useThemeColor';
  import { makeRecordFieldData } from '../../entities/recordField';

  export default defineComponent({
    name: 'Record',
    components: {
      AutoBorder,
      Border,
      BOP,
      Calendar,
      DateLabel,
      Header,
      HeaderItem,
      RecordField,
    },
    setup() {
      const ports = usePorts();
      const { baseMonth, updateBaseMonth } = useCalendarBaseMonth(ports);
      const records: ComputedRef<Record[]> = computed(() =>
        getRecords(ports, {
          baseMonth: baseMonth.value,
        })
      );

      // header
      const { themeColor } = useThemeColor(ports);
      const displayedMonth = computed(() =>
        formatBaseMonth('YYYY年MM月', baseMonth.value)
      );
      const changeMonth = (n: number) => {
        updateBaseMonth(addMonth(baseMonth.value, n));
      };

      // bop
      const expense = computed(() =>
        records.value
          .filter((r) => r.type === 'Expense')
          .reduce((amount, r) => amount + r.amount, 0)
      );
      const income = computed(() =>
        records.value
          .filter((r) => r.type === 'Income')
          .reduce((amount, r) => amount + r.amount, 0)
      );

      // records
      const recordFieldData = computed(() =>
        makeRecordFieldData(records.value)
      );

      // calendar
      const recordDataForCalendar = computed(() =>
        recordFieldData.value.map((r) => ({
          date: r.date,
          records: r.records,
        }))
      );
      const todayColor = darken(themeColor.value, 5);

      return {
        baseMonth,
        themeColor,
        displayedMonth,
        changeMonth,
        expense,
        income,
        recordFieldData,
        recordDataForCalendar,
        todayColor,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;
    height: 0;

    display: flex;
    flex-direction: column;

    &__calendar {
      height: 30vh;
    }

    &__records {
      flex: 1 1 auto;
      height: 0;
      overflow-y: auto;

      background: $white;
      margin-bottom: -1px;
    }
  }
</style>
