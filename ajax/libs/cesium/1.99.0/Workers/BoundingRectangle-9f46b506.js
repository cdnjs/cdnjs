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
define(["exports","./Matrix2-7a2bab7e","./Matrix3-edb29a7e","./defaultValue-135942ca","./Transforms-3ea76111"],(function(t,e,n,i,h){"use strict";function a(t,e,n,h){this.x=i.defaultValue(t,0),this.y=i.defaultValue(e,0),this.width=i.defaultValue(n,0),this.height=i.defaultValue(h,0)}a.packedLength=4,a.pack=function(t,e,n){return n=i.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},a.unpack=function(t,e,n){return e=i.defaultValue(e,0),i.defined(n)||(n=new a),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},a.fromPoints=function(t,e){if(i.defined(e)||(e=new a),!i.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;const n=t.length;let h=t[0].x,r=t[0].y,d=t[0].x,u=t[0].y;for(let e=1;e<n;e++){const n=t[e],i=n.x,a=n.y;h=Math.min(i,h),d=Math.max(i,d),r=Math.min(a,r),u=Math.max(a,u)}return e.x=h,e.y=r,e.width=d-h,e.height=u-r,e};const r=new h.GeographicProjection,d=new n.Cartographic,u=new n.Cartographic;a.fromRectangle=function(t,n,h){if(i.defined(h)||(h=new a),!i.defined(t))return h.x=0,h.y=0,h.width=0,h.height=0,h;const o=(n=i.defaultValue(n,r)).project(e.Rectangle.southwest(t,d)),c=n.project(e.Rectangle.northeast(t,u));return e.Cartesian2.subtract(c,o,c),h.x=o.x,h.y=o.y,h.width=c.x,h.height=c.y,h},a.clone=function(t,e){if(i.defined(t))return i.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new a(t.x,t.y,t.width,t.height)},a.union=function(t,e,n){i.defined(n)||(n=new a);const h=Math.min(t.x,e.x),r=Math.min(t.y,e.y),d=Math.max(t.x+t.width,e.x+e.width),u=Math.max(t.y+t.height,e.y+e.height);return n.x=h,n.y=r,n.width=d-h,n.height=u-r,n},a.expand=function(t,e,n){n=a.clone(t,n);const i=e.x-n.x,h=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),h>n.height?n.height=h:h<0&&(n.height-=h,n.y=e.y),n},a.intersect=function(t,e){const n=t.x,i=t.y,a=e.x,r=e.y;return n>a+e.width||n+t.width<a||i+t.height<r||i>r+e.height?h.Intersect.OUTSIDE:h.Intersect.INTERSECTING},a.equals=function(t,e){return t===e||i.defined(t)&&i.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},a.prototype.clone=function(t){return a.clone(this,t)},a.prototype.intersect=function(t){return a.intersect(this,t)},a.prototype.equals=function(t){return a.equals(this,t)},t.BoundingRectangle=a}));
