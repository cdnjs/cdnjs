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
define(["./Transforms-3ea76111","./Matrix3-edb29a7e","./ComponentDatatype-e86a9f87","./defaultValue-135942ca","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryOffsetAttribute-d3a42805","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./WebGLConstants-fcb70ee3"],(function(e,t,n,a,i,r,u,o,s,m,f,c){"use strict";const d=new t.Cartesian3;function p(e){const n=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).minimum,i=e.maximum;this._min=t.Cartesian3.clone(n),this._max=t.Cartesian3.clone(i),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}p.fromDimensions=function(e){const n=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).dimensions,i=t.Cartesian3.multiplyByScalar(n,.5,new t.Cartesian3);return new p({minimum:t.Cartesian3.negate(i,new t.Cartesian3),maximum:i,offsetAttribute:e.offsetAttribute})},p.fromAxisAlignedBoundingBox=function(e){return new p({minimum:e.minimum,maximum:e.maximum})},p.packedLength=2*t.Cartesian3.packedLength+1,p.pack=function(e,n,i){return i=a.defaultValue(i,0),t.Cartesian3.pack(e._min,n,i),t.Cartesian3.pack(e._max,n,i+t.Cartesian3.packedLength),n[i+2*t.Cartesian3.packedLength]=a.defaultValue(e._offsetAttribute,-1),n};const l=new t.Cartesian3,b=new t.Cartesian3,y={minimum:l,maximum:b,offsetAttribute:void 0};return p.unpack=function(e,n,i){n=a.defaultValue(n,0);const r=t.Cartesian3.unpack(e,n,l),u=t.Cartesian3.unpack(e,n+t.Cartesian3.packedLength,b),o=e[n+2*t.Cartesian3.packedLength];return a.defined(i)?(i._min=t.Cartesian3.clone(r,i._min),i._max=t.Cartesian3.clone(u,i._max),i._offsetAttribute=-1===o?void 0:o,i):(y.offsetAttribute=-1===o?void 0:o,new p(y))},p.createGeometry=function(o){const s=o._min,m=o._max;if(t.Cartesian3.equals(s,m))return;const f=new r.GeometryAttributes,c=new Uint16Array(24),p=new Float64Array(24);p[0]=s.x,p[1]=s.y,p[2]=s.z,p[3]=m.x,p[4]=s.y,p[5]=s.z,p[6]=m.x,p[7]=m.y,p[8]=s.z,p[9]=s.x,p[10]=m.y,p[11]=s.z,p[12]=s.x,p[13]=s.y,p[14]=m.z,p[15]=m.x,p[16]=s.y,p[17]=m.z,p[18]=m.x,p[19]=m.y,p[20]=m.z,p[21]=s.x,p[22]=m.y,p[23]=m.z,f.position=new i.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p}),c[0]=4,c[1]=5,c[2]=5,c[3]=6,c[4]=6,c[5]=7,c[6]=7,c[7]=4,c[8]=0,c[9]=1,c[10]=1,c[11]=2,c[12]=2,c[13]=3,c[14]=3,c[15]=0,c[16]=0,c[17]=4,c[18]=1,c[19]=5,c[20]=2,c[21]=6,c[22]=3,c[23]=7;const l=t.Cartesian3.subtract(m,s,d),b=.5*t.Cartesian3.magnitude(l);if(a.defined(o._offsetAttribute)){const e=p.length,t=o._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,a=new Uint8Array(e/3).fill(t);f.applyOffset=new i.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})}return new i.Geometry({attributes:f,indices:c,primitiveType:i.PrimitiveType.LINES,boundingSphere:new e.BoundingSphere(t.Cartesian3.ZERO,b),offsetAttribute:o._offsetAttribute})},function(e,t){return a.defined(t)&&(e=p.unpack(e,t)),p.createGeometry(e)}}));
