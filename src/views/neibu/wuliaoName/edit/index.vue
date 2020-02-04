<template>
  <section class="edit">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
    <el-form-item label="上级名称及编码" >
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
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="description">
          <el-input v-model="form.title" placeholder="请输入物料名称"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="content">
          <el-input v-model="form.english_title" placeholder="请输入英文名称"></el-input>
        </el-form-item>
      <el-form-item label="描述" prop="description">
          <textarea style="width:100%;height:80px" v-model="form.description" placeholder="请输入描述"></textarea>
        </el-form-item>
        <el-form-item label="属性" prop="description">
          <textarea style="width:100%;height:80px" v-model="attrs" placeholder="请输入属性,用：隔开的字符串"></textarea>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <textarea style="width:100%;height:80px" v-model="form.note" placeholder="请输入备注"></textarea>
        </el-form-item>
        <el-form-item label="排序" prop="description">
          <el-input v-model="form.sort" placeholder="请输入排序(1-200)"></el-input>
        </el-form-item>
        <el-form-item label="图册" prop="description">
          <pic :num="1" :images="images" @getPic="getPic" />
        </el-form-item>
         <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即编辑</el-button>
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
      selectOptions: [],
      rules: {
        title: [
          {
            required: true,
            message: "请输入物料名称",
            trigger: "blur"
          }
        ],
        attrs: [
          {
            required: true,
            message: "请输入物料属性",
            trigger: "blur"
          }
        ],
      },
      form: {
        pic: "",
        sort:0,
        code:'',
        title:'',
        description:'',
        note:'',
        attrs:'',
        english_title:'',
        sj_name_id:'',
        id:0,
      },
      attrs:'',
      images: [], // 存储图片
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
        this.form.sj_name_id = value[value.length - 1];
      }
    },

   
    //获取分类列表
    async getTree(cat_id, id) {
      let param = {
        url: "/Api/Admin/OaWuliaoName/getTreeList"
      };
      let res = await this.request(param);
      let d = res.result.unshift({ id: 0, title: "顶级分类" });
      d = this.utils.changeJsonKey(res.result, "title", "label");
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
        url: "/Api/Admin/OaWuliaoName/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form = {
        pic: result.pic,
        sort:result.sort,
        code:result.code,
        title:result.title,
        description:result.description,
        note:result.note,
        attrs:result.attrs,
        english_title:result.english_title,
        sj_name_id:result.sj_name_id,
        id: this.$route.query.id
      };
     
      var attrs=result.attrs
      var resultAttrs = ""
      var c=''
       for(var i = 0; i < attrs.length; i++) {
        c = attrs.substr(i, 1);
        if(c == ":"){
          resultAttrs = resultAttrs +"\n";
        }else{
         resultAttrs = resultAttrs + c;
        }
      }
       this.attrs=resultAttrs

      let picObj = { path: result.pic };
      if (result.pic) this.images.push(picObj);


      await this.getTree(result.sj_name_id, result.id);
    },
    //提交
    submit() {
      var attrs=this.attrs
      var result = "";
      var c=''
       for(var i = 0; i < attrs.length; i++) {
        c = attrs.substr(i, 1);
        if(c == "\n"){
          result = result +":";
        }else{
         result = result + c;
        }
      }
      this.form.attrs=result
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data : this.form,
               url: "/Api/Admin/OaWuliaoName/edit"
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
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
