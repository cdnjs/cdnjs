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
define(["./Matrix2-276d97d2","./combine-7cf28d88","./AttributeCompression-28a6d524","./ComponentDatatype-7f6d9570","./IndexDatatype-856d3a0c","./createTaskProcessorWorker","./defaultValue-a6eb9f34","./RuntimeError-07496d94","./WebGLConstants-d81b330d"],(function(e,t,a,n,r,s,i,o,c){"use strict";const u=32767,f=new e.Cartographic,d=new e.Cartesian3;const p=new e.Rectangle,l=new e.Ellipsoid,C=new e.Cartesian3,b={min:void 0,max:void 0};const w=new e.Cartesian3,y=new e.Cartesian3,h=new e.Cartesian3,k=new e.Cartesian3,m=new e.Cartesian3;return s((function(s,i){const o=new Uint16Array(s.positions),c=new Uint16Array(s.widths),A=new Uint32Array(s.counts),g=new Uint16Array(s.batchIds);!function(t){t=new Float64Array(t);let a=0;b.min=t[a++],b.max=t[a++],e.Rectangle.unpack(t,a,p),a+=e.Rectangle.packedLength,e.Ellipsoid.unpack(t,a,l),a+=e.Ellipsoid.packedLength,e.Cartesian3.unpack(t,a,C)}(s.packedBuffer);const x=l,D=C,E=function(t,r,s,i,o){const c=t.length/3,p=t.subarray(0,c),l=t.subarray(c,2*c),C=t.subarray(2*c,3*c);a.AttributeCompression.zigZagDeltaDecode(p,l,C);const b=new Float64Array(t.length);for(let t=0;t<c;++t){const a=p[t],c=l[t],w=C[t],y=n.CesiumMath.lerp(r.west,r.east,a/u),h=n.CesiumMath.lerp(r.south,r.north,c/u),k=n.CesiumMath.lerp(s,i,w/u),m=e.Cartographic.fromRadians(y,h,k,f),A=o.cartographicToCartesian(m,d);e.Cartesian3.pack(A,b,3*t)}return b}(o,p,b.min,b.max,x),I=E.length/3,P=4*I-4,U=new Float32Array(3*P),R=new Float32Array(3*P),T=new Float32Array(3*P),F=new Float32Array(2*P),N=new Uint16Array(P);let M,L=0,S=0,_=0,v=0,G=A.length;for(M=0;M<G;++M){const t=A[M],a=c[M],n=g[M];for(let r=0;r<t;++r){let s;if(0===r){const t=e.Cartesian3.unpack(E,3*v,w),a=e.Cartesian3.unpack(E,3*(v+1),y);s=e.Cartesian3.subtract(t,a,h),e.Cartesian3.add(t,s,s)}else s=e.Cartesian3.unpack(E,3*(v+r-1),h);const i=e.Cartesian3.unpack(E,3*(v+r),k);let o;if(r===t-1){const a=e.Cartesian3.unpack(E,3*(v+t-1),w),n=e.Cartesian3.unpack(E,3*(v+t-2),y);o=e.Cartesian3.subtract(a,n,m),e.Cartesian3.add(a,o,o)}else o=e.Cartesian3.unpack(E,3*(v+r+1),m);e.Cartesian3.subtract(s,D,s),e.Cartesian3.subtract(i,D,i),e.Cartesian3.subtract(o,D,o);const c=r===t-1?2:4;for(let t=0===r?2:0;t<c;++t){e.Cartesian3.pack(i,U,L),e.Cartesian3.pack(s,R,L),e.Cartesian3.pack(o,T,L),L+=3;const r=t-2<0?-1:1;F[S++]=t%2*2-1,F[S++]=r*a,N[_++]=n}}v+=t}const W=r.IndexDatatype.createTypedArray(P,6*I-6);let B=0,O=0;for(G=I-1,M=0;M<G;++M)W[O++]=B,W[O++]=B+2,W[O++]=B+1,W[O++]=B+1,W[O++]=B+2,W[O++]=B+3,B+=4;i.push(U.buffer,R.buffer,T.buffer),i.push(F.buffer,N.buffer,W.buffer);let z={indexDatatype:2===W.BYTES_PER_ELEMENT?r.IndexDatatype.UNSIGNED_SHORT:r.IndexDatatype.UNSIGNED_INT,currentPositions:U.buffer,previousPositions:R.buffer,nextPositions:T.buffer,expandAndWidth:F.buffer,batchIds:N.buffer,indices:W.buffer};if(s.keepDecodedPositions){const e=function(e){const t=e.length,a=new Uint32Array(t+1);let n=0;for(let r=0;r<t;++r)a[r]=n,n+=e[r];return a[t]=n,a}(A);i.push(E.buffer,e.buffer),z=t.combine(z,{decodedPositions:E.buffer,decodedPositionOffsets:e.buffer})}return z}))}));
