/*	
 * jQuery mmenu navbar addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(n){var a="mmenu",e="navbars";n[a].addons[e]={setup:function(){var r=this,s=this.opts[e],c=this.conf[e];if(i=n[a].glbl,"undefined"!=typeof s){s instanceof Array||(s=[s]);var l={};n.each(s,function(i){var o=s[i];"boolean"==typeof o&&o&&(o={}),"object"!=typeof o&&(o={}),"undefined"==typeof o.content&&(o.content=["prev","title"]),o.content instanceof Array||(o.content=[o.content]),o=n.extend(!0,{},r.opts.navbar,o);var d=o.position,h=o.height;"number"!=typeof h&&(h=1),h=Math.min(4,Math.max(1,h)),"bottom"!=d&&(d="top"),l[d]||(l[d]=0),l[d]++;var f=n("<div />").addClass(t.navbar+" "+t.navbar+"-"+d+" "+t.navbar+"-"+d+"-"+l[d]+" "+t.navbar+"-size-"+h);l[d]+=h-1;for(var u=0,v=0,p=o.content.length;p>v;v++){var b=n[a].addons[e][o.content[v]]||!1;b?u+=b.call(r,f,o,c):(b=o.content[v],b instanceof n||(b=n(o.content[v])),f.append(b))}u+=Math.ceil(f.children().not("."+t.btn).length/h),u>1&&f.addClass(t.navbar+"-content-"+u),f.children("."+t.btn).length&&f.addClass(t.hasbtns),f.prependTo(r.$menu)});for(var o in l)r.$menu.addClass(t.hasnavbar+"-"+o+"-"+l[o])}},add:function(){t=n[a]._c,r=n[a]._d,s=n[a]._e,t.add("close hasbtns")},clickAnchor:function(n,a){}},n[a].configuration[e]={breadcrumbSeparator:"/"},n[a].configuration.classNames[e]={};var t,r,s,i}(jQuery),/*	
 * jQuery mmenu navbar addon breadcrumbs content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="breadcrumbs";n[a].addons[e][t]=function(e,t,r){var s=n[a]._c,i=n[a]._d;s.add("breadcrumbs separator");var c=n('<span class="'+s.breadcrumbs+'" />').appendTo(e);this.bind("initPanels",function(a){a.removeClass(s.hasnavbar).each(function(){for(var a=[],e=n(this),t=n('<span class="'+s.breadcrumbs+'"></span>'),c=n(this).children().first(),l=!0;c&&c.length;){c.is("."+s.panel)||(c=c.closest("."+s.panel));var o=c.children("."+s.navbar).children("."+s.title).text();a.unshift(l?"<span>"+o+"</span>":'<a href="#'+c.attr("id")+'">'+o+"</a>"),l=!1,c=c.data(i.parent)}t.append(a.join('<span class="'+s.separator+'">'+r.breadcrumbSeparator+"</span>")).appendTo(e.children("."+s.navbar))})});var l=function(){c.html(this.$pnls.children("."+s.current).children("."+s.navbar).children("."+s.breadcrumbs).html())};return this.bind("openPanel",l),this.bind("initPanels",l),0}}(jQuery),/*	
 * jQuery mmenu navbar addon close content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="close";n[a].addons[e][t]=function(e,t){var r=n[a]._c,s=n[a].glbl,i=n('<a class="'+r.close+" "+r.btn+'" href="#" />').appendTo(e),c=function(n){i.attr("href","#"+n.attr("id"))};return c.call(this,s.$page),this.bind("setPage",c),-1}}(jQuery),/*	
 * jQuery mmenu navbar addon next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="next";n[a].addons[e][t]=function(t,r){var s,i,c=n[a]._c,l=n('<a class="'+c.next+" "+c.btn+'" href="#" />').appendTo(t),o=function(n){n=n||this.$pnls.children("."+c.current);var a=n.find("."+this.conf.classNames[e].panelNext);s=a.attr("href"),i=a.html(),l[s?"attr":"removeAttr"]("href",s),l[s||i?"removeClass":"addClass"](c.hidden),l.html(i)};return this.bind("openPanel",o),this.bind("initPanels",function(){o.call(this)}),-1},n[a].configuration.classNames[e].panelNext="Next"}(jQuery),/*	
 * jQuery mmenu navbar addon prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="prev";n[a].addons[e][t]=function(t,r){var s=n[a]._c,i=n('<a class="'+s.prev+" "+s.btn+'" href="#" />').appendTo(t);this.bind("initPanels",function(n){n.removeClass(s.hasnavbar).children("."+s.navbar).addClass(s.hidden)});var c,l,o=function(n){if(n=n||this.$pnls.children("."+s.current),!n.hasClass(s.vertical)){var a=n.find("."+this.conf.classNames[e].panelPrev);a.length||(a=n.children("."+s.navbar).children("."+s.prev)),c=a.attr("href"),l=a.html(),i[c?"attr":"removeAttr"]("href",c),i[c||l?"removeClass":"addClass"](s.hidden),i.html(l)}};return this.bind("openPanel",o),this.bind("initPanels",function(){o.call(this)}),-1},n[a].configuration.classNames[e].panelPrev="Prev"}(jQuery),/*	
 * jQuery mmenu navbar addon searchfield content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="searchfield";n[a].addons[e][t]=function(e,t){var r=n[a]._c,s=n('<div class="'+r.search+'" />').appendTo(e);return"object"!=typeof this.opts.searchfield&&(this.opts.searchfield={}),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=s,0}}(jQuery),/*	
 * jQuery mmenu navbar addon title content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",e="navbars",t="title";n[a].addons[e][t]=function(t,r){var s,i,c=n[a]._c,l=n('<a class="'+c.title+'" />').appendTo(t),o=function(n){if(n=n||this.$pnls.children("."+c.current),!n.hasClass(c.vertical)){var a=n.find("."+this.conf.classNames[e].panelTitle);a.length||(a=n.children("."+c.navbar).children("."+c.title)),s=a.attr("href"),i=a.html()||r.title,l[s?"attr":"removeAttr"]("href",s),l[s||i?"removeClass":"addClass"](c.hidden),l.html(i)}};return this.bind("openPanel",o),this.bind("initPanels",function(n){o.call(this)}),0},n[a].configuration.classNames[e].panelTitle="Title"}(jQuery);