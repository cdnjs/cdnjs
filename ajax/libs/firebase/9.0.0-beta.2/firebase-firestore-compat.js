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
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(g||(g={}));var y={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},w=g.INFO,v=((m={})[g.DEBUG]="log",m[g.VERBOSE]="log",m[g.INFO]="info",m[g.WARN]="warn",m[g.ERROR]="error",m),b=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),i=v[e];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[i].apply(console,o(["["+s+"]  "+t.name+":"],n))}},E=function(){function t(t){this.name=t,this._logLevel=w,this._logHandler=b,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in g))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?y[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.DEBUG],t)),this._logHandler.apply(this,o([this,g.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.VERBOSE],t)),this._logHandler.apply(this,o([this,g.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.INFO],t)),this._logHandler.apply(this,o([this,g.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.WARN],t)),this._logHandler.apply(this,o([this,g.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,g.ERROR],t)),this._logHandler.apply(this,o([this,g.ERROR],t))},t}(),I=function(t,e){return(I=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function T(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var _,S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A=A||{},N=S||self;function D(){}function x(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function C(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var k="closure_uid_"+(1e9*Math.random()>>>0),R=0;function L(t,e,n){return t.call.apply(t.bind,arguments)}function O(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function M(t,e,n){return(M=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?L:O).apply(null,arguments)}function P(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function F(){return Date.now()}function V(t,e){function n(){}n.prototype=e.prototype,t.X=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Kb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function U(){this.j=this.j,this.i=this.i}U.prototype.j=!1,U.prototype.ja=function(){if(!this.j&&(this.j=!0,this.G(),0))(function(t){Object.prototype.hasOwnProperty.call(t,k)&&t[k]||(t[k]=++R)})(this)},U.prototype.G=function(){if(this.i)for(;this.i.length;)this.i.shift()()};var q=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},B=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function $(t){return Array.prototype.concat.apply([],arguments)}function K(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function j(t){return/^[\s\xa0]*$/.test(t)}var G,Q=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function z(t,e){return-1!=t.indexOf(e)}function H(t,e){return t<e?-1:t>e?1:0}t:{var W=N.navigator;if(W){var Y=W.userAgent;if(Y){G=Y;break t}}G=""}function X(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function J(t){var e={};for(var n in t)e[n]=t[n];return e}var Z="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function tt(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<Z.length;i++)n=Z[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function et(t){return et[" "](t),t}et[" "]=D;var nt,rt,st=z(G,"Opera"),it=z(G,"Trident")||z(G,"MSIE"),ot=z(G,"Edge"),at=ot||it,ct=z(G,"Gecko")&&!(z(G.toLowerCase(),"webkit")&&!z(G,"Edge"))&&!(z(G,"Trident")||z(G,"MSIE"))&&!z(G,"Edge"),ut=z(G.toLowerCase(),"webkit")&&!z(G,"Edge");function ht(){var t=N.document;return t?t.documentMode:void 0}t:{var lt="",dt=(rt=G,ct?/rv:([^\);]+)(\)|;)/.exec(rt):ot?/Edge\/([\d\.]+)/.exec(rt):it?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(rt):ut?/WebKit\/(\S+)/.exec(rt):st?/(?:Version)[ \/]?(\S+)/.exec(rt):void 0);if(dt&&(lt=dt?dt[1]:""),it){var ft=ht();if(null!=ft&&ft>parseFloat(lt)){nt=String(ft);break t}}nt=lt}var mt,gt={};function pt(t){return function(t,e){var n=gt;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(){for(var e=0,n=Q(String(nt)).split("."),r=Q(String(t)).split("."),s=Math.max(n.length,r.length),i=0;0==e&&i<s;i++){var o=n[i]||"",a=r[i]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],0==o[0].length&&0==a[0].length)break;e=H(0==o[1].length?0:parseInt(o[1],10),0==a[1].length?0:parseInt(a[1],10))||H(0==o[2].length,0==a[2].length)||H(o[2],a[2]),o=o[3],a=a[3]}while(0==e)}return 0<=e}))}if(N.document&&it){var yt=ht();mt=yt||(parseInt(nt,10)||void 0)}else mt=void 0;var wt=mt,vt=!it||9<=Number(wt),bt=it&&!pt("9"),Et=function(){if(!N.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{N.addEventListener("test",D,e),N.removeEventListener("test",D,e)}catch(t){}return t}();function It(t,e){this.type=t,this.a=this.target=e,this.defaultPrevented=!1}function Tt(t,e){if(It.call(this,t?t.type:""),this.relatedTarget=this.a=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.pointerId=0,this.pointerType="",this.c=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.a=e,e=t.relatedTarget){if(ct){t:{try{et(e.nodeName);var s=!0;break t}catch(t){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:_t[t.pointerType]||"",this.c=t,t.defaultPrevented&&this.b()}}It.prototype.b=function(){this.defaultPrevented=!0},V(Tt,It);var _t={2:"touch",3:"pen",4:"mouse"};Tt.prototype.b=function(){Tt.X.b.call(this);var t=this.c;if(t.preventDefault)t.preventDefault();else if(t.returnValue=!1,bt)try{(t.ctrlKey||112<=t.keyCode&&123>=t.keyCode)&&(t.keyCode=-1)}catch(t){}};var St="closure_listenable_"+(1e6*Math.random()|0),At=0;function Nt(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ca=s,this.key=++At,this.Y=this.Z=!1}function Dt(t){t.Y=!0,t.listener=null,t.proxy=null,t.src=null,t.ca=null}function xt(t){this.src=t,this.a={},this.b=0}function Ct(t,e){var n=e.type;if(n in t.a){var r,s=t.a[n],i=q(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Dt(e),0==t.a[n].length&&(delete t.a[n],t.b--))}}function kt(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.Y&&i.listener==e&&i.capture==!!n&&i.ca==r)return s}return-1}xt.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.a[i])||(t=this.a[i]=[],this.b++);var o=kt(t,e,r,s);return-1<o?(e=t[o],n||(e.Z=!1)):((e=new Nt(e,this.src,i,!!r,s)).Z=n,t.push(e)),e};var Rt="closure_lm_"+(1e6*Math.random()|0),Lt={};function Ot(t,e,n,r,s){if(r&&r.once)return Pt(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ot(t,e[i],n,r,s);return null}return n=jt(n),t&&t[St]?t.va(e,n,C(r)?!!r.capture:!!r,s):Mt(t,e,n,!1,r,s)}function Mt(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=C(s)?!!s.capture:!!s;if(o&&!vt)return null;var a=$t(t);if(a||(t[Rt]=a=new xt(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){var t=Bt,e=vt?function(n){return t.call(e.src,e.listener,n)}:function(n){if(!(n=t.call(e.src,e.listener,n)))return n};return e}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)Et||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Ut(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Pt(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Pt(t,e[i],n,r,s);return null}return n=jt(n),t&&t[St]?t.wa(e,n,C(r)?!!r.capture:!!r,s):Mt(t,e,n,!0,r,s)}function Ft(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Ft(t,e[i],n,r,s);else r=C(r)?!!r.capture:!!r,n=jt(n),t&&t[St]?(t=t.c,(e=String(e).toString())in t.a&&(-1<(n=kt(i=t.a[e],n,r,s))&&(Dt(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.a[e],t.b--)))):t&&(t=$t(t))&&(e=t.a[e.toString()],t=-1,e&&(t=kt(e,n,r,s)),(n=-1<t?e[t]:null)&&Vt(n))}function Vt(t){if("number"!=typeof t&&t&&!t.Y){var e=t.src;if(e&&e[St])Ct(e.c,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ut(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=$t(e))?(Ct(n,t),0==n.b&&(n.src=null,e[Rt]=null)):Dt(t)}}}function Ut(t){return t in Lt?Lt[t]:Lt[t]="on"+t}function qt(t,e){var n=t.listener,r=t.ca||t.src;return t.Z&&Vt(t),n.call(r,e)}function Bt(t,e){if(t.Y)return!0;if(!vt){if(!e)t:{e=["window","event"];for(var n=N,r=0;r<e.length;r++)if(null==(n=n[e[r]])){e=null;break t}e=n}return qt(t,e=new Tt(e,this))}return qt(t,new Tt(e,this))}function $t(t){return(t=t[Rt])instanceof xt?t:null}var Kt="__closure_events_fn_"+(1e9*Math.random()>>>0);function jt(t){return"function"==typeof t?t:(t[Kt]||(t[Kt]=function(e){return t.handleEvent(e)}),t[Kt])}function Gt(){U.call(this),this.c=new xt(this),this.J=this,this.C=null}function Qt(t,e){var n,r=t.C;if(r)for(n=[];r;r=r.C)n.push(r);if(t=t.J,r=e.type||e,"string"==typeof e)e=new It(e,t);else if(e instanceof It)e.target=e.target||t;else{var s=e;tt(e=new It(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.a=n[i];s=zt(o,r,!0,e)&&s}if(s=zt(o=e.a=t,r,!0,e)&&s,s=zt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=zt(o=e.a=n[i],r,!1,e)&&s}function zt(t,e,n,r){if(!(e=t.c.a[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.Y&&o.capture==n){var a=o.listener,c=o.ca||o.src;o.Z&&Ct(t.c,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}V(Gt,U),Gt.prototype[St]=!0,(_=Gt.prototype).addEventListener=function(t,e,n,r){Ot(this,t,e,n,r)},_.removeEventListener=function(t,e,n,r){Ft(this,t,e,n,r)},_.G=function(){if(Gt.X.G.call(this),this.c){var t,e=this.c;for(t in e.a){for(var n=e.a[t],r=0;r<n.length;r++)Dt(n[r]);delete e.a[t],e.b--}}this.C=null},_.va=function(t,e,n,r){return this.c.add(String(t),e,!1,n,r)},_.wa=function(t,e,n,r){return this.c.add(String(t),e,!0,n,r)};var Ht=N.JSON.stringify;function Wt(){this.b=this.a=null}var Yt,Xt=new(function(){function t(t,e){this.c=t,this.f=e,this.b=0,this.a=null}return t.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t},t}())((function(){return new Zt}),(function(t){t.reset()}));function Jt(){var t=re,e=null;return t.a&&(e=t.a,t.a=t.a.next,t.a||(t.b=null),e.next=null),e}function Zt(){this.next=this.b=this.a=null}function te(t){N.setTimeout((function(){throw t}),0)}function ee(t,e){Yt||function(){var t=N.Promise.resolve(void 0);Yt=function(){t.then(se)}}(),ne||(Yt(),ne=!0),re.add(t,e)}Wt.prototype.add=function(t,e){var n=Xt.get();n.set(t,e),this.b?this.b.next=n:this.a=n,this.b=n},Zt.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},Zt.prototype.reset=function(){this.next=this.b=this.a=null};var ne=!1,re=new Wt;function se(){for(var t;t=Jt();){try{t.a.call(t.b)}catch(t){te(t)}var e=Xt;e.f(t),100>e.b&&(e.b++,t.next=e.a,e.a=t)}ne=!1}function ie(t,e){Gt.call(this),this.b=t||1,this.a=e||N,this.f=M(this.Za,this),this.g=F()}function oe(t){t.aa=!1,t.M&&(t.a.clearTimeout(t.M),t.M=null)}function ae(t,e,n){if("function"==typeof t)n&&(t=M(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=M(t.handleEvent,t)}return 2147483647<Number(e)?-1:N.setTimeout(t,e||0)}function ce(t){t.a=ae((function(){t.a=null,t.c&&(t.c=!1,ce(t))}),t.h);var e=t.b;t.b=null,t.g.apply(null,e)}V(ie,Gt),(_=ie.prototype).aa=!1,_.M=null,_.Za=function(){if(this.aa){var t=F()-this.g;0<t&&t<.8*this.b?this.M=this.a.setTimeout(this.f,this.b-t):(this.M&&(this.a.clearTimeout(this.M),this.M=null),Qt(this,"tick"),this.aa&&(oe(this),this.start()))}},_.start=function(){this.aa=!0,this.M||(this.M=this.a.setTimeout(this.f,this.b),this.g=F())},_.G=function(){ie.X.G.call(this),oe(this),delete this.a};var ue=function(t){function e(e,n){var r=t.call(this)||this;return r.g=e,r.h=n,r.b=null,r.c=!1,r.a=null,r}return function(t,e){function n(){this.constructor=t}I(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.f=function(t){this.b=arguments,this.a?this.c=!0:ce(this)},e.prototype.G=function(){t.prototype.G.call(this),this.a&&(N.clearTimeout(this.a),this.a=null,this.c=!1,this.b=null)},e}(U);function he(t){U.call(this),this.b=t,this.a={}}V(he,U);var le=[];function de(t,e,n,r){Array.isArray(n)||(n&&(le[0]=n.toString()),n=le);for(var s=0;s<n.length;s++){var i=Ot(e,n[s],r||t.handleEvent,!1,t.b||t);if(!i)break;t.a[i.key]=i}}function fe(t){X(t.a,(function(t,e){this.a.hasOwnProperty(e)&&Vt(t)}),t),t.a={}}function me(){this.a=!0}function ge(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.a)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return Ht(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}he.prototype.G=function(){he.X.G.call(this),fe(this)},he.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},me.prototype.info=function(){};var pe={},ye=null;function we(){return ye=ye||new Gt}function ve(t){It.call(this,pe.Fa,t)}function be(t){var e=we();Qt(e,new ve(e,t))}function Ee(t,e){It.call(this,pe.STAT_EVENT,t),this.stat=e}function Ie(t){var e=we();Qt(e,new Ee(e,t))}function Te(t){It.call(this,pe.Ga,t)}function _e(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return N.setTimeout((function(){t()}),e)}pe.Fa="serverreachability",V(ve,It),pe.STAT_EVENT="statevent",V(Ee,It),pe.Ga="timingevent",V(Te,It);var Se={NO_ERROR:0,$a:1,nb:2,mb:3,hb:4,lb:5,ob:6,Da:7,TIMEOUT:8,rb:9},Ae={fb:"complete",Bb:"success",Ea:"error",Da:"abort",tb:"ready",ub:"readystatechange",TIMEOUT:"timeout",pb:"incrementaldata",sb:"progress",ib:"downloadprogress",Jb:"uploadprogress"};function Ne(){}function De(t){var e;return(e=t.a)||(e=t.a={}),e}function xe(){}Ne.prototype.a=null;var Ce,ke={OPEN:"a",eb:"b",Ea:"c",qb:"d"};function Re(){It.call(this,"d")}function Le(){It.call(this,"c")}function Oe(){}function Me(t,e,n,r){this.g=t,this.c=e,this.f=n,this.S=r||1,this.J=new he(this),this.P=Pe,t=at?125:void 0,this.R=new ie(t),this.B=null,this.b=!1,this.j=this.l=this.i=this.H=this.u=this.T=this.o=null,this.s=[],this.a=null,this.D=0,this.h=this.m=null,this.N=-1,this.A=!1,this.O=0,this.F=null,this.V=this.C=this.U=this.I=!1}V(Re,It),V(Le,It),V(Oe,Ne),Ce=new Oe;var Pe=45e3,Fe={},Ve={};function Ue(t,e,n){t.H=1,t.i=cn(en(e)),t.j=n,t.I=!0,qe(t,null)}function qe(t,e){t.u=F(),Ke(t),t.l=en(t.i);var n=t.l,r=t.S;Array.isArray(r)||(r=[String(r)]),En(n.b,"t",r),t.D=0,t.a=gr(t.g,t.g.C?e:null),0<t.O&&(t.F=new ue(M(t.Ca,t,t.a),t.O)),de(t.J,t.a,"readystatechange",t.Xa),e=t.B?J(t.B):{},t.j?(t.m||(t.m="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.a.ba(t.l,t.m,t.j,e)):(t.m="GET",t.a.ba(t.l,t.m,null,e)),be(1),function(t,e,n,r,s,i){t.info((function(){if(t.a)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.c,t.m,t.l,t.f,t.S,t.j)}function Be(t,e,n){for(var r=!0;!t.A&&t.D<n.length;){var s=$e(t,n);if(s==Ve){4==e&&(t.h=4,Ie(14),r=!1),ge(t.c,t.f,null,"[Incomplete Response]");break}if(s==Fe){t.h=4,Ie(15),ge(t.c,t.f,n,"[Invalid Chunk]"),r=!1;break}ge(t.c,t.f,s,null),He(t,s)}4==e&&0==n.length&&(t.h=1,Ie(16),r=!1),t.b=t.b&&r,r?0<n.length&&!t.V&&(t.V=!0,(e=t.g).a==t&&e.U&&!e.F&&(e.c.info("Great, no buffering proxy detected. Bytes received: "+n.length),ar(e),e.F=!0,Ie(11))):(ge(t.c,t.f,n,"[Invalid Chunked Response]"),ze(t),Qe(t))}function $e(t,e){var n=t.D,r=e.indexOf("\n",n);return-1==r?Ve:(n=Number(e.substring(n,r)),isNaN(n)?Fe:(r+=1)+n>e.length?Ve:(e=e.substr(r,n),t.D=r+n,e))}function Ke(t){t.T=F()+t.P,je(t,t.P)}function je(t,e){if(null!=t.o)throw Error("WatchDog timer not null");t.o=_e(M(t.Va,t),e)}function Ge(t){t.o&&(N.clearTimeout(t.o),t.o=null)}function Qe(t){0==t.g.v||t.A||hr(t.g,t)}function ze(t){Ge(t);var e=t.F;e&&"function"==typeof e.ja&&e.ja(),t.F=null,oe(t.R),fe(t.J),t.a&&(e=t.a,t.a=null,e.abort(),e.ja())}function He(t,e){try{var n=t.g;if(0!=n.v&&(n.a==t||Dn(n.b,t)))if(n.I=t.N,!t.C&&Dn(n.b,t)&&3==n.v){try{var r=n.ka.a.parse(e)}catch(t){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.j){if(n.a){if(!(n.a.u+3e3<t.u))break t;ur(n),Jn(n)}or(n),Ie(18)}}else n.oa=s[1],0<n.oa-n.P&&37500>s[2]&&n.H&&0==n.o&&!n.m&&(n.m=_e(M(n.Sa,n),6e3));if(1>=Nn(n.b)&&n.ea){try{n.ea()}catch(t){}n.ea=void 0}}else dr(n,11)}else if((t.C||n.a==t)&&ur(n),!j(e))for(e=r=n.ka.a.parse(e),r=0;r<e.length;r++)if(s=e[r],n.P=s[0],s=s[1],2==n.v)if("c"==s[0]){n.J=s[1],n.ga=s[2];var i=s[3];null!=i&&(n.ha=i,n.c.info("VER="+n.ha));var o=s[4];null!=o&&(n.pa=o,n.c.info("SVER="+n.pa));var a=s[5];if(null!=a&&"number"==typeof a&&0<a){var c=1.5*a;n.D=c,n.c.info("backChannelRequestTimeoutMs_="+c)}c=n;var u=t.a;if(u){var h=u.a?u.a.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=c.b;!l.a&&(z(h,"spdy")||z(h,"quic")||z(h,"h2"))&&(l.f=l.g,l.a=new Set,l.b&&(xn(l,l.b),l.b=null))}if(c.A){var d=u.a?u.a.getResponseHeader("X-HTTP-Session-Id"):null;d&&(c.na=d,an(c.B,c.A,d))}}n.v=3,n.f&&n.f.ta(),n.U&&(n.N=F()-t.u,n.c.info("Handshake RTT: "+n.N+"ms"));var f=t;if((c=n).la=mr(c,c.C?c.ga:null,c.fa),f.C){Cn(c.b,f);var m=f,g=c.D;g&&m.setTimeout(g),m.o&&(Ge(m),Ke(m)),c.a=f}else ir(c);0<n.g.length&&er(n)}else"stop"!=s[0]&&"close"!=s[0]||dr(n,7);else 3==n.v&&("stop"==s[0]||"close"==s[0]?"stop"==s[0]?dr(n,7):Xn(n):"noop"!=s[0]&&n.f&&n.f.sa(s),n.o=0);be(4)}catch(t){}}function We(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(x(t)||"string"==typeof t)B(t,e,void 0);else{if(t.L&&"function"==typeof t.L)var n=t.L();else if(t.K&&"function"==typeof t.K)n=void 0;else if(x(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.K&&"function"==typeof t.K)return t.K();if("string"==typeof t)return t.split("");if(x(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function Ye(t,e){this.b={},this.a=[],this.c=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof Ye)for(n=t.L(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function Xe(t){if(t.c!=t.a.length){for(var e=0,n=0;e<t.a.length;){var r=t.a[e];Je(t.b,r)&&(t.a[n++]=r),e++}t.a.length=n}if(t.c!=t.a.length){var s={};for(n=e=0;e<t.a.length;)Je(s,r=t.a[e])||(t.a[n++]=r,s[r]=1),e++;t.a.length=n}}function Je(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(_=Me.prototype).setTimeout=function(t){this.P=t},_.Xa=function(t){t=t.target;var e=this.F;e&&3==zn(t)?e.f():this.Ca(t)},_.Ca=function(t){try{if(t==this.a)t:{var e=zn(this.a),n=this.a.ua(),r=this.a.W();if(!(3>e||3==e&&!at&&!this.a.$())){this.A||4!=e||7==n||be(8==n||0>=r?3:2),Ge(this);var s=this.a.W();this.N=s;var i=this.a.$();if(this.b=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.c,this.m,this.l,this.f,this.S,e,s),this.b){if(this.U&&!this.C){e:{if(this.a){var o,a=this.a;if((o=a.a?a.a.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(o)){var c=o;break e}}c=null}if(!c){this.b=!1,this.h=3,Ie(12),ze(this),Qe(this);break t}ge(this.c,this.f,c,"Initial handshake response via X-HTTP-Initial-Response"),this.C=!0,He(this,c)}this.I?(Be(this,e,i),at&&this.b&&3==e&&(de(this.J,this.R,"tick",this.Wa),this.R.start())):(ge(this.c,this.f,i,null),He(this,i)),4==e&&ze(this),this.b&&!this.A&&(4==e?hr(this.g,this):(this.b=!1,Ke(this)))}else 400==s&&0<i.indexOf("Unknown SID")?(this.h=3,Ie(12)):(this.h=0,Ie(13)),ze(this),Qe(this)}}}catch(t){}},_.Wa=function(){if(this.a){var t=zn(this.a),e=this.a.$();this.D<e.length&&(Ge(this),Be(this,t,e),this.b&&4!=t&&Ke(this))}},_.cancel=function(){this.A=!0,ze(this)},_.Va=function(){this.o=null;var t=F();0<=t-this.T?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.c,this.l),2!=this.H&&(be(3),Ie(17)),ze(this),this.h=2,Qe(this)):je(this,this.T-t)},(_=Ye.prototype).K=function(){Xe(this);for(var t=[],e=0;e<this.a.length;e++)t.push(this.b[this.a[e]]);return t},_.L=function(){return Xe(this),this.a.concat()},_.get=function(t,e){return Je(this.b,t)?this.b[t]:e},_.set=function(t,e){Je(this.b,t)||(this.c++,this.a.push(t)),this.b[t]=e},_.forEach=function(t,e){for(var n=this.L(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Ze=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function tn(t,e){if(this.c=this.j=this.f="",this.h=null,this.i=this.g="",this.a=!1,t instanceof tn){this.a=void 0!==e?e:t.a,nn(this,t.f),this.j=t.j,rn(this,t.c),sn(this,t.h),this.g=t.g,e=t.b;var n=new yn;n.c=e.c,e.a&&(n.a=new Ye(e.a),n.b=e.b),on(this,n),this.i=t.i}else t&&(n=String(t).match(Ze))?(this.a=!!e,nn(this,n[1]||"",!0),this.j=un(n[2]||""),rn(this,n[3]||"",!0),sn(this,n[4]),this.g=un(n[5]||"",!0),on(this,n[6]||"",!0),this.i=un(n[7]||"")):(this.a=!!e,this.b=new yn(null,this.a))}function en(t){return new tn(t)}function nn(t,e,n){t.f=n?un(e,!0):e,t.f&&(t.f=t.f.replace(/:$/,""))}function rn(t,e,n){t.c=n?un(e,!0):e}function sn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.h=e}else t.h=null}function on(t,e,n){e instanceof yn?(t.b=e,function(t,e){e&&!t.f&&(wn(t),t.c=null,t.a.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(vn(this,e),En(this,n,t))}),t)),t.f=e}(t.b,t.a)):(n||(e=hn(e,gn)),t.b=new yn(e,t.a))}function an(t,e,n){t.b.set(e,n)}function cn(t){return an(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^F()).toString(36)),t}function un(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function hn(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,ln),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function ln(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}tn.prototype.toString=function(){var t=[],e=this.f;e&&t.push(hn(e,dn,!0),":");var n=this.c;return(n||"file"==e)&&(t.push("//"),(e=this.j)&&t.push(hn(e,dn,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.h)&&t.push(":",String(n))),(n=this.g)&&(this.c&&"/"!=n.charAt(0)&&t.push("/"),t.push(hn(n,"/"==n.charAt(0)?mn:fn,!0))),(n=this.b.toString())&&t.push("?",n),(n=this.i)&&t.push("#",hn(n,pn)),t.join("")};var dn=/[#\/\?@]/g,fn=/[#\?:]/g,mn=/[#\?]/g,gn=/[#\?@]/g,pn=/#/g;function yn(t,e){this.b=this.a=null,this.c=t||null,this.f=!!e}function wn(t){t.a||(t.a=new Ye,t.b=0,t.c&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.c,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function vn(t,e){wn(t),e=In(t,e),Je(t.a.b,e)&&(t.c=null,t.b-=t.a.get(e).length,Je((t=t.a).b,e)&&(delete t.b[e],t.c--,t.a.length>2*t.c&&Xe(t)))}function bn(t,e){return wn(t),e=In(t,e),Je(t.a.b,e)}function En(t,e,n){vn(t,e),0<n.length&&(t.c=null,t.a.set(In(t,e),K(n)),t.b+=n.length)}function In(t,e){return e=String(e),t.f&&(e=e.toLowerCase()),e}(_=yn.prototype).add=function(t,e){wn(this),this.c=null,t=In(this,t);var n=this.a.get(t);return n||this.a.set(t,n=[]),n.push(e),this.b+=1,this},_.forEach=function(t,e){wn(this),this.a.forEach((function(n,r){B(n,(function(n){t.call(e,n,r,this)}),this)}),this)},_.L=function(){wn(this);for(var t=this.a.K(),e=this.a.L(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},_.K=function(t){wn(this);var e=[];if("string"==typeof t)bn(this,t)&&(e=$(e,this.a.get(In(this,t))));else{t=this.a.K();for(var n=0;n<t.length;n++)e=$(e,t[n])}return e},_.set=function(t,e){return wn(this),this.c=null,bn(this,t=In(this,t))&&(this.b-=this.a.get(t).length),this.a.set(t,[e]),this.b+=1,this},_.get=function(t,e){return t&&0<(t=this.K(t)).length?String(t[0]):e},_.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var t=[],e=this.a.L(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.K(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.c=t.join("&")};var Tn=function(t,e){this.b=t,this.a=e};function _n(t){this.g=t||Sn,N.PerformanceNavigationTiming?t=0<(t=N.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(N.ia&&N.ia.ya&&N.ia.ya()&&N.ia.ya().Lb),this.f=t?this.g:1,this.a=null,1<this.f&&(this.a=new Set),this.b=null,this.c=[]}var Sn=10;function An(t){return!!t.b||!!t.a&&t.a.size>=t.f}function Nn(t){return t.b?1:t.a?t.a.size:0}function Dn(t,e){return t.b?t.b==e:!!t.a&&t.a.has(e)}function xn(t,e){t.a?t.a.add(e):t.b=e}function Cn(t,e){t.b&&t.b==e?t.b=null:t.a&&t.a.has(e)&&t.a.delete(e)}function kn(t){var e,n;if(null!=t.b)return t.c.concat(t.b.s);if(null!=t.a&&0!==t.a.size){var r=t.c;try{for(var s=T(t.a.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.s)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return K(t.c)}function Rn(){}function Ln(){this.a=new Rn}function On(t,e,n){var r=n||"";try{We(t,(function(t,n){var s=t;C(t)&&(s=Ht(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function Mn(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(t){}}_n.prototype.cancel=function(){var t,e;if(this.c=kn(this),this.b)this.b.cancel(),this.b=null;else if(this.a&&0!==this.a.size){try{for(var n=T(this.a.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.a.clear()}},Rn.prototype.stringify=function(t){return N.JSON.stringify(t,void 0)},Rn.prototype.parse=function(t){return N.JSON.parse(t,void 0)};var Pn=N.JSON.parse;function Fn(t){Gt.call(this),this.headers=new Ye,this.H=t||null,this.b=!1,this.s=this.a=null,this.B="",this.h=0,this.f="",this.g=this.A=this.l=this.u=!1,this.o=0,this.m=null,this.I=Vn,this.D=this.F=!1}V(Fn,Gt);var Vn="",Un=/^https?$/i,qn=["POST","PUT"];function Bn(t){return"content-type"==t.toLowerCase()}function $n(t,e){t.b=!1,t.a&&(t.g=!0,t.a.abort(),t.g=!1),t.f=e,t.h=5,Kn(t),Gn(t)}function Kn(t){t.u||(t.u=!0,Qt(t,"complete"),Qt(t,"error"))}function jn(t){if(t.b&&void 0!==A&&(!t.s[1]||4!=zn(t)||2!=t.W()))if(t.l&&4==zn(t))ae(t.za,0,t);else if(Qt(t,"readystatechange"),4==zn(t)){t.b=!1;try{var e,n=t.W();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.B).match(Ze)[1]||null;if(!i&&N.self&&N.self.location){var o=N.self.location.protocol;i=o.substr(0,o.length-1)}s=!Un.test(i?i.toLowerCase():"")}e=s}if(e)Qt(t,"complete"),Qt(t,"success");else{t.h=6;try{var a=2<zn(t)?t.a.statusText:""}catch(n){a=""}t.f=a+" ["+t.W()+"]",Kn(t)}}finally{Gn(t)}}}function Gn(t,e){if(t.a){Qn(t);var n=t.a,r=t.s[0]?D:null;t.a=null,t.s=null,e||Qt(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function Qn(t){t.a&&t.D&&(t.a.ontimeout=null),t.m&&(N.clearTimeout(t.m),t.m=null)}function zn(t){return t.a?t.a.readyState:0}function Hn(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return X(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):an(t,e,n))}function Wn(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Yn(t){this.pa=0,this.g=[],this.c=new me,this.ga=this.la=this.B=this.fa=this.a=this.na=this.A=this.V=this.i=this.O=this.l=null,this.Oa=this.R=0,this.La=Wn("failFast",!1,t),this.H=this.m=this.j=this.h=this.f=null,this.S=!0,this.I=this.oa=this.P=-1,this.T=this.o=this.u=0,this.Ha=Wn("baseRetryDelayMs",5e3,t),this.Ra=Wn("retryDelaySeedMs",1e4,t),this.Ma=Wn("forwardChannelMaxRetries",2,t),this.ma=Wn("forwardChannelRequestTimeoutMs",2e4,t),this.Na=t&&t.g||void 0,this.D=void 0,this.C=t&&t.supportsCrossDomainXhr||!1,this.J="",this.b=new _n(t&&t.concurrentRequestLimit),this.ka=new Ln,this.da=t&&t.fastHandshake||!1,this.Ia=t&&t.b||!1,t&&t.f&&(this.c.a=!1),t&&t.forceLongPolling&&(this.S=!1),this.U=!this.da&&this.S&&t&&t.detectBufferingProxy||!1,this.ea=void 0,this.N=0,this.F=!1,this.s=null,(this.Ka=t&&t.c||!1)&&this.c.info("Opt-in to enable Chrome Origin Trials.")}function Xn(t){if(Zn(t),3==t.v){var e=t.R++,n=en(t.B);an(n,"SID",t.J),an(n,"RID",e),an(n,"TYPE","terminate"),rr(t,n),(e=new Me(t,t.c,e,void 0)).H=2,e.i=cn(en(n)),n=!1,N.navigator&&N.navigator.sendBeacon&&(n=N.navigator.sendBeacon(e.i.toString(),"")),!n&&N.Image&&((new Image).src=e.i,n=!0),n||(e.a=gr(e.g,null),e.a.ba(e.i)),e.u=F(),Ke(e)}fr(t)}function Jn(t){t.a&&(ar(t),t.a.cancel(),t.a=null)}function Zn(t){Jn(t),t.j&&(N.clearTimeout(t.j),t.j=null),ur(t),t.b.cancel(),t.h&&("number"==typeof t.h&&N.clearTimeout(t.h),t.h=null)}function tr(t,e){t.g.push(new Tn(t.Oa++,e)),3==t.v&&er(t)}function er(t){An(t.b)||t.h||(t.h=!0,ee(t.Ba,t),t.u=0)}function nr(t,e){var n;n=e?e.f:t.R++;var r=en(t.B);an(r,"SID",t.J),an(r,"RID",n),an(r,"AID",t.P),rr(t,r),t.i&&t.l&&Hn(r,t.i,t.l),n=new Me(t,t.c,n,t.u+1),null===t.i&&(n.B=t.l),e&&(t.g=e.s.concat(t.g)),e=sr(t,n,1e3),n.setTimeout(Math.round(.5*t.ma)+Math.round(.5*t.ma*Math.random())),xn(t.b,n),Ue(n,r,e)}function rr(t,e){t.f&&We({},(function(t,n){an(e,n,t)}))}function sr(t,e,n){n=Math.min(t.g.length,n);var r=t.f?M(t.f.Ja,t.f,t):null;t:for(var s=t.g,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].b,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].b,h=s[c].a;if(0>(u-=i))i=Math.max(0,s[c].b-100),a=!1;else try{On(h,o,"req"+u+"_")}catch(t){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.g.splice(0,n),e.s=t,r}function ir(t){t.a||t.j||(t.T=1,ee(t.Aa,t),t.o=0)}function or(t){return!(t.a||t.j||3<=t.o)&&(t.T++,t.j=_e(M(t.Aa,t),lr(t,t.o)),t.o++,!0)}function ar(t){null!=t.s&&(N.clearTimeout(t.s),t.s=null)}function cr(t){t.a=new Me(t,t.c,"rpc",t.T),null===t.i&&(t.a.B=t.l),t.a.O=0;var e=en(t.la);an(e,"RID","rpc"),an(e,"SID",t.J),an(e,"CI",t.H?"0":"1"),an(e,"AID",t.P),rr(t,e),an(e,"TYPE","xmlhttp"),t.i&&t.l&&Hn(e,t.i,t.l),t.D&&t.a.setTimeout(t.D);var n=t.a;t=t.ga,n.H=1,n.i=cn(en(e)),n.j=null,n.I=!0,qe(n,t)}function ur(t){null!=t.m&&(N.clearTimeout(t.m),t.m=null)}function hr(t,e){var n=null;if(t.a==e){ur(t),ar(t),t.a=null;var r=2}else{if(!Dn(t.b,e))return;n=e.s,Cn(t.b,e),r=1}if(t.I=e.N,0!=t.v)if(e.b)if(1==r){n=e.j?e.j.length:0,e=F()-e.u;var s=t.u;Qt(r=we(),new Te(r,n,e,s)),er(t)}else ir(t);else if(3==(s=e.h)||0==s&&0<t.I||!(1==r&&function(t,e){return!(Nn(t.b)>=t.b.f-(t.h?1:0)||(t.h?(t.g=e.s.concat(t.g),0):1==t.v||2==t.v||t.u>=(t.La?0:t.Ma)||(t.h=_e(M(t.Ba,t,e),lr(t,t.u)),t.u++,0)))}(t,e)||2==r&&or(t)))switch(n&&0<n.length&&(e=t.b,e.c=e.c.concat(n)),s){case 1:dr(t,5);break;case 4:dr(t,10);break;case 3:dr(t,6);break;default:dr(t,2)}}function lr(t,e){var n=t.Ha+Math.floor(Math.random()*t.Ra);return t.f||(n*=2),n*e}function dr(t,e){if(t.c.info("Error code "+e),2==e){var n=null;t.f&&(n=null);var r=M(t.Ya,t);n||(n=new tn("//www.google.com/images/cleardot.gif"),N.location&&"http"==N.location.protocol||nn(n,"https"),cn(n)),function(t,e){var n=new me;if(N.Image){var r=new Image;r.onload=P(Mn,n,r,"TestLoadImage: loaded",!0,e),r.onerror=P(Mn,n,r,"TestLoadImage: error",!1,e),r.onabort=P(Mn,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=P(Mn,n,r,"TestLoadImage: timeout",!1,e),N.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else Ie(2);t.v=0,t.f&&t.f.ra(e),fr(t),Zn(t)}function fr(t){t.v=0,t.I=-1,t.f&&(0==kn(t.b).length&&0==t.g.length||(t.b.c.length=0,K(t.g),t.g.length=0),t.f.qa())}function mr(t,e,n){var r=function(t){return t instanceof tn?en(t):new tn(t,void 0)}(n);if(""!=r.c)e&&rn(r,e+"."+r.c),sn(r,r.h);else{var s=N.location;r=function(t,e,n,r){var s=new tn(null,void 0);return t&&nn(s,t),e&&rn(s,e),n&&sn(s,n),r&&(s.g=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.V&&X(t.V,(function(t,e){an(r,e,t)})),e=t.A,n=t.na,e&&n&&an(r,e,n),an(r,"VER",t.ha),rr(t,r),r}function gr(t,e){if(e&&!t.C)throw Error("Can't create secondary domain capable XhrIo object.");return(e=new Fn(t.Na)).F=t.C,e}function pr(){}function yr(){if(it&&!(10<=Number(wt)))throw Error("Environmental error: no available transport.")}function wr(t,e){Gt.call(this),this.a=new Yn(e),this.o=t,this.b=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.a.l=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.a&&(t?t["X-WebChannel-Client-Profile"]=e.a:t={"X-WebChannel-Client-Profile":e.a}),this.a.O=t,(t=e&&e.httpHeadersOverwriteParam)&&!j(t)&&(this.a.i=t),this.m=e&&e.supportsCrossDomainXhr||!1,this.l=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!j(e)&&(this.a.A=e,null!==(t=this.b)&&e in t&&(e in(t=this.b)&&delete t[e])),this.f=new Er(this)}function vr(t){Re.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.c=t)?(t=this.c,this.data=null!==e&&t in e?e[t]:void 0):this.data=e}else this.data=t}function br(){Le.call(this),this.status=1}function Er(t){this.a=t}(_=Fn.prototype).ba=function(t,e,n,r){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request="+this.B+"; newUri="+t);e=e?e.toUpperCase():"GET",this.B=t,this.f="",this.h=0,this.u=!1,this.b=!0,this.a=new XMLHttpRequest,this.s=this.H?De(this.H):De(Ce),this.a.onreadystatechange=M(this.za,this);try{this.A=!0,this.a.open(e,String(t),!0),this.A=!1}catch(t){return void $n(this,t)}t=n||"";var s=new Ye(this.headers);r&&We(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=Bn,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.L()),n=N.FormData&&t instanceof N.FormData,!(0<=q(qn,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.a.setRequestHeader(e,t)}),this),this.I&&(this.a.responseType=this.I),"withCredentials"in this.a&&this.a.withCredentials!==this.F&&(this.a.withCredentials=this.F);try{Qn(this),0<this.o&&((this.D=function(t){return it&&pt(9)&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.a))?(this.a.timeout=this.o,this.a.ontimeout=M(this.xa,this)):this.m=ae(this.xa,this.o,this)),this.l=!0,this.a.send(t),this.l=!1}catch(t){$n(this,t)}},_.xa=function(){void 0!==A&&this.a&&(this.f="Timed out after "+this.o+"ms, aborting",this.h=8,Qt(this,"timeout"),this.abort(8))},_.abort=function(t){this.a&&this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1,this.h=t||7,Qt(this,"complete"),Qt(this,"abort"),Gn(this))},_.G=function(){this.a&&(this.b&&(this.b=!1,this.g=!0,this.a.abort(),this.g=!1),Gn(this,!0)),Fn.X.G.call(this)},_.za=function(){this.j||(this.A||this.l||this.g?jn(this):this.Ua())},_.Ua=function(){jn(this)},_.W=function(){try{return 2<zn(this)?this.a.status:-1}catch(t){return-1}},_.$=function(){try{return this.a?this.a.responseText:""}catch(t){return""}},_.Pa=function(t){if(this.a){var e=this.a.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Pn(e)}},_.ua=function(){return this.h},_.Qa=function(){return"string"==typeof this.f?this.f:String(this.f)},(_=Yn.prototype).ha=8,_.v=1,_.Ba=function(t){if(this.h)if(this.h=null,1==this.v){if(!t){this.R=Math.floor(1e5*Math.random()),t=this.R++;var e,n=new Me(this,this.c,t,void 0),r=this.l;if(this.O&&(r?tt(r=J(r),this.O):r=this.O),null===this.i&&(n.B=r),this.da)t:{for(var s=e=0;s<this.g.length;s++){var i=this.g[s];if(void 0===(i="__data__"in i.a&&"string"==typeof(i=i.a.__data__)?i.length:void 0))break;if(4096<(e+=i)){e=s;break t}if(4096===e||s===this.g.length-1){e=s+1;break t}}e=1e3}else e=1e3;e=sr(this,n,e),an(s=en(this.B),"RID",t),an(s,"CVER",22),this.A&&an(s,"X-HTTP-Session-Id",this.A),rr(this,s),this.i&&r&&Hn(s,this.i,r),xn(this.b,n),this.Ia&&an(s,"TYPE","init"),this.da?(an(s,"$req",e),an(s,"SID","null"),n.U=!0,Ue(n,s,null)):Ue(n,s,e),this.v=2}}else 3==this.v&&(t?nr(this,t):0==this.g.length||An(this.b)||nr(this))},_.Aa=function(){if(this.j=null,cr(this),this.U&&!(this.F||null==this.a||0>=this.N)){var t=2*this.N;this.c.info("BP detection timer enabled: "+t),this.s=_e(M(this.Ta,this),t)}},_.Ta=function(){this.s&&(this.s=null,this.c.info("BP detection timeout reached."),this.c.info("Buffering proxy detected and switch to long-polling!"),this.H=!1,this.F=!0,Ie(10),Jn(this),cr(this))},_.Sa=function(){null!=this.m&&(this.m=null,Jn(this),or(this),Ie(19))},_.Ya=function(t){t?(this.c.info("Successfully pinged google.com"),Ie(2)):(this.c.info("Failed to ping google.com"),Ie(1))},(_=pr.prototype).ta=function(){},_.sa=function(){},_.ra=function(){},_.qa=function(){},_.Ja=function(){},yr.prototype.a=function(t,e){return new wr(t,e)},V(wr,Gt),wr.prototype.g=function(){this.a.f=this.f,this.m&&(this.a.C=!0);var t=this.a,e=this.o,n=this.b||void 0;Ie(0),t.fa=e,t.V=n||{},t.H=t.S,t.B=mr(t,null,t.fa),er(t)},wr.prototype.close=function(){Xn(this.a)},wr.prototype.h=function(t){if("string"==typeof t){var e={};e.__data__=t,tr(this.a,e)}else this.l?((e={}).__data__=Ht(t),tr(this.a,e)):tr(this.a,t)},wr.prototype.G=function(){this.a.f=null,delete this.f,Xn(this.a),delete this.a,wr.X.G.call(this)},V(vr,Re),V(br,Le),V(Er,pr),Er.prototype.ta=function(){Qt(this.a,"a")},Er.prototype.sa=function(t){Qt(this.a,new vr(t))},Er.prototype.ra=function(t){Qt(this.a,new br(t))},Er.prototype.qa=function(){Qt(this.a,"b")},yr.prototype.createWebChannel=yr.prototype.a,wr.prototype.send=wr.prototype.h,wr.prototype.open=wr.prototype.g,wr.prototype.close=wr.prototype.close,Se.NO_ERROR=0,Se.TIMEOUT=8,Se.HTTP_ERROR=6,Ae.COMPLETE="complete",xe.EventType=ke,ke.OPEN="a",ke.CLOSE="b",ke.ERROR="c",ke.MESSAGE="d",Gt.prototype.listen=Gt.prototype.va,Fn.prototype.listenOnce=Fn.prototype.wa,Fn.prototype.getLastError=Fn.prototype.Qa,Fn.prototype.getLastErrorCode=Fn.prototype.ua,Fn.prototype.getStatus=Fn.prototype.W,Fn.prototype.getResponseJson=Fn.prototype.Pa,Fn.prototype.getResponseText=Fn.prototype.$,Fn.prototype.send=Fn.prototype.ba;var Ir=Se,Tr=Ae,_r=pe,Sr=10,Ar=11,Nr=xe,Dr=Fn;
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
let xr="8.6.1";
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
     */class Cr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Cr.o=-1;
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
const kr={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Rr extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const Lr=new E("@firebase/firestore");function Or(){return Lr.logLevel}function Mr(t,...e){if(Lr.logLevel<=g.DEBUG){const n=e.map(Vr);Lr.debug(`Firestore (${xr}): ${t}`,...n)}}function Pr(t,...e){if(Lr.logLevel<=g.ERROR){const n=e.map(Vr);Lr.error(`Firestore (${xr}): ${t}`,...n)}}function Fr(t,...e){if(Lr.logLevel<=g.WARN){const n=e.map(Vr);Lr.warn(`Firestore (${xr}): ${t}`,...n)}}function Vr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}var e}
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
     */function Ur(t="Unexpected state"){const e=`FIRESTORE (${xr}) INTERNAL ASSERTION FAILED: `+t;throw Pr(e),new Error(e)}function qr(t,e){t||Ur()}function Br(t,e){return t}
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
     */function $r(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
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
     */class Kr{static u(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let n="";for(;n.length<20;){const r=$r(40);for(let s=0;s<r.length;++s)n.length<20&&r[s]<e&&(n+=t.charAt(r[s]%t.length))}return n}}function jr(t,e){return t<e?-1:t>e?1:0}function Gr(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}function Qr(t){return t+"\0"}
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
     */class zr{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Rr(kr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Rr(kr.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Rr(kr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Rr(kr.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return zr.fromMillis(Date.now())}static fromDate(t){return zr.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new zr(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?jr(this.nanoseconds,t.nanoseconds):jr(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
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
     */class Hr{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Hr(t)}static min(){return new Hr(new zr(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
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
     */function Wr(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Yr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Xr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
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
     */class Jr{constructor(t,e,n){void 0===e?e=0:e>t.length&&Ur(),void 0===n?n=t.length-e:n>t.length-e&&Ur(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Jr.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Jr?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Zr extends Jr{construct(t,e,n){return new Zr(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Rr(kr.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Zr(e)}static emptyPath(){return new Zr([])}}const ts=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class es extends Jr{construct(t,e,n){return new es(t,e,n)}static isValidIdentifier(t){return ts.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),es.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new es(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Rr(kr.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Rr(kr.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Rr(kr.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Rr(kr.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new es(e)}static emptyPath(){return new es([])}}
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
     */class ns{constructor(t){this.fields=t,t.sort(es.comparator)}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Gr(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
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
     */class rs{constructor(t){this.binaryString=t}static fromBase64String(t){const e=atob(t);return new rs(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new rs(e)}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}
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
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return jr(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}rs.EMPTY_BYTE_STRING=new rs("");const ss=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function is(t){if(qr(!!t),"string"==typeof t){let e=0;const n=ss.exec(t);if(qr(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:os(t.seconds),nanos:os(t.nanos)}}function os(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function as(t){return"string"==typeof t?rs.fromBase64String(t):rs.fromUint8Array(t)}
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
     */function cs(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function us(t){const e=t.mapValue.fields.__previous_value__;return cs(e)?us(e):e}function hs(t){const e=is(t.mapValue.fields.__local_write_time__.timestampValue);return new zr(e.seconds,e.nanos)}
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
     */function ls(t){return null==t}function ds(t){return 0===t&&1/t==-1/0}function fs(t){return"number"==typeof t&&Number.isInteger(t)&&!ds(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
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
     */class ms{constructor(t){this.path=t}static fromPath(t){return new ms(Zr.fromString(t))}static fromName(t){return new ms(Zr.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Zr.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Zr.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new ms(new Zr(t.slice()))}}
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
     */function gs(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?cs(t)?4:10:Ur()}function ps(t,e){const n=gs(t);if(n!==gs(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return hs(t).isEqual(hs(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=is(t.timestampValue),r=is(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return as(t.bytesValue).isEqual(as(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return os(t.geoPointValue.latitude)===os(e.geoPointValue.latitude)&&os(t.geoPointValue.longitude)===os(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return os(t.integerValue)===os(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=os(t.doubleValue),r=os(e.doubleValue);return n===r?ds(n)===ds(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Gr(t.arrayValue.values||[],e.arrayValue.values||[],ps);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(Wr(n)!==Wr(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!ps(n[t],r[t])))return!1;return!0}(t,e);default:return Ur()}}function ys(t,e){return void 0!==(t.values||[]).find((t=>ps(t,e)))}function ws(t,e){const n=gs(t),r=gs(e);if(n!==r)return jr(n,r);switch(n){case 0:return 0;case 1:return jr(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=os(t.integerValue||t.doubleValue),r=os(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return vs(t.timestampValue,e.timestampValue);case 4:return vs(hs(t),hs(e));case 5:return jr(t.stringValue,e.stringValue);case 6:return function(t,e){const n=as(t),r=as(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=jr(n[t],r[t]);if(0!==e)return e}return jr(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=jr(os(t.latitude),os(e.latitude));return 0!==n?n:jr(os(t.longitude),os(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=ws(n[t],r[t]);if(e)return e}return jr(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let t=0;t<r.length&&t<i.length;++t){const e=jr(r[t],i[t]);if(0!==e)return e;const o=ws(n[r[t]],s[i[t]]);if(0!==o)return o}return jr(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Ur()}}function vs(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return jr(t,e);const n=is(t),r=is(e),s=jr(n.seconds,r.seconds);return 0!==s?s:jr(n.nanos,r.nanos)}function bs(t){return Es(t)}function Es(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=is(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?as(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,ms.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Es(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${Es(t.fields[s])}`;return n+"}"}(t.mapValue):Ur();var e,n}function Is(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Ts(t){return!!t&&"integerValue"in t}function _s(t){return!!t&&"arrayValue"in t}function Ss(t){return!!t&&"nullValue"in t}function As(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ns(t){return!!t&&"mapValue"in t}
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
     */class Ds{constructor(t){this.overlayMap=new Map,this.partialValue=t}static empty(){return new Ds({mapValue:{}})}field(t){return Ds.extractNestedValue(this.buildProto(),t)}toProto(){return this.field(es.emptyPath())}set(t,e){this.setOverlay(t,e)}setAll(t){t.forEach(((t,e)=>{t?this.set(e,t):this.delete(e)}))}delete(t){this.setOverlay(t,null)}isEqual(t){return ps(this.buildProto(),t.buildProto())}setOverlay(t,e){let n=this.overlayMap;for(let e=0;e<t.length-1;++e){const r=t.get(e);let s=n.get(r);s instanceof Map?n=s:s&&10===gs(s)?(s=new Map(Object.entries(s.mapValue.fields||{})),n.set(r,s),n=s):(s=new Map,n.set(r,s),n=s)}n.set(t.lastSegment(),e)}applyOverlay(t,e){let n=!1;const r=Ds.extractNestedValue(this.partialValue,t),s=Ns(r)?Object.assign({},r.mapValue.fields):{};return e.forEach(((e,r)=>{if(e instanceof Map){const i=this.applyOverlay(t.child(r),e);null!=i&&(s[r]=i,n=!0)}else null!==e?(s[r]=e,n=!0):s.hasOwnProperty(r)&&(delete s[r],n=!0)})),n?{mapValue:{fields:s}}:null}buildProto(){const t=this.applyOverlay(es.emptyPath(),this.overlayMap);return null!=t&&(this.partialValue=t,this.overlayMap.clear()),this.partialValue}static extractNestedValue(t,e){if(e.isEmpty())return t;{let n=t;for(let t=0;t<e.length-1;++t){if(!n.mapValue.fields)return null;if(n=n.mapValue.fields[e.get(t)],!Ns(n))return null}return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}clone(){return new Ds(this.buildProto())}}function xs(t){const e=[];return Yr(t.fields||{},((t,n)=>{const r=new es([t]);if(Ns(n)){const t=xs(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new ns(e)
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
     */}class Cs{constructor(t,e,n,r,s){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=s}static newInvalidDocument(t){return new Cs(t,0,Hr.min(),Ds.empty(),0)}static newFoundDocument(t,e,n){return new Cs(t,1,e,n,0)}static newNoDocument(t,e){return new Cs(t,2,e,Ds.empty(),0)}static newUnknownDocument(t,e){return new Cs(t,3,e,Ds.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ds.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ds.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Cs&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new Cs(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.toProto())}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
     */class ks{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function Rs(t,e=null,n=[],r=[],s=null,i=null,o=null){return new ks(t,e,n,r,s,i,o)}function Ls(t){const e=Br(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+bs(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),ls(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=Qs(e.startAt)),e.endAt&&(t+="|ub:",t+=Qs(e.endAt)),e.h=t}return e.h}function Os(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Hs(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!ps(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ys(t.startAt,e.startAt)&&Ys(t.endAt,e.endAt)}function Ms(t){return ms.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Ps extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Fs(t,e,n):"array-contains"===e?new Bs(t,n):"in"===e?new $s(t,n):"not-in"===e?new Ks(t,n):"array-contains-any"===e?new js(t,n):new Ps(t,e,n)}static l(t,e,n){return"in"===e?new Vs(t,n):new Us(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(ws(e,this.value)):null!==e&&gs(this.value)===gs(e)&&this.m(ws(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Ur()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Fs extends Ps{constructor(t,e,n){super(t,e,n),this.key=ms.fromName(n.referenceValue)}matches(t){const e=ms.comparator(t.key,this.key);return this.m(e)}}class Vs extends Ps{constructor(t,e){super(t,"in",e),this.keys=qs("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Us extends Ps{constructor(t,e){super(t,"not-in",e),this.keys=qs("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function qs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>ms.fromName(t.referenceValue)))}class Bs extends Ps{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return _s(e)&&ys(e.arrayValue,this.value)}}class $s extends Ps{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&ys(this.value.arrayValue,e)}}class Ks extends Ps{constructor(t,e){super(t,"not-in",e)}matches(t){if(ys(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!ys(this.value.arrayValue,e)}}class js extends Ps{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!_s(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>ys(this.value.arrayValue,t)))}}class Gs{constructor(t,e){this.position=t,this.before=e}}function Qs(t){return`${t.before?"b":"a"}:${t.position.map((t=>bs(t))).join(",")}`}class zs{constructor(t,e="asc"){this.field=t,this.dir=e}}function Hs(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function Ws(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?ms.comparator(ms.fromName(o.referenceValue),n.key):ws(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function Ys(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!ps(t.position[n],e.position[n]))return!1;return!0}
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
     */class Xs{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function Js(t,e,n,r,s,i,o,a){return new Xs(t,e,n,r,s,i,o,a)}function Zs(t){return new Xs(t)}function ti(t){return!ls(t.limit)&&"F"===t.limitType}function ei(t){return!ls(t.limit)&&"L"===t.limitType}function ni(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function ri(t){for(const e of t.filters)if(e.g())return e.field;return null}function si(t){return null!==t.collectionGroup}function ii(t){const e=Br(t);if(null===e.p){e.p=[];const t=ri(e),n=ni(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new zs(t)),e.p.push(new zs(es.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new zs(es.keyField(),t))}}}return e.p}function oi(t){const e=Br(t);if(!e.T)if("F"===e.limitType)e.T=Rs(e.path,e.collectionGroup,ii(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of ii(e)){const e="desc"===n.dir?"asc":"desc";t.push(new zs(n.field,e))}const n=e.endAt?new Gs(e.endAt.position,!e.endAt.before):null,r=e.startAt?new Gs(e.startAt.position,!e.startAt.before):null;e.T=Rs(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function ai(t,e,n){return new Xs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ci(t,e){return Os(oi(t),oi(e))&&t.limitType===e.limitType}function ui(t){return`${Ls(oi(t))}|lt:${t.limitType}`}function hi(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${bs(e.value)}`;var e})).join(", ")}]`),ls(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: "+Qs(t.startAt)),t.endAt&&(e+=", endAt: "+Qs(t.endAt)),`Target(${e})`}(oi(t))}; limitType=${t.limitType})`}function li(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):ms.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!Ws(t.startAt,ii(t),e))&&(!t.endAt||!Ws(t.endAt,ii(t),e))}(t,e)}function di(t){return(e,n)=>{let r=!1;for(const s of ii(t)){const t=fi(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function fi(t,e,n){const r=t.field.isKeyField()?ms.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?ws(r,s):Ur()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Ur()}}
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
     */function mi(t,e){if(t.I){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ds(e)?"-0":e}}function gi(t){return{integerValue:""+t}}function pi(t,e){return fs(e)?gi(e):mi(t,e)}
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
     */class yi{constructor(){this._=void 0}}function wi(t,e,n){return t instanceof Ei?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Ii?Ti(t,e):t instanceof _i?Si(t,e):function(t,e){const n=bi(t,e),r=Ni(n)+Ni(t.A);return Ts(n)&&Ts(t.A)?gi(r):mi(t.R,r)}(t,e)}function vi(t,e,n){return t instanceof Ii?Ti(t,e):t instanceof _i?Si(t,e):n}function bi(t,e){return t instanceof Ai?Ts(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class Ei extends yi{}class Ii extends yi{constructor(t){super(),this.elements=t}}function Ti(t,e){const n=Di(e);for(const e of t.elements)n.some((t=>ps(t,e)))||n.push(e);return{arrayValue:{values:n}}}class _i extends yi{constructor(t){super(),this.elements=t}}function Si(t,e){let n=Di(e);for(const e of t.elements)n=n.filter((t=>!ps(t,e)));return{arrayValue:{values:n}}}class Ai extends yi{constructor(t,e){super(),this.R=t,this.A=e}}function Ni(t){return os(t.integerValue||t.doubleValue)}function Di(t){return _s(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
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
     */class xi{constructor(t,e){this.field=t,this.transform=e}}class Ci{constructor(t,e){this.version=t,this.transformResults=e}}class ki{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ki}static exists(t){return new ki(void 0,t)}static updateTime(t){return new ki(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Ri(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Li{}function Oi(t,e,n){t instanceof Ui?function(t,e,n){const r=t.value.clone(),s=$i(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof qi?function(t,e,n){if(!Ri(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=$i(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(Bi(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):function(t,e,n){e.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,n)}function Mi(t,e,n){t instanceof Ui?function(t,e,n){if(!Ri(t.precondition,e))return;const r=t.value.clone(),s=Ki(t.fieldTransforms,n,e);r.setAll(s),e.convertToFoundDocument(Vi(e),r).setHasLocalMutations()}(t,e,n):t instanceof qi?function(t,e,n){if(!Ri(t.precondition,e))return;const r=Ki(t.fieldTransforms,n,e),s=e.data;s.setAll(Bi(t)),s.setAll(r),e.convertToFoundDocument(Vi(e),s).setHasLocalMutations()}(t,e,n):function(t,e){Ri(t.precondition,e)&&e.convertToNoDocument(Hr.min())}(t,e)}function Pi(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=bi(r.transform,t||null);null!=s&&(null==n&&(n=Ds.empty()),n.set(r.field,s))}return n||null}function Fi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&Gr(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Ii&&e instanceof Ii||t instanceof _i&&e instanceof _i?Gr(t.elements,e.elements,ps):t instanceof Ai&&e instanceof Ai?ps(t.A,e.A):t instanceof Ei&&e instanceof Ei}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function Vi(t){return t.isFoundDocument()?t.version:Hr.min()}class Ui extends Li{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class qi extends Li{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Bi(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function $i(t,e,n){const r=new Map;qr(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,vi(o,a,n[s]))}return r}function Ki(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,wi(t,i,e))}return r}class ji extends Li{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class Gi extends Li{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
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
     */class Qi{constructor(t){this.count=t}}
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
     */var zi,Hi;function Wi(t){switch(t){case kr.OK:return Ur();case kr.CANCELLED:case kr.UNKNOWN:case kr.DEADLINE_EXCEEDED:case kr.RESOURCE_EXHAUSTED:case kr.INTERNAL:case kr.UNAVAILABLE:case kr.UNAUTHENTICATED:return!1;case kr.INVALID_ARGUMENT:case kr.NOT_FOUND:case kr.ALREADY_EXISTS:case kr.PERMISSION_DENIED:case kr.FAILED_PRECONDITION:case kr.ABORTED:case kr.OUT_OF_RANGE:case kr.UNIMPLEMENTED:case kr.DATA_LOSS:return!0;default:return Ur()}}function Yi(t){if(void 0===t)return Pr("GRPC error has no .code"),kr.UNKNOWN;switch(t){case zi.OK:return kr.OK;case zi.CANCELLED:return kr.CANCELLED;case zi.UNKNOWN:return kr.UNKNOWN;case zi.DEADLINE_EXCEEDED:return kr.DEADLINE_EXCEEDED;case zi.RESOURCE_EXHAUSTED:return kr.RESOURCE_EXHAUSTED;case zi.INTERNAL:return kr.INTERNAL;case zi.UNAVAILABLE:return kr.UNAVAILABLE;case zi.UNAUTHENTICATED:return kr.UNAUTHENTICATED;case zi.INVALID_ARGUMENT:return kr.INVALID_ARGUMENT;case zi.NOT_FOUND:return kr.NOT_FOUND;case zi.ALREADY_EXISTS:return kr.ALREADY_EXISTS;case zi.PERMISSION_DENIED:return kr.PERMISSION_DENIED;case zi.FAILED_PRECONDITION:return kr.FAILED_PRECONDITION;case zi.ABORTED:return kr.ABORTED;case zi.OUT_OF_RANGE:return kr.OUT_OF_RANGE;case zi.UNIMPLEMENTED:return kr.UNIMPLEMENTED;case zi.DATA_LOSS:return kr.DATA_LOSS;default:return Ur()}}(Hi=zi||(zi={}))[Hi.OK=0]="OK",Hi[Hi.CANCELLED=1]="CANCELLED",Hi[Hi.UNKNOWN=2]="UNKNOWN",Hi[Hi.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Hi[Hi.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Hi[Hi.NOT_FOUND=5]="NOT_FOUND",Hi[Hi.ALREADY_EXISTS=6]="ALREADY_EXISTS",Hi[Hi.PERMISSION_DENIED=7]="PERMISSION_DENIED",Hi[Hi.UNAUTHENTICATED=16]="UNAUTHENTICATED",Hi[Hi.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Hi[Hi.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Hi[Hi.ABORTED=10]="ABORTED",Hi[Hi.OUT_OF_RANGE=11]="OUT_OF_RANGE",Hi[Hi.UNIMPLEMENTED=12]="UNIMPLEMENTED",Hi[Hi.INTERNAL=13]="INTERNAL",Hi[Hi.UNAVAILABLE=14]="UNAVAILABLE",Hi[Hi.DATA_LOSS=15]="DATA_LOSS";
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
class Xi{constructor(t,e){this.comparator=t,this.root=e||Zi.EMPTY}insert(t,e){return new Xi(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Zi.BLACK,null,null))}remove(t){return new Xi(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Zi.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ji(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ji(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ji(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ji(this.root,t,this.comparator,!0)}}class Ji{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!t.isEmpty();)if(s=e?n(t.key,e):1,r&&(s*=-1),s<0)t=this.isReverse?t.left:t.right;else{if(0===s){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Zi{constructor(t,e,n,r,s){this.key=t,this.value=e,this.color=null!=n?n:Zi.RED,this.left=null!=r?r:Zi.EMPTY,this.right=null!=s?s:Zi.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,s){return new Zi(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const s=n(t,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===s?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Zi.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return Zi.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Zi.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Zi.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Ur();if(this.right.isRed())throw Ur();const t=this.left.check();if(t!==this.right.check())throw Ur();return t+(this.isRed()?0:1)}}Zi.EMPTY=null,Zi.RED=!0,Zi.BLACK=!1,Zi.EMPTY=new class{constructor(){this.size=0}get key(){throw Ur()}get value(){throw Ur()}get color(){throw Ur()}get left(){throw Ur()}get right(){throw Ur()}copy(t,e,n,r,s){return this}insert(t,e,n){return new Zi(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
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
     */const no=new Xi(ms.comparator);function ro(){return no}const so=new Xi(ms.comparator);function io(){return so}const oo=new Xi(ms.comparator);function ao(){return oo}const co=new to(ms.comparator);function uo(...t){let e=co;for(const n of t)e=e.add(n);return e}const ho=new to(jr);function lo(){return ho}
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
     */class fo{constructor(t,e,n,r,s){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(t,e){const n=new Map;return n.set(t,mo.createSynthesizedTargetChangeForCurrentChange(t,e)),new fo(Hr.min(),n,lo(),ro(),uo())}}class mo{constructor(t,e,n,r,s){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(t,e){return new mo(rs.EMPTY_BYTE_STRING,e,uo(),uo(),uo())}}
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
     */class go{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class po{constructor(t,e){this.targetId=t,this.V=e}}class yo{constructor(t,e,n=rs.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class wo{constructor(){this.S=0,this.D=Eo(),this.C=rs.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}M(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}F(){let t=uo(),e=uo(),n=uo();return this.D.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Ur()}})),new mo(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=Eo()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class vo{constructor(t){this.W=t,this.G=new Map,this.H=ro(),this.J=bo(),this.Y=new to(jr)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.M(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.M(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.M(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.M(t.resumeToken));break;default:Ur()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if(Ms(t))if(0===n){const n=new ms(t.path);this.tt(e,n,Cs.newNoDocument(n,Hr.min()))}else qr(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}at(t){const e=new Map;this.G.forEach(((n,r)=>{const s=this.ot(r);if(s){if(n.current&&Ms(s.target)){const e=new ms(s.target.path);null!==this.H.get(e)||this.ut(r,e)||this.tt(r,e,Cs.newNoDocument(e,t))}n.O&&(e.set(r,n.F()),n.L())}}));let n=uo();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new fo(t,e,this.Y,this.H,n);return this.H=ro(),this.J=bo(),this.Y=new to(jr),r}Z(t,e){if(!this.st(t))return;const n=this.ut(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.ut(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).F();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new wo,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new to(jr),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||Mr("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new wo),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}ut(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function bo(){return new Xi(ms.comparator)}function Eo(){return new Xi(ms.comparator)}
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
     */const Io={asc:"ASCENDING",desc:"DESCENDING"},To={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class _o{constructor(t,e){this.databaseId=t,this.I=e}}function So(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ao(t,e){return t.I?e.toBase64():e.toUint8Array()}function No(t,e){return So(t,e.toTimestamp())}function Do(t){return qr(!!t),Hr.fromTimestamp(function(t){const e=is(t);return new zr(e.seconds,e.nanos)}(t))}function xo(t,e){return function(t){return new Zr(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function Co(t){const e=Zr.fromString(t);return qr(ta(e)),e}function ko(t,e){return xo(t.databaseId,e.path)}function Ro(t,e){const n=Co(e);if(n.get(1)!==t.databaseId.projectId)throw new Rr(kr.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Rr(kr.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new ms(Po(n))}function Lo(t,e){return xo(t.databaseId,e)}function Oo(t){const e=Co(t);return 4===e.length?Zr.emptyPath():Po(e)}function Mo(t){return new Zr(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Po(t){return qr(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Fo(t,e,n){return{name:ko(t,e),fields:n.toProto().mapValue.fields}}function Vo(t,e,n){const r=Ro(t,e.name),s=Do(e.updateTime),i=new Ds({mapValue:{fields:e.fields}}),o=Cs.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function Uo(t,e){let n;if(e instanceof Ui)n={update:Fo(t,e.key,e.value)};else if(e instanceof ji)n={delete:ko(t,e.key)};else if(e instanceof qi)n={update:Fo(t,e.key,e.data),updateMask:Zo(e.fieldMask)};else{if(!(e instanceof Gi))return Ur();n={verify:ko(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof Ei)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ii)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof _i)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ai)return{fieldPath:e.field.canonicalString(),increment:n.A};throw Ur()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:No(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:Ur()}(t,e.precondition)),n}function qo(t,e){const n=e.currentDocument?function(t){return void 0!==t.updateTime?ki.updateTime(Do(t.updateTime)):void 0!==t.exists?ki.exists(t.exists):ki.none()}(e.currentDocument):ki.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)qr("REQUEST_TIME"===e.setToServerValue),n=new Ei;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Ii(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new _i(t)}else"increment"in e?n=new Ai(t,e.increment):Ur();const r=es.fromServerFormat(e.fieldPath);return new xi(r,n)}(t,e))):[];if(e.update){e.update.name;const s=Ro(t,e.update.name),i=new Ds({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new ns(e.map((t=>es.fromServerFormat(t))))}(e.updateMask);return new qi(s,i,t,n,r)}return new Ui(s,i,n,r)}if(e.delete){const r=Ro(t,e.delete);return new ji(r,n)}if(e.verify){const r=Ro(t,e.verify);return new Gi(r,n)}return Ur()}function Bo(t,e){return{documents:[Lo(t,e.path)]}}function $o(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Lo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Lo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(As(t.value))return{unaryFilter:{field:Wo(t.field),op:"IS_NAN"}};if(Ss(t.value))return{unaryFilter:{field:Wo(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(As(t.value))return{unaryFilter:{field:Wo(t.field),op:"IS_NOT_NAN"}};if(Ss(t.value))return{unaryFilter:{field:Wo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wo(t.field),op:Ho(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>function(t){return{field:Wo(t.field),direction:zo(t.dir)}}(t)))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(t,e){return t.I||ls(e)?e:{value:e}}(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=Go(e.startAt)),e.endAt&&(n.structuredQuery.endAt=Go(e.endAt)),n}function Ko(t){let e=Oo(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){qr(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=jo(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>function(t){return new zs(Yo(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,ls(e)?null:e}(n.limit));let c=null;n.startAt&&(c=Qo(n.startAt));let u=null;return n.endAt&&(u=Qo(n.endAt)),Js(e,s,o,i,a,"F",c,u)}function jo(t){return t?void 0!==t.unaryFilter?[Jo(t)]:void 0!==t.fieldFilter?[Xo(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>jo(t))).reduce(((t,e)=>t.concat(e))):Ur():[]}function Go(t){return{before:t.before,values:t.position}}function Qo(t){const e=!!t.before,n=t.values||[];return new Gs(n,e)}function zo(t){return Io[t]}function Ho(t){return To[t]}function Wo(t){return{fieldPath:t.canonicalString()}}function Yo(t){return es.fromServerFormat(t.fieldPath)}function Xo(t){return Ps.create(Yo(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Ur()}}(t.fieldFilter.op),t.fieldFilter.value)}function Jo(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Yo(t.unaryFilter.field);return Ps.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Yo(t.unaryFilter.field);return Ps.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Yo(t.unaryFilter.field);return Ps.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Yo(t.unaryFilter.field);return Ps.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Ur()}}function Zo(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function ta(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
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
     */function ea(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=ra(e)),e=na(t.get(n),e);return ra(e)}function na(t,e){let n=e;const r=t.length;for(let e=0;e<r;e++){const r=t.charAt(e);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function ra(t){return t+""}function sa(t){const e=t.length;if(qr(e>=2),2===e)return qr(""===t.charAt(0)&&""===t.charAt(1)),Zr.emptyPath();const n=e-2,r=[];let s="";for(let i=0;i<e;){const e=t.indexOf("",i);switch((e<0||e>n)&&Ur(),t.charAt(e+1)){case"":const n=t.substring(i,e);let o;0===s.length?o=n:(s+=n,o=s,s=""),r.push(o);break;case"":s+=t.substring(i,e),s+="\0";break;case"":s+=t.substring(i,e+1);break;default:Ur()}i=e+2}return new Zr(r)}
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
     */class ia{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class oa{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}oa.store="owner",oa.key="owner";class aa{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}aa.store="mutationQueues",aa.keyPath="userId";class ca{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}ca.store="mutations",ca.keyPath="batchId",ca.userMutationsIndex="userMutationsIndex",ca.userMutationsKeyPath=["userId","batchId"];class ua{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,ea(e)]}static key(t,e,n){return[t,ea(e),n]}}ua.store="documentMutations",ua.PLACEHOLDER=new ua;class ha{constructor(t,e){this.path=t,this.readTime=e}}class la{constructor(t,e){this.path=t,this.version=e}}class da{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}da.store="remoteDocuments",da.readTimeIndex="readTimeIndex",da.readTimeIndexPath="readTime",da.collectionReadTimeIndex="collectionReadTimeIndex",da.collectionReadTimeIndexPath=["parentPath","readTime"];class fa{constructor(t){this.byteSize=t}}fa.store="remoteDocumentGlobal",fa.key="remoteDocumentGlobalKey";class ma{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}ma.store="targets",ma.keyPath="targetId",ma.queryTargetsIndexName="queryTargetsIndex",ma.queryTargetsKeyPath=["canonicalId","targetId"];class ga{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}ga.store="targetDocuments",ga.keyPath=["targetId","path"],ga.documentTargetsIndex="documentTargetsIndex",ga.documentTargetsKeyPath=["path","targetId"];class pa{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}pa.key="targetGlobalKey",pa.store="targetGlobal";class ya{constructor(t,e){this.collectionId=t,this.parent=e}}ya.store="collectionParents",ya.keyPath=["collectionId","parent"];class wa{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}wa.store="clientMetadata",wa.keyPath="clientId";class va{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}va.store="bundles",va.keyPath="bundleId";class ba{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}ba.store="namedQueries",ba.keyPath="name";const Ea=[aa.store,ca.store,ua.store,da.store,ma.store,oa.store,pa.store,ga.store,wa.store,fa.store,ya.store,va.store,ba.store],Ia="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ta{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
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
     */class _a{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
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
     */class Sa{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&Ur(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Sa(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Sa?e:Sa.resolve(e)}catch(t){return Sa.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Sa.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Sa.reject(e)}static resolve(t){return new Sa(((e,n)=>{e(t)}))}static reject(t){return new Sa(((e,n)=>{n(t)}))}static waitFor(t){return new Sa(((e,n)=>{let r=0,s=0,i=!1;t.forEach((t=>{++r,t.next((()=>{++s,i&&s===r&&e()}),(t=>n(t)))})),i=!0,s===r&&e()}))}static or(t){let e=Sa.resolve(!1);for(const n of t)e=e.next((t=>t?Sa.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}}
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
     */class Aa{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new _a,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new xa(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=Oa(e.target.error);this.ft.reject(new xa(t,n))}}static open(t,e,n,r){try{return new Aa(e,t.transaction(r,n))}catch(t){throw new xa(e,t)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(Mr("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new ka(e)}}class Na{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Na._t(c())&&Pr("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return Mr("SimpleDb","Removing database:",t),Ra(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Na.yt())return!0;const t=c(),e=Na._t(t),n=0<e&&e<10,r=Na.Et(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(Mr("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new xa(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Rr(kr.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new xa(t,r))},r.onupgradeneeded=t=>{Mr("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{Mr("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.At(t);const e=Aa.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),Sa.reject(t)))).toPromise();return i.catch((()=>{})),await e.dt,i}catch(t){const e="FirebaseError"!==t.name&&i<3;if(Mr("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Da{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return Ra(this.vt.delete())}}class xa extends Rr{constructor(t,e){super(kr.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Ca(t){return"IndexedDbTransactionError"===t.name}class ka{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(Mr("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(Mr("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),Ra(n)}add(t){return Mr("SimpleDb","ADD",this.store.name,t,t),Ra(this.store.add(t))}get(t){return Ra(this.store.get(t)).next((e=>(void 0===e&&(e=null),Mr("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return Mr("SimpleDb","DELETE",this.store.name,t),Ra(this.store.delete(t))}count(){return Mr("SimpleDb","COUNT",this.store.name),Ra(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){Mr("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Mt(t){const e=this.cursor({});return new Sa(((n,r)=>{e.onerror=t=>{const e=Oa(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new Sa(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new Da(s),o=e(s.primaryKey,s.value,i);if(o instanceof Sa){const t=o.catch((t=>(i.done(),Sa.reject(t))));n.push(t)}i.isDone?r():null===i.Dt?s.continue():s.continue(i.Dt)}})).next((()=>Sa.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function Ra(t){return new Sa(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=Oa(t.target.error);n(e)}}))}let La=!1;function Oa(t){const e=Na._t(c());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Rr("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return La||(La=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
     */class Ma extends Ta{constructor(t,e){super(),this.Ft=t,this.currentSequenceNumber=e}}function Pa(t,e){const n=Br(t);return Na.It(n.Ft,e)}
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
     */class Fa{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const r=this.mutations[e];r.key.isEqual(t.key)&&Oi(r,t,n[e])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&Mi(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&Mi(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(Hr.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),uo())}isEqual(t){return this.batchId===t.batchId&&Gr(this.mutations,t.mutations,((t,e)=>Fi(t,e)))&&Gr(this.baseMutations,t.baseMutations,((t,e)=>Fi(t,e)))}}class Va{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){qr(t.mutations.length===n.length);let r=ao();const s=t.mutations;for(let t=0;t<s.length;t++)r=r.insert(s[t].key,n[t].version);return new Va(t,e,n,r)}}
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
     */class Ua{constructor(t,e,n,r,s=Hr.min(),i=Hr.min(),o=rs.EMPTY_BYTE_STRING){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o}withSequenceNumber(t){return new Ua(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(t,e){return new Ua(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t)}withLastLimboFreeSnapshotVersion(t){return new Ua(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken)}}
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
     */class qa{constructor(t){this.Lt=t}}function Ba(t,e){if(e.document)return Vo(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=ms.fromSegments(e.noDocument.path),n=Qa(e.noDocument.readTime),r=Cs.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=ms.fromSegments(e.unknownDocument.path),n=Qa(e.unknownDocument.version);return Cs.newUnknownDocument(t,n)}return Ur()}function $a(t,e,n){const r=Ka(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n=function(t,e){return{name:ko(t,e.key),fields:e.data.toProto().mapValue.fields,updateTime:So(t,e.version.toTimestamp())}}(t.Lt,e),i=e.hasCommittedMutations;return new da(null,null,n,i,r,s)}if(e.isNoDocument()){const t=e.key.path.toArray(),n=Ga(e.version),i=e.hasCommittedMutations;return new da(null,new ha(t,n),null,i,r,s)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=Ga(e.version);return new da(new la(t,n),null,null,!0,r,s)}return Ur()}function Ka(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function ja(t){const e=new zr(t[0],t[1]);return Hr.fromTimestamp(e)}function Ga(t){const e=t.toTimestamp();return new ia(e.seconds,e.nanoseconds)}function Qa(t){const e=new zr(t.seconds,t.nanoseconds);return Hr.fromTimestamp(e)}function za(t,e){const n=(e.baseMutations||[]).map((e=>qo(t.Lt,e)));for(let t=0;t<e.mutations.length-1;++t){const n=e.mutations[t];if(t+1<e.mutations.length&&void 0!==e.mutations[t+1].transform){const r=e.mutations[t+1];n.updateTransforms=r.transform.fieldTransforms,e.mutations.splice(t+1,1),++t}}const r=e.mutations.map((e=>qo(t.Lt,e))),s=zr.fromMillis(e.localWriteTimeMs);return new Fa(e.batchId,s,n,r)}function Ha(t){const e=Qa(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?Qa(t.lastLimboFreeSnapshotVersion):Hr.min();let r;var s;return void 0!==t.query.documents?(qr(1===(s=t.query).documents.length),r=oi(Zs(Oo(s.documents[0])))):r=function(t){return oi(Ko(t))}(t.query),new Ua(r,t.targetId,0,t.lastListenSequenceNumber,e,n,rs.fromBase64String(t.resumeToken))}function Wa(t,e){const n=Ga(e.snapshotVersion),r=Ga(e.lastLimboFreeSnapshotVersion);let s;s=Ms(e.target)?Bo(t.Lt,e.target):$o(t.Lt,e.target);const i=e.resumeToken.toBase64();return new ma(e.targetId,Ls(e.target),n,i,e.sequenceNumber,r,s)}function Ya(t){const e=Ko({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?ai(e,e.limit,"L"):e}
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
     */class Xa{getBundleMetadata(t,e){return Ja(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:Qa(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return Ja(t).put({bundleId:(n=e).id,createTime:Ga(Do(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return Za(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:Ya(e.bundledQuery),readTime:Qa(e.readTime)};var e}))}saveNamedQuery(t,e){return Za(t).put(function(t){return{name:t.name,readTime:Ga(Do(t.readTime)),bundledQuery:t.bundledQuery}}(e))}}function Ja(t){return Pa(t,va.store)}function Za(t){return Pa(t,ba.store)}
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
     */class tc{constructor(){this.Bt=new ec}addToCollectionParentIndex(t,e){return this.Bt.add(e),Sa.resolve()}getCollectionParents(t,e){return Sa.resolve(this.Bt.getEntries(e))}}class ec{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new to(Zr.comparator),s=!r.has(n);return this.index[e]=r.add(n),s}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new to(Zr.comparator)).toArray()}}
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
     */class nc{constructor(){this.Ut=new ec}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const s={collectionId:n,parent:ea(r)};return rc(t).put(s)}return Sa.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Qr(e),""],!1,!0);return rc(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(sa(r.parent))}return n}))}}function rc(t){return Pa(t,ya.store)}
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
     */const sc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class ic{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new ic(t,ic.DEFAULT_COLLECTION_PERCENTILE,ic.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
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
     */function oc(t,e,n){const r=t.store(ca.store),s=t.store(ua.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{qr(1===a)})));const u=[];for(const t of n.mutations){const r=ua.key(e,t.key.path,n.batchId);i.push(s.delete(r)),u.push(t.key)}return Sa.waitFor(i).next((()=>u))}function ac(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Ur();e=t.noDocument}return JSON.stringify(e).length}
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
     */ic.DEFAULT_COLLECTION_PERCENTILE=10,ic.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ic.DEFAULT=new ic(41943040,ic.DEFAULT_COLLECTION_PERCENTILE,ic.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ic.DISABLED=new ic(-1,0,0);class cc{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){qr(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new cc(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return hc(t).Ot({index:ca.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=lc(t),i=hc(t);return i.add({}).next((o=>{qr("number"==typeof o);const a=new Fa(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>Uo(t.Lt,e))),s=n.mutations.map((e=>Uo(t.Lt,e)));return new ca(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.R,this.userId,a),u=[];let h=new to(((t,e)=>jr(t.canonicalString(),e.canonicalString())));for(const t of r){const e=ua.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,ua.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),Sa.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return hc(t).get(e).next((t=>t?(qr(t.userId===this.userId),za(this.R,t)):null))}jt(t,e){return this.Kt[e]?Sa.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return hc(t).Ot({index:ca.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(qr(e.batchId>=n),s=za(this.R,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return hc(t).Ot({index:ca.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return hc(t).Nt(ca.userMutationsIndex,e).next((t=>t.map((t=>za(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=ua.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return lc(t).Ot({range:r},((n,r,i)=>{const[o,a,c]=n,u=sa(a);if(o===this.userId&&e.path.isEqual(u))return hc(t).get(c).next((t=>{if(!t)throw Ur();qr(t.userId===this.userId),s.push(za(this.R,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new to(jr);const r=[];return e.forEach((e=>{const s=ua.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=lc(t).Ot({range:i},((t,r,s)=>{const[i,o,a]=t,c=sa(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),Sa.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=ua.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new to(jr);return lc(t).Ot({range:i},((t,e,s)=>{const[i,a,c]=t,u=sa(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(hc(t).get(e).next((t=>{if(null===t)throw Ur();qr(t.userId===this.userId),n.push(za(this.R,t))})))})),Sa.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return oc(t.Ft,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),Sa.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return Sa.resolve();const n=IDBKeyRange.lowerBound(ua.prefixForUser(this.userId)),r=[];return lc(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=sa(t[1]);r.push(e)}else n.done()})).next((()=>{qr(0===r.length)}))}))}containsKey(t,e){return uc(t,this.userId,e)}zt(t){return dc(t).get(this.userId).next((t=>t||new aa(this.userId,-1,"")))}}function uc(t,e,n){const r=ua.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return lc(t).Ot({range:i,$t:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function hc(t){return Pa(t,ca.store)}function lc(t){return Pa(t,ua.store)}function dc(t){return Pa(t,aa.store)}
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
     */class fc{constructor(t){this.Ht=t}next(){return this.Ht+=2,this.Ht}static Jt(){return new fc(0)}static Yt(){return new fc(-1)}}
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
     */class mc{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new fc(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>Hr.fromTimestamp(new zr(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>gc(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(qr(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return gc(t).Ot(((i,o)=>{const a=Ha(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>Sa.waitFor(s))).next((()=>r))}forEachTarget(t,e){return gc(t).Ot(((t,n)=>{const r=Ha(n);e(r)}))}Xt(t){return pc(t).get(pa.key).next((t=>(qr(null!==t),t)))}Zt(t,e){return pc(t).put(pa.key,e)}te(t,e){return gc(t).put(Wa(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Ls(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return gc(t).Ot({range:r,index:ma.queryTargetsIndexName},((t,n,r)=>{const i=Ha(n);Os(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=yc(t);return e.forEach((e=>{const i=ea(e.path);r.push(s.put(new ga(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),Sa.waitFor(r)}removeMatchingKeys(t,e,n){const r=yc(t);return Sa.forEach(e,(e=>{const s=ea(e.path);return Sa.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=yc(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=yc(t);let s=uo();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=sa(t[1]),i=new ms(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=ea(e.path),r=IDBKeyRange.bound([n],[Qr(n)],!1,!0);let s=0;return yc(t).Ot({index:ga.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}lt(t,e){return gc(t).get(e).next((t=>t?Ha(t):null))}}function gc(t){return Pa(t,ma.store)}function pc(t){return Pa(t,pa.store)}function yc(t){return Pa(t,ga.store)}
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
     */async function wc(t){if(t.code!==kr.FAILED_PRECONDITION||t.message!==Ia)throw t;Mr("LocalStore","Unexpectedly lost primary lease")}
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
     */function vc([t,e],[n,r]){const s=jr(t,n);return 0===s?jr(e,r):s}class bc{constructor(t){this.ne=t,this.buffer=new to(vc),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();vc(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Ec{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ae(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ae(t){const e=this.oe?3e5:6e4;Mr("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(t){Ca(t)?Mr("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await wc(t)}await this.ae(t)}))}}class Ic{constructor(t,e){this.ue=t,this.params=e}calculateTargetCount(t,e){return this.ue.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return Sa.resolve(Cr.o);const n=new bc(e);return this.ue.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ue.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ue.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ue.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(Mr("LruGarbageCollector","Garbage collection skipped; disabled"),Sa.resolve(sc)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(Mr("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sc):this.fe(t,e)))}getCacheSize(t){return this.ue.getCacheSize(t)}fe(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(Mr("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Or()<=g.DEBUG&&Mr("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${t} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),Sa.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
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
     */class Tc{constructor(t,e){this.db=t,this.garbageCollector=function(t,e){return new Ic(t,e)}(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return _c(t,n)}removeReference(t,e,n){return _c(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return _c(t,e)}_e(t,e){return function(t,e){let n=!1;return dc(t).Mt((r=>uc(t,r,e).next((t=>(t&&(n=!0),Sa.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.we(t,((i,o)=>{if(o<=e){const e=this._e(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),yc(t).delete([0,ea(i.path)]))))}));r.push(e)}})).next((()=>Sa.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return _c(t,e)}we(t,e){const n=yc(t);let r,s=Cr.o;return n.Ot({index:ga.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Cr.o&&e(new ms(sa(r)),s),s=o,r=i):s=Cr.o})).next((()=>{s!==Cr.o&&e(new ms(sa(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function _c(t,e){return yc(t).put(function(t,e){return new ga(0,ea(t.path),e)}(e,t.currentSequenceNumber))}
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
     */class Sc{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={}}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,r]of n)if(this.equalsFn(e,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e])}else this.inner[n]=[[t,e]]}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),!0;return!1}forEach(t){Yr(this.inner,((e,n)=>{for(const[e,r]of n)t(e,r)}))}isEmpty(){return Xr(this.inner)}}
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
     */class Ac{constructor(){this.changes=new Sc((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}getReadTime(t){const e=this.changes.get(t);return e?e.readTime:Hr.min()}addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e})}removeEntry(t,e=null){this.assertNotApplied(),this.changes.set(t,{document:Cs.newInvalidDocument(t),readTime:e})}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Sa.resolve(n.document):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
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
     */class Nc{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Cc(t).put(kc(e),n)}removeEntry(t,e){const n=Cc(t),r=kc(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Cc(t).get(kc(e)).next((t=>this.ge(e,t)))}ye(t,e){return Cc(t).get(kc(e)).next((t=>({document:this.ge(e,t),size:ac(t)})))}getEntries(t,e){let n=ro();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=ro(),r=new Xi(ms.comparator);return this.pe(t,e,((t,e)=>{const s=this.ge(t,e);n=n.insert(t,s),r=r.insert(t,ac(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return Sa.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return Cc(t).Ot({range:r},((t,e,r)=>{const o=ms.fromSegments(t);for(;i&&ms.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.Ct(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=ro();const s=e.path.length+1,i={};if(n.isEqual(Hr.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Ka(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=da.collectionReadTimeIndex}return Cc(t).Ot(i,((t,n,i)=>{if(t.length!==s)return;const o=Ba(this.R,n);e.path.isPrefixOf(o.key.path)?li(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new Dc(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return xc(t).get(fa.key).next((t=>(qr(!!t),t)))}me(t,e){return xc(t).put(fa.key,e)}ge(t,e){if(e){const t=Ba(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(Hr.min()))return t}return Cs.newInvalidDocument(t)}}class Dc extends Ac{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Sc((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new to(((t,e)=>jr(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Ae.get(s);if(i.document.isValidDocument()){const a=$a(this.Ie.R,i.document,this.getReadTime(s));r=r.add(s.path.popLast());const c=ac(a);n+=c-o,e.push(this.Ie.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=$a(this.Ie.R,Cs.newNoDocument(s,Hr.min()),this.getReadTime(s));e.push(this.Ie.addEntry(t,s,n))}else e.push(this.Ie.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),Sa.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function xc(t){return Pa(t,fa.store)}function Cc(t){return Pa(t,da.store)}function kc(t){return t.path.toArray()}
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
     */class Rc{constructor(t){this.R=t}Rt(t,e,n,r){qr(n<r&&n>=0&&r<=11);const s=new Aa("createOrUpgrade",e);n<1&&r>=1&&(function(t){t.createObjectStore(oa.store)}(t),function(t){t.createObjectStore(aa.store,{keyPath:aa.keyPath}),t.createObjectStore(ca.store,{keyPath:ca.keyPath,autoIncrement:!0}).createIndex(ca.userMutationsIndex,ca.userMutationsKeyPath,{unique:!0}),t.createObjectStore(ua.store)}(t),Lc(t),function(t){t.createObjectStore(da.store)}(t));let i=Sa.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(ga.store),t.deleteObjectStore(ma.store),t.deleteObjectStore(pa.store)}(t),Lc(t)),i=i.next((()=>function(t){const e=t.store(pa.store),n=new pa(0,0,Hr.min().toTimestamp(),0);return e.put(pa.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(ca.store).Nt().next((n=>{t.deleteObjectStore(ca.store),t.createObjectStore(ca.store,{keyPath:ca.keyPath,autoIncrement:!0}).createIndex(ca.userMutationsIndex,ca.userMutationsKeyPath,{unique:!0});const r=e.store(ca.store),s=n.map((t=>r.put(t)));return Sa.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(wa.store,{keyPath:wa.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.Re(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(fa.store)}(t),this.Pe(s))))),n<7&&r>=7&&(i=i.next((()=>this.be(s)))),n<8&&r>=8&&(i=i.next((()=>this.ve(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(da.store);e.createIndex(da.readTimeIndex,da.readTimeIndexPath,{unique:!1}),e.createIndex(da.collectionReadTimeIndex,da.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.Ve(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(va.store,{keyPath:va.keyPath})}(t),function(t){t.createObjectStore(ba.store,{keyPath:ba.keyPath})}
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
     */(t)}))),i}Pe(t){let e=0;return t.store(da.store).Ot(((t,n)=>{e+=ac(n)})).next((()=>{const n=new fa(e);return t.store(fa.store).put(fa.key,n)}))}Re(t){const e=t.store(aa.store),n=t.store(ca.store);return e.Nt().next((e=>Sa.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(ca.userMutationsIndex,r).next((n=>Sa.forEach(n,(n=>{qr(n.userId===e.userId);const r=za(this.R,n);return oc(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(ga.store),n=t.store(da.store);return t.store(pa.store).get(pa.key).next((t=>{const r=[];return n.Ot(((n,s)=>{const i=new Zr(n),o=function(t){return[0,ea(t)]}(i);r.push(e.get(o).next((n=>n?Sa.resolve():(n=>e.put(new ga(0,ea(n),t.highestListenSequenceNumber)))(i))))})).next((()=>Sa.waitFor(r)))}))}ve(t,e){t.createObjectStore(ya.store,{keyPath:ya.keyPath});const n=e.store(ya.store),r=new ec,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:ea(r)})}};return e.store(da.store).Ot({$t:!0},((t,e)=>{const n=new Zr(t);return s(n.popLast())})).next((()=>e.store(ua.store).Ot({$t:!0},(([t,e,n],r)=>{const i=sa(e);return s(i.popLast())}))))}Ve(t){const e=t.store(ma.store);return e.Ot(((t,n)=>{const r=Ha(n),s=Wa(this.R,r);return e.put(s)}))}}function Lc(t){t.createObjectStore(ga.store,{keyPath:ga.keyPath}).createIndex(ga.documentTargetsIndex,ga.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(ma.store,{keyPath:ma.keyPath}).createIndex(ma.queryTargetsIndexName,ma.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(pa.store)}const Oc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Mc{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=s,this.window=i,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Me=Number.NEGATIVE_INFINITY,this.Fe=t=>Promise.resolve(),!Mc.gt())throw new Rr(kr.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Tc(this,r),this.Le=e+"main",this.R=new qa(a),this.Be=new Na(this.Le,11,new Rc(this.R)),this.Ue=new mc(this.referenceDelegate,this.R),this.qt=new nc,this.qe=function(t,e){return new Nc(t,e)}(this.R,this.qt),this.Ke=new Xa,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&Pr("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Rr(kr.FAILED_PRECONDITION,Oc);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Cr(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Fe=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Fc(t).put(new wa(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Fe(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Ca(t))return Mr("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return Mr("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Fe(t))),this.isPrimary=t}))}Je(t){return Pc(t).get(oa.key).next((t=>Sa.resolve(this.tn(t))))}en(t){return Fc(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Me,18e5)){this.Me=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Pa(t,wa.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return Sa.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?Sa.resolve(!0):Pc(t).get(oa.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new Rr(kr.FAILED_PRECONDITION,Oc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Fc(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&Mr("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.an(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.un(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[oa.store,wa.store],(t=>{const e=new Ma(t,Cr.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Fc(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return cc.Qt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){Mr("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.Be.runTransaction(t,r,Ea,(r=>(s=new Ma(r,this.Ne?this.Ne.next():Cr.o),"readwrite-primary"===e?this.Je(s).next((t=>!!t||this.Ye(s))).next((e=>{if(!e)throw Pr(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Fe(!1))),new Rr(kr.FAILED_PRECONDITION,Ia);return n(s)})).next((t=>this.Ze(s).next((()=>t)))):this.dn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}dn(t){return Pc(t).get(oa.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Rr(kr.FAILED_PRECONDITION,Oc)}))}Ze(t){const e=new oa(this.clientId,this.allowTabSynchronization,Date.now());return Pc(t).put(oa.key,e)}static gt(){return Na.gt()}Xe(t){const e=Pc(t);return e.get(oa.key).next((t=>this.tn(t)?(Mr("IndexedDbPersistence","Releasing primary lease."),e.delete(oa.key)):Sa.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&(Pr(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}un(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.an(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return Mr("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(t){return Pr("IndexedDbPersistence","Failed to get zombied client id.",t),!1}}an(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){Pr("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Pc(t){return Pa(t,oa.store)}function Fc(t){return Pa(t,wa.store)}function Vc(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"
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
     */}class Uc{constructor(t,e){this.progress=t,this.wn=e}}
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
     */class qc{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const t of e)t.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return function(t){return ms.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.Tn(t,e.path):si(e)?this.In(t,e,n):this.An(t,e,n)}Tn(t,e){return this.mn(t,new ms(e)).next((t=>{let e=io();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let s=io();return this.qt.getCollectionParents(t,r).next((i=>Sa.forEach(i,(i=>{const o=function(t,e){return new Xs(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,i.child(r));return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}An(t,e,n){let r,s;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Rn(t,s,r).next((t=>{r=t;for(const t of s)for(const e of t.mutations){const n=e.key;let s=r.get(n);null==s&&(s=Cs.newInvalidDocument(n),r=r.insert(n,s)),Mi(e,s,t.localWriteTime),s.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{li(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=uo();for(const t of e)for(const e of t.mutations)e instanceof qi&&null===n.get(e.key)&&(r=r.add(e.key));let s=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(s=s.insert(t,e))})),s)))}}
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
     */class Bc{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Pn=n,this.bn=r}static vn(t,e){let n=uo(),r=uo();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:r=r.add(t.doc.key)}return new Bc(t,e.fromCache,n,r)}}
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
     */class $c{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||n.isEqual(Hr.min())?this.Dn(t,e):this.Sn.pn(t,r).next((s=>{const i=this.Cn(e,s);return(ti(e)||ei(e))&&this.Nn(e.limitType,i,r,n)?this.Dn(t,e):(Or()<=g.DEBUG&&Mr("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),hi(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}))}Cn(t,e){let n=new to(di(t));return e.forEach(((e,r)=>{li(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Dn(t,e){return Or()<=g.DEBUG&&Mr("QueryEngine","Using full collection scan to execute query:",hi(e)),this.Sn.getDocumentsMatchingQuery(t,e,Hr.min())}}
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
     */class Kc{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new Xi(jr),this.$n=new Sc((t=>Ls(t)),Os),this.On=Hr.min(),this._n=t.getMutationQueue(n),this.Mn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Fn=new qc(this.Mn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Fn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function jc(t,e,n,r){return new Kc(t,e,n,r)}async function Gc(t,e){const n=Br(t);let r=n._n,s=n.Fn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n._n.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new qc(n.Mn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=uo();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Fn=s,n.xn.Vn(n.Fn),i}function Qc(t){const e=Br(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function zc(t,e,n,r,s){let i=uo();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=ro();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o.isNoDocument()&&o.version.isEqual(Hr.min())?(e.removeEntry(n,c),i=i.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):Mr("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}function Hc(t,e){const n=Br(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}function Wc(t,e){const n=Br(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((s=>s?(r=s,Sa.resolve(r)):n.Ue.allocateTargetId(t).next((s=>(r=new Ua(e,s,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}async function Yc(t,e,n){const r=Br(t),s=r.kn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(t){if(!Ca(t))throw t;Mr("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}r.kn=r.kn.remove(e),r.$n.delete(s.target)}function Xc(t,e,n){const r=Br(t);let s=Hr.min(),i=uo();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=Br(t),s=r.$n.get(n);return void 0!==s?Sa.resolve(r.kn.get(s)):r.Ue.getTargetData(e,n)}(r,t,oi(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?s:Hr.min(),n?i:uo()))).next((t=>({documents:t,Bn:i})))))}function Jc(t,e){const n=Br(t),r=Br(n.Ue),s=n.kn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",(t=>r.lt(t,e).next((t=>t?t.target:null))))}function Zc(t){const e=Br(t);return e.persistence.runTransaction("Get new document changes","readonly",(t=>function(t,e,n){const r=Br(t);let s=ro(),i=Ka(n);const o=Cc(e),a=IDBKeyRange.lowerBound(i,!0);return o.Ot({index:da.readTimeIndex,range:a},((t,e)=>{const n=Ba(r.R,e);s=s.insert(n.key,n),i=e.readTime})).next((()=>({wn:s,readTime:ja(i)})))}(e.Mn,t,e.On))).then((({wn:t,readTime:n})=>(e.On=n,t)))}async function tu(t,e,n=uo()){const r=await Wc(t,oi(Ya(e.bundledQuery))),s=Br(t);return s.persistence.runTransaction("Save named query","readwrite",(t=>{const i=Do(e.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Ke.saveNamedQuery(t,e);const o=r.withResumeToken(rs.EMPTY_BYTE_STRING,i);return s.kn=s.kn.insert(o.targetId,o),s.Ue.updateTargetData(t,o).next((()=>s.Ue.removeMatchingKeysForTargetId(t,r.targetId))).next((()=>s.Ue.addMatchingKeys(t,n,r.targetId))).next((()=>s.Ke.saveNamedQuery(t,e)))}))}
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
     */class eu{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return Sa.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:Do(n.createTime)}),Sa.resolve()}getNamedQuery(t,e){return Sa.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,function(t){return{name:t.name,query:Ya(t.bundledQuery),readTime:Do(t.readTime)}}(e)),Sa.resolve()}}
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
     */class nu{constructor(){this.Wn=new to(ru.Gn),this.zn=new to(ru.Hn)}isEmpty(){return this.Wn.isEmpty()}addReference(t,e){const n=new ru(t,e);this.Wn=this.Wn.add(n),this.zn=this.zn.add(n)}Jn(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.Yn(new ru(t,e))}Xn(t,e){t.forEach((t=>this.removeReference(t,e)))}Zn(t){const e=new ms(new Zr([])),n=new ru(e,t),r=new ru(e,t+1),s=[];return this.zn.forEachInRange([n,r],(t=>{this.Yn(t),s.push(t.key)})),s}ts(){this.Wn.forEach((t=>this.Yn(t)))}Yn(t){this.Wn=this.Wn.delete(t),this.zn=this.zn.delete(t)}es(t){const e=new ms(new Zr([])),n=new ru(e,t),r=new ru(e,t+1);let s=uo();return this.zn.forEachInRange([n,r],(t=>{s=s.add(t.key)})),s}containsKey(t){const e=new ru(t,0),n=this.Wn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class ru{constructor(t,e){this.key=t,this.ns=e}static Gn(t,e){return ms.comparator(t.key,e.key)||jr(t.ns,e.ns)}static Hn(t,e){return jr(t.ns,e.ns)||ms.comparator(t.key,e.key)}}
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
     */class su{constructor(t,e){this.qt=t,this.referenceDelegate=e,this._n=[],this.ss=1,this.rs=new to(ru.Gn)}checkEmpty(t){return Sa.resolve(0===this._n.length)}addMutationBatch(t,e,n,r){const s=this.ss;this.ss++,this._n.length>0&&this._n[this._n.length-1];const i=new Fa(s,e,n,r);this._n.push(i);for(const e of r)this.rs=this.rs.add(new ru(e.key,s)),this.qt.addToCollectionParentIndex(t,e.key.path.popLast());return Sa.resolve(i)}lookupMutationBatch(t,e){return Sa.resolve(this.os(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.cs(n),s=r<0?0:r;return Sa.resolve(this._n.length>s?this._n[s]:null)}getHighestUnacknowledgedBatchId(){return Sa.resolve(0===this._n.length?-1:this.ss-1)}getAllMutationBatches(t){return Sa.resolve(this._n.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new ru(e,0),r=new ru(e,Number.POSITIVE_INFINITY),s=[];return this.rs.forEachInRange([n,r],(t=>{const e=this.os(t.ns);s.push(e)})),Sa.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new to(jr);return e.forEach((t=>{const e=new ru(t,0),r=new ru(t,Number.POSITIVE_INFINITY);this.rs.forEachInRange([e,r],(t=>{n=n.add(t.ns)}))})),Sa.resolve(this.us(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let s=n;ms.isDocumentKey(s)||(s=s.child(""));const i=new ru(new ms(s),0);let o=new to(jr);return this.rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(o=o.add(t.ns)),!0)}),i),Sa.resolve(this.us(o))}us(t){const e=[];return t.forEach((t=>{const n=this.os(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){qr(0===this.hs(e.batchId,"removed")),this._n.shift();let n=this.rs;return Sa.forEach(e.mutations,(r=>{const s=new ru(r.key,e.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.rs=n}))}Gt(t){}containsKey(t,e){const n=new ru(e,0),r=this.rs.firstAfterOrEqual(n);return Sa.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this._n.length,Sa.resolve()}hs(t,e){return this.cs(t)}cs(t){return 0===this._n.length?0:t-this._n[0].batchId}os(t){const e=this.cs(t);return e<0||e>=this._n.length?null:this._n[e]}}
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
     */class iu{constructor(t,e){this.qt=t,this.ls=e,this.docs=new Xi(ms.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-i,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Sa.resolve(n?n.document.clone():Cs.newInvalidDocument(e))}getEntries(t,e){let n=ro();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():Cs.newInvalidDocument(t))})),Sa.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=ro();const s=new ms(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{document:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||li(e,s)&&(r=r.insert(s.key,s.clone()))}return Sa.resolve(r)}fs(t,e){return Sa.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new ou(this)}getSize(t){return Sa.resolve(this.size)}}class ou extends Ac{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),Sa.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
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
     */class au{constructor(t){this.persistence=t,this.ds=new Sc((t=>Ls(t)),Os),this.lastRemoteSnapshotVersion=Hr.min(),this.highestTargetId=0,this.ws=0,this._s=new nu,this.targetCount=0,this.gs=fc.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),Sa.resolve()}getLastRemoteSnapshotVersion(t){return Sa.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Sa.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),Sa.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),Sa.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new fc(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,Sa.resolve()}updateTargetData(t,e){return this.te(e),Sa.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,Sa.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ds.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),Sa.waitFor(s).next((()=>r))}getTargetCount(t){return Sa.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return Sa.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),Sa.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),Sa.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),Sa.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return Sa.resolve(n)}containsKey(t,e){return Sa.resolve(this._s.containsKey(e))}}
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
     */class cu{constructor(t,e){this.ys={},this.Ne=new Cr(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new au(this),this.qt=new tc,this.qe=function(t,e){return new iu(t,e)}(this.qt,(t=>this.referenceDelegate.ps(t))),this.R=new qa(e),this.Ke=new eu(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new su(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){Mr("MemoryPersistence","Starting transaction:",t);const r=new uu(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return Sa.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class uu extends Ta{constructor(t){super(),this.currentSequenceNumber=t}}class hu{constructor(t){this.persistence=t,this.As=new nu,this.Rs=null}static Ps(t){return new hu(t)}get bs(){if(this.Rs)return this.Rs;throw Ur()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),Sa.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),Sa.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),Sa.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Sa.forEach(this.bs,(n=>{const r=ms.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return Sa.or([()=>Sa.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
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
     */class lu{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}function du(t,e){return`firestore_clients_${t}_${e}`}function fu(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function mu(t,e){return`firestore_targets_${t}_${e}`}lu.UNAUTHENTICATED=new lu(null),lu.GOOGLE_CREDENTIALS=new lu("google-credentials-uid"),lu.FIRST_PARTY=new lu("first-party-uid");class gu{constructor(t,e,n,r){this.user=t,this.batchId=e,this.state=n,this.error=r}static Vs(t,e,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new Rr(r.error.code,r.error.message))),i?new gu(t,e,r.state,s):(Pr("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class pu{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Vs(t,e){const n=JSON.parse(e);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new Rr(n.error.code,n.error.message))),s?new pu(t,n.state,r):(Pr("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class yu{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Vs(t,e){const n=JSON.parse(e);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=lo();for(let t=0;r&&t<n.activeTargetIds.length;++t)r=fs(n.activeTargetIds[t]),s=s.add(n.activeTargetIds[t]);return r?new yu(t,s):(Pr("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class wu{constructor(t,e){this.clientId=t,this.onlineState=e}static Vs(t){const e=JSON.parse(t);return"object"==typeof e&&-1!==["Unknown","Online","Offline"].indexOf(e.onlineState)&&"string"==typeof e.clientId?new wu(e.clientId,e.onlineState):(Pr("SharedClientState",`Failed to parse online state: ${t}`),null)}}class vu{constructor(){this.activeTargetIds=lo()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class bu{constructor(t,e,n,r,s){this.window=t,this.Se=e,this.persistenceKey=n,this.Ns=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.xs=this.ks.bind(this),this.$s=new Xi(jr),this.started=!1,this.Os=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ms=du(this.persistenceKey,this.Ns),this.Fs=function(t){return`firestore_sequence_number_${t}`}
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
     */(this.persistenceKey),this.$s=this.$s.insert(this.Ns,new vu),this.Ls=new RegExp(`^firestore_clients_${i}_([^_]*)$`),this.Bs=new RegExp(`^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`),this.Us=new RegExp(`^firestore_targets_${i}_(\\d+)$`),this.qs=function(t){return`firestore_online_state_${t}`}(this.persistenceKey),this.Ks=function(t){return`firestore_bundle_loaded_${t}`}(this.persistenceKey),this.window.addEventListener("storage",this.xs)}static gt(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.fn();for(const e of t){if(e===this.Ns)continue;const t=this.getItem(du(this.persistenceKey,e));if(t){const n=yu.Vs(e,t);n&&(this.$s=this.$s.insert(n.clientId,n))}}this.Qs();const e=this.storage.getItem(this.qs);if(e){const t=this.js(e);t&&this.Ws(t)}for(const t of this.Os)this.ks(t);this.Os=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Fs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.Gs(this.$s)}isActiveQueryTarget(t){let e=!1;return this.$s.forEach(((n,r)=>{r.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.zs(t,"pending")}updateMutationState(t,e,n){this.zs(t,e,n),this.Hs(t)}addLocalQueryTarget(t){let e="not-current";if(this.isActiveQueryTarget(t)){const n=this.storage.getItem(mu(this.persistenceKey,t));if(n){const r=pu.Vs(t,n);r&&(e=r.state)}}return this.Js.Ds(t),this.Qs(),e}removeLocalQueryTarget(t){this.Js.Cs(t),this.Qs()}isLocalQueryTarget(t){return this.Js.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(mu(this.persistenceKey,t))}updateQueryState(t,e,n){this.Ys(t,e,n)}handleUserChange(t,e,n){e.forEach((t=>{this.Hs(t)})),this.currentUser=t,n.forEach((t=>{this.addPendingMutation(t)}))}setOnlineState(t){this.Xs(t)}notifyBundleLoaded(){this.Zs()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.xs),this.removeItem(this.Ms),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return Mr("SharedClientState","READ",t,e),e}setItem(t,e){Mr("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){Mr("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ks(t){const e=t;if(e.storageArea===this.storage){if(Mr("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Ms)return void Pr("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Se.enqueueRetryable((async()=>{if(this.started){if(null!==e.key)if(this.Ls.test(e.key)){if(null==e.newValue){const t=this.ti(e.key);return this.ei(t,null)}{const t=this.ni(e.key,e.newValue);if(t)return this.ei(t.clientId,t)}}else if(this.Bs.test(e.key)){if(null!==e.newValue){const t=this.si(e.key,e.newValue);if(t)return this.ii(t)}}else if(this.Us.test(e.key)){if(null!==e.newValue){const t=this.ri(e.key,e.newValue);if(t)return this.oi(t)}}else if(e.key===this.qs){if(null!==e.newValue){const t=this.js(e.newValue);if(t)return this.Ws(t)}}else if(e.key===this.Fs){const t=function(t){let e=Cr.o;if(null!=t)try{const n=JSON.parse(t);qr("number"==typeof n),e=n}catch(t){Pr("SharedClientState","Failed to read sequence number from WebStorage",t)}return e}(e.newValue);t!==Cr.o&&this.sequenceNumberHandler(t)}else if(e.key===this.Ks)return this.syncEngine.ci()}else this.Os.push(e)}))}}get Js(){return this.$s.get(this.Ns)}Qs(){this.setItem(this.Ms,this.Js.Ss())}zs(t,e,n){const r=new gu(this.currentUser,t,e,n),s=fu(this.persistenceKey,this.currentUser,t);this.setItem(s,r.Ss())}Hs(t){const e=fu(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Xs(t){const e={clientId:this.Ns,onlineState:t};this.storage.setItem(this.qs,JSON.stringify(e))}Ys(t,e,n){const r=mu(this.persistenceKey,t),s=new pu(t,e,n);this.setItem(r,s.Ss())}Zs(){this.setItem(this.Ks,"value-not-used")}ti(t){const e=this.Ls.exec(t);return e?e[1]:null}ni(t,e){const n=this.ti(t);return yu.Vs(n,e)}si(t,e){const n=this.Bs.exec(t),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return gu.Vs(new lu(s),r,e)}ri(t,e){const n=this.Us.exec(t),r=Number(n[1]);return pu.Vs(r,e)}js(t){return wu.Vs(t)}async ii(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.ai(t.batchId,t.state,t.error);Mr("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}oi(t){return this.syncEngine.ui(t.targetId,t.state,t.error)}ei(t,e){const n=e?this.$s.insert(t,e):this.$s.remove(t),r=this.Gs(this.$s),s=this.Gs(n),i=[],o=[];return s.forEach((t=>{r.has(t)||i.push(t)})),r.forEach((t=>{s.has(t)||o.push(t)})),this.syncEngine.hi(i,o).then((()=>{this.$s=n}))}Ws(t){this.$s.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}Gs(t){let e=lo();return t.forEach(((t,n)=>{e=e.unionWith(n.activeTargetIds)})),e}}class Eu{constructor(){this.li=new vu,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new vu,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
     */class Iu{di(t){}shutdown(){}}
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
     */class Tu{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){Mr("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){Mr("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
     */const _u={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
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
     */class Su{constructor(t){this.Ei=t.Ei,this.Ti=t.Ti}Ii(t){this.Ai=t}Ri(t){this.Pi=t}onMessage(t){this.bi=t}close(){this.Ti()}send(t){this.Ei(t)}vi(){this.Ai()}Vi(t){this.Pi(t)}Si(t){this.bi(t)}}
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
     */class Au extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const s=this.xi(t,e);Mr("RestConnection","Sending: ",s,n);const i={};return this.ki(i,r),this.$i(t,s,i,n).then((t=>(Mr("RestConnection","Received: ",t),t)),(e=>{throw Fr("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+xr,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=_u[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling}$i(t,e,n,r){return new Promise(((s,i)=>{const o=new Dr;o.listenOnce(Tr.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Ir.NO_ERROR:const e=o.getResponseJson();Mr("Connection","XHR received:",JSON.stringify(e)),s(e);break;case Ir.TIMEOUT:Mr("Connection",'RPC "'+t+'" timed out'),i(new Rr(kr.DEADLINE_EXCEEDED,"Request time out"));break;case Ir.HTTP_ERROR:const n=o.getStatus();if(Mr("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(kr).indexOf(e)>=0?e:kr.UNKNOWN}(t.status);i(new Rr(e,t.message))}else i(new Rr(kr.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Rr(kr.UNAVAILABLE,"Connection failed."));break;default:Ur()}}finally{Mr("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Mi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new yr,s=we(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};var o;this.ki(i.initMessageHeaders,e),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(c())||"object"==typeof navigator&&"ReactNative"===navigator.product||c().indexOf("Electron/")>=0||function(){var t=c();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||c().indexOf("MSAppHost/")>=0||"object"==typeof(o="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==o.id||(i.httpHeadersOverwriteParam="$httpHeaders");const a=n.join("");Mr("Connection","Creating WebChannel: "+a,i);const u=r.createWebChannel(a,i);let h=!1,l=!1;const d=new Su({Ei:t=>{l?Mr("Connection","Not sending because WebChannel is closed:",t):(h||(Mr("Connection","Opening WebChannel transport."),u.open(),h=!0),Mr("Connection","WebChannel sending:",t),u.send(t))},Ti:()=>u.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(u,Nr.EventType.OPEN,(()=>{l||Mr("Connection","WebChannel transport opened.")})),f(u,Nr.EventType.CLOSE,(()=>{l||(l=!0,Mr("Connection","WebChannel transport closed"),d.Vi())})),f(u,Nr.EventType.ERROR,(t=>{l||(l=!0,Fr("Connection","WebChannel transport errored:",t),d.Vi(new Rr(kr.UNAVAILABLE,"The operation could not be completed")))})),f(u,Nr.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];qr(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){Mr("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=zi[t];if(void 0!==e)return Yi(e)}(t),n=s.message;void 0===e&&(e=kr.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),l=!0,d.Vi(new Rr(e,n)),u.close()}else Mr("Connection","WebChannel received:",n),d.Si(n)}})),f(s,_r.STAT_EVENT,(t=>{t.stat===Sr?Mr("Connection","Detected buffering proxy"):t.stat===Ar&&Mr("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.vi()}),0),d}}
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
     */function Nu(){return"undefined"!=typeof window?window:null}function Du(){return"undefined"!=typeof document?document:null}
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
     */function xu(t){return new _o(t,!0)}class Cu{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Se=t,this.timerId=e,this.Fi=n,this.Li=r,this.Bi=s,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}Qi(){this.Ui=this.Bi}ji(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&Mr("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Fi&&(this.Ui=this.Fi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
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
     */class ku{constructor(t,e,n,r,s,i){this.Se=t,this.zi=n,this.Hi=r,this.Ji=s,this.listener=i,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new Cu(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ar(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ar(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ar(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===kr.RESOURCE_EXHAUSTED?(Pr(e.toString()),Pr("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===kr.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ur(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ur(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new Rr(kr.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return Mr("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(Mr("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ru extends ku{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.R=r}wr(t){return this.Hi.Mi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(t){return"NO_CHANGE"===t?0:"ADD"===t?1:"REMOVE"===t?2:"CURRENT"===t?3:"RESET"===t?4:Ur()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(t,e){return t.I?(qr(void 0===e||"string"==typeof e),rs.fromBase64String(e||"")):(qr(void 0===e||e instanceof Uint8Array),rs.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(t){const e=void 0===t.code?kr.UNKNOWN:Yi(t.code);return new Rr(e,t.message||"")}(o);n=new yo(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ro(t,r.document.name),i=Do(r.document.updateTime),o=new Ds({mapValue:{fields:r.document.fields}}),a=Cs.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new go(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ro(t,r.document),i=r.readTime?Do(r.readTime):Hr.min(),o=Cs.newNoDocument(s,i),a=r.removedTargetIds||[];n=new go([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ro(t,r.document),i=r.removedTargetIds||[];n=new go([],i,s,null)}else{if(!("filter"in e))return Ur();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new Qi(r),i=t.targetId;n=new po(i,s)}}return n}(this.R,t),n=function(t){if(!("targetChange"in t))return Hr.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?Hr.min():e.readTime?Do(e.readTime):Hr.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=Mo(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=Ms(r)?{documents:Bo(t,r)}:{query:$o(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Ao(t,e.resumeToken):e.snapshotVersion.compareTo(Hr.min())>0&&(n.readTime=So(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Ur()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=Mo(this.R),e.removeTarget=t,this.cr(e)}}class Lu extends ku{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ur(){this.yr&&this.Er([])}wr(t){return this.Hi.Mi("Write",t)}onMessage(t){if(qr(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(qr(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?Do(t.updateTime):Do(e);return n.isEqual(Hr.min())&&(n=Do(e)),new Ci(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=Do(t.commitTime);return this.listener.Tr(n,e)}return qr(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=Mo(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>Uo(this.R,t)))};this.cr(e)}}
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
     */class Ou extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new Rr(kr.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===kr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Rr(kr.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===kr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Rr(kr.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class Mu{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?(Pr(e),this.Vr=!1):Mr("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
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
     */class Pu{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Mr=new Set,this.Fr=[],this.Lr=s,this.Lr.di((t=>{n.enqueueAndForget((async()=>{Gu(this)&&(Mr("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Br(t);e.Mr.add(4),await Vu(e),e.Br.set("Unknown"),e.Mr.delete(4),await Fu(e)}(this))}))})),this.Br=new Mu(n,r)}}async function Fu(t){if(Gu(t))for(const e of t.Fr)await e(!0)}async function Vu(t){for(const e of t.Fr)await e(!1)}function Uu(t,e){const n=Br(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),ju(n)?Ku(n):ch(n).er()&&Bu(n,e))}function qu(t,e){const n=Br(t),r=ch(n);n.Or.delete(e),r.er()&&$u(n,e),0===n.Or.size&&(r.er()?r.ir():Gu(n)&&n.Br.set("Unknown"))}function Bu(t,e){t.Ur.q(e.targetId),ch(t).mr(e)}function $u(t,e){t.Ur.q(e),ch(t).gr(e)}function Ku(t){t.Ur=new vo({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),ch(t).start(),t.Br.Sr()}function ju(t){return Gu(t)&&!ch(t).tr()&&t.Or.size>0}function Gu(t){return 0===Br(t).Mr.size}function Qu(t){t.Ur=void 0}async function zu(t){t.Or.forEach(((e,n)=>{Bu(t,e)}))}async function Hu(t,e){Qu(t),ju(t)?(t.Br.Nr(e),Ku(t)):t.Br.set("Unknown")}async function Wu(t,e,n){if(t.Br.set("Online"),e instanceof yo&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(n){Mr("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Yu(t,n)}else if(e instanceof go?t.Ur.X(e):e instanceof po?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(Hr.min()))try{const e=await Qc(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.at(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Or.get(r);s&&t.Or.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(rs.EMPTY_BYTE_STRING,n.snapshotVersion)),$u(t,e);const r=new Ua(n.target,e,1,n.sequenceNumber);Bu(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){Mr("RemoteStore","Failed to raise snapshot:",e),await Yu(t,e)}}async function Yu(t,e,n){if(!Ca(e))throw e;t.Mr.add(1),await Vu(t),t.Br.set("Offline"),n||(n=()=>Qc(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{Mr("RemoteStore","Retrying IndexedDB access"),await n(),t.Mr.delete(1),await Fu(t)}))}function Xu(t,e){return e().catch((n=>Yu(t,n,e)))}async function Ju(t){const e=Br(t),n=uh(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;Zu(e);)try{const t=await Hc(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,th(e,t)}catch(t){await Yu(e,t)}eh(e)&&nh(e)}function Zu(t){return Gu(t)&&t.$r.length<10}function th(t,e){t.$r.push(e);const n=uh(t);n.er()&&n.pr&&n.Er(e.mutations)}function eh(t){return Gu(t)&&!uh(t).tr()&&t.$r.length>0}function nh(t){uh(t).start()}async function rh(t){uh(t).Ar()}async function sh(t){const e=uh(t);for(const n of t.$r)e.Er(n.mutations)}async function ih(t,e,n){const r=t.$r.shift(),s=Va.from(r,e,n);await Xu(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await Ju(t)}async function oh(t,e){e&&uh(t).pr&&await async function(t,e){if(Wi(n=e.code)&&n!==kr.ABORTED){const n=t.$r.shift();uh(t).sr(),await Xu(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Ju(t)}var n}(t,e),eh(t)&&nh(t)}async function ah(t,e){const n=Br(t);e?(n.Mr.delete(2),await Fu(n)):e||(n.Mr.add(2),await Vu(n),n.Br.set("Unknown"))}function ch(t){return t.qr||(t.qr=function(t,e,n){const r=Br(t);return r.Pr(),new Ru(e,r.Hi,r.credentials,r.R,n)
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
     */}(t.datastore,t.asyncQueue,{Ii:zu.bind(null,t),Ri:Hu.bind(null,t),_r:Wu.bind(null,t)}),t.Fr.push((async e=>{e?(t.qr.sr(),ju(t)?Ku(t):t.Br.set("Unknown")):(await t.qr.stop(),Qu(t))}))),t.qr}function uh(t){return t.Kr||(t.Kr=function(t,e,n){const r=Br(t);return r.Pr(),new Lu(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:rh.bind(null,t),Ri:oh.bind(null,t),Ir:sh.bind(null,t),Tr:ih.bind(null,t)}),t.Fr.push((async e=>{e?(t.Kr.sr(),await Ju(t)):(await t.Kr.stop(),t.$r.length>0&&(Mr("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
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
     */}class hh{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new _a,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new hh(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Rr(kr.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lh(t,e){if(Pr("AsyncQueue",`${e}: ${t}`),Ca(t))return new Rr(kr.UNAVAILABLE,`${e}: ${t}`);throw t}
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
     */class dh{constructor(t){this.comparator=t?(e,n)=>t(e,n)||ms.comparator(e.key,n.key):(t,e)=>ms.comparator(t.key,e.key),this.keyedMap=io(),this.sortedSet=new Xi(this.comparator)}static emptySet(t){return new dh(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof dh))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new dh;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
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
     */class fh{constructor(){this.Qr=new Xi(ms.comparator)}track(t){const e=t.doc.key,n=this.Qr.get(e);n?0!==t.type&&3===n.type?this.Qr=this.Qr.insert(e,t):3===t.type&&1!==n.type?this.Qr=this.Qr.insert(e,{type:n.type,doc:t.doc}):2===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):2===t.type&&0===n.type?this.Qr=this.Qr.insert(e,{type:0,doc:t.doc}):1===t.type&&0===n.type?this.Qr=this.Qr.remove(e):1===t.type&&2===n.type?this.Qr=this.Qr.insert(e,{type:1,doc:n.doc}):0===t.type&&1===n.type?this.Qr=this.Qr.insert(e,{type:2,doc:t.doc}):Ur():this.Qr=this.Qr.insert(e,t)}jr(){const t=[];return this.Qr.inorderTraversal(((e,n)=>{t.push(n)})),t}}class mh{constructor(t,e,n,r,s,i,o,a){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a}static fromInitialDocuments(t,e,n,r){const s=[];return e.forEach((t=>{s.push({type:0,doc:t})})),new mh(t,e,dh.emptySet(e),s,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ci(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t].type!==n[t].type||!e[t].doc.isEqual(n[t].doc))return!1;return!0}}
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
     */class gh{constructor(){this.Wr=void 0,this.listeners=[]}}class ph{constructor(){this.queries=new Sc((t=>ui(t)),ci),this.onlineState="Unknown",this.Gr=new Set}}async function yh(t,e){const n=Br(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new gh),s)try{i.Wr=await n.onListen(r)}catch(t){const n=lh(t,`Initialization of query '${hi(e.query)}' failed`);return void e.onError(n)}n.queries.set(r,i),i.listeners.push(e),e.zr(n.onlineState),i.Wr&&e.Hr(i.Wr)&&Eh(n)}async function wh(t,e){const n=Br(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function vh(t,e){const n=Br(t);let r=!1;for(const t of e){const e=t.query,s=n.queries.get(e);if(s){for(const e of s.listeners)e.Hr(t)&&(r=!0);s.Wr=t}}r&&Eh(n)}function bh(t,e,n){const r=Br(t),s=r.queries.get(e);if(s)for(const t of s.listeners)t.onError(n);r.queries.delete(e)}function Eh(t){t.Gr.forEach((t=>{t.next()}))}class Ih{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new mh(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=mh.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
     */class Th{constructor(t,e){this.payload=t,this.byteLength=e}io(){return"metadata"in this.payload}}
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
     */class _h{constructor(t){this.R=t}Un(t){return Ro(this.R,t)}qn(t){return t.metadata.exists?Vo(this.R,t.document,!1):Cs.newNoDocument(this.Un(t.metadata.name),this.Kn(t.metadata.readTime))}Kn(t){return Do(t)}}class Sh{constructor(t,e,n){this.ro=t,this.localStore=e,this.R=n,this.queries=[],this.documents=[],this.progress=Ah(t)}oo(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;return t.payload.namedQuery?this.queries.push(t.payload.namedQuery):t.payload.documentMetadata?(this.documents.push({metadata:t.payload.documentMetadata}),t.payload.documentMetadata.exists||++e):t.payload.document&&(this.documents[this.documents.length-1].document=t.payload.document,++e),e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}co(t){const e=new Map,n=new _h(this.R);for(const r of t)if(r.metadata.queries){const t=n.Un(r.metadata.name);for(const n of r.metadata.queries){const r=(e.get(n)||uo()).add(t);e.set(n,r)}}return e}async complete(){const t=await async function(t,e,n,r){const s=Br(t);let i=uo(),o=ro(),a=ao();for(const t of n){const n=e.Un(t.metadata.name);t.document&&(i=i.add(n)),o=o.insert(n,e.qn(t)),a=a.insert(n,e.Kn(t.metadata.readTime))}const c=s.Mn.newChangeBuffer({trackRemovals:!0}),u=await Wc(s,function(t){return oi(Zs(Zr.fromString(`__bundle__/docs/${t}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(t=>zc(t,c,o,Hr.min(),a).next((e=>(c.apply(t),e))).next((e=>s.Ue.removeMatchingKeysForTargetId(t,u.targetId).next((()=>s.Ue.addMatchingKeys(t,i,u.targetId))).next((()=>s.Fn.En(t,e))).next((()=>e))))))}(this.localStore,new _h(this.R),this.documents,this.ro.id),e=this.co(this.documents);for(const t of this.queries)await tu(this.localStore,t,e.get(t.name));return this.progress.taskState="Success",new Uc(Object.assign({},this.progress),t)}}function Ah(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}
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
     */class Nh{constructor(t){this.key=t}}class Dh{constructor(t){this.key=t}}class xh{constructor(t,e){this.query=t,this.ao=e,this.uo=null,this.current=!1,this.ho=uo(),this.mutatedKeys=uo(),this.lo=di(t),this.fo=new dh(this.lo)}get wo(){return this.ao}_o(t,e){const n=e?e.mo:new fh,r=e?e.fo:this.fo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=ti(this.query)&&r.size===this.query.limit?r.last():null,c=ei(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=li(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),ti(this.query)||ei(this.query))for(;i.size>this.query.limit;){const t=ti(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{fo:i,mo:n,Nn:o,mutatedKeys:s}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const s=t.mo.jr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ur()}};return n(t)-n(e)}
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
     */(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const i=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.uo;return this.uo=o,0!==s.length||a?{snapshot:new mh(this.query,t.fo,r,s,t.mutatedKeys,0===o,a,!1),To:i}:{To:i}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new fh,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.ao.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.ao=this.ao.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.ao=this.ao.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=uo(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new Dh(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new Nh(n))})),e}Ao(t){this.ao=t.Bn,this.ho=uo();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return mh.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.uo)}}class Ch{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class kh{constructor(t){this.key=t,this.Po=!1}}class Rh{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.bo={},this.vo=new Sc((t=>ui(t)),ci),this.Vo=new Map,this.So=new Set,this.Do=new Xi(ms.comparator),this.Co=new Map,this.No=new nu,this.xo={},this.ko=new Map,this.$o=fc.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function Lh(t,e){const n=il(t);let r,s;const i=n.vo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Ro();else{const t=await Wc(n.localStore,oi(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await Oh(n,e,r,"current"===i),n.isPrimaryClient&&Uu(n.remoteStore,t)}return s}async function Oh(t,e,n,r){t.Mo=(e,n,r)=>async function(t,e,n,r){let s=e.view._o(n);s.Nn&&(s=await Xc(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return Gh(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const s=await Xc(t.localStore,e,!0),i=new xh(e,s.Bn),o=i._o(s.documents),a=mo.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);Gh(t,n,c.To);const u=new Ch(e,n,i);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}async function Mh(t,e){const n=Br(t),r=n.vo.get(e),s=n.Vo.get(r.targetId);if(s.length>1)return n.Vo.set(r.targetId,s.filter((t=>!ci(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Yc(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),qu(n.remoteStore,r.targetId),Kh(n,r.targetId)})).catch(wc)):(Kh(n,r.targetId),await Yc(n.localStore,r.targetId,!0))}async function Ph(t,e){const n=Br(t);try{const t=await function(t,e){const n=Br(t),r=e.snapshotVersion;let s=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Mn.newChangeBuffer({trackRemovals:!0});s=n.kn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const u=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,u),function(t,e,n){return qr(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize()||e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,e)&&o.push(n.Ue.updateTargetData(t,u))}}));let a=ro();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(zc(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(Hr.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return Sa.waitFor(o).next((()=>i.apply(t))).next((()=>n.Fn.En(t,a))).next((()=>a))})).then((t=>(n.kn=s,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(qr(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?qr(r.Po):t.removedDocuments.size>0&&(qr(r.Po),r.Po=!1))})),await Hh(n,t,e)}catch(t){await wc(t)}}function Fh(t,e,n){const r=Br(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const s=r.view.zr(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=Br(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.zr(e)&&(r=!0)})),r&&Eh(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Vh(t,e,n){const r=Br(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Co.get(e),i=s&&s.key;if(i){let t=new Xi(ms.comparator);t=t.insert(i,Cs.newNoDocument(i,Hr.min()));const n=uo().add(i),s=new fo(Hr.min(),new Map,new to(jr),t,n);await Ph(r,s),r.Do=r.Do.remove(i),r.Co.delete(e),zh(r)}else await Yc(r.localStore,e,!1).then((()=>Kh(r,e,n))).catch(wc)}async function Uh(t,e){const n=Br(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Br(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Mn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=Sa.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);qr(null!==i),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Fn.pn(t,r)))}))}(n.localStore,e);$h(n,r,null),Bh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Hh(n,t)}catch(t){await wc(t)}}async function qh(t,e,n){const r=Br(t);try{const t=await function(t,e){const n=Br(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(qr(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Fn.pn(t,r)))}))}(r.localStore,e);$h(r,e,n),Bh(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Hh(r,t)}catch(n){await wc(n)}}function Bh(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function $h(t,e,n){const r=Br(t);let s=r.xo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.xo[r.currentUser.toKey()]=s}}function Kh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Fo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||jh(t,e)}))}function jh(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(qu(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),zh(t))}function Gh(t,e,n){for(const r of n)r instanceof Nh?(t.No.addReference(r.key,e),Qh(t,r)):r instanceof Dh?(Mr("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||jh(t,r.key)):Ur()}function Qh(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(Mr("SyncEngine","New document in limbo: "+n),t.So.add(r),zh(t))}function zh(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new ms(Zr.fromString(e)),r=t.$o.next();t.Co.set(r,new kh(n)),t.Do=t.Do.insert(n,r),Uu(t.remoteStore,new Ua(oi(Zs(n.path)),r,2,Cr.o))}}async function Hh(t,e,n){const r=Br(t),s=[],i=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Mo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=Bc.vn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.bo._r(s),await async function(t,e){const n=Br(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Sa.forEach(e,(e=>Sa.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Sa.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!Ca(t))throw t;Mr("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.kn.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(e,s)}}}(r.localStore,i))}async function Wh(t,e){const n=Br(t);if(!n.currentUser.isEqual(e)){Mr("SyncEngine","User change. New user:",e.toKey());const t=await Gc(n.localStore,e);n.currentUser=e,function(t,e){t.ko.forEach((t=>{t.forEach((t=>{t.reject(new Rr(kr.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.ko.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await Hh(n,t.Ln)}}function Yh(t,e){const n=Br(t),r=n.Co.get(e);if(r&&r.Po)return uo().add(r.key);{let t=uo();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}async function Xh(t,e){const n=Br(t),r=await Xc(n.localStore,e.query,!0),s=e.view.Ao(r);return n.isPrimaryClient&&Gh(n,e.targetId,s.To),s}async function Jh(t){const e=Br(t);return Zc(e.localStore).then((t=>Hh(e,t)))}async function Zh(t,e,n,r){const s=Br(t),i=await function(t,e){const n=Br(t),r=Br(n._n);return n.persistence.runTransaction("Lookup mutation documents","readonly",(t=>r.jt(t,e).next((e=>e?n.Fn.pn(t,e):Sa.resolve(null)))))}(s.localStore,e);null!==i?("pending"===n?await Ju(s.remoteStore):"acknowledged"===n||"rejected"===n?($h(s,e,r||null),Bh(s,e),function(t,e){Br(Br(t)._n).Gt(e)}(s.localStore,e)):Ur(),await Hh(s,i)):Mr("SyncEngine","Cannot apply mutation batch with id: "+e)}async function tl(t,e,n){const r=Br(t),s=[],i=[];for(const t of e){let e;const n=r.Vo.get(t);if(n&&0!==n.length){e=await Wc(r.localStore,oi(n[0]));for(const t of n){const e=r.vo.get(t),n=await Xh(r,e);n.snapshot&&i.push(n.snapshot)}}else{const n=await Jc(r.localStore,t);e=await Wc(r.localStore,n),await Oh(r,el(n),t,!1)}s.push(e)}return r.bo._r(i),s}function el(t){return Js(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function nl(t){const e=Br(t);return Br(Br(e.localStore).persistence).fn()}async function rl(t,e,n,r){const s=Br(t);if(s.Oo)Mr("SyncEngine","Ignoring unexpected query state notification.");else if(s.Vo.has(e))switch(n){case"current":case"not-current":{const t=await Zc(s.localStore),r=fo.createSynthesizedRemoteEventForCurrentChange(e,"current"===n);await Hh(s,t,r);break}case"rejected":await Yc(s.localStore,e,!0),Kh(s,e,r);break;default:Ur()}}async function sl(t,e,n){const r=il(t);if(r.Oo){for(const t of e){if(r.Vo.has(t)){Mr("SyncEngine","Adding an already active target "+t);continue}const e=await Jc(r.localStore,t),n=await Wc(r.localStore,e);await Oh(r,el(e),n.targetId,!1),Uu(r.remoteStore,n)}for(const t of n)r.Vo.has(t)&&await Yc(r.localStore,t,!1).then((()=>{qu(r.remoteStore,t),Kh(r,t)})).catch(wc)}}function il(t){const e=Br(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ph.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yh.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Vh.bind(null,e),e.bo._r=vh.bind(null,e.eventManager),e.bo.Fo=bh.bind(null,e.eventManager),e}function ol(t){const e=Br(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Uh.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=qh.bind(null,e),e}class al{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=xu(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return jc(this.persistence,new $c,t.initialUser,this.R)}Uo(t){return new cu(hu.Ps,this.R)}Bo(t){return new Eu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class cl extends al{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await async function(t){const e=Br(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Cc(t);let n=Hr.min();return e.Ot({index:da.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=ja(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}(this.localStore),await this.Qo.initialize(this,t),await ol(this.Qo.syncEngine),await Ju(this.Qo.remoteStore)}Ko(t){return jc(this.persistence,new $c,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new Ec(e,t.asyncQueue)}Uo(t){const e=Vc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?ic.withCacheSize(this.cacheSizeBytes):ic.DEFAULT;return new Mc(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Nu(),Du(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new Eu}}class ul extends cl{constructor(t,e){super(t,e,!1),this.Qo=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Qo.syncEngine;this.sharedClientState instanceof bu&&(this.sharedClientState.syncEngine={ai:Zh.bind(null,e),ui:rl.bind(null,e),hi:sl.bind(null,e),fn:nl.bind(null,e),ci:Jh.bind(null,e)},await this.sharedClientState.start()),await this.persistence.He((async t=>{await async function(t,e){const n=Br(t);if(il(n),ol(n),!0===e&&!0!==n.Oo){const t=n.sharedClientState.getAllActiveQueryTargets(),e=await tl(n,t.toArray());n.Oo=!0,await ah(n.remoteStore,!0);for(const t of e)Uu(n.remoteStore,t)}else if(!1===e&&!1!==n.Oo){const t=[];let e=Promise.resolve();n.Vo.forEach(((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?t.push(s):e=e.then((()=>(Kh(n,s),Yc(n.localStore,s,!0)))),qu(n.remoteStore,s)})),await e,await tl(n,t),function(t){const e=Br(t);e.Co.forEach(((t,n)=>{qu(e.remoteStore,n)})),e.No.ts(),e.Co=new Map,e.Do=new Xi(ms.comparator)}(n),n.Oo=!1,await ah(n.remoteStore,!1)}}(this.Qo.syncEngine,t),this.gcScheduler&&(t&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):t||this.gcScheduler.stop())}))}Bo(t){const e=Nu();if(!bu.gt(e))throw new Rr(kr.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Vc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new bu(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class hl{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Fh(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=Wh.bind(null,this.syncEngine),await ah(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new ph}createDatastore(t){const e=xu(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Au(r));var r;return function(t,e,n){return new Ou(t,e,n)}(t.credentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Fh(this.syncEngine,t,0),i=Tu.gt()?new Tu:new Iu,new Pu(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new Rh(t,e,n,r,s,i);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Br(t);Mr("RemoteStore","RemoteStore shutting down."),e.Mr.add(5),await Vu(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
     */function ll(t,e=10240){let n=0;return{async read(){if(n<t.byteLength){const r={value:t.slice(n,n+e),done:!1};return n+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.reject("unimplemented")}}
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
     */class dl{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.jo(this.observer.next,t)}error(t){this.observer.error?this.jo(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t)}Wo(){this.muted=!0}jo(t,e){this.muted||setTimeout((()=>{this.muted||t(e)}),0)}}
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
     */class fl{constructor(t,e){this.Go=t,this.R=e,this.metadata=new _a,this.buffer=new Uint8Array,this.zo=new TextDecoder("utf-8"),this.Ho().then((t=>{t&&t.io()?this.metadata.resolve(t.payload.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null==t?void 0:t.payload)}`))}),(t=>this.metadata.reject(t)))}close(){return this.Go.cancel()}async getMetadata(){return this.metadata.promise}async Lo(){return await this.getMetadata(),this.Ho()}async Ho(){const t=await this.Jo();if(null===t)return null;const e=this.zo.decode(t),n=Number(e);isNaN(n)&&this.Yo(`length string (${e}) is not valid number`);const r=await this.Xo(n);return new Th(JSON.parse(r),t.length+n)}Zo(){return this.buffer.findIndex((t=>t==="{".charCodeAt(0)))}async Jo(){for(;this.Zo()<0&&!await this.tc(););if(0===this.buffer.length)return null;const t=this.Zo();t<0&&this.Yo("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async Xo(t){for(;this.buffer.length<t;)await this.tc()&&this.Yo("Reached the end of bundle when more is expected.");const e=this.zo.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Yo(t){throw this.Go.cancel(),new Error(`Invalid bundle format: ${t}`)}async tc(){const t=await this.Go.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}
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
     */class ml{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new Rr(kr.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(t,e){const n=Br(t),r=Mo(n.R)+"/documents",s={documents:e.map((t=>ko(n.R,t)))},i=await n.Oi("BatchGetDocuments",r,s),o=new Map;i.forEach((t=>{const e=function(t,e){return"found"in e?function(t,e){qr(!!e.found),e.found.name,e.found.updateTime;const n=Ro(t,e.found.name),r=Do(e.found.updateTime),s=new Ds({mapValue:{fields:e.found.fields}});return Cs.newFoundDocument(n,r,s)}(t,e):"missing"in e?function(t,e){qr(!!e.missing),qr(!!e.readTime);const n=Ro(t,e.missing),r=Do(e.readTime);return Cs.newNoDocument(n,r)}(t,e):Ur()}(n.R,t);o.set(e.key.toString(),e)}));const a=[];return e.forEach((t=>{const e=o.get(t.toString());qr(!!e),a.push(e)})),a}(this.datastore,t);return e.forEach((t=>this.recordVersion(t))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastWriteError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new ji(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((t,e)=>{const n=ms.fromPath(e);this.mutations.push(new Gi(n,this.precondition(n)))})),await async function(t,e){const n=Br(t),r=Mo(n.R)+"/documents",s={writes:e.map((t=>Uo(n.R,t)))};await n.Ni("Commit",r,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw Ur();e=Hr.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new Rr(kr.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?ki.updateTime(e):ki.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(Hr.min()))throw new Rr(kr.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ki.updateTime(e)}return ki.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
     */class gl{constructor(t,e,n,r){this.asyncQueue=t,this.datastore=e,this.updateFunction=n,this.deferred=r,this.ec=5,this.Zi=new Cu(this.asyncQueue,"transaction_retry")}run(){this.nc()}nc(){this.Zi.ji((async()=>{const t=new ml(this.datastore),e=this.sc(t);e&&e.then((e=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(e)})).catch((t=>{this.ic(t)}))))})).catch((t=>{this.ic(t)}))}))}sc(t){try{const e=this.updateFunction(t);return!ls(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}ic(t){this.ec>0&&this.rc(t)?(this.ec-=1,this.asyncQueue.enqueueAndForget((()=>(this.nc(),Promise.resolve())))):this.deferred.reject(t)}rc(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||!Wi(e)}return!1}}
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
     */class pl{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=lu.UNAUTHENTICATED,this.clientId=Kr.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{Mr("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Rr(kr.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new _a;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=lh(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function yl(t,e){t.asyncQueue.verifyOperationInProgress(),Mr("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await Gc(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function wl(t,e){t.asyncQueue.verifyOperationInProgress();const n=await vl(t);Mr("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=Br(t);n.asyncQueue.verifyOperationInProgress(),Mr("RemoteStore","RemoteStore received new credentials");const r=Gu(n);n.Mr.add(3),await Vu(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Mr.delete(3),await Fu(n)}(e.remoteStore,t))),t.onlineComponents=e}async function vl(t){return t.offlineComponents||(Mr("FirestoreClient","Using default OfflineComponentProvider"),await yl(t,new al)),t.offlineComponents}async function bl(t){return t.onlineComponents||(Mr("FirestoreClient","Using default OnlineComponentProvider"),await wl(t,new hl)),t.onlineComponents}function El(t){return vl(t).then((t=>t.persistence))}function Il(t){return vl(t).then((t=>t.localStore))}function Tl(t){return bl(t).then((t=>t.remoteStore))}function _l(t){return bl(t).then((t=>t.syncEngine))}async function Sl(t){const e=await bl(t),n=e.eventManager;return n.onListen=Lh.bind(null,e.syncEngine),n.onUnlisten=Mh.bind(null,e.syncEngine),n}function Al(t,e,n={}){const r=new _a;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new dl({next:i=>{e.enqueueAndForget((()=>wh(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new Rr(kr.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new Rr(kr.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new Ih(Zs(n.path),i,{includeMetadataChanges:!0,so:!0});return yh(t,o)}(await Sl(t),t.asyncQueue,e,n,r))),r.promise}function Nl(t,e,n={}){const r=new _a;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new dl({next:n=>{e.enqueueAndForget((()=>wh(t,o))),n.fromCache&&"server"===r.source?s.reject(new Rr(kr.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new Ih(n,i,{includeMetadataChanges:!0,so:!0});return yh(t,o)}(await Sl(t),t.asyncQueue,e,n,r))),r.promise}function Dl(t,e,n,r){const s=function(t,e){let n;return n="string"==typeof t?(new TextEncoder).encode(t):t,function(t,e){return new fl(t,e)}(function(t,e){if(t instanceof Uint8Array)return ll(t,e);if(t instanceof ArrayBuffer)return ll(new Uint8Array(t),e);if(t instanceof ReadableStream)return t.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),e)}
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
     */(n,xu(e));t.asyncQueue.enqueueAndForget((async()=>{!function(t,e,n){const r=Br(t);(async function(t,e,n){try{const r=await e.getMetadata();if(await function(t,e){const n=Br(t),r=Do(e.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",(t=>n.Ke.getBundleMetadata(t,e.id))).then((t=>!!t&&t.createTime.compareTo(r)>=0))}(t.localStore,r))return await e.close(),void n._completeWith(function(t){return{taskState:"Success",documentsLoaded:t.totalDocuments,bytesLoaded:t.totalBytes,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}(r));n._updateProgress(Ah(r));const s=new Sh(r,t.localStore,e.R);let i=await e.Lo();for(;i;){const t=await s.oo(i);t&&n._updateProgress(t),i=await e.Lo()}const o=await s.complete();await Hh(t,o.wn,void 0),await function(t,e){const n=Br(t);return n.persistence.runTransaction("Save bundle","readwrite",(t=>n.Ke.saveBundleMetadata(t,e)))}(t.localStore,r),n._completeWith(o.progress)}catch(t){Fr("SyncEngine",`Loading bundle failed with ${t}`),n._failWith(t)}}
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
     */)(r,e,n).then((()=>{r.sharedClientState.notifyBundleLoaded()}))}(await _l(t),s,r)}))}class xl{constructor(t,e,n,r,s,i,o){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o}}class Cl{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Cl&&t.projectId===this.projectId&&t.database===this.database}}
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
     */const kl=new Map;
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
     */class Rl{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Ll{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(lu.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class Ol{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}removeChangeListener(){this.changeListener=null}}class Ml{constructor(t){this.currentUser=lu.UNAUTHENTICATED,this.oc=new _a,this.cc=0,this.changeListener=()=>Promise.resolve(),this.ac=!1,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.hc(),this.oc.resolve(),this.ac&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{Mr("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.lc(),this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):this.ac&&(Mr("FirebaseCredentialsProvider","Auth not yet detected"),this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser))))}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(Mr("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(qr("string"==typeof e.accessToken),new Rl(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.ac=!0,this.asyncQueue=t,this.changeListener=e}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}hc(){const t=this.auth&&this.auth.getUid();return qr(null===t||"string"==typeof t),new lu(t)}lc(){this.ac&&(this.ac=!1,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await this.changeListener(this.currentUser),this.ac=!0})))}}class Pl{constructor(t,e,n){this.fc=t,this.dc=e,this.wc=n,this.type="FirstParty",this.user=lu.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.dc},e=this.fc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.wc&&(t["X-Goog-Iam-Authorization-Token"]=this.wc),t}}class Fl{constructor(t,e,n){this.fc=t,this.dc=e,this.wc=n}getToken(){return Promise.resolve(new Pl(this.fc,this.dc,this.wc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(lu.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
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
     */function Vl(t,e,n){if(!n)throw new Rr(kr.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Ul(t){if(!ms.isDocumentKey(t))throw new Rr(kr.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function ql(t){if(ms.isDocumentKey(t))throw new Rr(kr.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Bl(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Ur()}function $l(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Rr(kr.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Bl(t);throw new Rr(kr.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function Kl(t,e){if(e<=0)throw new Rr(kr.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}
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
     */class jl{constructor(t){var e;if(void 0===t.host){if(void 0!==t.ssl)throw new Rr(kr.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Rr(kr.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,function(t,e,n,r){if(!0===e&&!0===r)throw new Rr(kr.INVALID_ARGUMENT,"experimentalForceLongPolling and experimentalAutoDetectLongPolling cannot be used together.")}(0,t.experimentalForceLongPolling,0,t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties}}
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
     */class Gl{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new jl({}),this._settingsFrozen=!1,t instanceof Cl?(this._databaseId=t,this._credentials=new Ll):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Rr(kr.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cl(t.options.projectId)}(t),this._credentials=new Ml(e))}get app(){if(!this._app)throw new Rr(kr.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Rr(kr.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new jl(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Ll;switch(t.type){case"gapi":const e=t.client;return qr(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Fl(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Rr(kr.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=kl.get(t);e&&(Mr("ComponentProvider","Removing Datastore"),kl.delete(t),e.terminate())}(this),Promise.resolve()}}function Ql(t,e,n,r={}){const s=(t=$l(t,Gl))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==e&&Fr("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},s),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){const e=
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
function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var n=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var o=i({iss:"https://securetoken.google.com/"+n,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[a.encodeString(JSON.stringify({alg:"none",type:"JWT"}),!1),a.encodeString(JSON.stringify(o),!1),""].join(".")}(r.mockUserToken),n=r.mockUserToken.sub||r.mockUserToken.user_id;if(!n)throw new Rr(kr.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");t._credentials=new Ol(new Rl(e,new lu(n)))}}
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
     */class zl{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wl(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new zl(this.firestore,t,this._key)}}class Hl{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Hl(this.firestore,t,this._query)}}class Wl extends Hl{constructor(t,e,n){super(t,e,Zs(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new zl(this.firestore,null,new ms(t))}withConverter(t){return new Wl(this.firestore,t,this._path)}}function Yl(t,e,...n){if(t=f(t),Vl("collection","path",e),t instanceof Gl){const r=Zr.fromString(e,...n);return ql(r),new Wl(t,null,r)}{if(!(t instanceof zl||t instanceof Wl))throw new Rr(kr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=Zr.fromString(t.path,...n).child(Zr.fromString(e));return ql(r),new Wl(t.firestore,null,r)}}function Xl(t,e,...n){if(t=f(t),1===arguments.length&&(e=Kr.u()),Vl("doc","path",e),t instanceof Gl){const r=Zr.fromString(e,...n);return Ul(r),new zl(t,null,new ms(r))}{if(!(t instanceof zl||t instanceof Wl))throw new Rr(kr.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Zr.fromString(e,...n));return Ul(r),new zl(t.firestore,t instanceof Wl?t.converter:null,new ms(r))}}function Jl(t,e){return t=f(t),e=f(e),(t instanceof zl||t instanceof Wl)&&(e instanceof zl||e instanceof Wl)&&t.firestore===e.firestore&&t.path===e.path&&t.converter===e.converter}function Zl(t,e){return t=f(t),e=f(e),t instanceof Hl&&e instanceof Hl&&t.firestore===e.firestore&&ci(t._query,e._query)&&t.converter===e.converter
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
     */}class td{constructor(){this._c=Promise.resolve(),this.mc=[],this.gc=!1,this.yc=[],this.Ec=null,this.Tc=!1,this.Ic=[],this.Zi=new Cu(this,"async_queue_retry"),this.Ac=()=>{const t=Du();t&&Mr("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=Du();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Ac)}get isShuttingDown(){return this.gc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Rc(),this.Pc(t)}enterRestrictedMode(){if(!this.gc){this.gc=!0;const t=Du();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Ac)}}enqueue(t){return this.Rc(),this.gc?new Promise((t=>{})):this.Pc(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.mc.push(t),this.bc())))}async bc(){if(0!==this.mc.length){try{await this.mc[0](),this.mc.shift(),this.Zi.reset()}catch(t){if(!Ca(t))throw t;Mr("AsyncQueue","Operation failed with retryable error: "+t)}this.mc.length>0&&this.Zi.ji((()=>this.bc()))}}Pc(t){const e=this._c.then((()=>(this.Tc=!0,t().catch((t=>{throw this.Ec=t,this.Tc=!1,Pr("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
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
     */(t)),t})).then((t=>(this.Tc=!1,t))))));return this._c=e,e}enqueueAfterDelay(t,e,n){this.Rc(),this.Ic.indexOf(t)>-1&&(e=0);const r=hh.createAndSchedule(this,t,e,n,(t=>this.vc(t)));return this.yc.push(r),r}Rc(){this.Ec&&Ur()}verifyOperationInProgress(){}async Vc(){let t;do{t=this._c,await t}while(t!==this._c)}Sc(t){for(const e of this.yc)if(e.timerId===t)return!0;return!1}Dc(t){return this.Vc().then((()=>{this.yc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.yc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.Vc()}))}Cc(t){this.Ic.push(t)}vc(t){const e=this.yc.indexOf(t);this.yc.splice(e,1)}}function ed(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t)}class nd{constructor(){this._progressObserver={},this._taskCompletionResolver=new _a,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}
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
     */class rd extends Gl{constructor(t,e){super(t,e),this.type="firestore",this._queue=new td,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||id(this),this._firestoreClient.terminate()}}function sd(t){return t._firestoreClient||id(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function id(t){var e;const n=t._freezeSettings(),r=function(t,e,n,r){return new xl(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling)}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new pl(t._credentials,t._queue,r)}function od(t,e,n){const r=new _a;return t.asyncQueue.enqueue((async()=>{try{await yl(t,n),await wl(t,e),r.resolve()}catch(t){if(!function(t){return"FirebaseError"===t.name?t.code===kr.FAILED_PRECONDITION||t.code===kr.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||(22===t.code||20===t.code||11===t.code)}(t))throw t;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}})).then((()=>r.promise))}function ad(t){return function(t){const e=new _a;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e){const n=Br(t);Gu(n.remoteStore)||Mr("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const t=await function(t){const e=Br(t);return e.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(t=>e._n.getHighestUnacknowledgedBatchId(t)))}(n.localStore);if(-1===t)return void e.resolve();const r=n.ko.get(t)||[];r.push(e),n.ko.set(t,r)}catch(t){const n=lh(t,"Initialization of waitForPendingWrites() operation failed");e.reject(n)}}(await _l(t),e))),e.promise}(sd(t=$l(t,rd)))}function cd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await El(t),n=await Tl(t);return e.setNetworkEnabled(!0),function(t){const e=Br(t);return e.Mr.delete(0),Fu(e)}(n)}))}(sd(t=$l(t,rd)))}function ud(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await El(t),n=await Tl(t);return e.setNetworkEnabled(!1),async function(t){const e=Br(t);e.Mr.add(0),await Vu(e),e.Br.set("Offline")}(n)}))}(sd(t=$l(t,rd)))}function hd(t,e){return function(t,e){return t.asyncQueue.enqueue((async()=>function(t,e){const n=Br(t);return n.persistence.runTransaction("Get named query","readonly",(t=>n.Ke.getNamedQuery(t,e)))}(await Il(t),e)))}(sd(t=$l(t,rd)),e).then((e=>e?new Hl(t,null,e.query):null))}function ld(t){if(t._initialized||t._terminated)throw new Rr(kr.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
     */class dd{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Rr(kr.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new es(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
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
     */class fd{constructor(t){this._byteString=t}static fromBase64String(t){try{return new fd(rs.fromBase64String(t))}catch(t){throw new Rr(kr.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new fd(rs.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
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
     */class md{constructor(t){this._methodName=t}}
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
     */class gd{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Rr(kr.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Rr(kr.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return jr(this._lat,t._lat)||jr(this._long,t._long)}}
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
     */const pd=/^__.*__$/;class yd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new qi(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ui(t,this.data,e,this.fieldTransforms)}}class wd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new qi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function vd(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ur()}}class bd{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Nc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get xc(){return this.settings.xc}kc(t){return new bd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}$c(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Oc:!1});return r.Mc(t),r}Fc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.kc({path:n,Oc:!1});return r.Nc(),r}Lc(t){return this.kc({path:void 0,Oc:!0})}Bc(t){return qd(t,this.settings.methodName,this.settings.Uc||!1,this.path,this.settings.qc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Nc(){if(this.path)for(let t=0;t<this.path.length;t++)this.Mc(this.path.get(t))}Mc(t){if(0===t.length)throw this.Bc("Document fields must not be empty");if(vd(this.xc)&&pd.test(t))throw this.Bc('Document fields cannot begin and end with "__"')}}class Ed{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||xu(t)}Kc(t,e,n,r=!1){return new bd({xc:t,methodName:e,qc:n,path:es.emptyPath(),Oc:!1,Uc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function Id(t){const e=t._freezeSettings(),n=xu(t._databaseId);return new Ed(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Td(t,e,n,r,s,i={}){const o=t.Kc(i.merge||i.mergeFields?2:0,e,n,s);Pd("Data must be an object, but it was:",o,r);const a=Od(r,o);let c,u;if(i.merge)c=new ns(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=Fd(e,r,n);if(!o.contains(s))throw new Rr(kr.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Bd(t,s)||t.push(s)}c=new ns(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new yd(new Ds(a),c,u)}class _d extends md{_toFieldTransform(t){if(2!==t.xc)throw 1===t.xc?t.Bc(`${this._methodName}() can only appear at the top level of your update data`):t.Bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof _d}}function Sd(t,e,n){return new bd({xc:3,qc:e.settings.qc,methodName:t._methodName,Oc:n},e.databaseId,e.R,e.ignoreUndefinedProperties)}class Ad extends md{_toFieldTransform(t){return new xi(t.path,new Ei)}isEqual(t){return t instanceof Ad}}class Nd extends md{constructor(t,e){super(t),this.Qc=e}_toFieldTransform(t){const e=Sd(this,t,!0),n=this.Qc.map((t=>Ld(t,e))),r=new Ii(n);return new xi(t.path,r)}isEqual(t){return this===t}}class Dd extends md{constructor(t,e){super(t),this.Qc=e}_toFieldTransform(t){const e=Sd(this,t,!0),n=this.Qc.map((t=>Ld(t,e))),r=new _i(n);return new xi(t.path,r)}isEqual(t){return this===t}}class xd extends md{constructor(t,e){super(t),this.jc=e}_toFieldTransform(t){const e=new Ai(t.R,pi(t.R,this.jc));return new xi(t.path,e)}isEqual(t){return this===t}}function Cd(t,e,n,r){const s=t.Kc(1,e,n);Pd("Data must be an object, but it was:",s,r);const i=[],o=Ds.empty();Yr(r,((t,r)=>{const a=Ud(e,t,n);r=f(r);const c=s.Fc(a);if(r instanceof _d)i.push(a);else{const t=Ld(r,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new ns(i);return new wd(o,a,s.fieldTransforms)}function kd(t,e,n,r,s,i){const o=t.Kc(1,e,n),a=[Fd(e,r,n)],c=[s];if(i.length%2!=0)throw new Rr(kr.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(Fd(e,i[t])),c.push(i[t+1]);const u=[],h=Ds.empty();for(let t=a.length-1;t>=0;--t)if(!Bd(u,a[t])){const e=a[t];let n=c[t];n=f(n);const r=o.Fc(e);if(n instanceof _d)u.push(e);else{const t=Ld(n,r);null!=t&&(u.push(e),h.set(e,t))}}const l=new ns(u);return new wd(h,l,o.fieldTransforms)}function Rd(t,e,n,r=!1){return Ld(n,t.Kc(r?4:3,e))}function Ld(t,e){if(Md(t=f(t)))return Pd("Unsupported field value:",e,t),Od(t,e);if(t instanceof md)return function(t,e){if(!vd(e.xc))throw e.Bc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Bc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Oc&&4!==e.xc)throw e.Bc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Ld(s,e.Lc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=f(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return pi(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=zr.fromDate(t);return{timestampValue:So(e.R,n)}}if(t instanceof zr){const n=new zr(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:So(e.R,n)}}if(t instanceof gd)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof fd)return{bytesValue:Ao(e.R,t._byteString)};if(t instanceof zl){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Bc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:xo(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Bc(`Unsupported field value: ${Bl(t)}`)}(t,e)}function Od(t,e){const n={};return Xr(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Yr(t,((t,r)=>{const s=Ld(r,e.$c(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function Md(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof zr||t instanceof gd||t instanceof fd||t instanceof zl||t instanceof md)}function Pd(t,e,n){if(!Md(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Bl(n);throw"an object"===r?e.Bc(t+" a custom object"):e.Bc(t+" "+r)}}function Fd(t,e,n){if((e=f(e))instanceof dd)return e._internalPath;if("string"==typeof e)return Ud(t,e);throw qd("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Vd=new RegExp("[~\\*/\\[\\]]");function Ud(t,e,n){if(e.search(Vd)>=0)throw qd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new dd(...e.split("."))._internalPath}catch(r){throw qd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function qd(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Rr(kr.INVALID_ARGUMENT,a+t+c)}function Bd(t,e){return t.some((t=>t.isEqual(e)))}
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
     */class $d{constructor(t,e,n,r,s){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new zl(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const t=new Kd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.toProto())}}get(t){if(this._document){const e=this._document.data.field(jd("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e)}}}class Kd extends $d{data(){return super.data()}}function jd(t,e){return"string"==typeof e?Ud(t,e):e instanceof dd?e._internalPath:e._delegate._internalPath}
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
     */class Gd{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Qd extends $d{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new zd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.toProto(),t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(jd("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class zd extends Qd{data(t={}){return super.data(t)}}class Hd{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Gd(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new zd(this._firestore,this._userDataWriter,n.key,n,new Gd(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Rr(kr.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e,n=0;return t._snapshot.docChanges.map((r=>{const s=new zd(t._firestore,t._userDataWriter,r.doc.key,r.doc,new Gd(t._snapshot.mutatedKeys.has(r.doc.key),t._snapshot.fromCache),t.query.converter);return e=r.doc,{type:"added",doc:s,oldIndex:-1,newIndex:n++}}))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new zd(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Gd(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:Wd(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Wd(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ur()}}function Yd(t,e){return t instanceof Qd&&e instanceof Qd?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(null===t._document?null===e._document:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof Hd&&e instanceof Hd&&t._firestore===e._firestore&&Zl(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}
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
     */function Xd(t){if(ei(t)&&0===t.explicitOrderBy.length)throw new Rr(kr.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Jd{}function Zd(t,...e){for(const n of e)t=n._apply(t);return t}class tf extends Jd{constructor(t,e,n){super(),this.Wc=t,this.Gc=e,this.zc=n,this.type="where"}_apply(t){const e=Id(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Rr(kr.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){cf(o,i);const e=[];for(const n of o)e.push(af(r,t,n));a={arrayValue:{values:e}}}else a=af(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||cf(o,i),a=Rd(n,"where",o,"in"===i||"not-in"===i);const c=Ps.create(s,i,a);return function(t,e){if(e.g()){const n=ri(t);if(null!==n&&!n.isEqual(e.field))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);const r=ni(t);null!==r&&uf(t,e.field,r)}const n=function(t,e){for(const n of t.filters)if(e.indexOf(n.op)>=0)return n.op;return null}(t,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new Rr(kr.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Rr(kr.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}(t,c),c}(t._query,0,e,t.firestore._databaseId,this.Wc,this.Gc,this.zc);return new Hl(t.firestore,t.converter,function(t,e){const n=t.filters.concat([e]);return new Xs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}(t._query,n))}}class ef extends Jd{constructor(t,e){super(),this.Wc=t,this.Hc=e,this.type="orderBy"}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new Rr(kr.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new Rr(kr.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new zs(e,n);return function(t,e){if(null===ni(t)){const n=ri(t);null!==n&&uf(t,n,e.field)}}(t,r),r}(t._query,this.Wc,this.Hc);return new Hl(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new Xs(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}class nf extends Jd{constructor(t,e,n){super(),this.type=t,this.Jc=e,this.Yc=n}_apply(t){return new Hl(t.firestore,t.converter,ai(t._query,this.Jc,this.Yc))}}class rf extends Jd{constructor(t,e,n){super(),this.type=t,this.Xc=e,this.Zc=n}_apply(t){const e=of(t,this.type,this.Xc,this.Zc);return new Hl(t.firestore,t.converter,function(t,e){return new Xs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,e,t.endAt)}(t._query,e))}}class sf extends Jd{constructor(t,e,n){super(),this.type=t,this.Xc=e,this.Zc=n}_apply(t){const e=of(t,this.type,this.Xc,this.Zc);return new Hl(t.firestore,t.converter,function(t,e){return new Xs(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,e)}(t._query,e))}}function of(t,e,n,r){if(n[0]=f(n[0]),n[0]instanceof $d)return function(t,e,n,r,s){if(!r)throw new Rr(kr.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of ii(t))if(n.field.isKeyField())i.push(Is(e,r.key));else{const t=r.data.field(n.field);if(cs(t))throw new Rr(kr.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=n.field.canonicalString();throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}i.push(t)}return new Gs(i,s)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=Id(t.firestore);return function(t,e,n,r,s,i){const o=t.explicitOrderBy;if(s.length>o.length)throw new Rr(kr.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const c=s[i];if(o[i].field.isKeyField()){if("string"!=typeof c)throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!si(t)&&-1!==c.indexOf("/"))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=t.path.child(Zr.fromString(c));if(!ms.isDocumentKey(n))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new ms(n);a.push(Is(e,s))}else{const t=Rd(n,r,c);a.push(t)}}return new Gs(a,i)}(t._query,t.firestore._databaseId,s,e,n,r)}}function af(t,e,n){if("string"==typeof(n=f(n))){if(""===n)throw new Rr(kr.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!si(e)&&-1!==n.indexOf("/"))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Zr.fromString(n));if(!ms.isDocumentKey(r))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Is(t,new ms(r))}if(n instanceof zl)return Is(t,n._key);throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${Bl(n)}.`)}function cf(t,e){if(!Array.isArray(t)||0===t.length)throw new Rr(kr.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new Rr(kr.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function uf(t,e,n){if(!n.isEqual(e))throw new Rr(kr.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
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
     */class hf{convertValue(t,e="none"){switch(gs(t)){case 0:return null;case 1:return t.booleanValue;case 2:return os(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(as(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Ur()}}convertObject(t,e){const n={};return Yr(t.fields||{},((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new gd(os(t.latitude),os(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=us(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(hs(t));default:return null}}convertTimestamp(t){const e=is(t);return new zr(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Zr.fromString(t);qr(ta(n));const r=new Cl(n.get(1),n.get(3)),s=new ms(n.popFirst(5));return r.isEqual(e)||Pr(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
     */function lf(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class df extends hf{constructor(t){super(),this.firestore=t}convertBytes(t){return new fd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new zl(this.firestore,null,e)}}
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
     */class ff{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=Id(t)}set(t,e,n){this._verifyNotCommitted();const r=mf(t,this._firestore),s=lf(r.converter,e,n),i=Td(this._dataReader,"WriteBatch.set",r._key,s,null!==r.converter,n);return this._mutations.push(i.toMutation(r._key,ki.none())),this}update(t,e,n,...r){this._verifyNotCommitted();const s=mf(t,this._firestore);let i;return i="string"==typeof(e=f(e))||e instanceof dd?kd(this._dataReader,"WriteBatch.update",s._key,e,n,r):Cd(this._dataReader,"WriteBatch.update",s._key,e),this._mutations.push(i.toMutation(s._key,ki.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=mf(t,this._firestore);return this._mutations=this._mutations.concat(new ji(e._key,ki.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Rr(kr.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function mf(t,e){if((t=f(t)).firestore!==e)throw new Rr(kr.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}
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
     */class gf extends hf{constructor(t){super(),this.firestore=t}convertBytes(t){return new fd(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new zl(this.firestore,null,e)}}function pf(t){t=$l(t,zl);const e=$l(t.firestore,rd),n=sd(e),r=new gf(e);return function(t,e){const n=new _a;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await function(t,e){const n=Br(t);return n.persistence.runTransaction("read document","readonly",(t=>n.Fn.mn(t,e)))}(t,e);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new Rr(kr.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(t){const r=lh(t,`Failed to get document '${e} from cache`);n.reject(r)}}(await Il(t),e,n))),n.promise}(n,t._key).then((n=>new Qd(e,r,t._key,n,new Gd(null!==n&&n.hasLocalMutations,!0),t.converter)))}function yf(t){t=$l(t,Hl);const e=$l(t.firestore,rd),n=sd(e),r=new gf(e);return function(t,e){const n=new _a;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await Xc(t,e,!0),s=new xh(e,r.Bn),i=s._o(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(t){const r=lh(t,`Failed to execute query '${e} against cache`);n.reject(r)}}(await Il(t),e,n))),n.promise}(n,t._query).then((n=>new Hd(e,r,t,n)))}function wf(t,e,n,...r){t=$l(t,zl);const s=$l(t.firestore,rd),i=Id(s);let o;return o="string"==typeof(e=f(e))||e instanceof dd?kd(i,"updateDoc",t._key,e,n,r):Cd(i,"updateDoc",t._key,e),Ef(s,[o.toMutation(t._key,ki.exists(!0))])}function vf(t,...e){var n,r,s;t=f(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||ed(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ed(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof zl)u=$l(t.firestore,rd),h=Zs(t._key.path),c={next:n=>{e[o]&&e[o](If(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=$l(t,Hl);u=$l(n.firestore,rd),h=n._query;const r=new gf(u);c={next:t=>{e[o]&&e[o](new Hd(u,r,n,t))},error:e[o+1],complete:e[o+2]},Xd(t._query)}return function(t,e,n,r){const s=new dl(r),i=new Ih(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>yh(await Sl(t),i))),()=>{s.Wo(),t.asyncQueue.enqueueAndForget((async()=>wh(await Sl(t),i)))}}(sd(u),h,a,c)}function bf(t,e){return function(t,e){const n=new dl(e);return t.asyncQueue.enqueueAndForget((async()=>function(t,e){Br(t).Gr.add(e),e.next()}(await Sl(t),n))),()=>{n.Wo(),t.asyncQueue.enqueueAndForget((async()=>function(t,e){Br(t).Gr.delete(e)}(await Sl(t),n)))}}(sd(t=$l(t,rd)),ed(e)?e:{next:e})}function Ef(t,e){return function(t,e){const n=new _a;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=ol(t);try{const t=await function(t,e){const n=Br(t),r=zr.now(),s=e.reduce(((t,e)=>t.add(e.key)),uo());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Fn.pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=Pi(t,i.get(t.key));null!=e&&o.push(new qi(t.key,e,xs(e.toProto().mapValue),ki.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(i),{batchId:t.batchId,changes:i})))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new Xi(jr)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(r,t.batchId,n),await Hh(r,t.changes),await Ju(r.remoteStore)}catch(t){const e=lh(t,"Failed to persist write");n.reject(e)}}(await _l(t),e,n))),n.promise}(sd(t),e)}function If(t,e,n){const r=n.docs.get(e._key),s=new gf(t);return new Qd(t,s,e._key,r,new Gd(n.hasPendingWrites,n.fromCache),e.converter)}
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
     */class Tf extends class{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Id(t)}get(t){const e=mf(t,this._firestore),n=new df(this._firestore);return this._transaction.lookup([e._key]).then((t=>{if(!t||1!==t.length)return Ur();const r=t[0];if(r.isFoundDocument())return new $d(this._firestore,n,r.key,r,e.converter);if(r.isNoDocument())return new $d(this._firestore,n,e._key,null,e.converter);throw Ur()}))}set(t,e,n){const r=mf(t,this._firestore),s=lf(r.converter,e,n),i=Td(this._dataReader,"Transaction.set",r._key,s,null!==r.converter,n);return this._transaction.set(r._key,i),this}update(t,e,n,...r){const s=mf(t,this._firestore);let i;return i="string"==typeof(e=f(e))||e instanceof dd?kd(this._dataReader,"Transaction.update",s._key,e,n,r):Cd(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,i),this}delete(t){const e=mf(t,this._firestore);return this._transaction.delete(e._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=mf(t,this._firestore),n=new gf(this._firestore);return super.get(t).then((t=>new Qd(this._firestore,n,e._key,t._document,new Gd(!1,!1),e.converter)))}}function _f(t,e){return function(t,e){const n=new _a;return t.asyncQueue.enqueueAndForget((async()=>{const r=await function(t){return bl(t).then((t=>t.datastore))}(t);new gl(t.asyncQueue,r,e,n).run()})),n.promise}(sd(t),(n=>e(new Tf(t,n))))}
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
     */!function(t){xr=t}(e.SDK_VERSION),e._registerComponent(new p("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new rd(n,t.getProvider("auth-internal"));return e&&r._setSettings(e),r}),"PUBLIC")),e.registerVersion("@firebase/firestore","0.0.900-exp.d92a36260",undefined);
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
const Sf="(default)";class Af{constructor(t,e){this.projectId=t,this.database=e||Sf}get isDefaultDatabase(){return this.database===Sf}isEqual(t){return t instanceof Af&&t.projectId===this.projectId&&t.database===this.database}}
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
let Nf="8.6.1";
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
const Df=new E("@firebase/firestore");function xf(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
     */function Cf(t="Unexpected state"){const e=`FIRESTORE (${Nf}) INTERNAL ASSERTION FAILED: `+t;throw function(t,...e){if(Df.logLevel<=g.ERROR){const n=e.map(xf);Df.error(`Firestore (${Nf}): ${t}`,...n)}}(e),new Error(e)}
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
     */const kf="invalid-argument",Rf="failed-precondition",Lf="unimplemented";class Of extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
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
     */const Mf="__name__";class Pf{constructor(t,e,n){void 0===e?e=0:e>t.length&&Cf(),void 0===n?n=t.length-e:n>t.length-e&&Cf(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Pf.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Pf?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Ff extends Pf{construct(t,e,n){return new Ff(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Of(kf,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Ff(e)}static emptyPath(){return new Ff([])}}const Vf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Uf extends Pf{construct(t,e,n){return new Uf(t,e,n)}static isValidIdentifier(t){return Vf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Uf.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Mf}static keyField(){return new Uf([Mf])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Of(kf,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Of(kf,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Of(kf,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new Of(kf,"Unterminated ` in path: "+t);return new Uf(e)}static emptyPath(){return new Uf([])}}
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
     */class qf{constructor(t){this.path=t}static fromPath(t){return new qf(Ff.fromString(t))}static fromName(t){return new qf(Ff.fromString(t).popFirst(5))}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}isEqual(t){return null!==t&&0===Ff.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Ff.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new qf(new Ff(t.slice()))}}
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
     */function Bf(t,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new Of(kf,`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}function $f(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Of(kf,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Cf()}(t);throw new Of(kf,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
function Kf(){if("undefined"==typeof Uint8Array)throw new Of(Lf,"Uint8Arrays are not available in this environment.")}function jf(){if("undefined"==typeof atob)throw new Of(Lf,"Blobs are unavailable in Firestore in this environment.")}class Gf{constructor(t){this._delegate=t}static fromBase64String(t){return jf(),new Gf(fd.fromBase64String(t))}static fromUint8Array(t){return Kf(),new Gf(fd.fromUint8Array(t))}toBase64(){return jf(),this._delegate.toBase64()}toUint8Array(){return Kf(),this._delegate.toUint8Array()}isEqual(t){return this._delegate.isEqual(t._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
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
     */function Qf(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of e)if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */(t,["next","error","complete"])}class zf{enableIndexedDbPersistence(t,e){return function(t,e){ld(t=$l(t,rd));const n=sd(t),r=t._freezeSettings(),s=new hl;return od(n,s,new cl(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}(t._delegate,{forceOwnership:e})}enableMultiTabIndexedDbPersistence(t){return function(t){ld(t=$l(t,rd));const e=sd(t),n=t._freezeSettings(),r=new hl;return od(e,r,new ul(r,n.cacheSizeBytes))}(t._delegate)}clearIndexedDbPersistence(t){return function(t){if(t._initialized&&!t._terminated)throw new Rr(kr.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new _a;return t._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await async function(t){if(!Na.gt())return Promise.resolve();const e=t+"main";await Na.delete(e)}(Vc(t._databaseId,t._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}(t._delegate)}}class Hf{constructor(t,e,n){this._delegate=e,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},t instanceof Af||(this._appCompat=t)}get _databaseId(){return this._delegate._databaseId}settings(t){t.merge&&delete(t=Object.assign(Object.assign({},this._delegate._getSettings()),t)).merge,this._delegate._setSettings(t)}useEmulator(t,e,n={}){Ql(this._delegate,t,e,n)}enableNetwork(){return cd(this._delegate)}disableNetwork(){return ud(this._delegate)}enablePersistence(t){let e=!1,n=!1;return t&&(e=!!t.synchronizeTabs,n=!!t.experimentalForceOwningTab,function(t,e,n,r){if(!0===e&&!0===r)throw new Of(kf,`${t} and ${n} cannot be used together.`)}("synchronizeTabs",e,"experimentalForceOwningTab",n)),e?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore"),this._appCompat._removeServiceInstance("firestore-exp")),this._delegate._delete()}waitForPendingWrites(){return ad(this._delegate)}onSnapshotsInSync(t){return bf(this._delegate,t)}get app(){if(!this._appCompat)throw new Of(Rf,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(t){try{return new cm(this,Yl(this._delegate,t))}catch(t){throw tm(t,"collection()","Firestore.collection()")}}doc(t){try{return new Zf(this,Xl(this._delegate,t))}catch(t){throw tm(t,"doc()","Firestore.doc()")}}collectionGroup(t){try{return new im(this,function(t,e){if(t=$l(t,Gl),Vl("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new Rr(kr.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Hl(t,null,function(t){return new Xs(Zr.emptyPath(),t)}(e))}(this._delegate,t))}catch(t){throw tm(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(t){return _f(this._delegate,(e=>t(new Yf(this,e))))}batch(){return sd(this._delegate),new Xf(new ff(this._delegate,(t=>Ef(this._delegate,t))))}loadBundle(t){throw new Of(Rf,'"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?')}namedQuery(t){throw new Of(Rf,'"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?')}}class Wf extends hf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Gf(new fd(t))}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return Zf.forKey(e,this.firestore,null)}}class Yf{constructor(t,e){this._firestore=t,this._delegate=e,this._userDataWriter=new Wf(t)}get(t){const e=um(t);return this._delegate.get(e).then((t=>new rm(this._firestore,new Qd(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,e.converter))))}set(t,e,n){const r=um(t);return n?(Bf("Transaction.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=um(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=um(t);return this._delegate.delete(e),this}}class Xf{constructor(t){this._delegate=t}set(t,e,n){const r=um(t);return n?(Bf("WriteBatch.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=um(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=um(t);return this._delegate.delete(e),this}commit(){return this._delegate.commit()}}class Jf{constructor(t,e,n){this._firestore=t,this._userDataWriter=e,this._delegate=n}fromFirestore(t,e){const n=new zd(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,null);return this._delegate.fromFirestore(new sm(this._firestore,n),null!=e?e:{})}toFirestore(t,e){return e?this._delegate.toFirestore(t,e):this._delegate.toFirestore(t)}static getInstance(t,e){const n=Jf.INSTANCES;let r=n.get(t);r||(r=new WeakMap,n.set(t,r));let s=r.get(e);return s||(s=new Jf(t,new Wf(t),e),r.set(e,s)),s}}Jf.INSTANCES=new WeakMap;class Zf{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new Wf(t)}static forPath(t,e,n){if(t.length%2!=0)throw new Of(kf,`Invalid document reference. Document references must have an even number of segments, but ${t.canonicalString()} has ${t.length}`);return new Zf(e,new zl(e._delegate,n,new qf(t)))}static forKey(t,e,n){return new Zf(e,new zl(e._delegate,n,t))}get id(){return this._delegate.id}get parent(){return new cm(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(t){try{return new cm(this.firestore,Yl(this._delegate,t))}catch(t){throw tm(t,"collection()","DocumentReference.collection()")}}isEqual(t){return(t=f(t))instanceof zl&&Jl(this._delegate,t)}set(t,e){e=Bf("DocumentReference.set",e);try{return function(t,e,n){t=$l(t,zl);const r=$l(t.firestore,rd),s=lf(t.converter,e,n);return Ef(r,[Td(Id(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,ki.none())])}(this._delegate,t,e)}catch(t){throw tm(t,"setDoc()","DocumentReference.set()")}}update(t,e,...n){try{return 1===arguments.length?wf(this._delegate,t):wf(this._delegate,t,e,...n)}catch(t){throw tm(t,"updateDoc()","DocumentReference.update()")}}delete(){return function(t){return Ef($l(t.firestore,rd),[new ji(t._key,ki.none())])}(this._delegate)}onSnapshot(...t){const e=em(t),n=nm(t,(t=>new rm(this.firestore,new Qd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))));return vf(this._delegate,e,n)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?pf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=$l(t,zl);const e=$l(t.firestore,rd);return Al(sd(e),t._key,{source:"server"}).then((n=>If(e,t,n)))}(this._delegate):function(t){t=$l(t,zl);const e=$l(t.firestore,rd);return Al(sd(e),t._key).then((n=>If(e,t,n)))}(this._delegate),e.then((t=>new rm(this.firestore,new Qd(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))))}withConverter(t){return new Zf(this.firestore,t?this._delegate.withConverter(Jf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function tm(t,e,n){return t.message=t.message.replace(e,n),t}function em(t){for(const e of t)if("object"==typeof e&&!Qf(e))return e;return{}}function nm(t,e){var n,r;let s;return s=Qf(t[0])?t[0]:Qf(t[1])?t[1]:"function"==typeof t[0]?{next:t[0],error:t[1],complete:t[2]}:{next:t[1],error:t[2],complete:t[3]},{next:t=>{s.next&&s.next(e(t))},error:null===(n=s.error)||void 0===n?void 0:n.bind(s),complete:null===(r=s.complete)||void 0===r?void 0:r.bind(s)}}class rm{constructor(t,e){this._firestore=t,this._delegate=e}get ref(){return new Zf(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(t){return this._delegate.data(t)}get(t,e){return this._delegate.get(t,e)}isEqual(t){return Yd(this._delegate,t._delegate)}}class sm extends rm{data(t){return this._delegate.data(t)}}class im{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new Wf(t)}where(t,e,n){try{return new im(this.firestore,Zd(this._delegate,function(t,e,n){const r=e,s=jd("where",t);return new tf(s,r,n)}(t,e,n)))}catch(t){throw tm(t,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(t,e){try{return new im(this.firestore,Zd(this._delegate,function(t,e="asc"){const n=e,r=jd("orderBy",t);return new ef(r,n)}(t,e)))}catch(t){throw tm(t,/(orderBy|where)\(\)/,"Query.$1()")}}limit(t){try{return new im(this.firestore,Zd(this._delegate,function(t){return Kl("limit",t),new nf("limit",t,"F")}(t)))}catch(t){throw tm(t,"limit()","Query.limit()")}}limitToLast(t){try{return new im(this.firestore,Zd(this._delegate,function(t){return Kl("limitToLast",t),new nf("limitToLast",t,"L")}(t)))}catch(t){throw tm(t,"limitToLast()","Query.limitToLast()")}}startAt(...t){try{return new im(this.firestore,Zd(this._delegate,function(...t){return new rf("startAt",t,!0)}(...t)))}catch(t){throw tm(t,"startAt()","Query.startAt()")}}startAfter(...t){try{return new im(this.firestore,Zd(this._delegate,function(...t){return new rf("startAfter",t,!1)}(...t)))}catch(t){throw tm(t,"startAfter()","Query.startAfter()")}}endBefore(...t){try{return new im(this.firestore,Zd(this._delegate,function(...t){return new sf("endBefore",t,!0)}(...t)))}catch(t){throw tm(t,"endBefore()","Query.endBefore()")}}endAt(...t){try{return new im(this.firestore,Zd(this._delegate,function(...t){return new sf("endAt",t,!1)}(...t)))}catch(t){throw tm(t,"endAt()","Query.endAt()")}}isEqual(t){return Zl(this._delegate,t._delegate)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?yf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=$l(t,Hl);const e=$l(t.firestore,rd),n=sd(e),r=new gf(e);return Nl(n,t._query,{source:"server"}).then((n=>new Hd(e,r,t,n)))}(this._delegate):function(t){t=$l(t,Hl);const e=$l(t.firestore,rd),n=sd(e),r=new gf(e);return Xd(t._query),Nl(n,t._query).then((n=>new Hd(e,r,t,n)))}(this._delegate),e.then((t=>new am(this.firestore,new Hd(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))))}onSnapshot(...t){const e=em(t),n=nm(t,(t=>new am(this.firestore,new Hd(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))));return vf(this._delegate,e,n)}withConverter(t){return new im(this.firestore,t?this._delegate.withConverter(Jf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}class om{constructor(t,e){this._firestore=t,this._delegate=e}get type(){return this._delegate.type}get doc(){return new sm(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class am{constructor(t,e){this._firestore=t,this._delegate=e}get query(){return new im(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map((t=>new sm(this._firestore,t)))}docChanges(t){return this._delegate.docChanges(t).map((t=>new om(this._firestore,t)))}forEach(t,e){this._delegate.forEach((n=>{t.call(e,new sm(this._firestore,n))}))}isEqual(t){return Yd(this._delegate,t._delegate)}}class cm extends im{constructor(t,e){super(t,e),this.firestore=t,this._delegate=e}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const t=this._delegate.parent;return t?new Zf(this.firestore,t):null}doc(t){try{return new Zf(this.firestore,void 0===t?Xl(this._delegate):Xl(this._delegate,t))}catch(t){throw tm(t,"doc()","CollectionReference.doc()")}}add(t){return function(t,e){const n=$l(t.firestore,rd),r=Xl(t),s=lf(t.converter,e);return Ef(n,[Td(Id(t.firestore),"addDoc",r._key,s,null!==t.converter,{}).toMutation(r._key,ki.exists(!1))]).then((()=>r))}(this._delegate,t).then((t=>new Zf(this.firestore,t)))}isEqual(t){return Jl(this._delegate,t._delegate)}withConverter(t){return new cm(this.firestore,t?this._delegate.withConverter(Jf.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function um(t){return $f(t,zl)}
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
     */function hm(t){return function(t,e){const n=sd(t=$l(t,rd)),r=new nd;return Dl(n,t._databaseId,e,r),r}(this._delegate,t)}function lm(t){return hd(this._delegate,t).then((t=>t?new im(this,t):null))}
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
class dm{constructor(...t){this._delegate=new dd(...t)}static documentId(){return new dm(Uf.keyField().canonicalString())}isEqual(t){return(t=f(t))instanceof dd&&this._delegate._internalPath.isEqual(t._internalPath)}}
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
     */class fm{constructor(t){this._delegate=t}static serverTimestamp(){const t=new Ad("serverTimestamp");return t._methodName="FieldValue.serverTimestamp",new fm(t)}static delete(){const t=new _d("deleteField");return t._methodName="FieldValue.delete",new fm(t)}static arrayUnion(...t){const e=function(...t){return new Nd("arrayUnion",t)}(...t);return e._methodName="FieldValue.arrayUnion",new fm(e)}static arrayRemove(...t){const e=function(...t){return new Dd("arrayRemove",t)}(...t);return e._methodName="FieldValue.arrayRemove",new fm(e)}static increment(t){const e=function(t){return new xd("increment",t)}(t);return e._methodName="FieldValue.increment",new fm(e)}isEqual(t){return this._delegate.isEqual(t._delegate)}}
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
     */const mm={Firestore:Hf,GeoPoint:gd,Timestamp:zr,Blob:Gf,Transaction:Yf,WriteBatch:Xf,DocumentReference:Zf,DocumentSnapshot:rm,Query:im,QueryDocumentSnapshot:sm,QuerySnapshot:am,CollectionReference:cm,FieldPath:dm,FieldValue:fm,setLogLevel:function(t){var e;e=t,Df.setLogLevel(e)},CACHE_SIZE_UNLIMITED:-1};
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
var gm;(function(t){Nf=t})((gm=r.default).SDK_VERSION),function(t,e){t.INTERNAL.registerComponent(new p("firestore-compat",(t=>{const n=t.getProvider("app-compat").getImmediate(),r=t.getProvider("firestore-exp").getImmediate();return e(n,r)}),"PUBLIC").setServiceProps(Object.assign({},mm)))}(gm,((t,e)=>new Hf(t,e,new zf))),gm.registerVersion("@firebase/firestore-compat","0.0.900-exp.d92a36260"),function(t){t.prototype.loadBundle=hm,t.prototype.namedQuery=lm}(Hf)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-firestore-compat.js.map
