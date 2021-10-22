<template>
  <div>
    <el-dialog title="编辑" width="45%" :visible.sync="diabj.show">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="150px"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="名称:" prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            disabled
            id="inp1"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="sex">
          <el-input
            v-model="ruleForm.sex"
            autocomplete="off"
            id="inp1"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >修改数量</el-button
          >
          <el-button @click="diabj.show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var valisex = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入数量"));
      } else {
        const val = /^[0-9]*$/;
        if (!val.test(value)) {
          callback(new Error("请输入数字"));
        }
        callback();
      }
    };
    return {
      rules: {
        sex: [{ validator: valisex, trigger: "blur" }],
      },
    };
  },
  props: {
    ruleForm: {
      type: Object,
      required: true,
    },
    diabj: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$http.put(
            "http://neko37.picp.net/userszu/upd",
            this.ruleForm
          );
          if (result.data === "updok") {
            this.$message.success("修改成功");
            this.diabj.show = false;
            this.$emit("upd");
            this.submitForm();
          } else if (result.data === "upfail") {
            this.$message.success("修改失败");
          } else {
            this.$message.info(result.data);
            this.diabj.show = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
#inp1 {
  width: 200px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: white;
  font-size: 20px;
}
.el-dialog__header {
  background: #5193d5;
}
</style>