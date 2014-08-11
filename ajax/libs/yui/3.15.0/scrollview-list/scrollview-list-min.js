/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("scrollview-list",function(e,t){function a(){a.superclass.constructor.apply(this,arguments)}var n=e.ClassNameManager.getClassName,r="scrollview",i=n(r,"list"),s=n(r,"item"),o="contentBox",u="host";a.NAME="pluginList",a.NS="list",a.ATTRS={isAttached:{value:!1,validator:e.Lang.isBoolean}},e.namespace("Plugin").ScrollViewList=e.extend(a,e.Plugin.Base,{initializer:function(){this._host=this.get(u),this.afterHostEvent("render",this._addClassesToList)},_addClassesToList:function(){if(!this.get("isAttached")){var e=this._host.get(o),t,n;e.hasChildNodes()&&(t=e.all("> ul"),n=e.all("> ul > li"),t.each(function(e){e.addClass(i)}),n.each(function(e){e.addClass(s)}),this.set("isAttached",!0),this._host.syncUI())}}})},"3.15.0",{requires:["plugin","classnamemanager"],skinnable:!0});
