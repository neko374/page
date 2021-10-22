<template>
  <div>
    <div class="main_top">
      <div class="top_date">{{ systime | dateformat }}</div>

      <div class="top_right" v-if="!userInfo">
        <router-link tag="a" to="/login">请登录</router-link>
      </div>
      <div class="top_right" v-else>
        欢迎您{{ userInfo }}<img src="../assets/img/top_line.png" /><img
          src="../assets/img/top_pass.png"
        /><a href="#" @click="openupdpas">修改密码</a
        ><img src="../assets/img/top_line.png" /><img
          src="../assets/img/top_layout.png"
        /><a @click="logout">安全退出</a>
      </div>
    </div>
    <upd-password :updpas="updpas"></upd-password>
  </div>
</template>

<script>
import UpdPassword from "./UpdPassword.vue";
import { mapState } from "vuex";

export default {
  components: { UpdPassword },
  data() {
    return {
      updpas: { show: false },
      systime: new Date(), //时间  |dateformat 去除时间字符串
    };
  },
  //组件创建
  created() {
    this.getTime(); //显示时间
  },
  //组件销毁 定时器 事件
  detroyed() {
    clearInterval(this.timeId);
  },
  //从新计算
  computed: {
    // ...mapState(["userInfo"])
    ...mapState({ userInfo: (state) => state.user.userInfo }),
  },
  methods: {
    getTime() {
      //时间
      this.timeId = setInterval(() => {
        this.systime = new Date();
      }, 1000);
    },
    //修改密码
    openupdpas() {
      this.updpas.show = true;
      //解决浅拷贝的方法
    },
    logout() {
      //退出
      this.$confirm("是否退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("mytoken");
          this.$store.dispatch("setUserInoAction", ""); //调用异步设置用户信息  为空
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>