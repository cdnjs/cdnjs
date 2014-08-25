/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("node-style",function(e,t){(function(e){e.mix(e.Node.prototype,{setStyle:function(t,n){return e.DOM.setStyle(this._node,t,n),this},setStyles:function(t){return e.DOM.setStyles(this._node,t),this},getStyle:function(t){return e.DOM.getStyle(this._node,t)},getComputedStyle:function(t){return e.DOM.getComputedStyle(this._node,t)}}),e.NodeList.importMethod(e.Node.prototype,["getStyle","getComputedStyle","setStyle","setStyles"])})(e);var n=e.Node;e.mix(n.prototype,{show:function(e){return e=arguments[arguments.length-1],this.toggleView(!0,e),this},_show:function(){this.removeAttribute("hidden"),this.setStyle("display","")},_isHidden:function(){return this.hasAttribute("hidden")||e.DOM.getComputedStyle(this._node,"display")==="none"},toggleView:function(e,t){return this._toggleView.apply(this,arguments),this},_toggleView:function(e,t){return t=arguments[arguments.length-1],typeof e!="boolean"&&(e=this._isHidden()?1:0),e?this._show():this._hide(),typeof t=="function"&&t.call(this),this},hide:function(e){return e=arguments[arguments.length-1],this.toggleView(!1,e),this},_hide:function(){this.setAttribute("hidden","hidden"),this.setStyle("display","none")}}),e.NodeList.importMethod(e.Node.prototype,["show","hide","toggleView"])},"3.15.0",{requires:["dom-style","node-base"]});
