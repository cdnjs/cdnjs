/*
 ContextMenu - jQuery plugin for right-click context menus

 Author: Chris Domigan
 Contributors: Dan G. Switzer, II
 Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin

 Dual licensed under the MIT and GPL licenses:
   http://www.opensource.org/licenses/mit-license.php
   http://www.gnu.org/licenses/gpl.html

 Version: r2
 Date: 16 July 2007

 For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/

 Updated: include support jQuery UI CSS classes existing starting with version 1.8
          and the currents modified CSS classes of version jQuery UI 1.9
 by Oleg Kiriljuk, oleg.kiriljuk@ok-soft.gmbh.com
 Date: 24 December 2011

 Updated by Oleg Kiriljuk to support jQuery UI 1.10 and 1.11
 Date: 17 March 2015
*/
(function(b){"function"===typeof define&&define.amd?define(["jquery","./jqdnr","./jqmodal"],b):"object"===typeof exports?b(require("jquery")):b(jQuery)})(function(b){var e,k,h,g,q,l=null!=b.ui&&"string"===typeof b.ui.version?/^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(b.ui.version):[],n=null!=l&&4===l.length&&"1"===l[1]&&11>l[2],d={menuClasses:"ui-menu ui-widget ui-widget-content ui-corner-all",menuIconClasses:"ui-menu-icons ui-menu ui-widget ui-widget-content ui-corner-all",menuDivStyle:{position:"absolute",
zIndex:"500"},menuStyle:{width:"100%"},itemClasses:"ui-menu-item",itemStyle:{},itemHoverStyle:{},itemAnchorClasses:"ui-corner-all",itemAnchorStyle:{position:"relative",paddingRight:"0"},itemIconAnchorStyle:{paddingLeft:"2em"},itemIconSpanStyle:{left:".2em",top:".3em",marginRight:".5em",position:"absolute","float":"left"},itemHoverAnchorClasses:"ui-state-hover",eventPosX:"pageX",eventPosY:"pageY",shadow:!0,menuShadowClasses:"ui-widget-shadow",menuShadowStyle:{position:"absolute",zIndex:"499",margin:"0",
padding:"1px 0 0 6px"},onContextMenu:null,onShowMenu:null};b.fn.contextMenu=function(l,a){function p(){e.hide().attr("aria-hidden","true");k.hide().attr("aria-hidden","true")}function r(a,d,f){var c=g[a];h=b("#"+c.id).find("ul:first").clone(!0);e.html(h);c.onShowMenu&&(e=c.onShowMenu(f,e));c.menuClasses&&(c.menuIconClasses&&0<h.find(".ui-icon").length?h.addClass(c.menuIconClasses):h.addClass(c.menuClasses));b.isEmptyObject(c.menuStyle)||h.css(c.menuStyle);a=h.attr("role","menu").find("li");c.itemClasses&&
a.addClass(c.itemClasses).attr("role",n?"presentation":"menuitem");b.isEmptyObject(c.itemStyle)||a.css(c.itemStyle);c.itemAnchorClasses&&(n?a.children("a").addClass(c.itemAnchorClasses).filter(":not([role])").attr("role","menuitem"):a.addClass(c.itemAnchorClasses));b.isEmptyObject(c.itemAnchorStyle)||a.children("a").css(c.itemAnchorStyle);b.isEmptyObject(c.itemIconSpanStyle)||a.children("a").children("span.ui-icon").css(c.itemIconSpanStyle).parent("a").css(c.itemIconAnchorStyle);b.isEmptyObject(c.itemHoverStyle)?
a.hover(function(){(n?b(this).children("a"):b(this)).addClass(c.itemHoverAnchorClasses)},function(){(n?b(this).children("a"):b(this)).removeClass(c.itemHoverAnchorClasses)}):b.isEmptyObject(c.itemHoverStyle)||a.hover(function(){b(this).css(c.itemHoverStyle)},function(){b(this).css(c.itemStyle)});a.find("img").css({verticalAlign:"middle",paddingRight:"2px"});b.each(c.bindings,function(a,c){b("#"+a,e).bind("click",function(){p();c(d,q)})});e.css({left:f[c.eventPosX],top:f[c.eventPosY],"white-space":"pre"}).show().removeAttr("aria-hidden");
c.shadow&&k.css({width:e.width(),height:e.height(),left:f.pageX+2,top:f.pageY+2}).show().removeAttr("aria-hidden");f=e.offset();a=0;f.top+e.height()>b(window).scrollTop()+window.innerHeight&&(a=b(window).scrollTop()-f.top-e.height()+window.innerHeight,f.top+=a,e.offset(f),f=k.offset(),f.top+=a,k.offset(f));b(document).one("click",p)}g=g||[];g.push({id:l,menuDivStyle:b.extend({},d.menuDivStyle,a.menuDivStyle||{}),menuStyle:b.extend({},d.menuStyle,a.menuStyle||{}),menuShadowStyle:b.extend({},d.menuShadowStyle,
a.menuShadowStyle||{}),itemStyle:b.extend({},d.itemStyle,a.itemStyle||{}),itemHoverStyle:b.extend({},d.itemHoverStyle,a.itemHoverStyle||{}),menuClasses:a.menuClasses||d.menuClasses,menuIconClasses:a.menuIconClasses||d.menuIconClasses,menuShadowClasses:a.menuShadowClasses||d.menuShadowClasses,itemClasses:a.itemClasses||d.itemClasses,itemAnchorClasses:a.itemAnchorClasses||d.itemAnchorClasses,itemAnchorStyle:b.extend({},d.itemAnchorStyle,a.itemAnchorStyle||{}),itemIconSpanStyle:b.extend({},d.itemIconSpanStyle,
a.itemIconSpanStyle||{}),itemIconAnchorStyle:b.extend({},d.itemIconAnchorStyle,a.itemIconAnchorStyle||{}),itemHoverAnchorClasses:a.itemHoverAnchorClasses||d.itemHoverAnchorClasses,bindings:a.bindings||{},shadow:a.shadow||!1===a.shadow?a.shadow:d.shadow,onContextMenu:a.onContextMenu||d.onContextMenu,onShowMenu:a.onShowMenu||d.onShowMenu,eventPosX:a.eventPosX||d.eventPosX,eventPosY:a.eventPosY||d.eventPosY});var m=g.length-1;e||(e=b('<div class="jqContextMenu"></div>').hide().attr("aria-hidden","true").css(g[m].menuDivStyle).appendTo("body").bind("click",
function(a){a.stopPropagation()}).mouseleave(function(a){-1===a.pageX&&-1===a.pageY||p()}));k||(k=b("<div></div>").addClass(g[m].menuShadowClasses).css(g[m].menuShadowStyle).appendTo("body").hide().attr("aria-hidden","true"));b(this).bind("contextmenu",function(b){var d=g[m].onContextMenu?g[m].onContextMenu(b):!0;q=b.target;if(d)return r(m,this,b,a),!1;p();return!0});return this};b.contextMenu={defaults:function(e){b.each(e,function(a,e){"object"===typeof e&&d[a]?b.extend(d[a],e):d[a]=e})}};b(function(){b("div.contextMenu").hide().attr("aria-hidden",
"true")})});
//# sourceMappingURL=jquery.contextmenu-ui.min.map
