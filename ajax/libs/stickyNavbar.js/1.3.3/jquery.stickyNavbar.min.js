/*
 * stickyNavbar.js v1.3.3
 * https://github.com/jbutko/stickyNavbar.js
 * Fancy sticky navigation jQuery plugin with smart anchor links highlighting
 *
 * Developed and maintenained under MIT licence by Jozef Butko - www.jozefbutko.com
 * http://www.opensource.org/licenses/MIT

 * Original jquery-browser code Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * CREDITS:
 * Daniel Eden for Animate.CSS:
 * http://daneden.github.io/animate.css/
 * jQuery easing plugin:
 * http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * COPYRIGHT (C) 2014-2016 Jozef Butko
 * https://github.com/jbutko
 * LAST UPDATE: 14/04/2016
 *
 */
!function(a,b,c){"use strict";a.fn.stickyNavbar=function(d){var e=a.extend({activeClass:"active",sectionSelector:"scrollto",animDuration:350,startAt:0,easing:"swing",animateCSS:!0,animateCSSRepeat:!1,cssAnimation:"fadeInDown",jqueryEffects:!1,jqueryAnim:"slideDown",selector:"a",mobile:!1,mobileWidth:480,zindex:9999,stickyModeClass:"sticky",unstickyModeClass:"unsticky"},d),f=a("."+e.sectionSelector);return f.attr("tabindex",-1),this.each(function(){var d=a(this),g=d.css("position"),h=d.css("zIndex"),i=d.outerHeight(!0),j=d.offset().top-i,k="auto"===d.css("top")?0:d.css("top"),l="a"===e.selector?d.find("li a"):d.find("li");d.find('li a[href*="#"]'),a(b).scrollTop();l.click(function(b){var g,h,j,k,l;if(g="li"===e.selector?a(this).children("a").attr("href"):a(this).attr("href"),"http"===g.substring(0,4)||"https"===g.substring(0,5)||"mailto:"===g.substring(0,7)||"/"===g.substring(0,1))return!0;for(b.preventDefault(),h=g.substr(1),l=f.length,k={},j=0;l>j;j++)k[f[j].id]=f[j].offsetTop;var m=d.hasClass(e.unstickyModeClass)?k[h]-2*i+2+"px":k[h]-i+2+"px";a("html, body").stop().animate({scrollTop:m},{duration:e.animDuration,easing:e.easing,complete:function(){c.getElementById(h).focus()}})});var o=function(){var m=a(b),n=m.scrollTop(),o=m.width(),p=m.height();if(!e.mobile&&o<e.mobileWidth)return void d.css("position",g);if(l.removeClass(e.activeClass),f.each(function(){var b=a(this).offset().top-i,c=a(this).outerHeight(!0)+b;n>=b&&c>=n&&("a"===e.selector?d.find('li a[href~="#'+this.id+'"]').addClass(e.activeClass):d.find('li a[href~="#'+this.id+'"]').parent().addClass(e.activeClass))}),n>=j+e.startAt?(d.removeClass(e.unstickyModeClass).addClass(" "+e.stickyModeClass),d.css({position:"fixed",zIndex:e.zindex}).stop(),e.jqueryEffects?(e.animateCSSRepeat||d.hide().stop()[e.jqueryAnim](e.animDuration,e.easing),d.hide().stop()[e.jqueryAnim](e.animDuration,e.easing)):e.animateCSS?e.animateCSSRepeat?d.addClass(e.cssAnimation+" animated").one("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd",function(a){d.removeClass(e.cssAnimation+" animated")}):d.addClass(e.cssAnimation+" animated").one("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd"):d.stop()):d.css({position:g,zIndex:h}).removeClass(e.stickyModeClass).addClass(" "+e.unstickyModeClass),"undefined"!=typeof q){var q=f.last(),r=q.offset().top+q.outerHeight(!0);m.scrollTop()+p>=a(c).height()&&r>=n&&l.removeClass(e.activeClass).last().addClass(e.activeClass),j-2>=n&&(d.removeClass(e.cssAnimation+" animated"),e.jqueryEffects?(0===n&&l.removeClass(e.activeClass),n>=j?d.css({position:"fixed",zIndex:e.zindex}).hide().stop()[e.jqueryAnim](e.animDuration,e.easing):d.css({position:g,zIndex:e.zindex})):(0===n&&l.removeClass(e.activeClass),d.css({position:g,top:k}).stop().animate({top:k},e.animDuration,e.easing)))}};a(b).scroll(o),a(b).ready(o),a(b).resize(o),a(b).load(o)})}}(jQuery,window,document);