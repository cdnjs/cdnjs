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
define(["./Transforms-0c3fa360","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./defaultValue-a6eb9f34","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryOffsetAttribute-102da468","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./RuntimeError-07496d94","./WebGLConstants-d81b330d"],(function(t,e,n,a,i,r,o,u,s,m,f){"use strict";const c=new e.Cartesian3;function d(t){const n=(t=a.defaultValue(t,a.defaultValue.EMPTY_OBJECT)).minimum,i=t.maximum;this._min=e.Cartesian3.clone(n),this._max=e.Cartesian3.clone(i),this._offsetAttribute=t.offsetAttribute,this._workerName="createBoxOutlineGeometry"}d.fromDimensions=function(t){const n=(t=a.defaultValue(t,a.defaultValue.EMPTY_OBJECT)).dimensions,i=e.Cartesian3.multiplyByScalar(n,.5,new e.Cartesian3);return new d({minimum:e.Cartesian3.negate(i,new e.Cartesian3),maximum:i,offsetAttribute:t.offsetAttribute})},d.fromAxisAlignedBoundingBox=function(t){return new d({minimum:t.minimum,maximum:t.maximum})},d.packedLength=2*e.Cartesian3.packedLength+1,d.pack=function(t,n,i){return i=a.defaultValue(i,0),e.Cartesian3.pack(t._min,n,i),e.Cartesian3.pack(t._max,n,i+e.Cartesian3.packedLength),n[i+2*e.Cartesian3.packedLength]=a.defaultValue(t._offsetAttribute,-1),n};const p=new e.Cartesian3,l=new e.Cartesian3,y={minimum:p,maximum:l,offsetAttribute:void 0};return d.unpack=function(t,n,i){n=a.defaultValue(n,0);const r=e.Cartesian3.unpack(t,n,p),o=e.Cartesian3.unpack(t,n+e.Cartesian3.packedLength,l),u=t[n+2*e.Cartesian3.packedLength];return a.defined(i)?(i._min=e.Cartesian3.clone(r,i._min),i._max=e.Cartesian3.clone(o,i._max),i._offsetAttribute=-1===u?void 0:u,i):(y.offsetAttribute=-1===u?void 0:u,new d(y))},d.createGeometry=function(u){const s=u._min,m=u._max;if(e.Cartesian3.equals(s,m))return;const f=new r.GeometryAttributes,d=new Uint16Array(24),p=new Float64Array(24);p[0]=s.x,p[1]=s.y,p[2]=s.z,p[3]=m.x,p[4]=s.y,p[5]=s.z,p[6]=m.x,p[7]=m.y,p[8]=s.z,p[9]=s.x,p[10]=m.y,p[11]=s.z,p[12]=s.x,p[13]=s.y,p[14]=m.z,p[15]=m.x,p[16]=s.y,p[17]=m.z,p[18]=m.x,p[19]=m.y,p[20]=m.z,p[21]=s.x,p[22]=m.y,p[23]=m.z,f.position=new i.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p}),d[0]=4,d[1]=5,d[2]=5,d[3]=6,d[4]=6,d[5]=7,d[6]=7,d[7]=4,d[8]=0,d[9]=1,d[10]=1,d[11]=2,d[12]=2,d[13]=3,d[14]=3,d[15]=0,d[16]=0,d[17]=4,d[18]=1,d[19]=5,d[20]=2,d[21]=6,d[22]=3,d[23]=7;const l=e.Cartesian3.subtract(m,s,c),y=.5*e.Cartesian3.magnitude(l);if(a.defined(u._offsetAttribute)){const t=p.length,e=u._offsetAttribute===o.GeometryOffsetAttribute.NONE?0:1,a=new Uint8Array(t/3).fill(e);f.applyOffset=new i.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})}return new i.Geometry({attributes:f,indices:d,primitiveType:i.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(e.Cartesian3.ZERO,y),offsetAttribute:u._offsetAttribute})},function(t,e){return a.defined(e)&&(t=d.unpack(t,e)),d.createGeometry(t)}}));
