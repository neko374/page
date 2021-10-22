<template>
  <div>
    <el-dialog title="提示" :visible.sync="zhbj.show" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
         :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="序号">
          <el-input
            type="text"
            v-model="ruleForm.armyid"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="队伍名称">
          <el-input
            type="text"
            disabled
            v-model="ruleForm.armyname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input
            type="text"
            disabled
            v-model="ruleForm.armyloginname"
            autocomplete="off"
         
          ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="loginpwd">
          <el-input
            type="text"
              
            v-model="ruleForm.loginpwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否联系人二次验证">
          <el-radio-group v-model="ruleForm.armyability" disabled>
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
        <el-button @click="zhbj.show = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myhttp from "../../utils/myhttp";
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
       rules: {
        loginpwd: [{ validator: validatepass, trigger: "blur" }],
      },
    };
  },
  //接收父元素的参数
  props: {
    zhbj: {
      type: Object, //const变对象可以改变里面的值
      required: true, //必须的
    },
    ruleForm: {
      //让记录回显示在表单上面
      type: Object,
      required: true,
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await myhttp
            .put("/armybase/upd", {
              armyloginname: this.ruleForm.armyloginname,
              loginpwd: this.ruleForm.loginpwd,
            })
            .then((ret) => {
              console.log(ret);
              if (ret === "修改成功") {
                this.$message.success("修改成功");
                this.$refs[formName].resetFields(); //清空表单字段
                this.zhbj.show = false;
              } else if (ret === "修改失败") {
                this.$message.error("修改失败");
              }
            });

          console.log(this.ruleForm);
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