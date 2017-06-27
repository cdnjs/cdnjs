!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("Vue")):"function"==typeof define&&define.amd?define(["Vue"],t):"object"==typeof exports?exports.VueMaterialComponents=t(require("Vue")):e.VueMaterialComponents=t(e.Vue)}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports
var i=n[r]={exports:{},id:r,loaded:!1}
return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={}
return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict"
var r=n(1),i=n(3),o=n(10)
e.exports={install:function(e){for(var t in r["default"])e.component(t,r["default"][t])
for(var n in i["default"])e.directive(n,r["default"][n])},components:r["default"],directives:i["default"],mixins:o["default"]}},function(e,t,n){"use strict"
var r=r||n(2),i=n(3),o=n(10),a=n(18),l=n(21),s=n(25),c=n(27),u=n(35),d=n(37),f=n(39),p=n(41),v=n(43),h=n(45),y=n(47),g=n(49),m=n(51),b=n(53),w=n(55),x=n(57),P=n(59),O=n(58),j=n(64),S=n(66),C=n(68),R=n(70),q=n(72),k=n(74),_=n(76),T=n(78),V=n(80),A=n(82),$=n(22),W=n(84),E=n(86),M=n(89),B=n(91),L=n(93),z=n(28),I=n(95),N=n(29),F=n(30),D=n(97),H=n(99),Y=n(101),X=n(103),Q=n(105)
n(107)
var G={mdBadge:a["default"],mdButton:l["default"],mdBtn:s["default"],mdBreadcrumbs:c["default"],mdCard:u["default"],mdCheckbox:d["default"],mdCheckboxGroup:f["default"],mdChip:p["default"],mdCircularPreloader:v["default"],mdCollapsible:h["default"],mdCollapsibleItem:y["default"],mdCollection:g["default"],mdCollectionList:m["default"],mdCollectionItem:b["default"],mdCollectionListItem:w["default"],mdDropdown:x["default"],mdDropdownItem:P["default"],mdDropdownList:O["default"],mdEventWrapper:j["default"],mdFab:S["default"],mdFileInput:C["default"],mdInput:R["default"],mdOptgroup:q["default"],mdOption:k["default"],mdRadio:_["default"],mdRadioGroup:T["default"],mdSelect:V["default"],mdTextarea:A["default"],mdIcon:$["default"],mdImage:W["default"],mdLeanOverlay:E["default"],mdLinearPreloader:M["default"],mdModal:B["default"],mdNavItem:L["default"],mdNavbar:z["default"],mdPagination:I["default"],mdSidenav:N["default"],mdSidenavOverlay:F["default"],mdSlide:D["default"],mdSlider:H["default"],mdSwitch:Y["default"],mdTab:X["default"],mdTabs:Q["default"]}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=G
var U={components:G,directives:i["default"],mixins:o["default"]}
t.BaseComponent=r.extend(U)},function(t,n){t.exports=e},function(e,t,n){"use strict"
var r=n(4),i=n(5),o=n(6),a=n(7),l=n(8),s={bindBoolean:r["default"],bindRaw:i["default"],bindClickAway:o["default"],slot:a["default"],waveEffect:l["default"]}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t){"use strict"
var n={priority:850,update:function(e){var t=this.arg
e?this.el.setAttribute(t,t):this.el.removeAttribute(t)}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t){"use strict"
var n={priority:750,bind:function(){this.attribute=this.arg},update:function(e){var t=this.el
"value"==this.attribute?t.value=e:t.setAttribute(this.attribute,e)}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t,n){"use strict"
var r=r||n(2),i={acceptStatement:!0,update:function(e){this.reset()
var t=this,n=this._scope||this.vm
this.handler=function(r){if(!t.el.contains(r.target)){n.$event=r
var i=e(r)
return n.$event=null,i}},r.util.on(document.documentElement,"click",this.handler)},reset:function(){r.util.off(document.documentElement,"click",this.handler)},unbind:function(){this.reset()}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i},function(e,t){"use strict"
var n={bind:function(){for(var e=this.vm,t=e.$root,n=e.$options._content,r=0;r<n.children.length;r++){var i=n.children[r].cloneNode(!0)
this.el.appendChild(i),t.$compile(i,e,this._scope)}}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t,n){"use strict"
var r=n(9),i={bind:function(){var e=this
this.hide=function(t){r["default"].hide(t,e.el)},this.show=function(t){r["default"].show(t,e.el)},this.el.addEventListener("mousedown",this.show,!1),this.el.addEventListener("mouseleave",this.hide,!1),this.el.addEventListener("mouseup",this.hide,!1)},unbind:function(){this.el.removeEventListener("mousedown",this.show),this.el.removeEventListener("mouseleave",this.hide),this.el.removeEventListener("mouseup",this.hide)}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i},function(e,t){"use strict"
function n(e){return null!==e&&e===e.window}function r(e){return n(e)?e:9===e.nodeType&&e.defaultView}function i(e){var t,n,i={top:0,left:0},o=e&&e.ownerDocument
return t=o.documentElement,"undefined"!=typeof e.getBoundingClientRect&&(i=e.getBoundingClientRect()),n=r(o),{top:i.top+n.pageYOffset-t.clientTop,left:i.left+n.pageXOffset-t.clientLeft}}function o(e){var t=""
for(var n in e)e.hasOwnProperty(n)&&(t+=n+":"+e[n]+";")
return t}var a={touches:0,allowEvent:function(e){var t=!0
return"touchstart"===e.type?a.touches+=1:"touchend"===e.type||"touchcancel"===e.type?setTimeout(function(){a.touches>0&&(a.touches-=1)},500):"mousedown"===e.type&&a.touches>0&&(t=!1),t},touchup:function(e){a.allowEvent(e)}}
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={duration:750,show:function(e,t){if(2===e.button)return!1
var n=t||this,r=document.createElement("div")
r.className="waves-ripple",n.appendChild(r)
var a=i(n),l=e.pageY-a.top,s=e.pageX-a.left,c="scale("+n.clientWidth/100*10+")"
"touches"in e&&(l=e.touches[0].pageY-a.top,s=e.touches[0].pageX-a.left),r.setAttribute("data-hold",Date.now().toString()),r.setAttribute("data-scale",c),r.setAttribute("data-x",s.toString()),r.setAttribute("data-y",l.toString())
var u={top:l+"px",left:s+"px"}
r.className=r.className+" waves-notransition",r.setAttribute("style",o(u)),r.className=r.className.replace("waves-notransition",""),u["-webkit-transform"]=c,u["-moz-transform"]=c,u["-ms-transform"]=c,u["-o-transform"]=c,u.transform=c,u.opacity="1",u["-webkit-transition-duration"]=this.duration+"ms",u["-moz-transition-duration"]=this.duration+"ms",u["-o-transition-duration"]=this.duration+"ms",u["transition-duration"]=this.duration+"ms",u["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",u["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",u["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",u["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",r.setAttribute("style",o(u))},hide:function(e,t){var n=this
a.touchup(e)
var r=(1.4*t.clientWidth,null),i=t.getElementsByClassName("waves-ripple")
if(!(i.length>0))return!1
r=i[i.length-1]
var l=r.getAttribute("data-x"),s=r.getAttribute("data-y"),c=r.getAttribute("data-scale"),u=Date.now()-Number(r.getAttribute("data-hold")),d=350-u
0>d&&(d=0),setTimeout(function(){var e={top:s+"px",left:l+"px",opacity:"0","-webkit-transition-duration":n.duration+"ms","-moz-transition-duration":n.duration+"ms","-o-transition-duration":n.duration+"ms","transition-duration":n.duration+"ms","-webkit-transform":c,"-moz-transform":c,"-ms-transform":c,"-o-transform":c,transform:c}
r.setAttribute("style",o(e)),setTimeout(function(){try{t.removeChild(r)}catch(e){return!1}},n.duration)},d)}}},function(e,t,n){"use strict"
var r=n(11),i=n(12),o=n(13),a=n(16)
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=[r["default"],i["default"],o["default"],a["default"]]},function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={methods:{broadcast:function(){var e=Array.prototype.slice.call(arguments)
this.$broadcast.apply(this,e)},dispatch:function(){var e=Array.prototype.slice.call(arguments)
this.$dispatch.apply(this,e)}}}},function(e,t){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={computed:{id:function(){return this.$options.name.toLowerCase()+"_"+this._uid}},methods:{$getAllChildren:function(){return this._getChildren(this)},_getChildren:function(e){var t=[]
t=t.concat(e.$children)
for(var n=0;n<e.$children.length;n++)t=t.concat(this._getChildren(e.$children[n]))
return t}}}},function(e,t,n){"use strict"
var r=n(14)
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={methods:{toast:function(e,t,n,i){return r.toast(e,t,n,i)}}}},function(e,t,n){"use strict"
var r=n(15)
t.toast=function(e,t,n,i){function o(e){var t=document.createElement("div")
if(t.classList.add("toast"),n)for(var r=n.split(" "),i=0,o=r.length;o>i;i++)t.classList.add(r[i])
return("object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)?t.appendChild(e):t.innerHTML=e,t}n=n||""
var a=document.getElementById("toast-container")
null===a&&(a=document.createElement("div"),a.id="toast-container",document.body.appendChild(a))
var l=o(e)
e&&a.appendChild(l),l.style.top="35px",l.style.opacity="0",r(l,{top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1})
var s=t,c=setInterval(function(){null===l.parentNode&&window.clearInterval(c),l.classList.contains("panning")||(s-=20),0>=s&&(r(l,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof i&&i(),this[0].parentNode.removeChild(this[0])}}),window.clearInterval(c))},20)}},function(e,t,n){var r,i
!function(e){function t(e){var t=e.length,r=n.type(e)
return"function"===r||n.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var n=function c(e,t){return new c.fn.init(e,t)}
n.isWindow=function(e){return null!=e&&e==e.window},n.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?i[a.call(e)]||"object":typeof e},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t
if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1
try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(t in e);return void 0===t||o.call(e,t)},n.each=function(e,n,r){var i,o=0,a=e.length,l=t(e)
if(r){if(l)for(;a>o&&(i=n.apply(e[o],r),i!==!1);o++);else for(o in e)if(i=n.apply(e[o],r),i===!1)break}else if(l)for(;a>o&&(i=n.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(i=n.call(e[o],o,e[o]),i===!1)break
return e},n.data=function(e,t,i){if(void 0===i){var o=e[n.expando],a=o&&r[o]
if(void 0===t)return a
if(a&&t in a)return a[t]}else if(void 0!==t){var o=e[n.expando]||(e[n.expando]=++n.uuid)
return r[o]=r[o]||{},r[o][t]=i,i}},n.removeData=function(e,t){var i=e[n.expando],o=i&&r[i]
o&&n.each(t,function(e,t){delete o[t]})},n.extend=function(){var e,t,r,i,o,a,l=arguments[0]||{},s=1,c=arguments.length,u=!1
for("boolean"==typeof l&&(u=l,l=arguments[s]||{},s++),"object"!=typeof l&&"function"!==n.type(l)&&(l={}),s===c&&(l=this,s--);c>s;s++)if(null!=(o=arguments[s]))for(i in o)e=l[i],r=o[i],l!==r&&(u&&r&&(n.isPlainObject(r)||(t=n.isArray(r)))?(t?(t=!1,a=e&&n.isArray(e)?e:[]):a=e&&n.isPlainObject(e)?e:{},l[i]=n.extend(u,a,r)):void 0!==r&&(l[i]=r))
return l},n.queue=function(e,r,i){function o(e,n){var r=n||[]
return null!=e&&(t(Object(e))?!function(e,t){for(var n=+t.length,r=0,i=e.length;n>r;)e[i++]=t[r++]
if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++]
return e.length=i,e}(r,"string"==typeof e?[e]:e):[].push.call(r,e)),r}if(e){r=(r||"fx")+"queue"
var a=n.data(e,r)
return i?(!a||n.isArray(i)?a=n.data(e,r,o(i)):a.push(i),a):a||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,r){t=t||"fx"
var i=n.queue(r,t),o=i.shift()
"inprogress"===o&&(o=i.shift()),o&&("fx"===t&&i.unshift("inprogress"),o.call(r,function(){n.dequeue(r,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this
throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0}
return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent
return e||document}var t=this[0],e=e.apply(t),r=this.offset(),i=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:n(e).offset()
return r.top-=parseFloat(t.style.marginTop)||0,r.left-=parseFloat(t.style.marginLeft)||0,e.style&&(i.top+=parseFloat(e.style.borderTopWidth)||0,i.left+=parseFloat(e.style.borderLeftWidth)||0),{top:r.top-i.top,left:r.left-i.left}}}
var r={}
n.expando="velocity"+(new Date).getTime(),n.uuid=0
for(var i={},o=i.hasOwnProperty,a=i.toString,l="Boolean Number String Function Array Date RegExp Object Error".split(" "),s=0;s<l.length;s++)i["[object "+l[s]+"]"]=l[s].toLowerCase()
n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(o){"object"==typeof e&&"object"==typeof e.exports?e.exports=o():(r=o,i="function"==typeof r?r.call(t,n,t,e):r,!(void 0!==i&&(e.exports=i)))}(function(){return function(e,t,n,r){function i(e){for(var t=-1,n=e?e.length:0,r=[];++t<n;){var i=e[t]
i&&r.push(i)}return r}function o(e){return h.isWrapped(e)?e=[].slice.call(e):h.isNode(e)&&(e=[e]),e}function a(e){var t=f.data(e,"velocity")
return null===t?r:t}function l(e){return function(t){return Math.round(t*e)*(1/e)}}function s(e,n,r,i){function o(e,t){return 1-3*t+3*e}function a(e,t){return 3*t-6*e}function l(e){return 3*e}function s(e,t,n){return((o(t,n)*e+a(t,n))*e+l(t))*e}function c(e,t,n){return 3*o(t,n)*e*e+2*a(t,n)*e+l(t)}function u(t,n){for(var i=0;h>i;++i){var o=c(n,e,r)
if(0===o)return n
var a=s(n,e,r)-t
n-=a/o}return n}function d(){for(var t=0;b>t;++t)O[t]=s(t*w,e,r)}function f(t,n,i){var o,a,l=0
do a=n+(i-n)/2,o=s(a,e,r)-t,o>0?i=a:n=a
while(Math.abs(o)>g&&++l<m)
return a}function p(t){for(var n=0,i=1,o=b-1;i!=o&&O[i]<=t;++i)n+=w;--i
var a=(t-O[i])/(O[i+1]-O[i]),l=n+a*w,s=c(l,e,r)
return s>=y?u(t,l):0==s?l:f(t,n,n+w)}function v(){j=!0,(e!=n||r!=i)&&d()}var h=4,y=.001,g=1e-7,m=10,b=11,w=1/(b-1),x="Float32Array"in t
if(4!==arguments.length)return!1
for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1
e=Math.min(e,1),r=Math.min(r,1),e=Math.max(e,0),r=Math.max(r,0)
var O=x?new Float32Array(b):new Array(b),j=!1,S=function(t){return j||v(),e===n&&r===i?t:0===t?0:1===t?1:s(p(t),n,i)}
S.getControlPoints=function(){return[{x:e,y:n},{x:r,y:i}]}
var C="generateBezier("+[e,n,r,i]+")"
return S.toString=function(){return C},S}function c(e,t){var n=e
return h.isString(e)?b.Easings[e]||(n=!1):n=h.isArray(e)&&1===e.length?l.apply(null,e):h.isArray(e)&&2===e.length?w.apply(null,e.concat([t])):h.isArray(e)&&4===e.length?s.apply(null,e):!1,n===!1&&(n=b.Easings[b.defaults.easing]?b.defaults.easing:m),n}function u(e){if(e){var t=(new Date).getTime(),n=b.State.calls.length
n>1e4&&(b.State.calls=i(b.State.calls))
for(var o=0;n>o;o++)if(b.State.calls[o]){var l=b.State.calls[o],s=l[0],c=l[2],p=l[3],v=!!p,y=null
p||(p=b.State.calls[o][3]=t-16)
for(var g=Math.min((t-p)/c.duration,1),m=0,w=s.length;w>m;m++){var P=s[m],j=P.element
if(a(j)){var S=!1
if(c.display!==r&&null!==c.display&&"none"!==c.display){if("flex"===c.display){var C=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"]
f.each(C,function(e,t){x.setPropertyValue(j,"display",t)})}x.setPropertyValue(j,"display",c.display)}c.visibility!==r&&"hidden"!==c.visibility&&x.setPropertyValue(j,"visibility",c.visibility)
for(var R in P)if("element"!==R){var q,k=P[R],_=h.isString(k.easing)?b.Easings[k.easing]:k.easing
if(1===g)q=k.endValue
else{var T=k.endValue-k.startValue
if(q=k.startValue+T*_(g,c,T),!v&&q===k.currentValue)continue}if(k.currentValue=q,"tween"===R)y=q
else{if(x.Hooks.registered[R]){var V=x.Hooks.getRoot(R),A=a(j).rootPropertyValueCache[V]
A&&(k.rootPropertyValue=A)}var $=x.setPropertyValue(j,R,k.currentValue+(0===parseFloat(q)?"":k.unitType),k.rootPropertyValue,k.scrollData)
x.Hooks.registered[R]&&(x.Normalizations.registered[V]?a(j).rootPropertyValueCache[V]=x.Normalizations.registered[V]("extract",null,$[1]):a(j).rootPropertyValueCache[V]=$[1]),"transform"===$[0]&&(S=!0)}}c.mobileHA&&a(j).transformCache.translate3d===r&&(a(j).transformCache.translate3d="(0px, 0px, 0px)",S=!0),S&&x.flushTransformCache(j)}}c.display!==r&&"none"!==c.display&&(b.State.calls[o][2].display=!1),c.visibility!==r&&"hidden"!==c.visibility&&(b.State.calls[o][2].visibility=!1),c.progress&&c.progress.call(l[1],l[1],g,Math.max(0,p+c.duration-t),p,y),1===g&&d(o)}}b.State.isTicking&&O(u)}function d(e,t){if(!b.State.calls[e])return!1
for(var n=b.State.calls[e][0],i=b.State.calls[e][1],o=b.State.calls[e][2],l=b.State.calls[e][4],s=!1,c=0,u=n.length;u>c;c++){var d=n[c].element
if(t||o.loop||("none"===o.display&&x.setPropertyValue(d,"display",o.display),"hidden"===o.visibility&&x.setPropertyValue(d,"visibility",o.visibility)),o.loop!==!0&&(f.queue(d)[1]===r||!/\.velocityQueueEntryFlag/i.test(f.queue(d)[1]))&&a(d)){a(d).isAnimating=!1,a(d).rootPropertyValueCache={}
var p=!1
f.each(x.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,i=a(d).transformCache[t]
a(d).transformCache[t]!==r&&new RegExp("^\\("+n+"[^.]").test(i)&&(p=!0,delete a(d).transformCache[t])}),o.mobileHA&&(p=!0,delete a(d).transformCache.translate3d),p&&x.flushTransformCache(d),x.Values.removeClass(d,"velocity-animating")}if(!t&&o.complete&&!o.loop&&c===u-1)try{o.complete.call(i,i)}catch(v){setTimeout(function(){throw v},1)}l&&o.loop!==!0&&l(i),a(d)&&o.loop===!0&&!t&&(f.each(a(d).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(d,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(d,o.queue)}b.State.calls[e]=!1
for(var h=0,y=b.State.calls.length;y>h;h++)if(b.State.calls[h]!==!1){s=!0
break}s===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,p=function(){if(n.documentMode)return n.documentMode
for(var e=7;e>4;e--){var t=n.createElement("div")
if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return r}(),v=function(){var e=0
return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,r=(new Date).getTime()
return n=Math.max(0,16-(r-e)),e=r+n,setTimeout(function(){t(r+n)},n)}}(),h={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==r&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1
return!0}},y=!1
if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=p&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.")
if(7>=p)return void(jQuery.fn.velocity=jQuery.fn.animate)
var g=400,m="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:g,easing:m,begin:r,complete:r,progress:r,display:r,visibility:r,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:h.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1}
t.pageYOffset!==r?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop")
var w=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,r){var i={x:t.x+r.dx*n,v:t.v+r.dv*n,tension:t.tension,friction:t.friction}
return{dx:i.v,dv:e(i)}}function n(n,r){var i={dx:n.v,dv:e(n)},o=t(n,.5*r,i),a=t(n,.5*r,o),l=t(n,r,a),s=1/6*(i.dx+2*(o.dx+a.dx)+l.dx),c=1/6*(i.dv+2*(o.dv+a.dv)+l.dv)
return n.x=n.x+s*r,n.v=n.v+c*r,n}return function r(e,t,i){var o,a,l,s={x:-1,v:0,tension:null,friction:null},c=[0],u=0,d=1e-4,f=.016
for(e=parseFloat(e)||500,t=parseFloat(t)||20,i=i||null,s.tension=e,s.friction=t,o=null!==i,o?(u=r(e,t),a=u/i*f):a=f;;)if(l=n(l||s,a),c.push(1+l.x),u+=16,!(Math.abs(l.x)>d&&Math.abs(l.v)>d))break
return o?function(e){return c[e*(c.length-1)|0]}:u}}()
b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=s.apply(null,t[1])})
var x=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<x.Lists.colors.length;e++){var t="color"===x.Lists.colors[e]?"0 0 0 1":"255 255 255 1"
x.Hooks.templates[x.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,r,i
if(p)for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ")
var o=r[1].match(x.RegEx.valueSplit)
"Color"===i[0]&&(i.push(i.shift()),o.push(o.shift()),x.Hooks.templates[n]=[i.join(" "),o.join(" ")])}for(n in x.Hooks.templates){r=x.Hooks.templates[n],i=r[0].split(" ")
for(var e in i){var a=n+i[e],l=e
x.Hooks.registered[a]=[n,l]}}},getRoot:function(e){var t=x.Hooks.registered[e]
return t?t[0]:e},cleanRootPropertyValue:function(e,t){return x.RegEx.valueUnwrap.test(t)&&(t=t.match(x.RegEx.valueUnwrap)[1]),x.Values.isCSSNullValue(t)&&(t=x.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=x.Hooks.registered[e]
if(n){var r=n[0],i=n[1]
return t=x.Hooks.cleanRootPropertyValue(r,t),t.toString().match(x.RegEx.valueSplit)[i]}return t},injectValue:function(e,t,n){var r=x.Hooks.registered[e]
if(r){var i,o,a=r[0],l=r[1]
return n=x.Hooks.cleanRootPropertyValue(a,n),i=n.toString().match(x.RegEx.valueSplit),i[l]=t,o=i.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip"
case"extract":var r
return x.RegEx.wrappedValueAlreadyExtracted.test(n)?r=n:(r=n.toString().match(x.RegEx.valueUnwrap),r=r?r[1].replace(/,(\s+)?/g," "):n),r
case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter"
case"extract":var r=parseFloat(n)
if(!r&&0!==r){var i=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i)
r=i?i[1]:0}return r
case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(8>=p)switch(e){case"name":return"filter"
case"extract":var r=n.toString().match(/alpha\(opacity=(.*)\)/i)
return n=r?r[1]/100:1
case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity"
case"extract":return n
case"inject":return n}}},register:function(){9>=p||b.State.isGingerbread||(x.Lists.transformsBase=x.Lists.transformsBase.concat(x.Lists.transforms3D))
for(var e=0;e<x.Lists.transformsBase.length;e++)!function(){var t=x.Lists.transformsBase[e]
x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return"transform"
case"extract":return a(n)===r||a(n).transformCache[t]===r?/^scale/i.test(t)?1:0:a(n).transformCache[t].replace(/[()]/g,"")
case"inject":var o=!1
switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(i)
break
case"scal":case"scale":b.State.isAndroid&&a(n).transformCache[t]===r&&1>i&&(i=1),o=!/(\d)$/i.test(i)
break
case"skew":o=!/(deg|\d)$/i.test(i)
break
case"rotate":o=!/(deg|\d)$/i.test(i)}return o||(a(n).transformCache[t]="("+i+")"),a(n).transformCache[t]}}}()
for(var e=0;e<x.Lists.colors.length;e++)!function(){var t=x.Lists.colors[e]
x.Normalizations.registered[t]=function(e,n,i){switch(e){case"name":return t
case"extract":var o
if(x.RegEx.wrappedValueAlreadyExtracted.test(i))o=i
else{var a,l={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(i)?a=l[i]!==r?l[i]:l.black:x.RegEx.isHex.test(i)?a="rgb("+x.Values.hexToRgb(i).join(" ")+")":/^rgba?\(/i.test(i)||(a=l.black),o=(a||i).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=p||3!==o.split(" ").length||(o+=" 1"),o
case"inject":return 8>=p?4===i.split(" ").length&&(i=i.split(/\s+/).slice(0,3).join(" ")):3===i.split(" ").length&&(i+=" 1"),(8>=p?"rgb":"rgba")+"("+i.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2"
return(p||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0]
for(var t=["","Webkit","Moz","ms","O"],n=0,r=t.length;r>n;n++){var i
if(i=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),h.isString(b.State.prefixElement.style[i]))return b.State.prefixMatches[e]=i,[i,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
return e=e.replace(n,function(e,t,n,r){return t+t+n+n+r+r}),t=r.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase()
return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,n,i,o){function l(e,n){var i=0
if(8>=p)i=f.css(e,n)
else{var s=function(){c&&x.setPropertyValue(e,"display","none")},c=!1
if(/^(width|height)$/.test(n)&&0===x.getPropertyValue(e,"display")&&(c=!0,x.setPropertyValue(e,"display",x.Values.getDisplayType(e))),!o){if("height"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var u=e.offsetHeight-(parseFloat(x.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(x.getPropertyValue(e,"paddingBottom"))||0)
return s(),u}if("width"===n&&"border-box"!==x.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var d=e.offsetWidth-(parseFloat(x.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(x.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(x.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(x.getPropertyValue(e,"paddingRight"))||0)
return s(),d}}var v
v=a(e)===r?t.getComputedStyle(e,null):a(e).computedStyle?a(e).computedStyle:a(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),i=9===p&&"filter"===n?v.getPropertyValue(n):v[n],(""===i||null===i)&&(i=e.style[n]),s()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(n)){var h=l(e,"position");("fixed"===h||"absolute"===h&&/top|left/i.test(n))&&(i=f(e).position()[n]+"px")}return i}var s
if(x.Hooks.registered[n]){var c=n,u=x.Hooks.getRoot(c)
i===r&&(i=x.getPropertyValue(e,x.Names.prefixCheck(u)[0])),x.Normalizations.registered[u]&&(i=x.Normalizations.registered[u]("extract",e,i)),s=x.Hooks.extractValue(c,i)}else if(x.Normalizations.registered[n]){var d,v
d=x.Normalizations.registered[n]("name",e),"transform"!==d&&(v=l(e,x.Names.prefixCheck(d)[0]),x.Values.isCSSNullValue(v)&&x.Hooks.templates[n]&&(v=x.Hooks.templates[n][1])),s=x.Normalizations.registered[n]("extract",e,v)}if(!/^[\d-]/.test(s))if(a(e)&&a(e).isSVG&&x.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{s=e.getBBox()[n]}catch(h){s=0}else s=e.getAttribute(n)
else s=l(e,x.Names.prefixCheck(n)[0])
return x.Values.isCSSNullValue(s)&&(s=0),b.debug>=2&&console.log("Get "+n+": "+s),s},setPropertyValue:function(e,n,r,i,o){var l=n
if("scroll"===n)o.container?o.container["scroll"+o.direction]=r:"Left"===o.direction?t.scrollTo(r,o.alternateValue):t.scrollTo(o.alternateValue,r)
else if(x.Normalizations.registered[n]&&"transform"===x.Normalizations.registered[n]("name",e))x.Normalizations.registered[n]("inject",e,r),l="transform",r=a(e).transformCache[n]
else{if(x.Hooks.registered[n]){var s=n,c=x.Hooks.getRoot(n)
i=i||x.getPropertyValue(e,c),r=x.Hooks.injectValue(s,r,i),n=c}if(x.Normalizations.registered[n]&&(r=x.Normalizations.registered[n]("inject",e,r),n=x.Normalizations.registered[n]("name",e)),l=x.Names.prefixCheck(n)[0],8>=p)try{e.style[l]=r}catch(u){b.debug&&console.log("Browser does not support ["+r+"] for ["+l+"]")}else a(e)&&a(e).isSVG&&x.Names.SVGAttribute(n)?e.setAttribute(n,r):e.style[l]=r
b.debug>=2&&console.log("Set "+n+" ("+l+"): "+r)}return[l,r]},flushTransformCache:function(e){var t=""
if((p||b.State.isAndroid&&!b.State.isChrome)&&a(e).isSVG){var n=function(t){return parseFloat(x.getPropertyValue(e,t))},r={translate:[n("translateX"),n("translateY")],skewX:[n("skewX")],skewY:[n("skewY")],scale:1!==n("scale")?[n("scale"),n("scale")]:[n("scaleX"),n("scaleY")],rotate:[n("rotateZ"),0,0]}
f.each(a(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),r[e]&&(t+=e+"("+r[e].join(" ")+") ",delete r[e])})}else{var i,o
f.each(a(e).transformCache,function(n){return i=a(e).transformCache[n],"transformPerspective"===n?(o=i,!0):(9===p&&"rotateZ"===n&&(n="rotate"),void(t+=n+i+" "))}),o&&(t="perspective"+o+" "+t)}x.setPropertyValue(e,"transform",t)}}
x.Hooks.register(),x.Normalizations.register(),b.hook=function(e,t,n){var i=r
return e=o(e),f.each(e,function(e,o){if(a(o)===r&&b.init(o),n===r)i===r&&(i=b.CSS.getPropertyValue(o,t))
else{var l=b.CSS.setPropertyValue(o,t,n)
"transform"===l[0]&&b.CSS.flushTransformCache(o),i=l}}),i}
var P=function j(){function e(){return l?R.promise||null:s}function i(){function e(e){if(l.begin&&0===O)try{l.begin.call(v,v)}catch(d){setTimeout(function(){throw d},1)}if("scroll"===q){var p,g,w,j=/^x$/i.test(l.axis)?"Left":"Top",S=parseFloat(l.offset)||0
l.container?h.isWrapped(l.container)||h.isNode(l.container)?(l.container=l.container[0]||l.container,p=l.container["scroll"+j],w=p+f(o).position()[j.toLowerCase()]+S):l.container=null:(p=b.State.scrollAnchor[b.State["scrollProperty"+j]],g=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===j?"Top":"Left")]],w=f(o).offset()[j.toLowerCase()]+S),s={scroll:{rootPropertyValue:!1,startValue:p,currentValue:p,endValue:w,unitType:"",easing:l.easing,scrollData:{container:l.container,direction:j,alternateValue:g}},element:o},b.debug&&console.log("tweensContainer (scroll): ",s.scroll,o)}else if("reverse"===q){if(!a(o).tweensContainer)return void f.dequeue(o,l.queue)
"none"===a(o).opts.display&&(a(o).opts.display="auto"),"hidden"===a(o).opts.visibility&&(a(o).opts.visibility="visible"),a(o).opts.loop=!1,a(o).opts.begin=null,a(o).opts.complete=null,m.easing||delete l.easing,m.duration||delete l.duration,l=f.extend({},a(o).opts,l)
var C=f.extend(!0,{},a(o).tweensContainer)
for(var k in C)if("element"!==k){var _=C[k].startValue
C[k].startValue=C[k].currentValue=C[k].endValue,C[k].endValue=_,h.isEmptyObject(m)||(C[k].easing=l.easing),b.debug&&console.log("reverse tweensContainer ("+k+"): "+JSON.stringify(C[k]),o)}s=C}else if("start"===q){var C,T,V,A,E,M,B,L,z,I,N,F,D
!function(){var e=function(e,t){var n=r,i=r,a=r
return h.isArray(e)?(n=e[0],!h.isArray(e[1])&&/^[\d-]/.test(e[1])||h.isFunction(e[1])||x.RegEx.isHex.test(e[1])?a=e[1]:(h.isString(e[1])&&!x.RegEx.isHex.test(e[1])||h.isArray(e[1]))&&(i=t?e[1]:c(e[1],l.duration),e[2]!==r&&(a=e[2]))):n=e,t||(i=i||l.easing),h.isFunction(n)&&(n=n.call(o,O,P)),h.isFunction(a)&&(a=a.call(o,O,P)),[n||0,i,a]}
a(o).tweensContainer&&a(o).isAnimating===!0&&(C=a(o).tweensContainer),f.each(y,function(t,n){if(RegExp("^"+x.Lists.colors.join("$|^")+"$").test(t)){var i=e(n,!0),o=i[0],a=i[1],l=i[2]
if(x.RegEx.isHex.test(o)){for(var s=["Red","Green","Blue"],c=x.Values.hexToRgb(o),u=l?x.Values.hexToRgb(l):r,d=0;d<s.length;d++){var f=[c[d]]
a&&f.push(a),u!==r&&f.push(u[d]),y[t+s[d]]=f}delete y[t]}}})
for(T in y){var u=function(e,t){var n,r
return r=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=x.Values.getUnitType(e)),[r,n]},d=function(){var e={myParent:o.parentNode||n.body,position:x.getPropertyValue(o,"position"),fontSize:x.getPropertyValue(o,"fontSize")},r=e.position===$.lastPosition&&e.myParent===$.lastParent,i=e.fontSize===$.lastFontSize
$.lastParent=e.myParent,$.lastPosition=e.position,$.lastFontSize=e.fontSize
var l=100,s={}
if(i&&r)s.emToPx=$.lastEmToPx,s.percentToPxWidth=$.lastPercentToPxWidth,s.percentToPxHeight=$.lastPercentToPxHeight
else{var c=a(o).isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div")
b.init(c),e.myParent.appendChild(c),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(c,t,"hidden")}),b.CSS.setPropertyValue(c,"position",e.position),b.CSS.setPropertyValue(c,"fontSize",e.fontSize),b.CSS.setPropertyValue(c,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(c,t,l+"%")}),b.CSS.setPropertyValue(c,"paddingLeft",l+"em"),s.percentToPxWidth=$.lastPercentToPxWidth=(parseFloat(x.getPropertyValue(c,"width",null,!0))||1)/l,s.percentToPxHeight=$.lastPercentToPxHeight=(parseFloat(x.getPropertyValue(c,"height",null,!0))||1)/l,s.emToPx=$.lastEmToPx=(parseFloat(x.getPropertyValue(c,"paddingLeft"))||1)/l,e.myParent.removeChild(c)}return null===$.remToPx&&($.remToPx=parseFloat(x.getPropertyValue(n.body,"fontSize"))||16),null===$.vwToPx&&($.vwToPx=parseFloat(t.innerWidth)/100,$.vhToPx=parseFloat(t.innerHeight)/100),s.remToPx=$.remToPx,s.vwToPx=$.vwToPx,s.vhToPx=$.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(s),o),s}
if(V=e(y[T]),A=V[0],E=V[1],M=V[2],T=x.Names.camelCase(T),B=x.Hooks.getRoot(T),L=!1,a(o).isSVG||"tween"===B||x.Names.prefixCheck(B)[1]!==!1||x.Normalizations.registered[B]!==r){if((l.display!==r&&null!==l.display&&"none"!==l.display||l.visibility!==r&&"hidden"!==l.visibility)&&/opacity|filter/.test(T)&&!M&&0!==A&&(M=0),l._cacheValues&&C&&C[T]?(M===r&&(M=C[T].endValue+C[T].unitType),L=a(o).rootPropertyValueCache[B]):x.Hooks.registered[T]?M===r?(L=x.getPropertyValue(o,B),M=x.getPropertyValue(o,T,L)):L=x.Hooks.templates[B][1]:M===r&&(M=x.getPropertyValue(o,T)),F=!1,z=u(T,M),M=z[0],N=z[1],z=u(T,A),A=z[0].replace(/^([+-\/*])=/,function(e,t){return F=t,""}),I=z[1],M=parseFloat(M)||0,A=parseFloat(A)||0,"%"===I&&(/^(fontSize|lineHeight)$/.test(T)?(A/=100,I="em"):/^scale/.test(T)?(A/=100,I=""):/(Red|Green|Blue)$/i.test(T)&&(A=A/100*255,I="")),/[\/*]/.test(F))I=N
else if(N!==I&&0!==M)if(0===A)I=N
else{switch(i=i||d(),D=/margin|padding|left|right|width|text|word|letter/i.test(T)||/X$/.test(T)||"x"===T?"x":"y",N){case"%":M*="x"===D?i.percentToPxWidth:i.percentToPxHeight
break
case"px":break
default:M*=i[N+"ToPx"]}switch(I){case"%":M*=1/("x"===D?i.percentToPxWidth:i.percentToPxHeight)
break
case"px":break
default:M*=1/i[I+"ToPx"]}}switch(F){case"+":A=M+A
break
case"-":A=M-A
break
case"*":A=M*A
break
case"/":A=M/A}s[T]={rootPropertyValue:L,startValue:M,currentValue:M,endValue:A,unitType:I,easing:E},b.debug&&console.log("tweensContainer ("+T+"): "+JSON.stringify(s[T]),o)}else b.debug&&console.log("Skipping ["+B+"] due to a lack of browser support.")}s.element=o}()}s.element&&(x.Values.addClass(o,"velocity-animating"),W.push(s),""===l.queue&&(a(o).tweensContainer=s,a(o).opts=l),a(o).isAnimating=!0,O===P-1?(b.State.calls.push([W,v,l,null,R.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,u())):O++)}var i,o=this,l=f.extend({},b.defaults,m),s={}
switch(a(o)===r&&b.init(o),parseFloat(l.delay)&&l.queue!==!1&&f.queue(o,l.queue,function(e){b.velocityQueueEntryFlag=!0,a(o).delayTimer={setTimeout:setTimeout(e,parseFloat(l.delay)),next:e}}),l.duration.toString().toLowerCase()){case"fast":l.duration=200
break
case"normal":l.duration=g
break
case"slow":l.duration=600
break
default:l.duration=parseFloat(l.duration)||1}b.mock!==!1&&(b.mock===!0?l.duration=l.delay=1:(l.duration*=parseFloat(b.mock)||1,l.delay*=parseFloat(b.mock)||1)),l.easing=c(l.easing,l.duration),l.begin&&!h.isFunction(l.begin)&&(l.begin=null),l.progress&&!h.isFunction(l.progress)&&(l.progress=null),l.complete&&!h.isFunction(l.complete)&&(l.complete=null),l.display!==r&&null!==l.display&&(l.display=l.display.toString().toLowerCase(),"auto"===l.display&&(l.display=b.CSS.Values.getDisplayType(o))),l.visibility!==r&&null!==l.visibility&&(l.visibility=l.visibility.toString().toLowerCase()),l.mobileHA=l.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,l.queue===!1?l.delay?setTimeout(e,l.delay):e():f.queue(o,l.queue,function(t,n){return n===!0?(R.promise&&R.resolver(v),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==l.queue&&"fx"!==l.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var l,s,p,v,y,m,w=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||h.isString(arguments[0].properties))
if(h.isWrapped(this)?(l=!1,p=0,v=this,s=this):(l=!0,p=1,v=w?arguments[0].elements||arguments[0].e:arguments[0]),v=o(v)){w?(y=arguments[0].properties||arguments[0].p,m=arguments[0].options||arguments[0].o):(y=arguments[p],m=arguments[p+1])
var P=v.length,O=0
if(!/^(stop|finish|finishAll)$/i.test(y)&&!f.isPlainObject(m)){var S=p+1
m={}
for(var C=S;C<arguments.length;C++)h.isArray(arguments[C])||!/^(fast|normal|slow)$/i.test(arguments[C])&&!/^\d/.test(arguments[C])?h.isString(arguments[C])||h.isArray(arguments[C])?m.easing=arguments[C]:h.isFunction(arguments[C])&&(m.complete=arguments[C]):m.duration=arguments[C]}var R={promise:null,resolver:null,rejecter:null}
l&&b.Promise&&(R.promise=new b.Promise(function(e,t){R.resolver=e,R.rejecter=t}))
var q
switch(y){case"scroll":q="scroll"
break
case"reverse":q="reverse"
break
case"finish":case"finishAll":case"stop":f.each(v,function(e,t){a(t)&&a(t).delayTimer&&(clearTimeout(a(t).delayTimer.setTimeout),a(t).delayTimer.next&&a(t).delayTimer.next(),delete a(t).delayTimer),"finishAll"!==y||m!==!0&&!h.isString(m)||(f.each(f.queue(t,h.isString(m)?m:""),function(e,t){h.isFunction(t)&&t()}),f.queue(t,h.isString(m)?m:"",[]))})
var k=[]
return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(n,i){var o=m===r?"":m
return o===!0||t[2].queue===o||m===r&&t[2].queue===!1?void f.each(v,function(n,r){r===i&&((m===!0||h.isString(m))&&(f.each(f.queue(r,h.isString(m)?m:""),function(e,t){h.isFunction(t)&&t(null,!0)}),f.queue(r,h.isString(m)?m:"",[])),"stop"===y?(a(r)&&a(r).tweensContainer&&o!==!1&&f.each(a(r).tweensContainer,function(e,t){t.endValue=t.currentValue}),k.push(e)):("finish"===y||"finishAll"===y)&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(k,function(e,t){d(t,!0)}),R.promise&&R.resolver(v)),e()
default:if(!f.isPlainObject(y)||h.isEmptyObject(y)){if(h.isString(y)&&b.Redirects[y]){var _=f.extend({},m),T=_.duration,V=_.delay||0
return _.backwards===!0&&(v=f.extend(!0,[],v).reverse()),f.each(v,function(e,t){parseFloat(_.stagger)?_.delay=V+parseFloat(_.stagger)*e:h.isFunction(_.stagger)&&(_.delay=V+_.stagger.call(t,e,P)),_.drag&&(_.duration=parseFloat(T)||(/^(callout|transition)/.test(y)?1e3:g),_.duration=Math.max(_.duration*(_.backwards?1-e/P:(e+1)/P),.75*_.duration,200)),b.Redirects[y].call(t,t,_||{},e,P,v,R.promise?R:r)}),e()}var A="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting."
return R.promise?R.rejecter(new Error(A)):console.log(A),e()}q="start"}var $={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},W=[]
f.each(v,function(e,t){h.isNode(t)&&i.call(t)})
var E,_=f.extend({},b.defaults,m)
if(_.loop=parseInt(_.loop),E=2*_.loop-1,_.loop)for(var M=0;E>M;M++){var B={delay:_.delay,progress:_.progress}
M===E-1&&(B.display=_.display,B.visibility=_.visibility,B.complete=_.complete),j(v,"reverse",B)}return e()}}
b=f.extend(P,b),b.animate=P
var O=t.requestAnimationFrame||v
return b.State.isMobile||n.hidden===r||n.addEventListener("visibilitychange",function(){n.hidden?(O=function(e){return setTimeout(function(){e(!0)},16)},u()):O=t.requestAnimationFrame||v}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,n,i,o,a,l){var s=f.extend({},n),c=s.begin,u=s.complete,d={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},p={}
s.display===r&&(s.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),s.begin=function(){c&&c.call(a,a)
for(var n in d){p[n]=e.style[n]
var r=b.CSS.getPropertyValue(e,n)
d[n]="Down"===t?[r,0]:[0,r]}p.overflow=e.style.overflow,e.style.overflow="hidden"},s.complete=function(){for(var t in p)e.style[t]=p[t]
u&&u.call(a,a),l&&l.resolver(a)},b(e,d,s)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,n,i,o,a,l){var s=f.extend({},n),c={opacity:"In"===t?1:0},u=s.complete
i!==o-1?s.complete=s.begin=null:s.complete=function(){u&&u.call(a,a),l&&l.resolver(a)},s.display===r&&(s.display="In"===t?"auto":"none"),b(this,c,s)}}),b}(window.jQuery||window.Zepto||window,window,document)})},function(e,t,n){"use strict"
var r=n(17)
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={methods:{tooltip:function(e,t,n,i){var o=e.currentTarget
return r["default"](o,t,n,i)}}}},function(e,t,n){"use strict"
function r(e){var t=0,n=0
do t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent
while(e)
return{top:t,left:n}}function i(e,t,n,i){void 0===n&&(n="top"),void 0===i&&(i=50)
var l=10,s=e
if(!e._tooltip){var c=document.createElement("SPAN")
c.textContent=t
var u=document.createElement("DIV")
u.classList.add("material-tooltip"),u.appendChild(c),document.body.appendChild(u)
var d=document.createElement("DIV")
d.classList.add("backdrop"),u.appendChild(d),d.style.top="0",d.style.left="0",document.body.appendChild(u),e._tooltip=u,e._backdrop=d}var f,p=e._tooltip,v=e._backdrop,h=setTimeout(function(){f=!0,o(p,"stop"),o(v,"stop"),p.style.display="block",p.style.left="0px",p.style.top="0px"
var t,i,c,u=s.offsetWidth,d=s.offsetHeight,h=n,y=p.offsetHeight,g=p.offsetWidth,m="0px",b="0px",w=8
if("top"===h){var x=r(e)
t=x.top-y-l,i=x.left+u/2-g/2,c=a(i,t,g,y),m="-10px",v.style.borderRadius="14px 14px 0 0",v.style.transformOrigin="50% 90%",v.style.marginTop=y.toString()+"px",v.style.marginLeft=(g/2-v.offsetWidth/2).toString()+"px"}else if("left"===h){var x=r(e)
t=x.top+d/2-y/2,i=x.left-g-l,c=a(i,t,g,y),b="-10px",v.style.width="14px",v.style.height="14px",v.style.borderRadius="14px 0 0 14px",v.style.transformOrigin="95% 50%",v.style.marginTop=(y/2).toString()+"px",v.style.marginLeft=g.toString()+"px"}else if("right"===h){var x=r(e)
t=x.top+d/2-y/2,i=x.left+u+l,c=a(i,t,g,y),b="+10px",v.style.width="14px",v.style.height="14px",v.style.borderRadius="0 14px 14px 0",v.style.transformOrigin="5% 50%",v.style.marginTop=(y/2).toString()+"px",v.style.marginLeft="0px"}else{var x=r(e)
t=x.top+s.offsetHeight+l,i=x.left+u/2-g/2,c=a(i,t,g,y),m="+10px",v.style.marginLeft=(g/2-v.offsetWidth/2).toString()+"px"}p.style.top=c.y+"px",p.style.left=c.x+"px",w=g/8,8>w&&(w=8),("right"===h||"left"===h)&&(w=g/10,6>w&&(w=6)),o(p,{marginTop:m,marginLeft:b},{duration:350,queue:!1}),o(p,{opacity:1},{duration:300,delay:50,queue:!1}),v.style.display="block",o(v,{opacity:1},{duration:55,delay:0,queue:!1}),o(v,{scale:w},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"})},i)
e.addEventListener("mouseleave",function(){f=!1,clearTimeout(h),setTimeout(function(){1!=f&&(o(p,{opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1}),o(v,{opacity:0,scale:1},{duration:225,queue:!1,complete:function(){v.style.display="none",p.style.display="none",f=!1}}))},225)})}var o=n(15)
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i
var a=function(e,t,n,r){var i=e,o=t
return 0>i?i=4:i+n>window.innerWidth+window.scrollX&&(i=window.document.documentElement.offsetWidth-n),0>o?o=4:o+r>window.innerHeight+window.scrollY&&(o=window.document.documentElement.offsetHeight-r),{x:i,y:o}}},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{alert:{type:String,required:!1,twoWay:!1,"default":null}},template:n(20)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t,n){"use strict"
function r(e,t){t||(t={}),t.name=t.name||e.name
var n=e.prototype
Object.getOwnPropertyNames(n).forEach(function(e){if("constructor"!==e){if(a.indexOf(e)>-1)return void(t[e]=n[e])
var r=Object.getOwnPropertyDescriptor(n,e)
"function"==typeof r.value?(t.methods||(t.methods={}))[e]=r.value:(r.get||r.set)&&((t.computed||(t.computed={}))[e]={get:r.get,set:r.set})}})
var r=Object.getPrototypeOf(e.prototype),i=r instanceof o?r.constructor:o
return i.extend(t)}function i(e){return"function"==typeof e?r(e):function(t){return r(t,e)}}Object.defineProperty(t,"__esModule",{value:!0})
var o=n(2),a=["data","el","init","created","ready","beforeCompile","compiled","beforeDestroy","destroyed","attached","detached","activate"]
t["default"]=i},function(e,t){e.exports='<span class="badge" :class="{new: !!alert}">\r\n    <slot></slot>\r\n\r\n    <span v-if="alert" class="new">{{alert}}</span>\r\n</span>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(22),a=n(8),l=function(){function e(){}return Object.defineProperty(e.prototype,"computedClasses",{get:function(){var e={"btn-large":this.large,disabled:this.disabled,"btn-floating":this.floating}
return e[this.type?"btn-"+this.type:"btn"]=!0,e},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{type:{type:String,required:!1,"default":null,twoWay:!1},icon:{type:String,required:!1,"default":null,twoWay:!1},iconAlignRight:{type:Boolean,required:!1,"default":!1,twoWay:!1},large:{type:Boolean,required:!1,"default":!1,twoWay:!1},disabled:{type:Boolean,required:!1,"default":!1,twoWay:!1},floating:{type:Boolean,required:!1,"default":!1,twoWay:!1}},components:{mdIcon:o["default"]},directives:{waveEffect:a["default"]},template:n(24)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{right:{type:Boolean,required:!1,"default":!1},left:{type:Boolean,required:!1,"default":!1}},template:n(23)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<i class="material-icons"\r\n   :class="{right: right, left: left}">\r\n    <slot></slot>\r\n</i>\r\n'},function(e,t){e.exports='<a :class="computedClasses" v-wave-effect class="md-button">\r\n    <md-icon v-if="icon" :right="iconAlignRight" :left="!iconAlignRight">\r\n        {{icon}}\r\n    </md-icon>\r\n    <slot></slot>\r\n</a>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(22),a=n(8),l=n(4),s=function(){function e(){}return Object.defineProperty(e.prototype,"computedClasses",{get:function(){var e={"btn-large":this.large,disabled:this.disabled,"btn-floating":this.floating}
return e[this.type?"btn-"+this.type:"btn"]=!0,e},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{type:{type:String,required:!1,"default":null,twoWay:!1},icon:{type:String,required:!1,"default":null,twoWay:!1},iconAlignRight:{type:Boolean,required:!1,"default":!1,twoWay:!1},large:{type:Boolean,required:!1,"default":!1,twoWay:!1},disabled:{type:Boolean,required:!1,"default":!1,twoWay:!1},floating:{type:Boolean,required:!1,"default":!1,twoWay:!1}},components:{mdIcon:o["default"]},directives:{waveEffect:a["default"],bindBoolean:l["default"]},template:n(26)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t){e.exports='<button :class="computedClasses" v-bind-boolean:disabled="disabled" v-wave-effect class="md-button">\r\n    <md-icon v-if="icon" :right="iconAlignRight" :left="!iconAlignRight">\r\n        {{icon}}\r\n    </md-icon>\r\n    <slot></slot>\r\n</button>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(28),a=function(){function e(){}return e=r([i["default"]({props:{list:{type:Object,required:!1,"default":{}}},components:{mdNavbar:o["default"]},template:n(34)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(22),a=n(29),l=function(){function e(){}return Object.defineProperty(e.prototype,"logoClasses",{get:function(){return{center:this.center,right:!this.center&&!this.right}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"listClasses",{get:function(){var e={right:this.right,left:this.left}
return this.mode&&(e[this.mode]=!0),e},enumerable:!0,configurable:!0}),e.prototype.openSideMenu=function(){this.$broadcast("sidenav::open")},e.prototype.closeSideMenu=function(){this.$broadcast("sidenav::close")},e=r([i["default"]({props:{active:{type:String,required:!1,"default":null},showActive:{type:Boolean,required:!1,"default":null,twoWay:!1},title:{type:String,required:!1,"default":"",twoWay:!1},titleHref:{type:String,required:!1,"default":"javascript:void(0)",twoWay:!1},right:{type:Boolean,required:!1,"default":!1,twoWay:!1},left:{type:Boolean,required:!1,"default":!1,twoWay:!1},center:{type:Boolean,required:!1,"default":!1,twoWay:!1},fixed:{type:Boolean,required:!1,"default":!1,twoWay:!1},navClass:{required:!1,"default":null,twoWay:!1},hamburger:{type:Boolean,required:!1,"default":!1,twoWay:!1},mode:{type:String,required:!1,"default":null,twoWay:!1},closeOnClick:{type:Boolean,required:!1,"default":!0,twoWay:!1},onlySideNav:{type:Boolean,required:!1,"default":!1,twoWay:!1},wrapperClass:{required:!1,"default":null,twoWay:!1}},components:{mdIcon:o["default"],mdSidenav:a["default"]},events:{"nav-item::activated":function(e,t){this.$broadcast("nav-item::activated",e),this.active=e,this.closeOnClick&&this.$broadcast("sidenav::close")}},template:n(33)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(30),a=27,l=function(){function e(){}return e.prototype.ready=function(){var e=this
this.active=this.fixed||this.active,this.fixed||window.document.addEventListener("keydown",function(t){t=t||window.event,t.keyCode==a&&e.close()})},Object.defineProperty(e.prototype,"computedStyle",{get:function(){return this.active?{left:0}:null},enumerable:!0,configurable:!0}),e.prototype.open=function(){this.active||(this.active=!0)},e.prototype.close=function(){this.active&&(this.active=!1)},e.prototype.closeIfNecessary=function(){this.closeOnClick&&this.close()},e=r([i["default"]({props:{closeOnClick:{type:Boolean,required:!1,"default":!1},active:{type:Boolean,required:!1,"default":!1},showActive:{type:Boolean,required:!1,"default":!1},fixed:{type:Boolean,required:!1,"default":!1}},events:{"sidenav::open":function(){this.open()},"sidenav::close":function(){this.$nextTick(this.close)},"nav-item::activated":function(e){this.$broadcast("nav-item::activated",e)}},components:{mdSidenavOverlay:o["default"]},template:n(32)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({template:n(31)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div id="sidenav-overlay"></div>'},function(e,t){e.exports='<div class="md-sidenav">\r\n    <ul v-if="active" transition="side-nav" :style="computedStyle" :class="{fixed: fixed}" class="side-nav">\r\n        <slot></slot>\r\n    </ul>\r\n\r\n    <div v-if="!fixed" @click="close">\r\n        <md-sidenav-overlay v-if="active" transition="modal-overlay"></md-sidenav-overlay>\r\n    </div>\r\n</div>\r\n'},function(e,t){e.exports='<div :class="{\'navbar-fixed\': fixed}"\r\n     :style="fixed ? {position: \'absolute\', top: 0}: {}"\r\n     class="md-navbar">\r\n\r\n    <nav :class="navClass">\r\n        <div class="nav-wrapper" :class="wrapperClass">\r\n            <slot name="content">\r\n                <slot name="logo">\r\n                    <a v-if="title"\r\n                       :href="titleHref" class="brand-logo" :class="logoClasses">\r\n                        {{title}}\r\n                    </a>\r\n                    <a v-if="hamburger" href="javascript:void(0)" class="button-collapse"\r\n                       @click="openSideMenu">\r\n                        <md-icon>menu</md-icon>\r\n                    </a>\r\n                </slot>\r\n\r\n                <slot name="navs">\r\n                    <ul v-if="!onlySideNav" :class="listClasses">\r\n                        <slot></slot>\r\n                    </ul>\r\n                    <md-sidenav :close-on-click="closeOnClick"> <!-- only if is active -->\r\n                        <slot></slot>\r\n                    </md-sidenav>\r\n                </slot>\r\n            </slot>\r\n        </div>\r\n    </nav>\r\n</div>\r\n'},function(e,t){e.exports='<md-navbar class="md-breadcrumbs">\r\n    <div slot="content">\r\n        <a v-for="(label, url) in list" :href="url" class="breadcrumb">\r\n            {{label}}\r\n        </a>\r\n    </div>\r\n</md-navbar>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(15),a=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.compiled=function(){var e=this,t=this.$el.querySelectorAll(".activator")
Array.prototype.slice.call(t).forEach(function(t){t.addEventListener("click",e.open)})
var n=this.$els.revealClose
n&&n.addEventListener("click",this.close)},e.prototype.open=function(){if(!this.active){this.active=!0
var e=this.$els.reveal
e&&(e.style.display="block",o(e,"stop",!1),o(e,{translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"}))}},e.prototype.close=function(){if(this.active){this.active=!1
var e=this.$els.reveal
e&&o(e,{translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function(){e.style.display="none"}})}},Object.defineProperty(e.prototype,"imageSlot",{get:function(){return"image"in this._slotContents},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"titleSlot",{get:function(){return"title"in this._slotContents},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"actionsSlot",{get:function(){return"actions"in this._slotContents},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"revealSlot",{get:function(){return"reveal"in this._slotContents},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{contentClass:{required:!1,"default":null,twoWay:!1},titleInImage:{type:Boolean,required:!1,twoWay:!1,"default":!1},small:{type:Boolean,required:!1,"default":!1,twoWay:!1},medium:{type:Boolean,required:!1,"default":!1,twoWay:!1},large:{type:Boolean,required:!1,"default":!1,twoWay:!1}},template:n(36)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t){e.exports='<div :style="{overflow: revealSlot ? \'hidden\' : \'initial\'}"\r\n     :class="{small: small, medium: medium, large: large}"\r\n     class="md-card card">\r\n    <slot name="card-content">\r\n        <slot name="card-image">\r\n            <div v-if="imageSlot" class="card-image">\r\n                <slot name="image"></slot>\r\n                <div v-if="titleSlot && titleInImage" class="card-title">\r\n                    <slot name="title"></slot>\r\n                </div>\r\n            </div>\r\n        </slot>\r\n\r\n        <div class="card-content" :class="contentClass">\r\n            <div v-if="titleSlot && !titleInImage" class="card-title">\r\n                <slot name="title"></slot>\r\n            </div>\r\n            <slot></slot>\r\n        </div>\r\n\r\n        <slot name="card-action">\r\n            <div v-if="actionsSlot" class="card-action">\r\n                <slot name="actions"></slot>\r\n            </div>\r\n        </slot>\r\n\r\n        <div v-if="revealSlot" v-el:reveal class="card-reveal">\r\n            <i v-el:reveal-close class="material-icons right close">close</i>\r\n            <slot name="reveal"></slot>\r\n        </div>\r\n    </slot>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(12),a=n(4),l=function(){function e(){}return e.prototype.hasSlot=function(e){return void 0===e&&(e="default"),e in this._slotContents},Object.defineProperty(e.prototype,"group",{get:function(){return this.$parent.$data.group},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"resolvedName",{get:function(){return this.name||this.group},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{value:{type:Boolean,required:!1,"default":null},name:{type:String,required:!1,"default":null},disabled:{type:Boolean,required:!1,"default":null}},directives:{bindBoolean:a["default"]},mixins:[o["default"]],template:n(38)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<div class="md-checkbox input-field">\r\n    <i v-if="hasSlot(\'icon-name\')" class="material-icons prefix">\r\n        <slot name="icon-name"></slot>\r\n    </i>\r\n    <input v-model="value"\r\n           :id="id"\r\n           :name="resolvedName"\r\n           v-bind-boolean:disabled="disabled"\r\n           type="checkbox"/>\r\n    <label v-if="hasSlot()" :for="id">\r\n        <slot></slot>\r\n    </label>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{group:{type:String,required:!0}},template:n(40)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="input-field">\r\n    <slot></slot>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{closeable:{type:Boolean,required:!1,"default":!1,twoWay:!1},closed:{type:Boolean,required:!1,"default":!1}},template:n(42)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div v-if="!closed" class="chip md-chip" transition="chip">\r\n    <slot></slot>\r\n    <i v-if="closeable"\r\n       @click="closed = true" class="material-icons">close</i>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{size:{type:String,required:!1,"default":null,twoWay:!1},color:{type:String,required:!1,"default":null,twoWay:!1},flashing:{type:Boolean,required:!1,"default":!1,twoWay:!1}},template:n(44)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="preloader-wrapper active" :class="size">\r\n    <div v-if="!flashing" class="spinner-layer" :class="\'spinner-\' + color + \'-only\'">\r\n        <div class="circle-clipper left">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="gap-patch">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="circle-clipper right">\r\n            <div class="circle"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- flashing -->\r\n    <div v-if="flashing" class="spinner-layer spinner-blue">\r\n        <div class="circle-clipper left">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="gap-patch">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="circle-clipper right">\r\n            <div class="circle"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div v-if="flashing" class="spinner-layer spinner-red">\r\n        <div class="circle-clipper left">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="gap-patch">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="circle-clipper right">\r\n            <div class="circle"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div v-if="flashing" class="spinner-layer spinner-yellow">\r\n        <div class="circle-clipper left">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="gap-patch">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="circle-clipper right">\r\n            <div class="circle"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div v-if="flashing" class="spinner-layer spinner-green">\r\n        <div class="circle-clipper left">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="gap-patch">\r\n            <div class="circle"></div>\r\n        </div>\r\n        <div class="circle-clipper right">\r\n            <div class="circle"></div>\r\n        </div>\r\n    </div>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e.prototype.ready=function(){var e=this
"undefined"!=typeof this.opened&&(this.expendable?this.opened.forEach(function(t){return e.$broadcast("collapsible::open",t,e.expendable)}):this.$broadcast("collapsible::open",this.opened,this.expendable))},e.prototype.open=function(e){return"undefined"!=typeof this.opened&&(this.expendable?this.opened.push(e):this.opened=e),this.$broadcast("collapsible::open",e,this.expendable),!0},e.prototype.close=function(e){return"undefined"!=typeof this.opened&&(this.expendable?this.opened.$remove(e):this.opened=""),this.$broadcast("collapsible::close",e),!0},e.prototype.openedChanged=function(e){var t=this
if(this.expendable){var n=this.$children.filter(function(e){return"CollapsibleItem"==e.$options.name}).map(function(e){return e.id})
n.filter(function(t){return e.indexOf(t)<0}).forEach(function(e){return t.$broadcast("collapsible::close",e)}),this.opened=e,this.opened.forEach(function(e){return t.$broadcast("collapsible::open",e,t.expendable)})}else this.$broadcast("collapsible::open",e,this.expendable)},e=r([i["default"]({props:{opened:{required:!1},popout:{type:Boolean,required:!1,"default":!1,twoWay:!1},expendable:{type:Boolean,required:!1,"default":!1,twoWay:!1}},watch:{expendable:function(){console.log("Error: can not change expandable")},opened:{deep:!0,handler:function(e,t){this.openedChanged(e,t)}}},events:{"collapsible::open":function(e){return this.open(e)},"collapsible::close":function(e){return this.close(e)}},template:n(46)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<ul class="collapsible" :class="{popout: popout}">\r\n    <slot></slot>\r\n</ul>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(11),a=n(15),l=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.compiled=function(){this.active=this.expanded},Object.defineProperty(e.prototype,"id",{get:function(){return this.name?this.name:this._uid},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"computedStyle",{get:function(){return this.active?{display:"block"}:null},enumerable:!0,configurable:!0}),e.prototype.openThis=function(e){var t=this
void 0===e&&(e=!1),this.active||(this.active=!0,e?this.$els.body.style.height="":this.$nextTick(function(){a(t.$els.body,"slideDown",t._slideConfig)}))},Object.defineProperty(e.prototype,"_slideConfig",{get:function(){var e=this
return{duration:350,easing:"easeOutQuart",queue:!1,complete:function(){e.$els.body.style.height=""}}},enumerable:!0,configurable:!0}),e.prototype.open=function(e,t){null===e||"undefined"==typeof e?this.openThis(!0):e==this.id?this.openThis():t||this.closeThis()},e.prototype.closeThis=function(e){var t=this
void 0===e&&(e=!1),this.active&&(this.active=!1,e?this.$els.body.style.height="":this.$nextTick(function(){t.$els.body.style.display="block",a(t.$els.body,"slideUp",t._slideConfig)}))},e.prototype.close=function(e){null===e||"undefined"==typeof e?this.closeThis(!0):e==this.id&&this.closeThis()},e.prototype.toggle=function(){this.active?this.$dispatch("collapsible::close",this.id):this.$dispatch("collapsible::open",this.id)},e=r([i["default"]({props:{name:{type:String,required:!1,"default":!1,twoWay:!1},expanded:{type:Boolean,required:!1,"default":!1,twoWay:!1}},mixins:[o["default"]],events:{"collapsible::open":function(e,t){this.open(e,t)},"collapsible::close":function(e){this.close(e)}},template:n(48)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<li :class="{active: active}">\r\n    <slot name="content">\r\n        <div @click="toggle" class="collapsible-header">\r\n            <slot name="header"></slot>\r\n        </div>\r\n        <div v-el:body class="collapsible-body" :style="computedStyle">\r\n            <slot name="body"></slot>\r\n        </div>\r\n    </slot>\r\n</li>\r\n'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"headerSlot",{get:function(){return"header"in this._slotContents},enumerable:!0,configurable:!0}),e=r([i["default"]({template:n(50)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="collection" :class="{\'with-header\': headerSlot}">\r\n    <div v-if="headerSlot" class="collection-header">\r\n        <slot name="header"></slot>\r\n    </div>\r\n    <slot></slot>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"headerSlot",{get:function(){return"header"in this._slotContents},enumerable:!0,configurable:!0}),e=r([i["default"]({template:n(52)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<ul class="collection" :class="{\'with-header\': headerSlot}">\r\n    <div v-if="headerSlot" class="collection-header">\r\n        <slot name="header"></slot>\r\n    </div>\r\n    <slot></slot>\r\n</ul>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"secondaryContentSlot",{get:function(){return"secondary-content"in this._slotContents},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{active:{type:Boolean,required:!1,"default":!1,twoWay:!1}},template:n(54)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<a class="md-collection-item collection-item" :class="{active: active}">\r\n    <slot></slot>\r\n    <span v-if="secondaryContentSlot" class="secondary-content">\r\n        <slot name="secondary-content"></slot>\r\n    </span>\r\n</a>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"secondaryContentSlot",{get:function(){return"secondary-content"in this._slotContents},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{active:{type:Boolean,required:!1,"default":!1,twoWay:!1}},template:n(56)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<li class="md-collection-item collection-item" :class="{active: active}">\r\n    <slot></slot>\r\n    <span v-if="secondaryContentSlot" class="secondary-content">\r\n        <slot name="secondary-content"></slot>\r\n    </span>\r\n</li>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(21),a=n(58),l=n(59),s=n(6),c=function(){function e(){}return e.prototype.open=function(e){this.$broadcast("dropdown-list::open",e)},e.prototype.close=function(){this.$broadcast("dropdown-list::close")},e=r([i["default"]({props:{title:{type:String,required:!1,"default":"",twoWay:!1},value:{type:String,required:!1,"default":""}},directives:{onClickAway:s["default"]},components:{mdButton:o["default"],mdDropdownList:a["default"],mdDropdownItem:l["default"]},events:{"dropdown-list::close":function(){this.$broadcast("dropdown-list::close"),this.$dispatch("dropdown::close")},"dropdown-item::selected":function(e){return this.value=e,!0},"dropdown::open":function(e){this.$broadcast("dropdown-list::open",e)}},template:n(63)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=c},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(21),a=n(59),l=n(61),s=function(){function e(){}return e.prototype.data=function(){return{active:!1,style:{}}},e.prototype.toggle=function(e){(this.active?this.hide:this.open)(e)},e.prototype.open=function(e){this.active||(this.style=this.computeStyle(e.currentTarget),this.active=!0)},e.prototype.close=function(){this.hide()},e.prototype.hide=function(){this.active&&(this.style={},this.active=!1)},e.prototype.computeStyle=function(e){var t=l["default"].getOffset(e),n=e.offsetWidth||100,r=t.top||0,i=t.left||0
return{width:n+"px",position:"absolute",top:r+"px",left:i+"px",opacity:1,display:"block"}},e=r([i["default"]({components:{mbButton:o["default"],mdDropdownItem:a["default"]},events:{"dropdown-list::close":function(){this.hide()},"dropdown-list::open":function(e){this.open(e)}},template:n(62)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e.prototype.select=function(){this.closing&&this.$dispatch("dropdown-list::close"),this.$dispatch("dropdown-item::selected",this.id)},Object.defineProperty(e.prototype,"id",{get:function(){return this.name?this.name:this._uid},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{closing:{type:Boolean,required:!1,"default":!0,twoWay:!1},name:{type:String,required:!1,"default":null,twoWay:!1}},template:n(60)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<li @click.prevent="select">\r\n    <a href="javascript:void(0)">\r\n        <slot></slot>\r\n    </a>\r\n</li>'},function(e,t){"use strict"
var n=function(){function e(){}return e.merge=function(t,n){var r={}
return e.addAll(r,t),e.addAll(r,n),r},e.addAll=function(e,t){for(var n in t)e[n]=t[n]
return e},e.getOffset=function(e){var t=0,n=0
do t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent
while(e)
return{top:t,left:n}},e.generatePagination=function(e){var t=[],n=e.currentPage
t.push(n)
for(var r=1;t.length<e.displayPages&&t.length<e.pages;){var i=n+r
i>=0&&i<e.pages&&t.push(i),r=r>0?-1*r:-1*r+1}return t=t.sort(function(e,t){return e-t})},e}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=n},function(e,t){e.exports='<ul class="dropdown-content"\r\n    :class="{active: active}" :style="style">\r\n    <slot></slot>\r\n</ul>\r\n'},function(e,t){e.exports='<div v-on-click-away="close">\r\n    <md-dropdown-list>\r\n        <slot></slot>\r\n    </md-dropdown-list>\r\n\r\n    <span @click="open">\r\n        <slot name="button">\r\n            <md-button href="javascript:void(0)"\r\n                 :class="{active: active}"\r\n                 class="dropdown-button">\r\n                {{title}}\r\n                <i class="mdi-navigation-arrow-drop-down right"></i>\r\n            </md-button>\r\n        </slot>\r\n    </span>\r\n</div>\r\n'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e.prototype.ready=function(){var e=this
this.events.forEach(function(t){e.$on(t,function(){var n=[t].concat(Array.prototype.slice.call(arguments))
e.$broadcast.apply(e,n)})})},e=r([i["default"]({props:{events:{type:Array,required:!0}},template:n(65)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports="<slot></slot>"},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(21),a=n(22),l=n(15),s=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.ready=function(){"hover"==this.event?(this.$els.fab.addEventListener("mouseenter",this.open),this.$els.fab.addEventListener("mouseleave",this.close)):this.$els.fab.addEventListener(this.event,this.toggle)},e.prototype.toggle=function(){this.active?this.close():this.open()},e.prototype.open=function(){if(!this.active){this.active=!0
var e,t
this.horizontal?t=40:e=40
var n=Array.prototype.slice.call(this.$el.querySelectorAll("ul .btn-floating"))
l(n,{scaleY:".4",scaleX:".4",translateY:e+"px",translateX:t+"px"},{duration:0})
var r=0
n.reverse().forEach(function(e){l(e,{opacity:"1",scaleX:"1",scaleY:"1",translateY:"0",translateX:"0"},{duration:80,delay:r}),r+=40})}},e.prototype.close=function(){if(this.active){this.active=!1
var e,t
this.horizontal?t=40:e=40
var n=Array.prototype.slice.call(this.$el.querySelectorAll("ul .btn-floating"))
l(n,"stop",!0),l(n,{opacity:"0",scaleX:".4",scaleY:".4",translateY:e+"px",translateX:t+"px"},{duration:80})}},e=r([i["default"]({props:{horizontal:{type:Boolean,required:!1,"default":!1},event:{type:String,required:!1,"default":"hover"}},components:{mdButton:o["default"],mdIcon:a["default"]},template:n(67)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t){e.exports='<div v-el:fab class="md-fab fixed-action-btn" :class="{horizontal: horizontal}">\r\n    <slot name="button">\r\n        <md-button floating large class="red">\r\n            <slot name="icon">\r\n                <md-icon class="large">\r\n                    <slot name="icon-name">\r\n                        menu\r\n                    </slot>\r\n                </md-icon>\r\n            </slot>\r\n        </md-button>\r\n    </slot>\r\n    <ul :style="{visibility: active ? \'visible\' : \'hidden\'}">\r\n        <slot></slot>\r\n    </ul>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(12),a=n(4),l=function(){function e(){}return e.prototype.selectFile=function(e){this.value=Array.prototype.slice.call(e.target.files).map(function(e){return e.name}).join(", ")},e=r([i["default"]({props:{value:{type:String,required:!1,"default":null},name:{type:String,required:!0},placeholder:{type:String,required:!1,"default":""},multiple:{type:Boolean,required:!1,"default":!1}},directives:{bindBoolean:a["default"]},mixins:[o["default"]],template:n(69)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<div class="file-field input-field">\r\n    <div class="btn">\r\n        <slot>\r\n            <span>File</span>\r\n        </slot>\r\n        <input @change="selectFile" :name="name"\r\n               v-bind-boolean:multiple="multiple" type="file">\r\n    </div>\r\n    <div class="file-path-wrapper">\r\n        <input v-model="value"\r\n               :placeholder="placeholder"\r\n               class="file-path field" type="text">\r\n    </div>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(12),a=n(4),l=function(){function e(){}return e.prototype.data=function(){return{active:!1}},Object.defineProperty(e.prototype,"hasValue",{get:function(){return"number"==typeof this.value?null!==this.value&&"undefined"!=typeof this.value:!!this.value},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"labelClasses",{get:function(){return{active:this.placeholder||this.active||this.hasValue,disabled:this.disabled}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"validationClass",{get:function(){return{invalid:this.errorMsg&&0==this.valid,valid:this.successMsg&&1==this.valid}},enumerable:!0,configurable:!0}),e.prototype.hasSlot=function(e){return void 0===e&&(e="default"),e in this._slotContents},e.prototype.activateField=function(){this.active=!0},e.prototype.deactivateField=function(){this.active=!1},e=r([i["default"]({props:{value:{required:!1,"default":null},name:{type:String,required:!1,"default":null,twoWay:!1},placeholder:{type:String,required:!1,"default":null,twoWay:!1},disabled:{type:Boolean,required:!1,"default":null,twoWay:!1},type:{type:String,required:!1,"default":"text",twoWay:!1},lazy:{type:Boolean,required:!1,"default":!1,twoWay:!1},number:{type:Boolean,required:!1,"default":!1,twoWay:!1},debounce:{type:Number,required:!1,"default":0,twoWay:!1},errorMsg:{type:String,required:!1,"default":null,twoWay:!1},successMsg:{type:String,required:!1,"default":null,twoWay:!1},valid:{type:Boolean,required:!1,"default":null,twoWay:!1}},directives:{bindBoolean:a["default"]},mixins:[o["default"]],template:n(71)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<div class="input-field">\r\n    <i v-if="hasSlot(\'icon-name\')" class="material-icons prefix">\r\n        <slot name="icon-name"></slot>\r\n    </i>\r\n    <input v-if="disabled"\r\n           v-model="value"\r\n           :name="name"\r\n           :placeholder="placeholder" :id="id"\r\n           :type="type"\r\n           :lazy="lazy"\r\n           v-bind-boolean:number="number"\r\n           :debounce="debounce"\r\n           disabled="disabled"/>\r\n    <input v-else\r\n           v-model="value"\r\n           :name="name"\r\n           :placeholder="placeholder" :id="id"\r\n           :type="type"\r\n           :lazy="lazy"\r\n           v-bind-boolean:number="number"\r\n           :debounce="debounce"\r\n           @focus="activateField"\r\n           @blur="deactivateField"\r\n           class="validate"\r\n           :class="validationClass"/>\r\n    <label v-if="hasSlot()" :for="id" :class="labelClasses"\r\n           :data-error="errorMsg" :data-success="successMsg">\r\n        <slot></slot>\r\n    </label>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{label:{type:String,required:!1,"default":!1}},template:n(73)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<li class="optgroup">\r\n    <span>\r\n        {{label}}\r\n    </span>\r\n</li>\r\n<slot></slot>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(4),a=n(12),l=function(){function e(){}return e.prototype.data=function(){return{active:!1}},Object.defineProperty(e.prototype,"content",{get:function(){return this._slotContents?this._slotContents["default"]:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"multiple",{get:function(){return this.$parent.multiple},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"computedClasses",{get:function(){return{disabled:this.disabled,active:this.active&&!this.disabled,selected:this.active&&!this.disabled}},enumerable:!0,configurable:!0}),e.prototype.toggle=function(){this.active?this.unselect():this.select()},e.prototype.select=function(){this.active||this.disabled||(this.active=!0,this.$dispatch("select::select",this.value))},e.prototype.unselect=function(){this.active&&this.multiple&&(this.active=!1,this.$dispatch("select::unselect",this.value,this))},e.prototype.optionSelect=function(e){this.multiple?this.active||this.value!=e||(this.active=!0):this.value==e?this.active=!0:this.active=!1},e.prototype.optionUnselect=function(e){this.multiple?this.active&&this.value==e&&(this.active=!1):this.value==e&&(this.active=!1)},e=r([i["default"]({props:{disabled:{type:Boolean,required:!1,"default":!1},value:{type:String,required:!0}},events:{"option::select":function(e){this.optionSelect(e)},"option::unselect":function(e){this.optionUnselect(e)}},directives:{bindBoolean:o["default"]},mixins:[a["default"]],template:n(75)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<li @click.prevent="toggle" :class="computedClasses">\r\n    <span>\r\n        <input v-show="multiple" v-model="active"\r\n               v-bind-boolean:disabled="disabled"\r\n               type="checkbox">\r\n        <label v-if="multiple"></label>\r\n        <slot></slot>\r\n    </span>\r\n</li>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(4),a=n(5),l=n(12),s=function(){function e(){}return Object.defineProperty(e.prototype,"field",{get:function(){return this.$els.field},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"group",{get:function(){return this.$parent.group},enumerable:!0,configurable:!0}),e.prototype.hasSlot=function(e){return void 0===e&&(e="default"),e in this._slotContents},e=r([i["default"]({props:{value:{type:String,required:!1,"default":null},radioValue:{required:!0},disabled:{type:Boolean,required:!1,"default":!1}},directives:{bindBoolean:o["default"],bindRaw:a["default"]},mixins:[l["default"]],template:n(77)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t){e.exports='<span class="md-radio">\r\n    <input v-model="value"\r\n           :value="radioValue"\r\n           v-bind-boolean:disabled="disabled"\r\n           v-bind-boolean:checked="checked"\r\n           :id="id" :name="group"\r\n           type="radio"/>\r\n    <label v-if="hasSlot()" :for="id">\r\n        <slot></slot>\r\n    </label>\r\n</span>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({props:{group:{type:String,required:!0}},template:n(79)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="input-field">\r\n    <slot></slot>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(58),a=n(12),l=n(6),s=n(4),c=c||n(2),u=function(){function e(){}return e.prototype.data=function(){return{active:!1,options:{}}},e.prototype.compiled=function(){for(var e=this.$getAllChildren().filter(function(e){return"SelectOption"==e.$options.name}),t=0;t<e.length;t++){var n=e[t],r=this.createOption(n)
c.set(this.options,r.value,r)}},e.prototype.ready=function(){this.refreshDropdownOptions()},e.prototype.createOption=function(e){var t=e.content.textContent
e._scope&&(t=e._scope.$interpolate(t))
var n=e.value,r=e.disabled
return{content:t,value:n,disabled:r}},Object.defineProperty(e.prototype,"multiple",{get:function(){return Array.isArray(this.value)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valueContent",{get:function(){return Array.isArray(this.value)?this.valueContentMultiple:this.valueContentSingle},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valueContentSingle",{get:function(){return this.options[this.value]?this.options[this.value].content:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valueContentMultiple",{get:function(){var e=this
return this.value.length?this.value.map(function(t){return e.options[t]?e.options[t].content:""}).join(", "):this.options[this.defaultSelect]?this.options[this.defaultSelect].content:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"field",{get:function(){return this.$els.field},enumerable:!0,configurable:!0}),e.prototype.hasSlot=function(e){return void 0===e&&(e="default"),e in this._slotContents},e.prototype.refreshDropdownOptions=function(){var e=this,t=Array.prototype.slice.call(this.field.options)
t.forEach(function(t){t.selected?e.$broadcast("option::select",t.value):e.multiple&&e.$broadcast("option::unselect",t.value)})},e.prototype.open=function(e){this.active||(this.active=!0,this.$broadcast("dropdown-list::open",e))},e.prototype.close=function(){this.active&&(this.active=!1,this.$broadcast("dropdown-list::close"))},e=r([i["default"]({props:{value:{required:!1,"default":null},name:{type:String,required:!1,"default":null,twoWay:!1}},events:{"select::select":function(e){return Array.isArray(this.value)?this.value.push(e):(this.value=e,this.close()),this.$broadcast("option::select",e),!0},"select::unselect":function(e){return Array.isArray(this.value)?this.value.$remove(e):this.value=e,this.$broadcast("option::unselect",e),!0}},watch:{value:function(){this.$nextTick(this.refreshDropdownOptions)}},components:{mdDropdownList:o["default"]},directives:{clickAway:l["default"],bindBoolean:s["default"]},mixins:[a["default"]],template:n(81)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=u},function(e,t){e.exports='<div class="md-select input-field" v-click-away="close">\r\n    <i v-if="hasSlot(\'icon-name\')" class="material-icons prefix">\r\n        <slot name="icon-name"></slot>\r\n    </i>\r\n    <div class="select-wrapper">\r\n        <span class="caret">▼</span>\r\n        <input @click="open" readonly="readonly" :value="valueContent" :name="name"\r\n               type="text" class="select-dropdown">\r\n\r\n        <md-dropdown-list :active="active" class="select-dropdown">\r\n            <slot></slot>\r\n        </md-dropdown-list>\r\n\r\n        <select v-el:field\r\n                v-model="value"\r\n                v-bind-boolean:multiple="multiple"\r\n                :placeholder="placeholder" :id="id"\r\n                :type="type">\r\n            <option v-for="opt in options" :value="opt.value" v-bind-boolean:disabled="opt.disabled">{{opt.content}}</option>\r\n        </select>\r\n    </div>\r\n    <label v-if="hasSlot(\'label\')" :for="id" :class="labelClasses">\r\n        <slot name="label"></slot>\r\n    </label>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(12),a=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.ready=function(){this.chars=this.value?this.value.length:0},Object.defineProperty(e.prototype,"labelClasses",{get:function(){return{active:this.active||this.value,disabled:this.disabled}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lines",{get:function(){return this.value?this.value.split("\n").length:0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"field",{get:function(){return this.$els.field},enumerable:!0,configurable:!0}),e.prototype.hasSlot=function(e){return void 0===e&&(e="default"),e in this._slotContents},e.prototype.resize=function(e){var t=e.target.value?e.target.value.length:0,n=window.getComputedStyle(this.field),r=parseInt(n.getPropertyValue("padding-bottom"))+parseInt(n.getPropertyValue("padding-top"))
t<this.chars&&(this.field.style.height="auto"),this.field.style.height=this.field.scrollHeight-r+"px",this.chars=t},e.prototype.delayedResize=function(e){var t=this
window.setTimeout(function(){t.resize(e)},0)},e.prototype.activateField=function(){this.active=!0},e.prototype.deactivateField=function(){this.active=!1},e=r([i["default"]({props:{value:{type:String,required:!1,"default":null},name:{type:String,required:!1,"default":null,twoWay:!1},disabled:{type:Boolean,required:!1,"default":null,twoWay:!1},autoresize:{type:Boolean,required:!1,"default":!0,twoWay:!1},lazy:{type:Boolean,required:!1,"default":!1,twoWay:!1},number:{type:Boolean,required:!1,"default":!1,twoWay:!1},debounce:{type:Number,required:!1,"default":0,twoWay:!1}},mixins:[o["default"]],template:n(83)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t){e.exports='<div class="md-textarea input-field">\r\n    <i v-if="hasSlot(\'icon-name\')" class="material-icons prefix">\r\n        <slot name="icon-name"></slot>\r\n    </i>\r\n    <textarea v-if="disabled"\r\n              v-el:field\r\n              v-model="value"\r\n              :name="name"\r\n              :id="id" class="materialize-textarea"\r\n              :lazy="lazy" :number="number" :debounce="debounce"\r\n              disabled="disabled">\r\n    </textarea>\r\n    <textarea v-else\r\n              v-el:field\r\n              v-model="value"\r\n              :name="name"\r\n              :id="id"\r\n              :lazy="lazy" :number="number" :debounce="debounce"\r\n              @focus="activateField"\r\n              @blur="deactivateField"\r\n              @keyup="resize"\r\n              class="materialize-textarea">\r\n    </textarea>\r\n    <label v-if="hasSlot()" :for="id" :class="labelClasses">\r\n        <slot></slot>\r\n    </label>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(85),a=n(86),l=27,s=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.compiled=function(){this.$els.img.setAttribute("src",this.src)},e.prototype.ready=function(){var e=this,t=this.$els.img,n=this.$els.placeholder
this.materialBox=new o["default"](t,n),window.addEventListener("keyup",function(t){t.keyCode===l&&e.close()}),window.addEventListener("scroll",function(){e.close()})},e.prototype.toggle=function(){this.active?this.close():this.maximialize()},e.prototype.maximialize=function(){this.active||(this.active=!0,this.originalSizes=this.getSizes(),this.materialBox.maximalize(this.originalSizes))},e.prototype.close=function(){this.active&&(this.active=!1,this.materialBox.close(this.originalSizes))},e.prototype.getSizes=function(){var e=this.$els.img
return{width:e.offsetWidth,height:e.offsetHeight,left:e.offsetLeft,top:e.offsetTop}},e=r([i["default"]({props:{src:{type:String,required:!0,twoWay:!1},caption:{type:String,required:!1,"default":null,twoWay:!1},height:{type:String,required:!1,"default":null,twoWay:!1},width:{type:String,required:!1,"default":null,twoWay:!1}},components:{mdLeanOverlay:a["default"]},template:n(88)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t,n){"use strict"
var r=n(15),i=275,o=200,a=function(){function e(e,t){this.overlayActive=!1,this.img=e,this.placeholder=t}return e.prototype.maximalize=function(e){var t,n,o=e.width,a=e.height,l=window.innerWidth,s=window.innerHeight
this.overlayActive=!0,this.placeholder.style.width=this.placeholder.offsetWidth+"px",this.placeholder.style.height=this.placeholder.offsetHeight+"px",this.placeholder.style.position="relative",this.placeholder.style.top="0px",this.placeholder.style.left="0px",t=void 0,n=this.placeholder.parentElement
for(;null!==n&&n!==document;){var c=n
"hidden"===c.style.overflow&&(c.style.overflow="visible",t=void 0===t?c:t.add(c)),n=n.parentElement}this.img.style.position="absolute",this.img.style.zIndex="1003"
var u=0,d=o/l,f=a/s,p=0,v=0
d>f?(u=a/o,p=.9*l,v=.9*l*u):(u=o/a,p=.9*s*u,v=.9*s),this.img.classList.contains("responsive-img")?r(this.img,{"max-width":p,width:o},{duration:0,queue:!1,complete:function(){this.img.style.left="0px",this.img.style.top="0px",r(this.img,{height:v,width:p,left:window.scrollX+l/2-this.placeholder.offsetLeft-p/2,top:window.scrollY+s/2-this.placeholder.offsetTop-v/2},{duration:i,queue:!1,easing:"easeOutQuad"})}}):(this.img.style.left="0px",this.img.style.top="0px",r(this.img,{height:v,width:p,left:window.scrollX+l/2-this.placeholder.offsetLeft-p/2,top:window.scrollY+s/2-this.placeholder.offsetTop-v/2},{duration:i,queue:!1,easing:"easeOutQuad"})),window.addEventListener("scroll",function(){this.overlayActive&&this.returnToOriginal()})},e.prototype.close=function(e){this.returnToOriginal(e)},e.prototype.returnToOriginal=function(e){var t=(window.innerWidth,window.innerHeight,e.width),n=e.height
r(this.img,"stop",!0),r(this.img,{width:t,height:n,left:0,top:0},{duration:o,queue:!1,easing:"easeOutQuad"}),this.img.style.height="",this.img.style.top="",this.img.style.left="",this.img.style.width="",this.img.style.maxWidth="",this.img.style.position="",this.img.style.zIndex=""},e}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e=r([i["default"]({template:n(87)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="lean-overlay" style="z-index: 1002; display: block; opacity: 0.5;"></div>'},function(e,t){e.exports='<div class="md-image">\r\n    <div v-el:placeholder class="material-placeholder">\r\n        <img @click="toggle" :height="height" :width="width"\r\n             v-el:img\r\n             class="materialboxed"\r\n             :class="{active: active}">\r\n    </div>\r\n\r\n    <md-lean-overlay v-if="active" @click="toggle" transition="modal-overlay"></md-lean-overlay>\r\n    <div v-if="active && caption" transition="fade" class="caption-wrapper">\r\n        <div class="materialbox-caption" style="display: block">\r\n            {{caption}}\r\n        </div>\r\n    </div>\r\n</div>\r\n'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"computedStyle",{get:function(){return null!=this.value?{width:this.value+"%"}:null},enumerable:!0,configurable:!0}),e=r([i["default"]({props:{value:{type:Number,required:!1,"default":null,twoWay:!1}},template:n(90)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="progress">\r\n    <div :class="{determinate: value != null, indeterminate: value == null}" :style="computedStyle"></div>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(86),a=27,l=function(){function e(){}return e.prototype.data=function(){return{active:!1}},e.prototype.ready=function(){var e=this
window.document.addEventListener("keydown",function(t){t=t||window.event,t.keyCode==a&&e.close()})},Object.defineProperty(e.prototype,"computedStyle",{get:function(){return this.active?this.bottom?{"z-index":1003,display:"block",opacity:1,bottom:"0px"}:{"z-index":1003,display:"block",top:"10%"}:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"computedClasses",{get:function(){var e=""
return this["class"]&&(e+=this["class"]),this.bottom&&(e+=" ",e+="bottom-sheet"),e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"transition",{get:function(){return this.bottom?"modal-bottom":"modal"},enumerable:!0,configurable:!0}),e.prototype.open=function(){this.active||(this.active=!0)},e.prototype.close=function(){this.active&&(this.active=!1,this.result=null)},e=r([i["default"]({props:{id:{type:String,required:!1,"default":null},result:{type:String,required:!1,"default":null},"class":{type:String,required:!1,"default":"",twoWay:!1},bottom:{type:Boolean,required:!1,"default":!1,twoWay:!1}},components:{mdLeanOverlay:o["default"]},events:{"modal::open":function(e){null===this.id||"undefined"==typeof this.id?this.open():this.id==e&&this.open()},"modal::close":function(e,t){return null===this.id||"undefined"==typeof this.id||this.id==t?(this.close(),this.result=e,!0):void 0}},watch:{active:function(e){e?window.document.body.style.overflow="hidden":window.document.body.style.overflow="visible"}},template:n(92)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<div v-if="active" :id="id" :transition="transition"\r\n     :style="computedStyle" class="modal" :class="computedClasses">\r\n    <slot name="content">\r\n        <div class="modal-content">\r\n            <slot></slot>\r\n        </div>\r\n        <div class="modal-footer">\r\n            <slot name="footer"></slot>\r\n        </div>\r\n    </slot>\r\n</div>\r\n\r\n<md-lean-overlay v-if="active" transition="modal-overlay"\r\n                 @click="close">\r\n</md-lean-overlay>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e.prototype.ready=function(){1==this.active&&this.$dispatch("nav-item::activated",this.id)},Object.defineProperty(e.prototype,"id",{get:function(){return null!=this.name?this.name:this._uid},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"content",{get:function(){return this._slotContents?this._slotContents["default"]:""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showActive",{get:function(){return this.$parent.showActive},enumerable:!0,configurable:!0}),e.prototype.clicked=function(){this.$dispatch("nav-item::activated",this.id)},e=r([i["default"]({props:{name:{type:String,required:!1,"default":null,twoWay:!1},href:{type:String,required:!1,"default":"javascript:void(0)",twoWay:!1},active:{type:Boolean,required:!1,"default":!1}},events:{"nav-item::activated":function(e){1==this.showActive&&(this.active=this.id==e)}},template:n(94)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<li @click="clicked" :class="{active: active}">\r\n    <slot name="content">\r\n        <a :href="href">\r\n            <slot></slot>\r\n        </a>\r\n    </slot>\r\n</li>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(22),a=n(8),l=n(61),s=function(){function e(){}return Object.defineProperty(e.prototype,"pages",{get:function(){return Math.max(Math.ceil(this.totalRecords/this.pageSize),1)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pager",{get:function(){return l["default"].generatePagination(this)},enumerable:!0,configurable:!0}),e.prototype.getSelected=function(){return{currentPage:this.currentPage,pageSize:this.pageSize,from:this.currentPage*this.pageSize,to:(this.currentPage+1)*this.pageSize,size:this.pageSize}},e.prototype.getClasses=function(e){var t={}
if(this.itemClass instanceof Array)this.itemClass.forEach(function(e,n,r){t[e]=!0})
else if(this.itemClass instanceof Object)for(var n in this.itemClass)t[n]=this.itemClass[n]
else t[this.itemClass]=!0
return t.active=e==this.currentPage,t},e.prototype.setCurrentPage=function(e){this.currentPage=e},e.prototype.previousPage=function(){this.currentPage>0&&this.currentPage--},e.prototype.nextPage=function(){this.currentPage<this.pages-1&&this.currentPage++},e=r([i["default"]({props:{currentPage:{type:Number,"default":0},pageSize:{type:Number,required:!0,twoWay:!1},totalRecords:{type:Number,required:!0,twoWay:!1},displayPages:{type:Number,required:!1,"default":5,twoWay:!1},itemClass:{required:!1,"default":null,twoWay:!1},firstLast:{type:Boolean,required:!1,"default":!1,twoWay:!1}},components:{mdIcon:o["default"]},directives:{waveEffect:a["default"]},watch:{currentPage:function(){this.$dispatch("pagination::selected",this.pagesWindow)},pages:{handler:function(){this.currentPage>=this.pages&&(this.currentPage=this.pages-1)}}},template:n(96)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=s},function(e,t){e.exports='<ul class="pagination">\r\n    <li :class="{disabled: currentPage == 0}">\r\n        <a v-if="firstLast" @click.prevent="currentPage = 0" href="#"><i class="material-icons">chevron_left</i></a>\r\n        <a @click.prevent="previousPage" href="#"><i class="material-icons">chevron_left</i></a>\r\n    </li>\r\n\r\n    <li v-for="n in pager"\r\n        @click.prevent="setCurrentPage(n)"\r\n        :class="getClasses(n)" v-wave-effect>\r\n        <a @click.prevent href="#">{{n + 1}}</a>\r\n    </li>\r\n\r\n    <li :class="{disabled: currentPage == pages - 1}">\r\n        <a @click.prevent="nextPage" href="#"><i class="material-icons">chevron_right</i></a>\r\n        <a v-if="firstLast" @click.prevent="currentPage = pages - 1" href="#"><i class="material-icons">chevron_right</i></a>\r\n    </li>\r\n</ul>\r\n'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=o||n(2),a=function(){function e(){}return e.prototype.compiled=function(){this.$els.img.setAttribute("src",this.img)},e.prototype.ready=function(){this._setClasses(this.active)},e.prototype.data=function(){var e=this.$parent.$children.indexOf(this)
return{active:!1,position:e,classes:{}}},Object.defineProperty(e.prototype,"src",{get:function(){return this.img},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"computedClasses",{get:function(){return this.classes},enumerable:!0,configurable:!0}),e.prototype.setActive=function(e){this.active=this.position==e},e.prototype._setClasses=function(e){o.set(this.classes,"active",e),o.set(this.classes,"fadeIn",e),o.set(this.classes,"fadeOut",!e)},e=r([i["default"]({props:{img:{type:String,required:!1,"default":null},align:{type:String,required:!1,"default":""}},events:{"slider::activate":function(e){this.setActive(e)}},watch:{active:function(e){this._setClasses(e)}},template:n(98)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t){e.exports='<li :class="computedClasses">\r\n    <img v-el:img>\r\n    <div class="caption" :class="align + \'-align\'">\r\n        <slot></slot>\r\n    </div>\r\n</li>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return e.prototype.data=function(){return{activeItem:0,itemsCount:0}},e.prototype.ready=function(){this.$broadcast("slider::activate",this.activeItem),this.interval=this.interval?this.interval:4e3,this.itemsCount=this.$children.length,this.setupInterval()},e.prototype.handler=function(){this.$children&&(this.activeItem=(this.activeItem+1)%this.itemsCount,this.$broadcast("slider::activate",this.activeItem))},e.prototype.setupInterval=function(){this.intervalHandler=setInterval(this.handler,this.interval)},e.prototype.clearInterval=function(){this.intervalHandler&&(clearInterval(this.intervalHandler),this.intervalHandler=null)},e.prototype.setActive=function(e){this.$broadcast("slider::activate",e),this.activeItem=e,this.clearInterval()},e=r([i["default"]({interval:{type:Number,"default":4e3,validator:function(e){return e>1e3}},template:n(100)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<div class="slider">\r\n    <ul class="slides">\r\n        <slot></slot>\r\n    </ul>\r\n    <ul class="indicators">\r\n        <li v-for="index in itemsCount"\r\n            @click="setActive(index)"\r\n            @mouseover="activeItem == index && clearInterval(index)"\r\n            @mouseout="setupInterval(index)"\r\n            :class="{active: activeItem == index}" class="indicator-item"></li>\r\n    </ul>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(12),a=n(4),l=function(){function e(){}return e=r([i["default"]({props:{value:{type:Boolean,required:!1,"default":null},name:{type:String,required:!1,"default":null,twoWay:!1},disabled:{type:Boolean,required:!1,"default":!1}},directives:{bindBoolean:a["default"]},mixins:[o["default"]],template:n(102)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=l},function(e,t){e.exports='<div class="switch">\r\n    <label>\r\n        <slot name="off">Off</slot>\r\n        <input v-model="value"\r\n               v-bind-boolean:disabled="disabled"\r\n               :name="name"\r\n               type="checkbox">\r\n        <span class="lever"></span>\r\n        <slot name="on">On</slot>\r\n    </label>\r\n</div>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=function(){function e(){}return Object.defineProperty(e.prototype,"computedClasses",{get:function(){return this.disabled?["disabled"]:[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"index",{get:function(){return this.$parent.$children.indexOf(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"id",{get:function(){return this.name?this.name:this.index},enumerable:!0,configurable:!0}),e.prototype.ready=function(){for(var e=window.location.hash,t=this.$el,n=t.getElementsByTagName("A"),r=0;r<n.length;r++){var i=n[r]
e==i.getAttribute("href")&&this.setAsSelected()}},e.prototype.setAsSelected=function(){this.disabled||this.$dispatch("tabs::on-select",this)},e.prototype.select=function(e){this.id==e&&this.setAsSelected()},e=r([i["default"]({props:{disabled:{type:Boolean,required:!1,"default":!1,twoWay:!1},name:{type:String,required:!1,"default":null,twoWay:!1}},events:{"tab::select":function(e){this.select(e)}},template:n(104)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o},function(e,t){e.exports='<li @click="setAsSelected" class="tab col" :class="computedClasses">\r\n    <slot></slot>\r\n</li>'},function(e,t,n){"use strict"
var r=function(e,t,n,r){var i,o=arguments.length,a=3>o?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r)
else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(a=(3>o?i(a):o>3?i(t,n,a):i(t,n))||a)
return o>3&&a&&Object.defineProperty(t,n,a),a},i=n(19),o=n(15),a=function(){function e(){}return e.prototype.ready=function(){window.addEventListener("resize",this.resizeIndicator)},e.prototype.data=function(){return{indicator:{left:"0",right:"0"}}},Object.defineProperty(e.prototype,"tabsCount",{get:function(){return this.$children?this.$children.length:0},enumerable:!0,configurable:!0}),e.prototype.select=function(e){this.activeTab=e,this.active=e.id
var t=e.$el,n=t.parentElement,r=this.$els.indicator,i=parseInt(r.style.left,10)||this.indicator.left,o=parseInt(r.style.right,10)||this.indicator.right
return this.moveIndicator(i,t.offsetLeft,o,n.offsetWidth-t.offsetLeft-t.offsetWidth),!0},e.prototype.resizeIndicator=function(){if(this.activeTab){var e=this.$els.indicator,t=this.activeTab.index,n=this.activeTab.$el,r=n.parentElement,i=r.offsetWidth,o=Math.max(i,r.scrollWidth)/this.tabsCount
0!==o&&0!==i&&(e.style.right=i-(t+1)*o+"px",e.style.left=t*o+"px")}},e.prototype.moveIndicator=function(e,t,n,r){var i=this.$els.indicator
t-e>=0?(o(i,{right:r},{duration:300,queue:!1,easing:"easeOutQuad"}),o(i,{left:t},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})):(o(i,{left:t},{duration:300,queue:!1,easing:"easeOutQuad"}),o(i,{right:r},{duration:300,queue:!1,easing:"easeOutQuad",delay:90}))},e=r([i["default"]({props:{active:{required:!1,"default":null}},watch:{active:function(e){this.$broadcast("tab::select",e)}},events:{"tabs::on-select":function(e){this.select(e)}},template:n(106)})],e)}()
Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a},function(e,t){e.exports='<div class="md-tabs">\r\n    <ul class="tabs">\r\n        <slot></slot>\r\n        <div v-el:indicator class="indicator"></div>\r\n    </ul>\r\n\r\n    <slot name="contents"></slot>\r\n</div>\r\n'},function(e,t){}])})
