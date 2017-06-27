/*
 ===         CoolQueue.io          ===
 \                                    \
  ===      Act fast, be cool        ===
 /                                    /
 ===   Socket.io offline failsafe  ===
 \                                    \
  ===      For the Gentlemen        ===
 /                                    /
 ===      CodeBuffet Original      ===
 \                                    \
  ===       www.codebuffet.co       ===
 /                                    /
 ===    Author: Peter Willemsen    ===

 Copyright (C) 2013 Peter Willemsen <peter@codebuffet.co>

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){function m(c,g){this.name=c;this.data=g}window.createCoolQueue=function(c){var g,f,d=null,k={},h=null,a={log:function(a){console.log("CoolQueue > "+a)},settings:{persistent:!0,queueKey:"my_queue",ignoreKeys:[]},connected:!1,queue:[]};if("undefined"!==typeof c)for(var b in c)a.settings[b]=c[b];g=function(d){a.queue.push(d);f();a.log("Pushing "+JSON.stringify(d))};f=function(){a.settings.persistent&&$.jStorage.set(a.settings.queueKey,a.queue)};c=a.settings.ignoreKeys.length;for(b=0;b<c;b++)k[a.settings.ignoreKeys[b]]=
1;a.queue=$.jStorage.get(a.settings.queueKey,[]);a.empty=function(){a.queue=[];$.jStorage.set(a.settings.queueKey,[])};a.sendQueue=function(){var c=a.queue.slice(0),b=c.length;if(0<b){for(var e=0;e<b;e++){var l=c[e];a.connected&&(a.log("Sending "+JSON.stringify(l.data)),h.apply(d,l.data),a.queue.splice(e,1))}f()}};a.spit=function(){null!=d&&(d.emit=h,d=null)};a.swallow=function(c){d=c;h=d.emit;d.emit=function(c){for(var e=[],b=arguments.length,f=0;f<b;f++)e.push(arguments[f]);b=arguments[0];if(a.connected)return h.apply(d,
e);"undefined"===typeof k[b]&&(e=new m(b,e),g(e))};d.on("connect",function(){a.connected=!0});d.on("disconnect",function(){a.connected=!1})};return a}})();
