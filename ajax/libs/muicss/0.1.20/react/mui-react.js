(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
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


},{"../config.js":1,"./jqLite.js":2}],4:[function(require,module,exports){
/**
 * MUI React buttons module
 * @module react/buttons
 */

'use strict';

var util = require('../js/lib/util.js'),
    Ripple = require('./ripple.jsx');

var buttonClass = 'mui-btn',
    flatClass = buttonClass + '-flat',
    raisedClass = buttonClass + '-raised',
    largeClass = buttonClass + '-lg',
    floatingClass = buttonClass + '-floating';


/**
 * Button constructor
 * @class
 */
var Button = React.createClass({displayName: "Button",
  mixins: [Ripple],
  getDefaultProps: function() {
    return {
      type: 'default',  // one of default, primary, danger or accent
      disabled: false
    };
  },
  render: function() {
    var cs = {};

    cs[buttonClass] = true;
    cs[buttonClass + '-' + this.props.type] = true;
    cs[flatClass] = this.props.flat;
    cs[raisedClass] = this.props.raised;
    cs[largeClass] = this.props.large;
    cs = util.classNames(cs);

    return (
      React.createElement("button", {
        className:  cs, 
        disabled:  this.props.disabled, 
        onMouseDown:  this.ripple, 
        onTouchStart:  this.ripple, 
        onClick:  this.props.onClick
      }, 
         this.props.children, 
         this.state.ripples && this.renderRipples()
      )
    );
  }
});


/**
 * Round button constructor
 * @class
 */
var RoundButton = React.createClass({displayName: "RoundButton",
  mixins: [Ripple],
  getDefaultProps: function() {
    return {
      floating: true
    };
  },
  render: function() {
    var cs = {};

    cs[buttonClass] = true;
    cs[floatingClass] = true;
    cs[floatingClass + '-mini'] = this.props.mini;
    cs = util.classNames(cs);

    return (
      React.createElement("button", {
        className:  cs, 
        disabled:  this.props.disabled, 
        onMouseDown:  this.ripple, 
        onTouchStart:  this.ripple, 
        onClick:  this.props.onClick
      }, 
         this.props.children, 
         this.state.ripples && this.renderRipples()
      )
    );
  }
})


/** Define module API */
module.exports = {
  Button: Button,
  RoundButton: RoundButton
};


},{"../js/lib/util.js":3,"./ripple.jsx":9}],5:[function(require,module,exports){
/**
 * MUI React dropdowns module
 * @module react/dropdowns
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util'),
    jqLite = require('../js/lib/jqLite'),
    buttons = require('./buttons.jsx'),
    Button = buttons.Button,
    RoundButton = buttons.RoundButton;

var dropdownClass = 'mui-dropdown',
    caretClass = 'mui-caret',
    menuClass = 'mui-dropdown-menu',
    openClass = 'mui-open',
    rightClass = 'mui-dropdown-menu-right';


/**
 * Dropdown constructor
 * @class
 */
var Dropdown = React.createClass({displayName: "Dropdown",
  menuStyle: { top: 0 },
  getInitialState: function() {
    return {
      opened: false
    };
  },
  componentWillMount: function() {
    document.addEventListener('click', this._outsideClick);
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this._outsideClick);
  },
  render: function() {
    var button;

    if (this.props.round) {
      button = (
        React.createElement(RoundButton, {
          ref: "button", 
          onClick:  this._click, 
          mini:  this.props.mini, 
          disabled:  this.props.disabled
        }, 
           this.props.label, 
          React.createElement("span", {className:  caretClass })
        )
      );
    } else {
      button = (
        React.createElement(Button, {
          ref: "button", 
          onClick:  this._click, 
          type:  this.props.type, 
          flat:  this.props.flat, 
          raised:  this.props.raised, 
          large:  this.props.large, 
          disabled:  this.props.disabled
        }, 
           this.props.label, 
          React.createElement("span", {className:  caretClass })
        )
      );
    }

    var cs = {};

    cs[menuClass] = true;
    cs[openClass] = this.state.opened;
    cs[rightClass] = this.props.right;
    cs = util.classNames(cs);

    return (
      React.createElement("div", {className:  dropdownClass, style:  {padding: '0px 2px 0px'} }, 
         button, 
         this.state.opened && (
            React.createElement("ul", {
              className:  cs, 
              style:  this.menuStyle, 
              ref: "menu", 
              onClick:  this._select
            }, 
               this.props.children
            ))
        
      )
    );
  },
  _click: function(ev) {
    // only left clicks
    if (ev.button !== 0) return;

    // exit if toggle button is disabled
    if (this.props.disabled) return;

    setTimeout(function() {
      if (!ev.defaultPrevented) this._toggle();
    }.bind(this), 0);
  },
  _toggle: function() {
    // exit if no menu element
    if (!this.props.children) {
      return util.raiseError('Dropdown menu element not found');
    }

    if (this.state.opened) this._close();
    else this._open();
  },
  _open: function() {
    // position menu element below toggle button
    var wrapperRect = React.findDOMNode(this).getBoundingClientRect(),
        toggleRect;

    toggleRect = React.findDOMNode(this.refs.button).getBoundingClientRect();
    this.menuStyle.top = toggleRect.top - wrapperRect.top + toggleRect.height;

    this.setState({
      opened: true
    });
  },
  _close: function() {
    this.setState({
      opened: false
    });
  },
  _select: function(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  },
  _outsideClick: function(ev) {
    var isClickInside = React.findDOMNode(this).contains(ev.target);

    if (!isClickInside) {
      this._close();
    }
  }
});


/**
 * DropdownItem constructor
 * @class
 */
var DropdownItem = React.createClass({displayName: "DropdownItem",
  render: function() {
    return (
      React.createElement("li", null, 
        React.createElement("a", {href:  this.props.link || '#', onClick:  this._click}, 
           this.props.children
        )
      )
    );
  },
  _click: function(ev) {
    if (this.props.onClick) this.props.onClick(this, ev);
  }
});


/** Define module API */
module.exports = {
  Dropdown: Dropdown,
  DropdownItem: DropdownItem
};


},{"../js/lib/jqLite":2,"../js/lib/util":3,"./buttons.jsx":4}],6:[function(require,module,exports){
/**
 * MUI React main module
 * @module react/main
 */

(function(win) {
  // return if library has been loaded already
  if (win._muiReactLoaded) return;
  else win._muiReactLoaded = true;

  // load dependencies
  var layout = require('./layout.jsx'),
      forms = require('./forms.jsx'),
      buttons = require('./buttons.jsx'),
      dropdowns = require('./dropdowns.jsx'),
      tabs = require('./tabs.jsx'),
      doc = win.document;

  // export React classes
  win.MUIContainer = layout.Container;
  win.MUIFluidContainer = layout.FluidContainer;
  win.MUIPanel = layout.Panel;

  win.MUIFormControl = forms.FormControl;
  win.MUIFormGroup = forms.FormGroup;

  win.MUIButton = buttons.Button;
  win.MUIRoundButton = buttons.RoundButton;

  win.MUIDropdown = dropdowns.Dropdown;
  win.MUIDropdownItem = dropdowns.DropdownItem;
 
  win.MUITabs = tabs.Tabs;
  win.MUITabItem = tabs.TabItem;
  
})(window);


},{"./buttons.jsx":4,"./dropdowns.jsx":5,"./forms.jsx":7,"./layout.jsx":8,"./tabs.jsx":10}],7:[function(require,module,exports){
/**
 * MUI React forms module
 * @module react/forms
 */

'use strict';

var util = require('../js/lib/util.js');

var formControlClass = 'mui-form-control',
    formGroupClass = 'mui-form-group',
    floatingLabelBaseClass = 'mui-form-floating-label',
    floatingLabelActiveClass = floatingLabelBaseClass + '-active';


/**
 * FormControl constructor
 * @class
 */
var FormControl = React.createClass({displayName: "FormControl",
  render: function() {
    return (
      React.createElement("input", {
        type: this.props.type || 'text', 
        className:  formControlClass, 
        value: this.props.value, 
        autoFocus: this.props.autofocus, 
        onInput: this.props.onInput}
      )
    );
  }
});


/**
 * FormLabel constructor
 * @class
 */
var FormLabel = React.createClass({displayName: "FormLabel",
  getInitialState: function() {
    return {
      style: {} 
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      var s = '.15s ease-out',
          style;

      style = {
        transition: s,
        WebkitTransition: s,
        MozTransition: s,
        OTransition: s,
        msTransform: s
      };

      this.setState({
        style: style
      });
    }.bind(this), 150);
  },
  render: function() {
    var labelText = this.props.text,
        labelClass;
    
    if (labelText) {
      labelClass = {};
      labelClass[floatingLabelBaseClass] = this.props.floating;
      labelClass[floatingLabelActiveClass] = this.props.active;
      labelClass = util.classNames(labelClass);
    }
    
    return (
      React.createElement("label", {
        className:  labelClass, 
        style:  this.state.style, 
        onClick:  this.props.onClick
      }, 
         labelText 
      )
    );
  }
});


/**
 * FormGroup constructor
 * @class
 */
var FormGroup = React.createClass({displayName: "FormGroup",
  getInitialState: function() {
    return {
      hasInput: false
    };
  },
  componentDidMount: function() {
    if (this.props.value) {
      this.setState({
        hasInput: true
      });
    }
  },
  render: function() {
    var labelText = this.props.label;
    return (
      React.createElement("div", {className:  formGroupClass }, 
        React.createElement(FormControl, {
          type: this.props.type, 
          value: this.props.value, 
          autoFocus: this.props.autofocus, 
          onInput:  this._input}
        ), 
         labelText &&
          React.createElement(FormLabel, {
            text: labelText, 
            onClick:  this._focus, 
            active:  this.state.hasInput, 
            floating:  this.props.isLabelFloating}
          )
        
      )
    );
  },
  _focus: function (e) {
    // pointer-events shim
    if (util.supportsPointerEvents() === false) {
      var labelEl = e.target;
      labelEl.style.cursor = 'text';

      if (!this.state.hasInput) {
        var inputEl = React.findDOMNode(this.refs.input);
        inputEl.focus();
      }
    }
  },
  _input: function (e) {
    if (e.target.value) {
      this.setState({
        hasInput: true 
      });
    } else {
      this.setState({
        hasInput: false 
      });
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
});


/** Define module API */
module.exports = {
  FormControl: FormControl,
  FormGroup: FormGroup
};


},{"../js/lib/util.js":3}],8:[function(require,module,exports){
/**
 * MUI React layout module
 * @module react/layout
 */

'use strict';

var containerClass = 'mui-container',
    fluidClass = 'mui-container-fluid',
    panelClass = 'mui-panel';


/**
 * Container constructor
 * @class
 */
var Container = React.createClass({displayName: "Container",
  render: function() {
    return (
      React.createElement("div", {className:  containerClass }, 
         this.props.children
      )
    );
  }
});


/**
 * FluidContainer constructor
 * @class
 */
var FluidContainer = React.createClass({displayName: "FluidContainer",
  render: function() {
    return (
      React.createElement("div", {className:  fluidClass }, 
         this.props.children
      )
    );
  }
});


/**
 * Panel constructor
 * @class
 */
var Panel = React.createClass({displayName: "Panel",
  render: function() {
    return (
      React.createElement("div", {className:  panelClass }, 
         this.props.children
      )
    );
  }
});


/** Define module API */
module.exports = {
  Container: Container,
  FluidContainer: FluidContainer,
  Panel: Panel
};


},{}],9:[function(require,module,exports){
/**
 * MUI React ripple module
 * @module react/ripple
 */

'use strict';

var jqLite = require('../js/lib/jqLite.js');

var rippleClass = 'mui-ripple-effect';


/**
 * Ripple singleton
 */
var Ripple = {
  getInitialState: function() {
    return {
      touchFlag: false,
      ripples: []
    };
  },
  getDefaultProps: function() {
    return {
      rippleClass: rippleClass
    };
  },
  ripple: function (ev) {
    // only left clicks
    if (ev.button !== 0) return;

    var buttonEl = React.findDOMNode(this);

    // exit if button is disabled
    if (this.props.disabled === true) return;

    // de-dupe touchstart and mousedown with 100msec flag
    if (this.state.touchFlag === true) {
      return;
    } else {
      this.setState({ touchFlag: true });
      setTimeout(function() {
        this.setState({ touchFlag: false });
      }.bind(this), 100);
    }

    var offset = jqLite.offset(buttonEl),
      xPos = ev.pageX - offset.left,
      yPos = ev.pageY - offset.top,
      diameter,
      radius;

    // get height
    if (this.props.floating) {
      diameter = offset.height / 2;
    } else {
      diameter = offset.height;
    }

    radius = diameter / 2;

    var style = {
      height: diameter,
      width: diameter,
      top: yPos - radius,
      left: xPos - radius
    };

    var ripples = this.state.ripples || [];
      
    window.setTimeout(function() {
      this._removeRipple();
    }.bind(this), 2000);

    ripples.push({ style: style });

    this.setState({
      ripples: ripples
    });
  },
  _removeRipple: function () {
    this.state.ripples.shift();
    this.setState({
      ripples: this.state.ripples
    });
  },
  renderRipples: function () {
    if (this.state.ripples.length === 0) return;

    var i = 0;
    return this.state.ripples.map(function (ripple) {
      i++;
      return (
        React.createElement("div", {
          className:  this.props.rippleClass, 
          key:  i, 
          style:  ripple.style}
        )
      );
    }.bind(this));
  }
};


/** Define module API */
module.exports = Ripple;

},{"../js/lib/jqLite.js":2}],10:[function(require,module,exports){
/**
 * MUI React tabs module
 * @module react/tabs
 */
/* jshint quotmark:false */
// jscs:disable validateQuoteMarks

'use strict';

var util = require('../js/lib/util.js');

var tabClass = 'mui-tabs',
    contentClass = 'mui-tab-content',
    paneClass = 'mui-tab-pane',
    justifiedClass = 'mui-tabs-justified',
    activeClass = 'mui-active';


/**
 * Tabs constructor
 * @class
 */
var Tabs = React.createClass({displayName: "Tabs",
  getDefaultProps: function() {
    return {
      justified: false
    };
  },
  getInitialState: function() {
    return {
      activeTab: ""
    };
  },
  componentDidMount: function() {
    if (this.props.activeTab) {
      this.setState({
        activeTab: this.props.activeTab
      });
    } else {
      this.setState({
        activeTab: this.props.children && this.props.children[0].props.id
      });
    }
  },
  render: function() {
    var items = this.props.children.map(function (item) {
      return {
        name: item.props.id,
        label: item.props.label,
        pane: item.props.children
      };
    });
    return (
      React.createElement("div", {className: "tabs"}, 
        React.createElement(TabHeaders, {
          items:  items, 
          justified:  this.props.justified, 
          active:  this.state.activeTab, 
          onClick:  this._changeTab}
        ), 
        React.createElement(TabContainers, {items:  items, active:  this.state.activeTab})
      )
    );
  },
  _changeTab: function (toWhich, e) {
    // only left clicks
    if (e.button !== 0) return;

    if (e.target.getAttribute('disabled') !== null) return;

    setTimeout(function () {
      if (!e.defaultPrevented) {
        this.setState({
          activeTab: toWhich
        });
      }
    }.bind(this), 0);
  }
});


/**
 * TabHeaders constructor
 * @class
 */
var TabHeaders = React.createClass({displayName: "TabHeaders",
  getDefaultProps: function() {
    return {
      items: []
    };
  },
  render: function() {
    var classes = {};
    classes[tabClass] = true;
    classes[justifiedClass] = this.props.justified;
    classes = util.classNames(classes);

    var items = this.props.items.map(function (item) {
      return (
        React.createElement(TabHeaderItem, {key:  item.name, 
          name:  item.name, 
          label:  item.label, 
          active:  item.name === this.props.active, 
          onClick:  this.props.onClick})
      );
    }.bind(this));
    return (
      React.createElement("ul", {className:  classes }, 
         items 
      )
    );
  }
});


/**
 * TabHeaderItem constructor
 * @class
 */
var TabHeaderItem = React.createClass({displayName: "TabHeaderItem",
  render: function () {
    var classes = {};
    classes[activeClass] = this.props.active;
    classes = util.classNames(classes);
    return (
      React.createElement("li", {className:  classes }, 
        React.createElement("a", {onClick:  this._click}, 
           this.props.label
        )
      )
    );
  },
  _click: function (e) {
    if (this.props.onClick) {
      this.props.onClick(this.props.name, e);
    }
  }
});


/**
 * TabContainers constructor
 * @class
 */
var TabContainers = React.createClass({displayName: "TabContainers",
  getDefaultProps: function() {
    return {
      items: []
    };
  },
  render: function() {
    var items = this.props.items.map(function (item) {
      return (
        React.createElement(TabPane, {key:  item.name, 
          active:  item.name === this.props.active}, 
           item.pane
        )
      );
    }.bind(this));
    return (
      React.createElement("div", {className:  contentClass }, 
         items 
      )
    );
  }
});


/**
 * TabPane constructor
 * @class
 */
var TabPane = React.createClass({displayName: "TabPane",
  render: function () {
    var classes = {};
    classes[paneClass] = true;
    classes[activeClass] = this.props.active;
    classes = util.classNames(classes);
    return (
      React.createElement("div", {className:  classes }, 
         this.props.children
      )
    );
  }
});


/**
 * TabItem constructor
 * @class
 */
var TabItem = React.createClass({displayName: "TabItem",
  render: function() {
    return null;
  }
});


/** Define module API */
module.exports = {
  Tabs: Tabs,
  TabItem: TabItem
};


},{"../js/lib/util.js":3}]},{},[6])