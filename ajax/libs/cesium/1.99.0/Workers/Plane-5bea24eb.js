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
define(["exports","./Matrix3-edb29a7e","./Matrix2-7a2bab7e","./defaultValue-135942ca"],(function(n,e,a,t){"use strict";function r(n,a){this.normal=e.Cartesian3.clone(n),this.distance=a}r.fromPointNormal=function(n,a,i){const s=-e.Cartesian3.dot(a,n);return t.defined(i)?(e.Cartesian3.clone(a,i.normal),i.distance=s,i):new r(a,s)};const i=new e.Cartesian3;r.fromCartesian4=function(n,a){const s=e.Cartesian3.fromCartesian4(n,i),o=n.w;return t.defined(a)?(e.Cartesian3.clone(s,a.normal),a.distance=o,a):new r(s,o)},r.getPointDistance=function(n,a){return e.Cartesian3.dot(n.normal,a)+n.distance};const s=new e.Cartesian3;r.projectPointOntoPlane=function(n,a,i){t.defined(i)||(i=new e.Cartesian3);const o=r.getPointDistance(n,a),c=e.Cartesian3.multiplyByScalar(n.normal,o,s);return e.Cartesian3.subtract(a,c,i)};const o=new a.Matrix4,c=new a.Cartesian4,l=new e.Cartesian3;r.transform=function(n,t,i){const s=n.normal,d=n.distance,C=a.Matrix4.inverseTranspose(t,o);let f=a.Cartesian4.fromElements(s.x,s.y,s.z,d,c);f=a.Matrix4.multiplyByVector(C,f,f);const u=e.Cartesian3.fromCartesian4(f,l);return f=a.Cartesian4.divideByScalar(f,e.Cartesian3.magnitude(u),f),r.fromCartesian4(f,i)},r.clone=function(n,a){return t.defined(a)?(e.Cartesian3.clone(n.normal,a.normal),a.distance=n.distance,a):new r(n.normal,n.distance)},r.equals=function(n,a){return n.distance===a.distance&&e.Cartesian3.equals(n.normal,a.normal)},r.ORIGIN_XY_PLANE=Object.freeze(new r(e.Cartesian3.UNIT_Z,0)),r.ORIGIN_YZ_PLANE=Object.freeze(new r(e.Cartesian3.UNIT_X,0)),r.ORIGIN_ZX_PLANE=Object.freeze(new r(e.Cartesian3.UNIT_Y,0)),n.Plane=r}));
