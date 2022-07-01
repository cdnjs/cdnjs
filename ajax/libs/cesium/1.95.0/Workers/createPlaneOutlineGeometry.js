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
define(["./defaultValue-97284df2","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2"],(function(e,t,n,r,a,i,o,u,c,s){"use strict";function m(){this._workerName="createPlaneOutlineGeometry"}m.packedLength=0,m.pack=function(e,t){return t},m.unpack=function(t,n,r){return e.defined(r)?r:new m};const y=new n.Cartesian3(-.5,-.5,0),p=new n.Cartesian3(.5,.5,0);return m.createGeometry=function(){const e=new o.GeometryAttributes,r=new Uint16Array(8),u=new Float64Array(12);return u[0]=y.x,u[1]=y.y,u[2]=y.z,u[3]=p.x,u[4]=y.y,u[5]=y.z,u[6]=p.x,u[7]=p.y,u[8]=y.z,u[9]=y.x,u[10]=p.y,u[11]=y.z,e.position=new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),r[0]=0,r[1]=1,r[2]=1,r[3]=2,r[4]=2,r[5]=3,r[6]=3,r[7]=0,new i.Geometry({attributes:e,indices:r,primitiveType:i.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=m.unpack(t,n)),m.createGeometry(t)}}));
