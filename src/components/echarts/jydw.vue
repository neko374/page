<template>
  <!-- <div id="main1" class="home_chart_block1" ref="mainone"></div> -->

<div>
  <div class="home_user_block1">
        <div class="home_user_block1_title">
          <img
            src="../../assets/img/home_pm.png"
          />各区域、各种能力、各种性质救援队伍的统计<select name="">
            <option>各区域救援队伍</option>
            <option>各种能力救援队伍</option>
            <option>各区性质援队伍</option>
          </select>
        </div>
        <div id="main1" class="home_chart_block1" ref="mainone"></div>
      </div>
</div>



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
init(){
 this.chart = this.$echarts.init(this.$refs.mainone);
 const option = {
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
          data: ["队伍数量", "人数"],
          x: "center", //图例在x方向的位置
          ditemHeight: 15, //高
        },
        grid: {
          left: "2%",
          right: "0%",
          bottom: "0%",
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
            name: "队伍数量",
            type: "bar",

            barGap: "0%",
            barWidth: 35, //柱图宽度
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#4581b9",
                  },
                  {
                    offset: 1,
                    color: "#4581b9",
                  },
                ]),
              },
            },

            data: [203, 289, 134, 197, 144, 203, 289, 134, 197, 144],
          },

          {
            name: "人数",
            type: "bar",
            barGap: "0%",
            barWidth: 35, //柱图宽度
            itemStyle: {
              normal: {
                barBorderRadius: [3, 3, 0, 0],
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

            data: [1203, 1289, 1134, 1197, 1144, 1203, 1289, 1134, 1197, 1144],
          },
        ],
      };
this.chart.setOption(option, true);
}





},



}
</script>

<style>

</style>