<template>
  <section class="edit">
    <back />
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form_box">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="会员类型">
        <el-select size="small" v-model="form.level" placeholder="请选择会员类型">
          <el-option
            v-for="item in myConfig.type.user_level"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级会员" prop="goods_brand_id">
        <span class="active pointer" @click="selectUserOneClick">选择会员</span>
        <el-tag
          :key="userName"
          closable
          type="info"
          :disable-transitions="false"
          @close="selectUserOneClose(user_id)" v-if="user_id">
            已选择:{{userName}}
          </el-tag>
        <selectUserOne ref="selectUserOne" @selectUserOne="selectUserOne" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
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
import selectUserOne from "components/selectUserOne";
export default {
  name: "edit",
  components: {
    back,
    pic,
    selectUserOne
  },
  data() {
    return {
      btnloading: false,
      user_id:0,
      e_ids:[],//排除IDS
      userName:"",
      form: {
        name: "",
        username: "",
        phone: "",
        id: 0,
        parent_id:0,
        level:0,
      },
      picArr: [],
      rules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
        phone: {
          required: true,
          message: "请输入联系电话",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    this.getInfo(this.$route.query.id);
  },
  methods: {
    //选择用户按钮
    selectUserOneClick() {
      let e_ids = this.e_ids;
      this.$refs.selectUserOne.init(e_ids);
    },
    selectUserOne(user){
      this.user_id = user.id;
      this.userName = user.username+user.phone;
      this.form.parent_id = user.id;
    },
    selectUserOneClose(userName){
      this.user_id = 0;
      this.userName = "";
      this.form.parent_id = 0;
    },
    //获取数据
    getInfo(id) {
      let data = {
        id: id
      };
      this.request({
        url: "/Api/Admin/User/getInfo",
        method: "post",
        data
      })
        .then(res => {
          this.form = {
            id:id,
            username: res.result.username,
            phone: res.result.phone,
            name: res.result.name,
            parent_id:res.result.parent_id,
            level:res.result.level,
          };
          if(res.result.parent_user){
            this.user_id = res.result.parent_user['id'];
            this.userName = res.result.parent_user['username'] + res.result.parent_user['phone'];
          }
          this.e_ids.push(res.result.parent_id);
          this.e_ids.push(res.result.id);
          res.result.son_user.forEach((e,i)=>{
              this.e_ids.push(e.id);
          });
        })
        .catch(err => {});
    },
    //提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.btnloading = true;
          let data = this.form;
          this.request({
            url: "/Api/Admin/User/edit",
            method: "post",
            data
          })
            .then(res => {
              if (res.code == 200) {
                this.utils.success("修改成功!", -1);
              }
              this.btnloading = false;
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
    //重置
    reset() {
      this.picArr = [];
      this.getInfo(this.$route.query.id);
    }
  }
};
</script>
