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
define(["./defaultValue-135942ca","./Transforms-3ea76111","./Matrix3-edb29a7e","./ComponentDatatype-e86a9f87","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./WebGLConstants-fcb70ee3"],(function(e,t,n,r,a,i,o,u,c,d,s){"use strict";function y(){this._workerName="createPlaneOutlineGeometry"}y.packedLength=0,y.pack=function(e,t){return t},y.unpack=function(t,n,r){return e.defined(r)?r:new y};const m=new n.Cartesian3(-.5,-.5,0),p=new n.Cartesian3(.5,.5,0);return y.createGeometry=function(){const e=new i.GeometryAttributes,o=new Uint16Array(8),u=new Float64Array(12);return u[0]=m.x,u[1]=m.y,u[2]=m.z,u[3]=p.x,u[4]=m.y,u[5]=m.z,u[6]=p.x,u[7]=p.y,u[8]=m.z,u[9]=m.x,u[10]=p.y,u[11]=m.z,e.position=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),o[0]=0,o[1]=1,o[2]=1,o[3]=2,o[4]=2,o[5]=3,o[6]=3,o[7]=0,new a.Geometry({attributes:e,indices:o,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=y.unpack(t,n)),y.createGeometry(t)}}));
