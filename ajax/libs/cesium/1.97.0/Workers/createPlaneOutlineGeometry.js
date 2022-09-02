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
define(["./defaultValue-a6eb9f34","./Transforms-0c3fa360","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./RuntimeError-07496d94","./WebGLConstants-d81b330d"],(function(e,t,n,r,i,o,a,u,c,s){"use strict";function m(){this._workerName="createPlaneOutlineGeometry"}m.packedLength=0,m.pack=function(e,t){return t},m.unpack=function(t,n,r){return e.defined(r)?r:new m};const y=new n.Cartesian3(-.5,-.5,0),f=new n.Cartesian3(.5,.5,0);return m.createGeometry=function(){const e=new o.GeometryAttributes,a=new Uint16Array(8),u=new Float64Array(12);return u[0]=y.x,u[1]=y.y,u[2]=y.z,u[3]=f.x,u[4]=y.y,u[5]=y.z,u[6]=f.x,u[7]=f.y,u[8]=y.z,u[9]=y.x,u[10]=f.y,u[11]=y.z,e.position=new i.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),a[0]=0,a[1]=1,a[2]=1,a[3]=2,a[4]=2,a[5]=3,a[6]=3,a[7]=0,new i.Geometry({attributes:e,indices:a,primitiveType:i.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=m.unpack(t,n)),m.createGeometry(t)}}));
