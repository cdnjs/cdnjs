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
define(["./arrayRemoveDuplicates-d35f503f","./Transforms-3ea76111","./Matrix3-edb29a7e","./ComponentDatatype-e86a9f87","./CoplanarPolygonGeometryLibrary-342b5292","./defaultValue-135942ca","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryInstance-1aacc2fb","./GeometryPipeline-7cd8f832","./IndexDatatype-3a8ea78f","./PolygonGeometryLibrary-20986fdf","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./WebGLConstants-fcb70ee3","./OrientedBoundingBox-3ab8a09c","./EllipsoidTangentPlane-46a19c1a","./AxisAlignedBoundingBox-5f8053d3","./IntersectionTests-f3382f21","./Plane-5bea24eb","./AttributeCompression-5b18be52","./EncodedCartesian3-bf4e5ec3","./ArcType-89067bf8","./EllipsoidRhumbLine-5519960c","./PolygonPipeline-92a50571"],(function(e,t,n,o,r,i,a,y,c,l,s,u,p,d,f,m,b,g,h,P,G,L,C,T,E,A,H){"use strict";function k(e){const t=e.length,n=new Float64Array(3*t),r=s.IndexDatatype.createTypedArray(t,2*t);let i=0,c=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[c++]=o,r[c++]=(o+1)%t}const l=new y.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:l,indices:r,primitiveType:a.PrimitiveType.LINES})}function x(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=u.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}x.fromPositions=function(e){return new x({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},x.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const w={polygonHierarchy:{}};return x.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=u.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new x(w)),o._polygonHierarchy=r,o.packedLength=a,o},x.createGeometry=function(o){const i=o._polygonHierarchy;let y=i.positions;if(y=e.arrayRemoveDuplicates(y,n.Cartesian3.equalsEpsilon,!0),y.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(y))return;const s=u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===s.length)return;const p=[];for(let e=0;e<s.length;e++){const t=new c.GeometryInstance({geometry:k(s[e])});p.push(t)}const d=l.GeometryPipeline.combineInstances(p)[0],f=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:f})},function(e,t){return i.defined(t)&&(e=x.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),x.createGeometry(e)}}));
