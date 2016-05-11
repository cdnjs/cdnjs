/* jshint -W003 */
/*!
 * jQuery Expander Plugin - v1.7.0 - 2016-03-12
 * http://plugins.learningjquery.com/expander/
 * Copyright (c) 2016 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory;
  } else {
    factory(jQuery);
  }
})(function($) {
  $.expander = {
    version: '1.7.0',
    defaults: {
      // the number of characters at which the contents will be sliced into two parts.
      slicePoint: 100,

      // a string of characters at which to slice the contents into two parts,
      // but only if the string appears before slicePoint
      // Useful for slicing at the first line break, e.g. {sliceOn: '<br'}
      sliceOn: null,

      // whether to keep the last word of the summary whole (true) or let it slice in the middle of a word (false)
      preserveWords: true,

      // whether to normalize the whitespace in the data to display (true) or not (false)
      normalizeWhitespace: true,

      // whether to count and display the number of words inside the collapsed text
      showWordCount: false,

      // text to include between summary and detail. Default ' ' prevents appearance of
      // collapsing two words into one.
      // Was hard-coded in script; now exposed as an option to fix issue #106.
      detailPrefix: ' ',

      // What to display around the counted number of words, set to '{{count}}' to show only the number
      wordCountText: ' ({{count}} words)',

      // a threshold of sorts for whether to initially hide/collapse part of the element's contents.
      // If after slicing the contents in two there are fewer words in the second part than
      // the value set by widow, we won't bother hiding/collapsing anything.
      widow: 4,

      // text displayed in a link instead of the hidden part of the element.
      // clicking this will expand/show the hidden/collapsed text
      expandText: 'read more',
      expandPrefix: '&hellip; ',

      expandAfterSummary: false,

      // Possible word endings to test against for when preserveWords: true
      wordEnd: /(&(?:[^;]+;)?|[0-9a-zA-Z\u00C0-\u0100]+|[^\u0000-\u007F]+)$/,

      // class names for summary element and detail element
      summaryClass: 'summary',
      detailClass: 'details',

      // class names for <span> around "read-more" link and "read-less" link
      moreClass: 'read-more',
      lessClass: 'read-less',

      // class names for <a> around "read-more" link and "read-less" link
      moreLinkClass: 'more-link',
      lessLinkClass: 'less-link',

      // number of milliseconds after text has been expanded at which to collapse the text again.
      // when 0, no auto-collapsing
      collapseTimer: 0,

      // effects for expanding and collapsing
      expandEffect: 'slideDown',
      expandSpeed: 250,
      collapseEffect: 'slideUp',
      collapseSpeed: 200,

      // allow the user to re-collapse the expanded text.
      userCollapse: true,

      // text to use for the link to re-collapse the text
      userCollapseText: 'read less',
      userCollapsePrefix: ' ',

      // all callback functions have the this keyword mapped to the element in the jQuery set when .expander() is called
      onSlice: null, // function() {}
      beforeExpand: null, // function() {},
      afterExpand: null, // function() {},
      onCollapse: null, // function(byUser) {}
      afterCollapse: null // function() {}
    }
  };

  $.fn.expander = function(options) {
    var meth = 'init';

    if (typeof options === 'string') {
      meth = options;
      options = {};
    }

    var opts = $.extend({}, $.expander.defaults, options);
    var rSelfClose = /^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i;
    var rAmpWordEnd = opts.wordEnd;
    var rOpenCloseTag = /<\/?(\w+)[^>]*>/g;
    var rOpenTag = /<(\w+)[^>]*>/g;
    var rCloseTag = /<\/(\w+)>/g;
    var rLastCloseTag = /(<\/([^>]+)>)\s*$/;
    var rTagPlus = /^(<[^>]+>)+.?/;
    var rMultiSpace = /\s\s+/g;
    var delayedCollapse;

    var removeSpaces = function(str) {
      return opts.normalizeWhitespace ? $.trim(str || '').replace(rMultiSpace, ' ') : str;
    };

    var methods = {
      init: function() {
        this.each(function() {
          var i, l, tmp, newChar, summTagless, summOpens, summCloses,
              lastCloseTag, detailText, detailTagless, html, expand;
          var $thisDetails, $readMore;
          var slicePointChanged;
          var openTagsForDetails = [];
          var closeTagsForsummaryText = [];
          var strayChars = '';
          var defined = {};
          var thisEl = this;
          var $this = $(this);
          var $summEl = $([]);
          var o = $.extend({}, opts, $this.data('expander') || $.meta && $this.data() || {});
          var hasDetails = !!$this.find('.' + o.detailClass).length;
          var hasBlocks = !!$this.find('*').filter(function() {
            var display = $(this).css('display');

            return (/^block|table|list/).test(display);
          }).length;
          var el = hasBlocks ? 'div' : 'span';
          var detailSelector = el + '.' + o.detailClass;
          var moreClass = o.moreClass + '';
          var lessClass = o.lessClass + '';
          var expandSpeed = o.expandSpeed || 0;
          var allHtml = removeSpaces($this.html());
          var summaryText = allHtml.slice(0, o.slicePoint);

          // allow multiple classes for more/less links
          o.moreSelector = 'span.' + moreClass.split(' ').join('.');
          o.lessSelector = 'span.' + lessClass.split(' ').join('.');
          // bail out if we've already set up the expander on this element
          if ($.data(this, 'expanderInit')) {
            return;
          }

          $.data(this, 'expanderInit', true);
          $.data(this, 'expander', o);
          // determine which callback functions are defined
          $.each(['onSlice','beforeExpand', 'afterExpand', 'onCollapse', 'afterCollapse'], function(index, val) {
            defined[val] = $.isFunction(o[val]);
          });

          // back up if we're in the middle of a tag or word
          summaryText = backup(summaryText);

          // summary text sans tags length
          summTagless = summaryText.replace(rOpenCloseTag, '').length;

          // add more characters to the summary, one for each character in the tags
          while (summTagless < o.slicePoint) {
            newChar = allHtml.charAt(summaryText.length);

            if (newChar === '<') {
              newChar = allHtml.slice(summaryText.length).match(rTagPlus)[0];
            }
            summaryText += newChar;
            summTagless++;
          }

          // SliceOn script, Closes #16, resolves #59
          // Original SliceEarlierAt code (since modfied): Sascha Peilicke @saschpe
          if (o.sliceOn) {
            slicePointChanged = changeSlicePoint({
              sliceOn: o.sliceOn,
              slicePoint: o.slicePoint,
              allHtml: allHtml,
              summaryText: summaryText
            });

            summaryText = slicePointChanged.summaryText;
          }

          summaryText = backup(summaryText, o.preserveWords && allHtml.slice(summaryText.length).length);

          // separate open tags from close tags and clean up the lists
          summOpens = summaryText.match(rOpenTag) || [];
          summCloses = summaryText.match(rCloseTag) || [];

          // filter out self-closing tags
          tmp = [];
          $.each(summOpens, function(index, val) {
            if (!rSelfClose.test(val)) {
              tmp.push(val);
            }
          });
          summOpens = tmp;

          // strip close tags to just the tag name
          l = summCloses.length;

          for (i = 0; i < l; i++) {
            summCloses[i] = summCloses[i].replace(rCloseTag, '$1');
          }
          // tags that start in summary and end in detail need:
          // a). close tag at end of summary
          // b). open tag at beginning of detail
          $.each(summOpens, function(index, val) {
            var thisTagName = val.replace(rOpenTag, '$1');
            var closePosition = $.inArray(thisTagName, summCloses);

            if (closePosition === -1) {
              openTagsForDetails.push(val);
              closeTagsForsummaryText.push('</' + thisTagName + '>');

            } else {
              summCloses.splice(closePosition, 1);
            }
          });

          // reverse the order of the close tags for the summary so they line up right
          closeTagsForsummaryText.reverse();

          // create necessary summary and detail elements if they don't already exist
          if (!hasDetails) {

            // end script if there is no detail text or if detail has fewer words than widow option
            detailText = allHtml.slice(summaryText.length);
            detailTagless = $.trim(detailText.replace(rOpenCloseTag, ''));

            if (detailTagless === '' || detailTagless.split(/\s+/).length < o.widow) {
              return;
            }
            // otherwise, continue...
            lastCloseTag = closeTagsForsummaryText.pop() || '';
            summaryText += closeTagsForsummaryText.join('');
            detailText = openTagsForDetails.join('') + detailText;
          } else {
            // assume that even if there are details, we still need readMore/readLess/summary elements
            // (we already bailed out earlier when readMore el was found)
            // but we need to create els differently

            // remove the detail from the rest of the content
            detailText = $this.find(detailSelector).remove().html();

            // The summary is what's left
            summaryText = $this.html();

            // allHtml is the summary and detail combined (this is needed when content has block-level elements)
            allHtml = summaryText + detailText;

            lastCloseTag = '';
          }
          o.moreLabel = $this.find(o.moreSelector).length ? '' : buildMoreLabel(o, detailText);

          if (hasBlocks) {
            detailText = allHtml;
            // Fixes issue #89; Tested by 'split html escapes'
          } else if (summaryText.charAt(summaryText.length - 1) === '&') {
            strayChars = /^[#\w\d\\]+;/.exec(detailText);

            if (strayChars) {
              detailText = detailText.slice(strayChars[0].length);
              summaryText += strayChars[0];
            }
          }
          summaryText += lastCloseTag;

          // onSlice callback
          o.summary = summaryText;
          o.details = detailText;
          o.lastCloseTag = lastCloseTag;

          if (defined.onSlice) {
            // user can choose to return a modified options object
            // one last chance for user to change the options. sneaky, huh?
            // but could be tricky so use at your own risk.
            tmp = o.onSlice.call(thisEl, o);

            // so, if the returned value from the onSlice function is an object with a details property, we'll use that!
            o = tmp && tmp.details ? tmp : o;
          }

          // build the html with summary and detail and use it to replace old contents
          html = buildHTML(o, hasBlocks);

          $this.empty().append(html);

          // set up details and summary for expanding/collapsing
          $thisDetails = $this.find(detailSelector);
          $readMore = $this.find(o.moreSelector);

          // Hide details span using collapseEffect unless
          // expandEffect is NOT slideDown and collapseEffect IS slideUp.
          // The slideUp effect sets span's "default" display to
          // inline-block. This is necessary for slideDown, but
          // problematic for other "showing" animations.
          // Fixes #46
          if (o.collapseEffect === 'slideUp' && o.expandEffect !== 'slideDown' || $this.is(':hidden')) {
            $thisDetails.css({display: 'none'});
          } else {
            $thisDetails[o.collapseEffect](0);
          }

          $summEl = $this.find('div.' + o.summaryClass);

          expand = function(event) {
            event.preventDefault();
            var exSpeed = event.startExpanded ? 0 : expandSpeed;
            $readMore.hide();
            $summEl.hide();

            if (defined.beforeExpand) {
              o.beforeExpand.call(thisEl);
            }

            $thisDetails.stop(false, true)[o.expandEffect](exSpeed, function() {
              $thisDetails.css({zoom: ''});

              if (defined.afterExpand) {
                o.afterExpand.call(thisEl);
              }
              delayCollapse(o, $thisDetails, thisEl);
            });
          };

          $readMore.find('a').unbind('click.expander').bind('click.expander', expand);

          if (o.userCollapse && !$this.find(o.lessSelector).length) {
            $this
            .find(detailSelector)
            .append('<span class="' + o.lessClass + '">' + o.userCollapsePrefix + '<a href="#" class="' + o.lessLinkClass + '">' + o.userCollapseText + '</a></span>');
          }

          $this
          .find(o.lessSelector + ' a')
          .unbind('click.expander')
          .bind('click.expander', function(event) {
            event.preventDefault();
            clearTimeout(delayedCollapse);
            var $detailsCollapsed = $(this).closest(detailSelector);
            reCollapse(o, $detailsCollapsed);

            if (defined.onCollapse) {
              o.onCollapse.call(thisEl, true);
            }
          });

          if (o.startExpanded) {
            expand({
              preventDefault: function() {},
              startExpanded: true
            });
          }

        }); // this.each
      },
      destroy: function() {

        this.each(function() {
          var o, details;
          var $this = $(this);

          if (!$this.data('expanderInit')) {
            return;
          }

          o = $.extend({}, $this.data('expander') || {}, opts);
          details = $this.find('.' + o.detailClass).contents();

          $this.removeData('expanderInit');
          $this.removeData('expander');

          $this.find(o.moreSelector).remove();
          $this.find('.' + o.summaryClass).remove();
          $this.find('.' + o.detailClass).after(details).remove();
          $this.find(o.lessSelector).remove();

        });
      }
    };

    // run the methods (almost always "init")
    if (methods[meth]) {
      methods[ meth ].call(this);
    }

    // utility functions
    function buildHTML(o, blocks) {
      var el = 'span';
      var summary = o.summary;
      var closingTagParts = rLastCloseTag.exec(summary);
      var closingTag = closingTagParts ? closingTagParts[2].toLowerCase() : '';

      if (blocks) {
        el = 'div';

        // if summary ends with a close tag, tuck the moreLabel inside it
        if (closingTagParts && closingTag !== 'a' && !o.expandAfterSummary) {
          summary = summary.replace(rLastCloseTag, o.moreLabel + '$1');
        } else {
          // otherwise (e.g. if ends with self-closing tag) just add moreLabel after summary
          // fixes #19
          summary += o.moreLabel;
        }

        // and wrap it in a div
        summary = '<div class="' + o.summaryClass + '">' + summary + '</div>';
      } else {
        summary += o.moreLabel;
      }

      return [
        summary,

        // after summary, add an optional prefix. Default single space prevents last word of summary
        // and first word of detail from collapsing together into what looks like a single word.
        // (could also be done with CSS, but this feels more natural)
        // Prefix made optional to fix issue #106
        o.detailPrefix || '',
        '<',
        el + ' class="' + o.detailClass + '"',
        '>',
        o.details,
        '</' + el + '>'
      ].join('');
    }

    function buildMoreLabel(o, detailText) {
      var ret = '<span class="' + o.moreClass + '">' + o.expandPrefix;

      if (o.showWordCount) {

        o.wordCountText = o.wordCountText.replace(/\{\{count\}\}/, detailText.replace(rOpenCloseTag, '').replace(/\&(?:amp|nbsp);/g, '').replace(/(?:^\s+|\s+$)/, '').match(/\w+/g).length);

      } else {
        o.wordCountText = '';
      }
      ret += '<a href="#" class="' + o.moreLinkClass + '">' + o.expandText + o.wordCountText + '</a></span>';

      return ret;
    }

    function backup(txt, preserveWords) {
      if (txt.lastIndexOf('<') > txt.lastIndexOf('>')) {
        txt = txt.slice(0, txt.lastIndexOf('<'));
      }

      if (preserveWords) {
        txt = txt.replace(rAmpWordEnd, '');
      }

      return $.trim(txt);
    }

    function reCollapse(o, el) {
      el.stop(true, true)[o.collapseEffect](o.collapseSpeed, function() {
        var prevMore = el.prev('span.' + o.moreClass).show();

        if (!prevMore.length) {
          el.parent().children('div.' + o.summaryClass).show()
            .find('span.' + o.moreClass).show();
        }

        if (o.afterCollapse) {
          o.afterCollapse.call(el);
        }
      });
    }

    function delayCollapse(option, $collapseEl, thisEl) {
      if (option.collapseTimer) {
        delayedCollapse = setTimeout(function() {
          reCollapse(option, $collapseEl);

          if ($.isFunction(option.onCollapse)) {
            option.onCollapse.call(thisEl, false);
          }
        }, option.collapseTimer);
      }
    }

    function changeSlicePoint(info) {
      // Create placeholder string text
      var sliceOnTemp = 'ExpandMoreHere374216623';

      // Replace sliceOn with placeholder unaffected by .text() cleaning
      // (in case sliceOn contains html)
      var summaryTextClean = info.summaryText.replace(info.sliceOn, sliceOnTemp);
      summaryTextClean = $('<div>' + summaryTextClean + '</div>').text();

      // Find true location of sliceOn placeholder
      var sliceOnIndexClean = summaryTextClean.indexOf(sliceOnTemp);

      // Store location of html version too
      var sliceOnIndexHtml = info.summaryText.indexOf(info.sliceOn);

      // Base condition off of true sliceOn location...
      if (sliceOnIndexClean !== -1 && sliceOnIndexClean < info.slicePoint) {
        // ...but keep html in summaryText
        info.summaryText = info.allHtml.slice(0, sliceOnIndexHtml);
      }

      return info;
    }

    return this;
  };

  // plugin defaults
  $.fn.expander.defaults = $.expander.defaults;
});
