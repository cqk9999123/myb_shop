<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="150" prop="name" label="姓名"></el-table-column>
      <el-table-column width="150" prop="phone" label="电话"></el-table-column>
      <el-table-column prop="content" label="留言内容"></el-table-column>
      <el-table-column width="100" prop="ip" label="IP"></el-table-column>
      <el-table-column width="150" prop="create_time" label="留言时间"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <router-link :to="'/web/Message/edit?id='+item.row.id">编辑</router-link>
          <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
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
  data() {
    return {
      img_url: window.my.img_url
    };
  },
  methods: {
    //删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          data: { id: row.id },
          url: "/Api/Admin/Message/del"
        };
        let res = await this.request(param);
        this.utils.success("删除成功!");
        await this.$parent.getList();
      });
    },
    // 状态修改
    async statusChange(row) {
      let ids = [];
      ids.push(row.id);
      let param = {
        data: {
          ids: ids,
          data: { status: row.status }
        },
        url: "/Api/Admin/Message/editVal"
      };
      let res = await this.request(param);
    },
    //修改排序
    async sortChange(row) {
      let ids = [];
      ids.push(row.id);
      let param = {
        data: {
          ids: ids,
          data: { sort: row.sort }
        },
        url: "/Api/Admin/Message/editVal"
      };
      let res = await this.request(param);
      await this.$parent.getList();
    }
  }
};
</script>
