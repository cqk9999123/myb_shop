<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column prop="username" label="登陆账号"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <!-- <el-table-column width="120" align="center" label="排序">
        <template slot-scope="item">
          <input class="table_input" type="text" v-model="item.row.sort" @change="sortChange(item.row)" />
        </template>
      </el-table-column> -->
      <el-table-column width="120" align="center" label="状态">
        <template slot-scope="item">
          <el-switch
            @change="statusChange(item.row)"
            v-model="item.row.status"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <router-link class="marginr20" :to="'/setting/shopUser/edit?id='+item.row.id">编辑</router-link>
          <span class="active pointer" @click="del(item.row)">删除</span>
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
    },
  },
  components: {
    imgs
  },
  data() {
    return {
      expandKeys: []
    };
  },
  methods: {
    //删除
    del: function(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          let param = {
            data:{id: row.id},
            url:"/Api/Admin/ShopUser/del",
            type:'post'
          };
          let res = await this.request(param,'post');
          this.utils.success("删除成功!");
          await this.$parent.getList();
      });
    },
    // 状态修改
    async statusChange(row) {
      let ids = [];
      ids.push(row.id);
      let param = {
        url: "/Api/Admin/ShopUser/editVal",
        data:{
          ids:ids,
          data:{status:row.status}
        }
      };
      let res = await this.request(param);
    },
    //修改排序
    async sortChange(row){
      let ids = [];
      ids.push(row.id);
      let param = {
        url: "/Api/Admin/ShopUser/editVal",
        data:{
          ids:ids,
          data:{sort:row.sort}
        }
      };
      let res = await this.request(param);
      await this.$parent.getList();
    }
  }
};
</script>
