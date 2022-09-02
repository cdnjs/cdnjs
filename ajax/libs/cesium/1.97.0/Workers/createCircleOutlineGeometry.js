/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
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
define(["./Matrix2-276d97d2","./defaultValue-a6eb9f34","./EllipseOutlineGeometry-da9c79c5","./ComponentDatatype-7f6d9570","./WebGLConstants-d81b330d","./RuntimeError-07496d94","./Transforms-0c3fa360","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./EllipseGeometryLibrary-65924704","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryOffsetAttribute-102da468","./IndexDatatype-856d3a0c"],(function(e,i,t,r,l,n,s,o,a,d,u,c,m,p){"use strict";function y(e){const r=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,l={center:e.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,numberOfVerticalLines:e.numberOfVerticalLines};this._ellipseGeometry=new t.EllipseOutlineGeometry(l),this._workerName="createCircleOutlineGeometry"}y.packedLength=t.EllipseOutlineGeometry.packedLength,y.pack=function(e,i,r){return t.EllipseOutlineGeometry.pack(e._ellipseGeometry,i,r)};const f=new t.EllipseOutlineGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),G={center:new e.Cartesian3,radius:void 0,ellipsoid:e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return y.unpack=function(r,l,n){const s=t.EllipseOutlineGeometry.unpack(r,l,f);return G.center=e.Cartesian3.clone(s._center,G.center),G.ellipsoid=e.Ellipsoid.clone(s._ellipsoid,G.ellipsoid),G.height=s._height,G.extrudedHeight=s._extrudedHeight,G.granularity=s._granularity,G.numberOfVerticalLines=s._numberOfVerticalLines,i.defined(n)?(G.semiMajorAxis=s._semiMajorAxis,G.semiMinorAxis=s._semiMinorAxis,n._ellipseGeometry=new t.EllipseOutlineGeometry(G),n):(G.radius=s._semiMajorAxis,new y(G))},y.createGeometry=function(e){return t.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(t,r){return i.defined(r)&&(t=y.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),y.createGeometry(t)}}));
