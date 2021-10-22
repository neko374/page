<template>
  <div>
    <left-menu-2></left-menu-2>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeStatus from "../components/HomeStatus.vue";
import HomeAlert from "../components/HomeAlert.vue";
import HomeMessage from "../components/HomeMessage.vue";
import HomeEcharts from "../components/HomeEcharts.vue";
import LeftMenu2 from "../components/LeftMenu2.vue";
export default {
  components: {
    HomeStatus,
    HomeAlert,
    HomeMessage,
    HomeEcharts,
    LeftMenu2,
  },
};
</script>

<style>
</style>