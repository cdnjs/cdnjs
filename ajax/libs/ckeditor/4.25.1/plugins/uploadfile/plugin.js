/*
 Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 CKEditor 4 LTS ("Long Term Support") is available under the terms of the Extended Support Model.
*/
(function(){CKEDITOR.plugins.add("uploadfile",{requires:"uploadwidget,link",init:function(a){if(this.isSupportedEnvironment()){var b=CKEDITOR.fileTools;b.getUploadUrl(a.config)?b.addUploadWidget(a,"uploadfile",{uploadUrl:b.getUploadUrl(a.config),fileToElement:function(c){var a=new CKEDITOR.dom.element("a");a.setText(c.name);a.setAttribute("href","#");return a},onUploaded:function(a){this.replaceWith('\x3ca href\x3d"'+a.url+'" target\x3d"_blank"\x3e'+a.fileName+"\x3c/a\x3e")}}):CKEDITOR.error("uploadfile-config")}},
isSupportedEnvironment:function(){return CKEDITOR.plugins.clipboard.isFileApiSupported}})})();