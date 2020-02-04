<!-- 二级列表展示 -->
<template>
  <div class="expand">
    <el-table :data="list" v-if="isshow" :span-method="objectSpanMethod">
      <el-table-column prop="name" max-width="200" label="属性名称" align="center"></el-table-column>
      <el-table-column min-width="100" align="center" label="属性值">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.value" :key="index">{{item}}，</span>
        </template>
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
      isshow: true
    };
  },
  mounted() {
    if (this.props.row.goods_spec) {
      this.list = this.props.row.goods_spec;
      if (this.list.length > 0) {
        this.isshow = true;
      }
    }
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