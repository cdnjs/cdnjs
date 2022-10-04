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
define(["./Matrix2-c339372d","./defaultValue-65031fc5","./EllipseOutlineGeometry-6b191d0d","./ComponentDatatype-1b227f17","./WebGLConstants-f5c279b9","./RuntimeError-23f4777c","./Transforms-a48d25e5","./combine-96aed74b","./EllipseGeometryLibrary-53ed4539","./GeometryAttribute-5db26912","./GeometryAttributes-f9b563d6","./GeometryOffsetAttribute-026030ef","./IndexDatatype-53de8b23"],(function(e,i,t,r,l,n,s,o,a,d,u,c,m){"use strict";function p(e){const r=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,l={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new t.EllipseOutlineGeometry(l),this._workerName="createCircleOutlineGeometry"}p.packedLength=t.EllipseOutlineGeometry.packedLength,p.pack=function(e,i,r){return t.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,r)};const y=new t.EllipseOutlineGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),f={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return p.unpack=function(r,l,n){const s=t.EllipseOutlineGeometry.unpack(r,l,y);return f.center=e.Cartesian3.clone(s._center,f.center),f.ellipsoid=e.Ellipsoid.clone(s._ellipsoid,f.ellipsoid),f.height=s._height,f.extrudedHeight=s._extrudedHeight,f.granularity=s._granularity,f.numberOfVerticalLines=s._numberOfVerticalLines,i.defined(n)?(f.semiMajorAxis=s._semiMajorAxis,f.semiMinorAxis=s._semiMinorAxis,n._ellipseGeometry=new t.EllipseOutlineGeometry(f),n):(f.radius=s._semiMajorAxis,new p(f))},p.createGeometry=function(e){return t.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(t,r){return i.defined(r)&&(t=p.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),p.createGeometry(t)}}));
