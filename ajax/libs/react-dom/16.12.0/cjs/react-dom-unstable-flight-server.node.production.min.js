/** @license React v16.12.0
 * react-dom-unstable-flight-server.node.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var k=require("react-dom/server"),l="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103,m=JSON.stringify;function n(a,b){var d=[],c={destination:b,nextChunkId:0,pendingChunks:0,pingedSegments:d,completedJSONChunks:[],completedErrorChunks:[],flowing:!1,toJSON:function(b,a){return p(c,a)}};c.pendingChunks++;a=q(c,a);d.push(a);return c}
function r(a){var b=a.type,d=a.props;if("function"===typeof b)return b(d);if("string"===typeof b)return k.renderToStaticMarkup(a);throw Error("Unsupported type.");}function w(a,b){var d=a.pingedSegments;d.push(b);1===d.length&&setImmediate(function(){return x(a)})}function q(a,b){var d={id:a.nextChunkId++,model:b,ping:function(){return w(a,d)}};return d}
function p(a,b){if("string"===typeof b)return a="$"===b[0]?"$"+b:b,a;for(;"object"===typeof b&&null!==b&&b.$$typeof===l;){var d=b;try{b=r(d)}catch(c){if("object"===typeof c&&null!==c&&"function"===typeof c.then)return a.pendingChunks++,a=q(a,d),b=a.ping,c.then(b,b),"$"+a.id.toString(16);a.pendingChunks++;b=a.nextChunkId++;y(a,b,c);return"$"+b.toString(16)}}return b}
function y(a,b,d){var c="";try{if(d instanceof Error){var e=""+d.message;c=""+d.stack}else e="Error: "+d}catch(f){e="An error occurred but serializing the error message failed."}d={message:e,stack:c};b="E"+b.toString(16)+":"+m(d)+"\n";a.completedErrorChunks.push(Buffer.from(b,"utf8"))}
function x(a){var b=a.pingedSegments;a.pingedSegments=[];for(var d=0;d<b.length;d++){var c=void 0,e=a,f=b[d],g=f.model;try{for(;"object"===typeof g&&null!==g&&g.$$typeof===l;){var t=g;f.model=t;g=r(t)}var u=m(g,e.toJSON),v=f.id;c=0===v?u+"\n":"J"+v.toString(16)+":"+u+"\n";e.completedJSONChunks.push(Buffer.from(c,"utf8"))}catch(h){"object"===typeof h&&null!==h&&"function"===typeof h.then?(c=f.ping,h.then(c,c)):y(e,f.id,h)}}a.flowing&&z(a)}var A=!1;
function z(a){if(!A){A=!0;var b=a.destination;"function"===typeof b.cork&&b.cork();try{for(var d=a.completedJSONChunks,c=0;c<d.length;c++)if(a.pendingChunks--,!b.write(d[c])){a.flowing=!1;c++;break}d.splice(0,c);var e=a.completedErrorChunks;for(c=0;c<e.length;c++)if(a.pendingChunks--,!b.write(e[c])){a.flowing=!1;c++;break}e.splice(0,c)}finally{A=!1,"function"===typeof b.uncork&&b.uncork()}"function"===typeof b.flush&&"function"!==typeof b.flushHeaders&&b.flush();0===a.pendingChunks&&b.end()}}
function B(a){a.flowing=!0;setImmediate(function(){return x(a)})}function C(a,b){return function(){b.flowing=!0;z(b)}}var D={pipeToNodeWritable:function(a,b){a=n(a,b);b.on("drain",C(b,a));B(a)}},E={default:D},F=E&&D||E;module.exports=F.default||F;
