/*!
 *
 * jQuery collagePlus Plugin v0.2.0
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
;(function(e){e.fn.collagePlus=function(t){function r(t,n,r){var s=r.padding*(t.length-1)+t.length*t[0][3],o=r.albumWidth-s,u=o/(n-s),a=s;for(var f=0;f<t.length;f++){var l=e(t[f][0]),c=Math.floor(t[f][1]*u),h=Math.floor(t[f][2]*u),p=!!(f<t.length-1);a+=c;if(!p&&a<r.albumWidth){c=c+(r.albumWidth-a)}if(l.is("img")){l.width(c)}else{l.width(c+t[f][3]);l.find("img").width(c)}if(l.is("img")){l.height(h)}else{l.height(h+t[f][4]);l.find("img").height(h)}i(l,p,r);l.animate({opacity:"1"},{duration:r.fadeSpeed})}}function i(e,t,n){var r={"margin-bottom":n.padding+"px","margin-right":t?n.padding+"px":"0px",display:n.display,"vertical-align":"bottom",overflow:"hidden"};return e.css(r)}function s(t){$img=e(t);var n=new Array;n["w"]=parseFloat($img.css("border-left-width"))+parseFloat($img.css("border-right-width"));n["h"]=parseFloat($img.css("border-top-width"))+parseFloat($img.css("border-bottom-width"));return n}var n=e.extend({targetHeight:400,albumWidth:this.width(),padding:parseFloat(this.css("padding-left")),images:this.children(),fadeSpeed:"fast",display:"inline-block"},t);return this.each(function(){var t=0,i=[];n.images.each(function(o){var u=e(this),a=u.is("img")?u:e(this).find("img");var f=typeof a.data("width")!="undefined"?a.data("width"):a.width(),l=typeof a.data("height")!="undefined"?a.data("height"):a.height();var c=s(a);a.data("width",f);a.data("height",l);var h=Math.ceil(f/l*n.targetHeight),p=Math.ceil(n.targetHeight);i.push([this,h,p,c["w"],c["h"]]);t+=h+c["w"]+n.padding;if(t>n.albumWidth&&i.length!=0){r(i,t-n.padding,n);delete t;delete i;t=0;i=[]}if(n.images.length-1==o&&i.length!=0){r(i,t,n);delete t;delete i;t=0;i=[]}})})}})(jQuery);