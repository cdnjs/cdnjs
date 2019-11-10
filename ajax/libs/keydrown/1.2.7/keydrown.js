/*! keydrown - v1.2.7 - 2018-12-19 - http://jeremyckahn.github.com/keydrown */
;(function (window) {

var util = (function () {

  var util = {};

  /**
   * @param {Object} obj The Object to iterate through.
   * @param {function(*, string)} iterator The function to call for each property.
   */
  util.forEach = function (obj, iterator) {
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        iterator(obj[prop], prop);
      }
    }
  };
  var forEach = util.forEach;


  /**
   * Create a transposed copy of an Object.
   *
   * @param {Object} obj
   * @return {Object}
   */
  util.getTranspose = function (obj) {
    var transpose = {};

    forEach(obj, function (val, key) {
      transpose[val] = key;
    });

    return transpose;
  };


  /**
   * Implementation of Array#indexOf because IE<9 doesn't support it.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {number} Index of the found element or -1 if not found.
   */
  util.indexOf = function (arr, val) {
    if (arr.indexOf) {
      return arr.indexOf(val);
    }

    var i, len = arr.length;
    for (i = 0; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  };
  var indexOf = util.indexOf;


  /**
   * Push a value onto an array if it is not present in the array already.  Otherwise, this is a no-op.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {boolean} Whether or not the value was added to the array.
   */
  util.pushUnique = function (arr, val) {
    if (indexOf(arr, val) === -1) {
      arr.push(val);
      return true;
    }

    return false;
  };


  /**
   * Remove a value from an array.  Assumes there is only one instance of the
   * value present in the array.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {*} The value that was removed from arr.  Returns undefined if
   * nothing was removed.
   */
  util.removeValue = function (arr, val) {
    var index = indexOf(arr, val);

    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  };


  /**
   * Cross-browser function for listening for and handling an event on the
   * document element.
   *
   * @param {string} eventName
   * @param {function} handler
   */
  util.documentOn = function (eventName, handler) {
    if (window.addEventListener) {
      window.addEventListener(eventName, handler, false);
    } else if (document.attachEvent) {
      document.attachEvent('on' + eventName, handler);
    }
  };


  /**
   * Shim for requestAnimationFrame.  See:
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */
  util.requestAnimationFrame = (function () {
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();


  /**
   * An empty function.  NOOP!
   */
  util.noop = function () {};

  return util;

}());

/**
 * Lookup table of keys to keyCodes.
 *
 * @type {Object.<number>}
 */
var KEY_MAP = {
  'ZERO': 48,
  'ONE': 49,
  'TWO': 50,
  'THREE': 51,
  'FOUR': 52,
  'FIVE': 53,
  'SIX': 54,
  'SEVEN': 55,
  'EIGHT': 56,
  'NINE': 57,
  'A': 65,
  'B': 66,
  'C': 67,
  'D': 68,
  'E': 69,
  'F': 70,
  'G': 71,
  'H': 72,
  'I': 73,
  'J': 74,
  'K': 75,
  'L': 76,
  'M': 77,
  'N': 78,
  'O': 79,
  'P': 80,
  'Q': 81,
  'R': 82,
  'S': 83,
  'T': 84,
  'U': 85,
  'V': 86,
  'W': 87,
  'X': 88,
  'Y': 89,
  'Z': 90,
  'ENTER': 13,
  'SHIFT': 16,
  'ESC': 27,
  'SPACE': 32,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40,
  'BACKSPACE': 8,
  'DELETE': 46,
  'TAB': 9,
  'TILDE': 192
};


/**
 * The transposed version of KEY_MAP.
 *
 * @type {Object.<string>}
 */
var TRANSPOSED_KEY_MAP = util.getTranspose(KEY_MAP);

/*!
 * @type Array.<string>
 */
var keysDown = [];

var Key = (function () {

  'use strict';

  /**
   * Represents a key on the keyboard.  You'll never actually call this method
   * directly; Key Objects for every key that Keydrown supports are created for
   * you when the library is initialized (as in, when the file is loaded).  You
   * will, however, use the `prototype` methods below to bind functions to key
   * states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   * @class kd.Key
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
    this.cachedKeypressEvent = null;
  }


  /*!
   * The function to be invoked on every tick that the key is held down for.
   *
   * @type {function}
   */
  Key.prototype._downHandler = util.noop;


  /*!
   * The function to be invoked when the key is released.
   *
   * @type {function}
   */
  Key.prototype._upHandler = util.noop;


  /*!
   * The function to be invoked when the key is pressed.
   *
   * @type {function}
   */
  Key.prototype._pressHandler = util.noop;


  /*!
   * Private helper function that binds or invokes a hander for `down`, `up',
   * or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   * @param {KeyboardEvent=} opt_evt If this function is being called by a
   * keyboard event handler, this is the raw KeyboardEvent Object provided from
   * the browser.
   */
  function bindOrFire (key, handlerName, opt_handler, opt_evt) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName](opt_evt);
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @method isDown
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @method down
   * @param {function=} opt_handler The function to be called when the key is
   * held down.  If omitted, this function invokes whatever handler was
   * previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler, this.cachedKeypressEvent);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @method up
   * @param {function=} opt_handler The function to be called when the key is
   * released.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keyup event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.up = function (opt_handler, opt_evt) {
    bindOrFire(this, '_upHandler', opt_handler, opt_evt);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will
   * not fire again until the key is released — it does not repeat.
   *
   * @method press
   * @param {function=} opt_handler The function to be called once when the key
   * is pressed.  If omitted, this function invokes whatever handler was
   * previously bound.
   * @param {KeyboardEvent=} opt_evt If this function is being called by the
   * keydown event handler, this is the raw KeyboardEvent Object provided from
   * the browser.  This should generally not be provided by client code.
   */
  Key.prototype.press = function (opt_handler, opt_evt) {
    this.cachedKeypressEvent = opt_evt;
    bindOrFire(this, '_pressHandler', opt_handler, opt_evt);
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/down:method"}}{{/crossLink}}`.
   * @method unbindDown
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/up:method"}}{{/crossLink}}`.
   * @method unbindUp
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with `{{#crossLink
   * "kd.Key/press:method"}}{{/crossLink}}`.
   * @method unbindPress
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());

var kd = (function (keysDown) {

  'use strict';

  /**
   * @class kd
   */
  var kd = {};
  kd.Key = Key;

  var isRunning = false;

  var now = Date.now
     ? Date.now
     : function () {return +new Date();};

  var previousUpdateTime = now();

  /**
   * Evaluate which keys are held down and invoke their handler functions.
   * @method tick
   */
  kd.tick = function () {
    var i, len = keysDown.length;
    for (i = 0; i < len; i++) {
      var keyCode = keysDown[i];

      var keyName = TRANSPOSED_KEY_MAP[keyCode];
      if (keyName) {
        kd[keyName].down();
      }
    }
  };


  /**
   * A basic run loop.  `handler` gets called approximately 60 times a second.
   *
   * @param {Function(number, number)} handler The callback function to call on
   * every tick.  You likely want to call [kd.tick](#method_tick) in this
   * function.  This callback receives the time elapsed since the previous
   * execution of the callback as the first parameter, and the current time
   * stamp as the second.
   * @method run
   */
  kd.run = function (handler) {
    isRunning = true;
    var currentTime = now();
    var timeSinceLastUpdate = currentTime - previousUpdateTime;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler(timeSinceLastUpdate, currentTime);
    });

    previousUpdateTime = currentTime;
  };


  /**
   * Cancels the loop created by [run](#method_run).
   * @method stop
   */
  kd.stop = function () {
    isRunning = false;
  };


  // SETUP
  //


  // Initialize the KEY Objects
  util.forEach(KEY_MAP, function (keyCode, keyName) {
    kd[keyName] = new Key(keyCode);
  });

  util.documentOn('keydown', function (evt) {
    var keyCode = evt.keyCode;
    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    var isNew = util.pushUnique(keysDown, keyCode);
    var key = kd[keyName];

    if (key) {
      var cachedKeypressEvent = key.cachedKeypressEvent || {};

      // If a modifier key was held down the last time that this button was
      // pressed, and it is pressed again without the modifier key being
      // released, it is considered a newly-pressed key.  This is to work
      // around the fact that the "keyup" event does not fire for the modified
      // key until the modifier button is also released, which poses a problem
      // for repeated, modified key presses such as hitting ctrl/meta+Z for
      // rapid "undo" actions.
      if (cachedKeypressEvent.ctrlKey ||
          cachedKeypressEvent.shiftKey ||
          cachedKeypressEvent.metaKey) {
        isNew = true;
      }

      if (isNew) {
        key.press(null, evt);
      }
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up(null, evt);
    }
  });

  // Stop firing the "down" handlers if the user loses focus of the browser
  // window.
  util.documentOn('blur', function (evt) {
    // Fire the "up" handler for each key that is currently held down
    util.forEach(keysDown, function (keyCode) {
      var mappedKey = TRANSPOSED_KEY_MAP[keyCode];
      if (mappedKey) {
        kd[mappedKey].up();
      }
    });

    keysDown.length = 0;
  });


  return kd;

 // The variables passed into the closure here are defined in kd.key.js.
}(keysDown));

if (typeof module === "object" && typeof module.exports === "object") {
  // Keydrown was loaded as a CommonJS module (by Browserify, for example).
  module.exports = kd;
} else if (typeof define === "function" && define.amd) {
  // Keydrown was loaded as an AMD module.
  define(function () {
    return kd;
  });
} else {
  window.kd = kd;
}

} (window));
