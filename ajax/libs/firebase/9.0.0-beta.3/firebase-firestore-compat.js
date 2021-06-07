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
    ***************************************************************************** */var i=function(){return(i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var s in e=arguments[n])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)};function o(t,e){for(var n=0,r=e.length,s=t.length;n<r;n++,s++)t[s]=e[n];return t}
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
     */var a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],s=0;s<t.length;s+=3){var i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,h=i>>2,l=(3&i)<<4|a>>4,d=(15&a)<<2|u>>6,f=63&u;c||(f=64,o||(d=64)),r.push(n[h],n[l],n[d],n[f])}return r.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(function(t){for(var e=[],n=0,r=0;r<t.length;r++){var s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=63&s|128):55296==(64512&s)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&t.charCodeAt(++r)),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=63&s|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=63&s|128)}return e}(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){for(var e=[],n=0,r=0;n<t.length;){var s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){var i=t[n++];e[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){var o=((7&s)<<18|(63&(i=t[n++]))<<12|(63&(a=t[n++]))<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(1023&o))}else{i=t[n++];var a=t[n++];e[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],s=0;s<t.length;){var i=n[t.charAt(s++)],o=s<t.length?n[t.charAt(s)]:0,a=++s<t.length?n[t.charAt(s)]:64,c=++s<t.length?n[t.charAt(s)]:64;if(++s,null==i||null==o||null==a||null==c)throw Error();var u=i<<2|o>>4;if(r.push(u),64!==a){var h=o<<4&240|a>>2;if(r.push(h),64!==c){var l=a<<6&192|c;r.push(l)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};
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
function c(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}
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
var u=function(t){function e(n,r,s){var i=t.call(this,r)||this;return i.code=n,i.customData=s,i.name="FirebaseError",Object.setPrototypeOf(i,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,h.prototype.create),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),h=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},s=this.service+"/"+t,i=this.errors[t],o=i?l(i,r):"Error",a=this.serviceName+": "+o+" ("+s+").",c=new u(s,a,r);return c},t}();function l(t,e){return t.replace(d,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var d=/\{\$([^}]+)}/g;
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
     */function f(t){return t&&t._delegate?t._delegate:t}var m,g,p=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}();
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
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(g||(g={}));var y={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},w=g.INFO,v=((m={})[g.DEBUG]="log",m[g.VERBOSE]="log",m[g.INFO]="info",m[g.WARN]="warn",m[g.ERROR]="error",m),b=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),i=v[e];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[i].apply(console,o(["["+s+"]  "+t.name+":"],n))}},E=function(){function t(t){this.name=t,this._logLevel=w,this._logHandler=b,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in g))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?y[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.DEBUG],t)),this._logHandler.apply(this,o([this,g.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.VERBOSE],t)),this._logHandler.apply(this,o([this,g.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.INFO],t)),this._logHandler.apply(this,o([this,g.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.WARN],t)),this._logHandler.apply(this,o([this,g.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.ERROR],t)),this._logHandler.apply(this,o([this,g.ERROR],t))},t}(),T=function(t,e){return(T=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function I(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var _,S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A=A||{},N=S||self;function D(){}function x(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function C(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var k="closure_uid_"+(1e9*Math.random()>>>0),R=0;function L(t,e,n){return t.call.apply(t.bind,arguments)}function O(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function M(t,e,n){return(M=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?L:O).apply(null,arguments)}function P(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function F(){return Date.now()}function V(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Pb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function U(){this.j=this.j,this.i=this.i}U.prototype.j=!1,U.prototype.ka=function(){if(!this.j&&(this.j=!0,this.H(),0))(function(t){Object.prototype.hasOwnProperty.call(t,k)&&t[k]||(t[k]=++R)})(this)},U.prototype.H=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var q=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},B=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function $(t){return Array.prototype.concat.apply([],arguments)}function K(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function j(t){return/^[\s\xa0]*$/.test(t)}var G,Q=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function z(t,e){return-1!=t.indexOf(e)}function H(t,e){return t<e?-1:t>e?1:0}t:{var W=N.navigator;if(W){var Y=W.userAgent;if(Y){G=Y;break t}}G=""}function X(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function J(t){var e={};for(var n in t)e[n]=t[n];return e}var Z="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function tt(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<Z.length;i++)n=Z[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function et(t){return et[" "](t),t}et[" "]=D;var nt,rt,st=z(G,"Opera"),it=z(G,"Trident")||z(G,"MSIE"),ot=z(G,"Edge"),at=ot||it,ct=z(G,"Gecko")&&!(z(G.toLowerCase(),"webkit")&&!z(G,"Edge"))&&!(z(G,"Trident")||z(G,"MSIE"))&&!z(G,"Edge"),ut=z(G.toLowerCase(),"webkit")&&!z(G,"Edge");function ht(){var t=N.document;return t?t.documentMode:void 0}t:{var lt="",dt=(rt=G,ct?/rv:([^\);]+)(\)|;)/.exec(rt):ot?/Edge\/([\d\.]+)/.exec(rt):it?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(rt):ut?/WebKit\/(\S+)/.exec(rt):st?/(?:Version)[ \/]?(\S+)/.exec(rt):void 0);if(dt&&(lt=dt?dt[1]:""),it){var ft=ht();if(null!=ft&&ft>parseFloat(lt)){nt=String(ft);break t}}nt=lt}var mt,gt={};function pt(t){return function(t,e){var n=gt;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=Q(String(nt)).split("."),r=Q(String(t)).split("."),s=Math.max(n.length,r.length),i=0;0==e&&i<s;i++){var o=n[i]||"",a=r[i]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=H(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||H(0==o[2].length,0==a[2].length)||H(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(N.document&&it){var yt=ht();mt=yt||(parseInt(nt,10)||void 0)}else mt=void 0;var wt=mt,vt=!it||9<=Number(wt),bt=it&&!pt("9"),Et=function(){if(!N.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{N.addEventListener("test",D,e),N.removeEventListener("test",D,e)}catch(t){}return t}();function Tt(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function It(t,e){if(Tt.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(ct){t:{try{et(e.nodeName);var s=!0;break t}catch(t){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:_t[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}Tt.prototype.b=function(){this.defaultPrevented=!0},V(It,Tt);var _t={2:"touch",3:"pen",4:"mouse"};It.prototype.b=function(){It.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,bt)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(t){}};var St="closure_listenable_"+(1e6*Math.random()|0),At=0;function Nt(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.da=s,this.key=++At,this.Y=this.Z=!1}function Dt(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.da=null}function xt(t){this.src=t,this.a={},this.b=0}function Ct(t,e){var n=e.type;if(n in t.a){var r,s=t.a[n],i=q(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Dt(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function kt(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.Y&&i.listener==e&&i.capture==!!n&&i.da==r)return s}return-1}xt.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.a[i])||(t=this.a[i]=[],this.b++);var o=kt(t,e,r,s);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new Nt(e,this.src,i,!!r,s)).Z=n,t.push(e)),e};var Rt="closure_lm_"+(1e6*Math.random()|0),Lt={};function Ot(t,e,n,r,s){if(r&&r.once)return Pt(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ot(t,e[i],n,r,s);return null}return n=jt(n),t&&t[St]?t.wa(e,n,C(r)?!!r.capture:!!r,s):Mt(t,e,n,!1,r,s)}function Mt(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=C(s)?!!s.capture:!!s;if(o&&!vt)return null;var a=$t(t);if(a||(t[Rt]=a=new xt(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){var t=Bt,e=vt?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Et||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Ut(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Pt(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Pt(t,e[i],n,r,s);return null}return n=jt(n),t&&t[St]?t.xa(e,n,C(r)?!!r.capture:!!r,s):Mt(t,e,n,!0,r,s)}function Ft(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Ft(t,e[i],n,r,s);else r=C(r)?!!r.capture:!!r,n=jt(n),t&&t[St]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=kt(i=t.a[e],n,r,s))&&(Dt(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.a[e],t.b--)))):t&&(t=$t(t))&&(e=t.a[e.toString()],t=-1,e&&(t=kt(e,n,r,s)),(n=-1<t?e[t]:null)&&Vt(n))}function Vt(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[St])Ct(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ut(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=$t(e))?(Ct(n,t),0==n.b&&(n.src=null,e[Rt]=null)):Dt(t)}}}function Ut(t){return t in Lt?Lt[t]:Lt[t]="on"+t}function qt(t,e){var n=t.listener,r=t.da||t.src;return t.Z&&Vt(t),n.call(r,e)}function Bt(t,e){if(t.Y)return!0;if(!vt){if(!e)t:{e=["window","event"];for(var n=N,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return qt(t,e=new It(e,this))}return qt(t,new It(e,this))}function $t(t){return(t=t[Rt])instanceof xt?t:null}var Kt="__closure_events_fn_"+(1e9*Math.random()>>>0);function jt(t){return"function"==typeof t?t:(t[Kt]||(t[Kt]=function(e){return t.handleEvent(e)}),t[Kt])}function Gt(){U.call(this),this.c=new xt(this),this.J=this,this.D=null}function Qt(t,e){var n,r=t.D;if(r)for(n=[];r;r=r.D)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new Tt(e,t);else if(e instanceof Tt)e.target=e.target||t;else{var s=e;tt(e=new Tt(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.a=n[i];s=zt(o,r,!0,e)&&s}if(s=zt(o=e.a=t,r,!0,e)&&s,s=zt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=zt(o=e.a=n[i],r,!1,e)&&s}function zt(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.da||o.src;o.Z&&Ct(t.c,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}V(Gt,U),Gt.prototype[St]=!0,(_=Gt.prototype).addEventListener=function(t,e,n,r){Ot(this,t,e,n,r)},_.removeEventListener=function(t,e,n,r){Ft(this,t,e,n,r)},_.H=function(){if(Gt.X.H.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)Dt(n[r]);delete e.a[t],e.b--}}this.D=null},_.wa=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},_.xa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var Ht=N.JSON.stringify;function Wt(){this.b=this.a=null}var Yt,Xt=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new Zt}),(function(t){t.reset()}));function Jt(){var t=re,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function Zt(){this.next=this.b=this.a=null}function te(t){N.setTimeout((function(){throw t}),0)}function ee(t,e){Yt||function(){var t=N.Promise.resolve(void 0);Yt=function(){t.then(se)}}(),ne||(Yt(),ne=!0),re.add(t,e)}Wt.prototype.add=function(t,e){var n=Xt.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},Zt.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},Zt.prototype.reset=function(){this.next=this.b=this.a=null};var ne=!1,re=new Wt;function se(){for(var t;t=Jt();){try{t.a.call(t.b)}catch(t){te(t)}var e=Xt;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}ne=!1}function ie(t,e){Gt.call(this),this.b=t||1,this.a=e||N,this.f=M(this.eb,this),this.g=F()}function oe(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function ae(t,e,n){if("function"==typeof t)n&&(t=M(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=M(t.handleEvent,t)}return 2147483647<Number(e)?-1:N.setTimeout(t,e||0)}function ce(t){t.a=ae((function(){t.a=null,t.c&&(t.c=!1,ce(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}V(ie,Gt),(_=ie.prototype).aa=!1,_.M=null,_.eb=function(){if(this.aa){var t=F()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),Qt(this,"tick"),this.aa&&(oe(this),this.start()))}},_.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=F())},_.H=function(){ie.X.H.call(this),oe(this),delete this.a};var ue=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}T(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:ce(this)},e.prototype.H=function(){t.prototype.H.call(this),this.a&&(N.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(U);function he(t){U.call(this),this.b=t,this.a={}}V(he,U);var le=[];function de(t,e,n,r){Array.isArray(n)||(n&&(le[0]=n.toString()),n=le);for(var s=0;s<n.length;s++){var i=Ot(e,n[s],r||t.handleEvent,!1,t.b||t);if(!i)break;t.a[i.key]=i}}function fe(t){X(t.a,(function(t,e){this.a.hasOwnProperty(e)&&Vt(t)}),t),t.a={}}function me(){this.a=!0}function ge(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return Ht(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}he.prototype.H=function(){he.X.H.call(this),fe(this)},he.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},me.prototype.info=function(){};var pe={},ye=null;function we(){return ye=ye||new Gt}function ve(t){Tt.call(this,pe.Ga,t)}function be(t){var e=we();Qt(e,new ve(e,t))}function Ee(t,e){Tt.call(this,pe.STAT_EVENT,t),this.stat=e}function Te(t){var e=we();Qt(e,new Ee(e,t))}function Ie(t){Tt.call(this,pe.Ha,t)}function _e(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return N.setTimeout((function(){t()}),e)}pe.Ga="serverreachability",V(ve,Tt),pe.STAT_EVENT="statevent",V(Ee,Tt),pe.Ha="timingevent",V(Ie,Tt);var Se={NO_ERROR:0,fb:1,sb:2,rb:3,mb:4,qb:5,tb:6,Ea:7,TIMEOUT:8,wb:9},Ae={kb:"complete",Gb:"success",Fa:"error",Ea:"abort",yb:"ready",zb:"readystatechange",TIMEOUT:"timeout",ub:"incrementaldata",xb:"progress",nb:"downloadprogress",Ob:"uploadprogress"};function Ne(){}function De(t){return t.b||(t.b=t.c())}function xe(){}Ne.prototype.b=null;var Ce,ke={OPEN:"a",jb:"b",Fa:"c",vb:"d"};function Re(){Tt.call(this,"d")}function Le(){Tt.call(this,"c")}function Oe(){}function Me(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new he(this),this.P=Pe,t=at?125:void 0,this.R=new ie(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.G=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}V(Re,Tt),V(Le,Tt),V(Oe,Ne),Oe.prototype.a=function(){return new XMLHttpRequest},Oe.prototype.c=function(){return{}},Ce=new Oe;var Pe=45e3,Fe={},Ve={};function Ue(t,e,n){t.G=1,t.i=cn(en(e)),t.j=n,t.I=!0,qe(t,null)}function qe(t,e){t.u=F(),Ke(t),t.l=en(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),En(n.b,"t",r),t.D=0,t.a=gr(t.g,t.g.C?e:null),0<t.O&&(t.F=new ue(M(t.Da,t,t.a),t.O)),de(t.J,t.a,"readystatechange",t.bb),e=t.B?J(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),be(1),function(t,e,n,r,s,i){t.info((function(){if(t.a)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function Be(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var s=$e(t,n);if(s==Ve){4==e&&(t.h=4,Te(14),r=!1),ge(t.c,t.f,null,"[Incomplete Response]");break}if(s==Fe){t.h=4,Te(15),ge(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}ge(t.c,t.f,s,null),He(t,s)}4==e&&0==n.length&&(t.h=1,Te(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),ar(e),e.F=!0,Te(11))):(ge(t.c,t.f,n,"[Invalid Chunked Response]"),ze(t),Qe(t))}function $e(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Ve:(n=Number(e.substring(n,r)),isNaN(n)?Fe:(r+=1)+n>e.length?Ve:(e=e.substr(r,n),t.D=r+n,e))}function Ke(t){t.T=F()+t.P,je(t,t.P)}function je(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=_e(M(t.$a,t),e)}function Ge(t){t.o&&(N.clearTimeout(t.o),t.o=null)}function Qe(t){0==t.g.v||t.A||hr(t.g,t)}function ze(t){Ge(t);var e=t.F;e&&"function"==typeof e.ka&&e.ka(),t.F=null,oe(t.R),fe(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ka())}function He(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||Dn(n.b,t)))if(n.I=t.N,!t.C&&Dn(n.b,t)&&3==n.v){try{var r=n.la.a.parse(e)}catch(t){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;ur(n),Jn(n)}or(n),Te(18)}}else n.pa=s[1],0<n.pa-n.P&&37500>s[2]&&n.G&&0==n.o&&!n.m&&(n.m=_e(M(n.Xa,n),6e3));if(1>=Nn(n.b)&&n.fa){try{n.fa()}catch(t){}n.fa=void 0}}else dr(n,11)}else if((t.C||n.a==t)&&ur(n),!j(e))for(e=r=n.la.a.parse(e),r=0;r<e.length;r++)if(s=e[r],n.P=s[0],s=s[1],2==n.v)if("c"==s[0]){n.J=s[1],n.ha=s[2];var i=s[3];null!=i&&(n.ia=i,n.c.info("VER="+n.ia));var o=s[4];null!=o&&(n.qa=o,n.c.info("SVER="+n.qa));var a=s[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(z(h,"spdy")||z(h,"quic")||z(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(xn(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.oa=d,an(c.B,c.A,d))}}n.v=3,n.f&&n.f.ua(),n.U&&(n.N=F()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).ma=mr(c,c.C?c.ha:null,c.ga),f.C){Cn(c.b,f);var m=f,g=c.D;g&&m.setTimeout(g),m.o&&(Ge(m),Ke(m)),c.a=f}else ir(c);0<n.g.length&&er(n)}else"stop"!=s[0]&&"close"!=s[0]||dr(n,7);else 3==n.v&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?dr(n,7):Xn(n):"noop"!=s[0]&&n.f&&n.f.ta(s),n.o=0);be(4)}catch(t){}}function We(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(x(t)||"string"==typeof t)B(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(x(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(x(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function Ye(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof Ye)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function Xe(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];Je(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var s={};for(n=e=0;e<t.a.length;)Je(s,r=t.a[e])||(t.a[n++]=r,s[r]=1),e++;t.a.length=n}}function Je(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(_=Me.prototype).setTimeout=function(t){this.P=t},_.bb=function(t){t=t.target;var e=this.F;e&&3==zn(t)?e.f():this.Da(t)},_.Da=function(t){try{if(t==this.a)t:{var e=zn(this.a),n=this.a.va(),r=this.a.W();if(!(3>e||3==e&&!at&&!this.a.$())){this.A||4!=e||7==n||be(8==n||0>=r?3:2),Ge(this);var s=this.a.W();this.N=s;var i=this.a.$();if(this.b=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,s),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,Te(12),ze(this),Qe(this);break t}ge(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,He(this,c)}this.I?(Be(this,e,i),at&&this.b&&3==e&&(de(this.J,this.R,"tick",this.ab),this.R.start())):(ge(this.c,this.f,i,null),He(this,i)),4==e&&ze(this),this.b&&!this.A&&(4==e?hr(this.g,this):(this.b=!1,Ke(this)))}else 400==s&&0<i.indexOf("Unknown SID")?(this.h=3,Te(12)):(this.h=0,Te(13)),ze(this),Qe(this)}}}catch(t){}},_.ab=function(){if(this.a){var t=zn(this.a),e=this.a.$();this.D<e.length&&(Ge(this),Be(this,t,e),this.b&&4!=t&&Ke(this))}},_.cancel=function(){this.A=!0,ze(this)},_.$a=function(){this.o=null;var t=F();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.G&&(be(3),Te(17)),ze(this),this.h=2,Qe(this)):je(this,this.T-t)},(_=Ye.prototype).K=function(){Xe(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},_.L=function(){return Xe(this),this.a.concat()},_.get=function(t,e){return Je(this.b,t)?this.b[t]:e},_.set=function(t,e){Je(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},_.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Ze=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function tn(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof tn){this.a=void 0!==e?e:t.a,nn(this,t.f),this.j=t.j,rn(this,t.c),sn(this,t.h),this.g=t.g,e=t.b;var n=new yn;n.c=e.c,e.a&&(n.a=new Ye(e.a),n.b=e.b),on(this,n),this.i=t.i}else t&&(n=String(t).match(Ze))?(this.a=!!e,nn(this,n[1]||"",!0),this.j=un(n[2]||""),rn(this,n[3]||"",!0),sn(this,n[4]),this.g=un(n[5]||"",!0),on(this,n[6]||"",!0),this.i=un(n[7]||"")):(this.a=!!e,this.b=new yn(null,this.a))}function en(t){return new tn(t)}function nn(t,e,n){t.f=n?un(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function rn(t,e,n){t.c=n?un(e,!0):e}function sn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function on(t,e,n){e instanceof yn?(t.b=e,function(t,e){e&&!t.f&&(wn(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(vn(this,e),En(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=hn(e,gn)),t.b=new yn(e,t.a))}function an(t,e,n){t.b.set(e,n)}function cn(t){return an(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^F()).toString(36)),t}function un(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function hn(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,ln),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function ln(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}tn.prototype.toString=function(){var t=[],e=this.f;e&&t.push(hn(e,dn,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(hn(e,dn,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(hn(n,"/"==n.charAt(0)?mn:fn,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",hn(n,pn)),t.join("")};var dn=/[#\/\?@]/g,fn=/[#\?:]/g,mn=/[#\?]/g,gn=/[#\?@]/g,pn=/#/g;function yn(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function wn(t){t.a||(t.a=new Ye,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function vn(t,e){wn(t),e=Tn(t,e),Je(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,Je((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&Xe(t)))}function bn(t,e){return wn(t),e=Tn(t,e),Je(t.a.b,e)}function En(t,e,n){vn(t,e),0<n.length&&(t.c=null,t.a.set(Tn(t,e),K(n)),t.b+=n.length)}function Tn(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(_=yn.prototype).add=function(t,e){wn(this),this.c=null,t=Tn(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},_.forEach=function(t,e){wn(this),this.a.forEach((function(n,r){B(n,(function(n){t.call(e,n,r,this)}),this)}),this)},_.L=function(){wn(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},_.K=function(t){wn(this);var e=[];if("string"==typeof t)bn(this,t)&&(e=$(e,this.a.get(Tn(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=$(e,t[n])}return e},_.set=function(t,e){return wn(this),this.c=null,bn(this,t=Tn(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},_.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},_.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.K(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.c=t.join("&")};var In=function(t,e){this.b=t,this.a=e};function _n(t){this.g=t||Sn,N.PerformanceNavigationTiming?t=0<(t=N.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(N.ja&&N.ja.za&&N.ja.za()&&N.ja.za().Qb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var Sn=10;function An(t){return!!t.b||!!t.a&&t.a.size>=t.f}function Nn(t){return t.b?1:t.a?t.a.size:0}function Dn(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function xn(t,e){t.a?t.a.add(e):t.b=e}function Cn(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function kn(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var s=I(t.a.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.s)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return K(t.c)}function Rn(){}function Ln(){this.a=new Rn}function On(t,e,n){var r=n||"";try{We(t,(function(t,n){var s=t;C(t)&&(s=Ht(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function Mn(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(t){}}_n.prototype.cancel=function(){var t,e;if(this.c=kn(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=I(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},Rn.prototype.stringify=function(t){return N.JSON.stringify(t,void 0)},Rn.prototype.parse=function(t){return N.JSON.parse(t,void 0)};var Pn=N.JSON.parse;function Fn(t){Gt.call(this),this.headers=new Ye,this.l=t||null,this.b=!1,this.u=this.a=null,this.C="",this.h=0,this.f="",this.g=this.B=this.m=this.A=!1,this.s=0,this.o=null,this.I=Vn,this.F=this.G=!1}V(Fn,Gt);var Vn="",Un=/^https?$/i,qn=["POST","PUT"];function Bn(t){return"content-type"==t.toLowerCase()}function $n(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Kn(t),Gn(t)}function Kn(t){t.A||(t.A=!0,Qt(t,"complete"),Qt(t,"error"))}function jn(t){if(t.b&&void 0!==A&&(!t.u[1]||4!=zn(t)||2!=t.W()))if(t.m&&4==zn(t))ae(t.Aa,0,t);else if(Qt(t,"readystatechange"),4==zn(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.C).match(Ze)[1]||null;if(!i&&N.self&&N.self.location){var o=N.self.location.protocol;i=o.substr(0,o.length-1)}s=!Un.test(i?i.toLowerCase():"")}e=s}if(e)Qt(t,"complete"),Qt(t,"success");else{t.h=6;try{var a=2<zn(t)?t.a.statusText:""}catch(n){a=""}t.f=a+" ["+t.W()+"]",Kn(t)}}finally{Gn(t)}}}function Gn(t,e){if(t.a){Qn(t);var n=t.a,r=t.u[0]?D:null;t.a=null,t.u=null,e||Qt(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function Qn(t){t.a&&t.F&&(t.a.ontimeout=null),t.o&&(N.clearTimeout(t.o),t.o=null)}function zn(t){return t.a?t.a.readyState:0}function Hn(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return X(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):an(t,e,n))}function Wn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Yn(t){this.qa=0,this.g=[],this.c=new me,this.ha=this.ma=this.B=this.ga=this.a=this.oa=this.A=this.V=this.i=this.O=this.l=null,this.Pa=this.R=0,this.Ma=Wn("failFast",!1,t),this.G=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.pa=this.P=-1,this.T=this.o=this.u=0,this.Ia=Wn("baseRetryDelayMs",5e3,t),this.Sa=Wn("retryDelaySeedMs",1e4,t),this.Na=Wn("forwardChannelMaxRetries",2,t),this.na=Wn("forwardChannelRequestTimeoutMs",2e4,t),this.Oa=t&&t.xmlHttpFactory||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new _n(t&&t.concurrentRequestLimit),this.la=new Ln,this.ea=t&&t.fastHandshake||!1,this.Ja=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.ea&&this.S&&t&&t.detectBufferingProxy||!1,this.fa=void 0,this.N=0,this.F=!1,this.s=null,(this.La=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function Xn(t){if(Zn(t),3==t.v){var e=t.R++,n=en(t.B);an(n,"SID",t.J),an(n,"RID",e),an(n,"TYPE","terminate"),rr(t,n),(e=new Me(t,t.c,e,void 0)).G=2,e.i=cn(en(n)),n=!1,N.navigator&&N.navigator.sendBeacon&&(n=N.navigator.sendBeacon(e.i.toString(),"")),!n&&N.Image&&((new Image).src=e.i,n=!0),n||(e.a=gr(e.g,null),e.a.ba(e.i)),e.u=F(),Ke(e)}fr(t)}function Jn(t){t.a&&(ar(t),t.a.cancel(),t.a=null)}function Zn(t){Jn(t),t.j&&(N.clearTimeout(t.j),t.j=null),ur(t),t.b.cancel(),t.h&&("number"==typeof t.h&&N.clearTimeout(t.h),t.h=null)}function tr(t,e){t.g.push(new In(t.Pa++,e)),3==t.v&&er(t)}function er(t){An(t.b)||t.h||(t.h=!0,ee(t.Ca,t),t.u=0)}function nr(t,e){var n;n=e?e.f:t.R++;var r=en(t.B);an(r,"SID",t.J),an(r,"RID",n),an(r,"AID",t.P),rr(t,r),t.i&&t.l&&Hn(r,t.i,t.l),n=new Me(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=sr(t,n,1e3),n.setTimeout(Math.round(.5*t.na)+Math.round(.5*t.na*Math.random())),xn(t.b,n),Ue(n,r,e)}function rr(t,e){t.f&&We({},(function(t,n){an(e,n,t)}))}function sr(t,e,n){n=Math.min(t.g.length,n);var r=t.f?M(t.f.Ka,t.f,t):null;t:for(var s=t.g,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].b,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].b,h=s[c].a;if(0>(u-=i))i=Math.max(0,s[c].b-100),a=!1;else try{On(h,o,"req"+u+"_")}catch(t){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function ir(t){t.a||t.j||(t.T=1,ee(t.Ba,t),t.o=0)}function or(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=_e(M(t.Ba,t),lr(t,t.o)),t.o++,!0)}function ar(t){null!=t.s&&(N.clearTimeout(t.s),t.s=null)}function cr(t){t.a=new Me(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=en(t.ma);an(e,"RID","rpc"),an(e,"SID",t.J),an(e,"CI",t.G?"0":"1"),an(e,"AID",t.P),rr(t,e),an(e,"TYPE","xmlhttp"),t.i&&t.l&&Hn(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ha,n.G=1,n.i=cn(en(e)),n.j=null,n.I=!0,qe(n,t)}function ur(t){null!=t.m&&(N.clearTimeout(t.m),t.m=null)}function hr(t,e){var n=null;if(t.a==e){ur(t),ar(t),t.a=null;var r=2}else{if(!Dn(t.b,e))return;n=e.s,Cn(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=F()-e.u;var s=t.u;Qt(r=we(),new Ie(r,n,e,s)),er(t)}else ir(t);else if(3==(s=e.h)||0==s&&0<t.I||!(1==r&&function(t,e){return!(Nn(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.Ma?0:t.Na)||(t.h=_e(M(t.Ca,t,e),lr(t,t.u)),t.u++,0)))}(t,e)||2==r&&or(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),s){case 1:dr(t,5);break;case 4:dr(t,10);break;case 3:dr(t,6);break;default:dr(t,2)}}function lr(t,e){var n=t.Ia+Math.floor(Math.random()*t.Sa);return t.f||(n*=2),n*e}function dr(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=M(t.cb,t);n||(n=new tn("//www.google.com/images/cleardot.gif"),N.location&&"http"==N.location.protocol||nn(n,"https"),cn(n)),function(t,e){var n=new me;if(N.Image){var r=new Image;r.onload=P(Mn,n,r,"TestLoadImage: loaded",!0,e),r.onerror=P(Mn,n,r,"TestLoadImage: error",!1,e),r.onabort=P(Mn,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=P(Mn,n,r,"TestLoadImage: timeout",!1,e),N.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else Te(2);t.v=0,t.f&&t.f.sa(e),fr(t),Zn(t)}function fr(t){t.v=0,t.I=-1,t.f&&(0==kn(t.b).length&&0==t.g.length||(t.b.c.length=0,K(t.g),t.g.length=0),t.f.ra())}function mr(t,e,n){var r=function(t){return t instanceof tn?en(t):new tn(t,void 0)}(n);if(""!=r.c)e&&rn(r,e+"."+r.c),sn(r,r.h);else{var s=N.location;r=function(t,e,n,r){var s=new tn(null,void 0);return t&&nn(s,t),e&&rn(s,e),n&&sn(s,n),r&&(s.g=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.V&&X(t.V,(function(t,e){an(r,e,t)})),e=t.A,n=t.oa,e&&n&&an(r,e,n),an(r,"VER",t.ia),rr(t,r),r}function gr(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new Fn(t.Oa)).G=t.C,e}function pr(){}function yr(){if(it&&!(10<=Number(wt)))throw Error("Environmental error: no available transport.")}function wr(t,e){Gt.call(this),this.a=new Yn(e),this.g=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!j(t)&&(this.a.i=t),this.o=e&&e.supportsCrossDomainXhr||!1,this.m=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!j(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new Er(this)}function vr(t){Re.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function br(){Le.call(this),this.status=1}function Er(t){this.a=t}function Tr(t){this.f=t}function Ir(t){Gt.call(this),this.u=t,this.h=void 0,this.readyState=_r,this.status=0,this.responseType=this.responseText=this.statusText="",this.onreadystatechange=null,this.l=new Headers,this.b=null,this.s="GET",this.o="",this.a=!1,this.m=this.f=this.g=null}(_=Fn.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.C+"; newUri="+t);e=e?e.toUpperCase():"GET",this.C=t,this.f="",this.h=0,this.A=!1,this.b=!0,this.a=this.l?this.l.a():Ce.a(),this.u=this.l?De(this.l):De(Ce),this.a.onreadystatechange=M(this.Aa,this);try{this.B=!0,this.a.open(e,String(t),!0),this.B=!1}catch(t){return void $n(this,t)}t=n||"";var s=new Ye(this.headers);r&&We(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=Bn,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.L()),n=N.FormData&&t instanceof N.FormData,!(0<=q(qn,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.G&&(this.a.withCredentials=this.G);try{Qn(this),0<this.s&&((this.F=function(t){return it&&pt(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.s,this.a.ontimeout=M(this.ya,this)):this.o=ae(this.ya,this.s,this)),this.m=!0,this.a.send(t),this.m=!1}catch(t){$n(this,t)}},_.ya=function(){void 0!==A&&this.a&&(this.f="Timed out after "+this.s+"ms, aborting",this.h=8,Qt(this,"timeout"),this.abort(8))},_.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,Qt(this,"complete"),Qt(this,"abort"),Gn(this))},_.H=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),Gn(this,!0)),Fn.X.H.call(this)},_.Aa=function(){this.j||(this.B||this.m||this.g?jn(this):this.Za())},_.Za=function(){jn(this)},_.W=function(){try{return 2<zn(this)?this.a.status:-1}catch(t){return-1}},_.$=function(){try{return this.a?this.a.responseText:""}catch(t){return""}},_.Qa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Pn(e)}},_.va=function(){return this.h},_.Ra=function(){return"string"==typeof this.f?this.f:String(this.f)},(_=Yn.prototype).ia=8,_.v=1,_.Ca=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new Me(this,this.c,t,void 0),r=this.l;if(this.O&&(r?tt(r=J(r),this.O):r=this.O),null===this.i&&(n.B=r),this.ea)t:{for(var s=e=0;s<this.g.length;s++){var i=this.g[s];if(void 0===(i="__data__"in i.a&&"string"==typeof(i=i.a.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=s;break t}if(4096===e||s===this.g.length-1){e=s+1;break t}}e=1e3}else e=1e3;e=sr(this,n,e),an(s=en(this.B),"RID",t),an(s,"CVER",22),this.A&&an(s,"X-HTTP-Session-Id",this.A),rr(this,s),this.i&&r&&Hn(s,this.i,r),xn(this.b,n),this.Ja&&an(s,"TYPE","init"),this.ea?(an(s,"$req",e),an(s,"SID","null"),n.U=!0,Ue(n,s,null)):Ue(n,s,e),this.v=2}}else 3==this.v&&(t?nr(this,t):0==this.g.length||An(this.b)||nr(this))},_.Ba=function(){if(this.j=null,cr(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=_e(M(this.Ya,this),t)}},_.Ya=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.F=!0,Te(10),Jn(this),cr(this))},_.Xa=function(){null!=this.m&&(this.m=null,Jn(this),or(this),Te(19))},_.cb=function(t){t?(this.c.info("Successfully pinged google.com"),Te(2)):(this.c.info("Failed to ping google.com"),Te(1))},(_=pr.prototype).ua=function(){},_.ta=function(){},_.sa=function(){},_.ra=function(){},_.Ka=function(){},yr.prototype.a=function(t,e){return new wr(t,e)},V(wr,Gt),wr.prototype.h=function(){this.a.f=this.f,this.o&&(this.a.C=!0);var t=this.a,e=this.g,n=this.b||void 0;Te(0),t.ga=e,t.V=n||{},t.G=t.S,t.B=mr(t,null,t.ga),er(t)},wr.prototype.close=function(){Xn(this.a)},wr.prototype.l=function(t){if("string"==typeof t){var e={};e.__data__=t,tr(this.a,e)}else this.m?((e={}).__data__=Ht(t),tr(this.a,e)):tr(this.a,t)},wr.prototype.H=function(){this.a.f=null,delete this.f,Xn(this.a),delete this.a,wr.X.H.call(this)},V(vr,Re),V(br,Le),V(Er,pr),Er.prototype.ua=function(){Qt(this.a,"a")},Er.prototype.ta=function(t){Qt(this.a,new vr(t))},Er.prototype.sa=function(t){Qt(this.a,new br(t))},Er.prototype.ra=function(){Qt(this.a,"b")},V(Tr,Ne),Tr.prototype.a=function(){return new Ir(this.f)},Tr.prototype.c=function(t){return function(){return t}}({}),V(Ir,Gt);var _r=0;function Sr(t){t.f.read().then(t.Ta.bind(t)).catch(t.ca.bind(t))}function Ar(t){t.readyState=4,t.g=null,t.f=null,t.m=null,Nr(t)}function Nr(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(_=Ir.prototype).open=function(t,e){if(this.readyState!=_r)throw this.abort(),Error("Error reopening a connection");this.s=t,this.o=e,this.readyState=1,Nr(this)},_.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.a=!0;var e={headers:this.l,method:this.s,credentials:this.h,cache:void 0};t&&(e.body=t),this.u.fetch(new Request(this.o,e)).then(this.Wa.bind(this),this.ca.bind(this))},_.abort=function(){this.responseText="",this.l=new Headers,this.status=0,this.f&&this.f.cancel("Request was aborted."),1<=this.readyState&&this.a&&4!=this.readyState&&(this.a=!1,Ar(this)),this.readyState=_r},_.Wa=function(t){this.a&&(this.g=t,this.b||(this.status=this.g.status,this.statusText=this.g.statusText,this.b=t.headers,this.readyState=2,Nr(this)),this.a&&(this.readyState=3,Nr(this),this.a&&("arraybuffer"===this.responseType?t.arrayBuffer().then(this.Ua.bind(this),this.ca.bind(this)):void 0!==N.ReadableStream&&"body"in t?(this.responseText="",this.f=t.body.getReader(),this.m=new TextDecoder,Sr(this)):t.text().then(this.Va.bind(this),this.ca.bind(this)))))},_.Ta=function(t){if(this.a){var e=this.m.decode(t.value?t.value:new Uint8Array(0),{stream:!t.done});e&&(this.responseText+=e),t.done?Ar(this):Nr(this),3==this.readyState&&Sr(this)}},_.Va=function(t){this.a&&(this.responseText=t,Ar(this))},_.Ua=function(){this.a&&Ar(this)},_.ca=function(){this.a&&Ar(this)},_.setRequestHeader=function(t,e){this.l.append(t,e)},_.getResponseHeader=function(t){return this.b&&this.b.get(t.toLowerCase())||""},_.getAllResponseHeaders=function(){if(!this.b)return"";for(var t=[],e=this.b.entries(),n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Ir.prototype,"withCredentials",{get:function(){return"include"===this.h},set:function(t){this.h=t?"include":"same-origin"}}),yr.prototype.createWebChannel=yr.prototype.a,wr.prototype.send=wr.prototype.l,wr.prototype.open=wr.prototype.h,wr.prototype.close=wr.prototype.close,Se.NO_ERROR=0,Se.TIMEOUT=8,Se.HTTP_ERROR=6,Ae.COMPLETE="complete",xe.EventType=ke,ke.OPEN="a",ke.CLOSE="b",ke.ERROR="c",ke.MESSAGE="d",Gt.prototype.listen=Gt.prototype.wa,Fn.prototype.listenOnce=Fn.prototype.xa,Fn.prototype.getLastError=Fn.prototype.Ra,Fn.prototype.getLastErrorCode=Fn.prototype.va,Fn.prototype.getStatus=Fn.prototype.W,Fn.prototype.getResponseJson=Fn.prototype.Qa,Fn.prototype.getResponseText=Fn.prototype.$,Fn.prototype.send=Fn.prototype.ba;var Dr=Se,xr=Ae,Cr=pe,kr=10,Rr=11,Lr=Tr,Or=xe,Mr=Fn;
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
let Pr="8.6.5";
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
     */class Fr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Fr.o=-1;
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
const Vr={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Ur extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const qr=new E("@firebase/firestore");function Br(){return qr.logLevel}function $r(t,...e){if(qr.logLevel<=g.DEBUG){const n=e.map(Gr);qr.debug(`Firestore (${Pr}): ${t}`,...n)}}function Kr(t,...e){if(qr.logLevel<=g.ERROR){const n=e.map(Gr);qr.error(`Firestore (${Pr}): ${t}`,...n)}}function jr(t,...e){if(qr.logLevel<=g.WARN){const n=e.map(Gr);qr.warn(`Firestore (${Pr}): ${t}`,...n)}}function Gr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}var e}
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
     */function Qr(t="Unexpected state"){const e=`FIRESTORE (${Pr}) INTERNAL ASSERTION FAILED: `+t;throw Kr(e),new Error(e)}function zr(t,e){t||Qr()}function Hr(t,e){return t}
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
     */function Wr(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
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
     */class Yr{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=Wr(40);for(let s=0;s<r.length;++s)n.length<20&&r[s]<e&&(n+=t.charAt(r[s]%t.length))}return n}}function Xr(t,e){return t<e?-1:t>e?1:0}function Jr(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function Zr(t){return t+"\0"}
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
     */class ts{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Ur(Vr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Ur(Vr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Ur(Vr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Ur(Vr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return ts.fromMillis(Date.now())}static fromDate(t){return ts.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new ts(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Xr(this.nanoseconds,t.nanoseconds):Xr(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
     */class es{constructor(t){this.timestamp=t}static fromTimestamp(t){return new es(t)}static min(){return new es(new ts(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
     */function ns(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function rs(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function ss(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
     */class is{constructor(t,e,n){void 0===e?e=0:e>t.length&&Qr(),void 0===n?n=t.length-e:n>t.length-e&&Qr(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===is.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof is?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class os extends is{construct(t,e,n){return new os(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new os(e)}static emptyPath(){return new os([])}}const as=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class cs extends is{construct(t,e,n){return new cs(t,e,n)}static isValidIdentifier(t){return as.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),cs.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new cs(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Ur(Vr.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Ur(Vr.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Ur(Vr.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new cs(e)}static emptyPath(){return new cs([])}}
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
     */class us{constructor(t){this.fields=t,t.sort(cs.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Jr(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
     */class hs{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new hs(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new hs(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}
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
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Xr(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}hs.EMPTY_BYTE_STRING=new hs("");const ls=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ds(t){if(zr(!!t),"string"==typeof t){let e=0;const n=ls.exec(t);if(zr(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fs(t.seconds),nanos:fs(t.nanos)}}function fs(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function ms(t){return"string"==typeof t?hs.fromBase64String(t):hs.fromUint8Array(t)}
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
     */function gs(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function ps(t){const e=t.mapValue.fields.__previous_value__;return gs(e)?ps(e):e}function ys(t){const e=ds(t.mapValue.fields.__local_write_time__.timestampValue);return new ts(e.seconds,e.nanos)}
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
     */function ws(t){return null==t}function vs(t){return 0===t&&1/t==-1/0}function bs(t){return"number"==typeof t&&Number.isInteger(t)&&!vs(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
     */class Es{constructor(t){this.path=t}static fromPath(t){return new Es(os.fromString(t))}static fromName(t){return new Es(os.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===os.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return os.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Es(new os(t.slice()))}}
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
     */function Ts(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?gs(t)?4:10:Qr()}function Is(t,e){const n=Ts(t);if(n!==Ts(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ys(t).isEqual(ys(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ds(t.timestampValue),r=ds(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return ms(t.bytesValue).isEqual(ms(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return fs(t.geoPointValue.latitude)===fs(e.geoPointValue.latitude)&&fs(t.geoPointValue.longitude)===fs(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return fs(t.integerValue)===fs(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=fs(t.doubleValue),r=fs(e.doubleValue);return n===r?vs(n)===vs(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Jr(t.arrayValue.values||[],e.arrayValue.values||[],Is);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(ns(n)!==ns(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!Is(n[t],r[t])))return!1;return!0}(t,e);default:return Qr()}}function _s(t,e){return void 0!==(t.values||[]).find((t=>Is(t,e)))}function Ss(t,e){const n=Ts(t),r=Ts(e);if(n!==r)return Xr(n,r);switch(n){case 0:return 0;case 1:return Xr(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=fs(t.integerValue||t.doubleValue),r=fs(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return As(t.timestampValue,e.timestampValue);case 4:return As(ys(t),ys(e));case 5:return Xr(t.stringValue,e.stringValue);case 6:return function(t,e){const n=ms(t),r=ms(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=Xr(n[t],r[t]);if(0!==e)return e}return Xr(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Xr(fs(t.latitude),fs(e.latitude));return 0!==n?n:Xr(fs(t.longitude),fs(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=Ss(n[t],r[t]);if(e)return e}return Xr(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let t=0;t<r.length&&t<i.length;++t){const e=Xr(r[t],i[t]);if(0!==e)return e;const o=Ss(n[r[t]],s[i[t]]);if(0!==o)return o}return Xr(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Qr()}}function As(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Xr(t,e);const n=ds(t),r=ds(e),s=Xr(n.seconds,r.seconds);return 0!==s?s:Xr(n.nanos,r.nanos)}function Ns(t){return Ds(t)}function Ds(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ds(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?ms(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Es.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Ds(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${Ds(t.fields[s])}`;return n+"}"}(t.mapValue):Qr();var e,n}function xs(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Cs(t){return!!t&&"integerValue"in t}function ks(t){return!!t&&"arrayValue"in t}function Rs(t){return!!t&&"nullValue"in t}function Ls(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Os(t){return!!t&&"mapValue"in t}function Ms(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue)return{timestampValue:Object.assign({},ds(t.timestampValue))};if(t.mapValue){const e={mapValue:{fields:{}}};return rs(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Ms(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ms(t.arrayValue.values[n]);return e}return Object.assign({},t)}
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
     */class Ps{constructor(t){this.value=t}static empty(){return new Ps({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Os(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ms(e)}setAll(t){let e=cs.emptyPath(),n={},r=[];t.forEach(((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=Ms(t):r.push(s.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());Os(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Is(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Os(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){rs(e,((e,n)=>t[e]=n));for(const e of n)delete t[e]}clone(){return new Ps(Ms(this.value))}}function Fs(t){const e=[];return rs(t.fields,((t,n)=>{const r=new cs([t]);if(Os(n)){const t=Fs(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new us(e)
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
     */}class Vs{constructor(t,e,n,r,s){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=s}static newInvalidDocument(t){return new Vs(t,0,es.min(),Ps.empty(),0)}static newFoundDocument(t,e,n){return new Vs(t,1,e,n,0)}static newNoDocument(t,e){return new Vs(t,2,e,Ps.empty(),0)}static newUnknownDocument(t,e){return new Vs(t,3,e,Ps.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ps.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ps.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Vs&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new Vs(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
     */class Us{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function qs(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Us(t,e,n,r,s,i,o)}function Bs(t){const e=Hr(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+Ns(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),ws(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=ti(e.startAt)),e.endAt&&(t+="|ub:",t+=ti(e.endAt)),e.h=t}return e.h}function $s(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!ni(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!Is(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!si(t.startAt,e.startAt)&&si(t.endAt,e.endAt)}function Ks(t){return Es.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class js extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Gs(t,e,n):"array-contains"===e?new Ws(t,n):"in"===e?new Ys(t,n):"not-in"===e?new Xs(t,n):"array-contains-any"===e?new Js(t,n):new js(t,e,n)}static l(t,e,n){return"in"===e?new Qs(t,n):new zs(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(Ss(e,this.value)):null!==e&&Ts(this.value)===Ts(e)&&this.m(Ss(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Qr()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Gs extends js{constructor(t,e,n){super(t,e,n),this.key=Es.fromName(n.referenceValue)}matches(t){const e=Es.comparator(t.key,this.key);return this.m(e)}}class Qs extends js{constructor(t,e){super(t,"in",e),this.keys=Hs("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class zs extends js{constructor(t,e){super(t,"not-in",e),this.keys=Hs("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Hs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>Es.fromName(t.referenceValue)))}class Ws extends js{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ks(e)&&_s(e.arrayValue,this.value)}}class Ys extends js{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&_s(this.value.arrayValue,e)}}class Xs extends js{constructor(t,e){super(t,"not-in",e)}matches(t){if(_s(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!_s(this.value.arrayValue,e)}}class Js extends js{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ks(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>_s(this.value.arrayValue,t)))}}class Zs{constructor(t,e){this.position=t,this.before=e}}function ti(t){return`${t.before?"b":"a"}:${t.position.map((t=>Ns(t))).join(",")}`}class ei{constructor(t,e="asc"){this.field=t,this.dir=e}}function ni(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ri(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?Es.comparator(Es.fromName(o.referenceValue),n.key):Ss(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function si(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Is(t.position[n],e.position[n]))return!1;return!0}
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
     */class ii{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function oi(t,e,n,r,s,i,o,a){return new ii(t,e,n,r,s,i,o,a)}function ai(t){return new ii(t)}function ci(t){return!ws(t.limit)&&"F"===t.limitType}function ui(t){return!ws(t.limit)&&"L"===t.limitType}function hi(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function li(t){for(const e of t.filters)if(e.g())return e.field;return null}function di(t){return null!==t.collectionGroup}function fi(t){const e=Hr(t);if(null===e.p){e.p=[];const t=li(e),n=hi(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new ei(t)),e.p.push(new ei(cs.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new ei(cs.keyField(),t))}}}return e.p}function mi(t){const e=Hr(t);if(!e.T)if("F"===e.limitType)e.T=qs(e.path,e.collectionGroup,fi(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of fi(e)){const e="desc"===n.dir?"asc":"desc";t.push(new ei(n.field,e))}const n=e.endAt?new Zs(e.endAt.position,!e.endAt.before):null,r=e.startAt?new Zs(e.startAt.position,!e.startAt.before):null;e.T=qs(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function gi(t,e,n){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function pi(t,e){return $s(mi(t),mi(e))&&t.limitType===e.limitType}function yi(t){return`${Bs(mi(t))}|lt:${t.limitType}`}function wi(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${Ns(e.value)}`;var e})).join(", ")}]`),ws(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: "+ti(t.startAt)),t.endAt&&(e+=", endAt: "+ti(t.endAt)),`Target(${e})`}(mi(t))}; limitType=${t.limitType})`}function vi(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Es.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!ri(t.startAt,fi(t),e))&&(!t.endAt||!ri(t.endAt,fi(t),e))}(t,e)}function bi(t){return(e,n)=>{let r=!1;for(const s of fi(t)){const t=Ei(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function Ei(t,e,n){const r=t.field.isKeyField()?Es.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?Ss(r,s):Qr()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Qr()}}
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
     */function Ti(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vs(e)?"-0":e}}function Ii(t){return{integerValue:""+t}}function _i(t,e){return bs(e)?Ii(e):Ti(t,e)}
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
     */class Si{constructor(){this._=void 0}}function Ai(t,e,n){return t instanceof xi?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Ci?ki(t,e):t instanceof Ri?Li(t,e):function(t,e){const n=Di(t,e),r=Mi(n)+Mi(t.A);return Cs(n)&&Cs(t.A)?Ii(r):Ti(t.R,r)}(t,e)}function Ni(t,e,n){return t instanceof Ci?ki(t,e):t instanceof Ri?Li(t,e):n}function Di(t,e){return t instanceof Oi?Cs(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class xi extends Si{}class Ci extends Si{constructor(t){super(),this.elements=t}}function ki(t,e){const n=Pi(e);for(const e of t.elements)n.some((t=>Is(t,e)))||n.push(e);return{arrayValue:{values:n}}}class Ri extends Si{constructor(t){super(),this.elements=t}}function Li(t,e){let n=Pi(e);for(const e of t.elements)n=n.filter((t=>!Is(t,e)));return{arrayValue:{values:n}}}class Oi extends Si{constructor(t,e){super(),this.R=t,this.A=e}}function Mi(t){return fs(t.integerValue||t.doubleValue)}function Pi(t){return ks(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
     */class Fi{constructor(t,e){this.field=t,this.transform=e}}class Vi{constructor(t,e){this.version=t,this.transformResults=e}}class Ui{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ui}static exists(t){return new Ui(void 0,t)}static updateTime(t){return new Ui(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function qi(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Bi{}function $i(t,e,n){t instanceof zi?function(t,e,n){const r=t.value.clone(),s=Yi(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof Hi?function(t,e,n){if(!qi(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=Yi(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(Wi(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):function(t,e,n){e.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,n)}function Ki(t,e,n){t instanceof zi?function(t,e,n){if(!qi(t.precondition,e))return;const r=t.value.clone(),s=Xi(t.fieldTransforms,n,e);r.setAll(s),e.convertToFoundDocument(Qi(e),r).setHasLocalMutations()}(t,e,n):t instanceof Hi?function(t,e,n){if(!qi(t.precondition,e))return;const r=Xi(t.fieldTransforms,n,e),s=e.data;s.setAll(Wi(t)),s.setAll(r),e.convertToFoundDocument(Qi(e),s).setHasLocalMutations()}(t,e,n):function(t,e){qi(t.precondition,e)&&e.convertToNoDocument(es.min())}(t,e)}function ji(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=Di(r.transform,t||null);null!=s&&(null==n&&(n=Ps.empty()),n.set(r.field,s))}return n||null}function Gi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&Jr(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Ci&&e instanceof Ci||t instanceof Ri&&e instanceof Ri?Jr(t.elements,e.elements,Is):t instanceof Oi&&e instanceof Oi?Is(t.A,e.A):t instanceof xi&&e instanceof xi}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function Qi(t){return t.isFoundDocument()?t.version:es.min()}class zi extends Bi{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Hi extends Bi{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Wi(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function Yi(t,e,n){const r=new Map;zr(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Ni(o,a,n[s]))}return r}function Xi(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,Ai(t,i,e))}return r}class Ji extends Bi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class Zi extends Bi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
     */class to{constructor(t){this.count=t}}
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
     */var eo,no;function ro(t){switch(t){case Vr.OK:return Qr();case Vr.CANCELLED:case Vr.UNKNOWN:case Vr.DEADLINE_EXCEEDED:case Vr.RESOURCE_EXHAUSTED:case Vr.INTERNAL:case Vr.UNAVAILABLE:case Vr.UNAUTHENTICATED:return!1;case Vr.INVALID_ARGUMENT:case Vr.NOT_FOUND:case Vr.ALREADY_EXISTS:case Vr.PERMISSION_DENIED:case Vr.FAILED_PRECONDITION:case Vr.ABORTED:case Vr.OUT_OF_RANGE:case Vr.UNIMPLEMENTED:case Vr.DATA_LOSS:return!0;default:return Qr()}}function so(t){if(void 0===t)return Kr("GRPC error has no .code"),Vr.UNKNOWN;switch(t){case eo.OK:return Vr.OK;case eo.CANCELLED:return Vr.CANCELLED;case eo.UNKNOWN:return Vr.UNKNOWN;case eo.DEADLINE_EXCEEDED:return Vr.DEADLINE_EXCEEDED;case eo.RESOURCE_EXHAUSTED:return Vr.RESOURCE_EXHAUSTED;case eo.INTERNAL:return Vr.INTERNAL;case eo.UNAVAILABLE:return Vr.UNAVAILABLE;case eo.UNAUTHENTICATED:return Vr.UNAUTHENTICATED;case eo.INVALID_ARGUMENT:return Vr.INVALID_ARGUMENT;case eo.NOT_FOUND:return Vr.NOT_FOUND;case eo.ALREADY_EXISTS:return Vr.ALREADY_EXISTS;case eo.PERMISSION_DENIED:return Vr.PERMISSION_DENIED;case eo.FAILED_PRECONDITION:return Vr.FAILED_PRECONDITION;case eo.ABORTED:return Vr.ABORTED;case eo.OUT_OF_RANGE:return Vr.OUT_OF_RANGE;case eo.UNIMPLEMENTED:return Vr.UNIMPLEMENTED;case eo.DATA_LOSS:return Vr.DATA_LOSS;default:return Qr()}}(no=eo||(eo={}))[no.OK=0]="OK",no[no.CANCELLED=1]="CANCELLED",no[no.UNKNOWN=2]="UNKNOWN",no[no.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",no[no.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",no[no.NOT_FOUND=5]="NOT_FOUND",no[no.ALREADY_EXISTS=6]="ALREADY_EXISTS",no[no.PERMISSION_DENIED=7]="PERMISSION_DENIED",no[no.UNAUTHENTICATED=16]="UNAUTHENTICATED",no[no.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",no[no.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",no[no.ABORTED=10]="ABORTED",no[no.OUT_OF_RANGE=11]="OUT_OF_RANGE",no[no.UNIMPLEMENTED=12]="UNIMPLEMENTED",no[no.INTERNAL=13]="INTERNAL",no[no.UNAVAILABLE=14]="UNAVAILABLE",no[no.DATA_LOSS=15]="DATA_LOSS";
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
class io{constructor(t,e){this.comparator=t,this.root=e||ao.EMPTY}insert(t,e){return new io(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ao.BLACK,null,null))}remove(t){return new io(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ao.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new oo(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new oo(this.root,t,this.comparator,!1)}getReverseIterator(){return new oo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new oo(this.root,t,this.comparator,!0)}}class oo{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ao{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:ao.RED,this.left=null!=r?r:ao.EMPTY,this.right=null!=s?s:ao.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new ao(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ao.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return ao.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ao.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ao.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Qr();if(this.right.isRed())throw Qr();const t=this.left.check();if(t!==this.right.check())throw Qr();return t+(this.isRed()?0:1)}}ao.EMPTY=null,ao.RED=!0,ao.BLACK=!1,ao.EMPTY=new class{constructor(){this.size=0}get key(){throw Qr()}get value(){throw Qr()}get color(){throw Qr()}get left(){throw Qr()}get right(){throw Qr()}copy(t,e,n,r,s){return this}insert(t,e,n){return new ao(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
class co{constructor(t){this.comparator=t,this.data=new io(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new uo(this.data.getIterator())}getIteratorFrom(t){return new uo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof co))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new co(this.comparator);return e.data=t,e}}class uo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
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
     */const ho=new io(Es.comparator);function lo(){return ho}const fo=new io(Es.comparator);function mo(){return fo}const go=new io(Es.comparator);function po(){return go}const yo=new co(Es.comparator);function wo(...t){let e=yo;for(const n of t)e=e.add(n);return e}const vo=new co(Xr);function bo(){return vo}
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
     */class Eo{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,To.createSynthesizedTargetChangeForCurrentChange(t,e)),new Eo(es.min(),n,bo(),lo(),wo())}}class To{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e){return new To(hs.EMPTY_BYTE_STRING,e,wo(),wo(),wo())}}
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
     */class Io{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class _o{constructor(t,e){this.targetId=t,this.V=e}}class So{constructor(t,e,n=hs.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Ao{constructor(){this.S=0,this.D=xo(),this.C=hs.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}F(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}M(){let t=wo(),e=wo(),n=wo();return this.D.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Qr()}})),new To(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=xo()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class No{constructor(t){this.W=t,this.G=new Map,this.H=lo(),this.J=Do(),this.Y=new co(Xr)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.F(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.F(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.F(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.F(t.resumeToken));break;default:Qr()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(Ks(t))if(0===n){const n=new Es(t.path);this.tt(e,n,Vs.newNoDocument(n,es.min()))}else zr(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}at(t){const e=new Map;this.G.forEach(((n,r)=>{const s=this.ot(r);if(s){if(n.current&&Ks(s.target)){const e=new Es(s.target.path);null!==this.H.get(e)||this.ut(r,e)||this.tt(r,e,Vs.newNoDocument(e,t))}n.O&&(e.set(r,n.M()),n.L())}}));let n=wo();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new Eo(t,e,this.Y,this.H,n);return this.H=lo(),this.J=Do(),this.Y=new co(Xr),r}Z(t,e){if(!this.st(t))return;const n=this.ut(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.ut(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).M();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new Ao,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new co(Xr),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||$r("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new Ao),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}ut(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function Do(){return new io(Es.comparator)}function xo(){return new io(Es.comparator)}
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
     */const Co={asc:"ASCENDING",desc:"DESCENDING"},ko={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class Ro{constructor(t,e){this.databaseId=t,this.I=e}}function Lo(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Oo(t,e){return t.I?e.toBase64():e.toUint8Array()}function Mo(t,e){return Lo(t,e.toTimestamp())}function Po(t){return zr(!!t),es.fromTimestamp(function(t){const e=ds(t);return new ts(e.seconds,e.nanos)}(t))}function Fo(t,e){return function(t){return new os(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function Vo(t){const e=os.fromString(t);return zr(ca(e)),e}function Uo(t,e){return Fo(t.databaseId,e.path)}function qo(t,e){const n=Vo(e);if(n.get(1)!==t.databaseId.projectId)throw new Ur(Vr.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Ur(Vr.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Es(jo(n))}function Bo(t,e){return Fo(t.databaseId,e)}function $o(t){const e=Vo(t);return 4===e.length?os.emptyPath():jo(e)}function Ko(t){return new os(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function jo(t){return zr(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Go(t,e,n){return{name:Uo(t,e),fields:n.value.mapValue.fields}}function Qo(t,e,n){const r=qo(t,e.name),s=Po(e.updateTime),i=new Ps({mapValue:{fields:e.fields}}),o=Vs.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function zo(t,e){let n;if(e instanceof zi)n={update:Go(t,e.key,e.value)};else if(e instanceof Ji)n={delete:Uo(t,e.key)};else if(e instanceof Hi)n={update:Go(t,e.key,e.data),updateMask:aa(e.fieldMask)};else{if(!(e instanceof Zi))return Qr();n={verify:Uo(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof xi)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ci)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ri)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Oi)return{fieldPath:e.field.canonicalString(),increment:n.A};throw Qr()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:Mo(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:Qr()}(t,e.precondition)),n}function Ho(t,e){const n=e.currentDocument?function(t){return void 0!==t.updateTime?Ui.updateTime(Po(t.updateTime)):void 0!==t.exists?Ui.exists(t.exists):Ui.none()}(e.currentDocument):Ui.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)zr("REQUEST_TIME"===e.setToServerValue),n=new xi;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Ci(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Ri(t)}else"increment"in e?n=new Oi(t,e.increment):Qr();const r=cs.fromServerFormat(e.fieldPath);return new Fi(r,n)}(t,e))):[];if(e.update){e.update.name;const s=qo(t,e.update.name),i=new Ps({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new us(e.map((t=>cs.fromServerFormat(t))))}(e.updateMask);return new Hi(s,i,t,n,r)}return new zi(s,i,n,r)}if(e.delete){const r=qo(t,e.delete);return new Ji(r,n)}if(e.verify){const r=qo(t,e.verify);return new Zi(r,n)}return Qr()}function Wo(t,e){return{documents:[Bo(t,e.path)]}}function Yo(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Bo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Bo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(Ls(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NAN"}};if(Rs(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Ls(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NOT_NAN"}};if(Rs(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ra(t.field),op:na(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>function(t){return{field:ra(t.field),direction:ea(t.dir)}}(t)))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(t,e){return t.I||ws(e)?e:{value:e}}(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=Zo(e.startAt)),e.endAt&&(n.structuredQuery.endAt=Zo(e.endAt)),n}function Xo(t){let e=$o(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){zr(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=Jo(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>function(t){return new ei(sa(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,ws(e)?null:e}(n.limit));let c=null;n.startAt&&(c=ta(n.startAt));let u=null;return n.endAt&&(u=ta(n.endAt)),oi(e,s,o,i,a,"F",c,u)}function Jo(t){return t?void 0!==t.unaryFilter?[oa(t)]:void 0!==t.fieldFilter?[ia(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Jo(t))).reduce(((t,e)=>t.concat(e))):Qr():[]}function Zo(t){return{before:t.before,values:t.position}}function ta(t){const e=!!t.before,n=t.values||[];return new Zs(n,e)}function ea(t){return Co[t]}function na(t){return ko[t]}function ra(t){return{fieldPath:t.canonicalString()}}function sa(t){return cs.fromServerFormat(t.fieldPath)}function ia(t){return js.create(sa(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Qr()}}(t.fieldFilter.op),t.fieldFilter.value)}function oa(t){switch(t.unaryFilter.op){case"IS_NAN":const e=sa(t.unaryFilter.field);return js.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=sa(t.unaryFilter.field);return js.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=sa(t.unaryFilter.field);return js.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=sa(t.unaryFilter.field);return js.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Qr()}}function aa(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function ca(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
     */function ua(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=la(e)),e=ha(t.get(n),e);return la(e)}function ha(t,e){let n=e;const r=t.length;for(let e=0;e<r;e++){const r=t.charAt(e);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function la(t){return t+""}function da(t){const e=t.length;if(zr(e>=2),2===e)return zr(""===t.charAt(0)&&""===t.charAt(1)),os.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const e=t.indexOf("",i);switch((e<0||e>n)&&Qr(),t.charAt(e+1)){case"":const n=t.substring(i,e);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=t.substring(i,e),s+="\0";break;case"":s+=t.substring(i,e+1);break;default:Qr()}i=e+2}return new os(r)}
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
     */class fa{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class ma{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}ma.store="owner",ma.key="owner";class ga{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}ga.store="mutationQueues",ga.keyPath="userId";class pa{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}pa.store="mutations",pa.keyPath="batchId",pa.userMutationsIndex="userMutationsIndex",pa.userMutationsKeyPath=["userId","batchId"];class ya{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,ua(e)]}static key(t,e,n){return[t,ua(e),n]}}ya.store="documentMutations",ya.PLACEHOLDER=new ya;class wa{constructor(t,e){this.path=t,this.readTime=e}}class va{constructor(t,e){this.path=t,this.version=e}}class ba{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}ba.store="remoteDocuments",ba.readTimeIndex="readTimeIndex",ba.readTimeIndexPath="readTime",ba.collectionReadTimeIndex="collectionReadTimeIndex",ba.collectionReadTimeIndexPath=["parentPath","readTime"];class Ea{constructor(t){this.byteSize=t}}Ea.store="remoteDocumentGlobal",Ea.key="remoteDocumentGlobalKey";class Ta{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}Ta.store="targets",Ta.keyPath="targetId",Ta.queryTargetsIndexName="queryTargetsIndex",Ta.queryTargetsKeyPath=["canonicalId","targetId"];class Ia{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}Ia.store="targetDocuments",Ia.keyPath=["targetId","path"],Ia.documentTargetsIndex="documentTargetsIndex",Ia.documentTargetsKeyPath=["path","targetId"];class _a{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}_a.key="targetGlobalKey",_a.store="targetGlobal";class Sa{constructor(t,e){this.collectionId=t,this.parent=e}}Sa.store="collectionParents",Sa.keyPath=["collectionId","parent"];class Aa{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}Aa.store="clientMetadata",Aa.keyPath="clientId";class Na{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}Na.store="bundles",Na.keyPath="bundleId";class Da{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}Da.store="namedQueries",Da.keyPath="name";const xa=[ga.store,pa.store,ya.store,ba.store,Ta.store,ma.store,_a.store,Ia.store,Aa.store,Ea.store,Sa.store,Na.store,Da.store],Ca="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ka{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
     */class Ra{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
     */class La{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Qr(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new La(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof La?e:La.resolve(e)}catch(t){return La.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):La.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):La.reject(e)}static resolve(t){return new La(((e,n)=>{e(t)}))}static reject(t){return new La(((e,n)=>{n(t)}))}static waitFor(t){return new La(((e,n)=>{let r=0,s=0,i=!1;t.forEach((t=>{++r,t.next((()=>{++s,i&&s===r&&e()}),(t=>n(t)))})),i=!0,s===r&&e()}))}static or(t){let e=La.resolve(!1);for(const n of t)e=e.next((t=>t?La.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
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
     */class Oa{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new Ra,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new Fa(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=$a(e.target.error);this.ft.reject(new Fa(t,n))}}static open(t,e,n,r){try{return new Oa(e,t.transaction(r,n))}catch(t){throw new Fa(e,t)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||($r("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Ua(e)}}class Ma{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Ma._t(c())&&Kr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return $r("SimpleDb","Removing database:",t),qa(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Ma.yt())return!0;const t=c(),e=Ma._t(t),n=0<e&&e<10,r=Ma.Et(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||($r("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new Fa(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Ur(Vr.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new Fa(t,r))},r.onupgradeneeded=t=>{$r("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{$r("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.At(t);const e=Oa.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),La.reject(t)))).toPromise();return i.catch((()=>{})),await e.dt,i}catch(t){const e="FirebaseError"!==t.name&&i<3;if($r("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Pa{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return qa(this.vt.delete())}}class Fa extends Ur{constructor(t,e){super(Vr.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Va(t){return"IndexedDbTransactionError"===t.name}class Ua{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?($r("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):($r("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),qa(n)}add(t){return $r("SimpleDb","ADD",this.store.name,t,t),qa(this.store.add(t))}get(t){return qa(this.store.get(t)).next((e=>(void 0===e&&(e=null),$r("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return $r("SimpleDb","DELETE",this.store.name,t),qa(this.store.delete(t))}count(){return $r("SimpleDb","COUNT",this.store.name),qa(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){$r("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Ft(t){const e=this.cursor({});return new La(((n,r)=>{e.onerror=t=>{const e=$a(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new La(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new Pa(s),o=e(s.primaryKey,s.value,i);if(o instanceof La){const t=o.catch((t=>(i.done(),La.reject(t))));n.push(t)}i.isDone?r():null===i.Dt?s.continue():s.continue(i.Dt)}})).next((()=>La.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function qa(t){return new La(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=$a(t.target.error);n(e)}}))}let Ba=!1;function $a(t){const e=Ma._t(c());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Ur("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ba||(Ba=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
     */class Ka extends ka{constructor(t,e){super(),this.Mt=t,this.currentSequenceNumber=e}}function ja(t,e){const n=Hr(t);return Ma.It(n.Mt,e)}
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
     */class Ga{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const r=this.mutations[e];r.key.isEqual(t.key)&&$i(r,t,n[e])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&Ki(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&Ki(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(es.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),wo())}isEqual(t){return this.batchId===t.batchId&&Jr(this.mutations,t.mutations,((t,e)=>Gi(t,e)))&&Jr(this.baseMutations,t.baseMutations,((t,e)=>Gi(t,e)))}}class Qa{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){zr(t.mutations.length===n.length);let r=po();const s=t.mutations;for(let t=0;t<s.length;t++)r=r.insert(s[t].key,n[t].version);return new Qa(t,e,n,r)}}
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
     */class za{constructor(t,e,n,r,s=es.min(),i=es.min(),o=hs.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new za(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new za(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new za(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
     */class Ha{constructor(t){this.Lt=t}}function Wa(t,e){if(e.document)return Qo(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=Es.fromSegments(e.noDocument.path),n=tc(e.noDocument.readTime),r=Vs.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=Es.fromSegments(e.unknownDocument.path),n=tc(e.unknownDocument.version);return Vs.newUnknownDocument(t,n)}return Qr()}function Ya(t,e,n){const r=Xa(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n=function(t,e){return{name:Uo(t,e.key),fields:e.data.value.mapValue.fields,updateTime:Lo(t,e.version.toTimestamp())}}(t.Lt,e),i=e.hasCommittedMutations;return new ba(null,null,n,i,r,s)}if(e.isNoDocument()){const t=e.key.path.toArray(),n=Za(e.version),i=e.hasCommittedMutations;return new ba(null,new wa(t,n),null,i,r,s)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=Za(e.version);return new ba(new va(t,n),null,null,!0,r,s)}return Qr()}function Xa(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ja(t){const e=new ts(t[0],t[1]);return es.fromTimestamp(e)}function Za(t){const e=t.toTimestamp();return new fa(e.seconds,e.nanoseconds)}function tc(t){const e=new ts(t.seconds,t.nanoseconds);return es.fromTimestamp(e)}function ec(t,e){const n=(e.baseMutations||[]).map((e=>Ho(t.Lt,e)));for(let t=0;t<e.mutations.length-1;++t){const n=e.mutations[t];if(t+1<e.mutations.length&&void 0!==e.mutations[t+1].transform){const r=e.mutations[t+1];n.updateTransforms=r.transform.fieldTransforms,e.mutations.splice(t+1,1),++t}}const r=e.mutations.map((e=>Ho(t.Lt,e))),s=ts.fromMillis(e.localWriteTimeMs);return new Ga(e.batchId,s,n,r)}function nc(t){const e=tc(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?tc(t.lastLimboFreeSnapshotVersion):es.min();let r;var s;return void 0!==t.query.documents?(zr(1===(s=t.query).documents.length),r=mi(ai($o(s.documents[0])))):r=function(t){return mi(Xo(t))}(t.query),new za(r,t.targetId,0,t.lastListenSequenceNumber,e,n,hs.fromBase64String(t.resumeToken))}function rc(t,e){const n=Za(e.snapshotVersion),r=Za(e.lastLimboFreeSnapshotVersion);let s;s=Ks(e.target)?Wo(t.Lt,e.target):Yo(t.Lt,e.target);const i=e.resumeToken.toBase64();return new Ta(e.targetId,Bs(e.target),n,i,e.sequenceNumber,r,s)}function sc(t){const e=Xo({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?gi(e,e.limit,"L"):e}
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
     */class ic{getBundleMetadata(t,e){return oc(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:tc(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return oc(t).put({bundleId:(n=e).id,createTime:Za(Po(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return ac(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:sc(e.bundledQuery),readTime:tc(e.readTime)};var e}))}saveNamedQuery(t,e){return ac(t).put(function(t){return{name:t.name,readTime:Za(Po(t.readTime)),bundledQuery:t.bundledQuery}}(e))}}function oc(t){return ja(t,Na.store)}function ac(t){return ja(t,Da.store)}
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
     */class cc{constructor(){this.Bt=new uc}addToCollectionParentIndex(t,e){return this.Bt.add(e),La.resolve()}getCollectionParents(t,e){return La.resolve(this.Bt.getEntries(e))}}class uc{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new co(os.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new co(os.comparator)).toArray()}}
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
     */class hc{constructor(){this.Ut=new uc}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const s={collectionId:n,parent:ua(r)};return lc(t).put(s)}return La.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Zr(e),""],!1,!0);return lc(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(da(r.parent))}return n}))}}function lc(t){return ja(t,Sa.store)}
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
     */const dc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class fc{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new fc(t,fc.DEFAULT_COLLECTION_PERCENTILE,fc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
     */function mc(t,e,n){const r=t.store(pa.store),s=t.store(ya.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{zr(1===a)})));const u=[];for(const t of n.mutations){const r=ya.key(e,t.key.path,n.batchId);i.push(s.delete(r)),u.push(t.key)}return La.waitFor(i).next((()=>u))}function gc(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Qr();e=t.noDocument}return JSON.stringify(e).length}
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
     */fc.DEFAULT_COLLECTION_PERCENTILE=10,fc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,fc.DEFAULT=new fc(41943040,fc.DEFAULT_COLLECTION_PERCENTILE,fc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),fc.DISABLED=new fc(-1,0,0);class pc{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){zr(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new pc(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return wc(t).Ot({index:pa.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=vc(t),i=wc(t);return i.add({}).next((o=>{zr("number"==typeof o);const a=new Ga(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>zo(t.Lt,e))),s=n.mutations.map((e=>zo(t.Lt,e)));return new pa(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.R,this.userId,a),u=[];let h=new co(((t,e)=>Xr(t.canonicalString(),e.canonicalString())));for(const t of r){const e=ya.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,ya.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),La.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return wc(t).get(e).next((t=>t?(zr(t.userId===this.userId),ec(this.R,t)):null))}jt(t,e){return this.Kt[e]?La.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return wc(t).Ot({index:pa.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(zr(e.batchId>=n),s=ec(this.R,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return wc(t).Ot({index:pa.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return wc(t).Nt(pa.userMutationsIndex,e).next((t=>t.map((t=>ec(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=ya.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return vc(t).Ot({range:r},((n,r,i)=>{const[o,a,c]=n,u=da(a);if(o===this.userId&&e.path.isEqual(u))return wc(t).get(c).next((t=>{if(!t)throw Qr();zr(t.userId===this.userId),s.push(ec(this.R,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new co(Xr);const r=[];return e.forEach((e=>{const s=ya.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=vc(t).Ot({range:i},((t,r,s)=>{const[i,o,a]=t,c=da(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),La.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=ya.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new co(Xr);return vc(t).Ot({range:i},((t,e,s)=>{const[i,a,c]=t,u=da(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(wc(t).get(e).next((t=>{if(null===t)throw Qr();zr(t.userId===this.userId),n.push(ec(this.R,t))})))})),La.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return mc(t.Mt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),La.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return La.resolve();const n=IDBKeyRange.lowerBound(ya.prefixForUser(this.userId)),r=[];return vc(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=da(t[1]);r.push(e)}else n.done()})).next((()=>{zr(0===r.length)}))}))}containsKey(t,e){return yc(t,this.userId,e)}zt(t){return bc(t).get(this.userId).next((t=>t||new ga(this.userId,-1,"")))}}function yc(t,e,n){const r=ya.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return vc(t).Ot({range:i,$t:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function wc(t){return ja(t,pa.store)}function vc(t){return ja(t,ya.store)}function bc(t){return ja(t,ga.store)}
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
     */class Ec{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new Ec(0)}static Yt(){return new Ec(-1)}}
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
     */class Tc{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new Ec(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>es.fromTimestamp(new ts(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>Ic(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(zr(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return Ic(t).Ot(((i,o)=>{const a=nc(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>La.waitFor(s))).next((()=>r))}forEachTarget(t,e){return Ic(t).Ot(((t,n)=>{const r=nc(n);e(r)}))}Xt(t){return _c(t).get(_a.key).next((t=>(zr(null!==t),t)))}Zt(t,e){return _c(t).put(_a.key,e)}te(t,e){return Ic(t).put(rc(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Bs(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Ic(t).Ot({range:r,index:Ta.queryTargetsIndexName},((t,n,r)=>{const i=nc(n);$s(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=Sc(t);return e.forEach((e=>{const i=ua(e.path);r.push(s.put(new Ia(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),La.waitFor(r)}removeMatchingKeys(t,e,n){const r=Sc(t);return La.forEach(e,(e=>{const s=ua(e.path);return La.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=Sc(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=Sc(t);let s=wo();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=da(t[1]),i=new Es(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=ua(e.path),r=IDBKeyRange.bound([n],[Zr(n)],!1,!0);let s=0;return Sc(t).Ot({index:Ia.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}lt(t,e){return Ic(t).get(e).next((t=>t?nc(t):null))}}function Ic(t){return ja(t,Ta.store)}function _c(t){return ja(t,_a.store)}function Sc(t){return ja(t,Ia.store)}
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
     */async function Ac(t){if(t.code!==Vr.FAILED_PRECONDITION||t.message!==Ca)throw t;$r("LocalStore","Unexpectedly lost primary lease")}
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
     */function Nc([t,e],[n,r]){const s=Xr(t,n);return 0===s?Xr(e,r):s}class Dc{constructor(t){this.ne=t,this.buffer=new co(Nc),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();Nc(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xc{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ae(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ae(t){const e=this.oe?3e5:6e4;$r("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(t){Va(t)?$r("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Ac(t)}await this.ae(t)}))}}class Cc{constructor(t,e){this.ue=t,this.params=e}calculateTargetCount(t,e){return this.ue.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return La.resolve(Fr.o);const n=new Dc(e);return this.ue.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ue.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ue.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ue.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?($r("LruGarbageCollector","Garbage collection skipped; disabled"),La.resolve(dc)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?($r("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),dc):this.fe(t,e)))}getCacheSize(t){return this.ue.getCacheSize(t)}fe(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?($r("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Br()<=g.DEBUG&&$r("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${t} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),La.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
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
     */class kc{constructor(t,e){this.db=t,this.garbageCollector=function(t,e){return new Cc(t,e)}(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return Rc(t,n)}removeReference(t,e,n){return Rc(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Rc(t,e)}_e(t,e){return function(t,e){let n=!1;return bc(t).Ft((r=>yc(t,r,e).next((t=>(t&&(n=!0),La.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.we(t,((i,o)=>{if(o<=e){const e=this._e(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),Sc(t).delete([0,ua(i.path)]))))}));r.push(e)}})).next((()=>La.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Rc(t,e)}we(t,e){const n=Sc(t);let r,s=Fr.o;return n.Ot({index:Ia.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Fr.o&&e(new Es(da(r)),s),s=o,r=i):s=Fr.o})).next((()=>{s!==Fr.o&&e(new Es(da(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Rc(t,e){return Sc(t).put(function(t,e){return new Ia(0,ua(t.path),e)}(e,t.currentSequenceNumber))}
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
     */class Lc{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,r]of n)if(this.equalsFn(e,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){rs(this.inner,((e,n)=>{for(const[e,r]of n)t(e,r)}))}isEmpty(){return ss(this.inner)}}
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
     */class Oc{constructor(){this.changes=new Lc((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:es.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:Vs.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?La.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
     */class Mc{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Vc(t).put(Uc(e),n)}removeEntry(t,e){const n=Vc(t),r=Uc(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Vc(t).get(Uc(e)).next((t=>this.ge(e,t)))}ye(t,e){return Vc(t).get(Uc(e)).next((t=>({document:this.ge(e,t),size:gc(t)})))}getEntries(t,e){let n=lo();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=lo(),r=new io(Es.comparator);return this.pe(t,e,((t,e)=>{const s=this.ge(t,e);n=n.insert(t,s),r=r.insert(t,gc(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return La.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return Vc(t).Ot({range:r},((t,e,r)=>{const o=Es.fromSegments(t);for(;i&&Es.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.Ct(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=lo();const s=e.path.length+1,i={};if(n.isEqual(es.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Xa(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=ba.collectionReadTimeIndex}return Vc(t).Ot(i,((t,n,i)=>{if(t.length!==s)return;const o=Wa(this.R,n);e.path.isPrefixOf(o.key.path)?vi(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new Pc(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return Fc(t).get(Ea.key).next((t=>(zr(!!t),t)))}me(t,e){return Fc(t).put(Ea.key,e)}ge(t,e){if(e){const t=Wa(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(es.min()))return t}return Vs.newInvalidDocument(t)}}class Pc extends Oc{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Lc((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new co(((t,e)=>Xr(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Ae.get(s);if(i.document.isValidDocument()){const a=Ya(this.Ie.R,i.document,this.getReadTime(s));r=r.add(s.path.popLast());const c=gc(a);n+=c-o,e.push(this.Ie.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=Ya(this.Ie.R,Vs.newNoDocument(s,es.min()),this.getReadTime(s));e.push(this.Ie.addEntry(t,s,n))}else e.push(this.Ie.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),La.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function Fc(t){return ja(t,Ea.store)}function Vc(t){return ja(t,ba.store)}function Uc(t){return t.path.toArray()}
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
     */class qc{constructor(t){this.R=t}Rt(t,e,n,r){zr(n<r&&n>=0&&r<=11);const s=new Oa("createOrUpgrade",e);n<1&&r>=1&&(function(t){t.createObjectStore(ma.store)}(t),function(t){t.createObjectStore(ga.store,{keyPath:ga.keyPath}),t.createObjectStore(pa.store,{keyPath:pa.keyPath,autoIncrement:!0}).createIndex(pa.userMutationsIndex,pa.userMutationsKeyPath,{unique:!0}),t.createObjectStore(ya.store)}(t),Bc(t),function(t){t.createObjectStore(ba.store)}(t));let i=La.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(Ia.store),t.deleteObjectStore(Ta.store),t.deleteObjectStore(_a.store)}(t),Bc(t)),i=i.next((()=>function(t){const e=t.store(_a.store),n=new _a(0,0,es.min().toTimestamp(),0);return e.put(_a.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(pa.store).Nt().next((n=>{t.deleteObjectStore(pa.store),t.createObjectStore(pa.store,{keyPath:pa.keyPath,autoIncrement:!0}).createIndex(pa.userMutationsIndex,pa.userMutationsKeyPath,{unique:!0});const r=e.store(pa.store),s=n.map((t=>r.put(t)));return La.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(Aa.store,{keyPath:Aa.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.Re(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(Ea.store)}(t),this.Pe(s))))),n<7&&r>=7&&(i=i.next((()=>this.be(s)))),n<8&&r>=8&&(i=i.next((()=>this.ve(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(ba.store);e.createIndex(ba.readTimeIndex,ba.readTimeIndexPath,{unique:!1}),e.createIndex(ba.collectionReadTimeIndex,ba.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.Ve(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(Na.store,{keyPath:Na.keyPath})}(t),function(t){t.createObjectStore(Da.store,{keyPath:Da.keyPath})}
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
     */(t)}))),i}Pe(t){let e=0;return t.store(ba.store).Ot(((t,n)=>{e+=gc(n)})).next((()=>{const n=new Ea(e);return t.store(Ea.store).put(Ea.key,n)}))}Re(t){const e=t.store(ga.store),n=t.store(pa.store);return e.Nt().next((e=>La.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(pa.userMutationsIndex,r).next((n=>La.forEach(n,(n=>{zr(n.userId===e.userId);const r=ec(this.R,n);return mc(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(Ia.store),n=t.store(ba.store);return t.store(_a.store).get(_a.key).next((t=>{const r=[];return n.Ot(((n,s)=>{const i=new os(n),o=function(t){return[0,ua(t)]}(i);r.push(e.get(o).next((n=>n?La.resolve():(n=>e.put(new Ia(0,ua(n),t.highestListenSequenceNumber)))(i))))})).next((()=>La.waitFor(r)))}))}ve(t,e){t.createObjectStore(Sa.store,{keyPath:Sa.keyPath});const n=e.store(Sa.store),r=new uc,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:ua(r)})}};return e.store(ba.store).Ot({$t:!0},((t,e)=>{const n=new os(t);return s(n.popLast())})).next((()=>e.store(ya.store).Ot({$t:!0},(([t,e,n],r)=>{const i=da(e);return s(i.popLast())}))))}Ve(t){const e=t.store(Ta.store);return e.Ot(((t,n)=>{const r=nc(n),s=rc(this.R,r);return e.put(s)}))}}function Bc(t){t.createObjectStore(Ia.store,{keyPath:Ia.keyPath}).createIndex(Ia.documentTargetsIndex,Ia.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(Ta.store,{keyPath:Ta.keyPath}).createIndex(Ta.queryTargetsIndexName,Ta.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(_a.store)}const $c="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Kc{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=s,this.window=i,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Fe=Number.NEGATIVE_INFINITY,this.Me=t=>Promise.resolve(),!Kc.gt())throw new Ur(Vr.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new kc(this,r),this.Le=e+"main",this.R=new Ha(a),this.Be=new Ma(this.Le,11,new qc(this.R)),this.Ue=new Tc(this.referenceDelegate,this.R),this.qt=new hc,this.qe=function(t,e){return new Mc(t,e)}(this.R,this.qt),this.Ke=new ic,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&Kr("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Ur(Vr.FAILED_PRECONDITION,$c);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Fr(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Me=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Gc(t).put(new Aa(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Va(t))return $r("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return $r("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Me(t))),this.isPrimary=t}))}Je(t){return jc(t).get(ma.key).next((t=>La.resolve(this.tn(t))))}en(t){return Gc(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Fe,18e5)){this.Fe=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=ja(t,Aa.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return La.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?La.resolve(!0):jc(t).get(ma.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new Ur(Vr.FAILED_PRECONDITION,$c);return!1}}return!(!this.networkEnabled||!this.inForeground)||Gc(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&$r("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.an(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.un(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[ma.store,Aa.store],(t=>{const e=new Ka(t,Fr.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Gc(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return pc.Qt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){$r("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.Be.runTransaction(t,r,xa,(r=>(s=new Ka(r,this.Ne?this.Ne.next():Fr.o),"readwrite-primary"===e?this.Je(s).next((t=>!!t||this.Ye(s))).next((e=>{if(!e)throw Kr(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))),new Ur(Vr.FAILED_PRECONDITION,Ca);return n(s)})).next((t=>this.Ze(s).next((()=>t)))):this.dn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}dn(t){return jc(t).get(ma.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Ur(Vr.FAILED_PRECONDITION,$c)}))}Ze(t){const e=new ma(this.clientId,this.allowTabSynchronization,Date.now());return jc(t).put(ma.key,e)}static gt(){return Ma.gt()}Xe(t){const e=jc(t);return e.get(ma.key).next((t=>this.tn(t)?($r("IndexedDbPersistence","Releasing primary lease."),e.delete(ma.key)):La.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Kr(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}un(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.an(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return $r("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(t){return Kr("IndexedDbPersistence","Failed to get zombied client id.",t),!1}}an(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){Kr("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function jc(t){return ja(t,ma.store)}function Gc(t){return ja(t,Aa.store)}function Qc(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"
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
     */}class zc{constructor(t,e){this.progress=t,this.wn=e}}
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
     */class Hc{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const t of e)t.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return function(t){return Es.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.Tn(t,e.path):di(e)?this.In(t,e,n):this.An(t,e,n)}Tn(t,e){return this.mn(t,new Es(e)).next((t=>{let e=mo();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let s=mo();return this.qt.getCollectionParents(t,r).next((i=>La.forEach(i,(i=>{const o=function(t,e){return new ii(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,i.child(r));return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}An(t,e,n){let r,s;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Rn(t,s,r).next((t=>{r=t;for(const t of s)for(const e of t.mutations){const n=e.key;let s=r.get(n);null==s&&(s=Vs.newInvalidDocument(n),r=r.insert(n,s)),Ki(e,s,t.localWriteTime),s.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{vi(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=wo();for(const t of e)for(const e of t.mutations)e instanceof Hi&&null===n.get(e.key)&&(r=r.add(e.key));let s=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(s=s.insert(t,e))})),s)))}}
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
     */class Wc{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=wo(),r=wo();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:r=r.add(t.doc.key)}return new Wc(t,e.fromCache,n,r)}}
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
     */class Yc{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||n.isEqual(es.min())?this.Dn(t,e):this.Sn.pn(t,r).next((s=>{const i=this.Cn(e,s);return(ci(e)||ui(e))&&this.Nn(e.limitType,i,r,n)?this.Dn(t,e):(Br()<=g.DEBUG&&$r("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),wi(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}))}Cn(t,e){let n=new co(bi(t));return e.forEach(((e,r)=>{vi(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Dn(t,e){return Br()<=g.DEBUG&&$r("QueryEngine","Using full collection scan to execute query:",wi(e)),this.Sn.getDocumentsMatchingQuery(t,e,es.min())}}
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
     */class Xc{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new io(Xr),this.$n=new Lc((t=>Bs(t)),$s),this.On=es.min(),this._n=t.getMutationQueue(n),this.Fn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Mn=new Hc(this.Fn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Mn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function Jc(t,e,n,r){return new Xc(t,e,n,r)}async function Zc(t,e){const n=Hr(t);let r=n._n,s=n.Mn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n._n.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new Hc(n.Fn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=wo();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Mn=s,n.xn.Vn(n.Mn),i}function tu(t){const e=Hr(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function eu(t,e,n,r,s){let i=wo();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=lo();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o.isNoDocument()&&o.version.isEqual(es.min())?(e.removeEntry(n,c),i=i.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):$r("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}function nu(t,e){const n=Hr(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}function ru(t,e){const n=Hr(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((s=>s?(r=s,La.resolve(r)):n.Ue.allocateTargetId(t).next((s=>(r=new za(e,s,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}async function su(t,e,n){const r=Hr(t),s=r.kn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(t){if(!Va(t))throw t;$r("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}r.kn=r.kn.remove(e),r.$n.delete(s.target)}function iu(t,e,n){const r=Hr(t);let s=es.min(),i=wo();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=Hr(t),s=r.$n.get(n);return void 0!==s?La.resolve(r.kn.get(s)):r.Ue.getTargetData(e,n)}(r,t,mi(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?s:es.min(),n?i:wo()))).next((t=>({documents:t,Bn:i})))))}function ou(t,e){const n=Hr(t),r=Hr(n.Ue),s=n.kn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",(t=>r.lt(t,e).next((t=>t?t.target:null))))}function au(t){const e=Hr(t);return e.persistence.runTransaction("Get new document changes","readonly",(t=>function(t,e,n){const r=Hr(t);let s=lo(),i=Xa(n);const o=Vc(e),a=IDBKeyRange.lowerBound(i,!0);return o.Ot({index:ba.readTimeIndex,range:a},((t,e)=>{const n=Wa(r.R,e);s=s.insert(n.key,n),i=e.readTime})).next((()=>({wn:s,readTime:Ja(i)})))}(e.Fn,t,e.On))).then((({wn:t,readTime:n})=>(e.On=n,t)))}async function cu(t,e,n=wo()){const r=await ru(t,mi(sc(e.bundledQuery))),s=Hr(t);return s.persistence.runTransaction("Save named query","readwrite",(t=>{const i=Po(e.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Ke.saveNamedQuery(t,e);const o=r.withResumeToken(hs.EMPTY_BYTE_STRING,i);return s.kn=s.kn.insert(o.targetId,o),s.Ue.updateTargetData(t,o).next((()=>s.Ue.removeMatchingKeysForTargetId(t,r.targetId))).next((()=>s.Ue.addMatchingKeys(t,n,r.targetId))).next((()=>s.Ke.saveNamedQuery(t,e)))}))}
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
     */class uu{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return La.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:Po(n.createTime)}),La.resolve()}getNamedQuery(t,e){return La.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,function(t){return{name:t.name,query:sc(t.bundledQuery),readTime:Po(t.readTime)}}(e)),La.resolve()}}
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
     */class hu{constructor(){this.Wn=new co(lu.Gn),this.zn=new co(lu.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new lu(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new lu(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new Es(new os([])),n=new lu(e,t),r=new lu(e,t+1),s=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),s.push(t.key)})),s}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new Es(new os([])),n=new lu(e,t),r=new lu(e,t+1);let s=wo();return this.zn.forEachInRange([n,r],(t=>{s=s.add(t.key)})),s}containsKey(t){const e=new lu(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class lu{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return Es.comparator(t.key,e.key)||Xr(t.ns,e.ns)}static Hn(t,e){return Xr(t.ns,e.ns)||Es.comparator(t.key,e.key)}}
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
     */class du{constructor(t,e){this.qt=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new co(lu.Gn)}checkEmpty(t){return La.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const s=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const i=new Ga(s,e,n,r);this._n.push(i);for(const e of r)this.rs=this.rs.add(new lu(e.key,s)),this.qt.addToCollectionParentIndex(t,e.key.path.popLast());return La.resolve(i)}lookupMutationBatch(t,e){return La.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),s=r<0?0:r;return La.resolve(this._n.length>s?this._n[s]:null)}getHighestUnacknowledgedBatchId(){return La.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return La.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new lu(e,0),r=new lu(e,Number.POSITIVE_INFINITY),s=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);s.push(e)})),La.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new co(Xr);return e.forEach((t=>{const e=new lu(t,0),r=new lu(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),La.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;Es.isDocumentKey(s)||(s=s.child(""));const i=new lu(new Es(s),0);let o=new co(Xr);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),i),La.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){zr(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return La.forEach(e.mutations,(r=>{const s=new lu(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new lu(e,0),r=this.rs.firstAfterOrEqual(n);return La.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,La.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
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
     */class fu{constructor(t,e){this.qt=t,this.ls=e,this.docs=new io(Es.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-i,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return La.resolve(n?n.document.clone():Vs.newInvalidDocument(e))}getEntries(t,e){let n=lo();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():Vs.newInvalidDocument(t))})),La.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=lo();const s=new Es(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{document:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||vi(e,s)&&(r=r.insert(s.key,s.clone()))}return La.resolve(r)}fs(t,e){return La.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new mu(this)}getSize(t){return La.resolve(this.size)}}class mu extends Oc{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),La.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
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
     */class gu{constructor(t){this.persistence=t,this.ds=new Lc((t=>Bs(t)),$s),this.lastRemoteSnapshotVersion=es.min(),this.highestTargetId=0,this.ws=0,this._s=new hu,this.targetCount=0,this.gs=Ec.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),La.resolve()}getLastRemoteSnapshotVersion(t){return La.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return La.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),La.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),La.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new Ec(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,La.resolve()}updateTargetData(t,e){return this.te(e),La.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,La.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ds.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),La.waitFor(s).next((()=>r))}getTargetCount(t){return La.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return La.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),La.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),La.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),La.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return La.resolve(n)}containsKey(t,e){return La.resolve(this._s.containsKey(e))}}
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
     */class pu{constructor(t,e){this.ys={},this.Ne=new Fr(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new gu(this),this.qt=new cc,this.qe=function(t,e){return new fu(t,e)}(this.qt,(t=>this.referenceDelegate.ps(t))),this.R=new Ha(e),this.Ke=new uu(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new du(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){$r("MemoryPersistence","Starting transaction:",t);const r=new yu(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return La.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class yu extends ka{constructor(t){super(),this.currentSequenceNumber=t}}class wu{constructor(t){this.persistence=t,this.As=new hu,this.Rs=null}static Ps(t){return new wu(t)}get bs(){if(this.Rs)return this.Rs;throw Qr()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),La.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),La.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),La.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return La.forEach(this.bs,(n=>{const r=Es.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return La.or([()=>La.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
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
     */class vu{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}function bu(t,e){return`firestore_clients_${t}_${e}`}function Eu(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Tu(t,e){return`firestore_targets_${t}_${e}`}vu.UNAUTHENTICATED=new vu(null),vu.GOOGLE_CREDENTIALS=new vu("google-credentials-uid"),vu.FIRST_PARTY=new vu("first-party-uid");class Iu{constructor(t,e,n,r){this.user=t,this.batchId=e,this.state=n,this.error=r}static Vs(t,e,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new Ur(r.error.code,r.error.message))),i?new Iu(t,e,r.state,s):(Kr("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class _u{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Vs(t,e){const n=JSON.parse(e);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new Ur(n.error.code,n.error.message))),s?new _u(t,n.state,r):(Kr("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Su{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Vs(t,e){const n=JSON.parse(e);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=bo();for(let t=0;r&&t<n.activeTargetIds.length;++t)r=bs(n.activeTargetIds[t]),s=s.add(n.activeTargetIds[t]);return r?new Su(t,s):(Kr("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class Au{constructor(t,e){this.clientId=t,this.onlineState=e}static Vs(t){const e=JSON.parse(t);return"object"==typeof e&&-1!==["Unknown","Online","Offline"].indexOf(e.onlineState)&&"string"==typeof e.clientId?new Au(e.clientId,e.onlineState):(Kr("SharedClientState",`Failed to parse online state: ${t}`),null)}}class Nu{constructor(){this.activeTargetIds=bo()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Du{constructor(t,e,n,r,s){this.window=t,this.Se=e,this.persistenceKey=n,this.Ns=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.xs=this.ks.bind(this),this.$s=new io(Xr),this.started=!1,this.Os=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Fs=bu(this.persistenceKey,this.Ns),this.Ms=function(t){return`firestore_sequence_number_${t}`}
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
     */(this.persistenceKey),this.$s=this.$s.insert(this.Ns,new Nu),this.Ls=new RegExp(`^firestore_clients_${i}_([^_]*)$`),this.Bs=new RegExp(`^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`),this.Us=new RegExp(`^firestore_targets_${i}_(\\d+)$`),this.qs=function(t){return`firestore_online_state_${t}`}(this.persistenceKey),this.Ks=function(t){return`firestore_bundle_loaded_${t}`}(this.persistenceKey),this.window.addEventListener("storage",this.xs)}static gt(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.fn();for(const e of t){if(e===this.Ns)continue;const t=this.getItem(bu(this.persistenceKey,e));if(t){const n=Su.Vs(e,t);n&&(this.$s=this.$s.insert(n.clientId,n))}}this.Qs();const e=this.storage.getItem(this.qs);if(e){const t=this.js(e);t&&this.Ws(t)}for(const t of this.Os)this.ks(t);this.Os=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Ms,JSON.stringify(t))}getAllActiveQueryTargets(){return this.Gs(this.$s)}isActiveQueryTarget(t){let e=!1;return this.$s.forEach(((n,r)=>{r.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.zs(t,"pending")}updateMutationState(t,e,n){this.zs(t,e,n),this.Hs(t)}addLocalQueryTarget(t){let e="not-current";if(this.isActiveQueryTarget(t)){const n=this.storage.getItem(Tu(this.persistenceKey,t));if(n){const r=_u.Vs(t,n);r&&(e=r.state)}}return this.Js.Ds(t),this.Qs(),e}removeLocalQueryTarget(t){this.Js.Cs(t),this.Qs()}isLocalQueryTarget(t){return this.Js.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Tu(this.persistenceKey,t))}updateQueryState(t,e,n){this.Ys(t,e,n)}handleUserChange(t,e,n){e.forEach((t=>{this.Hs(t)})),this.currentUser=t,n.forEach((t=>{this.addPendingMutation(t)}))}setOnlineState(t){this.Xs(t)}notifyBundleLoaded(){this.Zs()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.xs),this.removeItem(this.Fs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return $r("SharedClientState","READ",t,e),e}setItem(t,e){$r("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){$r("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ks(t){const e=t;if(e.storageArea===this.storage){if($r("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Fs)return void Kr("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Se.enqueueRetryable((async()=>{if(this.started){if(null!==e.key)if(this.Ls.test(e.key)){if(null==e.newValue){const t=this.ti(e.key);return this.ei(t,null)}{const t=this.ni(e.key,e.newValue);if(t)return this.ei(t.clientId,t)}}else if(this.Bs.test(e.key)){if(null!==e.newValue){const t=this.si(e.key,e.newValue);if(t)return this.ii(t)}}else if(this.Us.test(e.key)){if(null!==e.newValue){const t=this.ri(e.key,e.newValue);if(t)return this.oi(t)}}else if(e.key===this.qs){if(null!==e.newValue){const t=this.js(e.newValue);if(t)return this.Ws(t)}}else if(e.key===this.Ms){const t=function(t){let e=Fr.o;if(null!=t)try{const n=JSON.parse(t);zr("number"==typeof n),e=n}catch(t){Kr("SharedClientState","Failed to read sequence number from WebStorage",t)}return e}(e.newValue);t!==Fr.o&&this.sequenceNumberHandler(t)}else if(e.key===this.Ks)return this.syncEngine.ci()}else this.Os.push(e)}))}}get Js(){return this.$s.get(this.Ns)}Qs(){this.setItem(this.Fs,this.Js.Ss())}zs(t,e,n){const r=new Iu(this.currentUser,t,e,n),s=Eu(this.persistenceKey,this.currentUser,t);this.setItem(s,r.Ss())}Hs(t){const e=Eu(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Xs(t){const e={clientId:this.Ns,onlineState:t};this.storage.setItem(this.qs,JSON.stringify(e))}Ys(t,e,n){const r=Tu(this.persistenceKey,t),s=new _u(t,e,n);this.setItem(r,s.Ss())}Zs(){this.setItem(this.Ks,"value-not-used")}ti(t){const e=this.Ls.exec(t);return e?e[1]:null}ni(t,e){const n=this.ti(t);return Su.Vs(n,e)}si(t,e){const n=this.Bs.exec(t),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return Iu.Vs(new vu(s),r,e)}ri(t,e){const n=this.Us.exec(t),r=Number(n[1]);return _u.Vs(r,e)}js(t){return Au.Vs(t)}async ii(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.ai(t.batchId,t.state,t.error);$r("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}oi(t){return this.syncEngine.ui(t.targetId,t.state,t.error)}ei(t,e){const n=e?this.$s.insert(t,e):this.$s.remove(t),r=this.Gs(this.$s),s=this.Gs(n),i=[],o=[];return s.forEach((t=>{r.has(t)||i.push(t)})),r.forEach((t=>{s.has(t)||o.push(t)})),this.syncEngine.hi(i,o).then((()=>{this.$s=n}))}Ws(t){this.$s.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}Gs(t){let e=bo();return t.forEach(((t,n)=>{e=e.unionWith(n.activeTargetIds)})),e}}class xu{constructor(){this.li=new Nu,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new Nu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
     */class Cu{di(t){}shutdown(){}}
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
     */class ku{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){$r("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){$r("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
     */const Ru={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
     */class Lu{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
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
     */class Ou extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const s=this.xi(t,e);$r("RestConnection","Sending: ",s,n);const i={};return this.ki(i,r),this.$i(t,s,i,n).then((t=>($r("RestConnection","Received: ",t),t)),(e=>{throw jr("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+Pr,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=Ru[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}$i(t,e,n,r){return new Promise(((s,i)=>{const o=new Mr;o.listenOnce(xr.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Dr.NO_ERROR:const e=o.getResponseJson();$r("Connection","XHR received:",JSON.stringify(e)),s(e);break;case Dr.TIMEOUT:$r("Connection",'RPC "'+t+'" timed out'),i(new Ur(Vr.DEADLINE_EXCEEDED,"Request time out"));break;case Dr.HTTP_ERROR:const n=o.getStatus();if($r("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Vr).indexOf(e)>=0?e:Vr.UNKNOWN}(t.status);i(new Ur(e,t.message))}else i(new Ur(Vr.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Ur(Vr.UNAVAILABLE,"Connection failed."));break;default:Qr()}}finally{$r("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Fi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new yr,s=we(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};var o;this.useFetchStreams&&(i.xmlHttpFactory=new Lr({})),this.ki(i.initMessageHeaders,e),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(c())||"object"==typeof navigator&&"ReactNative"===navigator.product||c().indexOf("Electron/")>=0||function(){var t=c();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||c().indexOf("MSAppHost/")>=0||"object"==typeof(o="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==o.id||(i.httpHeadersOverwriteParam="$httpHeaders");const a=n.join("");$r("Connection","Creating WebChannel: "+a,i);const u=r.createWebChannel(a,i);let h=!1,l=!1;const d=new Lu({Ei:t=>{l?$r("Connection","Not sending because WebChannel is closed:",t):(h||($r("Connection","Opening WebChannel transport."),u.open(),h=!0),$r("Connection","WebChannel sending:",t),u.send(t))},Ti:()=>u.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(u,Or.EventType.OPEN,(()=>{l||$r("Connection","WebChannel transport opened.")})),f(u,Or.EventType.CLOSE,(()=>{l||(l=!0,$r("Connection","WebChannel transport closed"),d.Vi())})),f(u,Or.EventType.ERROR,(t=>{l||(l=!0,jr("Connection","WebChannel transport errored:",t),d.Vi(new Ur(Vr.UNAVAILABLE,"The operation could not be completed")))})),f(u,Or.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];zr(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){$r("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=eo[t];if(void 0!==e)return so(e)}(t),n=s.message;void 0===e&&(e=Vr.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),l=!0,d.Vi(new Ur(e,n)),u.close()}else $r("Connection","WebChannel received:",n),d.Si(n)}})),f(s,Cr.STAT_EVENT,(t=>{t.stat===kr?$r("Connection","Detected buffering proxy"):t.stat===Rr&&$r("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.vi()}),0),d}}
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
     */function Mu(){return"undefined"!=typeof window?window:null}function Pu(){return"undefined"!=typeof document?document:null}
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
     */function Fu(t){return new Ro(t,!0)}class Vu{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Se=t,this.timerId=e,this.Mi=n,this.Li=r,this.Bi=s,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}Qi(){this.Ui=this.Bi}ji(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&$r("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Mi&&(this.Ui=this.Mi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
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
     */class Uu{constructor(t,e,n,r,s,i){this.Se=t,this.zi=n,this.Hi=r,this.Ji=s,this.listener=i,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new Vu(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ar(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ar(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ar(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===Vr.RESOURCE_EXHAUSTED?(Kr(e.toString()),Kr("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===Vr.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ur(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ur(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new Ur(Vr.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return $r("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():($r("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class qu extends Uu{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.R=r}wr(t){return this.Hi.Fi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(t){return"NO_CHANGE"===t?0:"ADD"===t?1:"REMOVE"===t?2:"CURRENT"===t?3:"RESET"===t?4:Qr()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(t,e){return t.I?(zr(void 0===e||"string"==typeof e),hs.fromBase64String(e||"")):(zr(void 0===e||e instanceof Uint8Array),hs.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(t){const e=void 0===t.code?Vr.UNKNOWN:so(t.code);return new Ur(e,t.message||"")}(o);n=new So(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=qo(t,r.document.name),i=Po(r.document.updateTime),o=new Ps({mapValue:{fields:r.document.fields}}),a=Vs.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new Io(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=qo(t,r.document),i=r.readTime?Po(r.readTime):es.min(),o=Vs.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Io([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=qo(t,r.document),i=r.removedTargetIds||[];n=new Io([],i,s,null)}else{if(!("filter"in e))return Qr();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new to(r),i=t.targetId;n=new _o(i,s)}}return n}(this.R,t),n=function(t){if(!("targetChange"in t))return es.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?es.min():e.readTime?Po(e.readTime):es.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=Ko(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=Ks(r)?{documents:Wo(t,r)}:{query:Yo(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Oo(t,e.resumeToken):e.snapshotVersion.compareTo(es.min())>0&&(n.readTime=Lo(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Qr()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=Ko(this.R),e.removeTarget=t,this.cr(e)}}class Bu extends Uu{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ur(){this.yr&&this.Er([])}wr(t){return this.Hi.Fi("Write",t)}onMessage(t){if(zr(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(zr(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?Po(t.updateTime):Po(e);return n.isEqual(es.min())&&(n=Po(e)),new Vi(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=Po(t.commitTime);return this.listener.Tr(n,e)}return zr(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=Ko(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>zo(this.R,t)))};this.cr(e)}}
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
     */class $u extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new Ur(Vr.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Vr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Ur(Vr.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Vr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Ur(Vr.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class Ku{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(Kr(e),this.Vr=!1):$r("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
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
     */class ju{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Fr=new Set,this.Mr=[],this.Lr=s,this.Lr.di((t=>{n.enqueueAndForget((async()=>{Zu(this)&&($r("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Hr(t);e.Fr.add(4),await Qu(e),e.Br.set("Unknown"),e.Fr.delete(4),await Gu(e)}(this))}))})),this.Br=new Ku(n,r)}}async function Gu(t){if(Zu(t))for(const e of t.Mr)await e(!0)}async function Qu(t){for(const e of t.Mr)await e(!1)}function zu(t,e){const n=Hr(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),Ju(n)?Xu(n):ph(n).er()&&Wu(n,e))}function Hu(t,e){const n=Hr(t),r=ph(n);n.Or.delete(e),r.er()&&Yu(n,e),0===n.Or.size&&(r.er()?r.ir():Zu(n)&&n.Br.set("Unknown"))}function Wu(t,e){t.Ur.q(e.targetId),ph(t).mr(e)}function Yu(t,e){t.Ur.q(e),ph(t).gr(e)}function Xu(t){t.Ur=new No({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),ph(t).start(),t.Br.Sr()}function Ju(t){return Zu(t)&&!ph(t).tr()&&t.Or.size>0}function Zu(t){return 0===Hr(t).Fr.size}function th(t){t.Ur=void 0}async function eh(t){t.Or.forEach(((e,n)=>{Wu(t,e)}))}async function nh(t,e){th(t),Ju(t)?(t.Br.Nr(e),Xu(t)):t.Br.set("Unknown")}async function rh(t,e,n){if(t.Br.set("Online"),e instanceof So&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(n){$r("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await sh(t,n)}else if(e instanceof Io?t.Ur.X(e):e instanceof _o?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(es.min()))try{const e=await tu(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.at(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Or.get(r);s&&t.Or.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(hs.EMPTY_BYTE_STRING,n.snapshotVersion)),Yu(t,e);const r=new za(n.target,e,1,n.sequenceNumber);Wu(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){$r("RemoteStore","Failed to raise snapshot:",e),await sh(t,e)}}async function sh(t,e,n){if(!Va(e))throw e;t.Fr.add(1),await Qu(t),t.Br.set("Offline"),n||(n=()=>tu(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{$r("RemoteStore","Retrying IndexedDB access"),await n(),t.Fr.delete(1),await Gu(t)}))}function ih(t,e){return e().catch((n=>sh(t,n,e)))}async function oh(t){const e=Hr(t),n=yh(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;ah(e);)try{const t=await nu(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,ch(e,t)}catch(t){await sh(e,t)}uh(e)&&hh(e)}function ah(t){return Zu(t)&&t.$r.length<10}function ch(t,e){t.$r.push(e);const n=yh(t);n.er()&&n.pr&&n.Er(e.mutations)}function uh(t){return Zu(t)&&!yh(t).tr()&&t.$r.length>0}function hh(t){yh(t).start()}async function lh(t){yh(t).Ar()}async function dh(t){const e=yh(t);for(const n of t.$r)e.Er(n.mutations)}async function fh(t,e,n){const r=t.$r.shift(),s=Qa.from(r,e,n);await ih(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await oh(t)}async function mh(t,e){e&&yh(t).pr&&await async function(t,e){if(ro(n=e.code)&&n!==Vr.ABORTED){const n=t.$r.shift();yh(t).sr(),await ih(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await oh(t)}var n}(t,e),uh(t)&&hh(t)}async function gh(t,e){const n=Hr(t);e?(n.Fr.delete(2),await Gu(n)):e||(n.Fr.add(2),await Qu(n),n.Br.set("Unknown"))}function ph(t){return t.qr||(t.qr=function(t,e,n){const r=Hr(t);return r.Pr(),new qu(e,r.Hi,r.credentials,r.R,n)
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
     */}(t.datastore,t.asyncQueue,{Ii:eh.bind(null,t),Ri:nh.bind(null,t),_r:rh.bind(null,t)}),t.Mr.push((async e=>{e?(t.qr.sr(),Ju(t)?Xu(t):t.Br.set("Unknown")):(await t.qr.stop(),th(t))}))),t.qr}function yh(t){return t.Kr||(t.Kr=function(t,e,n){const r=Hr(t);return r.Pr(),new Bu(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:lh.bind(null,t),Ri:mh.bind(null,t),Ir:dh.bind(null,t),Tr:fh.bind(null,t)}),t.Mr.push((async e=>{e?(t.Kr.sr(),await oh(t)):(await t.Kr.stop(),t.$r.length>0&&($r("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
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
     */}class wh{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new Ra,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new wh(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Ur(Vr.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function vh(t,e){if(Kr("AsyncQueue",`${e}: ${t}`),Va(t))return new Ur(Vr.UNAVAILABLE,`${e}: ${t}`);throw t}
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
     */class bh{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Es.comparator(e.key,n.key):(t,e)=>Es.comparator(t.key,e.key),this.keyedMap=mo(),this.sortedSet=new io(this.comparator)}static emptySet(t){return new bh(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof bh))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new bh;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
     */class Eh{constructor(){this.Qr=new io(Es.comparator)}track(t){const e=t.doc.key,n=this.Qr.get(e);n?0!==t.type&&3===n.type?this.Qr=this.Qr.insert(e,t):3===t.type&&1!==n.type?this.Qr=this.Qr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Qr=this.Qr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Qr=this.Qr.remove(e):1===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):Qr():this.Qr=this.Qr.insert(e,t)}jr(){const t=[];return this.Qr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class Th{constructor(t,e,n,r,s,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const s=[];return e.forEach((t=>{s.push({type:0,doc:t})})),new Th(t,e,bh.emptySet(e),s,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&pi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
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
     */class Ih{constructor(){this.Wr=void 0,this.listeners=[]}}class _h{constructor(){this.queries=new Lc((t=>yi(t)),pi),this.onlineState="Unknown",this.Gr=new Set}}async function Sh(t,e){const n=Hr(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new Ih),s)try{i.Wr=await n.onListen(r)}catch(t){const n=vh(t,`Initialization of query '${wi(e.query)}' failed`);return void e.onError(n)}n.queries.set(r,i),i.listeners.push(e),e.zr(n.onlineState),i.Wr&&e.Hr(i.Wr)&&xh(n)}async function Ah(t,e){const n=Hr(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function Nh(t,e){const n=Hr(t);let r=!1;for(const t of e){const e=t.query,s=n.queries.get(e);if(s){for(const e of s.listeners)e.Hr(t)&&(r=!0);s.Wr=t}}r&&xh(n)}function Dh(t,e,n){const r=Hr(t),s=r.queries.get(e);if(s)for(const t of s.listeners)t.onError(n);r.queries.delete(e)}function xh(t){t.Gr.forEach((t=>{t.next()}))}class Ch{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Th(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=Th.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
     */class kh{constructor(t,e){this.payload=t,this.byteLength=e}io(){return"metadata"in this.payload}}
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
     */class Rh{constructor(t){this.R=t}Un(t){return qo(this.R,t)}qn(t){return t.metadata.exists?Qo(this.R,t.document,!1):Vs.newNoDocument(this.Un(t.metadata.name),this.Kn(t.metadata.readTime))}Kn(t){return Po(t)}}class Lh{constructor(t,e,n){this.ro=t,this.localStore=e,this.R=n,this.queries=[],this.documents=[],this.progress=Oh(t)}oo(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;return t.payload.namedQuery?this.queries.push(t.payload.namedQuery):t.payload.documentMetadata?(this.documents.push({metadata:t.payload.documentMetadata}),t.payload.documentMetadata.exists||++e):t.payload.document&&(this.documents[this.documents.length-1].document=t.payload.document,++e),e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}co(t){const e=new Map,n=new Rh(this.R);for(const r of t)if(r.metadata.queries){const t=n.Un(r.metadata.name);for(const n of r.metadata.queries){const r=(e.get(n)||wo()).add(t);e.set(n,r)}}return e}async complete(){const t=await async function(t,e,n,r){const s=Hr(t);let i=wo(),o=lo(),a=po();for(const t of n){const n=e.Un(t.metadata.name);t.document&&(i=i.add(n)),o=o.insert(n,e.qn(t)),a=a.insert(n,e.Kn(t.metadata.readTime))}const c=s.Fn.newChangeBuffer({trackRemovals:!0}),u=await ru(s,function(t){return mi(ai(os.fromString(`__bundle__/docs/${t}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(t=>eu(t,c,o,es.min(),a).next((e=>(c.apply(t),e))).next((e=>s.Ue.removeMatchingKeysForTargetId(t,u.targetId).next((()=>s.Ue.addMatchingKeys(t,i,u.targetId))).next((()=>s.Mn.En(t,e))).next((()=>e))))))}(this.localStore,new Rh(this.R),this.documents,this.ro.id),e=this.co(this.documents);for(const t of this.queries)await cu(this.localStore,t,e.get(t.name));return this.progress.taskState="Success",new zc(Object.assign({},this.progress),t)}}function Oh(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}
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
     */class Mh{constructor(t){this.key=t}}class Ph{constructor(t){this.key=t}}class Fh{constructor(t,e){this.query=t,this.ao=e,this.uo=null,this.current=!1,this.ho=wo(),this.mutatedKeys=wo(),this.lo=bi(t),this.fo=new bh(this.lo)}get wo(){return this.ao}_o(t,e){const n=e?e.mo:new Eh,r=e?e.fo:this.fo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=ci(this.query)&&r.size===this.query.limit?r.last():null,c=ui(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=vi(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),ci(this.query)||ui(this.query))for(;i.size>this.query.limit;){const t=ci(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{fo:i,mo:n,Nn:o,mutatedKeys:s}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const s=t.mo.jr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Qr()}};return n(t)-n(e)}
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
     */(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const i=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.uo;return this.uo=o,0!==s.length||a?{snapshot:new Th(this.query,t.fo,r,s,t.mutatedKeys,0===o,a,!1),To:i}:{To:i}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new Eh,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.ao.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.ao=this.ao.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.ao=this.ao.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=wo(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new Ph(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new Mh(n))})),e}Ao(t){this.ao=t.Bn,this.ho=wo();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return Th.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.uo)}}class Vh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Uh{constructor(t){this.key=t,this.Po=!1}}class qh{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.bo={},this.vo=new Lc((t=>yi(t)),pi),this.Vo=new Map,this.So=new Set,this.Do=new io(Es.comparator),this.Co=new Map,this.No=new hu,this.xo={},this.ko=new Map,this.$o=Ec.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function Bh(t,e){const n=fl(t);let r,s;const i=n.vo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Ro();else{const t=await ru(n.localStore,mi(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await $h(n,e,r,"current"===i),n.isPrimaryClient&&zu(n.remoteStore,t)}return s}async function $h(t,e,n,r){t.Fo=(e,n,r)=>async function(t,e,n,r){let s=e.view._o(n);s.Nn&&(s=await iu(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return Zh(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const s=await iu(t.localStore,e,!0),i=new Fh(e,s.Bn),o=i._o(s.documents),a=To.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);Zh(t,n,c.To);const u=new Vh(e,n,i);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}async function Kh(t,e){const n=Hr(t),r=n.vo.get(e),s=n.Vo.get(r.targetId);if(s.length>1)return n.Vo.set(r.targetId,s.filter((t=>!pi(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await su(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Hu(n.remoteStore,r.targetId),Xh(n,r.targetId)})).catch(Ac)):(Xh(n,r.targetId),await su(n.localStore,r.targetId,!0))}async function jh(t,e){const n=Hr(t);try{const t=await function(t,e){const n=Hr(t),r=e.snapshotVersion;let s=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Fn.newChangeBuffer({trackRemovals:!0});s=n.kn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const u=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,u),function(t,e,n){return zr(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize()||e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,e)&&o.push(n.Ue.updateTargetData(t,u))}}));let a=lo();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(eu(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(es.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return La.waitFor(o).next((()=>i.apply(t))).next((()=>n.Mn.En(t,a))).next((()=>a))})).then((t=>(n.kn=s,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(zr(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?zr(r.Po):t.removedDocuments.size>0&&(zr(r.Po),r.Po=!1))})),await nl(n,t,e)}catch(t){await Ac(t)}}function Gh(t,e,n){const r=Hr(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const s=r.view.zr(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=Hr(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.zr(e)&&(r=!0)})),r&&xh(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Qh(t,e,n){const r=Hr(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Co.get(e),i=s&&s.key;if(i){let t=new io(Es.comparator);t=t.insert(i,Vs.newNoDocument(i,es.min()));const n=wo().add(i),s=new Eo(es.min(),new Map,new co(Xr),t,n);await jh(r,s),r.Do=r.Do.remove(i),r.Co.delete(e),el(r)}else await su(r.localStore,e,!1).then((()=>Xh(r,e,n))).catch(Ac)}async function zh(t,e){const n=Hr(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Fn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=La.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);zr(null!==i),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(n.localStore,e);Yh(n,r,null),Wh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await nl(n,t)}catch(t){await Ac(t)}}async function Hh(t,e,n){const r=Hr(t);try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(zr(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(r.localStore,e);Yh(r,e,n),Wh(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await nl(r,t)}catch(n){await Ac(n)}}function Wh(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function Yh(t,e,n){const r=Hr(t);let s=r.xo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.xo[r.currentUser.toKey()]=s}}function Xh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Mo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||Jh(t,e)}))}function Jh(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(Hu(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),el(t))}function Zh(t,e,n){for(const r of n)r instanceof Mh?(t.No.addReference(r.key,e),tl(t,r)):r instanceof Ph?($r("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||Jh(t,r.key)):Qr()}function tl(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||($r("SyncEngine","New document in limbo: "+n),t.So.add(r),el(t))}function el(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new Es(os.fromString(e)),r=t.$o.next();t.Co.set(r,new Uh(n)),t.Do=t.Do.insert(n,r),zu(t.remoteStore,new za(mi(ai(n.path)),r,2,Fr.o))}}async function nl(t,e,n){const r=Hr(t),s=[],i=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Fo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=Wc.vn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.bo._r(s),await async function(t,e){const n=Hr(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>La.forEach(e,(e=>La.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>La.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!Va(t))throw t;$r("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.kn.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(e,s)}}}(r.localStore,i))}async function rl(t,e){const n=Hr(t);if(!n.currentUser.isEqual(e)){$r("SyncEngine","User change. New user:",e.toKey());const t=await Zc(n.localStore,e);n.currentUser=e,function(t,e){t.ko.forEach((t=>{t.forEach((t=>{t.reject(new Ur(Vr.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.ko.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await nl(n,t.Ln)}}function sl(t,e){const n=Hr(t),r=n.Co.get(e);if(r&&r.Po)return wo().add(r.key);{let t=wo();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}async function il(t,e){const n=Hr(t),r=await iu(n.localStore,e.query,!0),s=e.view.Ao(r);return n.isPrimaryClient&&Zh(n,e.targetId,s.To),s}async function ol(t){const e=Hr(t);return au(e.localStore).then((t=>nl(e,t)))}async function al(t,e,n,r){const s=Hr(t),i=await function(t,e){const n=Hr(t),r=Hr(n._n);return n.persistence.runTransaction("Lookup mutation documents","readonly",(t=>r.jt(t,e).next((e=>e?n.Mn.pn(t,e):La.resolve(null)))))}(s.localStore,e);null!==i?("pending"===n?await oh(s.remoteStore):"acknowledged"===n||"rejected"===n?(Yh(s,e,r||null),Wh(s,e),function(t,e){Hr(Hr(t)._n).Gt(e)}(s.localStore,e)):Qr(),await nl(s,i)):$r("SyncEngine","Cannot apply mutation batch with id: "+e)}async function cl(t,e,n){const r=Hr(t),s=[],i=[];for(const t of e){let e;const n=r.Vo.get(t);if(n&&0!==n.length){e=await ru(r.localStore,mi(n[0]));for(const t of n){const e=r.vo.get(t),n=await il(r,e);n.snapshot&&i.push(n.snapshot)}}else{const n=await ou(r.localStore,t);e=await ru(r.localStore,n),await $h(r,ul(n),t,!1)}s.push(e)}return r.bo._r(i),s}function ul(t){return oi(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function hl(t){const e=Hr(t);return Hr(Hr(e.localStore).persistence).fn()}async function ll(t,e,n,r){const s=Hr(t);if(s.Oo)$r("SyncEngine","Ignoring unexpected query state notification.");else if(s.Vo.has(e))switch(n){case"current":case"not-current":{const t=await au(s.localStore),r=Eo.createSynthesizedRemoteEventForCurrentChange(e,"current"===n);await nl(s,t,r);break}case"rejected":await su(s.localStore,e,!0),Xh(s,e,r);break;default:Qr()}}async function dl(t,e,n){const r=fl(t);if(r.Oo){for(const t of e){if(r.Vo.has(t)){$r("SyncEngine","Adding an already active target "+t);continue}const e=await ou(r.localStore,t),n=await ru(r.localStore,e);await $h(r,ul(e),n.targetId,!1),zu(r.remoteStore,n)}for(const t of n)r.Vo.has(t)&&await su(r.localStore,t,!1).then((()=>{Hu(r.remoteStore,t),Xh(r,t)})).catch(Ac)}}function fl(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=jh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=sl.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Qh.bind(null,e),e.bo._r=Nh.bind(null,e.eventManager),e.bo.Mo=Dh.bind(null,e.eventManager),e}function ml(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=zh.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Hh.bind(null,e),e}class gl{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=Fu(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return Jc(this.persistence,new Yc,t.initialUser,this.R)}Uo(t){return new pu(wu.Ps,this.R)}Bo(t){return new xu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class pl extends gl{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await async function(t){const e=Hr(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Vc(t);let n=es.min();return e.Ot({index:ba.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=Ja(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}(this.localStore),await this.Qo.initialize(this,t),await ml(this.Qo.syncEngine),await oh(this.Qo.remoteStore)}Ko(t){return Jc(this.persistence,new Yc,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new xc(e,t.asyncQueue)}Uo(t){const e=Qc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?fc.withCacheSize(this.cacheSizeBytes):fc.DEFAULT;return new Kc(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Mu(),Pu(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new xu}}class yl extends pl{constructor(t,e){super(t,e,!1),this.Qo=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Qo.syncEngine;this.sharedClientState instanceof Du&&(this.sharedClientState.syncEngine={ai:al.bind(null,e),ui:ll.bind(null,e),hi:dl.bind(null,e),fn:hl.bind(null,e),ci:ol.bind(null,e)},await this.sharedClientState.start()),await this.persistence.He((async t=>{await async function(t,e){const n=Hr(t);if(fl(n),ml(n),!0===e&&!0!==n.Oo){const t=n.sharedClientState.getAllActiveQueryTargets(),e=await cl(n,t.toArray());n.Oo=!0,await gh(n.remoteStore,!0);for(const t of e)zu(n.remoteStore,t)}else if(!1===e&&!1!==n.Oo){const t=[];let e=Promise.resolve();n.Vo.forEach(((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?t.push(s):e=e.then((()=>(Xh(n,s),su(n.localStore,s,!0)))),Hu(n.remoteStore,s)})),await e,await cl(n,t),function(t){const e=Hr(t);e.Co.forEach(((t,n)=>{Hu(e.remoteStore,n)})),e.No.ts(),e.Co=new Map,e.Do=new io(Es.comparator)}(n),n.Oo=!1,await gh(n.remoteStore,!1)}}(this.Qo.syncEngine,t),this.gcScheduler&&(t&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):t||this.gcScheduler.stop())}))}Bo(t){const e=Mu();if(!Du.gt(e))throw new Ur(Vr.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Qc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Du(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class wl{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Gh(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=rl.bind(null,this.syncEngine),await gh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new _h}createDatastore(t){const e=Fu(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Ou(r));var r;return function(t,e,n){return new $u(t,e,n)}(t.credentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Gh(this.syncEngine,t,0),i=ku.gt()?new ku:new Cu,new ju(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new qh(t,e,n,r,s,i);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Hr(t);$r("RemoteStore","RemoteStore shutting down."),e.Fr.add(5),await Qu(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
     */function vl(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}
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
     */class bl{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.jo(this.observer.next,t)}error(t){this.observer.error?this.jo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}jo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
     */class El{constructor(t,e){this.Go=t,this.R=e,this.metadata=new Ra,this.buffer=new Uint8Array,this.zo=new TextDecoder("utf-8"),this.Ho().then((t=>{t&&t.io()?this.metadata.resolve(t.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==t?void 0:t.payload)}`))}),(t=>this.metadata.reject(t)))}close(){return this.Go.cancel()}async getMetadata(){return this.metadata.promise}async Lo(){return await this.getMetadata(),this.Ho()}async Ho(){const t=await this.Jo();if(null===t)return null;const e=this.zo.decode(t),n=Number(e);isNaN(n)&&this.Yo(`length string (${e}) is not valid number`);const r=await this.Xo(n);return new kh(JSON.parse(r),t.length+n)}Zo(){return this.buffer.findIndex((t=>t==="{".charCodeAt(0)))}async Jo(){for(;this.Zo()<0&&!await this.tc(););if(0===this.buffer.length)return null;const t=this.Zo();t<0&&this.Yo("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async Xo(t){for(;this.buffer.length<t;)await this.tc()&&this.Yo("Reached the end of bundle when more is expected.");const e=this.zo.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Yo(t){throw this.Go.cancel(),new Error(`Invalid bundle format: ${t}`)}async tc(){const t=await this.Go.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}
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
     */class Tl{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new Ur(Vr.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(t,e){const n=Hr(t),r=Ko(n.R)+"/documents",s={documents:e.map((t=>Uo(n.R,t)))},i=await n.Oi("BatchGetDocuments",r,s),o=new Map;i.forEach((t=>{const e=function(t,e){return"found"in e?function(t,e){zr(!!e.found),e.found.name,e.found.updateTime;const n=qo(t,e.found.name),r=Po(e.found.updateTime),s=new Ps({mapValue:{fields:e.found.fields}});return Vs.newFoundDocument(n,r,s)}(t,e):"missing"in e?function(t,e){zr(!!e.missing),zr(!!e.readTime);const n=qo(t,e.missing),r=Po(e.readTime);return Vs.newNoDocument(n,r)}(t,e):Qr()}(n.R,t);o.set(e.key.toString(),e)}));const a=[];return e.forEach((t=>{const e=o.get(t.toString());zr(!!e),a.push(e)})),a}(this.datastore,t);return e.forEach((t=>this.recordVersion(t))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastWriteError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new Ji(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((t,e)=>{const n=Es.fromPath(e);this.mutations.push(new Zi(n,this.precondition(n)))})),await async function(t,e){const n=Hr(t),r=Ko(n.R)+"/documents",s={writes:e.map((t=>zo(n.R,t)))};await n.Ni("Commit",r,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw Qr();e=es.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new Ur(Vr.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?Ui.updateTime(e):Ui.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(es.min()))throw new Ur(Vr.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ui.updateTime(e)}return Ui.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
     */class Il{constructor(t,e,n,r){this.asyncQueue=t,this.datastore=e,this.updateFunction=n,this.deferred=r,this.ec=5,this.Zi=new Vu(this.asyncQueue,"transaction_retry")}run(){this.nc()}nc(){this.Zi.ji((async()=>{const t=new Tl(this.datastore),e=this.sc(t);e&&e.then((e=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(e)})).catch((t=>{this.ic(t)}))))})).catch((t=>{this.ic(t)}))}))}sc(t){try{const e=this.updateFunction(t);return!ws(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}ic(t){this.ec>0&&this.rc(t)?(this.ec-=1,this.asyncQueue.enqueueAndForget((()=>(this.nc(),Promise.resolve())))):this.deferred.reject(t)}rc(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||!ro(e)}return!1}}
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
     */class _l{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=vu.UNAUTHENTICATED,this.clientId=Yr.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{$r("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Ur(Vr.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ra;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=vh(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Sl(t,e){t.asyncQueue.verifyOperationInProgress(),$r("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await Zc(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Al(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Nl(t);$r("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=Hr(t);n.asyncQueue.verifyOperationInProgress(),$r("RemoteStore","RemoteStore received new credentials");const r=Zu(n);n.Fr.add(3),await Qu(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Fr.delete(3),await Gu(n)}(e.remoteStore,t))),t.onlineComponents=e}async function Nl(t){return t.offlineComponents||($r("FirestoreClient","Using default OfflineComponentProvider"),await Sl(t,new gl)),t.offlineComponents}async function Dl(t){return t.onlineComponents||($r("FirestoreClient","Using default OnlineComponentProvider"),await Al(t,new wl)),t.onlineComponents}function xl(t){return Nl(t).then((t=>t.persistence))}function Cl(t){return Nl(t).then((t=>t.localStore))}function kl(t){return Dl(t).then((t=>t.remoteStore))}function Rl(t){return Dl(t).then((t=>t.syncEngine))}async function Ll(t){const e=await Dl(t),n=e.eventManager;return n.onListen=Bh.bind(null,e.syncEngine),n.onUnlisten=Kh.bind(null,e.syncEngine),n}function Ol(t,e,n={}){const r=new Ra;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new bl({next:i=>{e.enqueueAndForget((()=>Ah(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new Ur(Vr.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new Ur(Vr.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new Ch(ai(n.path),i,{includeMetadataChanges:!0,so:!0});return Sh(t,o)}(await Ll(t),t.asyncQueue,e,n,r))),r.promise}function Ml(t,e,n={}){const r=new Ra;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new bl({next:n=>{e.enqueueAndForget((()=>Ah(t,o))),n.fromCache&&"server"===r.source?s.reject(new Ur(Vr.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new Ch(n,i,{includeMetadataChanges:!0,so:!0});return Sh(t,o)}(await Ll(t),t.asyncQueue,e,n,r))),r.promise}function Pl(t,e,n,r){const s=function(t,e){let n;return n="string"==typeof t?(new TextEncoder).encode(t):t,function(t,e){return new El(t,e)}(function(t,e){if(t instanceof Uint8Array)return vl(t,e);if(t instanceof ArrayBuffer)return vl(new Uint8Array(t),e);if(t instanceof ReadableStream)return t.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),e)}
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
     */(n,Fu(e));t.asyncQueue.enqueueAndForget((async()=>{!function(t,e,n){const r=Hr(t);(async function(t,e,n){try{const r=await e.getMetadata();if(await function(t,e){const n=Hr(t),r=Po(e.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",(t=>n.Ke.getBundleMetadata(t,e.id))).then((t=>!!t&&t.createTime.compareTo(r)>=0))}(t.localStore,r))return await e.close(),void n._completeWith(function(t){return{taskState:"Success",documentsLoaded:t.totalDocuments,bytesLoaded:t.totalBytes,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}(r));n._updateProgress(Oh(r));const s=new Lh(r,t.localStore,e.R);let i=await e.Lo();for(;i;){const t=await s.oo(i);t&&n._updateProgress(t),i=await e.Lo()}const o=await s.complete();await nl(t,o.wn,void 0),await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Save bundle","readwrite",(t=>n.Ke.saveBundleMetadata(t,e)))}(t.localStore,r),n._completeWith(o.progress)}catch(t){jr("SyncEngine",`Loading bundle failed with ${t}`),n._failWith(t)}}
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
     */)(r,e,n).then((()=>{r.sharedClientState.notifyBundleLoaded()}))}(await Rl(t),s,r)}))}class Fl{constructor(t,e,n,r,s,i,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Vl{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Vl&&t.projectId===this.projectId&&t.database===this.database}}
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
     */const Ul=new Map;
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
     */class ql{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Bl{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(vu.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class $l{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}removeChangeListener(){this.changeListener=null}}class Kl{constructor(t){this.currentUser=vu.UNAUTHENTICATED,this.oc=new Ra,this.cc=0,this.changeListener=()=>Promise.resolve(),this.ac=!1,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.hc(),this.oc.resolve(),this.ac&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{$r("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.lc(),this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):this.ac&&($r("FirebaseCredentialsProvider","Auth not yet detected"),this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser))))}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?($r("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(zr("string"==typeof e.accessToken),new ql(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.ac=!0,this.asyncQueue=t,this.changeListener=e}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}hc(){const t=this.auth&&this.auth.getUid();return zr(null===t||"string"==typeof t),new vu(t)}lc(){this.ac&&(this.ac=!1,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await this.changeListener(this.currentUser),this.ac=!0})))}}class jl{constructor(t,e,n){this.fc=t,this.dc=e,this.wc=n,this.type="FirstParty",this.user=vu.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.dc},e=this.fc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.wc&&(t["X-Goog-Iam-Authorization-Token"]=this.wc),t}}class Gl{constructor(t,e,n){this.fc=t,this.dc=e,this.wc=n}getToken(){return Promise.resolve(new jl(this.fc,this.dc,this.wc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(vu.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
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
     */function Ql(t,e,n){if(!n)throw new Ur(Vr.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function zl(t){if(!Es.isDocumentKey(t))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Hl(t){if(Es.isDocumentKey(t))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Wl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Qr()}function Yl(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Ur(Vr.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Wl(t);throw new Ur(Vr.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function Xl(t,e){if(e<=0)throw new Ur(Vr.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}
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
     */class Jl{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Ur(Vr.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Ur(Vr.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,function(t,e,n,r){if(!0===e&&!0===r)throw new Ur(Vr.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}
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
     */class Zl{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jl({}),this._settingsFrozen=!1,t instanceof Vl?(this._databaseId=t,this._credentials=new Bl):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Ur(Vr.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vl(t.options.projectId)}(t),this._credentials=new Kl(e))}get app(){if(!this._app)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jl(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Bl;switch(t.type){case"gapi":const e=t.client;return zr(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Gl(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Ur(Vr.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Ul.get(t);e&&($r("ComponentProvider","Removing Datastore"),Ul.delete(t),e.terminate())}(this),Promise.resolve()}}function td(t,e,n,r={}){const s=(t=Yl(t,Zl))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==e&&jr("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},s),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){const e=
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
function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var n=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var o=i({iss:"https://securetoken.google.com/"+n,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[a.encodeString(JSON.stringify({alg:"none",type:"JWT"}),!1),a.encodeString(JSON.stringify(o),!1),""].join(".")}(r.mockUserToken),n=r.mockUserToken.sub||r.mockUserToken.user_id;if(!n)throw new Ur(Vr.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");t._credentials=new $l(new ql(e,new vu(n)))}}
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
     */class ed{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new rd(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ed(this.firestore,t,this._key)}}class nd{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new nd(this.firestore,t,this._query)}}class rd extends nd{constructor(t,e,n){super(t,e,ai(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ed(this.firestore,null,new Es(t))}withConverter(t){return new rd(this.firestore,t,this._path)}}function sd(t,e,...n){if(t=f(t),Ql("collection","path",e),t instanceof Zl){const r=os.fromString(e,...n);return Hl(r),new rd(t,null,r)}{if(!(t instanceof ed||t instanceof rd))throw new Ur(Vr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=os.fromString(t.path,...n).child(os.fromString(e));return Hl(r),new rd(t.firestore,null,r)}}function id(t,e,...n){if(t=f(t),1===arguments.length&&(e=Yr.u()),Ql("doc","path",e),t instanceof Zl){const r=os.fromString(e,...n);return zl(r),new ed(t,null,new Es(r))}{if(!(t instanceof ed||t instanceof rd))throw new Ur(Vr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(os.fromString(e,...n));return zl(r),new ed(t.firestore,t instanceof rd?t.converter:null,new Es(r))}}function od(t,e){return t=f(t),e=f(e),(t instanceof ed||t instanceof rd)&&(e instanceof ed||e instanceof rd)&&t.firestore===e.firestore&&t.path===e.path&&t.converter===e.converter}function ad(t,e){return t=f(t),e=f(e),t instanceof nd&&e instanceof nd&&t.firestore===e.firestore&&pi(t._query,e._query)&&t.converter===e.converter
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
     */}class cd{constructor(){this._c=Promise.resolve(),this.mc=[],this.gc=!1,this.yc=[],this.Ec=null,this.Tc=!1,this.Ic=[],this.Zi=new Vu(this,"async_queue_retry"),this.Ac=()=>{const t=Pu();t&&$r("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=Pu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Ac)}get isShuttingDown(){return this.gc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Rc(),this.Pc(t)}enterRestrictedMode(){if(!this.gc){this.gc=!0;const t=Pu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Ac)}}enqueue(t){return this.Rc(),this.gc?new Promise((t=>{})):this.Pc(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.mc.push(t),this.bc())))}async bc(){if(0!==this.mc.length){try{await this.mc[0](),this.mc.shift(),this.Zi.reset()}catch(t){if(!Va(t))throw t;$r("AsyncQueue","Operation failed with retryable error: "+t)}this.mc.length>0&&this.Zi.ji((()=>this.bc()))}}Pc(t){const e=this._c.then((()=>(this.Tc=!0,t().catch((t=>{throw this.Ec=t,this.Tc=!1,Kr("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
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
     */(t)),t})).then((t=>(this.Tc=!1,t))))));return this._c=e,e}enqueueAfterDelay(t,e,n){this.Rc(),this.Ic.indexOf(t)>-1&&(e=0);const r=wh.createAndSchedule(this,t,e,n,(t=>this.vc(t)));return this.yc.push(r),r}Rc(){this.Ec&&Qr()}verifyOperationInProgress(){}async Vc(){let t;do{t=this._c,await t}while(t!==this._c)}Sc(t){for(const e of this.yc)if(e.timerId===t)return!0;return!1}Dc(t){return this.Vc().then((()=>{this.yc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.yc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Vc()}))}Cc(t){this.Ic.push(t)}vc(t){const e=this.yc.indexOf(t);this.yc.splice(e,1)}}function ud(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t)}class hd{constructor(){this._progressObserver={},this._taskCompletionResolver=new Ra,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}
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
     */class ld extends Zl{constructor(t,e){super(t,e),this.type="firestore",this._queue=new cd,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||fd(this),this._firestoreClient.terminate()}}function dd(t){return t._firestoreClient||fd(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function fd(t){var e;const n=t._freezeSettings(),r=function(t,e,n,r){return new Fl(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new _l(t._credentials,t._queue,r)}function md(t,e,n){const r=new Ra;return t.asyncQueue.enqueue((async()=>{try{await Sl(t,n),await Al(t,e),r.resolve()}catch(t){if(!function(t){return"FirebaseError"===t.name?t.code===Vr.FAILED_PRECONDITION||t.code===Vr.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||(22===t.code||20===t.code||11===t.code)}(t))throw t;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}})).then((()=>r.promise))}function gd(t){return function(t){const e=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e){const n=Hr(t);Zu(n.remoteStore)||$r("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const t=await function(t){const e=Hr(t);return e.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(t=>e._n.getHighestUnacknowledgedBatchId(t)))}(n.localStore);if(-1===t)return void e.resolve();const r=n.ko.get(t)||[];r.push(e),n.ko.set(t,r)}catch(t){const n=vh(t,"Initialization of waitForPendingWrites() operation failed");e.reject(n)}}(await Rl(t),e))),e.promise}(dd(t=Yl(t,ld)))}function pd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await xl(t),n=await kl(t);return e.setNetworkEnabled(!0),function(t){const e=Hr(t);return e.Fr.delete(0),Gu(e)}(n)}))}(dd(t=Yl(t,ld)))}function yd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await xl(t),n=await kl(t);return e.setNetworkEnabled(!1),async function(t){const e=Hr(t);e.Fr.add(0),await Qu(e),e.Br.set("Offline")}(n)}))}(dd(t=Yl(t,ld)))}function wd(t,e){return function(t,e){return t.asyncQueue.enqueue((async()=>function(t,e){const n=Hr(t);return n.persistence.runTransaction("Get named query","readonly",(t=>n.Ke.getNamedQuery(t,e)))}(await Cl(t),e)))}(dd(t=Yl(t,ld)),e).then((e=>e?new nd(t,null,e.query):null))}function vd(t){if(t._initialized||t._terminated)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
     */class bd{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new cs(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
     */class Ed{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ed(hs.fromBase64String(t))}catch(t){throw new Ur(Vr.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new Ed(hs.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
     */class Td{constructor(t){this._methodName=t}}
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
     */class Id{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Ur(Vr.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Ur(Vr.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Xr(this._lat,t._lat)||Xr(this._long,t._long)}}
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
     */const _d=/^__.*__$/;class Sd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Hi(t,this.data,this.fieldMask,e,this.fieldTransforms):new zi(t,this.data,e,this.fieldTransforms)}}class Ad{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new Hi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Nd(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Qr()}}class Dd{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Nc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get xc(){return this.settings.xc}kc(t){return new Dd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}$c(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Oc:!1});return r.Fc(t),r}Mc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Oc:!1});return r.Nc(),r}Lc(t){return this.kc({path:void 0,Oc:!0})}Bc(t){return Hd(t,this.settings.methodName,this.settings.Uc||!1,this.path,this.settings.qc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Nc(){if(this.path)for(let t=0;t<this.path.length;t++)this.Fc(this.path.get(t))}Fc(t){if(0===t.length)throw this.Bc("Document fields must not be empty");if(Nd(this.xc)&&_d.test(t))throw this.Bc('Document fields cannot begin and end with "__"')}}class xd{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||Fu(t)}Kc(t,e,n,r=!1){return new Dd({xc:t,methodName:e,qc:n,path:cs.emptyPath(),Oc:!1,Uc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function Cd(t){const e=t._freezeSettings(),n=Fu(t._databaseId);return new xd(t._databaseId,!!e.ignoreUndefinedProperties,n)}function kd(t,e,n,r,s,i={}){const o=t.Kc(i.merge||i.mergeFields?2:0,e,n,s);jd("Data must be an object, but it was:",o,r);const a=$d(r,o);let c,u;if(i.merge)c=new us(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=Gd(e,r,n);if(!o.contains(s))throw new Ur(Vr.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Wd(t,s)||t.push(s)}c=new us(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new Sd(new Ps(a),c,u)}class Rd extends Td{_toFieldTransform(t){if(2!==t.xc)throw 1===t.xc?t.Bc(`${this._methodName}() can only appear at the top level of your update data`):t.Bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Rd}}function Ld(t,e,n){return new Dd({xc:3,qc:e.settings.qc,methodName:t._methodName,Oc:n},e.databaseId,e.R,e.ignoreUndefinedProperties)}class Od extends Td{_toFieldTransform(t){return new Fi(t.path,new xi)}isEqual(t){return t instanceof Od}}class Md extends Td{constructor(t,e){super(t),this.Qc=e}_toFieldTransform(t){const e=Ld(this,t,!0),n=this.Qc.map((t=>Bd(t,e))),r=new Ci(n);return new Fi(t.path,r)}isEqual(t){return this===t}}class Pd extends Td{constructor(t,e){super(t),this.Qc=e}_toFieldTransform(t){const e=Ld(this,t,!0),n=this.Qc.map((t=>Bd(t,e))),r=new Ri(n);return new Fi(t.path,r)}isEqual(t){return this===t}}class Fd extends Td{constructor(t,e){super(t),this.jc=e}_toFieldTransform(t){const e=new Oi(t.R,_i(t.R,this.jc));return new Fi(t.path,e)}isEqual(t){return this===t}}function Vd(t,e,n,r){const s=t.Kc(1,e,n);jd("Data must be an object, but it was:",s,r);const i=[],o=Ps.empty();rs(r,((t,r)=>{const a=zd(e,t,n);r=f(r);const c=s.Mc(a);if(r instanceof Rd)i.push(a);else{const t=Bd(r,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new us(i);return new Ad(o,a,s.fieldTransforms)}function Ud(t,e,n,r,s,i){const o=t.Kc(1,e,n),a=[Gd(e,r,n)],c=[s];if(i.length%2!=0)throw new Ur(Vr.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(Gd(e,i[t])),c.push(i[t+1]);const u=[],h=Ps.empty();for(let t=a.length-1;t>=0;--t)if(!Wd(u,a[t])){const e=a[t];let n=c[t];n=f(n);const r=o.Mc(e);if(n instanceof Rd)u.push(e);else{const t=Bd(n,r);null!=t&&(u.push(e),h.set(e,t))}}const l=new us(u);return new Ad(h,l,o.fieldTransforms)}function qd(t,e,n,r=!1){return Bd(n,t.Kc(r?4:3,e))}function Bd(t,e){if(Kd(t=f(t)))return jd("Unsupported field value:",e,t),$d(t,e);if(t instanceof Td)return function(t,e){if(!Nd(e.xc))throw e.Bc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Bc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Oc&&4!==e.xc)throw e.Bc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Bd(s,e.Lc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=f(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return _i(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=ts.fromDate(t);return{timestampValue:Lo(e.R,n)}}if(t instanceof ts){const n=new ts(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Lo(e.R,n)}}if(t instanceof Id)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Ed)return{bytesValue:Oo(e.R,t._byteString)};if(t instanceof ed){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Bc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Fo(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Bc(`Unsupported field value: ${Wl(t)}`)}(t,e)}function $d(t,e){const n={};return ss(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):rs(t,((t,r)=>{const s=Bd(r,e.$c(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function Kd(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof ts||t instanceof Id||t instanceof Ed||t instanceof ed||t instanceof Td)}function jd(t,e,n){if(!Kd(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Wl(n);throw"an object"===r?e.Bc(t+" a custom object"):e.Bc(t+" "+r)}}function Gd(t,e,n){if((e=f(e))instanceof bd)return e._internalPath;if("string"==typeof e)return zd(t,e);throw Hd("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Qd=new RegExp("[~\\*/\\[\\]]");function zd(t,e,n){if(e.search(Qd)>=0)throw Hd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new bd(...e.split("."))._internalPath}catch(r){throw Hd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Hd(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Ur(Vr.INVALID_ARGUMENT,a+t+c)}function Wd(t,e){return t.some((t=>t.isEqual(e)))}
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
     */class Yd{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ed(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Xd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(Jd("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Xd extends Yd{data(){return super.data()}}function Jd(t,e){return"string"==typeof e?zd(t,e):e instanceof bd?e._internalPath:e._delegate._internalPath}
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
     */class Zd{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class tf extends Yd{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ef(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Jd("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class ef extends tf{data(t={}){return super.data(t)}}class nf{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Zd(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new ef(this._firestore,this._userDataWriter,n.key,n,new Zd(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Ur(Vr.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e,n=0;return t._snapshot.docChanges.map((r=>{const s=new ef(t._firestore,t._userDataWriter,r.doc.key,r.doc,new Zd(t._snapshot.mutatedKeys.has(r.doc.key),t._snapshot.fromCache),t.query.converter);return e=r.doc,{type:"added",doc:s,oldIndex:-1,newIndex:n++}}))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new ef(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Zd(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:rf(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function rf(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Qr()}}function sf(t,e){return t instanceof tf&&e instanceof tf?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(null===t._document?null===e._document:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof nf&&e instanceof nf&&t._firestore===e._firestore&&ad(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}
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
     */function of(t){if(ui(t)&&0===t.explicitOrderBy.length)throw new Ur(Vr.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class af{}function cf(t,...e){for(const n of e)t=n._apply(t);return t}class uf extends af{constructor(t,e,n){super(),this.Wc=t,this.Gc=e,this.zc=n,this.type="where"}_apply(t){const e=Cd(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){pf(o,i);const e=[];for(const n of o)e.push(gf(r,t,n));a={arrayValue:{values:e}}}else a=gf(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||pf(o,i),a=qd(n,"where",o,"in"===i||"not-in"===i);const c=js.create(s,i,a);return function(t,e){if(e.g()){const n=li(t);if(null!==n&&!n.isEqual(e.field))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);const r=hi(t);null!==r&&yf(t,e.field,r)}const n=function(t,e){for(const n of t.filters)if(e.indexOf(n.op)>=0)return n.op;return null}(t,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}(t,c),c}(t._query,0,e,t.firestore._databaseId,this.Wc,this.Gc,this.zc);return new nd(t.firestore,t.converter,function(t,e){const n=t.filters.concat([e]);return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}(t._query,n))}}class hf extends af{constructor(t,e){super(),this.Wc=t,this.Hc=e,this.type="orderBy"}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new ei(e,n);return function(t,e){if(null===hi(t)){const n=li(t);null!==n&&yf(t,n,e.field)}}(t,r),r}(t._query,this.Wc,this.Hc);return new nd(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new ii(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}class lf extends af{constructor(t,e,n){super(),this.type=t,this.Jc=e,this.Yc=n}_apply(t){return new nd(t.firestore,t.converter,gi(t._query,this.Jc,this.Yc))}}class df extends af{constructor(t,e,n){super(),this.type=t,this.Xc=e,this.Zc=n}_apply(t){const e=mf(t,this.type,this.Xc,this.Zc);return new nd(t.firestore,t.converter,function(t,e){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,e,t.endAt)}(t._query,e))}}class ff extends af{constructor(t,e,n){super(),this.type=t,this.Xc=e,this.Zc=n}_apply(t){const e=mf(t,this.type,this.Xc,this.Zc);return new nd(t.firestore,t.converter,function(t,e){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,e)}(t._query,e))}}function mf(t,e,n,r){if(n[0]=f(n[0]),n[0]instanceof Yd)return function(t,e,n,r,s){if(!r)throw new Ur(Vr.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of fi(t))if(n.field.isKeyField())i.push(xs(e,r.key));else{const t=r.data.field(n.field);if(gs(t))throw new Ur(Vr.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=n.field.canonicalString();throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}i.push(t)}return new Zs(i,s)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=Cd(t.firestore);return function(t,e,n,r,s,i){const o=t.explicitOrderBy;if(s.length>o.length)throw new Ur(Vr.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const c=s[i];if(o[i].field.isKeyField()){if("string"!=typeof c)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!di(t)&&-1!==c.indexOf("/"))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=t.path.child(os.fromString(c));if(!Es.isDocumentKey(n))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new Es(n);a.push(xs(e,s))}else{const t=qd(n,r,c);a.push(t)}}return new Zs(a,i)}(t._query,t.firestore._databaseId,s,e,n,r)}}function gf(t,e,n){if("string"==typeof(n=f(n))){if(""===n)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!di(e)&&-1!==n.indexOf("/"))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(os.fromString(n));if(!Es.isDocumentKey(r))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return xs(t,new Es(r))}if(n instanceof ed)return xs(t,n._key);throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wl(n)}.`)}function pf(t,e){if(!Array.isArray(t)||0===t.length)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function yf(t,e,n){if(!n.isEqual(e))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
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
     */class wf{convertValue(t,e="none"){switch(Ts(t)){case 0:return null;case 1:return t.booleanValue;case 2:return fs(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ms(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Qr()}}convertObject(t,e){const n={};return rs(t.fields,((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new Id(fs(t.latitude),fs(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=ps(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ys(t));default:return null}}convertTimestamp(t){const e=ds(t);return new ts(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=os.fromString(t);zr(ca(n));const r=new Vl(n.get(1),n.get(3)),s=new Es(n.popFirst(5));return r.isEqual(e)||Kr(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
     */function vf(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class bf extends wf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ed(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ed(this.firestore,null,e)}}
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
     */class Ef{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Cd(t)}set(t,e,n){this._verifyNotCommitted();const r=Tf(t,this._firestore),s=vf(r.converter,e,n),i=kd(this._dataReader,"WriteBatch.set",r._key,s,null!==r.converter,n);return this._mutations.push(i.toMutation(r._key,Ui.none())),this}update(t,e,n,...r){this._verifyNotCommitted();const s=Tf(t,this._firestore);let i;return i="string"==typeof(e=f(e))||e instanceof bd?Ud(this._dataReader,"WriteBatch.update",s._key,e,n,r):Vd(this._dataReader,"WriteBatch.update",s._key,e),this._mutations.push(i.toMutation(s._key,Ui.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Tf(t,this._firestore);return this._mutations=this._mutations.concat(new Ji(e._key,Ui.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Ur(Vr.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Tf(t,e){if((t=f(t)).firestore!==e)throw new Ur(Vr.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}
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
     */class If extends wf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ed(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ed(this.firestore,null,e)}}function _f(t){t=Yl(t,ed);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("read document","readonly",(t=>n.Mn.mn(t,e)))}(t,e);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new Ur(Vr.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(t){const r=vh(t,`Failed to get document '${e} from cache`);n.reject(r)}}(await Cl(t),e,n))),n.promise}(n,t._key).then((n=>new tf(e,r,t._key,n,new Zd(null!==n&&n.hasLocalMutations,!0),t.converter)))}function Sf(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await iu(t,e,!0),s=new Fh(e,r.Bn),i=s._o(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(t){const r=vh(t,`Failed to execute query '${e} against cache`);n.reject(r)}}(await Cl(t),e,n))),n.promise}(n,t._query).then((n=>new nf(e,r,t,n)))}function Af(t,e,n,...r){t=Yl(t,ed);const s=Yl(t.firestore,ld),i=Cd(s);let o;return o="string"==typeof(e=f(e))||e instanceof bd?Ud(i,"updateDoc",t._key,e,n,r):Vd(i,"updateDoc",t._key,e),xf(s,[o.toMutation(t._key,Ui.exists(!0))])}function Nf(t,...e){var n,r,s;t=f(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||ud(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ud(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof ed)u=Yl(t.firestore,ld),h=ai(t._key.path),c={next:n=>{e[o]&&e[o](Cf(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Yl(t,nd);u=Yl(n.firestore,ld),h=n._query;const r=new If(u);c={next:t=>{e[o]&&e[o](new nf(u,r,n,t))},error:e[o+1],complete:e[o+2]},of(t._query)}return function(t,e,n,r){const s=new bl(r),i=new Ch(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>Sh(await Ll(t),i))),()=>{s.Wo(),t.asyncQueue.enqueueAndForget((async()=>Ah(await Ll(t),i)))}}(dd(u),h,a,c)}function Df(t,e){return function(t,e){const n=new bl(e);return t.asyncQueue.enqueueAndForget((async()=>function(t,e){Hr(t).Gr.add(e),e.next()}(await Ll(t),n))),()=>{n.Wo(),t.asyncQueue.enqueueAndForget((async()=>function(t,e){Hr(t).Gr.delete(e)}(await Ll(t),n)))}}(dd(t=Yl(t,ld)),ud(e)?e:{next:e})}function xf(t,e){return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=ml(t);try{const t=await function(t,e){const n=Hr(t),r=ts.now(),s=e.reduce(((t,e)=>t.add(e.key)),wo());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Mn.pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=ji(t,i.get(t.key));null!=e&&o.push(new Hi(t.key,e,Fs(e.value.mapValue),Ui.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(i),{batchId:t.batchId,changes:i})))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new io(Xr)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(r,t.batchId,n),await nl(r,t.changes),await oh(r.remoteStore)}catch(t){const e=vh(t,"Failed to persist write");n.reject(e)}}(await Rl(t),e,n))),n.promise}(dd(t),e)}function Cf(t,e,n){const r=n.docs.get(e._key),s=new If(t);return new tf(t,s,e._key,r,new Zd(n.hasPendingWrites,n.fromCache),e.converter)}
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
     */class kf extends class{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Cd(t)}get(t){const e=Tf(t,this._firestore),n=new bf(this._firestore);return this._transaction.lookup([e._key]).then((t=>{if(!t||1!==t.length)return Qr();const r=t[0];if(r.isFoundDocument())return new Yd(this._firestore,n,r.key,r,e.converter);if(r.isNoDocument())return new Yd(this._firestore,n,e._key,null,e.converter);throw Qr()}))}set(t,e,n){const r=Tf(t,this._firestore),s=vf(r.converter,e,n),i=kd(this._dataReader,"Transaction.set",r._key,s,null!==r.converter,n);return this._transaction.set(r._key,i),this}update(t,e,n,...r){const s=Tf(t,this._firestore);let i;return i="string"==typeof(e=f(e))||e instanceof bd?Ud(this._dataReader,"Transaction.update",s._key,e,n,r):Vd(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,i),this}delete(t){const e=Tf(t,this._firestore);return this._transaction.delete(e._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Tf(t,this._firestore),n=new If(this._firestore);return super.get(t).then((t=>new tf(this._firestore,n,e._key,t._document,new Zd(!1,!1),e.converter)))}}function Rf(t,e){return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>{const r=await function(t){return Dl(t).then((t=>t.datastore))}(t);new Il(t.asyncQueue,r,e,n).run()})),n.promise}(dd(t),(n=>e(new kf(t,n))))}
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
     */!function(t){Pr=t}(e.SDK_VERSION),e._registerComponent(new p("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new ld(n,t.getProvider("auth-internal"));return e=Object.assign({useFetchStreams:!0},e),r._setSettings(e),r}),"PUBLIC")),e.registerVersion("@firebase/firestore","0.0.900-exp.f41d11b71",undefined);
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
const Lf="(default)";class Of{constructor(t,e){this.projectId=t,this.database=e||Lf}get isDefaultDatabase(){return this.database===Lf}isEqual(t){return t instanceof Of&&t.projectId===this.projectId&&t.database===this.database}}
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
let Mf="8.6.5";
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
const Pf=new E("@firebase/firestore");function Ff(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
     */function Vf(t="Unexpected state"){const e=`FIRESTORE (${Mf}) INTERNAL ASSERTION FAILED: `+t;throw function(t,...e){if(Pf.logLevel<=g.ERROR){const n=e.map(Ff);Pf.error(`Firestore (${Mf}): ${t}`,...n)}}(e),new Error(e)}
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
     */const Uf="invalid-argument",qf="failed-precondition",Bf="unimplemented";class $f extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const Kf="__name__";class jf{constructor(t,e,n){void 0===e?e=0:e>t.length&&Vf(),void 0===n?n=t.length-e:n>t.length-e&&Vf(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===jf.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof jf?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Gf extends jf{construct(t,e,n){return new Gf(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new $f(Uf,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Gf(e)}static emptyPath(){return new Gf([])}}const Qf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class zf extends jf{construct(t,e,n){return new zf(t,e,n)}static isValidIdentifier(t){return Qf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),zf.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Kf}static keyField(){return new zf([Kf])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new $f(Uf,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new $f(Uf,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new $f(Uf,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new $f(Uf,"Unterminated ` in path: "+t);return new zf(e)}static emptyPath(){return new zf([])}}
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
     */class Hf{constructor(t){this.path=t}static fromPath(t){return new Hf(Gf.fromString(t))}static fromName(t){return new Hf(Gf.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Gf.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Gf.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new Hf(new Gf(t.slice()))}}
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
     */function Wf(t,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new $f(Uf,`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}function Yf(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new $f(Uf,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Vf()}(t);throw new $f(Uf,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
function Xf(){if("undefined"==typeof Uint8Array)throw new $f(Bf,"Uint8Arrays are not available in this environment.")}function Jf(){if("undefined"==typeof atob)throw new $f(Bf,"Blobs are unavailable in Firestore in this environment.")}class Zf{constructor(t){this._delegate=t}static fromBase64String(t){return Jf(),new Zf(Ed.fromBase64String(t))}static fromUint8Array(t){return Xf(),new Zf(Ed.fromUint8Array(t))}toBase64(){return Jf(),this._delegate.toBase64()}toUint8Array(){return Xf(),this._delegate.toUint8Array()}isEqual(t){return this._delegate.isEqual(t._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
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
     */function tm(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of e)if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t,["next","error","complete"])}class em{enableIndexedDbPersistence(t,e){return function(t,e){vd(t=Yl(t,ld));const n=dd(t),r=t._freezeSettings(),s=new wl;return md(n,s,new pl(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}(t._delegate,{forceOwnership:e})}enableMultiTabIndexedDbPersistence(t){return function(t){vd(t=Yl(t,ld));const e=dd(t),n=t._freezeSettings(),r=new wl;return md(e,r,new yl(r,n.cacheSizeBytes))}(t._delegate)}clearIndexedDbPersistence(t){return function(t){if(t._initialized&&!t._terminated)throw new Ur(Vr.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ra;return t._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await async function(t){if(!Ma.gt())return Promise.resolve();const e=t+"main";await Ma.delete(e)}(Qc(t._databaseId,t._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}(t._delegate)}}class nm{constructor(t,e,n){this._delegate=e,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},t instanceof Of||(this._appCompat=t)}get _databaseId(){return this._delegate._databaseId}settings(t){const e=this._delegate._getSettings();t.merge||e.host===t.host||function(t,...e){if(Pf.logLevel<=g.WARN){const n=e.map(Ff);Pf.warn(`Firestore (${Mf}): ${t}`,...n)}}("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),t.merge&&delete(t=Object.assign(Object.assign({},e),t)).merge,this._delegate._setSettings(t)}useEmulator(t,e,n={}){td(this._delegate,t,e,n)}enableNetwork(){return pd(this._delegate)}disableNetwork(){return yd(this._delegate)}enablePersistence(t){let e=!1,n=!1;return t&&(e=!!t.synchronizeTabs,n=!!t.experimentalForceOwningTab,function(t,e,n,r){if(!0===e&&!0===r)throw new $f(Uf,`${t} and ${n} cannot be used together.`)}("synchronizeTabs",e,"experimentalForceOwningTab",n)),e?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore"),this._appCompat._removeServiceInstance("firestore-exp")),this._delegate._delete()}waitForPendingWrites(){return gd(this._delegate)}onSnapshotsInSync(t){return Df(this._delegate,t)}get app(){if(!this._appCompat)throw new $f(qf,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(t){try{return new pm(this,sd(this._delegate,t))}catch(t){throw cm(t,"collection()","Firestore.collection()")}}doc(t){try{return new am(this,id(this._delegate,t))}catch(t){throw cm(t,"doc()","Firestore.doc()")}}collectionGroup(t){try{return new fm(this,function(t,e){if(t=Yl(t,Zl),Ql("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new nd(t,null,function(t){return new ii(os.emptyPath(),t)}(e))}(this._delegate,t))}catch(t){throw cm(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(t){return Rf(this._delegate,(e=>t(new sm(this,e))))}batch(){return dd(this._delegate),new im(new Ef(this._delegate,(t=>xf(this._delegate,t))))}loadBundle(t){throw new $f(qf,'"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?')}namedQuery(t){throw new $f(qf,'"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?')}}class rm extends wf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Zf(new Ed(t))}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return am.forKey(e,this.firestore,null)}}class sm{constructor(t,e){this._firestore=t,this._delegate=e,this._userDataWriter=new rm(t)}get(t){const e=ym(t);return this._delegate.get(e).then((t=>new lm(this._firestore,new tf(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,e.converter))))}set(t,e,n){const r=ym(t);return n?(Wf("Transaction.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=ym(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=ym(t);return this._delegate.delete(e),this}}class im{constructor(t){this._delegate=t}set(t,e,n){const r=ym(t);return n?(Wf("WriteBatch.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=ym(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=ym(t);return this._delegate.delete(e),this}commit(){return this._delegate.commit()}}class om{constructor(t,e,n){this._firestore=t,this._userDataWriter=e,this._delegate=n}fromFirestore(t,e){const n=new ef(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,null);return this._delegate.fromFirestore(new dm(this._firestore,n),null!=e?e:{})}toFirestore(t,e){return e?this._delegate.toFirestore(t,e):this._delegate.toFirestore(t)}static getInstance(t,e){const n=om.INSTANCES;let r=n.get(t);r||(r=new WeakMap,n.set(t,r));let s=r.get(e);return s||(s=new om(t,new rm(t),e),r.set(e,s)),s}}om.INSTANCES=new WeakMap;class am{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new rm(t)}static forPath(t,e,n){if(t.length%2!=0)throw new $f(Uf,`Invalid document reference. Document references must have an even number of segments, but ${t.canonicalString()} has ${t.length}`);return new am(e,new ed(e._delegate,n,new Hf(t)))}static forKey(t,e,n){return new am(e,new ed(e._delegate,n,t))}get id(){return this._delegate.id}get parent(){return new pm(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(t){try{return new pm(this.firestore,sd(this._delegate,t))}catch(t){throw cm(t,"collection()","DocumentReference.collection()")}}isEqual(t){return(t=f(t))instanceof ed&&od(this._delegate,t)}set(t,e){e=Wf("DocumentReference.set",e);try{return function(t,e,n){t=Yl(t,ed);const r=Yl(t.firestore,ld),s=vf(t.converter,e,n);return xf(r,[kd(Cd(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,Ui.none())])}(this._delegate,t,e)}catch(t){throw cm(t,"setDoc()","DocumentReference.set()")}}update(t,e,...n){try{return 1===arguments.length?Af(this._delegate,t):Af(this._delegate,t,e,...n)}catch(t){throw cm(t,"updateDoc()","DocumentReference.update()")}}delete(){return function(t){return xf(Yl(t.firestore,ld),[new Ji(t._key,Ui.none())])}(this._delegate)}onSnapshot(...t){const e=um(t),n=hm(t,(t=>new lm(this.firestore,new tf(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))));return Nf(this._delegate,e,n)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?_f(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Yl(t,ed);const e=Yl(t.firestore,ld);return Ol(dd(e),t._key,{source:"server"}).then((n=>Cf(e,t,n)))}(this._delegate):function(t){t=Yl(t,ed);const e=Yl(t.firestore,ld);return Ol(dd(e),t._key).then((n=>Cf(e,t,n)))}(this._delegate),e.then((t=>new lm(this.firestore,new tf(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))))}withConverter(t){return new am(this.firestore,t?this._delegate.withConverter(om.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function cm(t,e,n){return t.message=t.message.replace(e,n),t}function um(t){for(const e of t)if("object"==typeof e&&!tm(e))return e;return{}}function hm(t,e){var n,r;let s;return s=tm(t[0])?t[0]:tm(t[1])?t[1]:"function"==typeof t[0]?{next:t[0],error:t[1],complete:t[2]}:{next:t[1],error:t[2],complete:t[3]},{next:t=>{s.next&&s.next(e(t))},error:null===(n=s.error)||void 0===n?void 0:n.bind(s),complete:null===(r=s.complete)||void 0===r?void 0:r.bind(s)}}class lm{constructor(t,e){this._firestore=t,this._delegate=e}get ref(){return new am(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(t){return this._delegate.data(t)}get(t,e){return this._delegate.get(t,e)}isEqual(t){return sf(this._delegate,t._delegate)}}class dm extends lm{data(t){return this._delegate.data(t)}}class fm{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new rm(t)}where(t,e,n){try{return new fm(this.firestore,cf(this._delegate,function(t,e,n){const r=e,s=Jd("where",t);return new uf(s,r,n)}(t,e,n)))}catch(t){throw cm(t,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(t,e){try{return new fm(this.firestore,cf(this._delegate,function(t,e="asc"){const n=e,r=Jd("orderBy",t);return new hf(r,n)}(t,e)))}catch(t){throw cm(t,/(orderBy|where)\(\)/,"Query.$1()")}}limit(t){try{return new fm(this.firestore,cf(this._delegate,function(t){return Xl("limit",t),new lf("limit",t,"F")}(t)))}catch(t){throw cm(t,"limit()","Query.limit()")}}limitToLast(t){try{return new fm(this.firestore,cf(this._delegate,function(t){return Xl("limitToLast",t),new lf("limitToLast",t,"L")}(t)))}catch(t){throw cm(t,"limitToLast()","Query.limitToLast()")}}startAt(...t){try{return new fm(this.firestore,cf(this._delegate,function(...t){return new df("startAt",t,!0)}(...t)))}catch(t){throw cm(t,"startAt()","Query.startAt()")}}startAfter(...t){try{return new fm(this.firestore,cf(this._delegate,function(...t){return new df("startAfter",t,!1)}(...t)))}catch(t){throw cm(t,"startAfter()","Query.startAfter()")}}endBefore(...t){try{return new fm(this.firestore,cf(this._delegate,function(...t){return new ff("endBefore",t,!0)}(...t)))}catch(t){throw cm(t,"endBefore()","Query.endBefore()")}}endAt(...t){try{return new fm(this.firestore,cf(this._delegate,function(...t){return new ff("endAt",t,!1)}(...t)))}catch(t){throw cm(t,"endAt()","Query.endAt()")}}isEqual(t){return ad(this._delegate,t._delegate)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?Sf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return Ml(n,t._query,{source:"server"}).then((n=>new nf(e,r,t,n)))}(this._delegate):function(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return of(t._query),Ml(n,t._query).then((n=>new nf(e,r,t,n)))}(this._delegate),e.then((t=>new gm(this.firestore,new nf(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))))}onSnapshot(...t){const e=um(t),n=hm(t,(t=>new gm(this.firestore,new nf(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))));return Nf(this._delegate,e,n)}withConverter(t){return new fm(this.firestore,t?this._delegate.withConverter(om.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}class mm{constructor(t,e){this._firestore=t,this._delegate=e}get type(){return this._delegate.type}get doc(){return new dm(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class gm{constructor(t,e){this._firestore=t,this._delegate=e}get query(){return new fm(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map((t=>new dm(this._firestore,t)))}docChanges(t){return this._delegate.docChanges(t).map((t=>new mm(this._firestore,t)))}forEach(t,e){this._delegate.forEach((n=>{t.call(e,new dm(this._firestore,n))}))}isEqual(t){return sf(this._delegate,t._delegate)}}class pm extends fm{constructor(t,e){super(t,e),this.firestore=t,this._delegate=e}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const t=this._delegate.parent;return t?new am(this.firestore,t):null}doc(t){try{return new am(this.firestore,void 0===t?id(this._delegate):id(this._delegate,t))}catch(t){throw cm(t,"doc()","CollectionReference.doc()")}}add(t){return function(t,e){const n=Yl(t.firestore,ld),r=id(t),s=vf(t.converter,e);return xf(n,[kd(Cd(t.firestore),"addDoc",r._key,s,null!==t.converter,{}).toMutation(r._key,Ui.exists(!1))]).then((()=>r))}(this._delegate,t).then((t=>new am(this.firestore,t)))}isEqual(t){return od(this._delegate,t._delegate)}withConverter(t){return new pm(this.firestore,t?this._delegate.withConverter(om.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function ym(t){return Yf(t,ed)}
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
     */function wm(t){return function(t,e){const n=dd(t=Yl(t,ld)),r=new hd;return Pl(n,t._databaseId,e,r),r}(this._delegate,t)}function vm(t){return wd(this._delegate,t).then((t=>t?new fm(this,t):null))}
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
class bm{constructor(...t){this._delegate=new bd(...t)}static documentId(){return new bm(zf.keyField().canonicalString())}isEqual(t){return(t=f(t))instanceof bd&&this._delegate._internalPath.isEqual(t._internalPath)}}
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
     */class Em{constructor(t){this._delegate=t}static serverTimestamp(){const t=new Od("serverTimestamp");return t._methodName="FieldValue.serverTimestamp",new Em(t)}static delete(){const t=new Rd("deleteField");return t._methodName="FieldValue.delete",new Em(t)}static arrayUnion(...t){const e=function(...t){return new Md("arrayUnion",t)}(...t);return e._methodName="FieldValue.arrayUnion",new Em(e)}static arrayRemove(...t){const e=function(...t){return new Pd("arrayRemove",t)}(...t);return e._methodName="FieldValue.arrayRemove",new Em(e)}static increment(t){const e=function(t){return new Fd("increment",t)}(t);return e._methodName="FieldValue.increment",new Em(e)}isEqual(t){return this._delegate.isEqual(t._delegate)}}
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
     */const Tm={Firestore:nm,GeoPoint:Id,Timestamp:ts,Blob:Zf,Transaction:sm,WriteBatch:im,DocumentReference:am,DocumentSnapshot:lm,Query:fm,QueryDocumentSnapshot:dm,QuerySnapshot:gm,CollectionReference:pm,FieldPath:bm,FieldValue:Em,setLogLevel:function(t){var e;e=t,Pf.setLogLevel(e)},CACHE_SIZE_UNLIMITED:-1};
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
var Im;(function(t){Mf=t})((Im=r.default).SDK_VERSION),function(t,e){t.INTERNAL.registerComponent(new p("firestore-compat",(t=>{const n=t.getProvider("app-compat").getImmediate(),r=t.getProvider("firestore-exp").getImmediate();return e(n,r)}),"PUBLIC").setServiceProps(Object.assign({},Tm)))}(Im,((t,e)=>new nm(t,e,new em))),Im.registerVersion("@firebase/firestore-compat","0.0.900-exp.f41d11b71"),function(t){t.prototype.loadBundle=wm,t.prototype.namedQuery=vm}(nm)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-firestore-compat.js.map
