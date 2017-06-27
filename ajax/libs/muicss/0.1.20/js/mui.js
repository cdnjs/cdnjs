(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * MUI config module
 * @module config
 */

/** Define module API */
module.exports = {
  /** Use debug mode */
  debug: true
};

},{}],2:[function(require,module,exports){
/**
 * MUI CSS/JS dropdown module
 * @module dropdowns
 */

'use strict';


var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[data-mui-toggle="dropdown"]',
    openClass = 'mui-open',
    menuClass = 'mui-dropdown-menu';


/**
 * Initialize toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function initialize(toggleEl) {
  // check flag
  if (toggleEl._muiDropdown === true) return;
  else toggleEl._muiDropdown = true;

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

  // prevent form submission
  ev.preventDefault();
  ev.stopPropagation();

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
    jqLite.on(doc, 'click', closeDropdownFn);
  }

  // toggle dropdown
  if (jqLite.hasClass(menuEl, openClass)) closeDropdownFn();
  else openDropdownFn();
}

  
/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.querySelectorAll(attrSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.getAttribute(attrKey) === 'dropdown') initialize(el);
    });
  }
};

},{"./lib/jqLite.js":5,"./lib/util.js":6}],3:[function(require,module,exports){
/**
 * MUI CSS/JS form-control module
 * @module forms/form-control
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    cssSelector = '.mui-form-control',
    emptyClass = 'mui-empty',
    notEmptyClass = 'mui-not-empty',
    dirtyClass = 'mui-dirty',
    formControlClass = 'mui-form-control',
    floatingLabelClass = 'mui-form-floating-label';


/**
 * Initialize input element.
 * @param {Element} inputEl - The input element.
 */
function initialize(inputEl) {
  // check flag
  if (inputEl._muiFormControl === true) return;
  else inputEl._muiFormControl = true;

  if (inputEl.value.length) jqLite.addClass(inputEl, notEmptyClass);
  else jqLite.addClass(inputEl, emptyClass);

  jqLite.on(inputEl, 'input', inputHandler);

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
    var elList = doc.querySelectorAll(cssSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') initialize(el);
    });

    // add transition css for floating labels
    setTimeout(function() {
      var css = '.' + floatingLabelClass + '{' + [
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
      jqLite.on(document, 'click', function(ev) {
        var targetEl = ev.target;

        if (targetEl.tagName === 'LABEL' &&
            jqLite.hasClass(targetEl, floatingLabelClass)) {
          var inputEl = targetEl.previousElementSibling;
          if (jqLite.hasClass(inputEl, formControlClass)) inputEl.focus();
        }
      });
    }
  }
};

},{"../lib/jqLite.js":5,"../lib/util.js":6}],4:[function(require,module,exports){
/**
 * MUI CSS/JS select module
 * @module forms/select
 */

'use strict';


var jqLite = require('../lib/jqLite.js'),
    util = require('../lib/util.js'),
    wrapperClass = 'mui-select',
    cssSelector = '.mui-select > select',
    menuClass = 'mui-select-menu',
    optionHeight = 42,  // from CSS
    menuPadding = 8,  // from CSS
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
}


/**
 * Creates a new Select object
 * @class
 */
function Select(selectEl) {
  // instance variables
  this.selectEl = selectEl;
  this.wrapperEl = selectEl.parentNode;
  this.useDefault = false;  // currently unused but let's keep just in case

  // attach event handlers
  jqLite.on(selectEl, 'mousedown', util.callback(this, 'mousedownHandler'));
  jqLite.on(selectEl, 'focus', util.callback(this, 'focusHandler'));
  jqLite.on(selectEl, 'click', util.callback(this, 'clickHandler'));
  
  // make wrapper focusable and fix firefox bug
  this.wrapperEl.tabIndex = -1;
  var callbackFn = util.callback(this, 'wrapperFocusHandler');
  jqLite.on(this.wrapperEl, 'focus', callbackFn);
}


/**
 * Disable default dropdown on mousedown.
 * @param {Event} ev - The DOM event
 */
Select.prototype.mousedownHandler = function(ev) {
  if (ev.button !== 0 || this.useDefault === true) return;
  ev.preventDefault();
}


/**
 * Handle focus event on select element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.focusHandler = function(ev) {
  // check flag
  if (this.useDefault === true) return;

  var selectEl = this.selectEl,
      wrapperEl = this.wrapperEl,
      origIndex = selectEl.tabIndex,
      keydownFn = util.callback(this, 'keydownHandler');

  // attach keydown handler
  jqLite.on(doc, 'keydown', keydownFn);

  // disable tabfocus once
  selectEl.tabIndex = -1;
  jqLite.one(wrapperEl, 'blur', function() {
    selectEl.tabIndex = origIndex;
    jqLite.off(doc, 'keydown', keydownFn);
  });
  
  // defer focus to parent
  wrapperEl.focus();
}


/**
 * Handle keydown events on doc
 **/
Select.prototype.keydownHandler = function(ev) {
  // spacebar, down, up
  if (ev.keyCode === 32 || ev.keyCode === 38 || ev.keyCode === 40) {
    // prevent win scroll
    ev.preventDefault();
    
    if (this.selectEl.disabled !== true) this.renderMenu();
  }
}


/**
 * Handle focus event on wrapper element.
 */
Select.prototype.wrapperFocusHandler = function() {
  // firefox bugfix
  if (this.selectEl.disabled) return this.wrapperEl.blur();
}


/**
 * Handle click events on select element.
 * @param {Event} ev - The DOM event
 */
Select.prototype.clickHandler = function(ev) {
  // only left clicks
  if (ev.button !== 0) return;
  this.renderMenu();
}


/**
 * Render options dropdown.
 */
Select.prototype.renderMenu = function() {
  // check and reset flag
  if (this.useDefault === true) return this.useDefault = false;

  new Menu(this.selectEl);
}


/**
 * Creates a new Menu
 * @class
 */
function Menu(selectEl) {
  // instance variables
  this.origIndex = null;
  this.currentIndex = null;
  this.selectEl = selectEl;
  this.menuEl = this._createMenuEl(selectEl);
  this.clickCallbackFn = util.callback(this, 'clickHandler');
  this.keydownCallbackFn = util.callback(this, 'keydownHandler');
  this.destroyCallbackFn = util.callback(this, 'destroy');

  // add to DOM
  selectEl.parentNode.appendChild(this.menuEl);

  // blur active element
  setTimeout(function() {
    // ie10 bugfix
    if (doc.activeElement.nodeName.toLowerCase() !== "body") {
      doc.activeElement.blur();
    }
  }, 0);
  
  // attach event handlers
  jqLite.on(this.menuEl, 'click', this.clickCallbackFn);
  jqLite.on(doc, 'keydown', this.keydownCallbackFn);
  jqLite.on(win, 'resize', this.destroyCallbackFn);

  // attach event handler after current event loop exits
  var fn = this.destroyCallbackFn;
  setTimeout(function() {jqLite.on(doc, 'click', fn);}, 0);
}


/**
 * Create menu element
 * @param {Element} selectEl - The select element
 */
Menu.prototype._createMenuEl = function(selectEl) {
  var optionEl, itemEl, i, minTop, maxTop, top;

  var menuEl = doc.createElement('div'),
      optionList = selectEl.children,
      m = optionList.length,
      selectedPos = 0,
      idealTop = 13;
  

  // create element
  menuEl.className = menuClass;

  // add options
  for (i=0; i < m; i++) {
    optionEl = optionList[i];

    itemEl = doc.createElement('div');
    itemEl.textContent = optionEl.textContent;
    itemEl._muiPos = i;

    if (optionEl.selected) selectedPos = i;

    menuEl.appendChild(itemEl);
  }

  // add selected attribute
  menuEl.children[selectedPos].setAttribute('selected', true);

  // save indices
  this.origIndex = selectedPos;
  this.currentIndex = selectedPos;

  var viewHeight = doc.documentElement.clientHeight;

  // set height (use viewport as maximum height)
  var height = m * optionHeight + 2 * menuPadding;
  height = Math.min(height, viewHeight);
  jqLite.css(menuEl, 'height', height + 'px');

  // ideal position
  idealTop += selectedPos * optionHeight;
  idealTop = -1 * idealTop;

  // minimum position
  minTop = -1 * selectEl.getBoundingClientRect().top;

  // maximium position
  maxTop = (viewHeight - height) + minTop;

  // prevent overflow-y
  top = Math.max(idealTop, minTop);
  top = Math.min(top, maxTop);

  jqLite.css(menuEl, 'top', top + 'px');

  return menuEl;
}


/**
 * Handle keydown events on doc element.
 * @param {Event} ev - The DOM event
 */
Menu.prototype.keydownHandler = function(ev) {
  var keyCode = ev.keyCode;

  // tab
  if (keyCode === 9) return this.destroy();
  
  // escape | up | down | enter
  if (keyCode === 27 || keyCode === 40 || keyCode === 38 || keyCode === 13) {
    ev.preventDefault();
  }

  if (keyCode === 27) {
    this.destroy();
  } else if (keyCode === 40) {
    this.increment();
  } else if (keyCode === 38) {
    this.decrement();
  } else if (keyCode === 13) {
    this.selectCurrent();
    this.destroy();
  }
}


/**
 * Handle click events on menu element.
 * @param {Event} ev - The DOM event
 */
Menu.prototype.clickHandler = function(ev) {
  // don't allow events to bubble
  ev.stopPropagation();

  var pos = ev.target._muiPos;

  // ignore clicks on non-items                                               
  if (pos === undefined) return;

  // select option
  this.currentIndex = pos;
  this.selectCurrent();

  // destroy menu
  this.destroy();
}


/**
 * Increment selected item
 */
Menu.prototype.increment = function() {
  if (this.currentIndex === this.menuEl.children.length - 1) return;

  this.menuEl.children[this.currentIndex].removeAttribute('selected');
  this.currentIndex += 1;
  this.menuEl.children[this.currentIndex].setAttribute('selected', true);
}


/**
 * Decrement selected item
 */
Menu.prototype.decrement = function() {
  if (this.currentIndex === 0) return;

  this.menuEl.children[this.currentIndex].removeAttribute('selected');
  this.currentIndex -= 1;
  this.menuEl.children[this.currentIndex].setAttribute('selected', true);
}


/**
 * Select current item
 */
Menu.prototype.selectCurrent = function() {
  if (this.currentIndex !== this.origIndex) {
    this.selectEl.children[this.origIndex].selected = false;
    this.selectEl.children[this.currentIndex].selected = true;

    // trigger change event
    util.dispatchEvent(this.selectEl, 'change');
  }
}


/**
 * Destroy menu and detach event handlers
 */
Menu.prototype.destroy = function() {
  // remove element and focus element
  this.menuEl.parentNode.removeChild(this.menuEl);
  this.selectEl.focus();
  
  // remove event handlers
  jqLite.off(this.menuEl, 'click', this.clickCallbackFn);
  jqLite.off(doc, 'keydown', this.keydownCallbackFn);
  jqLite.off(doc, 'click', this.destroyCallbackFn);
  jqLite.off(win, 'resize', this.destroyCallbackFn);
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = doc.querySelectorAll(cssSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (el.tagName === 'SELECT' &&
          jqLite.hasClass(el.parentNode, wrapperClass)) {
        initialize(el);
      }
    });
  }
};

},{"../lib/jqLite.js":5,"../lib/util.js":6}],5:[function(require,module,exports){
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
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOn(element, type, callback, useCapture) {
  useCapture = (useCapture === undefined) ? false : useCapture;

  // add to DOM
  element.addEventListener(type, callback, useCapture);

  // add to cache
  var cache = element._muiEventCache = element._muiEventCache || {};
  cache[type] = cache[type] || [];
  cache[type].push([callback, useCapture]);
}


/**
 * Remove an event handler from a DOM element
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
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


/**
 * Attach an event hander which will only execute once
 * @param {Element} element - The DOM element.
 * @param {string} type - The event type name.
 * @param {Function} callback - The callback function.
 * @param {Boolean} useCapture - Use capture flag.
 */
function jqLiteOne(element, type, callback, useCapture) {
  jqLiteOn(element, type, function onFn(ev) {
    // execute callback
    if (callback) callback.apply(this, arguments);

    // remove wrapper
    jqLiteOff(element, type, onFn);
  }, useCapture);
}


/**
 * Return object representing top/left offset and element height/width.
 * @param {Element} element - The DOM element.
 */
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
  type: jqLiteType
};

},{}],6:[function(require,module,exports){
/**
 * MUI CSS/JS utilities module
 * @module lib/util
 */

'use strict';


var config = require('../config.js'),
    jqLite = require('./jqLite.js'),
    win = window,
    doc = window.document,
    nodeInsertedCallbacks = [],
    head,
    _supportsPointerEvents;


head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;


/**
 * Logging function
 */
function logFn() {
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
  if (doc.createStyleSheet) {
    doc.createStyleSheet().cssText = cssText;
  } else {
    var e = doc.createElement('style');
    e.type = 'text/css';
    
    if (e.styleSheet) e.styleSheet.cssText = cssText;
    else e.appendChild(doc.createTextNode(cssText));
    
    // add to document
    head.insertBefore(e, head.firstChild);
  }
}


/**
 * Raise an error
 * @param {string} msg - The error message.
 */
function raiseErrorFn(msg) {
  throw new Error("MUI: " + msg);
}


/**
 * Register callbacks on muiNodeInserted event
 * @param {function} callbackFn - The callback function.
 */
function onNodeInsertedFn(callbackFn) {
  nodeInsertedCallbacks.push(callbackFn);

  // initalize listeners
  if (nodeInsertedCallbacks._initialized === undefined) {
    jqLite.on(doc, 'animationstart', animationHandlerFn);
    jqLite.on(doc, 'mozAnimationStart', animationHandlerFn);
    jqLite.on(doc, 'webkitAnimationStart', animationHandlerFn);

    nodeInsertedCallbacks._initialized = true;
  }
}


/**
 * Execute muiNodeInserted callbacks
 * @param {Event} ev - The DOM event.
 */
function animationHandlerFn(ev) {
  // check animation name
  if (ev.animationName !== 'mui-node-inserted') return;

  var el = ev.target;

  // iterate through callbacks
  for (var i=nodeInsertedCallbacks.length - 1; i >= 0; i--) {
    nodeInsertedCallbacks[i](el);
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
 */
function dispatchEventFn(element, eventType, bubbles, cancelable) {
  var ev = document.createEvent('HTMLEvents'),
      bubbles = (bubbles !== undefined) ? bubbles : true,
      cancelable = (cancelable !== undefined) ? cancelable : true;
  
  ev.initEvent(eventType, bubbles, cancelable);
  element.dispatchEvent(ev);
}


/**
 * Define the module API
 */
module.exports = {
  /** Create callback closures */
  callback: callbackFn,
  
  /** Classnames object to string */
  classNames: classNamesFn,

  /** Dispatch event */
  dispatchEvent: dispatchEventFn,
  
  /** Log messages to the console when debug is turned on */
  log: logFn,

  /** Load CSS text as new stylesheet */
  loadStyle: loadStyleFn,

  /** Register muiNodeInserted handler */
  onNodeInserted: onNodeInsertedFn,

  /** Raise MUI error */
  raiseError: raiseErrorFn,

  /** Support Pointer Events check */
  supportsPointerEvents: supportsPointerEventsFn
};

},{"../config.js":1,"./jqLite.js":5}],7:[function(require,module,exports){
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
  var jqLite = require('./lib/jqLite.js'),
      util = require('./lib/util.js'),
      formControl = require('./forms/form-control.js'),
      select = require('./forms/select.js'),
      ripple = require('./ripple.js'),
      dropdowns = require('./dropdowns.js'),
      tabs = require('./tabs.js'),
      overlay = require('./overlay.js');

  // expose api
  win.mui = {
    overlay: overlay,
    tabs: tabs.api
  };
  
  // init libraries
  jqLite.ready(function() {
    formControl.initListeners();
    select.initListeners();
    ripple.initListeners();
    dropdowns.initListeners();
    tabs.initListeners();
  });
})(window);

},{"./dropdowns.js":2,"./forms/form-control.js":3,"./forms/select.js":4,"./lib/jqLite.js":5,"./lib/util.js":6,"./overlay.js":8,"./ripple.js":9,"./tabs.js":10}],8:[function(require,module,exports){
/**
 * MUI CSS/JS overlay module
 * @module overlay
 */

'use strict';


var util = require('./lib/util.js'),
    jqLite = require('./lib/jqLite.js'),
    bodyClass = 'mui-overlay-on',
    overlayId = 'mui-overlay',
    iosRegex = /(iPad|iPhone|iPod)/g;


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
  var bodyEl = document.body,
      overlayEl = document.getElementById(overlayId);
    
  // add overlay
  jqLite.addClass(bodyEl, bodyClass);

  if (!overlayEl) {
    // create overlayEl
    overlayEl = document.createElement('div');
    overlayEl.setAttribute('id', overlayId);
    
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
  }

  jqLite.removeClass(document.body, bodyClass);

  // remove option handlers
  removeKeyupHandler();
  removeClickHandler(overlayEl);

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

},{"./lib/jqLite.js":5,"./lib/util.js":6}],9:[function(require,module,exports){
/**
 * MUI CSS/JS ripple module
 * @module ripple
 */

'use strict';


var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    btnClass = 'mui-btn',
    btnFlatClass = 'mui-btn-flat',
    btnFloatingClass = 'mui-btn-floating',
    rippleClass = 'mui-ripple-effect',
    animationName = 'mui-btn-inserted';


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
  jqLite.on(buttonEl, 'touchstart', eventHandler);
  jqLite.on(buttonEl, 'mousedown', eventHandler);
}


/**
 * Event handler
 * @param {Event} ev - The DOM event
 */
function eventHandler(ev) {
  // only left clicks
  if (ev.button !== 0) return;

  var buttonEl = this;

  // exit if button is disabled
  if (buttonEl.disabled === true) return;

  // de-dupe touchstart and mousedown with 100msec flag
  if (buttonEl.touchFlag === true) {
    return;
  } else {
    buttonEl.touchFlag = true;
    setTimeout(function() {
      buttonEl.touchFlag = false;
    }, 100);
  }

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


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    var doc = document;

    // markup elements available when method is called
    var elList = doc.getElementsByClassName(btnClass);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);

    // listen for new elements
    util.onNodeInserted(function(el) {
      if (jqLite.hasClass(el, btnClass)) initialize(el);
    });
  }
};

},{"./lib/jqLite.js":5,"./lib/util.js":6}],10:[function(require,module,exports){
/**
 * MUI CSS/JS tabs module
 * @module tabs
 */

'use strict';


var jqLite = require('./lib/jqLite.js'),
    util = require('./lib/util.js'),
    attrKey = 'data-mui-toggle',
    attrSelector = '[' + attrKey + '="tab"]',
    controlsAttrKey = 'data-mui-controls',
    activeClass = 'mui-active';


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

  // let event bubble before toggling tab
  setTimeout(function() {
    if (!ev.defaultPrevented) activateTab(toggleEl);
  }, 0);
}


/**
 * Activate the tab controlled by the toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function activateTab(toggleEl) {
  var tabEl = toggleEl.parentNode,
      paneId = toggleEl.getAttribute(controlsAttrKey),
      paneEl = document.getElementById(paneId),
      tabs,
      panes,
      el,
      i;

  // raise error if pane doesn't exist
  if (!paneEl) util.raiseError('Tab pane "' + paneId + '" not found');

  // de-activate tab siblings
  tabs = tabEl.parentNode.children;
  for (i=tabs.length - 1; i >= 0; i--) {
    el = tabs[i];
    if (el !== tabEl) jqLite.removeClass(el, activeClass);
  }
  
  // de-activate pane siblings
  panes = paneEl.parentNode.children;
  for (i=panes.length - 1; i >= 0; i--) {
    el = panes[i];
    if (el !== paneEl) jqLite.removeClass(el, activeClass);
  }
  
  // activate tab and pane
  jqLite.addClass(tabEl, activeClass);
  jqLite.addClass(paneEl, activeClass);
}


/** Define module API */
module.exports = {
  /** Initialize module listeners */
  initListeners: function() {
    // markup elements available when method is called
    var elList = document.querySelectorAll(attrSelector);
    for (var i=elList.length - 1; i >= 0; i--) initialize(elList[i]);
    
    // TODO: listen for new elements
    util.onNodeInserted(function(el) {
      if (el.getAttribute(attrKey) === 'tab') initialize(el);
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

},{"./lib/jqLite.js":5,"./lib/util.js":6}]},{},[7]);
