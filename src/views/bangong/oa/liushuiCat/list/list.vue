<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
      <el-table-column align="center" label="科目类型">
        <template slot-scope="item">
          <span v-if="item.row.type === 0">
            <span class="active">收入</span>
          </span>
          <span v-if="item.row.type === 1">
            <span class="red">支出</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统科目">
        <template slot-scope="item">
          <span v-if="item.row.is_sys === 0">自定义</span>
          <span v-if="item.row.is_sys === 1">系统</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_title" label="科目名称"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="130">
        <template slot-scope="item">
          <router-link v-if="item.row.is_sys==0" :to="'/manage/liushuiCat/edit?id='+item.row.id">编辑</router-link>
          <span v-if="item.row.is_sys==0" class="a paddingl10" @click="del(item.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
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
  methods: {
    // 删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          url: "/Api/Admin/LiushuiCat/del",
          id: row.id
        };
        await this.request(data);
        this.utils.success("删除成功!");
        this.$parent.getList();
      });
    }
  }
};
</script>
