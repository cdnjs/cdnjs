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
define(["./defaultValue-a6eb9f34","./Transforms-0c3fa360","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./FrustumGeometry-aac657b9","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./RuntimeError-07496d94","./WebGLConstants-d81b330d","./Plane-17fe9d66","./VertexFormat-31cdbccc"],(function(e,t,r,n,a,u,i,o,c,s,p,m,d){"use strict";function f(n){const u=n.frustum,i=n.orientation,o=n.origin,c=e.defaultValue(n._drawNearPlane,!0);let s,p;u instanceof a.PerspectiveFrustum?(s=0,p=a.PerspectiveFrustum.packedLength):u instanceof a.OrthographicFrustum&&(s=1,p=a.OrthographicFrustum.packedLength),this._frustumType=s,this._frustum=u.clone(),this._origin=r.Cartesian3.clone(o),this._orientation=t.Quaternion.clone(i),this._drawNearPlane=c,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+p+r.Cartesian3.packedLength+t.Quaternion.packedLength}f.pack=function(n,u,i){i=e.defaultValue(i,0);const o=n._frustumType,c=n._frustum;return u[i++]=o,0===o?(a.PerspectiveFrustum.pack(c,u,i),i+=a.PerspectiveFrustum.packedLength):(a.OrthographicFrustum.pack(c,u,i),i+=a.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,u,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,u,i),u[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,u};const h=new a.PerspectiveFrustum,l=new a.OrthographicFrustum,g=new t.Quaternion,_=new r.Cartesian3;return f.unpack=function(n,u,i){u=e.defaultValue(u,0);const o=n[u++];let c;0===o?(c=a.PerspectiveFrustum.unpack(n,u,h),u+=a.PerspectiveFrustum.packedLength):(c=a.OrthographicFrustum.unpack(n,u,l),u+=a.OrthographicFrustum.packedLength);const s=r.Cartesian3.unpack(n,u,_);u+=r.Cartesian3.packedLength;const p=t.Quaternion.unpack(n,u,g),m=1===n[u+=t.Quaternion.packedLength];if(!e.defined(i))return new f({frustum:c,origin:s,orientation:p,_drawNearPlane:m});const d=o===i._frustumType?i._frustum:void 0;return i._frustum=c.clone(d),i._frustumType=o,i._origin=r.Cartesian3.clone(s,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=m,i},f.createGeometry=function(e){const r=e._frustumType,o=e._frustum,c=e._origin,s=e._orientation,p=e._drawNearPlane,m=new Float64Array(24);a.FrustumGeometry._computeNearFarPlanes(c,s,r,o,m);const d=new i.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})});let f,h;const l=p?2:1,g=new Uint16Array(8*(l+1));let _=p?0:1;for(;_<2;++_)f=p?8*_:0,h=4*_,g[f]=h,g[f+1]=h+1,g[f+2]=h+1,g[f+3]=h+2,g[f+4]=h+2,g[f+5]=h+3,g[f+6]=h+3,g[f+7]=h;for(_=0;_<2;++_)f=8*(l+_),h=4*_,g[f]=h,g[f+1]=h+4,g[f+2]=h+1,g[f+3]=h+5,g[f+4]=h+2,g[f+5]=h+6,g[f+6]=h+3,g[f+7]=h+7;return new u.Geometry({attributes:d,indices:g,primitiveType:u.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(m)})},function(t,r){return e.defined(r)&&(t=f.unpack(t,r)),f.createGeometry(t)}}));
