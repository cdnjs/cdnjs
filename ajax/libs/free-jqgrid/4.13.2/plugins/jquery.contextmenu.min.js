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

*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","./jqdnr","./jqmodal"],a):"object"===typeof exports?a(require("jquery")):a(jQuery)})(function(a){function n(e,b,c){var d=g[e];h=a("#"+d.id).find("ul:first").clone(!0);h.css(d.menuStyle).find("li").css(d.itemStyle).hover(function(){a(this).css(d.itemHoverStyle)},function(){a(this).css(d.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"});f.html(h);d.onShowMenu&&(f=d.onShowMenu(c,f));a.each(d.bindings,function(d,
c){a("#"+d,f).bind("click",function(){l();c(b,m)})});f.css({left:c[d.eventPosX],top:c[d.eventPosY]}).show();d.shadow&&k.css({width:f.width(),height:f.height(),left:c.pageX+2,top:c.pageY+2}).show();a(document).one("click",l)}function l(){f.hide();k.hide()}var f,k,h,g,m,e={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},
itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};a.fn.contextMenu=function(h,b){f||(f=a('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(a){a.stopPropagation()}));k||(k=a("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide());g=g||[];g.push({id:h,menuStyle:a.extend({},e.menuStyle,
b.menuStyle||{}),itemStyle:a.extend({},e.itemStyle,b.itemStyle||{}),itemHoverStyle:a.extend({},e.itemHoverStyle,b.itemHoverStyle||{}),bindings:b.bindings||{},shadow:b.shadow||!1===b.shadow?b.shadow:e.shadow,onContextMenu:b.onContextMenu||e.onContextMenu,onShowMenu:b.onShowMenu||e.onShowMenu,eventPosX:b.eventPosX||e.eventPosX,eventPosY:b.eventPosY||e.eventPosY});var c=g.length-1;a(this).bind("contextmenu",function(a){var b=g[c].onContextMenu?g[c].onContextMenu(a):!0;m=a.target;if(b)return n(c,this,
a),!1});return this};a.contextMenu={defaults:function(f){a.each(f,function(b,c){"object"==typeof c&&e[b]?a.extend(e[b],c):e[b]=c})}}});$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.min.map
