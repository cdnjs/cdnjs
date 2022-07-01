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
define(["./defaultValue-97284df2","./Matrix2-73789715","./arrayRemoveDuplicates-6f91355d","./BoundingRectangle-2b0ebbdd","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225","./PolylineVolumeGeometryLibrary-a4b92b4e","./RuntimeError-4f8ec8a2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./IndexDatatype-65271ba3","./PolygonPipeline-00dc0c6e","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./EllipsoidTangentPlane-7ae496b2","./AxisAlignedBoundingBox-b1c095aa","./IntersectionTests-33ace2d6","./Plane-e916220d","./PolylinePipeline-ebd42f23","./EllipsoidGeodesic-ed8a0e40","./EllipsoidRhumbLine-60f14314"],(function(e,t,n,i,o,a,l,r,s,p,d,c,u,y,g,h,f,m,E,_,b,P){"use strict";function k(n){const i=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,o=n.shapePositions;this._positions=i,this._shape=o,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,l.CornerType.ROUNDED),this._granularity=e.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let r=1+i.length*t.Cartesian3.packedLength;r+=1+o.length*t.Cartesian2.packedLength,this.packedLength=r+t.Ellipsoid.packedLength+2}k.pack=function(n,i,o){let a;o=e.defaultValue(o,0);const l=n._positions;let r=l.length;for(i[o++]=r,a=0;a<r;++a,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(l[a],i,o);const s=n._shape;for(r=s.length,i[o++]=r,a=0;a<r;++a,o+=t.Cartesian2.packedLength)t.Cartesian2.pack(s[a],i,o);return t.Ellipsoid.pack(n._ellipsoid,i,o),o+=t.Ellipsoid.packedLength,i[o++]=n._cornerType,i[o]=n._granularity,i};const C=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),L={polylinePositions:void 0,shapePositions:void 0,ellipsoid:C,height:void 0,cornerType:void 0,granularity:void 0};k.unpack=function(n,i,o){let a;i=e.defaultValue(i,0);let l=n[i++];const r=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian3.packedLength)r[a]=t.Cartesian3.unpack(n,i);l=n[i++];const s=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian2.packedLength)s[a]=t.Cartesian2.unpack(n,i);const p=t.Ellipsoid.unpack(n,i,C);i+=t.Ellipsoid.packedLength;const d=n[i++],c=n[i];return e.defined(o)?(o._positions=r,o._shape=s,o._ellipsoid=t.Ellipsoid.clone(p,o._ellipsoid),o._cornerType=d,o._granularity=c,o):(L.polylinePositions=r,L.shapePositions=s,L.cornerType=d,L.granularity=c,new k(L))};const T=new i.BoundingRectangle;return k.createGeometry=function(e){const r=e._positions,u=n.arrayRemoveDuplicates(r,t.Cartesian3.equalsEpsilon);let y=e._shape;if(y=l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y),u.length<2||y.length<3)return;c.PolygonPipeline.computeWindingOrder2D(y)===c.WindingOrder.CLOCKWISE&&y.reverse();const g=i.BoundingRectangle.fromPoints(y,T);return function(e,t){const n=new p.GeometryAttributes;n.position=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const i=t.length,l=n.position.values.length/3,r=e.length/3/i,c=d.IndexDatatype.createTypedArray(l,2*i*(r+1));let u,y,g=0;u=0;let h=u*i;for(y=0;y<i-1;y++)c[g++]=y+h,c[g++]=y+h+1;for(c[g++]=i-1+h,c[g++]=h,u=r-1,h=u*i,y=0;y<i-1;y++)c[g++]=y+h,c[g++]=y+h+1;for(c[g++]=i-1+h,c[g++]=h,u=0;u<r-1;u++){const e=i*u,t=e+i;for(y=0;y<i;y++)c[g++]=y+e,c[g++]=y+t}return new s.Geometry({attributes:n,indices:d.IndexDatatype.createTypedArray(l,c),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:s.PrimitiveType.LINES})}(l.PolylineVolumeGeometryLibrary.computePositions(u,y,g,e,!1),y)},function(n,i){return e.defined(i)&&(n=k.unpack(n,i)),n._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),k.createGeometry(n)}}));
