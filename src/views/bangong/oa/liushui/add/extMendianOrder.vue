<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择合同"
      size="70%"
      ref="dailog"
      @open="handleOpen"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="demo-drawer__content">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-table :data="list" v-loading="loading" border>
              <el-table-column width="80" label="ID" prop="id"></el-table-column>
              <el-table-column width="180" prop="order_no" label="订单编号"></el-table-column>
              <el-table-column width="100" prop="user_name" label="客户姓名"></el-table-column>
              <el-table-column width="200" prop="project_cat_title" label="服务项目"></el-table-column>
              <el-table-column prop="user_address" label="服务地址"></el-table-column>
              <el-table-column width="100" fixed="right" label="操作" align="center">
                <template slot-scope="item">
                  <span class="active pointer" @click="choose(item.row)">选择</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="22" :offset="1">
            <aside class="paddingt20">
              <page
                :total="total"
                :pages="this.form.page"
                :page_size="this.form.page_size"
                @pageSize="pageSize"
                @page="pageAction"
              />
            </aside>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
export default {
  components: {
    page
  },
  data() {
    return {
      btnloading: false,
      loading: false,
      drawer: false,
      direction: "rtl",
      total: 0,
      list: [], // 地址列表
      form: {
        page: 1,
        page_size: 10,
        user_id: 0
      }
    };
  },
  methods: {
    //打开
    handleOpen() {
      //console.log('open');
    },
    //获取列表
    async getList() {
      this.loading = true;
      try {
        let data = this.form;
        data.url = "/Api/Admin/MendianOrder/getListByUserId";
        let res = await this.requset(data);
        let list = res.result.list;
        let total = res.result.total;
        this.list = list;
        this.total = total;
      } finally {
        this.loading = false;
      }
    },
    //选择地址
    choose(item) {
      this.$emit("getExtMendianOrder", item);
      this.drawer = false;
    },
    // 分页条数
    pageSize(size) {
      this.form.page_size = size;
      this.resetRoute();
    },
    // 分页页数
    pageAction(page) {
      this.form.page = page;
      this.resetRoute();
    },
    // 重置路由
    resetRoute() {
      this.form.t = Date.now();
      this.getList();
    },
    //重置
    reset(user_id) {
      this.drawer = true;
      this.form = {
        page: 1,
        page_size: 10,
        user_id: user_id
      };
      this.getList();
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
