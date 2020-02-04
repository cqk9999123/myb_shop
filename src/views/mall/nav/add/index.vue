<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="分类" prop="cat_id">
        <el-select v-model="form.cat_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.cat_title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="PC链接" prop="url">
        <el-input v-model="form.url" placeholder="请输入链接"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="url">
        <el-input v-model="form.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="ID标识" prop="url">
        <el-input v-model="form.obj_id" placeholder="请输入ID标识"></el-input>
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
export default {
  name: "add",
  components: {
    back,
    pic
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
            message: "请输入导航标题",
            trigger: "blur"
          }
        ],
        cat_id: [
          {
            required: true,
            message: "请输选择分类",
            trigger: "blur"
          }
        ]
      },
      form: {
        title: "",
        cat_id: "",
        pic:'',
        url:'',
        type:0,
        obj_id:0,
        link_type:0
      },
      images: []
    };
  },
  mounted() {
    this.getTree();
  },
  methods: {
    //获取分类列表
    async getTree() {
      let param = {
        data:{
        page: 1,
        page_size: 100,
        field:'cat_title',
        keyword:'',
        },
        url:"/Api/Admin/ShopNavCat/getList",
        type:'get',
      };
      let res = await this.request(param);
      this.options = res.result.list;
      this.options.forEach((item,index)=>{
        item.id = String(item.id)
      })
    },
    //提交
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnloading = true;
          try{
                let param = {
                  data:this.form,
                  url : "/Api/Admin/ShopNav/add"
                }
                let res = await this.request(param);
                this.utils.success("添加成功", -1);
          }finally{
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
