'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var componentbase = require('primereact/componentbase');
var hooks = require('primereact/hooks');
var chevrondown = require('primereact/icons/chevrondown');
var chevronleft = require('primereact/icons/chevronleft');
var chevronright = require('primereact/icons/chevronright');
var chevronup = require('primereact/icons/chevronup');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

var styles = "\n@layer primereact {\n    .p-carousel {\n        display: flex;\n        flex-direction: column;\n    }\n    \n    .p-carousel-content {\n        display: flex;\n        flex-direction: column;\n        overflow: auto;\n    }\n    \n    .p-carousel-prev,\n    .p-carousel-next {\n        align-self: center;\n        flex-grow: 0;\n        flex-shrink: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-carousel-container {\n        display: flex;\n        flex-direction: row;\n    }\n    \n    .p-carousel-items-content {\n        overflow: hidden;\n        width: 100%;\n    }\n    \n    .p-carousel-items-container {\n        display: flex;\n        flex-direction: row;\n    }\n    \n    .p-carousel-indicators {\n        display: flex;\n        flex-direction: row;\n        justify-content: center;\n        flex-wrap: wrap;\n    }\n    \n    .p-carousel-indicator > button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    /* Vertical */\n    .p-carousel-vertical .p-carousel-container {\n        flex-direction: column;\n    }\n    \n    .p-carousel-vertical .p-carousel-items-container {\n        flex-direction: column;\n        height: 100%;\n    }\n    \n    /* Keyboard Support */\n    .p-items-hidden .p-carousel-item {\n        visibility: hidden;\n    }\n    \n    .p-items-hidden .p-carousel-item.p-carousel-item-active {\n        visibility: visible;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var isVertical = _ref.isVertical;
    return utils.classNames('p-carousel p-component', {
      'p-carousel-vertical': isVertical,
      'p-carousel-horizontal': !isVertical
    });
  },
  container: 'p-carousel-container',
  content: 'p-carousel-content',
  indicators: 'p-carousel-indicators p-reset',
  header: 'p-carousel-header',
  footer: 'p-carousel-footer',
  itemsContainer: 'p-carousel-items-container',
  itemsContent: 'p-carousel-items-content',
  previousButton: function previousButton(_ref2) {
    var isDisabled = _ref2.isDisabled;
    return utils.classNames('p-carousel-prev p-link', {
      'p-disabled': isDisabled
    });
  },
  previousButtonIcon: 'p-carousel-prev-icon',
  nextButton: function nextButton(_ref3) {
    var isDisabled = _ref3.isDisabled;
    return utils.classNames('p-carousel-next p-link', {
      'p-disabled': isDisabled
    });
  },
  nextButtonIcon: 'p-carousel-next-icon',
  indicator: function indicator(_ref4) {
    var isActive = _ref4.isActive;
    return utils.classNames('p-carousel-indicator', {
      'p-highlight': isActive
    });
  },
  indicatorButton: 'p-link',
  itemCloned: function itemCloned(_ref5) {
    var props = _ref5.itemProps;
    return utils.classNames(props.className, 'p-carousel-item', {
      'p-carousel-item-active': props.active,
      'p-carousel-item-start': props.start,
      'p-carousel-item-end': props.end
    });
  },
  item: function item(_ref6) {
    var props = _ref6.itemProps;
    return utils.classNames(props.className, 'p-carousel-item', {
      'p-carousel-item-active': props.active,
      'p-carousel-item-start': props.start,
      'p-carousel-item-end': props.end
    });
  }
};
var inlineStyles = {
  itemsContent: function itemsContent(_ref7) {
    var height = _ref7.height;
    return {
      height: height
    };
  }
};
var CarouselBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Carousel',
    id: null,
    value: null,
    page: 0,
    header: null,
    footer: null,
    style: null,
    className: null,
    itemTemplate: null,
    circular: false,
    showIndicators: true,
    showNavigators: true,
    autoplayInterval: 0,
    numVisible: 1,
    numScroll: 1,
    prevIcon: null,
    nextIcon: null,
    responsiveOptions: null,
    orientation: 'horizontal',
    verticalViewPortHeight: '300px',
    contentClassName: null,
    containerClassName: null,
    indicatorsContentClassName: null,
    onPageChange: null,
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
var CarouselItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var mergeProps = hooks.useMergeProps();
  var ptm = props.ptm,
    cx = props.cx;
  var key = props.className && props.className === 'p-carousel-item-cloned' ? 'itemCloned' : 'item';
  var content = props.template(props.item);
  var itemClonedProps = mergeProps({
    className: cx(key, {
      itemProps: props
    }),
    role: props.role,
    'aria-roledescription': props.ariaRoledescription,
    'aria-label': props.ariaLabel,
    'aria-hidden': props.ariaHidden,
    'data-p-carousel-item-active': props.active,
    'data-p-carousel-item-start': props.start,
    'data-p-carousel-item-end': props.end
  }, ptm(key));
  return /*#__PURE__*/React__namespace.createElement("div", itemClonedProps, content);
});
var Carousel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var mergeProps = hooks.useMergeProps();
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var props = CarouselBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.numVisible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    numVisibleState = _React$useState2[0],
    setNumVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.numScroll),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    numScrollState = _React$useState4[0],
    setNumScrollState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(props.page * props.numScroll * -1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    totalShiftedItemsState = _React$useState6[0],
    setTotalShiftedItemsState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(props.page),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    pageState = _React$useState8[0],
    setPageState = _React$useState8[1];
  var _CarouselBase$setMeta = CarouselBase.setMetaData({
      props: props,
      state: {
        numVisible: numVisibleState,
        numScroll: numScrollState,
        totalShiftedItems: totalShiftedItemsState,
        page: pageState
      }
    }),
    ptm = _CarouselBase$setMeta.ptm,
    cx = _CarouselBase$setMeta.cx,
    sx = _CarouselBase$setMeta.sx,
    isUnstyled = _CarouselBase$setMeta.isUnstyled;
  componentbase.useHandleStyle(CarouselBase.css.styles, isUnstyled, {
    name: 'carousel'
  });
  var elementRef = React__namespace.useRef(null);
  var itemsContainerRef = React__namespace.useRef(null);
  var remainingItems = React__namespace.useRef(0);
  var allowAutoplay = React__namespace.useRef(!!props.autoplayInterval);
  var attributeSelector = React__namespace.useRef('');
  var swipeThreshold = React__namespace.useRef(20);
  var startPos = React__namespace.useRef(null);
  var interval = React__namespace.useRef(null);
  var carouselStyle = React__namespace.useRef(null);
  var indicatorContent = React__namespace.useRef(null);
  var isRemainingItemsAdded = React__namespace.useRef(false);
  var responsiveOptions = React__namespace.useRef(null);
  var prevNumScroll = hooks.usePrevious(numScrollState);
  var prevNumVisible = hooks.usePrevious(numVisibleState);
  var prevValue = hooks.usePrevious(props.value);
  var prevPage = hooks.usePrevious(props.page);
  var isVertical = props.orientation === 'vertical';
  var circular = props.circular || !!props.autoplayInterval;
  var isCircular = circular && props.value && props.value.length >= numVisibleState;
  var totalIndicators = props.value ? Math.max(Math.ceil((props.value.length - numVisibleState) / numScrollState) + 1, 0) : 0;
  var isAutoplay = totalIndicators && props.autoplayInterval && allowAutoplay.current;
  var isControlled = props.onPageChange && !isAutoplay;
  var currentPage = isControlled ? props.page : pageState;
  var _useResizeListener = hooks.useResizeListener({
      listener: function listener() {
        calculatePosition();
      },
      when: props.responsiveOptions
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
    bindWindowResizeListener = _useResizeListener2[0];
  var step = function step(dir, page) {
    var totalShiftedItems = totalShiftedItemsState;
    if (page != null) {
      totalShiftedItems = numScrollState * page * -1;
      if (isCircular) {
        totalShiftedItems = totalShiftedItems - numVisibleState;
      }
      isRemainingItemsAdded.current = false;
    } else {
      totalShiftedItems = totalShiftedItems + numScrollState * dir;
      if (isRemainingItemsAdded.current) {
        totalShiftedItems = totalShiftedItems + (remainingItems.current - numScrollState * dir);
        isRemainingItemsAdded.current = false;
      }
      var originalShiftedItems = isCircular ? totalShiftedItems + numVisibleState : totalShiftedItems;
      page = Math.abs(Math.floor(originalShiftedItems / numScrollState));
    }
    if (isCircular && pageState === totalIndicators - 1 && dir === -1) {
      totalShiftedItems = -1 * (props.value.length + numVisibleState);
      page = 0;
    } else if (isCircular && pageState === 0 && dir === 1) {
      totalShiftedItems = 0;
      page = totalIndicators - 1;
    } else if (page === totalIndicators - 1 && remainingItems.current > 0) {
      totalShiftedItems = totalShiftedItems + (remainingItems.current * -1 - numScrollState * dir);
      isRemainingItemsAdded.current = true;
    }
    if (itemsContainerRef.current) {
      !isUnstyled() && utils.DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
      changePosition(totalShiftedItems);
      itemsContainerRef.current.style.transition = 'transform 500ms ease 0s';
    }
    changePage(page);
    setTotalShiftedItemsState(totalShiftedItems);
  };
  var calculatePosition = function calculatePosition() {
    if (itemsContainerRef.current && responsiveOptions.current) {
      var windowWidth = window.innerWidth;
      var matchedResponsiveData = {
        numVisible: props.numVisible,
        numScroll: props.numScroll
      };
      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        if (parseInt(res.breakpoint, 10) >= windowWidth) {
          matchedResponsiveData = res;
        }
      }
      if (numScrollState !== matchedResponsiveData.numScroll) {
        var page = Math.floor(currentPage * numScrollState / matchedResponsiveData.numScroll);
        var totalShiftedItems = matchedResponsiveData.numScroll * page * -1;
        if (isCircular) {
          totalShiftedItems = totalShiftedItems - matchedResponsiveData.numVisible;
        }
        setTotalShiftedItemsState(totalShiftedItems);
        setNumScrollState(matchedResponsiveData.numScroll);
        changePage(page);
      }
      if (numVisibleState !== matchedResponsiveData.numVisible) {
        setNumVisibleState(matchedResponsiveData.numVisible);
      }
    }
  };
  var navBackward = function navBackward(e, page) {
    if (circular || currentPage !== 0) {
      step(1, page);
    }
    allowAutoplay.current = false;
    if (e.cancelable) {
      e.preventDefault();
    }
  };
  var navForward = function navForward(e, page) {
    if (circular || currentPage < totalIndicators - 1) {
      step(-1, page);
    }
    allowAutoplay.current = false;
    if (e.cancelable) {
      e.preventDefault();
    }
  };
  var onIndicatorClick = function onIndicatorClick(e, page) {
    if (page > currentPage) {
      navForward(e, page);
    } else if (page < currentPage) {
      navBackward(e, page);
    }
  };
  var onTransitionEnd = function onTransitionEnd(e) {
    if (itemsContainerRef.current && e.propertyName === 'transform') {
      utils.DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
      itemsContainerRef.current.style.transition = '';
      if ((pageState === 0 || pageState === totalIndicators - 1) && isCircular) {
        changePosition(totalShiftedItemsState);
      }
    }
  };
  var _onTouchStart = function onTouchStart(e) {
    var touchobj = e.changedTouches[0];
    startPos.current = {
      x: touchobj.pageX,
      y: touchobj.pageY
    };
  };
  var _onTouchMove = function onTouchMove(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  };
  var _onTouchEnd = function onTouchEnd(e) {
    var touchobj = e.changedTouches[0];
    if (isVertical) {
      changePageOnTouch(e, touchobj.pageY - startPos.current.y);
    } else {
      changePageOnTouch(e, touchobj.pageX - startPos.current.x);
    }
  };
  var changePageOnTouch = function changePageOnTouch(e, diff) {
    if (Math.abs(diff) > swipeThreshold.current) {
      if (diff < 0) {
        // left
        navForward(e);
      } else {
        // right
        navBackward(e);
      }
    }
  };
  var onIndicatorKeydown = function onIndicatorKeydown(event) {
    switch (event.code) {
      case 'ArrowRight':
        onRightKey();
        break;
      case 'ArrowLeft':
        onLeftKey();
        break;
      case 'Home':
        onHomeKey();
        event.preventDefault();
        break;
      case 'End':
        onEndKey();
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        break;
      case 'Tab':
        onTabKey();
        break;
    }
  };
  var onRightKey = function onRightKey() {
    var indicators = _toConsumableArray(utils.DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
  };
  var onLeftKey = function onLeftKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
  };
  var onHomeKey = function onHomeKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, 0);
  };
  var onEndKey = function onEndKey() {
    var indicators = _toConsumableArray(utils.DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]r'));
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, indicators.length - 1);
  };
  var onTabKey = function onTabKey() {
    var indicators = _toConsumableArray(utils.DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var highlightedIndex = indicators.findIndex(function (ind) {
      return utils.DomHandler.getAttribute(ind, 'data-p-highlight') === true;
    });
    var activeIndicator = utils.DomHandler.findSingle(indicatorContent.current, '[data-pc-section="indicator"] > button[tabindex="0"]');
    var activeIndex = indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
    indicators[activeIndex].children[0].tabIndex = '-1';
    indicators[highlightedIndex].children[0].tabIndex = '0';
  };
  var findFocusedIndicatorIndex = function findFocusedIndicatorIndex() {
    var indicators = _toConsumableArray(utils.DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var activeIndicator = utils.DomHandler.findSingle(indicatorContent.current, '[data-pc-section="indicator"] > button[tabindex="0"]');
    return indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
  };
  var changedFocusedIndicator = function changedFocusedIndicator(prevInd, nextInd) {
    var indicators = _toConsumableArray(utils.DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    indicators[prevInd].children[0].tabIndex = '-1';
    indicators[nextInd].children[0].tabIndex = '0';
    indicators[nextInd].children[0].focus();
  };
  var startAutoplay = function startAutoplay() {
    if (props.autoplayInterval > 0) {
      interval.current = setInterval(function () {
        if (pageState === totalIndicators - 1) {
          step(-1, 0);
        } else {
          step(-1, pageState + 1);
        }
      }, props.autoplayInterval);
    }
  };
  var stopAutoplay = function stopAutoplay() {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };
  var createStyle = function createStyle() {
    if (!carouselStyle.current) {
      carouselStyle.current = utils.DomHandler.createInlineStyle(context && context.nonce || PrimeReact__default["default"].nonce, context && context.styleContainer);
    }
    var innerHTML = "\n            .p-carousel[".concat(attributeSelector.current, "] .p-carousel-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");
    if (props.responsiveOptions) {
      var comparator = utils.ObjectUtils.localeComparator(context && context.locale || PrimeReact__default["default"].locale);
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return utils.ObjectUtils.sort(value1, value2, -1, comparator, context && context.nullSortOrder || PrimeReact__default["default"].nullSortOrder);
      });
      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        innerHTML = innerHTML + "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        .p-carousel[").concat(attributeSelector.current, "] .p-carousel-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
      }
      calculatePosition();
    }
    carouselStyle.current.innerHTML = innerHTML;
  };
  var destroyStyle = function destroyStyle() {
    carouselStyle.current = utils.DomHandler.removeInlineStyle(carouselStyle.current);
  };
  var changePosition = function changePosition(totalShiftedItems) {
    if (itemsContainerRef.current) {
      itemsContainerRef.current.style.transform = isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / numVisibleState), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / numVisibleState), "%, 0, 0)");
    }
  };
  var changePage = function changePage(page) {
    !isControlled && setPageState(page);
    props.onPageChange && props.onPageChange({
      page: page
    });
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      startAutoplay: startAutoplay,
      stopAutoplay: stopAutoplay,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  hooks.useMountEffect(function () {
    if (elementRef.current) {
      attributeSelector.current = utils.UniqueComponentId();
      elementRef.current.setAttribute(attributeSelector.current, '');
    }
    if (!carouselStyle.current) {
      calculatePosition();
      changePosition(totalShiftedItemsState);
      bindWindowResizeListener();
    }
  });
  hooks.useUpdateEffect(function () {
    var stateChanged = false;
    var totalShiftedItems = totalShiftedItemsState;
    createStyle();
    if (props.autoplayInterval) {
      stopAutoplay();
    }
    if (prevNumScroll !== numScrollState || prevNumVisible !== numVisibleState || props.value && prevValue && prevValue.length !== props.value.length) {
      remainingItems.current = (props.value.length - numVisibleState) % numScrollState;
      var page = currentPage;
      if (totalIndicators !== 0 && page >= totalIndicators) {
        page = totalIndicators - 1;
        changePage(page);
        stateChanged = true;
      }
      totalShiftedItems = page * numScrollState * -1;
      if (isCircular) {
        totalShiftedItems = totalShiftedItems - numVisibleState;
      }
      if (page === totalIndicators - 1 && remainingItems.current > 0) {
        totalShiftedItems = totalShiftedItems + (-1 * remainingItems.current + numScrollState);
        isRemainingItemsAdded.current = true;
      } else {
        isRemainingItemsAdded.current = false;
      }
      if (totalShiftedItems !== totalShiftedItemsState) {
        setTotalShiftedItemsState(totalShiftedItems);
        stateChanged = true;
      }
      changePosition(totalShiftedItems);
    }
    if (isCircular) {
      if (pageState === 0) {
        totalShiftedItems = -1 * numVisibleState;
      } else if (totalShiftedItems === 0) {
        totalShiftedItems = -1 * props.value.length;
        if (remainingItems.current > 0) {
          isRemainingItemsAdded.current = true;
        }
      }
      if (totalShiftedItems !== totalShiftedItemsState) {
        setTotalShiftedItemsState(totalShiftedItems);
        stateChanged = true;
      }
    }
    if (prevPage !== props.page) {
      if (props.page > prevPage && props.page <= totalIndicators - 1) {
        step(-1, props.page);
      } else if (props.page < prevPage) {
        step(1, props.page);
      }
    }
    if (!stateChanged && isAutoplay) {
      startAutoplay();
    }
    return function () {
      if (props.autoplayInterval) {
        stopAutoplay();
      }
      destroyStyle();
    };
  });
  var ariaSlideNumber = function ariaSlideNumber(value) {
    return PrimeReact.ariaLabel('slideNumber', {
      slideNumber: value
    });
  };
  var createItems = function createItems() {
    if (props.value && props.value.length) {
      var clonedItemsForStarting = null;
      var clonedItemsForFinishing = null;
      if (isCircular) {
        var clonedElements = null;
        clonedElements = props.value.slice(-1 * numVisibleState);
        clonedItemsForStarting = clonedElements.map(function (item, index) {
          var isActive = totalShiftedItemsState * -1 === props.value.length + numVisibleState;
          var start = index === 0;
          var end = index === clonedElements.length - 1;
          var key = index + '_scloned';
          return /*#__PURE__*/React__namespace.createElement(CarouselItem, {
            key: key,
            className: "p-carousel-item-cloned",
            template: props.itemTemplate,
            item: item,
            active: isActive,
            start: start,
            end: end,
            ptm: ptm,
            cx: cx
          });
        });
        clonedElements = props.value.slice(0, numVisibleState);
        clonedItemsForFinishing = clonedElements.map(function (item, index) {
          var isActive = totalShiftedItemsState === 0;
          var start = index === 0;
          var end = index === clonedElements.length - 1;
          var key = index + '_fcloned';
          return /*#__PURE__*/React__namespace.createElement(CarouselItem, {
            key: key,
            className: "p-carousel-item-cloned",
            template: props.itemTemplate,
            item: item,
            active: isActive,
            start: start,
            end: end,
            ptm: ptm,
            cx: cx
          });
        });
      }
      var items = props.value.map(function (item, index) {
        var firstIndex = isCircular ? -1 * (totalShiftedItemsState + numVisibleState) : totalShiftedItemsState * -1;
        var lastIndex = firstIndex + numVisibleState - 1;
        var isActive = firstIndex <= index && lastIndex >= index;
        var start = firstIndex === index;
        var end = lastIndex === index;
        var ariaHidden = firstIndex > index || lastIndex < index ? true : undefined;
        var ariaLabel = ariaSlideNumber(index);
        var ariaRoledescription = PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').slide : undefined;
        return /*#__PURE__*/React__namespace.createElement(CarouselItem, {
          key: index,
          template: props.itemTemplate,
          item: item,
          active: isActive,
          start: start,
          ariaHidden: ariaHidden,
          ariaLabel: ariaLabel,
          ariaRoledescription: ariaRoledescription,
          role: "group",
          end: end,
          ptm: ptm,
          cx: cx
        });
      });
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, clonedItemsForStarting, items, clonedItemsForFinishing);
    }
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var headerProps = mergeProps({
        className: cx('header')
      }, ptm('header'));
      return /*#__PURE__*/React__namespace.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var footerProps = mergeProps({
        className: cx('footer')
      }, ptm('footer'));
      return /*#__PURE__*/React__namespace.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createContent = function createContent() {
    var items = createItems();
    var height = isVertical ? props.verticalViewPortHeight : 'auto';
    var backwardNavigator = createBackwardNavigator();
    var forwardNavigator = createForwardNavigator();
    var itemsContentProps = mergeProps({
      className: cx('itemsContent'),
      style: sx('itemsContent', {
        height: height
      }),
      onTouchStart: function onTouchStart(e) {
        return _onTouchStart(e);
      },
      onTouchMove: function onTouchMove(e) {
        return _onTouchMove(e);
      },
      onTouchEnd: function onTouchEnd(e) {
        return _onTouchEnd(e);
      }
    }, ptm('itemsContent'));
    var containerProps = mergeProps({
      className: utils.classNames(props.containerClassName, cx('container')),
      'aria-live': allowAutoplay.current ? 'polite' : 'off'
    }, ptm('container'));
    var itemsContainerProps = mergeProps({
      className: cx('itemsContainer'),
      onTransitionEnd: onTransitionEnd
    }, ptm('itemsContainer'));
    return /*#__PURE__*/React__namespace.createElement("div", containerProps, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", itemsContentProps, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: itemsContainerRef
    }, itemsContainerProps), items)), forwardNavigator);
  };
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && currentPage === 0;
      var previousButtonIconProps = mergeProps({
        className: cx('previousButtonIcon')
      }, ptm('previousButtonIcon'));
      var icon = isVertical ? props.prevIcon || /*#__PURE__*/React__namespace.createElement(chevronup.ChevronUpIcon, previousButtonIconProps) : props.prevIcon || /*#__PURE__*/React__namespace.createElement(chevronleft.ChevronLeftIcon, previousButtonIconProps);
      var backwardNavigatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, previousButtonIconProps), {
        props: props
      });
      var previousButtonProps = mergeProps({
        type: 'button',
        className: cx('previousButton', {
          isDisabled: isDisabled
        }),
        onClick: function onClick(e) {
          return navBackward(e);
        },
        disabled: isDisabled,
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').previousPageLabel : undefined,
        'data-pc-group-section': 'navigator'
      }, ptm('previousButton'));
      return /*#__PURE__*/React__namespace.createElement("button", previousButtonProps, backwardNavigatorIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && (currentPage === totalIndicators - 1 || totalIndicators === 0);
      var nextButtonIconProps = mergeProps({
        className: cx('nextButtonIcon')
      }, ptm('nextButtonIcon'));
      var icon = isVertical ? props.nextIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, nextButtonIconProps) : props.nextIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, nextButtonIconProps);
      var forwardNavigatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, nextButtonIconProps), {
        props: props
      });
      var nextButtonProps = mergeProps({
        type: 'button',
        className: cx('nextButton', {
          isDisabled: isDisabled
        }),
        onClick: function onClick(e) {
          return navForward(e);
        },
        disabled: isDisabled,
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').nextPageLabel : undefined,
        'data-pc-group-section': 'navigator'
      }, ptm('nextButton'));
      return /*#__PURE__*/React__namespace.createElement("button", nextButtonProps, forwardNavigatorIcon, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var ariaPageLabel = function ariaPageLabel(value) {
    return PrimeReact.ariaLabel('pageLabel', {
      page: value
    });
  };
  var createIndicator = function createIndicator(index) {
    var isActive = currentPage === index;
    var getPTOptions = function getPTOptions(key) {
      return ptm(key, {
        context: {
          active: isActive
        }
      });
    };
    var key = 'carousel-indicator-' + index;
    var indicatorProps = mergeProps({
      key: key,
      className: cx('indicator', {
        isActive: isActive
      }),
      'data-p-highlight': isActive
    }, getPTOptions('indicator'));
    var indicatorButtonProps = mergeProps({
      type: 'button',
      className: cx('indicatorButton'),
      tabIndex: currentPage === index ? '0' : '-1',
      onClick: function onClick(e) {
        return onIndicatorClick(e, index);
      },
      'aria-label': ariaPageLabel(index + 1),
      'aria-current': currentPage === index ? 'page' : undefined
    }, getPTOptions('indicatorButton'));
    return /*#__PURE__*/React__namespace.createElement("li", indicatorProps, /*#__PURE__*/React__namespace.createElement("button", indicatorButtonProps, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
  };
  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var _indicators = [];
      for (var i = 0; i < totalIndicators; i++) {
        _indicators.push(createIndicator(i));
      }
      var indicatorsProps = mergeProps({
        ref: indicatorContent,
        className: utils.classNames(props.indicatorsContentClassName, cx('indicators')),
        onKeyDown: onIndicatorKeydown
      }, ptm('indicators'));
      return /*#__PURE__*/React__namespace.createElement("ul", indicatorsProps, _indicators);
    }
    return null;
  };
  var content = createContent();
  var indicators = createIndicators();
  var header = createHeader();
  var footer = createFooter();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: utils.classNames(props.className, cx('root', {
      isVertical: isVertical
    })),
    style: props.style,
    role: 'region'
  }, CarouselBase.getOtherProps(props), ptm('root'));
  var contentProps = mergeProps({
    className: utils.classNames(props.contentClassName, cx('content'))
  }, ptm('content'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, /*#__PURE__*/React__namespace.createElement("div", contentProps, content, indicators), footer);
}));
CarouselItem.displayName = 'CarouselItem';
Carousel.displayName = 'Carousel';

exports.Carousel = Carousel;
