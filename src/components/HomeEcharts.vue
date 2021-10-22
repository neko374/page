<template>
  <div id="app">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      mychart:null,
      allData:[],
    }
  },
  mounted(){
    this.initChart();
    this.getData();
  },
  name: "app",
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.mychart = this.$echarts.init(this.$refs.seller_ref)
      // 指定图表的配置项和数据
      const option = {
        grid: {
          top: "2%",
          left: "5%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {},
        yAxis: {
          data: [
            "人员数量",
            "本年度演练(训练)次数",
            "下一次训练时间",
            "拥有的装备概况",
            "物资概况",
          ],
        },
        xAxis: {
          type: 'value'
        },
        series: [
          {
            // name: "销量",
            type: "bar",
            barWidth: 30,
          },
        ],
        color:"#409EFF"
      };
      // 使用刚指定的配置项和数据显示图表。
      this.mychart.setOption(option);
    },
    async getData(){
      //获取人员数量
       const result1 = await axios.get('http://192.168.69.198:3000/armystaff/list')
       //获取装备数量
      const result2 = await axios.get('http://192.168.69.198:3000/equips/list')
      //获取物资数量
      const result3 = await axios.get('http://192.168.69.198:3000/material/list')
      this.personNum = result1.data.datas
      this.zbNum = result2.data
      this.wzNum = result3.data.datas
      console.log('personNum:',this.personNum.length);
      console.log('zbNum:',this.zbNum.length);
      console.log("wzNum:",this.wzNum.length);
      this.allData = [this.personNum.length,20,20,this.zbNum.length,this.wzNum.length];
      console.log("allData:",this.allData);
      this.updataOption()
    },
    updataOption(){
      const option={
        legend: {
          color:"hotpink"
        },
        series:[
          {
            // name:'2011年',
            data:this.allData,
          },
        ],
      }
       this.mychart.setOption(option);
    }
    
  },
};
</script>

<style scoped>
.com-chart{
        width:100%;
        height:250px;
}
</style>