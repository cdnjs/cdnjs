/*!
 * Conditionizr v4.1.0
 * Detecting front-end environments and conditionally loading assets
 * https://github.com/conditionizr/conditionizr
 * Authors: @toddmotto and @markgdyr
 * Copyright 2013
 * MIT licensed
 */
window.conditionizr=function(a,b){"use strict";var c,d={},e=b.head||b.getElementsByTagName("head")[0],f=function(a,d,f){var g=f?a:c+a+("style"===d?".css":".js");switch(d){case"script":var h=b.createElement("script");h.src=g,e.appendChild(h);break;case"style":var i=b.createElement("link");i.href=g,i.rel="stylesheet",e.appendChild(i);break;case"class":b.documentElement.className+=" "+a}};return d.config=function(a){var b=a||{},e=b.tests;c=b.assets||"";for(var g in e){var h=g.toLowerCase();if(d[h])for(var i=e[g],j=i.length;j--;)f(h,i[j])}},d.add=function(a,b,c){d[a.toLowerCase()]=c();for(var e=b.length;e--;)f(a,b[e])},d.on=function(a,b){var c=/^\!/;(d[a.toLowerCase()]||c.test(a)&&!d[a.replace(c,"")])&&b()},d.load=d.polyfill=function(a,b){for(var c=/\.js$/.test(a)?"script":"style",e=b.length;e--;)d[b[e].toLowerCase()]&&f(a,c,!0)},d}(this,document);