/*
 Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 CKEditor 4 LTS ("Long Term Support") is available under the terms of the Extended Support Model.
*/
CKEDITOR.dialog.add("placeholder",function(a){var b=a.lang.placeholder;a=a.lang.common.generalTab;return{title:b.title,minWidth:300,minHeight:80,contents:[{id:"info",label:a,title:a,elements:[{id:"name",type:"text",style:"width: 100%;",label:b.name,"default":"",required:!0,validate:CKEDITOR.dialog.validate.regex(/^[^\[\]<>]+$/,b.invalidName),setup:function(a){this.setValue(a.data.name)},commit:function(a){a.setData("name",this.getValue())}}]}]}});