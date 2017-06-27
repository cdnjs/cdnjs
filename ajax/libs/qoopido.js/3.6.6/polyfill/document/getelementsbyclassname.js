/*!
* Qoopido.js library v3.6.6, 2015-7-7
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=[];Object.defineProperty||t.push("./queryselectorall"),window.qoopido.register("polyfill/document/getelementsbyclassname",e,t)}(function(e,t,l,n,s,r){"use strict";if(!r.getElementsByClassName){var a=new RegExp("^|\\s+","g");r.getElementsByClassName=function(e){return e=String(e).replace(a,"."),r.querySelectorAll(e)}}return r.getElementsByClassName});