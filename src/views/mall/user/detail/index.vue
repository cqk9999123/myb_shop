<template>
  <div v-loading="loading">
    <back />
    <el-row>
      <el-col :span="2">
        <imgs :img="data.pic" :width="90" :height="90" />
      </el-col>
      <el-col :span="5">
        <p class="marginb20">用户名：{{data.username}}</p>
        <p class="marginb20">姓名：{{data.name}}</p>
        <p class="marginb20">手机号码：{{data.phone}}</p>
      </el-col>
      <el-col :span="5">
        <p class="marginb20">会员等级：{{utils.getType('user_level',data.level)}}</p>
        <p class="marginb20">上级会员：{{data.parent_user.username}}</p>
        <p class="marginb20">注册时间：{{data.create_time}}</p>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单记录" name="recording">
        <el-table :data="orderList" style="width: 100%">
          <el-table-column prop="order_no" label="订单编号" width="300"></el-table-column>
          <el-table-column prop="total_money" label="订单金额"></el-table-column>
          <el-table-column prop="sh_name" label="收货人"></el-table-column>
          <el-table-column prop="sh_phone" label="收货电话"></el-table-column>
          <el-table-column prop="sh_address" label="收货地址"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="200"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="服务地址" name="addr">
        <el-button size="mini" v-on:click="addAddr">添加地址</el-button>
        <el-table class="margint10" :data="addrList" style="width: 100%">
          <el-table-column prop="sh_name" label="联系人" width="300"></el-table-column>
          <el-table-column prop="sh_phone" label="联系电话" width="300"></el-table-column>
          <el-table-column prop="all_address" label="地址"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <addr ref="addAddr"></addr>
  </div>
</template>

<script>
import back from "components/back";
import imgs from "components/imgs";
import addr from "./addr";
export default {
  name: "detail",
  components: {
    back,
    imgs,
    addr
  },
  data() {
    return {
      data: [], //详情数据
      loading: false,
      list: [], //详情列表数据
      img_url: window.my.img_url,
      activeName: "recording",
      orderList: [], //订单记录列表
      addrList: [],
      id: ""
    };
  },
  mounted() {
    (this.id = this.$route.query.id), this.getInfo(this.id);
  },
  methods: {
    //获取详情
    getInfo(id) {
      this.loading = true;
      this.request({
        url: "/Api/Admin/User/getInfo",
        data: {
          id: id
        }
      })
        .then(res => {
          let info = res.result;
          info.create_time = this.utils.parseTime(info.create_time);
          this.data = info;
          this.orderList = res.result.orders;
          this.addrList = res.result.user_address;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //添加地址
    addAddr() {
      this.$refs.addAddr.reset(this.id);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

.client_img {
  width: 90px;
  height: 90px;
}
</style>
