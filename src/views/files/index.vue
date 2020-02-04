<!-- 图片空间 -->
<template>
  <div class='files flex'>
    <tree
      class="w200"
      v-loading="treeLoading"
      :tree="tree"
      :expandAll="true"
      @node="node"
      @load="load"
    />
    <contents
      v-if="isContent"
      class="paddingl16 paddingt16"
      :loading="contenLoading"
      :tree="tree"
      :foldes="folder"
      :imgs="imgs"
      :id="form.id"
      :nodeData="nodeData"
      @uploadRefresh="getList"
      @folderRefresh="getInfo"
      @files="files"
    />
  </div>
</template>

<script type='text/ecmascript-6'>
import tree from './components/tree'
import contents from './components/content'
export default {
  name: 'files',
  components: {
    tree, contents
  },
  data () {
    return {
      treeLoading: false,
      contenLoading: false,
      isContent: true, // 用于是否展示内容区块（解决 CheckBox 选中 bug）
      form: {
        id: 0
      },
      tree: [],
      folder: [],
      imgs: [],
      nodeData: {} // 用于存储节点数据
    };
  },
  mounted () {
    this.load();
  },
  methods: {
    // 加载全部图片
    async load (id) {
      this.nodeData = {};
      if (id === 0) this.form.id = id;
      await this.getInfo();
      await this.getList();
    },
    // 获取树形结构数据
    async getInfo () {
      this.treeLoading = true;
      try{
        let param = {
          data:{
            type:'tree',
            id:0,
          },
          url:"/Api/Admin/Files/allList",
        };
        let res = await this.request(param);
        let arr = res.result;
        this.tree = this.utils.changeJsonKey(arr, 'title', 'label');
      }finally{
        this.treeLoading = false;
      }
    },
    // 获取列表数据
    async getList () {
      this.contenLoading = true;
      try{
        let param = {
          url:"/Api/Admin/Files/getList",
          data:this.form,
        };
        let res = await this.request(param);
        let result = res.result.info;
        let folder = result.folder;
        folder.forEach(item => {
          item['flag'] = false;
        });
        this.folder = folder;
        this.imgs = result.image;
      }finally{
        this.contenLoading = false;
      }
    },
    // 获取节点数据
    node (data) {
      this.nodeData = data;
      this.isContent = false;
      this.$nextTick(() => {
        this.isContent = true;
      });
      this.form.id = data.id;
      this.getList();
    },
    // + 获取选中的图片
    files (imgs, folder) {
      this.$emit('files', imgs, folder);
    }
  }
};
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
@import '~stylus/var'
.files {
  .w200 {
    flex 0 0 200px
    width 200px
  }
  >>> {
    .el-tree {
      overflow-y auto
      overflow-x auto
      // 16*2 + 24*2 + 32 + 20 + 50 = 182
      height calc(100vh - 142px)
    }
  }
}
</style>
