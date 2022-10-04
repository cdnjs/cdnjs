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
define(["exports","./defaultValue-65031fc5","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9"],(function(n,e,t,r){"use strict";const N={UNSIGNED_BYTE:r.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:r.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:r.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(n){switch(n){case N.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case N.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case N.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}},fromSizeInBytes:function(n){switch(n){case 2:return N.UNSIGNED_SHORT;case 4:return N.UNSIGNED_INT;case 1:return N.UNSIGNED_BYTE}},validate:function(n){return e.defined(n)&&(n===N.UNSIGNED_BYTE||n===N.UNSIGNED_SHORT||n===N.UNSIGNED_INT)},createTypedArray:function(n,e){return n>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(e):new Uint16Array(e)},createTypedArrayFromArrayBuffer:function(n,e,r,N){return n>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(e,r,N):new Uint16Array(e,r,N)},fromTypedArray:function(n){return n instanceof Uint8Array?N.UNSIGNED_BYTE:n instanceof Uint16Array?N.UNSIGNED_SHORT:n instanceof Uint32Array?N.UNSIGNED_INT:void 0}};var E=Object.freeze(N);n.IndexDatatype=E}));
