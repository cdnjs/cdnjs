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
define(["./Matrix3-edb29a7e","./defaultValue-135942ca","./EllipseOutlineGeometry-7ede56ea","./Math-a304e2d6","./Transforms-3ea76111","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./EllipseGeometryLibrary-d955e650","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./GeometryOffsetAttribute-d3a42805","./IndexDatatype-3a8ea78f"],(function(e,t,a,r,i,n,d,l,o,s,u,f,c,b,m){"use strict";return function(r,i){return t.defined(i)&&(r=a.EllipseOutlineGeometry.unpack(r,i)),r._center=e.Cartesian3.clone(r._center),r._ellipsoid=e.Ellipsoid.clone(r._ellipsoid),a.EllipseOutlineGeometry.createGeometry(r)}}));
