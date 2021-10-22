<template>
  <div>
    <div class="box">
      <div class="left"></div>
      <div class="con">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="armyloginname">
            <el-col :span="3"
              ><el-input
                type="text"
                v-model="ruleForm.armyloginname"
                autocomplete="off"
                size="mini"
              ></el-input
            ></el-col>
          </el-form-item>
          <el-form-item label="密码" prop="loginpwd">
            <el-col :span="19">
              <el-input
                type="password"
                v-model="ruleForm.loginpwd"
                size="mini"
                autocomplete="off"
              ></el-input
            ></el-col>
          </el-form-item>
          <el-row>
            <el-col :offset="0">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >登录</el-button
                >
                <router-link tag="el-button" to="/register">注册</router-link>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import myhttp from "../utils/myhttp"; //不用原型导入 直接引入utils里面封装的axios
export default {
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        armyloginname: "",
        loginpwd: "",
      },
      rules: {
        armyloginname: [{ validator: validateUname, trigger: "blur" }],
        loginpwd: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          ///armybase/login路径
          const result = await myhttp.post("/armybase/login", this.ruleForm);
          console.log(result);
          if (result.state === 0) {
            sessionStorage.setItem("mytoken", result.datas.armyloginname); //把登录名放到缓存
            sessionStorage.setItem("armyid", result.datas.armyid);
            this.$store.dispatch(
              "setUserInoAction",
              result.datas.armyloginname
            ); //用户名添加到缓存
            this.$message.success(result.msg);
            this.$router.push("/"); //登录成功跳转到首页
          } else {
            this.$message.error(result.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
// 王涵之
</script>

<style scoped>
.box {
  width: 990px;
  height: 500px;
  background: url(../assets/img/login.png) no-repeat;
  margin: 0px auto;
  display: flex;
  justify-content: space-around;
}
.box .con {
  width: 300px;
  height: 310px;
  margin-top: 150px;
  margin-right: 50px;
}
.box .left {
  width: 300px;
  height: 310px;
}
</style>