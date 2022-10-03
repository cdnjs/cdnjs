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
define(["exports","./Matrix2-7dfd434a","./defaultValue-50f7432c"],(function(e,n,o){"use strict";function i(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}i.encode=function(e,n){let i;return o.defined(n)||(n={high:0,low:0}),e>=0?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};const t={high:0,low:0};i.fromCartesian=function(e,n){o.defined(n)||(n=new i);const h=n.high,a=n.low;return i.encode(e.x,t),h.x=t.high,a.x=t.low,i.encode(e.y,t),h.y=t.high,a.y=t.low,i.encode(e.z,t),h.z=t.high,a.z=t.low,n};const h=new i;i.writeElements=function(e,n,o){i.fromCartesian(e,h);const t=h.high,a=h.low;n[o]=t.x,n[o+1]=t.y,n[o+2]=t.z,n[o+3]=a.x,n[o+4]=a.y,n[o+5]=a.z},e.EncodedCartesian3=i}));
