<template>
  <div>
    <div class="list_block">
      <div class="list_title">
        <img src="../assets/img/list_title.png" />队伍登录帐号管理
      </div>
      <div class="list_tabs">
        <div class="list_tabs_input1">
          <el-button type="primary" @click="openaddzh">新增账号</el-button>
        </div>
      </div>
      <div class="list_search">
        <el-row>
          <el-col :span="2">
            <div>队伍名称：</div>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="请输入队伍名称" v-model="search"></el-input>
            <!-- <input type="text" @input="getlist" v-model="dwlist" /> -->
            <!-- <input type="text" v-model="search" /> -->
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="
          dwzhglList.slice((currentpage - 1) * pagesize, currentpage * pagesize)
        "
        style="width: 100%"
        :header-cell-style="{
          background: '#5193D5',
          color: '#fff',
          textAlign: 'center',
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="序号" prop="armyid" width="200">
        </el-table-column>
        <el-table-column label="队伍名称" prop="armyname" width="200">
        </el-table-column>
        <el-table-column label="登录账号" prop="armyloginname" width="200">
        </el-table-column>
        <el-table-column label="密码" prop="loginpwd" width="200">
          ******
        </el-table-column>
        <el-table-column label="是否二次认证" prop="armyability" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="openzhbj(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.armyid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-row>
          <el-col :span="5" :offset="8">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentpage"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="dwzhglList.length"
              background
            >
            </el-pagination
          ></el-col>
        </el-row>
      </div>
    </div>
    <dwzhglbj :zhbj="zhbj" :ruleForm="one"></dwzhglbj>
    <add-zh :addzh="addzh" @getData="getData"></add-zh>
  </div>
</template>

<script>
import AddZh from "../components/dwzhgl/AddZh.vue";

import Dwzhglbj from "../components/dwzhgl/Dwzhglbj.vue";
import myhttp from "../utils/myhttp";
export default {
  components: {
    Dwzhglbj,
    AddZh,
  },
  data() {
    return {
      search: "", //查询
      dwzhglList: [],
         newdwzhglList: [],
      zhbj: { show: false }, //const 对象里面的只能可以修改
      addzh: { show: false }, //const 对象里面的只能可以修改
      currentpage: 1, //当前页
      pagesize: 5, //每页的记录
      one: {}, //存储一条数据
    };
  },
  //生命周期
  created() {
    //调用
    this.getData();
  },
  methods: {
    // getlist() {
    //   this.showData = this.dwzhglList.filter((item) => {
    //     return item.armyname === this.dwlist;
    //   });
    // },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentpage = val;
    },
    //编辑队伍信息
    openzhbj(item) {
      this.zhbj.show = true;
      //解决浅拷贝的方法
      this.one = JSON.parse(JSON.stringify(item)); //点击的时候把值显示在表单里面
    },
    //添加账号
    openaddzh() {
      this.addzh.show = true;
    },
    //删除
    handleDelete(index, row) {
      // console.log( row);
      //1.弹出框
      this.$confirm("此操作将永久删除该记录，是否删除？", "提示", {
        confirmButtonText: "确定",
        canceIButtonText: "取消",
        type: "warning",
      })
        .then(async (res) => {
          //2.调用接口
          const result = await myhttp.delete(
            `/armybase/del?armyid=${row}` //根据id删除
          );
          if (result === "delok") {
            this.$message.success("删除成功");
            //3.刷新数据
            this.getData();
          } else if (result === "delfail") {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //展示队伍信息
    async getData() {
      const results = await myhttp.get("/armybase/list");
      console.log(results);
      this.dwzhglList = results.datas;
      // this.showData = this.dwzhglList;
      //根据状态判断1是没有二次认证 2是
      results.datas.forEach((item) => {
        if (item.armyability === 1) {
          item.armyability = "否";
        } else if (item.armyability === 2) {
          item.armyability = "是";
        }
      });
    },
  },
  // computed: {
  //   //查询方法
  //   tables() {
  //     const search = this.search;
  //     if (search) {
  //       return this.dwzhglList.filter((dataNews) => {
  //         return Object.keys(dataNews).some((key) => {
  //           return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
  //         });
  //       });
  //     }
  //     return this.dwzhglList;
  //   },
  // },
  //查询
  watch: {
    search(val) {
      this.newdwzhglList = [];
      let flag = false;
      for (let i = 0; i < this.dwzhglList.length; i++) {
        if (this.dwzhglList[i].armyname.includes(val)) {
          this.newdwzhglList.push(this.dwzhglList[i]);
          flag = true;
        }
      }
      if (flag) {
        this.dwzhglList = this.newdwzhglList;
      } else {
        this.dwzhglList = [];
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