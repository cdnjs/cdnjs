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
define(["exports","./defaultValue-97284df2"],(function(e,t){"use strict";e.combine=function e(n,o,f){f=t.defaultValue(f,!1);const r={},i=t.defined(n),a=t.defined(o);let d,s,u;if(i)for(d in n)n.hasOwnProperty(d)&&(s=n[d],a&&f&&"object"==typeof s&&o.hasOwnProperty(d)?(u=o[d],r[d]="object"==typeof u?e(s,u,f):s):r[d]=s);if(a)for(d in o)o.hasOwnProperty(d)&&!r.hasOwnProperty(d)&&(u=o[d],r[d]=u);return r}}));
