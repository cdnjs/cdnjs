/*!
* Qoopido.js library v3.6.6, 2015-7-7
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(o){window.qoopido.register("support/capability/touch",o,["../../support"])}(function(o,t,c,u,n,i){"use strict";return o.support.addTest("/capability/touch",function(o){"ontouchstart"in n||n.DocumentTouch&&i instanceof DocumentTouch||u.maxTouchPoints>0||u.msMaxTouchPoints>0?o.resolve():o.reject()})});