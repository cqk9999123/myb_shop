<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="图片:">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="推荐位标题:" prop="title">
        <el-input v-model="form.title" placeholder="请输入推荐位标题"></el-input>
      </el-form-item>
      <el-form-item label="推荐位标识:" prop="title">
        <el-input v-model="form.uuid" placeholder="请输入推荐位标识"></el-input>
      </el-form-item>
      <el-form-item label="选择产品:" prop="content">
        <span style="line-height:20px;" class="active pointer" @click="selectProductClick()">选择产品</span>
        <selectProduct ref="selectProduct" @selectProduct="selectProduct" />
        <el-table :data="ProductData">
          <el-table-column width="50" label="ID" prop="id" align="center"></el-table-column>
          <el-table-column width="100" label="产品图" align="center">
            <template slot-scope="item">
              <imgs :img="item.row.img" :width="25" :height="25" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="产品标题"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="item">
              <span class="active" @click="handleDel(item.$index, ProductData)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即修改</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import pic from "components/pic";
import imgs from "components/imgs";
import selectProduct from "components/selectProduct";

export default {
  name: "add",
  components: {
    back,
    pic,
    selectProduct,
    imgs
  },
  data() {
    return {
      btnloading: false,
      rules: {
        title: [
          {
            required: true,
            message: "请输入推荐位标题",
            trigger: "blur"
          }
        ],
        uuid: [
          {
            required: true,
            message: "请输入推荐位标识",
            trigger: "blur"
          }
        ]
      },
      form: {
        id: "",
        pic: "",
        title: "",
        uuid: "",
        product_ids: []
      },
      images: [],
      ProductData: []
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
        data:{id: this.form.id},
        url: "/Api/Admin/ProductRec/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        id: this.$route.query.id,
        pic: result.pic,
        title: result.title,
        uuid: result.uuid,
        product_ids: result.product_ids
      };
      this.ProductData = result.product;
      this.ProductData.forEach((e,i)=>{
          e["img"] = e.pic;
      });
      this.images = [];
      if (result.pic) this.images.push({ path: result.pic });
    },
    //选择产品按钮
    selectProductClick() {
      let e_ids = [];
      this.ProductData.forEach((e,i)=>{
        e_ids.push(e.id);
      });
      this.$refs.selectProduct.init(e_ids);
    },
    //选择产品列表
    selectProduct(data) {
      let temp = this.ProductData;
      data.forEach((e,i)=>{
        let index = -1;
        this.ProductData.forEach((e2, i2)=> {
          if(e.id === e2.id){
            index = i2;
          }
        });
        if(index != -1){
        }else{
          temp.push(e);
        }
      });
      this.ProductData = temp;
    },
    handleDel(index, rows) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      });
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            this.form.product_ids = [];
            if (this.ProductData.length > 0) {
              this.ProductData.forEach((e, i) => {
                this.form.product_ids.push(e.id);
              });
            }
            let param = {
              data:this.form,
              url:"/Api/Admin/ProductRec/edit",
            };
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
    //重置
    reset() {
      this.images = [];
      this.form.pic = "";
      this.$refs.form.resetFields();
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    }
  }
};
</script>
