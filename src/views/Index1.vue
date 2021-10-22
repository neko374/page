<template>
  <div>
    <left-menu-2></left-menu-2>
    <router-view />
    <div class="main_content">
      <home-status></home-status>
      <home-alert></home-alert>
      <div class="home_foot">
        <div class="home_chart">
          <div class="home_chart_title">
            <img src="../assets/img/home_chart.png" />全市排名情况
          </div>
          <div id="main" class="home_chart_block">
        <home-echarts></home-echarts>
          </div>
        </div>
        <div class="home_message">
          <home-message></home-message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeStatus from "../components/HomeStatus.vue";
import HomeAlert from "../components/HomeAlert.vue";
import HomeMessage from "../components/HomeMessage.vue";
import HomeEcharts from '../components/HomeEcharts.vue';
import LeftMenu2 from '../components/LeftMenu2.vue';



export default {
  components: {
    HomeStatus,
    HomeAlert,
    HomeMessage,
    HomeEcharts,
    LeftMenu2
  },
};
</script>

        
<style scoped>
.home_chart{
  height: 350px;
}
.home_message{
  height: 350px;
}
</style>