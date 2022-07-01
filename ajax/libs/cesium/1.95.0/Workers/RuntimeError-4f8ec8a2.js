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
define(["exports","./defaultValue-97284df2"],(function(t,e){"use strict";function n(t){let e;this.name="DeveloperError",this.message=t;try{throw new Error}catch(t){e=t.stack}this.stack=e}e.defined(Object.create)&&(n.prototype=Object.create(Error.prototype),n.prototype.constructor=n),n.prototype.toString=function(){let t=`${this.name}: ${this.message}`;return e.defined(this.stack)&&(t+=`\n${this.stack.toString()}`),t},n.throwInstantiationError=function(){throw new n("This function defines an interface and should not be called directly.")};const o={};function r(t,e,n){return`Expected ${n} to be typeof ${e}, actual typeof was ${t}`}function i(t){let e;this.name="RuntimeError",this.message=t;try{throw new Error}catch(t){e=t.stack}this.stack=e}o.typeOf={},o.defined=function(t,o){if(!e.defined(o))throw new n(function(t){return`${t} is required, actual value was undefined`}(t))},o.typeOf.func=function(t,e){if("function"!=typeof e)throw new n(r(typeof e,"function",t))},o.typeOf.string=function(t,e){if("string"!=typeof e)throw new n(r(typeof e,"string",t))},o.typeOf.number=function(t,e){if("number"!=typeof e)throw new n(r(typeof e,"number",t))},o.typeOf.number.lessThan=function(t,e,r){if(o.typeOf.number(t,e),e>=r)throw new n(`Expected ${t} to be less than ${r}, actual value was ${e}`)},o.typeOf.number.lessThanOrEquals=function(t,e,r){if(o.typeOf.number(t,e),e>r)throw new n(`Expected ${t} to be less than or equal to ${r}, actual value was ${e}`)},o.typeOf.number.greaterThan=function(t,e,r){if(o.typeOf.number(t,e),e<=r)throw new n(`Expected ${t} to be greater than ${r}, actual value was ${e}`)},o.typeOf.number.greaterThanOrEquals=function(t,e,r){if(o.typeOf.number(t,e),e<r)throw new n(`Expected ${t} to be greater than or equal to ${r}, actual value was ${e}`)},o.typeOf.object=function(t,e){if("object"!=typeof e)throw new n(r(typeof e,"object",t))},o.typeOf.bool=function(t,e){if("boolean"!=typeof e)throw new n(r(typeof e,"boolean",t))},o.typeOf.bigint=function(t,e){if("bigint"!=typeof e)throw new n(r(typeof e,"bigint",t))},o.typeOf.number.equals=function(t,e,r,i){if(o.typeOf.number(t,r),o.typeOf.number(e,i),r!==i)throw new n(`${t} must be equal to ${e}, the actual values are ${r} and ${i}`)},e.defined(Object.create)&&(i.prototype=Object.create(Error.prototype),i.prototype.constructor=i),i.prototype.toString=function(){let t=`${this.name}: ${this.message}`;return e.defined(this.stack)&&(t+=`\n${this.stack.toString()}`),t},t.Check=o,t.DeveloperError=n,t.RuntimeError=i}));
