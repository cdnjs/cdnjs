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
define(["./defaultValue-97284df2","./Transforms-d3d3b2a9","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./ComponentDatatype-e7fbe225","./FrustumGeometry-be9b9578","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./Plane-e916220d","./VertexFormat-9886cb81"],(function(e,t,r,n,a,u,i,o,s,c,p,m,d){"use strict";function f(n){const a=n.frustum,i=n.orientation,o=n.origin,s=e.defaultValue(n._drawNearPlane,!0);let c,p;a instanceof u.PerspectiveFrustum?(c=0,p=u.PerspectiveFrustum.packedLength):a instanceof u.OrthographicFrustum&&(c=1,p=u.OrthographicFrustum.packedLength),this._frustumType=c,this._frustum=a.clone(),this._origin=r.Cartesian3.clone(o),this._orientation=t.Quaternion.clone(i),this._drawNearPlane=s,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+p+r.Cartesian3.packedLength+t.Quaternion.packedLength}f.pack=function(n,a,i){i=e.defaultValue(i,0);const o=n._frustumType,s=n._frustum;return a[i++]=o,0===o?(u.PerspectiveFrustum.pack(s,a,i),i+=u.PerspectiveFrustum.packedLength):(u.OrthographicFrustum.pack(s,a,i),i+=u.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,a,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,a,i),a[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,a};const h=new u.PerspectiveFrustum,l=new u.OrthographicFrustum,g=new t.Quaternion,_=new r.Cartesian3;return f.unpack=function(n,a,i){a=e.defaultValue(a,0);const o=n[a++];let s;0===o?(s=u.PerspectiveFrustum.unpack(n,a,h),a+=u.PerspectiveFrustum.packedLength):(s=u.OrthographicFrustum.unpack(n,a,l),a+=u.OrthographicFrustum.packedLength);const c=r.Cartesian3.unpack(n,a,_);a+=r.Cartesian3.packedLength;const p=t.Quaternion.unpack(n,a,g),m=1===n[a+=t.Quaternion.packedLength];if(!e.defined(i))return new f({frustum:s,origin:c,orientation:p,_drawNearPlane:m});const d=o===i._frustumType?i._frustum:void 0;return i._frustum=s.clone(d),i._frustumType=o,i._origin=r.Cartesian3.clone(c,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=m,i},f.createGeometry=function(e){const r=e._frustumType,n=e._frustum,s=e._origin,c=e._orientation,p=e._drawNearPlane,m=new Float64Array(24);u.FrustumGeometry._computeNearFarPlanes(s,c,r,n,m);const d=new o.GeometryAttributes({position:new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})});let f,h;const l=p?2:1,g=new Uint16Array(8*(l+1));let _=p?0:1;for(;_<2;++_)f=p?8*_:0,h=4*_,g[f]=h,g[f+1]=h+1,g[f+2]=h+1,g[f+3]=h+2,g[f+4]=h+2,g[f+5]=h+3,g[f+6]=h+3,g[f+7]=h;for(_=0;_<2;++_)f=8*(l+_),h=4*_,g[f]=h,g[f+1]=h+4,g[f+2]=h+1,g[f+3]=h+5,g[f+4]=h+2,g[f+5]=h+6,g[f+6]=h+3,g[f+7]=h+7;return new i.Geometry({attributes:d,indices:g,primitiveType:i.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(m)})},function(t,r){return e.defined(r)&&(t=f.unpack(t,r)),f.createGeometry(t)}}));
