  <template>
  <div>
    <div class="list_block" style="background-color: #eef1f6">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />队伍要求设定
      </div>
      <div class="list_content">
        <br />
        <br />

        <el-form ref="form" :model="form" label-width="20%">
          <el-form-item label="装备信息维护要求">
            <el-select v-model="form.zb" placeholder="请选择">
              <el-option value="要求一"></el-option>
              <el-option value="要求二"></el-option>
              <el-option value="要求三"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物资信息维护要求" class="formSize">
            <el-input type="textarea" v-model="form.wz"></el-input>
          </el-form-item>
          <el-form-item label="人员信息维护要求" class="formSize">
            <el-input type="textarea" v-model="form.ry"></el-input>
          </el-form-item>
          <el-form-item label="训练维护要求" class="formSize">
            <el-input type="textarea" v-model="form.xl"></el-input>
          </el-form-item>
          <el-form-item label="设置更新的时间" class="formSize">
            <el-select v-model="form.time" placeholder="请选择活动区域">
              <el-option value="一小时"></el-option>
              <el-option value="两小时"></el-option>
              <el-option value="三小时"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../utils/myhttp";
export default {
  data() {
    return {
      form: {
        zb: "",
        wz: "",
        ry: "",
        xl: "",
        time: "",
      },
    };
  },
  methods: {
   async onSubmit() {
      const flag = await axios.post(`dwyqsd/add`,this.form);
      console.log(flag);
      if (flag==="addok") {
        this.$message.success("设定成功");
        this.form.zb="",
        this.form.wz="",
        this.form.ry="",
        this.form.xl="",
        this.form.time=""
      } else {
        this.$message.error("设定失败");
      }
    },
  },
};
</script>

<style >
.formSize {
  margin-left: 8%;
  width: 650px;
}
.el-textarea__inner {
  height: 100px;
  width: 350px;
}
</style>  