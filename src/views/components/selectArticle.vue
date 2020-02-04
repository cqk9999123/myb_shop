<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择文章"
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
      <el-select size="small" v-model="form.cat_id" clearable placeholder="请选择文章分类">
        <el-option v-for="item in options" :key="item.id" :label="item.cat_title" :value="item.id"></el-option>
      </el-select>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <el-table
      ref="multipleTable"
      :data="list"
      :row-key="rowKey"
      @selection-change="selectionChange"
      @clearSelection=""
      >
        <el-table-column :reserve-selection="true" type="selection" width="55"></el-table-column>
        <el-table-column width="50" label="ID" prop="id" align="center"></el-table-column>
        <el-table-column width="100" label="文章图" align="center">
          <template slot-scope="item">
            <imgs :img="item.row.pic" :width="25" :height="25" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题"></el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="item">
          <span>{{item.row.cat_title}}</span>
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
    <section class="flex-items marginb20 marginr16 search">
        <el-form-item >

        </el-form-item>
        <el-form-item label="选择数量">
          <span>{{this.articleData.length}}</span>
          <el-button type="primary" size="mini" @click="submit">提交选择数据</el-button>
        </el-form-item>
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
          value: "title",
          label: "文章名称"
        }
      ],
      options:[],
      list:[],
      total:0,
      articleData:[],//选中的id
      num:0,
      form: {
        page: 1,
        page_size: 10,
        field: "title",
        keyword: "",
        cat_id: "",
        status: 0,
        exclude_ids:[],
      },
    };
  },
  methods: {
    //显示赛选产品
    async init(exclude_ids=[]){
      this.drawer = true;
      this.form.exclude_ids = exclude_ids;
      this.form.cat_id = "";
      this.form.page = 1;
      this.$nextTick(()=>{
        this.$refs.multipleTable.clearSelection()
      });
      await this.getTree();
      await this.getList();
    },
    // 获取分类列表
    async getTree() {
      let param = {
        data:{
        type: "list",
        id: 0
        },
        url: "/Api/Admin/ArticleCat/allList",
      };
      let res = await this.request(param);
      let d = res.result;
      this.options = d;
    },
    //选择父级分类
    handleChange(value) {
      if (value.length) {
        this.form.cat_id = value[value.length - 1];
      }
    },
    // 搜索数据
    async getList() {
      this.loading = true;
      try {
        let param = {
          data:this.form,
          url:"/Api/Admin/Article/getList",
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
    //选中,取消
    selectionChange(val){
      this.articleData = [];
      val.forEach((e,i)=>{
        this.articleData.push(e);
      });
    },
    //索引id
    rowKey(row,index){
      return row.id;
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
        field: "title",
        keyword: "",
        cat_id: "",
        status: 0,
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
    submit() {
      if(this.articleData.length<1){
        this.$message.error("请选择数据");
        return false;
      }
      this.drawer = false;
      this.$emit("selectArticle",this.articleData);
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
