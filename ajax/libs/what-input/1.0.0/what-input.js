(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['whatInput'] = factory();
  }
}(this, function () {

/*
 * variables
 */

// array of actively pressed keys
var activeKeys = [];

// cache document.body
var body = document.body;

// boolean: true if touch buffer timer is running
var buffer = false;

// the last used input type
var currentInput = null;

// array of form elements that take keyboard input
var formInputs = [
  'input',
  'select',
  'textarea'
];

// user-set flag to allow typing in form fields to be recorded
var formTyping = body.hasAttribute('data-whatinput-formtyping');

// mapping of events to input types
var inputMap = {
  'keydown': 'keyboard',
  'mousedown': 'mouse',
  'touchstart': 'touch',
  'pointerdown': 'pointer',
  'MSPointerDown': 'pointer'
};

// array of all used input types
var inputTypes = [];

// mapping of key codes to common name
var keyMap = {
  9: 'tab',
  13: 'enter',
  16: 'shift',
  27: 'esc',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

// map of IE 10 pointer events
var pointerMap = {
  2: 'touch',
  3: 'touch', // treat pen like touch
  4: 'mouse'
};

// touch buffer timer
var timer;


/*
 * functions
 */

function bufferInput(event) {
  clearTimeout(timer);

  setInput(event);

  buffer = true;
  timer = setTimeout(function() {
    buffer = false;
  }, 1000);
}

function immediateInput(event) {
  if (!buffer) setInput(event);
}

function setInput(event) {
  var eventKey = key(event);
  var eventTarget = target(event);
  var value = inputMap[event.type];
  if (value === 'pointer') value = pointerType(event);

  if (currentInput !== value) {
    if (
      // only if the user flag isn't set
      !formTyping &&

      // only if currentInput has a value
      currentInput &&

      // only if the input is `keyboard`
      value === 'keyboard' &&

      // not if the key is `TAB`
      keyMap[eventKey] !== 'tab' &&

      // only if the target is one of the elements in `formInputs`
      formInputs.indexOf(eventTarget.nodeName.toLowerCase()) >= 0
    ) {
      // ignore keyboard typing on form elements
    } else {
      currentInput = value;
      body.setAttribute('data-whatinput', currentInput);

      if (inputTypes.indexOf(currentInput) === -1) inputTypes.push(currentInput);
    }
  }

  if (value === 'keyboard') logKeys(eventKey);
}

function key(event) {
  return (event.keyCode) ? event.keyCode : event.which;
}

function target(event) {
  return event.target || event.srcElement;
}

function pointerType(event) {
  return (typeof event.pointerType === 'number') ? pointerMap[event.pointerType] : event.pointerType;
}

// keyboard logging
function logKeys(eventKey) {
  if (activeKeys.indexOf(keyMap[eventKey]) === -1 && keyMap[eventKey]) activeKeys.push(keyMap[eventKey]);
}

function unLogKeys(event) {
  var eventKey = key(event);
  var arrayPos = activeKeys.indexOf(keyMap[eventKey]);

  if (arrayPos !== -1) activeKeys.splice(arrayPos, 1);
}


/*
 * init
 */

(function() {

  var mouseEvent = 'mousedown';

  // pointer/mouse
  if (window.PointerEvent) {
    mouseEvent = 'pointerdown';
  } else if (window.MSPointerEvent) {
    mouseEvent = 'MSPointerDown';
  }

  body.addEventListener(mouseEvent, immediateInput);

  // touch
  if ('ontouchstart' in document.documentElement) body.addEventListener('touchstart', bufferInput);

  // keyboard
  body.addEventListener('keydown', immediateInput);
  body.addEventListener('keyup', unLogKeys);

})();


/*
 * api
 */

return {

  // returns a string of the current input type
  ask: function() { return currentInput; },

  // returns an array of currently pressed keys
  keys: function() { return activeKeys; },

  // returns an array of all the detected input types
  types: function() { return inputTypes; },

  // manually set the input type
  set: setInput
};


}));
