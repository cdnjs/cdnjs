import React, { Component } from 'react';
import { classNames, Ripple, UniqueComponentId, DomHandler, ZIndexUtils, CSSTransition, Portal } from 'primereact/core';

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
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
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
  _extends = Object.assign || function (target) {
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

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GalleriaItemComponent = /*#__PURE__*/function (_Component) {
  _inherits(GalleriaItemComponent, _Component);

  var _super = _createSuper$2(GalleriaItemComponent);

  function GalleriaItemComponent(props) {
    var _this;

    _classCallCheck(this, GalleriaItemComponent);

    _this = _super.call(this, props);
    _this.navForward = _this.navForward.bind(_assertThisInitialized(_this));
    _this.navBackward = _this.navBackward.bind(_assertThisInitialized(_this));
    _this.next = _this.next.bind(_assertThisInitialized(_this));
    _this.prev = _this.prev.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GalleriaItemComponent, [{
    key: "step",
    value: function step(index) {
      if (this.itemsContainer) {
        this.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(index * 100, "%, 0)") : "translate3d(".concat(index * 100, "%, 0, 0)");
        this.itemsContainer.style.transition = 'transform 500ms ease 0s';
      }
    }
  }, {
    key: "next",
    value: function next() {
      var nextItemIndex = this.props.activeItemIndex + 1;
      this.props.onActiveItemChange({
        index: this.props.circular && this.props.value.length - 1 === this.props.activeItemIndex ? 0 : nextItemIndex
      });
    }
  }, {
    key: "prev",
    value: function prev() {
      var prevItemIndex = this.props.activeItemIndex !== 0 ? this.props.activeItemIndex - 1 : 0;
      this.props.onActiveItemChange({
        index: this.props.circular && this.props.activeItemIndex === 0 ? this.props.value.length - 1 : prevItemIndex
      });
    }
  }, {
    key: "stopSlideShow",
    value: function stopSlideShow() {
      if (this.props.slideShowActive && this.props.stopSlideShow) {
        this.props.stopSlideShow();
      }
    }
  }, {
    key: "navBackward",
    value: function navBackward(e) {
      this.stopSlideShow();
      this.prev();

      if (e && e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "navForward",
    value: function navForward(e) {
      this.stopSlideShow();
      this.next();

      if (e && e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "onIndicatorClick",
    value: function onIndicatorClick(index) {
      this.stopSlideShow();
      this.props.onActiveItemChange({
        index: index
      });
    }
  }, {
    key: "onIndicatorMouseEnter",
    value: function onIndicatorMouseEnter(index) {
      if (this.props.changeItemOnIndicatorHover) {
        this.stopSlideShow();
        this.props.onActiveItemChange({
          index: index
        });
      }
    }
  }, {
    key: "onIndicatorKeyDown",
    value: function onIndicatorKeyDown(event, index) {
      if (event.which === 13) {
        this.stopSlideShow();
        this.props.onActiveItemChange({
          index: index
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoPlay) {
        this.props.startSlideShow();
      }
    }
  }, {
    key: "renderBackwardNavigator",
    value: function renderBackwardNavigator() {
      if (this.props.showItemNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === 0;
        var buttonClassName = classNames('p-galleria-item-prev p-galleria-item-nav p-link', {
          'p-disabled': isDisabled
        });
        return /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: buttonClassName,
          onClick: this.navBackward,
          disabled: isDisabled
        }, /*#__PURE__*/React.createElement("span", {
          className: "p-galleria-item-prev-icon pi pi-chevron-left"
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator() {
      if (this.props.showItemNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === this.props.value.length - 1;
        var buttonClassName = classNames('p-galleria-item-next p-galleria-item-nav p-link', {
          'p-disabled': isDisabled
        });
        return /*#__PURE__*/React.createElement("button", {
          type: "button",
          className: buttonClassName,
          onClick: this.navForward,
          disabled: isDisabled
        }, /*#__PURE__*/React.createElement("span", {
          className: "p-galleria-item-next-icon pi pi-chevron-right"
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderCaption",
    value: function renderCaption() {
      if (this.props.caption) {
        var content = this.props.caption(this.props.value[this.props.activeItemIndex]);
        return /*#__PURE__*/React.createElement("div", {
          className: "p-galleria-caption"
        }, content);
      }

      return null;
    }
  }, {
    key: "renderIndicator",
    value: function renderIndicator(index) {
      var _this2 = this;

      var indicator = this.props.indicator && this.props.indicator(index);
      var isActive = this.props.activeItemIndex === index;
      var indicatorItemClassName = classNames('p-galleria-indicator', {
        'p-highlight': isActive
      });

      if (!indicator) {
        indicator = /*#__PURE__*/React.createElement("button", {
          type: "button",
          tabIndex: -1,
          className: "p-link"
        }, /*#__PURE__*/React.createElement(Ripple, null));
      }

      return /*#__PURE__*/React.createElement("li", {
        className: indicatorItemClassName,
        key: 'p-galleria-indicator-' + index,
        tabIndex: 0,
        onClick: function onClick() {
          return _this2.onIndicatorClick(index);
        },
        onMouseEnter: function onMouseEnter() {
          return _this2.onIndicatorMouseEnter(index);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.onIndicatorKeyDown(e, index);
        }
      }, indicator);
    }
  }, {
    key: "renderIndicators",
    value: function renderIndicators() {
      if (this.props.showIndicators) {
        var indicatorsContentClassName = classNames('p-galleria-indicators p-reset', this.props.indicatorsContentClassName);
        var indicators = [];

        for (var i = 0; i < this.props.value.length; i++) {
          indicators.push(this.renderIndicator(i));
        }

        return /*#__PURE__*/React.createElement("ul", {
          className: indicatorsContentClassName
        }, indicators);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var content = this.props.itemTemplate && this.props.itemTemplate(this.props.value[this.props.activeItemIndex]);
      var backwardNavigator = this.renderBackwardNavigator();
      var forwardNavigator = this.renderForwardNavigator();
      var caption = this.renderCaption();
      var indicators = this.renderIndicators();
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.props.forwardRef(el);
        },
        className: "p-galleria-item-wrapper"
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-item-container"
      }, backwardNavigator, /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-item"
      }, content), forwardNavigator, caption), indicators);
    }
  }]);

  return GalleriaItemComponent;
}(Component);

var GalleriaItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(GalleriaItemComponent, _extends({
    forwardRef: ref
  }, props));
});

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

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GalleriaThumbnailItem = /*#__PURE__*/function (_Component) {
  _inherits(GalleriaThumbnailItem, _Component);

  var _super = _createSuper$1(GalleriaThumbnailItem);

  function GalleriaThumbnailItem(props) {
    var _this;

    _classCallCheck(this, GalleriaThumbnailItem);

    _this = _super.call(this, props);
    _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
    _this.onItemKeyDown = _this.onItemKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(GalleriaThumbnailItem, [{
    key: "onItemClick",
    value: function onItemClick(event) {
      this.props.onItemClick({
        originalEvent: event,
        index: this.props.index
      });
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event) {
      if (event.which === 13) {
        this.props.onItemClick({
          originalEvent: event,
          index: this.props.index
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.props.template && this.props.template(this.props.item);
      var itemClassName = classNames(this.props.className, 'p-galleria-thumbnail-item', {
        'p-galleria-thumbnail-item-current': this.props.current,
        'p-galleria-thumbnail-item-active': this.props.active,
        'p-galleria-thumbnail-item-start': this.props.start,
        'p-galleria-thumbnail-item-end': this.props.end
      });
      return /*#__PURE__*/React.createElement("div", {
        className: itemClassName
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-thumbnail-item-content",
        tabIndex: this.props.active ? 0 : null,
        onClick: this.onItemClick,
        onKeyDown: this.onItemKeyDown
      }, content));
    }
  }]);

  return GalleriaThumbnailItem;
}(Component);

_defineProperty(GalleriaThumbnailItem, "defaultProps", {
  index: null,
  template: null,
  item: null,
  current: false,
  active: false,
  start: false,
  end: false,
  className: null,
  onItemClick: null
});

var GalleriaThumbnails = /*#__PURE__*/function (_Component2) {
  _inherits(GalleriaThumbnails, _Component2);

  var _super2 = _createSuper$1(GalleriaThumbnails);

  function GalleriaThumbnails(props) {
    var _this2;

    _classCallCheck(this, GalleriaThumbnails);

    _this2 = _super2.call(this, props);
    _this2.state = {
      numVisible: props.numVisible,
      totalShiftedItems: 0,
      page: 0
    };
    _this2.navForward = _this2.navForward.bind(_assertThisInitialized(_this2));
    _this2.navBackward = _this2.navBackward.bind(_assertThisInitialized(_this2));
    _this2.onTransitionEnd = _this2.onTransitionEnd.bind(_assertThisInitialized(_this2));
    _this2.onTouchStart = _this2.onTouchStart.bind(_assertThisInitialized(_this2));
    _this2.onTouchMove = _this2.onTouchMove.bind(_assertThisInitialized(_this2));
    _this2.onTouchEnd = _this2.onTouchEnd.bind(_assertThisInitialized(_this2));
    _this2.onItemClick = _this2.onItemClick.bind(_assertThisInitialized(_this2));
    _this2.attributeSelector = UniqueComponentId();
    return _this2;
  }

  _createClass(GalleriaThumbnails, [{
    key: "step",
    value: function step(dir) {
      var totalShiftedItems = this.state.totalShiftedItems + dir;

      if (dir < 0 && -1 * totalShiftedItems + this.state.numVisible > this.props.value.length - 1) {
        totalShiftedItems = this.state.numVisible - this.props.value.length;
      } else if (dir > 0 && totalShiftedItems > 0) {
        totalShiftedItems = 0;
      }

      if (this.props.circular) {
        if (dir < 0 && this.props.value.length - 1 === this.props.activeItemIndex) {
          totalShiftedItems = 0;
        } else if (dir > 0 && this.props.activeItemIndex === 0) {
          totalShiftedItems = this.state.numVisible - this.props.value.length;
        }
      }

      if (this.itemsContainer) {
        DomHandler.removeClass(this.itemsContainer, 'p-items-hidden');
        this.itemsContainer.style.transform = this.props.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0, 0)");
        this.itemsContainer.style.transition = 'transform 500ms ease 0s';
      }

      this.setState({
        totalShiftedItems: totalShiftedItems
      });
    }
  }, {
    key: "stopSlideShow",
    value: function stopSlideShow() {
      if (this.props.slideShowActive && this.props.stopSlideShow) {
        this.props.stopSlideShow();
      }
    }
  }, {
    key: "getMedianItemIndex",
    value: function getMedianItemIndex() {
      var index = Math.floor(this.state.numVisible / 2);
      return this.state.numVisible % 2 ? index : index - 1;
    }
  }, {
    key: "navBackward",
    value: function navBackward(e) {
      this.stopSlideShow();
      var prevItemIndex = this.props.activeItemIndex !== 0 ? this.props.activeItemIndex - 1 : 0;
      var diff = prevItemIndex + this.state.totalShiftedItems;

      if (this.state.numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.state.totalShiftedItems !== 0 || this.props.circular)) {
        this.step(1);
      }

      this.props.onActiveItemChange({
        index: this.props.circular && this.props.activeItemIndex === 0 ? this.props.value.length - 1 : prevItemIndex
      });

      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "navForward",
    value: function navForward(e) {
      this.stopSlideShow();
      var nextItemIndex = this.props.activeItemIndex + 1;

      if (nextItemIndex + this.state.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.state.totalShiftedItems < this.getTotalPageNumber() - 1 || this.props.circular)) {
        this.step(-1);
      }

      this.props.onActiveItemChange({
        index: this.props.circular && this.props.value.length - 1 === this.props.activeItemIndex ? 0 : nextItemIndex
      });

      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(event) {
      this.stopSlideShow();
      var selectedItemIndex = event.index;

      if (selectedItemIndex !== this.props.activeItemIndex) {
        var diff = selectedItemIndex + this.state.totalShiftedItems;
        var dir = 0;

        if (selectedItemIndex < this.props.activeItemIndex) {
          dir = this.state.numVisible - diff - 1 - this.getMedianItemIndex();

          if (dir > 0 && -1 * this.state.totalShiftedItems !== 0) {
            this.step(dir);
          }
        } else {
          dir = this.getMedianItemIndex() - diff;

          if (dir < 0 && -1 * this.state.totalShiftedItems < this.getTotalPageNumber() - 1) {
            this.step(dir);
          }
        }

        this.props.onActiveItemChange({
          index: selectedItemIndex
        });
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd(e) {
      if (this.itemsContainer && e.propertyName === 'transform') {
        DomHandler.addClass(this.itemsContainer, 'p-items-hidden');
        this.itemsContainer.style.transition = '';
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var touchobj = e.changedTouches[0];
      this.startPos = {
        x: touchobj.pageX,
        y: touchobj.pageY
      };
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var touchobj = e.changedTouches[0];

      if (this.props.isVertical) {
        this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
      } else {
        this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
      }
    }
  }, {
    key: "changePageOnTouch",
    value: function changePageOnTouch(e, diff) {
      if (diff < 0) {
        // left
        this.navForward(e);
      } else {
        // right
        this.navBackward(e);
      }
    }
  }, {
    key: "getTotalPageNumber",
    value: function getTotalPageNumber() {
      return this.props.value.length > this.state.numVisible ? this.props.value.length - this.state.numVisible + 1 : 0;
    }
  }, {
    key: "createStyle",
    value: function createStyle() {
      if (!this.thumbnailsStyle) {
        this.thumbnailsStyle = document.createElement('style');
        document.body.appendChild(this.thumbnailsStyle);
      }

      var innerHTML = "\n            .p-galleria-thumbnail-items[".concat(this.attributeSelector, "] .p-galleria-thumbnail-item {\n                flex: 1 0 ").concat(100 / this.state.numVisible, "%\n            }\n        ");

      if (this.props.responsiveOptions) {
        this.responsiveOptions = _toConsumableArray(this.props.responsiveOptions);
        this.responsiveOptions.sort(function (data1, data2) {
          var value1 = data1.breakpoint;
          var value2 = data2.breakpoint;
          var result = null;
          if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
            numeric: true
          });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
          return -1 * result;
        });

        for (var i = 0; i < this.responsiveOptions.length; i++) {
          var res = this.responsiveOptions[i];
          innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        .p-galleria-thumbnail-items[").concat(this.attributeSelector, "] .p-galleria-thumbnail-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
        }
      }

      this.thumbnailsStyle.innerHTML = innerHTML;
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition() {
      if (this.itemsContainer && this.responsiveOptions) {
        var windowWidth = window.innerWidth;
        var matchedResponsiveData = {
          numVisible: this.props.numVisible
        };

        for (var i = 0; i < this.responsiveOptions.length; i++) {
          var res = this.responsiveOptions[i];

          if (parseInt(res.breakpoint, 10) >= windowWidth) {
            matchedResponsiveData = res;
          }
        }

        if (this.state.numVisible !== matchedResponsiveData.numVisible) {
          this.setState({
            numVisible: matchedResponsiveData.numVisible
          });
        }
      }
    }
  }, {
    key: "bindDocumentListeners",
    value: function bindDocumentListeners() {
      var _this3 = this;

      if (!this.documentResizeListener) {
        this.documentResizeListener = function () {
          _this3.calculatePosition();
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }
  }, {
    key: "unbindDocumentListeners",
    value: function unbindDocumentListeners() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.itemsContainer) {
        this.itemsContainer.setAttribute(this.attributeSelector, '');
      }

      this.createStyle();
      this.calculatePosition();

      if (this.props.responsiveOptions) {
        this.bindDocumentListeners();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var totalShiftedItems = this.state.totalShiftedItems;

      if (prevState.numVisible !== this.state.numVisible || prevProps.activeItemIndex !== this.props.activeItemIndex) {
        if (this.props.activeItemIndex <= this.getMedianItemIndex()) {
          totalShiftedItems = 0;
        } else if (this.props.value.length - this.state.numVisible + this.getMedianItemIndex() < this.props.activeItemIndex) {
          totalShiftedItems = this.state.numVisible - this.props.value.length;
        } else if (this.props.value.length - this.state.numVisible < this.props.activeItemIndex && this.state.numVisible % 2 === 0) {
          totalShiftedItems = this.props.activeItemIndex * -1 + this.getMedianItemIndex() + 1;
        } else {
          totalShiftedItems = this.props.activeItemIndex * -1 + this.getMedianItemIndex();
        }

        if (totalShiftedItems !== this.state.totalShiftedItems) {
          this.setState({
            totalShiftedItems: totalShiftedItems
          });
        }

        this.itemsContainer.style.transform = this.props.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0, 0)");

        if (prevProps.activeItemIndex !== this.props.activeItemIndex) {
          DomHandler.removeClass(this.itemsContainer, 'p-items-hidden');
          this.itemsContainer.style.transition = 'transform 500ms ease 0s';
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.responsiveOptions) {
        this.unbindDocumentListeners();
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this4 = this;

      return this.props.value.map(function (item, index) {
        var firstIndex = _this4.state.totalShiftedItems * -1,
            lastIndex = firstIndex + _this4.state.numVisible - 1,
            isActive = firstIndex <= index && lastIndex >= index,
            start = firstIndex === index,
            end = lastIndex === index,
            current = _this4.props.activeItemIndex === index;
        return /*#__PURE__*/React.createElement(GalleriaThumbnailItem, {
          key: index,
          index: index,
          template: _this4.props.itemTemplate,
          item: item,
          active: isActive,
          start: start,
          end: end,
          onItemClick: _this4.onItemClick,
          current: current
        });
      });
    }
  }, {
    key: "renderBackwardNavigator",
    value: function renderBackwardNavigator() {
      if (this.props.showThumbnailNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === 0 || this.props.value.length <= this.state.numVisible;
        var buttonClassName = classNames('p-galleria-thumbnail-prev p-link', {
          'p-disabled': isDisabled
        }),
            iconClassName = classNames('p-galleria-thumbnail-prev-icon pi', {
          'pi-chevron-left': !this.props.isVertical,
          'pi-chevron-up': this.props.isVertical
        });
        return /*#__PURE__*/React.createElement("button", {
          className: buttonClassName,
          onClick: this.navBackward,
          disabled: isDisabled
        }, /*#__PURE__*/React.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator() {
      if (this.props.showThumbnailNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === this.props.value.length - 1 || this.props.value.length <= this.state.numVisible;
        var buttonClassName = classNames('p-galleria-thumbnail-next p-link', {
          'p-disabled': isDisabled
        }),
            iconClassName = classNames('p-galleria-thumbnail-next-icon pi', {
          'pi-chevron-right': !this.props.isVertical,
          'pi-chevron-down': this.props.isVertical
        });
        return /*#__PURE__*/React.createElement("button", {
          className: buttonClassName,
          onClick: this.navForward,
          disabled: isDisabled
        }, /*#__PURE__*/React.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React.createElement(Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this5 = this;

      var items = this.renderItems();
      var height = this.props.isVertical ? this.props.contentHeight : '';
      var backwardNavigator = this.renderBackwardNavigator();
      var forwardNavigator = this.renderForwardNavigator();
      return /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-thumbnail-container"
      }, backwardNavigator, /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-thumbnail-items-container",
        style: {
          'height': height
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this5.itemsContainer = el;
        },
        className: "p-galleria-thumbnail-items",
        onTransitionEnd: this.onTransitionEnd,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd
      }, items)), forwardNavigator);
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.renderContent();
      return /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-thumbnail-wrapper"
      }, content);
    }
  }]);

  return GalleriaThumbnails;
}(Component);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Galleria = /*#__PURE__*/function (_Component) {
  _inherits(Galleria, _Component);

  var _super = _createSuper(Galleria);

  function Galleria(props) {
    var _this;

    _classCallCheck(this, Galleria);

    _this = _super.call(this, props);
    _this.state = {
      visible: false,
      numVisible: props.numVisible,
      slideShowActive: false
    };

    if (!_this.props.onItemChange) {
      _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
        activeIndex: props.activeIndex
      });
    }

    _this.onActiveItemChange = _this.onActiveItemChange.bind(_assertThisInitialized(_this));
    _this.show = _this.show.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.startSlideShow = _this.startSlideShow.bind(_assertThisInitialized(_this));
    _this.stopSlideShow = _this.stopSlideShow.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.galleriaRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Galleria, [{
    key: "activeItemIndex",
    get: function get() {
      return this.props.onItemChange ? this.props.activeIndex : this.state.activeIndex;
    }
  }, {
    key: "onActiveItemChange",
    value: function onActiveItemChange(event) {
      if (this.props.onItemChange) {
        this.props.onItemChange(event);
      } else {
        this.setState({
          activeIndex: event.index
        });
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  }, {
    key: "onEntering",
    value: function onEntering() {
      ZIndexUtils.set('modal', this.mask, this.props.baseZIndex);
      DomHandler.addMultipleClasses(this.mask, 'p-component-overlay p-component-overlay-enter');
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
      DomHandler.addClass(this.mask, 'p-component-overlay-leave');
    }
  }, {
    key: "onExited",
    value: function onExited() {
      ZIndexUtils.clear(this.mask);
      this.props.onHide && this.props.onHide();
    }
  }, {
    key: "isAutoPlayActive",
    value: function isAutoPlayActive() {
      return this.state.slideShowActive;
    }
  }, {
    key: "startSlideShow",
    value: function startSlideShow() {
      var _this2 = this;

      this.interval = setInterval(function () {
        var activeIndex = _this2.props.circular && _this2.props.value.length - 1 === _this2.activeItemIndex ? 0 : _this2.activeItemIndex + 1;

        _this2.onActiveItemChange({
          index: activeIndex
        });
      }, this.props.transitionInterval);
      this.setState({
        slideShowActive: true
      });
    }
  }, {
    key: "stopSlideShow",
    value: function stopSlideShow() {
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.setState({
        slideShowActive: false
      });
    }
  }, {
    key: "getPositionClassName",
    value: function getPositionClassName(preClassName, position) {
      var positions = ['top', 'left', 'bottom', 'right'];
      var pos = positions.find(function (item) {
        return item === position;
      });
      return pos ? "".concat(preClassName, "-").concat(pos) : '';
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.props.thumbnailsPosition === 'left' || this.props.thumbnailsPosition === 'right';
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value !== this.props.value) {
        if (this.props.value && this.props.value.length < this.state.numVisible) {
          this.setState({
            numVisible: this.props.value.length
          });
        }
      }

      if (prevProps.numVisible !== this.props.numVisible) {
        this.setState({
          numVisible: this.props.numVisible
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.slideShowActive) {
        this.stopSlideShow();
      }

      ZIndexUtils.clear(this.mask);
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.header) {
        return /*#__PURE__*/React.createElement("div", {
          className: "p-galleria-header"
        }, this.props.header);
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.footer) {
        return /*#__PURE__*/React.createElement("div", {
          className: "p-galleria-footer"
        }, this.props.footer);
      }

      return null;
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this3 = this;

      var isVertical = this.isVertical();
      var thumbnailsPosClassName = this.props.showThumbnails && this.getPositionClassName('p-galleria-thumbnails', this.props.thumbnailsPosition);
      var indicatorPosClassName = this.props.showIndicators && this.getPositionClassName('p-galleria-indicators', this.props.indicatorsPosition);
      var galleriaClassName = classNames('p-galleria p-component', this.props.className, {
        'p-galleria-fullscreen': this.props.fullScreen,
        'p-galleria-indicator-onitem': this.props.showIndicatorsOnItem,
        'p-galleria-item-nav-onhover': this.props.showItemNavigatorsOnHover && !this.props.fullScreen
      }, thumbnailsPosClassName, indicatorPosClassName);
      var closeIcon = this.props.fullScreen && /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "p-galleria-close p-link",
        onClick: this.hide
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-galleria-close-icon pi pi-times"
      }), /*#__PURE__*/React.createElement(Ripple, null));
      var header = this.renderHeader();
      var footer = this.renderFooter();
      var element = /*#__PURE__*/React.createElement("div", {
        ref: this.galleriaRef,
        id: this.props.id,
        className: galleriaClassName,
        style: this.props.style
      }, closeIcon, header, /*#__PURE__*/React.createElement("div", {
        className: "p-galleria-content"
      }, /*#__PURE__*/React.createElement(GalleriaItem, {
        ref: function ref(el) {
          return _this3.previewContent = el;
        },
        value: this.props.value,
        activeItemIndex: this.activeItemIndex,
        onActiveItemChange: this.onActiveItemChange,
        itemTemplate: this.props.item,
        circular: this.props.circular,
        caption: this.props.caption,
        showIndicators: this.props.showIndicators,
        changeItemOnIndicatorHover: this.props.changeItemOnIndicatorHover,
        indicator: this.props.indicator,
        showItemNavigators: this.props.showItemNavigators,
        autoPlay: this.props.autoPlay,
        slideShowActive: this.state.slideShowActive,
        startSlideShow: this.startSlideShow,
        stopSlideShow: this.stopSlideShow
      }), this.props.showThumbnails && /*#__PURE__*/React.createElement(GalleriaThumbnails, {
        value: this.props.value,
        activeItemIndex: this.activeItemIndex,
        onActiveItemChange: this.onActiveItemChange,
        itemTemplate: this.props.thumbnail,
        numVisible: this.state.numVisible,
        responsiveOptions: this.props.responsiveOptions,
        circular: this.props.circular,
        isVertical: isVertical,
        contentHeight: this.props.verticalThumbnailViewPortHeight,
        showThumbnailNavigators: this.props.showThumbnailNavigators,
        autoPlay: this.props.autoPlay,
        slideShowActive: this.state.slideShowActive,
        stopSlideShow: this.stopSlideShow
      })), footer);
      return element;
    }
  }, {
    key: "renderGalleria",
    value: function renderGalleria() {
      var _this4 = this;

      var element = this.renderElement();

      if (this.props.fullScreen) {
        var maskClassName = classNames('p-galleria-mask', {
          'p-galleria-visible': this.state.visible
        });
        var galleriaWrapper = /*#__PURE__*/React.createElement("div", {
          ref: function ref(el) {
            return _this4.mask = el;
          },
          className: maskClassName
        }, /*#__PURE__*/React.createElement(CSSTransition, {
          nodeRef: this.galleriaRef,
          classNames: "p-galleria",
          in: this.state.visible,
          timeout: {
            enter: 150,
            exit: 150
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntering: this.onEntering,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExited: this.onExited
        }, element));
        return /*#__PURE__*/React.createElement(Portal, {
          element: galleriaWrapper
        });
      } else {
        return element;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.value && this.props.value.length > 0 && this.renderGalleria();
    }
  }]);

  return Galleria;
}(Component);

_defineProperty(Galleria, "defaultProps", {
  id: null,
  value: null,
  activeIndex: 0,
  fullScreen: false,
  item: null,
  thumbnail: null,
  indicator: null,
  caption: null,
  className: null,
  style: null,
  header: null,
  footer: null,
  numVisible: 3,
  responsiveOptions: null,
  showItemNavigators: false,
  showThumbnailNavigators: true,
  showItemNavigatorsOnHover: false,
  changeItemOnIndicatorHover: false,
  circular: false,
  autoPlay: false,
  transitionInterval: 4000,
  showThumbnails: true,
  thumbnailsPosition: "bottom",
  verticalThumbnailViewPortHeight: "300px",
  showIndicators: false,
  showIndicatorsOnItem: false,
  indicatorsPosition: "bottom",
  baseZIndex: 0,
  transitionOptions: null,
  onItemChange: null
});

export { Galleria };
