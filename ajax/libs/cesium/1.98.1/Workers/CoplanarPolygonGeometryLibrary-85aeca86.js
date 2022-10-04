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
define(["exports","./Matrix2-c339372d","./OrientedBoundingBox-59c958d0"],(function(n,t,e){"use strict";const r={},a=new t.Cartesian3,i=new t.Cartesian3,o=new t.Cartesian3,u=new t.Cartesian3,s=new e.OrientedBoundingBox;function c(n,e,r,i,o){const u=t.Cartesian3.subtract(n,e,a),s=t.Cartesian3.dot(r,u),c=t.Cartesian3.dot(i,u);return t.Cartesian2.fromElements(s,c,o)}r.validOutline=function(n){const r=e.OrientedBoundingBox.fromPoints(n,s).halfAxes,a=t.Matrix3.getColumn(r,0,i),c=t.Matrix3.getColumn(r,1,o),C=t.Matrix3.getColumn(r,2,u),m=t.Cartesian3.magnitude(a),d=t.Cartesian3.magnitude(c),g=t.Cartesian3.magnitude(C);return!(0===m&&(0===d||0===g)||0===d&&0===g)},r.computeProjectTo2DArguments=function(n,r,a,c){const C=e.OrientedBoundingBox.fromPoints(n,s),m=C.halfAxes,d=t.Matrix3.getColumn(m,0,i),g=t.Matrix3.getColumn(m,1,o),l=t.Matrix3.getColumn(m,2,u),f=t.Cartesian3.magnitude(d),x=t.Cartesian3.magnitude(g),B=t.Cartesian3.magnitude(l),M=Math.min(f,x,B);if(0===f&&(0===x||0===B)||0===x&&0===B)return!1;let P,w;return M!==x&&M!==B||(P=d),M===f?P=g:M===B&&(w=g),M!==f&&M!==x||(w=l),t.Cartesian3.normalize(P,a),t.Cartesian3.normalize(w,c),t.Cartesian3.clone(C.center,r),!0},r.createProjectPointsTo2DFunction=function(n,t,e){return function(r){const a=new Array(r.length);for(let i=0;i<r.length;i++)a[i]=c(r[i],n,t,e);return a}},r.createProjectPointTo2DFunction=function(n,t,e){return function(r,a){return c(r,n,t,e,a)}};var C=r;n.CoplanarPolygonGeometryLibrary=C}));
