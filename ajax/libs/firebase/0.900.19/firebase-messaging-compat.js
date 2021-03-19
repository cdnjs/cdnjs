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
    ***************************************************************************** */var o=function(){return(o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function s(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))}function a(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}function u(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function c(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function f(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var l=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,p.prototype.create),o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(t,e),t}(Error),p=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],s=o?d(o,r):"Error",a=this.serviceName+": "+s+" ("+i+").",u=new l(i,a,r);return u},e}();function d(e,t){return e.replace(h,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var h=/\{\$([^}]+)}/g,v=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}();function g(e){return Array.prototype.slice.call(e)}function b(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function y(e,t,n){var r,i=new Promise((function(i,o){b(r=e[t].apply(e,n)).then(i,o)}));return i.request=r,i}function m(e,t,n){var r=y(e,t,n);return r.then((function(e){if(e)return new T(e,r.request)}))}function w(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function k(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return y(this[t],r,arguments)})}))}function S(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function I(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return m(this[t],r,arguments)})}))}function _(e){this._index=e}function T(e,t){this._cursor=e,this._request=t}function C(e){this._store=e}function P(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function x(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new P(n)}function j(e){this._db=e}function D(e,t,n){var r=y(indexedDB,"open",[e,t]),i=r.request;return i&&(i.onupgradeneeded=function(e){n&&n(new x(i.result,e.oldVersion,i.transaction))}),r.then((function(e){return new j(e)}))}function E(e){return y(indexedDB,"deleteDatabase",[e])}w(_,"_index",["name","keyPath","multiEntry","unique"]),k(_,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),I(_,"_index",IDBIndex,["openCursor","openKeyCursor"]),w(T,"_cursor",["direction","key","primaryKey","value"]),k(T,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(T.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,n),b(t._request).then((function(e){if(e)return new T(e,t._request)}))}))})})),C.prototype.createIndex=function(){return new _(this._store.createIndex.apply(this._store,arguments))},C.prototype.index=function(){return new _(this._store.index.apply(this._store,arguments))},w(C,"_store",["name","keyPath","indexNames","autoIncrement"]),k(C,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),I(C,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),S(C,"_store",IDBObjectStore,["deleteIndex"]),P.prototype.objectStore=function(){return new C(this._tx.objectStore.apply(this._tx,arguments))},w(P,"_tx",["objectStoreNames","mode"]),S(P,"_tx",IDBTransaction,["abort"]),x.prototype.createObjectStore=function(){return new C(this._db.createObjectStore.apply(this._db,arguments))},w(x,"_db",["name","version","objectStoreNames"]),S(x,"_db",IDBDatabase,["deleteObjectStore","close"]),j.prototype.transaction=function(){return new P(this._db.transaction.apply(this._db,arguments))},w(j,"_db",["name","version","objectStoreNames"]),S(j,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[C,_].forEach((function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=g(arguments),n=t[t.length-1],r=this._store||this._index,i=r[e].apply(r,t.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[_,C].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})}));var M,O="0.0.900",K=1e4,N="w:0.0.900",A="FIS_v2",B=36e5,q=((M={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',M["not-registered"]="Firebase Installation is not registered.",M["installation-not-found"]="Firebase Installation not found.",M["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',M["app-offline"]="Could not process request. Application offline.",M["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",M),H=new p("installations","Installations",q);function R(e){return e instanceof l&&e.code.includes("request-failed")}
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
     */function L(e){return"https://firebaseinstallations.googleapis.com/v1/projects/"+e.projectId+"/installations"}function F(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}function V(e,t){return s(this,void 0,void 0,(function(){var n,r;return a(this,(function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,H.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function U(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function W(e,t){var n=t.refreshToken,r=U(e);return r.append("Authorization",function(e){return"FIS_v2 "+e}
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
     */(n)),r}function $(e){return s(this,void 0,void 0,(function(){var t;return a(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return(t=n.sent()).status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function G(e,t){var n=t.fid;return s(this,void 0,void 0,(function(){var t,r,i,o,s,u;return a(this,(function(a){switch(a.label){case 0:return t=L(e),r=U(e),i={fid:n,authVersion:A,appId:e.appId,sdkVersion:N},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,$((function(){return fetch(t,o)}))];case 1:return(s=a.sent()).ok?[4,s.json()]:[3,3];case 2:return u=a.sent(),[2,{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:F(u.authToken)}];case 3:return[4,V("Create Installation",s)];case 4:throw a.sent()}}))}))}
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
     */function J(e){return new Promise((function(t){setTimeout(t,e)}))}
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
var z=/^[cdef][\w-]{21}$/;function Y(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=function(e){return(t=e,btoa(String.fromCharCode.apply(String,f([],c(t)))).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
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
     */(e);return z.test(t)?t:""}catch(e){return""}}function Z(e){return e.appName+"!"+e.appId}
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
     */var Q=new Map;function X(e,t){var n=Z(e);ee(n,t),function(e,t){var n=function(){!te&&"BroadcastChannel"in self&&((te=new BroadcastChannel("[Firebase] FID Change")).onmessage=function(e){ee(e.data.key,e.data.fid)});return te}();n&&n.postMessage({key:e,fid:t});0===Q.size&&te&&(te.close(),te=null)}(n,t)}function ee(e,t){var n,r,i=Q.get(e);if(i)try{for(var o=u(i),s=o.next();!s.done;s=o.next()){(0,s.value)(t)}}catch(e){n={error:e}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}var te=null;
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
var ne="firebase-installations-store",re=null;function ie(){return re||(re=D("firebase-installations-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(ne)}}))),re}function oe(e,t){return s(this,void 0,void 0,(function(){var n,r,i,o,s;return a(this,(function(a){switch(a.label){case 0:return n=Z(e),[4,ie()];case 1:return r=a.sent(),i=r.transaction(ne,"readwrite"),[4,(o=i.objectStore(ne)).get(n)];case 2:return s=a.sent(),[4,o.put(t,n)];case 3:return a.sent(),[4,i.complete];case 4:return a.sent(),s&&s.fid===t.fid||X(e,t.fid),[2,t]}}))}))}function se(e){return s(this,void 0,void 0,(function(){var t,n,r;return a(this,(function(i){switch(i.label){case 0:return t=Z(e),[4,ie()];case 1:return n=i.sent(),[4,(r=n.transaction(ne,"readwrite")).objectStore(ne).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function ae(e,t){return s(this,void 0,void 0,(function(){var n,r,i,o,s,u;return a(this,(function(a){switch(a.label){case 0:return n=Z(e),[4,ie()];case 1:return r=a.sent(),i=r.transaction(ne,"readwrite"),[4,(o=i.objectStore(ne)).get(n)];case 2:return s=a.sent(),void 0!==(u=t(s))?[3,4]:[4,o.delete(n)];case 3:return a.sent(),[3,6];case 4:return[4,o.put(u,n)];case 5:a.sent(),a.label=6;case 6:return[4,i.complete];case 7:return a.sent(),!u||s&&s.fid===u.fid||X(e,u.fid),[2,u]}}))}))}
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
     */function ue(e){return s(this,void 0,void 0,(function(){var t,n,r;return a(this,(function(i){switch(i.label){case 0:return[4,ae(e,(function(n){var r=function(e){return le(e||{fid:Y(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(H.create("app-offline"))};var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:function(e,t){return s(this,void 0,void 0,(function(){var n,r;return a(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,G(e,t)];case 1:return n=i.sent(),[2,oe(e,n)];case 2:return R(r=i.sent())&&409===r.customData.serverCode?[4,se(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,oe(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:ce(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}))];case 1:return""!==(n=i.sent()).fid?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function ce(e){return s(this,void 0,void 0,(function(){var t,n,r,i;return a(this,(function(o){switch(o.label){case 0:return[4,fe(e)];case 1:t=o.sent(),o.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,J(100)];case 3:return o.sent(),[4,fe(e)];case 4:return t=o.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,ue(e)];case 6:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?[2,i]:[2,r];case 7:return[2,t]}}))}))}function fe(e){return ae(e,(function(e){if(!e)throw H.create("installation-not-found");return le(e)}))}function le(e){return 1===(t=e).registrationStatus&&t.registrationTime+K<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
     */}function pe(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return s(this,void 0,void 0,(function(){var e,i,o,s,u,c,f;return a(this,(function(a){switch(a.label){case 0:return e=function(e,t){var n=t.fid;return L(e)+"/"+n+"/authTokens:generate"}
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
     */(n,t),i=W(n,t),(o=r.getImmediate({optional:!0}))&&i.append("x-firebase-client",o.getPlatformInfoString()),s={installation:{sdkVersion:N}},u={method:"POST",headers:i,body:JSON.stringify(s)},[4,$((function(){return fetch(e,u)}))];case 1:return(c=a.sent()).ok?[4,c.json()]:[3,3];case 2:return f=a.sent(),[2,F(f)];case 3:return[4,V("Generate Auth Token",c)];case 4:throw a.sent()}}))}))}function de(e,t){return void 0===t&&(t=!1),s(this,void 0,void 0,(function(){var n,r,i;return a(this,(function(u){switch(u.label){case 0:return[4,ae(e.appConfig,(function(r){if(!ve(r))throw H.create("not-registered");var i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+B}(e)}(i))return r;if(1===i.requestStatus)return n=function(e,t){return s(this,void 0,void 0,(function(){var n,r;return a(this,(function(i){switch(i.label){case 0:return[4,he(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,J(100)];case 3:return i.sent(),[4,he(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return 0===(r=n.authToken).requestStatus?[2,de(e,t)]:[2,r]}}))}))}(e,t),r;if(!navigator.onLine)throw H.create("app-offline");var u=function(e){var t={requestStatus:1,requestTime:Date.now()};return o(o({},e),{authToken:t})}(r);return n=function(e,t){return s(this,void 0,void 0,(function(){var n,r,i;return a(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,8]),[4,pe(e,t)];case 1:return n=s.sent(),i=o(o({},t),{authToken:n}),[4,oe(e.appConfig,i)];case 2:return s.sent(),[2,n];case 3:return!R(r=s.sent())||401!==r.customData.serverCode&&404!==r.customData.serverCode?[3,5]:[4,se(e.appConfig)];case 4:return s.sent(),[3,7];case 5:return i=o(o({},t),{authToken:{requestStatus:0}}),[4,oe(e.appConfig,i)];case 6:s.sent(),s.label=7;case 7:throw r;case 8:return[2]}}))}))}(e,u),u}))];case 1:return r=u.sent(),n?[4,n]:[3,3];case 2:return i=u.sent(),[3,4];case 3:i=r.authToken,u.label=4;case 4:return[2,i]}}))}))}function he(e){return ae(e,(function(e){if(!ve(e))throw H.create("not-registered");var t,n=e.authToken;return 1===(t=n).requestStatus&&t.requestTime+K<Date.now()?o(o({},e),{authToken:{requestStatus:0}}):e}))}function ve(e){return void 0!==e&&2===e.registrationStatus}function ge(e){return s(this,void 0,void 0,(function(){var t;return a(this,(function(n){switch(n.label){case 0:return[4,ue(e)];case 1:return(t=n.sent().registrationPromise)?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
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
     */function be(e){return H.create("missing-app-config-values",{valueName:e})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var ye,me="installations-exp",we=function(e){var n=e.getProvider("app-exp").getImmediate();return{app:n,appConfig:function(e){var t,n;if(!e||!e.options)throw be("App Configuration");if(!e.name)throw be("App Name");try{for(var r=u(["projectId","apiKey","appId"]),i=r.next();!i.done;i=r.next()){var o=i.value;if(!e.options[o])throw be(o)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(n),platformLoggerProvider:t._getProvider(n,"platform-logger"),_delete:function(){return Promise.resolve()}}},ke=function(e){var n=e.getProvider("app-exp").getImmediate(),r=t._getProvider(n,me).getImmediate();return{getId:function(){
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
     */return function(e){return s(this,void 0,void 0,(function(){var t,n,r,i;return a(this,(function(o){switch(o.label){case 0:return[4,ue((t=e).appConfig)];case 1:return n=o.sent(),r=n.installationEntry,(i=n.registrationPromise)?i.catch(console.error):de(t).catch(console.error),[2,r.fid]}}))}))}
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
     */(r)},getToken:function(e){return function(e,t){return void 0===t&&(t=!1),s(this,void 0,void 0,(function(){var n;return a(this,(function(r){switch(r.label){case 0:return[4,ge((n=e).appConfig)];case 1:return r.sent(),[4,de(n,t)];case 2:return[2,r.sent().token]}}))}))}(r,e)}}};t._registerComponent(new v(me,we,"PUBLIC")),t._registerComponent(new v("installations-exp-internal",ke,"PRIVATE")),t.registerVersion("@firebase/installations-exp",O);var Se=((ye={})["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',ye["only-available-in-window"]="This method is available in a Window context.",ye["only-available-in-sw"]="This method is available in a service worker context.",ye["permission-default"]="The notification permission was not granted and dismissed instead.",ye["permission-blocked"]="The notification permission was not granted and blocked instead.",ye["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",ye["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",ye["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",ye["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",ye["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",ye["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",ye["token-update-no-token"]="FCM returned no token when updating the user to push.",ye["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",ye["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",ye["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",ye["invalid-vapid-key"]="The public VAPID key must be a string.",ye["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",ye),Ie=new p("messaging","Messaging",Se);function _e(e){return Ie.create("missing-app-config-values",{valueName:e})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Te=function(){function e(e,t,n){this.onBackgroundMessageHandler=null,this.onMessageHandler=null;var r=
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
function(e){var t,n;if(!e||!e.options)throw _e("App Configuration Object");if(!e.name)throw _e("App Name");var r=e.options;try{for(var i=u(["projectId","apiKey","appId","messagingSenderId"]),o=i.next();!o.done;o=i.next()){var s=o.value;if(!r[s])throw _e(s)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:r.projectId,apiKey:r.apiKey,appId:r.appId,senderId:r.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:r,installations:t,analyticsProvider:n}}return e.prototype._delete=function(){return this.deleteService()},e}();
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
     */function Ce(){return self&&"ServiceWorkerGlobalScope"in self?"indexedDB"in self&&null!==indexedDB&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):"indexedDB"in window&&null!==indexedDB&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var Pe=function(e){if(!Ce())throw Ie.create("unsupported-browser");return new Te(e.getProvider("app-exp").getImmediate(),e.getProvider("installations-exp-internal").getImmediate(),e.getProvider("analytics-internal"))};
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function xe(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,f([],c(t)))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function je(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);return r}
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
     */var De="fcm_token_details_db",Ee="fcm_token_object_Store";function Me(e){return s(this,void 0,void 0,(function(){var t,n,r=this;return a(this,(function(i){switch(i.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=i.sent(),!t.map((function(e){return e.name})).includes(De))return[2,null];i.label=2;case 2:return n=null,[4,D(De,5,(function(t){return s(r,void 0,void 0,(function(){var r,i,o,s;return a(this,(function(a){switch(a.label){case 0:return t.oldVersion<2?[2]:t.objectStoreNames.contains(Ee)?[4,(r=t.transaction.objectStore(Ee)).index("fcmSenderId").get(e)]:[2];case 1:return i=a.sent(),[4,r.clear()];case 2:if(a.sent(),!i)return[2];if(2===t.oldVersion){if(!(o=i).auth||!o.p256dh||!o.endpoint)return[2];n={token:o.fcmToken,createTime:null!==(s=o.createTime)&&void 0!==s?s:Date.now(),subscriptionOptions:{auth:o.auth,p256dh:o.p256dh,endpoint:o.endpoint,swScope:o.swScope,vapidKey:"string"==typeof o.vapidKey?o.vapidKey:xe(o.vapidKey)}}}else(3===t.oldVersion||4===t.oldVersion)&&(n={token:(o=i).fcmToken,createTime:o.createTime,subscriptionOptions:{auth:xe(o.auth),p256dh:xe(o.p256dh),endpoint:o.endpoint,swScope:o.swScope,vapidKey:xe(o.vapidKey)}});return[2]}}))}))}))];case 3:return i.sent().close(),[4,E(De)];case 4:return i.sent(),[4,E("fcm_vapid_details_db")];case 5:return i.sent(),[4,E("undefined")];case 6:return i.sent(),[2,Oe(n)?n:null]}}))}))}function Oe(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}
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
     */var Ke="firebase-messaging-store",Ne=null;function Ae(){return Ne||(Ne=D("firebase-messaging-database",1,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(Ke)}}))),Ne}function Be(e){return s(this,void 0,void 0,(function(){var t,n,r;return a(this,(function(i){switch(i.label){case 0:return t=Re(e),[4,Ae()];case 1:return[4,i.sent().transaction(Ke).objectStore(Ke).get(t)];case 2:return(n=i.sent())?[2,n]:[3,3];case 3:return[4,Me(e.appConfig.senderId)];case 4:return(r=i.sent())?[4,qe(e,r)]:[3,6];case 5:return i.sent(),[2,r];case 6:return[2]}}))}))}function qe(e,t){return s(this,void 0,void 0,(function(){var n,r,i;return a(this,(function(o){switch(o.label){case 0:return n=Re(e),[4,Ae()];case 1:return r=o.sent(),[4,(i=r.transaction(Ke,"readwrite")).objectStore(Ke).put(t,n)];case 2:return o.sent(),[4,i.complete];case 3:return o.sent(),[2,t]}}))}))}function He(e){return s(this,void 0,void 0,(function(){var t,n,r;return a(this,(function(i){switch(i.label){case 0:return t=Re(e),[4,Ae()];case 1:return n=i.sent(),[4,(r=n.transaction(Ke,"readwrite")).objectStore(Ke).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function Re(e){return e.appConfig.appId}
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
     */var Le="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Fe="google.c.a.c_id";
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
function Ve(e,t){return s(this,void 0,void 0,(function(){var n,r,i,o,s,u;return a(this,(function(a){switch(a.label){case 0:return[4,Ge(e)];case 1:n=a.sent(),r=Je(t),i={method:"POST",headers:n,body:JSON.stringify(r)},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch($e(e.appConfig),i)];case 3:return[4,a.sent().json()];case 4:return o=a.sent(),[3,6];case 5:throw s=a.sent(),Ie.create("token-subscribe-failed",{errorInfo:s});case 6:if(o.error)throw u=o.error.message,Ie.create("token-subscribe-failed",{errorInfo:u});if(!o.token)throw Ie.create("token-subscribe-no-token");return[2,o.token]}}))}))}function Ue(e,t){return s(this,void 0,void 0,(function(){var n,r,i,o,s,u;return a(this,(function(a){switch(a.label){case 0:return[4,Ge(e)];case 1:n=a.sent(),r=Je(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch($e(e.appConfig)+"/"+t.token,i)];case 3:return[4,a.sent().json()];case 4:return o=a.sent(),[3,6];case 5:throw s=a.sent(),Ie.create("token-update-failed",{errorInfo:s});case 6:if(o.error)throw u=o.error.message,Ie.create("token-update-failed",{errorInfo:u});if(!o.token)throw Ie.create("token-update-no-token");return[2,o.token]}}))}))}function We(e,t){return s(this,void 0,void 0,(function(){var n,r,i,o,s;return a(this,(function(a){switch(a.label){case 0:return[4,Ge(e)];case 1:n=a.sent(),r={method:"DELETE",headers:n},a.label=2;case 2:return a.trys.push([2,5,,6]),[4,fetch($e(e.appConfig)+"/"+t,r)];case 3:return[4,a.sent().json()];case 4:if((i=a.sent()).error)throw o=i.error.message,Ie.create("token-unsubscribe-failed",{errorInfo:o});return[3,6];case 5:throw s=a.sent(),Ie.create("token-unsubscribe-failed",{errorInfo:s});case 6:return[2]}}))}))}function $e(e){return"https://fcmregistrations.googleapis.com/v1/projects/"+e.projectId+"/registrations"}function Ge(e){var t=e.appConfig,n=e.installations;return s(this,void 0,void 0,(function(){var e;return a(this,(function(r){switch(r.label){case 0:return[4,n.getToken()];case 1:return e=r.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+e})]}}))}))}function Je(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,o={web:{endpoint:r,auth:n,p256dh:t}};return i!==Le&&(o.web.applicationPubKey=i),o}
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
     */var ze;function Ye(e){return s(this,void 0,void 0,(function(){var t,n,r,i;return a(this,(function(o){switch(o.label){case 0:return[4,et(e.swRegistration,e.vapidKey)];case 1:return t=o.sent(),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:xe(t.getKey("auth")),p256dh:xe(t.getKey("p256dh"))},[4,Be(e.firebaseDependencies)];case 2:return(r=o.sent())?[3,3]:[2,Xe(e.firebaseDependencies,n)];case 3:if(s=r.subscriptionOptions,u=(a=n).vapidKey===s.vapidKey,c=a.endpoint===s.endpoint,f=a.auth===s.auth,l=a.p256dh===s.p256dh,u&&c&&f&&l)return[3,8];o.label=4;case 4:return o.trys.push([4,6,,7]),[4,We(e.firebaseDependencies,r.token)];case 5:return o.sent(),[3,7];case 6:return i=o.sent(),console.warn(i),[3,7];case 7:return[2,Xe(e.firebaseDependencies,n)];case 8:return Date.now()>=r.createTime+6048e5?[2,Qe(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n})]:[2,r.token];case 9:return[2]}var s,a,u,c,f,l;
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */}))}))}function Ze(e){return s(this,void 0,void 0,(function(){var t,n;return a(this,(function(r){switch(r.label){case 0:return[4,Be(e.firebaseDependencies)];case 1:return(t=r.sent())?[4,We(e.firebaseDependencies,t.token)]:[3,4];case 2:return r.sent(),[4,He(e.firebaseDependencies)];case 3:r.sent(),r.label=4;case 4:return[4,e.swRegistration.pushManager.getSubscription()];case 5:return(n=r.sent())?[2,n.unsubscribe()]:[2,!0]}}))}))}function Qe(e,t){return s(this,void 0,void 0,(function(){var n,r,i;return a(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,5]),[4,Ue(e.firebaseDependencies,t)];case 1:return n=s.sent(),r=o(o({},t),{token:n,createTime:Date.now()}),[4,qe(e.firebaseDependencies,r)];case 2:return s.sent(),[2,n];case 3:return i=s.sent(),[4,Ze(e)];case 4:throw s.sent(),i;case 5:return[2]}}))}))}function Xe(e,t){return s(this,void 0,void 0,(function(){var n,r;return a(this,(function(i){switch(i.label){case 0:return[4,Ve(e,t)];case 1:return n=i.sent(),r={token:n,createTime:Date.now(),subscriptionOptions:t},[4,qe(e,r)];case 2:return i.sent(),[2,r.token]}}))}))}function et(e,t){return s(this,void 0,void 0,(function(){var n;return a(this,(function(r){switch(r.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return(n=r.sent())?[2,n]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:je(t)})]}}))}))}function tt(e){return s(this,void 0,void 0,(function(){var t,n;return a(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),t=e,[4,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"})];case 1:return t.swRegistration=r.sent(),e.swRegistration.update().catch((function(){})),[3,3];case 2:throw n=r.sent(),Ie.create("failed-service-worker-registration",{browserErrorMessage:n.message});case 3:return[2]}}))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function nt(e){var t={from:e.from,collapseKey:e.collapse_key};return function(e,t){if(!t.notification)return;e.notification={};var n=t.notification.title;n&&(e.notification.title=n);var r=t.notification.body;r&&(e.notification.body=r);var i=t.notification.image;i&&(e.notification.image=i)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){if(!t.fcmOptions)return;e.fcmOptions={};var n=t.fcmOptions.link;n&&(e.fcmOptions.link=n);var r=t.fcmOptions.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}
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
     */(t,e),t}function rt(e){return"object"==typeof e&&!!e&&Fe in e}
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
     */function it(e,t,n){return s(this,void 0,void 0,(function(){var r;return a(this,(function(i){switch(i.label){case 0:return r=function(e){switch(e){case ze.NOTIFICATION_CLICKED:return"notification_open";case ze.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(t),[4,e.firebaseDependencies.analyticsProvider.get()];case 1:return i.sent().logEvent(r,{message_id:n["google.c.a.c_id"],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)}),[2]}}))}))}function ot(e,t){return s(this,void 0,void 0,(function(){var n,r;return a(this,(function(i){switch(i.label){case 0:return(n=t.data).isFirebaseMessaging?(e.onMessageHandler&&n.messageType===ze.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(nt(n)):e.onMessageHandler.next(nt(n))),rt(r=n.data)&&"1"===r["google.c.a.e"]?[4,it(e,n.messageType,r)]:[3,2]):[2];case 1:i.sent(),i.label=2;case 2:return[2]}}))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function st(e,t){return s(this,void 0,void 0,(function(){return a(this,(function(n){switch(n.label){case 0:return t||e.swRegistration?[3,2]:[4,tt(e)];case 1:n.sent(),n.label=2;case 2:if(!t&&e.swRegistration)return[2];if(!(t instanceof ServiceWorkerRegistration))throw Ie.create("invalid-sw-registration");return e.swRegistration=t,[2]}}))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function at(e,t){return s(this,void 0,void 0,(function(){return a(this,(function(n){return t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Le),[2]}))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function ut(e,t){return s(this,void 0,void 0,(function(){return a(this,(function(n){switch(n.label){case 0:if(!navigator)throw Ie.create("only-available-in-window");return navigator.serviceWorker.addEventListener("message",(function(t){return ot(e,t)})),"default"!==Notification.permission?[3,2]:[4,Notification.requestPermission()];case 1:n.sent(),n.label=2;case 2:if("granted"!==Notification.permission)throw Ie.create("permission-blocked");return[4,at(e,null==t?void 0:t.vapidKey)];case 3:return n.sent(),[4,st(e,null==t?void 0:t.serviceWorkerRegistration)];case 4:return n.sent(),[2,Ye(e)]}}))}))}
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
     */!function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(ze||(ze={}));
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var ct=function(){function e(e){var t=this;this.messaging=e,self.addEventListener("push",(function(e){e.waitUntil(t.onPush(e))})),self.addEventListener("pushsubscriptionchange",(function(e){e.waitUntil(t.onSubChange(e))})),self.addEventListener("notificationclick",(function(e){e.waitUntil(t.onNotificationClick(e))}))}return e.prototype.onPush=function(e){return s(this,void 0,void 0,(function(){var t,n,r;return a(this,(function(i){switch(i.label){case 0:return(t=function(e){var t=e.data;if(!t)return null;try{return t.json()}catch(e){return null}}(e))?[4,dt()]:[2];case 1:return function(e){return e.some((function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")}))}(n=i.sent())?[2,pt(n,t)]:t.notification?[4,ht(ft(t))]:[3,3];case 2:i.sent(),i.label=3;case 3:return this.messaging.onBackgroundMessageHandler&&(r=nt(t),"function"==typeof this.messaging.onBackgroundMessageHandler?this.messaging.onBackgroundMessageHandler(r):this.messaging.onBackgroundMessageHandler.next(r)),[2]}}))}))},e.prototype.onSubChange=function(e){var t,n;return s(this,void 0,void 0,(function(){var r;return a(this,(function(i){switch(i.label){case 0:return e.newSubscription?[3,2]:[4,Ze(this.messaging)];case 1:return i.sent(),[2];case 2:return[4,Be(this.messaging.firebaseDependencies)];case 3:return r=i.sent(),[4,Ze(this.messaging)];case 4:return i.sent(),this.messaging.vapidKey=null!==(n=null===(t=null==r?void 0:r.subscriptionOptions)||void 0===t?void 0:t.vapidKey)&&void 0!==n?n:Le,[4,Ye(this.messaging)];case 5:return i.sent(),[2]}}))}))},e.prototype.onNotificationClick=function(e){var t,n;return s(this,void 0,void 0,(function(){var r,i,o,s,u;return a(this,(function(a){switch(a.label){case 0:return(r=null===(n=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===n?void 0:n.FCM_MSG)?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(i=function(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;if(i)return i;return rt(e.data)?self.location.origin:null}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(r))?(o=new URL(i,self.location.href),s=new URL(self.location.origin),o.host!==s.host?[2]:[4,lt(o)]):[2]):[2];case 1:return(u=a.sent())?[3,4]:[4,self.clients.openWindow(i)];case 2:return u=a.sent(),[4,(c=3e3,new Promise((function(e){setTimeout(e,c)})))];case 3:return a.sent(),[3,6];case 4:return[4,u.focus()];case 5:u=a.sent(),a.label=6;case 6:return u?(r.messageType=ze.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,[2,u.postMessage(r)]):[2]}var c}))}))},e}();function ft(e){var t,n=o({},e.notification);return n.data=((t={}).FCM_MSG=e,t),n}function lt(e){return s(this,void 0,void 0,(function(){var t,n,r,i,o,s,c;return a(this,(function(a){switch(a.label){case 0:return[4,dt()];case 1:t=a.sent();try{for(n=u(t),r=n.next();!r.done;r=n.next())if(i=r.value,o=new URL(i.url,self.location.href),e.host===o.host)return[2,i]}catch(e){s={error:e}}finally{try{r&&!r.done&&(c=n.return)&&c.call(n)}finally{if(s)throw s.error}}return[2,null]}}))}))}function pt(e,t){var n,r;t.isFirebaseMessaging=!0,t.messageType=ze.PUSH_RECEIVED;try{for(var i=u(e),o=i.next();!o.done;o=i.next()){o.value.postMessage(t)}}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}function dt(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function ht(e){var t,n=e.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports "+r+" actions. The remaining actions will not be displayed."),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}function vt(e,t){return s(this,void 0,void 0,(function(){return a(this,(function(n){return[2,ut(e,t)]}))}))}function gt(e){return function(e){return s(this,void 0,void 0,(function(){return a(this,(function(t){switch(t.label){case 0:if(!navigator)throw Ie.create("only-available-in-window");return e.swRegistration?[3,2]:[4,tt(e)];case 1:t.sent(),t.label=2;case 2:return[2,Ze(e)]}}))}))}
/**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
     * in compliance with the License. You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software distributed under the License
     * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
     * or implied. See the License for the specific language governing permissions and limitations under
     * the License.
     */(e)}function bt(e,t){
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
return function(e,t){if(!navigator)throw Ie.create("only-available-in-window");return navigator.serviceWorker.addEventListener("message",(function(t){return ot(e,t)})),e.onMessageHandler=t,function(){e.onMessageHandler=null}}(e,t)}function yt(e,t){return function(e,t){if(void 0!==self.document)throw Ie.create("only-available-in-sw");return new ct(e),e.onBackgroundMessageHandler=t,function(){e.onBackgroundMessageHandler=null}}(e,t)}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */t._registerComponent(new v("messaging-exp",Pe,"PUBLIC"));var mt=function(){function e(e,t){this.app=e,this.messaging=t,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.app=e,this.messaging=t}return e.prototype.getToken=function(e){return s(this,void 0,void 0,(function(){return a(this,(function(t){return[2,vt(this.messaging,e)]}))}))},e.prototype.deleteToken=function(){return s(this,void 0,void 0,(function(){return a(this,(function(e){return[2,gt(this.messaging)]}))}))},e.prototype.onMessage=function(e){return bt(this.messaging,e)},e.prototype.onBackgroundMessage=function(e){return yt(this.messaging,e)},e}(),wt=function(e){return new mt(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging-exp").getImmediate())};r.default.INTERNAL.registerComponent(new v("messaging-compat",wt,"PUBLIC")),r.default.registerVersion("@firebase/messaging-compat","0.0.900")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-messaging-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-messaging-compat.js.map
