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
define(["./Transforms-3ea76111","./Matrix2-7a2bab7e","./Matrix3-edb29a7e","./ComponentDatatype-e86a9f87","./CylinderGeometryLibrary-29e6b863","./defaultValue-135942ca","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-3a8ea78f","./Math-a304e2d6","./combine-462d91dd","./RuntimeError-f0dada00","./WebGLConstants-fcb70ee3"],(function(t,e,i,n,a,o,r,s,u,f,d,c,l,b){"use strict";const m=new e.Cartesian2;function p(t){const e=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,n=t.bottomRadius,a=o.defaultValue(t.slices,128),r=Math.max(o.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=n,this._slices=a,this._numberOfVerticalLines=r,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}p.packedLength=6,p.pack=function(t,e,i){return i=o.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=o.defaultValue(t._offsetAttribute,-1),e};const y={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return p.unpack=function(t,e,i){e=o.defaultValue(e,0);const n=t[e++],a=t[e++],r=t[e++],s=t[e++],u=t[e++],f=t[e];return o.defined(i)?(i._length=n,i._topRadius=a,i._bottomRadius=r,i._slices=s,i._numberOfVerticalLines=u,i._offsetAttribute=-1===f?void 0:f,i):(y.length=n,y.topRadius=a,y.bottomRadius=r,y.slices=s,y.numberOfVerticalLines=u,y.offsetAttribute=-1===f?void 0:f,new p(y))},p.createGeometry=function(d){let c=d._length;const l=d._topRadius,b=d._bottomRadius,p=d._slices,y=d._numberOfVerticalLines;if(c<=0||l<0||b<0||0===l&&0===b)return;const _=2*p,h=a.CylinderGeometryLibrary.computePositions(c,l,b,p,!1);let A,R=2*p;if(y>0){const t=Math.min(y,p);A=Math.round(p/t),R+=t}const G=f.IndexDatatype.createTypedArray(_,2*R);let O,V=0;for(O=0;O<p-1;O++)G[V++]=O,G[V++]=O+1,G[V++]=O+p,G[V++]=O+1+p;if(G[V++]=p-1,G[V++]=0,G[V++]=p+p-1,G[V++]=p,y>0)for(O=0;O<p;O+=A)G[V++]=O,G[V++]=O+p;const L=new s.GeometryAttributes;L.position=new r.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h}),m.x=.5*c,m.y=Math.max(b,l);const g=new t.BoundingSphere(i.Cartesian3.ZERO,e.Cartesian2.magnitude(m));if(o.defined(d._offsetAttribute)){c=h.length;const t=d._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,e=new Uint8Array(c/3).fill(t);L.applyOffset=new r.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}return new r.Geometry({attributes:L,indices:G,primitiveType:r.PrimitiveType.LINES,boundingSphere:g,offsetAttribute:d._offsetAttribute})},function(t,e){return o.defined(e)&&(t=p.unpack(t,e)),p.createGeometry(t)}}));
