<template>
    <div id="main2" class="home_chart_block2" ref="maintwo"></div>
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
         this.chart = this.$echarts.init(this.$refs.maintwo);
        const option2 = {
        title: {
          text: "",
          subtext: "",
          left: "center",
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "right", //图例在x方向的位置
          ditemHeight: 15, //高
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
        grid: {
          left: "60%",
          right: "4%",
          bottom: "3%",
          top: "12%",
          containLabel: true,
        },
        toolbox: {
          show: true,
        },
        color: [
          "#f96868",
          "#f38273",
          "#f38273",
          "#ffd35e",
          "#8dbe59",
          "#59be96",
          "#5aafbe",
          "#4581b9",
          "#536c93",
        ],
        series: [
          {
            name: "过去半年训练次数",
            type: "pie",
            radius: [50, 100],
            center: ["35%", "50%"],
            roseType: "radius",

            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            data: [
              { value: 10, name: "海安" },
              { value: 5, name: "如皋" },
              { value: 15, name: "如东" },
              { value: 25, name: "海门" },
              { value: 20, name: "启东" },
              { value: 35, name: "通州" },
              { value: 30, name: "崇川" },
              { value: 40, name: "港闸" },
              { value: 30, name: "开发区" },
            ],
          },
        ],
      };
       this.chart.setOption(option2, true);
    },
    },
}
</script>

<style>

</style>