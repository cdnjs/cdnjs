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
define(["./defaultValue-97284df2","./Matrix2-73789715","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225","./RuntimeError-4f8ec8a2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./IndexDatatype-65271ba3","./WallGeometryLibrary-27f90b78","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./arrayRemoveDuplicates-6f91355d","./PolylinePipeline-ebd42f23","./EllipsoidGeodesic-ed8a0e40","./EllipsoidRhumbLine-60f14314","./IntersectionTests-33ace2d6","./Plane-e916220d"],(function(e,i,t,n,o,a,s,r,l,d,m,u,p,c,f,h,g,y){"use strict";const _=new i.Cartesian3,E=new i.Cartesian3;function H(t){const o=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,a=t.maximumHeights,s=t.minimumHeights,r=e.defaultValue(t.granularity,n.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(t.ellipsoid,i.Ellipsoid.WGS84);this._positions=o,this._minimumHeights=s,this._maximumHeights=a,this._granularity=r,this._ellipsoid=i.Ellipsoid.clone(l),this._workerName="createWallOutlineGeometry";let d=1+o.length*i.Cartesian3.packedLength+2;e.defined(s)&&(d+=s.length),e.defined(a)&&(d+=a.length),this.packedLength=d+i.Ellipsoid.packedLength+1}H.pack=function(t,n,o){let a;o=e.defaultValue(o,0);const s=t._positions;let r=s.length;for(n[o++]=r,a=0;a<r;++a,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[a],n,o);const l=t._minimumHeights;if(r=e.defined(l)?l.length:0,n[o++]=r,e.defined(l))for(a=0;a<r;++a)n[o++]=l[a];const d=t._maximumHeights;if(r=e.defined(d)?d.length:0,n[o++]=r,e.defined(d))for(a=0;a<r;++a)n[o++]=d[a];return i.Ellipsoid.pack(t._ellipsoid,n,o),n[o+=i.Ellipsoid.packedLength]=t._granularity,n};const C=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),b={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:C,granularity:void 0};return H.unpack=function(t,n,o){let a;n=e.defaultValue(n,0);let s=t[n++];const r=new Array(s);for(a=0;a<s;++a,n+=i.Cartesian3.packedLength)r[a]=i.Cartesian3.unpack(t,n);let l,d;if(s=t[n++],s>0)for(l=new Array(s),a=0;a<s;++a)l[a]=t[n++];if(s=t[n++],s>0)for(d=new Array(s),a=0;a<s;++a)d[a]=t[n++];const m=i.Ellipsoid.unpack(t,n,C),u=t[n+=i.Ellipsoid.packedLength];return e.defined(o)?(o._positions=r,o._minimumHeights=l,o._maximumHeights=d,o._ellipsoid=i.Ellipsoid.clone(m,o._ellipsoid),o._granularity=u,o):(b.positions=r,b.minimumHeights=l,b.maximumHeights=d,b.granularity=u,new H(b))},H.fromConstantHeights=function(i){const t=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;let n,o;const a=i.minimumHeight,s=i.maximumHeight,r=e.defined(a),l=e.defined(s);if(r||l){const e=t.length;n=r?new Array(e):void 0,o=l?new Array(e):void 0;for(let i=0;i<e;++i)r&&(n[i]=a),l&&(o[i]=s)}return new H({positions:t,maximumHeights:o,minimumHeights:n,ellipsoid:i.ellipsoid})},H.createGeometry=function(o){const d=o._positions,m=o._minimumHeights,u=o._maximumHeights,p=o._granularity,c=o._ellipsoid,f=l.WallGeometryLibrary.computePositions(c,d,u,m,p,!1);if(!e.defined(f))return;const h=f.bottomPositions,g=f.topPositions;let y=g.length,H=2*y;const C=new Float64Array(H);let b,A=0;for(y/=3,b=0;b<y;++b){const e=3*b,t=i.Cartesian3.fromArray(g,e,_),n=i.Cartesian3.fromArray(h,e,E);C[A++]=n.x,C[A++]=n.y,C[A++]=n.z,C[A++]=t.x,C[A++]=t.y,C[A++]=t.z}const k=new s.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:C})}),w=H/3;H=2*w-4+w;const x=r.IndexDatatype.createTypedArray(w,H);let G=0;for(b=0;b<w-2;b+=2){const e=b,t=b+2,o=i.Cartesian3.fromArray(C,3*e,_),a=i.Cartesian3.fromArray(C,3*t,E);if(i.Cartesian3.equalsEpsilon(o,a,n.CesiumMath.EPSILON10))continue;const s=b+1,r=b+3;x[G++]=s,x[G++]=e,x[G++]=s,x[G++]=r,x[G++]=e,x[G++]=t}return x[G++]=w-2,x[G++]=w-1,new a.Geometry({attributes:k,indices:x,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere.fromVertices(C)})},function(t,n){return e.defined(n)&&(t=H.unpack(t,n)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),H.createGeometry(t)}}));
