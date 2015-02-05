/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=[];Object.defineProperty||t.push("./queryselectorall"),window.qoopido.register("polyfill/document/getelementsbyclassname",e,t)}(function(e,t,l,n,s,r){"use strict";if(!r.getElementsByClassName){var a=new RegExp("^|\\s+","g");r.getElementsByClassName=function(e){return e=String(e).replace(a,"."),r.querySelectorAll(e)}}return r.getElementsByClassName});