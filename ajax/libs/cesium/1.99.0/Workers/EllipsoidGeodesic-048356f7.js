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
define(["exports","./Matrix3-edb29a7e","./defaultValue-135942ca","./Math-a304e2d6"],(function(t,a,i,n){"use strict";function e(t,a,i,n,e,s,o){const r=function(t,a){return t*a*(4+t*(4-3*a))/16}(t,i);return(1-r)*t*a*(n+r*e*(o+r*s*(2*o*o-1)))}const s=new a.Cartesian3,o=new a.Cartesian3;function r(t,i,r,h){a.Cartesian3.normalize(h.cartographicToCartesian(i,o),s),a.Cartesian3.normalize(h.cartographicToCartesian(r,o),o),function(t,a,i,s,o,r,h){const d=(a-i)/a,c=r-s,u=Math.atan((1-d)*Math.tan(o)),l=Math.atan((1-d)*Math.tan(h)),M=Math.cos(u),g=Math.sin(u),_=Math.cos(l),p=Math.sin(l),f=M*_,m=M*p,H=g*p,C=g*_;let v,O,S,q,U,A=c,b=n.CesiumMath.TWO_PI,w=Math.cos(A),R=Math.sin(A);do{w=Math.cos(A),R=Math.sin(A);const t=m-C*w;let a;S=Math.sqrt(_*_*R*R+t*t),O=H+f*w,v=Math.atan2(S,O),0===S?(a=0,q=1):(a=f*R/S,q=1-a*a),b=A,U=O-2*H/q,isFinite(U)||(U=0),A=c+e(d,a,q,v,S,O,U)}while(Math.abs(A-b)>n.CesiumMath.EPSILON12);const x=q*(a*a-i*i)/(i*i),y=x*(256+x*(x*(74-47*x)-128))/1024,E=U*U,P=i*(1+x*(4096+x*(x*(320-175*x)-768))/16384)*(v-y*S*(U+y*(O*(2*E-1)-y*U*(4*S*S-3)*(4*E-3)/6)/4)),D=Math.atan2(_*R,m-C*w),T=Math.atan2(M*R,m*w-C);t._distance=P,t._startHeading=D,t._endHeading=T,t._uSquared=x}(t,h.maximumRadius,h.minimumRadius,i.longitude,i.latitude,r.longitude,r.latitude),t._start=a.Cartographic.clone(i,t._start),t._end=a.Cartographic.clone(r,t._end),t._start.height=0,t._end.height=0,function(t){const a=t._uSquared,i=t._ellipsoid.maximumRadius,n=t._ellipsoid.minimumRadius,e=(i-n)/i,s=Math.cos(t._startHeading),o=Math.sin(t._startHeading),r=(1-e)*Math.tan(t._start.latitude),h=1/Math.sqrt(1+r*r),d=h*r,c=Math.atan2(r,s),u=h*o,l=u*u,M=1-l,g=Math.sqrt(M),_=a/4,p=_*_,f=p*_,m=p*p,H=1+_-3*p/4+5*f/4-175*m/64,C=1-_+15*p/8-35*f/8,v=1-3*_+35*p/4,O=1-5*_,S=H*c-C*Math.sin(2*c)*_/2-v*Math.sin(4*c)*p/16-O*Math.sin(6*c)*f/48-5*Math.sin(8*c)*m/512,q=t._constants;q.a=i,q.b=n,q.f=e,q.cosineHeading=s,q.sineHeading=o,q.tanU=r,q.cosineU=h,q.sineU=d,q.sigma=c,q.sineAlpha=u,q.sineSquaredAlpha=l,q.cosineSquaredAlpha=M,q.cosineAlpha=g,q.u2Over4=_,q.u4Over16=p,q.u6Over64=f,q.u8Over256=m,q.a0=H,q.a1=C,q.a2=v,q.a3=O,q.distanceRatio=S}(t)}function h(t,n,e){const s=i.defaultValue(e,a.Ellipsoid.WGS84);this._ellipsoid=s,this._start=new a.Cartographic,this._end=new a.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,i.defined(t)&&i.defined(n)&&r(this,t,n,s)}Object.defineProperties(h.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return this._startHeading}},endHeading:{get:function(){return this._endHeading}}}),h.prototype.setEndPoints=function(t,a){r(this,t,a,this._ellipsoid)},h.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},h.prototype.interpolateUsingSurfaceDistance=function(t,n){const s=this._constants,o=s.distanceRatio+t/s.b,r=Math.cos(2*o),h=Math.cos(4*o),d=Math.cos(6*o),c=Math.sin(2*o),u=Math.sin(4*o),l=Math.sin(6*o),M=Math.sin(8*o),g=o*o,_=o*g,p=s.u8Over256,f=s.u2Over4,m=s.u6Over64,H=s.u4Over16;let C=2*_*p*r/3+o*(1-f+7*H/4-15*m/4+579*p/64-(H-15*m/4+187*p/16)*r-(5*m/4-115*p/16)*h-29*p*d/16)+(f/2-H+71*m/32-85*p/16)*c+(5*H/16-5*m/4+383*p/96)*u-g*((m-11*p/2)*c+5*p*u/2)+(29*m/96-29*p/16)*l+539*p*M/1536;const v=Math.asin(Math.sin(C)*s.cosineAlpha),O=Math.atan(s.a/s.b*Math.tan(v));C-=s.sigma;const S=Math.cos(2*s.sigma+C),q=Math.sin(C),U=Math.cos(C),A=s.cosineU*U,b=s.sineU*q,w=Math.atan2(q*s.sineHeading,A-b*s.cosineHeading)-e(s.f,s.sineAlpha,s.cosineSquaredAlpha,C,q,U,S);return i.defined(n)?(n.longitude=this._start.longitude+w,n.latitude=O,n.height=0,n):new a.Cartographic(this._start.longitude+w,O,0)},t.EllipsoidGeodesic=h}));
