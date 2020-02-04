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
      <el-form-item label="推荐类型">
        <el-select size="small" v-model="form.type" placeholder="请选择推荐类型">
          <el-option
            v-for="item in Options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐位标识:" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入推荐位标识"></el-input>
      </el-form-item>
      <el-form-item label="选择商品:">
        <span style="line-height:20px;" class="active pointer" @click="selectGoodsClick()">选择商品</span>
        <selectGoods ref="selectGoods" @selectGoods="selectGoods" />
        <el-table :data="goodsData">
          <el-table-column width="50" label="ID" prop="id" align="center"></el-table-column>
          <el-table-column width="100" label="商品图" align="center">
            <template slot-scope="item">
              <imgs :img="item.row.pic" :width="25" :height="25" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品标题"></el-table-column>
          <el-table-column prop="price" label="商品价格"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="item">
              <span class="active" @click="handleDel(item.$index, goodsData)">删除</span>
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
import selectGoods from "components/selectGoods";

export default {
  name: "add",
  components: {
    back,
    pic,
    selectGoods,
    imgs
  },
  data() {
    return {
      btnloading: false,
      Options:this.myConfig.type.goods_rec_type,
      rules: {
        title: [
          {
            required: true,
            message: "请输入推荐位标题",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择推荐状态",
            trigger: "blur"
          }
        ]
      },
      form: {
        id: "",
        pic: "",
        title: "",
        uuid: "",
        type: 0,
        goods_ids: []
      },
      images: [],
      goodsData: []
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
        url: "/Api/Admin/GoodsRec/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        id: this.$route.query.id,
        pic: result.pic,
        title: result.title,
        uuid: result.uuid,
        type: result.type,
        goods_ids: []
      };
      this.goodsData = result.goods;
      this.goodsData.forEach((e,i)=>{
          e["img"] = e.pic;
      });
      this.images = [];
      if (result.pic) this.images.push({ path: result.pic });
    },
    //选择商品按钮
    selectGoodsClick() {
      let e_ids = [];
      this.goodsData.forEach((e,i)=>{
        e_ids.push(e.id);
      });
      this.$refs.selectGoods.init(e_ids);
    },
    //选择商品列表
    selectGoods(data) {
      let temp = this.goodsData;
      data.forEach((e,i)=>{
        let index = -1;
        this.goodsData.forEach((e2, i2)=> {
          if(e.id === e2.id){
            index = i2;
          }
        });
        if(index != -1){
        }else{
          temp.push(e);
        }
      });
      this.goodsData = temp;
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
            this.form.goods_ids = [];
            if (this.goodsData.length >0) {
              this.goodsData.forEach((e, i) => {
                this.form.goods_ids.push(e.id);
              });
            }
            let param = {
              data:this.form,
              url:"/Api/Admin/GoodsRec/edit",
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
