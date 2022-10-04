/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98.1
 *
 * Copyright 2011-2022 Cesium Contributors
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
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./defaultValue-65031fc5"],(function(e){"use strict";return function(r){let t;return function(n){const s=n.data,a=[],i={id:s.id,result:void 0,error:void 0};return Promise.resolve(function(e,r,t){let n;try{return n=e(r,t),n}catch(e){return Promise.reject(e)}}(r,s.parameters,a)).then((function(e){i.result=e})).catch((function(e){e instanceof Error?i.error={name:e.name,message:e.message,stack:e.stack}:i.error=e})).finally((function(){e.defined(t)||(t=e.defaultValue(self.webkitPostMessage,self.postMessage)),s.canTransferArrayBuffer||(a.length=0);try{t(i,a)}catch(r){i.result=void 0,i.error=`postMessage failed with error: ${function(r){let t;const n=r.name,s=r.message;t=e.defined(n)&&e.defined(s)?`${n}: ${s}`:r.toString();const a=r.stack;return e.defined(a)&&(t+=`\n${a}`),t}(r)}\n  with responseMessage: ${JSON.stringify(i)}`,t(i)}}))}}}));
