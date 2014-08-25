/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(e,b,f){var a=/\+/g;function d(g){return g}function c(g){return decodeURIComponent(g.replace(a," "))}e.cookie=function(l,k,p){if(k!==f&&!/Object/.test(Object.prototype.toString.call(k))){p=e.extend({},e.cookie.defaults,p);if(k===null){p.expires=-1}if(typeof p.expires==="number"){var m=p.expires,o=p.expires=new Date();o.setDate(o.getDate()+m)}k=String(k);return(b.cookie=[encodeURIComponent(l),"=",p.raw?k:encodeURIComponent(k),p.expires?"; expires="+p.expires.toUTCString():"",p.path?"; path="+p.path:"",p.domain?"; domain="+p.domain:"",p.secure?"; secure":""].join(""))}p=k||e.cookie.defaults||{};var g=p.raw?d:c;var n=b.cookie.split("; ");for(var j=0,h;(h=n[j]&&n[j].split("="));j++){if(g(h.shift())===l){return g(h.join("="))}}return null};e.cookie.defaults={};e.removeCookie=function(h,g){if(e.cookie(h,g)!==null){e.cookie(h,null,g);return true}return false}})(jQuery,document);