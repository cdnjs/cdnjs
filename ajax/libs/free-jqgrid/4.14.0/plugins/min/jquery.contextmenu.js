/**
 * @license ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */
!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(c,a.document)}):"object"==typeof module&&module.exports?module.exports=function(a,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(a||window)),b(c,a.document),c}:b(jQuery,a.document)}("undefined"!=typeof window?window:this,function(a,b){function c(c,j,k){var l=h[c];g=a("#"+l.id).find("ul:first").clone(!0),g.css(l.menuStyle).find("li").css(l.itemStyle).hover(function(){a(this).css(l.itemHoverStyle)},function(){a(this).css(l.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"}),e.html(g),l.onShowMenu&&(e=l.onShowMenu(k,e)),a.each(l.bindings,function(b,c){a("#"+b,e).bind("click",function(){d(),c(j,i)})}),e.css({left:k[l.eventPosX],top:k[l.eventPosY]}).show(),l.shadow&&f.css({width:e.width(),height:e.height(),left:k.pageX+2,top:k.pageY+2}).show(),a(b).one("click",d)}function d(){e.hide(),f.hide()}var e,f,g,h,i,j={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};a.fn.contextMenu=function(b,d){e||(e=a('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(a){a.stopPropagation()})),f||(f=a("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide()),h=h||[],h.push({id:b,menuStyle:a.extend({},j.menuStyle,d.menuStyle||{}),itemStyle:a.extend({},j.itemStyle,d.itemStyle||{}),itemHoverStyle:a.extend({},j.itemHoverStyle,d.itemHoverStyle||{}),bindings:d.bindings||{},shadow:d.shadow||d.shadow===!1?d.shadow:j.shadow,onContextMenu:d.onContextMenu||j.onContextMenu,onShowMenu:d.onShowMenu||j.onShowMenu,eventPosX:d.eventPosX||j.eventPosX,eventPosY:d.eventPosY||j.eventPosY});var g=h.length-1;return a(this).bind("contextmenu",function(a){var b=!h[g].onContextMenu||h[g].onContextMenu(a);if(i=a.target,b)return c(g,this,a),!1}),this},a.contextMenu={defaults:function(b){a.each(b,function(b,c){"object"==typeof c&&j[b]?a.extend(j[b],c):j[b]=c})}}}),$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.js.map