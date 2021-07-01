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
     */function f(t){return t&&t._delegate?t._delegate:t}var g,m,p=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(m||(m={}));var y={debug:m.DEBUG,verbose:m.VERBOSE,info:m.INFO,warn:m.WARN,error:m.ERROR,silent:m.SILENT},w=m.INFO,v=((g={})[m.DEBUG]="log",g[m.VERBOSE]="log",g[m.INFO]="info",g[m.WARN]="warn",g[m.ERROR]="error",g),b=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var s=(new Date).toISOString(),i=v[e];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[i].apply(console,o(["["+s+"]  "+t.name+":"],n))}},E=function(){function t(t){this.name=t,this._logLevel=w,this._logHandler=b,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in m))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?y[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,m.DEBUG],t)),this._logHandler.apply(this,o([this,m.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,m.VERBOSE],t)),this._logHandler.apply(this,o([this,m.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,m.INFO],t)),this._logHandler.apply(this,o([this,m.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,m.WARN],t)),this._logHandler.apply(this,o([this,m.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,m.ERROR],t)),this._logHandler.apply(this,o([this,m.ERROR],t))},t}(),T=function(t,e){return(T=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function I(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}var _,S="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A=A||{},D=S||self;function N(){}function x(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function C(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var k="closure_uid_"+(1e9*Math.random()>>>0),R=0;function L(t,e,n){return t.call.apply(t.bind,arguments)}function O(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function M(t,e,n){return(M=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?L:O).apply(null,arguments)}function F(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function P(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(t,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return e.prototype[n].apply(t,s)}}function V(){this.s=this.s,this.o=this.o}var U={};V.prototype.s=!1,V.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0)){var t=function(t){return Object.prototype.hasOwnProperty.call(t,k)&&t[k]||(t[k]=++R)}(this);delete U[t]}},V.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};var q=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(var n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},B=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var r=t.length,s="string"==typeof t?t.split(""):t,i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function j(t){return Array.prototype.concat.apply([],arguments)}function $(t){var e=t.length;if(0<e){for(var n=Array(e),r=0;r<e;r++)n[r]=t[r];return n}return[]}function K(t){return/^[\s\xa0]*$/.test(t)}var G,Q=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function z(t,e){return-1!=t.indexOf(e)}function H(t,e){return t<e?-1:t>e?1:0}t:{var W=D.navigator;if(W){var Y=W.userAgent;if(Y){G=Y;break t}}G=""}function X(t,e,n){for(var r in t)e.call(n,t[r],r,t)}function J(t){var e={};for(var n in t)e[n]=t[n];return e}var Z="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function tt(t,e){for(var n,r,s=1;s<arguments.length;s++){for(n in r=arguments[s])t[n]=r[n];for(var i=0;i<Z.length;i++)n=Z[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function et(t){return et[" "](t),t}et[" "]=N;var nt,rt,st=z(G,"Opera"),it=z(G,"Trident")||z(G,"MSIE"),ot=z(G,"Edge"),at=ot||it,ct=z(G,"Gecko")&&!(z(G.toLowerCase(),"webkit")&&!z(G,"Edge"))&&!(z(G,"Trident")||z(G,"MSIE"))&&!z(G,"Edge"),ut=z(G.toLowerCase(),"webkit")&&!z(G,"Edge");function ht(){var t=D.document;return t?t.documentMode:void 0}t:{var lt="",dt=(rt=G,ct?/rv:([^\);]+)(\)|;)/.exec(rt):ot?/Edge\/([\d\.]+)/.exec(rt):it?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(rt):ut?/WebKit\/(\S+)/.exec(rt):st?/(?:Version)[ \/]?(\S+)/.exec(rt):void 0);if(dt&&(lt=dt?dt[1]:""),it){var ft=ht();if(null!=ft&&ft>parseFloat(lt)){nt=String(ft);break t}}nt=lt}var gt,mt={};function pt(){return function(t){var e=mt;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}((function(){for(var t=0,e=Q(String(nt)).split("."),n=Q("9").split("."),r=Math.max(e.length,n.length),s=0;0==t&&s<r;s++){var i=e[s]||"",o=n[s]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],0==i[0].length&&0==o[0].length)break;t=H(0==i[1].length?0:parseInt(i[1],10),0==o[1].length?0:parseInt(o[1],10))||H(0==i[2].length,0==o[2].length)||H(i[2],o[2]),i=i[3],o=o[3]}while(0==t)}return 0<=t}))}if(D.document&&it){var yt=ht();gt=yt||(parseInt(nt,10)||void 0)}else gt=void 0;var wt=gt,vt=function(){if(!D.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{D.addEventListener("test",N,e),D.removeEventListener("test",N,e)}catch(t){}return t}();function bt(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}function Et(t,e){if(bt.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(ct){t:{try{et(e.nodeName);var s=!0;break t}catch(t){}s=!1}s||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Tt[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Et.Z.h.call(this)}}bt.prototype.h=function(){this.defaultPrevented=!0},P(Et,bt);var Tt={2:"touch",3:"pen",4:"mouse"};Et.prototype.h=function(){Et.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var It="closure_listenable_"+(1e6*Math.random()|0),_t=0;function St(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ia=s,this.key=++_t,this.ca=this.fa=!1}function At(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function Dt(t){this.src=t,this.g={},this.h=0}function Nt(t,e){var n=e.type;if(n in t.g){var r,s=t.g[n],i=q(s,e);(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(At(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function xt(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.ca&&i.listener==e&&i.capture==!!n&&i.ia==r)return s}return-1}Dt.prototype.add=function(t,e,n,r,s){var i=t.toString();(t=this.g[i])||(t=this.g[i]=[],this.h++);var o=xt(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):((e=new St(e,this.src,i,!!r,s)).fa=n,t.push(e)),e};var Ct="closure_lm_"+(1e6*Math.random()|0),kt={};function Rt(t,e,n,r,s){if(r&&r.once)return Ot(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)Rt(t,e[i],n,r,s);return null}return n=Bt(n),t&&t[It]?t.N(e,n,C(r)?!!r.capture:!!r,s):Lt(t,e,n,!1,r,s)}function Lt(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=C(s)?!!s.capture:!!s,a=Ut(t);if(a||(t[Ct]=a=new Dt(t)),(n=a.add(e,n,r,o,i)).proxy)return n;if(r=function(){function t(n){return e.call(t.src,t.listener,n)}var e=Vt;return t}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)vt||(s=o),void 0===s&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Pt(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Ot(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)Ot(t,e[i],n,r,s);return null}return n=Bt(n),t&&t[It]?t.O(e,n,C(r)?!!r.capture:!!r,s):Lt(t,e,n,!0,r,s)}function Mt(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)Mt(t,e[i],n,r,s);else r=C(r)?!!r.capture:!!r,n=Bt(n),t&&t[It]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=xt(i=t.g[e],n,r,s))&&(At(i[n]),Array.prototype.splice.call(i,n,1),0==i.length&&(delete t.g[e],t.h--)))):t&&(t=Ut(t))&&(e=t.g[e.toString()],t=-1,e&&(t=xt(e,n,r,s)),(n=-1<t?e[t]:null)&&Ft(n))}function Ft(t){if("number"!=typeof t&&t&&!t.ca){var e=t.src;if(e&&e[It])Nt(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Pt(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Ut(e))?(Nt(n,t),0==n.h&&(n.src=null,e[Ct]=null)):At(t)}}}function Pt(t){return t in kt?kt[t]:kt[t]="on"+t}function Vt(t,e){if(t.ca)t=!0;else{e=new Et(e,this);var n=t.listener,r=t.ia||t.src;t.fa&&Ft(t),t=n.call(r,e)}return t}function Ut(t){return(t=t[Ct])instanceof Dt?t:null}var qt="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bt(t){return"function"==typeof t?t:(t[qt]||(t[qt]=function(e){return t.handleEvent(e)}),t[qt])}function jt(){V.call(this),this.i=new Dt(this),this.P=this,this.I=null}function $t(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,"string"==typeof e)e=new bt(e,t);else if(e instanceof bt)e.target=e.target||t;else{var s=e;tt(e=new bt(r,t),s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=Kt(o,r,!0,e)&&s}if(s=Kt(o=e.g=t,r,!0,e)&&s,s=Kt(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)s=Kt(o=e.g=n[i],r,!1,e)&&s}function Kt(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&Nt(t.i,o),s=!1!==a.call(c,r)&&s}}return s&&!r.defaultPrevented}P(jt,V),jt.prototype[It]=!0,jt.prototype.removeEventListener=function(t,e,n,r){Mt(this,t,e,n,r)},jt.prototype.M=function(){if(jt.Z.M.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)At(n[r]);delete e.g[t],e.h--}}this.I=null},jt.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},jt.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};var Gt=D.JSON.stringify;function Qt(){var t=te,e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var zt,Ht=function(){function t(){this.h=this.g=null}return t.prototype.add=function(t,e){var n=Wt.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n},t}(),Wt=new(function(){function t(t,e){this.i=t,this.j=e,this.h=0,this.g=null}return t.prototype.get=function(){var t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t},t}())((function(){return new Yt}),(function(t){return t.reset()})),Yt=function(){function t(){this.next=this.g=this.h=null}return t.prototype.set=function(t,e){this.h=t,this.g=e,this.next=null},t.prototype.reset=function(){this.next=this.g=this.h=null},t}();function Xt(t){D.setTimeout((function(){throw t}),0)}function Jt(t,e){zt||function(){var t=D.Promise.resolve(void 0);zt=function(){t.then(ee)}}(),Zt||(zt(),Zt=!0),te.add(t,e)}var Zt=!1,te=new Ht;function ee(){for(var t;t=Qt();){try{t.h.call(t.g)}catch(t){Xt(t)}var e=Wt;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Zt=!1}function ne(t,e){jt.call(this),this.h=t||1,this.g=e||D,this.j=M(this.kb,this),this.l=Date.now()}function re(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}function se(t,e,n){if("function"==typeof t)n&&(t=M(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=M(t.handleEvent,t)}return 2147483647<Number(e)?-1:D.setTimeout(t,e||0)}function ie(t){t.g=se((function(){t.g=null,t.i&&(t.i=!1,ie(t))}),t.j);var e=t.h;t.h=null,t.m.apply(null,e)}P(ne,jt),(_=ne.prototype).da=!1,_.S=null,_.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),$t(this,"tick"),this.da&&(re(this),this.start()))}},_.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},_.M=function(){ne.Z.M.call(this),re(this),delete this.g};var oe=function(t){function e(e,n){var r=t.call(this)||this;return r.m=e,r.j=n,r.h=null,r.i=!1,r.g=null,r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}T(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.l=function(t){this.h=arguments,this.g?this.i=!0:ie(this)},e.prototype.M=function(){t.prototype.M.call(this),this.g&&(D.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)},e}(V);function ae(t){V.call(this),this.h=t,this.g={}}P(ae,V);var ce=[];function ue(t,e,n,r){Array.isArray(n)||(n&&(ce[0]=n.toString()),n=ce);for(var s=0;s<n.length;s++){var i=Rt(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function he(t){X(t.g,(function(t,e){this.g.hasOwnProperty(e)&&Ft(t)}),t),t.g={}}function le(){this.g=!0}function de(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(var o=1;o<s.length;o++)s[o]=""}}}return Gt(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}ae.prototype.M=function(){ae.Z.M.call(this),he(this)},ae.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},le.prototype.Aa=function(){this.g=!1},le.prototype.info=function(){};var fe={},ge=null;function me(){return ge=ge||new jt}function pe(t){bt.call(this,fe.Ma,t)}function ye(t){var e=me();$t(e,new pe(e,t))}function we(t,e){bt.call(this,fe.STAT_EVENT,t),this.stat=e}function ve(t){var e=me();$t(e,new we(e,t))}function be(t,e){bt.call(this,fe.Na,t),this.size=e}function Ee(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return D.setTimeout((function(){t()}),e)}fe.Ma="serverreachability",P(pe,bt),fe.STAT_EVENT="statevent",P(we,bt),fe.Na="timingevent",P(be,bt);var Te={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Ie={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function _e(){}function Se(t){return t.h||(t.h=t.i())}function Ae(){}_e.prototype.h=null;var De,Ne={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function xe(){bt.call(this,"d")}function Ce(){bt.call(this,"c")}function ke(){}function Re(t,e,n,r){this.l=t,this.j=e,this.m=n,this.X=r||1,this.V=new ae(this),this.P=Oe,t=at?125:void 0,this.W=new ne(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Le}function Le(){this.i=null,this.g="",this.h=!1}P(xe,bt),P(Ce,bt),P(ke,_e),ke.prototype.g=function(){return new XMLHttpRequest},ke.prototype.i=function(){return{}},De=new ke;var Oe=45e3,Me={},Fe={};function Pe(t,e,n){t.K=1,t.v=an(tn(e)),t.s=n,t.U=!0,Ve(t,null)}function Ve(t,e){t.F=Date.now(),je(t),t.A=tn(t.v);var n=t.A,r=t.X;Array.isArray(r)||(r=[String(r)]),bn(n.h,"t",r),t.C=0,n=t.l.H,t.h=new Le,t.g=Er(t.l,n?e:null,!t.s),0<t.O&&(t.L=new oe(M(t.Ia,t,t.g),t.O)),ue(t.V,t.g,"readystatechange",t.gb),e=t.H?J(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),ye(1),function(t,e,n,r,s,i){t.info((function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+"\n"+n+"\n"+o}))}(t.j,t.u,t.A,t.m,t.X,t.s)}function Ue(t){return!!t.g&&("GET"==t.u&&2!=t.K&&t.l.Ba)}function qe(t,e,n){for(var r,s=!0;!t.I&&t.C<n.length;){if((r=Be(t,n))==Fe){4==e&&(t.o=4,ve(14),s=!1),de(t.j,t.m,null,"[Incomplete Response]");break}if(r==Me){t.o=4,ve(15),de(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}de(t.j,t.m,r,null),ze(t,r)}Ue(t)&&r!=Fe&&r!=Me&&(t.h.g="",t.C=0),4!=e||0!=n.length||t.h.h||(t.o=1,ve(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.aa&&(t.aa=!0,(e=t.l).g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),fr(e),e.L=!0,ve(11))):(de(t.j,t.m,n,"[Invalid Chunked Response]"),Qe(t),Ge(t))}function Be(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Fe:(n=Number(e.substring(n,r)),isNaN(n)?Me:(r+=1)+n>e.length?Fe:(e=e.substr(r,n),t.C=r+n,e))}function je(t){t.Y=Date.now()+t.P,$e(t,t.P)}function $e(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=Ee(M(t.eb,t),e)}function Ke(t){t.B&&(D.clearTimeout(t.B),t.B=null)}function Ge(t){0==t.l.G||t.I||pr(t.l,t)}function Qe(t){Ke(t);var e=t.L;e&&"function"==typeof e.na&&e.na(),t.L=null,re(t.W),he(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function ze(t,e){try{var n=t.l;if(0!=n.G&&(n.g==t||Dn(n.i,t)))if(n.I=t.N,!t.J&&Dn(n.i,t)&&3==n.G){try{var r=n.Ca.g.parse(e)}catch(i){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){t:if(!n.u){if(n.g){if(!(n.g.F+3e3<t.F))break t;mr(n),sr(n)}dr(n),ve(18)}}else n.ta=s[1],0<n.ta-n.U&&37500>s[2]&&n.N&&0==n.A&&!n.v&&(n.v=Ee(M(n.ab,n),6e3));if(1>=An(n.i)&&n.ka){try{n.ka()}catch(i){}n.ka=void 0}}else wr(n,11)}else if((t.J||n.g==t)&&mr(n),!K(e))for(s=n.Ca.g.parse(e),e=0;e<s.length;e++){var i=s[e];if(n.U=i[0],i=i[1],2==n.G)if("c"==i[0]){n.J=i[1],n.la=i[2];var o=i[3];null!=o&&(n.ma=o,n.h.info("VER="+n.ma));var a=i[4];null!=a&&(n.za=a,n.h.info("SVER="+n.za));var c=i[5];null!=c&&"number"==typeof c&&0<c&&(r=1.5*c,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;var u=t.g;if(u){var h=u.g?u.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(h){var l=r.i;!l.g&&(z(h,"spdy")||z(h,"quic")||z(h,"h2"))&&(l.j=l.l,l.g=new Set,l.h&&(Nn(l,l.h),l.h=null))}if(r.D){var d=u.g?u.g.getResponseHeader("X-HTTP-Session-Id"):null;d&&(r.sa=d,on(r.F,r.D,d))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms"));var f=t;if((r=n).oa=br(r,r.H?r.la:null,r.W),f.J){xn(r.i,f);var g=f,m=r.K;m&&g.setTimeout(m),g.B&&(Ke(g),je(g)),r.g=f}else lr(r);0<n.l.length&&ar(n)}else"stop"!=i[0]&&"close"!=i[0]||wr(n,7);else 3==n.G&&("stop"==i[0]||"close"==i[0]?"stop"==i[0]?wr(n,7):rr(n):"noop"!=i[0]&&n.j&&n.j.wa(i),n.A=0)}ye(4)}catch(i){}}function He(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(x(t)||"string"==typeof t)B(t,e,void 0);else{if(t.T&&"function"==typeof t.T)var n=t.T();else if(t.R&&"function"==typeof t.R)n=void 0;else if(x(t)||"string"==typeof t){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;s=(r=function(t){if(t.R&&"function"==typeof t.R)return t.R();if("string"==typeof t)return t.split("");if(x(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t)).length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function We(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof We)for(n=t.T(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}function Ye(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var r=t.g[e];Xe(t.h,r)&&(t.g[n++]=r),e++}t.g.length=n}if(t.i!=t.g.length){var s={};for(n=e=0;e<t.g.length;)Xe(s,r=t.g[e])||(t.g[n++]=r,s[r]=1),e++;t.g.length=n}}function Xe(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(_=Re.prototype).setTimeout=function(t){this.P=t},_.gb=function(t){t=t.target;var e=this.L;e&&3==Jn(t)?e.l():this.Ia(t)},_.Ia=function(t){try{if(t==this.g)t:{var e=Jn(this.g),n=this.g.Da(),r=this.g.ba();if(!(3>e)&&(3!=e||at||this.g&&(this.h.h||this.g.ga()||Zn(this.g)))){this.I||4!=e||7==n||ye(8==n||0>=r?3:2),Ke(this);var s=this.g.ba();this.N=s;e:if(Ue(this)){var i=Zn(this.g);t="";var o=i.length,a=4==Jn(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){Qe(this),Ge(this);var c="";break e}this.h.i=new D.TextDecoder}for(n=0;n<o;n++)this.h.h=!0,t+=this.h.i.decode(i[n],{stream:a&&n==o-1});i.splice(0,o),this.h.g+=t,this.C=0,c=this.h.g}else c=this.g.ga();if(this.i=200==s,function(t,e,n,r,s,i,o){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+"\n"+n+"\n"+i+" "+o}))}(this.j,this.u,this.A,this.m,this.X,e,s),this.i){if(this.$&&!this.J){e:{if(this.g){var u,h=this.g;if((u=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(u)){var l=u;break e}}l=null}if(!(s=l)){this.i=!1,this.o=3,ve(12),Qe(this),Ge(this);break t}de(this.j,this.m,s,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,ze(this,s)}this.U?(qe(this,e,c),at&&this.i&&3==e&&(ue(this.V,this.W,"tick",this.fb),this.W.start())):(de(this.j,this.m,c,null),ze(this,c)),4==e&&Qe(this),this.i&&!this.I&&(4==e?pr(this.l,this):(this.i=!1,je(this)))}else 400==s&&0<c.indexOf("Unknown SID")?(this.o=3,ve(12)):(this.o=0,ve(13)),Qe(this),Ge(this)}}}catch(e){}},_.fb=function(){if(this.g){var t=Jn(this.g),e=this.g.ga();this.C<e.length&&(Ke(this),qe(this,t,e),this.i&&4!=t&&je(this))}},_.cancel=function(){this.I=!0,Qe(this)},_.eb=function(){this.B=null;var t=Date.now();0<=t-this.Y?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.j,this.A),2!=this.K&&(ye(3),ve(17)),Qe(this),this.o=2,Ge(this)):$e(this,this.Y-t)},(_=We.prototype).R=function(){Ye(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t},_.T=function(){return Ye(this),this.g.concat()},_.get=function(t,e){return Xe(this.h,t)?this.h[t]:e},_.set=function(t,e){Xe(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e},_.forEach=function(t,e){for(var n=this.T(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};var Je=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Ze(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof Ze){this.g=void 0!==e?e:t.g,en(this,t.j),this.s=t.s,nn(this,t.i),rn(this,t.m),this.l=t.l,e=t.h;var n=new pn;n.i=e.i,e.g&&(n.g=new We(e.g),n.h=e.h),sn(this,n),this.o=t.o}else t&&(n=String(t).match(Je))?(this.g=!!e,en(this,n[1]||"",!0),this.s=cn(n[2]||""),nn(this,n[3]||"",!0),rn(this,n[4]),this.l=cn(n[5]||"",!0),sn(this,n[6]||"",!0),this.o=cn(n[7]||"")):(this.g=!!e,this.h=new pn(null,this.g))}function tn(t){return new Ze(t)}function en(t,e,n){t.j=n?cn(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function nn(t,e,n){t.i=n?cn(e,!0):e}function rn(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function sn(t,e,n){e instanceof pn?(t.h=e,function(t,e){e&&!t.j&&(yn(t),t.i=null,t.g.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(wn(this,e),bn(this,n,t))}),t)),t.j=e}(t.h,t.g)):(n||(e=un(e,gn)),t.h=new pn(e,t.g))}function on(t,e,n){t.h.set(e,n)}function an(t){return on(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function cn(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function un(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,hn),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function hn(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}Ze.prototype.toString=function(){var t=[],e=this.j;e&&t.push(un(e,ln,!0),":");var n=this.i;return(n||"file"==e)&&(t.push("//"),(e=this.s)&&t.push(un(e,ln,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&t.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&t.push("/"),t.push(un(n,"/"==n.charAt(0)?fn:dn,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",un(n,mn)),t.join("")};var ln=/[#\/\?@]/g,dn=/[#\?:]/g,fn=/[#\?]/g,gn=/[#\?@]/g,mn=/#/g;function pn(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function yn(t){t.g||(t.g=new We,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}(t.i,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function wn(t,e){yn(t),e=En(t,e),Xe(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,Xe((t=t.g).h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Ye(t)))}function vn(t,e){return yn(t),e=En(t,e),Xe(t.g.h,e)}function bn(t,e,n){wn(t,e),0<n.length&&(t.i=null,t.g.set(En(t,e),$(n)),t.h+=n.length)}function En(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}(_=pn.prototype).add=function(t,e){yn(this),this.i=null,t=En(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},_.forEach=function(t,e){yn(this),this.g.forEach((function(n,r){B(n,(function(n){t.call(e,n,r,this)}),this)}),this)},_.T=function(){yn(this);for(var t=this.g.R(),e=this.g.T(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n},_.R=function(t){yn(this);var e=[];if("string"==typeof t)vn(this,t)&&(e=j(e,this.g.get(En(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=j(e,t[n])}return e},_.set=function(t,e){return yn(this),this.i=null,vn(this,t=En(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},_.get=function(t,e){return t&&0<(t=this.R(t)).length?String(t[0]):e},_.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.R(r);for(var i=0;i<r.length;i++){var o=s;""!==r[i]&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.i=t.join("&")};var Tn=function(t,e){this.h=t,this.g=e};function In(t){this.l=t||_n,D.PerformanceNavigationTiming?t=0<(t=D.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(D.g&&D.g.Ea&&D.g.Ea()&&D.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var _n=10;function Sn(t){return!!t.h||!!t.g&&t.g.size>=t.j}function An(t){return t.h?1:t.g?t.g.size:0}function Dn(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Nn(t,e){t.g?t.g.add(e):t.h=e}function xn(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function Cn(t){var e,n;if(null!=t.h)return t.i.concat(t.h.D);if(null!=t.g&&0!==t.g.size){var r=t.i;try{for(var s=I(t.g.values()),i=s.next();!i.done;i=s.next()){var o=i.value;r=r.concat(o.D)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return r}return $(t.i)}function kn(){}function Rn(){this.g=new kn}function Ln(t,e,n){var r=n||"";try{He(t,(function(t,n){var s=t;C(t)&&(s=Gt(t)),e.push(r+n+"="+encodeURIComponent(s))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function On(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch(t){}}function Mn(t){this.l=t.$b||null,this.j=t.ib||!1}function Fn(t,e){jt.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Pn,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}In.prototype.cancel=function(){var t,e;if(this.i=Cn(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){try{for(var n=I(this.g.values()),r=n.next();!r.done;r=n.next()){r.value.cancel()}}catch(e){t={error:e}}finally{try{r&&!r.done&&(e=n.return)&&e.call(n)}finally{if(t)throw t.error}}this.g.clear()}},kn.prototype.stringify=function(t){return D.JSON.stringify(t,void 0)},kn.prototype.parse=function(t){return D.JSON.parse(t,void 0)},P(Mn,_e),Mn.prototype.g=function(){return new Fn(this.l,this.j)},Mn.prototype.i=function(t){return function(){return t}}({}),P(Fn,jt);var Pn=0;function Vn(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}function Un(t){t.readyState=4,t.l=null,t.j=null,t.A=null,qn(t)}function qn(t){t.onreadystatechange&&t.onreadystatechange.call(t)}(_=Fn.prototype).open=function(t,e){if(this.readyState!=Pn)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,qn(this)},_.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;var e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||D).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))},_.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Un(this)),this.readyState=Pn},_.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,qn(this)),this.g&&(this.readyState=3,qn(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(void 0!==D.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Vn(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))},_.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Un(this):qn(this),3==this.readyState&&Vn(this)}},_.Ua=function(t){this.g&&(this.response=this.responseText=t,Un(this))},_.Ta=function(t){this.g&&(this.response=t,Un(this))},_.ha=function(){this.g&&Un(this)},_.setRequestHeader=function(t,e){this.v.append(t,e)},_.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},_.getAllResponseHeaders=function(){if(!this.h)return"";for(var t=[],e=this.h.entries(),n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty(Fn.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}});var Bn=D.JSON.parse;function jn(t){jt.call(this),this.headers=new We,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=$n,this.K=this.L=!1}P(jn,jt);var $n="",Kn=/^https?$/i,Gn=["POST","PUT"];function Qn(t){return"content-type"==t.toLowerCase()}function zn(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Hn(t),Yn(t)}function Hn(t){t.D||(t.D=!0,$t(t,"complete"),$t(t,"error"))}function Wn(t){if(t.h&&void 0!==A&&(!t.C[1]||4!=Jn(t)||2!=t.ba()))if(t.v&&4==Jn(t))se(t.Fa,0,t);else if($t(t,"readystatechange"),4==Jn(t)){t.h=!1;try{var e,n=t.ba();t:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var r=!0;break t;default:r=!1}if(!(e=r)){var s;if(s=0===n){var i=String(t.H).match(Je)[1]||null;if(!i&&D.self&&D.self.location){var o=D.self.location.protocol;i=o.substr(0,o.length-1)}s=!Kn.test(i?i.toLowerCase():"")}e=s}if(e)$t(t,"complete"),$t(t,"success");else{t.m=6;try{var a=2<Jn(t)?t.g.statusText:""}catch(t){a=""}t.j=a+" ["+t.ba()+"]",Hn(t)}}finally{Yn(t)}}}function Yn(t,e){if(t.g){Xn(t);var n=t.g,r=t.C[0]?N:null;t.g=null,t.C=null,e||$t(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function Xn(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(D.clearTimeout(t.A),t.A=null)}function Jn(t){return t.g?t.g.readyState:0}function Zn(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case $n:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(t){return null}}function tr(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=function(t){var e="";return X(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):on(t,e,n))}function er(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function nr(t){this.za=0,this.l=[],this.h=new le,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=er("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=er("baseRetryDelayMs",5e3,t),this.$a=er("retryDelaySeedMs",1e4,t),this.Ya=er("forwardChannelMaxRetries",2,t),this.ra=er("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new In(t&&t.concurrentRequestLimit),this.Ca=new Rn,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||!1!==t.Xb}function rr(t){if(ir(t),3==t.G){var e=t.V++,n=tn(t.F);on(n,"SID",t.J),on(n,"RID",e),on(n,"TYPE","terminate"),ur(t,n),(e=new Re(t,t.h,e,void 0)).K=2,e.v=an(tn(n)),n=!1,D.navigator&&D.navigator.sendBeacon&&(n=D.navigator.sendBeacon(e.v.toString(),"")),!n&&D.Image&&((new Image).src=e.v,n=!0),n||(e.g=Er(e.l,null),e.g.ea(e.v)),e.F=Date.now(),je(e)}vr(t)}function sr(t){t.g&&(fr(t),t.g.cancel(),t.g=null)}function ir(t){sr(t),t.u&&(D.clearTimeout(t.u),t.u=null),mr(t),t.i.cancel(),t.m&&("number"==typeof t.m&&D.clearTimeout(t.m),t.m=null)}function or(t,e){t.l.push(new Tn(t.Za++,e)),3==t.G&&ar(t)}function ar(t){Sn(t.i)||t.m||(t.m=!0,Jt(t.Ha,t),t.C=0)}function cr(t,e){var n;n=e?e.m:t.V++;var r=tn(t.F);on(r,"SID",t.J),on(r,"RID",n),on(r,"AID",t.U),ur(t,r),t.o&&t.s&&tr(r,t.o,t.s),n=new Re(t,t.h,n,t.C+1),null===t.o&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=hr(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Nn(t.i,n),Pe(n,r,e)}function ur(t,e){t.j&&He({},(function(t,n){on(e,n,t)}))}function hr(t,e,n){n=Math.min(t.l.length,n);var r=t.j?M(t.j.Oa,t.j,t):null;t:for(var s=t.l,i=-1;;){var o=["count="+n];-1==i?0<n?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);for(var a=!0,c=0;c<n;c++){var u=s[c].h,h=s[c].g;if(0>(u-=i))i=Math.max(0,s[c].h-100),a=!1;else try{Ln(h,o,"req"+u+"_")}catch(t){r&&r(h)}}if(a){r=o.join("&");break t}}return t=t.l.splice(0,n),e.D=t,r}function lr(t){t.g||t.u||(t.Y=1,Jt(t.Ga,t),t.A=0)}function dr(t){return!(t.g||t.u||3<=t.A)&&(t.Y++,t.u=Ee(M(t.Ga,t),yr(t,t.A)),t.A++,!0)}function fr(t){null!=t.B&&(D.clearTimeout(t.B),t.B=null)}function gr(t){t.g=new Re(t,t.h,"rpc",t.Y),null===t.o&&(t.g.H=t.s),t.g.O=0;var e=tn(t.oa);on(e,"RID","rpc"),on(e,"SID",t.J),on(e,"CI",t.N?"0":"1"),on(e,"AID",t.U),ur(t,e),on(e,"TYPE","xmlhttp"),t.o&&t.s&&tr(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=an(tn(e)),n.s=null,n.U=!0,Ve(n,t)}function mr(t){null!=t.v&&(D.clearTimeout(t.v),t.v=null)}function pr(t,e){var n=null;if(t.g==e){mr(t),fr(t),t.g=null;var r=2}else{if(!Dn(t.i,e))return;n=e.D,xn(t.i,e),r=1}if(t.I=e.N,0!=t.G)if(e.i)if(1==r){n=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;$t(r=me(),new be(r,n,e,s)),ar(t)}else lr(t);else if(3==(s=e.o)||0==s&&0<t.I||!(1==r&&function(t,e){return!(An(t.i)>=t.i.j-(t.m?1:0)||(t.m?(t.l=e.D.concat(t.l),0):1==t.G||2==t.G||t.C>=(t.Xa?0:t.Ya)||(t.m=Ee(M(t.Ha,t,e),yr(t,t.C)),t.C++,0)))}(t,e)||2==r&&dr(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),s){case 1:wr(t,5);break;case 4:wr(t,10);break;case 3:wr(t,6);break;default:wr(t,2)}}function yr(t,e){var n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function wr(t,e){if(t.h.info("Error code "+e),2==e){var n=null;t.j&&(n=null);var r=M(t.jb,t);n||(n=new Ze("//www.google.com/images/cleardot.gif"),D.location&&"http"==D.location.protocol||en(n,"https"),an(n)),function(t,e){var n=new le;if(D.Image){var r=new Image;r.onload=F(On,n,r,"TestLoadImage: loaded",!0,e),r.onerror=F(On,n,r,"TestLoadImage: error",!1,e),r.onabort=F(On,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=F(On,n,r,"TestLoadImage: timeout",!1,e),D.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else ve(2);t.G=0,t.j&&t.j.va(e),vr(t),ir(t)}function vr(t){t.G=0,t.I=-1,t.j&&(0==Cn(t.i).length&&0==t.l.length||(t.i.i.length=0,$(t.l),t.l.length=0),t.j.ua())}function br(t,e,n){var r=function(t){return t instanceof Ze?tn(t):new Ze(t,void 0)}(n);if(""!=r.i)e&&nn(r,e+"."+r.i),rn(r,r.m);else{var s=D.location;r=function(t,e,n,r){var s=new Ze(null,void 0);return t&&en(s,t),e&&nn(s,e),n&&rn(s,n),r&&(s.l=r),s}(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.aa&&X(t.aa,(function(t,e){on(r,e,t)})),e=t.D,n=t.sa,e&&n&&on(r,e,n),on(r,"VER",t.ma),ur(t,r),r}function Er(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return(e=n&&t.Ba&&!t.qa?new jn(new Mn({ib:!0})):new jn(t.qa)).L=t.H,e}function Tr(){}function Ir(){if(it&&!(10<=Number(wt)))throw Error("Environmental error: no available transport.")}function _r(t,e){jt.call(this),this.g=new nr(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!K(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!K(e)&&(this.g.D=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Dr(this)}function Sr(t){xe.call(this);var e=t.__sm__;if(e){t:{for(var n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Ar(){Ce.call(this),this.status=1}function Dr(t){this.g=t}(_=jn.prototype).ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():De.g(),this.C=this.u?Se(this.u):Se(De),this.g.onreadystatechange=M(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(t){return void zn(this,t)}t=n||"";var s=new We(this.headers);r&&He(r,(function(t,e){s.set(e,t)})),r=function(t){t:{for(var e=Qn,n=t.length,r="string"==typeof t?t.split(""):t,s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break t}e=-1}return 0>e?null:"string"==typeof t?t.charAt(e):t[e]}(s.T()),n=D.FormData&&t instanceof D.FormData,!(0<=q(Gn,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach((function(t,e){this.g.setRequestHeader(e,t)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Xn(this),0<this.B&&((this.K=function(t){return it&&pt()&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=M(this.pa,this)):this.A=se(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(t){zn(this,t)}},_.pa=function(){void 0!==A&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,$t(this,"timeout"),this.abort(8))},_.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,$t(this,"complete"),$t(this,"abort"),Yn(this))},_.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Yn(this,!0)),jn.Z.M.call(this)},_.Fa=function(){this.s||(this.F||this.v||this.l?Wn(this):this.cb())},_.cb=function(){Wn(this)},_.ba=function(){try{return 2<Jn(this)?this.g.status:-1}catch(t){return-1}},_.ga=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},_.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Bn(e)}},_.Da=function(){return this.m},_.La=function(){return"string"==typeof this.j?this.j:String(this.j)},(_=nr.prototype).ma=8,_.G=1,_.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch(t){}},_.Ha=function(t){if(this.m)if(this.m=null,1==this.G){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;var e=new Re(this,this.h,t,void 0),n=this.s;if(this.P&&(n?tt(n=J(n),this.P):n=this.P),null===this.o&&(e.H=n),this.ja)t:{for(var r=0,s=0;s<this.l.length;s++){var i=this.l[s];if(void 0===(i="__data__"in i.g&&"string"==typeof(i=i.g.__data__)?i.length:void 0))break;if(4096<(r+=i)){r=s;break t}if(4096===r||s===this.l.length-1){r=s+1;break t}}r=1e3}else r=1e3;r=hr(this,e,r),on(s=tn(this.F),"RID",t),on(s,"CVER",22),this.D&&on(s,"X-HTTP-Session-Id",this.D),ur(this,s),this.o&&n&&tr(s,this.o,n),Nn(this.i,e),this.Ra&&on(s,"TYPE","init"),this.ja?(on(s,"$req",r),on(s,"SID","null"),e.$=!0,Pe(e,s,null)):Pe(e,s,r),this.G=2}}else 3==this.G&&(t?cr(this,t):0==this.l.length||Sn(this.i)||cr(this))},_.Ga=function(){if(this.u=null,gr(this),this.$&&!(this.L||null==this.g||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=Ee(M(this.bb,this),t)}},_.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,ve(10),sr(this),gr(this))},_.ab=function(){null!=this.v&&(this.v=null,sr(this),dr(this),ve(19))},_.jb=function(t){t?(this.h.info("Successfully pinged google.com"),ve(2)):(this.h.info("Failed to ping google.com"),ve(1))},(_=Tr.prototype).xa=function(){},_.wa=function(){},_.va=function(){},_.ua=function(){},_.Oa=function(){},Ir.prototype.g=function(t,e){return new _r(t,e)},P(_r,jt),_r.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),Jt(M(t.hb,t,e))),ve(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=br(t,null,t.W),ar(t)},_r.prototype.close=function(){rr(this.g)},_r.prototype.u=function(t){if("string"==typeof t){var e={};e.__data__=t,or(this.g,e)}else this.v?((e={}).__data__=Gt(t),or(this.g,e)):or(this.g,t)},_r.prototype.M=function(){this.g.j=null,delete this.j,rr(this.g),delete this.g,_r.Z.M.call(this)},P(Sr,xe),P(Ar,Ce),P(Dr,Tr),Dr.prototype.xa=function(){$t(this.g,"a")},Dr.prototype.wa=function(t){$t(this.g,new Sr(t))},Dr.prototype.va=function(t){$t(this.g,new Ar(t))},Dr.prototype.ua=function(){$t(this.g,"b")},Ir.prototype.createWebChannel=Ir.prototype.g,_r.prototype.send=_r.prototype.u,_r.prototype.open=_r.prototype.m,_r.prototype.close=_r.prototype.close,Te.NO_ERROR=0,Te.TIMEOUT=8,Te.HTTP_ERROR=6,Ie.COMPLETE="complete",Ae.EventType=Ne,Ne.OPEN="a",Ne.CLOSE="b",Ne.ERROR="c",Ne.MESSAGE="d",jt.prototype.listen=jt.prototype.N,jn.prototype.listenOnce=jn.prototype.O,jn.prototype.getLastError=jn.prototype.La,jn.prototype.getLastErrorCode=jn.prototype.Da,jn.prototype.getStatus=jn.prototype.ba,jn.prototype.getResponseJson=jn.prototype.Qa,jn.prototype.getResponseText=jn.prototype.ga,jn.prototype.send=jn.prototype.ea;var Nr=Te,xr=Ie,Cr=fe,kr=10,Rr=11,Lr=Mn,Or=Ae,Mr=jn;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
let Fr="8.6.8";
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
     */class Pr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.t(t),this.i=t=>e.writeSequenceNumber(t))}t(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.i&&this.i(t),t}}Pr.o=-1;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */const qr=new E("@firebase/firestore");function Br(){return qr.logLevel}function jr(t,...e){if(qr.logLevel<=m.DEBUG){const n=e.map(Gr);qr.debug(`Firestore (${Fr}): ${t}`,...n)}}function $r(t,...e){if(qr.logLevel<=m.ERROR){const n=e.map(Gr);qr.error(`Firestore (${Fr}): ${t}`,...n)}}function Kr(t,...e){if(qr.logLevel<=m.WARN){const n=e.map(Gr);qr.warn(`Firestore (${Fr}): ${t}`,...n)}}function Gr(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}var e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Qr(t="Unexpected state"){const e=`FIRESTORE (${Fr}) INTERNAL ASSERTION FAILED: `+t;throw $r(e),new Error(e)}function zr(t,e){t||Qr()}function Hr(t,e){return t}
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
     */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Xr(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}hs.EMPTY_BYTE_STRING=new hs("");const ls=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ds(t){if(zr(!!t),"string"==typeof t){let e=0;const n=ls.exec(t);if(zr(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fs(t.seconds),nanos:fs(t.nanos)}}function fs(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function gs(t){return"string"==typeof t?hs.fromBase64String(t):hs.fromUint8Array(t)}
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
     */function ms(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function ps(t){const e=t.mapValue.fields.__previous_value__;return ms(e)?ps(e):e}function ys(t){const e=ds(t.mapValue.fields.__local_write_time__.timestampValue);return new ts(e.seconds,e.nanos)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */function Ts(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ms(t)?4:10:Qr()}function Is(t,e){const n=Ts(t);if(n!==Ts(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ys(t).isEqual(ys(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=ds(t.timestampValue),r=ds(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return gs(t.bytesValue).isEqual(gs(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return fs(t.geoPointValue.latitude)===fs(e.geoPointValue.latitude)&&fs(t.geoPointValue.longitude)===fs(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return fs(t.integerValue)===fs(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=fs(t.doubleValue),r=fs(e.doubleValue);return n===r?vs(n)===vs(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Jr(t.arrayValue.values||[],e.arrayValue.values||[],Is);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(ns(n)!==ns(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!Is(n[t],r[t])))return!1;return!0}(t,e);default:return Qr()}}function _s(t,e){return void 0!==(t.values||[]).find((t=>Is(t,e)))}function Ss(t,e){const n=Ts(t),r=Ts(e);if(n!==r)return Xr(n,r);switch(n){case 0:return 0;case 1:return Xr(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=fs(t.integerValue||t.doubleValue),r=fs(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return As(t.timestampValue,e.timestampValue);case 4:return As(ys(t),ys(e));case 5:return Xr(t.stringValue,e.stringValue);case 6:return function(t,e){const n=gs(t),r=gs(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=Xr(n[t],r[t]);if(0!==e)return e}return Xr(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Xr(fs(t.latitude),fs(e.latitude));return 0!==n?n:Xr(fs(t.longitude),fs(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=Ss(n[t],r[t]);if(e)return e}return Xr(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){const n=t.fields||{},r=Object.keys(n),s=e.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let t=0;t<r.length&&t<i.length;++t){const e=Xr(r[t],i[t]);if(0!==e)return e;const o=Ss(n[r[t]],s[i[t]]);if(0!==o)return o}return Xr(r.length,i.length)}(t.mapValue,e.mapValue);default:throw Qr()}}function As(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Xr(t,e);const n=ds(t),r=ds(e),s=Xr(n.seconds,r.seconds);return 0!==s?s:Xr(n.nanos,r.nanos)}function Ds(t){return Ns(t)}function Ns(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=ds(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?gs(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Es.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Ns(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const s of e)r?r=!1:n+=",",n+=`${s}:${Ns(t.fields[s])}`;return n+"}"}(t.mapValue):Qr();var e,n}function xs(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Cs(t){return!!t&&"integerValue"in t}function ks(t){return!!t&&"arrayValue"in t}function Rs(t){return!!t&&"nullValue"in t}function Ls(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Os(t){return!!t&&"mapValue"in t}function Ms(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue)return{timestampValue:Object.assign({},ds(t.timestampValue))};if(t.mapValue){const e={mapValue:{fields:{}}};return rs(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Ms(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ms(t.arrayValue.values[n]);return e}return Object.assign({},t)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Fs{constructor(t){this.value=t}static empty(){return new Fs({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Os(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ms(e)}setAll(t){let e=cs.emptyPath(),n={},r=[];t.forEach(((t,s)=>{if(!e.isImmediateParentOf(s)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=s.popLast()}t?n[s.lastSegment()]=Ms(t):r.push(s.lastSegment())}));const s=this.getFieldsMap(e);this.applyChanges(s,n,r)}delete(t){const e=this.field(t.popLast());Os(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Is(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Os(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){rs(e,((e,n)=>t[e]=n));for(const e of n)delete t[e]}clone(){return new Fs(Ms(this.value))}}function Ps(t){const e=[];return rs(t.fields,((t,n)=>{const r=new cs([t]);if(Os(n)){const t=Ps(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new us(e)
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class Vs{constructor(t,e,n,r,s){this.key=t,this.documentType=e,this.version=n,this.data=r,this.documentState=s}static newInvalidDocument(t){return new Vs(t,0,es.min(),Fs.empty(),0)}static newFoundDocument(t,e,n){return new Vs(t,1,e,n,0)}static newNoDocument(t,e){return new Vs(t,2,e,Fs.empty(),0)}static newUnknownDocument(t,e){return new Vs(t,3,e,Fs.empty(),2)}convertToFoundDocument(t,e){return this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Fs.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Fs.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof Vs&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}clone(){return new Vs(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
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
     */class Us{constructor(t,e=null,n=[],r=[],s=null,i=null,o=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.h=null}}function qs(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Us(t,e,n,r,s,i,o)}function Bs(t){const e=Hr(t);if(null===e.h){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>function(t){return t.field.canonicalString()+t.op.toString()+Ds(t.value)}(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),ws(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=ti(e.startAt)),e.endAt&&(t+="|ub:",t+=ti(e.endAt)),e.h=t}return e.h}function js(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!ni(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!Is(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!si(t.startAt,e.startAt)&&si(t.endAt,e.endAt)}function $s(t){return Es.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}class Ks extends class{}{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.l(t,e,n):new Gs(t,e,n):"array-contains"===e?new Ws(t,n):"in"===e?new Ys(t,n):"not-in"===e?new Xs(t,n):"array-contains-any"===e?new Js(t,n):new Ks(t,e,n)}static l(t,e,n){return"in"===e?new Qs(t,n):new zs(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.m(Ss(e,this.value)):null!==e&&Ts(this.value)===Ts(e)&&this.m(Ss(e,this.value))}m(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return Qr()}}g(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class Gs extends Ks{constructor(t,e,n){super(t,e,n),this.key=Es.fromName(n.referenceValue)}matches(t){const e=Es.comparator(t.key,this.key);return this.m(e)}}class Qs extends Ks{constructor(t,e){super(t,"in",e),this.keys=Hs("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class zs extends Ks{constructor(t,e){super(t,"not-in",e),this.keys=Hs("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Hs(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>Es.fromName(t.referenceValue)))}class Ws extends Ks{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return ks(e)&&_s(e.arrayValue,this.value)}}class Ys extends Ks{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&_s(this.value.arrayValue,e)}}class Xs extends Ks{constructor(t,e){super(t,"not-in",e)}matches(t){if(_s(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!_s(this.value.arrayValue,e)}}class Js extends Ks{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!ks(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>_s(this.value.arrayValue,t)))}}class Zs{constructor(t,e){this.position=t,this.before=e}}function ti(t){return`${t.before?"b":"a"}:${t.position.map((t=>Ds(t))).join(",")}`}class ei{constructor(t,e="asc"){this.field=t,this.dir=e}}function ni(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function ri(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(r=i.field.isKeyField()?Es.comparator(Es.fromName(o.referenceValue),n.key):Ss(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return t.before?r<=0:r<0}function si(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Is(t.position[n],e.position[n]))return!1;return!0}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ii{constructor(t,e=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.p=null,this.T=null,this.startAt,this.endAt}}function oi(t,e,n,r,s,i,o,a){return new ii(t,e,n,r,s,i,o,a)}function ai(t){return new ii(t)}function ci(t){return!ws(t.limit)&&"F"===t.limitType}function ui(t){return!ws(t.limit)&&"L"===t.limitType}function hi(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function li(t){for(const e of t.filters)if(e.g())return e.field;return null}function di(t){return null!==t.collectionGroup}function fi(t){const e=Hr(t);if(null===e.p){e.p=[];const t=li(e),n=hi(e);if(null!==t&&null===n)t.isKeyField()||e.p.push(new ei(t)),e.p.push(new ei(cs.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.p.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.p.push(new ei(cs.keyField(),t))}}}return e.p}function gi(t){const e=Hr(t);if(!e.T)if("F"===e.limitType)e.T=qs(e.path,e.collectionGroup,fi(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of fi(e)){const e="desc"===n.dir?"asc":"desc";t.push(new ei(n.field,e))}const n=e.endAt?new Zs(e.endAt.position,!e.endAt.before):null,r=e.startAt?new Zs(e.startAt.position,!e.startAt.before):null;e.T=qs(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e.T}function mi(t,e,n){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function pi(t,e){return js(gi(t),gi(e))&&t.limitType===e.limitType}function yi(t){return`${Bs(gi(t))}|lt:${t.limitType}`}function wi(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>{return`${(e=t).field.canonicalString()} ${e.op} ${Ds(e.value)}`;var e})).join(", ")}]`),ws(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: "+ti(t.startAt)),t.endAt&&(e+=", endAt: "+ti(t.endAt)),`Target(${e})`}(gi(t))}; limitType=${t.limitType})`}function vi(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Es.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of t.explicitOrderBy)if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!ri(t.startAt,fi(t),e))&&(!t.endAt||!ri(t.endAt,fi(t),e))}(t,e)}function bi(t){return(e,n)=>{let r=!1;for(const s of fi(t)){const t=Ei(s,e,n);if(0!==t)return t;r=r||s.field.isKeyField()}return 0}}function Ei(t,e,n){const r=t.field.isKeyField()?Es.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),s=n.data.field(t);return null!==r&&null!==s?Ss(r,s):Qr()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Qr()}}
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
     */class Si{constructor(){this._=void 0}}function Ai(t,e,n){return t instanceof xi?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Ci?ki(t,e):t instanceof Ri?Li(t,e):function(t,e){const n=Ni(t,e),r=Mi(n)+Mi(t.A);return Cs(n)&&Cs(t.A)?Ii(r):Ti(t.R,r)}(t,e)}function Di(t,e,n){return t instanceof Ci?ki(t,e):t instanceof Ri?Li(t,e):n}function Ni(t,e){return t instanceof Oi?Cs(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class xi extends Si{}class Ci extends Si{constructor(t){super(),this.elements=t}}function ki(t,e){const n=Fi(e);for(const e of t.elements)n.some((t=>Is(t,e)))||n.push(e);return{arrayValue:{values:n}}}class Ri extends Si{constructor(t){super(),this.elements=t}}function Li(t,e){let n=Fi(e);for(const e of t.elements)n=n.filter((t=>!Is(t,e)));return{arrayValue:{values:n}}}class Oi extends Si{constructor(t,e){super(),this.R=t,this.A=e}}function Mi(t){return fs(t.integerValue||t.doubleValue)}function Fi(t){return ks(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Pi{constructor(t,e){this.field=t,this.transform=e}}class Vi{constructor(t,e){this.version=t,this.transformResults=e}}class Ui{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Ui}static exists(t){return new Ui(void 0,t)}static updateTime(t){return new Ui(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function qi(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class Bi{}function ji(t,e,n){t instanceof zi?function(t,e,n){const r=t.value.clone(),s=Yi(t.fieldTransforms,e,n.transformResults);r.setAll(s),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof Hi?function(t,e,n){if(!qi(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=Yi(t.fieldTransforms,e,n.transformResults),s=e.data;s.setAll(Wi(t)),s.setAll(r),e.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(t,e,n):function(t,e,n){e.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,n)}function $i(t,e,n){t instanceof zi?function(t,e,n){if(!qi(t.precondition,e))return;const r=t.value.clone(),s=Xi(t.fieldTransforms,n,e);r.setAll(s),e.convertToFoundDocument(Qi(e),r).setHasLocalMutations()}(t,e,n):t instanceof Hi?function(t,e,n){if(!qi(t.precondition,e))return;const r=Xi(t.fieldTransforms,n,e),s=e.data;s.setAll(Wi(t)),s.setAll(r),e.convertToFoundDocument(Qi(e),s).setHasLocalMutations()}(t,e,n):function(t,e){qi(t.precondition,e)&&e.convertToNoDocument(es.min())}(t,e)}function Ki(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),s=Ni(r.transform,t||null);null!=s&&(null==n&&(n=Fs.empty()),n.set(r.field,s))}return n||null}function Gi(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&Jr(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Ci&&e instanceof Ci||t instanceof Ri&&e instanceof Ri?Jr(t.elements,e.elements,Is):t instanceof Oi&&e instanceof Oi?Is(t.A,e.A):t instanceof xi&&e instanceof xi}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function Qi(t){return t.isFoundDocument()?t.version:es.min()}class zi extends Bi{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Hi extends Bi{constructor(t,e,n,r,s=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}}function Wi(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function Yi(t,e,n){const r=new Map;zr(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,Di(o,a,n[s]))}return r}function Xi(t,e,n){const r=new Map;for(const s of t){const t=s.transform,i=n.data.field(s.field);r.set(s.field,Ai(t,i,e))}return r}class Ji extends Bi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}}class Zi extends Bi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */var eo,no;function ro(t){switch(t){case Vr.OK:return Qr();case Vr.CANCELLED:case Vr.UNKNOWN:case Vr.DEADLINE_EXCEEDED:case Vr.RESOURCE_EXHAUSTED:case Vr.INTERNAL:case Vr.UNAVAILABLE:case Vr.UNAUTHENTICATED:return!1;case Vr.INVALID_ARGUMENT:case Vr.NOT_FOUND:case Vr.ALREADY_EXISTS:case Vr.PERMISSION_DENIED:case Vr.FAILED_PRECONDITION:case Vr.ABORTED:case Vr.OUT_OF_RANGE:case Vr.UNIMPLEMENTED:case Vr.DATA_LOSS:return!0;default:return Qr()}}function so(t){if(void 0===t)return $r("GRPC error has no .code"),Vr.UNKNOWN;switch(t){case eo.OK:return Vr.OK;case eo.CANCELLED:return Vr.CANCELLED;case eo.UNKNOWN:return Vr.UNKNOWN;case eo.DEADLINE_EXCEEDED:return Vr.DEADLINE_EXCEEDED;case eo.RESOURCE_EXHAUSTED:return Vr.RESOURCE_EXHAUSTED;case eo.INTERNAL:return Vr.INTERNAL;case eo.UNAVAILABLE:return Vr.UNAVAILABLE;case eo.UNAUTHENTICATED:return Vr.UNAUTHENTICATED;case eo.INVALID_ARGUMENT:return Vr.INVALID_ARGUMENT;case eo.NOT_FOUND:return Vr.NOT_FOUND;case eo.ALREADY_EXISTS:return Vr.ALREADY_EXISTS;case eo.PERMISSION_DENIED:return Vr.PERMISSION_DENIED;case eo.FAILED_PRECONDITION:return Vr.FAILED_PRECONDITION;case eo.ABORTED:return Vr.ABORTED;case eo.OUT_OF_RANGE:return Vr.OUT_OF_RANGE;case eo.UNIMPLEMENTED:return Vr.UNIMPLEMENTED;case eo.DATA_LOSS:return Vr.DATA_LOSS;default:return Qr()}}(no=eo||(eo={}))[no.OK=0]="OK",no[no.CANCELLED=1]="CANCELLED",no[no.UNKNOWN=2]="UNKNOWN",no[no.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",no[no.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",no[no.NOT_FOUND=5]="NOT_FOUND",no[no.ALREADY_EXISTS=6]="ALREADY_EXISTS",no[no.PERMISSION_DENIED=7]="PERMISSION_DENIED",no[no.UNAUTHENTICATED=16]="UNAUTHENTICATED",no[no.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",no[no.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",no[no.ABORTED=10]="ABORTED",no[no.OUT_OF_RANGE=11]="OUT_OF_RANGE",no[no.UNIMPLEMENTED=12]="UNIMPLEMENTED",no[no.INTERNAL=13]="INTERNAL",no[no.UNAVAILABLE=14]="UNAVAILABLE",no[no.DATA_LOSS=15]="DATA_LOSS";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */const ho=new io(Es.comparator);function lo(){return ho}const fo=new io(Es.comparator);function go(){return fo}const mo=new io(Es.comparator);function po(){return mo}const yo=new co(Es.comparator);function wo(...t){let e=yo;for(const n of t)e=e.add(n);return e}const vo=new co(Xr);function bo(){return vo}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Io{constructor(t,e,n,r){this.P=t,this.removedTargetIds=e,this.key=n,this.v=r}}class _o{constructor(t,e){this.targetId=t,this.V=e}}class So{constructor(t,e,n=hs.EMPTY_BYTE_STRING,r=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=r}}class Ao{constructor(){this.S=0,this.D=xo(),this.C=hs.EMPTY_BYTE_STRING,this.N=!1,this.k=!0}get current(){return this.N}get resumeToken(){return this.C}get $(){return 0!==this.S}get O(){return this.k}F(t){t.approximateByteSize()>0&&(this.k=!0,this.C=t)}M(){let t=wo(),e=wo(),n=wo();return this.D.forEach(((r,s)=>{switch(s){case 0:t=t.add(r);break;case 2:e=e.add(r);break;case 1:n=n.add(r);break;default:Qr()}})),new To(this.C,this.N,t,e,n)}L(){this.k=!1,this.D=xo()}B(t,e){this.k=!0,this.D=this.D.insert(t,e)}U(t){this.k=!0,this.D=this.D.remove(t)}q(){this.S+=1}K(){this.S-=1}j(){this.k=!0,this.N=!0}}class Do{constructor(t){this.W=t,this.G=new Map,this.H=lo(),this.J=No(),this.Y=new co(Xr)}X(t){for(const e of t.P)t.v&&t.v.isFoundDocument()?this.Z(e,t.v):this.tt(e,t.key,t.v);for(const e of t.removedTargetIds)this.tt(e,t.key,t.v)}et(t){this.forEachTarget(t,(e=>{const n=this.nt(e);switch(t.state){case 0:this.st(e)&&n.F(t.resumeToken);break;case 1:n.K(),n.$||n.L(),n.F(t.resumeToken);break;case 2:n.K(),n.$||this.removeTarget(e);break;case 3:this.st(e)&&(n.j(),n.F(t.resumeToken));break;case 4:this.st(e)&&(this.it(e),n.F(t.resumeToken));break;default:Qr()}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.G.forEach(((t,n)=>{this.st(n)&&e(n)}))}rt(t){const e=t.targetId,n=t.V.count,r=this.ot(e);if(r){const t=r.target;if($s(t))if(0===n){const n=new Es(t.path);this.tt(e,n,Vs.newNoDocument(n,es.min()))}else zr(1===n);else this.ct(e)!==n&&(this.it(e),this.Y=this.Y.add(e))}}ut(t){const e=new Map;this.G.forEach(((n,r)=>{const s=this.ot(r);if(s){if(n.current&&$s(s.target)){const e=new Es(s.target.path);null!==this.H.get(e)||this.at(r,e)||this.tt(r,e,Vs.newNoDocument(e,t))}n.O&&(e.set(r,n.M()),n.L())}}));let n=wo();this.J.forEach(((t,e)=>{let r=!0;e.forEachWhile((t=>{const e=this.ot(t);return!e||2===e.purpose||(r=!1,!1)})),r&&(n=n.add(t))}));const r=new Eo(t,e,this.Y,this.H,n);return this.H=lo(),this.J=No(),this.Y=new co(Xr),r}Z(t,e){if(!this.st(t))return;const n=this.at(t,e.key)?2:0;this.nt(t).B(e.key,n),this.H=this.H.insert(e.key,e),this.J=this.J.insert(e.key,this.ht(e.key).add(t))}tt(t,e,n){if(!this.st(t))return;const r=this.nt(t);this.at(t,e)?r.B(e,1):r.U(e),this.J=this.J.insert(e,this.ht(e).delete(t)),n&&(this.H=this.H.insert(e,n))}removeTarget(t){this.G.delete(t)}ct(t){const e=this.nt(t).M();return this.W.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}q(t){this.nt(t).q()}nt(t){let e=this.G.get(t);return e||(e=new Ao,this.G.set(t,e)),e}ht(t){let e=this.J.get(t);return e||(e=new co(Xr),this.J=this.J.insert(t,e)),e}st(t){const e=null!==this.ot(t);return e||jr("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.G.get(t);return e&&e.$?null:this.W.lt(t)}it(t){this.G.set(t,new Ao),this.W.getRemoteKeysForTarget(t).forEach((e=>{this.tt(t,e,null)}))}at(t,e){return this.W.getRemoteKeysForTarget(t).has(e)}}function No(){return new io(Es.comparator)}function xo(){return new io(Es.comparator)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Co={asc:"ASCENDING",desc:"DESCENDING"},ko={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class Ro{constructor(t,e){this.databaseId=t,this.I=e}}function Lo(t,e){return t.I?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Oo(t,e){return t.I?e.toBase64():e.toUint8Array()}function Mo(t,e){return Lo(t,e.toTimestamp())}function Fo(t){return zr(!!t),es.fromTimestamp(function(t){const e=ds(t);return new ts(e.seconds,e.nanos)}(t))}function Po(t,e){return function(t){return new os(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function Vo(t){const e=os.fromString(t);return zr(ca(e)),e}function Uo(t,e){return Po(t.databaseId,e.path)}function qo(t,e){const n=Vo(e);if(n.get(1)!==t.databaseId.projectId)throw new Ur(Vr.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new Ur(Vr.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Es(Ko(n))}function Bo(t,e){return Po(t.databaseId,e)}function jo(t){const e=Vo(t);return 4===e.length?os.emptyPath():Ko(e)}function $o(t){return new os(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Ko(t){return zr(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Go(t,e,n){return{name:Uo(t,e),fields:n.value.mapValue.fields}}function Qo(t,e,n){const r=qo(t,e.name),s=Fo(e.updateTime),i=new Fs({mapValue:{fields:e.fields}}),o=Vs.newFoundDocument(r,s,i);return n&&o.setHasCommittedMutations(),n?o.setHasCommittedMutations():o}function zo(t,e){let n;if(e instanceof zi)n={update:Go(t,e.key,e.value)};else if(e instanceof Ji)n={delete:Uo(t,e.key)};else if(e instanceof Hi)n={update:Go(t,e.key,e.data),updateMask:aa(e.fieldMask)};else{if(!(e instanceof Zi))return Qr();n={verify:Uo(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof xi)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Ci)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ri)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Oi)return{fieldPath:e.field.canonicalString(),increment:n.A};throw Qr()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:Mo(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:Qr()}(t,e.precondition)),n}function Ho(t,e){const n=e.currentDocument?function(t){return void 0!==t.updateTime?Ui.updateTime(Fo(t.updateTime)):void 0!==t.exists?Ui.exists(t.exists):Ui.none()}(e.currentDocument):Ui.none(),r=e.updateTransforms?e.updateTransforms.map((e=>function(t,e){let n=null;if("setToServerValue"in e)zr("REQUEST_TIME"===e.setToServerValue),n=new xi;else if("appendMissingElements"in e){const t=e.appendMissingElements.values||[];n=new Ci(t)}else if("removeAllFromArray"in e){const t=e.removeAllFromArray.values||[];n=new Ri(t)}else"increment"in e?n=new Oi(t,e.increment):Qr();const r=cs.fromServerFormat(e.fieldPath);return new Pi(r,n)}(t,e))):[];if(e.update){e.update.name;const s=qo(t,e.update.name),i=new Fs({mapValue:{fields:e.update.fields}});if(e.updateMask){const t=function(t){const e=t.fieldPaths||[];return new us(e.map((t=>cs.fromServerFormat(t))))}(e.updateMask);return new Hi(s,i,t,n,r)}return new zi(s,i,n,r)}if(e.delete){const r=qo(t,e.delete);return new Ji(r,n)}if(e.verify){const r=qo(t,e.verify);return new Zi(r,n)}return Qr()}function Wo(t,e){return{documents:[Bo(t,e.path)]}}function Yo(t,e){const n={structuredQuery:{}},r=e.path;null!==e.collectionGroup?(n.parent=Bo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Bo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(t){if(0===t.length)return;const e=t.map((t=>function(t){if("=="===t.op){if(Ls(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NAN"}};if(Rs(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NULL"}}}else if("!="===t.op){if(Ls(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NOT_NAN"}};if(Rs(t.value))return{unaryFilter:{field:ra(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ra(t.field),op:na(t.op),value:t.value}}}(t)));return 1===e.length?e[0]:{compositeFilter:{op:"AND",filters:e}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(t){if(0!==t.length)return t.map((t=>function(t){return{field:ra(t.field),direction:ea(t.dir)}}(t)))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(t,e){return t.I||ws(e)?e:{value:e}}(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=Zo(e.startAt)),e.endAt&&(n.structuredQuery.endAt=Zo(e.endAt)),n}function Xo(t){let e=jo(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){zr(1===r);const t=n.from[0];t.allDescendants?s=t.collectionId:e=e.child(t.collectionId)}let i=[];n.where&&(i=Jo(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((t=>function(t){return new ei(sa(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,ws(e)?null:e}(n.limit));let c=null;n.startAt&&(c=ta(n.startAt));let u=null;return n.endAt&&(u=ta(n.endAt)),oi(e,s,o,i,a,"F",c,u)}function Jo(t){return t?void 0!==t.unaryFilter?[oa(t)]:void 0!==t.fieldFilter?[ia(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map((t=>Jo(t))).reduce(((t,e)=>t.concat(e))):Qr():[]}function Zo(t){return{before:t.before,values:t.position}}function ta(t){const e=!!t.before,n=t.values||[];return new Zs(n,e)}function ea(t){return Co[t]}function na(t){return ko[t]}function ra(t){return{fieldPath:t.canonicalString()}}function sa(t){return cs.fromServerFormat(t.fieldPath)}function ia(t){return Ks.create(sa(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":default:return Qr()}}(t.fieldFilter.op),t.fieldFilter.value)}function oa(t){switch(t.unaryFilter.op){case"IS_NAN":const e=sa(t.unaryFilter.field);return Ks.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=sa(t.unaryFilter.field);return Ks.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=sa(t.unaryFilter.field);return Ks.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=sa(t.unaryFilter.field);return Ks.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":default:return Qr()}}function aa(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function ca(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class fa{constructor(t,e){this.seconds=t,this.nanoseconds=e}}class ga{constructor(t,e,n){this.ownerId=t,this.allowTabSynchronization=e,this.leaseTimestampMs=n}}ga.store="owner",ga.key="owner";class ma{constructor(t,e,n){this.userId=t,this.lastAcknowledgedBatchId=e,this.lastStreamToken=n}}ma.store="mutationQueues",ma.keyPath="userId";class pa{constructor(t,e,n,r,s){this.userId=t,this.batchId=e,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=s}}pa.store="mutations",pa.keyPath="batchId",pa.userMutationsIndex="userMutationsIndex",pa.userMutationsKeyPath=["userId","batchId"];class ya{constructor(){}static prefixForUser(t){return[t]}static prefixForPath(t,e){return[t,ua(e)]}static key(t,e,n){return[t,ua(e),n]}}ya.store="documentMutations",ya.PLACEHOLDER=new ya;class wa{constructor(t,e){this.path=t,this.readTime=e}}class va{constructor(t,e){this.path=t,this.version=e}}class ba{constructor(t,e,n,r,s,i){this.unknownDocument=t,this.noDocument=e,this.document=n,this.hasCommittedMutations=r,this.readTime=s,this.parentPath=i}}ba.store="remoteDocuments",ba.readTimeIndex="readTimeIndex",ba.readTimeIndexPath="readTime",ba.collectionReadTimeIndex="collectionReadTimeIndex",ba.collectionReadTimeIndexPath=["parentPath","readTime"];class Ea{constructor(t){this.byteSize=t}}Ea.store="remoteDocumentGlobal",Ea.key="remoteDocumentGlobalKey";class Ta{constructor(t,e,n,r,s,i,o){this.targetId=t,this.canonicalId=e,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=s,this.lastLimboFreeSnapshotVersion=i,this.query=o}}Ta.store="targets",Ta.keyPath="targetId",Ta.queryTargetsIndexName="queryTargetsIndex",Ta.queryTargetsKeyPath=["canonicalId","targetId"];class Ia{constructor(t,e,n){this.targetId=t,this.path=e,this.sequenceNumber=n}}Ia.store="targetDocuments",Ia.keyPath=["targetId","path"],Ia.documentTargetsIndex="documentTargetsIndex",Ia.documentTargetsKeyPath=["path","targetId"];class _a{constructor(t,e,n,r){this.highestTargetId=t,this.highestListenSequenceNumber=e,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}_a.key="targetGlobalKey",_a.store="targetGlobal";class Sa{constructor(t,e){this.collectionId=t,this.parent=e}}Sa.store="collectionParents",Sa.keyPath=["collectionId","parent"];class Aa{constructor(t,e,n,r){this.clientId=t,this.updateTimeMs=e,this.networkEnabled=n,this.inForeground=r}}Aa.store="clientMetadata",Aa.keyPath="clientId";class Da{constructor(t,e,n){this.bundleId=t,this.createTime=e,this.version=n}}Da.store="bundles",Da.keyPath="bundleId";class Na{constructor(t,e,n){this.name=t,this.readTime=e,this.bundledQuery=n}}Na.store="namedQueries",Na.keyPath="name";const xa=[ma.store,pa.store,ya.store,ba.store,Ta.store,ga.store,_a.store,Ia.store,Aa.store,Ea.store,Sa.store,Da.store,Na.store],Ca="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ka{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Oa{constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.ft=new Ra,this.transaction.oncomplete=()=>{this.ft.resolve()},this.transaction.onabort=()=>{e.error?this.ft.reject(new Pa(t,e.error)):this.ft.resolve()},this.transaction.onerror=e=>{const n=ja(e.target.error);this.ft.reject(new Pa(t,n))}}static open(t,e,n,r){try{return new Oa(e,t.transaction(r,n))}catch(t){throw new Pa(e,t)}}get dt(){return this.ft.promise}abort(t){t&&this.ft.reject(t),this.aborted||(jr("SimpleDb","Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}store(t){const e=this.transaction.objectStore(t);return new Ua(e)}}class Ma{constructor(t,e,n){this.name=t,this.version=e,this.wt=n,12.2===Ma._t(c())&&$r("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(t){return jr("SimpleDb","Removing database:",t),qa(window.indexedDB.deleteDatabase(t)).toPromise()}static gt(){if("undefined"==typeof indexedDB)return!1;if(Ma.yt())return!0;const t=c(),e=Ma._t(t),n=0<e&&e<10,r=Ma.Et(t),s=0<r&&r<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||s)}static yt(){var t;return"undefined"!=typeof process&&"YES"===(null===(t=process.env)||void 0===t?void 0:t.Tt)}static It(t,e){return t.store(e)}static _t(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}static Et(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}async At(t){return this.db||(jr("SimpleDb","Opening database:",this.name),this.db=await new Promise(((e,n)=>{const r=indexedDB.open(this.name,this.version);r.onsuccess=t=>{const n=t.target.result;e(n)},r.onblocked=()=>{n(new Pa(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},r.onerror=e=>{const r=e.target.error;"VersionError"===r.name?n(new Ur(Vr.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):n(new Pa(t,r))},r.onupgradeneeded=t=>{jr("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',t.oldVersion);const e=t.target.result;this.wt.Rt(e,r.transaction,t.oldVersion,this.version).next((()=>{jr("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.Pt&&(this.db.onversionchange=t=>this.Pt(t)),this.db}bt(t){this.Pt=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,r){const s="readonly"===e;let i=0;for(;;){++i;try{this.db=await this.At(t);const e=Oa.open(this.db,t,s?"readonly":"readwrite",n),i=r(e).catch((t=>(e.abort(t),La.reject(t)))).toPromise();return i.catch((()=>{})),await e.dt,i}catch(t){const e="FirebaseError"!==t.name&&i<3;if(jr("SimpleDb","Transaction failed with error:",t.message,"Retrying:",e),this.close(),!e)return Promise.reject(t)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Fa{constructor(t){this.vt=t,this.Vt=!1,this.St=null}get isDone(){return this.Vt}get Dt(){return this.St}set cursor(t){this.vt=t}done(){this.Vt=!0}Ct(t){this.St=t}delete(){return qa(this.vt.delete())}}class Pa extends Ur{constructor(t,e){super(Vr.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Va(t){return"IndexedDbTransactionError"===t.name}class Ua{constructor(t){this.store=t}put(t,e){let n;return void 0!==e?(jr("SimpleDb","PUT",this.store.name,t,e),n=this.store.put(e,t)):(jr("SimpleDb","PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),qa(n)}add(t){return jr("SimpleDb","ADD",this.store.name,t,t),qa(this.store.add(t))}get(t){return qa(this.store.get(t)).next((e=>(void 0===e&&(e=null),jr("SimpleDb","GET",this.store.name,t,e),e)))}delete(t){return jr("SimpleDb","DELETE",this.store.name,t),qa(this.store.delete(t))}count(){return jr("SimpleDb","COUNT",this.store.name),qa(this.store.count())}Nt(t,e){const n=this.cursor(this.options(t,e)),r=[];return this.xt(n,((t,e)=>{r.push(e)})).next((()=>r))}kt(t,e){jr("SimpleDb","DELETE ALL",this.store.name);const n=this.options(t,e);n.$t=!1;const r=this.cursor(n);return this.xt(r,((t,e,n)=>n.delete()))}Ot(t,e){let n;e?n=t:(n={},e=t);const r=this.cursor(n);return this.xt(r,e)}Ft(t){const e=this.cursor({});return new La(((n,r)=>{e.onerror=t=>{const e=ja(t.target.error);r(e)},e.onsuccess=e=>{const r=e.target.result;r?t(r.primaryKey,r.value).next((t=>{t?r.continue():n()})):n()}}))}xt(t,e){const n=[];return new La(((r,s)=>{t.onerror=t=>{s(t.target.error)},t.onsuccess=t=>{const s=t.target.result;if(!s)return void r();const i=new Fa(s),o=e(s.primaryKey,s.value,i);if(o instanceof La){const t=o.catch((t=>(i.done(),La.reject(t))));n.push(t)}i.isDone?r():null===i.Dt?s.continue():s.continue(i.Dt)}})).next((()=>La.waitFor(n)))}options(t,e){let n;return void 0!==t&&("string"==typeof t?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.$t?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function qa(t){return new La(((e,n)=>{t.onsuccess=t=>{const n=t.target.result;e(n)},t.onerror=t=>{const e=ja(t.target.error);n(e)}}))}let Ba=!1;function ja(t){const e=Ma._t(c());if(e>=12.2&&e<13){const e="An internal error was encountered in the Indexed Database server";if(t.message.indexOf(e)>=0){const t=new Ur("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ba||(Ba=!0,setTimeout((()=>{throw t}),0)),t}}return t}
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
     */class $a extends ka{constructor(t,e){super(),this.Mt=t,this.currentSequenceNumber=e}}function Ka(t,e){const n=Hr(t);return Ma.It(n.Mt,e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ga{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const r=this.mutations[e];r.key.isEqual(t.key)&&ji(r,t,n[e])}}applyToLocalView(t){for(const e of this.baseMutations)e.key.isEqual(t.key)&&$i(e,t,this.localWriteTime);for(const e of this.mutations)e.key.isEqual(t.key)&&$i(e,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach((e=>{const n=t.get(e.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(es.min())}))}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),wo())}isEqual(t){return this.batchId===t.batchId&&Jr(this.mutations,t.mutations,((t,e)=>Gi(t,e)))&&Jr(this.baseMutations,t.baseMutations,((t,e)=>Gi(t,e)))}}class Qa{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){zr(t.mutations.length===n.length);let r=po();const s=t.mutations;for(let t=0;t<s.length;t++)r=r.insert(s[t].key,n[t].version);return new Qa(t,e,n,r)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Ha{constructor(t){this.Lt=t}}function Wa(t,e){if(e.document)return Qo(t.Lt,e.document,!!e.hasCommittedMutations);if(e.noDocument){const t=Es.fromSegments(e.noDocument.path),n=tc(e.noDocument.readTime),r=Vs.newNoDocument(t,n);return e.hasCommittedMutations?r.setHasCommittedMutations():r}if(e.unknownDocument){const t=Es.fromSegments(e.unknownDocument.path),n=tc(e.unknownDocument.version);return Vs.newUnknownDocument(t,n)}return Qr()}function Ya(t,e,n){const r=Xa(n),s=e.key.path.popLast().toArray();if(e.isFoundDocument()){const n=function(t,e){return{name:Uo(t,e.key),fields:e.data.value.mapValue.fields,updateTime:Lo(t,e.version.toTimestamp())}}(t.Lt,e),i=e.hasCommittedMutations;return new ba(null,null,n,i,r,s)}if(e.isNoDocument()){const t=e.key.path.toArray(),n=Za(e.version),i=e.hasCommittedMutations;return new ba(null,new wa(t,n),null,i,r,s)}if(e.isUnknownDocument()){const t=e.key.path.toArray(),n=Za(e.version);return new ba(new va(t,n),null,null,!0,r,s)}return Qr()}function Xa(t){const e=t.toTimestamp();return[e.seconds,e.nanoseconds]}function Ja(t){const e=new ts(t[0],t[1]);return es.fromTimestamp(e)}function Za(t){const e=t.toTimestamp();return new fa(e.seconds,e.nanoseconds)}function tc(t){const e=new ts(t.seconds,t.nanoseconds);return es.fromTimestamp(e)}function ec(t,e){const n=(e.baseMutations||[]).map((e=>Ho(t.Lt,e)));for(let t=0;t<e.mutations.length-1;++t){const n=e.mutations[t];if(t+1<e.mutations.length&&void 0!==e.mutations[t+1].transform){const r=e.mutations[t+1];n.updateTransforms=r.transform.fieldTransforms,e.mutations.splice(t+1,1),++t}}const r=e.mutations.map((e=>Ho(t.Lt,e))),s=ts.fromMillis(e.localWriteTimeMs);return new Ga(e.batchId,s,n,r)}function nc(t){const e=tc(t.readTime),n=void 0!==t.lastLimboFreeSnapshotVersion?tc(t.lastLimboFreeSnapshotVersion):es.min();let r;var s;return void 0!==t.query.documents?(zr(1===(s=t.query).documents.length),r=gi(ai(jo(s.documents[0])))):r=function(t){return gi(Xo(t))}(t.query),new za(r,t.targetId,0,t.lastListenSequenceNumber,e,n,hs.fromBase64String(t.resumeToken))}function rc(t,e){const n=Za(e.snapshotVersion),r=Za(e.lastLimboFreeSnapshotVersion);let s;s=$s(e.target)?Wo(t.Lt,e.target):Yo(t.Lt,e.target);const i=e.resumeToken.toBase64();return new Ta(e.targetId,Bs(e.target),n,i,e.sequenceNumber,r,s)}function sc(t){const e=Xo({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?mi(e,e.limit,"L"):e}
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
     */class ic{getBundleMetadata(t,e){return oc(t).get(e).next((t=>{if(t)return{id:(e=t).bundleId,createTime:tc(e.createTime),version:e.version};var e}))}saveBundleMetadata(t,e){return oc(t).put({bundleId:(n=e).id,createTime:Za(Fo(n.createTime)),version:n.version});var n}getNamedQuery(t,e){return ac(t).get(e).next((t=>{if(t)return{name:(e=t).name,query:sc(e.bundledQuery),readTime:tc(e.readTime)};var e}))}saveNamedQuery(t,e){return ac(t).put(function(t){return{name:t.name,readTime:Za(Fo(t.readTime)),bundledQuery:t.bundledQuery}}(e))}}function oc(t){return Ka(t,Da.store)}function ac(t){return Ka(t,Na.store)}
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
     */class hc{constructor(){this.Ut=new uc}addToCollectionParentIndex(t,e){if(!this.Ut.has(e)){const n=e.lastSegment(),r=e.popLast();t.addOnCommittedListener((()=>{this.Ut.add(e)}));const s={collectionId:n,parent:ua(r)};return lc(t).put(s)}return La.resolve()}getCollectionParents(t,e){const n=[],r=IDBKeyRange.bound([e,""],[Zr(e),""],!1,!0);return lc(t).Nt(r).next((t=>{for(const r of t){if(r.collectionId!==e)break;n.push(da(r.parent))}return n}))}}function lc(t){return Ka(t,Sa.store)}
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
     */function gc(t,e,n){const r=t.store(pa.store),s=t.store(ya.store),i=[],o=IDBKeyRange.only(n.batchId);let a=0;const c=r.Ot({range:o},((t,e,n)=>(a++,n.delete())));i.push(c.next((()=>{zr(1===a)})));const u=[];for(const t of n.mutations){const r=ya.key(e,t.key.path,n.batchId);i.push(s.delete(r)),u.push(t.key)}return La.waitFor(i).next((()=>u))}function mc(t){if(!t)return 0;let e;if(t.document)e=t.document;else if(t.unknownDocument)e=t.unknownDocument;else{if(!t.noDocument)throw Qr();e=t.noDocument}return JSON.stringify(e).length}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */fc.DEFAULT_COLLECTION_PERCENTILE=10,fc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,fc.DEFAULT=new fc(41943040,fc.DEFAULT_COLLECTION_PERCENTILE,fc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),fc.DISABLED=new fc(-1,0,0);class pc{constructor(t,e,n,r){this.userId=t,this.R=e,this.qt=n,this.referenceDelegate=r,this.Kt={}}static Qt(t,e,n,r){zr(""!==t.uid);const s=t.isAuthenticated()?t.uid:"";return new pc(s,e,n,r)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return wc(t).Ot({index:pa.userMutationsIndex,range:n},((t,n,r)=>{e=!1,r.done()})).next((()=>e))}addMutationBatch(t,e,n,r){const s=vc(t),i=wc(t);return i.add({}).next((o=>{zr("number"==typeof o);const a=new Ga(o,e,n,r),c=function(t,e,n){const r=n.baseMutations.map((e=>zo(t.Lt,e))),s=n.mutations.map((e=>zo(t.Lt,e)));return new pa(e,n.batchId,n.localWriteTime.toMillis(),r,s)}(this.R,this.userId,a),u=[];let h=new co(((t,e)=>Xr(t.canonicalString(),e.canonicalString())));for(const t of r){const e=ya.key(this.userId,t.key.path,o);h=h.add(t.key.path.popLast()),u.push(i.put(c)),u.push(s.put(e,ya.PLACEHOLDER))}return h.forEach((e=>{u.push(this.qt.addToCollectionParentIndex(t,e))})),t.addOnCommittedListener((()=>{this.Kt[o]=a.keys()})),La.waitFor(u).next((()=>a))}))}lookupMutationBatch(t,e){return wc(t).get(e).next((t=>t?(zr(t.userId===this.userId),ec(this.R,t)):null))}jt(t,e){return this.Kt[e]?La.resolve(this.Kt[e]):this.lookupMutationBatch(t,e).next((t=>{if(t){const n=t.keys();return this.Kt[e]=n,n}return null}))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return wc(t).Ot({index:pa.userMutationsIndex,range:r},((t,e,r)=>{e.userId===this.userId&&(zr(e.batchId>=n),s=ec(this.R,e)),r.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return wc(t).Ot({index:pa.userMutationsIndex,range:e,reverse:!0},((t,e,r)=>{n=e.batchId,r.done()})).next((()=>n))}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return wc(t).Nt(pa.userMutationsIndex,e).next((t=>t.map((t=>ec(this.R,t)))))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=ya.prefixForPath(this.userId,e.path),r=IDBKeyRange.lowerBound(n),s=[];return vc(t).Ot({range:r},((n,r,i)=>{const[o,a,c]=n,u=da(a);if(o===this.userId&&e.path.isEqual(u))return wc(t).get(c).next((t=>{if(!t)throw Qr();zr(t.userId===this.userId),s.push(ec(this.R,t))}));i.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new co(Xr);const r=[];return e.forEach((e=>{const s=ya.prefixForPath(this.userId,e.path),i=IDBKeyRange.lowerBound(s),o=vc(t).Ot({range:i},((t,r,s)=>{const[i,o,a]=t,c=da(o);i===this.userId&&e.path.isEqual(c)?n=n.add(a):s.done()}));r.push(o)})),La.waitFor(r).next((()=>this.Wt(t,n)))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1,s=ya.prefixForPath(this.userId,n),i=IDBKeyRange.lowerBound(s);let o=new co(Xr);return vc(t).Ot({range:i},((t,e,s)=>{const[i,a,c]=t,u=da(a);i===this.userId&&n.isPrefixOf(u)?u.length===r&&(o=o.add(c)):s.done()})).next((()=>this.Wt(t,o)))}Wt(t,e){const n=[],r=[];return e.forEach((e=>{r.push(wc(t).get(e).next((t=>{if(null===t)throw Qr();zr(t.userId===this.userId),n.push(ec(this.R,t))})))})),La.waitFor(r).next((()=>n))}removeMutationBatch(t,e){return gc(t.Mt,this.userId,e).next((n=>(t.addOnCommittedListener((()=>{this.Gt(e.batchId)})),La.forEach(n,(e=>this.referenceDelegate.markPotentiallyOrphaned(t,e))))))}Gt(t){delete this.Kt[t]}performConsistencyCheck(t){return this.checkEmpty(t).next((e=>{if(!e)return La.resolve();const n=IDBKeyRange.lowerBound(ya.prefixForUser(this.userId)),r=[];return vc(t).Ot({range:n},((t,e,n)=>{if(t[0]===this.userId){const e=da(t[1]);r.push(e)}else n.done()})).next((()=>{zr(0===r.length)}))}))}containsKey(t,e){return yc(t,this.userId,e)}zt(t){return bc(t).get(this.userId).next((t=>t||new ma(this.userId,-1,"")))}}function yc(t,e,n){const r=ya.prefixForPath(e,n.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return vc(t).Ot({range:i,$t:!0},((t,n,r)=>{const[i,a,c]=t;i===e&&a===s&&(o=!0),r.done()})).next((()=>o))}function wc(t){return Ka(t,pa.store)}function vc(t){return Ka(t,ya.store)}function bc(t){return Ka(t,ma.store)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Tc{constructor(t,e){this.referenceDelegate=t,this.R=e}allocateTargetId(t){return this.Xt(t).next((e=>{const n=new Ec(e.highestTargetId);return e.highestTargetId=n.next(),this.Zt(t,e).next((()=>e.highestTargetId))}))}getLastRemoteSnapshotVersion(t){return this.Xt(t).next((t=>es.fromTimestamp(new ts(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(t){return this.Xt(t).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(t,e,n){return this.Xt(t).next((r=>(r.highestListenSequenceNumber=e,n&&(r.lastRemoteSnapshotVersion=n.toTimestamp()),e>r.highestListenSequenceNumber&&(r.highestListenSequenceNumber=e),this.Zt(t,r))))}addTargetData(t,e){return this.te(t,e).next((()=>this.Xt(t).next((n=>(n.targetCount+=1,this.ee(e,n),this.Zt(t,n))))))}updateTargetData(t,e){return this.te(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next((()=>Ic(t).delete(e.targetId))).next((()=>this.Xt(t))).next((e=>(zr(e.targetCount>0),e.targetCount-=1,this.Zt(t,e))))}removeTargets(t,e,n){let r=0;const s=[];return Ic(t).Ot(((i,o)=>{const a=nc(o);a.sequenceNumber<=e&&null===n.get(a.targetId)&&(r++,s.push(this.removeTargetData(t,a)))})).next((()=>La.waitFor(s))).next((()=>r))}forEachTarget(t,e){return Ic(t).Ot(((t,n)=>{const r=nc(n);e(r)}))}Xt(t){return _c(t).get(_a.key).next((t=>(zr(null!==t),t)))}Zt(t,e){return _c(t).put(_a.key,e)}te(t,e){return Ic(t).put(rc(this.R,e))}ee(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.Xt(t).next((t=>t.targetCount))}getTargetData(t,e){const n=Bs(e),r=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Ic(t).Ot({range:r,index:Ta.queryTargetsIndexName},((t,n,r)=>{const i=nc(n);js(e,i.target)&&(s=i,r.done())})).next((()=>s))}addMatchingKeys(t,e,n){const r=[],s=Sc(t);return e.forEach((e=>{const i=ua(e.path);r.push(s.put(new Ia(n,i))),r.push(this.referenceDelegate.addReference(t,n,e))})),La.waitFor(r)}removeMatchingKeys(t,e,n){const r=Sc(t);return La.forEach(e,(e=>{const s=ua(e.path);return La.waitFor([r.delete([n,s]),this.referenceDelegate.removeReference(t,n,e)])}))}removeMatchingKeysForTargetId(t,e){const n=Sc(t),r=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(r)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),r=Sc(t);let s=wo();return r.Ot({range:n,$t:!0},((t,e,n)=>{const r=da(t[1]),i=new Es(r);s=s.add(i)})).next((()=>s))}containsKey(t,e){const n=ua(e.path),r=IDBKeyRange.bound([n],[Zr(n)],!1,!0);let s=0;return Sc(t).Ot({index:Ia.documentTargetsIndex,$t:!0,range:r},(([t,e],n,r)=>{0!==t&&(s++,r.done())})).next((()=>s>0))}lt(t,e){return Ic(t).get(e).next((t=>t?nc(t):null))}}function Ic(t){return Ka(t,Ta.store)}function _c(t){return Ka(t,_a.store)}function Sc(t){return Ka(t,Ia.store)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */async function Ac(t){if(t.code!==Vr.FAILED_PRECONDITION||t.message!==Ca)throw t;jr("LocalStore","Unexpectedly lost primary lease")}
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
     */function Dc([t,e],[n,r]){const s=Xr(t,n);return 0===s?Xr(e,r):s}class Nc{constructor(t){this.ne=t,this.buffer=new co(Dc),this.se=0}ie(){return++this.se}re(t){const e=[t,this.ie()];if(this.buffer.size<this.ne)this.buffer=this.buffer.add(e);else{const t=this.buffer.last();Dc(e,t)<0&&(this.buffer=this.buffer.delete(t).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xc{constructor(t,e){this.garbageCollector=t,this.asyncQueue=e,this.oe=!1,this.ce=null}start(t){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ue(t)}stop(){this.ce&&(this.ce.cancel(),this.ce=null)}get started(){return null!==this.ce}ue(t){const e=this.oe?3e5:6e4;jr("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.ce=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.ce=null,this.oe=!0;try{await t.collectGarbage(this.garbageCollector)}catch(t){Va(t)?jr("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Ac(t)}await this.ue(t)}))}}class Cc{constructor(t,e){this.ae=t,this.params=e}calculateTargetCount(t,e){return this.ae.he(t).next((t=>Math.floor(e/100*t)))}nthSequenceNumber(t,e){if(0===e)return La.resolve(Pr.o);const n=new Nc(e);return this.ae.forEachTarget(t,(t=>n.re(t.sequenceNumber))).next((()=>this.ae.le(t,(t=>n.re(t))))).next((()=>n.maxValue))}removeTargets(t,e,n){return this.ae.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.ae.removeOrphanedDocuments(t,e)}collect(t,e){return-1===this.params.cacheSizeCollectionThreshold?(jr("LruGarbageCollector","Garbage collection skipped; disabled"),La.resolve(dc)):this.getCacheSize(t).next((n=>n<this.params.cacheSizeCollectionThreshold?(jr("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),dc):this.fe(t,e)))}getCacheSize(t){return this.ae.getCacheSize(t)}fe(t,e){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((e=>(e>this.params.maximumSequenceNumbersToCollect?(jr("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`),r=this.params.maximumSequenceNumbersToCollect):r=e,i=Date.now(),this.nthSequenceNumber(t,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(t,n,e)))).next((e=>(s=e,a=Date.now(),this.removeOrphanedDocuments(t,n)))).next((t=>(c=Date.now(),Br()<=m.DEBUG&&jr("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+"ms\n"+`\tRemoved ${s} targets in `+(a-o)+"ms\n"+`\tRemoved ${t} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),La.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:t}))))}}
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
     */class kc{constructor(t,e){this.db=t,this.garbageCollector=function(t,e){return new Cc(t,e)}(this,e)}he(t){const e=this.de(t);return this.db.getTargetCache().getTargetCount(t).next((t=>e.next((e=>t+e))))}de(t){let e=0;return this.le(t,(t=>{e++})).next((()=>e))}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}le(t,e){return this.we(t,((t,n)=>e(n)))}addReference(t,e,n){return Rc(t,n)}removeReference(t,e,n){return Rc(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Rc(t,e)}_e(t,e){return function(t,e){let n=!1;return bc(t).Ft((r=>yc(t,r,e).next((t=>(t&&(n=!0),La.resolve(!t)))))).next((()=>n))}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),r=[];let s=0;return this.we(t,((i,o)=>{if(o<=e){const e=this._e(t,i).next((e=>{if(!e)return s++,n.getEntry(t,i).next((()=>(n.removeEntry(i),Sc(t).delete([0,ua(i.path)]))))}));r.push(e)}})).next((()=>La.waitFor(r))).next((()=>n.apply(t))).next((()=>s))}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Rc(t,e)}we(t,e){const n=Sc(t);let r,s=Pr.o;return n.Ot({index:Ia.documentTargetsIndex},(([t,n],{path:i,sequenceNumber:o})=>{0===t?(s!==Pr.o&&e(new Es(da(r)),s),s=o,r=i):s=Pr.o})).next((()=>{s!==Pr.o&&e(new Es(da(r)),s)}))}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Rc(t,e){return Sc(t).put(function(t,e){return new Ia(0,ua(t.path),e)}(e,t.currentSequenceNumber))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Mc{constructor(t,e){this.R=t,this.qt=e}addEntry(t,e,n){return Vc(t).put(Uc(e),n)}removeEntry(t,e){const n=Vc(t),r=Uc(e);return n.delete(r)}updateMetadata(t,e){return this.getMetadata(t).next((n=>(n.byteSize+=e,this.me(t,n))))}getEntry(t,e){return Vc(t).get(Uc(e)).next((t=>this.ge(e,t)))}ye(t,e){return Vc(t).get(Uc(e)).next((t=>({document:this.ge(e,t),size:mc(t)})))}getEntries(t,e){let n=lo();return this.pe(t,e,((t,e)=>{const r=this.ge(t,e);n=n.insert(t,r)})).next((()=>n))}Ee(t,e){let n=lo(),r=new io(Es.comparator);return this.pe(t,e,((t,e)=>{const s=this.ge(t,e);n=n.insert(t,s),r=r.insert(t,mc(e))})).next((()=>({documents:n,Te:r})))}pe(t,e,n){if(e.isEmpty())return La.resolve();const r=IDBKeyRange.bound(e.first().path.toArray(),e.last().path.toArray()),s=e.getIterator();let i=s.getNext();return Vc(t).Ot({range:r},((t,e,r)=>{const o=Es.fromSegments(t);for(;i&&Es.comparator(i,o)<0;)n(i,null),i=s.getNext();i&&i.isEqual(o)&&(n(i,e),i=s.hasNext()?s.getNext():null),i?r.Ct(i.path.toArray()):r.done()})).next((()=>{for(;i;)n(i,null),i=s.hasNext()?s.getNext():null}))}getDocumentsMatchingQuery(t,e,n){let r=lo();const s=e.path.length+1,i={};if(n.isEqual(es.min())){const t=e.path.toArray();i.range=IDBKeyRange.lowerBound(t)}else{const t=e.path.toArray(),r=Xa(n);i.range=IDBKeyRange.lowerBound([t,r],!0),i.index=ba.collectionReadTimeIndex}return Vc(t).Ot(i,((t,n,i)=>{if(t.length!==s)return;const o=Wa(this.R,n);e.path.isPrefixOf(o.key.path)?vi(e,o)&&(r=r.insert(o.key,o)):i.done()})).next((()=>r))}newChangeBuffer(t){return new Fc(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next((t=>t.byteSize))}getMetadata(t){return Pc(t).get(Ea.key).next((t=>(zr(!!t),t)))}me(t,e){return Pc(t).put(Ea.key,e)}ge(t,e){if(e){const t=Wa(this.R,e);if(!t.isNoDocument()||!t.version.isEqual(es.min()))return t}return Vs.newInvalidDocument(t)}}class Fc extends Oc{constructor(t,e){super(),this.Ie=t,this.trackRemovals=e,this.Ae=new Lc((t=>t.toString()),((t,e)=>t.isEqual(e)))}applyChanges(t){const e=[];let n=0,r=new co(((t,e)=>Xr(t.canonicalString(),e.canonicalString())));return this.changes.forEach(((s,i)=>{const o=this.Ae.get(s);if(i.document.isValidDocument()){const a=Ya(this.Ie.R,i.document,this.getReadTime(s));r=r.add(s.path.popLast());const c=mc(a);n+=c-o,e.push(this.Ie.addEntry(t,s,a))}else if(n-=o,this.trackRemovals){const n=Ya(this.Ie.R,Vs.newNoDocument(s,es.min()),this.getReadTime(s));e.push(this.Ie.addEntry(t,s,n))}else e.push(this.Ie.removeEntry(t,s))})),r.forEach((n=>{e.push(this.Ie.qt.addToCollectionParentIndex(t,n))})),e.push(this.Ie.updateMetadata(t,n)),La.waitFor(e)}getFromCache(t,e){return this.Ie.ye(t,e).next((t=>(this.Ae.set(e,t.size),t.document)))}getAllFromCache(t,e){return this.Ie.Ee(t,e).next((({documents:t,Te:e})=>(e.forEach(((t,e)=>{this.Ae.set(t,e)})),t)))}}function Pc(t){return Ka(t,Ea.store)}function Vc(t){return Ka(t,ba.store)}function Uc(t){return t.path.toArray()}
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
     */class qc{constructor(t){this.R=t}Rt(t,e,n,r){zr(n<r&&n>=0&&r<=11);const s=new Oa("createOrUpgrade",e);n<1&&r>=1&&(function(t){t.createObjectStore(ga.store)}(t),function(t){t.createObjectStore(ma.store,{keyPath:ma.keyPath}),t.createObjectStore(pa.store,{keyPath:pa.keyPath,autoIncrement:!0}).createIndex(pa.userMutationsIndex,pa.userMutationsKeyPath,{unique:!0}),t.createObjectStore(ya.store)}(t),Bc(t),function(t){t.createObjectStore(ba.store)}(t));let i=La.resolve();return n<3&&r>=3&&(0!==n&&(function(t){t.deleteObjectStore(Ia.store),t.deleteObjectStore(Ta.store),t.deleteObjectStore(_a.store)}(t),Bc(t)),i=i.next((()=>function(t){const e=t.store(_a.store),n=new _a(0,0,es.min().toTimestamp(),0);return e.put(_a.key,n)}(s)))),n<4&&r>=4&&(0!==n&&(i=i.next((()=>function(t,e){return e.store(pa.store).Nt().next((n=>{t.deleteObjectStore(pa.store),t.createObjectStore(pa.store,{keyPath:pa.keyPath,autoIncrement:!0}).createIndex(pa.userMutationsIndex,pa.userMutationsKeyPath,{unique:!0});const r=e.store(pa.store),s=n.map((t=>r.put(t)));return La.waitFor(s)}))}(t,s)))),i=i.next((()=>{!function(t){t.createObjectStore(Aa.store,{keyPath:Aa.keyPath})}(t)}))),n<5&&r>=5&&(i=i.next((()=>this.Re(s)))),n<6&&r>=6&&(i=i.next((()=>(function(t){t.createObjectStore(Ea.store)}(t),this.Pe(s))))),n<7&&r>=7&&(i=i.next((()=>this.be(s)))),n<8&&r>=8&&(i=i.next((()=>this.ve(t,s)))),n<9&&r>=9&&(i=i.next((()=>{!function(t){t.objectStoreNames.contains("remoteDocumentChanges")&&t.deleteObjectStore("remoteDocumentChanges")}(t),function(t){const e=t.objectStore(ba.store);e.createIndex(ba.readTimeIndex,ba.readTimeIndexPath,{unique:!1}),e.createIndex(ba.collectionReadTimeIndex,ba.collectionReadTimeIndexPath,{unique:!1})}(e)}))),n<10&&r>=10&&(i=i.next((()=>this.Ve(s)))),n<11&&r>=11&&(i=i.next((()=>{!function(t){t.createObjectStore(Da.store,{keyPath:Da.keyPath})}(t),function(t){t.createObjectStore(Na.store,{keyPath:Na.keyPath})}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)}))),i}Pe(t){let e=0;return t.store(ba.store).Ot(((t,n)=>{e+=mc(n)})).next((()=>{const n=new Ea(e);return t.store(Ea.store).put(Ea.key,n)}))}Re(t){const e=t.store(ma.store),n=t.store(pa.store);return e.Nt().next((e=>La.forEach(e,(e=>{const r=IDBKeyRange.bound([e.userId,-1],[e.userId,e.lastAcknowledgedBatchId]);return n.Nt(pa.userMutationsIndex,r).next((n=>La.forEach(n,(n=>{zr(n.userId===e.userId);const r=ec(this.R,n);return gc(t,e.userId,r).next((()=>{}))}))))}))))}be(t){const e=t.store(Ia.store),n=t.store(ba.store);return t.store(_a.store).get(_a.key).next((t=>{const r=[];return n.Ot(((n,s)=>{const i=new os(n),o=function(t){return[0,ua(t)]}(i);r.push(e.get(o).next((n=>n?La.resolve():(n=>e.put(new Ia(0,ua(n),t.highestListenSequenceNumber)))(i))))})).next((()=>La.waitFor(r)))}))}ve(t,e){t.createObjectStore(Sa.store,{keyPath:Sa.keyPath});const n=e.store(Sa.store),r=new uc,s=t=>{if(r.add(t)){const e=t.lastSegment(),r=t.popLast();return n.put({collectionId:e,parent:ua(r)})}};return e.store(ba.store).Ot({$t:!0},((t,e)=>{const n=new os(t);return s(n.popLast())})).next((()=>e.store(ya.store).Ot({$t:!0},(([t,e,n],r)=>{const i=da(e);return s(i.popLast())}))))}Ve(t){const e=t.store(Ta.store);return e.Ot(((t,n)=>{const r=nc(n),s=rc(this.R,r);return e.put(s)}))}}function Bc(t){t.createObjectStore(Ia.store,{keyPath:Ia.keyPath}).createIndex(Ia.documentTargetsIndex,Ia.documentTargetsKeyPath,{unique:!0}),t.createObjectStore(Ta.store,{keyPath:Ta.keyPath}).createIndex(Ta.queryTargetsIndexName,Ta.queryTargetsKeyPath,{unique:!0}),t.createObjectStore(_a.store)}const jc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class $c{constructor(t,e,n,r,s,i,o,a,c,u){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Se=s,this.window=i,this.document=o,this.De=c,this.Ce=u,this.Ne=null,this.xe=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ke=null,this.inForeground=!1,this.$e=null,this.Oe=null,this.Fe=Number.NEGATIVE_INFINITY,this.Me=t=>Promise.resolve(),!$c.gt())throw new Ur(Vr.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new kc(this,r),this.Le=e+"main",this.R=new Ha(a),this.Be=new Ma(this.Le,11,new qc(this.R)),this.Ue=new Tc(this.referenceDelegate,this.R),this.qt=new hc,this.qe=function(t,e){return new Mc(t,e)}(this.R,this.qt),this.Ke=new ic,this.window&&this.window.localStorage?this.Qe=this.window.localStorage:(this.Qe=null,!1===u&&$r("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.je().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new Ur(Vr.FAILED_PRECONDITION,jc);return this.We(),this.Ge(),this.ze(),this.runTransaction("getHighestListenSequenceNumber","readonly",(t=>this.Ue.getHighestSequenceNumber(t)))})).then((t=>{this.Ne=new Pr(t,this.De)})).then((()=>{this.xe=!0})).catch((t=>(this.Be&&this.Be.close(),Promise.reject(t))))}He(t){return this.Me=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.Be.bt((async e=>{null===e.newVersion&&await t()}))}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Se.enqueueAndForget((async()=>{this.started&&await this.je()})))}je(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(t=>Gc(t).put(new Aa(this.clientId,Date.now(),this.networkEnabled,this.inForeground)).next((()=>{if(this.isPrimary)return this.Je(t).next((t=>{t||(this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))))}))})).next((()=>this.Ye(t))).next((e=>this.isPrimary&&!e?this.Xe(t).next((()=>!1)):!!e&&this.Ze(t).next((()=>!0)))))).catch((t=>{if(Va(t))return jr("IndexedDbPersistence","Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return jr("IndexedDbPersistence","Releasing owner lease after error during lease refresh",t),!1})).then((t=>{this.isPrimary!==t&&this.Se.enqueueRetryable((()=>this.Me(t))),this.isPrimary=t}))}Je(t){return Kc(t).get(ga.key).next((t=>La.resolve(this.tn(t))))}en(t){return Gc(t).delete(this.clientId)}async nn(){if(this.isPrimary&&!this.sn(this.Fe,18e5)){this.Fe=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const e=Ka(t,Aa.store);return e.Nt().next((t=>{const n=this.rn(t,18e5),r=t.filter((t=>-1===n.indexOf(t)));return La.forEach(r,(t=>e.delete(t.clientId))).next((()=>r))}))})).catch((()=>[]));if(this.Qe)for(const e of t)this.Qe.removeItem(this.on(e.clientId))}}ze(){this.Oe=this.Se.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.je().then((()=>this.nn())).then((()=>this.ze()))))}tn(t){return!!t&&t.ownerId===this.clientId}Ye(t){return this.Ce?La.resolve(!0):Kc(t).get(ga.key).next((e=>{if(null!==e&&this.sn(e.leaseTimestampMs,5e3)&&!this.cn(e.ownerId)){if(this.tn(e)&&this.networkEnabled)return!0;if(!this.tn(e)){if(!e.allowTabSynchronization)throw new Ur(Vr.FAILED_PRECONDITION,jc);return!1}}return!(!this.networkEnabled||!this.inForeground)||Gc(t).Nt().next((t=>void 0===this.rn(t,5e3).find((t=>{if(this.clientId!==t.clientId){const e=!this.networkEnabled&&t.networkEnabled,n=!this.inForeground&&t.inForeground,r=this.networkEnabled===t.networkEnabled;if(e||n&&r)return!0}return!1}))))})).next((t=>(this.isPrimary!==t&&jr("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.xe=!1,this.un(),this.Oe&&(this.Oe.cancel(),this.Oe=null),this.an(),this.hn(),await this.Be.runTransaction("shutdown","readwrite",[ga.store,Aa.store],(t=>{const e=new $a(t,Pr.o);return this.Xe(e).next((()=>this.en(e)))})),this.Be.close(),this.ln()}rn(t,e){return t.filter((t=>this.sn(t.updateTimeMs,e)&&!this.cn(t.clientId)))}fn(){return this.runTransaction("getActiveClients","readonly",(t=>Gc(t).Nt().next((t=>this.rn(t,18e5).map((t=>t.clientId))))))}get started(){return this.xe}getMutationQueue(t){return pc.Qt(t,this.R,this.qt,this.referenceDelegate)}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getIndexManager(){return this.qt}getBundleCache(){return this.Ke}runTransaction(t,e,n){jr("IndexedDbPersistence","Starting transaction:",t);const r="readonly"===e?"readonly":"readwrite";let s;return this.Be.runTransaction(t,r,xa,(r=>(s=new $a(r,this.Ne?this.Ne.next():Pr.o),"readwrite-primary"===e?this.Je(s).next((t=>!!t||this.Ye(s))).next((e=>{if(!e)throw $r(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Se.enqueueRetryable((()=>this.Me(!1))),new Ur(Vr.FAILED_PRECONDITION,Ca);return n(s)})).next((t=>this.Ze(s).next((()=>t)))):this.dn(s).next((()=>n(s)))))).then((t=>(s.raiseOnCommittedEvent(),t)))}dn(t){return Kc(t).get(ga.key).next((t=>{if(null!==t&&this.sn(t.leaseTimestampMs,5e3)&&!this.cn(t.ownerId)&&!this.tn(t)&&!(this.Ce||this.allowTabSynchronization&&t.allowTabSynchronization))throw new Ur(Vr.FAILED_PRECONDITION,jc)}))}Ze(t){const e=new ga(this.clientId,this.allowTabSynchronization,Date.now());return Kc(t).put(ga.key,e)}static gt(){return Ma.gt()}Xe(t){const e=Kc(t);return e.get(ga.key).next((t=>this.tn(t)?(jr("IndexedDbPersistence","Releasing primary lease."),e.delete(ga.key)):La.resolve()))}sn(t,e){const n=Date.now();return!(t<n-e||t>n&&($r(`Detected an update time that is in the future: ${t} > ${n}`),1))}We(){null!==this.document&&"function"==typeof this.document.addEventListener&&(this.$e=()=>{this.Se.enqueueAndForget((()=>(this.inForeground="visible"===this.document.visibilityState,this.je())))},this.document.addEventListener("visibilitychange",this.$e),this.inForeground="visible"===this.document.visibilityState)}an(){this.$e&&(this.document.removeEventListener("visibilitychange",this.$e),this.$e=null)}Ge(){var t;"function"==typeof(null===(t=this.window)||void 0===t?void 0:t.addEventListener)&&(this.ke=()=>{this.un(),this.Se.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.ke))}hn(){this.ke&&(this.window.removeEventListener("pagehide",this.ke),this.ke=null)}cn(t){var e;try{const n=null!==(null===(e=this.Qe)||void 0===e?void 0:e.getItem(this.on(t)));return jr("IndexedDbPersistence",`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(t){return $r("IndexedDbPersistence","Failed to get zombied client id.",t),!1}}un(){if(this.Qe)try{this.Qe.setItem(this.on(this.clientId),String(Date.now()))}catch(t){$r("Failed to set zombie client id.",t)}}ln(){if(this.Qe)try{this.Qe.removeItem(this.on(this.clientId))}catch(t){}}on(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Kc(t){return Ka(t,ga.store)}function Gc(t){return Ka(t,Aa.store)}function Qc(t,e){let n=t.projectId;return t.isDefaultDatabase||(n+="."+t.database),"firestore/"+e+"/"+n+"/"
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
     */class Hc{constructor(t,e,n){this.qe=t,this._n=e,this.qt=n}mn(t,e){return this._n.getAllMutationBatchesAffectingDocumentKey(t,e).next((n=>this.gn(t,e,n)))}gn(t,e,n){return this.qe.getEntry(t,e).next((t=>{for(const e of n)e.applyToLocalView(t);return t}))}yn(t,e){t.forEach(((t,n)=>{for(const t of e)t.applyToLocalView(n)}))}pn(t,e){return this.qe.getEntries(t,e).next((e=>this.En(t,e).next((()=>e))))}En(t,e){return this._n.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>this.yn(e,t)))}getDocumentsMatchingQuery(t,e,n){return function(t){return Es.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.Tn(t,e.path):di(e)?this.In(t,e,n):this.An(t,e,n)}Tn(t,e){return this.mn(t,new Es(e)).next((t=>{let e=go();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}In(t,e,n){const r=e.collectionGroup;let s=go();return this.qt.getCollectionParents(t,r).next((i=>La.forEach(i,(i=>{const o=function(t,e){return new ii(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,i.child(r));return this.An(t,o,n).next((t=>{t.forEach(((t,e)=>{s=s.insert(t,e)}))}))})).next((()=>s))))}An(t,e,n){let r,s;return this.qe.getDocumentsMatchingQuery(t,e,n).next((n=>(r=n,this._n.getAllMutationBatchesAffectingQuery(t,e)))).next((e=>(s=e,this.Rn(t,s,r).next((t=>{r=t;for(const t of s)for(const e of t.mutations){const n=e.key;let s=r.get(n);null==s&&(s=Vs.newInvalidDocument(n),r=r.insert(n,s)),$i(e,s,t.localWriteTime),s.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((t,n)=>{vi(e,n)||(r=r.remove(t))})),r)))}Rn(t,e,n){let r=wo();for(const t of e)for(const e of t.mutations)e instanceof Hi&&null===n.get(e.key)&&(r=r.add(e.key));let s=n;return this.qe.getEntries(t,r).next((t=>(t.forEach(((t,e)=>{e.isFoundDocument()&&(s=s.insert(t,e))})),s)))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Yc{Vn(t){this.Sn=t}getDocumentsMatchingQuery(t,e,n,r){return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}(e)||n.isEqual(es.min())?this.Dn(t,e):this.Sn.pn(t,r).next((s=>{const i=this.Cn(e,s);return(ci(e)||ui(e))&&this.Nn(e.limitType,i,r,n)?this.Dn(t,e):(Br()<=m.DEBUG&&jr("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),wi(e)),this.Sn.getDocumentsMatchingQuery(t,e,n).next((t=>(i.forEach((e=>{t=t.insert(e.key,e)})),t))))}))}Cn(t,e){let n=new co(bi(t));return e.forEach(((e,r)=>{vi(t,r)&&(n=n.add(r))})),n}Nn(t,e,n,r){if(n.size!==e.size)return!0;const s="F"===t?e.last():e.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Dn(t,e){return Br()<=m.DEBUG&&jr("QueryEngine","Using full collection scan to execute query:",wi(e)),this.Sn.getDocumentsMatchingQuery(t,e,es.min())}}
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
     */class Xc{constructor(t,e,n,r){this.persistence=t,this.xn=e,this.R=r,this.kn=new io(Xr),this.$n=new Lc((t=>Bs(t)),js),this.On=es.min(),this._n=t.getMutationQueue(n),this.Fn=t.getRemoteDocumentCache(),this.Ue=t.getTargetCache(),this.Mn=new Hc(this.Fn,this._n,this.persistence.getIndexManager()),this.Ke=t.getBundleCache(),this.xn.Vn(this.Mn)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.kn)))}}function Jc(t,e,n,r){return new Xc(t,e,n,r)}async function Zc(t,e){const n=Hr(t);let r=n._n,s=n.Mn;const i=await n.persistence.runTransaction("Handle user change","readonly",(t=>{let i;return n._n.getAllMutationBatches(t).next((o=>(i=o,r=n.persistence.getMutationQueue(e),s=new Hc(n.Fn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(t)))).next((e=>{const n=[],r=[];let o=wo();for(const t of i){n.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}for(const t of e){r.push(t.batchId);for(const e of t.mutations)o=o.add(e.key)}return s.pn(t,o).next((t=>({Ln:t,removedBatchIds:n,addedBatchIds:r})))}))}));return n._n=r,n.Mn=s,n.xn.Vn(n.Mn),i}function tu(t){const e=Hr(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ue.getLastRemoteSnapshotVersion(t)))}function eu(t,e,n,r,s){let i=wo();return n.forEach((t=>i=i.add(t))),e.getEntries(t,i).next((t=>{let i=lo();return n.forEach(((n,o)=>{const a=t.get(n),c=(null==s?void 0:s.get(n))||r;o.isNoDocument()&&o.version.isEqual(es.min())?(e.removeEntry(n,c),i=i.insert(n,o)):!a.isValidDocument()||o.version.compareTo(a.version)>0||0===o.version.compareTo(a.version)&&a.hasPendingWrites?(e.addEntry(o,c),i=i.insert(n,o)):jr("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",o.version)})),i}))}function nu(t,e){const n=Hr(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n._n.getNextMutationBatchAfterBatchId(t,e))))}function ru(t,e){const n=Hr(t);return n.persistence.runTransaction("Allocate target","readwrite",(t=>{let r;return n.Ue.getTargetData(t,e).next((s=>s?(r=s,La.resolve(r)):n.Ue.allocateTargetId(t).next((s=>(r=new za(e,s,0,t.currentSequenceNumber),n.Ue.addTargetData(t,r).next((()=>r)))))))})).then((t=>{const r=n.kn.get(t.targetId);return(null===r||t.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.kn=n.kn.insert(t.targetId,t),n.$n.set(e,t.targetId)),t}))}async function su(t,e,n){const r=Hr(t),s=r.kn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,(t=>r.persistence.referenceDelegate.removeTarget(t,s)))}catch(t){if(!Va(t))throw t;jr("LocalStore",`Failed to update sequence numbers for target ${e}: ${t}`)}r.kn=r.kn.remove(e),r.$n.delete(s.target)}function iu(t,e,n){const r=Hr(t);let s=es.min(),i=wo();return r.persistence.runTransaction("Execute query","readonly",(t=>function(t,e,n){const r=Hr(t),s=r.$n.get(n);return void 0!==s?La.resolve(r.kn.get(s)):r.Ue.getTargetData(e,n)}(r,t,gi(e)).next((e=>{if(e)return s=e.lastLimboFreeSnapshotVersion,r.Ue.getMatchingKeysForTargetId(t,e.targetId).next((t=>{i=t}))})).next((()=>r.xn.getDocumentsMatchingQuery(t,e,n?s:es.min(),n?i:wo()))).next((t=>({documents:t,Bn:i})))))}function ou(t,e){const n=Hr(t),r=Hr(n.Ue),s=n.kn.get(e);return s?Promise.resolve(s.target):n.persistence.runTransaction("Get target data","readonly",(t=>r.lt(t,e).next((t=>t?t.target:null))))}function au(t){const e=Hr(t);return e.persistence.runTransaction("Get new document changes","readonly",(t=>function(t,e,n){const r=Hr(t);let s=lo(),i=Xa(n);const o=Vc(e),a=IDBKeyRange.lowerBound(i,!0);return o.Ot({index:ba.readTimeIndex,range:a},((t,e)=>{const n=Wa(r.R,e);s=s.insert(n.key,n),i=e.readTime})).next((()=>({wn:s,readTime:Ja(i)})))}(e.Fn,t,e.On))).then((({wn:t,readTime:n})=>(e.On=n,t)))}async function cu(t,e,n=wo()){const r=await ru(t,gi(sc(e.bundledQuery))),s=Hr(t);return s.persistence.runTransaction("Save named query","readwrite",(t=>{const i=Fo(e.readTime);if(r.snapshotVersion.compareTo(i)>=0)return s.Ke.saveNamedQuery(t,e);const o=r.withResumeToken(hs.EMPTY_BYTE_STRING,i);return s.kn=s.kn.insert(o.targetId,o),s.Ue.updateTargetData(t,o).next((()=>s.Ue.removeMatchingKeysForTargetId(t,r.targetId))).next((()=>s.Ue.addMatchingKeys(t,n,r.targetId))).next((()=>s.Ke.saveNamedQuery(t,e)))}))}
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
     */class uu{constructor(t){this.R=t,this.Qn=new Map,this.jn=new Map}getBundleMetadata(t,e){return La.resolve(this.Qn.get(e))}saveBundleMetadata(t,e){var n;return this.Qn.set(e.id,{id:(n=e).id,version:n.version,createTime:Fo(n.createTime)}),La.resolve()}getNamedQuery(t,e){return La.resolve(this.jn.get(e))}saveNamedQuery(t,e){return this.jn.set(e.name,function(t){return{name:t.name,query:sc(t.bundledQuery),readTime:Fo(t.readTime)}}(e)),La.resolve()}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class fu{constructor(t,e){this.qt=t,this.ls=e,this.docs=new io(Es.comparator),this.size=0}addEntry(t,e,n){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.ls(e);return this.docs=this.docs.insert(r,{document:e.clone(),size:o,readTime:n}),this.size+=o-i,this.qt.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return La.resolve(n?n.document.clone():Vs.newInvalidDocument(e))}getEntries(t,e){let n=lo();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.clone():Vs.newInvalidDocument(t))})),La.resolve(n)}getDocumentsMatchingQuery(t,e,n){let r=lo();const s=new Es(e.path.child("")),i=this.docs.getIteratorFrom(s);for(;i.hasNext();){const{key:t,value:{document:s,readTime:o}}=i.getNext();if(!e.path.isPrefixOf(t.path))break;o.compareTo(n)<=0||vi(e,s)&&(r=r.insert(s.key,s.clone()))}return La.resolve(r)}fs(t,e){return La.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new gu(this)}getSize(t){return La.resolve(this.size)}}class gu extends Oc{constructor(t){super(),this.Ie=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?e.push(this.Ie.addEntry(t,r.document,this.getReadTime(n))):this.Ie.removeEntry(n)})),La.waitFor(e)}getFromCache(t,e){return this.Ie.getEntry(t,e)}getAllFromCache(t,e){return this.Ie.getEntries(t,e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class mu{constructor(t){this.persistence=t,this.ds=new Lc((t=>Bs(t)),js),this.lastRemoteSnapshotVersion=es.min(),this.highestTargetId=0,this.ws=0,this._s=new hu,this.targetCount=0,this.gs=Ec.Jt()}forEachTarget(t,e){return this.ds.forEach(((t,n)=>e(n))),La.resolve()}getLastRemoteSnapshotVersion(t){return La.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return La.resolve(this.ws)}allocateTargetId(t){return this.highestTargetId=this.gs.next(),La.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ws&&(this.ws=e),La.resolve()}te(t){this.ds.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.gs=new Ec(e),this.highestTargetId=e),t.sequenceNumber>this.ws&&(this.ws=t.sequenceNumber)}addTargetData(t,e){return this.te(e),this.targetCount+=1,La.resolve()}updateTargetData(t,e){return this.te(e),La.resolve()}removeTargetData(t,e){return this.ds.delete(e.target),this._s.Zn(e.targetId),this.targetCount-=1,La.resolve()}removeTargets(t,e,n){let r=0;const s=[];return this.ds.forEach(((i,o)=>{o.sequenceNumber<=e&&null===n.get(o.targetId)&&(this.ds.delete(i),s.push(this.removeMatchingKeysForTargetId(t,o.targetId)),r++)})),La.waitFor(s).next((()=>r))}getTargetCount(t){return La.resolve(this.targetCount)}getTargetData(t,e){const n=this.ds.get(e)||null;return La.resolve(n)}addMatchingKeys(t,e,n){return this._s.Jn(e,n),La.resolve()}removeMatchingKeys(t,e,n){this._s.Xn(e,n);const r=this.persistence.referenceDelegate,s=[];return r&&e.forEach((e=>{s.push(r.markPotentiallyOrphaned(t,e))})),La.waitFor(s)}removeMatchingKeysForTargetId(t,e){return this._s.Zn(e),La.resolve()}getMatchingKeysForTargetId(t,e){const n=this._s.es(e);return La.resolve(n)}containsKey(t,e){return La.resolve(this._s.containsKey(e))}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class pu{constructor(t,e){this.ys={},this.Ne=new Pr(0),this.xe=!1,this.xe=!0,this.referenceDelegate=t(this),this.Ue=new mu(this),this.qt=new cc,this.qe=function(t,e){return new fu(t,e)}(this.qt,(t=>this.referenceDelegate.ps(t))),this.R=new Ha(e),this.Ke=new uu(this.R)}start(){return Promise.resolve()}shutdown(){return this.xe=!1,Promise.resolve()}get started(){return this.xe}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.qt}getMutationQueue(t){let e=this.ys[t.toKey()];return e||(e=new du(this.qt,this.referenceDelegate),this.ys[t.toKey()]=e),e}getTargetCache(){return this.Ue}getRemoteDocumentCache(){return this.qe}getBundleCache(){return this.Ke}runTransaction(t,e,n){jr("MemoryPersistence","Starting transaction:",t);const r=new yu(this.Ne.next());return this.referenceDelegate.Es(),n(r).next((t=>this.referenceDelegate.Ts(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Is(t,e){return La.or(Object.values(this.ys).map((n=>()=>n.containsKey(t,e))))}}class yu extends ka{constructor(t){super(),this.currentSequenceNumber=t}}class wu{constructor(t){this.persistence=t,this.As=new hu,this.Rs=null}static Ps(t){return new wu(t)}get bs(){if(this.Rs)return this.Rs;throw Qr()}addReference(t,e,n){return this.As.addReference(n,e),this.bs.delete(n.toString()),La.resolve()}removeReference(t,e,n){return this.As.removeReference(n,e),this.bs.add(n.toString()),La.resolve()}markPotentiallyOrphaned(t,e){return this.bs.add(e.toString()),La.resolve()}removeTarget(t,e){this.As.Zn(e.targetId).forEach((t=>this.bs.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.bs.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Es(){this.Rs=new Set}Ts(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return La.forEach(this.bs,(n=>{const r=Es.fromPath(n);return this.vs(t,r).next((t=>{t||e.removeEntry(r)}))})).next((()=>(this.Rs=null,e.apply(t))))}updateLimboDocument(t,e){return this.vs(t,e).next((t=>{t?this.bs.delete(e.toString()):this.bs.add(e.toString())}))}ps(t){return 0}vs(t,e){return La.or([()=>La.resolve(this.As.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Is(t,e)])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class vu{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}function bu(t,e){return`firestore_clients_${t}_${e}`}function Eu(t,e,n){let r=`firestore_mutations_${t}_${n}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Tu(t,e){return`firestore_targets_${t}_${e}`}vu.UNAUTHENTICATED=new vu(null),vu.GOOGLE_CREDENTIALS=new vu("google-credentials-uid"),vu.FIRST_PARTY=new vu("first-party-uid");class Iu{constructor(t,e,n,r){this.user=t,this.batchId=e,this.state=n,this.error=r}static Vs(t,e,n){const r=JSON.parse(n);let s,i="object"==typeof r&&-1!==["pending","acknowledged","rejected"].indexOf(r.state)&&(void 0===r.error||"object"==typeof r.error);return i&&r.error&&(i="string"==typeof r.error.message&&"string"==typeof r.error.code,i&&(s=new Ur(r.error.code,r.error.message))),i?new Iu(t,e,r.state,s):($r("SharedClientState",`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class _u{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Vs(t,e){const n=JSON.parse(e);let r,s="object"==typeof n&&-1!==["not-current","current","rejected"].indexOf(n.state)&&(void 0===n.error||"object"==typeof n.error);return s&&n.error&&(s="string"==typeof n.error.message&&"string"==typeof n.error.code,s&&(r=new Ur(n.error.code,n.error.message))),s?new _u(t,n.state,r):($r("SharedClientState",`Failed to parse target state for ID '${t}': ${e}`),null)}Ss(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Su{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Vs(t,e){const n=JSON.parse(e);let r="object"==typeof n&&n.activeTargetIds instanceof Array,s=bo();for(let t=0;r&&t<n.activeTargetIds.length;++t)r=bs(n.activeTargetIds[t]),s=s.add(n.activeTargetIds[t]);return r?new Su(t,s):($r("SharedClientState",`Failed to parse client data for instance '${t}': ${e}`),null)}}class Au{constructor(t,e){this.clientId=t,this.onlineState=e}static Vs(t){const e=JSON.parse(t);return"object"==typeof e&&-1!==["Unknown","Online","Offline"].indexOf(e.onlineState)&&"string"==typeof e.clientId?new Au(e.clientId,e.onlineState):($r("SharedClientState",`Failed to parse online state: ${t}`),null)}}class Du{constructor(){this.activeTargetIds=bo()}Ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}Cs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ss(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Nu{constructor(t,e,n,r,s){this.window=t,this.Se=e,this.persistenceKey=n,this.Ns=r,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.xs=this.ks.bind(this),this.$s=new io(Xr),this.started=!1,this.Os=[];const i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Fs=bu(this.persistenceKey,this.Ns),this.Ms=function(t){return`firestore_sequence_number_${t}`}
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
     */(this.persistenceKey),this.$s=this.$s.insert(this.Ns,new Du),this.Ls=new RegExp(`^firestore_clients_${i}_([^_]*)$`),this.Bs=new RegExp(`^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`),this.Us=new RegExp(`^firestore_targets_${i}_(\\d+)$`),this.qs=function(t){return`firestore_online_state_${t}`}(this.persistenceKey),this.Ks=function(t){return`firestore_bundle_loaded_${t}`}(this.persistenceKey),this.window.addEventListener("storage",this.xs)}static gt(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.fn();for(const e of t){if(e===this.Ns)continue;const t=this.getItem(bu(this.persistenceKey,e));if(t){const n=Su.Vs(e,t);n&&(this.$s=this.$s.insert(n.clientId,n))}}this.Qs();const e=this.storage.getItem(this.qs);if(e){const t=this.js(e);t&&this.Ws(t)}for(const t of this.Os)this.ks(t);this.Os=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(t){this.setItem(this.Ms,JSON.stringify(t))}getAllActiveQueryTargets(){return this.Gs(this.$s)}isActiveQueryTarget(t){let e=!1;return this.$s.forEach(((n,r)=>{r.activeTargetIds.has(t)&&(e=!0)})),e}addPendingMutation(t){this.zs(t,"pending")}updateMutationState(t,e,n){this.zs(t,e,n),this.Hs(t)}addLocalQueryTarget(t){let e="not-current";if(this.isActiveQueryTarget(t)){const n=this.storage.getItem(Tu(this.persistenceKey,t));if(n){const r=_u.Vs(t,n);r&&(e=r.state)}}return this.Js.Ds(t),this.Qs(),e}removeLocalQueryTarget(t){this.Js.Cs(t),this.Qs()}isLocalQueryTarget(t){return this.Js.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Tu(this.persistenceKey,t))}updateQueryState(t,e,n){this.Ys(t,e,n)}handleUserChange(t,e,n){e.forEach((t=>{this.Hs(t)})),this.currentUser=t,n.forEach((t=>{this.addPendingMutation(t)}))}setOnlineState(t){this.Xs(t)}notifyBundleLoaded(){this.Zs()}shutdown(){this.started&&(this.window.removeEventListener("storage",this.xs),this.removeItem(this.Fs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return jr("SharedClientState","READ",t,e),e}setItem(t,e){jr("SharedClientState","SET",t,e),this.storage.setItem(t,e)}removeItem(t){jr("SharedClientState","REMOVE",t),this.storage.removeItem(t)}ks(t){const e=t;if(e.storageArea===this.storage){if(jr("SharedClientState","EVENT",e.key,e.newValue),e.key===this.Fs)return void $r("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Se.enqueueRetryable((async()=>{if(this.started){if(null!==e.key)if(this.Ls.test(e.key)){if(null==e.newValue){const t=this.ti(e.key);return this.ei(t,null)}{const t=this.ni(e.key,e.newValue);if(t)return this.ei(t.clientId,t)}}else if(this.Bs.test(e.key)){if(null!==e.newValue){const t=this.si(e.key,e.newValue);if(t)return this.ii(t)}}else if(this.Us.test(e.key)){if(null!==e.newValue){const t=this.ri(e.key,e.newValue);if(t)return this.oi(t)}}else if(e.key===this.qs){if(null!==e.newValue){const t=this.js(e.newValue);if(t)return this.Ws(t)}}else if(e.key===this.Ms){const t=function(t){let e=Pr.o;if(null!=t)try{const n=JSON.parse(t);zr("number"==typeof n),e=n}catch(t){$r("SharedClientState","Failed to read sequence number from WebStorage",t)}return e}(e.newValue);t!==Pr.o&&this.sequenceNumberHandler(t)}else if(e.key===this.Ks)return this.syncEngine.ci()}else this.Os.push(e)}))}}get Js(){return this.$s.get(this.Ns)}Qs(){this.setItem(this.Fs,this.Js.Ss())}zs(t,e,n){const r=new Iu(this.currentUser,t,e,n),s=Eu(this.persistenceKey,this.currentUser,t);this.setItem(s,r.Ss())}Hs(t){const e=Eu(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Xs(t){const e={clientId:this.Ns,onlineState:t};this.storage.setItem(this.qs,JSON.stringify(e))}Ys(t,e,n){const r=Tu(this.persistenceKey,t),s=new _u(t,e,n);this.setItem(r,s.Ss())}Zs(){this.setItem(this.Ks,"value-not-used")}ti(t){const e=this.Ls.exec(t);return e?e[1]:null}ni(t,e){const n=this.ti(t);return Su.Vs(n,e)}si(t,e){const n=this.Bs.exec(t),r=Number(n[1]),s=void 0!==n[2]?n[2]:null;return Iu.Vs(new vu(s),r,e)}ri(t,e){const n=this.Us.exec(t),r=Number(n[1]);return _u.Vs(r,e)}js(t){return Au.Vs(t)}async ii(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.ui(t.batchId,t.state,t.error);jr("SharedClientState",`Ignoring mutation for non-active user ${t.user.uid}`)}oi(t){return this.syncEngine.ai(t.targetId,t.state,t.error)}ei(t,e){const n=e?this.$s.insert(t,e):this.$s.remove(t),r=this.Gs(this.$s),s=this.Gs(n),i=[],o=[];return s.forEach((t=>{r.has(t)||i.push(t)})),r.forEach((t=>{s.has(t)||o.push(t)})),this.syncEngine.hi(i,o).then((()=>{this.$s=n}))}Ws(t){this.$s.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}Gs(t){let e=bo();return t.forEach(((t,n)=>{e=e.unionWith(n.activeTargetIds)})),e}}class xu{constructor(){this.li=new Du,this.fi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.li.Ds(t),this.fi[t]||"not-current"}updateQueryState(t,e,n){this.fi[t]=e}removeLocalQueryTarget(t){this.li.Cs(t)}isLocalQueryTarget(t){return this.li.activeTargetIds.has(t)}clearQueryState(t){delete this.fi[t]}getAllActiveQueryTargets(){return this.li.activeTargetIds}isActiveQueryTarget(t){return this.li.activeTargetIds.has(t)}start(){return this.li=new Du,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}
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
     */class ku{constructor(){this.wi=()=>this._i(),this.mi=()=>this.gi(),this.yi=[],this.pi()}di(t){this.yi.push(t)}shutdown(){window.removeEventListener("online",this.wi),window.removeEventListener("offline",this.mi)}pi(){window.addEventListener("online",this.wi),window.addEventListener("offline",this.mi)}_i(){jr("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.yi)t(0)}gi(){jr("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.yi)t(1)}static gt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
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
     */class Ou extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.Di=e+"://"+t.host,this.Ci="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Ni(t,e,n,r){const s=this.xi(t,e);jr("RestConnection","Sending: ",s,n);const i={};return this.ki(i,r),this.$i(t,s,i,n).then((t=>(jr("RestConnection","Received: ",t),t)),(e=>{throw Kr("RestConnection",`${t} failed with error: `,e,"url: ",s,"request:",n),e}))}Oi(t,e,n,r){return this.Ni(t,e,n,r)}ki(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+Fr,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(const n in e.authHeaders)e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n])}xi(t,e){const n=Ru[t];return`${this.Di}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}$i(t,e,n,r){return new Promise(((s,i)=>{const o=new Mr;o.listenOnce(xr.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Nr.NO_ERROR:const e=o.getResponseJson();jr("Connection","XHR received:",JSON.stringify(e)),s(e);break;case Nr.TIMEOUT:jr("Connection",'RPC "'+t+'" timed out'),i(new Ur(Vr.DEADLINE_EXCEEDED,"Request time out"));break;case Nr.HTTP_ERROR:const n=o.getStatus();if(jr("Connection",'RPC "'+t+'" failed with status:',n,"response text:",o.getResponseText()),n>0){const t=o.getResponseJson().error;if(t&&t.status&&t.message){const e=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Vr).indexOf(e)>=0?e:Vr.UNKNOWN}(t.status);i(new Ur(e,t.message))}else i(new Ur(Vr.UNKNOWN,"Server responded with status "+o.getStatus()))}else i(new Ur(Vr.UNAVAILABLE,"Connection failed."));break;default:Qr()}}finally{jr("Connection",'RPC "'+t+'" completed.')}}));const a=JSON.stringify(r);o.send(e,"POST",a,n,15)}))}Fi(t,e){const n=[this.Di,"/","google.firestore.v1.Firestore","/",t,"/channel"],r=new Ir,s=me(),i={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};var o;this.useFetchStreams&&(i.xmlHttpFactory=new Lr({})),this.ki(i.initMessageHeaders,e),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(c())||"object"==typeof navigator&&"ReactNative"===navigator.product||c().indexOf("Electron/")>=0||function(){var t=c();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()||c().indexOf("MSAppHost/")>=0||"object"==typeof(o="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==o.id||(i.httpHeadersOverwriteParam="$httpHeaders");const a=n.join("");jr("Connection","Creating WebChannel: "+a,i);const u=r.createWebChannel(a,i);let h=!1,l=!1;const d=new Lu({Ei:t=>{l?jr("Connection","Not sending because WebChannel is closed:",t):(h||(jr("Connection","Opening WebChannel transport."),u.open(),h=!0),jr("Connection","WebChannel sending:",t),u.send(t))},Ti:()=>u.close()}),f=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return f(u,Or.EventType.OPEN,(()=>{l||jr("Connection","WebChannel transport opened.")})),f(u,Or.EventType.CLOSE,(()=>{l||(l=!0,jr("Connection","WebChannel transport closed"),d.Vi())})),f(u,Or.EventType.ERROR,(t=>{l||(l=!0,Kr("Connection","WebChannel transport errored:",t),d.Vi(new Ur(Vr.UNAVAILABLE,"The operation could not be completed")))})),f(u,Or.EventType.MESSAGE,(t=>{var e;if(!l){const n=t.data[0];zr(!!n);const r=n,s=r.error||(null===(e=r[0])||void 0===e?void 0:e.error);if(s){jr("Connection","WebChannel received error:",s);const t=s.status;let e=function(t){const e=eo[t];if(void 0!==e)return so(e)}(t),n=s.message;void 0===e&&(e=Vr.INTERNAL,n="Unknown error status: "+t+" with message "+s.message),l=!0,d.Vi(new Ur(e,n)),u.close()}else jr("Connection","WebChannel received:",n),d.Si(n)}})),f(s,Cr.STAT_EVENT,(t=>{t.stat===kr?jr("Connection","Detected buffering proxy"):t.stat===Rr&&jr("Connection","Detected no buffering proxy")})),setTimeout((()=>{d.vi()}),0),d}}
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
     */function Mu(){return"undefined"!=typeof window?window:null}function Fu(){return"undefined"!=typeof document?document:null}
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
     */function Pu(t){return new Ro(t,!0)}class Vu{constructor(t,e,n=1e3,r=1.5,s=6e4){this.Se=t,this.timerId=e,this.Mi=n,this.Li=r,this.Bi=s,this.Ui=0,this.qi=null,this.Ki=Date.now(),this.reset()}reset(){this.Ui=0}Qi(){this.Ui=this.Bi}ji(t){this.cancel();const e=Math.floor(this.Ui+this.Wi()),n=Math.max(0,Date.now()-this.Ki),r=Math.max(0,e-n);r>0&&jr("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Ui} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.qi=this.Se.enqueueAfterDelay(this.timerId,r,(()=>(this.Ki=Date.now(),t()))),this.Ui*=this.Li,this.Ui<this.Mi&&(this.Ui=this.Mi),this.Ui>this.Bi&&(this.Ui=this.Bi)}Gi(){null!==this.qi&&(this.qi.skipDelay(),this.qi=null)}cancel(){null!==this.qi&&(this.qi.cancel(),this.qi=null)}Wi(){return(Math.random()-.5)*this.Ui}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Uu{constructor(t,e,n,r,s,i){this.Se=t,this.zi=n,this.Hi=r,this.Ji=s,this.listener=i,this.state=0,this.Yi=0,this.Xi=null,this.stream=null,this.Zi=new Vu(t,e)}tr(){return 1===this.state||2===this.state||4===this.state}er(){return 2===this.state}start(){3!==this.state?this.auth():this.nr()}async stop(){this.tr()&&await this.close(0)}sr(){this.state=0,this.Zi.reset()}ir(){this.er()&&null===this.Xi&&(this.Xi=this.Se.enqueueAfterDelay(this.zi,6e4,(()=>this.rr())))}cr(t){this.ur(),this.stream.send(t)}async rr(){if(this.er())return this.close(0)}ur(){this.Xi&&(this.Xi.cancel(),this.Xi=null)}async close(t,e){this.ur(),this.Zi.cancel(),this.Yi++,3!==t?this.Zi.reset():e&&e.code===Vr.RESOURCE_EXHAUSTED?($r(e.toString()),$r("Using maximum backoff delay to prevent overloading the backend."),this.Zi.Qi()):e&&e.code===Vr.UNAUTHENTICATED&&this.Ji.invalidateToken(),null!==this.stream&&(this.ar(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ri(e)}ar(){}auth(){this.state=1;const t=this.hr(this.Yi),e=this.Yi;this.Ji.getToken().then((t=>{this.Yi===e&&this.lr(t)}),(e=>{t((()=>{const t=new Ur(Vr.UNKNOWN,"Fetching auth token failed: "+e.message);return this.dr(t)}))}))}lr(t){const e=this.hr(this.Yi);this.stream=this.wr(t),this.stream.Ii((()=>{e((()=>(this.state=2,this.listener.Ii())))})),this.stream.Ri((t=>{e((()=>this.dr(t)))})),this.stream.onMessage((t=>{e((()=>this.onMessage(t)))}))}nr(){this.state=4,this.Zi.ji((async()=>{this.state=0,this.start()}))}dr(t){return jr("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(3,t)}hr(t){return e=>{this.Se.enqueueAndForget((()=>this.Yi===t?e():(jr("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class qu extends Uu{constructor(t,e,n,r,s){super(t,"listen_stream_connection_backoff","listen_stream_idle",e,n,s),this.R=r}wr(t){return this.Hi.Fi("Listen",t)}onMessage(t){this.Zi.reset();const e=function(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(t){return"NO_CHANGE"===t?0:"ADD"===t?1:"REMOVE"===t?2:"CURRENT"===t?3:"RESET"===t?4:Qr()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(t,e){return t.I?(zr(void 0===e||"string"==typeof e),hs.fromBase64String(e||"")):(zr(void 0===e||e instanceof Uint8Array),hs.fromUint8Array(e||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(t){const e=void 0===t.code?Vr.UNKNOWN:so(t.code);return new Ur(e,t.message||"")}(o);n=new So(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=qo(t,r.document.name),i=Fo(r.document.updateTime),o=new Fs({mapValue:{fields:r.document.fields}}),a=Vs.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new Io(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=qo(t,r.document),i=r.readTime?Fo(r.readTime):es.min(),o=Vs.newNoDocument(s,i),a=r.removedTargetIds||[];n=new Io([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=qo(t,r.document),i=r.removedTargetIds||[];n=new Io([],i,s,null)}else{if(!("filter"in e))return Qr();{e.filter;const t=e.filter;t.targetId;const r=t.count||0,s=new to(r),i=t.targetId;n=new _o(i,s)}}return n}(this.R,t),n=function(t){if(!("targetChange"in t))return es.min();const e=t.targetChange;return e.targetIds&&e.targetIds.length?es.min():e.readTime?Fo(e.readTime):es.min()}(t);return this.listener._r(e,n)}mr(t){const e={};e.database=$o(this.R),e.addTarget=function(t,e){let n;const r=e.target;return n=$s(r)?{documents:Wo(t,r)}:{query:Yo(t,r)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=Oo(t,e.resumeToken):e.snapshotVersion.compareTo(es.min())>0&&(n.readTime=Lo(t,e.snapshotVersion.toTimestamp())),n}(this.R,t);const n=function(t,e){const n=function(t,e){switch(e){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Qr()}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n}}(this.R,t);n&&(e.labels=n),this.cr(e)}gr(t){const e={};e.database=$o(this.R),e.removeTarget=t,this.cr(e)}}class Bu extends Uu{constructor(t,e,n,r,s){super(t,"write_stream_connection_backoff","write_stream_idle",e,n,s),this.R=r,this.yr=!1}get pr(){return this.yr}start(){this.yr=!1,this.lastStreamToken=void 0,super.start()}ar(){this.yr&&this.Er([])}wr(t){return this.Hi.Fi("Write",t)}onMessage(t){if(zr(!!t.streamToken),this.lastStreamToken=t.streamToken,this.yr){this.Zi.reset();const e=function(t,e){return t&&t.length>0?(zr(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?Fo(t.updateTime):Fo(e);return n.isEqual(es.min())&&(n=Fo(e)),new Vi(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=Fo(t.commitTime);return this.listener.Tr(n,e)}return zr(!t.writeResults||0===t.writeResults.length),this.yr=!0,this.listener.Ir()}Ar(){const t={};t.database=$o(this.R),this.cr(t)}Er(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>zo(this.R,t)))};this.cr(e)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class ju extends class{}{constructor(t,e,n){super(),this.credentials=t,this.Hi=e,this.R=n,this.Rr=!1}Pr(){if(this.Rr)throw new Ur(Vr.FAILED_PRECONDITION,"The client has already been terminated.")}Ni(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Ni(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Vr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Ur(Vr.UNKNOWN,t.toString())}))}Oi(t,e,n){return this.Pr(),this.credentials.getToken().then((r=>this.Hi.Oi(t,e,n,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Vr.UNAUTHENTICATED&&this.credentials.invalidateToken(),t):new Ur(Vr.UNKNOWN,t.toString())}))}terminate(){this.Rr=!0}}class $u{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.br=0,this.vr=null,this.Vr=!0}Sr(){0===this.br&&(this.Dr("Unknown"),this.vr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.vr=null,this.Cr("Backend didn't respond within 10 seconds."),this.Dr("Offline"),Promise.resolve()))))}Nr(t){"Online"===this.state?this.Dr("Unknown"):(this.br++,this.br>=1&&(this.kr(),this.Cr(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Dr("Offline")))}set(t){this.kr(),this.br=0,"Online"===t&&(this.Vr=!1),this.Dr(t)}Dr(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Cr(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Vr?($r(e),this.Vr=!1):jr("OnlineStateTracker",e)}kr(){null!==this.vr&&(this.vr.cancel(),this.vr=null)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Ku{constructor(t,e,n,r,s){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.$r=[],this.Or=new Map,this.Fr=new Set,this.Mr=[],this.Lr=s,this.Lr.di((t=>{n.enqueueAndForget((async()=>{Zu(this)&&(jr("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Hr(t);e.Fr.add(4),await Qu(e),e.Br.set("Unknown"),e.Fr.delete(4),await Gu(e)}(this))}))})),this.Br=new $u(n,r)}}async function Gu(t){if(Zu(t))for(const e of t.Mr)await e(!0)}async function Qu(t){for(const e of t.Mr)await e(!1)}function zu(t,e){const n=Hr(t);n.Or.has(e.targetId)||(n.Or.set(e.targetId,e),Ju(n)?Xu(n):ph(n).er()&&Wu(n,e))}function Hu(t,e){const n=Hr(t),r=ph(n);n.Or.delete(e),r.er()&&Yu(n,e),0===n.Or.size&&(r.er()?r.ir():Zu(n)&&n.Br.set("Unknown"))}function Wu(t,e){t.Ur.q(e.targetId),ph(t).mr(e)}function Yu(t,e){t.Ur.q(e),ph(t).gr(e)}function Xu(t){t.Ur=new Do({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>t.Or.get(e)||null}),ph(t).start(),t.Br.Sr()}function Ju(t){return Zu(t)&&!ph(t).tr()&&t.Or.size>0}function Zu(t){return 0===Hr(t).Fr.size}function th(t){t.Ur=void 0}async function eh(t){t.Or.forEach(((e,n)=>{Wu(t,e)}))}async function nh(t,e){th(t),Ju(t)?(t.Br.Nr(e),Xu(t)):t.Br.set("Unknown")}async function rh(t,e,n){if(t.Br.set("Online"),e instanceof So&&2===e.state&&e.cause)try{await async function(t,e){const n=e.cause;for(const r of e.targetIds)t.Or.has(r)&&(await t.remoteSyncer.rejectListen(r,n),t.Or.delete(r),t.Ur.removeTarget(r))}(t,e)}catch(n){jr("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await sh(t,n)}else if(e instanceof Io?t.Ur.X(e):e instanceof _o?t.Ur.rt(e):t.Ur.et(e),!n.isEqual(es.min()))try{const e=await tu(t.localStore);n.compareTo(e)>=0&&await function(t,e){const n=t.Ur.ut(e);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=t.Or.get(r);s&&t.Or.set(r,s.withResumeToken(n.resumeToken,e))}})),n.targetMismatches.forEach((e=>{const n=t.Or.get(e);if(!n)return;t.Or.set(e,n.withResumeToken(hs.EMPTY_BYTE_STRING,n.snapshotVersion)),Yu(t,e);const r=new za(n.target,e,1,n.sequenceNumber);Wu(t,r)})),t.remoteSyncer.applyRemoteEvent(n)}(t,n)}catch(e){jr("RemoteStore","Failed to raise snapshot:",e),await sh(t,e)}}async function sh(t,e,n){if(!Va(e))throw e;t.Fr.add(1),await Qu(t),t.Br.set("Offline"),n||(n=()=>tu(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{jr("RemoteStore","Retrying IndexedDB access"),await n(),t.Fr.delete(1),await Gu(t)}))}function ih(t,e){return e().catch((n=>sh(t,n,e)))}async function oh(t){const e=Hr(t),n=yh(e);let r=e.$r.length>0?e.$r[e.$r.length-1].batchId:-1;for(;ah(e);)try{const t=await nu(e.localStore,r);if(null===t){0===e.$r.length&&n.ir();break}r=t.batchId,ch(e,t)}catch(t){await sh(e,t)}uh(e)&&hh(e)}function ah(t){return Zu(t)&&t.$r.length<10}function ch(t,e){t.$r.push(e);const n=yh(t);n.er()&&n.pr&&n.Er(e.mutations)}function uh(t){return Zu(t)&&!yh(t).tr()&&t.$r.length>0}function hh(t){yh(t).start()}async function lh(t){yh(t).Ar()}async function dh(t){const e=yh(t);for(const n of t.$r)e.Er(n.mutations)}async function fh(t,e,n){const r=t.$r.shift(),s=Qa.from(r,e,n);await ih(t,(()=>t.remoteSyncer.applySuccessfulWrite(s))),await oh(t)}async function gh(t,e){e&&yh(t).pr&&await async function(t,e){if(ro(n=e.code)&&n!==Vr.ABORTED){const n=t.$r.shift();yh(t).sr(),await ih(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await oh(t)}var n}(t,e),uh(t)&&hh(t)}async function mh(t,e){const n=Hr(t);e?(n.Fr.delete(2),await Gu(n)):e||(n.Fr.add(2),await Qu(n),n.Br.set("Unknown"))}function ph(t){return t.qr||(t.qr=function(t,e,n){const r=Hr(t);return r.Pr(),new qu(e,r.Hi,r.credentials,r.R,n)
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
     */}(t.datastore,t.asyncQueue,{Ii:eh.bind(null,t),Ri:nh.bind(null,t),_r:rh.bind(null,t)}),t.Mr.push((async e=>{e?(t.qr.sr(),Ju(t)?Xu(t):t.Br.set("Unknown")):(await t.qr.stop(),th(t))}))),t.qr}function yh(t){return t.Kr||(t.Kr=function(t,e,n){const r=Hr(t);return r.Pr(),new Bu(e,r.Hi,r.credentials,r.R,n)}(t.datastore,t.asyncQueue,{Ii:lh.bind(null,t),Ri:gh.bind(null,t),Ir:dh.bind(null,t),Tr:fh.bind(null,t)}),t.Mr.push((async e=>{e?(t.Kr.sr(),await oh(t)):(await t.Kr.stop(),t.$r.length>0&&(jr("RemoteStore",`Stopping write stream with ${t.$r.length} pending writes`),t.$r=[]))}))),t.Kr
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}class wh{constructor(t,e,n,r,s){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new Ra,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,s){const i=Date.now()+n,o=new wh(t,e,i,r,s);return o.start(n),o}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Ur(Vr.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function vh(t,e){if($r("AsyncQueue",`${e}: ${t}`),Va(t))return new Ur(Vr.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class bh{constructor(t){this.comparator=t?(e,n)=>t(e,n)||Es.comparator(e.key,n.key):(t,e)=>Es.comparator(t.key,e.key),this.keyedMap=go(),this.sortedSet=new io(this.comparator)}static emptySet(t){return new bh(t.comparator)}has(t){return null!=this.keyedMap.get(t)}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,n)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof bh))return!1;if(this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(!t.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)"}copy(t,e){const n=new bh;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Ih{constructor(){this.Wr=void 0,this.listeners=[]}}class _h{constructor(){this.queries=new Lc((t=>yi(t)),pi),this.onlineState="Unknown",this.Gr=new Set}}async function Sh(t,e){const n=Hr(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new Ih),s)try{i.Wr=await n.onListen(r)}catch(t){const n=vh(t,`Initialization of query '${wi(e.query)}' failed`);return void e.onError(n)}n.queries.set(r,i),i.listeners.push(e),e.zr(n.onlineState),i.Wr&&e.Hr(i.Wr)&&xh(n)}async function Ah(t,e){const n=Hr(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const t=i.listeners.indexOf(e);t>=0&&(i.listeners.splice(t,1),s=0===i.listeners.length)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function Dh(t,e){const n=Hr(t);let r=!1;for(const t of e){const e=t.query,s=n.queries.get(e);if(s){for(const e of s.listeners)e.Hr(t)&&(r=!0);s.Wr=t}}r&&xh(n)}function Nh(t,e,n){const r=Hr(t),s=r.queries.get(e);if(s)for(const t of s.listeners)t.onError(n);r.queries.delete(e)}function xh(t){t.Gr.forEach((t=>{t.next()}))}class Ch{constructor(t,e,n){this.query=t,this.Jr=e,this.Yr=!1,this.Xr=null,this.onlineState="Unknown",this.options=n||{}}Hr(t){if(!this.options.includeMetadataChanges){const e=[];for(const n of t.docChanges)3!==n.type&&e.push(n);t=new Th(t.query,t.docs,t.oldDocs,e,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0)}let e=!1;return this.Yr?this.Zr(t)&&(this.Jr.next(t),e=!0):this.eo(t,this.onlineState)&&(this.no(t),e=!0),this.Xr=t,e}onError(t){this.Jr.error(t)}zr(t){this.onlineState=t;let e=!1;return this.Xr&&!this.Yr&&this.eo(this.Xr,t)&&(this.no(this.Xr),e=!0),e}eo(t,e){if(!t.fromCache)return!0;const n="Offline"!==e;return!(this.options.so&&n||t.docs.isEmpty()&&"Offline"!==e)}Zr(t){if(t.docChanges.length>0)return!0;const e=this.Xr&&this.Xr.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges}no(t){t=Th.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.Yr=!0,this.Jr.next(t)}}
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
     */class Rh{constructor(t){this.R=t}Un(t){return qo(this.R,t)}qn(t){return t.metadata.exists?Qo(this.R,t.document,!1):Vs.newNoDocument(this.Un(t.metadata.name),this.Kn(t.metadata.readTime))}Kn(t){return Fo(t)}}class Lh{constructor(t,e,n){this.ro=t,this.localStore=e,this.R=n,this.queries=[],this.documents=[],this.progress=Oh(t)}oo(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;return t.payload.namedQuery?this.queries.push(t.payload.namedQuery):t.payload.documentMetadata?(this.documents.push({metadata:t.payload.documentMetadata}),t.payload.documentMetadata.exists||++e):t.payload.document&&(this.documents[this.documents.length-1].document=t.payload.document,++e),e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,Object.assign({},this.progress)):null}co(t){const e=new Map,n=new Rh(this.R);for(const r of t)if(r.metadata.queries){const t=n.Un(r.metadata.name);for(const n of r.metadata.queries){const r=(e.get(n)||wo()).add(t);e.set(n,r)}}return e}async complete(){const t=await async function(t,e,n,r){const s=Hr(t);let i=wo(),o=lo(),a=po();for(const t of n){const n=e.Un(t.metadata.name);t.document&&(i=i.add(n)),o=o.insert(n,e.qn(t)),a=a.insert(n,e.Kn(t.metadata.readTime))}const c=s.Fn.newChangeBuffer({trackRemovals:!0}),u=await ru(s,function(t){return gi(ai(os.fromString(`__bundle__/docs/${t}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",(t=>eu(t,c,o,es.min(),a).next((e=>(c.apply(t),e))).next((e=>s.Ue.removeMatchingKeysForTargetId(t,u.targetId).next((()=>s.Ue.addMatchingKeys(t,i,u.targetId))).next((()=>s.Mn.En(t,e))).next((()=>e))))))}(this.localStore,new Rh(this.R),this.documents,this.ro.id),e=this.co(this.documents);for(const t of this.queries)await cu(this.localStore,t,e.get(t.name));return this.progress.taskState="Success",new zc(Object.assign({},this.progress),t)}}function Oh(t){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Mh{constructor(t){this.key=t}}class Fh{constructor(t){this.key=t}}class Ph{constructor(t,e){this.query=t,this.uo=e,this.ao=null,this.current=!1,this.ho=wo(),this.mutatedKeys=wo(),this.lo=bi(t),this.fo=new bh(this.lo)}get wo(){return this.uo}_o(t,e){const n=e?e.mo:new Eh,r=e?e.fo:this.fo;let s=e?e.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a=ci(this.query)&&r.size===this.query.limit?r.last():null,c=ui(this.query)&&r.size===this.query.limit?r.first():null;if(t.inorderTraversal(((t,e)=>{const u=r.get(t),h=vi(this.query,e)?e:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.yo(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.lo(h,a)>0||c&&this.lo(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(t):s.delete(t)):(i=i.delete(t),s=s.delete(t)))})),ci(this.query)||ui(this.query))for(;i.size>this.query.limit;){const t=ci(this.query)?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}return{fo:i,mo:n,Nn:o,mutatedKeys:s}}yo(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n){const r=this.fo;this.fo=t.fo,this.mutatedKeys=t.mutatedKeys;const s=t.mo.jr();s.sort(((t,e)=>function(t,e){const n=t=>{switch(t){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Qr()}};return n(t)-n(e)}
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
     */(t.type,e.type)||this.lo(t.doc,e.doc))),this.po(n);const i=e?this.Eo():[],o=0===this.ho.size&&this.current?1:0,a=o!==this.ao;return this.ao=o,0!==s.length||a?{snapshot:new Th(this.query,t.fo,r,s,t.mutatedKeys,0===o,a,!1),To:i}:{To:i}}zr(t){return this.current&&"Offline"===t?(this.current=!1,this.applyChanges({fo:this.fo,mo:new Eh,mutatedKeys:this.mutatedKeys,Nn:!1},!1)):{To:[]}}Io(t){return!this.uo.has(t)&&!!this.fo.has(t)&&!this.fo.get(t).hasLocalMutations}po(t){t&&(t.addedDocuments.forEach((t=>this.uo=this.uo.add(t))),t.modifiedDocuments.forEach((t=>{})),t.removedDocuments.forEach((t=>this.uo=this.uo.delete(t))),this.current=t.current)}Eo(){if(!this.current)return[];const t=this.ho;this.ho=wo(),this.fo.forEach((t=>{this.Io(t.key)&&(this.ho=this.ho.add(t.key))}));const e=[];return t.forEach((t=>{this.ho.has(t)||e.push(new Fh(t))})),this.ho.forEach((n=>{t.has(n)||e.push(new Mh(n))})),e}Ao(t){this.uo=t.Bn,this.ho=wo();const e=this._o(t.documents);return this.applyChanges(e,!0)}Ro(){return Th.fromInitialDocuments(this.query,this.fo,this.mutatedKeys,0===this.ao)}}class Vh{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class Uh{constructor(t){this.key=t,this.Po=!1}}class qh{constructor(t,e,n,r,s,i){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.bo={},this.vo=new Lc((t=>yi(t)),pi),this.Vo=new Map,this.So=new Set,this.Do=new io(Es.comparator),this.Co=new Map,this.No=new hu,this.xo={},this.ko=new Map,this.$o=Ec.Yt(),this.onlineState="Unknown",this.Oo=void 0}get isPrimaryClient(){return!0===this.Oo}}async function Bh(t,e){const n=fl(t);let r,s;const i=n.vo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.Ro();else{const t=await ru(n.localStore,gi(e)),i=n.sharedClientState.addLocalQueryTarget(t.targetId);r=t.targetId,s=await jh(n,e,r,"current"===i),n.isPrimaryClient&&zu(n.remoteStore,t)}return s}async function jh(t,e,n,r){t.Fo=(e,n,r)=>async function(t,e,n,r){let s=e.view._o(n);s.Nn&&(s=await iu(t.localStore,e.query,!1).then((({documents:t})=>e.view._o(t,s))));const i=r&&r.targetChanges.get(e.targetId),o=e.view.applyChanges(s,t.isPrimaryClient,i);return Zh(t,e.targetId,o.To),o.snapshot}(t,e,n,r);const s=await iu(t.localStore,e,!0),i=new Ph(e,s.Bn),o=i._o(s.documents),a=To.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==t.onlineState),c=i.applyChanges(o,t.isPrimaryClient,a);Zh(t,n,c.To);const u=new Vh(e,n,i);return t.vo.set(e,u),t.Vo.has(n)?t.Vo.get(n).push(e):t.Vo.set(n,[e]),c.snapshot}async function $h(t,e){const n=Hr(t),r=n.vo.get(e),s=n.Vo.get(r.targetId);if(s.length>1)return n.Vo.set(r.targetId,s.filter((t=>!pi(t,e)))),void n.vo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await su(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Hu(n.remoteStore,r.targetId),Xh(n,r.targetId)})).catch(Ac)):(Xh(n,r.targetId),await su(n.localStore,r.targetId,!0))}async function Kh(t,e){const n=Hr(t);try{const t=await function(t,e){const n=Hr(t),r=e.snapshotVersion;let s=n.kn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(t=>{const i=n.Fn.newChangeBuffer({trackRemovals:!0});s=n.kn;const o=[];e.targetChanges.forEach(((e,i)=>{const a=s.get(i);if(!a)return;o.push(n.Ue.removeMatchingKeys(t,e.removedDocuments,i).next((()=>n.Ue.addMatchingKeys(t,e.addedDocuments,i))));const c=e.resumeToken;if(c.approximateByteSize()>0){const u=a.withResumeToken(c,r).withSequenceNumber(t.currentSequenceNumber);s=s.insert(i,u),function(t,e,n){return zr(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize()||e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,e)&&o.push(n.Ue.updateTargetData(t,u))}}));let a=lo();if(e.documentUpdates.forEach(((r,s)=>{e.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,r))})),o.push(eu(t,i,e.documentUpdates,r,void 0).next((t=>{a=t}))),!r.isEqual(es.min())){const e=n.Ue.getLastRemoteSnapshotVersion(t).next((e=>n.Ue.setTargetsMetadata(t,t.currentSequenceNumber,r)));o.push(e)}return La.waitFor(o).next((()=>i.apply(t))).next((()=>n.Mn.En(t,a))).next((()=>a))})).then((t=>(n.kn=s,t)))}(n.localStore,e);e.targetChanges.forEach(((t,e)=>{const r=n.Co.get(e);r&&(zr(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?r.Po=!0:t.modifiedDocuments.size>0?zr(r.Po):t.removedDocuments.size>0&&(zr(r.Po),r.Po=!1))})),await nl(n,t,e)}catch(t){await Ac(t)}}function Gh(t,e,n){const r=Hr(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.vo.forEach(((n,r)=>{const s=r.view.zr(e);s.snapshot&&t.push(s.snapshot)})),function(t,e){const n=Hr(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.zr(e)&&(r=!0)})),r&&xh(n)}(r.eventManager,e),t.length&&r.bo._r(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Qh(t,e,n){const r=Hr(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Co.get(e),i=s&&s.key;if(i){let t=new io(Es.comparator);t=t.insert(i,Vs.newNoDocument(i,es.min()));const n=wo().add(i),s=new Eo(es.min(),new Map,new co(Xr),t,n);await Kh(r,s),r.Do=r.Do.remove(i),r.Co.delete(e),el(r)}else await su(r.localStore,e,!1).then((()=>Xh(r,e,n))).catch(Ac)}async function zh(t,e){const n=Hr(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),s=n.Fn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const s=n.batch,i=s.keys();let o=La.resolve();return i.forEach((t=>{o=o.next((()=>r.getEntry(e,t))).next((e=>{const i=n.docVersions.get(t);zr(null!==i),e.version.compareTo(i)<0&&(s.applyToRemoteDocument(e,n),e.isValidDocument()&&r.addEntry(e,n.commitVersion))}))})),o.next((()=>t._n.removeMutationBatch(e,s)))}(n,t,e,s).next((()=>s.apply(t))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(n.localStore,e);Yh(n,r,null),Wh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await nl(n,t)}catch(t){await Ac(t)}}async function Hh(t,e,n){const r=Hr(t);try{const t=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n._n.lookupMutationBatch(t,e).next((e=>(zr(null!==e),r=e.keys(),n._n.removeMutationBatch(t,e)))).next((()=>n._n.performConsistencyCheck(t))).next((()=>n.Mn.pn(t,r)))}))}(r.localStore,e);Yh(r,e,n),Wh(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await nl(r,t)}catch(n){await Ac(n)}}function Wh(t,e){(t.ko.get(e)||[]).forEach((t=>{t.resolve()})),t.ko.delete(e)}function Yh(t,e,n){const r=Hr(t);let s=r.xo[r.currentUser.toKey()];if(s){const t=s.get(e);t&&(n?t.reject(n):t.resolve(),s=s.remove(e)),r.xo[r.currentUser.toKey()]=s}}function Xh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Vo.get(e))t.vo.delete(r),n&&t.bo.Mo(r,n);t.Vo.delete(e),t.isPrimaryClient&&t.No.Zn(e).forEach((e=>{t.No.containsKey(e)||Jh(t,e)}))}function Jh(t,e){t.So.delete(e.path.canonicalString());const n=t.Do.get(e);null!==n&&(Hu(t.remoteStore,n),t.Do=t.Do.remove(e),t.Co.delete(n),el(t))}function Zh(t,e,n){for(const r of n)r instanceof Mh?(t.No.addReference(r.key,e),tl(t,r)):r instanceof Fh?(jr("SyncEngine","Document no longer in limbo: "+r.key),t.No.removeReference(r.key,e),t.No.containsKey(r.key)||Jh(t,r.key)):Qr()}function tl(t,e){const n=e.key,r=n.path.canonicalString();t.Do.get(n)||t.So.has(r)||(jr("SyncEngine","New document in limbo: "+n),t.So.add(r),el(t))}function el(t){for(;t.So.size>0&&t.Do.size<t.maxConcurrentLimboResolutions;){const e=t.So.values().next().value;t.So.delete(e);const n=new Es(os.fromString(e)),r=t.$o.next();t.Co.set(r,new Uh(n)),t.Do=t.Do.insert(n,r),zu(t.remoteStore,new za(gi(ai(n.path)),r,2,Pr.o))}}async function nl(t,e,n){const r=Hr(t),s=[],i=[],o=[];r.vo.isEmpty()||(r.vo.forEach(((t,a)=>{o.push(r.Fo(a,e,n).then((t=>{if(t){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,t.fromCache?"not-current":"current"),s.push(t);const e=Wc.vn(a.targetId,t);i.push(e)}})))})),await Promise.all(o),r.bo._r(s),await async function(t,e){const n=Hr(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>La.forEach(e,(e=>La.forEach(e.Pn,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>La.forEach(e.bn,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!Va(t))throw t;jr("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.kn.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.kn=n.kn.insert(e,s)}}}(r.localStore,i))}async function rl(t,e){const n=Hr(t);if(!n.currentUser.isEqual(e)){jr("SyncEngine","User change. New user:",e.toKey());const t=await Zc(n.localStore,e);n.currentUser=e,function(t,e){t.ko.forEach((t=>{t.forEach((t=>{t.reject(new Ur(Vr.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.ko.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await nl(n,t.Ln)}}function sl(t,e){const n=Hr(t),r=n.Co.get(e);if(r&&r.Po)return wo().add(r.key);{let t=wo();const r=n.Vo.get(e);if(!r)return t;for(const e of r){const r=n.vo.get(e);t=t.unionWith(r.view.wo)}return t}}async function il(t,e){const n=Hr(t),r=await iu(n.localStore,e.query,!0),s=e.view.Ao(r);return n.isPrimaryClient&&Zh(n,e.targetId,s.To),s}async function ol(t){const e=Hr(t);return au(e.localStore).then((t=>nl(e,t)))}async function al(t,e,n,r){const s=Hr(t),i=await function(t,e){const n=Hr(t),r=Hr(n._n);return n.persistence.runTransaction("Lookup mutation documents","readonly",(t=>r.jt(t,e).next((e=>e?n.Mn.pn(t,e):La.resolve(null)))))}(s.localStore,e);null!==i?("pending"===n?await oh(s.remoteStore):"acknowledged"===n||"rejected"===n?(Yh(s,e,r||null),Wh(s,e),function(t,e){Hr(Hr(t)._n).Gt(e)}(s.localStore,e)):Qr(),await nl(s,i)):jr("SyncEngine","Cannot apply mutation batch with id: "+e)}async function cl(t,e,n){const r=Hr(t),s=[],i=[];for(const t of e){let e;const n=r.Vo.get(t);if(n&&0!==n.length){e=await ru(r.localStore,gi(n[0]));for(const t of n){const e=r.vo.get(t),n=await il(r,e);n.snapshot&&i.push(n.snapshot)}}else{const n=await ou(r.localStore,t);e=await ru(r.localStore,n),await jh(r,ul(n),t,!1)}s.push(e)}return r.bo._r(i),s}function ul(t){return oi(t.path,t.collectionGroup,t.orderBy,t.filters,t.limit,"F",t.startAt,t.endAt)}function hl(t){const e=Hr(t);return Hr(Hr(e.localStore).persistence).fn()}async function ll(t,e,n,r){const s=Hr(t);if(s.Oo)jr("SyncEngine","Ignoring unexpected query state notification.");else if(s.Vo.has(e))switch(n){case"current":case"not-current":{const t=await au(s.localStore),r=Eo.createSynthesizedRemoteEventForCurrentChange(e,"current"===n);await nl(s,t,r);break}case"rejected":await su(s.localStore,e,!0),Xh(s,e,r);break;default:Qr()}}async function dl(t,e,n){const r=fl(t);if(r.Oo){for(const t of e){if(r.Vo.has(t)){jr("SyncEngine","Adding an already active target "+t);continue}const e=await ou(r.localStore,t),n=await ru(r.localStore,e);await jh(r,ul(e),n.targetId,!1),zu(r.remoteStore,n)}for(const t of n)r.Vo.has(t)&&await su(r.localStore,t,!1).then((()=>{Hu(r.remoteStore,t),Xh(r,t)})).catch(Ac)}}function fl(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Kh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=sl.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Qh.bind(null,e),e.bo._r=Dh.bind(null,e.eventManager),e.bo.Mo=Nh.bind(null,e.eventManager),e}function gl(t){const e=Hr(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=zh.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Hh.bind(null,e),e}class ml{constructor(){this.synchronizeTabs=!1}async initialize(t){this.R=Pu(t.databaseInfo.databaseId),this.sharedClientState=this.Bo(t),this.persistence=this.Uo(t),await this.persistence.start(),this.gcScheduler=this.qo(t),this.localStore=this.Ko(t)}qo(t){return null}Ko(t){return Jc(this.persistence,new Yc,t.initialUser,this.R)}Uo(t){return new pu(wu.Ps,this.R)}Bo(t){return new xu}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class pl extends ml{constructor(t,e,n){super(),this.Qo=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await async function(t){const e=Hr(t);return e.persistence.runTransaction("Synchronize last document change read time","readonly",(t=>function(t){const e=Vc(t);let n=es.min();return e.Ot({index:ba.readTimeIndex,reverse:!0},((t,e,r)=>{e.readTime&&(n=Ja(e.readTime)),r.done()})).next((()=>n))}(t))).then((t=>{e.On=t}))}(this.localStore),await this.Qo.initialize(this,t),await gl(this.Qo.syncEngine),await oh(this.Qo.remoteStore)}Ko(t){return Jc(this.persistence,new Yc,t.initialUser,this.R)}qo(t){const e=this.persistence.referenceDelegate.garbageCollector;return new xc(e,t.asyncQueue)}Uo(t){const e=Qc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=void 0!==this.cacheSizeBytes?fc.withCacheSize(this.cacheSizeBytes):fc.DEFAULT;return new $c(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Mu(),Fu(),this.R,this.sharedClientState,!!this.forceOwnership)}Bo(t){return new xu}}class yl extends pl{constructor(t,e){super(t,e,!1),this.Qo=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Qo.syncEngine;this.sharedClientState instanceof Nu&&(this.sharedClientState.syncEngine={ui:al.bind(null,e),ai:ll.bind(null,e),hi:dl.bind(null,e),fn:hl.bind(null,e),ci:ol.bind(null,e)},await this.sharedClientState.start()),await this.persistence.He((async t=>{await async function(t,e){const n=Hr(t);if(fl(n),gl(n),!0===e&&!0!==n.Oo){const t=n.sharedClientState.getAllActiveQueryTargets(),e=await cl(n,t.toArray());n.Oo=!0,await mh(n.remoteStore,!0);for(const t of e)zu(n.remoteStore,t)}else if(!1===e&&!1!==n.Oo){const t=[];let e=Promise.resolve();n.Vo.forEach(((r,s)=>{n.sharedClientState.isLocalQueryTarget(s)?t.push(s):e=e.then((()=>(Xh(n,s),su(n.localStore,s,!0)))),Hu(n.remoteStore,s)})),await e,await cl(n,t),function(t){const e=Hr(t);e.Co.forEach(((t,n)=>{Hu(e.remoteStore,n)})),e.No.ts(),e.Co=new Map,e.Do=new io(Es.comparator)}(n),n.Oo=!1,await mh(n.remoteStore,!1)}}(this.Qo.syncEngine,t),this.gcScheduler&&(t&&!this.gcScheduler.started?this.gcScheduler.start(this.localStore):t||this.gcScheduler.stop())}))}Bo(t){const e=Mu();if(!Nu.gt(e))throw new Ur(Vr.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Qc(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Nu(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class wl{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>Gh(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=rl.bind(null,this.syncEngine),await mh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new _h}createDatastore(t){const e=Pu(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Ou(r));var r;return function(t,e,n){return new ju(t,e,n)}(t.credentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,s=t=>Gh(this.syncEngine,t,0),i=ku.gt()?new ku:new Cu,new Ku(e,n,r,s,i);var e,n,r,s,i}createSyncEngine(t,e){return function(t,e,n,r,s,i,o){const a=new qh(t,e,n,r,s,i);return o&&(a.Oo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Hr(t);jr("RemoteStore","RemoteStore shutting down."),e.Fr.add(5),await Qu(e),e.Lr.shutdown(),e.Br.set("Unknown")}(this.remoteStore)}}
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
     */class Tl{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new Ur(Vr.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(t,e){const n=Hr(t),r=$o(n.R)+"/documents",s={documents:e.map((t=>Uo(n.R,t)))},i=await n.Oi("BatchGetDocuments",r,s),o=new Map;i.forEach((t=>{const e=function(t,e){return"found"in e?function(t,e){zr(!!e.found),e.found.name,e.found.updateTime;const n=qo(t,e.found.name),r=Fo(e.found.updateTime),s=new Fs({mapValue:{fields:e.found.fields}});return Vs.newFoundDocument(n,r,s)}(t,e):"missing"in e?function(t,e){zr(!!e.missing),zr(!!e.readTime);const n=qo(t,e.missing),r=Fo(e.readTime);return Vs.newNoDocument(n,r)}(t,e):Qr()}(n.R,t);o.set(e.key.toString(),e)}));const a=[];return e.forEach((t=>{const e=o.get(t.toString());zr(!!e),a.push(e)})),a}(this.datastore,t);return e.forEach((t=>this.recordVersion(t))),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(t){this.lastWriteError=t}this.writtenDocs.add(t.toString())}delete(t){this.write(new Ji(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach((e=>{t.delete(e.key.toString())})),t.forEach(((t,e)=>{const n=Es.fromPath(e);this.mutations.push(new Zi(n,this.precondition(n)))})),await async function(t,e){const n=Hr(t),r=$o(n.R)+"/documents",s={writes:e.map((t=>zo(n.R,t)))};await n.Ni("Commit",r,s)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw Qr();e=es.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new Ur(Vr.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?Ui.updateTime(e):Ui.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(es.min()))throw new Ur(Vr.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ui.updateTime(e)}return Ui.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}
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
     */class Il{constructor(t,e,n,r){this.asyncQueue=t,this.datastore=e,this.updateFunction=n,this.deferred=r,this.ec=5,this.Zi=new Vu(this.asyncQueue,"transaction_retry")}run(){this.ec-=1,this.nc()}nc(){this.Zi.ji((async()=>{const t=new Tl(this.datastore),e=this.sc(t);e&&e.then((e=>{this.asyncQueue.enqueueAndForget((()=>t.commit().then((()=>{this.deferred.resolve(e)})).catch((t=>{this.ic(t)}))))})).catch((t=>{this.ic(t)}))}))}sc(t){try{const e=this.updateFunction(t);return!ws(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}ic(t){this.ec>0&&this.rc(t)?(this.ec-=1,this.asyncQueue.enqueueAndForget((()=>(this.nc(),Promise.resolve())))):this.deferred.reject(t)}rc(t){if("FirebaseError"===t.name){const e=t.code;return"aborted"===e||"failed-precondition"===e||!ro(e)}return!1}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class _l{constructor(t,e,n){this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=vu.UNAUTHENTICATED,this.clientId=Yr.u(),this.credentialListener=()=>Promise.resolve(),this.credentials.setChangeListener(e,(async t=>{jr("FirestoreClient","Received user=",t.uid),await this.credentialListener(t),this.user=t}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.credentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Ur(Vr.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Ra;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.removeChangeListener(),t.resolve()}catch(e){const n=vh(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function Sl(t,e){t.asyncQueue.verifyOperationInProgress(),jr("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await Zc(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t.offlineComponents=e}async function Al(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Dl(t);jr("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>async function(t,e){const n=Hr(t);n.asyncQueue.verifyOperationInProgress(),jr("RemoteStore","RemoteStore received new credentials");const r=Zu(n);n.Fr.add(3),await Qu(n),r&&n.Br.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Fr.delete(3),await Gu(n)}(e.remoteStore,t))),t.onlineComponents=e}async function Dl(t){return t.offlineComponents||(jr("FirestoreClient","Using default OfflineComponentProvider"),await Sl(t,new ml)),t.offlineComponents}async function Nl(t){return t.onlineComponents||(jr("FirestoreClient","Using default OnlineComponentProvider"),await Al(t,new wl)),t.onlineComponents}function xl(t){return Dl(t).then((t=>t.persistence))}function Cl(t){return Dl(t).then((t=>t.localStore))}function kl(t){return Nl(t).then((t=>t.remoteStore))}function Rl(t){return Nl(t).then((t=>t.syncEngine))}async function Ll(t){const e=await Nl(t),n=e.eventManager;return n.onListen=Bh.bind(null,e.syncEngine),n.onUnlisten=$h.bind(null,e.syncEngine),n}function Ol(t,e,n={}){const r=new Ra;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new bl({next:i=>{e.enqueueAndForget((()=>Ah(t,o)));const a=i.docs.has(n);!a&&i.fromCache?s.reject(new Ur(Vr.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&i.fromCache&&r&&"server"===r.source?s.reject(new Ur(Vr.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(i)},error:t=>s.reject(t)}),o=new Ch(ai(n.path),i,{includeMetadataChanges:!0,so:!0});return Sh(t,o)}(await Ll(t),t.asyncQueue,e,n,r))),r.promise}function Ml(t,e,n={}){const r=new Ra;return t.asyncQueue.enqueueAndForget((async()=>function(t,e,n,r,s){const i=new bl({next:n=>{e.enqueueAndForget((()=>Ah(t,o))),n.fromCache&&"server"===r.source?s.reject(new Ur(Vr.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:t=>s.reject(t)}),o=new Ch(n,i,{includeMetadataChanges:!0,so:!0});return Sh(t,o)}(await Ll(t),t.asyncQueue,e,n,r))),r.promise}function Fl(t,e,n,r){const s=function(t,e){let n;return n="string"==typeof t?(new TextEncoder).encode(t):t,function(t,e){return new El(t,e)}(function(t,e){if(t instanceof Uint8Array)return vl(t,e);if(t instanceof ArrayBuffer)return vl(new Uint8Array(t),e);if(t instanceof ReadableStream)return t.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(n),e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(n,Pu(e));t.asyncQueue.enqueueAndForget((async()=>{!function(t,e,n){const r=Hr(t);(async function(t,e,n){try{const r=await e.getMetadata();if(await function(t,e){const n=Hr(t),r=Fo(e.createTime);return n.persistence.runTransaction("hasNewerBundle","readonly",(t=>n.Ke.getBundleMetadata(t,e.id))).then((t=>!!t&&t.createTime.compareTo(r)>=0))}(t.localStore,r))return await e.close(),void n._completeWith(function(t){return{taskState:"Success",documentsLoaded:t.totalDocuments,bytesLoaded:t.totalBytes,totalDocuments:t.totalDocuments,totalBytes:t.totalBytes}}(r));n._updateProgress(Oh(r));const s=new Lh(r,t.localStore,e.R);let i=await e.Lo();for(;i;){const t=await s.oo(i);t&&n._updateProgress(t),i=await e.Lo()}const o=await s.complete();await nl(t,o.wn,void 0),await function(t,e){const n=Hr(t);return n.persistence.runTransaction("Save bundle","readwrite",(t=>n.Ke.saveBundleMetadata(t,e)))}(t.localStore,r),n._completeWith(o.progress)}catch(t){Kr("SyncEngine",`Loading bundle failed with ${t}`),n._failWith(t)}}
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
     */)(r,e,n).then((()=>{r.sharedClientState.notifyBundleLoaded()}))}(await Rl(t),s,r)}))}class Pl{constructor(t,e,n,r,s,i,o,a){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class Vl{constructor(t,e){this.projectId=t,this.database=e||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Vl&&t.projectId===this.projectId&&t.database===this.database}}
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
     */class ql{constructor(t,e){this.user=e,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${t}`}}class Bl{constructor(){this.changeListener=null}getToken(){return Promise.resolve(null)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(vu.UNAUTHENTICATED)))}removeChangeListener(){this.changeListener=null}}class jl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}setChangeListener(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}removeChangeListener(){this.changeListener=null}}class $l{constructor(t){this.currentUser=vu.UNAUTHENTICATED,this.oc=new Ra,this.cc=0,this.forceRefresh=!1,this.auth=null,this.asyncQueue=null,this.uc=()=>{this.cc++,this.currentUser=this.ac(),this.oc.resolve(),this.changeListener&&this.asyncQueue.enqueueRetryable((()=>this.changeListener(this.currentUser)))};const e=t=>{jr("FirebaseCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.uc)};t.onInit((t=>e(t))),setTimeout((()=>{if(!this.auth){const n=t.getImmediate({optional:!0});n?e(n):(jr("FirebaseCredentialsProvider","Auth not yet detected"),this.oc.resolve())}}),0)}getToken(){const t=this.cc,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.cc!==t?(jr("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(zr("string"==typeof e.accessToken),new ql(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}setChangeListener(t,e){this.asyncQueue=t,this.asyncQueue.enqueueRetryable((async()=>{await this.oc.promise,await e(this.currentUser),this.changeListener=e}))}removeChangeListener(){this.auth&&this.auth.removeAuthTokenListener(this.uc),this.changeListener=()=>Promise.resolve()}ac(){const t=this.auth&&this.auth.getUid();return zr(null===t||"string"==typeof t),new vu(t)}}class Kl{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n,this.type="FirstParty",this.user=vu.FIRST_PARTY}get authHeaders(){const t={"X-Goog-AuthUser":this.lc},e=this.hc.auth.getAuthHeaderValueForFirstParty([]);return e&&(t.Authorization=e),this.fc&&(t["X-Goog-Iam-Authorization-Token"]=this.fc),t}}class Gl{constructor(t,e,n){this.hc=t,this.lc=e,this.fc=n}getToken(){return Promise.resolve(new Kl(this.hc,this.lc,this.fc))}setChangeListener(t,e){t.enqueueRetryable((()=>e(vu.FIRST_PARTY)))}removeChangeListener(){}invalidateToken(){}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */class Zl{constructor(t,e){this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jl({}),this._settingsFrozen=!1,t instanceof Vl?(this._databaseId=t,this._credentials=new Bl):(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Ur(Vr.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vl(t.options.projectId)}(t),this._credentials=new $l(e))}get app(){if(!this._app)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jl(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new Bl;switch(t.type){case"gapi":const e=t.client;return zr(!("object"!=typeof e||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Gl(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new Ur(Vr.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Ul.get(t);e&&(jr("ComponentProvider","Removing Datastore"),Ul.delete(t),e.terminate())}(this),Promise.resolve()}}function td(t,e,n,r={}){const s=(t=Yl(t,Zl))._getSettings();if("firestore.googleapis.com"!==s.host&&s.host!==e&&Kr("Host has been set in both settings() and useEmulator(), emulator host will be used"),t._setSettings(Object.assign(Object.assign({},s),{host:`${e}:${n}`,ssl:!1})),r.mockUserToken){const e=
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
function(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var n=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var o=i({iss:"https://securetoken.google.com/"+n,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[a.encodeString(JSON.stringify({alg:"none",type:"JWT"}),!1),a.encodeString(JSON.stringify(o),!1),""].join(".")}(r.mockUserToken),n=r.mockUserToken.sub||r.mockUserToken.user_id;if(!n)throw new Ur(Vr.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");t._credentials=new jl(new ql(e,new vu(n)))}}
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
     */}class cd{constructor(){this.dc=Promise.resolve(),this.wc=[],this._c=!1,this.mc=[],this.gc=null,this.yc=!1,this.Ec=[],this.Zi=new Vu(this,"async_queue_retry"),this.Tc=()=>{const t=Fu();t&&jr("AsyncQueue","Visibility state changed to "+t.visibilityState),this.Zi.Gi()};const t=Fu();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Tc)}get isShuttingDown(){return this._c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Ic(),this.Ac(t)}enterRestrictedMode(){if(!this._c){this._c=!0;const t=Fu();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Tc)}}enqueue(t){return this.Ic(),this._c?new Promise((t=>{})):this.Ac(t)}enqueueRetryable(t){this.enqueueAndForget((()=>(this.wc.push(t),this.Rc())))}async Rc(){if(0!==this.wc.length){try{await this.wc[0](),this.wc.shift(),this.Zi.reset()}catch(t){if(!Va(t))throw t;jr("AsyncQueue","Operation failed with retryable error: "+t)}this.wc.length>0&&this.Zi.ji((()=>this.Rc()))}}Ac(t){const e=this.dc.then((()=>(this.yc=!0,t().catch((t=>{throw this.gc=t,this.yc=!1,$r("INTERNAL UNHANDLED ERROR: ",function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t)),t})).then((t=>(this.yc=!1,t))))));return this.dc=e,e}enqueueAfterDelay(t,e,n){this.Ic(),this.Ec.indexOf(t)>-1&&(e=0);const r=wh.createAndSchedule(this,t,e,n,(t=>this.Pc(t)));return this.mc.push(r),r}Ic(){this.gc&&Qr()}verifyOperationInProgress(){}async bc(){let t;do{t=this.dc,await t}while(t!==this.dc)}vc(t){for(const e of this.mc)if(e.timerId===t)return!0;return!1}Vc(t){return this.bc().then((()=>{this.mc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.mc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.bc()}))}Sc(t){this.Ec.push(t)}Pc(t){const e=this.mc.indexOf(t);this.mc.splice(e,1)}}function ud(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of["next","error","complete"])if(t in n&&"function"==typeof n[t])return!0;return!1}
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
     */class ld extends Zl{constructor(t,e){super(t,e),this.type="firestore",this._queue=new cd,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||fd(this),this._firestoreClient.terminate()}}function dd(t){return t._firestoreClient||fd(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function fd(t){var e;const n=t._freezeSettings(),r=function(t,e,n,r){return new Pl(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new _l(t._credentials,t._queue,r)}function gd(t,e,n){const r=new Ra;return t.asyncQueue.enqueue((async()=>{try{await Sl(t,n),await Al(t,e),r.resolve()}catch(t){if(!function(t){return"FirebaseError"===t.name?t.code===Vr.FAILED_PRECONDITION||t.code===Vr.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||(22===t.code||20===t.code||11===t.code)}(t))throw t;console.warn("Error enabling offline persistence. Falling back to persistence disabled: "+t),r.reject(t)}})).then((()=>r.promise))}function md(t){return function(t){const e=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e){const n=Hr(t);Zu(n.remoteStore)||jr("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const t=await function(t){const e=Hr(t);return e.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(t=>e._n.getHighestUnacknowledgedBatchId(t)))}(n.localStore);if(-1===t)return void e.resolve();const r=n.ko.get(t)||[];r.push(e),n.ko.set(t,r)}catch(t){const n=vh(t,"Initialization of waitForPendingWrites() operation failed");e.reject(n)}}(await Rl(t),e))),e.promise}(dd(t=Yl(t,ld)))}function pd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await xl(t),n=await kl(t);return e.setNetworkEnabled(!0),function(t){const e=Hr(t);return e.Fr.delete(0),Gu(e)}(n)}))}(dd(t=Yl(t,ld)))}function yd(t){return function(t){return t.asyncQueue.enqueue((async()=>{const e=await xl(t),n=await kl(t);return e.setNetworkEnabled(!1),async function(t){const e=Hr(t);e.Fr.add(0),await Qu(e),e.Br.set("Offline")}(n)}))}(dd(t=Yl(t,ld)))}function wd(t,e){return function(t,e){return t.asyncQueue.enqueue((async()=>function(t,e){const n=Hr(t);return n.persistence.runTransaction("Get named query","readonly",(t=>n.Ke.getNamedQuery(t,e)))}(await Cl(t),e)))}(dd(t=Yl(t,ld)),e).then((e=>e?new nd(t,null,e.query):null))}function vd(t){if(t._initialized||t._terminated)throw new Ur(Vr.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}
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
     */const _d=/^__.*__$/;class Sd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new Hi(t,this.data,this.fieldMask,e,this.fieldTransforms):new zi(t,this.data,e,this.fieldTransforms)}}class Ad{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new Hi(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Dd(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Qr()}}class Nd{constructor(t,e,n,r,s,i){this.settings=t,this.databaseId=e,this.R=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Dc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Cc(){return this.settings.Cc}Nc(t){return new Nd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.R,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}xc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.$c(t),r}Oc(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.Nc({path:n,kc:!1});return r.Dc(),r}Fc(t){return this.Nc({path:void 0,kc:!0})}Mc(t){return Hd(t,this.settings.methodName,this.settings.Lc||!1,this.path,this.settings.Bc)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}Dc(){if(this.path)for(let t=0;t<this.path.length;t++)this.$c(this.path.get(t))}$c(t){if(0===t.length)throw this.Mc("Document fields must not be empty");if(Dd(this.Cc)&&_d.test(t))throw this.Mc('Document fields cannot begin and end with "__"')}}class xd{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.R=n||Pu(t)}Uc(t,e,n,r=!1){return new Nd({Cc:t,methodName:e,Bc:n,path:cs.emptyPath(),kc:!1,Lc:r},this.databaseId,this.R,this.ignoreUndefinedProperties)}}function Cd(t){const e=t._freezeSettings(),n=Pu(t._databaseId);return new xd(t._databaseId,!!e.ignoreUndefinedProperties,n)}function kd(t,e,n,r,s,i={}){const o=t.Uc(i.merge||i.mergeFields?2:0,e,n,s);Kd("Data must be an object, but it was:",o,r);const a=jd(r,o);let c,u;if(i.merge)c=new us(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const t=[];for(const r of i.mergeFields){const s=Gd(e,r,n);if(!o.contains(s))throw new Ur(Vr.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Wd(t,s)||t.push(s)}c=new us(t),u=o.fieldTransforms.filter((t=>c.covers(t.field)))}else c=null,u=o.fieldTransforms;return new Sd(new Fs(a),c,u)}class Rd extends Td{_toFieldTransform(t){if(2!==t.Cc)throw 1===t.Cc?t.Mc(`${this._methodName}() can only appear at the top level of your update data`):t.Mc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof Rd}}function Ld(t,e,n){return new Nd({Cc:3,Bc:e.settings.Bc,methodName:t._methodName,kc:n},e.databaseId,e.R,e.ignoreUndefinedProperties)}class Od extends Td{_toFieldTransform(t){return new Pi(t.path,new xi)}isEqual(t){return t instanceof Od}}class Md extends Td{constructor(t,e){super(t),this.qc=e}_toFieldTransform(t){const e=Ld(this,t,!0),n=this.qc.map((t=>Bd(t,e))),r=new Ci(n);return new Pi(t.path,r)}isEqual(t){return this===t}}class Fd extends Td{constructor(t,e){super(t),this.qc=e}_toFieldTransform(t){const e=Ld(this,t,!0),n=this.qc.map((t=>Bd(t,e))),r=new Ri(n);return new Pi(t.path,r)}isEqual(t){return this===t}}class Pd extends Td{constructor(t,e){super(t),this.Kc=e}_toFieldTransform(t){const e=new Oi(t.R,_i(t.R,this.Kc));return new Pi(t.path,e)}isEqual(t){return this===t}}function Vd(t,e,n,r){const s=t.Uc(1,e,n);Kd("Data must be an object, but it was:",s,r);const i=[],o=Fs.empty();rs(r,((t,r)=>{const a=zd(e,t,n);r=f(r);const c=s.Oc(a);if(r instanceof Rd)i.push(a);else{const t=Bd(r,c);null!=t&&(i.push(a),o.set(a,t))}}));const a=new us(i);return new Ad(o,a,s.fieldTransforms)}function Ud(t,e,n,r,s,i){const o=t.Uc(1,e,n),a=[Gd(e,r,n)],c=[s];if(i.length%2!=0)throw new Ur(Vr.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let t=0;t<i.length;t+=2)a.push(Gd(e,i[t])),c.push(i[t+1]);const u=[],h=Fs.empty();for(let t=a.length-1;t>=0;--t)if(!Wd(u,a[t])){const e=a[t];let n=c[t];n=f(n);const r=o.Oc(e);if(n instanceof Rd)u.push(e);else{const t=Bd(n,r);null!=t&&(u.push(e),h.set(e,t))}}const l=new us(u);return new Ad(h,l,o.fieldTransforms)}function qd(t,e,n,r=!1){return Bd(n,t.Uc(r?4:3,e))}function Bd(t,e){if($d(t=f(t)))return Kd("Unsupported field value:",e,t),jd(t,e);if(t instanceof Td)return function(t,e){if(!Dd(e.Cc))throw e.Mc(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e.Mc(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.kc&&4!==e.Cc)throw e.Mc("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const s of t){let t=Bd(s,e.Fc(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=f(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return _i(e.R,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=ts.fromDate(t);return{timestampValue:Lo(e.R,n)}}if(t instanceof ts){const n=new ts(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Lo(e.R,n)}}if(t instanceof Id)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Ed)return{bytesValue:Oo(e.R,t._byteString)};if(t instanceof ed){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e.Mc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Po(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e.Mc(`Unsupported field value: ${Wl(t)}`)}(t,e)}function jd(t,e){const n={};return ss(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):rs(t,((t,r)=>{const s=Bd(r,e.xc(t));null!=s&&(n[t]=s)})),{mapValue:{fields:n}}}function $d(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof ts||t instanceof Id||t instanceof Ed||t instanceof ed||t instanceof Td)}function Kd(t,e,n){if(!$d(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Wl(n);throw"an object"===r?e.Mc(t+" a custom object"):e.Mc(t+" "+r)}}function Gd(t,e,n){if((e=f(e))instanceof bd)return e._internalPath;if("string"==typeof e)return zd(t,e);throw Hd("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Qd=new RegExp("[~\\*/\\[\\]]");function zd(t,e,n){if(e.search(Qd)>=0)throw Hd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new bd(...e.split("."))._internalPath}catch(r){throw Hd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Hd(t,e,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Ur(Vr.INVALID_ARGUMENT,a+t+c)}function Wd(t,e){return t.some((t=>t.isEqual(e)))}
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
     */class Zd{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class tf extends Yd{constructor(t,e,n,r,s,i){super(t,e,n,r,i),this._firestore=t,this._firestoreImpl=t,this.metadata=s}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ef(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(Jd("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}}class ef extends tf{data(t={}){return super.data(t)}}class nf{constructor(t,e,n,r){this._firestore=t,this._userDataWriter=e,this._snapshot=r,this.metadata=new Zd(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(t,e){this._snapshot.docs.forEach((n=>{t.call(e,new ef(this._firestore,this._userDataWriter,n.key,n,new Zd(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new Ur(Vr.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(t,e){if(t._snapshot.oldDocs.isEmpty()){let e=0;return t._snapshot.docChanges.map((n=>({type:"added",doc:new ef(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Zd(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:e++})))}{let n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter((t=>e||3!==t.type)).map((e=>{const r=new ef(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Zd(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);let s=-1,i=-1;return 0!==e.type&&(s=n.indexOf(e.doc.key),n=n.delete(e.doc.key)),1!==e.type&&(n=n.add(e.doc),i=n.indexOf(e.doc.key)),{type:rf(e.type),doc:r,oldIndex:s,newIndex:i}}))}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function rf(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Qr()}}function sf(t,e){return t instanceof tf&&e instanceof tf?t._firestore===e._firestore&&t._key.isEqual(e._key)&&(null===t._document?null===e._document:t._document.isEqual(e._document))&&t._converter===e._converter:t instanceof nf&&e instanceof nf&&t._firestore===e._firestore&&ad(t.query,e.query)&&t.metadata.isEqual(e.metadata)&&t._snapshot.isEqual(e._snapshot)}
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
     */function of(t){if(ui(t)&&0===t.explicitOrderBy.length)throw new Ur(Vr.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class af{}function cf(t,...e){for(const n of e)t=n._apply(t);return t}class uf extends af{constructor(t,e,n){super(),this.Qc=t,this.jc=e,this.Wc=n,this.type="where"}_apply(t){const e=Cd(t.firestore),n=function(t,e,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);if("in"===i||"not-in"===i){pf(o,i);const e=[];for(const n of o)e.push(mf(r,t,n));a={arrayValue:{values:e}}}else a=mf(r,t,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||pf(o,i),a=qd(n,"where",o,"in"===i||"not-in"===i);const c=Ks.create(s,i,a);return function(t,e){if(e.g()){const n=li(t);if(null!==n&&!n.isEqual(e.field))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);const r=hi(t);null!==r&&yf(t,e.field,r)}const n=function(t,e){for(const n of t.filters)if(e.indexOf(n.op)>=0)return n.op;return null}(t,function(t){switch(t){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(null!==n)throw n===e.op?new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}(t,c),c}(t._query,0,e,t.firestore._databaseId,this.Qc,this.jc,this.Wc);return new nd(t.firestore,t.converter,function(t,e){const n=t.filters.concat([e]);return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}(t._query,n))}}class hf extends af{constructor(t,e){super(),this.Qc=t,this.Gc=e,this.type="orderBy"}_apply(t){const e=function(t,e,n){if(null!==t.startAt)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==t.endAt)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new ei(e,n);return function(t,e){if(null===hi(t)){const n=li(t);null!==n&&yf(t,n,e.field)}}(t,r),r}(t._query,this.Qc,this.Gc);return new nd(t.firestore,t.converter,function(t,e){const n=t.explicitOrderBy.concat([e]);return new ii(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(t._query,e))}}class lf extends af{constructor(t,e,n){super(),this.type=t,this.zc=e,this.Hc=n}_apply(t){return new nd(t.firestore,t.converter,mi(t._query,this.zc,this.Hc))}}class df extends af{constructor(t,e,n){super(),this.type=t,this.Jc=e,this.Yc=n}_apply(t){const e=gf(t,this.type,this.Jc,this.Yc);return new nd(t.firestore,t.converter,function(t,e){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,e,t.endAt)}(t._query,e))}}class ff extends af{constructor(t,e,n){super(),this.type=t,this.Jc=e,this.Yc=n}_apply(t){const e=gf(t,this.type,this.Jc,this.Yc);return new nd(t.firestore,t.converter,function(t,e){return new ii(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,e)}(t._query,e))}}function gf(t,e,n,r){if(n[0]=f(n[0]),n[0]instanceof Yd)return function(t,e,n,r,s){if(!r)throw new Ur(Vr.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${n}().`);const i=[];for(const n of fi(t))if(n.field.isKeyField())i.push(xs(e,r.key));else{const t=r.data.field(n.field);if(ms(t))throw new Ur(Vr.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+n.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(null===t){const t=n.field.canonicalString();throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`)}i.push(t)}return new Zs(i,s)}(t._query,t.firestore._databaseId,e,n[0]._document,r);{const s=Cd(t.firestore);return function(t,e,n,r,s,i){const o=t.explicitOrderBy;if(s.length>o.length)throw new Ur(Vr.INVALID_ARGUMENT,`Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const a=[];for(let i=0;i<s.length;i++){const c=s[i];if(o[i].field.isKeyField()){if("string"!=typeof c)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);if(!di(t)&&-1!==c.indexOf("/"))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);const n=t.path.child(os.fromString(c));if(!Es.isDocumentKey(n))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);const s=new Es(n);a.push(xs(e,s))}else{const t=qd(n,r,c);a.push(t)}}return new Zs(a,i)}(t._query,t.firestore._databaseId,s,e,n,r)}}function mf(t,e,n){if("string"==typeof(n=f(n))){if(""===n)throw new Ur(Vr.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!di(e)&&-1!==n.indexOf("/"))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(os.fromString(n));if(!Es.isDocumentKey(r))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return xs(t,new Es(r))}if(n instanceof ed)return xs(t,n._key);throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wl(n)}.`)}function pf(t,e){if(!Array.isArray(t)||0===t.length)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function yf(t,e,n){if(!n.isEqual(e))throw new Ur(Vr.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}
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
     */class wf{convertValue(t,e="none"){switch(Ts(t)){case 0:return null;case 1:return t.booleanValue;case 2:return fs(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(gs(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw Qr()}}convertObject(t,e){const n={};return rs(t.fields,((t,r)=>{n[t]=this.convertValue(r,e)})),n}convertGeoPoint(t){return new Id(fs(t.latitude),fs(t.longitude))}convertArray(t,e){return(t.values||[]).map((t=>this.convertValue(t,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const n=ps(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(ys(t));default:return null}}convertTimestamp(t){const e=ds(t);return new ts(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=os.fromString(t);zr(ca(n));const r=new Vl(n.get(1),n.get(3)),s=new Es(n.popFirst(5));return r.isEqual(e)||$r(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),s}}
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
     */class If extends wf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ed(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ed(this.firestore,null,e)}}function _f(t){t=Yl(t,ed);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await function(t,e){const n=Hr(t);return n.persistence.runTransaction("read document","readonly",(t=>n.Mn.mn(t,e)))}(t,e);r.isFoundDocument()?n.resolve(r):r.isNoDocument()?n.resolve(null):n.reject(new Ur(Vr.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(t){const r=vh(t,`Failed to get document '${e} from cache`);n.reject(r)}}(await Cl(t),e,n))),n.promise}(n,t._key).then((n=>new tf(e,r,t._key,n,new Zd(null!==n&&n.hasLocalMutations,!0),t.converter)))}function Sf(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){try{const r=await iu(t,e,!0),s=new Ph(e,r.Bn),i=s._o(r.documents),o=s.applyChanges(i,!1);n.resolve(o.snapshot)}catch(t){const r=vh(t,`Failed to execute query '${e} against cache`);n.reject(r)}}(await Cl(t),e,n))),n.promise}(n,t._query).then((n=>new nf(e,r,t,n)))}function Af(t,e,n,...r){t=Yl(t,ed);const s=Yl(t.firestore,ld),i=Cd(s);let o;return o="string"==typeof(e=f(e))||e instanceof bd?Ud(i,"updateDoc",t._key,e,n,r):Vd(i,"updateDoc",t._key,e),xf(s,[o.toMutation(t._key,Ui.exists(!0))])}function Df(t,...e){var n,r,s;t=f(t);let i={includeMetadataChanges:!1},o=0;"object"!=typeof e[o]||ud(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ud(e[o])){const t=e[o];e[o]=null===(n=t.next)||void 0===n?void 0:n.bind(t),e[o+1]=null===(r=t.error)||void 0===r?void 0:r.bind(t),e[o+2]=null===(s=t.complete)||void 0===s?void 0:s.bind(t)}let c,u,h;if(t instanceof ed)u=Yl(t.firestore,ld),h=ai(t._key.path),c={next:n=>{e[o]&&e[o](Cf(u,t,n))},error:e[o+1],complete:e[o+2]};else{const n=Yl(t,nd);u=Yl(n.firestore,ld),h=n._query;const r=new If(u);c={next:t=>{e[o]&&e[o](new nf(u,r,n,t))},error:e[o+1],complete:e[o+2]},of(t._query)}return function(t,e,n,r){const s=new bl(r),i=new Ch(e,s,n);return t.asyncQueue.enqueueAndForget((async()=>Sh(await Ll(t),i))),()=>{s.Wo(),t.asyncQueue.enqueueAndForget((async()=>Ah(await Ll(t),i)))}}(dd(u),h,a,c)}function Nf(t,e){return function(t,e){const n=new bl(e);return t.asyncQueue.enqueueAndForget((async()=>function(t,e){Hr(t).Gr.add(e),e.next()}(await Ll(t),n))),()=>{n.Wo(),t.asyncQueue.enqueueAndForget((async()=>function(t,e){Hr(t).Gr.delete(e)}(await Ll(t),n)))}}(dd(t=Yl(t,ld)),ud(e)?e:{next:e})}function xf(t,e){return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=gl(t);try{const t=await function(t,e){const n=Hr(t),r=ts.now(),s=e.reduce(((t,e)=>t.add(e.key)),wo());let i;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>n.Mn.pn(t,s).next((s=>{i=s;const o=[];for(const t of e){const e=Ki(t,i.get(t.key));null!=e&&o.push(new Hi(t.key,e,Ps(e.value.mapValue),Ui.exists(!0)))}return n._n.addMutationBatch(t,r,o,e)})))).then((t=>(t.applyToLocalDocumentSet(i),{batchId:t.batchId,changes:i})))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.xo[t.currentUser.toKey()];r||(r=new io(Xr)),r=r.insert(e,n),t.xo[t.currentUser.toKey()]=r}(r,t.batchId,n),await nl(r,t.changes),await oh(r.remoteStore)}catch(t){const e=vh(t,"Failed to persist write");n.reject(e)}}(await Rl(t),e,n))),n.promise}(dd(t),e)}function Cf(t,e,n){const r=n.docs.get(e._key),s=new If(t);return new tf(t,s,e._key,r,new Zd(n.hasPendingWrites,n.fromCache),e.converter)}
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
     */class kf extends class{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=Cd(t)}get(t){const e=Tf(t,this._firestore),n=new bf(this._firestore);return this._transaction.lookup([e._key]).then((t=>{if(!t||1!==t.length)return Qr();const r=t[0];if(r.isFoundDocument())return new Yd(this._firestore,n,r.key,r,e.converter);if(r.isNoDocument())return new Yd(this._firestore,n,e._key,null,e.converter);throw Qr()}))}set(t,e,n){const r=Tf(t,this._firestore),s=vf(r.converter,e,n),i=kd(this._dataReader,"Transaction.set",r._key,s,null!==r.converter,n);return this._transaction.set(r._key,i),this}update(t,e,n,...r){const s=Tf(t,this._firestore);let i;return i="string"==typeof(e=f(e))||e instanceof bd?Ud(this._dataReader,"Transaction.update",s._key,e,n,r):Vd(this._dataReader,"Transaction.update",s._key,e),this._transaction.update(s._key,i),this}delete(t){const e=Tf(t,this._firestore);return this._transaction.delete(e._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Tf(t,this._firestore),n=new If(this._firestore);return super.get(t).then((t=>new tf(this._firestore,n,e._key,t._document,new Zd(!1,!1),e.converter)))}}function Rf(t,e){return function(t,e){const n=new Ra;return t.asyncQueue.enqueueAndForget((async()=>{const r=await function(t){return Nl(t).then((t=>t.datastore))}(t);new Il(t.asyncQueue,r,e,n).run()})),n.promise}(dd(t),(n=>e(new kf(t,n))))}
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
     */!function(t){Fr=t}(e.SDK_VERSION),e._registerComponent(new p("firestore-exp",((t,{options:e})=>{const n=t.getProvider("app-exp").getImmediate(),r=new ld(n,t.getProvider("auth-internal"));return e=Object.assign({useFetchStreams:!1},e),r._setSettings(e),r}),"PUBLIC")),e.registerVersion("@firebase/firestore","0.0.900-exp.f43d0c698",undefined);
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
let Mf="8.6.8";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
const Ff=new E("@firebase/firestore");function Pf(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
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
     */function Vf(t="Unexpected state"){const e=`FIRESTORE (${Mf}) INTERNAL ASSERTION FAILED: `+t;throw function(t,...e){if(Ff.logLevel<=m.ERROR){const n=e.map(Pf);Ff.error(`Firestore (${Mf}): ${t}`,...n)}}(e),new Error(e)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const Uf="invalid-argument",qf="failed-precondition",Bf="unimplemented";class jf extends Error{constructor(t,e){super(e),this.code=t,this.message=e,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const $f="__name__";class Kf{constructor(t,e,n){void 0===e?e=0:e>t.length&&Vf(),void 0===n?n=t.length-e:n>t.length-e&&Vf(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===Kf.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Kf?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),s=e.get(r);if(n<s)return-1;if(n>s)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Gf extends Kf{construct(t,e,n){return new Gf(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new jf(Uf,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Gf(e)}static emptyPath(){return new Gf([])}}const Qf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class zf extends Kf{construct(t,e,n){return new zf(t,e,n)}static isValidIdentifier(t){return Qf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),zf.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===$f}static keyField(){return new zf([$f])}static fromServerFormat(t){const e=[];let n="",r=0;const s=()=>{if(0===n.length)throw new jf(Uf,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let i=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new jf(Uf,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new jf(Uf,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(i=!i,r++):"."!==e||i?(n+=e,r++):(s(),r++)}if(s(),i)throw new jf(Uf,"Unterminated ` in path: "+t);return new zf(e)}static emptyPath(){return new zf([])}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */function Wf(t,e){if(void 0===e)return{merge:!1};if(void 0!==e.mergeFields&&void 0!==e.merge)throw new jf(Uf,`Invalid options passed to function ${t}(): You cannot specify both "merge" and "mergeFields".`);return e}function Yf(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new jf(Uf,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=function(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){if(t.constructor){const e=/function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());if(e&&e.length>1)return e[1]}return null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":Vf()}(t);throw new jf(Uf,`Expected type '${e.name}', but it was: ${n}`)}}return t}
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
function Xf(){if("undefined"==typeof Uint8Array)throw new jf(Bf,"Uint8Arrays are not available in this environment.")}function Jf(){if("undefined"==typeof atob)throw new jf(Bf,"Blobs are unavailable in Firestore in this environment.")}class Zf{constructor(t){this._delegate=t}static fromBase64String(t){return Jf(),new Zf(Ed.fromBase64String(t))}static fromUint8Array(t){return Xf(),new Zf(Ed.fromUint8Array(t))}toBase64(){return Jf(),this._delegate.toBase64()}toUint8Array(){return Xf(),this._delegate.toUint8Array()}isEqual(t){return this._delegate.isEqual(t._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function tg(t){return function(t,e){if("object"!=typeof t||null===t)return!1;const n=t;for(const t of e)if(t in n&&"function"==typeof n[t])return!0;return!1}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t,["next","error","complete"])}class eg{enableIndexedDbPersistence(t,e){return function(t,e){vd(t=Yl(t,ld));const n=dd(t),r=t._freezeSettings(),s=new wl;return gd(n,s,new pl(s,r.cacheSizeBytes,null==e?void 0:e.forceOwnership))}(t._delegate,{forceOwnership:e})}enableMultiTabIndexedDbPersistence(t){return function(t){vd(t=Yl(t,ld));const e=dd(t),n=t._freezeSettings(),r=new wl;return gd(e,r,new yl(r,n.cacheSizeBytes))}(t._delegate)}clearIndexedDbPersistence(t){return function(t){if(t._initialized&&!t._terminated)throw new Ur(Vr.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new Ra;return t._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await async function(t){if(!Ma.gt())return Promise.resolve();const e=t+"main";await Ma.delete(e)}(Qc(t._databaseId,t._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}(t._delegate)}}class ng{constructor(t,e,n){this._delegate=e,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},t instanceof Of||(this._appCompat=t)}get _databaseId(){return this._delegate._databaseId}settings(t){const e=this._delegate._getSettings();t.merge||e.host===t.host||function(t,...e){if(Ff.logLevel<=m.WARN){const n=e.map(Pf);Ff.warn(`Firestore (${Mf}): ${t}`,...n)}}("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),t.merge&&delete(t=Object.assign(Object.assign({},e),t)).merge,this._delegate._setSettings(t)}useEmulator(t,e,n={}){td(this._delegate,t,e,n)}enableNetwork(){return pd(this._delegate)}disableNetwork(){return yd(this._delegate)}enablePersistence(t){let e=!1,n=!1;return t&&(e=!!t.synchronizeTabs,n=!!t.experimentalForceOwningTab,function(t,e,n,r){if(!0===e&&!0===r)throw new jf(Uf,`${t} and ${n} cannot be used together.`)}("synchronizeTabs",e,"experimentalForceOwningTab",n)),e?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore"),this._appCompat._removeServiceInstance("firestore-exp")),this._delegate._delete()}waitForPendingWrites(){return md(this._delegate)}onSnapshotsInSync(t){return Nf(this._delegate,t)}get app(){if(!this._appCompat)throw new jf(qf,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(t){try{return new pg(this,sd(this._delegate,t))}catch(t){throw cg(t,"collection()","Firestore.collection()")}}doc(t){try{return new ag(this,id(this._delegate,t))}catch(t){throw cg(t,"doc()","Firestore.doc()")}}collectionGroup(t){try{return new fg(this,function(t,e){if(t=Yl(t,Zl),Ql("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new Ur(Vr.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new nd(t,null,function(t){return new ii(os.emptyPath(),t)}(e))}(this._delegate,t))}catch(t){throw cg(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(t){return Rf(this._delegate,(e=>t(new sg(this,e))))}batch(){return dd(this._delegate),new ig(new Ef(this._delegate,(t=>xf(this._delegate,t))))}loadBundle(t){throw new jf(qf,'"loadBundle()" does not exist, have you imported "firebase/firestore/bundle"?')}namedQuery(t){throw new jf(qf,'"namedQuery()" does not exist, have you imported "firebase/firestore/bundle"?')}}class rg extends wf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Zf(new Ed(t))}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return ag.forKey(e,this.firestore,null)}}class sg{constructor(t,e){this._firestore=t,this._delegate=e,this._userDataWriter=new rg(t)}get(t){const e=yg(t);return this._delegate.get(e).then((t=>new lg(this._firestore,new tf(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,e.converter))))}set(t,e,n){const r=yg(t);return n?(Wf("Transaction.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=yg(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=yg(t);return this._delegate.delete(e),this}}class ig{constructor(t){this._delegate=t}set(t,e,n){const r=yg(t);return n?(Wf("WriteBatch.set",n),this._delegate.set(r,e,n)):this._delegate.set(r,e),this}update(t,e,n,...r){const s=yg(t);return 2===arguments.length?this._delegate.update(s,e):this._delegate.update(s,e,n,...r),this}delete(t){const e=yg(t);return this._delegate.delete(e),this}commit(){return this._delegate.commit()}}class og{constructor(t,e,n){this._firestore=t,this._userDataWriter=e,this._delegate=n}fromFirestore(t,e){const n=new ef(this._firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,null);return this._delegate.fromFirestore(new dg(this._firestore,n),null!=e?e:{})}toFirestore(t,e){return e?this._delegate.toFirestore(t,e):this._delegate.toFirestore(t)}static getInstance(t,e){const n=og.INSTANCES;let r=n.get(t);r||(r=new WeakMap,n.set(t,r));let s=r.get(e);return s||(s=new og(t,new rg(t),e),r.set(e,s)),s}}og.INSTANCES=new WeakMap;class ag{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new rg(t)}static forPath(t,e,n){if(t.length%2!=0)throw new jf(Uf,`Invalid document reference. Document references must have an even number of segments, but ${t.canonicalString()} has ${t.length}`);return new ag(e,new ed(e._delegate,n,new Hf(t)))}static forKey(t,e,n){return new ag(e,new ed(e._delegate,n,t))}get id(){return this._delegate.id}get parent(){return new pg(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(t){try{return new pg(this.firestore,sd(this._delegate,t))}catch(t){throw cg(t,"collection()","DocumentReference.collection()")}}isEqual(t){return(t=f(t))instanceof ed&&od(this._delegate,t)}set(t,e){e=Wf("DocumentReference.set",e);try{return function(t,e,n){t=Yl(t,ed);const r=Yl(t.firestore,ld),s=vf(t.converter,e,n);return xf(r,[kd(Cd(r),"setDoc",t._key,s,null!==t.converter,n).toMutation(t._key,Ui.none())])}(this._delegate,t,e)}catch(t){throw cg(t,"setDoc()","DocumentReference.set()")}}update(t,e,...n){try{return 1===arguments.length?Af(this._delegate,t):Af(this._delegate,t,e,...n)}catch(t){throw cg(t,"updateDoc()","DocumentReference.update()")}}delete(){return function(t){return xf(Yl(t.firestore,ld),[new Ji(t._key,Ui.none())])}(this._delegate)}onSnapshot(...t){const e=ug(t),n=hg(t,(t=>new lg(this.firestore,new tf(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))));return Df(this._delegate,e,n)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?_f(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Yl(t,ed);const e=Yl(t.firestore,ld);return Ol(dd(e),t._key,{source:"server"}).then((n=>Cf(e,t,n)))}(this._delegate):function(t){t=Yl(t,ed);const e=Yl(t.firestore,ld);return Ol(dd(e),t._key).then((n=>Cf(e,t,n)))}(this._delegate),e.then((t=>new lg(this.firestore,new tf(this.firestore._delegate,this._userDataWriter,t._key,t._document,t.metadata,this._delegate.converter))))}withConverter(t){return new ag(this.firestore,t?this._delegate.withConverter(og.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function cg(t,e,n){return t.message=t.message.replace(e,n),t}function ug(t){for(const e of t)if("object"==typeof e&&!tg(e))return e;return{}}function hg(t,e){var n,r;let s;return s=tg(t[0])?t[0]:tg(t[1])?t[1]:"function"==typeof t[0]?{next:t[0],error:t[1],complete:t[2]}:{next:t[1],error:t[2],complete:t[3]},{next:t=>{s.next&&s.next(e(t))},error:null===(n=s.error)||void 0===n?void 0:n.bind(s),complete:null===(r=s.complete)||void 0===r?void 0:r.bind(s)}}class lg{constructor(t,e){this._firestore=t,this._delegate=e}get ref(){return new ag(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(t){return this._delegate.data(t)}get(t,e){return this._delegate.get(t,e)}isEqual(t){return sf(this._delegate,t._delegate)}}class dg extends lg{data(t){return this._delegate.data(t)}}class fg{constructor(t,e){this.firestore=t,this._delegate=e,this._userDataWriter=new rg(t)}where(t,e,n){try{return new fg(this.firestore,cf(this._delegate,function(t,e,n){const r=e,s=Jd("where",t);return new uf(s,r,n)}(t,e,n)))}catch(t){throw cg(t,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(t,e){try{return new fg(this.firestore,cf(this._delegate,function(t,e="asc"){const n=e,r=Jd("orderBy",t);return new hf(r,n)}(t,e)))}catch(t){throw cg(t,/(orderBy|where)\(\)/,"Query.$1()")}}limit(t){try{return new fg(this.firestore,cf(this._delegate,function(t){return Xl("limit",t),new lf("limit",t,"F")}(t)))}catch(t){throw cg(t,"limit()","Query.limit()")}}limitToLast(t){try{return new fg(this.firestore,cf(this._delegate,function(t){return Xl("limitToLast",t),new lf("limitToLast",t,"L")}(t)))}catch(t){throw cg(t,"limitToLast()","Query.limitToLast()")}}startAt(...t){try{return new fg(this.firestore,cf(this._delegate,function(...t){return new df("startAt",t,!0)}(...t)))}catch(t){throw cg(t,"startAt()","Query.startAt()")}}startAfter(...t){try{return new fg(this.firestore,cf(this._delegate,function(...t){return new df("startAfter",t,!1)}(...t)))}catch(t){throw cg(t,"startAfter()","Query.startAfter()")}}endBefore(...t){try{return new fg(this.firestore,cf(this._delegate,function(...t){return new ff("endBefore",t,!0)}(...t)))}catch(t){throw cg(t,"endBefore()","Query.endBefore()")}}endAt(...t){try{return new fg(this.firestore,cf(this._delegate,function(...t){return new ff("endAt",t,!1)}(...t)))}catch(t){throw cg(t,"endAt()","Query.endAt()")}}isEqual(t){return ad(this._delegate,t._delegate)}get(t){let e;return e="cache"===(null==t?void 0:t.source)?Sf(this._delegate):"server"===(null==t?void 0:t.source)?function(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return Ml(n,t._query,{source:"server"}).then((n=>new nf(e,r,t,n)))}(this._delegate):function(t){t=Yl(t,nd);const e=Yl(t.firestore,ld),n=dd(e),r=new If(e);return of(t._query),Ml(n,t._query).then((n=>new nf(e,r,t,n)))}(this._delegate),e.then((t=>new mg(this.firestore,new nf(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))))}onSnapshot(...t){const e=ug(t),n=hg(t,(t=>new mg(this.firestore,new nf(this.firestore._delegate,this._userDataWriter,this._delegate,t._snapshot))));return Df(this._delegate,e,n)}withConverter(t){return new fg(this.firestore,t?this._delegate.withConverter(og.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}class gg{constructor(t,e){this._firestore=t,this._delegate=e}get type(){return this._delegate.type}get doc(){return new dg(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class mg{constructor(t,e){this._firestore=t,this._delegate=e}get query(){return new fg(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map((t=>new dg(this._firestore,t)))}docChanges(t){return this._delegate.docChanges(t).map((t=>new gg(this._firestore,t)))}forEach(t,e){this._delegate.forEach((n=>{t.call(e,new dg(this._firestore,n))}))}isEqual(t){return sf(this._delegate,t._delegate)}}class pg extends fg{constructor(t,e){super(t,e),this.firestore=t,this._delegate=e}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const t=this._delegate.parent;return t?new ag(this.firestore,t):null}doc(t){try{return new ag(this.firestore,void 0===t?id(this._delegate):id(this._delegate,t))}catch(t){throw cg(t,"doc()","CollectionReference.doc()")}}add(t){return function(t,e){const n=Yl(t.firestore,ld),r=id(t),s=vf(t.converter,e);return xf(n,[kd(Cd(t.firestore),"addDoc",r._key,s,null!==t.converter,{}).toMutation(r._key,Ui.exists(!1))]).then((()=>r))}(this._delegate,t).then((t=>new ag(this.firestore,t)))}isEqual(t){return od(this._delegate,t._delegate)}withConverter(t){return new pg(this.firestore,t?this._delegate.withConverter(og.getInstance(this.firestore,t)):this._delegate.withConverter(null))}}function yg(t){return Yf(t,ed)}
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
     */function wg(t){return function(t,e){const n=dd(t=Yl(t,ld)),r=new hd;return Fl(n,t._databaseId,e,r),r}(this._delegate,t)}function vg(t){return wd(this._delegate,t).then((t=>t?new fg(this,t):null))}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
class bg{constructor(...t){this._delegate=new bd(...t)}static documentId(){return new bg(zf.keyField().canonicalString())}isEqual(t){return(t=f(t))instanceof bd&&this._delegate._internalPath.isEqual(t._internalPath)}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class Eg{constructor(t){this._delegate=t}static serverTimestamp(){const t=new Od("serverTimestamp");return t._methodName="FieldValue.serverTimestamp",new Eg(t)}static delete(){const t=new Rd("deleteField");return t._methodName="FieldValue.delete",new Eg(t)}static arrayUnion(...t){const e=function(...t){return new Md("arrayUnion",t)}(...t);return e._methodName="FieldValue.arrayUnion",new Eg(e)}static arrayRemove(...t){const e=function(...t){return new Fd("arrayRemove",t)}(...t);return e._methodName="FieldValue.arrayRemove",new Eg(e)}static increment(t){const e=function(t){return new Pd("increment",t)}(t);return e._methodName="FieldValue.increment",new Eg(e)}isEqual(t){return this._delegate.isEqual(t._delegate)}}
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
     */const Tg={Firestore:ng,GeoPoint:Id,Timestamp:ts,Blob:Zf,Transaction:sg,WriteBatch:ig,DocumentReference:ag,DocumentSnapshot:lg,Query:fg,QueryDocumentSnapshot:dg,QuerySnapshot:mg,CollectionReference:pg,FieldPath:bg,FieldValue:Eg,setLogLevel:function(t){var e;e=t,Ff.setLogLevel(e)},CACHE_SIZE_UNLIMITED:-1};
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
var Ig;(function(t){Mf=t})((Ig=r.default).SDK_VERSION),function(t,e){t.INTERNAL.registerComponent(new p("firestore-compat",(t=>{const n=t.getProvider("app-compat").getImmediate(),r=t.getProvider("firestore-exp").getImmediate();return e(n,r)}),"PUBLIC").setServiceProps(Object.assign({},Tg)))}(Ig,((t,e)=>new ng(t,e,new eg))),Ig.registerVersion("@firebase/firestore-compat","0.0.900-exp.f43d0c698"),function(t){t.prototype.loadBundle=wg,t.prototype.namedQuery=vg}(ng)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-firestore-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-firestore-compat.js.map
