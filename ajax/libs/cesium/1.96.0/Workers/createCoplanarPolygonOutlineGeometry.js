/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96
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
define(["./arrayRemoveDuplicates-63c6b4d8","./Transforms-c450597e","./Matrix2-21f90abf","./RuntimeError-cef79f54","./ComponentDatatype-4028c72d","./CoplanarPolygonGeometryLibrary-23e4fbf4","./defaultValue-4607806f","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./GeometryInstance-b34e2b9d","./GeometryPipeline-b9f29df3","./IndexDatatype-20e78e57","./PolygonGeometryLibrary-1c72970e","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./WebGLConstants-f100e3dd","./OrientedBoundingBox-5c06247e","./EllipsoidTangentPlane-69b6e1fd","./AxisAlignedBoundingBox-cd3761c7","./IntersectionTests-ef65540c","./Plane-1c5eb32d","./AttributeCompression-b8c8fcdc","./EncodedCartesian3-f98850c6","./ArcType-f5af12f9","./EllipsoidRhumbLine-bf1c0ab0","./PolygonPipeline-13d40849"],(function(e,t,n,o,r,i,a,c,y,l,s,u,p,d,f,m,g,b,h,P,G,L,C,T,E,H){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),o=u.IndexDatatype.createTypedArray(t,2*t);let i=0,a=0;for(let r=0;r<t;r++){const c=e[r];n[i++]=c.x,n[i++]=c.y,n[i++]=c.z,o[a++]=r,o[a++]=(r+1)%t}const l=new y.GeometryAttributes({position:new c.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new c.Geometry({attributes:l,indices:o,primitiveType:c.PrimitiveType.LINES})}function k(e){const t=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=p.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}k.fromPositions=function(e){return new k({polygonHierarchy:{positions:(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).positions}})},k.pack=function(e,t,o){return o=a.defaultValue(o,0),t[o=p.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const _={polygonHierarchy:{}};return k.unpack=function(e,t,o){t=a.defaultValue(t,0);const r=p.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const i=e[t];return a.defined(o)||(o=new k(_)),o._polygonHierarchy=r,o.packedLength=i,o},k.createGeometry=function(o){const r=o._polygonHierarchy;let a=r.positions;if(a=e.arrayRemoveDuplicates(a,n.Cartesian3.equalsEpsilon,!0),a.length<3)return;if(!i.CoplanarPolygonGeometryLibrary.validOutline(a))return;const y=p.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!1);if(0===y.length)return;const u=[];for(let e=0;e<y.length;e++){const t=new l.GeometryInstance({geometry:A(y[e])});u.push(t)}const d=s.GeometryPipeline.combineInstances(u)[0],f=t.BoundingSphere.fromPoints(r.positions);return new c.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:f})},function(e,t){return a.defined(t)&&(e=k.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),k.createGeometry(e)}}));
