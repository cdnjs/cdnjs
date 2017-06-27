/*!
 *
 * jQuery collageCaption Plugin v0.1.1
 * extra for collagePlus plugin
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
;(function(e){e.fn.collageCaption=function(t){var n={images:e(this).children(),background:"black",opacity:"0.5",speed:100,cssClass:"Caption"};var r=e.extend({},n,t);return this.each(function(){var t=0,n=[];r.images.each(function(t){var n=e(this);if(typeof n.data("caption")=="undefined"){return}var i='<div class="'+r.cssClass+'" style="position:relative;"><div class="Caption_Background" style="background-color:'+r.background+";opacity:"+r.opacity+';position:relative;top:0;"></div><div class="Caption_Content" style="position:relative;">'+n.data("caption")+"</div></div>";n.append(i);var s=n.find("."+r.cssClass),o=n.find(".Caption_Background"),u=n.find(".Caption_Content");var a=s.height();o.height(a);u.css("top","-"+a+"px");n.bind({mouseenter:function(e){s.animate({top:-1*a},{duration:r.speed,queue:false})},mouseleave:function(e){s.animate({top:0},{duration:r.speed,queue:false})}})});return this})}})(jQuery);