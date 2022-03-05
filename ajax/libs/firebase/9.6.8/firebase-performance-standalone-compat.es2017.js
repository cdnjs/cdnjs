!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).firebase=t()}(this,(function(){"use strict";
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
     */const e=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},t={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){const i=e[t],a=t+1<e.length,o=a?e[t+1]:0,s=t+2<e.length,c=s?e[t+2]:0,l=i>>2,u=(3&i)<<4|o>>4;let p=(15&o)<<2|c>>6,h=63&c;s||(h=64,a||(p=64)),r.push(n[l],n[u],n[p],n[h])}return r.join("")},encodeString(t,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(t):this.encodeByteArray(e(t),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&a)}else if(i>239&&i<365){const a=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{const a=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&a)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const s=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==a||null==o||null==s)throw Error();const c=i<<2|a>>4;if(r.push(c),64!==o){const e=a<<4&240|o>>2;if(r.push(e),64!==s){const e=o<<6&192|s;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},n=function(n){const r=e(n);return t.encodeByteArray(r,!0)};function r(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(const n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=r(e[n],t[n]));return e}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
class i{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}function a(){return"object"==typeof indexedDB}function o(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}class s extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,s.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,c.prototype.create)}}class c{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?function(e,t){return e.replace(l,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",o=`${this.serviceName}: ${a} (${r}).`;return new s(r,o,n)}}const l=/\{\$([^}]+)}/g;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],a=t[i];if(h(n)&&h(a)){if(!p(n,a))return!1}else if(n!==a)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function h(e){return null!==e&&"object"==typeof e}
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
     */class f{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
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
     */const d="[DEFAULT]";
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
     */class g{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new i;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
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
     */(e))try{this.getOrInitializeService({instanceIdentifier:d})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(r)}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);const a=this.instances.get(r);return a&&e(a,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===d?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var r;return n||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:d:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class m{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new g(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const b=[];var _;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(_||(_={}));const v={debug:_.DEBUG,verbose:_.VERBOSE,info:_.INFO,warn:_.WARN,error:_.ERROR,silent:_.SILENT},y=_.INFO,w={[_.DEBUG]:"log",[_.VERBOSE]:"log",[_.INFO]:"info",[_.WARN]:"warn",[_.ERROR]:"error"},E=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=w[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class I{constructor(e){this.name=e,this._logLevel=y,this._logHandler=E,this._userLogHandler=null,b.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?v[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_.DEBUG,...e),this._logHandler(this,_.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_.VERBOSE,...e),this._logHandler(this,_.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_.INFO,...e),this._logHandler(this,_.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_.WARN,...e),this._logHandler(this,_.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_.ERROR,...e),this._logHandler(this,_.ERROR,...e)}}function S(e){return Array.prototype.slice.call(e)}function T(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function C(e,t,n){var r,i=new Promise((function(i,a){T(r=e[t].apply(e,n)).then(i,a)}));return i.request=r,i}function A(e,t,n){var r=C(e,t,n);return r.then((function(e){if(e)return new M(e,r.request)}))}function O(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function D(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return C(this[t],r,arguments)})}))}function N(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function P(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return A(this[t],r,arguments)})}))}function k(e){this._index=e}function M(e,t){this._cursor=e,this._request=t}function L(e){this._store=e}function B(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function R(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new B(n)}function j(e){this._db=e}function $(e,t,n){var r=C(indexedDB,"open",[e,t]),i=r.request;return i&&(i.onupgradeneeded=function(e){n&&n(new R(i.result,e.oldVersion,i.transaction))}),r.then((function(e){return new j(e)}))}
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
     */O(k,"_index",["name","keyPath","multiEntry","unique"]),D(k,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),P(k,"_index",IDBIndex,["openCursor","openKeyCursor"]),O(M,"_cursor",["direction","key","primaryKey","value"]),D(M,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(M.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,n),T(t._request).then((function(e){if(e)return new M(e,t._request)}))}))})})),L.prototype.createIndex=function(){return new k(this._store.createIndex.apply(this._store,arguments))},L.prototype.index=function(){return new k(this._store.index.apply(this._store,arguments))},O(L,"_store",["name","keyPath","indexNames","autoIncrement"]),D(L,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),P(L,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),N(L,"_store",IDBObjectStore,["deleteIndex"]),B.prototype.objectStore=function(){return new L(this._tx.objectStore.apply(this._tx,arguments))},O(B,"_tx",["objectStoreNames","mode"]),N(B,"_tx",IDBTransaction,["abort"]),R.prototype.createObjectStore=function(){return new L(this._db.createObjectStore.apply(this._db,arguments))},O(R,"_db",["name","version","objectStoreNames"]),N(R,"_db",IDBDatabase,["deleteObjectStore","close"]),j.prototype.transaction=function(){return new B(this._db.transaction.apply(this._db,arguments))},O(j,"_db",["name","version","objectStoreNames"]),N(j,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[L,k].forEach((function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t=S(arguments),n=t[t.length-1],r=this._store||this._index,i=r[e].apply(r,t.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[k,L].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})}));class F{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const U="@firebase/app",V="0.7.18",x=new I("@firebase/app"),q="[DEFAULT]",z={[U]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},H=new Map,W=new Map;function K(e,t){try{e.container.addComponent(t)}catch(n){x.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function J(e){const t=e.name;if(W.has(t))return x.debug(`There were multiple attempts to register component ${t}.`),!1;W.set(t,e);for(const t of H.values())K(t,e);return!0}function G(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
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
const Y=new c("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."});
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
class X{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new f("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Y.create("app-deleted",{appName:this._name})}}
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
     */const Z="9.6.8";function Q(e,t={}){if("object"!=typeof t){t={name:t}}const n=Object.assign({name:q,automaticDataCollectionEnabled:!1},t),r=n.name;if("string"!=typeof r||!r)throw Y.create("bad-app-name",{appName:String(r)});const i=H.get(r);if(i){if(p(e,i.options)&&p(n,i.config))return i;throw Y.create("duplicate-app",{appName:r})}const a=new m(r);for(const e of W.values())a.addComponent(e);const o=new X(e,n,a);return H.set(r,o),o}async function ee(e){const t=e.name;H.has(t)&&(H.delete(t),await Promise.all(e.container.getProviders().map((e=>e.delete()))),e.isDeleted=!0)}function te(e,t,n){var r;let i=null!==(r=z[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const a=i.match(/\s|\//),o=t.match(/\s|\//);if(a||o){const e=[`Unable to register library "${i}" with version "${t}":`];return a&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void x.warn(e.join(" "))}J(new f(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}function ne(e,t){if(null!==e&&"function"!=typeof e)throw Y.create("invalid-log-argument");!function(e,t){for(const n of b){let r=null;t&&t.level&&(r=v[t.level]),n.userLogHandler=null===e?null:(t,n,...i)=>{const a=i.map((e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((e=>e)).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:_[n].toLowerCase(),message:a,args:i,type:t.name})}}}(e,t)}function re(e){var t;t=e,b.forEach((e=>{e.setLogLevel(t)}))}
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
     */const ie="firebase-heartbeat-store";let ae=null;function oe(){return ae||(ae=$("firebase-heartbeat-database",1,(e=>{if(0===e.oldVersion)e.createObjectStore(ie)})).catch((e=>{throw Y.create("storage-open",{originalErrorMessage:e.message})}))),ae}async function se(e,t){try{const n=(await oe()).transaction(ie,"readwrite"),r=n.objectStore(ie);return await r.put(t,ce(e)),n.complete}catch(e){throw Y.create("storage-set",{originalErrorMessage:e.message})}}function ce(e){return`${e.name}!${e.options.appId}`}
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
     */class le{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ue(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=(new Date).toISOString().substring(0,10);if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!this._heartbeatsCache.some((e=>e.date===t)))return this._heartbeatsCache.push({date:t,userAgent:e}),this._heartbeatsCache=this._heartbeatsCache.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache)return"";const{heartbeatsToSend:e,unsentEntries:t}=function(e,t=1024){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.userAgent===i.userAgent));if(e){if(e.dates.push(i.date),pe(n)>t){e.dates.pop();break}}else if(n.push({userAgent:i.userAgent,dates:[i.date]}),pe(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache),r=n(JSON.stringify({version:2,heartbeats:e}));return t.length>0?(this._heartbeatsCache=t,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache=null,this._storage.deleteAll()),r}}class ue{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!a()&&o().then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{return(await oe()).transaction(ie).objectStore(ie).get(ce(e))}catch(e){throw Y.create("storage-get",{originalErrorMessage:e.message})}}(this.app);return(null==e?void 0:e.heartbeats)||[]}return[]}async overwrite(e){return await this._canUseIndexedDBPromise?se(this.app,{heartbeats:e}):void 0}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return se(this.app,{heartbeats:[...t,...e]})}}async delete(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return se(this.app,{heartbeats:t.filter((t=>!e.includes(t)))})}}async deleteAll(){return await this._canUseIndexedDBPromise?async function(e){try{const t=(await oe()).transaction(ie,"readwrite");return await t.objectStore(ie).delete(ce(e)),t.complete}catch(e){throw Y.create("storage-delete",{originalErrorMessage:e.message})}}(this.app):void 0}}function pe(e){return n(JSON.stringify({version:2,heartbeats:e})).length}
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
     */var he;he="",J(new f("platform-logger",(e=>new F(e)),"PRIVATE")),J(new f("heartbeat",(e=>new le(e)),"PRIVATE")),te(U,V,he),te(U,V,"esm2017"),te("fire-js","");var fe=Object.freeze({__proto__:null,SDK_VERSION:Z,_DEFAULT_ENTRY_NAME:q,_addComponent:K,_addOrOverwriteComponent:function(e,t){e.container.addOrOverwriteComponent(t)},_apps:H,_clearComponents:function(){W.clear()},_components:W,_getProvider:G,_registerComponent:J,_removeServiceInstance:function(e,t,n="[DEFAULT]"){G(e,t).clearInstance(n)},deleteApp:ee,getApp:function(e="[DEFAULT]"){const t=H.get(e);if(!t)throw Y.create("no-app",{appName:e});return t},getApps:function(){return Array.from(H.values())},initializeApp:Q,onLog:ne,registerVersion:te,setLogLevel:re,FirebaseError:s});
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
     */class de{constructor(e,t){this._delegate=e,this.firebase=t,K(e,new f("app-compat",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return this.firebase.INTERNAL.removeApp(this.name),ee(this._delegate)}_getService(e,t="[DEFAULT]"){return this._delegate.checkDestroyed(),this._delegate.container.getProvider(e).getImmediate({identifier:t})}}
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
     */const ge=new c("app-compat","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."});
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
function me(e){const t={},n={__esModule:!0,initializeApp:function(r,i={}){const a=Q(r,i);if(u(t,a.name))return t[a.name];const o=new e(a,n);return t[a.name]=o,o},app:i,registerVersion:te,setLogLevel:re,onLog:ne,apps:null,SDK_VERSION:Z,INTERNAL:{registerComponent:function(t){const a=t.name,o=a.replace("-compat","");if(J(t)&&"PUBLIC"===t.type){const s=(e=i())=>{if("function"!=typeof e[o])throw ge.create("invalid-app-argument",{appName:a});return e[o]()};void 0!==t.serviceProps&&r(s,t.serviceProps),n[o]=s,e.prototype[o]=function(...e){return this._getService.bind(this,a).apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[o]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){if("serverAuth"===t)return null;return t},modularAPIs:fe}};function i(e){if(!u(t,e=e||q))throw ge.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map((e=>t[e]))}}),i.App=e,n}
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
const be=function(){const e=me(de);e.SDK_VERSION=`${e.SDK_VERSION}_LITE`;const t=e.INTERNAL.registerComponent;return e.INTERNAL.registerComponent=function(e){if("PUBLIC"===e.type&&!e.name.includes("performance")&&!e.name.includes("installations"))throw Error(`${name} cannot register with the standalone perf instance`);return t(e)},e}();!
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
function(e){te("@firebase/app-compat","0.1.19",e)}("lite");
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
be.registerVersion("firebase","9.6.8","app-compat");const _e="@firebase/installations",ve="0.5.5",ye=1e4,we="w:0.5.5",Ee="FIS_v2",Ie=36e5,Se=new c("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function Te(e){return e instanceof s&&e.code.includes("request-failed")}
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
     */function Ce({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function Ae(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function Oe(e,t){const n=(await t.json()).error;return Se.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function De({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Ne(e,{refreshToken:t}){const n=De(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}
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
     */(t)),n}async function Pe(e){const t=await e();return t.status>=500&&t.status<600?e():t}
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
function ke(e){return new Promise((t=>{setTimeout(t,e)}))}
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
const Me=/^[cdef][\w-]{21}$/;function Le(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
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
     */(e);return Me.test(t)?t:""}catch(e){return""}}function Be(e){return`${e.appName}!${e.appId}`}
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
     */const Re=new Map;function je(e,t){const n=Be(e);$e(n,t),function(e,t){const n=function(){!Fe&&"BroadcastChannel"in self&&(Fe=new BroadcastChannel("[Firebase] FID Change"),Fe.onmessage=e=>{$e(e.data.key,e.data.fid)});return Fe}();n&&n.postMessage({key:e,fid:t});0===Re.size&&Fe&&(Fe.close(),Fe=null)}(n,t)}function $e(e,t){const n=Re.get(e);if(n)for(const e of n)e(t)}let Fe=null;
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
const Ue="firebase-installations-store";let Ve=null;function xe(){return Ve||(Ve=$("firebase-installations-database",1,(e=>{if(0===e.oldVersion)e.createObjectStore(Ue)}))),Ve}async function qe(e,t){const n=Be(e),r=(await xe()).transaction(Ue,"readwrite"),i=r.objectStore(Ue),a=await i.get(n);return await i.put(t,n),await r.complete,a&&a.fid===t.fid||je(e,t.fid),t}async function ze(e){const t=Be(e),n=(await xe()).transaction(Ue,"readwrite");await n.objectStore(Ue).delete(t),await n.complete}async function He(e,t){const n=Be(e),r=(await xe()).transaction(Ue,"readwrite"),i=r.objectStore(Ue),a=await i.get(n),o=t(a);return void 0===o?await i.delete(n):await i.put(o,n),await r.complete,!o||a&&a.fid===o.fid||je(e,o.fid),o}
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
     */async function We(e){let t;const n=await He(e,(n=>{const r=function(e){return Ge(e||{fid:Le(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Se.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function(e,{fid:t}){const n=Ce(e),r=De(e),i={fid:t,authVersion:Ee,appId:e.appId,sdkVersion:we},a={method:"POST",headers:r,body:JSON.stringify(i)},o=await Pe((()=>fetch(n,a)));if(o.ok){const e=await o.json();return{fid:e.fid||t,registrationStatus:2,refreshToken:e.refreshToken,authToken:Ae(e.authToken)}}throw await Oe("Create Installation",o)}(e,t);return qe(e,n)}catch(n){throw Te(n)&&409===n.customData.serverCode?await ze(e):await qe(e,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Ke(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Ke(e){let t=await Je(e);for(;1===t.registrationStatus;)await ke(100),t=await Je(e);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await We(e);return n||t}return t}function Je(e){return He(e,(e=>{if(!e)throw Se.create("installation-not-found");return Ge(e)}))}function Ge(e){return 1===(t=e).registrationStatus&&t.registrationTime+ye<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
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
     */}async function Ye({appConfig:e,platformLoggerProvider:t},n){const r=function(e,{fid:t}){return`${Ce(e)}/${t}/authTokens:generate`}
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
     */(e,n),i=Ne(e,n),a=t.getImmediate({optional:!0});a&&i.append("x-firebase-client",a.getPlatformInfoString());const o={installation:{sdkVersion:we}},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await Pe((()=>fetch(r,s)));if(c.ok){return Ae(await c.json())}throw await Oe("Generate Auth Token",c)}async function Xe(e,t=!1){let n;const r=await He(e.appConfig,(r=>{if(!Qe(r))throw Se.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ie}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await Ze(e.appConfig);for(;1===n.authToken.requestStatus;)await ke(100),n=await Ze(e.appConfig);const r=n.authToken;return 0===r.requestStatus?Xe(e,t):r}(e,t),r;{if(!navigator.onLine)throw Se.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await Ye(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await qe(e.appConfig,r),n}catch(n){if(!Te(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await qe(e.appConfig,n)}else await ze(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function Ze(e){return He(e,(e=>{if(!Qe(e))throw Se.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+ye<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
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
     */}))}function Qe(e){return void 0!==e&&2===e.registrationStatus}
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
async function et(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await We(e);t&&await t}
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
     */(n.appConfig);return(await Xe(n,t)).token}function tt(e){return Se.create("missing-app-config-values",{valueName:e})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const nt="installations",rt=e=>{const t=G(e.getProvider("app").getImmediate(),nt).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await We(t.appConfig);return r?r.catch(console.error):Xe(t).catch(console.error),n.fid}(t),getToken:e=>et(t,e)}};J(new f(nt,(e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw tt("App Configuration");if(!e.name)throw tt("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw tt(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,platformLoggerProvider:G(t,"platform-logger"),_delete:()=>Promise.resolve()}}),"PUBLIC")),J(new f("installations-internal",rt,"PRIVATE")),te(_e,ve),te(_e,ve,"esm2017");const it="@firebase/performance",at="0.5.5",ot=at,st="FB-PERF-TRACE-MEASURE",ct="_wt_",lt="_fcp",ut="_fid",pt="@firebase/performance/config",ht="@firebase/performance/configexpire",ft="Performance",dt=new c("performance",ft,{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),gt=new I(ft);
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
let mt,bt,_t,vt;gt.logLevel=_.INFO;class yt{constructor(e){if(this.window=e,!e)throw dt.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){this.performance&&this.performance.mark&&this.performance.mark(e)}measure(e,t,n){this.performance&&this.performance.measure&&this.performance.measure(e,t,n)}getEntriesByType(e){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(e):[]}getEntriesByName(e){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(e):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&"undefined"!=typeof navigator&&navigator.cookieEnabled?!!a()||(gt.info("IndexedDB is not supported by current browswer"),!1):(gt.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(e,t){if(!this.PerformanceObserver)return;new this.PerformanceObserver((e=>{for(const n of e.getEntries())t(n)})).observe({entryTypes:[e]})}static getInstance(){return void 0===mt&&(mt=new yt(bt)),mt}}function wt(){return _t}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function Et(e,t){const n=e.length-t.length;if(n<0||n>1)throw dt.create("invalid String merger input");const r=[];for(let n=0;n<e.length;n++)r.push(e.charAt(n)),t.length>n&&r.push(t.charAt(n));return r.join("")}
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
     */class It{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Et("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Et("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===vt&&(vt=new It),vt}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var St;!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VISIBLE=1]="VISIBLE",e[e.HIDDEN=2]="HIDDEN"}(St||(St={}));const Tt=["firebase_","google_","ga_"],Ct=new RegExp("^[a-zA-Z]\\w*$");function At(){const e=yt.getInstance().navigator;return"serviceWorker"in e?e.serviceWorker.controller?2:3:1}function Ot(){switch(yt.getInstance().document.visibilityState){case"visible":return St.VISIBLE;case"hidden":return St.HIDDEN;default:return St.UNKNOWN}}function Dt(){const e=yt.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function Nt(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.appId;if(!n)throw dt.create("no app id");return n}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
const Pt="0.0.1",kt=!0,Mt="FIREBASE_INSTALLATIONS_AUTH";function Lt(e,t){const n=function(){const e=yt.getInstance().localStorage;if(!e)return;const t=e.getItem(ht);if(!(t&&(n=t,Number(n)>Date.now())))return;var n;const r=e.getItem(pt);if(!r)return;try{return JSON.parse(r)}catch(e){return}}();return n?(Rt(n),Promise.resolve()):function(e,t){return function(e){const t=e.getToken();return t.then((e=>{})),t}(e.installations).then((n=>{const r=function(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.projectId;if(!n)throw dt.create("no project id");return n}(e.app),i=function(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.apiKey;if(!n)throw dt.create("no api key");return n}(e.app),a=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,{method:"POST",headers:{Authorization:`${Mt} ${n}`},body:JSON.stringify({app_instance_id:t,app_instance_id_token:n,app_id:Nt(e.app),app_version:ot,sdk_version:Pt})});return fetch(a).then((e=>{if(e.ok)return e.json();throw dt.create("RC response not ok")}))})).catch((()=>{gt.info(Bt)}))}(e,t).then(Rt).then((e=>function(e){const t=yt.getInstance().localStorage;if(!e||!t)return;t.setItem(pt,JSON.stringify(e)),t.setItem(ht,String(Date.now()+60*It.getInstance().configTimeToLive*60*1e3))}(e)),(()=>{}))}const Bt="Could not fetch config, will use default configs";function Rt(e){if(!e)return e;const t=It.getInstance(),n=e.entries||{};return void 0!==n.fpr_enabled?t.loggingEnabled="true"===String(n.fpr_enabled):t.loggingEnabled=kt,n.fpr_log_source&&(t.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(t.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(t.transportKey=n.fpr_log_transport_key),void 0!==n.fpr_vc_network_request_sampling_rate&&(t.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(t.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),t.logTraceAfterSampling=jt(t.tracesSamplingRate),t.logNetworkAfterSampling=jt(t.networkRequestsSamplingRate),e}function jt(e){return Math.random()<=e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */let $t,Ft=1;function Ut(e){return Ft=2,$t=$t||function(e){return function(){const e=yt.getInstance().document;return new Promise((t=>{if(e&&"complete"!==e.readyState){const n=()=>{"complete"===e.readyState&&(e.removeEventListener("readystatechange",n),t())};e.addEventListener("readystatechange",n)}else t()}))}().then((()=>function(e){const t=e.getId();return t.then((e=>{_t=e})),t}(e.installations))).then((t=>Lt(e,t))).then((()=>Vt()),(()=>Vt()))}(e),$t}function Vt(){Ft=3}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const xt=1e4;let qt,zt=3,Ht=[],Wt=!1;function Kt(e){setTimeout((()=>{if(0!==zt)return Ht.length?void function(){const e=Ht.splice(0,1e3),t=e.map((e=>({source_extension_json_proto3:e.message,event_time_ms:String(e.eventTime)})));(function(e,t){return function(e){const t=It.getInstance().getFlTransportFullUrl();return fetch(t,{method:"POST",body:JSON.stringify(e)})}(e).then((e=>(e.ok||gt.info("Call to Firebase backend failed."),e.json()))).then((e=>{const n=Number(e.nextRequestWaitMillis);let r=xt;isNaN(n)||(r=Math.max(n,r));const i=e.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&(Ht=[...t,...Ht],gt.info("Retry transport request later.")),zt=3,Kt(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:It.getInstance().logSource,log_event:t},e).catch((()=>{Ht=[...e,...Ht],zt--,gt.info(`Tries left: ${zt}.`),Kt(xt)}))}():Kt(xt)}),e)}function Jt(e){return(...t)=>{!function(e){if(!e.eventTime||!e.message)throw dt.create("invalid cc log");Ht=[...Ht,e]}({message:e(...t),eventTime:Date.now()})}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function Gt(e,t){qt||(qt=Jt(Zt)),qt(e,t)}function Yt(e){const t=It.getInstance();!t.instrumentationEnabled&&e.isAuto||(t.dataCollectionEnabled||e.isAuto)&&yt.getInstance().requiredApisAvailable()&&(e.isAuto&&Ot()!==St.VISIBLE||(3===Ft?Xt(e):Ut(e.performanceController).then((()=>Xt(e)),(()=>Xt(e)))))}function Xt(e){if(!wt())return;const t=It.getInstance();t.loggingEnabled&&t.logTraceAfterSampling&&setTimeout((()=>Gt(e,1)),0)}function Zt(e,t){return 0===t?function(e){const t={url:e.url,http_method:e.httpMethod||0,http_response_code:200,response_payload_bytes:e.responsePayloadBytes,client_start_time_us:e.startTimeUs,time_to_response_initiated_us:e.timeToResponseInitiatedUs,time_to_response_completed_us:e.timeToResponseCompletedUs},n={application_info:Qt(e.performanceController.app),network_request_metric:t};return JSON.stringify(n)}(e):function(e){const t={name:e.name,is_auto:e.isAuto,client_start_time_us:e.startTimeUs,duration_us:e.durationUs};0!==Object.keys(e.counters).length&&(t.counters=e.counters);const n=e.getAttributes();0!==Object.keys(n).length&&(t.custom_attributes=n);const r={application_info:Qt(e.performanceController.app),trace_metric:t};return JSON.stringify(r)}(e)}function Qt(e){return{google_app_id:Nt(e),app_instance_id:wt(),web_app_info:{sdk_version:ot,page_url:yt.getInstance().getUrl(),service_worker_status:At(),visibility_state:Ot(),effective_connection_type:Dt()},application_process_state:0}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const en=["_fp",lt,ut];
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
class tn{constructor(e,t,n=!1,r){this.performanceController=e,this.name=t,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=yt.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw dt.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw dt.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),Yt(this)}record(e,t,n){if(e<=0)throw dt.create("nonpositive trace startTime",{traceName:this.name});if(t<=0)throw dt.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*t),this.startTimeUs=Math.floor(1e3*e),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const e of Object.keys(n.metrics))isNaN(Number(n.metrics[e]))||(this.counters[e]=Math.floor(Number(n.metrics[e])));Yt(this)}incrementMetric(e,t=1){void 0===this.counters[e]?this.putMetric(e,t):this.putMetric(e,this.counters[e]+t)}putMetric(e,t){if(!function(e,t){return!(0===e.length||e.length>100)&&(t&&t.startsWith(ct)&&en.indexOf(e)>-1||!e.startsWith("_"))}(e,this.name))throw dt.create("invalid custom metric name",{customMetricName:e});this.counters[e]=function(e){const t=Math.floor(e);return t<e&&gt.info(`Metric value should be an Integer, setting the value as : ${t}.`),t}(null!=t?t:0)}getMetric(e){return this.counters[e]||0}putAttribute(e,t){const n=function(e){return!(0===e.length||e.length>40)&&(!Tt.some((t=>e.startsWith(t)))&&!!e.match(Ct))}(e),r=function(e){return 0!==e.length&&e.length<=100}(t);if(n&&r)this.customAttributes[e]=t;else{if(!n)throw dt.create("invalid attribute name",{attributeName:e});if(!r)throw dt.create("invalid attribute value",{attributeValue:t})}}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){void 0!==this.customAttributes[e]&&delete this.customAttributes[e]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){const e=this.api.getEntriesByName(this.traceMeasure),t=e&&e[0];t&&(this.durationUs=Math.floor(1e3*t.duration),this.startTimeUs=Math.floor(1e3*(t.startTime+this.api.getTimeOrigin())))}static createOobTrace(e,t,n,r){const i=yt.getInstance().getUrl();if(!i)return;const a=new tn(e,ct+i,!0),o=Math.floor(1e3*yt.getInstance().getTimeOrigin());a.setStartTime(o),t&&t[0]&&(a.setDuration(Math.floor(1e3*t[0].duration)),a.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),a.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),a.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd)));if(n){const e=n.find((e=>"first-paint"===e.name));e&&e.startTime&&a.putMetric("_fp",Math.floor(1e3*e.startTime));const t=n.find((e=>"first-contentful-paint"===e.name));t&&t.startTime&&a.putMetric(lt,Math.floor(1e3*t.startTime)),r&&a.putMetric(ut,Math.floor(1e3*r))}Yt(a)}static createUserTimingTrace(e,t){Yt(new tn(e,t,!1,t))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function nn(e,t){const n=t;if(!n||void 0===n.responseStart)return;const r=yt.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),a=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,o=Math.floor(1e3*(n.responseEnd-n.startTime));!function(e){const t=It.getInstance();if(!t.instrumentationEnabled)return;const n=e.url,r=t.logEndPointUrl.split("?")[0],i=t.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&t.loggingEnabled&&t.logNetworkAfterSampling&&setTimeout((()=>Gt(e,0)),0)}({performanceController:e,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:a,timeToResponseCompletedUs:o})}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function rn(e){wt()&&(setTimeout((()=>function(e){const t=yt.getInstance(),n=t.getEntriesByType("navigation"),r=t.getEntriesByType("paint");if(t.onFirstInputDelay){let i=setTimeout((()=>{tn.createOobTrace(e,n,r),i=void 0}),5e3);t.onFirstInputDelay((t=>{i&&(clearTimeout(i),tn.createOobTrace(e,n,r,t))}))}else tn.createOobTrace(e,n,r)}(e)),0),setTimeout((()=>function(e){const t=yt.getInstance(),n=t.getEntriesByType("resource");for(const t of n)nn(e,t);t.setupObserver("resource",(t=>nn(e,t)))}(e)),0),setTimeout((()=>function(e){const t=yt.getInstance(),n=t.getEntriesByType("measure");for(const t of n)an(e,t);t.setupObserver("measure",(t=>an(e,t)))}(e)),0))}function an(e,t){const n=t.name;n.substring(0,st.length)!==st&&tn.createUserTimingTrace(e,n)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */class on{constructor(e,t){this.app=e,this.installations=t,this.initialized=!1}_init(e){this.initialized||(void 0!==(null==e?void 0:e.dataCollectionEnabled)&&(this.dataCollectionEnabled=e.dataCollectionEnabled),void 0!==(null==e?void 0:e.instrumentationEnabled)&&(this.instrumentationEnabled=e.instrumentationEnabled),yt.getInstance().requiredApisAvailable()?o().then((e=>{e&&(Wt||(Kt(5500),Wt=!0),Ut(this).then((()=>rn(this)),(()=>rn(this))),this.initialized=!0)})).catch((e=>{gt.info(`Environment doesn't support IndexedDB: ${e}`)})):gt.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){It.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return It.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){It.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return It.getInstance().dataCollectionEnabled}}J(new f("performance",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw dt.create("FB not default");if("undefined"==typeof window)throw dt.create("no window");!function(e){bt=e}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(window);const i=new on(n,r);return i._init(t),i}),"PUBLIC")),te(it,at),te(it,at,"esm2017");
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
class sn{constructor(e,t){this.app=e,this._delegate=t}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(e){this._delegate.instrumentationEnabled=e}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(e){this._delegate.dataCollectionEnabled=e}trace(e){return function(e,t){var n;return e=(n=e)&&n._delegate?n._delegate:n,new tn(e,t)}(this._delegate,e)}}function cn(e){const t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("performance").getImmediate();return new sn(t,n)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var ln;(ln=be).INTERNAL.registerComponent(new f("performance-compat",cn,"PUBLIC")),ln.registerVersion("@firebase/performance-compat","0.1.5");
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
return be.registerVersion("firebase","9.6.8","compat-lite"),be}));
//# sourceMappingURL=firebase-performance-standalone-compat.es2017.js.map
