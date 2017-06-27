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
!function(t){var n=["../emitter"];window.matchMedia||n.push("../polyfill/window/matchmedia"),window.qoopido.registerSingleton("component/remux",t,n)}(function(t,n,e,a,i,o){"use strict";function r(t,n){var e=this;return t&&n&&(s.className=t,s.style.fontSize=n+"px",f.layout=t,f.fontsize=n,(m.fontsize!==f.fontsize||m.layout!==f.layout)&&(f.ratio.device=i.devicePixelRatio||1,f.ratio.fontsize=f.fontsize/c,f.ratio.total=f.ratio.device*f.ratio.fontsize,m.layout!==f.layout&&e.emit("layoutchanged",f),m.fontsize!==f.fontsize&&e.emit("fontsizechanged",f),e.emit("statechanged",f),m.fontsize=f.fontsize,m.layout=f.layout)),e}function u(t,n,e,a,o){var u=this,l=i.matchMedia(t);l.layout=n,l.fontsize=e,l.min=a,l.max=o,d.push(l),l.addListener(function(t){t.matches===!0&&r.call(u,t.layout,t.fontsize)})}var l,s=o.getElementsByTagName("html")[0],c=16,f={fontsize:null,layout:null,ratio:{}},m={fontsize:null,layout:null},d=[];return l=t.emitter.extend({_constructor:function(){var t=this,n=parseInt(s.getAttribute("data-base"),10);l._parent._constructor.call(t),isNaN(n)===!1&&(c=n)},getState:function(){return f},getLayout:function(){return f.layout},getFontsize:function(){return f.fontsize},setLayout:function(t,n){var e=this;return r.call(e,t,n),e},addLayout:function(t,n){var e,a,i,o,l,s,f,m,h,y,z=this;arguments.length>1?(e={},e[t]=n):e=arguments[0];for(a in e)for(i=e[a],o=i.min;o<=i.max;o++)f=Math.round(i.width*(o/c)),m=Math.round(i.width*((o+1)/c))-1,h="screen and (min-width: "+f+"px) and (max-width: "+m+"px )",u.call(z,h,a,o,f,m),l=!l||f<=l.min?d[d.length-1]:l,s=!s||m>=s.max?d[d.length-1]:s;u.call(z,"screen and (max-width: "+(l.min-1)+"px)",l.layout,l.fontsize,l.min,l.max),u.call(z,"screen and (min-width: "+(s.max+1)+"px)",s.layout,s.fontsize,s.min,s.max);for(var g in d)y=d[g],y.matches===!0&&r.call(z,y.layout,y.fontsize);return z}})});