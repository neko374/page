<template>
  <div>
    <!-- <page-header></page-header> -->
    <left-menu-1></left-menu-1>
    <div class="main_content">
      >
      <jydw></jydw>
      <div class="home_user_middle">
        <div class="home_user_middle_title">
          <img src="../assets/img/home_pm.png" />训练情况统计
        </div>
        <xlqk></xlqk>
        <!--<div id="main2" class="home_chart_block2" ref="maintwo"></div>-->
        <div id="main2-1" class="home_chart_block2-1">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="th_1">序号</td>
              <td class="th_1">所属队伍</td>
              <td class="th_1">人员姓名</td>
              <td class="th_1">性别</td>
            </tr>
            <tr>
              <td>1</td>
              <td>海安中队</td>
              <td>张三</td>
              <td>男</td>
            </tr>
            <tr>
              <td class="td_1">2</td>
              <td class="td_1">海安市墩头镇综合救援队</td>
              <td class="td_1">李四</td>
              <td class="td_1">女</td>
            </tr>
            <tr>
              <td>3</td>
              <td>海安中队</td>
              <td>张三</td>
              <td>男</td>
            </tr>
            <tr>
              <td class="td_1">4</td>
              <td class="td_1">海安市墩头镇综合救援队</td>
              <td class="td_1">李四</td>
              <td class="td_1">女</td>
            </tr>
            <tr>
              <td>5</td>
              <td>海安中队</td>
              <td>张三</td>
              <td>男</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="home_user_middle1">
        <div class="home_user_middle_title">
          <img src="../assets/img/home_pm.png" />信息更新及时性统计
        </div>
        <jsxtj></jsxtj>
        <!--<div id="main3" class="home_chart_block3-1" ref="mainthree"></div>-->
      </div>

      <div class="home_user_foot">
        <div class="home_user_middle_title">
          <img src="../assets/img/home_pm.png" />装备情况统计
        </div>
        <zbxxtj></zbxxtj>
        <!--<div id="main4" class="home_chart_block3" ref="mainfour"></div>-->
      </div>
      <div class="home_user_foot1">
        <div class="home_user_middle_title">
          <img src="../assets/img/home_pm.png" />物资情况统计
        </div>
        <wzxxtj></wzxxtj>
        <!--<div id="main5" class="home_chart_block3" ref="mainfive"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import jsxtj from "../components/echarts/jsxtj.vue";
import jydw from "../components/echarts/jydw.vue";
import xlqk from "../components/echarts/xlqk.vue";
import zbxxtj from "../components/echarts/zbxxtj.vue";
import wzxxtj from "../components/echarts/wzxxtj.vue";

import PageHeader from "../components/PageHeader.vue";
import LeftMenu1 from "../components/LeftMenu1.vue"
export default {
	components: {LeftMenu1},
  name: "IndexUser",
  components: {
    PageHeader,
    // MainLeft,
    jydw,
    xlqk,
    jsxtj,
    zbxxtj,
    wzxxtj, LeftMenu1,
  },

  Jydwata() {
    return { chart: null };
  }, //图表实例
  mounted() {
    this.init();
    //获取数据
  },

  //

  //

  methods: {
    init() {},
  },
};
</script>
<style lang="less" scoped>
</style>