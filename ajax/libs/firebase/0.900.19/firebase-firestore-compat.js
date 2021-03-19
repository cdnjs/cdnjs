!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).firebase,t.firebase.INTERNAL.modularAPIs)}(this,(function(t,e){"use strict";try{(function(){function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=n(t),s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function i(t,e){for(var n=0,r=e.length,s=t.length;n<r;n++,s++)t[s]=e[n];return t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function o(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
var a=function(t){function e(n,r,s){var i=t.call(this,r)||this;return i.code=n,i.customData=s,i.name="FirebaseError",Object.setPrototypeOf(i,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,c.prototype.create),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),c=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},s=this.service+"/"+t,i=this.errors[t],o=i?u(i,r):"Error",c=this.serviceName+": "+o+" ("+s+").",h=new a(s,c,r);return h},t}();function u(t,e){return t.replace(d,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var h,l,d=/\{\$([^}]+)}/g,f=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t}();!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(l||(l={}));var g={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},m=l.INFO,p=((h={})[l.DEBUG]="log",h[l.VERBOSE]="log",h[l.INFO]="info",h[l.WARN]="warn",h[l.ERROR]="error",h),y=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),o=p[e];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[o].apply(console,i(["["+s+"]  "+t.name+":"],n))}},w=function(){function t(t){this.name=t,this._logLevel=m,this._logHandler=y,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in l))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?g[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,l.DEBUG],t)),this._logHandler.apply(this,i([this,l.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,l.VERBOSE],t)),this._logHandler.apply(this,i([this,l.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,l.INFO],t)),this._logHandler.apply(this,i([this,l.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,l.WARN],t)),this._logHandler.apply(this,i([this,l.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,l.ERROR],t)),this._logHandler.apply(this,i([this,l.ERROR],t))},t}(),v=function(t,e){return(v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function b(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var E,I="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},T=T||{},_=I||self;function S(){}function D(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function A(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var N="closure_uid_"+(1e9*Math.random()>>>0),x=0;function C(t,e,n){return t.call.apply(t.bind,arguments)}function k(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function R(t,e,n){return(R=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?C:k).apply(null,arguments)}function L(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function O(){return Date.now()}function M(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Kb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function P(){this.j=this.j,this.i=this.i}P.prototype.j=!1,P.prototype.ja=function(){if(!this.j&&(this.j=!0,this.G(),0))(function(t){Object.prototype.hasOwnProperty.call(t,N)&&t[N]||(t[N]=++x)})(this)},P.prototype.G=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var F=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},q=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function V(t){return Array.prototype.concat.apply([],arguments)}function U(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function B(t){return/^[\s\xa0]*$/.test(t)}var j,$=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function G(t,e){return-1!=t.indexOf(e)}function K(t,e){return t<e?-1:t>e?1:0}t:{var z=_.navigator;if(z){var Q=z.userAgent;if(Q){j=Q;break t}}j=""}function H(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function W(t){var e={};for(var n in t)e[n]=t[n];return e}var Y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function X(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<Y.length;i++)n=Y[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function J(t){return J[" "](t),t}J[" "]=S;var Z,tt,et=G(j,"Opera"),nt=G(j,"Trident")||G(j,"MSIE"),rt=G(j,"Edge"),st=rt||nt,it=G(j,"Gecko")&&!(G(j.toLowerCase(),"webkit")&&!G(j,"Edge"))&&!(G(j,"Trident")||G(j,"MSIE"))&&!G(j,"Edge"),ot=G(j.toLowerCase(),"webkit")&&!G(j,"Edge");function at(){var t=_.document;return t?t.documentMode:void 0}t:{var ct="",ut=(tt=j,it?/rv:([^\);]+)(\)|;)/.exec(tt):rt?/Edge\/([\d\.]+)/.exec(tt):nt?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(tt):ot?/WebKit\/(\S+)/.exec(tt):et?/(?:Version)[ \/]?(\S+)/.exec(tt):void 0);if(ut&&(ct=ut?ut[1]:""),nt){var ht=at();if(null!=ht&&ht>parseFloat(ct)){Z=String(ht);break t}}Z=ct}var lt,dt={};function ft(t){return function(t,e){var n=dt;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=$(String(Z)).split("."),r=$(String(t)).split("."),s=Math.max(n.length,r.length),i=0;0==e&&i<s;i++){var o=n[i]||"",a=r[i]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=K(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||K(0==o[2].length,0==a[2].length)||K(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(_.document&&nt){var gt=at();lt=gt||(parseInt(Z,10)||void 0)}else lt=void 0;var mt=lt,pt=!nt||9<=Number(mt),yt=nt&&!ft("9"),wt=function(){if(!_.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{_.addEventListener("test",S,e),_.removeEventListener("test",S,e)}catch(t){}return t}();function vt(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function bt(t,e){if(vt.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(it){t:{try{J(e.nodeName);var s=!0;break t}catch(t){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Et[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}vt.prototype.b=function(){this.defaultPrevented=!0},M(bt,vt);var Et={2:"touch",3:"pen",4:"mouse"};bt.prototype.b=function(){bt.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,yt)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(t){}};var It="closure_listenable_"+(1e6*Math.random()|0),Tt=0;function _t(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ca=s,this.key=++Tt,this.Y=this.Z=!1}function St(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.ca=null}function Dt(t){this.src=t,this.a={},this.b=0}function At(t,e){var n=e.type;if(n in t.a){var r,s=t.a[n],i=F(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(St(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function Nt(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.Y&&i.listener==e&&i.capture==!!n&&i.ca==r)return s}return-1}Dt.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.a[i])||(t=this.a[i]=[],this.b++);var o=Nt(t,e,r,s);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new _t(e,this.src,i,!!r,s)).Z=n,t.push(e)),e};var xt="closure_lm_"+(1e6*Math.random()|0),Ct={};function kt(t,e,n,r,s){if(r&&r.once)return Lt(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)kt(t,e[i],n,r,s);return null}return n=Bt(n),t&&t[It]?t.va(e,n,A(r)?!!r.capture:!!r,s):Rt(t,e,n,!1,r,s)}function Rt(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=A(s)?!!s.capture:!!s;if(o&&!pt)return null;var a=Vt(t);if(a||(t[xt]=a=new Dt(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){var t=qt,e=pt?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)wt||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Pt(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Lt(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Lt(t,e[i],n,r,s);return null}return n=Bt(n),t&&t[It]?t.wa(e,n,A(r)?!!r.capture:!!r,s):Rt(t,e,n,!0,r,s)}function Ot(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Ot(t,e[i],n,r,s);else r=A(r)?!!r.capture:!!r,n=Bt(n),t&&t[It]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=Nt(i=t.a[e],n,r,s))&&(St(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.a[e],t.b--)))):t&&(t=Vt(t))&&(e=t.a[e.toString()],t=-1,e&&(t=Nt(e,n,r,s)),(n=-1<t?e[t]:null)&&Mt(n))}function Mt(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[It])At(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Pt(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Vt(e))?(At(n,t),0==n.b&&(n.src=null,e[xt]=null)):St(t)}}}function Pt(t){return t in Ct?Ct[t]:Ct[t]="on"+t}function Ft(t,e){var n=t.listener,r=t.ca||t.src;return t.Z&&Mt(t),n.call(r,e)}function qt(t,e){if(t.Y)return!0;if(!pt){if(!e)t:{e=["window","event"];for(var n=_,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return Ft(t,e=new bt(e,this))}return Ft(t,new bt(e,this))}function Vt(t){return(t=t[xt])instanceof Dt?t:null}var Ut="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bt(t){return"function"==typeof t?t:(t[Ut]||(t[Ut]=function(e){return t.handleEvent(e)}),t[Ut])}function jt(){P.call(this),this.c=new Dt(this),this.J=this,this.C=null}function $t(t,e){var n,r=t.C;if(r)for(n=[];r;r=r.C)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new vt(e,t);else if(e instanceof vt)e.target=e.target||t;else{var s=e;X(e=new vt(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.a=n[i];s=Gt(o,r,!0,e)&&s}if(s=Gt(o=e.a=t,r,!0,e)&&s,s=Gt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=Gt(o=e.a=n[i],r,!1,e)&&s}function Gt(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.ca||o.src;o.Z&&At(t.c,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}M(jt,P),jt.prototype[It]=!0,(E=jt.prototype).addEventListener=function(t,e,n,r){kt(this,t,e,n,r)},E.removeEventListener=function(t,e,n,r){Ot(this,t,e,n,r)},E.G=function(){if(jt.X.G.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)St(n[r]);delete e.a[t],e.b--}}this.C=null},E.va=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},E.wa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var Kt=_.JSON.stringify;function zt(){this.b=this.a=null}var Qt,Ht=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new Yt}),(function(t){t.reset()}));function Wt(){var t=te,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function Yt(){this.next=this.b=this.a=null}function Xt(t){_.setTimeout((function(){throw t}),0)}function Jt(t,e){Qt||function(){var t=_.Promise.resolve(void 0);Qt=function(){t.then(ee)}}(),Zt||(Qt(),Zt=!0),te.add(t,e)}zt.prototype.add=function(t,e){var n=Ht.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},Yt.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},Yt.prototype.reset=function(){this.next=this.b=this.a=null};var Zt=!1,te=new zt;function ee(){for(var t;t=Wt();){try{t.a.call(t.b)}catch(t){Xt(t)}var e=Ht;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}Zt=!1}function ne(t,e){jt.call(this),this.b=t||1,this.a=e||_,this.f=R(this.Za,this),this.g=O()}function re(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function se(t,e,n){if("function"==typeof t)n&&(t=R(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=R(t.handleEvent,t)}return 2147483647<Number(e)?-1:_.setTimeout(t,e||0)}function ie(t){t.a=se((function(){t.a=null,t.c&&(t.c=!1,ie(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}M(ne,jt),(E=ne.prototype).aa=!1,E.M=null,E.Za=function(){if(this.aa){var t=O()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),$t(this,"tick"),this.aa&&(re(this),this.start()))}},E.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=O())},E.G=function(){ne.X.G.call(this),re(this),delete this.a};var oe=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}v(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:ie(this)},e.prototype.G=function(){t.prototype.G.call(this),this.a&&(_.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(P);function ae(t){P.call(this),this.b=t,this.a={}}M(ae,P);var ce=[];function ue(t,e,n,r){Array.isArray(n)||(n&&(ce[0]=n.toString()),n=ce);for(var s=0;s<n.length;s++){var i=kt(e,n[s],r||t.handleEvent,!1,t.b||t);if(!i)break;t.a[i.key]=i}}function he(t){H(t.a,(function(t,e){this.a.hasOwnProperty(e)&&Mt(t)}),t),t.a={}}function le(){this.a=!0}function de(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return Kt(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}ae.prototype.G=function(){ae.X.G.call(this),he(this)},ae.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},le.prototype.info=function(){};var fe={},ge=null;function me(){return ge=ge||new jt}function pe(t){vt.call(this,fe.Fa,t)}function ye(t){var e=me();$t(e,new pe(e,t))}function we(t,e){vt.call(this,fe.STAT_EVENT,t),this.stat=e}function ve(t){var e=me();$t(e,new we(e,t))}function be(t){vt.call(this,fe.Ga,t)}function Ee(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return _.setTimeout((function(){t()}),e)}fe.Fa="serverreachability",M(pe,vt),fe.STAT_EVENT="statevent",M(we,vt),fe.Ga="timingevent",M(be,vt);var Ie={NO_ERROR:0,$a:1,nb:2,mb:3,hb:4,lb:5,ob:6,Da:7,TIMEOUT:8,rb:9},Te={fb:"complete",Bb:"success",Ea:"error",Da:"abort",tb:"ready",ub:"readystatechange",TIMEOUT:"timeout",pb:"incrementaldata",sb:"progress",ib:"downloadprogress",Jb:"uploadprogress"};function _e(){}function Se(t){var e;return(e=t.a)||(e=t.a={}),e}function De(){}_e.prototype.a=null;var Ae,Ne={OPEN:"a",eb:"b",Ea:"c",qb:"d"};function xe(){vt.call(this,"d")}function Ce(){vt.call(this,"c")}function ke(){}function Re(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new ae(this),this.P=Le,t=st?125:void 0,this.R=new ne(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.H=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}M(xe,vt),M(Ce,vt),M(ke,_e),Ae=new ke;var Le=45e3,Oe={},Me={};function Pe(t,e,n){t.H=1,t.i=sn(Je(e)),t.j=n,t.I=!0,Fe(t,null)}function Fe(t,e){t.u=O(),Ue(t),t.l=Je(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),wn(n.b,"t",r),t.D=0,t.a=dr(t.g,t.g.C?e:null),0<t.O&&(t.F=new oe(R(t.Ca,t,t.a),t.O)),ue(t.J,t.a,"readystatechange",t.Xa),e=t.B?W(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),ye(1),function(t,e,n,r,s,i){t.info((function(){if(t.a)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function qe(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var s=Ve(t,n);if(s==Me){4==e&&(t.h=4,ve(14),r=!1),de(t.c,t.f,null,"[Incomplete Response]");break}if(s==Oe){t.h=4,ve(15),de(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}de(t.c,t.f,s,null),Ke(t,s)}4==e&&0==n.length&&(t.h=1,ve(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),sr(e),e.F=!0,ve(11))):(de(t.c,t.f,n,"[Invalid Chunked Response]"),Ge(t),$e(t))}function Ve(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Me:(n=Number(e.substring(n,r)),isNaN(n)?Oe:(r+=1)+n>e.length?Me:(e=e.substr(r,n),t.D=r+n,e))}function Ue(t){t.T=O()+t.P,Be(t,t.P)}function Be(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=Ee(R(t.Va,t),e)}function je(t){t.o&&(_.clearTimeout(t.o),t.o=null)}function $e(t){0==t.g.v||t.A||ar(t.g,t)}function Ge(t){je(t);var e=t.F;e&&"function"==typeof e.ja&&e.ja(),t.F=null,re(t.R),he(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ja())}function Ke(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||Sn(n.b,t)))if(n.I=t.N,!t.C&&Sn(n.b,t)&&3==n.v){try{var r=n.ka.a.parse(e)}catch(t){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;or(n),Wn(n)}rr(n),ve(18)}}else n.oa=s[1],0<n.oa-n.P&&37500>s[2]&&n.H&&0==n.o&&!n.m&&(n.m=Ee(R(n.Sa,n),6e3));if(1>=_n(n.b)&&n.ea){try{n.ea()}catch(t){}n.ea=void 0}}else ur(n,11)}else if((t.C||n.a==t)&&or(n),!B(e))for(e=r=n.ka.a.parse(e),r=0;r<e.length;r++)if(s=e[r],n.P=s[0],s=s[1],2==n.v)if("c"==s[0]){n.J=s[1],n.ga=s[2];var i=s[3];null!=i&&(n.ha=i,n.c.info("VER="+n.ha));var o=s[4];null!=o&&(n.pa=o,n.c.info("SVER="+n.pa));var a=s[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(G(h,"spdy")||G(h,"quic")||G(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(Dn(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.na=d,rn(c.B,c.A,d))}}n.v=3,n.f&&n.f.ta(),n.U&&(n.N=O()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).la=lr(c,c.C?c.ga:null,c.fa),f.C){An(c.b,f);var g=f,m=c.D;m&&g.setTimeout(m),g.o&&(je(g),Ue(g)),c.a=f}else nr(c);0<n.g.length&&Jn(n)}else"stop"!=s[0]&&"close"!=s[0]||ur(n,7);else 3==n.v&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?ur(n,7):Hn(n):"noop"!=s[0]&&n.f&&n.f.sa(s),n.o=0);ye(4)}catch(t){}}function ze(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(D(t)||"string"==typeof t)q(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(D(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(D(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function Qe(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof Qe)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function He(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];We(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var s={};for(n=e=0;e<t.a.length;)We(s,r=t.a[e])||(t.a[n++]=r,s[r]=1),e++;t.a.length=n}}function We(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(E=Re.prototype).setTimeout=function(t){this.P=t},E.Xa=function(t){t=t.target;var e=this.F;e&&3==Gn(t)?e.f():this.Ca(t)},E.Ca=function(t){try{if(t==this.a)t:{var e=Gn(this.a),n=this.a.ua(),r=this.a.W();if(!(3>e||3==e&&!st&&!this.a.$())){this.A||4!=e||7==n||ye(8==n||0>=r?3:2),je(this);var s=this.a.W();this.N=s;var i=this.a.$();if(this.b=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,s),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,ve(12),Ge(this),$e(this);break t}de(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,Ke(this,c)}this.I?(qe(this,e,i),st&&this.b&&3==e&&(ue(this.J,this.R,"tick",this.Wa),this.R.start())):(de(this.c,this.f,i,null),Ke(this,i)),4==e&&Ge(this),this.b&&!this.A&&(4==e?ar(this.g,this):(this.b=!1,Ue(this)))}else 400==s&&0<i.indexOf("Unknown SID")?(this.h=3,ve(12)):(this.h=0,ve(13)),Ge(this),$e(this)}}}catch(t){}},E.Wa=function(){if(this.a){var t=Gn(this.a),e=this.a.$();this.D<e.length&&(je(this),qe(this,t,e),this.b&&4!=t&&Ue(this))}},E.cancel=function(){this.A=!0,Ge(this)},E.Va=function(){this.o=null;var t=O();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.H&&(ye(3),ve(17)),Ge(this),this.h=2,$e(this)):Be(this,this.T-t)},(E=Qe.prototype).K=function(){He(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},E.L=function(){return He(this),this.a.concat()},E.get=function(t,e){return We(this.b,t)?this.b[t]:e},E.set=function(t,e){We(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},E.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Ye=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Xe(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof Xe){this.a=void 0!==e?e:t.a,Ze(this,t.f),this.j=t.j,tn(this,t.c),en(this,t.h),this.g=t.g,e=t.b;var n=new gn;n.c=e.c,e.a&&(n.a=new Qe(e.a),n.b=e.b),nn(this,n),this.i=t.i}else t&&(n=String(t).match(Ye))?(this.a=!!e,Ze(this,n[1]||"",!0),this.j=on(n[2]||""),tn(this,n[3]||"",!0),en(this,n[4]),this.g=on(n[5]||"",!0),nn(this,n[6]||"",!0),this.i=on(n[7]||"")):(this.a=!!e,this.b=new gn(null,this.a))}function Je(t){return new Xe(t)}function Ze(t,e,n){t.f=n?on(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function tn(t,e,n){t.c=n?on(e,!0):e}function en(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function nn(t,e,n){e instanceof gn?(t.b=e,function(t,e){e&&!t.f&&(mn(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(pn(this,e),wn(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=an(e,dn)),t.b=new gn(e,t.a))}function rn(t,e,n){t.b.set(e,n)}function sn(t){return rn(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^O()).toString(36)),t}function on(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function an(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,cn),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function cn(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}Xe.prototype.toString=function(){var t=[],e=this.f;e&&t.push(an(e,un,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(an(e,un,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(an(n,"/"==n.charAt(0)?ln:hn,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",an(n,fn)),t.join("")};var un=/[#\/\?@]/g,hn=/[#\?:]/g,ln=/[#\?]/g,dn=/[#\?@]/g,fn=/#/g;function gn(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function mn(t){t.a||(t.a=new Qe,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function pn(t,e){mn(t),e=vn(t,e),We(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,We((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&He(t)))}function yn(t,e){return mn(t),e=vn(t,e),We(t.a.b,e)}function wn(t,e,n){pn(t,e),0<n.length&&(t.c=null,t.a.set(vn(t,e),U(n)),t.b+=n.length)}function vn(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(E=gn.prototype).add=function(t,e){mn(this),this.c=null,t=vn(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},E.forEach=function(t,e){mn(this),this.a.forEach((function(n,r){q(n,(function(n){t.call(e,n,r,this)}),this)}),this)},E.L=function(){mn(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},E.K=function(t){mn(this);var e=[];if("string"==typeof t)yn(this,t)&&(e=V(e,this.a.get(vn(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=V(e,t[n])}return e},E.set=function(t,e){return mn(this),this.c=null,yn(this,t=vn(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},E.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},E.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.K(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.c=t.join("&")};var bn=function(t,e){this.b=t,this.a=e};function En(t){this.g=t||In,_.PerformanceNavigationTiming?t=0<(t=_.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(_.ia&&_.ia.ya&&_.ia.ya()&&_.ia.ya().Lb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var In=10;function Tn(t){return!!t.b||!!t.a&&t.a.size>=t.f}function _n(t){return t.b?1:t.a?t.a.size:0}function Sn(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function Dn(t,e){t.a?t.a.add(e):t.b=e}function An(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function Nn(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var s=b(t.a.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.s)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return U(t.c)}function xn(){}function Cn(){this.a=new xn}function kn(t,e,n){var r=n||"";try{ze(t,(function(t,n){var s=t;A(t)&&(s=Kt(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function Rn(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(t){}}En.prototype.cancel=function(){var t,e;if(this.c=Nn(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=b(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},xn.prototype.stringify=function(t){return _.JSON.stringify(t,void 0)},xn.prototype.parse=function(t){return _.JSON.parse(t,void 0)};var Ln=_.JSON.parse;function On(t){jt.call(this),this.headers=new Qe,this.H=t||null,this.b=!1,this.s=this.a=null,this.B="",this.h=0,this.f="",this.g=this.A=this.l=this.u=!1,this.o=0,this.m=null,this.I=Mn,this.D=this.F=!1}M(On,jt);var Mn="",Pn=/^https?$/i,Fn=["POST","PUT"];function qn(t){return"content-type"==t.toLowerCase()}function Vn(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Un(t),jn(t)}function Un(t){t.u||(t.u=!0,$t(t,"complete"),$t(t,"error"))}function Bn(t){if(t.b&&void 0!==T&&(!t.s[1]||4!=Gn(t)||2!=t.W()))if(t.l&&4==Gn(t))se(t.za,0,t);else if($t(t,"readystatechange"),4==Gn(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.B).match(Ye)[1]||null;if(!i&&_.self&&_.self.location){var o=_.self.location.protocol;i=o.substr(0,o.length-1)}s=!Pn.test(i?i.toLowerCase():"")}e=s}if(e)$t(t,"complete"),$t(t,"success");else{t.h=6;try{var a=2<Gn(t)?t.a.statusText:""}catch(n){a=""}t.f=a+" ["+t.W()+"]",Un(t)}}finally{jn(t)}}}function jn(t,e){if(t.a){$n(t);var n=t.a,r=t.s[0]?S:null;t.a=null,t.s=null,e||$t(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function $n(t){t.a&&t.D&&(t.a.ontimeout=null),t.m&&(_.clearTimeout(t.m),t.m=null)}function Gn(t){return t.a?t.a.readyState:0}function Kn(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return H(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):rn(t,e,n))}function zn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Qn(t){this.pa=0,this.g=[],this.c=new le,this.ga=this.la=this.B=this.fa=this.a=this.na=this.A=this.V=this.i=this.O=this.l=null,this.Oa=this.R=0,this.La=zn("failFast",!1,t),this.H=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.oa=this.P=-1,this.T=this.o=this.u=0,this.Ha=zn("baseRetryDelayMs",5e3,t),this.Ra=zn("retryDelaySeedMs",1e4,t),this.Ma=zn("forwardChannelMaxRetries",2,t),this.ma=zn("forwardChannelRequestTimeoutMs",2e4,t),this.Na=t&&t.g||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new En(t&&t.concurrentRequestLimit),this.ka=new Cn,this.da=t&&t.fastHandshake||!1,this.Ia=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.da&&this.S&&t&&t.detectBufferingProxy||!1,this.ea=void 0,this.N=0,this.F=!1,this.s=null,(this.Ka=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function Hn(t){if(Yn(t),3==t.v){var e=t.R++,n=Je(t.B);rn(n,"SID",t.J),rn(n,"RID",e),rn(n,"TYPE","terminate"),tr(t,n),(e=new Re(t,t.c,e,void 0)).H=2,e.i=sn(Je(n)),n=!1,_.navigator&&_.navigator.sendBeacon&&(n=_.navigator.sendBeacon(e.i.toString(),"")),!n&&_.Image&&((new Image).src=e.i,n=!0),n||(e.a=dr(e.g,null),e.a.ba(e.i)),e.u=O(),Ue(e)}hr(t)}function Wn(t){t.a&&(sr(t),t.a.cancel(),t.a=null)}function Yn(t){Wn(t),t.j&&(_.clearTimeout(t.j),t.j=null),or(t),t.b.cancel(),t.h&&("number"==typeof t.h&&_.clearTimeout(t.h),t.h=null)}function Xn(t,e){t.g.push(new bn(t.Oa++,e)),3==t.v&&Jn(t)}function Jn(t){Tn(t.b)||t.h||(t.h=!0,Jt(t.Ba,t),t.u=0)}function Zn(t,e){var n;n=e?e.f:t.R++;var r=Je(t.B);rn(r,"SID",t.J),rn(r,"RID",n),rn(r,"AID",t.P),tr(t,r),t.i&&t.l&&Kn(r,t.i,t.l),n=new Re(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=er(t,n,1e3),n.setTimeout(Math.round(.5*t.ma)+Math.round(.5*t.ma*Math.random())),Dn(t.b,n),Pe(n,r,e)}function tr(t,e){t.f&&ze({},(function(t,n){rn(e,n,t)}))}function er(t,e,n){n=Math.min(t.g.length,n);var r=t.f?R(t.f.Ja,t.f,t):null;t:for(var s=t.g,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].b,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].b,h=s[c].a;if(0>(u-=i))i=Math.max(0,s[c].b-100),a=!1;else try{kn(h,o,"req"+u+"_")}catch(t){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function nr(t){t.a||t.j||(t.T=1,Jt(t.Aa,t),t.o=0)}function rr(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=Ee(R(t.Aa,t),cr(t,t.o)),t.o++,!0)}function sr(t){null!=t.s&&(_.clearTimeout(t.s),t.s=null)}function ir(t){t.a=new Re(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=Je(t.la);rn(e,"RID","rpc"),rn(e,"SID",t.J),rn(e,"CI",t.H?"0":"1"),rn(e,"AID",t.P),tr(t,e),rn(e,"TYPE","xmlhttp"),t.i&&t.l&&Kn(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ga,n.H=1,n.i=sn(Je(e)),n.j=null,n.I=!0,Fe(n,t)}function or(t){null!=t.m&&(_.clearTimeout(t.m),t.m=null)}function ar(t,e){var n=null;if(t.a==e){or(t),sr(t),t.a=null;var r=2}else{if(!Sn(t.b,e))return;n=e.s,An(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=O()-e.u;var s=t.u;$t(r=me(),new be(r,n,e,s)),Jn(t)}else nr(t);else if(3==(s=e.h)||0==s&&0<t.I||!(1==r&&function(t,e){return!(_n(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.La?0:t.Ma)||(t.h=Ee(R(t.Ba,t,e),cr(t,t.u)),t.u++,0)))}(t,e)||2==r&&rr(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),s){case 1:ur(t,5);break;case 4:ur(t,10);break;case 3:ur(t,6);break;default:ur(t,2)}}function cr(t,e){var n=t.Ha+Math.floor(Math.random()*t.Ra);return t.f||(n*=2),n*e}function ur(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=R(t.Ya,t);n||(n=new Xe("//www.google.com/images/cleardot.gif"),_.location&&"http"==_.location.protocol||Ze(n,"https"),sn(n)),function(t,e){var n=new le;if(_.Image){var r=new Image;r.onload=L(Rn,n,r,"TestLoadImage: loaded",!0,e),r.onerror=L(Rn,n,r,"TestLoadImage: error",!1,e),r.onabort=L(Rn,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=L(Rn,n,r,"TestLoadImage: timeout",!1,e),_.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else ve(2);t.v=0,t.f&&t.f.ra(e),hr(t),Yn(t)}function hr(t){t.v=0,t.I=-1,t.f&&(0==Nn(t.b).length&&0==t.g.length||(t.b.c.length=0,U(t.g),t.g.length=0),t.f.qa())}function lr(t,e,n){var r=function(t){return t instanceof Xe?Je(t):new Xe(t,void 0)}(n);if(""!=r.c)e&&tn(r,e+"."+r.c),en(r,r.h);else{var s=_.location;r=function(t,e,n,r){var s=new Xe(null,void 0);return t&&Ze(s,t),e&&tn(s,e),n&&en(s,n),r&&(s.g=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.V&&H(t.V,(function(t,e){rn(r,e,t)})),e=t.A,n=t.na,e&&n&&rn(r,e,n),rn(r,"VER",t.ha),tr(t,r),r}function dr(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new On(t.Na)).F=t.C,e}function fr(){}function gr(){if(nt&&!(10<=Number(mt)))throw Error("Environmental error: no available transport.")}function mr(t,e){jt.call(this),this.a=new Qn(e),this.o=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!B(t)&&(this.a.i=t),this.m=e&&e.supportsCrossDomainXhr||!1,this.l=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!B(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new wr(this)}function pr(t){xe.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function yr(){Ce.call(this),this.status=1}function wr(t){this.a=t}(E=On.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+t);e=e?e.toUpperCase():"GET",this.B=t,this.f="",this.h=0,this.u=!1,this.b=!0,this.a=new XMLHttpRequest,this.s=this.H?Se(this.H):Se(Ae),this.a.onreadystatechange=R(this.za,this);try{this.A=!0,this.a.open(e,String(t),!0),this.A=!1}catch(t){return void Vn(this,t)}t=n||"";var s=new Qe(this.headers);r&&ze(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=qn,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.L()),n=_.FormData&&t instanceof _.FormData,!(0<=F(Fn,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.F&&(this.a.withCredentials=this.F);try{$n(this),0<this.o&&((this.D=function(t){return nt&&ft(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.o,this.a.ontimeout=R(this.xa,this)):this.m=se(this.xa,this.o,this)),this.l=!0,this.a.send(t),this.l=!1}catch(t){Vn(this,t)}},E.xa=function(){void 0!==T&&this.a&&(this.f="Timed out after "+this.o+"ms, aborting",this.h=8,$t(this,"timeout"),this.abort(8))},E.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,$t(this,"complete"),$t(this,"abort"),jn(this))},E.G=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),jn(this,!0)),On.X.G.call(this)},E.za=function(){this.j||(this.A||this.l||this.g?Bn(this):this.Ua())},E.Ua=function(){Bn(this)},E.W=function(){try{return 2<Gn(this)?this.a.status:-1}catch(t){return-1}},E.$=function(){try{return this.a?this.a.responseText:""}catch(t){return""}},E.Pa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Ln(e)}},E.ua=function(){return this.h},E.Qa=function(){return"string"==typeof this.f?this.f:String(this.f)},(E=Qn.prototype).ha=8,E.v=1,E.Ba=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new Re(this,this.c,t,void 0),r=this.l;if(this.O&&(r?X(r=W(r),this.O):r=this.O),null===this.i&&(n.B=r),this.da)t:{for(var s=e=0;s<this.g.length;s++){var i=this.g[s];if(void 0===(i="__data__"in i.a&&"string"==typeof(i=i.a.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=s;break t}if(4096===e||s===this.g.length-1){e=s+1;break t}}e=1e3}else e=1e3;e=er(this,n,e),rn(s=Je(this.B),"RID",t),rn(s,"CVER",22),this.A&&rn(s,"X-HTTP-Session-Id",this.A),tr(this,s),this.i&&r&&Kn(s,this.i,r),Dn(this.b,n),this.Ia&&rn(s,"TYPE","init"),this.da?(rn(s,"$req",e),rn(s,"SID","null"),n.U=!0,Pe(n,s,null)):Pe(n,s,e),this.v=2}}else 3==this.v&&(t?Zn(this,t):0==this.g.length||Tn(this.b)||Zn(this))},E.Aa=function(){if(this.j=null,ir(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=Ee(R(this.Ta,this),t)}},E.Ta=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.H=!1,this.F=!0,ve(10),Wn(this),ir(this))},E.Sa=function(){null!=this.m&&(this.m=null,Wn(this),rr(this),ve(19))},E.Ya=function(t){t?(this.c.info("Successfully pinged google.com"),ve(2)):(this.c.info("Failed to ping google.com"),ve(1))},(E=fr.prototype).ta=function(){},E.sa=function(){},E.ra=function(){},E.qa=function(){},E.Ja=function(){},gr.prototype.a=function(t,e){return new mr(t,e)},M(mr,jt),mr.prototype.g=function(){this.a.f=this.f,this.m&&(this.a.C=!0);var t=this.a,e=this.o,n=this.b||void 0;ve(0),t.fa=e,t.V=n||{},t.H=t.S,t.B=lr(t,null,t.fa),Jn(t)},mr.prototype.close=function(){Hn(this.a)},mr.prototype.h=function(t){if("string"==typeof t){var e={};e.__data__=t,Xn(this.a,e)}else this.l?((e={}).__data__=Kt(t),Xn(this.a,e)):Xn(this.a,t)},mr.prototype.G=function(){this.a.f=null,delete this.f,Hn(this.a),delete this.a,mr.X.G.call(this)},M(pr,xe),M(yr,Ce),M(wr,fr),wr.prototype.ta=function(){$t(this.a,"a")},wr.prototype.sa=function(t){$t(this.a,new pr(t))},wr.prototype.ra=function(t){$t(this.a,new yr(t))},wr.prototype.qa=function(){$t(this.a,"b")},gr.prototype.createWebChannel=gr.prototype.a,mr.prototype.send=mr.prototype.h,mr.prototype.open=mr.prototype.g,mr.prototype.close=mr.prototype.close,Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,Te.COMPLETE="complete",De.EventType=Ne,Ne.OPEN="a",Ne.CLOSE="b",Ne.ERROR="c",Ne.MESSAGE="d",jt.prototype.listen=jt.prototype.va,On.prototype.listenOnce=On.prototype.wa,On.prototype.getLastError=On.prototype.Qa,On.prototype.getLastErrorCode=On.prototype.ua,On.prototype.getStatus=On.prototype.W,On.prototype.getResponseJson=On.prototype.Pa,On.prototype.getResponseText=On.prototype.$,On.prototype.send=On.prototype.ba;var vr=Ie,br=Te,Er=fe,Ir=10,Tr=11,_r=De,Sr=On;
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Dr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Dr.o=-1;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const Ar=new w("@firebase/firestore");function Nr(){return Ar.logLevel}function xr(t,...e){if(Ar.logLevel<=l.DEBUG){const n=e.map(Rr);Ar.debug(`Firestore (8.3.1): ${t}`,...n)}}function Cr(t,...e){if(Ar.logLevel<=l.ERROR){const n=e.map(Rr);Ar.error(`Firestore (8.3.1): ${t}`,...n)}}function kr(t,...e){if(Ar.logLevel<=l.WARN){const n=e.map(Rr);Ar.warn(`Firestore (8.3.1): ${t}`,...n)}}function Rr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Lr(t="Unexpected state"){const e="FIRESTORE (8.3.1) INTERNAL ASSERTION FAILED: "+t;throw Cr(e),new Error(e)}function Or(t,e){t||Lr()}function Mr(t,e){return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Pr(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Fr{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=Pr(40);for(let s=0;s<r.length;++s)n.length<20&&r[s]<e&&(n+=t.charAt(r[s]%t.length))}return n}}function qr(t,e){return t<e?-1:t>e?1:0}function Vr(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function Ur(t){return t+"\0"}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Br(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function jr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function $r(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Gr(t){return null==t}function Kr(t){return 0===t&&1/t==-1/0}function zr(t){return"number"==typeof t&&Number.isInteger(t)&&!Kr(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Qr={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Hr extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Wr{constructor(t,e,n){void 0===e?e=0:e>t.length&&Lr(),void 0===n?n=t.length-e:n>t.length-e&&Lr(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Wr.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Wr?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Yr extends Wr{construct(t,e,n){return new Yr(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Yr(e)}static emptyPath(){return new Yr([])}}const Xr=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Jr extends Wr{construct(t,e,n){return new Jr(t,e,n)}static isValidIdentifier(t){return Xr.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Jr.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Jr(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Hr(Qr.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Hr(Qr.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Hr(Qr.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Jr(e)}static emptyPath(){return new Jr([])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Zr{constructor(t){this.path=t}static fromPath(t){return new Zr(Yr.fromString(t))}static fromName(t){return new Zr(Yr.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Yr.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Yr.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Zr(new Yr(t.slice()))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ts{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new ts(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new ts(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return qr(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ts.EMPTY_BYTE_STRING=new ts("");const es=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ns(t){if(Or(!!t),"string"==typeof t){let e=0;const n=es.exec(t);if(Or(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:rs(t.seconds),nanos:rs(t.nanos)}}function rs(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function ss(t){return"string"==typeof t?ts.fromBase64String(t):ts.fromUint8Array(t)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class is{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Hr(Qr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Hr(Qr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Hr(Qr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Hr(Qr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return is.fromMillis(Date.now())}static fromDate(t){return is.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3);return new is(e,1e6*(t-1e3*e))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?qr(this.nanoseconds,t.nanoseconds):qr(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function os(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function as(t){const e=t.mapValue.fields.__previous_value__;return os(e)?as(e):e}function cs(t){const e=ns(t.mapValue.fields.__local_write_time__.timestampValue);return new is(e.seconds,e.nanos)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function us(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?os(t)?4:10:Lr()}function hs(t,e){const n=us(t);if(n!==us(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return cs(t).isEqual(cs(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ns(t.timestampValue),r=ns(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return ss(t.bytesValue).isEqual(ss(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return rs(t.geoPointValue.latitude)===rs(e.geoPointValue.latitude)&&rs(t.geoPointValue.longitude)===rs(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return rs(t.integerValue)===rs(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=rs(t.doubleValue),r=rs(e.doubleValue);return n===r?Kr(n)===Kr(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Vr(t.arrayValue.values||[],e.arrayValue.values||[],hs);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Br(n)!==Br(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!hs(n[t],r[t])))return!1;return!0}(t,e);default:return Lr()}}function ls(t,e){return void 0!==(t.values||[]).find((t=>hs(t,e)))}function ds(t,e){const n=us(t),r=us(e);if(n!==r)return qr(n,r);switch(n){case 0:return 0;case 1:return qr(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=rs(t.integerValue||t.doubleValue),r=rs(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return fs(t.timestampValue,e.timestampValue);case 4:return fs(cs(t),cs(e));case 5:return qr(t.stringValue,e.stringValue);case 6:return function(t,e){const n=ss(t),r=ss(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=qr(n[t],r[t]);if(0!==e)return e}return qr(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=qr(rs(t.latitude),rs(e.latitude));return 0!==n?n:qr(rs(t.longitude),rs(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=ds(n[t],r[t]);if(e)return e}return qr(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let t=0;t<r.length&&t<i.length;++t){const e=qr(r[t],i[t]);if(0!==e)return e;const o=ds(n[r[t]],s[i[t]]);if(0!==o)return o}return qr(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Lr()}}function fs(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return qr(t,e);const n=ns(t),r=ns(e),s=qr(n.seconds,r.seconds);return 0!==s?s:qr(n.nanos,r.nanos)}function gs(t){return ms(t)}function ms(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ns(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?ss(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Zr.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=ms(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${ms(t.fields[s])}`;return n+"}"}(t.mapValue):Lr();var e,n}function ps(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function ys(t){return!!t&&"integerValue"in t}function ws(t){return!!t&&"arrayValue"in t}function vs(t){return!!t&&"nullValue"in t}function bs(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Es(t){return!!t&&"mapValue"in t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Is{constructor(t,e){this.key=t,this.version=e}}class Ts extends Is{constructor(t,e,n,r){super(t,e),this.objectValue=n,this.hasLocalMutations=!!r.hasLocalMutations,this.hasCommittedMutations=!!r.hasCommittedMutations}field(t){return this.objectValue.field(t)}data(){return this.objectValue}toProto(){return this.objectValue.proto}isEqual(t){return t instanceof Ts&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.hasLocalMutations===t.hasLocalMutations&&this.hasCommittedMutations===t.hasCommittedMutations&&this.objectValue.isEqual(t.objectValue)}toString(){return`Document(${this.key}, ${this.version}, ${this.objectValue.toString()}, {hasLocalMutations: ${this.hasLocalMutations}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}}class _s extends Is{constructor(t,e,n){super(t,e),this.hasCommittedMutations=!(!n||!n.hasCommittedMutations)}toString(){return`NoDocument(${this.key}, ${this.version})`}get hasPendingWrites(){return this.hasCommittedMutations}isEqual(t){return t instanceof _s&&t.hasCommittedMutations===this.hasCommittedMutations&&t.version.isEqual(this.version)&&t.key.isEqual(this.key)}}class Ss extends Is{toString(){return`UnknownDocument(${this.key}, ${this.version})`}get hasPendingWrites(){return!0}isEqual(t){return t instanceof Ss&&t.version.isEqual(this.version)&&t.key.isEqual(this.key)}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ds{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function As(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Ds(t,e,n,r,s,i,o)}function Ns(t){const e=Mr(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+gs(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),Gr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Bs(e.startAt)),e.endAt&&(t+="|ub:",t+=Bs(e.endAt)),e.h=t}return e.h}function xs(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!$s(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!hs(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ks(t.startAt,e.startAt)&&Ks(t.endAt,e.endAt)}function Cs(t){return Zr.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class ks extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Rs(t,e,n):"array-contains"===e?new Ps(t,n):"in"===e?new Fs(t,n):"not-in"===e?new qs(t,n):"array-contains-any"===e?new Vs(t,n):new ks(t,e,n)}static l(t,e,n){return"in"===e?new Ls(t,n):new Os(t,n)}matches(t){const e=t.field(this.field);return"!="===this.op?null!==e&&this.m(ds(e,this.value)):null!==e&&us(this.value)===us(e)&&this.m(ds(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Lr()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Rs extends ks{constructor(t,e,n){super(t,e,n),this.key=Zr.fromName(n.referenceValue)}matches(t){const e=Zr.comparator(t.key,this.key);return this.m(e)}}class Ls extends ks{constructor(t,e){super(t,"in",e),this.keys=Ms("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Os extends ks{constructor(t,e){super(t,"not-in",e),this.keys=Ms("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ms(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>Zr.fromName(t.referenceValue)))}class Ps extends ks{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.field(this.field);return ws(e)&&ls(e.arrayValue,this.value)}}class Fs extends ks{constructor(t,e){super(t,"in",e)}matches(t){const e=t.field(this.field);return null!==e&&ls(this.value.arrayValue,e)}}class qs extends ks{constructor(t,e){super(t,"not-in",e)}matches(t){if(ls(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.field(this.field);return null!==e&&!ls(this.value.arrayValue,e)}}class Vs extends ks{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.field(this.field);return!(!ws(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>ls(this.value.arrayValue,t)))}}class Us{constructor(t,e){this.position=t,this.before=e}}function Bs(t){return`${t.before?"b":"a"}:${t.position.map((t=>gs(t))).join(",")}`}class js{constructor(t,e="asc"){this.field=t,this.dir=e}}function $s(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function Gs(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?Zr.comparator(Zr.fromName(o.referenceValue),n.key):ds(o,n.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function Ks(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!hs(t.position[n],e.position[n]))return!1;return!0}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class zs{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function Qs(t,e,n,r,s,i,o,a){return new zs(t,e,n,r,s,i,o,a)}function Hs(t){return new zs(t)}function Ws(t){return!Gr(t.limit)&&"F"===t.limitType}function Ys(t){return!Gr(t.limit)&&"L"===t.limitType}function Xs(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Js(t){for(const e of t.filters)if(e.g())return e.field;return null}function Zs(t){return null!==t.collectionGroup}function ti(t){const e=Mr(t);if(null===e.p){e.p=[];const t=Js(e),n=Xs(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new js(t)),e.p.push(new js(Jr.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new js(Jr.keyField(),t))}}}return e.p}function ei(t){const e=Mr(t);if(!e.T)if("F"===e.limitType)e.T=As(e.path,e.collectionGroup,ti(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of ti(e)){const e="desc"===n.dir?"asc":"desc";t.push(new js(n.field,e))}const n=e.endAt?new Us(e.endAt.position,!e.endAt.before):null,r=e.startAt?new Us(e.startAt.position,!e.startAt.before):null;e.T=As(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function ni(t,e,n){return new zs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ri(t,e){return xs(ei(t),ei(e))&&t.limitType===e.limitType}function si(t){return`${Ns(ei(t))}|lt:${t.limitType}`}function ii(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${gs(e.value)}`;var e})).join(", ")}]`),Gr(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: "+Bs(t.startAt)),t.endAt&&(e+=", endAt: "+Bs(t.endAt)),`Target(${e})`}(ei(t))}; limitType=${t.limitType})`}function oi(t,e){return function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Zr.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!Gs(t.startAt,ti(t),e))&&(!t.endAt||!Gs(t.endAt,ti(t),e))}(t,e)}function ai(t){return(e,n)=>{let r=!1;for(const s of ti(t)){const t=ci(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function ci(t,e,n){const r=t.field.isKeyField()?Zr.comparator(e.key,n.key):function(t,e,n){const r=e.field(t),s=n.field(t);return null!==r&&null!==s?ds(r,s):Lr()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Lr()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ui{constructor(t){this.timestamp=t}static fromTimestamp(t){return new ui(t)}static min(){return new ui(new is(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class hi{constructor(t){this.fields=t,t.sort(Jr.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Vr(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class li{constructor(t){this.proto=t}static empty(){return new li({mapValue:{}})}field(t){if(t.isEmpty())return this.proto;{let e=this.proto;for(let n=0;n<t.length-1;++n){if(!e.mapValue.fields)return null;if(e=e.mapValue.fields[t.get(n)],!Es(e))return null}return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}isEqual(t){return hs(this.proto,t.proto)}}class di{constructor(t=li.empty()){this.I=t,this.A=new Map}set(t,e){return this.R(t,e),this}delete(t){return this.R(t,null),this}R(t,e){let n=this.A;for(let e=0;e<t.length-1;++e){const r=t.get(e);let s=n.get(r);s instanceof Map?n=s:s&&10===us(s)?(s=new Map(Object.entries(s.mapValue.fields||{})),n.set(r,s),n=s):(s=new Map,n.set(r,s),n=s)}n.set(t.lastSegment(),e)}P(){const t=this.v(Jr.emptyPath(),this.A);return null!=t?new li(t):this.I}v(t,e){let n=!1;const r=this.I.field(t),s=Es(r)?Object.assign({},r.mapValue.fields):{};return e.forEach(((e,r)=>{if(e instanceof Map){const i=this.v(t.child(r),e);null!=i&&(s[r]=i,n=!0)}else null!==e?(s[r]=e,n=!0):s.hasOwnProperty(r)&&(delete s[r],n=!0)})),n?{mapValue:{fields:s}}:null}}function fi(t){const e=[];return jr(t.fields||{},((t,n)=>{const r=new Jr([t]);if(Es(n)){const t=fi(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new hi(e)
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}function gi(t,e){if(t.V){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Kr(e)?"-0":e}}function mi(t){return{integerValue:""+t}}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pi{constructor(){this._=void 0}}function yi(t,e,n){return t instanceof bi?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Ei?Ii(t,e):t instanceof Ti?_i(t,e):function(t,e){const n=vi(t,e),r=Di(n)+Di(t.S);return ys(n)&&ys(t.S)?mi(r):gi(t.D,r)}(t,e)}function wi(t,e,n){return t instanceof Ei?Ii(t,e):t instanceof Ti?_i(t,e):n}function vi(t,e){return t instanceof Si?ys(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class bi extends pi{}class Ei extends pi{constructor(t){super(),this.elements=t}}function Ii(t,e){const n=Ai(e);for(const e of t.elements)n.some((t=>hs(t,e)))||n.push(e);return{arrayValue:{values:n}}}class Ti extends pi{constructor(t){super(),this.elements=t}}function _i(t,e){let n=Ai(e);for(const e of t.elements)n=n.filter((t=>!hs(t,e)));return{arrayValue:{values:n}}}class Si extends pi{constructor(t,e){super(),this.D=t,this.S=e}}function Di(t){return rs(t.integerValue||t.doubleValue)}function Ai(t){return ws(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ni{constructor(t,e){this.field=t,this.transform=e}}class xi{constructor(t,e){this.version=t,this.transformResults=e}}class Ci{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ci}static exists(t){return new Ci(void 0,t)}static updateTime(t){return new Ci(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ki(t,e){return void 0!==t.updateTime?e instanceof Ts&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e instanceof Ts}class Ri{}function Li(t,e,n){return t instanceof qi?function(t,e,n){let r=t.value;const s=Bi(t.fieldTransforms,e,n.transformResults);return r=$i(t.fieldTransforms,r,s),new Ts(t.key,n.version,r,{hasCommittedMutations:!0})}(t,e,n):t instanceof Vi?function(t,e,n){if(!ki(t.precondition,e))return new Ss(t.key,n.version);const r=Ui(t,e,Bi(t.fieldTransforms,e,n.transformResults));return new Ts(t.key,n.version,r,{hasCommittedMutations:!0})}(t,e,n):function(t,e,n){return new _s(t.key,n.version,{hasCommittedMutations:!0})}(t,0,n)}function Oi(t,e,n){return t instanceof qi?function(t,e,n){if(!ki(t.precondition,e))return e;let r=t.value;const s=ji(t.fieldTransforms,n,e);r=$i(t.fieldTransforms,r,s);const i=Fi(e);return new Ts(t.key,i,r,{hasLocalMutations:!0})}(t,e,n):t instanceof Vi?function(t,e,n){if(!ki(t.precondition,e))return e;const r=Fi(e),s=Ui(t,e,ji(t.fieldTransforms,n,e));return new Ts(t.key,r,s,{hasLocalMutations:!0})}(t,e,n):function(t,e){return ki(t.precondition,e)?new _s(t.key,ui.min()):e}(t,e)}function Mi(t,e){return function(t,e){let n=null;for(const r of t){const t=e instanceof Ts?e.field(r.field):void 0,s=vi(r.transform,t||null);null!=s&&(n=null==n?(new di).set(r.field,s):n.set(r.field,s))}return n?n.P():null}(t.fieldTransforms,e)}function Pi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&Vr(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Ei&&e instanceof Ei||t instanceof Ti&&e instanceof Ti?Vr(t.elements,e.elements,hs):t instanceof Si&&e instanceof Si?hs(t.S,e.S):t instanceof bi&&e instanceof bi}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function Fi(t){return t instanceof Ts?t.version:ui.min()}class qi extends Ri{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Vi extends Ri{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Ui(t,e,n){let r;return r=e instanceof Ts?e.data():li.empty(),r=function(t,e){const n=new di(e);return t.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=t.data.field(e);null!==r?n.set(e,r):n.delete(e)}})),n.P()}(t,r),r=$i(t.fieldTransforms,r,n),r}function Bi(t,e,n){const r=[];Or(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform;let a=null;e instanceof Ts&&(a=e.field(i.field)),r.push(wi(o,a,n[s]))}return r}function ji(t,e,n){const r=[];for(const s of t){const t=s.transform;let i=null;n instanceof Ts&&(i=n.field(s.field)),r.push(yi(t,i,e))}return r}function $i(t,e,n){const r=new di(e);for(let e=0;e<t.length;e++){const s=t[e];r.set(s.field,n[e])}return r.P()}class Gi extends Ri{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class Ki extends Ri{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class zi{constructor(t){this.count=t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Qi,Hi;function Wi(t){switch(t){case Qr.OK:return Lr();case Qr.CANCELLED:case Qr.UNKNOWN:case Qr.DEADLINE_EXCEEDED:case Qr.RESOURCE_EXHAUSTED:case Qr.INTERNAL:case Qr.UNAVAILABLE:case Qr.UNAUTHENTICATED:return!1;case Qr.INVALID_ARGUMENT:case Qr.NOT_FOUND:case Qr.ALREADY_EXISTS:case Qr.PERMISSION_DENIED:case Qr.FAILED_PRECONDITION:case Qr.ABORTED:case Qr.OUT_OF_RANGE:case Qr.UNIMPLEMENTED:case Qr.DATA_LOSS:return!0;default:return Lr()}}function Yi(t){if(void 0===t)return Cr("GRPC error has no .code"),Qr.UNKNOWN;switch(t){case Qi.OK:return Qr.OK;case Qi.CANCELLED:return Qr.CANCELLED;case Qi.UNKNOWN:return Qr.UNKNOWN;case Qi.DEADLINE_EXCEEDED:return Qr.DEADLINE_EXCEEDED;case Qi.RESOURCE_EXHAUSTED:return Qr.RESOURCE_EXHAUSTED;case Qi.INTERNAL:return Qr.INTERNAL;case Qi.UNAVAILABLE:return Qr.UNAVAILABLE;case Qi.UNAUTHENTICATED:return Qr.UNAUTHENTICATED;case Qi.INVALID_ARGUMENT:return Qr.INVALID_ARGUMENT;case Qi.NOT_FOUND:return Qr.NOT_FOUND;case Qi.ALREADY_EXISTS:return Qr.ALREADY_EXISTS;case Qi.PERMISSION_DENIED:return Qr.PERMISSION_DENIED;case Qi.FAILED_PRECONDITION:return Qr.FAILED_PRECONDITION;case Qi.ABORTED:return Qr.ABORTED;case Qi.OUT_OF_RANGE:return Qr.OUT_OF_RANGE;case Qi.UNIMPLEMENTED:return Qr.UNIMPLEMENTED;case Qi.DATA_LOSS:return Qr.DATA_LOSS;default:return Lr()}}(Hi=Qi||(Qi={}))[Hi.OK=0]="OK",Hi[Hi.CANCELLED=1]="CANCELLED",Hi[Hi.UNKNOWN=2]="UNKNOWN",Hi[Hi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Hi[Hi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Hi[Hi.NOT_FOUND=5]="NOT_FOUND",Hi[Hi.ALREADY_EXISTS=6]="ALREADY_EXISTS",Hi[Hi.PERMISSION_DENIED=7]="PERMISSION_DENIED",Hi[Hi.UNAUTHENTICATED=16]="UNAUTHENTICATED",Hi[Hi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Hi[Hi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Hi[Hi.ABORTED=10]="ABORTED",Hi[Hi.OUT_OF_RANGE=11]="OUT_OF_RANGE",Hi[Hi.UNIMPLEMENTED=12]="UNIMPLEMENTED",Hi[Hi.INTERNAL=13]="INTERNAL",Hi[Hi.UNAVAILABLE=14]="UNAVAILABLE",Hi[Hi.DATA_LOSS=15]="DATA_LOSS";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Xi{constructor(t,e){this.comparator=t,this.root=e||Zi.EMPTY}insert(t,e){return new Xi(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Zi.BLACK,null,null))}remove(t){return new Xi(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Zi.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ji(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ji(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ji(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ji(this.root,t,this.comparator,!0)}}class Ji{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Zi{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:Zi.RED,this.left=null!=r?r:Zi.EMPTY,this.right=null!=s?s:Zi.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new Zi(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Zi.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return Zi.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Zi.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Zi.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Lr();if(this.right.isRed())throw Lr();const t=this.left.check();if(t!==this.right.check())throw Lr();return t+(this.isRed()?0:1)}}Zi.EMPTY=null,Zi.RED=!0,Zi.BLACK=!1,Zi.EMPTY=new class{constructor(){this.size=0}get key(){throw Lr()}get value(){throw Lr()}get color(){throw Lr()}get left(){throw Lr()}get right(){throw Lr()}copy(t,e,n,r,s){return this}insert(t,e,n){return new Zi(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class to{constructor(t){this.comparator=t,this.data=new Xi(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new eo(this.data.getIterator())}getIteratorFrom(t){return new eo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof to))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new to(this.comparator);return e.data=t,e}}class eo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const no=new Xi(Zr.comparator);function ro(){return no}function so(){return ro()}const io=new Xi(Zr.comparator);function oo(){return io}const ao=new Xi(Zr.comparator);function co(){return ao}const uo=new to(Zr.comparator);function ho(...t){let e=uo;for(const n of t)e=e.add(n);return e}const lo=new to(qr);function fo(){return lo}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class go{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,mo.createSynthesizedTargetChangeForCurrentChange(t,e)),new go(ui.min(),n,fo(),ro(),ho())}}class mo{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e){return new mo(ts.EMPTY_BYTE_STRING,e,ho(),ho(),ho())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class po{constructor(t,e,n,r){this.C=t,this.removedTargetIds=e,this.key=n,this.N=r}}class yo{constructor(t,e){this.targetId=t,this.$=e}}class wo{constructor(t,e,n=ts.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class vo{constructor(){this.O=0,this.k=Io(),this.M=ts.EMPTY_BYTE_STRING,this.F=!1,this.L=!0}get current(){return this.F}get resumeToken(){return this.M}get B(){return 0!==this.O}get q(){return this.L}U(t){t.approximateByteSize()>0&&(this.L=!0,this.M=t)}K(){let t=ho(),e=ho(),n=ho();return this.k.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Lr()}})),new mo(this.M,this.F,t,e,n)}W(){this.L=!1,this.k=Io()}j(t,e){this.L=!0,this.k=this.k.insert(t,e)}G(t){this.L=!0,this.k=this.k.remove(t)}H(){this.O+=1}J(){this.O-=1}Y(){this.L=!0,this.F=!0}}class bo{constructor(t){this.X=t,this.Z=new Map,this.tt=ro(),this.et=Eo(),this.nt=new to(qr)}st(t){for(const e of t.C)t.N instanceof Ts?this.it(e,t.N):t.N instanceof _s&&this.rt(e,t.key,t.N);for(const e of t.removedTargetIds)this.rt(e,t.key,t.N)}ot(t){this.forEachTarget(t,(e=>{const n=this.ct(e);switch(t.state){case 0:this.at(e)&&n.U(t.resumeToken);break;case 1:n.J(),n.B||n.W(),n.U(t.resumeToken);break;case 2:n.J(),n.B||this.removeTarget(e);break;case 3:this.at(e)&&(n.Y(),n.U(t.resumeToken));break;case 4:this.at(e)&&(this.ut(e),n.U(t.resumeToken));break;default:Lr()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Z.forEach(((t,n)=>{this.at(n)&&e(n)}))}ht(t){const e=t.targetId,n=t.$.count,r=this.lt(e);if(r){const t=r.target;if(Cs(t))if(0===n){const n=new Zr(t.path);this.rt(e,n,new _s(n,ui.min()))}else Or(1===n);else this.ft(e)!==n&&(this.ut(e),this.nt=this.nt.add(e))}}dt(t){const e=new Map;this.Z.forEach(((n,r)=>{const s=this.lt(r);if(s){if(n.current&&Cs(s.target)){const e=new Zr(s.target.path);null!==this.tt.get(e)||this.wt(r,e)||this.rt(r,e,new _s(e,t))}n.q&&(e.set(r,n.K()),n.W())}}));let n=ho();this.et.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.lt(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new go(t,e,this.nt,this.tt,n);return this.tt=ro(),this.et=Eo(),this.nt=new to(qr),r}it(t,e){if(!this.at(t))return;const n=this.wt(t,e.key)?2:0;this.ct(t).j(e.key,n),this.tt=this.tt.insert(e.key,e),this.et=this.et.insert(e.key,this._t(e.key).add(t))}rt(t,e,n){if(!this.at(t))return;const r=this.ct(t);this.wt(t,e)?r.j(e,1):r.G(e),this.et=this.et.insert(e,this._t(e).delete(t)),n&&(this.tt=this.tt.insert(e,n))}removeTarget(t){this.Z.delete(t)}ft(t){const e=this.ct(t).K();return this.X.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}H(t){this.ct(t).H()}ct(t){let e=this.Z.get(t);return e||(e=new vo,this.Z.set(t,e)),e}_t(t){let e=this.et.get(t);return e||(e=new to(qr),this.et=this.et.insert(t,e)),e}at(t){const e=null!==this.lt(t);return e||xr("WatchChangeAggregator","Detected inactive target",t),e}lt(t){const e=this.Z.get(t);return e&&e.B?null:this.X.gt(t)}ut(t){this.Z.set(t,new vo),this.X.getRemoteKeysForTarget(t).forEach((e=>{this.rt(t,e,null)}))}wt(t,e){return this.X.getRemoteKeysForTarget(t).has(e)}}function Eo(){return new Xi(Zr.comparator)}function Io(){return new Xi(Zr.comparator)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const To={asc:"ASCENDING",desc:"DESCENDING"},_o={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class So{constructor(t,e){this.databaseId=t,this.V=e}}function Do(t,e){return t.V?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ao(t,e){return t.V?e.toBase64():e.toUint8Array()}function No(t,e){return Do(t,e.toTimestamp())}function xo(t){return Or(!!t),ui.fromTimestamp(function(t){const e=ns(t);return new is(e.seconds,e.nanos)}(t))}function Co(t,e){return function(t){return new Yr(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function ko(t){const e=Yr.fromString(t);return Or(ea(e)),e}function Ro(t,e){return Co(t.databaseId,e.path)}function Lo(t,e){const n=ko(e);if(n.get(1)!==t.databaseId.projectId)throw new Hr(Qr.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Hr(Qr.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Zr(Fo(n))}function Oo(t,e){return Co(t.databaseId,e)}function Mo(t){const e=ko(t);return 4===e.length?Yr.emptyPath():Fo(e)}function Po(t){return new Yr(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Fo(t){return Or(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function qo(t,e,n){return{name:Ro(t,e),fields:n.proto.mapValue.fields}}function Vo(t,e,n){const r=Lo(t,e.name),s=xo(e.updateTime),i=new li({mapValue:{fields:e.fields}});return new Ts(r,s,i,{hasCommittedMutations:!!n})}function Uo(t,e){let n;if(e instanceof qi)n={update:qo(t,e.key,e.value)};else if(e instanceof Gi)n={delete:Ro(t,e.key)};else if(e instanceof Vi)n={update:qo(t,e.key,e.data),updateMask:ta(e.fieldMask)};else{if(!(e instanceof Ki))return Lr();n={verify:Ro(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof bi)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ei)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ti)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Si)return{fieldPath:e.field.canonicalString(),increment:n.S};throw Lr()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:No(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:Lr()}(t,e.precondition)),n}function Bo(t,e){const n=e.currentDocument?function(t){return void 0!==t.updateTime?Ci.updateTime(xo(t.updateTime)):void 0!==t.exists?Ci.exists(t.exists):Ci.none()}(e.currentDocument):Ci.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)Or("REQUEST_TIME"===e.setToServerValue),n=new bi;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Ei(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Ti(t)}else"increment"in e?n=new Si(t,e.increment):Lr();const r=Jr.fromServerFormat(e.fieldPath);return new Ni(r,n)}(t,e))):[];if(e.update){e.update.name;const s=Lo(t,e.update.name),i=new li({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new hi(e.map((t=>Jr.fromServerFormat(t))))}(e.updateMask);return new Vi(s,i,t,n,r)}return new qi(s,i,n,r)}if(e.delete){const r=Lo(t,e.delete);return new Gi(r,n)}if(e.verify){const r=Lo(t,e.verify);return new Ki(r,n)}return Lr()}function jo(t,e){return{documents:[Oo(t,e.path)]}}function $o(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Oo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Oo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(bs(t.value))return{unaryFilter:{field:Yo(t.field),op:"IS_NAN"}};if(vs(t.value))return{unaryFilter:{field:Yo(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(bs(t.value))return{unaryFilter:{field:Yo(t.field),op:"IS_NOT_NAN"}};if(vs(t.value))return{unaryFilter:{field:Yo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yo(t.field),op:Wo(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>function(t){return{field:Yo(t.field),direction:Ho(t.dir)}}(t)))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(t,e){return t.V||Gr(e)?e:{value:e}}(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=zo(e.startAt)),e.endAt&&(n.structuredQuery.endAt=zo(e.endAt)),n}function Go(t){let e=Mo(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Or(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=Ko(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>function(t){return new js(Xo(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,Gr(e)?null:e}(n.limit));let c=null;n.startAt&&(c=Qo(n.startAt));let u=null;return n.endAt&&(u=Qo(n.endAt)),Qs(e,s,o,i,a,"F",c,u)}function Ko(t){return t?void 0!==t.unaryFilter?[Zo(t)]:void 0!==t.fieldFilter?[Jo(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Ko(t))).reduce(((t,e)=>t.concat(e))):Lr():[]}function zo(t){return{before:t.before,values:t.position}}function Qo(t){const e=!!t.before,n=t.values||[];return new Us(n,e)}function Ho(t){return To[t]}function Wo(t){return _o[t]}function Yo(t){return{fieldPath:t.canonicalString()}}function Xo(t){return Jr.fromServerFormat(t.fieldPath)}function Jo(t){return ks.create(Xo(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Lr()}}(t.fieldFilter.op),t.fieldFilter.value)}function Zo(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Xo(t.unaryFilter.field);return ks.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Xo(t.unaryFilter.field);return ks.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Xo(t.unaryFilter.field);return ks.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Xo(t.unaryFilter.field);return ks.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Lr()}}function ta(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function ea(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function na(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=sa(e)),e=ra(t.get(n),e);return sa(e)}function ra(t,e){let n=e;const r=t.length;for(let e=0;e<r;e++){const r=t.charAt(e);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function sa(t){return t+""}function ia(t){const e=t.length;if(Or(e>=2),2===e)return Or(""===t.charAt(0)&&""===t.charAt(1)),Yr.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const e=t.indexOf("",i);switch((e<0||e>n)&&Lr(),t.charAt(e+1)){case"":const n=t.substring(i,e);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=t.substring(i,e),s+="\0";break;case"":s+=t.substring(i,e+1);break;default:Lr()}i=e+2}return new Yr(r)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class oa{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class aa{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}aa.store="owner",aa.key="owner";class ca{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}ca.store="mutationQueues",ca.keyPath="userId";class ua{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}ua.store="mutations",ua.keyPath="batchId",ua.userMutationsIndex="userMutationsIndex",ua.userMutationsKeyPath=["userId","batchId"];class ha{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,na(e)]}static key(t,e,n){return[t,na(e),n]}}ha.store="documentMutations",ha.PLACEHOLDER=new ha;class la{constructor(t,e){this.path=t,this.readTime=e}}class da{constructor(t,e){this.path=t,this.version=e}}class fa{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}fa.store="remoteDocuments",fa.readTimeIndex="readTimeIndex",fa.readTimeIndexPath="readTime",fa.collectionReadTimeIndex="collectionReadTimeIndex",fa.collectionReadTimeIndexPath=["parentPath","readTime"];class ga{constructor(t){this.byteSize=t}}ga.store="remoteDocumentGlobal",ga.key="remoteDocumentGlobalKey";class ma{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}ma.store="targets",ma.keyPath="targetId",ma.queryTargetsIndexName="queryTargetsIndex",ma.queryTargetsKeyPath=["canonicalId","targetId"];class pa{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}pa.store="targetDocuments",pa.keyPath=["targetId","path"],pa.documentTargetsIndex="documentTargetsIndex",pa.documentTargetsKeyPath=["path","targetId"];class ya{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}ya.key="targetGlobalKey",ya.store="targetGlobal";class wa{constructor(t,e){this.collectionId=t,this.parent=e}}wa.store="collectionParents",wa.keyPath=["collectionId","parent"];class va{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}va.store="clientMetadata",va.keyPath="clientId";class ba{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}ba.store="bundles",ba.keyPath="bundleId";class Ea{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}Ea.store="namedQueries",Ea.keyPath="name";const Ia=[ca.store,ua.store,ha.store,fa.store,ma.store,aa.store,ya.store,pa.store,va.store,ga.store,wa.store,ba.store,Ea.store],Ta="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _a{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Sa{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Da{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Lr(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Da(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Da?e:Da.resolve(e)}catch(t){return Da.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Da.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Da.reject(e)}static resolve(t){return new Da(((e,n)=>{e(t)}))}static reject(t){return new Da(((e,n)=>{n(t)}))}static waitFor(t){return new Da(((e,n)=>{let r=0,s=0,i=!1;t.forEach((t=>{++r,t.next((()=>{++s,i&&s===r&&e()}),(t=>n(t)))})),i=!0,s===r&&e()}))}static or(t){let e=Da.resolve(!1);for(const n of t)e=e.next((t=>t?Da.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Aa{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.yt=new Sa,this.transaction.oncomplete=()=>{this.yt.resolve()},this.transaction.onabort=()=>{e.error?this.yt.reject(new Ca(t,e.error)):this.yt.resolve()},this.transaction.onerror=e=>{const n=Ma(e.target.error);this.yt.reject(new Ca(t,n))}}static open(t,e,n,r){try{return new Aa(e,t.transaction(r,n))}catch(t){throw new Ca(e,t)}}get Et(){return this.yt.promise}abort(t){t&&this.yt.reject(t),this.aborted||(xr("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Ra(e)}}class Na{constructor(t,e,n){this.name=t,this.version=e,this.Tt=n,12.2===Na.It(o())&&Cr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return xr("SimpleDb","Removing database:",t),La(window.indexedDB.deleteDatabase(t)).toPromise()}static At(){if("undefined"==typeof indexedDB)return!1;if(Na.Rt())return!0;const t=o(),e=Na.It(t),n=0<e&&e<10,r=Na.Pt(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static Rt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.bt)}static vt(t,e){return t.store(e)}static It(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Pt(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async Vt(t){return this.db||(xr("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new Ca(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Hr(Qr.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new Ca(t,r))},r.onupgradeneeded=t=>{xr("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.Tt.St(e,r.transaction,t.oldVersion,this.version).next((()=>{xr("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Dt&&(this.db.onversionchange=t=>this.Dt(t)),this.db}Ct(t){this.Dt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.Vt(t);const e=Aa.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),Da.reject(t)))).toPromise();return i.catch((()=>{})),await e.Et,i}catch(t){const e="FirebaseError"!==t.name&&i<3;if(xr("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class xa{constructor(t){this.Nt=t,this.xt=!1,this.$t=null}get isDone(){return this.xt}get Ot(){return this.$t}set cursor(t){this.Nt=t}done(){this.xt=!0}kt(t){this.$t=t}delete(){return La(this.Nt.delete())}}class Ca extends Hr{constructor(t,e){super(Qr.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function ka(t){return"IndexedDbTransactionError"===t.name}class Ra{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(xr("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(xr("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),La(n)}add(t){return xr("SimpleDb","ADD",this.store.name,t,t),La(this.store.add(t))}get(t){return La(this.store.get(t)).next((e=>(void 0===e&&(e=null),xr("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return xr("SimpleDb","DELETE",this.store.name,t),La(this.store.delete(t))}count(){return xr("SimpleDb","COUNT",this.store.name),La(this.store.count())}Mt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.Ft(n,((t,e)=>{r.push(e)})).next((()=>r))}Lt(t,e){xr("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.Bt=!1;const r=this.cursor(n);return this.Ft(r,((t,e,n)=>n.delete()))}qt(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.Ft(r,e)}Ut(t){const e=this.cursor({});return new Da(((n,r)=>{e.onerror=t=>{const e=Ma(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}Ft(t,e){const n=[];return new Da(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new xa(s),o=e(s.primaryKey,s.value,i);if(o instanceof Da){const t=o.catch((t=>(i.done(),Da.reject(t))));n.push(t)}i.isDone?r():null===i.Ot?s.continue():s.continue(i.Ot)}})).next((()=>Da.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Bt?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function La(t){return new Da(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Ma(t.target.error);n(e)}}))}let Oa=!1;function Ma(t){const e=Na.It(o());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Hr("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Oa||(Oa=!0,setTimeout((()=>{throw t}),0)),t}}return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Pa extends _a{constructor(t,e){super(),this.Kt=t,this.currentSequenceNumber=e}}function Fa(t,e){const n=Mr(t);return Na.vt(n.Kt,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class qa{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e,n){const r=n.mutationResults;for(let n=0;n<this.mutations.length;n++){const s=this.mutations[n];s.key.isEqual(t)&&(e=Li(s,e,r[n]))}return e}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t)&&(e=Oi(n,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t)&&(e=Oi(n,e,this.localWriteTime));return e}applyToLocalDocumentSet(t){let e=t;return this.mutations.forEach((n=>{const r=this.applyToLocalView(n.key,t.get(n.key));r&&(e=e.insert(n.key,r))})),e}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),ho())}isEqual(t){return this.batchId===t.batchId&&Vr(this.mutations,t.mutations,((t,e)=>Pi(t,e)))&&Vr(this.baseMutations,t.baseMutations,((t,e)=>Pi(t,e)))}}class Va{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){Or(t.mutations.length===n.length);let r=co();const s=t.mutations;for(let t=0;t<s.length;t++)r=r.insert(s[t].key,n[t].version);return new Va(t,e,n,r)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ua{constructor(t,e,n,r,s=ui.min(),i=ui.min(),o=ts.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new Ua(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new Ua(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new Ua(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ba{constructor(t){this.Qt=t}}function ja(t,e){if(e.document)return Vo(t.Qt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=Zr.fromSegments(e.noDocument.path),n=Qa(e.noDocument.readTime);return new _s(t,n,{hasCommittedMutations:!!e.hasCommittedMutations})}if(e.unknownDocument){const t=Zr.fromSegments(e.unknownDocument.path),n=Qa(e.unknownDocument.version);return new Ss(t,n)}return Lr()}function $a(t,e,n){const r=Ga(n),s=e.key.path.popLast().toArray();if(e instanceof Ts){const n=function(t,e){return{name:Ro(t,e.key),fields:e.toProto().mapValue.fields,updateTime:Do(t,e.version.toTimestamp())}}(t.Qt,e),i=e.hasCommittedMutations;return new fa(null,null,n,i,r,s)}if(e instanceof _s){const t=e.key.path.toArray(),n=za(e.version),i=e.hasCommittedMutations;return new fa(null,new la(t,n),null,i,r,s)}if(e instanceof Ss){const t=e.key.path.toArray(),n=za(e.version);return new fa(new da(t,n),null,null,!0,r,s)}return Lr()}function Ga(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ka(t){const e=new is(t[0],t[1]);return ui.fromTimestamp(e)}function za(t){const e=t.toTimestamp();return new oa(e.seconds,e.nanoseconds)}function Qa(t){const e=new is(t.seconds,t.nanoseconds);return ui.fromTimestamp(e)}function Ha(t,e){const n=(e.baseMutations||[]).map((e=>Bo(t.Qt,e)));for(let t=0;t<e.mutations.length-1;++t){const n=e.mutations[t];if(t+1<e.mutations.length&&void 0!==e.mutations[t+1].transform){const r=e.mutations[t+1];n.updateTransforms=r.transform.fieldTransforms,e.mutations.splice(t+1,1),++t}}const r=e.mutations.map((e=>Bo(t.Qt,e))),s=is.fromMillis(e.localWriteTimeMs);return new qa(e.batchId,s,n,r)}function Wa(t){const e=Qa(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?Qa(t.lastLimboFreeSnapshotVersion):ui.min();let r;var s;return void 0!==t.query.documents?(Or(1===(s=t.query).documents.length),r=ei(Hs(Mo(s.documents[0])))):r=function(t){return ei(Go(t))}(t.query),new Ua(r,t.targetId,0,t.lastListenSequenceNumber,e,n,ts.fromBase64String(t.resumeToken))}function Ya(t,e){const n=za(e.snapshotVersion),r=za(e.lastLimboFreeSnapshotVersion);let s;s=Cs(e.target)?jo(t.Qt,e.target):$o(t.Qt,e.target);const i=e.resumeToken.toBase64();return new ma(e.targetId,Ns(e.target),n,i,e.sequenceNumber,r,s)}function Xa(t){const e=Go({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?ni(e,e.limit,"L"):e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ja{getBundleMetadata(t,e){return Za(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:Qa(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return Za(t).put({bundleId:(n=e).id,createTime:za(xo(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return tc(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:Xa(e.bundledQuery),readTime:Qa(e.readTime)};var e}))}saveNamedQuery(t,e){return tc(t).put(function(t){return{name:t.name,readTime:za(xo(t.readTime)),bundledQuery:t.bundledQuery}}(e))}}function Za(t){return Fa(t,ba.store)}function tc(t){return Fa(t,Ea.store)}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ec{constructor(){this.Wt=new nc}addToCollectionParentIndex(t,e){return this.Wt.add(e),Da.resolve()}getCollectionParents(t,e){return Da.resolve(this.Wt.getEntries(e))}}class nc{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new to(Yr.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new to(Yr.comparator)).toArray()}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class rc{constructor(){this.jt=new nc}addToCollectionParentIndex(t,e){if(!this.jt.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.jt.add(e)}));const s={collectionId:n,parent:na(r)};return sc(t).put(s)}return Da.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Ur(e),""],!1,!0);return sc(t).Mt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(ia(r.parent))}return n}))}}function sc(t){return Fa(t,wa.store)}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const ic={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class oc{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new oc(t,oc.DEFAULT_COLLECTION_PERCENTILE,oc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ac(t,e,n){const r=t.store(ua.store),s=t.store(ha.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.qt({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{Or(1===a)})));const u=[];for(const t of n.mutations){const r=ha.key(e,t.key.path,n.batchId);i.push(s.delete(r)),u.push(t.key)}return Da.waitFor(i).next((()=>u))}function cc(t){let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Lr();e=t.noDocument}return JSON.stringify(e).length}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */oc.DEFAULT_COLLECTION_PERCENTILE=10,oc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,oc.DEFAULT=new oc(41943040,oc.DEFAULT_COLLECTION_PERCENTILE,oc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),oc.DISABLED=new oc(-1,0,0);class uc{constructor(t,e,n,r){this.userId=t,this.D=e,this.Gt=n,this.referenceDelegate=r,this.zt={}}static Ht(t,e,n,r){Or(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new uc(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return lc(t).qt({index:ua.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=dc(t),i=lc(t);return i.add({}).next((o=>{Or("number"==typeof o);const a=new qa(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>Uo(t.Qt,e))),s=n.mutations.map((e=>Uo(t.Qt,e)));return new ua(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.D,this.userId,a),u=[];let h=new to(((t,e)=>qr(t.canonicalString(),e.canonicalString())));for(const t of r){const e=ha.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,ha.PLACEHOLDER))}return h.forEach((e=>{u.push(this.Gt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.zt[o]=a.keys()})),Da.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return lc(t).get(e).next((t=>t?(Or(t.userId===this.userId),Ha(this.D,t)):null))}Jt(t,e){return this.zt[e]?Da.resolve(this.zt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.zt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return lc(t).qt({index:ua.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(Or(e.batchId>=n),s=Ha(this.D,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return lc(t).qt({index:ua.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return lc(t).Mt(ua.userMutationsIndex,e).next((t=>t.map((t=>Ha(this.D,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=ha.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return dc(t).qt({range:r},((n,r,i)=>{const[o,a,c]=n,u=ia(a);if(o===this.userId&&e.path.isEqual(u))return lc(t).get(c).next((t=>{if(!t)throw Lr();Or(t.userId===this.userId),s.push(Ha(this.D,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new to(qr);const r=[];return e.forEach((e=>{const s=ha.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=dc(t).qt({range:i},((t,r,s)=>{const[i,o,a]=t,c=ia(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),Da.waitFor(r).next((()=>this.Yt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=ha.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new to(qr);return dc(t).qt({range:i},((t,e,s)=>{const[i,a,c]=t,u=ia(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Yt(t,o)))}Yt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(lc(t).get(e).next((t=>{if(null===t)throw Lr();Or(t.userId===this.userId),n.push(Ha(this.D,t))})))})),Da.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return ac(t.Kt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Xt(e.batchId)})),Da.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Xt(t){delete this.zt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return Da.resolve();const n=IDBKeyRange.lowerBound(ha.prefixForUser(this.userId)),r=[];return dc(t).qt({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=ia(t[1]);r.push(e)}else n.done()})).next((()=>{Or(0===r.length)}))}))}containsKey(t,e){return hc(t,this.userId,e)}Zt(t){return fc(t).get(this.userId).next((t=>t||new ca(this.userId,-1,"")))}}function hc(t,e,n){const r=ha.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return dc(t).qt({range:i,Bt:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function lc(t){return Fa(t,ua.store)}function dc(t){return Fa(t,ha.store)}function fc(t){return Fa(t,ca.store)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class gc{constructor(t){this.te=t}next(){return this.te+=2,this.te}static ee(){return new gc(0)}static ne(){return new gc(-1)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class mc{constructor(t,e){this.referenceDelegate=t,this.D=e}allocateTargetId(t){return this.se(t).next((e=>{const n=new gc(e.highestTargetId);return e.highestTargetId=n.next(),this.ie(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.se(t).next((t=>ui.fromTimestamp(new is(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.se(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.se(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.ie(t,r))))}addTargetData(t,e){return this.re(t,e).next((()=>this.se(t).next((n=>(n.targetCount+=1,this.oe(e,n),this.ie(t,n))))))}updateTargetData(t,e){return this.re(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>pc(t).delete(e.targetId))).next((()=>this.se(t))).next((e=>(Or(e.targetCount>0),e.targetCount-=1,this.ie(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return pc(t).qt(((i,o)=>{const a=Wa(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>Da.waitFor(s))).next((()=>r))}forEachTarget(t,e){return pc(t).qt(((t,n)=>{const r=Wa(n);e(r)}))}se(t){return yc(t).get(ya.key).next((t=>(Or(null!==t),t)))}ie(t,e){return yc(t).put(ya.key,e)}re(t,e){return pc(t).put(Ya(this.D,e))}oe(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.se(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Ns(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return pc(t).qt({range:r,index:ma.queryTargetsIndexName},((t,n,r)=>{const i=Wa(n);xs(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=wc(t);return e.forEach((e=>{const i=na(e.path);r.push(s.put(new pa(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),Da.waitFor(r)}removeMatchingKeys(t,e,n){const r=wc(t);return Da.forEach(e,(e=>{const s=na(e.path);return Da.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=wc(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=wc(t);let s=ho();return r.qt({range:n,Bt:!0},((t,e,n)=>{const r=ia(t[1]),i=new Zr(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=na(e.path),r=IDBKeyRange.bound([n],[Ur(n)],!1,!0);let s=0;return wc(t).qt({index:pa.documentTargetsIndex,Bt:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}gt(t,e){return pc(t).get(e).next((t=>t?Wa(t):null))}}function pc(t){return Fa(t,ma.store)}function yc(t){return Fa(t,ya.store)}function wc(t){return Fa(t,pa.store)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function vc(t){if(t.code!==Qr.FAILED_PRECONDITION||t.message!==Ta)throw t;xr("LocalStore","Unexpectedly lost primary lease")}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function bc([t,e],[n,r]){const s=qr(t,n);return 0===s?qr(e,r):s}class Ec{constructor(t){this.ce=t,this.buffer=new to(bc),this.ae=0}ue(){return++this.ae}he(t){const e=[t,this.ue()];if(this.buffer.size<this.ce)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();bc(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ic{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.le=!1,this.fe=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.de(t)}stop(){this.fe&&(this.fe.cancel(),this.fe=null)}get started(){return null!==this.fe}de(t){const e=this.le?3e5:6e4;xr("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.fe=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.fe=null,this.le=!0;try{await t.collectGarbage(this.garbageCollector)}catch(t){ka(t)?xr("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await vc(t)}await this.de(t)}))}}class Tc{constructor(t,e){this.we=t,this.params=e}calculateTargetCount(t,e){return this.we._e(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return Da.resolve(Dr.o);const n=new Ec(e);return this.we.forEachTarget(t,(t=>n.he(t.sequenceNumber))).next((()=>this.we.me(t,(t=>n.he(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.we.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.we.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(xr("LruGarbageCollector","Garbage collection skipped; disabled"),Da.resolve(ic)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(xr("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ic):this.ge(t,e)))}getCacheSize(t){return this.we.getCacheSize(t)}ge(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(xr("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Nr()<=l.DEBUG&&xr("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${t} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),Da.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _c{constructor(t,e){this.db=t,this.garbageCollector=function(t,e){return new Tc(t,e)}(this,e)}_e(t){const e=this.ye(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}ye(t){let e=0;return this.me(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}me(t,e){return this.pe(t,((t,n)=>e(n)))}addReference(t,e,n){return Sc(t,n)}removeReference(t,e,n){return Sc(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Sc(t,e)}Ee(t,e){return function(t,e){let n=!1;return fc(t).Ut((r=>hc(t,r,e).next((t=>(t&&(n=!0),Da.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.pe(t,((i,o)=>{if(o<=e){const e=this.Ee(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),wc(t).delete([0,na(i.path)]))))}));r.push(e)}})).next((()=>Da.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Sc(t,e)}pe(t,e){const n=wc(t);let r,s=Dr.o;return n.qt({index:pa.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Dr.o&&e(new Zr(ia(r)),s),s=o,r=i):s=Dr.o})).next((()=>{s!==Dr.o&&e(new Zr(ia(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Sc(t,e){return wc(t).put(function(t,e){return new pa(0,na(t.path),e)}(e,t.currentSequenceNumber))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Dc{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,r]of n)if(this.equalsFn(e,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){jr(this.inner,((e,n)=>{for(const[e,r]of n)t(e,r)}))}isEmpty(){return $r(this.inner)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ac{constructor(){this.changes=new Dc((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:ui.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{maybeDocument:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{maybeDocument:null,readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Da.resolve(n.maybeDocument):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Nc{constructor(t,e){this.D=t,this.Gt=e}addEntry(t,e,n){return kc(t).put(Rc(e),n)}removeEntry(t,e){const n=kc(t),r=Rc(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.Te(t,n))))}getEntry(t,e){return kc(t).get(Rc(e)).next((t=>this.Ie(t)))}Ae(t,e){return kc(t).get(Rc(e)).next((t=>{const e=this.Ie(t);return e?{maybeDocument:e,size:cc(t)}:null}))}getEntries(t,e){let n=so();return this.Re(t,e,((t,e)=>{const r=this.Ie(e);n=n.insert(t,r)})).next((()=>n))}Pe(t,e){let n=so(),r=new Xi(Zr.comparator);return this.Re(t,e,((t,e)=>{const s=this.Ie(e);s?(n=n.insert(t,s),r=r.insert(t,cc(e))):(n=n.insert(t,null),r=r.insert(t,0))})).next((()=>({be:n,ve:r})))}Re(t,e,n){if(e.isEmpty())return Da.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return kc(t).qt({range:r},((t,e,r)=>{const o=Zr.fromSegments(t);for(;i&&Zr.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.kt(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=oo();const s=e.path.length+1,i={};if(n.isEqual(ui.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Ga(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=fa.collectionReadTimeIndex}return kc(t).qt(i,((t,n,i)=>{if(t.length!==s)return;const o=ja(this.D,n);e.path.isPrefixOf(o.key.path)?o instanceof Ts&&oi(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new xc(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return Cc(t).get(ga.key).next((t=>(Or(!!t),t)))}Te(t,e){return Cc(t).put(ga.key,e)}Ie(t){if(t){const e=ja(this.D,t);return e instanceof _s&&e.version.isEqual(ui.min())?null:e}return null}}class xc extends Ac{constructor(t,e){super(),this.Ve=t,this.trackRemovals=e,this.Se=new Dc((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new to(((t,e)=>qr(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Se.get(s);if(i.maybeDocument){const a=$a(this.Ve.D,i.maybeDocument,this.getReadTime(s));r=r.add(s.path.popLast());const c=cc(a);n+=c-o,e.push(this.Ve.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=$a(this.Ve.D,new _s(s,ui.min()),this.getReadTime(s));e.push(this.Ve.addEntry(t,s,n))}else e.push(this.Ve.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ve.Gt.addToCollectionParentIndex(t,n))})),e.push(this.Ve.updateMetadata(t,n)),Da.waitFor(e)}getFromCache(t,e){return this.Ve.Ae(t,e).next((t=>null===t?(this.Se.set(e,0),null):(this.Se.set(e,t.size),t.maybeDocument)))}getAllFromCache(t,e){return this.Ve.Pe(t,e).next((({be:t,ve:e})=>(e.forEach(((t,e)=>{this.Se.set(t,e)})),t)))}}function Cc(t){return Fa(t,ga.store)}function kc(t){return Fa(t,fa.store)}function Rc(t){return t.path.toArray()}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Lc{constructor(t){this.D=t}St(t,e,n,r){Or(n<r&&n>=0&&r<=11);const s=new Aa("createOrUpgrade",e);n<1&&r>=1&&(function(t){t.createObjectStore(aa.store)}(t),function(t){t.createObjectStore(ca.store,{keyPath:ca.keyPath}),t.createObjectStore(ua.store,{keyPath:ua.keyPath,autoIncrement:!0}).createIndex(ua.userMutationsIndex,ua.userMutationsKeyPath,{unique:!0}),t.createObjectStore(ha.store)}(t),Oc(t),function(t){t.createObjectStore(fa.store)}(t));let i=Da.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(pa.store),t.deleteObjectStore(ma.store),t.deleteObjectStore(ya.store)}(t),Oc(t)),i=i.next((()=>function(t){const e=t.store(ya.store),n=new ya(0,0,ui.min().toTimestamp(),0);return e.put(ya.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(ua.store).Mt().next((n=>{t.deleteObjectStore(ua.store),t.createObjectStore(ua.store,{keyPath:ua.keyPath,autoIncrement:!0}).createIndex(ua.userMutationsIndex,ua.userMutationsKeyPath,{unique:!0});const r=e.store(ua.store),s=n.map((t=>r.put(t)));return Da.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(va.store,{keyPath:va.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.De(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(ga.store)}(t),this.Ce(s))))),n<7&&r>=7&&(i=i.next((()=>this.Ne(s)))),n<8&&r>=8&&(i=i.next((()=>this.xe(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(fa.store);e.createIndex(fa.readTimeIndex,fa.readTimeIndexPath,{unique:!1}),e.createIndex(fa.collectionReadTimeIndex,fa.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.$e(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(ba.store,{keyPath:ba.keyPath})}(t),function(t){t.createObjectStore(Ea.store,{keyPath:Ea.keyPath})}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)}))),i}Ce(t){let e=0;return t.store(fa.store).qt(((t,n)=>{e+=cc(n)})).next((()=>{const n=new ga(e);return t.store(ga.store).put(ga.key,n)}))}De(t){const e=t.store(ca.store),n=t.store(ua.store);return e.Mt().next((e=>Da.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Mt(ua.userMutationsIndex,r).next((n=>Da.forEach(n,(n=>{Or(n.userId===e.userId);const r=Ha(this.D,n);return ac(t,e.userId,r).next((()=>{}))}))))}))))}Ne(t){const e=t.store(pa.store),n=t.store(fa.store);return t.store(ya.store).get(ya.key).next((t=>{const r=[];return n.qt(((n,s)=>{const i=new Yr(n),o=function(t){return[0,na(t)]}(i);r.push(e.get(o).next((n=>n?Da.resolve():(n=>e.put(new pa(0,na(n),t.highestListenSequenceNumber)))(i))))})).next((()=>Da.waitFor(r)))}))}xe(t,e){t.createObjectStore(wa.store,{keyPath:wa.keyPath});const n=e.store(wa.store),r=new nc,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:na(r)})}};return e.store(fa.store).qt({Bt:!0},((t,e)=>{const n=new Yr(t);return s(n.popLast())})).next((()=>e.store(ha.store).qt({Bt:!0},(([t,e,n],r)=>{const i=ia(e);return s(i.popLast())}))))}$e(t){const e=t.store(ma.store);return e.qt(((t,n)=>{const r=Wa(n),s=Ya(this.D,r);return e.put(s)}))}}function Oc(t){t.createObjectStore(pa.store,{keyPath:pa.keyPath}).createIndex(pa.documentTargetsIndex,pa.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(ma.store,{keyPath:ma.keyPath}).createIndex(ma.queryTargetsIndexName,ma.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(ya.store)}const Mc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Pc{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Oe=s,this.window=i,this.document=o,this.ke=c,this.Me=u,this.Fe=null,this.Le=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Be=null,this.inForeground=!1,this.qe=null,this.Ue=null,this.Ke=Number.NEGATIVE_INFINITY,this.Qe=t=>Promise.resolve(),!Pc.At())throw new Hr(Qr.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new _c(this,r),this.We=e+"main",this.D=new Ba(a),this.je=new Na(this.We,11,new Lc(this.D)),this.Ge=new mc(this.referenceDelegate,this.D),this.Gt=new rc,this.ze=function(t,e){return new Nc(t,e)}(this.D,this.Gt),this.He=new Ja,this.window&&this.window.localStorage?this.Je=this.window.localStorage:(this.Je=null,!1===u&&Cr("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ye().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Hr(Qr.FAILED_PRECONDITION,Mc);return this.Xe(),this.Ze(),this.tn(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ge.getHighestSequenceNumber(t)))})).then((t=>{this.Fe=new Dr(t,this.ke)})).then((()=>{this.Le=!0})).catch((t=>(this.je&&this.je.close(),Promise.reject(t))))}en(t){return this.Qe=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.je.Ct((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Oe.enqueueAndForget((async()=>{this.started&&await this.Ye()})))}Ye(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>qc(t).put(new va(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.nn(t).next((t=>{t||(this.isPrimary=!1,this.Oe.enqueueRetryable((()=>this.Qe(!1))))}))})).next((()=>this.sn(t))).next((e=>this.isPrimary&&!e?this.rn(t).next((()=>!1)):!!e&&this.on(t).next((()=>!0)))))).catch((t=>{if(ka(t))return xr("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return xr("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Oe.enqueueRetryable((()=>this.Qe(t))),this.isPrimary=t}))}nn(t){return Fc(t).get(aa.key).next((t=>Da.resolve(this.cn(t))))}an(t){return qc(t).delete(this.clientId)}async un(){if(this.isPrimary&&!this.hn(this.Ke,18e5)){this.Ke=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Fa(t,va.store);return e.Mt().next((t=>{const n=this.ln(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return Da.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Je)for(const e of t)this.Je.removeItem(this.fn(e.clientId))}}tn(){this.Ue=this.Oe.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Ye().then((()=>this.un())).then((()=>this.tn()))))}cn(t){return!!t&&t.ownerId===this.clientId}sn(t){return this.Me?Da.resolve(!0):Fc(t).get(aa.key).next((e=>{if(null!==e&&this.hn(e.leaseTimestampMs,5e3)&&!this.dn(e.ownerId)){if(this.cn(e)&&this.networkEnabled)return!0;if(!this.cn(e)){if(!e.allowTabSynchronization)throw new Hr(Qr.FAILED_PRECONDITION,Mc);return!1}}return!(!this.networkEnabled||!this.inForeground)||qc(t).Mt().next((t=>void 0===this.ln(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&xr("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Le=!1,this.wn(),this.Ue&&(this.Ue.cancel(),this.Ue=null),this._n(),this.mn(),await this.je.runTransaction("shutdown","readwrite",[aa.store,va.store],(t=>{const e=new Pa(t,Dr.o);return this.rn(e).next((()=>this.an(e)))})),this.je.close(),this.gn()}ln(t,e){return t.filter((t=>this.hn(t.updateTimeMs,e)&&!this.dn(t.clientId)))}yn(){return this.runTransaction("getActiveClients","readonly",(t=>qc(t).Mt().next((t=>this.ln(t,18e5).map((t=>t.clientId))))))}get started(){return this.Le}getMutationQueue(t){return uc.Ht(t,this.D,this.Gt,this.referenceDelegate)}getTargetCache(){return this.Ge}getRemoteDocumentCache(){return this.ze}getIndexManager(){return this.Gt}getBundleCache(){return this.He}runTransaction(t,e,n){xr("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.je.runTransaction(t,r,Ia,(r=>(s=new Pa(r,this.Fe?this.Fe.next():Dr.o),"readwrite-primary"===e?this.nn(s).next((t=>!!t||this.sn(s))).next((e=>{if(!e)throw Cr(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Oe.enqueueRetryable((()=>this.Qe(!1))),new Hr(Qr.FAILED_PRECONDITION,Ta);return n(s)})).next((t=>this.on(s).next((()=>t)))):this.pn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}pn(t){return Fc(t).get(aa.key).next((t=>{if(null!==t&&this.hn(t.leaseTimestampMs,5e3)&&!this.dn(t.ownerId)&&!this.cn(t)&&!(this.Me||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Hr(Qr.FAILED_PRECONDITION,Mc)}))}on(t){const e=new aa(this.clientId,this.allowTabSynchronization,Date.now());return Fc(t).put(aa.key,e)}static At(){return Na.At()}rn(t){const e=Fc(t);return e.get(aa.key).next((t=>this.cn(t)?(xr("IndexedDbPersistence","Releasing primary lease."),e.delete(aa.key)):Da.resolve()))}hn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Cr(`Detected an update time that is in the future: ${t} > ${n}`),1))}Xe(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.qe=()=>{this.Oe.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.Ye())))},this.document.addEventListener("visibilitychange",this.qe),this.inForeground="visible"===this.document.visibilityState)}_n(){this.qe&&(this.document.removeEventListener("visibilitychange",this.qe),this.qe=null)}Ze(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.Be=()=>{this.wn(),this.Oe.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("unload",this.Be))}mn(){this.Be&&(this.window.removeEventListener("unload",this.Be),this.Be=null)}dn(t){var e;try{const n=null!==(null===(e=this.Je)||void 0===e?void 0:e.getItem(this.fn(t)));return xr("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(t){return Cr("IndexedDbPersistence","Failed to get zombied client id.",t),!1}}wn(){if(this.Je)try{this.Je.setItem(this.fn(this.clientId),String(Date.now()))}catch(t){Cr("Failed to set zombie client id.",t)}}gn(){if(this.Je)try{this.Je.removeItem(this.fn(this.clientId))}catch(t){}}fn(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Fc(t){return Fa(t,aa.store)}function qc(t){return Fa(t,va.store)}function Vc(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class Uc{constructor(t,e){this.progress=t,this.En=e}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Bc{constructor(t,e,n){this.ze=t,this.Tn=e,this.Gt=n}In(t,e){return this.Tn.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.An(t,e,n)))}An(t,e,n){return this.ze.getEntry(t,e).next((t=>{for(const r of n)t=r.applyToLocalView(e,t);return t}))}Rn(t,e,n){let r=so();return e.forEach(((t,e)=>{for(const r of n)e=r.applyToLocalView(t,e);r=r.insert(t,e)})),r}Pn(t,e){return this.ze.getEntries(t,e).next((e=>this.bn(t,e)))}bn(t,e){return this.Tn.getAllMutationBatchesAffectingDocumentKeys(t,e).next((n=>{const r=this.Rn(t,e,n);let s=ro();return r.forEach(((t,e)=>{e||(e=new _s(t,ui.min())),s=s.insert(t,e)})),s}))}getDocumentsMatchingQuery(t,e,n){return function(t){return Zr.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.vn(t,e.path):Zs(e)?this.Vn(t,e,n):this.Sn(t,e,n)}vn(t,e){return this.In(t,new Zr(e)).next((t=>{let e=oo();return t instanceof Ts&&(e=e.insert(t.key,t)),e}))}Vn(t,e,n){const r=e.collectionGroup;let s=oo();return this.Gt.getCollectionParents(t,r).next((i=>Da.forEach(i,(i=>{const o=function(t,e){return new zs(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,i.child(r));return this.Sn(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}Sn(t,e,n){let r,s;return this.ze.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this.Tn.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Dn(t,s,r).next((t=>{r=t;for(const t of s)for(const e of t.mutations){const n=e.key,s=Oi(e,r.get(n),t.localWriteTime);r=s instanceof Ts?r.insert(n,s):r.remove(n)}}))))).next((()=>(r.forEach(((t,n)=>{oi(e,n)||(r=r.remove(t))})),r)))}Dn(t,e,n){let r=ho();for(const t of e)for(const e of t.mutations)e instanceof Vi&&null===n.get(e.key)&&(r=r.add(e.key));let s=n;return this.ze.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{null!==e&&e instanceof Ts&&(s=s.insert(t,e))})),s)))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class jc{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Cn=n,this.Nn=r}static xn(t,e){let n=ho(),r=ho();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:r=r.add(t.doc.key)}return new jc(t,e.fromCache,n,r)}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class $c{$n(t){this.On=t}getDocumentsMatchingQuery(t,e,n,r){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||n.isEqual(ui.min())?this.kn(t,e):this.On.Pn(t,r).next((s=>{const i=this.Mn(e,s);return(Ws(e)||Ys(e))&&this.Fn(e.limitType,i,r,n)?this.kn(t,e):(Nr()<=l.DEBUG&&xr("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),ii(e)),this.On.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}))}Mn(t,e){let n=new to(ai(t));return e.forEach(((e,r)=>{r instanceof Ts&&oi(t,r)&&(n=n.add(r))})),n}Fn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}kn(t,e){return Nr()<=l.DEBUG&&xr("QueryEngine","Using full collection scan to execute query:",ii(e)),this.On.getDocumentsMatchingQuery(t,e,ui.min())}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Gc{constructor(t,e,n,r){this.persistence=t,this.Ln=e,this.D=r,this.Bn=new Xi(qr),this.qn=new Dc((t=>Ns(t)),xs),this.Un=ui.min(),this.Tn=t.getMutationQueue(n),this.Kn=t.getRemoteDocumentCache(),this.Ge=t.getTargetCache(),this.Qn=new Bc(this.Kn,this.Tn,this.persistence.getIndexManager()),this.He=t.getBundleCache(),this.Ln.$n(this.Qn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Bn)))}}function Kc(t,e,n,r){return new Gc(t,e,n,r)}async function zc(t,e){const n=Mr(t);let r=n.Tn,s=n.Qn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n.Tn.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new Bc(n.Kn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=ho();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.Pn(t,o).next((t=>({Wn:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n.Tn=r,n.Qn=s,n.Ln.$n(n.Qn),i}function Qc(t){const e=Mr(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ge.getLastRemoteSnapshotVersion(t)))}function Hc(t,e,n,r,s){let i=ho();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=ro();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o instanceof _s&&o.version.isEqual(ui.min())?(e.removeEntry(n,c),i=i.insert(n,o)):null==a||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):xr("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}function Wc(t,e){const n=Mr(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n.Tn.getNextMutationBatchAfterBatchId(t,e))))}function Yc(t,e){const n=Mr(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ge.getTargetData(t,e).next((s=>s?(r=s,Da.resolve(r)):n.Ge.allocateTargetId(t).next((s=>(r=new Ua(e,s,0,t.currentSequenceNumber),n.Ge.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.Bn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Bn=n.Bn.insert(t.targetId,t),n.qn.set(e,t.targetId)),t}))}async function Xc(t,e,n){const r=Mr(t),s=r.Bn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(t){if(!ka(t))throw t;xr("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}r.Bn=r.Bn.remove(e),r.qn.delete(s.target)}function Jc(t,e,n){const r=Mr(t);let s=ui.min(),i=ho();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=Mr(t),s=r.qn.get(n);return void 0!==s?Da.resolve(r.Bn.get(s)):r.Ge.getTargetData(e,n)}(r,t,ei(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ge.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.Ln.getDocumentsMatchingQuery(t,e,n?s:ui.min(),n?i:ho()))).next((t=>({documents:t,jn:i})))))}function Zc(t,e){const n=Mr(t),r=Mr(n.Ge),s=n.Bn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",(t=>r.gt(t,e).next((t=>t?t.target:null))))}function tu(t){const e=Mr(t);return e.persistence.runTransaction("Get new document changes","readonly",(t=>function(t,e,n){const r=Mr(t);let s=ro(),i=Ga(n);const o=kc(e),a=IDBKeyRange.lowerBound(i,!0);return o.qt({index:fa.readTimeIndex,range:a},((t,e)=>{const n=ja(r.D,e);s=s.insert(n.key,n),i=e.readTime})).next((()=>({En:s,readTime:Ka(i)})))}(e.Kn,t,e.Un))).then((({En:t,readTime:n})=>(e.Un=n,t)))}async function eu(t,e,n=ho()){const r=await Yc(t,ei(Xa(e.bundledQuery))),s=Mr(t);return s.persistence.runTransaction("Save named query","readwrite",(t=>{const i=xo(e.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.He.saveNamedQuery(t,e);const o=r.withResumeToken(ts.EMPTY_BYTE_STRING,i);return s.Bn=s.Bn.insert(o.targetId,o),s.Ge.updateTargetData(t,o).next((()=>s.Ge.removeMatchingKeysForTargetId(t,r.targetId))).next((()=>s.Ge.addMatchingKeys(t,n,r.targetId))).next((()=>s.He.saveNamedQuery(t,e)))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class nu{constructor(t){this.D=t,this.Jn=new Map,this.Yn=new Map}getBundleMetadata(t,e){return Da.resolve(this.Jn.get(e))}saveBundleMetadata(t,e){var n;return this.Jn.set(e.id,{id:(n=e).id,version:n.version,createTime:xo(n.createTime)}),Da.resolve()}getNamedQuery(t,e){return Da.resolve(this.Yn.get(e))}saveNamedQuery(t,e){return this.Yn.set(e.name,function(t){return{name:t.name,query:Xa(t.bundledQuery),readTime:xo(t.readTime)}}(e)),Da.resolve()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ru{constructor(){this.Xn=new to(su.Zn),this.ts=new to(su.es)}isEmpty(){return this.Xn.isEmpty()}addReference(t,e){const n=new su(t,e);this.Xn=this.Xn.add(n),this.ts=this.ts.add(n)}ns(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.ss(new su(t,e))}rs(t,e){t.forEach((t=>this.removeReference(t,e)))}os(t){const e=new Zr(new Yr([])),n=new su(e,t),r=new su(e,t+1),s=[];return this.ts.forEachInRange([n,r],(t=>{this.ss(t),s.push(t.key)})),s}cs(){this.Xn.forEach((t=>this.ss(t)))}ss(t){this.Xn=this.Xn.delete(t),this.ts=this.ts.delete(t)}us(t){const e=new Zr(new Yr([])),n=new su(e,t),r=new su(e,t+1);let s=ho();return this.ts.forEachInRange([n,r],(t=>{s=s.add(t.key)})),s}containsKey(t){const e=new su(t,0),n=this.Xn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class su{constructor(t,e){this.key=t,this.hs=e}static Zn(t,e){return Zr.comparator(t.key,e.key)||qr(t.hs,e.hs)}static es(t,e){return qr(t.hs,e.hs)||Zr.comparator(t.key,e.key)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class iu{constructor(t,e){this.Gt=t,this.referenceDelegate=e,this.Tn=[],this.ls=1,this.fs=new to(su.Zn)}checkEmpty(t){return Da.resolve(0===this.Tn.length)}addMutationBatch(t,e,n,r){const s=this.ls;this.ls++,this.Tn.length>0&&this.Tn[this.Tn.length-1];const i=new qa(s,e,n,r);this.Tn.push(i);for(const e of r)this.fs=this.fs.add(new su(e.key,s)),this.Gt.addToCollectionParentIndex(t,e.key.path.popLast());return Da.resolve(i)}lookupMutationBatch(t,e){return Da.resolve(this.ds(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.ws(n),s=r<0?0:r;return Da.resolve(this.Tn.length>s?this.Tn[s]:null)}getHighestUnacknowledgedBatchId(){return Da.resolve(0===this.Tn.length?-1:this.ls-1)}getAllMutationBatches(t){return Da.resolve(this.Tn.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new su(e,0),r=new su(e,Number.POSITIVE_INFINITY),s=[];return this.fs.forEachInRange([n,r],(t=>{const e=this.ds(t.hs);s.push(e)})),Da.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new to(qr);return e.forEach((t=>{const e=new su(t,0),r=new su(t,Number.POSITIVE_INFINITY);this.fs.forEachInRange([e,r],(t=>{n=n.add(t.hs)}))})),Da.resolve(this._s(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;Zr.isDocumentKey(s)||(s=s.child(""));const i=new su(new Zr(s),0);let o=new to(qr);return this.fs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.hs)),!0)}),i),Da.resolve(this._s(o))}_s(t){const e=[];return t.forEach((t=>{const n=this.ds(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){Or(0===this.gs(e.batchId,"removed")),this.Tn.shift();let n=this.fs;return Da.forEach(e.mutations,(r=>{const s=new su(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.fs=n}))}Xt(t){}containsKey(t,e){const n=new su(e,0),r=this.fs.firstAfterOrEqual(n);return Da.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.Tn.length,Da.resolve()}gs(t,e){return this.ws(t)}ws(t){return 0===this.Tn.length?0:t-this.Tn[0].batchId}ds(t){const e=this.ws(t);return e<0||e>=this.Tn.length?null:this.Tn[e]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ou{constructor(t,e){this.Gt=t,this.ys=e,this.docs=new Xi(Zr.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ys(e);return this.docs=this.docs.insert(r,{maybeDocument:e,size:o,readTime:n}),this.size+=o-i,this.Gt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Da.resolve(n?n.maybeDocument:null)}getEntries(t,e){let n=so();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.maybeDocument:null)})),Da.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=oo();const s=new Zr(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{maybeDocument:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||s instanceof Ts&&oi(e,s)&&(r=r.insert(s.key,s))}return Da.resolve(r)}ps(t,e){return Da.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new au(this)}getSize(t){return Da.resolve(this.size)}}class au extends Ac{constructor(t){super(),this.Ve=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r&&r.maybeDocument?e.push(this.Ve.addEntry(t,r.maybeDocument,this.getReadTime(n))):this.Ve.removeEntry(n)})),Da.waitFor(e)}getFromCache(t,e){return this.Ve.getEntry(t,e)}getAllFromCache(t,e){return this.Ve.getEntries(t,e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class cu{constructor(t){this.persistence=t,this.Es=new Dc((t=>Ns(t)),xs),this.lastRemoteSnapshotVersion=ui.min(),this.highestTargetId=0,this.Ts=0,this.Is=new ru,this.targetCount=0,this.As=gc.ee()}forEachTarget(t,e){return this.Es.forEach(((t,n)=>e(n))),Da.resolve()}getLastRemoteSnapshotVersion(t){return Da.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Da.resolve(this.Ts)}allocateTargetId(t){return this.highestTargetId=this.As.next(),Da.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Ts&&(this.Ts=e),Da.resolve()}re(t){this.Es.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.As=new gc(e),this.highestTargetId=e),t.sequenceNumber>this.Ts&&(this.Ts=t.sequenceNumber)}addTargetData(t,e){return this.re(e),this.targetCount+=1,Da.resolve()}updateTargetData(t,e){return this.re(e),Da.resolve()}removeTargetData(t,e){return this.Es.delete(e.target),this.Is.os(e.targetId),this.targetCount-=1,Da.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.Es.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.Es.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),Da.waitFor(s).next((()=>r))}getTargetCount(t){return Da.resolve(this.targetCount)}getTargetData(t,e){const n=this.Es.get(e)||null;return Da.resolve(n)}addMatchingKeys(t,e,n){return this.Is.ns(e,n),Da.resolve()}removeMatchingKeys(t,e,n){this.Is.rs(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),Da.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this.Is.os(e),Da.resolve()}getMatchingKeysForTargetId(t,e){const n=this.Is.us(e);return Da.resolve(n)}containsKey(t,e){return Da.resolve(this.Is.containsKey(e))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class uu{constructor(t,e){this.Rs={},this.Fe=new Dr(0),this.Le=!1,this.Le=!0,this.referenceDelegate=t(this),this.Ge=new cu(this),this.Gt=new ec,this.ze=function(t,e){return new ou(t,e)}(this.Gt,(t=>this.referenceDelegate.Ps(t))),this.D=new Ba(e),this.He=new nu(this.D)}start(){return Promise.resolve()}shutdown(){return this.Le=!1,Promise.resolve()}get started(){return this.Le}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Gt}getMutationQueue(t){let e=this.Rs[t.toKey()];return e||(e=new iu(this.Gt,this.referenceDelegate),this.Rs[t.toKey()]=e),e}getTargetCache(){return this.Ge}getRemoteDocumentCache(){return this.ze}getBundleCache(){return this.He}runTransaction(t,e,n){xr("MemoryPersistence","Starting transaction:",t);const r=new hu(this.Fe.next());return this.referenceDelegate.bs(),n(r).next((t=>this.referenceDelegate.vs(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Vs(t,e){return Da.or(Object.values(this.Rs).map((n=>()=>n.containsKey(t,e))))}}class hu extends _a{constructor(t){super(),this.currentSequenceNumber=t}}class lu{constructor(t){this.persistence=t,this.Ss=new ru,this.Ds=null}static Cs(t){return new lu(t)}get Ns(){if(this.Ds)return this.Ds;throw Lr()}addReference(t,e,n){return this.Ss.addReference(n,e),this.Ns.delete(n.toString()),Da.resolve()}removeReference(t,e,n){return this.Ss.removeReference(n,e),this.Ns.add(n.toString()),Da.resolve()}markPotentiallyOrphaned(t,e){return this.Ns.add(e.toString()),Da.resolve()}removeTarget(t,e){this.Ss.os(e.targetId).forEach((t=>this.Ns.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.Ns.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}bs(){this.Ds=new Set}vs(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Da.forEach(this.Ns,(n=>{const r=Zr.fromPath(n);return this.xs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Ds=null,e.apply(t))))}updateLimboDocument(t,e){return this.xs(t,e).next((t=>{t?this.Ns.delete(e.toString()):this.Ns.add(e.toString())}))}Ps(t){return 0}xs(t,e){return Da.or([()=>Da.resolve(this.Ss.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Vs(t,e)])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class du{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}function fu(t,e){return`firestore_clients_${t}_${e}`}function gu(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function mu(t,e){return`firestore_targets_${t}_${e}`}du.UNAUTHENTICATED=new du(null),du.GOOGLE_CREDENTIALS=new du("google-credentials-uid"),du.FIRST_PARTY=new du("first-party-uid");class pu{constructor(t,e,n,r){this.user=t,this.batchId=e,this.state=n,this.error=r}static $s(t,e,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new Hr(r.error.code,r.error.message))),i?new pu(t,e,r.state,s):(Cr("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Os(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class yu{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static $s(t,e){const n=JSON.parse(e);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new Hr(n.error.code,n.error.message))),s?new yu(t,n.state,r):(Cr("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Os(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class wu{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static $s(t,e){const n=JSON.parse(e);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=fo();for(let t=0;r&&t<n.activeTargetIds.length;++t)r=zr(n.activeTargetIds[t]),s=s.add(n.activeTargetIds[t]);return r?new wu(t,s):(Cr("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class vu{constructor(t,e){this.clientId=t,this.onlineState=e}static $s(t){const e=JSON.parse(t);return"object"==typeof e&&-1!==["Unknown","Online","Offline"].indexOf(e.onlineState)&&"string"==typeof e.clientId?new vu(e.clientId,e.onlineState):(Cr("SharedClientState",`Failed to parse online state: ${t}`),null)}}class bu{constructor(){this.activeTargetIds=fo()}ks(t){this.activeTargetIds=this.activeTargetIds.add(t)}Ms(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Os(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Eu{constructor(t,e,n,r,s){this.window=t,this.Oe=e,this.persistenceKey=n,this.Fs=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Ls=this.Bs.bind(this),this.qs=new Xi(qr),this.started=!1,this.Us=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ks=fu(this.persistenceKey,this.Fs),this.Qs=function(t){return`firestore_sequence_number_${t}`}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this.persistenceKey),this.qs=this.qs.insert(this.Fs,new bu),this.Ws=new RegExp(`^firestore_clients_${i}_([^_]*)$`),this.js=new RegExp(`^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`),this.Gs=new RegExp(`^firestore_targets_${i}_(\\d+)$`),this.zs=function(t){return`firestore_online_state_${t}`}(this.persistenceKey),this.Hs=function(t){return`firestore_bundle_loaded_${t}`}(this.persistenceKey),this.window.addEventListener("storage",this.Ls)}static At(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.yn();for(const e of t){if(e===this.Fs)continue;const t=this.getItem(fu(this.persistenceKey,e));if(t){const n=wu.$s(e,t);n&&(this.qs=this.qs.insert(n.clientId,n))}}this.Js();const e=this.storage.getItem(this.zs);if(e){const t=this.Ys(e);t&&this.Xs(t)}for(const t of this.Us)this.Bs(t);this.Us=[],this.window.addEventListener("unload",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Qs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.Zs(this.qs)}isActiveQueryTarget(t){let e=!1;return this.qs.forEach(((n,r)=>{r.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.ti(t,"pending")}updateMutationState(t,e,n){this.ti(t,e,n),this.ei(t)}addLocalQueryTarget(t){let e="not-current";if(this.isActiveQueryTarget(t)){const n=this.storage.getItem(mu(this.persistenceKey,t));if(n){const r=yu.$s(t,n);r&&(e=r.state)}}return this.ni.ks(t),this.Js(),e}removeLocalQueryTarget(t){this.ni.Ms(t),this.Js()}isLocalQueryTarget(t){return this.ni.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(mu(this.persistenceKey,t))}updateQueryState(t,e,n){this.si(t,e,n)}handleUserChange(t,e,n){e.forEach((t=>{this.ei(t)})),this.currentUser=t,n.forEach((t=>{this.addPendingMutation(t)}))}setOnlineState(t){this.ii(t)}notifyBundleLoaded(){this.ri()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Ls),this.removeItem(this.Ks),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return xr("SharedClientState","READ",t,e),e}setItem(t,e){xr("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){xr("SharedClientState","REMOVE",t),this.storage.removeItem(t)}Bs(t){const e=t;if(e.storageArea===this.storage){if(xr("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Ks)return void Cr("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Oe.enqueueRetryable((async()=>{if(this.started){if(null!==e.key)if(this.Ws.test(e.key)){if(null==e.newValue){const t=this.oi(e.key);return this.ci(t,null)}{const t=this.ai(e.key,e.newValue);if(t)return this.ci(t.clientId,t)}}else if(this.js.test(e.key)){if(null!==e.newValue){const t=this.ui(e.key,e.newValue);if(t)return this.hi(t)}}else if(this.Gs.test(e.key)){if(null!==e.newValue){const t=this.li(e.key,e.newValue);if(t)return this.fi(t)}}else if(e.key===this.zs){if(null!==e.newValue){const t=this.Ys(e.newValue);if(t)return this.Xs(t)}}else if(e.key===this.Qs){const t=function(t){let e=Dr.o;if(null!=t)try{const n=JSON.parse(t);Or("number"==typeof n),e=n}catch(t){Cr("SharedClientState","Failed to read sequence number from WebStorage",t)}return e}(e.newValue);t!==Dr.o&&this.sequenceNumberHandler(t)}else if(e.key===this.Hs)return this.syncEngine.di()}else this.Us.push(e)}))}}get ni(){return this.qs.get(this.Fs)}Js(){this.setItem(this.Ks,this.ni.Os())}ti(t,e,n){const r=new pu(this.currentUser,t,e,n),s=gu(this.persistenceKey,this.currentUser,t);this.setItem(s,r.Os())}ei(t){const e=gu(this.persistenceKey,this.currentUser,t);this.removeItem(e)}ii(t){const e={clientId:this.Fs,onlineState:t};this.storage.setItem(this.zs,JSON.stringify(e))}si(t,e,n){const r=mu(this.persistenceKey,t),s=new yu(t,e,n);this.setItem(r,s.Os())}ri(){this.setItem(this.Hs,"value-not-used")}oi(t){const e=this.Ws.exec(t);return e?e[1]:null}ai(t,e){const n=this.oi(t);return wu.$s(n,e)}ui(t,e){const n=this.js.exec(t),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return pu.$s(new du(s),r,e)}li(t,e){const n=this.Gs.exec(t),r=Number(n[1]);return yu.$s(r,e)}Ys(t){return vu.$s(t)}async hi(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.wi(t.batchId,t.state,t.error);xr("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}fi(t){return this.syncEngine._i(t.targetId,t.state,t.error)}ci(t,e){const n=e?this.qs.insert(t,e):this.qs.remove(t),r=this.Zs(this.qs),s=this.Zs(n),i=[],o=[];return s.forEach((t=>{r.has(t)||i.push(t)})),r.forEach((t=>{s.has(t)||o.push(t)})),this.syncEngine.mi(i,o).then((()=>{this.qs=n}))}Xs(t){this.qs.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}Zs(t){let e=fo();return t.forEach(((t,n)=>{e=e.unionWith(n.activeTargetIds)})),e}}class Iu{constructor(){this.gi=new bu,this.yi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.gi.ks(t),this.yi[t]||"not-current"}updateQueryState(t,e,n){this.yi[t]=e}removeLocalQueryTarget(t){this.gi.Ms(t)}isLocalQueryTarget(t){return this.gi.activeTargetIds.has(t)}clearQueryState(t){delete this.yi[t]}getAllActiveQueryTargets(){return this.gi.activeTargetIds}isActiveQueryTarget(t){return this.gi.activeTargetIds.has(t)}start(){return this.gi=new bu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Tu{pi(t){}shutdown(){}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _u{constructor(){this.Ei=()=>this.Ti(),this.Ii=()=>this.Ai(),this.Ri=[],this.Pi()}pi(t){this.Ri.push(t)}shutdown(){window.removeEventListener("online",this.Ei),window.removeEventListener("offline",this.Ii)}Pi(){window.addEventListener("online",this.Ei),window.addEventListener("offline",this.Ii)}Ti(){xr("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.Ri)t(0)}Ai(){xr("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.Ri)t(1)}static At(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Su={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Du{constructor(t){this.bi=t.bi,this.vi=t.vi}Vi(t){this.Si=t}Di(t){this.Ci=t}onMessage(t){this.Ni=t}close(){this.vi()}send(t){this.bi(t)}xi(){this.Si()}$i(t){this.Ci(t)}Oi(t){this.Ni(t)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Au extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.ki=e+"://"+t.host,this.Mi="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Fi(t,e,n,r){const s=this.Li(t,e);xr("RestConnection","Sending: ",s,n);const i={};return this.Bi(i,r),this.qi(t,s,i,n).then((t=>(xr("RestConnection","Received: ",t),t)),(e=>{throw kr("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}Ui(t,e,n,r){return this.Fi(t,e,n,r)}Bi(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/8.3.1",t["Content-Type"]="text/plain",e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}Li(t,e){const n=Su[t];return`${this.ki}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling}qi(t,e,n,r){return new Promise(((s,i)=>{const o=new Sr;o.listenOnce(br.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case vr.NO_ERROR:const e=o.getResponseJson();xr("Connection","XHR received:",JSON.stringify(e)),s(e);break;case vr.TIMEOUT:xr("Connection",'RPC "'+t+'" timed out'),i(new Hr(Qr.DEADLINE_EXCEEDED,"Request time out"));break;case vr.HTTP_ERROR:const n=o.getStatus();if(xr("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Qr).indexOf(e)>=0?e:Qr.UNKNOWN}(t.status);i(new Hr(e,t.message))}else i(new Hr(Qr.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Hr(Qr.UNAVAILABLE,"Connection failed."));break;default:Lr()}}finally{xr("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Ki(t,e){const n=[this.ki,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new gr,s=me(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};var a;this.Bi(i.initMessageHeaders,e),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(o())||"object"==typeof navigator&&"ReactNative"===navigator.product||o().indexOf("Electron/")>=0||function(){var t=o();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||o().indexOf("MSAppHost/")>=0||"object"==typeof(a="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==a.id||(i.httpHeadersOverwriteParam="$httpHeaders");const c=n.join("");xr("Connection","Creating WebChannel: "+c,i);const u=r.createWebChannel(c,i);let h=!1,l=!1;const d=new Du({bi:t=>{l?xr("Connection","Not sending because WebChannel is closed:",t):(h||(xr("Connection","Opening WebChannel transport."),u.open(),h=!0),xr("Connection","WebChannel sending:",t),u.send(t))},vi:()=>u.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(u,_r.EventType.OPEN,(()=>{l||xr("Connection","WebChannel transport opened.")})),f(u,_r.EventType.CLOSE,(()=>{l||(l=!0,xr("Connection","WebChannel transport closed"),d.$i())})),f(u,_r.EventType.ERROR,(t=>{l||(l=!0,kr("Connection","WebChannel transport errored:",t),d.$i(new Hr(Qr.UNAVAILABLE,"The operation could not be completed")))})),f(u,_r.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];Or(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){xr("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=Qi[t];if(void 0!==e)return Yi(e)}(t),n=s.message;void 0===e&&(e=Qr.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),l=!0,d.$i(new Hr(e,n)),u.close()}else xr("Connection","WebChannel received:",n),d.Oi(n)}})),f(s,Er.STAT_EVENT,(t=>{t.stat===Ir?xr("Connection","Detected buffering proxy"):t.stat===Tr&&xr("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.xi()}),0),d}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Nu(){return"undefined"!=typeof window?window:null}function xu(){return"undefined"!=typeof document?document:null}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Cu(t){return new So(t,!0)}class ku{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Oe=t,this.timerId=e,this.Qi=n,this.Wi=r,this.ji=s,this.Gi=0,this.zi=null,this.Hi=Date.now(),this.reset()}reset(){this.Gi=0}Ji(){this.Gi=this.ji}Yi(t){this.cancel();const e=Math.floor(this.Gi+this.Xi()),n=Math.max(0,Date.now()-this.Hi),r=Math.max(0,e-n);r>0&&xr("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Gi} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.zi=this.Oe.enqueueAfterDelay(this.timerId,r,(()=>(this.Hi=Date.now(),t()))),this.Gi*=this.Wi,this.Gi<this.Qi&&(this.Gi=this.Qi),this.Gi>this.ji&&(this.Gi=this.ji)}Zi(){null!==this.zi&&(this.zi.skipDelay(),this.zi=null)}cancel(){null!==this.zi&&(this.zi.cancel(),this.zi=null)}Xi(){return(Math.random()-.5)*this.Gi}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ru{constructor(t,e,n,r,s,i){this.Oe=t,this.tr=n,this.er=r,this.nr=s,this.listener=i,this.state=0,this.sr=0,this.ir=null,this.stream=null,this.rr=new ku(t,e)}cr(){return 1===this.state||2===this.state||4===this.state}ar(){return 2===this.state}start(){3!==this.state?this.auth():this.ur()}async stop(){this.cr()&&await this.close(0)}hr(){this.state=0,this.rr.reset()}lr(){this.ar()&&null===this.ir&&(this.ir=this.Oe.enqueueAfterDelay(this.tr,6e4,(()=>this.dr())))}wr(t){this._r(),this.stream.send(t)}async dr(){if(this.ar())return this.close(0)}_r(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(t,e){this._r(),this.rr.cancel(),this.sr++,3!==t?this.rr.reset():e&&e.code===Qr.RESOURCE_EXHAUSTED?(Cr(e.toString()),Cr("Using maximum backoff delay to prevent overloading the backend."),this.rr.Ji()):e&&e.code===Qr.UNAUTHENTICATED&&this.nr.invalidateToken(),null!==this.stream&&(this.mr(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Di(e)}mr(){}auth(){this.state=1;const t=this.gr(this.sr),e=this.sr;this.nr.getToken().then((t=>{this.sr===e&&this.yr(t)}),(e=>{t((()=>{const t=new Hr(Qr.UNKNOWN,"Fetching auth token failed: "+e.message);return this.pr(t)}))}))}yr(t){const e=this.gr(this.sr);this.stream=this.Er(t),this.stream.Vi((()=>{e((()=>(this.state=2,this.listener.Vi())))})),this.stream.Di((t=>{e((()=>this.pr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}ur(){this.state=4,this.rr.Yi((async()=>{this.state=0,this.start()}))}pr(t){return xr("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}gr(t){return e=>{this.Oe.enqueueAndForget((()=>this.sr===t?e():(xr("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Lu extends Ru{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.D=r}Er(t){return this.er.Ki("Listen",t)}onMessage(t){this.rr.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(t){return"NO_CHANGE"===t?0:"ADD"===t?1:"REMOVE"===t?2:"CURRENT"===t?3:"RESET"===t?4:Lr()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(t,e){return t.V?(Or(void 0===e||"string"==typeof e),ts.fromBase64String(e||"")):(Or(void 0===e||e instanceof Uint8Array),ts.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(t){const e=void 0===t.code?Qr.UNKNOWN:Yi(t.code);return new Hr(e,t.message||"")}(o);n=new wo(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Lo(t,r.document.name),i=xo(r.document.updateTime),o=new li({mapValue:{fields:r.document.fields}}),a=new Ts(s,i,o,{}),c=r.targetIds||[],u=r.removedTargetIds||[];n=new po(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Lo(t,r.document),i=r.readTime?xo(r.readTime):ui.min(),o=new _s(s,i),a=r.removedTargetIds||[];n=new po([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Lo(t,r.document),i=r.removedTargetIds||[];n=new po([],i,s,null)}else{if(!("filter"in e))return Lr();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new zi(r),i=t.targetId;n=new yo(i,s)}}return n}(this.D,t),n=function(t){if(!("targetChange"in t))return ui.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?ui.min():e.readTime?xo(e.readTime):ui.min()}(t);return this.listener.Tr(e,n)}Ir(t){const e={};e.database=Po(this.D),e.addTarget=function(t,e){let n;const r=e.target;return n=Cs(r)?{documents:jo(t,r)}:{query:$o(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Ao(t,e.resumeToken):e.snapshotVersion.compareTo(ui.min())>0&&(n.readTime=Do(t,e.snapshotVersion.toTimestamp())),n}(this.D,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Lr()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.D,t);n&&(e.labels=n),this.wr(e)}Ar(t){const e={};e.database=Po(this.D),e.removeTarget=t,this.wr(e)}}class Ou extends Ru{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.D=r,this.Rr=!1}get Pr(){return this.Rr}start(){this.Rr=!1,this.lastStreamToken=void 0,super.start()}mr(){this.Rr&&this.br([])}Er(t){return this.er.Ki("Write",t)}onMessage(t){if(Or(!!t.streamToken),this.lastStreamToken=t.streamToken,this.Rr){this.rr.reset();const e=function(t,e){return t&&t.length>0?(Or(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?xo(t.updateTime):xo(e);return n.isEqual(ui.min())&&(n=xo(e)),new xi(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=xo(t.commitTime);return this.listener.vr(n,e)}return Or(!t.writeResults||0===t.writeResults.length),this.Rr=!0,this.listener.Vr()}Sr(){const t={};t.database=Po(this.D),this.wr(t)}br(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>Uo(this.D,t)))};this.wr(e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Mu extends class{}{constructor(t,e,n){super(),this.credentials=t,this.er=e,this.D=n,this.Dr=!1}Cr(){if(this.Dr)throw new Hr(Qr.FAILED_PRECONDITION,"The client has already been terminated.")}Fi(t,e,n){return this.Cr(),this.credentials.getToken().then((r=>this.er.Fi(t,e,n,r))).catch((t=>{throw t.code===Qr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t}))}Ui(t,e,n){return this.Cr(),this.credentials.getToken().then((r=>this.er.Ui(t,e,n,r))).catch((t=>{throw t.code===Qr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t}))}terminate(){this.Dr=!1}}class Pu{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.Nr=0,this.$r=null,this.Or=!0}kr(){0===this.Nr&&(this.Mr("Unknown"),this.$r=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$r=null,this.Fr("Backend didn't respond within 10 seconds."),this.Mr("Offline"),Promise.resolve()))))}Lr(t){"Online"===this.state?this.Mr("Unknown"):(this.Nr++,this.Nr>=1&&(this.Br(),this.Fr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Mr("Offline")))}set(t){this.Br(),this.Nr=0,"Online"===t&&(this.Or=!1),this.Mr(t)}Mr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Fr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Or?(Cr(e),this.Or=!1):xr("OnlineStateTracker",e)}Br(){null!==this.$r&&(this.$r.cancel(),this.$r=null)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Fu{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.qr=[],this.Ur=new Map,this.Kr=new Set,this.Qr=[],this.Wr=s,this.Wr.pi((t=>{n.enqueueAndForget((async()=>{zu(this)&&(xr("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Mr(t);e.Kr.add(4),await Vu(e),e.jr.set("Unknown"),e.Kr.delete(4),await qu(e)}(this))}))})),this.jr=new Pu(n,r)}}async function qu(t){if(zu(t))for(const e of t.Qr)await e(!0)}async function Vu(t){for(const e of t.Qr)await e(!1)}function Uu(t,e){const n=Mr(t);n.Ur.has(e.targetId)||(n.Ur.set(e.targetId,e),Ku(n)?Gu(n):uh(n).ar()&&ju(n,e))}function Bu(t,e){const n=Mr(t),r=uh(n);n.Ur.delete(e),r.ar()&&$u(n,e),0===n.Ur.size&&(r.ar()?r.lr():zu(n)&&n.jr.set("Unknown"))}function ju(t,e){t.Gr.H(e.targetId),uh(t).Ir(e)}function $u(t,e){t.Gr.H(e),uh(t).Ar(e)}function Gu(t){t.Gr=new bo({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),gt:e=>t.Ur.get(e)||null}),uh(t).start(),t.jr.kr()}function Ku(t){return zu(t)&&!uh(t).cr()&&t.Ur.size>0}function zu(t){return 0===Mr(t).Kr.size}function Qu(t){t.Gr=void 0}async function Hu(t){t.Ur.forEach(((e,n)=>{ju(t,e)}))}async function Wu(t,e){Qu(t),Ku(t)?(t.jr.Lr(e),Gu(t)):t.jr.set("Unknown")}async function Yu(t,e,n){if(t.jr.set("Online"),e instanceof wo&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Ur.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Ur.delete(r),t.Gr.removeTarget(r))}(t,e)}catch(n){xr("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Xu(t,n)}else if(e instanceof po?t.Gr.st(e):e instanceof yo?t.Gr.ht(e):t.Gr.ot(e),!n.isEqual(ui.min()))try{const e=await Qc(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Gr.dt(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Ur.get(r);s&&t.Ur.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Ur.get(e);if(!n)return;t.Ur.set(e,n.withResumeToken(ts.EMPTY_BYTE_STRING,n.snapshotVersion)),$u(t,e);const r=new Ua(n.target,e,1,n.sequenceNumber);ju(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){xr("RemoteStore","Failed to raise snapshot:",e),await Xu(t,e)}}async function Xu(t,e,n){if(!ka(e))throw e;t.Kr.add(1),await Vu(t),t.jr.set("Offline"),n||(n=()=>Qc(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{xr("RemoteStore","Retrying IndexedDB access"),await n(),t.Kr.delete(1),await qu(t)}))}function Ju(t,e){return e().catch((n=>Xu(t,n,e)))}async function Zu(t){const e=Mr(t),n=hh(e);let r=e.qr.length>0?e.qr[e.qr.length-1].batchId:-1;for(;th(e);)try{const t=await Wc(e.localStore,r);if(null===t){0===e.qr.length&&n.lr();break}r=t.batchId,eh(e,t)}catch(t){await Xu(e,t)}nh(e)&&rh(e)}function th(t){return zu(t)&&t.qr.length<10}function eh(t,e){t.qr.push(e);const n=hh(t);n.ar()&&n.Pr&&n.br(e.mutations)}function nh(t){return zu(t)&&!hh(t).cr()&&t.qr.length>0}function rh(t){hh(t).start()}async function sh(t){hh(t).Sr()}async function ih(t){const e=hh(t);for(const n of t.qr)e.br(n.mutations)}async function oh(t,e,n){const r=t.qr.shift(),s=Va.from(r,e,n);await Ju(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await Zu(t)}async function ah(t,e){e&&hh(t).Pr&&await async function(t,e){if(Wi(n=e.code)&&n!==Qr.ABORTED){const n=t.qr.shift();hh(t).hr(),await Ju(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Zu(t)}var n}(t,e),nh(t)&&rh(t)}async function ch(t,e){const n=Mr(t);e?(n.Kr.delete(2),await qu(n)):e||(n.Kr.add(2),await Vu(n),n.jr.set("Unknown"))}function uh(t){return t.zr||(t.zr=function(t,e,n){const r=Mr(t);return r.Cr(),new Lu(e,r.er,r.credentials,r.D,n)
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}(t.datastore,t.asyncQueue,{Vi:Hu.bind(null,t),Di:Wu.bind(null,t),Tr:Yu.bind(null,t)}),t.Qr.push((async e=>{e?(t.zr.hr(),Ku(t)?Gu(t):t.jr.set("Unknown")):(await t.zr.stop(),Qu(t))}))),t.zr}function hh(t){return t.Hr||(t.Hr=function(t,e,n){const r=Mr(t);return r.Cr(),new Ou(e,r.er,r.credentials,r.D,n)}(t.datastore,t.asyncQueue,{Vi:sh.bind(null,t),Di:ah.bind(null,t),Vr:ih.bind(null,t),vr:oh.bind(null,t)}),t.Qr.push((async e=>{e?(t.Hr.hr(),await Zu(t)):(await t.Hr.stop(),t.qr.length>0&&(xr("RemoteStore",`Stopping write stream with ${t.qr.length} pending writes`),t.qr=[]))}))),t.Hr
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class lh{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new Sa,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new lh(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Hr(Qr.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function dh(t,e){if(Cr("AsyncQueue",`${e}: ${t}`),ka(t))return new Hr(Qr.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class fh{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Zr.comparator(e.key,n.key):(t,e)=>Zr.comparator(t.key,e.key),this.keyedMap=oo(),this.sortedSet=new Xi(this.comparator)}static emptySet(t){return new fh(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof fh))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new fh;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class gh{constructor(){this.Jr=new Xi(Zr.comparator)}track(t){const e=t.doc.key,n=this.Jr.get(e);n?0!==t.type&&3===n.type?this.Jr=this.Jr.insert(e,t):3===t.type&&1!==n.type?this.Jr=this.Jr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Jr=this.Jr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Jr=this.Jr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Jr=this.Jr.remove(e):1===t.type&&2===n.type?this.Jr=this.Jr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Jr=this.Jr.insert(e,{type:2,doc:t.doc}):Lr():this.Jr=this.Jr.insert(e,t)}Yr(){const t=[];return this.Jr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class mh{constructor(t,e,n,r,s,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const s=[];return e.forEach((t=>{s.push({type:0,doc:t})})),new mh(t,e,fh.emptySet(e),s,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ri(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ph{constructor(){this.Xr=void 0,this.listeners=[]}}class yh{constructor(){this.queries=new Dc((t=>si(t)),ri),this.onlineState="Unknown",this.Zr=new Set}}async function wh(t,e){const n=Mr(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new ph),s)try{i.Xr=await n.onListen(r)}catch(t){const n=dh(t,`Initialization of query '${ii(e.query)}' failed`);return void e.onError(n)}n.queries.set(r,i),i.listeners.push(e),e.eo(n.onlineState),i.Xr&&e.no(i.Xr)&&Ih(n)}async function vh(t,e){const n=Mr(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function bh(t,e){const n=Mr(t);let r=!1;for(const t of e){const e=t.query,s=n.queries.get(e);if(s){for(const e of s.listeners)e.no(t)&&(r=!0);s.Xr=t}}r&&Ih(n)}function Eh(t,e,n){const r=Mr(t),s=r.queries.get(e);if(s)for(const t of s.listeners)t.onError(n);r.queries.delete(e)}function Ih(t){t.Zr.forEach((t=>{t.next()}))}class Th{constructor(t,e,n){this.query=t,this.so=e,this.io=!1,this.ro=null,this.onlineState="Unknown",this.options=n||{}}no(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new mh(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.io?this.oo(t)&&(this.so.next(t),e=!0):this.co(t,this.onlineState)&&(this.ao(t),e=!0),this.ro=t,e}onError(t){this.so.error(t)}eo(t){this.onlineState=t;let e=!1;return this.ro&&!this.io&&this.co(this.ro,t)&&(this.ao(this.ro),e=!0),e}co(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.uo&&n||t.docs.isEmpty()&&"Offline"!==e)}oo(t){if(t.docChanges.length>0)return!0;const e=this.ro&&this.ro.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}ao(t){t=mh.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.io=!0,this.so.next(t)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _h{constructor(t,e){this.payload=t,this.byteLength=e}ho(){return"metadata"in this.payload}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Sh{constructor(t){this.D=t}Gn(t){return Lo(this.D,t)}zn(t){return t.metadata.exists?Vo(this.D,t.document,!1):new _s(this.Gn(t.metadata.name),this.Hn(t.metadata.readTime))}Hn(t){return xo(t)}}class Dh{constructor(t,e,n){this.lo=t,this.localStore=e,this.D=n,this.queries=[],this.documents=[],this.progress=Ah(t)}fo(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;return t.payload.namedQuery?this.queries.push(t.payload.namedQuery):t.payload.documentMetadata?(this.documents.push({metadata:t.payload.documentMetadata}),t.payload.documentMetadata.exists||++e):t.payload.document&&(this.documents[this.documents.length-1].document=t.payload.document,++e),e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}wo(t){const e=new Map,n=new Sh(this.D);for(const r of t)if(r.metadata.queries){const t=n.Gn(r.metadata.name);for(const n of r.metadata.queries){const r=(e.get(n)||ho()).add(t);e.set(n,r)}}return e}async complete(){const t=await async function(t,e,n,r){const s=Mr(t);let i=ho(),o=ro(),a=co();for(const t of n){const n=e.Gn(t.metadata.name);t.document&&(i=i.add(n)),o=o.insert(n,e.zn(t)),a=a.insert(n,e.Hn(t.metadata.readTime))}const c=s.Kn.newChangeBuffer({trackRemovals:!0}),u=await Yc(s,function(t){return ei(Hs(Yr.fromString(`__bundle__/docs/${t}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(t=>Hc(t,c,o,ui.min(),a).next((e=>(c.apply(t),e))).next((e=>s.Ge.removeMatchingKeysForTargetId(t,u.targetId).next((()=>s.Ge.addMatchingKeys(t,i,u.targetId))).next((()=>s.Qn.bn(t,e)))))))}(this.localStore,new Sh(this.D),this.documents,this.lo.id),e=this.wo(this.documents);for(const t of this.queries)await eu(this.localStore,t,e.get(t.name));return this.progress.taskState="Success",new Uc(Object.assign({},this.progress),t)}}function Ah(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Nh{constructor(t){this.key=t}}class xh{constructor(t){this.key=t}}class Ch{constructor(t,e){this.query=t,this._o=e,this.mo=null,this.current=!1,this.yo=ho(),this.mutatedKeys=ho(),this.po=ai(t),this.Eo=new fh(this.po)}get To(){return this._o}Io(t,e){const n=e?e.Ao:new gh,r=e?e.Eo:this.Eo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=Ws(this.query)&&r.size===this.query.limit?r.last():null,c=Ys(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t);let h=e instanceof Ts?e:null;h&&(h=oi(this.query,h)?h:null);const l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data().isEqual(h.data())?l!==d&&(n.track({type:3,doc:h}),f=!0):this.Ro(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.po(h,a)>0||c&&this.po(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),Ws(this.query)||Ys(this.query))for(;i.size>this.query.limit;){const t=Ws(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{Eo:i,Ao:n,Fn:o,mutatedKeys:s}}Ro(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.Eo;this.Eo=t.Eo,this.mutatedKeys=t.mutatedKeys;const s=t.Ao.Yr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Lr()}};return n(t)-n(e)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t.type,e.type)||this.po(t.doc,e.doc))),this.Po(n);const i=e?this.bo():[],o=0===this.yo.size&&this.current?1:0,a=o!==this.mo;return this.mo=o,0!==s.length||a?{snapshot:new mh(this.query,t.Eo,r,s,t.mutatedKeys,0===o,a,!1),vo:i}:{vo:i}}eo(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({Eo:this.Eo,Ao:new gh,mutatedKeys:this.mutatedKeys,Fn:!1},!1)):{vo:[]}}Vo(t){return!this._o.has(t)&&!!this.Eo.has(t)&&!this.Eo.get(t).hasLocalMutations}Po(t){t&&(t.addedDocuments.forEach((t=>this._o=this._o.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this._o=this._o.delete(t))),this.current=t.current)}bo(){if(!this.current)return[];const t=this.yo;this.yo=ho(),this.Eo.forEach((t=>{this.Vo(t.key)&&(this.yo=this.yo.add(t.key))}));const e=[];return t.forEach((t=>{this.yo.has(t)||e.push(new xh(t))})),this.yo.forEach((n=>{t.has(n)||e.push(new Nh(n))})),e}So(t){this._o=t.jn,this.yo=ho();const e=this.Io(t.documents);return this.applyChanges(e,!0)}Do(){return mh.fromInitialDocuments(this.query,this.Eo,this.mutatedKeys,0===this.mo)}}class kh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Rh{constructor(t){this.key=t,this.Co=!1}}class Lh{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.No={},this.xo=new Dc((t=>si(t)),ri),this.$o=new Map,this.Oo=new Set,this.ko=new Xi(Zr.comparator),this.Mo=new Map,this.Fo=new ru,this.Lo={},this.Bo=new Map,this.qo=gc.ne(),this.onlineState="Unknown",this.Uo=void 0}get isPrimaryClient(){return!0===this.Uo}}async function Oh(t,e){const n=ol(t);let r,s;const i=n.xo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Do();else{const t=await Yc(n.localStore,ei(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await Mh(n,e,r,"current"===i),n.isPrimaryClient&&Uu(n.remoteStore,t)}return s}async function Mh(t,e,n,r){t.Ko=(e,n,r)=>async function(t,e,n,r){let s=e.view.Io(n);s.Fn&&(s=await Jc(t.localStore,e.query,!1).then((({documents:t})=>e.view.Io(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return zh(t,e.targetId,o.vo),o.snapshot}(t,e,n,r);const s=await Jc(t.localStore,e,!0),i=new Ch(e,s.jn),o=i.Io(s.documents),a=mo.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);zh(t,n,c.vo);const u=new kh(e,n,i);return t.xo.set(e,u),t.$o.has(n)?t.$o.get(n).push(e):t.$o.set(n,[e]),c.snapshot}async function Ph(t,e){const n=Mr(t),r=n.xo.get(e),s=n.$o.get(r.targetId);if(s.length>1)return n.$o.set(r.targetId,s.filter((t=>!ri(t,e)))),void n.xo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Xc(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Bu(n.remoteStore,r.targetId),Gh(n,r.targetId)})).catch(vc)):(Gh(n,r.targetId),await Xc(n.localStore,r.targetId,!0))}async function Fh(t,e){const n=Mr(t);try{const t=await function(t,e){const n=Mr(t),r=e.snapshotVersion;let s=n.Bn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Kn.newChangeBuffer({trackRemovals:!0});s=n.Bn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.Ge.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.Ge.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const u=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,u),function(t,e,n){return Or(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize()||e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,e)&&o.push(n.Ge.updateTargetData(t,u))}}));let a=ro();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(Hc(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(ui.min())){const e=n.Ge.getLastRemoteSnapshotVersion(t).next((e=>n.Ge.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return Da.waitFor(o).next((()=>i.apply(t))).next((()=>n.Qn.bn(t,a)))})).then((t=>(n.Bn=s,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Mo.get(e);r&&(Or(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Co=!0:t.modifiedDocuments.size>0?Or(r.Co):t.removedDocuments.size>0&&(Or(r.Co),r.Co=!1))})),await Wh(n,t,e)}catch(t){await vc(t)}}function qh(t,e,n){const r=Mr(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.xo.forEach(((n,r)=>{const s=r.view.eo(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=Mr(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.eo(e)&&(r=!0)})),r&&Ih(n)}(r.eventManager,e),t.length&&r.No.Tr(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Vh(t,e,n){const r=Mr(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Mo.get(e),i=s&&s.key;if(i){let t=new Xi(Zr.comparator);t=t.insert(i,new _s(i,ui.min()));const n=ho().add(i),s=new go(ui.min(),new Map,new to(qr),t,n);await Fh(r,s),r.ko=r.ko.remove(i),r.Mo.delete(e),Hh(r)}else await Xc(r.localStore,e,!1).then((()=>Gh(r,e,n))).catch(vc)}async function Uh(t,e){const n=Mr(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Mr(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Kn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=Da.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{let i=e;const o=n.docVersions.get(t);Or(null!==o),(!i||i.version.compareTo(o)<0)&&(i=s.applyToRemoteDocument(t,i,n),i&&r.addEntry(i,n.commitVersion))}))})),o.next((()=>t.Tn.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n.Tn.performConsistencyCheck(t))).next((()=>n.Qn.Pn(t,r)))}))}(n.localStore,e);$h(n,r,null),jh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Wh(n,t)}catch(t){await vc(t)}}async function Bh(t,e,n){const r=Mr(t);try{const t=await function(t,e){const n=Mr(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n.Tn.lookupMutationBatch(t,e).next((e=>(Or(null!==e),r=e.keys(),n.Tn.removeMutationBatch(t,e)))).next((()=>n.Tn.performConsistencyCheck(t))).next((()=>n.Qn.Pn(t,r)))}))}(r.localStore,e);$h(r,e,n),jh(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Wh(r,t)}catch(n){await vc(n)}}function jh(t,e){(t.Bo.get(e)||[]).forEach((t=>{t.resolve()})),t.Bo.delete(e)}function $h(t,e,n){const r=Mr(t);let s=r.Lo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.Lo[r.currentUser.toKey()]=s}}function Gh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.$o.get(e))t.xo.delete(r),n&&t.No.Qo(r,n);t.$o.delete(e),t.isPrimaryClient&&t.Fo.os(e).forEach((e=>{t.Fo.containsKey(e)||Kh(t,e)}))}function Kh(t,e){t.Oo.delete(e.path.canonicalString());const n=t.ko.get(e);null!==n&&(Bu(t.remoteStore,n),t.ko=t.ko.remove(e),t.Mo.delete(n),Hh(t))}function zh(t,e,n){for(const r of n)r instanceof Nh?(t.Fo.addReference(r.key,e),Qh(t,r)):r instanceof xh?(xr("SyncEngine","Document no longer in limbo: "+r.key),t.Fo.removeReference(r.key,e),t.Fo.containsKey(r.key)||Kh(t,r.key)):Lr()}function Qh(t,e){const n=e.key,r=n.path.canonicalString();t.ko.get(n)||t.Oo.has(r)||(xr("SyncEngine","New document in limbo: "+n),t.Oo.add(r),Hh(t))}function Hh(t){for(;t.Oo.size>0&&t.ko.size<t.maxConcurrentLimboResolutions;){const e=t.Oo.values().next().value;t.Oo.delete(e);const n=new Zr(Yr.fromString(e)),r=t.qo.next();t.Mo.set(r,new Rh(n)),t.ko=t.ko.insert(n,r),Uu(t.remoteStore,new Ua(ei(Hs(n.path)),r,2,Dr.o))}}async function Wh(t,e,n){const r=Mr(t),s=[],i=[],o=[];r.xo.isEmpty()||(r.xo.forEach(((t,a)=>{o.push(r.Ko(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=jc.xn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.No.Tr(s),await async function(t,e){const n=Mr(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Da.forEach(e,(e=>Da.forEach(e.Cn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Da.forEach(e.Nn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!ka(t))throw t;xr("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.Bn.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.Bn=n.Bn.insert(e,s)}}}(r.localStore,i))}async function Yh(t,e){const n=Mr(t);if(!n.currentUser.isEqual(e)){xr("SyncEngine","User change. New user:",e.toKey());const t=await zc(n.localStore,e);n.currentUser=e,function(t,e){t.Bo.forEach((t=>{t.forEach((t=>{t.reject(new Hr(Qr.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.Bo.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Wh(n,t.Wn)}}function Xh(t,e){const n=Mr(t),r=n.Mo.get(e);if(r&&r.Co)return ho().add(r.key);{let t=ho();const r=n.$o.get(e);if(!r)return t;for(const e of r){const r=n.xo.get(e);t=t.unionWith(r.view.To)}return t}}async function Jh(t,e){const n=Mr(t),r=await Jc(n.localStore,e.query,!0),s=e.view.So(r);return n.isPrimaryClient&&zh(n,e.targetId,s.vo),s}async function Zh(t){const e=Mr(t);return tu(e.localStore).then((t=>Wh(e,t)))}async function tl(t,e,n,r){const s=Mr(t),i=await function(t,e){const n=Mr(t),r=Mr(n.Tn);return n.persistence.runTransaction("Lookup mutation documents","readonly",(t=>r.Jt(t,e).next((e=>e?n.Qn.Pn(t,e):Da.resolve(null)))))}(s.localStore,e);null!==i?("pending"===n?await Zu(s.remoteStore):"acknowledged"===n||"rejected"===n?($h(s,e,r||null),jh(s,e),function(t,e){Mr(Mr(t).Tn).Xt(e)}(s.localStore,e)):Lr(),await Wh(s,i)):xr("SyncEngine","Cannot apply mutation batch with id: "+e)}async function el(t,e,n){const r=Mr(t),s=[],i=[];for(const t of e){let e;const n=r.$o.get(t);if(n&&0!==n.length){e=await Yc(r.localStore,ei(n[0]));for(const t of n){const e=r.xo.get(t),n=await Jh(r,e);n.snapshot&&i.push(n.snapshot)}}else{const n=await Zc(r.localStore,t);e=await Yc(r.localStore,n),await Mh(r,nl(n),t,!1)}s.push(e)}return r.No.Tr(i),s}function nl(t){return Qs(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function rl(t){const e=Mr(t);return Mr(Mr(e.localStore).persistence).yn()}async function sl(t,e,n,r){const s=Mr(t);if(s.Uo)xr("SyncEngine","Ignoring unexpected query state notification.");else if(s.$o.has(e))switch(n){case"current":case"not-current":{const t=await tu(s.localStore),r=go.createSynthesizedRemoteEventForCurrentChange(e,"current"===n);await Wh(s,t,r);break}case"rejected":await Xc(s.localStore,e,!0),Gh(s,e,r);break;default:Lr()}}async function il(t,e,n){const r=ol(t);if(r.Uo){for(const t of e){if(r.$o.has(t)){xr("SyncEngine","Adding an already active target "+t);continue}const e=await Zc(r.localStore,t),n=await Yc(r.localStore,e);await Mh(r,nl(e),n.targetId,!1),Uu(r.remoteStore,n)}for(const t of n)r.$o.has(t)&&await Xc(r.localStore,t,!1).then((()=>{Bu(r.remoteStore,t),Gh(r,t)})).catch(vc)}}function ol(t){const e=Mr(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Fh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xh.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Vh.bind(null,e),e.No.Tr=bh.bind(null,e.eventManager),e.No.Qo=Eh.bind(null,e.eventManager),e}function al(t){const e=Mr(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Uh.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Bh.bind(null,e),e}class cl{constructor(){this.synchronizeTabs=!1}async initialize(t){this.D=Cu(t.databaseInfo.databaseId),this.sharedClientState=this.jo(t),this.persistence=this.Go(t),await this.persistence.start(),this.gcScheduler=this.zo(t),this.localStore=this.Ho(t)}zo(t){return null}Ho(t){return Kc(this.persistence,new $c,t.initialUser,this.D)}Go(t){return new uu(lu.Cs,this.D)}jo(t){return new Iu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class ul extends cl{constructor(t,e,n){super(),this.Jo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await async function(t){const e=Mr(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=kc(t);let n=ui.min();return e.qt({index:fa.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=Ka(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.Un=t}))}(this.localStore),await this.Jo.initialize(this,t),await al(this.Jo.syncEngine),await Zu(this.Jo.remoteStore)}Ho(t){return Kc(this.persistence,new $c,t.initialUser,this.D)}zo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new Ic(e,t.asyncQueue)}Go(t){const e=Vc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?oc.withCacheSize(this.cacheSizeBytes):oc.DEFAULT;return new Pc(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Nu(),xu(),this.D,this.sharedClientState,!!this.forceOwnership)}jo(t){return new Iu}}class hl extends ul{constructor(t,e){super(t,e,!1),this.Jo=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Jo.syncEngine;this.sharedClientState instanceof Eu&&(this.sharedClientState.syncEngine={wi:tl.bind(null,e),_i:sl.bind(null,e),mi:il.bind(null,e),yn:rl.bind(null,e),di:Zh.bind(null,e)},await this.sharedClientState.start()),await this.persistence.en((async t=>{await async function(t,e){const n=Mr(t);if(ol(n),al(n),!0===e&&!0!==n.Uo){const t=n.sharedClientState.getAllActiveQueryTargets(),e=await el(n,t.toArray());n.Uo=!0,await ch(n.remoteStore,!0);for(const t of e)Uu(n.remoteStore,t)}else if(!1===e&&!1!==n.Uo){const t=[];let e=Promise.resolve();n.$o.forEach(((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?t.push(s):e=e.then((()=>(Gh(n,s),Xc(n.localStore,s,!0)))),Bu(n.remoteStore,s)})),await e,await el(n,t),function(t){const e=Mr(t);e.Mo.forEach(((t,n)=>{Bu(e.remoteStore,n)})),e.Fo.cs(),e.Mo=new Map,e.ko=new Xi(Zr.comparator)}(n),n.Uo=!1,await ch(n.remoteStore,!1)}}(this.Jo.syncEngine,t),this.gcScheduler&&(t&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):t||this.gcScheduler.stop())}))}jo(t){const e=Nu();if(!Eu.At(e))throw new Hr(Qr.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Vc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Eu(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class ll{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>qh(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yh.bind(null,this.syncEngine),await ch(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new yh}createDatastore(t){const e=Cu(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Au(r));var r;return function(t,e,n){return new Mu(t,e,n)}(t.credentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>qh(this.syncEngine,t,0),i=_u.At()?new _u:new Tu,new Fu(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new Lh(t,e,n,r,s,i);return o&&(a.Uo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Mr(t);xr("RemoteStore","RemoteStore shutting down."),e.Kr.add(5),await Vu(e),e.Wr.shutdown(),e.jr.set("Unknown")}(this.remoteStore)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function dl(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class fl{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Yo(this.observer.next,t)}error(t){this.observer.error?this.Yo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Xo(){this.muted=!0}Yo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class gl{constructor(t,e){this.Zo=t,this.D=e,this.metadata=new Sa,this.buffer=new Uint8Array,this.tc=new TextDecoder("utf-8"),this.ec().then((t=>{t&&t.ho()?this.metadata.resolve(t.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==t?void 0:t.payload)}`))}),(t=>this.metadata.reject(t)))}close(){return this.Zo.cancel()}async getMetadata(){return this.metadata.promise}async Wo(){return await this.getMetadata(),this.ec()}async ec(){const t=await this.nc();if(null===t)return null;const e=this.tc.decode(t),n=Number(e);isNaN(n)&&this.sc(`length string (${e}) is not valid number`);const r=await this.ic(n);return new _h(JSON.parse(r),t.length+n)}rc(){return this.buffer.findIndex((t=>t==="{".charCodeAt(0)))}async nc(){for(;this.rc()<0&&!await this.oc(););if(0===this.buffer.length)return null;const t=this.rc();t<0&&this.sc("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async ic(t){for(;this.buffer.length<t;)await this.oc()&&this.sc("Reached the end of bundle when more is expected.");const e=this.tc.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}sc(t){throw this.Zo.cancel(),new Error(`Invalid bundle format: ${t}`)}async oc(){const t=await this.Zo.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ml{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new Hr(Qr.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(t,e){const n=Mr(t),r=Po(n.D)+"/documents",s={documents:e.map((t=>Ro(n.D,t)))},i=await n.Ui("BatchGetDocuments",r,s),o=new Map;i.forEach((t=>{const e=function(t,e){return"found"in e?function(t,e){Or(!!e.found),e.found.name,e.found.updateTime;const n=Lo(t,e.found.name),r=xo(e.found.updateTime),s=new li({mapValue:{fields:e.found.fields}});return new Ts(n,r,s,{})}(t,e):"missing"in e?function(t,e){Or(!!e.missing),Or(!!e.readTime);const n=Lo(t,e.missing),r=xo(e.readTime);return new _s(n,r)}(t,e):Lr()}(n.D,t);o.set(e.key.toString(),e)}));const a=[];return e.forEach((t=>{const e=o.get(t.toString());Or(!!e),a.push(e)})),a}(this.datastore,t);return e.forEach((t=>{t instanceof _s||t instanceof Ts?this.recordVersion(t):Lr()})),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastWriteError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new Gi(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((t,e)=>{const n=Zr.fromPath(e);this.mutations.push(new Ki(n,this.precondition(n)))})),await async function(t,e){const n=Mr(t),r=Po(n.D)+"/documents",s={writes:e.map((t=>Uo(n.D,t)))};await n.Fi("Commit",r,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t instanceof Ts)e=t.version;else{if(!(t instanceof _s))throw Lr();e=ui.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new Hr(Qr.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?Ci.updateTime(e):Ci.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(ui.min()))throw new Hr(Qr.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ci.updateTime(e)}return Ci.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
/**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pl{constructor(t,e,n,r){this.asyncQueue=t,this.datastore=e,this.updateFunction=n,this.deferred=r,this.cc=5,this.rr=new ku(this.asyncQueue,"transaction_retry")}run(){this.ac()}ac(){this.rr.Yi((async()=>{const t=new ml(this.datastore),e=this.uc(t);e&&e.then((e=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(e)})).catch((t=>{this.hc(t)}))))})).catch((t=>{this.hc(t)}))}))}uc(t){try{const e=this.updateFunction(t);return!Gr(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}hc(t){this.cc>0&&this.lc(t)?(this.cc-=1,this.asyncQueue.enqueueAndForget((()=>(this.ac(),Promise.resolve())))):this.deferred.reject(t)}lc(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||!Wi(e)}return!1}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class yl{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=du.UNAUTHENTICATED,this.clientId=Fr.u(),this.credentialListener=()=>{},this.receivedInitialUser=new Sa,this.credentials.setChangeListener((t=>{xr("FirestoreClient","Received user=",t.uid),this.user=t,this.credentialListener(t),this.receivedInitialUser.resolve()}))}async getConfiguration(){return await this.receivedInitialUser.promise,{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t,this.receivedInitialUser.promise.then((()=>this.credentialListener(this.user)))}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Hr(Qr.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Sa;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=dh(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function wl(t,e){t.asyncQueue.verifyOperationInProgress(),xr("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((n=>{r.isEqual(n)||(r=n,t.asyncQueue.enqueueRetryable((async()=>{await zc(e.localStore,n)})))})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function vl(t,e){t.asyncQueue.verifyOperationInProgress();const n=await bl(t);xr("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((n=>t.asyncQueue.enqueueRetryable((()=>async function(t,e){const n=Mr(t);n.asyncQueue.verifyOperationInProgress(),xr("RemoteStore","RemoteStore received new credentials");const r=zu(n);n.Kr.add(3),await Vu(n),r&&n.jr.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Kr.delete(3),await qu(n)}(e.remoteStore,n))))),t.onlineComponents=e}async function bl(t){return t.offlineComponents||(xr("FirestoreClient","Using default OfflineComponentProvider"),await wl(t,new cl)),t.offlineComponents}async function El(t){return t.onlineComponents||(xr("FirestoreClient","Using default OnlineComponentProvider"),await vl(t,new ll)),t.onlineComponents}function Il(t){return bl(t).then((t=>t.persistence))}function Tl(t){return bl(t).then((t=>t.localStore))}function _l(t){return El(t).then((t=>t.remoteStore))}function Sl(t){return El(t).then((t=>t.syncEngine))}async function Dl(t){const e=await El(t),n=e.eventManager;return n.onListen=Oh.bind(null,e.syncEngine),n.onUnlisten=Ph.bind(null,e.syncEngine),n}function Al(t,e,n={}){const r=new Sa;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new fl({next:i=>{e.enqueueAndForget((()=>vh(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new Hr(Qr.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new Hr(Qr.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new Th(Hs(n.path),i,{includeMetadataChanges:!0,uo:!0});return wh(t,o)}(await Dl(t),t.asyncQueue,e,n,r))),r.promise}function Nl(t,e,n={}){const r=new Sa;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new fl({next:n=>{e.enqueueAndForget((()=>vh(t,o))),n.fromCache&&"server"===r.source?s.reject(new Hr(Qr.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new Th(n,i,{includeMetadataChanges:!0,uo:!0});return wh(t,o)}(await Dl(t),t.asyncQueue,e,n,r))),r.promise}function xl(t,e,n,r){const s=function(t,e){let n;return n="string"==typeof t?(new TextEncoder).encode(t):t,function(t,e){return new gl(t,e)}(function(t,e){if(t instanceof Uint8Array)return dl(t,e);if(t instanceof ArrayBuffer)return dl(new Uint8Array(t),e);if(t instanceof ReadableStream)return t.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(n,Cu(e));t.asyncQueue.enqueueAndForget((async()=>{!function(t,e,n){const r=Mr(t);(async function(t,e,n){try{const r=await e.getMetadata();if(await function(t,e){const n=Mr(t),r=xo(e.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",(t=>n.He.getBundleMetadata(t,e.id))).then((t=>!!t&&t.createTime.compareTo(r)>=0))}(t.localStore,r))return await e.close(),void n._completeWith(function(t){return{taskState:"Success",documentsLoaded:t.totalDocuments,bytesLoaded:t.totalBytes,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}(r));n._updateProgress(Ah(r));const s=new Dh(r,t.localStore,e.D);let i=await e.Wo();for(;i;){const t=await s.fo(i);t&&n._updateProgress(t),i=await e.Wo()}const o=await s.complete();await Wh(t,o.En,void 0),await function(t,e){const n=Mr(t);return n.persistence.runTransaction("Save bundle","readwrite",(t=>n.He.saveBundleMetadata(t,e)))}(t.localStore,r),n._completeWith(o.progress)}catch(t){kr("SyncEngine",`Loading bundle failed with ${t}`),n._failWith(t)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */)(r,e,n).then((()=>{r.sharedClientState.notifyBundleLoaded()}))}(await Sl(t),s,r)}))}class Cl{constructor(t,e,n,r,s,i){this.databaseId=t,this.persistenceKey=e,this.host=n,this.ssl=r,this.forceLongPolling=s,this.autoDetectLongPolling=i}}class kl{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof kl&&t.projectId===this.projectId&&t.database===this.database}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Rl=new Map;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ll{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Ol{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t){this.changeListener=t,t(du.UNAUTHENTICATED)}removeChangeListener(){this.changeListener=null}}class Ml{constructor(t){this.fc=null,this.currentUser=du.UNAUTHENTICATED,this.receivedInitialUser=!1,this.dc=0,this.changeListener=null,this.forceRefresh=!1,this.fc=()=>{this.dc++,this.currentUser=this.wc(),this.receivedInitialUser=!0,this.changeListener&&this.changeListener(this.currentUser)},this.dc=0,this.auth=t.getImmediate({optional:!0}),this.auth?this.auth.addAuthTokenListener(this.fc):(this.fc(null),t.get().then((t=>{this.auth=t,this.fc&&this.auth.addAuthTokenListener(this.fc)}),(()=>{})))}getToken(){const t=this.dc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.dc!==t?(xr("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Or("string"==typeof e.accessToken),new Ll(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t){this.changeListener=t,this.receivedInitialUser&&t(this.currentUser)}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.fc),this.fc=null,this.changeListener=null}wc(){const t=this.auth&&this.auth.getUid();return Or(null===t||"string"==typeof t),new du(t)}}class Pl{constructor(t,e){this._c=t,this.mc=e,this.type="FirstParty",this.user=du.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.mc},e=this._c.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),t}}class Fl{constructor(t,e){this._c=t,this.mc=e}getToken(){return Promise.resolve(new Pl(this._c,this.mc))}setChangeListener(t){t(du.FIRST_PARTY)}removeChangeListener(){}invalidateToken(){}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ql(t,e,n){if(!n)throw new Hr(Qr.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Vl(t){if(!Zr.isDocumentKey(t))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Ul(t){if(Zr.isDocumentKey(t))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Bl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Lr()}function jl(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Hr(Qr.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Bl(t);throw new Hr(Qr.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function $l(t,e){if(e<=0)throw new Hr(Qr.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Gl{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Hr(Qr.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Hr(Qr.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,function(t,e,n,r){if(!0===e&&!0===r)throw new Hr(Qr.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Kl{constructor(t,e){this._persistenceKey="(lite)",this._settings=new Gl({}),this._settingsFrozen=!1,t instanceof kl?(this._databaseId=t,this._credentials=new Ol):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Hr(Qr.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new kl(t.options.projectId)}(t),this._credentials=new Ml(e))}get app(){if(!this._app)throw new Hr(Qr.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Hr(Qr.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Gl(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Ol;switch(t.type){case"gapi":const e=t.client;return Or(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Fl(e,t.sessionIndex||"0");case"provider":return t.client;default:throw new Hr(Qr.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Rl.get(t);e&&(xr("ComponentProvider","Removing Datastore"),Rl.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class zl{constructor(t){this._delegate=t}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ql{constructor(t,e,n){this._converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wl(this.firestore,this._converter,this._key.path.popLast())}withConverter(t){return new Ql(this.firestore,t,this._key)}}class Hl{constructor(t,e,n){this._converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Hl(this.firestore,t,this._query)}}class Wl extends Hl{constructor(t,e,n){super(t,e,Hs(n)),this.firestore=t,this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Ql(this.firestore,null,new Zr(t))}withConverter(t){return new Wl(this.firestore,t,this._path)}}function Yl(t,e,...n){if(t instanceof zl&&(t=t._delegate),ql("collection","path",e),t instanceof Kl){const r=Yr.fromString(e,...n);return Ul(r),new Wl(t,null,r)}{if(!(t instanceof Ql||t instanceof Wl))throw new Hr(Qr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=Yr.fromString(t.path,...n).child(Yr.fromString(e));return Ul(r),new Wl(t.firestore,null,r)}}function Xl(t,e,...n){if(t instanceof zl&&(t=t._delegate),1===arguments.length&&(e=Fr.u()),ql("doc","path",e),t instanceof Kl){const r=Yr.fromString(e,...n);return Vl(r),new Ql(t,null,new Zr(r))}{if(!(t instanceof Ql||t instanceof Wl))throw new Hr(Qr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Yr.fromString(e,...n));return Vl(r),new Ql(t.firestore,t instanceof Wl?t._converter:null,new Zr(r))}}function Jl(t,e){return t instanceof zl&&(t=t._delegate),e instanceof zl&&(e=e._delegate),(t instanceof Ql||t instanceof Wl)&&(e instanceof Ql||e instanceof Wl)&&t.firestore===e.firestore&&t.path===e.path&&t._converter===e._converter}function Zl(t,e){return t instanceof zl&&(t=t._delegate),e instanceof zl&&(e=e._delegate),t instanceof Hl&&e instanceof Hl&&t.firestore===e.firestore&&ri(t._query,e._query)&&t._converter===e._converter
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class td{constructor(){this.gc=Promise.resolve(),this.yc=[],this.Ec=!1,this.Tc=[],this.Ic=null,this.Ac=!1,this.Rc=[],this.rr=new ku(this,"async_queue_retry"),this.Pc=()=>{const t=xu();t&&xr("AsyncQueue","Visibility state changed to "+t.visibilityState),this.rr.Zi()};const t=xu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Pc)}get isShuttingDown(){return this.Ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.bc(),this.vc(t)}enterRestrictedMode(){if(!this.Ec){this.Ec=!0;const t=xu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Pc)}}enqueue(t){return this.bc(),this.Ec?new Promise((t=>{})):this.vc(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.yc.push(t),this.Vc())))}async Vc(){if(0!==this.yc.length){try{await this.yc[0](),this.yc.shift(),this.rr.reset()}catch(t){if(!ka(t))throw t;xr("AsyncQueue","Operation failed with retryable error: "+t)}this.yc.length>0&&this.rr.Yi((()=>this.Vc()))}}vc(t){const e=this.gc.then((()=>(this.Ac=!0,t().catch((t=>{throw this.Ic=t,this.Ac=!1,Cr("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)),t})).then((t=>(this.Ac=!1,t))))));return this.gc=e,e}enqueueAfterDelay(t,e,n){this.bc(),this.Rc.indexOf(t)>-1&&(e=0);const r=lh.createAndSchedule(this,t,e,n,(t=>this.Sc(t)));return this.Tc.push(r),r}bc(){this.Ic&&Lr()}verifyOperationInProgress(){}async Dc(){let t;do{t=this.gc,await t}while(t!==this.gc)}Cc(t){for(const e of this.Tc)if(e.timerId===t)return!0;return!1}Nc(t){return this.Dc().then((()=>{this.Tc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.Tc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Dc()}))}xc(t){this.Rc.push(t)}Sc(t){const e=this.Tc.indexOf(t);this.Tc.splice(e,1)}}function ed(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)}class nd{constructor(){this._progressObserver={},this._taskCompletionResolver=new Sa,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class rd extends Kl{constructor(t,e){super(t,e),this._queue=new td,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||id(this),this._firestoreClient.terminate()}}function sd(t){return t._firestoreClient||id(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function id(t){const e=t._freezeSettings(),n=function(t,e,n){return new Cl(t,e,n.host,n.ssl,n.experimentalForceLongPolling,n.experimentalAutoDetectLongPolling)}(t._databaseId,t._persistenceKey,e);t._firestoreClient=new yl(t._credentials,t._queue,n)}function od(t,e,n){const r=new Sa;return t.asyncQueue.enqueue((async()=>{try{await wl(t,n),await vl(t,e),r.resolve()}catch(t){if(!function(t){return"FirebaseError"===t.name?t.code===Qr.FAILED_PRECONDITION||t.code===Qr.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||(22===t.code||20===t.code||11===t.code)}(t))throw t;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}})).then((()=>r.promise))}function ad(t){return function(t){const e=new Sa;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e){const n=Mr(t);zu(n.remoteStore)||xr("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const t=await function(t){const e=Mr(t);return e.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(t=>e.Tn.getHighestUnacknowledgedBatchId(t)))}(n.localStore);if(-1===t)return void e.resolve();const r=n.Bo.get(t)||[];r.push(e),n.Bo.set(t,r)}catch(t){const n=dh(t,"Initialization of waitForPendingWrites() operation failed");e.reject(n)}}(await Sl(t),e))),e.promise}(sd(t=jl(t,rd)))}function cd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await Il(t),n=await _l(t);return e.setNetworkEnabled(!0),function(t){const e=Mr(t);return e.Kr.delete(0),qu(e)}(n)}))}(sd(t=jl(t,rd)))}function ud(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await Il(t),n=await _l(t);return e.setNetworkEnabled(!1),async function(t){const e=Mr(t);e.Kr.add(0),await Vu(e),e.jr.set("Offline")}(n)}))}(sd(t=jl(t,rd)))}function hd(t,e){return function(t,e){return t.asyncQueue.enqueue((async()=>function(t,e){const n=Mr(t);return n.persistence.runTransaction("Get named query","readonly",(t=>n.He.getNamedQuery(t,e)))}(await Tl(t),e)))}(sd(t=jl(t,rd)),e).then((e=>e?new Hl(t,null,e.query):null))}function ld(t){if(t._initialized||t._terminated)throw new Hr(Qr.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class dd{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Hr(Qr.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Jr(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class fd{constructor(t){this._byteString=t}static fromBase64String(t){try{return new fd(ts.fromBase64String(t))}catch(t){throw new Hr(Qr.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new fd(ts.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class gd{constructor(t){this._methodName=t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class md{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Hr(Qr.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Hr(Qr.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return qr(this._lat,t._lat)||qr(this._long,t._long)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const pd=/^__.*__$/;class yd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Vi(t,this.data,this.fieldMask,e,this.fieldTransforms):new qi(t,this.data,e,this.fieldTransforms)}}class wd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new Vi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function vd(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Lr()}}class bd{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.D=n,this.ignoreUndefinedProperties=r,void 0===s&&this.$c(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Oc(){return this.settings.Oc}kc(t){return new bd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.D,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Fc:!1});return r.Lc(t),r}Bc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Fc:!1});return r.$c(),r}qc(t){return this.kc({path:void 0,Fc:!0})}Uc(t){return Md(t,this.settings.methodName,this.settings.Kc||!1,this.path,this.settings.Qc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}$c(){if(this.path)for(let t=0;t<this.path.length;t++)this.Lc(this.path.get(t))}Lc(t){if(0===t.length)throw this.Uc("Document fields must not be empty");if(vd(this.Oc)&&pd.test(t))throw this.Uc('Document fields cannot begin and end with "__"')}}class Ed{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.D=n||Cu(t)}Wc(t,e,n,r=!1){return new bd({Oc:t,methodName:e,Qc:n,path:Jr.emptyPath(),Fc:!1,Kc:r},this.databaseId,this.D,this.ignoreUndefinedProperties)}}function Id(t){const e=t._freezeSettings(),n=Cu(t._databaseId);return new Ed(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Td(t,e,n,r,s,i={}){const o=t.Wc(i.merge||i.mergeFields?2:0,e,n,s);kd("Data must be an object, but it was:",o,r);const a=xd(r,o);let c,u;if(i.merge)c=new hi(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=Rd(e,r,n);if(!o.contains(s))throw new Hr(Qr.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Pd(t,s)||t.push(s)}c=new hi(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new yd(new li(a),c,u)}class _d extends gd{_toFieldTransform(t){if(2!==t.Oc)throw 1===t.Oc?t.Uc(`${this._methodName}() can only appear at the top level of your update data`):t.Uc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof _d}}function Sd(t,e,n,r){const s=t.Wc(1,e,n);kd("Data must be an object, but it was:",s,r);const i=[],o=new di;jr(r,((t,r)=>{const a=Od(e,t,n);r instanceof zl&&(r=r._delegate);const c=s.Bc(a);if(r instanceof _d)i.push(a);else{const t=Nd(r,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new hi(i);return new wd(o.P(),a,s.fieldTransforms)}function Dd(t,e,n,r,s,i){const o=t.Wc(1,e,n),a=[Rd(e,r,n)],c=[s];if(i.length%2!=0)throw new Hr(Qr.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(Rd(e,i[t])),c.push(i[t+1]);const u=[],h=new di;for(let t=a.length-1;t>=0;--t)if(!Pd(u,a[t])){const e=a[t];let n=c[t];n instanceof zl&&(n=n._delegate);const r=o.Bc(e);if(n instanceof _d)u.push(e);else{const t=Nd(n,r);null!=t&&(u.push(e),h.set(e,t))}}const l=new hi(u);return new wd(h.P(),l,o.fieldTransforms)}function Ad(t,e,n,r=!1){return Nd(n,t.Wc(r?4:3,e))}function Nd(t,e){if(t instanceof zl&&(t=t._delegate),Cd(t))return kd("Unsupported field value:",e,t),xd(t,e);if(t instanceof gd)return function(t,e){if(!vd(e.Oc))throw e.Uc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Uc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Fc&&4!==e.Oc)throw e.Uc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Nd(s,e.qc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(t instanceof zl&&(t=t._delegate),null===t)return{nullValue:"NULL_VALUE"};if("number"==typeof t)return function(t,e){return zr(e)?mi(e):gi(t,e)}(e.D,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=is.fromDate(t);return{timestampValue:Do(e.D,n)}}if(t instanceof is){const n=new is(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Do(e.D,n)}}if(t instanceof md)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof fd)return{bytesValue:Ao(e.D,t._byteString)};if(t instanceof Ql){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Uc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Co(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Uc(`Unsupported field value: ${Bl(t)}`)}(t,e)}function xd(t,e){const n={};return $r(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jr(t,((t,r)=>{const s=Nd(r,e.Mc(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function Cd(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof is||t instanceof md||t instanceof fd||t instanceof Ql||t instanceof gd)}function kd(t,e,n){if(!Cd(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Bl(n);throw"an object"===r?e.Uc(t+" a custom object"):e.Uc(t+" "+r)}}function Rd(t,e,n){if(e instanceof zl&&(e=e._delegate),e instanceof dd)return e._internalPath;if("string"==typeof e)return Od(t,e);throw Md("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Ld=new RegExp("[~\\*/\\[\\]]");function Od(t,e,n){if(e.search(Ld)>=0)throw Md(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new dd(...e.split("."))._internalPath}catch(r){throw Md(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Md(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Hr(Qr.INVALID_ARGUMENT,a+t+c)}function Pd(t,e){return t.some((t=>t.isEqual(e)))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Fd{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ql(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new qd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.toProto())}}get(t){if(this._document){const e=this._document.data().field(Vd("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class qd extends Fd{data(){return super.data()}}function Vd(t,e){return"string"==typeof e?Od(t,e):e instanceof zl?e._delegate._internalPath:e._internalPath}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ud{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Bd extends Fd{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new jd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.toProto(),t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data().field(Vd("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class jd extends Bd{data(t={}){return super.data(t)}}class $d{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Ud(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new jd(this._firestore,this._userDataWriter,n.key,n,new Ud(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query._converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Hr(Qr.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e,n=0;return t._snapshot.docChanges.map((r=>{const s=new jd(t._firestore,t._userDataWriter,r.doc.key,r.doc,new Ud(t._snapshot.mutatedKeys.has(r.doc.key),t._snapshot.fromCache),t.query._converter);return e=r.doc,{type:"added",doc:s,oldIndex:-1,newIndex:n++}}))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new jd(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Ud(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query._converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:Gd(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Gd(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Lr()}}function Kd(t,e){return t instanceof Bd&&e instanceof Bd?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(null===t._document?null===e._document:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof $d&&e instanceof $d&&t._firestore===e._firestore&&Zl(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function zd(t){if(Ys(t)&&0===t.explicitOrderBy.length)throw new Hr(Qr.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Qd{}function Hd(t,...e){for(const n of e)t=n._apply(t);return t}class Wd extends Qd{constructor(t,e,n){super(),this.zc=t,this.Hc=e,this.Jc=n,this.type="where"}_apply(t){const e=Id(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){nf(o,i);const e=[];for(const n of o)e.push(ef(r,t,n));a={arrayValue:{values:e}}}else a=ef(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||nf(o,i),a=Ad(n,"where",o,"in"===i||"not-in"===i);const c=ks.create(s,i,a);return function(t,e){if(e.g()){const n=Js(t);if(null!==n&&!n.isEqual(e.field))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);const r=Xs(t);null!==r&&rf(t,e.field,r)}const n=function(t,e){for(const n of t.filters)if(e.indexOf(n.op)>=0)return n.op;return null}(t,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new Hr(Qr.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Hr(Qr.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}(t,c),c}(t._query,0,e,t.firestore._databaseId,this.zc,this.Hc,this.Jc);return new Hl(t.firestore,t._converter,function(t,e){const n=t.filters.concat([e]);return new zs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}(t._query,n))}}class Yd extends Qd{constructor(t,e){super(),this.zc=t,this.Yc=e,this.type="orderBy"}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new Hr(Qr.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new Hr(Qr.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new js(e,n);return function(t,e){if(null===Xs(t)){const n=Js(t);null!==n&&rf(t,n,e.field)}}(t,r),r}(t._query,this.zc,this.Yc);return new Hl(t.firestore,t._converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new zs(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}class Xd extends Qd{constructor(t,e,n){super(),this.type=t,this.Xc=e,this.Zc=n}_apply(t){return new Hl(t.firestore,t._converter,ni(t._query,this.Xc,this.Zc))}}class Jd extends Qd{constructor(t,e,n){super(),this.type=t,this.ta=e,this.ea=n}_apply(t){const e=tf(t,this.type,this.ta,this.ea);return new Hl(t.firestore,t._converter,function(t,e){return new zs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,e,t.endAt)}(t._query,e))}}class Zd extends Qd{constructor(t,e,n){super(),this.type=t,this.ta=e,this.ea=n}_apply(t){const e=tf(t,this.type,this.ta,this.ea);return new Hl(t.firestore,t._converter,function(t,e){return new zs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,e)}(t._query,e))}}function tf(t,e,n,r){if(n[0]instanceof zl&&(n[0]=n[0]._delegate),n[0]instanceof Fd)return function(t,e,n,r,s){if(!r)throw new Hr(Qr.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of ti(t))if(n.field.isKeyField())i.push(ps(e,r.key));else{const t=r.field(n.field);if(os(t))throw new Hr(Qr.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=n.field.canonicalString();throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}i.push(t)}return new Us(i,s)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=Id(t.firestore);return function(t,e,n,r,s,i){const o=t.explicitOrderBy;if(s.length>o.length)throw new Hr(Qr.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const c=s[i];if(o[i].field.isKeyField()){if("string"!=typeof c)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!Zs(t)&&-1!==c.indexOf("/"))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=t.path.child(Yr.fromString(c));if(!Zr.isDocumentKey(n))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new Zr(n);a.push(ps(e,s))}else{const t=Ad(n,r,c);a.push(t)}}return new Us(a,i)}(t._query,t.firestore._databaseId,s,e,n,r)}}function ef(t,e,n){if(n instanceof zl&&(n=n._delegate),"string"==typeof n){if(""===n)throw new Hr(Qr.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!Zs(e)&&-1!==n.indexOf("/"))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Yr.fromString(n));if(!Zr.isDocumentKey(r))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ps(t,new Zr(r))}if(n instanceof Ql)return ps(t,n._key);throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${Bl(n)}.`)}function nf(t,e){if(!Array.isArray(t)||0===t.length)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function rf(t,e,n){if(!n.isEqual(e))throw new Hr(Qr.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class sf{convertValue(t,e="none"){switch(us(t)){case 0:return null;case 1:return t.booleanValue;case 2:return rs(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ss(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Lr()}}convertObject(t,e){const n={};return jr(t.fields||{},((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new md(rs(t.latitude),rs(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=as(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(cs(t));default:return null}}convertTimestamp(t){const e=ns(t);return new is(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Yr.fromString(t);Or(ea(n));const r=new kl(n.get(1),n.get(3)),s=new Zr(n.popFirst(5));return r.isEqual(e)||Cr(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function of(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class af extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new fd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ql(this.firestore,null,e)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class cf{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Id(t)}set(t,e,n){this._verifyNotCommitted();const r=uf(t,this._firestore),s=of(r._converter,e,n),i=Td(this._dataReader,"WriteBatch.set",r._key,s,null!==r._converter,n);return this._mutations.push(i.toMutation(r._key,Ci.none())),this}update(t,e,n,...r){this._verifyNotCommitted();const s=uf(t,this._firestore);let i;return e instanceof zl&&(e=e._delegate),i="string"==typeof e||e instanceof dd?Dd(this._dataReader,"WriteBatch.update",s._key,e,n,r):Sd(this._dataReader,"WriteBatch.update",s._key,e),this._mutations.push(i.toMutation(s._key,Ci.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=uf(t,this._firestore);return this._mutations=this._mutations.concat(new Gi(e._key,Ci.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Hr(Qr.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function uf(t,e){if(t instanceof zl&&(t=t._delegate),t.firestore!==e)throw new Hr(Qr.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class hf extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new fd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ql(this.firestore,null,e)}}function lf(t){t=jl(t,Ql);const e=jl(t.firestore,rd),n=sd(e),r=new hf(e);return function(t,e){const n=new Sa;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await function(t,e){const n=Mr(t);return n.persistence.runTransaction("read document","readonly",(t=>n.Qn.In(t,e)))}(t,e);r instanceof Ts?n.resolve(r):r instanceof _s?n.resolve(null):n.reject(new Hr(Qr.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(t){const r=dh(t,`Failed to get document '${e} from cache`);n.reject(r)}}(await Tl(t),e,n))),n.promise}(n,t._key).then((n=>new Bd(e,r,t._key,n,new Ud(n instanceof Ts&&n.hasLocalMutations,!0),t._converter)))}function df(t){t=jl(t,Hl);const e=jl(t.firestore,rd),n=sd(e),r=new hf(e);return function(t,e){const n=new Sa;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await Jc(t,e,!0),s=new Ch(e,r.jn),i=s.Io(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(t){const r=dh(t,`Failed to execute query '${e} against cache`);n.reject(r)}}(await Tl(t),e,n))),n.promise}(n,t._query).then((n=>new $d(e,r,t,n)))}function ff(t,e,n,...r){t=jl(t,Ql);const s=jl(t.firestore,rd),i=Id(s);let o;return e instanceof zl&&(e=e._delegate),o="string"==typeof e||e instanceof dd?Dd(i,"updateDoc",t._key,e,n,r):Sd(i,"updateDoc",t._key,e),pf(s,[o.toMutation(t._key,Ci.exists(!0))])}function gf(t,...e){var n,r,s;t instanceof zl&&(t=t._delegate);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||ed(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ed(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof Ql)u=jl(t.firestore,rd),h=Hs(t._key.path),c={next:n=>{e[o]&&e[o](yf(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=jl(t,Hl);u=jl(n.firestore,rd),h=n._query;const r=new hf(u);c={next:t=>{e[o]&&e[o](new $d(u,r,n,t))},error:e[o+1],complete:e[o+2]},zd(t._query)}return function(t,e,n,r){const s=new fl(r),i=new Th(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>wh(await Dl(t),i))),()=>{s.Xo(),t.asyncQueue.enqueueAndForget((async()=>vh(await Dl(t),i)))}}(sd(u),h,a,c)}function mf(t,e){return function(t,e){const n=new fl(e);return t.asyncQueue.enqueueAndForget((async()=>function(t,e){Mr(t).Zr.add(e),e.next()}(await Dl(t),n))),()=>{n.Xo(),t.asyncQueue.enqueueAndForget((async()=>function(t,e){Mr(t).Zr.delete(e)}(await Dl(t),n)))}}(sd(t=jl(t,rd)),ed(e)?e:{next:e})}function pf(t,e){return function(t,e){const n=new Sa;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=al(t);try{const t=await function(t,e){const n=Mr(t),r=is.now(),s=e.reduce(((t,e)=>t.add(e.key)),ho());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Qn.Pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=Mi(t,i.get(t.key));null!=e&&o.push(new Vi(t.key,e,fi(e.proto.mapValue),Ci.exists(!0)))}return n.Tn.addMutationBatch(t,r,o,e)})))).then((t=>{const e=t.applyToLocalDocumentSet(i);return{batchId:t.batchId,changes:e}}))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.Lo[t.currentUser.toKey()];r||(r=new Xi(qr)),r=r.insert(e,n),t.Lo[t.currentUser.toKey()]=r}(r,t.batchId,n),await Wh(r,t.changes),await Zu(r.remoteStore)}catch(t){const e=dh(t,"Failed to persist write");n.reject(e)}}(await Sl(t),e,n))),n.promise}(sd(t),e)}function yf(t,e,n){const r=n.docs.get(e._key),s=new hf(t);return new Bd(t,s,e._key,r,new Ud(n.hasPendingWrites,n.fromCache),e._converter)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class wf extends class{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Id(t)}get(t){const e=uf(t,this._firestore),n=new af(this._firestore);return this._transaction.lookup([e._key]).then((t=>{if(!t||1!==t.length)return Lr();const r=t[0];if(r instanceof _s)return new Fd(this._firestore,n,e._key,null,e._converter);if(r instanceof Ts)return new Fd(this._firestore,n,r.key,r,e._converter);throw Lr()}))}set(t,e,n){const r=uf(t,this._firestore),s=of(r._converter,e,n),i=Td(this._dataReader,"Transaction.set",r._key,s,null!==r._converter,n);return this._transaction.set(r._key,i),this}update(t,e,n,...r){const s=uf(t,this._firestore);let i;return e instanceof zl&&(e=e._delegate),i="string"==typeof e||e instanceof dd?Dd(this._dataReader,"Transaction.update",s._key,e,n,r):Sd(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,i),this}delete(t){const e=uf(t,this._firestore);return this._transaction.delete(e._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=uf(t,this._firestore),n=new hf(this._firestore);return super.get(t).then((t=>new Bd(this._firestore,n,e._key,t._document,new Ud(!1,!1),e._converter)))}}function vf(t,e){return function(t,e){const n=new Sa;return t.asyncQueue.enqueueAndForget((async()=>{const r=await function(t){return El(t).then((t=>t.datastore))}(t);new pl(t.asyncQueue,r,e,n).run()})),n.promise}(sd(t),(n=>e(new wf(t,n))))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */e._registerComponent(new f("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new rd(n,t.getProvider("auth-internal"));return e&&r._setSettings(e),r}),"PUBLIC")),e.registerVersion("firestore-exp","0.0.900","node");const bf="(default)";class Ef{constructor(t,e){this.projectId=t,this.database=e||bf}get isDefaultDatabase(){return this.database===bf}isEqual(t){return t instanceof Ef&&t.projectId===this.projectId&&t.database===this.database}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const If=new w("@firebase/firestore");function Tf(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
var e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function _f(t="Unexpected state"){const e="FIRESTORE (8.3.1) INTERNAL ASSERTION FAILED: "+t;throw function(t,...e){if(If.logLevel<=l.ERROR){const n=e.map(Tf);If.error(`Firestore (8.3.1): ${t}`,...n)}}(e),new Error(e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Sf="invalid-argument",Df="failed-precondition",Af="unimplemented";class Nf extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class xf{constructor(t,e,n){void 0===e?e=0:e>t.length&&_f(),void 0===n?n=t.length-e:n>t.length-e&&_f(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===xf.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof xf?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Cf extends xf{construct(t,e,n){return new Cf(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Nf(Sf,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Cf(e)}static emptyPath(){return new Cf([])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class kf{constructor(t){this.path=t}static fromPath(t){return new kf(Cf.fromString(t))}static fromName(t){return new kf(Cf.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Cf.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Cf.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new kf(new Cf(t.slice()))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Rf(t,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new Nf(Sf,`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}function Lf(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Nf(Sf,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":_f()}(t);throw new Nf(Sf,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
class Of{constructor(t){this._delegate=t}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Mf(){if("undefined"==typeof Uint8Array)throw new Nf(Af,"Uint8Arrays are not available in this environment.")}function Pf(){if("undefined"==typeof atob)throw new Nf(Af,"Blobs are unavailable in Firestore in this environment.")}class Ff extends Of{static fromBase64String(t){return Pf(),new Ff(fd.fromBase64String(t))}static fromUint8Array(t){return Mf(),new Ff(fd.fromUint8Array(t))}toBase64(){return Pf(),this._delegate.toBase64()}toUint8Array(){return Mf(),this._delegate.toUint8Array()}isEqual(t){return this._delegate.isEqual(t._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function qf(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of e)if(t in n&&"function"==typeof n[t])return!0;return!1}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t,["next","error","complete"])}class Vf{enableIndexedDbPersistence(t,e){return function(t,e){ld(t=jl(t,rd));const n=sd(t),r=t._freezeSettings(),s=new ll;return od(n,s,new ul(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}(t._delegate,{forceOwnership:e})}enableMultiTabIndexedDbPersistence(t){return function(t){ld(t=jl(t,rd));const e=sd(t),n=t._freezeSettings(),r=new ll;return od(e,r,new hl(r,n.cacheSizeBytes))}(t._delegate)}clearIndexedDbPersistence(t){return function(t){if(t._initialized&&!t._terminated)throw new Hr(Qr.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Sa;return t._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await async function(t){if(!Na.At())return Promise.resolve();const e=t+"main";await Na.delete(e)}(Vc(t._databaseId,t._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}(t._delegate)}}class Uf extends Of{constructor(t,e,n){super(e),this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},t instanceof Ef||(this._appCompat=t)}get _databaseId(){return this._delegate._databaseId}settings(t){t.merge&&delete(t=Object.assign(Object.assign({},this._delegate._getSettings()),t)).merge,this._delegate._setSettings(t)}useEmulator(t,e){!function(t,e,n){const r=(t=jl(t,Kl))._getSettings();"firestore.googleapis.com"!==r.host&&r.host!==e&&kr("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},r),{host:`${e}:${n}`,ssl:!1}))}(this._delegate,t,e)}enableNetwork(){return cd(this._delegate)}disableNetwork(){return ud(this._delegate)}enablePersistence(t){let e=!1,n=!1;return t&&(e=!!t.synchronizeTabs,n=!!t.experimentalForceOwningTab,function(t,e,n,r){if(!0===e&&!0===r)throw new Nf(Sf,`${t} and ${n} cannot be used together.`)}("synchronizeTabs",e,"experimentalForceOwningTab",n)),e?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore"),this._appCompat._removeServiceInstance("firestore-exp")),this._delegate._delete()}waitForPendingWrites(){return ad(this._delegate)}onSnapshotsInSync(t){return mf(this._delegate,t)}get app(){if(!this._appCompat)throw new Nf(Df,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(t){try{return new tg(this,Yl(this._delegate,t))}catch(t){throw zf(t,"collection()","Firestore.collection()")}}doc(t){try{return new Kf(this,Xl(this._delegate,t))}catch(t){throw zf(t,"doc()","Firestore.doc()")}}collectionGroup(t){try{return new Xf(this,function(t,e){if(t=jl(t,Kl),ql("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new Hr(Qr.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Hl(t,null,function(t){return new zs(Yr.emptyPath(),t)}(e))}(this._delegate,t))}catch(t){throw zf(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(t){return vf(this._delegate,(e=>t(new jf(this,e))))}batch(){return sd(this._delegate),new $f(new cf(this._delegate,(t=>pf(this._delegate,t))))}loadBundle(t){throw new Nf(Df,'"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?')}namedQuery(t){throw new Nf(Df,'"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?')}}class Bf extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ff(new fd(t))}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return Kf.forKey(e,this.firestore,null)}}class jf extends Of{constructor(t,e){super(e),this._firestore=t,this._userDataWriter=new Bf(t)}get(t){const e=eg(t);return this._delegate.get(e).then((t=>new Wf(this._firestore,new Bd(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,e._converter))))}set(t,e,n){const r=eg(t);return n?(Rf("Transaction.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=eg(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=eg(t);return this._delegate.delete(e),this}}class $f extends Of{set(t,e,n){const r=eg(t);return n?(Rf("WriteBatch.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=eg(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=eg(t);return this._delegate.delete(e),this}commit(){return this._delegate.commit()}}class Gf extends Of{constructor(t,e,n){super(n),this._firestore=t,this._userDataWriter=e}fromFirestore(t,e){const n=new jd(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,null);return this._delegate.fromFirestore(new Yf(this._firestore,n),null!=e?e:{})}toFirestore(t,e){return e?this._delegate.toFirestore(t,e):this._delegate.toFirestore(t)}static getInstance(t,e){const n=Gf.INSTANCES;let r=n.get(t);r||(r=new WeakMap,n.set(t,r));let s=r.get(e);return s||(s=new Gf(t,new Bf(t),e),r.set(e,s)),s}}Gf.INSTANCES=new WeakMap;class Kf extends Of{constructor(t,e){super(e),this.firestore=t,this._userDataWriter=new Bf(t)}static forPath(t,e,n){if(t.length%2!=0)throw new Nf(Sf,`Invalid document reference. Document references must have an even number of segments, but ${t.canonicalString()} has ${t.length}`);return new Kf(e,new Ql(e._delegate,n,new kf(t)))}static forKey(t,e,n){return new Kf(e,new Ql(e._delegate,n,t))}get id(){return this._delegate.id}get parent(){return new tg(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(t){try{return new tg(this.firestore,Yl(this._delegate,t))}catch(t){throw zf(t,"collection()","DocumentReference.collection()")}}isEqual(t){return t instanceof Of&&(t=t._delegate),t instanceof Ql&&Jl(this._delegate,t)}set(t,e){e=Rf("DocumentReference.set",e);try{return function(t,e,n){t=jl(t,Ql);const r=jl(t.firestore,rd),s=of(t._converter,e,n);return pf(r,[Td(Id(r),"setDoc",t._key,s,null!==t._converter,n).toMutation(t._key,Ci.none())])}(this._delegate,t,e)}catch(t){throw zf(t,"setDoc()","DocumentReference.set()")}}update(t,e,...n){try{return 1===arguments.length?ff(this._delegate,t):ff(this._delegate,t,e,...n)}catch(t){throw zf(t,"updateDoc()","DocumentReference.update()")}}delete(){return function(t){return pf(jl(t.firestore,rd),[new Gi(t._key,Ci.none())])}(this._delegate)}onSnapshot(...t){const e=Qf(t),n=Hf(t,(t=>new Wf(this.firestore,new Bd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate._converter))));return gf(this._delegate,e,n)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?lf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=jl(t,Ql);const e=jl(t.firestore,rd);return Al(sd(e),t._key,{source:"server"}).then((n=>yf(e,t,n)))}(this._delegate):function(t){t=jl(t,Ql);const e=jl(t.firestore,rd);return Al(sd(e),t._key).then((n=>yf(e,t,n)))}(this._delegate),e.then((t=>new Wf(this.firestore,new Bd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate._converter))))}withConverter(t){return new Kf(this.firestore,t?this._delegate.withConverter(Gf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function zf(t,e,n){return t.message=t.message.replace(e,n),t}function Qf(t){for(const e of t)if("object"==typeof e&&!qf(e))return e;return{}}function Hf(t,e){var n,r;let s;return s=qf(t[0])?t[0]:qf(t[1])?t[1]:"function"==typeof t[0]?{next:t[0],error:t[1],complete:t[2]}:{next:t[1],error:t[2],complete:t[3]},{next:t=>{s.next&&s.next(e(t))},error:null===(n=s.error)||void 0===n?void 0:n.bind(s),complete:null===(r=s.complete)||void 0===r?void 0:r.bind(s)}}class Wf extends Of{constructor(t,e){super(e),this._firestore=t}get ref(){return new Kf(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(t){return this._delegate.data(t)}get(t,e){return this._delegate.get(t,e)}isEqual(t){return Kd(this._delegate,t._delegate)}}class Yf extends Wf{data(t){return this._delegate.data(t)}}class Xf extends Of{constructor(t,e){super(e),this.firestore=t,this._userDataWriter=new Bf(t)}where(t,e,n){try{return new Xf(this.firestore,Hd(this._delegate,function(t,e,n){const r=e,s=Vd("where",t);return new Wd(s,r,n)}(t,e,n)))}catch(t){throw zf(t,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(t,e){try{return new Xf(this.firestore,Hd(this._delegate,function(t,e="asc"){const n=e,r=Vd("orderBy",t);return new Yd(r,n)}(t,e)))}catch(t){throw zf(t,/(orderBy|where)\(\)/,"Query.$1()")}}limit(t){try{return new Xf(this.firestore,Hd(this._delegate,function(t){return $l("limit",t),new Xd("limit",t,"F")}(t)))}catch(t){throw zf(t,"limit()","Query.limit()")}}limitToLast(t){try{return new Xf(this.firestore,Hd(this._delegate,function(t){return $l("limitToLast",t),new Xd("limitToLast",t,"L")}(t)))}catch(t){throw zf(t,"limitToLast()","Query.limitToLast()")}}startAt(...t){try{return new Xf(this.firestore,Hd(this._delegate,function(...t){return new Jd("startAt",t,!0)}(...t)))}catch(t){throw zf(t,"startAt()","Query.startAt()")}}startAfter(...t){try{return new Xf(this.firestore,Hd(this._delegate,function(...t){return new Jd("startAfter",t,!1)}(...t)))}catch(t){throw zf(t,"startAfter()","Query.startAfter()")}}endBefore(...t){try{return new Xf(this.firestore,Hd(this._delegate,function(...t){return new Zd("endBefore",t,!0)}(...t)))}catch(t){throw zf(t,"endBefore()","Query.endBefore()")}}endAt(...t){try{return new Xf(this.firestore,Hd(this._delegate,function(...t){return new Zd("endAt",t,!1)}(...t)))}catch(t){throw zf(t,"endAt()","Query.endAt()")}}isEqual(t){return Zl(this._delegate,t._delegate)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?df(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=jl(t,Hl);const e=jl(t.firestore,rd),n=sd(e),r=new hf(e);return Nl(n,t._query,{source:"server"}).then((n=>new $d(e,r,t,n)))}(this._delegate):function(t){t=jl(t,Hl);const e=jl(t.firestore,rd),n=sd(e),r=new hf(e);return zd(t._query),Nl(n,t._query).then((n=>new $d(e,r,t,n)))}(this._delegate),e.then((t=>new Zf(this.firestore,new $d(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))))}onSnapshot(...t){const e=Qf(t),n=Hf(t,(t=>new Zf(this.firestore,new $d(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))));return gf(this._delegate,e,n)}withConverter(t){return new Xf(this.firestore,t?this._delegate.withConverter(Gf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}class Jf extends Of{constructor(t,e){super(e),this._firestore=t}get type(){return this._delegate.type}get doc(){return new Yf(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class Zf extends Of{constructor(t,e){super(e),this._firestore=t}get query(){return new Xf(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map((t=>new Yf(this._firestore,t)))}docChanges(t){return this._delegate.docChanges(t).map((t=>new Jf(this._firestore,t)))}forEach(t,e){this._delegate.forEach((n=>{t.call(e,new Yf(this._firestore,n))}))}isEqual(t){return Kd(this._delegate,t._delegate)}}class tg extends Xf{constructor(t,e){super(t,e),this.firestore=t,this._delegate=e}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const t=this._delegate.parent;return t?new Kf(this.firestore,t):null}doc(t){try{return new Kf(this.firestore,void 0===t?Xl(this._delegate):Xl(this._delegate,t))}catch(t){throw zf(t,"doc()","CollectionReference.doc()")}}add(t){return function(t,e){const n=jl(t.firestore,rd),r=Xl(t),s=of(t._converter,e);return pf(n,[Td(Id(t.firestore),"addDoc",r._key,s,null!==t._converter,{}).toMutation(r._key,Ci.exists(!1))]).then((()=>r))}(this._delegate,t).then((t=>new Kf(this.firestore,t)))}isEqual(t){return Jl(this._delegate,t._delegate)}withConverter(t){return new tg(this.firestore,t?this._delegate.withConverter(Gf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function eg(t){return t instanceof Of&&(t=t._delegate),Lf(t,Ql)}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ng(t){return function(t,e){const n=sd(t=jl(t,rd)),r=new nd;return xl(n,t._databaseId,e,r),r}(this._delegate,t)}function rg(t){return hd(this._delegate,t).then((t=>t?new Xf(this,t):null))}
/**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
const sg={Firestore:Uf,GeoPoint:md,Timestamp:is,Blob:Ff,Transaction:jf,WriteBatch:$f,DocumentReference:Kf,DocumentSnapshot:Wf,Query:Xf,QueryDocumentSnapshot:Yf,QuerySnapshot:Zf,CollectionReference:tg,FieldPath:dd,FieldValue:gd,setLogLevel:function(t){var e;e=t,If.setLogLevel(e)},CACHE_SIZE_UNLIMITED:-1};
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
var ig;(function(t,e){t.INTERNAL.registerComponent(new f("firestore-compat",(t=>{const n=t.getProvider("app-compat").getImmediate(),r=t.getProvider("firestore-exp").getImmediate();return e(n,r)}),"PUBLIC").setServiceProps(Object.assign({},sg)))})(ig=r.default,((t,e)=>new Uf(t,e,new Vf))),ig.registerVersion("@firebase/firestore","0.0.900"),function(t){t.prototype.loadBundle=ng,t.prototype.namedQuery=rg}(Uf)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-firestore-compat.js.map
