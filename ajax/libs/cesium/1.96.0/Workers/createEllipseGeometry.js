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
define(["./Matrix2-21f90abf","./defaultValue-4607806f","./EllipseGeometry-f371dd78","./RuntimeError-cef79f54","./ComponentDatatype-4028c72d","./WebGLConstants-f100e3dd","./Transforms-c450597e","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./EllipseGeometryLibrary-187266ea","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./GeometryInstance-b34e2b9d","./GeometryOffsetAttribute-3e5f3e97","./GeometryPipeline-b9f29df3","./AttributeCompression-b8c8fcdc","./EncodedCartesian3-f98850c6","./IndexDatatype-20e78e57","./IntersectionTests-ef65540c","./Plane-1c5eb32d","./VertexFormat-75e8069c"],(function(e,t,r,n,c,o,i,a,s,f,l,d,m,b,p,u,y,G,E,C,_){"use strict";return function(n,c){return t.defined(c)&&(n=r.EllipseGeometry.unpack(n,c)),n._center=e.Cartesian3.clone(n._center),n._ellipsoid=e.Ellipsoid.clone(n._ellipsoid),r.EllipseGeometry.createGeometry(n)}}));
