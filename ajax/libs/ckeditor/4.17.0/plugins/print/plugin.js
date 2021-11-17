/*
 Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){CKEDITOR.plugins.add("print",{requires:"preview",lang:"af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",icons:"print,",hidpi:!0,init:function(a){a.addCommand("print",CKEDITOR.plugins.print);a.ui.addButton&&a.ui.addButton("Print",{label:a.lang.print.toolbar,command:"print",toolbar:"document,50"})}});
CKEDITOR.plugins.print={exec:function(a){CKEDITOR.plugins.preview.createPreview(a,function(a){a=a.$;CKEDITOR.env.gecko?a.print():a.document.execCommand("Print");a.close()})},canUndo:!1,readOnly:1,modes:{wysiwyg:1}}})();