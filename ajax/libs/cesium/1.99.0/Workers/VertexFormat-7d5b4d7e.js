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
define(["exports","./defaultValue-135942ca"],(function(e,t){"use strict";function n(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.position=t.defaultValue(e.position,!1),this.normal=t.defaultValue(e.normal,!1),this.st=t.defaultValue(e.st,!1),this.bitangent=t.defaultValue(e.bitangent,!1),this.tangent=t.defaultValue(e.tangent,!1),this.color=t.defaultValue(e.color,!1)}n.POSITION_ONLY=Object.freeze(new n({position:!0})),n.POSITION_AND_NORMAL=Object.freeze(new n({position:!0,normal:!0})),n.POSITION_NORMAL_AND_ST=Object.freeze(new n({position:!0,normal:!0,st:!0})),n.POSITION_AND_ST=Object.freeze(new n({position:!0,st:!0})),n.POSITION_AND_COLOR=Object.freeze(new n({position:!0,color:!0})),n.ALL=Object.freeze(new n({position:!0,normal:!0,st:!0,tangent:!0,bitangent:!0})),n.DEFAULT=n.POSITION_NORMAL_AND_ST,n.packedLength=6,n.pack=function(e,n,o){return o=t.defaultValue(o,0),n[o++]=e.position?1:0,n[o++]=e.normal?1:0,n[o++]=e.st?1:0,n[o++]=e.tangent?1:0,n[o++]=e.bitangent?1:0,n[o]=e.color?1:0,n},n.unpack=function(e,o,a){return o=t.defaultValue(o,0),t.defined(a)||(a=new n),a.position=1===e[o++],a.normal=1===e[o++],a.st=1===e[o++],a.tangent=1===e[o++],a.bitangent=1===e[o++],a.color=1===e[o],a},n.clone=function(e,o){if(t.defined(e))return t.defined(o)||(o=new n),o.position=e.position,o.normal=e.normal,o.st=e.st,o.tangent=e.tangent,o.bitangent=e.bitangent,o.color=e.color,o},e.VertexFormat=n}));
