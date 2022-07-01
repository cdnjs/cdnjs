/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
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
define(["exports","./Matrix2-73789715","./defaultValue-97284df2","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225"],(function(t,e,i,o,a){"use strict";function r(t){this._ellipsoid=i.defaultValue(t,e.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(r.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),r.mercatorAngleToGeodeticLatitude=function(t){return a.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-t))},r.geodeticLatitudeToMercatorAngle=function(t){t>r.MaximumLatitude?t=r.MaximumLatitude:t<-r.MaximumLatitude&&(t=-r.MaximumLatitude);const e=Math.sin(t);return.5*Math.log((1+e)/(1-e))},r.MaximumLatitude=r.mercatorAngleToGeodeticLatitude(Math.PI),r.prototype.project=function(t,o){const a=this._semimajorAxis,n=t.longitude*a,u=r.geodeticLatitudeToMercatorAngle(t.latitude)*a,d=t.height;return i.defined(o)?(o.x=n,o.y=u,o.z=d,o):new e.Cartesian3(n,u,d)},r.prototype.unproject=function(t,o){const a=this._oneOverSemimajorAxis,n=t.x*a,u=r.mercatorAngleToGeodeticLatitude(t.y*a),d=t.z;return i.defined(o)?(o.longitude=n,o.latitude=u,o.height=d,o):new e.Cartographic(n,u,d)},t.WebMercatorProjection=r}));
