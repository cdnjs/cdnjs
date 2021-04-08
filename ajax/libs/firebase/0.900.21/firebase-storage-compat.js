!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app-compat"),require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app-compat","@firebase/app"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).firebase,e.firebase.INTERNAL.modularAPIs)}(this,(function(e,t){"use strict";try{(function(){function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=n(e),o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};
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
    ***************************************************************************** */function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function a(e,t,n,r){return new(n||(n=Promise))((function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}u((r=r.apply(e,t||[])).next())}))}function u(e,t){var n,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}function c(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e}
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
     */var l=function(e){function t(n,r,o){var s=e.call(this,r)||this;return s.code=n,s.customData=o,s.name="FirebaseError",Object.setPrototypeOf(s,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(s,h.prototype.create),s}return s(t,e),t}(Error),h=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},o=this.service+"/"+e,s=this.errors[e],i=s?p(s,r):"Error",a=this.serviceName+": "+i+" ("+o+").",u=new l(o,a,r);return u},e}();function p(e,t){return e.replace(f,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var f=/\{\$([^}]+)}/g;
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
     */function d(e){return e&&e._delegate?e._delegate:e}var _,g=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}();
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
     */!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(_||(_={}));
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
const m="firebasestorage.googleapis.com";class b extends l{constructor(e,t){super(y(e),`Firebase Storage: ${t} (${y(e)})`),this.customData={serverResponse:null},Object.setPrototypeOf(this,b.prototype)}_codeEquals(e){return y(e)===this.code}get message(){return this.customData.serverResponse?`${this.message}\n${this.customData.serverResponse}`:this.message}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e}}function y(e){return"storage/"+e}function v(){return new b("unknown","An unknown error occurred, please check the error payload for server response.")}function w(){return new b("canceled","User canceled the upload/download.")}function R(){return new b("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function k(e){return new b("invalid-argument",e)}function T(){return new b("app-deleted","The Firebase app was deleted.")}function x(e,t){return new b("invalid-format","String does not match format '"+e+"': "+t)}function O(e){throw new b("internal-error","Internal error: "+e)}
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
     */class P{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=_.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=_.ABORT,e(this)})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=_.NETWORK_ERROR,e(this)})),this.xhr_.addEventListener("load",(()=>{e(this)}))}))}send(e,t,n,r){if(this.sent_)throw O("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(const e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw O("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw O("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponseText(){if(!this.sent_)throw O("cannot .getResponseText() before sending");return this.xhr_.responseText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}
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
     */class U{createXhrIo(){return new P}}
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
     */class S{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=S.makeFromUrl(e,t)}catch(t){return new S(e,"")}if(""===n.path)return n;throw new b("invalid-default-bucket","Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const o=new RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}const i=t.replace(/[.]/g,"\\."),a=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${i}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:new RegExp(`^https?://${t===m?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<a.length;t++){const r=a[t],o=r.regex.exec(e);if(o){const e=o[r.indices.bucket];let t=o[r.indices.path];t||(t=""),n=new S(e,t),r.postModify(n);break}}if(null==n)throw function(e){return new b("invalid-url","Invalid URL '"+e+"'.")}(e);return n}}class C{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
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
     */function I(e){return"string"==typeof e||e instanceof String}function E(e){return A()&&e instanceof Blob}function A(){return"undefined"!=typeof Blob}function j(e,t,n,r){if(r<t)throw k(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw k(`Invalid value for '${e}'. Expected ${n} or less.`)}
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
     */function q(e,t){const n=t.match(/^(\w+):\/\/.+/);let r=t;return null==(null==n?void 0:n[1])&&(r=`https://${t}`),`${r}/v0${e}`}function M(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){n=n+(t(r)+"="+t(e[r]))+"&"}return n=n.slice(0,-1),n}
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
     */class B{constructor(e,t,n,r,o,s,i,a,u,c,l){this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=o.slice(),this.additionalRetryCodes_=s.slice(),this.callback_=i,this.errorCallback_=a,this.progressCallback_=c,this.timeout_=u,this.pool_=l,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=this;function t(t,n){const r=e.resolve_,o=e.reject_,s=n.xhr;if(n.wasSuccessCode)try{const t=e.callback_(s,s.getResponseText());void 0!==t?r(t):r()}catch(e){o(e)}else if(null!==s){const t=v();t.serverResponse=s.getResponseText(),e.errorCallback_?o(e.errorCallback_(s,t)):o(t)}else if(n.canceled){o(e.appDelete_?T():w())}else{o(new b("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}}this.canceled_?t(0,new F(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,o=null,s=!1,i=0;function a(){return 2===i}let u=!1;function c(...e){u||(u=!0,t.apply(null,e))}function l(t){o=setTimeout((()=>{o=null,e(h,a())}),t)}function h(e,...t){if(u)return;if(e)return void c.call(null,e,...t);if(a()||s)return void c.call(null,e,...t);let n;r<64&&(r*=2),1===i?(i=2,n=0):n=1e3*(r+Math.random()),l(n)}let p=!1;function f(e){p||(p=!0,u||(null!==o?(e||(i=2),clearTimeout(o),l(0)):e||(i=1)))}return l(0),setTimeout((()=>{s=!0,f(!0)}),n),f}((function(t,n){if(n)return void t(!1,new F(!1,null,!0));const r=e.pool_.createXhrIo();function o(t){const n=t.loaded,r=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(n,r)}e.pendingXhr_=r,null!==e.progressCallback_&&r.addUploadProgressListener(o),r.send(e.url_,e.method_,e.body_,e.headers_).then((n=>{null!==e.progressCallback_&&n.removeUploadProgressListener(o),e.pendingXhr_=null;const r=(n=n).getErrorCode()===_.NO_ERROR,s=n.getStatus();if(!r||e.isRetryStatusCode_(s)){const e=n.getErrorCode()===_.ABORT;return void t(!1,new F(!1,null,e))}const i=-1!==e.successCodes_.indexOf(s);t(!0,new F(i,n))}))}),t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()}isRetryStatusCode_(e){const t=e>=500&&e<600,n=-1!==[408,429].indexOf(e),r=-1!==this.additionalRetryCodes_.indexOf(e);return t||n||r}}class F{constructor(e,t,n){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!n}}
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
function L(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function N(...e){const t=L();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(A())return new Blob(e);throw new b("unsupported-environment","This browser doesn't seem to support creating Blobs")}
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
const D="raw",z="base64",H="base64url",X="data_url";class ${constructor(e,t){this.data=e,this.contentType=t||null}}function G(e,t){switch(e){case D:return new $(V(t));case z:case H:return new $(W(e,t));case X:return new $(function(e){const t=new K(e);return t.base64?W(z,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw x(X,"Malformed data URL.")}return V(t)}(t.rest)}(t),new K(t).contentType)}throw v()}function V(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296==(64512&r)){if(n<e.length-1&&56320==(64512&e.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320==(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function W(e,t){switch(e){case z:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){throw x(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case H:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){throw x(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=atob(t)}catch(t){throw x(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}class K{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw x(X,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=function(e,t){if(!(e.length>=t.length))return!1;return e.substring(e.length-t.length)===t}
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
     */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1)}}class Z{constructor(e,t){let n=0,r="";E(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(E(this.data_)){const n=function(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}(this.data_,e,t);return null===n?null:new Z(n)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new Z(n,!0)}}static getBlob(...e){if(A()){const t=e.map((e=>e instanceof Z?e.data_:e));return new Z(N.apply(null,t))}{const t=e.map((e=>I(e)?G(D,e).data:e.data_));let n=0;t.forEach((e=>{n+=e.byteLength}));const r=new Uint8Array(n);let o=0;return t.forEach((e=>{for(let t=0;t<e.length;t++)r[o++]=e[t]})),new Z(r,!0)}}uploadData(){return this.data_}}
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
     */function Y(e){let t;try{t=JSON.parse(e)}catch(e){return null}return"object"!=typeof(n=t)||Array.isArray(n)?null:t;var n}
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
     */function J(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
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
     */function Q(e,t){return t}class ee{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||Q}}let te=null;function ne(){if(te)return te;const e=[];e.push(new ee("bucket")),e.push(new ee("generation")),e.push(new ee("metageneration")),e.push(new ee("name","fullPath",!0));const t=new ee("name");t.xform=function(e,t){return function(e){return!I(e)||e.length<2?e:J(e)}(t)},e.push(t);const n=new ee("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new ee("timeCreated")),e.push(new ee("updated")),e.push(new ee("md5Hash",null,!0)),e.push(new ee("cacheControl",null,!0)),e.push(new ee("contentDisposition",null,!0)),e.push(new ee("contentEncoding",null,!0)),e.push(new ee("contentLanguage",null,!0)),e.push(new ee("contentType",null,!0)),e.push(new ee("metadata","customMetadata",!0)),te=e,te}function re(e,t,n){const r={type:"file"},o=n.length;for(let e=0;e<o;e++){const o=n[e];r[o.local]=o.xform(r,t[o.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){const n=e.bucket,r=e.fullPath,o=new S(n,r);return t._makeStorageReference(o)}})}(r,e),r}function oe(e,t,n){const r=Y(t);if(null===r)return null;return re(e,r,n)}function se(e,t){const n={},r=t.length;for(let o=0;o<r;o++){const r=t[o];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}
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
     */function ie(e,t,n){const r=Y(n);if(null===r)return null;return function(e,t,n){const r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n.prefixes)for(const o of n.prefixes){const n=o.replace(/\/$/,""),s=e._makeStorageReference(new S(t,n));r.prefixes.push(s)}if(n.items)for(const o of n.items){const n=e._makeStorageReference(new S(t,o.name));r.items.push(n)}return r}(e,t,r)}class ae{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
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
     */function ue(e){if(!e)throw v()}function ce(e,t){return function(n,r){const o=oe(e,r,t);return ue(null!==o),o}}function le(e,t){return function(n,r){const o=oe(e,r,t);return ue(null!==o),function(e,t,n){const r=Y(t);if(null===r)return null;if(!I(r.downloadTokens))return null;const o=r.downloadTokens;if(0===o.length)return null;const s=encodeURIComponent;return o.split(",").map((t=>{const r=e.bucket,o=e.fullPath;return q("/b/"+s(r)+"/o/"+s(o),n)+M({alt:"media",token:t})}))[0]}(o,r,e.host)}}function he(e){return function(t,n){let r;var o,s;return 401===t.getStatus()?r=new b("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(s=e.bucket,r=new b("quota-exceeded","Quota for bucket '"+s+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(o=e.path,r=new b("unauthorized","User does not have permission to access '"+o+"'.")):r=n,r.serverResponse=n.serverResponse,r}}function pe(e){const t=he(e);return function(n,r){let o=t(n,r);var s;return 404===n.getStatus()&&(s=e.path,o=new b("object-not-found","Object '"+s+"' does not exist.")),o.serverResponse=r.serverResponse,o}}function fe(e,t,n){const r=q(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,s=new ae(r,"GET",ce(e,n),o);return s.errorHandler=pe(t),s}function de(e,t,n,r,o){const s={};t.isRoot?s.prefix="":s.prefix=t.path+"/",n&&n.length>0&&(s.delimiter=n),r&&(s.pageToken=r),o&&(s.maxResults=o);const i=q(t.bucketOnlyServerUrl(),e.host),a=e.maxOperationRetryTime,u=new ae(i,"GET",function(e,t){return function(n,r){const o=ie(e,t,r);return ue(null!==o),o}}(e,t.bucket),a);return u.urlParams=s,u.errorHandler=he(t),u}function _e(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),r}class ge{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function me(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){ue(!1)}return ue(!!n&&-1!==(t||["active"]).indexOf(n)),n}const be=262144;function ye(e,t,n,r,o,s,i,a){const u=new ge(0,0);if(i?(u.current=i.current,u.total=i.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw new b("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");const c=u.total-u.current;let l=c;o>0&&(l=Math.min(l,o));const h=u.current,p=h+l,f={"X-Goog-Upload-Command":l===c?"upload, finalize":"upload","X-Goog-Upload-Offset":u.current},d=r.slice(h,p);if(null===d)throw R();const _=t.maxUploadRetryTime,g=new ae(n,"POST",(function(e,n){const o=me(e,["active","final"]),i=u.current+l,a=r.size();let c;return c="final"===o?ce(t,s)(e,n):null,new ge(i,a,"final"===o,c)}),_);return g.headers=f,g.body=d.uploadData(),g.progressCallback=a||null,g.errorHandler=he(e),g}
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
     */const ve="running",we="paused",Re="success",ke="canceled",Te="error";function xe(e){switch(e){case"running":case"pausing":case"canceling":return ve;case"paused":return we;case"success":return Re;case"canceled":return ke;case"error":default:return Te}}
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
     */class Oe{constructor(e,t,n){if("function"==typeof e||null!=t||null!=n)this.next=e,this.error=t,this.complete=n;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}
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
     */function Pe(e){return(...t)=>{Promise.resolve().then((()=>e(...t)))}}
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
     */class Ue{constructor(e,t,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=ne(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{this._request=void 0,this._chunkMultiplier=1,e._codeEquals("canceled")?(this._needToFetchStatus=!0,this.completeTransitions_()):(this._error=e,this._transition("error"))},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals("canceled")?this.completeTransitions_():(this._error=e,this._transition("error"))},this._promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t,this._start()})),this._promise.then(null,(()=>{}))}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())}_resolveToken(e){this._ref.storage._getAuthToken().then((t=>{switch(this._state){case"running":e(t);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}}))}_createResumable(){this._resolveToken((e=>{const t=function(e,t,n,r,o){const s=t.bucketOnlyServerUrl(),i=_e(t,r,o),a={name:i.fullPath},u=q(s,e.host),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":r.size(),"X-Goog-Upload-Header-Content-Type":i.contentType,"Content-Type":"application/json; charset=utf-8"},l=se(i,n),h=e.maxUploadRetryTime,p=new ae(u,"POST",(function(e){let t;me(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){ue(!1)}return ue(I(t)),t}),h);return p.urlParams=a,p.headers=c,p.body=l,p.errorHandler=he(t),p}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(t,e);this._request=n,n.getPromise().then((e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t=>{const n=function(e,t,n,r){const o=e.maxUploadRetryTime,s=new ae(n,"POST",(function(e){const t=me(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){ue(!1)}n||ue(!1);const o=Number(n);return ue(!isNaN(o)),new ge(o,r.size(),"final"===t)}),o);return s.headers={"X-Goog-Upload-Command":"query"},s.errorHandler=he(t),s}(this._ref.storage,this._ref._location,e,this._blob),r=this._ref.storage._makeRequest(n,t);this._request=r,r.getPromise().then((e=>{e=e,this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const e=be*this._chunkMultiplier,t=new ge(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((r=>{let o;try{o=ye(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){return this._error=e,void this._transition("error")}const s=this._ref.storage._makeRequest(o,r);this._request=s,s.getPromise().then((e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){be*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e=>{const t=fe(this._ref.storage,this._ref._location,this._mappings),n=this._ref.storage._makeRequest(t,e);this._request=n,n.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken((e=>{const t=function(e,t,n,r,o){const s=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"},a=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();i["Content-Type"]="multipart/related; boundary="+a;const u=_e(t,r,o),c="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+se(u,n)+"\r\n--"+a+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",l="\r\n--"+a+"--",h=Z.getBlob(c,r,l);if(null===h)throw R();const p={name:u.fullPath},f=q(s,e.host),d=e.maxUploadRetryTime,_=new ae(f,"POST",ce(e,n),d);return _.urlParams=p,_.headers=i,_.body=h.uploadData(),_.errorHandler=he(t),_}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),n=this._ref.storage._makeRequest(t,e);this._request=n,n.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request&&this._request.cancel();break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=w(),this._state=e,this._notifyObservers();break;case"error":case"success":this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){const e=xe(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){const o=new Oe(t,n,r);return this._addObserver(o),()=>{this._removeObserver(o)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();this._observers.slice().forEach((e=>{this._notifyObserver(e)}))}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(xe(this._state)){case Re:Pe(this._resolve.bind(null,this.snapshot))();break;case ke:case Te:Pe(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(xe(this._state)){case ve:case we:e.next&&Pe(e.next.bind(e,this.snapshot))();break;case Re:e.complete&&Pe(e.complete.bind(e))();break;case ke:case Te:e.error&&Pe(e.error.bind(e,this._error))();break;default:e.error&&Pe(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}
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
     */class Se{constructor(e,t){this._service=e,this._location=t instanceof S?t:S.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Se(e,t)}get root(){const e=new S(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return J(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new S(this._location.bucket,e);return new Se(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new b("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Ce(e){const t={prefixes:[],items:[]};return Ie(e,t).then((()=>t))}async function Ie(e,t,n){const r={pageToken:n},o=await Ee(e,r);t.prefixes.push(...o.prefixes),t.items.push(...o.items),null!=o.nextPageToken&&await Ie(e,t,o.nextPageToken)}async function Ee(e,t){null!=t&&"number"==typeof t.maxResults&&j("options.maxResults",1,1e3,t.maxResults);const n=await e.storage._getAuthToken(),r=t||{},o=de(e.storage,e._location,"/",r.pageToken,r.maxResults);return e.storage._makeRequest(o,n).getPromise()}async function Ae(e,t){e._throwIfRoot("updateMetadata");const n=await e.storage._getAuthToken(),r=function(e,t,n,r){const o=q(t.fullServerUrl(),e.host),s=se(n,r),i=e.maxOperationRetryTime,a=new ae(o,"PATCH",ce(e,r),i);return a.headers={"Content-Type":"application/json; charset=utf-8"},a.body=s,a.errorHandler=pe(t),a}(e.storage,e._location,t,ne());return e.storage._makeRequest(r,n).getPromise()}async function je(e){e._throwIfRoot("getDownloadURL");const t=await e.storage._getAuthToken(),n=function(e,t,n){const r=q(t.fullServerUrl(),e.host),o=e.maxOperationRetryTime,s=new ae(r,"GET",le(e,n),o);return s.errorHandler=pe(t),s}(e.storage,e._location,ne());return e.storage._makeRequest(n,t).getPromise().then((e=>{if(null===e)throw new b("no-download-url","The given file does not have any download URLs.");return e}))}async function qe(e){e._throwIfRoot("deleteObject");const t=await e.storage._getAuthToken(),n=function(e,t){const n=q(t.fullServerUrl(),e.host),r=e.maxOperationRetryTime,o=new ae(n,"DELETE",(function(e,t){}),r);return o.successCodes=[200,204],o.errorHandler=pe(t),o}(e.storage,e._location);return e.storage._makeRequest(n,t).getPromise()}function Me(e,t){const n=function(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new S(e._location.bucket,n);return new Se(e.storage,r)}
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
     */function Be(e,t){if(e instanceof Ne){const n=e;if(null==n._bucket)throw new b("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");const r=new Se(n,n._bucket);return null!=t?Be(r,t):r}if(void 0!==t){if(t.includes(".."))throw k('`path` param cannot contain ".."');return Me(e,t)}return e}function Fe(e,t){if(t&&/^[A-Za-z]+:\/\//.test(t)){if(e instanceof Ne)return new Se(e,t);throw k("To use ref(service, url), the first argument must be a Storage instance.")}return Be(e,t)}function Le(e,t){const n=null==t?void 0:t.storageBucket;return null==n?null:S.makeFromBucketSpec(n,e)}class Ne{constructor(e,t,n,r,o){this.app=e,this._authProvider=t,this._pool=n,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=m,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?S.makeFromBucketSpec(r,this._host):Le(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=S.makeFromBucketSpec(this._url,e):this._bucket=Le(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){j("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){j("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}_delete(){return this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear(),Promise.resolve()}_makeStorageReference(e){return new Se(this,e)}_makeRequest(e,t){if(this._deleted)return new C(T());{const n=function(e,t,n,r,o){const s=M(e.urlParams),i=e.url+s,a=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(a,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(a,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(a,o),new B(i,e.method,a,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r)}(e,this._appId,t,this._pool,this._firebaseVersion);return this._requests.add(n),n.getPromise().then((()=>this._requests.delete(n)),(()=>this._requests.delete(n))),n}}}function De(e,t,n){return function(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new Ue(e,new Z(t),n)}(e=d(e),t,n)}function ze(e){return async function(e){e._throwIfRoot("getMetadata");const t=await e.storage._getAuthToken(),n=fe(e.storage,e._location,ne());return e.storage._makeRequest(n,t).getPromise()}(e=d(e))}function He(e,t){return Fe(e=d(e),t)}function Xe(e,{instanceIdentifier:n}){const r=e.getProvider("app-exp").getImmediate(),o=e.getProvider("auth-internal");return new Ne(r,o,new U,n,t.SDK_VERSION)}t._registerComponent(new g("storage-exp",Xe,"PUBLIC").setMultipleInstances(!0)),t.registerVersion("@firebase/storage","0.0.900-exp.8294e6082");
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
var $e="firebasestorage.googleapis.com",Ge=function(e){function t(n,r){var o=e.call(this,Ve(n),"Firebase Storage: "+r+" ("+Ve(n)+")")||this;return o.customData={serverResponse:null},Object.setPrototypeOf(o,t.prototype),o}return s(t,e),t.prototype._codeEquals=function(e){return Ve(e)===this.code},Object.defineProperty(t.prototype,"message",{get:function(){return this.customData.serverResponse?this.message+"\n"+this.customData.serverResponse:this.message},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e},enumerable:!1,configurable:!0}),t}(l);function Ve(e){return"storage/"+e}function We(){return new Ge("unknown","An unknown error occurred, please check the error payload for server response.")}function Ke(e){return new Ge("invalid-argument",e)}function Ze(){return new Ge("app-deleted","The Firebase app was deleted.")}function Ye(e){return new Ge("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Je(e,t){return new Ge("invalid-format","String does not match format '"+e+"': "+t)}
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
     */var Qe={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},et=function(e,t){this.data=e,this.contentType=t||null};function tt(e,t){switch(e){case Qe.RAW:return new et(nt(t));case Qe.BASE64:case Qe.BASE64URL:return new et(rt(e,t));case Qe.DATA_URL:return new et((n=new ot(t)).base64?rt(Qe.BASE64,n.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw Je(Qe.DATA_URL,"Malformed data URL.")}return nt(t)}(n.rest),function(e){return new ot(e).contentType}(t))}var n;throw We()}function nt(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296==(64512&r))if(n<e.length-1&&56320==(64512&e.charCodeAt(n+1)))r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r);else t.push(239,191,189);else 56320==(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function rt(e,t){switch(e){case Qe.BASE64:var n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw Je(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break;case Qe.BASE64URL:var o=-1!==t.indexOf("+"),s=-1!==t.indexOf("/");if(o||s)throw Je(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var i;try{i=atob(t)}catch(t){throw Je(e,"Invalid character found")}for(var a=new Uint8Array(i.length),u=0;u<i.length;u++)a[u]=i.charCodeAt(u);return a}var ot=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw Je(Qe.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var n=t[1]||null;null!=n&&(this.base64=(r=n,o=";base64",r.length>=o.length&&r.substring(r.length-o.length)===o),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1);var r,o;
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
     */};var st,it={STATE_CHANGED:"state_changed"},at={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},ut=function(){function e(e,t,n){this._delegate=e,this.task=t,this.ref=n}return Object.defineProperty(e.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),e}(),ct=function(){function e(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}return Object.defineProperty(e.prototype,"snapshot",{get:function(){return new ut(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),e.prototype.then=function(e,t){var n=this;return this._delegate.then((function(t){if(e)return e(new ut(t,n,n._ref))}),t)},e.prototype.on=function(e,t,n,r){var o=this,s=void 0;return t&&(s="function"==typeof t?function(e){return t(new ut(e,o,o._ref))}:{next:t.next?function(e){return t.next(new ut(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,s,n||void 0,r||void 0)},e}(),lt=function(){function e(e,t){this._delegate=e,this._service=t}return Object.defineProperty(e.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map((function(t){return new ht(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){var e=this;return this._delegate.items.map((function(t){return new ht(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),e}(),ht=function(){function e(e,t){this._delegate=e,this.storage=t}return Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this._delegate.toString()},e.prototype.child=function(t){return new e(function(e,t){return Me(e,t)}(this._delegate,t),this.storage)},Object.defineProperty(e.prototype,"root",{get:function(){return new e(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=this._delegate.parent;return null==t?null:new e(t,this.storage)},enumerable:!1,configurable:!0}),e.prototype.put=function(e,t){return this._throwIfRoot("put"),new ct(De(this._delegate,e,t),this)},e.prototype.putString=function(e,t,n){void 0===t&&(t=D),this._throwIfRoot("putString");var r=tt(t,e),o=i({},n);return null==o.contentType&&null!=r.contentType&&(o.contentType=r.contentType),new ct(new Ue(this._delegate,new Z(r.data,!0),o),this)},e.prototype.listAll=function(){var e=this;return function(e){return Ce(e=d(e))}(this._delegate).then((function(t){return new lt(t,e.storage)}))},e.prototype.list=function(e){var t=this;return function(e,t){return Ee(e=d(e),t)}(this._delegate,e||void 0).then((function(e){return new lt(e,t.storage)}))},e.prototype.getMetadata=function(){return ze(this._delegate)},e.prototype.updateMetadata=function(e){return function(e,t){return Ae(e=d(e),t)}(this._delegate,e)},e.prototype.getDownloadURL=function(){return function(e){return je(e=d(e))}(this._delegate)},e.prototype.delete=function(){return this._throwIfRoot("delete"),function(e){return qe(e=d(e))}(this._delegate)},e.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw Ye(e)},e}(),pt=function(){function e(e,t){this.bucket=e,this.path_=t}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t,n){var r;try{r=e.makeFromUrl(t,n)}catch(n){return new e(t,"")}if(""===r.path)return r;throw new Ge("invalid-default-bucket","Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t,n){var r=null,o="([A-Za-z0-9.\\-_]+)";var s=new RegExp("^gs://"+o+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}for(var a=n.replace(/[.]/g,"\\."),u=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+a+"/v[A-Za-z0-9_]+/b/"+o+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp("^https?://"+(n===$e?"(?:storage.googleapis.com|storage.cloud.google.com)":n)+"/"+o+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:i}],c=0;c<u.length;c++){var l=u[c],h=l.regex.exec(t);if(h){var p=h[l.indices.bucket],f=h[l.indices.path];f||(f=""),r=new e(p,f),l.postModify(r);break}}if(null==r)throw function(e){return new Ge("invalid-url","Invalid URL '"+e+"'.")}(t);return r},e}(),ft=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}();function dt(e,t,n,r){if(r<t)throw Ke("Invalid value for '"+e+"'. Expected "+t+" or greater.");if(r>n)throw Ke("Invalid value for '"+e+"'. Expected "+n+" or less.")}
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
     */!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(st||(st={}));
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
var _t=function(){function e(e,t,n,r,o,s,i,a,u,c,l){var h=this;this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=o.slice(),this.additionalRetryCodes_=s.slice(),this.callback_=i,this.errorCallback_=a,this.progressCallback_=c,this.timeout_=u,this.pool_=l,this.promise_=new Promise((function(e,t){h.resolve_=e,h.reject_=t,h.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,n){var r,o=e.resolve_,s=e.reject_,i=n.xhr;if(n.wasSuccessCode)try{var a=e.callback_(i,i.getResponseText());void 0!==a?o(a):o()}catch(e){s(e)}else null!==i?((r=We()).serverResponse=i.getResponseText(),e.errorCallback_?s(e.errorCallback_(i,r)):s(r)):n.canceled?s(r=e.appDelete_?Ze():new Ge("canceled","User canceled the upload/download.")):s(r=new Ge("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new gt(!1,null,!0)):this.backoffId_=
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
function(e,t,n){var r=1,o=null,s=!1,i=0;function a(){return 2===i}var u=!1;function l(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];u||(u=!0,t.apply(null,e))}function h(t){o=setTimeout((function(){o=null,e(p,a())}),t)}function p(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(!u)if(e)l.call.apply(l,c([null,e],t));else{var o;a()||s?l.call.apply(l,c([null,e],t)):(r<64&&(r*=2),1===i?(i=2,o=0):o=1e3*(r+Math.random()),h(o))}}var f=!1;function d(e){f||(f=!0,u||(null!==o?(e||(i=2),clearTimeout(o),h(0)):e||(i=1)))}return h(0),setTimeout((function(){s=!0,d(!0)}),n),d}((function(t,n){if(n)t(!1,new gt(!1,null,!0));else{var r=e.pool_.createXhrIo();e.pendingXhr_=r,null!==e.progressCallback_&&r.addUploadProgressListener(o),r.send(e.url_,e.method_,e.body_,e.headers_).then((function(n){null!==e.progressCallback_&&n.removeUploadProgressListener(o),e.pendingXhr_=null;var r=(n=n).getErrorCode()===st.NO_ERROR,s=n.getStatus();if(r&&!e.isRetryStatusCode_(s)){var i=-1!==e.successCodes_.indexOf(s);t(!0,new gt(i,n))}else{var a=n.getErrorCode()===st.ABORT;t(!1,new gt(!1,null,a))}}))}function o(t){var n=t.loaded,r=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(n,r)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,n=-1!==[408,429].indexOf(e),r=-1!==this.additionalRetryCodes_.indexOf(e);return t||n||r},e}(),gt=function(e,t,n){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!n};function mt(e,t,n,r,o){var s=function(e){var t=encodeURIComponent,n="?";for(var r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n.slice(0,-1)}
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
     */(e.urlParams),i=e.url+s,a=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(a,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(a,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(null!=t?t:"AppManager")}(a,o),new _t(i,e.method,a,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r)}
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
var bt=function(){function e(e,t){this._service=e,this._location=t instanceof pt?t:pt.makeFromUrl(t,e.host)}return e.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},e.prototype._newRef=function(t,n){return new e(t,n)},Object.defineProperty(e.prototype,"root",{get:function(){var e=new pt(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return e=this._location.path,-1===(t=e.lastIndexOf("/",e.length-2))?e:e.slice(t+1);var e,t},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=function(e){if(0===e.length)return null;var t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===t)return null;var n=new pt(this._location.bucket,t);return new e(this._service,n)},enumerable:!1,configurable:!0}),e.prototype._throwIfRoot=function(e){if(""===this._location.path)throw Ye(e)},e}();
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
     */function yt(e){return/^[A-Za-z]+:\/\//.test(e)}function vt(e,t){var n=null==t?void 0:t.storageBucket;return null==n?null:pt.makeFromBucketSpec(n,e)}!function(){function e(e,t,n,r,o){this.app=e,this._authProvider=t,this._pool=n,this._url=r,this._firebaseVersion=o,this._bucket=null,this._host=$e,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?pt.makeFromBucketSpec(r,this._host):vt(this._host,this.app.options)}Object.defineProperty(e.prototype,"host",{get:function(){return this._host},set:function(e){this._host=e,null!=this._url?this._bucket=pt.makeFromBucketSpec(this._url,e):this._bucket=vt(e,this.app.options)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){dt("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){dt("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),e.prototype._getAuthToken=function(){return a(this,void 0,void 0,(function(){var e,t;return u(this,(function(n){switch(n.label){case 0:return(e=this._authProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:if(null!==(t=n.sent()))return[2,t.accessToken];n.label=2;case 2:return[2,null]}}))}))},e.prototype._delete=function(){return this._deleted=!0,this._requests.forEach((function(e){return e.cancel()})),this._requests.clear(),Promise.resolve()},e.prototype._makeStorageReference=function(e){return new bt(this,e)},e.prototype._makeRequest=function(e,t){var n=this;if(this._deleted)return new ft(Ze());var r=mt(e,this._appId,t,this._pool,this._firebaseVersion);return this._requests.add(r),r.getPromise().then((function(){return n._requests.delete(r)}),(function(){return n._requests.delete(r)})),r}}();
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
     */var wt,Rt,kt=function(){function e(e,t){var n=this;this.app=e,this._delegate=t,this.INTERNAL={delete:function(){return n._delegate._delete()}}}return Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),e.prototype.ref=function(e){if(yt(e))throw Ke("ref() expected a child path but got a URL, use refFromURL instead.");return new ht(He(this._delegate,e),this)},e.prototype.refFromURL=function(e){if(!yt(e))throw Ke("refFromURL() expected a full URL but got a child path, use ref() instead.");try{S.makeFromUrl(e,this._delegate.host)}catch(e){throw Ke("refFromUrl() expected a valid full URL but got an invalid one.")}return new ht(He(this._delegate,e),this)},e.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},e.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},e.prototype.useEmulator=function(e,t){!function(e,t,n){e.host="http://"+t+":"+n}(this._delegate,e,t)},e}();function Tt(e,t){var n=t.instanceIdentifier,r=e.getProvider("app-compat").getImmediate(),o=e.getProvider("storage-exp").getImmediate({identifier:n});return new kt(r,o)}wt=r.default,Rt={TaskState:at,TaskEvent:it,StringFormat:Qe,Storage:kt,Reference:ht},wt.INTERNAL.registerComponent(new g("storage",Tt,"PUBLIC").setServiceProps(Rt).setMultipleInstances(!0)),wt.registerVersion("@firebase/storage-compat","0.0.900-exp.8294e6082")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-storage-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-storage-compat.js.map
