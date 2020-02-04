<!-- 添加物料 -->
<template>
  <el-dialog title="物料领用" width="800px" top="100px" append-to-body :visible.sync="visible" :before-close="close">
    <el-table :data="list">
      <el-table-column width="120" label="物料图片" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.first_pic" :width="60" :height="60" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="物料名称"></el-table-column>
      <el-table-column width="150" prop="spec" label="规格" align="center"></el-table-column>
      <el-table-column width="200" label="件数" align="center">
        <template slot-scope="item">
          <el-input-number :min="0" controls-position="right" v-model="item.row.num" @change="numChange(item.row)"></el-input-number>
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
    <div slot="footer">
      <el-button size="medium" @click="close">取 消</el-button>
      <el-button size="medium" type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
import page from "components/page";
import imgs from "components/imgs";
export default {
  components: {
    page, imgs
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      form: {
        page: 1,
        page_size: 5,
        field: "title",
        keyword: ""
      },
      list: [],
      total: 0,
      numArr: [], // 用于存储输入件数
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 关闭
    close() {
      this.$emit("close");
    },
    // 确定
    ok () {
      this.$emit('submit', this.numArr);
    },
    // 输入件数
    numChange (row) {
      if (parseInt(row.num) > 0 && row.num) {
        if (this.numArr.length > 0) {
          this.numArr.forEach((item, index) => {
            if (parseInt(item.id) === parseInt(row.id)) {
              this.numArr.splice(index, 1);
            } else {
            }
          });
        }
        this.numArr.push(row);
      } else {
        this.numArr.forEach((item, index) => {
          if (parseInt(item.id) === parseInt(row.id)) {
            this.numArr.splice(index, 1);
          }
        });
      }
    },
    // 获取列表数据
    async getList() {
      this.loading = true;
      try{
        let data = this.form;
        data.url = "/Api/Admin/Wuliao/getList";
        let res = await this.request(data,'get');
        let result = res.result;

        let list = result.list;
        let total = result.total;
        list.forEach(item => {
          item.create_time = this.utils.parseTime(item.create_time);
          item['num'] = '';
          if (typeof item.pics === "string") {
            let temp = item.pics.split(",");
            item.first_pic = temp[0];
          } else {
            item.first_pic = "";
          }
        });
        this.list = list;
        this.total = total;
      }finally{
        this.loading = false;
      }
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
    },
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';
>>> {
  .el-input {
    width 130px !important
  }
  .el-select .el-input {
    width 100px !important
  }
  .el-input.el-pagination__editor {
    width 60px !important
  }
  .el-input__inner {
    padding-right 0
  }
  .el-table {
    max-height 50vh
    overflow-y auto
  }
}
</style>
