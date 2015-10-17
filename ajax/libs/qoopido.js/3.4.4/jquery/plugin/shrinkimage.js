/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(n){window.qoopido.register("jquery/plugins/shrinkimage",n,["../../dom/element/shrinkimage","jquery"])}(function(n,t,e,r,o){"use strict";var i,c=n.jquery||o.jQuery,u=e.pop(),a="queued",g="cached",s="loaded",f="failed",d="".concat(a,".",u),h="".concat(g,".",u),l="".concat(s,".",u),m="".concat(f,".",u);return c.fn[u]=function(n){return this.each(function(){i.create(this,n)})},i=n["dom/element/shrinkimage"].extend({_constructor:function(n,t){var e=this,r=c(n);i._parent._constructor.call(e,n,t),e.on(a,function(){r.trigger(d)}),e.on(g,function(){r.trigger(h)}),e.on(s,function(){r.trigger(l)}),e.on(f,function(){r.trigger(m)})}})});