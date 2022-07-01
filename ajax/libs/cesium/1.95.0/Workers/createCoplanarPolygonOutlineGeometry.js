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
define(["./arrayRemoveDuplicates-6f91355d","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./CoplanarPolygonGeometryLibrary-edaba606","./defaultValue-97284df2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryInstance-4bfcfe78","./GeometryPipeline-a847e31f","./IndexDatatype-65271ba3","./PolygonGeometryLibrary-0f0c78d4","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./OrientedBoundingBox-ee3011f6","./EllipsoidTangentPlane-7ae496b2","./AxisAlignedBoundingBox-b1c095aa","./IntersectionTests-33ace2d6","./Plane-e916220d","./AttributeCompression-5744d52e","./EncodedCartesian3-a9a8a281","./ArcType-de5d8777","./EllipsoidRhumbLine-60f14314","./PolygonPipeline-00dc0c6e"],(function(e,t,n,o,r,i,a,y,l,s,c,u,p,d,m,f,g,b,h,P,G,L,C,T,E,H){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),o=u.IndexDatatype.createTypedArray(t,2*t);let i=0,a=0;for(let r=0;r<t;r++){const y=e[r];n[i++]=y.x,n[i++]=y.y,n[i++]=y.z,o[a++]=r,o[a++]=(r+1)%t}const s=new l.GeometryAttributes({position:new y.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new y.Geometry({attributes:s,indices:o,primitiveType:y.PrimitiveType.LINES})}function k(e){const t=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=p.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}k.fromPositions=function(e){return new k({polygonHierarchy:{positions:(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).positions}})},k.pack=function(e,t,o){return o=a.defaultValue(o,0),t[o=p.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const _={polygonHierarchy:{}};return k.unpack=function(e,t,o){t=a.defaultValue(t,0);const r=p.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const i=e[t];return a.defined(o)||(o=new k(_)),o._polygonHierarchy=r,o.packedLength=i,o},k.createGeometry=function(o){const r=o._polygonHierarchy;let a=r.positions;if(a=e.arrayRemoveDuplicates(a,n.Cartesian3.equalsEpsilon,!0),a.length<3)return;if(!i.CoplanarPolygonGeometryLibrary.validOutline(a))return;const l=p.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!1);if(0===l.length)return;const u=[];for(let e=0;e<l.length;e++){const t=new s.GeometryInstance({geometry:A(l[e])});u.push(t)}const d=c.GeometryPipeline.combineInstances(u)[0],m=t.BoundingSphere.fromPoints(r.positions);return new y.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:m})},function(e,t){return a.defined(t)&&(e=k.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),k.createGeometry(e)}}));
