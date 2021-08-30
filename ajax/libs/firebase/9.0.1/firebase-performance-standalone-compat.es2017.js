!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).firebase=e()}(this,(function(){"use strict";
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
    ***************************************************************************** */var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};function e(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))}function n(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function r(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function i(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function o(t,e){for(var n=0,r=e.length,i=t.length;n<r;n++,i++)t[i]=e[n];return t}function a(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:return new Date(e.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return e}for(var n in e)e.hasOwnProperty(n)&&"__proto__"!==n&&(t[n]=a(t[n],e[n]));return t}
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var s=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(e,n){t.resolve=e,t.reject=n}))}return t.prototype.wrapCallback=function(t){var e=this;return function(n,r){n?e.reject(n):e.resolve(r),"function"==typeof t&&(e.promise.catch((function(){})),1===t.length?t(n):t(n,r))}},t}();
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
var c=function(e){function n(t,r,i){var o=e.call(this,r)||this;return o.code=t,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,u.prototype.create),o}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}(n,e),n}(Error),u=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},i=this.service+"/"+t,o=this.errors[t],a=o?l(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",u=new c(i,s,r);return u},t}();function l(t,e){return t.replace(p,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var p=/\{\$([^}]+)}/g;
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */function f(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function d(t,e){if(t===e)return!0;for(var n=Object.keys(t),r=Object.keys(e),i=0,o=n;i<o.length;i++){var a=o[i];if(!r.includes(a))return!1;var s=t[a],c=e[a];if(h(s)&&h(c)){if(!d(s,c))return!1}else if(s!==c)return!1}for(var u=0,l=r;u<l.length;u++){a=l[u];if(!n.includes(a))return!1}return!0}function h(t){return null!==t&&"object"==typeof t}
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
     */var m=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t.prototype.setInstanceCreatedCallback=function(t){return this.onInstanceCreated=t,this},t}(),g="[DEFAULT]",v=function(){function t(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return t.prototype.get=function(t){var e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){var n=new s;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:e});r&&n.resolve(r)}catch(t){}}return this.instancesDeferred.get(e).promise},t.prototype.getImmediate=function(t){var e,n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(t){if(r)return null;throw t}},t.prototype.getComponent=function(){return this.component},t.prototype.setComponent=function(t){var e,n;if(t.name!==this.name)throw Error("Mismatching Component "+t.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
     */(t))try{this.getOrInitializeService({instanceIdentifier:g})}catch(t){}try{for(var o=r(this.instancesDeferred.entries()),a=o.next();!a.done;a=o.next()){var s=i(a.value,2),c=s[0],u=s[1],l=this.normalizeInstanceIdentifier(c);try{var p=this.getOrInitializeService({instanceIdentifier:l});u.resolve(p)}catch(t){}}}catch(t){e={error:t}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}}},t.prototype.clearInstance=function(t){void 0===t&&(t=g),this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)},t.prototype.delete=function(){return e(this,void 0,void 0,(function(){var t;return n(this,(function(e){switch(e.label){case 0:return t=Array.from(this.instances.values()),[4,Promise.all(o(o([],i(t.filter((function(t){return"INTERNAL"in t})).map((function(t){return t.INTERNAL.delete()})))),i(t.filter((function(t){return"_delete"in t})).map((function(t){return t._delete()})))))];case 1:return e.sent(),[2]}}))}))},t.prototype.isComponentSet=function(){return null!=this.component},t.prototype.isInitialized=function(t){return void 0===t&&(t=g),this.instances.has(t)},t.prototype.getOptions=function(t){return void 0===t&&(t=g),this.instancesOptions.get(t)||{}},t.prototype.initialize=function(t){var e,n;void 0===t&&(t={});var o=t.options,a=void 0===o?{}:o,s=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(s))throw Error(this.name+"("+s+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var c=this.getOrInitializeService({instanceIdentifier:s,options:a});try{for(var u=r(this.instancesDeferred.entries()),l=u.next();!l.done;l=u.next()){var p=i(l.value,2),f=p[0],d=p[1];s===this.normalizeInstanceIdentifier(f)&&d.resolve(c)}}catch(t){e={error:t}}finally{try{l&&!l.done&&(n=u.return)&&n.call(u)}finally{if(e)throw e.error}}return c},t.prototype.onInit=function(t,e){var n,r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);var o=this.instances.get(r);return o&&t(o,r),function(){i.delete(t)}},t.prototype.invokeOnInitCallbacks=function(t,e){var n,i,o=this.onInitCallbacks.get(e);if(o)try{for(var a=r(o),s=a.next();!s.done;s=a.next()){var c=s.value;try{c(t,e)}catch(t){}}}catch(t){n={error:t}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(n)throw n.error}}},t.prototype.getOrInitializeService=function(t){var e,n=t.instanceIdentifier,r=t.options,i=void 0===r?{}:r,o=this.instances.get(n);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:(e=n,e===g?void 0:e),options:i}),this.instances.set(n,o),this.instancesOptions.set(n,i),this.invokeOnInitCallbacks(o,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,o)}catch(t){}return o||null},t.prototype.normalizeInstanceIdentifier=function(t){return void 0===t&&(t=g),this.component?this.component.multipleInstances?t:g:t},t.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},t}();
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
     */var y,b,w=function(){function t(t){this.name=t,this.providers=new Map}return t.prototype.addComponent=function(t){var e=this.getProvider(t.name);if(e.isComponentSet())throw new Error("Component "+t.name+" has already been registered with "+this.name);e.setComponent(t)},t.prototype.addOrOverwriteComponent=function(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)},t.prototype.getProvider=function(t){if(this.providers.has(t))return this.providers.get(t);var e=new v(t,this);return this.providers.set(t,e),e},t.prototype.getProviders=function(){return Array.from(this.providers.values())},t}(),_=[];
/**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(b||(b={}));var I={debug:b.DEBUG,verbose:b.VERBOSE,info:b.INFO,warn:b.WARN,error:b.ERROR,silent:b.SILENT},E=b.INFO,S=((y={})[b.DEBUG]="log",y[b.VERBOSE]="log",y[b.INFO]="info",y[b.WARN]="warn",y[b.ERROR]="error",y),T=function(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var i=(new Date).toISOString(),a=S[e];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: "+e+")");console[a].apply(console,o(["["+i+"]  "+t.name+":"],n))}},C=function(){function t(t){this.name=t,this._logLevel=E,this._logHandler=T,this._userLogHandler=null,_.push(this)}return Object.defineProperty(t.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in b))throw new TypeError('Invalid value "'+t+'" assigned to `logLevel`');this._logLevel=t},enumerable:!1,configurable:!0}),t.prototype.setLogLevel=function(t){this._logLevel="string"==typeof t?I[t]:t},Object.defineProperty(t.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(t){this._userLogHandler=t},enumerable:!1,configurable:!0}),t.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,b.DEBUG],t)),this._logHandler.apply(this,o([this,b.DEBUG],t))},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,b.VERBOSE],t)),this._logHandler.apply(this,o([this,b.VERBOSE],t))},t.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,b.INFO],t)),this._logHandler.apply(this,o([this,b.INFO],t))},t.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,b.WARN],t)),this._logHandler.apply(this,o([this,b.WARN],t))},t.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._userLogHandler&&this._userLogHandler.apply(this,o([this,b.ERROR],t)),this._logHandler.apply(this,o([this,b.ERROR],t))},t}();
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
class A{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const O="@firebase/app",N=new C("@firebase/app"),k="[DEFAULT]",P={[O]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},D=new Map,R=new Map;function j(t,e){try{t.container.addComponent(e)}catch(n){N.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function L(t){const e=t.name;if(R.has(e))return N.debug(`There were multiple attempts to register component ${e}.`),!1;R.set(e,t);for(const e of D.values())j(e,t);return!0}function M(t,e){return t.container.getProvider(e)}
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
const B=new u("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
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
class F{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new m("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw B.create("app-deleted",{appName:this._name})}}
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
     */const U="9.0.1";function x(t,e={}){if("object"!=typeof e){e={name:e}}const n=Object.assign({name:k,automaticDataCollectionEnabled:!1},e),r=n.name;if("string"!=typeof r||!r)throw B.create("bad-app-name",{appName:String(r)});const i=D.get(r);if(i){if(d(t,i.options)&&d(n,i.config))return i;throw B.create("duplicate-app",{appName:r})}const o=new w(r);for(const t of R.values())o.addComponent(t);const a=new F(t,n,o);return D.set(r,a),a}async function $(t){const e=t.name;D.has(e)&&(D.delete(e),await Promise.all(t.container.getProviders().map((t=>t.delete()))),t.isDeleted=!0)}function q(t,e,n){var r;let i=null!==(r=P[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const o=i.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const t=[`Unable to register library "${i}" with version "${e}":`];return o&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&t.push("and"),a&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void N.warn(t.join(" "))}L(new m(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))}function z(t,e){if(null!==t&&"function"!=typeof t)throw B.create("invalid-log-argument");!function(t,e){for(var n=function(n){var r=null;e&&e.level&&(r=I[e.level]),n.userLogHandler=null===t?null:function(e,n){for(var i=[],o=2;o<arguments.length;o++)i[o-2]=arguments[o];var a=i.map((function(t){if(null==t)return null;if("string"==typeof t)return t;if("number"==typeof t||"boolean"==typeof t)return t.toString();if(t instanceof Error)return t.message;try{return JSON.stringify(t)}catch(t){return null}})).filter((function(t){return t})).join(" ");n>=(null!=r?r:e.logLevel)&&t({level:b[n].toLowerCase(),message:a,args:i,type:e.name})}},r=0,i=_;r<i.length;r++)n(i[r])}(t,e)}function V(t){var e;e=t,_.forEach((function(t){t.setLogLevel(e)}))}
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
     */var H;L(new m("platform-logger",(t=>new A(t)),"PRIVATE")),q(O,"0.7.0",H),q("fire-js","");var K=Object.freeze({__proto__:null,SDK_VERSION:U,_DEFAULT_ENTRY_NAME:k,_addComponent:j,_addOrOverwriteComponent:function(t,e){t.container.addOrOverwriteComponent(e)},_apps:D,_clearComponents:function(){R.clear()},_components:R,_getProvider:M,_registerComponent:L,_removeServiceInstance:function(t,e,n="[DEFAULT]"){M(t,e).clearInstance(n)},deleteApp:$,getApp:function(t="[DEFAULT]"){const e=D.get(t);if(!e)throw B.create("no-app",{appName:t});return e},getApps:function(){return Array.from(D.values())},initializeApp:x,onLog:z,registerVersion:q,setLogLevel:V,FirebaseError:c});
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
     */class W{constructor(t,e){this._delegate=t,this.firebase=e,j(t,new m("app-compat",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.automaticDataCollectionEnabled=t}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return this.firebase.INTERNAL.removeApp(this.name),$(this._delegate)}_getService(t,e="[DEFAULT]"){return this._delegate.checkDestroyed(),this._delegate.container.getProvider(t).getImmediate({identifier:e})}}
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
     */const G=new u("app-compat","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."});
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
function J(t){const e={},n={__esModule:!0,initializeApp:function(r,i={}){const o=x(r,i);if(f(e,o.name))return e[o.name];const a=new t(o,n);return e[o.name]=a,a},app:r,registerVersion:q,setLogLevel:V,onLog:z,apps:null,SDK_VERSION:U,INTERNAL:{registerComponent:function(e){const i=e.name,o=i.replace("-compat","");if(L(e)&&"PUBLIC"===e.type){const s=(t=r())=>{if("function"!=typeof t[o])throw G.create("invalid-app-argument",{appName:i});return t[o]()};void 0!==e.serviceProps&&a(s,e.serviceProps),n[o]=s,t.prototype[o]=function(...t){return this._getService.bind(this,i).apply(this,e.multipleInstances?t:[])}}return"PUBLIC"===e.type?n[o]:null},removeApp:function(t){delete e[t]},useAsService:function(t,e){if("serverAuth"===e)return null;return e},modularAPIs:K}};function r(t){if(!f(e,t=t||k))throw G.create("no-app",{appName:t});return e[t]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(e).map((t=>e[t]))}}),r.App=t,n}
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
const Y=function(){const t=J(W);t.SDK_VERSION=`${t.SDK_VERSION}_LITE`;const e=t.INTERNAL.registerComponent;return t.INTERNAL.registerComponent=function(t){if("PUBLIC"===t.type&&!t.name.includes("performance")&&!t.name.includes("installations"))throw Error(`${name} cannot register with the standalone perf instance`);return e(t)},t}();!
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
function(t){q("@firebase/app-compat","0.1.1",t)}("lite");function X(t){return Array.prototype.slice.call(t)}function Z(t){return new Promise((function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function Q(t,e,n){var r,i=new Promise((function(i,o){Z(r=t[e].apply(t,n)).then(i,o)}));return i.request=r,i}function tt(t,e,n){var r=Q(t,e,n);return r.then((function(t){if(t)return new at(t,r.request)}))}function et(t,e,n){n.forEach((function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})}))}function nt(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return Q(this[e],r,arguments)})}))}function rt(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})}))}function it(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return tt(this[e],r,arguments)})}))}function ot(t){this._index=t}function at(t,e){this._cursor=t,this._request=e}function st(t){this._store=t}function ct(t){this._tx=t,this.complete=new Promise((function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}}))}function ut(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new ct(n)}function lt(t){this._db=t}
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
Y.registerVersion("firebase","9.0.1","app-compat"),et(ot,"_index",["name","keyPath","multiEntry","unique"]),nt(ot,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),it(ot,"_index",IDBIndex,["openCursor","openKeyCursor"]),et(at,"_cursor",["direction","key","primaryKey","value"]),nt(at,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(t){t in IDBCursor.prototype&&(at.prototype[t]=function(){var e=this,n=arguments;return Promise.resolve().then((function(){return e._cursor[t].apply(e._cursor,n),Z(e._request).then((function(t){if(t)return new at(t,e._request)}))}))})})),st.prototype.createIndex=function(){return new ot(this._store.createIndex.apply(this._store,arguments))},st.prototype.index=function(){return new ot(this._store.index.apply(this._store,arguments))},et(st,"_store",["name","keyPath","indexNames","autoIncrement"]),nt(st,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),it(st,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),rt(st,"_store",IDBObjectStore,["deleteIndex"]),ct.prototype.objectStore=function(){return new st(this._tx.objectStore.apply(this._tx,arguments))},et(ct,"_tx",["objectStoreNames","mode"]),rt(ct,"_tx",IDBTransaction,["abort"]),ut.prototype.createObjectStore=function(){return new st(this._db.createObjectStore.apply(this._db,arguments))},et(ut,"_db",["name","version","objectStoreNames"]),rt(ut,"_db",IDBDatabase,["deleteObjectStore","close"]),lt.prototype.transaction=function(){return new ct(this._db.transaction.apply(this._db,arguments))},et(lt,"_db",["name","version","objectStoreNames"]),rt(lt,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(t){[st,ot].forEach((function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var e=X(arguments),n=e[e.length-1],r=this._store||this._index,i=r[t].apply(r,e.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[ot,st].forEach((function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise((function(i){n.iterateCursor(t,(function(t){t?(r.push(t.value),void 0===e||r.length!=e?t.continue():i(r)):i(r)}))}))})}));const pt="0.5.0",ft=1e4,dt="w:0.5.0",ht="FIS_v2",mt=36e5,gt=new u("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function vt(t){return t instanceof c&&t.code.includes("request-failed")}
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
     */function yt({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function bt(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}async function wt(t,e){const n=(await e.json()).error;return gt.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function _t({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function It(t,{refreshToken:e}){const n=_t(t);return n.append("Authorization",function(t){return`FIS_v2 ${t}`}
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
     */(e)),n}async function Et(t){const e=await t();return e.status>=500&&e.status<600?t():e}
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
function St(t){return new Promise((e=>{setTimeout(e,t)}))}
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
const Tt=/^[cdef][\w-]{21}$/;function Ct(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=function(t){return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var e}
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
     */(t);return Tt.test(e)?e:""}catch(t){return""}}function At(t){return`${t.appName}!${t.appId}`}
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
     */const Ot=new Map;function Nt(t,e){const n=At(t);kt(n,e),function(t,e){const n=function(){!Pt&&"BroadcastChannel"in self&&(Pt=new BroadcastChannel("[Firebase] FID Change"),Pt.onmessage=t=>{kt(t.data.key,t.data.fid)});return Pt}();n&&n.postMessage({key:t,fid:e});0===Ot.size&&Pt&&(Pt.close(),Pt=null)}(n,e)}function kt(t,e){const n=Ot.get(t);if(n)for(const t of n)t(e)}let Pt=null;
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
const Dt="firebase-installations-store";let Rt=null;function jt(){return Rt||(Rt=function(t,e,n){var r=Q(indexedDB,"open",[t,e]),i=r.request;return i&&(i.onupgradeneeded=function(t){n&&n(new ut(i.result,t.oldVersion,i.transaction))}),r.then((function(t){return new lt(t)}))}("firebase-installations-database",1,(t=>{switch(t.oldVersion){case 0:t.createObjectStore(Dt)}}))),Rt}async function Lt(t,e){const n=At(t),r=(await jt()).transaction(Dt,"readwrite"),i=r.objectStore(Dt),o=await i.get(n);return await i.put(e,n),await r.complete,o&&o.fid===e.fid||Nt(t,e.fid),e}async function Mt(t){const e=At(t),n=(await jt()).transaction(Dt,"readwrite");await n.objectStore(Dt).delete(e),await n.complete}async function Bt(t,e){const n=At(t),r=(await jt()).transaction(Dt,"readwrite"),i=r.objectStore(Dt),o=await i.get(n),a=e(o);return void 0===a?await i.delete(n):await i.put(a,n),await r.complete,!a||o&&o.fid===a.fid||Nt(t,a.fid),a}
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
     */async function Ft(t){let e;const n=await Bt(t,(n=>{const r=function(t){return $t(t||{fid:Ct(),registrationStatus:0})}(n),i=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine){return{installationEntry:e,registrationPromise:Promise.reject(gt.create("app-offline"))}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:async function(t,e){try{return Lt(t,await async function(t,{fid:e}){const n=yt(t),r=_t(t),i={fid:e,authVersion:ht,appId:t.appId,sdkVersion:dt},o={method:"POST",headers:r,body:JSON.stringify(i)},a=await Et((()=>fetch(n,o)));if(a.ok){const t=await a.json();return{fid:t.fid||e,registrationStatus:2,refreshToken:t.refreshToken,authToken:bt(t.authToken)}}throw await wt("Create Installation",a)}(t,e))}catch(n){throw vt(n)&&409===n.customData.serverCode?await Mt(t):await Lt(t,{fid:e.fid,registrationStatus:0}),n}}(t,n)}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:Ut(t)}:{installationEntry:e}}(t,r);return e=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}async function Ut(t){let e=await xt(t);for(;1===e.registrationStatus;)await St(100),e=await xt(t);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:n}=await Ft(t);return n||e}return e}function xt(t){return Bt(t,(t=>{if(!t)throw gt.create("installation-not-found");return $t(t)}))}function $t(t){return 1===(e=t).registrationStatus&&e.registrationTime+ft<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e;
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
     */}async function qt({appConfig:t,platformLoggerProvider:e},n){const r=function(t,{fid:e}){return`${yt(t)}/${e}/authTokens:generate`}
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
     */(t,n),i=It(t,n),o=e.getImmediate({optional:!0});o&&i.append("x-firebase-client",o.getPlatformInfoString());const a={installation:{sdkVersion:dt}},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await Et((()=>fetch(r,s)));if(c.ok){return bt(await c.json())}throw await wt("Generate Auth Token",c)}async function zt(t,e=!1){let n;const r=await Bt(t.appConfig,(r=>{if(!Ht(r))throw gt.create("not-registered");const i=r.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+mt}(t)}(i))return r;if(1===i.requestStatus)return n=async function(t,e){let n=await Vt(t.appConfig);for(;1===n.authToken.requestStatus;)await St(100),n=await Vt(t.appConfig);const r=n.authToken;return 0===r.requestStatus?zt(t,e):r}(t,e),r;{if(!navigator.onLine)throw gt.create("app-offline");const e=function(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}(r);return n=async function(t,e){try{const n=await qt(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Lt(t.appConfig,r),n}catch(n){if(!vt(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Lt(t.appConfig,n)}else await Mt(t.appConfig);throw n}}(t,e),e}}));return n?await n:r.authToken}function Vt(t){return Bt(t,(t=>{if(!Ht(t))throw gt.create("not-registered");const e=t.authToken;return 1===(n=e).requestStatus&&n.requestTime+ft<Date.now()?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t;var n;
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
     */}))}function Ht(t){return void 0!==t&&2===t.registrationStatus}
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
async function Kt(t,e=!1){const n=t;await async function(t){const{registrationPromise:e}=await Ft(t);e&&await e}
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
     */(n.appConfig);return(await zt(n,e)).token}function Wt(t){return gt.create("missing-app-config-values",{valueName:t})}
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
     */const Gt="installations",Jt=t=>{const e=M(t.getProvider("app").getImmediate(),Gt).getImmediate();return{getId:()=>async function(t){const e=t,{installationEntry:n,registrationPromise:r}=await Ft(e.appConfig);return r?r.catch(console.error):zt(e).catch(console.error),n.fid}(e),getToken:t=>Kt(e,t)}};L(new m(Gt,(t=>{const e=t.getProvider("app").getImmediate();return{app:e,appConfig:function(t){if(!t||!t.options)throw Wt("App Configuration");if(!t.name)throw Wt("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Wt(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e),platformLoggerProvider:M(e,"platform-logger"),_delete:()=>Promise.resolve()}}),"PUBLIC")),L(new m("installations-internal",Jt,"PRIVATE")),q("@firebase/installations",pt);const Yt="0.5.0",Xt=Yt,Zt="FB-PERF-TRACE-MEASURE",Qt="_wt_",te="_fcp",ee="_fid",ne="@firebase/performance/config",re="@firebase/performance/configexpire",ie="Performance",oe=new u("performance",ie,{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),ae=new C(ie);
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
let se,ce,ue,le;ae.logLevel=b.INFO;class pe{constructor(t){if(this.window=t,!t)throw oe.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(t){this.performance&&this.performance.mark&&this.performance.mark(t)}measure(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)}getEntriesByType(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]}getEntriesByName(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled?"indexedDB"in self&&null!=indexedDB||(ae.info("IndexedDB is not supported by current browswer"),!1):(ae.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(t,e){if(!this.PerformanceObserver)return;new this.PerformanceObserver((t=>{for(const n of t.getEntries())e(n)})).observe({entryTypes:[t]})}static getInstance(){return void 0===se&&(se=new pe(ce)),se}}function fe(){return ue}
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
function de(t,e){const n=t.length-e.length;if(n<0||n>1)throw oe.create("invalid String merger input");const r=[];for(let n=0;n<t.length;n++)r.push(t.charAt(n)),e.length>n&&r.push(e.charAt(n));return r.join("")}
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
     */class he{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=de("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=de("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===le&&(le=new he),le}}
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
     */var me;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"}(me||(me={}));const ge=["firebase_","google_","ga_"],ve=new RegExp("^[a-zA-Z]\\w*$");function ye(){const t=pe.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function be(){switch(pe.getInstance().document.visibilityState){case"visible":return me.VISIBLE;case"hidden":return me.HIDDEN;default:return me.UNKNOWN}}function we(){const t=pe.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
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
function _e(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.appId;if(!n)throw oe.create("no app id");return n}
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
const Ie="0.0.1",Ee=!0,Se="FIREBASE_INSTALLATIONS_AUTH";function Te(t,e){const n=function(){const t=pe.getInstance().localStorage;if(!t)return;const e=t.getItem(re);if(!(e&&(n=e,Number(n)>Date.now())))return;var n;const r=t.getItem(ne);if(!r)return;try{return JSON.parse(r)}catch(t){return}}();return n?(Ae(n),Promise.resolve()):function(t,e){return function(t){const e=t.getToken();return e.then((t=>{})),e}(t.installations).then((n=>{const r=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.projectId;if(!n)throw oe.create("no project id");return n}(t.app),i=function(t){var e;const n=null===(e=t.options)||void 0===e?void 0:e.apiKey;if(!n)throw oe.create("no api key");return n}(t.app),o=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,{method:"POST",headers:{Authorization:`${Se} ${n}`},body:JSON.stringify({app_instance_id:e,app_instance_id_token:n,app_id:_e(t.app),app_version:Xt,sdk_version:Ie})});return fetch(o).then((t=>{if(t.ok)return t.json();throw oe.create("RC response not ok")}))})).catch((()=>{ae.info(Ce)}))}(t,e).then(Ae).then((t=>function(t){const e=pe.getInstance().localStorage;if(!t||!e)return;e.setItem(ne,JSON.stringify(t)),e.setItem(re,String(Date.now()+60*he.getInstance().configTimeToLive*60*1e3))}(t)),(()=>{}))}const Ce="Could not fetch config, will use default configs";function Ae(t){if(!t)return t;const e=he.getInstance(),n=t.entries||{};return void 0!==n.fpr_enabled?e.loggingEnabled="true"===String(n.fpr_enabled):e.loggingEnabled=Ee,n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(e.transportKey=n.fpr_log_transport_key),void 0!==n.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=Oe(e.tracesSamplingRate),e.logNetworkAfterSampling=Oe(e.networkRequestsSamplingRate),t}function Oe(t){return Math.random()<=t}
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
     */let Ne,ke=1;function Pe(t){return ke=2,Ne=Ne||function(t){return function(){const t=pe.getInstance().document;return new Promise((e=>{if(t&&"complete"!==t.readyState){const n=()=>{"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))}().then((()=>function(t){const e=t.getId();return e.then((t=>{ue=t})),e}(t.installations))).then((e=>Te(t,e))).then((()=>De()),(()=>De()))}(t),Ne}function De(){ke=3}
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
     */const Re=1e4;let je,Le=3,Me=[],Be=!1;function Fe(t){setTimeout((()=>{if(0!==Le)return Me.length?void function(){const t=Me.splice(0,1e3),e=t.map((t=>({source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)})));(function(t,e){return function(t){const e=he.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(t).then((t=>(t.ok||ae.info("Call to Firebase backend failed."),t.json()))).then((t=>{const n=Number(t.nextRequestWaitMillis);let r=Re;isNaN(n)||(r=Math.max(n,r));const i=t.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&(Me=[...e,...Me],ae.info("Retry transport request later.")),Le=3,Fe(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:he.getInstance().logSource,log_event:e},t).catch((()=>{Me=[...t,...Me],Le--,ae.info(`Tries left: ${Le}.`),Fe(Re)}))}():Fe(Re)}),t)}function Ue(t){return(...e)=>{!function(t){if(!t.eventTime||!t.message)throw oe.create("invalid cc log");Me=[...Me,t]}({message:t(...e),eventTime:Date.now()})}}
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
     */function xe(t,e){je||(je=Ue(ze)),je(t,e)}function $e(t){const e=he.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&pe.getInstance().requiredApisAvailable()&&(t.isAuto&&be()!==me.VISIBLE||(3===ke?qe(t):Pe(t.performanceController).then((()=>qe(t)),(()=>qe(t)))))}function qe(t){if(!fe())return;const e=he.getInstance();e.loggingEnabled&&e.logTraceAfterSampling&&setTimeout((()=>xe(t,1)),0)}function ze(t,e){return 0===e?function(t){const e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:Ve(t.performanceController.app),network_request_metric:e};return JSON.stringify(n)}(t):function(t){const e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);const n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);const r={application_info:Ve(t.performanceController.app),trace_metric:e};return JSON.stringify(r)}(t)}function Ve(t){return{google_app_id:_e(t),app_instance_id:fe(),web_app_info:{sdk_version:Xt,page_url:pe.getInstance().getUrl(),service_worker_status:ye(),visibility_state:be(),effective_connection_type:we()},application_process_state:0}}
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
     */const He=["_fp",te,ee];
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
class Ke{constructor(t,e,n=!1,r){this.performanceController=t,this.name=e,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=pe.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw oe.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw oe.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),$e(this)}record(t,e,n){if(t<=0)throw oe.create("nonpositive trace startTime",{traceName:this.name});if(e<=0)throw oe.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const t of Object.keys(n.metrics))isNaN(Number(n.metrics[t]))||(this.counters[t]=Number(Math.floor(n.metrics[t])));$e(this)}incrementMetric(t,e=1){void 0===this.counters[t]?this.putMetric(t,e):this.putMetric(t,this.counters[t]+e)}putMetric(t,e){if(!function(t,e){return!(0===t.length||t.length>100)&&(e&&e.startsWith(Qt)&&He.indexOf(t)>-1||!t.startsWith("_"))}(t,this.name))throw oe.create("invalid custom metric name",{customMetricName:t});this.counters[t]=function(t){const e=Math.floor(t);return e<t&&ae.info(`Metric value should be an Integer, setting the value as : ${e}.`),e}(e)}getMetric(t){return this.counters[t]||0}putAttribute(t,e){const n=function(t){return!(0===t.length||t.length>40)&&(!ge.some((e=>t.startsWith(e)))&&!!t.match(ve))}(t),r=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&r)this.customAttributes[t]=e;else{if(!n)throw oe.create("invalid attribute name",{attributeName:t});if(!r)throw oe.create("invalid attribute value",{attributeValue:e})}}getAttribute(t){return this.customAttributes[t]}removeAttribute(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(t){this.startTimeUs=t}setDuration(t){this.durationUs=t}calculateTraceMetrics(){const t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(t,e,n,r){const i=pe.getInstance().getUrl();if(!i)return;const o=new Ke(t,Qt+i,!0),a=Math.floor(1e3*pe.getInstance().getTimeOrigin());o.setStartTime(a),e&&e[0]&&(o.setDuration(Math.floor(1e3*e[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd)));if(n){const t=n.find((t=>"first-paint"===t.name));t&&t.startTime&&o.putMetric("_fp",Math.floor(1e3*t.startTime));const e=n.find((t=>"first-contentful-paint"===t.name));e&&e.startTime&&o.putMetric(te,Math.floor(1e3*e.startTime)),r&&o.putMetric(ee,Math.floor(1e3*r))}$e(o)}static createUserTimingTrace(t,e){$e(new Ke(t,e,!1,e))}}
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
     */function We(t,e){const n=e;if(!n||void 0===n.responseStart)return;const r=pe.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),o=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,a=Math.floor(1e3*(n.responseEnd-n.startTime));!function(t){const e=he.getInstance();if(!e.instrumentationEnabled)return;const n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((()=>xe(t,0)),0)}({performanceController:t,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:a})}
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
     */function Ge(t){fe()&&(setTimeout((()=>function(t){const e=pe.getInstance(),n=e.getEntriesByType("navigation"),r=e.getEntriesByType("paint");if(e.onFirstInputDelay){let i=setTimeout((()=>{Ke.createOobTrace(t,n,r),i=void 0}),5e3);e.onFirstInputDelay((e=>{i&&(clearTimeout(i),Ke.createOobTrace(t,n,r,e))}))}else Ke.createOobTrace(t,n,r)}(t)),0),setTimeout((()=>function(t){const e=pe.getInstance(),n=e.getEntriesByType("resource");for(const e of n)We(t,e);e.setupObserver("resource",(e=>We(t,e)))}(t)),0),setTimeout((()=>function(t){const e=pe.getInstance(),n=e.getEntriesByType("measure");for(const e of n)Je(t,e);e.setupObserver("measure",(e=>Je(t,e)))}(t)),0))}function Je(t,e){const n=e.name;n.substring(0,Zt.length)!==Zt&&Ke.createUserTimingTrace(t,n)}
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
     */class Ye{constructor(t,e){this.app=t,this.installations=e,this.initialized=!1}_init(t){this.initialized||(void 0!==(null==t?void 0:t.dataCollectionEnabled)&&(this.dataCollectionEnabled=t.dataCollectionEnabled),void 0!==(null==t?void 0:t.instrumentationEnabled)&&(this.instrumentationEnabled=t.instrumentationEnabled),pe.getInstance().requiredApisAvailable()?new Promise((function(t,e){try{var n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=function(){i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=function(){n=!1},i.onerror=function(){var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((t=>{t&&(Be||(Fe(5500),Be=!0),Pe(this).then((()=>Ge(this)),(()=>Ge(this))),this.initialized=!0)})).catch((t=>{ae.info(`Environment doesn't support IndexedDB: ${t}`)})):ae.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(t){he.getInstance().instrumentationEnabled=t}get instrumentationEnabled(){return he.getInstance().instrumentationEnabled}set dataCollectionEnabled(t){he.getInstance().dataCollectionEnabled=t}get dataCollectionEnabled(){return he.getInstance().dataCollectionEnabled}}L(new m("performance",((t,{options:e})=>{const n=t.getProvider("app").getImmediate(),r=t.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw oe.create("FB not default");if("undefined"==typeof window)throw oe.create("no window");!function(t){ce=t}
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
     */(window);const i=new Ye(n,r);return i._init(e),i}),"PUBLIC")),q("@firebase/performance",Yt);
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
class Xe{constructor(t,e){this.app=t,this._delegate=e}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(t){this._delegate.instrumentationEnabled=t}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(t){this._delegate.dataCollectionEnabled=t}trace(t){return function(t,e){var n;return t=(n=t)&&n._delegate?n._delegate:n,new Ke(t,e)}(this._delegate,t)}}function Ze(t){const e=t.getProvider("app-compat").getImmediate(),n=t.getProvider("performance").getImmediate();return new Xe(e,n)}
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
var Qe;(Qe=Y).INTERNAL.registerComponent(new m("performance-compat",Ze,"PUBLIC")),Qe.registerVersion("@firebase/performance-compat","0.1.0");
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
return Y.registerVersion("firebase","9.0.1","compat-lite"),Y}));
//# sourceMappingURL=firebase-performance-standalone-compat.es2017.js.map
