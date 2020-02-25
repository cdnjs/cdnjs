/** @license React v16.12.0
 * react-dom-unstable-flight-client.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var k={stream:!0};function l(b){var a={},c=n();p(a,"model",c);var d=new Map;d.set(0,c);var g={source:b,partialRow:"",modelRoot:a,chunks:d,fromJSON:function(b,a){a:{var c=g;if("string"===typeof a&&"$"===a[0])if("$"===a[1])b=a.substring(1);else{a=parseInt(a.substring(1),16);c=c.chunks;var f=c.get(a);if(!f)f=n(),c.set(a,f);else if(1===f.status){b=f.value;break a}p(this,b,f);b=void 0}else b=a}return b}};g.stringDecoder=new TextDecoder;return g}
function n(){var b=null;return{status:0,value:new Promise(function(a){return b=a}),resolve:b}}function q(b,a){if(0===b.status){var c=b.resolve;b.status=2;b.value=a;b.resolve=null;c()}}function r(b,a){b.chunks.forEach(function(b){q(b,a)})}function p(b,a,c){Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:function(){if(1===c.status)return c.value;throw c.value;}})}
function t(b,a,c){c=JSON.parse(c,b.fromJSON);var d=b.chunks;(b=d.get(a))?0===b.status&&(a=b.resolve,b.status=1,b.value=c,b.resolve=null,a()):d.set(a,{status:1,value:c,resolve:null})}
function u(b,a){if(""!==a)switch(a[0]){case "J":var c=a.indexOf(":",1),d=parseInt(a.substring(1,c),16);a=a.substring(c+1);t(b,d,a);break;case "E":c=a.indexOf(":",1);d=parseInt(a.substring(1,c),16);a=a.substring(c+1);c=JSON.parse(a);a=Error(c.message);a.stack=c.stack;b=b.chunks;(c=b.get(d))?q(c,a):b.set(d,{status:2,value:a,resolve:null});break;default:t(b,0,a)}}function v(b){r(b,Error("Connection closed."))}
function w(b,a){function c(a){var f=a.value;if(a.done)v(b);else{a=f;f=b.stringDecoder;for(var e=a.indexOf(10);-1<e;){var h=b.partialRow;var m=a.subarray(0,e);m=f.decode(m);u(b,h+m);b.partialRow="";a=a.subarray(e+1);e=a.indexOf(10)}b.partialRow+=f.decode(a,k);return g.read().then(c,d)}}function d(a){r(b,a)}var g=a.getReader();g.read().then(c,d)}
var x={readFromXHR:function(b){function a(){for(var a=b.responseText,c=d,e=g,h=a.indexOf("\n",e);-1<h;)e=c.partialRow+a.substring(e,h),u(c,e),c.partialRow="",e=h+1,h=a.indexOf("\n",e);c.partialRow+=a.substring(e);g=a.length}function c(){r(d,new TypeError("Network error"))}var d=l(b),g=0;b.addEventListener("progress",a);b.addEventListener("load",function(b){a(b);v(d)});b.addEventListener("error",c);b.addEventListener("abort",c);b.addEventListener("timeout",c);return d.modelRoot},readFromFetch:function(b){var a=
l(b);b.then(function(b){w(a,b.body)},function(b){r(a,b)});return a.modelRoot},readFromReadableStream:function(b){var a=l(b);w(a,b);return a.modelRoot}},y={default:x},z=y&&x||y;module.exports=z.default||z;
