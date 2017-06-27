/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
(function(a){a.fn.fitText=function(d,b){var e=d||1,c=a.extend({minFontSize:Number.NEGATIVE_INFINITY,maxFontSize:Number.POSITIVE_INFINITY},b);return this.each(function(){var f=a(this);var g=function(){f.css("font-size",Math.max(Math.min(f.width()/(e*10),parseFloat(c.maxFontSize)),parseFloat(c.minFontSize)))};g();a(window).on("resize.fittext orientationchange.fittext",g)})}})(jQuery);