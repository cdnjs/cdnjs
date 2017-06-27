(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * MUI JS config module
 *
 **/
module.exports = {
  debug: true,
  cssPrfx: 'mui-'
};

},{}],2:[function(require,module,exports){
'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    formControlClass = config.cssPrfx + 'form-control',
    formGroupClass = config.cssPrfx + 'form-group',
    floatingLabelBaseClass = config.cssPrfx + 'form-floating-label',
    floatingLabelActiveClass = floatingLabelBaseClass + '-active';


function processLabel(labelEl) {
  // check flag
  if (labelEl._muiFloatLabel === true) return;
  else labelEl._muiFloatLabel = true;
  
  var inputEl = labelEl.previousElementSibling;

  if (inputEl.value.length) jqLite.addClass(labelEl, floatingLabelActiveClass);

  // handle input events
  jqLite.on(inputEl, 'input', inputHandler);
  
  // add transition after timeout to avoid screen jitter
  setTimeout(function() {
    var s = '.15s ease-out';

    jqLite.css(labelEl, {
      '-webkit-transition': s,
      '-moz-transition': s,
      '-o-transition': s,
      'transition': s
    });
  }, 150);

  // pointer-events shim
  if (supportsPointerEvents() === false) {
    jqLite.css(labelEl, 'cursor', 'text');
    jqLite.on(labelEl, 'click', function() {
      if (!jqLite.hasClass(labelEl, floatingLabelActiveClass)) inputEl.focus();
    });
  }
}


function inputHandler(ev) {
  var inputEl = ev.target,
      labelEl = inputEl.nextElementSibling;

  if (jqLite.hasClass(labelEl, floatingLabelBaseClass)) {
    if (inputEl.value.length === 0) {
      jqLite.removeClass(labelEl, floatingLabelActiveClass);
    } else {
      jqLite.addClass(labelEl, floatingLabelActiveClass);
    }
  }
}


function activateLabel(labelEl) {
  jqLite.addClass(labelEl, floatingLabelActiveClass);

  if (supportsPointerEvents() === false) {
    jqLite.css(labelEl, 'cursor', 'default');
  }
}


function deactivateLabel(labelEl, inputEl) {
  jqLite.removeClass(labelEl, floatingLabelActiveClass);

  if (supportsPointerEvents() === false) {
  }
}


/******************************
 * Utilities
 ******************************/
var _supportsPointerEvents;

function supportsPointerEvents() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/******************************
 * Module API
 ******************************/
module.exports = {
  formControlClass: formControlClass,
  formGroupClass: formGroupClass,
  floatingLabelBaseClass: floatingLabelBaseClass,
  floatingLabelActiveClass: floatingLabelActiveClass,
  processLabel: processLabel,
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(floatingLabelBaseClass);
    for (var i=0; i < elList.length; i++) processLabel(elList[i]);
    
    // listen for new elements
    function handlerFn(ev) {
      if (ev.animationName !== 'muiNodeInserted') return;
      processLabel(ev.target);
    }
    
    jqLite.on(doc, 'animationstart', handlerFn);
    jqLite.on(doc, 'mozAnimationStart', handlerFn);
    jqLite.on(doc, 'webkitAnimationStart', handlerFn);
  }
};

},{"./config.js":1,"./lib/jqLite.js":3}],3:[function(require,module,exports){
/**
 * MUI JS jqLite module
 *
 **/
'use strict';


// ----------------------
// addClass
// ----------------------
function jqLiteAddClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;

  for (var i=0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
      existingClasses += cssClass + ' ';
    }
  }
  
  element.setAttribute('class', existingClasses.trim());
}


// ---------------------
// css
// ---------------------
function jqLiteCss(element, name, value) {
  // --- Return full style object ---
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name);

  // --- Set multiple values ---
  if (nameType === 'object') {
    for (var key in name) element.style[_camelCase(key)] = name[key];
    return;
  }

  // --- Set a single value ---
  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = (jqLiteType(name) === 'array');

  // --- Read single value ---
  if (!isArray) return _getCurrCssProp(element, name, styleObj);

  // --- Read multiple values ---
  var outObj = {},
      key;

  for (var i=0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}


// ---------------------
// hasClass
// ---------------------
function jqLiteHasClass(element, selector) {
  if (!selector || !element.getAttribute) return false;
  return (_getExistingClasses(element).indexOf(' ' + selector + ' ') > -1);
}


// ------------------------
// type
// ------------------------
function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined';

  // handle others (of type [object <Type>])
  var typeStr = Object.prototype.toString.call(somevar);
  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw "Could not understand type: " + typeStr;
  }    
}


// ------------------------
// on
// ------------------------
function jqLiteOn(element, type, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  // add to DOM
  element.addEventListener(type, callback, useCapture);

  // add to cache
  var cache = element._muiEventCache = element._muiEventCache || {};
  cache[type] = cache[type] || [];
  cache[type].push([callback, useCapture]);
}


// -----------------------
// off
// -----------------------
function jqLiteOff(element, type, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  // remove from cache
  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList = cache[type] || [],
      args,
      i;

  i = argsList.length;
  while (i--) {
    args = argsList[i];

    // remove all events if callback is undefined
    if (callback === undefined ||
        (args[0] === callback && args[1] === useCapture)) {

      // remove from cache
      argsList.splice(i, 1);
      
      // remove from DOM
      element.removeEventListener(type, args[0], args[1]);
    }
  }
}


// ---------------------
// one
// ---------------------
function jqLiteOne(element, type, callback, useCapture) {
  // remove functions after event fires
  jqLiteOn(element, type, function onFn() {
    jqLiteOff(element, type, callback);
    jqLiteOff(element, type, onFn);
  });

  // add listener
  jqLiteOn(element, type, fn);
}


// -----------------------
// offset
// -----------------------
function jqLiteOffset(element) {
  var win = window,
      docEl = document.documentElement,
      rect = element.getBoundingClientRect(),
      viewLeft,
      viewTop;

  viewLeft = (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0);
  viewTop = (win.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);

  return {
    top: rect.top + viewTop,
    left: rect.left + viewLeft,
    height: rect.height,
    width: rect.width
  };
}


// -----------------------
// ready
// -----------------------
function jqLiteReady(fn) {
  var done = false,
      top = true,
      doc = document,
      win = doc.defaultView,
      root = doc.documentElement,
      add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
      rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
      pre = doc.addEventListener ? '' : 'on';

  var init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') {
      return;
    }

    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  };

  var poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') {
    fn.call(win, 'lazy');
  } else {
    if (doc.createEventObject && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }
}


// ---------------------
// removeClass
// ---------------------
function jqLiteRemoveClass(element, cssClasses) {
  if (!cssClasses || !element.setAttribute) return;

  var existingClasses = _getExistingClasses(element),
      splitClasses = cssClasses.split(' '),
      cssClass;
  
  for (var i=0; i < splitClasses.length; i++) {
    cssClass = splitClasses[i].trim();
    while (existingClasses.indexOf(' ' + cssClass + ' ') >= 0) {
      existingClasses = existingClasses.replace(' ' + cssClass + ' ', ' ');
    }
  }

  element.setAttribute('class', existingClasses.trim());
}


/**************************
 * Utilities
 **************************/
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g,
    BOOLEAN_ATTRS;


BOOLEAN_ATTRS = {
  multiple: true,
  selected: true,
  checked: true,
  disabled: true,
  readonly: true,
  required: true,
  open: true
}


function _getExistingClasses(element) {
  var classes = (element.getAttribute('class') || '').replace(/[\n\t]/g, '');
  return ' ' + classes + ' ';
}


function _camelCase(name) {
  return name.
    replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
}


function _escapeRegExp(string) {
  return string.replace(ESCAPE_REGEXP, "\\$1");
}


function _getCurrCssProp(elem, name, computed) {
  var ret;

  // try computed style
  ret = computed.getPropertyValue(name);

  // try style attribute (if element is not attached to document)
  if (ret === '' && !elem.ownerDocument) ret = elem.style[_camelCase(name)];

  return ret;
}


/**************************
 * Module API
 **************************/
module.exports = {
  addClass: jqLiteAddClass,
  css: jqLiteCss,
  hasClass: jqLiteHasClass,
  off: jqLiteOff,
  offset: jqLiteOffset,
  on: jqLiteOn,
  one: jqLiteOne,
  ready: jqLiteReady,
  removeClass: jqLiteRemoveClass,
  type: jqLiteType
};

},{}],4:[function(require,module,exports){
// 
// Based on Craigtut solution from Codepen (http://codepen.io/Craigtut/)
//
'use strict';

var config = require('./config.js'),
    jqLite = require('./lib/jqLite.js'),
    btnClass = config.cssPrfx + 'btn',
    btnFlatClass = config.cssPrfx + 'btn-flat',
    btnFloatingClass = config.cssPrfx + 'btn-floating',
    rippleClass = config.cssPrfx + 'ripple-effect';


function mousedownHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var buttonEl = ev.target;

  // exit if element doesn't have button class
  if (!jqLite.hasClass(buttonEl, btnClass)) return;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;
  
  var rippleEl = document.createElement('div');
  rippleEl.className = rippleClass;

  var offset = jqLite.offset(buttonEl),
      xPos = ev.pageX - offset.left,
      yPos = ev.pageY - offset.top,
      diameter,
      radius;

  // get height
  if (jqLite.hasClass(buttonEl, btnFloatingClass)) {
    diameter = offset.height / 2;
  } else {
    diameter = offset.height;
  }

  radius = diameter / 2;
  
  jqLite.css(rippleEl, {
    height: diameter + 'px',
    width: diameter + 'px',
    top: yPos - radius + 'px',
    left: xPos - radius + 'px'
  });

  buttonEl.appendChild(rippleEl);
  
  window.setTimeout(function() {
    buttonEl.removeChild(rippleEl);
  }, 2000);
}


/**********************************
 * Module API
 **********************************/
module.exports = {
  initListeners: function() {
    jqLite.on(document, 'mousedown', mousedownHandler);
  }
};

},{"./config.js":1,"./lib/jqLite.js":3}],5:[function(require,module,exports){
(function(win) {
  // return if library has been loaded already
  if (win._muiLoadedReact) return;
  else win._muiLoadedReact = true;

  // load dependencies
  var jqLite = require('../js/lib/jqLite.js'),
      forms = require('./forms.jsx'),
      ripple = require('../js/ripple.js'),
      doc = win.document;

  // export React classes
  win.MUIFormControl = forms.FormControl;
  win.MUIFormGroup = forms.FormGroup;

  // init libraries
  jqLite.ready(function() {
    ripple.initListeners();
  });
})(window);

},{"../js/lib/jqLite.js":3,"../js/ripple.js":4,"./forms.jsx":6}],6:[function(require,module,exports){
'use strict';

var jqLite = require('../js/lib/jqLite.js'),
    forms = require('../js/forms.js');


// ------------------------
// Form Control
// ------------------------
var FormControl = React.createClass({displayName: "FormControl",
  render: function() {
    return (
      React.createElement("input", {
          type: this.props.type || 'text', 
          className: forms.formControlClass, 
          value: this.props.value, 
          autoFocus: this.props.autofocus, 
          onInput: this.props.onInput}
      )
    );
  }
});


// -----------------------
// Form Group
// -----------------------
var FormGroup = React.createClass({displayName: "FormGroup",
  componentDidMount: function() {
    // use js library to add functionality to label
    forms.processLabel(this.refs.label.getDOMNode());
  },
  render: function() {
    var labelText = this.props.label,
        labelEl;
    
    if (labelText) {
      var labelClass = '';

      if (this.props.isLabelFloating) {
        labelClass += ' ' + forms.floatingLabelBaseClass;
      }

      if (this.props.value) {
        labelClass += ' ' + forms.floatingLabelActiveClass;
      }

      labelEl = (
        React.createElement("label", {className: labelClass, ref: "label"}, 
          labelText
        )
      );
    }

    return (
      React.createElement("div", {className: forms.formGroupClass}, 
        React.createElement(FormControl, {
            type: this.props.type, 
            value: this.props.value, 
            autoFocus: this.props.autofocus}
        ), 
        labelEl
      )
    );
  }
});


/***********************
 * Module API
 ***********************/
module.exports = {
  FormControl: FormControl,
  FormGroup: FormGroup
};

},{"../js/forms.js":2,"../js/lib/jqLite.js":3}]},{},[5])