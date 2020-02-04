<!-- 物料详情 -->
<template>
  <div class="shopDetail" v-loading="loading">
    <back />
    <div class="marginb10">
      <div class="c666 f14 paddingb16 paddingt10 flex">
        <imgs :img="shop.pic" :width="60" :height="60" />
        <div class="marginl20">
          <p class="c666 f14 margint16">网站名称：{{shop.title}}</p>
          <p class="c666 f14 margint16">联系电话：{{shop.phone}}</p>
        </div>
      </div>
    </div>
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="网站域名" name="host">
        <host ref="host" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import imgs from "components/imgs";
import host from "./host.vue";
export default {
  name: "detail",
  components: {
    back,
    host,
    imgs
  },
  data() {
    return {
      loading: false,
      id: 0,
      shop: {pic:''},
      active: "host"
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getInfo();
    this.$refs.host.init(this.id);
  },
  methods: {
    //获取详情
    async getInfo() {
      this.loading = true;
      try{
        let param = {
          url: "/Api/Admin/shop/getInfoById",
          data:{id:this.id}
        };
        let res = await this.request(param);
        this.shop = res.result;
      }finally{
        this.loading = false;
      }
    },
    // tab 切换
    handleClick(tab, event) {
      tab.$children[0].init(this.id);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
>>> {
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
