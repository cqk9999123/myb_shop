<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="wuliao_id" align="center"></el-table-column>
      <el-table-column width="120" label="图片" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.first_pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="wuliao_title" label="名称"></el-table-column>
      <el-table-column prop="stock" label="目前库存"></el-table-column>
      <el-table-column width="200" label="领取数量" align="center">
        <template slot-scope="item">
          <span v-if="item.row.num">-{{item.row.num}}</span>
          <span v-else class="c999">——</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="130">
        <template slot-scope="item">
          <router-link :to="'/manage/wuliao/detail?id='+item.row.wuliao_id">详情</router-link>
        </template>
      </el-table-column>
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
