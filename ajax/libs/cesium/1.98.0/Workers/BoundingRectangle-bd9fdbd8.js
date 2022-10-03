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
define(["exports","./Matrix2-7dfd434a","./defaultValue-50f7432c","./Transforms-f305a473"],(function(t,e,n,i){"use strict";function h(t,e,i,h){this.x=n.defaultValue(t,0),this.y=n.defaultValue(e,0),this.width=n.defaultValue(i,0),this.height=n.defaultValue(h,0)}h.packedLength=4,h.pack=function(t,e,i){return i=n.defaultValue(i,0),e[i++]=t.x,e[i++]=t.y,e[i++]=t.width,e[i]=t.height,e},h.unpack=function(t,e,i){return e=n.defaultValue(e,0),n.defined(i)||(i=new h),i.x=t[e++],i.y=t[e++],i.width=t[e++],i.height=t[e],i},h.fromPoints=function(t,e){if(n.defined(e)||(e=new h),!n.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;const i=t.length;let r=t[0].x,d=t[0].y,u=t[0].x,a=t[0].y;for(let e=1;e<i;e++){const n=t[e],i=n.x,h=n.y;r=Math.min(i,r),u=Math.max(i,u),d=Math.min(h,d),a=Math.max(h,a)}return e.x=r,e.y=d,e.width=u-r,e.height=a-d,e};const r=new i.GeographicProjection,d=new e.Cartographic,u=new e.Cartographic;h.fromRectangle=function(t,i,a){if(n.defined(a)||(a=new h),!n.defined(t))return a.x=0,a.y=0,a.width=0,a.height=0,a;const o=(i=n.defaultValue(i,r)).project(e.Rectangle.southwest(t,d)),c=i.project(e.Rectangle.northeast(t,u));return e.Cartesian2.subtract(c,o,c),a.x=o.x,a.y=o.y,a.width=c.x,a.height=c.y,a},h.clone=function(t,e){if(n.defined(t))return n.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new h(t.x,t.y,t.width,t.height)},h.union=function(t,e,i){n.defined(i)||(i=new h);const r=Math.min(t.x,e.x),d=Math.min(t.y,e.y),u=Math.max(t.x+t.width,e.x+e.width),a=Math.max(t.y+t.height,e.y+e.height);return i.x=r,i.y=d,i.width=u-r,i.height=a-d,i},h.expand=function(t,e,n){n=h.clone(t,n);const i=e.x-n.x,r=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),r>n.height?n.height=r:r<0&&(n.height-=r,n.y=e.y),n},h.intersect=function(t,e){const n=t.x,h=t.y,r=e.x,d=e.y;return n>r+e.width||n+t.width<r||h+t.height<d||h>d+e.height?i.Intersect.OUTSIDE:i.Intersect.INTERSECTING},h.equals=function(t,e){return t===e||n.defined(t)&&n.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},h.prototype.clone=function(t){return h.clone(this,t)},h.prototype.intersect=function(t){return h.intersect(this,t)},h.prototype.equals=function(t){return h.equals(this,t)},t.BoundingRectangle=h}));
