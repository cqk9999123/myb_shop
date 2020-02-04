<template>
  <section class="add">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="物料名称"  prop="code">
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
       <el-form-item label="状态描述" >
         <div>
           <table class="attrsValue" v-if="attrsValue!=null&&attrsValue.length>0">
             <tbody>
               <tr>
                 <th style="width:100px">状态名</th>
                 <th style="width:300px">描述</th>
               </tr>
               <tr v-for="(item,index) in attrsValue" :key="index">
                 <td style="width:100px">{{item.name}}</td>
                 <td style="width:300px"><el-input v-model="item.center" placeholder="状态描述"></el-input></td>
               </tr>
             </tbody>
           </table>
           <table class="attrsValue" v-else>
             <tbody>
               <tr>
                 <th style="width:100px">状态名</th>
                 <th style="width:300px">描述</th>
               </tr>
               <tr>
                 <td colspan="2">暂无数据</td>                
               </tr>
             </tbody>
           </table>
         </div>
      </el-form-item>
      <el-form-item label="价格" prop="code">
          <el-input v-model="form.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="code">
          <el-input v-model="form.stock" placeholder="请输入库存数量"></el-input>
        </el-form-item>
          <el-form-item label="单位" prop="code">
          <el-input v-model="form.unit" placeholder="请输入库存数量"></el-input>
        </el-form-item>
      <el-form-item label="备注">
         <textarea style="width:100%;height:80px" v-model="form.note" placeholder="请输入备注"></textarea>
      </el-form-item>
       <el-form-item label="排序">
         <el-input v-model="form.sort" placeholder="请输入排序(1-200)"></el-input>
      </el-form-item>
       <el-form-item label="启用状态">
         <el-switch
            v-model="form.status"
            :active-value="0"
            :inactive-value="1"
          ></el-switch>
      </el-form-item>
      <el-form-item label="图册">
         <pic :num="1" :images="images" @getPic="getPic" />
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
      images:[],
      form:{
        code:'',
        oa_wuliao_name_id:'',
        price:'',
        stock:'',
        note:'',
        attrs_value:'',
        title:'',
        sort:'',
        pic:'',
        unit:'',
        status:0
      },
      rules: {
        oa_wuliao_name_id:[
          {
            required: true,
            message: "请选择物料名称",
            trigger: "blur"
          }
        ],
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
      attrsValue:[],
    };
  },
  mounted() {
    this.getTree()
  },
  methods: {
    //提交
    submit() {
      var dataList=[]
      this.attrsValue.forEach(v=>{
          let list=v.name+':'+v.center
          dataList.push(list)
      })
      this.form.attrs_value=dataList.join(',')

      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let param = {
              data:this.form,
              url : "/Api/Admin/OaWuliao/add"
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
    //获取分类列表
    async getTree() {
      let param = {
        data:{
          keyword:''
        },
        url: "/Api/Admin/OaWuliaoName/getTreeList"
      };
      let res = await this.request(param);
      let d = res.result
      d = this.utils.changeJsonKey(res.result, "title", "label");
      d = this.utils.changeJsonKey(d, "id", "value");
      this.options = d;
    },
     //选择父级分类
    handleChange(value) {
      if (value.length) {
        this.form.oa_wuliao_name_id = value[value.length - 1];
        this.getInfo();
      }
    },
    //获取信息
    async getInfo() {
      var that=this
      let param = {
        data:{
          id: this.form.oa_wuliao_name_id,
        },
        url: "/Api/Admin/OaWuliaoName/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      this.form.pic=result.pic
      this.form.code=result.code
      this.form.title=result.title
      this.form.note=result.note
      that.attrsValue=[]
      if(result.attrs!=null){
        result.attrs.split(":").forEach(element => {
          var list={
            name:element,
            center:'',
          }
          that.attrsValue.push(list)
        });
      }
      this.images=[]
      let picObj = { path: result.pic };
      if (result.pic) this.images.push(picObj);

    },
    //重置
    reset() {
      this.$refs.form.resetFields();
    },
     // 图片上传
    getPic(imgs) {
      imgs.length > 0 ? (this.form.pic = imgs[0].path) : (this.form.pic = "");
    }
  }
};
</script>
<style scoped>
.attrsValue{
  width: 400px;
}
.attrsValue tbody tr th{
  text-align: center;
  background: #f4f4f4;
  border: 1px solid #e5e5e5
}
.attrsValue tbody tr td{
  text-align: center;
  border: 1px solid #e5e5e5
}
.attrsValue tbody tr td input{
  width: 100%;
  padding: 0px 10px;
  box-sizing: border-box;
}
</style>