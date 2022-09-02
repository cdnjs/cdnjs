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
define(["exports","./defaultValue-a6eb9f34","./ComponentDatatype-7f6d9570"],(function(e,n,t){"use strict";const d=t.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,t,i,f){if(!n.defined(e))return;i=n.defaultValue(i,!1);const u=n.defined(f),s=e.length;if(s<2)return e;let l,a,r,c=e[0],o=0,p=-1;for(l=1;l<s;++l)a=e[l],t(c,a,d)?(n.defined(r)||(r=e.slice(0,l),o=l-1,p=0),u&&f.push(l)):(n.defined(r)&&(r.push(a),o=l,u&&(p=f.length)),c=a);return i&&t(e[0],e[s-1],d)&&(u&&(n.defined(r)?f.splice(p,0,o):f.push(s-1)),n.defined(r)?r.length-=1:r=e.slice(0,-1)),n.defined(r)?r:e}}));
