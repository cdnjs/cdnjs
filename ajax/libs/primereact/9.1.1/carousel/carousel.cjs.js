'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var hooks = require('primereact/hooks');
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
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var CarouselBase = {
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
    responsiveOptions: null,
    orientation: 'horizontal',
    verticalViewPortHeight: '300px',
    contentClassName: null,
    containerClassName: null,
    indicatorsContentClassName: null,
    onPageChange: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, CarouselBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, CarouselBase.defaultProps);
  }
};

var CarouselItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var content = props.template(props.item);
  var className = utils.classNames(props.className, 'p-carousel-item', {
    'p-carousel-item-active': props.active,
    'p-carousel-item-start': props.start,
    'p-carousel-item-end': props.end
  });
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: className
  }, content);
});
var Carousel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = CarouselBase.getProps(inProps);
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
  var elementRef = React__namespace.useRef(null);
  var itemsContainerRef = React__namespace.useRef(null);
  var remainingItems = React__namespace.useRef(0);
  var allowAutoplay = React__namespace.useRef(!!props.autoplayInterval);
  var attributeSelector = React__namespace.useRef('');
  var swipeThreshold = React__namespace.useRef(20);
  var startPos = React__namespace.useRef(null);
  var interval = React__namespace.useRef(null);
  var carouselStyle = React__namespace.useRef(null);
  var isRemainingItemsAdded = React__namespace.useRef(false);
  var responsiveOptions = React__namespace.useRef(null);
  var prevNumScroll = hooks.usePrevious(numScrollState);
  var prevNumVisible = hooks.usePrevious(numVisibleState);
  var prevValue = hooks.usePrevious(props.value);
  var prevPage = hooks.usePrevious(props.page);
  var isVertical = props.orientation === 'vertical';
  var circular = props.circular || !!props.autoplayInterval;
  var isCircular = circular && props.value && props.value.length >= numVisibleState;
  var currentPage = props.onPageChange ? props.page : pageState;
  var totalIndicators = props.value ? Math.max(Math.ceil((props.value.length - numVisibleState) / numScrollState) + 1, 0) : 0;
  var isAutoplay = totalIndicators && props.autoplayInterval && allowAutoplay.current;
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
        totalShiftedItems -= numVisibleState;
      }
      isRemainingItemsAdded.current = false;
    } else {
      totalShiftedItems += numScrollState * dir;
      if (isRemainingItemsAdded.current) {
        totalShiftedItems += remainingItems.current - numScrollState * dir;
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
      totalShiftedItems += remainingItems.current * -1 - numScrollState * dir;
      isRemainingItemsAdded.current = true;
    }
    if (itemsContainerRef.current) {
      utils.DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
      changePosition(totalShiftedItems);
      itemsContainerRef.current.style.transition = 'transform 500ms ease 0s';
    }
    if (props.onPageChange) {
      setTotalShiftedItemsState(totalShiftedItems);
      props.onPageChange({
        page: page
      });
    } else {
      setPageState(page);
      setTotalShiftedItemsState(totalShiftedItems);
    }
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
          totalShiftedItems -= matchedResponsiveData.numVisible;
        }
        setTotalShiftedItemsState(totalShiftedItems);
        setNumScrollState(matchedResponsiveData.numScroll);
        if (props.onPageChange) {
          props.onPageChange({
            page: page
          });
        } else {
          setPageState(page);
        }
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
  var onDotClick = function onDotClick(e, page) {
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
  var onTouchStart = function onTouchStart(e) {
    var touchobj = e.changedTouches[0];
    startPos.current = {
      x: touchobj.pageX,
      y: touchobj.pageY
    };
  };
  var onTouchMove = function onTouchMove(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  };
  var onTouchEnd = function onTouchEnd(e) {
    var touchobj = e.changedTouches[0];
    if (isVertical) {
      changePageOnTouch(e, touchobj.pageY - startPos.current.y);
    } else {
      changePageOnTouch(e, touchobj.pageX - startPos.current.x);
    }
  };
  var changePageOnTouch = function changePageOnTouch(e, diff) {
    if (Math.abs(diff) > swipeThreshold) {
      if (diff < 0) {
        // left
        navForward(e);
      } else {
        // right
        navBackward(e);
      }
    }
  };
  var startAutoplay = function startAutoplay() {
    interval.current = setInterval(function () {
      if (pageState === totalIndicators - 1) {
        step(-1, 0);
      } else {
        step(-1, pageState + 1);
      }
    }, props.autoplayInterval);
  };
  var stopAutoplay = function stopAutoplay() {
    if (interval.current) {
      clearInterval(interval.current);
    }
  };
  var createStyle = function createStyle() {
    if (!carouselStyle.current) {
      carouselStyle.current = utils.DomHandler.createInlineStyle(PrimeReact__default["default"].nonce);
    }
    var innerHTML = "\n            .p-carousel[".concat(attributeSelector.current, "] .p-carousel-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");
    if (props.responsiveOptions) {
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return utils.ObjectUtils.sort(value1, value2, -1, PrimeReact__default["default"].locale, PrimeReact__default["default"].nullSortOrder);
      });
      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        .p-carousel[").concat(attributeSelector.current, "] .p-carousel-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
      }
    }
    carouselStyle.current.innerHTML = innerHTML;
  };
  var changePosition = function changePosition(totalShiftedItems) {
    if (itemsContainerRef.current) {
      itemsContainerRef.current.style.transform = isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / numVisibleState), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / numVisibleState), "%, 0, 0)");
    }
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
      attributeSelector.current = utils.UniqueComponentId();
      elementRef.current.setAttribute(attributeSelector.current, '');
    }
    createStyle();
    calculatePosition();
    changePosition(totalShiftedItemsState);
    bindWindowResizeListener();
  });
  hooks.useUpdateEffect(function () {
    var stateChanged = false;
    var totalShiftedItems = totalShiftedItemsState;
    if (props.autoplayInterval) {
      stopAutoplay();
    }
    if (prevNumScroll !== numScrollState || prevNumVisible !== numVisibleState || props.value && prevValue && prevValue.length !== props.value.length) {
      remainingItems.current = (props.value.length - numVisibleState) % numScrollState;
      var page = currentPage;
      if (totalIndicators !== 0 && page >= totalIndicators) {
        page = totalIndicators - 1;
        if (props.onPageChange) {
          props.onPageChange({
            page: page
          });
        } else {
          setPageState(page);
        }
        stateChanged = true;
      }
      totalShiftedItems = page * numScrollState * -1;
      if (isCircular) {
        totalShiftedItems -= numVisibleState;
      }
      if (page === totalIndicators - 1 && remainingItems.current > 0) {
        totalShiftedItems += -1 * remainingItems.current + numScrollState;
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
  });
  hooks.useUnmountEffect(function () {
    if (props.autoplayInterval) {
      stopAutoplay();
    }
  });
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
            end: end
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
            end: end
          });
        });
      }
      var items = props.value.map(function (item, index) {
        var firstIndex = isCircular ? -1 * (totalShiftedItemsState + numVisibleState) : totalShiftedItemsState * -1;
        var lastIndex = firstIndex + numVisibleState - 1;
        var isActive = firstIndex <= index && lastIndex >= index;
        var start = firstIndex === index;
        var end = lastIndex === index;
        return /*#__PURE__*/React__namespace.createElement(CarouselItem, {
          key: index,
          template: props.itemTemplate,
          item: item,
          active: isActive,
          start: start,
          end: end
        });
      });
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, clonedItemsForStarting, items, clonedItemsForFinishing);
    }
  };
  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-carousel-header"
      }, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-carousel-footer"
      }, props.footer);
    }
    return null;
  };
  var createContent = function createContent() {
    var items = createItems();
    var height = isVertical ? props.verticalViewPortHeight : 'auto';
    var backwardNavigator = createBackwardNavigator();
    var forwardNavigator = createForwardNavigator();
    var className = utils.classNames('p-carousel-container', props.containerClassName);
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: className
    }, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-carousel-items-content",
      style: {
        height: height
      },
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }, /*#__PURE__*/React__namespace.createElement("div", {
      ref: itemsContainerRef,
      className: "p-carousel-items-container",
      onTransitionEnd: onTransitionEnd
    }, items)), forwardNavigator);
  };
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && currentPage === 0;
      var _className = utils.classNames('p-carousel-prev p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = utils.classNames('p-carousel-prev-icon pi', {
        'pi-chevron-left': !isVertical,
        'pi-chevron-up': isVertical
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: _className,
        onClick: navBackward,
        disabled: isDisabled,
        "aria-label": PrimeReact.ariaLabel('previousPageLabel')
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && (currentPage === totalIndicators - 1 || totalIndicators === 0);
      var _className2 = utils.classNames('p-carousel-next p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = utils.classNames('p-carousel-next-icon pi', {
        'pi-chevron-right': !isVertical,
        'pi-chevron-down': isVertical
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: _className2,
        onClick: navForward,
        disabled: isDisabled,
        "aria-label": PrimeReact.ariaLabel('nextPageLabel')
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return null;
  };
  var createIndicator = function createIndicator(index) {
    var isActive = currentPage === index;
    var key = 'carousel-indicator-' + index;
    var className = utils.classNames('p-carousel-indicator', {
      'p-highlight': isActive
    });
    return /*#__PURE__*/React__namespace.createElement("li", {
      key: key,
      className: className
    }, /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: "p-link",
      onClick: function onClick(e) {
        return onDotClick(e, index);
      },
      "aria-label": "".concat(PrimeReact.ariaLabel('pageLabel'), " ").concat(index + 1)
    }, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)));
  };
  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var _className3 = utils.classNames('p-carousel-indicators p-reset', props.indicatorsContentClassName);
      var _indicators = [];
      for (var i = 0; i < totalIndicators; i++) {
        _indicators.push(createIndicator(i));
      }
      return /*#__PURE__*/React__namespace.createElement("ul", {
        className: _className3
      }, _indicators);
    }
    return null;
  };
  var otherProps = CarouselBase.getOtherProps(props);
  var className = utils.classNames('p-carousel p-component', {
    'p-carousel-vertical': isVertical,
    'p-carousel-horizontal': !isVertical
  }, props.className);
  var contentClassName = utils.classNames('p-carousel-content', props.contentClassName);
  var content = createContent();
  var indicators = createIndicators();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), header, /*#__PURE__*/React__namespace.createElement("div", {
    className: contentClassName
  }, content, indicators), footer);
}));
CarouselItem.displayName = 'CarouselItem';
Carousel.displayName = 'Carousel';

exports.Carousel = Carousel;
