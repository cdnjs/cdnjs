/*	
 * jQuery mmenu navbar add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(a){var n="mmenu",t="navbars";a[n].addons[t]={setup:function(){var r=this,s=this.opts[t],o=this.conf[t];if(i=a[n].glbl,"undefined"!=typeof s){s instanceof Array||(s=[s]);var d={},c={};s.length&&(a.each(s,function(i){var h=s[i];"boolean"==typeof h&&h&&(h={}),"object"!=typeof h&&(h={}),"undefined"==typeof h.content&&(h.content=["prev","title"]),h.content instanceof Array||(h.content=[h.content]),h=a.extend(!0,{},r.opts.navbar,h);var l=a('<div class="'+e.navbar+'" />'),f=h.height;"number"!=typeof f&&(f=1),f=Math.min(4,Math.max(1,f)),l.addClass(e.navbar+"-size-"+f);var v=h.position;"bottom"!=v&&(v="top"),d[v]||(d[v]=0),d[v]+=f,c[v]||(c[v]=a('<div class="'+e.navbars+"-"+v+'" />')),c[v].append(l);for(var b=0,p=0,u=h.content.length;p<u;p++){var m=a[n].addons[t][h.content[p]]||!1;m?b+=m.call(r,l,h,o):(m=h.content[p],m instanceof a||(m=a(h.content[p])),l.append(m))}b+=Math.ceil(l.children().not("."+e.btn).length/f),b>1&&l.addClass(e.navbar+"-content-"+b),l.children("."+e.btn).length&&l.addClass(e.hasbtns)}),this.bind("initMenu:after",function(){for(var a in d)this.$menu.addClass(e.hasnavbar+"-"+a+"-"+d[a]),this.$menu["bottom"==a?"append":"prepend"](c[a])}))}},add:function(){e=a[n]._c,r=a[n]._d,s=a[n]._e,e.add("navbars close hasbtns")},clickAnchor:function(a,n){}},a[n].configuration[t]={breadcrumbSeparator:"/"},a[n].configuration.classNames[t]={};var e,r,s,i}(jQuery),/*	
 * jQuery mmenu navbar add-on breadcrumbs content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="breadcrumbs";a[n].addons[t][e]=function(t,e,r){var s=this,i=a[n]._c,o=a[n]._d;i.add("breadcrumbs separator");var d=a('<span class="'+i.breadcrumbs+'" />').appendTo(t);return this.bind("initNavbar:after",function(n){n.removeClass(i.hasnavbar);for(var t=[],e=a('<span class="'+i.breadcrumbs+'"></span>'),s=n,d=!0;s&&s.length;){if(s.is("."+i.panel)||(s=s.closest("."+i.panel)),!s.hasClass(i.vertical)){var c=s.children("."+i.navbar).children("."+i.title).text();t.unshift(d?"<span>"+c+"</span>":'<a href="#'+s.attr("id")+'">'+c+"</a>"),d=!1}s=s.data(o.parent)}e.append(t.join('<span class="'+i.separator+'">'+r.breadcrumbSeparator+"</span>")).appendTo(n.children("."+i.navbar))}),this.bind("openPanel:start",function(a){d.html(a.children("."+i.navbar).children("."+i.breadcrumbs).html()||"")}),this.bind("initNavbar:after:sr-aria",function(n){n.children("."+i.navbar).children("."+i.breadcrumbs).children("a").each(function(){s.__sr_aria(a(this),"owns",a(this).attr("href").slice(1))})}),0}}(jQuery),/*	
 * jQuery mmenu navbar add-on close content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="close";a[n].addons[t][e]=function(t,e){var r=a[n]._c,s=(a[n].glbl,a('<a class="'+r.close+" "+r.btn+'" href="#" />').appendTo(t));return this.bind("setPage:after",function(a){s.attr("href","#"+a.attr("id"))}),this.bind("setPage:after:sr-text",function(t){s.html(this.__sr_text(a[n].i18n(this.conf.screenReader.text.closeMenu))),this.__sr_aria(s,"owns",s.attr("href").slice(1))}),-1}}(jQuery),/*
 * jQuery mmenu navbar add-on next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="next";a[n].addons[t][e]=function(e,r){var s,i,o,d=a[n]._c,c=a('<a class="'+d.next+" "+d.btn+'" href="#" />').appendTo(e);return this.bind("openPanel:start",function(a){s=a.find("."+this.conf.classNames[t].panelNext),i=s.attr("href"),o=s.html(),c[i?"attr":"removeAttr"]("href",i),c[i||o?"removeClass":"addClass"](d.hidden),c.html(o)}),this.bind("openPanel:start:sr-aria",function(a){this.__sr_aria(c,"hidden",c.hasClass(d.hidden)),this.__sr_aria(c,"owns",(c.attr("href")||"").slice(1))}),-1},a[n].configuration.classNames[t].panelNext="Next"}(jQuery),/*
 * jQuery mmenu navbar add-on prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="prev";a[n].addons[t][e]=function(e,r){var s=a[n]._c,i=a('<a class="'+s.prev+" "+s.btn+'" href="#" />').appendTo(e);this.bind("initNavbar:after",function(a){a.removeClass(s.hasnavbar)});var o,d,c;return this.bind("openPanel:start",function(a){a.hasClass(s.vertical)||(o=a.find("."+this.conf.classNames[t].panelPrev),o.length||(o=a.children("."+s.navbar).children("."+s.prev)),d=o.attr("href"),c=o.html(),i[d?"attr":"removeAttr"]("href",d),i[d||c?"removeClass":"addClass"](s.hidden),i.html(c))}),this.bind("initNavbar:after:sr-aria",function(a){var n=a.children("."+s.navbar);this.__sr_aria(n,"hidden",!0)}),this.bind("openPanel:start:sr-aria",function(a){this.__sr_aria(i,"hidden",i.hasClass(s.hidden)),this.__sr_aria(i,"owns",(i.attr("href")||"").slice(1))}),-1},a[n].configuration.classNames[t].panelPrev="Prev"}(jQuery),/*	
 * jQuery mmenu navbar add-on searchfield content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="searchfield";a[n].addons[t][e]=function(t,e){var r=a[n]._c,s=a('<div class="'+r.search+'" />').appendTo(t);return"object"!=typeof this.opts.searchfield&&(this.opts.searchfield={}),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=s,0}}(jQuery),/*	
 * jQuery mmenu navbar add-on title content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(a){var n="mmenu",t="navbars",e="title";a[n].addons[t][e]=function(e,r){var s,i,o,d=a[n]._c,c=a('<a class="'+d.title+'" />').appendTo(e);this.bind("openPanel:start",function(a){a.hasClass(d.vertical)||(o=a.find("."+this.conf.classNames[t].panelTitle),o.length||(o=a.children("."+d.navbar).children("."+d.title)),s=o.attr("href"),i=o.html()||r.title,c[s?"attr":"removeAttr"]("href",s),c[s||i?"removeClass":"addClass"](d.hidden),c.html(i))});var h;return this.bind("openPanel:start:sr-aria",function(a){if(this.opts.screenReader.text&&(h||(h=this.$menu.children("."+d.navbars+"-top, ."+d.navbars+"-bottom").children("."+d.navbar).children("."+d.prev)),h.length)){var n=!0;"parent"==this.opts.navbar.titleLink&&(n=!h.hasClass(d.hidden)),this.__sr_aria(c,"hidden",n)}}),0},a[n].configuration.classNames[t].panelTitle="Title"}(jQuery);