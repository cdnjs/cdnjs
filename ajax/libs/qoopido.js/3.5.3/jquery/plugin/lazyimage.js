/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("jquery/plugins/lazyimage",e,["../../dom/element/lazyimage","jquery"])}(function(e,n,t,r,o){"use strict";var i,c=e.jquery||o.jQuery,u=t.pop(),a="requested",s="loaded",g="".concat(a,".",u),l="".concat(s,".",u);return c.fn[u]=function(e){return this.each(function(){i.create(this,e)})},i=e["dom/element/lazyimage"].extend({_constructor:function(e,n){var t=this,r=c(e);i._parent._constructor.call(t,e,n),t.on(a,function(){r.trigger(g)}),t.on(s,function(){r.trigger(l)})}})});