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
define(["./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./defaultValue-97284df2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2"],(function(e,t,n,a,i,r,o,u,s,m,f){"use strict";const c=new t.Cartesian3;function d(e){const n=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).minimum,a=e.maximum;this._min=t.Cartesian3.clone(n),this._max=t.Cartesian3.clone(a),this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxOutlineGeometry"}d.fromDimensions=function(e){const n=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).dimensions,a=t.Cartesian3.multiplyByScalar(n,.5,new t.Cartesian3);return new d({minimum:t.Cartesian3.negate(a,new t.Cartesian3),maximum:a,offsetAttribute:e.offsetAttribute})},d.fromAxisAlignedBoundingBox=function(e){return new d({minimum:e.minimum,maximum:e.maximum})},d.packedLength=2*t.Cartesian3.packedLength+1,d.pack=function(e,n,a){return a=i.defaultValue(a,0),t.Cartesian3.pack(e._min,n,a),t.Cartesian3.pack(e._max,n,a+t.Cartesian3.packedLength),n[a+2*t.Cartesian3.packedLength]=i.defaultValue(e._offsetAttribute,-1),n};const p=new t.Cartesian3,l=new t.Cartesian3,y={minimum:p,maximum:l,offsetAttribute:void 0};return d.unpack=function(e,n,a){n=i.defaultValue(n,0);const r=t.Cartesian3.unpack(e,n,p),o=t.Cartesian3.unpack(e,n+t.Cartesian3.packedLength,l),u=e[n+2*t.Cartesian3.packedLength];return i.defined(a)?(a._min=t.Cartesian3.clone(r,a._min),a._max=t.Cartesian3.clone(o,a._max),a._offsetAttribute=-1===u?void 0:u,a):(y.offsetAttribute=-1===u?void 0:u,new d(y))},d.createGeometry=function(n){const s=n._min,m=n._max;if(t.Cartesian3.equals(s,m))return;const f=new o.GeometryAttributes,d=new Uint16Array(24),p=new Float64Array(24);p[0]=s.x,p[1]=s.y,p[2]=s.z,p[3]=m.x,p[4]=s.y,p[5]=s.z,p[6]=m.x,p[7]=m.y,p[8]=s.z,p[9]=s.x,p[10]=m.y,p[11]=s.z,p[12]=s.x,p[13]=s.y,p[14]=m.z,p[15]=m.x,p[16]=s.y,p[17]=m.z,p[18]=m.x,p[19]=m.y,p[20]=m.z,p[21]=s.x,p[22]=m.y,p[23]=m.z,f.position=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p}),d[0]=4,d[1]=5,d[2]=5,d[3]=6,d[4]=6,d[5]=7,d[6]=7,d[7]=4,d[8]=0,d[9]=1,d[10]=1,d[11]=2,d[12]=2,d[13]=3,d[14]=3,d[15]=0,d[16]=0,d[17]=4,d[18]=1,d[19]=5,d[20]=2,d[21]=6,d[22]=3,d[23]=7;const l=t.Cartesian3.subtract(m,s,c),y=.5*t.Cartesian3.magnitude(l);if(i.defined(n._offsetAttribute)){const e=p.length,t=n._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,i=new Uint8Array(e/3).fill(t);f.applyOffset=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}return new r.Geometry({attributes:f,indices:d,primitiveType:r.PrimitiveType.LINES,boundingSphere:new e.BoundingSphere(t.Cartesian3.ZERO,y),offsetAttribute:n._offsetAttribute})},function(e,t){return i.defined(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}}));
