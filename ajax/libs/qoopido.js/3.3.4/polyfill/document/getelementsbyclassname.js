/*!
* Qoopido.js library v3.3.4, 2014-5-25
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=[];Object.defineProperty||t.push("./queryselectorall"),window.qoopido.register("polyfill/document/getelementsbyclassname",e,t)}(function(e,t,n,r,l,s){"use strict";if(s.getElementsByClassName)return s.getElementsByClassName;var a=new RegExp("^|\\s+","g");return s.getElementsByClassName=function(e){return e=String(e).replace(a,"."),s.querySelectorAll(e)}});