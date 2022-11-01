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
define(["exports","./AxisAlignedBoundingBox-5f8053d3","./Matrix2-7a2bab7e","./Matrix3-edb29a7e","./defaultValue-135942ca","./IntersectionTests-f3382f21","./Plane-5bea24eb","./Transforms-3ea76111"],(function(t,n,e,i,o,r,s,a){"use strict";const l=new e.Cartesian4;function c(t,n){t=(n=o.defaultValue(n,i.Ellipsoid.WGS84)).scaleToGeodeticSurface(t);const r=a.Transforms.eastNorthUpToFixedFrame(t,n);this._ellipsoid=n,this._origin=t,this._xAxis=i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r,0,l)),this._yAxis=i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r,1,l));const c=i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r,2,l));this._plane=s.Plane.fromPointNormal(t,c)}Object.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});const d=new n.AxisAlignedBoundingBox;c.fromPoints=function(t,e){return new c(n.AxisAlignedBoundingBox.fromPoints(t,d).center,e)};const f=new r.Ray,p=new i.Cartesian3;c.prototype.projectPointOntoPlane=function(t,n){const s=f;s.origin=t,i.Cartesian3.normalize(t,s.direction);let a=r.IntersectionTests.rayPlane(s,this._plane,p);if(o.defined(a)||(i.Cartesian3.negate(s.direction,s.direction),a=r.IntersectionTests.rayPlane(s,this._plane,p)),o.defined(a)){const t=i.Cartesian3.subtract(a,this._origin,a),r=i.Cartesian3.dot(this._xAxis,t),s=i.Cartesian3.dot(this._yAxis,t);return o.defined(n)?(n.x=r,n.y=s,n):new e.Cartesian2(r,s)}},c.prototype.projectPointsOntoPlane=function(t,n){o.defined(n)||(n=[]);let e=0;const i=t.length;for(let r=0;r<i;r++){const i=this.projectPointOntoPlane(t[r],n[e]);o.defined(i)&&(n[e]=i,e++)}return n.length=e,n},c.prototype.projectPointToNearestOnPlane=function(t,n){o.defined(n)||(n=new e.Cartesian2);const s=f;s.origin=t,i.Cartesian3.clone(this._plane.normal,s.direction);let a=r.IntersectionTests.rayPlane(s,this._plane,p);o.defined(a)||(i.Cartesian3.negate(s.direction,s.direction),a=r.IntersectionTests.rayPlane(s,this._plane,p));const l=i.Cartesian3.subtract(a,this._origin,a),c=i.Cartesian3.dot(this._xAxis,l),d=i.Cartesian3.dot(this._yAxis,l);return n.x=c,n.y=d,n},c.prototype.projectPointsToNearestOnPlane=function(t,n){o.defined(n)||(n=[]);const e=t.length;n.length=e;for(let i=0;i<e;i++)n[i]=this.projectPointToNearestOnPlane(t[i],n[i]);return n};const u=new i.Cartesian3;c.prototype.projectPointOntoEllipsoid=function(t,n){o.defined(n)||(n=new i.Cartesian3);const e=this._ellipsoid,r=this._origin,s=this._xAxis,a=this._yAxis,l=u;return i.Cartesian3.multiplyByScalar(s,t.x,l),n=i.Cartesian3.add(r,l,n),i.Cartesian3.multiplyByScalar(a,t.y,l),i.Cartesian3.add(n,l,n),e.scaleToGeocentricSurface(n,n),n},c.prototype.projectPointsOntoEllipsoid=function(t,n){const e=t.length;o.defined(n)?n.length=e:n=new Array(e);for(let i=0;i<e;++i)n[i]=this.projectPointOntoEllipsoid(t[i],n[i]);return n},t.EllipsoidTangentPlane=c}));
