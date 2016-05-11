/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
;(function(e){e.fn.collagePlus=function(t){function n(t,n,i,s){var o=i.padding*(t.length-1)+t.length*t[0][3],u=i.albumWidth-o,a=u/(n-o),f=o,l=n<i.albumWidth?true:false;for(var c=0;c<t.length;c++){var h=e(t[c][0]),p=Math.floor(t[c][1]*a),d=Math.floor(t[c][2]*a),v=!!(c<t.length-1);if(i.allowPartialLastRow===true&&l===true){p=t[c][1];d=t[c][2]}f+=p;if(!v&&f<i.albumWidth){if(i.allowPartialLastRow===true&&l===true){p=p}else{p=p+(i.albumWidth-f)}}p--;var m=h.is("img")?h:h.find("img");m.width(p);if(!h.is("img")){h.width(p+t[c][3])}m.height(d);if(!h.is("img")){h.height(d+t[c][4])}r(h,v,i);m.one("load",function(e){return function(){if(i.effect=="default"){e.animate({opacity:"1"},{duration:i.fadeSpeed})}else{if(i.direction=="vertical"){var t=s<=10?s:10}else{var t=c<=9?c+1:10}e.removeClass(function(e,t){return(t.match(/\beffect-\S+/g)||[]).join(" ")});e.addClass(i.effect);e.addClass("effect-duration-"+t)}}}(h)).each(function(){if(this.complete)e(this).trigger("load")})}}function r(e,t,n){var r={"margin-bottom":n.padding+"px","margin-right":t?n.padding+"px":"0px",display:n.display,"vertical-align":"bottom",overflow:"hidden"};return e.css(r)}function i(t){$img=e(t);var n=new Array;n["w"]=parseFloat($img.css("border-left-width"))+parseFloat($img.css("border-right-width"));n["h"]=parseFloat($img.css("border-top-width"))+parseFloat($img.css("border-bottom-width"));return n}return this.each(function(){var r=0,s=[],o=1,u=e(this);e.fn.collagePlus.defaults.albumWidth=u.width();e.fn.collagePlus.defaults.padding=parseFloat(u.css("padding-left"));e.fn.collagePlus.defaults.images=u.children();var a=e.extend({},e.fn.collagePlus.defaults,t);a.images.each(function(t){var u=e(this),f=u.is("img")?u:e(this).find("img");var l=typeof f.data("width")!="undefined"?f.data("width"):f.width(),c=typeof f.data("height")!="undefined"?f.data("height"):f.height();var h=i(f);f.data("width",l);f.data("height",c);var p=Math.ceil(l/c*a.targetHeight),d=Math.ceil(a.targetHeight);s.push([this,p,d,h["w"],h["h"]]);r+=p+h["w"]+a.padding;if(r>a.albumWidth&&s.length!=0){n(s,r-a.padding,a,o);delete r;delete s;r=0;s=[];o+=1}if(a.images.length-1==t&&s.length!=0){n(s,r,a,o);delete r;delete s;r=0;s=[];o+=1}})})};e.fn.collagePlus.defaults={targetHeight:400,fadeSpeed:"fast",display:"inline-block",effect:"default",direction:"vertical",allowPartialLastRow:false}})(jQuery);