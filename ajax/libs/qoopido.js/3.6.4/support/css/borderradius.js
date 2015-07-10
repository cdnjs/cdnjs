/*!
* Qoopido.js library v3.6.4, 2015-4-29
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(r){window.qoopido.register("support/css/borderradius",r,["../../support"])}(function(r){"use strict";return r.support.addTest("/css/borderradius",function(s){r.support.supportsCssProperty("border-radius")?s.resolve(r.support.getCssProperty("border-radius")):s.reject()})});