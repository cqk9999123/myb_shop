<!-- 选择品牌 -->
<template>
  <el-dialog
    title="选择品牌"
    top="100px"
    append-to-body
    :visible.sync="visible"
    :before-close="close">
    <el-table :data="list" v-loading="loading">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="120" label="品牌图片">
        <template slot-scope="item">
          <imgs :img="item.row.pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="品牌标题"></el-table-column>
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
  </el-dialog>
</template>

<script type='text/ecmascript-6'>
import page from 'components/page';
import imgs from "components/imgs";
export default {
  components: {
    page, imgs
  },
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      loading: false,
      list: [],
      total: 0,
      form: {
        page: 1,
        page_size: 5,
        field: 'title',
        keyword: ''
      },
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    // 关闭
    close () {
      this.$emit('close');
    },
    // 选择
    select (row) {
      this.$emit('select', row);
    },
    // 获取数据
    async getList () {
      this.loading = true;
      try{
        let param = {
          data:this.form,
          url:"/Api/Admin/GoodsBrand/getList",
          type:'get'
        }
        let res = await this.request(param);
        let result = res.result;
        let list = result.list;
        let total = result.total;
        this.list = list;
        this.total = total;
        this.loading = false;
      }finally{
        this.loading = false;
      }
    },
    // 分页条数
    pageSize (size) {
      this.form.page_size = size;
      this.getList();
    },
    // 分页页数
    page (page) {
      this.form.page = page;
      this.getList();
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
>>> {
  .el-dialog {
    width 760px
  }
  .el-upload,
  .el-upload-dragger {
    width 100%
    background-color $tableThead
  }
  .el-upload-list--picture .el-upload-list__item {
    border-color $ceee
  }
  .el-upload-list {
    overflow-y auto
    max-height 50vh
  }
  .el-dialog__body {
    max-height 70vh
    overflow-y auto
  }
}
</style>
