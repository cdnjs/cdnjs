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
define(["./Matrix2-21f90abf","./defaultValue-4607806f","./EllipseOutlineGeometry-0087959a","./RuntimeError-cef79f54","./ComponentDatatype-4028c72d","./WebGLConstants-f100e3dd","./Transforms-c450597e","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./EllipseGeometryLibrary-187266ea","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./GeometryOffsetAttribute-3e5f3e97","./IndexDatatype-20e78e57"],(function(e,t,r,i,n,o,a,l,c,s,f,u,m,d){"use strict";return function(i,n){return t.defined(n)&&(i=r.EllipseOutlineGeometry.unpack(i,n)),i._center=e.Cartesian3.clone(i._center),i._ellipsoid=e.Ellipsoid.clone(i._ellipsoid),r.EllipseOutlineGeometry.createGeometry(i)}}));
