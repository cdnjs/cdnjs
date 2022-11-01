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
define(["./defaultValue-135942ca","./Transforms-3ea76111","./Matrix3-edb29a7e","./ComponentDatatype-e86a9f87","./GeometryAttribute-dacddb3f","./GeometryAttributes-899f8bd0","./VertexFormat-7d5b4d7e","./Math-a304e2d6","./Matrix2-7a2bab7e","./RuntimeError-f0dada00","./combine-462d91dd","./WebGLConstants-fcb70ee3"],(function(e,t,n,a,r,o,i,m,u,c,p,s){"use strict";function y(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);const n=e.defaultValue(t.vertexFormat,i.VertexFormat.DEFAULT);this._vertexFormat=n,this._workerName="createPlaneGeometry"}y.packedLength=i.VertexFormat.packedLength,y.pack=function(t,n,a){return a=e.defaultValue(a,0),i.VertexFormat.pack(t._vertexFormat,n,a),n};const d=new i.VertexFormat,l={vertexFormat:d};y.unpack=function(t,n,a){n=e.defaultValue(n,0);const r=i.VertexFormat.unpack(t,n,d);return e.defined(a)?(a._vertexFormat=i.VertexFormat.clone(r,a._vertexFormat),a):new y(l)};const b=new n.Cartesian3(-.5,-.5,0),f=new n.Cartesian3(.5,.5,0);return y.createGeometry=function(e){const i=e._vertexFormat,m=new o.GeometryAttributes;let u,c;if(i.position){if(c=new Float64Array(12),c[0]=b.x,c[1]=b.y,c[2]=0,c[3]=f.x,c[4]=b.y,c[5]=0,c[6]=f.x,c[7]=f.y,c[8]=0,c[9]=b.x,c[10]=f.y,c[11]=0,m.position=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),i.normal){const e=new Float32Array(12);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=1,e[9]=0,e[10]=0,e[11]=1,m.normal=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(i.st){const e=new Float32Array(8);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=1,e[5]=1,e[6]=0,e[7]=1,m.st=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:e})}if(i.tangent){const e=new Float32Array(12);e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=1,e[7]=0,e[8]=0,e[9]=1,e[10]=0,e[11]=0,m.tangent=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(i.bitangent){const e=new Float32Array(12);e[0]=0,e[1]=1,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=1,e[8]=0,e[9]=0,e[10]=1,e[11]=0,m.bitangent=new r.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}u=new Uint16Array(6),u[0]=0,u[1]=1,u[2]=2,u[3]=0,u[4]=2,u[5]=3}return new r.Geometry({attributes:m,indices:u,primitiveType:r.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=y.unpack(t,n)),y.createGeometry(t)}}));
