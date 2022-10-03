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
define(["exports","./Matrix2-7dfd434a","./defaultValue-50f7432c"],(function(n,e,a){"use strict";function t(n,a){this.normal=e.Cartesian3.clone(n),this.distance=a}t.fromPointNormal=function(n,r,i){const s=-e.Cartesian3.dot(r,n);return a.defined(i)?(e.Cartesian3.clone(r,i.normal),i.distance=s,i):new t(r,s)};const r=new e.Cartesian3;t.fromCartesian4=function(n,i){const s=e.Cartesian3.fromCartesian4(n,r),o=n.w;return a.defined(i)?(e.Cartesian3.clone(s,i.normal),i.distance=o,i):new t(s,o)},t.getPointDistance=function(n,a){return e.Cartesian3.dot(n.normal,a)+n.distance};const i=new e.Cartesian3;t.projectPointOntoPlane=function(n,r,s){a.defined(s)||(s=new e.Cartesian3);const o=t.getPointDistance(n,r),c=e.Cartesian3.multiplyByScalar(n.normal,o,i);return e.Cartesian3.subtract(r,c,s)};const s=new e.Matrix4,o=new e.Cartesian4,c=new e.Cartesian3;t.transform=function(n,a,r){const i=n.normal,l=n.distance,d=e.Matrix4.inverseTranspose(a,s);let f=e.Cartesian4.fromElements(i.x,i.y,i.z,l,o);f=e.Matrix4.multiplyByVector(d,f,f);const C=e.Cartesian3.fromCartesian4(f,c);return f=e.Cartesian4.divideByScalar(f,e.Cartesian3.magnitude(C),f),t.fromCartesian4(f,r)},t.clone=function(n,r){return a.defined(r)?(e.Cartesian3.clone(n.normal,r.normal),r.distance=n.distance,r):new t(n.normal,n.distance)},t.equals=function(n,a){return n.distance===a.distance&&e.Cartesian3.equals(n.normal,a.normal)},t.ORIGIN_XY_PLANE=Object.freeze(new t(e.Cartesian3.UNIT_Z,0)),t.ORIGIN_YZ_PLANE=Object.freeze(new t(e.Cartesian3.UNIT_X,0)),t.ORIGIN_ZX_PLANE=Object.freeze(new t(e.Cartesian3.UNIT_Y,0)),n.Plane=t}));
