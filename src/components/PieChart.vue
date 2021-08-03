<script lang="ts">
  import { defineComponent, PropType, ref, onMounted, watch } from 'vue';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);
  Chart.register(ChartDataLabels);

  type WatchHandlerArg = {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    empty: boolean;
  };

  export default defineComponent({
    name: 'PieChart',
    props: {
      labels: {
        type: Array as PropType<string[]>,
        required: true,
      },
      data: {
        type: Array as PropType<number[]>,
        required: true,
      },
      backgroundColor: {
        type: Array as PropType<string[]>,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      empty: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const canvasRef = ref<HTMLCanvasElement>();
      let chart: Chart | null = null;

      const renderChart = () => {
        if (canvasRef.value == undefined) return;

        chart = new Chart(canvasRef.value, {
          type: 'pie',
          data: {
            labels: props.labels,
            datasets: [
              {
                data: props.data,
                backgroundColor: props.backgroundColor,
                hoverBackgroundColor: props.empty
                  ? props.backgroundColor
                  : undefined,
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '32%',
            animation: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
              datalabels: {
                formatter: function (value, context: any) {
                  return value / props.totalAmount < 0.1
                    ? ''
                    : context.chart.data.labels[context.dataIndex];
                },
                color: '#ffffff',
              },
              tooltip: {
                enabled: !props.empty,
              },
            },
          },
        });
      };

      onMounted(() => renderChart());

      const watchHandler = ({
        labels,
        data,
        backgroundColor,
        empty,
      }: WatchHandlerArg) => {
        if (chart) {
          chart.data.labels = labels;
          chart.data.datasets[0].data = data;
          chart.data.datasets[0].backgroundColor = backgroundColor;
          chart.data.datasets[0].hoverBackgroundColor = empty
            ? props.backgroundColor
            : undefined;
          if (chart.options.plugins?.tooltip) {
            chart.options.plugins.tooltip.enabled = !empty;
          }
          chart.update();
        } else {
          renderChart();
        }
      };

      watch(
        () => ({
          labels: props.labels,
          data: props.data,
          backgroundColor: props.backgroundColor,
          empty: props.empty,
        }),
        watchHandler,
        { deep: true }
      );

      return { canvasRef };
    },
  });
</script>

<template>
  <div class="pie-chart">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  .pie-chart {
    width: 100%;
    height: 100%;
  }
</style>
