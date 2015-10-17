/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(i){var s="mmenu",a="fixedElements";i[s].addons[a]={setup:function(){if(this.opts.offCanvas){this.opts[a],this.conf[a],t=i[s].glbl;var d=function(i){var s=this.conf.classNames[a].fixed;this.__refactorClass(i.find("."+s),s,"fixed").appendTo(t.$body).addClass(n.slideout)};d.call(this,t.$page),this.bind("setPage",d)}},add:function(){n=i[s]._c,d=i[s]._d,e=i[s]._e,n.add("fixed")},clickAnchor:function(){}},i[s].configuration.classNames[a]={fixed:"Fixed"};var n,d,e,t}(jQuery);