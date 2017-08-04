/*
 * jQuery mmenu backButton add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(o){var t="mmenu",n="backButton";o[t].addons[n]={setup:function(){if(this.opts.offCanvas){var s=this,e=this.opts[n];this.conf[n];if(a=o[t].glbl,"boolean"==typeof e&&(e={close:e}),"object"!=typeof e&&(e={}),e=o.extend(!0,{},o[t].defaults[n],e),e.close){var c="#"+s.$menu.attr("id");this.bind("open:finish",function(o){location.hash!=c&&history.pushState(null,document.title,c)}),o(window).on("popstate",function(o){a.$html.hasClass(i.opened)?(o.stopPropagation(),s.close()):location.hash==c&&(o.stopPropagation(),s.open())})}}},add:function(){return window.history&&window.history.pushState?(i=o[t]._c,s=o[t]._d,void(e=o[t]._e)):void(o[t].addons[n].setup=function(){})},clickAnchor:function(o,t){}},o[t].defaults[n]={close:!1};var i,s,e,a}(jQuery);