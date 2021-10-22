<template>
  <div>
    <div class="list_block">
      <div class="list_title">
        <img src="../../assets/img/list_title.png" />联训管理
      </div>
      <div class="list_tabs">
        <div class="list_tabs_input1">
          <input
            name="查询"
            type="button"
            class="but"
            value="新增计划"
            @click="openAdd"
          />
          <input name="input" type="button" class="but" value="数据导入" />
        </div>
      </div>
      <div class="list_search">
        查询：
        <input type="text" v-model="searchname" value="请选择" />
      </div>
      <div class="list_tab">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{ background: '#5193D5', color: '#fff' }"
        >
        
          <el-table-column prop="id" label="序号"> </el-table-column>
          <el-table-column prop="data" label="时间"> </el-table-column>
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="state" label="状态"> </el-table-column>
          <el-table-column label="操作">
          <template slot-scope="scope">
            <a @click="openDetail(scope.row.id)">
              <img src="../../assets/img/list_ck.png" />详情</a
            >&nbsp;&nbsp;<a @click="del(scope.row.id)">
              <img src="../../assets/img/list_sc.png" />删除</a
            >&nbsp;&nbsp;<a @click="openSumm(scope.row)">
              <img src="../../assets/img/list_tjzj.png" />提交总结</a
            >
          </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="list_page">
        <el-row>
          <el-button type="primary" @click="firstPage">首页</el-button>
          <el-button @click="prePage">上一页</el-button>
          <el-button @click="nextPage">下一页</el-button>
          <el-button type="primary" @click="lastPage">尾页</el-button>
        </el-row>
      </div>
    </div>
    <add-plan :addPlan="addPlan" @addclose="closeAdd" @upd="getData"></add-plan>
    <detail :showDetail="isDetail"></detail>
    <summary-1 :showSumm="isSumm" :ruleForm="one" @upd="getData"></summary-1>
  </div>
</template>
<script>
import AddPlan from "./AddPlan.vue";
import Detail from "./Detail.vue";
import Summary1 from "./Summary1.vue";
export default {
  components: { AddPlan, Detail, Summary1 },
  data() {
    return {
      searchname:'',
      pagenum: 1,
      pagesize: 11,
      filterData:[],
      totalPage: 0,
      addPlan: {
        show: false,
      },
      isDetail: {
        show: false,
        showId:1,
        detailMsg:[]
      },
      isSumm: {
        sumId:0,
        show: false,
      },
      tableData: [],
      showData:[],
      one:{}

    };
  },
  created() {
    this.getData();
  },
  methods: {

    //获取表内数据
    async getData() {
      const result = await this.$http.get(
        "http://neko37.picp.net/xlgl/list"
      );
      console.log(result);
      console.log(result.data);
      this.tableData = result.data;
      this.tableData.sort((a, b) => a.trainingId - b.trainingId);
      this.totalPage = Math.ceil(this.tableData.length / this.pagesize);
      this.updateData()
    },

    //分页
    updateData(){
      const start = (this.pagenum-1)*this.pagesize
      const stop = this.pagenum*this.pagesize
      const showData = this.tableData.slice(start,stop)
      this.tableData=showData
    },
    //模态框开合
    openAdd() {
      this.addPlan.show = true;
    },
    closeAdd(){
      this.addPlan.show = false;
    },
    async openDetail(id) {
      this.isDetail.show = true;
      console.log("father",id);
      this.isDetail.showId=id
      console.log("detail",this.isDetail.showId);
      const result = await this.$http.get(
          `http://neko37.picp.net/xlgl/one?id=${this.isDetail.showId}`
        );
      console.log("fatherdetail",result.data.datas);
      this.isDetail.detailMsg = result.data.datas
      console.log("lllllll",this.isDetail.detailMsg);
    },
    openSumm(item) {
      this.isSumm.show = true;
      this.one = JSON.parse(JSON.stringify(item))
    },

    //删除
    del(id){
      this.$confirm("是否删除该项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(async (res) => {
          const result = await this.$http.delete(
            `http://neko37.picp.net/xlgl/del?id=${id}`
          );
          if (result.data === "delok") {
            this.$message.success("删除成功");
            this.getData();
          } else if(result.data==="delfail"){
            this.$message.error("删除失败");
          }else{
            this.$message.info(result.data)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //分页器按钮
    firstPage(){
      this.pagenum = 1
      this.getData()
    },
    prePage(){
      this.pagenum-=1
      this.pagenum=this.pagenum<1?1:this.pagenum
      this.getData()
    },
    nextPage(){
      this.pagenum++
      this.pagenum=this.pagenum>this.totalPage?this.totalPage:this.pagenum
      this.getData()
    },
    lastPage(){
      this.pagenum=this.totalPage
      this.getData()
    }
  },
  //搜索框监听
  watch: {
    searchname(val) {
      this.filterData = [];
      let flag = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name.includes(val)) {
          this.filterData.push(this.tableData[i]);
          flag = true;
        }
      }
      if (flag) {
        this.tableData = this.filterData;
      } else {
        this.tableData = [];
      }
      if (val === "") {
        this.getData();
      }
    },
  },
};
</script>

<style>
</style>