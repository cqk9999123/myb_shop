<template>
  <section class="edit">
    <back />
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="form_box"
    >
      <el-form-item label="属性类别:" prop="title">
        <el-input v-model="form.title" placeholder="请输入属性类别" clearable></el-input>
      </el-form-item>
      <el-form-item label="添加属性:" prop="data">
        <el-button size="mini" type="primary" @click="myadd">添加属性</el-button>
      </el-form-item>
      <el-form-item label="" prop="content" v-if="tableData.length > 0">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="title" label="属性名称" width="180"></el-table-column>
          <el-table-column label="属性值">
            <template slot-scope="scope">
              <span v-if="typeof(scope.row.content) == 'string'">{{scope.row.content}}</span>
              <div v-else>
                <span v-for="(item, index) in scope.row.content" :key="index">{{item}}，</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="60">
            <template slot-scope="scope">
              <span class="a" @click="del(scope.row.title)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="submit" :loading="btnloading">立即修改</el-button>
          <el-button size="medium" @click="reset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
    <myadd ref="myadd" />
  </section>
</template>

<script type='text/ecmascript-6'>
import back from "components/back";
import myadd from "./add";

export default {
  name: "edit",
  components: {
    back,
    myadd
  },
  data() {
    return {
      btnloading: false,
      visible: false, // 添加属性
      rules: {
        title: [
          {
            required: true,
            message: "请输入属性类别",
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      form: {
        id: "",
        title: "",
        data: ""
      }
    };
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getInfo();
  },
  methods: {
    // 添加属性
    myadd() {
      this.$refs.myadd.init();
    },
    // 添加属性
    choose(data) {
      let check = true;
      this.tableData.forEach((e, i) => {
        if (e.title === data.title) {
          check = false;
        }
      });
      if (check) {
        this.tableData.push(data);
      } else {
        this.$message({
          message: "属性名称已存在",
          type: "warning"
        });
      }
    },
    // 删除
    del(title) {
      this.$confirm("确认删除" + title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.forEach((e, i) => {
            if (e.title === title) {
              this.tableData.splice(i, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    // 获取信息
    async getInfo() {
      let param = {
        data: {
          id: this.form.id
        },
        url: "/Api/Admin/GoodsSpecCat/getInfo"
      };
      let res = await this.request(param);
      let result = res.result;
      let obj = result.goods_spec;
      for (let i in obj) {
        let o = {
          title: i,
          content: obj[i]
        };
        this.tableData.push(o);
      }
      this.form = {
        id: this.$route.query.id,
        title: result.title,
        data: ""
      };
    },
    // 删除
    del(title) {
      this.$confirm("确认删除" + title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.forEach((e, i) => {
            if (e.title === title) {
              this.tableData.splice(i, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //提交
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
            let data = this.form;
            let arr = this.tableData;
            let obj = {};
            for (var i = 0; i < arr.length; i++) {
              obj[arr[i].title] = arr[i].content;
            }
            data.data = obj;
            let param = {
              data:data,
              url : "/Api/Admin/GoodsSpecCat/edit"
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
    //重置
    reset() {
      this.tableData = [];
      this.$refs.form.resetFields();
    }
  }
};
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var';
</style>
