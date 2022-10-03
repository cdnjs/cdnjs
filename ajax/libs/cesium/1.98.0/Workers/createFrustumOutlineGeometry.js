/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.98
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
define(["./defaultValue-50f7432c","./Transforms-f305a473","./Matrix2-7dfd434a","./ComponentDatatype-9b23164a","./FrustumGeometry-984a179b","./GeometryAttribute-4d82fade","./GeometryAttributes-8bab1b25","./combine-8462e002","./RuntimeError-48e1f06d","./WebGLConstants-58abc51a","./Plane-3d30b188","./VertexFormat-fa0c27e8"],(function(e,t,r,n,a,u,i,o,s,c,p,m){"use strict";function d(n){const u=n.frustum,i=n.orientation,o=n.origin,s=e.defaultValue(n._drawNearPlane,!0);let c,p;u instanceof a.PerspectiveFrustum?(c=0,p=a.PerspectiveFrustum.packedLength):u instanceof a.OrthographicFrustum&&(c=1,p=a.OrthographicFrustum.packedLength),this._frustumType=c,this._frustum=u.clone(),this._origin=r.Cartesian3.clone(o),this._orientation=t.Quaternion.clone(i),this._drawNearPlane=s,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+p+r.Cartesian3.packedLength+t.Quaternion.packedLength}d.pack=function(n,u,i){i=e.defaultValue(i,0);const o=n._frustumType,s=n._frustum;return u[i++]=o,0===o?(a.PerspectiveFrustum.pack(s,u,i),i+=a.PerspectiveFrustum.packedLength):(a.OrthographicFrustum.pack(s,u,i),i+=a.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,u,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,u,i),u[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,u};const f=new a.PerspectiveFrustum,h=new a.OrthographicFrustum,g=new t.Quaternion,l=new r.Cartesian3;return d.unpack=function(n,u,i){u=e.defaultValue(u,0);const o=n[u++];let s;0===o?(s=a.PerspectiveFrustum.unpack(n,u,f),u+=a.PerspectiveFrustum.packedLength):(s=a.OrthographicFrustum.unpack(n,u,h),u+=a.OrthographicFrustum.packedLength);const c=r.Cartesian3.unpack(n,u,l);u+=r.Cartesian3.packedLength;const p=t.Quaternion.unpack(n,u,g),m=1===n[u+=t.Quaternion.packedLength];if(!e.defined(i))return new d({frustum:s,origin:c,orientation:p,_drawNearPlane:m});const _=o===i._frustumType?i._frustum:void 0;return i._frustum=s.clone(_),i._frustumType=o,i._origin=r.Cartesian3.clone(c,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=m,i},d.createGeometry=function(e){const r=e._frustumType,o=e._frustum,s=e._origin,c=e._orientation,p=e._drawNearPlane,m=new Float64Array(24);a.FrustumGeometry._computeNearFarPlanes(s,c,r,o,m);const d=new i.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})});let f,h;const g=p?2:1,l=new Uint16Array(8*(g+1));let _=p?0:1;for(;_<2;++_)f=p?8*_:0,h=4*_,l[f]=h,l[f+1]=h+1,l[f+2]=h+1,l[f+3]=h+2,l[f+4]=h+2,l[f+5]=h+3,l[f+6]=h+3,l[f+7]=h;for(_=0;_<2;++_)f=8*(g+_),h=4*_,l[f]=h,l[f+1]=h+4,l[f+2]=h+1,l[f+3]=h+5,l[f+4]=h+2,l[f+5]=h+6,l[f+6]=h+3,l[f+7]=h+7;return new u.Geometry({attributes:d,indices:l,primitiveType:u.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(m)})},function(t,r){return e.defined(r)&&(t=d.unpack(t,r)),d.createGeometry(t)}}));
