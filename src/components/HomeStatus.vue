<template>
  <div>
    <div class="home_status">
      <div class="home_status1">
        <span class="css_b">{{personNum.length}}</span><br />
        人员数量<a href="#"><img src="../assets/img/home_arrow.png" /></a>
      </div>
      <div class="home_status2">
        <span class="css_b" >20</span><br />
        本年度演练（训练）次数<a href="#"
          ><img src="../assets/img/home_arrow.png"
        /></a>
      </div>
      <div class="home_status3">
        <span class="css_b">20</span><br />
        下一次训练时间<a href="#"><img src="../assets/img/home_arrow.png" /></a>
      </div>
      <div class="home_status4">
        <span class="css_b">{{zbNum.length}}</span><br />
        拥有的装备概况<a href="#"><img src="../assets/img/home_arrow.png" /></a>
      </div>
      <div class=" home_status5">
        <span class="css_b">{{wzNum.length}}</span><br />
        物资概况<a href="#"><img src="../assets/img/home_arrow.png" /></a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      personNum:"",
      zbNum:"",
      wzNum:""
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      //获取人员数量
      const result1 = await axios.get('http://192.168.69.198:3000/armystaff/list')
      //获取装备数量
      const result2 = await axios.get('http://192.168.69.198:3000/equips/list')
      //获取物资数量
      const result3 = await axios.get('http://192.168.69.198:3000/material/list')
      this.personNum = result1.data.datas
      this.zbNum = result2.data
      this.wzNum = result3.data.datas
      console.log('personNum:',this.personNum.length);
      console.log('zbNum:',this.zbNum.length);
      console.log("wzNum:",this.wzNum.length);
    }
  }
};
</script>

<style>
</style>