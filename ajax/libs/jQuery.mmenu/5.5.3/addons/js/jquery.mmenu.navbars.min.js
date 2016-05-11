/*	
 * jQuery mmenu navbar addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(n){var a="mmenu",t="navbars";n[a].addons[t]={setup:function(){var r=this,s=this.opts[t],c=this.conf[t];if(i=n[a].glbl,"undefined"!=typeof s){s instanceof Array||(s=[s]);var d={};n.each(s,function(i){var o=s[i];"boolean"==typeof o&&o&&(o={}),"object"!=typeof o&&(o={}),"undefined"==typeof o.content&&(o.content=["prev","title"]),o.content instanceof Array||(o.content=[o.content]),o=n.extend(!0,{},r.opts.navbar,o);var l=o.position,h=o.height;"number"!=typeof h&&(h=1),h=Math.min(4,Math.max(1,h)),"bottom"!=l&&(l="top"),d[l]||(d[l]=0),d[l]++;var f=n("<div />").addClass(e.navbar+" "+e.navbar+"-"+l+" "+e.navbar+"-"+l+"-"+d[l]+" "+e.navbar+"-size-"+h);d[l]+=h-1;for(var v=0,p=o.content.length;p>v;v++){var u=n[a].addons[t][o.content[v]]||!1;u?u.call(r,f,o,c):(u=o.content[v],u instanceof n||(u=n(o.content[v])),u.each(function(){f.append(n(this))}))}var b=Math.ceil(f.children().not("."+e.btn).length/h);b>1&&f.addClass(e.navbar+"-content-"+b),f.children("."+e.btn).length&&f.addClass(e.hasbtns),f.prependTo(r.$menu)});for(var o in d)r.$menu.addClass(e.hasnavbar+"-"+o+"-"+d[o])}},add:function(){e=n[a]._c,r=n[a]._d,s=n[a]._e,e.add("close hasbtns")},clickAnchor:function(){}},n[a].configuration[t]={breadcrumbSeparator:"/"},n[a].configuration.classNames[t]={panelTitle:"Title",panelNext:"Next",panelPrev:"Prev"};var e,r,s,i}(jQuery),/*	
 * jQuery mmenu navbar addon breadcrumbs content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="breadcrumbs";n[a].addons[t][e]=function(t,e,r){var s=n[a]._c,i=n[a]._d;s.add("breadcrumbs separator"),t.append('<span class="'+s.breadcrumbs+'"></span>'),this.bind("init",function(a){a.removeClass(s.hasnavbar).each(function(){for(var a=[],t=n(this),e=n('<span class="'+s.breadcrumbs+'"></span>'),c=n(this).children().first(),d=!0;c&&c.length;){c.is("."+s.panel)||(c=c.closest("."+s.panel));var o=c.children("."+s.navbar).children("."+s.title).text();a.unshift(d?"<span>"+o+"</span>":'<a href="#'+c.attr("id")+'">'+o+"</a>"),d=!1,c=c.data(i.parent)}e.append(a.join('<span class="'+s.separator+'">'+r.breadcrumbSeparator+"</span>")).appendTo(t.children("."+s.navbar))})});var c=function(){var n=this.$pnls.children("."+s.current),a=t.find("."+s.breadcrumbs),e=n.children("."+s.navbar).children("."+s.breadcrumbs);a.html(e.html())};this.bind("openPanel",c),this.bind("init",c)}}(jQuery),/*	
 * jQuery mmenu navbar addon close content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="close";n[a].addons[t][e]=function(t){var e=n[a]._c,r=n[a].glbl;t.append('<a class="'+e.close+" "+e.btn+'" href="#"></a>');var s=function(n){t.find("."+e.close).attr("href","#"+n.attr("id"))};s.call(this,r.$page),this.bind("setPage",s)}}(jQuery),/*	
 * jQuery mmenu navbar addon next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="next";n[a].addons[t][e]=function(e){var r=n[a]._c;e.append('<a class="'+r.next+" "+r.btn+'" href="#"></a>');var s=function(n){n=n||this.$pnls.children("."+r.current);var a=e.find("."+r.next),s=n.find("."+this.conf.classNames[t].panelNext),i=s.attr("href"),c=s.html();a[i?"attr":"removeAttr"]("href",i),a[i||c?"removeClass":"addClass"](r.hidden),a.html(c)};this.bind("openPanel",s),this.bind("init",function(){s.call(this)})}}(jQuery),/*	
 * jQuery mmenu navbar addon prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="prev";n[a].addons[t][e]=function(e){var r=n[a]._c;e.append('<a class="'+r.prev+" "+r.btn+'" href="#"></a>'),this.bind("init",function(n){n.removeClass(r.hasnavbar)});var s=function(){var n=this.$pnls.children("."+r.current),a=e.find("."+r.prev),s=n.find("."+this.conf.classNames[t].panelPrev);s.length||(s=n.children("."+r.navbar).children("."+r.prev));var i=s.attr("href"),c=s.html();a[i?"attr":"removeAttr"]("href",i),a[i||c?"removeClass":"addClass"](r.hidden),a.html(c)};this.bind("openPanel",s),this.bind("init",s)}}(jQuery),/*	
 * jQuery mmenu navbar addon searchfield content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="searchfield";n[a].addons[t][e]=function(t){var e=n[a]._c,r=n('<div class="'+e.search+'" />').appendTo(t);"object"!=typeof this.opts.searchfield&&(this.opts.searchfield={}),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=r}}(jQuery),/*	
 * jQuery mmenu navbar addon title content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="title";n[a].addons[t][e]=function(e,r){var s=n[a]._c;e.append('<a class="'+s.title+'"></a>');var i=function(n){n=n||this.$pnls.children("."+s.current);var a=e.find("."+s.title),i=n.find("."+this.conf.classNames[t].panelTitle);i.length||(i=n.children("."+s.navbar).children("."+s.title));var c=i.attr("href"),d=i.html()||r.title;a[c?"attr":"removeAttr"]("href",c),a[c||d?"removeClass":"addClass"](s.hidden),a.html(d)};this.bind("openPanel",i),this.bind("init",function(){i.call(this)})}}(jQuery);