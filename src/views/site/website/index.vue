<template>
  <section>
    <el-tabs type="border-card">

      <el-tab-pane label="上传自定义模板">
        <el-form
          :model="form"
          ref="form"
          label-width="100px"
          class="form_box"
        >
          <el-form-item label="HTML官网:" prop="host">
            <el-col :span="18">
              <el-input v-model="host" :disabled="true"></el-input>
            </el-col>
            <el-col :span="6">
              <el-link :href="host" :underline="false" target="_blank">
                <el-button>点击访问</el-button>
              </el-link>
            </el-col>
          </el-form-item>

          <el-form-item label="制作模板:">
          <el-collapse v-model="activeNames">
              <el-collapse-item title="制作模板流程" name="1">
               <div>1,请先线下用html把您的网站制作好</div>
               <div>2,打包成不大于10MB的zip文件,上传模板</div>
               <div>3,您可以在线上修改模板文字</div>
              </el-collapse-item>
              <el-collapse-item title="如何制作模板" name="2">
                <div>1,自己百度,自己学习</div>
                <div>2,万能的淘宝</div>
                <div>3,可以找我们,代为制作</div>
                <div>4,用仿站小工具扒拉别人的网站。 <a href="https://smalltool.github.io/" target="_blank">仿站小工具</a></div>
              </el-collapse-item>
              <el-collapse-item title="如何获取动态内容" name="3">
               <div>1,在您的模板使用ajax获取动态内容</div>
               <div>2,获取动态内容接口文档。 <a :href="docs_url" target="_blank">接口文档</a></div>
              </el-collapse-item>
          </el-collapse>
          </el-form-item>

          <el-form-item label="上传模板:">
              <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :headers="headers"
              ref="upload"
              :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList)"
              accept=".zip"
              :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传小于10MB的zip压缩文件，请上传前先下载备份之前的模板.</div>
            </el-upload>
          </el-form-item>


          <el-form-item label="模板列表:">
                <el-table
                :data="list"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="文件名">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="180">
                  <template slot-scope="item">
                    <a :href="path+item.row.title" v-if="item.row.title.toLowerCase().indexOf('zip')!=-1">下载</a>
                    <router-link v-else :to="'/site/website/detail?title='+item.row.title">编辑</router-link>
                  </template>
                </el-table-column>
              </el-table>
          </el-form-item>
          </el-form>


      </el-tab-pane>


      <el-tab-pane label="选择数据模板">
        <el-form
          label-width="100px"
          class="form_box"
        >
          <el-form-item label="数据官网:">
            <el-col :span="18">
              <el-input value="/Index/p/index" :disabled="true"></el-input>
            </el-col>
            <el-col :span="6">
              <el-link href="/Index/p/index" :underline="false" target="_blank">
                <el-button>点击访问</el-button>
              </el-link>
            </el-col>
          </el-form-item>

          <el-form-item label="选择模板:">
              <el-radio-group v-model="radio">
                <el-radio :label="2">
                  demo2模板<br><br>
                  <el-image style="width:200px;" src="/static/index/demo2.jpg"></el-image>
                </el-radio>
                <el-radio :label="3">
                  demo3模板<br><br>
                  <el-image style="width:200px;" src="/static/index/demo3.jpg"></el-image>
                </el-radio>
              </el-radio-group>
          </el-form-item>


          <el-form-item label="默认跳转:">
            <el-radio-group v-model="guanwang_type">
              <el-radio :label="0">数据模板</el-radio>
              <el-radio :label="1">HTML模板</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <div class="paddingl">
              <el-button size="medium" type="primary" @click="submit" :loading="btnloading">提交选择模板</el-button>
            </div>
          </el-form-item>
          </el-form>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      btnloading:false,
      radio: 2,
      guanwang_type:0,
      host:"",//域名
      list: [
      ],//模板文件列表
      headers: {
        't-host': window.my.host,
        't-token': this.utils.session.get('token')
      },
      uploadUrl: window.my.api_url + '/Api/Admin/Website/uploadTpl',//上传接口
      form:{
        'moban_name':'',
        'guanwang_type':'',
      },
      path:"",//路径
      activeNames: ['1'],//说明文字
      docs_url:"",
    };
  },
  async mounted() {
    let shop = this.utils.session.get('shop');
    this.path = "http://"+this.myConfig.host+"/p/"+shop.base_info.id+"/";
    this.docs_url = "http://"+this.myConfig.host+"/indexdocs/index.html";
    this.host = this.path+"index.html";
    await this.getInfo();
    await this.getList();
  },
  methods: {
    async getInfo(){
      let param = {
        data:{},
        url: "/Api/Admin/Shop/getInfo",
      };
      let res = await this.request(param);
      let d = res.result;
      this.radio = Number(d.moban_name.replace("demo",""));
      this.guanwang_type = Number(d.guanwang_type);
    },
    //获取模板列表
    async getList(){
      let param = {
        data:{},
        url: "/Api/Admin/Website/getList",
        type:"get",
      };
      let res = await this.request(param);
      this.list = res.result;
    },
    // 上传成功
    uploadSuccess (response, file, fileList) {
      this.$refs.upload.clearFiles();
      this.utils.success("上传成功");
      if (file.status === 'success') {
        this.getList();
      }
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          let data = this.form;
              data.moban_name = "demo"+this.radio;
              data.guanwang_type = this.guanwang_type;
          let param = {
                data:data,
                url:"/Api/Admin/Shop/setMoban"
              };
          try{
            let res = await this.request(param);
            this.utils.success("操作成功!");
          }finally{
            this.btnloading = false;
          }
        } else {
          return false;
        }
      });
    },
  }
};
</script>
