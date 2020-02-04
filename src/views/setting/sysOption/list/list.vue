<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="300" prop="title" label="选项名称"></el-table-column>
      <el-table-column width="200" prop="uuid" label="选项标识"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <router-link class="marginr20" :to="'/setting/sysOption/edit?id='+item.row.id">编辑</router-link>
          <span class="active pointer" v-if="item.row.is_sys==0" @click="del(item.row)">删除</span>
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
  data() {
    return {
    };
  },
  methods: {
    //删除
    del: function(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: row.id
          };
          this.request({
            url: "/Api/Admin/SysOption/del",
            method: "post",
            data
          })
            .then(res => {
              if (res.code == 200) {
                this.utils.success("删除成功!");
                this.$parent.getList();
              }
            })
            .catch(err => {
            });
        });
    }
  }
};
</script>
