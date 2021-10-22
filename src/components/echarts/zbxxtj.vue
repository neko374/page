<template>
  <div id="main4" class="home_chart_block3" ref="mainfour"></div>
</template>

<script>
import echartsTheme from "../../json/echartsdata.json";
export default {
  data() {
    return { chart: null };
  }, //图表实例
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.chart = this.$echarts.init(this.$refs.mainfour);
      const option4 = {
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["装备"],
          padding: [0, 30, 0, 0],
          x: "right", //图例在x方向的位置
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: echartsTheme.singleX,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "装备",
            type: "line",
            symbolSize: 10,
            areaStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2898aa" },
                  { offset: 0.5, color: "#c8e7ec" },
                  { offset: 1, color: "#fff" },
                ]),
              },
            },

            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 0, 0],
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2ea6eb",
                  },
                  {
                    offset: 1,
                    color: "#5eb5e7",
                  },
                ]),
              },
            },

            data: echartsTheme.singleY,
          },
        ],
      };
      this.chart.setOption(option4, true);
    },
  },
};
</script>

<style>
</style>