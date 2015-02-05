/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){function o(o){return"boolean"==typeof o&&(o={add:o,update:o}),"object"!=typeof o&&(o={}),o=t.extend(!0,{},t[a].defaults[s],o)}function n(t){return t}function e(){h=!0,i=t[a]._c,d=t[a]._d,r=t[a]._e,i.add("footer hasfooter"),f=t[a].glbl}var a="mmenu",s="footer";t[a].prototype["_init_"+s]=function(a){h||e();var d=this.vars[s+"_added"];this.vars[s+"_added"]=!0,d||(this.opts[s]=o(this.opts[s]),this.conf[s]=n(this.conf[s]));var f=this,u=this.opts[s];if(this.conf[s],!d&&u.add){var c=u.content?u.content:u.title;t('<div class="'+i.footer+'" />').appendTo(this.$menu).append(c)}var p=t("div."+i.footer,this.$menu);p.length&&(this.$menu.addClass(i.hasfooter),u.update&&a.each(function(){var o=t(this),n=t("."+f.conf.classNames[s].panelFooter,o),e=n.html();e||(e=u.title);var a=function(){p[e?"show":"hide"](),p.html(e)};o.on(r.open,a),o.hasClass(i.current)&&a()}),"function"==typeof this._init_buttonbars&&this._init_buttonbars(p))},t[a].addons.push(s),t[a].defaults[s]={add:!1,content:!1,title:"",update:!1},t[a].configuration.classNames[s]={panelFooter:"Footer"};var i,d,r,f,h=!1}(jQuery);