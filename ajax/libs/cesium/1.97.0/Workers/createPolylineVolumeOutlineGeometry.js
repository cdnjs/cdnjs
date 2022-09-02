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
define(["./defaultValue-a6eb9f34","./Matrix2-276d97d2","./arrayRemoveDuplicates-7ccf3114","./BoundingRectangle-0ced9455","./Transforms-0c3fa360","./ComponentDatatype-7f6d9570","./PolylineVolumeGeometryLibrary-d8099b25","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./IndexDatatype-856d3a0c","./PolygonPipeline-1667c4fc","./RuntimeError-07496d94","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./WebGLConstants-d81b330d","./EllipsoidTangentPlane-30c83574","./AxisAlignedBoundingBox-646dc833","./IntersectionTests-fbcff83c","./Plane-17fe9d66","./PolylinePipeline-f9c3fc71","./EllipsoidGeodesic-3107c30b","./EllipsoidRhumbLine-f1dbc710"],(function(e,t,n,i,o,a,l,r,s,p,c,d,u,y,f,g,h,m,E,_,P,b){"use strict";function k(n){const i=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,o=n.shapePositions;this._positions=i,this._shape=o,this._ellipsoid=t.Ellipsoid.clone(e.defaultValue(n.ellipsoid,t.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,l.CornerType.ROUNDED),this._granularity=e.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";let r=1+i.length*t.Cartesian3.packedLength;r+=1+o.length*t.Cartesian2.packedLength,this.packedLength=r+t.Ellipsoid.packedLength+2}k.pack=function(n,i,o){let a;o=e.defaultValue(o,0);const l=n._positions;let r=l.length;for(i[o++]=r,a=0;a<r;++a,o+=t.Cartesian3.packedLength)t.Cartesian3.pack(l[a],i,o);const s=n._shape;for(r=s.length,i[o++]=r,a=0;a<r;++a,o+=t.Cartesian2.packedLength)t.Cartesian2.pack(s[a],i,o);return t.Ellipsoid.pack(n._ellipsoid,i,o),o+=t.Ellipsoid.packedLength,i[o++]=n._cornerType,i[o]=n._granularity,i};const C=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),L={polylinePositions:void 0,shapePositions:void 0,ellipsoid:C,height:void 0,cornerType:void 0,granularity:void 0};k.unpack=function(n,i,o){let a;i=e.defaultValue(i,0);let l=n[i++];const r=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian3.packedLength)r[a]=t.Cartesian3.unpack(n,i);l=n[i++];const s=new Array(l);for(a=0;a<l;++a,i+=t.Cartesian2.packedLength)s[a]=t.Cartesian2.unpack(n,i);const p=t.Ellipsoid.unpack(n,i,C);i+=t.Ellipsoid.packedLength;const c=n[i++],d=n[i];return e.defined(o)?(o._positions=r,o._shape=s,o._ellipsoid=t.Ellipsoid.clone(p,o._ellipsoid),o._cornerType=c,o._granularity=d,o):(L.polylinePositions=r,L.shapePositions=s,L.cornerType=c,L.granularity=d,new k(L))};const T=new i.BoundingRectangle;return k.createGeometry=function(e){const d=e._positions,u=n.arrayRemoveDuplicates(d,t.Cartesian3.equalsEpsilon);let y=e._shape;if(y=l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y),u.length<2||y.length<3)return;c.PolygonPipeline.computeWindingOrder2D(y)===c.WindingOrder.CLOCKWISE&&y.reverse();const f=i.BoundingRectangle.fromPoints(y,T);return function(e,t){const n=new s.GeometryAttributes;n.position=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});const i=t.length,l=n.position.values.length/3,c=e.length/3/i,d=p.IndexDatatype.createTypedArray(l,2*i*(c+1));let u,y,f=0;u=0;let g=u*i;for(y=0;y<i-1;y++)d[f++]=y+g,d[f++]=y+g+1;for(d[f++]=i-1+g,d[f++]=g,u=c-1,g=u*i,y=0;y<i-1;y++)d[f++]=y+g,d[f++]=y+g+1;for(d[f++]=i-1+g,d[f++]=g,u=0;u<c-1;u++){const e=i*u,t=e+i;for(y=0;y<i;y++)d[f++]=y+e,d[f++]=y+t}return new r.Geometry({attributes:n,indices:p.IndexDatatype.createTypedArray(l,d),boundingSphere:o.BoundingSphere.fromVertices(e),primitiveType:r.PrimitiveType.LINES})}(l.PolylineVolumeGeometryLibrary.computePositions(u,y,f,e,!1),y)},function(n,i){return e.defined(i)&&(n=k.unpack(n,i)),n._ellipsoid=t.Ellipsoid.clone(n._ellipsoid),k.createGeometry(n)}}));
