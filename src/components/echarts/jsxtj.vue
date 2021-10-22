<template>
  <div id="main3" class="home_chart_block3-1" ref="mainthree"></div>
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
      this.chart = this.$echarts.init(this.$refs.mainthree);
      const option3 = {
        title: {
          text: "",
        },
        tooltip: {},
        legend: {
          data: ["预算分配（Allocated Budget）"],
        },
        color: ["#f89341"],
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },

          indicator: [
            { name: "海安", max: 650 },
            { name: "如皋", max: 1600 },
            { name: "如东", max: 3000 },
            { name: "海门", max: 3800 },
            { name: "启东", max: 5200 },
            { name: "通州", max: 2500 },
            { name: "崇川", max: 650 },
            { name: "港闸", max: 1600 },
            { name: "开发区", max: 3000 },
            { name: "市级", max: 5200 },
          ],
          radius: 100,
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [
                  500, 1400, 2800, 3100, 4200, 2100, 500, 1400, 2800, 3100,
                ],
                name: "实际开销（Actual Spending）",
              },
            ],
          },
        ],
      };
      this.chart.setOption(option3, true);
    },
  },
};
</script>

<style>
</style>