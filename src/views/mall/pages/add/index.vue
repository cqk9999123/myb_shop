<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标识" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入标识"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="图册" prop="pics">
        <pic :images="picsArr" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
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
      options: [],
      selectOptions: [],
      rules: {
        title: [
          {
            required: true,
            message: "请输入单页标题",
            trigger: "blur"
          }
        ]
      },
      form: {
        pic: "",
        pics: "",
        title: "",
        content: "",
        description: "",
        uuid:'',
      },
      images: [],
      picsArr: []
    };
  },
  mounted() {
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
              data:this.form,
              url : "/Api/Admin/ShopPages/add"
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
    //重置
    reset() {
      this.images = [];
      this.form.pic = "";
      this.selectOptions = [];
      this.$refs.form.resetFields();
      this.$refs.ue.setContent("");
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
