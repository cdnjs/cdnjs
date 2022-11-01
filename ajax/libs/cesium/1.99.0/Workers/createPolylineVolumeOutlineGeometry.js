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
define(["./defaultValue-135942ca","./Matrix3-edb29a7e","./arrayRemoveDuplicates-d35f503f","./BoundingRectangle-9f46b506","./Transforms-3ea76111","./Matrix2-7a2bab7e","./ComponentDatatype-e86a9f87","./PolylineVolumeGeometryLibrary-5450bad0","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./IndexDatatype-3a8ea78f","./Math-a304e2d6","./PolygonPipeline-92a50571","./combine-462d91dd","./RuntimeError-f0dada00","./WebGLConstants-fcb70ee3","./EllipsoidTangentPlane-46a19c1a","./AxisAlignedBoundingBox-5f8053d3","./IntersectionTests-f3382f21","./Plane-5bea24eb","./PolylinePipeline-6bbc2d22","./EllipsoidGeodesic-048356f7","./EllipsoidRhumbLine-5519960c"],(function(e,t,i,n,o,a,l,r,s,p,d,c,u,y,f,g,h,m,E,b,P,_,k){"use strict";function C(i){const n=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).polylinePositions,o=i.shapePositions;this._positions=n,this._shape=o,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(i.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(i.cornerType,r.CornerType.ROUNDED),this._granularity=e.defaultValue(i.granularity,c.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let l=1+n.length*t.Cartesian3.packedLength;l+=1+o.length*a.Cartesian2.packedLength,this.packedLength=l+t.Ellipsoid.packedLength+2}C.pack=function(i,n,o){let l;o=e.defaultValue(o,0);const r=i._positions;let s=r.length;for(n[o++]=s,l=0;l<s;++l,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(r[l],n,o);const p=i._shape;for(s=p.length,n[o++]=s,l=0;l<s;++l,o+=a.Cartesian2.packedLength)a.Cartesian2.pack(p[l],n,o);return t.Ellipsoid.pack(i._ellipsoid,n,o),o+=t.Ellipsoid.packedLength,n[o++]=i._cornerType,n[o]=i._granularity,n};const L=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),T={polylinePositions:void 0,shapePositions:void 0,ellipsoid:L,height:void 0,cornerType:void 0,granularity:void 0};C.unpack=function(i,n,o){let l;n=e.defaultValue(n,0);let r=i[n++];const s=new Array(r);for(l=0;l<r;++l,n+=t.Cartesian3.packedLength)s[l]=t.Cartesian3.unpack(i,n);r=i[n++];const p=new Array(r);for(l=0;l<r;++l,n+=a.Cartesian2.packedLength)p[l]=a.Cartesian2.unpack(i,n);const d=t.Ellipsoid.unpack(i,n,L);n+=t.Ellipsoid.packedLength;const c=i[n++],u=i[n];return e.defined(o)?(o._positions=s,o._shape=p,o._ellipsoid=t.Ellipsoid.clone(d,o._ellipsoid),o._cornerType=c,o._granularity=u,o):(T.polylinePositions=s,T.shapePositions=p,T.cornerType=c,T.granularity=u,new C(T))};const D=new n.BoundingRectangle;return C.createGeometry=function(e){const a=e._positions,c=i.arrayRemoveDuplicates(a,t.Cartesian3.equalsEpsilon);let y=e._shape;if(y=r.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y),c.length<2||y.length<3)return;u.PolygonPipeline.computeWindingOrder2D(y)===u.WindingOrder.CLOCKWISE&&y.reverse();const f=n.BoundingRectangle.fromPoints(y,D);return function(e,t){const i=new p.GeometryAttributes;i.position=new s.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const n=t.length,a=i.position.values.length/3,r=e.length/3/n,c=d.IndexDatatype.createTypedArray(a,2*n*(r+1));let u,y,f=0;u=0;let g=u*n;for(y=0;y<n-1;y++)c[f++]=y+g,c[f++]=y+g+1;for(c[f++]=n-1+g,c[f++]=g,u=r-1,g=u*n,y=0;y<n-1;y++)c[f++]=y+g,c[f++]=y+g+1;for(c[f++]=n-1+g,c[f++]=g,u=0;u<r-1;u++){const e=n*u,t=e+n;for(y=0;y<n;y++)c[f++]=y+e,c[f++]=y+t}return new s.Geometry({attributes:i,indices:d.IndexDatatype.createTypedArray(a,c),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:s.PrimitiveType.LINES})}(r.PolylineVolumeGeometryLibrary.computePositions(c,y,f,e,!1),y)},function(i,n){return e.defined(n)&&(i=C.unpack(i,n)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),C.createGeometry(i)}}));
