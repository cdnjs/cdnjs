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
!function(n,t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e,n.document)}):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),t(n,e.document),n}:t(jQuery,n.document)}("undefined"!=typeof window?window:this,function(i,d){var u,s,c,r,l,o={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};function a(){u.hide(),s.hide()}i.fn.contextMenu=function(e,n){u||(u=i('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(e){e.stopPropagation()})),s||(s=i("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide()),(r=r||[]).push({id:e,menuStyle:i.extend({},o.menuStyle,n.menuStyle||{}),itemStyle:i.extend({},o.itemStyle,n.itemStyle||{}),itemHoverStyle:i.extend({},o.itemHoverStyle,n.itemHoverStyle||{}),bindings:n.bindings||{},shadow:n.shadow||!1===n.shadow?n.shadow:o.shadow,onContextMenu:n.onContextMenu||o.onContextMenu,onShowMenu:n.onShowMenu||o.onShowMenu,eventPosX:n.eventPosX||o.eventPosX,eventPosY:n.eventPosY||o.eventPosY});var t=r.length-1;return i(this).bind("contextmenu",function(e){var n=!r[t].onContextMenu||r[t].onContextMenu(e);if(l=e.target,n)return function(e,t,n){var o=r[e];(c=i("#"+o.id).find("ul:first").clone(!0)).css(o.menuStyle).find("li").css(o.itemStyle).hover(function(){i(this).css(o.itemHoverStyle)},function(){i(this).css(o.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"}),u.html(c),o.onShowMenu&&(u=o.onShowMenu(n,u));i.each(o.bindings,function(e,n){i("#"+e,u).bind("click",function(){a(),n(t,l)})}),u.css({left:n[o.eventPosX],top:n[o.eventPosY]}).show(),o.shadow&&s.css({width:u.width(),height:u.height(),left:n.pageX+2,top:n.pageY+2}).show();i(d).one("click",a)}(t,this,e),!1}),this},i.contextMenu={defaults:function(e){i.each(e,function(e,n){"object"==typeof n&&o[e]?i.extend(o[e],n):o[e]=n})}}}),$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.js.map