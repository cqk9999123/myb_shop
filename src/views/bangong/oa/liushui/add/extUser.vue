<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择客户"
      size="50%"
      ref="dailog"
      @open="handleOpen"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="demo-drawer__content">
        <el-row>
          <el-col :span="22" :offset="1">
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
          </el-col>
          <el-col :span="22" :offset="1">
            <el-table :data="list" v-loading="loading" border>
              <el-table-column width="80" label="ID" prop="id"></el-table-column>
              <el-table-column prop="name" label="客户姓名"></el-table-column>
              <el-table-column prop="phone" label="客户电话"></el-table-column>
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
import searchBtn from "components/searchBtn";
export default {
  components: {
    page,
    searchBtn
  },
  data() {
    return {
      btnloading: false,
      loading: false,
      drawer: false,
      direction: "rtl",
      selectOptions: [
        {
          value: "name",
          label: "客户姓名"
        },
        {
          value: "phone",
          label: "联系电话"
        },
        {
          value: "address",
          label: "联系地址"
        }
      ],
      total: 0,
      list: [], // 地址列表
      form: {
        page: 1,
        page_size: 10,
        field: "name",
        keyword: "",
        has_mendian_order: "",
        order_type: "",
        start_day: "",
        end_day: ""
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
        data.url = "/Api/Admin/Mduser/getList";
        let res = await this.requset(data);
        let list = res.result.list;
        let total = res.result.total;
        this.list = list;
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
        field: "name",
        keyword: "",
        has_mendian_order: "",
        order_type: "",
        start_day: "",
        end_day: ""
      };
      this.resetRoute();
    },
    //选择地址
    choose(item) {
      this.$emit("getExtUser", item);
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
    reset() {
      this.drawer = true;
      this.form = {
        page: 1,
        page_size: 10,
        field: "name",
        keyword: "",
        has_mendian_order: "",
        order_type: "",
        start_day: "",
        end_day: ""
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
