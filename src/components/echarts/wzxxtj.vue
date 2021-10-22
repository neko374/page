<template>
 <div id="main5" class="home_chart_block3" ref="mainfive"></div>
</template>

<script>
export default {
    data() {
    return { chart: null };
    
  }, //图表实例
  mounted() {
    this.init();
  },
  methods: {
    init() {
     this.chart = this.$echarts.init(this.$refs.mainfive);
      const option5 = {
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
          data: ["物资"],
          x: "right", //图例在x方向的位置
          ditemHeight: 15, //高
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
          data: [
            "海安",
            "如皋",
            "如东",
            "海门",
            "启东",
            "通州",
            "崇川",
            "港闸",
            "开发区",
            "市级",
          ],
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        series: [
          {
            name: "物资",
            type: "bar",

            barGap: "0%",
            barWidth: 35, //柱图宽度
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#59be96",
                  },
                  {
                    offset: 1,
                    color: "#71d2ab",
                  },
                ]),
              },
            },

            data: [203, 289, 134, 197, 144, 203, 289, 134, 197, 144],
          },
        ],
      };
      this.chart.setOption(option5, true);
    },
  },
};
</script>

<style>
</style>