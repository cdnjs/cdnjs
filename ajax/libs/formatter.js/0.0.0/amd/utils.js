/*
 * utils.js
 *
 * Independent helper methods (cross browser, etc..)
 *
 */


define(function () {


// Define module
var utils = {};

// Useragent info for keycode handling
var uAgent = (typeof navigator !== 'undefined') ? navigator.userAgent : null;

//
// Shallow copy properties from n objects to destObj
//
utils.extend = function (destObj) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      destObj[key] = arguments[i][key];
    }
  }
  return destObj;
};

//
// Add a given character to a string at a defined pos
//
utils.addChars = function (str, chars, pos) {
  return str.substr(0, pos) + chars + str.substr(pos, str.length);
};

//
// Remove a span of characters
//
utils.removeChars = function (str, start, end) {
  return str.substr(0, start) + str.substr(end, str.length);
};

//
// Return true/false is num false between bounds
//
utils.isBetween = function (num, bounds) {
  bounds.sort(function(a,b) { return a-b; });
  return (num > bounds[0] && num < bounds[1]);
};

//
// Helper method for cross browser event listeners
//
utils.addListener = function (el, evt, handler) {
  return (typeof el.addEventListener !== 'undefined')
    ? el.addEventListener(evt, handler, false)
    : el.attachEvent('on' + evt, handler);
};

//
// Helper method for cross browser implementation of preventDefault
//
utils.preventDefault = function (evt) {
  return (evt.preventDefault) ? evt.preventDefault() : (evt.returnValue = false);
};

//
// Helper method for cross browser implementation for grabbing
// clipboard data
//
utils.getClip = function (evt) {
  if (evt.clipboardData) { return evt.clipboardData.getData('Text'); }
  if (window.clipboardData) { return window.clipboardData.getData('Text'); }
};

//
// Loop over object and checking for matching properties
//
utils.getMatchingKey = function (which, keyCode, keys) {
  // Loop over and return if matched.
  for (var k in keys) {
    var key = keys[k];
    if (which === key.which && keyCode === key.keyCode) {
      return k;
    }
  }
};

//
// Returns true/false if k is a del keyDown
//
utils.isDelKeyDown = function (which, keyCode) {
  var keys = {
    'backspace': { 'which': 8, 'keyCode': 8 },
    'delete': { 'which': 46, 'keyCode': 46 }
  };

  return utils.getMatchingKey(which, keyCode, keys);
};

//
// Returns true/false if k is a del keyPress
//
utils.isDelKeyPress = function (which, keyCode) {
  var keys = {
    'backspace': { 'which': 8, 'keyCode': 8, 'shiftKey': false },
    'delete': { 'which': 0, 'keyCode': 46 }
  };

  return utils.getMatchingKey(which, keyCode, keys);
};

// //
// // Determine if keydown relates to specialKey
// //
// utils.isSpecialKeyDown = function (which, keyCode) {
//   var keys = {
//     'tab': { 'which': 9, 'keyCode': 9 },
//     'enter': { 'which': 13, 'keyCode': 13 },
//     'end': { 'which': 35, 'keyCode': 35 },
//     'home': { 'which': 36, 'keyCode': 36 },
//     'leftarrow': { 'which': 37, 'keyCode': 37 },
//     'uparrow': { 'which': 38, 'keyCode': 38 },
//     'rightarrow': { 'which': 39, 'keyCode': 39 },
//     'downarrow': { 'which': 40, 'keyCode': 40 },
//     'F5': { 'which': 116, 'keyCode': 116 }
//   };

//   return utils.getMatchingKey(which, keyCode, keys);
// };

//
// Determine if keypress relates to specialKey
//
utils.isSpecialKeyPress = function (which, keyCode) {
  var keys = {
    'tab': { 'which': 0, 'keyCode': 9 },
    'enter': { 'which': 13, 'keyCode': 13 },
    'end': { 'which': 0, 'keyCode': 35 },
    'home': { 'which': 0, 'keyCode': 36 },
    'leftarrow': { 'which': 0, 'keyCode': 37 },
    'uparrow': { 'which': 0, 'keyCode': 38 },
    'rightarrow': { 'which': 0, 'keyCode': 39 },
    'downarrow': { 'which': 0, 'keyCode': 40 },
    'F5': { 'which': 116, 'keyCode': 116 }
  };

  return utils.getMatchingKey(which, keyCode, keys);
};

//
// Returns true/false if modifier key is held down
//
utils.isModifier = function (evt) {
  return evt.ctrlKey || evt.altKey || evt.metaKey;
};

//
// Iterates over each property of object or array.
//
utils.forEach = function (collection, callback, thisArg) {
  if (collection.hasOwnProperty('length')) {
    for (var index = 0, len = collection.length; index < len; index++) {
      if (callback.call(thisArg, collection[index], index, collection) === false) {
        break;
      }
    }
  } else {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (callback.call(thisArg, collection[key], key, collection) === false) {
          break;
        }
      }
    }
  }
};


// Expose
return utils;


});