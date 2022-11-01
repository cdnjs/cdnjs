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
define(["./defaultValue-135942ca","./FrustumGeometry-7317a8d4","./Transforms-3ea76111","./Matrix3-edb29a7e","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./Plane-5bea24eb","./VertexFormat-7d5b4d7e"],(function(e,t,r,a,d,n,u,o,m,b,f,i,s,c){"use strict";return function(r,a){return e.defined(a)&&(r=t.FrustumGeometry.unpack(r,a)),t.FrustumGeometry.createGeometry(r)}}));
