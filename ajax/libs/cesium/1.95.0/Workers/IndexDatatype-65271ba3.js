/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
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
define(["exports","./defaultValue-97284df2","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./WebGLConstants-6da700a2"],(function(e,n,r,t,N){"use strict";const a={UNSIGNED_BYTE:N.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:N.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:N.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(e){switch(e){case a.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case a.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case a.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},fromSizeInBytes:function(e){switch(e){case 2:return a.UNSIGNED_SHORT;case 4:return a.UNSIGNED_INT;case 1:return a.UNSIGNED_BYTE}},validate:function(e){return n.defined(e)&&(e===a.UNSIGNED_BYTE||e===a.UNSIGNED_SHORT||e===a.UNSIGNED_INT)},createTypedArray:function(e,n){return e>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(n):new Uint16Array(n)},createTypedArrayFromArrayBuffer:function(e,n,r,N){return e>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(n,r,N):new Uint16Array(n,r,N)},fromTypedArray:function(e){return e instanceof Uint8Array?a.UNSIGNED_BYTE:e instanceof Uint16Array?a.UNSIGNED_SHORT:e instanceof Uint32Array?a.UNSIGNED_INT:void 0}};var E=Object.freeze(a);e.IndexDatatype=E}));
