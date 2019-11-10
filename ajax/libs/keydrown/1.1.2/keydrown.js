/*! keydrown - v1.1.2 - 2014-09-21 - http://jeremyckahn.github.com/keydrown */
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
   * Remove a value from an array.  Assumes there is only one instance of the value present in the array.
   *
   * @param {Array} arr
   * @param {*} val
   * @return {*} The value that was removed from arr.  Returns undefined if nothing was removed.
   */
  util.removeValue = function (arr, val) {
    var index = indexOf(arr, val);

    if (index !== -1) {
      return arr.splice(index, 1)[0];
    }
  };


  /**
   * Cross-browser function for listening for and handling an event on the document element.
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
   * Shim for requestAnimationFrame.  See: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
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
  'A': 65
  ,'B': 66
  ,'C': 67
  ,'D': 68
  ,'E': 69
  ,'F': 70
  ,'G': 71
  ,'H': 72
  ,'I': 73
  ,'J': 74
  ,'K': 75
  ,'L': 76
  ,'M': 77
  ,'N': 78
  ,'O': 79
  ,'P': 80
  ,'Q': 81
  ,'R': 82
  ,'S': 83
  ,'T': 84
  ,'U': 85
  ,'V': 86
  ,'W': 87
  ,'X': 88
  ,'Y': 89
  ,'Z': 90
  ,'ENTER': 13
  ,'SHIFT': 16
  ,'ESC': 27
  ,'SPACE': 32
  ,'LEFT': 37
  ,'UP': 38
  ,'RIGHT': 39
  ,'DOWN': 40
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
   * Represents a key on the keyboard.  You'll never actually call this method directly; Key Objects for every key that Keydrown supports are created for you when the library is initialized (as in, when the file is loaded).  You will, however, use the `prototype` methods below to bind functions to key states.
   *
   * @param {number} keyCode The keyCode of the key.
   * @constructor
   */
  function Key (keyCode) {
    this.keyCode = keyCode;
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
   * Private helper function that binds or invokes a hander for `down`, `up', or `press` for a `Key`.
   *
   * @param {Key} key
   * @param {string} handlerName
   * @param {function=} opt_handler If omitted, the handler is invoked.
   */
  function bindOrFire (key, handlerName, opt_handler) {
    if (opt_handler) {
      key[handlerName] = opt_handler;
    } else {
      key[handlerName]();
    }
  }


  /**
   * Returns whether the key is currently pressed or not.
   *
   * @return {boolean} True if the key is down, otherwise false.
   */
  Key.prototype.isDown = function () {
    return util.indexOf(keysDown, this.keyCode) !== -1;
  };


  /**
   * Bind a function to be called when the key is held down.
   *
   * @param {function=} opt_handler The function to be called when the key is held down.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.down = function (opt_handler) {
    bindOrFire(this, '_downHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is released.
   *
   * @param {function=} opt_handler The function to be called when the key is released.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.up = function (opt_handler) {
    bindOrFire(this, '_upHandler', opt_handler);
  };


  /**
   * Bind a function to be called when the key is pressed.  This handler will not fire again until the key is released — it does not repeat.
   *
   * @param {function=} opt_handler The function to be called once when the key is pressed.  If omitted, this function invokes whatever handler was previously bound.
   */
  Key.prototype.press = function (opt_handler) {
    bindOrFire(this, '_pressHandler', opt_handler);
  };


  /**
   * Remove the handler that was bound with [`kd.Key#down`](#down).
   */
  Key.prototype.unbindDown = function () {
    this._downHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#up`](#up).
   */
  Key.prototype.unbindUp = function () {
    this._upHandler = util.noop;
  };


  /**
   * Remove the handler that was bound with [`kd.Key#press`](#press).
   */
  Key.prototype.unbindPress = function () {
    this._pressHandler = util.noop;
  };

  return Key;

}());

var kd = (function (keysDown) {

  'use strict';

  var kd = {};
  kd.Key = Key;

  var isRunning = false;


  /**
   * Evaluate which keys are held down and invoke their handler functions.
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
   * @param {function} handler The function to call on every tick.  You almost certainly want to call `kd.tick` in this function.
   */
  kd.run = function (handler) {
    isRunning = true;

    util.requestAnimationFrame.call(window, function () {
      if (!isRunning) {
        return;
      }

      kd.run(handler);
      handler();
    });
  };


  /**
   * Cancels the loop created by [`kd.run`](#run).
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

    if (isNew && kd[keyName]) {
      kd[keyName].press();
    }
  });

  util.documentOn('keyup', function (evt) {
    var keyCode = util.removeValue(keysDown, evt.keyCode);

    var keyName = TRANSPOSED_KEY_MAP[keyCode];
    if (keyName) {
      kd[keyName].up();
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

/*!
 * The variables passed into the closure here are defined in kd.key.js.
 */ /*!*/
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
