<template>
  <div class="edit_container ue">
    <!--  新增时输入 -->
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <upload
      v-if="uploadVisible"
      :num="num"
      :visible="uploadVisible"
      @close="uploadClose"
      @submit="uploadSubmit"
    />
    <!-- 从数据库读取展示 -->
    <div v-html="str" class="ql-editor">{{str}}</div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import upload from "components/upload";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  //[{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
  //[{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
  //[{ 'direction': 'rtl' }],             // 文本方向
  //[{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  //[{ 'font': [] }],     //字体
  //[{ 'align': [] }],    //对齐方式
  ["clean"], // 这是自己加的
  ["image", "video"] //上传图片、上传视频
  // ['sourceEditor']
];
export default {
  name: "ue",
  components: {
    quillEditor,
    upload
  },
  data() {
    var that = this;
    return {
      num: 0,
      uploadVisible: false, // 上传
      getSelectionIndex: 0,
      content: ``,
      str: "",
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        // 在使用的页面中初始化按钮样式
        initButton: function() {
          // 样式随便改
          const sourceEditorButton = document.querySelector(".ql-sourceEditor");
          // sourceEditorButton.style.cssText = "font-size:18px";
          // 加了elementui的icon
          // sourceEditorButton.classList.add("el-icon-edit-outline");
          // 鼠标放上去显示的提示文字
          // sourceEditorButton.title = "源码编辑";
        },

        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  that.handleUpload();
                } else {
                  //this.quill.format('image', false);
                }
              },
              shadeBox: null,
              sourceEditor: function() {
                // alert('我新添加的工具方法');
                const container = this.container;
                const firstChild = container.nextElementSibling.firstChild;

                // 在第一次点击源码编辑的时候，会在整个工具条上加一个div，层级比工具条高，再次点击工具条任意位置，就会退出源码编辑。
                // 可以在下面cssText里面加个背景颜色看看效果。

                if (!this.shadeBox) {
                  let shadeBox = (this.shadeBox = document.createElement(
                    "div"
                  ));

                  shadeBox.style.cssText =
                    "position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer";
                  container.style.position = "relative";
                  container.appendChild(shadeBox);
                  firstChild.innerText = firstChild.innerHTML;

                  shadeBox.addEventListener(
                    "click",
                    function() {
                      this.style.display = "none";
                      firstChild.innerHTML = firstChild.innerText.trim();
                    },
                    false
                  );
                } else {
                  this.shadeBox.style.display = "block";
                  firstChild.innerText = firstChild.innerHTML;
                }
              }
            }
          }
        }
      } //编辑器配置
    };
  },
  methods: {
    onEditorReady(editor) {
      console.log(editor);
    }, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {
      //去掉图片前缀
      let data = this.content;
      data = data.replace(new RegExp(window.my.img_url,'g'),"");
      this.$emit("getContent", data);
    }, // 内容改变事件
    setContent(data) {
      //添加上图片前缀
      data = data.replace(window.my.img_url,"");
      data = data.replace(/src=\"/g,"src=\""+window.my.img_url);
      this.content = data;
    },
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    // 上传
    handleUpload() {
      this.uploadVisible = true;
      this.getSelectionIndex = this.$refs.myQuillEditor.quill.getSelection().index;
    },
    // 上传图片 —— close
    uploadClose() {
      this.uploadVisible = false;
    },
    // 上传图片 —— submit
    uploadSubmit(imgs) {
      this.editor.setSelection(this.getSelectionIndex, 0);
      imgs.forEach((e, index) => {
        let position = this.editor.getSelection().index;
        let path = window.my.img_url+e.path;
        this.editor.insertEmbed(position, "image", path);
        this.editor.setSelection(position + 1, 0);
      });
      this.uploadVisible = false;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    this.editorOption.initButton();
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);
  }
};
</script>


<style>
.editor {
  line-height: normal !important;
  margin: 0 auto;
}
.ql-container {
  width: 100% !important;
  height: 300px !important;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
