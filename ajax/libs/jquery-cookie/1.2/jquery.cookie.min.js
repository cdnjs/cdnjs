/*!
 * jQuery Cookie Plugin v1.2
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a,b,c){function e(a){return a}function f(a){return decodeURIComponent(a.replace(d," "))}var d=/\+/g;a.cookie=function(d,g,h){if(g!==c&&!/Object/.test(Object.prototype.toString.call(g))){if(h=a.extend({},a.cookie.defaults,h),null===g&&(h.expires=-1),"number"==typeof h.expires){var i=h.expires,j=h.expires=new Date;j.setDate(j.getDate()+i)}return g+="",b.cookie=[encodeURIComponent(d),"=",h.raw?g:encodeURIComponent(g),h.expires?"; expires="+h.expires.toUTCString():"",h.path?"; path="+h.path:"",h.domain?"; domain="+h.domain:"",h.secure?"; secure":""].join("")}h=g||a.cookie.defaults||{};for(var n,k=h.raw?e:f,l=b.cookie.split("; "),m=0;n=l[m]&&l[m].split("=");m++)if(k(n.shift())===d)return k(n.join("="));return null},a.cookie.defaults={},a.removeCookie=function(b,c){return null!==a.cookie(b,c)?(a.cookie(b,null,c),!0):!1}})(jQuery,document);