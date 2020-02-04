<!-- 列表 -->
<template>
  <div>
    <!-- 列表 -->
    <section v-loading="loading">
      <el-table :data="list">
        <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
        <el-table-column width="200" prop="host" label="网站域名"></el-table-column>
        <el-table-column prop="type_name" label="首页指向"></el-table-column>
        <el-table-column width="200" prop="create_time" label="添加时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="130">
          <template slot-scope="item">
            <span class="active marginl20 pointer" @click="editIndexUrl(item.row)">设置首页指向</span>
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
    <editIndexUrl ref="editIndexUrl" />
  </div>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
import searchBtn from "components/searchBtn";
import editIndexUrl from "./editIndexUrl.vue";
export default {
  components: {
    page,
    searchBtn,
    editIndexUrl
  },
  data() {
    return {
      loading: false,
      dialogFormVisible:false,
      type:{
        0:'电脑官网',
        1:'手机商城',
        2:'电脑商城',
      },
      form: {
        page: 1,
        page_size: 10,
        shop_id:0,
      },
      list: [],
      total: 0
    };
  },
  mounted() {
    this.resetForm();
    this.getList();
  },
  methods: {
    //编辑首页指向
    editIndexUrl(item){
      this.$refs.editIndexUrl.init(item.id,item.type,item.host);
    },
    // 搜索数据
    async getList() {
      this.loading = true;
       let param = {
          data:this.form,
          url : "/Api/Admin/ShopHost/getList",
          type : 'get'
        };
      try{
        let res = await this.request(param);
            res.result.list.forEach((item,index)=>{
              item.type_name = this.type[item.type];
              item.create_time = this.utils.parseTime(item.create_time);
            });
            this.list = res.result.list;
            this.total = res.result.total;
      }finally{
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
        shop_id:0,
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
      this.$router.push({ query: query });
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
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
