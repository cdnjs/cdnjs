!function(){"use strict";function t(e,n,i){return n=void 0===n?1:n,i=i||n+1,i-n<=1?function(){if(arguments.length<=n||"string"===r.type(arguments[n]))return e.apply(this,arguments);var t,i=arguments[n];for(var o in i){var s=Array.prototype.slice.call(arguments);s.splice(n,1,o,i[o]),t=e.apply(this,s)}return t}:t(t(e,n+1,i),n,i-1)}function e(t,r,i){var o=n(i);if("string"===o){var s=Object.getOwnPropertyDescriptor(r,i);!s||s.writable&&s.configurable&&s.enumerable&&!s.get&&!s.set?t[i]=r[i]:(delete t[i],Object.defineProperty(t,i,s))}else if("array"===o)i.forEach(function(n){n in r&&e(t,r,n)});else for(var a in r)i&&("regexp"===o&&!i.test(a)||"function"===o&&!i.call(r,a))||e(t,r,a);return t}function n(t){if(null===t)return"null";if(void 0===t)return"undefined";var e=(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase();return"number"==e&&isNaN(t)?"nan":e}var r=self.Bliss=e(function(t,e){return 2==arguments.length&&!e||!t?null:"string"===r.type(t)?(e||document).querySelector(t):t||null},self.Bliss);e(r,{extend:e,overload:t,type:n,property:r.property||"_",listeners:self.WeakMap?new WeakMap:new Map,original:{addEventListener:(self.EventTarget||Node).prototype.addEventListener,removeEventListener:(self.EventTarget||Node).prototype.removeEventListener},sources:{},noop:function(){},$:function(t,e){return t instanceof Node||t instanceof Window?[t]:2!=arguments.length||e?Array.prototype.slice.call("string"==typeof t?(e||document).querySelectorAll(t):t||[]):[]},defined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},create:function(t,e){return t instanceof Node?r.set(t,e):(1===arguments.length&&("string"===r.type(t)?e={}:(e=t,t=e.tag,e=r.extend({},e,function(t){return"tag"!==t}))),r.set(document.createElement(t||"div"),e))},each:function(t,e,n){n=n||{};for(var r in t)n[r]=e.call(t,r,t[r]);return n},ready:function(t,e,n){if("function"!=typeof t||e||(e=t,t=void 0),t=t||document,e&&("loading"!==t.readyState?e():r.once(t,"DOMContentLoaded",function(){e()})),!n)return new Promise(function(e){r.ready(t,e,!0)})},Class:function(t){var e,n=["constructor","extends","abstract","static"].concat(Object.keys(r.classProps)),i=t.hasOwnProperty("constructor")?t.constructor:r.noop;2==arguments.length?(e=arguments[0],t=arguments[1]):(e=function(){if(this.constructor.__abstract&&this.constructor===e)throw new Error("Abstract classes cannot be directly instantiated.");e["super"]&&e["super"].apply(this,arguments),i.apply(this,arguments)},e["super"]=t["extends"]||null,e.prototype=r.extend(Object.create(e["super"]?e["super"].prototype:Object),{constructor:e}),e.prototype["super"]=e["super"]?e["super"].prototype:null,e.__abstract=!!t["abstract"]);var o=function(t){return this.hasOwnProperty(t)&&n.indexOf(t)===-1};if(t["static"]){r.extend(e,t["static"],o);for(var s in r.classProps)s in t["static"]&&r.classProps[s](e,t["static"][s])}r.extend(e.prototype,t,o);for(var s in r.classProps)s in t&&r.classProps[s](e.prototype,t[s]);return e},classProps:{lazy:t(function(t,e,n){return Object.defineProperty(t,e,{get:function(){var t=n.call(this);return Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0}),t},set:function(t){Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0})},configurable:!0,enumerable:!0}),t}),live:t(function(t,e,n){return"function"===r.type(n)&&(n={set:n}),Object.defineProperty(t,e,{get:function(){var t=this["_"+e],r=n.get&&n.get.call(this,t);return void 0!==r?r:t},set:function(t){var r=this["_"+e],i=n.set&&n.set.call(this,t,r);this["_"+e]=void 0!==i?i:t},configurable:n.configurable,enumerable:n.enumerable}),t})},include:function(){var t=arguments[arguments.length-1],e=2===arguments.length&&arguments[0],n=document.createElement("script");return e?Promise.resolve():new Promise(function(e,i){r.set(n,{async:!0,onload:function(){e(n),n.parentNode&&n.parentNode.removeChild(n)},onerror:function(){i(n)},src:t,inside:document.head})})},load:function o(t,e){e=e?new URL(e,location.href):location.href,t=new URL(t,e);var n=o.loading=o.loading||{};return n[t+""]?n[t+""]:/\.css$/.test(t.pathname)?n[t+""]=new Promise(function(e,n){var i=r.create("link",{href:t,rel:"stylesheet",inside:document.head,onload:function(){e(i)},onerror:function(){n(i)}})}):n[t+""]=r.include(t)},fetch:function(t,n){if(!t)throw new TypeError("URL parameter is mandatory and cannot be "+t);var i=e({url:new URL(t,location),data:"",method:"GET",headers:{},xhr:new XMLHttpRequest},n);i.method=i.method.toUpperCase(),r.hooks.run("fetch-args",i),"GET"===i.method&&i.data&&(i.url.search+=i.data),document.body.setAttribute("data-loading",i.url),i.xhr.open(i.method,i.url.href,i.async!==!1,i.user,i.password);for(var o in n)if("upload"===o)i.xhr.upload&&"object"==typeof n[o]&&r.extend(i.xhr.upload,n[o]);else if(o in i.xhr)try{i.xhr[o]=n[o]}catch(s){self.console&&console.error(s)}var a=Object.keys(i.headers).map(function(t){return t.toLowerCase()});"GET"!==i.method&&a.indexOf("content-type")===-1&&i.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var c in i.headers)void 0!==i.headers[c]&&i.xhr.setRequestHeader(c,i.headers[c]);var u=new Promise(function(t,e){i.xhr.onload=function(){document.body.removeAttribute("data-loading"),0===i.xhr.status||i.xhr.status>=200&&i.xhr.status<300||304===i.xhr.status?t(i.xhr):e(r.extend(Error(i.xhr.statusText),{xhr:i.xhr,get status(){return this.xhr.status}}))},i.xhr.onerror=function(){document.body.removeAttribute("data-loading"),e(r.extend(Error("Network Error"),{xhr:i.xhr}))},i.xhr.ontimeout=function(){document.body.removeAttribute("data-loading"),e(r.extend(Error("Network Timeout"),{xhr:i.xhr}))},i.xhr.send("GET"===i.method?null:i.data)});return u.xhr=i.xhr,u},value:function(t){var e="string"!=typeof t;return r.$(arguments).slice(+e).reduce(function(t,e){return t&&t[e]},e?t:self)}}),r.Hooks=new r.Class({add:function(t,e,n){if("string"==typeof arguments[0])(Array.isArray(t)?t:[t]).forEach(function(t){this[t]=this[t]||[],e&&this[t][n?"unshift":"push"](e)},this);else for(var t in arguments[0])this.add(t,arguments[0][t],arguments[1])},run:function(t,e){this[t]=this[t]||[],this[t].forEach(function(t){t.call(e&&e.context?e.context:e,e)})}}),r.hooks=new r.Hooks;r.property;r.Element=function(t){this.subject=t,this.data={},this.bliss={}},r.Element.prototype={set:t(function(t,e){t in r.setProps?r.setProps[t].call(this,e):t in this?this[t]=e:this.setAttribute(t,e)},0),transition:function(t,e){return new Promise(function(n,i){if("transition"in this.style&&0!==e){var o=r.extend({},this.style,/^transition(Duration|Property)$/);r.style(this,{transitionDuration:(e||400)+"ms",transitionProperty:Object.keys(t).join(", ")}),r.once(this,"transitionend",function(){clearTimeout(s),r.style(this,o),n(this)});var s=setTimeout(n,e+50,this);r.style(this,t)}else r.style(this,t),n(this)}.bind(this))},fire:function(t,e){var n=document.createEvent("HTMLEvents");return n.initEvent(t,!0,!0),this.dispatchEvent(r.extend(n,e))},bind:t(function(t,e){if(arguments.length>1&&("function"===r.type(e)||e.handleEvent)){var n=e;e="object"===r.type(arguments[2])?arguments[2]:{capture:!!arguments[2]},e.callback=n}var i=r.listeners.get(this)||{};t.trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0]}i[t]=i[t]||[],0===i[t].filter(function(t){return t.callback===e.callback&&t.capture==e.capture}).length&&i[t].push(r.extend({className:n},e)),r.original.addEventListener.call(this,t,e.callback,e)},this),r.listeners.set(this,i)},0),unbind:t(function(t,e){if(e&&("function"===r.type(e)||e.handleEvent)){var n=e;e=arguments[2]}"boolean"==r.type(e)&&(e={capture:e}),e=e||{},e.callback=e.callback||n;var i=r.listeners.get(this);(t||"").trim().split(/\s+/).forEach(function(t){if(t.indexOf(".")>-1){t=t.split(".");var n=t[1];t=t[0]}if(i){for(var o in i)if(!t||o===t)for(var s,a=0;s=i[o][a];a++)n&&n!==s.className||e.callback&&e.callback!==s.callback||!!e.capture!=!!s.capture&&(t||e.callback||void 0!==e.capture)||(i[o].splice(a,1),r.original.removeEventListener.call(this,o,s.callback,s.capture),a--)}else if(t&&e.callback)return r.original.removeEventListener.call(this,t,e.callback,e.capture)},this)},0),when:function(t,e){var n=this;return new Promise(function(r){n.addEventListener(t,function i(n){e&&!e.call(this,n)||(this.removeEventListener(t,i),r(n))})})},toggleAttribute:function(t,e,n){arguments.length<3&&(n=null!==e),n?this.setAttribute(t,e):this.removeAttribute(t)}},r.setProps={style:function(t){for(var e in t)e in this.style?this.style[e]=t[e]:this.style.setProperty(e,t[e])},attributes:function(t){for(var e in t)this.setAttribute(e,t[e])},properties:function(t){r.extend(this,t)},events:function(t){if(1!=arguments.length||!t||!t.addEventListener)return r.bind.apply(this,[this].concat(r.$(arguments)));var e=this;if(r.listeners){var n=r.listeners.get(t);for(var i in n)n[i].forEach(function(t){r.bind(e,i,t.callback,t.capture)})}for(var o in t)0===o.indexOf("on")&&(this[o]=t[o])},once:t(function(t,e){var n=this,i=function(){return r.unbind(n,t,i),e.apply(n,arguments)};r.bind(this,t,i,{once:!0})},0),delegate:t(function(t,e,n){r.bind(this,t,function(t){t.target.closest(e)&&n.call(this,t)})},0,2),contents:function(t){(t||0===t)&&(Array.isArray(t)?t:[t]).forEach(function(t){var e=r.type(t);/^(string|number)$/.test(e)?t=document.createTextNode(t+""):"object"===e&&(t=r.create(t)),t instanceof Node&&this.appendChild(t)},this)},inside:function(t){t&&t.appendChild(this)},before:function(t){t&&t.parentNode.insertBefore(this,t)},after:function(t){t&&t.parentNode.insertBefore(this,t.nextSibling)},start:function(t){t&&t.insertBefore(this,t.firstChild)},around:function(t){t&&t.parentNode&&r.before(this,t),this.appendChild(t)}},r.Array=function(t){this.subject=t},r.Array.prototype={all:function(t){var e=r.$(arguments).slice(1);return this[t].apply(this,e)}},r.add=t(function(t,e,n,i){n=r.extend({$:!0,element:!0,array:!0},n),"function"==r.type(e)&&(!n.element||t in r.Element.prototype&&i||(r.Element.prototype[t]=function(){return this.subject&&r.defined(e.apply(this.subject,arguments),this.subject)}),!n.array||t in r.Array.prototype&&i||(r.Array.prototype[t]=function(){var t=arguments;return this.subject.map(function(n){return n&&r.defined(e.apply(n,t),n)})}),n.$&&(r.sources[t]=r[t]=e,(n.array||n.element)&&(r[t]=function(){var e=[].slice.apply(arguments),i=e.shift(),o=n.array&&Array.isArray(i)?"Array":"Element";return r[o].prototype[t].apply({subject:i},e)})))},0),r.add(r.Array.prototype,{element:!1}),r.add(r.Element.prototype),r.add(r.setProps),r.add(r.classProps,{element:!1,array:!1});var i=document.createElement("_");r.add(r.extend({},HTMLElement.prototype,function(t){return"function"===r.type(i[t])}),null,!0)}();
/* jsep v0.3.2 (http://jsep.from.so/) */
!function(e){"use strict";var r=function(e,r){var t=new Error(e+" at character "+r);throw t.index=r,t.description=e,t},t={"-":!0,"!":!0,"~":!0,"+":!0},n={"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":10,"/":10,"%":10},o=function(e){var r,t=0;for(var n in e)(r=n.length)>t&&e.hasOwnProperty(n)&&(t=r);return t},i=o(t),a=o(n),u={true:!0,false:!1,null:null},s=function(e){return n[e]||0},p=function(e,r,t){return{type:"||"===e||"&&"===e?"LogicalExpression":"BinaryExpression",operator:e,left:r,right:t}},f=function(e){return e>=48&&e<=57},c=function(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||e>=128&&!n[String.fromCharCode(e)]},l=function(e){return 36===e||95===e||e>=65&&e<=90||e>=97&&e<=122||e>=48&&e<=57||e>=128&&!n[String.fromCharCode(e)]},d=function(e){for(var o,d,h=0,v=e.charAt,x=e.charCodeAt,y=function(r){return v.call(e,r)},m=function(r){return x.call(e,r)},b=e.length,E=function(){for(var e=m(h);32===e||9===e||10===e||13===e;)e=m(++h)},g=function(){var e,t,n=w();return E(),63!==m(h)?n:(h++,(e=g())||r("Expected expression",h),E(),58===m(h)?(h++,(t=g())||r("Expected expression",h),{type:"ConditionalExpression",test:n,consequent:e,alternate:t}):void r("Expected :",h))},C=function(){E();for(var r=e.substr(h,a),t=r.length;t>0;){if(n.hasOwnProperty(r))return h+=t,r;r=r.substr(0,--t)}return!1},w=function(){var e,t,n,o,i,a,u,f;if(a=O(),!(t=C()))return a;for(i={value:t,prec:s(t)},(u=O())||r("Expected expression after "+t,h),o=[a,i,u];(t=C())&&0!==(n=s(t));){for(i={value:t,prec:n};o.length>2&&n<=o[o.length-2].prec;)u=o.pop(),t=o.pop().value,a=o.pop(),e=p(t,a,u),o.push(e);(e=O())||r("Expected expression after "+t,h),o.push(i,e)}for(e=o[f=o.length-1];f>1;)e=p(o[f-1].value,o[f-2],e),f-=2;return e},O=function(){var r,n,o;if(E(),r=m(h),f(r)||46===r)return U();if(39===r||34===r)return k();if(91===r)return S();for(o=(n=e.substr(h,i)).length;o>0;){if(t.hasOwnProperty(n))return h+=o,{type:"UnaryExpression",operator:n,argument:O(),prefix:!0};n=n.substr(0,--o)}return!(!c(r)&&40!==r)&&A()},U=function(){for(var e,t,n="";f(m(h));)n+=y(h++);if(46===m(h))for(n+=y(h++);f(m(h));)n+=y(h++);if("e"===(e=y(h))||"E"===e){for(n+=y(h++),"+"!==(e=y(h))&&"-"!==e||(n+=y(h++));f(m(h));)n+=y(h++);f(m(h-1))||r("Expected exponent ("+n+y(h)+")",h)}return t=m(h),c(t)?r("Variable names cannot start with a number ("+n+y(h)+")",h):46===t&&r("Unexpected period",h),{type:"Literal",value:parseFloat(n),raw:n}},k=function(){for(var e,t="",n=y(h++),o=!1;h<b;){if((e=y(h++))===n){o=!0;break}if("\\"===e)switch(e=y(h++)){case"n":t+="\n";break;case"r":t+="\r";break;case"t":t+="\t";break;case"b":t+="\b";break;case"f":t+="\f";break;case"v":t+="\v";break;default:t+=e}else t+=e}return o||r('Unclosed quote after "'+t+'"',h),{type:"Literal",value:t,raw:n+t+n}},L=function(){var t,n=m(h),o=h;for(c(n)?h++:r("Unexpected "+y(h),h);h<b&&(n=m(h),l(n));)h++;return t=e.slice(o,h),u.hasOwnProperty(t)?{type:"Literal",value:u[t],raw:t}:"this"===t?{type:"ThisExpression"}:{type:"Identifier",name:t}},j=function(e){for(var t,n,o=[],i=!1;h<b;){if(E(),(t=m(h))===e){i=!0,h++;break}44===t?h++:((n=g())&&"Compound"!==n.type||r("Expected comma",h),o.push(n))}return i||r("Expected "+String.fromCharCode(e),h),o},A=function(){var e,t;for(t=40===(e=m(h))?P():L(),E(),e=m(h);46===e||91===e||40===e;)h++,46===e?(E(),t={type:"MemberExpression",computed:!1,object:t,property:L()}):91===e?(t={type:"MemberExpression",computed:!0,object:t,property:g()},E(),93!==(e=m(h))&&r("Unclosed [",h),h++):40===e&&(t={type:"CallExpression",arguments:j(41),callee:t}),E(),e=m(h);return t},P=function(){h++;var e=g();if(E(),41===m(h))return h++,e;r("Unclosed (",h)},S=function(){return h++,{type:"ArrayExpression",elements:j(93)}},B=[];h<b;)59===(o=m(h))||44===o?h++:(d=g())?B.push(d):h<b&&r('Unexpected "'+y(h)+'"',h);return 1===B.length?B[0]:{type:"Compound",body:B}};if(d.version="0.3.2",d.toString=function(){return"JavaScript Expression Parser (JSEP) v"+d.version},d.addUnaryOp=function(e){return i=Math.max(e.length,i),t[e]=!0,this},d.addBinaryOp=function(e,r){return a=Math.max(e.length,a),n[e]=r,this},d.addLiteral=function(e,r){return u[e]=r,this},d.removeUnaryOp=function(e){return delete t[e],e.length===i&&(i=o(t)),this},d.removeAllUnaryOps=function(){return t={},i=0,this},d.removeBinaryOp=function(e){return delete n[e],e.length===a&&(a=o(n)),this},d.removeAllBinaryOps=function(){return n={},a=0,this},d.removeLiteral=function(e){return delete u[e],this},d.removeAllLiterals=function(){return u={},this},"undefined"==typeof exports){var h=e.jsep;e.jsep=d,d.noConflict=function(){return e.jsep===d&&(e.jsep=h),d}}else"undefined"!=typeof module&&module.exports?exports=module.exports=d:exports.parse=d}(this);
//# sourceMappingURL=jsep.min.js.map
!function(){if(self.Element&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||null),Element.prototype.matches)){var p=self.Stretchy={selectors:{base:'textarea, select:not([size]), input:not([type]), input[type="'+"text number url email tel".split(" ").join('"], input[type="')+'"]',filter:"*"},script:document.currentScript||t("script").pop(),resize:function(e){if(p.resizes(e)){var t,i=getComputedStyle(e),n=0;!e.value&&e.placeholder&&(t=!0,e.value=e.placeholder);var o=e.nodeName.toLowerCase();if("textarea"==o)e.style.height="0","border-box"==i.boxSizing?n=e.offsetHeight:"content-box"==i.boxSizing&&(n=-e.clientHeight+parseFloat(i.minHeight)),e.style.height=e.scrollHeight+n+"px";else if("input"==o)if(e.style.width="1000px",e.offsetWidth){e.style.width="0",
"border-box"==i.boxSizing?n=e.offsetWidth:"padding-box"==i.boxSizing?n=e.clientWidth:"content-box"==i.boxSizing&&(n=parseFloat(i.minWidth));var r=Math.max(n,e.scrollWidth-e.clientWidth);e.style.width=r+"px";for(var l=0;l<10&&(e.scrollLeft=1e10,0!=e.scrollLeft);l++)r+=e.scrollLeft,e.style.width=r+"px"}else e.style.width=e.value.length+1+"ch";else if("select"==o){var s,c=0<e.selectedIndex?e.selectedIndex:0,a=document.createElement("_");for(var d in a.textContent=e.options[c].textContent,e.parentNode.insertBefore(a,e.nextSibling),i){var h=i[d];/^(width|webkitLogicalWidth|length)$/.test(d)||"string"!=typeof h||(a.style[d]=h,/appearance$/i.test(d)&&(s=d))}a.style.width="",0<a.offsetWidth&&(e.style.width=a.offsetWidth+"px",i[s]&&"none"===i[s]||(e.style.width="calc("+e.style.width+" + 2em)")),a.parentNode.removeChild(a),a=null}t&&(e.value="")}},resizeAll:function(e){t(e||p.selectors.base).forEach(function(e){p.resize(e)})},active:!0,resizes:function(e){
return e&&e.parentNode&&e.matches&&e.matches(p.selectors.base)&&e.matches(p.selectors.filter)},init:function(){p.selectors.filter=p.script.getAttribute("data-filter")||(t("[data-stretchy-filter]").pop()||document.body).getAttribute("data-stretchy-filter")||p.selectors.filter,p.resizeAll(),self.MutationObserver&&!p.observer&&(p.observer=new MutationObserver(function(e){p.active&&e.forEach(function(e){"childList"==e.type&&p.resizeAll(e.addedNodes)})}),p.observer.observe(document.documentElement,{childList:!0,subtree:!0}))},$$:t};"loading"!==document.readyState?requestAnimationFrame(p.init):document.addEventListener("DOMContentLoaded",p.init),window.addEventListener("load",function(){p.resizeAll()});var e=function(e){p.active&&p.resize(e.target)};document.documentElement.addEventListener("input",e),document.documentElement.addEventListener("change",e)}function t(e,t){return e instanceof Node||e instanceof Window?[e]:[].slice.call("string"==typeof e?(t||document).querySelectorAll(e):e||[])
}}();
//# sourceMappingURL=stretchy.min.js.map

"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Mavo: Create web applications by writing HTML and CSS!
 * @author Lea Verou and contributors
 * @version v0.2.0
 */
(function ($, $$) {
  var _ = self.Mavo = $.Class({
    constructor: function constructor(element) {
      var _this = this;

      this.treeBuilt = Mavo.promise();
      this.dataLoaded = Mavo.promise();
      this.deleted = [];
      this.element = element;
      this.inProgress = false; // Index among other mavos in the page, 1 is first

      this.index = Object.keys(_.all).length + 1;
      Object.defineProperty(_.all, this.index - 1, {
        value: this,
        configurable: true
      }); // Convert any data-mv-* attributes to mv-*

      Mavo.attributeStartsWith("data-mv-", this.element).forEach(function (attribute) {
        var element = attribute.ownerElement;
        var name = attribute.name.replace("data-", "");

        if (!element.attributes[name]) {
          element.setAttribute(name, attribute.value);
        }
      }); // Assign a unique (for the page) id to this mavo instance

      this.id = Mavo.getAttribute(this.element, "mv-app", "id") || "mavo".concat(this.index);

      if (this.id in _.all) {
        // Duplicate app name
        for (var i = 2; this.id + i in _.all; i++) {}

        this.id = this.id + i;
      }

      _.all[this.id] = this;
      this.element.setAttribute("mv-app", this.id);
      var lang = Mavo.getClosestAttribute(this.element, "lang") || Mavo.locale;
      this.locale = Mavo.Locale.get(lang); // Should we start in edit mode?

      this.autoEdit = this.element.classList.contains("mv-autoedit"); // Should we save automatically?

      this.autoSave = this.element.hasAttribute("mv-autosave");
      this.autoSaveDelay = (this.element.getAttribute("mv-autosave") || 0) * 1000;
      Mavo.setAttributeShy(this.element, "typeof", "");
      Mavo.hooks.run("init-start", this); // ----- Heuristic for groups ------
      // First, add property attributes to mv-multiple elements without one

      $$(_.selectors.multiple, this.element).forEach(function (element) {
        _.setAttributeShy(element, "property", "");
      }); // Now, turn properties that contain other properties into groups

      $$(_.selectors.primitive, this.element).forEach(function (element) {
        if ($(_.selectors.property, element)) {
          // contains other properties
          var config = Mavo.Primitive.getConfig(element);

          if (!config.attribute && !config.hasChildren || Mavo.is("multiple", element)) {
            Mavo.setAttributeShy(element, "typeof", "");
          }
        }
      });
      this.expressions = new Mavo.Expressions(this); // Build mavo objects

      Mavo.hooks.run("init-tree-before", this);
      this.root = new Mavo.Group(this.element, this);
      this.treeBuilt.resolve();
      Mavo.hooks.run("init-tree-after", this);
      this.permissions = new Mavo.Permissions();
      var backendTypes = ["source", "storage", "init"]; // order is significant!
      // Figure out backends for storage, data reads, and initialization respectively

      backendTypes.forEach(function (role) {
        return _this.updateBackend(role);
      });
      this.backendObserver = new Mavo.Observer(this.element, backendTypes.map(function (role) {
        return "mv-" + role;
      }), function (records) {
        var changed = {};
        var roles = records.map(function (record) {
          var role = record.attributeName.replace(/^mv-/, "");
          changed[role] = _this.updateBackend(role);
          return role;
        }); // Do we need to re-load data?

        if (changed.source) {
          // if source changes, always reload
          _this.load();
        } else if (!_this.source) {
          if (changed.storage || changed.init && !_this.root.data) {
            _this.load();
          }
        }
      });
      this.permissions.can("login", function () {
        // We also support a URL param to trigger login, in case the user doesn't want visible login UI
        if (Mavo.Functions.url("login") !== null && _this.index == 1 || Mavo.Functions.url(_this.id + "-login") !== null) {
          _this.primaryBackend.login();
        }
      }); // Update login status

      $.bind(this.element, "mv-login.mavo", function (evt) {
        if (evt.backend == (_this.source || _this.storage)) {
          // If last time we rendered we got nothing, maybe now we'll have better luck?
          if (!_this.root.data && !_this.unsavedChanges) {
            _this.load();
          }
        }
      });
      this.bar = new Mavo.UI.Bar(this); // Prevent editing properties inside <summary> to open and close the summary (fix bug #82)

      if ($("summary [property]:not([typeof])")) {
        this.element.addEventListener("click", function (evt) {
          if (evt.target != document.activeElement) {
            evt.preventDefault();
          }
        });
      } // Is there any control that requires an edit button?


      this.needsEdit = this.calculateNeedsEdit();
      this.setUnsavedChanges(false);
      this.permissions.onchange(function (_ref) {
        var action = _ref.action,
            value = _ref.value;
        var permissions = _this.element.getAttribute("mv-permissions") || "";
        permissions = permissions.trim().split(/\s+/).filter(function (a) {
          return a != action;
        });

        if (value) {
          permissions.push(action);
        }

        _this.element.setAttribute("mv-permissions", permissions.join(" "));
      });
      this.permissions.can(["edit", "add", "delete"], function () {
        // Observe entire tree for mv-mode changes
        _this.modeObserver = new Mavo.Observer(_this.element, "mv-mode", function (records) {
          records.forEach(function (record) {
            var element = record.target;

            var nodes = _.Node.children(element);

            nodeloop: for (var _i = 0; _i < nodes.length; _i++) {
              var node = nodes[_i];
              var previousMode = node.mode,
                  mode = void 0;

              if (node.element == element) {
                // If attribute set directly on a Mavo node, then it forces it into that mode
                // otherwise, descendant nodes still inherit, unless they are also mode-restricted
                mode = node.element.getAttribute("mv-mode");
                node.modes = mode;
              } else {
                // Inherited
                if (node.modes) {
                  // Mode-restricted, we cannot change to the other mode
                  continue nodeloop;
                }

                mode = _.getStyle(node.element.parentNode, "--mv-mode");
              }

              node.mode = mode;

              if (previousMode != node.mode) {
                node[node.mode == "edit" ? "edit" : "done"]();
              }
            }
          });
        }, {
          subtree: true
        });

        if (_this.autoEdit) {
          _this.edit();
        }
      }, function () {
        // cannot
        _this.modeObserver && _this.modeObserver.destroy();
      });

      if (this.storage || this.source) {
        // Fetch existing data
        this.permissions.can("read", function () {
          return _this.load();
        });
      } else {
        // No storage or source
        requestAnimationFrame(function () {
          _this.dataLoaded.resolve();

          _this.expressions.update();

          $.fire(_this.element, "mv-load");
        });
      } // Dynamic ids


      $.bind(this.element, "mv-load.mavo", function (evt) {
        if (location.hash) {
          var callback = function callback(records) {
            var target = document.getElementById(location.hash.slice(1));

            if (target || !location.hash) {
              if (_this.element.contains(target)) {
                requestAnimationFrame(function () {
                  // Give the browser a chance to render
                  Mavo.scrollIntoViewIfNeeded(target);
                });
              }

              if (_this.idObserver) {
                _this.idObserver.destroy();

                _this.idObserver = null;
              }
            }

            return target;
          };

          if (!callback()) {
            // No target, perhaps not yet?
            _this.idObserver = new Mavo.Observer(_this.element, "id", callback, {
              subtree: true
            });
          }
        }

        requestAnimationFrame(function () {
          return Stretchy.resizeAll();
        });
      });

      if (this.autoSave) {
        this.dataLoaded.then(function (evt) {
          var debouncedSave = _.debounce(function () {
            _this.save();
          }, _this.autoSaveDelay);

          var callback = function callback(evt) {
            if (evt.node.saved) {
              debouncedSave();
            }
          };

          requestAnimationFrame(function () {
            _this.permissions.can("save", function () {
              $.bind(_this.element, "mv-change.mavo:autosave", callback);
            }, function () {
              $.unbind(_this.element, "mv-change.mavo:autosave", callback);
            });
          });
        });
      } // Keyboard navigation


      this.element.addEventListener("keydown", function (evt) {
        // Ctrl + S or Cmd + S to save
        if (_this.permissions.save && evt.keyCode == 83 && evt[_.superKey] && !evt.altKey) {
          evt.preventDefault();

          _this.save();
        } else if (evt.keyCode == 38 || evt.keyCode == 40) {
          var element = evt.target;

          if (element.matches("textarea, input[type=range], input[type=number]")) {
            // Arrow keys are meaningful here
            return;
          }

          if (element.matches(".mv-editor")) {
            var editor = true;
            element = element.parentNode;
          }

          var node = Mavo.Node.get(element);

          if (node && node.closestCollection) {
            var nextNode = node.getCousin(evt.keyCode == 38 ? -1 : 1, {
              wrap: true
            });

            if (nextNode) {
              if (editor && nextNode.editing) {
                nextNode.edit({
                  immediately: true
                }).then(function () {
                  return nextNode.editor.focus();
                });
              } else {
                nextNode.element.focus();
              }

              evt.preventDefault();
            }
          }
        }
      });
      $.bind(this.element, "click submit", _.Actions.listener);
      Mavo.hooks.run("init-end", this);
    },

    get editing() {
      return this.root.editing;
    },

    getData: function getData(o) {
      return this.root.getData(o);
    },
    toJSON: function toJSON() {
      return _.toJSON(this.getData());
    },
    message: function message(_message) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new _.UI.Message(this, _message, options);
    },
    error: function error(message) {
      this.message(message, {
        type: "error",
        dismiss: ["button", "timeout"]
      }); // Log more info for programmers

      for (var _len = arguments.length, log = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        log[_key - 1] = arguments[_key];
      }

      if (log.length > 0) {
        var _console;

        (_console = console).log.apply(_console, ["%c".concat(this.id, ": ").concat(message), "color: red; font-weight: bold"].concat(log));
      }
    },
    render: function render(data) {
      var env = {
        context: this,
        data: data
      };

      _.hooks.run("render-start", env);

      if (env.data) {
        this.root.render(env.data);
      }

      this.unsavedChanges = false;

      _.hooks.run("render-end", env);
    },
    edit: function edit() {
      this.root.edit(); // Highlight collection item when item controls are hovered

      $.bind(this.element, "mouseenter.mavo:edit mouseleave.mavo:edit", function (evt) {
        if (evt.target.matches(_.selectors.multiple)) {
          evt.target.classList.remove("mv-has-hovered-item");
          var parent = evt.target.parentNode.closest(_.selectors.multiple);

          if (parent) {
            parent.classList.toggle("mv-has-hovered-item", evt.type == "mouseenter");
          }
        }
      }, true);
      this.setUnsavedChanges();
    },
    // Conclude editing
    done: function done() {
      this.root.done();
      $.unbind(this.element, ".mavo:edit");
      this.unsavedChanges = false;
    },

    /**
     * Set this mavo instance’s unsavedChanges flag.
     * @param {Boolean} [value]
     *        If true, just sets the flag to true, no traversal.
     *        If false, sets the flag of the Mavo instance and every tree node to false
     *        If not provided, traverses the tree and recalculates the flag value.
     */
    setUnsavedChanges: function setUnsavedChanges(value) {
      var unsavedChanges = !!value;

      if (!value) {
        this.walk(function (obj) {
          if (obj.unsavedChanges) {
            unsavedChanges = true;

            if (value === false) {
              obj.unsavedChanges = false;
            }

            return false;
          }
        });
      }

      return this.unsavedChanges = unsavedChanges;
    },

    /**
     * Update the backend for a given role
     * @return {Boolean} true if a change occurred, false otherwise
     */
    updateBackend: function updateBackend(role) {
      var previous = this[role],
          backend,
          changed;

      if (this.index == 1) {
        backend = _.Functions.url(role);
      }

      if (!backend) {
        backend = _.Functions.url("".concat(this.id, "-").concat(role)) || this.element.getAttribute("mv-" + role) || null;
      }

      if (backend) {
        backend = backend.trim();

        if (backend == "none") {
          backend = null;
        }
      }

      if (backend && (!previous || !previous.equals(backend))) {
        // We have a string, convert to a backend object if different than existing
        this[role] = backend = _.Backend.create(backend, {
          mavo: this,
          format: this.element.getAttribute("mv-".concat(role, "-format")) || this.element.getAttribute("mv-format")
        }, this.element.getAttribute("mv-".concat(role, "-type")), this[role]);
        changed = true;
      } else if (!backend) {
        // We had a backend and now we will un-have it
        this[role] = null;
      }

      changed = changed || (backend ? !backend.equals(previous) : !!previous);

      if (changed) {
        // A change occured
        if (!this.storage && !this.source && this.init) {
          // If init is present with no storage and no source, init is equivalent to source
          this.source = this.init;
          this.init = null;
        }

        var permissions = this.storage ? this.storage.permissions : new Mavo.Permissions({
          edit: true,
          save: false
        });
        permissions.parent = this.source && this.source.permissions;
        this.permissions.parent = permissions;
        this.primaryBackend = this.storage || this.source;
      }

      return changed;
    },

    /**
     * load - Fetch data from source and render it.
     *
     * @return {Promise}  A promise that resolves when the data is loaded.
     */
    load: function load() {
      var _this2 = this;

      var backend = this.source || this.storage;

      if (!backend) {
        return Promise.resolve();
      }

      this.inProgress = "Loading";
      return backend.ready.then(function () {
        return backend.load();
      })["catch"](function (err) {
        // Try again with init
        if (_this2.init && _this2.init != backend) {
          backend = _this2.init;
          return _this2.init.ready.then(function () {
            return _this2.init.load();
          });
        } // No init, propagate error


        return Promise.reject(err);
      })["catch"](function (err) {
        if (err) {
          var xhr = err instanceof XMLHttpRequest ? err : err.xhr;

          if (xhr && xhr.status == 404) {
            _this2.render(null);
          } else {
            var message = _this2._("problem-loading");

            if (xhr) {
              message += xhr.status ? _this2._("http-error", err) : ": " + _this2._("cant-connect");
            }

            _this2.error(message, err);
          }
        }

        return null;
      }).then(function (data) {
        return _this2.render(data);
      }).then(function () {
        _this2.inProgress = false;
        requestAnimationFrame(function () {
          _this2.dataLoaded.resolve();

          $.fire(_this2.element, "mv-load");
        });
      });
    },
    store: function store() {
      var _this3 = this;

      if (!this.storage) {
        return Promise.resolve();
      }

      this.inProgress = "Saving";
      return this.storage.store(this.getData())["catch"](function (err) {
        if (err) {
          var message = _this3._("problem-saving");

          if (err instanceof XMLHttpRequest) {
            message += ": " + (err.status ? _this3._("http-error", err) : _this3._("cant-connect"));
          }

          _this3.error(message, err);
        }

        return null;
      }).then(function (saved) {
        _this3.inProgress = false;
        return saved;
      });
    },
    upload: function upload(file) {
      var _this4 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "images/" + file.name;

      if (!this.uploadBackend) {
        return Promise.reject();
      }

      this.inProgress = this._("uploading");
      return this.uploadBackend.upload(file, path).then(function (url) {
        _this4.inProgress = false;
        return url;
      })["catch"](function (err) {
        _this4.error(_this4._("error-uploading"), err);

        _this4.inProgress = false;
        return null;
      });
    },
    save: function save() {
      var _this5 = this;

      return this.store().then(function (saved) {
        if (saved) {
          $.fire(_this5.element, "mv-save", saved);
          _this5.lastSaved = Date.now();

          _this5.root.save();

          _this5.unsavedChanges = false;
        }
      });
    },
    walk: function walk() {
      var _this$root;

      return (_this$root = this.root).walk.apply(_this$root, arguments);
    },
    calculateNeedsEdit: function calculateNeedsEdit(test) {
      var needsEdit = false;
      this.walk(function (obj, path) {
        if (needsEdit) {
          // If already true, no need to descend further
          return false;
        } // True if both modes are allowed and node is not group


        needsEdit = !obj.modes && !(obj instanceof Mavo.Group);
        return !obj.modes;
      }, undefined, {
        descentReturn: true
      });
      return needsEdit;
    },
    changed: function changed(change) {
      if (!this.root) {
        // No tree yet
        return;
      }

      if (this.expressions.active) {
        this.expressions.updateThrottled(change);
      }
    },
    setDeleted: function setDeleted() {
      var _this$deleted,
          _this6 = this;

      // Clear previous deleted item(s)
      this.deleted.forEach(function (node) {
        return node.destroy();
      });
      this.deleted.length = [];

      if (this.deletionNotice) {
        this.deletionNotice.close();
      }

      for (var _len2 = arguments.length, nodes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nodes[_key2] = arguments[_key2];
      }

      if (!nodes.length) {
        return;
      }

      (_this$deleted = this.deleted).push.apply(_this$deleted, nodes);

      if (nodes.length == 1) {
        var phrase = nodes[0].name;
      } else {
        // Multiple items deleted, possibly from multiple collections
        var counts = {},
            ret = [];
        nodes.forEach(function (n) {
          counts[n.name] = (counts[n.name] || 0) + 1;
        });

        for (var name in counts) {
          ret.push(this._("n-items", {
            name: name,
            n: counts[name]
          }));
        }

        var phrase = ret.join(", ");
      }

      var notice = this.deletionNotice = this.message([this._("item-deleted", {
        name: phrase
      }), {
        tag: "button",
        type: "button",
        textContent: this._("undo"),
        events: {
          click: function click(evt) {
            _this6.undoDelete();

            _this6.deletionNotice.close(true);
          }
        }
      }], {
        classes: "mv-deleted",
        dismiss: {
          button: true,
          timeout: 20000
        }
      });
      notice.closed.then(function (undone) {
        if (!undone && _this6.deleted.length) {
          // Gone forever now
          _this6.deleted.forEach(function (node) {
            return node.destroy();
          });

          _this6.deleted.length = 0;
        }

        if (_this6.deletionNotice == notice) {
          _this6.deletionNotice = null;
        }
      });
    },
    undoDelete: function undoDelete() {
      this.deleted.forEach(function (node) {
        return node.collection.add(node, node.index);
      });
      this.deleted.length = 0;
    },
    live: {
      inProgress: function inProgress(value) {
        $.toggleAttribute(this.element, "mv-progress", value, value);
        $.toggleAttribute(this.element, "aria-busy", !!value, !!value);
        this.element.style.setProperty("--mv-progress-text", value ? "\"".concat(this._(value), "\"") : "");
      },
      unsavedChanges: function unsavedChanges(value) {
        this.element.classList.toggle("mv-unsaved-changes", value);
      },
      needsEdit: function needsEdit(value) {
        if (this.bar) {
          this.bar.toggle("edit", value && this.permissions.edit);
        }
      },
      storage: function storage(value) {
        if (value !== this._storage && !value) {
          var permissions = new Mavo.Permissions({
            edit: true,
            save: false
          });
          permissions.parent = this.permissions.parent;
          this.permissions.parent = permissions;
        }
      },
      primaryBackend: function primaryBackend(value) {
        value = value || null;

        if (value != this._primaryBackend) {
          return value;
        }
      },
      uploadBackend: {
        get: function get() {
          if (this.storage && this.storage.upload) {
            // Prioritize storage
            return this.storage;
          }
        }
      }
    },
    "static": {
      version: "v0.2.0",
      all: {},
      get: function get(id) {
        if (id instanceof Element) {
          // Get by element
          for (var name in _.all) {
            if (_.all[name].element == id) {
              return _.all[name];
            }
          }

          return null;
        }

        var name = typeof id === "number" ? Object.keys(_.all)[id] : id;
        return _.all[name] || null;
      },
      superKey: navigator.platform.indexOf("Mac") === 0 ? "metaKey" : "ctrlKey",
      base: location.protocol == "about:" ? document.currentScript ? document.currentScript.src : "http://mavo.io" : location,
      dependencies: [// Plugins.load() must be run after DOM load to pick up all mv-plugins attributes
      $.ready().then(function () {
        return _.Plugins.load();
      })],
      polyfills: [],
      init: function init() {
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var mavos = Array.isArray(arguments[0]) ? arguments[0] : $$(_.selectors.init, container);
        var ret = mavos.filter(function (element) {
          return !_.get(element);
        }) // not already inited
        .map(function (element) {
          return new _(element);
        });
        return ret;
      },
      warn: function warn(message) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        warn.history = warn.history || new Set();

        if (!_.warn.history.has(message)) {
          console.warn(message);
        }

        if (o.once !== false) {
          warn.history.add(message);
        }
      },

      /**
       * Similar to Promise.all() but can handle post-hoc additions
       * and does not reject if one promise rejects.
       */
      thenAll: function thenAll(iterable) {
        // Turn rejected promises into resolved ones
        $$(iterable).forEach(function (promise) {
          if ($.type(promise) == "promise") {
            promise = promise["catch"](function (err) {
              return err;
            });
          }
        });
        return Promise.all(iterable).then(function (resolved) {
          if (iterable.length != resolved.length) {
            // The list of promises or values changed. Return a new Promise.
            // The original promise won't resolve until the new one does.
            return _.thenAll(iterable);
          } // The list of promises or values stayed the same.
          // Return results immediately.


          return resolved;
        });
      },
      promise: function promise(constructor) {
        var res, rej;
        var promise = new Promise(function (resolve, reject) {
          if (constructor) {
            constructor(resolve, reject);
          }

          res = resolve;
          rej = reject;
        });

        promise.resolve = function (a) {
          res(a);
          return promise;
        };

        promise.reject = function (a) {
          rej(a);
          return promise;
        };

        return promise;
      },
      defer: function defer(delay) {
        return new Promise(function (resolve) {
          return delay === undefined ? requestAnimationFrame(resolve) : setTimeout(resolve, delay);
        });
      },
      UI: {},
      hooks: new $.Hooks(),
      // Will be filled with a union of all properties across all Mavos
      properties: new Set(),
      attributes: ["mv-app", "mv-storage", "mv-source", "mv-init", "mv-path", "mv-multiple-path", "mv-format", "mv-attribute", "mv-default", "mv-mode", "mv-edit", "mv-permisssions", "mv-rel", "mv-value"],
      lazy: {
        locale: function locale() {
          return document.documentElement.lang || "en-GB";
        }
      }
    }
  }); // Define symbols
  // These are lazy to give the Symbol polyfill a chance to load if needed


  ["toNode", "isProxy", "route", "parent", "property", "mavo", "groupedBy", "as"].forEach(function (symbol) {
    $.lazy(_, symbol, function () {
      return Symbol(symbol);
    });
  });
  Object.defineProperty(_.all, "length", {
    get: function get() {
      return Object.keys(this).length;
    }
  });
  {
    var s = _.selectors = {
      init: "[mv-app], [data-mv-app]",
      property: "[property]",
      specificProperty: function specificProperty(name) {
        return "[property=".concat(name, "]");
      },
      group: "[typeof], [mv-group]",
      primitive: "[property]:not([typeof]):not([mv-group])",
      childGroup: "[typeof][property], [mv-group][property]",
      multiple: "[mv-multiple]",
      formControl: "input, select, option, textarea",
      textInput: ["text", "email", "url", "tel", "search", "number"].map(function (t) {
        return "input[type=".concat(t, "]");
      }).join(", ") + ", input:not([type]), textarea",
      ui: ".mv-ui",
      container: {
        // "li": "ul, ol",
        "tr": "table",
        "option": "select" // "dt": "dl",
        // "dd": "dl"

      }
    };
    $.extend(_.selectors, {
      item: s.multiple + ", " + s.group,
      output: s.specificProperty("output") + ", .mv-output"
    });
  }
  $.each({
    "blissfuljs": Array.from && document.documentElement.closest && self.URL && "searchParams" in URL.prototype,
    "Intl.~locale.en": self.Intl,
    "IntersectionObserver": self.IntersectionObserver,
    "Symbol": self.Symbol,
    "Element.prototype.remove": Element.prototype.remove,
    "Element.prototype.before": Element.prototype.before,
    "Element.prototype.after": Element.prototype.after,
    "Element.prototype.prepend": Element.prototype.prepend
  }, function (id, supported) {
    if (!supported) {
      _.polyfills.push(id);
    }
  }); // Init mavo. Async to give other scripts a chance to modify stuff.

  _.dependencies.push(_.defer().then(function () {
    var polyfillURL = "https://cdn.polyfill.io/v2/polyfill.min.js?unknown=polyfill&features=" + _.polyfills.map(function (a) {
      return a + "|gated";
    }).join(",");

    _.dependencies.push($.include(!_.polyfills.length, polyfillURL));

    $.ready().then(function () {
      $$(_.selectors.init).forEach(function (elem) {
        // Skip if an instance has been created, for example by another script.
        if (!_.get(elem)) {
          elem.setAttribute("mv-progress", "Loading");
        }
      });
      return _.ready;
    })["catch"](console.error).then(function () {
      _.init();

      _.inited.resolve();
    });
  }));

  _.ready = _.thenAll(_.dependencies);
  _.inited = _.promise();
  Stretchy.selectors.filter = ".mv-editor:not([property]), .mv-autosize"; // Define $ and $$ if they are not already defined
  // Primarily for backwards compat since we used to use Bliss Full.

  self.$ = self.$ || $;
  self.$$ = self.$$ || $$;
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = $.extend(Mavo, {
    /**
     * Load a file, only once
     */
    load: function load(url) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.currentScript ? document.currentScript.src : location;
      return $.load(url, base);
    },
    readFile: function readFile(file) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "DataURL";
      var reader = new FileReader();
      return new Promise(function (resolve, reject) {
        reader.onload = function (f) {
          return resolve(reader.result);
        };

        reader.onerror = reader.onabort = reject;
        reader["readAs" + format](file);
      });
    },
    toJSON: function toJSON(data) {
      if (data === null) {
        return "";
      }

      if (typeof data === "string") {
        // Do not stringify twice!
        return data;
      }

      return JSON.stringify(data, null, "\t");
    },

    /**
     * toJSON without cycles
     */
    safeToJSON: function safeToJSON(o) {
      var cache = self.WeakSet ? new WeakSet() : new Set();
      return JSON.stringify(o, function (key, value) {
        if (_typeof(value) === "object" && value !== null) {
          // No circular reference found
          if (cache.has(value)) {
            return; // Circular reference found!
          }

          cache.add(value);
        }

        return value;
      });
    },
    // Specifiy a primitive fallback for an object
    primitivify: function primitivify(object, primitive) {
      if (object) {
        if (primitive && _typeof(primitive) === "object") {
          // Primitive is objectified, must copy its metadata to avoid losing it
          Object.assign(object, primitive);
          primitive = Mavo.value(primitive);
        }

        object.valueOf = object.toJSON = object[Symbol.toPrimitive] = function () {
          return primitive;
        };
      }

      return object;
    },
    objectify: function objectify(value, properties) {
      var primitive = Mavo.value(value);

      if (_typeof(value) !== "object" || value === null) {
        if (value === null) {
          var _value;

          value = (_value = {}, _defineProperty(_value, Symbol.toStringTag, "Null"), _defineProperty(_value, "toJSON", function toJSON() {
            return null;
          }), _value);
        } else {
          var constructor = value.constructor;
          value = new constructor(primitive);
          value[Symbol.toStringTag] = constructor.name;
        }

        _.primitivify(value, primitive);
      }

      return $.extend(value, properties);
    },
    value: function value(_value2) {
      return _value2 && _value2.valueOf ? _value2.valueOf() : _value2;
    },

    /**
     * Array & set utlities
     */
    // If the passed value is not an array, convert to an array
    toArray: function toArray(arr) {
      return arr === undefined ? [] : Array.isArray(arr) ? arr : [arr];
    },
    // Delete an element from an array
    // @param all {Boolean} Delete more than one?
    "delete": function _delete(arr, element, all) {
      do {
        var index = arr && arr.indexOf(element);

        if (index > -1) {
          arr.splice(index, 1);
        }
      } while (index > -1 && all);
    },
    // Recursively flatten a multi-dimensional array
    flatten: function flatten(arr) {
      if (!Array.isArray(arr)) {
        return [arr];
      }

      return arr.reduce(function (prev, c) {
        return _.toArray(prev).concat(_.flatten(c));
      }, []);
    },
    // Push an item to an array iff it's not already in there
    pushUnique: function pushUnique(arr, item) {
      if (arr.indexOf(item) === -1) {
        arr.push(item);
      }
    },
    // Adds items from set2 into set1, turns set1 into a set if it's not
    union: function union(set1, set2) {
      if (set1 instanceof Set && set2) {
        set2.forEach(function (x) {
          return set1.add(x);
        });
        return set1;
      }

      return new Set([].concat(_toConsumableArray(set1 || []), _toConsumableArray(set2 || [])));
    },
    // Filter an array in place
    // TODO add index to callback
    filter: function filter(arr, callback) {
      for (var i = 0; i < arr.length; i++) {
        if (!callback(arr[i])) {
          arr.splice(i, 1);
          i--;
        }
      }
    },

    /**
     * DOM element utilities
     */
    is: function is(thing) {
      for (var i = 0, element; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        element = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];

        if (element && element.matches && element.matches(_.selectors[thing])) {
          return true;
        }
      }

      return false;
    },

    /**
     * Get the current value of a CSS property on an element
     */
    getStyle: function getStyle(element, property) {
      if (element) {
        var value = getComputedStyle(element).getPropertyValue(property);

        if (value) {
          return value.trim();
        }
      }
    },

    /**
     * Get/set data on an element
     */
    data: function data(element, name, value) {
      if (!element) {
        return null;
      }

      var data = _.elementData.get(element) || {},
          ret;

      if (arguments.length == 2) {
        ret = data[name];
      } else if (value === undefined) {
        delete data[name];
      } else {
        ret = data[name] = value;
      }

      _.elementData.set(element, data);

      return ret;
    },
    elementData: new WeakMap(),

    /**
     * Get node from path or get path of a node to an ancestor
     * For maximum robustness, all but the last path segment refer to elements only.
     * The last part of the path is a decimal: the integer part of the decimal is element index,
     * the decimal part is node index *after* that element and starts from 1.
     * If the node has no previous element sibling, the integer part of the index will be -1.
     */
    elementPath: function elementPath(ancestor, element) {
      if (Array.isArray(element)) {
        // Get element by path
        var path = element;
        var ret = path.reduce(function (acc, cur) {
          return acc.children[cur >> 0] || acc;
        }, ancestor);
        var last = path[path.length - 1];

        if (last != last >> 0) {
          // We are returning a non-element node
          var offset = +(last + "").split(".")[1];

          if (last >> 0 < 0) {
            ret = ret.firstChild;
            offset--;
          }

          for (var i = 0; i < offset; i++) {
            ret = ret.nextSibling;
          }
        }

        return ret;
      } else {
        // Get path
        var path = [];

        for (var parent = element; parent && parent != ancestor; parent = parent.parentNode) {
          var index = 0;
          var countNonElementSiblings = parent === element && element.nodeType !== 1;
          var offset = countNonElementSiblings ? 1 : 0;
          var sibling = parent;

          while (sibling = sibling["previous".concat(countNonElementSiblings ? "" : "Element", "Sibling")]) {
            if (countNonElementSiblings) {
              offset++;

              if (sibling.nodeType == 1) {
                countNonElementSiblings = false;
              }
            } else {
              index++;
            }
          }

          if (offset > 0) {
            index = index - 1 + "." + offset;
          }

          path.unshift(index);
        }

        return parent ? path : null;
      }
    },

    /**
     * Revocably add/remove elements from the DOM
     */
    revocably: {
      add: function add(element, insert) {
        var comment = _.revocably.isRemoved(element);

        if (comment && comment.parentNode) {
          comment.parentNode.replaceChild(element, comment);
        } else if (element && insert && !element.parentNode) {
          // Has not been revocably removed because it has never even been added
          if (typeof insert === "function") {
            insert(element);
          } else {
            insert.appendChild(element);
          }
        }

        return comment;
      },
      remove: function remove(element, commentText) {
        if (!element) {
          return;
        }

        var comment = _.data(element, "commentstub");

        if (!comment) {
          commentText = commentText || element.id || element.className || element.nodeName;
          comment = _.data(element, "commentstub", document.createComment(commentText));
        }

        if (element.parentNode) {
          // In DOM, remove
          element.parentNode.replaceChild(comment, element);
        }

        return comment;
      },
      isRemoved: function isRemoved(element) {
        if (!element || element.parentNode) {
          return false;
        }

        var comment = _.data(element, "commentstub");

        if (comment && comment.parentNode) {
          return comment;
        }

        return false;
      },
      setAttribute: function setAttribute(element, attribute, value) {
        var previousValue = _.data(element, "attribute-" + attribute);

        if (previousValue === undefined) {
          // Only set this when there's no old value stored, otherwise
          // if called multiple times, it could result in losing the original value
          _.data(element, "attribute-" + attribute, element.getAttribute(attribute));
        }

        element.setAttribute(attribute, value);
      },
      restoreAttribute: function restoreAttribute(element, attribute) {
        var previousValue = _.data(element, "attribute-" + attribute);

        if (previousValue !== undefined) {
          $.toggleAttribute(element, attribute, previousValue);

          _.data(element, "attribute-" + attribute, undefined);
        }
      }
    },
    inView: {
      is: function is(element) {
        var r = element.getBoundingClientRect();
        return (0 <= r.bottom && r.bottom <= innerHeight || 0 <= r.top && r.top <= innerHeight) && ( // vertical
        0 <= r.right && r.right <= innerWidth || 0 <= r.left && r.left <= innerWidth); // horizontal
      },
      when: function when(element) {
        var observer = _.inView.observer = _.inView.observer || new IntersectionObserver(function (entries) {
          var _this7 = this;

          entries.forEach(function (entry) {
            _this7.unobserve(entry.target);

            $.fire(entry.target, "mv-inview", {
              entry: entry
            });
          });
        });
        return new Promise(function (resolve) {
          if (_.is(element)) {
            resolve();
          }

          observer.observe(element);

          var callback = function callback(evt) {
            element.removeEventListener("mv-inview", callback);
            evt.stopPropagation();
            resolve();
          };

          element.addEventListener("mv-inview", callback);
        });
      }
    },
    scrollIntoViewIfNeeded: function scrollIntoViewIfNeeded(element) {
      if (element && !Mavo.inView.is(element)) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    },

    /**
     * Set attribute only if it doesn’t exist
     */
    setAttributeShy: function setAttributeShy(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    },

    /**
     * Get the value of an attribute, with fallback attributes in priority order.
     */
    getAttribute: function getAttribute(element) {
      for (var i = 0, attribute; attribute = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]; i++) {
        var value = element.getAttribute(attribute);

        if (value) {
          return value;
        }
      }

      return null;
    },
    getClosestAttribute: function getClosestAttribute(element, attribute) {
      element = element.closest("[".concat(attribute, "]"));
      return element ? element.getAttribute(attribute) : null;
    },

    /**
     * Get the element identified by the URL hash
     */
    getTarget: function getTarget() {
      var id = location.hash.substr(1);
      return document.getElementById(id);
    },
    XPath: function XPath(query) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      var doc = context.ownerDocument || context;
      var ret = [],
          node;

      if (doc.evaluate) {
        var result = doc.evaluate(query, context, null, XPathResult.ANY_TYPE, null);

        while (node = result.iterateNext()) {
          ret.push(node);
        }
      }

      return ret;
    },
    // Returns attribute nodes that start with str
    // Use .ownerElement to get element
    attributeStartsWith: function attributeStartsWith(str, context) {
      return _.XPath(".//@*[starts-with(name(), \"".concat(str, "\")]"), context);
    },

    /**
     * Object utilities
     */

    /**
     * Check if property exists in object. Like the in operator but more robust and does not throw.
     * Why not just in? E.g. "foo".length is 3 but "length" in "foo" throws
     */
    "in": function _in(property, obj) {
      if (obj) {
        return _typeof(obj) === "object" && property in obj || obj[property] !== undefined;
      }
    },

    /**
     * Get real property name from case insensitive property
     */
    getCanonicalProperty: function getCanonicalProperty(obj, property) {
      if (obj && (property || property === 0)) {
        // Property in object?
        if (_["in"](property, obj)) {
          return property;
        }

        if (property.toLowerCase) {
          // Lowercase property in object?
          var propertyL = property.toLowerCase();

          if (_["in"](propertyL, obj)) {
            return propertyL;
          } // Any case property in object?


          var properties = Object.keys(obj);
          var i = properties.map(function (p) {
            return p.toLowerCase();
          }).indexOf(propertyL);

          if (i > -1) {
            return properties[i];
          }
        }
      }
    },
    subset: function subset(obj, path, value) {
      if (arguments.length == 3) {
        // Put
        if (path.length) {
          var last = path[path.length - 1];
          var parent = $.value.apply($, [obj].concat(_toConsumableArray(path.slice(0, -1))));

          if (Array.isArray(parent) && Array.isArray(value)) {
            // Merge arrays instead of adding array inside array
            parent.splice.apply(parent, [last, 1].concat(_toConsumableArray(value)));
          } else if (parent) {
            parent[path[path.length - 1]] = value;
          }

          return obj;
        }

        return value;
      } else if (_typeof(obj) == "object" && path && path.length) {
        // Get
        return path.reduce(function (obj, property, i) {
          var meta = {};
          var ret = Mavo.Functions.get(obj, property, meta); // We don't yet support multiple properties at the same level
          // i.e. the path can't be for the 2nd and 3rd item

          path[i] = Array.isArray(meta.property) ? meta.property[0] : meta.property;

          if (ret === undefined && meta.query) {
            // Not found, return dummy if query
            ret = _defineProperty({}, meta.query.property, meta.query.value);
          }

          return ret;
        }, obj);
      } else {
        return obj;
      }
    },
    clone: function clone(o) {
      if (!o || _typeof(o) !== "object") {
        return o;
      }

      return JSON.parse(_.safeToJSON(o));
    },
    // Will not work for symbols
    shallowClone: function shallowClone(o) {
      if (!o || _typeof(o) !== "object") {
        return o;
      }

      if (Array.isArray(o)) {
        return _toConsumableArray(o);
      }

      return $.extend({}, o);
    },
    // Credit: https://remysharp.com/2010/07/21/throttling-function-calls
    debounce: function debounce(fn, delay) {
      if (!delay) {
        // No throttling
        return fn;
      }

      var timer = null,
          _code;

      return function () {
        var context = this,
            args = arguments;

        _code = function code() {
          fn.apply(context, args);
          removeEventListener("beforeunload", _code);
        };

        clearTimeout(timer);
        timer = setTimeout(_code, delay);
        addEventListener("beforeunload", _code);
      };
    },
    escapeRegExp: function escapeRegExp(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    },
    matches: function matches(str, regex) {
      var ret = (str + "").match(regex);
      return ret ? ret : [];
    },
    match: function match(str, regex) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return _.matches(str, regex)[i] || "";
    },
    observeResize: function observeResize(element, callbackOrObserver) {
      if (!self.ResizeObserver) {
        return;
      }

      var previousRect = null;
      var ro = callbackOrObserver instanceof ResizeObserver ? callbackOrObserver : new ResizeObserver(function (entries) {
        var contentRect = entries[entries.length - 1].contentRect;

        if (previousRect && previousRect.width == contentRect.width && previousRect.height == contentRect.height) {
          return;
        }

        callbackOrObserver(entries);
        previousRect = contentRect;
      });
      ro.observe(element);
      return ro;
    },
    Observer: $.Class({
      constructor: function constructor(element, attribute, callback) {
        var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        if (callback instanceof MutationObserver) {
          this.observer = callback;
        }

        this.observer = this.observer || new MutationObserver(callback);
        this.callback = callback;
        this.update(element, attribute, o);
        this.run();
      },
      update: function update(element, attribute, options) {
        this.element = element;
        this.attribute = attribute;
        this.options = $.extend({}, options);

        if (this.attribute) {
          $.extend(this.options, {
            attributes: true,
            attributeFilter: this.attribute == "all" ? undefined : Mavo.toArray(this.attribute),
            attributeOldValue: !!options.oldValue
          });
        }

        if (!this.attribute || this.attribute == "all") {
          $.extend(this.options, {
            characterData: true,
            childList: true,
            subtree: true,
            characterDataOldValue: !!options.oldValue
          });
        }

        if (this.observer && this.observer.running) {
          this.stop();
          this.run();
        }
      },
      stop: function stop() {
        if (this.observer) {
          this.observer.disconnect();
        }

        this.running = false;
        return this;
      },
      run: function run() {
        if (this.observer) {
          this.observer.observe(this.element, this.options);
          this.running = true;
        }

        return this;
      },

      /**
       * Disconnect an observer, run some code, then observe again
       */
      sneak: function sneak(callback) {
        if (this.running) {
          this.stop();
          var ret = callback();
          this.run();
        } else {
          var ret = callback();
        }

        return ret;
      },
      destroy: function destroy() {
        this.stop();
        this.observer = this.element = null;
      },
      "static": {
        sneak: function sneak(observer, callback) {
          return observer ? observer.sneak(callback) : callback();
        }
      }
    }),

    /**
     * Run & Return a function
     */
    rr: function rr(f) {
      f();
      return f;
    },
    // Get out of bounds array index to wrap around
    wrap: function wrap(index, length) {
      return index < 0 ? length - 1 : index >= length ? 0 : index;
    },

    /**
     * Parses a simple CSS-like text format for declaring key-value options:
     * Pairs are comma or semicolon-separated, key and value are colon separated.
     * Escapes are supported, via backslash. Useful for attributes.
     */
    options: function options(str) {
      var ret = {};
      (str.trim().match(/(?:\\[,;]|[^,;])+/g) || []).forEach(function (option) {
        if (option) {
          option = option.trim().replace(/\\([,;])/g, "$1");
          var pair = option.match(/^\s*((?:\\:|[^:])+?)\s*:\s*(.+)$/);

          if (pair) {
            ret[pair[1].replace(/\\:/g, ":")] = pair[2];
          } else {
            // If no value, it's boolean
            ret[option] = true;
          }
        }
      });
      return ret;
    },

    /**
     * Map that can hold multiple values per key
     */
    BucketMap:
    /*#__PURE__*/
    function () {
      function BucketMap() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$arrays = _ref2.arrays,
            arrays = _ref2$arrays === void 0 ? false : _ref2$arrays;

        _classCallCheck(this, BucketMap);

        this.map = new Map();
        this[Symbol.iterator] = this.map[Symbol.iterator];
        this.arrays = arrays;
      }

      _createClass(BucketMap, [{
        key: "set",
        value: function set(key, value) {
          if (this.arrays) {
            var values = this.map.get(key) || [];
            values.push(value);
          } else {
            var values = this.map.get(key) || new Set();
            values.add(value);
          }

          this.map.set(key, values);
        }
      }, {
        key: "delete",
        value: function _delete(key, value) {
          if (arguments.length == 2) {
            var values = this.map.get(key);

            if (values) {
              if (this.arrays) {
                _["delete"](values, value);
              } else {
                values["delete"](value);
              }
            }
          } else {
            this.map["delete"](key);
          }
        }
      }, {
        key: "forEach",
        value: function forEach() {
          var _this$map;

          return (_this$map = this.map).forEach.apply(_this$map, arguments);
        }
      }]);

      return BucketMap;
    }()
  }); // Bliss plugins
  // Provide shortcuts to long property chains


  $.proxy = $.classProps.proxy = $.overload(function (obj, property, proxy) {
    Object.defineProperty(obj, property, {
      get: function get() {
        return this[proxy][property];
      },
      set: function set(value) {
        this[proxy][property] = value;
      },
      configurable: true,
      enumerable: true
    });
    return obj;
  }); // :target-within shim

  function updateTargetWithin() {
    var element = _.getTarget();

    var cl = "mv-target-within";
    $$("." + cl).forEach(function (el) {
      return el.classList.remove(cl);
    });

    while (element && element.classList) {
      element.classList.add(cl);
      element = element.parentNode;
    }
  }

  ;
  document.addEventListener("mv-load", updateTargetWithin);
  addEventListener("hashchange", updateTargetWithin);
  var idObserver = new Mavo.Observer(document.documentElement, "id", updateTargetWithin, {
    subtree: true
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Locale = $.Class({
    constructor: function constructor(lang, phrases) {
      this.lang = lang;
      this.phrases = {};
      this.extend(phrases);
    },

    get fallback() {
      // TODO should we fallback to other dialects? I.e. should en-US fallback to en-GB if en didn't exist?
      if (_.all[this.baseLang]) {
        return _.all[this.baseLang];
      }

      if (this !== _["default"]) {
        return _["default"];
      }
    },

    extend: function extend(phrases) {
      $.extend(this.phrases, phrases);
    },
    phrase: function phrase(id, vars) {
      var key = id.toLowerCase();
      var phrase = this.phrases[key];

      if (phrase === undefined && this.fallback) {
        phrase = this.fallback.phrase(key);
      }

      if (phrase === undefined) {
        // Everything failed, use id
        phrase = key.replace(/\b-\b/g, " ");
      } else if (vars) {
        var keys = Mavo.matches(phrase, /\{\w+(?=\})/g).map(function (v) {
          return v.slice(1);
        });
        Mavo.Functions.unique(keys).forEach(function (name) {
          if (name in vars) {
            phrase = phrase.replace(RegExp("{".concat(name, "}"), "gi"), vars[name]);
          }
        });
      }

      return phrase;
    },
    live: {
      lang: function lang(_lang) {
        this.baseLang = _.getBaseLang(_lang);

        if (_lang == this.baseLang) {
          this.baseLang = null;
        }
      }
    },
    "static": {
      all: {},

      /**
       * Register new locale or extend existing locale
       */
      register: function register(lang, phrases) {
        if (_.all[lang]) {
          _.all[lang].extend(phrases);
        } else {
          _.all[lang] = new _(lang, phrases);
        }
      },
      // Get locale for a given language, use its base as fallback
      match: function match() {
        var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return _.all[lang] || _.all[_.getBaseLang(lang)];
      },
      // Get locale for a given language, use its base as fallback, and the default locale if nothing exists
      get: function get(lang) {
        return _.match(lang) || _["default"];
      },
      getBaseLang: function getBaseLang(lang) {
        return lang.split("-")[0];
      },
      lazy: {
        "default": function _default() {
          return _.match(Mavo.locale) || _.all.en;
        }
      }
    }
  });
  /**
   * Use phrase
   */


  Mavo.prototype._ = function (id, vars) {
    return this.locale && id ? this.locale.phrase(id, vars) : id;
  };

  Mavo.ready.then(function () {
    $$("datalist.mv-phrases[lang]").forEach(function (datalist) {
      var phrases = $$("option", datalist).reduce(function (o, option) {
        o[option.value] = option.textContent.trim();
        return o;
      }, {});
      Mavo.Locale.register(datalist.lang, phrases);
    });
  });
})(Bliss, Bliss.$);

Mavo.Locale.register("en", {
  "second": "second",
  "seconds": "seconds",
  "minute": "minute",
  "minutes": "minutes",
  "hour": "hour",
  "hours": "hours",
  "day": "day",
  "days": "days",
  "week": "week",
  "weeks": "weeks",
  "month": "month",
  "months": "months",
  "year": "year",
  "years": "years",
  "edit": "Edit",
  "editing": "Editing",
  "save": "Save",
  "import": "Import",
  "export": "Export",
  "logout": "Logout",
  "login": "Login",
  "loading": "Loading",
  "uploading": "Uploading",
  "saving": "Saving",
  "dismiss": "Dismiss",
  "logged-in-as": "Logged in to {id} as ",
  "login-to": "Login to {id}",
  "error-uploading": "Error uploading file",
  "cannot-load-uploaded-file": "Cannot load uploaded file",
  "filename": "Filename?",
  "problem-saving": "Problem saving data",
  "problem-loading": "Problem loading data",
  "cannot-parse": "Can’t understand this file",
  "http-error": "HTTP error {status}: {statusText}",
  "cant-connect": "Can’t connect to the Internet",
  "add-item": "Add {name}",
  "add-item-before": "Add new {name} before",
  "add-item-after": "Add new {name} after",
  "drag-to-reorder": "Drag to reorder {name}",
  "delete-item": "Delete this {name}",
  "item-deleted": "{name} deleted",
  "n-items": "{n} {name} items",
  "undo": "Undo",
  "gh-updated-file": "Updated {name}",
  "gh-edit-suggestion-saved-in-profile": "Your edits are saved to <a href=\"{previewURL}\" target=\"_blank\">your own profile</a>, because you are not allowed to edit this page.",
  "gh-edit-suggestion-instructions": "Write a short description of your edits below to suggest them to the page admins:",
  "gh-edit-suggestion-notreviewed": "You have selected to suggest your edits to the page admins. Your suggestions have not been reviewed yet.",
  "gh-edit-suggestion-send": "Send edit suggestion",
  "gh-edit-suggestion-revoke": "Revoke edit suggestion",
  "gh-edit-suggestion-reason-placeholder": "I added / corrected / deleted ...",
  "gh-edit-suggestion-cancelled": "Edit suggestion cancelled successfully!",
  "gh-edit-suggestion-title": "Suggested edits to data",
  "gh-edit-suggestion-body": "Hello there! I used Mavo to suggest the following edits:\n{description}\nPreview my changes here: {previewURL}",
  "gh-edit-suggestion-sent": "Edit suggestion sent successfully!",
  "gh-login-fork-options": "You have your own copy of this page, would you like to use it?",
  "gh-use-my-fork": "Yes, show me my data."
});

(function ($, $$) {
  Mavo.attributes.push("mv-plugins");

  var _ = Mavo.Plugins = {
    loaded: {},
    load: function load() {
      _.plugins = new Set();
      $$("[mv-plugins]").forEach(function (element) {
        element.getAttribute("mv-plugins").trim().split(/\s+/).forEach(function (plugin) {
          return _.plugins.add(plugin);
        });
      });

      if (!_.plugins.size) {
        return Promise.resolve();
      } // Fetch plugin index


      return $.fetch(_.url + "/plugins.json", {
        responseType: "json"
      }).then(function (xhr) {
        // Fetch plugins
        return Mavo.thenAll(xhr.response.plugin.filter(function (plugin) {
          return _.plugins.has(plugin.id);
        }).map(function (plugin) {
          // Load plugin
          var filename = "mavo-".concat(plugin.id, ".js");

          if (plugin.repo) {
            // Plugin hosted in a separate repo
            var url = "https://raw.githubusercontent.com/".concat(plugin.repo, "/master/").concat(filename);
            return _.loaded[plugin.id] ? Promise.resolve() : $.fetch(url).then(function (xhr) {
              $.create("script", {
                textContent: xhr.responseText,
                inside: document.head
              });
            });
          } else {
            // Plugin hosted in the mavo-plugins repo
            var url = "".concat(_.url, "/").concat(plugin.id, "/").concat(filename);
            return $.include(_.loaded[plugin.id], url);
          }
        }));
      });
    },
    register: function register(name) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (_.loaded[name]) {
        // Do not register same plugin twice
        return;
      }

      Mavo.hooks.add(o.hooks);

      for (var Class in o.extend) {
        var existing = Class == "Mavo" ? Mavo : Mavo[Class];

        if ($.type(existing) === "function") {
          $.Class(existing, o.extend[Class]);
        } else {
          $.extend(existing, o.extend[Class]);
        }
      }

      var ready = [];

      if (o.ready) {
        ready.push(o.ready);
      }

      if (o.dependencies) {
        var base = document.currentScript ? document.currentScript.src : location;
        var dependencies = o.dependencies.map(function (url) {
          return Mavo.load(url, base);
        });
        ready.push.apply(ready, _toConsumableArray(dependencies));
      }

      if (ready.length) {
        var _Mavo$dependencies;

        (_Mavo$dependencies = Mavo.dependencies).push.apply(_Mavo$dependencies, ready);
      }

      _.loaded[name] = o;

      if (o.init) {
        Promise.all(ready).then(function () {
          return o.init();
        });
      }
    },
    url: "https://plugins.mavo.io"
  };
})(Bliss, Bliss.$);

(function ($, $$) {
  Mavo.attributes.push("mv-bar");

  var _ = Mavo.UI.Bar = $.Class({
    constructor: function constructor(mavo) {
      var _this8 = this;

      this.mavo = mavo;
      this.element = $(".mv-bar", this.mavo.element);
      this.template = this.mavo.element.getAttribute("mv-bar") || "";

      if (this.element) {
        this.custom = true;
        this.template += " " + (this.element.getAttribute("mv-bar") || "");
        this.template = this.template.trim();

        for (var id in _.controls) {
          this[id] = $(".mv-".concat(id), this.element);

          if (this[id]) {
            this.template = this.template || "with";
            this.template += " ".concat(id);
          }
        }
      } else {
        this.element = $.create({
          className: "mv-bar mv-ui",
          start: this.mavo.element,
          innerHTML: "<button>&nbsp;</button>"
        });
      }

      if (this.element.classList.contains("mv-compact")) {
        this.noResize = true;
      }

      this.controls = _.getControls(this.template);

      if (this.controls.length) {
        // Measure height of 1 row
        this.targetHeight = this.element.offsetHeight;
      }

      if (!this.custom) {
        this.element.innerHTML = "";
      }

      this.controls.forEach(function (id) {
        var o = _.controls[id];

        if (_this8[id]) {
          // Custom control, remove to not mess up order
          _this8[id].remove();
        }

        if (o.create) {
          _this8[id] = o.create.call(_this8.mavo, _this8[id]);
        } else if (!_this8[id]) {
          _this8[id] = $.create("button", {
            type: "button",
            className: "mv-".concat(id),
            textContent: _this8.mavo._(id)
          });
        } // We initially add all of them to retain order,
        // then we remove revocably when/if needed


        _this8.add(id);

        if (o.permission) {
          _this8.permissions.can(o.permission, function () {
            _this8.toggle(id, !o.condition || o.condition.call(_this8.mavo));
          }, function () {
            _this8.remove(id);
          });
        } else if (o.condition && !o.condition.call(_this8.mavo)) {
          _this8.remove(id);
        }

        for (var events in o.events) {
          $.bind(_this8[id], events, o.events[events].bind(_this8.mavo));
        }
      });

      var _loop = function _loop(_id) {
        var o = _.controls[_id];

        if (o.action) {
          $.delegate(_this8.mavo.element, "click", ".mv-" + _id, function (evt) {
            if (!o.permission || _this8.permissions.is(o.permission)) {
              o.action.call(_this8.mavo);
              evt.preventDefault();
            }
          });
        }
      };

      for (var _id in _.controls) {
        _loop(_id);
      }

      if (this.controls.length && !this.noResize) {
        this.resize();

        if (self.ResizeObserver) {
          this.resizeObserver = Mavo.observeResize(this.element, function (entries) {
            _this8.resize();
          });
        }
      }
    },
    resize: function resize() {
      if (!this.targetHeight) {
        // We don't have a correct measurement for target height, abort
        this.targetHeight = this.element.offsetHeight;
        return;
      }

      this.resizeObserver && this.resizeObserver.disconnect();
      this.element.classList.remove("mv-compact", "mv-tiny"); // Remove pointless tooltips

      $$("button, .mv-button", this.element).forEach(function (button) {
        if (button.title === button.textContent) {
          button.title = "";
        }
      }); // Exceeded single row?

      if (this.element.offsetHeight > this.targetHeight * 1.6) {
        this.element.classList.add("mv-compact");

        if (this.element.offsetHeight > this.targetHeight * 1.2) {
          // Still too tall
          this.element.classList.add("mv-tiny"); // Add tooltips, since only icons will be visible

          $$("button, .mv-button", this.element).forEach(function (button) {
            if (!button.title) {
              button.title = button.textContent;
            }
          });
        }
      }

      this.resizeObserver && this.resizeObserver.observe(this.element);
    },
    add: function add(id) {
      var _this9 = this;

      var o = _.controls[id];

      if (o.prepare) {
        o.prepare.call(this.mavo);
      }

      Mavo.revocably.add(this[id], this.element);

      if (!this.resizeObserver && !this.noResize) {
        requestAnimationFrame(function () {
          return _this9.resize();
        });
      }
    },
    remove: function remove(id) {
      var _this10 = this;

      var o = _.controls[id];
      Mavo.revocably.remove(this[id], "mv-" + id);

      if (o.cleanup) {
        o.cleanup.call(this.mavo);
      }

      if (!this.resizeObserver && !this.noResize) {
        requestAnimationFrame(function () {
          return _this10.resize();
        });
      }
    },
    toggle: function toggle(id, add) {
      return this[add ? "add" : "remove"](id);
    },
    proxy: {
      "permissions": "mavo"
    },
    "static": {
      getControls: function getControls(template) {
        var all = Object.keys(_.controls);

        if (template && (template = template.trim())) {
          if (template == "none") {
            return [];
          }

          var relative = /^with\s|\b(yes|no)-\w+\b/.test(template);
          template = template.replace(/\byes-|^with\s+/g, "");
          var ids = template.split(/\s+/); // Drop duplicates (last one wins)

          ids = Mavo.Functions.unique(ids.reverse()).reverse();

          if (relative) {
            return all.filter(function (id) {
              var positive = ids.lastIndexOf(id);
              var negative = ids.lastIndexOf("no-" + id);
              var keep = positive > Math.max(-1, negative);
              var drop = negative > Math.max(-1, positive);
              return keep || !_.controls[id].optional && !drop;
            });
          }

          return ids;
        } // No template, return default set


        return all.filter(function (id) {
          return !_.controls[id].optional;
        });
      },
      controls: {
        status: {
          create: function create(custom) {
            return custom || $.create({
              className: "mv-status"
            });
          },
          prepare: function prepare() {
            var backend = this.primaryBackend;

            if (backend && backend.user) {
              var user = backend.user;
              var html = [user.name || ""];

              if (user.avatar) {
                html.unshift($.create("img", {
                  className: "mv-avatar",
                  src: user.avatar
                }), " ");
              }

              if (user.url) {
                html = [$.create("a", {
                  href: user.url,
                  target: "_blank",
                  contents: html
                })];
              }

              this.bar.status.textContent = "";
              $.contents(this.bar.status, [{
                tag: "span",
                innerHTML: this._("logged-in-as", backend)
              }, " "].concat(_toConsumableArray(html)));
            }
          },
          permission: "logout"
        },
        edit: {
          action: function action() {
            if (this.editing) {
              this.done();
              this.bar.edit.textContent = this._("edit");
            } else {
              this.edit();
              this.bar.edit.textContent = this._("editing");
            }
          },
          permission: ["edit", "add", "delete"],
          cleanup: function cleanup() {
            if (this.editing) {
              this.done();

              if (this.bar && this.bar.edit) {
                this.bar.edit.textContent = this._("edit");
              }
            }
          },
          condition: function condition() {
            return this.needsEdit;
          }
        },
        save: {
          action: function action() {
            this.save();
          },
          events: {
            "mouseenter focus": function mouseenterFocus() {
              this.element.classList.add("mv-highlight-unsaved");
            },
            "mouseleave blur": function mouseleaveBlur() {
              this.element.classList.remove("mv-highlight-unsaved");
            }
          },
          permission: "save",
          condition: function condition() {
            return !this.autoSave || this.autoSaveDelay > 0;
          }
        },
        "export": {
          create: function create(custom) {
            var a;

            if (custom) {
              a = custom.matches("a") ? custom : $.create("a", {
                className: "mv-button",
                around: custom
              });
            } else {
              a = $.create("a", {
                className: "mv-export mv-button",
                textContent: this._("export")
              });
            }

            a.setAttribute("download", this.id + ".json");
            return a;
          },
          events: {
            mousedown: function mousedown() {
              this.bar["export"].href = "data:application/json;charset=UTF-8," + encodeURIComponent(this.toJSON());
            }
          },
          permission: "edit",
          optional: true
        },
        "import": {
          create: function create(custom) {
            var _this11 = this;

            var button = custom || $.create("span", {
              role: "button",
              tabIndex: "0",
              className: "mv-import mv-button",
              textContent: this._("import"),
              events: {
                focus: function focus(evt) {
                  input.focus();
                }
              }
            });
            var input = $.create("input", {
              type: "file",
              inside: button,
              events: {
                change: function change(evt) {
                  var file = evt.target.files[0];

                  if (file) {
                    var reader = $.extend(new FileReader(), {
                      onload: function onload(evt) {
                        _this11.inProgress = false;

                        try {
                          var json = JSON.parse(reader.result);

                          _this11.render(json);
                        } catch (e) {
                          _this11.error(_this11._("cannot-parse"));
                        }
                      },
                      onerror: function onerror(evt) {
                        _this11.error(_this11._("problem-loading"));
                      }
                    });
                    _this11.inProgress = _this11._("uploading");
                    reader.readAsText(file);
                  }
                }
              }
            });
            return button;
          },
          optional: true
        },
        login: {
          action: function action() {
            this.primaryBackend.login();
          },
          permission: "login"
        },
        logout: {
          action: function action() {
            this.primaryBackend.logout();
          },
          permission: "logout"
        }
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.UI.Message = $.Class({
    constructor: function constructor(mavo, message) {
      var _this12 = this,
          _$$create;

      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.mavo = mavo;
      this.message = message;
      this.closed = Mavo.promise();
      this.options = o;
      this.element = $.create((_$$create = {
        className: "mv-ui mv-message" + (o.type ? " mv-" + o.type : "")
      }, _defineProperty(_$$create, $.type(this.message) == "string" ? "innerHTML" : "contents", this.message), _defineProperty(_$$create, "events", {
        click: function click(e) {
          return Mavo.scrollIntoViewIfNeeded(_this12.mavo.element);
        }
      }), _defineProperty(_$$create, this.mavo.bar ? "after" : "start", (this.mavo.bar || this.mavo).element), _$$create));

      if (o.style) {
        $.style(this.element, o.style);
      }

      if (o.classes) {
        var _this$element$classLi;

        (_this$element$classLi = this.element.classList).add.apply(_this$element$classLi, _toConsumableArray(o.classes.split(/\s+/)));
      }

      if (o.type == "error") {
        this.element.setAttribute("role", "alert");
      } else {
        this.element.setAttribute("aria-live", "polite");
      }

      o.dismiss = o.dismiss || {};

      if (typeof o.dismiss == "string" || Array.isArray(o.dismiss)) {
        var dismiss = {};
        Mavo.toArray(o.dismiss).forEach(function (prop) {
          dismiss[prop] = true;
        });
        o.dismiss = dismiss;
      }

      if (o.dismiss.button) {
        $.create("button", {
          type: "button",
          className: "mv-close mv-ui",
          textContent: "×",
          events: {
            "click": function click(evt) {
              return _this12.close();
            }
          },
          start: this.element,
          title: this.mavo._("dismiss")
        });
      }

      if (o.dismiss.timeout) {
        var timeout = typeof o.dismiss.timeout === "number" ? o.dismiss.timeout : 5000;
        $.bind(this.element, {
          mouseenter: function mouseenter(e) {
            return clearTimeout(_this12.closeTimeout);
          },
          mouseleave: Mavo.rr(function (e) {
            return _this12.closeTimeout = setTimeout(function () {
              return _this12.close();
            }, timeout);
          })
        });
      }

      if (o.dismiss.submit) {
        this.element.addEventListener("submit", function (evt) {
          evt.preventDefault();

          _this12.close(evt.target);
        });
      }
    },
    close: function close(resolve) {
      var _this13 = this;

      // clearTimeout, make the callback available for garbage collection, and make it easier to debug memory issues
      // it does nothing if there is no timeout callback.
      clearTimeout(this.closeTimeout);
      var duration = this.element.style.transition ? 1000 * parseFloat(window.getComputedStyle(this.element, null).transitionDuration) : 400;
      $.transition(this.element, {
        opacity: 0
      }, duration).then(function () {
        $.remove(_this13.element);

        _this13.closed.resolve(resolve);
      });
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Permissions = $.Class({
    constructor: function constructor(o) {
      this.triggers = [];
      this.hooks = new $.Hooks(); // If we don’t do this, there is no way to retrieve this from inside parentChanged

      this.parentChanged = _.prototype.parentChanged.bind(this);
      this.set(o);
    },
    // Set multiple permissions at once
    set: function set(o) {
      for (var action in o) {
        this[action] = o[action];
      }
    },
    // Set a bunch of permissions to true. Chainable.
    on: function on(actions) {
      var _this14 = this;

      Mavo.toArray(actions).forEach(function (action) {
        return _this14[action] = true;
      });
      return this;
    },
    // Set a bunch of permissions to false. Chainable.
    off: function off(actions) {
      var _this15 = this;

      actions = Array.isArray(actions) ? actions : [actions];
      actions.forEach(function (action) {
        return _this15[action] = false;
      });
      return this;
    },
    // Fired once at least one of the actions passed can be performed
    // Kind of like a Promise that can be resolved multiple times.
    can: function can(actions, callback, cannot) {
      this.observe(actions, true, callback);

      if (cannot) {
        // Fired once the action cannot be done anymore, even though it could be done before
        this.cannot(actions, cannot);
      }
    },
    // Fired once NONE of the actions can be performed
    cannot: function cannot(actions, callback) {
      this.observe(actions, false, callback);
    },
    // Schedule a callback for when a set of permissions changes value
    observe: function observe(actions, value, callback) {
      actions = Mavo.toArray(actions);

      if (this.is(actions, value)) {
        // Should be fired immediately
        callback();
      } // For future transitions


      this.triggers.push({
        actions: actions,
        value: value,
        callback: callback,
        active: true
      });
    },
    // Compare a set of permissions with true or false
    // If comparing with true, we want at least one to be true, i.e. OR
    // If comparing with false, we want ALL to be false, i.e. NOR
    is: function is(actions) {
      var _this16 = this;

      var able = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var or = Mavo.toArray(actions).map(function (action) {
        return !!_this16[action];
      }).reduce(function (prev, current) {
        return prev || current;
      });
      return able ? or : !or;
    },
    // Monitor all changes
    onchange: function onchange(callback) {
      var _this17 = this;

      // Future changes
      this.hooks.add("change", callback); // Fire for current values

      _.actions.forEach(function (action) {
        callback.call(_this17, {
          action: action,
          value: _this17[action]
        });
      });
    },
    parentChanged: function parentChanged() {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var localValue = this["_" + o.action];

      if (localValue !== undefined || o.from == o.value) {
        // We have a local value so we don’t care about parent changes OR nothing changed
        return;
      }

      this.fireTriggers(o.action);
      this.hooks.run("change", $.extend({
        context: this
      }, o));
    },
    // A single permission changed value
    changed: function changed(action, value, from) {
      from = !!from;
      value = !!value;

      if (value == from) {
        // Nothing changed
        return;
      } // $.live() calls the setter before the actual property is set so we
      // need to set it manually, otherwise it still has its previous value


      this["_" + action] = value;
      this.fireTriggers(action);
      this.hooks.run("change", {
        action: action,
        value: value,
        from: from,
        context: this
      });
    },
    fireTriggers: function fireTriggers(action) {
      var _this18 = this;

      this.triggers.forEach(function (trigger) {
        var match = _this18.is(trigger.actions, trigger.value);

        if (trigger.active && trigger.actions.indexOf(action) > -1 && match) {
          trigger.active = false;
          trigger.callback();
        } else if (!match) {
          // This is so that triggers can only be executed in an actual transition
          // And that if there is a trigger for [a,b] it won't be executed twice
          // if a and b are set to true one after the other
          trigger.active = true;
        }
      });
    },
    or: function or(permissions) {
      var _this19 = this;

      _.actions.forEach(function (action) {
        _this19[action] = _this19[action] || permissions[action];
      });

      return this;
    },
    live: {
      parent: function parent(_parent) {
        var _this20 = this;

        var oldParent = this._parent;

        if (oldParent == _parent) {
          return;
        }

        this._parent = _parent; // Remove previous trigger, if any

        if (oldParent) {
          Mavo["delete"](oldParent.hooks.change, this.parentChanged);
        } // What changes does this cause? Fire triggers for them


        _.actions.forEach(function (action) {
          _this20.parentChanged({
            action: action,
            value: _parent ? _parent[action] : undefined,
            from: oldParent ? oldParent[action] : undefined
          });
        });

        if (_parent) {
          // Add new trigger
          _parent.onchange(this.parentChanged);
        }
      }
    },
    "static": {
      actions: [],
      // Register a new permission type
      register: function register(action, setter) {
        if (Array.isArray(action)) {
          action.forEach(function (action) {
            return _.register(action, setter);
          });
          return;
        }

        $.live(_.prototype, action, {
          get: function get() {
            var ret = this["_" + action];

            if (ret === undefined && this.parent) {
              return this.parent[action];
            }

            return ret;
          },
          set: function set(able, previous) {
            if (setter) {
              setter.call(this, able, previous);
            }

            this.changed(action, able, previous);
          }
        });

        _.actions.push(action);
      }
    }
  });

  _.register(["read", "save"]);

  _.register("login", function (can) {
    if (can && this.logout) {
      this.logout = false;
    }
  });

  _.register("logout", function (can) {
    if (can && this.login) {
      this.login = false;
    }
  });

  _.register("edit", function (can) {
    if (can) {
      this.add = this["delete"] = true;
    }
  });

  _.register(["add", "delete"], function (can) {
    if (!can) {
      this.edit = false;
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  /**
   * Base class for all backends
   */
  var _ = Mavo.Backend = $.Class({
    constructor: function constructor(url) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.update(url, o); // Permissions of this particular backend.

      this.permissions = new Mavo.Permissions();
    },
    update: function update(url) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.source = url;
      this.url = new URL(this.source, Mavo.base);
      this.mavo = o.mavo;
      this.format = Mavo.Formats.create(o.format, this);
    },
    get: function get() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new URL(this.url);

      if (url.protocol != "data:") {
        url.searchParams.set("timestamp", Date.now()); // ensure fresh copy
      }

      return $.fetch(url.href).then(function (xhr) {
        return Promise.resolve(xhr.responseText);
      }, function () {
        return Promise.resolve(null);
      });
    },
    load: function load() {
      var _this21 = this;

      return this.ready.then(function () {
        return _this21.get();
      }).then(function (response) {
        if (typeof response != "string") {
          // Backend did the parsing, we're done here
          return response;
        }

        response = response.replace(/^\ufeff/, ""); // Remove Unicode BOM

        return _this21.format.parse(response);
      });
    },
    store: function store(data) {
      var _this22 = this;

      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          path = _ref3.path,
          _ref3$format = _ref3.format,
          format = _ref3$format === void 0 ? this.format : _ref3$format;

      return this.ready.then(function () {
        var serialize = typeof data === "string" ? Promise.resolve(data) : format.stringify(data);
        return serialize.then(function (serialized) {
          return _this22.put(serialized, path).then(function () {
            return {
              data: data,
              serialized: serialized
            };
          });
        });
      });
    },
    // To be be overriden by subclasses
    ready: Promise.resolve(),
    login: function login() {
      return Promise.resolve();
    },
    logout: function logout() {
      return Promise.resolve();
    },
    put: function put() {
      return Promise.reject();
    },
    isAuthenticated: function isAuthenticated() {
      return !!this.accessToken;
    },
    // Any extra params to be passed to the oAuth URL.
    oAuthParams: function oAuthParams() {
      return "";
    },
    toString: function toString() {
      return "".concat(this.id, " (").concat(this.url, ")");
    },
    equals: function equals(backend) {
      return backend === this || backend && this.id == backend.id && this.source == backend.source;
    },

    /**
     * Helper for making OAuth requests with JSON-based APIs.
     */
    request: function request(call, data) {
      var _this23 = this;

      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "GET";
      var req = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      req = $.extend({}, req); // clone

      req.method = req.method || method;
      req.responseType = req.responseType || "json";
      req.headers = $.extend({
        "Content-Type": "application/json; charset=utf-8"
      }, req.headers || {});

      if (this.isAuthenticated()) {
        req.headers["Authorization"] = req.headers["Authorization"] || "Bearer ".concat(this.accessToken);
      }

      req.data = data;
      call = new URL(call, this.constructor.apiDomain); // Prevent getting a cached response. Cache-control is often not allowed via CORS

      if (req.method == "GET") {
        call.searchParams.set("timestamp", Date.now());
      }

      if ($.type(req.data) === "object") {
        if (req.method == "GET") {
          for (var p in req.data) {
            var action = req.data[p] === undefined ? "delete" : "set";
            call.searchParams[action](p, req.data[p]);
          }

          delete req.data;
        } else {
          req.data = JSON.stringify(req.data);
        }
      }

      return $.fetch(call, req)["catch"](function (err) {
        if (err && err.xhr) {
          return Promise.reject(err.xhr);
        } else {
          _this23.mavo.error("Something went wrong while connecting to " + _this23.id, err);
        }
      }).then(function (xhr) {
        return req.method == "HEAD" ? xhr : xhr.response;
      });
    },

    /**
     * Helper method for authenticating in OAuth APIs
     */
    oAuthenticate: function oAuthenticate(passive) {
      var _this24 = this;

      return this.ready.then(function () {
        if (_this24.isAuthenticated()) {
          return Promise.resolve();
        }

        return new Promise(function (resolve, reject) {
          var id = _this24.id.toLowerCase();

          if (passive) {
            _this24.accessToken = localStorage["mavo:".concat(id, "token")];

            if (_this24.accessToken) {
              resolve(_this24.accessToken);
            }
          } else {
            // Show window
            var popup = {
              width: Math.min(1000, innerWidth - 100),
              height: Math.min(800, innerHeight - 100)
            };
            popup.top = (screen.height - popup.height) / 2;
            popup.left = (screen.width - popup.width) / 2;
            var state = {
              url: location.href,
              backend: _this24.id
            };
            _this24.authPopup = open("".concat(_this24.constructor.oAuth, "?client_id=").concat(_this24.key, "&state=").concat(encodeURIComponent(JSON.stringify(state))) + _this24.oAuthParams(), "popup", "width=".concat(popup.width, ",height=").concat(popup.height, ",left=").concat(popup.left, ",top=").concat(popup.top));

            if (!_this24.authPopup) {
              var message = "Login popup was blocked! Please check your popup blocker settings.";

              _this24.mavo.error(message);

              reject(Error(message));
            }

            addEventListener("message", function (evt) {
              if (evt.source === _this24.authPopup) {
                if (evt.data.backend == _this24.id) {
                  _this24.accessToken = localStorage["mavo:".concat(id, "token")] = evt.data.token;
                }

                if (!_this24.accessToken) {
                  reject(Error("Authentication error"));
                }

                resolve(_this24.accessToken); // Log in to other similar backends that are logged out

                for (var appid in Mavo.all) {
                  var storage = Mavo.all[appid].primaryBackend;

                  if (storage && storage.id === _this24.id && storage !== _this24 && !storage.isAuthenticated()) {
                    storage.login(true);
                  }
                }
              }
            });
          }
        });
      });
    },

    /**
     * oAuth logout helper
     */
    oAuthLogout: function oAuthLogout() {
      if (this.isAuthenticated()) {
        var id = this.id.toLowerCase();
        localStorage.removeItem("mavo:".concat(id, "token"));
        delete this.accessToken;
        this.permissions.off(["edit", "add", "delete", "save"]).on("login");
        $.fire(this.mavo.element, "mv-logout", {
          backend: this
        });
      }

      return Promise.resolve();
    },
    "static": {
      // Return the appropriate backend(s) for this url
      create: function create(url, o, type, existing) {
        var Backend;

        if (type) {
          Backend = Mavo.Functions.get(_, type);
        }

        if (url && !Backend) {
          Backend = _.types.filter(function (Backend) {
            return Backend.test(url);
          })[0] || _.Remote;
        } // Can we re-use the existing object perhaps?


        if (Backend && existing && existing.constructor === Backend && existing.constructor.prototype.hasOwnProperty("update")) {
          existing.update(url, o);
          return existing;
        }

        return Backend ? new Backend(url, o) : null;
      },
      types: [],
      register: function register(Class) {
        _[Class.prototype.id] = Class;

        _.types.push(Class);

        return Class;
      }
    }
  });
  /**
   * Save in an HTML element
   */


  _.register($.Class({
    id: "Element",
    "extends": _,
    constructor: function constructor() {
      this.permissions.on(["read", "edit", "save"]);
    },
    update: function update(url, o) {
      this["super"].update.call(this, url, o);
      this.element = $(this.source) || $.create("script", {
        type: "application/json",
        id: this.source.slice(1),
        inside: document.body
      });
    },
    get: function get() {
      return Promise.resolve(this.element.textContent);
    },
    put: function put(serialized) {
      return Promise.resolve(this.element.textContent = serialized);
    },
    "static": {
      test: function test(url) {
        return url.indexOf("#") === 0;
      }
    }
  })); // Load from a remote URL, no save


  _.register($.Class({
    id: "Remote",
    "extends": _,
    constructor: function constructor() {
      this.permissions.on("read");
    },
    "static": {
      test: function test(url) {
        return false;
      }
    }
  })); // Save in localStorage


  _.register($.Class({
    "extends": _,
    id: "Local",
    constructor: function constructor() {
      this.permissions.on(["read", "edit", "save"]);
      this.key = this.mavo.id;
    },
    get: function get() {
      return Promise[this.key in localStorage ? "resolve" : "reject"](localStorage[this.key]);
    },
    put: function put(serialized) {
      if (!serialized) {
        delete localStorage[this.key];
      } else {
        localStorage[this.key] = serialized;
      }

      return Promise.resolve(serialized);
    },
    "static": {
      test: function test(value) {
        return value == "local";
      }
    }
  }));
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Formats = {};

  var base = _.Base = $.Class({
    "abstract": true,
    constructor: function constructor(backend) {
      this.backend = backend;
    },
    proxy: {
      "mavo": "backend"
    },
    // So that child classes can only override the static methods if they don't
    // need access to any instance variables.
    parse: function parse(content) {
      return this.constructor.parse(content, this);
    },
    stringify: function stringify(data) {
      return this.constructor.stringify(data, this);
    },
    "static": {
      parse: function parse(serialized) {
        return Promise.resolve(serialized);
      },
      stringify: function stringify(data) {
        return Promise.resolve(data);
      },
      extensions: [],
      dependencies: [],
      ready: function ready() {
        return Promise.all(this.dependencies.map(function (d) {
          return $.include(d.test(), d.url);
        }));
      }
    }
  });
  var json = _.JSON = $.Class({
    "extends": _.Base,
    "static": {
      parse: function parse(serialized) {
        return Promise.resolve(serialized ? JSON.parse(serialized) : null);
      },
      stringify: function stringify(data) {
        return Promise.resolve(Mavo.toJSON(data));
      },
      extensions: [".json", ".jsonld"]
    }
  });
  var text = _.Text = $.Class({
    "extends": _.Base,
    constructor: function constructor(backend) {
      this.property = this.mavo.root.getNames("Primitive")[0];
    },
    "static": {
      extensions: [".txt"],
      parse: function parse(serialized, me) {
        return Promise.resolve(_defineProperty({}, me ? me.property : "content", serialized));
      },
      stringify: function stringify(data, me) {
        return Promise.resolve(data[me ? me.property : "content"]);
      }
    }
  });
  var csv = _.CSV = $.Class({
    "extends": _.Base,
    constructor: function constructor(backend) {
      this.property = this.mavo.root.getNames("Collection")[0];
      this.options = $.extend({}, _.CSV.defaultOptions);
    },
    "static": {
      extensions: [".csv", ".tsv"],
      defaultOptions: {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      },
      dependencies: [{
        test: function test() {
          return self.Papa;
        },
        url: "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.4/papaparse.min.js"
      }],
      ready: base.ready,
      parse: function parse(serialized, me) {
        return csv.ready().then(function () {
          var data = Papa.parse(serialized, csv.defaultOptions);
          var property = me ? me.property : "content";

          if (me) {
            // Get delimiter & linebreak for serialization
            me.options.delimiter = data.meta.delimiter;
            me.options.linebreak = data.meta.linebreak;
          }

          if (data.meta.aborted) {
            throw data.meta.errors.pop();
          }

          return _defineProperty({}, property, data.data);
        });
      },
      stringify: function stringify(data, me) {
        return csv.ready().then(function () {
          var property = me ? me.property : "content";
          var options = me ? me.options : csv.defaultOptions;
          return Papa.unparse(data[property], options);
        });
      }
    }
  });
  Object.defineProperty(_, "create", {
    value: function value(format, backend) {
      if (format && _typeof(format) === "object") {
        return format;
      }

      if (typeof format === "string") {
        // Search by id
        format = format.toLowerCase();

        for (var id in _) {
          var Format = _[id];

          if (id.toLowerCase() == format) {
            return new Format(backend);
          }
        }
      }

      if (!format) {
        var url = backend.url ? backend.url.pathname : backend.source;
        var extension = Mavo.match(url, /\.\w+$/) || ".json";
        var Format = _.JSON;

        for (var id in _) {
          if (_[id].extensions.indexOf(extension) > -1) {
            // Do not return match, as we may find another match later
            // and last match wins
            Format = _[id];
          }
        }

        return new Format(backend);
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Node =
  /*#__PURE__*/
  function () {
    function Node(element, mavo) {
      var _this25 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Node);

      if (!element || !mavo) {
        throw new Error("Mavo.Node constructor requires an element argument and a mavo object");
      }

      var env = {
        context: this,
        options: options
      }; // Set these first, for debug reasons

      this.uid = _.all.push(this) - 1;
      this.property = null;
      this.element = element;
      this.isHelperVariable = this.element.matches("meta");
      $.extend(this, env.options);

      _.elements.set(element, [].concat(_toConsumableArray(_.elements.get(this.element) || []), [this]));

      this.mavo = mavo;
      this.group = this.parent = this.parentGroup = env.options.group;
      this.template = env.options.template;
      this.alias = this.element.getAttribute("mv-alias");

      if (this.template) {
        this.template.copies.push(this);
      } else {
        // First (or only) of its kind
        this.copies = [];
      }

      if (!this.fromTemplate("property", "type", "storage", "path")) {
        this.property = _.getProperty(element);
        this.type = Mavo.Group.normalize(element);
        this.storage = this.element.getAttribute("mv-storage");
        this.path = this.getPath();
      }

      this.modes = this.element.getAttribute("mv-mode");
      Mavo.hooks.run("node-init-start", env);
      this.mode = Mavo.getStyle(this.element, "--mv-mode") || "read";
      this.collection = env.options.collection;

      if (this.collection) {
        // This is a collection item
        this.group = this.parentGroup = this.collection.parentGroup;
      } // Must run before collections have a marker which messes up paths


      var template = this.template;

      if (template && template.expressions) {
        // We know which expressions we have, don't traverse again
        this.expressions = template.expressions.map(function (et) {
          return new Mavo.DOMExpression({
            template: et,
            item: _this25,
            mavo: _this25.mavo
          });
        });
      }

      if (this instanceof Mavo.Group || this.collection) {
        // Handle mv-value
        // TODO integrate with the code in Primitive that decides whether this is a computed property
        var et = Mavo.DOMExpression.search(this.element).filter(function (et) {
          return et.originalAttribute == "mv-value";
        })[0];

        if (et) {
          et.mavoNode = this;
          this.expressionText = et;
          this.storage = this.storage || "none";
          this.modes = "read";

          if (this.collection) {
            this.collection.expressions = [].concat(_toConsumableArray(this.collection.expressions || []), [et]);
            et.mavoNode = this.collection;
            this.collection.storage = this.collection.storage || "none";
            this.collection.modes = "read";
          }
        }
      }

      Mavo.hooks.run("node-init-end", env);
    }

    _createClass(Node, [{
      key: "postInit",

      /**
       * Runs after the constructor is done (including the constructor of the inheriting class), synchronously
       */
      value: function postInit() {
        if (this.modes == "edit") {
          this.edit();
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.template) {
          Mavo["delete"](this.template.copies, this);
        }

        if (this.expressions) {
          this.expressions.forEach(function (expression) {
            return expression.destroy();
          });
        }

        if (this.itembar) {
          this.itembar.destroy();
        }

        delete _.all[this.uid];
        this.propagate("destroy");
      }
    }, {
      key: "getLiveData",
      value: function getLiveData() {
        return this.liveData.proxy;
      }
    }, {
      key: "isDataNull",
      value: function isDataNull() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var env = {
          context: this,
          options: o,
          result: !this.saved && !o.live
        };
        Mavo.hooks.run("node-isdatanull", env);
        return env.result;
      }
      /**
       * Execute a callback on every node of the Mavo tree
       * If callback returns (strict) false, walk stops.
       * @param callback {Function}
       * @param path {Array} Initial path. Mostly used internally.
       * @param o {Object} Options:
       * 			- descentReturn {Boolean} If callback returns false, just don't descend
       * 			                Otherwise, if callback returns false, it stops.
       * @return false if was stopped via a false return value, true otherwise
       */

    }, {
      key: "walk",
      value: function walk(callback) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var walker = function walker(obj, path) {
          var ret = callback(obj, path);

          if (ret !== false) {
            for (var i in obj.children) {
              var node = obj.children[i];

              if (node instanceof Mavo.Node) {
                var ret = walker.call(node, node, [].concat(_toConsumableArray(path), [i]));

                if (ret === false && !o.descentReturn) {
                  return false;
                }
              }
            }
          }

          return ret !== false;
        };

        return walker(this, path);
      }
    }, {
      key: "walkUp",
      value: function walkUp(callback) {
        var group = this;

        while (group = group.parentGroup) {
          var ret = callback(group);

          if (ret !== undefined) {
            return ret;
          }
        }
      }
    }, {
      key: "edit",
      value: function edit() {
        this.mode = "edit";

        if (this.mode != "edit") {
          return false;
        }

        $.fire(this.element, "mv-edit", {
          mavo: this.mavo,
          node: this
        });
        Mavo.hooks.run("node-edit-end", this);
      }
    }, {
      key: "done",
      value: function done() {
        this.mode = Mavo.getStyle(this.element.parentNode, "--mv-mode") || "read";

        if (this.mode != "read") {
          return false;
        }

        $.unbind(this.element, ".mavo:edit");
        $.fire(this.element, "mv-done", {
          mavo: this.mavo,
          node: this
        });
        this.propagate("done");
        Mavo.hooks.run("node-done-end", this);
      }
    }, {
      key: "save",
      value: function save() {
        this.unsavedChanges = false;
        this.propagate("save");
      }
    }, {
      key: "propagate",
      value: function propagate(callback) {
        for (var i in this.children) {
          var node = this.children[i];

          if (node instanceof Mavo.Node) {
            if (typeof callback === "function") {
              callback.call(node, node);
            } else if (callback in node) {
              node[callback]();
            }
          }
        }
      }
    }, {
      key: "fromTemplate",
      value: function fromTemplate() {
        var _this26 = this;

        if (this.template) {
          for (var _len3 = arguments.length, properties = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            properties[_key3] = arguments[_key3];
          }

          properties.forEach(function (property) {
            return _this26[property] = _this26.template[property];
          });
        }

        return !!this.template;
      }
    }, {
      key: "render",
      value: function render(data) {
        var _this27 = this;

        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        o.live = o.live || Mavo["in"](Mavo.isProxy, data);
        o.root = o.root || this;

        if (o.live) {
          // Drop proxy
          data = Mavo.clone(data);
        }

        this.oldData = this.data;
        this.data = data;

        if (!o.live) {
          data = Mavo.subset(data, this.inPath);
        }

        var env = {
          context: this,
          data: data,
          options: o
        };
        Mavo.hooks.run("node-render-start", env);

        if (!this.isHelperVariable) {
          if (!Array.isArray(this.children) && Array.isArray(env.data)) {
            // We are rendering an array on a singleton, what to do?
            if (this.isRoot) {
              // Get the name of the first property that is a collection without mv-value
              // OR if there is a collection with property="main", prioritize that
              var mainProperty = this.children.main instanceof Mavo.Collection ? "main" : this.getNames(function (p, n) {
                return n instanceof Mavo.Collection && !$.value(n.expressions, 0, "isDynamicObject");
              })[0];

              if (mainProperty) {
                env.data = _defineProperty({}, mainProperty, env.data);
              }
            }

            if (!this.isRoot || !mainProperty) {
              // Otherwise, render first item
              this.inPath.push("0");
              env.data = env.data[0];
            }
          } else if (this.childrenNames && this.childrenNames.length == 1 && this.childrenNames[0] === this.property && env.data !== null && _typeof(env.data) === "object") {
            // {foo: {foo: 5}} should become {foo: 5}
            env.data = env.data[this.property];
          }
        }

        if (this === o.root) {
          this.expressionsEnabled = false;
        }

        var editing = this.editing;

        if (editing) {
          this.done();
        }

        var changed = this.dataRender(env.data, o);

        if (editing) {
          this.edit();
        }

        if (this === o.root) {
          this.save();
          this.expressionsEnabled = true;

          if (changed) {
            requestAnimationFrame(function () {
              return _this27.mavo.expressions.update(_this27);
            });
          }
        }

        Mavo.hooks.run("node-render-end", env);
        return changed;
      }
    }, {
      key: "dataChanged",
      value: function dataChanged(action) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var change = $.extend({
          action: action,
          property: this.property,
          mavo: this.mavo,
          node: this
        }, o);
        $.fire(o.element || this.element, "mv-change", change);
        this.mavo.changed(change);
      }
    }, {
      key: "toString",
      value: function toString() {
        return "#".concat(this.uid, ": ").concat(this.constructor.name, " (").concat(this.property, ")");
      }
    }, {
      key: "getClosestCollection",
      value: function getClosestCollection() {
        var closestItem = this.closestItem;
        return closestItem ? closestItem.collection : null;
      }
    }, {
      key: "getClosestItem",
      value: function getClosestItem() {
        if (this.collection && Array.isArray(this.collection.children)) {
          return this;
        }

        return this.parentGroup ? this.parentGroup.closestItem : null;
      }
    }, {
      key: "getPath",
      value: function getPath() {
        var path = this.parent ? this.parent.path : [];
        return this.property ? [].concat(_toConsumableArray(path), [this.property]) : path;
      }
    }, {
      key: "pathFrom",
      value: function pathFrom(node) {
        var path = this.path;
        var nodePath = node.path;

        for (var i = 0; i < path.length && nodePath[i] == path[i]; i++) {}

        return path.slice(i);
      }
    }, {
      key: "getDescendant",
      value: function getDescendant(path) {
        return path.reduce(function (acc, cur) {
          return acc.children[cur];
        }, this);
      }
      /**
       * Get same node in other item in same collection
       * E.g. for same node in the next item, use an offset of -1
       */

    }, {
      key: "getCousin",
      value: function getCousin(offset) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!this.closestCollection) {
          return null;
        }

        var collection = this.closestCollection;
        var distance = Math.abs(offset);
        var direction = offset < 0 ? -1 : 1;

        if (collection.length < distance + 1) {
          return null;
        }

        var index = this.closestItem.index + offset;

        if (o.wrap) {
          index = Mavo.wrap(index, collection.length);
        }

        for (var i = 0; i < collection.length; i++) {
          var ind = index + i * direction;

          if (o.wrap) {
            ind = Mavo.wrap(ind, collection.length);
          }

          var item = collection.children[ind];

          if (item) {
            break;
          }
        }

        if (!item || item == this.closestItem) {
          return null;
        }

        if (this.collection) {
          return item;
        }

        var relativePath = this.pathFrom(this.closestItem);
        return item.getDescendant(relativePath);
      }
    }, {
      key: "contains",
      value: function contains(node) {
        do {
          if (node === this) {
            return true;
          }

          node = node.parent;
        } while (node);

        return false;
      } // Evaluate expression on the fly with this node as context

    }, {
      key: "eval",
      value: function _eval(expr, o) {
        return new Mavo.Expression(expr).eval(this.getLiveData(), o);
      }
    }, {
      key: "editing",
      get: function get() {
        return this.mode == "edit";
      }
    }, {
      key: "isRoot",
      get: function get() {
        return !this.property;
      }
    }, {
      key: "name",
      get: function get() {
        return Mavo.Functions.readable(this.property || this.type).toLowerCase();
      }
    }, {
      key: "saved",
      get: function get() {
        return this.storage !== "none";
      }
    }, {
      key: "properties",
      get: function get() {
        return Object.keys(this.liveData.data[Mavo.route]);
      }
    }], [{
      key: "create",
      value: function create(element, mavo) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (Mavo.is("multiple", element) && !o.collection) {
          return new Mavo.Collection(element, mavo, o);
        }

        return new Mavo[Mavo.is("group", element) ? "Group" : "Primitive"](element, mavo, o);
      }
      /**
       * Get & normalize property name, if exists
       */

    }, {
      key: "getProperty",
      value: function getProperty(element) {
        var property = element.getAttribute("property") || element.getAttribute("itemprop");

        if (!property) {
          var multiple = element.getAttribute("mv-multiple");

          if (element.hasAttribute("property")) {
            // property used without a value
            property = multiple || element.name || element.id || element.classList[0];

            if (!property) {
              property = _.generatePropertyName(multiple === null ? "prop" : "collection", element);
            }
          }
        }

        if (property) {
          element.setAttribute("property", property);
        }

        return property;
      }
    }, {
      key: "generatePropertyName",
      value: function generatePropertyName(prefix) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
        var root = element.closest(Mavo.selectors.init);

        for (var i = ""; i < 10000; i++) {
          // 1000 is just a failsafe
          var name = prefix + i;

          if (!$(Mavo.selectors.specificProperty(name), root)) {
            return name;
          }
        }
      }
    }, {
      key: "get",
      value: function get(element, prioritizePrimitive) {
        var nodes = (_.elements.get(element) || []).filter(function (node) {
          return !Array.isArray(node.children);
        });

        if (nodes.length < 2 || !prioritizePrimitive) {
          return nodes[0];
        }

        if (nodes[0] instanceof Mavo.Group) {
          return nodes[1];
        }
      }
    }, {
      key: "getClosest",
      value: function getClosest(element, prioritizePrimitive) {
        var node;

        do {
          node = _.get(element, prioritizePrimitive);
        } while (!node && (element = element.parentNode));

        return node;
      }
    }, {
      key: "getClosestItem",
      value: function getClosestItem(element) {
        var item = _.getClosest(element);

        if (item instanceof Mavo.Primitive && !item.collection) {
          return item.parent;
        }

        return item;
      }
      /**
       * Get all properties that are inside an element but not nested into other properties
       */

    }, {
      key: "children",
      value: function children(element) {
        var ret = Mavo.Node.get(element);

        if (ret) {
          // element is a Mavo node
          return [ret];
        }

        ret = $$(Mavo.selectors.property, element).map(function (e) {
          return Mavo.Node.get(e);
        }).filter(function (e) {
          return !element.contains(e.parentGroup.element);
        }) // drop nested properties
        .map(function (e) {
          return e.collection || e;
        });
        return Mavo.Functions.unique(ret);
      }
    }]);

    return Node;
  }();

  $.Class(_, {
    toJSON: Mavo.prototype.toJSON,
    lazy: {
      closestCollection: function closestCollection() {
        return this.getClosestCollection();
      },
      closestItem: function closestItem() {
        return this.getClosestItem();
      },
      // Are we only rendering and editing a subset of the data?
      inPath: function inPath() {
        var attribute = this instanceof Mavo.Collection ? "mv-multiple-path" : "mv-path";
        return (this.element.getAttribute(attribute) || "").split("/").filter(function (p) {
          return p.length;
        });
      }
    },
    live: {
      store: function store(value) {
        $.toggleAttribute(this.element, "mv-storage", value);
      },
      unsavedChanges: function unsavedChanges(value) {
        if (value && (!this.saved || !this.editing)) {
          value = false;
        }

        if (!Array.isArray(this.children)) {
          this.element.classList.toggle("mv-unsaved-changes", value);
        }

        return value;
      },
      mode: function mode(value) {
        var _this28 = this;

        if (this._mode != value) {
          // Is it allowed?
          if (this.modes && value != this.modes) {
            value = this.modes;
          } // If we don't do this, setting the attribute below will
          // result in infinite recursion


          this._mode = value;

          if (!Array.isArray(this.children) && [null, "", "read", "edit"].indexOf(this.element.getAttribute("mv-mode")) > -1) {
            // If attribute is not one of the recognized values, leave it alone
            var set = this.modes || value == "edit";
            Mavo.Observer.sneak(this.mavo.modeObserver, function () {
              $.toggleAttribute(_this28.element, "mv-mode", value, set);
            });
          }

          return value;
        }
      },
      modes: function modes(value) {
        if (value && value != "read" && value != "edit") {
          return null;
        }

        this._modes = value;

        if (value && this.mode != value) {
          this.mode = value;
        }
      },
      collection: function collection(value) {
        // These only change when collection changes
        this.parent = value || this.parentGroup;
      },
      index: function index(value) {
        if (this._index !== value) {
          this._index = value;
          this.liveData.updateKey();
        }
      },
      expressionsEnabled: {
        get: function get() {
          if (this._expressionsEnabled === false) {
            return false;
          } else {
            return this.parent ? this.parent.expressionsEnabled : true;
          }
        }
      }
    },
    "static": {
      all: [],
      elements: new WeakMap()
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Group =
  /*#__PURE__*/
  function (_Mavo$Node) {
    _inherits(Group, _Mavo$Node);

    function Group(element, mavo, o) {
      var _this29;

      _classCallCheck(this, Group);

      _this29 = _possibleConstructorReturn(this, _getPrototypeOf(Group).call(this, element, mavo, o));
      _this29.children = {};
      _this29.group = _assertThisInitialized(_this29);
      Mavo.hooks.run("group-init-start", _assertThisInitialized(_this29)); // Should this element also create a primitive?

      if (Mavo.Primitive.getValueAttribute(_this29.element)) {
        var obj = _this29.children[_this29.property] = new Mavo.Primitive(_this29.element, _this29.mavo, {
          group: _assertThisInitialized(_this29)
        });
      } // Create Mavo objects for all properties in this group (primitives or groups),
      // but not properties in descendant groups (they will be handled by their group)


      var properties = $$(Mavo.selectors.property + ", " + Mavo.selectors.multiple, _this29.element).filter(function (element) {
        return _this29.element === (element.parentNode.closest(Mavo.selectors.childGroup) || _this29.mavo.element);
      }); // Figure out which properties are mv-multiple

      var collections = {};
      properties.forEach(function (element) {
        var property = Mavo.Node.getProperty(element);

        if (collections[property] !== "multiple") {
          collections[property] = Mavo.is("multiple", element) ? "multiple" : (collections[property] || 0) + 1;
        }
      }); // Now create the node objects

      properties.forEach(function (element, i) {
        var property = Mavo.Node.getProperty(element);
        var template = _this29.template ? _this29.template.children[property] : null;
        var options = {
          template: template,
          group: _assertThisInitialized(_this29)
        };
        var isCollection = collections[property];

        if (isCollection === "multiple") {
          var existing = _this29.children[property];

          if (existing instanceof Mavo.Collection) {
            existing.add(element);
          } else if (Mavo.is("multiple", element)) {
            // We must create the collection with the element that actually has mv-multiple
            // otherwise the template will be all wrong
            _this29.children[property] = new Mavo.Collection(element, _this29.mavo, options);
            (existing || []).forEach(function (e, i) {
              return _this29.children[property].add(e, i);
            });
          } else {
            _this29.children[property] = [].concat(_toConsumableArray(existing || []), [element]);
          }
        } else if (isCollection > 1) {
          if (!_this29.children[property]) {
            _this29.children[property] = new Mavo.ImplicitCollection(element, _this29.mavo, options);
          } else {
            _this29.children[property].add(element);
          }
        } else {
          // Normal case
          _this29.children[property] = Mavo.Node.create(element, _this29.mavo, options);
        }
      });
      _this29.childrenNames = Object.keys(_this29.children);
      _this29.vocab = Mavo.getClosestAttribute(_this29.element, "vocab");

      _this29.postInit();

      Mavo.hooks.run("group-init-end", _assertThisInitialized(_this29));
      return _this29;
    }

    _createClass(Group, [{
      key: "getNames",
      value: function getNames() {
        var _this30 = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Node";
        var filter = typeof type === "function" ? type : function (p, n) {
          return n instanceof Mavo[type];
        };
        return Object.keys(this.children).filter(function (p) {
          return filter(p, _this30.children[p]);
        });
      }
    }, {
      key: "getData",
      value: function getData() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var env = {
          context: this,
          options: o
        };

        if (this.isDataNull(o)) {
          return null;
        }

        env.data = Mavo.shallowClone(Mavo.subset(this.data, this.inPath)) || {};

        for (var property in this.children) {
          var obj = this.children[property];

          if (obj.saved) {
            var data = obj.getData(env.options);
          }

          if (obj.saved && Mavo.value(data) !== null) {
            env.data[obj.property] = data;
          } else {
            delete env.data[obj.property];
          }
        }

        if (!this.childrenNames.length && !this.isRoot) {
          // Avoid {} in the data
          env.data = null;
        } else if (this.childrenNames.length === 1 && this.property in this.children) {
          env.data = env.data[this.property];
        } else if (env.data && _typeof(env.data) === "object") {
          // Add JSON-LD stuff
          if (this.type && this.type != _.DEFAULT_TYPE) {
            env.data["@type"] = this.type;
          }

          if (this.vocab) {
            env.data["@context"] = this.vocab;
          }
        } // If storing, use the rendered data too


        env.data = Mavo.subset(this.data, this.inPath, env.data);
        Mavo.hooks.run("node-getdata-end", env);
        return env.data;
      }
    }, {
      key: "edit",
      value: function edit() {
        var _this31 = this;

        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (_get(_getPrototypeOf(Group.prototype), "edit", this).call(this) === false) {
          return false;
        }

        return Promise.all(Object.keys(this.children).map(function (prop) {
          return _this31.children[prop].edit(o);
        }));
      }
    }, {
      key: "dataRender",
      value: function dataRender(data) {
        var _this32 = this;

        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!data) {
          return;
        }

        var changed = false; // What if data is not an object?

        if (_typeof(data) !== "object") {
          var wasPrimitive = true; // Data is a primitive, render it on this.property or failing that, any writable property

          if (this.property in this.children) {
            var property = this.property;
          } else {
            var type = $.type(data);

            var score = function score(prop) {
              return (_this32.children[prop] instanceof Mavo.Primitive) + (_this32.children[prop].datatype == type);
            };

            var property = Object.keys(this.children).filter(function (p) {
              return !_this32.children[p].expressionText;
            }).sort(function (prop1, prop2) {
              return score(prop1) - score(prop2);
            }).reverse()[0];
          }

          data = _defineProperty({}, property, data);
          this.data = Mavo.subset(this.data, this.inPath, data);
        }

        var copy; // to handle renaming

        this.propagate(function (obj) {
          var propertyData = data[obj.property]; // find first alias with data, load that data, and set to be copied

          if (obj.alias) {
            var aliasesArr = obj.alias.split(" ");

            for (var i = 0; i < aliasesArr.length; i++) {
              var currentAlias = aliasesArr[i];

              if (data[currentAlias] !== undefined) {
                obj.currentAlias = currentAlias;
                copy = copy || $.extend({}, data);
                propertyData = data[obj.currentAlias];
                break;
              }
            }
          }

          changed = obj.render(propertyData, o) || changed;
        }); // Rename properties. This needs to be done separately to handle swapping.

        if (copy) {
          this.propagate(function (obj) {
            if (obj.currentAlias) {
              data[obj.property] = copy[obj.currentAlias];

              if (!(obj.currentAlias in _this32.children)) {
                delete data[obj.currentAlias];
              }
            }
          });
        }

        if (!wasPrimitive) {
          // Fire mv-change events for properties not in the template,
          // since nothing else will and they can still be referenced in expressions
          var oldData = Mavo.subset(this.oldData, this.inPath);

          for (var property in data) {
            if (!(property in this.children)) {
              var value = data[property];
              changed = changed || data[property] !== this.liveData.data[property];
              this.liveData.set(property, value);

              if (_typeof(value) != "object" && (!oldData || oldData[property] != value)) {
                // Property actually changed. Why != "object" though?
                this.dataChanged("propertychange", {
                  property: property
                });
              }
            }
          }
        }

        return changed;
      }
    }, {
      key: "isRoot",
      get: function get() {
        return !this.property;
      }
    }], [{
      key: "normalize",
      value: function normalize(element) {
        // Get & normalize typeof name, if exists
        if (Mavo.is("group", element)) {
          var type = Mavo.getAttribute(element, "typeof", "mv-group") || _.DEFAULT_TYPE;

          element.setAttribute("typeof", type);
          return type;
        }

        return null;
      }
    }]);

    return Group;
  }(Mavo.Node);

  $.Class(_, {
    lazy: {
      liveData: function liveData() {
        return new Mavo.Data(this, {});
      }
    },
    "static": {
      all: new WeakMap(),
      DEFAULT_TYPE: "Item"
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Primitive =
  /*#__PURE__*/
  function (_Mavo$Node2) {
    _inherits(Primitive, _Mavo$Node2);

    function Primitive(element, mavo, o) {
      var _this33;

      _classCallCheck(this, Primitive);

      _this33 = _possibleConstructorReturn(this, _getPrototypeOf(Primitive).call(this, element, mavo, o));
      _this33.liveData = new Mavo.Data(_assertThisInitialized(_this33));

      if (!_this33.fromTemplate("config", "attribute", "templateValue", "originalEditor")) {
        _this33.config = _.getConfig(element); // Which attribute holds the data, if any?
        // "null" or null for none (i.e. data is in content).

        _this33.attribute = _this33.config.attribute; // HTML attribute names are case insensitive (Fix for #515)

        if (_this33.attribute && !document.xmlVersion) {
          _this33.attribute = _this33.attribute.toLowerCase();
        }
      }

      _this33.datatype = _this33.config.datatype;

      if ("modes" in _this33.config) {
        // If modes are related to element type, this overrides everything
        // because it means the other mode makes no sense for that element
        _this33.modes = _this33.config.modes;

        _this33.element.setAttribute("mv-mode", _this33.config.modes);
      }

      Mavo.hooks.run("primitive-init-start", _assertThisInitialized(_this33)); // Link primitive with its expressionText object
      // We need to do this before any editing UI is generated

      _this33.expressionText = _this33.expressionText || Mavo.DOMExpression.search(_this33.element, _this33.attribute);

      if (_this33.expressionText && !_this33.expressionText.mavoNode) {
        // Computed property
        _this33.expressionText.primitive = _assertThisInitialized(_this33);
        _this33.storage = _this33.storage || "none";
        _this33.modes = "read";

        _this33.element.setAttribute("aria-live", "polite");
      }
      /**
       * Set up input widget
       */
      // Linked widgets


      if (!_this33.editor && _this33.element.hasAttribute("mv-edit")) {
        if (!_this33.originalEditor) {
          _this33.originalEditor = $(_this33.element.getAttribute("mv-edit"));
        }

        if (_this33.originalEditor) {
          // Update editor if original mutates
          // This means that expressions on mv-edit for individual collection items will not be picked up
          if (!_this33.template) {
            _this33.originalEditorObserver = new Mavo.Observer(_this33.originalEditor, "all", function (records) {
              _this33.copies.concat(_assertThisInitialized(_this33)).forEach(function (primitive) {
                if (primitive.defaultSource == "editor") {
                  primitive["default"] = _this33.originalEditor.value;
                }

                if (primitive.editor) {
                  primitive.editor = _this33.originalEditor.cloneNode(true);
                }

                primitive.setValue(primitive.value, {
                  force: true,
                  silent: true
                });
              });
            });
          }
        }
      } // Nested widgets


      if (!_this33.editor && !_this33.originalEditor && !_this33.attribute) {
        _this33.editor = $$(_this33.element.children).filter(function (el) {
          return el.matches(Mavo.selectors.formControl) && !el.matches(Mavo.selectors.property);
        })[0];

        if (_this33.editor) {
          $.remove(_this33.editor);
        }
      }

      var editorValue = _this33.editorValue;

      if (!_this33.datatype && (typeof editorValue == "number" || typeof editorValue == "boolean")) {
        _this33.datatype = _typeof(editorValue);
      }

      if (_this33.config.init) {
        _this33.config.init.call(_assertThisInitialized(_this33), _this33.element);
      }

      if (_this33.config.changeEvents) {
        $.bind(_this33.element, _this33.config.changeEvents, function (evt) {
          if (evt.target === _this33.element) {
            _this33.value = _this33.getValue();
          }
        });
      }

      _this33.templateValue = _this33.getValue();
      _this33._default = _this33.element.getAttribute("mv-default");

      if (_this33["default"] === null) {
        // no mv-default
        _this33._default = _this33.modes ? _this33.templateValue : editorValue;
        _this33.defaultSource = _this33.modes ? "template" : "editor";
      } else if (_this33["default"] === "") {
        // mv-default exists, no value, default is template value
        _this33._default = _this33.templateValue;
        _this33.defaultSource = "template";
      } else {
        // mv-default with value
        var defaultExpression = Mavo.DOMExpression.search(_this33.element, "mv-default");

        if (defaultExpression) {
          // To preserve type, e.g. booleans should stay booleans, not become strings
          defaultExpression.output = function (value) {
            return _this33["default"] = value;
          };
        } else {
          _this33.defaultObserver = new Mavo.Observer(_this33.element, "mv-default", function (record) {
            _this33["default"] = _this33.element.getAttribute("mv-default");
          });
        }

        _this33.defaultSource = "attribute";
      }

      var keepTemplateValue = !_this33.template // not in a collection or first item
      || _this33.template.templateValue != _this33.templateValue // or different template value than first item
      || _this33.modes == "edit"; // or is always edited

      if (_this33["default"] === undefined && keepTemplateValue) {
        _this33.initialValue = _this33.templateValue;
      } else {
        _this33.initialValue = _this33["default"];
      }

      if (_this33.initialValue === undefined) {
        _this33.initialValue = _this33.emptyValue;
      }

      _this33.setValue(_this33.initialValue, {
        silent: true
      });

      if (_this33.element.hasAttribute("aria-label")) {
        // Custom label, make it lazy to give expressions a chance and then observe changes
        $.lazy(_assertThisInitialized(_this33), "label", function () {
          _this33.labelObserver = new Mavo.Observer(_this33.element, "aria-label", function () {
            _this33.label = _this33.element.getAttribute("aria-label");

            if ("placeholder" in _this33.editor) {
              _this33.editor.placeholder = "(".concat(_this33.label, ")");
            }
          });
          return _this33.element.getAttribute("aria-label");
        });
      } else {
        _this33.label = Mavo.Functions.readable(_this33.property);

        _this33.element.setAttribute("aria-label", _this33.label);
      } // Make attribute explicit in the HTML in certain cases (because our CSS needs this)


      if (!_this33.attribute) {
        Mavo.setAttributeShy(_this33.element, "mv-attribute", "none");
      }

      _this33.postInit();

      Mavo.hooks.run("primitive-init-end", _assertThisInitialized(_this33));
      return _this33;
    }

    _createClass(Primitive, [{
      key: "updateObserver",
      // Add mutation observer to observe future mutations to this property, if possible
      // Properties like input.checked or input.value cannot be observed that way
      // so we cannot depend on mutation observers for everything :(
      value: function updateObserver() {
        var _this34 = this;

        if (!this.config) {
          return;
        }

        if (this.config.observer === false) {
          if (this.observer) {
            this.observer.stop();
          }
        } else {
          var options = {
            subtree: this.config.subtree,
            childList: this.config.subtree
          };

          if (this.observer) {
            if (this.observer.attribute !== this.attribute || this.observer.options.subtree !== options.subtree) {
              // Options changed since last time, we need to recreate observer
              this.observer.update(this.element, this.attribute, options);
            }

            if (!this.observer.running) {
              this.observer.run();
            }
          } else {
            this.observer = new Mavo.Observer(this.element, this.attribute, function (records) {
              if (_this34._config.observer === false) {
                _this34.observer.stop();
              } else if (_this34.attribute || !_this34.editing || _this34.config.subtree) {
                _this34.value = _this34.getValue();
              }
            }, options);
          }
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this35 = this;

        _get(_getPrototypeOf(Primitive.prototype), "destroy", this).call(this);

        ["defaultObserver", "observer", "originalEditorObserver", "labelObserver"].forEach(function (observer) {
          _this35[observer] && _this35[observer].destroy();
        });
      }
    }, {
      key: "isDataNull",
      value: function isDataNull(o) {
        return _get(_getPrototypeOf(Primitive.prototype), "isDataNull", this).call(this, o) || this._value === null || this._value === undefined;
      }
    }, {
      key: "getData",
      value: function getData() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var env = {
          context: this,
          options: o
        };

        if (this.isDataNull(o)) {
          return null;
        }

        env.data = this.value;

        if (env.data === "" && (!this.templateValue || this.initialValue !== this.templateValue)) {
          env.data = null;
        }

        if (this.inPath.length) {
          env.data = Mavo.subset(this.data, this.inPath, env.data);
        }

        Mavo.hooks.run("node-getdata-end", env);
        return env.data;
      }
    }, {
      key: "sneak",
      value: function sneak(callback) {
        return Mavo.Observer.sneak(this.observer, callback);
      }
    }, {
      key: "save",
      value: function save() {
        this.savedValue = this.value;
        this.unsavedChanges = false;
      } // Called only the first time this primitive is edited

    }, {
      key: "initEdit",
      value: function initEdit() {
        var _this36 = this;

        if (!this.editor && this.originalEditor) {
          this.editor = this.originalEditor.cloneNode(true);
        }

        if (!this.editor) {
          // No editor provided, use default for element type
          // Find default editor for datatype
          var editor = this.config.editor;

          if (!editor || this.datatype == "boolean") {
            editor = Mavo.Elements.defaultConfig[this.datatype || "string"].editor;
          }

          this.editor = $.create($.type(editor) === "function" ? editor.call(this) : editor);
          this.editorValue = this.value;
        }

        $.bind(this.editor, {
          "input change": function inputChange(evt) {
            _this36.value = _this36.editorValue;
          },
          "mv-change": function mvChange(evt) {
            if (evt.property === "output") {
              evt.stopPropagation();
              $.fire(_this36.editor, "input");
            }
          }
        });
        var multiline = this.editor.matches("textarea");

        if (!multiline) {
          this.editor.addEventListener("focus", function (evt) {
            _this36.editor.select && _this36.editor.select();
          });
        }

        if ("placeholder" in this.editor) {
          this.editor.placeholder = "(".concat(this.label, ")");
        } // Copy any mv-edit-* attributes from the element to the editor


        Mavo.attributeStartsWith("mv-edit-", this.element).forEach(function (attribute) {
          _this36.editor.setAttribute(attribute.name.replace("mv-edit-", ""), attribute.value);
        });

        if (this.attribute || this.config.popup) {
          this.popup = new Mavo.UI.Popup(this);
        }

        if (!this.popup) {
          this.editor.classList.add("mv-editor");
        }

        this.initEdit = null;
      }
    }, {
      key: "edit",
      value: function edit() {
        var _this37 = this;

        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var wasEditing = this.editing;

        if (_get(_getPrototypeOf(Primitive.prototype), "edit", this).call(this) === false) {
          // Invalid edit
          return false;
        }

        if (wasEditing && !this.initEdit) {
          // Already being edited
          return this.preEdit;
        }

        if (!this.preEdit) {
          this.preEdit = Mavo.promise();
          this.afterPreEdit = null;
          this.preEdit.then(function (evt) {
            $.unbind(_this37.element, ".mavo:preedit");
            requestAnimationFrame(function () {
              // Enter should insert a new item and backspace should delete it
              if (!_this37.popup && _this37.closestCollection && _this37.editor && _this37.editor.matches(Mavo.selectors.textInput)) {
                // If pasting text with line breaks and this is a single-line input
                // Insert them as multiple items
                var multiline = _this37.editor.matches("textarea");

                if (!multiline) {
                  $.bind(_this37.editor, "paste.mavo:edit", function (evt) {
                    if (!_this37.closestCollection.editing || !evt.clipboardData) {
                      return;
                    }

                    var text = evt.clipboardData.getData("text/plain");
                    var CRLF = /\r?\n|\r/;

                    if (CRLF.test(text)) {
                      evt.preventDefault();
                      var lines = text.split(CRLF); // "Paste" first line where the cursor is

                      _this37.editor.setRangeText(lines[0]);

                      $.fire(_this37.editor, "input"); // Insert the rest of the lines as new items
                      // FIXME DRYfy the repetition between this code and the one below

                      var collection = _this37.closestCollection;
                      var index = closestItem && closestItem.index || 0;

                      for (var i = 1; i < lines.length; i++) {
                        var closestItem = _this37.closestItem;
                        var next = collection.add(undefined, index + i);
                        collection.editItem(next); // TODO add() should take care of this

                        var copy = _this37.getCousin(i);

                        copy.render(lines[i]);
                      }
                    }
                  });
                }

                $.bind(_this37.editor, "keydown.mavo:edit", function (evt) {
                  if (!_this37.closestCollection.editing || !["Backspace", "Enter"].indexOf(evt.key) === -1) {
                    return;
                  }

                  if (evt.key == "Enter" && (evt.shiftKey || !multiline)) {
                    if (_this37.bottomUp) {
                      return;
                    }

                    var closestItem = _this37.closestItem;

                    var next = _this37.closestCollection.add(undefined, closestItem && closestItem.index + 1);

                    _this37.closestCollection.editItem(next);

                    var copy = _this37.getCousin(1);

                    requestAnimationFrame(function () {
                      copy.edit({
                        immediately: true
                      }).then(function () {
                        return copy.editor.focus();
                      });
                    });

                    if (multiline) {
                      evt.preventDefault();
                    }
                  } else if (evt.key == "Backspace" && (_this37.empty || evt[Mavo.superKey])) {
                    // Focus on sibling afterwards
                    var sibling = _this37.getCousin(1) || _this37.getCousin(-1); // Backspace on empty primitive or Cmd/Ctrl + Backspace should delete item


                    _this37.closestCollection["delete"](_this37.closestItem);

                    if (sibling) {
                      sibling.edit({
                        immediately: true
                      }).then(function () {
                        return sibling.editor.focus();
                      });
                    }

                    evt.preventDefault();
                  }
                });
              }
            });
          });
        }

        if (!wasEditing) {
          // Make element focusable, so it can actually receive focus
          if (this.element.tabIndex === -1) {
            Mavo.revocably.setAttribute(this.element, "tabindex", "0");
          }

          this.element.classList.add("mv-pending-edit"); // Prevent default actions while editing
          // e.g. following links etc

          if (!this.modes) {
            $.bind(this.element, "click.mavo:edit", function (evt) {
              return evt.preventDefault();
            });
          }
        }

        var events = "mousedown focus dragover dragenter".split(" ").map(function (e) {
          return e + ".mavo:preedit";
        }).join(" ");
        $.bind(this.element, events, function (evt) {
          return _this37.preEdit.resolve(evt);
        });

        if (o.immediately) {
          this.preEdit.resolve();
        }

        if (this.config.edit) {
          this.config.edit.call(this);
          this.initEdit = null;
          return this.preEdit.resolve();
        }

        if (!this.afterPreEdit) {
          this.afterPreEdit = this.preEdit.then(function (evt) {
            _this37.sneak(function () {
              // Actual edit
              _this37.element.classList.remove("mv-pending-edit");

              if (_this37.initEdit) {
                _this37.initEdit();
              }

              if (_this37.popup) {
                _this37.popup.prepare();

                _this37.popup.show();
              }

              if (!_this37.attribute && !_this37.popup) {
                if (_this37.editor.parentNode != _this37.element) {
                  _this37.editorValue = _this37.value;

                  if (_this37.config.hasChildren) {
                    _this37.element.textContent = "";
                  } else {
                    _.setText(_this37.element, "");
                  }

                  _this37.element.prepend(_this37.editor);
                } // FIXME Once this is resolved with mousedown, every time we edit, evt is still mousedown regardless
                // so this ends up focusing even when it shouldn't


                if (evt && evt.type == "mousedown" || document.activeElement === _this37.element) {
                  requestAnimationFrame(function () {
                    return _this37.editor.focus();
                  });
                }

                if (!_this37.collection) {
                  Mavo.revocably.restoreAttribute(_this37.element, "tabindex");
                }
              }
            });
          });
        }

        return this.afterPreEdit;
      } // edit

    }, {
      key: "done",
      value: function done() {
        var _this38 = this;

        if (_get(_getPrototypeOf(Primitive.prototype), "done", this).call(this) === false) {
          return false;
        }

        this.afterPreEdit = null;

        if ("preEdit" in this) {
          $.unbind(this.element, ".mavo:preedit .mavo:edit");
        }

        this.sneak(function () {
          if (_this38.config.done) {
            _this38.config.done.call(_this38);

            return;
          }

          if (_this38.popup) {
            _this38.popup.close();
          } else if (!_this38.attribute && _this38.editor) {
            $.remove(_this38.editor);

            _.setValue(_this38.element, _this38.editorValue, {
              config: _this38.config,
              attribute: _this38.attribute,
              datatype: _this38.datatype,
              map: _this38.originalEditor || _this38.editor,
              node: _this38
            });
          }
        });

        if (!this.collection) {
          Mavo.revocably.restoreAttribute(this.element, "tabindex");
        }
      }
    }, {
      key: "dataRender",
      value: function dataRender(data) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            live = _ref5.live,
            root = _ref5.root;

        var previousValue = this._value;

        if ($.type(data) === "object") {
          if (Symbol.toPrimitive in data) {
            data = data[Symbol.toPrimitive]("default");
          } else if (!this.isHelperVariable) {
            // Candidate properties to get a value from
            var properties = Object.keys(data),
                property;

            if (properties.length === 1) {
              property = properties[0];
            } else {
              for (var _i2 = 0, _arr = [this.property, "value", "content"]; _i2 < _arr.length; _i2++) {
                var _p = _arr[_i2];

                if (_p in data) {
                  property = _p;
                  break;
                }
              } // Failing that, any property with the same datatype


              for (var p in data) {
                var type = $.type(data[p]);

                if (type === this.datatype || !this.datatype && type == "string") {
                  property = p;
                  break;
                }
              }
            }

            if (property) {
              data = data[property];

              if (!live) {
                this.inPath.push(property);
              }
            }
          }
        }

        if (data === undefined) {
          // New property has been added to the schema and nobody has saved since
          if (!this.modes && this.value === this.templateValue) {
            this.value = this.closestCollection ? this["default"] : this.templateValue;
          }
        } else {
          this.value = data;
        }

        return this._value !== previousValue;
      }
    }, {
      key: "find",
      value: function find(property) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.property == property && o.exclude !== this) {
          return this;
        }
      }
      /**
       * Get value from the DOM
       */

    }, {
      key: "getValue",
      value: function getValue(o) {
        return _.getValue(this.element, {
          config: this.config,
          attribute: this.attribute,
          datatype: this.datatype
        });
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        var _this39 = this;

        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.sneak(function () {
          if (value === undefined) {
            value = null;
          }

          var oldDatatype = _this39.datatype; // If there's no datatype, adopt that of the value

          if (!_this39.datatype && (typeof value == "number" || typeof value == "boolean")) {
            _this39.datatype = _typeof(value);
          }

          value = _.safeCast(value, _this39.datatype);

          if (!o.force && value === _this39._value && oldDatatype == _this39.datatype) {
            // Do nothing if value didn't actually change, unless forced to
            return value;
          }

          if (_this39.editor && _this39.editorValue != value) {
            // If an editor is present, set its value to match
            _this39.editorValue = value;
          } // Also set DOM value if either using a popup, or there's no editor
          // or the editor is not inside the element (e.g. it could be a nested editor that is now detached)


          if (_this39.popup || !_this39.editor || _this39.editor !== document.activeElement && !_this39.element.contains(_this39.editor)) {
            if (_this39.config.setValue) {
              _this39.config.setValue.call(_this39, _this39.element, value);
            } else if (!o.dataOnly) {
              _.setValue(_this39.element, value, {
                config: _this39.config,
                attribute: _this39.attribute,
                datatype: _this39.datatype,
                map: _this39.originalEditor || _this39.editor,
                node: _this39
              });
            }
          }

          _this39.empty = !value && value !== 0;
          _this39._value = value;

          _this39.liveData.update();

          if (!o.silent) {
            if (_this39.saved) {
              _this39.unsavedChanges = _this39.mavo.unsavedChanges = true;
            }

            _this39.dataChanged("propertychange", {
              value: value
            });
          }
        });
        return value;
      }
    }, {
      key: "dataChanged",
      value: function dataChanged() {
        var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "propertychange";
        var o = arguments.length > 1 ? arguments[1] : undefined;
        return _get(_getPrototypeOf(Primitive.prototype), "dataChanged", this).call(this, action, o);
      }
    }, {
      key: "upload",
      value: function upload(file) {
        var _this40 = this;

        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : file.name;

        if (!this.mavo.uploadBackend || !self.FileReader) {
          return;
        }

        var tempURL = URL.createObjectURL(file); // FIXME what if there's no attribute?

        this.sneak(function () {
          return _this40.element.setAttribute(_this40.attribute, tempURL);
        });
        var path = this.element.getAttribute("mv-uploads") || "";
        var relative = path + "/" + name;
        this.mavo.upload(file, relative).then(function (url) {
          // Do we have a URL override?
          var base = Mavo.getClosestAttribute(_this40.element, "mv-upload-url");

          if (base) {
            // Throw away backend-provided URL and use the override instead
            url = new URL(relative, new URL(base, location)) + "";
          }

          _this40.value = url;

          if (!_this40.element.matches("a")) {
            // <a> should get the proper URL immediately, because hovering would reveal what it is
            // for other types, we should keep the temporary URL because the real one may not have deployed yet
            // If the editor is manually edited, this will change anyway
            _this40.sneak(function () {
              return _this40.element.setAttribute(_this40.attribute, tempURL);
            });
          }
        });
      }
    }, {
      key: "createUploadPopup",
      value: function createUploadPopup(type) {
        var _this41 = this;

        var kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "file";
        var ext = arguments.length > 2 ? arguments[2] : undefined;
        var env = {
          context: this,
          type: type,
          kind: kind,
          ext: ext
        };
        env.mainInput = $.create("input", {
          "type": "url",
          "placeholder": "http://example.com/".concat(kind, ".").concat(ext),
          "className": "mv-output",
          "aria-label": "URL to ".concat(kind)
        });

        if (this.mavo.uploadBackend && self.FileReader) {
          var checkType = function checkType(file) {
            return file && (!type || file.type.indexOf(type.replace("*", "")) === 0);
          };

          env.events = {
            "paste": function paste(evt) {
              var item = evt.clipboardData.items[0];
              var ext = item.type.split("/")[1];

              if (item.kind == "file" && checkType(item)) {
                // Is a file of the correct type, upload!
                var defaultName = "pasted-".concat(kind, "-").concat(Date.now(), ".").concat(ext);
                var name = prompt(_this41.mavo._("filename"), defaultName);

                if (name === "") {
                  name = defaultName;
                }

                if (name !== null) {
                  _this41.upload(item.getAsFile(), name, type);

                  evt.preventDefault();
                }
              }
            },
            "drag dragstart dragend dragover dragenter dragleave drop": function dragDragstartDragendDragoverDragenterDragleaveDrop(evt) {
              evt.preventDefault();
              evt.stopPropagation();
            },
            "dragover dragenter": function dragoverDragenter(evt) {
              env.popup.classList.add("mv-dragover");

              _this41.element.classList.add("mv-dragover");
            },
            "dragleave dragend drop": function dragleaveDragendDrop(evt) {
              env.popup.classList.remove("mv-dragover");

              _this41.element.classList.remove("mv-dragover");
            },
            "drop": function drop(evt) {
              var file = evt.dataTransfer.files[0];

              if (file && checkType(file)) {
                _this41.upload(file);
              }
            }
          };
          Mavo.hooks.run("primitive-createuploadpopup-beforecreate", env);
          env.popup = $.create({
            className: "mv-upload-popup",
            contents: [env.mainInput, {
              tag: "input",
              type: "file",
              "aria-label": "Upload ".concat(kind),
              accept: type,
              events: {
                change: function change(evt) {
                  var file = evt.target.files[0];

                  if (file && checkType(file)) {
                    _this41.upload(file);
                  }
                }
              }
            }, {
              className: "mv-tip",
              innerHTML: "<strong>Tip:</strong> You can also drag & drop or paste!"
            }],
            events: env.events
          }); // Drag & Drop should also work on the <img> element itself

          $.bind(this.element, env.events);
          Mavo.hooks.run("primitive-createuploadpopup-beforereturn", env);
          return env.popup;
        } else {
          return env.mainInput;
        }
      }
    }, {
      key: "editorValue",
      get: function get() {
        var editor = this.editor || this.originalEditor;

        if (editor) {
          if (editor.matches(Mavo.selectors.formControl)) {
            return _.getValue(editor, {
              datatype: this.datatype
            });
          } // if we're here, this.editor is an entire HTML structure


          var output = $(Mavo.selectors.output + ", " + Mavo.selectors.formControl, editor);

          if (output) {
            return _.getValue(output);
          }
        }
      },
      set: function set(value) {
        if (this.config.setEditorValue && this.datatype !== "boolean") {
          return this.config.setEditorValue.call(this, value);
        }

        if (this.editor) {
          if (this.editor.matches(Mavo.selectors.formControl)) {
            _.setValue(this.editor, value, {
              config: this.editorDefaults
            });
          } else {
            // if we're here, this.editor is an entire HTML structure
            var output = $(Mavo.selectors.output + ", " + Mavo.selectors.formControl, this.editor);

            if (output) {
              _.setValue(output, value);
            }
          }
        }
      }
    }], [{
      key: "getText",
      value: function getText(element) {
        var node = element.nodeType === Node.TEXT_NODE ? element : element.firstChild;

        if (node && node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue;
        } else {
          return "";
        }
      }
    }, {
      key: "setText",
      value: function setText(element, text) {
        var node = element.nodeType === Node.TEXT_NODE ? element : element.firstChild;

        if (node && node.nodeType === Node.TEXT_NODE) {
          node.nodeValue = text;
        } else {
          element.prepend(text);
        }
      }
    }, {
      key: "getValueAttribute",
      value: function getValueAttribute(element) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Mavo.Elements.search(element);
        var ret = element.getAttribute("mv-attribute") || config.attribute;

        if (!ret || ret === "null" || ret === "none") {
          ret = null;
        }

        return ret;
      }
      /**
       * Only cast if conversion is lossless
       */

    }, {
      key: "safeCast",
      value: function safeCast(value, datatype) {
        var existingType = _typeof(value);

        var cast = _.cast(value, datatype);

        if (datatype == "boolean") {
          if (!value) {
            return false;
          }

          if (value === "true" || value > 0) {
            return true;
          }

          return value;
        }

        if (datatype == "number") {
          if (/^[-+]?[0-9.e]+$/i.test(value + "")) {
            return cast;
          }

          return value;
        }

        if (value === null || value === undefined) {
          return value;
        }

        return cast;
      }
      /**
       * Cast to a different primitive datatype
       */

    }, {
      key: "cast",
      value: function cast(value, datatype) {
        switch (datatype) {
          case "number":
            return +value;

          case "boolean":
            return !!value;

          case "string":
            return value + "";
        }

        return value;
      }
    }, {
      key: "getValue",
      value: function getValue(element) {
        var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            config = _ref6.config,
            attribute = _ref6.attribute,
            datatype = _ref6.datatype;

        if (!config) {
          config = _.getConfig(element, attribute);
        }

        attribute = config.attribute;
        datatype = config.datatype;

        if (config.getValue && attribute == config.attribute) {
          return config.getValue(element);
        }

        var ret;

        if (attribute in element && _.useProperty(element, attribute)) {
          // Returning properties (if they exist) instead of attributes
          // is needed for dynamic elements such as checkboxes, sliders etc
          ret = element[attribute];
        } else if (attribute) {
          ret = element.getAttribute(attribute);
        } else {
          ret = element.getAttribute("content") || _.getText(element) || null;
        }

        return _.safeCast(ret, datatype);
      }
    }, {
      key: "getConfig",
      value: function getConfig(element, attribute, datatype) {
        if (attribute === undefined) {
          attribute = element.getAttribute("mv-attribute") || undefined;
        }

        if (attribute == "null" || attribute == "none") {
          attribute = null;
        }

        var isAttributeDefault = attribute === undefined || attribute == _.getValueAttribute(element);

        if (!datatype && isAttributeDefault) {
          datatype = element.getAttribute("datatype") || undefined;
        }

        var config = Mavo.Elements.search(element, attribute, datatype);
        config = Object.assign({}, config);

        if (config.attribute === undefined) {
          config.attribute = attribute || null;
        }

        if (config.datatype === undefined) {
          config.datatype = datatype;
        }

        return config;
      }
    }, {
      key: "setValue",
      value: function setValue(element, value) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (element.nodeType === 1) {
          if (!o.config) {
            o.config = _.getConfig(element, o.attribute);
          }

          o.attribute = o.attribute !== undefined ? o.attribute : o.config.attribute;
          o.datatype = o.datatype !== undefined ? o.datatype : o.config.datatype;

          if (o.config.setValue && o.attribute == o.config.attribute) {
            return o.config.setValue(element, value, o.attribute);
          }
        }

        if (value === null && !o.datatype) {
          value = "";
        }

        if (o.attribute) {
          if (o.attribute in element && _.useProperty(element, o.attribute) && element[o.attribute] !== value) {
            // Setting properties (if they exist) instead of attributes
            // is needed for dynamic elements such as checkboxes, sliders etc
            try {
              var previousValue = element[o.attribute];
              var newValue = element[o.attribute] = value;
            } catch (e) {}

            if (previousValue != newValue && o.config.changeEvents) {
              o.config.changeEvents.split(/\s+/).forEach(function (type) {
                return $.fire(element, type);
              });
            }
          } // Set attribute anyway, even if we set a property because when
          // they're not in sync it gets really fucking confusing.


          if (o.datatype == "boolean") {
            if (value != element.hasAttribute(o.attribute)) {
              $.toggleAttribute(element, o.attribute, value, value);
            }
          } else if (element.getAttribute(o.attribute) != value) {
            // intentionally non-strict, e.g. "3." !== 3
            element.setAttribute(o.attribute, value);
          }
        } else {
          var presentational = _.format(value, o);

          if (o.node && !o.config.hasChildren) {
            _.setText(element, presentational);
          } else {
            element.textContent = presentational;
          }

          if (presentational !== value && element.setAttribute) {
            element.setAttribute("content", value);
          }
        }
      }
      /**
       *  Set/get a property or an attribute?
       * @return {Boolean} true to use a property, false to use the attribute
       */

    }, {
      key: "useProperty",
      value: function useProperty(element, attribute) {
        if (["href", "src"].indexOf(attribute) > -1) {
          // URL properties resolve "" as location.href, fucking up emptiness checks
          return false;
        }

        if (element.namespaceURI == "http://www.w3.org/2000/svg") {
          // SVG has a fucked up DOM, do not use these properties
          return false;
        }

        return true;
      }
    }, {
      key: "format",
      value: function format(value) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (o.map && /^select$/i.test(o.map.nodeName)) {
          for (var i = 0, option; option = o.map.options[i]; i++) {
            if (option.value == value) {
              return option.textContent;
            }
          }
        }

        if ($.type(value) === "number" || o.datatype == "number") {
          if (value === null) {
            return "";
          }

          var skipNumberFormatting = o.attribute || o.element && o.element.matches("style, pre");

          if (!skipNumberFormatting) {
            return _.formatNumber(value);
          }
        }

        if (Array.isArray(value)) {
          return value.map(_.format).join(", ");
        }

        if ($.type(value) === "object") {
          // Oops, we have an object. Print something more useful than [object Object]
          return Mavo.toJSON(value);
        }

        return value;
      }
    }]);

    return Primitive;
  }(Mavo.Node);

  $.Class(_, {
    lazy: {
      emptyValue: function emptyValue() {
        switch (this.datatype) {
          case "boolean":
            return false;

          case "number":
            return 0;
        }

        return "";
      },
      editorDefaults: function editorDefaults() {
        return this.editor && _.getConfig(this.editor);
      }
    },
    live: {
      "default": function _default(value) {
        if (this.value == this._default) {
          this.value = value;
        }
      },
      config: function config(_config) {
        if (this._config !== _config) {
          this._config = _config;
          this.updateObserver();
        }
      },
      attribute: function attribute(_attribute) {
        if (this._attribute !== _attribute) {
          this._attribute = _attribute;
          this.updateObserver();
        }
      },
      value: function value(_value3) {
        return this.setValue(_value3);
      },
      datatype: function datatype(value) {
        if (value !== this._datatype) {
          if (value == "boolean" && !this.attribute) {
            this.attribute = Mavo.Elements.defaultConfig["boolean"].attribute;
          }

          $.toggleAttribute(this.element, "datatype", value, value && value !== "string");
        }
      },
      empty: function empty(value) {
        var hide = value && // is empty
        !this.modes && ( // and supports both modes
        !this.attribute || !$(Mavo.selectors.property, this.element)) && ( // and has no property inside
        // and is not boolean OR if it is, its attribute is the default boolean attribute (see #464)
        this.datatype !== "boolean" || this.attribute === Mavo.Elements.defaultConfig["boolean"].attribute);
        this.element.classList.toggle("mv-empty", !!hide);
      }
    },
    "static": {
      all: new WeakMap(),
      lazy: {
        formatNumber: function formatNumber() {
          var numberFormat = new Intl.NumberFormat(Mavo.locale, {
            maximumFractionDigits: 2
          });
          return function (value) {
            if (value === Infinity || value === -Infinity) {
              // Pretty print infinity
              return value < 0 ? "-∞" : "∞";
            }

            return numberFormat.format(value);
          };
        }
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.UI.Popup = $.Class({
    constructor: function constructor(primitive) {
      var _this42 = this;

      this.primitive = primitive; // Need to be defined here so that this is what expected

      this.position = function (evt) {
        var bounds = _this42.primitive.element.getBoundingClientRect();

        var x = bounds.left;
        var y = bounds.bottom;
        var pointDown = false;

        if (_this42.element.offsetHeight) {
          // Is in the DOM, check if it fits
          _this42.height = _this42.element.getBoundingClientRect().height || _this42.height;
        }

        if (_this42.height + y + 20 > innerHeight) {
          // Normal positioning means the popup would be cut off or too close to the edge, adjust
          // Perhaps placing it above is better
          if (bounds.top - _this42.height > 20) {
            var pointDown = true;
            y = bounds.top - _this42.height - 20;
          } else {
            // Nah, just raise it a bit
            y = innerHeight - _this42.height - 20;
          }
        }

        _this42.element.classList.toggle("mv-point-down", pointDown);

        $.style(_this42.element, {
          top: "".concat(y, "px"),
          left: "".concat(x, "px")
        });
      };

      this.element = $.create("div", {
        className: "mv-popup",
        hidden: true,
        contents: {
          tag: "fieldset",
          contents: [{
            tag: "legend",
            textContent: this.primitive.label + ":"
          }, this.editor]
        },
        events: {
          keyup: function keyup(evt) {
            if (evt.keyCode == 13 || evt.keyCode == 27) {
              if (_this42.element.contains(document.activeElement)) {
                _this42.primitive.element.focus();
              }

              evt.stopPropagation();

              _this42.hide();
            }
          },
          transitionend: this.position
        }
      }); // No point in having a dropdown in a popup

      if (this.editor.matches("select")) {
        this.editor.size = Math.min(10, this.editor.children.length);
      }

      this.hideCallback = function (evt) {
        if (!_this42.element.contains(evt.target) && !_this42.primitive.element.contains(evt.target)) {
          _this42.hide();
        }
      };
    },
    show: function show() {
      var _this43 = this;

      $.unbind([this.primitive.element, this.element], ".mavo:showpopup");
      this.shown = true;
      this.element.style.transition = "none";
      this.element.removeAttribute("hidden");
      this.position();
      this.element.setAttribute("hidden", "");
      this.element.style.transition = "";
      document.body.appendChild(this.element);
      setTimeout(function () {
        _this43.element.removeAttribute("hidden");
      }, 100); // trigger transition. rAF or timeouts < 100 don't seem to, oddly.

      $.bind(document, "focus click", this.hideCallback, true);
      window.addEventListener("scroll", this.position, {
        passive: true
      });
    },
    hide: function hide() {
      var _this44 = this;

      $.unbind(document, "focus click", this.hideCallback, true);
      window.removeEventListener("scroll", this.position, {
        passive: true
      });
      this.element.setAttribute("hidden", ""); // trigger transition

      this.shown = false;
      setTimeout(function () {
        $.remove(_this44.element);
      }, parseFloat(getComputedStyle(this.element).transitionDuration) * 1000 || 400); // TODO transition-duration could override this
    },
    prepare: function prepare() {
      var _this45 = this;

      $.bind(this.primitive.element, {
        "click.mavo:edit": function clickMavoEdit(evt) {
          _this45.show();
        },
        "keyup.mavo:edit": function keyupMavoEdit(evt) {
          if ([13, 113].indexOf(evt.keyCode) > -1) {
            // Enter or F2
            _this45.show();

            _this45.editor.focus();
          }
        }
      });
    },
    close: function close() {
      this.hide();
      $.unbind(this.primitive.element, ".mavo:edit .mavo:preedit .mavo:showpopup");
    },
    proxy: {
      "editor": "primitive"
    }
  });
})(Bliss, Bliss.$);
/**
 * Configuration for different types of elements. Options:
 * - attribute {String}
 * - useProperty {Boolean}
 * - datatype {"number"|"boolean"|"string"} Default is "string"
 * - modes
 * - editor {Object|Function}
 * - setEditorValue temporary
 * - edit
 * - done
 * - observe
 * - default: If there is no attribute, can we use that rule to pick one?
 * @
 */


(function ($, $$) {
  var _ = Mavo.Elements = {};

  Object.defineProperties(_, {
    "register": {
      value: function value(id, config) {
        if (_typeof(arguments[0]) === "object") {
          // Multiple definitions
          for (var s in arguments[0]) {
            _.register(s, arguments[0][s]);
          }

          return;
        }

        if (config.extend) {
          var base = _[config.extend];
          config = $.extend($.extend({}, base), config);
        }

        if (id.indexOf("@") > -1) {
          var parts = id.split("@");
          config.selector = config.selector || parts[0] || "*";

          if (config.attribute === undefined) {
            config.attribute = parts[1];
          }
        }

        config.selector = config.selector || id;
        config.id = id;

        if (Array.isArray(config.attribute)) {
          config.attribute.forEach(function (attribute) {
            var o = $.extend({}, config);
            o.attribute = attribute;
            _["".concat(id, "@").concat(attribute)] = o;
          });
        } else {
          _[id] = config;
        }

        return _;
      }
    },
    "search": {
      value: function value(element, attribute, datatype) {
        var matches = _.matches(element, attribute, datatype);

        if (matches.length === 0 && datatype) {
          // 0 matches, try again without datatype
          matches = _.matches(element, attribute);
        }

        var lastMatch = matches[matches.length - 1];

        if (lastMatch) {
          return lastMatch;
        }

        var config = $.extend({}, _.defaultConfig[datatype || "string"]);
        config.attribute = attribute === undefined ? config.attribute : attribute;
        return config;
      }
    },
    "matches": {
      value: function value(element, attribute, datatype) {
        var matches = [];

        selectorloop: for (var id in _) {
          var o = _[id]; // Passes attribute test?

          var attributeMatches = attribute === undefined && o["default"] || attribute === o.attribute;

          if (!attributeMatches) {
            continue;
          } // Passes datatype test?


          if (datatype !== undefined && datatype !== "string" && datatype !== o.datatype) {
            continue;
          } // Passes selector test?


          var selector = o.selector || id;

          if (!element.matches(selector)) {
            continue;
          } // Passes arbitrary test?


          if (o.test && !o.test(element, attribute, datatype)) {
            continue;
          } // All tests have passed


          matches.push(o);
        }

        return matches;
      }
    },
    isSVG: {
      value: function value(e) {
        return e.namespaceURI == "http://www.w3.org/2000/svg";
      }
    },
    defaultConfig: {
      value: {
        "string": {
          editor: {
            tag: "input"
          }
        },
        "number": {
          editor: {
            tag: "input",
            type: "number"
          }
        },
        "boolean": {
          attribute: "content",
          editor: {
            tag: "input",
            type: "checkbox"
          }
        }
      }
    }
  });

  _.register({
    "@hidden": {
      datatype: "boolean"
    },
    "@y": {
      test: _.isSVG,
      datatype: "number"
    },
    "@x": {
      "default": true,
      test: _.isSVG,
      datatype: "number"
    },
    "media": {
      "default": true,
      selector: "img, video, audio",
      attribute: "src",
      editor: function editor() {
        var kind = this.element.nodeName.toLowerCase();
        kind = kind == "img" ? "image" : kind;
        Mavo.setAttributeShy(this.element, "mv-uploads", kind + "s");
        return this.createUploadPopup(kind + "/*", kind, "png");
      }
    },
    "a, link": {
      "default": true,
      attribute: "href"
    },
    "a[mv-uploads], link[mv-uploads]": {
      "default": true,
      attribute: "href",
      editor: function editor() {
        var type = this.element.getAttribute("type");
        var ext = type && !/\/\*$/.test(type) ? type.split("/")[1] : "pdf";
        return this.createUploadPopup(type, undefined, ext);
      }
    },
    "video, audio": {
      attribute: ["autoplay", "buffered", "loop"],
      datatype: "boolean"
    },
    "details": {
      attribute: "open",
      datatype: "boolean"
    },
    "input, select, button, textarea": {
      attribute: "disabled",
      datatype: "boolean"
    },
    "formControl": {
      selector: "input",
      "default": true,
      attribute: "value",
      modes: "edit",
      changeEvents: "input change",
      edit: function edit() {},
      done: function done() {},
      init: function init() {
        this.editor = this.element;
      }
    },
    "select": {
      extend: "formControl",
      selector: "select",
      subtree: true
    },
    "textarea": {
      extend: "formControl",
      selector: "textarea",
      attribute: null,
      getValue: function getValue(element) {
        return element.value;
      },
      setValue: function setValue(element, value) {
        return element.value = value;
      }
    },
    "formNumber": {
      extend: "formControl",
      selector: "input[type=range], input[type=number]",
      datatype: "number",
      setValue: function setValue(element, value) {
        element.value = value;
        element.setAttribute("value", value);
        var attribute = value > element.value ? "max" : "min";

        if (!isNaN(value) && element.value != value && !Mavo.data(element, "boundObserver")) {
          // Value out of bounds, maybe race condition? See #295
          // Observe min/max attrs until user interaction or data change
          var observer = new Mavo.Observer(element, attribute, function (r) {
            element.value = value;
          });
          requestAnimationFrame(function () {
            $.bind(element, "input mv-change", function handler() {
              observer.destroy();
              Mavo.data(element, "boundObserver", undefined);
              $.unbind(element, "input mv-change", handler);
            });
          }); // Prevent creating same observer twice

          Mavo.data(element, "boundObserver", observer);
        }
      }
    },
    "checkbox": {
      extend: "formControl",
      selector: "input[type=checkbox]",
      attribute: "checked",
      datatype: "boolean",
      changeEvents: "click"
    },
    "radio": {
      extend: "formControl",
      selector: "input[type=radio]",
      attribute: "checked",
      modes: "edit",
      getValue: function getValue(element) {
        if (element.form) {
          return element.form[element.name].value;
        }

        var checked = $("input[type=radio][name=\"".concat(element.name, "\"]:checked"));
        return checked && checked.value;
      },
      setValue: function setValue(element, value) {
        if (element.form) {
          element.form[element.name].value = value;
          return;
        }

        var toCheck = $("input[type=radio][name=\"".concat(element.name, "\"][value=\"").concat(value, "\"]"));
        $.properties(toCheck, {
          checked: true
        });
      },
      init: function init(element) {
        var _this46 = this;

        this.mavo.element.addEventListener("change", function (evt) {
          if (evt.target.name == element.name) {
            _this46.value = _this46.getValue();
          }
        });
      }
    },
    "counter": {
      extend: "formControl",
      selector: "button, .counter",
      attribute: "mv-clicked",
      datatype: "number",
      init: function init(element) {
        var _this47 = this;

        if (this.attribute === "mv-clicked") {
          element.setAttribute("mv-clicked", "0");
          element.addEventListener("click", function (evt) {
            var clicked = +element.getAttribute("mv-clicked") || 0;
            _this47.value = ++clicked;
          });
        }
      }
    },
    "meter, progress": {
      "default": true,
      attribute: "value",
      datatype: "number",
      edit: function edit() {
        var _this48 = this;

        var min = +this.element.getAttribute("min") || 0;
        var max = +this.element.getAttribute("max") || 1;
        var range = max - min;
        var step = +this.element.getAttribute("mv-edit-step") || (range > 1 ? 1 : range / 100);
        $.bind(this.element, "mousemove.mavo:edit", function (evt) {
          // Change property as mouse moves
          var left = _this48.element.getBoundingClientRect().left;

          var offset = Math.max(0, (evt.clientX - left) / _this48.element.offsetWidth);
          var newValue = min + range * offset;
          var mod = newValue % step;
          newValue += mod > step / 2 ? step - mod : -mod;
          newValue = Math.max(min, Math.min(newValue, max));

          _this48.sneak(function () {
            return _this48.element.setAttribute("value", newValue);
          });
        });
        $.bind(this.element, "mouseleave.mavo:edit", function (evt) {
          // Return to actual value
          _this48.sneak(function () {
            return _this48.element.setAttribute("value", _this48.value);
          });
        });
        $.bind(this.element, "click.mavo:edit", function (evt) {
          // Register change
          _this48.value = _this48.getValue();
        });
        $.bind(this.element, "keydown.mavo:edit", function (evt) {
          // Edit with arrow keys
          if (evt.target == _this48.element && (evt.keyCode == 37 || evt.keyCode == 39)) {
            var increment = step * (evt.keyCode == 39 ? 1 : -1) * (evt.shiftKey ? 10 : 1);
            var newValue = _this48.value + increment;
            newValue = Math.max(min, Math.min(newValue, max));

            _this48.element.setAttribute("value", newValue);

            evt.preventDefault();
          }
        });
      },
      done: function done() {
        $.unbind(this.element, ".mavo:edit");
      }
    },
    "meta": {
      "default": true,
      attribute: "content"
    },
    "block": {
      "default": true,
      selector: "p, div, dt, dd, h1, h2, h3, h4, h5, h6, article, section, address",
      editor: function editor() {
        var cs = getComputedStyle(this.element);
        var display = cs.display;
        var tag = display.indexOf("inline") === 0 ? "input" : "textarea";
        var editor = $.create(tag);

        if (tag == "textarea") {
          // Actually multiline
          var width = this.element.offsetWidth;

          if (width) {
            editor.width = width;
          } // We cannot collapse whitespace because then users
          // are adding characters they don’t see (#300).


          editor.style.whiteSpace = {
            "normal": "pre-wrap",
            "nowrap": "pre"
          }[cs.whiteSpace] || "inherit";
        }

        return editor;
      },
      setEditorValue: function setEditorValue(value) {
        if (this.datatype && this.datatype != "string") {
          value = value + "";
        }

        var cs = getComputedStyle(this.element);
        value = value || "";

        if (["normal", "nowrap"].indexOf(cs.whiteSpace) > -1) {
          // Collapse lines
          value = value.replace(/\r?\n/g, " ");
        }

        if (["normal", "nowrap", "pre-line"].indexOf(cs.whiteSpace) > -1) {
          // Collapse whitespace
          value = value.replace(/^[ \t]+|[ \t]+$/gm, "").replace(/[ \t]+/g, " ");
        }

        this.editor.value = value;
        return true;
      }
    },
    "time": {
      attribute: "datetime",
      "default": true,
      init: function init() {
        if (!this.fromTemplate("dateType")) {
          var dateFormat = Mavo.DOMExpression.search(this.element, null);
          var datetime = this.element.getAttribute("datetime") || "YYYY-MM-DD";

          for (var type in this.config.dateTypes) {
            if (this.config.dateTypes[type].test(datetime)) {
              break;
            }
          }

          this.dateType = type;

          if (!dateFormat) {
            // TODO what about mv-expressions?
            this.element.textContent = this.config.defaultFormats[this.dateType](this.property);
            this.mavo.expressions.extract(this.element, null);

            if (dateFormat = Mavo.DOMExpression.search(this.element, null)) {
              this.mavo.treeBuilt.then(function () {
                dateFormat.update();
              });
            }
          }
        }
      },
      dateTypes: {
        "month": /^[Y\d]{4}-[M\d]{2}$/i,
        "time": /^[H\d]{2}:[M\d]{2}/i,
        "datetime-local": /^[Y\d]{4}-[M\d]{2}-[D\d]{2} [H\d]{2}:[Mi\d]{2}/i,
        "date": /^[Y\d]{4}-[M\d]{2}-[D\d]{2}$/i
      },
      defaultFormats: {
        "date": function date(name) {
          return "[day(".concat(name, ")] [month(").concat(name, ", 'shortname')] [year(").concat(name, ")]");
        },
        "month": function month(name) {
          return "[month(".concat(name, ", 'name')] [year(").concat(name, ")]");
        },
        "time": function time(name) {
          return "[hour(".concat(name, ", '00')]:[minute(").concat(name, ", '00')]");
        },
        "datetime-local": function datetimeLocal(name) {
          return this.date(name) + " " + this.time(name);
        }
      },
      editor: function editor() {
        return {
          tag: "input",
          type: this.dateType
        };
      }
    },
    "circle@r": {
      "default": true,
      datatype: "number"
    },
    "circle": {
      attribute: ["cx", "cy"],
      datatype: "number"
    },
    "text": {
      "default": true,
      popup: true
    },
    ".mv-toggle": {
      "default": true,
      attribute: "aria-checked",
      datatype: "boolean",
      edit: function edit() {
        var _this49 = this;

        Mavo.revocably.setAttribute(this.element, "role", "checkbox");
        $.bind(this.element, "click.mavo:edit keyup.mavo:edit keydown.mavo:edit", function (evt) {
          if (evt.type == "click" || evt.key == " " || evt.key == "Enter") {
            if (evt.type != "keydown") {
              _this49.value = !_this49.value;
            }

            evt.preventDefault();
            evt.stopPropagation();
          }
        });
      },
      done: function done() {
        Mavo.revocably.restoreAttribute(this.element, "role");
        $.unbind(this.element, ".mavo:edit");
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  Mavo.attributes.push("mv-multiple", "mv-order", "mv-accepts", "mv-initial-items", "mv-like");

  var _ = Mavo.Collection =
  /*#__PURE__*/
  function (_Mavo$Node3) {
    _inherits(Collection, _Mavo$Node3);

    function Collection(element, mavo, o) {
      var _this50;

      _classCallCheck(this, Collection);

      _this50 = _possibleConstructorReturn(this, _getPrototypeOf(Collection).call(this, element, mavo, o));
      /*
       * Create the template, remove it from the DOM and store it
       */

      _this50.templateElement = _this50.element;
      _this50.children = [];
      _this50.liveData = new Mavo.Data(_assertThisInitialized(_this50), []); // Keep position of the template in the DOM, since we might remove it

      _this50.marker = document.createComment("mv-marker");
      Mavo.data(_this50.marker, "collection", _assertThisInitialized(_this50));

      _this50.templateElement.after(_this50.marker);

      _this50.addButton = _this50.createAddButton();

      if (_this50.mavo.root || !_this50.templateElement.hasAttribute("mv-like")) {
        // Synchronous init
        _this50.init();
      } else {
        // Async init, we're borrowing the template from elsewhere so we need
        // to give the rest of the tree a chance to initialize
        _this50.mavo.treeBuilt.then(function () {
          return _this50.init();
        });
      }

      return _this50;
    }

    _createClass(Collection, [{
      key: "createAddButton",
      value: function createAddButton() {
        var _this51 = this;

        // Find add button if provided, or generate one
        var selector = "button.mv-add-".concat(this.property);
        var group = this.parentGroup.element;
        var button = $$(selector, group).filter(function (button) {
          return !_this51.templateElement.contains(button) // is outside the template element
          && !Mavo.data(button, "collection"); // and does not belong to another collection
        })[0];

        if (button) {
          // Custom add button
          if (button.compareDocumentPosition(this.marker) & Node.DOCUMENT_POSITION_FOLLOWING) {
            // Button precedes collection, make collection bottom-up if no mv-order is set
            Mavo.setAttributeShy(this.templateElement, "mv-order", "desc");
          }

          Mavo.revocably.remove(button);
        } else {
          button = $.create("button", {
            type: "button",
            className: "mv-ui",
            textContent: this.mavo._("add-item", this)
          });
        }

        ;
        button.classList.add("mv-add", "mv-add-".concat(this.property));
        Mavo.data(button, "collection", this);
        Mavo.setAttributeShy(button, "mv-action", "add(".concat(this.property, ")"));
        return button;
      }
    }, {
      key: "init",
      value: function init() {
        var _this52 = this;

        if (!this.fromTemplate("templateElement", "accepts", "initialItems", "like", "likeNode")) {
          this.like = this.templateElement.getAttribute("mv-like");

          if (this.like) {
            var candidates = [];
            this.mavo.walk(function (obj) {
              if (obj instanceof _ && obj.property === _this52.like && obj !== _this52) {
                candidates.push(obj);
              }
            });

            if (candidates.length > 0) {
              // If there are multiple collections that match,
              // compare the paths and select the one that has the most overlap
              this.likeNode = candidates.sort(function (a, b) {
                return a.pathFrom(_this52).length - b.pathFrom(_this52).length;
              })[0];
              this.likeNode = this.likeNode.likeNode || this.likeNode;
              this.likeNode = this.likeNode.template || this.likeNode;
            } else {
              this.like = null;
            }
          }

          this.accepts = this.templateElement.getAttribute("mv-accepts");
          this.accepts = new Set(this.accepts && this.accepts.split(/\s+/) || []);
          this.initialItems = +(this.templateElement.getAttribute("mv-initial-items") || (this.like ? 0 : 1)); // Must clone because otherwise once expressions are parsed on the template element
          // we will not be able to pick them up from subsequent items

          this.templateElement = this.templateElement.cloneNode(true);
        }

        if (this.likeNode) {
          this.itemTemplate = this.likeNode.itemTemplate || this.likeNode;
          var templateElement = this.likeNode.templateElement || $.value(this.likeNode.collection, "templateElement") || this.likeNode.element;
          this.templateElement = templateElement.cloneNode(true);
          this.templateElement.setAttribute("property", this.property);

          if (!this.accepts.size) {
            this.accepts = this.likeNode.accepts || this.accepts;
          }
        } else if (this.initialItems > 0 || !this.template) {
          var item = this.createItem(this.element);
          this.add(item, undefined, {
            silent: true
          });
        }

        this.mavo.treeBuilt.then(function () {
          if (!_this52.initialItems) {
            if (item) {
              _this52["delete"](item, {
                silent: true
              });
            } else {
              // No item to delete
              _this52.element.remove();
            }
          } else if (_this52.initialItems > 1) {
            // Add extra items
            for (var i = 1; i < _this52.initialItems; i++) {
              _this52.add();
            }
          }
        });
        this.postInit();
        Mavo.hooks.run("collection-init-end", this);
      }
    }, {
      key: "getData",
      value: function getData() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var env = {
          context: this,
          options: o
        };
        env.data = this.children.map(function (item) {
          return item.getData(env.options);
        }).filter(function (itemData) {
          return Mavo.value(itemData) !== null;
        });
        env.data = Mavo.subset(this.data, this.inPath, env.data);
        Mavo.hooks.run("node-getdata-end", env);
        return env.data;
      } // Create item but don't insert it anywhere
      // Mostly used internally

    }, {
      key: "createItem",
      value: function createItem(element) {
        if (!element) {
          element = this.templateElement.cloneNode(true);
        }

        var template = this.itemTemplate || (this.template ? this.template.itemTemplate : null);
        var item = Mavo.Node.create(element, this.mavo, {
          collection: this,
          template: template,
          property: this.property,
          type: this.type
        });

        if (!this.itemTemplate) {
          this.itemTemplate = template || item;
        }

        return item;
      }
      /**
       * Add a new item to this collection
       * @param item {Node|Mavo.Node} Optional. Element or Mavo object for the new item
       * @param index {Number} Optional. Index of existing item, will be added opposite to list direction
       * @param silent {Boolean} Optional. Throw a datachange event? Mainly used internally.
       */

    }, {
      key: "add",
      value: function add(item, index) {
        var _this53 = this;

        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (item instanceof Node) {
          item = Mavo.Node.get(item) || this.createItem(item);
        } else {
          item = item || this.createItem();
        }

        if (item.collection != this) {
          this.adopt(item);
        }

        if (index === undefined) {
          index = this.bottomUp ? 0 : this.length;
        } // Add it to the DOM, or fix its place


        var rel = this.children[index] ? this.children[index].element : this.marker;
        $.before(item.element, rel);
        var env = {
          context: this,
          item: item
        };
        env.previousIndex = item.index; // Update internal data model

        env.changed = this.splice({
          remove: env.item
        }, {
          index: index,
          add: env.item
        });

        if (this.mavo.expressions.active && !o.silent) {
          requestAnimationFrame(function () {
            env.changed.forEach(function (i) {
              i.dataChanged(i == env.item && env.previousIndex === undefined ? "add" : "move");
              i.unsavedChanges = true;
            });
            _this53.unsavedChanges = _this53.mavo.unsavedChanges = true;

            _this53.mavo.expressions.update(env.item);
          });
        }

        Mavo.hooks.run("collection-add-end", env);
        return env.item;
      }
    }, {
      key: "splice",
      value: function splice() {
        var _this54 = this;

        for (var _len4 = arguments.length, actions = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          actions[_key4] = arguments[_key4];
        }

        actions.forEach(function (action) {
          if (action.index === undefined && action.remove && isNaN(action.remove)) {
            // Remove is an item
            action.index = _this54.children.indexOf(action.remove);
            action.remove = 1;
          }
        }); // Sort in reverse index order

        actions.sort(function (a, b) {
          return b.index - a.index;
        });
        var changed = [],
            deleted = []; // FIXME this could still result in buggy behavior.
        // Think of e.g. adding items on i, then removing > 1 items on i-1.
        // The new items would get removed instead of the old ones.
        // Not a pressing issue though since we always remove 1 max when adding things too.

        actions.forEach(function (action) {
          if (action.index > -1 && (action.remove || action.add)) {
            var _deleted, _this54$children;

            action.remove = action.remove || 0;
            action.add = Mavo.toArray(action.add);

            (_deleted = deleted).push.apply(_deleted, _toConsumableArray((_this54$children = _this54.children).splice.apply(_this54$children, [action.index, +action.remove].concat(_toConsumableArray(action.add)))));
          }
        });
        deleted = new Set(deleted); // Update indices

        for (var i = 0; i < this.length; i++) {
          var item = this.children[i];
          deleted["delete"](item);

          if (item && item.index !== i) {
            item.index = i;
            changed.push(item);
          }
        } // Unregister expressions for deleted items


        deleted.forEach(function (item) {
          if (item.expressions) {
            item.expressions.forEach(function (domexpression) {
              item.mavo.expressions.unregister(domexpression);
            });
          }
        });
        this.liveData.update();
        return changed;
      } // Move item to this collection from another collection

    }, {
      key: "adopt",
      value: function adopt(item) {
        var _this55 = this;

        if (item.collection) {
          // It belongs to another collection, delete from there first
          item.collection.splice({
            remove: item
          });
          item.collection.dataChanged("delete");
        }

        item.collection = this; // Update collection & closestCollection properties

        this.walk(function (obj) {
          if (obj.closestCollection === item.collection) {
            obj.closestCollection = _this55;
          } // Belongs to another Mavo?


          if (item.mavo != _this55.mavo) {
            obj.mavo = _this55.mavo;
          }

          obj.path = obj.getPath();
        }); // Adjust templates and their copies

        if (item.template) {
          Mavo["delete"](item.template.copies, item);
          item.template = this.itemTemplate;
        }
      }
    }, {
      key: "delete",
      value: function _delete(item) {
        var _this56 = this;

        var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            silent = _ref7.silent,
            _ref7$undoable = _ref7.undoable,
            undoable = _ref7$undoable === void 0 ? !silent : _ref7$undoable,
            _ref7$transition = _ref7.transition,
            transition = _ref7$transition === void 0 ? !silent : _ref7$transition,
            _ref7$destroy = _ref7.destroy,
            destroy = _ref7$destroy === void 0 ? !undoable : _ref7$destroy;

        item.element.classList.remove("mv-highlight");
        this.splice({
          remove: item
        });

        if (!silent && transition) {
          var stage2 = $.transition(item.element, {
            opacity: 0
          }).then(function () {
            item.element.style.opacity = "";
          });
        } else {
          var stage2 = Promise.resolve();
        }

        return stage2.then(function () {
          $.remove(item.element);

          if (!silent) {
            _this56.unsavedChanges = item.unsavedChanges = _this56.mavo.unsavedChanges = true;
            item.collection.dataChanged("delete", {
              index: item.index
            });
          }

          if (undoable) {
            _this56.mavo.setDeleted(item);
          } else if (destroy) {
            item.destroy();
          }

          return item;
        });
      }
      /**
       * Move existing item to a new position. Wraps around if position is out of bounds.
       * @offset relative position
       */

    }, {
      key: "move",
      value: function move(item, offset) {
        var index = item.index + offset + (offset > 0);
        index = Mavo.wrap(index, this.children.length + 1);
        this.add(item, index);
      }
    }, {
      key: "editItem",
      value: function editItem(item) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var when = o.immediately ? Promise.resolve() : Mavo.inView.when(item.element);
        return when.then(function () {
          if (!item.itembar) {
            item.itembar = new Mavo.UI.Itembar(item);
          }

          item.itembar.add();
          return item.edit(o);
        });
      }
    }, {
      key: "edit",
      value: function edit() {
        var _this57 = this;

        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (_get(_getPrototypeOf(Collection.prototype), "edit", this).call(this) === false) {
          return false;
        } // Insert the add button if it's not already in the DOM


        if (!this.addButton.parentNode) {
          var tag = this.element.tagName.toLowerCase();

          if (tag in Mavo.selectors.container) {
            var rel = this.marker.parentNode.closest(Mavo.selectors.container[tag]);
          } else if (this.bottomUp && this.children[0]) {
            var rel = this.children[0].element;
          }

          rel = rel || this.marker;
          Mavo.revocably.add(this.addButton, function (e) {
            return $[_this57.bottomUp ? "before" : "after"](e, rel);
          });
        } // Set up drag & drop


        _.dragula.then(function () {
          _this57.getDragula();
        }); // Edit items, maybe insert item bar


        return Promise.all(this.children.map(function (item) {
          return _this57.editItem(item, o);
        }));
      }
    }, {
      key: "done",
      value: function done() {
        if (_get(_getPrototypeOf(Collection.prototype), "done", this).call(this) === false) {
          return false;
        }

        Mavo.revocably.remove(this.addButton);
        this.propagate(function (item) {
          if (item.itembar) {
            item.itembar.remove();
          }
        });
      }
    }, {
      key: "dataChanged",
      value: function dataChanged(action) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        o.element = o.element || this.marker;
        return _get(_getPrototypeOf(Collection.prototype), "dataChanged", this).call(this, action, o);
      }
    }, {
      key: "dataRender",
      value: function dataRender(data) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (data === undefined) {
          return;
        }

        data = data === null ? [] : Mavo.toArray(data).filter(function (i) {
          return i !== null;
        });
        var changed = false; // First render on existing items

        for (var i = 0; i < this.children.length; i++) {
          var item = this.children[i];

          if (i < data.length) {
            changed = item.render(data[i], o) || changed;
          } else {
            changed = true;
            this["delete"](item, {
              silent: true
            });
            i--;
          }
        }

        if (data.length > i) {
          // There are still remaining items
          // Using document fragments improves performance by 60%
          var fragment = document.createDocumentFragment();

          for (var j = i; j < data.length; j++) {
            var item = this.createItem();
            changed = item.render(data[j], o) || changed;
            this.children.push(item);
            item.index = j;
            fragment.appendChild(item.element);
            var env = {
              context: this,
              item: item
            };
            Mavo.hooks.run("collection-add-end", env);
          }

          this.marker.before(fragment);
        }

        this.liveData.update();

        if (data.length > i) {
          for (var j = i; j < this.children.length; j++) {
            this.children[j].dataChanged("add");
          }
        }

        return changed;
      }
    }, {
      key: "isCompatible",
      value: function isCompatible(c) {
        return c && this.itemTemplate.constructor == c.itemTemplate.constructor && (c === this || c.template == this || this.template == c || this.template && this.template == c.template || this.accepts.has(c.property) > -1);
      } // Make sure to remove reference to .dragula
      // it seems to cause problem on OS chrome.

    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(Collection.prototype), "destroy", this).call(this);

        if (this.dragula) {
          this.dragula.destroy();
          this.dragula = null;
        }

        this.propagate("destroy");
      } // Make sure to only call after dragula has loaded

    }, {
      key: "getDragula",
      value: function getDragula() {
        var _this58 = this;

        if (this.dragula) {
          return this.dragula;
        }

        if (this.template) {
          Mavo.pushUnique(this.template.getDragula().containers, this.marker.parentNode);
          return this.dragula = this.template.dragula || this.template.getDragula();
        }

        var me = this;
        this.dragula = dragula({
          containers: [this.marker.parentNode],
          isContainer: function isContainer(el) {
            if (_this58.accepts.size) {
              return Array.from(el.childNodes).some(function (child) {
                var collection = _.get(child); // Map children to any associated collections


                return collection && _this58.accepts.has(collection.property);
              });
            }

            return false;
          },
          moves: function moves(el, container, handle) {
            return handle.classList.contains("mv-drag-handle") && handle.closest(Mavo.selectors.multiple) == el;
          },
          accepts: function accepts(el, target, source, next) {
            if (el.contains(target)) {
              return false;
            }

            var previous = next ? next.previousElementSibling : target.lastElementChild;

            var collection = _.get(previous) || _.get(next);

            if (!collection) {
              return false;
            }

            var item = Mavo.Node.get(el);
            return item && item.collection.isCompatible(collection);
          }
        });
        this.dragula.on("drop", function (el, target, source) {
          var item = Mavo.Node.get(el);
          var oldIndex = item && item.index;
          var next = el.nextElementSibling;
          var previous = el.previousElementSibling;

          var collection = _.get(previous) || _.get(next);

          var closestItem = Mavo.Node.get(previous) || Mavo.Node.get(next);

          if (closestItem && closestItem.collection != collection) {
            closestItem = null;
          }

          if (item.collection.isCompatible(collection)) {
            var index = closestItem ? closestItem.index + (closestItem.element === previous) : collection.length;
            collection.add(item, index);
          } else {
            return _this58.dragula.cancel(true);
          }
        });

        _.dragulas.push(this.dragula);

        return this.dragula;
      }
    }, {
      key: "getClosestCollection",
      value: function getClosestCollection() {
        return this;
      }
    }, {
      key: "length",
      get: function get() {
        return this.children.length;
      }
    }], [{
      key: "get",
      value: function get(element) {
        // Is it an add button or a marker?
        var collection = Mavo.data(element, "collection");

        if (collection) {
          return collection;
        } // Maybe it's a collection item?


        var item = Mavo.Node.get(element);
        return item && item.collection || null;
      } // Delete multiple items from potentially multiple collections or even multiple mavos

    }, {
      key: "delete",
      value: function _delete(nodes) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var deleted = new Mavo.BucketMap({
          arrays: true
        }); // Mavos and deleted items

        var collections = new Set(); // Collections items were deleted from

        var options = {
          silent: true,
          undoable: false,
          destroy: false
        };
        var promises = nodes.filter(function (node) {
          return !!node.collection;
        }) // Drop nodes that are not collection items
        .map(function (node) {
          collections.add(node.collection);
          return node.collection["delete"](node, options).then(function (node) {
            return deleted.set(node.mavo, node);
          });
        });

        if (!o.silent) {
          Promise.all(promises).then(function () {
            collections.forEach(function (collection) {
              collection.dataChanged("delete");
            });

            if (o.undoable !== false) {
              deleted.forEach(function (nodes, mavo) {
                mavo.setDeleted.apply(mavo, _toConsumableArray(nodes));
              });
            }
          });
        }
      }
    }]);

    return Collection;
  }(Mavo.Node);

  $.Class(_, {
    lazy: {
      bottomUp: function bottomUp() {
        /**
         * Add new items at the top or bottom?
         */
        return /^desc\b/i.test(this.templateElement.getAttribute("mv-order"));
      }
    },
    "static": {
      dragulas: [],
      lazy: {
        dragula: function dragula() {
          return $.include(self.dragula, "https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.js");
        }
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.ImplicitCollection =
  /*#__PURE__*/
  function (_Mavo$Node4) {
    _inherits(ImplicitCollection, _Mavo$Node4);

    function ImplicitCollection(element, mavo, o) {
      var _this59;

      _classCallCheck(this, ImplicitCollection);

      _this59 = _possibleConstructorReturn(this, _getPrototypeOf(ImplicitCollection).call(this, element, mavo, o));
      _this59.children = [];
      _this59.liveData = new Mavo.Data(_assertThisInitialized(_this59), []);

      _this59.add(element);

      _this59.postInit();

      Mavo.hooks.run("implicit-collection-init-end", _assertThisInitialized(_this59));
      return _this59;
    }

    _createClass(ImplicitCollection, [{
      key: "getData",
      value: function getData() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var env = {
          context: this,
          options: o,
          data: []
        };
        this.children.forEach(function (node) {
          if (!node.isDataNull()) {
            env.data.push(node.getData(o));
          }
        });

        if (this.data) {
          // Maybe rendered data had more items than we could show? Add it back.
          var rendered = Mavo.toArray(Mavo.subset(this.data, this.inPath));

          if (rendered.length > env.data.length) {
            env.data = env.data.concat(rendered.slice(env.data.length));
          }
        }

        if (Array.isArray(env.data) && env.data.length <= 1) {
          env.data = env.data.length === 1 ? env.data[0] : null;
        }

        env.data = Mavo.subset(this.data, this.inPath, env.data);
        Mavo.hooks.run("node-getdata-end", env);
        return env.data;
      }
      /**
       * Add a new item to this collection
       * @param item Element or Mavo object for the new item
       */

    }, {
      key: "add",
      value: function add(element) {
        var item = Mavo.Node.create(element, this.mavo, {
          collection: this,
          template: this.template && this.template.children[this.length] || null,
          property: this.property,
          type: this.type
        });
        item.index = this.length;
        this.children.push(item); // item may have tried to propagate updates to us when we created it,
        // but that wouldn't have worked since item was not yet in
        // this.children, so we need to update manually.

        this.liveData.update();
        return item;
      }
    }, {
      key: "edit",
      value: function edit() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (_get(_getPrototypeOf(ImplicitCollection.prototype), "edit", this).call(this) === false) {
          return false;
        } // Edit items


        return Promise.all(this.children.map(function (item) {
          return item.edit(o);
        }));
      }
    }, {
      key: "dataRender",
      value: function dataRender(data) {
        var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (data !== undefined) {
          data = data === null ? [] : Mavo.toArray(data).filter(function (i) {
            return i !== null;
          });
          var changed = data.length !== this.liveData.length;
          this.children.forEach(function (item, i) {
            return changed = item.render(data && data[i], o) || changed;
          });
        }

        this.liveData.update();
      }
    }, {
      key: "length",
      get: function get() {
        return this.children.length;
      }
    }]);

    return ImplicitCollection;
  }(Mavo.Node);
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.UI.Itembar = $.Class({
    constructor: function constructor(item) {
      var _this60 = this;

      this.item = item;
      this.element = $$(".mv-item-bar:not([mv-rel]), .mv-item-bar[mv-rel=\"".concat(this.item.property, "\"]"), this.item.element).filter(function (el) {
        // Ignore item controls meant for other collections
        return el.closest(Mavo.selectors.multiple) == _this60.item.element && !Mavo.data(el, "item");
      })[0];

      if (!this.element && this.item.template && this.item.template.itembar) {
        // We can clone the buttons from the template
        this.element = this.item.template.itembar.element.cloneNode(true);
        this.dragHandle = $(".mv-drag-handle", this.element) || this.item.element;
      } else {
        // First item of this type
        this.element = this.element || $.create({
          className: "mv-item-bar mv-ui"
        });
        var bottomUp = this.collection.bottomUp;
        var args = "$item".concat(bottomUp ? ", $index + 1" : "");
        var buttons = [{
          tag: "button",
          type: "button",
          title: this.mavo._("delete-item", this.item),
          className: "mv-delete",
          // Why $item and not this.collection.property?
          // If there's a nested property with the same name, the name will refer to that
          // However, this means that if we place the item bar inside another item, the button will not work anymore
          // It's a tradeoff, and perhaps if it proves to be a problem we can start detecting which one is best
          "mv-action": "delete($item)"
        }, {
          tag: "button",
          type: "button",
          title: this.mavo._("add-item-".concat(bottomUp ? "after" : "before"), this.item),
          className: "mv-add",
          "mv-action": "if($cmd, add($item, ".concat(args, "), add(").concat(args, "))")
        }];

        if (this.item instanceof Mavo.Group) {
          this.dragHandle = $.create({
            tag: "button",
            type: "button",
            title: this.mavo._("drag-to-reorder", this.item),
            className: "mv-drag-handle"
          });
          buttons.push(this.dragHandle);
        } else {
          this.dragHandle = this.item.element;
        }

        $.set(this.element, {
          "mv-rel": this.item.property,
          contents: buttons
        });
      }

      this.element.setAttribute("hidden", "");
      $.bind([this.item.element, this.element], "focusin mouseover", this);
      $.bind(this.element, {
        mouseenter: function mouseenter(evt) {
          _this60.item.element.classList.add("mv-highlight");
        },
        mouseleave: function mouseleave(evt) {
          _this60.item.element.classList.remove("mv-highlight");
        }
      });
      this.dragHandle.addEventListener("keydown", function (evt) {
        if (evt.target === _this60.dragHandle && _this60.item.editing && evt.keyCode >= 37 && evt.keyCode <= 40) {
          // Arrow keys
          _this60.collection.move(_this60.item, evt.keyCode <= 38 ? -1 : 1);

          evt.stopPropagation();
          evt.preventDefault();
          evt.target.focus();
        }
      });

      if (this.dragHandle !== this.item.element) {
        this.dragHandle.addEventListener("click", function (evt) {
          return evt.target.focus();
        });
      }

      Mavo.data(this.element, "item", this.item);
    },
    destroy: function destroy() {
      this.hide();
    },
    show: function show(sticky) {
      var _this61 = this;

      _.visible.forEach(function (instance) {
        if (instance != _this61 && (!_this61.sticky || instance.sticky)) {
          clearTimeout(instance.hideTimeout);
          instance.hide(sticky, _.DELAY);
        }
      });

      _.visible.add(this);

      if (this.element.hasAttribute("hidden") || sticky && !this.sticky) {
        this.element.removeAttribute("hidden");
        this.sticky = this.sticky || sticky;
        $.bind([this.item.element, this.element], "focusout mouseleave", this);
      }
    },
    hide: function hide(sticky) {
      var _this62 = this;

      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!this.sticky || sticky) {
        if (timeout) {
          this.hideTimeout = setTimeout(function () {
            return _this62.hide(sticky);
          }, timeout);
        } else {
          this.element.setAttribute("hidden", "");
          $.unbind([this.item.element, this.element], "focusout mouseleave", this);
          this.sticky = false;

          _.visible["delete"](this);
        }
      }
    },
    handleEvent: function handleEvent(evt) {
      var sticky = evt.type.indexOf("mouse") === -1;

      if (this.isWithinItem(evt.target)) {
        clearTimeout(this.hideTimeout);

        if (["mouseleave", "focusout", "blur"].indexOf(evt.type) > -1) {
          if (!this.isWithinItem(evt.relatedTarget)) {
            this.hide(sticky, _.DELAY);
          }
        } else {
          this.show(sticky);
          evt.stopPropagation();
        }
      }
    },
    isWithinItem: function isWithinItem(element) {
      if (!element) {
        return false;
      }

      var itemBar = element.closest(".mv-item-bar");
      return itemBar ? itemBar === this.element : element.closest(Mavo.selectors.item) === this.item.element;
    },
    add: function add() {
      if (!this.element.parentNode && !Mavo.revocably.add(this.element)) {
        // Has not been added before
        var tag = this.item.element.nodeName.toLowerCase();

        if (tag in _.container) {
          var rel = $(_.container[tag], this.item.element);
        }

        (rel || this.item.element).appendChild(this.element);
      }

      if (this.dragHandle == this.item.element) {
        this.item.element.classList.add("mv-drag-handle");
      }
    },
    remove: function remove() {
      Mavo.revocably.remove(this.element);

      if (this.dragHandle == this.item.element) {
        this.item.element.classList.remove("mv-drag-handle");
      }
    },
    live: {
      sticky: function sticky(v) {
        this.element.classList.toggle("mv-sticky", v);
      }
    },
    proxy: {
      collection: "item",
      mavo: "item"
    },
    "static": {
      DELAY: 100,
      visible: new Set(),
      container: {
        "details": "summary"
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Expression = $.Class({
    constructor: function constructor(expression) {
      this.expression = expression;
    },
    eval: function _eval() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Mavo.Data.stub;
      var o = arguments.length > 1 ? arguments[1] : undefined;
      Mavo.hooks.run("expression-eval-beforeeval", this);

      if (!this["function"]) {
        try {
          this["function"] = Mavo.Script.compile(this.expression, o);
        } catch (error) {
          // Compilation error
          this.error("There is something wrong with the expression ".concat(this.expression), error.message, "Not an expression? See https://mavo.io/docs/expressions/#disabling-expressions for information on how to disable expressions.");
          Mavo.hooks.run("expression-compile-error", {
            context: this,
            error: error
          });
          return this["function"] = error;
        }
      } else if (this["function"] instanceof Error) {
        // Previous compilation error
        return this["function"];
      }

      try {
        return this["function"](data);
      } catch (error) {
        // Runtime error
        this.error("Something went wrong with the expression ".concat(this.expression), error.message, "Data was: ".concat(JSON.stringify(data)));
        Mavo.hooks.run("expression-eval-error", {
          context: this,
          error: error
        });
        return error;
      }
    },
    error: function error(title) {
      for (var _len5 = arguments.length, message = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        message[_key5 - 1] = arguments[_key5];
      }

      message = message.join("\n");
      console.info("%cOops! \uD83D\uDE33 ".concat(title, ":"), "color: #c04; font-weight: bold;", message);
    },
    toString: function toString() {
      return this.expression;
    },
    changedBy: function changedBy(evt) {
      return _.changedBy(this.identifiers, evt);
    },
    live: {
      expression: function expression(value) {
        this["function"] = null;
        this.identifiers = value.match(/[$a-z][$\w]*/ig) || [];
      }
    }
  });

  _.Syntax = $.Class({
    constructor: function constructor(start, end) {
      this.start = start;
      this.end = end; // Try to parse anything between start and end as an expression. Note
      // that this parses text that we don't want to treat as expressions,
      // including the empty expression, but we want to parse them out anyway
      // and only later decide not to evaluate them as expressions so that we
      // don't parse, say, [][1] as a single expression containing "][1".
      // Regex note: "[\S\s]" matches all characters, unlike ".", which
      // doesn't match newlines.

      this.regex = RegExp("".concat(Mavo.escapeRegExp(start), "([\\S\\s]*?)").concat(Mavo.escapeRegExp(end)), "gi");
    },
    test: function test(str) {
      this.regex.lastIndex = 0;
      return this.regex.test(str);
    },
    tokenize: function tokenize(str) {
      var match,
          ret = [],
          lastIndex = 0;
      this.regex.lastIndex = 0;

      while ((match = this.regex.exec(str)) !== null) {
        // Literal before the expression
        if (match.index > lastIndex) {
          ret.push(str.substring(lastIndex, match.index));
        }

        lastIndex = this.regex.lastIndex;

        if (/\S/.test(match[1])) {
          ret.push(new Mavo.Expression(match[1]));
        } else {
          // If the matched expression is empty or consists only of
          // whitespace, don't treat it as an expression.
          ret.push(match[0]);
        }
      } // Literal at the end


      if (lastIndex < str.length) {
        ret.push(str.substring(lastIndex));
      }

      return ret;
    },
    "static": {
      create: function create(element) {
        if (element) {
          var syntax = element.getAttribute("mv-expressions");

          if (syntax) {
            syntax = syntax.trim();
            return /\s/.test(syntax) ? _construct(_.Syntax, _toConsumableArray(syntax.split(/\s+/))) : _.Syntax.ESCAPE;
          }
        }
      },
      ESCAPE: -1
    }
  });
  _.Syntax["default"] = new _.Syntax("[", "]");
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.DOMExpression = $.Class({
    constructor: function constructor() {
      var _this63 = this;

      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.mavo = o.mavo;
      this.template = o.template && o.template.template || o.template;

      for (var _i3 = 0, _arr2 = ["item", "path", "syntax", "fallback", "attribute", "originalAttribute", "expression", "parsed", "identifiers"]; _i3 < _arr2.length; _i3++) {
        var prop = _arr2[_i3];
        this[prop] = o[prop] === undefined && this.template ? this.template[prop] : o[prop];
      }

      this.node = o.node;

      if (!this.node) {
        // No node provided, figure it out from path
        this.node = Mavo.elementPath(this.item.element, this.path);
      }

      this.element = this.node;
      this.attribute = this.attribute || null;
      Mavo.hooks.run("domexpression-init-start", this);

      if (this.attribute == "mv-value") {
        this.originalAttribute = "mv-value";
        this.attribute = Mavo.Primitive.getValueAttribute(this.element);
        this.fallback = this.fallback || Mavo.Primitive.getValue(this.element, {
          attribute: this.attribute
        });
        var expression = this.element.getAttribute("mv-value");
        this.element.removeAttribute("mv-value");
        this.parsed = [new Mavo.Expression(expression)];
        this.expression = this.syntax.start + expression + this.syntax.end;
      }

      if (this.node.nodeType === 3 && this.element === this.node) {
        this.element = this.node.parentNode; // If no element siblings make this.node the element, which is more robust
        // Same if attribute, there are no attributes on a text node!

        if (!this.node.parentNode.children.length || this.attribute) {
          this.node = this.element;
          this.element.normalize();
        }
      }

      if (!this.expression) {
        // Still unhandled?
        if (this.attribute) {
          // Some web components (e.g. AFrame) hijack getAttribute()
          var value = Element.prototype.getAttribute.call(this.node, this.attribute);
          this.expression = (value || "").trim();
        } else {
          // Move whitespace outside to prevent it from messing with types
          this.node.normalize();

          if (this.node.firstChild && this.node.childNodes.length === 1 && this.node.firstChild.nodeType === 3) {
            var whitespace = this.node.firstChild.textContent.match(/^\s*|\s*$/g);

            if (whitespace[1]) {
              this.node.firstChild.splitText(this.node.firstChild.textContent.length - whitespace[1].length);
              this.node.after(this.node.lastChild);
            }

            if (whitespace[0]) {
              this.node.firstChild.splitText(whitespace[0].length);
              this.node.parentNode.insertBefore(this.node.firstChild, this.node);
            }
          }

          this.expression = this.node.textContent;
        }

        this.parsed = this.template ? this.template.parsed : this.syntax.tokenize(this.expression);
      }

      this.oldValue = this.value = this.parsed.map(function (x) {
        return x instanceof Mavo.Expression ? x.expression : x;
      }); // Cache identifiers

      this.identifiers = this.identifiers || Mavo.flatten(this.parsed.map(function (x) {
        return x.identifiers || [];
      })); // Any identifiers that need additional updating?

      _.special.add(this);

      this.mavo.treeBuilt.then(function () {
        if (!_this63.template && !_this63.item) {
          // Only collection items and groups can have their own expressions arrays
          _this63.item = Mavo.Node.getClosestItem(_this63.element);
        }

        if (_this63.originalAttribute == "mv-value" && _this63.mavoNode && _this63.mavoNode == _this63.item.collection) {
          Mavo["delete"](_this63.item.expressions, _this63);
        }

        _this63.mavo.expressions.register(_this63);

        Mavo.hooks.run("domexpression-init-treebuilt", _this63);
      });
      Mavo.hooks.run("domexpression-init-end", this);

      _.elements.set(this.element, [].concat(_toConsumableArray(_.elements.get(this.element) || []), [this]));
    },
    destroy: function destroy() {
      _.special["delete"](this);

      this.mavo.expressions.unregister(this);
    },

    get isDynamicObject() {
      return this.originalAttribute == "mv-value" && this.mavoNode && !(this.mavoNode instanceof Mavo.Primitive);
    },

    changedBy: function changedBy(evt) {
      if (this.isDynamicObject) {
        // Just prevent the same node from triggering changes, everything else is game
        return !evt || !this.mavoNode.contains(evt.node);
      }

      return Mavo.Expression.changedBy(this.identifiers, evt);
    },
    update: function update() {
      var _this64 = this;

      var env = {
        context: this
      };
      var parentEnv = env;

      if (this.item) {
        var scope = this.isDynamicObject ? this.item.parent : this.item;
        var data = this.data = scope.getLiveData();
      } else {
        var data = this.data === undefined ? Mavo.Data.stub : this.data;
      }

      Mavo.hooks.run("domexpression-update-start", env);
      this.oldValue = this.value;
      var changed = false;
      env.value = this.value = this.parsed.map(function (expr, i) {
        if (expr instanceof Mavo.Expression) {
          var env = {
            context: _this64,
            expr: expr,
            parentEnv: parentEnv
          };
          Mavo.hooks.run("domexpression-update-beforeeval", env);
          env.value = Mavo.value(env.expr.eval(data));
          Mavo.hooks.run("domexpression-update-aftereval", env);
          changed = true;

          if (env.value instanceof Error) {
            return _this64.fallback !== undefined ? _this64.fallback : _this64.syntax.start + env.expr.expression + _this64.syntax.end;
          }

          if (env.value === undefined || env.value === null) {
            // Don’t print things like "undefined" or "null"
            return "";
          }

          return env.value;
        }

        return expr;
      });

      if (!changed) {
        // If nothing changed, no need to do anything
        return;
      }

      if (env.value.length === 1) {
        env.value = env.value[0];
      } else {
        env.value = env.value.map(function (v) {
          return Mavo.Primitive.format(v, {
            attribute: _this64.attribute,
            element: _this64.element
          });
        }).join("");
      }

      this.output(env.value);
      Mavo.hooks.run("domexpression-update-end", env);
    },
    output: function output(value) {
      if (this.primitive) {
        if (Mavo["in"](Mavo.isProxy, value)) {
          value = Mavo.clone(value); // Drop proxy
        }

        this.primitive.value = value;
      } else if (this.mavoNode) {
        this.mavoNode.render(value);
      } else {
        Mavo.Primitive.setValue(this.node, value, {
          attribute: this.attribute
        });
      }
    },
    live: {
      item: function item(_item) {
        if (_item && this._item != _item) {
          if (this._item) {
            // Previous item, delete from its expressions
            Mavo["delete"](this._item.expressions, this);
          }

          _item.expressions = _item.expressions || [];

          _item.expressions.push(this);
        }
      }
    },
    "static": {
      elements: new WeakMap(),

      /**
       * Search for Mavo.DOMExpression object(s) associated with a given element
       * and optionally an attribute.
       *
       * @return If one argument, array of matching DOMExpression objects.
       *         If two arguments, the matching DOMExpression object or null
       */
      search: function search(element, attribute) {
        if (element === null) {
          return element;
        } // HTML attributes are case-insensitive (fix for #515)


        if (attribute && !element.ownerDocument.xmlVersion) {
          attribute = attribute.toLowerCase();
        }

        var all = _.elements.get(element) || [];

        if (arguments.length > 1) {
          if (!all.length) {
            return null;
          }

          return all.filter(function (et) {
            return et.attribute === attribute;
          })[0] || null;
        }

        return all;
      },
      special: {
        add: function add(domexpression, name) {
          if (name) {
            var o = this.vars[name];
            var hasName = domexpression.identifiers.indexOf(name) > -1;
            var hasUnprefixedName = name.startsWith("$") && domexpression.identifiers.indexOf(name.substr(1)) > -1;

            if (o && (hasName || hasUnprefixedName)) {
              o.all = o.all || new Set();
              o.all.add(domexpression);

              if (o.all.size === 1) {
                o.observe();
              } else if (!o.all.size) {
                o.unobserve();
              }
            }
          } else {
            // All names
            for (var name in this.vars) {
              this.add(domexpression, name);
            }
          }
        },
        "delete": function _delete(domexpression, name) {
          if (name) {
            var o = this.vars[name];
            o.all = o.all || new Set();
            o.all["delete"](domexpression);

            if (!o.all.size) {
              o.unobserve();
            }
          } else {
            // All names
            for (var name in this.vars) {
              this["delete"](domexpression, name);
            }
          }
        },
        update: function update() {
          if (this.update) {
            this.update.apply(this, arguments);
          }

          this.all.forEach(function (domexpression) {
            return domexpression.update();
          });
        },
        event: function event(name) {
          var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              type = _ref8.type,
              update = _ref8.update,
              _ref8$target = _ref8.target,
              target = _ref8$target === void 0 ? document : _ref8$target;

          this.vars[name] = {
            observe: function observe() {
              this.callback = this.callback || _.special.update.bind(this);
              target.addEventListener(type, this.callback);
            },
            unobserve: function unobserve() {
              target.removeEventListener(type, this.callback);
            }
          };

          if (update) {
            this.vars[name].update = function (evt) {
              Mavo.Functions[name] = update(evt);
            };
          }
        },
        vars: {
          "$now": {
            observe: function observe() {
              var _this65 = this;

              var callback = function callback() {
                _.special.update.call(_this65);

                _this65.timer = requestAnimationFrame(callback);
              };

              this.timer = requestAnimationFrame(callback);
            },
            unobserve: function unobserve() {
              cancelAnimationFrame(this.timer);
            }
          }
        }
      }
    }
  });

  _.special.event("$mouse", {
    type: "mousemove",
    update: function update(evt) {
      return {
        x: evt.clientX,
        y: evt.clientY
      };
    }
  });

  _.special.event("$hash", {
    type: "hashchange",
    target: window
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  Mavo.attributes.push("mv-expressions");

  var _ = Mavo.Expressions = $.Class({
    constructor: function constructor(mavo) {
      var _this66 = this;

      this.mavo = mavo;
      this.active = true;
      this.expressions = [];
      this.identifiers = {};
      var syntax = Mavo.Expression.Syntax.create(this.mavo.element.closest("[mv-expressions]")) || Mavo.Expression.Syntax["default"];
      this.traverse(this.mavo.element, undefined, syntax);
      this.scheduled = {};
      this.mavo.treeBuilt.then(function () {
        _this66.expressions = [];

        _this66.update();
      });
    },
    register: function register(domexpression) {
      var _this67 = this;

      var ids = this.identifiers;
      domexpression.registeredApp = domexpression.registeredApp || new Set();
      domexpression.identifiers.forEach(function (id) {
        if (!(ids[id] instanceof Set)) {
          ids[id] = new Set();
        }

        ids[id].add(domexpression);

        if (Mavo.all[id] instanceof Mavo && Mavo.all[id] !== _this67.mavo && !domexpression.registeredApp.has(id)) {
          // Cross-mavo expressions, make sure to track app id before calling register.
          domexpression.registeredApp.add(id);
          Mavo.all[id].expressions.register(domexpression);
        }
      });
    },
    unregister: function unregister(domexpression) {
      var ids = this.identifiers;
      domexpression.identifiers.forEach(function (id) {
        if (ids[id]) {
          ids[id]["delete"](domexpression);
        } // just in case domexpresssion has been destroyed by another app during the loop
        // when another app is destroyed.


        if (id in Mavo.all && typeof domexpresssion !== "undefined") {
          // Cross-mavo expressions
          Mavo.all[id].expressions.unregister(domexpresssion);
        }
      });
    },
    updateThrottled: function updateThrottled(evt) {
      var _this68 = this;

      if (!this.active) {
        return;
      }

      var scheduled = this.scheduled[evt.action] = this.scheduled[evt.action] || new Set();

      if (evt.node.template) {
        // Throttle events in collections and events from other Mavos
        if (!scheduled.has(evt.node.template)) {
          setTimeout(function () {
            scheduled["delete"](evt.node.template);

            _this68.update(evt);
          }, _.THROTTLE);
          scheduled.add(evt.node.template);
        }
      } else {
        requestAnimationFrame(function () {
          return _this68.update(evt);
        });
      }
    },
    update: function update(evt) {
      if (!this.active) {
        return;
      }

      var root, rootObject;

      if (evt instanceof Mavo.Node) {
        rootObject = evt;
      } else if (evt instanceof Element) {
        root = evt.closest(Mavo.selectors.item);
        rootObject = Mavo.Node.get(root);
      } else if (evt) {
        // Specific data change
        var cache = {
          updated: new Set()
        };
        this.updateByIdThrottled(evt.property, evt, cache);

        if (evt.action == "propertychange") {
          if (evt.node && evt.node.path) {
            // Ensure that [collectionName] updates when changing children
            this.updateByIdThrottled(evt.node.path, evt, cache);
          }
        } else {
          // Collection modifications (add, delete, move etc)
          this.updateById(Object.keys(Mavo.Data.special), evt, cache);
          var collection = evt.node.collection || evt.node;
          this.updateById(collection.properties, evt, cache);
        }

        return;
      } else {
        rootObject = this.mavo.root;
      }

      rootObject.walk(function (obj, path) {
        if (!obj.expressionsEnabled) {
          return false;
        }

        if (obj.expressions) {
          obj.expressions.forEach(function (et) {
            // Prevent mv-value loops
            if (!evt || et.mavoNode !== evt) {
              et.update();
            }
          });
        }
      });
    },
    updateByIdThrottled: function updateByIdThrottled(property, evt, cache) {
      var _this69 = this;

      if (!property) {
        return;
      }

      if (property.forEach) {
        property.forEach(function (property) {
          return _this69.updateByIdThrottled(property, evt, cache);
        });
      } else {
        var scheduled = this.scheduledIds = this.scheduledIds || new Set();

        if (!scheduled.has(property)) {
          setTimeout(function () {
            scheduled["delete"](property);

            _this69.updateById(property, evt, cache);
          }, _.THROTTLE);
          scheduled.add(property);
        }
      }
    },
    updateById: function updateById(property, evt, cache) {
      var _this70 = this;

      if (property.forEach) {
        // Multiple properties
        property.forEach(function (p) {
          return _this70.updateById(p, evt, cache);
        });
        return;
      }

      var exprs = this.identifiers[property];

      if (exprs) {
        exprs.forEach(function (expr) {
          // Prevent the same node from triggering changes, everything else is game
          if (expr.originalAttribute == "mv-value" && expr.mavoNode && !(expr.mavoNode instanceof Mavo.Primitive) && expr.mavoNode.contains(evt.node)) {
            return;
          }

          if (!cache.updated.has(expr)) {
            expr.update();
          }
        });
      }
    },
    extract: function extract(node, attribute, path) {
      var syntax = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Mavo.Expression.Syntax["default"];

      if (attribute && _.skip.indexOf(attribute.name) > -1) {
        return;
      }

      if (attribute && _.directives.indexOf(attribute.name) > -1 || syntax !== Mavo.Expression.Syntax.ESCAPE && syntax.test(attribute ? attribute.value : node.textContent)) {
        if (path === undefined) {
          path = Mavo.elementPath(node.closest(Mavo.selectors.item), node);
        }

        this.expressions.push(new Mavo.DOMExpression({
          node: node,
          syntax: syntax,
          path: path,
          attribute: attribute && attribute.name,
          mavo: this.mavo
        }));
      }
    },
    // Traverse an element, including attribute nodes, text nodes and all descendants
    traverse: function traverse(node) {
      var _this71 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var syntax = arguments.length > 2 ? arguments[2] : undefined;

      if (node.nodeType === 8) {
        // We don't want expressions to be picked up from comments!
        // Commenting stuff out is a common debugging technique
        return;
      }

      if (node.nodeType === 3) {
        // Text node
        // Leaf node, extract references from content
        this.extract(node, null, path, syntax);
      } else {
        node.normalize();
        syntax = Mavo.Expression.Syntax.create(node) || syntax;

        if (Mavo.is("item", node)) {
          path = [];
        }

        if (node.hasAttribute("mv-expressions-ignore")) {
          var ignore = new Set(node.getAttribute("mv-expressions-ignore").trim().split(/\s*,\s*/));
        }

        $$(node.attributes).forEach(function (attribute) {
          if (!ignore || !ignore.has(attribute.name)) {
            _this71.extract(node, attribute, path, syntax);
          }
        });
        var index = -1,
            offset = 0;

        if (!node.matches("script:not([mv-expressions])")) {
          $$(node.childNodes).forEach(function (child) {
            if (child.nodeType == 1) {
              offset = 0;
              index++;
            } else {
              offset++;
            }

            if (child.nodeType == 1 || child.nodeType == 3) {
              var segment = offset > 0 ? "".concat(index, ".").concat(offset) : index;

              _this71.traverse(child, [].concat(_toConsumableArray(path || []), [segment]), syntax);
            }
          });
        }
      }
    },
    "static": {
      directives: ["mv-value"],
      skip: ["mv-expressions", "mv-action"],
      THROTTLE: 50,
      directive: function directive(name, o) {
        _.directives.push(name);

        Mavo.attributes.push(name);
        Mavo.Plugins.register(name, o);
      }
    }
  });
})(Bliss, Bliss.$); // mv-if plugin


(function ($, $$) {
  Mavo.Expressions.directive("mv-if", {
    extend: {
      "Primitive": {
        live: {
          "hidden": function hidden(value) {
            if (this._hidden !== value) {
              this._hidden = value;
              this.liveData.update();
              this.dataChanged();
            }
          }
        }
      },
      "DOMExpression": {
        lazy: {
          "childProperties": function childProperties() {
            var _this72 = this;

            var properties = $$(Mavo.selectors.property, this.element).filter(function (el) {
              return el.closest("[mv-if]") == _this72.element;
            }).map(function (el) {
              return Mavo.Node.get(el);
            }); // When the element is detached, mv-change events from properties
            // do not propagate up to the group so expressions do not recalculate.
            // We must do this manually.

            this.element.addEventListener("mv-change", function (evt) {
              // Cannot redispatch synchronously [why??]
              requestAnimationFrame(function () {
                if (!_this72.element.parentNode) {
                  // out of the DOM?
                  _this72.item.element.dispatchEvent(evt);
                }
              });
            });
            return properties;
          }
        }
      }
    },
    hooks: {
      "domexpression-init-start": function domexpressionInitStart() {
        if (this.attribute != "mv-if") {
          return;
        }

        if (!Mavo.Node.prototype.fromTemplate.call(this, "parsed", "expression")) {
          this.expression = this.element.getAttribute("mv-if");
          this.parsed = [new Mavo.Expression(this.expression)];
          this.expression = this.syntax.start + this.expression + this.syntax.end;
        }

        this.parentIf = this.element.parentNode && Mavo.DOMExpression.search(this.element.parentNode.closest("[mv-if]"), "mv-if");

        if (this.parentIf) {
          this.parentIf.childIfs = (this.parentIf.childIfs || new Set()).add(this);
        }
      },
      "domexpression-update-end": function domexpressionUpdateEnd() {
        var _this73 = this;

        if (this.attribute != "mv-if") {
          return;
        }

        var value = this.value[0];
        var oldValue = this.oldValue[0]; // Only apply this after the tree is built, otherwise any properties inside the if will go missing!

        this.item.mavo.treeBuilt.then(function () {
          if (_this73.parentIf) {
            var parentValue = _this73.parentIf.value[0];
            _this73.value[0] = value = value && parentValue;
          }

          if (parentValue !== false) {
            // If parent if was false, it wouldn't matter whether this is in the DOM or not
            if (value) {
              // Is removed from the DOM and needs to get back
              Mavo.revocably.add(_this73.element);
            } else if (_this73.element.parentNode) {
              // Is in the DOM and needs to be removed
              Mavo.revocably.remove(_this73.element, "mv-if");
            }
          }

          if (value !== oldValue) {
            // Mark any properties inside as hidden or not
            if (_this73.childProperties) {
              _this73.childProperties.forEach(function (property) {
                return property.hidden = !value;
              });
            }

            if (_this73.childIfs) {
              _this73.childIfs.forEach(function (childIf) {
                return childIf.update();
              });
            }
          }
        });
      },
      "node-isdatanull": function nodeIsdatanull(env) {
        env.result = env.result || this.hidden && env.options.live;
      }
    }
  });
})(Bliss, Bliss.$);
/**
 * Functions available inside Mavo expressions
 */


(function ($, val) {
  var _arguments = arguments;

  var _ = Mavo.Functions = {
    operators: {
      "=": "eq"
    },

    /**
     * Get a property of an object. Used by the . operator to prevent TypeErrors
     */
    get: function get(obj, property) {
      var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      property = meta.property = val(property);
      var canonicalProperty = Mavo.getCanonicalProperty(obj, property);

      if (canonicalProperty !== undefined) {
        meta.property = canonicalProperty;
        var ret = obj[canonicalProperty];

        if (typeof ret === "function" && ret.name.indexOf("bound") !== 0) {
          return ret.bind(obj);
        }

        return ret;
      }

      if (Array.isArray(obj) && property && isNaN(property)) {
        // Array and non-numerical property
        var eqIndex = property.indexOf("=");

        if (eqIndex > -1) {
          // Property query
          meta.query = {
            property: property.slice(0, eqIndex),
            value: property.slice(eqIndex + 1)
          };
          meta.property = [];
          ret = obj.filter(function (e, i) {
            var passes = _.get(e, meta.query.property) == meta.query.value;

            if (passes) {
              meta.property.push(i);
            }

            return passes;
          });

          if (meta.query.property == "id") {
            meta.property = meta.property[0];
            ret = ret[0];
          }

          if (ret === undefined) {
            meta.property = obj.length;
          } else if (ret.length === 0) {
            meta.property = [obj.length];
          }

          return ret;
        } else {
          // Not a property query, get from objects inside
          // TODO meta.property = ??
          return obj.map(function (e) {
            return _.get(e, property);
          });
        }
      } // Not found :(


      return null;
    },
    call: function call(fn, args, thisArg) {
      if (!fn) {
        return;
      }

      if (typeof fn === "function") {
        return fn.apply(thisArg, args);
      } else {
        Mavo.warn("You tried to call ".concat(fn, " as a function, but it\u2019s not a function"));
      }
    },
    url: function url(id) {
      var _url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location;

      if (id === undefined) {
        return location.href;
      }

      if (id) {
        id = str(id).replace(/[^\w-:]/g);

        var ret = _url.search.match(RegExp("[?&]".concat(id, "(?:=(.+?))?(?=$|&)"))) || _url.pathname.match(RegExp("(?:^|\\/)".concat(id, "\\/([^\\/]*)")));
      }

      if (ret === null || !id) {
        return null;
      }

      return decodeURIComponent(ret[1] || "");
    },
    first: function first(n, arr) {
      if (arr === undefined) {
        arr = n;
        n = undefined;
      }

      if (arr === undefined) {
        return null;
      }

      if (!Array.isArray(arr)) {
        return n !== undefined ? [arr] : arr;
      }

      if (n < 0) {
        return _.last(Math.abs(n), arr);
      } else {
        var ret = [];
        var numReturn = n === undefined ? 1 : Math.floor(n);

        for (var i = 0; i < arr.length && ret.length < numReturn; i++) {
          if (Mavo.value(arr[i]) !== null) {
            ret.push(arr[i]);
          }
        }

        if (n === undefined) {
          return ret[0] !== undefined ? ret[0] : null;
        }

        return ret;
      }
    },
    last: function last(n, arr) {
      if (arr === undefined) {
        arr = n;
        n = undefined;
      }

      if (arr === undefined) {
        return null;
      }

      if (!Array.isArray(arr)) {
        return n !== undefined ? [arr] : arr;
      }

      if (n < 0) {
        return _.first(Math.abs(n), arr);
      } else {
        var ret = [];
        var numReturn = n === undefined ? 1 : Math.floor(n);

        for (var i = arr.length - 1; i >= 0 && ret.length < numReturn; i--) {
          if (Mavo.value(arr[i]) !== null) {
            ret.push(arr[i]);
          }
        }

        if (n === undefined) {
          return ret[0] !== undefined ? ret[0] : null;
        }

        return ret;
      }
    },
    unique: function unique(arr) {
      if (!Array.isArray(arr)) {
        return arr;
      }

      return _toConsumableArray(new Set(arr.map(val)));
    },

    /**
     * Do two arrays or sets have a non-empty intersection?
     * @return {Boolean}
     */
    intersects: function intersects(arr1, arr2) {
      if (arr1 && arr2) {
        var set2 = new Set(Mavo.toArray(arr2).map(val));
        arr1 = Mavo.toArray(arr1).map(val);
        return !arr1.every(function (el) {
          return !set2.has(el);
        });
      }
    },

    /*********************
     * Number functions
     *********************/

    /**
     * Aggregate sum
     */
    sum: $.extend(function (array) {
      return $u.numbers(array, arguments).reduce(function (prev, current) {
        return +prev + (+current || 0);
      }, 0);
    }, {
      isAggregate: true
    }),

    /**
     * Average of an array of numbers
     */
    average: $.extend(function (array) {
      array = $u.numbers(array, arguments);
      return array.length && _.sum(array) / array.length;
    }, {
      isAggregate: true,
      alias: "avg"
    }),

    /**
     * Median of an array of numbers
     */
    median: $.extend(function (array) {
      array = $u.numbers(array, arguments).sort(function (a, b) {
        return a - b;
      });
      var mi = (array.length - 1) / 2;
      var _ref9 = [array[Math.floor(mi)], array[Math.ceil(mi)]];
      m1 = _ref9[0];
      m2 = _ref9[1];
      return (m1 + m2) / 2 || 0;
    }, {
      isAggregate: true
    }),

    /**
     * Min of an array of numbers
     */
    min: $.extend(function (array) {
      return Math.min.apply(Math, _toConsumableArray($u.numbers(array, arguments)));
    }, {
      isAggregate: true
    }),

    /**
     * Max of an array of numbers
     */
    max: $.extend(function (array) {
      return Math.max.apply(Math, _toConsumableArray($u.numbers(array, arguments)));
    }, {
      isAggregate: true
    }),
    atan2: $.extend(function (dividend, divisor) {
      return Math.atan2(dividend, divisor);
    }, {
      multiValued: true,
      rightUnary: function rightUnary(b) {
        return b;
      },
      "default": 1
    }),
    pow: $.extend(function (base, exponent) {
      return Math.pow(base, exponent);
    }, {
      multiValued: true,
      "default": 1
    }),
    imul: $.extend(function (a, b) {
      return Math.imul(a, b);
    }, {
      multiValued: true,
      "default": 1
    }),
    count: $.extend(function (array) {
      return Mavo.toArray(array).filter(function (a) {
        return !empty(a);
      }).length;
    }, {
      isAggregate: true
    }),
    reverse: function reverse(array) {
      return Mavo.toArray(array).slice().reverse();
    },
    round: $.extend(function (num, decimals) {
      if (not(num) || not(decimals) || !isFinite(num)) {
        return Math.round(num);
      }

      return +num.toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: decimals
      });
    }, {
      multiValued: true,
      rightUnary: function rightUnary(b) {
        return b;
      },
      "default": 0
    }),
    ordinal: $.extend(function (num) {
      if (empty(num)) {
        return "";
      }

      if (num < 10 || num > 20) {
        var ord = ["th", "st", "nd", "rd", "th"][num % 10];
      }

      return ord || "th";
    }, {
      multiValued: true,
      alias: "th"
    }),
    digits: $.extend(function (digits, decimals, num) {
      if (num === undefined) {
        num = decimals;
        decimals = undefined;
      }

      if (isNaN(num)) {
        return null;
      }

      var parts = (num + "").split("."); // If it has more digits than n = digits, only keep the last n digits.

      parts[0] = parts[0].slice(-digits); // Chop extra decimals without rounding

      if (decimals !== undefined && parts[1]) {
        parts[1] = parts[1].slice(0, decimals);
      }

      num = +parts.join("."); // This is mainly for padding with zeroes, we've done the rest already

      return num.toLocaleString("en", {
        useGrouping: false,
        // we want something that can be converted to a number again
        minimumIntegerDigits: digits,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals || 20
      });
    }, {
      multiValued: true
    }),
    iff: function iff(condition) {
      var iftrue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : condition;
      var iffalse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (Array.isArray(condition)) {
        return condition.map(function (c, i) {
          var ret = val(c) ? iftrue : iffalse;
          return Array.isArray(ret) ? ret[Math.min(i, ret.length - 1)] : ret;
        });
      }

      return val(condition) ? iftrue : iffalse;
    },
    group: function group() {
      return Object.assign.apply(Object, arguments);
    },
    list: function list() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return Mavo.flatten(items);
    },
    // FIXME if step=0 returns NaN
    random: $.extend(function () {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (_arguments.length == 1) {
        max = min;
        min = 0;
      }

      var rand = Math.random();
      var range = (max - min) / step;
      return Math.floor(rand * (range + 1)) * step + min;
    }, {
      multiValued: true
    }),
    range: function range(a, b, step) {
      if (step === undefined) {
        if (b === undefined) {
          b = a;
          a = b >= 0 ? 1 : -1;
        }

        step = a <= b ? 1 : -1;
      }

      var steps = Math.floor((b - a) / step + 1);

      if (steps <= 0 || !isFinite(steps)) {
        return [a];
      }

      var ret = [];

      for (var i = 0, n = a; i++ < steps; n += step) {
        ret.push(n);
      }

      return ret;
    },
    shuffle: function shuffle(list) {
      if (Array.isArray(list)) {
        // Fisher-Yates shuffle
        var ret = list.slice();

        for (var i = ret.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref10 = [ret[j], ret[i]];
          ret[i] = _ref10[0];
          ret[j] = _ref10[1];
        }

        return ret;
      } else {
        return list;
      }
    },

    /*********************
     * String functions
     *********************/

    /**
     * Replace all occurences of a string with another string
     */
    replace: $.extend(function (haystack, needle) {
      var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var iterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      if (Array.isArray(haystack)) {
        return haystack.map(function (item) {
          return _.replace(item, needle, replacement);
        });
      } // Simple string replacement


      var needleRegex = RegExp(Mavo.escapeRegExp(needle), "g");
      var ret = haystack,
          prev;
      var counter = 0;

      while (ret != prev && counter++ < iterations) {
        prev = ret;
        ret = ret.replace(needleRegex, replacement);
      }

      return ret;
    }, {
      multiValued: true
    }),
    len: $.extend(function (text) {
      return str(text).length;
    }, {
      multiValued: true
    }),

    /**
     * Search if a group, collection, or primitive contains a string
     * @returns Boolean if a haystack AND needle of object or primitive are passed
     * @returns Array of booleans if either a haystack OR needle of array is passed
     */
    contains: $.extend(function (haystack, needle) {
      var ret;
      var haystackType = $.type(haystack);

      if ($.type(needle) === "object") {
        return JSON.stringify(haystack).indexOf(JSON.stringify(needle)) >= 0;
      }

      if (haystackType === "object" || haystackType === "array") {
        for (var property in haystack) {
          ret = _.contains(haystack[property], needle);

          if (Array.isArray(ret)) {
            ret = Mavo.Functions.or(ret);
          }

          if (ret) {
            return true;
          }
        }
      } else {
        return _.search(haystack, needle) >= 0;
      }

      return ret;
    }, {
      multiValued: true
    }),

    /**
     * Case insensitive search
     */
    search: $.extend(function (haystack, needle) {
      haystack = str(haystack);
      needle = str(needle);
      return haystack && needle ? haystack.toLowerCase().indexOf(needle.toLowerCase()) : -1;
    }, {
      multiValued: true
    }),
    starts: $.extend(function (haystack, needle) {
      return _.search(str(haystack), str(needle)) === 0;
    }, {
      multiValued: true
    }),
    ends: $.extend(function (haystack, needle) {
      var _ref11 = [str(haystack), str(needle)];
      haystack = _ref11[0];
      needle = _ref11[1];

      var i = _.search(haystack, needle);

      return i > -1 && i === haystack.length - needle.length;
    }, {
      multiValued: true
    }),
    join: function join(array, glue) {
      return Mavo.toArray(array).filter(function (a) {
        return !empty(a);
      }).join(str(glue));
    },
    idify: $.extend(function (readable) {
      return str(readable).normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Convert accented letters to ASCII
      .replace(/[^\w\s-]/g, "") // Remove remaining non-ASCII characters
      .trim().replace(/\s+/g, "-") // Convert whitespace to hyphens
      .toLowerCase();
    }, {
      multiValued: true
    }),
    // Convert an identifier to readable text that can be used as a label
    readable: $.extend(function (identifier) {
      // Is it camelCase?
      return str(identifier).replace(/([a-z])([A-Z])(?=[a-z])/g, function ($0, $1, $2) {
        return $1 + " " + $2.toLowerCase();
      }) // camelCase?
      .replace(/([a-z0-9])[_\/-](?=[a-z0-9])/g, "$1 ") // Hyphen-separated / Underscore_separated?
      .replace(/^[a-z]/, function ($0) {
        return $0.toUpperCase();
      }); // Capitalize
    }, {
      multiValued: true
    }),
    uppercase: $.extend(function (text) {
      return str(text).toUpperCase();
    }, {
      multiValued: true
    }),
    lowercase: $.extend(function (text) {
      return str(text).toLowerCase();
    }, {
      multiValued: true
    }),
    from: $.extend(function (haystack, needle) {
      return _.between(haystack, needle);
    }, {
      multiValued: true
    }),
    fromlast: $.extend(function (haystack, needle) {
      return _.between(haystack, needle, "", true);
    }, {
      multiValued: true
    }),
    to: $.extend(function (haystack, needle) {
      return _.between(haystack, "", needle);
    }, {
      multiValued: true
    }),
    tofirst: $.extend(function (haystack, needle) {
      return _.between(haystack, "", needle, true);
    }, {
      multiValued: true
    }),
    between: $.extend(function (haystack, from, to, tight) {
      var _ref12 = [str(haystack), str(from), str(to)];
      haystack = _ref12[0];
      from = _ref12[1];
      to = _ref12[2];
      var i1 = from ? haystack[tight ? "lastIndexOf" : "indexOf"](from) : -1;
      var i2 = haystack[tight ? "indexOf" : "lastIndexOf"](to);

      if (from && i1 === -1 || i2 === -1) {
        return "";
      }

      return haystack.slice(i1 + 1, i2 === -1 || !to ? haystack.length : i2);
    }, {
      multiValued: true
    }),
    phrase: $.extend(function ($this, id, vars, lang) {
      if (arguments.length === 3 && $.type(vars) === "string") {
        var _ref13 = [vars];
        lang = _ref13[0];
        vars = _ref13[1];
      }

      var locale = lang ? Mavo.Locale.get(lang) : $this && $this[Mavo.mavo] ? $this[Mavo.mavo].locale : Mavo.Locale["default"];
      return locale.phrase(id, vars);
    }, {
      needsContext: true
    }),
    filename: $.extend(function (url) {
      return Mavo.match(new URL(str(url), Mavo.base).pathname, /[^/]+?$/);
    }, {
      multiValued: true
    }),
    json: function json(data) {
      return Mavo.safeToJSON(data);
    },
    split: $.extend(function (text) {
      var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\s+/;
      text = str(text);
      return text.split(separator);
    }, {
      multiValued: true
    }),
    // Log to the console and return
    log: function log() {
      var _console2;

      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      (_console2 = console).log.apply(_console2, _toConsumableArray(args.map(val)));

      return args[0];
    },
    // Other special variables (some updated via events)
    $mouse: {
      x: 0,
      y: 0
    },

    get $hash() {
      return location.hash.slice(1);
    },

    get $alt() {
      return _.$evt ? _.$evt.altKey : false;
    },

    get $ctrl() {
      return _.$evt ? _.$evt.ctrlKey : false;
    },

    get $shift() {
      return _.$evt ? _.$evt.shiftKey : false;
    },

    get $cmd() {
      return _.$evt ? _.$evt[Mavo.superKey] : false;
    },

    // "Private" helpers
    util: {
      numbers: function numbers(array, args) {
        array = Array.isArray(array) ? array : args ? $$(args) : [array];
        return array.filter(function (number) {
          return !isNaN(number) && val(number) !== "" && val(number) !== null;
        }).map(function (n) {
          return +n;
        });
      },
      // Implement function metadata
      postProcess: function postProcess(callback) {
        var multiValued = callback.multiValued;

        var _newCallback;

        if (multiValued === true || multiValued && multiValued.length === 2) {
          _newCallback = function newCallback() {
            for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }

            // Define index of multiValued arguments
            // Fallback to first 2 arguments if not explicitly defined
            var idxA = multiValued[0] || 0;
            var idxB = multiValued[1] || 1;
            return Mavo.Script.binaryOperation(args[idxA], args[idxB], _objectSpread({
              scalar: function scalar(a, b) {
                // Replace multiValued argument with its individual elements
                if (idxA in args) {
                  args[idxA] = a;
                }

                if (idxB in args) {
                  args[idxB] = b;
                }

                return callback.apply(void 0, args);
              }
            }, callback));
          };
        } else if (callback.isAggregate) {
          _newCallback = function newCallback(array) {
            if (Mavo["in"](Mavo.groupedBy, array)) {
              // grouped structures
              return array.map(function (e) {
                return _newCallback(e.$items);
              });
            }

            var ret = callback.call.apply(callback, [this].concat(Array.prototype.slice.call(arguments)));
            return ret === undefined ? array : ret;
          };
        }

        if (_newCallback) {
          // Preserve function metadata
          $.extend(_newCallback, callback);
          _newCallback.original = callback;
        }

        if (callback.alias) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Mavo.toArray(callback.alias)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var alias = _step.value;
              Mavo.Functions[alias] = _newCallback || callback;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        return _newCallback;
      }
    }
  };

  var $u = _.util;
  /**
   * After plugins are loaded, enable
   * multi-valued arguments of Mavo and Math functions
   */

  Mavo.ready.then(function () {
    Object.getOwnPropertyNames(Mavo.Functions).forEach(function (property) {
      var newCallback = $u.postProcess(Mavo.Functions[property]);

      if (newCallback) {
        Mavo.Functions[property] = newCallback;
      }
    }); // Deal with Math functions that have 1 argument

    Object.getOwnPropertyNames(Math).forEach(function (property) {
      if (Math[property].length === 1 && !Mavo.Functions.hasOwnProperty(property)) {
        Mavo.Functions[property] = function (operand) {
          return Mavo.Script.unaryOperation(operand, function (operand) {
            return Math[property](operand);
          });
        };
      }
    });
  });
  /**
   * Private helper methods
   */
  // Convert argument to string

  function str() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    str = val(str);
    return !str && str !== 0 ? "" : str + "";
  }

  function empty(v) {
    v = Mavo.value(v);
    return v === null || v === false || v === "";
  }

  function not(v) {
    return !val(v);
  }
})(Bliss, Mavo.value);
/**
 * Date Functions available inside Mavo expressions
 */


(function ($, val, _) {
  var $u = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _.util;
  var s = {
    seconds: 1,
    minutes: 60
  };
  s.hours = s.minutes * 60;
  s.days = s.hours * 24;
  s.weeks = s.days * 7;
  s.months = s.days * 30.4368;
  s.years = s.weeks * 52;
  var numeric = {
    year: function year(d) {
      return d.getFullYear();
    },
    month: function month(d) {
      return d.getMonth() + 1;
    },
    day: function day(d) {
      return d.getDate();
    },
    weekday: function weekday(d) {
      return d.getDay() || 7;
    },
    hour: function hour(d) {
      return d.getHours();
    },
    minute: function minute(d) {
      return d.getMinutes();
    },
    second: function second(d) {
      return d.getSeconds();
    },
    ms: function ms(d) {
      return d.getMilliseconds();
    }
  };
  $.extend(_, {
    get $now() {
      return new Date();
    },

    $startup: new Date(),

    // Like $now, but doesn't update
    get $today() {
      return _.date(new Date());
    },

    year: $.extend(function () {
      return $u.dateComponent.apply($u, ["year"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    month: $.extend(function () {
      return $u.dateComponent.apply($u, ["month"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    week: function week() {
      return s.weeks * 1000;
    },
    day: $.extend(function () {
      return $u.dateComponent.apply($u, ["day"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    weekday: $.extend(function () {
      return $u.dateComponent.apply($u, ["weekday"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    hour: $.extend(function () {
      return $u.dateComponent.apply($u, ["hour"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    minute: $.extend(function () {
      return $u.dateComponent.apply($u, ["minute"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    second: $.extend(function () {
      return $u.dateComponent.apply($u, ["second"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    ms: $.extend(function () {
      return $u.dateComponent.apply($u, ["ms"].concat(Array.prototype.slice.call(arguments)));
    }, {
      multiValued: true
    }),
    date: $.extend(function (date) {
      date = $u.date(date);
      return date ? "".concat(_.year(date), "-").concat(_.month(date, "00"), "-").concat(_.day(date, "00")) : "";
    }, {
      multiValued: true
    }),
    time: $.extend(function (date) {
      date = $u.date(date);
      return date ? "".concat(_.hour(date, "00"), ":").concat(_.minute(date, "00"), ":").concat(_.second(date, "00")) : "";
    }, {
      multiValued: true
    }),
    localTimezone: -new Date().getTimezoneOffset()
  });

  _.msTo = function (what, ms) {
    return Math.floor(Math.abs(ms) / (s[what] * 1000)) || 0;
  };

  var _loop2 = function _loop2(unit) {
    _[unit] = $.extend(function (ms) {
      if (arguments.length === 0) {
        return s[unit] * 1000;
      }

      return _.msTo(unit, ms);
    }, {
      multiValued: true
    });
  };

  for (var unit in s) {
    _loop2(unit);
  }

  _.duration = $.extend(function ($this, ms) {
    if (arguments.length === 1) {
      var _ref14 = [$this, null];
      ms = _ref14[0];
      $this = _ref14[1];
    }

    var count = ms || 0;
    var unit = "ms";

    for (var nextUnit in s) {
      var nextCount = _.msTo(nextUnit, ms);

      if (nextCount === 0) {
        break;
      }

      count = nextCount;
      unit = nextUnit;
    }

    unit = count === 1 && unit !== "ms" ? unit.slice(0, -1) : unit;
    return count + " " + _.phrase($this, unit);
  }, {
    needsContext: true
  });
  $.extend(_.util, {
    fixDateString: function fixDateString(date) {
      date = date.trim();
      var hasDate = /^\d{4}-\d{2}(-\d{2})?/.test(date);
      var hasTime = date.indexOf(":") > -1;

      if (!hasDate && !hasTime) {
        return null;
      } // Fix up time format


      if (!hasDate) {
        // No date, add today’s
        date = _.$today + " " + date;
      } else {
        // Only year-month, add day
        date = date.replace(/^(\d{4}-\d{2})(?!-\d{2})/, "$1-01");
      }

      if (!hasTime) {
        // Add a time if one doesn't exist
        date += "T00:00:00";
      } else {
        // Make sure time starts with T, due to Safari bug
        date = date.replace(/\-(\d{2})\s+(?=\d{2}:)/, "-$1T");
      } // Remove all whitespace


      date = date.replace(/\s+/g, "");
      return date;
    },
    dateComponent: function dateComponent(component, date, format) {
      if (arguments.length === 1 && component + "s" in s) {
        return _[component + "s"]();
      }

      var dateO = $u.date(date);

      if (component === "year") {
        // Why +""? We don't want years to be formatted like 2,017!
        // Why the .match()? For incomplete dates, see #226
        date = date && date.match ? date : date + "";
        var ret = dateO ? dateO.getFullYear() + "" : (date.match(/\b[1-9]\d\d\b|\d+/) || [])[0];
      }

      if (!ret && !dateO) {
        return "";
      }

      var ret = ret || numeric[component](dateO);

      if (format) {
        if (/^0+$/.test(format)) {
          // Leading zeroes
          return (ret + "").padStart(format.length, "0").slice(-format.length);
        } else {
          format = {
            name: "long",
            shortname: "short"
          }[format] || format;
          ret = dateO.toLocaleString(Mavo.locale, _defineProperty({}, component, format));
          ret = ret.replace(/\u200e/g, ""); // Stupid Edge bug

          return ret;
        }
      }

      return component === "year" ? ret : +ret;
    },
    date: function date(_date) {
      _date = val(_date);

      if (!_date) {
        return null;
      }

      var object = new Date(_date); // Either arg is not string or is exactly the same as a re-serialization of it as a date

      if ($.type(_date) !== "string" || !isNaN(object) && object + "" == _date) {
        return object;
      }

      _date = $u.fixDateString(_date);

      if (_date === null) {
        return null;
      }

      var timezone = Mavo.match(_date, /[+-]\d{2}:?\d{2}|Z$/);

      if (timezone) {
        // parse as ISO format
        _date = new Date(_date);
      } else {
        // construct date in local timezone
        var fields = _date.match(/\d+/g);

        _date = new Date( // year, month, date,
        fields[0], (fields[1] || 1) - 1, fields[2] || 1, // hours, minutes, seconds, milliseconds,
        fields[3] || 0, fields[4] || 0, fields[5] || 0, fields[6] || 0);
      }

      return isNaN(_date) ? null : _date;
    }
  });
})(Bliss, Mavo.value, Mavo.Functions);

(function ($, val, $u) {
  var _ = Mavo.Script = {
    addUnaryOperator: function addUnaryOperator(name, o) {
      if (o.symbol) {
        // Build map of symbols to function names for easy rewriting
        Mavo.toArray(o.symbol).forEach(function (symbol) {
          _.unarySymbols[symbol] = name;
          jsep.addUnaryOp(symbol);
        });
      }

      return function (operand) {
        return _.unaryOperation(operand, function (operand) {
          return o.scalar(val(operand));
        });
      };
    },
    unaryOperation: function unaryOperation(operand, scalar) {
      if (Array.isArray(operand)) {
        return operand.map(scalar);
      } else {
        return scalar(operand);
      }
    },
    binaryOperation: function binaryOperation(a, b) {
      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      o.scalar = typeof o === "function" ? o : o.scalar;
      var result;

      if (Array.isArray(b)) {
        if (Array.isArray(a)) {
          result = [];
          var max = Math.max(a.length, b.length);
          var leftUnary = o.leftUnary || o.unary;
          var rightUnary = o.rightUnary || o.unary;
          var leftDefault = o.leftDefault === undefined ? o["default"] : o.leftDefault;
          var rightDefault = o.rightDefault === undefined ? o["default"] : o.rightDefault;

          for (var i = 0; i < max; i++) {
            if (o.comparison && (a[i] === undefined || b[i] === undefined)) {
              result[i] = o["default"];
            } else if (a[i] === undefined) {
              result[i] = rightUnary ? rightUnary(b[i]) : o.scalar(leftDefault, b[i]);
            } else if (b[i] === undefined) {
              result[i] = leftUnary ? leftUnary(a[i]) : o.scalar(a[i], rightDefault);
            } else {
              result[i] = o.scalar(a[i], b[i]);
            }
          }
        } else {
          result = b.map(function (n) {
            return o.scalar(a, n);
          });
        }
      } else if (Array.isArray(a)) {
        result = a.map(function (n) {
          return o.scalar(n, b);
        });
      } else {
        result = o.scalar(a, b);
      }

      return result;
    },

    /**
     * Extend a scalar operator to arrays, or arrays and scalars
     * The operation between arrays is applied element-wise.
     * The operation operation between a scalar and an array will result in
     * the operation being applied between the scalar and every array element.
     */
    addBinaryOperator: function addBinaryOperator(name, o) {
      if (o.symbol) {
        // Build map of symbols to function names for easy rewriting
        Mavo.toArray(o.symbol).forEach(function (symbol) {
          _.symbols[symbol] = name;

          if (o.precedence) {
            jsep.addBinaryOp(symbol, o.precedence);
          }
        });
      }

      o["default"] = o["default"] === undefined ? 0 : o["default"];
      return o.code || function () {
        for (var _len9 = arguments.length, operands = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          operands[_key9] = arguments[_key9];
        }

        if (operands.length === 1) {
          if (Array.isArray(operands[0])) {
            // Operand is an array of operands, expand it out
            operands = _toConsumableArray(operands[0]);
          }
        }

        if (!o.raw) {
          operands = operands.map(val);
        }

        var prev = o.comparison ? true : operands[0],
            result;

        for (var i = 1; i < operands.length; i++) {
          var a = o.comparison ? operands[i - 1] : prev;
          var b = operands[i];

          if (Array.isArray(b) && typeof o["default"] == "number") {
            b = $u.numbers(b);
          }

          var result = _.binaryOperation(a, b, o);

          if (o.comparison) {
            prev = _.binaryOperation(prev, result, _.operators["and"]);
          } else {
            prev = result;
          }
        }

        return prev;
      };
    },

    /**
     * Mapping of operator symbols (strings) to function names (strings).
     * Populated via addOperator() and addLogicalOperator()
     */
    symbols: {},
    unarySymbols: {},
    getOperatorName: function getOperatorName(op, unary) {
      return _[unary ? "unarySymbols" : "symbols"][op] || op;
    },
    isComparisonOperator: function isComparisonOperator(op) {
      // decides if op, a string, is a comparison operator like < or <=
      if (op) {
        var operatorDefinition = _.operators[_.symbols[op]];
        return operatorDefinition && operatorDefinition.comparison;
      }
    },
    isStatic: function isStatic(node) {
      if (node.type === "Identifier") {
        return false;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _.childProperties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var property = _step2.value;

          if (node[property] && property !== "callee") {
            if (!_.isStatic(node[property])) {
              return false;
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    },

    /**
     * Operations for elements and scalars.
     * Operations between arrays happen element-wise.
     * Operations between a scalar and an array will result in the operation being performed between the scalar and every array element.
     * Ordered by precedence (higher to lower)
     * @param scalar {Function} The operation between two scalars
     * @param unary/leftUnary/rightUnary Custom versions of scalar for when there is only 1 operand.
     * @param precedence {Number}
     * @param symbol {String} The operator's symbol
     * @param default The operation’s default/identity element. Defaults to 0.
     *                There are also leftDefault and rightDefault options if needed.
     * @param export {Boolean} Whether to add the resulting function to Mavo.Functions. It will always be available on Mavo.Script.operators[name].code anyway. Default: true
     * @param code {Function} The full implementation of the operator (including handling for array operands), if one prefers to provide instead of have it be generated.
     * @param transformation {Function}
     * @param postFlattenTransformation {Function}
     * @param raw {Boolean} If true, do not use Mavo.value() on operands
     */
    operators: {
      "not": {
        symbol: "!",
        scalar: function scalar(a) {
          return !val(a);
        }
      },
      "multiply": {
        scalar: function scalar(a, b) {
          return a * b;
        },
        "default": 1,
        symbol: "*"
      },
      "divide": {
        scalar: function scalar(a, b) {
          return a / b;
        },
        rightUnary: function rightUnary(b) {
          return b;
        },
        "default": 1,
        symbol: "/"
      },
      "addition": {
        scalar: function scalar(a, b) {
          if (isNaN(a) || isNaN(b)) {
            // Handle dates
            var dateA = $u.date(a),
                dateB = $u.date(b);

            if (dateA || dateB) {
              return +dateA + +dateB;
            }
          }

          return +a + +b;
        },
        symbol: "+"
      },
      "plus": {
        scalar: function scalar(a) {
          return +a;
        },
        symbol: "+"
      },
      "subtract": {
        scalar: function scalar(a, b) {
          if (isNaN(a) || isNaN(b)) {
            // Handle dates
            var dateA = $u.date(a),
                dateB = $u.date(b);

            if (dateA && dateB) {
              return dateA - dateB;
            }
          }

          return a - b;
        },
        symbol: "-"
      },
      "minus": {
        scalar: function scalar(a) {
          return -a;
        },
        symbol: "-"
      },
      "mod": {
        scalar: function scalar(a, b) {
          var ret = a % b;
          ret += ret < 0 ? b : 0;
          return ret;
        },
        symbol: "mod",
        precedence: 10
      },
      "lte": {
        comparison: true,
        scalar: function scalar(a, b) {
          var _$getNumericalOperand = _.getNumericalOperands(a, b);

          var _$getNumericalOperand2 = _slicedToArray(_$getNumericalOperand, 2);

          a = _$getNumericalOperand2[0];
          b = _$getNumericalOperand2[1];
          return a <= b;
        },
        "default": false,
        symbol: "<="
      },
      "lt": {
        comparison: true,
        scalar: function scalar(a, b) {
          var _$getNumericalOperand3 = _.getNumericalOperands(a, b);

          var _$getNumericalOperand4 = _slicedToArray(_$getNumericalOperand3, 2);

          a = _$getNumericalOperand4[0];
          b = _$getNumericalOperand4[1];
          return a < b;
        },
        "default": false,
        symbol: "<"
      },
      "gte": {
        comparison: true,
        scalar: function scalar(a, b) {
          var _$getNumericalOperand5 = _.getNumericalOperands(a, b);

          var _$getNumericalOperand6 = _slicedToArray(_$getNumericalOperand5, 2);

          a = _$getNumericalOperand6[0];
          b = _$getNumericalOperand6[1];
          return a >= b;
        },
        "default": false,
        symbol: ">="
      },
      "gt": {
        comparison: true,
        scalar: function scalar(a, b) {
          var _$getNumericalOperand7 = _.getNumericalOperands(a, b);

          var _$getNumericalOperand8 = _slicedToArray(_$getNumericalOperand7, 2);

          a = _$getNumericalOperand8[0];
          b = _$getNumericalOperand8[1];
          return a > b;
        },
        "default": false,
        symbol: ">"
      },
      "eq": {
        comparison: true,
        scalar: function scalar(a, b) {
          return a == b || Mavo.safeToJSON(a) === Mavo.safeToJSON(b);
        },
        symbol: ["=", "=="],
        "default": false,
        precedence: 7 // to match other comparison operators in jsep

      },
      "neq": {
        comparison: true,
        scalar: function scalar(a, b) {
          return a != b && Mavo.safeToJSON(a) !== Mavo.safeToJSON(b);
        },
        symbol: ["!="],
        "default": true,
        precedence: 7 // to match other comparison operators in jsep

      },
      "and": {
        scalar: function scalar(a, b) {
          return a && b;
        },
        "default": false,
        symbol: ["&&", "and"],
        precedence: 2
      },
      "or": {
        scalar: function scalar(a, b) {
          return a || b;
        },
        "default": false,
        symbol: ["||", "or"],
        precedence: 2
      },
      "concatenate": {
        symbol: "&",
        "default": "",
        scalar: function scalar(a, b) {
          return "" + (a || "") + (b || "");
        },
        precedence: 10
      },
      "keyvalue": {
        symbol: ":",
        code: function code() {
          var i = arguments.length - 1;
          var value = i < 0 || arguments.length <= i ? undefined : arguments[i];

          while (i--) {
            value = _defineProperty({}, i < 0 || arguments.length <= i ? undefined : arguments[i], value);
          }

          return value;
        },
        transformation: function transformation(node) {
          // Allow unquoted property names, just like JS
          if (node.left.type == "Identifier") {
            node.left = {
              type: "Literal",
              value: node.left.name,
              raw: JSON.stringify(node.left.name)
            };
          }
        },
        precedence: 4
      },
      "filter": {
        symbol: "where",
        code: function code(a) {
          for (var _len10 = arguments.length, filters = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            filters[_key10 - 1] = arguments[_key10];
          }

          var _loop3 = function _loop3() {
            var b = _filters[_i4];

            if (Array.isArray(a)) {
              if (Array.isArray(b)) {
                a = a.map(function (v, i) {
                  return val(b[i]) ? v : null;
                });
              } else {
                b = val(b);

                if (typeof b === "boolean") {
                  // foo where true/false should equal foo/null respectively
                  a = b ? a : a.map(function (v) {
                    return null;
                  });
                } else {
                  // foo where 5 should equal foo where foo = 5
                  a = a.map(function (v) {
                    return v == b ? v : null;
                  });
                }
              }
            } else {
              a = val(b) ? a : null;
            }
          };

          for (var _i4 = 0, _filters = filters; _i4 < _filters.length; _i4++) {
            _loop3();
          }

          return a;
        },
        precedence: 1,
        postFlattenTransformation: function postFlattenTransformation(node) {
          // Scope all identifiers (likely properties) in the where clause to the thing we're filtering from.
          // For example, assume you have a list of people and a list of cats, both with names and ages.
          // Without this, cat where age > 3 would return nonsensical results
          var object = node.arguments[0];

          for (var i = 1; i < node.arguments.length; i++) {
            if (!_.isStatic(node.arguments[i])) {
              node.arguments[i] = Object.assign(_.parse("scope()"), {
                arguments: [object, node.arguments[i]]
              });
            }
          }
        }
      },
      "range": {
        symbol: "..",
        scalar: function scalar(a, b) {
          return Mavo.Functions.range(a, b);
        },
        precedence: 2,
        "export": false
      },
      "has": {
        symbol: "in",
        code: function code(needle) {
          var ret;

          for (var _len11 = arguments.length, haystacks = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
            haystacks[_key11 - 1] = arguments[_key11];
          }

          haystacks.map(function (b) {
            if (Array.isArray(b)) {
              var op = function op(a) {
                // If object, comparison will fail because references. Must serialize first.
                var fn = $.type(val(a)) === "object" ? Mavo.safeToJSON : val;
                return b.map(fn).indexOf(fn(a)) > -1;
              };
            } else if ($.type(b) === "object") {
              // Mimic JS' in operator
              var op = function op(a) {
                return Mavo["in"](val(a), b);
              };
            } else {
              var op = function op(a) {
                return Mavo.Functions.eq(a, b);
              };
            }

            var result = Mavo.Script.unaryOperation(needle, op);
            ret = ret === undefined ? result : Mavo.Functions.and(result, ret);
          });
          return ret;
        },
        precedence: 3
      },
      "groupby": {
        symbol: "by",
        code: function code(array, key) {
          array = Mavo.toArray(array);
          key = Mavo.toArray(key);
          var property = key[Mavo.as] || $.value(key[0], Mavo.toNode, "property");
          var groups = new Mavo.BucketMap({
            arrays: true
          });
          var ret = [];
          ret[Mavo.groupedBy] = true;
          array.forEach(function (item, i) {
            var k = i < key.length ? Mavo.value(key[i]) : null;
            groups.set(k, item);
          });

          if (Mavo["in"](Mavo.route, array)) {
            ret[Mavo.route] = Object.assign({}, array[Mavo.route]);
          }

          groups.forEach(function (items, value) {
            var _obj;

            var obj = (_obj = {
              $value: value
            }, _defineProperty(_obj, property || "$value", value), _defineProperty(_obj, "$items", items), _obj);

            if (Mavo["in"](Mavo.route, array)) {
              items[Mavo.route] = obj[Mavo.route] = Object.assign({}, array[Mavo.route]);
              obj[Mavo.route] = $.each(items[Mavo.route], function (p, v) {
                return new Set(["$items"]);
              });
            }

            ret.push(obj);
          });
          return Mavo.Data.proxify(ret);
        },
        precedence: 2
      },
      "as": {
        symbol: "as",
        code: function code(property, name) {
          if (property !== undefined && $.type(property) === "array" && name !== undefined) {
            var ret = property.slice();

            if (!Array.isArray(name) && $.value(name, Mavo.toNode, "property") !== undefined) {
              ret[Mavo.as] = $.value(name, Mavo.toNode, "property");
              return ret;
            }

            if ($.type(name) === "string") {
              ret[Mavo.as] = name;
              return ret;
            }

            if ($.value(name[0], Mavo.toNode, "property") !== undefined) {
              ret[Mavo.as] = $.value(name[0], Mavo.toNode, "property");
              return ret;
            }

            return property;
          }

          return property;
        },
        precedence: 3
      }
    },
    getNumericalOperands: function getNumericalOperands(a, b) {
      if (isNaN(a) || isNaN(b)) {
        // Try comparing as dates
        var da = $u.date(a),
            db = $u.date(b);

        if (da && db) {
          // Both valid dates
          return [da, db];
        }
      }

      return [a, b];
    },
    childProperties: ["arguments", "argument", "callee", "left", "right", "elements", "test", "consequent", "alternate", "object", "body"],

    /**
     * Recursively execute a callback on this node and all its children
     */
    walk: function walk(node, callback) {
      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var property = arguments.length > 3 ? arguments[3] : undefined;
      var parent = arguments.length > 4 ? arguments[4] : undefined;

      if (!o.type || node.type === o.type) {
        var ret = callback(node, property, parent);
      }

      if (!o.ignore || o.ignore.indexOf(node.type) === -1) {
        _.childProperties.forEach(function (property) {
          if (node[property]) {
            _.walk(node[property], callback, o, property, node);
          }
        });
      }

      if (ret !== undefined && parent) {
        // Apply transformations after walking, otherwise it may recurse infinitely
        parent[property] = ret;
      }

      return ret;
    },

    /**
     * These serializers transform the AST into JS
     */
    serializers: {
      "BinaryExpression": function BinaryExpression(node) {
        return "".concat(_.serialize(node.left), " ").concat(node.operator, " ").concat(_.serialize(node.right));
      },
      "UnaryExpression": function UnaryExpression(node) {
        return "".concat(node.operator).concat(_.serialize(node.argument));
      },
      "CallExpression": function CallExpression(node) {
        var nameSerialized = _.serialize(node.callee);

        var argsSerialized = node.arguments.map(_.serialize);

        if (node.callee.type == "Identifier") {
          // Clashes with native prototype methods? If so, look first in Function trap
          var clashes = [Array, String, Number].some(function (c) {
            return node.callee.name in c.prototype;
          });

          if (clashes) {
            nameSerialized = "Mavo.Functions.".concat(nameSerialized.toLowerCase(), " || ").concat(nameSerialized);
          }

          if (node.callee.name === "scope") {
            var withCode = "with (Mavo.Script.subScope(scope, $this) || {}) { return (".concat(_.serialize(node.arguments[1]), "); }");
            return "(function() {\n\t\t\t\t\t\tvar scope = ".concat(_.serialize(node.arguments[0]), ";\n\t\t\t\t\t\tif (Array.isArray(scope)) {\n\t\t\t\t\t\t\treturn scope.map(function(scope) {\n\t\t\t\t\t\t\t\t").concat(withCode, "\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t").concat(withCode, "\n\t\t\t\t\t})()");
          }

          if (clashes) {
            if (node.callee.type == "MemberExpression") {
              var thisArg = ", " + _.serialize(node.callee.object);
            }

            return "call(".concat(nameSerialized, ", [").concat(argsSerialized.join(", "), "]").concat(thisArg || "", ")");
          }
        }

        return "".concat(nameSerialized, "(").concat(argsSerialized.join(", "), ")");
      },
      "ConditionalExpression": function ConditionalExpression(node) {
        return "".concat(_.serialize(node.test), "? ").concat(_.serialize(node.consequent), " : ").concat(_.serialize(node.alternate));
      },
      "MemberExpression": function MemberExpression(node) {
        var property = node.computed ? _.serialize(node.property) : "\"".concat(node.property.name, "\"");
        return "get(".concat(_.serialize(node.object), ", ").concat(property, ")");
      },
      "ArrayExpression": function ArrayExpression(node) {
        return "[".concat(node.elements.map(_.serialize).join(", "), "]");
      },
      "Literal": function Literal(node) {
        return node.raw.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
      },
      "Identifier": function Identifier(node) {
        return node.name;
      },
      "ThisExpression": function ThisExpression(node) {
        return "this";
      },
      "Compound": function Compound(node) {
        return node.body.map(_.serialize).join(", ");
      }
    },

    /**
     * These are run before the serializers and transform the expression to support MavoScript
     */
    transformations: {
      "BinaryExpression": function BinaryExpression(node) {
        var name = _.getOperatorName(node.operator);

        var def = _.operators[name]; // Operator-specific transformations

        if (def.transformation) {
          def.transformation(node);
        }

        var nodeLeft = node;
        var ret = {
          type: "CallExpression",
          arguments: [],
          callee: {
            type: "Identifier",
            name: name
          }
        };

        if (def.comparison) {
          // Flatten comparison operator calls. If all comparison
          // operators are the same, flatten into one call (to maintain
          // simplicity of output):
          // 3 < 4 < 5 becomes lt(3, 4, 5).
          // Otherwise, assemble an argument list like so:
          // 3 < 4 = 5 becomes compare(3, "lt", 4, "eq", 5).
          // Create list of {comparison, operand} objects
          var comparisonOperands = [];

          do {
            var operatorName = _.getOperatorName(nodeLeft.operator); // e.g. "lt"


            comparisonOperands.unshift({
              comparison: operatorName,
              operand: nodeLeft.right
            });
            nodeLeft = nodeLeft.left;
          } while (def.flatten !== false && _.isComparisonOperator(nodeLeft.operator)); // Determine if all comparison operators are the same


          var comparisonsHeterogeneous = false;

          for (var i = 0; i < comparisonOperands.length - 1; i++) {
            if (comparisonOperands[i].comparison != comparisonOperands[i + 1].comparison) {
              comparisonsHeterogeneous = true;
              break;
            }
          } // Assemble final callee and argument list


          ret.arguments.push(nodeLeft); // first operand

          if (comparisonsHeterogeneous) {
            ret.callee.name = "compare";
            comparisonOperands.forEach(function (co) {
              ret.arguments.push({
                type: "Literal",
                value: co.comparison,
                raw: "\"".concat(co.comparison, "\"")
              });
              ret.arguments.push(co.operand);
            });
          } else {
            comparisonOperands.forEach(function (co) {
              ret.arguments.push(co.operand);
            });
          }
        } else {
          // Flatten same operator calls
          do {
            ret.arguments.unshift(nodeLeft.right);
            nodeLeft = nodeLeft.left;
          } while (def.flatten !== false && _.getOperatorName(nodeLeft.operator) === name);

          ret.arguments.unshift(nodeLeft);
        } // Operator-specific transformations


        if (def.postFlattenTransformation) {
          def.postFlattenTransformation(ret);
        }

        return ret;
      },
      "UnaryExpression": function UnaryExpression(node) {
        var name = _.getOperatorName(node.operator, true);

        if (name) {
          return {
            type: "CallExpression",
            arguments: [node.argument],
            callee: {
              type: "Identifier",
              name: name
            }
          };
        }
      },
      "CallExpression": function CallExpression(node) {
        if (node.callee.type == "Identifier") {
          if (node.callee.name == "if") {
            node.callee.name = "iff"; // Traverse data actions inside if() and rewrite them to their *if() counterpart

            var condition = node.arguments[0];

            for (var i = 1; i < node.arguments.length; i++) {
              if (i == 2) {
                // Else, negate condition
                condition = _.parse("not()");
                condition.arguments.push(node.arguments[0]);
              }

              _.walk(node.arguments[i], function (n) {
                var name = n.callee.name;

                if (Mavo.Actions.Functions.hasOwnProperty(name) // is a data action
                && !/if$/.test(name) // and not already the *if() version of itself
                ) {
                    n.callee.name += "if"; // Add condition as first argument of *if() function

                    n.arguments.unshift(condition);
                  }
              }, {
                type: "CallExpression"
              });
            }
          } else if (node.callee.name == "delete") {
            node.callee.name = "clear";
          } else {
            var def = Mavo.Functions[node.callee.name];

            if (def && def.needsContext) {
              // Why not function.call(...)? Because it's a more drastic change.
              node.arguments.unshift({
                type: "Identifier",
                name: "$this"
              });
            }
          }
        }
      },
      "ThisExpression": function ThisExpression(node) {
        return {
          type: "Identifier",
          name: "$this"
        };
      }
    },
    serialize: function serialize(node) {
      var ret = _.transformations[node.type] && _.transformations[node.type](node);

      if (_typeof(ret) == "object" && ret && ret.type) {
        node = ret;
      } else if (ret !== undefined) {
        return ret;
      }

      return _.serializers[node.type](node);
    },
    rewrite: function rewrite(code) {
      try {
        return _.serialize(_.parse(code));
      } catch (e) {
        // Parsing as MavoScript failed, falling back to plain JS
        return code;
      }
    },
    compile: function compile(code) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!/\S/.test(code)) {
        // If code contains only whitespace, including in particular if
        // code is just the empty string, treat it as an expression that
        // evaluates to an empty string. This is consistent with
        // interpreting bare words as their corresponding strings.
        return function () {
          return "";
        };
      }

      code = _.rewrite(code);
      code = "with (Mavo.Data.stub)\n\twith (data || {}) {\n\t\treturn (".concat(code, ");\n\t}");

      if (o.actions) {
        // Yes this is a horrible, horrible hack and I’m truly ashamed.
        // If you understand the reasons and can think of a better way, be my guest!
        code = "\nMavo.Actions._running = Mavo.Actions.running;\nMavo.Actions.running = true;\n".concat(code, "\nMavo.Actions.running = Mavo.Actions._running;");
      }

      return new Function("data", code);
    },
    parse: self.jsep,
    // This is used for scope() rewriting, to support $this passing through
    subScope: function subScope(proxy, $this) {
      var unscopables = Object.keys($this).reduce(function (o, k) {
        o[k] = true;
        return o;
      }, {
        $this: true
      });

      if (!proxy || _typeof(proxy) !== "object") {
        return proxy;
      }

      return new Proxy(proxy, {
        get: function get(t, property, r) {
          if (property === Symbol.unscopables) {
            return unscopables;
          }

          return Reflect.get(t, property, r);
        }
      });
    }
  };

  _.serializers.LogicalExpression = _.serializers.BinaryExpression;
  _.transformations.LogicalExpression = _.transformations.BinaryExpression;

  for (var name in _.operators) {
    var details = _.operators[name];

    if (details.scalar && details.scalar.length < 2) {
      var ret = _.addUnaryOperator(name, details);
    } else {
      var ret = _.addBinaryOperator(name, details);
    }

    details.code = details.code || ret;

    if (ret && details["export"] !== false) {
      Mavo.Functions[name] = ret;
    }
  } // Takes a list of arguments that consist of interleaved operands and strings
  // representing comparison operations, and returns the result of evaluating the
  // chained comparison.
  // e.g. compare(3, "lt", 4, "lt", 5) means 3 < 4 < 5, or (3 < 4) && (4 < 5)


  Mavo.Functions.compare = function () {
    var result = true;

    for (var i = 2; i < arguments.length; i += 2) {
      var a = i - 2 < 0 || arguments.length <= i - 2 ? undefined : arguments[i - 2];
      var op = i - 1 < 0 || arguments.length <= i - 1 ? undefined : arguments[i - 1];
      var b = i < 0 || arguments.length <= i ? undefined : arguments[i];

      var term = _.binaryOperation(a, b, Mavo.Script.operators[op]);

      result = _.binaryOperation(result, term, Mavo.Script.operators["and"]);
    }

    return result;
  };
})(Bliss, Mavo.value, Mavo.Functions.util);

(function ($, $$) {
  Mavo.attributes.push("mv-action");

  var _ = Mavo.Actions = {
    listener: function listener(evt) {
      var tag = evt.type === "submit" ? "form" : ":not(form)";
      var element = evt.target.closest(tag + "[mv-action]");

      if (!element) {
        return; // Not an action
      }

      var node = Mavo.Node.get(element);

      if (node && node.editing) {
        // If this is a node, and being edited, we don't want to have the action interfering.
        return;
      }

      if (evt.type === "submit") {
        evt.preventDefault();
      }

      if (element) {
        _.run(element.getAttribute("mv-action"), element, evt);
      }
    },
    run: function run(code, element, evt) {
      if (code) {
        var node = Mavo.Node.getClosest(element);

        if (node) {
          var expression = new Mavo.Expression(code);
          var previousEvt = Mavo.Functions.$evt;
          Mavo.Functions.$evt = evt;
          var ret = expression.eval(node.getLiveData(), {
            actions: true
          });
          Mavo.Functions.$evt = previousEvt;
          return ret;
        }
      }
    },
    getNodes: function getNodes(ref) {
      var node = _.getNode(ref);

      if (node) {
        return [node];
      }

      return Mavo.toArray(ref).map(function (n) {
        return _.getNode(n);
      }).filter(function (n) {
        return n !== undefined;
      });
    },
    getNode: function getNode(node) {
      if (node instanceof Mavo.Node) {
        return node;
      } else if (node && node[Mavo.toNode]) {
        return node[Mavo.toNode];
      }
    },
    getCollection: function getCollection(ref) {
      var collection = _.getNode(ref);

      if (collection instanceof Mavo.Collection) {
        return collection;
      } // ref is not a collection. Either it's an item or we don't have a collection


      return collection ? collection.collection : null;
    },
    // Function to run instead of actions if actions are called outside mv-action
    nope: function nope() {
      var actions = Object.keys(_.Functions).map(function (name) {
        return "".concat(name, "()");
      });
      Mavo.warn("Mavo actions (".concat(actions, ") can only be used in the mv-action attribute."));
    },
    Functions: {
      /**
       * @param data (Optional) data of new item(s)
       * @param ref Collection to add to
       * @param index {Number} index of new item(s).
       * @returns Newly added item(s)
       */
      add: function add(data, ref, index) {
        if (arguments.length < 3) {
          if (arguments.length <= 1) {
            // add(ref) signature used
            var _ref15 = [undefined, data];
            data = _ref15[0];
            ref = _ref15[1];
          } else if (arguments.length === 2) {
            // Is it (data, ref) or (ref, index)?
            // ref might be a number, if collection of numbers!
            var collection = _.getCollection(ref);

            if (!collection) {
              // No collection from ref, must be (ref, index)
              collection = _.getCollection(data);

              if (collection) {
                // Yup, it's (ref, index)
                var _ref16 = [undefined, data, ref];
                data = _ref16[0];
                ref = _ref16[1];
                index = _ref16[2];
              }
            }
          }
        }

        if (!ref) {
          return;
        }

        collection = collection || _.getCollection(ref);

        if (!collection) {
          Mavo.warn("No collection or collection item provided to add().", {
            once: false
          });
          return data;
        }

        if (index === undefined) {
          // If there is no index and item provided instead of collection,
          // get index from collection item
          var node = _.getNode(ref);

          if (node !== collection) {
            index = node.index;
          }
        }

        return (Array.isArray(data) ? data : [data]).map(function (datum) {
          var item = collection.add(undefined, index);

          if (datum !== undefined) {
            item.render(datum);
          }

          if (collection.editing) {
            collection.editItem(item);
          }

          return item.getLiveData();
        });
      },

      /**
       * @param from {Mavo.Node|Array<Mavo.Node>} one or more items to move
       * @param to where to move to, item or collection. Optional
       * @param index {Number} index. Optional
       * @returns Moved item(s)
       */
      move: function move(from, to, index) {
        if (!from || to === undefined) {
          return;
        }

        var toNode = _.getNode(to);

        if ($.type(to) == "number" && !(toNode && toNode.collection)) {
          // If to is a number and not a collection item, it's an index
          var _ref17 = [to];
          index = _ref17[0];
          to = _ref17[1];
        }

        var fromNodes = Mavo.toArray(from).map(_.getNode).filter(function (n) {
          return n && n.closestCollection;
        });
        var collection = (toNode || fromNodes[0]).closestCollection;

        if (!fromNodes.length) {
          if (collection) {
            Mavo.warn("First parameter of move() was not a collection or collection item, using add() instead.", {
              once: false
            });
            return _.Functions.add(from, collection, index);
          } else {
            Mavo.warn("You need to provide at least one collection or collection item for move() to have something to do.", {
              once: false
            });
            return from;
          }
        }

        var ret = _.Functions.add(from, collection, index);

        Mavo.Collection["delete"](fromNodes, {
          silent: true
        });
        return ret;
      },

      /**
       * @param ref Items to delete
       */
      clear: function clear() {
        for (var _len12 = arguments.length, ref = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          ref[_key12] = arguments[_key12];
        }

        if (!ref.length || !ref[0]) {
          return;
        }

        var nodes = _.getNodes(Mavo.flatten(ref));

        var itemsToDelete = [];
        nodes.forEach(function (node) {
          if (!node) {
            return;
          }

          if (node instanceof Mavo.Collection) {
            // Clear collection
            itemsToDelete.push.apply(itemsToDelete, _toConsumableArray(node.children));
          } else if (node.collection) {
            // Collection item, delete
            itemsToDelete.push(node);
          } else {
            // Ordinary node, just clear its data
            node.walk(function (n) {
              if (n instanceof Mavo.Primitive) {
                n.value = null;
              } else if (n !== node) {
                _.clear(n);
              }
            });
          }
        });
        Mavo.Collection["delete"](itemsToDelete);
        return nodes.map(function (n) {
          return n.getLiveData();
        });
      },
      clearif: function clearif(condition) {
        var _$Functions;

        for (var _len13 = arguments.length, targets = new Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
          targets[_key13 - 1] = arguments[_key13];
        }

        targets = targets.map(function (t) {
          return Mavo.Functions.iff(condition, t);
        });
        return (_$Functions = _.Functions).clear.apply(_$Functions, _toConsumableArray(targets));
      },

      /**
       * Set node(s) to value(s)
       * If ref is a single node or a collection, render values on it
       * If ref is multiple nodes, set it to corresponding value
       * If ref is multiple nodes and values is not an array, set all nodes to values
       */
      set: function set(ref, values) {
        if (!ref) {
          return;
        }

        var node = _.getNode(ref);

        if (node) {
          // Single node, render values on it
          node.render(values);
        } else {
          var wasArray = Array.isArray(ref);

          var nodes = _.getNodes(ref);

          if (!nodes.length) {
            Mavo.warn("The first parameter of set() needs to be one or more existing properties, ".concat(Mavo.safeToJSON(ref), " is not."));
          } else {
            Mavo.Script.binaryOperation(wasArray ? nodes : nodes[0], values, {
              scalar: function scalar(node, value) {
                return node ? node.render(value) : null;
              }
            });
          }
        }

        return values;
      }
    }
  }; // Create *if() versions of data actions


  var _loop4 = function _loop4(name) {
    var nameif = name + "if";

    if (!(nameif in _.Functions)) {
      _.Functions[nameif] = function (condition, target) {
        var _$Functions2;

        target = Mavo.Functions.iff(condition, target);

        for (var _len14 = arguments.length, rest = new Array(_len14 > 2 ? _len14 - 2 : 0), _key14 = 2; _key14 < _len14; _key14++) {
          rest[_key14 - 2] = arguments[_key14];
        }

        return Mavo.value(condition) ? (_$Functions2 = _.Functions)[name].apply(_$Functions2, [target].concat(rest)) : null;
      };
    }
  };

  for (var name in _.Functions) {
    _loop4(name);
  }

  _.Functions.deleteif = _.Functions.clearif;
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Data = $.Class(
  /*#__PURE__*/
  function () {
    function Data(node, data) {
      _classCallCheck(this, Data);

      this.node = node;

      if (data !== undefined) {
        this.data = data;
      }
    }

    _createClass(Data, [{
      key: "proxify",
      value: function proxify() {
        return _.proxify(this.data);
      }
    }, {
      key: "update",
      value: function update() {
        if (this.node instanceof Mavo.Collection || this.node instanceof Mavo.ImplicitCollection) {
          // TODO eventually we should do more granular updates than this O(N) stuff
          this.data.length = 0;

          for (var i = 0; i < this.node.children.length; i++) {
            this.data[i] = this.node.children[i].liveData.data;
          }

          if (this.node instanceof Mavo.ImplicitCollection) {
            // Implicit collections drop nulls
            Mavo.filter(this.data, function (data) {
              return Mavo.value(data) !== null;
            }); // Implicit collections can alternate between arrays and singletons
            // depending on which items are null

            this.updateParent();
          }
        } else if (this.node instanceof Mavo.Primitive) {
          var value = this.node.value;

          if (this.node.isDataNull({
            live: true
          })) {
            value = null;
          }

          this.data = Mavo.objectify(value);
          var type = $.type(value);

          if (type === "object" || type === "array") {
            // Object rendered on a primitive, we should traverse it and store its properties
            _.computeRoutes(this.data);
          } else {
            _.computeMetadata(this.data, this.key, this.parent);
          }

          this.updateParent();
        }
      }
    }, {
      key: "updateParent",
      value: function updateParent() {
        if (!this.parent) {
          return;
        }

        if (this.node instanceof Mavo.ImplicitCollection) {
          // Is implicit collection
          // See https://github.com/LeaVerou/mavo/issues/50#issuecomment-266079652
          var data = this.data.length === 1 ? this.data[0] : this.data;
          this.parent.set(this.node.property, data, true);
        } else if (this.collection instanceof Mavo.ImplicitCollection) {
          // Is implicit collection *Item*
          this.parent.update();
        } else {
          var key = this.key,
              isDeleted = false;

          if (this.collection instanceof Mavo.Collection) {
            // Is collection item, check if deleted
            isDeleted = this.collection.children[this.node.index] !== this.node;
          }

          if (key !== undefined && !isDeleted) {
            this.parent.set(key, this.data, true);
          }
        }
      }
    }, {
      key: "set",
      value: function set(property, value, shallow) {
        this.data[property] = value;

        _["computeRoute" + (shallow ? "" : "s")](value, property, this.data);
      }
    }, {
      key: "updateKey",
      value: function updateKey() {
        var oldKey = this._key;

        if (this.parent[oldKey] === this.data) {
          delete this.parent[oldKey];
        }

        this.updateParent();
      }
    }, {
      key: "resolve",
      value: function resolve(property) {
        return _.resolve(property, this.data);
      }
    }, {
      key: "parent",
      get: function get() {
        var parent = this.node.parent;
        return parent ? parent.liveData : null;
      }
    }, {
      key: "collection",
      get: function get() {
        return this.node.collection;
      }
    }, {
      key: "key",
      get: function get() {
        return this._key = this.collection ? this.node.index : this.node.property;
      }
    }]);

    return Data;
  }(), {
    live: {
      data: function data(_data2) {
        if (_data2 !== this._data) {
          this.isArray = Array.isArray(_data2);
          this._data = _data2;
          _data2[Mavo.toNode] = this.node;
          _data2[Mavo.parent] = this.parent && this.parent.data;
          _data2[Mavo.mavo] = this.node.mavo;
          this.proxy = this.proxify();
          this.updateParent();
          return this._data;
        }
      }
    },
    "static": {
      // The context for expression evaluation
      stub: self.Proxy ? new Proxy(_defineProperty({}, Symbol.unscopables, {
        data: true,
        undefined: true
      }), {
        get: function get(data, property) {
          var ret = Reflect.get(data, property);

          if (ret !== undefined || typeof property !== "string") {
            return ret;
          }

          var propertyL = property.toLowerCase(); // Is this a data action function?

          if (propertyL in Mavo.Actions.Functions) {
            if (Mavo.Actions.running) {
              ret = Mavo.Actions.Functions[propertyL];
            } else {
              ret = Mavo.Actions.nope;
            }
          } // Is this a Mavo function?


          if (propertyL in Mavo.Functions) {
            ret = Mavo.Functions[propertyL];
          } else {
            // Maybe it's a Math function?
            ret = Math[property] || Math[propertyL] || ret;
          }

          if (ret !== undefined) {
            if (typeof ret === "function") {
              // For when function names are used as unquoted strings, see #160
              ret.toString = function () {
                return property;
              };
            }

            return ret;
          } // Still not found? Maybe it's a global


          if (typeof window !== "undefined" && window.hasOwnProperty(property)) {
            // hasOwnProperty to avoid elements with ids clobbering globals
            return window[property];
          } // Still not found? Maybe it's a special property used without a $ (see #343)


          if (property[0] !== "$") {
            var $property = "$" + property.toLowerCase();

            if ($property in Mavo.Functions) {
              return Mavo.Functions[$property];
            }
          } // Prevent undefined at all costs


          return property;
        },
        has: function has(data, property) {
          return Reflect.has(data, property) || typeof property === "string";
        }
      }) : Mavo.Functions,
      isItem: function isItem(data) {
        return Array.isArray($.value(data, Mavo.parent));
      },
      closest: function closest(obj, test) {
        var path = [];

        do {
          if (test(obj)) {
            return {
              value: obj,
              path: path
            };
          }

          path.push(obj[Mavo.property]);
        } while (obj = obj[Mavo.parent]);

        return {
          value: null,
          path: path
        };
      },
      root: function root(obj) {
        return _.closest(obj, function (o) {
          return !o[Mavo.parent];
        });
      },
      closestItem: function closestItem(obj) {
        return _.closest(obj, _.isItem);
      },
      closestArray: function closestArray(obj) {
        return _.closest(obj, Array.isArray);
      },
      getProperty: function getProperty(data) {
        var ret = _.isItem(data) ? data[Mavo.parent] : data;
        return ret[Mavo.property];
      },
      find: function find(property, data) {
        var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!data || o.exclude === data) {
          return;
        }

        if (Mavo["in"](property, data) && o.exclude !== data[property]) {
          return data[property];
        }

        if (!data[Mavo.route] || !Mavo["in"](property, data[Mavo.route])) {
          if (data[Mavo.property] === property) {
            return data;
          }

          if (_.isItem(data) && _.getProperty(data) === property) {
            // Inside collection items we want their property name
            // to return the current item, not the entire collection
            return data;
          }

          if (Array.isArray(data)) {
            // Perhaps it's an array of nodes, such as the one created with deep references?
            var ret = data.map(function (a) {
              return _.find(property, a);
            }).filter(function (x) {
              return x !== undefined;
            });

            if (ret.length) {
              return Mavo.flatten(ret);
            }
          }

          return;
        }

        var results = [],
            returnArray = Array.isArray(data),
            ret;
        results[Mavo.route] = {};
        results[Mavo.mavo] = data[Mavo.mavo];

        var findDown = function findDown(prop) {
          var ret = _.find(property, data[prop], o);

          if (ret !== undefined) {
            // FIXME How do we set a sensible Mavo.route when the returned array is empty?
            // E.g. because we were pointing to inner elements of a collection that currently has no items.
            if (Mavo["in"](Mavo.route, ret)) {
              for (var p in ret[Mavo.route]) {
                results[Mavo.route][p] = true;
              }
            }

            if (Array.isArray(ret)) {
              results.push.apply(results, _toConsumableArray(ret));
              returnArray = true;
            } else {
              results.push(ret);
            }
          }
        };

        if (Array.isArray(data) || data[Mavo.route][property] === true) {
          for (var prop in data) {
            findDown(prop);
          }
        } else {
          data[Mavo.route][property].forEach(findDown);
        }

        return returnArray || results.length > 1 ? results : results[0];
      },
      // First look in descendants, then ancestors and their descendants
      // one level up at a time (excluding the subtree we've already explored)
      findUp: function findUp(property, data) {
        var parent = data;
        var child;

        do {
          var ret = _.find(property, parent, {
            exclude: child
          });

          if (ret !== undefined) {
            return ret;
          }

          if (_.getProperty(parent) === property) {
            return parent;
          }

          child = parent;
          parent = parent[Mavo.parent];
        } while (parent);
      },
      resolve: function resolve(property, data) {
        if (property === Mavo.isProxy) {
          return true;
        }

        if (_typeof(property) === "symbol") {
          // We can't do much for symbols
          return data[property];
        }

        var ret;
        var propertyIsNumeric = !isNaN(property);

        if (property in data) {
          ret = data[property];
        } else if (!propertyIsNumeric) {
          // Property does not exist on data, if non-numeric, look for it elsewhere
          if (property in _.special) {
            // $special properties
            ret = _.special[property](data);
          } else if (data[Mavo.mavo]) {
            var all = data[Mavo.mavo].root.liveData.data[Mavo.route];

            if (Mavo["in"](property, all)) {
              ret = _.findUp(property, data);
            }
          } else if (Mavo["in"](Mavo.route, data) && Mavo["in"](property, data[Mavo.route])) {
            ret = _.find(property, data);
          }
        }

        if (!propertyIsNumeric) {
          var propertyL = property.toLowerCase();
        }

        if (ret !== undefined) {
          if (typeof ret !== "function") {
            var func = Mavo.Functions[propertyL] || Mavo.Actions.Functions[propertyL] || Math[propertyL];

            if (func) {
              // Function and property of the same name, which one do we need? (rel #227)
              // Must make the returned value callable to prevent errors!
              ret = Mavo.primitivify(function () {
                return func.apply(void 0, arguments);
              }, ret);
            }
          } // Should we proxify value before returning it? Is it data?


          var proxify = ret !== null && _typeof(ret) === "object" // Can be a proxy
          && (Mavo.route in ret || Mavo.toNode in ret); // Either has a route or comes from a node

          return !proxify ? ret : _.proxify(ret);
        }

        if (!propertyIsNumeric) {
          // Does it reference another Mavo?
          if (property in Mavo.all && isNaN(property) && Mavo.all[property].root) {
            return Mavo.all[property].root.getLiveData();
          } // Still not found? Maybe it's a special property used without a $ (see #343)


          if (property[0] !== "$") {
            var $property = "$" + propertyL;

            if ($property in _.special) {
              return _.resolve($property, data);
            }
          }
        }
      },
      has: function has(property, data) {
        // We don't care about priority here, just whether they exist
        // so we'll make the fastest searches first.
        if (property === Mavo.isProxy) {
          return true;
        }

        if (typeof property !== "string") {
          return Reflect.has(data, property);
        }

        var objects = [data, Mavo.all, _.special];

        if (objects.some(function (obj) {
          return property in obj;
        })) {
          return true;
        }

        if (typeof property === "string") {
          var propertyL = property.toLowerCase();

          if (propertyL !== property && objects.some(function (obj) {
            return propertyL in obj;
          })) {
            return true;
          }

          ;

          if (propertyL[0] !== "$" && "$" + propertyL in _.special) {
            return true;
          }
        } // Slowest search last: Is the property present anywhere in the data?


        if (data[Mavo.mavo]) {
          return Mavo["in"](property, data[Mavo.mavo].root.liveData.data[Mavo.route]);
        }
      },
      proxify: function proxify(data) {
        if (!data || _typeof(data) !== "object" || !self.Proxy || data[Mavo.isProxy]) {
          // Data is a primitive, proxies are not supported, or is already a proxy
          return data;
        }

        return new Proxy(data, {
          get: function get(data, property, proxy) {
            return _.resolve(property, data);
          },
          has: function has(data, property) {
            return _.has(property, data);
          },
          set: function set(data) {
            var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var value = arguments.length > 2 ? arguments[2] : undefined;

            if (_typeof(property) !== "symbol") {
              Mavo.warn("You cannot set data via expressions. Attempt to set ".concat(property.toString(), " to ").concat(value, " ignored."));
              return value;
            }

            return Reflect.set(data, property, value);
          }
        });
      },
      computeMetadata: function computeMetadata(object, property, parent) {
        if (object && _typeof(object) === "object") {
          // not primitive
          if (property !== undefined) {
            object[Mavo.property] = property;
          }

          if (parent && !object[Mavo.parent]) {
            object[Mavo.parent] = parent;
          }
        }
      },
      computeRoute: function computeRoute(object, property, parent) {
        var type = $.type(object);

        _.computeMetadata(object, property, parent);

        if (type == "object" || type == "array") {
          if (!object[Mavo.route]) {
            object[Mavo.route] = {};
          }
        }

        if ($.type(property) !== "number") {
          var child = object;

          while (parent) {
            if (!parent[Mavo.route]) {
              parent[Mavo.route] = {};
            } // parent[up] = child


            var up = child && child[Mavo.property];

            if (up && parent[Mavo.route][property] !== true) {
              if (!parent[Mavo.route][property]) {
                parent[Mavo.route][property] = new Set();
              }

              if (parent[Mavo.route][property].has(up)) {
                // We've already computed routes on this subtree
                break;
              }

              parent[Mavo.route][property].add(up);
            } else {
              parent[Mavo.route][property] = true;
            }

            child = parent;
            parent = parent[Mavo.parent];
          }
        }
      },
      computeRoutes: function computeRoutes(object, property, parent) {
        _.traverse(_.computeRoute, object, property, parent);
      },
      // Recursively traverse a JSON structure
      // Warning: No cycle detection. Will loop infinitely if there are cycles
      traverseDown: function traverseDown(callback, object, property, parent) {
        if (Array.isArray(object)) {
          object.forEach(function (item, i) {
            return _.traverse(callback, item, i, object);
          });
        } else if ($.type(object) === "object") {
          for (var prop in object) {
            _.traverse(callback, object[prop], prop, object);
          }
        }
      },
      traverse: function traverse(callback, object, property, parent) {
        callback(object, property, parent);

        _.traverseDown(callback, object, property, parent);
      },
      special: {
        $index: function $index(obj) {
          var closestItem = _.closestItem(obj).value;

          if (!closestItem) {
            return -1;
          }

          var property = closestItem[Mavo.property];

          if (isNaN(property)) {
            // Is an array item but its property is not a number! Search the array.
            // This happens with Implicit Collections of only 1 item.
            return closestItem[Mavo.parent].indexOf(closestItem);
          }

          return property;
        },
        $item: function $item(obj) {
          return _.closestItem(obj).value;
        },
        $all: function $all(obj) {
          var arr = _.closestArray(obj);

          var path = arr.path.reverse().slice(1); // Drop index

          var ret = arr.value.map(function (a) {
            return $.value.apply($, [a].concat(_toConsumableArray(path)));
          });

          if (ret.length > 0 && ret[0][Mavo.route]) {
            ret[Mavo.route] = $.each(ret[0][Mavo.route], function (p, v) {
              return true;
            });
            ret[Mavo.mavo] = ret[0][Mavo.mavo];
          }

          return ret;
        },
        $next: function $next(obj) {
          var arr = _.closestArray(obj);

          var path = arr.path.reverse();
          var index = arr.path[0];
          path = path.slice(1);
          var nextClosestItem = $.value(arr.value, index + 1);
          return nextClosestItem ? $.value.apply($, [nextClosestItem].concat(_toConsumableArray(path))) : null;
        },
        $previous: function $previous(obj) {
          var arr = _.closestArray(obj);

          var path = arr.path.reverse();
          var index = arr.path[0];
          path = path.slice(1);
          var prevClosestItem = $.value(arr.value, index - 1);
          return prevClosestItem ? $.value.apply($, [prevClosestItem].concat(_toConsumableArray(path))) : null;
        },
        $this: function $this(obj) {
          return obj;
        }
      }
    }
  });
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Backend.register($.Class({
    "extends": Mavo.Backend,
    id: "Dropbox",
    constructor: function constructor() {
      this.permissions.on(["login", "read"]);
      this.key = this.mavo.element.getAttribute("mv-dropbox-key") || "2mx6061p054bpbp";
      this.login(true);
    },
    update: function update(url, o) {
      this["super"].update.call(this, url, o);
      this.url = _.fixShareURL(this.url);
    },
    upload: function upload(file, path) {
      var _this74 = this;

      path = this.path.replace(/[^/]+$/, "") + path;
      return this.put(file, path).then(function (fileInfo) {
        return _this74.getURL(path);
      });
    },
    getURL: function getURL(path) {
      return this.request("sharing/create_shared_link_with_settings", {
        path: path
      }, "POST").then(function (shareInfo) {
        return _.fixShareURL(shareInfo.url);
      });
    },

    /**
     * Saves a file to the backend.
     * @param {Object} file - An object with name & data keys
     * @return {Promise} A promise that resolves when the file is saved.
     */
    put: function put(serialized) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.path;
      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request("https://content.dropboxapi.com/2/files/upload", serialized, "POST", {
        headers: {
          "Dropbox-API-Arg": JSON.stringify({
            path: path,
            mode: "overwrite"
          }),
          "Content-Type": "application/octet-stream"
        }
      });
    },
    oAuthParams: function oAuthParams() {
      return "&redirect_uri=".concat(encodeURIComponent("https://auth.mavo.io"), "&response_type=code");
    },
    getUser: function getUser() {
      var _this75 = this;

      if (this.user) {
        return Promise.resolve(this.user);
      }

      return this.request("users/get_current_account", "null", "POST").then(function (info) {
        _this75.user = {
          username: info.email,
          name: info.name.display_name,
          avatar: info.profile_photo_url,
          info: info
        };
        $.fire(_this75.mavo.element, "mv-login", {
          backend: _this75
        });
      });
    },
    login: function login(passive) {
      var _this76 = this;

      return this.oAuthenticate(passive).then(function () {
        return _this76.getUser();
      }).then(function (u) {
        if (_this76.user) {
          _this76.permissions.logout = true; // Check if can actually edit the file

          _this76.request("sharing/get_shared_link_metadata", {
            "url": _this76.source
          }, "POST").then(function (info) {
            _this76.path = info.path_lower;

            _this76.permissions.on(["edit", "save"]);
          });
        }
      });
    },
    logout: function logout() {
      return this.oAuthLogout();
    },
    "static": {
      apiDomain: "https://api.dropboxapi.com/2/",
      oAuth: "https://www.dropbox.com/oauth2/authorize",
      test: function test(url) {
        url = new URL(url, Mavo.base);
        return /dropbox.com/.test(url.host);
      },
      // Transform the dropbox shared URL into something raw and CORS-enabled
      fixShareURL: function fixShareURL(url) {
        url = new URL(url, Mavo.base);
        url.hostname = "dl.dropboxusercontent.com";
        url.search = url.search.replace(/\bdl=0|^$/, "raw=1");
        return url;
      }
    }
  }));
})(Bliss, Bliss.$);

(function ($, $$) {
  var _ = Mavo.Backend.register($.Class({
    "extends": Mavo.Backend,
    id: "Github",
    constructor: function constructor() {
      this.permissions.on(["login", "read"]);
      this.key = this.mavo.element.getAttribute("mv-github-key") || "7e08e016048000bc594e"; // Extract info for username, repo, branch, filepath from URL

      var extension = this.format.constructor.extensions[0] || ".json";
      this.defaults = {
        repo: "mv-data",
        filename: "".concat(this.mavo.id).concat(extension)
      };
      this.info = _.parseURL(this.source, this.defaults);
      $.extend(this, this.info);
      this.login(true);
    },
    update: function update(url, o) {
      this["super"].update.call(this, url, o);
      this.info = _.parseURL(this.source, this.defaults);
      $.extend(this, this.info);
    },
    get: function get(url) {
      if (this.isAuthenticated() || !this.path || url) {
        // Authenticated or raw API call
        var info = url ? _.parseURL(url) : this.info;

        if (info.apiData) {
          // GraphQL
          return this.request(info.apiCall, info.apiData, "POST").then(function (response) {
            if (response.errors && response.errors.length) {
              return Promise.reject(response.errors.map(function (x) {
                return x.message;
              }).join("\n"));
            }

            return response.data;
          });
        }

        return this.request(info.apiCall, null, "GET", {
          headers: {
            "Accept": "application/vnd.github.squirrel-girl-preview"
          }
        }).then(function (response) {
          return Promise.resolve(info.repo ? _.atob(response.content) : response);
        });
      } else {
        // Unauthenticated, use simple GET request to avoid rate limit
        url = new URL("https://raw.githubusercontent.com/".concat(this.username, "/").concat(this.repo, "/").concat(this.branch || "master", "/").concat(this.path));
        url.searchParams.set("timestamp", Date.now()); // ensure fresh copy

        return $.fetch(url.href).then(function (xhr) {
          return Promise.resolve(xhr.responseText);
        }, function () {
          return Promise.resolve(null);
        });
      }
    },
    upload: function upload(file) {
      var _this77 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.path;
      return Mavo.readFile(file).then(function (dataURL) {
        var base64 = dataURL.slice(5); // remove data:

        var media = base64.match(/^\w+\/[\w+]+/)[0];
        base64 = base64.replace(RegExp("^".concat(media, "(;base64)?,")), "");
        path = _this77.path.replace(/[^/]+$/, "") + path; // make upload path relative to existing path

        return _this77.put(base64, path, {
          isEncoded: true
        });
      }).then(function (fileInfo) {
        return _this77.getURL(path, fileInfo.commit.sha);
      });
    },

    /**
     * Saves a file to the backend.
     * @param {String} serialized - Serialized data
     * @param {String} path - Optional file path
     * @return {Promise} A promise that resolves when the file is saved.
     */
    put: function put(serialized) {
      var _this78 = this;

      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.path;
      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!path) {
        // Raw API calls are read-only for now
        return;
      }

      var repoCall = "repos/".concat(this.username, "/").concat(this.repo);
      var fileCall = "".concat(repoCall, "/contents/").concat(path);
      var commitPrefix = this.mavo.element.getAttribute("mv-github-commit-prefix") || ""; // Create repo if it doesn’t exist

      var repoInfo = this.repoInfo ? Promise.resolve(this.repoInfo) : this.request("user/repos", {
        name: this.repo
      }, "POST").then(function (repoInfo) {
        return _this78.repoInfo = repoInfo;
      });
      serialized = o.isEncoded ? serialized : _.btoa(serialized);
      return repoInfo.then(function (repoInfo) {
        if (!_this78.canPush()) {
          // Does not have permission to commit, create a fork
          return _this78.request("".concat(repoCall, "/forks"), {
            name: _this78.repo
          }, "POST").then(function (forkInfo) {
            fileCall = "repos/".concat(forkInfo.full_name, "/contents/").concat(path);
            return _this78.forkInfo = forkInfo;
          }).then(function (forkInfo) {
            // Ensure that fork is created (they take a while)
            var timeout;

            var test = function test(resolve, reject) {
              clearTimeout(timeout);

              _this78.request("repos/".concat(forkInfo.full_name, "/commits"), {
                until: "1970-01-01T00:00:00Z"
              }, "HEAD").then(function (x) {
                resolve(forkInfo);
              })["catch"](function (x) {
                // Try again after 1 second
                timeout = setTimeout(test, 1000);
              });
            };

            return new Promise(test);
          });
        }

        return repoInfo;
      }).then(function (repoInfo) {
        return _this78.request(fileCall, {
          ref: _this78.branch
        }).then(function (fileInfo) {
          return _this78.request(fileCall, {
            message: commitPrefix + _this78.mavo._("gh-updated-file", {
              name: fileInfo.name || "file"
            }),
            content: serialized,
            branch: _this78.branch,
            sha: fileInfo.sha
          }, "PUT");
        }, function (xhr) {
          if (xhr.status == 404) {
            // File does not exist, create it
            return _this78.request(fileCall, {
              message: commitPrefix + "Created file",
              content: serialized,
              branch: _this78.branch
            }, "PUT");
          }

          return xhr;
        });
      }).then(function (fileInfo) {
        // Storage points to current user's repo (but maybe they want to submit PR)
        if (_this78.repoInfo.fork) {
          // Ask if they want to send PR
          _this78.forkInfo = _this78.repoInfo.parent;

          _this78.request("repos/".concat(_this78.repoInfo.parent.owner.login, "/").concat(_this78.repoInfo.parent.name, "/pulls"), {
            head: "".concat(_this78.user.username, ":").concat(_this78.branch),
            base: _this78.repoInfo.parent.default_branch
          }).then(function (prs) {
            _this78.pullRequest(prs[0]);
          });
        } // Storage points to another user's repo
        else if (_this78.forkInfo) {
            // Update url to include storage = their fork
            var params = new URL(location).searchParams;
            params.append("storage", fileInfo.content.download_url);
            history.pushState({}, "", "".concat(location.pathname, "?").concat(params));
            location.replace("".concat(location.pathname, "?").concat(params)); // We saved in a fork, do we have a pull request?

            _this78.request("repos/".concat(_this78.username, "/").concat(_this78.repo, "/pulls"), {
              head: "".concat(_this78.user.username, ":").concat(_this78.branch),
              base: _this78.branch
            }).then(function (prs) {
              _this78.pullRequest(prs[0]);
            });
          }

        return fileInfo;
      });
    },
    pullRequest: function pullRequest(existing) {
      var _this79 = this;

      var previewURL = new URL(location);
      previewURL.searchParams.set(this.mavo.id + "-storage", "https://github.com/".concat(this.forkInfo.full_name, "/").concat(this.path));

      var message = this.mavo._("gh-edit-suggestion-saved-in-profile", {
        previewURL: previewURL
      });

      var lastNoticeName = "";

      if (this.notice) {
        lastNoticeName = this.notice.options.name;
        this.notice.element.style.transition = "none";
        this.notice.close();
      }

      if (existing) {
        var style = lastNoticeName === "closePR" ? {
          animation: "none",
          transition: "none"
        } : {};
        this.notice = this.mavo.message("".concat(message, "\n\t\t\t\t").concat(this.mavo._("gh-edit-suggestion-notreviewed"), "\n\t\t\t\t<form onsubmit=\"return false\">\n\t\t\t\t\t<button class=\"mv-danger\">").concat(this.mavo._("gh-edit-suggestion-revoke"), "</button>\n\t\t\t\t</form>"), {
          classes: "mv-inline",
          dismiss: ["button", "submit"],
          style: style,
          name: "closePR"
        });
        this.notice.element.style.transitionDuration = "400ms";
        this.notice.closed.then(function (form) {
          if (!form) {
            return;
          }

          var username;
          var repo;

          if (_this79.repoInfo.fork) {
            // Storage points to current user's repo (but they want to close PR)
            username = _this79.repoInfo.parent.owner.login;
            repo = _this79.repoInfo.parent.name;
          } else {
            // Storage points to another user's repo
            username = _this79.username;
            repo = _this79.repo;
          } // Close PR


          _this79.request("repos/".concat(username, "/").concat(repo, "/pulls/").concat(existing.number), {
            state: "closed"
          }, "POST").then(function (prInfo) {
            new Mavo.UI.Message(_this79.mavo, "<a href=\"".concat(prInfo.html_url, "\">").concat(_this79.mavo._("gh-edit-suggestion-cancelled"), "</a>"), {
              dismiss: ["button", "timeout"],
              style: style
            });

            _this79.pullRequest();
          });
        });
      } else {
        // Ask about creating a PR
        // We already have a pull request, ask about closing it
        var style = lastNoticeName === "createPR" ? {
          animation: "none",
          transition: "none"
        } : {};
        this.notice = this.mavo.message("".concat(message, "\n\t\t\t\t").concat(this.mavo._("gh-edit-suggestion-instructions"), "\n\t\t\t\t<form onsubmit=\"return false\">\n\t\t\t\t\t<textarea name=\"edits\" class=\"mv-autosize\" placeholder=\"").concat(this.mavo._("gh-edit-suggestion-reason-placeholder"), "\"></textarea>\n\t\t\t\t\t<button>").concat(this.mavo._("gh-edit-suggestion-send"), "</button>\n\t\t\t\t</form>"), {
          classes: "mv-inline",
          dismiss: ["button", "submit"],
          style: style,
          name: "createPR"
        });
        this.notice.element.style.transitionDuration = "400ms";
        this.notice.closed.then(function (form) {
          if (!form) {
            return;
          }

          var username;
          var repo;
          var base;

          if (_this79.repoInfo.fork) {
            // Storage points to current user's repo (but they want to send PR)
            username = _this79.repoInfo.parent.owner.login;
            repo = _this79.repoInfo.parent.name;
            base = _this79.repoInfo.parent.default_branch;
          } else {
            // Storage points to another user's repo
            username = _this79.username;
            repo = _this79.repo;
            base = _this79.branch;
          } // We want to send a pull request


          _this79.request("repos/".concat(username, "/").concat(repo, "/pulls"), {
            title: _this79.mavo._("gh-edit-suggestion-title"),
            body: _this79.mavo._("gh-edit-suggestion-body", {
              description: form.elements.edits.value,
              previewURL: previewURL
            }),
            head: "".concat(_this79.user.username, ":").concat(_this79.branch),
            base: base
          }, "POST").then(function (prInfo) {
            new Mavo.UI.Message(_this79.mavo, "<a href=\"".concat(prInfo.html_url, "\">").concat(_this79.mavo._("gh-edit-suggestion-sent"), "</a>"), {
              dismiss: ["button", "timeout"],
              style: style
            });

            _this79.pullRequest(prInfo);
          });
        });
      }
    },
    login: function login(passive) {
      var _this80 = this;

      return this.oAuthenticate(passive).then(function () {
        return _this80.getUser();
      })["catch"](function (xhr) {
        if (xhr.status == 401) {
          // Unauthorized. Access token we have is invalid, discard it
          _this80.logout();
        }
      }).then(function (u) {
        if (_this80.user) {
          _this80.permissions.on("logout");

          if (_this80.info.path) {
            _this80.permissions.on(["edit", "save"]);
          }

          if (_this80.repo) {
            return _this80.request("repos/".concat(_this80.username, "/").concat(_this80.repo)).then(function (repoInfo) {
              if (_this80.branch === undefined) {
                _this80.branch = repoInfo.default_branch;
              }

              _this80.repoInfo = repoInfo;
              var params = new URL(location).searchParams;

              if (!_this80.mavo.source) {
                // if url doesn't have source, check for forks
                if (repoInfo.fork) {
                  // if current repo is a fork, display PR dialog
                  _this80.forkInfo = repoInfo.parent;

                  _this80.request("repos/".concat(repoInfo.parent.owner.login, "/").concat(repoInfo.parent.name, "/pulls"), {
                    head: "".concat(_this80.user.username, ":").concat(_this80.branch),
                    base: repoInfo.parent.default_branch
                  }).then(function (prs) {
                    _this80.pullRequest(prs[0]);
                  });

                  return repoInfo;
                }

                if (!_this80.canPush()) {
                  // Check if current user has a fork of this repo, and display dialog to switch
                  if (_this80.user.info.public_repos < repoInfo.forks) {
                    // graphql search of current user's forks
                    var query = "query {\n\t\t\t\t\t\t\t\t\t\t\t\t\t  viewer {\n\t\t\t\t\t\t\t\t\t\t\t\t\t    name\n\t\t\t\t\t\t\t\t\t\t\t\t\t      repositories(last: 100, isFork: true) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t      nodes {\n\t\t\t\t\t\t\t\t\t\t\t\t\t        url\n\t\t\t\t\t\t\t\t\t\t\t\t\t        parent {\n\t\t\t\t\t\t\t\t\t\t\t\t\t          nameWithOwner\n\t\t\t\t\t\t\t\t\t\t\t\t\t        }\n\t\t\t\t\t\t\t\t\t\t\t\t\t      }\n\t\t\t\t\t\t\t\t\t\t\t\t\t    }\n\t\t\t\t\t\t\t\t\t\t\t\t\t  }\n\t\t\t\t\t\t\t\t\t\t\t\t\t}";
                    return _this80.request("https://api.github.com/graphql", {
                      query: query
                    }, "POST").then(function (data) {
                      var repos = data.data.viewer.repositories.nodes;

                      for (var i in repos) {
                        if (repos[i].parent.nameWithOwner === repoInfo.full_name) {
                          _this80.switchToMyForkDialog(repos[i].url);

                          return repoInfo;
                        }
                      }

                      return repoInfo;
                    });
                  } else {
                    // search forks of this repo
                    return _this80.request(repoInfo.forks_url).then(function (forks) {
                      for (var i in forks) {
                        if (forks[i].owner.login === _this80.user.username) {
                          _this80.switchToMyForkDialog(forks[i].html_url);

                          return repoInfo;
                        }
                      }

                      return repoInfo;
                    });
                  }
                }
              }

              return repoInfo;
            });
          }
        }
      });
    },
    canPush: function canPush() {
      if (this.repoInfo) {
        return this.repoInfo.permissions.push;
      } // Repo does not exist so we can't check permissions
      // Just check if authenticated user is the same as our URL username


      return this.user && this.user.username.toLowerCase() == this.username.toLowerCase();
    },
    oAuthParams: function oAuthParams() {
      return "&scope=repo,gist";
    },
    logout: function logout() {
      var _this81 = this;

      return this.oAuthLogout().then(function () {
        _this81.user = null;
      });
    },
    getUser: function getUser() {
      var _this82 = this;

      if (this.user) {
        return Promise.resolve(this.user);
      }

      return this.request("user").then(function (info) {
        _this82.user = {
          username: info.login,
          name: info.name || info.login,
          avatar: info.avatar_url,
          url: "https://github.com/" + info.login,
          info: info
        };
        $.fire(_this82.mavo.element, "mv-login", {
          backend: _this82
        });
      });
    },
    getURL: function getURL() {
      var _this83 = this;

      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.path;
      var sha = arguments.length > 1 ? arguments[1] : undefined;
      var repoInfo = this.forkInfo || this.repoInfo;
      var repo = repoInfo.full_name;
      path = path.replace(/ /g, "%20");
      repoInfo.pagesInfo = repoInfo.pagesInfo || this.request("repos/".concat(repo, "/pages"), {}, "GET", {
        headers: {
          "Accept": "application/vnd.github.mister-fantastic-preview+json"
        }
      });
      return repoInfo.pagesInfo.then(function (pagesInfo) {
        return pagesInfo.html_url + path;
      })["catch"](function (xhr) {
        // No Github Pages, return jsdelivr URLs
        return "https://cdn.jsdelivr.net/gh/".concat(repo, "@").concat(sha || _this83.branch || "latest", "/").concat(path);
      });
    },
    switchToMyForkDialog: function switchToMyForkDialog(forkURL) {
      var params = new URL(location).searchParams;
      params.append("storage", forkURL + "/" + this.path);
      this.notice = this.mavo.message("\n\t\t\t".concat(this.mavo._("gh-login-fork-options"), "\n\t\t\t<form onsubmit=\"return false\">\n\t\t\t\t<a href=\"").concat(location.pathname, "?").concat(params, "\"><button>").concat(this.mavo._("gh-use-my-fork"), "</button></a>\n\t\t\t</form>"), {
        classes: "mv-inline",
        dismiss: ["button", "submit"]
      });
      this.notice.closed.then(function (form) {
        if (!form) {
          return;
        }

        history.pushState({}, "", "".concat(location.pathname, "?").concat(params));
        location.replace("".concat(location.pathname, "?").concat(params));
      });
      return;
    },
    "static": {
      apiDomain: "https://api.github.com/",
      oAuth: "https://github.com/login/oauth/authorize",
      test: function test(url) {
        url = new URL(url, Mavo.base);
        return /\bgithub.com|raw.githubusercontent.com/.test(url.host);
      },

      /**
       * Parse Github URLs, return username, repo, branch, path
       */
      parseURL: function parseURL(source) {
        var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var ret = {};
        var url = new URL(source, Mavo.base);
        var path = url.pathname.slice(1).split("/");
        ret.username = path.shift();
        ret.repo = path.shift() || defaults.repo;

        if (/raw.githubusercontent.com$/.test(url.host)) {
          ret.branch = path.shift();
        } else if (/api.github.com$/.test(url.host)) {
          // Raw API call
          var apiCall = url.pathname.slice(1) + url.search;
          var data = Mavo.Functions.from(source, "#"); // url.* drops line breaks

          return {
            apiCall: apiCall,
            apiData: apiCall == "graphql" ? {
              query: data
            } : data
          };
        } else if (path[0] == "blob") {
          path.shift();
          ret.branch = path.shift();
        }

        var lastSegment = path[path.length - 1];

        if (/\.\w+$/.test(lastSegment)) {
          ret.filename = lastSegment;
          path.splice(path.length - 1, 1);
        } else {
          ret.filename = defaults.filename;
        }

        ret.filepath = path.join("/") || defaults.filepath || "";
        ret.path = (ret.filepath ? ret.filepath + "/" : "") + ret.filename;
        ret.apiCall = "repos/".concat(ret.username, "/").concat(ret.repo, "/contents/").concat(ret.path);
        return ret;
      },
      // Fix atob() and btoa() so they can handle Unicode
      btoa: function (_btoa) {
        function btoa(_x) {
          return _btoa.apply(this, arguments);
        }

        btoa.toString = function () {
          return _btoa.toString();
        };

        return btoa;
      }(function (str) {
        return btoa(unescape(encodeURIComponent(str)));
      }),
      atob: function atob(str) {
        return decodeURIComponent(escape(window.atob(str)));
      }
    }
  }));
})(Bliss, Bliss.$);
//# sourceMappingURL=maps/mavo.es5.js.map
