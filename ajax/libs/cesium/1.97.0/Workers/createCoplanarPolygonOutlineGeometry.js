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
define(["./arrayRemoveDuplicates-7ccf3114","./Transforms-0c3fa360","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./CoplanarPolygonGeometryLibrary-070cbd9e","./defaultValue-a6eb9f34","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryInstance-52eaddec","./GeometryPipeline-f46d7519","./IndexDatatype-856d3a0c","./PolygonGeometryLibrary-5f5d3c91","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./RuntimeError-07496d94","./WebGLConstants-d81b330d","./OrientedBoundingBox-60b83ce5","./EllipsoidTangentPlane-30c83574","./AxisAlignedBoundingBox-646dc833","./IntersectionTests-fbcff83c","./Plane-17fe9d66","./AttributeCompression-28a6d524","./EncodedCartesian3-32c625e4","./ArcType-b714639b","./EllipsoidRhumbLine-f1dbc710","./PolygonPipeline-1667c4fc"],(function(e,t,n,o,r,i,a,c,y,l,s,u,p,d,m,f,g,b,h,P,G,L,C,T,E,H){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),r=s.IndexDatatype.createTypedArray(t,2*t);let i=0,y=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[y++]=o,r[y++]=(o+1)%t}const l=new c.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:l,indices:r,primitiveType:a.PrimitiveType.LINES})}function k(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=u.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}k.fromPositions=function(e){return new k({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},k.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const _={polygonHierarchy:{}};return k.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=u.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new k(_)),o._polygonHierarchy=r,o.packedLength=a,o},k.createGeometry=function(o){const i=o._polygonHierarchy;let c=i.positions;if(c=e.arrayRemoveDuplicates(c,n.Cartesian3.equalsEpsilon,!0),c.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(c))return;const s=u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===s.length)return;const p=[];for(let e=0;e<s.length;e++){const t=new y.GeometryInstance({geometry:A(s[e])});p.push(t)}const d=l.GeometryPipeline.combineInstances(p)[0],m=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:m})},function(e,t){return i.defined(t)&&(e=k.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),k.createGeometry(e)}}));
