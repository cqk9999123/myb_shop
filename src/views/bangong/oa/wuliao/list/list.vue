<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
      <el-table-column width="100" prop="stock" label="库存" align="center"></el-table-column>
      <el-table-column width="120" label="物料图片" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.first_pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="物料名称"></el-table-column>
      <el-table-column prop="barcode" align="center" label="条码"></el-table-column>
      <el-table-column prop="source" label="进货渠道" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="item">
          <router-link :to="'/manage/wuliao/detail?id='+item.row.id">详情</router-link>
          <router-link class="paddingl10" :to="'/manage/wuliao/edit?id='+item.row.id">编辑</router-link>
          <span class="a paddingl10" @click="del(item.row)">删除</span>
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
          stock_alarm: row.stock_alarm
        },
        url: "/Api/Admin/Wuliao/editVal",
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
