<template>
  <div>
    <div class="main_left">
      <div class="main_left1"></div>
      <div class="main_left2"></div>
      <div class="main_left_title"></div>
      <div class="main_left_arrow">
        <router-link tag="span" to="/index">></router-link>
      </div>
      <div class="main_left_menu" v-for="item in leftList" :key="item.id">
        <router-link tag="a" :to="item.path"
          ><img class="img0" :src="item.pic"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftList: [
        { id: 1, pic: require("../assets/img/left_menu0.png"), path: "/home/home1" },
        { id: 2, pic: require("../assets/img/left_menu_user1.png"), path: "/home/userxxcx" },
        { id: 3, pic: require("../assets/img/left_menu_user2.png"), path: "/home/userdwyqsd" },
        { id: 4, pic: require("../assets/img/left_menu_user3.png"), path: "/home/userjcyj" },
        { id: 5, pic: require("../assets/img/left_menu_user4.png"), path: "/home/userlxgl" },
        { id: 6, pic: require("../assets/img/left_menu_user5.png"), path: "/home/userdwxxdr" },
        {
          id: 7,
          pic: require("../assets/img/left_menu_user6.png"),
          path: "/home/dwdlzhgl",
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