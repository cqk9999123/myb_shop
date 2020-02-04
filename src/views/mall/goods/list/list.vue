<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id" align="center"></el-table-column>
      <el-table-column width="120" label="商品图" align="center">
        <template slot-scope="item">
          <imgs :img="item.row.pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品标题"></el-table-column>
      <el-table-column width="130" prop="price" label="价格（元）" align="center"></el-table-column>
      <el-table-column width="110" prop="sale_num" label="销量" align="center"></el-table-column>
      <el-table-column width="110" prop="stock" label="库存" align="center"></el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="item">
          <span>{{item.row.cat_title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="排序">
        <template slot-scope="item">
          <input class="table_input" type="text" v-model="item.row.sort" @change="sortChange(item.row)" />
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="上架状态">
        <template slot-scope="item">
          <el-switch
            @change="statusChange(item.row)"
            v-model="item.row.status"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="170" label="创建时间" align="center">
        <template slot-scope="item">
          <span>{{item.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="130">
        <template slot-scope="item">
          <router-link :to="'/mall/goods/edit?id='+item.row.id">编辑</router-link>
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
      let param = {
        data: {
          ids: ids,
          data: {
            status: row.status
          }
        },
        url: "/Api/Admin/Goods/editVal"
      };
      let res = await this.request(param);
      await this.$parent.getList();
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
        url: "/Api/Admin/Goods/editVal"
      };
      let res = await this.request(param);
      await this.$parent.getList();
    },
    // 删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data:{
            id: row.id
          },
          url: "/Api/Admin/Goods/del"
        }
        let res = await this.request(param);
        this.utils.success("删除成功!");
        this.$parent.getList();
      });
    }
  }
};
</script>
