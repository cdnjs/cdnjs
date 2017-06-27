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
!function(e){window.qoopido.register("jquery/plugins/lazyimage",e,["../../dom/element/lazyimage","jquery"])}(function(e,n,t,r,o){"use strict";var i,c=e.jquery||o.jQuery,u=t.pop(),a="requested",s="loaded",g="".concat(a,".",u),l="".concat(s,".",u);return c.fn[u]=function(e){return this.each(function(){i.create(this,e)})},i=e["dom/element/lazyimage"].extend({_constructor:function(e,n){var t=this,r=c(e);i._parent._constructor.call(t,e,n),t.on(a,function(){r.trigger(g)}),t.on(s,function(){r.trigger(l)})}})});