<template>
  <div class="container">
    <sku
      v-model="skuValue"
      :sku-tree="selectSkuData"
      :on-fetch-group="fetchSkuTree"
      :on-fetch-sku="fetchSku"
      :on-create-group="createGroup"
      :on-create-sku="createSku"
      @on-change="change"
      :action="uploadUrl"
      :headers="headers"
      :uploadName="'file'"
      :maxSize="100"
    />
    <sku-table :data="skuValue" @on-change-data="handleChangeData" />
  </div>
</template>
<script>
import { Sku, SkuTable } from 'sku'
export default {
  name: "mysku",
  props: {
    selectSkuData: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  components: {
    Sku,
    SkuTable
  },
  data() {
    return {
      uploadUrl: window.my.api_url + "/Api/Admin/Files/upImg", // 上传图片接口
      headers: {
        "t-host": this.myConfig.host,
        "t-token": this.utils.session.get("token")
      },
      // skuTree: [], //属性名->createGroup
      skuValue: [] //生成的table表结构
    };
  },
  watch: {
    skuValue () {
      this.$emit('data', this.skuValue);
    }
  },
  created () {
    // this.skuTree = this.selectSkuData;
  },
  methods: {
    // 初始化 —— 规格名
    fetchSkuTree() {
      return new Promise(resolve => {
        resolve(this.selectSkuData);
      });
    },
    // 规格名 —— 选择/初始化
    fetchSku(id) {
      return new Promise(resolve => {
        resolve(this.sku);
      });
    },
    //添加一个组
    createGroup(text) {
      return new Promise((resolve, reject) => {
        if (text) {
          resolve(parseInt(Math.random() * 100, 10) + 1);
        } else {
          reject(new Error());
        }
      });
    },
    //创建的SKU的数据
    createSku(data) {
      return new Promise((resolve, reject) => {
        resolve(data.data.map(item => {
          return {
            id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
            text: item
          }
        }))
      })
    },
    // 规格名 —— 选择/获取 data 数据
    change(data) {
    },
    // table change 数据变化
    handleChangeData(data) {
      this.$emit('table', data);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.container {
  min-width 700px
}
>>> {
  .el-input-number {
    width: 115px;
  }

  .sku-item__upload .arrow {
    top: -5px;
  }
}
</style>
