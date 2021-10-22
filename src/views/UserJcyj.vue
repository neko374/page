<template>
  <div>
    <page-header></page-header>
    <div class="list_block">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />监测预警
      </div>
      <div class="list_search">
        队伍名称：
         <input type="text" value="请选择" v-model="searchname" />

        <!-- &nbsp;&nbsp;开始时间:&nbsp;&nbsp;
        <input type="text" value="请选择" />
        &nbsp;&nbsp;至:&nbsp;&nbsp;
        <input type="text" value="请选择" />
        &nbsp;&nbsp;&nbsp;&nbsp; -->
        <input
          name="查询"
          type="button"
          class="but_search"
          value="查询"
        />
      </div>
      <div class="list_tab">
        <!-- <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <th width="92">序号</th>
              <th width="187">名称</th>
              <th width="278">信息维护时间</th>
              <th width="309">超时（天）</th>
              <th width="309">是否告警</th>
            </tr>
            <tr v-for="item in inuData" :key="item.id">
              <td align="center" class="td_1">{{ item.id }}</td>
              <td class="td_1">{{ item.name }}</td>
              <td class="td_1">{{ item.time }}</td>
              <td class="td_1">{{ item.overtime }队伍名称}</td>
              <td class="td_1">
                <span class="css_green"><img :src="item.caution" /></span>
              </td>
            </tr>
          </tbody>
        </table> -->

        <!-- 表格 -->
        <template>
          <el-table
            :data="
              jcjyData.slice(
                (currentpage - 1) * pagesize,
                currentpage * pagesize
              )
            "
            style="width: 100%"
            :header-cell-style="{
              background: '#5193D5',
              color: '#fff',
              textAlign: 'center',
            }"
          >
            <el-table-column prop="id" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="队伍名称" width="180">
            </el-table-column>
            <el-table-column prop="time" label="信息维护时间"> </el-table-column>
            <el-table-column prop="overtime" label="超时（天）"> </el-table-column>
            <el-table-column prop="caution" label="是否告警"> </el-table-column>
            >
          </el-table>
          <!--  -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-sizes="[2, 3, 4, 5]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="jcjyData.length"
          >
          </el-pagination>
        </template>
              

      </div>

      <div class="list_chart">
        <div class="list_chart_title">
          <img src="../assets/img/home_chart.png" />人员能力低于30%的曲线图
        </div>
        <!-- <div id="main" class="list_chart_block"></div> -->
        <jcyj></jcyj>
      </div>
    </div>
  </div>
</template>

<script>
import Jcyj from '../components/echarts/jcyj.vue';
// import MainLeft from "../components/MainLeft.vue";
// @ is an alias to /src
import PageHeader from "../components/PageHeader.vue";
import myhttp from "../utils/myhttp";
export default {
   components: {
    PageHeader,
    // MainLeft,
      Jcyj,
  },
data() {
    return {
       searchname:"",
      jcjyData: [],
       filterData:[],
      currentpage: 1, //当前页
      pagesize: 3, //每页的记录数
      
    
   
    };
  },

  
  created() {
    this.getallData();
  },

  methods: {
    async getallData() {
      const result = await myhttp.get("jcyj/list");
      this.jcjyData = result;
      console.log(this.jcjyData);
    },
    async select() {
      const result = await myhttp.get("jcyj/list");
      this.tableData = result.datas;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentpage = val;
    },
  },
  watch: {
    searchname(val) {
      this.filterData = [];
      let flag = false;
      for(let i=0;i<this.jcjyData.length;i++){
        if(this.jcjyData[i].name.includes(val)){
          this.filterData.push(this.jcjyData[i]);
          flag = true;
        }
      }
      if(flag){
        this.jcjyData = this.filterData;
      }else{
         this.jcjyData=[]
      }
       if(val===""){
          this.getallData();
        }
    },
  },

 
};
</script>

<style>
</style>