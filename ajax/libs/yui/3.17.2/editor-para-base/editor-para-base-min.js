/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("editor-para-base",function(e,t){var n=function(){n.superclass.constructor.apply(this,arguments)},r="host",i="> p",s="p",o="<br>";e.extend(n,e.Base,{_getRoot:function(){return this.get(r).getInstance().EditorSelection.ROOT},_fixFirstPara:function(){var e=this.get(r),t=e.getInstance(),n,u,a=this._getRoot(),f=a.getHTML(),l=f.length?!0:!1;f===o&&(f="",l=!1),a.setHTML("<"+s+">"+f+t.EditorSelection.CURSOR+"</"+s+">"),u=a.one(i),n=new t.EditorSelection,n.selectNode(u,!0,l)},_afterEditorReady:function(){var e=this.get(r),t=e.getInstance(),n;t&&(t.EditorSelection.filterBlocks(),n=t.EditorSelection.DEFAULT_BLOCK_TAG,i="> "+n,s=n)},_afterContentChange:function(){var e=this.get(r),t=e.getInstance();t&&t.EditorSelection&&t.EditorSelection.filterBlocks()},_afterPaste:function(){var t=this.get(r),n=t.getInstance();e.later(50,t,function(){n.EditorSelection.filterBlocks()})},initializer:function(){var t=this.get(r);if(t.editorBR){e.error("Can not plug EditorPara and EditorBR at the same time.");return}t.after("ready",e.bind(this._afterEditorReady,this)),t.after("contentChange",e.bind(this._afterContentChange,this)),e.Env.webkit&&t.after("dom:paste",e.bind(this._afterPaste,this))}},{NAME:"editorParaBase",NS:"editorParaBase",ATTRS:{host:{value:!1}}}),e.namespace("Plugin"),e.Plugin.EditorParaBase=n},"3.17.2",{requires:["editor-base"]});
