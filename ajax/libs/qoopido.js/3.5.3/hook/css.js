/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){var e=["../base","../support"];window.getComputedStyle||e.push("../polyfill/window/getcomputedstyle"),window.qoopido.registerSingleton("hook/css",t,e)}(function(t,e,o,n,r){"use strict";var i=t.support,l=r.getComputedStyle||t["polyfill/window/getcomputedstyle"],u={general:{get:function(t,e){return l(t,null).getPropertyValue(e)},set:function(t,e,o){t.style[e]=o}},opacity:i.supportsCssProperty("opacity")?null:{regex:new RegExp("alpha\\(opacity=(.*)\\)","i"),get:function(t,e,o){return o=l(t,null).getPropertyValue("filter").toString().match(this.regex),o=o?o[1]/100:1},set:function(t,e,o){var n=t.style;n.zoom=1,n.filter="alpha(opacity="+(100*o+.5>>0)+")"}}};return t.base.extend({add:function(t,e){return t&&e&&u[t]&&(u[t]=e),this},get:function(t){return t&&u[t]?u[t]:null},process:function(t,e,o,n){var r;return o=i.getCssProperty(o,e)[1]||null,o?((r=this.get(o))&&r[t]||this.get("general")[t])(e,o,n):void 0}})});