<template>
  <div id="main" class="list_chart_block" ref="nin"></div>
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
      this.chart = this.$echarts.init(this.$refs.nin);
      const option6 = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "扫雪除冰",
            "燃气抢险",
            "医疗救助",
            "防汛抗旱",
            "城市搜救",
            "道路救援",
            "起吊装卸运输作业",
            "危化品救援",
            "水上搜救",
            "灭火救援",
            "后勤保障",
            "消防应急",
            "供气抢修",
            "路灯抢修",
            "气体泄漏救援",
            "搬运",
            "道路抢修",
            "供气抢修",
            "筑路修桥",
            "维护市场秩序",
            "建筑",
            "抢险、救援、维护社会秩序",
            "水陆空",
            "船舶火灾救援",
            "自然灾害救援医疗救助水域救援",
            "危险化学品",
            "其他",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "",
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
            data: [
              120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 234, 90, 230,
              210, 120, 132, 301, 134, 90, 230, 210, 120, 132, 101, 134, 90,
              230,
            ],
          },
        ],
        color: ["#2898aa"],
      };

      this.chart.setOption(option6, true);
    },
  },
};
</script>

<style>
</style>