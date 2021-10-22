<template>
  <div>
    <el-dialog
      title="新增计划"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="closeWin"
      background="blue"
    >
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="计划时间:" prop="data">
          <el-input
            id="inp1"
            v-model="form.data"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="主题状态:" prop="state">
          <el-input
            id="inp1"
            v-model="form.state"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="参与人员:" prop="name">
          <el-input type="textarea" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="附件上传:">
          <el-upload
            class="upload-demo"
            action="http://neko37.picp.net/imgs/upload"
            :on-preview="handlePreview"
            multiple
            :limit="3"
            accept=".pdf"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过1MB
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeWin">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        data: "",
        name: "",
        state: "",
      },
      rules: {
        date: [{ required: true, message: "请输入内容", trigger: "blur" }],
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        state: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    closeWin() {
      this.$emit("addclose");
    },
    handlePreview(file) {
      console.log("file:", file);
      window.open(file.response.url);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const flag = await this.$http.post(
            "http://neko37.picp.net/xlgl/add",
            this.form
          );
          if (flag.data === "addok") {
            this.$message.success("添加成功");
            this.$emit("add");
            this.$emit("addfail");
            this.$refs[formName].resetFields();
          } else {
            this.$message.error("添加失败");
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
.dialog-footer {
  text-align: center;
}
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
.el-dialog__title {
  color: white;
}
</style>