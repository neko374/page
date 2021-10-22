<template>
  <div>
    <div class="main_left">
      <div class="main_left1"></div>
      <div class="main_left2"></div>
      <div class="main_left_title"></div>

      <div class="main_left_arrow">
        <router-link tag="span" to="/home">></router-link>
      </div>
      <div class="main_left_menu" v-for="item in leftList1" :key="item.id">
        <router-link :to="item.path" tag="a">
          <img class="img0" :src="item.pic"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftList1: [
        { id: 1, pic: require("../assets/img/left_menu0.png"), path: "/index/index1"},
        { id: 2, pic: require("../assets/img/left_menu1.png"), path: "/index/jbxxwh" },
        { id: 3, pic: require("../assets/img/left_menu2.png"), path: "/index/zzjghrygl" },
        { id: 4, pic: require("../assets/img/left_menu3.png"), path: "/index/zbxxgl" },
        { id: 5, pic: require("../assets/img/left_menu4.png"), path: "/index/userwzxxgl" },
        { id: 6, pic: require("../assets/img/left_menu5.png"), path: "/index/userxlgl" },
        {
          id: 7,
          pic: require("../assets/img/left_menu6.png"),
          path: "/index/userylgl",
        },
      ],
    };
  },
};
</script>

<style scoped>
span {
  color: #557cbf;
  font-size: 5px;
  padding-bottom: 10px;
}
</style>