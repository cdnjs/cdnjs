/***

 ~~~ Version 2.7.4 ~~~

 ******************************************

    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
               /____/                              

 ******************************************
 
 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PLUGIN ON GITHUB {*} {*}

 ******************************************
 ********* The MIT License (MIT) **********
 ******************************************
 Created 2017 by ThibaultJanBeyer
 web: http://www.DragSelect.com/
 github: https://github.com/ThibaultJanBeyer/DragSelect

*/
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * The Settings to be passed to the Class
 * @typedef {Object} Settings
 * @property {HTMLElement|SVGElement|Document} [area=document] area in which you can drag. If not provided it will be the whole document
 * @property {DSInputElements} [selectables=[]] the elements that can be selected
 * @property {number} [autoScrollSpeed=5] Speed in which the area scrolls while selecting (if available). Unit is pixel per movement.
 * @property {Vect2} [overflowTolerance={x:25,y:25}] Tolerance for autoScroll (how close one has to be near an edges for autoScroll to start)
 * @property {number} [zoom=1] Zoom scale factor (in case of using CSS style transform: scale() which messes with real positions). Unit scale zoom.
 * @property {boolean} [customStyles=false] if set to true, no styles (except for position absolute) will be applied by default
 * @property {boolean} [multiSelectMode=false] Add newly selected elements to the selection instead of replacing them
 * @property {boolean} [multiSelectToggling=true] Whether or not to toggle already active elements while multi-selecting
 * @property {DSMultiSelectKeys} [multiSelectKeys=['Control', 'Shift', 'Meta']] Keys that allows switching to the multi-select mode (see the multiSelectMode option). Any key value is possible ([see MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)). Note that the best support is given for <kbd>Control</kbd>, <kbd>Shift</kbd> and <kbd>Meta</kbd>. Provide an empty array `[]` if you want to turn off the functionality.
 * @property {HTMLElement} [selector=HTMLElement] the square that will draw the selection
 * @property {number} [selectionThreshold=0] how much % of the element has to be selected to be considered selected (0 = just touching, 1 = inside the selection)
 * @property {boolean} [draggability=true] When a user is dragging on an already selected element, the selection is dragged.
 * @property {boolean} [immediateDrag=true] Whether an element is draggable from the start or needs to be selected first
 * @property {boolean} [keyboardDrag=true] Whether or not the user can drag with the keyboard (we don't recommend disabling it)
 * @property {DSDragKeys} [dragKeys={up:['ArrowUp'],down:['ArrowDown'],left:['ArrowLeft'],righ:['ArrowRight']}] The keys available to drag element using the keyboard.
 * @property {number} [keyboardDragSpeed=10] The speed at which elements are dragged using the keyboard. In pixels per keydown.
 * @property {boolean} [useTransform=true] Whether to use hardware accelerated css transforms when dragging or top/left instead
 * @property {number} [refreshMemoryRate=80] Refresh rate on memoization, higher numbers mean better performance but more lag if elements are moving, lower numbers mean less lag but worse performance. If none of your DOMNodes are moving, you can set it to a very high number to increase performance. Value in milliseconds.
 * @property {DSInputDropZone[]} [dropZones=[]] one or more drop-elements: where the selectables can be dropped into
 * @property {number} [dropInsideThreshold=1] how much % of the item has to be inside the dropzone to be considered inside (0 = barely touching, 1 = completely inside)
 * @property {number} [dropTargetThreshold=0] how much % of the zone does the pointer has to be in to be considered a target (0 = anywhere in the zone, max: 0.5 = has to point at the center of the zone)
 * @property {boolean} [usePointerEvents=false] Whether to use Pointer Events to replace traditional Mouse or Touch Events. Useful for tools like Google Blockly.
 * @property {string} [hoverClass=ds-hover] the class assigned to the mouse hovered items
 * @property {string} [selectableClass=ds-selectable] the class assigned to the elements that can be selected
 * @property {string} [selectedClass=ds-selected] the class assigned to the selected items
 * @property {string} [selectorClass=ds-selector] the class assigned to the square selector helper
 * @property {string} [selectorAreaClass=ds-selector-area] the class assigned to the square in which the selector resides. By default it's invisible
 * @property {string} [droppedTargetClass=ds-dropped-target] on an item corresponding the target dropzone. This is also the prefix for ds-dropped-target-${zone.id}
 * @property {string} [droppedInsideClass=ds-dropped-inside] on an item that is within its dropzone bounds after a drop. This is also the prefix for ds-dropped-inside-${zone.id}
 * @property {string} [droppableClass=ds-droppable] on element that can be dropped into at least one container. This is also the prefix for ds-droppable-${zone.id}
 * @property {string} [dropZoneClass=ds-dropzone] on each dropZone
 * @property {string} [dropZoneReadyClass=ds-dropzone-ready] on corresponding dropZone when element is dragged
 * @property {string} [dropZoneTargetClass=ds-dropzone-target] on dropZone that has elements from any successful target drop
 * @property {string} [dropZoneInsideClass=ds-dropzone-inside] on dropZone that has elements inside after any drop
 * @property {boolean} [dragAsBlock=false] whether to drag multiple elements as a single block or as individual items
 */

/**
 * The Object that is passed back to any callback method
 * @typedef {Object} CallbackObject
 * @property {Array<HTMLElement|SVGElement|any>} [items] The items currently selected
 * @property {MouseEvent|TouchEvent|PointerEvent|KeyboardEvent|Event} [event] The respective event object
 * @property {HTMLElement|SVGElement|any} [item] The single item currently interacted with
 * @property {boolean} [isDragging] Whether the interaction is a drag or a select
 * @property {boolean} [isDraggingKeyboard] Whether or not the drag interaction is via keyboard
 * @property {string} [key] Pressed key (lowercase)
 * @property {Settings} [settings] the settings being updates/manipulated/passed, also holds the previous value. i.e. updating selectorClass will publish { settings: { selectorClass: 'newVal', 'selectorClass:pre': 'oldVal' } }
 * @property {Array.<'top'|'bottom'|'left'|'right'|undefined>} [scroll_directions]
 * @property {number} [scroll_multiplier]
 * @property {DSDropZone} [dropTarget] The dropZone element that the element was dropped into (or the mouse is currently hovering over)
 */
/**
 * @typedef {function} DSCallback
 * @param {CallbackObject} data
 */

/**
 * @typedef {Object} DSInputDropZone
 * @property {string} id can be any unique identifier of type string
 * @property {DSElement} element is the dropzone itself
 * @property {DSInputElements} [droppables] the elements that can be dropped into that zone. This is optional, by default it will be all selectables
 */
/**
 * @typedef {Object} DSDropZone
 * @property {string} id
 * @property {DSElement} element
 * @property {DSElements} droppables
 * @property {DSElements} [itemsDropped] the items related to the target zone
 * @property {DSElements} [itemsInside] the items that are within the targets bounds
 */

/** @typedef {{x: number, y: number}} Vect2 */
/** @typedef {{x:number,y:number,w:number,h:number,r:number,b:number}} DSElementPos */
/** @typedef {Array.<'top'|'bottom'|'left'|'right'|undefined>} DSEdges */

/** @typedef {HTMLElement|SVGElement|Document} DSArea area within which you can drag */
/** @typedef {HTMLElement} DSSelectorArea area in which you can drag */
/** @typedef {Array.<HTMLElement|SVGElement> | HTMLElement | SVGElement} DSInputElements the elements that can be selected */
/** @typedef {Array.<HTMLElement|SVGElement>} DSElements the elements that can be selected */
/** @typedef {HTMLElement|SVGElement} DSElement a single element that can be selected */
/** @typedef {MouseEvent|TouchEvent|PointerEvent} DSEvent en event from a touch or mouse interaction */
/** @typedef {Array.<'Shift'|'Control'|'Meta'|string>} DSMultiSelectKeys An array of keys that allows switching to the multi-select mode */

/** @typedef {'dragmove'|'autoscroll'|'dragstart'|'elementselect'|'elementunselect'|'callback'} DSEventNames */
/** @typedef {'Interaction:init'|'Interaction:start'|'Interaction:end'|'Interaction:update'|'Area:modified'|'Area:scroll'|'PointerStore:updated'|'Selected:added'|'Selected:removed'|'Selectable:click'|'Selectable:added'|'Selectable:removed'|'Selectable:pointer'|'KeyStore:down'|'KeyStore:up'} DSInternalEventNames */
/** @typedef {'Interaction:init:pre'|'Interaction:start:pre'|'Interaction:end:pre'|'Interaction:update:pre'|'Area:modified:pre'|'Area:scroll:pre'|'PointerStore:updated:pre'|'Selected:added:pre'|'Selected:removed:pre'|'Selectable:click:pre'|'Selectable:added:pre'|'Selectable:removed:pre'|'Selectable:pointer:pre'|'KeyStore:down:pre'|'KeyStore:up:pre'} DSInternalEventNamesPre */
// @todo: update to typescript for complex defs like `Settings:updated:${string}` | `Settings:updated:${string}:pre`
/** @typedef {'Settings:updated'|'Settings:updated:pre'|'Settings:updated:*'|'Settings:updated:*:pre'} DSInternalSettingEvents */
/** @typedef {DSEventNames|DSInternalEventNames|DSInternalEventNamesPre|DSInternalSettingEvents} DSCallbackNames the name of the callback */

/** @typedef {{top:number,left:number,bottom:number,right:number,width:number,height:number}} DSBoundingRect */
/** @typedef {{up:string[],down:string[],left:string[],right:string[]}} DSDragKeys */

/**
 * @callback DSModificationCallback
 * @param {*} event
 */

// @ts-check

/**
 * @param {Vect2} v1
 * @param {'+'|'-'|'*'|'/'} operator
 * @param {Vect2} v2
 * @return {Vect2}
 */
var calc = function calc(_ref, operator, _ref2) {
  var x1 = _ref.x,
    y1 = _ref.y;
  var x2 = _ref2.x,
    y2 = _ref2.y;
  var calculations = {
    '+': {
      x: x1 + x2,
      y: y1 + y2
    },
    '-': {
      x: x1 - x2,
      y: y1 - y2
    },
    '*': {
      x: x1 * x2,
      y: y1 * y2
    },
    '/': {
      x: x1 / x2,
      y: y1 / y2
    }
  };
  return calculations[operator];
};

/**
 * @param {{left:number,top:number}} rect
 * @returns {Vect2}
 */
var rect2vect = function rect2vect(rect) {
  return {
    x: rect.left,
    y: rect.top
  };
};
/**
 * @param {Vect2} vect
 * @param {number} dimension
 * @returns {DSBoundingRect}
 */
var vect2rect = function vect2rect(vect) {
  var dimension = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    left: vect.x,
    top: vect.y,
    right: vect.x,
    bottom: vect.y,
    width: dimension,
    height: dimension
  };
};
/**
 * @param {number} n
 * @returns {Vect2}
 */
var num2vect = function num2vect(n) {
  return {
    x: n,
    y: n
  };
};

// @ts-check

/**
 * Removes event-listeners from the DOMNode
 * @typedef {()=>void} DSCleanup
 */

/**
 * Adds event-listeners to a DOMNode
 * @param {DSArea[]} nodes
 * @param {DSModificationCallback} cb
 * @return {{observer:MutationObserver,callback:DSModificationCallback,cleanup:DSCleanup}}
 */
var addModificationObservers = (function (nodes, cb) {
  var callback = cb;
  window.addEventListener('resize', callback);
  window.addEventListener('scroll', callback);
  var observer = new MutationObserver(callback);
  nodes.forEach(function (el, i) {
    observer.observe(el, {
      childList: i !== 0,
      attributes: true
    });
  });

  /**
   * Removes all observers
   */
  var cleanup = function cleanup() {
    return removeModificationObservers(observer, callback);
  };
  return {
    observer: observer,
    callback: callback,
    cleanup: cleanup
  };
});

// @ts-check

/**
 * Checks whether the area can scroll or not
 * @param {DSArea} area
 * @return {boolean} scroll X/Y
 */
var canScroll = (function (area) {
  var scroll = getCurrentScroll(area);
  if (scroll.x || scroll.y) return true;
  if (area instanceof Document) {
    if (area.body) return !!(area.body.scrollTop = 1);
    return !!(area.documentElement.scrollTop = 1);
  }
  return !!(area.scrollTop = 1);
});

// @ts-check

/**
 * Creates the SelectorArea
 * @return {HTMLDivElement}
 */
var createSelectorAreaElement = (function () {
  var node = document.createElement('div');
  node.style.position = 'fixed';
  node.style.overflow = 'hidden';
  node.style.pointerEvents = 'none';
  node.style.zIndex = '999999999999999999';
  return node;
});

// @ts-check

/**
 * Create the selector node
 * @param {boolean} customStyles
 * @return {HTMLElement}
 */
var createSelectorElement = (function (customStyles) {
  var selector = document.createElement('div');
  selector.style.position = 'absolute';
  if (!customStyles) {
    selector.style.background = 'rgba(0, 175, 255, 0.2)';
    selector.style.border = '1px solid rgba(0, 175, 255, 0.8)';
    selector.style.display = 'none';
    selector.style.pointerEvents = 'none'; // fix for issue #8 (ie11+)
  }

  return selector;
});

// @ts-check

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds. All credits to [Trey Huffine]{@link https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086}
 * @param {*} func
 * @param {number} wait
 * @returns {DSModificationCallback}
 */
var debounce = (function (func, wait) {
  var timeout;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // The callback function to be executed after
    // the debounce time has elapsed
    var later = function later() {
      // null timeout to indicate the debounce ended
      timeout = null;

      // Execute the callback
      func.apply(void 0, args);
    };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = setTimeout(later, wait);
  };
});

// @ts-check
var documentScroll = (function () {
  var _document$body, _document$documentEle, _document$body2, _document$documentEle2;
  return {
    y: ((_document$body = document.body) === null || _document$body === void 0 ? void 0 : _document$body.scrollTop) || ((_document$documentEle = document.documentElement) === null || _document$documentEle === void 0 ? void 0 : _document$documentEle.scrollTop) || 0,
    x: ((_document$body2 = document.body) === null || _document$body2 === void 0 ? void 0 : _document$body2.scrollLeft) || ((_document$documentEle2 = document.documentElement) === null || _document$documentEle2 === void 0 ? void 0 : _document$documentEle2.scrollLeft) || 0
  };
});

/**
 * @param {DSElement|DSArea} node
 * @returns {DSElements}
 */
var getAllParentNodes = (function (node) {
  var traverse = function traverse(toWatch) {
    var _toWatch$index;
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var parent = (_toWatch$index = toWatch[index]) === null || _toWatch$index === void 0 ? void 0 : _toWatch$index.parentNode;
    if (parent) {
      toWatch.push(parent);
      index++;
      return traverse(toWatch, index);
    }
    return toWatch;
  };
  return traverse([node]);
});

// @ts-check
/**
 * Returns the top/left/bottom/right/width/height
 * values of an area. If area is document then everything
 * except the sizes will be nulled.
 * @param {DSArea} area
 * @param {number} zoom
 * @returns {DSBoundingRect}
 */
var getAreaRect = (function (area, zoom) {
  if (area instanceof Document) return {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: window.innerWidth,
    height: window.innerHeight
  };
  var rect = area.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: (area.clientWidth || rect.width) * zoom,
    height: (area.clientHeight || rect.height) * zoom
  };
});

// @ts-check
/**
 * Returns the compound bounding rect of multiple elements.
 * @param {DSElements} elements
 * @param {SelectableSet} SelectableSet
 * @returns {DSBoundingRect}
 */
var getBoundingClientRect = (function (elements, SelectableSet) {
  var rect = {
    top: Number.POSITIVE_INFINITY,
    left: Number.POSITIVE_INFINITY,
    bottom: Number.NEGATIVE_INFINITY,
    right: Number.NEGATIVE_INFINITY,
    width: Number.NEGATIVE_INFINITY,
    height: Number.NEGATIVE_INFINITY
  };
  toArray(elements).forEach(function (element) {
    var elementRect = SelectableSet.getRect(element);
    rect.top = Math.min(rect.top, elementRect.top);
    rect.left = Math.min(rect.left, elementRect.left);
    rect.bottom = Math.max(rect.bottom, elementRect.bottom);
    rect.right = Math.max(rect.right, elementRect.right);
  });
  rect.height = rect.bottom - rect.top;
  rect.width = rect.right - rect.left;
  return rect;
});

// @ts-check

/**
 * @param {DSArea} [area]
 * @return {Vect2} scroll X/Y
 */
var getCurrentScroll = (function (area) {
  if (!area || area instanceof Document) return documentScroll();
  return {
    x: area.scrollLeft >= 0 ? area.scrollLeft : documentScroll().x,
    y: area.scrollTop >= 0 ? area.scrollTop : documentScroll().y
  };
});

// @ts-check

/**
 * Returns the edges that an element is overflowing
 * @param {Object} p
 * @param {DSBoundingRect} p.elementRect
 * @param {DSBoundingRect} p.containerRect
 * @param {Vect2} [p.tolerance]
 * @returns {DSEdges}
 */
var getOverflowEdges = (function (_ref) {
  var elementRect = _ref.elementRect,
    containerRect = _ref.containerRect,
    _ref$tolerance = _ref.tolerance,
    tolerance = _ref$tolerance === void 0 ? {
      x: 0,
      y: 0
    } : _ref$tolerance;
  var edges = [];
  if (elementRect.top - tolerance.y < containerRect.top) edges.push('top');
  if (elementRect.left - tolerance.x < containerRect.left) edges.push('left');
  if (elementRect.bottom + tolerance.y > containerRect.bottom) edges.push('bottom');
  if (elementRect.right + tolerance.y > containerRect.right) edges.push('right');
  return (/** @type {DSEdges} */edges
  );
});

// @ts-check

/**
 * Returns cursor x, y position based on event object
 * @param {Object} p
 * @param {MouseEvent|Touch|PointerEvent} p.event
 * @return {Vect2} cursor X/Y position
 */
var getPointerPos = (function (_ref) {
  var event = _ref.event;
  return {
    x: event.clientX,
    y: event.clientY
  };
});

// @ts-check
/**
 * Reliably returns the exact x,y,w,h positions of the selector element
 * @param {{ scrollAmount:Vect2, initialPointerPos:Vect2, pointerPos:Vect2 }} p
 * @returns {{left:number,top:number,width:number,height:number}}
 */
var getSelectorPosition = (function (_ref) {
  var scrollAmount = _ref.scrollAmount,
    initialPointerPos = _ref.initialPointerPos,
    pointerPos = _ref.pointerPos;
  /** check for direction
   *
   * This is quite complicated, so also quite complicated to explain. Lemme’ try:
   *
   * Problem #1:
   * Sadly in HTML we can not have negative sizes.
   * so if we want to scale our element 10px to the right then it is easy,
   * we just have to add +10px to the width. But if we want to scale the element
   * -10px to the left then things become more complicated, we have to move
   * the element -10px to the left on the x axis and also scale the element
   * by +10px width to fake a negative sizing.
   *
   * One solution to this problem is using css-transforms scale() with
   * transform-origin of top left. BUT we can’t use this since it will size
   * everything, then when your element has a border for example, the border will
   * get inanely huge. Also transforms are not widely supported in IE.
   *
   * Example #1:
   * Unfortunately, things get even more complicated when we are inside a scroll-able
   * DIV. Then, let’s say we scroll to the right by 10px and move the cursor right by 5px in our
   * checks we have to subtract 10px from the initialcursor position in our check
   * (since the initial position is moved to the left by 10px) so in our example:
   * 1. pointerPos.x (5) > initialPointerPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
   * then set the x position to the cursors start position
   * selectorPos.x = initialPointerPos.x (0) - scrollAmount.x (10) === 10 // 2.
   * then we can calculate the elements width, which is
   * the new cursor position minus the initial one plus the scroll amount, so in our example:
   * 3. selectorPos.w = pointerPos.x (5) - initialPointerPos.x (0) + scrollAmount.x (10) === 15;
   *
   * let’s say after that movement we now scroll 20px to the left and move our cursor by 30px to the left:
   * 1b. pointerPos.x (-30) > initialPointerPos.x (0) - scrollAmount.x (-20) === -30 < --20 === -30 < +20 === false;
   * 2b. selectorPos.x = pointerPos.x (-30) === -30; move left position to cursor (for more info see Problem #1)
   * 3b. selectorPos.w = initialPointerPos.x (0) - pointerPos.x (-30) - scrollAmount.x (-20) === 0--30--20 === 0+30+20 === 50;  // scale width to original left position (for more info see Problem #1)
   *
   * same thing has to be done for top/bottom
   *
   * I hope that makes sense. Try stuff out and play around with variables to get a hang of it.
   */
  var selectorPos = {};

  // right
  if (pointerPos.x > initialPointerPos.x - scrollAmount.x) {
    // 1.
    selectorPos.left = initialPointerPos.x - scrollAmount.x; // 2.
    selectorPos.width = pointerPos.x - initialPointerPos.x + scrollAmount.x; // 3.
    // left
  } else {
    // 1b.
    selectorPos.left = pointerPos.x; // 2b.
    selectorPos.width = initialPointerPos.x - pointerPos.x - scrollAmount.x; // 3b.
  }

  // bottom
  if (pointerPos.y > initialPointerPos.y - scrollAmount.y) {
    selectorPos.top = initialPointerPos.y - scrollAmount.y;
    selectorPos.height = pointerPos.y - initialPointerPos.y + scrollAmount.y;
    // top
  } else {
    selectorPos.top = pointerPos.y;
    selectorPos.height = initialPointerPos.y - pointerPos.y - scrollAmount.y;
  }
  return selectorPos;
});

// @ts-check

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
var getComputedTranslatePositions = function getComputedTranslatePositions(element) {
  var position = {
    x: 0,
    y: 0
  };
  var computed = window.getComputedStyle(element);
  if (!computed.transform || computed.transform === 'none') return position;
  if (computed.transform.indexOf('3d') >= 0) {
    var _match = computed.transform.trim().match(/matrix3d\((.*?)\)/);
    if (_match && _match.length) {
      var _match$;
      var values = (_match$ = _match[1]) === null || _match$ === void 0 ? void 0 : _match$.split(',');
      position.x = parseInt(values[12]) || 0;
      position.y = parseInt(values[13]) || 0;
    }
    return position;
  }
  var match = computed.transform.trim().match(/matrix\((.*?)\)/);
  if (match && match.length) {
    var _match$2;
    var _values = (_match$2 = match[1]) === null || _match$2 === void 0 ? void 0 : _match$2.split(',');
    position.x = parseInt(_values[4]) || 0;
    position.y = parseInt(_values[5]) || 0;
  }
  return position;
};

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
var getTranslatedPositions = function getTranslatedPositions(element) {
  var transform = element.style.transform;
  if (!transform || transform.indexOf('translate') < 0) return getComputedTranslatePositions(element);
  var position = {
    x: 0,
    y: 0
  };
  var match = transform.trim().match(/translate[3dD]*?\(.*?\)/);
  if (match) {
    var _match$3;
    var split = (_match$3 = match[0]) === null || _match$3 === void 0 ? void 0 : _match$3.split('(');
    if (split) {
      var _split$;
      var values = (_split$ = split[1]) === null || _split$ === void 0 ? void 0 : _split$.split(',');
      position.x = parseInt(values[0]) || 0;
      position.y = parseInt(values[1]) || 0;
    }
  }
  if (!position.x && !position.x) return getComputedTranslatePositions(element);
  return position;
};

/**
 * @param {DSElement} element
 * @return {Vect2}
 */
var getTopLeftPosition = function getTopLeftPosition(element) {
  var style = element.style;
  var position = {
    x: parseInt(style.left) || 0,
    y: parseInt(style.top) || 0
  };

  // initial positions
  if (!position.x && !position.x) {
    var computed = window.getComputedStyle(element);
    return {
      x: parseInt(computed.left) || 0,
      y: parseInt(computed.top) || 0
    };
  }
  return position;
};

/**
 * Returns the X and Y coordinates based on styles
 * Can handle translate and top/left
 * @param {DSElement} element
 * @param {boolean} [useTranslate]
 * @return {Vect2}
 */
var getStylePosition = (function (element, useTranslate) {
  if (useTranslate) return getTranslatedPositions(element);
  return getTopLeftPosition(element);
});

// @ts-check

/**
 * pushes element back the overflow amount
 * (top - top gives overflow, then new position pushed back by overflow)
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {DSEdges} p.edges
 * @param {DSBoundingRect} p.elementRect
 * @param {DSBoundingRect} p.containerRect
 * @param {Vect2} p.elementPos
 * @param {boolean} p.useTransform
 */
var handleElementOverflow = (function (_ref) {
  var element = _ref.element,
    edges = _ref.edges,
    elementRect = _ref.elementRect,
    containerRect = _ref.containerRect,
    elementPos = _ref.elementPos,
    useTransform = _ref.useTransform;
  if (edges.includes('top')) {
    setStylePosition(element, {
      y: elementPos.y + containerRect.top - elementRect.top,
      x: elementPos.x
    }, useTransform);
  }
  if (edges.includes('left')) {
    setStylePosition(element, {
      y: elementPos.y,
      x: elementPos.x + containerRect.left - elementRect.left
    }, useTransform);
  }
  if (edges.includes('bottom')) {
    setStylePosition(element, {
      y: elementPos.y + containerRect.bottom - elementRect.bottom,
      x: elementPos.x
    }, useTransform);
  }
  if (edges.includes('right')) {
    setStylePosition(element, {
      y: elementPos.y,
      x: elementPos.x + containerRect.right - elementRect.right
    }, useTransform);
  }
});

// @ts-check

/**
 * Fix: some elements have to have a special position attribute for calculations
 * @param {Object} p
 * @param {CSSStyleDeclaration} p.computedStyle
 * @param {DSArea} p.node
 */
var handleElementPositionAttribute = (function (_ref) {
  var computedStyle = _ref.computedStyle,
    node = _ref.node;
  var position = computedStyle.position;
  var isPositioned = position === 'absolute' || position === 'relative' || position === 'fixed';
  if (!(node instanceof Document) && !isPositioned) node.style.position = 'relative';
});

// @ts-check

/**
 * @typedef {function} ScrollCallback
 * @property {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
 * @property {number} multiplier
 */
/**
 * @param {Object} p
 * @param {string} p.key the keyboard key that was pressed
 * @param {boolean} p.shiftKey
 * @param {boolean} p.canScroll
 * @param {number} p.keyboardDragSpeed
 * @param {number} p.zoom
 * @param {ScrollCallback} p.scrollCallback
 * @param {Vect2} p.scrollDiff
 * @param {DSDragKeys} p.dragKeys
 * @returns {Vect2}
 */
var handleKeyboardDragPosDifference = (function (_ref) {
  var shiftKey = _ref.shiftKey,
    keyboardDragSpeed = _ref.keyboardDragSpeed,
    zoom = _ref.zoom,
    key = _ref.key,
    dragKeys = _ref.dragKeys,
    scrollDiff = _ref.scrollDiff,
    canScroll = _ref.canScroll,
    scrollCallback = _ref.scrollCallback;
  var posDirection = {
    x: 0,
    y: 0
  };
  var increase = shiftKey ? keyboardDragSpeed * 4 * zoom : keyboardDragSpeed * zoom;
  if (dragKeys.left.includes(key)) {
    posDirection.x = scrollDiff.x || -increase;
    if (!shiftKey && !scrollDiff.x && canScroll) scrollCallback(['left'], keyboardDragSpeed);
  }
  if (dragKeys.right.includes(key)) {
    posDirection.x = scrollDiff.x || increase;
    if (!shiftKey && !scrollDiff.x && canScroll) scrollCallback(['right'], keyboardDragSpeed);
  }
  if (dragKeys.up.includes(key)) {
    posDirection.y = scrollDiff.y || -increase;
    if (!shiftKey && !scrollDiff.y && canScroll) scrollCallback(['top'], keyboardDragSpeed);
  }
  if (dragKeys.down.includes(key)) {
    posDirection.y = scrollDiff.y || increase;
    if (!shiftKey && !scrollDiff.y && canScroll) scrollCallback(['bottom'], keyboardDragSpeed);
  }
  return posDirection;
});

// @ts-check

/**
 * Logic when an element is selected
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {boolean} p.force
 * @param {boolean} p.multiSelectionToggle
 * @param {Set} p.SelectedSet
 * @param {string} p.hoverClassName
 */
var handleSelection = (function (_ref) {
  var element = _ref.element,
    force = _ref.force,
    multiSelectionToggle = _ref.multiSelectionToggle,
    SelectedSet = _ref.SelectedSet,
    hoverClassName = _ref.hoverClassName;
  if (element.classList.contains(hoverClassName) && !force) return;
  if (!SelectedSet.has(element)) SelectedSet.add(element);else if (multiSelectionToggle) SelectedSet["delete"](element);
  element.classList.add(hoverClassName);
});

// @ts-check

/**
 * Logic when an element is de-selected
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {boolean} p.force
 * @param {Set} p.SelectedSet
 * @param {Set} p.PrevSelectedSet
 * @param {string} p.hoverClassName
 */
var handleUnSelection = (function (_ref) {
  var element = _ref.element,
    force = _ref.force,
    SelectedSet = _ref.SelectedSet,
    PrevSelectedSet = _ref.PrevSelectedSet,
    hoverClassName = _ref.hoverClassName;
  if (!element.classList.contains(hoverClassName) && !force) return false;
  var inSelection = SelectedSet.has(element);
  var inPrevSelection = PrevSelectedSet.has(element);

  /**
   * Special for issue #9.
   * if a multi-select-key is pressed, ds 'remembers' the last selection and reverts
   * to that state if the selection is not kept, to mimic the natural OS behaviour
   * = if item was selected and is not in selection anymore, reselect it
   * = if item was not selected and is not in selection anymore, unselect it
   */
  if (inSelection && !inPrevSelection) SelectedSet["delete"](element);else if (!inSelection && inPrevSelection) SelectedSet.add(element);
  element.classList.remove(hoverClassName);
});

/**
 * @param {string} key
 * @param {string} type
 * @param {*} fallback
 * @returns {void}
 */
var wrongTypeWarn = function wrongTypeWarn(key, type, fallback) {
  return console.warn("[DragSelect] TypeIssue: setting \"".concat(key, "\" is not of type \"").concat(type, "\"."));
};

/**
 * @param {string} key
 * @param {*} value
 * @param {boolean} withFallback
 * @param {*} fallback
 * @returns {object}
 */
var hydrateHelper = function hydrateHelper(key, value, withFallback, fallback) {
  // no value available
  if (value === undefined) return withFallback ? _defineProperty({}, key, fallback) : {};
  // force unsetting of a value
  if (value === null) return _defineProperty({}, key, null);

  // TypeCheck [GENERIC]
  var isAvailable = true; // if it’s not undefined, it was set voluntarily
  var forceFallback = false;

  // TypeCheck [String]
  var expectedString = typeof fallback === 'string';
  if (expectedString) isAvailable = typeof value === 'string' || value instanceof String;
  if (expectedString && !isAvailable) {
    forceFallback = true;
    wrongTypeWarn(key, 'string');
  }

  // TypeCheck [Number]
  var expectedNumber = !Number.isNaN(fallback) && typeof fallback === 'number';
  if (expectedNumber) isAvailable = !Number.isNaN(value) && typeof value === 'number';
  if (expectedNumber && !isAvailable) {
    forceFallback = true;
    wrongTypeWarn(key, 'number');
  }

  // TypeCheck [Object]
  var expectedObject = Object.prototype.toString.call(fallback) === '[object Object]';
  if (expectedObject) isAvailable = Object.prototype.toString.call(value) === '[object Object]';
  if (expectedObject && !isAvailable) {
    forceFallback = true;
    wrongTypeWarn(key, 'object');
  }

  // TypeCheck [Boolean]
  var expectedBoolean = typeof fallback === 'boolean';
  if (expectedBoolean) isAvailable = typeof value === 'boolean';
  if (expectedBoolean && !isAvailable) {
    forceFallback = true;
    wrongTypeWarn(key, 'boolean');
  }

  // TypeCheck [Array]
  var expectedArray = Array.isArray(fallback);
  if (expectedArray) isAvailable = Array.isArray(value);
  if (expectedArray && !isAvailable) {
    forceFallback = true;
    wrongTypeWarn(key, 'array');
  }
  var isFallback = forceFallback || withFallback;

  // Special rule for [dragKeys]
  if (key === 'dragKeys' && isAvailable) return _defineProperty({}, key, Object.assign(fallback, value));
  if (key === 'dragKeys' && !isAvailable) return isFallback ? _defineProperty({}, key, fallback) : {};

  // Special rule for [dropZones]
  if (key === 'dropZones' && isAvailable && new Set(value.map(function (v) {
    return v.id;
  })).size !== value.length) console.warn("[DragSelect] UniqueConstraintsIssue: setting \"dropZones\" contains duplicate ids.");
  if (isAvailable) return _defineProperty({}, key, value);
  if (isFallback) return _defineProperty({}, key, fallback);
  return {};
};

/**
 * This helper method creates the setting object,
 * - if the settings provided are of wrong type, the fallback value will be used
 * - - except for if settings are undefined or explicitly marked as "null"
 * - if "withfallback" is true, it will return the object with all settings:
 * - - if not provided from the settings object (or wrong type), the fallback will be used
 * (the fallback value for each setting is the last prop of the hydrateHelper)
 * @param {Settings} settings
 * @param {boolean} withFallback
 */
var hydrateSettings = (function (settings, withFallback) {
  return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, hydrateHelper('area', settings.area, withFallback, document)), hydrateHelper('selectables', settings.selectables, withFallback, null)), hydrateHelper('autoScrollSpeed', settings.autoScrollSpeed, withFallback, 5)), hydrateHelper('overflowTolerance', settings.overflowTolerance, withFallback, {
    x: 25,
    y: 25
  })), hydrateHelper('zoom', settings.zoom, withFallback, 1)), hydrateHelper('customStyles', settings.customStyles, withFallback, false)), hydrateHelper('multiSelectMode', settings.multiSelectMode, withFallback, false)), hydrateHelper('multiSelectToggling', settings.multiSelectToggling, withFallback, true)), hydrateHelper('multiSelectKeys', settings.multiSelectKeys, withFallback, ['Control', 'Shift', 'Meta'])), hydrateHelper('selector', settings.selector, withFallback, null)), hydrateHelper('selectionThreshold', settings.selectionThreshold, withFallback, 0)), hydrateHelper('draggability', settings.draggability, withFallback, true)), hydrateHelper('immediateDrag', settings.immediateDrag, withFallback, true)), hydrateHelper('keyboardDrag', settings.keyboardDrag, withFallback, true)), hydrateHelper('dragKeys', settings.dragKeys, withFallback, {
    up: ['ArrowUp'],
    down: ['ArrowDown'],
    left: ['ArrowLeft'],
    right: ['ArrowRight']
  })), hydrateHelper('keyboardDragSpeed', settings.keyboardDragSpeed, withFallback, 10)), hydrateHelper('useTransform', settings.useTransform, withFallback, true)), hydrateHelper('refreshMemoryRate', settings.refreshMemoryRate, withFallback, 80)), hydrateHelper('dropZones', settings.dropZones, withFallback, [])), hydrateHelper('dropInsideThreshold', settings.dropInsideThreshold, withFallback, 1)), hydrateHelper('dropTargetThreshold', settings.dropTargetThreshold, withFallback, 0)), hydrateHelper('usePointerEvents', settings.usePointerEvents, withFallback, false)), hydrateHelper('hoverClass', settings.hoverClass, withFallback, 'ds-hover')), hydrateHelper('selectableClass', settings.selectableClass, withFallback, 'ds-selectable')), hydrateHelper('selectedClass', settings.selectedClass, withFallback, 'ds-selected')), hydrateHelper('selectorClass', settings.selectorClass, withFallback, 'ds-selector')), hydrateHelper('selectorAreaClass', settings.selectorAreaClass, withFallback, 'ds-selector-area')), hydrateHelper('droppedTargetClass', settings.droppedTargetClass, withFallback, 'ds-dropped-target')), hydrateHelper('droppedInsideClass', settings.droppedInsideClass, withFallback, 'ds-dropped-inside')), hydrateHelper('droppableClass', settings.droppableClass, withFallback, 'ds-droppable')), hydrateHelper('dropZoneClass', settings.dropZoneClass, withFallback, 'ds-dropzone')), hydrateHelper('dropZoneReadyClass', settings.dropZoneReadyClass, withFallback, 'ds-dropzone-ready')), hydrateHelper('dropZoneTargetClass', settings.dropZoneTargetClass, withFallback, 'ds-dropzone-target')), hydrateHelper('dropZoneInsideClass', settings.dropZoneInsideClass, withFallback, 'ds-dropzone-inside')), hydrateHelper('dragAsBlock', settings.dragAsBlock, withFallback, false));
});

// @ts-check

// [PUBLICLY EXPOSED METHOD]

/**
 * Axis-Aligned Bounding Box Collision Detection.
 * Imagine following Example:
 *
 *
 *        b01
 *     a01[1]a02
 *        b02      b11
 *              a11[2]a12
 *                 b12
 *
 *
 * to check if those two boxes collide we do this AABB calculation:
 * 1. a01 < a12 (left border pos box1 smaller than right border pos box2)
 * 2. a02 > a11 (right border pos box1 larger than left border pos box2)
 * 3. b01 < b12 (top border pos box1 smaller than bottom border pos box2)
 * 4. b02 > b11 (bottom border pos box1 larger than top border pos box2)
 * {@link https://en.wikipedia.org/wiki/Minimum_bounding_box#Axis-aligned_minimum_bounding_box Wikipedia}
 * {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection MDN}
 * @param {{left:number,right:number,top:number,bottom:number}} el1
 * @param {{left:number,right:number,top:number,bottom:number}} el2
 * @param {number} [percent=0]
 *  1 = the element has to be completely inside the other element
 *  0.8 = the element has to be 80% inside the other element
 *  0.5 = the element has to be 50% inside the other element
 *  0.2 = the element has to be 20% inside the other element
 *  0 = the element only has to touch the other element
 * @returns {boolean}
 */
var isCollision = (function (el1, el2) {
  var percent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var element1 = el1;
  if (percent > 0) {
    var widthPoint = (el1.right - el1.left) * percent;
    var heightPoint = (el1.bottom - el1.top) * percent;
    element1 = {
      left: el1.left + widthPoint,
      right: el1.right - widthPoint,
      top: el1.top + heightPoint,
      bottom: el1.bottom - heightPoint
    };
  }
  if (element1.left < el2.right &&
  // 1.
  element1.right > el2.left &&
  // 2.
  element1.top < el2.bottom &&
  // 3.
  element1.bottom > el2.top // 4.
  ) return true;
  // collision detected!
  return false;
});

// @ts-check

/**
 * Moves the element in a posDirection
 * @param {Object} p
 * @param {DSElement} p.element
 * @param {Vect2} p.posDirection
 * @param {DSBoundingRect} p.containerRect
 * @param {boolean} p.useTransform
 */
var moveElement = (function (_ref) {
  var element = _ref.element,
    posDirection = _ref.posDirection,
    containerRect = _ref.containerRect,
    useTransform = _ref.useTransform;
  var elementPos = getStylePosition(element, useTransform);
  var newPos = calc(elementPos, '+', posDirection);
  setStylePosition(element, newPos, useTransform);
  var elementRect = element.getBoundingClientRect();
  var edges = getOverflowEdges({
    elementRect: elementRect,
    containerRect: containerRect
  });
  handleElementOverflow({
    element: element,
    edges: edges,
    elementRect: elementRect,
    containerRect: containerRect,
    elementPos: newPos,
    useTransform: useTransform
  });
});

// @ts-check

/**
 * Removes event-listeners to the selectorArea
 * @param {MutationObserver} modificationObserver
 * @param {DSModificationCallback} callback
 */
var removeModificationObservers = (function (modificationObserver, callback) {
  window.removeEventListener('resize', callback);
  window.removeEventListener('scroll', callback);
  modificationObserver.disconnect();
});

// @ts-check

/**
 * Scroll the element in the specified direction
 * @param {DSArea} element
 * @param {Array.<'top'|'bottom'|'left'|'right'|undefined>} directions
 * @param {number} multiplier
 */
var scrollElement = (function (element, directions, multiplier) {
  if (!directions.length) return;
  var docEl = document && document.documentElement && document.documentElement.scrollTop && document.documentElement;
  var _element = element instanceof Document ? docEl || document.body : element;
  var scrollTop = directions.includes('top') && _element.scrollTop > 0;
  var scrollBot = directions.includes('bottom') && _element.scrollTop < _element.scrollHeight;
  var scrollLeft = directions.includes('left') && _element.scrollLeft > 0;
  var scrollRight = directions.includes('right') && _element.scrollLeft < _element.scrollWidth;
  if (scrollTop) _element.scrollTop -= 1 * multiplier;
  if (scrollBot) _element.scrollTop += 1 * multiplier;
  if (scrollLeft) _element.scrollLeft -= 1 * multiplier;
  if (scrollRight) _element.scrollLeft += 1 * multiplier;
});

// @ts-check

/**
 * Sets the style position to the X and Y coordinates
 * Can handle translate and top/left
 * @param {DSElement} element
 * @param {Vect2} values
 * @param {boolean} [useTranslate]
 * @return {DSElement}
 */
var setStylePosition = (function (element, values, useTranslate) {
  if (useTranslate) {
    var prevTransform = element.style.transform;
    element.style.transform = "translate3d(".concat(values.x, "px,").concat(values.y, "px,1px) ").concat(prevTransform.replace(/translate.*?\)/g, ''));
  } else {
    element.style.left = "".concat(values.x, "px");
    element.style.top = "".concat(values.y, "px");
  }
  return element;
});

/**
 * @typedef {function} DSSubscribe
 * @param {DSCallbackNames} eventName
 * @param {DSCallback} callback
 * @returns {number} event id, can be used to unsubscribe more efficiently
 */
/**
 * @typedef {function} DSPublish
 * @param {DSCallbackNames} eventName
 * @param {CallbackObject} data passed to the subscription method
 */

/**
 * Maps internal events to external ones
 *
 * @param {Object} p
 * @param {DSSubscribe} p.subscribe
 * @param {DSPublish} p.publish
 * @param {Interaction} p.Interaction
 * @param {SelectedSet} p.SelectedSet
 * @param {DropZones} p.DropZones
 */
var subscriberAliases = (function (_ref) {
  var subscribe = _ref.subscribe,
    publish = _ref.publish,
    Interaction = _ref.Interaction,
    SelectedSet = _ref.SelectedSet,
    DropZones = _ref.DropZones;
  var mapping = {
    'Selected:added': [{
      name: 'elementselect'
    }],
    'Selected:removed': [{
      name: 'elementunselect'
    }],
    'Area:scroll': [{
      name: 'autoscroll'
    }],
    // scroll_directions, scroll_multiplier
    'Interaction:start': [{
      name: 'dragstart'
    }],
    // event, isDraggingKeyboard
    'Interaction:update': [
    // event, isDraggingKeyboard
    {
      name: 'dragmove',
      condition: function condition(data) {
        return data.event;
      }
    }],
    'Interaction:end': [
    // event, isDraggingKeyboard
    {
      name: 'callback',
      extraData: function extraData() {
        var target = DropZones.getTarget();
        return _objectSpread2({}, target ? {
          dropTarget: target.toObject()
        } : {});
      }
    }]
  };
  var _loop = function _loop() {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      sub_name = _Object$entries$_i[0],
      pubs = _Object$entries$_i[1];
    ['pre', false].forEach(function (filler) {
      return subscribe(filler ? "".concat(sub_name, ":").concat(filler) : sub_name, function (data) {
        return pubs.forEach(function (pub) {
          return (!pub.condition || pub.condition(data)) && publish(filler ? "".concat(filler).concat(pub.name) : pub.name, _objectSpread2(_objectSpread2({
            items: SelectedSet.elements,
            isDragging: Interaction.isDragging
          }, data), pub.extraData ? pub.extraData(data) : {}));
        });
      });
    });
  };
  for (var _i = 0, _Object$entries = Object.entries(mapping); _i < _Object$entries.length; _i++) {
    _loop();
  }
});

/**
 * Transforms any list or single dom node to an array so user doesn’t have to care. Also removes duplicates.
 * @param {DSInputElements} items a single item, a Node-list or any element group
 * @return {DSElements}
 */
var toArray = (function (items) {
  if (!items) return [];
  if (!Array.isArray(items) && (items instanceof HTMLElement || items instanceof SVGElement)) return [items];
  // @ts-ignore
  return _toConsumableArray(new Set(_toConsumableArray(items)));
});

// @ts-check

/**
 * Updates element style left, top, width, height values
 * according to pos input object.
 * @param {HTMLElement} element
 * @param {{left:number,top:number,width:number,height:number}} pos
 */
var updateElementStylePos = (function (element, pos) {
  element.style.left = "".concat(pos.left, "px");
  element.style.top = "".concat(pos.top, "px");
  element.style.width = "".concat(pos.width, "px");
  element.style.height = "".concat(pos.height, "px");
});

var Area = /*#__PURE__*/function () {
  /**
   * @type {DragSelect}
   * @private
   */

  /**
   * @type {{cleanup:() => void}}
   * @private
   */

  /**
   * @type {DSArea}
   * @private
   */

  /**
   * @type {DSArea[]}
   * @private
   */

  /**
   * @type {CSSStyleDeclaration}
   * @private
   * */

  /**
   * @type {{top:number,bottom:number,left:number,right:number}}
   * @private
   * */

  /**
   * @type {DSBoundingRect}
   * @private
   * */

  /**
   * @constructor Area
   * @param {{DS:DragSelect}} p
   * @ignore
   */
  function Area(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, Area);
    _defineProperty(this, "DS", void 0);
    _defineProperty(this, "_observers", void 0);
    _defineProperty(this, "_node", void 0);
    _defineProperty(this, "_parentNodes", void 0);
    _defineProperty(this, "_computedStyle", void 0);
    _defineProperty(this, "_computedBorder", void 0);
    _defineProperty(this, "_rect", void 0);
    _defineProperty(this, "setArea", function (area) {
      _this.reset();
      _this._node = area;
      handleElementPositionAttribute({
        computedStyle: _this.computedStyle,
        node: _this._node
      });

      // first immediate debounce to update values after dom-update
      setTimeout(function () {
        _this.DS.PubSub.publish('Area:modified:pre', {
          item: _this
        });
        _this.reset();
        _this.DS.PubSub.publish('Area:modified', {
          item: _this
        });
      });
    });
    _defineProperty(this, "start", function () {
      _this._observers = addModificationObservers(_this.parentNodes, debounce(function (event) {
        _this.DS.PubSub.publish('Area:modified:pre', {
          event: event,
          item: _this
        });
        _this.reset();
        _this.DS.PubSub.publish('Area:modified', {
          event: event,
          item: _this
        });
      }, 60));
    });
    _defineProperty(this, "reset", function () {
      _this._computedStyle = undefined;
      _this._rect = undefined;
      _this._computedBorder = undefined;
      _this._parentNodes = undefined;
    });
    _defineProperty(this, "stop", function () {
      _this._observers.cleanup();
      _this.reset();
    });
    _defineProperty(this, "scroll", function (directions, multiplier) {
      var data = {
        scroll_directions: directions,
        scroll_multiplier: multiplier
      };
      _this.DS.PubSub.publish('Area:scroll:pre', data);
      scrollElement(_this._node, directions, multiplier);
      _this.DS.PubSub.publish('Area:scroll', data);
    });
    this.DS = DS;
    this.setArea(this.DS.stores.SettingsStore.s.area);
    // @ts-ignore: @todo: update to typescript
    this.DS.PubSub.subscribe('Settings:updated:area', function (_ref2) {
      var settings = _ref2.settings;
      _this.setArea(settings.area);
    });
    this.DS.PubSub.subscribe('Interaction:init', this.start);
    this.DS.PubSub.subscribe('Interaction:end', this.reset);
  }

  /** @param {DSArea} area */
  _createClass(Area, [{
    key: "HTMLNode",
    get:
    /// ///////////////////////////////////////////////////////////////////////////////////
    // Node Getters

    function get() {
      return (/** @type {DSArea} */this._node
      );
    }

    /**
     * The computed border from the element (caches result)
     * @type {{top:number,bottom:number,left:number,right:number}}
     */
  }, {
    key: "computedBorder",
    get: function get() {
      if (this._computedBorder) return this._computedBorder;
      return {
        top: parseInt(this.computedStyle.borderTopWidth),
        bottom: parseInt(this.computedStyle.borderBottomWidth),
        left: parseInt(this.computedStyle.borderLeftWidth),
        right: parseInt(this.computedStyle.borderRightWidth)
      };
    }

    /**
     * The computed styles from the element (caches result)
     * @type {CSSStyleDeclaration}
     */
  }, {
    key: "computedStyle",
    get: function get() {
      if (this._computedStyle) return this._computedStyle;
      if (this.HTMLNode instanceof Document) return this._computedStyle = window.getComputedStyle(this.HTMLNode.body || this.HTMLNode.documentElement);
      return this._computedStyle = window.getComputedStyle(this.HTMLNode);
    }

    /**
     * The element rect (caches result) (without scrollbar or borders)
     * @type {DSBoundingRect}
     */
  }, {
    key: "rect",
    get: function get() {
      if (this._rect) return this._rect;
      return this._rect = getAreaRect(this.HTMLNode, this.DS.stores.SettingsStore.s.zoom);
    }
  }, {
    key: "parentNodes",
    get: function get() {
      if (this._parentNodes) return this._parentNodes;
      return this._parentNodes = getAllParentNodes(this.HTMLNode);
    }
  }]);
  return Area;
}();

var Drag = /*#__PURE__*/function () {
  /**
   * @type {Vect2}
   * @private
   */

  /**
   * @type {Vect2}
   * @private
   */

  /**
   * @type {DSElements}
   * @private
   */

  /**
   * @type {DSDragKeys}
   * @private
   */

  /**
   * @type {string[]}
   * @private
   */

  /**
   * @type {DSBoundingRect}
   * @private
   */

  /**
   * @constructor Drag
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  function Drag(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, Drag);
    _defineProperty(this, "_prevCursorPos", void 0);
    _defineProperty(this, "_prevScrollPos", void 0);
    _defineProperty(this, "_elements", []);
    _defineProperty(this, "_dragKeys", void 0);
    _defineProperty(this, "_dragKeysFlat", []);
    _defineProperty(this, "_selectionRect", void 0);
    _defineProperty(this, "assignDragkeys", function () {
      _this._dragKeys = {
        up: _this.DS.stores.SettingsStore.s.dragKeys.up.map(function (k) {
          return k.toLowerCase();
        }),
        down: _this.DS.stores.SettingsStore.s.dragKeys.down.map(function (k) {
          return k.toLowerCase();
        }),
        left: _this.DS.stores.SettingsStore.s.dragKeys.left.map(function (k) {
          return k.toLowerCase();
        }),
        right: _this.DS.stores.SettingsStore.s.dragKeys.right.map(function (k) {
          return k.toLowerCase();
        })
      };
      _this._dragKeysFlat = [].concat(_toConsumableArray(_this._dragKeys.up), _toConsumableArray(_this._dragKeys.down), _toConsumableArray(_this._dragKeys.left), _toConsumableArray(_this._dragKeys.right));
    });
    _defineProperty(this, "keyboardDrag", function (_ref2) {
      var event = _ref2.event,
        key = _ref2.key;
      var _key = key.toLowerCase();
      if (!_this.DS.stores.SettingsStore.s.keyboardDrag || !_this._dragKeysFlat.includes(_key) || !_this.DS.SelectedSet.size || !_this.DS.stores.SettingsStore.s.draggability || _this.DS["continue"]) return;
      var publishData = {
        event: event,
        isDragging: true,
        isDraggingKeyboard: true
      };
      _this.DS.publish(['Interaction:start:pre', 'Interaction:start'], publishData);
      _this._elements = _this.DS.getSelection();
      if (_this.DS.stores.SettingsStore.s.dragAsBlock) _this._selectionRect = getBoundingClientRect(_this._elements, _this.DS.SelectableSet);
      _this.handleZIndex(true);
      var posDirection = handleKeyboardDragPosDifference({
        shiftKey: _this.DS.stores.KeyStore.currentValues.includes('shift'),
        keyboardDragSpeed: _this.DS.stores.SettingsStore.s.keyboardDragSpeed,
        zoom: _this.DS.stores.SettingsStore.s.zoom,
        key: _key,
        scrollCallback: _this.DS.Area.scroll,
        scrollDiff: _this._scrollDiff,
        canScroll: _this.DS.stores.ScrollStore.canScroll,
        dragKeys: _this._dragKeys
      });
      if (_this.DS.stores.SettingsStore.s.dragAsBlock) posDirection = _this.limitDirection(posDirection);
      _this._elements.forEach(function (element) {
        return moveElement({
          element: element,
          posDirection: posDirection,
          containerRect: _this.DS.SelectorArea.rect,
          useTransform: _this.DS.stores.SettingsStore.s.useTransform
        });
      });
      _this.DS.publish(['Interaction:update:pre', 'Interaction:update'], publishData);
    });
    _defineProperty(this, "keyboardEnd", function (_ref3) {
      var event = _ref3.event,
        key = _ref3.key;
      var _key = key.toLowerCase();
      if (!_this.DS.stores.SettingsStore.s.keyboardDrag || !_this._dragKeysFlat.includes(_key) || !_this.DS.SelectedSet.size || !_this.DS.stores.SettingsStore.s.draggability) return;
      var publishData = {
        event: event,
        isDragging: _this.DS.stores.SettingsStore.s.draggability,
        isDraggingKeyboard: true
      };
      _this.DS.publish(['Interaction:end:pre', 'Interaction:end'], publishData);
    });
    _defineProperty(this, "start", function (_ref4) {
      var isDragging = _ref4.isDragging,
        isDraggingKeyboard = _ref4.isDraggingKeyboard;
      if (!isDragging || isDraggingKeyboard) return;
      _this._prevCursorPos = null;
      _this._prevScrollPos = null;
      _this._elements = _this.DS.getSelection();
      if (_this.DS.stores.SettingsStore.s.dragAsBlock) _this._selectionRect = getBoundingClientRect(_this._elements, _this.DS.SelectableSet);
      _this.handleZIndex(true);
    });
    _defineProperty(this, "stop", function (evt) {
      if (evt !== null && evt !== void 0 && evt.isKeyboard) return;
      _this._prevCursorPos = null;
      _this._prevScrollPos = null;
      _this.handleZIndex(false);
      _this._elements = [];
    });
    _defineProperty(this, "update", function (_ref5) {
      var isDragging = _ref5.isDragging,
        isDraggingKeyboard = _ref5.isDraggingKeyboard;
      if (!isDragging || !_this._elements.length || isDraggingKeyboard || _this.DS["continue"]) return;
      var posDirection = calc(_this._cursorDiff, '+', _this._scrollDiff);
      if (_this.DS.stores.SettingsStore.s.dragAsBlock) posDirection = _this.limitDirection(posDirection);
      _this._elements.forEach(function (element) {
        return moveElement({
          element: element,
          posDirection: posDirection,
          containerRect: _this.DS.SelectorArea.rect,
          useTransform: _this.DS.stores.SettingsStore.s.useTransform
        });
      });
    });
    _defineProperty(this, "limitDirection", function (direction) {
      var containerRect = _this.DS.SelectorArea.rect;
      var scrollAmount = _this.DS.stores.ScrollStore.scrollAmount;
      var delta = {
        top: containerRect.top - _this._selectionRect.top + scrollAmount.y,
        left: containerRect.left - _this._selectionRect.left + scrollAmount.x,
        bottom: containerRect.bottom - _this._selectionRect.bottom + scrollAmount.y,
        right: containerRect.right - _this._selectionRect.right + scrollAmount.x
      };
      if (direction.x === 0 && direction.y === 0) return direction;
      if (direction.y < 0) direction.y = Math.max(direction.y, delta.top);
      if (direction.x < 0) direction.x = Math.max(direction.x, delta.left);
      if (direction.y > 0) direction.y = Math.min(direction.y, delta.bottom);
      if (direction.x > 0) direction.x = Math.min(direction.x, delta.right);
      _this._selectionRect.top += direction.y;
      _this._selectionRect.bottom += direction.y;
      _this._selectionRect.left += direction.x;
      _this._selectionRect.right += direction.x;
      return direction;
    });
    _defineProperty(this, "handleZIndex", function (add) {
      _this._elements.forEach(function (element) {
        return element.style.zIndex = "".concat((parseInt(element.style.zIndex) || 0) + add ? 9999 : -9998);
      });
    });
    this.DS = DS;

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:dragKeys', this.assignDragkeys);
    this.assignDragkeys();
    this.DS.subscribe('Interaction:start', this.start);
    this.DS.subscribe('Interaction:end', this.stop);
    this.DS.subscribe('Interaction:update', this.update);
    this.DS.subscribe('KeyStore:down', this.keyboardDrag);
    this.DS.subscribe('KeyStore:up', this.keyboardEnd);
  }
  _createClass(Drag, [{
    key: "_cursorDiff",
    get: function get() {
      var currentPointerVal = this.DS.stores.PointerStore.currentVal;
      var cursorDiff = this._prevCursorPos ? calc(currentPointerVal, '-', this._prevCursorPos) : {
        x: 0,
        y: 0
      };
      this._prevCursorPos = currentPointerVal;
      return cursorDiff;
    }
  }, {
    key: "_scrollDiff",
    get: function get() {
      var currentScrollVal = this.DS.stores.ScrollStore.currentVal;
      var scrollDiff = this._prevScrollPos ? calc(currentScrollVal, '-', this._prevScrollPos) : {
        x: 0,
        y: 0
      };
      this._prevScrollPos = currentScrollVal;
      return scrollDiff;
    }
  }]);
  return Drag;
}();

var DropZone = /*#__PURE__*/function () {
  /**
   * @type {string}
   */

  /**
   * @type {DSElement}
   */

  /**
   * @type {DSElements}
   */

  /**
   * @type {DOMRect}
   * @private
   */

  /**
   * @type {{cleanup:()=>void}}
   * @private
   */

  /**
   * @type {NodeJS.Timeout}
   * @private
   */

  /**
   * @type {DSElements}
   * @private
   */

  /**
   * @type {DSElements}
   * @private
   */

  /**
   * @constructor Drag
   * @param {Object} obj
   * @param {DragSelect} obj.DS
   * @param {string} obj.id
   * @param {DSElement} obj.element
   * @param {DSInputElements} [obj.droppables]
   * @ignore
   */
  function DropZone(_ref) {
    var _this = this;
    var DS = _ref.DS,
      id = _ref.id,
      element = _ref.element,
      droppables = _ref.droppables;
    _classCallCheck(this, DropZone);
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "_droppables", void 0);
    _defineProperty(this, "_rect", void 0);
    _defineProperty(this, "_observers", void 0);
    _defineProperty(this, "_timeout", void 0);
    _defineProperty(this, "_itemsDropped", []);
    _defineProperty(this, "_itemsInside", void 0);
    _defineProperty(this, "setReadyClasses", function (action) {
      if (_this.isDestroyed) return;
      var selectedEls = _this.droppables.filter(function (el) {
        return _this.DS.SelectedSet.has(el);
      });
      if (!selectedEls.length) return;
      selectedEls.forEach(function (item) {
        item.classList[action]("".concat(_this.Settings.droppableClass));
        item.classList[action]("".concat(_this.Settings.droppableClass, "-").concat(_this.id));
      });
      _this.element.classList[action]("".concat(_this.Settings.dropZoneReadyClass));
    });
    _defineProperty(this, "handleNoDrop", function () {
      var _this$_itemsDropped;
      if (_this.isDestroyed) return;
      // for each selected element that is not part of the target zone, remove the classes
      _this.DS.SelectedSet.forEach(function (item) {
        item.classList.remove(_this.Settings.droppedTargetClass);
        item.classList.remove("".concat(_this.Settings.droppedTargetClass, "-").concat(_this.id));
      });
      // and remove them from the zones dropped items
      _this._itemsDropped = _this._itemsDropped.filter(function (item) {
        return !_this.DS.SelectedSet.has(item);
      });
      // if the zone has no dropped left, also remove the zones class
      if (!((_this$_itemsDropped = _this._itemsDropped) !== null && _this$_itemsDropped !== void 0 && _this$_itemsDropped.length)) _this.element.classList.remove("".concat(_this.Settings.dropZoneTargetClass));
    });
    _defineProperty(this, "handleDrop", function () {
      var _this$droppables, _this$_itemsDropped2, _this$_itemsDropped3;
      if (_this.isDestroyed) return;
      _this._itemsDropped = _toConsumableArray(new Set([].concat(_toConsumableArray(_this._itemsDropped), _toConsumableArray((_this$droppables = _this.droppables) === null || _this$droppables === void 0 ? void 0 : _this$droppables.filter(function (item) {
        return _this.DS.SelectedSet.has(item);
      })))));
      // add the target class to the zones dropped items
      (_this$_itemsDropped2 = _this._itemsDropped) === null || _this$_itemsDropped2 === void 0 ? void 0 : _this$_itemsDropped2.forEach(function (item) {
        item.classList.add("".concat(_this.Settings.droppedTargetClass));
        item.classList.add("".concat(_this.Settings.droppedTargetClass, "-").concat(_this.id));
      });
      // if the zone has dropped, add the zones class
      if ((_this$_itemsDropped3 = _this._itemsDropped) !== null && _this$_itemsDropped3 !== void 0 && _this$_itemsDropped3.length) _this.element.classList.add("".concat(_this.Settings.dropZoneTargetClass));
    });
    _defineProperty(this, "handleItemsInsideClasses", function () {
      var isAnyInside = false;
      _this.droppables.forEach(function (item) {
        if (_this.itemsInside.includes(item)) {
          item.classList.add("".concat(_this.Settings.droppedInsideClass));
          item.classList.add("".concat(_this.Settings.droppedInsideClass, "-").concat(_this.id));
          isAnyInside = true;
        } else {
          item.classList.remove("".concat(_this.Settings.droppedInsideClass, "-").concat(_this.id));
          if (!item.className.includes("".concat(_this.Settings.droppedInsideClass, "-"))) item.classList.remove("".concat(_this.Settings.droppedInsideClass));
        }
      });
      if (isAnyInside) _this.element.classList.add("".concat(_this.Settings.dropZoneInsideClass));else _this.element.classList.remove("".concat(_this.Settings.dropZoneInsideClass));
    });
    _defineProperty(this, "start", function (_ref2) {
      var isDragging = _ref2.isDragging;
      if (!isDragging || _this.isDestroyed) return;
      _this.setReadyClasses('add');
    });
    _defineProperty(this, "stop", function (_ref3) {
      var isDragging = _ref3.isDragging;
      if (!isDragging || _this.isDestroyed) return;
      _this.setReadyClasses('remove');
      _this.handleItemsInsideClasses();
    });
    _defineProperty(this, "toObject", function () {
      return {
        id: _this.id,
        element: _this.element,
        droppables: _this.droppables,
        itemsDropped: _this.itemsDropped,
        itemsInside: _this.itemsInside
      };
    });
    this.DS = DS;
    this.Settings = DS.stores.SettingsStore.s;
    this.id = id;
    this.element = element;
    if (droppables) this.droppables = toArray(droppables);
    this.element.classList.add("".concat(this.Settings.dropZoneClass));

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:dropZoneClass', function (_ref4) {
      var settings = _ref4.settings;
      if (!_this.element) return;
      _this.element.classList.remove(settings['dropZoneClass:pre']);
      _this.element.classList.add(settings.dropZoneClass);
    });
    this._observers = addModificationObservers(this.parentNodes, debounce(function () {
      return _this._rect = null;
    }, this.Settings.refreshMemoryRate));
    this.DS.subscribe('Interaction:start', this.start);
    this.DS.subscribe('Interaction:end', this.stop);
  }

  /**
   * @param {'add'|'remove'} action
   */
  _createClass(DropZone, [{
    key: "destroy",
    value: function destroy() {
      var _this2 = this;
      this._observers.cleanup();
      this.element.classList.remove("".concat(this.Settings.dropZoneClass));
      this.element.classList.remove("".concat(this.Settings.dropZoneTargetClass));
      this.element.classList.remove("".concat(this.Settings.dropZoneReadyClass));
      this.droppables.forEach(function (item) {
        item.classList.remove("".concat(_this2.Settings.droppedTargetClass));
        item.classList.remove("".concat(_this2.Settings.droppedTargetClass, "-").concat(_this2.id));
        item.classList.remove("".concat(_this2.Settings.droppableClass));
        item.classList.remove("".concat(_this2.Settings.droppableClass, "-").concat(_this2.id));
      });
      this.DS.unsubscribe('Interaction:start', this.start);
      this.DS.unsubscribe('Interaction:end', this.stop);
      this.element = null;
      this.droppables = null;
      this.id = null;
      this._itemsDropped = null;
      this._itemsInside = null;
      this.isDestroyed = true;
    }

    /**
     * @returns {DSDropZone}
     */
  }, {
    key: "rect",
    get: function get() {
      if (this.isDestroyed) return null;
      if (this._rect) return this._rect;
      return this._rect = this.element.getBoundingClientRect();
    }
  }, {
    key: "itemsDropped",
    get: function get() {
      if (this.isDestroyed) return null;
      return this._itemsDropped;
    }
  }, {
    key: "itemsInside",
    get: function get() {
      var _this3 = this;
      if (this.isDestroyed) return null;
      if (this._itemsInside) return this._itemsInside;
      this._itemsInside = this.droppables.flatMap(function (item) {
        if (isCollision(_this3.DS.SelectableSet.rects.get(item), _this3.rect, _this3.Settings.dropInsideThreshold)) return [item];
        return [];
      });

      // since elements can be moved while this getter is called, we need to update the values every X seconds
      if (this._timeout) clearTimeout(this._timeout);
      this._timeout = setTimeout(function () {
        return _this3._itemsInside = null;
      }, this.Settings.refreshMemoryRate);
      return this._itemsInside;
    }
  }, {
    key: "parentNodes",
    get: function get() {
      if (this._parentNodes) return this._parentNodes;
      return this._parentNodes = getAllParentNodes(this.element);
    }
  }, {
    key: "droppables",
    get: function get() {
      if (this._droppables) return this._droppables;
      return this.DS.SelectableSet.elements;
    },
    set: function set(value) {
      this._droppables = value;
    }
  }]);
  return DropZone;
}();

var DropZones = /*#__PURE__*/_createClass(
/**
 * Get the drop zone by the zone element
 * @type {Map<DSElement, DropZone>}
 * @private
 */

/**
 * Get the drop zone by the zone id
 * @type {Map<string, DropZone>}
 * @private
 */

/**
 * Get the drop zones by one zone item
 * @type {Map<DSElement,DropZone[]>}
 * @private
 */

/**
 * Get the drop zones by one zone item
 * @type {DropZone[]}
 * @private
 */

/**
 * @constructor Drag
 * @param {{DS:DragSelect}} obj
 * @ignore
 */
function DropZones(_ref) {
  var _this = this;
  var DS = _ref.DS;
  _classCallCheck(this, DropZones);
  _defineProperty(this, "_zoneByElement", new Map());
  _defineProperty(this, "_zoneById", new Map());
  _defineProperty(this, "_zonesByDroppable", new Map());
  _defineProperty(this, "_zones", void 0);
  _defineProperty(this, "setDropZones", function (_ref2) {
    var dropZones = _ref2.dropZones;
    if (!dropZones) return;
    if (_this._zones) _this._zones.forEach(function (zone) {
      return zone.destroy();
    });
    _this._zones = dropZones.map(function (zone) {
      return new DropZone(_objectSpread2({
        DS: _this.DS
      }, zone));
    });
    _this._zones.forEach(function (zone) {
      _this._zoneByElement.set(zone.element, zone);
      _this._zoneById.set(zone.id, zone);
      zone.droppables.forEach(function (droppable) {
        var zones = _this._zonesByDroppable.get(droppable);
        if (!(zones !== null && zones !== void 0 && zones.length)) return _this._zonesByDroppable.set(droppable, [zone]);
        // @ts-ignore
        _this._zonesByDroppable.set(droppable, _toConsumableArray(new Set([].concat(_toConsumableArray(zones), [zone]))));
      });
    });
  });
  _defineProperty(this, "_handleDrop", function (target) {
    _this._zones.forEach(function (zone) {
      if (zone === target) return;
      zone.handleNoDrop();
    });
    if (!target) return;
    target.handleDrop();
  });
  _defineProperty(this, "_getZoneByElementsFromPoint", function (elements, _ref3) {
    var x = _ref3.x,
      y = _ref3.y;
    for (var i = 0, il = elements.length; i < il; i++) {
      var zone = _this._zoneByElement.get(elements[i]);
      if (zone && isCollision(zone.rect, {
        left: x,
        right: x,
        top: y,
        bottom: y
      }, Math.min(_this.Settings.dropTargetThreshold, 0.5))) {
        return zone;
      }
    }
  });
  _defineProperty(this, "stop", function (_ref4) {
    var isDragging = _ref4.isDragging;
    if (!isDragging) return;
    var target = _this.getTarget();
    _this._handleDrop(target);
  });
  _defineProperty(this, "getItemsDroppedById", function (zoneId) {
    var zone = _this._zoneById.get(zoneId);
    if (!zone) return console.warn("[DragSelect] No zone found (id: ".concat(zoneId, ")"));
    return zone.itemsDropped;
  });
  _defineProperty(this, "getItemsInsideById", function (zoneId, addClasses) {
    var zone = _this._zoneById.get(zoneId);
    if (!zone) return console.warn("[DragSelect] No zone found (id: ".concat(zoneId, ")"));
    var itemsInside = zone.itemsInside;
    if (addClasses) zone.handleItemsInsideClasses();
    return itemsInside;
  });
  _defineProperty(this, "getTarget", function (coordinates) {
    var _this$_zones;
    if (!((_this$_zones = _this._zones) !== null && _this$_zones !== void 0 && _this$_zones.length)) return;
    var x = (coordinates === null || coordinates === void 0 ? void 0 : coordinates.x) || _this.DS.stores.PointerStore.currentVal.x;
    var y = (coordinates === null || coordinates === void 0 ? void 0 : coordinates.y) || _this.DS.stores.PointerStore.currentVal.y;
    var elements = document.elementsFromPoint(x, y);
    return _this._getZoneByElementsFromPoint( /** @type {DSElements} */elements, {
      x: x,
      y: y
    });
  });
  this.DS = DS;
  this.Settings = DS.stores.SettingsStore.s;

  // @ts-ignore: @todo: update to typescript
  this.DS.subscribe('Settings:updated:dropZones', function (_ref5) {
    var settings = _ref5.settings;
    return _this.setDropZones(settings);
  });
  this.setDropZones({
    dropZones: /** @type {DSDropZone[]} */this.DS.stores.SettingsStore.s.dropZones
  });
  this.DS.subscribe('Interaction:end', this.stop);
}

/**
 * @param {Object} obj
 * @param {DSDropZone[]} [obj.dropZones]
 */);

var Interaction = /*#__PURE__*/function () {
  /** @type {boolean} */

  /** @type {boolean} */

  /**
   * @constructor Interaction
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  function Interaction(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, Interaction);
    _defineProperty(this, "isInteracting", void 0);
    _defineProperty(this, "isDragging", void 0);
    _defineProperty(this, "init", function () {
      return _this.DS.publish('Interaction:init:pre', {});
    });
    _defineProperty(this, "_init", function () {
      _this.stop();

      // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
      if (_this.Settings.usePointerEvents) _this.DS.Area.HTMLNode.addEventListener('pointerdown', _this.start, {
        passive: false
      });else _this.DS.Area.HTMLNode.addEventListener('mousedown', _this.start);
      _this.DS.Area.HTMLNode.addEventListener('touchstart', _this.start, {
        passive: false
      });
      _this.DS.publish('Interaction:init', {});
    });
    _defineProperty(this, "start", function (event) {
      return _this.DS.publish('Interaction:start:pre', {
        event: event,
        isDragging: _this.isDragging
      });
    });
    _defineProperty(this, "_start", function (event) {
      if (event.type === 'touchstart') event.preventDefault(); // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
      if (!_this._canInteract(event)) return;
      _this.isInteracting = true;
      _this.isDragging = _this.isDragEvent(event);
      _this.DS.publish('Interaction:start', {
        event: event,
        isDragging: _this.isDragging
      });

      // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
      if (_this.Settings.usePointerEvents) {
        document.addEventListener('pointerup', _this.reset);
        document.addEventListener('pointercancel', _this.reset);
      } else document.addEventListener('mouseup', _this.reset);
      document.addEventListener('touchend', _this.reset);
    });
    _defineProperty(this, "isDragEvent", function (event) {
      var clickedElement = /** @type {Element} */event.target.closest(".".concat(_this.Settings.selectableClass));
      if (!_this.Settings.draggability || _this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) || !clickedElement) return false;
      if (_this.Settings.immediateDrag) {
        if (!_this.DS.SelectedSet.size) _this.DS.SelectedSet.add( /** @type {DSElement} */clickedElement);else if (!_this.DS.SelectedSet.has(clickedElement)) {
          _this.DS.SelectedSet.clear();
          _this.DS.SelectedSet.add( /** @type {DSElement} */clickedElement);
        }
      }
      if (_this.DS.SelectedSet.has(clickedElement)) return true;
      return false;
    });
    _defineProperty(this, "onClick", function (_ref2) {
      var event = _ref2.event;
      if (!_this._canInteract(event)) return;
      if (event.detail > 0) return; // mouse interaction

      var _this$DS = _this.DS,
        _this$DS$stores = _this$DS.stores,
        PointerStore = _this$DS$stores.PointerStore,
        KeyStore = _this$DS$stores.KeyStore,
        SelectableSet = _this$DS.SelectableSet,
        SelectedSet = _this$DS.SelectedSet;
      PointerStore.start(event);
      var node = /** @type {any} */event.target;
      if (!SelectableSet.has(node)) return;
      if (!KeyStore.isMultiSelectKeyPressed(event)) SelectedSet.clear();
      SelectedSet.toggle(node);
      _this.reset(); // simulate mouse-up (that does not exist on keyboard)
    });
    _defineProperty(this, "stop", function () {
      var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.DS.Area.HTMLNode;
      _this.isInteracting = false;
      _this.isDragging = false;

      // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
      if (_this.Settings.usePointerEvents) {
        area.removeEventListener('pointerdown', _this.start, {
          // @ts-ignore
          passive: false
        });
        document.removeEventListener('pointerup', _this.reset);
        document.removeEventListener('pointercancel', _this.reset);
      } else {
        area.removeEventListener('mousedown', _this.start);
        document.removeEventListener('mouseup', _this.reset);
      }
      area.removeEventListener('touchstart', _this.start, {
        // @ts-ignore
        passive: false
      });
      document.removeEventListener('touchend', _this.reset);
    });
    _defineProperty(this, "update", function (_ref3) {
      var event = _ref3.event,
        scroll_directions = _ref3.scroll_directions,
        scroll_multiplier = _ref3.scroll_multiplier;
      if (_this.isInteracting) _this.DS.publish(['Interaction:update:pre', 'Interaction:update'], {
        event: event,
        scroll_directions: scroll_directions,
        scroll_multiplier: scroll_multiplier,
        isDragging: _this.isDragging
      });
    });
    _defineProperty(this, "reset", function (event) {
      return _this.DS.publish('Interaction:end:pre', {
        event: event,
        isDragging: _this.isDragging
      });
    });
    _defineProperty(this, "_reset", function (event) {
      var isDragging = _this.isDragging;
      _this.stop();
      _this.init();
      _this.DS.publish('Interaction:end', {
        event: event,
        isDragging: isDragging
      });
    });
    this.DS = DS;
    this.Settings = DS.stores.SettingsStore.s;
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:area', function (_ref4) {
      var settings = _ref4.settings;
      _this.stop(settings['area:pre']);
      _this.init();
    });
    this.DS.subscribe('PointerStore:updated', this.update);
    this.DS.subscribe('Selectable:click', this.onClick);
    this.DS.subscribe('Selectable:pointer', function (_ref5) {
      var event = _ref5.event;
      return _this.start(event);
    });
    this.DS.subscribe('Interaction:start:pre', function (_ref6) {
      var event = _ref6.event;
      return _this._start(event);
    });
    this.DS.subscribe('Interaction:init:pre', this._init);
    this.DS.subscribe('Interaction:end:pre', function (_ref7) {
      var event = _ref7.event;
      return _this._reset(event);
    });
    this.DS.subscribe('Area:scroll', this.update);
  }
  _createClass(Interaction, [{
    key: "_canInteract",
    value:
    /**
     * @param {DSEvent} event
     */
    function _canInteract(event) {
      var isKeyboardClick = /** @type {MouseEvent} */event.clientX === 0 && /** @type {MouseEvent} */event.clientY === 0 && /** @type {MouseEvent} */event.detail === 0 && event.target;
      if ( /** @type {MouseEvent} */event.button === 2 ||
      // right-clicks
      this.isInteracting ||
      // fix double-click issues
      event.target && !this.DS.SelectorArea.isInside( /** @type {DSElement} */event.target) ||
      // fix outside elements issue
      !isKeyboardClick && !this.DS.SelectorArea.isClicked(event) // make sure the mouse click is inside the area
      ) return false;
      return true;
    }

    /**
     * @param {DSEvent} event
     */
  }]);
  return Interaction;
}();

var PubSub = /*#__PURE__*/_createClass(function PubSub(_ref) {
  var _this = this;
  var DS = _ref.DS;
  _classCallCheck(this, PubSub);
  _defineProperty(this, "subscribers", {});
  _defineProperty(this, "subscribe", function (eventName, callback) {
    if (!Array.isArray(_this.subscribers[eventName])) _this.subscribers[eventName] = [];
    _this.subscribers[eventName].push(callback);
    return _this.subscribers[eventName].length - 1;
  });
  _defineProperty(this, "unsubscribe", function (eventName, callback, id) {
    if (id >= 0) _this.subscribers[eventName].splice(id, 1);else if (callback) _this.subscribers[eventName] = _this.subscribers[eventName].filter(function (cb) {
      return cb !== callback;
    });
  });
  _defineProperty(this, "publish", function (eventName, data) {
    if (Array.isArray(eventName)) eventName.forEach(function (name) {
      return _this._publish(name, data);
    });else _this._publish(eventName, data);
  });
  _defineProperty(this, "_publish", function (eventName, data) {
    var subscribers = _this.subscribers[eventName];
    if (!Array.isArray(subscribers)) return;
    if (eventName.includes(":pre")) _this._handlePrePublish(subscribers, data);else _this._handlePublish(subscribers, data);
  });
  _defineProperty(this, "_handlePublish", function (subscribers, data) {
    for (var i = 0, il = subscribers.length; i < il; i++) {
      if (_this.DS.stopped) return;
      subscribers[i](data);
    }
  });
  _defineProperty(this, "_handlePrePublish", function (subscribers, data) {
    var i = subscribers.length;
    while (i--) {
      if (_this.DS.stopped) return;
      subscribers[i](data);
    }
  });
  this.DS = DS;
}

/**
 * Subscribe to an event
 * @memberof DragSelect#
 * @function subscribe
 * @param {DSCallbackNames} eventName
 * @param {DSCallback} callback
 * @returns {number} event id, can be used to unsubscribe more efficiently
 */);

var SelectableSet = /*#__PURE__*/function (_Set) {
  _inherits(SelectableSet, _Set);
  var _super = _createSuper(SelectableSet);
  /**
   * @type {Map<DSElement,DSBoundingRect>}
   * @private
   */

  /**
   * @type {NodeJS.Timeout}
   * @private
   */

  /**
   * @constructor SelectableSet
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  function SelectableSet(_ref) {
    var _this;
    var DS = _ref.DS;
    _classCallCheck(this, SelectableSet);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_rects", void 0);
    _defineProperty(_assertThisInitialized(_this), "_timeout", void 0);
    _defineProperty(_assertThisInitialized(_this), "init", function () {
      return toArray(_this.Settings.selectables).forEach(function (el) {
        return _this.add(el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      return _this.forEach(function (el) {
        return _this["delete"](el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_onClick", function (event) {
      return _this.DS.publish(['Selectable:click:pre', 'Selectable:click'], {
        event: event
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_onPointer", function (event) {
      return _this.DS.publish(['Selectable:pointer:pre', 'Selectable:pointer'], {
        event: event
      });
    });
    _defineProperty(_assertThisInitialized(_this), "addAll", function (elements) {
      return elements.forEach(function (el) {
        return _this.add(el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "deleteAll", function (elements) {
      return elements.forEach(function (el) {
        return _this["delete"](el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getRect", function (element) {
      return _this._rects ? _this.rects.get(element) : element.getBoundingClientRect();
    });
    _this.DS = DS;
    _this.Settings = DS.stores.SettingsStore.s;
    _this.DS.subscribe('Interaction:init', _this.init);
    // @ts-ignore: @todo: update to typescript
    _this.DS.PubSub.subscribe('Settings:updated:selectables', function () {
      _this.clear();
      _this.init();
    });
    // @ts-ignore: @todo: update to typescript
    _this.DS.subscribe('Settings:updated:selectableClass', function (_ref2) {
      var settings = _ref2.settings;
      _this.forEach(function (el) {
        el.classList.remove(settings['selectableClass:pre']);
        el.classList.add(settings.selectableClass);
      });
    });
    return _this;
  }
  _createClass(SelectableSet, [{
    key: "add",
    value:
    /** 
     * @param {DSElement} element
     * @return {this}
     * */
    function add(element) {
      if (_get(_getPrototypeOf(SelectableSet.prototype), "has", this).call(this, element)) return this;
      var publishData = {
        items: this.elements,
        item: element
      };
      this.DS.publish('Selectable:added:pre', publishData);
      element.classList.add(this.Settings.selectableClass);
      element.addEventListener('click', this._onClick);
      if (this.Settings.usePointerEvents) element.addEventListener('pointerdown', this._onPointer, {
        // @ts-ignore
        passive: false
      });else element.addEventListener('mousedown', this._onPointer);
      element.addEventListener('touchstart', this._onPointer, {
        // @ts-ignore
        passive: false
      });
      if (this.Settings.draggability && !this.Settings.useTransform) handleElementPositionAttribute({
        computedStyle: window.getComputedStyle(element),
        node: element
      });
      _get(_getPrototypeOf(SelectableSet.prototype), "add", this).call(this, element);
      this.DS.publish('Selectable:added', publishData);
      return this;
    }

    /** @param {DSElement} element */
  }, {
    key: "delete",
    value: function _delete(element) {
      if (!_get(_getPrototypeOf(SelectableSet.prototype), "has", this).call(this, element)) return true;
      var publishData = {
        items: this.elements,
        item: element
      };
      this.DS.publish('Selectable:removed:pre', publishData);
      element.classList.remove(this.Settings.selectableClass);
      element.classList.remove(this.Settings.hoverClass);
      element.removeEventListener('click', this._onClick);
      if (this.Settings.usePointerEvents) element.removeEventListener('pointerdown', this._onPointer, {
        // @ts-ignore
        passive: false
      });else element.removeEventListener('mousedown', this._onPointer);
      element.removeEventListener('touchstart', this._onPointer, {
        // @ts-ignore
        passive: false
      });
      _get(_getPrototypeOf(SelectableSet.prototype), "delete", this).call(this, element);
      this.DS.publish('Selectable:removed', publishData);
      return true;
    }
  }, {
    key: "elements",
    get: /** @return {DSElements} */
    function get() {
      return Array.from(this.values());
    }
  }, {
    key: "rects",
    get: function get() {
      var _this2 = this;
      if (this._rects) return this._rects;
      this._rects = new Map();
      this.forEach(function (element) {
        return _this2._rects.set(element, element.getBoundingClientRect());
      });

      // since elements can be moved, we need to update the rects every X ms
      if (this._timeout) clearTimeout(this._timeout);
      this._timeout = setTimeout(function () {
        return _this2._rects = null;
      }, this.Settings.refreshMemoryRate);
      return this._rects;
    }
  }]);
  return SelectableSet;
}( /*#__PURE__*/_wrapNativeSuper(Set));

var SelectedSet = /*#__PURE__*/function (_Set) {
  _inherits(SelectedSet, _Set);
  var _super = _createSuper(SelectedSet);
  /**
   * @constructor SelectableSet
   * @param {{DS:DragSelect}} obj
   * @ignore
   */
  function SelectedSet(_ref) {
    var _this;
    var DS = _ref.DS;
    _classCallCheck(this, SelectedSet);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      return _this.forEach(function (el) {
        return _this["delete"](el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "addAll", function (elements) {
      return elements.forEach(function (el) {
        return _this.add(el);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "deleteAll", function (elements) {
      return elements.forEach(function (el) {
        return _this["delete"](el);
      });
    });
    _this.DS = DS;
    return _this;
  }

  /** 
   * @param {DSElement} element
   * @return {this}
   * */
  _createClass(SelectedSet, [{
    key: "add",
    value: function add(element) {
      if (_get(_getPrototypeOf(SelectedSet.prototype), "has", this).call(this, element)) return this;
      var publishData = {
        items: this.elements,
        item: element
      };
      this.DS.publish('Selected:added:pre', publishData);
      _get(_getPrototypeOf(SelectedSet.prototype), "add", this).call(this, element);
      element.classList.add(this.DS.stores.SettingsStore.s.selectedClass);
      element.style.zIndex = "".concat((parseInt(element.style.zIndex) || 0) + 1);
      this.DS.publish('Selected:added', publishData);
      return this;
    }

    /** @param {DSElement} element */
  }, {
    key: "delete",
    value: function _delete(element) {
      if (!_get(_getPrototypeOf(SelectedSet.prototype), "has", this).call(this, element)) return true;
      var publishData = {
        items: this.elements,
        item: element
      };
      this.DS.publish('Selected:removed:pre', publishData);
      var deleted = _get(_getPrototypeOf(SelectedSet.prototype), "delete", this).call(this, element);
      element.classList.remove(this.DS.stores.SettingsStore.s.selectedClass);
      element.style.zIndex = "".concat((parseInt(element.style.zIndex) || 0) - 1);
      this.DS.publish('Selected:removed', publishData);
      return deleted;
    }
  }, {
    key: "toggle",
    value:
    /**
     * Adds/Removes an element. If it is already selected = remove, if not = add.
     * @param {DSElement} element
     * @return {DSElement}
     */
    function toggle(element) {
      if (this.has(element)) this["delete"](element);else this.add(element);
      return element;
    }

    /** @param {DSElements} elements */
  }, {
    key: "elements",
    get: /** @return {DSElements} */
    function get() {
      return Array.from(this.values());
    }
  }]);
  return SelectedSet;
}( /*#__PURE__*/_wrapNativeSuper(Set));

var Selection = /*#__PURE__*/function () {
  /**
   * @type {Set}
   * @private
   * */

  /**
   * @constructor Selection
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  function Selection(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, Selection);
    _defineProperty(this, "_prevSelectedSet", void 0);
    _defineProperty(this, "start", function (_ref2) {
      var event = _ref2.event,
        isDragging = _ref2.isDragging;
      if (isDragging) return;
      _this._storePrevious(event);
      _this._handleInsideSelection(true, event);
    });
    _defineProperty(this, "update", function (_ref3) {
      var isDragging = _ref3.isDragging;
      if (isDragging || _this.DS["continue"]) return;
      _this._handleInsideSelection();
    });
    _defineProperty(this, "_handleInsideSelection", function (force, event) {
      var _this$DS = _this.DS,
        SelectableSet = _this$DS.SelectableSet,
        SelectorArea = _this$DS.SelectorArea,
        Selector = _this$DS.Selector;
      var multiSelectionToggle = _this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) && _this.Settings.multiSelectToggling;
      var selectionThreshold = _this.Settings.selectionThreshold;

      /** @type {any} */
      var elRects = SelectableSet.rects;
      var selectorRect = Selector.rect;

      /** @type {Map<DSElement,DSBoundingRect>} */
      var select = new Map();
      /** @type {Map<DSElement,DSBoundingRect>} */
      var unselect = new Map();
      var _iterator = _createForOfIteratorHelper(elRects),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            element = _step$value[0],
            elementRect = _step$value[1];
          if (!SelectorArea.isInside(element, elementRect)) continue;
          if (isCollision(elementRect, selectorRect, selectionThreshold)) select.set(element, elementRect);else unselect.set(element, elementRect);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (_this.DS["continue"]) return;
      var _this$filterSelected = _this.filterSelected({
          select: select,
          unselect: unselect,
          selectorRect: selectorRect
        }),
        filteredSelect = _this$filterSelected.select,
        filteredUnselect = _this$filterSelected.unselect;
      filteredSelect.forEach(function (_, element) {
        return handleSelection({
          element: element,
          force: force,
          multiSelectionToggle: multiSelectionToggle,
          SelectedSet: _this.DS.SelectedSet,
          hoverClassName: _this.Settings.hoverClass
        });
      });
      filteredUnselect.forEach(function (_, element) {
        return handleUnSelection({
          element: element,
          force: force,
          SelectedSet: _this.DS.SelectedSet,
          hoverClassName: _this.Settings.hoverClass,
          PrevSelectedSet: _this._prevSelectedSet
        });
      });
    });
    _defineProperty(this, "filterSelected", function (_ref4) {
      var select = _ref4.select,
        unselect = _ref4.unselect;
        _ref4.selectorRect;
      return {
        select: select,
        unselect: unselect
      };
    });
    this.DS = DS;
    this.Settings = this.DS.stores.SettingsStore.s;
    this.DS.subscribe('Interaction:start', this.start);
    this.DS.subscribe('Interaction:update', this.update);
  }

  /**
   * Stores the previous selection (solves #9)
   * @param {DSEvent} event
   * @private
   * */
  _createClass(Selection, [{
    key: "_storePrevious",
    value: function _storePrevious(event) {
      var _this$DS2 = this.DS,
        KeyStore = _this$DS2.stores.KeyStore,
        SelectedSet = _this$DS2.SelectedSet;
      if (KeyStore.isMultiSelectKeyPressed(event)) this._prevSelectedSet = new Set(SelectedSet);else this._prevSelectedSet = new Set();
    }

    /** @param {{event:DSEvent,isDragging:boolean}} event */
  }]);
  return Selection;
}();

var Selector = /*#__PURE__*/function () {
  /**
   * @type {DSBoundingRect}
   * @private
   */

  /**
   * @constructor Selector
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  function Selector(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, Selector);
    _defineProperty(this, "_rect", void 0);
    _defineProperty(this, "attachSelector", function () {
      var _this$DS$SelectorArea, _this$DS$SelectorArea2;
      if (_this.HTMLNode && (_this$DS$SelectorArea = _this.DS.SelectorArea) !== null && _this$DS$SelectorArea !== void 0 && _this$DS$SelectorArea.HTMLNode) _this.DS.SelectorArea.HTMLNode.removeChild(_this.HTMLNode);
      _this.HTMLNode = _this.DS.stores.SettingsStore.s.selector || createSelectorElement(_this.DS.stores.SettingsStore.s.customStyles);
      _this.HTMLNode.classList.add(_this.DS.stores.SettingsStore.s.selectorClass);
      if (_this.HTMLNode && (_this$DS$SelectorArea2 = _this.DS.SelectorArea) !== null && _this$DS$SelectorArea2 !== void 0 && _this$DS$SelectorArea2.HTMLNode) _this.DS.SelectorArea.HTMLNode.appendChild(_this.HTMLNode);
    });
    _defineProperty(this, "start", function (_ref2) {
      var isDragging = _ref2.isDragging;
      if (isDragging) return;
      var PointerStore = _this.DS.stores.PointerStore;
      var pPos = PointerStore.initialValArea;
      updateElementStylePos(_this.HTMLNode, vect2rect(pPos, 1));
      _this.HTMLNode.style.display = 'block';
      _this._rect = null;
    });
    _defineProperty(this, "stop", function () {
      _this.HTMLNode.style.width = '0';
      _this.HTMLNode.style.height = '0';
      _this.HTMLNode.style.display = 'none';
    });
    _defineProperty(this, "update", function (_ref3) {
      var isDragging = _ref3.isDragging;
      if (isDragging || _this.DS["continue"]) return;
      var _this$DS$stores = _this.DS.stores,
        ScrollStore = _this$DS$stores.ScrollStore,
        PointerStore = _this$DS$stores.PointerStore;
      var pos = getSelectorPosition({
        scrollAmount: ScrollStore.scrollAmount,
        initialPointerPos: PointerStore.initialValArea,
        pointerPos: PointerStore.currentValArea
      });
      updateElementStylePos(_this.HTMLNode, pos);
      _this._rect = null;
    });
    this.DS = DS;

    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selectorClass', function (_ref4) {
      var settings = _ref4.settings;
      _this.HTMLNode.classList.remove(settings['selectorClass:pre']);
      _this.HTMLNode.classList.add(settings.selectorClass);
    });
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selector', this.attachSelector);
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:customStyles', this.attachSelector);
    this.attachSelector();
    this.DS.subscribe('Interaction:start', this.start);
    this.DS.subscribe('Interaction:update', this.update);
    this.DS.subscribe('Interaction:end', this.stop);
  }
  _createClass(Selector, [{
    key: "rect",
    get: function get() {
      if (this._rect) return this._rect;
      return this._rect = this.HTMLNode.getBoundingClientRect();
    }
  }]);
  return Selector;
}();

var SelectorArea = /*#__PURE__*/function () {
  /**
   * @type {*}
   * @private
   * */

  /**
   * @type {DSBoundingRect}
   * @private
   */

  /**
   * @type {DSEdges}
   * @private
   */

  /**
   * @class SelectorArea
   * @constructor SelectorArea
   * @param {{ DS:DragSelect }} obj
   * @ignore
   */
  function SelectorArea(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, SelectorArea);
    _defineProperty(this, "_scrollInterval", void 0);
    _defineProperty(this, "_rect", void 0);
    _defineProperty(this, "currentEdges", []);
    _defineProperty(this, "start", function () {
      _this.applyElements('append');
      _this.updatePos();
    });
    _defineProperty(this, "applyElements", function () {
      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'append';
      var docEl = document.body ? 'body' : 'documentElement';
      var methodName = "".concat(method, "Child");
      _this.HTMLNode[methodName](_this.DS.Selector.HTMLNode);
      document[docEl][methodName](_this.HTMLNode);
    });
    _defineProperty(this, "updatePos", function () {
      _this._rect = null;
      var rect = _this.DS.Area.rect;
      var border = _this.DS.Area.computedBorder;
      var style = _this.HTMLNode.style;
      var top = "".concat(rect.top + border.top, "px");
      var left = "".concat(rect.left + border.left, "px");
      var width = "".concat(rect.width, "px");
      var height = "".concat(rect.height, "px");
      if (style.top !== top) style.top = top;
      if (style.left !== left) style.left = left;
      if (style.width !== width) style.width = width;
      if (style.height !== height) style.height = height;
    });
    _defineProperty(this, "stop", function (remove) {
      _this.stopAutoScroll();
      if (remove) _this.applyElements('remove');
    });
    _defineProperty(this, "startAutoScroll", function () {
      _this.currentEdges = [];
      _this._scrollInterval = setInterval(function () {
        return _this.handleAutoScroll();
      }, 16);
    });
    _defineProperty(this, "handleAutoScroll", function () {
      if (_this.DS["continue"]) return;
      var _this$DS = _this.DS,
        PointerStore = _this$DS.stores.PointerStore,
        Area = _this$DS.Area;
      _this.currentEdges = getOverflowEdges({
        elementRect: vect2rect(PointerStore.currentVal),
        containerRect: _this.rect,
        tolerance: _this.DS.stores.SettingsStore.s.overflowTolerance
      });
      if (_this.currentEdges.length) Area.scroll(_this.currentEdges, _this.DS.stores.SettingsStore.s.autoScrollSpeed);
    });
    _defineProperty(this, "stopAutoScroll", function () {
      _this.currentEdges = [];
      clearInterval(_this._scrollInterval);
    });
    _defineProperty(this, "isInside", function (element, elementRect) {
      if (_this.DS.Area.HTMLNode.contains(element) && _this.DS.stores.ScrollStore.canScroll) return true;
      return isCollision(_this.rect, elementRect || element.getBoundingClientRect());
    });
    this.DS = DS;
    this.HTMLNode = createSelectorAreaElement();
    // @ts-ignore: @todo: update to typescript
    this.DS.subscribe('Settings:updated:selectorAreaClass', function (_ref2) {
      var settings = _ref2.settings;
      _this.HTMLNode.classList.remove(settings['selectorAreaClass:pre']);
      _this.HTMLNode.classList.add(settings['selectorAreaClass']);
    });
    this.HTMLNode.classList.add(this.DS.stores.SettingsStore.s.selectorAreaClass);
    this.DS.subscribe('Area:modified', this.updatePos);
    this.DS.subscribe('Area:modified', this.updatePos);
    this.DS.subscribe('Interaction:init', this.start);
    this.DS.subscribe('Interaction:start', this.startAutoScroll);
    this.DS.subscribe('Interaction:end', function () {
      _this.updatePos();
      _this.stopAutoScroll();
    });
  }
  _createClass(SelectorArea, [{
    key: "isClicked",
    value:
    /**
     * checks if the click was triggered on the area.
     * @param {DSEvent} [event]
     * @returns {boolean}
     */
    function isClicked(event) {
      var PointerStore = this.DS.stores.PointerStore;
      var initialVal = event ? PointerStore.getPointerPosition(event) : PointerStore.initialVal;
      return isCollision({
        left: initialVal.x,
        top: initialVal.y,
        right: initialVal.x,
        bottom: initialVal.y
      }, this.rect);
    }
  }, {
    key: "rect",
    get: function get() {
      if (this._rect) return this._rect;
      return this._rect = this.HTMLNode.getBoundingClientRect();
    }
  }]);
  return SelectorArea;
}();

var KeyStore = /*#__PURE__*/function () {
  /**
   * @type {Set<string>}
   * @private
   * */

  /**
   * @type {{control:string,shift:string,meta:string}}
   * @private
   * */

  /**
   * @class KeyStore
   * @constructor KeyStore
   * @param {{DS:DragSelect}} p
   * @ignore
   */
  function KeyStore(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, KeyStore);
    _defineProperty(this, "_currentValues", new Set());
    _defineProperty(this, "_keyMapping", {
      control: 'ctrlKey',
      shift: 'shiftKey',
      meta: 'metaKey'
    });
    _defineProperty(this, "init", function () {
      document.addEventListener('keydown', _this.keydown);
      document.addEventListener('keyup', _this.keyup);
      window.addEventListener('blur', _this.reset);
    });
    _defineProperty(this, "keydown", function (event) {
      var key = event.key.toLowerCase();
      _this.DS.publish('KeyStore:down:pre', {
        event: event,
        key: key
      });
      _this._currentValues.add(key);
      _this.DS.publish('KeyStore:down', {
        event: event,
        key: key
      });
    });
    _defineProperty(this, "keyup", function (event) {
      var key = event.key.toLowerCase();
      _this.DS.publish('KeyStore:up:pre', {
        event: event,
        key: key
      });
      _this._currentValues["delete"](key);
      _this.DS.publish('KeyStore:up', {
        event: event,
        key: key
      });
    });
    _defineProperty(this, "stop", function () {
      document.removeEventListener('keydown', _this.keydown);
      document.removeEventListener('keyup', _this.reset);
      window.removeEventListener('blur', _this.reset);
      _this.reset();
    });
    _defineProperty(this, "reset", function () {
      return _this._currentValues.clear();
    });
    this.DS = DS;
    this.DS.subscribe('Interaction:init', this.init);
  }
  _createClass(KeyStore, [{
    key: "isMultiSelectKeyPressed",
    value: /** @param {KeyboardEvent|MouseEvent|PointerEvent|TouchEvent} [event] */
    function isMultiSelectKeyPressed(event) {
      var _this2 = this;
      if (this.DS.stores.SettingsStore.s.multiSelectMode) return true;
      var multiSelectKeys = this.DS.stores.SettingsStore.s.multiSelectKeys.map(function (key) {
        return key.toLocaleLowerCase();
      });
      if (this.currentValues.some(function (key) {
        return multiSelectKeys.includes(key.toLocaleLowerCase());
      })) return true;
      if (event && multiSelectKeys.some(function (key) {
        return event[_this2._keyMapping[key]];
      })) return true;
      return false;
    }
  }, {
    key: "currentValues",
    get: function get() {
      return Array.from(this._currentValues.values());
    }
  }]);
  return KeyStore;
}();

var PointerStore = /*#__PURE__*/function () {
  /** @type {boolean} */

  // Pointer Positions within Area
  /**
   * @type {Vect2}
   * @private
   * */

  /**
   * @type {Vect2}
   * @private
   * */

  /**
   * @type {Vect2}
   * @private
   * */

  // General Pointer Position
  /**
   * @type {Vect2}
   * @private
   * */

  /**
   * @type {Vect2}
   * @private
   * */

  /**
   * @type {Vect2}
   * @private
   * */

  /**
   * @type {TouchEvent}
   * @private
   * */

  /**
   * @class PointerStore
   * @constructor PointerStore
   * @param {{DS:DragSelect}} p
   * @ignore
   */
  function PointerStore(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, PointerStore);
    _defineProperty(this, "_isMouseInteraction", false);
    _defineProperty(this, "_initialValArea", void 0);
    _defineProperty(this, "_currentValArea", void 0);
    _defineProperty(this, "_lastValArea", void 0);
    _defineProperty(this, "_initialVal", void 0);
    _defineProperty(this, "_currentVal", void 0);
    _defineProperty(this, "_lastVal", void 0);
    _defineProperty(this, "_lastTouch", void 0);
    _defineProperty(this, "init", function () {
      if (_this.Settings.usePointerEvents) document.addEventListener('pointermove', _this.update, {
        // @ts-ignore
        passive: false
      });else document.addEventListener('mousemove', _this.update);
      document.addEventListener('touchmove', _this.update, {
        // @ts-ignore
        passive: false
      });
    });
    _defineProperty(this, "getPointerPosition", function (event) {
      return getPointerPos({
        event: _this._normalizedEvent(event)
      });
    });
    _defineProperty(this, "update", function (event) {
      if (!event) return;
      _this.DS.publish('PointerStore:updated:pre', {
        event: event
      });
      _this.currentVal = _this.getPointerPosition(event);
      if (!_this._isMouseInteraction) return;
      _this.DS.publish('PointerStore:updated', {
        event: event
      });
    });
    _defineProperty(this, "stop", function () {
      // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
      if (_this.Settings.usePointerEvents) document.removeEventListener('pointermove', _this.update, {
        // @ts-ignore
        passive: false
      });else document.removeEventListener('mousemove', _this.update);
      document.removeEventListener('touchmove', _this.update, {
        // @ts-ignore
        passive: false
      });
      // debounce in order "onClick" to work
      setTimeout(function () {
        return _this._isMouseInteraction = false;
      }, 100);
    });
    _defineProperty(this, "reset", function (event) {
      if (!event) return;
      _this.currentVal = _this.lastVal = _this.getPointerPosition(event);
      _this.stop();
      _this.init();
    });
    this.DS = DS;
    this.Settings = DS.stores.SettingsStore.s;
    this.DS.subscribe('Interaction:init', this.init);
    this.DS.subscribe('Interaction:start', function (_ref2) {
      var event = _ref2.event;
      return _this.start(event);
    });
    this.DS.subscribe('Interaction:end', function (_ref3) {
      var event = _ref3.event;
      return _this.reset(event);
    });
  }
  _createClass(PointerStore, [{
    key: "start",
    value: /** @param {DSEvent} [event] */
    function start(event) {
      if (!event) return;
      this._isMouseInteraction = true;
      this.currentVal = this.initialVal = this.getPointerPosition(event);
    }

    /** @param {DSEvent} event */
  }, {
    key: "_normalizedEvent",
    value:
    /**
     * @param {DSEvent} event
     * @return {MouseEvent|PointerEvent|Touch}
     * @private
     */
    function _normalizedEvent(event) {
      // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
      if ('touches' in event && event.type !== 'touchend') this._lastTouch = event;
      // if a touchevent, return the last touch rather than the regular event
      // we need .touches[0] from that event instead
      return 'touches' in event ? this._lastTouch.touches[0] : event;
    }

    /** First recorded pointer position within the area */
  }, {
    key: "initialValArea",
    get: function get() {
      if (!this._initialValArea) return {
        x: 0,
        y: 0
      };
      return this._initialValArea;
    }

    /** Current pointer position within the area */
  }, {
    key: "currentValArea",
    get: function get() {
      if (!this._currentValArea) return {
        x: 0,
        y: 0
      };
      return this._currentValArea;
    }

    /** Last recorded pointer position within the area */
  }, {
    key: "lastValArea",
    get: function get() {
      if (!this._lastValArea) return {
        x: 0,
        y: 0
      };
      return this._lastValArea;
    }

    /** First recorded pointer position */
  }, {
    key: "initialVal",
    get: function get() {
      if (!this._initialVal) return {
        x: 0,
        y: 0
      };
      return this._initialVal;
    }

    /** Current pointer position */,
    set: function set(value) {
      this._initialVal = value;
      this._initialValArea = value && calc(value, '-', calc(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
    }
  }, {
    key: "currentVal",
    get: function get() {
      if (!this._currentVal) return {
        x: 0,
        y: 0
      };
      return this._currentVal;
    }

    /** Last recorded pointer position */,
    set: function set(value) {
      this._currentVal = value;
      this._currentValArea = value && calc(value, '-', calc(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
    }
  }, {
    key: "lastVal",
    get: function get() {
      if (!this._lastVal) return {
        x: 0,
        y: 0
      };
      return this._lastVal;
    },
    set: function set(value) {
      this._lastVal = value;
      this._lastValArea = value && calc(value, '-', calc(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
    }
  }]);
  return PointerStore;
}();

var ScrollStore = /*#__PURE__*/function () {
  /**
   * @type {Vect2}
   * @private */

  /**
   * @type {Vect2}
   * @private */

  /**
   * @type {boolean}
   * @private */

  /**
   * @class ScrollStore
   * @constructor ScrollStore
   * @param {{ DS:DragSelect }} p
   * @ignore
   */
  function ScrollStore(_ref) {
    var _this = this;
    var DS = _ref.DS;
    _classCallCheck(this, ScrollStore);
    _defineProperty(this, "_initialVal", void 0);
    _defineProperty(this, "_currentVal", void 0);
    _defineProperty(this, "_canScroll", void 0);
    _defineProperty(this, "init", function () {
      return _this.DS.stores.SettingsStore.s.area.addEventListener('scroll', _this.update);
    });
    _defineProperty(this, "start", function () {
      _this._currentVal = _this._initialVal = getCurrentScroll(_this.DS.stores.SettingsStore.s.area);
      _this.DS.stores.SettingsStore.s.area.addEventListener('scroll', _this.update);
    });
    _defineProperty(this, "update", function () {
      return _this._currentVal = getCurrentScroll(_this.DS.stores.SettingsStore.s.area);
    });
    _defineProperty(this, "stop", function () {
      _this.DS.stores.SettingsStore.s.area.removeEventListener('scroll', _this.update);
      _this._initialVal = {
        x: 0,
        y: 0
      };
      _this._canScroll = null;
    });
    _defineProperty(this, "reset", function () {
      _this.stop();
      _this.start();
    });
    this.DS = DS;
    this.DS.subscribe('Interaction:init', this.init);
    this.DS.subscribe('Interaction:start', function () {
      return _this.start();
    });
    this.DS.subscribe('Interaction:end', function () {
      return _this.reset();
    });
  }
  _createClass(ScrollStore, [{
    key: "canScroll",
    get: function get() {
      if (typeof this._canScroll === 'boolean') return this._canScroll;
      return this._canScroll = canScroll(this.DS.stores.SettingsStore.s.area);
    }
  }, {
    key: "scrollAmount",
    get: function get() {
      var scrollDiff = calc(this.currentVal, '-', this.initialVal);

      // if area is zoomed, the scroll values are skewed, we need to fix that manually :(
      var zoom = num2vect(this.DS.stores.SettingsStore.s.zoom);
      var zoomScroll = calc(calc(scrollDiff, '*', zoom), '-', scrollDiff);
      return {
        x: scrollDiff.x + zoomScroll.x,
        y: scrollDiff.y + zoomScroll.y
      };
    }
  }, {
    key: "initialVal",
    get: function get() {
      if (!this._initialVal) return {
        x: 0,
        y: 0
      };
      return this._initialVal;
    }
  }, {
    key: "currentVal",
    get: function get() {
      if (!this._currentVal) this._currentVal = getCurrentScroll(this.DS.stores.SettingsStore.s.area);
      return this._currentVal;
    }
  }]);
  return ScrollStore;
}();

var SettingsStore = /*#__PURE__*/_createClass(
/**
 * @type {Settings}
 * @private
 * */

/**
 * Holds the settings and their previous value `:pre`
 * @example {
 *    autoScrollSpeed: 3,
 *    'autoScrollSpeed:pre': 5
 * }
 * @type {Settings}
 * */

/**
 * @class ScrollStore
 * @constructor ScrollStore
 * @param {{ DS:DragSelect, settings:Settings }} p
 * @ignore
 */
function SettingsStore(_ref) {
  var _this = this;
  var DS = _ref.DS,
    _settings2 = _ref.settings;
  _classCallCheck(this, SettingsStore);
  _defineProperty(this, "_settings", {});
  _defineProperty(this, "s", {});
  _defineProperty(this, "update", function (_ref2) {
    var settings = _ref2.settings,
      init = _ref2.init;
    return _this.DS.publish('Settings:updated:pre', _objectSpread2({
      settings: settings
    }, init ? {
      init: init
    } : {}));
  });
  _defineProperty(this, "_update", function (_ref3) {
    var settings = _ref3.settings,
      init = _ref3.init;
    var _settings = hydrateSettings(settings, init);
    var _loop = function _loop() {
      var _settings4;
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (!(key in _this._settings)) {
        Object.defineProperty(_this.s, key, {
          get: function get() {
            return _this._settings[key];
          },
          set: function set(newValue) {
            return _this.update({
              settings: _defineProperty({}, key, newValue)
            });
          }
        });
      }
      _this._settings["".concat(key, ":pre")] = _this._settings[key];
      _this._settings[key] = value;
      var update = {
        settings: (_settings4 = {}, _defineProperty(_settings4, key, _this._settings[key]), _defineProperty(_settings4, "".concat(key, ":pre"), _this._settings["".concat(key, ":pre")]), _settings4)
      };
      _this.DS.publish('Settings:updated', update);
      // @ts-ignore: @todo: update to typescript
      _this.DS.publish("Settings:updated:".concat(key), update);
    };
    for (var _i = 0, _Object$entries = Object.entries(_settings); _i < _Object$entries.length; _i++) {
      _loop();
    }
  });
  this.DS = DS;
  this.DS.subscribe('Settings:updated:pre', this._update);
  this.update({
    settings: _settings2,
    init: true
  });
}

/** @param {{settings: Settings, init?: boolean}} props */);

// Setup
/// ///////////////////////////////////////////////////////////////////////////////////
var DragSelect = /*#__PURE__*/function () {
  /**
   * used to skip all current Selection and dragNdrop functionality
   * @type {boolean}
   */

  /**
   * @class DragSelect
   * @constructor DragSelect
   * @param {Settings} settings
   */
  function DragSelect(_settings) {
    var _this = this;
    _classCallCheck(this, DragSelect);
    _defineProperty(this, "continue", false);
    _defineProperty(this, "start", function () {
      _this.stopped = false;
      _this.Interaction.init();
    });
    _defineProperty(this, "break", function () {
      return _this["continue"] = true;
    });
    _defineProperty(this, "setSettings", function (settings) {
      return _this.stores.SettingsStore.update({
        settings: settings
      });
    });
    _defineProperty(this, "getSelection", function () {
      return _this.SelectedSet.elements;
    });
    _defineProperty(this, "getSelectables", function () {
      return _this.SelectableSet.elements;
    });
    _defineProperty(this, "getInitialCursorPosition", function () {
      return _this.stores.PointerStore.initialVal;
    });
    _defineProperty(this, "getCurrentCursorPosition", function () {
      return _this.stores.PointerStore.currentVal;
    });
    _defineProperty(this, "getPreviousCursorPosition", function () {
      return _this.stores.PointerStore.lastVal;
    });
    _defineProperty(this, "getInitialCursorPositionArea", function () {
      return _this.stores.PointerStore.initialValArea;
    });
    _defineProperty(this, "getCurrentCursorPositionArea", function () {
      return _this.stores.PointerStore.currentValArea;
    });
    _defineProperty(this, "getPreviousCursorPositionArea", function () {
      return _this.stores.PointerStore.lastValArea;
    });
    _defineProperty(this, "isMultiSelect", function (event) {
      return _this.stores.KeyStore.isMultiSelectKeyPressed(event);
    });
    _defineProperty(this, "isDragging", function () {
      return _this.Interaction.isDragging;
    });
    _defineProperty(this, "getZoneByCoordinates", function (coordinates) {
      var _this$DropZones$getTa;
      return (_this$DropZones$getTa = _this.DropZones.getTarget(coordinates)) === null || _this$DropZones$getTa === void 0 ? void 0 : _this$DropZones$getTa.toObject();
    });
    _defineProperty(this, "getItemsDroppedByZoneId", function (zoneId) {
      return _this.DropZones.getItemsDroppedById(zoneId);
    });
    _defineProperty(this, "getItemsInsideByZoneId", function (zoneId, addClasses) {
      return _this.DropZones.getItemsInsideById(zoneId, addClasses);
    });
    this.PubSub = new PubSub({
      DS: this
    });
    this.subscribe = this.PubSub.subscribe;
    this.unsubscribe = this.PubSub.unsubscribe;
    this.publish = this.PubSub.publish;
    this.stores = /** @type {{ SettingsStore:SettingsStore, PointerStore:PointerStore, ScrollStore:ScrollStore, KeyStore:KeyStore }} */{};
    this.stores.SettingsStore = new SettingsStore({
      DS: this,
      settings: _settings
    });
    this.stores.PointerStore = new PointerStore({
      DS: this
    });
    this.stores.ScrollStore = new ScrollStore({
      DS: this
    });
    this.stores.KeyStore = new KeyStore({
      DS: this
    });
    this.Area = new Area({
      DS: this
    });
    this.Selector = new Selector({
      DS: this
    });
    this.SelectorArea = new SelectorArea({
      DS: this
    });
    this.SelectableSet = new SelectableSet({
      DS: this
    });
    this.SelectedSet = new SelectedSet({
      DS: this
    });
    this.Selection = new Selection({
      DS: this
    });
    this.Drag = new Drag({
      DS: this
    });
    this.DropZones = new DropZones({
      DS: this
    });
    this.Interaction = new Interaction({
      DS: this
    });

    // Subscriber Aliases
    subscriberAliases({
      subscribe: this.subscribe,
      publish: this.publish,
      SelectedSet: this.SelectedSet,
      Interaction: this.Interaction,
      DropZones: this.DropZones
    });
    this.subscribe('Interaction:end', function () {
      return _this["continue"] = false;
    });
    this.start();
  }

  // Useful methods for the user
  /// ///////////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the functionality. Automatically triggered when created.
   * Also, reset the functionality after a teardown
   */
  _createClass(DragSelect, [{
    key: "stop",
    value:
    /**
     * Complete function teardown
     * Will teardown/stop the whole functionality
     * @param {boolean} [remove] - if elements should be removed.
     * @param {boolean} [fromSelection] - if elements should also be added/removed to the selection.
     * @param {boolean} [withCallback] - if elements should also be added/removed to the selection.
     */
    function stop() {
      var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var fromSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var withCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (withCallback) this.publish('callback', {
        items: this.getSelection()
      });
      this.Interaction.stop();
      this.Area.stop();
      this.Drag.stop();
      this.Selector.stop();
      this.SelectorArea.stop(remove);
      this.stores.KeyStore.stop();
      this.stores.PointerStore.stop();
      this.stores.ScrollStore.stop();
      if (remove) this.SelectableSet.clear();
      if (fromSelection) this.SelectedSet.clear();
      this.stopped = true;
    }

    /**
     * Utility to override DragSelect internal functionality:
     * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
     * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
     */
  }, {
    key: "addSelection",
    value:
    /**
     * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
     * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
     * @return {DSElements} all selected elements
     */
    function addSelection(elements) {
      var triggerCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dontAddToSelectables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.SelectedSet.addAll(toArray(elements));
      if (!dontAddToSelectables) this.addSelectables(elements);
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return this.getSelection();
    }

    /**
     * Removes specific elements from the selection
     * Multiple elements can be given at once, in contrary to unselect
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [removeFromSelectables] - if element should be removed from the list of selectable elements
     * @return {DSElements} all selected elements
     */
  }, {
    key: "removeSelection",
    value: function removeSelection(elements) {
      var triggerCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var removeFromSelectables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.SelectedSet.deleteAll(toArray(elements));
      if (removeFromSelectables) this.removeSelectables(elements);
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return this.getSelection();
    }

    /**
     * Toggles specific elements from the selection:
     * If element is not in selection it will be added, if it is already selected, it will be removed.
     * Multiple elements can be given at once.
     * @param {DSInputElements} elements one or multiple elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [removeFromSelectables] - if element should not be added/removed to the list of selectable elements accordingly
     * @return {DSElements} all selected elements
     */
  }, {
    key: "toggleSelection",
    value: function toggleSelection(elements) {
      var _this2 = this;
      var triggerCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var removeFromSelectables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      toArray(elements).forEach(function (el) {
        return _this2.SelectedSet.has(el) ? _this2.removeSelection(elements, triggerCallback, removeFromSelectables) : _this2.addSelection(elements, triggerCallback, removeFromSelectables);
      });
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return this.getSelection();
    }

    /**
     * Sets the current selected elements and optionally run the callback
     * By default, adds new elements also to the list of selectables
     * @param {DSInputElements} elements – dom elements
     * @param {boolean} [triggerCallback] - if callback should be called
     * @param {boolean} [dontAddToSelectables] - if element should not be added to the list of selectable elements
     * @return {DSElements}
     */
  }, {
    key: "setSelection",
    value: function setSelection(elements) {
      var triggerCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dontAddToSelectables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.clearSelection();
      this.addSelection(elements, triggerCallback, dontAddToSelectables);
      return this.getSelection();
    }

    /**
     * Unselect / Deselect all current selected Nodes
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSElements} this.selected, should be empty
     */
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      var triggerCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.SelectedSet.clear();
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return this.getSelection();
    }

    /**
     * Add elements that can be selected. No node is added twice
     * @param {DSInputElements} elements dom element(s)
     * @param {boolean} [addToSelection] if elements should also be added to current selection
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSInputElements} the added element(s)
     */
  }, {
    key: "addSelectables",
    value: function addSelectables(elements, addToSelection, triggerCallback) {
      var els = toArray(elements);
      this.SelectableSet.addAll(els);
      if (addToSelection) this.SelectedSet.addAll(els);
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return elements;
    }

    /**
     * Gets all nodes that can potentially be selected
     * @return {DSElements} this.selectables
     */
  }, {
    key: "setSelectables",
    value:
    /**
     * Sets all elements that can be selected.
     * Removes all current selectables (& their respective classes).
     * Adds the new set to the selectables set, thus replacing the original set.
     * @param {DSInputElements} elements – dom element(s)
     * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
     * @param {boolean} [addToSelection] if elements should also be added to current selection
     * @return {DSInputElements} elements – the added element(s)
     */
    function setSelectables(elements) {
      var removeFromSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var addToSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      console.warn('[DragSelect] DEPRECATION ".setSelectables" is deprecated and will be removed soon. Please use "ds.setSettings({ selectables: << new dom elements >> })" instead (see docs)');
      this.removeSelectables(elements, removeFromSelection);
      return this.addSelectables(elements, addToSelection);
    }

    /**
     * Remove elements from the elements that can be selected.
     * @param {DSInputElements} elements – dom element(s)
     * @param {boolean} [removeFromSelection] if elements should also be removed from current selection
     * @param {boolean} [triggerCallback] - if callback should be called
     * @return {DSInputElements} the removed element(s)
     */
  }, {
    key: "removeSelectables",
    value: function removeSelectables(elements, removeFromSelection, triggerCallback) {
      this.SelectableSet.deleteAll(toArray(elements));
      if (removeFromSelection) this.removeSelection(elements);
      if (triggerCallback) this.PubSub.publish('callback', {
        items: this.getSelection()
      });
      return elements;
    }

    /** The starting/initial position of the cursor/selector @return {Vect2} */
  }]);
  return DragSelect;
}();
DragSelect.isCollision = isCollision;

export { DragSelect as default };
