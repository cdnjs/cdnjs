/*!
* Qoopido.js library v3.3.4, 2014-5-25
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var r=[];Object.defineProperty||r.push("./queryselectorall"),window.qoopido.register("polyfill/document/queryselector",e,r)}(function(e,r,t,l,o,u){"use strict";return u.querySelector?u.querySelector:u.querySelector=function(e){var r=u.querySelectorAll(e);return r.length?r[0]:null}});