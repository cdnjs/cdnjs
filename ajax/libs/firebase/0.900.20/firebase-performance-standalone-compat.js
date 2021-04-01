!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@firebase/app"),require("@firebase/performance")):"function"==typeof define&&define.amd?define(["@firebase/app","@firebase/performance"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).firebase=t(e.modularAPIs,e.performance)}(this,(function(e,t){"use strict";function r(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var n=r(e),o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};
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
    ***************************************************************************** */function i(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=i(e[r],t[r]));return e}
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
var a=function(e){function t(r,n,o){var i=e.call(this,n)||this;return i.code=r,i.customData=o,i.name="FirebaseError",Object.setPrototypeOf(i,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,p.prototype.create),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),t}(Error),p=function(){function e(e,t,r){this.service=e,this.serviceName=t,this.errors=r}return e.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t[0]||{},o=this.service+"/"+e,i=this.errors[e],p=i?c(i,n):"Error",s=this.serviceName+": "+p+" ("+o+").",u=new a(o,s,n);return u},e}();function c(e,t){return e.replace(s,(function(e,r){var n=t[r];return null!=n?String(n):"<"+r+"?>"}))}var s=/\{\$([^}]+)}/g;
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
     */var u,f=function(){function e(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}(),l=function(){function t(t,r){var n=this;this._delegate=t,this.firebase=r,e._addComponent(t,new f("app-compat",(function(){return n}),"PUBLIC"))}return Object.defineProperty(t.prototype,"automaticDataCollectionEnabled",{get:function(){return this._delegate.automaticDataCollectionEnabled},set:function(e){this.automaticDataCollectionEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"options",{get:function(){return this._delegate.options},enumerable:!1,configurable:!0}),t.prototype.delete=function(){return this.firebase.INTERNAL.removeApp(this.name),e.deleteApp(this._delegate)},t.prototype._getService=function(t,r){return void 0===r&&(r=e._DEFAULT_ENTRY_NAME),this._delegate.checkDestroyed(),this._delegate.container.getProvider(t).getImmediate({identifier:r})},t}(),d=((u={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",u["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",u),m=new p("app-compat","Firebase",d);
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
function b(t){var r={},o={__esModule:!0,initializeApp:function(n,i){void 0===i&&(i={});var a=e.initializeApp(n,i),p=new t(a,o);return r[a.name]=p,p},app:a,registerVersion:e.registerVersion,setLogLevel:e.setLogLevel,onLog:e.onLog,apps:null,SDK_VERSION:e.SDK_VERSION,INTERNAL:{registerComponent:function(r){var n=r.name,p=n.replace("-compat","");if(e._registerComponent(r)&&"PUBLIC"===r.type){var c=function(e){if(void 0===e&&(e=a()),"function"!=typeof e[p])throw m.create("invalid-app-argument",{appName:n});return e[p]()};void 0!==r.serviceProps&&i(c,r.serviceProps),o[p]=c,t.prototype[p]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o=this._getService.bind(this,n);return o.apply(this,r.multipleInstances?e:[])}}return"PUBLIC"===r.type?o[p]:null},removeApp:function(e){delete r[e]},useAsService:function(e,t){if("serverAuth"===t)return null;return t},modularAPIs:n}};function a(t){if(t=t||e._DEFAULT_ENTRY_NAME,n=r,o=t,!Object.prototype.hasOwnProperty.call(n,o))throw m.create("no-app",{appName:t});var n,o;return r[t]}return o.default=o,Object.defineProperty(o,"apps",{get:function(){return Object.keys(r).map((function(e){return r[e]}))}}),a.App=t,o}
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
var h,g=function(){var e=b(l);e.SDK_VERSION=e.SDK_VERSION+"_LITE";var t=e.INTERNAL.registerComponent;return e.INTERNAL.registerComponent=function(e){if("PUBLIC"===e.type&&"performance"!==e.name&&"installations"!==e.name)throw Error(name+" cannot register with the standalone perf instance");return t(e)},e}();h="lite",e.registerVersion("@firebase/app-compat","0.0.900",h);
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
g.registerVersion("firebase-exp","0.900.19","app-compat");
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
var v,y=function(){function e(e,t){this.app=e,this._delegate=t}return Object.defineProperty(e.prototype,"instrumentationEnabled",{get:function(){return this._delegate.instrumentationEnabled},set:function(e){this._delegate.instrumentationEnabled=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dataCollectionEnabled",{get:function(){return this._delegate.dataCollectionEnabled},set:function(e){this._delegate.dataCollectionEnabled=e},enumerable:!1,configurable:!0}),e.prototype.trace=function(e){return t.trace(this._delegate,e)},e}();function _(e){var t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("performance-exp").getImmediate();return new y(t,r)}(v=g).INTERNAL.registerComponent(new f("performance-compat",_,"PUBLIC")),v.registerVersion("@firebase/performance-compat","0.0.900");
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
return g.registerVersion("firebase-exp","0.900.19","compat-lite"),g}));
//# sourceMappingURL=firebase-performance-standalone-compat.js.map
