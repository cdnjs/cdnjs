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
define(["./defaultValue-50f7432c","./Matrix2-7dfd434a","./Transforms-f305a473","./ComponentDatatype-9b23164a","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./IndexDatatype-ceed713e","./WallGeometryLibrary-a85a8b44","./RuntimeError-48e1f06d","./combine-8462e002","./WebGLConstants-58abc51a","./arrayRemoveDuplicates-fd3a3f4e","./PolylinePipeline-92970340","./EllipsoidGeodesic-8f07d257","./EllipsoidRhumbLine-5454653c","./IntersectionTests-4a7694f7","./Plane-3d30b188"],(function(e,i,t,n,o,a,s,r,l,m,d,u,p,c,f,h,g){"use strict";const y=new i.Cartesian3,_=new i.Cartesian3;function E(t){const o=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,a=t.maximumHeights,s=t.minimumHeights,r=e.defaultValue(t.granularity,n.CesiumMath.RADIANS_PER_DEGREE),l=e.defaultValue(t.ellipsoid,i.Ellipsoid.WGS84);this._positions=o,this._minimumHeights=s,this._maximumHeights=a,this._granularity=r,this._ellipsoid=i.Ellipsoid.clone(l),this._workerName="createWallOutlineGeometry";let m=1+o.length*i.Cartesian3.packedLength+2;e.defined(s)&&(m+=s.length),e.defined(a)&&(m+=a.length),this.packedLength=m+i.Ellipsoid.packedLength+1}E.pack=function(t,n,o){let a;o=e.defaultValue(o,0);const s=t._positions;let r=s.length;for(n[o++]=r,a=0;a<r;++a,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[a],n,o);const l=t._minimumHeights;if(r=e.defined(l)?l.length:0,n[o++]=r,e.defined(l))for(a=0;a<r;++a)n[o++]=l[a];const m=t._maximumHeights;if(r=e.defined(m)?m.length:0,n[o++]=r,e.defined(m))for(a=0;a<r;++a)n[o++]=m[a];return i.Ellipsoid.pack(t._ellipsoid,n,o),n[o+=i.Ellipsoid.packedLength]=t._granularity,n};const b=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),C={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:b,granularity:void 0};return E.unpack=function(t,n,o){let a;n=e.defaultValue(n,0);let s=t[n++];const r=new Array(s);for(a=0;a<s;++a,n+=i.Cartesian3.packedLength)r[a]=i.Cartesian3.unpack(t,n);let l,m;if(s=t[n++],s>0)for(l=new Array(s),a=0;a<s;++a)l[a]=t[n++];if(s=t[n++],s>0)for(m=new Array(s),a=0;a<s;++a)m[a]=t[n++];const d=i.Ellipsoid.unpack(t,n,b),u=t[n+=i.Ellipsoid.packedLength];return e.defined(o)?(o._positions=r,o._minimumHeights=l,o._maximumHeights=m,o._ellipsoid=i.Ellipsoid.clone(d,o._ellipsoid),o._granularity=u,o):(C.positions=r,C.minimumHeights=l,C.maximumHeights=m,C.granularity=u,new E(C))},E.fromConstantHeights=function(i){const t=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;let n,o;const a=i.minimumHeight,s=i.maximumHeight,r=e.defined(a),l=e.defined(s);if(r||l){const e=t.length;n=r?new Array(e):void 0,o=l?new Array(e):void 0;for(let i=0;i<e;++i)r&&(n[i]=a),l&&(o[i]=s)}return new E({positions:t,maximumHeights:o,minimumHeights:n,ellipsoid:i.ellipsoid})},E.createGeometry=function(l){const m=l._positions,d=l._minimumHeights,u=l._maximumHeights,p=l._granularity,c=l._ellipsoid,f=r.WallGeometryLibrary.computePositions(c,m,u,d,p,!1);if(!e.defined(f))return;const h=f.bottomPositions,g=f.topPositions;let E=g.length,b=2*E;const C=new Float64Array(b);let H,A=0;for(E/=3,H=0;H<E;++H){const e=3*H,t=i.Cartesian3.fromArray(g,e,y),n=i.Cartesian3.fromArray(h,e,_);C[A++]=n.x,C[A++]=n.y,C[A++]=n.z,C[A++]=t.x,C[A++]=t.y,C[A++]=t.z}const k=new a.GeometryAttributes({position:new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:C})}),w=b/3;b=2*w-4+w;const x=s.IndexDatatype.createTypedArray(w,b);let G=0;for(H=0;H<w-2;H+=2){const e=H,t=H+2,o=i.Cartesian3.fromArray(C,3*e,y),a=i.Cartesian3.fromArray(C,3*t,_);if(i.Cartesian3.equalsEpsilon(o,a,n.CesiumMath.EPSILON10))continue;const s=H+1,r=H+3;x[G++]=s,x[G++]=e,x[G++]=s,x[G++]=r,x[G++]=e,x[G++]=t}return x[G++]=w-2,x[G++]=w-1,new o.Geometry({attributes:k,indices:x,primitiveType:o.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere.fromVertices(C)})},function(t,n){return e.defined(n)&&(t=E.unpack(t,n)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),E.createGeometry(t)}}));
