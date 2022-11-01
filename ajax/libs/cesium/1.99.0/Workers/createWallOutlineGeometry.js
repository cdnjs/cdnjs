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
define(["./defaultValue-135942ca","./Matrix3-edb29a7e","./Transforms-3ea76111","./ComponentDatatype-e86a9f87","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./IndexDatatype-3a8ea78f","./Math-a304e2d6","./WallGeometryLibrary-09ff1b05","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./WebGLConstants-fcb70ee3","./arrayRemoveDuplicates-d35f503f","./PolylinePipeline-6bbc2d22","./EllipsoidGeodesic-048356f7","./EllipsoidRhumbLine-5519960c","./IntersectionTests-f3382f21","./Plane-5bea24eb"],(function(e,i,t,n,a,o,s,r,l,d,m,u,p,c,f,h,g,y,_){"use strict";const E=new i.Cartesian3,b=new i.Cartesian3;function C(t){const n=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,a=t.maximumHeights,o=t.minimumHeights,s=e.defaultValue(t.granularity,r.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(t.ellipsoid,i.Ellipsoid.WGS84);this._positions=n,this._minimumHeights=o,this._maximumHeights=a,this._granularity=s,this._ellipsoid=i.Ellipsoid.clone(l),this._workerName="createWallOutlineGeometry";let d=1+n.length*i.Cartesian3.packedLength+2;e.defined(o)&&(d+=o.length),e.defined(a)&&(d+=a.length),this.packedLength=d+i.Ellipsoid.packedLength+1}C.pack=function(t,n,a){let o;a=e.defaultValue(a,0);const s=t._positions;let r=s.length;for(n[a++]=r,o=0;o<r;++o,a+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[o],n,a);const l=t._minimumHeights;if(r=e.defined(l)?l.length:0,n[a++]=r,e.defined(l))for(o=0;o<r;++o)n[a++]=l[o];const d=t._maximumHeights;if(r=e.defined(d)?d.length:0,n[a++]=r,e.defined(d))for(o=0;o<r;++o)n[a++]=d[o];return i.Ellipsoid.pack(t._ellipsoid,n,a),n[a+=i.Ellipsoid.packedLength]=t._granularity,n};const H=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),A={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:H,granularity:void 0};return C.unpack=function(t,n,a){let o;n=e.defaultValue(n,0);let s=t[n++];const r=new Array(s);for(o=0;o<s;++o,n+=i.Cartesian3.packedLength)r[o]=i.Cartesian3.unpack(t,n);let l,d;if(s=t[n++],s>0)for(l=new Array(s),o=0;o<s;++o)l[o]=t[n++];if(s=t[n++],s>0)for(d=new Array(s),o=0;o<s;++o)d[o]=t[n++];const m=i.Ellipsoid.unpack(t,n,H),u=t[n+=i.Ellipsoid.packedLength];return e.defined(a)?(a._positions=r,a._minimumHeights=l,a._maximumHeights=d,a._ellipsoid=i.Ellipsoid.clone(m,a._ellipsoid),a._granularity=u,a):(A.positions=r,A.minimumHeights=l,A.maximumHeights=d,A.granularity=u,new C(A))},C.fromConstantHeights=function(i){const t=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;let n,a;const o=i.minimumHeight,s=i.maximumHeight,r=e.defined(o),l=e.defined(s);if(r||l){const e=t.length;n=r?new Array(e):void 0,a=l?new Array(e):void 0;for(let i=0;i<e;++i)r&&(n[i]=o),l&&(a[i]=s)}return new C({positions:t,maximumHeights:a,minimumHeights:n,ellipsoid:i.ellipsoid})},C.createGeometry=function(d){const m=d._positions,u=d._minimumHeights,p=d._maximumHeights,c=d._granularity,f=d._ellipsoid,h=l.WallGeometryLibrary.computePositions(f,m,p,u,c,!1);if(!e.defined(h))return;const g=h.bottomPositions,y=h.topPositions;let _=y.length,C=2*_;const H=new Float64Array(C);let A,k=0;for(_/=3,A=0;A<_;++A){const e=3*A,t=i.Cartesian3.fromArray(y,e,E),n=i.Cartesian3.fromArray(g,e,b);H[k++]=n.x,H[k++]=n.y,H[k++]=n.z,H[k++]=t.x,H[k++]=t.y,H[k++]=t.z}const w=new o.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:H})}),x=C/3;C=2*x-4+x;const G=s.IndexDatatype.createTypedArray(x,C);let L=0;for(A=0;A<x-2;A+=2){const e=A,t=A+2,n=i.Cartesian3.fromArray(H,3*e,E),a=i.Cartesian3.fromArray(H,3*t,b);if(i.Cartesian3.equalsEpsilon(n,a,r.CesiumMath.EPSILON10))continue;const o=A+1,s=A+3;G[L++]=o,G[L++]=e,G[L++]=o,G[L++]=s,G[L++]=e,G[L++]=t}return G[L++]=x-2,G[L++]=x-1,new a.Geometry({attributes:w,indices:G,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere.fromVertices(H)})},function(t,n){return e.defined(n)&&(t=C.unpack(t,n)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),C.createGeometry(t)}}));
