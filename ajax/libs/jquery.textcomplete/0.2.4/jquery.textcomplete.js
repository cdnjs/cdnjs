/*!
 * jQuery.textcomplete.js
 *
 * Repositiory: https://github.com/yuku-t/jquery-textcomplete
 * License:     MIT
 * Author:      Yuku Takahashi
 */

;(function ($) {

  'use strict';

  /**
   * Exclusive execution control utility.
   */
  var lock = function (func) {
    var free, locked, queuedArgsToReplay;
    free = function () { locked = false; };
    return function () {
      var args = toArray(arguments);
      if (locked) {
        // Keep a copy of this argument list to replay later.
        // OK to overwrite a previous value because we only replay the last one.
        queuedArgsToReplay = args;
        return;
      }
      locked = true;
      var that = this;
      args.unshift(function replayOrFree() {
        if (queuedArgsToReplay) {
          // Other request(s) arrived while we were locked.
          // Now that the lock is becoming available, replay
          // the latest such request, then call back here to
          // unlock (or replay another request that arrived
          // while this one was in flight).
          var replayArgs = queuedArgsToReplay;
          queuedArgsToReplay = undefined;
          replayArgs.unshift(replayOrFree);
          func.apply(that, replayArgs);
        } else {
          locked = false;
        }
      });
      func.apply(this, args);
    };
  };

  /**
   * Convert arguments into a real array.
   */
  var toArray = function (args) {
    var result;
    result = Array.prototype.slice.call(args);
    return result;
  };

  /**
   * Get the styles of any element from property names.
   */
  var getStyles = (function () {
    var color;
    color = $('<div></div>').css(['color']).color;
    if (typeof color !== 'undefined') {
      return function ($el, properties) {
        return $el.css(properties);
      };
    } else {  // for jQuery 1.8 or below
      return function ($el, properties) {
        var styles;
        styles = {};
        $.each(properties, function (i, property) {
          styles[property] = $el.css(property);
        });
        return styles;
      };
    }
  })();

  /**
   * Default template function.
   */
  var identity = function (obj) { return obj; };

  /**
   * Memoize a search function.
   */
  var memoize = function (func) {
    var memo = {};
    return function (term, callback) {
      if (memo[term]) {
        callback(memo[term]);
      } else {
        func.call(this, term, function (data) {
          memo[term] = (memo[term] || []).concat(data);
          callback.apply(null, arguments);
        });
      }
    };
  };

  /**
   * Determine if the array contains a given value.
   */
  var include = function (array, value) {
    var i, l;
    if (array.indexOf) return array.indexOf(value) != -1;
    for (i = 0, l = array.length; i < l; i++) {
      if (array[i] === value) return true;
    }
    return false;
  };

  /**
   * Textarea manager class.
   */
  var Completer = (function () {
    var html, css, $baseList, _id;

    html = {
      list: '<ul class="dropdown-menu"></ul>'
    };
    css = {
      // Removed the 'top' property to support the placement: 'top' option
      list: {
        position: 'absolute',
        left: 0,
        zIndex: '100',
        display: 'none'
      }
    };
    $baseList = $(html.list).css(css.list);
    _id = 0;

    function Completer($el, option) {
      var focus;
      this.el = $el.get(0);  // textarea element
      focus = this.el === document.activeElement;
      this.$el = $el;
      this.id = 'textComplete' + _id++;
      this.strategies = [];
      this.option = option;
      if (focus) {
        this.initialize();
        this.$el.focus();
      } else {
        this.$el.one('focus.textComplete', $.proxy(this.initialize, this));
      }
    }

    /**
     * Completer's public methods
     */
    $.extend(Completer.prototype, {

      /**
       * Prepare ListView and bind events.
       */
      initialize: function () {
        var $list, globalEvents, appendTo;
        $list = $baseList.clone();
        this.listView = new ListView($list, this);
        this.$el.on({
          'keyup.textComplete': $.proxy(this.onKeyup, this),
          'keydown.textComplete': $.proxy(this.listView.onKeydown, this.listView)
        });
        appendTo = this.option.appendTo;
        if (appendTo) {
          // Append ListView to specified element.
          $list.appendTo(appendTo instanceof $ ? appendTo : $(appendTo));
        } else {
          $list.appendTo($('body'));
        }
        globalEvents = {};
        globalEvents['click.' + this.id] = $.proxy(this.onClickDocument, this);
        globalEvents['keyup.' + this.id] = $.proxy(this.onKeyupDocument, this);
        $(document).on(globalEvents);
      },

      /**
       * Register strategies to the completer.
       */
      register: function (strategies) {
        this.strategies = this.strategies.concat(strategies);
      },

      /**
       * Show autocomplete list next to the caret.
       */
      renderList: function (data) {
        if (this.clearAtNext) {
          this.listView.clear();
          this.clearAtNext = false;
        }
        if (data.length) {
          this.listView.strategy = this.strategy;
          if (!this.listView.shown) {
            this.listView
                .setPosition(this.getCaretPosition())
                .clear()
                .activate();
          }
          data = data.slice(0, this.strategy.maxCount);
          this.listView.render(data);
        }

        if (!this.listView.data.length && this.listView.shown) {
          this.listView.deactivate();
        }
      },

      searchCallbackFactory: function (free) {
        var self = this;
        return function (data, keep) {
          self.renderList(data);
          if (!keep) {
            // This is the last callback for this search.
            free();
            self.clearAtNext = true;
          }
        };
      },

      /**
       * Keyup event handler.
       */
      onKeyup: function (e) {
        if (this.skipSearch(e)) { return; }
        this.trigger(null, true);
      },

      /**
       * Public interface for invoking textcomplete.
       */
      trigger: function (text, suppress) {
        var searchQuery, term;
        text || (text = this.getTextFromHeadToCaret());
        searchQuery = this.extractSearchQuery(text);
        if (searchQuery.length) {
          term = searchQuery[1];
          if (suppress && this.term === term) {
            return; // Ignore shift-key or something.
          }
          this.term = term;
          this.search(searchQuery);
        } else {
          this.term = null;
          this.listView.deactivate();
        }
      },

      /**
       * Suppress searching if it returns true.
       */
      skipSearch: function (e) {
        switch (e.keyCode) {
          case 40: // DOWN
          case 38: // UP
            return true;
        }
        if (e.ctrlKey) switch (e.keyCode) {
          case 78: // Ctrl-N
          case 80: // Ctrl-P
            return true;
        }
      },

      onSelect: function (value) {
        var pre, post, newSubStr, sel, range, selection;
        pre = this.getTextFromHeadToCaret();

        if (this.el.contentEditable == 'true') {
          sel = window.getSelection();
          range = sel.getRangeAt(0);
          selection = range.cloneRange();
          selection.selectNodeContents(range.startContainer);
          var content = selection.toString();
          post = content.substring(range.startOffset);
        } else {
          post = this.el.value.substring(this.el.selectionEnd);
        }

        newSubStr = this.strategy.replace(value);
        
        if ($.isArray(newSubStr)) {
          post = newSubStr[1] + post;
          newSubStr = newSubStr[0];
        }

        pre = pre.replace(this.strategy.match, newSubStr);
        
        if (this.el.contentEditable == 'true') {
          range.selectNodeContents(range.startContainer);
          range.deleteContents();
          var node = document.createTextNode(pre + post);
          range.insertNode(node);
          range.setStart(node, pre.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          this.$el.val(pre + post);
          this.el.selectionStart = this.el.selectionEnd = pre.length; 
        }

        this.$el.trigger('change')
                .trigger('textComplete:select', value);
        this.el.focus();
      },

      /**
       * Global click event handler.
       */
      onClickDocument: function (e) {
        if (e.originalEvent && !e.originalEvent.keepTextCompleteDropdown) {
          this.listView.deactivate();
        }
      },

      /**
       * Global keyup event handler.
       */
      onKeyupDocument: function (e) {
        if (this.listView.shown && e.keyCode === 27) { // ESC
          this.listView.deactivate();
          this.$el.focus();
        }
      },

      /**
       * Remove all event handlers.
       */
      destroy: function () {
        this.$el.off('.textComplete');
        $(document).off('.' + this.id);
        if (this.listView) { this.listView.destroy(); }
        this.$el.removeData('textComplete');
        this.$el = null;
      },

      // Helper methods
      // ==============

      getCaretPosition: function () {
        var caretPosition, textareaOffset;
        caretPosition = this.getCaretRelativePosition();
        textareaOffset = this.$el.offset();
        caretPosition.top += textareaOffset.top;
        caretPosition.left += textareaOffset.left;
        return caretPosition;
      },

      /**
       * Returns caret's relative coordinates from textarea's left top corner.
       */
      getCaretRelativePosition: function () {
        var properties, css, $div, $span, position, dir, scrollbar, range, node, $node;
        if (this.el.contentEditable != 'true') {
          // Browser native API does not provide the way to know the position of
          // caret in pixels, so that here we use a kind of hack to accomplish
          // the aim. First of all it puts a div element and completely copies
          // the textarea's style to the element, then it inserts the text and a
          // span element into the textarea.
          // Consequently, the span element's position is the thing what we want.
          properties = ['border-width', 'font-family', 'font-size', 'font-style',
            'font-variant', 'font-weight', 'height', 'letter-spacing',
            'word-spacing', 'line-height', 'text-decoration', 'text-align',
            'width', 'padding-top', 'padding-right', 'padding-bottom',
            'padding-left', 'margin-top', 'margin-right', 'margin-bottom',
            'margin-left', 'border-style', 'box-sizing'
          ];
          scrollbar = this.$el[0].scrollHeight > this.$el[0].offsetHeight;
          css = $.extend({
            position: 'absolute',
            overflow: scrollbar ? 'scroll' : 'auto',
            'white-space': 'pre-wrap',
            top: 0,
            left: -9999,
            direction: dir
          }, getStyles(this.$el, properties));

          $div = $('<div></div>').css(css).text(this.getTextFromHeadToCaret());
          $span = $('<span></span>').text('.').appendTo($div);
          this.$el.before($div);
          position = $span.position();
          position.top += $span.height() - this.$el.scrollTop();
          $div.remove();
        } else {
          range = window.getSelection().getRangeAt(0).cloneRange();
          node = document.createElement('span');
          range.insertNode(node);
          range.selectNodeContents(node);
          range.deleteContents();
          $node = $(node);
          position = $node.offset();
          position.left -= this.$el.offset().left;
          position.top += $node.height() - this.$el.offset().top;
        }
        dir = this.$el.attr('dir') || this.$el.css('direction');
        if (dir === 'rtl') { position.left -= this.listView.$el.width(); }
        return position;
      },

      getTextFromHeadToCaret: function () {
        var text, selectionEnd, range;
        if (this.el.contentEditable == 'true') {
          if (window.getSelection) {
            // IE9+ and non-IE            
            var range = window.getSelection().getRangeAt(0);
            var selection = range.cloneRange();
            selection.selectNodeContents(range.startContainer);
            text = selection.toString().substring(0, range.startOffset);
          }
        } else {
          selectionEnd = this.el.selectionEnd;
          if (typeof selectionEnd === 'number') {
            text = this.el.value.substring(0, selectionEnd);
          } else if (document.selection) {
            range = this.el.createTextRange();
            range.moveStart('character', 0);
            range.moveEnd('textedit');
            text = range.text;
          }
        }
        return text;
      },

      /**
       * Parse the value of textarea and extract search query.
       */
      extractSearchQuery: function (text) {
        var i, l, strategy, match;
        for (i = 0, l = this.strategies.length; i < l; i++) {
          strategy = this.strategies[i];
          match = text.match(strategy.match);
          if (match) { return [strategy, match[strategy.index]]; }
        }
        return [];
      },

      search: lock(function (free, searchQuery) {
        var term;
        this.strategy = searchQuery[0];
        term = searchQuery[1];
        this.strategy.search(term, this.searchCallbackFactory(free));
      })
    });

    return Completer;
  })();

  /**
   * Dropdown menu manager class.
   */
  var ListView = (function () {

    function ListView($el, completer) {
      this.data = [];
      this.$el = $el;
      this.index = 0;
      this.completer = completer;
      if (completer.option.listPosition) {
        this.setPosition = completer.option.listPosition;
      }

      this.$el.on('mousedown.textComplete', 'li.textcomplete-item',
                  $.proxy(this.onClick, this));
    }

    $.extend(ListView.prototype, {
      shown: false,

      render: function (data) {
        var html, i, l, index, val, str;

        html = '';
        
        if(this.strategy.header) {
          if ($.isFunction(this.strategy.header)) {
            str = this.strategy.header(data);
          } else {
            str = this.strategy.header;
          }
          html += '<li class="textcomplete-header">' + str + '</li>';
        }

        for (i = 0, l = data.length; i < l; i++) {
          val = data[i];
          if (include(this.data, val)) continue;
          index = this.data.length;
          this.data.push(val);
          html += '<li class="textcomplete-item" data-index="' + index + '"><a>';
          html +=   this.strategy.template(val);
          html += '</a></li>';
          if (this.data.length === this.strategy.maxCount) break;
        }

        if(this.strategy.footer) {
          if ($.isFunction(this.strategy.footer)) {
            str = this.strategy.footer(data);
          } else {
            str = this.strategy.footer;
          }
          html += '<li class="textcomplete-footer">' + str + '</li>';
        }

        this.$el.append(html);
        if (!this.data.length) {
          this.deactivate();
        } else {
          this.activateIndexedItem();
        }
      },

      clear: function () {
        this.data = [];
        this.$el.html('');
        this.index = 0;
        return this;
      },

      activateIndexedItem: function () {
        this.$el.find('.active').removeClass('active');
        this.getActiveItem().addClass('active');
      },

      getActiveItem: function () {
        return $(this.$el.children('.textcomplete-item').get(this.index));
      },

      activate: function () {
        if (!this.shown) {
          this.$el.show();
          this.completer.$el.trigger('textComplete:show');
          this.shown = true;
        }
        return this;
      },

      deactivate: function () {
        if (this.shown) {
          this.$el.hide();
          this.completer.$el.trigger('textComplete:hide');
          this.shown = false;
          this.data = [];
          this.index = null;
        }
        return this;
      },

      setPosition: function (position) {
        var fontSize;
        // If the strategy has the 'placement' option set to 'top', move the
        // position above the element
        if(this.strategy.placement === 'top') {
          // Move it to be in line with the match character
          fontSize = parseInt(this.$el.css('font-size'));
          // Overwrite the position object to set the 'bottom' property instead of the top.
          position = {
            top: 'auto',
            bottom: this.$el.parent().height() - position.top + fontSize,
            left: position.left
          };
        } else {
          // Overwrite 'bottom' property because once `placement: 'top'`
          // strategy is shown, $el keeps the property.
          position.bottom = 'auto';
        }
        this.$el.css(position);
        return this;
      },

      select: function (index) {
        var self = this;
        this.completer.onSelect(this.data[index]);
        // Deactive at next tick to allow other event handlers to know whether
        // the dropdown has been shown or not.
        setTimeout(function () { self.deactivate(); }, 0);
      },

      onKeydown: function (e) {
        if (!this.shown) return;
        var modifiers = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
        if (e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80)) {         // UP, or Ctrl-P
          e.preventDefault();
          if (this.index === 0) {
            this.index = this.data.length-1;
          } else {
            this.index -= 1;
          }
          this.activateIndexedItem();
        } else if (e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78)) {  // DOWN, or Ctrl-N
          e.preventDefault();
          if (this.index === this.data.length - 1) {
            this.index = 0;
          } else {
            this.index += 1;
          }
          this.activateIndexedItem();
        } else if (!modifiers && (e.keyCode === 13 || e.keyCode === 9)) {  // ENTER or TAB
          e.preventDefault();
          this.select(parseInt(this.getActiveItem().data('index'), 10));
        }
      },

      onClick: function (e) {
        var $e = $(e.target);
        e.preventDefault();
        e.originalEvent.keepTextCompleteDropdown = true;
        if (!$e.hasClass('textcomplete-item')) {
          $e = $e.parents('li.textcomplete-item');
        }
        this.select(parseInt($e.data('index'), 10));
      },

      destroy: function () {
        this.deactivate();
        this.$el.off('click.textComplete').remove();
        this.$el = null;
      }
    });

    return ListView;
  })();

  $.fn.textcomplete = function (strategies, option) {
    var i, l, strategy, dataKey;

    dataKey = 'textComplete';
    option || (option = {});

    if (strategies === 'destroy') {
      return this.each(function () {
        var completer = $(this).data(dataKey);
        if (completer) { completer.destroy(); }
      });
    }

    for (i = 0, l = strategies.length; i < l; i++) {
      strategy = strategies[i];
      if (!strategy.template) {
        strategy.template = identity;
      }
      if (strategy.index == null) {
        strategy.index = 2;
      }
      if (strategy.cache) {
        strategy.search = memoize(strategy.search);
      }
      strategy.maxCount || (strategy.maxCount = 10);
    }

    return this.each(function () {
      var $this, completer;
      $this = $(this);
      completer = $this.data(dataKey);
      if (!completer) {
        completer = new Completer($this, option);
        $this.data(dataKey, completer);
      }
      completer.register(strategies);
    });
  };

})(window.jQuery || window.Zepto);
