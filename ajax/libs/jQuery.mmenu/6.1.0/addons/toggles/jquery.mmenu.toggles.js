/*
 * jQuery mmenu toggles add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var e="mmenu",c="toggles";t[e].addons[c]={setup:function(){var s=this;this.opts[c],this.conf[c];a=t[e].glbl,this.bind("initListview:after",function(e){this.__refactorClass(e.find("input"),this.conf.classNames[c].toggle,"toggle"),this.__refactorClass(e.find("input"),this.conf.classNames[c].check,"check"),e.find("input."+i.toggle+", input."+i.check).each(function(){var e=t(this),c=e.closest("li"),n=e.hasClass(i.toggle)?"toggle":"check",a=e.attr("id")||s.__getUniqueId();c.children('label[for="'+a+'"]').length||(e.attr("id",a),c.prepend(e),t('<label for="'+a+'" class="'+i[n]+'"></label>').insertBefore(c.children("a, span").last()))})})},add:function(){i=t[e]._c,s=t[e]._d,n=t[e]._e,i.add("toggle check")},clickAnchor:function(t,e){}},t[e].configuration.classNames[c]={toggle:"Toggle",check:"Check"};var i,s,n,a}(jQuery);