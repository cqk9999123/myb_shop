<template>
  <section class="edit">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form_box"
    >
      <el-form-item label="图片:">
        <pic :num="1" :images="images" @getPic="getPic"/>
      </el-form-item>
      <el-form-item label="品牌标题:" prop="title">
        <el-input v-model="form.title" placeholder="请输入品牌标题"></el-input>
      </el-form-item>
      <el-form-item label="品牌详情:" prop="content">
        <ue ref="ue" @getContent="getContent" />
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即修改</el-button>
        <el-button size="medium" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import pic from "components/pic";
import ue from "components/ue";
export default {
  name: "edit",
  components: {
    back,
    pic,
    ue
  },
  data() {
    return {
      btnloading: false,
      rules: {
        title: [
          {
            required: true,
            message: "请输入品牌标题",
            trigger: "blur"
          }
        ]
      },
      form: {
        id: "",
        pic: "",
        title: "",
        content: ""
      },
      images: []
    };
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    //获取编辑器内容
    getContent(data) {
      this.form.content = data;
    },
    //获取信息
    async getInfo() {
      let param = {
        data: {
          id: this.form.id
        },
        url: "/Api/Admin/GoodsBrand/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        id: this.$route.query.id,
        pic: result.pic,
        title: result.title
      };

      this.images = [];
      if (result.pic) this.images.push({ path: result.pic });
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
        this.$refs.ue.setContent(result.content);
      });
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data:this.form,
              url:"/Api/Admin/GoodsBrand/edit",
            };
            let res = await this.request(param);
            this.utils.success("修改成功", -1);
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
    // 重置
    reset() {
      this.getInfo();
    },
    // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
