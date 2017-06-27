/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(){function u(t){o=1;while(t=e.shift())t()}var e=[],t,n=!1,r=document,i="DOMContentLoaded",s="onreadystatechange",o=/^loaded|^c/.test(r.readyState);return r.addEventListener(i,t=function(){r.removeEventListener(i,t,n),u()},n),function(t){o?t():e.push(t)}})