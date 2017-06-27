/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.8
*
* Requires: jQuery 1.2.3 ~ 1.7.2
*/
;(function(a){a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';}var e={absolute:false,clone:false,includeMargin:undefined};var i=a.extend(e,l);var d=this;var g,j;if(i.clone===true){g=function(){var m={position:"absolute",top:-1000};d=d.filter(":first").clone().css(m).appendTo("body");};j=function(){d.remove();};}else{var f=[];var c,h;g=function(){c=d.parents().andSelf().filter(":hidden");h={visibility:"hidden",display:"block"};if(i.absolute===true){h.position="absolute";}c.each(function(){var m=a(this);f.push(m.attr("style"));m.css(h);});};j=function(){c.each(function(m){var o=a(this);var n=f[m];if(n===undefined){o.removeAttr("style");}else{o.attr("style",n);}});};}g();var k=/(outer)/g.test(b)?d[b](i.includeMargin):d[b]();j();return k;}});})(jQuery);