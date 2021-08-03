<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { DisplayedRecord } from '../entities/record';

  type Day = {
    day: number;
    income: number;
    expense: number;
    notThisMonth: boolean;
    today: boolean;
    records: DisplayedRecord[];
  };

  type CustomProp = {
    '--today-color': string;
  };

  export default defineComponent({
    name: 'Calendar',
    props: {
      year: {
        type: Number,
        required: true,
      },
      month: {
        type: Number, // 0 ~ 11
        required: true,
      },
      recordData: {
        type: Array as PropType<{ date: Dayjs; records: DisplayedRecord[] }[]>, // 指定されたyearとmonthを持つrecord
        required: true,
      },
      todayColor: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const today = dayjs();
      const week = ['日', '月', '火', '水', '木', '金', '土'];
      const start = computed(() =>
        dayjs().year(props.year).month(props.month).startOf('month')
      );
      const end = computed(() => start.value.endOf('month'));
      const weeks = computed(() =>
        Math.ceil((start.value.day() + end.value.date()) / 7)
      );

      const calendar: ComputedRef<Day[][]> = computed(() => {
        let dayCount = 0;
        let lastMonthDay =
          start.value.subtract(1, 'day').date() - start.value.day();
        let nextMonthDay = 0;

        const car: Day[][] = [];
        for (let i = 0; i < weeks.value; i++) {
          const row: Day[] = [];
          for (let j = 0; j < 7; j++) {
            if (i === 0 && j < start.value.day()) {
              row.push({
                day: ++lastMonthDay,
                income: 0,
                expense: 0,
                notThisMonth: true,
                today: false,
                records: [],
              });
            } else if (end.value.date() <= dayCount) {
              row.push({
                day: ++nextMonthDay,
                income: 0,
                expense: 0,
                notThisMonth: true,
                today: false,
                records: [],
              });
            } else {
              const recordData = props.recordData.find(
                (d) => d.date.date() === dayCount + 1
              );
              const income =
                recordData?.records
                  .filter((r) => r.type === 'Income')
                  .reduce((amount, r) => {
                    amount += r.amount;
                    return amount;
                  }, 0) ?? 0;
              const expense =
                recordData?.records
                  .filter((r) => r.type === 'Expense')
                  .reduce((amount, r) => {
                    amount += r.amount;
                    return amount;
                  }, 0) ?? 0;
              row.push({
                day: ++dayCount,
                income,
                expense,
                notThisMonth: false,
                today:
                  props.year === today.year() &&
                  props.month === today.month() &&
                  dayCount === today.date(),
                records: recordData?.records ?? [],
              });
            }
          }
          car.push(row);
        }
        return car;
      });

      const clickHandler = (day: number, records: DisplayedRecord[]) => {
        console.log(`${props.year}-${props.month}-${('00' + day).slice(-2)}`);
        console.log(records);
      };

      const style: CustomProp = { '--today-color': props.todayColor };

      return { calendar, week, weeks, clickHandler, style };
    },
  });
</script>

<template>
  <div
    class="calendar"
    :style="{ gridTemplateRows: `auto repeat(${weeks}, 1fr)` }"
  >
    <div
      v-for="(day, i) in week"
      :key="i"
      :class="{ cell: true, '--sunday': i === 0, '--saturday': i === 6 }"
    >
      {{ day }}
    </div>
    <template v-for="(row, i) in calendar" :key="i">
      <div
        v-for="(d, j) in row"
        :key="j"
        :class="{
          calendar__cell: true,
          cell: true,
          '--sunday': j % 7 === 0,
          '--saturday': j % 7 === 6,
          '--not-this-month': d.notThisMonth,
        }"
        :style="style"
        @click="clickHandler(d.day, d.records)"
      >
        <div :class="{ cell__day: true, '--today': d.today }">{{ d.day }}</div>
        <div class="cell__amount amount">
          <div class="amount__income">
            {{ d.income === 0 ? '' : `${d.income.toLocaleString()}円` }}
          </div>
          <div class="amount__expense">
            {{ d.expense === 0 ? '' : `${d.expense.toLocaleString()}円` }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main';

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
    padding: 1px;

    background: $border-calendar;
    user-select: none;
    font-size: $font-x-small;
    font-weight: 300;

    width: 100%;
    height: 100%;
  }

  .cell {
    // --today-color;

    position: relative;
    background: $white;
    text-align: center;

    &.--sunday {
      color: $text-sun;
    }

    &.--saturday {
      color: $text-sat;
    }

    &.--not-this-month {
      color: $text-sub;
      background: $base;
    }

    &__day {
      position: absolute;
      top: -0.2rem;
      left: -0.2rem;
      transform: scale(0.9);
      padding: 0.2rem;

      &.--today {
        background: var(--today-color);
        color: $text-white;
      }
    }

    &__amount {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .amount {
      font-size: $font-x-small;
      transform: scale(0.9);
      text-align: right;

      &__income {
        height: 1rem;
        color: $text-blue-light;
        margin-bottom: 0.1rem;
      }

      &__expense {
        height: 1rem;
        color: $text-red;
      }
    }
  }
</style>
