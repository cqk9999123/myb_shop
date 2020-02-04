<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="员工ID" prop="worker_id" align="center"></el-table-column>
      <el-table-column width="120" label="员工头像" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.first_pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="worker_name" label="员工姓名"></el-table-column>
      <el-table-column prop="record_time" label="上次领用" align="center"></el-table-column>
      <el-table-column prop="title" label="领用物品" align="center"></el-table-column>
      <el-table-column width="150" prop="total_num" label="总数量" align="center"></el-table-column>
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
      }
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
