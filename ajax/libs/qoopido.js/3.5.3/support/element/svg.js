/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/svg",e,["../../support"])}(function(e,t,r,n,o,s){"use strict";return e.support.addTest("/element/svg",function(e){s.createElementNS&&s.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect?e.resolve():e.reject()})});