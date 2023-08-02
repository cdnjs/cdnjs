import * as React from 'react';
import PrimeReact, { PrimeReactContext, ariaLabel } from 'primereact/api';
import { usePrevious, useResizeListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronLeftIcon } from 'primereact/icons/chevronleft';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { ChevronUpIcon } from 'primereact/icons/chevronup';
import { Ripple } from 'primereact/ripple';
import { classNames, mergeProps, UniqueComponentId, DomHandler, ObjectUtils, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

var CarouselBase = ComponentBase.extend({
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
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CarouselItem = /*#__PURE__*/React.memo(function (props) {
  var content = props.template(props.item);
  var className = classNames(props.className, 'p-carousel-item', {
    'p-carousel-item-active': props.active,
    'p-carousel-item-start': props.start,
    'p-carousel-item-end': props.end
  });
  var ptParams = props.className && props.className === 'p-carousel-item-cloned' ? props.ptm('itemCloned') : props.ptm('item');
  var itemClonedProps = mergeProps({
    className: className
  }, ptParams);
  return /*#__PURE__*/React.createElement("div", itemClonedProps, content);
});
var Carousel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = CarouselBase.getProps(inProps, context);
  var _React$useState = React.useState(props.numVisible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    numVisibleState = _React$useState2[0],
    setNumVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(props.numScroll),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    numScrollState = _React$useState4[0],
    setNumScrollState = _React$useState4[1];
  var _React$useState5 = React.useState(props.page * props.numScroll * -1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    totalShiftedItemsState = _React$useState6[0],
    setTotalShiftedItemsState = _React$useState6[1];
  var _React$useState7 = React.useState(props.page),
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
    ptm = _CarouselBase$setMeta.ptm;
  var elementRef = React.useRef(null);
  var itemsContainerRef = React.useRef(null);
  var remainingItems = React.useRef(0);
  var allowAutoplay = React.useRef(!!props.autoplayInterval);
  var attributeSelector = React.useRef('');
  var swipeThreshold = React.useRef(20);
  var startPos = React.useRef(null);
  var interval = React.useRef(null);
  var carouselStyle = React.useRef(null);
  var isRemainingItemsAdded = React.useRef(false);
  var responsiveOptions = React.useRef(null);
  var prevNumScroll = usePrevious(numScrollState);
  var prevNumVisible = usePrevious(numVisibleState);
  var prevValue = usePrevious(props.value);
  var prevPage = usePrevious(props.page);
  var isVertical = props.orientation === 'vertical';
  var circular = props.circular || !!props.autoplayInterval;
  var isCircular = circular && props.value && props.value.length >= numVisibleState;
  var totalIndicators = props.value ? Math.max(Math.ceil((props.value.length - numVisibleState) / numScrollState) + 1, 0) : 0;
  var isAutoplay = totalIndicators && props.autoplayInterval && allowAutoplay.current;
  var isControlled = props.onPageChange && !isAutoplay;
  var currentPage = isControlled ? props.page : pageState;
  var _useResizeListener = useResizeListener({
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
      DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
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
          totalShiftedItems -= matchedResponsiveData.numVisible;
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
  var onDotClick = function onDotClick(e, page) {
    if (page > currentPage) {
      navForward(e, page);
    } else if (page < currentPage) {
      navBackward(e, page);
    }
  };
  var onTransitionEnd = function onTransitionEnd(e) {
    if (itemsContainerRef.current && e.propertyName === 'transform') {
      DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
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
      carouselStyle.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
    }
    var innerHTML = "\n            .p-carousel[".concat(attributeSelector.current, "] .p-carousel-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");
    if (props.responsiveOptions) {
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return ObjectUtils.sort(value1, value2, -1, context && context.locale || PrimeReact.locale, context && context.nullSortOrder || PrimeReact.nullSortOrder);
      });
      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        .p-carousel[").concat(attributeSelector.current, "] .p-carousel-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
      }
    }
    carouselStyle.current.innerHTML = innerHTML;
  };
  var destroyStyle = function destroyStyle() {
    carouselStyle.current = DomHandler.removeInlineStyle(carouselStyle.current);
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
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      startAutoplay: startAutoplay,
      stopAutoplay: stopAutoplay,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  useMountEffect(function () {
    if (elementRef.current) {
      attributeSelector.current = UniqueComponentId();
      elementRef.current.setAttribute(attributeSelector.current, '');
    }
    createStyle();
    calculatePosition();
    changePosition(totalShiftedItemsState);
    bindWindowResizeListener();
  });
  useUpdateEffect(function () {
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
        changePage(page);
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
  useUnmountEffect(function () {
    if (props.autoplayInterval) {
      stopAutoplay();
    }
    destroyStyle();
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
          return /*#__PURE__*/React.createElement(CarouselItem, {
            key: key,
            className: "p-carousel-item-cloned",
            template: props.itemTemplate,
            item: item,
            active: isActive,
            start: start,
            end: end,
            ptm: ptm
          });
        });
        clonedElements = props.value.slice(0, numVisibleState);
        clonedItemsForFinishing = clonedElements.map(function (item, index) {
          var isActive = totalShiftedItemsState === 0;
          var start = index === 0;
          var end = index === clonedElements.length - 1;
          var key = index + '_fcloned';
          return /*#__PURE__*/React.createElement(CarouselItem, {
            key: key,
            className: "p-carousel-item-cloned",
            template: props.itemTemplate,
            item: item,
            active: isActive,
            start: start,
            end: end,
            ptm: ptm
          });
        });
      }
      var items = props.value.map(function (item, index) {
        var firstIndex = isCircular ? -1 * (totalShiftedItemsState + numVisibleState) : totalShiftedItemsState * -1;
        var lastIndex = firstIndex + numVisibleState - 1;
        var isActive = firstIndex <= index && lastIndex >= index;
        var start = firstIndex === index;
        var end = lastIndex === index;
        return /*#__PURE__*/React.createElement(CarouselItem, {
          key: index,
          template: props.itemTemplate,
          item: item,
          active: isActive,
          start: start,
          end: end,
          ptm: ptm
        });
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, clonedItemsForStarting, items, clonedItemsForFinishing);
    }
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var headerProps = mergeProps({
        className: 'p-carousel-header'
      }, ptm('header'));
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var footerProps = mergeProps({
        className: 'p-carousel-footer'
      }, ptm('footer'));
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createContent = function createContent() {
    var items = createItems();
    var height = isVertical ? props.verticalViewPortHeight : 'auto';
    var backwardNavigator = createBackwardNavigator();
    var forwardNavigator = createForwardNavigator();
    var className = classNames('p-carousel-container', props.containerClassName);
    var itemsContentProps = mergeProps({
      className: 'p-carousel-items-content',
      style: {
        height: height
      },
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
      className: className
    }, ptm('container'));
    var itemsContainerProps = mergeProps({
      ref: itemsContainerRef,
      className: 'p-carousel-items-container',
      onTransitionEnd: onTransitionEnd
    }, ptm('itemsContainer'));
    return /*#__PURE__*/React.createElement("div", containerProps, backwardNavigator, /*#__PURE__*/React.createElement("div", itemsContentProps, /*#__PURE__*/React.createElement("div", itemsContainerProps, items)), forwardNavigator);
  };
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && currentPage === 0;
      var _className = classNames('p-carousel-prev p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-carousel-prev-icon';
      var previousButtonIconProps = mergeProps({
        className: iconClassName
      }, ptm('previousButtonIcon'));
      var icon = isVertical ? props.prevIcon || /*#__PURE__*/React.createElement(ChevronUpIcon, previousButtonIconProps) : props.prevIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousButtonIconProps);
      var backwardNavigatorIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, previousButtonIconProps), {
        props: props
      });
      var previousButtonProps = mergeProps({
        type: 'button',
        className: _className,
        onClick: function onClick(e) {
          return navBackward(e);
        },
        disabled: isDisabled,
        'aria-label': ariaLabel('previousPageLabel')
      }, ptm('previousButton'));
      return /*#__PURE__*/React.createElement("button", previousButtonProps, backwardNavigatorIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && (currentPage === totalIndicators - 1 || totalIndicators === 0);
      var _className2 = classNames('p-carousel-next p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-carousel-next-icon';
      var nextButtonIconProps = mergeProps({
        className: iconClassName
      }, ptm('nextButtonIcon'));
      var icon = isVertical ? props.nextIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, nextButtonIconProps) : props.nextIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, nextButtonIconProps);
      var forwardNavigatorIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, nextButtonIconProps), {
        props: props
      });
      var nextButtonProps = mergeProps({
        type: 'button',
        className: _className2,
        onClick: function onClick(e) {
          return navForward(e);
        },
        disabled: isDisabled,
        'aria-label': ariaLabel('nextPageLabel')
      }, ptm('nextButton'));
      return /*#__PURE__*/React.createElement("button", nextButtonProps, forwardNavigatorIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createIndicator = function createIndicator(index) {
    var isActive = currentPage === index;
    var key = 'carousel-indicator-' + index;
    var className = classNames('p-carousel-indicator', {
      'p-highlight': isActive
    });
    var indicatorProps = mergeProps({
      key: key,
      className: className
    }, ptm('indicator'));
    var indicatorButtonProps = mergeProps({
      type: 'button',
      className: 'p-link',
      onClick: function onClick(e) {
        return onDotClick(e, index);
      },
      'aria-label': "".concat(ariaLabel('pageLabel'), " ").concat(index + 1)
    }, ptm('indicatorButton'));
    return /*#__PURE__*/React.createElement("li", indicatorProps, /*#__PURE__*/React.createElement("button", indicatorButtonProps, /*#__PURE__*/React.createElement(Ripple, null)));
  };
  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var _className3 = classNames('p-carousel-indicators p-reset', props.indicatorsContentClassName);
      var _indicators = [];
      for (var i = 0; i < totalIndicators; i++) {
        _indicators.push(createIndicator(i));
      }
      var indicatorsProps = mergeProps({
        className: _className3
      }, ptm('indicators'));
      return /*#__PURE__*/React.createElement("ul", indicatorsProps, _indicators);
    }
    return null;
  };
  var className = classNames('p-carousel p-component', {
    'p-carousel-vertical': isVertical,
    'p-carousel-horizontal': !isVertical
  }, props.className);
  var contentClassName = classNames('p-carousel-content', props.contentClassName);
  var content = createContent();
  var indicators = createIndicators();
  var header = createHeader();
  var footer = createFooter();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, CarouselBase.getOtherProps(props), ptm('root'));
  var contentProps = mergeProps({
    className: contentClassName
  }, ptm('content'));
  return /*#__PURE__*/React.createElement("div", rootProps, header, /*#__PURE__*/React.createElement("div", contentProps, content, indicators), footer);
}));
CarouselItem.displayName = 'CarouselItem';
Carousel.displayName = 'Carousel';

export { Carousel };
