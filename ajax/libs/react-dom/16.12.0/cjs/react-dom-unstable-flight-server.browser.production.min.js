/** @license React v16.12.0
 * react-dom-unstable-flight-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var k=require("react-dom/server"),l=new TextEncoder,m="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103,n=JSON.stringify;function p(a,b){var c=[],d={destination:b,nextChunkId:0,pendingChunks:0,pingedSegments:c,completedJSONChunks:[],completedErrorChunks:[],flowing:!1,toJSON:function(a,b){return q(d,b)}};d.pendingChunks++;a=r(d,a);c.push(a);return d}
function t(a){var b=a.type,c=a.props;if("function"===typeof b)return b(c);if("string"===typeof b)return k.renderToStaticMarkup(a);throw Error("Unsupported type.");}function r(a,b){var c={id:a.nextChunkId++,model:b,ping:function(){var b=a.pingedSegments;b.push(c);1===b.length&&x(a)}};return c}
function q(a,b){if("string"===typeof b)return a="$"===b[0]?"$"+b:b,a;for(;"object"===typeof b&&null!==b&&b.$$typeof===m;){var c=b;try{b=t(c)}catch(d){if("object"===typeof d&&null!==d&&"function"===typeof d.then)return a.pendingChunks++,a=r(a,c),b=a.ping,d.then(b,b),"$"+a.id.toString(16);a.pendingChunks++;b=a.nextChunkId++;y(a,b,d);return"$"+b.toString(16)}}return b}
function y(a,b,c){var d="";try{if(c instanceof Error){var e=""+c.message;d=""+c.stack}else e="Error: "+c}catch(f){e="An error occurred but serializing the error message failed."}c={message:e,stack:d};b="E"+b.toString(16)+":"+n(c)+"\n";a.completedErrorChunks.push(l.encode(b))}
function x(a){var b=a.pingedSegments;a.pingedSegments=[];for(var c=0;c<b.length;c++){var d=void 0,e=a,f=b[c],g=f.model;try{for(;"object"===typeof g&&null!==g&&g.$$typeof===m;){var u=g;f.model=u;g=t(u)}var v=n(g,e.toJSON),w=f.id;d=0===w?v+"\n":"J"+w.toString(16)+":"+v+"\n";e.completedJSONChunks.push(l.encode(d))}catch(h){"object"===typeof h&&null!==h&&"function"===typeof h.then?(d=f.ping,h.then(d,d)):y(e,f.id,h)}}a.flowing&&z(a)}var A=!1;
function z(a){if(!A){A=!0;var b=a.destination;try{for(var c=a.completedJSONChunks,d=0;d<c.length;d++){a.pendingChunks--;var e=b;e.enqueue(c[d]);if(!(0<e.desiredSize)){a.flowing=!1;d++;break}}c.splice(0,d);var f=a.completedErrorChunks;for(d=0;d<f.length;d++)if(a.pendingChunks--,c=b,c.enqueue(f[d]),!(0<c.desiredSize)){a.flowing=!1;d++;break}f.splice(0,d)}finally{A=!1}0===a.pendingChunks&&b.close()}}
var B={renderToReadableStream:function(a){var b;return new ReadableStream({start:function(c){c=b=p(a,c);c.flowing=!0;x(c)},pull:function(){var a=b;a.flowing=!0;z(a)},cancel:function(){}})}},C={default:B},D=C&&B||C;module.exports=D.default||D;
