!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).firebase=t()}(this,(function(){"use strict";
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
    ***************************************************************************** */var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(t,n)};var t=function(){return(t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function n(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))}function r(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}function i(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function o(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function a(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}function s(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var n in t)t.hasOwnProperty(n)&&"__proto__"!==n&&(e[n]=s(e[n],t[n]));return e}
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
var c=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))}return e.prototype.wrapCallback=function(e){var t=this;return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch((function(){})),1===e.length?e(n):e(n,r))}},e}();
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
var l=function(t){function n(e,r,i){var o=t.call(this,r)||this;return o.code=e,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,p.prototype.create),o}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}(n,t),n}(Error),p=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?u(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").",c=new l(i,s,r);return c},e}();function u(e,t){return e.replace(f,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var f=/\{\$([^}]+)}/g;
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
     */function h(e,t){var n=new d(e,t);return n.subscribe.bind(n)}var d=function(){function e(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(n)})).catch((function(e){n.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,n){var r,i=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i in e&&"function"==typeof e[i])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=v),void 0===r.error&&(r.error=v),void 0===r.complete&&(r.complete=v);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}})),this.observers.push(r),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}();function v(){}var m=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),y="[DEFAULT]",b=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}return e.prototype.get=function(e){void 0===e&&(e=y);var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new c;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:t});r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var n=t({identifier:y,optional:!1},e),r=n.identifier,i=n.optional,o=this.normalizeInstanceIdentifier(r);if(!this.isInitialized(o)&&!this.shouldAutoInitialize()){if(i)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:o})}catch(e){if(i)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
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
     */(e))try{this.getOrInitializeService({instanceIdentifier:y})}catch(e){}try{for(var r=i(this.instancesDeferred.entries()),a=r.next();!a.done;a=r.next()){var s=o(a.value,2),c=s[0],l=s[1],p=this.normalizeInstanceIdentifier(c);try{var u=this.getOrInitializeService({instanceIdentifier:p});l.resolve(u)}catch(e){}}}catch(e){t={error:e}}finally{try{a&&!a.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e=y),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return n(this,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(a(a([],o(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))),o(e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()})))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e=y),this.instances.has(e)},e.prototype.initialize=function(e){var t,n;void 0===e&&(e={});var r=e.instanceIdentifier,a=void 0===r?y:r,s=e.options,c=void 0===s?{}:s,l=this.normalizeInstanceIdentifier(a);if(this.isInitialized(l))throw Error(this.name+"("+l+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var p=this.getOrInitializeService({instanceIdentifier:l,options:c});try{for(var u=i(this.instancesDeferred.entries()),f=u.next();!f.done;f=u.next()){var h=o(f.value,2),d=h[0],v=h[1];l===this.normalizeInstanceIdentifier(d)&&v.resolve(p)}}catch(e){t={error:e}}finally{try{f&&!f.done&&(n=u.return)&&n.call(u)}finally{if(t)throw t.error}}return p},e.prototype.getOrInitializeService=function(e){var t,n=e.instanceIdentifier,r=e.options,i=void 0===r?{}:r,o=this.instances.get(n);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:(t=n,t===y?void 0:t),options:i}),this.instances.set(n,o),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,o)}catch(e){}return o||null},e.prototype.normalizeInstanceIdentifier=function(e){return this.component?this.component.multipleInstances?e:y:e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}();
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
     */var g,w,_=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new b(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}(),E=[];
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
     */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(w||(w={}));var I={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},O=w.INFO,N=((g={})[w.DEBUG]="log",g[w.VERBOSE]="log",g[w.INFO]="info",g[w.WARN]="warn",g[w.ERROR]="error",g),C=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=N[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,a(["["+i+"]  "+e.name+":"],n))}},L=function(){function e(e){this.name=e,this._logLevel=O,this._logHandler=C,this._userLogHandler=null,E.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in w))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?I[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,w.DEBUG],e)),this._logHandler.apply(this,a([this,w.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,w.VERBOSE],e)),this._logHandler.apply(this,a([this,w.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,w.INFO],e)),this._logHandler.apply(this,a([this,w.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,w.WARN],e)),this._logHandler.apply(this,a([this,w.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,w.ERROR],e)),this._logHandler.apply(this,a([this,w.ERROR],e))},e}();
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
var S=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){return this.container.getProviders().map((function(e){if(function(e){var t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){var t=e.getImmediate();return t.library+"/"+t.version}return null})).filter((function(e){return e})).join(" ")},e}();var A,P,D="@firebase/app-exp",R=new L("@firebase/app"),x="[DEFAULT]",j=((A={})[D]="fire-core",A["@firebase/app-compat"]="fire-core-compat",A["@firebase/analytics-exp"]="fire-analytics",A["@firebase/analytics-compat"]="fire-analytics-compat",A["@firebase/auth-exp"]="fire-auth",A["@firebase/auth-compat"]="fire-auth-compat",A["@firebase/database-exp"]="fire-rtdb",A["@firebase/functions-exp"]="fire-fn",A["@firebase/functions-compat"]="fire-fn-compat",A["@firebase/installations-exp"]="fire-iid",A["@firebase/installations-compat"]="fire-iid-compat",A["@firebase/messaging-exp"]="fire-fcm",A["@firebase/messaging-compat"]="fire-fcm-compat",A["@firebase/performance-exp"]="fire-perf",A["@firebase/performance-compat"]="fire-perf-compat",A["@firebase/remote-config-exp"]="fire-rc",A["@firebase/remote-config-compat"]="fire-rc-compat",A["@firebase/storage"]="fire-gcs",A["@firebase/storage-compat"]="fire-gcs-compat",A["@firebase/firestore-exp"]="fire-fst",A["@firebase/firestore-compat"]="fire-fst-compat",A["fire-js"]="fire-js",A["firebase-exp"]="fire-js-all",A),F=new Map,z=new Map;function T(e,t){try{e.container.addComponent(t)}catch(n){R.debug("Component "+t.name+" failed to register with FirebaseApp "+e.name,n)}}function k(e,t){e.container.addOrOverwriteComponent(t)}function H(e){var t,n,r=e.name;if(z.has(r))return R.debug("There were multiple attempts to register component "+r+"."),!1;z.set(r,e);try{for(var o=i(F.values()),a=o.next();!a.done;a=o.next()){T(a.value,e)}}catch(e){t={error:e}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}return!0}function B(e,t){return e.container.getProvider(t)}var V,M=((P={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",P["bad-app-name"]="Illegal App name: '{$appName}",P["duplicate-app"]="Firebase App named '{$appName}' already exists",P["app-deleted"]="Firebase App named '{$appName}' already deleted",P["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",P["invalid-log-argument"]="First argument to `onLog` must be null or a function.",P),U=new p("app","Firebase",M),G=function(){function e(e,n,r){var i=this;this._isDeleted=!1,this._options=t({},e),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new m("app-exp",(function(){return i}),"PUBLIC"))}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed(),this._automaticDataCollectionEnabled},set:function(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed(),this._name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed(),this._options},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"container",{get:function(){return this._container},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isDeleted",{get:function(){return this._isDeleted},set:function(e){this._isDeleted=e},enumerable:!1,configurable:!0}),e.prototype.checkDestroyed=function(){if(this.isDeleted)throw U.create("app-deleted",{appName:this._name})},e}(),W="0.900.21";function $(e,n){var r,o;(void 0===n&&(n={}),"object"!=typeof n)&&(n={name:n});var a=t({name:x,automaticDataCollectionEnabled:!1},n),s=a.name;if("string"!=typeof s||!s)throw U.create("bad-app-name",{appName:String(s)});if(F.has(s))throw U.create("duplicate-app",{appName:s});var c=new _(s);try{for(var l=i(z.values()),p=l.next();!p.done;p=l.next()){var u=p.value;c.addComponent(u)}}catch(e){r={error:e}}finally{try{p&&!p.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}var f=new G(e,a,c);return F.set(s,f),f}function Y(e){return n(this,void 0,void 0,(function(){var t;return r(this,(function(n){switch(n.label){case 0:return t=e.name,F.has(t)?(F.delete(t),[4,Promise.all(e.container.getProviders().map((function(e){return e.delete()})))]):[3,2];case 1:n.sent(),e.isDeleted=!0,n.label=2;case 2:return[2]}}))}))}function K(e,t,n){var r,i=null!==(r=j[e])&&void 0!==r?r:e;n&&(i+="-"+n);var o=i.match(/\s|\//),a=t.match(/\s|\//);if(o||a){var s=['Unable to register library "'+i+'" with version "'+t+'":'];return o&&s.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),o&&a&&s.push("and"),a&&s.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void R.warn(s.join(" "))}H(new m(i+"-version",(function(){return{library:i,version:t}}),"VERSION"))}function J(e,t){if(null!==e&&"function"!=typeof e)throw U.create("invalid-log-argument");!function(e,t){for(var n=function(n){var r=null;t&&t.level&&(r=I[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],o=2;o<arguments.length;o++)i[o-2]=arguments[o];var a=i.map((function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}})).filter((function(e){return e})).join(" ");n>=(null!=r?r:t.logLevel)&&e({level:w[n].toLowerCase(),message:a,args:i,type:t.name})}},r=0,i=E;r<i.length;r++)n(i[r])}(e,t)}function X(e){var t;t=e,E.forEach((function(e){e.setLogLevel(t)}))}
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
     */H(new m("platform-logger",(function(e){return new S(e)}),"PRIVATE")),K(D,"0.0.900-exp.8294e6082",V),K("fire-js","");var Z,q=Object.freeze({__proto__:null,SDK_VERSION:W,_DEFAULT_ENTRY_NAME:x,_addComponent:T,_addOrOverwriteComponent:k,_apps:F,_clearComponents:function(){z.clear()}
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
     */,_components:z,_getProvider:B,_registerComponent:H,_removeServiceInstance:function(e,t,n){void 0===n&&(n=x),B(e,t).clearInstance(n)},deleteApp:Y,getApp:function(e){void 0===e&&(e=x);var t=F.get(e);if(!t)throw U.create("no-app",{appName:e});return t},getApps:function(){return Array.from(F.values())},initializeApp:$,onLog:J,registerVersion:K,setLogLevel:X}),Q=function(){function e(e,t){var n=this;this._delegate=e,this.firebase=t,T(e,new m("app-compat",(function(){return n}),"PUBLIC")),this.container=e.container}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this._delegate.automaticDataCollectionEnabled},set:function(e){this._delegate.automaticDataCollectionEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this._delegate.options},enumerable:!1,configurable:!0}),e.prototype.delete=function(){var e=this;return new Promise((function(t){e._delegate.checkDestroyed(),t()})).then((function(){return e.firebase.INTERNAL.removeApp(e.name),Y(e._delegate)}))},e.prototype._getService=function(e,t){return void 0===t&&(t=x),this._delegate.checkDestroyed(),this._delegate.container.getProvider(e).getImmediate({identifier:t})},e.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=x),this._delegate.container.getProvider(e).clearInstance(t)},e.prototype._addComponent=function(e){T(this._delegate,e)},e.prototype._addOrOverwriteComponent=function(e){k(this._delegate,e)},e.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},e}(),ee=((Z={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",Z["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",Z),te=new p("app-compat","Firebase",ee);
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
function ne(e){var t={},n={__esModule:!0,initializeApp:function(r,i){void 0===i&&(i={});var o=$(r,i),a=new e(o,n);return t[o.name]=a,a},app:r,registerVersion:K,setLogLevel:X,onLog:J,apps:null,SDK_VERSION:W,INTERNAL:{registerComponent:function(t){var i=t.name,o=i.replace("-compat","");if(H(t)&&"PUBLIC"===t.type){var a=function(e){if(void 0===e&&(e=r()),"function"!=typeof e[o])throw te.create("invalid-app-argument",{appName:i});return e[o]()};void 0!==t.serviceProps&&s(a,t.serviceProps),n[o]=a,e.prototype[o]=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=this._getService.bind(this,i);return r.apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[o]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){if("serverAuth"===t)return null;return t},modularAPIs:q}};function r(e){if(n=t,r=e=e||x,!Object.prototype.hasOwnProperty.call(n,r))throw te.create("no-app",{appName:e});var n,r;return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map((function(e){return t[e]}))}}),r.App=e,n}
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
     */var re=function e(){var n=ne(Q);return n.INTERNAL=t(t({},n.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){s(n,e)},createSubscribe:h,ErrorFactory:p,deepExtend:s}),n}(),ie=new L("@firebase/app-compat");
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
if("object"==typeof self&&self.self===self&&void 0!==self.firebase){ie.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var oe=self.firebase.SDK_VERSION;oe&&oe.indexOf("LITE")>=0&&ie.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var ae=re;!
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
function(e){K("@firebase/app-compat","0.0.900-exp.8294e6082",e)}();
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
return ae.registerVersion("firebase-exp","0.900.21","app-compat-cdn"),ae}));
//# sourceMappingURL=firebase-app-compat.js.map
