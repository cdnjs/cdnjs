/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98
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
define(["exports","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./defaultValue-50f7432c"],(function(t,e,n,o){"use strict";const a={SCALAR:"SCALAR",VEC2:"VEC2",VEC3:"VEC3",VEC4:"VEC4",MAT2:"MAT2",MAT3:"MAT3",MAT4:"MAT4",getMathType:function(t){switch(t){case a.SCALAR:return Number;case a.VEC2:return e.Cartesian2;case a.VEC3:return e.Cartesian3;case a.VEC4:return e.Cartesian4;case a.MAT2:return e.Matrix2;case a.MAT3:return e.Matrix3;case a.MAT4:return e.Matrix4}},getNumberOfComponents:function(t){switch(t){case a.SCALAR:return 1;case a.VEC2:return 2;case a.VEC3:return 3;case a.VEC4:case a.MAT2:return 4;case a.MAT3:return 9;case a.MAT4:return 16}},getAttributeLocationCount:function(t){switch(t){case a.SCALAR:case a.VEC2:case a.VEC3:case a.VEC4:return 1;case a.MAT2:return 2;case a.MAT3:return 3;case a.MAT4:return 4}},getGlslType:function(t){switch(t){case a.SCALAR:return"float";case a.VEC2:return"vec2";case a.VEC3:return"vec3";case a.VEC4:return"vec4";case a.MAT2:return"mat2";case a.MAT3:return"mat3";case a.MAT4:return"mat4"}}};var r=Object.freeze(a);const c=1/256,s={octEncodeInRange:function(t,e,o){if(o.x=t.x/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),o.y=t.y/(Math.abs(t.x)+Math.abs(t.y)+Math.abs(t.z)),t.z<0){const t=o.x,e=o.y;o.x=(1-Math.abs(e))*n.CesiumMath.signNotZero(t),o.y=(1-Math.abs(t))*n.CesiumMath.signNotZero(e)}return o.x=n.CesiumMath.toSNorm(o.x,e),o.y=n.CesiumMath.toSNorm(o.y,e),o},octEncode:function(t,e){return s.octEncodeInRange(t,255,e)}},u=new e.Cartesian2,i=new Uint8Array(1);function C(t){return i[0]=t,i[0]}s.octEncodeToCartesian4=function(t,e){return s.octEncodeInRange(t,65535,u),e.x=C(u.x*c),e.y=C(u.x),e.z=C(u.y*c),e.w=C(u.y),e},s.octDecodeInRange=function(t,o,a,r){if(r.x=n.CesiumMath.fromSNorm(t,a),r.y=n.CesiumMath.fromSNorm(o,a),r.z=1-(Math.abs(r.x)+Math.abs(r.y)),r.z<0){const t=r.x;r.x=(1-Math.abs(r.y))*n.CesiumMath.signNotZero(t),r.y=(1-Math.abs(t))*n.CesiumMath.signNotZero(r.y)}return e.Cartesian3.normalize(r,r)},s.octDecode=function(t,e,n){return s.octDecodeInRange(t,e,255,n)},s.octDecodeFromCartesian4=function(t,e){const n=256*t.x+t.y,o=256*t.z+t.w;return s.octDecodeInRange(n,o,65535,e)},s.octPackFloat=function(t){return 256*t.x+t.y};const M=new e.Cartesian2;function f(t){return t>>1^-(1&t)}s.octEncodeFloat=function(t){return s.octEncode(t,M),s.octPackFloat(M)},s.octDecodeFloat=function(t,e){const n=t/256,o=Math.floor(n),a=256*(n-o);return s.octDecode(o,a,e)},s.octPack=function(t,e,n,o){const a=s.octEncodeFloat(t),r=s.octEncodeFloat(e),c=s.octEncode(n,M);return o.x=65536*c.x+a,o.y=65536*c.y+r,o},s.octUnpack=function(t,e,n,o){let a=t.x/65536;const r=Math.floor(a),c=65536*(a-r);a=t.y/65536;const u=Math.floor(a),i=65536*(a-u);s.octDecodeFloat(c,e),s.octDecodeFloat(i,n),s.octDecode(r,u,o)},s.compressTextureCoordinates=function(t){return 4096*(4095*t.x|0)+(4095*t.y|0)},s.decompressTextureCoordinates=function(t,e){const n=t/4096,o=Math.floor(n);return e.x=o/4095,e.y=(t-4096*o)/4095,e},s.zigZagDeltaDecode=function(t,e,n){const a=t.length;let r=0,c=0,s=0;for(let u=0;u<a;++u)r+=f(t[u]),c+=f(e[u]),t[u]=r,e[u]=c,o.defined(n)&&(s+=f(n[u]),n[u]=s)},s.dequantize=function(t,e,o,a){const c=r.getNumberOfComponents(o);let s;switch(e){case n.ComponentDatatype.BYTE:s=127;break;case n.ComponentDatatype.UNSIGNED_BYTE:s=255;break;case n.ComponentDatatype.SHORT:s=32767;break;case n.ComponentDatatype.UNSIGNED_SHORT:s=65535;break;case n.ComponentDatatype.INT:s=2147483647;break;case n.ComponentDatatype.UNSIGNED_INT:s=4294967295}const u=new Float32Array(a*c);for(let e=0;e<a;e++)for(let n=0;n<c;n++){const o=e*c+n;u[o]=Math.max(t[o]/s,-1)}return u},s.decodeRGB565=function(t,e){const n=t.length;o.defined(e)||(e=new Float32Array(3*n));const a=1/31;for(let o=0;o<n;o++){const n=t[o],r=n>>11,c=n>>5&63,s=31&n,u=3*o;e[u]=r*a,e[u+1]=.015873015873015872*c,e[u+2]=s*a}return e};var d=s;t.AttributeCompression=d}));
