<template>
  <div id="app">
    <page-header></page-header>

    <router-view />
  </div>
</template>
<script>
import PageHeader from "./components/PageHeader.vue";
export default {
  //组件注册
  components: {
    PageHeader,
  },
  //vuex刷新缓存自动消失的解决方案   sessionStorage不会自动刷新 需要手动刷新
  created() {
    if (sessionStorage.getItem("mytoken")) {
      this.$store.dispatch(
        "setUserInoAction",
        sessionStorage.getItem("mytoken")
      );
    }
  },
};
</script>
<style lang="less">
</style>

