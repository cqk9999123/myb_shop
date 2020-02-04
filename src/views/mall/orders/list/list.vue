<!-- 列表 -->
<template>
  <div class="wecatOrder" >
    <el-table :data="list" :row-key="rowKey" :expand-row-keys="expandKeys">
      <el-table-column type="expand">
        <template slot-scope="props">
          <expand :props="props" />
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="order_no"></el-table-column>
      <el-table-column prop="ym" label="下单时间"></el-table-column>
      <el-table-column width="200" prop="status" label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">已取消</span>
          <span v-else-if="scope.row.status == 10">未付款</span>
          <span v-else-if="scope.row.status == 20">已付款</span>
          <span v-else-if="scope.row.status == 30">已发货</span>
          <span v-else-if="scope.row.status == 40">已收货</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="运费" prop="freight_fee"></el-table-column>
      <el-table-column width="200" label="商品总额" prop="goods_money"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <router-link class="marginr20"  :to="'/mall/orders/detail?id=' + scope.row.id">详情</router-link>
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
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data:{
            id: row.id
          },
          url:"/Api/Admin/weidianOrder/del",
        };
        let res = await this.request(param);
        this.utils.success("删除成功!");
        this.$parent.getList();
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
