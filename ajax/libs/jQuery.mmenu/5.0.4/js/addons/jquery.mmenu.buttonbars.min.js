/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var n="mmenu",i="buttonbars";t[n].addons[i]={setup:function(){this.opts[i],this.conf[i],s=t[n].glbl,this.bind("init",function(n){this.__refactorClass(t("div",n),this.conf.classNames[i].buttonbar,"buttonbar"),t("."+a.buttonbar,n).each(function(){var n=t(this),i=n.children().not("input"),o=n.children().filter("input");n.addClass(a.buttonbar+"-"+i.length),o.each(function(){var n=t(this),a=i.filter('label[for="'+n.attr("id")+'"]');a.length&&n.insertBefore(a)})})})},add:function(){a=t[n]._c,o=t[n]._d,r=t[n]._e,a.add("buttonbar")},clickAnchor:function(){}},t[n].configuration.classNames[i]={buttonbar:"Buttonbar"};var a,o,r,s}(jQuery);