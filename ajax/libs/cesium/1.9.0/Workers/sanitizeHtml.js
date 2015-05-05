/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2015 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
!function(){define("Core/defined",[],function(){"use strict";var e=function(e){return void 0!==e};return e}),define("Core/DeveloperError",["./defined"],function(e){"use strict";var r=function(e){this.name="DeveloperError",this.message=e;var r;try{throw new Error}catch(t){r=t.stack}this.stack=r};return r.prototype.toString=function(){var r=this.name+": "+this.message;return e(this.stack)&&(r+="\n"+this.stack.toString()),r},r.throwInstantiationError=function(){throw new r("This function defines an interface and should not be called directly.")},r}),define("Core/deprecationWarning",["./defined","./DeveloperError"],function(e){"use strict";var r={},t=function(t,n){e(r[t])||(r[t]=!0,console.log(n))};return t}),define("Core/RuntimeError",["./defined"],function(e){"use strict";var r=function(e){this.name="RuntimeError",this.message=e;var r;try{throw new Error}catch(t){r=t.stack}this.stack=r};return r.prototype.toString=function(){var r=this.name+": "+this.message;return e(this.stack)&&(r+="\n"+this.stack.toString()),r},r}),define("Core/freezeObject",["./defined"],function(e){"use strict";var r=Object.freeze;return e(r)||(r=function(e){return e}),r}),define("Core/defaultValue",["./freezeObject"],function(e){"use strict";var r=function(e,r){return void 0!==e?e:r};return r.EMPTY_OBJECT=e({}),r}),define("Core/formatError",["./defined"],function(e){"use strict";var r=function(r){var t,n=r.name,i=r.message;t=e(n)&&e(i)?n+": "+i:r.toString();var o=r.stack;return e(o)&&(t+="\n"+o),t};return r}),define("Workers/createTaskProcessorWorker",["../Core/defaultValue","../Core/defined","../Core/formatError"],function(e,r,t){"use strict";var n=function(n){var i,o=[],s={id:void 0,result:void 0,error:void 0};return function(a){var c=a.data;o.length=0,s.id=c.id,s.error=void 0,s.result=void 0;try{s.result=n(c.parameters,o)}catch(u){s.error=u instanceof Error?{name:u.name,message:u.message,stack:u.stack}:u}r(i)||(i=e(self.webkitPostMessage,self.postMessage)),c.canTransferArrayBuffer||(o.length=0);try{i(s,o)}catch(u){s.result=void 0,s.error="postMessage failed with error: "+t(u)+"\n  with responseMessage: "+JSON.stringify(s),i(s)}}};return n}),define("Workers/sanitizeHtml",["../Core/defined","../Core/deprecationWarning","../Core/RuntimeError","./createTaskProcessorWorker"],function(e,r,t,n){"use strict";var i,o="https://caja.appspot.com/html-css-sanitizer-minified.js",s=function(n){if(r("sanitize","The sanitize worker has been deprecated and will be removed in Cesium 1.10."),!e(i)&&(self.window={},importScripts(o),i=window.html_sanitize,!e(i)))throw new t("Unable to load Google Caja sanitizer script.");return i(n)};return n(s)})}();