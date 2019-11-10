(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('InputSim', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.InputSim = mod.exports;
  }
})(this, function (exports) {
  /*! jshint esnext:true, undef:true, unused:true */

  /** @private */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var A = 65;
  /** @private */
  var Y = 89;
  /** @private */
  var Z = 90;
  /** @private */
  var ZERO = 48;
  /** @private */
  var NINE = 57;
  /** @private */
  var LEFT = 37;
  /** @private */
  var RIGHT = 39;
  /** @private */
  var UP = 38;
  /** @private */
  var DOWN = 40;
  /** @private */
  var BACKSPACE = 8;
  /** @private */
  var DELETE = 46;
  /** @private */
  var TAB = 9;
  /** @private */
  var ENTER = 13;

  /**
   * @namespace KEYS
   */
  var KEYS = {
    A: A,
    Y: Y,
    Z: Z,
    ZERO: ZERO,
    NINE: NINE,
    LEFT: LEFT,
    RIGHT: RIGHT,
    UP: UP,
    DOWN: DOWN,
    BACKSPACE: BACKSPACE,
    DELETE: DELETE,
    TAB: TAB,
    ENTER: ENTER,

    /**
     * @param {number} keyCode
     * @returns {boolean}
     */
    isDigit: function isDigit(keyCode) {
      return ZERO <= keyCode && keyCode <= NINE;
    },

    /**
     * Is an arrow keyCode.
     *
     * @param {number} keyCode
     * @returns {boolean}
     */
    isDirectional: function isDirectional(keyCode) {
      return keyCode === LEFT || keyCode === RIGHT || keyCode === UP || keyCode === DOWN;
    }
  };

  var CTRL = 1 << 0;
  var META = 1 << 1;
  var ALT = 1 << 2;
  var SHIFT = 1 << 3;

  var cache = {};

  /**
   * Builds a BindingSet based on the current platform.
   *
   * @param {string} platform A string name of a platform (e.g. "OSX").
   * @returns {BindingSet} keybindings appropriate for the given platform.
   */
  function keyBindingsForPlatform(platform) {
    var osx = platform === 'OSX';
    var ctrl = osx ? META : CTRL;

    if (!cache[platform]) {
      cache[platform] = build(function (bind) {
        bind(A, ctrl, 'selectAll');
        bind(LEFT, null, 'moveLeft');
        bind(LEFT, ALT, 'moveWordLeft');
        bind(LEFT, SHIFT, 'moveLeftAndModifySelection');
        bind(LEFT, ALT | SHIFT, 'moveWordLeftAndModifySelection');
        bind(RIGHT, null, 'moveRight');
        bind(RIGHT, ALT, 'moveWordRight');
        bind(RIGHT, SHIFT, 'moveRightAndModifySelection');
        bind(RIGHT, ALT | SHIFT, 'moveWordRightAndModifySelection');
        bind(UP, null, 'moveUp');
        bind(UP, ALT, 'moveToBeginningOfParagraph');
        bind(UP, SHIFT, 'moveUpAndModifySelection');
        bind(UP, ALT | SHIFT, 'moveParagraphBackwardAndModifySelection');
        bind(DOWN, null, 'moveDown');
        bind(DOWN, ALT, 'moveToEndOfParagraph');
        bind(DOWN, SHIFT, 'moveDownAndModifySelection');
        bind(DOWN, ALT | SHIFT, 'moveParagraphForwardAndModifySelection');
        bind(BACKSPACE, null, 'deleteBackward');
        bind(BACKSPACE, SHIFT, 'deleteBackward');
        bind(BACKSPACE, ALT, 'deleteWordBackward');
        bind(BACKSPACE, ALT | SHIFT, 'deleteWordBackward');
        bind(BACKSPACE, ctrl, 'deleteBackwardToBeginningOfLine');
        bind(BACKSPACE, ctrl | SHIFT, 'deleteBackwardToBeginningOfLine');
        bind(DELETE, null, 'deleteForward');
        bind(DELETE, ALT, 'deleteWordForward');
        bind(TAB, null, 'insertTab');
        bind(TAB, SHIFT, 'insertBackTab');
        bind(ENTER, null, 'insertNewline');
        bind(Z, ctrl, 'undo');

        if (osx) {
          bind(LEFT, META, 'moveToBeginningOfLine');
          bind(LEFT, META | SHIFT, 'moveToBeginningOfLineAndModifySelection');
          bind(RIGHT, META, 'moveToEndOfLine');
          bind(RIGHT, META | SHIFT, 'moveToEndOfLineAndModifySelection');
          bind(UP, META, 'moveToBeginningOfDocument');
          bind(UP, META | SHIFT, 'moveToBeginningOfDocumentAndModifySelection');
          bind(DOWN, META, 'moveToEndOfDocument');
          bind(DOWN, META | SHIFT, 'moveToEndOfDocumentAndModifySelection');
          bind(BACKSPACE, CTRL, 'deleteBackwardByDecomposingPreviousCharacter');
          bind(BACKSPACE, CTRL | SHIFT, 'deleteBackwardByDecomposingPreviousCharacter');
          bind(Z, META | SHIFT, 'redo');
        } else {
          bind(Y, CTRL, 'redo');
        }
      });
    }

    return cache[platform];
  }

  function build(callback) {
    var result = new BindingSet();
    callback(function () {
      return result.bind.apply(result, arguments);
    });
    return result;
  }

  /**
   * @private
   */

  var BindingSet = (function () {
    function BindingSet() {
      _classCallCheck(this, BindingSet);

      this.bindings = {};
    }

    /**
     * Enum for text direction affinity.
     *
     * @const
     * @enum {number}
     * @private
     */

    /**
     * @param {number} keyCode
     * @param {number} modifiers
     * @param {string} action
     */

    _createClass(BindingSet, [{
      key: 'bind',
      value: function bind(keyCode, modifiers, action) {
        if (!this.bindings[keyCode]) {
          this.bindings[keyCode] = {};
        }
        this.bindings[keyCode][modifiers || 0] = action;
      }

      /**
       * @param {Event} event
       * @returns {?string}
       */
    }, {
      key: 'actionForEvent',
      value: function actionForEvent(event) {
        var bindingsForKeyCode = this.bindings[event.keyCode];
        if (bindingsForKeyCode) {
          var modifiers = 0;
          if (event.altKey) {
            modifiers |= ALT;
          }
          if (event.ctrlKey) {
            modifiers |= CTRL;
          }
          if (event.metaKey) {
            modifiers |= META;
          }
          if (event.shiftKey) {
            modifiers |= SHIFT;
          }
          return bindingsForKeyCode[modifiers];
        }
      }
    }]);

    return BindingSet;
  })();

  var Affinity = {
    UPSTREAM: 0,
    DOWNSTREAM: 1,
    NONE: null
  };

  /**
   * Tests is string passed in is a single word.
   *
   * @param {string} chr
   * @returns {boolean}
   * @private
   */
  function isWordChar(chr) {
    return chr && /^\w$/.test(chr);
  }

  /**
   * Checks if char to the left of {index} in {string}
   * is a break (non-char).
   *
   * @param {string} text
   * @param {number} index
   * @returns {boolean}
   * @private
   */
  function hasLeftWordBreakAtIndex(text, index) {
    if (index === 0) {
      return true;
    } else {
      return !isWordChar(text[index - 1]) && isWordChar(text[index]);
    }
  }

  /**
   * Checks if char to the right of {index} in {string}
   * is a break (non-char).
   *
   * @param {string} text
   * @param {number} index
   * @returns {boolean}
   * @private
   */
  function hasRightWordBreakAtIndex(text, index) {
    if (index === text.length - 1) {
      return true;
    } else {
      return isWordChar(text[index]) && !isWordChar(text[index + 1]);
    }
  }

  var Input = (function () {
    /**
      * Sets up the initial properties of the TextField and
      * sets  up the event listeners
      *
      * @param {string} value
      * @param {Object} range ({start: 0, length: 0})
      */

    function Input(value, range) {
      _classCallCheck(this, Input);

      this._value = '';
      this._selectedRange = {
        start: 0,
        length: 0
      };
      this.shouldCancelEvents = true;
      this.selectionAffinity = Affinity.NONE;

      if (value) {
        this.setText(value);
      }
      if (range) {
        this.setSelectedRange(range);
      }
      this._buildKeybindings();
    }

    /**
     * Clears all characters in the existing selection.
     *
     * @example
     *     // 12|34567|8
     *     clearSelection();
     *     // 12|8
     *
     */

    _createClass(Input, [{
      key: 'clearSelection',
      value: function clearSelection() {
        this.replaceSelection('');
      }

      /**
       * Deletes backward one character or clears a non-empty selection.
       *
       * @example
       *
       *     // |What's up, doc?
       *     deleteBackward(event);
       *     // |What's up, doc?
       *
       *     // What'|s up, doc?
       *     deleteBackward(event);
       *     // What|s up, doc?
       *
       *     // |What's| up, doc?
       *     deleteBackward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteBackward',
      value: function deleteBackward(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length === 0) {
          range.start--;
          range.length++;
          this.setSelectedRange(range);
        }
        this.clearSelection();
      }

      /**
       * Deletes backward one word or clears a non-empty selection.
       *
       * @example
       *     // |What's up, doc?
       *     deleteWordBackward(event);
       *     // |What's up, doc?
       *
       *     // What'|s up, doc?
       *     deleteWordBackward(event);
       *     // |s up, doc?
       *
       *     // |What's| up, doc?
       *     deleteWordBackward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteWordBackward',
      value: function deleteWordBackward(event) {
        if (this.hasSelection()) {
          this.deleteBackward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          var start = this._lastWordBreakBeforeIndex(range.start);
          range.length += range.start - start;
          range.start = start;
          this.setSelectedRange(range);
          this.clearSelection();
        }
      }

      /**
       * Deletes backward one character, clears a non-empty selection, or decomposes
       * an accented character to its simple form.
       *
       * @TODO Make this work as described.
       *
       * @example
       *     // |fiancée
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // |What's up, doc?
       *
       *     // fianc|é|e
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // fianc|e
       *
       *     // fiancé|e
       *     deleteBackwardByDecomposingPreviousCharacter(event);
       *     // fiance|e
       *
       */
    }, {
      key: 'deleteBackwardByDecomposingPreviousCharacter',
      value: function deleteBackwardByDecomposingPreviousCharacter(event) {
        this.deleteBackward(event);
      }

      /**
       * Deletes all characters before the cursor or clears a non-empty selection.
       *
       * @example
       *     // The quick |brown fox.
       *     deleteBackwardToBeginningOfLine(event);
       *     // |brown fox.
       *
       *     // The |quick |brown fox.
       *     deleteBackwardToBeginningOfLine(event);
       *     // The brown fox.
       *
       */
    }, {
      key: 'deleteBackwardToBeginningOfLine',
      value: function deleteBackwardToBeginningOfLine(event) {
        if (this.hasSelection()) {
          this.deleteBackward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          range.length = range.start;
          range.start = 0;
          this.setSelectedRange(range);
          this.clearSelection();
        }
      }

      /**
       * Deletes forward one character or clears a non-empty selection.
       *
       * @example
       *     // What's up, doc?|
       *     deleteForward(event);
       *     // What's up, doc?|
       *
       *     // What'|s up, doc?
       *     deleteForward(event);
       *     // What'| up, doc?
       *
       *     // |What's| up, doc?
       *     deleteForward(event);
       *     // | up, doc?
       *
       */
    }, {
      key: 'deleteForward',
      value: function deleteForward(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length === 0) {
          range.length++;
          this.setSelectedRange(range);
        }
        this.clearSelection();
      }

      /**
       * Deletes forward one word or clears a non-empty selection.
       *
       * @example
       *     // What's up, doc?|
       *     deleteWordForward(event);
       *     // What's up, doc?|
       *
       *     // What's |up, doc?
       *     deleteWordForward(event);
       *     // What's |, doc?
       *
       *     // |What's| up, doc?
       *     deleteWordForward(event);
       *     // | up, doc?
       */
    }, {
      key: 'deleteWordForward',
      value: function deleteWordForward(event) {
        if (this.hasSelection()) {
          return this.deleteForward(event);
        } else {
          this._handleEvent(event);
          var range = this.selectedRange();
          var end = this._nextWordBreakAfterIndex(range.start + range.length);
          this.setSelectedRange({
            start: range.start,
            length: end - range.start
          });
          this.clearSelection();
        }
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(event) {
        if (typeof event === 'undefined') {
          throw new Error('cannot handle and event that isn\'t passed');
        }
        var action = this._bindings.actionForEvent(event);
        if (action) this[action](event);
        return action;
      }

      /**
       * Determines whether this field has any selection.
       *
       * @returns {boolean} true if there is at least one character selected
       */
    }, {
      key: 'hasSelection',
      value: function hasSelection() {
        return this.selectedRange().length !== 0;
      }

      /**
       * Handles the back tab key.
       *
       */
    }, {
      key: 'insertBackTab',
      value: function insertBackTab() {}

      /**
       * Handles a key event could be trying to end editing.
       *
       */
    }, {
      key: 'insertNewline',
      value: function insertNewline() {}

      /**
       * Handles the tab key.
       *
       */
    }, {
      key: 'insertTab',
      value: function insertTab() {}

      /**
       * Handles a event that is trying to insert a character.
       *
       * @param {string} text
       */
    }, {
      key: 'insertText',
      value: function insertText(text) {
        var range;
        if (this.hasSelection()) {
          this.clearSelection();
        }

        this.replaceSelection(text);
        range = this.selectedRange();
        range.start += range.length;
        range.length = 0;
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor up, which because this is a single-line text field, means
       * moving to the beginning of the value.
       *
       * @example
       *     // Hey guys|
       *     moveUp(event);
       *     // |Hey guys
       *
       *     // Hey |guys|
       *     moveUp(event);
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveUp',
      value: function moveUp(event) {
        this._handleEvent(event);
        this.setSelectedRange({
          start: 0,
          length: 0
        });
      }

      /**
       * Moves the cursor up to the beginning of the current paragraph, which because
       * this is a single-line text field, means moving to the beginning of the
       * value.
       *
       * @example
       *     // Hey guys|
       *     moveToBeginningOfParagraph(event)
       *     // |Hey guys
       *
       *     // Hey |guys|
       *     moveToBeginningOfParagraph(event)
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfParagraph',
      value: function moveToBeginningOfParagraph(event) {
        this.moveUp(event);
      }

      /**
       * Moves the cursor up, keeping the current anchor point and extending the
       * selection to the beginning as moveUp would.
       *
       * @example
       *     // rightward selections are shrunk
       *     // Hey guys, |where> are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, |where are you?
       *
       *     // leftward selections are extended
       *     // Hey guys, <where| are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, where| are you?
       *
       *     // neutral selections are extended
       *     // Hey guys, |where| are you?
       *     moveUpAndModifySelection(event);
       *     // <Hey guys, where| are you?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveUpAndModifySelection',
      value: function moveUpAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            // 12<34 56|78  =>  <1234 56|78
            range.length += range.start;
            range.start = 0;
            break;
          case Affinity.DOWNSTREAM:
            // 12|34 56>78   =>   <12|34 5678
            range.length = range.start;
            range.start = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the free end of the selection to the beginning of the paragraph, or
       * since this is a single-line text field to the beginning of the line.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveParagraphBackwardAndModifySelection',
      value: function moveParagraphBackwardAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            // 12<34 56|78  =>  <1234 56|78
            range.length += range.start;
            range.start = 0;
            break;
          case Affinity.DOWNSTREAM:
            // 12|34 56>78  =>  12|34 5678
            range.length = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor to the beginning of the document.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfDocument',
      value: function moveToBeginningOfDocument(event) {
        // Since we only support a single line this is just an alias.
        this.moveToBeginningOfLine(event);
      }

      /**
       * Moves the selection start to the beginning of the document.
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfDocumentAndModifySelection',
      value: function moveToBeginningOfDocumentAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length += range.start;
        range.start = 0;
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor down, which because this is a single-line text field, means
       * moving to the end of the value.
       *
       * @example
       *     // Hey |guys
       *     moveDown(event)
       *     // Hey guys|
       *
       *     // |Hey| guys
       *     moveDown(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveDown',
      value: function moveDown(event) {
        this._handleEvent(event);
        // 12|34 56|78  =>  1234 5678|
        var range = {
          start: this.text().length,
          length: 0
        };
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the cursor up to the end of the current paragraph, which because this
       * is a single-line text field, means moving to the end of the value.
       *
       * @example
       *     // |Hey guys
       *     moveToEndOfParagraph(event)
       *     // Hey guys|
       *
       *     // Hey |guys|
       *     moveToEndOfParagraph(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfParagraph',
      value: function moveToEndOfParagraph(event) {
        this.moveDown(event);
      }

      /**
       * Moves the cursor down, keeping the current anchor point and extending the
       * selection to the end as moveDown would.
       *
       * @example
       *     // leftward selections are shrunk
       *     // Hey guys, <where| are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, where| are you?>
       *
       *     // rightward selections are extended
       *     // Hey guys, |where> are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, |where are you?>
       *
       *     // neutral selections are extended
       *     // Hey guys, |where| are you?
       *     moveDownAndModifySelection(event)
       *     // Hey guys, |where are you?>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveDownAndModifySelection',
      value: function moveDownAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var end = this.text().length;
        if (this.selectionAffinity === Affinity.UPSTREAM) {
          range.start += range.length;
        }
        range.length = end - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the free end of the selection to the end of the paragraph, or since
       * this is a single-line text field to the end of the line.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveParagraphForwardAndModifySelection',
      value: function moveParagraphForwardAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            // 12|34 56>78  =>  12|34 5678>
            range.length = this.text().length - range.start;
            break;
          case Affinity.UPSTREAM:
            // 12<34 56|78  =>  12|34 5678
            range.start += range.length;
            range.length = 0;
            break;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the cursor to the end of the document.
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfDocument',
      value: function moveToEndOfDocument(event) {
        // Since we only support a single line this is just an alias.
        this.moveToEndOfLine(event);
      }

      /**
       * Moves the selection end to the end of the document.
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfDocumentAndModifySelection',
      value: function moveToEndOfDocumentAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length = this.text().length - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Moves the cursor to the left, counting selections as a thing to move past.
       *
       * @example
       *     // no selection just moves the cursor left
       *     // Hey guys|
       *     moveLeft(event)
       *     // Hey guy|s
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveLeft(event)
       *     // Hey |guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveLeft',
      value: function moveLeft(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length !== 0) {
          range.length = 0;
        } else {
          range.start--;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the free end of the selection one to the left.
       *
       * @example
       *     // no selection just selects to the left
       *     // Hey guys|
       *     moveLeftAndModifySelection(event)
       *     // Hey guy<s|
       *
       *     // left selections are extended
       *     // Hey <guys|
       *     moveLeftAndModifySelection(event)
       *     // Hey< guys|
       *
       *     // right selections are shrunk
       *     // Hey |guys>
       *     moveLeftAndModifySelection(event)
       *     // Hey |guy>s
       *
       *     // neutral selections are extended
       *     // Hey |guys|
       *     moveLeftAndModifySelection(event)
       *     //Hey< guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveLeftAndModifySelection',
      value: function moveLeftAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.UPSTREAM;
            range.start--;
            range.length++;
            break;
          case Affinity.DOWNSTREAM:
            range.length--;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor left until the start of a word is found.
       *
       * @example
       *     // no selection just moves the cursor left
       *     // Hey guys|
       *     moveWordLeft(event)
       *     // Hey |guys
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveWordLeft(event)
       *     // |Hey guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordLeft',
      value: function moveWordLeft(event) {
        this._handleEvent(event);
        var index = this._lastWordBreakBeforeIndex(this.selectedRange().start - 1);
        this.setSelectedRange({ start: index, length: 0 });
      }

      /**
       * Moves the free end of the current selection to the beginning of the previous
       * word.
       *
       * @example
       *     // no selection just selects to the left
       *     // Hey guys|
       *     moveWordLeftAndModifySelection(event)
       *     // Hey <guys|
       *
       *     // left selections are extended
       *     // Hey <guys|
       *     moveWordLeftAndModifySelection(event)
       *     // <Hey guys|
       *
       *     // right selections are shrunk
       *     // |Hey guys>
       *     moveWordLeftAndModifySelection(event)
       *     // |Hey >guys
       *
       *     // neutral selections are extended
       *     // Hey |guys|
       *     moveWordLeftAndModifySelection(event)
       *     // <Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordLeftAndModifySelection',
      value: function moveWordLeftAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.UPSTREAM;
            var start = this._lastWordBreakBeforeIndex(range.start - 1);
            range.length += range.start - start;
            range.start = start;
            break;
          case Affinity.DOWNSTREAM:
            var end = this._lastWordBreakBeforeIndex(range.start + range.length);
            if (end < range.start) {
              end = range.start;
            }
            range.length -= range.start + range.length - end;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor to the beginning of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToBeginningOfLine(event)
       *     // |Hey guys, where are ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfLine',
      value: function moveToBeginningOfLine(event) {
        this._handleEvent(event);
        this.setSelectedRange({ start: 0, length: 0 });
      }

      /**
       * Select from the free end of the selection to the beginning of line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToBeginningOfLineAndModifySelection(event)
       *     // <Hey guys, where| are ya?
       *
       *     // Hey guys, where| are> ya?
       *     moveToBeginningOfLineAndModifySelection(event)
       *     // <Hey guys, where are| ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToBeginningOfLineAndModifySelection',
      value: function moveToBeginningOfLineAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length += range.start;
        range.start = 0;
        this.setSelectedRangeWithAffinity(range, Affinity.UPSTREAM);
      }

      /**
       * Moves the cursor to the right, counting selections as a thing to move past.
       *
       * @example
       *     // no selection just moves the cursor right
       *     // Hey guy|s
       *     moveRight(event)
       *     // Hey guys|
       *
       *     // selections are removed
       *     // Hey |guys|
       *     moveRight(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveRight',
      value: function moveRight(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        if (range.length !== 0) {
          range.start += range.length;
          range.length = 0;
        } else {
          range.start++;
        }
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Moves the free end of the selection one to the right.
       *
       * @example
       *     // no selection just selects to the right
       *     // Hey |guys
       *     moveRightAndModifySelection(event)
       *     // Hey |g>uys
       *
       *     // right selections are extended
       *     // Hey |gu>ys
       *     moveRightAndModifySelection(event)
       *     // Hey |guy>s
       *
       *     // left selections are shrunk
       *     // <Hey |guys
       *     moveRightAndModifySelection(event)
       *     // H<ey |guys
       *
       *     // neutral selections are extended
       *     // |Hey| guys
       *     moveRightAndModifySelection(event)
       *     // |Hey >guys
       *
       * @param {Event} event
       */
    }, {
      key: 'moveRightAndModifySelection',
      value: function moveRightAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            range.start++;
            range.length--;
            break;
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.DOWNSTREAM;
            range.length++;
            break;
        }
        this.setSelectedRange(range);
      }

      /**
       * Moves the cursor right until the end of a word is found.
       *
       * @example
       *     // no selection just moves the cursor right
       *     // Hey| guys
       *     moveWordRight(event)
       *     // Hey guys|
       *
       *     // selections are removed
       *     // |Hey| guys
       *     moveWordRight(event)
       *     // Hey guys|
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordRight',
      value: function moveWordRight(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var index = this._nextWordBreakAfterIndex(range.start + range.length);
        this.setSelectedRange({ start: index, length: 0 });
      }

      /**
       * Moves the free end of the current selection to the next end of word.
       *
       * @example
       *     // no selection just selects to the right
       *     // Hey |guys
       *     moveWordRightAndModifySelection(event)
       *     // Hey |guys|
       *
       *     // right selections are extended
       *     // Hey |g>uys
       *     moveWordRightAndModifySelection(event)
       *     // Hey |guys>
       *
       *     // left selections are shrunk
       *     // He<y |guys
       *     moveWordRightAndModifySelection(event)
       *     // Hey< |guys
       *
       *     // neutral selections are extended
       *     // He|y |guys
       *     moveWordRightAndModifySelection(event)
       *     // He|y guys>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveWordRightAndModifySelection',
      value: function moveWordRightAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        var start = range.start;
        var end = range.start + range.length;
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            start = Math.min(this._nextWordBreakAfterIndex(start), end);
            break;
          case Affinity.DOWNSTREAM:
          case Affinity.NONE:
            this.selectionAffinity = Affinity.DOWNSTREAM;
            end = this._nextWordBreakAfterIndex(range.start + range.length);
            break;
        }
        this.setSelectedRange({ start: start, length: end - start });
      }

      /**
       * Moves the cursor to the end of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToEndOfLine(event)
       *     // |Hey guys, where are ya?
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfLine',
      value: function moveToEndOfLine(event) {
        this._handleEvent(event);
        this.setSelectedRange({ start: this.text().length, length: 0 });
      }

      /**
       * Moves the free end of the selection to the end of the current line.
       *
       * @example
       *     // Hey guys, where| are ya?
       *     moveToEndOfLineAndModifySelection(event)
       *     // Hey guys, where| are ya?>
       *
       *     // Hey guys, <where| are ya?
       *     moveToEndOfLineAndModifySelection(event)
       *     // Hey guys, |where are ya?>
       *
       * @param {Event} event
       */
    }, {
      key: 'moveToEndOfLineAndModifySelection',
      value: function moveToEndOfLineAndModifySelection(event) {
        this._handleEvent(event);
        var range = this.selectedRange();
        range.length = this.text().length - range.start;
        this.setSelectedRangeWithAffinity(range, Affinity.DOWNSTREAM);
      }

      /**
       * Replaces the characters within the selection with given text.
       *
       * @example
       *     // 12|34567|8
       *     replaceSelection('00')
       *     // 12|00|8
       *
       * @param {string} replacement
       */
    }, {
      key: 'replaceSelection',
      value: function replaceSelection(replacement) {
        var range = this.selectedRange();
        var end = range.start + range.length;
        var text = this.text();
        text = text.substring(0, range.start) + replacement + text.substring(end);
        range.length = replacement.length;
        this.setText(text);
        this.setSelectedRangeWithAffinity(range, Affinity.NONE);
      }

      /**
       * Find ends of 'words' for navigational purposes.
       *
       * @example
       *     // given value of '123456789' and text of '123-45-6789'
       *     rightWordBreakIndexes()
       *     //=> [3, 5, 9]
       *
       * @returns {number[]}
       */
    }, {
      key: 'rightWordBreakIndexes',
      value: function rightWordBreakIndexes() {
        var result = [];
        var text = this.text();
        for (var i = 0, l = text.length; i < l; i++) {
          if (hasRightWordBreakAtIndex(text, i)) {
            result.push(i + 1);
          }
        }
        return result;
      }

      /**
       * Expands the selection to contain all the characters in the content.
       *
       * @example
       *     // 123|45678
       *     selectAll(event)
       *     // |12345678|
       *
       * @param {Event} event
       */
    }, {
      key: 'selectAll',
      value: function selectAll(event) {
        this._handleEvent(event);
        this.setSelectedRangeWithAffinity({
          start: 0,
          length: this.text().length
        }, Affinity.NONE);
      }

      /**
       * Gets the object value. This is the value that should be considered the
       * 'real' value of the field.
       *
       * @returns {String}
       */
    }, {
      key: 'text',
      value: function text() {
        return this._value;
      }

      /**
       * Sets the object value of the field.
       *
       * @param {string} value
       */
    }, {
      key: 'setText',
      value: function setText(value) {
        this._value = '' + value;
        this.setSelectedRange({
          start: this._value.length,
          length: 0
        });
      }

      /**
       * Gets the range of the current selection.
       *
       * @returns {Object} {start: number, length: number}
       */
    }, {
      key: 'selectedRange',
      value: function selectedRange() {
        return this._selectedRange;
      }

      /**
       * Sets the range of the current selection without changing the affinity.
       * @param {Object} range ({start: 0, length: 0})
       */
    }, {
      key: 'setSelectedRange',
      value: function setSelectedRange(range) {
        this.setSelectedRangeWithAffinity(range, this.selectionAffinity);
      }

      /**
       * Sets the range of the current selection and the selection affinity.
       *
       * @param {Object} range {start: number, length: number}
       * @param {Affinity} affinity
       * @returns {Object} {start: 0, length: 0}
       */
    }, {
      key: 'setSelectedRangeWithAffinity',
      value: function setSelectedRangeWithAffinity(range, affinity) {
        var min = 0;
        var max = this.text().length;
        var caret = {
          start: Math.max(min, Math.min(max, range.start)),
          end: Math.max(min, Math.min(max, range.start + range.length))
        };
        this._selectedRange = {
          start: caret.start,
          length: caret.end - caret.start
        };
        this.selectionAffinity = range.length === 0 ? Affinity.NONE : affinity;
        return this._selectedRange;
      }

      /**
       * Gets the position of the current selection's anchor point, i.e. the point
       * that the selection extends from, if any.
       *
       * @returns {number}
       */
    }, {
      key: 'selectionAnchor',
      value: function selectionAnchor() {
        var range = this.selectedRange();
        switch (this.selectionAffinity) {
          case Affinity.UPSTREAM:
            return range.start + range.length;
          case Affinity.DOWNSTREAM:
            return range.start;
          default:
            return Affinity.NONE;
        }
      }

      /**
       * Builds the key bindings for platform
       *
       * @TODO: Make this better
       * @private
       */
    }, {
      key: '_buildKeybindings',
      value: function _buildKeybindings() {
        var osx;

        if (typeof navigator !== 'undefined') {
          osx = /^Mozilla\/[\d\.]+ \(Macintosh/.test(navigator.userAgent);
        } else if (typeof process !== 'undefined') {
          osx = /darwin/.test(process.platform);
        }
        this._bindings = keyBindingsForPlatform(osx ? 'OSX' : 'Default');
      }

      /**
       * Handles the event based on the `shouldCancelEvents` prop.
       *
       * @param {Event} event
       * @private
       */
    }, {
      key: '_handleEvent',
      value: function _handleEvent(event) {
        if (event && this.shouldCancelEvents) {
          event.preventDefault();
        }
      }

      /**
       * Finds the start of the 'word' before index.
       *
       * @param {number} index position at which to start looking
       * @returns {number} index in value less than or equal to the given index
       * @private
       */
    }, {
      key: '_lastWordBreakBeforeIndex',
      value: function _lastWordBreakBeforeIndex(index) {
        var indexes = this._leftWordBreakIndexes();
        var result = indexes[0];
        for (var i = 0, l = indexes.length; i < l; i++) {
          var wordBreakIndex = indexes[i];
          if (index > wordBreakIndex) {
            result = wordBreakIndex;
          } else {
            break;
          }
        }
        return result;
      }

      /**
       * Find starts of 'words' for navigational purposes.
       *
       * @example
       *     // given value of '123456789' and text of '123-45-6789'
       *     leftWordBreakIndexes()
       *     // => [0, 3, 5]
       *
       * @returns {number[]} indexes in value of word starts.
       * @private
       */
    }, {
      key: '_leftWordBreakIndexes',
      value: function _leftWordBreakIndexes() {
        var result = [];
        var text = this.text();
        for (var i = 0, l = text.length; i < l; i++) {
          if (hasLeftWordBreakAtIndex(text, i)) {
            result.push(i);
          }
        }
        return result;
      }

      /**
       * Finds the end of the 'word' after index.
       *
       * @param {number} index position in value at which to start looking.
       * @returns {number}
       * @private
       */
    }, {
      key: '_nextWordBreakAfterIndex',
      value: function _nextWordBreakAfterIndex(index) {
        var indexes = this.rightWordBreakIndexes().reverse();
        var result = indexes[0];
        for (var i = 0, l = indexes.length; i < l; i++) {
          var wordBreakIndex = indexes[i];
          if (index < wordBreakIndex) {
            result = wordBreakIndex;
          } else {
            break;
          }
        }
        return result;
      }
    }]);

    return Input;
  })();

  exports.Input = Input;
  exports.KEYS = KEYS;
  exports.keyBindingsForPlatform = keyBindingsForPlatform;
});


}).call(this,require('_process'))
},{"_process":1}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('stround', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.stround = mod.exports;
  }
})(this, function (exports) {
  /* jshint sub:true, esnext:true, undef:true, unused:true */

  /**
   * Enum for the available rounding modes.
   *
   * @enum {number}
   */
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.parse = parse;
  exports.format = format;
  exports.shiftParts = shiftParts;
  exports.shift = shift;
  exports.round = round;
  var modes = {
    CEILING: 0,
    FLOOR: 1,
    DOWN: 2,
    UP: 3,
    HALF_EVEN: 4,
    HALF_DOWN: 5,
    HALF_UP: 6
  };

  exports.modes = modes;
  /**
   * @const
   * @private
   */
  var NEG = '-';

  /**
   * @const
   * @private
   */
  var SEP = '.';

  /**
   * @const
   * @private
   */
  var NEG_PATTERN = '-';

  /**
   * @const
   * @private
   */
  var SEP_PATTERN = '\\.';

  /**
   * @const
   * @private
   */
  var NUMBER_PATTERN = new RegExp('^(' + NEG_PATTERN + ')?(\\d*)(?:' + SEP_PATTERN + '(\\d*))?$');

  /**
   * Increments the given integer represented by a string by one.
   *
   * @example
   *
   *   increment('1');  // '2'
   *   increment('99'); // '100'
   *   increment('');   // '1'
   *
   * @param {string} strint
   * @return {string}
   * @private
   */
  function increment(strint) {
    var length = strint.length;

    if (length === 0) {
      return '1';
    }

    var last = parseInt(strint[length - 1], 10);

    if (last === 9) {
      return increment(strint.slice(0, length - 1)) + '0';
    } else {
      return strint.slice(0, length - 1) + (last + 1);
    }
  }

  /**
   * Parses the given decimal string into its component parts.
   *
   * @example
   *
   *   stround.parse('3.14');  // [false, '3', '14']
   *   stround.parse('-3.45'); // [true, '3', '45']
   *
   * @param {string} strnum
   * @return {?Array}
   */

  function parse(strnum) {
    switch (strnum) {
      case 'NaN':case 'Infinity':case '-Infinity':
        return null;
    }

    var match = strnum.match(NUMBER_PATTERN);

    if (!match) {
      throw new Error('cannot round malformed number: ' + strnum);
    }

    return [match[1] !== undefined, match[2], match[3] || ''];
  }

  /**
   * Format the given number configuration as a number string.
   *
   * @example
   *
   *   stround.format([false, '12', '34']); // '12.34'
   *   stround.format([true, '8', '']);     // '-8'
   *   stround.format([true, '', '7']);     // '-0.7'
   *
   * @param {Array} parts
   * @return {string}
   */

  function format(_ref) {
    var _ref2 = _slicedToArray(_ref, 3);

    var negative = _ref2[0];
    var intPart = _ref2[1];
    var fracPart = _ref2[2];

    if (intPart.length === 0) {
      intPart = '0';
    } else {
      var firstNonZeroIndex = undefined;
      for (firstNonZeroIndex = 0; firstNonZeroIndex < intPart.length; firstNonZeroIndex++) {
        if (intPart[firstNonZeroIndex] !== '0') {
          break;
        }
      }

      if (firstNonZeroIndex !== intPart.length) {
        intPart = intPart.slice(firstNonZeroIndex);
      }
    }

    return (negative ? NEG + intPart : intPart) + (fracPart.length ? SEP + fracPart : '');
  }

  /**
   * Shift the exponent of the given number (in parts) by the given amount.
   *
   * @example
   *
   *   stround.shiftParts([false, '12', ''], 2);  // [false, '1200', '']
   *   stround.shiftParts([false, '12', ''], -2); // [false, '', '12']
   *
   * @param {Array} parts
   * @param {number} exponent
   * @return {Array}
   */

  function shiftParts(_ref3, exponent) {
    var _ref32 = _slicedToArray(_ref3, 3);

    var negative = _ref32[0];
    var intPart = _ref32[1];
    var fracPart = _ref32[2];

    var partToMove = undefined;

    if (exponent > 0) {
      partToMove = fracPart.slice(0, exponent);
      while (partToMove.length < exponent) {
        partToMove += '0';
      }
      intPart += partToMove;
      fracPart = fracPart.slice(exponent);
    } else if (exponent < 0) {
      while (intPart.length < -exponent) {
        intPart = '0' + intPart;
      }
      partToMove = intPart.slice(intPart.length + exponent);
      fracPart = partToMove + fracPart;
      intPart = intPart.slice(0, intPart.length - partToMove.length);
    }

    return [negative, intPart, fracPart];
  }

  /**
   * Shift the exponent of the given number (as a string) by the given amount.
   *
   *   shift('12', 2);  // '1200'
   *   shift('12', -2); // '0.12'
   *
   * @param {string|number} strnum
   * @param {number} exponent
   * @return {string}
   */

  function shift(strnum, exponent) {
    if (typeof strnum === 'number') {
      strnum = '' + strnum;
    }

    var parsed = parse(strnum);
    if (parsed === null) {
      return strnum;
    } else {
      return format(shiftParts(parsed, exponent));
    }
  }

  /**
   * Round the given number represented by a string according to the given
   * precision and mode.
   *
   * @param {string|number} strnum
   * @param {number|null|undefined=} precision
   * @param {modes=} mode
   * @return {string}
   */

  function round(strnum, precision, mode) {
    if (typeof strnum === 'number') {
      strnum = '' + strnum;
    }

    if (typeof strnum !== 'string') {
      throw new Error('expected a string or number, got: ' + strnum);
    }

    if (strnum.length === 0) {
      return strnum;
    }

    if (precision === null || precision === undefined) {
      precision = 0;
    }

    if (mode === undefined) {
      mode = modes.HALF_EVEN;
    }

    var parsed = parse(strnum);

    if (parsed === null) {
      return strnum;
    }

    if (precision > 0) {
      parsed = shiftParts(parsed, precision);
    }

    var _parsed = parsed;

    var _parsed2 = _slicedToArray(_parsed, 3);

    var negative = _parsed2[0];
    var intPart = _parsed2[1];
    var fracPart = _parsed2[2];

    switch (mode) {
      case modes.CEILING:case modes.FLOOR:case modes.UP:
        var foundNonZeroDigit = false;
        for (var i = 0, _length = fracPart.length; i < _length; i++) {
          if (fracPart[i] !== '0') {
            foundNonZeroDigit = true;
            break;
          }
        }
        if (foundNonZeroDigit) {
          if (mode === modes.UP || negative !== (mode === modes.CEILING)) {
            intPart = increment(intPart);
          }
        }
        break;

      case modes.HALF_EVEN:case modes.HALF_DOWN:case modes.HALF_UP:
        var shouldRoundUp = false;
        var firstFracPartDigit = parseInt(fracPart[0], 10);

        if (firstFracPartDigit > 5) {
          shouldRoundUp = true;
        } else if (firstFracPartDigit === 5) {
          if (mode === modes.HALF_UP) {
            shouldRoundUp = true;
          }

          if (!shouldRoundUp) {
            for (var i = 1, _length2 = fracPart.length; i < _length2; i++) {
              if (fracPart[i] !== '0') {
                shouldRoundUp = true;
                break;
              }
            }
          }

          if (!shouldRoundUp && mode === modes.HALF_EVEN) {
            var lastIntPartDigit = parseInt(intPart[intPart.length - 1], 10);
            shouldRoundUp = lastIntPartDigit % 2 !== 0;
          }
        }

        if (shouldRoundUp) {
          intPart = increment(intPart);
        }
        break;
    }

    return format(shiftParts([negative, intPart, ''], -precision));
  }
});

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _amex_card_formatter = require('./amex_card_formatter');

var _amex_card_formatter2 = _interopRequireDefault(_amex_card_formatter);

var _default_card_formatter = require('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

var _card_utils = require('./card_utils');

/**
 * AdaptiveCardFormatter will decide if it needs to use
 * {@link AmexCardFormatter} or {@link DefaultCardFormatter}.
 */

var AdaptiveCardFormatter = (function () {
  function AdaptiveCardFormatter() {
    _classCallCheck(this, AdaptiveCardFormatter);

    /** @private */
    this.amexCardFormatter = new _amex_card_formatter2['default']();
    /** @private */
    this.defaultCardFormatter = new _default_card_formatter2['default']();
    /** @private */
    this.formatter = this.defaultCardFormatter;
  }

  /**
   * Will pick the right formatter based on the `pan` and will return the
   * formatted string.
   *
   * @param {string} pan
   * @returns {string} formatted string
   */

  _createClass(AdaptiveCardFormatter, [{
    key: 'format',
    value: function format(pan) {
      return this._formatterForPan(pan).format(pan);
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      return this.formatter.parse(text, error);
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(!string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      this.formatter = this._formatterForPan(change.proposed.text);
      return this.formatter.isChangeValid(change, error);
    }

    /**
     * Decides which formatter to use.
     *
     * @param {string} pan
     * @returns {Formatter}
     * @private
     */
  }, {
    key: '_formatterForPan',
    value: function _formatterForPan(pan) {
      if ((0, _card_utils.determineCardType)(pan.replace(/[^\d]+/g, '')) === _card_utils.AMEX) {
        return this.amexCardFormatter;
      } else {
        return this.defaultCardFormatter;
      }
    }
  }]);

  return AdaptiveCardFormatter;
})();

exports['default'] = AdaptiveCardFormatter;
module.exports = exports['default'];

},{"./amex_card_formatter":5,"./card_utils":7,"./default_card_formatter":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default_card_formatter = require('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

/**
 * Amex credit card formatter.
 *
 * @extends DefaultCardFormatter
 */

var AmexCardFormatter = (function (_DefaultCardFormatter) {
  _inherits(AmexCardFormatter, _DefaultCardFormatter);

  function AmexCardFormatter() {
    _classCallCheck(this, AmexCardFormatter);

    _get(Object.getPrototypeOf(AmexCardFormatter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(AmexCardFormatter, [{
    key: 'hasDelimiterAtIndex',

    /**
     * @override
     */
    value: function hasDelimiterAtIndex(index) {
      return index === 4 || index === 11;
    }

    /**
     * @override
     */
  }, {
    key: 'maximumLength',
    get: function get() {
      return 15 + 2;
    }
  }]);

  return AmexCardFormatter;
})(_default_card_formatter2['default']);

exports['default'] = AmexCardFormatter;
module.exports = exports['default'];

},{"./default_card_formatter":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _text_field = require('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _adaptive_card_formatter = require('./adaptive_card_formatter');

var _adaptive_card_formatter2 = _interopRequireDefault(_adaptive_card_formatter);

var _card_utils = require('./card_utils');

/**
 * Enum for card mask strategies.
 *
 * @readonly
 * @enum {number}
 * @private
 */
var CardMaskStrategy = {
  None: 'None',
  DoneEditing: 'DoneEditing'
};

/**
 * CardTextField add some functionality for credit card inputs
 *
 * @extends TextField
 */

var CardTextField = (function (_TextField) {
  _inherits(CardTextField, _TextField);

  /**
   * @param {HTMLElement} element
   */

  function CardTextField(element) {
    _classCallCheck(this, CardTextField);

    _get(Object.getPrototypeOf(CardTextField.prototype), 'constructor', this).call(this, element, new _adaptive_card_formatter2['default']());
    this.setCardMaskStrategy(CardMaskStrategy.None);

    /**
     * Whether we are currently masking the displayed text.
     *
     * @private
     */
    this._masked = false;

    /**
     * Whether we are currently editing.
     *
     * @private
     */
    this._editing = false;
  }

  /**
   * Gets the card type for the current value.
   *
   * @returns {string} Returns one of 'visa', 'mastercard', 'amex' and 'discover'.
   */

  _createClass(CardTextField, [{
    key: 'cardType',
    value: function cardType() {
      return (0, _card_utils.determineCardType)(this.value());
    }

    /**
     * Gets the type of masking this field uses.
     *
     * @returns {CardMaskStrategy}
     */
  }, {
    key: 'cardMaskStrategy',
    value: function cardMaskStrategy() {
      return this._cardMaskStrategy;
    }

    /**
     * Sets the type of masking this field uses.
     *
     * @param {CardMaskStrategy} cardMaskStrategy One of CardMaskStrategy.
     */
  }, {
    key: 'setCardMaskStrategy',
    value: function setCardMaskStrategy(cardMaskStrategy) {
      if (cardMaskStrategy !== this._cardMaskStrategy) {
        this._cardMaskStrategy = cardMaskStrategy;
        this._syncMask();
      }
    }

    /**
     * Returns a masked version of the current formatted PAN. Example:
     *
     * @example
     *     field.setText('4111 1111 1111 1111');
     *     field.cardMask(); // "•••• •••• •••• 1111"
     *
     * @returns {string} Returns a masked card string.
     */
  }, {
    key: 'cardMask',
    value: function cardMask() {
      var text = this.text();
      var last4 = text.slice(-4);
      var toMask = text.slice(0, -4);

      return toMask.replace(/\d/g, '•') + last4;
    }

    /**
     * Gets the formatted PAN for this field.
     *
     * @returns {string}
     */
  }, {
    key: 'text',
    value: function text() {
      if (this._masked) {
        return this._unmaskedText;
      } else {
        return _get(Object.getPrototypeOf(CardTextField.prototype), 'text', this).call(this);
      }
    }

    /**
     * Sets the formatted PAN for this field.
     *
     * @param {string} text A formatted PAN.
     */
  }, {
    key: 'setText',
    value: function setText(text) {
      if (this._masked) {
        this._unmaskedText = text;
        text = this.cardMask();
      }
      _get(Object.getPrototypeOf(CardTextField.prototype), 'setText', this).call(this, text);
    }

    /**
     * Called by our superclass, used to implement card masking.
     *
     * @private
     */
  }, {
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {
      this._editing = false;
      this._syncMask();
    }

    /**
     * Called by our superclass, used to implement card masking.
     *
     * @private
     */
  }, {
    key: 'textFieldDidBeginEditing',
    value: function textFieldDidBeginEditing() {
      this._editing = true;
      this._syncMask();
    }

    /**
     * Enables masking if it is not already enabled.
     *
     * @private
     */
  }, {
    key: '_enableMasking',
    value: function _enableMasking() {
      if (!this._masked) {
        this._unmaskedText = this.text();
        this._masked = true;
        this.setText(this._unmaskedText);
      }
    }

    /**
     * Disables masking if it is currently enabled.
     *
     * @private
     */
  }, {
    key: '_disableMasking',
    value: function _disableMasking() {
      if (this._masked) {
        this._masked = false;
        this.setText(this._unmaskedText);
        this._unmaskedText = null;
      }
    }

    /**
     * Enables or disables masking based on the mask settings.
     *
     * @private
     */
  }, {
    key: '_syncMask',
    value: function _syncMask() {
      if (this.cardMaskStrategy() === CardMaskStrategy.DoneEditing) {
        if (this._editing) {
          this._disableMasking();
        } else {
          this._enableMasking();
        }
      }
    }

    /**
     * Enum for card mask strategies.
     *
     * @readonly
     * @enum {number}
     */
  }], [{
    key: 'CardMaskStrategy',
    get: function get() {
      return CardMaskStrategy;
    }
  }]);

  return CardTextField;
})(_text_field2['default']);

exports['default'] = CardTextField;
module.exports = exports['default'];

},{"./adaptive_card_formatter":4,"./card_utils":7,"./text_field":21}],7:[function(require,module,exports){
/**
 * @TODO Make this an enum
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.determineCardType = determineCardType;
exports.luhnCheck = luhnCheck;
exports.validCardLength = validCardLength;
var AMEX = 'amex';
exports.AMEX = AMEX;
var DISCOVER = 'discover';
exports.DISCOVER = DISCOVER;
var JCB = 'jcb';
exports.JCB = JCB;
var MASTERCARD = 'mastercard';
exports.MASTERCARD = MASTERCARD;
var VISA = 'visa';

exports.VISA = VISA;
/**
 * Pass in a credit card number and it'll return the
 * type of card it is.
 *
 * @param {string} pan
 * @returns {?string} returns the type of card based in the digits
 */

function determineCardType(pan) {
  if (pan === null || pan === undefined) {
    return null;
  }

  pan = pan.toString();
  var firsttwo = parseInt(pan.slice(0, 2), 10);
  var iin = parseInt(pan.slice(0, 6), 10);
  var halfiin = parseInt(pan.slice(0, 3), 10);

  if (pan[0] === '4') {
    return VISA;
  } else if (pan.slice(0, 4) === '6011' || firsttwo === 65 || halfiin >= 664 && halfiin <= 649 || iin >= 622126 && iin <= 622925) {
    return DISCOVER;
  } else if (pan.slice(0, 4) === '2131' || pan.slice(0, 4) === '1800' || firsttwo === 35) {
    return JCB;
  } else if (firsttwo >= 51 && firsttwo <= 55) {
    return MASTERCARD;
  } else if (firsttwo === 34 || firsttwo === 37) {
    return AMEX;
  }
}

/**
 * Pass in a credit card number and it'll return if it
 * passes the [luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm)
 *
 * @param {string} pan
 * @returns {boolean}
 */

function luhnCheck(pan) {
  var sum = 0;
  var flip = true;
  for (var i = pan.length - 1; i >= 0; i--) {
    var digit = parseInt(pan.charAt(i), 10);
    sum += (flip = !flip) ? Math.floor(digit * 2 / 10) + Math.floor(digit * 2 % 10) : digit;
  }

  return sum % 10 === 0;
}

/**
 * Pass in a credit card number and it'll return if it
 * is a valid length for that type. If it doesn't know the
 * type it'll return false
 *
 * @param {string} pan
 * @returns {boolean}
 */

function validCardLength(pan) {
  switch (determineCardType(pan)) {
    case VISA:
      return pan.length === 13 || pan.length === 16;
    case DISCOVER:case MASTERCARD:
      return pan.length === 16;
    case JCB:
      return pan.length === 15 || pan.length === 16;
    case AMEX:
      return pan.length === 15;
    default:
      return false;
  }
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var getCaret = undefined;
var setCaret = undefined;

if (!document) {
  throw new Error('Caret does not have access to document');
} else if ('selectionStart' in document.createElement('input')) {
  exports.getCaret = getCaret = function (element) {
    return {
      start: element.selectionStart,
      end: element.selectionEnd
    };
  };
  exports.setCaret = setCaret = function (element, start, end) {
    element.selectionStart = start;
    element.selectionEnd = end;
  };
} else if (document.selection) {
  exports.getCaret = getCaret = function (element) {
    var value = element.value;
    var range = selection.createRange().duplicate();

    range.moveEnd('character', value.length);

    var start = range.text === '' ? value.length : value.lastIndexOf(range.text);
    range = selection.createRange().duplicate();

    range.moveStart('character', -value.length);

    var end = range.text.length;
    return { start: start, end: end };
  };
  exports.setCaret = setCaret = function (element, start, end) {
    var range = element.createTextRange();
    range.collapse(true);
    range.moveStart('character', start);
    range.moveEnd('character', end - start);
    range.select();
  };
} else {
  throw new Error('Caret unknown input selection capabilities');
}

exports.getCaret = getCaret;
exports.setCaret = setCaret;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _card_utils = require('./card_utils');

/**
 * A generic credit card formatter.
 *
 * @extends DelimitedTextFormatter
 */

var DefaultCardFormatter = (function (_DelimitedTextFormatter) {
  _inherits(DefaultCardFormatter, _DelimitedTextFormatter);

  function DefaultCardFormatter() {
    _classCallCheck(this, DefaultCardFormatter);

    _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), 'constructor', this).call(this, ' ');
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(DefaultCardFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 4 || index === 9 || index === 14;
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      var value = this._valueFromText(text);
      if (typeof error === 'function') {
        if (!(0, _card_utils.validCardLength)(value)) {
          error('card-formatter.number-too-short');
        }
        if (!(0, _card_utils.luhnCheck)(value)) {
          error('card-formatter.invalid-number');
        }
      }
      return _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), 'parse', this).call(this, text, error);
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     * @private
     */
  }, {
    key: '_valueFromText',
    value: function _valueFromText(text) {
      return _get(Object.getPrototypeOf(DefaultCardFormatter.prototype), '_valueFromText', this).call(this, (text || '').replace(/[^\d]/g, ''));
    }

    /**
     * Gets the maximum length of a formatted default card number.
     *
     * @returns {number}
     */
  }, {
    key: 'maximumLength',
    get: function get() {
      return 16 + 3;
    }
  }]);

  return DefaultCardFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = DefaultCardFormatter;
module.exports = exports['default'];

},{"./card_utils":7,"./delimited_text_formatter":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

/**
 * A generic delimited formatter.
 *
 * @extends Formatter
 */

var DelimitedTextFormatter = (function (_Formatter) {
  _inherits(DelimitedTextFormatter, _Formatter);

  /**
   * @param {string=} delimiter
   * @param {boolean=} isLazy
   * @throws {Error} delimiter must have just one character
   */

  function DelimitedTextFormatter(delimiter) {
    var isLazy = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, DelimitedTextFormatter);

    _get(Object.getPrototypeOf(DelimitedTextFormatter.prototype), 'constructor', this).call(this);

    if (arguments.length === 0) {
      return;
    }

    if (delimiter === null || delimiter === undefined || delimiter.length !== 1) {
      throw new Error('delimiter must have just one character');
    }
    this.delimiter = delimiter;

    // If the formatter is lazy, delimiter will not be added until input has gone
    // past the delimiter index. Useful for 'optional' extension, like zip codes.
    // 94103  ->  type '1'  ->  94103-1
    this.isLazy = isLazy;
  }

  /**
   * Determines the delimiter character at the given index.
   *
   * @param {number} index
   * @returns {?string}
   */

  _createClass(DelimitedTextFormatter, [{
    key: 'delimiterAt',
    value: function delimiterAt(index) {
      if (!this.hasDelimiterAtIndex(index)) {
        return null;
      }
      return this.delimiter;
    }

    /**
     * Determines whether the given character is a delimiter.
     *
     * @param {string} chr
     * @returns {boolean}
     */
  }, {
    key: 'isDelimiter',
    value: function isDelimiter(chr) {
      return chr === this.delimiter;
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      return this._textFromValue(value);
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     * @private
     */
  }, {
    key: '_textFromValue',
    value: function _textFromValue(value) {
      if (!value) {
        return '';
      }

      var result = '';
      var delimiter = undefined;
      var maximumLength = this.maximumLength;

      for (var i = 0, l = value.length; i < l; i++) {
        while (delimiter = this.delimiterAt(result.length)) {
          result += delimiter;
        }
        result += value[i];
        if (!this.isLazy) {
          while (delimiter = this.delimiterAt(result.length)) {
            result += delimiter;
          }
        }
      }

      if (maximumLength !== undefined && maximumLength !== null) {
        return result.slice(0, maximumLength);
      } else {
        return result;
      }
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     */
  }, {
    key: 'parse',
    value: function parse(text) {
      return this._valueFromText(text);
    }

    /**
     * Parses the given text by removing delimiters.
     *
     * @param {?string} text
     * @returns {string}
     * @private
     */
  }, {
    key: '_valueFromText',
    value: function _valueFromText(text) {
      if (!text) {
        return '';
      }
      var result = '';
      for (var i = 0, l = text.length; i < l; i++) {
        if (!this.isDelimiter(text[i])) {
          result += text[i];
        }
      }
      return result;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (!_get(Object.getPrototypeOf(DelimitedTextFormatter.prototype), 'isChangeValid', this).call(this, change, error)) {
        return false;
      }

      var newText = change.proposed.text;
      var range = change.proposed.selectedRange;
      var hasSelection = range.length !== 0;

      var startMovedLeft = range.start < change.current.selectedRange.start;
      var startMovedRight = range.start > change.current.selectedRange.start;
      var endMovedLeft = range.start + range.length < change.current.selectedRange.start + change.current.selectedRange.length;
      var endMovedRight = range.start + range.length > change.current.selectedRange.start + change.current.selectedRange.length;

      var startMovedOverADelimiter = startMovedLeft && this.hasDelimiterAtIndex(range.start) || startMovedRight && this.hasDelimiterAtIndex(range.start - 1);
      var endMovedOverADelimiter = endMovedLeft && this.hasDelimiterAtIndex(range.start + range.length) || endMovedRight && this.hasDelimiterAtIndex(range.start + range.length - 1);

      if (this.isDelimiter(change.deleted.text)) {
        var newCursorPosition = change.deleted.start - 1;
        // delete any immediately preceding delimiters
        while (this.isDelimiter(newText.charAt(newCursorPosition))) {
          newText = newText.substring(0, newCursorPosition) + newText.substring(newCursorPosition + 1);
          newCursorPosition--;
        }
        // finally delete the real character that was intended
        newText = newText.substring(0, newCursorPosition) + newText.substring(newCursorPosition + 1);
      }

      // adjust the cursor / selection
      if (startMovedLeft && startMovedOverADelimiter) {
        // move left over any immediately preceding delimiters
        while (this.delimiterAt(range.start - 1)) {
          range.start--;
          range.length++;
        }
        // finally move left over the real intended character
        range.start--;
        range.length++;
      }

      if (startMovedRight) {
        // move right over any delimiters found on the way, including any leading delimiters
        for (var i = change.current.selectedRange.start; i < range.start + range.length; i++) {
          if (this.delimiterAt(i)) {
            range.start++;
            if (range.length > 0) {
              range.length--;
            }
          }
        }

        while (this.delimiterAt(range.start)) {
          range.start++;
          range.length--;
        }
      }

      if (hasSelection) {
        // Otherwise, the logic for the range start takes care of everything.
        if (endMovedOverADelimiter) {
          if (endMovedLeft) {
            // move left over any immediately preceding delimiters
            while (this.delimiterAt(range.start + range.length - 1)) {
              range.length--;
            }
            // finally move left over the real intended character
            range.length--;
          }

          if (endMovedRight) {
            // move right over any immediately following delimiters
            while (this.delimiterAt(range.start + range.length)) {
              range.length++;
            }
            // finally move right over the real intended character
            range.length++;
          }
        }

        // trailing delimiters in the selection
        while (this.hasDelimiterAtIndex(range.start + range.length - 1)) {
          if (startMovedLeft || endMovedLeft) {
            range.length--;
          } else {
            range.length++;
          }
        }

        while (this.hasDelimiterAtIndex(range.start)) {
          if (startMovedRight || endMovedRight) {
            range.start++;
            range.length--;
          } else {
            range.start--;
            range.length++;
          }
        }
      } else {
        range.length = 0;
      }

      var result = true;

      var value = this._valueFromText(newText, function () {
        result = false;
        error.apply(undefined, arguments);
      });

      if (result) {
        change.proposed.text = this._textFromValue(value);
      }

      return result;
    }
  }]);

  return DelimitedTextFormatter;
})(_formatter2['default']);

exports['default'] = DelimitedTextFormatter;
module.exports = exports['default'];

},{"./formatter":15}],11:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('./');

var _2 = _interopRequireDefault(_);

if (typeof define === 'function' && define.amd) {
  define(function () {
    return _2['default'];
  });
} else if (typeof window !== 'undefined') {
  window.FieldKit = _2['default'];
}

module.exports = _2['default'];

},{"./":16}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var EmployerIdentificationNumberFormatter = (function (_DelimitedTextFormatter) {
  _inherits(EmployerIdentificationNumberFormatter, _DelimitedTextFormatter);

  function EmployerIdentificationNumberFormatter() {
    _classCallCheck(this, EmployerIdentificationNumberFormatter);

    _get(Object.getPrototypeOf(EmployerIdentificationNumberFormatter.prototype), 'constructor', this).call(this, '-');
    this.maximumLength = 9 + 1;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(EmployerIdentificationNumberFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 2;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(Object.getPrototypeOf(EmployerIdentificationNumberFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }
  }]);

  return EmployerIdentificationNumberFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = EmployerIdentificationNumberFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _text_field = require('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _expiry_date_formatter = require('./expiry_date_formatter');

var _expiry_date_formatter2 = _interopRequireDefault(_expiry_date_formatter);

/**
 * Adds a default formatter for expiration dates.
 *
 * @extends TextField
 */

var ExpiryDateField = (function (_TextField) {
  _inherits(ExpiryDateField, _TextField);

  /**
   * @param {HTMLElement} element
   */

  function ExpiryDateField(element) {
    _classCallCheck(this, ExpiryDateField);

    _get(Object.getPrototypeOf(ExpiryDateField.prototype), 'constructor', this).call(this, element, new _expiry_date_formatter2['default']());
  }

  /**
   * Called by our superclass, used to post-process the text.
   *
   * @private
   */

  _createClass(ExpiryDateField, [{
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {
      var value = this.value();
      if (value) {
        this.setText(this.formatter().format(value));
      }
    }
  }]);

  return ExpiryDateField;
})(_text_field2['default']);

exports['default'] = ExpiryDateField;
module.exports = exports['default'];

},{"./expiry_date_formatter":14,"./text_field":21}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _utils = require('./utils');

/**
 * Give this function a 2 digit year it'll return with 4.
 *
 * @example
 *     interpretTwoDigitYear(15);
 *     // => 2015
 *     interpretTwoDigitYear(97);
 *     // => 1997
 * @param {number} year
 * @returns {number}
 * @private
 */
function interpretTwoDigitYear(year) {
  var thisYear = new Date().getFullYear();
  var thisCentury = thisYear - thisYear % 100;
  var centuries = [thisCentury, thisCentury - 100, thisCentury + 100].sort(function (a, b) {
    return Math.abs(thisYear - (year + a)) - Math.abs(thisYear - (year + b));
  });
  return year + centuries[0];
}

/**
 * @extends DelimitedTextFormatter
 */

var ExpiryDateFormatter = (function (_DelimitedTextFormatter) {
  _inherits(ExpiryDateFormatter, _DelimitedTextFormatter);

  function ExpiryDateFormatter() {
    _classCallCheck(this, ExpiryDateFormatter);

    _get(Object.getPrototypeOf(ExpiryDateFormatter.prototype), 'constructor', this).call(this, '/');
    this.maximumLength = 5;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(ExpiryDateFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 2;
    }

    /**
     * Formats the given value by adding delimiters where needed.
     *
     * @param {?string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      if (!value) {
        return '';
      }

      var month = value.month;
      var year = value.year;

      year = year % 100;

      return _get(Object.getPrototypeOf(ExpiryDateFormatter.prototype), 'format', this).call(this, (0, _utils.zpad2)(month) + (0, _utils.zpad2)(year));
    }

    /**
     * Parses the given text
     *
     * @param {string} text
     * @param {Function(string)} error
     * @returns {?Object} { month: month, year: year }
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      var monthAndYear = text.split(this.delimiter);
      var month = monthAndYear[0];
      var year = monthAndYear[1];
      if (month && month.match(/^(0?[1-9]|1\d)$/) && year && year.match(/^\d\d?$/)) {
        month = Number(month);
        year = interpretTwoDigitYear(Number(year));
        return { month: month, year: year };
      } else {
        if (typeof error === 'function') {
          error('expiry-date-formatter.invalid-date');
        }
        return null;
      }
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (!error) {
        error = function () {};
      }

      var isBackspace = change.proposed.text.length < change.current.text.length;
      var newText = change.proposed.text;

      if (isBackspace) {
        if (change.deleted.text === this.delimiter) {
          newText = newText[0];
        }
        if (newText === '0') {
          newText = '';
        }
        if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
          error('expiry-date-formatter.only-digits-allowed');
          return false;
        }
      } else if (change.inserted.text === this.delimiter && change.current.text === '1') {
        newText = '01' + this.delimiter;
      } else if (change.inserted.text.length > 0 && !/^\d$/.test(change.inserted.text)) {
        error('expiry-date-formatter.only-digits-allowed');
        return false;
      } else {
        // 4| -> 04|
        if (/^[2-9]$/.test(newText)) {
          newText = '0' + newText;
        }

        // 15| -> 1|
        if (/^1[3-9]$/.test(newText)) {
          error('expiry-date-formatter.invalid-month');
          return false;
        }

        // Don't allow 00
        if (newText === '00') {
          error('expiry-date-formatter.invalid-month');
          return false;
        }

        // 11| -> 11/
        if (/^(0[1-9]|1[0-2])$/.test(newText)) {
          newText += this.delimiter;
        }

        var match = newText.match(/^(\d\d)(.)(\d\d?).*$/);
        if (match && match[2] === this.delimiter) {
          newText = match[1] + this.delimiter + match[3];
        }
      }

      change.proposed.text = newText;
      change.proposed.selectedRange = { start: newText.length, length: 0 };

      return true;
    }
  }]);

  return ExpiryDateFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = ExpiryDateFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10,"./utils":23}],15:[function(require,module,exports){
/**
 * Base class providing basic formatting, parsing, and change validation to be
 * customized in subclasses.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Formatter = (function () {
  function Formatter() {
    _classCallCheck(this, Formatter);
  }

  _createClass(Formatter, [{
    key: 'format',

    /**
     * @param {string} text
     * @returns {string}
     */
    value: function format(text) {
      if (text === undefined || text === null) {
        text = '';
      }
      if (this.maximumLength !== undefined && this.maximumLength !== null) {
        text = text.substring(0, this.maximumLength);
      }
      return text;
    }

    /**
     * @param {string} text
     * @returns {string}
     */
  }, {
    key: 'parse',
    value: function parse(text) {
      if (text === undefined || text === null) {
        text = '';
      }
      if (this.maximumLength !== undefined && this.maximumLength !== null) {
        text = text.substring(0, this.maximumLength);
      }
      return text;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change) {
      var selectedRange = change.proposed.selectedRange;
      var text = change.proposed.text;
      if (this.maximumLength !== undefined && this.maximumLength !== null && text.length > this.maximumLength) {
        var available = this.maximumLength - (text.length - change.inserted.text.length);
        var newText = change.current.text.substring(0, change.current.selectedRange.start);
        if (available > 0) {
          newText += change.inserted.text.substring(0, available);
        }
        newText += change.current.text.substring(change.current.selectedRange.start + change.current.selectedRange.length);
        var truncatedLength = text.length - newText.length;
        change.proposed.text = newText;
        selectedRange.start -= truncatedLength;
      }
      return true;
    }
  }]);

  return Formatter;
})();

exports['default'] = Formatter;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _adaptive_card_formatter = require('./adaptive_card_formatter');

var _adaptive_card_formatter2 = _interopRequireDefault(_adaptive_card_formatter);

var _amex_card_formatter = require('./amex_card_formatter');

var _amex_card_formatter2 = _interopRequireDefault(_amex_card_formatter);

var _card_text_field = require('./card_text_field');

var _card_text_field2 = _interopRequireDefault(_card_text_field);

var _card_utils = require('./card_utils');

var _default_card_formatter = require('./default_card_formatter');

var _default_card_formatter2 = _interopRequireDefault(_default_card_formatter);

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

var _employer_identification_number_formatter = require('./employer_identification_number_formatter');

var _employer_identification_number_formatter2 = _interopRequireDefault(_employer_identification_number_formatter);

var _expiry_date_field = require('./expiry_date_field');

var _expiry_date_field2 = _interopRequireDefault(_expiry_date_field);

var _expiry_date_formatter = require('./expiry_date_formatter');

var _expiry_date_formatter2 = _interopRequireDefault(_expiry_date_formatter);

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _number_formatter = require('./number_formatter');

var _number_formatter2 = _interopRequireDefault(_number_formatter);

var _number_formatter_settings_formatter = require('./number_formatter_settings_formatter');

var _number_formatter_settings_formatter2 = _interopRequireDefault(_number_formatter_settings_formatter);

var _phone_formatter = require('./phone_formatter');

var _phone_formatter2 = _interopRequireDefault(_phone_formatter);

var _social_security_number_formatter = require('./social_security_number_formatter');

var _social_security_number_formatter2 = _interopRequireDefault(_social_security_number_formatter);

var _text_field = require('./text_field');

var _text_field2 = _interopRequireDefault(_text_field);

var _undo_manager = require('./undo_manager');

var _undo_manager2 = _interopRequireDefault(_undo_manager);

/**
 * @namespace FieldKit
 * @readonly
 */
module.exports = {
  AdaptiveCardFormatter: _adaptive_card_formatter2['default'],
  AmexCardFormatter: _amex_card_formatter2['default'],
  CardTextField: _card_text_field2['default'],
  CardUtils: {
    AMEX: _card_utils.AMEX,
    DISCOVER: _card_utils.DISCOVER,
    VISA: _card_utils.VISA,
    MASTERCARD: _card_utils.MASTERCARD,
    determineCardType: _card_utils.determineCardType,
    luhnCheck: _card_utils.luhnCheck,
    validCardLength: _card_utils.validCardLength
  },
  DefaultCardFormatter: _default_card_formatter2['default'],
  DelimitedTextFormatter: _delimited_text_formatter2['default'],
  EmployerIdentificationNumberFormatter: _employer_identification_number_formatter2['default'],
  ExpiryDateField: _expiry_date_field2['default'],
  ExpiryDateFormatter: _expiry_date_formatter2['default'],
  Formatter: _formatter2['default'],
  NumberFormatter: _number_formatter2['default'],
  NumberFormatterSettingsFormatter: _number_formatter_settings_formatter2['default'],
  PhoneFormatter: _phone_formatter2['default'],
  SocialSecurityNumberFormatter: _social_security_number_formatter2['default'],
  TextField: _text_field2['default'],
  UndoManager: _undo_manager2['default']
};

},{"./adaptive_card_formatter":4,"./amex_card_formatter":5,"./card_text_field":6,"./card_utils":7,"./default_card_formatter":9,"./delimited_text_formatter":10,"./employer_identification_number_formatter":12,"./expiry_date_field":13,"./expiry_date_formatter":14,"./formatter":15,"./number_formatter":17,"./number_formatter_settings_formatter":18,"./phone_formatter":19,"./social_security_number_formatter":20,"./text_field":21,"./undo_manager":22}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _number_formatter_settings_formatter = require('./number_formatter_settings_formatter');

var _number_formatter_settings_formatter2 = _interopRequireDefault(_number_formatter_settings_formatter);

var _utils = require('./utils');

var _stround = require('stround');

// Style
var NONE = 0;
var CURRENCY = 1;
var PERCENT = 2;

var DEFAULT_LOCALE = 'en-US';
var DEFAULT_COUNTRY = 'US';

/**
 * @param {string} locale
 * @returns {Object} {lang: lang, country: country}
 * @private
 */
function splitLocaleComponents(locale) {
  var match = locale.match(/^([a-z][a-z])(?:[-_]([a-z][a-z]))?$/i);
  if (match) {
    var lang = match[1] && match[1].toLowerCase();
    var country = match[2] && match[2].toLowerCase();
    return { lang: lang, country: country };
  }
}

/**
 * This simple property getter assumes that properties will never be functions
 * and so attempts to run those functions using the given args.
 *
 * @private
 */
function get(object, key) {
  if (object) {
    var value = object[key];
    if (typeof value === 'function') {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return value.apply(undefined, args);
    } else {
      return value;
    }
  }
}

/**
 * @param {string} string
 * @param {string} currencySymbol
 * @return {string}
 * @private
 */
function replaceCurrencySymbol(string, currencySymbol) {
  return string.replace(/¤/g, currencySymbol);
}

/**
 * @param {string} string
 * @param {string} plusSign
 * @returns {string}
 * @private
 */
function replacePlusSign(string, plusSign) {
  return string.replace(/\+/g, plusSign);
}
/**
 * @param {string} string
 * @param {string} minusSign
 * @returns {string}
 * @private
 */
function replaceMinusSign(string, minusSign) {
  return string.replace(/-/g, minusSign);
}

/**
 * Formats and parses numbers. There are many configuration options for how to
 * format numbers as strings, but for many users simply adjusting the
 * {@link NumberFormatter#numberStyle}, {@link NumberFormatter#locale},
 * {@link NumberFormatter#currencyCode}, and {@link NumberFormatter#countryCode}
 * values will be sufficient. NumberFormatter natively understands how to
 * format numbers, currencies, and percentages for a variety of locales.
 *
 * @example
 *
 *   // Configure a NumberFormatter to display currencies.
 *   var f = new FieldKit.NumberFormatter();
 *   f.setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY);
 *
 *   // Configure the current locale info.
 *   f.setLocale('en-US');
 *   f.setCountryCode('US');
 *   f.setCurrencyCode('USD');
 *
 *   // Showing USD in US uses abbreviated currency.
 *   f.format(6.17);  // '$6.17'
 *
 *   // Showing CAD in US uses fully-qualified currency.
 *   f.setCurrencyCode('CAD');
 *   f.format(6.17);  // 'CA$6.17'
 *
 *   // Showing CAD in CA again uses abbreviated currency.
 *   f.setLocale('en-CA');
 *   f.setCountryCode('CA');
 *   f.format(6.17);  // '$6.17'
 *
 *   // Showing CAD in CA to a French speaker uses correct formatting.
 *   f.setLocale('fr-CA');
 *   f.format(6.17);  // '6,17 $'
 *
 *   // You may customize the behavior of NumberFormatter to achieve whatever
 *   // number formatting you need using the setter methods for the various
 *   // settings, or you can use the {@link NumberFormatter#positiveFormat} and
 *   // {@link NumberFormatter#negativeFormat} shorthand templates.
 *
 *   var f = new FieldKit.NumberFormatter();
 *
 *   // Using this template string…
 *   f.setPositiveFormat('¤#0.00');
 *
 *   // …is equivalent to this:
 *   f.setPositivePrefix('¤');
 *   f.setPositiveSuffix('');
 *   f.setMinimumIntegerDigits(1);
 *   f.setMinimumFractionDigits(2);
 *   f.setMaximumFractionDigits(2);
 *
 *   // And you can determine what the template string is for however you've
 *   // configured the NumberFormatter:
 *   f.setUsesGroupingSeparator(true);
 *   f.setGroupingSize(2);
 *   f.positiveFormat(); // '¤#,#0.00'
 *
 * @extends Formatter
 */

var NumberFormatter = (function (_Formatter) {
  _inherits(NumberFormatter, _Formatter);

  function NumberFormatter() {
    _classCallCheck(this, NumberFormatter);

    _get(Object.getPrototypeOf(NumberFormatter.prototype), 'constructor', this).call(this);
    this.setNumberStyle(NONE);
  }

  /**
   * Defaults
   */

  /** @private */

  /**
   * Gets whether this formatter will parse float number values. This value does
   * not apply to formatting. To prevent formatting floats, set
   * maximumFractionDigits to 0.
   *
   * @returns {boolean}
   */

  _createClass(NumberFormatter, [{
    key: 'allowsFloats',
    value: function allowsFloats() {
      return this._get('allowsFloats');
    }

    /**
     * Sets whether this formatter will parse float number values.
     *
     * @param {boolean} allowsFloats
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setAllowsFloats',
    value: function setAllowsFloats(allowsFloats) {
      this._allowsFloats = allowsFloats;
      return this;
    }

    /**
     * Gets whether this formatter should show the decimal separator.
     *
     * @returns {boolean}
     */
  }, {
    key: 'alwaysShowsDecimalSeparator',
    value: function alwaysShowsDecimalSeparator() {
      return this._get('alwaysShowsDecimalSeparator');
    }

    /**
     * Sets whether this formatter will show the decimal separator.
     *
     * @param {boolean} alwaysShowsDecimalSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setAlwaysShowsDecimalSeparator',
    value: function setAlwaysShowsDecimalSeparator(alwaysShowsDecimalSeparator) {
      this._alwaysShowsDecimalSeparator = alwaysShowsDecimalSeparator;
      return this;
    }

    /**
     * Gets the country code for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'countryCode',
    value: function countryCode() {
      return this._countryCode || DEFAULT_COUNTRY;
    }

    /**
     * Sets the country code for formatter.
     *
     * @param {string} countryCode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCountryCode',
    value: function setCountryCode(countryCode) {
      this._countryCode = countryCode;
      return this;
    }

    /**
     * Gets the currency code for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'currencyCode',
    value: function currencyCode() {
      return this._get('currencyCode');
    }

    /**
     * Sets the currency code for formatter.
     *
     * @param {string} currencyCode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCurrencyCode',
    value: function setCurrencyCode(currencyCode) {
      this._currencyCode = currencyCode;
      return this;
    }

    /**
     * Gets the currency symbol for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'currencySymbol',
    value: function currencySymbol() {
      if (this._shouldShowNativeCurrencySymbol()) {
        return this._get('currencySymbol');
      } else {
        return this._get('internationalCurrencySymbol');
      }
    }

    /**
     * Sets the currency symbol for formatter.
     *
     * @param {string} currencySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setCurrencySymbol',
    value: function setCurrencySymbol(currencySymbol) {
      this._currencySymbol = currencySymbol;
      return this;
    }

    /**
     * @returns {boolean}
     * @private
     */
  }, {
    key: '_shouldShowNativeCurrencySymbol',
    value: function _shouldShowNativeCurrencySymbol() {
      var regionDefaultCurrencyCode = this._regionDefaults().currencyCode;
      if (typeof regionDefaultCurrencyCode === 'function') {
        regionDefaultCurrencyCode = regionDefaultCurrencyCode();
      }
      return this.currencyCode() === regionDefaultCurrencyCode;
    }

    /**
     * Gets the decimal separator for formatter.
     *
     * @returns {string}
     */
  }, {
    key: 'decimalSeparator',
    value: function decimalSeparator() {
      return this._get('decimalSeparator');
    }

    /**
     * Sets the decimal separator for formatter.
     *
     * @param {string} decimalSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setDecimalSeparator',
    value: function setDecimalSeparator(decimalSeparator) {
      this._decimalSeparator = decimalSeparator;
      return this;
    }

    /**
     * Gets the number of decimal places to shift numbers before formatting.
     *
     * @returns {string}
     */
  }, {
    key: 'exponent',
    value: function exponent() {
      return this._get('exponent');
    }

    /**
     * Sets the number of decimal places to shift numbers before formatting.
     *
     * @param exponent
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setExponent',
    value: function setExponent(exponent) {
      this._exponent = exponent;
      return this;
    }
  }, {
    key: 'groupingSeparator',
    value: function groupingSeparator() {
      return this._get('groupingSeparator');
    }

    /**
     * @param {string} groupingSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setGroupingSeparator',
    value: function setGroupingSeparator(groupingSeparator) {
      this._groupingSeparator = groupingSeparator;
      return this;
    }

    /**
     * Gets the grouping size for formatter.
     *
     * @returns {number}
     */
  }, {
    key: 'groupingSize',
    value: function groupingSize() {
      return this._get('groupingSize');
    }

    /**
     * @param {number} groupingSize
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setGroupingSize',
    value: function setGroupingSize(groupingSize) {
      this._groupingSize = groupingSize;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'internationalCurrencySymbol',
    value: function internationalCurrencySymbol() {
      return this._get('internationalCurrencySymbol');
    }

    /**
     * @param {string} internationalCurrencySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setInternationalCurrencySymbol',
    value: function setInternationalCurrencySymbol(internationalCurrencySymbol) {
      this._internationalCurrencySymbol = internationalCurrencySymbol;
      return this;
    }

    /**
     * @returns {boolean}
     */
  }, {
    key: 'isLenient',
    value: function isLenient() {
      return this._lenient;
    }

    /**
     * @param {boolean} lenient
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setLenient',
    value: function setLenient(lenient) {
      this._lenient = lenient;
      return this;
    }

    /**
     * Gets the locale identifier for which this formatter is currently
     * configured to format strings. This setting controls default settings such
     * as the grouping separator character, decimal separator character, placement
     * of currency and percent symbols, etc.
     *
     * @returns {string}
     */
  }, {
    key: 'locale',
    value: function locale() {
      return this._locale || DEFAULT_LOCALE;
    }

    /**
     * Sets the locale identifier used for default settings values.
     *
     * @see {@link NumberFormatter#locale}
     * @param {string} locale
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      this._locale = locale;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximum',
    value: function maximum() {
      return this._maximum;
    }

    /**
     * @param {number} max
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximum',
    value: function setMaximum(max) {
      this._maximum = max;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimum',
    value: function minimum() {
      return this._minimum;
    }

    /**
     * @param {number} min
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimum',
    value: function setMinimum(min) {
      this._minimum = min;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximumFractionDigits',
    value: function maximumFractionDigits() {
      var result = this._get('maximumFractionDigits');
      var minimumFractionDigits = this._minimumFractionDigits;
      if (result !== null && result !== undefined && minimumFractionDigits !== null && minimumFractionDigits !== undefined && minimumFractionDigits > result) {
        result = minimumFractionDigits;
      }
      return result;
    }

    /**
     * @param {number} maximumFractionDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximumFractionDigits',
    value: function setMaximumFractionDigits(maximumFractionDigits) {
      this._maximumFractionDigits = maximumFractionDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimumFractionDigits',
    value: function minimumFractionDigits() {
      var result = this._get('minimumFractionDigits');
      var maximumFractionDigits = this._maximumFractionDigits;
      if (result !== null && result !== undefined && maximumFractionDigits !== null && maximumFractionDigits !== undefined && maximumFractionDigits < result) {
        result = maximumFractionDigits;
      }
      return result;
    }

    /**
     * @param {number} minimumFractionDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimumFractionDigits',
    value: function setMinimumFractionDigits(minimumFractionDigits) {
      this._minimumFractionDigits = minimumFractionDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'maximumIntegerDigits',
    value: function maximumIntegerDigits() {
      var result = this._get('maximumIntegerDigits');
      var minimumIntegerDigits = this._minimumIntegerDigits;
      if (result !== null && result !== undefined && minimumIntegerDigits !== null && minimumIntegerDigits !== undefined && minimumIntegerDigits > result) {
        result = minimumIntegerDigits;
      }
      return result;
    }

    /**
     * @param {number} maximumIntegerDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMaximumIntegerDigits',
    value: function setMaximumIntegerDigits(maximumIntegerDigits) {
      this._maximumIntegerDigits = maximumIntegerDigits;
      return this;
    }

    /**
     * @returns {number}
     */
  }, {
    key: 'minimumIntegerDigits',
    value: function minimumIntegerDigits() {
      var result = this._get('minimumIntegerDigits');
      var maximumIntegerDigits = this._maximumIntegerDigits;
      if (result !== null && result !== undefined && maximumIntegerDigits !== null && maximumIntegerDigits !== undefined && maximumIntegerDigits < result) {
        result = maximumIntegerDigits;
      }
      return result;
    }

    /**
     * @param {number} minimumIntegerDigits
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinimumIntegerDigits',
    value: function setMinimumIntegerDigits(minimumIntegerDigits) {
      this._minimumIntegerDigits = minimumIntegerDigits;
      return this;
    }

    /**
     * Gets the minus sign used for negative numbers in some locales.
     *
     * @returns {?string}
     */
  }, {
    key: 'minusSign',
    value: function minusSign() {
      return this._get('minusSign');
    }

    /**
     * Sets the minus sign used for negative numbers in some locales.
     *
     * @param {?string} minusSign
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setMinusSign',
    value: function setMinusSign(minusSign) {
      this._minusSign = minusSign;
      return this;
    }

    /**
     * Gets the negative number format string for the current settings. For
     * example, changing `minimumFractionDigits` from 0 to 3 would change this
     * value from "-#" to "-#.000".
     *
     * @return {string}
     */
  }, {
    key: 'negativeFormat',
    value: function negativeFormat() {
      return this.numberFormatFormatter().format({
        alwaysShowsDecimalSeparator: this.alwaysShowsDecimalSeparator(),
        groupingSize: this.groupingSize(),
        maximumFractionDigits: this.maximumFractionDigits(),
        minimumFractionDigits: this.minimumFractionDigits(),
        minimumIntegerDigits: this.minimumIntegerDigits(),
        prefix: this._get('negativePrefix'),
        suffix: this._get('negativeSuffix'),
        usesGroupingSeparator: this.usesGroupingSeparator()
      });
    }

    /**
     * Configures this number formatter according to the given format string.
     * For most usages you should simply use
     * {@link NumberFormatter#setPositiveFormat} and configure the negative
     * prefix and suffix separately.
     *
     * @param negativeFormat
     */
  }, {
    key: 'setNegativeFormat',
    value: function setNegativeFormat(negativeFormat) {
      var settings = this.numberFormatFormatter().parse(negativeFormat);
      this.setNegativePrefix(settings.prefix);
      this.setNegativeSuffix(settings.suffix);
      this.setGroupingSize(settings.groupingSize);
      this.setMaximumFractionDigits(settings.maximumFractionDigits);
      this.setMinimumFractionDigits(settings.minimumFractionDigits);
      this.setMinimumIntegerDigits(settings.minimumIntegerDigits);
      this.setUsesGroupingSeparator(settings.usesGroupingSeparator);
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativeInfinitySymbol',
    value: function negativeInfinitySymbol() {
      return this._get('negativeInfinitySymbol');
    }

    /**
     * @param {string} negativeInfinitySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativeInfinitySymbol',
    value: function setNegativeInfinitySymbol(negativeInfinitySymbol) {
      this._negativeInfinitySymbol = negativeInfinitySymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativePrefix',
    value: function negativePrefix() {
      return replaceCurrencySymbol(replaceMinusSign(this._get('negativePrefix'), this._get('minusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativePrefix',
    value: function setNegativePrefix(prefix) {
      this._negativePrefix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'negativeSuffix',
    value: function negativeSuffix() {
      return replaceCurrencySymbol(replaceMinusSign(this._get('negativeSuffix'), this._get('minusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNegativeSuffix',
    value: function setNegativeSuffix(prefix) {
      this._negativeSuffix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'notANumberSymbol',
    value: function notANumberSymbol() {
      return this._get('notANumberSymbol');
    }

    /**
     * @param {string} notANumberSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNotANumberSymbol',
    value: function setNotANumberSymbol(notANumberSymbol) {
      this._notANumberSymbol = notANumberSymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'nullSymbol',
    value: function nullSymbol() {
      return this._get('nullSymbol');
    }

    /**
     * @param {string} nullSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNullSymbol',
    value: function setNullSymbol(nullSymbol) {
      this._nullSymbol = nullSymbol;
      return this;
    }

    /**
     * @return {NumberFormatterSettingsFormatter}
     * @private
     */
  }, {
    key: 'numberFormatFormatter',
    value: function numberFormatFormatter() {
      if (!this._numberFormatFormatter) {
        this._numberFormatFormatter = new _number_formatter_settings_formatter2['default']();
      }
      return this._numberFormatFormatter;
    }

    /**
     * Gets the number style used to configure various default setting values.
     *
     * @returns {NumberFormatter.Style}
     */
  }, {
    key: 'numberStyle',
    value: function numberStyle() {
      return this._numberStyle;
    }

    /**
     * Sets the number style used to configure various default setting values.
     *
     * @param {string} numberStyle
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setNumberStyle',
    value: function setNumberStyle(numberStyle) {
      this._numberStyle = numberStyle;
      switch (this._numberStyle) {
        case NONE:
          this._styleDefaults = StyleDefaults.NONE;
          break;
        case PERCENT:
          this._styleDefaults = StyleDefaults.PERCENT;
          break;
        case CURRENCY:
          this._styleDefaults = StyleDefaults.CURRENCY;
          break;
        default:
          this._styleDefaults = null;
      }
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'percentSymbol',
    value: function percentSymbol() {
      return this._get('percentSymbol');
    }

    /**
     * @param {string} percentSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPercentSymbol',
    value: function setPercentSymbol(percentSymbol) {
      this._percentSymbol = percentSymbol;
      return this;
    }

    /**
     * Gets the plus sign used in positive numbers in some locales.
     *
     * @returns {string}
     */
  }, {
    key: 'plusSign',
    value: function plusSign() {
      return this._get('plusSign');
    }

    /**
     * Sets the plus sign used in positive numbers in some locales.
     *
     * @param {?string} plusSign
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPlusSign',
    value: function setPlusSign(plusSign) {
      this._plusSign = plusSign;
      return this;
    }

    /**
     * Gets the positive number format string for the current settings. For
     * example, changing `minimumFractionDigits` from 0 to 3 would change this
     * value from "#" to "#.000".
     *
     * @return {string}
     */
  }, {
    key: 'positiveFormat',
    value: function positiveFormat() {
      return this.numberFormatFormatter().format({
        alwaysShowsDecimalSeparator: this.alwaysShowsDecimalSeparator(),
        groupingSize: this.groupingSize(),
        maximumFractionDigits: this.maximumFractionDigits(),
        minimumFractionDigits: this.minimumFractionDigits(),
        minimumIntegerDigits: this.minimumIntegerDigits(),
        prefix: this._get('positivePrefix'),
        suffix: this._get('positiveSuffix'),
        usesGroupingSeparator: this.usesGroupingSeparator()
      });
    }

    /**
     * Configures this number formatter according to the given format string.
     *
     * @example
     *
     *   // Use '0' for padding, '.' for decimal separator.
     *   formatter.setPositiveFormat('00.000');
     *   formatter.format(2);     // '02.000'
     *   formatter.format(-5.03); // '-05.030'
     *   formatter.setLocale('fr-FR');
     *   formatter.format(2);     // '02,000'
     *
     *   // Use '#' for maximum fraction digits.
     *   formatter.setPositiveFormat('#.##');
     *   formatter.format(3.456); // '3.46'
     *
     *   // Use '¤' as the currency placeholder.
     *   formatter.setPositiveFormat('¤#0.00');
     *   formatter.format(1.23); // '$1.23'
     *   formatter.setCurrencyCode('JPY');
     *   formatter.format(81);   // 'JP¥81.00'
     *   formatter.setLocale('jp-JP');
     *   formatter.format(7);   // '¥7.00'
     *
     *   // Use ',' for grouping separator placement.
     *   formatter.setPositiveFormat('#,##');
     *   formatter.format(123); // '1,23'
     *
     * @param positiveFormat
     */
  }, {
    key: 'setPositiveFormat',
    value: function setPositiveFormat(positiveFormat) {
      var settings = this.numberFormatFormatter().parse(positiveFormat);
      this.setPositivePrefix(settings.prefix);
      this.setPositiveSuffix(settings.suffix);
      this.setGroupingSize(settings.groupingSize);
      this.setMaximumFractionDigits(settings.maximumFractionDigits);
      this.setMinimumFractionDigits(settings.minimumFractionDigits);
      this.setMinimumIntegerDigits(settings.minimumIntegerDigits);
      this.setUsesGroupingSeparator(settings.usesGroupingSeparator);
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positiveInfinitySymbol',
    value: function positiveInfinitySymbol() {
      return this._get('positiveInfinitySymbol');
    }

    /**
     * @param {string} positiveInfinitySymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositiveInfinitySymbol',
    value: function setPositiveInfinitySymbol(positiveInfinitySymbol) {
      this._positiveInfinitySymbol = positiveInfinitySymbol;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positivePrefix',
    value: function positivePrefix() {
      return replaceCurrencySymbol(replacePlusSign(this._get('positivePrefix'), this._get('plusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositivePrefix',
    value: function setPositivePrefix(prefix) {
      this._positivePrefix = prefix;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'positiveSuffix',
    value: function positiveSuffix() {
      return replaceCurrencySymbol(replacePlusSign(this._get('positiveSuffix'), this._get('plusSign')), this.currencySymbol());
    }

    /**
     * @param {string} prefix
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setPositiveSuffix',
    value: function setPositiveSuffix(prefix) {
      this._positiveSuffix = prefix;
      return this;
    }

    /**
     * @returns {Function}
     */
  }, {
    key: 'roundingMode',
    value: function roundingMode() {
      return this._get('roundingMode');
    }

    /**
     * @param {Function} roundingMode
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setRoundingMode',
    value: function setRoundingMode(roundingMode) {
      this._roundingMode = roundingMode;
      return this;
    }

    /**
     * @returns {boolean}
     */
  }, {
    key: 'usesGroupingSeparator',
    value: function usesGroupingSeparator() {
      return this._get('usesGroupingSeparator');
    }

    /**
     * @param {boolean} usesGroupingSeparator
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setUsesGroupingSeparator',
    value: function setUsesGroupingSeparator(usesGroupingSeparator) {
      this._usesGroupingSeparator = usesGroupingSeparator;
      return this;
    }

    /**
     * @returns {string}
     */
  }, {
    key: 'zeroSymbol',
    value: function zeroSymbol() {
      return this._get('zeroSymbol');
    }

    /**
     * @param {string} zeroSymbol
     * @returns {NumberFormatter}
     */
  }, {
    key: 'setZeroSymbol',
    value: function setZeroSymbol(zeroSymbol) {
      this._zeroSymbol = zeroSymbol;
      return this;
    }

    /**
     * @param {string} attr
     * @returns {*}
     * @private
     */
  }, {
    key: '_get',
    value: function _get(attr) {
      var value = this['_' + attr];
      if (value !== null && value !== undefined) {
        return value;
      }
      var styleDefaults = this._styleDefaults;
      var localeDefaults = this._localeDefaults();
      var regionDefaults = this._regionDefaults();
      value = get(styleDefaults, attr, this, localeDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(localeDefaults, attr, this, styleDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(regionDefaults, attr, this, styleDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      value = get(this._currencyDefaults(), attr, this, localeDefaults);
      if (value !== null && value !== undefined) {
        return value;
      }
      return null;
    }

    /**
     * Formats the given number as a string according to the settings applied to
     * this formatter. This may cause the number to be truncated, rounded, or
     * otherwise differ from what you might expect.
     *
     * @example
     *
     *   // By default no fraction digits are shown.
     *   var f = new FieldKit.NumberFormatter();
     *   f.format(Math.PI);  // '3'
     *
     *   // Let's format as a currency.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.CURRENCY);
     *   f.format(Math.PI);  // '$3.14'
     *
     *   // Or as a percentage, which illustrates usage of {@link NumberFormatter#exponent}.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.PERCENT);
     *   f.format(Math.PI);  // '314%'
     *
     *   // For the rest of the examples we'll go back to normal.
     *   f.setNumberStyle(FieldKit.NumberFormatter.Style.NONE);
     *
     *   // The default rounding mode is {@link NumberFormatter.Rounding.HALF_EVEN}.
     *   f.setMaximumFractionDigits(4);
     *   f.format(Math.PI);  // '3.1416'
     *
     *   // And we can change the rounding mode if we like.
     *   f.setRoundingMode(FieldKit.NumberFormatter.Rounding.FLOOR);
     *   f.format(Math.PI);  // '3.1415'
     *
     * @param {number} number
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(number) {
      if (number === '') {
        return '';
      }

      var zeroSymbol = this.zeroSymbol();
      if (zeroSymbol !== undefined && zeroSymbol !== null && number === 0) {
        return zeroSymbol;
      }

      var nullSymbol = this.nullSymbol();
      if (nullSymbol !== undefined && nullSymbol !== null && number === null) {
        return nullSymbol;
      }

      var notANumberSymbol = this.notANumberSymbol();
      if (notANumberSymbol !== undefined && notANumberSymbol !== null && isNaN(number)) {
        return notANumberSymbol;
      }

      var positiveInfinitySymbol = this.positiveInfinitySymbol();
      if (positiveInfinitySymbol !== undefined && positiveInfinitySymbol !== null && number === Infinity) {
        return positiveInfinitySymbol;
      }

      var negativeInfinitySymbol = this.negativeInfinitySymbol();
      if (negativeInfinitySymbol !== undefined && negativeInfinitySymbol !== null && number === -Infinity) {
        return negativeInfinitySymbol;
      }

      var negative = number < 0;

      var parts = ('' + Math.abs(number)).split('.');
      var integerPart = parts[0];
      var fractionPart = parts[1] || '';

      var exponent = this.exponent();
      if (exponent !== undefined && exponent !== null) {
        var shifted = (0, _stround.shiftParts)([negative, integerPart, fractionPart], exponent);
        negative = shifted[0];
        integerPart = shifted[1];
        fractionPart = shifted[2];
        while (integerPart[0] === '0') {
          integerPart = integerPart.slice(1);
        }
      }

      // round fraction part to the maximum length
      var maximumFractionDigits = this.maximumFractionDigits();
      if (fractionPart.length > maximumFractionDigits) {
        var unrounded = integerPart + '.' + fractionPart;
        var rounded = this._round(negative ? '-' + unrounded : unrounded);
        if (rounded[0] === '-') {
          rounded = rounded.slice(1);
        }
        parts = rounded.split('.');
        integerPart = parts[0];
        fractionPart = parts[1] || '';
      }

      // right-pad fraction zeros up to the minimum length
      var minimumFractionDigits = this.minimumFractionDigits();
      while (fractionPart.length < minimumFractionDigits) {
        fractionPart += '0';
      }

      // left-pad integer zeros up to the minimum length
      var minimumIntegerDigits = this.minimumIntegerDigits();
      while (integerPart.length < minimumIntegerDigits) {
        integerPart = '0' + integerPart;
      }

      // eat any unneeded trailing zeros
      while (fractionPart.length > minimumFractionDigits && fractionPart.slice(-1) === '0') {
        fractionPart = fractionPart.slice(0, -1);
      }

      // left-truncate any integer digits over the maximum length
      var maximumIntegerDigits = this.maximumIntegerDigits();
      if (maximumIntegerDigits !== undefined && maximumIntegerDigits !== null && integerPart.length > maximumIntegerDigits) {
        integerPart = integerPart.slice(-maximumIntegerDigits);
      }

      // add the decimal separator
      if (fractionPart.length > 0 || this.alwaysShowsDecimalSeparator()) {
        fractionPart = this.decimalSeparator() + fractionPart;
      }

      if (this.usesGroupingSeparator()) {
        var integerPartWithGroupingSeparators = '';
        var copiedCharacterCount = 0;

        for (var i = integerPart.length - 1; i >= 0; i--) {
          if (copiedCharacterCount > 0 && copiedCharacterCount % this.groupingSize() === 0) {
            integerPartWithGroupingSeparators = this.groupingSeparator() + integerPartWithGroupingSeparators;
          }
          integerPartWithGroupingSeparators = integerPart[i] + integerPartWithGroupingSeparators;
          copiedCharacterCount++;
        }
        integerPart = integerPartWithGroupingSeparators;
      }

      var result = integerPart + fractionPart;

      // surround with the appropriate prefix and suffix
      if (negative) {
        result = this.negativePrefix() + result + this.negativeSuffix();
      } else {
        result = this.positivePrefix() + result + this.positiveSuffix();
      }
      return result;
    }

    /**
     * @param {number} number
     * @returns {number}
     * @private
     */
  }, {
    key: '_round',
    value: function _round(number) {
      return (0, _stround.round)(number, this.maximumFractionDigits(), this.roundingMode());
    }

    /**
     * Parses the given string according to the current formatting settings.
     * When parsing values with a guaranteed regular format you can simply
     * configure the formatter correctly and call this method. However, when
     * dealing with human input it is often useful to configure
     * {@link NumberFormatter#isLenient} to be true, allowing more leeway in what
     * may be parsed as a valid number.
     *
     * @example
     *
     *   var f = new FieldKit.NumberFormatter();
     *   f.parse('89'); // 89
     *
     * @param {string} string
     * @param {function(string)} error
     * @returns {?number}
     */
  }, {
    key: 'parse',
    value: function parse(string, error) {
      var result = undefined;
      var positivePrefix = this.positivePrefix();
      var negativePrefix = this.negativePrefix();
      var positiveSuffix = this.positiveSuffix();
      var negativeSuffix = this.negativeSuffix();

      if (this.isLenient()) {
        string = string.replace(/\s/g, '');
        positivePrefix = (0, _utils.trim)(positivePrefix);
        negativePrefix = (0, _utils.trim)(negativePrefix);
        positiveSuffix = (0, _utils.trim)(positiveSuffix);
        negativeSuffix = (0, _utils.trim)(negativeSuffix);
      }

      var zeroSymbol = undefined;
      var nullSymbol = undefined;
      var notANumberSymbol = undefined;
      var positiveInfinitySymbol = undefined;
      var negativeInfinitySymbol = undefined;
      var innerString = undefined;

      if ((zeroSymbol = this.zeroSymbol()) !== undefined && zeroSymbol !== null && string === zeroSymbol) {
        result = 0;
      } else if ((nullSymbol = this.nullSymbol()) !== undefined && nullSymbol !== null && string === nullSymbol) {
        result = null;
      } else if ((notANumberSymbol = this.notANumberSymbol()) !== undefined && notANumberSymbol !== null && string === notANumberSymbol) {
        result = NaN;
      } else if ((positiveInfinitySymbol = this.positiveInfinitySymbol()) !== undefined && positiveInfinitySymbol !== null && string === positiveInfinitySymbol) {
        result = Infinity;
      } else if ((negativeInfinitySymbol = this.negativeInfinitySymbol()) !== undefined && negativeInfinitySymbol !== null && string === negativeInfinitySymbol) {
        result = -Infinity;
      } else {
        var hasNegativePrefix = (0, _utils.startsWith)(negativePrefix, string);
        var hasNegativeSuffix = (0, _utils.endsWith)(negativeSuffix, string);
        if (hasNegativePrefix && (this.isLenient() || hasNegativeSuffix)) {
          innerString = string.slice(negativePrefix.length);
          if (hasNegativeSuffix) {
            innerString = innerString.slice(0, innerString.length - negativeSuffix.length);
          }
          result = this._parseAbsoluteValue(innerString, error);
          if (result !== undefined && result !== null) {
            result *= -1;
          }
        } else {
          var hasPositivePrefix = (0, _utils.startsWith)(positivePrefix, string);
          var hasPositiveSuffix = (0, _utils.endsWith)(positiveSuffix, string);
          if (this.isLenient() || hasPositivePrefix && hasPositiveSuffix) {
            innerString = string;
            if (hasPositivePrefix) {
              innerString = innerString.slice(positivePrefix.length);
            }
            if (hasPositiveSuffix) {
              innerString = innerString.slice(0, innerString.length - positiveSuffix.length);
            }
            result = this._parseAbsoluteValue(innerString, error);
          } else {
            if (typeof error === 'function') {
              error('number-formatter.invalid-format');
            }
            return null;
          }
        }
      }

      if (result !== undefined && result !== null) {
        var minimum = this.minimum();
        if (minimum !== undefined && minimum !== null && result < minimum) {
          if (typeof error === 'function') {
            error('number-formatter.out-of-bounds.below-minimum');
          }
          return null;
        }

        var maximum = this.maximum();
        if (maximum !== undefined && maximum !== null && result > maximum) {
          if (typeof error === 'function') {
            error('number-formatter.out-of-bounds.above-maximum');
          }
          return null;
        }
      }

      return result;
    }

    /**
     * @param {string} string
     * @param {function(string)} error
     * @returns {?number} returns value with delimiters removed
     * @private
     */
  }, {
    key: '_parseAbsoluteValue',
    value: function _parseAbsoluteValue(string, error) {
      var number = undefined;
      if (string.length === 0) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var parts = string.split(this.decimalSeparator());
      if (parts.length > 2) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var integerPart = parts[0];
      var fractionPart = parts[1] || '';

      if (this.usesGroupingSeparator()) {
        var groupingSize = this.groupingSize();
        var groupParts = integerPart.split(this.groupingSeparator());

        if (!this.isLenient()) {
          if (groupParts.length > 1) {
            // disallow 1000,000
            if (groupParts[0].length > groupingSize) {
              if (typeof error === 'function') {
                error('number-formatter.invalid-format.grouping-size');
              }
              return null;
            }

            // disallow 1,00
            var groupPartsTail = groupParts.slice(1);
            for (var i = 0, l = groupPartsTail.length; i < l; i++) {
              if (groupPartsTail[i].length !== groupingSize) {
                if (typeof error === 'function') {
                  error('number-formatter.invalid-format.grouping-size');
                }
                return null;
              }
            }
          }
        }

        // remove grouping separators
        integerPart = groupParts.join('');
      }

      if (!(0, _utils.isDigits)(integerPart) || !(0, _utils.isDigits)(fractionPart)) {
        if (typeof error === 'function') {
          error('number-formatter.invalid-format');
        }
        return null;
      }

      var exponent = this.exponent();
      if (exponent !== undefined && exponent !== null) {
        var shifted = (0, _stround.shiftParts)([false, integerPart, fractionPart], -exponent);
        integerPart = shifted[1];
        fractionPart = shifted[2];
      }

      number = Number(integerPart) + Number('.' + (fractionPart || '0'));

      if (!this.allowsFloats() && number !== ~ ~number) {
        if (typeof error === 'function') {
          error('number-formatter.floats-not-allowed');
        }
        return null;
      }

      return number;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_currencyDefaults',
    value: function _currencyDefaults() {
      var result = {};

      (0, _utils.forEach)(CurrencyDefaults['default'], function (value, key) {
        result[key] = value;
      });

      (0, _utils.forEach)(CurrencyDefaults[this.currencyCode()], function (value, key) {
        result[key] = value;
      });

      return result;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_regionDefaults',
    value: function _regionDefaults() {
      var result = {};

      (0, _utils.forEach)(RegionDefaults['default'], function (value, key) {
        result[key] = value;
      });

      (0, _utils.forEach)(RegionDefaults[this.countryCode()], function (value, key) {
        result[key] = value;
      });

      return result;
    }

    /**
     * Gets defaults.
     *
     * @returns {Array}
     * @private
     */
  }, {
    key: '_localeDefaults',
    value: function _localeDefaults() {
      var locale = this.locale();
      var countryCode = this.countryCode();
      var lang = splitLocaleComponents(locale).lang;
      var result = {};

      var defaultFallbacks = [RegionDefaults['default'], LocaleDefaults['default'], RegionDefaults[countryCode], // CA
      LocaleDefaults[lang], // fr
      LocaleDefaults[locale] // fr-CA
      ];

      (0, _utils.forEach)(defaultFallbacks, function (defaults) {
        (0, _utils.forEach)(defaults, function (value, key) {
          result[key] = value;
        });
      });

      return result;
    }
  }]);

  return NumberFormatter;
})(_formatter2['default']);

NumberFormatter.prototype._allowsFloats = null;
/** @private */
NumberFormatter.prototype._alwaysShowsDecimalSeparator = null;
/** @private */
NumberFormatter.prototype._countryCode = null;
/** @private */
NumberFormatter.prototype._currencyCode = null;
/** @private */
NumberFormatter.prototype._exponent = null;
/** @private */
NumberFormatter.prototype._groupingSeparator = null;
/** @private */
NumberFormatter.prototype._groupingSize = null;
/** @private */
NumberFormatter.prototype._lenient = false;
/** @private */
NumberFormatter.prototype._locale = null;
/** @private */
NumberFormatter.prototype._internationalCurrencySymbol = null;
/** @private */
NumberFormatter.prototype._maximumFractionDigits = null;
/** @private */
NumberFormatter.prototype._minimumFractionDigits = null;
/** @private */
NumberFormatter.prototype._maximumIntegerDigits = null;
/** @private */
NumberFormatter.prototype._minimumIntegerDigits = null;
/** @private */
NumberFormatter.prototype._maximum = null;
/** @private */
NumberFormatter.prototype._minimum = null;
/** @private */
NumberFormatter.prototype._notANumberSymbol = null;
/** @private */
NumberFormatter.prototype._nullSymbol = null;
/** @private */
NumberFormatter.prototype._numberStyle = null;
/** @private */
NumberFormatter.prototype._roundingMode = null;
/** @private */
NumberFormatter.prototype._usesGroupingSeparator = null;
/** @private */
NumberFormatter.prototype._zeroSymbol = null;

/**
 * Aliases
 */

NumberFormatter.prototype.stringFromNumber = NumberFormatter.prototype.format;
NumberFormatter.prototype.numberFromString = NumberFormatter.prototype.parse;

NumberFormatter.Rounding = _stround.modes;

/**
 * @enum {number}
 * @readonly
 */
NumberFormatter.Style = {
  NONE: NONE,
  CURRENCY: CURRENCY,
  PERCENT: PERCENT
};

/**
 * @namespace StyleDefaults
 */
var StyleDefaults = {
  NONE: {
    usesGroupingSeparator: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumIntegerDigits: 0
  },
  PERCENT: {
    usesGroupingSeparator: false,
    exponent: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    minimumIntegerDigits: 1,
    positiveSuffix: function positiveSuffix(formatter) {
      return formatter.percentSymbol();
    },
    negativeSuffix: function negativeSuffix(formatter) {
      return formatter.percentSymbol();
    }
  },
  CURRENCY: {
    positivePrefix: function positivePrefix(formatter, locale) {
      return get(locale, 'positiveCurrencyPrefix', formatter, this);
    },
    positiveSuffix: function positiveSuffix(formatter, locale) {
      return get(locale, 'positiveCurrencySuffix', formatter, this);
    },
    negativePrefix: function negativePrefix(formatter, locale) {
      return get(locale, 'negativeCurrencyPrefix', formatter, this);
    },
    negativeSuffix: function negativeSuffix(formatter, locale) {
      return get(locale, 'negativeCurrencySuffix', formatter, this);
    }
  }
};

/**
 * Contains the default values for various number formatter settings, including
 * per-locale overrides. Some of these characters will not be used as-is and
 * instead serve as placeholders:
 *
 *   "¤"  placeholder for `currencySymbol()`.
 *   "-"  placeholder for `minusSign()`.
 *   "+"  placeholder for `plusSign()`.
 *
 * @namespace LocaleDefaults
 */
var LocaleDefaults = {
  'default': {
    allowsFloats: true,
    alwaysShowsDecimalSeparator: false,
    decimalSeparator: '.',
    groupingSeparator: ',',
    groupingSize: 3,
    minusSign: '-',
    negativeInfinitySymbol: '-∞',
    negativePrefix: '-',
    negativeSuffix: '',
    notANumberSymbol: 'NaN',
    nullSymbol: '',
    percentSymbol: '%',
    positiveInfinitySymbol: '+∞',
    positivePrefix: '',
    positiveSuffix: '',
    plusSign: '+',
    roundingMode: NumberFormatter.Rounding.HALF_EVEN,
    positiveCurrencyPrefix: '¤',
    positiveCurrencySuffix: '',
    negativeCurrencyPrefix: '(¤',
    negativeCurrencySuffix: ')'
  },
  fr: {
    decimalSeparator: ',',
    groupingSeparator: ' ',
    percentSymbol: ' %',
    positiveCurrencyPrefix: '',
    positiveCurrencySuffix: ' ¤',
    negativeCurrencyPrefix: '(',
    negativeCurrencySuffix: ' ¤)'
  },
  ja: {
    negativeCurrencyPrefix: '-¤',
    negativeCurrencySuffix: ''
  },
  'en-GB': {
    negativeCurrencyPrefix: '-¤',
    negativeCurrencySuffix: ''
  }
};

/**
 * @namespace RegionDefaults
 */
var RegionDefaults = {
  AE: {
    currencyCode: 'AED'
  },
  AG: {
    currencyCode: 'XCD'
  },
  AI: {
    currencyCode: 'XCD'
  },
  AL: {
    currencyCode: 'ALL'
  },
  AM: {
    currencyCode: 'AMD'
  },
  AO: {
    currencyCode: 'AOA'
  },
  AR: {
    currencyCode: 'ARS'
  },
  AT: {
    currencyCode: 'EUR'
  },
  AU: {
    currencyCode: 'AUD'
  },
  AW: {
    currencyCode: 'AWG'
  },
  AZ: {
    currencyCode: 'AZN'
  },
  BA: {
    currencyCode: 'BAM'
  },
  BB: {
    currencyCode: 'BBD'
  },
  BD: {
    currencyCode: 'BDT'
  },
  BE: {
    currencyCode: 'EUR'
  },
  BF: {
    currencyCode: 'XOF'
  },
  BG: {
    currencyCode: 'BGN'
  },
  BH: {
    currencyCode: 'BHD'
  },
  BJ: {
    currencyCode: 'XOF'
  },
  BM: {
    currencyCode: 'BMD'
  },
  BN: {
    currencyCode: 'BND'
  },
  BO: {
    currencyCode: 'BOB'
  },
  BR: {
    currencyCode: 'BRL'
  },
  BS: {
    currencyCode: 'BSD'
  },
  BT: {
    currencyCode: 'BTN'
  },
  BW: {
    currencyCode: 'BWP'
  },
  BY: {
    currencyCode: 'BYR'
  },
  BZ: {
    currencyCode: 'BZD'
  },
  CA: {
    currencyCode: 'CAD'
  },
  CG: {
    currencyCode: 'CDF'
  },
  CH: {
    currencyCode: 'CHF'
  },
  CI: {
    currencyCode: 'XOF'
  },
  CL: {
    currencyCode: 'CLP'
  },
  CM: {
    currencyCode: 'XAF'
  },
  CN: {
    currencyCode: 'CNY'
  },
  CO: {
    currencyCode: 'COP'
  },
  CR: {
    currencyCode: 'CRC'
  },
  CV: {
    currencyCode: 'CVE'
  },
  CY: {
    currencyCode: 'EUR'
  },
  CZ: {
    currencyCode: 'CZK'
  },
  DE: {
    currencyCode: 'EUR'
  },
  DK: {
    currencyCode: 'DKK'
  },
  DM: {
    currencyCode: 'XCD'
  },
  DO: {
    currencyCode: 'DOP'
  },
  DZ: {
    currencyCode: 'DZD'
  },
  EC: {
    currencyCode: 'USD'
  },
  EE: {
    currencyCode: 'EUR'
  },
  EG: {
    currencyCode: 'EGP'
  },
  ES: {
    currencyCode: 'EUR'
  },
  ET: {
    currencyCode: 'ETB'
  },
  FI: {
    currencyCode: 'EUR'
  },
  FJ: {
    currencyCode: 'FJD'
  },
  FM: {
    currencyCode: 'USD'
  },
  FR: {
    currencyCode: 'EUR'
  },
  GA: {
    currencyCode: 'XAF'
  },
  GB: {
    currencyCode: 'GBP'
  },
  GD: {
    currencyCode: 'XCD'
  },
  GE: {
    currencyCode: 'GEL'
  },
  GH: {
    currencyCode: 'GHS'
  },
  GI: {
    currencyCode: 'GIP'
  },
  GM: {
    currencyCode: 'GMD'
  },
  GR: {
    currencyCode: 'EUR'
  },
  GT: {
    currencyCode: 'GTQ'
  },
  GU: {
    currencyCode: 'USD'
  },
  GW: {
    currencyCode: 'XOF'
  },
  GY: {
    currencyCode: 'GYD'
  },
  HK: {
    currencyCode: 'HKD'
  },
  HN: {
    currencyCode: 'HNL'
  },
  HR: {
    currencyCode: 'HRK'
  },
  HT: {
    currencyCode: 'HTG'
  },
  HU: {
    currencyCode: 'HUF'
  },
  ID: {
    currencyCode: 'IDR'
  },
  IE: {
    currencyCode: 'EUR'
  },
  IL: {
    currencyCode: 'ILS'
  },
  IN: {
    currencyCode: 'INR'
  },
  IS: {
    currencyCode: 'ISK'
  },
  IT: {
    currencyCode: 'EUR'
  },
  JM: {
    currencyCode: 'JMD'
  },
  JO: {
    currencyCode: 'JOD'
  },
  JP: {
    currencyCode: 'JPY'
  },
  KE: {
    currencyCode: 'KES'
  },
  KG: {
    currencyCode: 'KGS'
  },
  KH: {
    currencyCode: 'KHR'
  },
  KN: {
    currencyCode: 'XCD'
  },
  KR: {
    currencyCode: 'KRW'
  },
  KW: {
    currencyCode: 'KWD'
  },
  KY: {
    currencyCode: 'KYD'
  },
  KZ: {
    currencyCode: 'KZT'
  },
  LA: {
    currencyCode: 'LAK'
  },
  LB: {
    currencyCode: 'LBP'
  },
  LC: {
    currencyCode: 'XCD'
  },
  LI: {
    currencyCode: 'CHF'
  },
  LK: {
    currencyCode: 'LKR'
  },
  LR: {
    currencyCode: 'LRD'
  },
  LT: {
    currencyCode: 'LTL'
  },
  LU: {
    currencyCode: 'EUR'
  },
  LV: {
    currencyCode: 'EUR'
  },
  MA: {
    currencyCode: 'MAD'
  },
  MD: {
    currencyCode: 'MDL'
  },
  MG: {
    currencyCode: 'MGA'
  },
  MK: {
    currencyCode: 'MKD'
  },
  ML: {
    currencyCode: 'XOF'
  },
  MM: {
    currencyCode: 'MMK'
  },
  MN: {
    currencyCode: 'MNT'
  },
  MO: {
    currencyCode: 'MOP'
  },
  MP: {
    currencyCode: 'USD'
  },
  MR: {
    currencyCode: 'MRO'
  },
  MS: {
    currencyCode: 'XCD'
  },
  MT: {
    currencyCode: 'EUR'
  },
  MU: {
    currencyCode: 'MUR'
  },
  MW: {
    currencyCode: 'MWK'
  },
  MX: {
    currencyCode: 'MXN'
  },
  MY: {
    currencyCode: 'MYR'
  },
  MZ: {
    currencyCode: 'MZN'
  },
  NA: {
    currencyCode: 'NAD'
  },
  NE: {
    currencyCode: 'XOF'
  },
  NG: {
    currencyCode: 'NGN'
  },
  NI: {
    currencyCode: 'NIO'
  },
  NL: {
    currencyCode: 'EUR'
  },
  NO: {
    currencyCode: 'NOK'
  },
  NP: {
    currencyCode: 'NPR'
  },
  NZ: {
    currencyCode: 'NZD'
  },
  OM: {
    currencyCode: 'OMR'
  },
  PA: {
    currencyCode: 'PAB'
  },
  PE: {
    currencyCode: 'PEN'
  },
  PG: {
    currencyCode: 'PGK'
  },
  PH: {
    currencyCode: 'PHP'
  },
  PK: {
    currencyCode: 'PKR'
  },
  PL: {
    currencyCode: 'PLN'
  },
  PR: {
    currencyCode: 'USD'
  },
  PT: {
    currencyCode: 'EUR'
  },
  PW: {
    currencyCode: 'USD'
  },
  PY: {
    currencyCode: 'PYG'
  },
  QA: {
    currencyCode: 'QAR'
  },
  RO: {
    currencyCode: 'RON'
  },
  RS: {
    currencyCode: 'RSD'
  },
  RU: {
    currencyCode: 'RUB'
  },
  RW: {
    currencyCode: 'RWF'
  },
  SA: {
    currencyCode: 'SAR'
  },
  SB: {
    currencyCode: 'SBD'
  },
  SC: {
    currencyCode: 'SCR'
  },
  SE: {
    currencyCode: 'SEK'
  },
  SG: {
    currencyCode: 'SGD'
  },
  SI: {
    currencyCode: 'EUR'
  },
  SK: {
    currencyCode: 'EUR'
  },
  SL: {
    currencyCode: 'SLL'
  },
  SN: {
    currencyCode: 'XOF'
  },
  SR: {
    currencyCode: 'SRD'
  },
  ST: {
    currencyCode: 'STD'
  },
  SV: {
    currencyCode: 'SVC'
  },
  SZ: {
    currencyCode: 'SZL'
  },
  TC: {
    currencyCode: 'USD'
  },
  TD: {
    currencyCode: 'XAF'
  },
  TG: {
    currencyCode: 'XOF'
  },
  TH: {
    currencyCode: 'THB'
  },
  TJ: {
    currencyCode: 'TJS'
  },
  TM: {
    currencyCode: 'TMT'
  },
  TN: {
    currencyCode: 'TND'
  },
  TR: {
    currencyCode: 'TRY'
  },
  TT: {
    currencyCode: 'TTD'
  },
  TW: {
    currencyCode: 'TWD'
  },
  TZ: {
    currencyCode: 'TZS'
  },
  UA: {
    currencyCode: 'UAH'
  },
  UG: {
    currencyCode: 'UGX'
  },
  US: {
    currencyCode: 'USD'
  },
  UY: {
    currencyCode: 'UYU'
  },
  UZ: {
    currencyCode: 'UZS'
  },
  VC: {
    currencyCode: 'XCD'
  },
  VE: {
    currencyCode: 'VEF'
  },
  VG: {
    currencyCode: 'USD'
  },
  VI: {
    currencyCode: 'USD'
  },
  VN: {
    currencyCode: 'VND'
  },
  YE: {
    currencyCode: 'YER'
  },
  ZA: {
    currencyCode: 'ZAR'
  },
  ZM: {
    currencyCode: 'ZMW'
  },
  ZW: {
    currencyCode: 'USD'
  }
};

/**
 * @namespace CurrencyDefaults
 */
var CurrencyDefaults = {
  'default': {
    currencySymbol: function currencySymbol(formatter) {
      return formatter.currencyCode();
    },
    internationalCurrencySymbol: function internationalCurrencySymbol(formatter) {
      return formatter.currencyCode();
    },
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    usesGroupingSeparator: true
  },
  AED: {
    currencySymbol: 'د.إ',
    internationalCurrencySymbol: 'د.إ'
  },
  ALL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  AMD: {
    currencySymbol: 'դր.',
    internationalCurrencySymbol: 'դր.'
  },
  AOA: {
    currencySymbol: 'Kz',
    internationalCurrencySymbol: 'Kz'
  },
  ARS: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  AUD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  AWG: {
    currencySymbol: 'ƒ',
    internationalCurrencySymbol: 'ƒ'
  },
  AZN: {
    currencySymbol: '₼',
    internationalCurrencySymbol: '₼'
  },
  BAM: {
    currencySymbol: 'КМ',
    internationalCurrencySymbol: 'КМ'
  },
  BBD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BDT: {
    currencySymbol: '৳',
    internationalCurrencySymbol: '৳'
  },
  BGN: {
    currencySymbol: 'лв',
    internationalCurrencySymbol: 'лв'
  },
  BHD: {
    currencySymbol: 'ب.د',
    internationalCurrencySymbol: 'ب.د',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  BMD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BND: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BOB: {
    currencySymbol: 'Bs.',
    internationalCurrencySymbol: 'Bs.'
  },
  BRL: {
    currencySymbol: 'R$',
    internationalCurrencySymbol: 'R$'
  },
  BSD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  BTN: {
    currencySymbol: 'Nu.',
    internationalCurrencySymbol: 'Nu.'
  },
  BWP: {
    currencySymbol: 'P',
    internationalCurrencySymbol: 'P'
  },
  BYR: {
    currencySymbol: 'Br',
    internationalCurrencySymbol: 'Br'
  },
  BZD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CAD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CDF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  CHF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  CLP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  CNY: {
    currencySymbol: '¥',
    internationalCurrencySymbol: '¥'
  },
  COP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CRC: {
    currencySymbol: '₡',
    internationalCurrencySymbol: '₡'
  },
  CVE: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  CZK: {
    currencySymbol: 'Kč',
    internationalCurrencySymbol: 'Kč'
  },
  DKK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  DOP: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  DZD: {
    currencySymbol: 'د.ج',
    internationalCurrencySymbol: 'د.ج'
  },
  EGP: {
    currencySymbol: 'E£',
    internationalCurrencySymbol: 'E£'
  },
  ETB: {
    currencySymbol: 'ብር',
    internationalCurrencySymbol: 'ብር'
  },
  EUR: {
    currencySymbol: '€',
    internationalCurrencySymbol: '€'
  },
  FJD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  GBP: {
    currencySymbol: '£',
    internationalCurrencySymbol: '£'
  },
  GEL: {
    currencySymbol: 'ლ,',
    internationalCurrencySymbol: 'ლ,'
  },
  GHS: {
    currencySymbol: '₵',
    internationalCurrencySymbol: '₵'
  },
  GIP: {
    currencySymbol: '£',
    internationalCurrencySymbol: '£'
  },
  GMD: {
    currencySymbol: 'D',
    internationalCurrencySymbol: 'D'
  },
  GTQ: {
    currencySymbol: 'Q',
    internationalCurrencySymbol: 'Q'
  },
  GYD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  HKD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  HNL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  HRK: {
    currencySymbol: 'kn',
    internationalCurrencySymbol: 'kn'
  },
  HTG: {
    currencySymbol: 'G',
    internationalCurrencySymbol: 'G'
  },
  HUF: {
    currencySymbol: 'Ft',
    internationalCurrencySymbol: 'Ft'
  },
  IDR: {
    currencySymbol: 'Rp',
    internationalCurrencySymbol: 'Rp'
  },
  ILS: {
    currencySymbol: '₪',
    internationalCurrencySymbol: '₪'
  },
  INR: {
    currencySymbol: '₹',
    internationalCurrencySymbol: '₹'
  },
  ISK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  JMD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  JOD: {
    currencySymbol: 'د.ا',
    internationalCurrencySymbol: 'د.ا',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  JPY: {
    currencySymbol: '¥',
    internationalCurrencySymbol: '¥',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  KES: {
    currencySymbol: 'KSh',
    internationalCurrencySymbol: 'KSh'
  },
  KGS: {
    currencySymbol: 'som',
    internationalCurrencySymbol: 'som'
  },
  KHR: {
    currencySymbol: '៛',
    internationalCurrencySymbol: '៛'
  },
  KRW: {
    currencySymbol: '₩',
    internationalCurrencySymbol: '₩',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  KWD: {
    currencySymbol: 'د.ك',
    internationalCurrencySymbol: 'د.ك',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  KYD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  KZT: {
    currencySymbol: '〒',
    internationalCurrencySymbol: '〒'
  },
  LAK: {
    currencySymbol: '₭',
    internationalCurrencySymbol: '₭'
  },
  LBP: {
    currencySymbol: 'ل.ل',
    internationalCurrencySymbol: 'ل.ل'
  },
  LKR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  LRD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  LTL: {
    currencySymbol: 'Lt',
    internationalCurrencySymbol: 'Lt'
  },
  MAD: {
    currencySymbol: 'د.م.',
    internationalCurrencySymbol: 'د.م.'
  },
  MDL: {
    currencySymbol: 'L',
    internationalCurrencySymbol: 'L'
  },
  MGA: {
    currencySymbol: 'Ar',
    internationalCurrencySymbol: 'Ar',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  MKD: {
    currencySymbol: 'ден',
    internationalCurrencySymbol: 'ден'
  },
  MMK: {
    currencySymbol: 'K',
    internationalCurrencySymbol: 'K'
  },
  MNT: {
    currencySymbol: '₮',
    internationalCurrencySymbol: '₮'
  },
  MOP: {
    currencySymbol: 'P',
    internationalCurrencySymbol: 'P'
  },
  MRO: {
    currencySymbol: 'UM',
    internationalCurrencySymbol: 'UM',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  MUR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  MWK: {
    currencySymbol: 'MK',
    internationalCurrencySymbol: 'MK'
  },
  MXN: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  MYR: {
    currencySymbol: 'RM',
    internationalCurrencySymbol: 'RM'
  },
  MZN: {
    currencySymbol: 'MTn',
    internationalCurrencySymbol: 'MTn'
  },
  NAD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  NGN: {
    currencySymbol: '₦',
    internationalCurrencySymbol: '₦'
  },
  NIO: {
    currencySymbol: 'C$',
    internationalCurrencySymbol: 'C$'
  },
  NOK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  NPR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  NZD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  OMR: {
    currencySymbol: 'ر.ع.',
    internationalCurrencySymbol: 'ر.ع.',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  PAB: {
    currencySymbol: 'B/.',
    internationalCurrencySymbol: 'B/.'
  },
  PEN: {
    currencySymbol: 'S/.',
    internationalCurrencySymbol: 'S/.'
  },
  PGK: {
    currencySymbol: 'K',
    internationalCurrencySymbol: 'K'
  },
  PHP: {
    currencySymbol: '₱',
    internationalCurrencySymbol: '₱'
  },
  PKR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  PLN: {
    currencySymbol: 'zł',
    internationalCurrencySymbol: 'zł'
  },
  PYG: {
    currencySymbol: '₲',
    internationalCurrencySymbol: '₲'
  },
  QAR: {
    currencySymbol: 'ر.ق',
    internationalCurrencySymbol: 'ر.ق'
  },
  RON: {
    currencySymbol: 'Lei',
    internationalCurrencySymbol: 'Lei'
  },
  RSD: {
    currencySymbol: 'РСД',
    internationalCurrencySymbol: 'РСД'
  },
  RUB: {
    currencySymbol: '₽',
    internationalCurrencySymbol: '₽'
  },
  RWF: {
    currencySymbol: 'FRw',
    internationalCurrencySymbol: 'FRw'
  },
  SAR: {
    currencySymbol: 'ر.س',
    internationalCurrencySymbol: 'ر.س'
  },
  SBD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  SCR: {
    currencySymbol: '₨',
    internationalCurrencySymbol: '₨'
  },
  SEK: {
    currencySymbol: 'kr',
    internationalCurrencySymbol: 'kr'
  },
  SGD: {
    currencySymbol: 'S$',
    internationalCurrencySymbol: 'S$'
  },
  SLL: {
    currencySymbol: 'Le',
    internationalCurrencySymbol: 'Le'
  },
  SRD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  STD: {
    currencySymbol: 'Db',
    internationalCurrencySymbol: 'Db'
  },
  SVC: {
    currencySymbol: '₡',
    internationalCurrencySymbol: '₡'
  },
  SZL: {
    currencySymbol: 'E',
    internationalCurrencySymbol: 'E'
  },
  THB: {
    currencySymbol: '฿',
    internationalCurrencySymbol: '฿'
  },
  TJS: {
    currencySymbol: 'ЅМ',
    internationalCurrencySymbol: 'ЅМ'
  },
  TMT: {
    currencySymbol: 'm',
    internationalCurrencySymbol: 'm'
  },
  TND: {
    currencySymbol: 'د.ت',
    internationalCurrencySymbol: 'د.ت',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  },
  TRY: {
    currencySymbol: '₺',
    internationalCurrencySymbol: '₺'
  },
  TTD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  TWD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  TZS: {
    currencySymbol: 'Sh',
    internationalCurrencySymbol: 'Sh'
  },
  UAH: {
    currencySymbol: '₴',
    internationalCurrencySymbol: '₴'
  },
  UGX: {
    currencySymbol: 'USh',
    internationalCurrencySymbol: 'USh'
  },
  USD: {
    currencySymbol: '$',
    internationalCurrencySymbol: 'US$'
  },
  UYU: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  UZS: {
    currencySymbol: 'лв',
    internationalCurrencySymbol: 'лв'
  },
  VEF: {
    currencySymbol: 'Bs F',
    internationalCurrencySymbol: 'Bs F'
  },
  VND: {
    currencySymbol: '₫',
    internationalCurrencySymbol: '₫',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  },
  XAF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  XCD: {
    currencySymbol: '$',
    internationalCurrencySymbol: '$'
  },
  XOF: {
    currencySymbol: 'Fr',
    internationalCurrencySymbol: 'Fr'
  },
  YER: {
    currencySymbol: '﷼',
    internationalCurrencySymbol: '﷼'
  },
  ZAR: {
    currencySymbol: 'R',
    internationalCurrencySymbol: 'R'
  },
  ZMW: {
    currencySymbol: 'ZMK',
    internationalCurrencySymbol: 'ZMK'
  }
};

exports['default'] = NumberFormatter;
module.exports = exports['default'];

},{"./formatter":15,"./number_formatter_settings_formatter":18,"./utils":23,"stround":3}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var NumberFormatterSettings = function NumberFormatterSettings() {
  _classCallCheck(this, NumberFormatterSettings);

  /** @type boolean */
  this.alwaysShowsDecimalSeparator = false;

  /** @type number */
  this.groupingSize = 0;

  /** @type number */
  this.maximumFractionDigits = 0;

  /** @type number */
  this.minimumFractionDigits = 0;

  /** @type number */
  this.minimumIntegerDigits = 0;

  /** @type string */
  this.prefix = '';

  /** @type string */
  this.suffix = '';

  /** @type boolean */
  this.usesGroupingSeparator = false;
}

/**
 * Returns a string composed of the given character repeated `length` times.
 *
 * @param {string} character
 * @param {number} length
 * @returns {string}
 * @private
 */
;

function chars(character, length) {
  return new Array(length + 1).join(character);
}

/**
 * @const
 * @private
 */
var DIGIT = '#';

/**
 * @const
 * @private
 */
var PADDING = '0';

/**
 * @const
 * @private
 */
var DECIMAL_SEPARATOR = '.';

/**
 * @const
 * @private
 */
var GROUPING_SEPARATOR = ',';

var NumberFormatterSettingsFormatter = (function (_Formatter) {
  _inherits(NumberFormatterSettingsFormatter, _Formatter);

  function NumberFormatterSettingsFormatter() {
    _classCallCheck(this, NumberFormatterSettingsFormatter);

    _get(Object.getPrototypeOf(NumberFormatterSettingsFormatter.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NumberFormatterSettingsFormatter, [{
    key: 'format',

    /**
     * @param {NumberFormatterSettings} settings
     * @returns {string}
     */
    value: function format(settings) {
      var result = '';

      var minimumIntegerDigits = settings.minimumIntegerDigits;
      if (minimumIntegerDigits !== 0) {
        result += chars(PADDING, minimumIntegerDigits);
      }

      result = DIGIT + result;

      if (settings.usesGroupingSeparator) {
        while (result.length <= settings.groupingSize) {
          result = DIGIT + result;
        }

        result = result.slice(0, -settings.groupingSize) + GROUPING_SEPARATOR + result.slice(-settings.groupingSize);
      }

      var minimumFractionDigits = settings.minimumFractionDigits;
      var maximumFractionDigits = settings.maximumFractionDigits;
      var hasFractionalPart = settings.alwaysShowsDecimalSeparator || minimumFractionDigits > 0 || maximumFractionDigits > 0;

      if (hasFractionalPart) {
        result += DECIMAL_SEPARATOR;
        for (var i = 0, _length = maximumFractionDigits; i < _length; i++) {
          result += i < minimumFractionDigits ? PADDING : DIGIT;
        }
      }

      return settings.prefix + result + settings.suffix;
    }

    /**
     * @param {string} string
     * @returns {?NumberFormatterSettings}
     */
  }, {
    key: 'parse',
    value: function parse(string) {
      var result = new NumberFormatterSettings();

      var hasPassedPrefix = false;
      var hasStartedSuffix = false;
      var decimalSeparatorIndex = null;
      var groupingSeparatorIndex = null;
      var lastIntegerDigitIndex = null;

      for (var i = 0, length = string.length; i < length; i++) {
        var c = string[i];

        switch (c) {
          case DIGIT:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            if (decimalSeparatorIndex !== null) {
              result.maximumFractionDigits++;
            }
            break;

          case PADDING:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            if (decimalSeparatorIndex === null) {
              result.minimumIntegerDigits++;
            } else {
              result.minimumFractionDigits++;
              result.maximumFractionDigits++;
            }
            break;

          case DECIMAL_SEPARATOR:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            decimalSeparatorIndex = i;
            lastIntegerDigitIndex = i - 1;
            break;

          case GROUPING_SEPARATOR:
            if (hasStartedSuffix) {
              return null;
            }
            hasPassedPrefix = true;
            groupingSeparatorIndex = i;
            break;

          default:
            if (hasPassedPrefix) {
              hasStartedSuffix = true;
              result.suffix += c;
            } else {
              result.prefix += c;
            }
        }
      }

      if (decimalSeparatorIndex === null) {
        lastIntegerDigitIndex = length - 1;
      }

      if (decimalSeparatorIndex === length - 1) {
        result.alwaysShowsDecimalSeparator = true;
      }

      if (groupingSeparatorIndex !== null) {
        result.groupingSize = lastIntegerDigitIndex - groupingSeparatorIndex;
        result.usesGroupingSeparator = true;
      }

      return result;
    }
  }]);

  return NumberFormatterSettingsFormatter;
})(_formatter2['default']);

exports['default'] = NumberFormatterSettingsFormatter;
module.exports = exports['default'];

},{"./formatter":15}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var NANPPhoneDelimiters = {
  0: '(',
  4: ')',
  5: ' ',
  9: '-'
};

/**
 * @const
 * @private
 */
var NANPPhoneDelimitersWithOne = {
  1: ' ',
  2: '(',
  6: ')',
  7: ' ',
  11: '-'
};

/**
 * @const
 * @private
 */
var NANPPhoneDelimitersWithPlus = {
  2: ' ',
  3: '(',
  7: ')',
  8: ' ',
  12: '-'
};

/**
 * This should match any characters in the maps above.
 *
 * @const
 * @private
 */
var DELIMITER_PATTERN = /[-\(\) ]/g;

/**
 * @extends DelimitedTextFormatter
 */

var PhoneFormatter = (function (_DelimitedTextFormatter) {
  _inherits(PhoneFormatter, _DelimitedTextFormatter);

  /**
   * @throws {Error} if anything is passed in
   * @param {Array} args
   */

  function PhoneFormatter() {
    _classCallCheck(this, PhoneFormatter);

    _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'constructor', this).call(this);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length !== 0) {
      throw new Error('were you trying to set a delimiter (' + args[0] + ')?');
    }
  }

  /**
   * @param {string} chr
   * @returns {boolean}
   */

  _createClass(PhoneFormatter, [{
    key: 'isDelimiter',
    value: function isDelimiter(chr) {
      var map = this.delimiterMap;
      for (var index in map) {
        if (map.hasOwnProperty(index)) {
          if (map[index] === chr) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * @param {number} index
     * @returns {?string}
     */
  }, {
    key: 'delimiterAt',
    value: function delimiterAt(index) {
      return this.delimiterMap[index];
    }

    /**
     * @param {number} index
     * @returns {boolean}
     */
  }, {
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      var delimiter = this.delimiterAt(index);
      return delimiter !== undefined && delimiter !== null;
    }

    /**
     * Will call parse on the formatter.
     *
     * @param {string} text
     * @param {function(string)} error
     * @returns {string} returns value with delimiters removed
     */
  }, {
    key: 'parse',
    value: function parse(text, error) {
      if (!error) {
        error = function () {};
      }
      var digits = this.digitsWithoutCountryCode(text);
      // Source: http://en.wikipedia.org/wiki/North_American_Numbering_Plan
      //
      // Area Code
      if (text.length < 10) {
        error('phone-formatter.number-too-short');
      }
      if (digits[0] === '0') {
        error('phone-formatter.area-code-zero');
      }
      if (digits[0] === '1') {
        error('phone-formatter.area-code-one');
      }
      if (digits[1] === '9') {
        error('phone-formatter.area-code-n9n');
      }
      // Central Office Code
      if (digits[3] === '1') {
        error('phone-formatter.central-office-one');
      }
      if (digits.slice(4, 6) === '11') {
        error('phone-formatter.central-office-n11');
      }
      return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'parse', this).call(this, text, error);
    }

    /**
     * @param {string} value
     * @returns {string}
     */
  }, {
    key: 'format',
    value: function format(value) {
      this.guessFormatFromText(value);
      return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'format', this).call(this, this.removeDelimiterMapChars(value));
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      this.guessFormatFromText(change.proposed.text);

      if (change.inserted.text.length > 1) {
        // handle pastes
        var text = change.current.text;
        var selectedRange = change.current.selectedRange;
        var toInsert = change.inserted.text;

        // Replace the selection with the new text, remove non-digits, then format.
        var formatted = this.format((text.slice(0, selectedRange.start) + toInsert + text.slice(selectedRange.start + selectedRange.length)).replace(/[^\d]/g, ''));

        change.proposed = {
          text: formatted,
          selectedRange: {
            start: formatted.length - (text.length - (selectedRange.start + selectedRange.length)),
            length: 0
          }
        };

        return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      }

      if (/^\d*$/.test(change.inserted.text) || change.proposed.text.indexOf('+') === 0) {
        return _get(Object.getPrototypeOf(PhoneFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }

    /**
     * Re-configures this formatter to use the delimiters appropriate
     * for the given text.
     *
     * @param {string} text A potentially formatted string containing a phone number.
     * @private
     */
  }, {
    key: 'guessFormatFromText',
    value: function guessFormatFromText(text) {
      if (text && text[0] === '+') {
        this.delimiterMap = NANPPhoneDelimitersWithPlus;
        this.maximumLength = 1 + 1 + 10 + 5;
      } else if (text && text[0] === '1') {
        this.delimiterMap = NANPPhoneDelimitersWithOne;
        this.maximumLength = 1 + 10 + 5;
      } else {
        this.delimiterMap = NANPPhoneDelimiters;
        this.maximumLength = 10 + 4;
      }
    }

    /**
     * Gives back just the phone number digits as a string without the
     * country code. Future-proofing internationalization where the country code
     * isn't just +1.
     *
     * @param {string} text
     * @private
     */
  }, {
    key: 'digitsWithoutCountryCode',
    value: function digitsWithoutCountryCode(text) {
      var digits = (text || '').replace(/[^\d]/g, '');
      var extraDigits = digits.length - 10;
      if (extraDigits > 0) {
        digits = digits.substr(extraDigits);
      }
      return digits;
    }

    /**
     * Removes characters from the phone number that will be added
     * by the formatter.
     *
     * @param {string} text
     * @private
     */
  }, {
    key: 'removeDelimiterMapChars',
    value: function removeDelimiterMapChars(text) {
      return (text || '').replace(DELIMITER_PATTERN, '');
    }
  }]);

  return PhoneFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = PhoneFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _delimited_text_formatter = require('./delimited_text_formatter');

var _delimited_text_formatter2 = _interopRequireDefault(_delimited_text_formatter);

/**
 * @const
 * @private
 */
var DIGITS_PATTERN = /^\d*$/;

/**
 * @extends DelimitedTextFormatter
 */

var SocialSecurityNumberFormatter = (function (_DelimitedTextFormatter) {
  _inherits(SocialSecurityNumberFormatter, _DelimitedTextFormatter);

  function SocialSecurityNumberFormatter() {
    _classCallCheck(this, SocialSecurityNumberFormatter);

    _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'constructor', this).call(this, '-');
    this.maximumLength = 9 + 2;
  }

  /**
   * @param {number} index
   * @returns {boolean}
   */

  _createClass(SocialSecurityNumberFormatter, [{
    key: 'hasDelimiterAtIndex',
    value: function hasDelimiterAtIndex(index) {
      return index === 3 || index === 6;
    }

    /**
     * Determines whether the given change should be allowed and, if so, whether
     * it should be altered.
     *
     * @param {TextFieldStateChange} change
     * @param {function(string)} error
     * @returns {boolean}
     */
  }, {
    key: 'isChangeValid',
    value: function isChangeValid(change, error) {
      if (DIGITS_PATTERN.test(change.inserted.text)) {
        return _get(Object.getPrototypeOf(SocialSecurityNumberFormatter.prototype), 'isChangeValid', this).call(this, change, error);
      } else {
        return false;
      }
    }
  }]);

  return SocialSecurityNumberFormatter;
})(_delimited_text_formatter2['default']);

exports['default'] = SocialSecurityNumberFormatter;
module.exports = exports['default'];

},{"./delimited_text_formatter":10}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _undo_manager = require('./undo_manager');

var _undo_manager2 = _interopRequireDefault(_undo_manager);

var _utils = require('./utils');

var _caret = require('./caret');

/**
 * Simulates input behavior.
 *
 * @external InputSim
 * @see https://github.com/iamJoeTaylor/input-sim
 */

var _inputSim = require('input-sim');

/**
 * TextField is the simplest input and the base for more complex
 * types to inherit.
 *
 * @extends external:InputSim.Input
 */

var TextField = (function (_Input) {
  _inherits(TextField, _Input);

  /**
   * Sets up the initial properties of the TextField and
   * sets  up the event listeners
   *
   * @param {HTMLElement} element
   * @param {Formatter} formatter
   */

  function TextField(element, formatter) {
    _classCallCheck(this, TextField);

    _get(Object.getPrototypeOf(TextField.prototype), 'constructor', this).call(this);

    var caret = (0, _caret.getCaret)(element);
    if (typeof element.get === 'function') {
      console.warn('DEPRECATION: FieldKit.TextField instances should no longer be ' + 'created with a jQuery-wrapped element.');
      element = element.get(0);
    }
    this.element = element;
    this._formatter = formatter;
    this._enabled = true;
    this._manualCaret = { start: 0, end: 0 };
    this._placeholder = null;
    this._disabledPlaceholder = null;
    this._focusedPlaceholder = null;
    this._unfocusedPlaceholder = null;
    this._isDirty = false;
    this._valueOnFocus = '';
    this._currentValue = '';
    // Make sure textDidChange fires while the value is correct
    this._needsKeyUpTextDidChangeTrigger = false;
    this._blur = (0, _utils.bind)(this._blur, this);
    this._focus = (0, _utils.bind)(this._focus, this);
    this._click = (0, _utils.bind)(this._click, this);
    this._paste = (0, _utils.bind)(this._paste, this);
    this._keyUp = (0, _utils.bind)(this._keyUp, this);
    this._keyPress = (0, _utils.bind)(this._keyPress, this);
    this._keyDown = (0, _utils.bind)(this._keyDown, this);
    if (element['field-kit-text-field']) {
      throw new Error('already attached a TextField to this element');
    } else {
      element['field-kit-text-field'] = this;
    }
    element.addEventListener('keydown', this._keyDown);
    element.addEventListener('keypress', this._keyPress);
    element.addEventListener('keyup', this._keyUp);
    element.addEventListener('click', this._click);
    element.addEventListener('paste', this._paste);
    element.addEventListener('focus', this._focus);
    element.addEventListener('blur', this._blur);

    if (!element.getAttribute('autocapitalize')) {
      element.setAttribute('autocapitalize', 'off');
    }

    var window = element.ownerDocument.defaultView;

    /**
     * Fixes caret bug (Android) that caused the input
     * to place inserted characters in the wrong place
     * Expected: 1234 5678|  =>  1234 5678 9|
     * Bug: 1234 5678|  =>  1234 5679| 8
     *
     * @private
     */
    this._needsManualCaret = window.navigator.userAgent.toLowerCase().indexOf('android') > -1;

    this.setText(element.value);

    this.setSelectedRange({
      start: caret.start,
      length: caret.end - caret.start
    });
  }

  /**
   * Helps calculate the changes after an event on a FieldKit.TextField.
   *
   * @private
   */

  /**
   * **** Public Events ****
   */

  /**
   * Called when the user has changed the text of the field. Can be used in
   * subclasses to perform actions suitable for this event.
   *
   * @private
   */

  _createClass(TextField, [{
    key: 'textDidChange',
    value: function textDidChange() {}

    /**
     * Called when the user has in some way declared that they are done editing,
     * such as leaving the field or perhaps pressing enter. Can be used in
     * subclasses to perform actions suitable for this event.
     *
     * @private
     */
  }, {
    key: 'textFieldDidEndEditing',
    value: function textFieldDidEndEditing() {}

    /**
     * Performs actions necessary for beginning editing.
     *
     * @private
     */
  }, {
    key: 'textFieldDidBeginEditing',
    value: function textFieldDidBeginEditing() {}

    /**
     * **** Private Events ****
     */

    /**
     * Performs actions necessary for text change.
     *
     * @private
     */
  }, {
    key: '_textDidChange',
    value: function _textDidChange() {
      var delegate = this._delegate;
      this.textDidChange();
      if (delegate && typeof delegate.textDidChange === 'function') {
        delegate.textDidChange(this);
      }

      // manually fire the HTML5 input event
      this._fireEvent('input');
    }

    /**
     * Performs actions necessary for ending editing.
     *
     * @private
     */
  }, {
    key: '_textFieldDidEndEditing',
    value: function _textFieldDidEndEditing() {
      var delegate = this._delegate;
      this.textFieldDidEndEditing();
      if (delegate && typeof delegate.textFieldDidEndEditing === 'function') {
        delegate.textFieldDidEndEditing(this);
      }

      // manually fire the HTML5 change event, only when a change has been made since focus
      if (this._isDirty && this._valueOnFocus !== this.element.value) {
        this._fireEvent('change');
      }

      // reset the dirty property
      this._isDirty = false;
      this._valueOnFocus = '';
    }

    /**
     * Performs actions necessary for beginning editing.
     *
     * @private
     */
  }, {
    key: '_textFieldDidBeginEditing',
    value: function _textFieldDidBeginEditing() {
      var delegate = this._delegate;
      this.textFieldDidBeginEditing();
      if (delegate && typeof delegate.textFieldDidBeginEditing === 'function') {
        delegate.textFieldDidBeginEditing(this);
      }
    }

    /**
     * **** Public Methods ****
     */

    /**
     * Gets the current delegate for this text field.
     *
     * @returns {TextFieldDelegate}
     */
  }, {
    key: 'delegate',
    value: function delegate() {
      return this._delegate;
    }

    /**
     * Sets the current delegate for this text field.
     *
     * @param {TextFieldDelegate} delegate
     */
  }, {
    key: 'setDelegate',
    value: function setDelegate(delegate) {
      this._delegate = delegate;
    }

    /**
     * Tears down FieldKit
     */
  }, {
    key: 'destroy',
    value: function destroy() {
      var element = this.element;
      element.removeEventListener('keydown', this._keyDown);
      element.removeEventListener('keypress', this._keyPress);
      element.removeEventListener('keyup', this._keyUp);
      element.removeEventListener('click', this._click);
      element.removeEventListener('paste', this._paste);
      element.removeEventListener('focus', this._focus);
      element.removeEventListener('blur', this._blur);
      delete element['field-kit-text-field'];
    }

    /**
     * Gets the current formatter. Formatters are used to translate between text
     * and value properties of the field.
     *
     * @returns {Formatter}
     */
  }, {
    key: 'formatter',
    value: function formatter() {
      if (!this._formatter) {
        this._formatter = new _formatter2['default']();
        var maximumLengthString = this.element.getAttribute('maxlength');
        if (maximumLengthString !== undefined && maximumLengthString !== null) {
          this._formatter.maximumLength = parseInt(maximumLengthString, 10);
        }
      }

      return this._formatter;
    }

    /**
     * Sets the current formatter.
     *
     * @param {Formatter} formatter
     */
  }, {
    key: 'setFormatter',
    value: function setFormatter(formatter) {
      var value = this.value();
      this._formatter = formatter;
      this.setValue(value);
    }

    /**
     * Builds a change instance and formats the change to see if it's valid
     *
     * @param   {object} current
     * @param   {object} proposed
     * @returns {?object} false if change doesn't have changes or change isn't valid. Change object if it is.
     */
  }, {
    key: 'hasChangesAndIsValid',
    value: function hasChangesAndIsValid(current, proposed) {
      var _this = this;

      var change = new TextFieldStateChange(this);
      var error = function error(errorType) {
        var delegate = _this.delegate();
        if (delegate) {
          if (typeof delegate.textFieldDidFailToValidateChange === 'function') {
            delegate.textFieldDidFailToValidateChange(_this, change, errorType);
          }
        }
      };
      change.current = { text: current.text, selectedRange: current.selectedRange };
      change.proposed = { text: proposed.text, selectedRange: proposed.selectedRange };
      if (change.hasChanges() && this.formatter().isChangeValid(change, error)) {
        return change;
      }
      return null;
    }

    /**
     * Handles a key event could be trying to end editing.
     *
     */
  }, {
    key: 'insertNewline',
    value: function insertNewline() {
      this._textFieldDidEndEditing();
      this._didEndEditingButKeptFocus = true;
    }

    /**
     * Debug support
     *
     * @returns {string}
     */
  }, {
    key: 'inspect',
    value: function inspect() {
      return '#<TextField text="' + this.text() + '">';
    }

    /**
     * Replaces the current selection with text from the given pasteboard.
     *
     * @param {DataTransfer} pasteboard
     */
  }, {
    key: 'readSelectionFromPasteboard',
    value: function readSelectionFromPasteboard(pasteboard) {
      var range = undefined,
          text = undefined;
      text = pasteboard.getData('Text');
      this.replaceSelection(text);
      range = this.selectedRange();
      range.start += range.length;
      range.length = 0;
      this.setSelectedRange(range);
    }

    /**
     * Checks changes after invoking the passed function for validity and rolls
     * them back if the changes turned out to be invalid.
     *
     * @returns {Object} whatever object `callback` returns
     */
  }, {
    key: 'rollbackInvalidChanges',
    value: function rollbackInvalidChanges(callback) {
      var result = null;
      var errorType = null;
      var change = TextFieldStateChange.build(this, function () {
        return result = callback();
      });
      var error = function error(type) {
        errorType = type;
      };
      if (change.hasChanges()) {
        var formatter = this.formatter();
        if (formatter && typeof formatter.isChangeValid === 'function') {
          if (!this._isDirty) {
            this._valueOnFocus = change.current.text || '';
            this._isDirty = true;
          }
          if (formatter.isChangeValid(change, error)) {
            change.recomputeDiff();
            this.setText(change.proposed.text);
            this.setSelectedRange(change.proposed.selectedRange);
          } else {
            var delegate = this.delegate();
            if (delegate) {
              if (typeof delegate.textFieldDidFailToValidateChange === 'function') {
                delegate.textFieldDidFailToValidateChange(this, change, errorType);
              }
            }
            this.setText(change.current.text);
            this.setSelectedRange(change.current.selectedRange);
            return result;
          }
        }
        if (change.inserted.text.length || change.deleted.text.length) {
          this.undoManager().proxyFor(this)._applyChangeFromUndoManager(change);
          this._textDidChange();
        }
      }
      return result;
    }

    /**
     * Gets the object value. This is the value that should be considered the
     * 'real' value of the field.
     *
     * @returns {Object}
     */
  }, {
    key: 'value',
    value: function value() {
      var _this2 = this;

      var text = this.text();
      var delegate = this.delegate();
      var formatter = this.formatter();
      if (!formatter) {
        return text;
      }

      return formatter.parse(text, function (errorType) {
        if (delegate) {
          if (typeof delegate.textFieldDidFailToParseString === 'function') {
            delegate.textFieldDidFailToParseString(_this2, text, errorType);
          }
        }
      });
    }

    /**
     * Sets the object value of the field.
     *
     * @param {string} value
     */
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this._formatter) {
        value = this._formatter.format(value);
      }
      this.setText('' + value);
    }

    /**
     * **** InputSim Overrides ****
     */

    /**
     * Gets the formatted text value. This is the same as the value of the
     * underlying input element.
     *
     * @augments external:InputSim.Input#text
     * @returns {string}
     */
  }, {
    key: 'text',
    value: function text() {
      return this.element.value;
    }

    /**
     * Sets the formatted text value. This generally should not be used. Instead,
     * use the value setter.
     *
     * @augments external:InputSim.Input#setText
     * @param {string} text
     */
  }, {
    key: 'setText',
    value: function setText(text) {
      this.element.value = text;
      this._currentValue = text;
    }

    /**
     * Gets the range of the current selection.
     *
     * @augments external:InputSim.Input#selectedRange
     * @returns {Object} {start: number, length: number}
     */
  }, {
    key: 'selectedRange',
    value: function selectedRange() {
      var caret = this._needsManualCaret ? this._manualCaret : (0, _caret.getCaret)(this.element);

      return {
        start: caret.start,
        length: caret.end - caret.start
      };
    }

    /**
     * Sets the range of the current selection and the selection affinity.
     *
     * @augments external:InputSim.Input#setSelectedRangeWithAffinity
     * @param {{start: number, length: number}} range
     * @param {Affinity} affinity
     */
  }, {
    key: 'setSelectedRangeWithAffinity',
    value: function setSelectedRangeWithAffinity(range, affinity) {
      var newRange = _get(Object.getPrototypeOf(TextField.prototype), 'setSelectedRangeWithAffinity', this).call(this, range, affinity);
      var caret = {
        start: newRange.start,
        end: newRange.start + newRange.length
      };
      this._manualCaret = caret;
      (0, _caret.setCaret)(this.element, caret.start, caret.end);
      this.selectionAffinity = range.length === 0 ? null : affinity;
    }

    /**
     * **** Undo Support ****
     */

    /**
     * Gets whether this text field records undo actions with its undo manager.
     *
     * @returns {boolean}
     */
  }, {
    key: 'allowsUndo',
    value: function allowsUndo() {
      return this._allowsUndo;
    }

    /**
     * Sets whether this text field records undo actions with its undo manager.
     *
     * @param {boolean} allowsUndo
     */
  }, {
    key: 'setAllowsUndo',
    value: function setAllowsUndo(allowsUndo) {
      this._allowsUndo = allowsUndo;
    }

    /**
     * Triggers a redo in the underlying UndoManager, if applicable.
     *
     * @param {Event} event
     */
  }, {
    key: 'redo',
    value: function redo(event) {
      if (this.undoManager().canRedo()) {
        this.undoManager().redo();
      }
      event.preventDefault();
    }

    /**
     * Triggers an undo in the underlying UndoManager, if applicable.
     *
     * @param {Event} event
     */
  }, {
    key: 'undo',
    value: function undo(event) {
      if (this.undoManager().canUndo()) {
        this.undoManager().undo();
      }
      event.preventDefault();
    }

    /**
     * Gets the UndoManager for this text field.
     *
     * @returns {UndoManager}
     */
  }, {
    key: 'undoManager',
    value: function undoManager() {
      return this._undoManager || (this._undoManager = new _undo_manager2['default']());
    }

    /**
     * **** Enabled/disabled support *****
     */

    /**
     * Removes focus from this field if it has focus.
     */
  }, {
    key: 'becomeFirstResponder',
    value: function becomeFirstResponder() {
      var _this3 = this;

      this.element.focus();
      this.rollbackInvalidChanges(function () {
        _this3.element.select();
        _this3._syncPlaceholder();
      });
    }

    /**
     * Determines whether this field has focus.
     *
     * @returns {boolean} true if this field has focus
     */
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.element.ownerDocument.activeElement === this.element;
    }

    /**
     * Determines whether this field is enabled or disabled.
     *
     * @returns {boolean} true if this field is enabled
     */
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this._enabled;
    }

    /**
     * Sets whether this text field is enabled
     * and syncs the placeholder to match
     *
     * @param {boolean} enabled
     */
  }, {
    key: 'setEnabled',
    value: function setEnabled(enabled) {
      this._enabled = enabled;
      this._syncPlaceholder();
    }

    /**
     * Removes focus from this field if it has focus.
     *
     * @param {Event} event
     */
  }, {
    key: 'resignFirstResponder',
    value: function resignFirstResponder(event) {
      if (event !== undefined && event !== null) {
        event.preventDefault();
      }
      this.element.blur();
      this._syncPlaceholder();
    }

    /*
     * **** Placeholder support ****
     */

    /**
     * Gets the disabled placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'disabledPlaceholder',
    value: function disabledPlaceholder() {
      return this._disabledPlaceholder;
    }

    /**
     * Sets the disabled placeholder.
     *
     * @param {string} disabledPlaceholder
     */
  }, {
    key: 'setDisabledPlaceholder',
    value: function setDisabledPlaceholder(disabledPlaceholder) {
      this._disabledPlaceholder = disabledPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * Gets the focused placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'focusedPlaceholder',
    value: function focusedPlaceholder() {
      return this._focusedPlaceholder;
    }

    /**
     * Sets the focused placeholder.
     *
     * @param {string} focusedPlaceholder
     */
  }, {
    key: 'setFocusedPlaceholder',
    value: function setFocusedPlaceholder(focusedPlaceholder) {
      this._focusedPlaceholder = focusedPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * Gets the placeholder if one has
     * been set.
     *
     * @TODO Does this do anything?
     *
     * @returns {string}
     */
  }, {
    key: 'placeholder',
    value: function placeholder() {
      return this._placeholder;
    }

    /**
     * Sets the placeholder.
     *
     * @param {string} placeholder
     */
  }, {
    key: 'setPlaceholder',
    value: function setPlaceholder(placeholder) {
      this._placeholder = placeholder;
      this.element.setAttribute('placeholder', this._placeholder);
    }

    /**
     * Gets the unfocused placeholder if one
     * has been set.
     *
     * @returns {string}
     */
  }, {
    key: 'unfocusedPlaceholder',
    value: function unfocusedPlaceholder() {
      return this._unfocusedPlaceholder;
    }

    /**
     * Sets the unfocused placeholder.
     *
     * @param {string} unfocusedPlaceholder
     */
  }, {
    key: 'setUnfocusedPlaceholder',
    value: function setUnfocusedPlaceholder(unfocusedPlaceholder) {
      this._unfocusedPlaceholder = unfocusedPlaceholder;
      this._syncPlaceholder();
    }

    /**
     * **** Private Methods ****
     */

    /**
     * Applies the given change as an undo/redo.
     *
     * @param {Object} change object with current and proposed properties
     * @private
     */
  }, {
    key: '_applyChangeFromUndoManager',
    value: function _applyChangeFromUndoManager(change) {
      this.undoManager().proxyFor(this)._applyChangeFromUndoManager(change);

      if (this.undoManager().isUndoing()) {
        this.setText(change.current.text);
        this.setSelectedRange(change.current.selectedRange);
      } else {
        this.setText(change.proposed.text);
        this.setSelectedRange(change.proposed.selectedRange);
      }

      this._textDidChange();
    }

    /**
     * Handles clicks by resetting the selection affinity.
     *
     * @private
     */
  }, {
    key: '_click',
    value: function _click() {
      this._manualCaret = (0, _caret.getCaret)(this.element);
      this._selectedRange = {
        start: this._manualCaret.start,
        length: this._manualCaret.end - this._manualCaret.start
      };
      this.selectionAffinity = null;
    }

    /**
     * Fires event on the element
     *
     * @param {string} eventType
     * @private
     */
  }, {
    key: '_fireEvent',
    value: function _fireEvent(eventType) {
      var document = this.element.ownerDocument;
      var window = document.defaultView;
      if (typeof window.CustomEvent === 'function') {
        this.element.dispatchEvent(new window.CustomEvent(eventType, {}));
      } else {
        var _event = document.createEvent('Event');
        _event.initEvent(eventType, false, false);
        this.element.dispatchEvent(_event);
      }
    }

    /**
     * Handles gaining focus. This method delegates to other methods, and syncs
     * the placeholder appropriately.
     *
     * @private
     */
  }, {
    key: '_focus',
    value: function _focus() {
      this._textFieldDidBeginEditing();
      this._syncPlaceholder();
    }

    /**
     * Handles losing focus. This method delegates to other methods, and syncs the
     * placeholder appropriately.
     *
     * @private
     */
  }, {
    key: '_blur',
    value: function _blur() {
      this._textFieldDidEndEditing();
      this._syncPlaceholder();
    }

    /**
     * Handles keyDown events. This method essentially just delegates to other,
     * more semantic, methods based on the modifier keys and the pressed key of the
     * event.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyDown',
    value: function _keyDown(event) {
      var _this4 = this;

      if (this._didEndEditingButKeptFocus) {
        this._textFieldDidBeginEditing();
        this._didEndEditingButKeptFocus = false;
      }

      var action = this._bindings.actionForEvent(event);
      if (action) {
        switch (action) {
          case 'undo':
          case 'redo':
            this[action](event);
            break;

          default:
            this.rollbackInvalidChanges(function () {
              return _this4[action](event);
            });
            break;
        }
      }
    }

    /**
     * Handles inserting characters based on the typed key for normal keyboards.
     *
     * NOTE: Does not fire on some versions of Android, in which case we handle
     * changes in _keyUp instead.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyPress',
    value: function _keyPress(event) {
      var _this5 = this;

      var keyCode = event.keyCode;
      if (!event.metaKey && !event.ctrlKey && keyCode !== _inputSim.KEYS.ENTER && keyCode !== _inputSim.KEYS.TAB && keyCode !== _inputSim.KEYS.BACKSPACE) {
        if (event.charCode !== 0) {
          (function () {
            var newText = String.fromCharCode(event.charCode || event.keyCode);

            _this5._processChange({
              currentText: _this5.text(),
              proposedText: (0, _utils.replaceStringSelection)(newText, _this5.text(), _this5.selectedRange()),
              onSuccess: function onSuccess(change, changeTriggeredFormatting) {
                if (!changeTriggeredFormatting && event instanceof KeyboardEvent) {
                  // HACK(JoeTaylor) Use Browser's native input when using the formatter
                  // would not make a difference https://code.google.com/p/chromium/issues/detail?id=32865
                  if (!_this5._isDirty) {
                    _this5._valueOnFocus = change.current.text || '';
                    _this5._isDirty = true;
                  }
                  _this5.undoManager().proxyFor(_this5)._applyChangeFromUndoManager(change);
                  _this5._manualCaret = {
                    start: change.proposed.selectedRange.start,
                    end: change.proposed.selectedRange.start + change.proposed.selectedRange.length
                  };
                  _this5._needsKeyUpTextDidChangeTrigger = true;
                } else {
                  event.preventDefault();
                  _this5.rollbackInvalidChanges(function () {
                    return _this5.insertText(newText);
                  });
                }
                _this5._currentValue = change.proposed.text;
              },
              onFail: function onFail() {
                event.preventDefault();
                _this5.rollbackInvalidChanges(function () {
                  return _this5.insertText(newText);
                });
              }
            });
          })();
        } else {
          event.preventDefault();
        }
      }
    }

    /**
     * Handles keyup events. On Some Android we need to do all input processing
     * here because no other information comes in.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_keyUp',
    value: function _keyUp(event) {
      var _this6 = this;

      if (this._needsKeyUpTextDidChangeTrigger) {
        this._textDidChange();
        this._needsKeyUpTextDidChangeTrigger = false;
      }
      var keyCode = event.keyCode;
      // NOTE: Certain Androids on Chrome always return 229
      // https://code.google.com/p/chromium/issues/detail?id=118639
      if (keyCode === 229) {
        (function () {
          // Text has already been changed at this point, so we check the previous text
          // to determine whether we need to undo the change.
          var previousText = _this6._currentValue || '';
          _this6._processChange({
            currentText: previousText,
            proposedText: _this6.text(),
            onSuccess: function onSuccess(change, changeTriggeredFormatting) {
              if (changeTriggeredFormatting) {
                var newText = change.proposed.text;
                _this6.setSelectedRange(change.proposed.selectedRange);
                _this6.setText(newText);
              }
              if (!_this6._isDirty) {
                _this6._valueOnFocus = change.current.text || '';
                _this6._isDirty = true;
              }
              _this6.undoManager().proxyFor(_this6)._applyChangeFromUndoManager(change);
              _this6._textDidChange();
              _this6._currentValue = change.proposed.text;
            },
            onFail: function onFail() {
              // Need to rollback the letter input in the Keyup event because it is not valid,
              // so we set text to the previous state (as collected from the UndoManager).
              _this6.setText(previousText);
            }
          });
        })();
      } else {
        this.rollbackInvalidChanges(function () {
          if (event.keyCode === _inputSim.KEYS.TAB) {
            _this6.selectAll(event);
          }
        });
      }
    }

    /**
     * Checks if a change is valid and calls `onSuccess` if so,
     * and `onFail` if not.
     *
     * @param {object} options
     * @param {string} options.currentText
     * @param {string} options.proposedText
     * @param {function} options.onSuccess
     * @param {function=} options.onFail
     * @private
     */
  }, {
    key: '_processChange',
    value: function _processChange(_ref) {
      var currentText = _ref.currentText;
      var proposedText = _ref.proposedText;
      var onSuccess = _ref.onSuccess;
      var _ref$onFail = _ref.onFail;
      var onFail = _ref$onFail === undefined ? function () {} : _ref$onFail;

      var current = {
        text: currentText,
        selectedRange: this.selectedRange()
      };
      var proposed = {
        text: proposedText,
        selectedRange: { start: current.selectedRange.start + 1, length: 0 }
      };
      var change = this.hasChangesAndIsValid(current, proposed);
      var changeTriggeredFormatting = change && (change.proposed.text !== proposed.text || change.proposed.selectedRange.start !== proposed.selectedRange.start || change.proposed.selectedRange.length !== proposed.selectedRange.length);

      if (change) {
        onSuccess(change, changeTriggeredFormatting);
      } else {
        onFail();
      }
    }

    /**
     * Handles paste events.
     *
     * @param {Event} event
     * @private
     */
  }, {
    key: '_paste',
    value: function _paste(event) {
      var _this7 = this;

      event.preventDefault();
      this.rollbackInvalidChanges(function () {
        _this7.readSelectionFromPasteboard(event.clipboardData);
      });
    }

    /**
     * @private
     */
  }, {
    key: '_syncPlaceholder',
    value: function _syncPlaceholder() {
      if (!this._enabled) {
        var disabledPlaceholder = this._disabledPlaceholder;
        if (disabledPlaceholder !== undefined && disabledPlaceholder !== null) {
          this.setPlaceholder(disabledPlaceholder);
        }
      } else if (this.hasFocus()) {
        var focusedPlaceholder = this._focusedPlaceholder;
        if (focusedPlaceholder !== undefined && focusedPlaceholder !== null) {
          this.setPlaceholder(focusedPlaceholder);
        }
      } else {
        var unfocusedPlaceholder = this._unfocusedPlaceholder;
        if (unfocusedPlaceholder !== undefined && unfocusedPlaceholder !== null) {
          this.setPlaceholder(unfocusedPlaceholder);
        }
      }
    }
  }]);

  return TextField;
})(_inputSim.Input);

var TextFieldStateChange = (function () {
  /**
   * @param {TextField} field
   */

  function TextFieldStateChange(field) {
    _classCallCheck(this, TextFieldStateChange);

    this.field = field;
  }

  /**
   * Builds a new {TextFieldStateChange} that will allow you to
   * compute differences, and see the current vs proposed changes.
   *
   * @param {TextField} field
   * @param {Function} callback called when you want changes to the field
   *    take place. Current will be calculated before this callback.
   *    Proposed will be calculated after this callback.
   *
   * @returns {Object} change object with current and proposed properties
   */

  /**
   * Determines whether this field has changes.
   *
   * @returns {boolean} true if either the current text doesn't match the proposed text
   *    or the current selection range doesn't match the proposed selection range
   */

  _createClass(TextFieldStateChange, [{
    key: 'hasChanges',
    value: function hasChanges() {
      this.recomputeDiff();
      return this.current.text !== this.proposed.text || this.current.selectedRange.start !== this.proposed.selectedRange.start || this.current.selectedRange.length !== this.proposed.selectedRange.length;
    }

    /**
     * Updates {TextFieldStateChange} inserted and {TextFieldStateChange} deleted
     * based on proposed and current
     */
  }, {
    key: 'recomputeDiff',
    value: function recomputeDiff() {
      if (this.proposed.text !== this.current.text) {
        var ctext = this.current.text;
        var ptext = this.proposed.text;
        var sharedPrefixLength = 0;
        var sharedSuffixLength = 0;
        var minTextLength = Math.min(ctext.length, ptext.length);
        var i = undefined;

        for (i = 0; i < minTextLength; i++) {
          if (ptext[i] === ctext[i]) {
            sharedPrefixLength = i + 1;
          } else {
            break;
          }
        }

        for (i = 0; i < minTextLength - sharedPrefixLength; i++) {
          if (ptext[ptext.length - 1 - i] === ctext[ctext.length - 1 - i]) {
            sharedSuffixLength = i + 1;
          } else {
            break;
          }
        }

        var inserted = {
          start: sharedPrefixLength,
          end: ptext.length - sharedSuffixLength
        };
        var deleted = {
          start: sharedPrefixLength,
          end: ctext.length - sharedSuffixLength
        };
        inserted.text = ptext.substring(inserted.start, inserted.end);
        deleted.text = ctext.substring(deleted.start, deleted.end);
        this.inserted = inserted;
        this.deleted = deleted;
      } else {
        this.inserted = {
          start: this.proposed.selectedRange.start,
          end: this.proposed.selectedRange.start + this.proposed.selectedRange.length,
          text: ''
        };
        this.deleted = {
          start: this.current.selectedRange.start,
          end: this.current.selectedRange.start + this.current.selectedRange.length,
          text: ''
        };
      }
    }
  }]);

  return TextFieldStateChange;
})();

TextFieldStateChange.build = function (field, callback) {
  var change = new this(field);
  change.current = {
    text: field.text(),
    selectedRange: field.selectedRange()
  };
  callback();
  change.proposed = {
    text: field.text(),
    selectedRange: field.selectedRange()
  };
  change.recomputeDiff();
  return change;
};

exports['default'] = TextField;
module.exports = exports['default'];

},{"./caret":8,"./formatter":15,"./undo_manager":22,"./utils":23,"input-sim":2}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

/**
 * UndoManager is a general-purpose recorder of operations for undo and redo.
 *
 * Registering an undo action is done by specifying the changed object, along
 * with a method to invoke to revert its state and the arguments for that
 * method. When performing undo an UndoManager saves the operations reverted so
 * that you can redo the undos.
 */

var UndoManager = (function () {
  function UndoManager() {
    _classCallCheck(this, UndoManager);

    /** @private */
    this._undos = [];
    /** @private */
    this._redos = [];
    /** @private */
    this._isUndoing = false;
    /** @private */
    this._isRedoing = false;
  }

  /**
   * Determines whether there are any undo actions on the stack.
   *
   * @returns {boolean}
   */

  _createClass(UndoManager, [{
    key: 'canUndo',
    value: function canUndo() {
      return this._undos.length !== 0;
    }

    /**
     * Determines whether there are any redo actions on the stack.
     *
     * @returns {boolean}
     */
  }, {
    key: 'canRedo',
    value: function canRedo() {
      return this._redos.length !== 0;
    }

    /**
     * Indicates whether or not this manager is currently processing an undo.
     *
     * @returns {boolean}
     */
  }, {
    key: 'isUndoing',
    value: function isUndoing() {
      return this._isUndoing;
    }

    /**
     * Indicates whether or not this manager is currently processing a redo.
     *
     * @returns {boolean}
     */
  }, {
    key: 'isRedoing',
    value: function isRedoing() {
      return this._isRedoing;
    }

    /**
     * Manually registers an simple undo action with the given args.
     *
     * If this undo manager is currently undoing then this will register a redo
     * action instead. If this undo manager is neither undoing or redoing then the
     * redo stack will be cleared.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     */
  }, {
    key: 'registerUndo',
    value: function registerUndo(target, selector) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (this._isUndoing) {
        this._appendRedo.apply(this, [target, selector].concat(args));
      } else {
        if (!this._isRedoing) {
          this._redos.length = 0;
        }
        this._appendUndo.apply(this, [target, selector].concat(args));
      }
    }

    /**
     * Appends an undo action to the internal stack.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     * @private
     */
  }, {
    key: '_appendUndo',
    value: function _appendUndo(target, selector) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      this._undos.push({
        target: target,
        selector: selector,
        args: args
      });
    }

    /**
     * Appends a redo action to the internal stack.
     *
     * @param {Object} target call `selector` on this object
     * @param {string} selector the method name to call on `target`
     * @param {...Object} args arguments to pass when calling `selector` on `target`
     * @private
     */
  }, {
    key: '_appendRedo',
    value: function _appendRedo(target, selector) {
      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      this._redos.push({
        target: target,
        selector: selector,
        args: args
      });
    }

    /**
     * Performs the top-most undo action on the stack.
     *
     * @throws {Error} Raises an error if there are no available undo actions.
     */
  }, {
    key: 'undo',
    value: function undo() {
      if (!this.canUndo()) {
        throw new Error('there are no registered undos');
      }
      var data = this._undos.pop();
      var target = data.target;
      var selector = data.selector;
      var args = data.args;
      this._isUndoing = true;
      target[selector].apply(target, args);
      this._isUndoing = false;
    }

    /**
     * Performs the top-most redo action on the stack.
     *
     * @throws {Error} Raises an error if there are no available redo actions.
     */
  }, {
    key: 'redo',
    value: function redo() {
      if (!this.canRedo()) {
        throw new Error('there are no registered redos');
      }
      var data = this._redos.pop();
      var target = data.target;
      var selector = data.selector;
      var args = data.args;
      this._isRedoing = true;
      target[selector].apply(target, args);
      this._isRedoing = false;
    }

    /**
     * Returns a proxy object based on target that will register undo/redo actions
     * by calling methods on the proxy.
     *
     * @example
     *     setSize(size) {
     *       this.undoManager.proxyFor(this).setSize(this._size);
     *       this._size = size;
     *     }
     *
     * @param {Object} target call `selector` on this object
     * @returns {Object}
     */
  }, {
    key: 'proxyFor',
    value: function proxyFor(target) {
      var proxy = {};
      var self = this;

      function proxyMethod(selector) {
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          self.registerUndo.apply(self, [target, selector].concat(args));
        };
      }

      (0, _utils.getAllPropertyNames)(target).forEach(function (selector) {
        // don't trigger anything that has a getter
        if ((0, _utils.hasGetter)(target, selector)) {
          return;
        }

        // don't try to proxy properties that aren't functions
        if (typeof target[selector] !== 'function') {
          return;
        }

        // set up a proxy function to register an undo
        proxy[selector] = proxyMethod(selector);
      });

      return proxy;
    }
  }]);

  return UndoManager;
})();

exports['default'] = UndoManager;
module.exports = exports['default'];

},{"./utils":23}],23:[function(require,module,exports){
/**
 * @const
 * @private
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isDigits = isDigits;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.zpad = zpad;
exports.zpad2 = zpad2;
exports.bind = bind;
exports.replaceStringSelection = replaceStringSelection;
exports.forEach = forEach;
exports.hasGetter = hasGetter;
exports.getAllPropertyNames = getAllPropertyNames;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var DIGITS_PATTERN = /^\d*$/;

/**
 * @const
 * @private
 */
var SURROUNDING_SPACE_PATTERN = /(^\s+|\s+$)/;

/**
 * @param {string} string
 * @returns {boolean}
 */

function isDigits(string) {
  return DIGITS_PATTERN.test(string);
}

/**
 * @param {string} prefix
 * @param {string} string
 * @returns {boolean}
 */

function startsWith(prefix, string) {
  return string.slice(0, prefix.length) === prefix;
}

/**
 * @param {string} suffix
 * @param {string} string
 * @returns {boolean}
 */

function endsWith(suffix, string) {
  return string.slice(string.length - suffix.length) === suffix;
}

/**
 * @param {string} string
 * @returns {string}
 */
var trim = typeof ''.trim === 'function' ? function (string) {
  return string.trim();
} : function (string) {
  return string.replace(SURROUNDING_SPACE_PATTERN, '');
};

exports.trim = trim;
/**
 * Will pad n with `0` up until length.
 *
 * @example
 *     zpad(16, '1234');
 *     // => 0000000000001234
 *
 * @param {number} length
 * @param {(string|number)} n
 * @returns {string}
 */

function zpad(length, n) {
  var result = '' + n;
  while (result.length < length) {
    result = '0' + result;
  }
  return result;
}

/**
 * Will pad n with `0` up until length is 2.
 *
 * @example
 *     zpad2('2');
 *     // => 02
 *
 * @param {(string|number)} n
 * @returns {string}
 */

function zpad2(n) {
  return zpad(2, n);
}

/**
 * PhantomJS 1.9 does not have Function.bind.
 *
 * @param {Function} fn
 * @param {*} context
 * @returns {*}
 */

function bind(fn, context) {
  return fn.bind(context);
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context) {
    for (var _len = arguments.length, prependedArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      prependedArgs[_key - 1] = arguments[_key];
    }

    var self = this;
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return self.apply(context, prependedArgs.concat(args));
    };
  };
}

/**
 * Replaces the characters within the selection with given text.
 *
 * @example
 *     // 12|34567|8
 *     replaceStringSelection('12345678', '00', { start: 2, length: 5 });
 *     // 12|00|8
 *
 * @param   {string} replacement
 * @param   {string} text
 * @param   {object} {start: number, length: number}
 * @returns {string}
 */

function replaceStringSelection(replacement, text, range) {
  var end = range.start + range.length;
  return text.substring(0, range.start) + replacement + text.substring(end);
}

var hasOwnProp = Object.prototype.hasOwnProperty;
/**
 * @param {*} iterable
 * @param {Function} iterator
 */

function forEach(iterable, iterator) {
  if (iterable && typeof iterable.forEach === 'function') {
    iterable.forEach(iterator);
  } else if (({}).toString.call(iterable) === '[object Array]') {
    for (var i = 0, l = iterable.length; i < l; i++) {
      iterator.call(null, iterable[i], i, iterable);
    }
  } else {
    for (var key in iterable) {
      if (hasOwnProp.call(iterable, key)) {
        iterator.call(null, iterable[key], key, iterable);
      }
    }
  }
}

var getOwnPropertyNames = (function () {
  var getOwnPropertyNames = Object.getOwnPropertyNames;

  try {
    Object.getOwnPropertyNames({}, 'sq');
  } catch (e) {
    // IE 8
    getOwnPropertyNames = function (object) {
      var result = [];
      for (var key in object) {
        if (hasOwnProp.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    };
  }

  return getOwnPropertyNames;
})();

var getPrototypeOf = Object.getPrototypeOf || function (object) {
  return object.__proto__;
};
/**
 * @param {Object} object
 * @param {string} property
 * @returns {boolean}
 */

function hasGetter(object, property) {
  // Skip if getOwnPropertyDescriptor throws (IE8)
  try {
    Object.getOwnPropertyDescriptor({}, 'sq');
  } catch (e) {
    return false;
  }

  var descriptor = undefined;

  if (object && object.constructor && object.constructor.prototype) {
    descriptor = Object.getOwnPropertyDescriptor(object.constructor.prototype, property);
  }

  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(object, property);
  }

  if (descriptor && descriptor.get) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {Object} object
 * @returns {?string[]}
 */

function getAllPropertyNames(object) {
  if (object === null || object === undefined) {
    return [];
  }

  var result = getOwnPropertyNames(object);

  var prototype = object.constructor && object.constructor.prototype;
  while (prototype) {
    result.push.apply(result, _toConsumableArray(getOwnPropertyNames(prototype)));
    prototype = getPrototypeOf(prototype);
  }

  return result;
}

},{}]},{},[11]);

//# sourceMappingURL=field-kit.js.map