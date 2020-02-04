<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="100" label="logo">
        <template slot-scope="item">
          <imgs :img="item.row.pic" :width="60" :height="60" />
        </template>
      </el-table-column>
      <el-table-column width="150" prop="title" label="网站名称"></el-table-column>
      <el-table-column width="120" prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column width="140" label="添加时间">
        <template slot-scope="item">
          <span>{{item.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center" label="状态">
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
          <router-link :to="'/my/shop/detail?id='+item.row.id" class="active marginr20">详情</router-link>
          <!-- <span v-on:click="initData" class="active pointer marginr20">同步数据</span> -->
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
  methods: {
    // 状态修改
    async statusChange(row) {
      console.log(row)
      let ids = [];
      ids.push(row.id);
      let param = {
        data:{data:{status:row.status},ids:ids},
        url:"/Api/Admin/Shop/editVal",
        type:'POST'
      }
      let res = await this.request(param,'POST');
    },
    //同步数据
    initData() {
      this.$confirm("是否确认同步数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let param = {
            url:"/Api/Admin/Shop/initData"
          }
          let res = await this.request(param);
          this.utils.success('同步成功!')
        })
        .catch(() => {});
    }
  }
};
</script>
