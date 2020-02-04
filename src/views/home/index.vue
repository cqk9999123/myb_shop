<!-- 首页 -->
<template>
  <div class="home" v-loading="loading">
    <ul class="paddingb26 marginb26 flex order-number">
      <li class="paddingl26 item">
        <p class="c999 f14 name">用户数</p>
        <p class="c333 f24 num">{{result.user}}</p>
      </li>
      <li class="paddingl26 item">
        <p class="c999 f14 name">订单数</p>
        <p class="c333 f24 num">{{result.order}}</p>
      </li>
      <li class="paddingl26 item">
        <p class="c999 f14 name">产品数</p>
        <p class="c333 f24 num">{{result.goods}}</p>
      </li>
    </ul>
    <div class="relative content">
      <el-date-picker
        v-model="monthValue"
        type="month"
        size="small"
        placeholder="选择月份"
        value-format="yyyy-MM"
        @change="monthChange"
      ></el-date-picker>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="月订单量" name="order">
          <div class="chart" id="chart-order"></div>
        </el-tab-pane>
        <el-tab-pane label="客户增量" name="customer">
          <div class="chart" id="customer-order"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      loading: false,
      result: {},
      activeName: "order",
      ym: "",
      monthValue: "", // 选择年月
      chartYear: "",
      chartMonth: "",
      order_chart: [],
      user_chart: [],
      cur: 0
    };
  },
  mounted() {
    this.getNowDate();
    this.getInfo(this.ym);
  },
  methods: {
    async getInfo(time) {
      this.loading = true;
      try {
        let param = {
          data: {
            ym: time
          },
          url: "/Api/Admin/Index/index"
        };
        let res = await this.request(param);
        let result = res.result;
        this.result = result;
        this.order_chart = result.order_chart;
        this.user_chart = result.user_chart;
        if (this.cur === 0) {
          this.$nextTick(() => {
            this._echarts("chart-order", this.order_chart);
          });
        } else {
          this.$nextTick(() => {
            this._echarts("customer-order", this.user_chart);
          });
        }
      } finally {
        this.loading = false;
      }
    },
    handleClick(tab, event) {
      this.cur = parseInt(tab.index);
      this.$nextTick(() => {
        this._echarts("customer-order", this.user_chart);
      });
    },
    // 获取当前时间
    getNowDate() {
      let now = new Date();
      let year = now.getFullYear(); // 年
      let month = now.getMonth(); // 月
      month = month + 1;
      month = month.toString().padStart(2, "0");
      this.monthValue = `${year}-${month}`;
      this.ym = `${year}${month}`;
    },
    // 选择时间
    monthChange(event) {
      let tmpArr = event.split("-");
      this.chartYear = tmpArr[0];
      this.chartMonth = tmpArr[1];
      this.ym = this.chartYear + this.chartMonth;
      this.getInfo(this.ym);
    },
    // 图表
    _echarts(id, data) {
      /** 组装数据 start */
      let now = new Date();
      let year = "";
      let month = "";

      this.chartYear ? (year = this.chartYear) : (year = now.getFullYear());
      if (this.chartMonth) {
        month = this.chartMonth;
      } else {
        month = now.getMonth();
        month = month + 1;
        month = month.toString().padStart(2, "0");
      }

      let arr = [];
      let days = new Date(year, month, 0).getDate();
      let dayArr = [];
      for (let i = 1, j = 0; i <= days, j < data.length; i++, j++) {
        let tmpArr = [];
        tmpArr.push(i + "日");
        tmpArr.push(data[j]);
        dayArr.push(tmpArr);
      }
      for (let a = 0; a < dayArr.length; a++) {
        arr.push(dayArr[a]);
      }
      /** 组装数据 end */

      var dateList = arr.map(function(item) {
        return item[0];
      });
      var valueList = arr.map(function(item) {
        return item[1];
      });
      this.chart = Echarts.init(document.getElementById(id));
      const optionData = {
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],
        title: [
          {
            show: false,
            left: "left",
            text: "月订单量"
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: dateList
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            top: "40px",
            left: "50px",
            right: 0,
            bottom: "10%"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };
      this.chart.setOption(optionData);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

.order-number {
  .item {
    flex: 1 1;
    border-right: 1px solid $ceee;

    &:last-child {
      border-right: none;
    }
  }

  .name {
    line-height: 22px;
  }

  &.dashed {
    border-bottom: 1px dashed $ceee;
  }

  .num {
    line-height: 38px;
  }
}

.content {
  >>> {
    .el-date-editor {
      position: absolute;
      right: 20px;
      top: 0;
      z-index: 10;
      width: 150px;
    }

    .el-tabs__nav-wrap::after {
      height: 1px;
    }

    .el-tabs__nav-wrap {
      padding-left: 16px;
    }
  }
}

.chart {
  height: 420px;
}
</style>
