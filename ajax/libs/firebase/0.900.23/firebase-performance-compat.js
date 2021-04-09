!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).firebase,t.firebase.INTERNAL.modularAPIs)}(this,(function(t,e){"use strict";try{(function(){function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=n(t),i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};
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
    ***************************************************************************** */var o=function(){return(o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function a(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{u(r.next(t))}catch(t){o(t)}}function s(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}u((r=r.apply(t,e||[])).next())}))}function s(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function u(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function c(t,e){for(var n=0,r=e.length,i=t.length;n<r;n++,i++)t[i]=e[n];return t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var l=function(t){function e(n,r,i){var o=t.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,f.prototype.create),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e}(Error),f=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},i=this.service+"/"+t,o=this.errors[t],a=o?p(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",u=new l(i,s,r);return u},t}();function p(t,e){return t.replace(d,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var d=/\{\$([^}]+)}/g;
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
     */var h,g,m=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(g||(g={}));var v={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},y=g.INFO,b=((h={})[g.DEBUG]="log",h[g.VERBOSE]="log",h[g.INFO]="info",h[g.WARN]="warn",h[g.ERROR]="error",h),_=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var i=(new Date).toISOString(),o=b[e];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[o].apply(console,c(["["+i+"]  "+t.name+":"],n))}},w=function(){function t(t){this.name=t,this._logLevel=y,this._logHandler=_,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in g))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?v[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,g.DEBUG],t)),this._logHandler.apply(this,c([this,g.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,g.VERBOSE],t)),this._logHandler.apply(this,c([this,g.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,g.INFO],t)),this._logHandler.apply(this,c([this,g.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,g.WARN],t)),this._logHandler.apply(this,c([this,g.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,g.ERROR],t)),this._logHandler.apply(this,c([this,g.ERROR],t))},t}();function E(t){return Array.prototype.slice.call(t)}function I(t){return new Promise((function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function T(t,e,n){var r,i=new Promise((function(i,o){I(r=t[e].apply(t,n)).then(i,o)}));return i.request=r,i}function S(t,e,n){var r=T(t,e,n);return r.then((function(t){if(t)return new C(t,r.request)}))}function N(t,e,n){n.forEach((function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})}))}function k(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return T(this[e],r,arguments)})}))}function A(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})}))}function O(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return S(this[e],r,arguments)})}))}function P(t){this._index=t}function C(t,e){this._cursor=t,this._request=e}function R(t){this._store=t}function x(t){this._tx=t,this.complete=new Promise((function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}}))}function M(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new x(n)}function j(t){this._db=t}N(P,"_index",["name","keyPath","multiEntry","unique"]),k(P,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),O(P,"_index",IDBIndex,["openCursor","openKeyCursor"]),N(C,"_cursor",["direction","key","primaryKey","value"]),k(C,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(t){t in IDBCursor.prototype&&(C.prototype[t]=function(){var e=this,n=arguments;return Promise.resolve().then((function(){return e._cursor[t].apply(e._cursor,n),I(e._request).then((function(t){if(t)return new C(t,e._request)}))}))})})),R.prototype.createIndex=function(){return new P(this._store.createIndex.apply(this._store,arguments))},R.prototype.index=function(){return new P(this._store.index.apply(this._store,arguments))},N(R,"_store",["name","keyPath","indexNames","autoIncrement"]),k(R,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),O(R,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),A(R,"_store",IDBObjectStore,["deleteIndex"]),x.prototype.objectStore=function(){return new R(this._tx.objectStore.apply(this._tx,arguments))},N(x,"_tx",["objectStoreNames","mode"]),A(x,"_tx",IDBTransaction,["abort"]),M.prototype.createObjectStore=function(){return new R(this._db.createObjectStore.apply(this._db,arguments))},N(M,"_db",["name","version","objectStoreNames"]),A(M,"_db",IDBDatabase,["deleteObjectStore","close"]),j.prototype.transaction=function(){return new x(this._db.transaction.apply(this._db,arguments))},N(j,"_db",["name","version","objectStoreNames"]),A(j,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(t){[R,P].forEach((function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var e=E(arguments),n=e[e.length-1],r=this._store||this._index,i=r[t].apply(r,e.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[P,R].forEach((function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise((function(i){n.iterateCursor(t,(function(t){t?(r.push(t.value),void 0===e||r.length!=e?t.continue():i(r)):i(r)}))}))})}));var B,D="0.0.900-exp.b0c8425bc",L=1e4,U="w:"+D,q="FIS_v2",F=36e5,H=((B={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',B["not-registered"]="Firebase Installation is not registered.",B["installation-not-found"]="Firebase Installation not found.",B["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',B["app-offline"]="Could not process request. Application offline.",B["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",B),V=new f("installations","Installations",H);function K(t){return t instanceof l&&t.code.includes("request-failed")}
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
     */function W(t){return"https://firebaseinstallations.googleapis.com/v1/projects/"+t.projectId+"/installations"}function $(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}function z(t,e){return a(this,void 0,void 0,(function(){var n,r;return s(this,(function(i){switch(i.label){case 0:return[4,e.json()];case 1:return n=i.sent(),r=n.error,[2,V.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function G(t){var e=t.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function J(t,e){var n=e.refreshToken,r=G(t);return r.append("Authorization",function(t){return"FIS_v2 "+t}
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
     */(n)),r}function Y(t){return a(this,void 0,void 0,(function(){var e;return s(this,(function(n){switch(n.label){case 0:return[4,t()];case 1:return(e=n.sent()).status>=500&&e.status<600?[2,t()]:[2,e]}}))}))}function Z(t,e){var n=e.fid;return a(this,void 0,void 0,(function(){var e,r,i,o,a,u;return s(this,(function(s){switch(s.label){case 0:return e=W(t),r=G(t),i={fid:n,authVersion:q,appId:t.appId,sdkVersion:U},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,Y((function(){return fetch(e,o)}))];case 1:return(a=s.sent()).ok?[4,a.json()]:[3,3];case 2:return u=s.sent(),[2,{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:$(u.authToken)}];case 3:return[4,z("Create Installation",a)];case 4:throw s.sent()}}))}))}
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
     */function Q(t){return new Promise((function(e){setTimeout(e,t)}))}
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
     */function X(t){return btoa(String.fromCharCode.apply(String,c([],function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}(t)))).replace(/\+/g,"-").replace(/\//g,"_")}
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
     */var tt=/^[cdef][\w-]{21}$/;function et(){try{var t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;var e=function(t){return X(t).substr(0,22)}
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
     */(t);return tt.test(e)?e:""}catch(t){return""}}function nt(t){return t.appName+"!"+t.appId}
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
     */var rt=new Map;function it(t,e){var n=nt(t);ot(n,e),function(t,e){var n=function(){!at&&"BroadcastChannel"in self&&((at=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(t){ot(t.data.key,t.data.fid)});return at}();n&&n.postMessage({key:t,fid:e});0===rt.size&&at&&(at.close(),at=null)}(n,e)}function ot(t,e){var n,r,i=rt.get(t);if(i)try{for(var o=u(i),a=o.next();!a.done;a=o.next()){(0,a.value)(e)}}catch(t){n={error:t}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var at=null;
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
var st="firebase-installations-store",ut=null;function ct(){return ut||(ut=function(t,e,n){var r=T(indexedDB,"open",[t,e]),i=r.request;return i&&(i.onupgradeneeded=function(t){n&&n(new M(i.result,t.oldVersion,i.transaction))}),r.then((function(t){return new j(t)}))}("firebase-installations-database",1,(function(t){switch(t.oldVersion){case 0:t.createObjectStore(st)}}))),ut}function lt(t,e){return a(this,void 0,void 0,(function(){var n,r,i,o,a;return s(this,(function(s){switch(s.label){case 0:return n=nt(t),[4,ct()];case 1:return r=s.sent(),i=r.transaction(st,"readwrite"),[4,(o=i.objectStore(st)).get(n)];case 2:return a=s.sent(),[4,o.put(e,n)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),a&&a.fid===e.fid||it(t,e.fid),[2,e]}}))}))}function ft(t){return a(this,void 0,void 0,(function(){var e,n,r;return s(this,(function(i){switch(i.label){case 0:return e=nt(t),[4,ct()];case 1:return n=i.sent(),[4,(r=n.transaction(st,"readwrite")).objectStore(st).delete(e)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function pt(t,e){return a(this,void 0,void 0,(function(){var n,r,i,o,a,u;return s(this,(function(s){switch(s.label){case 0:return n=nt(t),[4,ct()];case 1:return r=s.sent(),i=r.transaction(st,"readwrite"),[4,(o=i.objectStore(st)).get(n)];case 2:return a=s.sent(),void 0!==(u=e(a))?[3,4]:[4,o.delete(n)];case 3:return s.sent(),[3,6];case 4:return[4,o.put(u,n)];case 5:s.sent(),s.label=6;case 6:return[4,i.complete];case 7:return s.sent(),!u||a&&a.fid===u.fid||it(t,u.fid),[2,u]}}))}))}
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
     */function dt(t){return a(this,void 0,void 0,(function(){var e,n,r;return s(this,(function(i){switch(i.label){case 0:return[4,pt(t,(function(n){var r=function(t){return mt(t||{fid:et(),registrationStatus:0})}(n),i=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine)return{installationEntry:e,registrationPromise:Promise.reject(V.create("app-offline"))};var n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:function(t,e){return a(this,void 0,void 0,(function(){var n,r;return s(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,Z(t,e)];case 1:return n=i.sent(),[2,lt(t,n)];case 2:return K(r=i.sent())&&409===r.customData.serverCode?[4,ft(t)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,lt(t,{fid:e.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}(t,n)}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:ht(t)}:{installationEntry:e}}(t,r);return e=i.registrationPromise,i.installationEntry}))];case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,e]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:e}]}}))}))}function ht(t){return a(this,void 0,void 0,(function(){var e,n,r,i;return s(this,(function(o){switch(o.label){case 0:return[4,gt(t)];case 1:e=o.sent(),o.label=2;case 2:return 1!==e.registrationStatus?[3,5]:[4,Q(100)];case 3:return o.sent(),[4,gt(t)];case 4:return e=o.sent(),[3,2];case 5:return 0!==e.registrationStatus?[3,7]:[4,dt(t)];case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r];case 7:return[2,e]}}))}))}function gt(t){return pt(t,(function(t){if(!t)throw V.create("installation-not-found");return mt(t)}))}function mt(t){return 1===(e=t).registrationStatus&&e.registrationTime+L<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e;
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
     */}function vt(t,e){var n=t.appConfig,r=t.platformLoggerProvider;return a(this,void 0,void 0,(function(){var t,i,o,a,u,c,l;return s(this,(function(s){switch(s.label){case 0:return t=function(t,e){var n=e.fid;return W(t)+"/"+n+"/authTokens:generate"}
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
     */(n,e),i=J(n,e),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:U}},u={method:"POST",headers:i,body:JSON.stringify(a)},[4,Y((function(){return fetch(t,u)}))];case 1:return(c=s.sent()).ok?[4,c.json()]:[3,3];case 2:return l=s.sent(),[2,$(l)];case 3:return[4,z("Generate Auth Token",c)];case 4:throw s.sent()}}))}))}function yt(t,e){return void 0===e&&(e=!1),a(this,void 0,void 0,(function(){var n,r,i;return s(this,(function(u){switch(u.label){case 0:return[4,pt(t.appConfig,(function(r){if(!_t(r))throw V.create("not-registered");var i=r.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){var e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+F}(t)}(i))return r;if(1===i.requestStatus)return n=function(t,e){return a(this,void 0,void 0,(function(){var n,r;return s(this,(function(i){switch(i.label){case 0:return[4,bt(t.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,Q(100)];case 3:return i.sent(),[4,bt(t.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,yt(t,e)]:[2,r]}}))}))}(t,e),r;if(!navigator.onLine)throw V.create("app-offline");var u=function(t){var e={requestStatus:1,requestTime:Date.now()};return o(o({},t),{authToken:e})}(r);return n=function(t,e){return a(this,void 0,void 0,(function(){var n,r,i;return s(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,8]),[4,vt(t,e)];case 1:return n=a.sent(),i=o(o({},e),{authToken:n}),[4,lt(t.appConfig,i)];case 2:return a.sent(),[2,n];case 3:return!K(r=a.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,ft(t.appConfig)];case 4:return a.sent(),[3,7];case 5:return i=o(o({},e),{authToken:{requestStatus:0}}),[4,lt(t.appConfig,i)];case 6:a.sent(),a.label=7;case 7:throw r;case 8:return[2]}}))}))}(t,u),u}))];case 1:return r=u.sent(),n?[4,n]:[3,3];case 2:return i=u.sent(),[3,4];case 3:i=r.authToken,u.label=4;case 4:return[2,i]}}))}))}function bt(t){return pt(t,(function(t){if(!_t(t))throw V.create("not-registered");var e,n=t.authToken;return 1===(e=n).requestStatus&&e.requestTime+L<Date.now()?o(o({},t),{authToken:{requestStatus:0}}):t}))}function _t(t){return void 0!==t&&2===t.registrationStatus}function wt(t){return a(this,void 0,void 0,(function(){var e;return s(this,(function(n){switch(n.label){case 0:return[4,dt(t)];case 1:return(e=n.sent().registrationPromise)?[4,e]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
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
     */function Et(t){return V.create("missing-app-config-values",{valueName:t})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var It="installations-exp",Tt=function(t){var n=t.getProvider("app-exp").getImmediate();return{app:n,appConfig:function(t){var e,n;if(!t||!t.options)throw Et("App Configuration");if(!t.name)throw Et("App Name");try{for(var r=u(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value;if(!t.options[o])throw Et(o)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(n),platformLoggerProvider:e._getProvider(n,"platform-logger"),_delete:function(){return Promise.resolve()}}},St=function(t){var n=t.getProvider("app-exp").getImmediate(),r=e._getProvider(n,It).getImmediate();return{getId:function(){
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
     */return function(t){return a(this,void 0,void 0,(function(){var e,n,r,i;return s(this,(function(o){switch(o.label){case 0:return[4,dt((e=t).appConfig)];case 1:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?i.catch(console.error):yt(e).catch(console.error),[2,r.fid]}}))}))}
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
     */(r)},getToken:function(t){return function(t,e){return void 0===e&&(e=!1),a(this,void 0,void 0,(function(){var n;return s(this,(function(r){switch(r.label){case 0:return[4,wt((n=t).appConfig)];case 1:return r.sent(),[4,yt(n,e)];case 2:return[2,r.sent().token]}}))}))}(r,t)}}};e._registerComponent(new m(It,Tt,"PUBLIC")),e._registerComponent(new m("installations-exp-internal",St,"PRIVATE")),e.registerVersion("@firebase/installations-exp",D);var Nt,kt,At,Ot="0.0.900-exp.b0c8425bc",Pt=Ot,Ct="FB-PERF-TRACE-MEASURE",Rt="_wt_",xt="_fcp",Mt="_fid",jt="@firebase/performance/config",Bt="@firebase/performance/configexpire",Dt="Performance",Lt=((Nt={})["trace started"]="Trace {$traceName} was started before.",Nt["trace stopped"]="Trace {$traceName} is not running.",Nt["nonpositive trace startTime"]="Trace {$traceName} startTime should be positive.",Nt["nonpositive trace duration"]="Trace {$traceName} duration should be positive.",Nt["no window"]="Window is not available.",Nt["no app id"]="App id is not available.",Nt["no project id"]="Project id is not available.",Nt["no api key"]="Api key is not available.",Nt["invalid cc log"]="Attempted to queue invalid cc event",Nt["FB not default"]="Performance can only start when Firebase app instance is the default one.",Nt["RC response not ok"]="RC response is not ok",Nt["invalid attribute name"]="Attribute name {$attributeName} is invalid.",Nt["invalid attribute value"]="Attribute value {$attributeValue} is invalid.",Nt["invalid custom metric name"]="Custom metric name {$customMetricName} is invalid",Nt["invalid String merger input"]="Input for String merger is invalid, contact support team to resolve.",Nt["already initialized"]="Performance can only be initialized once.",Nt),Ut=new f("performance",Dt,Lt),qt=new w(Dt);qt.logLevel=g.INFO;var Ft,Ht,Vt=function(){function t(t){if(this.window=t,!t)throw Ut.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(t){this.performance&&this.performance.mark&&this.performance.mark(t)},t.prototype.measure=function(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)},t.prototype.getEntriesByType=function(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]},t.prototype.getEntriesByName=function(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.requiredApisAvailable=function(){return fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled?"indexedDB"in self&&null!=indexedDB||(qt.info("IndexedDB is not supported by current browswer"),!1):(qt.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)},t.prototype.setupObserver=function(t,e){this.PerformanceObserver&&new this.PerformanceObserver((function(t){for(var n=0,r=t.getEntries();n<r.length;n++){var i=r[n];e(i)}})).observe({entryTypes:[t]})},t.getInstance=function(){return void 0===kt&&(kt=new t(At)),kt},t}();function Kt(){return Ft}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function Wt(t,e){var n=t.length-e.length;if(n<0||n>1)throw Ut.create("invalid String merger input");for(var r=[],i=0;i<t.length;i++)r.push(t.charAt(i)),e.length>i&&r.push(e.charAt(i));return r.join("")}
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
     */var $t,zt=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Wt("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Wt("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getFlTransportFullUrl=function(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)},t.getInstance=function(){return void 0===Ht&&(Ht=new t),Ht},t}();
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"}($t||($t={}));var Gt=["firebase_","google_","ga_"],Jt=new RegExp("^[a-zA-Z]\\w*$");function Yt(){var t=Vt.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function Zt(){switch(Vt.getInstance().document.visibilityState){case"visible":return $t.VISIBLE;case"hidden":return $t.HIDDEN;default:return $t.UNKNOWN}}function Qt(){var t=Vt.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function Xt(t){var e,n=null===(e=t.options)||void 0===e?void 0:e.appId;if(!n)throw Ut.create("no app id");return n}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var te="0.0.1",ee=!0,ne="FIREBASE_INSTALLATIONS_AUTH";function re(t,e){var n=function(){var t=Vt.getInstance().localStorage;if(!t)return;var e=t.getItem(Bt);if(!(e&&(n=e,Number(n)>Date.now())))return;var n;var r=t.getItem(jt);if(!r)return;try{return JSON.parse(r)}catch(t){return}}();return n?(oe(n),Promise.resolve()):function(t,e){return(n=t.installations,r=n.getToken(),r.then((function(t){})),r).then((function(n){var r=function(t){var e,n=null===(e=t.options)||void 0===e?void 0:e.projectId;if(!n)throw Ut.create("no project id");return n}(t.app),i=function(t){var e,n=null===(e=t.options)||void 0===e?void 0:e.apiKey;if(!n)throw Ut.create("no api key");return n}(t.app),o=new Request("https://firebaseremoteconfig.googleapis.com/v1/projects/"+r+"/namespaces/fireperf:fetch?key="+i,{method:"POST",headers:{Authorization:ne+" "+n},body:JSON.stringify({app_instance_id:e,app_instance_id_token:n,app_id:Xt(t.app),app_version:Pt,sdk_version:te})});return fetch(o).then((function(t){if(t.ok)return t.json();throw Ut.create("RC response not ok")}))})).catch((function(){qt.info(ie)}));var n,r}(t,e).then(oe).then((function(t){return function(t){var e=Vt.getInstance().localStorage;if(!t||!e)return;e.setItem(jt,JSON.stringify(t)),e.setItem(Bt,String(Date.now()+60*zt.getInstance().configTimeToLive*60*1e3))}(t)}),(function(){}))}var ie="Could not fetch config, will use default configs";function oe(t){if(!t)return t;var e=zt.getInstance(),n=t.entries||{};return void 0!==n.fpr_enabled?e.loggingEnabled="true"===String(n.fpr_enabled):e.loggingEnabled=ee,n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(e.transportKey=n.fpr_log_transport_key),void 0!==n.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=ae(e.tracesSamplingRate),e.logNetworkAfterSampling=ae(e.networkRequestsSamplingRate),t}function ae(t){return Math.random()<=t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var se,ue=1;function ce(t){return ue=2,se=se||function(t){return(e=Vt.getInstance().document,new Promise((function(t){if(e&&"complete"!==e.readyState){var n=function(){"complete"===e.readyState&&(e.removeEventListener("readystatechange",n),t())};e.addEventListener("readystatechange",n)}else t()}))).then((function(){return e=t.installations,(n=e.getId()).then((function(t){Ft=t})),n;var e,n})).then((function(e){return re(t,e)})).then((function(){return le()}),(function(){return le()}));var e}(t)}function le(){ue=3}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var fe,pe=1e4,de=3,he=[],ge=!1;function me(t){setTimeout((function(){var t,e;if(0!==de)return he.length?(t=he.splice(0,1e3),e=t.map((function(t){return{source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)}})),void function(t,e){return function(t){var e=zt.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(t).then((function(t){return t.ok||qt.info("Call to Firebase backend failed."),t.json()})).then((function(t){var n=Number(t.nextRequestWaitMillis),r=pe;isNaN(n)||(r=Math.max(n,r));var i=t.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&(he=c(c([],e),he),qt.info("Retry transport request later.")),de=3,me(r)}))}({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:zt.getInstance().logSource,log_event:e},t).catch((function(){he=c(c([],t),he),de--,qt.info("Tries left: "+de+"."),me(pe)}))):me(pe)}),t)}function ve(t){if(!t.eventTime||!t.message)throw Ut.create("invalid cc log");he=c(c([],he),[t])}function ye(t,e){fe||(fe=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];ve({message:t.apply(void 0,e),eventTime:Date.now()})}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(we)),fe(t,e)}function be(t){var e=zt.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&Vt.getInstance().requiredApisAvailable()&&(t.isAuto&&Zt()!==$t.VISIBLE||(3===ue?_e(t):ce(t.performanceController).then((function(){return _e(t)}),(function(){return _e(t)}))))}function _e(t){if(Kt()){var e=zt.getInstance();e.loggingEnabled&&e.logTraceAfterSampling&&setTimeout((function(){return ye(t,1)}),0)}}function we(t,e){return 0===e?(r={url:(n=t).url,http_method:n.httpMethod||0,http_response_code:200,response_payload_bytes:n.responsePayloadBytes,client_start_time_us:n.startTimeUs,time_to_response_initiated_us:n.timeToResponseInitiatedUs,time_to_response_completed_us:n.timeToResponseCompletedUs},i={application_info:Ee(n.performanceController.app),network_request_metric:r},JSON.stringify(i)):function(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);var n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);var r={application_info:Ee(t.performanceController.app),trace_metric:e};return JSON.stringify(r)}(t);var n,r,i}function Ee(t){return{google_app_id:Xt(t),app_instance_id:Kt(),web_app_info:{sdk_version:Pt,page_url:Vt.getInstance().getUrl(),service_worker_status:Yt(),visibility_state:Zt(),effective_connection_type:Qt()},application_process_state:0}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Ie=["_fp",xt,Mt];
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var Te=function(){function t(t,e,n,r){void 0===n&&(n=!1),this.performanceController=t,this.name=e,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=Vt.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark="FB-PERF-TRACE-START-"+this.randomId+"-"+this.name,this.traceStopMark="FB-PERF-TRACE-STOP-"+this.randomId+"-"+this.name,this.traceMeasure=r||"FB-PERF-TRACE-MEASURE-"+this.randomId+"-"+this.name,r&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(1!==this.state)throw Ut.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(2!==this.state)throw Ut.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),be(this)},t.prototype.record=function(t,e,n){if(t<=0)throw Ut.create("nonpositive trace startTime",{traceName:this.name});if(e<=0)throw Ut.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=o({},n.attributes)),n&&n.metrics)for(var r=0,i=Object.keys(n.metrics);r<i.length;r++){var a=i[r];isNaN(Number(n.metrics[a]))||(this.counters[a]=Number(Math.floor(n.metrics[a])))}be(this)},t.prototype.incrementMetric=function(t,e){void 0===e&&(e=1),void 0===this.counters[t]?this.putMetric(t,e):this.putMetric(t,this.counters[t]+e)},t.prototype.putMetric=function(t,e){if(!function(t,e){return!(0===t.length||t.length>100)&&(e&&e.startsWith(Rt)&&Ie.indexOf(t)>-1||!t.startsWith("_"))}(t,this.name))throw Ut.create("invalid custom metric name",{customMetricName:t});var n,r;this.counters[t]=(n=e,(r=Math.floor(n))<n&&qt.info("Metric value should be an Integer, setting the value as : "+r+"."),r)},t.prototype.getMetric=function(t){return this.counters[t]||0},t.prototype.putAttribute=function(t,e){var n=function(t){return!(0===t.length||t.length>40||Gt.some((function(e){return t.startsWith(e)}))||!t.match(Jt))}(t),r=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&r)this.customAttributes[t]=e;else{if(!n)throw Ut.create("invalid attribute name",{attributeName:t});if(!r)throw Ut.create("invalid attribute value",{attributeValue:e})}},t.prototype.getAttribute=function(t){return this.customAttributes[t]},t.prototype.removeAttribute=function(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]},t.prototype.getAttributes=function(){return o({},this.customAttributes)},t.prototype.setStartTime=function(t){this.startTimeUs=t},t.prototype.setDuration=function(t){this.durationUs=t},t.prototype.calculateTraceMetrics=function(){var t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))},t.createOobTrace=function(e,n,r,i){var o=Vt.getInstance().getUrl();if(o){var a=new t(e,Rt+o,!0),s=Math.floor(1e3*Vt.getInstance().getTimeOrigin());a.setStartTime(s),n&&n[0]&&(a.setDuration(Math.floor(1e3*n[0].duration)),a.putMetric("domInteractive",Math.floor(1e3*n[0].domInteractive)),a.putMetric("domContentLoadedEventEnd",Math.floor(1e3*n[0].domContentLoadedEventEnd)),a.putMetric("loadEventEnd",Math.floor(1e3*n[0].loadEventEnd)));if(r){var u=r.find((function(t){return"first-paint"===t.name}));u&&u.startTime&&a.putMetric("_fp",Math.floor(1e3*u.startTime));var c=r.find((function(t){return"first-contentful-paint"===t.name}));c&&c.startTime&&a.putMetric(xt,Math.floor(1e3*c.startTime)),i&&a.putMetric(Mt,Math.floor(1e3*i))}be(a)}},t.createUserTimingTrace=function(e,n){be(new t(e,n,!1,n))},t}();
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Se(t,e){var n=e;if(n&&void 0!==n.responseStart){var r=Vt.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),o=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,a=Math.floor(1e3*(n.responseEnd-n.startTime));!function(t){var e=zt.getInstance();if(e.instrumentationEnabled){var n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((function(){return ye(t,0)}),0)}}({performanceController:t,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:a})}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Ne(t){Kt()&&(setTimeout((function(){return function(t){var e=Vt.getInstance(),n=e.getEntriesByType("navigation"),r=e.getEntriesByType("paint");if(e.onFirstInputDelay){var i=setTimeout((function(){Te.createOobTrace(t,n,r),i=void 0}),5e3);e.onFirstInputDelay((function(e){i&&(clearTimeout(i),Te.createOobTrace(t,n,r,e))}))}else Te.createOobTrace(t,n,r)}(t)}),0),setTimeout((function(){return function(t){for(var e=Vt.getInstance(),n=e.getEntriesByType("resource"),r=0,i=n;r<i.length;r++){var o=i[r];Se(t,o)}e.setupObserver("resource",(function(e){return Se(t,e)}))}(t)}),0),setTimeout((function(){return function(t){for(var e=Vt.getInstance(),n=e.getEntriesByType("measure"),r=0,i=n;r<i.length;r++){var o=i[r];ke(t,o)}e.setupObserver("measure",(function(e){return ke(t,e)}))}(t)}),0))}function ke(t,e){var n=e.name;n.substring(0,Ct.length)!==Ct&&Te.createUserTimingTrace(t,n)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Ae=function(){function t(t,e){this.app=t,this.installations=e,this.initialized=!1}return t.prototype._init=function(t){var e=this;this.initialized||(void 0!==(null==t?void 0:t.dataCollectionEnabled)&&(this.dataCollectionEnabled=t.dataCollectionEnabled),void 0!==(null==t?void 0:t.instrumentationEnabled)&&(this.instrumentationEnabled=t.instrumentationEnabled),Vt.getInstance().requiredApisAvailable()?new Promise((function(t,e){try{var n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=function(){i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=function(){n=!1},i.onerror=function(){var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((function(t){t&&(ge||(me(5500),ge=!0),ce(e).then((function(){return Ne(e)}),(function(){return Ne(e)})),e.initialized=!0)})).catch((function(t){qt.info("Environment doesn't support IndexedDB: "+t)})):qt.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return zt.getInstance().instrumentationEnabled},set:function(t){zt.getInstance().instrumentationEnabled=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return zt.getInstance().dataCollectionEnabled},set:function(t){zt.getInstance().dataCollectionEnabled=t},enumerable:!1,configurable:!0}),t}();
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Oe=function(t,e){var n=e.options,r=t.getProvider("app-exp").getImmediate(),i=t.getProvider("installations-exp-internal").getImmediate();if("[DEFAULT]"!==r.name)throw Ut.create("FB not default");if("undefined"==typeof window)throw Ut.create("no window");!function(t){At=t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(window);var o=new Ae(r,i);return o._init(n),o};e._registerComponent(new m("performance-exp",Oe,"PUBLIC")),e.registerVersion("@firebase/performance-exp",Ot);
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var Pe,Ce=function(){function t(t,e){this.app=t,this._delegate=e}return Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return this._delegate.instrumentationEnabled},set:function(t){this._delegate.instrumentationEnabled=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return this._delegate.dataCollectionEnabled},set:function(t){this._delegate.dataCollectionEnabled=t},enumerable:!1,configurable:!0}),t.prototype.trace=function(t){return function(t,e){var n;return t=(n=t)&&n._delegate?n._delegate:n,new Te(t,e)}(this._delegate,t)},t}();function Re(t){var e=t.getProvider("app-compat").getImmediate(),n=t.getProvider("performance-exp").getImmediate();return new Ce(e,n)}(Pe=r.default).INTERNAL.registerComponent(new m("performance-compat",Re,"PUBLIC")),Pe.registerVersion("@firebase/performance-compat","0.0.900-exp.b0c8425bc")}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-performance-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-performance-compat.js.map
