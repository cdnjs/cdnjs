/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98.1
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
define(["./arrayRemoveDuplicates-235b23d8","./Transforms-a48d25e5","./Matrix2-c339372d","./ComponentDatatype-1b227f17","./CoplanarPolygonGeometryLibrary-85aeca86","./defaultValue-65031fc5","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryInstance-ee0e4b25","./GeometryPipeline-7e799ed5","./IndexDatatype-53de8b23","./PolygonGeometryLibrary-fdf44447","./combine-96aed74b","./RuntimeError-23f4777c","./WebGLConstants-f5c279b9","./OrientedBoundingBox-59c958d0","./EllipsoidTangentPlane-1f1eb3e6","./AxisAlignedBoundingBox-f07e0e43","./IntersectionTests-87344d12","./Plane-3d182a08","./AttributeCompression-9d180a12","./EncodedCartesian3-4e907eba","./ArcType-84fe1b78","./EllipsoidRhumbLine-0df6bb40","./PolygonPipeline-d06990ae"],(function(e,t,n,o,r,i,a,y,l,s,c,u,p,d,m,f,g,b,h,P,G,L,C,T,E){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),r=c.IndexDatatype.createTypedArray(t,2*t);let i=0,l=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[l++]=o,r[l++]=(o+1)%t}const s=new y.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:s,indices:r,primitiveType:a.PrimitiveType.LINES})}function H(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=u.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}H.fromPositions=function(e){return new H({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},H.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const k={polygonHierarchy:{}};return H.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=u.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new H(k)),o._polygonHierarchy=r,o.packedLength=a,o},H.createGeometry=function(o){const i=o._polygonHierarchy;let y=i.positions;if(y=e.arrayRemoveDuplicates(y,n.Cartesian3.equalsEpsilon,!0),y.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(y))return;const c=u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===c.length)return;const p=[];for(let e=0;e<c.length;e++){const t=new l.GeometryInstance({geometry:A(c[e])});p.push(t)}const d=s.GeometryPipeline.combineInstances(p)[0],m=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:m})},function(e,t){return i.defined(t)&&(e=H.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),H.createGeometry(e)}}));
