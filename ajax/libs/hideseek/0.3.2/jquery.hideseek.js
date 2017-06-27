/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2013, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.3.2
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 */

  /* Sample html structure

  <div class='selector'></div>

  */

;(function($, window, undefined) {
  "use strict";

  $.fn.hideseek = function(options) {

    var defaults = {
      list:       '.hideseek-data',
      nodata:     '',
      attribute:  'text',
      highlight:  false
    };

    var options = $.extend(defaults, options);

    $(this).each(function() {

      var $this = $(this);

      $this.keyup(function() {

        // Ungly overwrite
        options.list      = $(this).data('list') || options.list;
        options.nodata    = $(this).data('nodata') || options.nodata;
        options.attribute = $(this).data('attribute') || options.attribute;

        var q = $this.val().toLowerCase();

        var $list = $(options.list);

        $list.children().each(function() {

          var data = (options.attribute != 'text') ? $(this).attr(options.attribute).toLowerCase() : $(this).text().toLowerCase();

          if (data.indexOf(q) == -1) {

            $(this).hide();

          } else {

            options.highlight ? $(this).removeHighlight().highlight(q).show() : $(this).show();

          }

        });

        // No results message
        if (options.nodata) {

          $list.find('.no-results').remove();

          if ($list.children(':not([style*="display: none"])').length == 0) {

            $list.children().first().clone().addClass('no-results').show().prependTo(options.list).text(options.nodata);

          }

        }

      });

    });

  };

  $(document).ready(function () { $('[data-toggle="hideseek"]').hideseek(); });

})(jQuery);

/*

highlight v4

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/
jQuery.fn.highlight=function(t){function e(t,i){var n=0;if(3==t.nodeType){var a=t.data.toUpperCase().indexOf(i);if(a>=0){var s=document.createElement("mark");s.className="highlight";var r=t.splitText(a);r.splitText(i.length);var o=r.cloneNode(!0);s.appendChild(o),r.parentNode.replaceChild(s,r),n=1}}else if(1==t.nodeType&&t.childNodes&&!/(script|style)/i.test(t.tagName))for(var h=0;h<t.childNodes.length;++h)h+=e(t.childNodes[h],i);return n}return this.length&&t&&t.length?this.each(function(){e(this,t.toUpperCase())}):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each(function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()};
