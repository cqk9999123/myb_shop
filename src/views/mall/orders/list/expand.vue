<!-- 二级列表展示 -->
<template>
  <div class="expand">
    <el-table :data="list" v-if="isshow" :span-method="objectSpanMethod">
      <el-table-column label="商品图" width="100">
        <template slot-scope="item">
          <imgs :img="item.row.goods_img" :width="30" :height="30" />
        </template>
      </el-table-column>
      <el-table-column min-width="120" align="center" prop="goods_title" label="商品名称"></el-table-column>
      <el-table-column min-width="100" prop="spec_title" label="规格"></el-table-column>
      <el-table-column min-width="100" label="单价">
        <template slot-scope="scope">
          <span v-if="scope.row.goods_price">￥{{scope.row.goods_price}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="60" label="数量" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.goods_num}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="center" label="收货人">
        <span>{{user_name}}</span>
      </el-table-column>
      <el-table-column min-width="120" align="center" label="联系电话">
        <span>{{user_phone}}</span>
      </el-table-column>
      <el-table-column align="center" label="收货地址">
        <span>{{user_address}}</span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
  name: "expand",
  components: {
    imgs
  },
  props: {
    props: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      list: [],
      img_url: window.my.img_url,
      user_name: "",
      user_phone: "",
      user_address: "",
      isshow: true
    };
  },
  mounted() {
    let arr = this.props.row.order_goods;
    for (let i in arr) {
      this.list.push(arr[i]);
    }
    if (this.list.length > 0) {
      this.isshow = true;
    }
    this.user_name = this.props.row.sh_name;
    this.user_phone = this.props.row.sh_phone;
    this.user_address = this.props.row.sh_address;
  },
  methods: {
    // 合并单元行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const rows = this.list.length;
      if (columnIndex === 5 || columnIndex === 7 || columnIndex === 6) {
        if (rowIndex % rows === 0) {
          return {
            rowspan: rows,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>