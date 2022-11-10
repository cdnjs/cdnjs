import * as React from 'react';
import PrimeReact, { ariaLabel } from 'primereact/api';
import { usePrevious, useResizeListener, useMountEffect, useUpdateEffect, useUnmountEffect } from 'primereact/hooks';
import { Ripple } from 'primereact/ripple';
import { classNames, UniqueComponentId, ObjectUtils, DomHandler } from 'primereact/utils';

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

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

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
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var CarouselItem = /*#__PURE__*/React.memo(function (props) {
  var content = props.template(props.item);
  var className = classNames(props.className, 'p-carousel-item', {
    'p-carousel-item-active': props.active,
    'p-carousel-item-start': props.start,
    'p-carousel-item-end': props.end
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, content);
});
var Carousel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var currentPage = props.onPageChange ? props.page : pageState;
  var totalIndicators = props.value ? Math.max(Math.ceil((props.value.length - numVisibleState) / numScrollState) + 1, 0) : 0;
  var isAutoplay = totalIndicators && props.autoplayInterval && allowAutoplay.current;

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
      DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
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
      carouselStyle.current = DomHandler.createInlineStyle(PrimeReact.nonce);
    }

    var innerHTML = "\n            .p-carousel[".concat(attributeSelector.current, "] .p-carousel-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");

    if (props.responsiveOptions) {
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return ObjectUtils.sort(value1, value2, -1, PrimeReact.locale, PrimeReact.nullSortOrder);
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

  React.useImperativeHandle(ref, function () {
    return {
      props: props,
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
  useUnmountEffect(function () {
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
          return /*#__PURE__*/React.createElement(CarouselItem, {
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
          return /*#__PURE__*/React.createElement(CarouselItem, {
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
        return /*#__PURE__*/React.createElement(CarouselItem, {
          key: index,
          template: props.itemTemplate,
          item: item,
          active: isActive,
          start: start,
          end: end
        });
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, clonedItemsForStarting, items, clonedItemsForFinishing);
    }
  };

  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-carousel-header"
      }, props.header);
    }

    return null;
  };

  var createFooter = function createFooter() {
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", {
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
    var className = classNames('p-carousel-container', props.containerClassName);
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, backwardNavigator, /*#__PURE__*/React.createElement("div", {
      className: "p-carousel-items-content",
      style: {
        height: height
      },
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }, /*#__PURE__*/React.createElement("div", {
      ref: itemsContainerRef,
      className: "p-carousel-items-container",
      onTransitionEnd: onTransitionEnd
    }, items)), forwardNavigator);
  };

  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && currentPage === 0;

      var _className = classNames('p-carousel-prev p-link', {
        'p-disabled': isDisabled
      });

      var iconClassName = classNames('p-carousel-prev-icon pi', {
        'pi-chevron-left': !isVertical,
        'pi-chevron-up': isVertical
      });
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: _className,
        onClick: navBackward,
        disabled: isDisabled,
        "aria-label": ariaLabel('previousPageLabel')
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }

    return null;
  };

  var createForwardNavigator = function createForwardNavigator() {
    if (props.showNavigators) {
      var isDisabled = (!circular || props.value && props.value.length < numVisibleState) && (currentPage === totalIndicators - 1 || totalIndicators === 0);

      var _className2 = classNames('p-carousel-next p-link', {
        'p-disabled': isDisabled
      });

      var iconClassName = classNames('p-carousel-next-icon pi', {
        'pi-chevron-right': !isVertical,
        'pi-chevron-down': isVertical
      });
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: _className2,
        onClick: navForward,
        disabled: isDisabled,
        "aria-label": ariaLabel('nextPageLabel')
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }

    return null;
  };

  var createIndicator = function createIndicator(index) {
    var isActive = currentPage === index;
    var key = 'carousel-indicator-' + index;
    var className = classNames('p-carousel-indicator', {
      'p-highlight': isActive
    });
    return /*#__PURE__*/React.createElement("li", {
      key: key,
      className: className
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "p-link",
      onClick: function onClick(e) {
        return onDotClick(e, index);
      },
      "aria-label": "".concat(ariaLabel('pageLabel'), " ").concat(index + 1)
    }, /*#__PURE__*/React.createElement(Ripple, null)));
  };

  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var _className3 = classNames('p-carousel-indicators p-reset', props.indicatorsContentClassName);

      var _indicators = [];

      for (var i = 0; i < totalIndicators; i++) {
        _indicators.push(createIndicator(i));
      }

      return /*#__PURE__*/React.createElement("ul", {
        className: _className3
      }, _indicators);
    }

    return null;
  };

  var otherProps = ObjectUtils.findDiffKeys(props, Carousel.defaultProps);
  var className = classNames('p-carousel p-component', {
    'p-carousel-vertical': isVertical,
    'p-carousel-horizontal': !isVertical
  }, props.className);
  var contentClassName = classNames('p-carousel-content', props.contentClassName);
  var content = createContent();
  var indicators = createIndicators();
  var header = createHeader();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), header, /*#__PURE__*/React.createElement("div", {
    className: contentClassName
  }, content, indicators), footer);
}));
CarouselItem.displayName = 'CarouselItem';
Carousel.displayName = 'Carousel';
Carousel.defaultProps = {
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
  onPageChange: null
};

export { Carousel };
