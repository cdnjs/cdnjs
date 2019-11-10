/*	
 * jQuery mmenu RTL add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var e="mmenu",n="rtl";t[e].addons[n]={setup:function(){var o=this.opts[n];this.conf[n];d=t[e].glbl,"object"!=typeof o&&(o={use:o}),o=this.opts[n]=t.extend(!0,{},t[e].defaults[n],o),"boolean"!=typeof o.use&&(o.use="rtl"==(d.$html.attr("dir")||"").toLowerCase()),o.use&&this.bind("initMenu:after",function(){this.$menu.addClass(s.rtl)})},add:function(){s=t[e]._c,o=t[e]._d,u=t[e]._e,s.add("rtl")},clickAnchor:function(t,e){}},t[e].defaults[n]={use:"detect"};var s,o,u,d}(jQuery);