<template>
  <section class="edit">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="图片:" prop="pic">
        <pic :num="1" :images="picArr" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="上级分类" prop="parent_id">
        <el-cascader
          v-model="selectOptions"
          :options="options"
          :props="{ checkStrictly: true }"
          @change="handleChange"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分类标题" prop="cat_title">
        <el-input v-model="form.cat_title" placeholder="请输入分类标题"></el-input>
      </el-form-item>
      <el-form-item label="分类标识" prop="uuid">
        <el-input v-model="form.uuid" placeholder="请输入分类标识"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" placeholder="请输入描述"></el-input>
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
    back,
    pic
  },
  data() {
    return {
      btnloading: false,
      options: [], //上级分类
      selectOptions: [], //选中的选项
      form: {
        cat_title: "",
        pic: "",
        id: 0,
        parent_id: "",
        uuid: "",
        description: ""
      },
      picArr: [],
      rules: {
        cat_title: {
          required: true,
          message: "请输入分类标题",
          trigger: "blur"
        },
        parent_id: {
          required: true,
          message: "请选择上级分类",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    //选择父级分类
    handleChange(value) {
      if (value.length) {
        this.form.parent_id = value[value.length - 1];
      }
    },
    //获取分类列表
    async getTree(parent_id, id) {
      let param = {
        data: {
          type: "tree",
          id: 0
        },
        url: "/Api/Admin/ArticleCat/allList"
      };
      let res = await this.request(param);
      let d = res.result.unshift({ id: 0, cat_title: "顶级分类" });
      d = this.utils.changeJsonKey(res.result, "cat_title", "label");
      d = this.utils.changeJsonKey(d, "id", "value");
      d = this.utils.deleteJsonKey(d, "value", id);
      d = this.utils.deleteChildren(d);
      this.options = d;
      let tree = this.utils.getTreeKey(d, "value", parent_id);
      this.selectOptions = tree;
    },
    //获取数据
    async getInfo(id) {
      let param = {
        data:{
          id: id
        },
        url: "/Api/Admin/ArticleCat/getInfo"
      };
      let res = await this.request(param);
      let d = res.result;
      this.form = {
        id: id,
        pic: d.pic,
        parent_id: d.parent_id,
        uuid: d.uuid,
        cat_title: d.cat_title,
        description: d.description
      };
      let picObj = { path: d.pic };
      if (d.pic) this.picArr.push(picObj);

      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
      this.getTree(d.parent_id, d.id);
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let data = this.form;
            if (this.selectOptions != 0) {
              data.parent_id = this.selectOptions.pop();
            }
            let param = {
              data:data,
              url : "/Api/Admin/ArticleCat/edit"
            }
            let res = await this.request(param);
            this.utils.success("修改成功!", -1);
          } finally {
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
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    }
  }
};
</script>
