<template>
  <section class="edit">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="图片:" prop="pic">
        <pic :num="1" :images="picArr" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="分类标题" prop="cat_title">
        <el-input v-model="form.cat_title" placeholder="请输入分类标题"></el-input>
      </el-form-item>
      <el-form-item label="导航分类标识" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入导航分类标识"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即提交</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import back from "components/back";
import pic from "components/pic";
export default {
  name: "edit",
  components: {
    back, pic
  },
  data() {
    return {
      btnloading: false,
      form: {
        cat_title: "",
        pic: "",
        id: 0,
        uuid:'',
      },
      picArr: [],
      rules: {
        cat_title: {
          required: true,
          message: "请输入分类标题",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    //获取数据
    async getInfo(id) {
      let param = {
        data:{id: id,},
        url:"/Api/Admin/ShopNavCat/getInfo",
      };
      let res = await this.request(param);
      let d = res.result;
      this.form = {
        id:id,
        pic: d.pic,
        uuid:d.uuid,
        cat_title: d.cat_title
      };
      let picObj = {path: d.pic}
      if (d.pic) this.picArr.push(picObj);
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
      await this.getTree(d.parent_id,d.id);
    },
    //提交
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnloading = true;
          try{
            let param = {
              data:this.form,
              url:"/Api/Admin/ShopNavCat/edit",
            };
            let res = await this.request(param);
            this.utils.success("修改成功!",-1);
          }finally{
            this.btnloading = false;
          }
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    //重置
    reset() {
      this.picArr = [];
      this.getInfo(this.$route.query.id);
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? this.form.pic = imgs[0].path : this.form.pic = ''
    }
  }
};
</script>
