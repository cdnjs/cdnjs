!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).firebase,t.firebase.INTERNAL.modularAPIs)}(this,(function(t,e){"use strict";try{(function(){function s(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i=s(t),r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])})(t,e)};
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
    ***************************************************************************** */function n(t,e){for(var s=0,i=e.length,r=t.length;s<i;s++,r++)t[r]=e[s];return t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var a=function(t){function e(s,i,r){var n=t.call(this,i)||this;return n.code=s,n.customData=r,n.name="FirebaseError",Object.setPrototypeOf(n,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,o.prototype.create),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function s(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)}(e,t),e}(Error),o=function(){function t(t,e,s){this.service=t,this.serviceName=e,this.errors=s}return t.prototype.create=function(t){for(var e=[],s=1;s<arguments.length;s++)e[s-1]=arguments[s];var i=e[0]||{},r=this.service+"/"+t,n=this.errors[t],o=n?c(n,i):"Error",l=this.serviceName+": "+o+" ("+r+").",h=new a(r,l,i);return h},t}();function c(t,e){return t.replace(l,(function(t,s){var i=e[s];return null!=i?String(i):"<"+s+"?>"}))}var l=/\{\$([^}]+)}/g;
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
     */function h(t,e,s){void 0===e&&(e=1e3),void 0===s&&(s=2);var i=e*Math.pow(s,t),r=Math.round(.5*i*(Math.random()-.5)*2);return Math.min(144e5,i+r)}
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
     */function u(t){return t&&t._delegate?t._delegate:t}var g,f,p=function(){function t(t,e,s){this.name=t,this.instanceFactory=e,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(f||(f={}));var d={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},m=f.INFO,_=((g={})[f.DEBUG]="log",g[f.VERBOSE]="log",g[f.INFO]="info",g[f.WARN]="warn",g[f.ERROR]="error",g),w=function(t,e){for(var s=[],i=2;i<arguments.length;i++)s[i-2]=arguments[i];if(!(e<t.logLevel)){var r=(new Date).toISOString(),a=_[e];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[a].apply(console,n(["["+r+"]  "+t.name+":"],s))}},v=function(){function t(t){this.name=t,this._logLevel=m,this._logHandler=w,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in f))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?d[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,n([this,f.DEBUG],t)),this._logHandler.apply(this,n([this,f.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,n([this,f.VERBOSE],t)),this._logHandler.apply(this,n([this,f.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,n([this,f.INFO],t)),this._logHandler.apply(this,n([this,f.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,n([this,f.WARN],t)),this._logHandler.apply(this,n([this,f.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,n([this,f.ERROR],t)),this._logHandler.apply(this,n([this,f.ERROR],t))},t}();const y="@firebase/remote-config-exp";
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
class E{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach((t=>t()))}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */const b=new o("remoteconfig","Remote Config",{"registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}."});
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
const C=["1","true","t","yes","y","on"];class S{constructor(t,e=""){this._source=t,this._value=e}asString(){return this._value}asBoolean(){return"static"!==this._source&&C.indexOf(this._value.toLowerCase())>=0}asNumber(){if("static"===this._source)return 0;let t=Number(this._value);return isNaN(t)&&(t=0),t}getSource(){return this._source}}async function T(t){const e=u(t),[s,i]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);return!!(s&&s.config&&s.eTag&&s.eTag!==i)&&(await Promise.all([e._storageCache.setActiveConfig(s.config),e._storage.setActiveConfigEtag(s.eTag)]),!0)}function L(t){const e=u(t);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then((()=>{e._isInitializationComplete=!0}))),e._initializePromise}async function I(t){const e=u(t),s=new E;setTimeout((async()=>{s.abort()}),e.settings.fetchTimeoutMillis);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:s}),await e._storageCache.setLastFetchStatus("success")}catch(t){const s=function(t,e){return t instanceof a&&-1!==t.code.indexOf(e)}(t,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(s),t}}function M(t){const e=u(t);return function(t={},e={}){return Object.keys(Object.assign(Object.assign({},t),e))}
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
     */(e._storageCache.getActiveConfig(),e.defaultConfig).reduce(((e,s)=>(e[s]=F(t,s),e)),{})}function F(t,e){const s=u(t);s._isInitializationComplete||s._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const i=s._storageCache.getActiveConfig();return i&&void 0!==i[e]?new S("remote",i[e]):s.defaultConfig&&void 0!==s.defaultConfig[e]?new S("default",String(s.defaultConfig[e])):(s._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new S("static"))}class O{constructor(t,e,s,i){this.client=t,this.storage=e,this.storageCache=s,this.logger=i}isCachedDataFresh(t,e){if(!e)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const s=Date.now()-e,i=s<=t;return this.logger.debug(`Config fetch cache check. Cache age millis: ${s}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${i}.`),i}async fetch(t){const[e,s]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(s&&this.isCachedDataFresh(t.cacheMaxAgeMillis,e))return s;t.eTag=s&&s.eTag;const i=await this.client.fetch(t),r=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return 200===i.status&&r.push(this.storage.setLastSuccessfulFetchResponse(i)),await Promise.all(r),i}}
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
     */function R(t=navigator){return t.languages&&t.languages[0]||t.language}
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
     */class N{constructor(t,e,s,i,r,n){this.firebaseInstallations=t,this.sdkVersion=e,this.namespace=s,this.projectId=i,this.apiKey=r,this.appId=n}async fetch(t){const[e,s]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),i=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,r={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},n={sdk_version:this.sdkVersion,app_instance_id:e,app_instance_id_token:s,app_id:this.appId,language_code:R()},a={method:"POST",headers:r,body:JSON.stringify(n)},o=fetch(i,a),c=new Promise(((e,s)=>{t.signal.addEventListener((()=>{const t=new Error("The operation was aborted.");t.name="AbortError",s(t)}))}));let l;try{await Promise.race([o,c]),l=await o}catch(t){let e="fetch-client-network";throw"AbortError"===t.name&&(e="fetch-timeout"),b.create(e,{originalErrorMessage:t.message})}let h=l.status;const u=l.headers.get("ETag")||void 0;let g,f;if(200===l.status){let t;try{t=await l.json()}catch(t){throw b.create("fetch-client-parse",{originalErrorMessage:t.message})}g=t.entries,f=t.state}if("INSTANCE_STATE_UNSPECIFIED"===f?h=500:"NO_CHANGE"===f?h=304:"NO_TEMPLATE"!==f&&"EMPTY_CONFIG"!==f||(g={}),304!==h&&200!==h)throw b.create("fetch-status",{httpStatus:h});return{status:h,eTag:u,config:g}}}
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
     */class P{constructor(t,e){this.client=t,this.storage=e}async fetch(t){const e=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(t,e)}async attemptFetch(t,{throttleEndTimeMillis:e,backoffCount:s}){await function(t,e){return new Promise(((s,i)=>{const r=Math.max(e-Date.now(),0),n=setTimeout(s,r);t.addEventListener((()=>{clearTimeout(n),i(b.create("fetch-throttle",{throttleEndTimeMillis:e}))}))}))}(t.signal,e);try{const e=await this.client.fetch(t);return await this.storage.deleteThrottleMetadata(),e}catch(e){if(!function(t){if(!(t instanceof a&&t.customData))return!1;const e=Number(t.customData.httpStatus);return 429===e||500===e||503===e||504===e}(e))throw e;const i={throttleEndTimeMillis:Date.now()+h(s),backoffCount:s+1};return await this.storage.setThrottleMetadata(i),this.attemptFetch(t,i)}}}
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
     */class A{constructor(t,e,s,i,r){this.app=t,this._client=e,this._storageCache=s,this._storage=i,this._logger=r,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:6e4,minimumFetchIntervalMillis:432e5},this.defaultConfig={}}get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}}
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
     */function k(t,e){const s=t.target.error||void 0;return b.create(e,{originalErrorMessage:s&&s.message})}const D="app_namespace_store";class j{constructor(t,e,s,i=function(){return new Promise(((t,e)=>{const s=indexedDB.open("firebase_remote_config",1);s.onerror=t=>{e(k(t,"storage-open"))},s.onsuccess=e=>{t(e.target.result)},s.onupgradeneeded=t=>{const e=t.target.result;switch(t.oldVersion){case 0:e.createObjectStore(D,{keyPath:"compositeKey"})}}}))}()){this.appId=t,this.appName=e,this.namespace=s,this.openDbPromise=i}getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(t){return this.set("last_fetch_status",t)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(t){return this.set("last_successful_fetch_timestamp_millis",t)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(t){return this.set("last_successful_fetch_response",t)}getActiveConfig(){return this.get("active_config")}setActiveConfig(t){return this.set("active_config",t)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(t){return this.set("active_config_etag",t)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(t){return this.set("throttle_metadata",t)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}async get(t){const e=await this.openDbPromise;return new Promise(((s,i)=>{const r=e.transaction([D],"readonly").objectStore(D),n=this.createCompositeKey(t);try{const t=r.get(n);t.onerror=t=>{i(k(t,"storage-get"))},t.onsuccess=t=>{const e=t.target.result;s(e?e.value:void 0)}}catch(t){i(b.create("storage-get",{originalErrorMessage:t&&t.message}))}}))}async set(t,e){const s=await this.openDbPromise;return new Promise(((i,r)=>{const n=s.transaction([D],"readwrite").objectStore(D),a=this.createCompositeKey(t);try{const t=n.put({compositeKey:a,value:e});t.onerror=t=>{r(k(t,"storage-set"))},t.onsuccess=()=>{i()}}catch(t){r(b.create("storage-set",{originalErrorMessage:t&&t.message}))}}))}async delete(t){const e=await this.openDbPromise;return new Promise(((s,i)=>{const r=e.transaction([D],"readwrite").objectStore(D),n=this.createCompositeKey(t);try{const t=r.delete(n);t.onerror=t=>{i(k(t,"storage-delete"))},t.onsuccess=()=>{s()}}catch(t){i(b.create("storage-delete",{originalErrorMessage:t&&t.message}))}}))}createCompositeKey(t){return[this.appId,this.appName,this.namespace,t].join()}}
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
     */class H{constructor(t){this.storage=t}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}async loadFromStorage(){const t=this.storage.getLastFetchStatus(),e=this.storage.getLastSuccessfulFetchTimestampMillis(),s=this.storage.getActiveConfig(),i=await t;i&&(this.lastFetchStatus=i);const r=await e;r&&(this.lastSuccessfulFetchTimestampMillis=r);const n=await s;n&&(this.activeConfig=n)}setLastFetchStatus(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)}setLastSuccessfulFetchTimestampMillis(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)}setActiveConfig(t){return this.activeConfig=t,this.storage.setActiveConfig(t)}}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */e._registerComponent(new p("remote-config-exp",(function(t,{instanceIdentifier:s}){const i=t.getProvider("app-exp").getImmediate(),r=t.getProvider("installations-exp-internal").getImmediate();if("undefined"==typeof window)throw b.create("registration-window");const{projectId:n,apiKey:a,appId:o}=i.options;if(!n)throw b.create("registration-project-id");if(!a)throw b.create("registration-api-key");if(!o)throw b.create("registration-app-id");s=s||"firebase";const c=new j(o,i.name,s),l=new H(c),h=new v(y);h.logLevel=f.ERROR;const u=new N(r,e.SDK_VERSION,s,n,a,o),g=new P(u,c),p=new O(g,c,l,h),d=new A(i,p,l,c,h);return L(d),d}),"PUBLIC").setMultipleInstances(!0)),e.registerVersion(y,"0.0.900-exp.894b5da5a");
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
class B{constructor(t,e){this.app=t,this._delegate=e}get defaultConfig(){return this._delegate.defaultConfig}set defaultConfig(t){this._delegate.defaultConfig=t}get fetchTimeMillis(){return this._delegate.fetchTimeMillis}get lastFetchStatus(){return this._delegate.lastFetchStatus}get settings(){return this._delegate.settings}set settings(t){this._delegate.settings=t}activate(){return T(this._delegate)}ensureInitialized(){return L(this._delegate)}fetch(){return I(this._delegate)}fetchAndActivate(){
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
return async function(t){return t=u(t),await I(t),T(t)}(this._delegate)}getAll(){return M(this._delegate)}getBoolean(t){return function(t,e){return F(u(t),e).asBoolean()}(this._delegate,t)}getNumber(t){return function(t,e){return F(u(t),e).asNumber()}(this._delegate,t)}getString(t){return function(t,e){return F(u(t),e).asString()}(this._delegate,t)}getValue(t){return F(this._delegate,t)}setLogLevel(t){!function(t,e){const s=u(t);switch(e){case"debug":s._logger.logLevel=f.DEBUG;break;case"silent":s._logger.logLevel=f.SILENT;break;default:s._logger.logLevel=f.ERROR}}(this._delegate,t)}}function x(t,{instanceIdentifier:e}){const s=t.getProvider("app-compat").getImmediate(),i=t.getProvider("remote-config-exp").getImmediate({identifier:e});return new B(s,i)}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var $;($=i.default).INTERNAL.registerComponent(new p("remoteConfig-compat",x,"PUBLIC").setMultipleInstances(!0)),$.registerVersion("@firebase/remote-config-compat","0.0.900-exp.894b5da5a")}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-remote-config-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-remote-config-compat.js.map
