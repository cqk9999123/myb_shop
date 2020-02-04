<template>
  <section class="add">
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
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import pic from "components/pic";
import ue from "components/ue";
export default {
  name: "add",
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
        pic: "",
        title: "",
        content: ""
      },
      images: []
    };
  },
  methods: {
    //获取编辑器内容
    getContent(data) {
      this.form.content = data;
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data: this.form,
              url: "/Api/Admin/GoodsBrand/add"
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
