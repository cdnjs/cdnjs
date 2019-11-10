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
!function(e,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){return n(t,e.document)}):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),n(t,e.document),t}:n(jQuery,e.document)}("undefined"!=typeof window?window:this,function(e,n){function t(t,r,l){var a=s[t];(u=e("#"+a.id).find("ul:first").clone(!0)).css(a.menuStyle).find("li").css(a.itemStyle).hover(function(){e(this).css(a.itemHoverStyle)},function(){e(this).css(a.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"}),i.html(u),a.onShowMenu&&(i=a.onShowMenu(l,i)),e.each(a.bindings,function(n,t){e("#"+n,i).bind("click",function(){o(),t(r,c)})}),i.css({left:l[a.eventPosX],top:l[a.eventPosY]}).show(),a.shadow&&d.css({width:i.width(),height:i.height(),left:l.pageX+2,top:l.pageY+2}).show(),e(n).one("click",o)}function o(){i.hide(),d.hide()}var i,d,u,s,c,r={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};e.fn.contextMenu=function(n,o){i||(i=e('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(e){e.stopPropagation()})),d||(d=e("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide()),(s=s||[]).push({id:n,menuStyle:e.extend({},r.menuStyle,o.menuStyle||{}),itemStyle:e.extend({},r.itemStyle,o.itemStyle||{}),itemHoverStyle:e.extend({},r.itemHoverStyle,o.itemHoverStyle||{}),bindings:o.bindings||{},shadow:o.shadow||!1===o.shadow?o.shadow:r.shadow,onContextMenu:o.onContextMenu||r.onContextMenu,onShowMenu:o.onShowMenu||r.onShowMenu,eventPosX:o.eventPosX||r.eventPosX,eventPosY:o.eventPosY||r.eventPosY});var u=s.length-1;return e(this).bind("contextmenu",function(e){var n=!s[u].onContextMenu||s[u].onContextMenu(e);if(c=e.target,n)return t(u,this,e),!1}),this},e.contextMenu={defaults:function(n){e.each(n,function(n,t){"object"==typeof t&&r[n]?e.extend(r[n],t):r[n]=t})}}}),$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.js.map