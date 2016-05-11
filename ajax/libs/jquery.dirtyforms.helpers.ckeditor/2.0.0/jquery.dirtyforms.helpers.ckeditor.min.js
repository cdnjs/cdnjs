/*!
CkEditor helper module (for jQuery Dirty Forms) | v2.0.0 | github.com/snikch/jquery.dirtyforms
(c) 2012-2015 Mal Curtis
License MIT
*/
!function(n,e,t,r){var i=".cke_dialog_ui_button,.cke_tpl_list a",c={ignoreSelector:i,isDirty:function(n){var e=s(n),t=!1;return e.length>0&&e.each(function(n){return this.checkDirty()?(t=!0,!1):void 0}),t},setClean:function(n){s(n).each(function(){this.resetDirty()})},ignoreAnchorSelector:i},s=function(t){var r=t.jquery?t:n(t),i=[];if(!e.CKEDITOR||!e.CKEDITOR.instances)return n(i);try{for(var c in e.CKEDITOR.instances)if(e.CKEDITOR.instances.hasOwnProperty(c)){var s=e.CKEDITOR.instances[c];-1!=n(s.element.$).parents().index(r)&&i.push(s)}}catch(o){}return n(i)};n.DirtyForms.helpers.push(c)}(jQuery,window,document);
//# sourceMappingURL=jquery.dirtyforms.helpers.ckeditor.min.js.map
