<template>
  <div>
    <div class="home_message_title">
      <img src="../assets/img/home_pm.png" />基本信息
    </div>
    <el-form label-width="80px" :data="tableData" ref="form">
      <el-col :span="24">
        <el-form-item label="队伍名称" >
          <el-input v-model="form.armyname" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系人">
          <el-input v-model="form.armycontact" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话">
          <el-input v-model="form.armytel" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="队伍能力">
          <el-select v-model="form.armyability">
             <el-option v-for="item in abilityData"  :key="item.abilityid"  :value="item.abilityid" :label="item.abilitytitle" ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="队伍性质">
          <el-select v-model="form.funds">
            <el-option v-for="item in teamData"  :key="item.teamid"  :value="item.teamid"  :label="item.teamname" ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-button type="primary" @click="submit">编辑</el-button>
    </el-form>
  </div>
</template>
<script>
import axios from "../utils/myhttp";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form:{
      armyid:sessionStorage.getItem("armyid"),
      armyname: "",
      armycontact: "",
      armyability: "",
      funds: "",
      armytel: "",
      },
      tableData: [],
      abilityData:[],
      teamData:[]
    };
  },
  created() {
    this.getData();
    this.getAbilityData()
    this.getTeamData()
    
  },
    //重新计算
  computed: {
    // ...mapState(["userInfo"])
    ...mapState({ userInfo: (state) => state.user.armyname }),
     localname() {
      return sessionStorage.getItem("mytoken");
    },
    
  },
  methods: {
    // async submit(){
    //     const result = await axios.put("http://neko37.picp.net/armybase/updInfo",{
         
    //     });
    //     console.log("armyloginname:",this.armyloginname);
    // },

    //获取armyid=1的数据
    async getData() {
      const result = await axios.get("http://neko37.picp.net/armybase/one?armyid=1");
       console.log("id:",sessionStorage.getItem("armyid"));
      // console.log("result",result);
      this.tableData = result.datas;
      // console.log("tableData:",this.tableData)
      this.form.armyname = this.tableData.armyname;
      this.form.armycontact = this.tableData.armycontact;
      this.form.armytel = this.tableData.armytel;
    },
    //编辑修改
   async submit(){
      const result = await axios.put("http://neko37.picp.net/armybase/updInfo",
      this.form);
      console.log("result",result);
      if(result==="修改成功"){
        this.$message.success("编辑成功");
        this.getData();
      }else{
        this.$message.info(result.data);
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
    
};
</script>

<style  scoped>
.el-button--primary{
  margin-left: 300px;
}
</style>