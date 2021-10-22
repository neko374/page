<template>
  <el-dialog title="新增计划" :visible.sync="addPlan.show" width="30%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      background="blue"
    >
      <!-- <el-form-item label="联训序号" prop="id">
        <el-input
          v-model="ruleForm.id"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="联训时间" prop="data">
        <el-input
          v-model="ruleForm.data"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="训练名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          size="medium"
          placeholder="请输入"
          id="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="训练状态" prop="state">
        <el-input type="textarea" v-model="ruleForm.state"></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <el-upload
        class="upload-demo"
        action="http://neko37.picp.net/imgs/upload"
        accept="image/jpeg,image/jpg,image/png"
        multiple
      >
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" id="sure"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    addPlan: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      ruleForm: {
        time: "",
        title: "",
        state: "",
        upload: "",
      },
      rules: {
        time: [{ required: true, message: "请输入计划时间", trigger: "blur" }],
        title: [{ required: true, message: "请输入训练主题", trigger: "blur" }],
        person: [
          { required: true, message: "请输入参与人员", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$http.post(
            "http://neko37.picp.net/xlgl/add",
            this.ruleForm
          );
          console.log(result);
          if (result.data == "addok") {
            this.$message.success("添加成功");
            this.$emit("addclose");
            this.$emit("upd");
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
  },
};
</script>

<style>
#inp {
  width: 100%;
}
#sure {
  text-align: center;
}
#btn {
  float: left;
}
</style>