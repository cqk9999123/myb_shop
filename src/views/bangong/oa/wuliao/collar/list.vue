<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="200" label="单据号" prop="order_no" align="center"></el-table-column>
      <el-table-column width="200" label="数量" prop="num" align="center"></el-table-column>
      <el-table-column prop="worker_name" label="操作人" align="center"></el-table-column>
      <el-table-column label="领用人" prop="worker_name" align="center"></el-table-column>
      <el-table-column prop="record_time" label="时间" align="center"></el-table-column>
    </el-table>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
  name: "list",
  components: {
    imgs
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 状态修改
    async statusChange(row) {
      let ids = [];
      ids.push(row.id);
      let data = {
        ids: ids,
        data: {
          status: row.status
        },
        url: "/Api/Admin/Goods/editVal",
      };
      let res = await this.request(data);

    },
    // 删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {
            id: row.id,
            url: "/Api/Admin/Wuliao/del",
          };
          let res = await this.request(data);
            this.utils.success("删除成功!");
            this.$parent.getList();
        });
    },
  }
};
</script>
