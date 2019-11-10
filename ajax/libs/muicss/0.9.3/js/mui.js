(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * MUI CSS/JS main module
 * @module main
 */

(function(win) {
  'use strict';

  // return if library has been loaded already
  if (win._muiLoadedJS) return;
  else win._muiLoadedJS = true;
  
  // load dependencies
  var jqLite = require('src/js/lib/jqLite'),
      dropdown = require('src/js/dropdown'),
      overlay = require('src/js/overlay'),
      ripple = require('src/js/ripple'),      
      select = require('src/js/select'),
      tabs = require('src/js/tabs'),
      textfield = require('src/js/textfield');

  // expose api
  win.mui = {
    overlay: overlay,
    tabs: tabs.api
  };
  
  // init libraries
  jqLite.ready(function() {
    textfield.initListeners();
    select.initListeners();
    ripple.initListeners();
    dropdown.initListeners();
    tabs.initListeners();
  });
})(window);

},{"src/js/dropdown":7,"src/js/lib/jqLite":8,"src/js/overlay":9,"src/js/ripple":10,"src/js/select":11,"src/js/tabs":12,"src/js/textfield":13}],2:[function(require,module,exports){
/**
 * MUI config module
 * @module config
 */

/** Define module API */
module.exports = {
  /** Use debug mode */
  debug: true
};

},{}],3:[function(require,module,exports){
/**
 * MUI CSS/JS animation helper module
 * @module lib/animationHelpers
 */

'use strict';

var jqLite = require('./jqLite'),
    util = require('./util'),
    animationEvents = 'animationstart mozAnimationStart webkitAnimationStart',
    animationCallbacks = {};


/**
 * Register callbacks
 * @param {String} name - The animation name
 * @param {Function} callbackFn = The callback function
 */
function onAnimationStartFn(name, callbackFn) {
  // get/set callback function
  var callbacks = animationCallbacks[name];
  if (!callbacks) callbacks = animationCallbacks[name] = [];
  callbacks.push(callbackFn);

  // initialize listeners
  if (!this.init) {
    // add css classes
    loadCss();

    // add listener
    jqLite.on(document, animationEvents, animationStartHandler);

    // set flag
    this.init = true;
  }
}


/**
 * Animation start handler
 * @param {Event} ev - The DOM event
 */
function animationStartHandler(ev) {
  var callbacks = animationCallbacks[ev.animationName] || [],
      i = callbacks.length;

  // iterate through callbacks
  while (i--) callbacks[i](ev);
}


/**
 * Load animation css
 */
function loadCss() {
  // define rules
  var rules = [
    ['.mui-btn', 'mui-btn-inserted'],
    ['[data-mui-toggle="dropdown"]', 'mui-dropdown-inserted'],
    ['[data-mui-toggle="tab"]', 'mui-tab-inserted'],
    ['.mui-textfield > input', 'mui-textfield-inserted'],
    ['.mui-textfield > textarea', 'mui-textfield-inserted'],
    ['.mui-select > select', 'mui-select-inserted'],
    ['.mui-select > select ~ .mui-event-trigger', 'mui-node-inserted'],
    ['.mui-select > select:disabled ~ .mui-event-trigger', 'mui-node-disabled']
  ];

  // build css
  var css = '',
      rule;

  for (var i=0, m=rules.length; i < m; i++) {
    rule = rules[i];
    css += '@keyframes ' + rule[1] + '{from{opacity:0.99;}to{opacity:1;}}';
    css += rule[0];
    css += '{animation-duration:0.0001s;animation-name:' + rule[1] + ';}';
  }
  
  // add CSS to DOM
  util.loadStyle(css);
}


/**
 * Define module API
 */
module.exports = {
  animationEvents: animationEvents,
  onAnimationStart: onAnimationStartFn
}

},{"./jqLite":5,"./util":6}],4:[function(require,module,exports){
/**
 * MUI CSS/JS form helpers module
 * @module lib/forms.py
 */

'use strict';

var wrapperPadding = 15,  // from CSS
    inputHeight = 32,  // from CSS
    rowHeight = 42,  // from CSS
    menuPadding = 8;  // from CSS


/**
 * Menu position/size/scroll helper
 * @returns {Object} Object with keys 'height', 'top', 'scrollTop'
 */
function getMenuPositionalCSSFn(wrapperEl, numRows, selectedRow) {
  var viewHeight = document.documentElement.clientHeight;

  // determine 'height'
  var h = numRows * rowHeight + 2 * menuPadding,
      height = Math.min(h, viewHeight);

  // determine 'top'
  var top, initTop, minTop, maxTop;

  initTop = (menuPadding + rowHeight) - (wrapperPadding + inputHeight);
  initTop -= selectedRow * rowHeight;

  minTop = -1 * wrapperEl.getBoundingClientRect().top;
  maxTop = (viewHeight - height) + minTop;

  top = Math.min(Math.max(initTop, minTop), maxTop);

  // determine 'scrollTop'
  var scrollTop = 0,
      scrollIdeal,
      scrollMax;

  if (h > viewHeight) {
    scrollIdeal = (menuPadding + (selectedRow + 1) * rowHeight) -
      (-1 * top + wrapperPadding + inputHeight);
    scrollMax = numRows * rowHeight + 2 * menuPadding - height;
    scrollTop = Math.min(scrollIdeal, scrollMax);
  }

  return {
    'height': height + 'px',
    'top': top + 'px',
    'scrollTop': scrollTop
  };
}


/** Define module API */
module.exports = {
  getMenuPositionalCSS: getMenuPositionalCSSFn
};

},{}],5:[function(require,module,exports){
/**
 * MUI CSS/JS jqLite module
 * @module lib/jqLite
 */

'use strict';


/**
 * Add a class to an element.
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
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


/**
 * Get or set CSS properties.
 * @param {Element} element - The DOM element.
 * @param {string} [name] - The property name.
 * @param {string} [value] - The property value.
 */
function jqLiteCss(element, name, value) {
  // Return full style object
  if (name === undefined) {
    return getComputedStyle(element);
  }

  var nameType = jqLiteType(name);

  // Set multiple values
  if (nameType === 'object') {
    for (var key in name) element.style[_camelCase(key)] = name[key];
    return;
  }

  // Set a single value
  if (nameType === 'string' && value !== undefined) {
    element.style[_camelCase(name)] = value;
  }

  var styleObj = getComputedStyle(element),
      isArray = (jqLiteType(name) === 'array');

  // Read single value
  if (!isArray) return _getCurrCssProp(element, name, styleObj);

  // Read multiple values
  var outObj = {},
      key;

  for (var i=0; i < name.length; i++) {
    key = name[i];
    outObj[key] = _getCurrCssProp(element, key, styleObj);
  }

  return outObj;
}


/**
 * Check if element has class.
 * @param {Element} element - The DOM element.
 * @param {string} cls - The class name string.
 */
function jqLiteHasClass(element, cls) {
  if (!cls || !element.getAttribute) return false;
  return (_getExistingClasses(element).indexOf(' ' + cls + ' ') > -1);
}


/**
 * Return the type of a variable.
 * @param {} somevar - The JavaScript variable.
 */
function jqLiteType(somevar) {
  // handle undefined
  if (somevar === undefined) return 'undefined';

  // handle others (of type [object <Type>])
  var typeStr = Object.prototype.toString.call(somevar);
  if (typeStr.indexOf('[object ') === 0) {
    return typeStr.slice(8, -1).toLowerCase();
  } else {
    throw new Error("MUI: Could not understand type: " + typeStr);
  }    
}


/**
 * Attach an event handler to a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOn(element, events, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  var cache = element._muiEventCache = element._muiEventCache || {};  

  events.split(' ').map(function(event) {
    // add to DOM
    element.addEventListener(event, callback, useCapture);

    // add to cache
    cache[event] = cache[event] || [];
    cache[event].push([callback, useCapture]);
  });
}


/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOff(element, events, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  // remove from cache
  var cache = element._muiEventCache = element._muiEventCache || {},
      argsList,
      args,
      i;

  events.split(' ').map(function(event) {
    argsList = cache[event] || [];

    i = argsList.length;
    while (i--) {
      args = argsList[i];

      // remove all events if callback is undefined
      if (callback === undefined ||
          (args[0] === callback && args[1] === useCapture)) {

        // remove from cache
        argsList.splice(i, 1);
        
        // remove from DOM
        element.removeEventListener(event, args[0], args[1]);
      }
    }
  });
}


/**
 * Attach an event hander which will only execute once per element per event
 * @param {Element} element - The DOM element.
 * @param {string} events - Space separated event names.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOne(element, events, callback, useCapture) {
  events.split(' ').map(function(event) {
    jqLiteOn(element, event, function onFn(ev) {
      // execute callback
      if (callback) callback.apply(this, arguments);

      // remove wrapper
      jqLiteOff(element, event, onFn, useCapture);
    }, useCapture);
  });
}


/**
 * Get or set horizontal scroll position
 * @param {Element} element - The DOM element
 * @param {number} [value] - The scroll position
 */
function jqLiteScrollLeft(element, value) {
  var win = window;

  // get
  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0);
    } else {
      return element.scrollLeft;
    }
  }

  // set
  if (element === win) win.scrollTo(value, jqLiteScrollTop(win));
  else element.scrollLeft = value;
}


/**
 * Get or set vertical scroll position
 * @param {Element} element - The DOM element
 * @param {number} value - The scroll position
 */
function jqLiteScrollTop(element, value) {
  var win = window;

  // get
  if (value === undefined) {
    if (element === win) {
      var docEl = document.documentElement;
      return (win.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
    } else {
      return element.scrollTop;
    }
  }

  // set
  if (element === win) win.scrollTo(jqLiteScrollLeft(win), value);
  else element.scrollTop = value;
}


/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */
function jqLiteOffset(element) {
  var win = window,
      rect = element.getBoundingClientRect(),
      scrollTop = jqLiteScrollTop(win),
      scrollLeft = jqLiteScrollLeft(win);

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    height: rect.height,
    width: rect.width
  };
}


/**
 * Attach a callback to the DOM ready event listener
 * @param {Function} fn - The callback function.
 */
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


/**
 * Remove classes from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} cssClasses - Space separated list of class names.
 */
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


// ------------------------------
// Utilities
// ------------------------------
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g,
    MOZ_HACK_REGEXP = /^moz([A-Z])/,
    ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g;


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


/**
 * Module API
 */
module.exports = {
  /** Add classes */
  addClass: jqLiteAddClass,

  /** Get or set CSS properties */
  css: jqLiteCss,

  /** Check for class */
  hasClass: jqLiteHasClass,

  /** Remove event handlers */
  off: jqLiteOff,

  /** Return offset values */
  offset: jqLiteOffset,

  /** Add event handlers */
  on: jqLiteOn,

  /** Add an execute-once event handler */
  one: jqLiteOne,

  /** DOM ready event handler */
  ready: jqLiteReady,

  /** Remove classes */
  removeClass: jqLiteRemoveClass,

  /** Check JavaScript variable instance type */
  type: jqLiteType,

  /** Get or set horizontal scroll position */
  scrollLeft: jqLiteScrollLeft,

  /** Get or set vertical scroll position */
  scrollTop: jqLiteScrollTop
};

},{}],6:[function(require,module,exports){
/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */

'use strict';


var config = require('../config'),
    jqLite = require('./jqLite'),
    scrollLock = 0,
    scrollLockCls = 'mui-scroll-lock',
    scrollStyleEl,
    scrollEventHandler,
    _supportsPointerEvents;


scrollEventHandler = function(ev) {
  // stop propagation on window scroll events
  if (!ev.target.tagName) ev.stopImmediatePropagation();
}


/**
 * Logging function
 */
function logFn() {
  var win = window;
  
  if (config.debug && typeof win.console !== "undefined") {
    try {
      win.console.log.apply(win.console, arguments);
    } catch (a) {
      var e = Array.prototype.slice.call(arguments);
      win.console.log(e.join("\n"));
    }
  }
}


/**
 * Load CSS text in new stylesheet
 * @param {string} cssText - The css text.
 */
function loadStyleFn(cssText) {
  var doc = document,
      head;
  
  // copied from jQuery 
  head = doc.head ||
    doc.getElementsByTagName('head')[0] ||
    doc.documentElement;
  
  var e = doc.createElement('style');
  e.type = 'text/css';
  
  if (e.styleSheet) e.styleSheet.cssText = cssText;
  else e.appendChild(doc.createTextNode(cssText));
  
  // add to document
  head.insertBefore(e, head.firstChild);
  
  return e;
}


/**
 * Raise an error
 * @param {string} msg - The error message.
 */
function raiseErrorFn(msg, useConsole) {
  if (useConsole) {
    if (typeof console !== 'undefined') console.error('MUI Warning: ' + msg);
  } else {
    throw new Error('MUI: ' + msg);
  }
}


/**
 * Convert Classname object, with class as key and true/false as value, to an
 * class string.
 * @param  {Object} classes The classes
 * @return {String}         class string
 */
function classNamesFn(classes) {
  var cs = '';
  for (var i in classes) {
    cs += (classes[i]) ? i + ' ' : '';
  }
  return cs.trim();
}


/**
 * Check if client supports pointer events.
 */
function supportsPointerEventsFn() {
  // check cache
  if (_supportsPointerEvents !== undefined) return _supportsPointerEvents;
  
  var element = document.createElement('x');
  element.style.cssText = 'pointer-events:auto';
  _supportsPointerEvents = (element.style.pointerEvents === 'auto');
  return _supportsPointerEvents;
}


/**
 * Create callback closure.
 * @param {Object} instance - The object instance.
 * @param {String} funcName - The name of the callback function.
 */
function callbackFn(instance, funcName) {
  return function() {instance[funcName].apply(instance, arguments);};
}


/**
 * Dispatch event.
 * @param {Element} element - The DOM element.
 * @param {String} eventType - The event type.
 * @param {Boolean} bubbles=true - If true, event bubbles.
 * @param {Boolean} cancelable=true = If true, event is cancelable
 * @param {Object} [data] - Data to add to event object
 */
function dispatchEventFn(element, eventType, bubbles, cancelable, data) {
  var ev = document.createEvent('HTMLEvents'),
      bubbles = (bubbles !== undefined) ? bubbles : true,
       cancelable = (cancelable !== undefined) ? cancelable : true,
       k;

  ev.initEvent(eventType, bubbles, cancelable);
  
  // add data to event object
  if (data) for (k in data) ev[k] = data[k];
  
  // dispatch
  if (element) element.dispatchEvent(ev);
  
  return ev;
}


/**
 * Turn on window scroll lock.
 */
function enableScrollLockFn() {
  // increment counter
  scrollLock += 1;
  
  // add lock
  if (scrollLock === 1) {
    var htmlEl = document.documentElement,
        top = jqLite.scrollTop(window),
        left = jqLite.scrollLeft(window),
        cssProps,
        cssStr;

    // define scroll lock class dynamically
    cssProps = [
      'position:fixed',
      'top:' + -top + 'px',
      'right:0',
      'bottom:0',
      'left:' + -left + 'px'
    ];

    // scrollbar-y
    if (htmlEl.scrollHeight > htmlEl.clientHeight) {
      cssProps.push('overflow-y:scroll');
    }
    
    // scrollbar-x
    if (htmlEl.scrollWidth > htmlEl.clientWidth) {
      cssProps.push('overflow-x:scroll');
    }

    // define css class dynamically
    cssStr = '.' + scrollLockCls + '{';
    cssStr += cssProps.join(' !important;') + ' !important;}';
    scrollStyleEl = loadStyleFn(cssStr);

    // cancel 'scroll' event listener callbacks
    jqLite.on(window, 'scroll', scrollEventHandler, true);

    // add scroll lock
    jqLite.addClass(htmlEl, scrollLockCls);
  }
}


/**
 * Turn off window scroll lock.
 * @param {Boolean} resetPos - Reset scroll position to original value.
 */
function disableScrollLockFn(resetPos) {
  // ignore
  if (scrollLock === 0) return;

  // decrement counter
  scrollLock -= 1;

  // remove lock 
  if (scrollLock === 0) {
    var htmlEl = document.documentElement,
        top = parseInt(jqLite.css(htmlEl, 'top')),
        left = parseInt(jqLite.css(htmlEl, 'left'));

    // remove scroll lock and delete style element
    jqLite.removeClass(htmlEl, scrollLockCls);
    scrollStyleEl.parentNode.removeChild(scrollStyleEl);

    // restore scroll position
    window.scrollTo(-left, -top);      

    // restore scroll event listeners
    jqLite.off(window, 'scroll', scrollEventHandler, true);
  }
}

/**
 * requestAnimationFrame polyfilled
 * @param {Function} callback - The callback function
 */
function requestAnimationFrameFn(callback) {
  var fn = window.requestAnimationFrame;
  if (fn) fn(callback);
  else setTimeout(callback, 0);
}


/**
 * Define the module API
 */
module.exports = {
  /** Create callback closures */
  callback: callbackFn,
  
  /** Classnames object to string */
  classNames: classNamesFn,

  /** Disable scroll lock */
  disableScrollLock: disableScrollLockFn,

  /** Dispatch event */
  dispatchEvent: dispatchEventFn,
  
  /** Enable scroll lock */
  enableScrollLock: enableScrollLockFn,

  /** Log messages to the console when debug is turned on */
  log: logFn,

  /** Load CSS text as new stylesheet */
  loadStyle: loadStyleFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Request animation frame */
  requestAnimationFrame: requestAnimationFrameFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};

},{"../config":2,"./jqLite":5}],7:[function(require,module,exports){
/**
 * MUI CSS/JS dropdown module
 * @module dropdowns
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[data-mui-toggle="dropdown"]',
    openClass = 'mui--is-open',
    menuClass = 'mui-dropdown__menu';


/**
 * Initialize toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiDropdown === true) return;
  else toggleEl._muiDropdown = true;

  // use type "button" to prevent form submission by default
  var tagName = toggleEl.tagName;
  if ((tagName === 'INPUT' || tagName === 'BUTTON')
      && !toggleEl.hasAttribute('type')) {
    toggleEl.type = 'button';
  }

  // attach click handler
  jqLite.on(toggleEl, 'click', clickHandler);
}


/**
 * Handle click events on dropdown toggle element.
 * @param {Event} ev - The DOM event
 */
function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var toggleEl = this;
  
  // exit if toggle button is disabled
  if (toggleEl.getAttribute('disabled') !== null) return;

  // toggle dropdown
  toggleDropdown(toggleEl);
}


/**
 * Toggle the dropdown.
 * @param {Element} toggleEl - The dropdown toggle element.
 */
function toggleDropdown(toggleEl) {
  var wrapperEl = toggleEl.parentNode,
      menuEl = toggleEl.nextElementSibling,
      doc = wrapperEl.ownerDocument;

  // exit if no menu element
  if (!menuEl || !jqLite.hasClass(menuEl, menuClass)) {
    return util.raiseError('Dropdown menu element not found');
  }

  // method to close dropdown
  function closeDropdownFn() {
    jqLite.removeClass(menuEl, openClass);
      
    // remove event handlers
    jqLite.off(doc, 'click', closeDropdownFn);
  }

  // method to open dropdown
  function openDropdownFn() {
    // position menu element below toggle button
    var wrapperRect = wrapperEl.getBoundingClientRect(),
        toggleRect = toggleEl.getBoundingClientRect();

    var top = toggleRect.top - wrapperRect.top + toggleRect.height;
    jqLite.css(menuEl, 'top', top + 'px');

    // add open class to wrapper
    jqLite.addClass(menuEl, openClass);

    // close dropdown when user clicks outside of menu
    setTimeout(function() {jqLite.on(doc, 'click', closeDropdownFn);}, 0);
  }

  // toggle dropdown
  if (jqLite.hasClass(menuEl, openClass)) closeDropdownFn();
  else openDropdownFn();
}

  
/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.querySelectorAll(attrSelector),
        i = elList.length;
    while (i--) {initialize(elList[i]);}

    // listen for new elements
    animationHelpers.onAnimationStart('mui-dropdown-inserted', function(ev) {
      initialize(ev.target);
    });
  }
};

},{"./lib/animationHelpers":3,"./lib/jqLite":5,"./lib/util":6}],8:[function(require,module,exports){
module.exports=require(5)
},{}],9:[function(require,module,exports){
/**
 * MUI CSS/JS overlay module
 * @module overlay
 */

'use strict';


var util = require('./lib/util'),
    jqLite = require('./lib/jqLite'),
    overlayId = 'mui-overlay',
    bodyClass = 'mui--overflow-hidden',
    iosRegex = /(iPad|iPhone|iPod)/g,
    activeElement;


/**
 * Turn overlay on/off.
 * @param {string} action - Turn overlay "on"/"off".
 * @param {object} [options]
 * @config {boolean} [keyboard] - If true, close when escape key is pressed.
 * @config {boolean} [static] - If false, close when backdrop is clicked.
 * @config {Function} [onclose] - Callback function to execute on close
 * @param {Element} [childElement] - Child element to add to overlay.
 */
function overlayFn(action) {
  var overlayEl;
  
  if (action === 'on') {
    // extract arguments
    var arg, options, childElement;
    
    // pull options and childElement from arguments
    for (var i=arguments.length - 1; i > 0; i--) {
      arg = arguments[i];

      if (jqLite.type(arg) === 'object') options = arg;
      if (arg instanceof Element && arg.nodeType === 1) childElement = arg;
    }

    // option defaults
    options = options || {};
    if (options.keyboard === undefined) options.keyboard = true;
    if (options.static === undefined) options.static = false;
    
    // execute method
    overlayEl = overlayOn(options, childElement);
    
  } else if (action === 'off') {
    overlayEl = overlayOff();

  } else {
    // raise error
    util.raiseError("Expecting 'on' or 'off'");

  }

  return overlayEl;
}


/**
 * Turn on overlay.
 * @param {object} options - Overlay options.
 * @param {Element} childElement - The child element.
 */
function overlayOn(options, childElement) {
  var doc = document,
      bodyEl = doc.body,
      overlayEl = doc.getElementById(overlayId);

  // cache activeElement
  if (doc.activeElement) activeElement = doc.activeElement;

  // add overlay
  util.enableScrollLock();

  if (!overlayEl) {
    // create overlayEl
    overlayEl = doc.createElement('div');
    overlayEl.setAttribute('id', overlayId);
    overlayEl.setAttribute('tabindex', '-1');
    
    // add child element
    if (childElement) overlayEl.appendChild(childElement);

    bodyEl.appendChild(overlayEl);
    
  } else {
    // remove existing children
    while (overlayEl.firstChild) overlayEl.removeChild(overlayEl.firstChild);
    
    // add child element
    if (childElement) overlayEl.appendChild(childElement);
  }

  // iOS bugfix
  if (iosRegex.test(navigator.userAgent)) {
    jqLite.css(overlayEl, 'cursor', 'pointer');
  }

  // handle options
  if (options.keyboard) addKeyupHandler();
  else removeKeyupHandler();

  if (options.static) removeClickHandler(overlayEl);
  else addClickHandler(overlayEl);

  // attach options
  overlayEl.muiOptions = options;

  // focus overlay element
  overlayEl.focus();

  return overlayEl;
}


/**
 * Turn off overlay.
 */
function overlayOff() {
  var overlayEl = document.getElementById(overlayId),
      callbackFn;

  if (overlayEl) {
    // remove children
    while (overlayEl.firstChild) overlayEl.removeChild(overlayEl.firstChild);

    // remove overlay element
    overlayEl.parentNode.removeChild(overlayEl);

    // callback reference
    callbackFn = overlayEl.muiOptions.onclose;

    // remove click handler
    removeClickHandler(overlayEl);
  }

  util.disableScrollLock();

  // remove keyup handler
  removeKeyupHandler();

  // return focus to activeElement
  if (activeElement) activeElement.focus();

  // execute callback
  if (callbackFn) callbackFn();

  return overlayEl;
}


/**
 * Add keyup handler.
 */
function addKeyupHandler() {
  jqLite.on(document, 'keyup', onKeyup);
}


/**
 * Remove keyup handler.
 */
function removeKeyupHandler() {
  jqLite.off(document, 'keyup', onKeyup);
}


/**
 * Teardown overlay when escape key is pressed.
 */
function onKeyup(ev) {
  if (ev.keyCode === 27) overlayOff();
}


/**
 * Add click handler.
 */
function addClickHandler(overlayEl) {
  jqLite.on(overlayEl, 'click', onClick);
}


/**
 * Remove click handler.
 */
function removeClickHandler(overlayEl) {
  jqLite.off(overlayEl, 'click', onClick);
}


/**
 * Teardown overlay when backdrop is clicked.
 */
function onClick(ev) {
  if (ev.target.id === overlayId) overlayOff();
}


/** Define module API */
module.exports = overlayFn;

},{"./lib/jqLite":5,"./lib/util":6}],10:[function(require,module,exports){
/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    btnClass = 'mui-btn',
    btnFABClass = 'mui-btn--fab',
    rippleClass = 'mui-ripple-effect',
    supportsTouch = 'ontouchstart' in document.documentElement,
    mouseDownEvents = (supportsTouch) ? 'touchstart' : 'mousedown',
    mouseUpEvents = (supportsTouch) ? 'touchend' : 'mouseup mouseleave',
    animationDuration = 600;


/**
 * Add ripple effects to button element.
 * @param {Element} buttonEl - The button element.
 */
function initialize(buttonEl) {
  // check flag
  if (buttonEl._muiRipple === true) return;
  else buttonEl._muiRipple = true;

  // exit if element is INPUT (doesn't support absolute positioned children)
  if (buttonEl.tagName === 'INPUT') return;

  // attach event handler
  jqLite.on(buttonEl, mouseDownEvents, mouseDownHandler);
}


/**
 * MouseDown Event handler.
 * @param {Event} ev - The DOM event
 */
function mouseDownHandler(ev) {
  // only left clicks
  if (ev.type === 'mousedown' && ev.button !== 0) return;

  var buttonEl = this;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;

  // add mouseup event to button once
  if (!buttonEl.muiMouseUp) {
    jqLite.on(buttonEl, mouseUpEvents, mouseUpHandler);
    buttonEl.muiMouseUp = true;
  }

  // create ripple element
  var rippleEl = createRippleEl(ev, buttonEl);

  buttonEl.appendChild(rippleEl);

  // animate in
  util.requestAnimationFrame(function() {
    jqLite.addClass(rippleEl, 'mui--animate-in mui--active');
  });
}


/**
 * MouseUp event handler.
 * @param {Event} ev - The DOM event
 */
function mouseUpHandler(ev) {
  var children = this.children,
      i = children.length,
      rippleEls = [],
      el;

  // animate out ripples
  while (i--) {
    el = children[i];
    if (jqLite.hasClass(el, rippleClass)) {
      jqLite.addClass(el, 'mui--animate-out');
      rippleEls.push(el);
    }
  }

  // remove ripples after animation
  if (rippleEls.length) {
    setTimeout(function() {
      var i = rippleEls.length,
          el,
          parentNode;

      // remove elements
      while (i--) {
        el = rippleEls[i];
        parentNode = el.parentNode;
        if (parentNode) parentNode.removeChild(el);
      }
    }, animationDuration);
  }
}


/**
 * Create ripple element  
 * @param {Element} - buttonEl - The button element.
 */
function createRippleEl(ev, buttonEl) {
  // get (x, y) position of click
  var offset = jqLite.offset(buttonEl),
      clickEv = (ev.type === 'touchstart') ? ev.touches[0] : ev,
      xPos = clickEv.pageX - offset.left,
      yPos = clickEv.pageY - offset.top,
      diameter,
      radius,
      rippleEl;

  // calculate diameter
  diameter = Math.sqrt(offset.width * offset.width + 
                       offset.height * offset.height) * 2;

  // create element
  rippleEl = document.createElement('div'),
  rippleEl.className = rippleClass;

  radius = diameter / 2;

  jqLite.css(rippleEl, {
    height: diameter + 'px',
    width: diameter + 'px',
    top: yPos - radius + 'px',
    left: xPos - radius + 'px'
  });

  return rippleEl;
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.getElementsByClassName(btnClass),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for new elements
    animationHelpers.onAnimationStart('mui-btn-inserted', function(ev) {
      initialize(ev.target);
    });
  }
};

},{"./lib/animationHelpers":3,"./lib/jqLite":5,"./lib/util":6}],11:[function(require,module,exports){
/**
 * MUI CSS/JS select module
 * @module forms/select
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    formlib = require('./lib/forms'),
    wrapperClass = 'mui-select',
    cssSelector = '.mui-select > select',
    menuClass = 'mui-select__menu',
    selectedClass = 'mui--is-selected',
    disabledClass = 'mui--is-disabled',
    doc = document,
    win = window;


/**
 * Initialize select element.
 * @param {Element} selectEl - The select element.
 */
function initialize(selectEl) {
  // check flag
  if (selectEl._muiSelect === true) return;
  else selectEl._muiSelect = true;

  // use default behavior on touch devices
  if ('ontouchstart' in doc.documentElement) return;

  // initialize element
  new Select(selectEl);

  // set flag
  selectEl._muiJs = true;
}


/**
 * Creates a new Select object
 * @class
 */
function Select(selectEl) {
  var wrapperEl = selectEl.parentNode;

  // instance variables
  this.selectEl = selectEl;
  this.wrapperEl = wrapperEl;
  this.useDefault = false;  // currently unused but let's keep just in case
  this.isOpen = false;
  this.menu = null;

  // NOTE: To get around cross-browser issues with <select> behavior we will
  //       defer focus to the parent element and handle events there

  // make wrapper tab focusable, remove tab focus from <select>
  if (!selectEl.disabled) wrapperEl.tabIndex = 0;
  if (!this.useDefault) selectEl.tabIndex = -1;

  var cb = util.callback;

  // prevent built-in menu from opening on <select>
  jqLite.on(selectEl, 'mousedown', cb(this, 'onInnerMouseDown'));

  // attach event listeners for custom menu
  jqLite.on(wrapperEl, 'click', cb(this, 'onWrapperClick'));
  jqLite.on(wrapperEl, 'blur focus', cb(this, 'onWrapperBlurOrFocus'));
  jqLite.on(wrapperEl, 'keydown', cb(this, 'onWrapperKeyDown'));

  // add element to detect 'disabled' change (using sister element due to 
  // IE/Firefox issue
  var el = document.createElement('div');
  el.className = 'mui-event-trigger';
  wrapperEl.appendChild(el);

  // handle 'disabled' add/remove
  jqLite.on(el, animationHelpers.animationEvents, function(ev) {
    // no need to propagate
    ev.stopPropagation();

    if (ev.animationName === 'mui-node-disabled') {
      ev.target.parentNode.removeAttribute('tabIndex');
    } else {
      ev.target.parentNode.tabIndex = 0;
    }    
  });
}


/**
 * Dispatch focus and blur events on inner <select> element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onWrapperBlurOrFocus = function(ev) {
  util.dispatchEvent(this.selectEl, ev.type, false, false);
}



/**
 * Disable default dropdown on mousedown.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onInnerMouseDown = function(ev) {
  // only left clicks
  if (ev.button !== 0 || this.useDefault) return;

  // prevent built-in menu from opening
  ev.preventDefault();
}


/**
 * Handle keydown events when wrapper is focused
 **/
Select.prototype.onWrapperKeyDown = function(ev) {
  // check flag
  if (this.useDefault || ev.defaultPrevented) return;

  var keyCode = ev.keyCode;

  if (this.isOpen === false) {
    // spacebar, down, up
    if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
      ev.preventDefault();

      // open custom menu
      this.renderMenu();
    }

  } else {
    var menu = this.menu;

    // tab
    if (keyCode === 9) return menu.destroy();
  
    // escape | up | down | enter
    if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
      ev.preventDefault();
    }

    if (keyCode === 27) {
      menu.destroy();
    } else if (keyCode === 40) {
      menu.increment();
    } else if (keyCode === 38) {
      menu.decrement();
    } else if (keyCode === 13) {
      menu.selectCurrent();
      menu.destroy();
    }
  }
}


/**
 * Handle click events on wrapper element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.onWrapperClick = function(ev) {
  // only left clicks, check default and disabled flags
  if (ev.button !== 0 || this.useDefault || this.selectEl.disabled) return;

  // focus wrapper
  this.wrapperEl.focus();

  // open menu
  this.renderMenu();
}


/**
 * Render options dropdown.
 */
Select.prototype.renderMenu = function() {
  // check flag
  if (this.isOpen) return;

  // render custom menu and reset flag
  var self = this;
  this.menu = new Menu(this.wrapperEl, this.selectEl, function() {
    self.isOpen = false;
    self.menu = null;
    self.wrapperEl.focus();
  });

  // set flag
  this.isOpen = true;
}


/**
 * Creates a new Menu
 * @class
 */
function Menu(wrapperEl, selectEl, wrapperCallbackFn) {
  // add scroll lock
  util.enableScrollLock();

  // instance variables
  this.itemArray = [];
  this.origPos = null;
  this.currentPos = null;
  this.selectEl = selectEl;
  this.wrapperEl = wrapperEl;
  this.menuEl = this._createMenuEl(wrapperEl, selectEl);

  var cb = util.callback;

  this.onClickCB = cb(this, 'onClick');
  this.destroyCB = cb(this, 'destroy');
  this.wrapperCallbackFn = wrapperCallbackFn;

  // add to DOM
  wrapperEl.appendChild(this.menuEl);
  jqLite.scrollTop(this.menuEl, this.menuEl._muiScrollTop);

  // attach event handlers
  jqLite.on(this.menuEl, 'click', this.onClickCB);
  jqLite.on(win, 'resize', this.destroyCB);

  // attach event handler after current event loop exits
  var fn = this.destroyCB;
  setTimeout(function() {jqLite.on(doc, 'click', fn);}, 0);
}


/**
 * Create menu element
 * @param {Element} selectEl - The select element
 */
Menu.prototype._createMenuEl = function(wrapperEl, selectEl) {
  var menuEl = doc.createElement('div'),
      childEls = selectEl.children,
      itemArray = this.itemArray,
      itemPos = 0,
      selectedPos = 0,
      selectedRow = 0,
      docFrag = document.createDocumentFragment(),  // for speed
      loopEl,
      rowEl,
      optionEls,
      inGroup,
      i,
      iMax,
      j,
      jMax;

  menuEl.className = menuClass;

  for (i=0, iMax=childEls.length; i < iMax; i++) {
    loopEl = childEls[i];

    if (loopEl.tagName === 'OPTGROUP') {
      // add row item to menu
      rowEl = doc.createElement('div');
      rowEl.textContent = loopEl.label;
      rowEl.className = 'mui-optgroup__label';
      docFrag.appendChild(rowEl);

      inGroup = true;
      optionEls = loopEl.children;
    } else {
      inGroup = false;
      optionEls = [loopEl];
    }

    // loop through option elements
    for (j=0, jMax=optionEls.length; j < jMax; j++) {
      loopEl = optionEls[j];

      // add row item to menu
      rowEl = doc.createElement('div');
      rowEl.textContent = loopEl.textContent;

      // handle optgroup options
      if (inGroup) jqLite.addClass(rowEl, 'mui-optgroup__option');

      if (loopEl.disabled) {
        // do not attach muiIndex to disable <option> elements to make them
        // unselectable.
        jqLite.addClass(rowEl, disabledClass);
      } else {
        rowEl._muiIndex = loopEl.index;
        rowEl._muiPos = itemPos;

        // handle selected options
        if (loopEl.selected) {
          jqLite.addClass(rowEl, selectedClass);
          selectedRow = menuEl.children.length;
          selectedPos = itemPos;
        }

        // add to item array
        itemArray.push(rowEl);
        itemPos += 1;
      }

      docFrag.appendChild(rowEl);
    }
  }

  // add rows to menu
  menuEl.appendChild(docFrag);

  // save indices
  this.origPos = selectedPos;
  this.currentPos = selectedPos;

  // set position
  var props = formlib.getMenuPositionalCSS(
    wrapperEl,
    menuEl.children.length,
    selectedRow
  );

  jqLite.css(menuEl, props);
  menuEl._muiScrollTop = props.scrollTop;

  return menuEl;
}


/**
 * Handle click events on menu element.
 * @param {Event} ev - The DOM event
 */
Menu.prototype.onClick = function(ev) {
  // don't allow events to bubble
  ev.stopPropagation();

  var item = ev.target,
      index = item._muiIndex;

  // ignore clicks on non-items                                               
  if (index === undefined) return;

  // select option
  this.currentPos = item._muiPos;
  this.selectCurrent();

  // destroy menu
  this.destroy();
}


/**
 * Increment selected item
 */
Menu.prototype.increment = function() {
  if (this.currentPos === this.itemArray.length - 1) return;

  // un-select old row
  jqLite.removeClass(this.itemArray[this.currentPos], selectedClass);

  // select new row
  this.currentPos += 1;
  jqLite.addClass(this.itemArray[this.currentPos], selectedClass);
}


/**
 * Decrement selected item
 */
Menu.prototype.decrement = function() {
  if (this.currentPos === 0) return;

  // un-select old row
  jqLite.removeClass(this.itemArray[this.currentPos], selectedClass);

  // select new row
  this.currentPos -= 1;
  jqLite.addClass(this.itemArray[this.currentPos], selectedClass);
}


/**
 * Select current item
 */
Menu.prototype.selectCurrent = function() {
  if (this.currentPos !== this.origPos) {
    this.selectEl.selectedIndex = this.itemArray[this.currentPos]._muiIndex;

    // trigger change event
    util.dispatchEvent(this.selectEl, 'change', false, false);
  }
}


/**
 * Destroy menu and detach event handlers
 */
Menu.prototype.destroy = function() {
  // remove scroll lock
  util.disableScrollLock(true);

  // remove event handlers
  jqLite.off(this.menuEl, 'click', this.clickCallbackFn);
  jqLite.off(doc, 'click', this.destroyCB);
  jqLite.off(win, 'resize', this.destroyCB);

  // remove element and execute wrapper callback
  var parentNode = this.menuEl.parentNode;
  if (parentNode) {
    parentNode.removeChild(this.menuEl);
    this.wrapperCallbackFn();
  }
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for mui-node-inserted events
    animationHelpers.onAnimationStart('mui-select-inserted', function(ev) {
      initialize(ev.target);
    });
  }
};

},{"./lib/animationHelpers":3,"./lib/forms":4,"./lib/jqLite":5,"./lib/util":6}],12:[function(require,module,exports){
/**
 * MUI CSS/JS tabs module
 * @module tabs
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[' + attrKey + '="tab"]',
    controlsAttrKey = 'data-mui-controls',
    activeClass = 'mui--is-active',
    showstartKey = 'mui.tabs.showstart',
    showendKey = 'mui.tabs.showend',
    hidestartKey = 'mui.tabs.hidestart',
    hideendKey = 'mui.tabs.hideend';


/**
 * Initialize the toggle element
 * @param {Element} toggleEl - The toggle element.
 */
function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiTabs === true) return;
  else toggleEl._muiTabs = true;

  // attach click handler
  jqLite.on(toggleEl, 'click', clickHandler);
}


/**
 * Handle clicks on the toggle element.
 * @param {Event} ev - The DOM event.
 */
function clickHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var toggleEl = this;

  // exit if toggle element is disabled
  if (toggleEl.getAttribute('disabled') !== null) return;

  activateTab(toggleEl);
}


/**
 * Activate the tab controlled by the toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function activateTab(currToggleEl) {
  var currTabEl = currToggleEl.parentNode,
      currPaneId = currToggleEl.getAttribute(controlsAttrKey),
      currPaneEl = document.getElementById(currPaneId),
      prevTabEl,
      prevPaneEl,
      prevPaneId,
      prevToggleEl,
      currData,
      prevData,
      ev1,
      ev2,
      cssSelector;

  // exit if already active
  if (jqLite.hasClass(currTabEl, activeClass)) return;

  // raise error if pane doesn't exist
  if (!currPaneEl) util.raiseError('Tab pane "' + currPaneId + '" not found');

  // get previous pane
  prevPaneEl = getActiveSibling(currPaneEl);
  prevPaneId = prevPaneEl.id;

  // get previous toggle and tab elements
  cssSelector = '[' + controlsAttrKey + '="' + prevPaneId + '"]';
  prevToggleEl = document.querySelectorAll(cssSelector)[0];
  prevTabEl = prevToggleEl.parentNode;

  // define event data
  currData = {paneId: currPaneId, relatedPaneId: prevPaneId};
  prevData = {paneId: prevPaneId, relatedPaneId: currPaneId};

  // dispatch 'hidestart', 'showstart' events
  ev1 = util.dispatchEvent(prevToggleEl, hidestartKey, true, true, prevData);
  ev2 = util.dispatchEvent(currToggleEl, showstartKey, true, true, currData);

  // let events bubble
  setTimeout(function() {
    // exit if either event was canceled
    if (ev1.defaultPrevented || ev2.defaultPrevented) return;

    // de-activate previous
    if (prevTabEl) jqLite.removeClass(prevTabEl, activeClass);
    if (prevPaneEl) jqLite.removeClass(prevPaneEl, activeClass);

    // activate current
    jqLite.addClass(currTabEl, activeClass);
    jqLite.addClass(currPaneEl, activeClass);

    // dispatch 'hideend', 'showend' events
    util.dispatchEvent(prevToggleEl, hideendKey, true, false, prevData);
    util.dispatchEvent(currToggleEl, showendKey, true, false, currData);
  }, 0);
}


/** 
 * Get previous active sibling.
 * @param {Element} el - The anchor element.
 */
function getActiveSibling(el) {
  var elList = el.parentNode.children,
      q = elList.length,
      activeEl = null,
      tmpEl;

  while (q-- && !activeEl) {
    tmpEl = elList[q];
    if (tmpEl !== el && jqLite.hasClass(tmpEl, activeClass)) activeEl = tmpEl
  }

  return activeEl;
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.querySelectorAll(attrSelector),
        i = elList.length;
    while (i--) {initialize(elList[i]);}
    
    animationHelpers.onAnimationStart('mui-tab-inserted', function(ev) {
      initialize(ev.target);
    });
  },
  
  /** External API */
  api: {
    activate: function(paneId) {
      var cssSelector = '[' + controlsAttrKey + '=' + paneId + ']',
          toggleEl = document.querySelectorAll(cssSelector);

      if (!toggleEl.length) {
        util.raiseError('Tab control for pane "' + paneId + '" not found');
      }

      activateTab(toggleEl[0]);
    }
  }
};

},{"./lib/animationHelpers":3,"./lib/jqLite":5,"./lib/util":6}],13:[function(require,module,exports){
/**
 * MUI CSS/JS form-control module
 * @module forms/form-control
 */

'use strict';


var jqLite = require('./lib/jqLite'),
    util = require('./lib/util'),
    animationHelpers = require('./lib/animationHelpers'),
    cssSelector = '.mui-textfield > input, .mui-textfield > textarea',
    emptyClass = 'mui--is-empty',
    notEmptyClass = 'mui--is-not-empty',
    dirtyClass = 'mui--is-dirty',
    floatingLabelClass = 'mui-textfield--float-label';


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiTextfield === true) return;
  else inputEl._muiTextfield = true;

  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.on(inputEl, 'input change', inputHandler);

  // add dirty class on focus
  jqLite.on(inputEl, 'focus', function(){jqLite.addClass(this, dirtyClass);});
}


/**
 * Handle input events.
 */
function inputHandler() {
  var inputEl = this;

  if (inputEl.value.length) {
    jqLite.removeClass(inputEl, emptyClass);
    jqLite.addClass(inputEl, notEmptyClass);
  } else {
    jqLite.removeClass(inputEl, notEmptyClass);
    jqLite.addClass(inputEl, emptyClass)
  }

  jqLite.addClass(inputEl, dirtyClass);
}


/** Define module API */
module.exports = {
  /** Initialize input elements */
  initialize: initialize,
  
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;
    
    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector),
        i = elList.length;
    while (i--) initialize(elList[i]);

    // listen for new elements
    animationHelpers.onAnimationStart('mui-textfield-inserted', function(ev) {
      initialize(ev.target);
    });

    // add transition css for floating labels
    setTimeout(function() {
      var css = '.mui-textfield.mui-textfield--float-label > label {' + [
        '-webkit-transition',
        '-moz-transition',
        '-o-transition',
        'transition',
        ''
      ].join(':all .15s ease-out;') + '}';
      
      util.loadStyle(css);
    }, 150);

    // pointer-events shim for floating labels
    if (util.supportsPointerEvents() === false) {
      jqLite.on(doc, 'click', function(ev) {
        var targetEl = ev.target;

        if (targetEl.tagName === 'LABEL' &&
            jqLite.hasClass(targetEl.parentNode, floatingLabelClass)) {
          var inputEl = targetEl.previousElementSibling;
          if (inputEl) inputEl.focus();
        }
      });
    }
  }
};

},{"./lib/animationHelpers":3,"./lib/jqLite":5,"./lib/util":6}]},{},[1])