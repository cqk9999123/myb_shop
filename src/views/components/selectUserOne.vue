<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择客户"
      size="60%"
      :visible.sync="drawer"
      :direction="direction"
    >
    <div class="marginl16 marginr16">
    <!--搜索-->
    <section class="flex-items marginb20 marginr16 search">
      <el-input size="small" placeholder="请输入关键词" v-model="form.keyword" clearable>
        <el-select v-model="form.field" slot="prepend" placeholder="请选择" size="small">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-input>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>
    <!-- 列表 -->
    <section>
      <el-table ref="multipleTable" :data="list" v-loading="loading">
        <el-table-column width="80" label="ID" prop="id"></el-table-column>
        <el-table-column width="100" label="头像" align="center">
          <template slot-scope="item">
            <imgs :img="item.row.pic" :width="25" :height="25" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="130">
          <template slot-scope="item">
            <el-button size="small" @click="select(item.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <aside class="paddingt20">
        <page
          :total="total"
          :pages="form.page"
          :page_size="form.page_size"
          @pageSize="pageSize"
          @page="page"
        />
      </aside>
    </section>
    </div>
    </el-drawer>
  </div>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
import imgs from "components/imgs";
import searchBtn from "components/searchBtn";
export default {
  components: {
    page,
    searchBtn,
    imgs
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      loading: false,
      selectOptions: [
        {
          value: "username",
          label: "用户姓名"
        },
        {
          value: "phone",
          label: "联系电话"
        },
      ],
      list:[],
      total:0,
      user:{},//选择用户
      form: {
        page: 1,
        page_size: 10,
        field: "phone",
        keyword: "",
        exclude_ids:[],
        day:[]
      },
    };
  },
  methods: {
    //显示赛选产品
    async init(exclude_ids=[]){
      this.drawer = true;
      this.form.exclude_ids = exclude_ids;
      this.form.page = 1;
      this.$nextTick(()=>{
        this.$refs.multipleTable.clearSelection()
      });
      await this.getList();
    },
    // 搜索数据
    async getList() {
      this.loading = true;
      try {
        let param = {
          data:this.form,
          url:"/Api/Admin/User/getList",
          type:'get'
        };
        this.loading = true;
        let res = await this.request(param);
        let result = res.result;
        let list = result.list;
        let total = result.total;
        list.forEach(item => {
          item.create_time = this.utils.parseTime(item.create_time);
        });
        this.list  = list;
        this.total = total;
      } finally {
        this.loading = false;
      }
    },
    // 搜索按钮
    search() {
      this.form.page = 1;
      this.resetRoute();
    },
    // 重置搜索
    clear() {
      this.form = {
        page: 1,
        page_size: 10,
        field: "phone",
        keyword: "",
        exclude_ids:[],
      };
      this.resetRoute();
    },
    // 分页条数
    pageSize(size) {
      this.form.page_size = size;
      this.resetRoute();
    },
    // 分页页数
    page(page) {
      this.form.page = page;
      this.resetRoute();
    },
    // 重置路由
    resetRoute() {
      let query = this.form;
      query.t = Date.now();
      this.resetForm();
      this.getList();
      //this.$router.push({ query: query });
    },
    // 重置参数
    resetForm() {
      let query = this.$route.query;
      for (let key in query) {
        if (this.form[key] !== undefined) {
          switch (key) {
            case "page_size":
            case "page":
              this.form[key] = parseInt(query[key]);
              break;
            default:
              this.form[key] = query[key];
          }
        }
      }
    },
    //提交
    select(row) {
      this.drawer = false;
      this.user = row;
      this.$emit("selectUserOne",this.user);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.el-drawer {
  height: auto !important;
  overflow: auto !important;
}

>>> {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-drawer__body {
    overflow-y: auto;
  }
}
</style>
