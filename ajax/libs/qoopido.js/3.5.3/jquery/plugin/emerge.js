/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("jquery/plugins/emerge",e,["../../dom/element/emerge","jquery"])}(function(e,r,t,n,o){"use strict";var c,i=e.jquery||o.jQuery,u=t.pop(),g="emerged",a="demerged",d="".concat(g,".",u),m="".concat(a,".",u);return i.fn[u]=function(e){return this.each(function(){c.create(this,e)})},c=e["dom/element/emerge"].extend({_constructor:function(e,r){var t=this,n=i(e);c._parent._constructor.call(t,e,r),t.on(g,function(e){n.trigger(d,{priority:e.data})}),t.on(a,function(){n.trigger(m)})}})});