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
    ***************************************************************************** */function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}function s(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{a(r.next(t))}catch(t){o(t)}}function u(t){try{a(r.throw(t))}catch(t){o(t)}}function a(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}a((r=r.apply(t,e||[])).next())}))}function u(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}
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
     */var a=function(t){function e(n,r,i){var o=t.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,c.prototype.create),o}return o(e,t),e}(Error),c=function(){function t(t,e,n){this.service=t,this.serviceName=e,this.errors=n}return t.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e[0]||{},i=this.service+"/"+t,o=this.errors[t],s=o?f(o,r):"Error",u=this.serviceName+": "+s+" ("+i+").",c=new a(i,u,r);return c},t}();function f(t,e){return t.replace(l,(function(t,n){var r=e[n];return null!=r?String(r):"<"+n+"?>"}))}var l=/\{\$([^}]+)}/g,p=function(){function t(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return t.prototype.setInstantiationMode=function(t){return this.instantiationMode=t,this},t.prototype.setMultipleInstances=function(t){return this.multipleInstances=t,this},t.prototype.setServiceProps=function(t){return this.serviceProps=t,this},t}();function h(t,e){var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function d(t){if(null==t)return null;if(t instanceof Number&&(t=t.valueOf()),"number"==typeof t&&isFinite(t))return t;if(!0===t||!1===t)return t;if("[object String]"===Object.prototype.toString.call(t))return t;if(Array.isArray(t))return t.map((function(t){return d(t)}));if("function"==typeof t||"object"==typeof t)return h(t,(function(t){return d(t)}));throw new Error("Data cannot be encoded in JSON: "+t)}function m(t){if(null==t)return t;if(t["@type"])switch(t["@type"]){case"type.googleapis.com/google.protobuf.Int64Value":case"type.googleapis.com/google.protobuf.UInt64Value":var e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e;default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map((function(t){return m(t)})):"function"==typeof t||"object"==typeof t?h(t,(function(t){return m(t)})):t}
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
     */var g="functions-exp",v={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},y=function(t){function e(e,n,r){var i=t.call(this,"functions-exp/"+e,n||"")||this;return i.details=r,i}return o(e,t),e}(a);
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
     */var b=function(){function t(t,e){var n=this;this.auth=null,this.messaging=null,this.auth=t.getImmediate({optional:!0}),this.messaging=e.getImmediate({optional:!0}),this.auth||t.get().then((function(t){return n.auth=t}),(function(){})),this.messaging||e.get().then((function(t){return n.messaging=t}),(function(){}))}return t.prototype.getAuthToken=function(){return s(this,void 0,void 0,(function(){var t;return u(this,(function(e){switch(e.label){case 0:if(!this.auth)return[2,void 0];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,this.auth.getToken()];case 2:return[2,null==(t=e.sent())?void 0:t.accessToken];case 3:return e.sent(),[2,void 0];case 4:return[2]}}))}))},t.prototype.getMessagingToken=function(){return s(this,void 0,void 0,(function(){return u(this,(function(t){if(!this.messaging||!("Notification"in self)||"granted"!==Notification.permission)return[2,void 0];try{return[2,this.messaging.getToken()]}catch(t){return[2,void 0]}return[2]}))}))},t.prototype.getContext=function(){return s(this,void 0,void 0,(function(){var t,e;return u(this,(function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return t=n.sent(),[4,this.getMessagingToken()];case 2:return e=n.sent(),[2,{authToken:t,messagingToken:e}]}}))}))},t}(),w="us-central1";
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
     */function E(t){return new Promise((function(e,n){setTimeout((function(){n(new y("deadline-exceeded","deadline-exceeded"))}),t)}))}var I=function(){function t(t,e,n,r,i){var o=this;void 0===r&&(r=w),this.app=t,this.fetchImpl=i,this.emulatorOrigin=null,this.contextProvider=new b(e,n),this.cancelAllRequests=new Promise((function(t){o.deleteService=function(){return Promise.resolve(t())}}));try{var s=new URL(r);this.customDomain=s.origin,this.region=w}catch(t){this.customDomain=null,this.region=r}}return t.prototype._delete=function(){return this.deleteService()},t.prototype._url=function(t){var e=this.app.options.projectId;return null!==this.emulatorOrigin?this.emulatorOrigin+"/"+e+"/"+this.region+"/"+t:null!==this.customDomain?this.customDomain+"/"+t:"https://"+this.region+"-"+e+".cloudfunctions.net/"+t},t}();function N(t,e,n){return function(r){return function(t,e,n,r){return s(this,void 0,void 0,(function(){var i,o,s,a,c,f,l,p;return u(this,(function(u){switch(u.label){case 0:return i=t._url(e),n=d(n),o={data:n},s={},[4,t.contextProvider.getContext()];case 1:return(a=u.sent()).authToken&&(s.Authorization="Bearer "+a.authToken),a.messagingToken&&(s["Firebase-Instance-ID-Token"]=a.messagingToken),c=r.timeout||7e4,[4,Promise.race([T(i,o,s,t.fetchImpl),E(c),t.cancelAllRequests])];case 2:if(!(f=u.sent()))throw new y("cancelled","Firebase Functions instance was deleted.");if(l=function(t,e){var n=function(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}(t),r=n,i=void 0;try{var o=e&&e.error;if(o){var s=o.status;if("string"==typeof s){if(!v[s])return new y("internal","internal");n=v[s],r=s}var u=o.message;"string"==typeof u&&(r=u),void 0!==(i=o.details)&&(i=m(i))}}catch(t){}return"ok"===n?null:new y(n,r,i)}(f.status,f.json))throw l;if(!f.json)throw new y("internal","Response is not valid JSON object.");if(void 0===(p=f.json.data)&&(p=f.json.result),void 0===p)throw new y("internal","Response is missing data field.");return[2,{data:m(p)}]}}))}))}
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
     */(t,e,r,n||{})}}function T(t,e,n,r){return s(this,void 0,void 0,(function(){var i,o;return u(this,(function(s){switch(s.label){case 0:n["Content-Type"]="application/json",s.label=1;case 1:return s.trys.push([1,3,,4]),[4,r(t,{method:"POST",body:JSON.stringify(e),headers:n})];case 2:return i=s.sent(),[3,4];case 3:return s.sent(),[2,{status:0,json:null}];case 4:o=null,s.label=5;case 5:return s.trys.push([5,7,,8]),[4,i.json()];case 6:return o=s.sent(),[3,8];case 7:return s.sent(),[3,8];case 8:return[2,{status:i.status,json:o}]}}))}))}var A;function O(t,e,n){!function(t,e,n){t.emulatorOrigin="http://"+e+":"+n}(t,e,n)}
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
A=fetch.bind(self),e._registerComponent(new p(g,(function(t,e){var n=e.instanceIdentifier,r=t.getProvider("app-exp").getImmediate(),i=t.getProvider("auth-internal"),o=t.getProvider("messaging");return new I(r,i,o,n,A)}),"PUBLIC").setMultipleInstances(!0)),e.registerVersion("@firebase/functions-exp","0.0.900");var _,D=function(){function t(t,e){this.app=t,this._functionsInstance=e,this._region=this._functionsInstance.region,this._customDomain=this._functionsInstance.customDomain}return t.prototype.httpsCallable=function(t,e){return function(t,e,n){return N(t,e,n)}(this._functionsInstance,t,e)},t.prototype.useFunctionsEmulator=function(t){var e=t.match("[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?");if(null==e)throw new a("functions","No origin provided to useFunctionsEmulator()");if(null==e[2])throw new a("functions","Port missing in origin provided to useFunctionsEmulator()");return O(this._functionsInstance,e[1],Number(e[2]))},t.prototype.useEmulator=function(t,e){return O(this._functionsInstance,t,e)},t}(),P=function(t,e){var n=e.instanceIdentifier,r=t.getProvider("app-compat").getImmediate(),i=t.getProvider("functions-exp").getImmediate({identifier:null!=n?n:"us-central1"});return new D(r,i)};
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
_={Functions:D},r.default.INTERNAL.registerComponent(new p("functions-compat",P,"PUBLIC").setServiceProps(_).setMultipleInstances(!0)),r.default.registerVersion("@firebase/functions-compat","0.0.900")}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-functions-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-functions-compat.js.map
