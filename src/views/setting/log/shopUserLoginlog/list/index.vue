<!-- 列表 -->
<template>
  <div>
    <!--搜索-->
    <section class="flex-items marginb20 marginr16 search">
      <el-input size="small" placeholder="请输入关键词" v-model="form.keyword" clearable>
        <el-select
          style="width:130px;"
          v-model="form.field"
          slot="prepend"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-input>
      <div class="marginb10 marginr16">
        <el-date-picker
          size="small"
          v-model="form.day"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="marginb10">
        <search-btn @search="search" @clear="clear" />
      </div>
    </section>
    <!-- 列表 -->
    <section v-loading="loading">
      <el-table :data="list">
        <el-table-column width="80" label="ID" prop="id"></el-table-column>
        <el-table-column prop="username" label="管理员姓名"></el-table-column>
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column width="150" prop="create_time" label="登陆时间"></el-table-column>
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
import searchBtn from "components/searchBtn";
export default {
  components: {
    page,
    searchBtn
  },
  data() {
    return {
      loading: false,
      selectOptions: [
        {
          value: "username",
          label: "登录账号"
        },
        {
          value: "ip",
          label: "IP地址"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {
        page: 1,
        page_size: 10,
        shop_id: 0,
        field: "username",
        keyword: "",
        day: []
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
    // 搜索数据
    async getList() {
      this.loading = true;
      let param = {
        data: this.form,
        url: "/Api/Admin/ShopUserLoginLog/getList",
        type: "get"
      };
      try {
        let res = await this.request(param);
        let result = res.result;
        let list = result.list;
        let total = result.total;
        list.forEach(item => {
          item.create_time = this.utils.parseTime(item.create_time);
        });
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
        field: "username",
        keyword: "",
        day: []
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
