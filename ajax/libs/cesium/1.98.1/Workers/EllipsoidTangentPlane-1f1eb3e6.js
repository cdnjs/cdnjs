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
define(["exports","./AxisAlignedBoundingBox-f07e0e43","./Matrix2-c339372d","./defaultValue-65031fc5","./IntersectionTests-87344d12","./Plane-3d182a08","./Transforms-a48d25e5"],(function(t,n,e,i,o,r,s){"use strict";const a=new e.Cartesian4;function l(t,n){t=(n=i.defaultValue(n,e.Ellipsoid.WGS84)).scaleToGeodeticSurface(t);const o=s.Transforms.eastNorthUpToFixedFrame(t,n);this._ellipsoid=n,this._origin=t,this._xAxis=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(o,0,a)),this._yAxis=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(o,1,a));const l=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(o,2,a));this._plane=r.Plane.fromPointNormal(t,l)}Object.defineProperties(l.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});const c=new n.AxisAlignedBoundingBox;l.fromPoints=function(t,e){return new l(n.AxisAlignedBoundingBox.fromPoints(t,c).center,e)};const d=new o.Ray,p=new e.Cartesian3;l.prototype.projectPointOntoPlane=function(t,n){const r=d;r.origin=t,e.Cartesian3.normalize(t,r.direction);let s=o.IntersectionTests.rayPlane(r,this._plane,p);if(i.defined(s)||(e.Cartesian3.negate(r.direction,r.direction),s=o.IntersectionTests.rayPlane(r,this._plane,p)),i.defined(s)){const t=e.Cartesian3.subtract(s,this._origin,s),o=e.Cartesian3.dot(this._xAxis,t),r=e.Cartesian3.dot(this._yAxis,t);return i.defined(n)?(n.x=o,n.y=r,n):new e.Cartesian2(o,r)}},l.prototype.projectPointsOntoPlane=function(t,n){i.defined(n)||(n=[]);let e=0;const o=t.length;for(let r=0;r<o;r++){const o=this.projectPointOntoPlane(t[r],n[e]);i.defined(o)&&(n[e]=o,e++)}return n.length=e,n},l.prototype.projectPointToNearestOnPlane=function(t,n){i.defined(n)||(n=new e.Cartesian2);const r=d;r.origin=t,e.Cartesian3.clone(this._plane.normal,r.direction);let s=o.IntersectionTests.rayPlane(r,this._plane,p);i.defined(s)||(e.Cartesian3.negate(r.direction,r.direction),s=o.IntersectionTests.rayPlane(r,this._plane,p));const a=e.Cartesian3.subtract(s,this._origin,s),l=e.Cartesian3.dot(this._xAxis,a),c=e.Cartesian3.dot(this._yAxis,a);return n.x=l,n.y=c,n},l.prototype.projectPointsToNearestOnPlane=function(t,n){i.defined(n)||(n=[]);const e=t.length;n.length=e;for(let i=0;i<e;i++)n[i]=this.projectPointToNearestOnPlane(t[i],n[i]);return n};const f=new e.Cartesian3;l.prototype.projectPointOntoEllipsoid=function(t,n){i.defined(n)||(n=new e.Cartesian3);const o=this._ellipsoid,r=this._origin,s=this._xAxis,a=this._yAxis,l=f;return e.Cartesian3.multiplyByScalar(s,t.x,l),n=e.Cartesian3.add(r,l,n),e.Cartesian3.multiplyByScalar(a,t.y,l),e.Cartesian3.add(n,l,n),o.scaleToGeocentricSurface(n,n),n},l.prototype.projectPointsOntoEllipsoid=function(t,n){const e=t.length;i.defined(n)?n.length=e:n=new Array(e);for(let i=0;i<e;++i)n[i]=this.projectPointOntoEllipsoid(t[i],n[i]);return n},t.EllipsoidTangentPlane=l}));
