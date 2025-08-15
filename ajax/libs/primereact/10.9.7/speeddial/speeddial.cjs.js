'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var api = require('primereact/api');
var button = require('primereact/button');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var minus = require('primereact/icons/minus');
var plus = require('primereact/icons/plus');
var ripple = require('primereact/ripple');
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
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
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

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var styles = "\n@layer primereact {\n    .p-speeddial {\n        position: absolute;\n        display: flex;\n        z-index: 1;\n    }\n\n    .p-speeddial-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        transition: top 0s linear 0.2s;\n        pointer-events: none;\n    }\n\n    .p-speeddial-item {\n        transform: scale(0);\n        opacity: 0;\n        transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;\n        will-change: transform;\n    }\n\n    .p-speeddial-action {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 50%;\n        position: relative;\n        overflow: hidden;\n        text-decoration: none;\n    }\n\n    .p-speeddial-action-icon {\n        pointer-events: none;\n    }\n\n    .p-speeddial-circle .p-speeddial-item,\n    .p-speeddial-semi-circle .p-speeddial-item,\n    .p-speeddial-quarter-circle .p-speeddial-item {\n        position: absolute;\n    }\n\n    .p-speeddial-rotate {\n        transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n        will-change: transform;\n    }\n\n    .p-speeddial-mask {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    }\n\n    .p-speeddial-mask-visible {\n        pointer-events: none;\n        opacity: 1;\n        transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n    }\n\n    .p-speeddial-opened .p-speeddial-list {\n        pointer-events: auto;\n    }\n\n    .p-speeddial-opened .p-speeddial-item {\n        transform: scale(1);\n        opacity: 1;\n    }\n\n    .p-speeddial-opened .p-speeddial-rotate {\n        transform: rotate(45deg);\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      visible = _ref.visible;
    return utils.classNames("p-speeddial p-component p-speeddial-".concat(props.type), _defineProperty(_defineProperty(_defineProperty({}, "p-speeddial-direction-".concat(props.direction), props.type !== 'circle'), 'p-speeddial-opened', visible), 'p-disabled', props.disabled));
  },
  button: function button(_ref2) {
    var props = _ref2.props;
    return utils.classNames('p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    });
  },
  mask: function mask(_ref3) {
    var visible = _ref3.visible;
    return utils.classNames('p-speeddial-mask', {
      'p-speeddial-mask-visible': visible
    });
  },
  action: function action(_ref4) {
    var disabled = _ref4.disabled;
    return utils.classNames('p-speeddial-action', {
      'p-disabled': disabled
    });
  },
  actionIcon: function actionIcon(_ref5) {
    var _icon = _ref5._icon;
    return utils.classNames('p-speeddial-action-icon', _icon);
  },
  menu: 'p-speeddial-list',
  menuitem: function menuitem(_ref6) {
    var active = _ref6.active;
    return utils.classNames('p-speeddial-item', {
      'p-focus': active
    });
  }
};
var inlineStyles = {
  root: function root(_ref7) {
    var props = _ref7.props;
    return {
      alignItems: props.direction === 'up' || props.direction === 'down' ? 'center' : '',
      justifyContent: props.direction === 'left' || props.direction === 'right' ? 'center' : '',
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  },
  menu: function menu(_ref8) {
    var props = _ref8.props;
    return {
      flexDirection: props.direction === 'up' ? 'column-reverse' : props.direction === 'down' ? 'column' : props.direction === 'left' ? 'row-reverse' : props.direction === 'right' ? 'row' : null
    };
  }
};
var SpeedDialBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'SpeedDial',
    id: null,
    model: null,
    visible: false,
    style: null,
    className: null,
    direction: 'up',
    transitionDelay: 30,
    type: 'linear',
    radius: 0,
    mask: false,
    disabled: false,
    hideOnClickOutside: true,
    buttonStyle: null,
    buttonClassName: null,
    buttonTemplate: null,
    'aria-label': null,
    ariaLabelledby: null,
    maskStyle: null,
    maskClassName: null,
    showIcon: null,
    hideIcon: null,
    rotateAnimation: true,
    onVisibleChange: null,
    onClick: null,
    onShow: null,
    onHide: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SpeedDial = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    idState = _React$useState4[0],
    setIdState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focused = _React$useState6[0],
    setFocused = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(-1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedOptionIndex = _React$useState8[0],
    setFocusedOptionIndex = _React$useState8[1];
  var isItemClicked = React__namespace.useRef(false);
  var elementRef = React__namespace.useRef(null);
  var listRef = React__namespace.useRef(null);
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = SpeedDialBase.getProps(inProps, context);
  var visible = props.onVisibleChange ? props.visible : visibleState;
  var speedDialDisplayOrder = hooks.useDisplayOrder('speed-dial', visible);
  var metaData = {
    props: props,
    state: {
      visible: visible
    }
  };
  var _SpeedDialBase$setMet = SpeedDialBase.setMetaData(metaData),
    ptm = _SpeedDialBase$setMet.ptm,
    cx = _SpeedDialBase$setMet.cx,
    sx = _SpeedDialBase$setMet.sx,
    isUnstyled = _SpeedDialBase$setMet.isUnstyled;
  componentbase.useHandleStyle(SpeedDialBase.css.styles, isUnstyled, {
    name: 'speeddial'
  });
  hooks.useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: visible && speedDialDisplayOrder,
    priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.SPEED_DIAL, speedDialDisplayOrder]
  });
  var _useEventListener = hooks.useEventListener({
      type: 'click',
      listener: function listener(event) {
        if (!isItemClicked.current && isOutsideClicked(event)) {
          hide();
        }
        isItemClicked.current = false;
      },
      when: visibleState
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var show = function show() {
    props.onVisibleChange ? props.onVisibleChange(true) : setVisibleState(true);
    props.onShow && props.onShow();
  };
  var onFocus = function onFocus() {
    setFocused(true);
  };
  var onBlur = function onBlur() {
    setFocused(false);
    setFocusedOptionIndex(-1);
  };
  var hide = function hide() {
    props.onVisibleChange ? props.onVisibleChange(false) : setVisibleState(false);
    props.onHide && props.onHide();
  };
  var _onClick = function onClick(e) {
    visible ? hide() : show();
    props.onClick && props.onClick(e);
    isItemClicked.current = true;
  };
  var onItemClick = function onItemClick(e, item) {
    item.command && item.command({
      originalEvent: e,
      item: item
    });
    hide();
    isItemClicked.current = true;
    e.preventDefault();
  };
  var onKeyDown = function onKeyDown(event) {
    switch (event.code) {
      case 'ArrowDown':
        onArrowDown(event);
        break;
      case 'ArrowUp':
        onArrowUp(event);
        break;
      case 'ArrowLeft':
        onArrowLeft(event);
        break;
      case 'ArrowRight':
        onArrowRight(event);
        break;
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        onEnterKey(event);
        break;
      case 'Escape':
        onEscapeKey();
        break;
      case 'Home':
        onHomeKey(event);
        break;
      case 'End':
        onEndKey(event);
        break;
    }
  };
  var onTogglerKeydown = function onTogglerKeydown(event) {
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowLeft':
        onTogglerArrowDown(event);
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        onTogglerArrowUp(event);
        break;
      case 'Escape':
        onEscapeKey();
        break;
    }
  };
  var onTogglerArrowUp = function onTogglerArrowUp(event) {
    setFocused(true);
    utils.DomHandler.focus(listRef.current);
    show();
    navigatePrevItem(event);
    event.preventDefault();
  };
  var onTogglerArrowDown = function onTogglerArrowDown(event) {
    setFocused(true);
    utils.DomHandler.focus(listRef.current);
    show();
    navigateNextItem(event);
    event.preventDefault();
  };
  var onEnterKey = function onEnterKey(event) {
    var items = utils.DomHandler.find(elementRef.current, '[data-pc-section="menuitem"]');
    var itemIndex = _toConsumableArray(items).findIndex(function (item) {
      return item.id === focusedOptionIndex;
    });
    onItemClick(event, props.model[itemIndex]);
    onBlur();
    var buttonEl = utils.DomHandler.findSingle(elementRef.current, 'button');
    buttonEl && utils.DomHandler.focus(buttonEl);
  };
  var onEscapeKey = function onEscapeKey() {
    hide();
    var buttonEl = utils.DomHandler.findSingle(elementRef.current, 'button');
    buttonEl && utils.DomHandler.focus(buttonEl);
  };
  var onArrowUp = function onArrowUp(event) {
    var direction = props.direction;
    if (direction === 'up') {
      navigateNextItem(event);
    } else if (direction === 'down') {
      navigatePrevItem(event);
    } else {
      navigateNextItem(event);
    }
  };
  var onArrowDown = function onArrowDown(event) {
    var direction = props.direction;
    if (direction === 'up') {
      navigatePrevItem(event);
    } else if (direction === 'down') {
      navigateNextItem(event);
    } else {
      navigatePrevItem(event);
    }
  };
  var onArrowLeft = function onArrowLeft(event) {
    var direction = props.direction;
    var leftValidDirections = ['left', 'up-right', 'down-left'];
    var rightValidDirections = ['right', 'up-left', 'down-right'];
    if (leftValidDirections.includes(direction)) {
      navigateNextItem(event);
    } else if (rightValidDirections.includes(direction)) {
      navigatePrevItem(event);
    } else {
      navigatePrevItem(event);
    }
  };
  var onArrowRight = function onArrowRight(event) {
    var direction = props.direction;
    var leftValidDirections = ['left', 'up-right', 'down-left'];
    var rightValidDirections = ['right', 'up-left', 'down-right'];
    if (leftValidDirections.includes(direction)) {
      navigatePrevItem(event);
    } else if (rightValidDirections.includes(direction)) {
      navigateNextItem(event);
    } else {
      navigateNextItem(event);
    }
  };
  var onEndKey = function onEndKey(event) {
    event.preventDefault();
    setFocusedOptionIndex(-1);
    navigatePrevItem(event, -1);
  };
  var onHomeKey = function onHomeKey(event) {
    event.preventDefault();
    setFocusedOptionIndex(-1);
    navigateNextItem(event, -1);
  };
  var navigateNextItem = function navigateNextItem(event) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var optionIndex = findNextOptionIndex(index || focusedOptionIndex);
    changeFocusedOptionIndex(optionIndex);
    event.preventDefault();
  };
  var navigatePrevItem = function navigatePrevItem(event) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var optionIndex = findPrevOptionIndex(index || focusedOptionIndex);
    changeFocusedOptionIndex(optionIndex);
    event.preventDefault();
  };
  var changeFocusedOptionIndex = function changeFocusedOptionIndex(index) {
    var items = utils.DomHandler.find(elementRef.current, '[data-pc-section="menuitem"]');
    var filteredItems = _toConsumableArray(items).filter(function (item) {
      return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
    });
    if (filteredItems[index]) {
      setFocusedOptionIndex(filteredItems[index].getAttribute('id'));
    }
  };
  var findPrevOptionIndex = function findPrevOptionIndex(index) {
    var items = utils.DomHandler.find(elementRef.current, '[data-pc-section="menuitem"]');
    var filteredItems = _toConsumableArray(items).filter(function (item) {
      return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
    });
    var newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
    var matchedOptionIndex = filteredItems.findIndex(function (link) {
      return link.getAttribute('id') === newIndex;
    });
    matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;
    return matchedOptionIndex;
  };
  var findNextOptionIndex = function findNextOptionIndex(index) {
    var items = utils.DomHandler.find(elementRef.current, '[data-pc-section="menuitem"]');
    var filteredItems = _toConsumableArray(items).filter(function (item) {
      return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
    });
    var newIndex = index === -1 ? filteredItems[0].id : index;
    var matchedOptionIndex = filteredItems.findIndex(function (link) {
      return link.getAttribute('id') === newIndex;
    });
    matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;
    return matchedOptionIndex;
  };
  var isOutsideClicked = function isOutsideClicked(event) {
    return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target));
  };
  var isItemActive = function isItemActive(id) {
    return focusedOptionIndex === id;
  };
  var focusedOptionId = function focusedOptionId() {
    return focusedOptionIndex !== -1 ? focusedOptionIndex : null;
  };
  var calculateTransitionDelay = function calculateTransitionDelay(index) {
    var length = props.model.length;
    return (visible ? index : length - index - 1) * props.transitionDelay;
  };
  var calculatePointStyle = function calculatePointStyle(index) {
    var type = props.type;
    if (type !== 'linear') {
      var length = props.model.length;
      var radius = props.radius || length * 20;
      if (type === 'circle') {
        var step = 2 * Math.PI / length;
        return {
          left: "calc(".concat(radius * Math.cos(step * index), "px + var(--item-diff-x, 0px))"),
          top: "calc(".concat(radius * Math.sin(step * index), "px + var(--item-diff-y, 0px))")
        };
      } else if (type === 'semi-circle') {
        var direction = props.direction;
        var _step = Math.PI / (length - 1);
        var x = "calc(".concat(radius * Math.cos(_step * index), "px + var(--item-diff-x, 0px))");
        var y = "calc(".concat(radius * Math.sin(_step * index), "px + var(--item-diff-y, 0px))");
        if (direction === 'up') {
          return {
            left: x,
            bottom: y
          };
        } else if (direction === 'down') {
          return {
            left: x,
            top: y
          };
        } else if (direction === 'left') {
          return {
            right: y,
            top: x
          };
        } else if (direction === 'right') {
          return {
            left: y,
            top: x
          };
        }
      } else if (type === 'quarter-circle') {
        var _direction = props.direction;
        var _step2 = Math.PI / (2 * (length - 1));
        var _x = "calc(".concat(radius * Math.cos(_step2 * index), "px + var(--item-diff-x, 0px))");
        var _y = "calc(".concat(radius * Math.sin(_step2 * index), "px + var(--item-diff-y, 0px))");
        if (_direction === 'up-left') {
          return {
            right: _x,
            bottom: _y
          };
        } else if (_direction === 'up-right') {
          return {
            left: _x,
            bottom: _y
          };
        } else if (_direction === 'down-left') {
          return {
            right: _y,
            top: _x
          };
        } else if (_direction === 'down-right') {
          return {
            left: _y,
            top: _x
          };
        }
      }
    }
    return {};
  };
  var getItemStyle = function getItemStyle(index) {
    var transitionDelay = calculateTransitionDelay(index);
    var pointStyle = calculatePointStyle(index);
    return _objectSpread({
      transitionDelay: "".concat(transitionDelay, "ms")
    }, pointStyle);
  };
  hooks.useMountEffect(function () {
    if (props.type !== 'linear') {
      var _button = utils.DomHandler.findSingle(elementRef.current, '.p-speeddial-button');
      var firstItem = utils.DomHandler.findSingle(listRef.current, '.p-speeddial-item');
      if (_button && firstItem) {
        var wDiff = Math.abs(_button.offsetWidth - firstItem.offsetWidth);
        var hDiff = Math.abs(_button.offsetHeight - firstItem.offsetHeight);
        listRef.current.style.setProperty('--item-diff-x', "".concat(wDiff / 2, "px"));
        listRef.current.style.setProperty('--item-diff-y', "".concat(hDiff / 2, "px"));
      }
    }
  });
  hooks.useUpdateEffect(function () {
    if (visibleState) {
      props.hideOnClickOutside && bindDocumentClickListener();
    }
    return function () {
      props.hideOnClickOutside && unbindDocumentClickListener();
    };
  }, [visibleState]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var disabled = item.disabled,
      _icon = item.icon,
      label = item.label,
      template = item.template,
      url = item.url,
      target = item.target,
      _itemClassName = item.className,
      _itemStyle = item.style;
    var contentClassName = utils.classNames('p-speeddial-action', {
      'p-disabled': disabled
    });
    var iconClassName = utils.classNames('p-speeddial-action-icon', _icon);
    var actionIconProps = mergeProps({
      className: cx('actionIcon')
    }, ptm('actionIcon'));
    var actionProps = mergeProps({
      href: url || '#',
      role: 'menuitem',
      className: utils.classNames(_itemClassName, cx('action', {
        disabled: disabled
      })),
      'aria-label': item.label,
      style: _itemStyle,
      target: target,
      tabIndex: '-1',
      'data-pr-tooltip': label,
      onClick: function onClick(e) {
        return onItemClick(e, item);
      }
    }, ptm('action'));
    var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, actionIconProps), {
      props: props
    });
    var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(e) {
          return onItemClick(e, item);
        },
        className: contentClassName,
        iconClassName: iconClassName,
        element: content,
        props: props,
        visible: visible
      };
      content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    var menuItemProps = mergeProps({
      id: "".concat(idState, "_").concat(index),
      className: cx('menuitem', {
        active: isItemActive("".concat(idState, "_").concat(index))
      }),
      style: getItemStyle(index),
      role: 'menuitem'
    }, ptm('menuitem'));
    return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuItemProps, {
      key: "".concat(idState, "_").concat(index)
    }), content);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var createList = function createList() {
    var items = createItems();
    var menuProps = mergeProps({
      ref: listRef,
      className: cx('menu'),
      style: sx('menu'),
      role: 'menu',
      tabIndex: '-1',
      onFocus: onFocus,
      onKeyDown: onKeyDown,
      onBlur: onBlur,
      'aria-activedescendant': focused ? focusedOptionId() : undefined
    }, ptm('menu'));
    return /*#__PURE__*/React__namespace.createElement("ul", menuProps, items);
  };
  var createButton = function createButton() {
    var showIconVisible = !visible && !!props.showIcon || !props.hideIcon;
    var hideIconVisible = visible && !!props.hideIcon;
    var className = utils.classNames('p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    }, props.buttonClassName);
    var iconClassName = utils.classNames(_defineProperty(_defineProperty({}, "".concat(props.showIcon), !visible && !!props.showIcon || !props.hideIcon), "".concat(props.hideIcon), visible && !!props.hideIcon));
    var icon = showIconVisible ? props.showIcon || /*#__PURE__*/React__namespace.createElement(plus.PlusIcon, null) : hideIconVisible ? props.hideIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, null) : null;
    var toggleIcon = utils.IconUtils.getJSXIcon(icon, undefined, {
      props: props,
      visible: visible
    });
    var buttonProps = mergeProps({
      type: 'button',
      style: props.buttonStyle,
      className: utils.classNames(props.buttonClassName, cx('button')),
      icon: toggleIcon,
      onClick: function onClick(e) {
        return _onClick(e);
      },
      disabled: props.disabled,
      onKeyDown: onTogglerKeydown,
      'aria-label': props['aria-label'],
      'aria-expanded': visible,
      'aria-haspopup': true,
      'aria-controls': getAriaControls,
      'aria-labelledby': props.ariaLabelledby,
      pt: ptm('button'),
      unstyled: props.unstyled,
      __parentMetadata: {
        parent: metaData
      }
    });
    var content = /*#__PURE__*/React__namespace.createElement(button.Button, buttonProps);
    if (props.buttonTemplate) {
      var defaultContentOptions = {
        onClick: _onClick,
        className: className,
        iconClassName: iconClassName,
        element: content,
        props: props,
        visible: visible
      };
      return utils.ObjectUtils.getJSXElement(props.buttonTemplate, defaultContentOptions);
    }
    return content;
  };
  var getAriaControls = function getAriaControls() {
    var ariaControls = '';
    for (var index = 0; index < props.model.length; index++) {
      ariaControls = ariaControls + "".concat(idState, "_").concat(index, " ");
    }
    return ariaControls.trim();
  };
  var createMask = function createMask() {
    if (props.mask) {
      var maskProps = mergeProps({
        className: utils.classNames(props.maskClassName, cx('mask', {
          visible: visible
        })),
        style: props.maskStyle
      }, ptm('mask'));
      return /*#__PURE__*/React__namespace.createElement("div", maskProps);
    }
    return null;
  };
  React__namespace.useEffect(function () {
    setIdState(props.id || utils.UniqueComponentId());
  }, [props.id]);
  var button$1 = createButton();
  var list = createList();
  var mask = createMask();
  var rootProps = mergeProps({
    className: utils.classNames(props.className, cx('root', {
      visible: visible
    })),
    style: _objectSpread(_objectSpread({}, props.style), sx('root')),
    id: idState
  }, SpeedDialBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef
  }, rootProps), button$1, list), mask);
}));
SpeedDial.displayName = 'SpeedDial';

exports.SpeedDial = SpeedDial;
