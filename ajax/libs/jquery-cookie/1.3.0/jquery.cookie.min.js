/*!
 * jQuery Cookie Plugin v1.3.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(g,b,h){var a=/\+/g;function e(i){return i}function c(i){return f(decodeURIComponent(i.replace(a," ")))}function f(i){if(i.indexOf('"')===0){i=i.slice(1,-1).replace('\\"','"').replace("\\\\","\\")}return i}var d=g.cookie=function(r,q,w){if(q!==h){w=g.extend({},d.defaults,w);if(q===null){w.expires=-1}if(typeof w.expires==="number"){var s=w.expires,v=w.expires=new Date();v.setDate(v.getDate()+s)}q=d.json?JSON.stringify(q):String(q);return(b.cookie=[encodeURIComponent(r),"=",d.raw?q:encodeURIComponent(q),w.expires?"; expires="+w.expires.toUTCString():"",w.path?"; path="+w.path:"",w.domain?"; domain="+w.domain:"",w.secure?"; secure":""].join(""))}var j=d.raw?e:c;var u=b.cookie.split("; ");var x=r?null:{};for(var p=0,n=u.length;p<n;p++){var o=u[p].split("=");var k=j(o.shift());var m=j(o.join("="));if(d.json){m=JSON.parse(m)}if(r&&r===k){x=m;break}if(!r){x[k]=m}}return x};d.defaults={};g.removeCookie=function(j,i){if(g.cookie(j)!==null){g.cookie(j,null,i);return true}return false}})(jQuery,document);