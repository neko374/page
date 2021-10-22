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
            <el-input
              type="text"
              v-model="ruleForm.armyloginname"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="队伍名称" prop="armyname">
            <el-input
              type="text"
              v-model="ruleForm.armyname"
              autocomplete="off"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginpwd">
            <el-col :span="19">
              <el-input
                type="password"
                size="mini"
                v-model="ruleForm.loginpwd"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-col :span="19"
              ><el-input
                type="password"
                size="mini"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input
            ></el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <router-link tag="el-button" to="/login">已有账号</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import myhttp from "../utils/myhttp";
export default {
  data() {
    var validateloginname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatecheckarmyname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入队伍名称"));
      } else {
        callback();
      }
    };
    var validateloginpwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const pasReg = /^[0-9a-zA-Z]*$/; //自定义正则校验
        if (!pasReg.test(value)) {
          callback(new Error("密码不得输入中文"));
        }
        callback();
      }
    };
    var validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.loginpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        armyloginname: "",
        armyname: "",
        loginpwd: "",
        checkPass: "",
      },
      rules: {
        armyloginname: [{ validator: validateloginname, trigger: "blur" }],
        loginpwd: [{ validator: validateloginpwd, trigger: "blur" }],
        checkPass: [{ validator: validatecheckPass, trigger: "blur" }],
        armyname: [{ validator: validatecheckarmyname, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          const msg = await myhttp.get("/armybase/list"); //展示
          let flag = msg.datas.some((item) => {
            //判断展示的值存不存在
            return item.armyloginname == this.ruleForm.armyloginname;
          });
          //如果存在就注册不了
          if (flag) {
            this.$message.error("该用户名已经存在");
          } else {
            const result = await myhttp.post("/armybase/add", this.ruleForm);
            if (result == "addok") {
              this.$message.success("注册成功");
              this.$refs[ruleForm].resetFields(); //清空表单字段
              this.$router.push("/login"); //登录成功跳转到登录页面
            } else {
              this.$message.error("注册失败");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
  },
};
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