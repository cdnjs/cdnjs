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
define(["./defaultValue-a6eb9f34","./Matrix2-276d97d2","./Transforms-0c3fa360","./ComponentDatatype-7f6d9570","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./IndexDatatype-856d3a0c","./WallGeometryLibrary-e26c7d83","./RuntimeError-07496d94","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./WebGLConstants-d81b330d","./arrayRemoveDuplicates-7ccf3114","./PolylinePipeline-f9c3fc71","./EllipsoidGeodesic-3107c30b","./EllipsoidRhumbLine-f1dbc710","./IntersectionTests-fbcff83c","./Plane-17fe9d66"],(function(e,i,t,n,o,s,a,r,l,m,d,u,c,p,f,h,g,y){"use strict";const _=new i.Cartesian3,E=new i.Cartesian3;function H(t){const o=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,s=t.maximumHeights,a=t.minimumHeights,r=e.defaultValue(t.granularity,n.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(t.ellipsoid,i.Ellipsoid.WGS84);this._positions=o,this._minimumHeights=a,this._maximumHeights=s,this._granularity=r,this._ellipsoid=i.Ellipsoid.clone(l),this._workerName="createWallOutlineGeometry";let m=1+o.length*i.Cartesian3.packedLength+2;e.defined(a)&&(m+=a.length),e.defined(s)&&(m+=s.length),this.packedLength=m+i.Ellipsoid.packedLength+1}H.pack=function(t,n,o){let s;o=e.defaultValue(o,0);const a=t._positions;let r=a.length;for(n[o++]=r,s=0;s<r;++s,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(a[s],n,o);const l=t._minimumHeights;if(r=e.defined(l)?l.length:0,n[o++]=r,e.defined(l))for(s=0;s<r;++s)n[o++]=l[s];const m=t._maximumHeights;if(r=e.defined(m)?m.length:0,n[o++]=r,e.defined(m))for(s=0;s<r;++s)n[o++]=m[s];return i.Ellipsoid.pack(t._ellipsoid,n,o),n[o+=i.Ellipsoid.packedLength]=t._granularity,n};const C=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),b={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:C,granularity:void 0};return H.unpack=function(t,n,o){let s;n=e.defaultValue(n,0);let a=t[n++];const r=new Array(a);for(s=0;s<a;++s,n+=i.Cartesian3.packedLength)r[s]=i.Cartesian3.unpack(t,n);let l,m;if(a=t[n++],a>0)for(l=new Array(a),s=0;s<a;++s)l[s]=t[n++];if(a=t[n++],a>0)for(m=new Array(a),s=0;s<a;++s)m[s]=t[n++];const d=i.Ellipsoid.unpack(t,n,C),u=t[n+=i.Ellipsoid.packedLength];return e.defined(o)?(o._positions=r,o._minimumHeights=l,o._maximumHeights=m,o._ellipsoid=i.Ellipsoid.clone(d,o._ellipsoid),o._granularity=u,o):(b.positions=r,b.minimumHeights=l,b.maximumHeights=m,b.granularity=u,new H(b))},H.fromConstantHeights=function(i){const t=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;let n,o;const s=i.minimumHeight,a=i.maximumHeight,r=e.defined(s),l=e.defined(a);if(r||l){const e=t.length;n=r?new Array(e):void 0,o=l?new Array(e):void 0;for(let i=0;i<e;++i)r&&(n[i]=s),l&&(o[i]=a)}return new H({positions:t,maximumHeights:o,minimumHeights:n,ellipsoid:i.ellipsoid})},H.createGeometry=function(l){const m=l._positions,d=l._minimumHeights,u=l._maximumHeights,c=l._granularity,p=l._ellipsoid,f=r.WallGeometryLibrary.computePositions(p,m,u,d,c,!1);if(!e.defined(f))return;const h=f.bottomPositions,g=f.topPositions;let y=g.length,H=2*y;const C=new Float64Array(H);let b,A=0;for(y/=3,b=0;b<y;++b){const e=3*b,t=i.Cartesian3.fromArray(g,e,_),n=i.Cartesian3.fromArray(h,e,E);C[A++]=n.x,C[A++]=n.y,C[A++]=n.z,C[A++]=t.x,C[A++]=t.y,C[A++]=t.z}const k=new s.GeometryAttributes({position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:C})}),w=H/3;H=2*w-4+w;const x=a.IndexDatatype.createTypedArray(w,H);let G=0;for(b=0;b<w-2;b+=2){const e=b,t=b+2,o=i.Cartesian3.fromArray(C,3*e,_),s=i.Cartesian3.fromArray(C,3*t,E);if(i.Cartesian3.equalsEpsilon(o,s,n.CesiumMath.EPSILON10))continue;const a=b+1,r=b+3;x[G++]=a,x[G++]=e,x[G++]=a,x[G++]=r,x[G++]=e,x[G++]=t}return x[G++]=w-2,x[G++]=w-1,new o.Geometry({attributes:k,indices:x,primitiveType:o.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere.fromVertices(C)})},function(t,n){return e.defined(n)&&(t=H.unpack(t,n)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),H.createGeometry(t)}}));
