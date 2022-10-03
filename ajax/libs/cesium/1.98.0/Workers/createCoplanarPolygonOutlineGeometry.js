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
define(["./arrayRemoveDuplicates-fd3a3f4e","./Transforms-f305a473","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./CoplanarPolygonGeometryLibrary-bfd4665a","./defaultValue-50f7432c","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryInstance-9e499d64","./GeometryPipeline-33e32ecb","./IndexDatatype-ceed713e","./PolygonGeometryLibrary-7552563d","./combine-8462e002","./RuntimeError-48e1f06d","./WebGLConstants-58abc51a","./OrientedBoundingBox-69290b47","./EllipsoidTangentPlane-03ebf5f4","./AxisAlignedBoundingBox-a2ff9dfd","./IntersectionTests-4a7694f7","./Plane-3d30b188","./AttributeCompression-aa7855e7","./EncodedCartesian3-5efd45c3","./ArcType-24f44850","./EllipsoidRhumbLine-5454653c","./PolygonPipeline-898e8861"],(function(e,t,n,o,r,i,a,y,l,s,c,u,p,d,f,m,g,b,h,P,G,L,C,T,E){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),r=c.IndexDatatype.createTypedArray(t,2*t);let i=0,l=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[l++]=o,r[l++]=(o+1)%t}const s=new y.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:s,indices:r,primitiveType:a.PrimitiveType.LINES})}function H(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=u.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}H.fromPositions=function(e){return new H({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},H.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const k={polygonHierarchy:{}};return H.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=u.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new H(k)),o._polygonHierarchy=r,o.packedLength=a,o},H.createGeometry=function(o){const i=o._polygonHierarchy;let y=i.positions;if(y=e.arrayRemoveDuplicates(y,n.Cartesian3.equalsEpsilon,!0),y.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(y))return;const c=u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===c.length)return;const p=[];for(let e=0;e<c.length;e++){const t=new l.GeometryInstance({geometry:A(c[e])});p.push(t)}const d=s.GeometryPipeline.combineInstances(p)[0],f=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:f})},function(e,t){return i.defined(t)&&(e=H.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),H.createGeometry(e)}}));
