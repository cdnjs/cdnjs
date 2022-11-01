/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.99
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
define(["./AttributeCompression-5b18be52","./Matrix3-edb29a7e","./Math-a304e2d6","./Matrix2-7a2bab7e","./createTaskProcessorWorker","./ComponentDatatype-e86a9f87","./defaultValue-135942ca","./WebGLConstants-fcb70ee3","./RuntimeError-f0dada00"],(function(e,a,t,r,n,o,i,s,c){"use strict";const u=32767,p=new a.Cartographic,l=new a.Cartesian3,f=new r.Rectangle,b=new a.Ellipsoid,d={min:void 0,max:void 0};return n((function(n,o){const i=new Uint16Array(n.positions);!function(e){e=new Float64Array(e);let t=0;d.min=e[t++],d.max=e[t++],r.Rectangle.unpack(e,t,f),t+=r.Rectangle.packedLength,a.Ellipsoid.unpack(e,t,b)}(n.packedBuffer);const s=f,c=b,m=d.min,h=d.max,C=i.length/3,g=i.subarray(0,C),w=i.subarray(C,2*C),k=i.subarray(2*C,3*C);e.AttributeCompression.zigZagDeltaDecode(g,w,k);const y=new Float64Array(i.length);for(let e=0;e<C;++e){const r=g[e],n=w[e],o=k[e],i=t.CesiumMath.lerp(s.west,s.east,r/u),f=t.CesiumMath.lerp(s.south,s.north,n/u),b=t.CesiumMath.lerp(m,h,o/u),d=a.Cartographic.fromRadians(i,f,b,p),C=c.cartographicToCartesian(d,l);a.Cartesian3.pack(C,y,3*e)}return o.push(y.buffer),{positions:y.buffer}}))}));
