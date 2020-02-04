<template>
  <section class="add">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="基本信息" class="title"></el-form-item>
      <el-form-item label="图片">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="图册">
        <pic :images="picsArr" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="商品名称:" prop="title" class="item">
        <el-input v-model="form.title" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="goods_brand_id">
        <span class="active pointer" @click="brand">选择品牌</span>
        <span class="c666 f13 paddingl10" v-if="brandText">已选择：{{brandText}}</span>
      </el-form-item>
      <el-form-item label="商品分类:" prop="cat_id">
        <el-cascader
          v-model="form.cat_id"
          :options="options"
          :props="{ checkStrictly: true }"
          @change="handleChange"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="划线价:" prop="line_price">
        <div class="flex-items">
          <el-input-number :precision="2" :min="0" controls-position="right" v-model="form.line_price"></el-input-number>
          <span class="paddingl10">元</span>
        </div>
        <p class="f13 c999">如：<span class="lin">¥500.00</span></p>
      </el-form-item>
      <el-form-item class="line"></el-form-item>
      <el-form-item label="型号价格" class="title"></el-form-item>
      <el-form-item>
        <el-button @click="addSpec" size="medium" icon="el-icon-plus" class="classify">切换型号分类</el-button>
        <mysku v-if="isShow" @table="skuTable" @data="skuData" :selectSkuData="selectSkuData"/>
      </el-form-item>
      <!-- end -->
      <el-form-item class="line"></el-form-item>
      <el-form-item label="其他" class="title"></el-form-item>
      <el-form-item label="运费:" prop="freight_fee">
        <div class="flex-items">
          <el-input-number :precision="2" :min="0" controls-position="right" v-model="form.freight_fee"></el-input-number>
          <span class="paddingl10 c999 f14">统一邮费</span>
        </div>
      </el-form-item>
      <el-form-item label="开售时间:" prop="sale_time">
        <el-date-picker
          v-model="form.sale_time"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商品详情:" prop="" class="eu">
        <ue ref="ue" @getContent="getContent" />
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <brand
      v-if="brandVisible"
      :visible="brandVisible"
      @close="brandClose"
      @select="brandSelect"
    />

    <my-select
      v-if="selectVisible"
      :visible="selectVisible"
      @close="selectClose"
      @ok="selectOK"
    />
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import pic from "components/pic";
import ue from "components/ue";
import brand from "./brand";
import mysku from "./mysku";
import mySelect from "./mySelect";
export default {
  name: "add",
  components: {
    back,
    pic,
    ue,
    brand,
    mysku,
    mySelect
  },
  data() {
    return {
      btnloading: false,
      brandVisible: false, // 选择品牌
      isShow: true,
      rules: {
      },
      form: {
        pic: "",
        pics: "",
        title: "",
        goods_brand_id: 0,
        cat_id: '',
        line_price: "",
        freight_fee: 0,
        // 缺少【商品编码】字段
        spec_table: "",
        spec_data: "",
        freight_fee: "",
        sale_time: "",
        content: "",
        goods_spec_cat_id: 0 // 属性组ID
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入商户商品名称",
            trigger: "blur"
          }
        ],
        cat_id: [
          {
            required: true,
            message: "请输入商品分类",
            trigger: "blur"
          }
        ],
        freight_fee: [
          {
            required: true,
            message: "请输入运费",
            trigger: "blur"
          }
        ],
        sale_time: {
          required: true,
          message: "请选择开售时间",
          trigger: "blur"
        }
      },
      images: [],
      picsArr: [],
      options: [], //分类
      brandText: "", // 选择品牌
      skuTableArr: [], // 存储 sku-table 数据
      skuDataArr: [], // 存储 sku-data 数据
      selectVisible: false, // 选择属性组
      selectSkuData: [
        {
          id:1,
          text:'单品',
          values:[
            {
              id:1,
              text:'单品',
            }
          ]
        }
      ],
    };
  },
  computed: {
    timeDefault() {
      var date = new Date();
      var s1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + (date.getHours()) + ":" + (date.getMinutes());
      return s1;
    }
  },
  mounted() {
    this.getTree();
    this.form.sale_time = this.timeDefault;
  },
  methods: {
    /**
     * 添加属性按钮
     */
    // 添加属性按钮 —— open
    addSpec() {
      this.selectVisible = true;
    },
    // 添加属性按钮 —— colse
    selectClose() {
      this.selectVisible = false;
    },
    // 添加属性按钮 —— value
    selectOK(data) {
      this.isShow = false;
      this.selectClose();
      this.form.spec_table = "";
      this.form.spec_data = "";
      this.skuTableArr = [];
      this.skuDataArr = [];
      this.selectSkuData = data.spec;
      this.form.goods_spec_cat_id = data.cat_id;
      this.$nextTick(() => {
          this.isShow = true;
      });
    },
    // 添加属性按钮 —— sku data
    skuData(data) {
      this.skuDataArr = data;
    },
    // 添加属性按钮 —— sku 数据
    skuTable(table) {
      this.skuTableArr = table;
    },
    // 获取分类列表
    async getTree() {
      let param = {
        data: {
          type: "tree",
          id: 0,
        },
        url: "/Api/Admin/GoodsCat/allList",
      };
      let res = await this.request(param);
      let d = res.result;
      d = this.utils.changeJsonKey(res.result, "cat_title", "label");
      d = this.utils.changeJsonKey(d, "id", "value");
      this.options = d;
    },
    //选择父级分类
    handleChange(value) {
      if (value.length) {
        this.form.cat_id = value[value.length - 1];
      }
    },
    //获取编辑器内容
    getContent(data) {
      this.form.content = data;
    },
    // 选择品牌
    brand() {
      this.brandVisible = true;
    },
    // 选择品牌 —— close
    brandClose() {
      this.brandVisible = false;
    },
    // 选择品牌 —— value
    brandSelect(row) {
      this.form.goods_brand_id = row.id;
      this.brandText = row.title;
      this.brandClose();
    },
    //提交
    submit() {
      this._assemblyData();
      this.$refs.form.validate(async valid => {
        if (valid) {
          let data = this.form;
          if (!data.pics) {
            this.$message.error("请上传商品图！！！");
            return false;
          }

          this.btnloading = true;
          try {
            let param = {
              data:data,
              url:"/Api/Admin/Goods/add"
            }
            let res = await this.request(param);
            this.utils.success("添加成功", -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
    //  组装 —— 规格名（规格值）、table 数据
    _assemblyData() {
      if (this.skuDataArr.length > 0) {
        this.form.spec_data = [];
        this.skuDataArr.forEach(e1 => {
          let tempDataArr = [];
          e1.leaf.forEach(e2 => {
            tempDataArr.push({
              id: e2.id,
              text: e2.text
            });
          });
          this.form.spec_data.push({
            id: e1.id,
            cat_id:this.form.goods_spec_cat_id,
            text: e1.text,
            values: tempDataArr
          });
        });
      }
      if (this.skuTableArr.length > 0) {
        this.form.spec_table = [];
        this.skuTableArr.forEach(item => {
          if (!item.price) item["price"] = 0;
          if (!item.stock) item["stock"] = 0;
          if (!item.point) item["point"] = 0;
          if (!item.min_num) item["min_num"] = 0;
          if (!item.code) item["code"] = 0;
          let tempTableArr = [];
          let goods_sku_title = "";
          item.skus.forEach(event => {
            goods_sku_title += event.v + " ";
            tempTableArr.push({
              id: event.k_id,
              name: event.k,
              value_id: event.v_id,
              value_name: event.v
            });
          });
          this.form.spec_table.push({
            price: item.price,
            point: item.point,
            stock: item.stock,
            min_num: item.min_num,
            code: item.code,
            goods_sku_title: goods_sku_title,
            data: tempTableArr
          });
        });
      }
    },
    //重置
    reset() {
      this.form.spec_data = "";
      this.form.spec_table = "";
      this.images = [];
      this.form.pics = "";
      this.$refs.form.resetFields();
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    },
    getPics(imgs) {
      let arr = imgs.map(item => item.path);
      this.form.pics = arr.join(",");
    }
  }
};
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';

>>> {
  .form_box {
    width: 100%;
  }

  /* .el-form-item__content {
    width 500px
  } */
  .eu .el-form-item__content {
    width: 800px;
  }

  .el-form-item {
    &.title .el-form-item__label {
      font-weight: bold;
      font-size: 17px;
      color: $c333;
    }

    &.line {
      border-bottom: 1px solid $ceee;
    }
  }

  .item .el-input {
    width: 200px;

    .el-input__inner {
      padding-right: 0;
    }
  }

  .lin {
    text-decoration: line-through;
  }

  .classify {
    border-style: dashed;
    color: $c666;
    font-size: 13px;

    i {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
