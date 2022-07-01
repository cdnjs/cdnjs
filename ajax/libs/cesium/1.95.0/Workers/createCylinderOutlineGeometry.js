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
define(["./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./CylinderGeometryLibrary-24ad1484","./defaultValue-97284df2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./IndexDatatype-65271ba3","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2"],(function(t,e,i,n,o,r,a,s,u,f,d,l,c){"use strict";const m=new e.Cartesian2;function b(t){const e=(t=r.defaultValue(t,r.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,n=t.bottomRadius,o=r.defaultValue(t.slices,128),a=Math.max(r.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=n,this._slices=o,this._numberOfVerticalLines=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}b.packedLength=6,b.pack=function(t,e,i){return i=r.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=r.defaultValue(t._offsetAttribute,-1),e};const p={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return b.unpack=function(t,e,i){e=r.defaultValue(e,0);const n=t[e++],o=t[e++],a=t[e++],s=t[e++],u=t[e++],f=t[e];return r.defined(i)?(i._length=n,i._topRadius=o,i._bottomRadius=a,i._slices=s,i._numberOfVerticalLines=u,i._offsetAttribute=-1===f?void 0:f,i):(p.length=n,p.topRadius=o,p.bottomRadius=a,p.slices=s,p.numberOfVerticalLines=u,p.offsetAttribute=-1===f?void 0:f,new b(p))},b.createGeometry=function(i){let d=i._length;const l=i._topRadius,c=i._bottomRadius,b=i._slices,p=i._numberOfVerticalLines;if(d<=0||l<0||c<0||0===l&&0===c)return;const y=2*b,_=o.CylinderGeometryLibrary.computePositions(d,l,c,b,!1);let h,A=2*b;if(p>0){const t=Math.min(p,b);h=Math.round(b/t),A+=t}const R=f.IndexDatatype.createTypedArray(y,2*A);let G,O=0;for(G=0;G<b-1;G++)R[O++]=G,R[O++]=G+1,R[O++]=G+b,R[O++]=G+1+b;if(R[O++]=b-1,R[O++]=0,R[O++]=b+b-1,R[O++]=b,p>0)for(G=0;G<b;G+=h)R[O++]=G,R[O++]=G+b;const V=new s.GeometryAttributes;V.position=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:_}),m.x=.5*d,m.y=Math.max(c,l);const L=new t.BoundingSphere(e.Cartesian3.ZERO,e.Cartesian2.magnitude(m));if(r.defined(i._offsetAttribute)){d=_.length;const t=i._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,e=new Uint8Array(d/3).fill(t);V.applyOffset=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}return new a.Geometry({attributes:V,indices:R,primitiveType:a.PrimitiveType.LINES,boundingSphere:L,offsetAttribute:i._offsetAttribute})},function(t,e){return r.defined(e)&&(t=b.unpack(t,e)),b.createGeometry(t)}}));
