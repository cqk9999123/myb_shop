<!-- 列表 -->
<template>
  <div class="wecatOrder" >
    <el-table :data="list" :row-key="rowKey" :expand-row-keys="expandKeys">
      <el-table-column type="expand">
        <template slot-scope="props">
          <expand :props="props" />
        </template>
      </el-table-column>
      <el-table-column label="属性类别" prop="title"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <router-link :to="'/mall/goodsSpecCat/edit?id='+scope.row.id">编辑</router-link>
          <span class="a paddingl10" @click="del(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import expand from "./expand";
export default {
  name: "wecatOrder",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    isExpand: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {
    expand
  },
  watch: {
    isExpand() {
      this.handleSwitch(this.isExpand);
    }
  },
  data() {
    return {
      expandKeys: []
    };
  },
  methods:{
    //删除
    async del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data:{
            id: row.id,
          },
          url:"/Api/Admin/GoodsSpecCat/del"
        };
        let res = await this.request(param);
          this.utils.success("删除成功!");
          await this.$parent.getList();
      });
    },
    // 展开、折叠
    rowKey(row) {
      return row.id;
    },
    // 展开、折叠——开关状态
    handleSwitch(isExpand) {
      this.$nextTick(() => {
        if (isExpand) {
          this.list.forEach((item, index) => {
            this.expandKeys.push(this.list[index].id);
          });
        } else {
          this.expandKeys = [];
        }
      });
    },
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
