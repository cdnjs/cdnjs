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
define(["./Matrix2-276d97d2","./defaultValue-a6eb9f34","./EllipseOutlineGeometry-da9c79c5","./ComponentDatatype-7f6d9570","./WebGLConstants-d81b330d","./RuntimeError-07496d94","./Transforms-0c3fa360","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./EllipseGeometryLibrary-65924704","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryOffsetAttribute-102da468","./IndexDatatype-856d3a0c"],(function(e,t,r,i,n,o,l,a,d,s,c,f,u,m){"use strict";return function(i,n){return t.defined(n)&&(i=r.EllipseOutlineGeometry.unpack(i,n)),i._center=e.Cartesian3.clone(i._center),i._ellipsoid=e.Ellipsoid.clone(i._ellipsoid),r.EllipseOutlineGeometry.createGeometry(i)}}));
