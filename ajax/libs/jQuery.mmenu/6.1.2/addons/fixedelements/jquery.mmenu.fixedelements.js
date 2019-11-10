/*
 * jQuery mmenu fixedElements add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(e){var t="mmenu",n="fixedElements";e[t].addons[n]={setup:function(){if(this.opts.offCanvas){var s=this.opts[n],i=this.conf[n];a=e[t].glbl,s=this.opts[n]=e.extend(!0,{},e[t].defaults[n],s);var o=function(e){var t=this.conf.classNames[n].fixed;this.__refactorClass(e.find("."+t),t,"slideout")[i.elemInsertMethod](i.elemInsertSelector)};this.bind("setPage:after",o)}},add:function(){s=e[t]._c,i=e[t]._d,o=e[t]._e,s.add("fixed")},clickAnchor:function(e,t){}},e[t].configuration[n]={elemInsertMethod:"appendTo",elemInsertSelector:"body"},e[t].configuration.classNames[n]={fixed:"Fixed"};var s,i,o,a}(jQuery);