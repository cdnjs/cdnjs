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
define(["exports","./Matrix2-c339372d","./defaultValue-65031fc5","./ComponentDatatype-1b227f17"],(function(t,e,i,o){"use strict";function a(t){this._ellipsoid=i.defaultValue(t,e.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(a.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),a.mercatorAngleToGeodeticLatitude=function(t){return o.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-t))},a.geodeticLatitudeToMercatorAngle=function(t){t>a.MaximumLatitude?t=a.MaximumLatitude:t<-a.MaximumLatitude&&(t=-a.MaximumLatitude);const e=Math.sin(t);return.5*Math.log((1+e)/(1-e))},a.MaximumLatitude=a.mercatorAngleToGeodeticLatitude(Math.PI),a.prototype.project=function(t,o){const n=this._semimajorAxis,r=t.longitude*n,u=a.geodeticLatitudeToMercatorAngle(t.latitude)*n,d=t.height;return i.defined(o)?(o.x=r,o.y=u,o.z=d,o):new e.Cartesian3(r,u,d)},a.prototype.unproject=function(t,o){const n=this._oneOverSemimajorAxis,r=t.x*n,u=a.mercatorAngleToGeodeticLatitude(t.y*n),d=t.z;return i.defined(o)?(o.longitude=r,o.latitude=u,o.height=d,o):new e.Cartographic(r,u,d)},t.WebMercatorProjection=a}));
