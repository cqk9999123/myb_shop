<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="基本信息" class="title"></el-form-item>
      <el-form-item label="图片">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="图册">
        <pic :images="picsArr" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="商品名称:" prop="title">
        <el-input v-model="form.title" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="goods_brand_id">
        <span class="active pointer" @click="brand">选择品牌</span>
        <span class="c666 f13 paddingl10" v-if="brandText">已选择：{{brandText}}</span>
      </el-form-item>
      <el-form-item label="商品分类:" prop="cat_id">
        <el-cascader
          v-model="selectOptions"
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
        <mysku v-if="isShow" @table="skuTable" @data="skuData" :skuTreeData="skuTree" :selectSkuData="selectSkuData" :selectTable="selectTable" />
      </el-form-item>

      <!-- end -->
      <el-form-item class="line"></el-form-item>
      <el-form-item label="其他" class="title"></el-form-item>
      <el-form-item label="运费:" prop="freight_fee">
        <div class="flex-items">
          <el-input-number
            :precision="2"
            :min="0"
            controls-position="right"
            v-model="form.freight_fee"
          ></el-input-number>
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
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商品详情:" prop class="eu">
        <ue ref="ue" @getContent="getContent" />
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即修改</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <brand v-if="brandVisible" :visible="brandVisible" @close="brandClose" @select="brandSelect" />
    <my-select v-if="selectVisible" :visible="selectVisible" @close="selectClose" @ok="selectOK" />
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
      isShow: false,
      selectOptions: [], //选中的选项
      rules: {
        title: [
          {
            required: true,
            message: "请输入商户商品名称",
            trigger: "blur"
          }
        ],
        cat_id: {
          required: true,
          message: "请选择商品分类",
          trigger: "blur"
        },
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
      form: {
        id: "",
        pic: "",
        pics: "",
        title: "",
        goods_brand_id: 0,
        cat_id: '',
        line_price: "",
        freight_fee: "",
        sale_time: "",
        content: "",

        spec_table: "",
        spec_data: "",
        goods_spec_cat_id: 0, // 属性组ID
      },
      images: [],
      picsArr: [],
      selectOptions: [], // 分类选中的选项
      options: [], //上级分类
      brandText: "", // 选择品牌

      skuTableArr: [], // 存储 sku-table 数据
      skuDataArr: [], // 存储 sku-data 数据
      selectVisible: false, // 选择属性组
      selectSkuData: [], // sku 选中数据
      selectTable: [], // sku table数据
      skuTree: []
    };
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    //获取信息
    async getInfo() {
      let param = {
        url: "/Api/Admin/Goods/getInfo",
        data:{id: this.form.id}
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        min_num: result.min_num,
        pics: result.pics,
        title: result.title,
        goods_brand_id: result.goods_brand_id,
        cat_id: result.cat_id,
        line_price: result.line_price,
        freight_fee: result.freight_fee,
        sale_time: this.utils.parseTime(result.sale_time),
        content: result.content,

        id: this.$route.query.id,
        spec_table: result.spec_table,
        spec_data: result.spec_data,
        goods_spec_cat_id: result.goods_spec_cat_id, // 属性组ID
      };
      this.brandText = result.goods_brand_title;

      this.isShow = false;
      this.skuTree = result.spec_data_temp;
      this.selectSkuData = result.spec_data;
      this.selectTable = result.spec_table;
      this.skuDataArr = result.spec_data;
      this.skuTableArr = result.spec_table;
      this.$nextTick(() => {
        this.isShow = true;
      });

      let picObj = { path: result.pic };
      if (result.pic) this.images.push(picObj);
      if (result.pics) {
        let picsArr = result.pics.split(",");
        let arr = [];
        picsArr.forEach(item => {
          let picsObj = {};
          picsObj["path"] = item;
          this.picsArr.push(picsObj);
        });
      }
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
        this.$refs.ue.setContent(result.content);
      });
      this.getTree(result.cat_id, result.id); // 获取分类列表
    },
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
    async getTree(parent_id, id) {
      let param = {
        url: "/Api/Admin/GoodsCat/allList",
        data:{
        type: "tree",
        id: 0
        }
      };
      let res = await this.request(param);
      let d = res.result;
      d = this.utils.changeJsonKey(res.result, "cat_title", "label");
      d = this.utils.changeJsonKey(d, "id", "value");
      this.options = d;
      let tree = this.utils.getTreeKey(d, "value", parent_id);
      this.selectOptions = tree;
    },

    //选择父级分类
    handleChange(value) {
      if (value.length) {
        this.form.cat_id = [value[value.length - 1]];
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
    async submit() {
      this._assemblyData();
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.btnloading = true;
            let data = this.form;
            if (!data.pics) {
              this.$message.error("请上传商品图！！！");
              return false;
            }
            let param = {
              data:data,
              url:"/Api/Admin/Goods/edit",
            };
            await this.request(param);
            this.utils.success("修改成功!", -1);
          } finally {
            this.btnloading = false;
          }
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
              text: e2.text,
              img: e2.img_url
            });
          });
          this.form.spec_data.push({
            id: e1.id,
            text: e1.text,
            values: tempDataArr
          });
        });
        this.form.is_sku = 0;
      } else {
        this.form.is_sku = 1;
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
      this.getInfo();
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    },
    getPics(imgs) {
      let arr = imgs.map(item => item.path);
      this.form.pics = arr.join(",");
    },
    // 单品模式
    single() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isSku = false;
        this.form.is_sku = 1;
      });
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
