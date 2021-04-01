!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).firebase,t.firebase.INTERNAL.modularAPIs)}(this,(function(t,e){"use strict";try{(function(){function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=r(t),i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)};
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
    ***************************************************************************** */var o=function(){return(o=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function s(t,e,r,n){return new(r||(r=Promise))((function(i,o){function s(t){try{c(n.next(t))}catch(t){o(t)}}function a(t){try{c(n.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}c((n=n.apply(t,e||[])).next())}))}function a(t,e){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}function c(t,e){for(var r=0,n=e.length,i=t.length;r<n;r++,i++)t[i]=e[r];return t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var u=function(t){function e(r,n,i){var o=t.call(this,n)||this;return o.code=r,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,l.prototype.create),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}(e,t),e}(Error),l=function(){function t(t,e,r){this.service=t,this.serviceName=e,this.errors=r}return t.prototype.create=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=e[0]||{},i=this.service+"/"+t,o=this.errors[t],s=o?f(o,n):"Error",a=this.serviceName+": "+s+" ("+i+").",c=new u(i,a,n);return c},t}();function f(t,e){return t.replace(h,(function(t,r){var n=e[r];return null!=n?String(n):"<"+r+"?>"}))}var h=/\{\$([^}]+)}/g;
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
     */function p(t,e,r){void 0===e&&(e=1e3),void 0===r&&(r=2);var n=e*Math.pow(r,t),i=Math.round(.5*n*(Math.random()-.5)*2);return Math.min(144e5,n+i)}
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
     */function g(t){return t&&t._delegate?t._delegate:t}var d,m,v=function(){function t(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(m||(m={}));var y,_={debug:m.DEBUG,verbose:m.VERBOSE,info:m.INFO,warn:m.WARN,error:m.ERROR,silent:m.SILENT},b=m.INFO,w=((d={})[m.DEBUG]="log",d[m.VERBOSE]="log",d[m.INFO]="info",d[m.WARN]="warn",d[m.ERROR]="error",d),E=function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(e<t.logLevel)){var i=(new Date).toISOString(),o=w[e];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[o].apply(console,c(["["+i+"]  "+t.name+":"],r))}},S=function(){function t(t){this.name=t,this._logLevel=b,this._logHandler=E,this._userLogHandler=null}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in m))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?_[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,m.DEBUG],t)),this._logHandler.apply(this,c([this,m.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,m.VERBOSE],t)),this._logHandler.apply(this,c([this,m.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,m.INFO],t)),this._logHandler.apply(this,c([this,m.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,m.WARN],t)),this._logHandler.apply(this,c([this,m.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,c([this,m.ERROR],t)),this._logHandler.apply(this,c([this,m.ERROR],t))},t}(),C="@firebase/remote-config-exp",T=function(){function t(){this.listeners=[]}return t.prototype.addEventListener=function(t){this.listeners.push(t)},t.prototype.abort=function(){this.listeners.forEach((function(t){return t()}))},t}(),L=((y={})["registration-window"]="Undefined window object. This SDK only supports usage in a browser environment.",y["registration-project-id"]="Undefined project identifier. Check Firebase app initialization.",y["registration-api-key"]="Undefined API key. Check Firebase app initialization.",y["registration-app-id"]="Undefined app identifier. Check Firebase app initialization.",y["storage-open"]="Error thrown when opening storage. Original error: {$originalErrorMessage}.",y["storage-get"]="Error thrown when reading from storage. Original error: {$originalErrorMessage}.",y["storage-set"]="Error thrown when writing to storage. Original error: {$originalErrorMessage}.",y["storage-delete"]="Error thrown when deleting from storage. Original error: {$originalErrorMessage}.",y["fetch-client-network"]="Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.",y["fetch-timeout"]='The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',y["fetch-throttle"]='The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',y["fetch-client-parse"]="Fetch client could not parse response. Original error: {$originalErrorMessage}.",y["fetch-status"]="Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.",y),M=new l("remoteconfig","Remote Config",L);
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
var F=["1","true","t","yes","y","on"],I=function(){function t(t,e){void 0===e&&(e=""),this._source=t,this._value=e}return t.prototype.asString=function(){return this._value},t.prototype.asBoolean=function(){return"static"!==this._source&&F.indexOf(this._value.toLowerCase())>=0},t.prototype.asNumber=function(){if("static"===this._source)return 0;var t=Number(this._value);return isNaN(t)&&(t=0),t},t.prototype.getSource=function(){return this._source},t}();function O(t){return s(this,void 0,void 0,(function(){var e,r,n,i;return a(this,(function(o){switch(o.label){case 0:return e=g(t),[4,Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()])];case 1:return r=o.sent(),n=r[0],i=r[1],n&&n.config&&n.eTag&&n.eTag!==i?[4,Promise.all([e._storageCache.setActiveConfig(n.config),e._storage.setActiveConfigEtag(n.eTag)])]:[2,!1];case 2:return o.sent(),[2,!0]}}))}))}function P(t){var e=g(t);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then((function(){e._isInitializationComplete=!0}))),e._initializePromise}function R(t){return s(this,void 0,void 0,(function(){var e,r,n,i,o=this;return a(this,(function(c){switch(c.label){case 0:e=g(t),r=new T,setTimeout((function(){return s(o,void 0,void 0,(function(){return a(this,(function(t){return r.abort(),[2]}))}))}),e.settings.fetchTimeoutMillis),c.label=1;case 1:return c.trys.push([1,4,,6]),[4,e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:r})];case 2:return c.sent(),[4,e._storageCache.setLastFetchStatus("success")];case 3:return c.sent(),[3,6];case 4:return n=c.sent(),f="fetch-throttle",i=(l=n)instanceof u&&-1!==l.code.indexOf(f)?"throttle":"failure",[4,e._storageCache.setLastFetchStatus(i)];case 5:throw c.sent(),n;case 6:return[2]}var l,f}))}))}function N(t){var e=g(t);return function(t,e){void 0===t&&(t={});void 0===e&&(e={});return Object.keys(o(o({},t),e))}
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
     */(e._storageCache.getActiveConfig(),e.defaultConfig).reduce((function(e,r){return e[r]=A(t,r),e}),{})}function A(t,e){var r=g(t);r._isInitializationComplete||r._logger.debug('A value was requested for key "'+e+'" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.');var n=r._storageCache.getActiveConfig();return n&&void 0!==n[e]?new I("remote",n[e]):r.defaultConfig&&void 0!==r.defaultConfig[e]?new I("default",String(r.defaultConfig[e])):(r._logger.debug('Returning static value for key "'+e+'". Define a default or remote value if this is unintentional.'),new I("static"))}var j=function(){function t(t,e,r,n){this.client=t,this.storage=e,this.storageCache=r,this.logger=n}return t.prototype.isCachedDataFresh=function(t,e){if(!e)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;var r=Date.now()-e,n=r<=t;return this.logger.debug("Config fetch cache check. Cache age millis: "+r+". Cache max age millis (minimumFetchIntervalMillis setting): "+t+". Is cache hit: "+n+"."),n},t.prototype.fetch=function(t){return s(this,void 0,void 0,(function(){var e,r,n,i,o;return a(this,(function(s){switch(s.label){case 0:return[4,Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()])];case 1:return e=s.sent(),r=e[0],(n=e[1])&&this.isCachedDataFresh(t.cacheMaxAgeMillis,r)?[2,n]:(t.eTag=n&&n.eTag,[4,this.client.fetch(t)]);case 2:return i=s.sent(),o=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())],200===i.status&&o.push(this.storage.setLastSuccessfulFetchResponse(i)),[4,Promise.all(o)];case 3:return s.sent(),[2,i]}}))}))},t}();
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
var k=function(){function t(t,e,r,n,i,o){this.firebaseInstallations=t,this.sdkVersion=e,this.namespace=r,this.projectId=n,this.apiKey=i,this.appId=o}return t.prototype.fetch=function(t){return s(this,void 0,void 0,(function(){var e,r,n,i,o,s,c,u,l,f,h,p,g,d,m,v,y,_,b;return a(this,(function(a){switch(a.label){case 0:return[4,Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()])];case 1:e=a.sent(),r=e[0],n=e[1],i=window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com",o=i+"/v1/projects/"+this.projectId+"/namespaces/"+this.namespace+":fetch?key="+this.apiKey,s={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:r,app_instance_id_token:n,app_id:this.appId,language_code:(void 0===w&&(w=navigator),w.languages&&w.languages[0]||w.language)},u={method:"POST",headers:s,body:JSON.stringify(c)},l=fetch(o,u),f=new Promise((function(e,r){t.signal.addEventListener((function(){var t=new Error("The operation was aborted.");t.name="AbortError",r(t)}))})),a.label=2;case 2:return a.trys.push([2,5,,6]),[4,Promise.race([l,f])];case 3:return a.sent(),[4,l];case 4:return h=a.sent(),[3,6];case 5:throw p=a.sent(),g="fetch-client-network","AbortError"===p.name&&(g="fetch-timeout"),M.create(g,{originalErrorMessage:p.message});case 6:if(d=h.status,m=h.headers.get("ETag")||void 0,200!==h.status)return[3,11];_=void 0,a.label=7;case 7:return a.trys.push([7,9,,10]),[4,h.json()];case 8:return _=a.sent(),[3,10];case 9:throw b=a.sent(),M.create("fetch-client-parse",{originalErrorMessage:b.message});case 10:v=_.entries,y=_.state,a.label=11;case 11:if("INSTANCE_STATE_UNSPECIFIED"===y?d=500:"NO_CHANGE"===y?d=304:"NO_TEMPLATE"!==y&&"EMPTY_CONFIG"!==y||(v={}),304!==d&&200!==d)throw M.create("fetch-status",{httpStatus:d});return[2,{status:d,eTag:m,config:v}]}var w}))}))},t}();
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
     */function D(t,e){return new Promise((function(r,n){var i=Math.max(e-Date.now(),0),o=setTimeout(r,i);t.addEventListener((function(){clearTimeout(o),n(M.create("fetch-throttle",{throttleEndTimeMillis:e}))}))}))}var H=function(){function t(t,e){this.client=t,this.storage=e}return t.prototype.fetch=function(t){return s(this,void 0,void 0,(function(){var e;return a(this,(function(r){switch(r.label){case 0:return[4,this.storage.getThrottleMetadata()];case 1:return e=r.sent()||{backoffCount:0,throttleEndTimeMillis:Date.now()},[2,this.attemptFetch(t,e)]}}))}))},t.prototype.attemptFetch=function(t,e){var r=e.throttleEndTimeMillis,n=e.backoffCount;return s(this,void 0,void 0,(function(){var e,i,o;return a(this,(function(s){switch(s.label){case 0:return[4,D(t.signal,r)];case 1:s.sent(),s.label=2;case 2:return s.trys.push([2,5,,7]),[4,this.client.fetch(t)];case 3:return e=s.sent(),[4,this.storage.deleteThrottleMetadata()];case 4:return s.sent(),[2,e];case 5:if(!function(t){if(!(t instanceof u&&t.customData))return!1;var e=Number(t.customData.httpStatus);return 429===e||500===e||503===e||504===e}(i=s.sent()))throw i;return o={throttleEndTimeMillis:Date.now()+p(n),backoffCount:n+1},[4,this.storage.setThrottleMetadata(o)];case 6:return s.sent(),[2,this.attemptFetch(t,o)];case 7:return[2]}}))}))},t}(),x=function(){function t(t,e,r,n,i){this.app=t,this._client=e,this._storageCache=r,this._storage=n,this._logger=i,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:6e4,minimumFetchIntervalMillis:432e5},this.defaultConfig={}}return Object.defineProperty(t.prototype,"fetchTimeMillis",{get:function(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastFetchStatus",{get:function(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"},enumerable:!1,configurable:!0}),t}();
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
function B(t,e){var r=t.target.error||void 0;return M.create(e,{originalErrorMessage:r&&r.message})}var U="app_namespace_store";var K=function(){function t(t,e,r,n){void 0===n&&(n=new Promise((function(t,e){var r=indexedDB.open("firebase_remote_config",1);r.onerror=function(t){e(B(t,"storage-open"))},r.onsuccess=function(e){t(e.target.result)},r.onupgradeneeded=function(t){var e=t.target.result;switch(t.oldVersion){case 0:e.createObjectStore(U,{keyPath:"compositeKey"})}}}))),this.appId=t,this.appName=e,this.namespace=r,this.openDbPromise=n}return t.prototype.getLastFetchStatus=function(){return this.get("last_fetch_status")},t.prototype.setLastFetchStatus=function(t){return this.set("last_fetch_status",t)},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.get("last_successful_fetch_timestamp_millis")},t.prototype.setLastSuccessfulFetchTimestampMillis=function(t){return this.set("last_successful_fetch_timestamp_millis",t)},t.prototype.getLastSuccessfulFetchResponse=function(){return this.get("last_successful_fetch_response")},t.prototype.setLastSuccessfulFetchResponse=function(t){return this.set("last_successful_fetch_response",t)},t.prototype.getActiveConfig=function(){return this.get("active_config")},t.prototype.setActiveConfig=function(t){return this.set("active_config",t)},t.prototype.getActiveConfigEtag=function(){return this.get("active_config_etag")},t.prototype.setActiveConfigEtag=function(t){return this.set("active_config_etag",t)},t.prototype.getThrottleMetadata=function(){return this.get("throttle_metadata")},t.prototype.setThrottleMetadata=function(t){return this.set("throttle_metadata",t)},t.prototype.deleteThrottleMetadata=function(){return this.delete("throttle_metadata")},t.prototype.get=function(t){return s(this,void 0,void 0,(function(){var e,r=this;return a(this,(function(n){switch(n.label){case 0:return[4,this.openDbPromise];case 1:return e=n.sent(),[2,new Promise((function(n,i){var o=e.transaction([U],"readonly").objectStore(U),s=r.createCompositeKey(t);try{var a=o.get(s);a.onerror=function(t){i(B(t,"storage-get"))},a.onsuccess=function(t){var e=t.target.result;n(e?e.value:void 0)}}catch(t){i(M.create("storage-get",{originalErrorMessage:t&&t.message}))}}))]}}))}))},t.prototype.set=function(t,e){return s(this,void 0,void 0,(function(){var r,n=this;return a(this,(function(i){switch(i.label){case 0:return[4,this.openDbPromise];case 1:return r=i.sent(),[2,new Promise((function(i,o){var s=r.transaction([U],"readwrite").objectStore(U),a=n.createCompositeKey(t);try{var c=s.put({compositeKey:a,value:e});c.onerror=function(t){o(B(t,"storage-set"))},c.onsuccess=function(){i()}}catch(t){o(M.create("storage-set",{originalErrorMessage:t&&t.message}))}}))]}}))}))},t.prototype.delete=function(t){return s(this,void 0,void 0,(function(){var e,r=this;return a(this,(function(n){switch(n.label){case 0:return[4,this.openDbPromise];case 1:return e=n.sent(),[2,new Promise((function(n,i){var o=e.transaction([U],"readwrite").objectStore(U),s=r.createCompositeKey(t);try{var a=o.delete(s);a.onerror=function(t){i(B(t,"storage-delete"))},a.onsuccess=function(){n()}}catch(t){i(M.create("storage-delete",{originalErrorMessage:t&&t.message}))}}))]}}))}))},t.prototype.createCompositeKey=function(t){return[this.appId,this.appName,this.namespace,t].join()},t}(),V=function(){function t(t){this.storage=t}return t.prototype.getLastFetchStatus=function(){return this.lastFetchStatus},t.prototype.getLastSuccessfulFetchTimestampMillis=function(){return this.lastSuccessfulFetchTimestampMillis},t.prototype.getActiveConfig=function(){return this.activeConfig},t.prototype.loadFromStorage=function(){return s(this,void 0,void 0,(function(){var t,e,r,n,i,o;return a(this,(function(s){switch(s.label){case 0:return t=this.storage.getLastFetchStatus(),e=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),[4,t];case 1:return(n=s.sent())&&(this.lastFetchStatus=n),[4,e];case 2:return(i=s.sent())&&(this.lastSuccessfulFetchTimestampMillis=i),[4,r];case 3:return(o=s.sent())&&(this.activeConfig=o),[2]}}))}))},t.prototype.setLastFetchStatus=function(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)},t.prototype.setLastSuccessfulFetchTimestampMillis=function(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)},t.prototype.setActiveConfig=function(t){return this.activeConfig=t,this.storage.setActiveConfig(t)},t}();
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
     */e._registerComponent(new v("remote-config-exp",(function(t,r){var n=r.instanceIdentifier,i=t.getProvider("app-exp").getImmediate(),o=t.getProvider("installations-exp-internal").getImmediate();if("undefined"==typeof window)throw M.create("registration-window");var s=i.options,a=s.projectId,c=s.apiKey,u=s.appId;if(!a)throw M.create("registration-project-id");if(!c)throw M.create("registration-api-key");if(!u)throw M.create("registration-app-id");n=n||"firebase";var l=new K(u,i.name,n),f=new V(l),h=new S(C);h.logLevel=m.ERROR;var p=new k(o,e.SDK_VERSION,n,a,c,u),g=new H(p,l),d=new j(g,l,f,h),v=new x(i,d,f,l,h);return P(v),v}),"PUBLIC").setMultipleInstances(!0)),e.registerVersion(C,"0.0.900");
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var z,G=function(){function t(t,e){this.app=t,this._delegate=e}return Object.defineProperty(t.prototype,"defaultConfig",{get:function(){return this._delegate.defaultConfig},set:function(t){this._delegate.defaultConfig=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fetchTimeMillis",{get:function(){return this._delegate.fetchTimeMillis},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastFetchStatus",{get:function(){return this._delegate.lastFetchStatus},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"settings",{get:function(){return this._delegate.settings},set:function(t){this._delegate.settings=t},enumerable:!1,configurable:!0}),t.prototype.activate=function(){return O(this._delegate)},t.prototype.ensureInitialized=function(){return P(this._delegate)},t.prototype.fetch=function(){return R(this._delegate)},t.prototype.fetchAndActivate=function(){
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
return function(t){return s(this,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,R(t=g(t))];case 1:return e.sent(),[2,O(t)]}}))}))}
/**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */(this._delegate)},t.prototype.getAll=function(){return N(this._delegate)},t.prototype.getBoolean=function(t){return function(t,e){return A(g(t),e).asBoolean()}(this._delegate,t)},t.prototype.getNumber=function(t){return function(t,e){return A(g(t),e).asNumber()}(this._delegate,t)},t.prototype.getString=function(t){return function(t,e){return A(g(t),e).asString()}(this._delegate,t)},t.prototype.getValue=function(t){return A(this._delegate,t)},t.prototype.setLogLevel=function(t){!function(t,e){var r=g(t);switch(e){case"debug":r._logger.logLevel=m.DEBUG;break;case"silent":r._logger.logLevel=m.SILENT;break;default:r._logger.logLevel=m.ERROR}}(this._delegate,t)},t}();function $(t,e){var r=e.instanceIdentifier,n=t.getProvider("app-compat").getImmediate(),i=t.getProvider("remote-config-exp").getImmediate({identifier:r});return new G(n,i)}(z=n.default).INTERNAL.registerComponent(new v("remoteConfig-compat",$,"PUBLIC").setMultipleInstances(!0)),z.registerVersion("@firebase/remote-config-compat","0.0.900")}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-remote-config-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-remote-config-compat.js.map
