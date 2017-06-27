/*	
 * jQuery mmenu navbar addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(n){var a="mmenu",t="navbars";n[a].addons[t]={setup:function(){var r=this,s=this.opts[t];if(this.conf[t],i=n[a].glbl,"undefined"!=typeof s){s instanceof Array||(s=[s]);var d={};n.each(s,function(i){var c=s[i];"boolean"==typeof c&&c&&(c={}),"object"!=typeof c&&(c={}),"undefined"==typeof c.content&&(c.content=["prev","title"]),c.content instanceof Array||(c.content=[c.content]),c=n.extend(!0,{},r.opts.navbar,c);var o=c.position;"bottom"!=o&&(o="top"),d[o]||(d[o]=0),d[o]++;for(var l=n("<div />").addClass(e.navbar).addClass(e.navbar+"-"+o).addClass(e.navbar+"-"+o+"-"+d[o]),h=0,f=c.content.length;f>h;h++){var v=n[a].addons[t][c.content[h]]||!1;v?v.call(r,l,c):(v=c.content[h],v instanceof n||(v=n(c.content[h])),v.each(function(){l.append(n(this))}))}var u=l.children().not("."+e.btn).length;u>1&&l.addClass(e.navbar+"-"+u),l.children("."+e.btn).length&&l.addClass(e.hasbtns),l.prependTo(r.$menu)});for(var c in d)r.$menu.addClass(e.hasnavbar+"-"+c+"-"+d[c])}},add:function(){e=n[a]._c,r=n[a]._d,s=n[a]._e,e.add("close hasbtns")},clickAnchor:function(){}},n[a].configuration.classNames[t]={panelTitle:"Title",panelNext:"Next",panelPrev:"Prev"};var e,r,s,i}(jQuery),/*	
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
function(n){var a="mmenu",t="navbars",e="next";n[a].addons[t][e]=function(e){var r=n[a]._c;e.append('<a class="'+r.next+" "+r.btn+'" href="#"></a>');var s=function(n){n=n||this.$menu.children("."+r.current);var a=e.find("."+r.next),s=n.find("."+this.conf.classNames[t].panelNext),i=s.attr("href"),d=s.html();a[i?"attr":"removeAttr"]("href",i),a[i||d?"removeClass":"addClass"](r.hidden),a.html(d)};this.bind("openPanel",s),this.bind("init",function(){s.call(this)})}}(jQuery),/*	
 * jQuery mmenu navbar addon prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(n){var a="mmenu",t="navbars",e="prev";n[a].addons[t][e]=function(e){var r=n[a]._c;e.append('<a class="'+r.prev+" "+r.btn+'" href="#"></a>'),this.bind("init",function(n){n.removeClass(r.hasnavbar)});var s=function(n){n=n||this.$menu.children("."+r.current);var a=e.find("."+r.prev),s=n.find("."+this.conf.classNames[t].panelPrev);s.length||(s=n.children("."+r.navbar).children("."+r.prev));var i=s.attr("href"),d=s.html();a[i?"attr":"removeAttr"]("href",i),a[i||d?"removeClass":"addClass"](r.hidden),a.html(d)};this.bind("openPanel",s),this.bind("init",function(){s.call(this)})}}(jQuery),/*	
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
function(n){var a="mmenu",t="navbars",e="title";n[a].addons[t][e]=function(e,r){var s=n[a]._c;e.append('<a class="'+s.title+'"></a>');var i=function(n){n=n||this.$menu.children("."+s.current);var a=e.find("."+s.title),i=n.find("."+this.conf.classNames[t].panelTitle);i.length||(i=n.children("."+s.navbar).children("."+s.title));var d=i.attr("href"),c=i.html()||r.title;a[d?"attr":"removeAttr"]("href",d),a[d||c?"removeClass":"addClass"](s.hidden),a.html(c)};this.bind("openPanel",i),this.bind("init",function(){i.call(this)})}}(jQuery);