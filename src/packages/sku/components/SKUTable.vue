<template>
  <div class="ease-sku-table paddingt10">
    <div v-if="lists.length">
      <el-table
        border
        size="mini"
        :data="lists"
        v-if="isTable"
        :span-method="handleSpanMethod">
        <template v-for="(label, index) in columns">
          <el-table-column
            v-if="label"
            :label="label"
            :key="index">
            <template slot-scope="scope">
              {{scope.row.skus[index] && scope.row.skus[index].v}}
            </template>
          </el-table-column>
        </template>

        <el-table-column
          prop="price"
          align="center"
          label="价格"
          width="160">
          <template slot-scope="scope">
            <el-input-number :min="0" controls-position="right" v-model="scope.row.price" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="point"
          align="center"
          label="积分"
          width="160">
          <template slot-scope="scope">
            <el-input-number :min="0" controls-position="right" v-model="scope.row.point" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          align="center"
          width="160">
          <template slot-scope="scope">
            <el-input-number :min="0" controls-position="right" v-model="scope.row.stock" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="min_num"
          label="最小采购量"
          align="center"
          width="160">
          <template slot-scope="scope">
            <el-input-number :min="1" controls-position="right" v-model="scope.row.min_num" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="商品编号"
          align="center"
          width="160">
          <template slot-scope="scope">
            <el-input controls-position="right" v-model="scope.row.code" size="mini"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ul class="box" v-if="lists.length">
      <li class="first">批量修改</li>
      <li>
        <el-input-number :min="0" controls-position="right" v-model="price" size="mini" @change="priceChange"/>
      </li>
      <li>
        <el-input-number :min="0" controls-position="right" v-model="point" size="mini" @change="pointChange"/>
      </li>
      <li class="p0">
        <el-input-number :min="0" controls-position="right" v-model="stock" size="mini" @change="stockChange"/>
      </li>
      <li class="p0">
        <el-input-number :min="1" controls-position="right" v-model="min_num" size="mini" @change="minNumChange"/>
      </li>
      <li class="p0">
        <el-input controls-position="right" v-model="cost" size="mini" @change="costChange"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, InputNumber } from 'element-ui'
import { flatten } from '../utils'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)

export default {
  name: 'sku-table',

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 需要附加的字段
    flatten: {
      type: Array,
      default () {
        return []
      }
    },
    // 自定义sku的id key
    optionValue: {
      type: String,
      default: 'id'
    },
    // 自定义sku的text key
    optionText: {
      type: String,
      default: 'text'
    }
  },

  data () {
    return {
      isTable: true,
      rowspan: [],
      lists: [],
      price: undefined, // 价格
      point: undefined, // 积分
      stock: undefined, // 库存
      min_num: undefined, // 最小采购量
      cost: undefined, // 商品编号
    }
  },

  computed: {
    filter () {
      return this.data.filter(item => item.text && item.leaf.length)
    },

    columns () {
      return this.filter.map(item => item[this.optionText])
    }
  },

  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler () {
        this.lists = flatten(this.filter, this.flatten)
        this.computeRowspan()
      }
    },

    lists: {
      deep: true,
      immediate: true,
      handler (data) {
        this.$emit('on-change-data', data)
      }
    }
  },

  methods: {
    computeRowspan () {
      this.rowspan = []
      const rowspan = (index) => {
        let span = []
        let dot = 0

        this.lists.map((item, idx) => {
          if (idx === 0) {
            span.push(1)
          } else {
            if (item.skus[index].v === this.lists[idx - 1].skus[index].v) {
              span[dot] += 1
              span.push(0)
            } else {
              dot = idx
              span.push(1)
            }
          }
        })

        this.rowspan.push(span)
      }

      this.filter.map((item, index) => {
        rowspan(index)
      })
    },

    handleSpanMethod ({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.filter.length; i++) {
        if (columnIndex === i) {
          if (this.rowspan[i] && this.rowspan[i][rowIndex]) {
            return {
              rowspan: this.rowspan[i][rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    priceChange (val) {
      this.lists.forEach(item => {
        item.price = val;
      });
      this._nextTick();
    },
    pointChange (val) {
      this.lists.forEach(item => {
        item.point = val;
      });
      this._nextTick();
    },
    stockChange (val) {
      this.lists.forEach(item => {
        item.stock = val;
      });
      this._nextTick();
    },
    costChange (val) {
      this.lists.forEach(item => {
        item.code = val;
      });
      this._nextTick();
    },
    minNumChange(val) {
      this.lists.forEach(item => {
        item.min_num = val;
      });
      this._nextTick();
    },
    _nextTick () {
      this.isTable = false;
      this.$nextTick(() => {
        this.isTable = true;
      });
    }
  }
}
</script>
<style lang='stylus' scoped rel='stylesheet/stylus'>
.box {
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  .first {
    color: #666;
    font-size: 14px;
    flex: 1;
    text-align: left;
  }
  li {
    padding: 16px 26px;
    width 160px;
    flex: 0 0 160px;
    text-align: center;
    border-right: 1px solid #EBEEF5;
    &:last-child {
      border-right: none;
    }
    &.p0 {
      padding: 16px 10px;
    }
  }
}
</style>
