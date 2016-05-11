/**
 * HideSeek jQuery plugin
 *
 * @copyright Copyright 2013, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.5.5
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

;(function($, window, undefined) {
  "use strict";

  $.fn.hideseek = function(options) {

    var defaults = {
      list:       '.hideseek-data',
      nodata:     '',
      attribute:  'text',
      highlight:  false,
      ignore:     '',
      navigation: false
    };

    var options = $.extend(defaults, options);

    return this.each(function() {

      var $this = $(this);

      // Ungly overwrite
      options.list      = $this.data('list') || options.list;
      options.nodata    = $this.data('nodata') || options.nodata;
      options.attribute = $this.data('attribute') || options.attribute;
      options.highlight = $this.data('highlight') || options.highlight;
      options.ignore    = $this.data('ignore') || options.ignore;

      var $list = $(options.list);

      if (options.navigation) $this.attr('autocomplete', 'off');

      $this.keyup(function(e) {

        if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {

          var q = $this.val().toLowerCase();

          $list.children(options.ignore.trim() ? ":not(" + options.ignore + ")" : '').removeClass('selected').each(function() {

            var data = (options.attribute != 'text') ? $(this).attr(options.attribute).toLowerCase() : $(this).text().toLowerCase();

            if (data.indexOf(q) == -1) {

              $(this).hide();

              $this.trigger('_after_each');

            } else {

              options.highlight ? $(this).removeHighlight().highlight(q).show() : $(this).show();

              $this.trigger('_after_each');

            }

          });

          // No results message
          if (options.nodata) {

            $list.find('.no-results').remove();

            if (!$list.children(':not([style*="display: none"])').length) {

              $list
                .children()
                .first()
                .clone()
                .removeHighlight()
                .addClass('no-results')
                .show()
                .prependTo(options.list)
                .text(options.nodata);

            }

          }

          $this.trigger('_after');

        };

        // Navigation
        function current(element) {
          return element.children('.selected:visible');
        };

        function prev(element) {
          return current(element).prevAll(":visible:first");
        };

        function next(element) {
          return current(element).nextAll(":visible:first");
        };

        if (options.navigation) {

          if (e.keyCode == 38) {

            if (current($list).length) {

              prev($list).addClass('selected');

              current($list).last().removeClass('selected');

            } else {

              $list.children(':visible').last().addClass('selected');

            };

          } else if (e.keyCode == 40) {

            if (current($list).length) {

              next($list).addClass('selected');

              current($list).first().removeClass('selected');

            } else {

              $list.children(':visible').first().addClass('selected');

            };

          } else if (e.keyCode == 13) {

            if (current($list).find('a').length) {

              document.location = current($list).find('a').attr('href');

            } else {

              $this.val(current($list).text());

            };

          };

        };

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
