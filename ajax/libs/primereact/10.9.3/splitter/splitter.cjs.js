'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends.apply(this, arguments);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return utils.classNames("p-splitter p-component p-splitter-".concat(props.layout));
  },
  gutter: 'p-splitter-gutter',
  gutterHandler: 'p-splitter-gutter-handle',
  panel: {
    root: 'p-splitter-panel'
  }
};
var styles = "\n@layer primereact {\n    .p-splitter {\n        display: flex;\n        flex-wrap: nowrap;\n    }\n\n    .p-splitter-vertical {\n        flex-direction: column;\n    }\n\n    .p-splitter-panel {\n        flex-grow: 1;\n    }\n\n    .p-splitter-panel-nested {\n        display: flex;\n    }\n\n    .p-splitter-panel .p-splitter {\n        flex-grow: 1;\n        border: 0 none;\n    }\n\n    .p-splitter-gutter {\n        flex-grow: 0;\n        flex-shrink: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: col-resize;\n    }\n\n    .p-splitter-horizontal.p-splitter-resizing {\n        cursor: col-resize;\n        user-select: none;\n    }\n\n    .p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {\n        height: 24px;\n        width: 100%;\n    }\n\n    .p-splitter-horizontal > .p-splitter-gutter {\n        cursor: col-resize;\n    }\n\n    .p-splitter-vertical.p-splitter-resizing {\n        cursor: row-resize;\n        user-select: none;\n    }\n\n    .p-splitter-vertical > .p-splitter-gutter {\n        cursor: row-resize;\n    }\n\n    .p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {\n        width: 24px;\n        height: 100%;\n    }\n}\n\n";
var SplitterBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Splitter',
    className: null,
    gutterSize: 4,
    id: null,
    step: 5,
    layout: 'horizontal',
    onResizeEnd: null,
    stateKey: null,
    stateStorage: 'session',
    style: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});
var SplitterPanelBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SplitterPanel',
    className: null,
    minSize: null,
    size: null,
    style: null,
    children: undefined
  },
  getCProps: function getCProps(panel) {
    return utils.ObjectUtils.getComponentProps(panel, SplitterPanelBase.defaultProps);
  },
  getCOtherProps: function getCOtherProps(panel) {
    return utils.ObjectUtils.getComponentDiffProps(panel, SplitterPanelBase.defaultProps);
  },
  getCProp: function getCProp(panel, name) {
    return utils.ObjectUtils.getComponentProp(panel, name, SplitterPanelBase.defaultProps);
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SplitterPanel = function SplitterPanel() {};
var Splitter = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = SplitterBase.getProps(inProps, context);
  var idState = React__namespace.useRef('');
  var elementRef = React__namespace.useRef(null);
  var gutterRef = React__namespace.useRef();
  var gutterRefs = React__namespace.useRef({});
  var size = React__namespace.useRef(null);
  var dragging = React__namespace.useRef(null);
  var startPos = React__namespace.useRef(null);
  var prevPanelElement = React__namespace.useRef(null);
  var nextPanelElement = React__namespace.useRef(null);
  var prevPanelSize = React__namespace.useRef(null);
  var prevSize = React__namespace.useRef(null);
  var prevPanelSizeNew = React__namespace.useRef(null);
  var nextPanelSize = React__namespace.useRef(null);
  var nextPanelSizeNew = React__namespace.useRef(null);
  var prevPanelIndex = React__namespace.useRef(null);
  var timer = React__namespace.useRef(null);
  var _React$useState = React__namespace.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    panelSizes = _React$useState2[0],
    setPanelSizes = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    nested = _React$useState4[0],
    setNested = _React$useState4[1];
  var isStateful = props.stateKey != null;
  var childrenLength = props.children && props.children.length || 1;
  var panelSize = function panelSize(sizes, index) {
    return index in sizes ? sizes[index] : props.children && [].concat(props.children)[index].props.size || 100 / childrenLength;
  };
  var horizontal = props.layout === 'horizontal';
  var metaData = {
    props: props,
    state: {
      panelSizes: panelSizes,
      nested: utils.DomHandler.getAttribute(elementRef.current && elementRef.current.parentElement, 'data-p-splitter-panel-nested') === true
    }
  };
  var _SplitterBase$setMeta = SplitterBase.setMetaData(_objectSpread({}, metaData)),
    ptm = _SplitterBase$setMeta.ptm,
    cx = _SplitterBase$setMeta.cx,
    isUnstyled = _SplitterBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(SplitterBase.css.styles, isUnstyled, {
    name: 'splitter'
  });
  var getPanelPT = function getPanelPT(key) {
    return ptm(key, {
      context: {
        nested: nested
      }
    });
  };
  var _useEventListener = hooks.useEventListener({
      type: 'mousemove',
      listener: function listener(event) {
        return onResize(event);
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = hooks.useEventListener({
      type: 'mouseup',
      listener: function listener(event) {
        onResizeEnd(event);
        unbindMouseListeners();
      }
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var bindMouseListeners = function bindMouseListeners() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };
  var unbindMouseListeners = function unbindMouseListeners() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };
  var getPanelProp = function getPanelProp(panel, name) {
    return SplitterPanelBase.getCProp(panel, name);
  };
  var validateResize = function validateResize(newPrevPanelSize, newNextPanelSize) {
    if (newPrevPanelSize > 100 || newPrevPanelSize < 0) {
      return false;
    }
    if (newNextPanelSize > 100 || newNextPanelSize < 0) {
      return false;
    }
    if (props.children[prevPanelIndex.current].props && props.children[prevPanelIndex.current].props.minSize && props.children[prevPanelIndex.current].props.minSize > newPrevPanelSize) {
      return false;
    }
    if (props.children[prevPanelIndex.current + 1].props && props.children[prevPanelIndex.current + 1].props.minSize && props.children[prevPanelIndex.current + 1].props.minSize > newNextPanelSize) {
      return false;
    }
    return true;
  };
  var clear = function clear() {
    dragging.current = false;
    size.current = null;
    startPos.current = null;
    prevPanelElement.current = null;
    nextPanelElement.current = null;
    prevPanelSize.current = null;
    prevPanelSizeNew.current = null;
    nextPanelSize.current = null;
    nextPanelSizeNew.current = null;
    prevPanelIndex.current = null;
  };
  var getStorage = React__namespace.useCallback(function () {
    switch (props.stateStorage) {
      case 'local':
        return window.localStorage;
      case 'session':
        return window.sessionStorage;
      default:
        throw new Error(props.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
    }
  }, [props.stateStorage]);
  var saveState = function saveState(sizes) {
    if (utils.ObjectUtils.isArray(sizes)) {
      getStorage().setItem(props.stateKey, JSON.stringify(sizes));
    }
  };
  var restoreState = React__namespace.useCallback(function () {
    var stateString = getStorage().getItem(props.stateKey);
    if (stateString) {
      setPanelSizes(JSON.parse(stateString));
    }
  }, [getStorage, props.stateKey]);
  var onResizeStart = function onResizeStart(event, index, isKeyDown) {
    var pageX = event.type === 'touchstart' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchstart' ? event.touches[0].pageY : event.pageY;
    gutterRef.current = gutterRefs.current[index];
    size.current = horizontal ? utils.DomHandler.getWidth(elementRef.current) : utils.DomHandler.getHeight(elementRef.current);
    dragging.current = true;
    startPos.current = horizontal ? pageX : pageY;
    prevPanelElement.current = gutterRef.current.previousElementSibling;
    nextPanelElement.current = gutterRef.current.nextElementSibling;
    if (isKeyDown) {
      prevPanelSize.current = horizontal ? utils.DomHandler.getOuterWidth(prevPanelElement.current, true) : utils.DomHandler.getOuterHeight(prevPanelElement.current, true);
      nextPanelSize.current = horizontal ? utils.DomHandler.getOuterWidth(nextPanelElement.current, true) : utils.DomHandler.getOuterHeight(nextPanelElement.current, true);
    } else {
      prevPanelSize.current = 100 * (horizontal ? utils.DomHandler.getOuterWidth(prevPanelElement.current, true) : utils.DomHandler.getOuterHeight(prevPanelElement.current, true)) / size.current;
      nextPanelSize.current = 100 * (horizontal ? utils.DomHandler.getOuterWidth(nextPanelElement.current, true) : utils.DomHandler.getOuterHeight(nextPanelElement.current, true)) / size.current;
    }
    prevPanelSizeNew.current = prevPanelSize.current;
    nextPanelSizeNew.current = nextPanelSize.current;
    prevPanelIndex.current = index;
    !isUnstyled() && utils.DomHandler.addClass(gutterRef.current, 'p-splitter-gutter-resizing');
    gutterRef.current.setAttribute('data-p-splitter-gutter-resizing', true);
    !isUnstyled() && utils.DomHandler.addClass(elementRef.current, 'p-splitter-resizing');
    elementRef.current.setAttribute('data-p-splitter-resizing', true);
  };
  var onResize = function onResize(event) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var isKeyDown = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var newPos;
    var newNextPanelSize;
    var newPrevPanelSize;
    var pageX = event.type === 'touchmove' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchmove' ? event.touches[0].pageY : event.pageY;
    if (isKeyDown) {
      if (horizontal) {
        newPrevPanelSize = 100 * (prevPanelSize.current + step) / size.current;
        newNextPanelSize = 100 * (nextPanelSize.current - step) / size.current;
      } else {
        newPrevPanelSize = 100 * (prevPanelSize.current - step) / size.current;
        newNextPanelSize = 100 * (nextPanelSize.current + step) / size.current;
      }
    } else {
      if (horizontal) {
        newPos = pageX * 100 / size.current - startPos.current * 100 / size.current;
      } else {
        newPos = pageY * 100 / size.current - startPos.current * 100 / size.current;
      }
      newPrevPanelSize = prevPanelSize.current + newPos;
      newNextPanelSize = nextPanelSize.current - newPos;
    }
    resizePanel(prevPanelIndex.current, newPrevPanelSize, newNextPanelSize);
  };
  var onResizeEnd = function onResizeEnd(event) {
    var sizes = _toConsumableArray(panelSizes);
    sizes[prevPanelIndex.current] = prevPanelSizeNew.current;
    sizes[prevPanelIndex.current + 1] = nextPanelSizeNew.current;
    if (props.onResizeEnd) {
      props.onResizeEnd({
        originalEvent: event,
        sizes: sizes
      });
    }
    if (isStateful) {
      saveState(sizes);
    }
    setPanelSizes(sizes);
    !isUnstyled() && utils.DomHandler.removeClass(gutterRef.current, 'p-splitter-gutter-resizing');
    gutterRefs.current && Object.keys(gutterRefs.current).forEach(function (key) {
      return gutterRefs.current[key].setAttribute('data-p-splitter-gutter-resizing', false);
    });
    !isUnstyled() && utils.DomHandler.removeClass(elementRef.current, 'p-splitter-resizing');
    elementRef.current.setAttribute('data-p-splitter-resizing', false);
    clear();
  };
  var onGutterKeyUp = function onGutterKeyUp() {
    clearTimer();
    onResizeEnd();
  };
  var onGutterKeyDown = function onGutterKeyDown(event, index) {
    var minSize = props.children[index].props && props.children[index].props.minSize || 0;
    switch (event.code) {
      case 'ArrowLeft':
        {
          if (horizontal) {
            setTimer(event, index, props.step * -1);
          }
          event.preventDefault();
          break;
        }
      case 'ArrowRight':
        {
          if (horizontal) {
            setTimer(event, index, props.step);
          }
          event.preventDefault();
          break;
        }
      case 'ArrowDown':
        {
          if (!horizontal) {
            setTimer(event, index, props.step * -1);
          }
          event.preventDefault();
          break;
        }
      case 'ArrowUp':
        {
          if (!horizontal) {
            setTimer(event, index, props.step);
          }
          event.preventDefault();
          break;
        }
      case 'Home':
        {
          resizePanel(index, 100 - minSize, minSize);
          event.preventDefault();
          break;
        }
      case 'End':
        {
          resizePanel(index, minSize, 100 - minSize);
          event.preventDefault();
          break;
        }
      case 'NumpadEnter':
      case 'Enter':
        {
          if (prevSize.current >= 100 - (minSize || 5)) {
            resizePanel(index, minSize, 100 - minSize);
          } else {
            resizePanel(index, 100 - minSize, minSize);
          }
          event.preventDefault();
          break;
        }
    }
  };
  var resizePanel = function resizePanel(index, newPrevPanelSize, newNextPanelSize) {
    prevPanelIndex.current = index;
    gutterRef.current = gutterRefs.current[index];
    size.current = horizontal ? utils.DomHandler.getWidth(elementRef.current) : utils.DomHandler.getHeight(elementRef.current);
    prevPanelElement.current = gutterRef.current.previousElementSibling;
    nextPanelElement.current = gutterRef.current.nextElementSibling;
    if (validateResize(newPrevPanelSize, newNextPanelSize)) {
      prevPanelSizeNew.current = newPrevPanelSize;
      nextPanelSizeNew.current = newNextPanelSize;
      prevPanelElement.current.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
      nextPanelElement.current.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
      prevSize.current = parseFloat(newPrevPanelSize).toFixed(4);
    }
  };
  var repeat = function repeat(event, index, step) {
    onResizeStart(event, index, true);
    onResize(event, step, true);
  };
  var setTimer = function setTimer(event, index, step) {
    if (!timer.current) {
      timer.current = setInterval(function () {
        repeat(event, index, step);
      }, 40);
    }
  };
  var clearTimer = function clearTimer() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };
  var onGutterMouseDown = function onGutterMouseDown(event, index) {
    onResizeStart(event, index, false);
    bindMouseListeners();
  };
  var onGutterTouchStart = function onGutterTouchStart(event, index) {
    onResizeStart(event, index, false);
    window.addEventListener('touchmove', onGutterTouchMove, {
      passive: false,
      cancelable: false
    });
    window.addEventListener('touchend', _onGutterTouchEnd);
  };
  var onGutterTouchMove = function onGutterTouchMove(event) {
    onResize(event);
  };
  var _onGutterTouchEnd = function onGutterTouchEnd(event) {
    onResizeEnd(event);
    window.removeEventListener('touchmove', onGutterTouchMove);
    window.removeEventListener('touchend', _onGutterTouchEnd);
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useMountEffect(function () {
    if (elementRef.current) {
      idState.current = utils.UniqueComponentId();
    }
  });
  React__namespace.useEffect(function () {
    var panelElements = _toConsumableArray(elementRef.current.children).filter(function (child) {
      return utils.DomHandler.getAttribute(child, 'data-pc-section') === 'splitterpanel.root';
    });
    var _panelSizes = [];
    panelElements.map(function (panelElement, i) {
      prevSize.current = panelSize(panelSizes, 0);
      _panelSizes[i] = panelSize(panelSizes, i);
      if (panelElement.childNodes && utils.ObjectUtils.isNotEmpty(utils.DomHandler.find(panelElement, "[data-pc-name='splitter']") && utils.DomHandler.find(panelElement, "[data-pc-section='root']"))) {
        !isUnstyled() && utils.DomHandler.addClass(panelElement, 'p-splitter-panel-nested');
        panelElement.setAttribute('data-p-splitter-panel-nested', true);
        setNested(true);
      }
    });
    setPanelSizes(_panelSizes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React__namespace.useEffect(function () {
    if (isStateful) {
      restoreState();
    }
  }, [restoreState, isStateful]);
  var createPanel = function createPanel(panel, index) {
    var panelId = getPanelProp(panel, 'id') || "".concat(idState.current, "_").concat(index);
    var panelClassName = utils.classNames(getPanelProp(panel, 'className'), cx('panel.root'));
    var gutterProps = mergeProps({
      ref: function ref(el) {
        return gutterRefs.current[index] = el;
      },
      className: cx('gutter'),
      style: horizontal ? {
        width: props.gutterSize + 'px'
      } : {
        height: props.gutterSize + 'px'
      },
      onMouseDown: function onMouseDown(event) {
        return onGutterMouseDown(event, index);
      },
      onKeyDown: function onKeyDown(event) {
        return onGutterKeyDown(event, index);
      },
      onKeyUp: onGutterKeyUp,
      onTouchStart: function onTouchStart(event) {
        return onGutterTouchStart(event, index);
      },
      onTouchMove: function onTouchMove(event) {
        return onGutterTouchMove(event);
      },
      onTouchEnd: function onTouchEnd(event) {
        return _onGutterTouchEnd(event);
      },
      'data-p-splitter-gutter-resizing': false
    }, ptm('gutter'));
    var gutterHandlerProps = mergeProps({
      tabIndex: getPanelProp(panel, 'tabIndex') || 0,
      className: cx('gutterHandler'),
      role: 'separator',
      'aria-orientation': horizontal ? 'vertical' : 'horizontal',
      'aria-controls': panelId,
      'aria-label': getPanelProp(panel, 'aria-label'),
      'aria-labelledby': getPanelProp(panel, 'aria-labelledby'),
      'aria-valuenow': prevSize.current,
      'aria-valuetext': parseFloat(prevSize.current).toFixed(0) + '%',
      'aria-valuemin': getPanelProp(panel, 'minSize') || '0',
      'aria-valuemax': '100'
    }, ptm('gutterHandler'));
    var gutter = index !== props.children.length - 1 && /*#__PURE__*/React__namespace.createElement("div", gutterProps, /*#__PURE__*/React__namespace.createElement("div", gutterHandlerProps));
    var flexBasis = 'calc(' + panelSize(panelSizes, index) + '% - ' + (childrenLength - 1) * props.gutterSize + 'px)';
    var rootProps = mergeProps({
      key: index,
      id: panelId,
      className: panelClassName,
      style: _objectSpread(_objectSpread({}, getPanelProp(panel, 'style')), {}, {
        flexBasis: flexBasis
      }),
      role: 'presentation',
      'data-p-splitter-panel-nested': false,
      onClick: getPanelProp(panel, 'onClick')
    }, getPanelPT('splitterpanel.root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, getPanelProp(panel, 'children')), gutter);
  };
  var createPanels = function createPanels() {
    return React__namespace.Children.map(props.children, createPanel);
  };
  var rootProps = mergeProps({
    id: props.id,
    style: props.style,
    className: utils.classNames(props.className, cx('root')),
    'data-p-splitter-resizing': false
  }, SplitterBase.getOtherProps(props), ptm('root'));
  var panels = createPanels();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), panels);
}));
SplitterPanel.displayName = 'SplitterPanel';
Splitter.displayName = 'Splitter';

exports.Splitter = Splitter;
exports.SplitterPanel = SplitterPanel;
