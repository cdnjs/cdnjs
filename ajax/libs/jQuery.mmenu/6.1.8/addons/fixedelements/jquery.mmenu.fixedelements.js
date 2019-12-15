/*
 * jQuery mmenu fixedElements add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(s){var t="mmenu",e="fixedElements";s[t].addons[e]={setup:function(){if(this.opts.offCanvas){var n=(this.opts[e],this.conf[e]);c=s[t].glbl;var o=function(t){var o=this.conf.classNames[e].fixed,f=t.find("."+o);this.__refactorClass(f,o,"slideout"),f[n.elemInsertMethod](n.elemInsertSelector);var a=this.conf.classNames[e].sticky,r=t.find("."+a);this.__refactorClass(r,a,"sticky"),r=t.find("."+i.sticky),r.length&&(this.bind("open:before",function(){var t=c.$wndw.scrollTop()+n.sticky.offset;r.each(function(){s(this).css("top",parseInt(s(this).css("top"),10)+t)})}),this.bind("close:finish",function(){r.css("top","")}))};this.bind("setPage:after",o)}},add:function(){i=s[t]._c,n=s[t]._d,o=s[t]._e,i.add("sticky")},clickAnchor:function(s,t){}},s[t].configuration[e]={sticky:{offset:0},elemInsertMethod:"appendTo",elemInsertSelector:"body"},s[t].configuration.classNames[e]={fixed:"Fixed",sticky:"Sticky"};var i,n,o,c}(jQuery);