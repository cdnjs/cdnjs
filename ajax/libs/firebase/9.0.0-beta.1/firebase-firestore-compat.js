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
var a=function(t){function e(n,r,s){var i=t.call(this,r)||this;return i.code=n,i.customData=s,i.name="FirebaseError",Object.setPrototypeOf(i,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,c.prototype.create),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),c=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},s=this.service+"/"+t,i=this.errors[t],o=i?u(i,r):"Error",c=this.serviceName+": "+o+" ("+s+").",h=new a(s,c,r);return h},t}();function u(t,e){return t.replace(h,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var h=/\{\$([^}]+)}/g;
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
     */function l(t){return t&&t._delegate?t._delegate:t}var d,f,m=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}();
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
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(f||(f={}));var g={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},p=f.INFO,y=((d={})[f.DEBUG]="log",d[f.VERBOSE]="log",d[f.INFO]="info",d[f.WARN]="warn",d[f.ERROR]="error",d),w=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),o=y[e];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[o].apply(console,i(["["+s+"]  "+t.name+":"],n))}},v=function(){function t(t){this.name=t,this._logLevel=p,this._logHandler=w,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in f))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?g[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,f.DEBUG],t)),this._logHandler.apply(this,i([this,f.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,f.VERBOSE],t)),this._logHandler.apply(this,i([this,f.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,f.INFO],t)),this._logHandler.apply(this,i([this,f.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,f.WARN],t)),this._logHandler.apply(this,i([this,f.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,i([this,f.ERROR],t)),this._logHandler.apply(this,i([this,f.ERROR],t))},t}(),b=function(t,e){return(b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function I(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var E,_="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},T=T||{},S=_||self;function N(){}function D(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function A(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var x="closure_uid_"+(1e9*Math.random()>>>0),C=0;function R(t,e,n){return t.call.apply(t.bind,arguments)}function k(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function L(t,e,n){return(L=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?R:k).apply(null,arguments)}function O(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function M(){return Date.now()}function P(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Kb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function F(){this.j=this.j,this.i=this.i}F.prototype.j=!1,F.prototype.ja=function(){if(!this.j&&(this.j=!0,this.G(),0))(function(t){Object.prototype.hasOwnProperty.call(t,x)&&t[x]||(t[x]=++C)})(this)},F.prototype.G=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var V=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},q=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function U(t){return Array.prototype.concat.apply([],arguments)}function B(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function $(t){return/^[\s\xa0]*$/.test(t)}var K,j=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function G(t,e){return-1!=t.indexOf(e)}function Q(t,e){return t<e?-1:t>e?1:0}t:{var z=S.navigator;if(z){var H=z.userAgent;if(H){K=H;break t}}K=""}function W(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function Y(t){var e={};for(var n in t)e[n]=t[n];return e}var X="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function J(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<X.length;i++)n=X[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function Z(t){return Z[" "](t),t}Z[" "]=N;var tt,et,nt=G(K,"Opera"),rt=G(K,"Trident")||G(K,"MSIE"),st=G(K,"Edge"),it=st||rt,ot=G(K,"Gecko")&&!(G(K.toLowerCase(),"webkit")&&!G(K,"Edge"))&&!(G(K,"Trident")||G(K,"MSIE"))&&!G(K,"Edge"),at=G(K.toLowerCase(),"webkit")&&!G(K,"Edge");function ct(){var t=S.document;return t?t.documentMode:void 0}t:{var ut="",ht=(et=K,ot?/rv:([^\);]+)(\)|;)/.exec(et):st?/Edge\/([\d\.]+)/.exec(et):rt?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(et):at?/WebKit\/(\S+)/.exec(et):nt?/(?:Version)[ \/]?(\S+)/.exec(et):void 0);if(ht&&(ut=ht?ht[1]:""),rt){var lt=ct();if(null!=lt&&lt>parseFloat(ut)){tt=String(lt);break t}}tt=ut}var dt,ft={};function mt(t){return function(t,e){var n=ft;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=j(String(tt)).split("."),r=j(String(t)).split("."),s=Math.max(n.length,r.length),i=0;0==e&&i<s;i++){var o=n[i]||"",a=r[i]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=Q(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||Q(0==o[2].length,0==a[2].length)||Q(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(S.document&&rt){var gt=ct();dt=gt||(parseInt(tt,10)||void 0)}else dt=void 0;var pt=dt,yt=!rt||9<=Number(pt),wt=rt&&!mt("9"),vt=function(){if(!S.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{S.addEventListener("test",N,e),S.removeEventListener("test",N,e)}catch(t){}return t}();function bt(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function It(t,e){if(bt.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(ot){t:{try{Z(e.nodeName);var s=!0;break t}catch(t){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Et[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}bt.prototype.b=function(){this.defaultPrevented=!0},P(It,bt);var Et={2:"touch",3:"pen",4:"mouse"};It.prototype.b=function(){It.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,wt)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(t){}};var _t="closure_listenable_"+(1e6*Math.random()|0),Tt=0;function St(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ca=s,this.key=++Tt,this.Y=this.Z=!1}function Nt(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.ca=null}function Dt(t){this.src=t,this.a={},this.b=0}function At(t,e){var n=e.type;if(n in t.a){var r,s=t.a[n],i=V(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Nt(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function xt(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.Y&&i.listener==e&&i.capture==!!n&&i.ca==r)return s}return-1}Dt.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.a[i])||(t=this.a[i]=[],this.b++);var o=xt(t,e,r,s);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new St(e,this.src,i,!!r,s)).Z=n,t.push(e)),e};var Ct="closure_lm_"+(1e6*Math.random()|0),Rt={};function kt(t,e,n,r,s){if(r&&r.once)return Ot(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)kt(t,e[i],n,r,s);return null}return n=$t(n),t&&t[_t]?t.va(e,n,A(r)?!!r.capture:!!r,s):Lt(t,e,n,!1,r,s)}function Lt(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=A(s)?!!s.capture:!!s;if(o&&!yt)return null;var a=Ut(t);if(a||(t[Ct]=a=new Dt(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){var t=qt,e=yt?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)vt||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Ft(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Ot(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ot(t,e[i],n,r,s);return null}return n=$t(n),t&&t[_t]?t.wa(e,n,A(r)?!!r.capture:!!r,s):Lt(t,e,n,!0,r,s)}function Mt(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Mt(t,e[i],n,r,s);else r=A(r)?!!r.capture:!!r,n=$t(n),t&&t[_t]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=xt(i=t.a[e],n,r,s))&&(Nt(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.a[e],t.b--)))):t&&(t=Ut(t))&&(e=t.a[e.toString()],t=-1,e&&(t=xt(e,n,r,s)),(n=-1<t?e[t]:null)&&Pt(n))}function Pt(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[_t])At(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ft(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Ut(e))?(At(n,t),0==n.b&&(n.src=null,e[Ct]=null)):Nt(t)}}}function Ft(t){return t in Rt?Rt[t]:Rt[t]="on"+t}function Vt(t,e){var n=t.listener,r=t.ca||t.src;return t.Z&&Pt(t),n.call(r,e)}function qt(t,e){if(t.Y)return!0;if(!yt){if(!e)t:{e=["window","event"];for(var n=S,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return Vt(t,e=new It(e,this))}return Vt(t,new It(e,this))}function Ut(t){return(t=t[Ct])instanceof Dt?t:null}var Bt="__closure_events_fn_"+(1e9*Math.random()>>>0);function $t(t){return"function"==typeof t?t:(t[Bt]||(t[Bt]=function(e){return t.handleEvent(e)}),t[Bt])}function Kt(){F.call(this),this.c=new Dt(this),this.J=this,this.C=null}function jt(t,e){var n,r=t.C;if(r)for(n=[];r;r=r.C)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new bt(e,t);else if(e instanceof bt)e.target=e.target||t;else{var s=e;J(e=new bt(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.a=n[i];s=Gt(o,r,!0,e)&&s}if(s=Gt(o=e.a=t,r,!0,e)&&s,s=Gt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=Gt(o=e.a=n[i],r,!1,e)&&s}function Gt(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.ca||o.src;o.Z&&At(t.c,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}P(Kt,F),Kt.prototype[_t]=!0,(E=Kt.prototype).addEventListener=function(t,e,n,r){kt(this,t,e,n,r)},E.removeEventListener=function(t,e,n,r){Mt(this,t,e,n,r)},E.G=function(){if(Kt.X.G.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)Nt(n[r]);delete e.a[t],e.b--}}this.C=null},E.va=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},E.wa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var Qt=S.JSON.stringify;function zt(){this.b=this.a=null}var Ht,Wt=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new Xt}),(function(t){t.reset()}));function Yt(){var t=ee,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function Xt(){this.next=this.b=this.a=null}function Jt(t){S.setTimeout((function(){throw t}),0)}function Zt(t,e){Ht||function(){var t=S.Promise.resolve(void 0);Ht=function(){t.then(ne)}}(),te||(Ht(),te=!0),ee.add(t,e)}zt.prototype.add=function(t,e){var n=Wt.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},Xt.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},Xt.prototype.reset=function(){this.next=this.b=this.a=null};var te=!1,ee=new zt;function ne(){for(var t;t=Yt();){try{t.a.call(t.b)}catch(t){Jt(t)}var e=Wt;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}te=!1}function re(t,e){Kt.call(this),this.b=t||1,this.a=e||S,this.f=L(this.Za,this),this.g=M()}function se(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function ie(t,e,n){if("function"==typeof t)n&&(t=L(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=L(t.handleEvent,t)}return 2147483647<Number(e)?-1:S.setTimeout(t,e||0)}function oe(t){t.a=ie((function(){t.a=null,t.c&&(t.c=!1,oe(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}P(re,Kt),(E=re.prototype).aa=!1,E.M=null,E.Za=function(){if(this.aa){var t=M()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),jt(this,"tick"),this.aa&&(se(this),this.start()))}},E.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=M())},E.G=function(){re.X.G.call(this),se(this),delete this.a};var ae=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}b(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:oe(this)},e.prototype.G=function(){t.prototype.G.call(this),this.a&&(S.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(F);function ce(t){F.call(this),this.b=t,this.a={}}P(ce,F);var ue=[];function he(t,e,n,r){Array.isArray(n)||(n&&(ue[0]=n.toString()),n=ue);for(var s=0;s<n.length;s++){var i=kt(e,n[s],r||t.handleEvent,!1,t.b||t);if(!i)break;t.a[i.key]=i}}function le(t){W(t.a,(function(t,e){this.a.hasOwnProperty(e)&&Pt(t)}),t),t.a={}}function de(){this.a=!0}function fe(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return Qt(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}ce.prototype.G=function(){ce.X.G.call(this),le(this)},ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},de.prototype.info=function(){};var me={},ge=null;function pe(){return ge=ge||new Kt}function ye(t){bt.call(this,me.Fa,t)}function we(t){var e=pe();jt(e,new ye(e,t))}function ve(t,e){bt.call(this,me.STAT_EVENT,t),this.stat=e}function be(t){var e=pe();jt(e,new ve(e,t))}function Ie(t){bt.call(this,me.Ga,t)}function Ee(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return S.setTimeout((function(){t()}),e)}me.Fa="serverreachability",P(ye,bt),me.STAT_EVENT="statevent",P(ve,bt),me.Ga="timingevent",P(Ie,bt);var _e={NO_ERROR:0,$a:1,nb:2,mb:3,hb:4,lb:5,ob:6,Da:7,TIMEOUT:8,rb:9},Te={fb:"complete",Bb:"success",Ea:"error",Da:"abort",tb:"ready",ub:"readystatechange",TIMEOUT:"timeout",pb:"incrementaldata",sb:"progress",ib:"downloadprogress",Jb:"uploadprogress"};function Se(){}function Ne(t){var e;return(e=t.a)||(e=t.a={}),e}function De(){}Se.prototype.a=null;var Ae,xe={OPEN:"a",eb:"b",Ea:"c",qb:"d"};function Ce(){bt.call(this,"d")}function Re(){bt.call(this,"c")}function ke(){}function Le(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new ce(this),this.P=Oe,t=it?125:void 0,this.R=new re(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.H=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}P(Ce,bt),P(Re,bt),P(ke,Se),Ae=new ke;var Oe=45e3,Me={},Pe={};function Fe(t,e,n){t.H=1,t.i=on(Ze(e)),t.j=n,t.I=!0,Ve(t,null)}function Ve(t,e){t.u=M(),Be(t),t.l=Ze(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),vn(n.b,"t",r),t.D=0,t.a=fr(t.g,t.g.C?e:null),0<t.O&&(t.F=new ae(L(t.Ca,t,t.a),t.O)),he(t.J,t.a,"readystatechange",t.Xa),e=t.B?Y(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),we(1),function(t,e,n,r,s,i){t.info((function(){if(t.a)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function qe(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var s=Ue(t,n);if(s==Pe){4==e&&(t.h=4,be(14),r=!1),fe(t.c,t.f,null,"[Incomplete Response]");break}if(s==Me){t.h=4,be(15),fe(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}fe(t.c,t.f,s,null),Qe(t,s)}4==e&&0==n.length&&(t.h=1,be(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),ir(e),e.F=!0,be(11))):(fe(t.c,t.f,n,"[Invalid Chunked Response]"),Ge(t),je(t))}function Ue(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Pe:(n=Number(e.substring(n,r)),isNaN(n)?Me:(r+=1)+n>e.length?Pe:(e=e.substr(r,n),t.D=r+n,e))}function Be(t){t.T=M()+t.P,$e(t,t.P)}function $e(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=Ee(L(t.Va,t),e)}function Ke(t){t.o&&(S.clearTimeout(t.o),t.o=null)}function je(t){0==t.g.v||t.A||cr(t.g,t)}function Ge(t){Ke(t);var e=t.F;e&&"function"==typeof e.ja&&e.ja(),t.F=null,se(t.R),le(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ja())}function Qe(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||Nn(n.b,t)))if(n.I=t.N,!t.C&&Nn(n.b,t)&&3==n.v){try{var r=n.ka.a.parse(e)}catch(t){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;ar(n),Yn(n)}sr(n),be(18)}}else n.oa=s[1],0<n.oa-n.P&&37500>s[2]&&n.H&&0==n.o&&!n.m&&(n.m=Ee(L(n.Sa,n),6e3));if(1>=Sn(n.b)&&n.ea){try{n.ea()}catch(t){}n.ea=void 0}}else hr(n,11)}else if((t.C||n.a==t)&&ar(n),!$(e))for(e=r=n.ka.a.parse(e),r=0;r<e.length;r++)if(s=e[r],n.P=s[0],s=s[1],2==n.v)if("c"==s[0]){n.J=s[1],n.ga=s[2];var i=s[3];null!=i&&(n.ha=i,n.c.info("VER="+n.ha));var o=s[4];null!=o&&(n.pa=o,n.c.info("SVER="+n.pa));var a=s[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(G(h,"spdy")||G(h,"quic")||G(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(Dn(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.na=d,sn(c.B,c.A,d))}}n.v=3,n.f&&n.f.ta(),n.U&&(n.N=M()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).la=dr(c,c.C?c.ga:null,c.fa),f.C){An(c.b,f);var m=f,g=c.D;g&&m.setTimeout(g),m.o&&(Ke(m),Be(m)),c.a=f}else rr(c);0<n.g.length&&Zn(n)}else"stop"!=s[0]&&"close"!=s[0]||hr(n,7);else 3==n.v&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?hr(n,7):Wn(n):"noop"!=s[0]&&n.f&&n.f.sa(s),n.o=0);we(4)}catch(t){}}function ze(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(D(t)||"string"==typeof t)q(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(D(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(D(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function He(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof He)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function We(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];Ye(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var s={};for(n=e=0;e<t.a.length;)Ye(s,r=t.a[e])||(t.a[n++]=r,s[r]=1),e++;t.a.length=n}}function Ye(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(E=Le.prototype).setTimeout=function(t){this.P=t},E.Xa=function(t){t=t.target;var e=this.F;e&&3==Gn(t)?e.f():this.Ca(t)},E.Ca=function(t){try{if(t==this.a)t:{var e=Gn(this.a),n=this.a.ua(),r=this.a.W();if(!(3>e||3==e&&!it&&!this.a.$())){this.A||4!=e||7==n||we(8==n||0>=r?3:2),Ke(this);var s=this.a.W();this.N=s;var i=this.a.$();if(this.b=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,s),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!$(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,be(12),Ge(this),je(this);break t}fe(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,Qe(this,c)}this.I?(qe(this,e,i),it&&this.b&&3==e&&(he(this.J,this.R,"tick",this.Wa),this.R.start())):(fe(this.c,this.f,i,null),Qe(this,i)),4==e&&Ge(this),this.b&&!this.A&&(4==e?cr(this.g,this):(this.b=!1,Be(this)))}else 400==s&&0<i.indexOf("Unknown SID")?(this.h=3,be(12)):(this.h=0,be(13)),Ge(this),je(this)}}}catch(t){}},E.Wa=function(){if(this.a){var t=Gn(this.a),e=this.a.$();this.D<e.length&&(Ke(this),qe(this,t,e),this.b&&4!=t&&Be(this))}},E.cancel=function(){this.A=!0,Ge(this)},E.Va=function(){this.o=null;var t=M();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.H&&(we(3),be(17)),Ge(this),this.h=2,je(this)):$e(this,this.T-t)},(E=He.prototype).K=function(){We(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},E.L=function(){return We(this),this.a.concat()},E.get=function(t,e){return Ye(this.b,t)?this.b[t]:e},E.set=function(t,e){Ye(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},E.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Xe=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Je(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof Je){this.a=void 0!==e?e:t.a,tn(this,t.f),this.j=t.j,en(this,t.c),nn(this,t.h),this.g=t.g,e=t.b;var n=new gn;n.c=e.c,e.a&&(n.a=new He(e.a),n.b=e.b),rn(this,n),this.i=t.i}else t&&(n=String(t).match(Xe))?(this.a=!!e,tn(this,n[1]||"",!0),this.j=an(n[2]||""),en(this,n[3]||"",!0),nn(this,n[4]),this.g=an(n[5]||"",!0),rn(this,n[6]||"",!0),this.i=an(n[7]||"")):(this.a=!!e,this.b=new gn(null,this.a))}function Ze(t){return new Je(t)}function tn(t,e,n){t.f=n?an(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function en(t,e,n){t.c=n?an(e,!0):e}function nn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function rn(t,e,n){e instanceof gn?(t.b=e,function(t,e){e&&!t.f&&(pn(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(yn(this,e),vn(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=cn(e,fn)),t.b=new gn(e,t.a))}function sn(t,e,n){t.b.set(e,n)}function on(t){return sn(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^M()).toString(36)),t}function an(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function cn(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,un),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function un(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}Je.prototype.toString=function(){var t=[],e=this.f;e&&t.push(cn(e,hn,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(cn(e,hn,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(cn(n,"/"==n.charAt(0)?dn:ln,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",cn(n,mn)),t.join("")};var hn=/[#\/\?@]/g,ln=/[#\?:]/g,dn=/[#\?]/g,fn=/[#\?@]/g,mn=/#/g;function gn(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function pn(t){t.a||(t.a=new He,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function yn(t,e){pn(t),e=bn(t,e),Ye(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,Ye((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&We(t)))}function wn(t,e){return pn(t),e=bn(t,e),Ye(t.a.b,e)}function vn(t,e,n){yn(t,e),0<n.length&&(t.c=null,t.a.set(bn(t,e),B(n)),t.b+=n.length)}function bn(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(E=gn.prototype).add=function(t,e){pn(this),this.c=null,t=bn(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},E.forEach=function(t,e){pn(this),this.a.forEach((function(n,r){q(n,(function(n){t.call(e,n,r,this)}),this)}),this)},E.L=function(){pn(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},E.K=function(t){pn(this);var e=[];if("string"==typeof t)wn(this,t)&&(e=U(e,this.a.get(bn(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=U(e,t[n])}return e},E.set=function(t,e){return pn(this),this.c=null,wn(this,t=bn(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},E.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},E.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.K(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.c=t.join("&")};var In=function(t,e){this.b=t,this.a=e};function En(t){this.g=t||_n,S.PerformanceNavigationTiming?t=0<(t=S.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(S.ia&&S.ia.ya&&S.ia.ya()&&S.ia.ya().Lb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var _n=10;function Tn(t){return!!t.b||!!t.a&&t.a.size>=t.f}function Sn(t){return t.b?1:t.a?t.a.size:0}function Nn(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function Dn(t,e){t.a?t.a.add(e):t.b=e}function An(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function xn(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var s=I(t.a.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.s)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return B(t.c)}function Cn(){}function Rn(){this.a=new Cn}function kn(t,e,n){var r=n||"";try{ze(t,(function(t,n){var s=t;A(t)&&(s=Qt(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function Ln(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(t){}}En.prototype.cancel=function(){var t,e;if(this.c=xn(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=I(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},Cn.prototype.stringify=function(t){return S.JSON.stringify(t,void 0)},Cn.prototype.parse=function(t){return S.JSON.parse(t,void 0)};var On=S.JSON.parse;function Mn(t){Kt.call(this),this.headers=new He,this.H=t||null,this.b=!1,this.s=this.a=null,this.B="",this.h=0,this.f="",this.g=this.A=this.l=this.u=!1,this.o=0,this.m=null,this.I=Pn,this.D=this.F=!1}P(Mn,Kt);var Pn="",Fn=/^https?$/i,Vn=["POST","PUT"];function qn(t){return"content-type"==t.toLowerCase()}function Un(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Bn(t),Kn(t)}function Bn(t){t.u||(t.u=!0,jt(t,"complete"),jt(t,"error"))}function $n(t){if(t.b&&void 0!==T&&(!t.s[1]||4!=Gn(t)||2!=t.W()))if(t.l&&4==Gn(t))ie(t.za,0,t);else if(jt(t,"readystatechange"),4==Gn(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.B).match(Xe)[1]||null;if(!i&&S.self&&S.self.location){var o=S.self.location.protocol;i=o.substr(0,o.length-1)}s=!Fn.test(i?i.toLowerCase():"")}e=s}if(e)jt(t,"complete"),jt(t,"success");else{t.h=6;try{var a=2<Gn(t)?t.a.statusText:""}catch(n){a=""}t.f=a+" ["+t.W()+"]",Bn(t)}}finally{Kn(t)}}}function Kn(t,e){if(t.a){jn(t);var n=t.a,r=t.s[0]?N:null;t.a=null,t.s=null,e||jt(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function jn(t){t.a&&t.D&&(t.a.ontimeout=null),t.m&&(S.clearTimeout(t.m),t.m=null)}function Gn(t){return t.a?t.a.readyState:0}function Qn(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return W(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):sn(t,e,n))}function zn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Hn(t){this.pa=0,this.g=[],this.c=new de,this.ga=this.la=this.B=this.fa=this.a=this.na=this.A=this.V=this.i=this.O=this.l=null,this.Oa=this.R=0,this.La=zn("failFast",!1,t),this.H=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.oa=this.P=-1,this.T=this.o=this.u=0,this.Ha=zn("baseRetryDelayMs",5e3,t),this.Ra=zn("retryDelaySeedMs",1e4,t),this.Ma=zn("forwardChannelMaxRetries",2,t),this.ma=zn("forwardChannelRequestTimeoutMs",2e4,t),this.Na=t&&t.g||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new En(t&&t.concurrentRequestLimit),this.ka=new Rn,this.da=t&&t.fastHandshake||!1,this.Ia=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.da&&this.S&&t&&t.detectBufferingProxy||!1,this.ea=void 0,this.N=0,this.F=!1,this.s=null,(this.Ka=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function Wn(t){if(Xn(t),3==t.v){var e=t.R++,n=Ze(t.B);sn(n,"SID",t.J),sn(n,"RID",e),sn(n,"TYPE","terminate"),er(t,n),(e=new Le(t,t.c,e,void 0)).H=2,e.i=on(Ze(n)),n=!1,S.navigator&&S.navigator.sendBeacon&&(n=S.navigator.sendBeacon(e.i.toString(),"")),!n&&S.Image&&((new Image).src=e.i,n=!0),n||(e.a=fr(e.g,null),e.a.ba(e.i)),e.u=M(),Be(e)}lr(t)}function Yn(t){t.a&&(ir(t),t.a.cancel(),t.a=null)}function Xn(t){Yn(t),t.j&&(S.clearTimeout(t.j),t.j=null),ar(t),t.b.cancel(),t.h&&("number"==typeof t.h&&S.clearTimeout(t.h),t.h=null)}function Jn(t,e){t.g.push(new In(t.Oa++,e)),3==t.v&&Zn(t)}function Zn(t){Tn(t.b)||t.h||(t.h=!0,Zt(t.Ba,t),t.u=0)}function tr(t,e){var n;n=e?e.f:t.R++;var r=Ze(t.B);sn(r,"SID",t.J),sn(r,"RID",n),sn(r,"AID",t.P),er(t,r),t.i&&t.l&&Qn(r,t.i,t.l),n=new Le(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=nr(t,n,1e3),n.setTimeout(Math.round(.5*t.ma)+Math.round(.5*t.ma*Math.random())),Dn(t.b,n),Fe(n,r,e)}function er(t,e){t.f&&ze({},(function(t,n){sn(e,n,t)}))}function nr(t,e,n){n=Math.min(t.g.length,n);var r=t.f?L(t.f.Ja,t.f,t):null;t:for(var s=t.g,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].b,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].b,h=s[c].a;if(0>(u-=i))i=Math.max(0,s[c].b-100),a=!1;else try{kn(h,o,"req"+u+"_")}catch(t){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function rr(t){t.a||t.j||(t.T=1,Zt(t.Aa,t),t.o=0)}function sr(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=Ee(L(t.Aa,t),ur(t,t.o)),t.o++,!0)}function ir(t){null!=t.s&&(S.clearTimeout(t.s),t.s=null)}function or(t){t.a=new Le(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=Ze(t.la);sn(e,"RID","rpc"),sn(e,"SID",t.J),sn(e,"CI",t.H?"0":"1"),sn(e,"AID",t.P),er(t,e),sn(e,"TYPE","xmlhttp"),t.i&&t.l&&Qn(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ga,n.H=1,n.i=on(Ze(e)),n.j=null,n.I=!0,Ve(n,t)}function ar(t){null!=t.m&&(S.clearTimeout(t.m),t.m=null)}function cr(t,e){var n=null;if(t.a==e){ar(t),ir(t),t.a=null;var r=2}else{if(!Nn(t.b,e))return;n=e.s,An(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=M()-e.u;var s=t.u;jt(r=pe(),new Ie(r,n,e,s)),Zn(t)}else rr(t);else if(3==(s=e.h)||0==s&&0<t.I||!(1==r&&function(t,e){return!(Sn(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.La?0:t.Ma)||(t.h=Ee(L(t.Ba,t,e),ur(t,t.u)),t.u++,0)))}(t,e)||2==r&&sr(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),s){case 1:hr(t,5);break;case 4:hr(t,10);break;case 3:hr(t,6);break;default:hr(t,2)}}function ur(t,e){var n=t.Ha+Math.floor(Math.random()*t.Ra);return t.f||(n*=2),n*e}function hr(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=L(t.Ya,t);n||(n=new Je("//www.google.com/images/cleardot.gif"),S.location&&"http"==S.location.protocol||tn(n,"https"),on(n)),function(t,e){var n=new de;if(S.Image){var r=new Image;r.onload=O(Ln,n,r,"TestLoadImage: loaded",!0,e),r.onerror=O(Ln,n,r,"TestLoadImage: error",!1,e),r.onabort=O(Ln,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=O(Ln,n,r,"TestLoadImage: timeout",!1,e),S.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else be(2);t.v=0,t.f&&t.f.ra(e),lr(t),Xn(t)}function lr(t){t.v=0,t.I=-1,t.f&&(0==xn(t.b).length&&0==t.g.length||(t.b.c.length=0,B(t.g),t.g.length=0),t.f.qa())}function dr(t,e,n){var r=function(t){return t instanceof Je?Ze(t):new Je(t,void 0)}(n);if(""!=r.c)e&&en(r,e+"."+r.c),nn(r,r.h);else{var s=S.location;r=function(t,e,n,r){var s=new Je(null,void 0);return t&&tn(s,t),e&&en(s,e),n&&nn(s,n),r&&(s.g=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.V&&W(t.V,(function(t,e){sn(r,e,t)})),e=t.A,n=t.na,e&&n&&sn(r,e,n),sn(r,"VER",t.ha),er(t,r),r}function fr(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new Mn(t.Na)).F=t.C,e}function mr(){}function gr(){if(rt&&!(10<=Number(pt)))throw Error("Environmental error: no available transport.")}function pr(t,e){Kt.call(this),this.a=new Hn(e),this.o=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!$(t)&&(this.a.i=t),this.m=e&&e.supportsCrossDomainXhr||!1,this.l=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!$(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new vr(this)}function yr(t){Ce.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function wr(){Re.call(this),this.status=1}function vr(t){this.a=t}(E=Mn.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+t);e=e?e.toUpperCase():"GET",this.B=t,this.f="",this.h=0,this.u=!1,this.b=!0,this.a=new XMLHttpRequest,this.s=this.H?Ne(this.H):Ne(Ae),this.a.onreadystatechange=L(this.za,this);try{this.A=!0,this.a.open(e,String(t),!0),this.A=!1}catch(t){return void Un(this,t)}t=n||"";var s=new He(this.headers);r&&ze(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=qn,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.L()),n=S.FormData&&t instanceof S.FormData,!(0<=V(Vn,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.F&&(this.a.withCredentials=this.F);try{jn(this),0<this.o&&((this.D=function(t){return rt&&mt(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.o,this.a.ontimeout=L(this.xa,this)):this.m=ie(this.xa,this.o,this)),this.l=!0,this.a.send(t),this.l=!1}catch(t){Un(this,t)}},E.xa=function(){void 0!==T&&this.a&&(this.f="Timed out after "+this.o+"ms, aborting",this.h=8,jt(this,"timeout"),this.abort(8))},E.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,jt(this,"complete"),jt(this,"abort"),Kn(this))},E.G=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),Kn(this,!0)),Mn.X.G.call(this)},E.za=function(){this.j||(this.A||this.l||this.g?$n(this):this.Ua())},E.Ua=function(){$n(this)},E.W=function(){try{return 2<Gn(this)?this.a.status:-1}catch(t){return-1}},E.$=function(){try{return this.a?this.a.responseText:""}catch(t){return""}},E.Pa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),On(e)}},E.ua=function(){return this.h},E.Qa=function(){return"string"==typeof this.f?this.f:String(this.f)},(E=Hn.prototype).ha=8,E.v=1,E.Ba=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new Le(this,this.c,t,void 0),r=this.l;if(this.O&&(r?J(r=Y(r),this.O):r=this.O),null===this.i&&(n.B=r),this.da)t:{for(var s=e=0;s<this.g.length;s++){var i=this.g[s];if(void 0===(i="__data__"in i.a&&"string"==typeof(i=i.a.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=s;break t}if(4096===e||s===this.g.length-1){e=s+1;break t}}e=1e3}else e=1e3;e=nr(this,n,e),sn(s=Ze(this.B),"RID",t),sn(s,"CVER",22),this.A&&sn(s,"X-HTTP-Session-Id",this.A),er(this,s),this.i&&r&&Qn(s,this.i,r),Dn(this.b,n),this.Ia&&sn(s,"TYPE","init"),this.da?(sn(s,"$req",e),sn(s,"SID","null"),n.U=!0,Fe(n,s,null)):Fe(n,s,e),this.v=2}}else 3==this.v&&(t?tr(this,t):0==this.g.length||Tn(this.b)||tr(this))},E.Aa=function(){if(this.j=null,or(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=Ee(L(this.Ta,this),t)}},E.Ta=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.H=!1,this.F=!0,be(10),Yn(this),or(this))},E.Sa=function(){null!=this.m&&(this.m=null,Yn(this),sr(this),be(19))},E.Ya=function(t){t?(this.c.info("Successfully pinged google.com"),be(2)):(this.c.info("Failed to ping google.com"),be(1))},(E=mr.prototype).ta=function(){},E.sa=function(){},E.ra=function(){},E.qa=function(){},E.Ja=function(){},gr.prototype.a=function(t,e){return new pr(t,e)},P(pr,Kt),pr.prototype.g=function(){this.a.f=this.f,this.m&&(this.a.C=!0);var t=this.a,e=this.o,n=this.b||void 0;be(0),t.fa=e,t.V=n||{},t.H=t.S,t.B=dr(t,null,t.fa),Zn(t)},pr.prototype.close=function(){Wn(this.a)},pr.prototype.h=function(t){if("string"==typeof t){var e={};e.__data__=t,Jn(this.a,e)}else this.l?((e={}).__data__=Qt(t),Jn(this.a,e)):Jn(this.a,t)},pr.prototype.G=function(){this.a.f=null,delete this.f,Wn(this.a),delete this.a,pr.X.G.call(this)},P(yr,Ce),P(wr,Re),P(vr,mr),vr.prototype.ta=function(){jt(this.a,"a")},vr.prototype.sa=function(t){jt(this.a,new yr(t))},vr.prototype.ra=function(t){jt(this.a,new wr(t))},vr.prototype.qa=function(){jt(this.a,"b")},gr.prototype.createWebChannel=gr.prototype.a,pr.prototype.send=pr.prototype.h,pr.prototype.open=pr.prototype.g,pr.prototype.close=pr.prototype.close,_e.NO_ERROR=0,_e.TIMEOUT=8,_e.HTTP_ERROR=6,Te.COMPLETE="complete",De.EventType=xe,xe.OPEN="a",xe.CLOSE="b",xe.ERROR="c",xe.MESSAGE="d",Kt.prototype.listen=Kt.prototype.va,Mn.prototype.listenOnce=Mn.prototype.wa,Mn.prototype.getLastError=Mn.prototype.Qa,Mn.prototype.getLastErrorCode=Mn.prototype.ua,Mn.prototype.getStatus=Mn.prototype.W,Mn.prototype.getResponseJson=Mn.prototype.Pa,Mn.prototype.getResponseText=Mn.prototype.$,Mn.prototype.send=Mn.prototype.ba;var br=_e,Ir=Te,Er=me,_r=10,Tr=11,Sr=De,Nr=Mn;
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
const Ar={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class xr extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const Cr=new v("@firebase/firestore");function Rr(){return Cr.logLevel}function kr(t,...e){if(Cr.logLevel<=f.DEBUG){const n=e.map(Mr);Cr.debug(`Firestore (8.4.1): ${t}`,...n)}}function Lr(t,...e){if(Cr.logLevel<=f.ERROR){const n=e.map(Mr);Cr.error(`Firestore (8.4.1): ${t}`,...n)}}function Or(t,...e){if(Cr.logLevel<=f.WARN){const n=e.map(Mr);Cr.warn(`Firestore (8.4.1): ${t}`,...n)}}function Mr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
     */function Pr(t="Unexpected state"){const e="FIRESTORE (8.4.1) INTERNAL ASSERTION FAILED: "+t;throw Lr(e),new Error(e)}function Fr(t,e){t||Pr()}function Vr(t,e){return t}
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
     */function qr(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
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
     */class Ur{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=qr(40);for(let s=0;s<r.length;++s)n.length<20&&r[s]<e&&(n+=t.charAt(r[s]%t.length))}return n}}function Br(t,e){return t<e?-1:t>e?1:0}function $r(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function Kr(t){return t+"\0"}
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
     */class jr{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new xr(Ar.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new xr(Ar.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new xr(Ar.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new xr(Ar.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return jr.fromMillis(Date.now())}static fromDate(t){return jr.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new jr(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Br(this.nanoseconds,t.nanoseconds):Br(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
     */class Gr{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Gr(t)}static min(){return new Gr(new jr(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
     */function Qr(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function zr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Hr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
     */class Wr{constructor(t,e,n){void 0===e?e=0:e>t.length&&Pr(),void 0===n?n=t.length-e:n>t.length-e&&Pr(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Wr.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Wr?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Yr extends Wr{construct(t,e,n){return new Yr(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new xr(Ar.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Yr(e)}static emptyPath(){return new Yr([])}}const Xr=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Jr extends Wr{construct(t,e,n){return new Jr(t,e,n)}static isValidIdentifier(t){return Xr.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Jr.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Jr(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new xr(Ar.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new xr(Ar.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new xr(Ar.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new xr(Ar.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Jr(e)}static emptyPath(){return new Jr([])}}
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
     */class Zr{constructor(t){this.fields=t,t.sort(Jr.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return $r(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Br(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ts.EMPTY_BYTE_STRING=new ts("");const es=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ns(t){if(Fr(!!t),"string"==typeof t){let e=0;const n=es.exec(t);if(Fr(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:rs(t.seconds),nanos:rs(t.nanos)}}function rs(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function ss(t){return"string"==typeof t?ts.fromBase64String(t):ts.fromUint8Array(t)}
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
     */function is(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function os(t){const e=t.mapValue.fields.__previous_value__;return is(e)?os(e):e}function as(t){const e=ns(t.mapValue.fields.__local_write_time__.timestampValue);return new jr(e.seconds,e.nanos)}
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
     */function cs(t){return null==t}function us(t){return 0===t&&1/t==-1/0}function hs(t){return"number"==typeof t&&Number.isInteger(t)&&!us(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
     */class ls{constructor(t){this.path=t}static fromPath(t){return new ls(Yr.fromString(t))}static fromName(t){return new ls(Yr.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Yr.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Yr.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new ls(new Yr(t.slice()))}}
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
     */function ds(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?is(t)?4:10:Pr()}function fs(t,e){const n=ds(t);if(n!==ds(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return as(t).isEqual(as(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ns(t.timestampValue),r=ns(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return ss(t.bytesValue).isEqual(ss(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return rs(t.geoPointValue.latitude)===rs(e.geoPointValue.latitude)&&rs(t.geoPointValue.longitude)===rs(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return rs(t.integerValue)===rs(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=rs(t.doubleValue),r=rs(e.doubleValue);return n===r?us(n)===us(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return $r(t.arrayValue.values||[],e.arrayValue.values||[],fs);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Qr(n)!==Qr(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!fs(n[t],r[t])))return!1;return!0}(t,e);default:return Pr()}}function ms(t,e){return void 0!==(t.values||[]).find((t=>fs(t,e)))}function gs(t,e){const n=ds(t),r=ds(e);if(n!==r)return Br(n,r);switch(n){case 0:return 0;case 1:return Br(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=rs(t.integerValue||t.doubleValue),r=rs(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return ps(t.timestampValue,e.timestampValue);case 4:return ps(as(t),as(e));case 5:return Br(t.stringValue,e.stringValue);case 6:return function(t,e){const n=ss(t),r=ss(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=Br(n[t],r[t]);if(0!==e)return e}return Br(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Br(rs(t.latitude),rs(e.latitude));return 0!==n?n:Br(rs(t.longitude),rs(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=gs(n[t],r[t]);if(e)return e}return Br(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let t=0;t<r.length&&t<i.length;++t){const e=Br(r[t],i[t]);if(0!==e)return e;const o=gs(n[r[t]],s[i[t]]);if(0!==o)return o}return Br(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Pr()}}function ps(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Br(t,e);const n=ns(t),r=ns(e),s=Br(n.seconds,r.seconds);return 0!==s?s:Br(n.nanos,r.nanos)}function ys(t){return ws(t)}function ws(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ns(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?ss(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,ls.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=ws(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${ws(t.fields[s])}`;return n+"}"}(t.mapValue):Pr();var e,n}function vs(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function bs(t){return!!t&&"integerValue"in t}function Is(t){return!!t&&"arrayValue"in t}function Es(t){return!!t&&"nullValue"in t}function _s(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ts(t){return!!t&&"mapValue"in t}
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
     */class Ss{constructor(t){this.overlayMap=new Map,this.partialValue=t}static empty(){return new Ss({mapValue:{}})}field(t){return Ss.extractNestedValue(this.buildProto(),t)}toProto(){return this.field(Jr.emptyPath())}set(t,e){this.setOverlay(t,e)}setAll(t){t.forEach(((t,e)=>{t?this.set(e,t):this.delete(e)}))}delete(t){this.setOverlay(t,null)}isEqual(t){return fs(this.buildProto(),t.buildProto())}setOverlay(t,e){let n=this.overlayMap;for(let e=0;e<t.length-1;++e){const r=t.get(e);let s=n.get(r);s instanceof Map?n=s:s&&10===ds(s)?(s=new Map(Object.entries(s.mapValue.fields||{})),n.set(r,s),n=s):(s=new Map,n.set(r,s),n=s)}n.set(t.lastSegment(),e)}applyOverlay(t,e){let n=!1;const r=Ss.extractNestedValue(this.partialValue,t),s=Ts(r)?Object.assign({},r.mapValue.fields):{};return e.forEach(((e,r)=>{if(e instanceof Map){const i=this.applyOverlay(t.child(r),e);null!=i&&(s[r]=i,n=!0)}else null!==e?(s[r]=e,n=!0):s.hasOwnProperty(r)&&(delete s[r],n=!0)})),n?{mapValue:{fields:s}}:null}buildProto(){const t=this.applyOverlay(Jr.emptyPath(),this.overlayMap);return null!=t&&(this.partialValue=t,this.overlayMap.clear()),this.partialValue}static extractNestedValue(t,e){if(e.isEmpty())return t;{let n=t;for(let t=0;t<e.length-1;++t){if(!n.mapValue.fields)return null;if(n=n.mapValue.fields[e.get(t)],!Ts(n))return null}return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}clone(){return new Ss(this.buildProto())}}function Ns(t){const e=[];return zr(t.fields||{},((t,n)=>{const r=new Jr([t]);if(Ts(n)){const t=Ns(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new Zr(e)
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
     */}class Ds{constructor(t,e,n,r,s){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=s}static newInvalidDocument(t){return new Ds(t,0,Gr.min(),Ss.empty(),0)}static newFoundDocument(t,e,n){return new Ds(t,1,e,n,0)}static newNoDocument(t,e){return new Ds(t,2,e,Ss.empty(),0)}static newUnknownDocument(t,e){return new Ds(t,3,e,Ss.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ss.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ss.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Ds&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new Ds(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.toProto())}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
     */class As{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function xs(t,e=null,n=[],r=[],s=null,i=null,o=null){return new As(t,e,n,r,s,i,o)}function Cs(t){const e=Vr(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+ys(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),cs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Ks(e.startAt)),e.endAt&&(t+="|ub:",t+=Ks(e.endAt)),e.h=t}return e.h}function Rs(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Gs(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!fs(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!zs(t.startAt,e.startAt)&&zs(t.endAt,e.endAt)}function ks(t){return ls.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Ls extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Os(t,e,n):"array-contains"===e?new Vs(t,n):"in"===e?new qs(t,n):"not-in"===e?new Us(t,n):"array-contains-any"===e?new Bs(t,n):new Ls(t,e,n)}static l(t,e,n){return"in"===e?new Ms(t,n):new Ps(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(gs(e,this.value)):null!==e&&ds(this.value)===ds(e)&&this.m(gs(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Pr()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Os extends Ls{constructor(t,e,n){super(t,e,n),this.key=ls.fromName(n.referenceValue)}matches(t){const e=ls.comparator(t.key,this.key);return this.m(e)}}class Ms extends Ls{constructor(t,e){super(t,"in",e),this.keys=Fs("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Ps extends Ls{constructor(t,e){super(t,"not-in",e),this.keys=Fs("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Fs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>ls.fromName(t.referenceValue)))}class Vs extends Ls{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Is(e)&&ms(e.arrayValue,this.value)}}class qs extends Ls{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&ms(this.value.arrayValue,e)}}class Us extends Ls{constructor(t,e){super(t,"not-in",e)}matches(t){if(ms(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!ms(this.value.arrayValue,e)}}class Bs extends Ls{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Is(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>ms(this.value.arrayValue,t)))}}class $s{constructor(t,e){this.position=t,this.before=e}}function Ks(t){return`${t.before?"b":"a"}:${t.position.map((t=>ys(t))).join(",")}`}class js{constructor(t,e="asc"){this.field=t,this.dir=e}}function Gs(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function Qs(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?ls.comparator(ls.fromName(o.referenceValue),n.key):gs(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function zs(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!fs(t.position[n],e.position[n]))return!1;return!0}
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
     */class Hs{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function Ws(t,e,n,r,s,i,o,a){return new Hs(t,e,n,r,s,i,o,a)}function Ys(t){return new Hs(t)}function Xs(t){return!cs(t.limit)&&"F"===t.limitType}function Js(t){return!cs(t.limit)&&"L"===t.limitType}function Zs(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function ti(t){for(const e of t.filters)if(e.g())return e.field;return null}function ei(t){return null!==t.collectionGroup}function ni(t){const e=Vr(t);if(null===e.p){e.p=[];const t=ti(e),n=Zs(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new js(t)),e.p.push(new js(Jr.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new js(Jr.keyField(),t))}}}return e.p}function ri(t){const e=Vr(t);if(!e.T)if("F"===e.limitType)e.T=xs(e.path,e.collectionGroup,ni(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of ni(e)){const e="desc"===n.dir?"asc":"desc";t.push(new js(n.field,e))}const n=e.endAt?new $s(e.endAt.position,!e.endAt.before):null,r=e.startAt?new $s(e.startAt.position,!e.startAt.before):null;e.T=xs(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function si(t,e,n){return new Hs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ii(t,e){return Rs(ri(t),ri(e))&&t.limitType===e.limitType}function oi(t){return`${Cs(ri(t))}|lt:${t.limitType}`}function ai(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${ys(e.value)}`;var e})).join(", ")}]`),cs(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: "+Ks(t.startAt)),t.endAt&&(e+=", endAt: "+Ks(t.endAt)),`Target(${e})`}(ri(t))}; limitType=${t.limitType})`}function ci(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):ls.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!Qs(t.startAt,ni(t),e))&&(!t.endAt||!Qs(t.endAt,ni(t),e))}(t,e)}function ui(t){return(e,n)=>{let r=!1;for(const s of ni(t)){const t=hi(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function hi(t,e,n){const r=t.field.isKeyField()?ls.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?gs(r,s):Pr()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Pr()}}
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
     */function li(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:us(e)?"-0":e}}function di(t){return{integerValue:""+t}}function fi(t,e){return hs(e)?di(e):li(t,e)}
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
     */class mi{constructor(){this._=void 0}}function gi(t,e,n){return t instanceof wi?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof vi?bi(t,e):t instanceof Ii?Ei(t,e):function(t,e){const n=yi(t,e),r=Ti(n)+Ti(t.A);return bs(n)&&bs(t.A)?di(r):li(t.R,r)}(t,e)}function pi(t,e,n){return t instanceof vi?bi(t,e):t instanceof Ii?Ei(t,e):n}function yi(t,e){return t instanceof _i?bs(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class wi extends mi{}class vi extends mi{constructor(t){super(),this.elements=t}}function bi(t,e){const n=Si(e);for(const e of t.elements)n.some((t=>fs(t,e)))||n.push(e);return{arrayValue:{values:n}}}class Ii extends mi{constructor(t){super(),this.elements=t}}function Ei(t,e){let n=Si(e);for(const e of t.elements)n=n.filter((t=>!fs(t,e)));return{arrayValue:{values:n}}}class _i extends mi{constructor(t,e){super(),this.R=t,this.A=e}}function Ti(t){return rs(t.integerValue||t.doubleValue)}function Si(t){return Is(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
     */class Ni{constructor(t,e){this.field=t,this.transform=e}}class Di{constructor(t,e){this.version=t,this.transformResults=e}}class Ai{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ai}static exists(t){return new Ai(void 0,t)}static updateTime(t){return new Ai(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function xi(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Ci{}function Ri(t,e,n){t instanceof Pi?function(t,e,n){const r=t.value.clone(),s=qi(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof Fi?function(t,e,n){if(!xi(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=qi(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(Vi(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):function(t,e,n){e.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,n)}function ki(t,e,n){t instanceof Pi?function(t,e,n){if(!xi(t.precondition,e))return;const r=t.value.clone(),s=Ui(t.fieldTransforms,n,e);r.setAll(s),e.convertToFoundDocument(Mi(e),r).setHasLocalMutations()}(t,e,n):t instanceof Fi?function(t,e,n){if(!xi(t.precondition,e))return;const r=Ui(t.fieldTransforms,n,e),s=e.data;s.setAll(Vi(t)),s.setAll(r),e.convertToFoundDocument(Mi(e),s).setHasLocalMutations()}(t,e,n):function(t,e){xi(t.precondition,e)&&e.convertToNoDocument(Gr.min())}(t,e)}function Li(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=yi(r.transform,t||null);null!=s&&(null==n&&(n=Ss.empty()),n.set(r.field,s))}return n||null}function Oi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&$r(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof vi&&e instanceof vi||t instanceof Ii&&e instanceof Ii?$r(t.elements,e.elements,fs):t instanceof _i&&e instanceof _i?fs(t.A,e.A):t instanceof wi&&e instanceof wi}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function Mi(t){return t.isFoundDocument()?t.version:Gr.min()}class Pi extends Ci{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Fi extends Ci{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Vi(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function qi(t,e,n){const r=new Map;Fr(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,pi(o,a,n[s]))}return r}function Ui(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,gi(t,i,e))}return r}class Bi extends Ci{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class $i extends Ci{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
     */class Ki{constructor(t){this.count=t}}
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
     */var ji,Gi;function Qi(t){switch(t){case Ar.OK:return Pr();case Ar.CANCELLED:case Ar.UNKNOWN:case Ar.DEADLINE_EXCEEDED:case Ar.RESOURCE_EXHAUSTED:case Ar.INTERNAL:case Ar.UNAVAILABLE:case Ar.UNAUTHENTICATED:return!1;case Ar.INVALID_ARGUMENT:case Ar.NOT_FOUND:case Ar.ALREADY_EXISTS:case Ar.PERMISSION_DENIED:case Ar.FAILED_PRECONDITION:case Ar.ABORTED:case Ar.OUT_OF_RANGE:case Ar.UNIMPLEMENTED:case Ar.DATA_LOSS:return!0;default:return Pr()}}function zi(t){if(void 0===t)return Lr("GRPC error has no .code"),Ar.UNKNOWN;switch(t){case ji.OK:return Ar.OK;case ji.CANCELLED:return Ar.CANCELLED;case ji.UNKNOWN:return Ar.UNKNOWN;case ji.DEADLINE_EXCEEDED:return Ar.DEADLINE_EXCEEDED;case ji.RESOURCE_EXHAUSTED:return Ar.RESOURCE_EXHAUSTED;case ji.INTERNAL:return Ar.INTERNAL;case ji.UNAVAILABLE:return Ar.UNAVAILABLE;case ji.UNAUTHENTICATED:return Ar.UNAUTHENTICATED;case ji.INVALID_ARGUMENT:return Ar.INVALID_ARGUMENT;case ji.NOT_FOUND:return Ar.NOT_FOUND;case ji.ALREADY_EXISTS:return Ar.ALREADY_EXISTS;case ji.PERMISSION_DENIED:return Ar.PERMISSION_DENIED;case ji.FAILED_PRECONDITION:return Ar.FAILED_PRECONDITION;case ji.ABORTED:return Ar.ABORTED;case ji.OUT_OF_RANGE:return Ar.OUT_OF_RANGE;case ji.UNIMPLEMENTED:return Ar.UNIMPLEMENTED;case ji.DATA_LOSS:return Ar.DATA_LOSS;default:return Pr()}}(Gi=ji||(ji={}))[Gi.OK=0]="OK",Gi[Gi.CANCELLED=1]="CANCELLED",Gi[Gi.UNKNOWN=2]="UNKNOWN",Gi[Gi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Gi[Gi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Gi[Gi.NOT_FOUND=5]="NOT_FOUND",Gi[Gi.ALREADY_EXISTS=6]="ALREADY_EXISTS",Gi[Gi.PERMISSION_DENIED=7]="PERMISSION_DENIED",Gi[Gi.UNAUTHENTICATED=16]="UNAUTHENTICATED",Gi[Gi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Gi[Gi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Gi[Gi.ABORTED=10]="ABORTED",Gi[Gi.OUT_OF_RANGE=11]="OUT_OF_RANGE",Gi[Gi.UNIMPLEMENTED=12]="UNIMPLEMENTED",Gi[Gi.INTERNAL=13]="INTERNAL",Gi[Gi.UNAVAILABLE=14]="UNAVAILABLE",Gi[Gi.DATA_LOSS=15]="DATA_LOSS";
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
class Hi{constructor(t,e){this.comparator=t,this.root=e||Yi.EMPTY}insert(t,e){return new Hi(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Yi.BLACK,null,null))}remove(t){return new Hi(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Yi.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Wi(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Wi(this.root,t,this.comparator,!1)}getReverseIterator(){return new Wi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Wi(this.root,t,this.comparator,!0)}}class Wi{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Yi{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:Yi.RED,this.left=null!=r?r:Yi.EMPTY,this.right=null!=s?s:Yi.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new Yi(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Yi.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return Yi.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Yi.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Yi.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Pr();if(this.right.isRed())throw Pr();const t=this.left.check();if(t!==this.right.check())throw Pr();return t+(this.isRed()?0:1)}}Yi.EMPTY=null,Yi.RED=!0,Yi.BLACK=!1,Yi.EMPTY=new class{constructor(){this.size=0}get key(){throw Pr()}get value(){throw Pr()}get color(){throw Pr()}get left(){throw Pr()}get right(){throw Pr()}copy(t,e,n,r,s){return this}insert(t,e,n){return new Yi(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class Xi{constructor(t){this.comparator=t,this.data=new Hi(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ji(this.data.getIterator())}getIteratorFrom(t){return new Ji(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof Xi))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Xi(this.comparator);return e.data=t,e}}class Ji{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
     */const Zi=new Hi(ls.comparator);function to(){return Zi}const eo=new Hi(ls.comparator);function no(){return eo}const ro=new Hi(ls.comparator);function so(){return ro}const io=new Xi(ls.comparator);function oo(...t){let e=io;for(const n of t)e=e.add(n);return e}const ao=new Xi(Br);function co(){return ao}
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
     */class uo{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,ho.createSynthesizedTargetChangeForCurrentChange(t,e)),new uo(Gr.min(),n,co(),to(),oo())}}class ho{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e){return new ho(ts.EMPTY_BYTE_STRING,e,oo(),oo(),oo())}}
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
     */class lo{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class fo{constructor(t,e){this.targetId=t,this.V=e}}class mo{constructor(t,e,n=ts.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class go{constructor(){this.S=0,this.D=wo(),this.C=ts.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get O(){return 0!==this.S}get $(){return this.k}M(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}F(){let t=oo(),e=oo(),n=oo();return this.D.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Pr()}})),new ho(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=wo()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}q(t){this.k=!0,this.D=this.D.remove(t)}U(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class po{constructor(t){this.W=t,this.G=new Map,this.H=to(),this.J=yo(),this.Y=new Xi(Br)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.M(t.resumeToken);break;case 1:n.K(),n.O||n.L(),n.M(t.resumeToken);break;case 2:n.K(),n.O||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.M(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.M(t.resumeToken));break;default:Pr()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(ks(t))if(0===n){const n=new ls(t.path);this.tt(e,n,Ds.newNoDocument(n,Gr.min()))}else Fr(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}ut(t){const e=new Map;this.G.forEach(((n,r)=>{const s=this.ot(r);if(s){if(n.current&&ks(s.target)){const e=new ls(s.target.path);null!==this.H.get(e)||this.at(r,e)||this.tt(r,e,Ds.newNoDocument(e,t))}n.$&&(e.set(r,n.F()),n.L())}}));let n=oo();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new uo(t,e,this.Y,this.H,n);return this.H=to(),this.J=yo(),this.Y=new Xi(Br),r}Z(t,e){if(!this.st(t))return;const n=this.at(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.at(t,e)?r.B(e,1):r.q(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).F();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}U(t){this.nt(t).U()}nt(t){let e=this.G.get(t);return e||(e=new go,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new Xi(Br),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||kr("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.O?null:this.W.lt(t)}it(t){this.G.set(t,new go),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}at(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function yo(){return new Hi(ls.comparator)}function wo(){return new Hi(ls.comparator)}
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
     */const vo={asc:"ASCENDING",desc:"DESCENDING"},bo={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class Io{constructor(t,e){this.databaseId=t,this.I=e}}function Eo(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function _o(t,e){return t.I?e.toBase64():e.toUint8Array()}function To(t,e){return Eo(t,e.toTimestamp())}function So(t){return Fr(!!t),Gr.fromTimestamp(function(t){const e=ns(t);return new jr(e.seconds,e.nanos)}(t))}function No(t,e){return function(t){return new Yr(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function Do(t){const e=Yr.fromString(t);return Fr(Xo(e)),e}function Ao(t,e){return No(t.databaseId,e.path)}function xo(t,e){const n=Do(e);if(n.get(1)!==t.databaseId.projectId)throw new xr(Ar.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new xr(Ar.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ls(Lo(n))}function Co(t,e){return No(t.databaseId,e)}function Ro(t){const e=Do(t);return 4===e.length?Yr.emptyPath():Lo(e)}function ko(t){return new Yr(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Lo(t){return Fr(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Oo(t,e,n){return{name:Ao(t,e),fields:n.toProto().mapValue.fields}}function Mo(t,e,n){const r=xo(t,e.name),s=So(e.updateTime),i=new Ss({mapValue:{fields:e.fields}}),o=Ds.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function Po(t,e){let n;if(e instanceof Pi)n={update:Oo(t,e.key,e.value)};else if(e instanceof Bi)n={delete:Ao(t,e.key)};else if(e instanceof Fi)n={update:Oo(t,e.key,e.data),updateMask:Yo(e.fieldMask)};else{if(!(e instanceof $i))return Pr();n={verify:Ao(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof wi)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof vi)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ii)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof _i)return{fieldPath:e.field.canonicalString(),increment:n.A};throw Pr()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:To(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:Pr()}(t,e.precondition)),n}function Fo(t,e){const n=e.currentDocument?function(t){return void 0!==t.updateTime?Ai.updateTime(So(t.updateTime)):void 0!==t.exists?Ai.exists(t.exists):Ai.none()}(e.currentDocument):Ai.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)Fr("REQUEST_TIME"===e.setToServerValue),n=new wi;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new vi(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Ii(t)}else"increment"in e?n=new _i(t,e.increment):Pr();const r=Jr.fromServerFormat(e.fieldPath);return new Ni(r,n)}(t,e))):[];if(e.update){e.update.name;const s=xo(t,e.update.name),i=new Ss({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new Zr(e.map((t=>Jr.fromServerFormat(t))))}(e.updateMask);return new Fi(s,i,t,n,r)}return new Pi(s,i,n,r)}if(e.delete){const r=xo(t,e.delete);return new Bi(r,n)}if(e.verify){const r=xo(t,e.verify);return new $i(r,n)}return Pr()}function Vo(t,e){return{documents:[Co(t,e.path)]}}function qo(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Co(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Co(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(_s(t.value))return{unaryFilter:{field:Qo(t.field),op:"IS_NAN"}};if(Es(t.value))return{unaryFilter:{field:Qo(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(_s(t.value))return{unaryFilter:{field:Qo(t.field),op:"IS_NOT_NAN"}};if(Es(t.value))return{unaryFilter:{field:Qo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Qo(t.field),op:Go(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>function(t){return{field:Qo(t.field),direction:jo(t.dir)}}(t)))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(t,e){return t.I||cs(e)?e:{value:e}}(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=$o(e.startAt)),e.endAt&&(n.structuredQuery.endAt=$o(e.endAt)),n}function Uo(t){let e=Ro(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Fr(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=Bo(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>function(t){return new js(zo(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,cs(e)?null:e}(n.limit));let c=null;n.startAt&&(c=Ko(n.startAt));let u=null;return n.endAt&&(u=Ko(n.endAt)),Ws(e,s,o,i,a,"F",c,u)}function Bo(t){return t?void 0!==t.unaryFilter?[Wo(t)]:void 0!==t.fieldFilter?[Ho(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Bo(t))).reduce(((t,e)=>t.concat(e))):Pr():[]}function $o(t){return{before:t.before,values:t.position}}function Ko(t){const e=!!t.before,n=t.values||[];return new $s(n,e)}function jo(t){return vo[t]}function Go(t){return bo[t]}function Qo(t){return{fieldPath:t.canonicalString()}}function zo(t){return Jr.fromServerFormat(t.fieldPath)}function Ho(t){return Ls.create(zo(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Pr()}}(t.fieldFilter.op),t.fieldFilter.value)}function Wo(t){switch(t.unaryFilter.op){case"IS_NAN":const e=zo(t.unaryFilter.field);return Ls.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=zo(t.unaryFilter.field);return Ls.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=zo(t.unaryFilter.field);return Ls.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=zo(t.unaryFilter.field);return Ls.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Pr()}}function Yo(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Xo(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
     */function Jo(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=ta(e)),e=Zo(t.get(n),e);return ta(e)}function Zo(t,e){let n=e;const r=t.length;for(let e=0;e<r;e++){const r=t.charAt(e);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function ta(t){return t+""}function ea(t){const e=t.length;if(Fr(e>=2),2===e)return Fr(""===t.charAt(0)&&""===t.charAt(1)),Yr.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const e=t.indexOf("",i);switch((e<0||e>n)&&Pr(),t.charAt(e+1)){case"":const n=t.substring(i,e);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=t.substring(i,e),s+="\0";break;case"":s+=t.substring(i,e+1);break;default:Pr()}i=e+2}return new Yr(r)}
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
     */class na{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class ra{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}ra.store="owner",ra.key="owner";class sa{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}sa.store="mutationQueues",sa.keyPath="userId";class ia{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}ia.store="mutations",ia.keyPath="batchId",ia.userMutationsIndex="userMutationsIndex",ia.userMutationsKeyPath=["userId","batchId"];class oa{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,Jo(e)]}static key(t,e,n){return[t,Jo(e),n]}}oa.store="documentMutations",oa.PLACEHOLDER=new oa;class aa{constructor(t,e){this.path=t,this.readTime=e}}class ca{constructor(t,e){this.path=t,this.version=e}}class ua{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}ua.store="remoteDocuments",ua.readTimeIndex="readTimeIndex",ua.readTimeIndexPath="readTime",ua.collectionReadTimeIndex="collectionReadTimeIndex",ua.collectionReadTimeIndexPath=["parentPath","readTime"];class ha{constructor(t){this.byteSize=t}}ha.store="remoteDocumentGlobal",ha.key="remoteDocumentGlobalKey";class la{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}la.store="targets",la.keyPath="targetId",la.queryTargetsIndexName="queryTargetsIndex",la.queryTargetsKeyPath=["canonicalId","targetId"];class da{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}da.store="targetDocuments",da.keyPath=["targetId","path"],da.documentTargetsIndex="documentTargetsIndex",da.documentTargetsKeyPath=["path","targetId"];class fa{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}fa.key="targetGlobalKey",fa.store="targetGlobal";class ma{constructor(t,e){this.collectionId=t,this.parent=e}}ma.store="collectionParents",ma.keyPath=["collectionId","parent"];class ga{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}ga.store="clientMetadata",ga.keyPath="clientId";class pa{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}pa.store="bundles",pa.keyPath="bundleId";class ya{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}ya.store="namedQueries",ya.keyPath="name";const wa=[sa.store,ia.store,oa.store,ua.store,la.store,ra.store,fa.store,da.store,ga.store,ha.store,ma.store,pa.store,ya.store],va="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ba{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
     */class Ia{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
     */class Ea{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Pr(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Ea(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Ea?e:Ea.resolve(e)}catch(t){return Ea.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Ea.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Ea.reject(e)}static resolve(t){return new Ea(((e,n)=>{e(t)}))}static reject(t){return new Ea(((e,n)=>{n(t)}))}static waitFor(t){return new Ea(((e,n)=>{let r=0,s=0,i=!1;t.forEach((t=>{++r,t.next((()=>{++s,i&&s===r&&e()}),(t=>n(t)))})),i=!0,s===r&&e()}))}static or(t){let e=Ea.resolve(!1);for(const n of t)e=e.next((t=>t?Ea.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
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
     */class _a{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new Ia,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new Na(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=Ra(e.target.error);this.ft.reject(new Na(t,n))}}static open(t,e,n,r){try{return new _a(e,t.transaction(r,n))}catch(t){throw new Na(e,t)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(kr("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Aa(e)}}class Ta{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Ta._t(o())&&Lr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return kr("SimpleDb","Removing database:",t),xa(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Ta.yt())return!0;const t=o(),e=Ta._t(t),n=0<e&&e<10,r=Ta.Et(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(kr("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new Na(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new xr(Ar.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new Na(t,r))},r.onupgradeneeded=t=>{kr("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{kr("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.At(t);const e=_a.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),Ea.reject(t)))).toPromise();return i.catch((()=>{})),await e.dt,i}catch(t){const e="FirebaseError"!==t.name&&i<3;if(kr("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Sa{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return xa(this.vt.delete())}}class Na extends xr{constructor(t,e){super(Ar.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Da(t){return"IndexedDbTransactionError"===t.name}class Aa{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(kr("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(kr("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),xa(n)}add(t){return kr("SimpleDb","ADD",this.store.name,t,t),xa(this.store.add(t))}get(t){return xa(this.store.get(t)).next((e=>(void 0===e&&(e=null),kr("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return kr("SimpleDb","DELETE",this.store.name,t),xa(this.store.delete(t))}count(){return kr("SimpleDb","COUNT",this.store.name),xa(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){kr("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.Ot=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}$t(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Mt(t){const e=this.cursor({});return new Ea(((n,r)=>{e.onerror=t=>{const e=Ra(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new Ea(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new Sa(s),o=e(s.primaryKey,s.value,i);if(o instanceof Ea){const t=o.catch((t=>(i.done(),Ea.reject(t))));n.push(t)}i.isDone?r():null===i.Dt?s.continue():s.continue(i.Dt)}})).next((()=>Ea.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Ot?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function xa(t){return new Ea(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Ra(t.target.error);n(e)}}))}let Ca=!1;function Ra(t){const e=Ta._t(o());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new xr("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ca||(Ca=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
     */class ka extends ba{constructor(t,e){super(),this.Ft=t,this.currentSequenceNumber=e}}function La(t,e){const n=Vr(t);return Ta.It(n.Ft,e)}
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
     */class Oa{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const r=this.mutations[e];r.key.isEqual(t.key)&&Ri(r,t,n[e])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&ki(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&ki(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(Gr.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),oo())}isEqual(t){return this.batchId===t.batchId&&$r(this.mutations,t.mutations,((t,e)=>Oi(t,e)))&&$r(this.baseMutations,t.baseMutations,((t,e)=>Oi(t,e)))}}class Ma{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){Fr(t.mutations.length===n.length);let r=so();const s=t.mutations;for(let t=0;t<s.length;t++)r=r.insert(s[t].key,n[t].version);return new Ma(t,e,n,r)}}
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
     */class Pa{constructor(t,e,n,r,s=Gr.min(),i=Gr.min(),o=ts.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new Pa(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new Pa(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new Pa(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
     */class Fa{constructor(t){this.Lt=t}}function Va(t,e){if(e.document)return Mo(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=ls.fromSegments(e.noDocument.path),n=Ka(e.noDocument.readTime),r=Ds.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=ls.fromSegments(e.unknownDocument.path),n=Ka(e.unknownDocument.version);return Ds.newUnknownDocument(t,n)}return Pr()}function qa(t,e,n){const r=Ua(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n=function(t,e){return{name:Ao(t,e.key),fields:e.data.toProto().mapValue.fields,updateTime:Eo(t,e.version.toTimestamp())}}(t.Lt,e),i=e.hasCommittedMutations;return new ua(null,null,n,i,r,s)}if(e.isNoDocument()){const t=e.key.path.toArray(),n=$a(e.version),i=e.hasCommittedMutations;return new ua(null,new aa(t,n),null,i,r,s)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=$a(e.version);return new ua(new ca(t,n),null,null,!0,r,s)}return Pr()}function Ua(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ba(t){const e=new jr(t[0],t[1]);return Gr.fromTimestamp(e)}function $a(t){const e=t.toTimestamp();return new na(e.seconds,e.nanoseconds)}function Ka(t){const e=new jr(t.seconds,t.nanoseconds);return Gr.fromTimestamp(e)}function ja(t,e){const n=(e.baseMutations||[]).map((e=>Fo(t.Lt,e)));for(let t=0;t<e.mutations.length-1;++t){const n=e.mutations[t];if(t+1<e.mutations.length&&void 0!==e.mutations[t+1].transform){const r=e.mutations[t+1];n.updateTransforms=r.transform.fieldTransforms,e.mutations.splice(t+1,1),++t}}const r=e.mutations.map((e=>Fo(t.Lt,e))),s=jr.fromMillis(e.localWriteTimeMs);return new Oa(e.batchId,s,n,r)}function Ga(t){const e=Ka(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?Ka(t.lastLimboFreeSnapshotVersion):Gr.min();let r;var s;return void 0!==t.query.documents?(Fr(1===(s=t.query).documents.length),r=ri(Ys(Ro(s.documents[0])))):r=function(t){return ri(Uo(t))}(t.query),new Pa(r,t.targetId,0,t.lastListenSequenceNumber,e,n,ts.fromBase64String(t.resumeToken))}function Qa(t,e){const n=$a(e.snapshotVersion),r=$a(e.lastLimboFreeSnapshotVersion);let s;s=ks(e.target)?Vo(t.Lt,e.target):qo(t.Lt,e.target);const i=e.resumeToken.toBase64();return new la(e.targetId,Cs(e.target),n,i,e.sequenceNumber,r,s)}function za(t){const e=Uo({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?si(e,e.limit,"L"):e}
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
     */class Ha{getBundleMetadata(t,e){return Wa(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:Ka(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return Wa(t).put({bundleId:(n=e).id,createTime:$a(So(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return Ya(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:za(e.bundledQuery),readTime:Ka(e.readTime)};var e}))}saveNamedQuery(t,e){return Ya(t).put(function(t){return{name:t.name,readTime:$a(So(t.readTime)),bundledQuery:t.bundledQuery}}(e))}}function Wa(t){return La(t,pa.store)}function Ya(t){return La(t,ya.store)}
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
     */class Xa{constructor(){this.Bt=new Ja}addToCollectionParentIndex(t,e){return this.Bt.add(e),Ea.resolve()}getCollectionParents(t,e){return Ea.resolve(this.Bt.getEntries(e))}}class Ja{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new Xi(Yr.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new Xi(Yr.comparator)).toArray()}}
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
     */class Za{constructor(){this.qt=new Ja}addToCollectionParentIndex(t,e){if(!this.qt.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.qt.add(e)}));const s={collectionId:n,parent:Jo(r)};return tc(t).put(s)}return Ea.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Kr(e),""],!1,!0);return tc(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(ea(r.parent))}return n}))}}function tc(t){return La(t,ma.store)}
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
     */const ec={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class nc{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new nc(t,nc.DEFAULT_COLLECTION_PERCENTILE,nc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
     */function rc(t,e,n){const r=t.store(ia.store),s=t.store(oa.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.$t({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{Fr(1===a)})));const u=[];for(const t of n.mutations){const r=oa.key(e,t.key.path,n.batchId);i.push(s.delete(r)),u.push(t.key)}return Ea.waitFor(i).next((()=>u))}function sc(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Pr();e=t.noDocument}return JSON.stringify(e).length}
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
     */nc.DEFAULT_COLLECTION_PERCENTILE=10,nc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,nc.DEFAULT=new nc(41943040,nc.DEFAULT_COLLECTION_PERCENTILE,nc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),nc.DISABLED=new nc(-1,0,0);class ic{constructor(t,e,n,r){this.userId=t,this.R=e,this.Ut=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){Fr(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new ic(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ac(t).$t({index:ia.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=cc(t),i=ac(t);return i.add({}).next((o=>{Fr("number"==typeof o);const a=new Oa(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>Po(t.Lt,e))),s=n.mutations.map((e=>Po(t.Lt,e)));return new ia(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.R,this.userId,a),u=[];let h=new Xi(((t,e)=>Br(t.canonicalString(),e.canonicalString())));for(const t of r){const e=oa.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,oa.PLACEHOLDER))}return h.forEach((e=>{u.push(this.Ut.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),Ea.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return ac(t).get(e).next((t=>t?(Fr(t.userId===this.userId),ja(this.R,t)):null))}jt(t,e){return this.Kt[e]?Ea.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return ac(t).$t({index:ia.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(Fr(e.batchId>=n),s=ja(this.R,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return ac(t).$t({index:ia.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return ac(t).Nt(ia.userMutationsIndex,e).next((t=>t.map((t=>ja(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=oa.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return cc(t).$t({range:r},((n,r,i)=>{const[o,a,c]=n,u=ea(a);if(o===this.userId&&e.path.isEqual(u))return ac(t).get(c).next((t=>{if(!t)throw Pr();Fr(t.userId===this.userId),s.push(ja(this.R,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Xi(Br);const r=[];return e.forEach((e=>{const s=oa.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=cc(t).$t({range:i},((t,r,s)=>{const[i,o,a]=t,c=ea(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),Ea.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=oa.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new Xi(Br);return cc(t).$t({range:i},((t,e,s)=>{const[i,a,c]=t,u=ea(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(ac(t).get(e).next((t=>{if(null===t)throw Pr();Fr(t.userId===this.userId),n.push(ja(this.R,t))})))})),Ea.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return rc(t.Ft,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),Ea.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return Ea.resolve();const n=IDBKeyRange.lowerBound(oa.prefixForUser(this.userId)),r=[];return cc(t).$t({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=ea(t[1]);r.push(e)}else n.done()})).next((()=>{Fr(0===r.length)}))}))}containsKey(t,e){return oc(t,this.userId,e)}zt(t){return uc(t).get(this.userId).next((t=>t||new sa(this.userId,-1,"")))}}function oc(t,e,n){const r=oa.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return cc(t).$t({range:i,Ot:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function ac(t){return La(t,ia.store)}function cc(t){return La(t,oa.store)}function uc(t){return La(t,sa.store)}
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
     */class hc{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new hc(0)}static Yt(){return new hc(-1)}}
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
     */class lc{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new hc(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>Gr.fromTimestamp(new jr(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>dc(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(Fr(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return dc(t).$t(((i,o)=>{const a=Ga(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>Ea.waitFor(s))).next((()=>r))}forEachTarget(t,e){return dc(t).$t(((t,n)=>{const r=Ga(n);e(r)}))}Xt(t){return fc(t).get(fa.key).next((t=>(Fr(null!==t),t)))}Zt(t,e){return fc(t).put(fa.key,e)}te(t,e){return dc(t).put(Qa(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Cs(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return dc(t).$t({range:r,index:la.queryTargetsIndexName},((t,n,r)=>{const i=Ga(n);Rs(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=mc(t);return e.forEach((e=>{const i=Jo(e.path);r.push(s.put(new da(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),Ea.waitFor(r)}removeMatchingKeys(t,e,n){const r=mc(t);return Ea.forEach(e,(e=>{const s=Jo(e.path);return Ea.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=mc(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=mc(t);let s=oo();return r.$t({range:n,Ot:!0},((t,e,n)=>{const r=ea(t[1]),i=new ls(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=Jo(e.path),r=IDBKeyRange.bound([n],[Kr(n)],!1,!0);let s=0;return mc(t).$t({index:da.documentTargetsIndex,Ot:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}lt(t,e){return dc(t).get(e).next((t=>t?Ga(t):null))}}function dc(t){return La(t,la.store)}function fc(t){return La(t,fa.store)}function mc(t){return La(t,da.store)}
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
     */async function gc(t){if(t.code!==Ar.FAILED_PRECONDITION||t.message!==va)throw t;kr("LocalStore","Unexpectedly lost primary lease")}
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
     */function pc([t,e],[n,r]){const s=Br(t,n);return 0===s?Br(e,r):s}class yc{constructor(t){this.ne=t,this.buffer=new Xi(pc),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();pc(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class wc{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ue(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ue(t){const e=this.oe?3e5:6e4;kr("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(t){Da(t)?kr("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await gc(t)}await this.ue(t)}))}}class vc{constructor(t,e){this.ae=t,this.params=e}calculateTargetCount(t,e){return this.ae.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return Ea.resolve(Dr.o);const n=new yc(e);return this.ae.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ae.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ae.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ae.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(kr("LruGarbageCollector","Garbage collection skipped; disabled"),Ea.resolve(ec)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(kr("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ec):this.fe(t,e)))}getCacheSize(t){return this.ae.getCacheSize(t)}fe(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(kr("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Rr()<=f.DEBUG&&kr("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${t} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),Ea.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
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
     */class bc{constructor(t,e){this.db=t,this.garbageCollector=function(t,e){return new vc(t,e)}(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return Ic(t,n)}removeReference(t,e,n){return Ic(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Ic(t,e)}_e(t,e){return function(t,e){let n=!1;return uc(t).Mt((r=>oc(t,r,e).next((t=>(t&&(n=!0),Ea.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.we(t,((i,o)=>{if(o<=e){const e=this._e(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),mc(t).delete([0,Jo(i.path)]))))}));r.push(e)}})).next((()=>Ea.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Ic(t,e)}we(t,e){const n=mc(t);let r,s=Dr.o;return n.$t({index:da.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Dr.o&&e(new ls(ea(r)),s),s=o,r=i):s=Dr.o})).next((()=>{s!==Dr.o&&e(new ls(ea(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Ic(t,e){return mc(t).put(function(t,e){return new da(0,Jo(t.path),e)}(e,t.currentSequenceNumber))}
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
     */class Ec{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,r]of n)if(this.equalsFn(e,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){zr(this.inner,((e,n)=>{for(const[e,r]of n)t(e,r)}))}isEmpty(){return Hr(this.inner)}}
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
     */class _c{constructor(){this.changes=new Ec((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:Gr.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:Ds.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Ea.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
     */class Tc{constructor(t,e){this.R=t,this.Ut=e}addEntry(t,e,n){return Dc(t).put(Ac(e),n)}removeEntry(t,e){const n=Dc(t),r=Ac(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Dc(t).get(Ac(e)).next((t=>this.ge(e,t)))}ye(t,e){return Dc(t).get(Ac(e)).next((t=>({document:this.ge(e,t),size:sc(t)})))}getEntries(t,e){let n=to();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=to(),r=new Hi(ls.comparator);return this.pe(t,e,((t,e)=>{const s=this.ge(t,e);n=n.insert(t,s),r=r.insert(t,sc(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return Ea.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return Dc(t).$t({range:r},((t,e,r)=>{const o=ls.fromSegments(t);for(;i&&ls.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.Ct(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=to();const s=e.path.length+1,i={};if(n.isEqual(Gr.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Ua(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=ua.collectionReadTimeIndex}return Dc(t).$t(i,((t,n,i)=>{if(t.length!==s)return;const o=Va(this.R,n);e.path.isPrefixOf(o.key.path)?ci(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new Sc(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return Nc(t).get(ha.key).next((t=>(Fr(!!t),t)))}me(t,e){return Nc(t).put(ha.key,e)}ge(t,e){if(e){const t=Va(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(Gr.min()))return t}return Ds.newInvalidDocument(t)}}class Sc extends _c{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Ec((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new Xi(((t,e)=>Br(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Ae.get(s);if(i.document.isValidDocument()){const a=qa(this.Ie.R,i.document,this.getReadTime(s));r=r.add(s.path.popLast());const c=sc(a);n+=c-o,e.push(this.Ie.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=qa(this.Ie.R,Ds.newNoDocument(s,Gr.min()),this.getReadTime(s));e.push(this.Ie.addEntry(t,s,n))}else e.push(this.Ie.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ie.Ut.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),Ea.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function Nc(t){return La(t,ha.store)}function Dc(t){return La(t,ua.store)}function Ac(t){return t.path.toArray()}
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
     */class xc{constructor(t){this.R=t}Rt(t,e,n,r){Fr(n<r&&n>=0&&r<=11);const s=new _a("createOrUpgrade",e);n<1&&r>=1&&(function(t){t.createObjectStore(ra.store)}(t),function(t){t.createObjectStore(sa.store,{keyPath:sa.keyPath}),t.createObjectStore(ia.store,{keyPath:ia.keyPath,autoIncrement:!0}).createIndex(ia.userMutationsIndex,ia.userMutationsKeyPath,{unique:!0}),t.createObjectStore(oa.store)}(t),Cc(t),function(t){t.createObjectStore(ua.store)}(t));let i=Ea.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(da.store),t.deleteObjectStore(la.store),t.deleteObjectStore(fa.store)}(t),Cc(t)),i=i.next((()=>function(t){const e=t.store(fa.store),n=new fa(0,0,Gr.min().toTimestamp(),0);return e.put(fa.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(ia.store).Nt().next((n=>{t.deleteObjectStore(ia.store),t.createObjectStore(ia.store,{keyPath:ia.keyPath,autoIncrement:!0}).createIndex(ia.userMutationsIndex,ia.userMutationsKeyPath,{unique:!0});const r=e.store(ia.store),s=n.map((t=>r.put(t)));return Ea.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(ga.store,{keyPath:ga.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.Re(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(ha.store)}(t),this.Pe(s))))),n<7&&r>=7&&(i=i.next((()=>this.be(s)))),n<8&&r>=8&&(i=i.next((()=>this.ve(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(ua.store);e.createIndex(ua.readTimeIndex,ua.readTimeIndexPath,{unique:!1}),e.createIndex(ua.collectionReadTimeIndex,ua.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.Ve(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(pa.store,{keyPath:pa.keyPath})}(t),function(t){t.createObjectStore(ya.store,{keyPath:ya.keyPath})}
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
     */(t)}))),i}Pe(t){let e=0;return t.store(ua.store).$t(((t,n)=>{e+=sc(n)})).next((()=>{const n=new ha(e);return t.store(ha.store).put(ha.key,n)}))}Re(t){const e=t.store(sa.store),n=t.store(ia.store);return e.Nt().next((e=>Ea.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(ia.userMutationsIndex,r).next((n=>Ea.forEach(n,(n=>{Fr(n.userId===e.userId);const r=ja(this.R,n);return rc(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(da.store),n=t.store(ua.store);return t.store(fa.store).get(fa.key).next((t=>{const r=[];return n.$t(((n,s)=>{const i=new Yr(n),o=function(t){return[0,Jo(t)]}(i);r.push(e.get(o).next((n=>n?Ea.resolve():(n=>e.put(new da(0,Jo(n),t.highestListenSequenceNumber)))(i))))})).next((()=>Ea.waitFor(r)))}))}ve(t,e){t.createObjectStore(ma.store,{keyPath:ma.keyPath});const n=e.store(ma.store),r=new Ja,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:Jo(r)})}};return e.store(ua.store).$t({Ot:!0},((t,e)=>{const n=new Yr(t);return s(n.popLast())})).next((()=>e.store(oa.store).$t({Ot:!0},(([t,e,n],r)=>{const i=ea(e);return s(i.popLast())}))))}Ve(t){const e=t.store(la.store);return e.$t(((t,n)=>{const r=Ga(n),s=Qa(this.R,r);return e.put(s)}))}}function Cc(t){t.createObjectStore(da.store,{keyPath:da.keyPath}).createIndex(da.documentTargetsIndex,da.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(la.store,{keyPath:la.keyPath}).createIndex(la.queryTargetsIndexName,la.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(fa.store)}const Rc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class kc{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=s,this.window=i,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.Oe=null,this.$e=null,this.Me=Number.NEGATIVE_INFINITY,this.Fe=t=>Promise.resolve(),!kc.gt())throw new xr(Ar.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new bc(this,r),this.Le=e+"main",this.R=new Fa(a),this.Be=new Ta(this.Le,11,new xc(this.R)),this.qe=new lc(this.referenceDelegate,this.R),this.Ut=new Za,this.Ue=function(t,e){return new Tc(t,e)}(this.R,this.Ut),this.Ke=new Ha,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&Lr("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new xr(Ar.FAILED_PRECONDITION,Rc);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.qe.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Dr(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Fe=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Oc(t).put(new ga(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Fe(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Da(t))return kr("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return kr("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Fe(t))),this.isPrimary=t}))}Je(t){return Lc(t).get(ra.key).next((t=>Ea.resolve(this.tn(t))))}en(t){return Oc(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Me,18e5)){this.Me=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=La(t,ga.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return Ea.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.$e=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?Ea.resolve(!0):Lc(t).get(ra.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new xr(Ar.FAILED_PRECONDITION,Rc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Oc(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&kr("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.un(),this.$e&&(this.$e.cancel(),this.$e=null),this.an(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[ra.store,ga.store],(t=>{const e=new ka(t,Dr.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Oc(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return ic.Qt(t,this.R,this.Ut,this.referenceDelegate)}getTargetCache(){return this.qe}getRemoteDocumentCache(){return this.Ue}getIndexManager(){return this.Ut}getBundleCache(){return this.Ke}runTransaction(t,e,n){kr("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.Be.runTransaction(t,r,wa,(r=>(s=new ka(r,this.Ne?this.Ne.next():Dr.o),"readwrite-primary"===e?this.Je(s).next((t=>!!t||this.Ye(s))).next((e=>{if(!e)throw Lr(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Fe(!1))),new xr(Ar.FAILED_PRECONDITION,va);return n(s)})).next((t=>this.Ze(s).next((()=>t)))):this.dn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}dn(t){return Lc(t).get(ra.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new xr(Ar.FAILED_PRECONDITION,Rc)}))}Ze(t){const e=new ra(this.clientId,this.allowTabSynchronization,Date.now());return Lc(t).put(ra.key,e)}static gt(){return Ta.gt()}Xe(t){const e=Lc(t);return e.get(ra.key).next((t=>this.tn(t)?(kr("IndexedDbPersistence","Releasing primary lease."),e.delete(ra.key)):Ea.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Lr(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.Oe=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.Oe),this.inForeground="visible"===this.document.visibilityState)}an(){this.Oe&&(this.document.removeEventListener("visibilitychange",this.Oe),this.Oe=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.un(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("unload",this.ke))}hn(){this.ke&&(this.window.removeEventListener("unload",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return kr("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(t){return Lr("IndexedDbPersistence","Failed to get zombied client id.",t),!1}}un(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){Lr("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Lc(t){return La(t,ra.store)}function Oc(t){return La(t,ga.store)}function Mc(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"
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
     */}class Pc{constructor(t,e){this.progress=t,this.wn=e}}
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
     */class Fc{constructor(t,e,n){this.Ue=t,this._n=e,this.Ut=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.Ue.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const t of e)t.applyToLocalView(n)}))}pn(t,e){return this.Ue.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return function(t){return ls.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.Tn(t,e.path):ei(e)?this.In(t,e,n):this.An(t,e,n)}Tn(t,e){return this.mn(t,new ls(e)).next((t=>{let e=no();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let s=no();return this.Ut.getCollectionParents(t,r).next((i=>Ea.forEach(i,(i=>{const o=function(t,e){return new Hs(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,i.child(r));return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}An(t,e,n){let r,s;return this.Ue.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Rn(t,s,r).next((t=>{r=t;for(const t of s)for(const e of t.mutations){const n=e.key;let s=r.get(n);null==s&&(s=Ds.newInvalidDocument(n),r=r.insert(n,s)),ki(e,s,t.localWriteTime),s.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{ci(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=oo();for(const t of e)for(const e of t.mutations)e instanceof Fi&&null===n.get(e.key)&&(r=r.add(e.key));let s=n;return this.Ue.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(s=s.insert(t,e))})),s)))}}
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
     */class Vc{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=oo(),r=oo();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:r=r.add(t.doc.key)}return new Vc(t,e.fromCache,n,r)}}
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
     */class qc{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||n.isEqual(Gr.min())?this.Dn(t,e):this.Sn.pn(t,r).next((s=>{const i=this.Cn(e,s);return(Xs(e)||Js(e))&&this.Nn(e.limitType,i,r,n)?this.Dn(t,e):(Rr()<=f.DEBUG&&kr("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),ai(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}))}Cn(t,e){let n=new Xi(ui(t));return e.forEach(((e,r)=>{ci(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Dn(t,e){return Rr()<=f.DEBUG&&kr("QueryEngine","Using full collection scan to execute query:",ai(e)),this.Sn.getDocumentsMatchingQuery(t,e,Gr.min())}}
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
     */class Uc{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new Hi(Br),this.On=new Ec((t=>Cs(t)),Rs),this.$n=Gr.min(),this._n=t.getMutationQueue(n),this.Mn=t.getRemoteDocumentCache(),this.qe=t.getTargetCache(),this.Fn=new Fc(this.Mn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Fn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function Bc(t,e,n,r){return new Uc(t,e,n,r)}async function $c(t,e){const n=Vr(t);let r=n._n,s=n.Fn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n._n.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new Fc(n.Mn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=oo();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Fn=s,n.xn.Vn(n.Fn),i}function Kc(t){const e=Vr(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.qe.getLastRemoteSnapshotVersion(t)))}function jc(t,e,n,r,s){let i=oo();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=to();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o.isNoDocument()&&o.version.isEqual(Gr.min())?(e.removeEntry(n,c),i=i.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):kr("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}function Gc(t,e){const n=Vr(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}function Qc(t,e){const n=Vr(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.qe.getTargetData(t,e).next((s=>s?(r=s,Ea.resolve(r)):n.qe.allocateTargetId(t).next((s=>(r=new Pa(e,s,0,t.currentSequenceNumber),n.qe.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.On.set(e,t.targetId)),t}))}async function zc(t,e,n){const r=Vr(t),s=r.kn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(t){if(!Da(t))throw t;kr("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}r.kn=r.kn.remove(e),r.On.delete(s.target)}function Hc(t,e,n){const r=Vr(t);let s=Gr.min(),i=oo();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=Vr(t),s=r.On.get(n);return void 0!==s?Ea.resolve(r.kn.get(s)):r.qe.getTargetData(e,n)}(r,t,ri(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.qe.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?s:Gr.min(),n?i:oo()))).next((t=>({documents:t,Bn:i})))))}function Wc(t,e){const n=Vr(t),r=Vr(n.qe),s=n.kn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",(t=>r.lt(t,e).next((t=>t?t.target:null))))}function Yc(t){const e=Vr(t);return e.persistence.runTransaction("Get new document changes","readonly",(t=>function(t,e,n){const r=Vr(t);let s=to(),i=Ua(n);const o=Dc(e),a=IDBKeyRange.lowerBound(i,!0);return o.$t({index:ua.readTimeIndex,range:a},((t,e)=>{const n=Va(r.R,e);s=s.insert(n.key,n),i=e.readTime})).next((()=>({wn:s,readTime:Ba(i)})))}(e.Mn,t,e.$n))).then((({wn:t,readTime:n})=>(e.$n=n,t)))}async function Xc(t,e,n=oo()){const r=await Qc(t,ri(za(e.bundledQuery))),s=Vr(t);return s.persistence.runTransaction("Save named query","readwrite",(t=>{const i=So(e.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Ke.saveNamedQuery(t,e);const o=r.withResumeToken(ts.EMPTY_BYTE_STRING,i);return s.kn=s.kn.insert(o.targetId,o),s.qe.updateTargetData(t,o).next((()=>s.qe.removeMatchingKeysForTargetId(t,r.targetId))).next((()=>s.qe.addMatchingKeys(t,n,r.targetId))).next((()=>s.Ke.saveNamedQuery(t,e)))}))}
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
     */class Jc{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return Ea.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:So(n.createTime)}),Ea.resolve()}getNamedQuery(t,e){return Ea.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,function(t){return{name:t.name,query:za(t.bundledQuery),readTime:So(t.readTime)}}(e)),Ea.resolve()}}
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
     */class Zc{constructor(){this.Wn=new Xi(tu.Gn),this.zn=new Xi(tu.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new tu(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new tu(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new ls(new Yr([])),n=new tu(e,t),r=new tu(e,t+1),s=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),s.push(t.key)})),s}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new ls(new Yr([])),n=new tu(e,t),r=new tu(e,t+1);let s=oo();return this.zn.forEachInRange([n,r],(t=>{s=s.add(t.key)})),s}containsKey(t){const e=new tu(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class tu{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return ls.comparator(t.key,e.key)||Br(t.ns,e.ns)}static Hn(t,e){return Br(t.ns,e.ns)||ls.comparator(t.key,e.key)}}
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
     */class eu{constructor(t,e){this.Ut=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new Xi(tu.Gn)}checkEmpty(t){return Ea.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const s=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const i=new Oa(s,e,n,r);this._n.push(i);for(const e of r)this.rs=this.rs.add(new tu(e.key,s)),this.Ut.addToCollectionParentIndex(t,e.key.path.popLast());return Ea.resolve(i)}lookupMutationBatch(t,e){return Ea.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),s=r<0?0:r;return Ea.resolve(this._n.length>s?this._n[s]:null)}getHighestUnacknowledgedBatchId(){return Ea.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return Ea.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new tu(e,0),r=new tu(e,Number.POSITIVE_INFINITY),s=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);s.push(e)})),Ea.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new Xi(Br);return e.forEach((t=>{const e=new tu(t,0),r=new tu(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),Ea.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;ls.isDocumentKey(s)||(s=s.child(""));const i=new tu(new ls(s),0);let o=new Xi(Br);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),i),Ea.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){Fr(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return Ea.forEach(e.mutations,(r=>{const s=new tu(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new tu(e,0),r=this.rs.firstAfterOrEqual(n);return Ea.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,Ea.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
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
     */class nu{constructor(t,e){this.Ut=t,this.ls=e,this.docs=new Hi(ls.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-i,this.Ut.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Ea.resolve(n?n.document.clone():Ds.newInvalidDocument(e))}getEntries(t,e){let n=to();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():Ds.newInvalidDocument(t))})),Ea.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=to();const s=new ls(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{document:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||ci(e,s)&&(r=r.insert(s.key,s.clone()))}return Ea.resolve(r)}fs(t,e){return Ea.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new ru(this)}getSize(t){return Ea.resolve(this.size)}}class ru extends _c{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),Ea.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
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
     */class su{constructor(t){this.persistence=t,this.ds=new Ec((t=>Cs(t)),Rs),this.lastRemoteSnapshotVersion=Gr.min(),this.highestTargetId=0,this.ws=0,this._s=new Zc,this.targetCount=0,this.gs=hc.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),Ea.resolve()}getLastRemoteSnapshotVersion(t){return Ea.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Ea.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),Ea.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),Ea.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new hc(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,Ea.resolve()}updateTargetData(t,e){return this.te(e),Ea.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,Ea.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ds.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),Ea.waitFor(s).next((()=>r))}getTargetCount(t){return Ea.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return Ea.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),Ea.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),Ea.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),Ea.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return Ea.resolve(n)}containsKey(t,e){return Ea.resolve(this._s.containsKey(e))}}
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
     */class iu{constructor(t,e){this.ys={},this.Ne=new Dr(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.qe=new su(this),this.Ut=new Xa,this.Ue=function(t,e){return new nu(t,e)}(this.Ut,(t=>this.referenceDelegate.ps(t))),this.R=new Fa(e),this.Ke=new Jc(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Ut}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new eu(this.Ut,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.qe}getRemoteDocumentCache(){return this.Ue}getBundleCache(){return this.Ke}runTransaction(t,e,n){kr("MemoryPersistence","Starting transaction:",t);const r=new ou(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return Ea.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class ou extends ba{constructor(t){super(),this.currentSequenceNumber=t}}class au{constructor(t){this.persistence=t,this.As=new Zc,this.Rs=null}static Ps(t){return new au(t)}get bs(){if(this.Rs)return this.Rs;throw Pr()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),Ea.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),Ea.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),Ea.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ea.forEach(this.bs,(n=>{const r=ls.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return Ea.or([()=>Ea.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
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
     */class cu{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}function uu(t,e){return`firestore_clients_${t}_${e}`}function hu(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function lu(t,e){return`firestore_targets_${t}_${e}`}cu.UNAUTHENTICATED=new cu(null),cu.GOOGLE_CREDENTIALS=new cu("google-credentials-uid"),cu.FIRST_PARTY=new cu("first-party-uid");class du{constructor(t,e,n,r){this.user=t,this.batchId=e,this.state=n,this.error=r}static Vs(t,e,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new xr(r.error.code,r.error.message))),i?new du(t,e,r.state,s):(Lr("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class fu{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Vs(t,e){const n=JSON.parse(e);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new xr(n.error.code,n.error.message))),s?new fu(t,n.state,r):(Lr("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class mu{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Vs(t,e){const n=JSON.parse(e);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=co();for(let t=0;r&&t<n.activeTargetIds.length;++t)r=hs(n.activeTargetIds[t]),s=s.add(n.activeTargetIds[t]);return r?new mu(t,s):(Lr("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class gu{constructor(t,e){this.clientId=t,this.onlineState=e}static Vs(t){const e=JSON.parse(t);return"object"==typeof e&&-1!==["Unknown","Online","Offline"].indexOf(e.onlineState)&&"string"==typeof e.clientId?new gu(e.clientId,e.onlineState):(Lr("SharedClientState",`Failed to parse online state: ${t}`),null)}}class pu{constructor(){this.activeTargetIds=co()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class yu{constructor(t,e,n,r,s){this.window=t,this.Se=e,this.persistenceKey=n,this.Ns=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.xs=this.ks.bind(this),this.Os=new Hi(Br),this.started=!1,this.$s=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ms=uu(this.persistenceKey,this.Ns),this.Fs=function(t){return`firestore_sequence_number_${t}`}
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
     */(this.persistenceKey),this.Os=this.Os.insert(this.Ns,new pu),this.Ls=new RegExp(`^firestore_clients_${i}_([^_]*)$`),this.Bs=new RegExp(`^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`),this.qs=new RegExp(`^firestore_targets_${i}_(\\d+)$`),this.Us=function(t){return`firestore_online_state_${t}`}(this.persistenceKey),this.Ks=function(t){return`firestore_bundle_loaded_${t}`}(this.persistenceKey),this.window.addEventListener("storage",this.xs)}static gt(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.fn();for(const e of t){if(e===this.Ns)continue;const t=this.getItem(uu(this.persistenceKey,e));if(t){const n=mu.Vs(e,t);n&&(this.Os=this.Os.insert(n.clientId,n))}}this.Qs();const e=this.storage.getItem(this.Us);if(e){const t=this.js(e);t&&this.Ws(t)}for(const t of this.$s)this.ks(t);this.$s=[],this.window.addEventListener("unload",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Fs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.Gs(this.Os)}isActiveQueryTarget(t){let e=!1;return this.Os.forEach(((n,r)=>{r.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.zs(t,"pending")}updateMutationState(t,e,n){this.zs(t,e,n),this.Hs(t)}addLocalQueryTarget(t){let e="not-current";if(this.isActiveQueryTarget(t)){const n=this.storage.getItem(lu(this.persistenceKey,t));if(n){const r=fu.Vs(t,n);r&&(e=r.state)}}return this.Js.Ds(t),this.Qs(),e}removeLocalQueryTarget(t){this.Js.Cs(t),this.Qs()}isLocalQueryTarget(t){return this.Js.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(lu(this.persistenceKey,t))}updateQueryState(t,e,n){this.Ys(t,e,n)}handleUserChange(t,e,n){e.forEach((t=>{this.Hs(t)})),this.currentUser=t,n.forEach((t=>{this.addPendingMutation(t)}))}setOnlineState(t){this.Xs(t)}notifyBundleLoaded(){this.Zs()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.xs),this.removeItem(this.Ms),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return kr("SharedClientState","READ",t,e),e}setItem(t,e){kr("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){kr("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ks(t){const e=t;if(e.storageArea===this.storage){if(kr("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Ms)return void Lr("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Se.enqueueRetryable((async()=>{if(this.started){if(null!==e.key)if(this.Ls.test(e.key)){if(null==e.newValue){const t=this.ti(e.key);return this.ei(t,null)}{const t=this.ni(e.key,e.newValue);if(t)return this.ei(t.clientId,t)}}else if(this.Bs.test(e.key)){if(null!==e.newValue){const t=this.si(e.key,e.newValue);if(t)return this.ii(t)}}else if(this.qs.test(e.key)){if(null!==e.newValue){const t=this.ri(e.key,e.newValue);if(t)return this.oi(t)}}else if(e.key===this.Us){if(null!==e.newValue){const t=this.js(e.newValue);if(t)return this.Ws(t)}}else if(e.key===this.Fs){const t=function(t){let e=Dr.o;if(null!=t)try{const n=JSON.parse(t);Fr("number"==typeof n),e=n}catch(t){Lr("SharedClientState","Failed to read sequence number from WebStorage",t)}return e}(e.newValue);t!==Dr.o&&this.sequenceNumberHandler(t)}else if(e.key===this.Ks)return this.syncEngine.ci()}else this.$s.push(e)}))}}get Js(){return this.Os.get(this.Ns)}Qs(){this.setItem(this.Ms,this.Js.Ss())}zs(t,e,n){const r=new du(this.currentUser,t,e,n),s=hu(this.persistenceKey,this.currentUser,t);this.setItem(s,r.Ss())}Hs(t){const e=hu(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Xs(t){const e={clientId:this.Ns,onlineState:t};this.storage.setItem(this.Us,JSON.stringify(e))}Ys(t,e,n){const r=lu(this.persistenceKey,t),s=new fu(t,e,n);this.setItem(r,s.Ss())}Zs(){this.setItem(this.Ks,"value-not-used")}ti(t){const e=this.Ls.exec(t);return e?e[1]:null}ni(t,e){const n=this.ti(t);return mu.Vs(n,e)}si(t,e){const n=this.Bs.exec(t),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return du.Vs(new cu(s),r,e)}ri(t,e){const n=this.qs.exec(t),r=Number(n[1]);return fu.Vs(r,e)}js(t){return gu.Vs(t)}async ii(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.ui(t.batchId,t.state,t.error);kr("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}oi(t){return this.syncEngine.ai(t.targetId,t.state,t.error)}ei(t,e){const n=e?this.Os.insert(t,e):this.Os.remove(t),r=this.Gs(this.Os),s=this.Gs(n),i=[],o=[];return s.forEach((t=>{r.has(t)||i.push(t)})),r.forEach((t=>{s.has(t)||o.push(t)})),this.syncEngine.hi(i,o).then((()=>{this.Os=n}))}Ws(t){this.Os.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}Gs(t){let e=co();return t.forEach(((t,n)=>{e=e.unionWith(n.activeTargetIds)})),e}}class wu{constructor(){this.li=new pu,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new pu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
     */class vu{di(t){}shutdown(){}}
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
     */class bu{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){kr("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){kr("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
     */const Iu={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
     */class Eu{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
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
     */class _u extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const s=this.xi(t,e);kr("RestConnection","Sending: ",s,n);const i={};return this.ki(i,r),this.Oi(t,s,i,n).then((t=>(kr("RestConnection","Received: ",t),t)),(e=>{throw Or("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}$i(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/8.4.1",t["X-Firebase-GMPID"]=this.databaseInfo.appId,t["Content-Type"]="text/plain",e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=Iu[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling}Oi(t,e,n,r){return new Promise(((s,i)=>{const o=new Nr;o.listenOnce(Ir.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case br.NO_ERROR:const e=o.getResponseJson();kr("Connection","XHR received:",JSON.stringify(e)),s(e);break;case br.TIMEOUT:kr("Connection",'RPC "'+t+'" timed out'),i(new xr(Ar.DEADLINE_EXCEEDED,"Request time out"));break;case br.HTTP_ERROR:const n=o.getStatus();if(kr("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Ar).indexOf(e)>=0?e:Ar.UNKNOWN}(t.status);i(new xr(e,t.message))}else i(new xr(Ar.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new xr(Ar.UNAVAILABLE,"Connection failed."));break;default:Pr()}}finally{kr("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Mi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new gr,s=pe(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};var a;this.ki(i.initMessageHeaders,e),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(o())||"object"==typeof navigator&&"ReactNative"===navigator.product||o().indexOf("Electron/")>=0||function(){var t=o();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||o().indexOf("MSAppHost/")>=0||"object"==typeof(a="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==a.id||(i.httpHeadersOverwriteParam="$httpHeaders");const c=n.join("");kr("Connection","Creating WebChannel: "+c,i);const u=r.createWebChannel(c,i);let h=!1,l=!1;const d=new Eu({Ei:t=>{l?kr("Connection","Not sending because WebChannel is closed:",t):(h||(kr("Connection","Opening WebChannel transport."),u.open(),h=!0),kr("Connection","WebChannel sending:",t),u.send(t))},Ti:()=>u.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(u,Sr.EventType.OPEN,(()=>{l||kr("Connection","WebChannel transport opened.")})),f(u,Sr.EventType.CLOSE,(()=>{l||(l=!0,kr("Connection","WebChannel transport closed"),d.Vi())})),f(u,Sr.EventType.ERROR,(t=>{l||(l=!0,Or("Connection","WebChannel transport errored:",t),d.Vi(new xr(Ar.UNAVAILABLE,"The operation could not be completed")))})),f(u,Sr.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];Fr(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){kr("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=ji[t];if(void 0!==e)return zi(e)}(t),n=s.message;void 0===e&&(e=Ar.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),l=!0,d.Vi(new xr(e,n)),u.close()}else kr("Connection","WebChannel received:",n),d.Si(n)}})),f(s,Er.STAT_EVENT,(t=>{t.stat===_r?kr("Connection","Detected buffering proxy"):t.stat===Tr&&kr("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.vi()}),0),d}}
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
     */function Tu(){return"undefined"!=typeof window?window:null}function Su(){return"undefined"!=typeof document?document:null}
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
     */function Nu(t){return new Io(t,!0)}class Du{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Se=t,this.timerId=e,this.Fi=n,this.Li=r,this.Bi=s,this.qi=0,this.Ui=null,this.Ki=Date.now(),this.reset()}reset(){this.qi=0}Qi(){this.qi=this.Bi}ji(t){this.cancel();const e=Math.floor(this.qi+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&kr("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.qi} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Ui=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.qi*=this.Li,this.qi<this.Fi&&(this.qi=this.Fi),this.qi>this.Bi&&(this.qi=this.Bi)}Gi(){null!==this.Ui&&(this.Ui.skipDelay(),this.Ui=null)}cancel(){null!==this.Ui&&(this.Ui.cancel(),this.Ui=null)}Wi(){return(Math.random()-.5)*this.qi}}
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
     */class Au{constructor(t,e,n,r,s,i){this.Se=t,this.zi=n,this.Hi=r,this.Ji=s,this.listener=i,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new Du(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ur(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ur(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ur(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===Ar.RESOURCE_EXHAUSTED?(Lr(e.toString()),Lr("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===Ar.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ar(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ar(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new xr(Ar.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return kr("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(kr("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class xu extends Au{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.R=r}wr(t){return this.Hi.Mi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(t){return"NO_CHANGE"===t?0:"ADD"===t?1:"REMOVE"===t?2:"CURRENT"===t?3:"RESET"===t?4:Pr()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(t,e){return t.I?(Fr(void 0===e||"string"==typeof e),ts.fromBase64String(e||"")):(Fr(void 0===e||e instanceof Uint8Array),ts.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(t){const e=void 0===t.code?Ar.UNKNOWN:zi(t.code);return new xr(e,t.message||"")}(o);n=new mo(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=xo(t,r.document.name),i=So(r.document.updateTime),o=new Ss({mapValue:{fields:r.document.fields}}),a=Ds.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new lo(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=xo(t,r.document),i=r.readTime?So(r.readTime):Gr.min(),o=Ds.newNoDocument(s,i),a=r.removedTargetIds||[];n=new lo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=xo(t,r.document),i=r.removedTargetIds||[];n=new lo([],i,s,null)}else{if(!("filter"in e))return Pr();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new Ki(r),i=t.targetId;n=new fo(i,s)}}return n}(this.R,t),n=function(t){if(!("targetChange"in t))return Gr.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Gr.min():e.readTime?So(e.readTime):Gr.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=ko(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=ks(r)?{documents:Vo(t,r)}:{query:qo(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=_o(t,e.resumeToken):e.snapshotVersion.compareTo(Gr.min())>0&&(n.readTime=Eo(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Pr()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=ko(this.R),e.removeTarget=t,this.cr(e)}}class Cu extends Au{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ar(){this.yr&&this.Er([])}wr(t){return this.Hi.Mi("Write",t)}onMessage(t){if(Fr(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(Fr(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?So(t.updateTime):So(e);return n.isEqual(Gr.min())&&(n=So(e)),new Di(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=So(t.commitTime);return this.listener.Tr(n,e)}return Fr(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=ko(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>Po(this.R,t)))};this.cr(e)}}
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
     */class Ru extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new xr(Ar.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw t.code===Ar.UNAUTHENTICATED&&this.credentials.invalidateToken(),t}))}$i(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.$i(t,e,n,r))).catch((t=>{throw t.code===Ar.UNAUTHENTICATED&&this.credentials.invalidateToken(),t}))}terminate(){this.Rr=!1}}class ku{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(Lr(e),this.Vr=!1):kr("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
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
     */class Lu{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Or=[],this.$r=new Map,this.Mr=new Set,this.Fr=[],this.Lr=s,this.Lr.di((t=>{n.enqueueAndForget((async()=>{$u(this)&&(kr("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Vr(t);e.Mr.add(4),await Mu(e),e.Br.set("Unknown"),e.Mr.delete(4),await Ou(e)}(this))}))})),this.Br=new ku(n,r)}}async function Ou(t){if($u(t))for(const e of t.Fr)await e(!0)}async function Mu(t){for(const e of t.Fr)await e(!1)}function Pu(t,e){const n=Vr(t);n.$r.has(e.targetId)||(n.$r.set(e.targetId,e),Bu(n)?Uu(n):ih(n).er()&&Vu(n,e))}function Fu(t,e){const n=Vr(t),r=ih(n);n.$r.delete(e),r.er()&&qu(n,e),0===n.$r.size&&(r.er()?r.ir():$u(n)&&n.Br.set("Unknown"))}function Vu(t,e){t.qr.U(e.targetId),ih(t).mr(e)}function qu(t,e){t.qr.U(e),ih(t).gr(e)}function Uu(t){t.qr=new po({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.$r.get(e)||null}),ih(t).start(),t.Br.Sr()}function Bu(t){return $u(t)&&!ih(t).tr()&&t.$r.size>0}function $u(t){return 0===Vr(t).Mr.size}function Ku(t){t.qr=void 0}async function ju(t){t.$r.forEach(((e,n)=>{Vu(t,e)}))}async function Gu(t,e){Ku(t),Bu(t)?(t.Br.Nr(e),Uu(t)):t.Br.set("Unknown")}async function Qu(t,e,n){if(t.Br.set("Online"),e instanceof mo&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.$r.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.$r.delete(r),t.qr.removeTarget(r))}(t,e)}catch(n){kr("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await zu(t,n)}else if(e instanceof lo?t.qr.X(e):e instanceof fo?t.qr.rt(e):t.qr.et(e),!n.isEqual(Gr.min()))try{const e=await Kc(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.qr.ut(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.$r.get(r);s&&t.$r.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.$r.get(e);if(!n)return;t.$r.set(e,n.withResumeToken(ts.EMPTY_BYTE_STRING,n.snapshotVersion)),qu(t,e);const r=new Pa(n.target,e,1,n.sequenceNumber);Vu(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){kr("RemoteStore","Failed to raise snapshot:",e),await zu(t,e)}}async function zu(t,e,n){if(!Da(e))throw e;t.Mr.add(1),await Mu(t),t.Br.set("Offline"),n||(n=()=>Kc(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{kr("RemoteStore","Retrying IndexedDB access"),await n(),t.Mr.delete(1),await Ou(t)}))}function Hu(t,e){return e().catch((n=>zu(t,n,e)))}async function Wu(t){const e=Vr(t),n=oh(e);let r=e.Or.length>0?e.Or[e.Or.length-1].batchId:-1;for(;Yu(e);)try{const t=await Gc(e.localStore,r);if(null===t){0===e.Or.length&&n.ir();break}r=t.batchId,Xu(e,t)}catch(t){await zu(e,t)}Ju(e)&&Zu(e)}function Yu(t){return $u(t)&&t.Or.length<10}function Xu(t,e){t.Or.push(e);const n=oh(t);n.er()&&n.pr&&n.Er(e.mutations)}function Ju(t){return $u(t)&&!oh(t).tr()&&t.Or.length>0}function Zu(t){oh(t).start()}async function th(t){oh(t).Ar()}async function eh(t){const e=oh(t);for(const n of t.Or)e.Er(n.mutations)}async function nh(t,e,n){const r=t.Or.shift(),s=Ma.from(r,e,n);await Hu(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await Wu(t)}async function rh(t,e){e&&oh(t).pr&&await async function(t,e){if(Qi(n=e.code)&&n!==Ar.ABORTED){const n=t.Or.shift();oh(t).sr(),await Hu(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Wu(t)}var n}(t,e),Ju(t)&&Zu(t)}async function sh(t,e){const n=Vr(t);e?(n.Mr.delete(2),await Ou(n)):e||(n.Mr.add(2),await Mu(n),n.Br.set("Unknown"))}function ih(t){return t.Ur||(t.Ur=function(t,e,n){const r=Vr(t);return r.Pr(),new xu(e,r.Hi,r.credentials,r.R,n)
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
     */}(t.datastore,t.asyncQueue,{Ii:ju.bind(null,t),Ri:Gu.bind(null,t),_r:Qu.bind(null,t)}),t.Fr.push((async e=>{e?(t.Ur.sr(),Bu(t)?Uu(t):t.Br.set("Unknown")):(await t.Ur.stop(),Ku(t))}))),t.Ur}function oh(t){return t.Kr||(t.Kr=function(t,e,n){const r=Vr(t);return r.Pr(),new Cu(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:th.bind(null,t),Ri:rh.bind(null,t),Ir:eh.bind(null,t),Tr:nh.bind(null,t)}),t.Fr.push((async e=>{e?(t.Kr.sr(),await Wu(t)):(await t.Kr.stop(),t.Or.length>0&&(kr("RemoteStore",`Stopping write stream with ${t.Or.length} pending writes`),t.Or=[]))}))),t.Kr
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
     */}class ah{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new Ia,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new ah(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new xr(Ar.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ch(t,e){if(Lr("AsyncQueue",`${e}: ${t}`),Da(t))return new xr(Ar.UNAVAILABLE,`${e}: ${t}`);throw t}
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
     */class uh{constructor(t){this.comparator=t?(e,n)=>t(e,n)||ls.comparator(e.key,n.key):(t,e)=>ls.comparator(t.key,e.key),this.keyedMap=no(),this.sortedSet=new Hi(this.comparator)}static emptySet(t){return new uh(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof uh))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new uh;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
     */class hh{constructor(){this.Qr=new Hi(ls.comparator)}track(t){const e=t.doc.key,n=this.Qr.get(e);n?0!==t.type&&3===n.type?this.Qr=this.Qr.insert(e,t):3===t.type&&1!==n.type?this.Qr=this.Qr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Qr=this.Qr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Qr=this.Qr.remove(e):1===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):Pr():this.Qr=this.Qr.insert(e,t)}jr(){const t=[];return this.Qr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class lh{constructor(t,e,n,r,s,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const s=[];return e.forEach((t=>{s.push({type:0,doc:t})})),new lh(t,e,uh.emptySet(e),s,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ii(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
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
     */class dh{constructor(){this.Wr=void 0,this.listeners=[]}}class fh{constructor(){this.queries=new Ec((t=>oi(t)),ii),this.onlineState="Unknown",this.Gr=new Set}}async function mh(t,e){const n=Vr(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new dh),s)try{i.Wr=await n.onListen(r)}catch(t){const n=ch(t,`Initialization of query '${ai(e.query)}' failed`);return void e.onError(n)}n.queries.set(r,i),i.listeners.push(e),e.zr(n.onlineState),i.Wr&&e.Hr(i.Wr)&&wh(n)}async function gh(t,e){const n=Vr(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function ph(t,e){const n=Vr(t);let r=!1;for(const t of e){const e=t.query,s=n.queries.get(e);if(s){for(const e of s.listeners)e.Hr(t)&&(r=!0);s.Wr=t}}r&&wh(n)}function yh(t,e,n){const r=Vr(t),s=r.queries.get(e);if(s)for(const t of s.listeners)t.onError(n);r.queries.delete(e)}function wh(t){t.Gr.forEach((t=>{t.next()}))}class vh{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new lh(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=lh.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
     */class bh{constructor(t,e){this.payload=t,this.byteLength=e}io(){return"metadata"in this.payload}}
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
     */class Ih{constructor(t){this.R=t}qn(t){return xo(this.R,t)}Un(t){return t.metadata.exists?Mo(this.R,t.document,!1):Ds.newNoDocument(this.qn(t.metadata.name),this.Kn(t.metadata.readTime))}Kn(t){return So(t)}}class Eh{constructor(t,e,n){this.ro=t,this.localStore=e,this.R=n,this.queries=[],this.documents=[],this.progress=_h(t)}oo(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;return t.payload.namedQuery?this.queries.push(t.payload.namedQuery):t.payload.documentMetadata?(this.documents.push({metadata:t.payload.documentMetadata}),t.payload.documentMetadata.exists||++e):t.payload.document&&(this.documents[this.documents.length-1].document=t.payload.document,++e),e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}co(t){const e=new Map,n=new Ih(this.R);for(const r of t)if(r.metadata.queries){const t=n.qn(r.metadata.name);for(const n of r.metadata.queries){const r=(e.get(n)||oo()).add(t);e.set(n,r)}}return e}async complete(){const t=await async function(t,e,n,r){const s=Vr(t);let i=oo(),o=to(),a=so();for(const t of n){const n=e.qn(t.metadata.name);t.document&&(i=i.add(n)),o=o.insert(n,e.Un(t)),a=a.insert(n,e.Kn(t.metadata.readTime))}const c=s.Mn.newChangeBuffer({trackRemovals:!0}),u=await Qc(s,function(t){return ri(Ys(Yr.fromString(`__bundle__/docs/${t}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(t=>jc(t,c,o,Gr.min(),a).next((e=>(c.apply(t),e))).next((e=>s.qe.removeMatchingKeysForTargetId(t,u.targetId).next((()=>s.qe.addMatchingKeys(t,i,u.targetId))).next((()=>s.Fn.En(t,e))).next((()=>e))))))}(this.localStore,new Ih(this.R),this.documents,this.ro.id),e=this.co(this.documents);for(const t of this.queries)await Xc(this.localStore,t,e.get(t.name));return this.progress.taskState="Success",new Pc(Object.assign({},this.progress),t)}}function _h(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}
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
     */class Th{constructor(t){this.key=t}}class Sh{constructor(t){this.key=t}}class Nh{constructor(t,e){this.query=t,this.uo=e,this.ao=null,this.current=!1,this.ho=oo(),this.mutatedKeys=oo(),this.lo=ui(t),this.fo=new uh(this.lo)}get wo(){return this.uo}_o(t,e){const n=e?e.mo:new hh,r=e?e.fo:this.fo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=Xs(this.query)&&r.size===this.query.limit?r.last():null,c=Js(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=ci(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),Xs(this.query)||Js(this.query))for(;i.size>this.query.limit;){const t=Xs(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{fo:i,mo:n,Nn:o,mutatedKeys:s}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const s=t.mo.jr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Pr()}};return n(t)-n(e)}
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
     */(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const i=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.ao;return this.ao=o,0!==s.length||a?{snapshot:new lh(this.query,t.fo,r,s,t.mutatedKeys,0===o,a,!1),To:i}:{To:i}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new hh,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.uo.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.uo=this.uo.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.uo=this.uo.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=oo(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new Sh(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new Th(n))})),e}Ao(t){this.uo=t.Bn,this.ho=oo();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return lh.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.ao)}}class Dh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Ah{constructor(t){this.key=t,this.Po=!1}}class xh{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.bo={},this.vo=new Ec((t=>oi(t)),ii),this.Vo=new Map,this.So=new Set,this.Do=new Hi(ls.comparator),this.Co=new Map,this.No=new Zc,this.xo={},this.ko=new Map,this.Oo=hc.Yt(),this.onlineState="Unknown",this.$o=void 0}get isPrimaryClient(){return!0===this.$o}}async function Ch(t,e){const n=nl(t);let r,s;const i=n.vo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Ro();else{const t=await Qc(n.localStore,ri(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await Rh(n,e,r,"current"===i),n.isPrimaryClient&&Pu(n.remoteStore,t)}return s}async function Rh(t,e,n,r){t.Mo=(e,n,r)=>async function(t,e,n,r){let s=e.view._o(n);s.Nn&&(s=await Hc(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return $h(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const s=await Hc(t.localStore,e,!0),i=new Nh(e,s.Bn),o=i._o(s.documents),a=ho.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);$h(t,n,c.To);const u=new Dh(e,n,i);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}async function kh(t,e){const n=Vr(t),r=n.vo.get(e),s=n.Vo.get(r.targetId);if(s.length>1)return n.Vo.set(r.targetId,s.filter((t=>!ii(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await zc(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Fu(n.remoteStore,r.targetId),Uh(n,r.targetId)})).catch(gc)):(Uh(n,r.targetId),await zc(n.localStore,r.targetId,!0))}async function Lh(t,e){const n=Vr(t);try{const t=await function(t,e){const n=Vr(t),r=e.snapshotVersion;let s=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Mn.newChangeBuffer({trackRemovals:!0});s=n.kn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.qe.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.qe.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const u=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,u),function(t,e,n){return Fr(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize()||e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,e)&&o.push(n.qe.updateTargetData(t,u))}}));let a=to();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(jc(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(Gr.min())){const e=n.qe.getLastRemoteSnapshotVersion(t).next((e=>n.qe.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return Ea.waitFor(o).next((()=>i.apply(t))).next((()=>n.Fn.En(t,a))).next((()=>a))})).then((t=>(n.kn=s,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(Fr(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?Fr(r.Po):t.removedDocuments.size>0&&(Fr(r.Po),r.Po=!1))})),await Gh(n,t,e)}catch(t){await gc(t)}}function Oh(t,e,n){const r=Vr(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const s=r.view.zr(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=Vr(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.zr(e)&&(r=!0)})),r&&wh(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Mh(t,e,n){const r=Vr(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Co.get(e),i=s&&s.key;if(i){let t=new Hi(ls.comparator);t=t.insert(i,Ds.newNoDocument(i,Gr.min()));const n=oo().add(i),s=new uo(Gr.min(),new Map,new Xi(Br),t,n);await Lh(r,s),r.Do=r.Do.remove(i),r.Co.delete(e),jh(r)}else await zc(r.localStore,e,!1).then((()=>Uh(r,e,n))).catch(gc)}async function Ph(t,e){const n=Vr(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Vr(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Mn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=Ea.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);Fr(null!==i),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Fn.pn(t,r)))}))}(n.localStore,e);qh(n,r,null),Vh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Gh(n,t)}catch(t){await gc(t)}}async function Fh(t,e,n){const r=Vr(t);try{const t=await function(t,e){const n=Vr(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(Fr(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Fn.pn(t,r)))}))}(r.localStore,e);qh(r,e,n),Vh(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Gh(r,t)}catch(n){await gc(n)}}function Vh(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function qh(t,e,n){const r=Vr(t);let s=r.xo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.xo[r.currentUser.toKey()]=s}}function Uh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Fo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||Bh(t,e)}))}function Bh(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(Fu(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),jh(t))}function $h(t,e,n){for(const r of n)r instanceof Th?(t.No.addReference(r.key,e),Kh(t,r)):r instanceof Sh?(kr("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||Bh(t,r.key)):Pr()}function Kh(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(kr("SyncEngine","New document in limbo: "+n),t.So.add(r),jh(t))}function jh(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new ls(Yr.fromString(e)),r=t.Oo.next();t.Co.set(r,new Ah(n)),t.Do=t.Do.insert(n,r),Pu(t.remoteStore,new Pa(ri(Ys(n.path)),r,2,Dr.o))}}async function Gh(t,e,n){const r=Vr(t),s=[],i=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Mo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=Vc.vn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.bo._r(s),await async function(t,e){const n=Vr(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Ea.forEach(e,(e=>Ea.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Ea.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!Da(t))throw t;kr("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.kn.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(e,s)}}}(r.localStore,i))}async function Qh(t,e){const n=Vr(t);if(!n.currentUser.isEqual(e)){kr("SyncEngine","User change. New user:",e.toKey());const t=await $c(n.localStore,e);n.currentUser=e,function(t,e){t.ko.forEach((t=>{t.forEach((t=>{t.reject(new xr(Ar.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.ko.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Gh(n,t.Ln)}}function zh(t,e){const n=Vr(t),r=n.Co.get(e);if(r&&r.Po)return oo().add(r.key);{let t=oo();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}async function Hh(t,e){const n=Vr(t),r=await Hc(n.localStore,e.query,!0),s=e.view.Ao(r);return n.isPrimaryClient&&$h(n,e.targetId,s.To),s}async function Wh(t){const e=Vr(t);return Yc(e.localStore).then((t=>Gh(e,t)))}async function Yh(t,e,n,r){const s=Vr(t),i=await function(t,e){const n=Vr(t),r=Vr(n._n);return n.persistence.runTransaction("Lookup mutation documents","readonly",(t=>r.jt(t,e).next((e=>e?n.Fn.pn(t,e):Ea.resolve(null)))))}(s.localStore,e);null!==i?("pending"===n?await Wu(s.remoteStore):"acknowledged"===n||"rejected"===n?(qh(s,e,r||null),Vh(s,e),function(t,e){Vr(Vr(t)._n).Gt(e)}(s.localStore,e)):Pr(),await Gh(s,i)):kr("SyncEngine","Cannot apply mutation batch with id: "+e)}async function Xh(t,e,n){const r=Vr(t),s=[],i=[];for(const t of e){let e;const n=r.Vo.get(t);if(n&&0!==n.length){e=await Qc(r.localStore,ri(n[0]));for(const t of n){const e=r.vo.get(t),n=await Hh(r,e);n.snapshot&&i.push(n.snapshot)}}else{const n=await Wc(r.localStore,t);e=await Qc(r.localStore,n),await Rh(r,Jh(n),t,!1)}s.push(e)}return r.bo._r(i),s}function Jh(t){return Ws(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function Zh(t){const e=Vr(t);return Vr(Vr(e.localStore).persistence).fn()}async function tl(t,e,n,r){const s=Vr(t);if(s.$o)kr("SyncEngine","Ignoring unexpected query state notification.");else if(s.Vo.has(e))switch(n){case"current":case"not-current":{const t=await Yc(s.localStore),r=uo.createSynthesizedRemoteEventForCurrentChange(e,"current"===n);await Gh(s,t,r);break}case"rejected":await zc(s.localStore,e,!0),Uh(s,e,r);break;default:Pr()}}async function el(t,e,n){const r=nl(t);if(r.$o){for(const t of e){if(r.Vo.has(t)){kr("SyncEngine","Adding an already active target "+t);continue}const e=await Wc(r.localStore,t),n=await Qc(r.localStore,e);await Rh(r,Jh(e),n.targetId,!1),Pu(r.remoteStore,n)}for(const t of n)r.Vo.has(t)&&await zc(r.localStore,t,!1).then((()=>{Fu(r.remoteStore,t),Uh(r,t)})).catch(gc)}}function nl(t){const e=Vr(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Lh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=zh.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Mh.bind(null,e),e.bo._r=ph.bind(null,e.eventManager),e.bo.Fo=yh.bind(null,e.eventManager),e}function rl(t){const e=Vr(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ph.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Fh.bind(null,e),e}class sl{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=Nu(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.qo(t),await this.persistence.start(),this.gcScheduler=this.Uo(t),this.localStore=this.Ko(t)}Uo(t){return null}Ko(t){return Bc(this.persistence,new qc,t.initialUser,this.R)}qo(t){return new iu(au.Ps,this.R)}Bo(t){return new wu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class il extends sl{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await async function(t){const e=Vr(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Dc(t);let n=Gr.min();return e.$t({index:ua.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=Ba(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.$n=t}))}(this.localStore),await this.Qo.initialize(this,t),await rl(this.Qo.syncEngine),await Wu(this.Qo.remoteStore)}Ko(t){return Bc(this.persistence,new qc,t.initialUser,this.R)}Uo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new wc(e,t.asyncQueue)}qo(t){const e=Mc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?nc.withCacheSize(this.cacheSizeBytes):nc.DEFAULT;return new kc(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Tu(),Su(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new wu}}class ol extends il{constructor(t,e){super(t,e,!1),this.Qo=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Qo.syncEngine;this.sharedClientState instanceof yu&&(this.sharedClientState.syncEngine={ui:Yh.bind(null,e),ai:tl.bind(null,e),hi:el.bind(null,e),fn:Zh.bind(null,e),ci:Wh.bind(null,e)},await this.sharedClientState.start()),await this.persistence.He((async t=>{await async function(t,e){const n=Vr(t);if(nl(n),rl(n),!0===e&&!0!==n.$o){const t=n.sharedClientState.getAllActiveQueryTargets(),e=await Xh(n,t.toArray());n.$o=!0,await sh(n.remoteStore,!0);for(const t of e)Pu(n.remoteStore,t)}else if(!1===e&&!1!==n.$o){const t=[];let e=Promise.resolve();n.Vo.forEach(((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?t.push(s):e=e.then((()=>(Uh(n,s),zc(n.localStore,s,!0)))),Fu(n.remoteStore,s)})),await e,await Xh(n,t),function(t){const e=Vr(t);e.Co.forEach(((t,n)=>{Fu(e.remoteStore,n)})),e.No.ts(),e.Co=new Map,e.Do=new Hi(ls.comparator)}(n),n.$o=!1,await sh(n.remoteStore,!1)}}(this.Qo.syncEngine,t),this.gcScheduler&&(t&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):t||this.gcScheduler.stop())}))}Bo(t){const e=Tu();if(!yu.gt(e))throw new xr(Ar.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Mc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new yu(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class al{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Oh(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Qh.bind(null,this.syncEngine),await sh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new fh}createDatastore(t){const e=Nu(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new _u(r));var r;return function(t,e,n){return new Ru(t,e,n)}(t.credentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Oh(this.syncEngine,t,0),i=bu.gt()?new bu:new vu,new Lu(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new xh(t,e,n,r,s,i);return o&&(a.$o=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Vr(t);kr("RemoteStore","RemoteStore shutting down."),e.Mr.add(5),await Mu(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
     */function cl(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}
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
     */class ul{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.jo(this.observer.next,t)}error(t){this.observer.error?this.jo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}jo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
     */class hl{constructor(t,e){this.Go=t,this.R=e,this.metadata=new Ia,this.buffer=new Uint8Array,this.zo=new TextDecoder("utf-8"),this.Ho().then((t=>{t&&t.io()?this.metadata.resolve(t.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==t?void 0:t.payload)}`))}),(t=>this.metadata.reject(t)))}close(){return this.Go.cancel()}async getMetadata(){return this.metadata.promise}async Lo(){return await this.getMetadata(),this.Ho()}async Ho(){const t=await this.Jo();if(null===t)return null;const e=this.zo.decode(t),n=Number(e);isNaN(n)&&this.Yo(`length string (${e}) is not valid number`);const r=await this.Xo(n);return new bh(JSON.parse(r),t.length+n)}Zo(){return this.buffer.findIndex((t=>t==="{".charCodeAt(0)))}async Jo(){for(;this.Zo()<0&&!await this.tc(););if(0===this.buffer.length)return null;const t=this.Zo();t<0&&this.Yo("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async Xo(t){for(;this.buffer.length<t;)await this.tc()&&this.Yo("Reached the end of bundle when more is expected.");const e=this.zo.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Yo(t){throw this.Go.cancel(),new Error(`Invalid bundle format: ${t}`)}async tc(){const t=await this.Go.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}
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
     */class ll{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new xr(Ar.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(t,e){const n=Vr(t),r=ko(n.R)+"/documents",s={documents:e.map((t=>Ao(n.R,t)))},i=await n.$i("BatchGetDocuments",r,s),o=new Map;i.forEach((t=>{const e=function(t,e){return"found"in e?function(t,e){Fr(!!e.found),e.found.name,e.found.updateTime;const n=xo(t,e.found.name),r=So(e.found.updateTime),s=new Ss({mapValue:{fields:e.found.fields}});return Ds.newFoundDocument(n,r,s)}(t,e):"missing"in e?function(t,e){Fr(!!e.missing),Fr(!!e.readTime);const n=xo(t,e.missing),r=So(e.readTime);return Ds.newNoDocument(n,r)}(t,e):Pr()}(n.R,t);o.set(e.key.toString(),e)}));const a=[];return e.forEach((t=>{const e=o.get(t.toString());Fr(!!e),a.push(e)})),a}(this.datastore,t);return e.forEach((t=>this.recordVersion(t))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastWriteError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new Bi(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((t,e)=>{const n=ls.fromPath(e);this.mutations.push(new $i(n,this.precondition(n)))})),await async function(t,e){const n=Vr(t),r=ko(n.R)+"/documents",s={writes:e.map((t=>Po(n.R,t)))};await n.Ni("Commit",r,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw Pr();e=Gr.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new xr(Ar.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?Ai.updateTime(e):Ai.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(Gr.min()))throw new xr(Ar.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ai.updateTime(e)}return Ai.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
     */class dl{constructor(t,e,n,r){this.asyncQueue=t,this.datastore=e,this.updateFunction=n,this.deferred=r,this.ec=5,this.Zi=new Du(this.asyncQueue,"transaction_retry")}run(){this.nc()}nc(){this.Zi.ji((async()=>{const t=new ll(this.datastore),e=this.sc(t);e&&e.then((e=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(e)})).catch((t=>{this.ic(t)}))))})).catch((t=>{this.ic(t)}))}))}sc(t){try{const e=this.updateFunction(t);return!cs(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}ic(t){this.ec>0&&this.rc(t)?(this.ec-=1,this.asyncQueue.enqueueAndForget((()=>(this.nc(),Promise.resolve())))):this.deferred.reject(t)}rc(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||!Qi(e)}return!1}}
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
     */class fl{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=cu.UNAUTHENTICATED,this.clientId=Ur.u(),this.credentialListener=()=>{},this.receivedInitialUser=new Ia,this.credentials.setChangeListener((t=>{kr("FirestoreClient","Received user=",t.uid),this.user=t,this.credentialListener(t),this.receivedInitialUser.resolve()}))}async getConfiguration(){return await this.receivedInitialUser.promise,{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t,this.receivedInitialUser.promise.then((()=>this.credentialListener(this.user)))}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new xr(Ar.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ia;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=ch(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function ml(t,e){t.asyncQueue.verifyOperationInProgress(),kr("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((n=>{r.isEqual(n)||(r=n,t.asyncQueue.enqueueRetryable((async()=>{await $c(e.localStore,n)})))})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function gl(t,e){t.asyncQueue.verifyOperationInProgress();const n=await pl(t);kr("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((n=>t.asyncQueue.enqueueRetryable((()=>async function(t,e){const n=Vr(t);n.asyncQueue.verifyOperationInProgress(),kr("RemoteStore","RemoteStore received new credentials");const r=$u(n);n.Mr.add(3),await Mu(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Mr.delete(3),await Ou(n)}(e.remoteStore,n))))),t.onlineComponents=e}async function pl(t){return t.offlineComponents||(kr("FirestoreClient","Using default OfflineComponentProvider"),await ml(t,new sl)),t.offlineComponents}async function yl(t){return t.onlineComponents||(kr("FirestoreClient","Using default OnlineComponentProvider"),await gl(t,new al)),t.onlineComponents}function wl(t){return pl(t).then((t=>t.persistence))}function vl(t){return pl(t).then((t=>t.localStore))}function bl(t){return yl(t).then((t=>t.remoteStore))}function Il(t){return yl(t).then((t=>t.syncEngine))}async function El(t){const e=await yl(t),n=e.eventManager;return n.onListen=Ch.bind(null,e.syncEngine),n.onUnlisten=kh.bind(null,e.syncEngine),n}function _l(t,e,n={}){const r=new Ia;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new ul({next:i=>{e.enqueueAndForget((()=>gh(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new xr(Ar.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new xr(Ar.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new vh(Ys(n.path),i,{includeMetadataChanges:!0,so:!0});return mh(t,o)}(await El(t),t.asyncQueue,e,n,r))),r.promise}function Tl(t,e,n={}){const r=new Ia;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new ul({next:n=>{e.enqueueAndForget((()=>gh(t,o))),n.fromCache&&"server"===r.source?s.reject(new xr(Ar.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new vh(n,i,{includeMetadataChanges:!0,so:!0});return mh(t,o)}(await El(t),t.asyncQueue,e,n,r))),r.promise}function Sl(t,e,n,r){const s=function(t,e){let n;return n="string"==typeof t?(new TextEncoder).encode(t):t,function(t,e){return new hl(t,e)}(function(t,e){if(t instanceof Uint8Array)return cl(t,e);if(t instanceof ArrayBuffer)return cl(new Uint8Array(t),e);if(t instanceof ReadableStream)return t.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),e)}
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
     */(n,Nu(e));t.asyncQueue.enqueueAndForget((async()=>{!function(t,e,n){const r=Vr(t);(async function(t,e,n){try{const r=await e.getMetadata();if(await function(t,e){const n=Vr(t),r=So(e.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",(t=>n.Ke.getBundleMetadata(t,e.id))).then((t=>!!t&&t.createTime.compareTo(r)>=0))}(t.localStore,r))return await e.close(),void n._completeWith(function(t){return{taskState:"Success",documentsLoaded:t.totalDocuments,bytesLoaded:t.totalBytes,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}(r));n._updateProgress(_h(r));const s=new Eh(r,t.localStore,e.R);let i=await e.Lo();for(;i;){const t=await s.oo(i);t&&n._updateProgress(t),i=await e.Lo()}const o=await s.complete();await Gh(t,o.wn,void 0),await function(t,e){const n=Vr(t);return n.persistence.runTransaction("Save bundle","readwrite",(t=>n.Ke.saveBundleMetadata(t,e)))}(t.localStore,r),n._completeWith(o.progress)}catch(t){Or("SyncEngine",`Loading bundle failed with ${t}`),n._failWith(t)}}
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
     */)(r,e,n).then((()=>{r.sharedClientState.notifyBundleLoaded()}))}(await Il(t),s,r)}))}class Nl{constructor(t,e,n,r,s,i,o){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o}}class Dl{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Dl&&t.projectId===this.projectId&&t.database===this.database}}
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
     */const Al=new Map;
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
     */class xl{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Cl{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t){this.changeListener=t,t(cu.UNAUTHENTICATED)}removeChangeListener(){this.changeListener=null}}class Rl{constructor(t){this.oc=null,this.currentUser=cu.UNAUTHENTICATED,this.receivedInitialUser=!1,this.cc=0,this.changeListener=null,this.forceRefresh=!1,this.oc=()=>{this.cc++,this.currentUser=this.uc(),this.receivedInitialUser=!0,this.changeListener&&this.changeListener(this.currentUser)},this.cc=0,this.auth=t.getImmediate({optional:!0}),this.auth?this.auth.addAuthTokenListener(this.oc):(this.oc(null),t.get().then((t=>{this.auth=t,this.oc&&this.auth.addAuthTokenListener(this.oc)}),(()=>{})))}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(kr("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(Fr("string"==typeof e.accessToken),new xl(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t){this.changeListener=t,this.receivedInitialUser&&t(this.currentUser)}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.oc),this.oc=null,this.changeListener=null}uc(){const t=this.auth&&this.auth.getUid();return Fr(null===t||"string"==typeof t),new cu(t)}}class kl{constructor(t,e,n){this.ac=t,this.hc=e,this.lc=n,this.type="FirstParty",this.user=cu.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.hc},e=this.ac.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.lc&&(t["X-Goog-Iam-Authorization-Token"]=this.lc),t}}class Ll{constructor(t,e,n){this.ac=t,this.hc=e,this.lc=n}getToken(){return Promise.resolve(new kl(this.ac,this.hc,this.lc))}setChangeListener(t){t(cu.FIRST_PARTY)}removeChangeListener(){}invalidateToken(){}}
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
     */function Ol(t,e,n){if(!n)throw new xr(Ar.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Ml(t){if(!ls.isDocumentKey(t))throw new xr(Ar.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Pl(t){if(ls.isDocumentKey(t))throw new xr(Ar.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Fl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Pr()}function Vl(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new xr(Ar.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Fl(t);throw new xr(Ar.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function ql(t,e){if(e<=0)throw new xr(Ar.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}
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
     */class Ul{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new xr(Ar.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new xr(Ar.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,function(t,e,n,r){if(!0===e&&!0===r)throw new xr(Ar.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties}}
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
     */class Bl{constructor(t,e){this._persistenceKey="(lite)",this._settings=new Ul({}),this._settingsFrozen=!1,t instanceof Dl?(this._databaseId=t,this._credentials=new Cl):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new xr(Ar.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Dl(t.options.projectId)}(t),this._credentials=new Rl(e))}get app(){if(!this._app)throw new xr(Ar.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new xr(Ar.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ul(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Cl;switch(t.type){case"gapi":const e=t.client;return Fr(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Ll(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new xr(Ar.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Al.get(t);e&&(kr("ComponentProvider","Removing Datastore"),Al.delete(t),e.terminate())}(this),Promise.resolve()}}
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
class $l{constructor(t,e,n){this._converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jl(this.firestore,this._converter,this._key.path.popLast())}withConverter(t){return new $l(this.firestore,t,this._key)}}class Kl{constructor(t,e,n){this._converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Kl(this.firestore,t,this._query)}}class jl extends Kl{constructor(t,e,n){super(t,e,Ys(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new $l(this.firestore,null,new ls(t))}withConverter(t){return new jl(this.firestore,t,this._path)}}function Gl(t,e,...n){if(t=l(t),Ol("collection","path",e),t instanceof Bl){const r=Yr.fromString(e,...n);return Pl(r),new jl(t,null,r)}{if(!(t instanceof $l||t instanceof jl))throw new xr(Ar.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=Yr.fromString(t.path,...n).child(Yr.fromString(e));return Pl(r),new jl(t.firestore,null,r)}}function Ql(t,e,...n){if(t=l(t),1===arguments.length&&(e=Ur.u()),Ol("doc","path",e),t instanceof Bl){const r=Yr.fromString(e,...n);return Ml(r),new $l(t,null,new ls(r))}{if(!(t instanceof $l||t instanceof jl))throw new xr(Ar.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Yr.fromString(e,...n));return Ml(r),new $l(t.firestore,t instanceof jl?t._converter:null,new ls(r))}}function zl(t,e){return t=l(t),e=l(e),(t instanceof $l||t instanceof jl)&&(e instanceof $l||e instanceof jl)&&t.firestore===e.firestore&&t.path===e.path&&t._converter===e._converter}function Hl(t,e){return t=l(t),e=l(e),t instanceof Kl&&e instanceof Kl&&t.firestore===e.firestore&&ii(t._query,e._query)&&t._converter===e._converter
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
     */}class Wl{constructor(){this.fc=Promise.resolve(),this.dc=[],this.wc=!1,this._c=[],this.mc=null,this.gc=!1,this.yc=[],this.Zi=new Du(this,"async_queue_retry"),this.Ec=()=>{const t=Su();t&&kr("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=Su();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Ec)}get isShuttingDown(){return this.wc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Tc(),this.Ic(t)}enterRestrictedMode(){if(!this.wc){this.wc=!0;const t=Su();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Ec)}}enqueue(t){return this.Tc(),this.wc?new Promise((t=>{})):this.Ic(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.dc.push(t),this.Ac())))}async Ac(){if(0!==this.dc.length){try{await this.dc[0](),this.dc.shift(),this.Zi.reset()}catch(t){if(!Da(t))throw t;kr("AsyncQueue","Operation failed with retryable error: "+t)}this.dc.length>0&&this.Zi.ji((()=>this.Ac()))}}Ic(t){const e=this.fc.then((()=>(this.gc=!0,t().catch((t=>{throw this.mc=t,this.gc=!1,Lr("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
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
     */(t)),t})).then((t=>(this.gc=!1,t))))));return this.fc=e,e}enqueueAfterDelay(t,e,n){this.Tc(),this.yc.indexOf(t)>-1&&(e=0);const r=ah.createAndSchedule(this,t,e,n,(t=>this.Rc(t)));return this._c.push(r),r}Tc(){this.mc&&Pr()}verifyOperationInProgress(){}async Pc(){let t;do{t=this.fc,await t}while(t!==this.fc)}bc(t){for(const e of this._c)if(e.timerId===t)return!0;return!1}vc(t){return this.Pc().then((()=>{this._c.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this._c)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Pc()}))}Vc(t){this.yc.push(t)}Rc(t){const e=this._c.indexOf(t);this._c.splice(e,1)}}function Yl(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t)}class Xl{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ia,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}
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
     */class Jl extends Bl{constructor(t,e){super(t,e),this._queue=new Wl,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||td(this),this._firestoreClient.terminate()}}function Zl(t){return t._firestoreClient||td(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function td(t){var e;const n=t._freezeSettings(),r=function(t,e,n,r){return new Nl(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling)}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new fl(t._credentials,t._queue,r)}function ed(t,e,n){const r=new Ia;return t.asyncQueue.enqueue((async()=>{try{await ml(t,n),await gl(t,e),r.resolve()}catch(t){if(!function(t){return"FirebaseError"===t.name?t.code===Ar.FAILED_PRECONDITION||t.code===Ar.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||(22===t.code||20===t.code||11===t.code)}(t))throw t;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}})).then((()=>r.promise))}function nd(t){return function(t){const e=new Ia;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e){const n=Vr(t);$u(n.remoteStore)||kr("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const t=await function(t){const e=Vr(t);return e.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(t=>e._n.getHighestUnacknowledgedBatchId(t)))}(n.localStore);if(-1===t)return void e.resolve();const r=n.ko.get(t)||[];r.push(e),n.ko.set(t,r)}catch(t){const n=ch(t,"Initialization of waitForPendingWrites() operation failed");e.reject(n)}}(await Il(t),e))),e.promise}(Zl(t=Vl(t,Jl)))}function rd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await wl(t),n=await bl(t);return e.setNetworkEnabled(!0),function(t){const e=Vr(t);return e.Mr.delete(0),Ou(e)}(n)}))}(Zl(t=Vl(t,Jl)))}function sd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await wl(t),n=await bl(t);return e.setNetworkEnabled(!1),async function(t){const e=Vr(t);e.Mr.add(0),await Mu(e),e.Br.set("Offline")}(n)}))}(Zl(t=Vl(t,Jl)))}function id(t,e){return function(t,e){return t.asyncQueue.enqueue((async()=>function(t,e){const n=Vr(t);return n.persistence.runTransaction("Get named query","readonly",(t=>n.Ke.getNamedQuery(t,e)))}(await vl(t),e)))}(Zl(t=Vl(t,Jl)),e).then((e=>e?new Kl(t,null,e.query):null))}function od(t){if(t._initialized||t._terminated)throw new xr(Ar.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
     */class ad{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new xr(Ar.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Jr(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
     */class cd{constructor(t){this._byteString=t}static fromBase64String(t){try{return new cd(ts.fromBase64String(t))}catch(t){throw new xr(Ar.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new cd(ts.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
     */class ud{constructor(t){this._methodName=t}}
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
     */class hd{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new xr(Ar.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new xr(Ar.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Br(this._lat,t._lat)||Br(this._long,t._long)}}
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
     */const ld=/^__.*__$/;class dd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Fi(t,this.data,this.fieldMask,e,this.fieldTransforms):new Pi(t,this.data,e,this.fieldTransforms)}}class fd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new Fi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function md(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Pr()}}class gd{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Sc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Dc(){return this.settings.Dc}Cc(t){return new gd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Nc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Cc({path:n,xc:!1});return r.kc(t),r}Oc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Cc({path:n,xc:!1});return r.Sc(),r}$c(t){return this.Cc({path:void 0,xc:!0})}Mc(t){return Md(t,this.settings.methodName,this.settings.Fc||!1,this.path,this.settings.Lc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Sc(){if(this.path)for(let t=0;t<this.path.length;t++)this.kc(this.path.get(t))}kc(t){if(0===t.length)throw this.Mc("Document fields must not be empty");if(md(this.Dc)&&ld.test(t))throw this.Mc('Document fields cannot begin and end with "__"')}}class pd{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||Nu(t)}Bc(t,e,n,r=!1){return new gd({Dc:t,methodName:e,Lc:n,path:Jr.emptyPath(),xc:!1,Fc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function yd(t){const e=t._freezeSettings(),n=Nu(t._databaseId);return new pd(t._databaseId,!!e.ignoreUndefinedProperties,n)}function wd(t,e,n,r,s,i={}){const o=t.Bc(i.merge||i.mergeFields?2:0,e,n,s);Rd("Data must be an object, but it was:",o,r);const a=xd(r,o);let c,u;if(i.merge)c=new Zr(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=kd(e,r,n);if(!o.contains(s))throw new xr(Ar.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Pd(t,s)||t.push(s)}c=new Zr(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new dd(new Ss(a),c,u)}class vd extends ud{_toFieldTransform(t){if(2!==t.Dc)throw 1===t.Dc?t.Mc(`${this._methodName}() can only appear at the top level of your update data`):t.Mc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof vd}}function bd(t,e,n){return new gd({Dc:3,Lc:e.settings.Lc,methodName:t._methodName,xc:n},e.databaseId,e.R,e.ignoreUndefinedProperties)}class Id extends ud{_toFieldTransform(t){return new Ni(t.path,new wi)}isEqual(t){return t instanceof Id}}class Ed extends ud{constructor(t,e){super(t),this.qc=e}_toFieldTransform(t){const e=bd(this,t,!0),n=this.qc.map((t=>Ad(t,e))),r=new vi(n);return new Ni(t.path,r)}isEqual(t){return this===t}}class _d extends ud{constructor(t,e){super(t),this.qc=e}_toFieldTransform(t){const e=bd(this,t,!0),n=this.qc.map((t=>Ad(t,e))),r=new Ii(n);return new Ni(t.path,r)}isEqual(t){return this===t}}class Td extends ud{constructor(t,e){super(t),this.Uc=e}_toFieldTransform(t){const e=new _i(t.R,fi(t.R,this.Uc));return new Ni(t.path,e)}isEqual(t){return this===t}}function Sd(t,e,n,r){const s=t.Bc(1,e,n);Rd("Data must be an object, but it was:",s,r);const i=[],o=Ss.empty();zr(r,((t,r)=>{const a=Od(e,t,n);r=l(r);const c=s.Oc(a);if(r instanceof vd)i.push(a);else{const t=Ad(r,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new Zr(i);return new fd(o,a,s.fieldTransforms)}function Nd(t,e,n,r,s,i){const o=t.Bc(1,e,n),a=[kd(e,r,n)],c=[s];if(i.length%2!=0)throw new xr(Ar.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(kd(e,i[t])),c.push(i[t+1]);const u=[],h=Ss.empty();for(let t=a.length-1;t>=0;--t)if(!Pd(u,a[t])){const e=a[t];let n=c[t];n=l(n);const r=o.Oc(e);if(n instanceof vd)u.push(e);else{const t=Ad(n,r);null!=t&&(u.push(e),h.set(e,t))}}const d=new Zr(u);return new fd(h,d,o.fieldTransforms)}function Dd(t,e,n,r=!1){return Ad(n,t.Bc(r?4:3,e))}function Ad(t,e){if(Cd(t=l(t)))return Rd("Unsupported field value:",e,t),xd(t,e);if(t instanceof ud)return function(t,e){if(!md(e.Dc))throw e.Mc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Mc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xc&&4!==e.Dc)throw e.Mc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Ad(s,e.$c(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=l(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return fi(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=jr.fromDate(t);return{timestampValue:Eo(e.R,n)}}if(t instanceof jr){const n=new jr(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Eo(e.R,n)}}if(t instanceof hd)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof cd)return{bytesValue:_o(e.R,t._byteString)};if(t instanceof $l){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Mc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:No(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Mc(`Unsupported field value: ${Fl(t)}`)}(t,e)}function xd(t,e){const n={};return Hr(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zr(t,((t,r)=>{const s=Ad(r,e.Nc(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function Cd(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof jr||t instanceof hd||t instanceof cd||t instanceof $l||t instanceof ud)}function Rd(t,e,n){if(!Cd(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Fl(n);throw"an object"===r?e.Mc(t+" a custom object"):e.Mc(t+" "+r)}}function kd(t,e,n){if((e=l(e))instanceof ad)return e._internalPath;if("string"==typeof e)return Od(t,e);throw Md("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Ld=new RegExp("[~\\*/\\[\\]]");function Od(t,e,n){if(e.search(Ld)>=0)throw Md(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ad(...e.split("."))._internalPath}catch(r){throw Md(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Md(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new xr(Ar.INVALID_ARGUMENT,a+t+c)}function Pd(t,e){return t.some((t=>t.isEqual(e)))}
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
     */class Fd{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new $l(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Vd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.toProto())}}get(t){if(this._document){const e=this._document.data.field(qd("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Vd extends Fd{data(){return super.data()}}function qd(t,e){return"string"==typeof e?Od(t,e):e instanceof ad?e._internalPath:e._delegate._internalPath}
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
     */class Ud{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Bd extends Fd{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new $d(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.toProto(),t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(qd("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class $d extends Bd{data(t={}){return super.data(t)}}class Kd{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Ud(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new $d(this._firestore,this._userDataWriter,n.key,n,new Ud(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query._converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new xr(Ar.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e,n=0;return t._snapshot.docChanges.map((r=>{const s=new $d(t._firestore,t._userDataWriter,r.doc.key,r.doc,new Ud(t._snapshot.mutatedKeys.has(r.doc.key),t._snapshot.fromCache),t.query._converter);return e=r.doc,{type:"added",doc:s,oldIndex:-1,newIndex:n++}}))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new $d(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Ud(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query._converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:jd(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function jd(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Pr()}}function Gd(t,e){return t instanceof Bd&&e instanceof Bd?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(null===t._document?null===e._document:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof Kd&&e instanceof Kd&&t._firestore===e._firestore&&Hl(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}
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
     */function Qd(t){if(Js(t)&&0===t.explicitOrderBy.length)throw new xr(Ar.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class zd{}function Hd(t,...e){for(const n of e)t=n._apply(t);return t}class Wd extends zd{constructor(t,e,n){super(),this.Kc=t,this.Qc=e,this.jc=n,this.type="where"}_apply(t){const e=yd(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new xr(Ar.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){nf(o,i);const e=[];for(const n of o)e.push(ef(r,t,n));a={arrayValue:{values:e}}}else a=ef(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||nf(o,i),a=Dd(n,"where",o,"in"===i||"not-in"===i);const c=Ls.create(s,i,a);return function(t,e){if(e.g()){const n=ti(t);if(null!==n&&!n.isEqual(e.field))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);const r=Zs(t);null!==r&&rf(t,e.field,r)}const n=function(t,e){for(const n of t.filters)if(e.indexOf(n.op)>=0)return n.op;return null}(t,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new xr(Ar.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new xr(Ar.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}(t,c),c}(t._query,0,e,t.firestore._databaseId,this.Kc,this.Qc,this.jc);return new Kl(t.firestore,t._converter,function(t,e){const n=t.filters.concat([e]);return new Hs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}(t._query,n))}}class Yd extends zd{constructor(t,e){super(),this.Kc=t,this.Wc=e,this.type="orderBy"}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new xr(Ar.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new xr(Ar.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new js(e,n);return function(t,e){if(null===Zs(t)){const n=ti(t);null!==n&&rf(t,n,e.field)}}(t,r),r}(t._query,this.Kc,this.Wc);return new Kl(t.firestore,t._converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new Hs(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}class Xd extends zd{constructor(t,e,n){super(),this.type=t,this.Gc=e,this.zc=n}_apply(t){return new Kl(t.firestore,t._converter,si(t._query,this.Gc,this.zc))}}class Jd extends zd{constructor(t,e,n){super(),this.type=t,this.Hc=e,this.Jc=n}_apply(t){const e=tf(t,this.type,this.Hc,this.Jc);return new Kl(t.firestore,t._converter,function(t,e){return new Hs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,e,t.endAt)}(t._query,e))}}class Zd extends zd{constructor(t,e,n){super(),this.type=t,this.Hc=e,this.Jc=n}_apply(t){const e=tf(t,this.type,this.Hc,this.Jc);return new Kl(t.firestore,t._converter,function(t,e){return new Hs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,e)}(t._query,e))}}function tf(t,e,n,r){if(n[0]=l(n[0]),n[0]instanceof Fd)return function(t,e,n,r,s){if(!r)throw new xr(Ar.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of ni(t))if(n.field.isKeyField())i.push(vs(e,r.key));else{const t=r.data.field(n.field);if(is(t))throw new xr(Ar.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=n.field.canonicalString();throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}i.push(t)}return new $s(i,s)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=yd(t.firestore);return function(t,e,n,r,s,i){const o=t.explicitOrderBy;if(s.length>o.length)throw new xr(Ar.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const c=s[i];if(o[i].field.isKeyField()){if("string"!=typeof c)throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!ei(t)&&-1!==c.indexOf("/"))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=t.path.child(Yr.fromString(c));if(!ls.isDocumentKey(n))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new ls(n);a.push(vs(e,s))}else{const t=Dd(n,r,c);a.push(t)}}return new $s(a,i)}(t._query,t.firestore._databaseId,s,e,n,r)}}function ef(t,e,n){if("string"==typeof(n=l(n))){if(""===n)throw new xr(Ar.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!ei(e)&&-1!==n.indexOf("/"))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Yr.fromString(n));if(!ls.isDocumentKey(r))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vs(t,new ls(r))}if(n instanceof $l)return vs(t,n._key);throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fl(n)}.`)}function nf(t,e){if(!Array.isArray(t)||0===t.length)throw new xr(Ar.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new xr(Ar.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function rf(t,e,n){if(!n.isEqual(e))throw new xr(Ar.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
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
     */class sf{convertValue(t,e="none"){switch(ds(t)){case 0:return null;case 1:return t.booleanValue;case 2:return rs(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ss(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Pr()}}convertObject(t,e){const n={};return zr(t.fields||{},((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new hd(rs(t.latitude),rs(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=os(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(as(t));default:return null}}convertTimestamp(t){const e=ns(t);return new jr(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Yr.fromString(t);Fr(Xo(n));const r=new Dl(n.get(1),n.get(3)),s=new ls(n.popFirst(5));return r.isEqual(e)||Lr(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
     */function of(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class af extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new cd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new $l(this.firestore,null,e)}}
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
     */class cf{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=yd(t)}set(t,e,n){this._verifyNotCommitted();const r=uf(t,this._firestore),s=of(r._converter,e,n),i=wd(this._dataReader,"WriteBatch.set",r._key,s,null!==r._converter,n);return this._mutations.push(i.toMutation(r._key,Ai.none())),this}update(t,e,n,...r){this._verifyNotCommitted();const s=uf(t,this._firestore);let i;return i="string"==typeof(e=l(e))||e instanceof ad?Nd(this._dataReader,"WriteBatch.update",s._key,e,n,r):Sd(this._dataReader,"WriteBatch.update",s._key,e),this._mutations.push(i.toMutation(s._key,Ai.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=uf(t,this._firestore);return this._mutations=this._mutations.concat(new Bi(e._key,Ai.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new xr(Ar.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function uf(t,e){if((t=l(t)).firestore!==e)throw new xr(Ar.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}
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
     */class hf extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new cd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new $l(this.firestore,null,e)}}function lf(t){t=Vl(t,$l);const e=Vl(t.firestore,Jl),n=Zl(e),r=new hf(e);return function(t,e){const n=new Ia;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await function(t,e){const n=Vr(t);return n.persistence.runTransaction("read document","readonly",(t=>n.Fn.mn(t,e)))}(t,e);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new xr(Ar.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(t){const r=ch(t,`Failed to get document '${e} from cache`);n.reject(r)}}(await vl(t),e,n))),n.promise}(n,t._key).then((n=>new Bd(e,r,t._key,n,new Ud(null!==n&&n.hasLocalMutations,!0),t._converter)))}function df(t){t=Vl(t,Kl);const e=Vl(t.firestore,Jl),n=Zl(e),r=new hf(e);return function(t,e){const n=new Ia;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await Hc(t,e,!0),s=new Nh(e,r.Bn),i=s._o(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(t){const r=ch(t,`Failed to execute query '${e} against cache`);n.reject(r)}}(await vl(t),e,n))),n.promise}(n,t._query).then((n=>new Kd(e,r,t,n)))}function ff(t,e,n,...r){t=Vl(t,$l);const s=Vl(t.firestore,Jl),i=yd(s);let o;return o="string"==typeof(e=l(e))||e instanceof ad?Nd(i,"updateDoc",t._key,e,n,r):Sd(i,"updateDoc",t._key,e),pf(s,[o.toMutation(t._key,Ai.exists(!0))])}function mf(t,...e){var n,r,s;t=l(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||Yl(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Yl(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof $l)u=Vl(t.firestore,Jl),h=Ys(t._key.path),c={next:n=>{e[o]&&e[o](yf(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Vl(t,Kl);u=Vl(n.firestore,Jl),h=n._query;const r=new hf(u);c={next:t=>{e[o]&&e[o](new Kd(u,r,n,t))},error:e[o+1],complete:e[o+2]},Qd(t._query)}return function(t,e,n,r){const s=new ul(r),i=new vh(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>mh(await El(t),i))),()=>{s.Wo(),t.asyncQueue.enqueueAndForget((async()=>gh(await El(t),i)))}}(Zl(u),h,a,c)}function gf(t,e){return function(t,e){const n=new ul(e);return t.asyncQueue.enqueueAndForget((async()=>function(t,e){Vr(t).Gr.add(e),e.next()}(await El(t),n))),()=>{n.Wo(),t.asyncQueue.enqueueAndForget((async()=>function(t,e){Vr(t).Gr.delete(e)}(await El(t),n)))}}(Zl(t=Vl(t,Jl)),Yl(e)?e:{next:e})}function pf(t,e){return function(t,e){const n=new Ia;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=rl(t);try{const t=await function(t,e){const n=Vr(t),r=jr.now(),s=e.reduce(((t,e)=>t.add(e.key)),oo());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Fn.pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=Li(t,i.get(t.key));null!=e&&o.push(new Fi(t.key,e,Ns(e.toProto().mapValue),Ai.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(i),{batchId:t.batchId,changes:i})))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new Hi(Br)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(r,t.batchId,n),await Gh(r,t.changes),await Wu(r.remoteStore)}catch(t){const e=ch(t,"Failed to persist write");n.reject(e)}}(await Il(t),e,n))),n.promise}(Zl(t),e)}function yf(t,e,n){const r=n.docs.get(e._key),s=new hf(t);return new Bd(t,s,e._key,r,new Ud(n.hasPendingWrites,n.fromCache),e._converter)}
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
     */class wf extends class{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=yd(t)}get(t){const e=uf(t,this._firestore),n=new af(this._firestore);return this._transaction.lookup([e._key]).then((t=>{if(!t||1!==t.length)return Pr();const r=t[0];if(r.isFoundDocument())return new Fd(this._firestore,n,r.key,r,e._converter);if(r.isNoDocument())return new Fd(this._firestore,n,e._key,null,e._converter);throw Pr()}))}set(t,e,n){const r=uf(t,this._firestore),s=of(r._converter,e,n),i=wd(this._dataReader,"Transaction.set",r._key,s,null!==r._converter,n);return this._transaction.set(r._key,i),this}update(t,e,n,...r){const s=uf(t,this._firestore);let i;return i="string"==typeof(e=l(e))||e instanceof ad?Nd(this._dataReader,"Transaction.update",s._key,e,n,r):Sd(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,i),this}delete(t){const e=uf(t,this._firestore);return this._transaction.delete(e._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=uf(t,this._firestore),n=new hf(this._firestore);return super.get(t).then((t=>new Bd(this._firestore,n,e._key,t._document,new Ud(!1,!1),e._converter)))}}function vf(t,e){return function(t,e){const n=new Ia;return t.asyncQueue.enqueueAndForget((async()=>{const r=await function(t){return yl(t).then((t=>t.datastore))}(t);new dl(t.asyncQueue,r,e,n).run()})),n.promise}(Zl(t),(n=>e(new wf(t,n))))}
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
     */e._registerComponent(new m("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new Jl(n,t.getProvider("auth-internal"));return e&&r._setSettings(e),r}),"PUBLIC")),e.registerVersion("@firebase/firestore","0.0.900-exp.894b5da5a",undefined);
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
const bf="(default)";class If{constructor(t,e){this.projectId=t,this.database=e||bf}get isDefaultDatabase(){return this.database===bf}isEqual(t){return t instanceof If&&t.projectId===this.projectId&&t.database===this.database}}
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
const Ef=new v("@firebase/firestore");function _f(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
     */function Tf(t="Unexpected state"){const e="FIRESTORE (8.4.1) INTERNAL ASSERTION FAILED: "+t;throw function(t,...e){if(Ef.logLevel<=f.ERROR){const n=e.map(_f);Ef.error(`Firestore (8.4.1): ${t}`,...n)}}(e),new Error(e)}
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
     */const Sf="invalid-argument",Nf="failed-precondition",Df="unimplemented";class Af extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const xf="__name__";class Cf{constructor(t,e,n){void 0===e?e=0:e>t.length&&Tf(),void 0===n?n=t.length-e:n>t.length-e&&Tf(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Cf.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Cf?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Rf extends Cf{construct(t,e,n){return new Rf(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Af(Sf,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Rf(e)}static emptyPath(){return new Rf([])}}const kf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Lf extends Cf{construct(t,e,n){return new Lf(t,e,n)}static isValidIdentifier(t){return kf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Lf.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===xf}static keyField(){return new Lf([xf])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Af(Sf,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Af(Sf,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Af(Sf,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Af(Sf,"Unterminated ` in path: "+t);return new Lf(e)}static emptyPath(){return new Lf([])}}
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
     */class Of{constructor(t){this.path=t}static fromPath(t){return new Of(Rf.fromString(t))}static fromName(t){return new Of(Rf.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Rf.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Rf.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Of(new Rf(t.slice()))}}
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
     */function Mf(t,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new Af(Sf,`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}function Pf(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Af(Sf,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Tf()}(t);throw new Af(Sf,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
     */
function Ff(){if("undefined"==typeof Uint8Array)throw new Af(Df,"Uint8Arrays are not available in this environment.")}function Vf(){if("undefined"==typeof atob)throw new Af(Df,"Blobs are unavailable in Firestore in this environment.")}class qf{constructor(t){this._delegate=t}static fromBase64String(t){return Vf(),new qf(cd.fromBase64String(t))}static fromUint8Array(t){return Ff(),new qf(cd.fromUint8Array(t))}toBase64(){return Vf(),this._delegate.toBase64()}toUint8Array(){return Ff(),this._delegate.toUint8Array()}isEqual(t){return this._delegate.isEqual(t._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
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
     */function Uf(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of e)if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t,["next","error","complete"])}class Bf{enableIndexedDbPersistence(t,e){return function(t,e){od(t=Vl(t,Jl));const n=Zl(t),r=t._freezeSettings(),s=new al;return ed(n,s,new il(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}(t._delegate,{forceOwnership:e})}enableMultiTabIndexedDbPersistence(t){return function(t){od(t=Vl(t,Jl));const e=Zl(t),n=t._freezeSettings(),r=new al;return ed(e,r,new ol(r,n.cacheSizeBytes))}(t._delegate)}clearIndexedDbPersistence(t){return function(t){if(t._initialized&&!t._terminated)throw new xr(Ar.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ia;return t._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await async function(t){if(!Ta.gt())return Promise.resolve();const e=t+"main";await Ta.delete(e)}(Mc(t._databaseId,t._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}(t._delegate)}}class $f{constructor(t,e,n){this._delegate=e,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},t instanceof If||(this._appCompat=t)}get _databaseId(){return this._delegate._databaseId}settings(t){t.merge&&delete(t=Object.assign(Object.assign({},this._delegate._getSettings()),t)).merge,this._delegate._setSettings(t)}useEmulator(t,e){!function(t,e,n){const r=(t=Vl(t,Bl))._getSettings();"firestore.googleapis.com"!==r.host&&r.host!==e&&Or("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},r),{host:`${e}:${n}`,ssl:!1}))}(this._delegate,t,e)}enableNetwork(){return rd(this._delegate)}disableNetwork(){return sd(this._delegate)}enablePersistence(t){let e=!1,n=!1;return t&&(e=!!t.synchronizeTabs,n=!!t.experimentalForceOwningTab,function(t,e,n,r){if(!0===e&&!0===r)throw new Af(Sf,`${t} and ${n} cannot be used together.`)}("synchronizeTabs",e,"experimentalForceOwningTab",n)),e?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore"),this._appCompat._removeServiceInstance("firestore-exp")),this._delegate._delete()}waitForPendingWrites(){return nd(this._delegate)}onSnapshotsInSync(t){return gf(this._delegate,t)}get app(){if(!this._appCompat)throw new Af(Nf,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(t){try{return new nm(this,Gl(this._delegate,t))}catch(t){throw Hf(t,"collection()","Firestore.collection()")}}doc(t){try{return new zf(this,Ql(this._delegate,t))}catch(t){throw Hf(t,"doc()","Firestore.doc()")}}collectionGroup(t){try{return new Zf(this,function(t,e){if(t=Vl(t,Bl),Ol("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new xr(Ar.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Kl(t,null,function(t){return new Hs(Yr.emptyPath(),t)}(e))}(this._delegate,t))}catch(t){throw Hf(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(t){return vf(this._delegate,(e=>t(new jf(this,e))))}batch(){return Zl(this._delegate),new Gf(new cf(this._delegate,(t=>pf(this._delegate,t))))}loadBundle(t){throw new Af(Nf,'"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?')}namedQuery(t){throw new Af(Nf,'"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?')}}class Kf extends sf{constructor(t){super(),this.firestore=t}convertBytes(t){return new qf(new cd(t))}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return zf.forKey(e,this.firestore,null)}}class jf{constructor(t,e){this._firestore=t,this._delegate=e,this._userDataWriter=new Kf(t)}get(t){const e=rm(t);return this._delegate.get(e).then((t=>new Xf(this._firestore,new Bd(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,e._converter))))}set(t,e,n){const r=rm(t);return n?(Mf("Transaction.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=rm(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=rm(t);return this._delegate.delete(e),this}}class Gf{constructor(t){this._delegate=t}set(t,e,n){const r=rm(t);return n?(Mf("WriteBatch.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=rm(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=rm(t);return this._delegate.delete(e),this}commit(){return this._delegate.commit()}}class Qf{constructor(t,e,n){this._firestore=t,this._userDataWriter=e,this._delegate=n}fromFirestore(t,e){const n=new $d(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,null);return this._delegate.fromFirestore(new Jf(this._firestore,n),null!=e?e:{})}toFirestore(t,e){return e?this._delegate.toFirestore(t,e):this._delegate.toFirestore(t)}static getInstance(t,e){const n=Qf.INSTANCES;let r=n.get(t);r||(r=new WeakMap,n.set(t,r));let s=r.get(e);return s||(s=new Qf(t,new Kf(t),e),r.set(e,s)),s}}Qf.INSTANCES=new WeakMap;class zf{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new Kf(t)}static forPath(t,e,n){if(t.length%2!=0)throw new Af(Sf,`Invalid document reference. Document references must have an even number of segments, but ${t.canonicalString()} has ${t.length}`);return new zf(e,new $l(e._delegate,n,new Of(t)))}static forKey(t,e,n){return new zf(e,new $l(e._delegate,n,t))}get id(){return this._delegate.id}get parent(){return new nm(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(t){try{return new nm(this.firestore,Gl(this._delegate,t))}catch(t){throw Hf(t,"collection()","DocumentReference.collection()")}}isEqual(t){return(t=l(t))instanceof $l&&zl(this._delegate,t)}set(t,e){e=Mf("DocumentReference.set",e);try{return function(t,e,n){t=Vl(t,$l);const r=Vl(t.firestore,Jl),s=of(t._converter,e,n);return pf(r,[wd(yd(r),"setDoc",t._key,s,null!==t._converter,n).toMutation(t._key,Ai.none())])}(this._delegate,t,e)}catch(t){throw Hf(t,"setDoc()","DocumentReference.set()")}}update(t,e,...n){try{return 1===arguments.length?ff(this._delegate,t):ff(this._delegate,t,e,...n)}catch(t){throw Hf(t,"updateDoc()","DocumentReference.update()")}}delete(){return function(t){return pf(Vl(t.firestore,Jl),[new Bi(t._key,Ai.none())])}(this._delegate)}onSnapshot(...t){const e=Wf(t),n=Yf(t,(t=>new Xf(this.firestore,new Bd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate._converter))));return mf(this._delegate,e,n)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?lf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Vl(t,$l);const e=Vl(t.firestore,Jl);return _l(Zl(e),t._key,{source:"server"}).then((n=>yf(e,t,n)))}(this._delegate):function(t){t=Vl(t,$l);const e=Vl(t.firestore,Jl);return _l(Zl(e),t._key).then((n=>yf(e,t,n)))}(this._delegate),e.then((t=>new Xf(this.firestore,new Bd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate._converter))))}withConverter(t){return new zf(this.firestore,t?this._delegate.withConverter(Qf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function Hf(t,e,n){return t.message=t.message.replace(e,n),t}function Wf(t){for(const e of t)if("object"==typeof e&&!Uf(e))return e;return{}}function Yf(t,e){var n,r;let s;return s=Uf(t[0])?t[0]:Uf(t[1])?t[1]:"function"==typeof t[0]?{next:t[0],error:t[1],complete:t[2]}:{next:t[1],error:t[2],complete:t[3]},{next:t=>{s.next&&s.next(e(t))},error:null===(n=s.error)||void 0===n?void 0:n.bind(s),complete:null===(r=s.complete)||void 0===r?void 0:r.bind(s)}}class Xf{constructor(t,e){this._firestore=t,this._delegate=e}get ref(){return new zf(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(t){return this._delegate.data(t)}get(t,e){return this._delegate.get(t,e)}isEqual(t){return Gd(this._delegate,t._delegate)}}class Jf extends Xf{data(t){return this._delegate.data(t)}}class Zf{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new Kf(t)}where(t,e,n){try{return new Zf(this.firestore,Hd(this._delegate,function(t,e,n){const r=e,s=qd("where",t);return new Wd(s,r,n)}(t,e,n)))}catch(t){throw Hf(t,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(t,e){try{return new Zf(this.firestore,Hd(this._delegate,function(t,e="asc"){const n=e,r=qd("orderBy",t);return new Yd(r,n)}(t,e)))}catch(t){throw Hf(t,/(orderBy|where)\(\)/,"Query.$1()")}}limit(t){try{return new Zf(this.firestore,Hd(this._delegate,function(t){return ql("limit",t),new Xd("limit",t,"F")}(t)))}catch(t){throw Hf(t,"limit()","Query.limit()")}}limitToLast(t){try{return new Zf(this.firestore,Hd(this._delegate,function(t){return ql("limitToLast",t),new Xd("limitToLast",t,"L")}(t)))}catch(t){throw Hf(t,"limitToLast()","Query.limitToLast()")}}startAt(...t){try{return new Zf(this.firestore,Hd(this._delegate,function(...t){return new Jd("startAt",t,!0)}(...t)))}catch(t){throw Hf(t,"startAt()","Query.startAt()")}}startAfter(...t){try{return new Zf(this.firestore,Hd(this._delegate,function(...t){return new Jd("startAfter",t,!1)}(...t)))}catch(t){throw Hf(t,"startAfter()","Query.startAfter()")}}endBefore(...t){try{return new Zf(this.firestore,Hd(this._delegate,function(...t){return new Zd("endBefore",t,!0)}(...t)))}catch(t){throw Hf(t,"endBefore()","Query.endBefore()")}}endAt(...t){try{return new Zf(this.firestore,Hd(this._delegate,function(...t){return new Zd("endAt",t,!1)}(...t)))}catch(t){throw Hf(t,"endAt()","Query.endAt()")}}isEqual(t){return Hl(this._delegate,t._delegate)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?df(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Vl(t,Kl);const e=Vl(t.firestore,Jl),n=Zl(e),r=new hf(e);return Tl(n,t._query,{source:"server"}).then((n=>new Kd(e,r,t,n)))}(this._delegate):function(t){t=Vl(t,Kl);const e=Vl(t.firestore,Jl),n=Zl(e),r=new hf(e);return Qd(t._query),Tl(n,t._query).then((n=>new Kd(e,r,t,n)))}(this._delegate),e.then((t=>new em(this.firestore,new Kd(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))))}onSnapshot(...t){const e=Wf(t),n=Yf(t,(t=>new em(this.firestore,new Kd(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))));return mf(this._delegate,e,n)}withConverter(t){return new Zf(this.firestore,t?this._delegate.withConverter(Qf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}class tm{constructor(t,e){this._firestore=t,this._delegate=e}get type(){return this._delegate.type}get doc(){return new Jf(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class em{constructor(t,e){this._firestore=t,this._delegate=e}get query(){return new Zf(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map((t=>new Jf(this._firestore,t)))}docChanges(t){return this._delegate.docChanges(t).map((t=>new tm(this._firestore,t)))}forEach(t,e){this._delegate.forEach((n=>{t.call(e,new Jf(this._firestore,n))}))}isEqual(t){return Gd(this._delegate,t._delegate)}}class nm extends Zf{constructor(t,e){super(t,e),this.firestore=t,this._delegate=e}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const t=this._delegate.parent;return t?new zf(this.firestore,t):null}doc(t){try{return new zf(this.firestore,void 0===t?Ql(this._delegate):Ql(this._delegate,t))}catch(t){throw Hf(t,"doc()","CollectionReference.doc()")}}add(t){return function(t,e){const n=Vl(t.firestore,Jl),r=Ql(t),s=of(t._converter,e);return pf(n,[wd(yd(t.firestore),"addDoc",r._key,s,null!==t._converter,{}).toMutation(r._key,Ai.exists(!1))]).then((()=>r))}(this._delegate,t).then((t=>new zf(this.firestore,t)))}isEqual(t){return zl(this._delegate,t._delegate)}withConverter(t){return new nm(this.firestore,t?this._delegate.withConverter(Qf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function rm(t){return Pf(t,$l)}
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
     */function sm(t){return function(t,e){const n=Zl(t=Vl(t,Jl)),r=new Xl;return Sl(n,t._databaseId,e,r),r}(this._delegate,t)}function im(t){return id(this._delegate,t).then((t=>t?new Zf(this,t):null))}
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
class om{constructor(...t){this._delegate=new ad(...t)}static documentId(){return new om(Lf.keyField().canonicalString())}isEqual(t){return(t=l(t))instanceof ad&&this._delegate._internalPath.isEqual(t._internalPath)}}
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
     */class am{constructor(t){this._delegate=t}static serverTimestamp(){const t=new Id("serverTimestamp");return t._methodName="FieldValue.serverTimestamp",new am(t)}static delete(){const t=new vd("deleteField");return t._methodName="FieldValue.delete",new am(t)}static arrayUnion(...t){const e=function(...t){return new Ed("arrayUnion",t)}(...t);return e._methodName="FieldValue.arrayUnion",new am(e)}static arrayRemove(...t){const e=function(...t){return new _d("arrayRemove",t)}(...t);return e._methodName="FieldValue.arrayRemove",new am(e)}static increment(t){const e=function(t){return new Td("increment",t)}(t);return e._methodName="FieldValue.increment",new am(e)}isEqual(t){return this._delegate.isEqual(t._delegate)}}
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
     */const cm={Firestore:$f,GeoPoint:hd,Timestamp:jr,Blob:qf,Transaction:jf,WriteBatch:Gf,DocumentReference:zf,DocumentSnapshot:Xf,Query:Zf,QueryDocumentSnapshot:Jf,QuerySnapshot:em,CollectionReference:nm,FieldPath:om,FieldValue:am,setLogLevel:function(t){var e;e=t,Ef.setLogLevel(e)},CACHE_SIZE_UNLIMITED:-1};
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
var um;(function(t,e){t.INTERNAL.registerComponent(new m("firestore-compat",(t=>{const n=t.getProvider("app-compat").getImmediate(),r=t.getProvider("firestore-exp").getImmediate();return e(n,r)}),"PUBLIC").setServiceProps(Object.assign({},cm)))})(um=r.default,((t,e)=>new $f(t,e,new Bf))),um.registerVersion("@firebase/firestore-compat","0.0.900-exp.894b5da5a"),function(t){t.prototype.loadBundle=sm,t.prototype.namedQuery=im}($f)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-firestore-compat.js.map
