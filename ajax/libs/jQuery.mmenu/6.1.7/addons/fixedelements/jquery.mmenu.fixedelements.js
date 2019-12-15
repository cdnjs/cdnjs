/*
 * jQuery mmenu fixedElements add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(s){var t="mmenu",e="fixedElements";s[t].addons[e]={setup:function(){if(this.opts.offCanvas){var n=this.opts[e],o=this.conf[e];c=s[t].glbl,n=this.opts[e]=s.extend(!0,{},s[t].defaults[e],n);var a=function(t){var n=this.conf.classNames[e].fixed,a=t.find("."+n);this.__refactorClass(a,n,"slideout"),a[o.elemInsertMethod](o.elemInsertSelector);var f=this.conf.classNames[e].sticky,d=t.find("."+f);this.__refactorClass(d,f,"sticky"),d=t.find("."+i.sticky),d.length&&(this.bind("open:before",function(){var t=c.$wndw.scrollTop();d.each(function(){s(this).css("top",parseInt(s(this).css("top"),10)+t)})}),this.bind("close:finish",function(){d.css("top","")}))};this.bind("setPage:after",a)}},add:function(){i=s[t]._c,n=s[t]._d,o=s[t]._e,i.add("sticky")},clickAnchor:function(s,t){}},s[t].configuration[e]={elemInsertMethod:"appendTo",elemInsertSelector:"body"},s[t].configuration.classNames[e]={fixed:"Fixed",sticky:"Sticky"};var i,n,o,c}(jQuery);