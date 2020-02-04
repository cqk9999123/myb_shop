<!-- 列表 -->
<template>
  <div class="list"> 
      <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
           {{ data.title }}({{data.code}})
      </span>
      </el-tree>
  </div>
</template>

<script type='text/ecmascript-6'>
// import tree from "components/tree/index";

export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
        
      }
    }
  },
  //  components: {
  //   tree
  // },
  data() {
    return {
       defaultProps: {
          children: 'children',
          label: 'title'
        } 
    };
  },
  methods: {
      handleNodeClick(data) {
        console.log(data);
      }

  }
};
</script>
