<template>
  <div class="detail relative" v-loading="loading">
    <back />
    <h6 class="font18 bold marginb16 lh25">订单信息</h6>
    <div class="font14 clearfix">
      <el-row class="marginb10 lh20">
        <el-col :span="8">
          <p>订单号：{{data.order_no}}</p>
        </el-col>
        <el-col :span="8">
          <p>下单时间：{{data.create_time}}</p>
        </el-col>
        <el-col :span="8">
          <p>预约时间：{{data.destine_time}}</p>
        </el-col>
        <el-col :span="8">
          <p>
            订单状态：
            <span v-if="data.status == 0">已取消</span>
            <span v-else-if="data.status == 10">未付款</span>
            <span v-else-if="data.status == 20">已付款</span>
            <span v-else-if="data.status == 30">已发货</span>
            <span v-else-if="data.status == 40">已收货</span>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="margint16">
      <h6 class="font18 bold marginb16 lh25">地址信息</h6>
      <div class="font14 clearfix">
        <el-row class="marginb10 lh20">
          <el-col :span="8">
            <p>联系人：{{data.sh_name}}</p>
          </el-col>
          <el-col :span="8">
            <p>联系电话：{{data.sh_phone}}</p>
          </el-col>
          <el-col :span="8">
            <p>详细地址：{{data.sh_address}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <h6 class="font18 bold margint20 lh25">服务项目</h6>
    <el-table class="margint20" :data="list" border style="width: 100%">
      <el-table-column prop="goods_title" label="项目名称"></el-table-column>
      <el-table-column label="规格" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.spec_title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.goods_price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="goods_num" label="数量" width="100"></el-table-column>
      <el-table-column label="小计(元)" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.goods_price * scope.row.goods_num}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="table_end">
      <p class="textr f16 c999">共 {{list.length}} 个服务 合计：￥{{data.a_total_money}}</p>
    </div>
  </div>
</template>

<script>
import back from "components/back";
export default {
  name: "detail",
  components: {
    back
  },
  data() {
    return {
      data: [], //详情数据
      loading: false,
      list: [], //详情列表数据
      img_url: window.my.img_url
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    //获取详情
    async getInfo(id) {
      this.loading = true;
      try {
        let param = {
          data: {
            id: id
          },
          url: "/Api/Admin/Orders/getInfoById"
        };
        let res = await this.request(param);
        this.data = res.result;
        // this.data.create_time = this.utils.parseTime(this.data.create_time);
        // this.data.destine_time = this.utils.parseTime(this.data.destine_time);
        // let arr = this.data.contract_order_detail
        // for (let i in arr) {
        //     this.list.push(arr[i]);
        // }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

.lh25 {
  line-height: 25px;
}

.lh20 {
  line-height: 20px;
}

p {
  color: $c666;
  font-size: 14px;
}

.start {
  justify-content: flex-start;
}

.table_end {
  position: relative;
  padding: 16px;
  background-color: $tableThead;
  line-height: 1.5;
  border-radius: 0 0 4px 4px;
  border-bottom: 1px solid $cccc;
  border-left: 1px solid $cccc;
  border-right: 1px solid $cccc;
}
</style>
