<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="120" label="图片">
        <template slot-scope="item">
          <imgs :img="item.row.pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="导航标题"></el-table-column>
      <el-table-column width="150" prop="cat_title" label="导航分类"></el-table-column>
      <el-table-column width="100" align="center" label="排序">
        <template slot-scope="item">
          <input class="table_input" type="text" v-model="item.row.sort" @change="sortChange(item.row)" />
        </template>
      </el-table-column>
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
          <router-link :to="'/mall/Nav/edit?id='+item.row.id">编辑</router-link>
          <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import expand from "./expand";
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
    expand,
    imgs
  },
  data() {
    return {
      expandKeys: []
    };
  },
  methods: {
    //删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = {
            data:{id: row.id,},
            url:"/Api/Admin/ShopNav/del",
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
        data:{
          ids:ids,
          data:{status:row.status},
        },
        url:"/Api/Admin/ShopNav/editVal",
      };
      let res = await this.request(param);
    },
    //修改排序
    async sortChange(row){
      let ids = [];
      ids.push(row.id);
      let param = {
        data:{
          ids:ids,
          data:{sort:row.sort},
        },
        url:"/Api/Admin/ShopNav/editVal",
      }
      let res = await this.request(param);
      await this.$parent.getList();
    }
  }
};
</script>
