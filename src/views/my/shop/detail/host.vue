<!-- 详情 -> 领用统计 -->
<template>
  <div class='operation'>
    <section v-loading="loading">
      <router-link class="button" size="mini"  :to="'/my/shopHost/add?shop_id=' + form.shop_id">
        <el-button size="mini">添加域名</el-button>
      </router-link>
      <el-table class="margint10" :data="list">
        <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
        <el-table-column width="200" prop="host" label="网站域名"></el-table-column>
        <el-table-column prop="type" label="首页指向"></el-table-column>
        <el-table-column width="200" prop="create_time" label="添加时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="130">
          <template slot-scope="item">
            <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
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
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
export default {
  components: {
    page,
  },
  data() {
    return {
      loading: false,
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
      total: 0,
    };
  },
  methods: {
    init (id) {
      this.form.shop_id = id;
      this.getList();
    },
    // 获取数据
    async getList() {
      try{
        let param = {
            data : this.form,
            url : "/Api/Admin/ShopHost/getList",
            type:'get'
        }    
        let res = await this.request(param);
            res.result.list.forEach((item,index)=>{
              item.type = this.type[item.type];
              item.create_time = this.utils.parseTime(item.create_time);
            });
            this.list = res.result.list;
            this.total = res.result.total;
      }finally{
      }
    },
    //删除
    async del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = {
            url: "/Api/Admin/ShopHost/del",
            data:{
              id: row.id
            }
          };
          let res = await this.request(param);
          this.utils.success("删除成功!");
          await this.getList();
        });
    },
    // 分页条数
    pageSize(size) {
      this.form.page_size = size;
      this.getList();
    },
    // 分页页数
    page(page) {
      this.form.page = page;
      this.getList();
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
