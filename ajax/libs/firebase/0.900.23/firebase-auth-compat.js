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
    ***************************************************************************** */function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function a(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}function u(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{u(r.next(e))}catch(e){o(e)}}function a(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}u((r=r.apply(e,t||[])).next())}))}function c(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}function l(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}
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
     */var d={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<e.length;i+=3){var o=e[i],s=i+1<e.length,a=s?e[i+1]:0,u=i+2<e.length,c=u?e[i+2]:0,l=o>>2,d=(3&o)<<4|a>>4,h=(15&a)<<2|c>>6,f=63&c;u||(f=64,s||(h=64)),r.push(n[l],n[d],n[h],n[f])}return r.join("")},encodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t}(e),t)},decodeString:function(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){for(var t=[],n=0,r=0;n<e.length;){var i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){var o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){var s=((7&i)<<18|(63&(o=e[n++]))<<12|(63&(a=e[n++]))<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{o=e[n++];var a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray:function(e,t){this.init_();for(var n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<e.length;){var o=n[e.charAt(i++)],s=i<e.length?n[e.charAt(i)]:0,a=++i<e.length?n[e.charAt(i)]:64,u=++i<e.length?n[e.charAt(i)]:64;if(++i,null==o||null==s||null==a||null==u)throw Error();var c=o<<2|s>>4;if(r.push(c),64!==a){var l=s<<4&240|a>>2;if(r.push(l),64!==u){var d=a<<6&192|u;r.push(d)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};
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
function h(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function f(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}function p(){var e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function v(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function m(){var e=h();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function g(){return"indexedDB"in self&&null!=indexedDB}
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
     */var y=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name="FirebaseError",Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,b.prototype.create),o}return o(t,e),t}(Error),b=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],s=o?_(o,r):"Error",a=this.serviceName+": "+s+" ("+i+").",u=new y(i,a,r);return u},e}();function _(e,t){return e.replace(I,(function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"}))}var I=/\{\$([^}]+)}/g;
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
function w(e){for(var t=[],n=function(e,n){Array.isArray(n)?n.forEach((function(n){t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))})):t.push(encodeURIComponent(e)+"="+encodeURIComponent(n))},r=0,i=Object.entries(e);r<i.length;r++){var o=i[r];n(o[0],o[1])}return t.length?"&"+t.join("&"):""}function T(e){var t={};return e.replace(/^\?/,"").split("&").forEach((function(e){if(e){var n=e.split("="),r=n[0],i=n[1];t[decodeURIComponent(r)]=decodeURIComponent(i)}})),t}function k(e){var t=e.indexOf("?");if(!t)return"";var n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}var E,R,S=function(){function e(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(n)})).catch((function(e){n.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,n){var r,i=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i in e&&"function"==typeof e[i])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=P),void 0===r.error&&(r.error=P),void 0===r.complete&&(r.complete=P);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}})),this.observers.push(r),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this;this.task.then((function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}();function P(){}
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
     */function A(e){return e&&e._delegate?e._delegate:e}
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
     */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(R||(R={}));var O={debug:R.DEBUG,verbose:R.VERBOSE,info:R.INFO,warn:R.WARN,error:R.ERROR,silent:R.SILENT},N=R.INFO,C=((E={})[R.DEBUG]="log",E[R.VERBOSE]="log",E[R.INFO]="info",E[R.WARN]="warn",E[R.ERROR]="error",E),L=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){var i=(new Date).toISOString(),o=C[t];if(!o)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[o].apply(console,l(["["+i+"]  "+e.name+":"],n))}},D=function(){function e(e){this.name=e,this._logLevel=N,this._logHandler=L,this._userLogHandler=null}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in R))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?O[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,l([this,R.DEBUG],e)),this._logHandler.apply(this,l([this,R.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,l([this,R.VERBOSE],e)),this._logHandler.apply(this,l([this,R.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,l([this,R.INFO],e)),this._logHandler.apply(this,l([this,R.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,l([this,R.WARN],e)),this._logHandler.apply(this,l([this,R.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,l([this,R.ERROR],e)),this._logHandler.apply(this,l([this,R.ERROR],e))},e}(),M=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}();var U=
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
function(){var e;return(e={})["admin-restricted-operation"]="This operation is restricted to administrators only.",e["argument-error"]="",e["app-not-authorized"]="This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",e["app-not-installed"]="The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",e["captcha-check-failed"]="The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",e["code-expired"]="The SMS code has expired. Please re-send the verification code to try again.",e["cordova-not-ready"]="Cordova framework is not ready.",e["cors-unsupported"]="This browser is not supported.",e["credential-already-in-use"]="This credential is already associated with a different user account.",e["custom-token-mismatch"]="The custom token corresponds to a different audience.",e["requires-recent-login"]="This operation is sensitive and requires recent authentication. Log in again before retrying this request.",e["dependent-sdk-initialized-before-auth"]="Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",e["dynamic-link-not-activated"]="Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",e["email-change-needs-verification"]="Multi-factor users must always have a verified email.",e["email-already-in-use"]="The email address is already in use by another account.",e["emulator-config-failed"]='Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "useAuthEmulator()" sooner.',e["expired-action-code"]="The action code has expired.",e["cancelled-popup-request"]="This operation has been cancelled due to another conflicting popup being opened.",e["internal-error"]="An internal AuthError has occurred.",e["invalid-app-credential"]="The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",e["invalid-app-id"]="The mobile app identifier is not registed for the current project.",e["invalid-user-token"]="This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",e["invalid-auth-event"]="An internal AuthError has occurred.",e["invalid-verification-code"]="The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",e["invalid-continue-uri"]="The continue URL provided in the request is invalid.",e["invalid-cordova-configuration"]="The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",e["invalid-custom-token"]="The custom token format is incorrect. Please check the documentation.",e["invalid-dynamic-link-domain"]="The provided dynamic link domain is not configured or authorized for the current project.",e["invalid-email"]="The email address is badly formatted.",e["invalid-emulator-scheme"]="Emulator URL must start with a valid scheme (http:// or https://).",e["invalid-api-key"]="Your API key is invalid, please check you have copied it correctly.",e["invalid-cert-hash"]="The SHA-1 certificate hash provided is invalid.",e["invalid-credential"]="The supplied auth credential is malformed or has expired.",e["invalid-message-payload"]="The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",e["invalid-multi-factor-session"]="The request does not contain a valid proof of first factor successful sign-in.",e["invalid-oauth-provider"]="EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",e["invalid-oauth-client-id"]="The OAuth client ID provided is either invalid or does not match the specified API key.",e["unauthorized-domain"]="This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",e["invalid-action-code"]="The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",e["wrong-password"]="The password is invalid or the user does not have a password.",e["invalid-persistence-type"]="The specified persistence type is invalid. It can only be local, session or none.",e["invalid-phone-number"]="The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",e["invalid-provider-id"]="The specified provider ID is invalid.",e["invalid-recipient-email"]="The email corresponding to this action failed to send as the provided recipient email address is invalid.",e["invalid-sender"]="The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",e["invalid-verification-id"]="The verification ID used to create the phone auth credential is invalid.",e["invalid-tenant-id"]="The Auth instance's tenant ID is invalid.",e["missing-android-pkg-name"]="An Android Package Name must be provided if the Android App is required to be installed.",e["auth-domain-config-required"]="Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",e["missing-app-credential"]="The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",e["missing-verification-code"]="The phone auth credential was created with an empty SMS verification code.",e["missing-continue-uri"]="A continue URL must be provided in the request.",e["missing-iframe-start"]="An internal AuthError has occurred.",e["missing-ios-bundle-id"]="An iOS Bundle ID must be provided if an App Store ID is provided.",e["missing-or-invalid-nonce"]="The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",e["missing-multi-factor-info"]="No second factor identifier is provided.",e["missing-multi-factor-session"]="The request is missing proof of first factor successful sign-in.",e["missing-phone-number"]="To send verification codes, provide a phone number for the recipient.",e["missing-verification-id"]="The phone auth credential was created with an empty verification ID.",e["app-deleted"]="This instance of FirebaseApp has been deleted.",e["multi-factor-info-not-found"]="The user does not have a second factor matching the identifier provided.",e["multi-factor-auth-required"]="Proof of ownership of a second factor is required to complete sign-in.",e["account-exists-with-different-credential"]="An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",e["network-request-failed"]="A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",e["no-auth-event"]="An internal AuthError has occurred.",e["no-such-provider"]="User was not linked to an account with the given provider.",e["null-user"]="A null user object was provided as the argument for an operation which requires a non-null user object.",e["operation-not-allowed"]="The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",e["operation-not-supported-in-this-environment"]='This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',e["popup-blocked"]="Unable to establish a connection with the popup. It may have been blocked by the browser.",e["popup-closed-by-user"]="The popup has been closed by the user before finalizing the operation.",e["provider-already-linked"]="User can only be linked to one identity for the given provider.",e["quota-exceeded"]="The project's quota for this operation has been exceeded.",e["redirect-cancelled-by-user"]="The redirect operation has been cancelled by the user before finalizing.",e["redirect-operation-pending"]="A redirect sign-in operation is already pending.",e["rejected-credential"]="The request contains malformed or mismatching credentials.",e["second-factor-already-in-use"]="The second factor is already enrolled on this account.",e["maximum-second-factor-count-exceeded"]="The maximum allowed number of second factors on a user has been exceeded.",e["tenant-id-mismatch"]="The provided tenant ID does not match the Auth instance's tenant ID",e.timeout="The operation has timed out.",e["user-token-expired"]="The user's credential is no longer valid. The user must sign in again.",e["too-many-requests"]="We have blocked all requests from this device due to unusual activity. Try again later.",e["unauthorized-continue-uri"]="The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",e["unsupported-first-factor"]="Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",e["unsupported-persistence-type"]="The current environment does not support the specified persistence type.",e["unsupported-tenant-operation"]="This operation is not supported in a multi-tenant context.",e["unverified-email"]="The operation requires a verified email.",e["user-cancelled"]="The user did not grant your application the permissions it requested.",e["user-not-found"]="There is no user record corresponding to this identifier. The user may have been deleted.",e["user-disabled"]="The user account has been disabled by an administrator.",e["user-mismatch"]="The supplied credentials do not correspond to the previously signed in user.",e["user-signed-out"]="",e["weak-password"]="The password must be 6 characters long or more.",e["web-storage-unsupported"]="This browser is not supported or 3rd party cookies and data may be disabled.",e["already-initialized"]="Auth can only be initialized once per app.",e},F=new b("auth","Firebase",function(){var e;return(e={})["dependent-sdk-initialized-before-auth"]="Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",e}()),x=new D("@firebase/auth-exp");function V(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];x.logLevel<=R.ERROR&&x.error.apply(x,l(["Auth ("+t.SDK_VERSION+"): "+e],n))}
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
     */function j(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];throw H.apply(void 0,l([e],t))}function W(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return H.apply(void 0,l([e],t))}function H(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if("string"!=typeof e){var i=n[0],o=l([],n.slice(1));return o[0]&&(o[0].appName=e.name),(t=e._errorFactory).create.apply(t,l([i],o))}return F.create.apply(F,l([e],n))}function z(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!e)throw H.apply(void 0,l([t],n))}function q(e){var t="INTERNAL ASSERTION FAILED: "+e;throw V(t),new Error(t)}function B(e,t){e||q(t)}
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
     */var G=new Map;function K(e){B(e instanceof Function,"Expected a class definition");var t=G.get(e);return t?(B(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,G.set(e,t),t)}
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
function J(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function Y(){return"http:"===X()||"https:"===X()}function X(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
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
var Z=function(){function e(e,t){this.shortDelay=e,this.longDelay=t,B(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(h())||v()}return e.prototype.get=function(){return"undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(Y()||p()||"connection"in navigator)&&!navigator.onLine?Math.min(5e3,this.shortDelay):this.isMobile?this.longDelay:this.shortDelay},e}();
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
     */function $(e,t){B(e.emulator,"Emulator should always be set here");var n=e.emulator.url;return t?""+n+(t.startsWith("/")?t.slice(1):t):n}
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
     */var Q,ee=function(){function e(){}return e.initialize=function(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)},e.fetch=function(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")},e.headers=function(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")},e.response=function(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")},e}(),te=((Q={}).CREDENTIAL_MISMATCH="custom-token-mismatch",Q.MISSING_CUSTOM_TOKEN="internal-error",Q.INVALID_IDENTIFIER="invalid-email",Q.MISSING_CONTINUE_URI="internal-error",Q.INVALID_PASSWORD="wrong-password",Q.MISSING_PASSWORD="internal-error",Q.EMAIL_EXISTS="email-already-in-use",Q.PASSWORD_LOGIN_DISABLED="operation-not-allowed",Q.INVALID_IDP_RESPONSE="invalid-credential",Q.INVALID_PENDING_TOKEN="invalid-credential",Q.FEDERATED_USER_ID_ALREADY_LINKED="credential-already-in-use",Q.MISSING_REQ_TYPE="internal-error",Q.EMAIL_NOT_FOUND="user-not-found",Q.RESET_PASSWORD_EXCEED_LIMIT="too-many-requests",Q.EXPIRED_OOB_CODE="expired-action-code",Q.INVALID_OOB_CODE="invalid-action-code",Q.MISSING_OOB_CODE="internal-error",Q.CREDENTIAL_TOO_OLD_LOGIN_AGAIN="requires-recent-login",Q.INVALID_ID_TOKEN="invalid-user-token",Q.TOKEN_EXPIRED="user-token-expired",Q.USER_NOT_FOUND="user-token-expired",Q.TOO_MANY_ATTEMPTS_TRY_LATER="too-many-requests",Q.INVALID_CODE="invalid-verification-code",Q.INVALID_SESSION_INFO="invalid-verification-id",Q.INVALID_TEMPORARY_PROOF="invalid-credential",Q.MISSING_SESSION_INFO="missing-verification-id",Q.SESSION_EXPIRED="code-expired",Q.MISSING_ANDROID_PACKAGE_NAME="missing-android-pkg-name",Q.UNAUTHORIZED_DOMAIN="unauthorized-continue-uri",Q.INVALID_OAUTH_CLIENT_ID="invalid-oauth-client-id",Q.ADMIN_ONLY_OPERATION="admin-restricted-operation",Q.INVALID_MFA_PENDING_CREDENTIAL="invalid-multi-factor-session",Q.MFA_ENROLLMENT_NOT_FOUND="multi-factor-info-not-found",Q.MISSING_MFA_ENROLLMENT_ID="missing-multi-factor-info",Q.MISSING_MFA_PENDING_CREDENTIAL="missing-multi-factor-session",Q.SECOND_FACTOR_EXISTS="second-factor-already-in-use",Q.SECOND_FACTOR_LIMIT_EXCEEDED="maximum-second-factor-count-exceeded",Q),ne=new Z(3e4,6e4);
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
     */function re(e,t){return e.tenantId&&!t.tenantId?s(s({},t),{tenantId:e.tenantId}):t}function ie(e,t,n,r,i){return void 0===i&&(i={}),u(this,void 0,void 0,(function(){return c(this,(function(o){return[2,oe(e,i,(function(){var i={},o={};r&&("GET"===t?o=r:i={body:JSON.stringify(r)});var a=w(s({key:e.config.apiKey},o)).slice(1),u=new(ee.headers());return u.set("Content-Type","application/json"),u.set("X-Client-Version",e._getSdkClientVersion()),e.languageCode&&u.set("X-Firebase-Locale",e.languageCode),ee.fetch()(ae(e,e.config.apiHost,n,a),s({method:t,headers:u,referrerPolicy:"no-referrer"},i))}))]}))}))}function oe(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o,a,u,l,d,h;return c(this,(function(c){switch(c.label){case 0:e._canInitEmulator=!1,r=s(s({},te),t),c.label=1;case 1:return c.trys.push([1,4,,5]),i=new ue(e),[4,Promise.race([n(),i.promise])];case 2:return o=c.sent(),i.clearNetworkTimeout(),[4,o.json()];case 3:if("needConfirmation"in(a=c.sent()))throw ce(e,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return[2,a];if(u=o.ok?a.errorMessage:a.error.message,"FEDERATED_USER_ID_ALREADY_LINKED"===(l=u.split(" : ")[0]))throw ce(e,"credential-already-in-use",a);if("EMAIL_EXISTS"===l)throw ce(e,"email-already-in-use",a);return d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-"),j(e,d),[3,5];case 4:if((h=c.sent())instanceof y)throw h;return j(e,"network-request-failed"),[3,5];case 5:return[2]}}))}))}function se(e,t,n,r,i){return void 0===i&&(i={}),u(this,void 0,void 0,(function(){var o;return c(this,(function(s){switch(s.label){case 0:return[4,ie(e,t,n,r,i)];case 1:return"mfaPendingCredential"in(o=s.sent())&&j(e,"multi-factor-auth-required",{serverResponse:o}),[2,o]}}))}))}function ae(e,t,n,r){var i=""+t+n+"?"+r;return e.config.emulator?$(e.config,i):e.config.apiScheme+"://"+i}var ue=function(){function e(e){var t=this;this.auth=e,this.timer=null,this.promise=new Promise((function(e,n){t.timer=setTimeout((function(){return n(W(t.auth,"timeout"))}),ne.get())}))}return e.prototype.clearNetworkTimeout=function(){clearTimeout(this.timer)},e}();function ce(e,t,n){var r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);var i=W(e,t,r);return i.customData._tokenResponse=n,i}
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
     */function le(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:delete",t)]}))}))}function de(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:update",t)]}))}))}function he(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:lookup",t)]}))}))}
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
     */function fe(e){if(e)try{var t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}function pe(e){return 1e3*Number(e)}function ve(e){var t=e.split("."),n=t[0],r=t[1],i=t[2];if(void 0===n||void 0===r||void 0===i)return V("JWT malformed, contained fewer than 3 sections"),null;try{var o=function(e){try{return d.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null}(r);return o?JSON.parse(o):(V("Failed to decode base64 JWT payload"),null)}catch(e){return V("Caught error parsing JWT payload as JSON",e),null}}
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
function me(e,t,n){return void 0===n&&(n=!1),u(this,void 0,void 0,(function(){var r;return c(this,(function(i){switch(i.label){case 0:if(n)return[2,t];i.label=1;case 1:return i.trys.push([1,3,,6]),[4,t];case 2:return[2,i.sent()];case 3:return(r=i.sent())instanceof y&&function(e){var t=e.code;return"auth/user-disabled"===t||"auth/user-token-expired"===t}
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
     */(r)?e.auth.currentUser!==e?[3,5]:[4,e.auth.signOut()]:[3,5];case 4:i.sent(),i.label=5;case 5:throw r;case 6:return[2]}}))}))}var ge=function(){function e(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}return e.prototype._start=function(){this.isRunning||(this.isRunning=!0,this.schedule())},e.prototype._stop=function(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))},e.prototype.getInterval=function(e){var t;if(e){var n=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),n}this.errorBackoff=3e4;n=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,n)},e.prototype.schedule=function(e){var t=this;if(void 0===e&&(e=!1),this.isRunning){var n=this.getInterval(e);this.timerId=setTimeout((function(){return u(t,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return[4,this.iteration()];case 1:return e.sent(),[2]}}))}))}),n)}},e.prototype.iteration=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.user.getIdToken(!0)];case 1:return e.sent(),[3,3];case 2:return"auth/network-request-failed"===e.sent().code&&this.schedule(!0),[2];case 3:return this.schedule(),[2]}}))}))},e}(),ye=function(){function e(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}return e.prototype._initializeTime=function(){this.lastSignInTime=fe(this.lastLoginAt),this.creationTime=fe(this.createdAt)},e.prototype._copy=function(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()},e.prototype.toJSON=function(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}},e}();
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
function be(e){var t;return u(this,void 0,void 0,(function(){var n,r,i,o,s,u,d,h,f,p;return c(this,(function(c){switch(c.label){case 0:return n=e.auth,[4,e.getIdToken()];case 1:return r=c.sent(),[4,me(e,he(n,{idToken:r}))];case 2:return z(null==(i=c.sent())?void 0:i.users.length,n,"internal-error"),o=i.users[0],e._notifyReloadListener(o),s=(null===(t=o.providerUserInfo)||void 0===t?void 0:t.length)?o.providerUserInfo.map((function(e){var t=e.providerId,n=a(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[],v=e.providerData,m=s,u=l(l([],v.filter((function(e){return!m.some((function(t){return t.providerId===e.providerId}))}))),m),d=e.isAnonymous,h=!(e.email&&o.passwordHash||(null==u?void 0:u.length)),f=!!d&&h,p={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new ye(o.createdAt,o.lastLoginAt),isAnonymous:f},Object.assign(e,p),[2]}var v,m}))}))}
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
function _e(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,oe(e,{},(function(){var n=w({grant_type:"refresh_token",refresh_token:t}).slice(1),r=e.config,i=r.tokenApiHost,o=r.apiKey,s=ae(e,i,"/v1/token","key="+o);return ee.fetch()(s,{method:"POST",headers:{"X-Client-Version":e._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:n})}))];case 1:return[2,{accessToken:(n=r.sent()).access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}]}}))}))}
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
     */var Ie=function(){function e(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}return Object.defineProperty(e.prototype,"isExpired",{get:function(){return!this.expirationTime||Date.now()>this.expirationTime-3e4},enumerable:!1,configurable:!0}),e.prototype.updateFromServerResponse=function(e){z(e.idToken,"internal-error"),z(void 0!==e.idToken,"internal-error"),z(void 0!==e.refreshToken,"internal-error");var t,n,r="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):(t=e.idToken,z(n=ve(t),"internal-error"),z(void 0!==n.exp,"internal-error"),z(void 0!==n.iat,"internal-error"),Number(n.exp)-Number(n.iat));this.updateTokensAndExpiration(e.idToken,e.refreshToken,r)},e.prototype.getToken=function(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return z(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?[4,this.refresh(e,this.refreshToken)]:[3,2]:[2,this.accessToken];case 1:return n.sent(),[2,this.accessToken];case 2:return[2,null]}}))}))},e.prototype.clearRefreshToken=function(){this.refreshToken=null},e.prototype.refresh=function(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o;return c(this,(function(s){switch(s.label){case 0:return[4,_e(e,t)];case 1:return n=s.sent(),r=n.accessToken,i=n.refreshToken,o=n.expiresIn,this.updateTokensAndExpiration(r,i,Number(o)),[2]}}))}))},e.prototype.updateTokensAndExpiration=function(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n},e.fromJSON=function(t,n){var r=n.refreshToken,i=n.accessToken,o=n.expirationTime,s=new e;return r&&(z("string"==typeof r,"internal-error",{appName:t}),s.refreshToken=r),i&&(z("string"==typeof i,"internal-error",{appName:t}),s.accessToken=i),o&&(z("number"==typeof o,"internal-error",{appName:t}),s.expirationTime=o),s},e.prototype.toJSON=function(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}},e.prototype._assign=function(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime},e.prototype._clone=function(){return Object.assign(new e,this.toJSON())},e.prototype._performRefresh=function(){return q("not implemented")},e}();
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
     */function we(e,t){z("string"==typeof e||void 0===e,"internal-error",{appName:t})}var Te=function(){function e(e){var t=e.uid,n=e.auth,r=e.stsTokenManager,i=a(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new ge(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.metadata=new ye(i.createdAt||void 0,i.lastLoginAt||void 0)}return e.prototype.getIdToken=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,me(this,this.stsTokenManager.getToken(this.auth,e))];case 1:return z(t=n.sent(),this.auth,"internal-error"),this.accessToken===t?[3,3]:(this.accessToken=t,[4,this.auth._persistUserIfCurrent(this)]);case 2:n.sent(),this.auth._notifyListenersIfCurrent(this),n.label=3;case 3:return[2,t]}}))}))},e.prototype.getIdTokenResult=function(e){return function(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n,r,i,o,s;return c(this,(function(a){switch(a.label){case 0:return[4,(n=A(e)).getIdToken(t)];case 1:return r=a.sent(),z((i=ve(r))&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error"),o="object"==typeof i.firebase?i.firebase:void 0,s=null==o?void 0:o.sign_in_provider,[2,{claims:i,token:r,authTime:fe(pe(i.auth_time)),issuedAtTime:fe(pe(i.iat)),expirationTime:fe(pe(i.exp)),signInProvider:s||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}]}}))}))}(this,e)},e.prototype.reload=function(){return function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,be(t=A(e))];case 1:return n.sent(),[4,t.auth._persistUserIfCurrent(t)];case 2:return n.sent(),t.auth._notifyListenersIfCurrent(t),[2]}}))}))}(this)},e.prototype._assign=function(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((function(e){return s({},e)})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))},e.prototype._clone=function(t){return new e(s(s({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}))},e.prototype._onReload=function(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)},e.prototype._notifyReloadListener=function(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e},e.prototype._startProactiveRefresh=function(){this.proactiveRefresh._start()},e.prototype._stopProactiveRefresh=function(){this.proactiveRefresh._stop()},e.prototype._updateTokensIfNecessary=function(e,t){return void 0===t&&(t=!1),u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return n=!1,e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t?[4,be(this)]:[3,2];case 1:r.sent(),r.label=2;case 2:return[4,this.auth._persistUserIfCurrent(this)];case 3:return r.sent(),n&&this.auth._notifyListenersIfCurrent(this),[2]}}))}))},e.prototype.delete=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return[4,this.getIdToken()];case 1:return e=t.sent(),[4,me(this,le(this.auth,{idToken:e}))];case 2:return t.sent(),this.stsTokenManager.clearRefreshToken(),[2,this.auth.signOut()]}}))}))},e.prototype.toJSON=function(){return s(s({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((function(e){return s({},e)})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})},Object.defineProperty(e.prototype,"refreshToken",{get:function(){return this.stsTokenManager.refreshToken||""},enumerable:!1,configurable:!0}),e._fromJSON=function(t,n){var r,i,o,a,u,c,l,d,h=null!==(r=n.displayName)&&void 0!==r?r:void 0,f=null!==(i=n.email)&&void 0!==i?i:void 0,p=null!==(o=n.phoneNumber)&&void 0!==o?o:void 0,v=null!==(a=n.photoURL)&&void 0!==a?a:void 0,m=null!==(u=n.tenantId)&&void 0!==u?u:void 0,g=null!==(c=n._redirectEventId)&&void 0!==c?c:void 0,y=null!==(l=n.createdAt)&&void 0!==l?l:void 0,b=null!==(d=n.lastLoginAt)&&void 0!==d?d:void 0,_=n.uid,I=n.emailVerified,w=n.isAnonymous,T=n.providerData,k=n.stsTokenManager;z(_&&k,t,"internal-error");var E=Ie.fromJSON(this.name,k);z("string"==typeof _,t,"internal-error"),we(h,t.name),we(f,t.name),z("boolean"==typeof I,t,"internal-error"),z("boolean"==typeof w,t,"internal-error"),we(p,t.name),we(v,t.name),we(m,t.name),we(g,t.name),we(y,t.name),we(b,t.name);var R=new e({uid:_,auth:t,email:f,emailVerified:I,displayName:h,isAnonymous:w,photoURL:v,phoneNumber:p,tenantId:m,stsTokenManager:E,createdAt:y,lastLoginAt:b});return T&&Array.isArray(T)&&(R.providerData=T.map((function(e){return s({},e)}))),g&&(R._redirectEventId=g),R},e._fromIdTokenResponse=function(t,n,r){return void 0===r&&(r=!1),u(this,void 0,void 0,(function(){var i,o;return c(this,(function(s){switch(s.label){case 0:return(i=new Ie).updateFromServerResponse(n),[4,be(o=new e({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r}))];case 1:return s.sent(),[2,o]}}))}))},e}(),ke=function(){function e(){this.type="NONE",this.storage={}}return e.prototype._isAvailable=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){return[2,!0]}))}))},e.prototype._set=function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return this.storage[e]=t,[2]}))}))},e.prototype._get=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){return[2,void 0===(t=this.storage[e])?null:t]}))}))},e.prototype._remove=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return delete this.storage[e],[2]}))}))},e.prototype._addListener=function(e,t){},e.prototype._removeListener=function(e,t){},e.type="NONE",e}();
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
function Ee(e,t,n){return"firebase:"+e+":"+t+":"+n}var Re=function(){function e(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;var r=this.auth,i=r.config,o=r.name;this.fullUserKey=Ee(this.userKey,i.apiKey,o),this.fullPersistenceKey=Ee("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}return e.prototype.setCurrentUser=function(e){return this.persistence._set(this.fullUserKey,e.toJSON())},e.prototype.getCurrentUser=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return[4,this.persistence._get(this.fullUserKey)];case 1:return[2,(e=t.sent())?Te._fromJSON(this.auth,e):null]}}))}))},e.prototype.removeCurrentUser=function(){return this.persistence._remove(this.fullUserKey)},e.prototype.savePersistenceForRedirect=function(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)},e.prototype.setPersistence=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return this.persistence===e?[2]:[4,this.getCurrentUser()];case 1:return t=n.sent(),[4,this.removeCurrentUser()];case 2:return n.sent(),this.persistence=e,t?[2,this.setCurrentUser(t)]:[2]}}))}))},e.prototype.delete=function(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)},e.create=function(t,n,r){return void 0===r&&(r="authUser"),u(this,void 0,void 0,(function(){var i,o,s,a,l,d,h,f,p,v,m=this;return c(this,(function(g){switch(g.label){case 0:if(!n.length)return[2,new e(K(ke),t,r)];i=K(ke),o=0,s=n,g.label=1;case 1:return o<s.length?[4,(f=s[o])._isAvailable()]:[3,4];case 2:if(g.sent())return i=f,[3,4];g.label=3;case 3:return o++,[3,1];case 4:a=null,l=Ee(r,t.config.apiKey,t.name),d=0,h=n,g.label=5;case 5:if(!(d<h.length))return[3,10];f=h[d],g.label=6;case 6:return g.trys.push([6,8,,9]),[4,f._get(l)];case 7:return(p=g.sent())?(v=Te._fromJSON(t,p),f!==i&&(a=v),[3,10]):[3,9];case 8:return g.sent(),[3,9];case 9:return d++,[3,5];case 10:return a?[4,i._set(l,a.toJSON())]:[3,12];case 11:g.sent(),g.label=12;case 12:return[4,Promise.all(n.map((function(e){return u(m,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:if(e===i)return[3,4];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,e._remove(l)];case 2:return t.sent(),[3,4];case 3:return t.sent(),[3,4];case 4:return[2]}}))}))})))];case 13:return g.sent(),[2,new e(i,t,r)]}}))}))},e}();
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
     */function Se(e){var t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Ne(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Pe(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Le(t))return"Blackberry";if(De(t))return"Webos";if(Ae(t))return"Safari";if((t.includes("chrome/")||Oe(t))&&!t.includes("edge/"))return"Chrome";if(Ce(t))return"Android";var n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);return 2===(null==n?void 0:n.length)?n[1]:"Other"}function Pe(e){return void 0===e&&(e=h()),/firefox\//i.test(e)}function Ae(e){void 0===e&&(e=h());var t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Oe(e){return void 0===e&&(e=h()),/crios\//i.test(e)}function Ne(e){return void 0===e&&(e=h()),/iemobile/i.test(e)}function Ce(e){return void 0===e&&(e=h()),/android/i.test(e)}function Le(e){return void 0===e&&(e=h()),/blackberry/i.test(e)}function De(e){return void 0===e&&(e=h()),/webos/i.test(e)}function Me(e){return void 0===e&&(e=h()),/iphone|ipad|ipod/i.test(e)}function Ue(e){return void 0===e&&(e=h()),Me(e)||Ce(e)||De(e)||Le(e)||/windows phone/i.test(e)||Ne(e)}
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
function Fe(e,n){var r;switch(void 0===n&&(n=[]),e){case"Browser":r=Se(h());break;case"Worker":r=Se(h())+"-"+e;break;default:r=e}var i=n.length?n.join(","):"FirebaseCore-web";return r+"/JsCore/"+t.SDK_VERSION+"/"+i}
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
     */var xe=function(){function e(e,t){this.app=e,this.config=t,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new je(this),this.idTokenSubscription=new je(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.redirectInitializerError=null,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=F,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=t.sdkClientVersion}return e.prototype._initializeWithPersistence=function(e,t){var n=this;return t&&(this._popupRedirectResolver=K(t)),this._initializationPromise=this.queue((function(){return u(n,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return this._deleted?[2]:(n=this,[4,Re.create(this,e)]);case 1:return n.persistenceManager=i.sent(),this._deleted?[2]:(null===(r=this._popupRedirectResolver)||void 0===r?void 0:r._shouldInitProactively)?[4,this._popupRedirectResolver._initialize(this)]:[3,3];case 2:i.sent(),i.label=3;case 3:return[4,this.initializeCurrentUser(t)];case 4:return i.sent(),this._deleted?[2]:(this._isInitialized=!0,[2])}}))}))})),this._initializationPromise.then((function(){if(n.redirectInitializerError)throw n.redirectInitializerError}))},e.prototype._onStorageEvent=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return this._deleted?[2]:[4,this.assertedPersistence.getCurrentUser()];case 1:return e=t.sent(),this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),[4,this.currentUser.getIdToken()]):[3,3]:[2];case 2:return t.sent(),[2];case 3:return[4,this._updateCurrentUser(e)];case 4:return t.sent(),[2]}}))}))},e.prototype.initializeCurrentUser=function(e){var t;return u(this,void 0,void 0,(function(){var n,r,i,o;return c(this,(function(s){switch(s.label){case 0:return[4,this.assertedPersistence.getCurrentUser()];case 1:return n=s.sent(),e&&this.config.authDomain?[4,this.getOrInitRedirectPersistenceManager()]:[3,4];case 2:return s.sent(),r=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,i=null==n?void 0:n._redirectEventId,[4,this.tryRedirectSignIn(e)];case 3:o=s.sent(),r&&r!==i||!(null==o?void 0:o.user)||(n=o.user),s.label=4;case 4:return n?n._redirectEventId?(z(this._popupRedirectResolver,this,"argument-error"),[4,this.getOrInitRedirectPersistenceManager()]):[2,this.reloadAndSetCurrentUserOrClear(n)]:[2,this.directlySetCurrentUser(null)];case 5:return s.sent(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?[2,this.directlySetCurrentUser(n)]:[2,this.reloadAndSetCurrentUserOrClear(n)]}}))}))},e.prototype.tryRedirectSignIn=function(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:t=null,r.label=1;case 1:return r.trys.push([1,3,,5]),[4,this._popupRedirectResolver._completeRedirectFn(this,e,!0)];case 2:return t=r.sent(),[3,5];case 3:return n=r.sent(),this.redirectInitializerError=n,[4,this._setRedirectUser(null)];case 4:return r.sent(),[3,5];case 5:return[2,t]}}))}))},e.prototype.reloadAndSetCurrentUserOrClear=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,be(e)];case 1:return t.sent(),[3,3];case 2:return"auth/network-request-failed"!==t.sent().code?[2,this.directlySetCurrentUser(null)]:[3,3];case 3:return[2,this.directlySetCurrentUser(e)]}}))}))},e.prototype.useDeviceLanguage=function(){this.languageCode=function(){if("undefined"==typeof navigator)return null;var e=navigator;return e.languages&&e.languages[0]||e.language||null}()},e.prototype._delete=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){return this._deleted=!0,[2]}))}))},e.prototype.updateCurrentUser=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){return(t=e?A(e):null)&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),[2,this._updateCurrentUser(t&&t._clone(this))]}))}))},e.prototype._updateCurrentUser=function(e){return u(this,void 0,void 0,(function(){var t=this;return c(this,(function(n){return this._deleted?[2]:(e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),[2,this.queue((function(){return u(t,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,this.directlySetCurrentUser(e)];case 1:return t.sent(),this.notifyAuthListeners(),[2]}}))}))}))])}))}))},e.prototype.signOut=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return this.redirectPersistenceManager||this._popupRedirectResolver?[4,this._setRedirectUser(null)]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2,this._updateCurrentUser(null)]}}))}))},e.prototype.setPersistence=function(e){var t=this;return this.queue((function(){return u(t,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,this.assertedPersistence.setPersistence(K(e))];case 1:return t.sent(),[2]}}))}))}))},e.prototype._getPersistence=function(){return this.assertedPersistence.persistence.type},e.prototype._updateErrorMap=function(e){this._errorFactory=new b("auth","Firebase",e())},e.prototype.onAuthStateChanged=function(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)},e.prototype.onIdTokenChanged=function(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)},e.prototype.toJSON=function(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}},e.prototype._setRedirectUser=function(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,this.getOrInitRedirectPersistenceManager(t)];case 1:return n=r.sent(),[2,null===e?n.removeCurrentUser():n.setCurrentUser(e)]}}))}))},e.prototype.getOrInitRedirectPersistenceManager=function(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:return this.redirectPersistenceManager?[3,3]:(z(t=e&&K(e)||this._popupRedirectResolver,this,"argument-error"),n=this,[4,Re.create(this,[K(t._redirectPersistence)],"redirectUser")]);case 1:return n.redirectPersistenceManager=i.sent(),r=this,[4,this.redirectPersistenceManager.getCurrentUser()];case 2:r.redirectUser=i.sent(),i.label=3;case 3:return[2,this.redirectPersistenceManager]}}))}))},e.prototype._redirectUserForId=function(e){var t,n;return u(this,void 0,void 0,(function(){var r=this;return c(this,(function(i){switch(i.label){case 0:return this._isInitialized?[4,this.queue((function(){return u(r,void 0,void 0,(function(){return c(this,(function(e){return[2]}))}))}))]:[3,2];case 1:i.sent(),i.label=2;case 2:return(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?[2,this._currentUser]:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?[2,this.redirectUser]:[2,null]}}))}))},e.prototype._persistUserIfCurrent=function(e){return u(this,void 0,void 0,(function(){var t=this;return c(this,(function(n){return e===this.currentUser?[2,this.queue((function(){return u(t,void 0,void 0,(function(){return c(this,(function(t){return[2,this.directlySetCurrentUser(e)]}))}))}))]:[2]}))}))},e.prototype._notifyListenersIfCurrent=function(e){e===this.currentUser&&this.notifyAuthListeners()},e.prototype._key=function(){return this.config.authDomain+":"+this.config.apiKey+":"+this.name},e.prototype._startProactiveRefresh=function(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()},e.prototype._stopProactiveRefresh=function(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()},Object.defineProperty(e.prototype,"_currentUser",{get:function(){return this.currentUser},enumerable:!1,configurable:!0}),e.prototype.notifyAuthListeners=function(){var e,t;if(this._isInitialized){this.idTokenSubscription.next(this.currentUser);var n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}},e.prototype.registerStateListener=function(e,t,n,r){var i=this;if(this._deleted)return function(){};var o="function"==typeof t?t:t.next,s=this._isInitialized?Promise.resolve():this._initializationPromise;return z(s,this,"internal-error"),s.then((function(){return o(i.currentUser)})),"function"==typeof t?e.addObserver(t,n,r):e.addObserver(t)},e.prototype.directlySetCurrentUser=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?[4,this.assertedPersistence.setCurrentUser(e)]:[3,2];case 1:return t.sent(),[3,4];case 2:return[4,this.assertedPersistence.removeCurrentUser()];case 3:t.sent(),t.label=4;case 4:return[2]}}))}))},e.prototype.queue=function(e){return this.operations=this.operations.then(e,e),this.operations},Object.defineProperty(e.prototype,"assertedPersistence",{get:function(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager},enumerable:!1,configurable:!0}),e.prototype._logFramework=function(e){this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fe(this.config.clientPlatform,this._getFrameworks()))},e.prototype._getFrameworks=function(){return this.frameworks},e.prototype._getSdkClientVersion=function(){return this.clientVersion},e}();function Ve(e){return A(e)}var je=function(){function e(e){var t,n,r=this;this.auth=e,this.observer=null,this.addObserver=(n=new S((function(e){return r.observer=e}),t)).subscribe.bind(n)}return Object.defineProperty(e.prototype,"next",{get:function(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)},enumerable:!1,configurable:!0}),e}();function We(e,t,n){var r=Ve(e);z(r._canInitEmulator,r,"emulator-config-failed"),z(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");var i=!!(null==n?void 0:n.disableWarnings),o=He(t),s=function(e){var t=He(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};var r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i)return{host:o=i[1],port:ze(r.substr(o.length+1))};var o,s=r.split(":");return{host:o=s[0],port:ze(s[1])}}(t),a=s.host,u=s.port,c=null===u?"":":"+u;r.config.emulator={url:o+"//"+a+c+"/"},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),function(e){function t(){var e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#ff0000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"==typeof window||"undefined"==typeof document||e||("loading"===document.readyState?window.addEventListener("DOMContentLoaded",t):t())}
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
     */(i)}function He(e){var t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function ze(e){if(!e)return null;var t=Number(e);return isNaN(t)?null:t}var qe=function(){function e(e,t){this.providerId=e,this.signInMethod=t}return e.prototype.toJSON=function(){return q("not implemented")},e.prototype._getIdTokenResponse=function(e){return q("not implemented")},e.prototype._linkToIdToken=function(e,t){return q("not implemented")},e.prototype._getReauthenticationResolver=function(e){return q("not implemented")},e}();
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
     */function Be(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:resetPassword",re(e,t))]}))}))}function Ge(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:update",t)]}))}))}function Ke(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:update",re(e,t))]}))}))}
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
     */function Je(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithPassword",re(e,t))]}))}))}function Ye(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:sendOobCode",re(e,t))]}))}))}function Xe(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,Ye(e,t)]}))}))}function Ze(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,Ye(e,t)]}))}))}function $e(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,Ye(e,t)]}))}))}function Qe(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,Ye(e,t)]}))}))}
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
     */function et(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithEmailLink",re(e,t))]}))}))}function tt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithEmailLink",re(e,t))]}))}))}
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
     */var nt=function(e){function t(t,n,r,i){void 0===i&&(i=null);var o=e.call(this,"password",r)||this;return o._email=t,o._password=n,o._tenantId=i,o}return o(t,e),t._fromEmailAndPassword=function(e,n){return new t(e,n,"password")},t._fromEmailAndCode=function(e,n,r){return void 0===r&&(r=null),new t(e,n,"emailLink",r)},t.prototype.toJSON=function(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}},t.fromJSON=function(e){var t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null},t.prototype._getIdTokenResponse=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(this.signInMethod){case"password":return[2,Je(e,{returnSecureToken:!0,email:this._email,password:this._password})];case"emailLink":return[2,et(e,{email:this._email,oobCode:this._password})];default:j(e,"internal-error")}return[2]}))}))},t.prototype._linkToIdToken=function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(this.signInMethod){case"password":return[2,Ge(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password})];case"emailLink":return[2,tt(e,{idToken:t,email:this._email,oobCode:this._password})];default:j(e,"internal-error")}return[2]}))}))},t.prototype._getReauthenticationResolver=function(e){return this._getIdTokenResponse(e)},t}(qe);
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
     */function rt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithIdp",re(e,t))]}))}))}
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
     */var it,ot=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.pendingToken=null,t}return o(t,e),t._fromParams=function(e){var n=new t(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):j("argument-error"),n},t.prototype.toJSON=function(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}},t.fromJSON=function(e){var n="string"==typeof e?JSON.parse(e):e,r=n.providerId,i=n.signInMethod,o=a(n,["providerId","signInMethod"]);if(!r||!i)return null;var s=new t(r,i);return Object.assign(s,o),s},t.prototype._getIdTokenResponse=function(e){return rt(e,this.buildRequest())},t.prototype._linkToIdToken=function(e,t){var n=this.buildRequest();return n.idToken=t,rt(e,n)},t.prototype._getReauthenticationResolver=function(e){var t=this.buildRequest();return t.autoCreate=!1,rt(e,t)},t.prototype.buildRequest=function(){var e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{var t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=w(t)}return e},t}(qe);function st(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:sendVerificationCode",re(e,t))]}))}))}var at=((it={}).USER_NOT_FOUND="user-not-found",it);
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
var ut=function(e){function t(t){var n=e.call(this,"phone","phone")||this;return n.params=t,n}return o(t,e),t._fromVerification=function(e,n){return new t({verificationId:e,verificationCode:n})},t._fromTokenResponse=function(e,n){return new t({phoneNumber:e,temporaryProof:n})},t.prototype._getIdTokenResponse=function(e){return function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithPhoneNumber",re(e,t))]}))}))}(e,this._makeVerificationRequest())},t.prototype._linkToIdToken=function(e,t){return function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithPhoneNumber",re(e,t))]}))}))}(e,s({idToken:t},this._makeVerificationRequest()))},t.prototype._getReauthenticationResolver=function(e){return function(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){return n=s(s({},t),{operation:"REAUTH"}),[2,se(e,"POST","/v1/accounts:signInWithPhoneNumber",re(e,n),at)]}))}))}(e,this._makeVerificationRequest())},t.prototype._makeVerificationRequest=function(){var e=this.params,t=e.temporaryProof,n=e.phoneNumber,r=e.verificationId,i=e.verificationCode;return t&&n?{temporaryProof:t,phoneNumber:n}:{sessionInfo:r,code:i}},t.prototype.toJSON=function(){var e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e},t.fromJSON=function(e){"string"==typeof e&&(e=JSON.parse(e));var n=e,r=n.verificationId,i=n.verificationCode,o=n.phoneNumber,s=n.temporaryProof;return i||r||o||s?new t({verificationId:r,verificationCode:i,phoneNumber:o,temporaryProof:s}):null},t}(qe);
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
     */var ct=function(){function e(e){var t,n,r,i,o,s,a=T(k(e)),u=null!==(t=a.apiKey)&&void 0!==t?t:null,c=null!==(n=a.oobCode)&&void 0!==n?n:null,l=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);z(u&&c&&l,"argument-error"),this.apiKey=u,this.operation=l,this.code=c,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(o=a.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(s=a.tenantId)&&void 0!==s?s:null}return e.parseLink=function(t){var n=function(e){var t=T(k(e)).link,n=t?T(k(t)).deep_link_id:null,r=T(k(e)).deep_link_id;return(r?T(k(r)).link:null)||r||n||t||e}(t);try{return new e(n)}catch(e){return null}},e}(),lt=function(){function e(){this.providerId=e.PROVIDER_ID}return e.credential=function(e,t){return nt._fromEmailAndPassword(e,t)},e.credentialWithLink=function(e,t){var n=ct.parseLink(t);return z(n,"argument-error"),nt._fromEmailAndCode(e,n.code,n.tenantId)},e.PROVIDER_ID="password",e.EMAIL_PASSWORD_SIGN_IN_METHOD="password",e.EMAIL_LINK_SIGN_IN_METHOD="emailLink",e}(),dt=function(){function e(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}return e.prototype.setDefaultLanguage=function(e){this.defaultLanguageCode=e},e.prototype.setCustomParameters=function(e){return this.customParameters=e,this},e.prototype.getCustomParameters=function(){return this.customParameters},e}(),ht=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.scopes=[],t}return o(t,e),t.prototype.addScope=function(e){return this.scopes.includes(e)||this.scopes.push(e),this},t.prototype.getScopes=function(){return l([],this.scopes)},t}(dt),ft=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.credentialFromJSON=function(e){var t="string"==typeof e?JSON.parse(e):e;return z("providerId"in t&&"signInMethod"in t,"argument-error"),ot._fromParams(t)},t.prototype.credential=function(e){return this._credential(e)},t.prototype._credential=function(e){return z(e.idToken||e.accessToken,"argument-error"),ot._fromParams(s(s({},e),{providerId:this.providerId,signInMethod:this.providerId}))},t.credentialFromResult=function(e){return t.oauthCredentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.oauthCredentialFromTaggedObject(e.customData||{})},t.oauthCredentialFromTaggedObject=function(e){var n=e._tokenResponse;if(!n)return null;var r=n,i=r.oauthIdToken,o=r.oauthAccessToken,s=r.oauthTokenSecret,a=r.pendingToken,u=r.nonce,c=r.providerId;if(!(o||s||i||a))return null;if(!c)return null;try{return new t(c)._credential({idToken:i,accessToken:o,rawNonce:u,pendingToken:a})}catch(e){return null}},t}(ht),pt=function(e){function t(){return e.call(this,"facebook.com")||this}return o(t,e),t.credential=function(e){return ot._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})},t.credentialFromResult=function(e){return t.credentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.credentialFromTaggedObject(e.customData||{})},t.credentialFromTaggedObject=function(e){var n=e._tokenResponse;if(!n||!("oauthAccessToken"in n))return null;if(!n.oauthAccessToken)return null;try{return t.credential(n.oauthAccessToken)}catch(e){return null}},t.FACEBOOK_SIGN_IN_METHOD="facebook.com",t.PROVIDER_ID="facebook.com",t}(ht),vt=function(e){function t(){var t=e.call(this,"google.com")||this;return t.addScope("profile"),t}return o(t,e),t.credential=function(e,n){return ot._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})},t.credentialFromResult=function(e){return t.credentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.credentialFromTaggedObject(e.customData||{})},t.credentialFromTaggedObject=function(e){var n=e._tokenResponse;if(!n)return null;var r=n,i=r.oauthIdToken,o=r.oauthAccessToken;if(!i&&!o)return null;try{return t.credential(i,o)}catch(e){return null}},t.GOOGLE_SIGN_IN_METHOD="google.com",t.PROVIDER_ID="google.com",t}(ht),mt=function(e){function t(){return e.call(this,"github.com")||this}return o(t,e),t.credential=function(e){return ot._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.GITHUB_SIGN_IN_METHOD,accessToken:e})},t.credentialFromResult=function(e){return t.credentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.credentialFromTaggedObject(e.customData||{})},t.credentialFromTaggedObject=function(e){var n=e._tokenResponse;if(!n||!("oauthAccessToken"in n))return null;if(!n.oauthAccessToken)return null;try{return t.credential(n.oauthAccessToken)}catch(e){return null}},t.GITHUB_SIGN_IN_METHOD="github.com",t.PROVIDER_ID="github.com",t}(ht),gt=function(e){function t(t,n){var r=e.call(this,t,t)||this;return r.pendingToken=n,r}return o(t,e),t.prototype._getIdTokenResponse=function(e){return rt(e,this.buildRequest())},t.prototype._linkToIdToken=function(e,t){var n=this.buildRequest();return n.idToken=t,rt(e,n)},t.prototype._getReauthenticationResolver=function(e){var t=this.buildRequest();return t.autoCreate=!1,rt(e,t)},t.prototype.toJSON=function(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}},t.fromJSON=function(e){var n="string"==typeof e?JSON.parse(e):e,r=n.providerId,i=n.signInMethod,o=n.pendingToken;return r&&i&&o&&r===i?new t(r,o):null},t._create=function(e,n){return new t(e,n)},t.prototype.buildRequest=function(){return{requestUri:"http://localhost",returnSecureToken:!0,pendingToken:this.pendingToken}},t}(qe),yt=(function(e){function t(t){return z(t.startsWith("saml."),"argument-error"),e.call(this,t)||this}o(t,e),t.credentialFromResult=function(e){return t.samlCredentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.samlCredentialFromTaggedObject(e.customData||{})},t.credentialFromJSON=function(e){var t=gt.fromJSON(e);return z(t,"argument-error"),t},t.samlCredentialFromTaggedObject=function(e){var t=e._tokenResponse;if(!t)return null;var n=t,r=n.pendingToken,i=n.providerId;if(!r||!i)return null;try{return gt._create(i,r)}catch(e){return null}}}(dt),function(e){function t(){return e.call(this,"twitter.com")||this}return o(t,e),t.credential=function(e,n){return ot._fromParams({providerId:t.PROVIDER_ID,signInMethod:t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})},t.credentialFromResult=function(e){return t.credentialFromTaggedObject(e)},t.credentialFromError=function(e){return t.credentialFromTaggedObject(e.customData||{})},t.credentialFromTaggedObject=function(e){var n=e._tokenResponse;if(!n)return null;var r=n,i=r.oauthAccessToken,o=r.oauthTokenSecret;if(!i||!o)return null;try{return t.credential(i,o)}catch(e){return null}},t.TWITTER_SIGN_IN_METHOD="twitter.com",t.PROVIDER_ID="twitter.com",t}(ht));
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
function bt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signUp",re(e,t))]}))}))}
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
     */var _t=function(){function e(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}return e._fromIdTokenResponse=function(t,n,r,i){return void 0===i&&(i=!1),u(this,void 0,void 0,(function(){var o,s;return c(this,(function(a){switch(a.label){case 0:return[4,Te._fromIdTokenResponse(t,r,i)];case 1:return o=a.sent(),s=It(r),[2,new e({user:o,providerId:s,_tokenResponse:r,operationType:n})]}}))}))},e._forOperation=function(t,n,r){return u(this,void 0,void 0,(function(){var i;return c(this,(function(o){switch(o.label){case 0:return[4,t._updateTokensIfNecessary(r,!0)];case 1:return o.sent(),i=It(r),[2,new e({user:t,providerId:i,_tokenResponse:r,operationType:n})]}}))}))},e}();function It(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
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
var wt=function(e){function t(n,r,i,o){var s,a=e.call(this,r.code,r.message)||this;return a.operationType=i,a.user=o,a.name="FirebaseError",Object.setPrototypeOf(a,t.prototype),a.appName=n.name,a.code=r.code,a.tenantId=null!==(s=n.tenantId)&&void 0!==s?s:void 0,a.serverResponse=r.customData.serverResponse,a}return o(t,e),t._fromErrorAndOperation=function(e,n,r,i){return new t(e,n,r,i)},t}(y);function Tt(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((function(n){if("auth/multi-factor-auth-required"===n.code)throw wt._fromErrorAndOperation(e,n,t,r);throw n}))}
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
     */function kt(e){return new Set(e.map((function(e){return e.providerId})).filter((function(e){return!!e})))}
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
     */function Et(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o,s,a;return c(this,(function(u){switch(u.label){case 0:return[4,St(!0,n=A(e),t)];case 1:return u.sent(),i=de,o=[n.auth],a={},[4,n.getIdToken()];case 2:return[4,i.apply(void 0,o.concat([(a.idToken=u.sent(),a.deleteProvider=[t],a)]))];case 3:return r=u.sent().providerUserInfo,s=kt(r||[]),n.providerData=n.providerData.filter((function(e){return s.has(e.providerId)})),s.has("phone")||(n.phoneNumber=null),[4,n.auth._persistUserIfCurrent(n)];case 4:return u.sent(),[2,n]}}))}))}function Rt(e,t,n){return void 0===n&&(n=!1),u(this,void 0,void 0,(function(){var r,i,o,s,a,u;return c(this,(function(c){switch(c.label){case 0:return i=me,o=[e],a=(s=t)._linkToIdToken,u=[e.auth],[4,e.getIdToken()];case 1:return[4,i.apply(void 0,o.concat([a.apply(s,u.concat([c.sent()])),n]))];case 2:return r=c.sent(),[2,_t._forOperation(e,"link",r)]}}))}))}function St(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return[4,be(t)];case 1:return o.sent(),r=kt(t.providerData),i=!1===e?"provider-already-linked":"no-such-provider",z(r.has(n)===e,t.auth,i),[2]}}))}))}
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
     */function Pt(e,t,n){return void 0===n&&(n=!1),u(this,void 0,void 0,(function(){var r,i,o,s,a,u;return c(this,(function(c){switch(c.label){case 0:r=e.auth,i="reauthenticate",c.label=1;case 1:return c.trys.push([1,3,,4]),[4,me(e,Tt(r,i,t,e),n)];case 2:return z((o=c.sent()).idToken,r,"internal-error"),z(s=ve(o.idToken),r,"internal-error"),a=s.sub,z(e.uid===a,r,"user-mismatch"),[2,_t._forOperation(e,i,o)];case 3:throw"auth/user-not-found"===(null==(u=c.sent())?void 0:u.code)&&j(r,"user-mismatch"),u;case 4:return[2]}}))}))}
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
     */function At(e,t,n){return void 0===n&&(n=!1),u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return[4,Tt(e,r="signIn",t)];case 1:return i=s.sent(),[4,_t._fromIdTokenResponse(e,r,i)];case 2:return o=s.sent(),n?[3,4]:[4,e._updateCurrentUser(o.user)];case 3:s.sent(),s.label=4;case 4:return[2,o]}}))}))}function Ot(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,At(Ve(e),t)]}))}))}function Nt(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,St(!1,n=A(e),t.providerId)];case 1:return r.sent(),[2,Rt(n,t)]}}))}))}function Ct(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,Pt(A(e),t)]}))}))}
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
     */function Lt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,se(e,"POST","/v1/accounts:signInWithCustomToken",re(e,t))]}))}))}
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
var Dt=function(){function e(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}return e._fromServerResponse=function(e,t){return"phoneInfo"in t?Mt._fromServerResponse(e,t):j(e,"internal-error")},e}(),Mt=function(e){function t(t){var n=e.call(this,"phone",t)||this;return n.phoneNumber=t.phoneInfo,n}return o(t,e),t._fromServerResponse=function(e,n){return new t(n)},t}(Dt);
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
function Ut(e,t,n){var r;z((null===(r=n.url)||void 0===r?void 0:r.length)>0,e,"invalid-continue-uri"),z(void 0===n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(z(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iosBundleId=n.iOS.bundleId),n.android&&(z(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
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
     */function Ft(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o;return c(this,(function(s){switch(s.label){case 0:return[4,Be(n=A(e),{oobCode:t})];case 1:switch(r=s.sent(),z(i=r.requestType,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":z(r.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":z(r.mfaInfo,n,"internal-error");default:z(r.email,n,"internal-error")}return o=null,r.mfaInfo&&(o=Dt._fromServerResponse(Ve(n),r.mfaInfo)),[2,{data:{email:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.newEmail:r.email)||null,previousEmail:("VERIFY_AND_CHANGE_EMAIL"===r.requestType?r.email:r.newEmail)||null,multiFactorInfo:o},operation:i}]}}))}))}function xt(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return[4,bt(r=Ve(e),{returnSecureToken:!0,email:t,password:n})];case 1:return i=s.sent(),[4,_t._fromIdTokenResponse(r,"signIn",i)];case 2:return o=s.sent(),[4,r._updateCurrentUser(o.user)];case 3:return s.sent(),[2,o]}}))}))}
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
function Vt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:createAuthUri",re(e,t))]}))}))}
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
function jt(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,ie(e,"POST","/v1/accounts:update",t)]}))}))}
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
     */function Wt(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o,s;return c(this,(function(a){switch(a.label){case 0:return r=e.auth,[4,e.getIdToken()];case 1:return i=a.sent(),o={idToken:i,returnSecureToken:!0},t&&(o.email=t),n&&(o.password=n),[4,me(e,Ge(r,o))];case 2:return s=a.sent(),[4,e._updateTokensIfNecessary(s,!0)];case 3:return a.sent(),[2]}}))}))}
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
     */var Ht=function(e,t,n){void 0===n&&(n={}),this.isNewUser=e,this.providerId=t,this.profile=n},zt=function(e){function t(t,n,r,i){var o=e.call(this,t,n,r)||this;return o.username=i,o}return o(t,e),t}(Ht),qt=function(e){function t(t,n){return e.call(this,t,"facebook.com",n)||this}return o(t,e),t}(Ht),Bt=function(e){function t(t,n){return e.call(this,t,"github.com",n,"string"==typeof(null==n?void 0:n.login)?null==n?void 0:n.login:null)||this}return o(t,e),t}(zt),Gt=function(e){function t(t,n){return e.call(this,t,"google.com",n)||this}return o(t,e),t}(Ht),Kt=function(e){function t(t,n,r){return e.call(this,t,"twitter.com",n,r)||this}return o(t,e),t}(zt);function Jt(e){var t=e,n=t.user,r=t._tokenResponse;return n.isAnonymous&&!r?{providerId:null,isNewUser:!1,profile:null}:function(e){var t,n;if(!e)return null;var r=e.providerId,i=e.rawUserInfo?JSON.parse(e.rawUserInfo):{},o=e.isNewUser||"identitytoolkit#SignupNewUserResponse"===e.kind;if(!r&&(null==e?void 0:e.idToken)){var s=null===(n=null===(t=ve(e.idToken))||void 0===t?void 0:t.firebase)||void 0===n?void 0:n.sign_in_provider;if(s)return new Ht(o,"anonymous"!==s&&"custom"!==s?s:null)}if(!r)return null;switch(r){case"facebook.com":return new qt(o,i);case"github.com":return new Bt(o,i);case"google.com":return new Gt(o,i);case"twitter.com":return new Kt(o,i,e.screenName||null);case"custom":case"anonymous":return new Ht(o,null);default:return new Ht(o,r,i)}}(r)}var Yt=function(){function e(e,t){this.type=e,this.credential=t}return e._fromIdtoken=function(t){return new e("enroll",t)},e._fromMfaPendingCredential=function(t){return new e("signin",t)},e.prototype.toJSON=function(){var e;return{multiFactorSession:(e={},e["enroll"===this.type?"idToken":"pendingCredential"]=this.credential,e)}},e.fromJSON=function(t){var n,r;if(null==t?void 0:t.multiFactorSession){if(null===(n=t.multiFactorSession)||void 0===n?void 0:n.pendingCredential)return e._fromMfaPendingCredential(t.multiFactorSession.pendingCredential);if(null===(r=t.multiFactorSession)||void 0===r?void 0:r.idToken)return e._fromIdtoken(t.multiFactorSession.idToken)}return null},e}(),Xt=function(){function e(e,t,n){this.session=e,this.hints=t,this.signInResolver=n}return e._fromError=function(t,n){var r=this,i=Ve(t),o=(n.serverResponse.mfaInfo||[]).map((function(e){return Dt._fromServerResponse(i,e)}));z(n.serverResponse.mfaPendingCredential,i,"internal-error");var a=Yt._fromMfaPendingCredential(n.serverResponse.mfaPendingCredential);return new e(a,o,(function(e){return u(r,void 0,void 0,(function(){var t,r,o;return c(this,(function(u){switch(u.label){case 0:return[4,e._process(i,a)];case 1:switch(t=u.sent(),delete n.serverResponse.mfaInfo,delete n.serverResponse.mfaPendingCredential,r=s(s({},n.serverResponse),{idToken:t.idToken,refreshToken:t.refreshToken}),n.operationType){case"signIn":return[3,2];case"reauthenticate":return[3,5]}return[3,6];case 2:return[4,_t._fromIdTokenResponse(i,n.operationType,r)];case 3:return o=u.sent(),[4,i._updateCurrentUser(o.user)];case 4:return u.sent(),[2,o];case 5:return z(n.user,i,"internal-error"),[2,_t._forOperation(n.user,n.operationType,r)];case 6:j(i,"internal-error"),u.label=7;case 7:return[2]}}))}))}))},e.prototype.resolveSignIn=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){return t=e,[2,this.signInResolver(t)]}))}))},e}();
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
function Zt(e,t){return ie(e,"POST","/v2/accounts/mfaEnrollment:start",s({tenantId:e.tenantId},t))}var $t=function(){function e(e){var t=this;this.user=e,this.enrolledFactors=[],e._onReload((function(n){n.mfaInfo&&(t.enrolledFactors=n.mfaInfo.map((function(t){return Dt._fromServerResponse(e.auth,t)})))}))}return e._fromUser=function(t){return new e(t)},e.prototype.getSession=function(){return u(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return t=(e=Yt)._fromIdtoken,[4,this.user.getIdToken()];case 1:return[2,t.apply(e,[n.sent()])]}}))}))},e.prototype.enroll=function(e,t){return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return n=e,[4,this.getSession()];case 1:return r=o.sent(),[4,me(this.user,n._process(this.user.auth,r,t))];case 2:return i=o.sent(),[4,this.user._updateTokensIfNecessary(i)];case 3:return o.sent(),[2,this.user.reload()]}}))}))},e.prototype.unenroll=function(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return t="string"==typeof e?e:e.uid,[4,this.user.getIdToken()];case 1:return n=o.sent(),[4,me(this.user,(a=this.user.auth,u={idToken:n,mfaEnrollmentId:t},ie(a,"POST","/v2/accounts/mfaEnrollment:withdraw",s({tenantId:a.tenantId},u))))];case 2:return r=o.sent(),this.enrolledFactors=this.enrolledFactors.filter((function(e){return e.uid!==t})),[4,this.user._updateTokensIfNecessary(r)];case 3:o.sent(),o.label=4;case 4:return o.trys.push([4,6,,7]),[4,this.user.reload()];case 5:return o.sent(),[3,7];case 6:if("auth/user-token-expired"!==(i=o.sent()).code)throw i;return[3,7];case 7:return[2]}var a,u}))}))},e}(),Qt=new WeakMap;var en=function(){function e(e){this.auth=e,this.internalListeners=new Map}return e.prototype.getUid=function(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null},e.prototype.getToken=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return this.assertAuthConfigured(),[4,this.auth._initializationPromise];case 1:return t.sent(),this.auth.currentUser?[4,this.auth.currentUser.getIdToken(e)]:[2,null];case 2:return[2,{accessToken:t.sent()}]}}))}))},e.prototype.addAuthTokenListener=function(e){if(this.assertAuthConfigured(),!this.internalListeners.has(e)){var t=this.auth.onIdTokenChanged((function(t){var n;e((null===(n=t)||void 0===n?void 0:n.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}},e.prototype.removeAuthTokenListener=function(e){this.assertAuthConfigured();var t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())},e.prototype.assertAuthConfigured=function(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")},e.prototype.updateProactiveRefresh=function(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()},e}();var tn="__sak",nn=function(){function e(e,t){this.storage=e,this.type=t}return e.prototype._isAvailable=function(){try{return this.storage?(this.storage.setItem(tn,"1"),this.storage.removeItem(tn),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}},e.prototype._set=function(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()},e.prototype._get=function(e){var t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)},e.prototype._remove=function(e){return this.storage.removeItem(e),Promise.resolve()},e}();
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
     */var rn=function(e){function t(){var t,n=e.call(this,window.localStorage,"LOCAL")||this;return n.listeners={},n.localCache={},n.pollTimer=null,n.safariLocalStorageNotSynced=(Ae(t=h())||Me(t))&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),n.fallbackToPolling=Ue(),n.boundEventHandler=n.onStorageEvent.bind(n),n}return o(t,e),t.prototype.forAllChangedKeys=function(e){for(var t=0,n=Object.keys(this.listeners);t<n.length;t++){var r=n[t],i=this.storage.getItem(r),o=this.localCache[r];i!==o&&e(r,o,i)}},t.prototype.onStorageEvent=function(e,t){var n=this;if(void 0===t&&(t=!1),e.key){var r=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){var i=this.storage.getItem(r);if(e.newValue!==i)null!==e.newValue?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!t)return}var o=function(){var e=n.storage.getItem(r);(t||n.localCache[r]!==e)&&n.notifyListeners(r,e)},s=this.storage.getItem(r);m()&&10===document.documentMode&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,10):o()}else this.forAllChangedKeys((function(e,t,r){n.notifyListeners(e,r)}))},t.prototype.notifyListeners=function(e,t){this.localCache[e]=t;var n=this.listeners[e];if(n)for(var r=0,i=Array.from(n);r<i.length;r++){(0,i[r])(t?JSON.parse(t):t)}},t.prototype.startPolling=function(){var e=this;this.stopPolling(),this.pollTimer=setInterval((function(){e.forAllChangedKeys((function(t,n,r){e.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)}))}),1e3)},t.prototype.stopPolling=function(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)},t.prototype.attachListener=function(){window.addEventListener("storage",this.boundEventHandler)},t.prototype.detachListener=function(){window.removeEventListener("storage",this.boundEventHandler)},t.prototype._addListener=function(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)},t.prototype._removeListener=function(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())},t.prototype._set=function(t,n){return u(this,void 0,void 0,(function(){return c(this,(function(r){switch(r.label){case 0:return[4,e.prototype._set.call(this,t,n)];case 1:return r.sent(),this.localCache[t]=JSON.stringify(n),[2]}}))}))},t.prototype._get=function(t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,e.prototype._get.call(this,t)];case 1:return n=r.sent(),this.localCache[t]=JSON.stringify(n),[2,n]}}))}))},t.prototype._remove=function(t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,e.prototype._remove.call(this,t)];case 1:return n.sent(),delete this.localCache[t],[2]}}))}))},t.type="LOCAL",t}(nn);
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
function on(e){var t=this;return Promise.all(e.map((function(e){return u(t,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,e];case 1:return[2,{fulfilled:!0,value:t.sent()}];case 2:return[2,{fulfilled:!1,reason:t.sent()}];case 3:return[2]}}))}))})))}
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
     */var sn=function(){function e(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}return e._getInstance=function(t){var n=this.receivers.find((function(e){return e.isListeningto(t)}));if(n)return n;var r=new e(t);return this.receivers.push(r),r},e.prototype.isListeningto=function(e){return this.eventTarget===e},e.prototype.handleEvent=function(e){return u(this,void 0,void 0,(function(){var t,n,r,i,o,s,a,l=this;return c(this,(function(d){switch(d.label){case 0:return n=(t=e).data,r=n.eventId,i=n.eventType,o=n.data,(null==(s=this.handlersMap[i])?void 0:s.size)?(t.ports[0].postMessage({status:"ack",eventId:r,eventType:i}),[4,on(Array.from(s).map((function(e){return u(l,void 0,void 0,(function(){return c(this,(function(n){return[2,e(t.origin,o)]}))}))})))]):[2];case 1:return a=d.sent(),t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:a}),[2]}}))}))},e.prototype._subscribe=function(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)},e.prototype._unsubscribe=function(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)},e.receivers=[],e}();
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
     */var an=function(){function e(e){this.target=e,this.handlers=new Set}return e.prototype.removeMessageHandler=function(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)},e.prototype._send=function(e,t,n){return void 0===n&&(n=50),u(this,void 0,void 0,(function(){var r,i,o,s=this;return c(this,(function(a){if(!(r="undefined"!=typeof MessageChannel?new MessageChannel:null))throw new Error("connection_unavailable");return[2,new Promise((function(a,u){var c,l,d=(void 0===c&&(c=""),void 0===l&&(l=20),""+c+Math.floor(Math.random()*Math.pow(10,l)));r.port1.start();var h=setTimeout((function(){u(new Error("unsupported_event"))}),n);o={messageChannel:r,onMessage:function(e){var t=e;if(t.data.eventId===d)switch(t.data.status){case"ack":clearTimeout(h),i=setTimeout((function(){u(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),a(t.data.response);break;default:clearTimeout(h),clearTimeout(i),u(new Error("invalid_response"))}}},s.handlers.add(o),r.port1.addEventListener("message",o.onMessage),s.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])})).finally((function(){o&&s.removeMessageHandler(o)}))]}))}))},e}();
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
     */function un(){return window}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
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
function cn(){return void 0!==un().WorkerGlobalScope&&"function"==typeof un().importScripts}function ln(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return[2,null];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,navigator.serviceWorker.ready];case 2:return[2,e.sent().active];case 3:return e.sent(),[2,null];case 4:return[2]}}))}))}
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
var dn="firebaseLocalStorageDb",hn="firebaseLocalStorage",fn="fbase_key",pn=function(){function e(e){this.request=e}return e.prototype.toPromise=function(){var e=this;return new Promise((function(t,n){e.request.addEventListener("success",(function(){t(e.request.result)})),e.request.addEventListener("error",(function(){n(e.request.error)}))}))},e}();function vn(e,t){return e.transaction([hn],t?"readwrite":"readonly").objectStore(hn)}function mn(){var e=indexedDB.deleteDatabase(dn);return new pn(e).toPromise()}function gn(){var e=this,t=indexedDB.open(dn,1);return new Promise((function(n,r){t.addEventListener("error",(function(){r(t.error)})),t.addEventListener("upgradeneeded",(function(){var e=t.result;try{e.createObjectStore(hn,{keyPath:fn})}catch(e){r(e)}})),t.addEventListener("success",(function(){return u(e,void 0,void 0,(function(){var e;return c(this,(function(r){switch(r.label){case 0:return(e=t.result).objectStoreNames.contains(hn)?[3,2]:[4,mn()];case 1:return r.sent(),[2,gn()];case 2:n(e),r.label=3;case 3:return[2]}}))}))}))}))}function yn(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){return r=vn(e,!0).put(((i={}).fbase_key=t,i.value=n,i)),[2,new pn(r).toPromise()]}))}))}function bn(e,t){var n=vn(e,!0).delete(t);return new pn(n).toPromise()}var _n=function(){function e(){this.type="LOCAL",this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((function(){}),(function(){}))}return e.prototype._openDb=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return this.db?[2,this.db]:(e=this,[4,gn()]);case 1:return e.db=t.sent(),[2,this.db]}}))}))},e.prototype._withRetries=function(e){return u(this,void 0,void 0,(function(){var t,n,r;return c(this,(function(i){switch(i.label){case 0:t=0,i.label=1;case 1:i.label=2;case 2:return i.trys.push([2,5,,6]),[4,this._openDb()];case 3:return n=i.sent(),[4,e(n)];case 4:return[2,i.sent()];case 5:if(r=i.sent(),t++>3)throw r;return this.db&&(this.db.close(),this.db=void 0),[3,6];case 6:return[3,1];case 7:return[2]}}))}))},e.prototype.initializeServiceWorkerMessaging=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){return[2,cn()?this.initializeReceiver():this.initializeSender()]}))}))},e.prototype.initializeReceiver=function(){return u(this,void 0,void 0,(function(){var e=this;return c(this,(function(t){return this.receiver=sn._getInstance(cn()?self:null),this.receiver._subscribe("keyChanged",(function(t,n){return u(e,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return[4,this._poll()];case 1:return[2,{keyProcessed:e.sent().includes(n.key)}]}}))}))})),this.receiver._subscribe("ping",(function(t,n){return u(e,void 0,void 0,(function(){return c(this,(function(e){return[2,["keyChanged"]]}))}))})),[2]}))}))},e.prototype.initializeSender=function(){var e,t;return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return n=this,[4,ln()];case 1:return n.activeServiceWorker=i.sent(),this.activeServiceWorker?(this.sender=new an(this.activeServiceWorker),[4,this.sender._send("ping",{},800)]):[2];case 2:return(r=i.sent())?((null===(e=r[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=r[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0),[2]):[2]}}))}))},e.prototype.notifyServiceWorker=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:if(!this.sender||!this.activeServiceWorker||function(){var e;return(null===(e=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===e?void 0:e.controller)||null}()!==this.activeServiceWorker)return[2];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)];case 2:return t.sent(),[3,4];case 3:return t.sent(),[3,4];case 4:return[2]}}))}))},e.prototype._isAvailable=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return t.trys.push([0,4,,5]),indexedDB?[4,gn()]:[2,!1];case 1:return[4,yn(e=t.sent(),tn,"1")];case 2:return t.sent(),[4,bn(e,tn)];case 3:return t.sent(),[2,!0];case 4:return t.sent(),[3,5];case 5:return[2,!1]}}))}))},e.prototype._withPendingWrite=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:this.pendingWrites++,t.label=1;case 1:return t.trys.push([1,,3,4]),[4,e()];case 2:return t.sent(),[3,4];case 3:return this.pendingWrites--,[7];case 4:return[2]}}))}))},e.prototype._set=function(e,t){return u(this,void 0,void 0,(function(){var n=this;return c(this,(function(r){return[2,this._withPendingWrite((function(){return u(n,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,this._withRetries((function(n){return yn(n,e,t)}))];case 1:return n.sent(),this.localCache[e]=t,[2,this.notifyServiceWorker(e)]}}))}))}))]}))}))},e.prototype._get=function(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,this._withRetries((function(t){return function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return n=vn(e,!1).get(t),[4,new pn(n).toPromise()];case 1:return[2,void 0===(r=i.sent())?null:r.value]}}))}))}(t,e)}))];case 1:return t=n.sent(),this.localCache[e]=t,[2,t]}}))}))},e.prototype._remove=function(e){return u(this,void 0,void 0,(function(){var t=this;return c(this,(function(n){return[2,this._withPendingWrite((function(){return u(t,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,this._withRetries((function(t){return bn(t,e)}))];case 1:return t.sent(),delete this.localCache[e],[2,this.notifyServiceWorker(e)]}}))}))}))]}))}))},e.prototype._poll=function(){return u(this,void 0,void 0,(function(){var e,t,n,r,i,o,s,a,u,l,d;return c(this,(function(c){switch(c.label){case 0:return[4,this._withRetries((function(e){var t=vn(e,!1).getAll();return new pn(t).toPromise()}))];case 1:if(!(e=c.sent()))return[2,[]];if(0!==this.pendingWrites)return[2,[]];for(t=[],n=new Set,r=0,i=e;r<i.length;r++)o=i[r],s=o.fbase_key,a=o.value,n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),t.push(s));for(u=0,l=Object.keys(this.localCache);u<l.length;u++)d=l[u],this.localCache[d]&&!n.has(d)&&(this.notifyListeners(d,null),t.push(d));return[2,t]}}))}))},e.prototype.notifyListeners=function(e,t){this.localCache[e]=t;var n=this.listeners[e];if(n)for(var r=0,i=Array.from(n);r<i.length;r++){(0,i[r])(t)}},e.prototype.startPolling=function(){var e=this;this.stopPolling(),this.pollTimer=setInterval((function(){return u(e,void 0,void 0,(function(){return c(this,(function(e){return[2,this._poll()]}))}))}),800)},e.prototype.stopPolling=function(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)},e.prototype._addListener=function(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)},e.prototype._removeListener=function(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()},e.type="LOCAL",e}(),In=function(){function e(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}return e.prototype.registerConsumer=function(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)},e.prototype.unregisterConsumer=function(e){this.consumers.delete(e)},e.prototype.onEvent=function(e){var t=this;if(this.hasEventBeenHandled(e))return!1;var n=!1;return this.consumers.forEach((function(r){t.isEventForConsumer(e,r)&&(n=!0,t.sendToConsumer(e,r),t.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Tn(e);default:return!1}}
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
     */(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n},e.prototype.sendToConsumer=function(e,t){var n;if(e.error&&!Tn(e)){var r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(W(this.auth,r))}else t.onAuthEvent(e)},e.prototype.isEventForConsumer=function(e,t){var n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n},e.prototype.hasEventBeenHandled=function(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(wn(e))},e.prototype.saveEventToCache=function(e){this.cachedEventUids.add(wn(e)),this.lastProcessedEventTime=Date.now()},e}();function wn(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((function(e){return e})).join("-")}function Tn(e){var t=e.type,n=e.error;return"unknown"===t&&"auth/no-auth-event"===(null==n?void 0:n.code)}function kn(e){return""+(e||"")+Math.floor(1e9*Math.random())}
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
     */function En(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,ie(e,"GET","/v1/projects",{})]}))}))}
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
     */var Rn=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sn=/^https?/;function Pn(e){var t=J(),n=new URL(t),r=n.protocol,i=n.hostname;if(e.startsWith("chrome-extension://")){var o=new URL(e);return""===o.hostname&&""===i?"chrome-extension:"===r&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===r&&o.hostname===i}if(!Sn.test(r))return!1;if(Rn.test(e))return i===e;var s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}
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
     */function An(e){return new Promise((function(t,n){var r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=n,r.type="text/javascript",r.charset="UTF-8",function(){var e,t;return null!==(t=null===(e=document.getElementsByTagName("head"))||void 0===e?void 0:e[0])&&void 0!==t?t:document}().appendChild(r)}))}function On(e){return"__"+e+Math.floor(1e6*Math.random())}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Nn=new Z(3e4,6e4);function Cn(){var e=un().___jsl;if(null==e?void 0:e.H)for(var t=0,n=Object.keys(e.H);t<n.length;t++){var r=n[t];if(e.H[r].r=e.H[r].r||[],e.H[r].L=e.H[r].L||[],e.H[r].r=l([],e.H[r].L),e.CP)for(var i=0;i<e.CP.length;i++)e.CP[i]=null}}var Ln=null;function Dn(e){return Ln=Ln||function(e){return new Promise((function(t,n){var r,i,o;function s(){Cn(),gapi.load("gapi.iframes",{callback:function(){t(gapi.iframes.getContext())},ontimeout:function(){Cn(),n(W(e,"network-request-failed"))},timeout:Nn.get()})}if(null===(i=null===(r=un().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(o=un().gapi)||void 0===o?void 0:o.load)){var a=On("iframefcb");return un()[a]=function(){gapi.load?s():n(W(e,"network-request-failed"))},An("https://apis.google.com/js/api.js?onload="+a)}s()}})).catch((function(e){throw Ln=null,e}))}(e)}
/**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */var Mn=new Z(5e3,15e3),Un={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},Fn=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xn(e){var n=e.config;z(n.authDomain,e,"auth-domain-config-required");var r=n.emulator?$(n,"emulator/auth/iframe"):"https://"+e.config.authDomain+"/__/auth/iframe",i={apiKey:n.apiKey,appName:e.name,v:t.SDK_VERSION},o=Fn.get(e.config.apiHost);o&&(i.eid=o);var s=e._getFrameworks();return s.length&&(i.fw=s.join(",")),r+"?"+w(i).slice(1)}function Vn(e){return u(this,void 0,void 0,(function(){var t,n,r=this;return c(this,(function(i){switch(i.label){case 0:return[4,Dn(e)];case 1:return t=i.sent(),z(n=un().gapi,e,"internal-error"),[2,t.open({where:document.body,url:xn(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Un,dontclear:!0},(function(t){return new Promise((function(n,i){return u(r,void 0,void 0,(function(){function r(){un().clearTimeout(s),n(t)}var o,s;return c(this,(function(n){switch(n.label){case 0:return[4,t.restyle({setHideOnLeave:!1})];case 1:return n.sent(),o=W(e,"network-request-failed"),s=un().setTimeout((function(){i(o)}),Mn.get()),t.ping(r).then(r,(function(){i(o)})),[2]}}))}))}))}))]}}))}))}
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
     */var jn=function(e){function t(){return e.call(this,window.sessionStorage,"SESSION")||this}return o(t,e),t.prototype._addListener=function(e,t){},t.prototype._removeListener=function(e,t){},t.type="SESSION",t}(nn),Wn={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hn=function(){function e(e){this.window=e,this.associatedEvent=null}return e.prototype.close=function(){if(this.window)try{this.window.close()}catch(e){}},e}();function zn(e,t,n,r,i){void 0===r&&(r=500),void 0===i&&(i=600);var o=Math.min((window.screen.availHeight-i)/2,0).toString(),a=Math.min((window.screen.availWidth-r)/2,0).toString(),u="",c=s(s({},Wn),{width:r.toString(),height:i.toString(),top:o,left:a}),l=h().toLowerCase();n&&(u=Oe(l)?"_blank":n),Pe(l)&&(t=t||"http://localhost",c.scrollbars="yes");var d=Object.entries(c).reduce((function(e,t){return""+e+t[0]+"="+t[1]+","}),"");if(function(e){var t;return void 0===e&&(e=h()),Me(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(l)&&"_self"!==u)return function(e,t){var n=document.createElement("a");n.href=e,n.target=t;var r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
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
     */(t||"",u),new Hn(null);var f=window.open(t||"",u,d);z(f,e,"popup-blocked");try{f.focus()}catch(e){}return new Hn(f)}function qn(e,t){return t?K(t):(z(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
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
     */var Bn=function(e){function t(t){var n=e.call(this,"custom","custom")||this;return n.params=t,n}return o(t,e),t.prototype._getIdTokenResponse=function(e){return rt(e,this._buildIdpRequest())},t.prototype._linkToIdToken=function(e,t){return rt(e,this._buildIdpRequest(t))},t.prototype._getReauthenticationResolver=function(e){return rt(e,this._buildIdpRequest())},t.prototype._buildIdpRequest=function(e){var t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t},t}(qe);function Gn(e){return At(e.auth,new Bn(e),e.bypassAuthState)}function Kn(e){var t=e.auth,n=e.user;return z(n,t,"internal-error"),Pt(n,new Bn(e),e.bypassAuthState)}function Jn(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){return t=e.auth,z(n=e.user,t,"internal-error"),[2,Rt(n,new Bn(e),e.bypassAuthState)]}))}))}
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
     */var Yn=function(){function e(e,t,n,r,i){void 0===i&&(i=!1),this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}return e.prototype.execute=function(){var e=this;return new Promise((function(t,n){return u(e,void 0,void 0,(function(){var e,r;return c(this,(function(i){switch(i.label){case 0:this.pendingPromise={resolve:t,reject:n},i.label=1;case 1:return i.trys.push([1,4,,5]),e=this,[4,this.resolver._initialize(this.auth)];case 2:return e.eventManager=i.sent(),[4,this.onExecution()];case 3:return i.sent(),this.eventManager.registerConsumer(this),[3,5];case 4:return r=i.sent(),this.reject(r),[3,5];case 5:return[2]}}))}))}))},e.prototype.onAuthEvent=function(e){return u(this,void 0,void 0,(function(){var t,n,r,i,o,s,a,u,l;return c(this,(function(c){switch(c.label){case 0:if(t=e.urlResponse,n=e.sessionId,r=e.postBody,i=e.tenantId,o=e.error,s=e.type,o)return this.reject(o),[2];a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState},c.label=1;case 1:return c.trys.push([1,3,,4]),u=this.resolve,[4,this.getIdpTask(s)(a)];case 2:return u.apply(this,[c.sent()]),[3,4];case 3:return l=c.sent(),this.reject(l),[3,4];case 4:return[2]}}))}))},e.prototype.onError=function(e){this.reject(e)},e.prototype.getIdpTask=function(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Gn;case"linkViaPopup":case"linkViaRedirect":return Jn;case"reauthViaPopup":case"reauthViaRedirect":return Kn;default:j(this.auth,"internal-error")}},e.prototype.resolve=function(e){B(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()},e.prototype.reject=function(e){B(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()},e.prototype.unregisterAndCleanUp=function(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()},e}(),Xn=new Map,Zn=function(e){function t(t,n,r){void 0===r&&(r=!1);var i=e.call(this,t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r)||this;return i.eventId=null,i}return o(t,e),t.prototype.execute=function(){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:if(t=Xn.get(this.auth._key()))return[3,8];o.label=1;case 1:return o.trys.push([1,6,,7]),[4,$n(this.resolver,this.auth)];case 2:return o.sent()?[4,e.prototype.execute.call(this)]:[3,4];case 3:return r=o.sent(),[3,5];case 4:r=null,o.label=5;case 5:return n=r,t=function(){return Promise.resolve(n)},[3,7];case 6:return i=o.sent(),t=function(){return Promise.reject(i)},[3,7];case 7:Xn.set(this.auth._key(),t),o.label=8;case 8:return[2,t()]}}))}))},t.prototype.onAuthEvent=function(t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return"signInViaRedirect"===t.type?[2,e.prototype.onAuthEvent.call(this,t)]:"unknown"===t.type?(this.resolve(null),[2]):t.eventId?[4,this.auth._redirectUserForId(t.eventId)]:[3,2];case 1:if(n=r.sent())return this.user=n,[2,e.prototype.onAuthEvent.call(this,t)];this.resolve(null),r.label=2;case 2:return[2]}}))}))},t.prototype.onExecution=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){return[2]}))}))},t.prototype.cleanUp=function(){},t}(Yn);
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
     */function $n(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return n=tr(t),[4,er(e)._get(n)];case 1:return r="true"===i.sent(),[4,er(e)._remove(n)];case 2:return i.sent(),[2,r]}}))}))}function Qn(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,er(e)._set(tr(t),"true")]}))}))}function er(e){return K(e._redirectPersistence)}function tr(e){return Ee("pendingRedirect",e.config.apiKey,e.name)}
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
     */function nr(e,t,n){return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return r=Ve(e),z(t instanceof dt,e,"argument-error"),[4,Qn(i=qn(r,n),r)];case 1:return o.sent(),[2,i._openRedirect(r,t,"signInViaRedirect")]}}))}))}(e,t,n)}function rr(e,t,n){return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return r=A(e),z(t instanceof dt,r.auth,"argument-error"),[4,Qn(i=qn(r.auth,n),r.auth)];case 1:return s.sent(),[4,ar(r)];case 2:return o=s.sent(),[2,i._openRedirect(r.auth,t,"reauthViaRedirect",o)]}}))}))}(e,t,n)}function ir(e,t,n){return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return r=A(e),z(t instanceof dt,r.auth,"argument-error"),i=qn(r.auth,n),[4,St(!1,r,t.providerId)];case 1:return s.sent(),[4,Qn(i,r.auth)];case 2:return s.sent(),[4,ar(r)];case 3:return o=s.sent(),[2,i._openRedirect(r.auth,t,"linkViaRedirect",o)]}}))}))}(e,t,n)}function or(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,Ve(e)._initializationPromise];case 1:return n.sent(),[2,sr(e,t,!1)]}}))}))}function sr(e,t,n){return void 0===n&&(n=!1),u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return r=Ve(e),i=qn(r,t),[4,new Zn(r,i,n).execute()];case 1:return!(o=s.sent())||n?[3,4]:(delete o.user._redirectEventId,[4,r._persistUserIfCurrent(o.user)]);case 2:return s.sent(),[4,r._setRedirectUser(null,t)];case 3:s.sent(),s.label=4;case 4:return[2,o]}}))}))}function ar(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return t=kn(e.uid+":::"),e._redirectEventId=t,[4,e.auth._setRedirectUser(e)];case 1:return n.sent(),[4,e.auth._persistUserIfCurrent(e)];case 2:return n.sent(),[2,t]}}))}))}
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
     */var ur="__/auth/handler",cr="emulator/auth/handler";function lr(e,n,r,i,o,s){z(e.config.authDomain,e,"auth-domain-config-required"),z(e.config.apiKey,e,"invalid-api-key");var a={apiKey:e.config.apiKey,appName:e.name,authType:r,redirectUrl:i,v:t.SDK_VERSION,eventId:o};if(n instanceof dt){n.setDefaultLanguage(e.languageCode),a.providerId=n.providerId||"",function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(n.getCustomParameters())||(a.customParameters=JSON.stringify(n.getCustomParameters()));for(var u=0,c=Object.entries(s||{});u<c.length;u++){var l=c[u],d=l[0],h=l[1];a[d]=h}}if(n instanceof ht){var f=n.getScopes().filter((function(e){return""!==e}));f.length>0&&(a.scopes=f.join(","))}e.tenantId&&(a.tid=e.tenantId);for(var p=a,v=0,m=Object.keys(p);v<m.length;v++){void 0===p[d=m[v]]&&delete p[d]}return function(e){var t=e.config;if(!t.emulator)return"https://"+t.authDomain+"/"+ur;return $(t,cr)}
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
     */(e)+"?"+w(p).slice(1)}var dr="webStorageSupport",hr=function(){function e(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jn,this._completeRedirectFn=sr}return e.prototype._openPopup=function(e,t,n,r){var i;return u(this,void 0,void 0,(function(){var o;return c(this,(function(s){return B(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()"),o=lr(e,t,n,J(),r),[2,zn(e,o,kn())]}))}))},e.prototype._openRedirect=function(e,t,n,r){return u(this,void 0,void 0,(function(){return c(this,(function(i){switch(i.label){case 0:return[4,this._originValidation(e)];case 1:return i.sent(),o=lr(e,t,n,J(),r),un().location.href=o,[2,new Promise((function(){}))]}var o}))}))},e.prototype._initialize=function(e){var t=e._key();if(this.eventManagers[t]){var n=this.eventManagers[t],r=n.manager,i=n.promise;return r?Promise.resolve(r):(B(i,"If manager is not set, promise should be"),i)}var o=this.initAndGetManager(e);return this.eventManagers[t]={promise:o},o},e.prototype.initAndGetManager=function(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:return[4,Vn(e)];case 1:return t=r.sent(),n=new In(e),t.register("authEvent",(function(t){return z(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,[2,n]}}))}))},e.prototype._isIframeWebStorageSupported=function(e,t){this.iframes[e._key()].send(dr,{type:dr},(function(n){var r,i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r.webStorageSupport;void 0!==i&&t(!!i),j(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)},e.prototype._originValidation=function(e){var t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=function(e){return u(this,void 0,void 0,(function(){var t,n,r,i;return c(this,(function(o){switch(o.label){case 0:return e.config.emulator?[2]:[4,En(e)];case 1:for(t=o.sent().authorizedDomains,n=0,r=t;n<r.length;n++){i=r[n];try{if(Pn(i))return[2]}catch(e){}}return j(e,"unauthorized-domain"),[2]}}))}))}(e)),this.originValidationPromises[t]},Object.defineProperty(e.prototype,"_shouldInitProactively",{get:function(){return Ue()||Ae()||Me()},enumerable:!1,configurable:!0}),e}();
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
function fr(e,t){return ie(e,"POST","/v2/accounts/mfaSignIn:start",s({tenantId:e.tenantId},t))}
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
function pr(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,ie(e,"GET","/v1/recaptchaParams")];case 1:return[2,t.sent().recaptchaSiteKey||""]}}))}))}
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
     */var vr=1e12,mr=function(){function e(e){this.auth=e,this.counter=vr,this._widgets=new Map}return e.prototype.render=function(e,t){var n=this.counter;return this._widgets.set(n,new gr(e,this.auth.name,t||{})),this.counter++,n},e.prototype.reset=function(e){var t,n=e||vr;null===(t=this._widgets.get(n))||void 0===t||t.delete(),this._widgets.delete(n)},e.prototype.getResponse=function(e){var t,n=e||vr;return(null===(t=this._widgets.get(n))||void 0===t?void 0:t.getResponse())||""},e.prototype.execute=function(e){var t;return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){return n=e||vr,null===(t=this._widgets.get(n))||void 0===t||t.execute(),[2,""]}))}))},e}(),gr=function(){function e(e,t,n){var r=this;this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=function(){r.execute()};var i="string"==typeof e?document.getElementById(e):e;z(i,"argument-error",{appName:t}),this.container=i,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}return e.prototype.getResponse=function(){return this.checkIfDeleted(),this.responseToken},e.prototype.delete=function(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)},e.prototype.execute=function(){var e=this;this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout((function(){e.responseToken=function(e){for(var t=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",r=0;r<e;r++)t.push(n.charAt(Math.floor(Math.random()*n.length)));return t.join("")}
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
     */(50);var t=e.params,n=t.callback,r=t["expired-callback"];if(n)try{n(e.responseToken)}catch(e){}e.timerId=window.setTimeout((function(){if(e.timerId=null,e.responseToken=null,r)try{r()}catch(e){}e.isVisible&&e.execute()}),6e4)}),500))},e.prototype.checkIfDeleted=function(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")},e}();var yr=On("rcb"),br=new Z(3e4,6e4),_r=function(){function e(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!un().grecaptcha}return e.prototype.load=function(e,t){var n=this;return void 0===t&&(t=""),z(function(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}(t),e,"argument-error"),this.shouldResolveImmediately(t)?Promise.resolve(un().grecaptcha):new Promise((function(r,i){var o=un().setTimeout((function(){i(W(e,"network-request-failed"))}),br.get());un()[yr]=function(){un().clearTimeout(o),delete un()[yr];var s=un().grecaptcha;if(s){var a=s.render;s.render=function(e,t){var r=a(e,t);return n.counter++,r},n.hostLanguage=t,r(s)}else i(W(e,"internal-error"))},An("https://www.google.com/recaptcha/api.js??"+w({onload:yr,render:"explicit",hl:t})).catch((function(){clearTimeout(o),i(W(e,"internal-error"))}))}))},e.prototype.clearedOneInstance=function(){this.counter--},e.prototype.shouldResolveImmediately=function(e){return!!un().grecaptcha&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)},e}();var Ir=function(){function e(){}return e.prototype.load=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,new mr(e)]}))}))},e.prototype.clearedOneInstance=function(){},e}(),wr="recaptcha",Tr={theme:"light",type:"image"},kr=function(){function e(e,t,n){void 0===t&&(t=s({},Tr)),this.parameters=t,this.type=wr,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Ve(n),this.isInvisible="invisible"===this.parameters.size,z("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");var r="string"==typeof e?document.getElementById(e):e;z(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Ir:new _r,this.validateStartingState()}return e.prototype.verify=function(){return u(this,void 0,void 0,(function(){var e,t,n,r=this;return c(this,(function(i){switch(i.label){case 0:return this.assertNotDestroyed(),[4,this.render()];case 1:return e=i.sent(),t=this.getAssertedRecaptcha(),(n=t.getResponse(e))?[2,n]:[2,new Promise((function(n){var i=function(e){e&&(r.tokenChangeListeners.delete(i),n(e))};r.tokenChangeListeners.add(i),r.isInvisible&&t.execute(e)}))]}}))}))},e.prototype.render=function(){var e=this;try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch((function(t){throw e.renderPromise=null,t}))),this.renderPromise},e.prototype._reset=function(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)},e.prototype.clear=function(){var e=this;this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach((function(t){e.container.removeChild(t)}))},e.prototype.validateStartingState=function(){z(!this.parameters.sitekey,this.auth,"argument-error"),z(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),z("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")},e.prototype.makeTokenCallback=function(e){var t=this;return function(n){if(t.tokenChangeListeners.forEach((function(e){return e(n)})),"function"==typeof e)e(n);else if("string"==typeof e){var r=un()[e];"function"==typeof r&&r(n)}}},e.prototype.assertNotDestroyed=function(){z(!this.destroyed,this.auth,"internal-error")},e.prototype.makeRenderPromise=function(){return u(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return[4,this.init()];case 1:return n.sent(),this.widgetId||(e=this.container,this.isInvisible||(t=document.createElement("div"),e.appendChild(t),e=t),this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)),[2,this.widgetId]}}))}))},e.prototype.init=function(){return u(this,void 0,void 0,(function(){var e,t;return c(this,(function(n){switch(n.label){case 0:return z(Y()&&!cn(),this.auth,"internal-error"),[4,(r=null,new Promise((function(e){"complete"!==document.readyState?(r=function(){return e()},window.addEventListener("load",r)):e()})).catch((function(e){throw r&&window.removeEventListener("load",r),e})))];case 1:return n.sent(),e=this,[4,this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0)];case 2:return e.recaptcha=n.sent(),[4,pr(this.auth)];case 3:return z(t=n.sent(),this.auth,"internal-error"),this.parameters.sitekey=t,[2]}var r;
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
     */}))}))},e.prototype.getAssertedRecaptcha=function(){return z(this.recaptcha,this.auth,"internal-error"),this.recaptcha},e}();
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
     */var Er=function(){function e(e,t){this.verificationId=e,this.onConfirmation=t}return e.prototype.confirm=function(e){var t=ut._fromVerification(this.verificationId,e);return this.onConfirmation(t)},e}();function Rr(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return[4,St(!1,r=A(e),"phone")];case 1:return o.sent(),[4,Sr(r.auth,t,n)];case 2:return i=o.sent(),[2,new Er(i,(function(e){return Nt(r,e)}))]}}))}))}function Sr(e,t,n){var r;return u(this,void 0,void 0,(function(){var i,o,s,a;return c(this,(function(u){switch(u.label){case 0:return[4,n.verify()];case 1:i=u.sent(),u.label=2;case 2:return u.trys.push([2,,10,11]),z("string"==typeof i,e,"argument-error"),z(n.type===wr,e,"argument-error"),o=void 0,"session"in(o="string"==typeof t?{phoneNumber:t}:t)?(s=o.session,"phoneNumber"in o?(z("enroll"===s.type,e,"internal-error"),[4,Zt(e,{idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:i}})]):[3,4]):[3,7];case 3:return[2,u.sent().phoneSessionInfo.sessionInfo];case 4:return z("signin"===s.type,e,"internal-error"),z(a=(null===(r=o.multiFactorHint)||void 0===r?void 0:r.uid)||o.multiFactorUid,e,"missing-multi-factor-info"),[4,fr(e,{mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})];case 5:return[2,u.sent().phoneResponseInfo.sessionInfo];case 6:return[3,9];case 7:return[4,st(e,{phoneNumber:o.phoneNumber,recaptchaToken:i})];case 8:return[2,u.sent().sessionInfo];case 9:return[3,11];case 10:return n._reset(),[7];case 11:return[2]}}))}))}
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
var Pr=function(){function e(t){this.providerId=e.PROVIDER_ID,this.auth=Ve(t)}return e.prototype.verifyPhoneNumber=function(e,t){return Sr(this.auth,e,t)},e.credential=function(e,t){return ut._fromVerification(e,t)},e.credentialFromResult=function(e){var t=e;z(t._tokenResponse,t.user.auth,"argument-error");var n=t._tokenResponse,r=n.phoneNumber,i=n.temporaryProof;if(r&&i)return ut._fromTokenResponse(r,i);j(t.user.auth,"argument-error")},e.PROVIDER_ID="phone",e.PHONE_SIGN_IN_METHOD="phone",e}(),Ar=new Z(2e3,1e4);
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
     */function Or(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){return r=Ve(e),z(t instanceof dt,e,"argument-error"),i=qn(r,n),[2,new Lr(r,"signInViaPopup",t,i).executeNotNull()]}))}))}function Nr(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){return r=A(e),z(t instanceof dt,r.auth,"argument-error"),i=qn(r.auth,n),[2,new Lr(r.auth,"linkViaPopup",t,i,r).executeNotNull()]}))}))}var Cr,Lr=function(e){function t(n,r,i,o,s){var a=e.call(this,n,r,o,s)||this;return a.provider=i,a.authWindow=null,a.pollId=null,t.currentPopupAction&&t.currentPopupAction.cancel(),t.currentPopupAction=a,a}return o(t,e),t.prototype.executeNotNull=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return[4,this.execute()];case 1:return z(e=t.sent(),this.auth,"internal-error"),[2,e]}}))}))},t.prototype.onExecution=function(){return u(this,void 0,void 0,(function(){var e,t,n=this;return c(this,(function(r){switch(r.label){case 0:return B(1===this.filter.length,"Popup operations only handle one event"),e=kn(),t=this,[4,this.resolver._openPopup(this.auth,this.provider,this.filter[0],e)];case 1:return t.authWindow=r.sent(),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((function(e){n.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(function(e){e||n.reject(W(n.auth,"web-storage-unsupported"))})),this.pollUserCancellation(),[2]}}))}))},Object.defineProperty(t.prototype,"eventId",{get:function(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null},enumerable:!1,configurable:!0}),t.prototype.cancel=function(){this.reject(W(this.auth,"cancelled-popup-request"))},t.prototype.cleanUp=function(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,t.currentPopupAction=null},t.prototype.pollUserCancellation=function(){var e=this,t=function(){var n,r;(null===(r=null===(n=e.authWindow)||void 0===n?void 0:n.window)||void 0===r?void 0:r.closed)?e.pollId=window.setTimeout((function(){e.pollId=null,e.reject(W(e.auth,"popup-closed-by-user"))}),2e3):e.pollId=window.setTimeout(t,Ar.get())};t()},t.currentPopupAction=null,t}(Yn),Dr=function(e){function t(t){var n=e.call(this,"phone")||this;return n.credential=t,n}return o(t,e),t._fromCredential=function(e){return new t(e)},t.prototype._finalizeEnroll=function(e,t,n){return function(e,t){return ie(e,"POST","/v2/accounts/mfaEnrollment:finalize",s({tenantId:e.tenantId},t))}(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})},t.prototype._finalizeSignIn=function(e,t){return function(e,t){return ie(e,"POST","/v2/accounts/mfaSignIn:finalize",s({tenantId:e.tenantId},t))}(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})},t}(function(){function e(e){this.factorId=e}return e.prototype._process=function(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return q("unexpected MultiFactorSessionType")}},e}()),Mr=function(){function e(){}return e.assertion=function(e){return Dr._fromCredential(e)},e}();
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
     */
function Ur(){return window}
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
     */Cr="Browser",t._registerComponent(new M("auth-exp",(function(e,t){var n=t.options,r=e.getProvider("app-exp").getImmediate(),i=r.options,o=i.apiKey,s=i.authDomain;return function(e){z(o&&!o.includes(":"),"invalid-api-key",{appName:e.name}),z(!(null==s?void 0:s.includes(":")),"argument-error",{appName:e.name});var t={apiKey:o,authDomain:s,clientPlatform:Cr,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fe(Cr)},r=new xe(e,t);return function(e,t){var n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(K);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(r,n),r}(r)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((function(e,t,n){e.getProvider("auth-internal").initialize()}))),t._registerComponent(new M("auth-internal",(function(e){return function(e){return new en(e)}(Ve(e.getProvider("auth-exp").getImmediate()))}),"PRIVATE").setInstantiationMode("EXPLICIT")),t.registerVersion("@firebase/auth-exp","0.0.900-exp.b0c8425bc",
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
function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(Cr));function Fr(e,t,n){var r;return u(this,void 0,void 0,(function(){var i,o,s;return c(this,(function(a){switch(a.label){case 0:return i=Ur().BuildInfo,B(t.sessionId,"AuthEvent did not contain a session ID"),[4,jr(t.sessionId)];case 1:return o=a.sent(),s={},Me()?s.ibi=i.packageName:Ce()?s.apn=i.packageName:j(e,"operation-not-supported-in-this-environment"),i.displayName&&(s.appDisplayName=i.displayName),s.sessionId=o,[2,lr(e,n,t.type,void 0,null!==(r=t.eventId)&&void 0!==r?r:void 0,s)]}}))}))}function xr(e){var t=Ur().cordova;return new Promise((function(n){t.plugins.browsertab.isAvailable((function(r){var i,o=null;r?t.plugins.browsertab.openUrl(e):o=t.InAppBrowser.open(e,(void 0===i&&(i=h()),/(iPad|iPhone|iPod).*OS 7_\d/i.test(i)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(i)?"_blank":"_system"),"location=yes"),n(o)}))}))}function Vr(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:r=Ur().cordova,i=function(){},o.label=1;case 1:return o.trys.push([1,,3,4]),[4,new Promise((function(o,s){var a=null;function u(){var e;o();var t=null===(e=r.plugins.browsertab)||void 0===e?void 0:e.close;"function"==typeof t&&t(),"function"==typeof(null==n?void 0:n.close)&&n.close()}function c(){a||(a=window.setTimeout((function(){s(W(e,"redirect-cancelled-by-user"))}),2e3))}function l(){"visible"===(null===document||void 0===document?void 0:document.visibilityState)&&c()}t.addPassiveListener(u),document.addEventListener("resume",c,!1),Ce()&&document.addEventListener("visibilitychange",l,!1),i=function(){t.removePassiveListener(u),document.removeEventListener("resume",c,!1),document.removeEventListener("visibilitychange",l,!1),a&&window.clearTimeout(a)}}))];case 2:return o.sent(),[3,4];case 3:return i(),[7];case 4:return[2]}}))}))}function jr(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:return t=function(e){if(B(/[0-9a-zA-Z]+/.test(e),"Can only convert alpha-numeric strings"),"undefined"!=typeof TextEncoder)return(new TextEncoder).encode(e);for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}
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
     */(e),[4,crypto.subtle.digest("SHA-256",t)];case 1:return n=r.sent(),[2,Array.from(new Uint8Array(n)).map((function(e){return e.toString(16).padStart(2,"0")})).join("")]}}))}))}var Wr=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.passiveListeners=new Set,t.initPromise=new Promise((function(e){t.resolveInialized=e})),t}return o(t,e),t.prototype.addPassiveListener=function(e){this.passiveListeners.add(e)},t.prototype.removePassiveListener=function(e){this.passiveListeners.delete(e)},t.prototype.resetRedirect=function(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1},t.prototype.onEvent=function(t){return this.resolveInialized(),this.passiveListeners.forEach((function(e){return e(t)})),e.prototype.onEvent.call(this,t)},t.prototype.initialized=function(){return u(this,void 0,void 0,(function(){return c(this,(function(e){switch(e.label){case 0:return[4,this.initPromise];case 1:return e.sent(),[2]}}))}))},t}(In);function Hr(e,t){return Gr()._set(Kr(e),t)}function zr(e){return u(this,void 0,void 0,(function(){var t;return c(this,(function(n){switch(n.label){case 0:return[4,Gr()._get(Kr(e))];case 1:return(t=n.sent())?[4,Gr()._remove(Kr(e))]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2,t]}}))}))}function qr(e,t){var n,r,i=function(e){var t=Jr(e),n=t.link?decodeURIComponent(t.link):void 0,r=Jr(n).link,i=t.deep_link_id?decodeURIComponent(t.deep_link_id):void 0;return Jr(i).link||i||r||n||e}(t);if(i.includes("/__/auth/callback")){var o=Jr(i),s=o.firebaseError?function(e){try{return JSON.parse(e)}catch(e){return null}}(decodeURIComponent(o.firebaseError)):null,a=null===(r=null===(n=null==s?void 0:s.code)||void 0===n?void 0:n.split("auth/"))||void 0===r?void 0:r[1],u=a?W(a):null;return u?{type:e.type,eventId:e.eventId,tenantId:e.tenantId,error:u,urlResponse:null,sessionId:null,postBody:null}:{type:e.type,eventId:e.eventId,tenantId:e.tenantId,sessionId:e.sessionId,urlResponse:i,postBody:null}}return null}function Br(){for(var e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n=0;n<20;n++){var r=Math.floor(Math.random()*t.length);e.push(t.charAt(r))}return e.join("")}function Gr(){return K(rn)}function Kr(e){return Ee("authEvent",e.config.apiKey,e.name)}function Jr(e){if(!(null==e?void 0:e.includes("?")))return{};var t=e.split("?");t[0];return T(t.slice(1).join("?"))}
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
     */var Yr=function(){function e(){this._redirectPersistence=jn,this._shouldInitProactively=!0,this.eventManagers=new Map,this._completeRedirectFn=sr}return e.prototype._initialize=function(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){return t=e._key(),(n=this.eventManagers.get(t))||(n=new Wr(e),this.eventManagers.set(t,n),this.attachCallbackListeners(e,n)),[2,n]}))}))},e.prototype._openPopup=function(e){j(e,"operation-not-supported-in-this-environment")},e.prototype._openRedirect=function(e,t,n,r){return u(this,void 0,void 0,(function(){var i,o,s;return c(this,(function(a){switch(a.label){case 0:return function(e){var t,n,r,i,o,s,a,u,c,l,d=Ur();z("function"==typeof(null===(t=null==d?void 0:d.universalLinks)||void 0===t?void 0:t.subscribe),e,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),z(void 0!==(null===(n=null==d?void 0:d.BuildInfo)||void 0===n?void 0:n.packageName),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),z("function"==typeof(null===(o=null===(i=null===(r=null==d?void 0:d.cordova)||void 0===r?void 0:r.plugins)||void 0===i?void 0:i.browsertab)||void 0===o?void 0:o.openUrl),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),z("function"==typeof(null===(u=null===(a=null===(s=null==d?void 0:d.cordova)||void 0===s?void 0:s.plugins)||void 0===a?void 0:a.browsertab)||void 0===u?void 0:u.isAvailable),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),z("function"==typeof(null===(l=null===(c=null==d?void 0:d.cordova)||void 0===c?void 0:c.InAppBrowser)||void 0===l?void 0:l.open),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}(e),[4,this._initialize(e)];case 1:return[4,(i=a.sent()).initialized()];case 2:return a.sent(),i.resetRedirect(),Xn.clear(),o=function(e,t,n){return void 0===n&&(n=null),{type:t,eventId:n,urlResponse:null,sessionId:Br(),postBody:null,tenantId:e.tenantId,error:W(e,"no-auth-event")}}(e,n,r),[4,Hr(e,o)];case 3:return a.sent(),[4,Fr(e,o,t)];case 4:return[4,xr(a.sent())];case 5:return s=a.sent(),[2,Vr(e,i,s)]}}))}))},e.prototype._isIframeWebStorageSupported=function(e,t){throw new Error("Method not implemented.")},e.prototype._originValidation=function(){return Promise.resolve()},e.prototype.attachCallbackListeners=function(e,t){var n=this,r=Ur(),i=r.universalLinks,o=r.handleOpenUrl,s=r.BuildInfo,a=setTimeout((function(){return u(n,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,zr(e)];case 1:return n.sent(),t.onEvent(Xr()),[2]}}))}))}),500),l=function(r){return u(n,void 0,void 0,(function(){var n,i;return c(this,(function(o){switch(o.label){case 0:return clearTimeout(a),[4,zr(e)];case 1:return n=o.sent(),i=null,n&&(null==r?void 0:r.url)&&(i=qr(n,r.url)),t.onEvent(i||Xr()),[2]}}))}))};void 0!==i&&"function"==typeof i.subscribe&&i.subscribe(null,l);var d=o,h=s.packageName.toLowerCase()+"://";Ur().handleOpenUrl=function(e){return u(n,void 0,void 0,(function(){return c(this,(function(t){if(e.toLowerCase().startsWith(h)&&l({url:e}),"function"==typeof d)try{d(e)}catch(e){console.error(e)}return[2]}))}))}},e}();function Xr(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:W("no-auth-event")}}function Zr(){var e;return(null===(e=null===self||void 0===self?void 0:self.location)||void 0===e?void 0:e.protocol)||null}function $r(e){return void 0===e&&(e=h()),!("file:"!==Zr()&&"ionic:"!==Zr()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function Qr(e){return void 0===e&&(e=h()),m()&&11===(null===document||void 0===document?void 0:document.documentMode)||function(e){return void 0===e&&(e=h()),/Edge\/\d+/.test(e)}(e)}function ei(){try{var e=self.localStorage,t=kn();if(e)return e.setItem(t,"1"),e.removeItem(t),!Qr()||g()}catch(e){return ti()&&g()}return!1}function ti(){return"undefined"!=typeof global&&"WorkerGlobalScope"in global&&"importScripts"in global}function ni(){return("http:"===Zr()||"https:"===Zr()||p()||$r())&&!(v()||f())&&ei()&&!ti()}function ri(){return $r()&&"undefined"!=typeof document}function ii(){return u(this,void 0,void 0,(function(){return c(this,(function(e){return ri()?[2,new Promise((function(e){var t=setTimeout((function(){e(!1)}),1e3);document.addEventListener("deviceready",(function(){clearTimeout(t),e(!0)}))}))]:[2,!1]}))}))}
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
     */var oi={LOCAL:"local",NONE:"none",SESSION:"session"},si=z,ai="persistence";function ui(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:return[4,e._initializationPromise];case 1:return r.sent(),t=ci(),n=Ee(ai,e.config.apiKey,e.name),(null==t?void 0:t.sessionStorage)&&t.sessionStorage.setItem(n,e._getPersistence()),[2]}}))}))}function ci(){return"undefined"!=typeof window?window:null}
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
     */var li=z,di=K(hr),hi=K(Yr),fi=function(){function e(){this.underlyingResolver=null,this._redirectPersistence=jn,this._completeRedirectFn=sr}return e.prototype._initialize=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,this.selectUnderlyingResolver()];case 1:return t.sent(),[2,this.assertedUnderlyingResolver._initialize(e)]}}))}))},e.prototype._openPopup=function(e,t,n,r){return u(this,void 0,void 0,(function(){return c(this,(function(i){switch(i.label){case 0:return[4,this.selectUnderlyingResolver()];case 1:return i.sent(),[2,this.assertedUnderlyingResolver._openPopup(e,t,n,r)]}}))}))},e.prototype._openRedirect=function(e,t,n,r){return u(this,void 0,void 0,(function(){return c(this,(function(i){switch(i.label){case 0:return[4,this.selectUnderlyingResolver()];case 1:return i.sent(),[2,this.assertedUnderlyingResolver._openRedirect(e,t,n,r)]}}))}))},e.prototype._isIframeWebStorageSupported=function(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)},e.prototype._originValidation=function(e){return this.assertedUnderlyingResolver._originValidation(e)},Object.defineProperty(e.prototype,"_shouldInitProactively",{get:function(){return ri()||di._shouldInitProactively},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"assertedUnderlyingResolver",{get:function(){return li(this.underlyingResolver,"internal-error"),this.underlyingResolver},enumerable:!1,configurable:!0}),e.prototype.selectUnderlyingResolver=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return this.underlyingResolver?[2]:[4,ii()];case 1:return e=t.sent(),this.underlyingResolver=e?hi:di,[2]}}))}))},e}();
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
function pi(e){return e.unwrap()}function vi(e,t){var n,r=null===(n=t.customData)||void 0===n?void 0:n._tokenResponse;if("auth/multi-factor-auth-required"===t.code)t.resolver=new bi(e,function(e,t){var n,r=A(e),i=t;return z(t.operationType,r,"argument-error"),z(null===(n=i.serverResponse)||void 0===n?void 0:n.mfaPendingCredential,r,"argument-error"),Xt._fromError(r,i)}(e,t));else if(r){var i=mi(t),o=t;i&&(o.credential=i,o.tenantId=r.tenantId||void 0,o.email=r.email||void 0,o.phoneNumber=r.phoneNumber||void 0)}}function mi(e){var t=(e instanceof y?e.customData:e)._tokenResponse;if(!t)return null;if(!(e instanceof y)&&"temporaryProof"in t&&"phoneNumber"in t)return Pr.credentialFromResult(e);var n,r=t.providerId;if(!r||"password"===r)return null;switch(r){case"google.com":n=vt;break;case"facebook.com":n=pt;break;case"github.com":n=mt;break;case"twitter.com":n=yt;break;default:var i=t,o=i.oauthIdToken,s=i.oauthAccessToken,a=i.oauthTokenSecret,u=i.pendingToken,c=i.nonce;return s||a||o||u?u?r.startsWith("saml.")?gt._create(r,u):ot._fromParams({providerId:r,signInMethod:r,pendingToken:u,idToken:o,accessToken:s}):new ft(r).credential({idToken:o,accessToken:s,rawNonce:c}):null}return e instanceof y?n.credentialFromError(e):n.credentialFromResult(e)}function gi(e,t){return u(this,void 0,void 0,(function(){var n,r,i,o;return c(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,t];case 1:return n=s.sent(),[3,3];case 2:throw(r=s.sent())instanceof y&&vi(e,r),r;case 3:return i=n.operationType,o=n.user,[2,{operationType:i,credential:(a=n,mi(a)),additionalUserInfo:Jt(n),user:_i.getOrCreate(o)}]}
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
var a}))}))}function yi(e,t){return u(this,void 0,void 0,(function(){var n;return c(this,(function(r){switch(r.label){case 0:return[4,t];case 1:return[2,{verificationId:(n=r.sent()).verificationId,confirm:function(t){return gi(e,n.confirm(t))}}]}}))}))}var bi=function(){function e(e,t){this.resolver=t,this.auth=e.wrapped()}return Object.defineProperty(e.prototype,"session",{get:function(){return this.resolver.session},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"hints",{get:function(){return this.resolver.hints},enumerable:!1,configurable:!0}),e.prototype.resolveSignIn=function(e){return gi(pi(this.auth),this.resolver.resolveSignIn(e))},e}(),_i=function(){function e(e){var t;this._delegate=e,this.multiFactor=(t=A(e),Qt.has(t)||Qt.set(t,$t._fromUser(t)),Qt.get(t))}return e.getOrCreate=function(t){return e.USER_MAP.has(t)||e.USER_MAP.set(t,new e(t)),e.USER_MAP.get(t)},e.prototype.delete=function(){return this._delegate.delete()},e.prototype.reload=function(){return this._delegate.reload()},e.prototype.toJSON=function(){return this._delegate.toJSON()},e.prototype.getIdTokenResult=function(e){return this._delegate.getIdTokenResult(e)},e.prototype.getIdToken=function(e){return this._delegate.getIdToken(e)},e.prototype.linkAndRetrieveDataWithCredential=function(e){return this.linkWithCredential(e)},e.prototype.linkWithCredential=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,gi(this.auth,Nt(this._delegate,e))]}))}))},e.prototype.linkWithPhoneNumber=function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,yi(this.auth,Rr(this._delegate,e,t))]}))}))},e.prototype.linkWithPopup=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,gi(this.auth,Nr(this._delegate,e,fi))]}))}))},e.prototype.linkWithRedirect=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,ui(Ve(this.auth))];case 1:return t.sent(),[2,ir(this._delegate,e,fi)]}}))}))},e.prototype.reauthenticateAndRetrieveDataWithCredential=function(e){return this.reauthenticateWithCredential(e)},e.prototype.reauthenticateWithCredential=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return[2,gi(this.auth,Ct(this._delegate,e))]}))}))},e.prototype.reauthenticateWithPhoneNumber=function(e,t){return yi(this.auth,function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return[4,Sr((r=A(e)).auth,t,n)];case 1:return i=o.sent(),[2,new Er(i,(function(e){return Ct(r,e)}))]}}))}))}(this._delegate,e,t))},e.prototype.reauthenticateWithPopup=function(e){return gi(this.auth,function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){return r=A(e),z(t instanceof dt,r.auth,"argument-error"),i=qn(r.auth,n),[2,new Lr(r.auth,"reauthViaPopup",t,i,r).executeNotNull()]}))}))}(this._delegate,e,fi))},e.prototype.reauthenticateWithRedirect=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,ui(Ve(this.auth))];case 1:return t.sent(),[2,rr(this._delegate,e,fi)]}}))}))},e.prototype.sendEmailVerification=function(e){return function(e,t){return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return n=A(e),[4,e.getIdToken()];case 1:return r=o.sent(),i={requestType:"VERIFY_EMAIL",idToken:r},t&&Ut(n.auth,i,t),[4,Xe(n.auth,i)];case 2:return o.sent().email===e.email?[3,4]:[4,e.reload()];case 3:o.sent(),o.label=4;case 4:return[2]}}))}))}(this._delegate,e)},e.prototype.unlink=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return[4,Et(this._delegate,e)];case 1:return t.sent(),[2,this]}}))}))},e.prototype.updateEmail=function(e){return function(e,t){return Wt(A(e),t,null)}(this._delegate,e)},e.prototype.updatePassword=function(e){return function(e,t){return Wt(A(e),null,t)}(this._delegate,e)},e.prototype.updatePhoneNumber=function(e){return function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,Rt(A(e),t)];case 1:return n.sent(),[2]}}))}))}(this._delegate,e)},e.prototype.updateProfile=function(e){return function(e,t){var n=t.displayName,r=t.photoURL;return u(this,void 0,void 0,(function(){var t,i,o,s,a;return c(this,(function(u){switch(u.label){case 0:return void 0===n&&void 0===r?[2]:[4,(t=A(e)).getIdToken()];case 1:return i=u.sent(),o={idToken:i,displayName:n,photoUrl:r,returnSecureToken:!0},[4,me(t,jt(t.auth,o))];case 2:return s=u.sent(),t.displayName=s.displayName||null,t.photoURL=s.photoUrl||null,(a=t.providerData.find((function(e){return"password"===e.providerId})))&&(a.displayName=t.displayName,a.photoURL=t.photoURL),[4,t._updateTokensIfNecessary(s)];case 3:return u.sent(),[2]}}))}))}(this._delegate,e)},e.prototype.verifyBeforeUpdateEmail=function(e,t){return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i,o;return c(this,(function(s){switch(s.label){case 0:return r=A(e),[4,e.getIdToken()];case 1:return i=s.sent(),o={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:i,newEmail:t},n&&Ut(r.auth,o,n),[4,Qe(r.auth,o)];case 2:return s.sent().email===e.email?[3,4]:[4,e.reload()];case 3:s.sent(),s.label=4;case 4:return[2]}}))}))}(this._delegate,e,t)},Object.defineProperty(e.prototype,"emailVerified",{get:function(){return this._delegate.emailVerified},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isAnonymous",{get:function(){return this._delegate.isAnonymous},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"phoneNumber",{get:function(){return this._delegate.phoneNumber},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"providerData",{get:function(){return this._delegate.providerData},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"refreshToken",{get:function(){return this._delegate.refreshToken},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tenantId",{get:function(){return this._delegate.tenantId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"displayName",{get:function(){return this._delegate.displayName},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"email",{get:function(){return this._delegate.email},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"photoURL",{get:function(){return this._delegate.photoURL},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"providerId",{get:function(){return this._delegate.providerId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"uid",{get:function(){return this._delegate.uid},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"auth",{get:function(){return this._delegate.auth},enumerable:!1,configurable:!0}),e.USER_MAP=new WeakMap,e}(),Ii=z,wi=function(){function e(e,t){if(this.app=e,t.isInitialized())return this._delegate=t.getImmediate(),void this.linkUnderlyingAuth();var n=e.options.apiKey;Ii(n,"invalid-api-key",{appName:e.name});var r=[ke];if("undefined"!=typeof window){r=function(e,t){var n=ci();if(!(null==n?void 0:n.sessionStorage))return[];var r=Ee(ai,e,t);switch(n.sessionStorage.getItem(r)){case oi.NONE:return[ke];case oi.LOCAL:return[_n,jn];case oi.SESSION:return[jn];default:return[]}}(n,e.name);for(var i=0,o=[_n,rn];i<o.length;i++){var s=o[i];r.includes(s)||r.push(s)}}Ii(n,"invalid-api-key",{appName:e.name});var a="undefined"!=typeof window?fi:void 0;this._delegate=t.initialize({options:{persistence:r,popupRedirectResolver:a}}),this._delegate._updateErrorMap(U),this.linkUnderlyingAuth()}return Object.defineProperty(e.prototype,"emulatorConfig",{get:function(){return this._delegate.emulatorConfig},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currentUser",{get:function(){return this._delegate.currentUser?_i.getOrCreate(this._delegate.currentUser):null},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageCode",{get:function(){return this._delegate.languageCode},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"settings",{get:function(){return this._delegate.settings},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"tenantId",{get:function(){return this._delegate.tenantId},enumerable:!1,configurable:!0}),e.prototype.useDeviceLanguage=function(){this._delegate.useDeviceLanguage()},e.prototype.signOut=function(){return this._delegate.signOut()},e.prototype.useEmulator=function(e,t){We(this._delegate,e,t)},e.prototype.applyActionCode=function(e){return function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,Ke(A(e),{oobCode:t})];case 1:return n.sent(),[2]}}))}))}(this._delegate,e)},e.prototype.checkActionCode=function(e){return Ft(this._delegate,e)},e.prototype.confirmPasswordReset=function(e,t){return function(e,t,n){return u(this,void 0,void 0,(function(){return c(this,(function(r){switch(r.label){case 0:return[4,Be(A(e),{oobCode:t,newPassword:n})];case 1:return r.sent(),[2]}}))}))}(this._delegate,e,t)},e.prototype.createUserWithEmailAndPassword=function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){return[2,gi(this._delegate,xt(this._delegate,e,t))]}))}))},e.prototype.fetchProvidersForEmail=function(e){return this.fetchSignInMethodsForEmail(e)},e.prototype.fetchSignInMethodsForEmail=function(e){return function(e,t){return u(this,void 0,void 0,(function(){var n,r;return c(this,(function(i){switch(i.label){case 0:return n=Y()?J():"http://localhost",r={identifier:t,continueUri:n},[4,Vt(A(e),r)];case 1:return[2,i.sent().signinMethods||[]]}}))}))}(this._delegate,e)},e.prototype.isSignInWithEmailLink=function(e){return function(e,t){var n=ct.parseLink(t);return"EMAIL_SIGNIN"===(null==n?void 0:n.operation)}(this._delegate,e)},e.prototype.getRedirectResult=function(){return u(this,void 0,void 0,(function(){var e;return c(this,(function(t){switch(t.label){case 0:return Ii(ni(),this._delegate,"operation-not-supported-in-this-environment"),[4,or(this._delegate,fi)];case 1:return(e=t.sent())?[2,gi(this._delegate,Promise.resolve(e))]:[2,{credential:null,user:null}]}}))}))},e.prototype.onAuthStateChanged=function(e,t,n){var r=Ti(e,t,n),i=r.next,o=r.error,s=r.complete;return this._delegate.onAuthStateChanged(i,o,s)},e.prototype.onIdTokenChanged=function(e,t,n){var r=Ti(e,t,n),i=r.next,o=r.error,s=r.complete;return this._delegate.onIdTokenChanged(i,o,s)},e.prototype.sendSignInLinkToEmail=function(e,t){
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
return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return r=A(e),i={requestType:"EMAIL_SIGNIN",email:t},z(n.handleCodeInApp,r,"argument-error"),n&&Ut(r,i,n),[4,$e(r,i)];case 1:return o.sent(),[2]}}))}))}(this._delegate,e,t)},e.prototype.sendPasswordResetEmail=function(e,t){return function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return r=A(e),i={requestType:"PASSWORD_RESET",email:t},n&&Ut(r,i,n),[4,Ze(r,i)];case 1:return o.sent(),[2]}}))}))}(this._delegate,e,t||void 0)},e.prototype.setPersistence=function(e){return u(this,void 0,void 0,(function(){var t,n;return c(this,(function(r){switch(r.label){case 0:switch(function(e,t){si(Object.values(oi).includes(t),e,"invalid-persistence-type"),v()?si(t!==oi.SESSION,e,"unsupported-persistence-type"):f()?si(t===oi.NONE,e,"unsupported-persistence-type"):ti()?si(t===oi.NONE||t===oi.LOCAL&&g(),e,"unsupported-persistence-type"):si(t===oi.NONE||ei(),e,"unsupported-persistence-type")}(this._delegate,e),e){case oi.SESSION:return[3,1];case oi.LOCAL:return[3,2];case oi.NONE:return[3,4]}return[3,5];case 1:return t=jn,[3,6];case 2:return[4,K(_n)._isAvailable()];case 3:return n=r.sent(),t=n?_n:rn,[3,6];case 4:return t=ke,[3,6];case 5:return[2,j("argument-error",{appName:this._delegate.name})];case 6:return[2,this._delegate.setPersistence(t)]}}))}))},e.prototype.signInAndRetrieveDataWithCredential=function(e){return this.signInWithCredential(e)},e.prototype.signInAnonymously=function(){return gi(this._delegate,function(e){var t;return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return n=Ve(e),(null===(t=n.currentUser)||void 0===t?void 0:t.isAnonymous)?[2,new _t({user:n.currentUser,providerId:null,operationType:"signIn"})]:[4,bt(n,{returnSecureToken:!0})];case 1:return r=o.sent(),[4,_t._fromIdTokenResponse(n,"signIn",r,!0)];case 2:return i=o.sent(),[4,n._updateCurrentUser(i.user)];case 3:return o.sent(),[2,i]}}))}))}(this._delegate))},e.prototype.signInWithCredential=function(e){return gi(this._delegate,Ot(this._delegate,e))},e.prototype.signInWithCustomToken=function(e){return gi(this._delegate,function(e,t){return u(this,void 0,void 0,(function(){var n,r,i;return c(this,(function(o){switch(o.label){case 0:return[4,Lt(n=Ve(e),{token:t,returnSecureToken:!0})];case 1:return r=o.sent(),[4,_t._fromIdTokenResponse(n,"signIn",r)];case 2:return i=o.sent(),[4,n._updateCurrentUser(i.user)];case 3:return o.sent(),[2,i]}}))}))}(this._delegate,e))},e.prototype.signInWithEmailAndPassword=function(e,t){return gi(this._delegate,function(e,t,n){return Ot(A(e),lt.credential(t,n))}(this._delegate,e,t))},e.prototype.signInWithEmailLink=function(e,t){return gi(this._delegate,function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){return r=A(e),z((i=lt.credentialWithLink(t,n||J()))._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),[2,Ot(r,i)]}))}))}(this._delegate,e,t))},e.prototype.signInWithPhoneNumber=function(e,t){return yi(this._delegate,function(e,t,n){return u(this,void 0,void 0,(function(){var r,i;return c(this,(function(o){switch(o.label){case 0:return[4,Sr(r=Ve(e),t,n)];case 1:return i=o.sent(),[2,new Er(i,(function(e){return Ot(r,e)}))]}}))}))}(this._delegate,e,pi(t)))},e.prototype.signInWithPopup=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){return Ii(ni(),this._delegate,"operation-not-supported-in-this-environment"),[2,gi(this._delegate,Or(this._delegate,e,fi))]}))}))},e.prototype.signInWithRedirect=function(e){return u(this,void 0,void 0,(function(){return c(this,(function(t){switch(t.label){case 0:return Ii(ni(),this._delegate,"operation-not-supported-in-this-environment"),[4,ui(this._delegate)];case 1:return t.sent(),[2,nr(this._delegate,e,fi)]}}))}))},e.prototype.updateCurrentUser=function(e){return this._delegate.updateCurrentUser(pi(e))},e.prototype.verifyPasswordResetCode=function(e){return function(e,t){return u(this,void 0,void 0,(function(){return c(this,(function(n){switch(n.label){case 0:return[4,Ft(A(e),t)];case 1:return[2,n.sent().data.email]}}))}))}(this._delegate,e)},e.prototype.unwrap=function(){return this._delegate},e.prototype._delete=function(){return this._delegate._delete()},e.prototype.linkUnderlyingAuth=function(){var e=this;this._delegate.wrapped=function(){return e}},e}();
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
     */function Ti(e,t,n){var r=e;"function"!=typeof e&&(r=e.next,t=e.error,n=e.complete);var i=r;return{next:function(e){return i(e&&_i.getOrCreate(e))},error:t,complete:n}}
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
     */var ki,Ei=function(){function e(){this.providerId="phone",this._delegate=new Pr(unwrap(r.default.auth()))}return e.credential=function(e,t){return Pr.credential(e,t)},e.prototype.verifyPhoneNumber=function(e,t){return this._delegate.verifyPhoneNumber(e,t)},e.prototype.unwrap=function(){return this._delegate},e.PHONE_SIGN_IN_METHOD=Pr.PHONE_SIGN_IN_METHOD,e.PROVIDER_ID=Pr.PROVIDER_ID,e}(),Ri=z,Si=function(){function e(e,t,n){var i;void 0===n&&(n=r.default.app()),Ri(null===(i=n.options)||void 0===i?void 0:i.apiKey,"invalid-api-key",{appName:n.name}),this._delegate=new kr(e,t,n.auth()),this.type=this._delegate.type}return e.prototype.clear=function(){this._delegate.clear()},e.prototype.render=function(){return this._delegate.render()},e.prototype.verify=function(){return this._delegate.verify()},e}();
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
     */(ki=r.default).INTERNAL.registerComponent(new M("auth-compat",(function(e){var t=e.getProvider("app-compat").getImmediate(),n=e.getProvider("auth-exp");return new wi(t,n)}),"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"}},EmailAuthProvider:lt,FacebookAuthProvider:pt,GithubAuthProvider:mt,GoogleAuthProvider:vt,OAuthProvider:ft,PhoneAuthProvider:Ei,PhoneMultiFactorGenerator:Mr,RecaptchaVerifier:Si,TwitterAuthProvider:yt,Auth:{Persistence:oi},AuthCredential:qe}).setInstantiationMode("LAZY").setMultipleInstances(!1)),ki.registerVersion("@firebase/auth-compat","0.0.900-exp.b0c8425bc")}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-auth-compat.js - be sure to load firebase-app.js first.")}}));
//# sourceMappingURL=firebase-auth-compat.js.map
