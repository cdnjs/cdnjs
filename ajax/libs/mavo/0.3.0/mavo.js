!function(){"use strict";function e(o,i,t){return i=void 0===i?1:i,(t=t||i+1)-i<=1?function(){if(arguments.length<=i||"string"===c.type(arguments[i]))return o.apply(this,arguments);var t,e,n=arguments[i];for(e in n){var r=Array.prototype.slice.call(arguments);r.splice(i,1,e,n[e]),t=o.apply(this,r)}return t}:e(e(o,i+1,t),i,t-1)}function s(e,n,t){var r=a(t);if("string"===r){var o=Object.getOwnPropertyDescriptor(n,t);!o||o.writable&&o.configurable&&o.enumerable&&!o.get&&!o.set?e[t]=n[t]:(delete e[t],Object.defineProperty(e,t,o))}else if("array"===r)t.forEach(function(t){t in n&&s(e,n,t)});else for(var i in n)t&&("regexp"===r&&!t.test(i)||"function"===r&&!t.call(n,i))||s(e,n,i);return e}function a(t){if(null===t)return"null";if(void 0===t)return"undefined";var e=(Object.prototype.toString.call(t).match(/^\[object\s+(.*?)\]$/)[1]||"").toLowerCase();return"number"==e&&isNaN(t)?"nan":e}var c=self.Bliss=s(function(t,e){return 2==arguments.length&&!e||!t?null:"string"===c.type(t)?(e||document).querySelector(t):t||null},self.Bliss);s(c,{extend:s,overload:e,type:a,property:c.property||"_",listeners:new(self.WeakMap?WeakMap:Map),original:{addEventListener:(self.EventTarget||Node).prototype.addEventListener,removeEventListener:(self.EventTarget||Node).prototype.removeEventListener},sources:{},noop:function(){},$:function(t,e){return t instanceof Node||t instanceof Window?[t]:2!=arguments.length||e?Array.prototype.slice.call("string"==typeof t?(e||document).querySelectorAll(t):t||[]):[]},defined:function(){for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t]},create:function(t,e){return t instanceof Node?c.set(t,e):(1===arguments.length&&(e="string"===c.type(t)?{}:(t=(e=t).tag,c.extend({},e,function(t){return"tag"!==t}))),c.set(document.createElement(t||"div"),e))},each:function(t,e,n){for(var r in n=n||{},t)n[r]=e.call(t,r,t[r]);return n},ready:function(e,t,n){if("function"!=typeof e||t||(t=e,e=void 0),e=e||document,t&&("loading"!==e.readyState?t():c.once(e,"DOMContentLoaded",function(){t()})),!n)return new Promise(function(t){c.ready(e,t,!0)})},Class:function(t){var e,n,r=["constructor","extends","abstract","static"].concat(Object.keys(c.classProps)),o=t.hasOwnProperty("constructor")?t.constructor:c.noop;2==arguments.length?(n=arguments[0],t=arguments[1]):((n=function(){if(this.constructor.__abstract&&this.constructor===n)throw new Error("Abstract classes cannot be directly instantiated.");n.super&&!e&&n.super.apply(this,arguments),o.apply(this,arguments)}).super=t.extends||null,!n.super||(e=0===(n.super+"").indexOf("class "))&&console.error(`You are using $.Class() to create a fake function-based class that extends a native JS class. This will not work.
You should convert your code to use native JS classes too. You can still pass a class into $.Class() to use its conveniences.`),n.prototype=c.extend(Object.create(n.super?n.super.prototype:Object),{constructor:n}),n.prototype.super=n.super?n.super.prototype:null,n.__abstract=!!t.abstract);function i(t){return this.hasOwnProperty(t)&&-1===r.indexOf(t)}if(t.static)for(var s in c.extend(n,t.static,i),c.classProps)s in t.static&&c.classProps[s](n,t.static[s]);for(s in c.extend(n.prototype,t,i),c.classProps)s in t&&c.classProps[s](n.prototype,t[s]);return n},classProps:{lazy:e(function(t,e,n){return Object.defineProperty(t,e,{get:function(){var t=n.call(this);return Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0}),t},set:function(t){Object.defineProperty(this,e,{value:t,configurable:!0,enumerable:!0,writable:!0})},configurable:!0,enumerable:!0}),t}),live:e(function(t,n,r){return"function"===c.type(r)&&(r={set:r}),Object.defineProperty(t,n,{get:function(){var t=this["_"+n],e=r.get&&r.get.call(this,t);return void 0!==e?e:t},set:function(t){var e=this["_"+n],e=r.set&&r.set.call(this,t,e);this["_"+n]=void 0!==e?e:t},configurable:r.configurable,enumerable:r.enumerable}),t})},include:function(){var n=arguments[arguments.length-1],t=2===arguments.length&&arguments[0],r=document.createElement("script");return t?Promise.resolve():new Promise(function(t,e){c.set(r,{async:!0,onload:function(){t(r),r.parentNode&&r.parentNode.removeChild(r)},onerror:function(){e(r)},src:n,inside:document.head})})},load:function t(r,e){e=e?new URL(e,location.href):location.href,r=new URL(r,e);e=t.loading=t.loading||{};return e[r+""]||(/\.css$/.test(r.pathname)?e[r+""]=new Promise(function(t,e){var n=c.create("link",{href:r,rel:"stylesheet",inside:document.head,onload:function(){t(n)},onerror:function(){e(n)}})}):e[r+""]=c.include(r))},fetch:function(t,e){if(!t)throw new TypeError("URL parameter is mandatory and cannot be "+t);var n,r=s({url:new URL(t,location),data:"",method:"GET",headers:{},xhr:new XMLHttpRequest},e);for(n in r.method=r.method.toUpperCase(),c.hooks.run("fetch-args",r),"GET"===r.method&&r.data&&(r.url.search+=r.data),document.body.setAttribute("data-loading",r.url),r.xhr.open(r.method,r.url.href,!1!==r.async,r.user,r.password),e)if("upload"===n)r.xhr.upload&&"object"==typeof e[n]&&c.extend(r.xhr.upload,e[n]);else if(n in r.xhr)try{r.xhr[n]=e[n]}catch(t){self.console&&console.error(t)}var o,t=Object.keys(r.headers).map(function(t){return t.toLowerCase()});for(o in"GET"!==r.method&&-1===t.indexOf("content-type")&&r.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.headers)void 0!==r.headers[o]&&r.xhr.setRequestHeader(o,r.headers[o]);t=new Promise(function(t,e){r.xhr.onload=function(){document.body.removeAttribute("data-loading"),0===r.xhr.status||200<=r.xhr.status&&r.xhr.status<300||304===r.xhr.status?t(r.xhr):e(c.extend(Error(r.xhr.statusText),{xhr:r.xhr,get status(){return this.xhr.status}}))},r.xhr.onerror=function(){document.body.removeAttribute("data-loading"),e(c.extend(Error("Network Error"),{xhr:r.xhr}))},r.xhr.ontimeout=function(){document.body.removeAttribute("data-loading"),e(c.extend(Error("Network Timeout"),{xhr:r.xhr}))},r.xhr.send("GET"===r.method?null:r.data)});return t.xhr=r.xhr,t},value:function(t){var e="string"!=typeof t;return c.$(arguments).slice(+e).reduce(function(t,e){return t&&t[e]},e?t:self)}}),c.Hooks=new c.Class({add:function(t,e,n){if("string"==typeof arguments[0])(Array.isArray(t)?t:[t]).forEach(function(t){this[t]=this[t]||[],e&&this[t][n?"unshift":"push"](e)},this);else for(var t in arguments[0])this.add(t,arguments[0][t],e)},run:function(t,e){this[t]=this[t]||[],this[t].forEach(function(t){t.call(e&&e.context?e.context:e,e)})}}),c.hooks=new c.Hooks;c.property;c.Element=function(t){this.subject=t,this.data={},this.bliss={}},c.Element.prototype={set:e(function(t,e){t in c.setProps?c.setProps[t].call(this,e):t in this?this[t]=e:this.setAttribute(t,e)},0),transition:function(o,i){return new Promise(function(t,e){var n,r;"transition"in this.style&&0!==i?(n=c.extend({},this.style,/^transition(Duration|Property)$/),c.style(this,{transitionDuration:(i||400)+"ms",transitionProperty:Object.keys(o).join(", ")}),c.once(this,"transitionend",function(){clearTimeout(r),c.style(this,n),t(this)}),r=setTimeout(t,i+50,this),c.style(this,o)):(c.style(this,o),t(this))}.bind(this))},fire:function(t,e){var n=document.createEvent("HTMLEvents");return n.initEvent(t,!0,!0),this.dispatchEvent(c.extend(n,e))},bind:e(function(t,n){var e;1<arguments.length&&("function"===c.type(n)||n.handleEvent)&&(e=n,(n="object"===c.type(arguments[2])?arguments[2]:{capture:!!arguments[2]}).callback=e);var r=c.listeners.get(this)||{};t.trim().split(/\s+/).forEach(function(t){var e;-1<t.indexOf(".")&&(e=(t=t.split("."))[1],t=t[0]),r[t]=r[t]||[],0===r[t].filter(function(t){return t.callback===n.callback&&t.capture==n.capture}).length&&r[t].push(c.extend({className:e},n)),c.original.addEventListener.call(this,t,n.callback,n)},this),c.listeners.set(this,r)},0),unbind:e(function(t,i){var e;i&&("function"===c.type(i)||i.handleEvent)&&(e=i,i=arguments[2]),(i=(i="boolean"==c.type(i)?{capture:i}:i)||{}).callback=i.callback||e;var s=c.listeners.get(this);(t||"").trim().split(/\s+/).forEach(function(t){var e,n;if(-1<t.indexOf(".")&&(e=(t=t.split("."))[1],t=t[0]),!s)return t&&i.callback?c.original.removeEventListener.call(this,t,i.callback,i.capture):void 0;for(n in s)if(!t||n===t)for(var r,o=0;r=s[n][o];o++)e&&e!==r.className||i.callback&&i.callback!==r.callback||!!i.capture!=!!r.capture&&(t||i.callback||void 0!==i.capture)||(s[n].splice(o,1),c.original.removeEventListener.call(this,n,r.callback,r.capture),o--)},this)},0),when:function(r,o){var t=this;return new Promise(function(n){t.addEventListener(r,function t(e){o&&!o.call(this,e)||(this.removeEventListener(r,t),n(e))})})},toggleAttribute:function(t,e,n){(n=arguments.length<3?null!==e:n)?this.setAttribute(t,e):this.removeAttribute(t)}},c.setProps={style:function(t){for(var e in t)e in this.style?this.style[e]=t[e]:this.style.setProperty(e,t[e])},attributes:function(t){for(var e in t)this.setAttribute(e,t[e])},properties:function(t){c.extend(this,t)},events:function(t){if(1!=arguments.length||!t||!t.addEventListener)return c.bind.apply(this,[this].concat(c.$(arguments)));var e,n=this;if(c.listeners){var r,o=c.listeners.get(t);for(r in o)o[r].forEach(function(t){c.bind(n,r,t.callback,t.capture)})}for(e in t)0===e.indexOf("on")&&(this[e]=t[e])},once:e(function(t,e){function n(){return c.unbind(r,t,n),e.apply(r,arguments)}var r=this;c.bind(this,t,n,{once:!0})},0),delegate:e(function(t,e,n){c.bind(this,t,function(t){t.target.closest(e)&&n.call(this,t)})},0,2),contents:function(t){!t&&0!==t||(Array.isArray(t)?t:[t]).forEach(function(t){var e=c.type(t);/^(string|number)$/.test(e)?t=document.createTextNode(t+""):"object"===e&&(t=c.create(t)),t instanceof Node&&this.appendChild(t)},this)},inside:function(t){t&&t.appendChild(this)},before:function(t){t&&t.parentNode.insertBefore(this,t)},after:function(t){t&&t.parentNode.insertBefore(this,t.nextSibling)},start:function(t){t&&t.insertBefore(this,t.firstChild)},around:function(t){t&&t.parentNode&&c.before(this,t),this.appendChild(t)}},c.Array=function(t){this.subject=t},c.Array.prototype={all:function(t){var e=c.$(arguments).slice(1);return this[t].apply(this,e)}},c.add=e(function(r,n,o,t){o=c.extend({$:!0,element:!0,array:!0},o),"function"==c.type(n)&&(!o.element||r in c.Element.prototype&&t||(c.Element.prototype[r]=function(){return this.subject&&c.defined(n.apply(this.subject,arguments),this.subject)}),!o.array||r in c.Array.prototype&&t||(c.Array.prototype[r]=function(){var e=arguments;return this.subject.map(function(t){return t&&c.defined(n.apply(t,e),t)})}),o.$&&(c.sources[r]=c[r]=n,(o.array||o.element)&&(c[r]=function(){var t=[].slice.apply(arguments),e=t.shift(),n=o.array&&Array.isArray(e)?"Array":"Element";return c[n].prototype[r].apply({subject:e},t)})))},0),c.add(c.Array.prototype,{element:!1}),c.add(c.Element.prototype),c.add(c.setProps),c.add(c.classProps,{element:!1,array:!1});var n=document.createElement("_");c.add(c.extend({},HTMLElement.prototype,function(t){return"function"===c.type(n[t])}),null,!0)}();
var jsep=function(e){"use strict";const t="Compound",r="MemberExpression",n="Literal";let o=function(e,t){let r=new Error(e+" at character "+t);throw r.index=t,r.description=e,r},i={"-":1,"!":1,"~":1,"+":1},u={"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":10,"/":10,"%":10},a={$:1,_:1},l=function(e){return Math.max(0,...Object.keys(e).map((e=>e.length)))},s=l(i),f=l(u),c={true:!0,false:!1,null:null},p=function(e){return u[e]||0},h=function(e,t,r){return{type:"BinaryExpression",operator:e,left:t,right:r}},d=function(e){return e>=48&&e<=57},y=function(e){return e>=65&&e<=90||e>=97&&e<=122||e>=128&&!u[String.fromCharCode(e)]||a.hasOwnProperty(String.fromCharCode(e))},x=function(e){return y(e)||d(e)},g=function(e){let a,l,g=0,m=e.charAt,v=e.charCodeAt,b=function(t){return m.call(e,t)},E=function(t){return v.call(e,t)},C=e.length,O=function(){let e=E(g);for(;32===e||9===e||10===e||13===e;)e=E(++g)},U=function(){let e,t,r=w();return O(),63!==E(g)?r:(g++,e=U(),e||o("Expected expression",g),O(),58===E(g)?(g++,t=U(),t||o("Expected expression",g),{type:"ConditionalExpression",test:r,consequent:e,alternate:t}):void o("Expected :",g))},k=function(){O();let t=e.substr(g,f),r=t.length;for(;r>0;){if(u.hasOwnProperty(t)&&(!y(E(g))||g+t.length<e.length&&!x(E(g+t.length))))return g+=r,t;t=t.substr(0,--r)}return!1},w=function(){let e,t,r,n,i,u,a,l,s;if(u=P(),t=k(),!t)return u;for(i={value:t,prec:p(t)},a=P(),a||o("Expected expression after "+t,g),n=[u,i,a];(t=k())&&(r=p(t),0!==r);){for(i={value:t,prec:r},s=t;n.length>2&&r<=n[n.length-2].prec;)a=n.pop(),t=n.pop().value,u=n.pop(),e=h(t,u,a),n.push(e);e=P(),e||o("Expected expression after "+s,g),n.push(i,e)}for(l=n.length-1,e=n[l];l>1;)e=h(n[l-1].value,n[l-2],e),l-=2;return e},P=function(){let t,n,u,a;if(O(),t=E(g),d(t)||46===t)return S();if(39===t||34===t)a=A();else if(91===t)a=L();else{for(n=e.substr(g,s),u=n.length;u>0;){if(i.hasOwnProperty(n)&&(!y(E(g))||g+n.length<e.length&&!x(E(g+n.length))))return g+=u,{type:"UnaryExpression",operator:n,argument:P(),prefix:!0};n=n.substr(0,--u)}y(t)?a=j():40===t&&(a=B())}if(!a)return!1;for(O(),t=E(g);46===t||91===t||40===t;)g++,46===t?(O(),a={type:r,computed:!1,object:a,property:j()}):91===t?(a={type:r,computed:!0,object:a,property:U()},O(),t=E(g),93!==t&&o("Unclosed [",g),g++):40===t&&(a={type:"CallExpression",arguments:M(41),callee:a}),O(),t=E(g);return a},S=function(){let e,t,r="";for(;d(E(g));)r+=b(g++);if(46===E(g))for(r+=b(g++);d(E(g));)r+=b(g++);if(e=b(g),"e"===e||"E"===e){for(r+=b(g++),e=b(g),"+"!==e&&"-"!==e||(r+=b(g++));d(E(g));)r+=b(g++);d(E(g-1))||o("Expected exponent ("+r+b(g)+")",g)}return t=E(g),y(t)?o("Variable names cannot start with a number ("+r+b(g)+")",g):46===t&&o("Unexpected period",g),{type:n,value:parseFloat(r),raw:r}},A=function(){let e="",t=b(g++),r=!1;for(;g<C;){let n=b(g++);if(n===t){r=!0;break}if("\\"===n)switch(n=b(g++),n){case"n":e+="\n";break;case"r":e+="\r";break;case"t":e+="\t";break;case"b":e+="\b";break;case"f":e+="\f";break;case"v":e+="\v";break;default:e+=n}else e+=n}return r||o('Unclosed quote after "'+e+'"',g),{type:n,value:e,raw:t+e+t}},j=function(){let t,r=E(g),i=g;for(y(r)?g++:o("Unexpected "+b(g),g);g<C&&(r=E(g),x(r));)g++;return t=e.slice(i,g),c.hasOwnProperty(t)?{type:n,value:c[t],raw:t}:"this"===t?{type:"ThisExpression"}:{type:"Identifier",name:t}},M=function(e){let r=[],n=!1,i=0;for(;g<C;){O();let u=E(g);if(u===e){n=!0,g++,41===e&&i&&i>=r.length&&o("Unexpected token "+String.fromCharCode(e),g);break}if(44===u){if(g++,i++,i!==r.length)if(41===e)o("Unexpected token ,",g);else if(93===e)for(let e=r.length;e<i;e++)r.push(null)}else{let e=U();e&&e.type!==t||o("Expected comma",g),r.push(e)}}return n||o("Expected "+String.fromCharCode(e),g),r},B=function(){g++;let e=U();if(O(),41===E(g))return g++,e;o("Unclosed (",g)},L=function(){return g++,{type:"ArrayExpression",elements:M(93)}},I=[];for(;g<C;)a=E(g),59===a||44===a?g++:(l=U())?I.push(l):g<C&&o('Unexpected "'+b(g)+'"',g);return 1===I.length?I[0]:{type:t,body:I}};return g.version="0.4.0",g.toString=function(){return"JavaScript Expression Parser (JSEP) v"+g.version},g.addUnaryOp=function(e){return s=Math.max(e.length,s),i[e]=1,this},g.addBinaryOp=function(e,t){return f=Math.max(e.length,f),u[e]=t,this},g.addIdentifierChar=function(e){return a[e]=1,this},g.addLiteral=function(e,t){return c[e]=t,this},g.removeUnaryOp=function(e){return delete i[e],e.length===s&&(s=l(i)),this},g.removeAllUnaryOps=function(){return i={},s=0,this},g.removeIdentifierChar=function(e){return delete a[e],this},g.removeBinaryOp=function(e){return delete u[e],e.length===f&&(f=l(u)),this},g.removeAllBinaryOps=function(){return u={},f=0,this},g.removeLiteral=function(e){return delete c[e],this},g.removeAllLiterals=function(){return c={},this},e.default=g,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=jsep.iife.min.js.map

/* jsep v0.3.4 (http://jsep.from.so/) */
!function(e){"use strict";var C="Compound",U="MemberExpression",w="Literal",k=function(e,r){var t=new Error(e+" at character "+r);throw t.index=r,t.description=e,t},O={"-":!0,"!":!0,"~":!0,"+":!0},S={"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":10,"/":10,"%":10},r=function(e){var r,t=0;for(var n in e)(r=n.length)>t&&e.hasOwnProperty(n)&&(t=r);return t},j=r(O),A=r(S),P={true:!0,false:!1,null:null},L=function(e){return S[e]||0},B=function(e,r,t){return{type:"||"===e||"&&"===e?"LogicalExpression":"BinaryExpression",operator:e,left:r,right:t}},M=function(e){return 48<=e&&e<=57},q=function(e){return 36===e||95===e||65<=e&&e<=90||97<=e&&e<=122||128<=e&&!S[String.fromCharCode(e)]},J=function(e){return 36===e||95===e||65<=e&&e<=90||97<=e&&e<=122||48<=e&&e<=57||128<=e&&!S[String.fromCharCode(e)]},t=function(n){for(var e,r,p=0,t=n.charAt,o=n.charCodeAt,i=function(e){return t.call(n,e)},u=function(e){return o.call(n,e)},s=n.length,f=function(){for(var e=u(p);32===e||9===e||10===e||13===e;)e=u(++p)},c=function(){var e,r,t=a();return f(),63!==u(p)?t:(p++,(e=c())||k("Expected expression",p),f(),58===u(p)?(p++,(r=c())||k("Expected expression",p),{type:"ConditionalExpression",test:t,consequent:e,alternate:r}):void k("Expected :",p))},l=function(){f();for(var e=n.substr(p,A),r=e.length;0<r;){if(S.hasOwnProperty(e)&&(!q(u(p))||p+e.length<n.length&&!J(u(p+e.length))))return p+=r,e;e=e.substr(0,--r)}return!1},a=function(){var e,r,t,n,o,i,a,u,s;if(i=h(),!(r=l()))return i;for(o={value:r,prec:L(r)},(a=h())||k("Expected expression after "+r,p),n=[i,o,a];(r=l())&&0!==(t=L(r));){for(o={value:r,prec:t},s=r;2<n.length&&t<=n[n.length-2].prec;)a=n.pop(),r=n.pop().value,i=n.pop(),e=B(r,i,a),n.push(e);(e=h())||k("Expected expression after "+s,p),n.push(o,e)}for(e=n[u=n.length-1];1<u;)e=B(n[u-1].value,n[u-2],e),u-=2;return e},h=function(){var e,r,t;if(f(),e=u(p),M(e)||46===e)return d();if(39===e||34===e)return v();if(91===e)return b();for(t=(r=n.substr(p,j)).length;0<t;){if(O.hasOwnProperty(r)&&(!q(u(p))||p+r.length<n.length&&!J(u(p+r.length))))return p+=t,{type:"UnaryExpression",operator:r,argument:h(),prefix:!0};r=r.substr(0,--t)}return!(!q(e)&&40!==e)&&g()},d=function(){for(var e,r,t="";M(u(p));)t+=i(p++);if(46===u(p))for(t+=i(p++);M(u(p));)t+=i(p++);if("e"===(e=i(p))||"E"===e){for(t+=i(p++),"+"!==(e=i(p))&&"-"!==e||(t+=i(p++));M(u(p));)t+=i(p++);M(u(p-1))||k("Expected exponent ("+t+i(p)+")",p)}return r=u(p),q(r)?k("Variable names cannot start with a number ("+t+i(p)+")",p):46===r&&k("Unexpected period",p),{type:w,value:parseFloat(t),raw:t}},v=function(){for(var e,r="",t=i(p++),n=!1;p<s;){if((e=i(p++))===t){n=!0;break}if("\\"===e)switch(e=i(p++)){case"n":r+="\n";break;case"r":r+="\r";break;case"t":r+="\t";break;case"b":r+="\b";break;case"f":r+="\f";break;case"v":r+="\v";break;default:r+=e}else r+=e}return n||k('Unclosed quote after "'+r+'"',p),{type:w,value:r,raw:t+r+t}},x=function(){var e,r=u(p),t=p;for(q(r)?p++:k("Unexpected "+i(p),p);p<s&&(r=u(p),J(r));)p++;return e=n.slice(t,p),P.hasOwnProperty(e)?{type:w,value:P[e],raw:e}:"this"===e?{type:"ThisExpression"}:{type:"Identifier",name:e}},y=function(e){for(var r,t,n=[],o=!1,i=0;p<s;){if(f(),(r=u(p))===e){o=!0,p++,41===e&&i&&i>=n.length&&k("Unexpected token "+String.fromCharCode(e),p);break}if(44===r){if(p++,++i!==n.length)if(41===e)k("Unexpected token ,",p);else if(93===e)for(var a=n.length;a<i;a++)n.push(null)}else(t=c())&&t.type!==C||k("Expected comma",p),n.push(t)}return o||k("Expected "+String.fromCharCode(e),p),n},g=function(){var e,r;for(r=40===(e=u(p))?m():x(),f(),e=u(p);46===e||91===e||40===e;)p++,46===e?(f(),r={type:U,computed:!1,object:r,property:x()}):91===e?(r={type:U,computed:!0,object:r,property:c()},f(),93!==(e=u(p))&&k("Unclosed [",p),p++):40===e&&(r={type:"CallExpression",arguments:y(41),callee:r}),f(),e=u(p);return r},m=function(){p++;var e=c();if(f(),41===u(p))return p++,e;k("Unclosed (",p)},b=function(){return p++,{type:"ArrayExpression",elements:y(93)}},E=[];p<s;)59===(e=u(p))||44===e?p++:(r=c())?E.push(r):p<s&&k('Unexpected "'+i(p)+'"',p);return 1===E.length?E[0]:{type:C,body:E}};if(t.version="0.3.4",t.toString=function(){return"JavaScript Expression Parser (JSEP) v"+t.version},t.addUnaryOp=function(e){return j=Math.max(e.length,j),O[e]=!0,this},t.addBinaryOp=function(e,r){return A=Math.max(e.length,A),S[e]=r,this},t.addLiteral=function(e,r){return P[e]=r,this},t.removeUnaryOp=function(e){return delete O[e],e.length===j&&(j=r(O)),this},t.removeAllUnaryOps=function(){return O={},j=0,this},t.removeBinaryOp=function(e){return delete S[e],e.length===A&&(A=r(S)),this},t.removeAllBinaryOps=function(){return S={},A=0,this},t.removeLiteral=function(e){return delete P[e],this},t.removeAllLiterals=function(){return P={},this},"undefined"==typeof exports){var n=e.jsep;(e.jsep=t).noConflict=function(){return e.jsep===t&&(e.jsep=n),t}}else"undefined"!=typeof module&&module.exports?exports=module.exports=t:exports.parse=t}(this);
//# sourceMappingURL=jsep.min.js.map
!function(){if(self.Element&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||null),Element.prototype.matches)){var p=self.Stretchy={selectors:{base:'textarea, select:not([size]), input:not([type]), input[type="'+"text number url email tel".split(" ").join('"], input[type="')+'"]',filter:"*"},script:document.currentScript||t("script").pop(),resize:function(e){if(p.resizes(e)){var t,i=getComputedStyle(e),n=0;!e.value&&e.placeholder&&(t=!0,e.value=e.placeholder);var o=e.nodeName.toLowerCase();if("textarea"==o)e.style.height="0","border-box"==i.boxSizing?n=e.offsetHeight:"content-box"==i.boxSizing&&(n=-e.clientHeight+parseFloat(i.minHeight)),e.style.height=e.scrollHeight+n+"px";else if("input"==o)if(e.style.width="1000px",e.offsetWidth){e.style.width="0",
"border-box"==i.boxSizing?n=e.offsetWidth:"padding-box"==i.boxSizing?n=e.clientWidth:"content-box"==i.boxSizing&&(n=parseFloat(i.minWidth));var r=Math.max(n,e.scrollWidth-e.clientWidth);e.style.width=r+"px";for(var l=0;l<10&&(e.scrollLeft=1e10,0!=e.scrollLeft);l++)r+=e.scrollLeft,e.style.width=r+"px"}else e.style.width=e.value.length+1+"ch";else if("select"==o){if(-1==e.selectedIndex)return;var s,c=0<e.selectedIndex?e.selectedIndex:0,a=document.createElement("_");for(var d in a.textContent=e.options[c].textContent,e.parentNode.insertBefore(a,e.nextSibling),i){var h=i[d];/^(width|webkitLogicalWidth|length)$/.test(d)||"string"!=typeof h||(a.style[d]=h,/appearance$/i.test(d)&&(s=d))}a.style.width="",0<a.offsetWidth&&(e.style.width=a.offsetWidth+"px",i[s]&&"none"===i[s]||(e.style.width="calc("+e.style.width+" + 2em)")),a.parentNode.removeChild(a),a=null}t&&(e.value="")}},resizeAll:function(e){t(e||p.selectors.base).forEach(function(e){p.resize(e)})},active:!0,resizes:function(e){
return e&&e.parentNode&&e.matches&&e.matches(p.selectors.base)&&e.matches(p.selectors.filter)},init:function(){p.selectors.filter=p.script.getAttribute("data-filter")||(t("[data-stretchy-filter]").pop()||document.body).getAttribute("data-stretchy-filter")||p.selectors.filter,p.resizeAll(),self.MutationObserver&&!p.observer&&(p.observer=new MutationObserver(function(e){p.active&&e.forEach(function(e){"childList"==e.type&&p.resizeAll(e.addedNodes)})}),p.observer.observe(document.documentElement,{childList:!0,subtree:!0}))},$$:t};"loading"!==document.readyState?requestAnimationFrame(p.init):document.addEventListener("DOMContentLoaded",p.init),window.addEventListener("load",function(){p.resizeAll()});var e=function(e){p.active&&p.resize(e.target)};document.documentElement.addEventListener("input",e),document.documentElement.addEventListener("change",e)}function t(e,t){return e instanceof Node||e instanceof Window?[e]:[].slice.call("string"==typeof e?(t||document).querySelectorAll(e):e||[])
}}();
//# sourceMappingURL=stretchy.min.js.map

//# sourceMappingURL=maps/deps.js.map

/**
 * Mavo: Create web applications by writing HTML and CSS!
 * @author Lea Verou and contributors
 * @version v0.3.0
 */

 Stretchy.selectors.filter = ".mv-editor:not([property]), .mv-autosize";

(async function ($, $$) {

// Define $ and $$ if they are not already defined
// Primarily for backwards compat since we used to use Bliss Full.
self.$ = self.$ || $;
self.$$ = self.$$ || $$;

let _ = self.Mavo = $.Class(class Mavo {
	constructor(element) {
		this.treeBuilt = Mavo.promise();
		this.dataLoaded = Mavo.promise();
		this.deleted = [];

		this.element = element;

		this.inProgress = false;

		// Index among other mavos in the page, 1 is first
		this.index = Object.keys(_.all).length + 1;
		Object.defineProperty(_.all, this.index - 1, {value: this, configurable: true});

		// Assign a unique (for the page) id to this mavo instance
		this.id = Mavo.getAttribute(this.element, "mv-app", "id") || `mavo${this.index}`;

		if (this.id in _.all) {
			// Duplicate app name
			for (var i=2; this.id + i in _.all; i++) {}
			this.id = this.id + i;
		}

		_.all[this.id] = this;
		this.element.setAttribute("mv-app", this.id);

		this.observe({attribute: "lang", deep: false}, () => {
			var lang = Mavo.getClosestAttribute(this.element, "lang") || Mavo.locale;
			this.locale = Mavo.Locale.get(lang);
		})();

		// Should we start in edit mode?
		this.autoEdit = this.element.classList.contains("mv-autoedit");

		// Should we save automatically?
		this.autoSave = this.element.hasAttribute("mv-autosave");
		this.autoSaveDelay = (this.element.getAttribute("mv-autosave") || 0) * 1000;

		Mavo.setAttributeShy(this.element, "typeof", "");

		Mavo.hooks.run("init-start", this);

		// ----- Heuristic for groups ------

		// Now, turn properties that contain other properties into groups
		$$(_.selectors.primitive, this.element).forEach(element => {
			if ($(_.selectors.property, element)) { // contains other properties
				let config = Mavo.Primitive.getConfig(element);

				if (!config.attribute && !config.hasChildren || element.hasAttribute("mv-list-item")) {
					element.setAttribute("mv-group", "");
				}
			}
		});

		this.expressions = new Mavo.Expressions(this);

		_.observers = _.observers || new Mavo.Observers();
		_.observers.observer.observe(this.element, {
			// Observe everything
			characterData: true,
			childList: true,
			subtree: true,
			attributes: true
		});

		// Build mavo objects
		Mavo.hooks.run("init-tree-before", this);

		this.root = new Mavo.Group(this.element, this);
		this.treeBuilt.resolve();

		Mavo.hooks.run("init-tree-after", this);

		this.permissions = new Mavo.Permissions();

		var backendTypes = ["source", "storage", "init", "uploads"]; // order is significant!

		// Figure out backends for storage, data reads, and initialization respectively
		backendTypes.forEach(role => this.updateBackend(role));

		this.observe({deep: false, attribute: true}, ({attribute}) => {
			if (attribute.indexOf("mv-") === 0) {
				// We want to observe changes both in a backend (the mv-role attribute)
				// and its metadata (provided via the mv-role-* family of attributes)
				let role = attribute?.replace(/^mv-/, "")?.split("-")?.[0];

				if (backendTypes.includes(role)) {
					this.updateBackend(role);

					// Do we need to re-load data?
					if (role === "source" || (!this.source && (role === "storage" || role === "init" && !this.root.data))) {
						this.load();
					}
				}
			}

		});

		this.permissions.can("login", () => {
			// We also support a URL param to trigger login, in case the user doesn't want visible login UI
			let loginUrlParam;
			if (Mavo.Functions.url("login") !== null && this.index === 1) {
				loginUrlParam = "login";
			}
			else if (Mavo.Functions.url(this.id + "-login") !== null) {
				loginUrlParam = this.id + "-login";
			}

			if (loginUrlParam !== undefined) {
				// Remove param from url
				const currentURL = new URL(location.href);
				currentURL.searchParams.delete(loginUrlParam);
				history.replaceState(null, "", currentURL);
				this.primaryBackend.login();
			}
		});

		// Update login status
		$.bind(this.element, "mv-login.mavo", evt => {
			if (evt.backend == (this.source || this.storage)) {
				// If last time we rendered we got nothing, maybe now we'll have better luck?
				if (this.inProgress !== "loading" && !this.root.data && !this.unsavedChanges) {
					this.load();
				}
			}
		});

		this.bar = new Mavo.UI.Bar(this);

		// Is there any control that requires an edit button?
		this.needsEdit = this.calculateNeedsEdit();

		this.setUnsavedChanges(false);

		this.permissions.onchange(({action, value}) => {
			var permissions = this.element.getAttribute("mv-permissions") || "";
			permissions = permissions.trim().split(/\s+/).filter(a => a != action);

			if (value) {
				permissions.push(action);
			}

			this.element.setAttribute("mv-permissions", permissions.join(" "));
		});

		this.permissions.can(["edit", "add", "delete"], () => {
			if (this.autoEdit) {
				this.edit();
			}
		});

		// Observe entire tree for mv-mode changes
		this.observe({attribute: "mv-mode"}, ({element}) => {
			if (!this.permissions.edit && !this.permissions.add && !this.permissions.delete) {
				return;
			}

			let nodes = _.Node.children(element);

			nodeloop: for (let i=0; i<nodes.length; i++) {
				let node = nodes[i];
				let previousMode = node.mode, mode;

				if (node.element == element) {
					// If attribute set directly on a Mavo node, then it forces it into that mode
					// otherwise, descendant nodes still inherit, unless they are also mode-restricted
					mode = node.element.getAttribute("mv-mode");
					node.modes = mode;
				}
				else {
					// Inherited
					if (node.modes) {
						// Mode-restricted, we cannot change to the other mode
						continue nodeloop;
					}

					mode = _.getStyle(node.element.parentNode, "--mv-mode");
				}

				node.mode = mode;

				if (previousMode != node.mode) {
					node[node.mode == "edit"? "edit" : "done"]();
				}
			}
		});

		if (this.primaryBackend) {
			// Fetch existing data
			this.permissions.can("read", () => this.load());
		}
		else {
			// No storage or source
			requestAnimationFrame(() => {
				this.dataLoaded.resolve();
				this.expressions.update();
				this.element.dispatchEvent(new Event("mv-load", {bubbles: true}));
			});
		}

		// Dynamic ids
		$.bind(this.element, "mv-load.mavo", evt => {
			if (location.hash) {
				var callback = () => {
					var target = document.getElementById(location.hash.slice(1));

					if (target || !location.hash) {
						if (this.element.contains(target)) {
							requestAnimationFrame(() => { // Give the browser a chance to render
								Mavo.scrollIntoViewIfNeeded(target);
							});
						}
					}

					return target;
				};

				if (!callback()) {
					// No target, perhaps not yet?
					this.observe({attribute: "id", once: true}, callback);
					// FIXME if expressions take multiple cycles to resolve, this will not scroll to the proper id
					// FIXME also, if the user has started interacting with the document, we shouldn't scroll
				}
			}

			requestAnimationFrame(() => Stretchy.resizeAll());
		});

		this.dataLoaded.then(async evt => {
			await Mavo.defer();

			this.permissions.can("save", () => {
				if (this.autoSave) {
					let debouncedSave = _.debounce(() => {
						this.save();
					}, this.autoSaveDelay);

					$.bind(this.element, "mv-change.mavo:autosave", evt => {
						if (evt.node.saved && this.autoSave) {
							debouncedSave();
						}
					});
				}
			}, () => {
				$.unbind(this.element, "mv-change.mavo:autosave");
			});
		});

		// Keyboard navigation
		this.element.addEventListener("keydown", evt => {
			var element = evt.target;

			// Ctrl + S or Cmd + S to save
			if (this.permissions.save && evt.key == "S" && evt[_.superKey] && !evt.altKey) {
				evt.preventDefault();
				this.save();
			}
			else if (evt.key === "ArrowUp" || evt.key === "ArrowDown") {
				if (element.matches("textarea, input[type=range], input[type=number]")) {
					// Up/down arrow keys are meaningful here
					return;
				}

				if (element.matches(".mv-editor")) {
					var editor = true;
					element = element.parentNode;
				}

				var node = Mavo.Node.get(element);

				if (node?.closestCollection) {
					var nextNode = node.getCousin(evt.key === "ArrowUp"? -1 : 1, {wrap: true});

					if (nextNode) {
						if (editor && nextNode.editing) {
							nextNode.edit();
							nextNode.editor.focus();
						}
						else {
							nextNode.element.focus();
						}

						evt.preventDefault();
					}
				}
			}
		});

		$.bind(this.element, "click submit", _.Actions.listener);

		Mavo.hooks.run("init-end", this);
	}

	get editing() {
		return this.root.editing;
	}

	observe (o = {}, callback) {
		let options = Object.assign({element: this.element}, o);
		return _.observers?.observe(options, callback);
	}

	unobserve (o, callback) {
		let options = Object.assign({element: this.element}, o);
		return _.observers?.unobserve(options, callback);
	}

	getData (o) {
		let env = {context: this, options: o};
		env.data = this.root.getData(o);
		_.hooks.run("getdata-end", env);
		return env.data;
	}

	toJSON () {
		return _.toJSON(this.getData());
	}

	message (message, options = {}) {
		return new _.UI.Message(this, message, options);
	}

	error (message, ...log) {
		this.message(message, {
			type: "error",
			dismiss: ["button", "timeout"]
		});

		// Log more info for programmers
		if (log.length > 0) {
			console.log(`%c${this.id}: ${message}`, "color: red; font-weight: bold", ...log);
		}
	}

	render (data) {
		var env = {context: this, data};
		_.hooks.run("render-start", env);

		if (env.data) {
			this.root.render(env.data);
		}

		this.unsavedChanges = false;

		_.hooks.run("render-end", env);
	}

	edit () {
		if (this.bar?.edit) {
			this.bar.edit.click();
		}

		this.root.edit();

		// Highlight collection item when item controls are hovered
		$.bind(this.element, "mouseenter.mavo:edit mouseleave.mavo:edit", evt => {
			if (evt.target.matches(_.selectors.multiple)) {
				evt.target.classList.remove("mv-has-hovered-item");

				var parent = evt.target.parentNode.closest(_.selectors.multiple);

				if (parent) {
					parent.classList.toggle("mv-has-hovered-item", evt.type == "mouseenter");
				}
			}
		}, true);

		this.setUnsavedChanges();
	}

	// Conclude editing
	done () {
		this.root.done();
		$.unbind(this.element, ".mavo:edit");
		this.unsavedChanges = false;
	}

	/**
	 * Set this mavo instance’s unsavedChanges flag.
	 * @param {Boolean} [value]
	 *        If true, just sets the flag to true, no traversal.
	 *        If false, sets the flag of the Mavo instance and every tree node to false
	 *        If not provided, traverses the tree and recalculates the flag value.
	 */
	setUnsavedChanges (value) {
		var unsavedChanges = !!value;

		if (!value) {
			this.walk(obj => {
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
	}

	/**
	 * Update the backend for a given role
	 * @return {Boolean} true if a change occurred, false otherwise
	 */
	updateBackend (role) {
		let existing = this[role], backend, changed;
		let options = {};

		if (this.index == 1) {
			// This app is the first one in the page, so we can override its backend
			// via URL params such as ?storage=...
			backend = _.Functions.url(role);
		}

		if (!backend) {
			backend = _.Functions.url(`${this.id}-${role}`);
		}

		if (!backend) {
			const attribute = "mv-" + role;
			backend = this.element.getAttribute(attribute) || null;

			if (backend) {
				backend = backend.trim();

				if (backend == "none") {
					backend = null;
				}
				else {
					// Do we have any other attributes?
					// We consider them since a backend was not overridden via URL params.
					let prefix = attribute + "-";
					let roleAttributes = Mavo.getAttributes(this.element, RegExp("^" + prefix));
					options = Object.fromEntries(roleAttributes.map(n => [n.replace(prefix, ""), this.element.getAttribute(n)]));
				}
			}
		}

		if (backend) {
			if (!existing?.equals?.(backend)) {
				// We have a string, convert to a backend object if different than existing
				this[role] = backend = _.Backend.create(backend, {
					format: this.element.getAttribute("mv-format"), // can be overwritten by options below
					...options,
					mavo: this
				}, existing);

				changed = true;

				// Shim for previous mv-login and mv-logout events that were on the Mavo root
				$.bind(backend, "mv-login mv-logout", evt => {
					$.fire(this.element, evt.type, {backend});
				});
			}
		}
		else {
			// We had a backend and now we will un-have it
			this[role] = null;
		}

		changed = changed || (backend? !backend.equals(existing) : Boolean(existing));

		if (changed) {
			// A change occured
			if (!this.storage && !this.source && this.init) {
				// If init is present with no storage and no source, init is equivalent to source
				this.source = this.init;
				this.init = null;
			}

			var permissions = this.storage? this.storage.permissions : new Mavo.Permissions({edit: true, save: false});
			permissions.parent = this.source?.permissions;
			this.permissions.parent = permissions;

			this.primaryBackend = this.storage || this.source;
			this.sourceBackend = this.source || this.storage || this.init;

			let updateListener = evt => {
				if (evt.target !== this.sourceBackend) {
					evt.target.removeEventListener("mv-remotedatachange", updateListener);
				}
				else {
					this.push(evt.data);
				}
			};

			this.sourceBackend?.addEventListener("mv-remotedatachange", updateListener);
		}

		return changed;
	}

	/*
	 * Push new data from the remote
	 * @param {Object} data The data
	 * @param options
	 * @param {("ask", "force", "stop")} options.conflictPolicy What to do when there are unsaved changes?
	 */
	async push(data, {conflictPolicy = "stop"} = {}) {
		if (this.unsavedChanges) {
			if (conflictPolicy === "ask") {
				// TODO non-modal confirmation
				if (!confirm(this._("remote-data-conflict"))) {
					return;
				}
			}
			else if (conflictPolicy === "stop") {
				return;
			}
		}

		return this.load({data});
	}

	/**
	 * load - Fetch data from source and render it.
	 *
	 * @return {Promise}  A promise that resolves when the data is loaded.
	 */
	async load ({backend, data} = {}) {
		let specificBackend = backend;
		backend = backend ?? this.sourceBackend;

		if (!backend && !data) {
			// Nothing to do here
			return;
		}

		let autoSaveState = this.autoSave;
		this.autoSave = false;

		if (data === undefined) {
			this.inProgress = "loading";

			await backend.ready;

			data = null;

			try {
				data = await backend.load();
			}
			catch (err) {
				if (!specificBackend && this.init && this.init !== backend) {
					await this.init.ready;

					try {
						data = await this.init.load();
						backend = this.init;
					}
					catch (e) {}
				}

				if (err && data === null) {
					let response = err instanceof Response || err instanceof XMLHttpRequest? err : err.xhr;

					if (response?.status !== 404) {
						let message = this._("problem-loading");

						if (response) {
							message += response.status? this._("http-error", err) : ": " + this._("cant-connect");
						}

						this.error(message, err);
					}
				}
			}

			this.inProgress = false;
		}

		this.render(data);

		await Mavo.defer();

		this.dataLoaded.resolve();
		this.element.dispatchEvent(new CustomEvent("mv-load", {detail: backend, bubbles: true}));
		this.autoSave = autoSaveState;
	}

	async store () {
		if (!this.storage) {
			return;
		}

		this.inProgress = "saving";

		let saved;

		try {
			saved = await this.storage.store(this.getData());
		}
		catch (err) {
			if (err) {
				var message = this._("problem-saving");

				if (err instanceof XMLHttpRequest) {
					message += ": " + (err.status? this._("http-error", err) : this._("cant-connect"));
				}

				this.error(message, err);
			}

			saved = null;
		}

		this.inProgress = false;
		return saved;
	}

	upload (file, path = "images/" + file.name) {
		if (!this.uploadBackend) {
			return Promise.reject();
		}

		this.inProgress = "uploading";

		return this.uploadBackend.upload(file, path)
			.then(url => {
				this.inProgress = false;
				return url;
			})
			.catch(err => {
				this.error(this._("error-uploading"), err);
				this.inProgress = false;
				return null;
			});
	}

	async save () {
		_.hooks.run("save-start", this);
		let saved = await this.store();

		if (saved) {
			$.fire(this.element, "mv-save", saved);

			this.lastSaved = Date.now();
			this.root.save();
			this.unsavedChanges = false;
		}
	}

	walk () {
		return this.root.walk(...arguments);
	}

	calculateNeedsEdit () {
		var needsEdit = false;

		this.walk((obj, path) => {
			if (needsEdit) {
				// If already true, no need to descend further
				return false;
			}

			// True if both modes are allowed and node is not group
			needsEdit = !obj.modes && !(obj instanceof Mavo.Group);

			return !obj.modes;
		}, undefined, {descentReturn: true});

		return needsEdit;
	}

	changed (change) {
		if (!this.root) {
			// No tree yet
			return;
		}

		if (this.expressions.active) {
			this.expressions.updateThrottled(change);
		}
	}

	setDeleted (...nodes) {
		// Clear previous deleted item(s)
		this.deleted.forEach(node => node.destroy());
		this.deleted.length = 0;

		this.deletionNotice?.close();

		if (!nodes.length) {
			return;
		}

		this.deleted.push(...nodes);

		if (nodes.length == 1) {
			var phrase = nodes[0].name;
		}
		else { // Multiple items deleted, possibly from multiple collections
			var counts = {}, ret = [];

			nodes.forEach(n => {
				counts[n.name] = (counts[n.name] || 0) + 1;
			});

			for (var name in counts) {
				ret.push(this._("n-items", {name, n: counts[name]}));
			}

			var phrase = ret.join(", ");
		}

		var notice = this.deletionNotice = this.message(
			[
				this._("item-deleted", {name: phrase}),
				{
					tag: "button",
					type: "button",
					textContent: this._("undo"),
					events: {
						click: evt => {
							this.undoDelete();
							this.deletionNotice.close(true);
						}
					}
				}
			], {
				classes: "mv-deleted",
				dismiss: {
					button: true,
					timeout: 20000
				}
			});

		notice.closed.then(undone => {
			if (!undone && this.deleted.length) {
				// Gone forever now
				this.deleted.forEach(node => node.destroy());
				this.deleted.length = 0;
			}

			if (this.deletionNotice == notice) {
				this.deletionNotice = null;
			}
		});
	}

	undoDelete () {
		this.deleted.forEach(node => node.collection.add(node, node.index));
		this.deleted.length = 0;
	}

	// A lot of this is inspired by @hopeful2's work in https://github.com/mavoweb/mavo/pull/430
	destroy () {
		Mavo.hooks.run("mavo-destroy-start", this);

		if (this.editing) {
			this.done();
		}

		// first remove observers.
		this.observer.destroy();

		this.bar?.destroy();

		// .index starts from 1, .all starts from 0
		// ISSUE Should we just delete this and rearrange the other indices?
		Mavo.all[this.id] = Mavo.all[this.index - 1] = null;

		this.root.destroy();

		Mavo.hooks.run("mavo-destroy-end", this);
	}

	static version = "v0.3.0"

	static all = {}

	static get (id) {
		if (id instanceof Element) {
			// Get by element
			for (let name in _.all) {
				if (_.all[name].element == id) {
					return _.all[name];
				}
			}

			return null;
		}

		let name = typeof id === "number"? Object.keys(_.all)[id] : id;

		return _.all[name] || null;
	}

	static superKey = navigator.platform.indexOf("Mac") === 0? "metaKey" : "ctrlKey"
	static base = ["blob:", "about:"].includes(location.protocol)? (document.currentScript?.src || "https://mavo.io") : location
	static dependencies = [
		// Plugins.load() must be run after DOM load to pick up all mv-plugins attributes
		$.ready().then(() => _.Plugins.load()),
	]

	// Only naive tests here (no false positives, but false negatives are ok).
	// polyfill.io will do more proper checking
	static polyfillsNeeded = {
		"blissfuljs": Array.from && document.documentElement.closest && self.URL && "searchParams" in URL.prototype,
		"Intl.~locale.en": self.Intl,
		"IntersectionObserver": self.IntersectionObserver,
		"Symbol": self.Symbol,
		"Element.prototype.remove": Element.prototype.remove,
		"Element.prototype.before": Element.prototype.before,
		"Element.prototype.after": Element.prototype.after,
		"Element.prototype.prepend": Element.prototype.prepend,
		"Array.prototype.flat": Array.prototype.flat,
		"Array.prototype.flatMap": Array.prototype.flatMap,
	}
	static polyfills = []

	static init (container = document) {
		let mavos = Array.isArray(arguments[0])? arguments[0] : $$(_.selectors.init, container);

		let ret = mavos.filter(element => !_.get(element)) // not already inited
			.map(element => new _(element));

		return ret;
	}

	static observe (options, callback) {
		_.observers = _.observers || new Mavo.Observers();
		return _.observers.observe(options, callback);
	}

	static unobserve (options, callback) {
		_.observers.unobserve(options, callback);
	}

	static warn (message, o = {}) {
		_.warn.history = _.warn.history || new Set();

		if (!_.warn.history.has(message)) {
			console.warn(message);
		}

		if (o.once !== false) {
			_.warn.history.add(message);
		}
	}

	/**
	 * Similar to Promise.all() but can handle post-hoc additions
	 * and does not reject if one promise rejects.
	 */
	static thenAll (iterable) {
		// Turn rejected promises into resolved ones
		$$(iterable).forEach(promise => {
			if ($.type(promise) == "promise") {
				promise = promise.catch(err => err);
			}
		});

		return Promise.all(iterable).then(resolved => {
			if (iterable.length != resolved.length) {
				// The list of promises or values changed. Return a new Promise.
				// The original promise won't resolve until the new one does.
				return _.thenAll(iterable);
			}

			// The list of promises or values stayed the same.
			// Return results immediately.
			return resolved;
		});
	}

	static promise (constructor) {
		let res, rej;

		let promise = new Promise((resolve, reject) => {
			if (typeof constructor === "function") {
				constructor(resolve, reject);
			}
			else if (constructor instanceof Promise) {
				constructor.then(resolve);
				constructor.catch(reject);
			}

			res = resolve;
			rej = reject;
		});

		promise.resolve = a => {
			res(a);
			return promise;
		};

		promise.reject = a => {
			rej(a);
			return promise;
		};

		return promise;
	}

	static defer = delay => new Promise(resolve => delay === undefined? requestAnimationFrame(resolve) : setTimeout(resolve, delay))

	static UI = {}

	static hooks = new $.Hooks()

	// Will be filled with a union of all properties across all Mavos
	static properties = new Set()

	static attributes = [
		"mv-app", "mv-storage", "mv-source", "mv-init", "mv-path", "mv-format",
		"mv-attribute", "mv-default", "mv-mode", "mv-edit", "mv-editor", "mv-permisssions",
		"mv-rel", "mv-value"
	]
}, {
	live: {
		inProgress (value) {
			$.toggleAttribute(this.element, "mv-progress", value, value);
			$.toggleAttribute(this.element, "aria-busy", !!value, !!value);
			this.element.style.setProperty("--mv-progress-text", value? `"${this._(value)}"` : "");
		},

		unsavedChanges (value) {
			this.element.classList.toggle("mv-unsaved-changes", value);
		},

		needsEdit (value) {
			if (this.bar) {
				this.bar.toggle("edit", value && this.permissions.edit);
			}
		},

		storage (value) {
			if (value !== this._storage && !value) {
				let permissions = new Mavo.Permissions({edit: true, save: false});
				permissions.parent = this.permissions.parent;
				this.permissions.parent = permissions;
			}
		},

		primaryBackend (value) {
			value = value || null;

			if (value != this._primaryBackend) {
				return value;
			}
		},

		uploadBackend: {
			get() {
				const backend = this.uploads;

				if (backend?.upload) {
					// We need to authenticate a user if we haven't done that earlier
					if (backend.permissions.login) {
						backend.login();
					}

					return this.uploads;
				}

				if (this.storage?.upload) {
					// Prioritize storage
					return this.storage;
				}
			}
		}
	},
	lazy: {
		locale: () => document.documentElement.lang || "en-GB"
	}
});

// Define symbols
// These are lazy to give the Symbol polyfill a chance to load if needed
["toNode", "isProxy", "route", "parent", "property", "mavo", "groupedBy", "as"].forEach(symbol => {
	$.lazy(_, symbol, () => Symbol(symbol));
});

Object.defineProperty(_.all, "length", {
	get: function() {
		return Object.keys(this).length;
	}
});

{

let s = _.selectors = {
	init: "[mv-app], [data-mv-app]",
	property: "[property]",
	group: "[typeof], [mv-group]",
	list: "[mv-list]",
	multiple: "[mv-list-item]",
	formControl: "input, select, option, textarea",
	textInput: ["text", "email", "url", "tel", "search", "number"].map(t => `input[type=${t}]`).join(", ") + ", input:not([type]), textarea",
	ui: ".mv-ui"
};

s.primitive = s.property + `:not(${s.group}, ${s.list})`;
s.childGroup = s.property + `:is(${s.group})`;
s.scope = `:is(${s.group}, ${s.multiple}, ${s.list})`;
s.item = s.multiple + ", " + s.group;
s.output = "[property=output], .mv-output";

}

$.each(_.polyfillsNeeded, (id, supported) => {
	if (!supported) {
		_.polyfills.push(id);
	}
});

_.ready = _.thenAll(_.dependencies);
_.inited = _.promise();

// Init mavo. Async to give other scripts a chance to modify stuff.
await _.defer();

if (_.polyfills.length > 0) {
	var polyfillURL = "https://cdn.polyfill.io/v2/polyfill.min.js?unknown=polyfill&features=" + _.polyfills.map(a => a + "|gated").join(",");
	_.dependencies.push($.include(polyfillURL));
}

await $.ready();

/***********************
 * Various HTML fixups
 ***********************/

// Convert any data-mv-* attributes to mv-*
Mavo.attributeStartsWith("data-mv-").forEach(attribute => {
	let element = attribute.ownerElement;
	let name = attribute.name.replace("data-", "");
	Mavo.setAttributeShy(element, name, attribute.value);
});

// Expand mv-list="foo" to mv-list property="foo" and same for items
$$("[mv-list]:not([property])").forEach(e => e.setAttribute("property", e.getAttribute("mv-list")));
$$("[mv-list-item]:not([property])").forEach(e => e.setAttribute("property", e.getAttribute("mv-list-item")));

_.containers = {
	"TR": "TBODY",
	"OPTION": "OPTGROUP",
};

// mv-list without mv-list-item child
$$("[mv-list]").forEach(list => {
	if (!$(":scope > [mv-list-item]", list)) {
		if (list.children.length === 1 && !list.children[0].matches("[property]")) {
			// A single non-Mavo node child, make that the list item
			list.children[0].setAttribute("mv-list-item", "");
		}
		else {
			// Wrap contents in list item
			let itemTags = Object.entries(_.containers).filter(([_, i]) => i === list.tagName);
			let itemTag = itemTags[0] || "div";
			$.create(itemTag, {
				className: "mv-container",
				"mv-list-item": "",
				contents: [...list.childNodes],
				inside: list
			});
		}
	}
});

$$("[mv-list-item], [mv-multiple]").forEach(item => {
	let wasLegacy;

	if (!item.hasAttribute("mv-list-item")) {
		// Transition legacy mv-multiple syntax to new mv-list/mv-list-item syntax
		let multiple = item.getAttribute("mv-multiple");
		item.setAttribute("mv-list-item", multiple);

		if (!item.hasAttribute("property")) {
			if (multiple) { // mv-multiple has a value
				item.setAttribute("property", multiple);
			}
			else {
				let property = _.Node.getImplicitPropertyName(item)
				        || _.Node.generatePropertyName("collection", item);
				item.setAttribute("property", property);
			}
		}

		wasLegacy = true;
		Mavo.warn("@mv-multiple is deprecated. Please use @mv-list-item and @mv-list instead");
	}

	if (!item.hasAttribute("property")) {
		// Expand mv-list-item="foo" to mv-list-item property="foo" and same for items
		item.setAttribute("property", item.getAttribute("mv-list-item"));
	}

	let parent = item.parentNode;
	let list = parent;
	let property = Mavo.Node.getProperty(item);

	if (!parent.hasAttribute("mv-list")) {
		// Wrap mv-list-item without mv-list parent
		if (parent.children.length !== 1 || parent.matches("[mv-app], [property], [mv-list-item]")) {
			// Parent is a Mavo node and cannot just become the collection,
			// create a new element for that
			let listTag = _.containers[item.tagName] || "div";
			list = $.create(listTag, {
				className: "mv-container",
				around: item
			});
		}

		list.setAttribute("mv-list", "");

		if (property) {
			list.setAttribute("property", property);
		}

		// Transfer list-specific attributes to list
		Mavo.moveAttribute("mv-initial-items", item, list);
		Mavo.moveAttribute("mv-order", item, list);
		Mavo.moveAttribute("mv-accepts", item, list);
		Mavo.moveAttribute("mv-alias", item, list);

		if (wasLegacy) {
			Mavo.moveAttribute("mv-value", item, list);
			Mavo.moveAttribute("mv-mode", item, list);
			Mavo.moveAttribute("mv-multiple-path", item, list, {rename: "mv-path"});
		}
		else {
			Mavo.warn("Please wrap @mv-list-item elements with @mv-list elements");
		}
	}

	let listProperty = list.getAttribute("property");
	let itemProperty = item.getAttribute("property");

	// Make sure mv-list and mv-list-item have the same property (and that one exists)
	if (!listProperty && itemProperty) {
		list.setAttribute("property", itemProperty);
	}
	else if (listProperty !== itemProperty || !listProperty) {
		 // Normalize list property
		let property = Mavo.Node.getProperty(list) || Mavo.Node.generatePropertyName("item", list);

		if (!listProperty) {
			list.setAttribute("property", property);
		}

		item.setAttribute("property", property);
	}
});

// Resolve empty property attributes
$$("[property='']").forEach(element => {
	let property = Mavo.Node.getProperty(element) || Mavo.Node.generatePropertyName("prop", element);
	element.setAttribute("property", property);
})

$$(_.selectors.init).forEach(function(elem) {
	// Skip if an instance has been created, for example by another script.
	if (!_.get(elem)) {
		elem.setAttribute("mv-progress", "Loading");
	}
});

if (window.CSSPropertyRule) {
	let root = document.documentElement;
	root.classList.add("mv-supports-atproperty");
}

await _.ready;

_.init();
_.inited.resolve();

})(Bliss, Bliss.$);

(function ($, $$) {

var _ = $.extend(Mavo, {
	/**
	 * Load a file, only once
	 */
	load: (url, base = document.currentScript?.src ?? location) => {
		return $.load(url, base);
	},

	readFile: (file, format = "DataURL") => {
		var reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.onload = f => resolve(reader.result);
			reader.onerror = reader.onabort = reject;
			reader["readAs" + format](file);
		});
	},

	toJSON: data => {
		if (data === null) {
			return "";
		}

		if (typeof data === "string") {
			// Do not stringify twice!
			return data;
		}

		try {
			return JSON.stringify(data, null, "\t");
		}
		catch (e) {
			return e;
		}
	},

	/**
	 * toJSON without cycles
	 */
	safeToJSON: function(o) {
		var cache = new WeakSet();

		return JSON.stringify(o, (key, value) => {
			if (typeof value === "object" && value !== null) {
				// No circular reference found

				if (cache.has(value)) {
					return; // Circular reference found!
				}

				cache.add(value);
			}

			return value;
		});
	},

	// Detect if this is a plain object, not an instance of some other class
	isPlainObject: o => {
		if ($.type(o) !== "object") {
			return false;
		}

		var proto = Object.getPrototypeOf(o);
		return proto.constructor?.name === "Object";
	},

	// Specifiy a primitive fallback for an object
	primitivify: (object, primitive) => {
		if (object) {
			if (primitive && typeof primitive === "object") {
				// Primitive is objectified, must copy its metadata to avoid losing it
				Object.assign(object, primitive);
				primitive = Mavo.value(primitive);
			}

			object.valueOf = object.toJSON = object[Symbol.toPrimitive] = () => primitive;
		}

		return object;
	},

	objectify: (value, properties) => {
		var primitive = Mavo.value(value);

		if (typeof value !== "object" || value === null) {
			if (value === null) {
				value = {
					[Symbol.toStringTag]: "Null",
					toJSON: () => null
				};
			}
			else {
				var constructor = value.constructor;
				value = new constructor(primitive);
				value[Symbol.toStringTag] = constructor.name;
			}

			_.primitivify(value, primitive);
		}

		return $.extend(value, properties);
	},

	value: value => value?.valueOf? value.valueOf() : value,

	/**
	 * Array & set utlities
	 */

	// If the passed value is not an array, convert to an array
	toArray: arr => {
		return arr === undefined? [] : Array.isArray(arr)? arr : [arr];
	},

	// Adds items from set2 into set1, turns set1 into a set if it's not
	union: (set1, set2) => {
		if (set1 instanceof Set && set2) {
			set2.forEach(x => set1.add(x));
			return set1;
		}

		return new Set([...(set1 || []), ...(set2 || [])]);
	},

	/**
	 * DOM element utilities
	 */

	/**
	 * Get the current value of a CSS property on an element
	 */
	getStyle: (element, property) => {
		if (element && element instanceof Element) {
			let value = getComputedStyle(element).getPropertyValue(property);

			return value?.trim();
		}
	},
	/**
	 * Get/set data on an element
	 */
	data: function(element, name, value) {
		if (!element) {
			return null;
		}

		var data = _.elementData.get(element) || {}, ret;

		if (arguments.length == 2) {
			ret = data[name];
		}
		else if (value === undefined) {
			delete data[name];
		}
		else {
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
	elementPath: function (ancestor, element) {
		if (Array.isArray(element)) {
			// Get element by path
			var path = element;

			var ret = path.reduce((acc, cur) => {
				return acc.children[cur >> 0] || acc;
			}, ancestor);

			var last = path[path.length - 1];

			if (last != (last >> 0)) {
				// We are returning a non-element node
				var offset = +(last + "").split(".")[1];

				if (last >> 0 < 0) {
					ret = ret.firstChild;
					offset--;
				}

				for (var i=0; i<offset; i++) {
					ret = ret.nextSibling;
				}
			}

			return ret;
		}
		else {
			// Get path
			var path = [];

			for (var parent = element; parent && parent != ancestor; parent = parent.parentNode) {
				var index = 0;
				var countNonElementSiblings = parent === element && element.nodeType !== 1;
				var offset = countNonElementSiblings? 1 : 0;
				var sibling = parent;

				while (sibling = sibling[`previous${countNonElementSiblings? "" : "Element"}Sibling`]) {
					if (countNonElementSiblings) {
						offset++;

						if (sibling.nodeType == 1) {
							countNonElementSiblings = false;
						}
					}
					else {
						index++;
					}
				}

				if (offset > 0) {
					index = index - 1 + "." + offset;
				}

				path.unshift(index);
			}

			return parent? path : null;
		}
	},

	/**
	 * Revocably add/remove elements from the DOM
	 */
	revocably: {
		add: function(element, insert) {
			var comment = _.revocably.isRemoved(element);

			if (comment?.parentNode) {
				comment.parentNode.replaceChild(element, comment);
			}
			else if (element && insert && !element.parentNode) {
				// Has not been revocably removed because it has never even been added
				if (typeof insert === "function") {
					insert(element);
				}
				else {
					insert.appendChild(element);
				}
			}

			return comment;
		},

		remove: function(element, commentText) {
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

		isRemoved: function(element) {
			if (!element || element.parentNode) {
				return false;
			}

			var comment = _.data(element, "commentstub");

			if (comment?.parentNode) {
				return comment;
			}

			return false;
		},

		setAttribute: function(element, attribute, value) {
			var previousValue = _.data(element, "attribute-" + attribute);

			if (previousValue === undefined) {
				// Only set this when there's no old value stored, otherwise
				// if called multiple times, it could result in losing the original value
				_.data(element, "attribute-" + attribute, element.getAttribute(attribute));
			}

			element.setAttribute(attribute, value);
		},

		restoreAttribute: function(element, attribute) {
			var previousValue = _.data(element, "attribute-" + attribute);

			if (previousValue !== undefined) {
				$.toggleAttribute(element, attribute, previousValue);
				_.data(element, "attribute-" + attribute, undefined);
			}
		}
	},

	inView: {
		is: element => {
			var r = element.getBoundingClientRect();

			return (0 <= r.bottom && r.bottom <= innerHeight || 0 <= r.top && r.top <= innerHeight) // vertical
			       && (0 <= r.right && r.right <= innerWidth || 0 <= r.left && r.left <= innerWidth); // horizontal
		},

		when: (element, rootMargin = `${innerHeight / 2}px ${innerWidth/2}px`) => {
			var observer = _.inView.observer = _.inView.observer || new IntersectionObserver(function(entries, observer) {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0) {
						observer.unobserve(entry.target);
						$.fire(entry.target, "mv-inview", {entry});
					}
				});
			}, {rootMargin});

			return new Promise(resolve => {
				if (_.inView.is(element)) {
					resolve();
				}

				observer.observe(element);

				var callback = evt => {
					element.removeEventListener("mv-inview", callback);
					evt.stopPropagation();
					resolve();
				};

				element.addEventListener("mv-inview", callback);
			});
		}
	},

	scrollIntoViewIfNeeded: element => {
		if (element && !Mavo.inView.is(element)) {
			element.scrollIntoView({behavior: "smooth"});
		}
	},

	/**
	 * Set attribute only if it doesn’t exist
	 */
	setAttributeShy: function(element, attribute, value) {
		if (!element.hasAttribute(attribute)) {
			element.setAttribute(attribute, value);
		}
	},

	/**
	 * Get the value of an attribute, with fallback attributes in priority order.
	 */
	getAttribute: function(element, ...attributes) {
		for (let i=0, attribute; attribute = attributes[i]; i++) {
			let value = element.getAttribute(attribute);

			if (value) {
				return value;
			}
		}

		return null;
	},

	getClosestAttribute: function(element, attribute) {
		return element.closest(`[${attribute}]`)?.getAttribute(attribute) ?? null;
	},

	moveAttribute (name, from, to, o = {}) {
		let value = from.getAttribute(name);

		if (value === null) {
			return;
		}

		let newName = o.rename || name;

		to.setAttribute(newName, value);
		from.removeAttribute(name);
	},

	/**
	 * Get the element identified by the URL hash
	 */
	getTarget: function() {
		var id = location.hash.substr(1);
		return document.getElementById(id);
	},

	XPath: function(query, context = document) {
		var doc = context.ownerDocument || context;
		var ret = [], node;

		if (doc.evaluate) {
			var result = doc.evaluate(query, context, null, XPathResult.ANY_TYPE, null);

			while (node = result.iterateNext()) {
				ret.push(node);
			}
		}

		return ret;
	},

	// Returns attribute nodes that start with `str` on or inside `context`
	// Use getAttributes() instead if you are only looking at the element itself and not its subtree
	// Use attr.ownerElement to get element
	attributeStartsWith: function(str, context = document.documentElement) {
		return _.XPath(`.//@*[starts-with(name(), "${str}")]`, context);
	},

	// Returns attribute names that match a regex
	getAttributes: function(element, regex) {
		return element.getAttributeNames().filter(name => regex.test(name));
	},

	// We need this to cache the results of the intense parsing operation in the following utility function
	// E.g., { "svg": { "viewbox": "viewBox", ... }, "math": { ... } }
	properlyCasedAttributesCache: {},

	// Fixes the case of attributes that are not all-lowercase
	// Especially useful for SVG attributes
	// https://html.spec.whatwg.org/multipage/parsing.html#adjust-svg-attributes
	getProperAttributeCase (element, attribute) {
		const roots = "svg, math, :root"; // Potential root elements

		const root = element.closest(roots).tagName;

		_.properlyCasedAttributesCache[root] ??= {};

		let attr = _.properlyCasedAttributesCache[root][attribute];
		if (attr) {
			return attr;
		}

		const tag = element.tagName;

		let doc = new DOMParser().parseFromString(`<${root}><${tag} ${attribute}=""></${tag}></${root}>`, "text/html");
		attr = doc.body.firstElementChild.firstElementChild.attributes[0].name;

		_.properlyCasedAttributesCache[root][attribute] = attr;

		return attr;
	},

	/**
	 *  Set/get a property or an attribute?
	 * @return {Boolean} true to use a property, false to use the attribute
	 */
	usePropertyInsteadOfAttribute: function (element, attribute) {
		if (["href", "src"].indexOf(attribute) > -1) {
			// URL properties resolve "" as location.href, fucking up emptiness checks
			return false;
		}

		if (attribute.startsWith("on")){
			// Event listener attributes should be set as attributes,
			// the properties expect functions and break with strings
			return false;
		}

		if (element.namespaceURI == "http://www.w3.org/2000/svg") {
			// SVG has a fucked up DOM, do not use these properties
			return false;
		}

		return true;
	},

	/**
	 * Object utilities
	 */

	/**
	 * Check if property exists in object. Like the in operator but more robust and does not throw.
	 * Why not just in? E.g. "foo".length is 3 but "length" in "foo" throws
	 */
	in: function(property, obj) {
		if (obj) {
			return (typeof obj === "object" && property in obj) || obj[property] !== undefined;
		}
	},

	/**
	 * Get real property name from case insensitive property
	 */
	getCanonicalProperty: function(obj, property) {
		if (obj && (property || property === 0)) {
			// Property in object?
			if (_.in(property, obj)) {
				return property;
			}

			if (property.toLowerCase) {
				// Lowercase property in object?
				var propertyL = property.toLowerCase();

				if (_.in(propertyL, obj)) {
					return propertyL;
				}

				// Any case property in object?
				var properties = Object.keys(obj);
				var i = properties.map(p => p.toLowerCase()).indexOf(propertyL);

				if (i > -1) {
					return properties[i];
				}
			}
		}
	},

	subset: function(obj, path, value) {
		if (arguments.length == 3) {
			// Put
			if (path.length) {
				var last = path[path.length - 1];
				var parent = $.value(obj, ...path.slice(0, -1));

				if (Array.isArray(parent) && Array.isArray(value)) {
					// Merge arrays instead of adding array inside array
					parent.splice(last, 1, ...value);
				}
				else if (parent) {
					parent[path[path.length - 1]] = value;
				}

				return obj;
			}

			return value;
		}
		else if (typeof obj == "object" && path?.length) { // Get
			return path.reduce((obj, property, i) => {
				let ret;
				let idQuery = property?.startsWith?.("id=")? property.substring(3) : null;

				if (idQuery !== null) {
					let index = obj.findIndex(o => Mavo.Functions.get(o, "id") == idQuery);
					ret = index > -1? obj[index] : {id: idQuery}; // if not found, return dummy
					path[i] = index > -1? index : obj.length;
				}
				else {
					ret = Mavo.Functions.get(obj, property);
					path[i] = property;
				}

				return ret;
			}, obj);
		}
		else {
			return obj;
		}
	},

	clone: function(o) {
		if (!o || typeof o !== "object") {
			return o;
		}

		return JSON.parse(_.safeToJSON(o));
	},

	// Will not work for symbols
	shallowClone: function(o) {
		if (!o || typeof o !== "object") {
			return o;
		}

		if (Array.isArray(o)) {
			return [...o];
		}

		return $.extend({}, o);
	},

	// Credit: https://remysharp.com/2010/07/21/throttling-function-calls
	debounce: function (fn, delay) {
		if (!delay) {
			// No throttling
			return fn;
		}

		var timer = null, code;

		return function () {
			var context = this, args = arguments;

			code = function () {
				fn.apply(context, args);
				removeEventListener("beforeunload", code);
			};

			clearTimeout(timer);
			timer = setTimeout(code, delay);
			addEventListener("beforeunload", code);
		};
	},

	escapeRegExp: s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),

	observeResize: function(element, callbackOrObserver) {
		if (!self.ResizeObserver) {
			return;
		}

		var previousRect = null;
		var ro = callbackOrObserver instanceof ResizeObserver? callbackOrObserver : new ResizeObserver(entries => {
			var contentRect = entries[entries.length - 1].contentRect;

			if (previousRect
				&& previousRect.width == contentRect.width
				&& previousRect.height == contentRect.height) {
				return;
			}

			callbackOrObserver(entries);

			previousRect = contentRect;
		});

		ro.observe(element);

		return ro;
	},

	Observer: class Observer {
		constructor (element, attribute, callback, o = {}) {
			if (callback instanceof MutationObserver) {
				this.observer = callback;
			}

			this.observer = this.observer || new MutationObserver(callback);
			this.callback = callback;
			this.update(element, attribute, o);

			this.run();
		}

		update (element, attribute, options) {
			this.element = element;
			this.attribute = attribute;
			this.options = $.extend({}, options);

			// We use the user-provided options object verbatim if it exists and
			// is valid, i.e. has at least one of the required properties
			if (options === undefined || !options.attributes && !options.childList && !options.characterData) {
				if (this.attribute) {
					Object.assign(this.options, {
						attributes: true,
						attributeFilter: this.attribute == "all"? undefined : Mavo.toArray(this.attribute),
						attributeOldValue: !!options.oldValue
					});
				}

				if (!this.attribute || this.attribute == "all") {
					Object.assign(this.options, {
						characterData: true,
						childList: true,
						subtree: true,
						characterDataOldValue: !!options.oldValue
					});
				}
			}

			if (this.observer?.running) {
				this.stop();
				this.run();
			}
		}

		flush () {
			let records = this.observer?.takeRecords();

			if (records) {
				this.callback(records);
			}
		}

		stop () {
			this.observer?.disconnect();
			this.running = false;
			return this;
		}

		run () {
			if (this.observer) {
				this.observer.observe(this.element, this.options);
				this.running = true;
			}

			return this;
		}

		/**
		 * Like stop(), but saves running state and then resumes it
		 */
		pause () {
			this.runOnResume = this.running;
			this.stop();
		}

		/**
		 * Like run(), but runs only if observer was running before pause().
		 */
		resume () {
			if (this.runOnResume !== false) {
				this.run();
			}

			delete this.runOnResume;
		}

		destroy () {
			this.stop();
			this.observer = this.element = null;
		}
	},

	/**
	 * Run & Return a function
	 */
	rr: function(f) {
		f();
		return f;
	},

	// Get out of bounds array index to wrap around
	wrap: (index, length) => index < 0? length - 1 : index >= length? 0 : index,

	/**
	 * Parses a simple CSS-like text format for declaring key-value options:
	 * Pairs are comma or semicolon-separated, key and value are colon separated.
	 * Escapes are supported, via backslash. Useful for attributes.
	 */
	options: (str, {map} = {}) => {
		var ret = map? new Map() : {};

		str.trim().match(/(?:\\[,;]|[^,;])+/g)?.forEach(option => {
			if (option) {
				option = option.trim().replace(/\\([,;])/g, "$1");
				var pair = option.match(/^\s*((?:\\:|[^:])*?)\s*:\s*(.+)$/);
				let key, value;

				if (pair) {
					key = pair[1].replace(/\\:/g, ":");
					value = pair[2] === "false" ? false : pair[2];
				}
				else {
					// If no value, it's boolean
					key = option;
					value = true;
				}

				if (map) {
					ret.set(key, value);
				}
				else {
					ret[key] = value;
				}
			}
		});

		return ret;
	},

	/**
	 * Map that can hold multiple values per key
	 */
	BucketMap: class BucketMap {
		constructor({arrays = false} = {}) {
			this.map = new Map();
			this[Symbol.iterator] = this.map[Symbol.iterator];
			this.arrays = arrays;
		}

		set(key, value) {
			if (this.arrays) {
				var values = this.map.get(key) || [];
				values.push(value);
			}
			else {
				var values = this.map.get(key) || new Set();
				values.add(value);
			}

			this.map.set(key, values);
		}

		delete(key, value) {
			if (arguments.length == 2) {
				var values = this.map.get(key);

				if (values) {
					if (this.arrays) {
						let index = values.indexOf(value);

						if (index > -1) {
							values.splice(index, 1);
						}
					}
					else {
						values.delete(value);
					}
				}
			}
			else {
				this.map.delete(key);
			}
		}

		forEach(...args) {
			return this.map.forEach(...args);
		}
	}
});

/**
 * Collection of fake "observers" implemented over one large MutationObserver
 */
_.Observers = class Observers extends Map {
	constructor({observer, callback} = {}) {
		super();

		let self = _.Observers;
		this.callback = callback || self.callback;
		this.observer = observer || (self.observer = self.observer || new MutationObserver(this.callback));
	}

	applyRecord (r) {
		for (let [o, callback] of this.entries()) {
			if (_.Observers.matchesRecord(o, r)) {

				// If we are here, the observer matches
				let node = Mavo.Node.get(r.target, true);

				callback.call(this, {
					node,
					element: r.target,
					type: r.type,
					attribute: r.attributeName,
					record: r
				});

				if (o.once) {
					this.unobserve(o, callback);
				}
			}
		}
	}

	static matchesRecord (o, r) {
		if (o.active === false) {
			return false;
		}

		let element = r.target;

		if (o.selector && !element.matches?.(o.selector)) {
			return false;
		}

		if (o.attribute) {
			// We are monitoring attribute changes only
			if (r.type !== "attributes") {
				// Not an attribute change
				return false;
			}

			if (o.attribute !== true && o.attribute !== r.attributeName && !o.attribute.includes?.(r.attributeName)) {
				// We are monitoring specific attribute(s), and a different one changed
				return false;
			}
		}
		else if (r.type === "attributes" && o.attribute === false) {
			// We explicitly opted out monitoring attributes, and an attribute has changed
			return false;
		}

		if (o.element) {
			if (o.deep === false) {
				return element === o.element;
			}
			else {
				return o.element.contains(element);
			}
		}

		return true;
	}

	flush () {
		let records = this.observer.takeRecords();

		if (records) {
			this.callback(records);
		}
	}

	observe (o = {}, callback) {
		this.set(o, callback);
		return callback;
	}

	unobserve (options, callback) {
		let matches = this.find(options, callback);

		for (let [o, c] of matches.entries()) {
			this.delete(o);
		}
	}

	pause (options) {
		let matches = this.find(options);

		for (let [o, c] of matches.entries()) {
			// Decativate and store active state
			o._active = o.active !== false && o._active !== false;
			o.active = false;
		}

		this.flush();

		return matches;
	}

	resume (matches) {
		if (!(matches instanceof _.Observers)) {
			matches = this.find(matches);
		}

		this.flush();

		for (let [o, c] of matches.entries()) {
			// Restore active state
			o.active = o.active || o._active;
			delete o._active;
		}
	}

	find (options = {}, callback) {
		let keys = Object.keys(options);
		let ret = new Mavo.Observers();

		for (let [o, c] of this.entries()) {
			if (callback && callback !== c) {
				continue;
			}

			if (keys.every(k => o[k] === options[k])) {
				ret.set(o, c);
			}
		}

		return ret;
	}
};

// Default callback
_.Observers.callback = records => {
	if (this.size === 0) {
		return;
	}

	for (let r of records) {
		_.observers.applyRecord(r);
	}
};

// Bliss plugins

// Provide shortcuts to long property chains
$.proxy = $.classProps.proxy = $.overload(function(obj, property, proxy) {
	Object.defineProperty(obj, property, {
		get: function() {
			return this[proxy][property];
		},
		set: function(value) {
			this[proxy][property] = value;
		},
		configurable: true,
		enumerable: true
	});

	return obj;
});

// :target-within shim
function updateTargetWithin() {
	var element = _.getTarget();
	const cl = "mv-target-within";

	$$("." + cl).forEach(el => el.classList.remove(cl));

	while (element?.classList) {
		element.classList.add(cl);
		element = element.parentNode;
	}
};

document.addEventListener("mv-load", updateTargetWithin);
addEventListener("hashchange", updateTargetWithin);
Mavo.observe({attribute: "id"}, updateTargetWithin);

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.Locale = $.Class({
	constructor: function(lang, phrases) {
		this.lang = lang;
		this.phrases = {};
		this.extend(phrases);
	},

	get fallback() {
		// TODO should we fallback to other dialects? I.e. should en-US fallback to en-GB if en didn't exist?
		if (_.all[this.baseLang]) {
			return _.all[this.baseLang];
		}

		if (this !== _.default) {
			return _.default;
		}
	},

	extend: function(phrases) {
		$.extend(this.phrases, phrases);
	},

	phrase: function(id, vars) {
		var key = id.toLowerCase();
		var phrase = this.phrases[key];

		if (phrase === undefined && this.fallback) {
			phrase = this.fallback.phrase(key);
		}

		if (phrase === undefined) {
			// Everything failed, use id
			phrase = key.replace(/\b-\b/g, " ");
		}
		else if (vars) {
			var keys = phrase.match(/\{\w+(?=\})/g)?.map(v => v.slice(1)) ?? [];
			Mavo.Functions.unique(keys).forEach(name => {
				if (name in vars) {
					phrase = phrase.replace(RegExp(`{${name}}`, "gi"), vars[name]);
				}
			});
		}

		return phrase;
	},

	live: {
		lang: function(lang) {
			this.baseLang = _.getBaseLang(lang);

			if (lang == this.baseLang) {
				this.baseLang = null;
			}
		}
	},

	static: {
		all: {},

		/**
		 * Register new locale or extend existing locale
		 */
		register: function(lang, phrases) {
			if (_.all[lang]) {
				_.all[lang].extend(phrases);
			}
			else {
				_.all[lang] = new _(lang, phrases);
			}
		},

		// Get locale for a given language, use its base as fallback
		match: function(lang = "") {
			return _.all[lang] || _.all[_.getBaseLang(lang)];
		},

		// Get locale for a given language, use its base as fallback, and the default locale if nothing exists
		get: function(lang) {
			return _.match(lang) || _.default;
		},

		getBaseLang: function(lang) {
			return lang.split("-")[0];
		},

		lazy: {
			default: () => {
				return _.match(Mavo.locale) || _.all.en;
			}
		}
	}
});

/**
 * Use phrase
 */
Mavo.prototype._ = function(id, vars) {
	return this.locale && id? this.locale.phrase(id, vars) : id;
};

Mavo.ready.then(() => {
	$$("datalist.mv-phrases[lang]").forEach(datalist => {
		var phrases = $$("option", datalist).reduce((o, option) => {
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
	"gh-login-fork-options": "You have your own copy of this page, would you like to use it?",
	"gh-use-my-fork": "Yes, show me my data.",
	"remote-data-conflict": "There is new data but you have unsaved changes. Loading it will overwrite your changes. Load new data?"
});

(function ($, $$) {

Mavo.attributes.push("mv-plugins");

let _ = Mavo.Plugins = {
	loaded: {},

	async load () {
		_.plugins = new Set();

		let versions = {};
		$$("[mv-plugins]").forEach(element => {
			element
				.getAttribute("mv-plugins").trim().split(/\s+/)
				.forEach(plugin => {
					let [id, version] = plugin.split("@");

					_.plugins.add(id);

					// If an author requested several versions of the same plugin (with the same id),
					// the last specified version wins
					versions[id] = version;
				});
		});

		if (!_.plugins.size) {
			return;
		}

		// Fetch plugin index
		let response = await fetch(_.url + "/plugins.json");
		let json = await response.json();
		let plugin = json.plugin;

		// Fetch plugins
		return Mavo.thenAll(plugin
			.filter(plugin => _.plugins.has(plugin.id))
			.map(async (plugin) => {
				if (_.loaded[plugin.id]) {
					return Promise.resolve();
				}

				// Load plugin
				let filename = `mavo-${plugin.id}.js`;
				let url;

				if (plugin.repo) {
					// Plugin hosted in a separate repo
					let version = versions[plugin.id] || "latest";
					url = `https://cdn.jsdelivr.net/gh/${plugin.repo}@${version}/${filename}`;

					// Try to load the requested version of a plugin
					try {
						return await $.include(_.loaded[plugin.id], url);
					} catch(e) {
						// If there is no such version, fallback to the latest one (or the latest commit)
						url = `https://cdn.jsdelivr.net/gh/${plugin.repo}/${filename}`;
					}
				}
				else {
					// Plugin hosted in the mavo-plugins repo
					url = `${_.url}/${plugin.id}/${filename}`;
				}

				return $.include(_.loaded[plugin.id], url);
			}));
	},

	register: function(name, o = {}) {
		if (_.loaded[name]) {
			// Do not register same plugin twice
			return;
		}

		Mavo.hooks.add(o.hooks);

		for (let Class in o.extend) {
			let existing = Class == "Mavo"? Mavo : Mavo[Class];

			if ($.type(existing) === "function") {
				$.Class(existing, o.extend[Class]);
			}
			else {
				$.extend(existing, o.extend[Class]);
			}
		}

		let ready = [];

		if (o.ready) {
			ready.push(o.ready);
		}

		if (o.dependencies) {
			let base = document.currentScript? document.currentScript.src : location;
			let dependencies = o.dependencies.map(url => Mavo.load(url, base));
			ready.push(...dependencies);
		}

		if (ready.length) {
			Mavo.dependencies.push(...ready);
		}

		_.loaded[name] = o;

		if (o.init) {
			Promise.all(ready).then(() => o.init());
		}
	},

	url: "https://plugins.mavo.io"
};

})(Bliss, Bliss.$);

(function ($, $$) {

Mavo.attributes.push("mv-bar");

let _ = Mavo.UI.Bar = class Bar {
	constructor (mavo) {
		this.mavo = mavo;

		this.element = $(".mv-bar", this.mavo.element);
		this.template = this.mavo.element.getAttribute("mv-bar") || "";

		Mavo.observers.pause();

		if (this.element) {
			this.custom = true;
			this.template += " " + (this.element.getAttribute("mv-bar") || "");
			this.template = this.template.trim();

			for (let id in _.controls) {
				this[id] = $(`.mv-${id}`, this.element);

				if (this[id]) {
					this.template = this.template || "with";
					this.template += ` ${id}`;
				}
			}
		}
		else {
			this.element = $.create({
				className: "mv-bar mv-ui",
				start: this.mavo.element.tagName === "HTML"? document.body : this.mavo.element,
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

		for (let id of this.controls) {
			let o = _.controls[id];

			if (this[id]) {
				// Custom control, remove to not mess up order
				this[id].remove();
			}

			if (o.create) {
				this[id] = o.create.call(this.mavo, this[id]);
			}
			else if (!this[id]) {
				this[id] = $.create("button", {
					type: "button",
					className: `mv-${id}`,
					textContent: this.mavo._(id)
				});
			}

			// We initially add all of them to retain order,
			// then we remove revocably when/if needed
			this.add(id);

			if (o.permission) {
				this.permissions.can(o.permission, () => {
					this.toggle(id, !o.condition || o.condition.call(this.mavo));
				}, () => {
					this.remove(id);
				});
			}
			else if (o.condition && !o.condition.call(this.mavo)) {
				this.remove(id);
			}

			for (let events in o.events) {
				$.bind(this[id], events, o.events[events].bind(this.mavo));
			}
		}

		for (let id in _.controls) {
			let o = _.controls[id];

			if (o.action) {
				$.delegate(this.mavo.element, "click", ".mv-" + id, evt => {
					if (!o.permission || this.permissions.is(o.permission)) {
						o.action.call(this.mavo);
						evt.preventDefault();
					}
				});
			}
		}

		if (this.controls.length && !this.noResize) {
			this.resize();

			if (self.ResizeObserver) {
				this.resizeObserver = Mavo.observeResize(this.element, entries => {
					this.resize();
				});
			}
		}

		Mavo.observers.resume();
	}

	resize () {
		if (!this.targetHeight) {
			// We don't have a correct measurement for target height, abort
			this.targetHeight = this.element.offsetHeight;
			return;
		}

		this.resizeObserver?.disconnect();

		this.element.classList.remove("mv-compact", "mv-tiny");

		// Remove pointless tooltips
		$$("button, .mv-button", this.element).forEach(button => {
			if (button.title === button.textContent) {
				button.title = "";
			}
		});

		// Exceeded single row?
		if (this.element.offsetHeight > this.targetHeight * 1.6) {
			this.element.classList.add("mv-compact");

			if (this.element.offsetHeight > this.targetHeight * 1.2) {
				// Still too tall
				this.element.classList.add("mv-tiny");

				// Add tooltips, since only icons will be visible
				$$("button, .mv-button", this.element).forEach(button => {
					if (!button.title) {
						button.title = button.textContent;
					}
				});
			}
		}

		this.resizeObserver?.observe(this.element);
	}

	add (id) {
		let o = _.controls[id];

		if (o.prepare) {
			o.prepare.call(this.mavo);
		}

		Mavo.revocably.add(this[id], this.element);

		if (!this.resizeObserver && !this.noResize) {
			requestAnimationFrame(() => this.resize());
		}
	}

	remove (id) {
		let o =_.controls[id];

		Mavo.revocably.remove(this[id], "mv-" + id);

		if (o.cleanup) {
			o.cleanup.call(this.mavo);
		}

		if (!this.resizeObserver && !this.noResize) {
			requestAnimationFrame(() => this.resize());
		}
	}

	toggle (id, add) {
		return this[add? "add" : "remove"](id);
	}

	get permissions () {
		return this.mavo.permissions;
	}

	destroy () {
		this.resizeObserver.disconnect();
		this.resizeObserver = null;
	}

	static getControls (template, controls = _.controls) {
		template = template?.trim();

		if (template === "none") {
			return [];
		}

		let all = Object.keys(controls);

		if (!template) {
			// No template, return default set
			return all.filter(id => !controls[id].optional);
		}

		let relative = /^with\s|\bno-\w+\b/.test(template);
		template = template.replace(/\b^with\s+/g, "");
		let ids = template.split(/\s+/);

		// Convert both into sets
		all = new Set(all);
		ids = new Set(ids);

		for (let id of ids) {
			if (id.startsWith("no-")) {
				// Drop negative references
				ids.delete(id);

				id = id.slice(3); // Drop "no-"

				if (!ids.has(id)) {
					// If there's no positive reference *as well*, drop it
					// Note that this means that in `foo no-foo`, `no-foo` is ignored
					all.delete(id);
				}
			}
			else if (!all.has(id)) {
				// Drop nonexistent ids
				ids.delete(id);
			}
		}

		if (!relative) {
			return [...ids];
		}

		// Drop optional controls not specified from `all`
		for (let id of all) {
			let o = controls[id];

			if (o.optional && !ids.has(id)) {
				all.delete(id);
			}
		}

		all = [...all];

		// At this point all has all the buttons we want in the default order and ids has a subset, in the specified order
		// How do we combine them and preserve as much of the default order as we can while still following the specified order?

		if (ids.size === 0) {
			return all;
		}

		// First, we find which part of `all` needs to be reordered
		let indices = [...ids].map(id => all.indexOf(id));
		let start = Math.min(...indices);
		let end = Math.max(...indices);
		let before = all.slice(0, start);
		let after = all.slice(end + 1);
		let slice = all.slice(start, end + 1).filter(id => !ids.has(id));

		return [...before, ...slice, ...ids, ...after];
	}
}

_.controls = {
	status: {
		create: function(custom) {
			return custom || $.create({
				className: "mv-status"
			});
		},
		prepare: function() {
			let backend = this.primaryBackend;

			if (backend?.user) {
				let user = backend.user;
				let html = [user.name || ""];

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
				$.contents(this.bar.status, [
					{tag: "span", innerHTML: this._("logged-in-as", backend)},
					" ",
					...html
				]);
			}
		},
		permission: "logout"
	},

	edit: {
		action: function() {
			if (this.editing) {
				this.done();
				this.bar.edit.textContent = this._("edit");
			}
			else {
				this.edit();
				this.bar.edit.textContent = this._("editing");
			}
		},
		permission: ["edit", "add", "delete"],
		cleanup: function() {
			if (this.editing) {
				this.done();

				if (this.bar?.edit) {
					this.bar.edit.textContent = this._("edit");
				}
			}
		},
		condition: function() {
			return this.needsEdit;
		}
	},

	save: {
		action: function() {
			this.save();
		},
		events: {
			"mouseenter focus": function() {
				this.element.classList.add("mv-highlight-unsaved");
			},
			"mouseleave blur": function() {
				this.element.classList.remove("mv-highlight-unsaved");
			}
		},
		permission: "save",
		condition: function() {
			return !this.autoSave || this.autoSaveDelay > 0;
		}
	},

	export: {
		create: function(custom) {
			let a;

			if (custom) {
				a = custom.matches("a")? custom : $.create("a", {
					className: "mv-button",
					around: custom
				});
			}
			else {
				a = $.create("a", {
					className: "mv-export mv-button",
					textContent: this._("export")
				});
			}

			a.setAttribute("download", this.id + ".json");

			return a;
		},
		events: {
			mousedown: function() {
				this.bar.export.href = "data:application/json;charset=UTF-8," + encodeURIComponent(this.toJSON());
			}
		},
		permission: "edit",
		optional: true
	},

	import: {
		create: function(custom) {
			let button = custom || $.create("span", {
				role: "button",
				tabIndex: "0",
				className: "mv-import mv-button",
				textContent: this._("import"),
				events: {
					focus: evt => {
						input.focus();
					}
				}
			});

			let input = $.create("input", {
				type: "file",
				inside: button,
				events: {
					change: evt => {
						let file = evt.target.files[0];

						if (file) {
							let reader = $.extend(new FileReader(), {
								onload: evt => {
									this.inProgress = false;

									try {
										let json = JSON.parse(reader.result);
										this.render(json);
									}
									catch (e) {
										this.error(this._("cannot-parse"));
									}
								},
								onerror: evt => {
									this.error(this._("problem-loading"));
								}
							});

							this.inProgress = "uploading";
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
		action: function() {
			this.primaryBackend.login();
		},
		permission: "login"
	},

	logout: {
		action: function() {
			this.primaryBackend.logout();
		},
		permission: "logout"
	}
};

})(Bliss, Bliss.$);

(function ($, $$) {

var _ = Mavo.UI.Message = $.Class({
	constructor: function(mavo, message, o = {}) {
		this.mavo = mavo;
		this.message = message;
		this.closed = Mavo.promise();
		this.options = o;

		this.element = $.create({
			className: "mv-ui mv-message" + (o.type? " mv-" + o.type : ""),
			[$.type(this.message) == "string"? "innerHTML" : "contents"]: this.message,
			events: {
				click: e => Mavo.scrollIntoViewIfNeeded(this.mavo.element)
			},
			[this.mavo.bar? "after" : "start"]: (this.mavo.bar || this.mavo).element
		});

		if (o.style) {
			$.style(this.element, o.style);
		}

		if (o.classes) {
			this.element.classList.add(...o.classes.split(/\s+/));
		}

		if (o.type == "error") {
			this.element.setAttribute("role", "alert");
		}
		else {
			this.element.setAttribute("aria-live", "polite");
		}

		o.dismiss = o.dismiss || {};

		if (typeof o.dismiss == "string" || Array.isArray(o.dismiss)) {
			var dismiss = {};

			Mavo.toArray(o.dismiss).forEach(prop => {
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
					"click": evt => this.close()
				},
				start: this.element,
				title: this.mavo._("dismiss")
			});
		}

		if (o.dismiss.timeout) {
			var timeout = typeof o.dismiss.timeout === "number"? o.dismiss.timeout : 5000;

			$.bind(this.element, {
				mouseenter: e => clearTimeout(this.closeTimeout),
				mouseleave: Mavo.rr(e => this.closeTimeout = setTimeout(() => this.close(), timeout)),
			});
		}

		if (o.dismiss.submit) {
			this.element.addEventListener("submit", evt => {
				evt.preventDefault();
				this.close(evt.target);
			});
		}
	},

	async close (resolve) {
		// clearTimeout, make the callback available for garbage collection, and make it easier to debug memory issues
		// it does nothing if there is no timeout callback.
		clearTimeout(this.closeTimeout);
		var duration = this.element.style.transition ? 1000 * parseFloat(window.getComputedStyle(this.element, null).transitionDuration) : 400;
		await $.transition(this.element, {opacity: 0}, duration);

		$.remove(this.element);
		this.closed.resolve(resolve);
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.Permissions = $.Class({
	constructor: function(o) {
		this.triggers = [];
		this.hooks = new $.Hooks();

		// If we don’t do this, there is no way to retrieve this from inside parentChanged
		this.parentChanged = _.prototype.parentChanged.bind(this);

		this.set(o);
	},

	// Set multiple permissions at once
	set: function(o) {
		for (var action in o) {
			this[action] = o[action];
		}
	},

	// Set a bunch of permissions to true. Chainable.
	on: function(actions) {
		Mavo.toArray(actions).forEach(action => this[action] = true);

		return this;
	},

	// Set a bunch of permissions to false. Chainable.
	off: function(actions) {
		actions = Array.isArray(actions)? actions : [actions];

		actions.forEach(action => this[action] = false);

		return this;
	},

	// Fired once at least one of the actions passed can be performed
	// Kind of like a Promise that can be resolved multiple times.
	can: function(actions, callback, cannot) {
		this.observe(actions, true, callback);

		if (cannot) {
			// Fired once the action cannot be done anymore, even though it could be done before
			this.cannot(actions, cannot);
		}
	},

	// Fired once NONE of the actions can be performed
	cannot: function(actions, callback) {
		this.observe(actions, false, callback);
	},

	// Schedule a callback for when a set of permissions changes value
	observe: function(actions, value, callback) {
		actions = Mavo.toArray(actions);

		if (this.is(actions, value)) {
			// Should be fired immediately
			callback();
		}

		// For future transitions
		this.triggers.push({ actions, value, callback, active: true });
	},

	// Compare a set of permissions with true or false
	// If comparing with true, we want at least one to be true, i.e. OR
	// If comparing with false, we want ALL to be false, i.e. NOR
	is: function(actions, able = true) {
		var or = Mavo.toArray(actions).map(action => !!this[action])
		                .reduce((prev, current) => prev || current);

		return able? or : !or;
	},

	// Monitor all changes
	onchange: function(callback) {
		// Future changes
		this.hooks.add("change", callback);

		// Fire for current values
		_.actions.forEach(action => {
			callback.call(this, {action, value: this[action]});
		});
	},

	parentChanged: function(o = {}) {
		var localValue = this["_" + o.action];

		if (localValue !== undefined || o.from == o.value) {
			// We have a local value so we don’t care about parent changes OR nothing changed
			return;
		}

		this.fireTriggers(o.action);

		this.hooks.run("change", $.extend({context: this}, o));
	},

	// A single permission changed value
	changed: function(action, value, from) {
		from = !!from;
		value = !!value;

		if (value == from) {
			// Nothing changed
			return;
		}

		// $.live() calls the setter before the actual property is set so we
		// need to set it manually, otherwise it still has its previous value
		this["_" + action] = value;

		this.fireTriggers(action);

		this.hooks.run("change", {action, value, from, context: this});
	},

	fireTriggers: function(action) {
		this.triggers.forEach(trigger => {
			var match = this.is(trigger.actions, trigger.value);

			if (trigger.active && trigger.actions.indexOf(action) > -1 && match) {

				trigger.active = false;
				trigger.callback();
			}
			else if (!match) {
				// This is so that triggers can only be executed in an actual transition
				// And that if there is a trigger for [a,b] it won't be executed twice
				// if a and b are set to true one after the other
				trigger.active = true;
			}
		});
	},

	or: function(permissions) {
		_.actions.forEach(action => {
			this[action] = this[action] || permissions[action];
		});

		return this;
	},

	live: {
		parent: function(parent) {
			var oldParent = this._parent;

			if (oldParent == parent) {
				return;
			}

			this._parent = parent;

			// Remove previous trigger, if any
			if (oldParent) {
				let index = oldParent.hooks.change.indexOf(this.parentChanged);

				if (index > -1) {
					oldParent.hooks.change.splice(index, 1);
				}
			}

			// What changes does this cause? Fire triggers for them
			_.actions.forEach(action => {
				this.parentChanged({
					action,
					value: parent? parent[action] : undefined,
					from: oldParent? oldParent[action] : undefined
				});
			});

			if (parent) {
				// Add new trigger
				parent.onchange(this.parentChanged);
			}
		}
	},

	static: {
		actions: [],

		// Register a new permission type
		register: function(action, setter) {
			if (Array.isArray(action)) {
				action.forEach(action => _.register(action, setter));
				return;
			}

			$.live(_.prototype, action, {
				get: function() {
					var ret = this["_" + action];

					if (ret === undefined && this.parent) {
						return this.parent[action];
					}

					return ret;
				},
				set: function(able, previous) {
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

_.register("login", function(can) {
	if (can && this.logout) {
		this.logout = false;
	}
});

_.register("logout", function(can) {
	if (can && this.login) {
		this.login = false;
	}
});

_.register("edit", function(can) {
	if (can) {
		this.add = this.delete = true;
	}
});

_.register(["add", "delete"], function(can) {
	if (!can) {
		this.edit = false;
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

/**
 * Base class for all backends
 */
var _ = Mavo.Backend = class Backend extends EventTarget {
	constructor (url, o = {}) {
		super();

		// Permissions of this particular backend.
		this.permissions = new Mavo.Permissions();

		this.update(url, o);
	}

	update (url, o = {}) {
		this.source = url;

		// Backends that are not URL-based should just ignore this
		this.url = new URL(this.source, Mavo.base);

		this.options = o;
		this.mavo = o.mavo;
		this.format = Mavo.Formats.create(o.format, this);

		if (this.constructor.key ?? o.key) {
			this.key = o.key ?? this.constructor.key;
		}
	}

	async get (url = new URL(this.url)) {
		if (url.protocol != "data:" && this.constructor.useCache !== false) {
			url.searchParams.set("timestamp", Date.now()); // ensure fresh copy
		}

		try {
			let response = await fetch(url.href);
			return response.ok? response.text() : Promise.reject(response);
		}
		catch (e) {
			return null;
		}
	}

	async load () {
		await this.ready;
		let response = await this.get();

		if (typeof response != "string") {
			// Backend did the parsing, we're done here
			return response;
		}

		response = response.replace(/^\ufeff/, ""); // Remove Unicode BOM

		return this.format.parse(response);
	}

	async store (data, {path, format = this.format} = {}) {
		await this.ready;

		var serialized = typeof data === "string"? data : await format.stringify(data);
		await this.put(serialized, path);

		return {data, serialized};
	}

	// To be be overriden by subclasses
	ready = Promise.resolve()
	async login () {}
	async logout () {}
	put () {
		return Promise.reject();
	}

	isAuthenticated () {
		return !!this.accessToken;
	}

	// Any extra params to be passed to the oAuth URL.
	oAuthParams = () => ""

	toString () {
		return `${this.id} (${this.url})`;
	}

	equals (backend) {
		return backend === this || (backend && this.id == backend.id && this.source == backend.source);
	}

	/**
	 * Helper for making OAuth requests with JSON-based APIs.
	 */
	async request (call, data, method = "GET", req = {}) {
		req = Object.assign({}, req); // clone
		req.method = req.method || method;
		req.responseType = req.responseType || "json";

		req.headers = Object.assign({
			"Content-Type": "application/json; charset=utf-8"
		}, req.headers || {});

		if (this.isAuthenticated()) {
			req.headers["Authorization"] = req.headers["Authorization"] || `Bearer ${this.accessToken}`;
		}

		req.body = data;

		call = new URL(call, this.constructor.apiDomain);

		// Prevent getting a cached response. Cache-control is often not allowed via CORS
		if (req.method == "GET" && this.constructor.useCache !== false) {
			call.searchParams.set("timestamp", Date.now());
		}

		if ($.type(req.body) === "object") {
			if (req.method === "GET" || req.method === "HEAD") {
				for (let p in req.body) {
					let action = req.body[p] === undefined? "delete" : "set";
					call.searchParams[action](p, req.body[p]);
				}

				delete req.body;
			}
			else {
				req.body = JSON.stringify(req.body);
			}
		}

		let response;

		try {
			response = await fetch(call, req);
		}
		catch (err) {
			this.mavo.error("Something went wrong while connecting to " + this.id, err);
		}

		if (response?.ok) {
			if (req.method === "HEAD" || req.responseType === "response") {
				return response;
			}
			else {
				return response[req.responseType]();
			}
		}
		else {
			throw response;
		}
	}

	/**
	 * Helper method for authenticating in OAuth APIs
	 */
	oAuthenticate (passive) {
		return this.ready.then(() => {
			if (this.isAuthenticated()) {
				return Promise.resolve();
			}

			return new Promise((resolve, reject) => {
				var id = this.id.toLowerCase();

				if (passive) {
					this.accessToken = localStorage[`mavo:${id}token`];

					if (this.accessToken) {
						resolve(this.accessToken);
					}
				}
				else {
					// Show window
					var popup = {
						width: Math.min(1000, innerWidth - 100),
						height: Math.min(800, innerHeight - 100)
					};

					popup.top = (screen.height - popup.height)/2;
					popup.left = (screen.width - popup.width)/2;

					var state = {
						url: location.href,
						backend: this.id
					};

					this.authPopup = open(`${this.constructor.oAuth}?client_id=${this.key}&state=${encodeURIComponent(JSON.stringify(state))}` + this.oAuthParams(),
						"popup", `width=${popup.width},height=${popup.height},left=${popup.left},top=${popup.top}`);

					if (!this.authPopup) {
						var message = "Login popup was blocked! Please check your popup blocker settings.";
						this.mavo.error(message);
						reject(Error(message));
					}

					addEventListener("message", evt => {
						if (evt.source === this.authPopup) {
							if (evt.data.backend == this.id) {
								this.accessToken = localStorage[`mavo:${id}token`] = evt.data.token;
							}

							if (!this.accessToken) {
								reject(Error("Authentication error"));
							}

							resolve(this.accessToken);

							// Log in to other similar backends that are logged out
							for (var appid in Mavo.all) {
								var storage = Mavo.all[appid].primaryBackend;

								if (storage
									&& storage.id === this.id
									&& storage !== this
									&& !storage.isAuthenticated()) {
										storage.login(true);
								}
							}
						}
					});
				}
			});
		});
	}

	/**
	 * oAuth logout helper
	 */
	oAuthLogout () {
		if (this.isAuthenticated()) {
			var id = this.id.toLowerCase();

			localStorage.removeItem(`mavo:${id}token`);
			delete this.accessToken;

			this.permissions.off(["edit", "add", "delete", "save"]).on("login");

			$.fire(this, "mv-logout");
		}

		return Promise.resolve();
	}


	// Return the appropriate backend(s) for this url
	static create (url, o = {}, existing) {
		let Backend;

		if (o.type) {
			// Using get() for case-insensitive property lookup
			Backend = Mavo.Functions.get(_, o.type);
		}

		if (url && !Backend) {
			Backend = _.types.find(Backend => Backend.test(url, o)) || _.Remote;
		}

		// Can we re-use the existing object perhaps?
		if (Backend && existing?.constructor === Backend && existing.constructor.prototype.hasOwnProperty("update")) {
			existing.update(url, o);
			return existing;
		}

		return Backend? new Backend(url, o) : null;
	}

	static types = []

	static register (Class) {
		_[Class.name] = Class;
		_.types.push(Class);
		return Class;
	}
};

/**
 * Save in an HTML element
 */
_.register(class Element extends _ {
	id = "Element"

	constructor (url, o) {
		super(url, o);

		this.permissions.on(["read", "edit", "save"]);
	}

	update (url, o) {
		super.update(url, o);

		this.observer?.disconnect();

		this.element = $(this.source) ?? $.create("script", {
			type: "application/json",
			id: this.source.slice(1),
			inside: document.body
		});

		this.observer = this.observer ?? new MutationObserver(records => {
			$.fire(this, "mv-remotedatachange");
		});

		this.observer.observe(this.element, {
			childList: true,
			characterData: true,
			subtree: true
		});
	}

	async get () {
		return this.element.textContent;
	}

	async put (serialized) {
		this.observer.disconnect();

		let ret = this.element.textContent = serialized;

		this.observer.observe(this.element, {
			childList: true,
			characterData: true,
			subtree: true
		});

		return ret;
	}

	static test (url) {
		return url.indexOf("#") === 0;
	}
});

// Load from a remote URL, no save
_.register(class Remote extends _ {
	id = "Remote"

	constructor (url, o) {
		super(url, o);
		this.permissions.on("read");
	}

	static test (url) {
		return false;
	}
});

// Save in localStorage
_.register(class Local extends _ {
	id = "Local"

	constructor (url, o) {
		super(url, o);
		this.permissions.on(["read", "edit", "save"]);
	}

	update (url, o) {
		super.update(url, o);
		this.key = o.key || this.mavo.id;
	}

	get () {
		return Promise[this.key in localStorage? "resolve" : "reject"](localStorage[this.key]);
	}

	put (serialized) {
		if (!serialized) {
			delete localStorage[this.key];
		}
		else {
			localStorage[this.key] = serialized;
		}

		return Promise.resolve(serialized);
	}

	static test (value) {
		return value == "local";
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.Formats = {};

var base = _.Base = $.Class({
	abstract: true,
	constructor: function(backend) {
		this.backend = backend;
	},
	proxy: {
		"mavo": "backend"
	},

	// So that child classes can only override the static methods if they don't
	// need access to any instance variables.
	parse: function(content) {
		return this.constructor.parse(content, this);
	},
	stringify: function(data) {
		return this.constructor.stringify(data, this);
	},

	static: {
		parse: serialized => Promise.resolve(serialized),
		stringify: data => Promise.resolve(data),
		extensions: [],
		dependencies: [],
		ready: function() {
			return Promise.all(this.dependencies.map(d => $.include(d.test(), d.url)));
		}
	}
});

var json = _.JSON = $.Class({
	extends: _.Base,
	static: {
		parse: serialized => Promise.resolve(serialized? JSON.parse(serialized) : null),
		stringify: data => Promise.resolve(Mavo.toJSON(data)),
		extensions: [".json", ".jsonld"]
	}
});

var text = _.Text = $.Class({
	extends: _.Base,
	constructor: function(backend) {
		this.property = this.mavo.root.getNames("Primitive")[0];
	},

	static: {
		extensions: [".txt"],
		parse: (serialized, me) => Promise.resolve({[me? me.property : "content"]: serialized}),
		stringify: (data, me) => Promise.resolve(data[me? me.property : "content"])
	}
});

var csv = _.CSV = $.Class({
	extends: _.Base,
	constructor: function(backend) {
		this.property = this.mavo.root.getNames("Collection")[0];
		this.options = $.extend({}, _.CSV.defaultOptions);
	},

	static: {
		extensions: [".csv", ".tsv"],
		defaultOptions: {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true
		},
		dependencies: [{
			test: () => self.Papa,
			url: "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.4/papaparse.min.js"
		}],
		ready: base.ready,
		parse: async (serialized, me) => {
			await csv.ready();
			var data = Papa.parse(serialized, csv.defaultOptions);
			var property = me? me.property : "content";

			if (me) {
				// Get delimiter & linebreak for serialization
				me.options.delimiter = data.meta.delimiter;
				me.options.linebreak = data.meta.linebreak;
			}

			if (data.meta.aborted) {
				throw data.meta.errors.pop();
			}

			return {
				[property]: data.data
			};
		},

		stringify: async (data, me) => {
			await csv.ready();
			var property = me? me.property : "content";
			var options = me? me.options : csv.defaultOptions;
			return Papa.unparse(data[property], options);
		}
	}
});

Object.defineProperty(_, "create", {
	value: function(format, backend) {
		if (format && typeof format === "object") {
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
			var url = backend.url? backend.url.pathname : backend.source;
			var extension = url.match(/\.\w+$/)?.[0] ?? ".json";
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

(function($, $$) {

var _ = Mavo.Node = class Node {
	constructor (element, mavo, options = {}) {
		if (!element || !mavo) {
			throw new Error("Mavo.Node constructor requires an element argument and a mavo object");
		}

		var env = {context: this, options};

		// Set these first, for debug reasons
		this.uid = _.all.push(this) - 1;
		this.property = null;
		this.element = element;
		this.isHelperVariable = this.element.matches("meta");

		$.extend(this, env.options);

		_.elements.set(element, [...(_.elements.get(this.element) || []), this]);

		this.mavo = mavo;
		this.group = this.parent = this.parentGroup = env.options.group;

		this.template = env.options.template;

		this.alias = this.element.getAttribute("mv-alias");

		if (this.template) {
			this.template.copies.add(this);
		}
		else {
			// First (or only) of its kind
			this.copies = new Set();
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
		}

		// Must run before collections have a marker which messes up paths
		var template = this.template;

		if (template?.expressions) {
			// We know which expressions we have, don't traverse again
			this.expressions = new Set();

			for (let et of template.expressions) {
				this.expressions.add(
					new Mavo.DOMExpression({
						template: et,
						item: this,
						mavo: this.mavo
					})
				);
			}
		}

		if (!(this instanceof Mavo.Primitive)) {
			// Handle mv-value
			// TODO integrate with the code in Primitive that decides whether this is a computed property
			var et = Mavo.DOMExpression.search(this.element).filter(et => et.originalAttribute == "mv-value")[0];

			if (et) {
				et.mavoNode = this;
				this.expressionText = et;
				this.storage = this.storage || "none";
				this.modes = this.modes || "read";
			}
		}

		Mavo.hooks.run("node-init-end", env);
	}

	get editing() {
		return this.mode == "edit";
	}

	get isRoot() {
		return !this.property;
	}

	get name() {
		return Mavo.Functions.readable(this.property || this.type).toLowerCase();
	}

	get saved() {
		return this.storage !== "none";
	}

	get properties() {
		let route = this.liveData.data[Mavo.route];
		return route? Object.keys(route) : [];
	}

	/**
	 * Runs after the constructor is done (including the constructor of the inheriting class), synchronously
	 */
	postInit () {
		if (this.modes == "edit") {
			this.edit();
		}
	}

	destroy () {
		if (this.template) {
			this.template.copies.delete(this);
		}

		if (this.expressions) {
			this.expressions.forEach(expression => expression.destroy());
		}

		if (this.itembar) {
			this.itembar.destroy();
		}

		delete _.all[this.uid];

		this.propagate("destroy");
	}

	getLiveData () {
		return this.liveData.proxy;
	}

	isDataNull (o = {}) {
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
	walk (callback, path = [], o = {}) {
		var walker = (obj, path) => {
			var ret = callback(obj, path);

			if (ret !== false) {
				for (let i in obj.children) {
					let node = obj.children[i];

					if (node instanceof Mavo.Node) {
						var ret = walker.call(node, node, [...path, i]);

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

	walkUp (callback) {
		var group = this;

		while (group = group.parentGroup) {
			var ret = callback(group);

			if (ret !== undefined) {
				return ret;
			}
		}
	}

	edit ({force} = {}) {
		this.mode = "edit";

		if (!force && this.mode != "edit") {
			return false;
		}

		$.fire(this.element, "mv-edit", {
			mavo: this.mavo,
			node: this
		});

		Mavo.hooks.run("node-edit-end", this);
	}

	done ({force} = {}) {
		this.mode = Mavo.getStyle(this.element.parentNode, "--mv-mode") || "read";

		if (!force && this.mode != "read") {
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

	save () {
		this.unsavedChanges = false;

		this.propagate("save");
	}

	propagate (callback) {
		for (let i in this.children) {
			let node = this.children[i];

			if (node instanceof Mavo.Node) {
				if (typeof callback === "function") {
					callback.call(node, node);
				}
				else if (callback in node) {
					node[callback]();
				}
			}
		}
	}

	fromTemplate (...properties) {
		if (this.template) {
			properties.forEach(property => this[property] = this.template[property]);
		}

		return !!this.template;
	}

	async render (data, o = {}) {
		o.live = o.live || Mavo.in(Mavo.isProxy, data);
		o.root = o.root || this;

		// Any promises pending to be rendered?
		delete this.pending;

		if ($.type(data) === "promise") {
			let pending = this.pending = data;

			try {
				data = await pending;
			}
			catch (e) {
				data = e;
			}

			if (this.pending !== pending) {
				// Value has been superseded
				return;
			}

			delete this.pending;
		}

		if (o.live) {
			// Drop proxy
			data = Mavo.clone(data);
		}

		this.oldData = this.data;
		this.data = data;

		if (!o.live) {
			data = Mavo.subset(data, this.inPath);
		}

		var env = {context: this, data, options: o};

		Mavo.hooks.run("node-render-start", env);

		if (!this.isHelperVariable && !o.live) {
			if (!Array.isArray(this.children) && Array.isArray(env.data)) {
				// We are rendering an array on a singleton, what to do?
				if (this.isRoot) {
					// Get the name of the first property that is a collection without mv-value
					// OR if there is a collection with property="main", prioritize that
					var mainProperty = this.children.main instanceof Mavo.Collection? "main" : this.getNames((p, n) => {
						return n instanceof Mavo.Collection && !n.expressions?.[0]?.isDynamicObject;
					})[0];

					if (mainProperty) {
						env.data = {
							[mainProperty]: env.data
						};
					}
				}

				if (!this.isRoot || !mainProperty) {
					// Otherwise, render first item
					this.inPath.push("0");
					env.data = env.data[0];
				}
			}
			else if (this.childrenNames?.length == 1 && this.childrenNames[0] === this.property
			         && env.data !== null && Mavo.isPlainObject(env.data)) {
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
				requestAnimationFrame(() => this.mavo.expressions.update(this));
			}
		}

		Mavo.hooks.run("node-render-end", env);

		return changed;
	}

	dataChanged (action, o = {}) {
		var change = $.extend({
			action,
			property: this.property,
			mavo: this.mavo,
			node: this
		}, o);

		$.fire(o.element || this.element, "mv-change", change);
		this.mavo.changed(change);
	}

	toString () {
		return `#${this.uid}: ${this.constructor.name} (${this.property})`;
	}

	getClosestCollection () {
		var closestItem = this.closestItem;

		return closestItem? closestItem.collection : null;
	}

	getClosestItem () {
		if (Array.isArray(this.collection?.children)) {
			return this;
		}

		return this.parentGroup?.closestItem || null;
	}

	getPath () {
		var path = this.parent?.path || [];
		return this.property? [...path, this.property] : path;
	}

	pathFrom (node) {
		var path = this.path;
		var nodePath = node.path;

		for (var i = 0; i<path.length && nodePath[i] == path[i]; i++) {}

		return path.slice(i);
	}

	getDescendant (path) {
		return path.reduce((acc, cur) => acc.children[cur], this);
	}

	/**
	 * Get same node in other item in same collection
	 * E.g. for same node in the next item, use an offset of -1
	 */
	getCousin (offset, o = {}) {
		if (!this.closestCollection) {
			return null;
		}

		var collection = this.closestCollection;
		var distance = Math.abs(offset);
		var direction =  offset < 0? -1 : 1;

		if (collection.length < distance + 1) {
			return null;
		}

		var index = this.closestItem.index + offset;

		if (o.wrap) {
			index = Mavo.wrap(index, collection.length);
		}

		for (var i = 0; i<collection.length; i++) {
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

	contains (node) {
		do {
			if (node === this) {
				return true;
			}

			node = node.parent;
		}
		while (node);

		return false;
	}

	// Evaluate expression on the fly with this node as context
	eval(expr, o) {
		return new Mavo.Expression(expr).eval(this.getLiveData(), o);
	}

	static create (element, mavo, o = {}) {
		if (element.hasAttribute("mv-list")) {
			return new Mavo.Collection(element, mavo, o);
		}

		let isGroup = element.matches(Mavo.selectors.group);
		return new Mavo[isGroup? "Group" : "Primitive"](element, mavo, o);
	}

	static getImplicitPropertyName (element) {
		return element.getAttribute("itemprop")
		       || element.getAttribute("mv-list")
		       || element.getAttribute("mv-list-item")
		       || element.name
		       || element.id
		       || [...element.classList].filter(n => !n.startsWith("mv-"))[0];
	}

	/**
	 * Get & normalize property name, if exists
	 */
	static getProperty (element) {
		if (!element.hasAttribute("property")) {
			return null;
		}

		let property = element.getAttribute("property");

		if (!property) {
			if (property = _.getImplicitPropertyName(element)) {
				element.setAttribute("property", property);
			}
		}

		return property;
	}

	static generatePropertyName(prefix, element = document.documentElement) {
		let root = element.closest(Mavo.selectors.init);
		let names = new Set($$("[property]", root).map(e => e.getAttribute("property")));

		for (let i=""; i<1000; i++) { // 1000 is just a failsafe
			let name = prefix + i;

			if (!names.has(name)) {
				return name;
			}
		}
	}

	static get (element, prioritizePrimitive) {
		let nodes = _.elements.get(element) || [];

		// Do not return implicit collections
		nodes = nodes.filter(n => !(n instanceof Mavo.ImplicitCollection));

		if (nodes.length < 2 || !prioritizePrimitive) {
			return nodes[0];
		}

		if (nodes[0] instanceof Mavo.Group) {
			return nodes[1];
		}
	}

	static getClosest (element, prioritizePrimitive) {
		let node;

		do {
			node = _.get(element, prioritizePrimitive);
		} while (!node && (element = element?.parentNode));

		return node;
	}

	static getClosestItem (element) {
		var item = _.getClosest(element);

		if (item instanceof Mavo.Primitive && !item.collection) {
			return item.parent;
		}

		return item;
	}

	/**
	 * Get all properties that are inside an element but not nested into other properties
	 */
	static children (element) {
		var ret = Mavo.Node.get(element);

		if (ret) {
			// element is a Mavo node
			return [ret];
		}

		ret = $$(Mavo.selectors.property, element)
			.map(e => Mavo.Node.get(e))
			.filter(e => !element.contains(e.parentGroup.element)) // drop nested properties
			.map(e => e.collection || e);

		return Mavo.Functions.unique(ret);
	}
};

$.Class(_, {
	toJSON: Mavo.prototype.toJSON,

	lazy: {
		closestCollection: function() {
			return this.getClosestCollection();
		},

		closestItem: function() {
			return this.getClosestItem();
		},

		// Are we only rendering and editing a subset of the data?
		inPath: function() {
			return (this.element.getAttribute("mv-path") || "").split("/").filter(p => p.length);
		}
	},

	live: {
		store: function(value) {
			$.toggleAttribute(this.element, "mv-storage", value);
		},

		unsavedChanges: function(value) {
			if (value && (!this.saved || !this.editing)) {
				value = false;
			}

			if (!Array.isArray(this.children)) {
				this.element.classList.toggle("mv-unsaved-changes", value);
			}

			return value;
		},

		mode: function (value) {
			if (this._mode != value) {
				// Is it allowed?
				if (this.modes && value != this.modes) {
					value = this.modes;
				}

				// If we don't do this, setting the attribute below will
				// result in infinite recursion
				this._mode = value;

				if (!Array.isArray(this.children) && [null, "", "read", "edit"].indexOf(this.element.getAttribute("mv-mode")) > -1) {
					// If attribute is not one of the recognized values, leave it alone
					var set = this.modes || value == "edit";
					let matches = Mavo.observers.pause({attribute: "mv-mode"});
					$.toggleAttribute(this.element, "mv-mode", value, set);
					Mavo.observers.resume(matches);
				}

				return value;
			}
		},

		modes: function(value) {
			if (value && value != "read" && value != "edit") {
				return null;
			}

			this._modes = value;

			if (value && this.mode != value) {
				this.mode = value;
			}
		},

		collection: function(value) {
			// These only change when collection changes
			this.parent = value || this.parentGroup;
		},

		index: function(value) {
			if (this._index !== value) {
				this._index = value;
				this.liveData.updateKey();
			}
		},

		expressionsEnabled: {
			get: function() {
				if (this._expressionsEnabled === false) {
					return false;
				}
				else {
					return this.parent? this.parent.expressionsEnabled : true;
				}
			}
		}
	},

	static: {
		all: [],
		elements: new WeakMap()
	}
});

Mavo.observe({attribute: "mv-storage"}, function({node}) {
	// Handle dynamic mv-storage on Mavo nodes (Fix for #576)
	if (node) {
		node.storage = node.element.getAttribute("mv-storage");
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.Group = class Group extends Mavo.Node {
	constructor (element, mavo, o) {
		super(element, mavo, o);

		this.children = {};

		this.group = this;

		Mavo.hooks.run("group-init-start", this);

		// Should this element also create a primitive?
		if (Mavo.Primitive.getValueAttribute(this.element)) {
			this.children[this.property] = new Mavo.Primitive(this.element, this.mavo, {group: this});
		}

		// Create Mavo objects for all properties in this group (primitives or groups),
		// but not properties in descendant groups (they will be handled by their group)
		let properties = $$(`[property]:not(:scope ${Mavo.selectors.scope} [property])`, this.element);
		let propertyNames = properties.map(element => Mavo.Node.getProperty(element));

		for (let i = 0, element; element = properties[i]; i++) {
			let property = Mavo.Node.getProperty(element);
			let existing = this.children[property];
			let template = this.template? this.template.children[property] : null;
			let options = {template, group: this};

			if (existing) {
				// FIXME if this group includes a primitive (see line 14 above)
				// and also a child property of the same name, this will fail
				existing.add(element);
			}
			else if (propertyNames.lastIndexOf(property) !== i) {
				// Duplicate property name
				this.children[property] = new Mavo.ImplicitCollection(element, this.mavo, options);
			}
			else {
				// Normal case
				this.children[property] = Mavo.Node.create(element, this.mavo, options);
			}
		}

		this.childrenNames = Object.keys(this.children);

		this.vocab = Mavo.getClosestAttribute(this.element, "vocab");

		this.postInit();

		Mavo.hooks.run("group-init-end", this);
	}

	get isRoot() {
		return !this.property;
	}

	getNames (type = "Node") {
		var filter = typeof type === "function"? type : (p, n) => n instanceof Mavo[type];
		return Object.keys(this.children).filter(p => filter(p, this.children[p]));
	}

	getData (o = {}) {
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
			}
			else {
				delete env.data[obj.property];
			}
		}

		if (!this.childrenNames.length && !this.isRoot && !this.collection) {
			// Avoid {} in the data
			env.data = null;
		}
		else if (this.childrenNames.length === 1 && this.property in this.children) {
			env.data = env.data[this.property];
		}
		else if (env.data && typeof env.data === "object") {
			// Add JSON-LD stuff
			if (this.type && this.type != _.DEFAULT_TYPE) {
				env.data["@type"] = this.type;
			}

			if (this.vocab) {
				env.data["@context"] = this.vocab;
			}
		}

		// If storing, use the rendered data too
		env.data = Mavo.subset(this.data, this.inPath, env.data);

		Mavo.hooks.run("node-getdata-end", env);

		return env.data;
	}

	edit (o = {}) {
		if (super.edit() === false) {
			return false;
		}

		return Promise.all(Object.keys(this.children).map(prop => this.children[prop].edit(o)));
	}

	dataRender (data, o = {}) {
		if (!data) {
			return;
		}

		let changed = false;

		// What if data is not an object?
		let noWriteableProperty;
		let wasPrimitive;

		if (typeof data !== "object") {
			wasPrimitive = true;
			let property = this.property;

			// Data is a primitive, render it on this.property or failing that, any writable property
			if (!(this.property in this.children)) {
				let type = $.type(data);
				let score = prop => (this.children[prop] instanceof Mavo.Primitive) + (this.children[prop].datatype == type);

				property = Object.keys(this.children)
					.filter(p => !this.children[p].expressionText)
					.sort((prop1, prop2) => score(prop1) - score(prop2))
					.reverse()[0];
			}

			if (!property) {
				// No appropriate property found, use this.property
				property = this.property;
				noWriteableProperty = true;
			}

			data = {[property]: data};

			this.data = Mavo.subset(this.data, this.inPath, data);
		}

		let copy; // to handle renaming

		this.propagate(obj => {
			let propertyData = data[obj.property];

			// find first alias with data, load that data, and set to be copied
			if (obj.alias) {
				let aliasesArr = obj.alias.split(" ");

				for (let i = 0; i < aliasesArr.length; i++) {
					let currentAlias = aliasesArr[i];

					if (data[currentAlias] !== undefined) {
						obj.currentAlias = currentAlias;
						copy = copy || $.extend({}, data);
						propertyData = data[obj.currentAlias];
						break;
					}
				}
			}

			changed = obj.render(propertyData, o) || changed;
		});

		// Rename properties. This needs to be done separately to handle swapping.
		if (copy) {
			this.propagate(obj => {
				if (obj.currentAlias) {
					data[obj.property] = copy[obj.currentAlias];

					if (!(obj.currentAlias in this.children)) {
						delete data[obj.currentAlias];
					}
				}
			});
		}

		if (!wasPrimitive || noWriteableProperty) {
			// Fire mv-change events for properties not in the template,
			// since nothing else will and they can still be referenced in expressions
			let oldData = Mavo.subset(this.oldData, this.inPath);

			for (let property in data) {
				if (!(property in this.children)) {
					let value = data[property];
					changed = changed || data[property] !== this.liveData.data[property];

					this.liveData.set(property, value);

					if (this.expressionsEnabled !== false && typeof value != "object" && (!oldData || oldData[property] != value)) {
						// Property actually changed. Why != "object" though?
						this.dataChanged("propertychange", {property});
					}
				}
			}
		}

		return changed;
	}

	static normalize (element) {
		// Get & normalize typeof name, if exists
		if (element.matches(Mavo.selectors.group)) {
			var type = Mavo.getAttribute(element, "typeof", "mv-group") || _.DEFAULT_TYPE;

			element.setAttribute("typeof", type);

			return type;
		}

		return null;
	}
};

$.Class(_, {
	lazy: {
		liveData: function() {
			return new Mavo.Data(this, {});
		}
	},

	static: {
		all: new WeakMap(),

		DEFAULT_TYPE: "Item"
	}
});

})(Bliss, Bliss.$);

(async function($, $$) {

var _ = Mavo.Primitive = class Primitive extends Mavo.Node {
	constructor(element, mavo, o) {
		super(element, mavo, o);

		this.liveData = new Mavo.Data(this);

		if (!this.fromTemplate("config", "attribute", "templateValue", "originalEditor")) {
			this.config = _.getConfig(element);

			// Which attribute holds the data, if any?
			// "null" or null for none (i.e. data is in content).
			this.attribute = this.config.attribute;

			// HTML attribute names are case insensitive (Fix for #515)
			if (this.attribute && !document.xmlVersion) {
				this.attribute = this.attribute.toLowerCase();
			}
		}

		this.datatype = this.config.datatype;

		if ("modes" in this.config) {
			// If modes are related to element type, this overrides everything
			// because it means the other mode makes no sense for that element
			this.modes = this.config.modes;
			this.element.setAttribute("mv-mode", this.config.modes);
		}

		Mavo.hooks.run("primitive-init-start", this);

		// Link primitive with its expressionText object
		// We need to do this before any editing UI is generated
		this.expressionText = this.expressionText || Mavo.DOMExpression.search(this.element, this.attribute);

		if (this.expressionText && !this.expressionText.mavoNode) {
			// Computed property
			this.expressionText.mavoNode = this;
			this.storage = this.storage || "none";
			this.modes = "read";
			this.element.setAttribute("aria-live", "polite");
		}

		/**
		 * Set up input widget
		 */

		if (this.config.init) {
			this.config.init.call(this, this.element);
		}

		if (this.config.initOnce && !this.config.initOnce.called) {
			this.config.initOnce.call(this, this.element);
			this.config.initOnce.called = true;
		}

		if (this.config.changeEvents) {
			$.bind(this.element, this.config.changeEvents, evt => {
				if (evt.target === this.element) {
					this.value = this.getValue();
				}
			});
		}

		if (this.expressionText) {
			this.setValue(this.expressionText.value, {silent: true});
		}
		else {
			if (this.element.hasAttribute("aria-label")) {
				// Custom label
				this.label = this.element.getAttribute("aria-label");
			}
			else {
				this.label = Mavo.Functions.readable(this.property);
				this.pauseObserver();
				this.element.setAttribute("aria-label", this.label);
				this.resumeObserver();
			}

			// Linked widgets
			if (this.element.hasAttribute("mv-editor")) {
				this.originalEditorUpdated({force: true});

				let editorValue = this.editorValue;

				if (!this.datatype && (typeof editorValue == "number" || typeof editorValue == "boolean")) {
					this.datatype = typeof editorValue;
				}
			}
			else if (this.element.hasAttribute("mv-options")) {
				this.updateOptions();
			}

			this.templateValue = this.getValue();

			this._default = this.element.getAttribute("mv-default");

			if (this.default === null) { // no mv-default
				if (this.modes) {
					this._default = this.templateValue;
					this.defaultSource = "template";
				}
				else {
					this._default = this.editorValue;

					if (this.options) {
						// Get first option
						let firstOption = this.options.keys().next().value;
						this._default = this._default ?? firstOption;
					}

					this.defaultSource = "editor";
				}
			}
			else if (this.default === "") { // mv-default exists, no value, default is template value
				this._default = this.templateValue;
				this.defaultSource = "template";
			}
			else { // mv-default with value
				this.defaultExpression = Mavo.DOMExpression.search(this.element, "mv-default");

				if (this.defaultExpression) {
					// To preserve type, e.g. booleans should stay booleans, not become strings
					this.defaultExpression.output = value => this.default = value;
				}

				this.defaultSource = "attribute";
			}



			this.setValue(this.initialValue, {silent: true});
		}

		this.postInit();

		Mavo.hooks.run("primitive-init-end", this);
	}

	get initialValue () {
		let ret;
		let keepTemplateValue = !this.template // not in a collection or first item
		                        || this.template.templateValue != this.templateValue // or different template value than first item
		                        || this.modes == "edit"; // or is always edited

		if (this.default === undefined && keepTemplateValue) {
			ret = this.templateValue;
		}
		else {
			ret = this.default;
		}

		if (ret === undefined) {
			ret = this.emptyValue;
		}

		return ret;
	}

	get editorValue() {
		let editor = this.editor || this.originalEditor;

		if (editor) {
			if (_.isFormControl(editor)) {
				return _.getValue(editor, {datatype: this.datatype});
			}

			// if we're here, this.editor is an entire HTML structure
			let output = $(Mavo.selectors.output + ", " + Mavo.selectors.formControl, editor);

			if (output) {
				return _.getValue(output);
			}
		}
	}

	set editorValue(value) {
		if (this.config.setEditorValue && this.datatype !== "boolean") {
			return this.config.setEditorValue.call(this, value);
		}

		if (this.editor) {
			if (_.isFormControl(this.editor)) {
				if (this.editor.matches("select")) {
					let text = [...this.editor.options].find(o => Mavo.toArray(value).map(v => v.toString()).includes(o.value))?.textContent;

					// We have a local editor, do we need to add/remove temp options?
					if (text === undefined) {
						// Option not found in the select menu, add a temp option
						$.create("option", {
							className: "mv-volatile",
							textContent: value,
							inside: this.editor,
							selected: true,
							disabled: true
						});
					}
					else {
						// Delete any temp options, we don't need them anymore
						$$(".mv-volatile", this.editor).forEach(o => o.remove());
					}
				}

				_.setValue(this.editor, value, {config: this.editorDefaults});
			}
			else {
				// if we're here, this.editor is an entire HTML structure
				var output = $(Mavo.selectors.output + ", " + Mavo.selectors.formControl, this.editor);

				if (output) {
					_.setValue(output, value);
				}
			}
		}
	}

	destroy () {
		super.destroy();
		this.originalEditorObserver?.destroy();
	}

	isDataNull(o) {
		return super.isDataNull(o) || this._value === null || this._value === undefined;
	}

	getData (o = {}) {
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

	// Why this complexity? Because it needs to be a stack, so that
	// pause, pause, resume doesn't actually resume, you need to resume as many
	// times as you paused, so that nested function calls work as expected.
	get pausedObserver () {
		return this.observerPauses?.length > 0;
	}

	pauseObserver () {
		Mavo.observers.flush();
		this.observerPauses = this.observerPauses || [];
		this.observerPauses.push(1);
	}

	resumeObserver () {
		Mavo.observers.flush();
		this.observerPauses?.pop?.();
	}

	save() {
		this.savedValue = this.value;
		this.unsavedChanges = false;
	}

	// Called only the first time this primitive is edited
	initEdit () {
		if (!this.editor && this.originalEditor) {
			this.editor = this.originalEditor.cloneNode(true);
		}

		this.editorUpdated();

		this.initEdit = null;
	}

	updateOptions () {
		let options = Mavo.options(this.element.getAttribute("mv-options"), {map: true});

		for (let [key, value] of options) {
			if (value === true) {
				options.set(key, key);
			}
		}

		this.options = options;
	}

	generateDefaultEditor () {
		if (this.element.hasAttribute("mv-options")) {
			if (!this.options) {
				this.updateOptions();
			}

			let contents = [...this.options].map(([value, textContent]) => {
				return { tag: "option", value, textContent };
			});

			this.editor = $.create("select", {
				className: "mv-editor mv-options-select",
				contents
			});
		}
		else {
			// No editor provided, generate default for element type
			// Find default editor for datatype
			let editor = this.config.editor;

			if (!editor || this.datatype == "boolean") {
				editor = Mavo.Elements.defaultConfig[this.datatype || "string"].editor;
			}

			this.editor = $.create($.type(editor) === "function"? editor.call(this) : editor);
		}

		this.editorValue = this.value;
	}

	updateEditType() {
		let ret = this.element.getAttribute("mv-edit-type")?.trim() ?? "auto";

		if (ret === "auto") {
			// attribute may be "auto", in which case we want to get in here
			ret = this.config.editType ?? "auto";
		}

		if (ret === "auto") {
			ret = this.attribute? "popup" : "inline";
		}

		return this.editType = ret;
	}

	editorUpdated () {
		if (!this.editor) {
			this.generateDefaultEditor();
		}

		$.bind(this.editor, {
			"input change": evt => {
				this.value = this.editorValue;
			},
			"mv-change": evt => {
				if (evt.property === "output") {
					evt.stopPropagation();
					$.fire(this.editor, "input");
				}
			}
		});

		let multiline = this.editor.matches("textarea");

		if (!multiline) {
			this.editor.addEventListener("focus", evt => {
				this.editor.select?.();
			});
		}

		// Copy any mv-editor-* attributes from the element to the editor
		for (let name of Mavo.getAttributes(this.element, /^mv-editor-/)) {
			let value = this.element.getAttribute(name);
			name = name.replace(/^mv-editor-/, "");
			this.editor.setAttribute(name, value);
		}

		if ("placeholder" in this.editor && !this.editor.placeholder) {
			this.editor.placeholder = this.editor.type === "number" ? this.editor.min || 0 : `(${this.label})`;
		}

		if (!this.editor.matches("select")) {
			delete this.options;
		}
	}

	originalEditorUpdated ({force} = {}) {
		let previousOriginalEditor = this.originalEditor;
		let selector = this.element.getAttribute("mv-editor");

		try {
			this.originalEditor = $(selector);
		}
		catch (e) {
			// Invalid selector, potentially expression that has not yet evaluated?
			this.originalEditor = null;
		}

		if (!force && previousOriginalEditor === this.originalEditor) {
			return;
		}

		if (this.originalEditor) {
			if (this.editor) {
				// If editor already created, replace it and update value
				this.editor = this.originalEditor.cloneNode(true);
				this.setValue(this.value, {force: true, silent: true});
			}

			if (this.defaultSource == "editor") {
				this.default = this.originalEditor.value;
			}

			// Update editor if original mutates
			// This means that expressions on mv-editor for individual collection items will not be picked up
			// We attach this observer to elements that are either the prototype of their kind, or they have a different original editor
			if (!this.template || this.originalEditor !== this.template.originalEditor) {
				this.originalEditorObserver?.destroy();

				this.originalEditorObserver = new Mavo.Observer(this.originalEditor, "all", records => {
					let nodes = [this];

					if (this.copies) {
						for (let n of this.copies) {
							if (n.originalEditor === this.originalEditor) {
								nodes.push(n);
							}
						}
					}

					for (let primitive of nodes) {
						primitive.originalEditorUpdated({force: true});
						primitive.setValue(primitive.value, {force: true, silent: true});
					}
				});
			}
		}
		else {
			if (this.editor) {
				this.generateDefaultEditor();
				this.editorUpdated();
			}
		}

		let editor = this.editor ?? this.originalEditor;

		if (editor?.matches("select:not(.mv-options-select")) {
			// This is a select menu that is not automatically generated from mv-options
			// We need to update this.options

			let obj = [...editor.options]
				.filter(o => !o.classList.contains("mv-volatile"))
				.map(o => [o.value, o.textContent]);
			this.options = new Map(obj);
		}
	}

	edit (o = {}) {
		let wasEditing = this.editing;

		if (super.edit(o) === false) {
			// Invalid edit
			return false;
		}

		if (!o.force && wasEditing && !this.initEdit) {
			// Already being edited
			return true;
		}

		if ($.type(this._value) === "object") {
			// Editing is disabled when value is an object (see #692)
			return false;
		}

		if (!wasEditing) {
			// Make element focusable, so it can actually receive focus
			if (this.element.tabIndex === -1) {
				Mavo.revocably.setAttribute(this.element, "tabindex", "0");
			}

			// Prevent default actions while editing
			// e.g. following links, toggling <details> etc
			$.bind(this.element, "click.mavo:edit", evt => {
				if (this.mode !== "edit") {
					return;
				}

				if (evt.target.closest("summary, a")) {
					evt.preventDefault();
				}
			});
		}

		if (this.config.edit) {
			this.config.edit.call(this);
			this.initEdit = null;
		}
		else {
			this.pauseObserver();

			// Actual edit

			if (this.initEdit) {
				this.initEdit();
			}

			this.editor.classList.toggle("mv-editor", this.editType !== "popup");

			if (this.editType === "popup") {
				if (!this.popup) {
					this.popup = new Mavo.UI.Popup(this);
				}

				this.popup.prepare();

				let events = "mousedown focus dragover dragenter".split(" ").map(e => e + ".mavo:edit").join(" ");

				$.bind(this.element, events, _ => this.popup.show());
			}
			else if (this.editType === "inline") {
				if (!this.editor.isConnected) {
					this.editorValue = this.value;

					if (this.config.hasChildren) {
						this.element.textContent = "";
					}
					else {
						_.setText(this.element, "");
					}

					// If there's an expression on .textContent, it will kick
					// the editor out of the DOM next time it's updated.
					// To fix this, we re-assign it to the actual text node.
					if (!this.contentExpression) {
						this.contentExpression = Mavo.DOMExpression.search(this.element, null);
					}

					if (this.contentExpression) {
						this.contentExpression.active = false;
					}

					this.element.prepend(this.editor);
				}

				if (!this.collection) {
					Mavo.revocably.restoreAttribute(this.element, "tabindex");
				}
			}

			this.resumeObserver();
		}

		if (this.closestCollection && this.editType === "inline" && this.editor?.matches(Mavo.selectors.textInput)) {
			// If pasting text with line breaks and this is a single-line input
			// Insert them as multiple items
			let multiline = this.editor.matches("textarea");

			if (!multiline) {
				$.bind(this.editor, "paste.mavo:edit", evt => {
					if (!this.closestCollection.editing || !evt.clipboardData) {
						return;
					}

					let text = evt.clipboardData.getData("text/plain");
					const CRLF = /\r?\n|\r/;

					if (CRLF.test(text)) {
						evt.preventDefault();

						let lines = text.split(CRLF);

						// "Paste" first line where the cursor is
						this.editor.setRangeText(lines[0]);
						$.fire(this.editor, "input");

						// Insert the rest of the lines as new items
						// FIXME DRYfy the repetition between this code and the one below
						let collection = this.closestCollection;
						let index = closestItem?.index || 0;

						for (let i=1; i<lines.length; i++) {
							let closestItem = this.closestItem;
							let next = collection.add(undefined, index + i);
							collection.editItem(next); // TODO add() should take care of this

							let copy = this.getCousin(i);
							copy.render(lines[i]);
						}

					}
				});
			}

			$.bind(this.editor, "keydown.mavo:edit", evt => {
				if (!this.closestCollection.editing) {
					return;
				}

				if (evt.key == "Enter" && (evt.shiftKey || !multiline)) {
					if (this.bottomUp) {
						return;
					}

					let closestItem = this.closestItem;
					let next = this.closestCollection.add(undefined, closestItem?.index + 1);
					this.closestCollection.editItem(next);

					let copy = this.getCousin(1);
					requestAnimationFrame(() => {
						copy.edit();
						copy.editor.focus();
					});

					if (multiline) {
						evt.preventDefault();
					}
				}
				else if (evt.key == "Backspace" && this.empty) {
					// Focus on sibling afterwards
					let sibling = this.getCousin(1) || this.getCousin(-1);

					// Backspace on empty primitive or Cmd/Ctrl + Backspace should delete item
					this.closestCollection.delete(this.closestItem);

					if (sibling) {
						sibling.edit();
						sibling.editor.focus();
					}

					evt.preventDefault();
				}
			});
		}

		return true;
	} // edit

	done (o) {
		if (super.done(o) === false) {
			return false;
		}

		$.unbind(this.element, ".mavo:edit");

		this.pauseObserver();

		if (this.config.done) {
			this.config.done.call(this);
			return;
		}

		if (this.editType === "popup") {
			this.popup?.close();
		}
		else if (this.editType === "inline" && this.editor) {
			this.editor.remove();

			if (this.contentExpression) {
				// This only works because nothing else sets active
				// Eventually, we'll need to move to a stack of some sort
				// to cater to cases where active was false before, so should be false after
				this.contentExpression.active = true;
				this.contentExpression.update({force: true});
			}

			// force: true is needed because otherwise setValue() aborts when it sees
			// that the value we are trying to set is the same as the existing one
			this.setValue(this.editorValue, {silent: true, force: true});
		}

		if (this.editor?.matches("select")) {
			// Remove any temp options that we don’t need anymore
			$$(".mv-volatile", this.editor).forEach(o => {
				if (!o.selected) {
					o.remove();
				}
			});
		}

		this.resumeObserver();

		if (!this.collection) {
			Mavo.revocably.restoreAttribute(this.element, "tabindex");
		}
	}

	dataRender (data, {live, root} = {}) {
		var previousValue = this._value;

		if ($.type(data) === "object") {
			if (Symbol.toPrimitive in data) {
				data = data[Symbol.toPrimitive]("default");
			}
			else {
				// Disable editing when the value is an object
				// We do that by calling .done() and then rejecting in .edit()
				if (this.editing) {
					this.done();
				}
			}
		}

		if (data === undefined) {
			// New property has been added to the schema and nobody has saved since
			if (!this.modes && this.value === this.templateValue) {
				this.value = this.closestCollection? this.default : this.templateValue;
			}
		}
		else {
			this.value = data;
		}

		return this._value !== previousValue;
	}

	find (property, o = {}) {
		if (this.property == property && o.exclude !== this) {
			return this;
		}
	}

	/**
	 * Get value from the DOM
	 */
	getValue (o) {
		if (this.editing && this.editor && this.editor !== this.element) {
			return this.editorValue;
		}

		return _.getValue(this.element, {
			config: this.config,
			attribute: this.attribute,
			datatype: this.datatype
		});
	}

	setValue (value, o = {}) {
		if (value === undefined) {
			value = null;
		}

		let oldDatatype = this.datatype;

		// If there's no datatype, adopt that of the value
		if (!this.datatype && (typeof value == "number" || typeof value == "boolean")) {
			this.datatype = typeof value;
		}

		value = _.safeCast(value, this.datatype);

		if (!o.force && value === this._value && oldDatatype == this.datatype) {
			// Do nothing if value didn't actually change, unless forced to
			return value;
		}

		this.pauseObserver();

		if (this.editor && this.editorValue != value) {
			// If an editor is present, set its value to match
			this.editorValue = value;
		}

		// Also set DOM value if either using a popup, or there's no editor
		// or the editor is not inside the element (e.g. it could be a nested editor that is now detached)
		if (this.editType == "popup" || !this.editor || (this.editor !== document.activeElement && !this.element.contains(this.editor))) {
			if (this.config.setValue) {
				this.config.setValue.call(this, this.element, value);
			}
			else if (!o.dataOnly) {
				let presentational;

				if (this.options) {
					presentational = this.options.get(value);
				}

				_.setValue(this.element, value, {
					config: this.config,
					attribute: this.attribute,
					datatype: this.datatype,
					presentational,
					node: this
				});
			}
		}

		this.empty = !value && value !== 0;

		this._value = value;

		this.liveData.update();

		if (!o.silent) {
			if (this.saved) {
				this.unsavedChanges = this.mavo.unsavedChanges = true;
			}

			this.dataChanged("propertychange", {value});
		}

		this.resumeObserver();

		return value;
	}

	dataChanged (action = "propertychange", o) {
		return super.dataChanged(action, o);
	}

	async upload (file, name = file.name) {
		if (!this.mavo.uploadBackend || !self.FileReader) {
			return;
		}

		var tempURL = URL.createObjectURL(file);

		// FIXME what if there's no attribute?
		this.pauseObserver();
		this.element.setAttribute(this.attribute, tempURL);
		this.resumeObserver();

		var path = this.element.getAttribute("mv-upload-path") || "";
		var relative = path + "/" + name;

		let url = await this.mavo.upload(file, relative);
		// Do we have a URL override?
		var base = Mavo.getClosestAttribute(this.element, "mv-upload-url");

		if (base) {
			// Throw away backend-provided URL and use the override instead
			url = new URL(relative, new URL(base, location)) + "";
		}

		this.value = url;

		if (!this.element.matches("a")) {
			// <a> should get the proper URL immediately, because hovering would reveal what it is
			// for other types, we should keep the temporary URL because the real one may not have deployed yet
			// If the editor is manually edited, this will change anyway
			this.pauseObserver();
			this.element.setAttribute(this.attribute, tempURL);
			this.resumeObserver();
		}
	}

	createUploadPopup (type, kind = "file", ext) {
		var env = { context: this, type, kind, ext };

		env.mainInput = $.create("input", {
			"type": "url",
			"placeholder": `http://example.com/${kind}.${ext}`,
			"className": "mv-output",
			"aria-label": `URL to ${kind}`
		});

		if (this.mavo.uploadBackend && self.FileReader) {
			var checkType = file => file && (!type || file.type.indexOf(type.replace("*", "")) === 0);

			env.events = {
				"paste": evt => {
					// Look for the first file in the clipboard
					var item = Array.from(evt.clipboardData.items).find(item => item.kind === "file");
					var ext = item?.type.split("/")[1];

					if (item && checkType(item)) {
						// Is a file of the correct type, upload!
						// First, try to find its name in the clipboard
						var defaultName = evt.clipboardData.getData("text") || `pasted-${kind}-${Date.now()}.${ext}`;
						var name = prompt(this.mavo._("filename"), defaultName);

						if (name === "") {
							name = defaultName;
						}

						if (name !== null) {
							this.upload(item.getAsFile(), name, type);
							evt.preventDefault();
						}
					}
				},
				"drag dragstart dragend dragover dragenter dragleave drop": evt => {
					evt.preventDefault();
					evt.stopPropagation();
				},
				"dragover dragenter": evt => {
					env.popup.classList.add("mv-dragover");
					this.element.classList.add("mv-dragover");
				},
				"dragleave dragend drop": evt => {
					env.popup.classList.remove("mv-dragover");
					this.element.classList.remove("mv-dragover");
				},
				"drop": evt => {
					var file = evt.dataTransfer.files[0];

					if (file && checkType(file)) {
						this.upload(file);
					}
				}
			};

			Mavo.hooks.run("primitive-createuploadpopup-beforecreate", env);

			env.popup = $.create({
				className: "mv-upload-popup",
				contents: [
					env.mainInput, {
						tag: "input",
						type: "file",
						"aria-label": `Upload ${kind}`,
						accept: type,
						events: {
							change: evt => {
								var file = evt.target.files[0];

								if (file && checkType(file)) {
									this.upload(file);
								}
							}
						}
					}, {
						className: "mv-tip",
						innerHTML: "<strong>Tip:</strong> You can also drag & drop or paste!"
					}
				],
				events: env.events
			});

			// Drag & Drop should also work on the <img> element itself
			$.bind(this.element, env.events);

			Mavo.hooks.run("primitive-createuploadpopup-beforereturn", env);

			return env.popup;
		}
		else {
			return env.mainInput;
		}
	}

	static getText (element) {
		var node = element.nodeType === Node.TEXT_NODE? element : element.firstChild;

		if (node?.nodeType === Node.TEXT_NODE) {
			return node.nodeValue;
		}
		else {
			return "";
		}
	}

	static setText (element, text) {
		var node = element.nodeType === Node.TEXT_NODE? element : element.firstChild;

		if (node?.nodeType === Node.TEXT_NODE) {
			node.nodeValue = text;
		}
		else {
			element.prepend(text);
		}
	}

	static getValueAttribute (element, config = Mavo.Elements.search(element)) {
		var ret = element.getAttribute("mv-attribute") || config.attribute;

		if (!ret || ret === "null" || ret === "none") {
			ret = null;
		}

		return ret;
	}

	/**
	 * Only cast if conversion is lossless
	 */
	static safeCast (value, datatype) {
		var existingType = typeof value;
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
	static cast (value, datatype) {
		switch (datatype) {
			case "number": return +value;
			case "boolean": return !!value;
			case "string": return value + "";
		}

		return value;
	}

	static getValue (element, {config, attribute, datatype} = {}) {
		if (!config) {
			config = _.getConfig(element, attribute);
		}

		attribute = config.attribute;
		datatype = config.datatype;

		if (config.getValue && attribute == config.attribute) {
			return config.getValue(element);
		}

		var ret;

		if (attribute in element && Mavo.usePropertyInsteadOfAttribute(element, attribute)) {
			// Returning properties (if they exist) instead of attributes
			// is needed for dynamic elements such as checkboxes, sliders etc
			ret = element[attribute];
		}
		else if (attribute) {
			ret = element.getAttribute(attribute);
		}
		else {
			ret = element.getAttribute("content") || _.getText(element) || null;
		}

		return _.safeCast(ret, datatype);
	}

	static getConfig (element, attribute, datatype) {
		let editAs = element.getAttribute("mv-edit-as");

		if (editAs && editAs in Mavo.Elements) {
			return Mavo.Elements[editAs];
		}

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

	// This is called both on primitive nodes to set their value,
	// as well as (primitive) expressions
	static async setValue (element, value, o = {}) {
		delete _.pending.get(element)?.[o.attribute];

		if ($.type(value) === "promise") {
			if (!_.pending.has(element)) {
				_.pending.set(element, {});
			}

			let pending = value;
			_.pending.get(element)[o.attribute] = pending;

			try {
				value = await pending;
			}
			catch (e) {
				value = e;
			}

			if (_.pending.get(element)[o.attribute] !== pending) {
				// Value has been superseded
				return;
			}

			delete _.pending.get(element)?.[o.attribute];
		}

		if (element.nodeType === 1) {
			if (!o.config) {
				o.config = _.getConfig(element, o.attribute);
			}

			o.attribute = o.attribute !== undefined? o.attribute : o.config.attribute;
			o.datatype = o.datatype !== undefined? o.datatype : o.config.datatype;

			if (o.config.setValue && o.attribute == o.config.attribute) {
				return o.config.setValue(element, value, o.attribute);
			}
		}

		if (value === null && !o.datatype) {
			value = "";
		}

		if (o.attribute) {
			if (o.attribute in element && Mavo.usePropertyInsteadOfAttribute(element, o.attribute) && element[o.attribute] !== value) {
				// Setting properties (if they exist) instead of attributes
				// is needed for dynamic elements such as checkboxes, sliders etc
				try {
					var previousValue = element[o.attribute];
					var newValue = element[o.attribute] = value;
				}
				catch (e) {}
			}

			// Set attribute anyway, even if we set a property because when
			// they're not in sync it gets really fucking confusing.
			if (o.datatype == "boolean") {
				if (value != element.hasAttribute(o.attribute)) {
					$.toggleAttribute(element, o.attribute, value, value);
				}
			}
			else if (element.getAttribute(o.attribute) != value) {  // intentionally non-strict, e.g. "3." !== 3
				element.setAttribute(o.attribute, value);
			}
		}
		else {
			var presentational = o.presentational ?? _.format(value, o);

			if (o.node && !o.config.hasChildren) {
				_.setText(element, presentational);
			}
			else {
				element.textContent = presentational;
			}

			if (presentational !== value && element.setAttribute) {
				element.setAttribute("content", value);
			}
		}
	}

	static format (value, o = {}) {
		if (($.type(value) === "number" || o.datatype == "number")) {
			if (value === null) {
				return "";
			}

			var skipNumberFormatting = o.attribute || o.element?.matches("style, pre");

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

	static isFormControl(element) {
		return element.matches(Mavo.selectors.formControl) || element.matches(`[mv-edit-as="formControl"]`);
	}
};

$.Class(_, {
	lazy: {
		emptyValue: function() {
			switch (this.datatype) {
				case "boolean":
					return false;
				case "number":
					return 0;
			}

			return "";
		},

		editorDefaults: function() {
			return this.editor && _.getConfig(this.editor);
		},

		editType: function() {
			return this.updateEditType();
		}
	},

	live: {
		editor: function (value) {
			if (this._editor === value) {
				return;
			}

			// If we are editing the node, just setting this.editor won't help
			// we also need to update it in the DOM
			this._editor?.replaceWith(value);

			this._editor = value;

			if (this.defaultSource === "editor") {
				this.default = this.editorValue;
			}

			this.editorUpdated();
		},

		default: function (value) {
			if (this.value == this._default) {
				this.value = value;
			}
		},

		value: function (value) {
			return this.setValue(value);
		},

		datatype: function (value) {
			if (value !== this._datatype) {
				if (value == "boolean" && !this.attribute) {
					this.attribute = Mavo.Elements.defaultConfig.boolean.attribute;
				}

				$.toggleAttribute(this.element, "datatype", value, value && value !== "string");
			}
		},

		empty: function (value) {
			let hide = value && // is empty
			           !this.modes && // and supports both modes
			           (!this.attribute || !$(Mavo.selectors.property, this.element)) && // and has no property inside
					   // and is not boolean OR if it is, its attribute is the default boolean attribute (see #464)
			           (this.datatype !== "boolean" || this.attribute === Mavo.Elements.defaultConfig.boolean.attribute);

			this.element.classList.toggle("mv-empty", !!hide);
		}
	},

	static: {
		all: new WeakMap(),
		pending: new Map(),

		lazy: {
			formatNumber: () => {
				var numberFormat = new Intl.NumberFormat(Mavo.locale, {maximumFractionDigits:2});

				return function(value) {
					if (value === Infinity || value === -Infinity) {
						// Pretty print infinity
						return value < 0? "-∞" : "∞";
					}

					return numberFormat.format(value);
				};
			}
		}
	}
});

Mavo.observe({id: "primitive"}, function({node, type, attribute, record, element}) {
	if (node instanceof Mavo.Primitive && node.config && !node.pausedObserver) {
		if (attribute === "mv-default" && !node.defaultExpression) {
			node.default = element.getAttribute("mv-default");
		}
		else if (attribute === "aria-label") {
			node.label = element.getAttribute("aria-label");

			if (Mavo.in("placeholder", node.editor)) {
				node.editor.placeholder = node.editor.type === "number"? node.editor.min || 0 : `(${node.label})`;
			}
		}
		else if (attribute === "mv-editor") {
			node.originalEditorUpdated();
		}
		else if (attribute === "mv-edit-type") {
			let editing = node.editing;

			if (editing) {
				// Undo whatever editing UI we currently have
				node.done({force: true});
			}

			node.updateEditType();

			if (editing) {
				node.edit({force: true});
			}
		}
		else if (attribute === "mv-options") {
			node.updateOptions();

			if (node.editor) {
				node.generateDefaultEditor();
			}
		}
		else if (attribute && attribute.indexOf("mv-editor-") === 0) {
			node.editor?.setAttribute(attribute.slice(10), element.getAttribute(attribute));
		}
		else if (node.config.observer !== false) {
			// Main value observer
			let update = node.config.subtree; // always update when this flag is on regardless of what changed

			if (!update && (!node.editing || node.modes === "edit")) {
				update = attribute === node.attribute // note: these may be null
				         || node.config.observedAttributes?.includes(attribute)
				         || type === "characterData" && !node.attribute;
			}

			if (update) {
				node.value = node.getValue();
			}
		}
	}
	else  {
		let parentNode = Mavo.Node.getClosest(element.parentNode, true);

		// subtree changed on node for which we are monitoring this
		// primarily used for monitoring changes to <select> options
		if (parentNode?.config?.subtree) {
			parentNode.value = parentNode.getValue();
		}

	}
});

await $.ready();

// Migration from mv-edit-* to mv-editor-*
let inputTypes = [
	"checkbox", "color", "date", "datetime-local", "email", "file", "month", "number",
	"password", "radio", "range", "search", "submit", "tel", "text", "time", "url", "week", "datetime"];
let oldMvEdit = Mavo.attributeStartsWith("mv-edit-")
	.filter(a => (a.name !== "mv-edit-type" || inputTypes.includes(a.value)) && !["mv-edit-as"].includes(a.name))
	.map(a => a.name);
let newMvEdit = Mavo.attributeStartsWith("mv-editor-");

if ($("[mv-edit]")) {
	oldMvEdit.unshift("mv-edit");
}

if (oldMvEdit.length > 0) {
	let oldMvEditUnique = [...new Set(oldMvEdit)];

	for (let name of oldMvEditUnique) {
		let newName = name.replace(/^mv-edit(-|$)/, "mv-editor$1");
		let elements = $$(`[${name}]`);

		console.log(`You are using attribute ${name} on ${elements.length} element(s). This syntax is deprecated and will be removed in the next version of Mavo. Please use ${newName} instead.`);

		for (let element of elements) {
			Mavo.setAttributeShy(element, newName, element.getAttribute(name));
		}
	}
}

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.UI.Popup = $.Class({
	constructor: function(primitive) {
		this.primitive = primitive;

		// Need to be defined here so that this is what expected
		this.position = evt => {
			var bounds = this.primitive.element.getBoundingClientRect();
			var x = bounds.left;
			var y = bounds.bottom;
			var pointDown = false;

			if (this.element.offsetHeight) {
				// Is in the DOM, check if it fits
				this.height = this.element.getBoundingClientRect().height || this.height;
			}

			if (this.height + y + 20 > innerHeight) {
				// Normal positioning means the popup would be cut off or too close to the edge, adjust

				// Perhaps placing it above is better
				if (bounds.top - this.height > 20) {
					var pointDown = true;
					y = bounds.top - this.height - 20;
				}
				else {
					// Nah, just raise it a bit
					y = innerHeight - this.height - 20;
				}
			}

			this.element.classList.toggle("mv-point-down", pointDown);

			$.style(this.element, { top:  `${y}px`, left: `${x}px` });
		};

		this.element = $.create("div", {
			className: "mv-popup",
			hidden: true,
			contents: {
				tag: "fieldset",
				contents: [
					{
						tag: "legend",
						textContent: this.primitive.label + ":"
					},
					this.editor
				]
			},
			events: {
				keyup: evt => {
					if (evt.keyCode == 13 || evt.keyCode == 27) {
						if (this.element.contains(document.activeElement)) {
							this.primitive.element.focus();
						}

						evt.stopPropagation();
						this.hide();
					}
				},
				transitionend: this.position
			}
		});

		// No point in having a dropdown in a popup
		if (this.editor.matches("select")) {
			this.editor.size = Math.min(10, this.editor.children.length);
		}
		this.hideCallback = evt => {
			if (!this.element.contains(evt.target) && !this.primitive.element.contains(evt.target)) {
				this.hide();
			}
		};
	},

	show: function() {
		$.unbind([this.primitive.element, this.element], ".mavo:showpopup");

		this.shown = true;

		this.element.style.transition = "none";
		this.element.removeAttribute("hidden");

		this.position();

		this.element.setAttribute("hidden", "");
		this.element.style.transition = "";

		document.body.appendChild(this.element);

		setTimeout(() => {
			this.element.removeAttribute("hidden");
		}, 100); // trigger transition. rAF or timeouts < 100 don't seem to, oddly.

		$.bind(document, "focus click", this.hideCallback, true);
		window.addEventListener("scroll", this.position, {passive: true});
	},

	hide: function() {
		$.unbind(document, "focus click", this.hideCallback, true);
		window.removeEventListener("scroll", this.position, {passive: true});
		this.element.setAttribute("hidden", ""); // trigger transition
		this.shown = false;

		setTimeout(() => {
			$.remove(this.element);
		}, parseFloat(getComputedStyle(this.element).transitionDuration) * 1000 || 400); // TODO transition-duration could override this
	},

	prepare: function() {
		$.bind(this.primitive.element, {
			"click.mavo:edit": evt => {
				this.show();
			},
			"keyup.mavo:edit": evt => {
				if ([13, 113].indexOf(evt.keyCode) > -1) { // Enter or F2
					this.show();
					this.editor.focus();
				}
			}
		});

		if (!this.element.contains(this.editor)) {
			// This can happen if edit type changes from popup to inline
			this.element.append(this.editor);
		}
	},

	close: function() {
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
(function($, $$) {

var _ = Mavo.Elements = {};

Object.defineProperties(_, {
	"register": {
		value: function(id, config) {
			if (typeof arguments[0] === "object") {
				// Multiple definitions
				for (let s in arguments[0]) {
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
				config.attribute.forEach(attribute => {
					var o = $.extend({}, config);
					o.attribute = attribute;

					_[`${id}@${attribute}`] = o;
				});
			}
			else {
				_[id] = config;
			}

			return _;
		}
	},
	"search": {
		value: function(element, attribute, datatype) {
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
			config.attribute = attribute === undefined? config.attribute : attribute;

			return config;
		}
	},
	"matches": {
		value: function(element, attribute, datatype) {
			var matches = [];

			selectorloop: for (var id in _) {
				var o = _[id];

				// Passes attribute test?
				var attributeMatches = attribute === undefined && o.default || attribute === o.attribute;

				if (!attributeMatches) {
					continue;
				}

				// Passes datatype test?
				if (datatype !== undefined && datatype !== "string" && datatype !== o.datatype) {
					continue;
				}

				// Passes selector test?
				var selector = o.selector || id;

				if (!element.matches(selector)) {
					continue;
				}

				// Passes arbitrary test?
				if (o.test && !o.test(element, attribute, datatype)) {
					continue;
				}

				// All tests have passed
				matches.push(o);
			}

			return matches;
		}
	},

	isSVG: {
		value: e => e.namespaceURI == "http://www.w3.org/2000/svg"
	},

	defaultConfig: {
		value: {
			"string":  {
				editor: { tag: "input" }
			},
			"number":  {
				editor: { tag: "input", type: "number" }
			},
			"boolean": {
				attribute: "content",
				editor: { tag: "input", type: "checkbox" }
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
		default: true,
		test: _.isSVG,
		datatype: "number"
	},

	"media": {
		default: true,
		selector: "img, video, audio",
		attribute: "src",
		editor: function() {
			var kind = this.element.nodeName.toLowerCase();
			kind = kind == "img"? "image" : kind;
			Mavo.setAttributeShy(this.element, "mv-upload-path", kind + "s");

			return this.createUploadPopup(kind + "/*", kind, "png");
		}
	},

	"a, link": {
		default: true,
		attribute: "href"
	},

	"a[mv-upload-path], link[mv-upload-path]": {
		default: true,
		attribute: "href",
		editor: function() {
			var type = this.element.getAttribute("type");
			var ext = type && !/\/\*$/.test(type)? type.split("/")[1] : "pdf";
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

	"input, select, optgroup, option, button, textarea, fieldset": {
		attribute: "disabled",
		datatype: "boolean"
	},

	"formControl": {
		selector: "input",
		default: true,
		attribute: "value",
		modes: "edit",
		editType: "self",
		changeEvents: "input change",
		edit: () => {},
		done: () => {},
		init: function() {
			this._editor = this.element;
		}
	},

	"select": {
		extend: "formControl",
		selector: "select",
		subtree: true
	},

	"select[multiple]": {
		extend: "select",
		selector: "select[multiple]",
		getValue: element => {
			return Array.from(element.selectedOptions).map(option => option.value).join();
		},
		setValue: (element, value) => {
			// Why +""? If the value is being set via mv-value and is a number,
			// we must convert it to a string to avoid extra checks.
			value = Array.isArray(value)? value : (value + "").split(/\s*,/);

			Array.from(element.options).forEach(option => {
				// Why? If the value is being set via mv-value,
				// we want the element to reflect the changes properly.
				option.selected = false;

				// Why +""? Options' values are strings, so we want "1" instead of 1.
				value = value.map(v => v + "");

				if (value.includes(option.value)) {
					option.selected = true;
				}
			});
		}
	},

	"option": {
		attribute: null,
		modes: "read",
		default: true
	},

	"textarea": {
		extend: "formControl",
		selector: "textarea",
		attribute: null,
		getValue: element => element.value,
		setValue: (element, value) => element.value = value
	},

	"formNumber": {
		extend: "formControl",
		selector: "input[type=range], input[type=number]",
		datatype: "number",
		setValue: function(element, value) {
			element.value = value;
			element.setAttribute("value", value);

			var attribute = value > element.value? "max" : "min";

			if (!isNaN(value) && element.value != value && !Mavo.data(element, "boundObserver")) {
				// Value out of bounds, maybe race condition? See #295
				// Observe min/max attrs until user interaction or data change
				if (Mavo.observers.find({element, id: "oob"}).size === 0) {
					Mavo.observe({
						id: "oob",
						element, attribute,
						once: true
					}, () => element.value = value);
				}

				requestAnimationFrame(() => {
					$.bind(element, "input mv-change", function handler() {
						Mavo.unobserve({element, id: "oob"});

						// Why not just use {once: true}? because we have two events
						$.unbind(element, "input mv-change", handler);
					});
				});
			}
		},
		observedAttributes: ["min", "max"]
	},

	"checkbox": {
		extend: "formControl",
		selector: "input[type=checkbox]",
		attribute: "checked",
		datatype: "boolean",
		changeEvents: "click"
	},

	"input[type=checkbox]": {
		attribute: "indeterminate",
		datatype: "boolean"
	},

	"radio": {
		extend: "formControl",
		selector: "input[type=radio]",
		attribute: "checked",
		modes: "edit",
		getValue: element => {
			if (element.form) {
				return element.form[element.name].value;
			}

			let checked = $(`input[type=radio][name="${element.name}"]:checked`);
			return checked && checked.value;
		},
		setValue: (element, value) => {
			if (element.form) {
				element.form[element.name].value = value;
				return;
			}

			let toCheck = $(`input[type=radio][name="${element.name}"][value="${value}"]`);
			if (toCheck) {
				toCheck.checked = true;
			}
		},
		initOnce: function(element) {
			function radioChanged(radio) {
				let name = radio.name;
				for (let otherRadio of $$(`input[type=radio][name="${radio.name}"]`)) {
					let node = Mavo.Node.get(otherRadio, true);

					if (node) {
						node.value = node.getValue();
					}
				}
			}

			document.addEventListener("change", evt => {
				if (evt.target.matches("input[type=radio]")) {
					radioChanged(evt.target);
				}
			});

			Mavo.observe({
				attribute: "value",
				selector: "input[type=radio]"
			}, r => radioChanged(r.element));
		},
		observedAttributes: ["value"]
	},

	"counter": {
		extend: "formControl",
		selector: "button, .counter",
		attribute: "mv-clicked",
		datatype: "number",
		init: function(element) {
			if (this.attribute === "mv-clicked") {
				element.setAttribute("mv-clicked", "0");

				element.addEventListener("click", evt => {
					let clicked = +element.getAttribute("mv-clicked") || 0;
					this.value = ++clicked;
				});
			}
		}
	},

	"meter": {
		default: true,
		selector: "meter, progress",
		attribute: "value",
		datatype: "number",
		edit: function() {
			let min = this.element.min ?? this.element.getAttribute("min") ?? 0;
			let max = this.element.max ?? this.element.getAttribute("max") ?? 1;

			min = +min;
			max = +max;
			let range = max - min;

			let step = this.element.step ?? this.element.getAttribute("step")
			         ?? this.element.getAttribute("mv-editor-step") ?? (range > 1? 1 : range/100);
			step = +step;

			$.bind(this.element, "mousemove.mavo:edit", evt => {
				// Change property as mouse moves
				var left = this.element.getBoundingClientRect().left;
				var offset = Math.max(0, (evt.clientX - left) / this.element.offsetWidth);
				var newValue = min + range * offset;
				var mod = newValue % step;

				newValue += mod > step/2? step - mod : -mod;
				newValue = Math.max(min, Math.min(newValue, max));

				this.pauseObserver();
				this.element.setAttribute("value", newValue);
				this.resumeObserver();
			});

			$.bind(this.element, "mouseleave.mavo:edit", evt => {
				// Return to actual value
				this.pauseObserver();
				this.element.setAttribute("value", this.value);
				this.resumeObserver();
			});

			$.bind(this.element, "click.mavo:edit", evt => {
				// Register change
				this.value = this.getValue();
			});

			$.bind(this.element, "keydown.mavo:edit", evt => {
				// Edit with arrow keys
				if (evt.target == this.element && (evt.keyCode == 37 || evt.keyCode == 39)) {
					var increment = step * (evt.keyCode == 39? 1 : -1) * (evt.shiftKey? 10 : 1);
					var newValue = this.value + increment;
					newValue = Math.max(min, Math.min(newValue, max));

					this.element.setAttribute("value", newValue);

					evt.preventDefault();
				}
			});
		},
		observedAttributes: ["min", "max"]
	},

	"meta": {
		default: true,
		attribute: "content"
	},

	"block": {
		default: true,
		selector: "p, div, dt, dd, h1, h2, h3, h4, h5, h6, article, section, address, pre",
		editor: function() {
			var cs = getComputedStyle(this.element);
			var display = cs.display;
			var tag = display.indexOf("inline") === 0? "input" : "textarea";
			var editor = $.create(tag);

			if (tag == "textarea") {
				// Actually multiline
				var width = this.element.offsetWidth;

				if (width) {
					editor.width = width;
				}

				// We cannot collapse whitespace because then users
				// are adding characters they don’t see (#300).
				editor.style.whiteSpace = ({
					"normal": "pre-wrap",
					"nowrap": "pre"
				})[cs.whiteSpace] || "inherit";
			}

			return editor;
		},

		setEditorValue: function(value) {
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
		default: true,
		init: function() {
			if (!this.fromTemplate("dateType")) {
				// Is there an existing formatting expression within?
				var dateFormat = Mavo.DOMExpression.search(this.element, null);
				var datetime = this.element.getAttribute("datetime") || "YYYY-MM-DD";

				let editorType = this.element.getAttribute("mv-editor-type");
				if (editorType in this.config.dateTypes) {
					this.dateType = editorType;
				}
				else {
					for (let type in this.config.dateTypes) {
						if (this.config.dateTypes[type].test(datetime)) {
							this.dateType = type;
							break;
						}
					}
				}

				if (!dateFormat) {
					// TODO what about mv-expressions?
					this.element.textContent = this.config.defaultFormats[this.dateType]?.(this.property) ?? "";
					this.mavo.expressions.extract(this.element, null);

					if (dateFormat = Mavo.DOMExpression.search(this.element, null)) {
						this.mavo.treeBuilt.then(() => {
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
			"date": /^[Y\d]{4}-[M\d]{2}-[D\d]{2}$/i,
		},
		defaultFormats: {
			"date": name => `[readable_datetime(${name}, "days")]`,
			"month": name => `[readable_datetime(${name}, 'months')] `,
			"time": name => `[time(${name})]`,
			"time": name => `[hour(${name}, '00')]:[minute(${name}, '00')]`,
			"datetime-local": function(name) {
				return this.date(name) + " " + this.time(name);
			}
		},
		editor: function() {
			return {tag: "input", type: this.dateType};
		}
	},

	"circle@r": {
		default: true,
		datatype: "number"
	},

	"circle": {
		attribute: ["cx", "cy"],
		datatype: "number"
	},

	"text": {
		default: true,
		editType: "popup"
	},

	".mv-toggle": {
		default: true,
		attribute: "aria-checked",
		datatype: "boolean",
		edit: function() {
			Mavo.revocably.setAttribute(this.element, "role", "checkbox");

			$.bind(this.element, "click.mavo:edit keyup.mavo:edit keydown.mavo:edit", evt => {
				if (evt.type == "click" || evt.key == " " || evt.key == "Enter") {
					if (evt.type != "keydown") {
						this.value = !this.value;
					}

					evt.preventDefault();
					evt.stopPropagation();
				}
			});
		},
		done: function() {
			Mavo.revocably.restoreAttribute(this.element, "role");

			$.unbind(this.element, ".mavo:edit");
		}
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

Mavo.attributes.push("mv-list", "mv-list-item", "mv-order", "mv-accepts", "mv-initial-items");

var _ = Mavo.Collection = class Collection extends Mavo.Node {
	constructor (element, mavo, o) {
		super(element, mavo, o);

		/*
		 * Create the template, remove it from the DOM and store it
		 */

		this.firstItemElement = this.templateElement = $(Mavo.selectors.multiple, this.element);

		this.children = [];
		this.liveData = new Mavo.Data(this, []);

		// Keep position of the template in the DOM, since we might remove it
		this.marker = document.createComment("mv-marker");
		Mavo.data(this.marker, "collection", this);

		this.templateElement.after(this.marker);
		this.addButton = this.createAddButton();

		if (this.templateElement.hasAttribute("mv-like")) {
			Mavo.warn("@mv-like is deprecated and will be removed in the next version of Mavo");
		}

		if (!this.fromTemplate("templateElement", "accepts", "initialItems")) {
			this.accepts = this.element.getAttribute("mv-accepts");
			this.accepts = new Set(this.accepts?.split(/\s+/));

			this.initialItems = +(this.element.getAttribute("mv-initial-items") || 1);

			// Must clone because otherwise once expressions are parsed on the template element
			// we will not be able to pick them up from subsequent items

			this.templateElement = this.templateElement.cloneNode(true);
		}

		this.initializeData();

		this.postInit();

		Mavo.hooks.run("collection-init-end", this);
	}

	initializeData () {
		let item = this.add(this.firstItemElement, undefined, {silent: true});

		if (this.initialItems === 0) {
			if (item) {
				this.delete(item, {silent: true});
			}
			else {
				// No item to delete
				this.firstItemElement.remove();
			}
		}
		else if (this.initialItems > 1) {
			// Add extra items
			for (let i=1; i<this.initialItems; i++) {
				this.add();
			}
		}
	}

	createAddButton() {
		// Find add button if provided, or generate one
		var selector = `button[class~="mv-add-${this.property}"]`;
		var group = this.parentGroup.element;

		var button = $$(selector, group).filter(button => {
			return !this.element.contains(button)  // is outside the list element
				&& !Mavo.data(button, "collection"); // and does not belong to another collection
		})[0];

		if (button) {
			// Custom add button
			if (button.compareDocumentPosition(this.marker) & Node.DOCUMENT_POSITION_FOLLOWING) {
				// Button precedes collection, make collection bottom-up if no mv-order is set
				Mavo.setAttributeShy(this.templateElement, "mv-order", "desc");
			}

			Mavo.revocably.remove(button);
		}
		else {
			button = $.create("button", {
				type: "button",
				className: "mv-ui",
				textContent: this.mavo._("add-item", this)
			});
		};

		button.classList.add("mv-add", `mv-add-${this.property}`);
		Mavo.data(button, "collection", this);

		Mavo.setAttributeShy(button, "mv-action", `add(${this.property})`);

		return button;
	}

	get length() {
		return this.children.length;
	}

	getData (o = {}) {
		var env = {
			context: this,
			options: o
		};

		env.data = this.children.map(item => item.getData(env.options))
		                     .filter(itemData => Mavo.value(itemData) !== null);
		env.data = Mavo.subset(this.data, this.inPath, env.data);

		Mavo.hooks.run("node-getdata-end", env);

		return env.data;
	}

	// Create item but don't insert it anywhere
	// Mostly used internally
	createItem (element) {
		if (!element) {
			element = this.templateElement.cloneNode(true);
		}

		var template = this.itemTemplate || this.template?.itemTemplate || null;

		var item = Mavo.Node.create(element, this.mavo, {
			collection: this,
			template,
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
	add (item, index, o = {}) {
		if (item instanceof Node) {
			item = Mavo.Node.get(item) || this.createItem(item);
		}
		else {
			item = item || this.createItem();
		}

		if (item.collection != this) {
			// Move item to this collection from elsewhere
			if (item.collection) {
				// It belongs to another collection, delete from there first
				item.collection.splice({remove: item});
				item.collection.dataChanged("delete");
			}

			// FIXME this only includes saved data
			// Expressions can be recalculated, but writeable data that is simply not saved will not be here
			let data = item.getData();
			let editing = item.editing;
			item.element.remove();
			item.destroy();

			item = this.createItem();

			if (editing) {
				this.editItem(item);
			}

			item.render(data);
		}

		if (index === undefined) {
			index = this.bottomUp? 0 : this.length;
		}

		// Add it to the DOM, or fix its place
		var rel = this.children?.[index]?.element ?? this.marker;
		$.before(item.element, rel);

		var env = {context: this, item};

		env.previousIndex = item.index;

		// Update internal data model
		env.changed = this.splice({
			remove: env.item
		}, {
			index: index,
			add: env.item
		});

		if (this.mavo.expressions.active && !o.silent) {
			requestAnimationFrame(() => {
				env.changed.forEach(i => {
					i.dataChanged(i == env.item && env.previousIndex === undefined? "add" : "move");
					i.unsavedChanges = true;
				});

				this.unsavedChanges = this.mavo.unsavedChanges = true;

				this.mavo.expressions.update(env.item);
			});
		}

		Mavo.hooks.run("collection-add-end", env);

		return env.item;
	}

	splice (...actions) {
		actions.forEach(action => {
			if (action.index === undefined && action.remove && isNaN(action.remove)) {
				// Remove is an item
				action.index = this.children.indexOf(action.remove);
				action.remove = 1;
			}
		});

		// Sort in reverse index order
		actions.sort((a, b) => b.index - a.index);

		var changed = [], deleted = [];

		// FIXME this could still result in buggy behavior.
		// Think of e.g. adding items on i, then removing > 1 items on i-1.
		// The new items would get removed instead of the old ones.
		// Not a pressing issue though since we always remove 1 max when adding things too.
		actions.forEach(action => {
			if (action.index > -1 && (action.remove || action.add)) {
				action.remove = action.remove || 0;
				action.add = Mavo.toArray(action.add);
				deleted.push(...this.children.splice(action.index, +action.remove, ...action.add));
			}
		});

		deleted = new Set(deleted);

		// Update indices
		for (let i = 0; i < this.length; i++) {
			let item = this.children[i];
			deleted.delete(item);

			if (item && item.index !== i) {
				item.index = i;
				changed.push(item);
			}
		}

		// Unregister expressions for deleted items
		deleted.forEach(item => {
			item.expressions?.forEach(domexpression => {
				item.mavo.expressions.unregister(domexpression);
			});
		});

		this.liveData.update();

		return changed;
	}

	async delete (item, {silent, undoable = !silent, transition = !silent, destroy = !undoable} = {}) {
		item.element.classList.remove("mv-highlight");

		this.splice({remove: item});

		if (!silent && transition) {
			await $.transition(item.element, {opacity: 0});
			item.element.style.opacity = "";
		}

		$.remove(item.element);

		if (!silent) {
			this.unsavedChanges = item.unsavedChanges = this.mavo.unsavedChanges = true;

			item.collection.dataChanged("delete", {index: item.index});
		}

		if (undoable) {
			this.mavo.setDeleted(item);
		}
		else if (destroy) {
			item.destroy();
		}

		return item;
	}

	/**
	 * Move existing item to a new position. Wraps around if position is out of bounds.
	 * @offset relative position
	 */
	move (item, offset) {
		var index = item.index + offset + (offset > 0);

		index = Mavo.wrap(index, this.children.length + 1);

		this.add(item, index);
	}

	editItem (item, o = {}) {
		// Get rid of old promise and replace it with new promise
		item.preEdit?.resolve("abort");

		let immediately = o.immediately || Mavo.inView.is(item.element);

		item.preEdit = Mavo.promise(immediately? Promise.resolve() : Mavo.inView.when(item.element));

		return item.preEdit.then(value => {
			if (value === "abort") {
				return;
			}

			if (!item.itembar) {
				item.itembar = new Mavo.UI.Itembar(item);
			}

			item.itembar.add();

			return item.edit(o);
		});
	}

	doneItem (item) {
		item.itembar?.remove();
		item.preEdit?.resolve("abort");
	}

	edit (o = {}) {
		if (super.edit() === false) {
			return false;
		}

		// Insert the add button if it's not already in the DOM
		if (!this.addButton.parentNode) {
			// In bottom up collections, button goes before first item
			// otherwise, it goes after the marker
			if (this.bottomUp && this.children[0]) {
				var rel = this.children[0].element;
			}

			rel = rel || this.marker;
			Mavo.revocably.add(this.addButton, e => $[this.bottomUp? "before" : "after"](e, rel));
		}

		// Set up drag & drop
		_.dragula.then(() => {
			this.getDragula();
		});

		// Edit items, maybe insert item bar
		return Promise.all(this.children.map(item => this.editItem(item, o)));
	}

	done () {
		if (super.done() === false) {
			return false;
		}

		Mavo.revocably.remove(this.addButton);

		this.propagate(item => this.doneItem(item));
	}

	dataChanged (action, o = {}) {
		o.element = o.element || this.marker;
		return super.dataChanged(action, o);
	}

	dataRender (data, o = {}) {
		if (data === undefined) {
			return;
		}

		data = data === null? [] : Mavo.toArray(data).filter(i => i !== null);
		var changed = false;

		// First render on existing items
		for (var i = 0; i < this.children.length; i++) {
			var item = this.children[i];

			if (i < data.length) {
				changed = item.render(data[i], o) || changed;
			}
			else {
				changed = true;
				this.delete(item, {silent: true});
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

				var env = {context: this, item};
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

	isCompatible (c) {
		return c && this.itemTemplate.constructor == c.itemTemplate.constructor && (c === this
		       || c.template == this || this.template == c || this.template && this.template == c.template
		       || c.accepts.has(this.property));
	}

	// Make sure to remove reference to .dragula
	// it seems to cause problem on OS chrome.
	destroy () {
		super.destroy();

		this.dragula?.destroy();
		this.dragula = null;

		this.propagate("destroy");
	}

	// Make sure to only call after dragula has loaded
	getDragula () {
		if (this.dragula) {
			return this.dragula;
		}

		if (this.template) {
			let containers = this.template.getDragula().containers;

			if (containers.indexOf(this.marker.parentNode) === -1) {
				containers.push(this.marker.parentNode);
			}

			return this.dragula = this.template.dragula || this.template.getDragula();
		}

		this.dragula = dragula({
			containers: [this.marker.parentNode],
			isContainer: el => {
				if (this.accepts.size) {
					return Array.from(el.childNodes).some(child => {
						var collection = _.get(child);  // Map children to any associated collections

						return collection && this.accepts.has(collection.property);
					});
				}

				return false;
			},
			moves: (el, container, handle) => {
				return handle.classList.contains("mv-drag-handle") && handle.closest(Mavo.selectors.multiple) == el;
			},
			accepts: function(el, target, source, next) {
				if (el.contains(target)) {
					return false;
				}

				var previous = next?.previousElementSibling ?? target.lastElementChild;

				var collection = _.get(previous) || _.get(next);

				if (!collection) {
					return false;
				}

				var item = Mavo.Node.get(el);

				return item?.collection.isCompatible(collection);
			}
		});

		this.dragula.on("drop", (el, target, source) => {
			if (!el.parentNode) {
				return;
			}

			var item = Mavo.Node.get(el);
			// var oldIndex = item && item.index;
			var next = el.nextElementSibling;
			var previous = el.previousElementSibling;
			var collection = _.get(previous) || _.get(next);
			var closestItem = Mavo.Node.get(previous) || Mavo.Node.get(next);

			if (closestItem && closestItem.collection != collection) {
				closestItem = null;
			}

			if (item.collection.isCompatible(collection)) {
				var index = closestItem? closestItem.index + (closestItem.element === previous) : collection.length;
				collection.add(item, index);
			}
			else {
				return this.dragula.cancel(true);
			}
		});

		_.dragulas.push(this.dragula);

		return this.dragula;
	}

	getClosestCollection () {
		return this;
	}

	static get (element) {
		// Is it an add button or a marker?
		var collection = Mavo.data(element, "collection");

		if (collection) {
			return collection;
		}

		// Maybe it's a collection item?
		var item = Mavo.Node.get(element);

		return item?.collection || null;
	}

	// Delete multiple items from potentially multiple collections or even multiple mavos
	static async delete (nodes, o = {}) {
		// Drop nodes that are not collection items
		nodes = nodes.filter(node => !!node.collection);

		if (nodes.length === 0) {
			return [];
		}
		else if (nodes.length === 1) {
			let ret = await nodes[0].collection.delete(nodes[0], o);
			return [ret];
		}

		let deleted = new Mavo.BucketMap({arrays: true}); // Mavos and deleted items
		let collections = new Set(); // Collections items were deleted from

		let promises = nodes.map(async node => {
				collections.add(node.collection);
				// We set undoable: false to suppress the Undo UI for individual items
				// so we can show one notice about all items
				let options = {silent: true, undoable: false, destroy: false};
				let item = await node.collection.delete(node, options);
				item.unsavedChanges = true;
				deleted.set(node.mavo, node);
				return item;
			});

		let ret = await Promise.all(promises);

		if (o.silent !== false) {
			// Here we are also batching change notifications to limit pointless expression recalc
			// Hopefully at some point we'll utilize a queue on the expression side
			// so we won't need to be careful about this in data modification code
			collections.forEach(collection => {
				collection.unsavedChanges = collection.mavo.unsavedChanges = true;
				collection.dataChanged("delete");
			});

			if (o.undoable !== false) {
				deleted.forEach((nodes, mavo) => {
					mavo.setDeleted(...nodes);
				});
			}
		}

		return ret;
	}
};

$.Class(_, {
	lazy: {
		bottomUp: function() {
			/**
			 * Add new items at the top or bottom?
			 */

			return /^desc\b/i.test(this.element.getAttribute("mv-order"));
		}
	},

	static: {
		dragulas: [],

		lazy: {
			dragula: () => $.include(self.dragula, "https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.js")
		}
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.ImplicitCollection = class ImplicitCollection extends Mavo.Node {
	constructor (element, mavo, o) {
		super(element, mavo, o);

		this.children = [];
		this.liveData = new Mavo.Data(this, []);

		this.add(element);
		this.postInit();

		Mavo.hooks.run("implicit-collection-init-end", this);
	}

	get length() {
		return this.children.length;
	}

	getData (o = {}) {
		var env = {
			context: this,
			options: o,
			data: []
		};

		this.children.forEach(node => {
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
			env.data = env.data.length === 1? env.data[0] : null;
		}

		env.data = Mavo.subset(this.data, this.inPath, env.data);

		Mavo.hooks.run("node-getdata-end", env);

		return env.data;
	}

	/**
	 * Add a new item to this collection
	 * @param item Element or Mavo object for the new item
	 */
	add (element) {
		var item = Mavo.Node.create(element, this.mavo, {
			collection: this,
			template: this.template?.children?.[this.length] ?? null,
			property: this.property,
			type: this.type
		});

		item.index = this.length;
		this.children.push(item);

		// item may have tried to propagate updates to us when we created it,
		// but that wouldn't have worked since item was not yet in
		// this.children, so we need to update manually.
		this.liveData.update();

		return item;
	}

	edit (o = {}) {
		if (super.edit() === false) {
			return false;
		}

		// Edit items
		return Promise.all(this.children.map(item => item.edit(o)));
	}

	dataRender (data, o = {}) {
		if (data !== undefined) {
			data = data === null? [] : Mavo.toArray(data).filter(i => i !== null);
			var changed = data.length !== this.liveData.length;

			this.children.forEach((item, i) => changed = item.render(data?.[i], o) ?? changed);
		}

		this.liveData.update();
	}
};

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.UI.Itembar = class Itembar {
	constructor (item) {
		this.item = item;

		// Is there an existing .mv-item-bar element?
		this.element = $$(`.mv-item-bar:is(:not([mv-rel]), [mv-rel="${this.item.property}"])`, this.item.element).filter(el => {
				// Ignore item controls meant for other collections
				return el.closest(Mavo.selectors.multiple) == this.item.element && !Mavo.data(el, "item");
			})[0];

		if (!this.element && this.item.template?.itembar) {
			// We can clone the buttons from the template
			this.element = this.item.template.itembar.element.cloneNode(true);
			this.dragHandle = $(".mv-drag-handle", this.element) || this.item.element;
		}
		else {
			// First item of this type
			this.element = this.element || $.create({
				className: "mv-item-bar mv-ui"
			});

			this.template = this.element.getAttribute("mv-item-bar")
		                || this.item.element.getAttribute("mv-item-bar")
		                || this.collection.element.getAttribute("mv-item-bar")
		                || "";

			let controls = Object.assign({}, _.controls);
			// If item is a primitive, move button is optional
			controls.move = {
				...controls.move,
				optional: this.item instanceof Mavo.Primitive
			};

			this.controls = Mavo.UI.Bar.getControls(this.template, controls);

			$.set(this.element, {
				"mv-rel": this.item.property,
				contents: this.controls.map(id => {
					let meta = _.controls[id];
					let existing = $(`.mv-${id}`, this.element);
					return $.create(meta.create.call(this, existing));
				})
			});

			this.dragHandle = $(".mv-drag-handle", this.element) || this.item.element;
		}

		this.element.setAttribute("hidden", "");

		$.bind([this.item.element, this.element], "focusin mouseover", this);

		$.bind(this.element, {
			mouseenter: evt => {
				this.item.element.classList.add("mv-highlight");
			},
			mouseleave: evt => {
				this.item.element.classList.remove("mv-highlight");
			}
		});

		this.dragHandle.addEventListener("keydown", evt => {
			if (evt.target === this.dragHandle && this.item.editing && evt.keyCode >= 37 && evt.keyCode <= 40) {
				// Arrow keys
				this.collection.move(this.item, evt.keyCode <= 38? -1 : 1);

				evt.stopPropagation();
				evt.preventDefault();
				evt.target.focus();
			}
		});

		if (this.dragHandle !== this.item.element) {
			this.dragHandle.addEventListener("click", evt => evt.target.focus());
		}

		Mavo.data(this.element, "item", this.item);
	}

	get collection() {
		return this.item.collection;
	}

	get mavo() {
		return this.item.mavo;
	}

	destroy () {
		this.hide();
	}

	show (sticky) {
		_.visible.forEach(instance => {
			if (instance != this && (!this.sticky || instance.sticky)) {
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
	}

	hide (sticky, timeout = 0) {
		if (!this.sticky || sticky) {
			if (timeout) {
				this.hideTimeout = setTimeout(() => this.hide(sticky), timeout);
			}
			else {
				this.element.setAttribute("hidden", "");
				$.unbind([this.item.element, this.element], "focusout mouseleave", this);
				this.sticky = false;
				_.visible.delete(this);
			}

		}
	}

	handleEvent (evt) {
		var sticky = evt.type.indexOf("mouse") === -1;

		if (this.isWithinItem(evt.target)) {
			clearTimeout(this.hideTimeout);

			if (["mouseleave", "focusout", "blur"].indexOf(evt.type) > -1) {
				if (!this.isWithinItem(evt.relatedTarget)) {
					this.hide(sticky, _.DELAY);
				}
			}
			else {
				this.show(sticky);
				evt.stopPropagation();
			}
		}
	}

	isWithinItem (element) {
		if (!element) {
			return false;
		}

		var itemBar = element.closest(".mv-item-bar");
		return itemBar? itemBar === this.element : element.closest(Mavo.selectors.item) === this.item.element;
	}

	add () {
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
	}

	remove () {
		Mavo.revocably.remove(this.element);

		if (this.dragHandle == this.item.element) {
			this.item.element.classList.remove("mv-drag-handle");
		}
	}
}

$.Class(_, {
	live: {
		sticky: function(v) {
			this.element.classList.toggle("mv-sticky", v);
		}
	},
	static: {
		DELAY: 100,
		visible: new Set(),
		container: {
			"details": "summary"
		},
		controls: {
			delete: {
				create (existing) {
					let button = existing || $.create("button", {
						type: "button",
						title: this.mavo._("delete-item", this.item),
						className: "mv-delete"
					});

					// Why $item and not this.collection.property?
					// If there's a nested property with the same name, the name will refer to that
					// However, this means that if we place the item bar inside another item, the button will not work anymore
					// It's a tradeoff, and perhaps if it proves to be a problem we can start detecting which one is best
					Mavo.setAttributeShy(button, "mv-action", "delete($item)");

					return button;
				}
			},
			add: {
				create (existing) {
					let bottomUp = this.collection.bottomUp;
					let args = `$item${bottomUp? ", $index + 1" : ""}`;
					let button = existing || $.create("button", {
						type: "button",
						title: this.mavo._(`add-item-${bottomUp? "after" : "before"}`, this.item),
						className: "mv-add"
					});

					Mavo.setAttributeShy(button, "mv-action", `if($cmd, add($item, ${args}), add(${args}))`);

					return button;
				}
			},
			move: {
				create (existing) {
					let button = existing || $.create("button", {
						type: "button",
						title: this.mavo._("drag-to-reorder", this.item),
						className: "mv-move"
					});

					button.classList.add("mv-drag-handle");

					return button;
				}
			}
		}
	}
});

})(Bliss, Bliss.$);

(function() {

var _ = Mavo.Expression = class Expression {
	constructor (expression, options = {}) {
		this.options = options;
		this.expression = expression;
	}

	eval (data = Mavo.Data.stub) {
		Mavo.hooks.run("expression-eval-beforeeval", this);

		if (this.function instanceof Error) {
			// Previous compilation error
			return this.function;
		}

		try {
			return this.function(data);
		}
		catch (error) {
			// Runtime error
			this.error(`Something went wrong with the expression ${this.expression}`,
				error.message,
				`Data was: ${JSON.stringify(data)}`
			);

			Mavo.hooks.run("expression-eval-error", {context: this, error});

			return error;
		}
	}

	error (title, ...message) {
		message = message.join("\n");
		console.info(`%cOops! 😳 ${title}:`, "color: #c04; font-weight: bold;", message);
	}

	toString () {
		return this.expression;
	}

	changedBy (evt) {
		return _.changedBy(this.identifiers, evt);
	}
};

Bliss.Class(_, {
	live: {
		expression: function(value) {
			try {
				this.function = Mavo.Script.compile(value, this.options);
			}
			catch (error) {
				// Compilation error
				this.error(`There is something wrong with the expression ${value}`,
					error.message,
					"Not an expression? See https://mavo.io/docs/expressions/#disabling-expressions for information on how to disable expressions."
				);

				Mavo.hooks.run("expression-compile-error", {context: this, error});

				this.function = error;

				return value;
			}

			this.ast = this.options.ast;
			delete this.options.ast;

			if (this.ast) {
				// Traverse AST to find potential identifiers
				let identifiers = new Set();

				Mavo.Script.walk(this.ast, (n, property, parent) => {
					if (n.type === "Identifier" && property !== "callee") {
						identifiers.add(n.name);
					}
					else if (n.type === "MemberExpression") {
						if (n.object.name) {
							identifiers.add(n.object.name);
						}

						identifiers.add(n.property.name);
					}
				});

				this.identifiers = [...identifiers];
			}
		}
	}
});

_.Syntax = class Syntax {
	constructor (start, end) {
		this.start = start;
		this.end = end;
		// Try to parse anything between start and end as an expression. Note
		// that this parses text that we don't want to treat as expressions,
		// including the empty expression, but we want to parse them out anyway
		// and only later decide not to evaluate them as expressions so that we
		// don't parse, say, [][1] as a single expression containing "][1".

		// Regex note: "[\S\s]" matches all characters, unlike ".", which
		// doesn't match newlines.
		this.regex = RegExp(`${Mavo.escapeRegExp(start)}([\\S\\s]*?)${Mavo.escapeRegExp(end)}`, "gi");
	}

	test (str) {
		this.regex.lastIndex = 0;

		return this.regex.test(str);
	}

	tokenize (str) {
		var match, ret = [], lastIndex = 0;

		this.regex.lastIndex = 0;

		while ((match = this.regex.exec(str)) !== null) {
			// Literal before the expression
			if (match.index > lastIndex) {
				ret.push(str.substring(lastIndex, match.index));
			}

			lastIndex = this.regex.lastIndex;

			if (/\S/.test(match[1])) {
				ret.push(new Mavo.Expression(match[1]));
			}
			else {
				// If the matched expression is empty or consists only of
				// whitespace, don't treat it as an expression.
				ret.push(match[0]);
			}
		}

		// Literal at the end
		if (lastIndex < str.length) {
			ret.push(str.substring(lastIndex));
		}

		return ret;
	}

	static create (element) {
		if (element) {
			var syntax = element.getAttribute("mv-expressions");

			if (syntax) {
				syntax = syntax.trim();
				return /\s/.test(syntax)? new _.Syntax(...syntax.split(/\s+/)) : _.Syntax.ESCAPE;
			}
		}
	}
};

_.Syntax.ESCAPE = -1;
_.Syntax.default = new _.Syntax("[", "]");

})();

(function($, $$) {

// Some web components (e.g. AFrame) hijack getAttribute()
const originalGetAttribute = Element.prototype.getAttribute;

const SVG_NAMESPACE_URI = "http://www.w3.org/2000/svg";
const MATHML_NAMESPACE_URI = "http://www.w3.org/1998/Math/MathML";

var _ = Mavo.DOMExpression = $.Class({
	async constructor (o = {}) {
		this.mavo = o.mavo;
		this.template = o.template?.template || o.template;

		for (let prop of ["item", "path", "syntax", "fallback", "attribute", "originalAttribute", "expression", "parsed", "identifiers"]) {
			this[prop] = o[prop] === undefined && this.template? this.template[prop] : o[prop];
		}

		this.node = o.node;

		if (!this.node) {
			// No node provided, figure it out from path
			this.node = Mavo.elementPath(this.item.element, this.path);
		}

		this.element = this.node;
		this.attribute = this.attribute || null;

		Mavo.hooks.run("domexpression-init-start", this);

		if (/^mv-(value$|attr-)/.test(this.attribute)) {
			// Attributes transformed to other attributes
			this.originalAttribute = this.attribute;

			if (this.attribute == "mv-value") {
				this.attribute = Mavo.Primitive.getValueAttribute(this.element);
			}
			else {
				this.attribute = this.attribute.replace("mv-attr-", "");

				// Get proper attribute case if in a case sensitive environment
				// FIXME do we also need this for XHTML?
				// FIXME what about namespaced attributes? (e.g. xlink:href)
				if ([SVG_NAMESPACE_URI, MATHML_NAMESPACE_URI].includes(this.element.namespaceURI)) {
					this.attribute = Mavo.getProperAttributeCase(this.element, this.attribute);
				}
			}

			this.fallback ??= Mavo.Primitive.getValue(this.element, {attribute: this.attribute});
			let expression = this.element.getAttribute(this.originalAttribute);
			this.element.removeAttribute(this.originalAttribute);
			this.parsed = [new Mavo.Expression(expression)];
			this.expression = expression;
		}

		if (this.node.nodeType === 3 && this.element === this.node) {
			this.element = this.node.parentNode;

			// If no element siblings consider making this.node the element, which is more robust
			if (!this.node.parentNode.children.length || this.attribute) {
				this.element.normalize();

				if (!this.node.parentNode || this.attribute) {
					// Normalization destroyed our text node, reassign it to the parent
					// Same if it's in an attribute, there are no attributes on a text node!
					this.node = this.element;
				}
			}
		}

		if (typeof this.expression !== "string") { // Still unhandled?
			if (this.attribute) {
				let value = originalGetAttribute.call(this.node, this.attribute);

				this.expression = (value || "").trim();
			}
			else {
				// Move whitespace outside to prevent it from messing with types
				this.node.normalize();

				if (this.node.childNodes.length === 1 && this.node?.firstChild?.nodeType === 3) {
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

			this.parsed = this.template? this.template.parsed : this.syntax.tokenize(this.expression);
		}

		this.oldValue = this.value = this.parsed.map(x => x instanceof Mavo.Expression? "" : x);

		// Cache identifiers
		this.identifiers = this.identifiers || this.parsed.flatMap(x => x.identifiers || []);

		// Any identifiers that need additional updating?
		_.special.add(this);

		Mavo.hooks.run("domexpression-init-end", this);

		_.elements.set(this.element, [...(_.elements.get(this.element) || []), this]);

		await this.mavo.treeBuilt;

		if (!this.template && !this.item) {
			// Only collection items and groups can have their own expressions arrays
			this.item = Mavo.Node.getClosestItem(this.element);
		}

		if (this.originalAttribute == "mv-value" && this.mavoNode && this.mavoNode == this.item.collection) {
			this.item.expressions.delete(this);
		}

		this.mavo.expressions.register(this);

		Mavo.hooks.run("domexpression-init-treebuilt", this);
	},

	destroy: function() {
		_.special.delete(this);
		this.mavo.expressions.unregister(this);
	},

	get isDynamicObject() {
		return this.originalAttribute == "mv-value"
		       && this.mavoNode
			   && !(this.mavoNode instanceof Mavo.Primitive);
	},

	changedBy: function(evt) {
		if (this.isDynamicObject) {
			// Just prevent the same node from triggering changes, everything else is game
			return !evt || !this.mavoNode.contains(evt.node);
		}

		return Mavo.Expression.changedBy(this.identifiers, evt);
	},

	update: function(o) {
		if (this.active === false) {
			return;
		}

		var env = {context: this};
		var parentEnv = env;

		if (this.item) {
			var scope = this.isDynamicObject? this.item.parent : this.item;
			var data = this.data = scope.getLiveData();
		}
		else {
			var data = this.data === undefined? Mavo.Data.stub : this.data;
		}

		Mavo.hooks.run("domexpression-update-start", env);

		this.oldValue = this.value;
		var changed = false;

		env.value = this.value = this.parsed.map((expr, i) => {
			if (expr instanceof Mavo.Expression) {
				let oldValue = Mavo.value(this.oldValue[i]);
				var env = {context: this, expr, parentEnv, oldValue};

				Mavo.hooks.run("domexpression-update-beforeeval", env);

				env.value = Mavo.value(env.expr.eval(data));

				Mavo.hooks.run("domexpression-update-aftereval", env);

				if (env.value instanceof Error) {
					env.value = this.fallback !== undefined? this.fallback : this.syntax.start + env.expr.expression + this.syntax.end;
				}

				if (env.value === undefined || env.value === null) {
					// Don’t print things like "undefined" or "null"
					env.value = "";
				}

				let value = Mavo.value(env.value);
				if (!this.evaluated || typeof value === "object" || value !== oldValue) {
					changed = true;
				}

				this.evaluated = true;

				return env.value;
			}

			return expr;
		});

		if (!changed && !o?.force) {
			// If nothing changed, no need to do anything
			return;
		}

		if (env.value.length === 1) {
			env.value = env.value[0];
		}
		else {
			env.value = env.value.map(v => Mavo.Primitive.format(v, {
				attribute: this.attribute,
				element: this.element
			})).join("");
		}

		this.output(env.value);

		Mavo.hooks.run("domexpression-update-end", env);
	},

	output: function(value) {
		if (this.mavoNode) {
			if (Mavo.in(Mavo.isProxy, value)) {
				value = Mavo.clone(value); // Drop proxy
			}

			this.mavoNode.render(value, {live: true});
		}
		else {
			if (this.node.nodeType === Node.TEXT_NODE && !this.node.parentNode) {
				// If our expression was on a text node, and that somehow became orphaned, use the parent instead
				this.node = this.element;
			}

			Mavo.Primitive.setValue(this.node, value, {attribute: this.attribute});
		}
	},

	live: {
		item: function(item) {
			if (item && this._item != item) {
				if (this._item) {
					// Previous item, delete from its expressions
					this._item.expressions.delete(this);
				}

				item.expressions = item.expressions || new Set();
				item.expressions.add(this);
			}
		}
	},

	static: {
		elements: new WeakMap(),

		/**
		 * Search for Mavo.DOMExpression object(s) associated with a given element
		 * and optionally an attribute.
		 *
		 * @return If one argument, array of matching DOMExpression objects.
		 *         If two arguments, the matching DOMExpression object or null
		 */
		search: function (element, attribute) {
			if (element === null) {
				return element;
			}

			// HTML attributes are case-insensitive (fix for #515)
			if (attribute && !element.ownerDocument.xmlVersion) {
				attribute = attribute.toLowerCase();
			}

			var all = _.elements.get(element) || [];

			if (arguments.length > 1) {
				if (!all.length) {
					return null;
				}

				return all.filter(et => et.attribute === attribute)[0] || null;
			}

			return all;
		},

		special: {
			add: function(domexpression, name) {
				if (name) {
					var o = this.vars[name];
					var hasName = domexpression.identifiers.indexOf(name) > -1;
					var hasUnprefixedName = (name.startsWith("$") &&
						domexpression.identifiers.indexOf(name.substr(1)) > -1);

					if (o && (hasName || hasUnprefixedName)) {
						o.all = o.all || new Set();
						o.all.add(domexpression);

						if (o.all.size === 1) {
							o.observe();
						}
						else if (!o.all.size) {
							o.unobserve();
						}
					}
				}
				else {
					// All names
					for (var name in this.vars) {
						this.add(domexpression, name);
					}
				}
			},

			delete: function(domexpression, name) {
				if (name) {
					var o = this.vars[name];

					o.all = o.all || new Set();
					o.all.delete(domexpression);

					if (!o.all.size) {
						o.unobserve();
					}
				}
				else {
					// All names
					for (var name in this.vars) {
						this.delete(domexpression, name);
					}
				}
			},

			update: function() {
				this.update?.(...arguments);

				this.all.forEach(domexpression => domexpression.update());
			},

			event: function(name, {type, update, target = document} = {}) {
				this.vars[name] = {
					observe: function() {
						this.callback = this.callback || _.special.update.bind(this);
						$.bind(target, type, this.callback);
					},
					unobserve: function() {
						$.unbind(target, type, this.callback);
					}
				};

				if (update) {
					this.vars[name].update = function(evt) {
						Mavo.Functions[name] = update(evt);
					};
				}
			},

			vars: {
				"$now": {
					observe: function() {
						var callback = () => {
							_.special.update.call(this);
							this.timer = requestAnimationFrame(callback);
						};

						this.timer = requestAnimationFrame(callback);
					},
					unobserve: function() {
						cancelAnimationFrame(this.timer);
					}
				}
			}
		}
	}
});

_.special.event("$mouse", {
	type: "mousemove",
	update: function(evt) {
		return {x: evt.clientX, y: evt.clientY};
	}
});

_.special.event("$hash", {
	type: "hashchange",
	target: window
});

})(Bliss, Bliss.$);

(function($, $$) {

Mavo.attributes.push("mv-expressions");

var _ = Mavo.Expressions = $.Class({
	async constructor (mavo) {
		this.mavo = mavo;
		this.active = true;

		this.expressions = new Set();
		this.identifiers = {};

		var syntax = Mavo.Expression.Syntax.create(this.mavo.element.closest("[mv-expressions]")) || Mavo.Expression.Syntax.default;
		this.traverse(this.mavo.element, undefined, syntax);

		this.scheduled = {};

		await this.mavo.treeBuilt;

		this.expressions = new Set();
		this.update();
	},

	register: function(domexpression) {
		var ids = this.identifiers;
		domexpression.registeredApp = domexpression.registeredApp || new Set();
		domexpression.identifiers.forEach(id => {
			if (!(ids[id] instanceof Set)) {
				ids[id] = new Set();
			}

			ids[id].add(domexpression);

			if (Mavo.all[id] instanceof Mavo && Mavo.all[id] !== this.mavo && !domexpression.registeredApp.has(id) ) {
				// Cross-mavo expressions, make sure to track app id before calling register.
				domexpression.registeredApp.add(id);
				Mavo.all[id].expressions.register(domexpression);
			}
		});
	},

	unregister: function(domexpression) {
		var ids = this.identifiers;

		domexpression.identifiers.forEach(id => {
			if (ids[id]) {
				ids[id].delete(domexpression);
			}

			// just in case domexpresssion has been destroyed by another app during the loop
			// when another app is destroyed.
			if (id in Mavo.all && typeof domexpresssion !== "undefined") {
				// Cross-mavo expressions
				Mavo.all[id].expressions.unregister(domexpresssion);
			}
		});
	},

	updateThrottled: function(evt) {
		if (!this.active) {
			return;
		}

		var scheduled = this.scheduled[evt.action] = this.scheduled[evt.action] || new Set();

		if (evt.node.template) {
			// Throttle events in collections and events from other Mavos
			if (!scheduled.has(evt.node.template)) {
				setTimeout(() => {
					scheduled.delete(evt.node.template);
					this.update(evt);
				}, _.THROTTLE);

				scheduled.add(evt.node.template);
			}
		}
		else {
			requestAnimationFrame(() => this.update(evt));
		}
	},

	update: function(evt) {
		if (!this.active) {
			return;
		}

		var root, rootObject;

		if (evt instanceof Mavo.Node) {
			rootObject = evt;
		}
		else if (evt instanceof Element) {
			root = evt.closest(Mavo.selectors.item);
			rootObject = Mavo.Node.get(root);
		}
		else if (evt) {
			// Specific data change
			var cache = {
				updated: new Set()
			};

			this.updateByIdThrottled(evt.property, evt, cache);

			if (evt.action == "propertychange") {
				if (evt.node?.path) {
					// Ensure that [collectionName] updates when changing children
					this.updateByIdThrottled(evt.node.path, evt, cache);
				}
			}
			else {
				// Collection modifications (add, delete, move etc)
				this.updateById(Object.keys(Mavo.Data.special), evt, cache);

				var collection = evt.node.collection || evt.node;

				this.updateById(collection.properties, evt, cache);
			}

			return;
		}
		else {
			rootObject = this.mavo.root;
		}

		rootObject.walk((obj, path) => {
			if (!obj.expressionsEnabled) {
				return false;
			}

			obj.expressions?.forEach(et => {
				// Prevent mv-value loops
				if (!evt || et.mavoNode !== evt) {
					et.update();
				}
			});
		});
	},

	updateByIdThrottled: function(property, evt, cache) {
		if (!property) {
			return;
		}

		if (property.forEach) {
			property.forEach(property => this.updateByIdThrottled(property, evt, cache));
		}
		else {
			var scheduled = this.scheduledIds = this.scheduledIds || new Set();

			if (!scheduled.has(property)) {
				setTimeout(() => {
					scheduled.delete(property);

					this.updateById(property, evt, cache);
				}, _.THROTTLE);

				scheduled.add(property);
			}
		}
	},

	updateById: function(property, evt, cache) {
		if (property.forEach) {
			// Multiple properties
			property.forEach(p => this.updateById(p, evt, cache));
			return;
		}

		var exprs = this.identifiers[property];

		if (exprs) {
			exprs.forEach(expr => {
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

	extract: function(node, attribute, path, syntax = Mavo.Expression.Syntax.default) {
		let attributeName = attribute?.name;
		if (_.directives.some(d => d.test?.(attributeName) || d === attributeName) ||
		    syntax !== Mavo.Expression.Syntax.ESCAPE && syntax.test(attribute? attribute.value : node.textContent)
		) {
			if (path === undefined) {
				path = Mavo.elementPath(node.closest(Mavo.selectors.scope), node);
			}

			this.expressions.add(new Mavo.DOMExpression({
				node, syntax, path,
				attribute: attributeName,
				mavo: this.mavo
			}));
		}
	},

	// Traverse an element, including attribute nodes, text nodes and all descendants
	traverse: function(node, path = [], syntax) {
		if (node.nodeType === 8) {
			// We don't want expressions to be picked up from comments!
			// Commenting stuff out is a common debugging technique
			return;
		}

		if (node.nodeType === 3) { // Text node
			// Leaf node, extract references from content
			this.extract(node, null, path, syntax);
		}
		else {
			node.normalize();

			syntax = Mavo.Expression.Syntax.create(node) || syntax;

			if (node.matches(Mavo.selectors.scope)) {
				path = [];
			}

			let ignoredAttributes = new Set([
				// Globally ignored attributes (for all elements)
				..._.skip,

				// Locally ignored attributes (for this element)
				...(node.getAttribute("mv-expressions-ignore")?.trim().split(/\s*,\s*/) ?? [])
			]);
			let specifiedAttributes = new Set(node.getAttributeNames());

			// Remove ignored attributes
			for (let name of specifiedAttributes) {
				if (ignoredAttributes.has(name)) {
					specifiedAttributes.delete(name);
				}
				else if (name.startsWith("mv-attr-")) {
					// If mv-attr-foo is present, ignore foo
					let plainName = name.replace("mv-attr-", "");
					specifiedAttributes.delete(plainName);
				}
			}

			for (let name of specifiedAttributes) {
				this.extract(node, node.attributes[name], path, syntax);
			}

			var index = -1, offset = 0;

			if (!node.matches("script:not([mv-expressions])")) {
				$$(node.childNodes).forEach(child => {
					if (child.nodeType == 1) {
						offset = 0;
						index++;
					}
					else {
						offset++;
					}

					if (child.nodeType == 1 || child.nodeType == 3) {
						var segment = offset > 0? `${index}.${offset}` : index;
						this.traverse(child, [...path || [], segment], syntax);
					}
				});
			}
		}
	},

	static: {
		directives: [
			"mv-value",
			/^mv\-attr\-/
		],

		skip: ["mv-expressions", "mv-action"],

		THROTTLE: 50,

		directive: function(name, o) {
			_.directives.push(name);
			Mavo.attributes.push(name);
			Mavo.Plugins.register(name, o);
		}
	}
});

})(Bliss, Bliss.$);

// mv-if plugin
(function($, $$) {

Mavo.Expressions.directive("mv-if", {
	extend: {
		"Primitive": {
			live: {
				"hidden": function(value) {
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
				"childProperties": function() {
					var properties = $$(Mavo.selectors.property, this.element)
									.filter(el => el.closest("[mv-if]") == this.element)
									.map(el => Mavo.Node.get(el));

					// When the element is detached, mv-change events from properties
					// do not propagate up to the group so expressions do not recalculate.
					// We must do this manually.
					this.element.addEventListener("mv-change", evt => {
						// Cannot redispatch synchronously [why??]
						requestAnimationFrame(() => {
							if (!this.element.parentNode) { // out of the DOM?
							this.item.element.dispatchEvent(evt);
						}
						});
					});

					return properties;
				}
			}
		}
	},
	hooks: {
		"domexpression-init-start": function() {
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
		"domexpression-update-end": async function() {
			if (this.attribute !== "mv-if") {
				return;
			}

			var value = this.value[0];
			var oldValue = this.oldValue[0];

			// Only apply this after the tree is built, otherwise any properties inside the if will go missing!
			await this.item.mavo.treeBuilt;

			if (this.parentIf) {
				var parentValue = this.parentIf.value[0];
				this.value[0] = value = value && parentValue;
			}

			if (parentValue !== false) { // If parent if was false, it wouldn't matter whether this is in the DOM or not
				if (value) {
					// Is removed from the DOM and needs to get back
					Mavo.revocably.add(this.element);
				}
				else if (this.element.parentNode) {
					// Is in the DOM and needs to be removed
					Mavo.revocably.remove(this.element, "mv-if");
				}
			}

			if (value !== oldValue) {
				// Mark any properties inside as hidden or not
				this.childProperties?.forEach(property => property.hidden = !value);
				this.childIfs?.forEach(childIf => childIf.update());
			}
		},
		"node-isdatanull": function(env) {
			env.result = env.result || (this.hidden && env.options.live);
		}
	}
});

})(Bliss, Bliss.$);

/**
 * Functions available inside Mavo expressions
 */

(function($, val) {

let $u = {
	numbers (array, args) {
		array = Array.isArray(array)? array : (args? $$(args) : [array]);

		return array.filter(number => !isNaN(number) && val(number) !== "" && val(number) !== null).map(n => +n);
	},

	// Implement function metadata
	postProcess (callback) {
		var multiValued = callback.multiValued;
		var newCallback;

		if (multiValued === true || multiValued?.length === 2) {
			newCallback = (...args) => {
				// Define index of multiValued arguments
				// Fallback to first 2 arguments if not explicitly defined
				var idxA = multiValued[0] || 0;
				var idxB = multiValued[1] || 1;

				return Mavo.Script.binaryOperation(args[idxA], args[idxB], {
					scalar: (a, b) => {
						// Replace multiValued argument with its individual elements
						if (idxA in args) {
							args[idxA] = a;
						}

						if (idxB in args) {
							args[idxB] = b;
						}

						return callback(...args);
					},
					...callback
				});
			};
		}
		else if (callback.isAggregate) {
			newCallback = function(array) {
				if (Mavo.in(Mavo.groupedBy, array)) { // grouped structures
					return array.map(e => newCallback(e.$items));
				}

				var ret = callback.call(this, ...arguments);

				return ret === undefined? array : ret;
			};
		}

		if (newCallback) {
			// Preserve function metadata
			$.extend(newCallback, callback);
			newCallback.original = callback;
		}

		if (callback.alias) {
			for (let alias of Mavo.toArray(callback.alias)) {
				Mavo.Functions[alias] = newCallback || callback;
			}
		}

		return newCallback;
	},

	deprecatedFunction (name, oldName, fn) {
		return function (...args) {
			fn ??= Mavo.Functions[name];
			Mavo.warn(`${oldName}() is deprecated and will be removed in the next version of Mavo. Please use ${name}() instead.`);
			return fn(...args);
		}
	}
}

let _ = Mavo.Functions = {
	operators: {
		"=": "eq"
	},

	/**
	 * Get a property of an object. Used by the . operator to prevent TypeErrors
	 */
	get: function(obj, property, ...properties) {
		if (arguments.length <= 1) {
			return obj;
		}

		let ret;
		property = val(property);

		// Get same case property name if it exists,
		// otherwise do a case insensitive search among properties
		let canonicalProperty = Mavo.getCanonicalProperty(obj, property);

		if (canonicalProperty !== undefined) {
			ret = obj[canonicalProperty];
		}
		else if (Array.isArray(obj) && property && isNaN(property)) {
			// Array and non-numerical property, get from objects inside
			ret = obj.map(e => _.get(e, property));
		}
		else {
			// Not found :(
			return null;
		}

		if (properties.length > 0) {
			return _.get(ret, ...properties);
		}

		return ret;
	},

	// Like get() when used with an array, but immediately goes to items
	// This means that map(arr, 'length') will return an array of item.length, rather than just the length of arr
	map: function(array, property) {
		if (Array.isArray(array)) {
			return array.map(e => _.get(e, property));
		}
		else if (array) {
			return _.get(array, property);
		}
	},

	/**
	 * Get the page URL (if called with no params), or a parameter from it.
	 * @param {string} id Parameter name
	 * @param {object} [...options] One or more options objects
	 * @param {string | URL} [options.url] URL to get parameter from. Defaults to current page URL
	 * @param { "query" | "path" } [options.type] Type of parameter to get.
	 * 		"query" for query string type URLs (?foo=value)
	 * 		"path" for path type URLs (/foo/value)
	 * 		If not specified, it will search for both, with query string parameters taking precedence
	 * @param {boolean} [options.case_sensitive=false] Whether to do a case sensitive search
	 * @param {boolean} [options.multiple=false] Whether to return multiple values if there are multiple parameters with the same name
	 * @returns {string | null}
	 */
	url: (id, ...options) => {
		if (id === undefined) {
			// url() with no arguments is just an alias for location.href
			return location.href;
		}

		// Resolve options
		options = Object.assign({}, ...options);
		let { url = location, type, case_sensitive, multiple } = options;

		if (id) {
			// Why not Mavo.base as the 2nd arg? We want a URL that will not have a path or query string of its own
			url = new URL(url, "https://mavo.io");

			if (type === "query" || !type) {
				// Search for parameter in query string first
				let params = url.searchParams;
				let ret = url.searchParams.getAll(id);

				if (ret.length === 0 && !case_sensitive) {
					// Not found with the case provided, do a case insensitive search
					let keys = [...params.keys()].filter(key => key.toLowerCase() === id.toLowerCase());
					ret = keys.flatMap(key => params.getAll(key));
				}

				if (ret.length > 0) {
					return multiple? ret : ret[0];
				}
			}

			if (type === "path" || !type) {
				let path = url.pathname.split("/");
				// FIXME support multiple here?
				let index = case_sensitive ? path.indexOf(id) : path.findIndex(part => part.toLowerCase() === id.toLowerCase());


				if (index > -1) {
					let ret = path[index + 1] ?? "";

					if (ret) {
						ret = decodeURIComponent(ret);
					}

					return multiple? Mavo.toArray(ret) : ret;
				}
			}
		}

		// If we're here, we either have an empty parameter name, or it wasn't found
		// Note that an empty parameter name is not the same as not providing a parameter name at all,
		// It’s usually due to a variable being the parameter name and the variable not being set yet
		return multiple? [] : null;
	},

	first: (n, arr) => {
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
		}
		else {
			var ret = [];
			var numReturn = n === undefined ? 1 : Math.floor(n);

			for (var i = 0; i<arr.length && ret.length<numReturn; i++) {
				let rawValue = Mavo.value(arr[i]);
				if (rawValue !== null && rawValue !== "") {
					ret.push(arr[i]);
				}
			}

			if (n === undefined) {
				return ret[0] !== undefined ? ret[0] : null;
			}

			return ret;
		}
	},
	last: (n, arr) => {
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
		}
		else {
			var ret = [];
			var numReturn = n === undefined ? 1 : Math.floor(n);

			for (var i = arr.length-1; i>=0 && ret.length<numReturn; i--) {
				let rawValue = Mavo.value(arr[i]);
				if (rawValue !== null && rawValue !== "") {
					ret.push(arr[i]);
				}
			}

			if (n === undefined) {
				return ret[0] !== undefined ? ret[0] : null;
			}

			return ret;
		}
	},
	// Get rid of empty values in array. Same as first(count(arr), arr)
	condense: (arr) => {
		return _.first(arr.length, arr);
	},

	unique: function(arr) {
		if (!Array.isArray(arr)) {
			return arr;
		}

		return [...new Set(arr.map(val))];
	},

	/**
	 * Do two arrays or sets have a non-empty intersection?
	 * @return {Boolean}
	 */
	intersects: function(arr1, arr2) {
		if (arr1 && arr2) {
			var set2 = new Set(Mavo.toArray(arr2).map(val));
			arr1 = Mavo.toArray(arr1).map(val);

			return !arr1.every(el => !set2.has(el));
		}
	},

	intersection: function (arr1, arr2) {
		if (!arr1 || !arr2) {
			return null;
		}

		arr1 = Mavo.toArray(arr1);
		arr2 = Mavo.toArray(arr2);

		let set2 = new Set(arr2.map(val));

		return arr1.filter(x => set2.has(Mavo.value(x)));
	},

	/*********************
	 * Number functions
	 *********************/

	/**
	 * Aggregate sum
	 */
	sum: $.extend(function(array) {
		return $u.numbers(array, arguments).reduce((prev, current) => {
			return +prev + (+current || 0);
		}, 0);
	}, {
		isAggregate: true
	}),

	/**
	 * Average of an array of numbers
	 */
	average: $.extend(function(array) {
		array = $u.numbers(array, arguments);
		return array.length && _.sum(array) / array.length;
	}, {
		isAggregate: true,
		alias: "avg"
	}),

	/**
	 * Median of an array of numbers
	 */
	median: $.extend(function(array) {
		array = $u.numbers(array, arguments).sort((a, b) => a - b);
		var mi = (array.length - 1) / 2;
		[m1, m2] = [array[Math.floor(mi)], array[Math.ceil(mi)]];
		return (m1 + m2) / 2 || 0;
	}, {
		isAggregate: true
	}),

	/**
	 * Min of an array of numbers
	 */
	min: $.extend(function(array) {
		return Math.min(...$u.numbers(array, arguments));
	}, {
		isAggregate: true
	}),

	/**
	 * Max of an array of numbers
	 */
	max: $.extend(function(array) {
		return Math.max(...$u.numbers(array, arguments));
	}, {
		isAggregate: true
	}),

	atan2: $.extend((dividend, divisor) => Math.atan2(dividend, divisor), {
		multiValued: true,
		rightUnary: b => b,
		default: 1
	}),

	pow: $.extend((base, exponent) => Math.pow(base, exponent), {
		multiValued: true,
		default: 1
	}),

	imul: $.extend((a, b) => Math.imul(a, b), {
		multiValued: true,
		default: 1
	}),

	count: $.extend(function(array) {
		return Mavo.toArray(array).filter(a => !empty(a)).length;
	}, {
		isAggregate: true
	}),

	reverse: function(array) {
		return Mavo.toArray(array).slice().reverse();
	},

	round: $.extend((num, decimals) => {
		if (not(num) || not(decimals) || !isFinite(num)) {
			return Math.round(num);
		}

		return +(+num).toLocaleString("en-US", {
			useGrouping: false,
			maximumFractionDigits: decimals
		});
	}, {
		multiValued: true,
		rightUnary: b => b,
		default: 0
	}),

	ordinal: $.extend((num) => {
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

	pluralize: $.extend(function(num, ...args) {
		if (empty(num)) {
			return "";
		}

		if (args.length === 0) {
			return num;
		}

		let o = args.reduce((o, arg) => {
			arg = Mavo.value(arg);

			if ($.type(arg) !== "object") {
				if (o.one) {
					arg = Object.fromEntries(["zero", "two", "few", "many", "other"].map(k => [k, arg]))
				}
				else {
					arg = {one: arg}
				}
			}

			return Object.assign(o, arg);
		}, {});

		let lang = o.lang || Mavo.locale;
		let pl = new Intl.PluralRules(lang, {type: o.type || "cardinal"});
		let type = pl.select(num);
		let label = o[type] || o.other || o.two || o.zero || o.few || o.many || o.one;

		if (o.text_only) {
			return label;
		}

		if (o.type === "ordinal") {
			return `${num}${label}`;
		}

		return `${num} ${label}`;
	}, {
		multiValued: true,
		needsContext: true
	}),

	digits: $.extend((digits, decimals, num) => {
		if (num === undefined) {
			num = decimals;
			decimals = undefined;
		}

		if (isNaN(num)) {
			return null;
		}

		var parts = (num + "").split(".");

		// If it has more digits than n = digits, only keep the last n digits.
		parts[0] = parts[0].slice(-digits);

		// Chop extra decimals without rounding
		if (decimals !== undefined && parts[1]) {
			parts[1] = parts[1].slice(0, decimals);
		}

		num = +parts.join(".");

		// This is mainly for padding with zeroes, we've done the rest already
		return num.toLocaleString("en", {
			useGrouping: false, // we want something that can be converted to a number again
			minimumIntegerDigits: digits,
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals || 20
		});
	}, {
		multiValued: true
	}),

	iff: function(condition, iftrue=condition, iffalse=null) {
		if (Array.isArray(condition)) {
			return condition.map((c, i) => {
				var ret = val(c)? iftrue : iffalse;

				return Array.isArray(ret)? ret[Math.min(i, ret.length - 1)] : ret;
			});
		}

		return val(condition)? iftrue : iffalse;
	},

	group: (...objects) => {
		return Object.assign({}, ...objects);
	},
	list: (...items) => items.flat(),

	// FIXME if step=0 returns NaN
	random: $.extend((min = 0, max = 100, step = 1) => {
		if (arguments.length == 1) {
			max = min;
			min = 0;
		}

		var rand = Math.random();
		var range = (max - min)  / step;
		return Math.floor(rand * (range + 1)) * step + min;
	}, {
		multiValued: true
	}),

	range: (a, b, step) => {
		if (step === undefined) {
			if (b === undefined) {
				[a, b] = [a >= 0? 1 : -1, a]
			}

			step = a <= b? 1 : -1;
		}

		let steps = Math.floor((b - a)/step + 1);

		if (steps <= 0 || !isFinite(steps)) {
			return [a];
		}

		let ret = [];

		for (let i = 0, n = a; i++ < steps; n += step) {
			ret.push(n);
		}

		return ret;
	},

	shuffle: list => {
		if (Array.isArray(list)) {
			// Fisher-Yates shuffle
			var ret = list.slice();

			for (var i = ret.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				[ret[i], ret[j]] = [ret[j], ret[i]];
			}

			return ret;
		}
		else {
			return list;
		}
	},

	sort (list, by = list, ...options) {
		options = Object.assign({}, ...options);
		let collatorOptions = Object.assign({numeric: true}, options);
		let collator = new Intl.Collator(options.lang || Mavo.locale, collatorOptions);

		if (!Array.isArray(by)) {
			by = _.get(list, by);
		}

		let desc = options.order?.startsWith("desc");

		let arr = list.map((a, i) => [a, by[i]]);
		arr = arr.sort((a, b) => {
			let bya = a[1];
			let byb = b[1];

			return collator.compare(bya, byb) * (desc? -1 : 1);
		});

		return arr.map(a => a[0]);

	},

	/*********************
	 * String functions
	 *********************/

	/**
	 * Replace all occurences of a string with another string
	 */
	replace: $.extend((haystack, needle, replacement = "", iterations = 1) => {
		if (!Mavo.value(haystack)) {
			return haystack;
		}

		if (Array.isArray(haystack)) {
			return haystack.map(item => _.replace(item, needle, replacement));
		}

		// Simple string replacement
		var needleRegex = RegExp(Mavo.escapeRegExp(needle), "g");
		var ret = haystack, prev;
		var counter = 0;

		while (ret != prev && (counter++ < iterations)) {
			prev = ret;
			ret = ret.replace(needleRegex, replacement);
		}

		return ret;
	}, {
		multiValued: true
	}),

	len: $.extend(text => str(text).length, {
		multiValued: true
	}),

	/**
	 * Search if a group, collection, or primitive contains a string
	 * @returns Boolean if a haystack AND needle of object or primitive are passed
	 * @returns Array of booleans if either a haystack OR needle of array is passed
	 */
	contains: $.extend((haystack, needle) => {
		let ret;
		let haystackType = $.type(haystack);

		if ($.type(needle) === "object") {
			return JSON.stringify(haystack).indexOf(JSON.stringify(needle)) >= 0;
		}

		if (haystackType === "object" || haystackType === "array") {
			for (let property in haystack) {
				ret = _.contains(haystack[property], needle);

				if (Array.isArray(ret)) {
					ret = Mavo.Functions.or(ret);
				}
				if (ret) {
					return true;
				}
			}
		}
		else {
			return _.search(haystack, needle) >= 0;
		}

		return ret;
	}, {
		multiValued: true
	}),

	/**
	 * Case insensitive search
	 */
	search: $.extend((haystack, needle) => {
		haystack = str(haystack);
		needle = str(needle);
		return haystack && needle? haystack.toLowerCase().indexOf(needle.toLowerCase()) : -1;
	}, {
		multiValued: true,
	}),

	starts: $.extend((haystack, needle) => _.search(str(haystack), str(needle)) === 0, {
		multiValued: true,
	}),

	ends: $.extend((haystack, needle) => {
		[haystack, needle] = [str(haystack), str(needle)];

		var i = _.search(haystack, needle);
		return  i > -1 && i === haystack.length - needle.length;
	}, {
		multiValued: true,
	}),

	join: function(array, glue) {
		return Mavo.toArray(array).filter(a => !empty(a)).join(str(glue));
	},

	idify: $.extend(readable => {
		return str(readable)
			.normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Convert accented letters to ASCII
			.replace(/[^\w\s-]/g, "") // Remove remaining non-ASCII characters
			.trim().replace(/\s+/g, "-") // Convert whitespace to hyphens
			.toLowerCase();
	}, {
		multiValued: true
	}),

	// Convert an identifier to readable text that can be used as a label
	readable: $.extend(identifier => {
		// Is it camelCase?
		return str(identifier)
				.replace(/([a-z])([A-Z])(?=[a-z])/g, ($0, $1, $2) => $1 + " " + $2.toLowerCase()) // camelCase?
				.replace(/([a-z0-9])[_\/-](?=[a-z0-9])/g, "$1 ") // Hyphen-separated / Underscore_separated?
				.replace(/^[a-z]/, $0 => $0.toUpperCase()); // Capitalize
	}, {
		multiValued: true
	}),

	uppercase: $.extend(text => str(text).toUpperCase(), {
		multiValued: true
	}),
	lowercase: $.extend(text => str(text).toLowerCase(), {
		multiValued: true
	}),

	from: $.extend((haystack, needle) => _.between(haystack, needle), {
		multiValued: true,
	}),

	from_last: $.extend((haystack, needle) => _.between(haystack, needle, "", true), {
		multiValued: true,
	}),

	fromlast: $u.deprecatedFunction("from_last", "fromlast"),

	to: $.extend((haystack, needle) => _.between(haystack, "", needle), {
		multiValued: true,
	}),

	to_first: $.extend((haystack, needle) => _.between(haystack, "", needle, true), {
		multiValued: true,
	}),

	tofirst: $u.deprecatedFunction("to_first", "tofirst"),

	between: $.extend((haystack, from, to, tight) => {
		[haystack, from, to] = [str(haystack), str(from), str(to)];

		let fromIndex = from? haystack[tight? "lastIndexOf" : "indexOf"](from) : 0;
		let toIndex = to? haystack[tight? "indexOf" : "lastIndexOf"](to) : haystack.length;

		if (fromIndex === -1 || toIndex === -1) {
			return "";
		}

		if (tight && toIndex <= fromIndex){
			return haystack.slice(toIndex + to.length, fromIndex);
		}

		return haystack.slice(fromIndex + from.length, toIndex);
	}, {
		multiValued: true
	}),

	phrase: $.extend(function(id, vars, lang) {
		if (arguments.length === 2 && $.type(vars) === "string") {
			[lang, vars] = [vars];
		}

		let locale = lang? Mavo.Locale.get(lang) : (this?.[Mavo.mavo]?.locale ?? Mavo.Locale.default);

		return locale.phrase(id, vars);
	}, {
		needsContext: true
	}),

	filename: $.extend(url => new URL(str(url), Mavo.base).pathname.match(/[^/]+?$/)?.[0], {
		multiValued: true
	}),

	json: data => Mavo.safeToJSON(data),

	split: $.extend((text, separator = /\s+/) => {
		if (!text) {
			return [];
		}

		text = str(text);

		return text.split(separator);
	}, {
		multiValued: true
	}),

	// Log to the console and return
	log: (...args) => {
		console.log(...args.map(val));
		return args[0];
	},

	// Other special variables (some updated via events)
	$mouse: {x: 0, y: 0},

	get $hash() {
		return location.hash.slice(1);
	},

	get $alt() {
		return _.$evt? _.$evt.altKey : false;
	},

	get $ctrl() {
		return _.$evt? _.$evt.ctrlKey : false;
	},

	get $shift() {
		return _.$evt? _.$evt.shiftKey : false;
	},

	get $cmd() {
		return _.$evt? _.$evt[Mavo.superKey] : false;
	},

	// "Private" helpers
	util: $u
};

/**
 * After plugins are loaded, enable
 * multi-valued arguments of Mavo and Math functions
 */
Mavo.ready.then(() => {
	Object.getOwnPropertyNames(Mavo.Functions).forEach(property => {
		var newCallback = $u.postProcess(Mavo.Functions[property]);

		if (newCallback) {
			Mavo.Functions[property] = newCallback;
		}
	});

	// Deal with Math functions that have 1 argument
	Object.getOwnPropertyNames(Math).forEach(property => {
		if (Math[property].length === 1 && !Mavo.Functions.hasOwnProperty(property)) {
			Mavo.Functions[property] = operand => Mavo.Script.unaryOperation(operand, operand => Math[property](operand));
		}
	});
});

/**
 * Private helper methods
 */

// Convert argument to string
function str(str = "") {
	str = val(str);
	return !str && str !== 0? "" : str + "";
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

(function($, val, _, $u = _.util) {

var s = {seconds: 1, minutes: 60};
s.hours  = s.minutes * 60;
s.days   = s.hours   * 24;
s.weeks  = s.days    * 7;
s.months = s.days    * 30.4368;
s.years  = s.weeks   * 52;

var numeric = {
	year: d => d.getFullYear(),
	month: d => d.getMonth() + 1,
	day: d => d.getDate(),
	weekday: d => d.getDay() || 7,
	hour: d => d.getHours(),
	minute: d => d.getMinutes(),
	second: d => d.getSeconds(),
	ms: d => d.getMilliseconds()
};

function isPrecision (precision) {
	if (!precision) {
		return false;
	}

	if (precision == "ms") {
		return true;
	}

	let singular = precision.replace(/s$/, "");
	let plural = precision.replace(/s?$/, "s");

	return singular in s || plural in s;
}

function parsePrecision(precision) {
	precision = precision?.trim() || "";
	let keys = Object.keys(s).reverse();
	let ret = {};

	do {
		p = keys.shift();
		ret[p] = true;
	} while(!RegExp(p + "?").test(precision) && keys.length > 0);

	if (precision == "ms") {
		ret.ms = true;
	}

	return ret;
}

$.extend(_, {
	get $now() {
		return new Date();
	},

	$startup: new Date(), // Like $now, but doesn't update

	get $today() {
		return _.date(new Date());
	},

	year: $.extend(function() {
		return $u.dateComponent("year", ...arguments);
	}, {multiValued: true}),

	month: $.extend(function() {
		return $u.dateComponent("month", ...arguments);
	}, {multiValued: true}),

	week: () => s.weeks * 1000,

	day: $.extend(function() {
		return $u.dateComponent("day", ...arguments);
	}, {multiValued: true}),

	weekday: $.extend(function() {
		return $u.dateComponent("weekday", ...arguments);
	}, {multiValued: true}),

	hour: $.extend(function() {
		return $u.dateComponent("hour", ...arguments);
	}, {multiValued: true}),

	minute: $.extend(function() {
		return $u.dateComponent("minute", ...arguments);
	}, {multiValued: true}),

	second: $.extend(function() {
		return $u.dateComponent("second", ...arguments);
	}, {multiValued: true}),

	ms: $.extend(function() {
		return $u.dateComponent("ms", ...arguments);
	}, {multiValued: true}),

	// Return an ISO date & time string
	datetime: $.extend((date, time, precision) => {
		date = $u.date(date);

		if (!date) {
			return "";
		}

		let separateTime;
		if (time !== undefined) {
			if (isPrecision(time)) {
				[time, precision] = [, time];
			}
			else {
				separateTime = true;
			}
		}

		precision ??= "minutes";
		let parts = parsePrecision(precision);
		let ret = _.date(date, precision);

		if (!parts.hours) {
			return ret; // No time
		}

		if (separateTime) {
			// If time is provided separately, and it's empty, we just return a date
			ret += Mavo.value(time) ? `T${ _.time(time, precision) }` : "";
		}
		else {
			ret += `T${_.time(date, precision)}`;
		}

		return ret;
	}, {multiValued: true}),

	// Return an ISO date
	date: $.extend((date, precision = "days") => {
		date = $u.date(date);

		if (!date) {
			return "";
		}

		let parts = parsePrecision(precision);
		let ret = [];

		if (parts.years) {
			ret.push(_.year(date));
		}

		if (parts.months) {
			ret.push(_.month(date, "00"));
		}

		if (parts.days) {
			ret.push(_.day(date, "00"));
		}

		return ret.join("-");
	}, {multiValued: true}),

	// Return an ISO time
	time: $.extend((date, precision = "minutes") => {
		date = $u.date(date);

		if (!date) {
			return "";
		}

		let parts = parsePrecision(precision);
		let ret = "";

		if (parts.hours) {
			ret += _.hour(date, "00") + ":" + (parts.minutes? _.minute(date, "00") : "00");

			if (parts.seconds) {
				ret += ":" + _.second(date, "00");

				if (parts.ms) {
					ret += "." + _.ms(date, "000");
				}
			}
		}

		return ret;
	}, {multiValued: true}),

	readable_datetime: $.extend((date, ...options) => {
		options = options.map(o => typeof o === "string" || o instanceof String? {precision: o} : o);
		options = Object.assign({}, ...options);

		let parts = parsePrecision(options.precision);
		let monthFormat = options.month || parts.days? "shortname" : "long";
		let ret = [];

		if (parts.days) {
			ret.push(_.day(date));
		}

		if (parts.months) {
			ret.push(_.month(date, monthFormat));
		}

		if (parts.years) {
			ret.push(_.year(date));
		}

		if (parts.hours) {
			ret.push(_.time(date, options.precision));
		}

		return ret.join(" ");
	}, {multiValued: true}),

	localTimezone: -(new Date()).getTimezoneOffset(),
});

_.msTo = (what, ms) => Math.floor(Math.abs(ms) / (s[what] * 1000)) || 0;

for (let unit in s) {
	_[unit] = $.extend(function(ms) {
		if (arguments.length === 0) {
			return s[unit] * 1000;
		}

		return _.msTo(unit, ms);
	}, {multiValued: true});
}

_.duration = $.extend(function (ms, terms) {
	// TODO unify code for specific unit with code for auto units to reduce repetition
	// TODO allow multiple units, e.g. ["days", "hours"]
	// TODO allow combining term # and units, e.g. start: days, terms: 2
	
	let negativeMultiplier = ms < 0 ? -1 : 1; // a multiplier to convert result to negative if needed
	ms = Math.abs(ms); // negative works same way as positive does, just adding negative sign in the front

	if (terms && isNaN(terms)) {
		// Specific term specified
		let unitSingular = terms != "ms" ? terms.replace(/s?$/, "") : terms;
		let unitPlural = terms.replace(/s?$/, "s");

		if (!(unitPlural in s)) {
			throw new TypeError(`Unknown duration unit ${terms}. Please use one of ${ Object.keys(s).join(", ") }`);
		}

		let n = Math.floor(ms / s[unitPlural] / 1000);
		let unitProperPlurality = n === 1 && unitPlural !== "ms" ? unitSingular : unitPlural;
		return negativeMultiplier * n + " " + _.phrase.call(this, unitProperPlurality);
	}
	else if (ms == 0 || terms === undefined) {
		terms = 1;
	}

	let timeLeft = ms;
	let ret = [];

	if (ms == 0) {
		ret = ["0 ms"];
	}
	else {
		let units = [...Object.keys(s).reverse(), "ms"];

		for (let i=0, unit; unit = units[i]; i++) {
			// get largest value of time unit for the remaining
			// time to account for
			let unitMs = unit in s? s[unit] * 1000 : 1; // number of ms in 1 unit
			let unitValue = Math.floor(timeLeft / unitMs); // quotient
			timeLeft = timeLeft % unitMs; // remainder

			if (unitValue > 0 && ret.length < terms) {
				let unitProperPlurality = unitValue === 1 && unit !== "ms" ? unit.slice(0, -1) : unit;
				ret.push(negativeMultiplier * unitValue + " " + _.phrase.call(this, unitProperPlurality));
			}
			else if (ret.length > 0) {
				// Discard any further terms to avoid non-continous terms like e.g. "1 month, 10 ms"
				break;
			}
		}
	}

	return arguments.length === 1 ? ret[0] : ret;
}, {
	needsContext: true,
	multiValued: true
});

$.extend(_.util, {
	fixDateString: function(date) {
		date = date.trim();

		var hasDate = /^\d{4}-\d{2}(-\d{2})?/.test(date);
		var hasTime = date.indexOf(":") > -1;

		if (!hasDate && !hasTime) {
			return null;
		}

		// Fix up time format
		if (!hasDate) {
			// No date, add today’s
			date = _.$today + " " + date;
		}
		else {
			// Only year-month, add day
			date = date.replace(/^(\d{4}-\d{2})(?!-\d{2})/, "$1-01");
		}

		if (!hasTime) {
			// Add a time if one doesn't exist
			date += "T00:00:00";
		}
		else {
			// Make sure time starts with T, due to Safari bug
			date = date.replace(/\-(\d{2})\s+(?=\d{2}:)/, "-$1T");
		}

		// Remove all whitespace
		date = date.replace(/\s+/g, "");

		return date;
	},

	dateComponent: function(component, date, format, locale = Mavo.locale) {
		if (arguments.length === 1 && component + "s" in s) {
			return _[component + "s"]();
		}

		var dateO = $u.date(date);

		if (component === "year") {
			// Why +""? We don't want years to be formatted like 2,017!
			// Why the .match()? For incomplete dates, see #226
			date = date && date.match? date : date + "";
			var ret = dateO? dateO.getFullYear() + "" : (date.match(/\b[1-9]\d\d\b|\d+/) || [])[0];
		}

		if (!ret && !dateO) {
			return "";
		}

		var ret = ret || numeric[component](dateO);

		if (format) {
			if (/^0+$/.test(format)) {
				// Leading zeroes
				return (ret + "").padStart(format.length, "0").slice(-format.length);
			}
			else {
				format = {name: "long", shortname: "short"}[format] || format;
				ret = dateO.toLocaleString(locale, {[component]: format});
				ret = ret.replace(/\u200e/g, ""); // Stupid Edge bug

				return ret;
			}
		}

		return component === "year"? ret : +ret;
	},

	date: function(date) {
		date = val(date);

		if (!date) {
			return null;
		}

		var object = new Date(date);

		// Either arg is not string or is exactly the same as a re-serialization of it as a date
		if ($.type(date) !== "string" || !isNaN(object) && (object + "" == date)) {
			return object;
		}

		date = $u.fixDateString(date);

		if (date === null) {
			return null;
		}

		var timezone = date.match(/[+-]\d{2}:?\d{2}|Z$/)?.[0];

		if (timezone) {
			// parse as ISO format
			date = new Date(date);
		}
		else {
			// construct date in local timezone
			var fields = date.match(/\d+/g);

			date = new Date(
				// year, month, date,
				fields[0], (fields[1] || 1) - 1, fields[2] || 1,
				// hours, minutes, seconds, milliseconds,
				fields[3] || 0, fields[4] || 0, fields[5] || 0, fields[6] || 0
			);
		}

		return isNaN(date)? null : date;
	}
});

})(Bliss, Mavo.value, Mavo.Functions);

(function($, val, $u) {

var _ = Mavo.Script = {
	$fn: self.Proxy? new Proxy({[Symbol.unscopables]: {undefined: true}}, {
		get: (data, property) => {
			var propertyL = property?.toLowerCase?.() ?? property, ret;

			// Is this a data action function?
			if (propertyL in Mavo.Actions.Functions) {
				if (Mavo.Actions.running) {
					ret = Mavo.Actions.Functions[propertyL];
				}
				else {
					ret = Mavo.Actions.nope;
				}
			}

			// Is this a Mavo function?
			if (ret === undefined) {
				if (propertyL in Mavo.Functions) {
					ret = Mavo.Functions[propertyL];
				}
				else {
					// Maybe it's a Math function?
					ret = Math[property] || Math[propertyL];
				}
			}

			return ret;
		},

		has: (data, property) => {
			var propertyL = property.toLowerCase();

			return propertyL in Mavo.Functions || propertyL in Mavo.Actions.Functions
				   || property in Math || propertyL in Math;
		}
	}) : Mavo.Functions,

	addUnaryOperator: function(name, o) {
		if (o.symbol) {
			// Build map of symbols to function names for easy rewriting
			Mavo.toArray(o.symbol).forEach(symbol => {
				_.unarySymbols[symbol] = name;
				jsep.addUnaryOp(symbol);
			});
		}

		return operand => _.unaryOperation(operand, operand => o.scalar(val(operand)));
	},

	unaryOperation: function(operand, scalar) {
		if (Array.isArray(operand)) {
			return operand.map(scalar);
		}
		else {
			return scalar(operand);
		}
	},

	binaryOperation: function(a, b, o = {}) {
		o.scalar = typeof o === "function" ? o : o.scalar;
		var result;

		if (Array.isArray(b)) {
			if (Array.isArray(a)) {
				result = [];
				var max = Math.max(a.length, b.length);
				var leftUnary = o.leftUnary || o.unary;
				var rightUnary = o.rightUnary || o.unary;
				var leftDefault = o.leftDefault === undefined ? o.default : o.leftDefault;
				var rightDefault = o.rightDefault === undefined ? o.default : o.rightDefault;

				for (let i = 0; i < max; i++) {
					if (o.comparison && (a[i] === undefined || b[i] === undefined)) {
						result[i] = o.default;
					}
					else if (a[i] === undefined) {
						result[i] = rightUnary ? rightUnary(b[i]) : o.scalar(leftDefault, b[i]);
					}
					else if (b[i] === undefined) {
						result[i] = leftUnary ? leftUnary(a[i]) : o.scalar(a[i], rightDefault);
					}
					else {
						result[i] = o.scalar(a[i], b[i]);
					}
				}
			}
			else {
				result = b.map(n => o.scalar(a, n));
			}
		}
		else if (Array.isArray(a)) {
			result = a.map(n => o.scalar(n, b));
		}
		else {
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
	addBinaryOperator: function(name, o) {
		if (o.symbol) {
			// Build map of symbols to function names for easy rewriting
			Mavo.toArray(o.symbol).forEach(symbol => {
				_.symbols[symbol] = name;

				if (o.precedence) {
					jsep.addBinaryOp(symbol, o.precedence);
				}
			});
		}

		o.default = o.default === undefined? 0 : o.default;

		return o.code || function(...operands) {
			if (operands.length === 1) {
				if (Array.isArray(operands[0])) {
					// Operand is an array of operands, expand it out
					operands = [...operands[0]];
				}
			}

			if (!o.raw) {
				operands = operands.map(val);
			}

			var prev = o.comparison ? true : operands[0], result;

			for (let i = 1; i < operands.length; i++) {
				let a = o.comparison? operands[i - 1] : prev;
				let b = operands[i];

				if (Array.isArray(b) && typeof o.default == "number") {
					b = $u.numbers(b);
				}

				var result = _.binaryOperation(a, b, o);

				if (o.comparison) {
					prev = _.binaryOperation(prev, result, _.operators["and"]);
				}
				else {
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

	getOperatorName: (op, unary) => _[unary? "unarySymbols" : "symbols"][op] || op,

	isComparisonOperator: (op) => {
		// decides if op, a string, is a comparison operator like < or <=
		if (op) {
			let operatorDefinition = _.operators[_.symbols[op]];
			return operatorDefinition && operatorDefinition.comparison;
		}
	},

	// Is this variable?
	// E.g. foo or foo.bar is not static whereas "foo" or bar() is
	isStatic: node => {
		if (node.type === "Identifier") {
			return false;
		}

		for (let property of _.childProperties) {
			if (node[property] && property !== "callee") {
				if (!_.isStatic(node[property])) {
					return false;
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
			scalar: a => !val(a)
		},
		"multiply": {
			scalar: (a, b) => a * b,
			default: 1,
			symbol: "*"
		},
		"divide": {
			scalar: (a, b) => a / b,
			rightUnary: b => b,
			default: 1,
			symbol: "/"
		},
		"addition": {
			scalar: (a, b) => {
				if (isNaN(a) || isNaN(b)) {
					// Handle dates
					var dateA = $u.date(a), dateB = $u.date(b);

					if (dateA || dateB) {
						return +dateA + +dateB;
					}
				}

				return +a + +b;
			},
			symbol: "+"
		},
		"plus": {
			scalar: a => +a,
			symbol: "+"
		},
		"subtract": {
			scalar: (a, b) => {
				if (isNaN(a) || isNaN(b)) {
					// Handle dates
					var dateA = $u.date(a), dateB = $u.date(b);

					if (dateA && dateB) {
						return dateA - dateB;
					}
				}

				return a - b;
			},
			symbol: "-"
		},
		"minus": {
			scalar: a => -a,
			symbol: "-"
		},
		"mod": {
			scalar: (a, b) => {
				var ret = a % b;
				ret += ret < 0? b : 0;
				return ret;
			},
			symbol: "mod",
			precedence: 10
		},
		"lte": {
			comparison: true,
			scalar: (a, b) => {
				[a, b] = _.getNumericalOperands(a, b);
				return a <= b;
			},
			default: false,
			symbol: "<="
		},
		"lt": {
			comparison: true,
			scalar: (a, b) => {
				[a, b] = _.getNumericalOperands(a, b);
				return a < b;
			},
			default: false,
			symbol: "<"
		},
		"gte": {
			comparison: true,
			scalar: (a, b) => {
				[a, b] = _.getNumericalOperands(a, b);
				return a >= b;
			},
			default: false,
			symbol: ">="
		},
		"gt": {
			comparison: true,
			scalar: (a, b) => {
				[a, b] = _.getNumericalOperands(a, b);
				return a > b;
			},
			default: false,
			symbol: ">"
		},
		"eq": {
			comparison: true,
			scalar: (a, b) => {
				return a == b || Mavo.safeToJSON(a) === Mavo.safeToJSON(b);
			},
			symbol: ["=", "=="],
			default: false,
			precedence: 7 // to match other comparison operators in jsep
		},
		"neq": {
			comparison: true,
			scalar: (a, b) => {
				return a != b && Mavo.safeToJSON(a) !== Mavo.safeToJSON(b);
			},
			symbol: ["!="],
			default: true,
			precedence: 7 // to match other comparison operators in jsep
		},
		"and": {
			scalar: (a, b) => a && b,
			default: false,
			symbol: ["&&", "and"],
			precedence: 2
		},
		"or": {
			scalar: (a, b) => a || b,
			default: false,
			symbol: ["||", "or"],
			precedence: 2
		},
		"concatenate": {
			symbol: "&",
			default: "",
			scalar: (a, b) => {
				a = Mavo.value(a) ?? "";
				b = Mavo.value(b) ?? "";

				return "" + a + b;
			},
			precedence: 10
		},
		"keyvalue": {
			symbol: ":",
			code: (...operands) => {
				var i = operands.length - 1;
				var value = operands[i];

				while (i--) {
					value = {[operands[i]]: value};
				}

				return value;
			},
			transformation: node => {
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
			code: (a, ...filters) => {
				for (let b of filters) {
					if (Array.isArray(a)) {
						if (Array.isArray(b)) {
							a = a.map((v, i) => val(b[i])? v : null);
						}
						else {
							b = val(b);

							if (typeof b === "boolean") {
								// foo where true/false should equal foo/null respectively
								a = b? a : a.map(v => null);
							}
							else {
								// foo where 5 should equal foo where foo = 5
								a = a.map(v => v == b? v : null);
							}
						}
					}
					else {
						a = val(b)? a : null;
					}
				}

				return a;
			},
			precedence: 1,
			postFlattenTransformation: node => {
				// Scope all identifiers (likely properties) in the where clause to the thing we're filtering from.
				// For example, assume you have a list of people and a list of cats, both with names and ages.
				// Without this, cat where age > 3 would return nonsensical results
				var object = node.arguments[0];

				for (let i=1; i<node.arguments.length; i++) {
					if (!_.isStatic(node.arguments[i])) {
						node.arguments[i] = Object.assign(_.parse("scope()"), {
							arguments: [
								object,
								node.arguments[i]
							]
						});
					}
				}
			}
		},
		"range": {
			symbol: "..",
			scalar: (a, b) => Mavo.Functions.range(a, b),
			precedence: 2,
			export: false
		},
		"has": {
			symbol: "in",
			code: function(needle, ...haystacks) {
				var ret;
				haystacks.map(b => {
					if (Array.isArray(b)) {
						var op =  a => {
							// If object, comparison will fail because references. Must serialize first.
							var fn = $.type(val(a)) === "object"? Mavo.safeToJSON : val;

							return b.map(fn).indexOf(fn(a)) > -1;
						};
					}
					else if ($.type(b) === "object") {
						// Mimic JS' in operator
						var op = a => Mavo.in(val(a), b);
					}
					else {
						var op = a => Mavo.Functions.eq(a, b);
					}

					var result = Mavo.Script.unaryOperation(needle, op);
					ret = ret === undefined? result : Mavo.Functions.and(result, ret);
				});
				return ret;
			},
			precedence: 3
		},
		"group_by": {
			symbol: "by",
			code: (array, key) => {
				array = Mavo.toArray(array);
				key = Mavo.toArray(key);
				var property = key[Mavo.as] || key[0]?.[Mavo.toNode]?.property;
				var groups = new Mavo.BucketMap({arrays: true});
				var ret = [];
				ret[Mavo.groupedBy] = true;

				array.forEach((item, i) => {
					let k = i < key.length ? Mavo.value(key[i]) : null;
					groups.set(k, item);
				});

				if (Mavo.in(Mavo.route, array)) {
					ret[Mavo.route] = Object.assign({}, array[Mavo.route]);
				}

				groups.forEach((items, value) => {
					var obj = {
						$value: value,
						[property || "$value"]: value,
						$items: items
					};

					if (Mavo.in(Mavo.route, array)) {
						items[Mavo.route] = obj[Mavo.route] = Object.assign({}, array[Mavo.route]);
						obj[Mavo.route] = $.each(items[Mavo.route], (p, v) => new Set(["$items"]));
					}

					ret.push(obj);
				});

				return Mavo.Data.proxify(ret);
			},
			precedence: 2
		},
		"groupby": {
			code: $u.deprecatedFunction("group_by", "groupby"),
			precedence: 2
		},
		"as": {
			symbol: "as",
			code: (property, name) => {
				if (property !== undefined && $.type(property) === "array" && name !== undefined) {
					var ret = property.slice();

					if (!Array.isArray(name) && name?.[Mavo.toNode]?.property !== undefined) {
						ret[Mavo.as] = name?.[Mavo.toNode]?.property;
						return ret;
					}

					if ($.type(name) === "string") {
						ret[Mavo.as] = name;
						return ret;
					}

					if (name[0]?.[Mavo.toNode]?.property !== undefined) {
						ret[Mavo.as] = name[0]?.[Mavo.toNode]?.property;
						return ret;
					}

					return property;
				}
				return property;
			},
			precedence: 3
		},
	},

	getNumericalOperands: function(a, b) {
		if (isNaN(a) || isNaN(b)) {
			// Try comparing as dates
			var da = $u.date(a), db = $u.date(b);

			if (da && db) {
				// Both valid dates
				return [da, db];
			}
		}

		return [a, b];
	},

	childProperties: [
		"arguments", "callee", // CallExpression
		"left", "right", // BinaryExpression, LogicalExpression
		"argument", // UnaryExpression
		"elements", // ArrayExpression
		"test", "consequent", "alternate", // ConditionalExpression
		"object",  "property", // MemberExpression
		"body"
	],

	/**
	 * Recursively execute a callback on this node and all its children
	 * Caveat: For CallExpression arguments, it will call callback with an array
	 * callback needs to take care of iterating over the array
	 */
	walk: function(node, callback, o = {}, property, parent) {
		if (!o.type || node.type === o.type) {
			var ret = callback(node, property, parent);
		}

		if (!o.ignore || o.ignore.indexOf(node.type) === -1) {
			if (Array.isArray(node)) {
				for (let n of node) {
					_.walk(n, callback, o, property, node);
				}
			}
			else {
				_.childProperties.forEach(property => {
					if (node[property]) {
						_.walk(node[property], callback, o, property, node);
					}
				});
			}
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
		"BinaryExpression": node => `${_.serialize(node.left, node)} ${node.operator} ${_.serialize(node.right, node)}`,
		"UnaryExpression": node => `${node.operator}${_.serialize(node.argument, node)}`,
		"CallExpression": node => {
			var callee = node.callee;
			let root = node.callee;
			let parent = node;
			let prop = "callee";

			// Find left-most member
			while (root.type === "MemberExpression") {
				parent = root;
				root = root.object;
				prop = "object";
			}

			if (node.callee.type === "MemberExpression") {
				if (node.callee.property.type === "Identifier" && node.callee.property.name === "call") {
					callee = node.callee.object;
				}
			}

			if (root.type === "Identifier") {
				// Clashes with native prototype methods? If so, look first in Function trap
				var name = root.name;

				if (name === "scope") {
					return _.serializeScopeCall(node.arguments);
				}
				else if (name in Mavo.Script.$fn) {
					parent[prop] = {
						type: "MemberExpression",
						computed: false,
						object: {type: "Identifier", name: "$fn"},
						property: root
					};
				}
			}

			var nameSerialized = _.serialize(node.callee, node);
			var argsSerialized = node.arguments.map(n => _.serialize(n, node));
			return `${nameSerialized}(${argsSerialized.join(", ")})`;
		},
		"ConditionalExpression": node => `${_.serialize(node.test, node)}? ${_.serialize(node.consequent, node)} : ${_.serialize(node.alternate, node)}`,
		"MemberExpression": (node, parent) => {
			let n = node, pn, callee;

			do {
				if (n.type === "CallExpression" && n.callee === pn) {
					break;
				}
				pn = n;
			} while (n = n.parent);

			if (n) { // Use plain serialization for foo.bar.baz()
				var property = node.computed? `[${_.serialize(node.property, node)}]` : `.${node.property.name}`;
				return `${_.serialize(node.object, node)}${property}`;
			}

			n = node;
			let properties = [], object, objectParent;

			while (n.type === "MemberExpression") {
				let serialized = n.computed? _.serialize(n.property, n) : `"${n.property.name}"`;
				properties.push(serialized);
				objectParent = n;
				object = n = n.object;
			}

			return `$fn.get(${_.serialize(object, objectParent)}, ${properties.reverse().join(", ")})`;
		},
		"ArrayExpression": node => `[${node.elements.map(n => _.serialize(n, node)).join(", ")}]`,
		"Literal": node => {
			let quote = node.raw[0];

			if (quote === "'" || quote === '"') {
				let content = node.raw.slice(1, -1);
				content = content.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
				// jsep does not properly escape quotes, see https://github.com/EricSmekens/jsep/issues/192
				// let regex = quote === '"'? /(?<!\\)"/g : /(?<!\\)'/g
				content = content.replaceAll(quote, "\\" + quote);
				return quote + content + quote;
			}

			return node.raw;
		},
		"Identifier": node => node.name,
		"ThisExpression": node => "this",
		"Compound": node => node.body.map(n => _.serialize(n, node)).join(", ")
	},

	/**
	 * These are run before the serializers and transform the expression to support MavoScript
	 */
	transformations: {
		"BinaryExpression": node => {
			let name = _.getOperatorName(node.operator);
			let def = _.operators[name];

			// Operator-specific transformations
			def.transformation?.(node);

			var nodeLeft = node;
			var ret = {
				type: "CallExpression",
				arguments: [],
				callee: {type: "Identifier", name}
			};

			if (def.comparison) {
				// Flatten comparison operator calls. If all comparison
				// operators are the same, flatten into one call (to maintain
				// simplicity of output):
				// 3 < 4 < 5 becomes lt(3, 4, 5).
				// Otherwise, assemble an argument list like so:
				// 3 < 4 = 5 becomes compare(3, "lt", 4, "eq", 5).

				// Create list of {comparison, operand} objects
				let comparisonOperands = [];
				do {
					let operatorName = _.getOperatorName(nodeLeft.operator); // e.g. "lt"
					comparisonOperands.unshift({
						comparison: operatorName,
						operand: nodeLeft.right
					});
					nodeLeft = nodeLeft.left;
				} while (def.flatten !== false && _.isComparisonOperator(nodeLeft.operator));

				// Determine if all comparison operators are the same
				let comparisonsHeterogeneous = false;
				for (let i = 0; i < comparisonOperands.length - 1; i++) {
					if (comparisonOperands[i].comparison != comparisonOperands[i+1].comparison) {
						comparisonsHeterogeneous = true;
						break;
					}
				}

				// Assemble final callee and argument list
				ret.arguments.push(nodeLeft); // first operand
				if (comparisonsHeterogeneous) {
					ret.callee.name = "compare";
					comparisonOperands.forEach(co => {
						ret.arguments.push({
							type: "Literal",
							value: co.comparison,
							raw: `"${co.comparison}"`,
						});
						ret.arguments.push(co.operand);
					});
				}
				else {
					comparisonOperands.forEach(co => {
						ret.arguments.push(co.operand);
					});
				}
			}
			else {
				// Flatten same operator calls
				do {
					ret.arguments.unshift(nodeLeft.right);
					nodeLeft = nodeLeft.left;
				} while (def.flatten !== false && nodeLeft.right && _.getOperatorName(nodeLeft.operator) === name);

				ret.arguments.unshift(nodeLeft);
			}

			// Operator-specific transformations
			def.postFlattenTransformation?.(ret);

			return ret;
		},
		"UnaryExpression": node => {
			var name = _.getOperatorName(node.operator, true);

			if (name) {
				return {
					type: "CallExpression",
					arguments: [node.argument],
					callee: {type: "Identifier", name}
				};
			}
		},
		"CallExpression": node => {
			if (node.callee.type == "Identifier") {
				if (node.callee.name == "if") {
					node.callee.name = "iff";

					// Traverse data actions inside if() and rewrite them to their *if() counterpart
					var condition = node.arguments[0];

					for (let i=1; i<node.arguments.length; i++) {
						if (i == 2) {
							// Else, negate condition
							condition = _.parse("not()");
							condition.arguments.push(node.arguments[0]);
						}

						_.walk(node.arguments[i], n => {
							var name = n.callee.name;

							if (Mavo.Actions.Functions.hasOwnProperty(name) // is a data action
							    && !/if$/.test(name) // and not already the *if() version of itself
							) {
								n.callee.name += "if";

								// Add condition as first argument of *if() function
								n.arguments.unshift(condition);
							}
						}, {type: "CallExpression"});
					}
				}
				else if (node.callee.name == "delete") {
					node.callee.name = "clear";
				}
				else {
					var def = Mavo.Functions[node.callee.name];

					if (def && def.needsContext) {
						// Rewrite to funcName.call($this, ...args)
						node.callee = {
							type: "MemberExpression",
							computed: false,
							object: node.callee,
							property: {type: "Identifier", name: "call"}
						};
						node.arguments.unshift({type: "Identifier", name: "$this"});
					}
				}
			}
		},
		"ThisExpression": node => {
			return {type: "Identifier", name: "$this"};
		}
	},

	closest (node, type) {
		let n = node;

		do {
			if (n.type === type) {
				return n;
			}
		} while (n = n.parent);

		return null;
	},

	serialize: (node, parent) => {
		if (typeof node === "string") {
			return node; // already serialized
		}

		if (parent) {
			node.parent = parent;
		}

		var ret = _.transformations[node.type]?.(node, parent);

		if (typeof ret == "object" && ret?.type) {
			node = ret;
		}
		else if (ret !== undefined) {
			return ret;
		}

		if (!node.type || !_.serializers[node.type]) {
			throw new TypeError("Cannot understand this expression at all 😔");
		}

		return _.serializers[node.type](node, parent);
	},

	rewrite: function(code, o) {
		let ast = _.parse(code);

		if (o) {
			o.ast = ast;
		}

		return _.serialize(ast);
	},

	compile: function(code, o) {
		if (!/\S/.test(code)) {
			// If code contains only whitespace, including in particular if
			// code is just the empty string, treat it as an expression that
			// evaluates to an empty string. This is consistent with
			// interpreting bare words as their corresponding strings.
			return () => "";
		}

		code = _.rewrite(code, o);

		code = `with (Mavo.Data.stub)
	with (data || {}) {
		let $fn = Mavo.Script.$fn;
		return (${code});
	}`;

		if (o?.actions) {
			// Yes this is a horrible, horrible hack and I’m truly ashamed.
			// If you understand the reasons and can think of a better way, be my guest!
			code = `
Mavo.Actions._running = Mavo.Actions.running;
Mavo.Actions.running = true;
${code}
Mavo.Actions.running = Mavo.Actions._running;`;
		}

		return new Function("data", code);
	},

	parse: self.jsep,

	// scope() rewriting
	serializeScopeCall: (args) => {
		var withCode = `with (Mavo.Script.subScope(scope, $this) || {}) { return (${_.serialize(args[1])}); }`;
		return `(function() {
	var scope = ${_.serialize(args[0])};
	if (Array.isArray(scope)) {
		return scope.map(function(scope) {
			${withCode}
		});
	}

	${withCode}
})()`;
	},

	// This is used for scope() rewriting, to support $this passing through
	subScope: (proxy, $this) => {
		var unscopables = Object.keys($this).reduce((o, k) => {
			o[k] = true;
			return o;
		}, {$this: true});

		if (!proxy || typeof proxy !== "object") {
			return proxy;
		}

		return new Proxy(proxy, {
			get: (t, property, r) => {
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

for (let name in _.operators) {
	let details = _.operators[name];

	if (details.scalar?.length < 2) {
		var ret = _.addUnaryOperator(name, details);
	}
	else {
		var ret = _.addBinaryOperator(name, details);
	}

	details.code = details.code || ret;

	if (ret && details.export !== false) {
		Mavo.Functions[name] = ret;
	}
}

// Takes a list of arguments that consist of interleaved operands and strings
// representing comparison operations, and returns the result of evaluating the
// chained comparison.
// e.g. compare(3, "lt", 4, "lt", 5) means 3 < 4 < 5, or (3 < 4) && (4 < 5)
Mavo.Functions.compare = function(...operands) {
	let result = true;

	for (let i = 2; i < operands.length; i += 2) {
		let a = operands[i - 2];
		let op = operands[i - 1];
		let b = operands[i];
		let term = _.binaryOperation(a, b, Mavo.Script.operators[op]);
		result = _.binaryOperation(result, term, Mavo.Script.operators["and"]);
	}

	return result;
};

})(Bliss, Mavo.value, Mavo.Functions.util);

(function($, $$) {

Mavo.attributes.push("mv-action");

let _ = Mavo.Actions = {
	listener: evt => {
		let tag = evt.type === "submit"? "form" : ":not(form)";
		let element = evt.target.closest(tag + "[mv-action]");

		if (!element) {
			return; // Not an action
		}

		let node = Mavo.Node.get(element);

		if (node && node.editing && node.modes !== "edit") {
			// If this is a node, and being edited (and supports other modes), we don't want to have the action interfering.
			return;
		}

		if (evt.type === "submit") {
			evt.preventDefault();
		}

		if (element) {
			_.run(element.getAttribute("mv-action"), element, evt);
		}
	},

	run: (code, element, evt) => {
		if (code) {
			let node = Mavo.Node.getClosest(element);

			if (node) {
				let expression = new Mavo.Expression(code, {actions: true});

				let previousEvt = Mavo.Functions.$evt;
				Mavo.Functions.$evt = evt;

				let ret = expression.eval(node.getLiveData());

				Mavo.Functions.$evt = previousEvt;

				return ret;
			}
		}
	},

	getNodes: ref => {
		let node = _.getNode(ref);

		if (node) {
			return [node];
		}

		return Mavo.toArray(ref).map(n => _.getNode(n)).filter(n => n !== undefined);
	},

	getNode: node => {
		if (node instanceof Mavo.Node) {
			return node;
		}
		else if (node?.[Mavo.toNode]) {
			return node[Mavo.toNode];
		}
	},

	getCollection: ref => {
		let collection = _.getNode(ref);

		if (collection instanceof Mavo.Collection) {
			return collection;
		}

		// ref is not a collection. Either it's an item or we don't have a collection
		return collection?.collection ?? null;
	},

	// Function to run instead of actions if actions are called outside mv-action
	nope: () => {
		let actions = Object.keys(_.Functions).map(name => `${name}()`);
		Mavo.warn(`Mavo actions (${actions}) can only be used in the mv-action attribute.`);
	},

	Functions: {
		/**
		 * @param data (Optional) data of new item(s)
		 * @param ref Collection to add to
		 * @param index {Number} index of new item(s).
		 * @returns Newly added item(s)
		 */
		add: Object.assign(function(data, ref, index) {
			let args = [...arguments], collection;

			if (arguments.length < 3) {
				if (arguments.length <= 1) {
					// add(ref) signature used
					[data, ref] = [undefined, data];
				}
				else if (arguments.length === 2) {
					// Is it (data, ref) or (ref, index)?
					// ref might be a number, if collection of numbers!
					collection = _.getCollection(ref);

					if (!collection) {
						// No collection from ref, must be (ref, index)
						collection = _.getCollection(data);

						if (collection) {
							// Yup, it's (ref, index)
							[data, ref, index] = [undefined, data, ref];
						}
					}
				}
			}

			if (!ref) {
				return;
			}

			collection = collection || _.getCollection(ref);

			if (!collection) {
				collection = _.getCollection(this);

				if (collection) {
					// The collection is the context, re-interpret arguments
					[data, index] = args;
				}
			}

			if (!collection) {
				Mavo.warn("No collection or collection item provided to add().", {once: false});
				return data;
			}

			if (index === undefined) {
				// If there is no index and item provided instead of collection,
				// get index from collection item
				let node = _.getNode(ref);

				if (node && node.collection === collection) {
					index = node.index;
				}
			}

			return (Array.isArray(data)? data : [data]).map(datum => {
				let item = collection.add(undefined, index);

				if (datum !== undefined) {
					item.render(datum);
				}

				if (collection.editing) {
					collection.editItem(item);
				}

				return item.getLiveData();
			});
		}, {needsContext: true}),

		/**
		 * @param from {Mavo.Node|Array<Mavo.Node>} one or more items to move
		 * @param to where to move to, item or collection. Optional
		 * @param index {Number} index. Optional
		 * @returns Moved item(s)
		 */
		move: (from, to, index) => {
			if (!from || to === undefined) {
				return;
			}

			let toNode = _.getNode(to);

			if ($.type(to) == "number" && !(toNode?.collection)) {
				// If to is a number and not a collection item, it's an index
				[index, to] = [to];
				toNode = undefined;
			}

			let fromNodes = Mavo.toArray(from).map(_.getNode).filter(n => n?.closestCollection);
			let collection = (toNode || fromNodes[0]).closestCollection;

			if (!fromNodes.length) {
				if (collection) {
					Mavo.warn("First parameter of move() was not a collection or collection item, using add() instead.", {once: false});
					return _.Functions.add(from, collection, index);
				}
				else {
					Mavo.warn("You need to provide at least one collection or collection item for move() to have something to do.", {once: false});
					return from;
				}
			}

			let ret = _.Functions.add(from, collection, index);
			Mavo.Collection.delete(fromNodes, {silent: true});
			return ret;
		},

		/**
		 * @param ref Items to delete
		 */
		clear: (...ref) => {
			if (!ref.length || !ref[0]) {
				return;
			}

			let nodes = _.getNodes(ref.flat());
			let itemsToDelete = [];

			nodes.forEach(node => {
				if (!node) {
					return;
				}

				if (node instanceof Mavo.Collection) {
					// Clear collection
					itemsToDelete.push(...node.children);
				}
				else if (node.collection) {
					// Collection item, delete
					itemsToDelete.push(node);
				}
				else {
					// Ordinary node, just clear its data
					node.walk(n => {
						if (n instanceof Mavo.Primitive) {
							n.value = null;
						}
						else if (n !== node) {
							_.Functions.clear(n);
						}
					});
				}
			});

			Mavo.Collection.delete(itemsToDelete);

			return nodes.map(n => n.getLiveData());
		},

		clearif: (condition, ...targets) => {
			targets = targets.map(t => Mavo.Functions.iff(condition, t));
			return _.Functions.clear(...targets);
		},

		/**
		 * Set node(s) to value(s)
		 * If ref is a single node or a collection, render values on it
		 * If ref is multiple nodes, set it to corresponding value
		 * If ref is multiple nodes and values is not an array, set all nodes to values
		 */
		set: (ref, values) => {
			if (!ref) {
				return;
			}

			let node = _.getNode(ref);

			if (node) {
				// Single node, render values on it
				node.render(values);
			}
			else {
				let wasArray = Array.isArray(ref);
				let nodes = _.getNodes(ref);

				if (!nodes.length) {
					Mavo.warn(`The first parameter of set() needs to be one or more existing properties, ${Mavo.safeToJSON(ref)} is not.`);
				}
				else {
					Mavo.Script.binaryOperation(wasArray? nodes : nodes[0], values, {
						scalar: (node, value) => {
							return node ? node.render(value) : null;
						}
					});
				}
			}

			return values;
		}
	}
};

// Create *if() versions of data actions
for (let name in _.Functions) {
	let nameif = name + "if";

	if (!(nameif in _.Functions)) {
		_.Functions[nameif] = (condition, target, ...rest) => {
			target = Mavo.Functions.iff(condition, target);
			return Mavo.value(condition)? _.Functions[name](target, ...rest) : null;
		};
	}
}

_.Functions.deleteif = _.Functions.clearif;

})(Bliss, Bliss.$);

(function($, $$) {

var _ = Mavo.Data = $.Class(class Data {
	constructor(node, data) {
		this.node = node;

		if (data !== undefined) {
			this.data = data;
		}
	}

	get parent() {
		var parent = this.node.parent;
		return parent?.liveData ?? null;
	}

	get collection() {
		return this.node.collection;
	}

	get key() {
		return this._key = this.collection? this.node.index : this.node.property;
	}

	proxify() {
		return _.proxify(this.data);
	}

	update() {
		if (this.node instanceof Mavo.Collection || this.node instanceof Mavo.ImplicitCollection) {
			// TODO eventually we should do more granular updates than this O(N) stuff
			this.data.length = 0;

			for (var i=0; i<this.node.children.length; i++) {
				this.data[i] = this.node.children[i].liveData.data;
			}

			if (this.node instanceof Mavo.ImplicitCollection) {
				// Implicit collections drop nulls
				// Filter array in place to maintain references
				for (var i=0; i<this.data.length; i++) {
					if (Mavo.value(this.data[i]) === null) {
						this.data.splice(i, 1);
						i--;
					}
				}

				// Implicit collections can alternate between arrays and singletons
				// depending on which items are null
				this.updateParent();
			}
		}
		else if (this.node instanceof Mavo.Primitive) {
			var value = this.node.value;

			if (this.node.isDataNull({live: true})) {
				value = null;
			}

			this.data = Mavo.objectify(value);

			if (Mavo.isPlainObject(value) || Array.isArray(value)) {
				// Object rendered on a primitive, we should traverse it and store its properties
				// Why check prototype instead of just type == "object"? Because instances of ES6 classes also return "object"
				_.computeRoutes(this.data);
			}

			this.updateParent();
		}
	}

	updateParent() {
		if (!this.parent) {
			return;
		}

		if (this.node instanceof Mavo.ImplicitCollection) {
			// Is implicit collection
			// See https://github.com/LeaVerou/mavo/issues/50#issuecomment-266079652
			var data = this.data.length === 1? this.data[0] : this.data;
			this.parent.set(this.node.property, data, true);
		}
		else if (this.collection instanceof Mavo.ImplicitCollection) {
			// Is implicit collection *Item*
			this.parent.update();
		}
		else {
			var key = this.key, isDeleted = false;

			if (this.collection instanceof Mavo.Collection) {
				// Is collection item, check if deleted
				isDeleted = this.collection.children[this.node.index] !== this.node;
			}

			if (key !== undefined && !isDeleted) {
				this.parent.set(key, this.data, true);
			}
		}
	}

	set(property, value, shallow) {
		this.data[property] = value;
		_["computeRoute" + (shallow? "" : "s")](value, property, this.data);
	}

	updateKey() {
		var oldKey = this._key;

		if (this.parent[oldKey] === this.data) {
			delete this.parent[oldKey];
		}

		this.updateParent();
	}

	resolve(property) {
		return _.resolve(property, this.data);
	}
}, {
	live: {
		data: function(data) {
			if (data !== this._data) {
				this.isArray = Array.isArray(data);

				this._data = data;

				data[Mavo.toNode] = this.node;
				data[Mavo.parent] = this.parent?.data;
				data[Mavo.mavo] = this.node.mavo;

				this.proxy = this.proxify();

				this.updateParent();

				return this._data;
			}
		}
	},

	static: {
		// The context for expression evaluation
		stub: self.Proxy? new Proxy({[Symbol.unscopables]: {data: true, undefined: true}}, {
			get: (data, property) => {
				var ret = Reflect.get(data, property);

				if (ret !== undefined || typeof property !== "string") {
					return ret;
				}

				var propertyL = property.toLowerCase();

				if (propertyL[0] === "$" && propertyL in Mavo.Functions) {
					// Non-data $specialProperty
					return Mavo.Functions[propertyL];
				}
				else {
					var propertyU = property.toUpperCase();
					if (propertyU in Math) {
						// Math constants
						return Math[propertyU];
					}
				}

				// Still not found? Maybe it's a global
				if (typeof window !== "undefined" && window.hasOwnProperty(property)) {
					// hasOwnProperty to avoid elements with ids clobbering globals
					return window[property];
				}

				// Still not found? Maybe it's a special property used without a $ (see #343)
				if (property[0] !== "$") {
					var $property = "$" + property.toLowerCase();

					if ($property in Mavo.Functions) {
						return Mavo.Functions[$property];
					}
				}

				// Prevent undefined at all costs
				return property;
			},
			has: (data, property) => {
				return Reflect.has(data, property) || typeof property === "string";
			}
		}) : Mavo.Functions,

		isItem (data) {
			return Array.isArray(data?.[Mavo.parent]);
		},

		isCollection (data) {
			return Array.isArray(data) && data?.[Mavo.toNode] instanceof Mavo.Collection;
		},

		closest (obj, test) {
			var path = [];
			do {
				if (test(obj)) {
					return {value: obj, path};
				}

				path.push(obj[Mavo.property]);
			} while (obj = obj[Mavo.parent]);

			return {value: null, path};
		},

		root (obj) {
			return _.closest(obj, o => !o[Mavo.parent]);
		},

		closestItem (obj) {
			return _.closest(obj, _.isItem);
		},

		closestArray(obj) {
			return _.closest(obj, Array.isArray);
		},

		getProperty (data) {
			var ret = _.isItem(data)? data[Mavo.parent] : data;

			return ret[Mavo.property];
		},

		find (property, data, o = {}) {
			if (!data || o.exclude === data) {
				return;
			}

			if (Mavo.in(property, data) && o.exclude !== data[property]) {
				return data[property];
			}

			if (!data[Mavo.route] || !Mavo.in(property, data[Mavo.route])) {
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
					var ret = data.map(a => _.find(property, a))
					              .filter(x => x !== undefined);

					if (ret.length) {
						return ret.flat();
					}
				}

				return;
			}

			var results = [], returnArray = Array.isArray(data), ret;

			results[Mavo.route] = {};
			results[Mavo.mavo] = data[Mavo.mavo];

			var findDown = prop => {
				var ret = _.find(property, data[prop], o);

				if (ret !== undefined) {
					// FIXME How do we set a sensible Mavo.route when the returned array is empty?
					// E.g. because we were pointing to inner elements of a collection that currently has no items.
					if (Mavo.in(Mavo.route, ret)) {
						for (var p in ret[Mavo.route]) {
							results[Mavo.route][p] = true;
						}
					}

					if (Array.isArray(ret)) {
						results.push(...ret);
						returnArray = true;
					}
					else {
						results.push(ret);
					}
				}
			};

			if (Array.isArray(data) || data[Mavo.route][property] === true) {
				for (var prop in data) {
					findDown(prop);
				}
			}
			else {
				data[Mavo.route][property].forEach(findDown);
			}

			return returnArray || results.length > 1? results : results[0];
		},

		// First look in descendants, then ancestors and their descendants
		// one level up at a time (excluding the subtree we've already explored and any siblings)
		findUp (property, data) {
			let parent = data;
			let child;
			let isDataArray = _.isCollection(data);

			do {
				// console.log(parent, child);
				if (!_.isCollection(parent) || isDataArray) {
					// Skip arrays, we don't want to get siblings if we've written off the item
					// unless we're resolving against an array in the first place
					// so that things like collection.nestedProperty will still work
					let ret = _.find(property, parent, {exclude: child});

					if (ret !== undefined) {
						return ret;
					}

					if (_.getProperty(parent) === property) {
						return parent;
					}
				}

				child = parent;
				parent = parent[Mavo.parent];

			} while (parent);
		},

		resolve (property, data) {
			if (property === Mavo.isProxy) {
				return true;
			}

			if (typeof property === "symbol") {
				// We can't do much for symbols
				return data[property];
			}

			var ret;
			var propertyIsNumeric = !isNaN(property);

			if (property in data) {
				ret = data[property];
			}
			else if (_.isCollection(data) && data[Mavo.property] === property) {
				// On collections we want their property name to return the entire collection
				return data;
			}
			else if (!propertyIsNumeric) {
				// Property does not exist on data, if non-numeric, look for it elsewhere
				if (property in _.special) { // $special properties
					ret = _.special[property](data);
				}
				else if (data[Mavo.mavo]) {
					var all = data[Mavo.mavo].root.liveData.data[Mavo.route];

					if (Mavo.in(property, all)) {
						ret = _.findUp(property, data);
					}
				}
				else if (Mavo.in(Mavo.route, data) && Mavo.in(property, data[Mavo.route])) {
					ret = _.find(property, data);
				}
			}

			if (!propertyIsNumeric) {
				var propertyL = property.toLowerCase();
			}

			if (ret !== undefined) {
				// Should we proxify value before returning it? Is it data?
				var proxify = ret !== null && typeof ret === "object" // Can be a proxy
				              && (Mavo.route in ret || Mavo.toNode in ret); // Either has a route or comes from a node

				return !proxify? ret : _.proxify(ret);
			}

			if (!propertyIsNumeric) {
				// Does it reference another Mavo?
				if (isNaN(property) && Mavo.all?.[property]?.root) {
					return Mavo.all[property].root.getLiveData();
				}

				// Still not found? Maybe it's a special property used without a $ (see #343)
				if (property[0] !== "$") {
					var $property = "$" + propertyL;

					if ($property in _.special) {
						return _.resolve($property, data);
					}
				}
			}
		},

		has (property, data) {
			// We don't care about priority here, just whether they exist
			// so we'll make the fastest searches first.
			if (property === Mavo.isProxy) {
				return true;
			}

			if (typeof property !== "string") {
				return Reflect.has(data, property);
			}

			if (_.getProperty(data) === property) {
				return true;
			}

			var objects = [data, Mavo.all, _.special];

			if (objects.some(obj => property in obj)) {
				return true;
			}

			if (typeof property === "string") {
				var propertyL = property.toLowerCase();

				if (propertyL !== property && objects.some(obj => propertyL in obj)) {
					return true;
				};

				if (propertyL[0] !== "$" && "$" + propertyL in _.special) {
					return true;
				}
			}

			// Slowest search last: Is the property present anywhere in the data?
			if (data[Mavo.mavo]) {
				return Mavo.in(property, data[Mavo.mavo].root.liveData.data[Mavo.route]);
			}
		},

		proxify (data) {
			if (!data || typeof data !== "object" || !self.Proxy || data[Mavo.isProxy]) {
				// Data is a primitive, proxies are not supported, or is already a proxy
				return data;
			}

			return new Proxy(data, {
				get: (data, property, proxy) => {
					return _.resolve(property, data);
				},

				has: (data, property) => {
					return _.has(property, data);
				},

				set: function(data, property = "", value) {
					if (typeof property !== "symbol") {
						Mavo.warn(`You cannot set data via expressions. Attempt to set ${property.toString()} to ${value} ignored.`);
						return value;
					}

					return Reflect.set(data, property, value);
				}
			});
		},

		computeMetadata (object, property, parent) {
			if (object && typeof object === "object") { // not primitive
				if (property !== undefined) {
					object[Mavo.property] = property;
				}

				if (parent && !object[Mavo.parent]) {
					object[Mavo.parent] = parent;
				}
			}
		},

		computeRoute (object, property, parent) {
			if (typeof object === "function") {
				return;
			}

			_.computeMetadata(object, property, parent);

			if (Mavo.isPlainObject(object) || Array.isArray(object)) {
				if (!object[Mavo.route]) {
					object[Mavo.route] = {};
				}
			}

			if ($.type(property) !== "number") {
				var child = object;

				while (parent) {
					if (!parent[Mavo.route]) {
						parent[Mavo.route] = {};
					}

					// parent[up] = child
					var up = child?.[Mavo.property];

					if (up && parent[Mavo.route][property] !== true) {
						if (!parent[Mavo.route][property]) {
							parent[Mavo.route][property] = new Set();
						}

						if (parent[Mavo.route][property].has(up)) {
							// We've already computed routes on this subtree
							break;
						}

						parent[Mavo.route][property].add(up);
					}
					else {
						parent[Mavo.route][property] = true;
					}

					child = parent;
					parent = parent[Mavo.parent];
				}
			}
		},

		computeRoutes (object, property, parent) {
			_.traverse(_.computeRoute, object, property, parent);
		},

		// Recursively traverse a JSON structure
		// Warning: No cycle detection. Will loop infinitely if there are cycles
		traverseDown (callback, object, property, parent) {
			if (Array.isArray(object)) {
				object.forEach((item, i) => _.traverse(callback, item, i, object));
			}
			else if (Mavo.isPlainObject(object)) {
				for (var prop in object) {
					_.traverse(callback, object[prop], prop, object);
				}
			}
		},

		traverse (callback, object, property, parent) {
			callback(object, property, parent);
			_.traverseDown(callback, object, property, parent);
		},

		special: {
			$index: function(obj) {
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

			$item: function(obj) {
				return _.closestItem(obj).value;
			},

			$all: function(obj) {
				var arr = _.closestArray(obj);
				let path = arr.path.reverse(), index;
				[index, ...path] = path;
				var ret = arr.value.map(a => $.value(a, ...path));

				if (ret.length > 0 && ret?.[0]?.[Mavo.route]) {
					ret[Mavo.route] = $.each(ret[0][Mavo.route], (p, v) => true);
					ret[Mavo.mavo] = ret[0][Mavo.mavo];
				}

				$.lazy(ret, {
					$previous: function() {
						return ret.slice(0, index);
					},
					$next: function() {
						return ret.slice(index);
					}
				});

				return ret;
			},

			$next: function(obj) {
				var arr = _.closestArray(obj);
				var path = arr.path.reverse();
				var index = arr.path[0];
				path = path.slice(1);
				var nextClosestItem = arr.value?.[index + 1];

				return nextClosestItem? $.value(nextClosestItem, ...path) : null;
			},

			$previous: function(obj) {
				var arr = _.closestArray(obj);
				var path = arr.path.reverse();
				var index = arr.path[0];
				path = path.slice(1);
				var prevClosestItem = arr.value?.[index - 1];

				return prevClosestItem? $.value(prevClosestItem, ...path) : null;
			},

			$this: function(obj) {
				return obj;
			}
		}
	}
});

})(Bliss, Bliss.$);

(function($, $$) {

function delay(ms) {
	return new Promise(r => setTimeout(r, ms));
}

let _ = Mavo.Backend.register(class Github extends Mavo.Backend {
	id = "Github"

	constructor (url, o) {
		super(url, o);

		this.permissions.on(["login", "read"]);

		this.login(true);
	}

	update (url, o) {
		super.update(url, o);

		// Extract info for username, repo, branch, filepath from URL
		let extension = this.format.constructor.extensions[0] || ".json";

		this.defaults = {
			repo: "mv-data",
			filename: `${this.mavo.id}${extension}`
		};

		this.info = _.parseURL(this.source, this.defaults);

		// If an author provided backend metadata, use them
		// since they have higher priority
		for (const prop in o) {
			// Skip the format and mavo properties
			// since they are already updated in the parent's update method
			if (["format", "mavo"].includes(prop)) {
				continue;
			}

			if (this.info.apiCall === "graphql" && prop === "query") {
				// It makes sense to set/update the apiData property only for calls with GraphQL.
				// Otherwise, it will break the Github#get method.
				this.info.apiData = { query: o.query };

				continue;
			}

			this.info[prop] = o[prop];
		}

		$.extend(this, this.info);
	}

	async get (url) {
		if (this.isAuthenticated() || !this.path || url) {
			// Authenticated or raw API call
			let info = url? _.parseURL(url) : this.info;

			if (info.apiData) {
				// GraphQL
				return this.request(info.apiCall, info.apiData, "POST")
					.then(response => {
						if (response.errors?.length) {
							return Promise.reject(response.errors.map(x => x.message).join("\n"));
						}

						return response.data;
					});
			}

			let isRawAPICall = info.apiParams !== undefined;
			let responseType = isRawAPICall ? "response" : "json";
			let req = {
				responseType,
				headers: {
					"Accept": "application/vnd.github.squirrel-girl-preview"
				}
			};
			let response = await this.request(info.apiCall, {ref:this.branch}, "GET", req);

			if (isRawAPICall) {
				// Raw API call
				let json = await response.json();

				let params = new URL(info.apiCall, this.constructor.apiDomain).searchParams;
				let maxPages = params.get("max_pages") - 1; /* subtract 1 because we already fetched a page */

				if (maxPages > 0 && params.get("page") === null && Array.isArray(json)) {
					// Fetch more pages
					let next;

					do {
						next = response.headers.get("Link")?.match(/<(.+?)>; rel="next"/)?.[1];

						if (next) {
							response = await this.request(next, {ref:this.branch}, "GET", req);

							if (response.ok) {
								let pageJSON = await response.json();

								if (Array.isArray(pageJSON)) {
									json.push(...pageJSON);
								}
								else {
									break;
								}
							}
							else {
								break;
							}
						}
						else {
							break;
						}

					} while (--maxPages > 0);

				}

				return json;

			}
			else {
				if (info.repo && response.content) {
					// Fetching file contents
					return _.atob(response.content);
				}
				else {
					return response;
				}
			}
		}
		else {
			// Unauthenticated, use simple GET request to avoid rate limit
			url = new URL(`https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.branch || "main"}/${this.path}`);
			url.searchParams.set("timestamp", Date.now()); // ensure fresh copy

			let response = await fetch(url.href);

			if (response.ok) {
				this.branch = this.branch || "main";
				return response.text();
			}
			else {

				if (response.status === 404 && !this.branch) {
					// Possibly using older default branch "master", try again and store branch name
					url.pathname = `/${this.username}/${this.repo}/master/${this.path}`;
					response = await fetch(url.href);

					if (response.ok) {
						this.branch = "master";
						return response.text();
					}
				}
			}

			return null;
		}
	}

	upload (file, path = this.path) {
		return Mavo.readFile(file).then(dataURL => {
				let base64 = dataURL.slice(5); // remove data:
				let media = base64.match(/^\w+\/[\w+]+/)[0];
				media = media.replace("+", "\\+"); // Fix for #608
				base64 = base64.replace(RegExp(`^${media}(;base64)?,`), "");
				path = this.path.replace(/[^/]+$/, "") + path; // make upload path relative to existing path

				return this.put(base64, path, {isEncoded: true});
			})
			.then(fileInfo => this.getURL(path, fileInfo.commit.sha));
	}

	/**
	 * Saves a file to the backend.
	 * @param {String} serialized - Serialized data
	 * @param {String} path - Optional file path
	 * @return {Promise} A promise that resolves when the file is saved.
	 */
	async put (serialized, path = this.path, o = {}) {
		if (!path) {
			// Raw API calls are read-only for now
			return;
		}

		let repoCall = `repos/${this.username}/${this.repo}`;
		let fileCall = `${repoCall}/contents/${path}`;
		let commitPrefix = this.mavo.element.getAttribute("mv-github-commit-prefix") || "";

		serialized = o.isEncoded? serialized : _.btoa(serialized);

		let repoInfo = await this.repoInfo;

		if (!repoInfo || repoInfo.owner.login !== this.username || repoInfo.name !== this.repo) {
			// No repo info available, or out of date, fetch it
			try {
				repoInfo = await this.request(repoCall)
				this.branch ??= repoInfo.default_branch;
			}
			catch (e) {
				if (e.status === 404) {
					// Create repo if it doesn’t exist
					repoInfo = this.repoInfo = await this.request("user/repos", {name: this.repo, private: !!(this.options.private ?? o.private)}, "POST");
				}
			}
		}

		if (!this.canPush()) {
			// Does not have permission to commit, create a fork
			let forkInfo = await this.request(`${repoCall}/forks`, {name: this.repo}, "POST");
			fileCall = `repos/${forkInfo.full_name}/contents/${path}`;
			this.forkInfo = forkInfo;

			// Ensure that fork is created (they take a while)
			let fetchedForkInfo;

			do {
				await delay(1000);
				// If we can get a list of commits, the fork is created
				fetchedForkInfo = await this.request(`repos/${forkInfo.full_name}/commits`, {until: "1970-01-01T00:00:00Z"}, "HEAD");
			} while (!fetchedForkInfo);

			repoInfo = forkInfo = fetchedForkInfo;
		}

		let fileInfo;
		try {
			// Get SHA
			fileInfo = await this.request(fileCall, { ref: this.branch});

			// If we're here, file exists
			fileInfo = await this.request(fileCall, {
				message: commitPrefix + this.mavo._("gh-updated-file", {name: fileInfo.name || "file"}),
				content: serialized,
				branch: this.branch,
				sha: fileInfo.sha
			}, "PUT");
		}
		catch (xhr) {
			if (xhr.status == 404) {
				// File does not exist, create it
				fileInfo = await this.request(fileCall, {
					message: commitPrefix + "Created file",
					content: serialized,
					branch: this.branch
				}, "PUT");
			}
		}

		const env = {context: this, fileInfo};

		Mavo.hooks.run("gh-after-commit", env);

		return env.fileInfo;
	}

	login (passive) {
		return this.oAuthenticate(passive)
			.then(() => this.getUser())
			.catch(xhr => {
				if (xhr.status == 401) {
					// Unauthorized. Access token we have is invalid, discard it
					this.logout();
				}
			})
			.then(u => {
				if (this.user) {

					this.permissions.on("logout");

					if (this.info.path) {
						this.permissions.on(["edit", "save"]);
					}

					if (this.repo) {
						return this.request(`repos/${this.username}/${this.repo}`)
						.then(repoInfo => {
							this.branch ??= repoInfo.default_branch;

							this.repoInfo = repoInfo;

							if (!this.mavo.source) { // if url doesn't have source, check for forks
								if (!this.canPush()) { // Check if current user has a fork of this repo, and display dialog to switch
									if (this.user.info.public_repos < repoInfo.forks) { // graphql search of current user's forks
										let query = `query {
													  viewer {
													    name
													      repositories(last: 100, isFork: true) {
													      nodes {
													        url
													        parent {
													          nameWithOwner
													        }
													      }
													    }
													  }
													}`;
										return this.request("https://api.github.com/graphql", {query: query}, "POST")
										.then(data => {
											let repos = data.data.viewer.repositories.nodes;

											for (let i in repos) {
												if (repos[i].parent.nameWithOwner === repoInfo.full_name) {
													this.switchToMyForkDialog(repos[i].url);

													return repoInfo;
												}
											}

											return repoInfo;
										});
									}
									else { // search forks of this repo
										return this.request(repoInfo.forks_url)
										.then(forks => {
											for (let i in forks) {
												if (forks[i].owner.login === this.user.username) {
													this.switchToMyForkDialog(forks[i].html_url);

													return repoInfo;
												}
											}
											return repoInfo;
										});
									}
								}
							}
							return repoInfo;
						}).then(repoInfo => {
							const env = { context: this, repoInfo };

							Mavo.hooks.run("gh-after-login", env);

							return env.repoInfo;
						});
					}
				}
			});
	}

	canPush () {
		if (this.repoInfo) {
			return this.repoInfo.permissions.push;
		}

		// Repo does not exist so we can't check permissions
		// Just check if authenticated user is the same as our URL username
		return this.user?.username?.toLowerCase() == this.username.toLowerCase();
	}

	oAuthParams = () => "&scope=repo"

	logout () {
		return this.oAuthLogout().then(() => {
			this.user = null;
		});
	}

	getUser () {
		if (this.user) {
			return Promise.resolve(this.user);
		}

		return this.request("user").then(info => {
			this.user = {
				username: info.login,
				name: info.name || info.login,
				avatar: info.avatar_url,
				url: "https://github.com/" + info.login,
				info
			};

			$.fire(this, "mv-login");
		});
	}

	getURL (path = this.path, sha) {
		let repoInfo = this.forkInfo || this.repoInfo;
		let repo = repoInfo.full_name;
		path = path.replace(/ /g, "%20");

		repoInfo.pagesInfo = repoInfo.pagesInfo || this.request(`repos/${repo}/pages`, {}, "GET", {
			headers: {
				"Accept": "application/vnd.github.mister-fantastic-preview+json"
			}
		});

		return repoInfo.pagesInfo.then(pagesInfo => pagesInfo.html_url + path)
			.catch(xhr => {
				// No Github Pages, return jsdelivr URLs
				return `https://cdn.jsdelivr.net/gh/${repo}@${sha || this.branch || "latest"}/${path}`;
			});
	}

	switchToMyForkDialog (forkURL) {
			let params = (new URL(location)).searchParams;
			params.append(`${this.mavo.id}-storage`, forkURL + "/" + this.path);

			this.notice = this.mavo.message(`
			${this.mavo._("gh-login-fork-options")}
			<form onsubmit="return false">
				<a href="${location.pathname}?${params}"><button>${this.mavo._("gh-use-my-fork")}</button></a>
			</form>`, {
				classes: "mv-inline",
				dismiss: ["button", "submit"]
			});

			this.notice.closed.then(form => {
				if (!form) {
					return;
				}

				history.pushState({}, "", `${location.pathname}?${params}`);
				location.replace(`${location.pathname}?${params}`);

			});
			return;
	}

	static apiDomain = "https://api.github.com/"
	static oAuth = "https://github.com/login/oauth/authorize"
	static key = "7e08e016048000bc594e"

	static test (url) {
		url = new URL(url, Mavo.base);
		return /^((api\.)?github\.com|raw\.githubusercontent\.com)/.test(url.host);
	}

	/**
	 * Parse Github URLs, return username, repo, branch, path
	 */
	static parseURL (source, defaults = {}) {
		const ret = {};

		// Define computed properties as writable accessors
		Object.defineProperties(ret, {
			"apiCall": {
				get() {
					let call = `repos/${this.username}/${this.repo}/${this.resources ?? "contents"}`;

					const path = this.path;
					if (path) {
						call += `/${path}`;
					}

					// Don't lose search params for raw API calls
					return call + (this.apiParams ?? "");
				},
				set (v) {
					delete this.apiCall;
					this.apiCall = v;
				},
				configurable: true,
				enumerable: true
			},

			"path": {
				get() {
					if (this.filename) {
						return (this.filepath? this.filepath + "/" : "") + this.filename;
					}
					else {
						return this.filepath;
					}
				},
				set (v) {
					delete this.path;
					this.path = v;
				},
				configurable: true,
				enumerable: true
			}
		});

		const url = new URL(source, Mavo.base);
		let path = url.pathname.slice(1).split("/");

		ret.username = path.shift();
		ret.repo = path.shift() || defaults.repo;

		if (/raw.githubusercontent.com$/.test(url.host)) {
			ret.branch = path.shift();
		}
		else if (/api.github.com$/.test(url.host)) {
			// Raw API call
			delete ret.username;
			delete ret.repo;

			ret.apiParams = url.search;
			ret.apiData = Mavo.Functions.from(source, "#"); // url.* drops line breaks

			const apiCall = url.pathname.slice(1) + ret.apiParams;

			if (apiCall == "graphql") {
				ret.apiCall = apiCall;
				ret.apiData = { query: ret.apiData };

				return ret;
			}

			path = url.pathname.slice(1).split("/");
			const firstSegment = path.shift();

			if (firstSegment != "repos") {
				ret.apiCall = apiCall;

				return ret;
			}

			ret.username = path.shift();
			ret.repo = path.shift();
			ret.resources = path.shift();
		}
		else if (path[0] == "blob") {
			path.shift();
			ret.branch = path.shift();
		}

		const lastSegment = path[path.length - 1];

		if (/\.\w+$/.test(lastSegment)) {
			ret.filename = lastSegment;
			path.splice(path.length - 1, 1);
		}
		else {
			// If we work with a raw API call and couldn't find the filename in the path,
			// leave the filename blank
			ret.filename = ret.hasOwnProperty("apiParams")? "" : defaults.filename;
		}

		ret.filepath = path.join("/") || defaults.filepath || "";

		return ret;
	}

	// Fix atob() and btoa() so they can handle Unicode
	static btoa = str => btoa(unescape(encodeURIComponent(str)))
	static atob = str => decodeURIComponent(escape(window.atob(str)))
});

})(Bliss, Bliss.$);



//# sourceMappingURL=maps/mavo.js.map
