<!-- 列表 -->
<template>
  <div class="wecatOrder">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="100" label="头像" prop="pic">
        <template slot-scope="scope">
          <imgs :img="scope.row.pic" :width="60" :height="60" />
        </template>
      </el-table-column>
      <el-table-column label="用户名/上级用户" prop="">
        <template slot-scope="item">
          {{item.row.username}}/
          {{item.row.parent_user.username}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="联系电话" prop="phone"></el-table-column>
      <el-table-column prop="" label="会员等级">
        <template slot-scope="item">
          {{utils.getType('user_level',item.row.level)}}
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
      <el-table-column width="180" label="注册时间" prop="create_time"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="220">
        <template slot-scope="scope">
          <router-link class="marginr20" :to="'/mall/user/edit?id=' + scope.row.id">编辑</router-link>
          <router-link :to="'/mall/user/detail?id=' + scope.row.id">详情</router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
  name: "wecatOrder",
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
    // 状态修改
    statusChange(row) {
      let ids = [];
      ids.push(row.id);
      this.request({
        url: "/Api/Admin/user/editVal",
        method: "post",
        data: {
          ids: ids,
          data: {
            status: row.status
          }
        }
      });
    },
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'></style>
