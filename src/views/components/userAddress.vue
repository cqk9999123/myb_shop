<!-- 列表 -->
<template>
  <div>
    <el-drawer
      title="选择地址"
      size="50%"
      ref="dailog"
      @open="handleOpen"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="demo-drawer__content">
        <el-form class="w90" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="联系人" prop="sh_name">
          <el-input v-model="form.sh_name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="sh_phone">
          <el-input v-model="form.sh_phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="district_id">
          <el-cascader v-model="form.district_id" style="width: 60%" :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="paddingl">
            <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
          </div>
        </el-form-item>
        </el-form>

          <el-row >
              <el-col :span="22" :offset="1">
                  <el-table :data="list" v-loading="loading" border>
                    <el-table-column width="80" label="ID" prop="id"></el-table-column>
                    <el-table-column prop="all_address" label="地址"></el-table-column>
                    <el-table-column  width="100" fixed="right" label="操作" align="center" >
                      <template slot-scope="item">
                        <span class="active pointer" @click="choose(item.row)">选择</span>
                      </template>
                    </el-table-column>
                  </el-table>
              </el-col>
              <el-col :span="22" :offset="1">
                <aside class="paddingt20">
                  <page
                    :total="total"
                    :pages="page"
                    :page_size="page_size"
                    @pageSize="pageSize"
                    @page="pageAction"
                  />
                </aside>
              </el-col>
          </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script type='text/ecmascript-6'>
import area from '@/utils/area'
import page from "components/page";
export default {
  components: {
    page,
  },
  data() {
    return {
      btnloading: false,
      loading:false,
      drawer: false,
      direction: "rtl",
      form: {
        user_id: 0,
        sh_name: "",
        sh_phone: "",
        province_id: "",
        city_id: "",
        district_id: "",
        address: "",
      },
      page: 1,
      page_size: 10,
      options: area,
      total:0,
      list:[],// 地址列表
      rules: {
        sh_phone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          }
        ],
        sh_name: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }
        ],
        district_id: [
          {
            required: true,
            message: "请选择地区",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //打开
    handleOpen() {
      //console.log('open');
    },
    //获取列表
    getList(){
      this.loading = true;
      this.request({
        url: "/Api/Admin/UserAddress/getByUserId",
        method: "get",
        params: {
          user_id:this.form.user_id,
          page:this.page,
          page_size:this.page_size,
        }
        })
        .then(res => {
          const code = parseInt(res.code);
          if (code === 200) {
            let list = res.result.list;
            let total = res.result.total;
            this.list = list;
            this.total = total;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    //选择地址
    choose(item){
      this.$emit("selectAddress", item);
      this.drawer = false;
    },
    //提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addrShow = false;
          this.btnloading = true;
          let data = this.form;
          this.request({
            url: "/Api/Admin/UserAddress/add",
            method: "post",
            data
          })
            .then(res => {
              this.$message({
                message: "操作成功!",
                type: "success"
              });
              this.btnloading = false;
              this.addrShow = false;
              this.getList();
            })
            .catch(err => {
              this.btnloading = false;
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    },
    // 分页条数
    pageSize(size) {
      this.page_size = size;
      this.resetRoute();
    },
    // 分页页数
    pageAction(page) {
      this.page = page;
      this.resetRoute();
    },
    // 重置路由
    resetRoute() {
      let query = this.form;
      query.t = Date.now();
      this.$router.push({ query: query });
    },
    handleChange(value) {
      this.form.province_id = value[0];
      this.form.city_id = value[1];
      this.form.district_id = value[2];
    },
    //重置
    reset(user_id=0,name='',phone='') {
        this.form = {
          user_id:user_id,
          sh_name:name,
          sh_phone:phone,
          province_id: "",
          city_id: "",
          district_id: "",
          address: "",
        };
        this.drawer = true;
        this.$nextTick(function () {
          this.$refs.form.resetFields();
        });
        this.getList();
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
.el-drawer {
  height: auto !important;
  overflow: auto !important;
}

>>> {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-drawer__body {
    overflow-y: auto;
  }
}
</style>
