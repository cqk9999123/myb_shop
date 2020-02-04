// 删除图片(num为1表示单个，否则为多个)
export async function delImg(_this, id, callback, num) {
  let data = {};
  if (num === 1) {
    let ids = [];
    ids.push(id);
    data = {ids: ids}
  } else {
    data = {ids: id}
  }
  let param = {
    data:data,
    url:"/Api/Admin/Files/del",
  };
  let res = await _this.request(param);
  callback && callback(res)
  _this.$message({ message: res.msg, type: 'success'});
}
