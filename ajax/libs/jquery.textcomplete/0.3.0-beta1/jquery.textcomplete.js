/*!
 * jQuery.textcomplete
 *
 * Repository: https://github.com/yuku-t/jquery-textcomplete
 * License:    MIT (https://github.com/yuku-t/jquery-textcomplete/blob/master/LICENSE)
 * Author:     Yuku Takahashi
 */

if (typeof jQuery === 'undefined') {
  throw new Error('jQuery.textcomplete requires jQuery');
}

+function ($) {
  'use strict';

  var warn = function (message) {
    if (console.warn) { console.warn(message); }
  };

  $.fn.textcomplete = function (strategies, option) {
    var args = Array.prototype.slice.call(arguments);
    return this.each(function () {
      var $this = $(this);
      var completer = $this.data('textComplete');
      if (!completer) {
        completer = new $.fn.textcomplete.Completer(this, option || {});
        $this.data('textComplete', completer);
      }
      if (typeof strategies === 'string') {
        args.shift()
        completer[strategies].apply(completer, args);
      } else {
        // For backward compatibility.
        // TODO: Remove at v0.4
        $.each(strategies, function (obj) {
          $.each(['header', 'footer', 'placement', 'maxCount'], function (name) {
            if (obj[name]) {
              option[name] = obj[name];
              warn(name + 'as a strategy param is deplicated. Use option.');
              delete obj[name];
            }
          });
        });
        completer.register($.fn.textcomplete.Strategy.parse(strategies));
      }
    });
  };

}(jQuery);

+function ($) {
  'use strict';

  // Exclusive execution control utility.
  //
  // func - The function to be locked. It is executed with a function named
  //        `free` as the first argument. Once it is called, additional
  //        execution are ignored until the free is invoked. Then the last
  //        ignored execution will be replayed immediately.
  //
  // Examples
  //
  //   var lockedFunc = lock(function (free) {
  //     setTimeout(function { free(); }, 1000); // It will be free in 1 sec.
  //     console.log('Hello, world');
  //   });
  //   lockedFunc();  // => 'Hello, world'
  //   lockedFunc();  // none
  //   lockedFunc();  // none
  //   // 1 sec past then
  //   // => 'Hello, world' 
  //   lockedFunc();  // => 'Hello, world'
  //   lockedFunc();  // none
  //
  // Returns a wrapped function.
  var lock = function (func) {
    var locked, queuedArgsToReplay;

    return function () {
      // Convert arguments into a real array.
      var args = Array.prototype.slice.call(arguments);
      if (locked) {
        // Keep a copy of this argument list to replay later.
        // OK to overwrite a previous value because we only replay
        // the last one.
        queuedArgsToReplay = args;
        return;
      }
      locked = true;
      var self = this;
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
          func.apply(self, replayArgs);
        } else {
          locked = false;
        }
      });
      func.apply(this, args);
    };
  };

  var uniqueId = 0;

  function Completer(element, option) {
    this.$el        = $(element);
    this.id         = 'textcomplete' + uniqueId++;
    this.strategies = [];
    this.views      = [];
    this.option     = $.extend({}, Completer.DEFAULTS, option);

    if (!this.$el.is('textarea') && !element.isContentEditable) {
      throw new Error('textcomplete must be called to a Textarea or a ContentEditable.');
    }

    if (element === document.activeElement) {
      // element has already been focused. Initialize view objects immediately.
      this.initialize()
    } else {
      // Initialize view objects lazily.
      var self = this;
      this.$el.one('focus.' + this.id, function () { self.initialize(); });
    }
  }

  Completer.DEFAULTS = {
    appendTo: $('body')
  };

  $.extend(Completer.prototype, {
    // Public properties
    // -----------------

    id:         null,
    option:     null,
    strategies: null,
    input:      null,
    dropdown:   null,
    $el:        null,

    // Public methods
    // --------------

    initialize: function () {
      var element = this.$el.get(0);
      // Initialize view objects.
      var viewName = element.isContentEditable ? 'ContentEditable' : 'Textarea';
      this.input = new $.fn.textcomplete[viewName](element, this, this.option);
      this.dropdown = new $.fn.textcomplete.Dropdown(element, this, this.option);
      this.dropdown.$el.appendTo(this.option.appendTo);
    },

    destroy: function () {
      this.$el.off('.' + this.id);
      this.input.destroy();
      this.dropdown.destroy();
      this.$el = this.input = this.dropdown = null;
    },

    // Invoke textcomplete.
    trigger: function (text, skipUnchangedTerm) {
      if (!this.dropdown) { this.initialize(); }
      var searchQuery = this._extractSearchQuery(text);
      if (searchQuery.length) {
        var term = searchQuery[1];
        // Ignore shift-key, ctrl-key and so on.
        if (skipUnchangedTerm && this._term === term) { return; }
        this._term = term;
        this._search.apply(this, searchQuery);
      } else {
        this._term = null;
        this.dropdown.deactivate();
      }
    },

    fire: function (eventName) {
      this.$el.trigger(eventName);
      return this;
    },

    register: function (strategies) {
      Array.prototype.push.apply(this.strategies, strategies);
    },

    // Insert the value into input view. It is called when the dropdown is clicked
    // or selected.
    //
    // value    - The selected element of the array callbacked from search func.
    // strategy - The Strategy object.
    select: function (value, strategy) {
      this.input.select(value, strategy);
      this.fire('change').fire('textComplete:select', value, strategy);
      this.input.focus();
    },

    // Private properties
    // ------------------

    _clearAtNext: true,
    _term:        null,

    // Private methods
    // ---------------

    // Parse the given text and extract the first matching strategy.
    //
    // Returns an array including the strategy and the query term if the
    // text matches an strategy; otherwise returns an empty array..
    _extractSearchQuery: function (text) {
      for (var i = 0; i < this.strategies.length; i++) {
        var strategy = this.strategies[i];
        var match = text.match(strategy.match);
        if (match) { return [strategy, match[strategy.index]]; }
      }
      return []
    },

    // Call the search method of selected strategy..
    _search: lock(function (free, strategy, term) {
      var self = this;
      strategy.search(term, function (data, stillSearching) {
        if (!self.dropdown.shown) {
          self.dropdown.activate();
          self.dropdown.setPosition(self.input.getCaretPosition());
        }
        if (self._clearAtNext) {
          // The first callback in the current lock.
          self.dropdown.clear();
          self._clearAtNext = false;
        }
        self.dropdown.render(self._zip(data, strategy));
        if (!stillSearching) {
          // The last callback in the current lock.
          free();
          self._clearAtNext = true; // Call dropdown.clear at the next time.
        }
      });
    }),

    // Build a parameter for Dropdown#render.
    //
    // Examples
    //
    //  this._zip(['a', 'b'], 's');
    //  //=> [{ value: 'a', strategy: 's' }, { value: 'b', strategy: 's' }]
    _zip: function (data, strategy) {
      return $.map(data, function (value) {
        return { value: value, strategy: strategy };
      });
    }
  });

  $.fn.textcomplete.Completer = Completer;
}(jQuery);

+function ($) {
  'use strict';

  var include = function (zippedData, datum) {
    var i, elem;
    for (i = 0; i < zippedData.length; i++) {
      elem = zippedData[i];
      if (elem.value === datum.value && elem.strategy === datum.strategy) return true;
    }
    return false;
  };

  var dropdownViews = {};
  $(document).on('click', function (e) {
    var id = e.originalEvent.keepTextCompleteDropdown;
    $.each(dropdownViews, function (key, view) {
      if (key !== id) { view.deactivate(); }
    });
  });

  // Dropdown view
  // =============

  // Construct Dropdown object.
  //
  // element - Textarea or contenteditable element.
  function Dropdown(element, completer, option) {
    this.$el       = Dropdown.createElement();
    this.completer = completer;
    this.id        = completer.id + 'dropdown';
    this._data     = []; // zipped data.
    this.$inputEl  = $(element);

    // Override setPosition method.
    if (option.listPosition) { this.setPosition = option.listPosition; }
    var self = this;
    $.each(['maxCount', 'placement', 'footer', 'header'], function (_i, name) {
      if (option[name] != null) { self[name] = option[name]; }
    });
    this._bindEvents(element);
    dropdownViews[this.id] = this;
  }

  $.extend(Dropdown, {
    // Class methods
    // -------------

    createElement: function () {
      return $('<ul class="dropdown-menu"></ul>').css({
        display: 'none',
        left: 0,
        position: 'absolute',
        zIndex: '100'
      });
    }
  });

  $.extend(Dropdown.prototype, {
    // Public properties
    // -----------------

    $el:       null,
    $inputEl:  null,
    completer: null,
    footer:    null,
    header:    null,
    id:        null,
    maxCount:  10,
    placement: '',
    shown:     false,
    data:      [],     // Shown zipped data.

    // Public methods
    // --------------

    destroy: function () {
      this.$el.off('.' + this.id);
      this.$inputEl.off('.' + this.id);
      this.clear();
      this.$el = this.$inputEl = this.completer = null;
      delete dropdownViews[this.id]
    },

    render: function (zippedData) {
      var contentsHtml = this._buildContents(zippedData);
      var unzippedData = $.map(this.data, function (d) { return d.value; });
      if (this.data.length) {
        this._renderHeader(unzippedData);
        this._renderFooter(unzippedData);
        if (contentsHtml) {
          this._renderContents(contentsHtml);
          this._activateIndexedItem();
        }
        this._setScroll();
      } else if (this.shown) {
        this.deactivate();
      }
    },

    setPosition: function (position) {
      this.$el.css(this._applyPlacement(position));
      return this;
    },

    clear: function () {
      this.$el.html('');
      this.data = [];
      this._index = 0;
      this._$header = this._$footer = null;
    },

    activate: function () {
      if (!this.shown) {
        this.clear();
        this.$el.show();
        this.completer.fire('textComplete:show');
        this.shown = true;
      }
      return this;
    },

    deactivate: function () {
      if (this.shown) {
        this.$el.hide();
        this.completer.fire('textComplete:hide');
        this.shown = false;
      }
      return this;
    },

    isUp: function (e) {
      return e.keyCode === 38 || (e.ctrlKey && e.keyCode === 80);  // UP, Ctrl-P
    },

    isDown: function (e) {
      return e.keyCode === 40 || (e.ctrlKey && e.keyCode === 78);  // DOWN, Ctrl-N
    },

    isEnter: function (e) {
      var modifiers = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey;
      return !modifiers && (e.keyCode === 13 || e.keyCode === 9)  // ENTER, TAB
    },

    isPageup: function (e) {
      return e.keyCode === 33;  // PAGEUP
    },

    isPagedown: function (e) {
      return e.keyCode === 34;  // PAGEDOWN
    },

    // Private properties
    // ------------------

    _data:    null,  // Currently shown zipped data.
    _index:   null,
    _$header: null,
    _$footer: null,

    // Private methods
    // ---------------

    _bindEvents: function () {
      this.$el.on('mousedown.' + this.id, '.textcomplete-item', $.proxy(this._onClick, this))
      this.$el.on('mouseover.' + this.id, '.textcomplete-item', $.proxy(this._onMouseover, this));
      this.$inputEl.on('keydown.' + this.id, $.proxy(this._onKeydown, this));
    },

    _onClick: function (e) {
      var $el = $(e.target);
      e.preventDefault();
      e.originalEvent.keepTextCompleteDropdown = this.id;
      if (!$el.hasClass('textcomplete-item')) {
        $el = $el.closest('.textcomplete-item');
      }
      var datum = this.data[parseInt($el.data('index'), 10)];
      this.completer.select(datum.value, datum.strategy);
      var self = this;
      // Deactive at next tick to allow other event handlers to know whether
      // the dropdown has been shown or not.
      setTimeout(function () { self.deactivate(); }, 0);
    },

    // Activate hovered item.
    _onMouseover: function (e) {
      var $el = $(e.target);
      e.preventDefault();
      if (!$el.hasClass('textcomplete-item')) {
        $el = $el.closest('.textcomplete-item');
      }
      this._index = parseInt($el.data('index'), 10);
      this._activateIndexedItem();
    },

    _onKeydown: function (e) {
      if (!this.shown) { return; }
      if (this.isUp(e)) {
        e.preventDefault();
        this._up();
      } else if (this.isDown(e)) {
        e.preventDefault();
        this._down();
      } else if (this.isEnter(e)) {
        e.preventDefault();
        this._enter();
      } else if (this.isPageup(e)) {
        e.preventDefault();
        this._pageup();
      } else if (this.isPagedown(e)) {
        e.preventDefault();
        this._pagedown();
      }
    },

    _up: function () {
      if (this._index === 0) {
        this._index = this.data.length - 1;
      } else {
        this._index -= 1;
      }
      this._activateIndexedItem();
      this._setScroll();
    },

    _down: function () {
      if (this._index === this.data.length - 1) {
        this._index = 0;
      } else {
        this._index += 1;
      }
      this._activateIndexedItem();
      this._setScroll();
    },

    _enter: function () {
      var datum = this.data[parseInt(this._getActiveElement().data('index'), 10)];
      this.completer.select(datum.value, datum.strategy);
      this._setScroll();
    },

    _pageup: function () {
      var target = 0;
      var threshold = this._getActiveElement().position().top - this.$el.innerHeight();
      this.$el.children().each(function (i) {
        if ($(this).position().top + $(this).outerHeight() > threshold) {
          target = i;
          return false;
        }
      });
      this._index = target;
      this._activateIndexedItem();
      this._setScroll();
    },

    _pagedown: function () {
      var target = this.data.length - 1;
      var threshold = this._getActiveElement().position().top + this.$el.innerHeight();
      this.$el.children().each(function (i) {
        if ($(this).position().top > threshold) {
          target = i;
          return false
        }
      });
      this._index = target;
      this._activateIndexedItem();
      this._setScroll();
    },

    _activateIndexedItem: function () {
      this.$el.find('.textcomplete-item.active').removeClass('active');
      this._getActiveElement().addClass('active');
    },

    _getActiveElement: function () {
      return this.$el.children('.textcomplete-item:nth(' + this._index + ')');
    },

    _setScroll: function () {
      var $activeEl = this._getActiveElement();
      var itemTop = $activeEl.position().top;
      var itemHeight = $activeEl.outerHeight();
      var visibleHeight = this.$el.innerHeight();
      var visibleTop = this.$el.scrollTop();
      if (this._index === 0 || this._index == this.data.length - 1 || itemTop < 0) {
        this.$el.scrollTop(itemTop + visibleTop);
      } else if (itemTop + itemHeight > visibleHeight) {
        this.$el.scrollTop(itemTop + itemHeight + visibleTop - visibleHeight);
      }
    },

    _buildContents: function (zippedData) {
      var datum, i, index;
      var html = '';
      for (i = 0; i < zippedData.length; i++) {
        if (this.data.length === this.maxCount) break;
        datum = zippedData[i];
        if (include(this.data, datum)) { continue; }
        index = this.data.length;
        this.data.push(datum);
        html += '<li class="textcomplete-item" data-index="' + index + '"><a>';
        html +=   datum.strategy.template(datum.value);
        html += '</a></li>';
      }
      return html;
    },

    _renderHeader: function (unzippedData) {
      if (this.header) {
        if (!this._$header) {
          this._$header = $('<li class="textcomplete-header"></li>').prependTo(this.$el);
        }
        var html = $.isFunction(this.header) ? this.header(unzippedData) : this.header;
        this._$header.html(html);
      }
    },

    _renderFooter: function (unzippedData) {
      if (this.footer) {
        if (!this._$footer) {
          this._$footer = $('<li class="textcomplete-footer"></li>').appendTo(this.$el);
        }
        var html = $.isFunction(this.footer) ? this.footer(unzippedData) : this.footer;
        this._$footer.html(html);
      }
    },

    _renderContents: function (html) {
      if (this._$footer) {
        this._$footer.before(html);
      } else {
        this.$el.append(html);
      }
    },

    _applyPlacement: function (position) { 
      // If the 'placement' option set to 'top', move the position above the element.
      if (this.placement.indexOf('top') !== -1) {
        // Overwrite the position object to set the 'bottom' property instead of the top.
        position = {
          top: 'auto',
          bottom: this.$el.parent().height() - position.top + position.lineHeight,
          left: position.left
        };
      } else {
        position.bottom = 'auto';
        delete position.lineHeight;
      }
      if (this.placement.indexOf('absleft') !== -1) {
        position.left = 0;
      } else if (this.placement.indexOf('absright') !== -1) {
        position.right = 0;
        position.left = 'auto';
      }
      return position;
    }
  });

  $.fn.textcomplete.Dropdown = Dropdown;
}(jQuery);

+function ($) {
  'use strict';

  // Memoize a search function.
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

  function Strategy(options) {
    $.extend(this, options);
    if (this.cache) { this.search = memoize(this.search); }
  }

  Strategy.parse = function (optionsArray) {
    return $.map(optionsArray, function (options) {
      return new Strategy(options);
    });
  };

  $.extend(Strategy.prototype, {
    // Public properties
    // -----------------

    // Required
    match:     null,
    replace:   null,
    search:    null,

    // Optional
    cache:     false,
    index:     2,
    template:  function (obj) { return obj; }
  });

  $.fn.textcomplete.Strategy = Strategy;

}(jQuery);

+function ($) {
  'use strict';

  function Input () {}

  $.extend(Input.prototype, {
    // Public properties
    // -----------------

    id:        null, // Identity.
    completer: null, // Completer object which creates it.
    el:        null, // Textarea element.
    $el:       null, // jQuery object of the textarea.
    option:    null,

    // Public methods
    // --------------

    destroy: function () {
      this.$el.off('.' + this.id); // Remove all event handlers.
      this.$el = this.el = this.completer = null;
    },

    // Returns the caret's relative coordinates from body's left top corner.
    getCaretPosition: function () {
      var position = this._getCaretRelativePosition();
      var textareaOffset = this.$el.offset();
      position.top += textareaOffset.top;
      position.left += textareaOffset.left;
      return position;
    },

    // Focus on the element.
    focus: function () {
      this.$el.focus();
    },

    // Private methods
    // ---------------

    _bindEvents: function () {
      this.$el.on('keyup.' + this.id, $.proxy(this._onKeyup, this));
    },

    _onKeyup: function (e) {
      if (this._skipSearch(e)) { return; }
      this.completer.trigger(this._getTextFromHeadToCaret(), true);
    },

    // Suppress searching if it returns true.
    _skipSearch: function (clickEvent) {
      switch (clickEvent.keyCode) {
        case 40: // DOWN
        case 38: // UP
          return true;
      }
      if (clickEvent.ctrlKey) switch (clickEvent.keyCode) {
        case 78: // Ctrl-N
        case 80: // Ctrl-P
          return true;
      }
    }
  });

  $.fn.textcomplete.Input = Input;
}(jQuery);

+function ($) {
  'use strict';

  // Textarea view
  // =============
  //
  // Managing a textarea. It doesn't know a Dropdown.
  function Textarea(element, completer, option) {
    this.el        = element;
    this.$el       = $(element);
    this.id        = completer.id + 'textarea';
    this.completer = completer;
    this.option    = option;

    this._bindEvents();
  }

  Textarea.DIV_PROPERTIES = {
    left: -9999,
    position: 'absolute',
    top: 0,
    whiteSpace: 'pre-wrap'
  }

  Textarea.COPY_PROPERTIES = [
    'border-width', 'font-family', 'font-size', 'font-style', 'font-variant',
    'font-weight', 'height', 'letter-spacing', 'word-spacing', 'line-height',
    'text-decoration', 'text-align', 'width', 'padding-top', 'padding-right',
    'padding-bottom', 'padding-left', 'margin-top', 'margin-right',
    'margin-bottom', 'margin-left', 'border-style', 'box-sizing'
  ];

  Textarea.prototype = new $.fn.textcomplete.Input();

  $.extend(Textarea.prototype, {
    // Public methods
    // --------------

    // Update the textarea with the given value and strategy.
    select: function (value, strategy) {
      var pre = this._getTextFromHeadToCaret();
      var selectionEnd = this.el.selectionEnd;
      if (typeof selectionEnd === 'number') {
        var post = this.el.value.substring(selectionEnd);
        var newSubstr = strategy.replace(value);
        if ($.isArray(newSubstr)) {
          post = newSubstr[1] + post;
          newSubstr = newSubstr[0];
        }
        pre = pre.replace(strategy.match, newSubstr);
        this.$el.val(pre + post);
        this.el.selectionStart = this.el.selectionEnd = pre.length;
      } else if (document.selection) { // IE

      }
    },

    // Private methods
    // ---------------

    // Returns the caret's relative coordinates from textarea's left top corner.
    //
    // Browser native API does not provide the way to know the position of
    // caret in pixels, so that here we use a kind of hack to accomplish
    // the aim. First of all it puts a dummy div element and completely copies
    // the textarea's style to the element, then it inserts the text and a
    // span element into the textarea.
    // Consequently, the span element's position is the thing what we want.
    _getCaretRelativePosition: function () {
      var dummyDiv = $('<div></div>').css(this._copyCss())
        .text(this._getTextFromHeadToCaret());
      var span = $('<span></span>').text('.').appendTo(dummyDiv);
      this.$el.before(dummyDiv);
      var position = span.position();
      position.top += span.height() - this.$el.scrollTop();
      position.lineHeight = span.height();
      dummyDiv.remove();
      return position;
    },

    _copyCss: function () {
      return $.extend({
        // Set 'scroll' if a scrollbar is being shown; otherwise 'auto'.
        overflow: this.el.scrollHeight > this.el.offsetHeight ? 'scroll' : 'auto'
      }, Textarea.DIV_PROPERTIES, this._getStyles());
    },

    _getStyles: (function ($) {
      var color = $('<div></div>').css(['color']).color;
      if (typeof color !== 'undefined') {
        return function () {
          this.$el.css(Textarea.COPY_PROPERTIES);
        };
      } else { // jQuery < 1.8
        return function () {
          var $el = this.$el;
          var styles = {};
          $.each(Textarea.COPY_PROPERTIES, function (i, property) {
            styles[property] = $el.css(property);
          });
          return styles;
        };
      }
    })($),

    _getTextFromHeadToCaret: function () {
      var selectionEnd = this.el.selectionEnd;
      if (typeof selectionEnd === 'number') {
        return this.el.value.substring(0, selectionEnd);
      } else if (document.selection) { // IE
        var range = this.el.createTextRange();
        range.moveStart('character', 0);
        range.moveEnd('textedit');
        return range.text;
      }
    }
  });

  $.fn.textcomplete.Textarea = Textarea;
}(jQuery);

+function ($) {
  'use strict';

  function ContentEditable (element, completer, option) {
    this.el        = element;
    this.$el       = $(element);
    this.id        = completer.id + 'contenteditable';
    this.completer = completer;
    this.option    = option;

    this._bindEvents();
  }

  ContentEditable.prototype = new $.fn.textcomplete.Input();

  $.extend(ContentEditable.prototype, {
    // Private methods
    // ---------------

    select: function (value, strategy) {
      var pre = this._getTextFromHeadToCaret();
      var sel = window.getSelection()
      var range = sel.getRangeAt(0);
      var selection = range.cloneRange();
      selection.selectNodeContents(range.startContainer);
      var content = selection.toString();
      var post = content.substring(range.startOffset);
      var newSubstr = strategy.replace(value);
      if ($.isArray(newSubstr)) {
        post = newSubstr[1] + post;
        newSubstr = newSubstr[0];
      }
      pre = pre.replace(strategy.match, newSubstr);
      range.selectNodeContents(range.startContainer);
      range.deleteContents();
      var node = document.createTextNode(pre + post);
      range.insertNode(node);
      range.setStart(node, pre.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    },

    // Private methods
    // ---------------

    _getCaretRelativePosition: function () {
      var range = window.getSelection().getRangeAt(0).cloneRange();
      var node = document.createElement('span');
      range.insertNode(node);
      range.selectNodeContents(node);
      range.deleteContents();
      var $node = $(node);
      var position = $node.offset();
      position.left -= this.$el.offset().left;
      position.top += $node.height() - this.$el.offset().top;
      position.lineHeight = $node.height();
      var dir = this.$el.attr('dir') || this.$el.css('direction');
      if (dir === 'rtl') { position.left -= this.listView.$el.width(); }
      return position;
    },

    _getTextFromHeadToCaret: function () {
      var range = window.getSelection().getRangeAt(0);
      var selection = range.cloneRange();
      selection.selectNodeContents(range.startContainer);
      return selection.toString().substring(0, range.startOffset);
    }
  });
}(jQuery);
