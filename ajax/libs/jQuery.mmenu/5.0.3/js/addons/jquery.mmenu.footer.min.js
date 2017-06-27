/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
!function(t){var e="mmenu",o="footer";t[e].addons[o]={setup:function(){var i=this.opts[o];if(this.conf[o],a=t[e].glbl,"boolean"==typeof i&&(i={add:i,update:i}),"object"!=typeof i&&(i={}),i=this.opts[o]=t.extend(!0,{},t[e].defaults[o],i),i.add){var s=i.content?i.content:i.title;t('<div class="'+n.footer+'" />').appendTo(this.$menu).append(s),this.$menu.addClass(n.hasfooter)}if(this.$footer=this.$menu.children("."+n.footer),i.update&&this.$footer&&this.$footer.length){var d=function(e){e=e||this.$menu.children("."+n.current);var s=t("."+this.conf.classNames[o].panelFooter,e).html()||i.title;this.$footer[s?"removeClass":"addClass"](n.hidden),this.$footer.html(s)};this.bind("openPanel",d),this.bind("init",function(){d.call(this,this.$menu.children("."+n.current))})}},add:function(){n=t[e]._c,i=t[e]._d,s=t[e]._e,n.add("footer hasfooter")},clickAnchor:function(){}},t[e].defaults[o]={add:!1,content:!1,title:"",update:!1},t[e].configuration.classNames[o]={panelFooter:"Footer"};var n,i,s,a}(jQuery);