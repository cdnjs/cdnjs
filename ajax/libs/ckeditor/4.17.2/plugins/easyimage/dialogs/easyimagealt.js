/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("easyimageAlt",function(b){return{title:b.lang.easyimage.commands.altText,minWidth:200,minHeight:30,getModel:function(){var a=b.widgets.focused;return a&&"easyimage"==a.name?a:null},onOk:function(){var a=CKEDITOR.tools.trim(this.getValueOf("info","txtAlt")),c=this.getModel(b);c&&c.parts.image.setAttribute("alt",a)},onShow:function(){var a=this.getContentElement("info","txtAlt"),c=this.getModel(b);c&&a.setValue(c.parts.image.getAttribute("alt"));a.focus()},contents:[{id:"info",
label:b.lang.easyimage.commands.altText,accessKey:"I",elements:[{type:"text",id:"txtAlt",label:b.lang.easyimage.commands.altText}]}]}});