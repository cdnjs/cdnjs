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
define(["exports","./Matrix2-73789715","./RuntimeError-4f8ec8a2","./defaultValue-97284df2"],(function(e,n,o,i){"use strict";function t(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}t.encode=function(e,n){let o;return i.defined(n)||(n={high:0,low:0}),e>=0?(o=65536*Math.floor(e/65536),n.high=o,n.low=e-o):(o=65536*Math.floor(-e/65536),n.high=-o,n.low=e+o),n};const h={high:0,low:0};t.fromCartesian=function(e,n){i.defined(n)||(n=new t);const o=n.high,r=n.low;return t.encode(e.x,h),o.x=h.high,r.x=h.low,t.encode(e.y,h),o.y=h.high,r.y=h.low,t.encode(e.z,h),o.z=h.high,r.z=h.low,n};const r=new t;t.writeElements=function(e,n,o){t.fromCartesian(e,r);const i=r.high,h=r.low;n[o]=i.x,n[o+1]=i.y,n[o+2]=i.z,n[o+3]=h.x,n[o+4]=h.y,n[o+5]=h.z},e.EncodedCartesian3=t}));
