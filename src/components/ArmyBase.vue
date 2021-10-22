<template>
  <div>
    <div class="list_block" style="background-color: #eef1f6">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />基本能力维护
      </div>
      <div class="list_content">
        <br />
        <br />
        <el-form ref="form" label-width="100px" :model="form">
          <el-col :span="24" :offset="3">
            <el-form-item label="队伍名称">
              <el-input v-model="form.armyname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="3">
            <el-form-item label="联系人">
              <el-input v-model="form.armycontact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="联系电话">
              <el-input v-model="form.armytel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="3">
            <el-form-item label="能力类型">
              <el-select v-model="form.armyability">
                <el-option v-for="item in abilityData"  :key="item.abilityid"  :value="item.abilityid" :label="item.abilitytitle" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="队伍性质">
              <el-select v-model="form.funds">
                <el-option v-for="item in teamData"  :key="item.teamid"  :value="item.teamid"  :label="item.teamname" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="3">
            <el-form-item label="经费来源">
              <el-select v-model="form.armyproperties">
                <el-option value="1"></el-option>
                <el-option value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="办公场地">
              <el-input v-model="form.armyarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="3">
            <el-form-item label="联系人信息">
              <el-input v-model="form.contactinfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item label="登录密码">
              <el-input v-model="form.loginpwd"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="tab_input">
          <el-button type="primary" @click="submit">确认</el-button>
        </div>
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
        armyloginname:sessionStorage.getItem("mytoken"),
        armyname: "",
        armycontact: "",
        armytel: "",
        armyability: "",
        funds: "",
        armyproperties: "",
        armyarea: "",
        contactinfo: "",
        loginpwd: "",
      },
       armyloginname:"",
       abilityData:[],
       teamData:[]
    };
  },
  
//从新计算
  computed: {
    // ...mapState(["userInfo"])
    // ...mapState({ armyname: (state) => state.user.armyname }),
  },
  methods: {
    async submit() {
      const flag = await axios.post(`armybase/add`,this.form);
      console.log(flag);
      if (flag==="addok") {
        this.$message.success("添加成功");
         this.form.armyname= ""
        this.form.armycontact="",
        this.form.armytel= "",
        this.form.armyability= "",
        this.form.armyproperties= "",
        this.form.funds= "",
        this.form.armyarea= "",
        this.form.loginpwd= "",
        this.form.contactinfo= ""
      } else {
        this.$message.error("添加失败");
      }
    },
    //获取队伍能力信息
    async getAbilityData(){
      const result = await axios.get("/armyability/list")
      this.abilityData = result.datas
    },
    //获取队伍性质
    async getTeamData(){
      const result = await axios.get("http://192.168.69.198:3000/newsteam/list")
      this.teamData = result.datas
    }

  },
  created(){
    this.getAbilityData()
    this.getTeamData()
}
};
</script>

<style >
</style>