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
     */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(a||(a={}));var p={debug:a.DEBUG,verbose:a.VERBOSE,info:a.INFO,warn:a.WARN,error:a.ERROR,silent:a.SILENT},d=a.INFO,h=((o={})[a.DEBUG]="log",o[a.VERBOSE]="log",o[a.INFO]="info",o[a.WARN]="warn",o[a.ERROR]="error",o),v=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=h[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,f(["["+i+"]  "+e.name+":"],n))}},g=function(){function e(e){this.name=e,this._logLevel=d,this._logHandler=v,this._userLogHandler=null}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in a))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?p[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.DEBUG],e)),this._logHandler.apply(this,f([this,a.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.VERBOSE],e)),this._logHandler.apply(this,f([this,a.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.INFO],e)),this._logHandler.apply(this,f([this,a.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.WARN],e)),this._logHandler.apply(this,f([this,a.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,f([this,a.ERROR],e)),this._logHandler.apply(this,f([this,a.ERROR],e))},e}();function m(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function y(){return"indexedDB"in self&&null!=indexedDB}function b(){return new Promise((function(e,t){try{var n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=function(){i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=function(){n=!1},i.onerror=function(){var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function w(){return!(!navigator||!navigator.cookieEnabled)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var I=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,_.prototype.create),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t}(Error),_=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?E(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",u=new I(i,s,r);return u},e}();function E(e,t){return e.replace(T,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var T=/\{\$([^}]+)}/g;
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
     */function S(e,t,n){void 0===t&&(t=1e3),void 0===n&&(n=2);var r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)}
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
     */function C(e){return e&&e._delegate?e._delegate:e}var P=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}();function x(e){return Array.prototype.slice.call(e)}function O(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function D(e,t,n){var r,i=new Promise((function(i,o){O(r=e[t].apply(e,n)).then(i,o)}));return i.request=r,i}function A(e,t,n){var r=D(e,t,n);return r.then((function(e){if(e)return new M(e,r.request)}))}function N(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function k(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return D(this[t],r,arguments)})}))}function j(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function R(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return A(this[t],r,arguments)})}))}function L(e){this._index=e}function M(e,t){this._cursor=e,this._request=t}function F(e){this._store=e}function B(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function H(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new B(n)}function q(e){this._db=e}N(L,"_index",["name","keyPath","multiEntry","unique"]),k(L,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),R(L,"_index",IDBIndex,["openCursor","openKeyCursor"]),N(M,"_cursor",["direction","key","primaryKey","value"]),k(M,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(M.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,n),O(t._request).then((function(e){if(e)return new M(e,t._request)}))}))})})),F.prototype.createIndex=function(){return new L(this._store.createIndex.apply(this._store,arguments))},F.prototype.index=function(){return new L(this._store.index.apply(this._store,arguments))},N(F,"_store",["name","keyPath","indexNames","autoIncrement"]),k(F,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),R(F,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),j(F,"_store",IDBObjectStore,["deleteIndex"]),B.prototype.objectStore=function(){return new F(this._tx.objectStore.apply(this._tx,arguments))},N(B,"_tx",["objectStoreNames","mode"]),j(B,"_tx",IDBTransaction,["abort"]),H.prototype.createObjectStore=function(){return new F(this._db.createObjectStore.apply(this._db,arguments))},N(H,"_db",["name","version","objectStoreNames"]),j(H,"_db",IDBDatabase,["deleteObjectStore","close"]),q.prototype.transaction=function(){return new B(this._db.transaction.apply(this._db,arguments))},N(q,"_db",["name","version","objectStoreNames"]),j(q,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[F,L].forEach((function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=x(arguments),n=t[t.length-1],r=this._store||this._index,i=r[e].apply(r,t.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[L,F].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})}));var V,K="0.0.900-exp.8294e6082",U=1e4,G="w:"+K,W="FIS_v2",$=36e5,z=((V={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',V["not-registered"]="Firebase Installation is not registered.",V["installation-not-found"]="Firebase Installation not found.",V["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',V["app-offline"]="Could not process request. Application offline.",V["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",V),J=new _("installations","Installations",z);function Y(e){return e instanceof I&&e.code.includes("request-failed")}
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
     */function X(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function Z(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function Q(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,J.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function ee(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function te(e,t){var n=t.refreshToken,r=ee(e);return r.append("Authorization",function(e){return"FIS_v2 "+e}
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
     */(n)),r}function ne(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function re(e,t){var n=t.fid;return u(this,void 0,void 0,(function(){var t,r,i,o,a,s;return c(this,(function(u){switch(u.label){case 0:return t=X(e),r=ee(e),i={fid:n,authVersion:W,appId:e.appId,sdkVersion:G},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,ne((function(){return fetch(t,o)}))];case 1:return(a=u.sent()).ok?[4,a.json()]:[3,3];case 2:return s=u.sent(),[2,{fid:s.fid||n,registrationStatus:2,refreshToken:s.refreshToken,authToken:Z(s.authToken)}];case 3:return[4,Q("Create Installation",a)];case 4:throw u.sent()}}))}))}
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
     */function ie(e){return new Promise((function(t){setTimeout(t,e)}))}
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
     */function oe(e){return btoa(String.fromCharCode.apply(String,f([],function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}(e)))).replace(/\+/g,"-").replace(/\//g,"_")}
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
     */var ae=/^[cdef][\w-]{21}$/;function se(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return oe(e).substr(0,22)}
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
     */(e);return ae.test(t)?t:""}catch(e){return""}}function ue(e){return e.appName+"!"+e.appId}
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
     */var ce=new Map;function le(e,t){var n=ue(e);fe(n,t),function(e,t){var n=function(){!pe&&"BroadcastChannel"in self&&((pe=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){fe(e.data.key,e.data.fid)});return pe}();n&&n.postMessage({key:e,fid:t});0===ce.size&&pe&&(pe.close(),pe=null)}(n,t)}function fe(e,t){var n,r,i=ce.get(e);if(i)try{for(var o=l(i),a=o.next();!a.done;a=o.next()){(0,a.value)(t)}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var pe=null;
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
var de="firebase-installations-store",he=null;function ve(){return he||(he=function(e,t,n){var r=D(indexedDB,"open",[e,t]),i=r.request;return i&&(i.onupgradeneeded=function(e){n&&n(new H(i.result,e.oldVersion,i.transaction))}),r.then((function(e){return new q(e)}))}("firebase-installations-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(de)}}))),he}function ge(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o,a;return c(this,(function(s){switch(s.label){case 0:return n=ue(e),[4,ve()];case 1:return r=s.sent(),i=r.transaction(de,"readwrite"),[4,(o=i.objectStore(de)).get(n)];case 2:return a=s.sent(),[4,o.put(t,n)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),a&&a.fid===t.fid||le(e,t.fid),[2,t]}}))}))}function me(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:return t=ue(e),[4,ve()];case 1:return n=i.sent(),[4,(r=n.transaction(de,"readwrite")).objectStore(de).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function ye(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o,a,s;return c(this,(function(u){switch(u.label){case 0:return n=ue(e),[4,ve()];case 1:return r=u.sent(),i=r.transaction(de,"readwrite"),[4,(o=i.objectStore(de)).get(n)];case 2:return a=u.sent(),void 0!==(s=t(a))?[3,4]:[4,o.delete(n)];case 3:return u.sent(),[3,6];case 4:return[4,o.put(s,n)];case 5:u.sent(),u.label=6;case 6:return[4,i.complete];case 7:return u.sent(),!s||a&&a.fid===s.fid||le(e,s.fid),[2,s]}}))}))}
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
     */function be(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:return[4,ye(e,(function(n){var r=function(e){return _e(e||{fid:se(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(J.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,re(e,t)];case 1:return n=i.sent(),[2,ge(e,n)];case 2:return Y(r=i.sent())&&409===r.customData.serverCode?[4,me(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,ge(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:we(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}))];case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function we(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,Ie(e)];case 1:t=o.sent(),o.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,ie(100)];case 3:return o.sent(),[4,Ie(e)];case 4:return t=o.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,be(e)];case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r];case 7:return[2,t]}}))}))}function Ie(e){return ye(e,(function(e){if(!e)throw J.create("installation-not-found");return _e(e)}))}function _e(e){return 1===(t=e).registrationStatus&&t.registrationTime+U<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
     */}function Ee(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return u(this,void 0,void 0,(function(){var e,i,o,a,s,u,l;return c(this,(function(c){switch(c.label){case 0:return e=function(e,t){var n=t.fid;return X(e)+"/"+n+"/authTokens:generate"}
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
     */(n,t),i=te(n,t),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:G}},s={method:"POST",headers:i,body:JSON.stringify(a)},[4,ne((function(){return fetch(e,s)}))];case 1:return(u=c.sent()).ok?[4,u.json()]:[3,3];case 2:return l=c.sent(),[2,Z(l)];case 3:return[4,Q("Generate Auth Token",u)];case 4:throw c.sent()}}))}))}function Te(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,ye(e.appConfig,(function(r){if(!Ce(r))throw J.create("not-registered");var i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+$}(e)}(i))return r;if(1===i.requestStatus)return n=function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return[4,Se(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,ie(100)];case 3:return i.sent(),[4,Se(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,Te(e,t)]:[2,r]}}))}))}(e,t),r;if(!navigator.onLine)throw J.create("app-offline");var o=function(e){var t={requestStatus:1,requestTime:Date.now()};return s(s({},e),{authToken:t})}(r);return n=function(e,t){return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,Ee(e,t)];case 1:return n=o.sent(),i=s(s({},t),{authToken:n}),[4,ge(e.appConfig,i)];case 2:return o.sent(),[2,n];case 3:return!Y(r=o.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,me(e.appConfig)];case 4:return o.sent(),[3,7];case 5:return i=s(s({},t),{authToken:{requestStatus:0}}),[4,ge(e.appConfig,i)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}}))}))}(e,o),o}))];case 1:return r=o.sent(),n?[4,n]:[3,3];case 2:return i=o.sent(),[3,4];case 3:i=r.authToken,o.label=4;case 4:return[2,i]}}))}))}function Se(e){return ye(e,(function(e){if(!Ce(e))throw J.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+U<Date.now()?s(s({},e),{authToken:{requestStatus:0}}):e}))}function Ce(e){return void 0!==e&&2===e.registrationStatus}function Pe(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,be(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
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
     */function xe(e){return J.create("missing-app-config-values",{valueName:e})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Oe="installations-exp",De=function(e){var n=e.getProvider("app-exp").getImmediate();return{app:n,appConfig:function(e){var t,n;if(!e||!e.options)throw xe("App Configuration");if(!e.name)throw xe("App Name");try{for(var r=l(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value;if(!e.options[o])throw xe(o)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(n),platformLoggerProvider:t._getProvider(n,"platform-logger"),_delete:function(){return Promise.resolve()}}},Ae=function(e){var n=e.getProvider("app-exp").getImmediate(),r=t._getProvider(n,Oe).getImmediate();return{getId:function(){
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
     */return function(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,be((t=e).appConfig)];case 1:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?i.catch(console.error):Te(t).catch(console.error),[2,r.fid]}}))}))}
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
     */(r)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,Pe((n=e).appConfig)];case 1:return r.sent(),[4,Te(n,t)];case 2:return[2,r.sent().token]}}))}))}(r,e)}}};t._registerComponent(new P(Oe,De,"PUBLIC")),t._registerComponent(new P("installations-exp-internal",Ae,"PRIVATE")),t.registerVersion("@firebase/installations-exp",K);
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
var Ne,ke="analytics-exp",je="https://www.googletagmanager.com/gtag/js",Re=new g("@firebase/analytics");
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
function Le(e){return Promise.all(e.map((function(e){return e.catch((function(e){return e}))})))}function Me(e,t,n,r,i,o){return u(this,void 0,void 0,(function(){var a,s,u,l;return c(this,(function(c){switch(c.label){case 0:a=r[i],c.label=1;case 1:return c.trys.push([1,7,,8]),a?[4,t[a]]:[3,3];case 2:return c.sent(),[3,6];case 3:return[4,Le(n)];case 4:return s=c.sent(),(u=s.find((function(e){return e.measurementId===i})))?[4,t[u.appId]]:[3,6];case 5:c.sent(),c.label=6;case 6:return[3,8];case 7:return l=c.sent(),Re.error(l),[3,8];case 8:return e("config",i,o),[2]}}))}))}function Fe(e,t,n,r,i){return u(this,void 0,void 0,(function(){var o,a,s,u,l,f,p,d;return c(this,(function(c){switch(c.label){case 0:return c.trys.push([0,4,,5]),o=[],i&&i.send_to?(a=i.send_to,Array.isArray(a)||(a=[a]),[4,Le(n)]):[3,2];case 1:for(s=c.sent(),u=function(e){var n=s.find((function(t){return t.measurementId===e})),r=n&&t[n.appId];if(!r)return o=[],"break";o.push(r)},l=0,f=a;l<f.length&&(p=f[l],"break"!==u(p));l++);c.label=2;case 2:return 0===o.length&&(o=Object.values(t)),[4,Promise.all(o)];case 3:return c.sent(),e("event",r,i||{}),[3,5];case 4:return d=c.sent(),Re.error(d),[3,5];case 5:return[2]}}))}))}function Be(e,t,n,r,i){var o=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];window[r].push(arguments)};return window[i]&&"function"==typeof window[i]&&(o=window[i]),window[i]=function(e,t,n,r){return function(i,o,a){return u(this,void 0,void 0,(function(){var s;return c(this,(function(u){switch(u.label){case 0:return u.trys.push([0,6,,7]),"event"!==i?[3,2]:[4,Fe(e,t,n,o,a)];case 1:return u.sent(),[3,5];case 2:return"config"!==i?[3,4]:[4,Me(e,t,n,r,o,a)];case 3:return u.sent(),[3,5];case 4:e("set",o),u.label=5;case 5:return[3,7];case 6:return s=u.sent(),Re.error(s),[3,7];case 7:return[2]}}))}))}}(o,e,t,n),{gtagCore:o,wrappedGtag:window[i]}}var He=((Ne={})["already-exists"]="A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",Ne["already-initialized"]="Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",Ne["interop-component-reg-failed"]="Firebase Analytics Interop Component failed to instantiate: {$reason}",Ne["invalid-analytics-context"]="Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",Ne["indexeddb-unavailable"]="IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",Ne["fetch-throttle"]="The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",Ne["config-fetch-failed"]="Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",Ne["no-api-key"]='The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',Ne["no-app-id"]='The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',Ne),qe=new _("analytics","Analytics",He),Ve=new(function(){function e(e,t){void 0===e&&(e={}),void 0===t&&(t=1e3),this.throttleMetadata=e,this.intervalMillis=t}return e.prototype.getThrottleMetadata=function(e){return this.throttleMetadata[e]},e.prototype.setThrottleMetadata=function(e,t){this.throttleMetadata[e]=t},e.prototype.deleteThrottleMetadata=function(e){delete this.throttleMetadata[e]},e}());function Ke(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Ue(e){var t;return u(this,void 0,void 0,(function(){var n,r,i,o,a,s,u;return c(this,(function(c){switch(c.label){case 0:return n=e.appId,r=e.apiKey,i={method:"GET",headers:Ke(r)},o="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),[4,fetch(o,i)];case 1:if(200===(a=c.sent()).status||304===a.status)return[3,6];s="",c.label=2;case 2:return c.trys.push([2,4,,5]),[4,a.json()];case 3:return u=c.sent(),(null===(t=u.error)||void 0===t?void 0:t.message)&&(s=u.error.message),[3,5];case 4:return c.sent(),[3,5];case 5:throw qe.create("config-fetch-failed",{httpStatus:a.status,responseMessage:s});case 6:return[2,a.json()]}}))}))}function Ge(e,t,n,r){var i=t.throttleEndTimeMillis,o=t.backoffCount;return void 0===r&&(r=Ve),u(this,void 0,void 0,(function(){var t,a,s,u,l,f,p;return c(this,(function(c){switch(c.label){case 0:t=e.appId,a=e.measurementId,c.label=1;case 1:return c.trys.push([1,3,,4]),[4,We(n,i)];case 2:return c.sent(),[3,4];case 3:if(s=c.sent(),a)return Re.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID "+a+' provided in the "measurementId" field in the local Firebase config. ['+s.message+"]"),[2,{appId:t,measurementId:a}];throw s;case 4:return c.trys.push([4,6,,7]),[4,Ue(e)];case 5:return u=c.sent(),r.deleteThrottleMetadata(t),[2,u];case 6:if(!function(e){if(!(e instanceof I&&e.customData))return!1;var t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(l=c.sent())){if(r.deleteThrottleMetadata(t),a)return Re.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID "+a+' provided in the "measurementId" field in the local Firebase config. ['+l.message+"]"),[2,{appId:t,measurementId:a}];throw l}return f=503===Number(l.customData.httpStatus)?S(o,r.intervalMillis,30):S(o,r.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:o+1},r.setThrottleMetadata(t,p),Re.debug("Calling attemptFetch again in "+f+" millis"),[2,Ge(e,p,n,r)];case 7:return[2]}}))}))}function We(e,t){return new Promise((function(n,r){var i=Math.max(t-Date.now(),0),o=setTimeout(n,i);e.addEventListener((function(){clearTimeout(o),r(qe.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}var $e=function(){function e(){this.listeners=[]}return e.prototype.addEventListener=function(e){this.listeners.push(e)},e.prototype.abort=function(){this.listeners.forEach((function(e){return e()}))},e}();
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ze(e,t,n,r,i,o){return u(this,void 0,void 0,(function(){var a,s,l,f,p,d,h;return c(this,(function(v){switch(v.label){case 0:return(a=function(e,t,n){return void 0===t&&(t=Ve),u(this,void 0,void 0,(function(){var r,i,o,a,s,l,f=this;return c(this,(function(p){if(r=e.options,i=r.appId,o=r.apiKey,a=r.measurementId,!i)throw qe.create("no-app-id");if(!o){if(a)return[2,{measurementId:a,appId:i}];throw qe.create("no-api-key")}return s=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new $e,setTimeout((function(){return u(f,void 0,void 0,(function(){return c(this,(function(e){return l.abort(),[2]}))}))}),void 0!==n?n:6e4),[2,Ge({appId:i,apiKey:o,measurementId:a},s,l,t)]}))}))}(e)).then((function(t){n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&Re.warn("The measurement ID in the local Firebase config ("+e.options.measurementId+") does not match the measurement ID fetched from the server ("+t.measurementId+"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.")})).catch((function(e){return Re.error(e)})),t.push(a),s=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return y()?[3,1]:(Re.warn(qe.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),[2,!1]);case 1:return t.trys.push([1,3,,4]),[4,b()];case 2:return t.sent(),[3,4];case 3:return e=t.sent(),Re.warn(qe.create("indexeddb-unavailable",{errorInfo:e}).message),[2,!1];case 4:return[2,!0]}}))}))}().then((function(e){return e?r.getId():void 0})),[4,Promise.all([a,s])];case 1:return l=v.sent(),f=l[0],p=l[1],function(){for(var e=window.document.getElementsByTagName("script"),t=0,n=Object.values(e);t<n.length;t++){var r=n[t];if(r.src&&r.src.includes(je))return r}return null}
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
     */()||function(e,t){var n=document.createElement("script");n.src=je+"?l="+e+"&id="+t,n.async=!0,document.head.appendChild(n)}(o,f.measurementId),i("js",new Date),(h={}).origin="firebase",h.update=!0,d=h,null!=p&&(d.firebase_id=p),i("config",f.measurementId,d),[2,f.measurementId]}}))}))}
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
     */var Je,Ye,Xe=function(){function e(e){this.app=e}return e.prototype._delete=function(){return delete Ze[this.app.options.appId],Promise.resolve()},e}(),Ze={},Qe=[],et={},tt="dataLayer",nt="gtag",rt=!1;function it(e){if(rt)throw qe.create("already-initialized");e.dataLayerName&&(tt=e.dataLayerName),e.gtagName&&(nt=e.gtagName)}function ot(e,t){!function(){var e=[];if(m()&&e.push("This is a browser extension environment."),w()||e.push("Cookies are not available."),e.length>0){var t=e.map((function(e,t){return"("+(t+1)+") "+e})).join(" "),n=qe.create("invalid-analytics-context",{errorInfo:t});Re.warn(n.message)}}();var n=e.options.appId;if(!n)throw qe.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw qe.create("no-api-key");Re.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '+e.options.measurementId+' provided in the "measurementId" field in the local Firebase config.')}if(null!=Ze[n])throw qe.create("already-exists",{id:n});if(!rt){!function(e){var t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(tt);var r=Be(Ze,Qe,et,tt,nt),i=r.wrappedGtag,o=r.gtagCore;Ye=i,Je=o,rt=!0}return Ze[n]=ze(e,Qe,et,t,Je,tt),new Xe(e)}
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
     */function at(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:if(m())return[2,!1];if(!w())return[2,!1];if(!y())return[2,!1];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,b()];case 2:return[2,e.sent()];case 3:return e.sent(),[2,!1];case 4:return[2]}}))}))}function st(e,t,n){e=C(e),function(e,t,n,r){return u(this,void 0,void 0,(function(){var i;return c(this,(function(o){switch(o.label){case 0:return r&&r.global?(e("set",{screen_name:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=o.sent(),e("config",i,{update:!0,screen_name:n}),o.label=3;case 3:return[2]}}))}))}(Ye,Ze[e.app.options.appId],t,n).catch((function(e){return Re.error(e)}))}function ut(e,t,n){e=C(e),function(e,t,n,r){return u(this,void 0,void 0,(function(){var i;return c(this,(function(o){switch(o.label){case 0:return r&&r.global?(e("set",{user_id:n}),[2,Promise.resolve()]):[3,1];case 1:return[4,t];case 2:i=o.sent(),e("config",i,{update:!0,user_id:n}),o.label=3;case 3:return[2]}}))}))}(Ye,Ze[e.app.options.appId],t,n).catch((function(e){return Re.error(e)}))}function ct(e,t,n){e=C(e),function(e,t,n,r){return u(this,void 0,void 0,(function(){var i,o,a,s,u;return c(this,(function(c){switch(c.label){case 0:if(!r||!r.global)return[3,1];for(i={},o=0,a=Object.keys(n);o<a.length;o++)s=a[o],i["user_properties."+s]=n[s];return e("set",i),[2,Promise.resolve()];case 1:return[4,t];case 2:u=c.sent(),e("config",u,{update:!0,user_properties:n}),c.label=3;case 3:return[2]}}))}))}(Ye,Ze[e.app.options.appId],t,n).catch((function(e){return Re.error(e)}))}function lt(e,t){e=C(e),function(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,e];case 1:return n=r.sent(),window["ga-disable-"+n]=!t,[2]}}))}))}(Ze[e.app.options.appId],t).catch((function(e){return Re.error(e)}))}function ft(e,t,n,r){e=C(e),function(e,t,n,r,i){return u(this,void 0,void 0,(function(){var o,a;return c(this,(function(u){switch(u.label){case 0:return i&&i.global?(e("event",n,r),[2]):[3,1];case 1:return[4,t];case 2:o=u.sent(),a=s(s({},r),{send_to:o}),e("event",n,a),u.label=3;case 3:return[2]}}))}))}(Ye,Ze[e.app.options.appId],t,n,r).catch((function(e){return Re.error(e)}))}t._registerComponent(new P(ke,(function(e){return ot(e.getProvider("app-exp").getImmediate(),e.getProvider("installations-exp-internal").getImmediate())}),"PUBLIC")),t._registerComponent(new P("analytics-internal",(function(e){try{var t=e.getProvider(ke).getImmediate();return{logEvent:function(e,n,r){return ft(t,e,n,r)}}}catch(e){throw qe.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),t.registerVersion("@firebase/analytics-exp","0.0.900-exp.8294e6082");var pt,dt=function(){function e(e,t){this.app=e,this._delegate=t}return e.prototype.logEvent=function(e,t,n){ft(this._delegate,e,t,n)},e.prototype.setCurrentScreen=function(e,t){st(this._delegate,e,t)},e.prototype.setUserId=function(e,t){ut(this._delegate,e,t)},e.prototype.setUserProperties=function(e,t){ct(this._delegate,e,t)},e.prototype.setAnalyticsCollectionEnabled=function(e){lt(this._delegate,e)},e}();!function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(pt||(pt={}));
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
var ht,vt=function(e){var t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("analytics-exp").getImmediate();return new dt(t,n)};ht={Analytics:dt,settings:it,isSupported:at,EventName:pt},r.default.INTERNAL.registerComponent(new P("analytics-compat",vt,"PUBLIC").setServiceProps(ht).setMultipleInstances(!0)),r.default.registerVersion("@firebase/analytics-compat","0.0.900-exp.8294e6082")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-analytics-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-analytics-compat.js.map
