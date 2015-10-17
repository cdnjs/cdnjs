/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(o){var t="mmenu",s="fixedElements";o[t].addons[s]={_init:function(){if(this.opts.offCanvas){var t=o("div, span, a",e.$page),d=this.__refactorClass(t,this.conf.classNames[s].fixedTop,"fixed-top"),i=this.__refactorClass(t,this.conf.classNames[s].fixedBottom,"fixed-bottom");d.add(i).appendTo(e.$body).addClass(a.slideout)}},_setup:function(){},_add:function(){a=o[t]._c,d=o[t]._d,i=o[t]._e,a.add("fixed-top fixed-bottom"),e=o[t].glbl}},o[t].defaults[s]={},o[t].configuration.classNames[s]={fixedTop:"FixedTop",fixedBottom:"FixedBottom"};var a,d,i,e}(jQuery);