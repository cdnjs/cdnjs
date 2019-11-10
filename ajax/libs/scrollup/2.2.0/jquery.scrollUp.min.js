/*

 scrollup v2.2.0
 Author: Mark Goodyear - http://markgoodyear.com
 Git: https://github.com/markgoodyear/scrollup

 Copyright 2014 Mark Goodyear.
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php

 Twitter: @markgdyr

 */
!function(a,b,c){a.fn.scrollUp=function(b){a.data(c.body,"scrollUp")||(a.data(c.body,"scrollUp",!0),a.fn.scrollUp.init(b))},a.fn.scrollUp.init=function(d){var e,f=a.fn.scrollUp.settings=a.extend({},a.fn.scrollUp.defaults,d),g=f.scrollTitle?f.scrollTitle:f.scrollText;e=f.scrollTrigger?a(f.scrollTrigger):a("<a/>",{id:f.scrollName,href:"#top",title:g}),e.appendTo("body"),f.scrollImg||f.scrollTrigger||e.html(f.scrollText),e.css({display:"none",position:"fixed",zIndex:f.zIndex}),f.activeOverlay&&a("<div/>",{id:f.scrollName+"-active"}).css({position:"absolute",top:f.scrollDistance+"px",width:"100%",borderTop:"1px dotted"+f.activeOverlay,zIndex:f.zIndex}).appendTo("body"),scrollEvent=a(b).scroll(function(){switch(scrollDis="top"===f.scrollFrom?f.scrollDistance:a(c).height()-a(b).height()-f.scrollDistance,f.animation){case"fade":a(a(b).scrollTop()>scrollDis?e.fadeIn(f.animationInSpeed):e.fadeOut(f.animationOutSpeed));break;case"slide":a(a(b).scrollTop()>scrollDis?e.slideDown(f.animationInSpeed):e.slideUp(f.animationOutSpeed));break;default:a(a(b).scrollTop()>scrollDis?e.show(0):e.hide(0))}}),e.click(function(b){b.preventDefault(),a("html, body").animate({scrollTop:0},f.scrollSpeed,f.easingType)})},a.fn.scrollUp.defaults={scrollName:"scrollUp",scrollDistance:300,scrollFrom:"top",scrollSpeed:300,easingType:"linear",animation:"fade",animationInSpeed:200,animationOutSpeed:200,scrollTrigger:!1,scrollText:"Scroll to top",scrollTitle:!1,scrollImg:!1,activeOverlay:!1,zIndex:2147483647},a.fn.scrollUp.destroy=function(d){a.removeData(c.body,"scrollUp"),a("#"+a.fn.scrollUp.settings.scrollName).remove(),a("#"+a.fn.scrollUp.settings.scrollName+"-active").remove(),a.fn.jquery.split(".")[1]>=7?a(b).off("scroll",d):a(b).unbind("scroll",d)},a.scrollUp=a.fn.scrollUp}(jQuery,window,document);