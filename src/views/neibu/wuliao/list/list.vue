<!-- 列表 -->
<template>
  <div class="list">
    <el-table :data="list">
      <el-table-column width="80" label="ID" prop="id"></el-table-column>
      <el-table-column width="120" label="图片">
        <template slot-scope="item">
           <imgs :img="item.row.pic" :width="60" :height="60"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="编码">
         <template slot-scope="item">
           <span>{{item.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="物料名称">
         <template slot-scope="item">
           <span>{{item.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="价格">
         <template slot-scope="item">
           <span>{{item.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="库存数量">
         <template slot-scope="item">
           <span>{{item.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150"  label="物料名称">
         <template slot-scope="item">
           <span>{{item.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center" label="物料属性名">
        <template slot-scope="item">
           <span>{{item.row.attrs_value}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="备注">
         <template slot-scope="item">
           <span>{{item.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="状态">
         <template slot-scope="item">
           <span v-if="item.row.reg_status==0">未审核</span>
           <span v-if="item.row.reg_status==1">通过审核</span>
            <span v-if="item.row.reg_status==2">驳回审核</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="排序">
        <template slot-scope="item">
            <span>{{item.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="日期">
        <template slot-scope="item">
            <span>{{item.row.create_time}}</span>
        </template>
      </el-table-column>
       
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="item">
          <div v-if="item.row.reg_status!=1">
            <router-link :to="'/neibu/wuliao/edit?id='+item.row.id">编辑</router-link>
            <span class="active marginl20 pointer" @click="Review(item.row)">审核</span>
            <span class="active marginl20 pointer" @click="del(item.row)">删除</span>
          </div>
          
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="审核" top="100px" append-to-body :visible.sync="visible" :before-close="close">
    <el-form :model="form" :rules="rules" ref="form" label-width="110px" >
      <el-form-item label="物料名称">
        <el-input size="medium" disabled v-model="form.title" placeholder="请输入物料名称"></el-input>
      </el-form-item>
      <el-form-item label="物料编码">
        <el-input size="medium" disabled v-model="form.code" placeholder="请输入物料编码"></el-input>
      </el-form-item>
      <el-form-item label="状态描述">
         <textarea style="width:300px;height:60px"  disabled v-model="form.attrs_value" placeholder="请输入状态描述"></textarea>
      </el-form-item>
       <el-form-item label="单位">
         <el-input size="medium" disabled  v-model="form.unit" placeholder="请输入物料编码"></el-input>
      </el-form-item>
       <el-form-item label="备注">
         <textarea style="width:300px;height:60px"  disabled placeholder="请输入备注"  v-model="form.note"></textarea>
      </el-form-item>
      <el-form-item label="审核意见" prop="content">
         <textarea style="width:300px;height:60px" placeholder="请输入审核意见"  v-model="form.content"></textarea>
      </el-form-item>
      <el-form-item>
        <div class="paddingl">
          <el-button size="medium" type="primary" @click="visible=false" :loading="btnloading">返回</el-button>
          <el-button size="medium" type="primary" @click="ReviewBtn(1)" :loading="btnloading">通过</el-button>
          <el-button size="medium" type="primary" @click="ReviewBtn(2)" :loading="btnloading">驳回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import imgs from "components/imgs";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
   components: {
    imgs
  },
  data() {
    return {
      visible:false,
      expandKeys: [],
      form:{
          title:'',
          code:'',
          attrs_value:'',
          unit:'',
          note:'',
          reg_status:'',
          id:'',
          content:'',
      },
      rules:{
          content:[
          {
            required: true,
            message: "请选择物料名称",
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    //删除
    del(row) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let param = {
          data: {
            id: row.id
          },
          url: "/Api/Admin/OaWuliao/del"
        };
        let res = await this.request(param);
        this.utils.success("删除成功!");
        await this.$parent.getList();
      });
    },
    Review(row){
      this.form.title=row.title
      this.form.code=row.code
      this.form.attrs_value=row.attrs_value
      this.form.unit=row.unit
      this.form.note=row.note
      this.form.id=row.id
      this.visible=true
      this.form.content=''
      this.form.reg_status=''
    },
    ReviewBtn(i){
       this.form.reg_status=i
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.btnloading = true;
          try {
           let param = {
              data:this.form,
              url: "/Api/Admin/OaWuliao/regData"
            };
            let res = await this.request(param);
            this.utils.success("审核成功!");
            this.visible=false
            await this.$parent.getList();
          } finally {
            this.btnloading = false;
          }
        } else {
          return false;
        }
      })
    }
  }
};
</script>
