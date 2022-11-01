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
define(["./Matrix3-edb29a7e","./combine-462d91dd","./AttributeCompression-5b18be52","./Math-a304e2d6","./IndexDatatype-3a8ea78f","./Matrix2-7a2bab7e","./createTaskProcessorWorker","./defaultValue-135942ca","./ComponentDatatype-e86a9f87","./WebGLConstants-fcb70ee3","./RuntimeError-f0dada00"],(function(e,a,t,n,r,s,i,o,c,u,f){"use strict";const d=32767,p=new e.Cartographic,l=new e.Cartesian3;const b=new s.Rectangle,C=new e.Ellipsoid,w=new e.Cartesian3,h={min:void 0,max:void 0};const y=new e.Cartesian3,k=new e.Cartesian3,m=new e.Cartesian3,A=new e.Cartesian3,g=new e.Cartesian3;return i((function(i,o){const c=new Uint16Array(i.positions),u=new Uint16Array(i.widths),f=new Uint32Array(i.counts),x=new Uint16Array(i.batchIds);!function(a){a=new Float64Array(a);let t=0;h.min=a[t++],h.max=a[t++],s.Rectangle.unpack(a,t,b),t+=s.Rectangle.packedLength,e.Ellipsoid.unpack(a,t,C),t+=e.Ellipsoid.packedLength,e.Cartesian3.unpack(a,t,w)}(i.packedBuffer);const D=C,E=w,I=function(a,r,s,i,o){const c=a.length/3,u=a.subarray(0,c),f=a.subarray(c,2*c),b=a.subarray(2*c,3*c);t.AttributeCompression.zigZagDeltaDecode(u,f,b);const C=new Float64Array(a.length);for(let a=0;a<c;++a){const t=u[a],c=f[a],w=b[a],h=n.CesiumMath.lerp(r.west,r.east,t/d),y=n.CesiumMath.lerp(r.south,r.north,c/d),k=n.CesiumMath.lerp(s,i,w/d),m=e.Cartographic.fromRadians(h,y,k,p),A=o.cartographicToCartesian(m,l);e.Cartesian3.pack(A,C,3*a)}return C}(c,b,h.min,h.max,D),P=I.length/3,U=4*P-4,M=new Float32Array(3*U),R=new Float32Array(3*U),T=new Float32Array(3*U),F=new Float32Array(2*U),N=new Uint16Array(U);let L,S=0,_=0,v=0,G=0,W=f.length;for(L=0;L<W;++L){const a=f[L],t=u[L],n=x[L];for(let r=0;r<a;++r){let s;if(0===r){const a=e.Cartesian3.unpack(I,3*G,y),t=e.Cartesian3.unpack(I,3*(G+1),k);s=e.Cartesian3.subtract(a,t,m),e.Cartesian3.add(a,s,s)}else s=e.Cartesian3.unpack(I,3*(G+r-1),m);const i=e.Cartesian3.unpack(I,3*(G+r),A);let o;if(r===a-1){const t=e.Cartesian3.unpack(I,3*(G+a-1),y),n=e.Cartesian3.unpack(I,3*(G+a-2),k);o=e.Cartesian3.subtract(t,n,g),e.Cartesian3.add(t,o,o)}else o=e.Cartesian3.unpack(I,3*(G+r+1),g);e.Cartesian3.subtract(s,E,s),e.Cartesian3.subtract(i,E,i),e.Cartesian3.subtract(o,E,o);const c=r===a-1?2:4;for(let a=0===r?2:0;a<c;++a){e.Cartesian3.pack(i,M,S),e.Cartesian3.pack(s,R,S),e.Cartesian3.pack(o,T,S),S+=3;const r=a-2<0?-1:1;F[_++]=a%2*2-1,F[_++]=r*t,N[v++]=n}}G+=a}const B=r.IndexDatatype.createTypedArray(U,6*P-6);let O=0,z=0;for(W=P-1,L=0;L<W;++L)B[z++]=O,B[z++]=O+2,B[z++]=O+1,B[z++]=O+1,B[z++]=O+2,B[z++]=O+3,O+=4;o.push(M.buffer,R.buffer,T.buffer),o.push(F.buffer,N.buffer,B.buffer);let H={indexDatatype:2===B.BYTES_PER_ELEMENT?r.IndexDatatype.UNSIGNED_SHORT:r.IndexDatatype.UNSIGNED_INT,currentPositions:M.buffer,previousPositions:R.buffer,nextPositions:T.buffer,expandAndWidth:F.buffer,batchIds:N.buffer,indices:B.buffer};if(i.keepDecodedPositions){const e=function(e){const a=e.length,t=new Uint32Array(a+1);let n=0;for(let r=0;r<a;++r)t[r]=n,n+=e[r];return t[a]=n,t}(f);o.push(I.buffer,e.buffer),H=a.combine(H,{decodedPositions:I.buffer,decodedPositionOffsets:e.buffer})}return H}))}));
