if(hpp_ver == 'HexoPlusPlus@0.0.3'){
  swal({
title: "成功",
    text: "无需更新，当前已是最新版本",
    icon: "success",
});
}else{
   swal({
title: "成功",
    text: "需要更新，点击确定获取最新代码",
    icon: "warning"})
	.then(() => {
location.href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@main/index.js"
})
}
