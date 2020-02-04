<template>
  <section class="edit">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="分类" prop="cat_id">
        <el-col :span="8">
          <el-cascader
            v-model="selectOptions"
            :options="options"
            :props="{ checkStrictly: true }"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-col>
        <el-col :span="16">
          <span class="cccc marginl20">选中之后,点击其他区域可收缩下拉选项</span>
        </el-col>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
       <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <pic :num="1" :images="images" @getPic="getPic" />
      </el-form-item>
      <el-form-item label="图册">
        <pic :images="picsArr" @getPic="getPics" />
      </el-form-item>
      <el-form-item label="属性值" prop="attr">
        <el-input type="textarea" :rows="5" v-model="form.attr" placeholder="一行表示一个属性值 例如 产地:重庆"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
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
      options: [],
      rules: {
        title: [
          {
            required: true,
            message: "请输入产品",
            trigger: "blur"
          }
        ],
        cat_id: [
          {
            required: true,
            message: "请选择分类",
            trigger: "blur"
          }
        ]
      },
      form: {
        pic: "",
        pics: "",
        title: "",
        keyword:'',
        content: "",
        description: "",
        attr: "",
        cat_id: "",
        id: 0
      },
      images: [], // 存储图片
      picsArr: [],
      selectOptions: []
    };
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
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
    //获取分类列表
    async getTree(cat_id, id) {
      let param = {
        data: {
          type: "tree",
          id: 0
        },
        url: "/Api/Admin/ProductCat/allList"
      };
      let res = await this.request(param);
      let d = res.result.unshift({ id: 0, cat_title: "顶级分类" });
      d = this.utils.changeJsonKey(res.result, "cat_title", "label");
      d = this.utils.changeJsonKey(d, "id", "value");
      d = this.utils.deleteChildren(d);
      this.options = d;
      let tree = this.utils.getTreeKey(d, "value", cat_id);
      this.selectOptions = tree;
    },
    //获取信息
    async getInfo() {
      let param = {
        data:{
          id: this.form.id,
        },
        url: "/Api/Admin/Product/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        pic: result.pic,
        pics: result.pics,
        title: result.title,
        keyword: result.keyword,
        content: result.content,
        description: result.description,
        attr: result.attr,
        cat_id: result.cat_id,
        id: this.$route.query.id
      };
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
      await this.getTree(result.cat_id, result.id);
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data : this.form,
              url : "/Api/Admin/Product/edit"
            }
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
    },
    getPics(imgs) {
      let arr = imgs.map(item => item.path);
      this.form.pics = arr.join(",");
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
