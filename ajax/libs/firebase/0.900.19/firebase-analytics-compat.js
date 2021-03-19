!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=n(e),i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};
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
    ***************************************************************************** */var o,a,s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function u(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))}function c(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function l(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function f(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(a||(a={}));var p={debug:a.DEBUG,verbose:a.VERBOSE,info:a.INFO,warn:a.WARN,error:a.ERROR,silent:a.SILENT},d=a.INFO,h=((o={})[a.DEBUG]="log",o[a.VERBOSE]="log",o[a.INFO]="info",o[a.WARN]="warn",o[a.ERROR]="error",o),v=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=h[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,f(["["+i+"]  "+e.name+":"],n))}},g=function(){function e(e){this.name=e,this._logLevel=d,this._logHandler=v,this._userLogHandler=null}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in a))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?p[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.DEBUG],e)),this._logHandler.apply(this,f([this,a.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.VERBOSE],e)),this._logHandler.apply(this,f([this,a.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.INFO],e)),this._logHandler.apply(this,f([this,a.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.WARN],e)),this._logHandler.apply(this,f([this,a.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.ERROR],e)),this._logHandler.apply(this,f([this,a.ERROR],e))},e}();function m(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function y(){return"indexedDB"in self&&null!=indexedDB}function b(){return new Promise((function(e,t){try{var n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=window.indexedDB.open(r);i.onsuccess=function(){i.result.close(),n||window.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=function(){n=!1},i.onerror=function(){var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function w(){return!(!navigator||!navigator.cookieEnabled)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var I=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,_.prototype.create),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t}(Error),_=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?E(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",u=new I(i,s,r);return u},e}();function E(e,t){return e.replace(S,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var S=/\{\$([^}]+)}/g;
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
     */function T(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=2);var r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)}var C=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}();function x(e){return Array.prototype.slice.call(e)}function P(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function O(e,t,n){var r,i=new Promise((function(i,o){P(r=e[t].apply(e,n)).then(i,o)}));return i.request=r,i}function D(e,t,n){var r=O(e,t,n);return r.then((function(e){if(e)return new L(e,r.request)}))}function A(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function N(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return O(this[t],r,arguments)})}))}function k(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function j(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return D(this[t],r,arguments)})}))}function R(e){this._index=e}function L(e,t){this._cursor=e,this._request=t}function M(e){this._store=e}function F(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function B(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new F(n)}function H(e){this._db=e}A(R,"_index",["name","keyPath","multiEntry","unique"]),N(R,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),j(R,"_index",IDBIndex,["openCursor","openKeyCursor"]),A(L,"_cursor",["direction","key","primaryKey","value"]),N(L,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(L.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,n),P(t._request).then((function(e){if(e)return new L(e,t._request)}))}))})})),M.prototype.createIndex=function(){return new R(this._store.createIndex.apply(this._store,arguments))},M.prototype.index=function(){return new R(this._store.index.apply(this._store,arguments))},A(M,"_store",["name","keyPath","indexNames","autoIncrement"]),N(M,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),j(M,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),k(M,"_store",IDBObjectStore,["deleteIndex"]),F.prototype.objectStore=function(){return new M(this._tx.objectStore.apply(this._tx,arguments))},A(F,"_tx",["objectStoreNames","mode"]),k(F,"_tx",IDBTransaction,["abort"]),B.prototype.createObjectStore=function(){return new M(this._db.createObjectStore.apply(this._db,arguments))},A(B,"_db",["name","version","objectStoreNames"]),k(B,"_db",IDBDatabase,["deleteObjectStore","close"]),H.prototype.transaction=function(){return new F(this._db.transaction.apply(this._db,arguments))},A(H,"_db",["name","version","objectStoreNames"]),k(H,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[M,R].forEach((function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=x(arguments),n=t[t.length-1],r=this._store||this._index,i=r[e].apply(r,t.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[R,M].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})}));var q,V="0.0.900",K=1e4,U="w:0.0.900",G="FIS_v2",W=36e5,$=((q={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',q["not-registered"]="Firebase Installation is not registered.",q["installation-not-found"]="Firebase Installation not found.",q["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',q["app-offline"]="Could not process request. Application offline.",q["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",q),z=new _("installations","Installations",$);function J(e){return e instanceof I&&e.code.includes("request-failed")}
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
     */function Y(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function X(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function Z(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,z.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function Q(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ee(e,t){var n=t.refreshToken,r=Q(e);return r.append("Authorization",function(e){return"FIS_v2 "+e}
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
     */(n)),r}function te(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function ne(e,t){var n=t.fid;return u(this,void 0,void 0,(function(){var t,r,i,o,a,s;return c(this,(function(u){switch(u.label){case 0:return t=Y(e),r=Q(e),i={fid:n,authVersion:G,appId:e.appId,sdkVersion:U},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,te((function(){return fetch(t,o)}))];case 1:return(a=u.sent()).ok?[4,a.json()]:[3,3];case 2:return s=u.sent(),[2,{fid:s.fid||n,registrationStatus:2,refreshToken:s.refreshToken,authToken:X(s.authToken)}];case 3:return[4,Z("Create Installation",a)];case 4:throw u.sent()}}))}))}
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
     */function re(e){return new Promise((function(t){setTimeout(t,e)}))}
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
     */function ie(e){return btoa(String.fromCharCode.apply(String,f([],function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}(e)))).replace(/\+/g,"-").replace(/\//g,"_")}
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
     */var oe=/^[cdef][\w-]{21}$/;function ae(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return ie(e).substr(0,22)}
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
     */(e);return oe.test(t)?t:""}catch(e){return""}}function se(e){return e.appName+"!"+e.appId}
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
     */var ue=new Map;function ce(e,t){var n=se(e);le(n,t),function(e,t){var n=function(){!fe&&"BroadcastChannel"in self&&((fe=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){le(e.data.key,e.data.fid)});return fe}();n&&n.postMessage({key:e,fid:t});0===ue.size&&fe&&(fe.close(),fe=null)}(n,t)}function le(e,t){var n,r,i=ue.get(e);if(i)try{for(var o=l(i),a=o.next();!a.done;a=o.next()){(0,a.value)(t)}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var fe=null;
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
     */
var pe="firebase-installations-store",de=null;function he(){return de||(de=function(e,t,n){var r=O(indexedDB,"open",[e,t]),i=r.request;return i&&(i.onupgradeneeded=function(e){n&&n(new B(i.result,e.oldVersion,i.transaction))}),r.then((function(e){return new H(e)}))}("firebase-installations-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(pe)}}))),de}function ve(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o,a;return c(this,(function(s){switch(s.label){case 0:return n=se(e),[4,he()];case 1:return r=s.sent(),i=r.transaction(pe,"readwrite"),[4,(o=i.objectStore(pe)).get(n)];case 2:return a=s.sent(),[4,o.put(t,n)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),a&&a.fid===t.fid||ce(e,t.fid),[2,t]}}))}))}function ge(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:return t=se(e),[4,he()];case 1:return n=i.sent(),[4,(r=n.transaction(pe,"readwrite")).objectStore(pe).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function me(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o,a,s;return c(this,(function(u){switch(u.label){case 0:return n=se(e),[4,he()];case 1:return r=u.sent(),i=r.transaction(pe,"readwrite"),[4,(o=i.objectStore(pe)).get(n)];case 2:return a=u.sent(),void 0!==(s=t(a))?[3,4]:[4,o.delete(n)];case 3:return u.sent(),[3,6];case 4:return[4,o.put(s,n)];case 5:u.sent(),u.label=6;case 6:return[4,i.complete];case 7:return u.sent(),!s||a&&a.fid===s.fid||ce(e,s.fid),[2,s]}}))}))}
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
     */function ye(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:return[4,me(e,(function(n){var r=function(e){return Ie(e||{fid:ae(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(z.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,ne(e,t)];case 1:return n=i.sent(),[2,ve(e,n)];case 2:return J(r=i.sent())&&409===r.customData.serverCode?[4,ge(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,ve(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:be(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}))];case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function be(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,we(e)];case 1:t=o.sent(),o.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,re(100)];case 3:return o.sent(),[4,we(e)];case 4:return t=o.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,ye(e)];case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r];case 7:return[2,t]}}))}))}function we(e){return me(e,(function(e){if(!e)throw z.create("installation-not-found");return Ie(e)}))}function Ie(e){return 1===(t=e).registrationStatus&&t.registrationTime+K<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
     */}function _e(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return u(this,void 0,void 0,(function(){var e,i,o,a,s,u,l;return c(this,(function(c){switch(c.label){case 0:return e=function(e,t){var n=t.fid;return Y(e)+"/"+n+"/authTokens:generate"}
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
     */(n,t),i=ee(n,t),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:U}},s={method:"POST",headers:i,body:JSON.stringify(a)},[4,te((function(){return fetch(e,s)}))];case 1:return(u=c.sent()).ok?[4,u.json()]:[3,3];case 2:return l=c.sent(),[2,X(l)];case 3:return[4,Z("Generate Auth Token",u)];case 4:throw c.sent()}}))}))}function Ee(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,me(e.appConfig,(function(r){if(!Te(r))throw z.create("not-registered");var i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+W}(e)}(i))return r;if(1===i.requestStatus)return n=function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return[4,Se(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,re(100)];case 3:return i.sent(),[4,Se(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,Ee(e,t)]:[2,r]}}))}))}(e,t),r;if(!navigator.onLine)throw z.create("app-offline");var o=function(e){var t={requestStatus:1,requestTime:Date.now()};return s(s({},e),{authToken:t})}(r);return n=function(e,t){return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,_e(e,t)];case 1:return n=o.sent(),i=s(s({},t),{authToken:n}),[4,ve(e.appConfig,i)];case 2:return o.sent(),[2,n];case 3:return!J(r=o.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,ge(e.appConfig)];case 4:return o.sent(),[3,7];case 5:return i=s(s({},t),{authToken:{requestStatus:0}}),[4,ve(e.appConfig,i)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}}))}))}(e,o),o}))];case 1:return r=o.sent(),n?[4,n]:[3,3];case 2:return i=o.sent(),[3,4];case 3:i=r.authToken,o.label=4;case 4:return[2,i]}}))}))}function Se(e){return me(e,(function(e){if(!Te(e))throw z.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+K<Date.now()?s(s({},e),{authToken:{requestStatus:0}}):e}))}function Te(e){return void 0!==e&&2===e.registrationStatus}function Ce(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,ye(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
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
     */function xe(e){return z.create("missing-app-config-values",{valueName:e})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Pe="installations-exp",Oe=function(e){var n=e.getProvider("app-exp").getImmediate();return{app:n,appConfig:function(e){var t,n;if(!e||!e.options)throw xe("App Configuration");if(!e.name)throw xe("App Name");try{for(var r=l(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value;if(!e.options[o])throw xe(o)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(n),platformLoggerProvider:t._getProvider(n,"platform-logger"),_delete:function(){return Promise.resolve()}}},De=function(e){var n=e.getProvider("app-exp").getImmediate(),r=t._getProvider(n,Pe).getImmediate();return{getId:function(){
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
     */return function(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,ye((t=e).appConfig)];case 1:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?i.catch(console.error):Ee(t).catch(console.error),[2,r.fid]}}))}))}
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
     */(r)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,Ce((n=e).appConfig)];case 1:return r.sent(),[4,Ee(n,t)];case 2:return[2,r.sent().token]}}))}))}(r,e)}}};t._registerComponent(new C(Pe,Oe,"PUBLIC")),t._registerComponent(new C("installations-exp-internal",De,"PRIVATE")),t.registerVersion("@firebase/installations-exp",V);
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
     */
var Ae,Ne="analytics-exp",ke="https://www.googletagmanager.com/gtag/js",je=new g("@firebase/analytics");
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
     */
function Re(e){return Promise.all(e.map((function(e){return e.catch((function(e){return e}))})))}function Le(e,t,n,r,i,o){return u(this,void 0,void 0,(function(){var a,s,u,l;return c(this,(function(c){switch(c.label){case 0:a=r[i],c.label=1;case 1:return c.trys.push([1,7,,8]),a?[4,t[a]]:[3,3];case 2:return c.sent(),[3,6];case 3:return[4,Re(n)];case 4:return s=c.sent(),(u=s.find((function(e){return e.measurementId===i})))?[4,t[u.appId]]:[3,6];case 5:c.sent(),c.label=6;case 6:return[3,8];case 7:return l=c.sent(),je.error(l),[3,8];case 8:return e("config",i,o),[2]}}))}))}function Me(e,t,n,r,i){return u(this,void 0,void 0,(function(){var o,a,s,u,l,f,p,d;return c(this,(function(c){switch(c.label){case 0:return c.trys.push([0,4,,5]),o=[],i&&i.send_to?(a=i.send_to,Array.isArray(a)||(a=[a]),[4,Re(n)]):[3,2];case 1:for(s=c.sent(),u=function(e){var n=s.find((function(t){return t.measurementId===e})),r=n&&t[n.appId];if(!r)return o=[],"break";o.push(r)},l=0,f=a;l<f.length&&(p=f[l],"break"!==u(p));l++);c.label=2;case 2:return 0===o.length&&(o=Object.values(t)),[4,Promise.all(o)];case 3:return c.sent(),e("event",r,i||{}),[3,5];case 4:return d=c.sent(),je.error(d),[3,5];case 5:return[2]}}))}))}function Fe(e,t,n,r,i){var o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];window[r].push(arguments)};return window[i]&&"function"==typeof window[i]&&(o=window[i]),window[i]=function(e,t,n,r){return function(i,o,a){return u(this,void 0,void 0,(function(){var s;return c(this,(function(u){switch(u.label){case 0:return u.trys.push([0,6,,7]),"event"!==i?[3,2]:[4,Me(e,t,n,o,a)];case 1:return u.sent(),[3,5];case 2:return"config"!==i?[3,4]:[4,Le(e,t,n,r,o,a)];case 3:return u.sent(),[3,5];case 4:e("set",o),u.label=5;case 5:return[3,7];case 6:return s=u.sent(),je.error(s),[3,7];case 7:return[2]}}))}))}}(o,e,t,n),{gtagCore:o,wrappedGtag:window[i]}}var Be=((Ae={})["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",Ae["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",Ae["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",Ae["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",Ae["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",Ae["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",Ae["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",Ae["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',Ae["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',Ae),He=new _("analytics","Analytics",Be),qe=new(function(){function e(e,t){void 0===e&&(e={}),void 0===t&&(t=1e3),this.throttleMetadata=e,this.intervalMillis=t}return e.prototype.getThrottleMetadata=function(e){return this.throttleMetadata[e]},e.prototype.setThrottleMetadata=function(e,t){this.throttleMetadata[e]=t},e.prototype.deleteThrottleMetadata=function(e){delete this.throttleMetadata[e]},e}());function Ve(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Ke(e){var t;return u(this,void 0,void 0,(function(){var n,r,i,o,a,s,u;return c(this,(function(c){switch(c.label){case 0:return n=e.appId,r=e.apiKey,i={method:"GET",headers:Ve(r)},o="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),[4,fetch(o,i)];case 1:if(200===(a=c.sent()).status||304===a.status)return[3,6];s="",c.label=2;case 2:return c.trys.push([2,4,,5]),[4,a.json()];case 3:return u=c.sent(),(null===(t=u.error)||void 0===t?void 0:t.message)&&(s=u.error.message),[3,5];case 4:return c.sent(),[3,5];case 5:throw He.create("config-fetch-failed",{httpStatus:a.status,responseMessage:s});case 6:return[2,a.json()]}}))}))}function Ue(e,t,n,r){var i=t.throttleEndTimeMillis,o=t.backoffCount;return void 0===r&&(r=qe),u(this,void 0,void 0,(function(){var t,a,s,u,l,f,p;return c(this,(function(c){switch(c.label){case 0:t=e.appId,a=e.measurementId,c.label=1;case 1:return c.trys.push([1,3,,4]),[4,Ge(n,i)];case 2:return c.sent(),[3,4];case 3:if(s=c.sent(),a)return je.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID "+a+' provided in the "measurementId" field in the local Firebase config. ['+s.message+"]"),[2,{appId:t,measurementId:a}];throw s;case 4:return c.trys.push([4,6,,7]),[4,Ke(e)];case 5:return u=c.sent(),r.deleteThrottleMetadata(t),[2,u];case 6:if(!function(e){if(!(e instanceof I&&e.customData))return!1;var t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(l=c.sent())){if(r.deleteThrottleMetadata(t),a)return je.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID "+a+' provided in the "measurementId" field in the local Firebase config. ['+l.message+"]"),[2,{appId:t,measurementId:a}];throw l}return f=503===Number(l.customData.httpStatus)?T(o,r.intervalMillis,30):T(o,r.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:o+1},r.setThrottleMetadata(t,p),je.debug("Calling attemptFetch again in "+f+" millis"),[2,Ue(e,p,n,r)];case 7:return[2]}}))}))}function Ge(e,t){return new Promise((function(n,r){var i=Math.max(t-Date.now(),0),o=setTimeout(n,i);e.addEventListener((function(){clearTimeout(o),r(He.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}var We=function(){function e(){this.listeners=[]}return e.prototype.addEventListener=function(e){this.listeners.push(e)},e.prototype.abort=function(){this.listeners.forEach((function(e){return e()}))},e}();
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function $e(e,t,n,r,i,o){return u(this,void 0,void 0,(function(){var a,s,l,f,p,d,h;return c(this,(function(v){switch(v.label){case 0:return(a=function(e,t,n){return void 0===t&&(t=qe),u(this,void 0,void 0,(function(){var r,i,o,a,s,l,f=this;return c(this,(function(p){if(r=e.options,i=r.appId,o=r.apiKey,a=r.measurementId,!i)throw He.create("no-app-id");if(!o){if(a)return[2,{measurementId:a,appId:i}];throw He.create("no-api-key")}return s=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new We,setTimeout((function(){return u(f,void 0,void 0,(function(){return c(this,(function(e){return l.abort(),[2]}))}))}),void 0!==n?n:6e4),[2,Ue({appId:i,apiKey:o,measurementId:a},s,l,t)]}))}))}(e)).then((function(t){n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&je.warn("The measurement ID in the local Firebase config ("+e.options.measurementId+") does not match the measurement ID fetched from the server ("+t.measurementId+"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")})).catch((function(e){return je.error(e)})),t.push(a),s=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return y()?[3,1]:(je.warn(He.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return t.trys.push([1,3,,4]),[4,b()];case 2:return t.sent(),[3,4];case 3:return e=t.sent(),je.warn(He.create("indexeddb-unavailable",{errorInfo:e}).message),[2,!1];case 4:return[2,!0]}}))}))}().then((function(e){return e?r.getId():void 0})),[4,Promise.all([a,s])];case 1:return l=v.sent(),f=l[0],p=l[1],function(){for(var e=window.document.getElementsByTagName("script"),t=0,n=Object.values(e);t<n.length;t++){var r=n[t];if(r.src&&r.src.includes(ke))return r}return null}
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
     */()||function(e,t){var n=document.createElement("script");n.src=ke+"?l="+e+"&id="+t,n.async=!0,document.head.appendChild(n)}(o,f.measurementId),i("js",new Date),(h={}).origin="firebase",h.update=!0,d=h,null!=p&&(d.firebase_id=p),i("config",f.measurementId,d),[2,f.measurementId]}}))}))}
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
     */var ze,Je,Ye=function(){function e(e){this.app=e}return e.prototype._delete=function(){return delete Xe[this.app.options.appId],Promise.resolve()},e}(),Xe={},Ze=[],Qe={},et="dataLayer",tt="gtag",nt=!1;function rt(e){if(nt)throw He.create("already-initialized");e.dataLayerName&&(et=e.dataLayerName),e.gtagName&&(tt=e.gtagName)}function it(e,t){!function(){var e=[];if(m()&&e.push("This is a browser extension environment."),w()||e.push("Cookies are not available."),e.length>0){var t=e.map((function(e,t){return"("+(t+1)+") "+e})).join(" "),n=He.create("invalid-analytics-context",{errorInfo:t});je.warn(n.message)}}();var n=e.options.appId;if(!n)throw He.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw He.create("no-api-key");je.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '+e.options.measurementId+' provided in the "measurementId" field in the local Firebase config.')}if(null!=Xe[n])throw He.create("already-exists",{id:n});if(!nt){!function(e){var t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(et);var r=Fe(Xe,Ze,Qe,et,tt),i=r.wrappedGtag,o=r.gtagCore;Je=i,ze=o,nt=!0}return Xe[n]=$e(e,Ze,Qe,t,ze,et),new Ye(e)}
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
     */function ot(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:if(m())return[2,!1];if(!w())return[2,!1];if(!y())return[2,!1];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,b()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,!1];case 4:return[2]}}))}))}function at(e,t,n){(function(e,t,n,r){return u(this,void 0,void 0,(function(){var i;return c(this,(function(o){switch(o.label){case 0:return r&&r.global?(e("set",{screen_name:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=o.sent(),e("config",i,{update:!0,screen_name:n}),o.label=3;case 3:return[2]}}))}))})(Je,Xe[e.app.options.appId],t,n).catch((function(e){return je.error(e)}))}function st(e,t,n){(function(e,t,n,r){return u(this,void 0,void 0,(function(){var i;return c(this,(function(o){switch(o.label){case 0:return r&&r.global?(e("set",{user_id:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=o.sent(),e("config",i,{update:!0,user_id:n}),o.label=3;case 3:return[2]}}))}))})(Je,Xe[e.app.options.appId],t,n).catch((function(e){return je.error(e)}))}function ut(e,t,n){(function(e,t,n,r){return u(this,void 0,void 0,(function(){var i,o,a,s,u;return c(this,(function(c){switch(c.label){case 0:if(!r||!r.global)return[3,1];for(i={},o=0,a=Object.keys(n);o<a.length;o++)s=a[o],i["user_properties."+s]=n[s];return e("set",i),[2,Promise.resolve()];case 1:return[4,t];case 2:u=c.sent(),e("config",u,{update:!0,user_properties:n}),c.label=3;case 3:return[2]}}))}))})(Je,Xe[e.app.options.appId],t,n).catch((function(e){return je.error(e)}))}function ct(e,t){(function(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,e];case 1:return n=r.sent(),window["ga-disable-"+n]=!t,[2]}}))}))})(Xe[e.app.options.appId],t).catch((function(e){return je.error(e)}))}function lt(e,t,n,r){(function(e,t,n,r,i){return u(this,void 0,void 0,(function(){var o,a;return c(this,(function(u){switch(u.label){case 0:return i&&i.global?(e("event",n,r),[2]):[3,1];case 1:return[4,t];case 2:o=u.sent(),a=s(s({},r),{send_to:o}),e("event",n,a),u.label=3;case 3:return[2]}}))}))})(Je,Xe[e.app.options.appId],t,n,r).catch((function(e){return je.error(e)}))}t._registerComponent(new C(Ne,(function(e){return it(e.getProvider("app-exp").getImmediate(),e.getProvider("installations-exp-internal").getImmediate())}),"PUBLIC")),t._registerComponent(new C("analytics-internal",(function(e){try{var t=e.getProvider(Ne).getImmediate();return{logEvent:function(e,n,r){return lt(t,e,n,r)}}}catch(e){throw He.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),t.registerVersion("@firebase/analytics-exp","0.0.900");var ft,pt=function(){function e(e,t){this.app=e,this._analyticsServiceExp=t}return e.prototype.logEvent=function(e,t,n){lt(this._analyticsServiceExp,e,t,n)},e.prototype.setCurrentScreen=function(e,t){at(this._analyticsServiceExp,e,t)},e.prototype.setUserId=function(e,t){st(this._analyticsServiceExp,e,t)},e.prototype.setUserProperties=function(e,t){ut(this._analyticsServiceExp,e,t)},e.prototype.setAnalyticsCollectionEnabled=function(e){ct(this._analyticsServiceExp,e)},e}();!function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(ft||(ft={}));
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
var dt,ht=function(e){var t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("analytics-exp").getImmediate();return new pt(t,n)};dt={Analytics:pt,settings:rt,isSupported:ot,EventName:ft},r.default.INTERNAL.registerComponent(new C("analytics-compat",ht,"PUBLIC").setServiceProps(dt).setMultipleInstances(!0)),r.default.registerVersion("@firebase/analytics-compat","0.0.900")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-analytics-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-analytics-compat.js.map
