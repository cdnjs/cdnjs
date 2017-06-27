/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.6.2
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 */

  /* Sample html structure

  <input name="search" placeholder="Start typing here" type="text" data-list=".list">
  <ul class="list">
    <li>item 1</li>
    <li>...</li>
    <li><a href="#">item 2</a></li>
  </ul>

  or

  <input name="search" placeholder="Start typing here" type="text" data-list=".list">
  <div class="list">
    <span>item 1</span>
    <span>...</span>
    <span>item 2</span>
  </div>

  or any similar structure...

  */

!function(e){"use strict";e.fn.hideseek=function(t){var i={list:".hideseek-data",nodata:"",attribute:"text",highlight:!1,ignore:"",navigation:!1,ignore_accents:!1,hidden_mode:!1},t=e.extend(i,t);return this.each(function(){var i=e(this);i.opts=[],e.map(["list","nodata","attribute","highlight","ignore","navigation","ignore_accents","hidden_mode"],function(e){i.opts[e]=i.data(e)||t[e]});var s=e(i.opts.list);i.opts.navigation&&i.attr("autocomplete","off"),i.opts.hidden_mode&&s.children().hide(),i.keyup(function(t){function o(e){return e.children(".selected:visible")}function n(e){return o(e).prevAll(":visible:first")}function a(e){return o(e).nextAll(":visible:first")}if(38!=t.keyCode&&40!=t.keyCode&&13!=t.keyCode){var r=i.val().toLowerCase();s.children(i.opts.ignore.trim()?":not("+i.opts.ignore+")":"").removeClass("selected").each(function(){var t="text"!=i.opts.attribute?e(this).attr(i.opts.attribute).toLowerCase():e(this).text().toLowerCase(),s=-1==t.removeAccents(i.opts.ignore_accents).indexOf(r)||r===(i.opts.hidden_mode?"":!1);s?(e(this).hide(),i.trigger("_after_each")):(i.opts.highlight?e(this).removeHighlight().highlight(r).show():e(this).show(),i.trigger("_after_each"))}),i.opts.nodata&&(s.find(".no-results").remove(),s.children(':not([style*="display: none"])').length||s.children().first().clone().removeHighlight().addClass("no-results").show().prependTo(i.opts.list).text(i.opts.nodata)),i.trigger("_after")}i.opts.navigation&&(38==t.keyCode?o(s).length?(n(s).addClass("selected"),o(s).last().removeClass("selected")):s.children(":visible").last().addClass("selected"):40==t.keyCode?o(s).length?(a(s).addClass("selected"),o(s).first().removeClass("selected")):s.children(":visible").first().addClass("selected"):13==t.keyCode&&(o(s).find("a").length?document.location=o(s).find("a").attr("href"):i.val(o(s).text())))})})},e(document).ready(function(){e('[data-toggle="hideseek"]').hideseek()})}(jQuery);

/*

highlight v4

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
jQuery.fn.highlight=function(t){function e(t,i){var n=0;if(3==t.nodeType){var a=t.data.removeAccents(true).toUpperCase().indexOf(i);if(a>=0){var s=document.createElement("mark");s.className="highlight";var r=t.splitText(a);r.splitText(i.length);var o=r.cloneNode(!0);s.appendChild(o),r.parentNode.replaceChild(s,r),n=1}}else if(1==t.nodeType&&t.childNodes&&!/(script|style)/i.test(t.tagName))for(var h=0;h<t.childNodes.length;++h)h+=e(t.childNodes[h],i);return n}return this.length&&t&&t.length?this.each(function(){e(this,t.toUpperCase())}):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each(function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()};

// Ignore accents
String.prototype.removeAccents=function(e){return e?this.replace(/[áàãâä]/gi,"a").replace(/[éè¨ê]/gi,"e").replace(/[íìïî]/gi,"i").replace(/[óòöôõ]/gi,"o").replace(/[úùüû]/gi,"u").replace(/[ç]/gi,"c").replace(/[ñ]/gi,"n"):this};
