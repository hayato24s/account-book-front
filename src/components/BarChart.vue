<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
  } from 'vue';
  import Chart from 'chart.js/auto';
  import { BaseMonth, compareBaseMonth } from '../entities/date';

  export default defineComponent({
    name: 'BarChart',
    props: {
      baseMonths: {
        type: Object as PropType<BaseMonth[]>,
        required: true,
      },
      labels: {
        type: Array as PropType<string[]>,
        required: true,
      },
      data: {
        type: Array as PropType<number[]>,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      activeColor: {
        type: String,
        required: true,
      },
      selectedMonth: {
        type: Object as PropType<BaseMonth>,
        required: true,
      },
    },
    emits: ['update:selectedMonth'],
    setup(props, { emit }) {
      let chart: Chart | null = null;
      const canvasRef = ref<HTMLCanvasElement>();
      // const length = props.labels.length;
      const selectedMonthIndex = computed(() => {
        const i = props.baseMonths.findIndex(
          (b) =>
            b.year === props.selectedMonth.year &&
            b.month === props.selectedMonth.month
        );
        return i !== -1
          ? i
          : compareBaseMonth(props.selectedMonth, props.baseMonths[0]) === -1
          ? -1
          : props.labels.length;
      });
      const backgroundColor = ref(Array(props.labels.length).fill(props.color));
      if (
        selectedMonthIndex.value !== -1 &&
        selectedMonthIndex.value !== props.labels.length
      )
        backgroundColor.value[selectedMonthIndex.value] = props.activeColor;
      const yAxesMax = props.data.reduce((a, b) => (a > b ? a : b)) * 1.2;

      const renderChart = () => {
        const el = document.getElementById('bar-chart');
        if (canvasRef.value == undefined || el == undefined) return;
        const width = el.clientWidth;
        const height = el.clientHeight;

        canvasRef.value.style.width = `${
          (height / 3.6) * props.labels.length
        }px`;
        canvasRef.value.style.height = `${height}px`;

        chart = new Chart(canvasRef.value, {
          type: 'bar',
          data: {
            labels: props.labels,
            datasets: [
              {
                backgroundColor: backgroundColor.value,
                data: props.data.map((n) => (n < 0 ? 0 : n)),
                categoryPercentage: 0.56,
                hoverBackgroundColor: props.activeColor,
              },
            ],
          },
          options: {
            responsive: false,
            datasets: {
              bar: {
                hoverBackgroundColor: props.activeColor,
              },
            },
            layout: {
              padding: {
                bottom: 10,
              },
            },

            scales: {
              xAxes: {
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  font: {
                    size: 10,
                  },
                  color: '#a9a9a9',
                  padding: 0,
                  autoSkip: false,
                  maxRotation: 0,
                },
              },
              yAxes: {
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
                max: yAxesMax === 0 ? undefined : yAxesMax, // 0はダメ
              },
            },
            onClick: (_, el) => {
              if (el.length === 0) return;
              const index = el[0].index;
              emit('update:selectedMonth', props.baseMonths[index]);

              backgroundColor.value = Array(props.labels.length).fill(
                props.color
              );
              backgroundColor.value[index] = props.activeColor;
            },
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                anchor: 'end',
                align: 'end',
                offset: -4,
                color: props.color,
                font: {
                  size: 10,
                },
                formatter(_, context) {
                  return props.data[context.dataIndex].toLocaleString() + '円';
                },
              },
              tooltip: {
                displayColors: false,
              },
            },
          },
        });

        el.scrollLeft = (height / 3.6) * (selectedMonthIndex.value + 1) - width;
      };

      const watchHandler = (newBackgroundColor: string[]) => {
        if (chart) {
          chart.data.datasets[0].backgroundColor = newBackgroundColor;
          chart.update();
        } else {
          renderChart();
        }
      };

      watch(() => backgroundColor.value, watchHandler);

      onMounted(() => renderChart());

      return {
        canvasRef,
      };
    },
  });
</script>

<template>
  <div id="bar-chart">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  #bar-chart {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    background: $white;

    canvas {
      margin: 0 auto;
    }
  }
</style>
