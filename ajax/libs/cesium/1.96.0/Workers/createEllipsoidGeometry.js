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
define(["./defaultValue-4607806f","./EllipsoidGeometry-b2dd57d2","./Transforms-c450597e","./Matrix2-21f90abf","./RuntimeError-cef79f54","./ComponentDatatype-4028c72d","./WebGLConstants-f100e3dd","./_commonjsHelpers-a32ac251","./combine-fc59ba59","./GeometryAttribute-3c090c07","./GeometryAttributes-acac33d2","./GeometryOffsetAttribute-3e5f3e97","./IndexDatatype-20e78e57","./VertexFormat-75e8069c"],(function(e,t,r,o,a,n,c,i,f,d,m,s,u,l){"use strict";return function(r,o){return e.defined(o)&&(r=t.EllipsoidGeometry.unpack(r,o)),t.EllipsoidGeometry.createGeometry(r)}}));
