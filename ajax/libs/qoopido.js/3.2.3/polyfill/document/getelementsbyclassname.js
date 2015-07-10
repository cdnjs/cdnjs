/*!
* Qoopido.js library v3.2.3, 2014-0-13
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=[];Object.defineProperty||t.push("./queryselectorall"),window.qoopido.register("polyfill/document/getelementsbyclassname",e,t)}(function(e,t,l,n,r,s){"use strict";if(!s.getElementsByClassName){var o=new RegExp("^|\\s+","g");s.getElementsByClassName=function(e){return e=String(e).replace(o,"."),s.querySelectorAll(e)}}});