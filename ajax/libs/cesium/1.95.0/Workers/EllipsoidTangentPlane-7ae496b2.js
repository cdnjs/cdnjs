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
define(["exports","./AxisAlignedBoundingBox-b1c095aa","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2","./IntersectionTests-33ace2d6","./Plane-e916220d","./Transforms-d3d3b2a9"],(function(t,n,e,i,o,r,s,a){"use strict";const l=new e.Cartesian4;function c(t,n){t=(n=o.defaultValue(n,e.Ellipsoid.WGS84)).scaleToGeodeticSurface(t);const i=a.Transforms.eastNorthUpToFixedFrame(t,n);this._ellipsoid=n,this._origin=t,this._xAxis=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(i,0,l)),this._yAxis=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(i,1,l));const r=e.Cartesian3.fromCartesian4(e.Matrix4.getColumn(i,2,l));this._plane=s.Plane.fromPointNormal(t,r)}Object.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});const d=new n.AxisAlignedBoundingBox;c.fromPoints=function(t,e){return new c(n.AxisAlignedBoundingBox.fromPoints(t,d).center,e)};const p=new r.Ray,u=new e.Cartesian3;c.prototype.projectPointOntoPlane=function(t,n){const i=p;i.origin=t,e.Cartesian3.normalize(t,i.direction);let s=r.IntersectionTests.rayPlane(i,this._plane,u);if(o.defined(s)||(e.Cartesian3.negate(i.direction,i.direction),s=r.IntersectionTests.rayPlane(i,this._plane,u)),o.defined(s)){const t=e.Cartesian3.subtract(s,this._origin,s),i=e.Cartesian3.dot(this._xAxis,t),r=e.Cartesian3.dot(this._yAxis,t);return o.defined(n)?(n.x=i,n.y=r,n):new e.Cartesian2(i,r)}},c.prototype.projectPointsOntoPlane=function(t,n){o.defined(n)||(n=[]);let e=0;const i=t.length;for(let r=0;r<i;r++){const i=this.projectPointOntoPlane(t[r],n[e]);o.defined(i)&&(n[e]=i,e++)}return n.length=e,n},c.prototype.projectPointToNearestOnPlane=function(t,n){o.defined(n)||(n=new e.Cartesian2);const i=p;i.origin=t,e.Cartesian3.clone(this._plane.normal,i.direction);let s=r.IntersectionTests.rayPlane(i,this._plane,u);o.defined(s)||(e.Cartesian3.negate(i.direction,i.direction),s=r.IntersectionTests.rayPlane(i,this._plane,u));const a=e.Cartesian3.subtract(s,this._origin,s),l=e.Cartesian3.dot(this._xAxis,a),c=e.Cartesian3.dot(this._yAxis,a);return n.x=l,n.y=c,n},c.prototype.projectPointsToNearestOnPlane=function(t,n){o.defined(n)||(n=[]);const e=t.length;n.length=e;for(let i=0;i<e;i++)n[i]=this.projectPointToNearestOnPlane(t[i],n[i]);return n};const f=new e.Cartesian3;c.prototype.projectPointOntoEllipsoid=function(t,n){o.defined(n)||(n=new e.Cartesian3);const i=this._ellipsoid,r=this._origin,s=this._xAxis,a=this._yAxis,l=f;return e.Cartesian3.multiplyByScalar(s,t.x,l),n=e.Cartesian3.add(r,l,n),e.Cartesian3.multiplyByScalar(a,t.y,l),e.Cartesian3.add(n,l,n),i.scaleToGeocentricSurface(n,n),n},c.prototype.projectPointsOntoEllipsoid=function(t,n){const e=t.length;o.defined(n)?n.length=e:n=new Array(e);for(let i=0;i<e;++i)n[i]=this.projectPointOntoEllipsoid(t[i],n[i]);return n},t.EllipsoidTangentPlane=c}));
