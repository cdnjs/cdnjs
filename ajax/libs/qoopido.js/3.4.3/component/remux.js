/*!
* Qoopido.js library v3.4.3, 2014-6-11
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.3
* date:    2014-6-11
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(t){var n=["../emitter"];window.matchMedia||n.push("../polyfill/window/matchmedia"),window.qoopido.registerSingleton("component/remux",t,n)}(function(t,n,a,e,i,o){"use strict";function l(t,n){var a=this;return t&&n&&(s.className=t,s.style.fontSize=n+"px",d.layout=t,d.fontsize=n,(m.fontsize!==d.fontsize||m.layout!==d.layout)&&(d.ratio.device=i.devicePixelRatio||1,d.ratio.fontsize=d.fontsize/c,d.ratio.total=d.ratio.device*d.ratio.fontsize,m.layout!==d.layout&&a.emit("layoutchanged",d),m.fontsize!==d.fontsize&&a.emit("fontsizechanged",d),a.emit("statechanged",d),m.fontsize=d.fontsize,m.layout=d.layout)),a}function r(t,n,a,e,o){var r=this,u=i.matchMedia(t);u.layout=n,u.fontsize=a,u.min=e,u.max=o,f.push(u),u.addListener(function(t){t.matches===!0&&l.call(r,t.layout,t.fontsize)})}var u,s=o.getElementsByTagName("html")[0],c=16,d={fontsize:null,layout:null,ratio:{}},m={fontsize:null,layout:null},f=[];return u=t.emitter.extend({_constructor:function(){var t=this,n=parseInt(s.getAttribute("data-base"),10);u._parent._constructor.call(t),isNaN(n)===!1&&(c=n)},getState:function(){return d},getLayout:function(){return d.layout},getFontsize:function(){return d.fontsize},setLayout:function(t,n){var a=this;return l.call(a,t,n),a},addLayout:function(t,n){var a,e,i,o,u,s,d,m,h,y,z=this;arguments.length>1?(a={},a[t]=n):a=arguments[0];for(e in a)for(i=a[e],d=Math.round(i.width*(i.min/c)),m=Math.round(i.width*(i.max/c))-1,h="screen and (min-width: "+d+"px) and (max-width: "+m+"px )",r.call(z,h,e,null,d,m),o=i.min;o<=i.max;o++)d=Math.round(i.width*(o/c)),m=Math.round(i.width*((o+1)/c))-1,h="screen and (min-width: "+d+"px) and (max-width: "+m+"px )",r.call(z,h,e,o,d,m),u=!u||d<=u.min?f[f.length-1]:u,s=!s||m>=s.max?f[f.length-1]:s;r.call(z,"screen and (max-width: "+(u.min-1)+"px)",u.layout,u.fontsize,u.min,u.max),r.call(z,"screen and (min-width: "+(s.max+1)+"px)",s.layout,s.fontsize,s.min,s.max);for(var x in f)y=f[x],y.matches===!0&&l.call(z,y.layout,y.fontsize);return z}})});