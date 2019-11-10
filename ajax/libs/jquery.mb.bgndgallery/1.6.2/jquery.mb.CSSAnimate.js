/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 16/01/13 22.42
 *  *****************************************************************************
 */

/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);
$.fn.CSSAnimate = function(opt, duration, delay, ease, callback) {
  return this.each(function() {

    var el = $(this);

    if (el.length === 0 || !opt) {return;}

    if (typeof duration == "function") {callback = duration; duration = $.fx.speeds["_default"];}
    if (typeof delay == "function") {callback = delay; delay=0}
    if (typeof ease == "function") {callback = ease; ease = "cubic-bezier(0.65,0.03,0.36,0.72)";}


    if(typeof duration == "string"){
      for(var d in $.fx.speeds){
        if(duration==d){
          duration= $.fx.speeds[d];
          break;
        }else{
          duration=null;
        }
      }
    }

    //http://cssglue.com/cubic
    //  ease  |  linear | ease-in | ease-out | ease-in-out  |  cubic-bezier(<number>, <number>,  <number>,  <number>)

    if (!jQuery.support.transition) {

      for(var o in opt){
        if (o==="transform"){
          delete opt[o];
        }
      }

      for(var o in opt){
        if (opt[o]==="auto"){
          delete opt[o];
        }
      }
      if(!callback || typeof callback==="string")
        callback ="linear";

      el.animate(opt, duration, callback);
      return;
    }

    var sfx = "";
    var transitionEnd = "transitionEnd";
    if ($.browser.webkit) {
      sfx = "-webkit-";
      transitionEnd = "webkitTransitionEnd";
    } else if ($.browser.mozilla) {
      sfx = "-moz-";
      transitionEnd = "transitionend";
    } else if ($.browser.opera) {
      sfx = "-o-";
      transitionEnd = "oTransitionEnd";
    } else if ($.browser.msie) {
      sfx = "-ms-";
      transitionEnd = "msTransitionEnd";
    }

	  var prop = [];
    for(var o in opt){
	    var key = o;
      if (key==="transform"){
	      key = sfx+"transform";
        opt[key]=opt[o];
        delete opt[o];
      }
      if (key==="transform-origin"){
	      key = sfx+"transform-origin";
        opt[key]=opt[o];
        delete opt[o];
      }
	    prop.push(key);
    }
	  var properties = prop.join(",");

    el.css(sfx + "transition-property", properties);
    el.css(sfx + "transition-duration", duration + "ms");
    el.css(sfx + "transition-delay", delay + "ms");
    el.css(sfx + "transition-timing-function", ease);
    el.css(sfx + "backface-visibility","hidden");

    setTimeout(function() {
      el.css(opt);
    }, 10);

    var endTransition = function(e) {
      $(this).off(transitionEnd);
      $(this).css(sfx + "transition", "");
      e.stopPropagation();
      if (typeof callback == "function") callback();
      return false;
    };
    $(this).on(transitionEnd, endTransition);
  })
};

$.fn.CSSAnimateStop=function(){
  var sfx = "";
	var transitionEnd = "transitionEnd";
	if ($.browser.webkit) {
		sfx = "-webkit-";
		transitionEnd = "webkitTransitionEnd";
	} else if ($.browser.mozilla) {
		sfx = "-moz-";
		transitionEnd = "transitionend";
	} else if ($.browser.opera) {
		sfx = "-o-";
		transitionEnd = "oTransitionEnd";
	} else if ($.browser.msie) {
		sfx = "-ms-";
		transitionEnd = "msTransitionEnd";
	}

	$(this).css(sfx + "transition", "");
	$(this).off(transitionEnd);
}

// jQuery.support.transition
// to verify that CSS3 transition is supported (or any of its browser-specific implementations)
$.support.transition = (function() {
  var thisBody = document.body || document.documentElement;
  var thisStyle = thisBody.style;
  return thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
})();
