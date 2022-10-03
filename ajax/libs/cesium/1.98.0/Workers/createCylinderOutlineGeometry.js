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
define(["./Transforms-f305a473","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./CylinderGeometryLibrary-8bcf1a43","./defaultValue-50f7432c","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryOffsetAttribute-490bc2c9","./IndexDatatype-ceed713e","./combine-8462e002","./RuntimeError-48e1f06d","./WebGLConstants-58abc51a"],(function(t,e,i,n,o,r,a,s,u,f,d,c){"use strict";const l=new e.Cartesian2;function b(t){const e=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,n=t.bottomRadius,r=o.defaultValue(t.slices,128),a=Math.max(o.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=n,this._slices=r,this._numberOfVerticalLines=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}b.packedLength=6,b.pack=function(t,e,i){return i=o.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=o.defaultValue(t._offsetAttribute,-1),e};const m={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return b.unpack=function(t,e,i){e=o.defaultValue(e,0);const n=t[e++],r=t[e++],a=t[e++],s=t[e++],u=t[e++],f=t[e];return o.defined(i)?(i._length=n,i._topRadius=r,i._bottomRadius=a,i._slices=s,i._numberOfVerticalLines=u,i._offsetAttribute=-1===f?void 0:f,i):(m.length=n,m.topRadius=r,m.bottomRadius=a,m.slices=s,m.numberOfVerticalLines=u,m.offsetAttribute=-1===f?void 0:f,new b(m))},b.createGeometry=function(f){let d=f._length;const c=f._topRadius,b=f._bottomRadius,m=f._slices,p=f._numberOfVerticalLines;if(d<=0||c<0||b<0||0===c&&0===b)return;const y=2*m,_=n.CylinderGeometryLibrary.computePositions(d,c,b,m,!1);let h,A=2*m;if(p>0){const t=Math.min(p,m);h=Math.round(m/t),A+=t}const R=u.IndexDatatype.createTypedArray(y,2*A);let G,O=0;for(G=0;G<m-1;G++)R[O++]=G,R[O++]=G+1,R[O++]=G+m,R[O++]=G+1+m;if(R[O++]=m-1,R[O++]=0,R[O++]=m+m-1,R[O++]=m,p>0)for(G=0;G<m;G+=h)R[O++]=G,R[O++]=G+m;const V=new a.GeometryAttributes;V.position=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:_}),l.x=.5*d,l.y=Math.max(b,c);const L=new t.BoundingSphere(e.Cartesian3.ZERO,e.Cartesian2.magnitude(l));if(o.defined(f._offsetAttribute)){d=_.length;const t=f._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1,e=new Uint8Array(d/3).fill(t);V.applyOffset=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}return new r.Geometry({attributes:V,indices:R,primitiveType:r.PrimitiveType.LINES,boundingSphere:L,offsetAttribute:f._offsetAttribute})},function(t,e){return o.defined(e)&&(t=b.unpack(t,e)),b.createGeometry(t)}}));
