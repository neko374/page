<template>
  <div>
    <el-dialog title="提示" :visible.sync="updpas.show" width="30%">
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
            v-model="uname"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="loginpwd">
          <el-input
            type="text"
            v-model="ruleForm.loginpwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updpas.show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myhttp from "../utils/myhttp";
import { mapState } from "vuex";
export default {
  data() {
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const pasReg = /^[0-9]*$/; //自定义正则校验
        if (!pasReg.test(value)) {
          callback(new Error("请输入数字"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        loginpwd: "",
      },
      rules: {
        loginpwd: [{ validator: validatepass, trigger: "blur" }],
      },
    };
  },
  //从新计算
  computed: {
    // ...mapState(["userInfo"])
    ...mapState({ userInfo: (state) => state.user.userInfo }),
    //直接写缓存方法
    uname() {
      return sessionStorage.getItem("mytoken");
    },

    ...mapState({ armyid: (state) => state.user.armyid }),
    //直接写缓存方法
    uid() {
      return sessionStorage.getItem("armyid");
    },
  },
  props: {
    //接收父元素的参数
    updpas: {
      type: Object, //const变对象可以改变里面的值
      required: true, //必须的
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");
          await myhttp
            .put("/armybase/upd", {
              armyloginname: this.uname,
              loginpwd: this.ruleForm.loginpwd,
            })
            .then((ret) => {
              console.log(ret);
              if (ret === "修改成功") {
                this.$message.success("修改成功");
                this.$refs[formName].resetFields(); //清空表单字段
                this.updpas.show = false;
                //修改密码成功直接退出到登录页面
                sessionStorage.removeItem("mytoken");
                this.$store.dispatch("setUserInoAction", ""); //调用异步设置用户信息  为空
                this.$router.push("/login");
              } else if (ret === "修改失败") {
                this.$message.error("修改失败");
              }
            });
          // if (result == "修改成功") {
          //   this.$message.success("修改成功");
          // } else {
          //   this.$message.error("修改失败");
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>