/*!
* Tippy.js v3.4.1
* (c) 2017-2019 atomiks
* MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('popper.js')) :
	typeof define === 'function' && define.amd ? define(['popper.js'], factory) :
	(global.tippy = factory(global.Popper));
}(this, (function (Popper) { 'use strict';

Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

var version = "3.4.1";

var isBrowser = typeof window !== 'undefined';

var nav = isBrowser ? navigator : {};
var win = isBrowser ? window : {};


var isIE = /MSIE |Trident\//.test(nav.userAgent);
var isIOS = /iPhone|iPad|iPod/.test(nav.platform) && !win.MSStream;
var supportsTouch = 'ontouchstart' in win;

var Defaults = {
  a11y: true,
  allowHTML: true,
  animateFill: true,
  animation: 'shift-away',
  appendTo: function appendTo() {
    return document.body;
  },
  aria: 'describedby',
  arrow: false,
  arrowTransform: '',
  arrowType: 'sharp',
  autoFocus: true,
  boundary: 'scrollParent',
  content: '',
  delay: [0, 20],
  distance: 10,
  duration: [325, 275],
  flip: true,
  flipBehavior: 'flip',
  followCursor: false,
  hideOnClick: true,
  inertia: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  lazy: true,
  livePlacement: true,
  maxWidth: '',
  multiple: false,
  offset: 0,
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},

  performance: false,
  placement: 'top',
  popperOptions: {},
  shouldPopperHideOnBlur: function shouldPopperHideOnBlur() {
    return true;
  },
  showOnInit: false,
  size: 'regular',
  sticky: false,
  target: '',
  theme: 'dark',
  touch: true,
  touchHold: false,
  trigger: 'mouseenter focus',
  updateDuration: 200,
  wait: null,
  zIndex: 9999

  /**
   * If the set() method encounters one of these, the popperInstance must be
   * recreated
   */
};var POPPER_INSTANCE_RELATED_PROPS = ['arrow', 'arrowType', 'distance', 'flip', 'flipBehavior', 'offset', 'placement', 'popperOptions'];

var Selectors = {
  POPPER: '.tippy-popper',
  TOOLTIP: '.tippy-tooltip',
  CONTENT: '.tippy-content',
  BACKDROP: '.tippy-backdrop',
  ARROW: '.tippy-arrow',
  ROUND_ARROW: '.tippy-roundarrow'
};

var elementProto = isBrowser ? Element.prototype : {};

var matches = elementProto.matches || elementProto.matchesSelector || elementProto.webkitMatchesSelector || elementProto.mozMatchesSelector || elementProto.msMatchesSelector;

/**
 * Ponyfill for Array.from - converts iterable values to an array
 * @param {Array-like} value
 * @return {Array}
 */
function arrayFrom(value) {
  return [].slice.call(value);
}

/**
 * Ponyfill for Element.prototype.closest
 * @param {Element} element
 * @param {String} parentSelector
 * @return {Element}
 */
function closest(element, parentSelector) {
  return (elementProto.closest || function (selector) {
    var el = this;
    while (el) {
      if (matches.call(el, selector)) return el;
      el = el.parentElement;
    }
  }).call(element, parentSelector);
}

/**
 * Works like Element.prototype.closest, but uses a callback instead
 * @param {Element} element
 * @param {Function} callback
 * @return {Element}
 */
function closestCallback(element, callback) {
  while (element) {
    if (callback(element)) return element;
    element = element.parentElement;
  }
}

var PASSIVE = { passive: true };
var FF_EXTENSION_TRICK = { x: true };

/**
 * Returns a new `div` element
 * @return {HTMLDivElement}
 */
function div() {
  return document.createElement('div');
}

/**
 * Sets the innerHTML of an element while tricking linters & minifiers
 * @param {HTMLElement} el
 * @param {Element|String} html
 */
function setInnerHTML(el, html) {
  el[FF_EXTENSION_TRICK.x && 'innerHTML'] = html instanceof Element ? html[FF_EXTENSION_TRICK.x && 'innerHTML'] : html;
}

/**
 * Sets the content of a tooltip
 * @param {HTMLElement} contentEl
 * @param {Object} props
 */
function setContent(contentEl, props) {
  if (props.content instanceof Element) {
    setInnerHTML(contentEl, '');
    contentEl.appendChild(props.content);
  } else {
    contentEl[props.allowHTML ? 'innerHTML' : 'textContent'] = props.content;
  }
}

/**
 * Returns the child elements of a popper element
 * @param {HTMLElement} popper
 */
function getChildren(popper) {
  return {
    tooltip: popper.querySelector(Selectors.TOOLTIP),
    backdrop: popper.querySelector(Selectors.BACKDROP),
    content: popper.querySelector(Selectors.CONTENT),
    arrow: popper.querySelector(Selectors.ARROW) || popper.querySelector(Selectors.ROUND_ARROW)
  };
}

/**
 * Adds `data-inertia` attribute
 * @param {HTMLElement} tooltip
 */
function addInertia(tooltip) {
  tooltip.setAttribute('data-inertia', '');
}

/**
 * Removes `data-inertia` attribute
 * @param {HTMLElement} tooltip
 */
function removeInertia(tooltip) {
  tooltip.removeAttribute('data-inertia');
}

/**
 * Creates an arrow element and returns it
 */
function createArrowElement(arrowType) {
  var arrow = div();
  if (arrowType === 'round') {
    arrow.className = 'tippy-roundarrow';
    setInnerHTML(arrow, '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>');
  } else {
    arrow.className = 'tippy-arrow';
  }
  return arrow;
}

/**
 * Creates a backdrop element and returns it
 */
function createBackdropElement() {
  var backdrop = div();
  backdrop.className = 'tippy-backdrop';
  backdrop.setAttribute('data-state', 'hidden');
  return backdrop;
}

/**
 * Adds interactive-related attributes
 * @param {HTMLElement} popper
 * @param {HTMLElement} tooltip
 */
function addInteractive(popper, tooltip) {
  popper.setAttribute('tabindex', '-1');
  tooltip.setAttribute('data-interactive', '');
}

/**
 * Removes interactive-related attributes
 * @param {HTMLElement} popper
 * @param {HTMLElement} tooltip
 */
function removeInteractive(popper, tooltip) {
  popper.removeAttribute('tabindex');
  tooltip.removeAttribute('data-interactive');
}

/**
 * Applies a transition duration to a list of elements
 * @param {Array} els
 * @param {Number} value
 */
function applyTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + 'ms';
    }
  });
}

/**
 * Add/remove transitionend listener from tooltip
 * @param {Element} tooltip
 * @param {String} action
 * @param {Function} listener
 */
function toggleTransitionEndListener(tooltip, action, listener) {
  tooltip[action + 'EventListener']('transitionend', listener);
}

/**
 * Returns the popper's placement, ignoring shifting (top-start, etc)
 * @param {Element} popper
 * @return {String}
 */
function getPopperPlacement(popper) {
  var fullPlacement = popper.getAttribute('x-placement');
  return fullPlacement ? fullPlacement.split('-')[0] : '';
}

/**
 * Sets the visibility state to elements so they can begin to transition
 * @param {Array} els
 * @param {String} state
 */
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}

/**
 * Triggers reflow
 * @param {Element} popper
 */
function reflow(popper) {
  void popper.offsetHeight;
}

/**
 * Constructs the popper element and returns it
 * @param {Number} id
 * @param {Object} props
 */
function createPopperElement(id, props) {
  var popper = div();
  popper.className = 'tippy-popper';
  popper.setAttribute('role', 'tooltip');
  popper.id = 'tippy-' + id;
  popper.style.zIndex = props.zIndex;

  var tooltip = div();
  tooltip.className = 'tippy-tooltip';
  tooltip.style.maxWidth = props.maxWidth + (typeof props.maxWidth === 'number' ? 'px' : '');
  tooltip.setAttribute('data-size', props.size);
  tooltip.setAttribute('data-animation', props.animation);
  tooltip.setAttribute('data-state', 'hidden');
  props.theme.split(' ').forEach(function (t) {
    tooltip.classList.add(t + '-theme');
  });

  var content = div();
  content.className = 'tippy-content';
  content.setAttribute('data-state', 'hidden');

  if (props.interactive) {
    addInteractive(popper, tooltip);
  }

  if (props.arrow) {
    tooltip.appendChild(createArrowElement(props.arrowType));
  }

  if (props.animateFill) {
    tooltip.appendChild(createBackdropElement());
    tooltip.setAttribute('data-animatefill', '');
  }

  if (props.inertia) {
    addInertia(tooltip);
  }

  setContent(content, props);

  tooltip.appendChild(content);
  popper.appendChild(tooltip);

  popper.addEventListener('focusout', function (e) {
    if (e.relatedTarget && popper._tippy && !closestCallback(e.relatedTarget, function (el) {
      return el === popper;
    }) && e.relatedTarget !== popper._tippy.reference && popper._tippy.props.shouldPopperHideOnBlur(e)) {
      popper._tippy.hide();
    }
  });

  return popper;
}

/**
 * Updates the popper element based on the new props
 * @param {HTMLElement} popper
 * @param {Object} prevProps
 * @param {Object} nextProps
 */
function updatePopperElement(popper, prevProps, nextProps) {
  var _getChildren = getChildren(popper),
      tooltip = _getChildren.tooltip,
      content = _getChildren.content,
      backdrop = _getChildren.backdrop,
      arrow = _getChildren.arrow;

  popper.style.zIndex = nextProps.zIndex;
  tooltip.setAttribute('data-size', nextProps.size);
  tooltip.setAttribute('data-animation', nextProps.animation);
  tooltip.style.maxWidth = nextProps.maxWidth + (typeof nextProps.maxWidth === 'number' ? 'px' : '');

  if (prevProps.content !== nextProps.content) {
    setContent(content, nextProps);
  }

  // animateFill
  if (!prevProps.animateFill && nextProps.animateFill) {
    tooltip.appendChild(createBackdropElement());
    tooltip.setAttribute('data-animatefill', '');
  } else if (prevProps.animateFill && !nextProps.animateFill) {
    tooltip.removeChild(backdrop);
    tooltip.removeAttribute('data-animatefill');
  }

  // arrow
  if (!prevProps.arrow && nextProps.arrow) {
    tooltip.appendChild(createArrowElement(nextProps.arrowType));
  } else if (prevProps.arrow && !nextProps.arrow) {
    tooltip.removeChild(arrow);
  }

  // arrowType
  if (prevProps.arrow && nextProps.arrow && prevProps.arrowType !== nextProps.arrowType) {
    tooltip.replaceChild(createArrowElement(nextProps.arrowType), arrow);
  }

  // interactive
  if (!prevProps.interactive && nextProps.interactive) {
    addInteractive(popper, tooltip);
  } else if (prevProps.interactive && !nextProps.interactive) {
    removeInteractive(popper, tooltip);
  }

  // inertia
  if (!prevProps.inertia && nextProps.inertia) {
    addInertia(tooltip);
  } else if (prevProps.inertia && !nextProps.inertia) {
    removeInertia(tooltip);
  }

  // theme
  if (prevProps.theme !== nextProps.theme) {
    prevProps.theme.split(' ').forEach(function (theme) {
      tooltip.classList.remove(theme + '-theme');
    });
    nextProps.theme.split(' ').forEach(function (theme) {
      tooltip.classList.add(theme + '-theme');
    });
  }
}

/**
 * Runs the callback after the popper's position has been updated
 * update() is debounced with Promise.resolve() or setTimeout()
 * scheduleUpdate() is update() wrapped in requestAnimationFrame()
 * @param {Popper} popperInstance
 * @param {Function} callback
 */
function afterPopperPositionUpdates(popperInstance, callback) {
  var popper = popperInstance.popper,
      options = popperInstance.options;
  var onCreate = options.onCreate,
      onUpdate = options.onUpdate;


  options.onCreate = options.onUpdate = function () {
    reflow(popper);
    callback();
    onUpdate();
    options.onCreate = onCreate;
    options.onUpdate = onUpdate;
  };
}

/**
 * Hides all visible poppers on the document, optionally excluding one
 * @param {Tippy} tippyInstanceToExclude
 */
function hideAllPoppers(tippyInstanceToExclude) {
  arrayFrom(document.querySelectorAll(Selectors.POPPER)).forEach(function (popper) {
    var tip = popper._tippy;
    if (tip && tip.props.hideOnClick === true && (!tippyInstanceToExclude || popper !== tippyInstanceToExclude.popper)) {
      tip.hide();
    }
  });
}

/**
 * Determines if the mouse cursor is outside of the popper's interactive border
 * region
 * @param {String} popperPlacement
 * @param {Object} popperRect
 * @param {MouseEvent} event
 * @param {Object} props
 */
function isCursorOutsideInteractiveBorder(popperPlacement, popperRect, event, props) {
  if (!popperPlacement) {
    return true;
  }

  var x = event.clientX,
      y = event.clientY;
  var interactiveBorder = props.interactiveBorder,
      distance = props.distance;


  var exceedsTop = popperRect.top - y > (popperPlacement === 'top' ? interactiveBorder + distance : interactiveBorder);

  var exceedsBottom = y - popperRect.bottom > (popperPlacement === 'bottom' ? interactiveBorder + distance : interactiveBorder);

  var exceedsLeft = popperRect.left - x > (popperPlacement === 'left' ? interactiveBorder + distance : interactiveBorder);

  var exceedsRight = x - popperRect.right > (popperPlacement === 'right' ? interactiveBorder + distance : interactiveBorder);

  return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
}

/**
 * Returns the distance offset, taking into account the default offset due to
 * the transform: translate() rule in CSS
 * @param {Number} distance
 * @param {Number} defaultDistance
 */
function getOffsetDistanceInPx(distance, defaultDistance) {
  return -(distance - defaultDistance) + 'px';
}

/**
 * Determines if a value is a plain object
 * @param {any} value
 * @return {Boolean}
 */
function isPlainObject(value) {
  return {}.toString.call(value) === '[object Object]';
}

/**
 * Safe .hasOwnProperty check, for prototype-less objects
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Determines if a value is numeric
 * @param {any} value
 * @return {Boolean}
 */
function isNumeric(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Returns an array of elements based on the value
 * @param {any} value
 * @return {Array}
 */
function getArrayOfElements(value) {
  if (value instanceof Element || isPlainObject(value)) {
    return [value];
  }
  if (value instanceof NodeList) {
    return arrayFrom(value);
  }
  if (Array.isArray(value)) {
    return value;
  }

  try {
    return arrayFrom(document.querySelectorAll(value));
  } catch (e) {
    return [];
  }
}

/**
 * Returns a value at a given index depending on if it's an array or number
 * @param {any} value
 * @param {Number} index
 * @param {any} defaultValue
 */
function getValue(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? defaultValue : v;
  }
  return value;
}

/**
 * Focuses an element while preventing a scroll jump if it's not within the
 * viewport
 * @param {Element} el
 */
function focus(el) {
  var x = window.scrollX || window.pageXOffset;
  var y = window.scrollY || window.pageYOffset;
  el.focus();
  scroll(x, y);
}

/**
 * Defers a function's execution until the call stack has cleared
 * @param {Function} fn
 */
function defer(fn) {
  setTimeout(fn, 1);
}

/**
 * Debounce utility
 * @param {Function} fn
 * @param {Number} ms
 */
function debounce(fn, ms) {
  var timeoutId = void 0;
  return function () {
    var _this = this,
        _arguments = arguments;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      return fn.apply(_this, _arguments);
    }, ms);
  };
}

/**
 * Prevents errors from being thrown while accessing nested modifier objects
 * in `popperOptions`
 * @param {Object} obj
 * @param {String} key
 * @return {Object|undefined}
 */
function getModifier(obj, key) {
  return obj && obj.modifiers && obj.modifiers[key];
}

/**
 * Determines if an array or string includes a value
 * @param {Array|String} a
 * @param {any} b
 * @return {Boolean}
 */
function includes(a, b) {
  return a.indexOf(b) > -1;
}

var isUsingTouch = false;

function onDocumentTouch() {
  if (isUsingTouch) {
    return;
  }

  isUsingTouch = true;

  if (isIOS) {
    document.body.classList.add('tippy-iOS');
  }

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}

var lastMouseMoveTime = 0;
function onDocumentMouseMove() {
  var now = performance.now();

  // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
  if (now - lastMouseMoveTime < 20) {
    isUsingTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
    if (!isIOS) {
      document.body.classList.remove('tippy-iOS');
    }
  }

  lastMouseMoveTime = now;
}

function onDocumentClick(_ref) {
  var target = _ref.target;

  // Simulated events dispatched on the document
  if (!(target instanceof Element)) {
    return hideAllPoppers();
  }

  // Clicked on an interactive popper
  var popper = closest(target, Selectors.POPPER);
  if (popper && popper._tippy && popper._tippy.props.interactive) {
    return;
  }

  // Clicked on a reference
  var reference = closestCallback(target, function (el) {
    return el._tippy && el._tippy.reference === el;
  });
  if (reference) {
    var tip = reference._tippy;
    var isClickTrigger = includes(tip.props.trigger, 'click');

    if (isUsingTouch || isClickTrigger) {
      return hideAllPoppers(tip);
    }

    if (tip.props.hideOnClick !== true || isClickTrigger) {
      return;
    }

    tip.clearDelayTimeouts();
  }

  hideAllPoppers();
}

function onWindowBlur() {
  var _document = document,
      activeElement = _document.activeElement;

  if (activeElement && activeElement.blur && activeElement._tippy) {
    activeElement.blur();
  }
}

function onWindowResize() {
  arrayFrom(document.querySelectorAll(Selectors.POPPER)).forEach(function (popper) {
    var tippyInstance = popper._tippy;
    if (!tippyInstance.props.livePlacement) {
      tippyInstance.popperInstance.scheduleUpdate();
    }
  });
}

/**
 * Adds the needed global event listeners
 */
function bindGlobalEventListeners() {
  document.addEventListener('click', onDocumentClick, true);
  document.addEventListener('touchstart', onDocumentTouch, PASSIVE);
  window.addEventListener('blur', onWindowBlur);
  window.addEventListener('resize', onWindowResize);

  if (!supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints)) {
    document.addEventListener('pointerdown', onDocumentTouch);
  }
}

var keys = Object.keys(Defaults);

/**
 * Determines if an element can receive focus
 * @param {Element} el
 * @return {Boolean}
 */
function canReceiveFocus(el) {
  return el instanceof Element ? matches.call(el, 'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]') && !el.hasAttribute('disabled') : true;
}

/**
 * Returns an object of optional props from data-tippy-* attributes
 * @param {Element} reference
 * @return {Object}
 */
function getDataAttributeOptions(reference) {
  return keys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute('data-tippy-' + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else if (valueAsString === 'true') {
      acc[key] = true;
    } else if (valueAsString === 'false') {
      acc[key] = false;
    } else if (isNumeric(valueAsString)) {
      acc[key] = Number(valueAsString);
    } else if (valueAsString[0] === '[' || valueAsString[0] === '{') {
      acc[key] = JSON.parse(valueAsString);
    } else {
      acc[key] = valueAsString;
    }

    return acc;
  }, {});
}

/**
 * Polyfills the virtual reference (plain object) with Element.prototype props
 * Mutating because DOM elements are mutated, adds `_tippy` property
 * @param {Object} virtualReference
 * @return {Object}
 */
function polyfillElementPrototypeProperties(virtualReference) {
  var polyfills = {
    isVirtual: true,
    attributes: virtualReference.attributes || {},
    setAttribute: function setAttribute(key, value) {
      virtualReference.attributes[key] = value;
    },
    getAttribute: function getAttribute(key) {
      return virtualReference.attributes[key];
    },
    removeAttribute: function removeAttribute(key) {
      delete virtualReference.attributes[key];
    },
    hasAttribute: function hasAttribute(key) {
      return key in virtualReference.attributes;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},

    classList: {
      classNames: {},
      add: function add(key) {
        virtualReference.classList.classNames[key] = true;
      },
      remove: function remove(key) {
        delete virtualReference.classList.classNames[key];
      },
      contains: function contains(key) {
        return key in virtualReference.classList.classNames;
      }
    }
  };

  for (var key in polyfills) {
    virtualReference[key] = polyfills[key];
  }
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Evaluates the props object
 * @param {Element} reference
 * @param {Object} props
 * @return {Object}
 */
function evaluateProps(reference, props) {
  var out = _extends({}, props, props.performance ? {} : getDataAttributeOptions(reference));

  if (out.arrow) {
    out.animateFill = false;
  }

  if (typeof out.appendTo === 'function') {
    out.appendTo = props.appendTo(reference);
  }

  if (typeof out.content === 'function') {
    out.content = props.content(reference);
  }

  return out;
}

/**
 * Validates an object of options with the valid default props object
 * @param {Object} options
 * @param {Object} defaults
 */
function validateOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults$$1 = arguments[1];

  Object.keys(options).forEach(function (option) {
    if (!hasOwnProperty(defaults$$1, option)) {
      throw new Error('[tippy]: `' + option + '` is not a valid option');
    }
  });
}

// =============================================================================
// DEPRECATED
// All of this code (for the `arrowTransform` option) will be removed in v4
// =============================================================================
var TRANSFORM_NUMBER_RE = {
  translate: /translateX?Y?\(([^)]+)\)/,
  scale: /scaleX?Y?\(([^)]+)\)/

  /**
   * Transforms the x/y axis based on the placement
   */
};function transformAxisBasedOnPlacement(axis, isVertical) {
  return (isVertical ? axis : {
    X: 'Y',
    Y: 'X'
  }[axis]) || '';
}

/**
 * Transforms the scale/translate numbers based on the placement
 */
function transformNumbersBasedOnPlacement(type, numbers, isVertical, isReverse) {
  /**
   * Avoid destructuring because a large boilerplate function is generated
   * by Babel
   */
  var a = numbers[0];
  var b = numbers[1];

  if (!a && !b) {
    return '';
  }

  var transforms = {
    scale: function () {
      if (!b) {
        return '' + a;
      } else {
        return isVertical ? a + ', ' + b : b + ', ' + a;
      }
    }(),
    translate: function () {
      if (!b) {
        return isReverse ? -a + 'px' : a + 'px';
      } else {
        if (isVertical) {
          return isReverse ? a + 'px, ' + -b + 'px' : a + 'px, ' + b + 'px';
        } else {
          return isReverse ? -b + 'px, ' + a + 'px' : b + 'px, ' + a + 'px';
        }
      }
    }()
  };

  return transforms[type];
}

/**
 * Returns the axis for a CSS function (translate or scale)
 */
function getTransformAxis(str, cssFunction) {
  var match = str.match(new RegExp(cssFunction + '([XY])'));
  return match ? match[1] : '';
}

/**
 * Returns the numbers given to the CSS function
 */
function getTransformNumbers(str, regex) {
  var match = str.match(regex);
  return match ? match[1].split(',').map(function (n) {
    return parseFloat(n, 10);
  }) : [];
}

/**
 * Computes the arrow's transform so that it is correct for any placement
 */
function computeArrowTransform(arrow, arrowTransform) {
  var placement = getPopperPlacement(closest(arrow, Selectors.POPPER));
  var isVertical = includes(['top', 'bottom'], placement);
  var isReverse = includes(['right', 'bottom'], placement);

  var matches$$1 = {
    translate: {
      axis: getTransformAxis(arrowTransform, 'translate'),
      numbers: getTransformNumbers(arrowTransform, TRANSFORM_NUMBER_RE.translate)
    },
    scale: {
      axis: getTransformAxis(arrowTransform, 'scale'),
      numbers: getTransformNumbers(arrowTransform, TRANSFORM_NUMBER_RE.scale)
    }
  };

  var computedTransform = arrowTransform.replace(TRANSFORM_NUMBER_RE.translate, 'translate' + transformAxisBasedOnPlacement(matches$$1.translate.axis, isVertical) + '(' + transformNumbersBasedOnPlacement('translate', matches$$1.translate.numbers, isVertical, isReverse) + ')').replace(TRANSFORM_NUMBER_RE.scale, 'scale' + transformAxisBasedOnPlacement(matches$$1.scale.axis, isVertical) + '(' + transformNumbersBasedOnPlacement('scale', matches$$1.scale.numbers, isVertical, isReverse) + ')');

  arrow.style[typeof document.body.style.transform !== 'undefined' ? 'transform' : 'webkitTransform'] = computedTransform;
}

var idCounter = 1;

/**
 * Creates and returns a Tippy object. We're using a closure pattern instead of
 * a class so that the exposed object API is clean without private members
 * prefixed with `_`.
 * @param {Element} reference
 * @param {Object} collectionProps
 * @return {Object} instance
 */
function createTippy(reference, collectionProps) {
  var props = evaluateProps(reference, collectionProps);

  // If the reference shouldn't have multiple tippys, return null early
  if (!props.multiple && reference._tippy) {
    return null;
  }

  /* ======================= 🔒 Private members 🔒 ======================= */
  // The popper element's mutation observer
  var popperMutationObserver = null;

  // The last trigger event object that caused the tippy to show
  var lastTriggerEvent = {};

  // The last mousemove event object created by the document mousemove event
  var lastMouseMoveEvent = null;

  // Timeout created by the show delay
  var showTimeoutId = 0;

  // Timeout created by the hide delay
  var hideTimeoutId = 0;

  // Flag to determine if the tippy is preparing to show due to the show timeout
  var isPreparingToShow = false;

  // The current `transitionend` callback reference
  var transitionEndListener = function transitionEndListener() {};

  // Array of event listeners currently attached to the reference element
  var listeners = [];

  // Flag to determine if the reference was recently programmatically focused
  var referenceJustProgrammaticallyFocused = false;

  // Private onMouseMove handler reference, debounced or not
  var debouncedOnMouseMove = props.interactiveDebounce > 0 ? debounce(onMouseMove, props.interactiveDebounce) : onMouseMove;

  /* ======================= 🔑 Public members 🔑 ======================= */
  // id used for the `aria-describedby` / `aria-labelledby` attribute
  var id = idCounter++;

  // Popper element reference
  var popper = createPopperElement(id, props);

  // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding
  popper.addEventListener('mouseenter', function (event) {
    if (tip.props.interactive && tip.state.isVisible && lastTriggerEvent.type === 'mouseenter') {
      prepareShow(event);
    }
  });
  popper.addEventListener('mouseleave', function (event) {
    if (tip.props.interactive && lastTriggerEvent.type === 'mouseenter' && tip.props.interactiveDebounce === 0 && isCursorOutsideInteractiveBorder(getPopperPlacement(popper), popper.getBoundingClientRect(), event, tip.props)) {
      prepareHide();
    }
  });

  // Popper element children: { arrow, backdrop, content, tooltip }
  var popperChildren = getChildren(popper);

  // The state of the tippy
  var state = {
    // If the tippy is currently enabled
    isEnabled: true,
    // show() invoked, not currently transitioning out
    isVisible: false,
    // If the tippy has been destroyed
    isDestroyed: false,
    // If the tippy is on the DOM (transitioning out or in)
    isMounted: false,
    // show() transition finished
    isShown: false

    // Popper.js instance for the tippy is lazily created
  };var popperInstance = null;

  // 🌟 tippy instance
  var tip = {
    // properties
    id: id,
    reference: reference,
    popper: popper,
    popperChildren: popperChildren,
    popperInstance: popperInstance,
    props: props,
    state: state,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    set: set$$1,
    setContent: setContent$$1,
    show: show,
    hide: hide,
    enable: enable,
    disable: disable,
    destroy: destroy
  };

  addTriggersToReference();

  reference.addEventListener('click', onReferenceClick);

  if (!props.lazy) {
    tip.popperInstance = createPopperInstance();
    tip.popperInstance.disableEventListeners();
  }

  if (props.showOnInit) {
    prepareShow();
  }

  // Ensure the reference element can receive focus (and is not a delegate)
  if (props.a11y && !props.target && !canReceiveFocus(reference)) {
    reference.setAttribute('tabindex', '0');
  }

  // Install shortcuts
  reference._tippy = tip;
  popper._tippy = tip;

  return tip;

  /* ======================= 🔒 Private methods 🔒 ======================= */
  /**
   * If the reference was clicked, it also receives focus
   */
  function onReferenceClick() {
    defer(function () {
      referenceJustProgrammaticallyFocused = false;
    });
  }

  /**
   * Ensure the popper's position stays correct if its dimensions change. Use
   * update() over .scheduleUpdate() so there is no 1 frame flash due to
   * async update
   */
  function addMutationObserver() {
    popperMutationObserver = new MutationObserver(function () {
      tip.popperInstance.update();
    });
    popperMutationObserver.observe(popper, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /**
   * Positions the virtual reference near the mouse cursor
   */
  function positionVirtualReferenceNearCursor(event) {
    var _lastMouseMoveEvent = lastMouseMoveEvent = event,
        clientX = _lastMouseMoveEvent.clientX,
        clientY = _lastMouseMoveEvent.clientY;

    if (!tip.popperInstance) {
      return;
    }

    // Ensure virtual reference is padded by 5px to prevent tooltip from
    // overflowing. Maybe Popper.js issue?
    var placement = getPopperPlacement(tip.popper);
    var padding = tip.popperChildren.arrow ? 20 : 5;
    var isVerticalPlacement = includes(['top', 'bottom'], placement);
    var isHorizontalPlacement = includes(['left', 'right'], placement);

    // Top / left boundary
    var x = isVerticalPlacement ? Math.max(padding, clientX) : clientX;
    var y = isHorizontalPlacement ? Math.max(padding, clientY) : clientY;

    // Bottom / right boundary
    if (isVerticalPlacement && x > padding) {
      x = Math.min(clientX, window.innerWidth - padding);
    }
    if (isHorizontalPlacement && y > padding) {
      y = Math.min(clientY, window.innerHeight - padding);
    }

    var rect = tip.reference.getBoundingClientRect();
    var followCursor = tip.props.followCursor;

    var isHorizontal = followCursor === 'horizontal';
    var isVertical = followCursor === 'vertical';

    tip.popperInstance.reference = {
      getBoundingClientRect: function getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          top: isHorizontal ? rect.top : y,
          bottom: isHorizontal ? rect.bottom : y,
          left: isVertical ? rect.left : x,
          right: isVertical ? rect.right : x
        };
      },
      clientWidth: 0,
      clientHeight: 0
    };

    tip.popperInstance.scheduleUpdate();

    if (followCursor === 'initial' && tip.state.isVisible) {
      removeFollowCursorListener();
    }
  }

  /**
   * Creates the tippy instance for a delegate when it's been triggered
   */
  function createDelegateChildTippy(event) {
    var targetEl = closest(event.target, tip.props.target);
    if (targetEl && !targetEl._tippy) {
      createTippy(targetEl, _extends({}, tip.props, {
        target: '',
        showOnInit: true
      }));
      prepareShow(event);
    }
  }

  /**
   * Setup before show() is invoked (delays, etc.)
   */
  function prepareShow(event) {
    clearDelayTimeouts();

    if (tip.state.isVisible) {
      return;
    }

    // Is a delegate, create an instance for the child target
    if (tip.props.target) {
      return createDelegateChildTippy(event);
    }

    isPreparingToShow = true;

    if (tip.props.wait) {
      return tip.props.wait(tip, event);
    }

    // If the tooltip has a delay, we need to be listening to the mousemove as
    // soon as the trigger event is fired, so that it's in the correct position
    // upon mount.
    // Edge case: if the tooltip is still mounted, but then prepareShow() is
    // called, it causes a jump.
    if (hasFollowCursorBehavior() && !tip.state.isMounted) {
      document.addEventListener('mousemove', positionVirtualReferenceNearCursor);
    }

    var delay = getValue(tip.props.delay, 0, Defaults.delay);

    if (delay) {
      showTimeoutId = setTimeout(function () {
        show();
      }, delay);
    } else {
      show();
    }
  }

  /**
   * Setup before hide() is invoked (delays, etc.)
   */
  function prepareHide() {
    clearDelayTimeouts();

    if (!tip.state.isVisible) {
      return removeFollowCursorListener();
    }

    isPreparingToShow = false;

    var delay = getValue(tip.props.delay, 1, Defaults.delay);

    if (delay) {
      hideTimeoutId = setTimeout(function () {
        if (tip.state.isVisible) {
          hide();
        }
      }, delay);
    } else {
      hide();
    }
  }

  /**
   * Removes the follow cursor listener
   */
  function removeFollowCursorListener() {
    document.removeEventListener('mousemove', positionVirtualReferenceNearCursor);
    lastMouseMoveEvent = null;
  }

  /**
   * Cleans up old listeners
   */
  function cleanupOldMouseListeners() {
    document.body.removeEventListener('mouseleave', prepareHide);
    document.removeEventListener('mousemove', debouncedOnMouseMove);
  }

  /**
   * Event listener invoked upon trigger
   */
  function onTrigger(event) {
    if (!tip.state.isEnabled || isEventListenerStopped(event)) {
      return;
    }

    if (!tip.state.isVisible) {
      lastTriggerEvent = event;
    }

    // Toggle show/hide when clicking click-triggered tooltips
    if (event.type === 'click' && tip.props.hideOnClick !== false && tip.state.isVisible) {
      prepareHide();
    } else {
      prepareShow(event);
    }
  }

  /**
   * Event listener used for interactive tooltips to detect when they should
   * hide
   */
  function onMouseMove(event) {
    var referenceTheCursorIsOver = closestCallback(event.target, function (el) {
      return el._tippy;
    });

    var isCursorOverPopper = closest(event.target, Selectors.POPPER) === tip.popper;
    var isCursorOverReference = referenceTheCursorIsOver === tip.reference;

    if (isCursorOverPopper || isCursorOverReference) {
      return;
    }

    if (isCursorOutsideInteractiveBorder(getPopperPlacement(tip.popper), tip.popper.getBoundingClientRect(), event, tip.props)) {
      cleanupOldMouseListeners();
      prepareHide();
    }
  }

  /**
   * Event listener invoked upon mouseleave
   */
  function onMouseLeave(event) {
    if (isEventListenerStopped(event)) {
      return;
    }

    if (tip.props.interactive) {
      document.body.addEventListener('mouseleave', prepareHide);
      document.addEventListener('mousemove', debouncedOnMouseMove);
      return;
    }

    prepareHide();
  }

  /**
   * Event listener invoked upon blur
   */
  function onBlur(event) {
    if (event.target !== tip.reference) {
      return;
    }

    if (tip.props.interactive) {
      if (!event.relatedTarget) {
        return;
      }
      if (closest(event.relatedTarget, Selectors.POPPER)) {
        return;
      }
    }

    prepareHide();
  }

  /**
   * Event listener invoked when a child target is triggered
   */
  function onDelegateShow(event) {
    if (closest(event.target, tip.props.target)) {
      prepareShow(event);
    }
  }

  /**
   * Event listener invoked when a child target should hide
   */
  function onDelegateHide(event) {
    if (closest(event.target, tip.props.target)) {
      prepareHide();
    }
  }

  /**
   * Determines if an event listener should stop further execution due to the
   * `touchHold` option
   */
  function isEventListenerStopped(event) {
    var isTouchEvent = includes(event.type, 'touch');
    var caseA = supportsTouch && isUsingTouch && tip.props.touchHold && !isTouchEvent;
    var caseB = isUsingTouch && !tip.props.touchHold && isTouchEvent;
    return caseA || caseB;
  }

  /**
   * Creates the popper instance for the tip
   */
  function createPopperInstance() {
    var popperOptions = tip.props.popperOptions;
    var _tip$popperChildren = tip.popperChildren,
        tooltip = _tip$popperChildren.tooltip,
        arrow = _tip$popperChildren.arrow;


    return new Popper(tip.reference, tip.popper, _extends({
      placement: tip.props.placement
    }, popperOptions, {
      modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
        preventOverflow: _extends({
          boundariesElement: tip.props.boundary
        }, getModifier(popperOptions, 'preventOverflow')),
        arrow: _extends({
          element: arrow,
          enabled: !!arrow
        }, getModifier(popperOptions, 'arrow')),
        flip: _extends({
          enabled: tip.props.flip,
          padding: tip.props.distance + 5 /* 5px from viewport boundary */
          , behavior: tip.props.flipBehavior
        }, getModifier(popperOptions, 'flip')),
        offset: _extends({
          offset: tip.props.offset
        }, getModifier(popperOptions, 'offset'))
      }),
      onCreate: function onCreate() {
        tooltip.style[getPopperPlacement(tip.popper)] = getOffsetDistanceInPx(tip.props.distance, Defaults.distance);

        if (arrow && tip.props.arrowTransform) {
          computeArrowTransform(arrow, tip.props.arrowTransform);
        }
      },
      onUpdate: function onUpdate() {
        var styles = tooltip.style;
        styles.top = '';
        styles.bottom = '';
        styles.left = '';
        styles.right = '';
        styles[getPopperPlacement(tip.popper)] = getOffsetDistanceInPx(tip.props.distance, Defaults.distance);

        if (arrow && tip.props.arrowTransform) {
          computeArrowTransform(arrow, tip.props.arrowTransform);
        }
      }
    }));
  }

  /**
   * Mounts the tooltip to the DOM, callback to show tooltip is run **after**
   * popper's position has updated
   */
  function mount(callback) {
    if (!tip.popperInstance) {
      tip.popperInstance = createPopperInstance();
      addMutationObserver();
      if (!tip.props.livePlacement || hasFollowCursorBehavior()) {
        tip.popperInstance.disableEventListeners();
      }
    } else {
      if (!hasFollowCursorBehavior()) {
        tip.popperInstance.scheduleUpdate();
        if (tip.props.livePlacement) {
          tip.popperInstance.enableEventListeners();
        }
      }
    }

    // If the instance previously had followCursor behavior, it will be
    // positioned incorrectly if triggered by `focus` afterwards.
    // Update the reference back to the real DOM element
    tip.popperInstance.reference = tip.reference;
    var arrow = tip.popperChildren.arrow;


    if (hasFollowCursorBehavior()) {
      if (arrow) {
        arrow.style.margin = '0';
      }
      var delay = getValue(tip.props.delay, 0, Defaults.delay);
      if (lastTriggerEvent.type) {
        positionVirtualReferenceNearCursor(delay && lastMouseMoveEvent ? lastMouseMoveEvent : lastTriggerEvent);
      }
    } else if (arrow) {
      arrow.style.margin = '';
    }

    afterPopperPositionUpdates(tip.popperInstance, callback);

    if (!tip.props.appendTo.contains(tip.popper)) {
      tip.props.appendTo.appendChild(tip.popper);
      tip.props.onMount(tip);
      tip.state.isMounted = true;
    }
  }

  /**
   * Determines if the instance is in `followCursor` mode
   */
  function hasFollowCursorBehavior() {
    return tip.props.followCursor && !isUsingTouch && lastTriggerEvent.type !== 'focus';
  }

  /**
   * Updates the tooltip's position on each animation frame + timeout
   */
  function makeSticky() {
    applyTransitionDuration([tip.popper], isIE ? 0 : tip.props.updateDuration);

    var updatePosition = function updatePosition() {
      if (tip.popperInstance) {
        tip.popperInstance.scheduleUpdate();
      }

      if (tip.state.isMounted) {
        requestAnimationFrame(updatePosition);
      } else {
        applyTransitionDuration([tip.popper], 0);
      }
    };

    updatePosition();
  }

  /**
   * Invokes a callback once the tooltip has fully transitioned out
   */
  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!tip.state.isVisible && tip.props.appendTo.contains(tip.popper)) {
        callback();
      }
    });
  }

  /**
   * Invokes a callback once the tooltip has fully transitioned in
   */
  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  /**
   * Invokes a callback once the tooltip's CSS transition ends
   */
  function onTransitionEnd(duration, callback) {
    // Make callback synchronous if duration is 0
    if (duration === 0) {
      return callback();
    }

    var tooltip = tip.popperChildren.tooltip;


    var listener = function listener(e) {
      if (e.target === tooltip) {
        toggleTransitionEndListener(tooltip, 'remove', listener);
        callback();
      }
    };

    toggleTransitionEndListener(tooltip, 'remove', transitionEndListener);
    toggleTransitionEndListener(tooltip, 'add', listener);

    transitionEndListener = listener;
  }

  /**
   * Adds an event listener to the reference and stores it in `listeners`
   */
  function on(eventType, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    tip.reference.addEventListener(eventType, handler, options);
    listeners.push({ eventType: eventType, handler: handler, options: options });
  }

  /**
   * Adds event listeners to the reference based on the `trigger` prop
   */
  function addTriggersToReference() {
    if (tip.props.touchHold && !tip.props.target) {
      on('touchstart', onTrigger, PASSIVE);
      on('touchend', onMouseLeave, PASSIVE);
    }

    tip.props.trigger.trim().split(' ').forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      if (!tip.props.target) {
        on(eventType, onTrigger);
        switch (eventType) {
          case 'mouseenter':
            on('mouseleave', onMouseLeave);
            break;
          case 'focus':
            on(isIE ? 'focusout' : 'blur', onBlur);
            break;
        }
      } else {
        switch (eventType) {
          case 'mouseenter':
            on('mouseover', onDelegateShow);
            on('mouseout', onDelegateHide);
            break;
          case 'focus':
            on('focusin', onDelegateShow);
            on('focusout', onDelegateHide);
            break;
          case 'click':
            on(eventType, onDelegateShow);
            break;
        }
      }
    });
  }

  /**
   * Removes event listeners from the reference
   */
  function removeTriggersFromReference() {
    listeners.forEach(function (_ref) {
      var eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;

      tip.reference.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  /* ======================= 🔑 Public methods 🔑 ======================= */
  /**
   * Enables the instance to allow it to show or hide
   */
  function enable() {
    tip.state.isEnabled = true;
  }

  /**
   * Disables the instance to disallow it to show or hide
   */
  function disable() {
    tip.state.isEnabled = false;
  }

  /**
   * Clears pending timeouts related to the `delay` prop if any
   */
  function clearDelayTimeouts() {
    clearTimeout(showTimeoutId);
    clearTimeout(hideTimeoutId);
  }

  /**
   * Sets new props for the instance and redraws the tooltip
   */
  function set$$1() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    validateOptions(options, Defaults);

    var prevProps = tip.props;
    var nextProps = evaluateProps(tip.reference, _extends({}, tip.props, options, {
      performance: true
    }));
    nextProps.performance = hasOwnProperty(options, 'performance') ? options.performance : prevProps.performance;
    tip.props = nextProps;

    if (hasOwnProperty(options, 'trigger') || hasOwnProperty(options, 'touchHold')) {
      removeTriggersFromReference();
      addTriggersToReference();
    }

    if (hasOwnProperty(options, 'interactiveDebounce')) {
      cleanupOldMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, options.interactiveDebounce);
    }

    updatePopperElement(tip.popper, prevProps, nextProps);
    tip.popperChildren = getChildren(tip.popper);

    if (tip.popperInstance && POPPER_INSTANCE_RELATED_PROPS.some(function (prop) {
      return hasOwnProperty(options, prop);
    })) {
      tip.popperInstance.destroy();
      tip.popperInstance = createPopperInstance();
      if (!tip.state.isVisible) {
        tip.popperInstance.disableEventListeners();
      }
      if (tip.props.followCursor && lastMouseMoveEvent) {
        positionVirtualReferenceNearCursor(lastMouseMoveEvent);
      }
    }
  }

  /**
   * Shortcut for .set({ content: newContent })
   */
  function setContent$$1(content) {
    set$$1({ content: content });
  }

  /**
   * Shows the tooltip
   */
  function show() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getValue(tip.props.duration, 0, Defaults.duration[0]);

    if (tip.state.isDestroyed || !tip.state.isEnabled || isUsingTouch && !tip.props.touch) {
      return;
    }

    // Destroy tooltip if the reference element is no longer on the DOM
    if (!tip.reference.isVirtual && !document.documentElement.contains(tip.reference)) {
      return destroy();
    }

    // Do not show tooltip if the reference element has a `disabled` attribute
    if (tip.reference.hasAttribute('disabled')) {
      return;
    }

    // If the reference was just programmatically focused for accessibility
    // reasons
    if (referenceJustProgrammaticallyFocused) {
      referenceJustProgrammaticallyFocused = false;
      return;
    }

    if (tip.props.onShow(tip) === false) {
      return;
    }

    tip.popper.style.visibility = 'visible';
    tip.state.isVisible = true;

    // Prevent a transition if the popper is at the opposite placement
    applyTransitionDuration([tip.popper, tip.popperChildren.tooltip, tip.popperChildren.backdrop], 0);

    mount(function () {
      if (!tip.state.isVisible) {
        return;
      }

      // Arrow will sometimes not be positioned correctly. Force another update
      if (!hasFollowCursorBehavior()) {
        tip.popperInstance.update();
      }

      applyTransitionDuration([tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content], duration);
      if (tip.popperChildren.backdrop) {
        tip.popperChildren.content.style.transitionDelay = Math.round(duration / 6) + 'ms';
      }

      if (tip.props.interactive) {
        tip.reference.classList.add('tippy-active');
      }

      if (tip.props.sticky) {
        makeSticky();
      }

      setVisibilityState([tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content], 'visible');

      onTransitionedIn(duration, function () {
        if (tip.props.updateDuration === 0) {
          tip.popperChildren.tooltip.classList.add('tippy-notransition');
        }

        if (tip.props.autoFocus && tip.props.interactive && includes(['focus', 'click'], lastTriggerEvent.type)) {
          focus(tip.popper);
        }

        if (tip.props.aria) {
          tip.reference.setAttribute('aria-' + tip.props.aria, tip.popper.id);
        }

        tip.props.onShown(tip);
        tip.state.isShown = true;
      });
    });
  }

  /**
   * Hides the tooltip
   */
  function hide() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getValue(tip.props.duration, 1, Defaults.duration[1]);

    if (tip.state.isDestroyed || !tip.state.isEnabled) {
      return;
    }

    if (tip.props.onHide(tip) === false) {
      return;
    }

    if (tip.props.updateDuration === 0) {
      tip.popperChildren.tooltip.classList.remove('tippy-notransition');
    }

    if (tip.props.interactive) {
      tip.reference.classList.remove('tippy-active');
    }

    tip.popper.style.visibility = 'hidden';
    tip.state.isVisible = false;
    tip.state.isShown = false;

    applyTransitionDuration([tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content], duration);

    setVisibilityState([tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content], 'hidden');

    if (tip.props.autoFocus && tip.props.interactive && !referenceJustProgrammaticallyFocused && includes(['focus', 'click'], lastTriggerEvent.type)) {
      if (lastTriggerEvent.type === 'focus') {
        referenceJustProgrammaticallyFocused = true;
      }
      focus(tip.reference);
    }

    onTransitionedOut(duration, function () {
      if (!isPreparingToShow) {
        removeFollowCursorListener();
      }

      if (tip.props.aria) {
        tip.reference.removeAttribute('aria-' + tip.props.aria);
      }

      tip.popperInstance.disableEventListeners();

      tip.props.appendTo.removeChild(tip.popper);
      tip.state.isMounted = false;

      tip.props.onHidden(tip);
    });
  }

  /**
   * Destroys the tooltip
   */
  function destroy(destroyTargetInstances) {
    if (tip.state.isDestroyed) {
      return;
    }

    // If the popper is currently mounted to the DOM, we want to ensure it gets
    // hidden and unmounted instantly upon destruction
    if (tip.state.isMounted) {
      hide(0);
    }

    removeTriggersFromReference();

    tip.reference.removeEventListener('click', onReferenceClick);

    delete tip.reference._tippy;

    if (tip.props.target && destroyTargetInstances) {
      arrayFrom(tip.reference.querySelectorAll(tip.props.target)).forEach(function (child) {
        return child._tippy && child._tippy.destroy();
      });
    }

    if (tip.popperInstance) {
      tip.popperInstance.destroy();
    }

    if (popperMutationObserver) {
      popperMutationObserver.disconnect();
    }

    tip.state.isDestroyed = true;
  }
}

var globalEventListenersBound = false;

/**
 * Exported module
 * @param {String|Element|Element[]|NodeList|Object} targets
 * @param {Object} options
 * @param {Boolean} one
 * @return {Object}
 */
function tippy$1(targets, options, one) {
  validateOptions(options, Defaults);

  if (!globalEventListenersBound) {
    bindGlobalEventListeners();
    globalEventListenersBound = true;
  }

  var props = _extends({}, Defaults, options);

  /**
   * If they are specifying a virtual positioning reference, we need to polyfill
   * some native DOM props
   */
  if (isPlainObject(targets)) {
    polyfillElementPrototypeProperties(targets);
  }

  var references = getArrayOfElements(targets);
  var firstReference = references[0];

  var instances = (one && firstReference ? [firstReference] : references).reduce(function (acc, reference) {
    var tip = reference && createTippy(reference, props);
    if (tip) {
      acc.push(tip);
    }
    return acc;
  }, []);

  var collection = {
    targets: targets,
    props: props,
    instances: instances,
    destroyAll: function destroyAll() {
      collection.instances.forEach(function (instance) {
        instance.destroy();
      });
      collection.instances = [];
    }
  };

  return collection;
}

/**
 * Static props
 */
tippy$1.version = version;
tippy$1.defaults = Defaults;

/**
 * Static methods
 */
tippy$1.one = function (targets, options) {
  return tippy$1(targets, options, true).instances[0];
};
tippy$1.setDefaults = function (partialDefaults) {
  Object.keys(partialDefaults).forEach(function (key) {
    Defaults[key] = partialDefaults[key];
  });
};
tippy$1.disableAnimations = function () {
  tippy$1.setDefaults({
    duration: 0,
    updateDuration: 0,
    animateFill: false
  });
};
tippy$1.hideAllPoppers = hideAllPoppers;
// noop: deprecated static method as capture phase is now default
tippy$1.useCapture = function () {};

/**
 * Auto-init tooltips for elements with a `data-tippy="..."` attribute
 */
var autoInit = function autoInit() {
  arrayFrom(document.querySelectorAll('[data-tippy]')).forEach(function (el) {
    var content = el.getAttribute('data-tippy');
    if (content) {
      tippy$1(el, { content: content });
    }
  });
};
if (isBrowser) {
  setTimeout(autoInit);
}

return tippy$1;

})));
//# sourceMappingURL=tippy.standalone.js.map
