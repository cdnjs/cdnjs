/*
 * jQuery mmenu fixedElements add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(s){var t="mmenu",e="fixedElements";s[t].addons[e]={setup:function(){if(this.opts.offCanvas){var i=this.opts[e],n=this.conf[e];c=s[t].glbl,i=this.opts[e]=s.extend(!0,{},s[t].defaults[e],i);var o=function(t){var i=this.conf.classNames[e].fixed,o=t.find("."+i);this.__refactorClass(o,i,"slideout"),o[n.elemInsertMethod](n.elemInsertSelector);var a=this.conf.classNames[e].sticky,f=t.find("."+a);this.__refactorClass(f,a,"sticky"),f.length&&(this.bind("open:before",function(){var t=c.$wndw.scrollTop();f.each(function(){s(this).css("top",parseInt(s(this).css("top"),10)+t)})}),this.bind("close:finish",function(){f.css("top","")}))};this.bind("setPage:after",o)}},add:function(){i=s[t]._c,n=s[t]._d,o=s[t]._e,i.add("sticky")},clickAnchor:function(s,t){}},s[t].configuration[e]={elemInsertMethod:"appendTo",elemInsertSelector:"body"},s[t].configuration.classNames[e]={fixed:"Fixed",sticky:"Sticky"};var i,n,o,c}(jQuery);