/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
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
define(["./AttributeCompression-28a6d524","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./createTaskProcessorWorker","./defaultValue-a6eb9f34","./RuntimeError-07496d94","./WebGLConstants-d81b330d"],(function(e,t,a,r,n,o,i){"use strict";const s=32767,c=new t.Cartographic,u=new t.Cartesian3,p=new t.Rectangle,l=new t.Ellipsoid,d={min:void 0,max:void 0};return r((function(r,n){const o=new Uint16Array(r.positions);!function(e){e=new Float64Array(e);let a=0;d.min=e[a++],d.max=e[a++],t.Rectangle.unpack(e,a,p),a+=t.Rectangle.packedLength,t.Ellipsoid.unpack(e,a,l)}(r.packedBuffer);const i=p,f=l,m=d.min,h=d.max,C=o.length/3,g=o.subarray(0,C),b=o.subarray(C,2*C),w=o.subarray(2*C,3*C);e.AttributeCompression.zigZagDeltaDecode(g,b,w);const k=new Float64Array(o.length);for(let e=0;e<C;++e){const r=g[e],n=b[e],o=w[e],p=a.CesiumMath.lerp(i.west,i.east,r/s),l=a.CesiumMath.lerp(i.south,i.north,n/s),d=a.CesiumMath.lerp(m,h,o/s),C=t.Cartographic.fromRadians(p,l,d,c),y=f.cartographicToCartesian(C,u);t.Cartesian3.pack(y,k,3*e)}return n.push(k.buffer),{positions:k.buffer}}))}));
