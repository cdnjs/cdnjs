/*
 Copyright (c) 2014-2016, Dr. Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 Dual licensed under the MIT and GPL licenses
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl-2.0.html
 Date: 2015-04-06
 see the answers http://stackoverflow.com/a/8491939/315935
             and http://stackoverflow.com/a/29048089/315935
             and http://stackoverflow.com/q/29457007/315935
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","./jqdnr","./jqmodal"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){c.jgrid.extend({createContexMenuFromNavigatorButtons:function(n,p){var e=this,k="menu_"+e[0].id,q=c("<ul>"),m=c("<div>").attr("id",k);q.appendTo(m);m.appendTo("body");e.contextMenu(k,{bindings:{},onContextMenu:function(d){var b=e[0].p,a,h;a=c(d.target);d=a.closest("tr.jqgrow").attr("id");a=a.is(":text:enabled")||a.is("input[type=textarea]:enabled")||
a.is("textarea:enabled");if(a=d&&!a)a="",window.getSelection?a=window.getSelection():document.getSelection?a=document.getSelection():document.selection&&(a=document.selection.createRange().text),a=""===("string"===typeof a?a:a.toString());return a?(a=c.inArray(d,b.selarrrow),b.selrow!==d&&0>a?e.jqGrid("setSelection",d):b.multiselect&&(h=b.selarrrow[b.selarrrow.length-1],a!==b.selarrrow.length-1&&(b.selarrrow[b.selarrrow.length-1]=d,b.selarrrow[a]=h,b.selrow=d)),!0):!1},onShowMenu:function(d,b){var a=
this,h=b.children("ul").first().empty(),l=null!=c.ui&&"string"===typeof c.ui.version?/^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(c.ui.version):[],k=null!=l&&4===l.length&&"1"===l[1]&&11>l[2];c(n).find(".navtable .ui-pg-button").filter(function(){return!(c(this).prop("disabled")||c(this).hasClass("ui-state-disabled"))}).each(function(){var b,d,e,f,g=c(this).children("div.ui-pg-div").first();1===g.length&&(d=g.children(".ui-pg-button-text").html(),b=g.parent(),""===c.trim(d)&&(d=b.attr("title")),e=""!==this.id&&
""!==d?"menuitem_"+this.id:c.jgrid.randId(),f=c("<li>").attr("id",e),b=g.children("span").not(".ui-pg-button-text").first(),0<b.length&&(k?f.append(c("<a>").html(d).prepend(b.clone().removeClass("ui-pg-button-icon-over-text").css({"float":"left",marginTop:b.hasClass("ui-icon")?"0.25em":"0.125em",marginRight:"0.5em"}))):f.html(d).prepend(b.clone().removeClass("ui-pg-button-icon-over-text").css({"float":"left",marginTop:b.first().hasClass("ui-icon")?"0.25em":"0.125em",marginRight:"0.5em"})),g.parent().hasClass("ui-state-active")&&
f.find("span").addClass("ui-state-active"),0<f.find("select,input").length&&f.hide(),h.append(f),a.bindings[e]=function(a){return function(){a.click()}}(g)))});c.jgrid.fullBoolFeedback.call(e,(p||{}).onShowContextMenu,"jqGridShowContextMenu",h,a);return b}})}})});
//# sourceMappingURL=jquery.createcontexmenufromnavigatorbuttons.min.map
