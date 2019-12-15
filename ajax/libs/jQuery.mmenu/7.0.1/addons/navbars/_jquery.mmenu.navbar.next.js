/*
 * jQuery mmenu navbar add-on next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(a){var n="mmenu",t="navbars",e="next";a[n].addons[t][e]=function(e,s){var r,i,h,d=a[n]._c,o=a('<a class="'+d.btn+" "+d.btn+"_next "+d.navbar+'__btn" href="#" />').appendTo(e);this.bind("openPanel:start",function(a){r=a.find("."+this.conf.classNames[t].panelNext),i=r.attr("href"),h=r.html(),i?o.attr("href",i):o.removeAttr("href"),o[i||h?"removeClass":"addClass"](d.hidden),o.html(h)}),this.bind("openPanel:start:sr-aria",function(a){this.__sr_aria(o,"hidden",o.hasClass(d.hidden)),this.__sr_aria(o,"owns",(o.attr("href")||"").slice(1))})},a[n].configuration.classNames[t].panelNext="Next"}(jQuery);