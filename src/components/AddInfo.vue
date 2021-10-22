<template>
  <el-dialog
    title="新增装备"
    :visible.sync="addData"
    width="30%"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="名称:" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="型号:" prop="model">
        <el-input v-model="form.model"></el-input>
      </el-form-item>
      <el-form-item label="生产厂家:" prop="factory">
        <el-input v-model="form.factory"></el-input>
      </el-form-item>
      <el-form-item label="购置时间:" prop="time">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="设备编号:" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="维保状态:" prop="state">
        <el-input v-model="form.state"></el-input>
      </el-form-item>
      <el-form-item label="选择状态:" prop="choice">
        <el-input v-model="form.choice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >新增装备</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cls')">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myhttp from "../utils/myhttp";
export default {
  props: {
    addData: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        uname: "",
        model: "",
        factory: "",
        time: "",
        number: "",
        state: "",
        choice: "",
      },
      rules: {
        uname: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
        model: [{ required: true, message: "请输入装备装备", trigger: "blur" }],
        factory: [
          { required: true, message: "请输入生产厂家", trigger: "blur" },
        ],
        time: [{ required: true, message: "请输入购置时间", trigger: "blur" }],
        number: [{ required: true, message: "请输设备编号", trigger: "blur" }],
        state: [{ required: true, message: "请输入维保状态", trigger: "blur" }],
        choice: [
          { required: true, message: "请输入选择状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          const flag = await myhttp.post(
            "/zbxxgl/add",
            this.form
          );
          console.log("flag", flag);
          if (flag.data == "addok") {
            this.$message.success("添加成功");
            this.$emit("upd"); //刷新数据
            this.$emit("closeInfo"); //关闭窗口
            this.$refs[formName].resetFields(); //情况字段
          } else {
            this.$message.error("添加成功");
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

<style >
input[type="text"] {
  border: 1px solid #8b99ae;
  padding-right: 2px;
  padding-left: 4px;
  font-size: 14px;
  color: #999999;
  width: 250px;
  line-height: 26px;
  height: 30px;
}
.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: black;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
</style>