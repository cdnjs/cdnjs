/*!
 * Knockout ES5 plugin - https://github.com/SteveSanderson/knockout-es5
 * Copyright (c) Steve Sanderson
 * MIT license
 */
!function(a,b){"use strict";
// Model tracking
// --------------
//
// This is the central feature of Knockout-ES5. We augment model objects by converting properties
// into ES5 getter/setter pairs that read/write an underlying Knockout observable. This means you can
// use plain JavaScript syntax to read/write the property while still getting the full benefits of
// Knockout's automatic dependency detection and notification triggering.
//
// For comparison, here's Knockout ES3-compatible syntax:
//
//     var firstNameLength = myModel.user().firstName().length; // Read
//     myModel.user().firstName('Bert'); // Write
//
// ... versus Knockout-ES5 syntax:
//
//     var firstNameLength = myModel.user.firstName.length; // Read
//     myModel.user.firstName = 'Bert'; // Write
// `ko.track(model)` converts each property on the given model object into a getter/setter pair that
// wraps a Knockout observable. Optionally specify an array of property names to wrap; otherwise we
// wrap all properties. If any of the properties are already observables, we replace them with
// ES5 getter/setter pairs that wrap your original observable instances. In the case of readonly
// ko.computed properties, we simply do not define a setter (so attempted writes will be ignored,
// which is how ES5 readonly properties normally behave).
//
// By design, this does *not* recursively walk child object properties, because making literally
// everything everywhere independently observable is usually unhelpful. When you do want to track
// child object properties independently, define your own class for those child objects and put
// a separate ko.track call into its constructor --- this gives you far more control.
/**
   * @param {object} obj
   * @param {object|array.<string>} propertyNamesOrSettings
   * @param {boolean} propertyNamesOrSettings.deep Use deep track.
   * @param {array.<string>} propertyNamesOrSettings.fields Array of property names to wrap.
   * todo: @param {array.<string>} propertyNamesOrSettings.exclude Array of exclude property names to wrap.
   * todo: @param {function(string, *):boolean} propertyNamesOrSettings.filter Function to filter property 
   *   names to wrap. A function that takes ... params
   * @return {object}
   */
function c(a,b){if(!a||"object"!=typeof a)throw new Error("When calling ko.track, you must pass an object as the first parameter.");var c;
// defaults
return i(b)?(b.deep=b.deep||!1,b.fields=b.fields||Object.getOwnPropertyNames(a),b.lazy=b.lazy||!1,h(a,b.fields,b)):(c=b||Object.getOwnPropertyNames(a),h(a,c,{})),a}function d(a){return a.name?a.name:(a.toString().trim().match(A)||[])[1]}function e(a){return a&&"object"==typeof a&&"Object"===d(a.constructor)}function f(a,c,d){var e=w.isObservable(a),f=!e&&Array.isArray(a),g=e?a:f?w.observableArray(a):w.observable(a);
// add check in case the object is already an observable array
return d[c]=function(){return g},(f||e&&"push"in g)&&m(w,g),{configurable:!0,enumerable:!0,get:g,set:w.isWriteableObservable(g)?g:b}}function g(a,b,c){function d(a,b){return e?b?e(a):e:Array.isArray(a)?(e=w.observableArray(a),m(w,e),e):e=w.observable(a)}if(w.isObservable(a))
// no need to be lazy if we already have an observable
return f(a,b,c);var e;return c[b]=function(){return d(a)},{configurable:!0,enumerable:!0,get:function(){return d(a)()},set:function(a){d(a,!0)}}}function h(a,b,c){if(b.length){var d=j(a,!0),i={};b.forEach(function(b){
// Skip properties that are already tracked
if(!(b in d)&&Object.getOwnPropertyDescriptor(a,b).configurable!==!1)
// Skip properties where descriptor can't be redefined
{var j=a[b];i[b]=(c.lazy?g:f)(j,b,d),c.deep&&e(j)&&h(j,Object.keys(j),c)}}),Object.defineProperties(a,i)}}function i(a){return!!a&&"object"==typeof a&&a.constructor===Object}
// Gets or creates the hidden internal key-value collection of observables corresponding to
// properties on the model object.
function j(a,b){x||(x=z());var c=x.get(a);return!c&&b&&(c={},x.set(a,c)),c}
// Removes the internal references to observables mapped to the specified properties
// or the entire object reference if no properties are passed in. This allows the
// observables to be replaced and tracked again.
function k(a,b){if(x)if(1===arguments.length)x["delete"](a);else{var c=j(a,!1);c&&b.forEach(function(a){delete c[a]})}}
// Computed properties
// -------------------
//
// The preceding code is already sufficient to upgrade ko.computed model properties to ES5
// getter/setter pairs (or in the case of readonly ko.computed properties, just a getter).
// These then behave like a regular property with a getter function, except they are smarter:
// your evaluator is only invoked when one of its dependencies changes. The result is cached
// and used for all evaluations until the next time a dependency changes).
//
// However, instead of forcing developers to declare a ko.computed property explicitly, it's
// nice to offer a utility function that declares a computed getter directly.
// Implements `ko.defineProperty`
function l(a,b,d){var e=this,f={owner:a,deferEvaluation:!0};if("function"==typeof d)f.read=d;else{if("value"in d)throw new Error('For ko.defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');if("function"!=typeof d.get)throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');f.read=d.get,f.write=d.set}return a[b]=e.computed(f),c.call(e,a,[b]),a}
// Array handling
// --------------
//
// Arrays are special, because unlike other property types, they have standard mutator functions
// (`push`/`pop`/`splice`/etc.) and it's desirable to trigger a change notification whenever one of
// those mutator functions is invoked.
//
// Traditionally, Knockout handles this by putting special versions of `push`/`pop`/etc. on observable
// arrays that mutate the underlying array and then trigger a notification. That approach doesn't
// work for Knockout-ES5 because properties now return the underlying arrays, so the mutator runs
// in the context of the underlying array, not any particular observable:
//
//     // Operates on the underlying array value
//     myModel.someCollection.push('New value');
//
// To solve this, Knockout-ES5 detects array values, and modifies them as follows:
//  1. Associates a hidden subscribable with each array instance that it encounters
//  2. Intercepts standard mutators (`push`/`pop`/etc.) and makes them trigger the subscribable
// Then, for model properties whose values are arrays, the property's underlying observable
// subscribes to the array subscribable, so it can trigger a change notification after mutation.
// Given an observable that underlies a model property, watch for any array value that might
// be assigned as the property value, and hook into its change events
function m(a,b){var c=null;a.computed(function(){
// Unsubscribe to any earlier array instance
c&&(c.dispose(),c=null);
// Subscribe to the new array instance
var d=b();d instanceof Array&&(c=n(a,b,d))})}
// Listens for array mutations, and when they happen, cause the observable to fire notifications.
// This is used to make model properties of type array fire notifications when the array changes.
// Returns a subscribable that can later be disposed.
function n(a,b,c){var d=o(a,c);return d.subscribe(b)}
// Gets or creates a subscribable that fires after each array mutation
function o(a,b){y||(y=z());var c=y.get(b);if(!c){c=new a.subscribable,y.set(b,c);var d={};p(b,c,d),q(a,b,c,d)}return c}
// After each array mutation, fires a notification on the given subscribable
function p(a,b,c){["pop","push","reverse","shift","sort","splice","unshift"].forEach(function(d){var e=a[d];a[d]=function(){var a=e.apply(this,arguments);return c.pause!==!0&&b.notifySubscribers(this),a}})}
// Adds Knockout's additional array mutation functions to the array
function q(a,b,c,d){["remove","removeAll","destroy","destroyAll","replace"].forEach(function(e){
// Make it a non-enumerable property for consistency with standard Array functions
Object.defineProperty(b,e,{enumerable:!1,value:function(){var f;
// These additional array mutators are built using the underlying push/pop/etc.
// mutators, which are wrapped to trigger notifications. But we don't want to
// trigger multiple notifications, so pause the push/pop/etc. wrappers and
// delivery only one notification at the end of the process.
d.pause=!0;try{
// Creates a temporary observableArray that can perform the operation.
f=a.observableArray.fn[e].apply(a.observableArray(b),arguments)}finally{d.pause=!1}return c.notifySubscribers(b),f}})})}
// Static utility functions
// ------------------------
//
// Since Knockout-ES5 sets up properties that return values, not observables, you can't
// trivially subscribe to the underlying observables (e.g., `someProperty.subscribe(...)`),
// or tell them that object values have mutated, etc. To handle this, we set up some
// extra utility functions that can return or work with the underlying observables.
// Returns the underlying observable associated with a model property (or `null` if the
// model or property doesn't exist, or isn't associated with an observable). This means
// you can subscribe to the property, e.g.:
//
//     ko.getObservable(model, 'propertyName')
//       .subscribe(function(newValue) { ... });
function r(a,b){if(!a||"object"!=typeof a)return null;var c=j(a,!1);return c&&b in c?c[b]():null}
// Returns a boolean indicating whether the property on the object has an underlying
// observables. This does the check in a way not to create an observable if the
// object was created with lazily created observables
function s(a,b){if(!a||"object"!=typeof a)return!1;var c=j(a,!1);return!!c&&b in c}
// Causes a property's associated observable to fire a change notification. Useful when
// the property value is a complex object and you've modified a child property.
function t(a,b){var c=r(a,b);c&&c.valueHasMutated()}
// Extends a Knockout instance with Knockout-ES5 functionality
function u(a){a.track=c,a.untrack=k,a.getObservable=r,a.valueHasMutated=t,a.defineProperty=l,
// todo: test it, maybe added it to ko. directly
a.es5={getAllObservablesForObject:j,notifyWhenPresentOrFutureArrayValuesMutate:m,isTracked:s}}
// Determines which module loading scenario we're in, grabs dependencies, and attaches to KO
function v(){if("object"==typeof exports&&"object"==typeof module){
// Node.js case - load KO and WeakMap modules synchronously
w=require("knockout");var b=require("../lib/weakmap");u(w),z=function(){return new b},module.exports=w}else"function"==typeof define&&define.amd?define(["knockout"],function(b){return w=b,u(b),z=function(){return new a.WeakMap},b}):"ko"in a&&(w=a.ko,u(a.ko),z=function(){return new a.WeakMap})}var w,x,y,z,A=/^function\s*([^\s(]+)/;v()}(this),/*! WeakMap shim
 * (The MIT License)
 *
 * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the 'Software'), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included with all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
// Updated and bugfixed by Raynos @ https://gist.github.com/1638059
// Expanded by Benvie @ https://github.com/Benvie/harmony-collections
// This is the version used by knockout-es5. Modified by Steve Sanderson as follows:
// [1] Deleted weakmap.min.js (it's not useful as it would be out of sync with weakmap.js now I'm editing it)
// [2] Since UglifyJS strips inline function names (and you can't disable that without disabling name mangling
//     entirely), insert code that re-adds function names
void function(a,b,c){function d(a,b,c){return"function"==typeof b&&(c=b,b=e(c).replace(/_$/,"")),j(a,b,{configurable:!0,writable:!0,value:c})}function e(a){return"function"!=typeof a?"":"_name"in a?a._name:"name"in a?a.name:k.call(a).match(n)[1]}function f(a,b){
// Undo the name-stripping that UglifyJS does
return b._name=a,b}function g(a){function b(b,e){return e||2===arguments.length?d.set(b,e):(e=d.get(b),e===c&&(e=a(b),d.set(b,e))),e}var d=new p;return a||(a=q),b}var h=Object.getOwnPropertyNames,i="object"==typeof window?Object.getOwnPropertyNames(window):[],j=Object.defineProperty,k=Function.prototype.toString,l=Object.create,m=Object.prototype.hasOwnProperty,n=/^\n?function\s?(\w*)?_?\(/,o=function(){function a(){var a=g(),c={};this.unlock=function(d){var e=n(d);if(m.call(e,a))return e[a](c);var f=l(null,b);return j(e,a,{value:function(a){return a===c?f:void 0}}),f}}var b={value:{writable:!0,value:c}},e=l(null),g=function(){var a=Math.random().toString(36).slice(2);return a in e?g():e[a]=a},k=g(),n=function(a){if(m.call(a,k))return a[k];if(!Object.isExtensible(a))throw new TypeError("Object must be extensible");var b=l(null);return j(a,k,{value:b}),b};
// common per-object storage area made visible by patching getOwnPropertyNames'
return d(Object,f("getOwnPropertyNames",function(a){
// gh-43
var b,c=Object(a);if("[object Window]"===c.toString())try{b=h(a)}catch(d){b=i}else b=h(a);return m.call(a,k)&&b.splice(b.indexOf(k),1),b})),d(a.prototype,f("get",function(a){return this.unlock(a).value})),d(a.prototype,f("set",function(a,b){this.unlock(a).value=b})),a}(),p=function(g){function h(b){return this===a||null==this||this===h.prototype?new h(b):(p(this,new o),void r(this,b))}function i(a){n(a);var d=q(this).get(a);return d===b?c:d}function j(a,d){n(a),
// store a token for explicit undefined so that "has" works correctly
q(this).set(a,d===c?b:d)}function k(a){return n(a),q(this).get(a)!==c}function l(a){n(a);var b=q(this),d=b.get(a)!==c;return b.set(a,c),d}function m(){return q(this),"[object WeakMap]"}var n=function(a){if(null==a||"object"!=typeof a&&"function"!=typeof a)throw new TypeError("Invalid WeakMap key")},p=function(a,b){var c=g.unlock(a);if(c.value)throw new TypeError("Object is already a WeakMap");c.value=b},q=function(a){var b=g.unlock(a).value;if(!b)throw new TypeError("WeakMap is not generic");return b},r=function(a,b){null!==b&&"object"==typeof b&&"function"==typeof b.forEach&&b.forEach(function(c,d){c instanceof Array&&2===c.length&&j.call(a,b[d][0],b[d][1])})};
// Undo the function-name stripping that UglifyJS does
i._name="get",j._name="set",k._name="has",m._name="toString";var s=(""+Object).split("Object"),t=f("toString",function(){return s[0]+e(this)+s[1]});d(t,t);var u={__proto__:[]}instanceof Array?function(a){a.__proto__=t}:function(a){d(a,t)};return u(h),[m,i,j,k,l].forEach(function(a){d(h.prototype,a),u(a)}),h}(new o),q=Object.create?function(){return Object.create(null)}:function(){return{}};"undefined"!=typeof module?module.exports=p:"undefined"!=typeof exports?exports.WeakMap=p:"WeakMap"in a||(a.WeakMap=p),p.createStorage=g,a.WeakMap&&(a.WeakMap.createStorage=g)}(function(){return this}());