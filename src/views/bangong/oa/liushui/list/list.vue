<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
      <el-table-column width="120" label="图片" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.pic" :width="60" :height="60" />
        </template>
      </el-table-column>
      <el-table-column prop="cat_title" label="科目"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column width="130" label="出账（元）" align="center">
        <template slot-scope="item">
          <span v-if="item.row.type == 1">- {{item.row.money}}</span>
          <span v-else class="cccc">——</span>
        </template>
      </el-table-column>
      <el-table-column width="130" label="入账（元）" align="center">
        <template slot-scope="item">
          <span v-if="item.row.type == 0">+ {{item.row.money}}</span>
          <span v-else class="cccc">——</span>
        </template>
      </el-table-column>
      <el-table-column prop="liushui_time" width="170" label="账期时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="130">
        <template slot-scope="item">
          <router-link :to="'/manage/liushui/edit?id='+item.row.id">编辑</router-link>
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
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    imgs
  },
  methods: {
    // 状态修改
    async statusChange(row) {
      let ids = [];
      ids.push(row.id);
      let data = {
        url: "/Api/Admin/Goods/editVal",
        ids: ids,
        data: {
          status: row.status
        }
      };
      await this.request(data);
    },
    // 删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          id: row.id,
          url: "/Api/Admin/Liushui/del"
        };
        await this.request(data);
        this.utils.success("删除成功!");
        this.$parent.getList();
      });
    }
  }
};
</script>
