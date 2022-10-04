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
define(["./Matrix2-c339372d","./defaultValue-65031fc5","./EllipseGeometry-d0527fc5","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./Transforms-a48d25e5","./combine-96aed74b","./EllipseGeometryLibrary-53ed4539","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryInstance-ee0e4b25","./GeometryOffsetAttribute-026030ef","./GeometryPipeline-7e799ed5","./AttributeCompression-9d180a12","./EncodedCartesian3-4e907eba","./IndexDatatype-53de8b23","./IntersectionTests-87344d12","./Plane-3d182a08","./VertexFormat-2b3ad79f"],(function(e,t,r,n,i,o,a,d,s,l,c,b,f,m,p,u,y,G,E,C){"use strict";return function(n,i){return t.defined(i)&&(n=r.EllipseGeometry.unpack(n,i)),n._center=e.Cartesian3.clone(n._center),n._ellipsoid=e.Ellipsoid.clone(n._ellipsoid),r.EllipseGeometry.createGeometry(n)}}));
