<template>
  <el-dialog title="提示" :visible.sync="addPerson.show" width="30%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      background="blue"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="ruleForm.name"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input
          v-model="ruleForm.gender"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="籍贯" prop="nativeplace">
        <el-input
          v-model="ruleForm.nativeplace"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" id="sure"
          >确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addPerson: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        gender: "",
        nativeplace: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        nativeplace: [
          { required: true, message: "请输入籍贯", trigger: "blur" },
        ],
      },
    };
  },
  methods:{
      submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$http.post('http://neko37.picp.net/armystaff/add',this.ruleForm)
          console.log(result);
          if(result.data=="addok"){
              this.$message.success("添加成功")
              this.$emit("addclose")
              this.$emit("upd")
              this.$refs[formName].resetFields();
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
  }
};
</script>

<style>
.el-input {
  width: auto;
}
.bottom {
  margin-bottom: 10px;
}
</style>