<template>
  <el-dialog title="提示" :visible.sync="addzh.show" width="30%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="队伍名称" prop="armyname">
        <el-input
          type="text"
          v-model="ruleForm.armyname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="armyloginname">
        <el-input
          type="text"
          v-model="ruleForm.armyloginname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginpwd">
        <el-input
          type="text"
          v-model="ruleForm.loginpwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否联系人二次验证">
        <el-radio-group v-model="ruleForm.armyability">
          <el-radio label="2">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addzh.show = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myhttp from "../../utils/myhttp";
export default {
  data() {
    var validatedwname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入队伍名称"));
      } else {
        callback();
      }
    };
    var validateloginname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录账号"));
      } else {
        callback();
      }
    };
    var validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录密码"));
      } else {
        const pasReg = /^[0-9a-zA-Z]*$/; //自定义正则校验
        if (!pasReg.test(value)) {
          callback(new Error("密码不得输入中文"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        armyname: "",
        armyloginname: "",
        loginpwd: "",
        armyability: "",
      },
      rules: {
        armyname: [{ validator: validatedwname, trigger: "blur" }],
        armyloginname: [{ validator: validateloginname, trigger: "blur" }],
        loginpwd: [{ validator: validatepassword, trigger: "blur" }],
      },
    };
  },
  //接收父元素的参数
  props: {
    addzh: {
      //const变对象可以改变里面的值
      type: Object,
      required: true, //必须的
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //   alert("submit!");
          // const msg = await myhttp.get("/armybase/list"); //展示
          // msg.datas.forEach(async (i) => {
          //   if (i.armyloginname == this.ruleForm.armyloginname) {
          //     this.$message.error("该用户名已经存在");
          //   } else {
          //     const resule = await myhttp.post("/armybase/add", this.ruleForm);
          //     if (resule == "addok") {
          //       this.$message.success("添加成功");
          //       this.addzh.show = false; //关闭对话框
          //       this.$emit("getData"); //更新数据
          //       this.$refs[formName].resetFields(); //清空表单字段
          //     } else {
          //       this.$message.error("添加失败");
          //     }
          //   }
          // });
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
           this.$message.success("添加成功");
                this.addzh.show = false; //关闭对话框
                this.$emit("getData"); //更新数据
                this.$refs[formName].resetFields(); //清空表单字段
             
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
  },
};
</script>

<style>
</style>