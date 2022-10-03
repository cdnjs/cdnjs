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
define(["./Matrix2-7dfd434a","./defaultValue-50f7432c","./EllipseGeometry-464c6a37","./ComponentDatatype-9b23164a","./WebGLConstants-58abc51a","./RuntimeError-48e1f06d","./Transforms-f305a473","./combine-8462e002","./EllipseGeometryLibrary-f9538b0a","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./GeometryInstance-9e499d64","./GeometryOffsetAttribute-490bc2c9","./GeometryPipeline-33e32ecb","./AttributeCompression-aa7855e7","./EncodedCartesian3-5efd45c3","./IndexDatatype-ceed713e","./IntersectionTests-4a7694f7","./Plane-3d30b188","./VertexFormat-fa0c27e8"],(function(e,t,r,a,n,i,o,s,c,l,d,f,b,m,p,u,y,G,E,C){"use strict";return function(a,n){return t.defined(n)&&(a=r.EllipseGeometry.unpack(a,n)),a._center=e.Cartesian3.clone(a._center),a._ellipsoid=e.Ellipsoid.clone(a._ellipsoid),r.EllipseGeometry.createGeometry(a)}}));
