<template>
  <div class="home">
    <div class="box"> 
      <left-menu-1></left-menu-1>
    <!-- 二级路由 -->
    <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
import LeftMenu1 from '../components/LeftMenu1.vue';

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    LeftMenu1
   
  },
};
</script>
<style scoped>

</style>