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
!function(e,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){return n(t,e.document)}):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),n(t,e.document),t}:n(jQuery,e.document)}("undefined"!=typeof window?window:this,function(e,n){var t,o,i,d,u,s={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};e.fn.contextMenu=function(r,l){t||(t=e('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(e){e.stopPropagation()})),o||(o=e("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide()),(d=d||[]).push({id:r,menuStyle:e.extend({},s.menuStyle,l.menuStyle||{}),itemStyle:e.extend({},s.itemStyle,l.itemStyle||{}),itemHoverStyle:e.extend({},s.itemHoverStyle,l.itemHoverStyle||{}),bindings:l.bindings||{},shadow:l.shadow||!1===l.shadow?l.shadow:s.shadow,onContextMenu:l.onContextMenu||s.onContextMenu,onShowMenu:l.onShowMenu||s.onShowMenu,eventPosX:l.eventPosX||s.eventPosX,eventPosY:l.eventPosY||s.eventPosY});var a=d.length-1;return e(this).bind("contextmenu",function(s){var r=!d[a].onContextMenu||d[a].onContextMenu(s);if(u=s.target,r)return function(s,r,l){var a=d[s];(i=e("#"+a.id).find("ul:first").clone(!0)).css(a.menuStyle).find("li").css(a.itemStyle).hover(function(){e(this).css(a.itemHoverStyle)},function(){e(this).css(a.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"}),t.html(i),a.onShowMenu&&(t=a.onShowMenu(l,t));e.each(a.bindings,function(n,o){e("#"+n,t).bind("click",function(){c(),o(r,u)})}),t.css({left:l[a.eventPosX],top:l[a.eventPosY]}).show(),a.shadow&&o.css({width:t.width(),height:t.height(),left:l.pageX+2,top:l.pageY+2}).show();e(n).one("click",c)}(a,this,s),!1}),this};function c(){t.hide(),o.hide()}e.contextMenu={defaults:function(n){e.each(n,function(n,t){"object"==typeof t&&s[n]?e.extend(s[n],t):s[n]=t})}}}),$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.js.map