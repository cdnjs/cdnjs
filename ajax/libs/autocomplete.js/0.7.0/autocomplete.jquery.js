/*!
 * autocomplete.js 0.7.0
 * https://github.com/algolia/autocomplete.js
 * Copyright 2015 Algolia, Inc. and other contributors; Licensed MIT
 */


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = require('./src/jquery/plugin.js');

},{"./src/jquery/plugin.js":12}],2:[function(require,module,exports){
'use strict';

var _ = require('../common/utils.js');

var css = {
  wrapper: {
    position: 'relative',
    display: 'inline-block'
  },
  hint: {
    position: 'absolute',
    top: '0',
    left: '0',
    borderColor: 'transparent',
    boxShadow: 'none',
    // #741: fix hint opacity issue on iOS
    opacity: '1'
  },
  input: {
    position: 'relative',
    verticalAlign: 'top',
    backgroundColor: 'transparent'
  },
  inputWithNoHint: {
    position: 'relative',
    verticalAlign: 'top'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '100',
    display: 'none'
  },
  suggestions: {
    display: 'block'
  },
  suggestion: {
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  suggestionChild: {
    whiteSpace: 'normal'
  },
  ltr: {
    left: '0',
    right: 'auto'
  },
  rtl: {
    left: 'auto',
    right: '0'
  }
};

// ie specific styling
if (_.isMsie()) {
  // ie6-8 (and 9?) doesn't fire hover and click events for elements with
  // transparent backgrounds, for a workaround, use 1x1 transparent gif
  _.mixin(css.input, {
    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
  });
}

// ie7 and under specific styling
if (_.isMsie() && _.isMsie() <= 7) {
  // if someone can tell me why this is necessary to align
  // the hint with the query in ie7, i'll send you $5 - @JakeHarding
  _.mixin(css.input, {marginTop: '-1px'});
}

module.exports = css;

},{"../common/utils.js":11}],3:[function(require,module,exports){
'use strict';

var datasetKey = 'aaDataset';
var valueKey = 'aaValue';
var datumKey = 'aaDatum';

var _ = require('../common/utils.js');
var DOM = require('../common/dom.js');
var html = require('./html.js');
var css = require('./css.js');
var EventEmitter = require('./event_emitter.js');

// constructor
// -----------

function Dataset(o) {
  o = o || {};
  o.templates = o.templates || {};

  if (!o.source) {
    _.error('missing source');
  }

  if (o.name && !isValidName(o.name)) {
    _.error('invalid dataset name: ' + o.name);
  }

  // tracks the last query the dataset was updated for
  this.query = null;

  this.highlight = !!o.highlight;
  this.name = o.name || _.getUniqueId();

  this.source = o.source;
  this.displayFn = getDisplayFn(o.display || o.displayKey);

  this.templates = getTemplates(o.templates, this.displayFn);

  this.$el = o.$menu && this.name && o.$menu.find('.aa-dataset-' + this.name).length > 0 ?
    DOM.element(o.$menu.find('.aa-dataset-' + this.name)[0]) :
    DOM.element(html.dataset.replace('%CLASS%', this.name));

  this.$menu = o.$menu;
}

// static methods
// --------------

Dataset.extractDatasetName = function extractDatasetName(el) {
  return DOM.element(el).data(datasetKey);
};

Dataset.extractValue = function extractDatum(el) {
  return DOM.element(el).data(valueKey);
};

Dataset.extractDatum = function extractDatum(el) {
  return DOM.element(el).data(datumKey);
};

// instance methods
// ----------------

_.mixin(Dataset.prototype, EventEmitter, {

  // ### private

  _render: function render(query, suggestions) {
    if (!this.$el) {
      return;
    }

    var that = this;
    var hasSuggestions;
    var renderArgs = [].slice.call(arguments, 2);

    this.$el.empty();
    hasSuggestions = suggestions && suggestions.length;

    if (!hasSuggestions && this.templates.empty) {
      this.$el
        .html(getEmptyHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    } else if (hasSuggestions) {
      this.$el
        .html(getSuggestionsHtml.apply(this, renderArgs))
        .prepend(that.templates.header ? getHeaderHtml.apply(this, renderArgs) : null)
        .append(that.templates.footer ? getFooterHtml.apply(this, renderArgs) : null);
    }

    if (this.$menu) {
      this.$menu.addClass('aa-' + (hasSuggestions ? 'with' : 'without') + '-' + this.name)
        .removeClass('aa-' + (hasSuggestions ? 'without' : 'with') + '-' + this.name);
    }

    this.trigger('rendered');

    function getEmptyHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: true}].concat(args);
      return that.templates.empty.apply(this, args);
    }

    function getSuggestionsHtml() {
      var args = [].slice.call(arguments, 0);
      var $suggestions;
      var nodes;

      $suggestions = DOM.element(html.suggestions).css(css.suggestions);

      // jQuery#append doesn't support arrays as the first argument
      // until version 1.8, see http://bugs.jquery.com/ticket/11231
      nodes = _.map(suggestions, getSuggestionNode);
      $suggestions.append.apply($suggestions, nodes);

      return $suggestions;

      function getSuggestionNode(suggestion) {
        var $el;

        $el = DOM.element(html.suggestion)
          .append(that.templates.suggestion.apply(this, [suggestion].concat(args)))
          .data(datasetKey, that.name)
          .data(valueKey, that.displayFn(suggestion) || null)
          .data(datumKey, suggestion);

        $el.children().each(function() { DOM.element(this).css(css.suggestionChild); });

        return $el;
      }
    }

    function getHeaderHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.header.apply(this, args);
    }

    function getFooterHtml() {
      var args = [].slice.call(arguments, 0);
      args = [{query: query, isEmpty: !hasSuggestions}].concat(args);
      return that.templates.footer.apply(this, args);
    }
  },

  // ### public

  getRoot: function getRoot() {
    return this.$el;
  },

  update: function update(query) {
    var that = this;

    this.query = query;
    this.canceled = false;
    this.source(query, render);

    function render(suggestions) {
      // if the update has been canceled or if the query has changed
      // do not render the suggestions as they've become outdated
      if (!that.canceled && query === that.query) {
        // concat all the other arguments that could have been passed
        // to the render function, and forward them to _render
        var args = [].slice.call(arguments, 1);
        args = [query, suggestions].concat(args);
        that._render.apply(that, args);
      }
    }
  },

  cancel: function cancel() {
    this.canceled = true;
  },

  clear: function clear() {
    this.cancel();
    this.$el.empty();
    this.trigger('rendered');
  },

  isEmpty: function isEmpty() {
    return this.$el.is(':empty');
  },

  destroy: function destroy() {
    this.$el = null;
  }
});

// helper functions
// ----------------

function getDisplayFn(display) {
  display = display || 'value';

  return _.isFunction(display) ? display : displayFn;

  function displayFn(obj) {
    return obj[display];
  }
}

function getTemplates(templates, displayFn) {
  return {
    empty: templates.empty && _.templatify(templates.empty),
    header: templates.header && _.templatify(templates.header),
    footer: templates.footer && _.templatify(templates.footer),
    suggestion: templates.suggestion || suggestionTemplate
  };

  function suggestionTemplate(context) {
    return '<p>' + displayFn(context) + '</p>';
  }
}

function isValidName(str) {
  // dashes, underscores, letters, and numbers
  return (/^[_a-zA-Z0-9-]+$/).test(str);
}

module.exports = Dataset;

},{"../common/dom.js":10,"../common/utils.js":11,"./css.js":2,"./event_emitter.js":6,"./html.js":7}],4:[function(require,module,exports){
'use strict';

var _ = require('../common/utils.js');
var DOM = require('../common/dom.js');
var EventEmitter = require('./event_emitter.js');
var Dataset = require('./dataset.js');
var css = require('./css.js');

// constructor
// -----------

function Dropdown(o) {
  var that = this;
  var onSuggestionClick;
  var onSuggestionMouseEnter;
  var onSuggestionMouseLeave;

  o = o || {};

  if (!o.menu) {
    _.error('menu is required');
  }

  if (!_.isArray(o.datasets) && !_.isObject(o.datasets)) {
    _.error('1 or more datasets required');
  }
  if (!o.datasets) {
    _.error('datasets is required');
  }

  this.isOpen = false;
  this.isEmpty = true;

  // bound functions
  onSuggestionClick = _.bind(this._onSuggestionClick, this);
  onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
  onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);

  this.$menu = DOM.element(o.menu)
    .on('click.aa', '.aa-suggestion', onSuggestionClick)
    .on('mouseenter.aa', '.aa-suggestion', onSuggestionMouseEnter)
    .on('mouseleave.aa', '.aa-suggestion', onSuggestionMouseLeave);

  if (o.templates && o.templates.header) {
    this.$menu.prepend(_.templatify(o.templates.header));
  }

  this.datasets = _.map(o.datasets, function(oDataset) { return initializeDataset(that.$menu, oDataset); });
  _.each(this.datasets, function(dataset) {
    var root = dataset.getRoot();
    if (root && root.parent().length === 0) {
      that.$menu.append(root);
    }
    dataset.onSync('rendered', that._onRendered, that);
  });

  if (o.templates && o.templates.footer) {
    this.$menu.append(_.templatify(o.templates.footer));
  }
}

// instance methods
// ----------------

_.mixin(Dropdown.prototype, EventEmitter, {

  // ### private

  _onSuggestionClick: function onSuggestionClick($e) {
    this.trigger('suggestionClicked', DOM.element($e.currentTarget));
  },

  _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
    this._removeCursor();
    this._setCursor(DOM.element($e.currentTarget), true);
  },

  _onSuggestionMouseLeave: function onSuggestionMouseLeave() {
    this._removeCursor();
  },

  _onRendered: function onRendered() {
    this.isEmpty = _.every(this.datasets, isDatasetEmpty);

    if (this.isEmpty) {
      this._hide();
    } else if (this.isOpen) {
      this._show();
    }

    this.trigger('datasetRendered');

    function isDatasetEmpty(dataset) {
      return dataset.isEmpty();
    }
  },

  _hide: function() {
    this.$menu.hide();
  },

  _show: function() {
    // can't use jQuery#show because $menu is a span element we want
    // display: block; not dislay: inline;
    this.$menu.css('display', 'block');
  },

  _getSuggestions: function getSuggestions() {
    return this.$menu.find('.aa-suggestion');
  },

  _getCursor: function getCursor() {
    return this.$menu.find('.aa-cursor').first();
  },

  _setCursor: function setCursor($el, silent) {
    $el.first().addClass('aa-cursor');

    if (!silent) {
      this.trigger('cursorMoved');
    }
  },

  _removeCursor: function removeCursor() {
    this._getCursor().removeClass('aa-cursor');
  },

  _moveCursor: function moveCursor(increment) {
    var $suggestions;
    var $oldCursor;
    var newCursorIndex;
    var $newCursor;

    if (!this.isOpen) {
      return;
    }

    $oldCursor = this._getCursor();
    $suggestions = this._getSuggestions();

    this._removeCursor();

    // shifting before and after modulo to deal with -1 index
    newCursorIndex = $suggestions.index($oldCursor) + increment;
    newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;

    if (newCursorIndex === -1) {
      this.trigger('cursorRemoved');

      return;
    } else if (newCursorIndex < -1) {
      newCursorIndex = $suggestions.length - 1;
    }

    this._setCursor($newCursor = $suggestions.eq(newCursorIndex));

    // in the case of scrollable overflow
    // make sure the cursor is visible in the menu
    this._ensureVisible($newCursor);
  },

  _ensureVisible: function ensureVisible($el) {
    var elTop;
    var elBottom;
    var menuScrollTop;
    var menuHeight;

    elTop = $el.position().top;
    elBottom = elTop + $el.height() +
      parseInt($el.css('margin-top'), 10) +
      parseInt($el.css('margin-bottom'), 10);
    menuScrollTop = this.$menu.scrollTop();
    menuHeight = this.$menu.height() +
      parseInt(this.$menu.css('paddingTop'), 10) +
      parseInt(this.$menu.css('paddingBottom'), 10);

    if (elTop < 0) {
      this.$menu.scrollTop(menuScrollTop + elTop);
    } else if (menuHeight < elBottom) {
      this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
    }
  },

  // ### public

  close: function close() {
    if (this.isOpen) {
      this.isOpen = false;

      this._removeCursor();
      this._hide();

      this.trigger('closed');
    }
  },

  open: function open() {
    if (!this.isOpen) {
      this.isOpen = true;

      if (!this.isEmpty) {
        this._show();
      }

      this.trigger('opened');
    }
  },

  setLanguageDirection: function setLanguageDirection(dir) {
    this.$menu.css(dir === 'ltr' ? css.ltr : css.rtl);
  },

  moveCursorUp: function moveCursorUp() {
    this._moveCursor(-1);
  },

  moveCursorDown: function moveCursorDown() {
    this._moveCursor(+1);
  },

  getDatumForSuggestion: function getDatumForSuggestion($el) {
    var datum = null;

    if ($el.length) {
      datum = {
        raw: Dataset.extractDatum($el),
        value: Dataset.extractValue($el),
        datasetName: Dataset.extractDatasetName($el)
      };
    }

    return datum;
  },

  getDatumForCursor: function getDatumForCursor() {
    return this.getDatumForSuggestion(this._getCursor().first());
  },

  getDatumForTopSuggestion: function getDatumForTopSuggestion() {
    return this.getDatumForSuggestion(this._getSuggestions().first());
  },

  update: function update(query) {
    _.each(this.datasets, updateDataset);

    function updateDataset(dataset) {
      dataset.update(query);
    }
  },

  empty: function empty() {
    _.each(this.datasets, clearDataset);
    this.isEmpty = true;

    function clearDataset(dataset) {
      dataset.clear();
    }
  },

  isVisible: function isVisible() {
    return this.isOpen && !this.isEmpty;
  },

  destroy: function destroy() {
    this.$menu.off('.aa');

    this.$menu = null;

    _.each(this.datasets, destroyDataset);

    function destroyDataset(dataset) {
      dataset.destroy();
    }
  }
});

// helper functions
// ----------------
Dropdown.Dataset = Dataset;

function initializeDataset($menu, oDataset) {
  return new Dropdown.Dataset(_.mixin({'$menu': $menu}, oDataset));
}

module.exports = Dropdown;

},{"../common/dom.js":10,"../common/utils.js":11,"./css.js":2,"./dataset.js":3,"./event_emitter.js":6}],5:[function(require,module,exports){
'use strict';

var namespace = 'autocomplete:';

var _ = require('../common/utils.js');
var DOM = require('../common/dom.js');

// constructor
// -----------

function EventBus(o) {
  if (!o || !o.el) {
    _.error('EventBus initialized without el');
  }

  this.$el = DOM.element(o.el);
}

// instance methods
// ----------------

_.mixin(EventBus.prototype, {

  // ### public

  trigger: function(type) {
    var args = [].slice.call(arguments, 1);

    this.$el.trigger(namespace + type, args);
  }
});

module.exports = EventBus;

},{"../common/dom.js":10,"../common/utils.js":11}],6:[function(require,module,exports){
'use strict';

var splitter = /\s+/;
var nextTick = getNextTick();

module.exports = {
  onSync: onSync,
  onAsync: onAsync,
  off: off,
  trigger: trigger
};

function on(method, types, cb, context) {
  var type;

  if (!cb) {
    return this;
  }

  types = types.split(splitter);
  cb = context ? bindContext(cb, context) : cb;

  this._callbacks = this._callbacks || {};

  while (type = types.shift()) {
    this._callbacks[type] = this._callbacks[type] || {sync: [], async: []};
    this._callbacks[type][method].push(cb);
  }

  return this;
}

function onAsync(types, cb, context) {
  return on.call(this, 'async', types, cb, context);
}

function onSync(types, cb, context) {
  return on.call(this, 'sync', types, cb, context);
}

function off(types) {
  var type;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);

  while (type = types.shift()) {
    delete this._callbacks[type];
  }

  return this;
}

function trigger(types) {
  var type;
  var callbacks;
  var args;
  var syncFlush;
  var asyncFlush;

  if (!this._callbacks) {
    return this;
  }

  types = types.split(splitter);
  args = [].slice.call(arguments, 1);

  while ((type = types.shift()) && (callbacks = this._callbacks[type])) { // eslint-disable-line
    syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
    asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

    if (syncFlush()) {
      nextTick(asyncFlush);
    }
  }

  return this;
}

function getFlush(callbacks, context, args) {
  return flush;

  function flush() {
    var cancelled;

    for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
      // only cancel if the callback explicitly returns false
      cancelled = callbacks[i].apply(context, args) === false;
    }

    return !cancelled;
  }
}

function getNextTick() {
  var nextTickFn;

  if (window.setImmediate) { // IE10+
    nextTickFn = function nextTickSetImmediate(fn) {
      setImmediate(function() { fn(); });
    };
  } else { // old browsers
    nextTickFn = function nextTickSetTimeout(fn) {
      setTimeout(function() { fn(); }, 0);
    };
  }

  return nextTickFn;
}

function bindContext(fn, context) {
  return fn.bind ?
    fn.bind(context) :
    function() { fn.apply(context, [].slice.call(arguments, 0)); };
}

},{}],7:[function(require,module,exports){
'use strict';

module.exports = {
  wrapper: '<span class="algolia-autocomplete"></span>',
  dropdown: '<span class="aa-dropdown-menu"></span>',
  dataset: '<div class="aa-dataset-%CLASS%"></div>',
  suggestions: '<span class="aa-suggestions"></span>',
  suggestion: '<div class="aa-suggestion"></div>'
};

},{}],8:[function(require,module,exports){
'use strict';

var specialKeyCodeMap;

specialKeyCodeMap = {
  9: 'tab',
  27: 'esc',
  37: 'left',
  39: 'right',
  13: 'enter',
  38: 'up',
  40: 'down'
};

var _ = require('../common/utils.js');
var DOM = require('../common/dom.js');
var EventEmitter = require('./event_emitter.js');

// constructor
// -----------

function Input(o) {
  var that = this;
  var onBlur;
  var onFocus;
  var onKeydown;
  var onInput;

  o = o || {};

  if (!o.input) {
    _.error('input is missing');
  }

  // bound functions
  onBlur = _.bind(this._onBlur, this);
  onFocus = _.bind(this._onFocus, this);
  onKeydown = _.bind(this._onKeydown, this);
  onInput = _.bind(this._onInput, this);

  this.$hint = DOM.element(o.hint);
  this.$input = DOM.element(o.input)
    .on('blur.aa', onBlur)
    .on('focus.aa', onFocus)
    .on('keydown.aa', onKeydown);

  // if no hint, noop all the hint related functions
  if (this.$hint.length === 0) {
    this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
  }

  // ie7 and ie8 don't support the input event
  // ie9 doesn't fire the input event when characters are removed
  // not sure if ie10 is compatible
  if (!_.isMsie()) {
    this.$input.on('input.aa', onInput);
  } else {
    this.$input.on('keydown.aa keypress.aa cut.aa paste.aa', function($e) {
      // if a special key triggered this, ignore it
      if (specialKeyCodeMap[$e.which || $e.keyCode]) {
        return;
      }

      // give the browser a chance to update the value of the input
      // before checking to see if the query changed
      _.defer(_.bind(that._onInput, that, $e));
    });
  }

  // the query defaults to whatever the value of the input is
  // on initialization, it'll most likely be an empty string
  this.query = this.$input.val();

  // helps with calculating the width of the input's value
  this.$overflowHelper = buildOverflowHelper(this.$input);
}

// static methods
// --------------

Input.normalizeQuery = function(str) {
  // strips leading whitespace and condenses all whitespace
  return (str || '').replace(/^\s*/g, '').replace(/\s{2,}/g, ' ');
};

// instance methods
// ----------------

_.mixin(Input.prototype, EventEmitter, {

  // ### private

  _onBlur: function onBlur() {
    this.resetInputValue();
    this.trigger('blurred');
  },

  _onFocus: function onFocus() {
    this.trigger('focused');
  },

  _onKeydown: function onKeydown($e) {
    // which is normalized and consistent (but not for ie)
    var keyName = specialKeyCodeMap[$e.which || $e.keyCode];

    this._managePreventDefault(keyName, $e);
    if (keyName && this._shouldTrigger(keyName, $e)) {
      this.trigger(keyName + 'Keyed', $e);
    }
  },

  _onInput: function onInput() {
    this._checkInputValue();
  },

  _managePreventDefault: function managePreventDefault(keyName, $e) {
    var preventDefault;
    var hintValue;
    var inputValue;

    switch (keyName) {
      case 'tab':
        hintValue = this.getHint();
        inputValue = this.getInputValue();

        preventDefault = hintValue &&
          hintValue !== inputValue &&
          !withModifier($e);
        break;

      case 'up':
      case 'down':
        preventDefault = !withModifier($e);
        break;

      default:
        preventDefault = false;
    }

    if (preventDefault) {
      $e.preventDefault();
    }
  },

  _shouldTrigger: function shouldTrigger(keyName, $e) {
    var trigger;

    switch (keyName) {
      case 'tab':
        trigger = !withModifier($e);
        break;

      default:
        trigger = true;
    }

    return trigger;
  },

  _checkInputValue: function checkInputValue() {
    var inputValue;
    var areEquivalent;
    var hasDifferentWhitespace;

    inputValue = this.getInputValue();
    areEquivalent = areQueriesEquivalent(inputValue, this.query);
    hasDifferentWhitespace = areEquivalent ?
      this.query.length !== inputValue.length : false;

    this.query = inputValue;

    if (!areEquivalent) {
      this.trigger('queryChanged', this.query);
    } else if (hasDifferentWhitespace) {
      this.trigger('whitespaceChanged', this.query);
    }
  },

  // ### public

  focus: function focus() {
    this.$input.focus();
  },

  blur: function blur() {
    this.$input.blur();
  },

  getQuery: function getQuery() {
    return this.query;
  },

  setQuery: function setQuery(query) {
    this.query = query;
  },

  getInputValue: function getInputValue() {
    return this.$input.val();
  },

  setInputValue: function setInputValue(value, silent) {
    this.$input.val(value);

    // silent prevents any additional events from being triggered
    if (silent) {
      this.clearHint();
    } else {
      this._checkInputValue();
    }
  },

  resetInputValue: function resetInputValue() {
    this.setInputValue(this.query, true);
  },

  getHint: function getHint() {
    return this.$hint.val();
  },

  setHint: function setHint(value) {
    this.$hint.val(value);
  },

  clearHint: function clearHint() {
    this.setHint('');
  },

  clearHintIfInvalid: function clearHintIfInvalid() {
    var val;
    var hint;
    var valIsPrefixOfHint;
    var isValid;

    val = this.getInputValue();
    hint = this.getHint();
    valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
    isValid = val !== '' && valIsPrefixOfHint && !this.hasOverflow();

    if (!isValid) {
      this.clearHint();
    }
  },

  getLanguageDirection: function getLanguageDirection() {
    return (this.$input.css('direction') || 'ltr').toLowerCase();
  },

  hasOverflow: function hasOverflow() {
    // 2 is arbitrary, just picking a small number to handle edge cases
    var constraint = this.$input.width() - 2;

    this.$overflowHelper.text(this.getInputValue());

    return this.$overflowHelper.width() >= constraint;
  },

  isCursorAtEnd: function() {
    var valueLength;
    var selectionStart;
    var range;

    valueLength = this.$input.val().length;
    selectionStart = this.$input[0].selectionStart;

    if (_.isNumber(selectionStart)) {
      return selectionStart === valueLength;
    } else if (document.selection) {
      // NOTE: this won't work unless the input has focus, the good news
      // is this code should only get called when the input has focus
      range = document.selection.createRange();
      range.moveStart('character', -valueLength);

      return valueLength === range.text.length;
    }

    return true;
  },

  destroy: function destroy() {
    this.$hint.off('.aa');
    this.$input.off('.aa');

    this.$hint = this.$input = this.$overflowHelper = null;
  }
});

// helper functions
// ----------------

function buildOverflowHelper($input) {
  return DOM.element('<pre aria-hidden="true"></pre>')
    .css({
      // position helper off-screen
      position: 'absolute',
      visibility: 'hidden',
      // avoid line breaks and whitespace collapsing
      whiteSpace: 'pre',
      // use same font css as input to calculate accurate width
      fontFamily: $input.css('font-family'),
      fontSize: $input.css('font-size'),
      fontStyle: $input.css('font-style'),
      fontVariant: $input.css('font-variant'),
      fontWeight: $input.css('font-weight'),
      wordSpacing: $input.css('word-spacing'),
      letterSpacing: $input.css('letter-spacing'),
      textIndent: $input.css('text-indent'),
      textRendering: $input.css('text-rendering'),
      textTransform: $input.css('text-transform')
    })
    .insertAfter($input);
}

function areQueriesEquivalent(a, b) {
  return Input.normalizeQuery(a) === Input.normalizeQuery(b);
}

function withModifier($e) {
  return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
}

module.exports = Input;

},{"../common/dom.js":10,"../common/utils.js":11,"./event_emitter.js":6}],9:[function(require,module,exports){
'use strict';

var attrsKey = 'aaAttrs';

var _ = require('../common/utils.js');
var DOM = require('../common/dom.js');
var EventBus = require('./event_bus.js');
var Input = require('./input.js');
var Dropdown = require('./dropdown.js');
var html = require('./html.js');
var css = require('./css.js');

// constructor
// -----------

// THOUGHT: what if datasets could dynamically be added/removed?
function Typeahead(o) {
  var $menu;
  var $input;
  var $hint;

  o = o || {};

  if (!o.input) {
    _.error('missing input');
  }

  this.isActivated = false;
  this.debug = !!o.debug;
  this.autoselect = !!o.autoselect;
  this.openOnFocus = !!o.openOnFocus;
  this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
  this.$node = buildDom(o);

  $menu = this.$node.find('.aa-dropdown-menu');
  $input = this.$node.find('.aa-input');
  $hint = this.$node.find('.aa-hint');

  // #705: if there's scrollable overflow, ie doesn't support
  // blur cancellations when the scrollbar is clicked
  //
  // #351: preventDefault won't cancel blurs in ie <= 8
  $input.on('blur.aa', function($e) {
    var active = document.activeElement;
    if (_.isMsie() && ($menu.is(active) || $menu.has(active).length > 0)) {
      $e.preventDefault();
      // stop immediate in order to prevent Input#_onBlur from
      // getting exectued
      $e.stopImmediatePropagation();
      _.defer(function() { $input.focus(); });
    }
  });

  // #351: prevents input blur due to clicks within dropdown menu
  $menu.on('mousedown.aa', function($e) { $e.preventDefault(); });

  this.eventBus = o.eventBus || new EventBus({el: $input});

  this.dropdown = new Typeahead.Dropdown({menu: $menu, datasets: o.datasets, templates: o.templates})
    .onSync('suggestionClicked', this._onSuggestionClicked, this)
    .onSync('cursorMoved', this._onCursorMoved, this)
    .onSync('cursorRemoved', this._onCursorRemoved, this)
    .onSync('opened', this._onOpened, this)
    .onSync('closed', this._onClosed, this)
    .onAsync('datasetRendered', this._onDatasetRendered, this);

  this.input = new Typeahead.Input({input: $input, hint: $hint})
    .onSync('focused', this._onFocused, this)
    .onSync('blurred', this._onBlurred, this)
    .onSync('enterKeyed', this._onEnterKeyed, this)
    .onSync('tabKeyed', this._onTabKeyed, this)
    .onSync('escKeyed', this._onEscKeyed, this)
    .onSync('upKeyed', this._onUpKeyed, this)
    .onSync('downKeyed', this._onDownKeyed, this)
    .onSync('leftKeyed', this._onLeftKeyed, this)
    .onSync('rightKeyed', this._onRightKeyed, this)
    .onSync('queryChanged', this._onQueryChanged, this)
    .onSync('whitespaceChanged', this._onWhitespaceChanged, this);

  this._setLanguageDirection();
}

// instance methods
// ----------------

_.mixin(Typeahead.prototype, {

  // ### private

  _onSuggestionClicked: function onSuggestionClicked(type, $el) {
    var datum;

    if (datum = this.dropdown.getDatumForSuggestion($el)) {
      this._select(datum);
    }
  },

  _onCursorMoved: function onCursorMoved() {
    var datum = this.dropdown.getDatumForCursor();

    this.input.setInputValue(datum.value, true);

    this.eventBus.trigger('cursorchanged', datum.raw, datum.datasetName);
  },

  _onCursorRemoved: function onCursorRemoved() {
    this.input.resetInputValue();
    this._updateHint();
  },

  _onDatasetRendered: function onDatasetRendered() {
    this._updateHint();
  },

  _onOpened: function onOpened() {
    this._updateHint();

    this.eventBus.trigger('opened');
  },

  _onClosed: function onClosed() {
    this.input.clearHint();

    this.eventBus.trigger('closed');
  },

  _onFocused: function onFocused() {
    this.isActivated = true;

    if (this.openOnFocus) {
      var query = this.input.getQuery();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }

      this.dropdown.open();
    }
  },

  _onBlurred: function onBlurred() {
    if (!this.debug) {
      this.isActivated = false;
      this.dropdown.empty();
      this.dropdown.close();
    }
  },

  _onEnterKeyed: function onEnterKeyed(type, $e) {
    var cursorDatum;
    var topSuggestionDatum;

    cursorDatum = this.dropdown.getDatumForCursor();
    topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();

    if (cursorDatum) {
      this._select(cursorDatum);
      $e.preventDefault();
    } else if (this.autoselect && topSuggestionDatum) {
      this._select(topSuggestionDatum);
      $e.preventDefault();
    }
  },

  _onTabKeyed: function onTabKeyed(type, $e) {
    var datum;

    if (datum = this.dropdown.getDatumForCursor()) {
      this._select(datum);
      $e.preventDefault();
    } else {
      this._autocomplete(true);
    }
  },

  _onEscKeyed: function onEscKeyed() {
    this.dropdown.close();
    this.input.resetInputValue();
  },

  _onUpKeyed: function onUpKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorUp();
    }

    this.dropdown.open();
  },

  _onDownKeyed: function onDownKeyed() {
    var query = this.input.getQuery();

    if (this.dropdown.isEmpty && query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.moveCursorDown();
    }

    this.dropdown.open();
  },

  _onLeftKeyed: function onLeftKeyed() {
    if (this.dir === 'rtl') {
      this._autocomplete();
    }
  },

  _onRightKeyed: function onRightKeyed() {
    if (this.dir === 'ltr') {
      this._autocomplete();
    }
  },

  _onQueryChanged: function onQueryChanged(e, query) {
    this.input.clearHintIfInvalid();

    if (query.length >= this.minLength) {
      this.dropdown.update(query);
    } else {
      this.dropdown.empty();
    }

    this.dropdown.open();
    this._setLanguageDirection();
  },

  _onWhitespaceChanged: function onWhitespaceChanged() {
    this._updateHint();
    this.dropdown.open();
  },

  _setLanguageDirection: function setLanguageDirection() {
    var dir = this.input.getLanguageDirection();

    if (this.dir !== dir) {
      this.dir = dir;
      this.$node.css('direction', dir);
      this.dropdown.setLanguageDirection(dir);
    }
  },

  _updateHint: function updateHint() {
    var datum;
    var val;
    var query;
    var escapedQuery;
    var frontMatchRegEx;
    var match;

    datum = this.dropdown.getDatumForTopSuggestion();

    if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
      val = this.input.getInputValue();
      query = Input.normalizeQuery(val);
      escapedQuery = _.escapeRegExChars(query);

      // match input value, then capture trailing text
      frontMatchRegEx = new RegExp('^(?:' + escapedQuery + ')(.+$)', 'i');
      match = frontMatchRegEx.exec(datum.value);

      // clear hint if there's no trailing text
      if (match) {
        this.input.setHint(val + match[1]);
      } else {
        this.input.clearHint();
      }
    } else {
      this.input.clearHint();
    }
  },

  _autocomplete: function autocomplete(laxCursor) {
    var hint;
    var query;
    var isCursorAtEnd;
    var datum;

    hint = this.input.getHint();
    query = this.input.getQuery();
    isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();

    if (hint && query !== hint && isCursorAtEnd) {
      datum = this.dropdown.getDatumForTopSuggestion();
      if (datum) {
        this.input.setInputValue(datum.value);
      }

      this.eventBus.trigger('autocompleted', datum.raw, datum.datasetName);
    }
  },

  _select: function select(datum) {
    this.input.setQuery(datum.value);
    this.input.setInputValue(datum.value, true);

    this._setLanguageDirection();

    this.eventBus.trigger('selected', datum.raw, datum.datasetName);
    this.dropdown.close();

    // #118: allow click event to bubble up to the body before removing
    // the suggestions otherwise we break event delegation
    _.defer(_.bind(this.dropdown.empty, this.dropdown));
  },

  // ### public

  open: function open() {
    // if the menu is not activated yet, we need to update
    // the underlying dropdown menu to trigger the search
    // otherwise we're not gonna see anything
    if (!this.isActivated) {
      var query = this.input.getInputValue();
      if (query.length >= this.minLength) {
        this.dropdown.update(query);
      } else {
        this.dropdown.empty();
      }
    }
    this.dropdown.open();
  },

  close: function close() {
    this.dropdown.close();
  },

  setVal: function setVal(val) {
    // expect val to be a string, so be safe, and coerce
    val = _.toStr(val);

    if (this.isActivated) {
      this.input.setInputValue(val);
    } else {
      this.input.setQuery(val);
      this.input.setInputValue(val, true);
    }

    this._setLanguageDirection();
  },

  getVal: function getVal() {
    return this.input.getQuery();
  },

  destroy: function destroy() {
    this.input.destroy();
    this.dropdown.destroy();

    destroyDomStructure(this.$node);

    this.$node = null;
  }
});

function buildDom(options) {
  var $input;
  var $wrapper;
  var $dropdown;
  var $hint;

  $input = DOM.element(options.input);
  $wrapper = DOM.element(html.wrapper).css(css.wrapper);
  // override the display property with the table-cell value
  // if the parent element is a table and the original input was a block
  //  -> https://github.com/algolia/autocomplete.js/issues/16
  if ($input.css('display') === 'block' && $input.parent().css('display') === 'table') {
    $wrapper.css('display', 'table-cell');
  }
  $dropdown = DOM.element(html.dropdown).css(css.dropdown);
  if (options.templates && options.templates.dropdownMenu) {
    $dropdown.html(_.templatify(options.templates.dropdownMenu)());
  }
  $hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));

  $hint
    .val('')
    .addClass('aa-hint')
    .removeAttr('id name placeholder required')
    .prop('readonly', true)
    .attr({autocomplete: 'off', spellcheck: 'false', tabindex: -1});
  if ($hint.removeData) {
    $hint.removeData();
  }

  // store the original values of the attrs that get modified
  // so modifications can be reverted on destroy
  $input.data(attrsKey, {
    dir: $input.attr('dir'),
    autocomplete: $input.attr('autocomplete'),
    spellcheck: $input.attr('spellcheck'),
    style: $input.attr('style')
  });

  $input
    .addClass('aa-input')
    .attr({autocomplete: 'off', spellcheck: false})
    .css(options.hint ? css.input : css.inputWithNoHint);

  // ie7 does not like it when dir is set to auto
  try {
    if (!$input.attr('dir')) {
      $input.attr('dir', 'auto');
    }
  } catch (e) {
    // ignore
  }

  return $input
    .wrap($wrapper)
    .parent()
    .prepend(options.hint ? $hint : null)
    .append($dropdown);
}

function getBackgroundStyles($el) {
  return {
    backgroundAttachment: $el.css('background-attachment'),
    backgroundClip: $el.css('background-clip'),
    backgroundColor: $el.css('background-color'),
    backgroundImage: $el.css('background-image'),
    backgroundOrigin: $el.css('background-origin'),
    backgroundPosition: $el.css('background-position'),
    backgroundRepeat: $el.css('background-repeat'),
    backgroundSize: $el.css('background-size')
  };
}

function destroyDomStructure($node) {
  var $input = $node.find('.aa-input');

  // need to remove attrs that weren't previously defined and
  // revert attrs that originally had a value
  _.each($input.data(attrsKey), function(val, key) {
    if (val === undefined) {
      $input.removeAttr(key);
    } else {
      $input.attr(key, val);
    }
  });

  $input
    .detach()
    .removeClass('aa-input')
    .insertAfter($node);
  if ($input.removeData) {
    $input.removeData(attrsKey);
  }

  $node.remove();
}

Typeahead.Dropdown = Dropdown;
Typeahead.Input = Input;

module.exports = Typeahead;

},{"../common/dom.js":10,"../common/utils.js":11,"./css.js":2,"./dropdown.js":4,"./event_bus.js":5,"./html.js":7,"./input.js":8}],10:[function(require,module,exports){
'use strict';

module.exports = {
  element: null
};

},{}],11:[function(require,module,exports){
'use strict';

var DOM = require('./dom.js');

module.exports = {
  // those methods are implemented differently
  // depending on which build it is, using
  // $... or angular... or Zepto... or require(...)
  isArray: null,
  isFunction: null,
  isObject: null,
  bind: null,
  each: null,
  map: null,
  mixin: null,

  isMsie: function() {
    // from https://github.com/ded/bowser/blob/master/bowser.js
    return (/(msie|trident)/i).test(navigator.userAgent) ?
      navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
  },

  // http://stackoverflow.com/a/6969486
  escapeRegExChars: function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  isNumber: function(obj) { return typeof obj === 'number'; },

  toStr: function toStr(s) {
    return s === undefined || s === null ? '' : s + '';
  },

  error: function(msg) {
    throw new Error(msg);
  },

  every: function(obj, test) {
    var result = true;
    if (!obj) {
      return result;
    }
    this.each(obj, function(val, key) {
      result = test.call(null, val, key, obj);
      if (!result) {
        return false;
      }
    });
    return !!result;
  },

  getUniqueId: (function() {
    var counter = 0;
    return function() { return counter++; };
  })(),

  templatify: function templatify(obj) {
    if (this.isFunction(obj)) {
      return obj;
    }
    var $template = DOM.element(obj);
    if ($template.prop('tagName') === 'SCRIPT') {
      return function template() { return $template.text(); };
    }
    return function template() { return String(obj); };
  },

  defer: function(fn) { setTimeout(fn, 0); },

  noop: function() {}
};

},{"./dom.js":10}],12:[function(require,module,exports){
'use strict';

// setup DOM element
var DOM = require('../common/dom.js');
DOM.element = $;

// setup utils functions
var _ = require('../common/utils.js');
_.isArray = $.isArray;
_.isFunction = $.isFunction;
_.isObject = $.isPlainObject;
_.bind = $.proxy;
_.each = function(collection, cb) {
  // stupid argument order for jQuery.each
  $.each(collection, reverseArgs);
  function reverseArgs(index, value) {
    return cb(value, index);
  }
};
_.map = $.map;
_.mixin = $.extend;

////////////////////////

var Typeahead = require('../autocomplete/typeahead.js');
var EventBus = require('../autocomplete/event_bus.js');

var old;
var typeaheadKey;
var methods;

old = $.fn.autocomplete;

typeaheadKey = 'aaAutocomplete';

methods = {
  // supported signatures:
  // function(o, dataset, dataset, ...)
  // function(o, [dataset, dataset, ...])
  initialize: function initialize(o, datasets) {
    datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);

    o = o || {};

    return this.each(attach);

    function attach() {
      var $input = $(this);
      var eventBus = new EventBus({el: $input});
      var typeahead;

      typeahead = new Typeahead({
        input: $input,
        eventBus: eventBus,
        hint: o.hint === undefined ? true : !!o.hint,
        minLength: o.minLength,
        autoselect: o.autoselect,
        openOnFocus: o.openOnFocus,
        templates: o.templates,
        debug: o.debug,
        datasets: datasets
      });

      $input.data(typeaheadKey, typeahead);
    }
  },

  open: function open() {
    return this.each(openTypeahead);

    function openTypeahead() {
      var $input = $(this);
      var typeahead;

      if (typeahead = $input.data(typeaheadKey)) {
        typeahead.open();
      }
    }
  },

  close: function close() {
    return this.each(closeTypeahead);

    function closeTypeahead() {
      var $input = $(this);
      var typeahead;

      if (typeahead = $input.data(typeaheadKey)) {
        typeahead.close();
      }
    }
  },

  val: function val(newVal) {
    // mirror jQuery#val functionality: reads opearte on first match,
    // write operates on all matches
    return !arguments.length ? getVal(this.first()) : this.each(setVal);

    function setVal() {
      var $input = $(this);
      var typeahead;

      if (typeahead = $input.data(typeaheadKey)) {
        typeahead.setVal(newVal);
      }
    }

    function getVal($input) {
      var typeahead;
      var query;

      if (typeahead = $input.data(typeaheadKey)) {
        query = typeahead.getVal();
      }

      return query;
    }
  },

  destroy: function destroy() {
    return this.each(unattach);

    function unattach() {
      var $input = $(this);
      var typeahead;

      if (typeahead = $input.data(typeaheadKey)) {
        typeahead.destroy();
        $input.removeData(typeaheadKey);
      }
    }
  }
};

$.fn.autocomplete = function(method) {
  var tts;

  // methods that should only act on intialized typeaheads
  if (methods[method] && method !== 'initialize') {
    // filter out non-typeahead inputs
    tts = this.filter(function() { return !!$(this).data(typeaheadKey); });
    return methods[method].apply(tts, [].slice.call(arguments, 1));
  }
  return methods.initialize.apply(this, arguments);
};

$.fn.autocomplete.noConflict = function noConflict() {
  $.fn.autocomplete = old;
  return this;
};

module.exports = $.fn.autocomplete;

},{"../autocomplete/event_bus.js":5,"../autocomplete/typeahead.js":9,"../common/dom.js":10,"../common/utils.js":11}]},{},[1]);
