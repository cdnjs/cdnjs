/*! superplaceholder.js - v1.0.0 - 2019-01-04
* http://kushagragour.in/lab/superplaceholderjs/
* Copyright (c) 2019 Kushagra Gour; Licensed CC-BY-ND-4.0 */

(function() {
  var test = document.createElement('input');
  var isPlaceHolderSupported = 'placeholder' in test;

  // Helpers
  function extend(obj1, obj2) {
    var obj = {};
    for (var key in obj1) {
      obj[key] = obj2[key] === undefined ? obj1[key] : obj2[key];
    }
    return obj;
  }

  var Actions = Object.freeze({
    START: 'start',
    STOP: 'stop',
    NOTHING: false
  });

  var defaults = {
    letterDelay: 100, //milliseconds
    sentenceDelay: 1000, //milliseconds
    loop: false,
    startOnFocus: true,
    shuffle: false,
    showCursor: true,
    cursor: '|',
    autoStart: false,
    onFocusAction: Actions.START,
    onBlurAction: Actions.STOP
  };

  // Constructor: PlaceHolder
  function PlaceHolder(el, texts, options) {
    this.el = el;
    this.texts = texts;
    options = options || {};
    this.options = extend(defaults, options);
    // Translate deprecated `startOnFocus` option to new ones.
    if (!this.options.startOnFocus) {
      // TODO: add deprecation message
      console.warn(
        'Superplaceholder.js: `startOnFocus` option has been deprecated. Please use `onFocusAction`, `onBlurAction` and `autoStart`'
      );

      this.options.autoStart = true;
      this.options.onFocusAction = Actions.NOTHING;
      this.options.onBlurAction = Actions.NOTHING;
    }
    this.timeouts = [];
    this.isPlaying = false;

    var temp, randomIndex;
    if (this.options.shuffle) {
      for (var i = this.texts.length; i--; ) {
        randomIndex = ~~(Math.random() * i);
        temp = this.texts[randomIndex];
        this.texts[randomIndex] = this.texts[i];
        this.texts[i] = temp;
      }
    }

    this.begin();
  }

  PlaceHolder.prototype.begin = function() {
    var self = this;
    self.originalPlaceholder = self.el.getAttribute('placeholder');

    if (self.options.onFocusAction || self.options.onBlurAction) {
      // Store to unbind later
      self.listeners = {
        focus: self.onFocus.bind(self),
        blur: self.onBlur.bind(self)
      };
      self.el.addEventListener('focus', self.listeners.focus);
      self.el.addEventListener('blur', self.listeners.blur);
    }
    if (self.options.autoStart) {
      self.processText(0);
    }
  };

  PlaceHolder.prototype.onFocus = function() {
    if (this.options.onFocusAction === Actions.START) {
      if (this.isInProgress()) {
        return;
      }
      this.processText(0);
    } else if (this.options.onFocusAction === Actions.STOP) {
      this.cleanUp();
    }
  };

  PlaceHolder.prototype.onBlur = function() {
    if (this.options.onBlurAction === Actions.STOP) {
      this.cleanUp();
    } else if (this.options.onBlurAction === Actions.START) {
      if (this.isInProgress()) {
        return;
      }
      this.processText(0);
    }
  };

  PlaceHolder.prototype.cleanUp = function() {
    // Stop timeouts
    for (var i = this.timeouts.length; i--; ) {
      clearTimeout(this.timeouts[i]);
    }
    // null means there was no placeholder attribute initially.
    if (this.originalPlaceholder === null) {
      this.el.removeAttribute('placeholder');
    } else {
      this.el.setAttribute('placeholder', this.originalPlaceholder);
    }
    this.timeouts.length = 0;
    this.isPlaying = false;
  };

  PlaceHolder.prototype.isInProgress = function() {
    return this.isPlaying;
  };

  PlaceHolder.prototype.typeString = function(str, callback) {
    var self = this,
      timeout;

    if (!str) {
      return false;
    }

    function setTimeoutCallback(index) {
      // Add cursor `|` after current substring unless we are showing last
      // character of the string.
      self.el.setAttribute(
        'placeholder',
        str.substr(0, index + 1) +
          (index === str.length - 1 || !self.options.showCursor
            ? ''
            : self.options.cursor)
      );
      // Call the completion callback when last character is being printed
      if (index === str.length - 1) {
        callback();
      }
    }
    for (var i = 0; i < str.length; i++) {
      timeout = setTimeout(setTimeoutCallback, i * self.options.letterDelay, i);
      self.timeouts.push(timeout);
    }
  };

  PlaceHolder.prototype.processText = function(index) {
    var self = this,
      timeout;

    this.isPlaying = true;

    self.typeString(self.texts[index], function() {
      // Empty the timeouts array
      self.timeouts.length = 0;
      if (!self.options.loop && !self.texts[index + 1]) {
        self.isPlaying = false;
      }
      timeout = setTimeout(function() {
        self.processText(
          self.options.loop ? (index + 1) % self.texts.length : index + 1
        );
      }, self.options.sentenceDelay);
      self.timeouts.push(timeout);
    });
  };

  var superplaceholder = function(params) {
    if (!isPlaceHolderSupported) {
      return;
    }
    var instance = new PlaceHolder(params.el, params.sentences, params.options);
    return {
      start: function() {
        if (instance.isInProgress()) {
          return;
        }
        instance.processText(0);
      },
      stop: function() {
        instance.cleanUp();
      },
      destroy: function() {
        instance.cleanUp();
        for (var eventName in instance.listeners) {
          instance.el.removeEventListener(
            eventName,
            instance.listeners[eventName]
          );
        }
      }
    };
  };

  superplaceholder.Actions = Actions;

  // open to the world.
  // commonjs
  if (typeof exports === 'object') {
    module.exports = superplaceholder;
  } else if (typeof define === 'function' && define.amd) {
    // AMD module
    define(function() {
      return superplaceholder;
    });
  } else {
    // Browser global
    window.superplaceholder = superplaceholder;
  }
})();
