<template>
  <div>
    <el-dialog title="添加地址" :visible.sync="addrShow" width="30%">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
        <el-form-item label="联系人" prop="sh_name">
          <el-input v-model="form.sh_name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="sh_phone">
          <el-input v-model="form.sh_phone" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="area">
          <el-cascader ref="myCascader" :options="options" @change="selAddr"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail_address">
          <el-input v-model="form.detail_address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="paddingl">
            <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即添加</el-button>
            <el-button size="medium" @click="reset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import area from "@/utils/area";
export default {
  name: "addAddr",
  data() {
    return {
      btnloading: false,
      addrShow: false,
      form: {
        sh_name: "",
        sh_phone: "",
        detail_address: "",
        // province_id: 110000,
        // city_id: 110100,
        // district_id: 110101,
        street:'',
        user_id:0,
        is_default: 1
      },
      options: area,
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
        detail_address: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
  },
  methods: {
    //提交
    submit() {
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
          this.$parent.getInfo(this.form.user_id);
        })
        .catch(err => {
          this.btnloading = false;
        });
    },
    reset(id) {
      this.addrShow = true;
      this.form.user_id = id;
      this.getAddr();
    },
    //获取地址
    getAddr() {},
    selAddr(value) {
      let rs = this.$refs.myCascader.getCheckedNodes();
      this.form.province = rs[0].pathLabels[0];
      this.form.city = rs[0].pathLabels[1];
      this.form.district = rs[0].pathLabels[2];
    }
  }
};
</script>