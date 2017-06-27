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
!function(e){window.qoopido.register("polyfill/window/matchmedia",e)}(function(e,t,i,n,s,l){"use strict";if(!s.matchMedia){var r=l,a=r.documentElement,c=[],o=0,d="",m={},h=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,p=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,u=0,f=function(e){var t=-1!==e.indexOf(",")&&e.split(",")||[e],i=t.length-1,n=i,s=null,l=null,r="",a=0,c=!1,o="",u="",f=null,x=0,v=0,g=null,w="",y="",b="",q="",z="",C=!1;if(""===e)return!0;do if(s=t[n-i],c=!1,l=s.match(h),l&&(r=l[0],a=l.index),!l||-1===s.substring(0,a).indexOf("(")&&(a||!l[3]&&r!==l.input))C=!1;else{if(u=s,c="not"===l[1],a||(o=l[2],u=s.substring(r.length)),C=o===d||"all"===o||""===o,f=-1!==u.indexOf(" and ")&&u.split(" and ")||[u],x=f.length-1,v=x,C&&x>=0&&""!==u)do{if(g=f[x].match(p),!g||!m[g[3]]){C=!1;break}if(w=g[2],y=g[5],q=y,b=g[7],z=m[g[3]],b&&(q="px"===b?Number(y):"em"===b||"rem"===b?16*y:g[8]?(y/g[8]).toFixed(2):"dppx"===b?96*y:"dpcm"===b?.3937*y:Number(y)),C="min-"===w&&q?z>=q:"max-"===w&&q?q>=z:q?z===q:!!z,!C)break}while(x--);if(C)break}while(i--);return c?!C:C},x=function(){var e=s.innerWidth||a.clientWidth,t=s.innerHeight||a.clientHeight,i=s.screen.width,n=s.screen.height,l=s.screen.colorDepth,r=s.devicePixelRatio;m.width=e,m.height=t,m["aspect-ratio"]=(e/t).toFixed(2),m["device-width"]=i,m["device-height"]=n,m["device-aspect-ratio"]=(i/n).toFixed(2),m.color=l,m["color-index"]=Math.pow(2,l),m.orientation=t>=e?"portrait":"landscape",m.resolution=r&&96*r||s.screen.deviceXDPI||96,m["device-pixel-ratio"]=r||1},v=function(){clearTimeout(u),u=setTimeout(function(){var e=null,t=o-1,i=t,n=!1;if(t>=0){x();do if(e=c[i-t],e&&(n=f(e.mql.media),(n&&!e.mql.matches||!n&&e.mql.matches)&&(e.mql.matches=n,e.listeners)))for(var l=0,r=e.listeners.length;r>l;l++)e.listeners[l]&&e.listeners[l].call(s,e.mql);while(t--)}},10)},g=function(){var e=r.getElementsByTagName("head")[0],t=r.createElement("style"),i=null,n=["screen","print","speech","projection","handheld","tv","braille","embossed","tty"],l=0,a=n.length,c="#mediamatchjs { position: relative; z-index: 0; }",o="",m=s.addEventListener||(o="on")&&s.attachEvent;for(t.type="text/css",t.id="mediamatchjs",e.appendChild(t),i=s.getComputedStyle&&s.getComputedStyle(t)||t.currentStyle;a>l;l++)c+="@media "+n[l]+" { #mediamatchjs { position: relative; z-index: "+l+" } }";t.styleSheet?t.styleSheet.cssText=c:t.textContent=c,d=n[1*i.zIndex||0],e.removeChild(t),x(),m(o+"resize",v),m(o+"orientationchange",v)};g(),s.matchMedia=function(e){var t=o,i={matches:!1,media:e,addListener:function(e){c[t].listeners||(c[t].listeners=[]),e&&c[t].listeners.push(e)},removeListener:function(e){var i=c[t],n=0,s=0;if(i)for(s=i.listeners.length;s>n;n++)i.listeners[n]===e&&i.listeners.splice(n,1)}};return""===e?(i.matches=!0,i):(i.matches=f(e),o=c.push({mql:i,listeners:null}),i)}}return s.matchMedia});