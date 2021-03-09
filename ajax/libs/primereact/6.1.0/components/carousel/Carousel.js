"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Carousel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CarouselItem = /*#__PURE__*/function (_Component) {
  _inherits(CarouselItem, _Component);

  var _super = _createSuper(CarouselItem);

  function CarouselItem() {
    _classCallCheck(this, CarouselItem);

    return _super.apply(this, arguments);
  }

  _createClass(CarouselItem, [{
    key: "render",
    value: function render() {
      var content = this.props.template(this.props.item);
      var itemClassName = (0, _ClassNames.classNames)(this.props.className, 'p-carousel-item', {
        'p-carousel-item-active': this.props.active,
        'p-carousel-item-start': this.props.start,
        'p-carousel-item-end': this.props.end
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: itemClassName
      }, content);
    }
  }]);

  return CarouselItem;
}(_react.Component);

_defineProperty(CarouselItem, "defaultProps", {
  template: null,
  item: null,
  active: false,
  start: false,
  end: false,
  className: null
});

_defineProperty(CarouselItem, "propTypes", {
  template: _propTypes.default.func,
  item: _propTypes.default.any,
  active: _propTypes.default.bool,
  start: _propTypes.default.bool,
  end: _propTypes.default.bool,
  className: _propTypes.default.string
});

var Carousel = /*#__PURE__*/function (_Component2) {
  _inherits(Carousel, _Component2);

  var _super2 = _createSuper(Carousel);

  function Carousel(props) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _super2.call(this, props);
    _this.state = {
      numVisible: props.numVisible,
      numScroll: props.numScroll,
      totalShiftedItems: props.page * props.numScroll * -1
    };

    if (!_this.props.onPageChange) {
      _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
        page: props.page
      });
    }

    _this.navBackward = _this.navBackward.bind(_assertThisInitialized(_this));
    _this.navForward = _this.navForward.bind(_assertThisInitialized(_this));
    _this.onTransitionEnd = _this.onTransitionEnd.bind(_assertThisInitialized(_this));
    _this.onTouchStart = _this.onTouchStart.bind(_assertThisInitialized(_this));
    _this.onTouchMove = _this.onTouchMove.bind(_assertThisInitialized(_this));
    _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
    _this.totalIndicators = 0;
    _this.remainingItems = 0;
    _this.allowAutoplay = !!_this.props.autoplayInterval;
    _this.circular = _this.props.circular || _this.allowAutoplay;
    _this.swipeThreshold = 20;
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(Carousel, [{
    key: "step",
    value: function step(dir, page) {
      var totalShiftedItems = this.state.totalShiftedItems;
      var isCircular = this.isCircular();

      if (page != null) {
        totalShiftedItems = this.state.numScroll * page * -1;

        if (isCircular) {
          totalShiftedItems -= this.state.numVisible;
        }

        this.isRemainingItemsAdded = false;
      } else {
        totalShiftedItems += this.state.numScroll * dir;

        if (this.isRemainingItemsAdded) {
          totalShiftedItems += this.remainingItems - this.state.numScroll * dir;
          this.isRemainingItemsAdded = false;
        }

        var originalShiftedItems = isCircular ? totalShiftedItems + this.state.numVisible : totalShiftedItems;
        page = Math.abs(Math.floor(originalShiftedItems / this.state.numScroll));
      }

      if (isCircular && this.state.page === this.totalIndicators - 1 && dir === -1) {
        totalShiftedItems = -1 * (this.props.value.length + this.state.numVisible);
        page = 0;
      } else if (isCircular && this.state.page === 0 && dir === 1) {
        totalShiftedItems = 0;
        page = this.totalIndicators - 1;
      } else if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
        totalShiftedItems += this.remainingItems * -1 - this.state.numScroll * dir;
        this.isRemainingItemsAdded = true;
      }

      if (this.itemsContainer) {
        _DomHandler.default.removeClass(this.itemsContainer, 'p-items-hidden');

        this.changePosition(totalShiftedItems);
        this.itemsContainer.style.transition = 'transform 500ms ease 0s';
      }

      if (this.props.onPageChange) {
        this.setState({
          totalShiftedItems: totalShiftedItems
        });
        this.props.onPageChange({
          page: page
        });
      } else {
        this.setState({
          page: page,
          totalShiftedItems: totalShiftedItems
        });
      }
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition() {
      if (this.itemsContainer && this.responsiveOptions) {
        var windowWidth = window.innerWidth;
        var matchedResponsiveData = {
          numVisible: this.props.numVisible,
          numScroll: this.props.numScroll
        };

        for (var i = 0; i < this.responsiveOptions.length; i++) {
          var res = this.responsiveOptions[i];

          if (parseInt(res.breakpoint, 10) >= windowWidth) {
            matchedResponsiveData = res;
          }
        }

        var state = {};

        if (this.state.numScroll !== matchedResponsiveData.numScroll) {
          var page = this.getPage();
          page = Math.floor(page * this.state.numScroll / matchedResponsiveData.numScroll);
          var totalShiftedItems = matchedResponsiveData.numScroll * page * -1;

          if (this.isCircular()) {
            totalShiftedItems -= matchedResponsiveData.numVisible;
          }

          state = {
            totalShiftedItems: totalShiftedItems,
            numScroll: matchedResponsiveData.numScroll
          };

          if (this.props.onPageChange) {
            this.props.onPageChange({
              page: page
            });
          } else {
            state = _objectSpread(_objectSpread({}, state), {}, {
              page: page
            });
          }
        }

        if (this.state.numVisible !== matchedResponsiveData.numVisible) {
          state = _objectSpread(_objectSpread({}, state), {}, {
            numVisible: matchedResponsiveData.numVisible
          });
        }

        if (Object.keys(state).length) {
          this.setState(state);
        }
      }
    }
  }, {
    key: "navBackward",
    value: function navBackward(e, page) {
      if (this.circular || this.getPage() !== 0) {
        this.step(1, page);
      }

      this.allowAutoplay = false;

      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "navForward",
    value: function navForward(e, page) {
      if (this.circular || this.getPage() < this.totalIndicators - 1) {
        this.step(-1, page);
      }

      this.allowAutoplay = false;

      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }, {
    key: "onDotClick",
    value: function onDotClick(e, page) {
      var currentPage = this.getPage();

      if (page > currentPage) {
        this.navForward(e, page);
      } else if (page < currentPage) {
        this.navBackward(e, page);
      }
    }
  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd() {
      if (this.itemsContainer) {
        _DomHandler.default.addClass(this.itemsContainer, 'p-items-hidden');

        this.itemsContainer.style.transition = '';

        if ((this.state.page === 0 || this.state.page === this.totalIndicators - 1) && this.isCircular()) {
          this.changePosition(this.state.totalShiftedItems);
        }
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

      if (this.isVertical()) {
        this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
      } else {
        this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
      }
    }
  }, {
    key: "changePageOnTouch",
    value: function changePageOnTouch(e, diff) {
      if (Math.abs(diff) > this.swipeThreshold) {
        if (diff < 0) {
          // left
          this.navForward(e);
        } else {
          // right
          this.navBackward(e);
        }
      }
    }
  }, {
    key: "bindDocumentListeners",
    value: function bindDocumentListeners() {
      var _this2 = this;

      if (!this.documentResizeListener) {
        this.documentResizeListener = function () {
          _this2.calculatePosition();
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
    key: "isVertical",
    value: function isVertical() {
      return this.props.orientation === 'vertical';
    }
  }, {
    key: "isCircular",
    value: function isCircular() {
      return this.circular && this.props.value.length >= this.state.numVisible;
    }
  }, {
    key: "getPage",
    value: function getPage() {
      return this.props.onPageChange ? this.props.page : this.state.page;
    }
  }, {
    key: "getTotalIndicators",
    value: function getTotalIndicators() {
      return this.props.value ? Math.ceil((this.props.value.length - this.state.numVisible) / this.state.numScroll) + 1 : 0;
    }
  }, {
    key: "isAutoplay",
    value: function isAutoplay() {
      return this.props.autoplayInterval && this.allowAutoplay;
    }
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      var _this3 = this;

      this.interval = setInterval(function () {
        if (_this3.state.page === _this3.totalIndicators - 1) {
          _this3.step(-1, 0);
        } else {
          _this3.step(-1, _this3.state.page + 1);
        }
      }, this.props.autoplayInterval);
    }
  }, {
    key: "stopAutoplay",
    value: function stopAutoplay() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }, {
    key: "createStyle",
    value: function createStyle() {
      if (!this.carouselStyle) {
        this.carouselStyle = document.createElement('style');
        this.carouselStyle.type = 'text/css';
        document.body.appendChild(this.carouselStyle);
      }

      var innerHTML = "\n            #".concat(this.id, " .p-carousel-item {\n                flex: 1 0 ").concat(100 / this.state.numVisible, "%\n            }\n        ");

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
          innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        #").concat(this.id, " .p-carousel-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
        }
      }

      this.carouselStyle.innerHTML = innerHTML;
    }
  }, {
    key: "changePosition",
    value: function changePosition(totalShiftedItems) {
      if (this.itemsContainer) {
        this.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.state.numVisible), "%, 0, 0)");
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createStyle();
      this.calculatePosition();
      this.changePosition(this.state.totalShiftedItems);

      if (this.props.responsiveOptions) {
        this.bindDocumentListeners();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isCircular = this.isCircular();
      var stateChanged = false;
      var totalShiftedItems = this.state.totalShiftedItems;

      if (this.props.autoplayInterval) {
        this.stopAutoplay();
      }

      if (prevState.numScroll !== this.state.numScroll || prevState.numVisible !== this.state.numVisible || this.props.value && prevProps.value && prevProps.value.length !== this.props.value.length) {
        this.remainingItems = (this.props.value.length - this.state.numVisible) % this.state.numScroll;
        var page = this.getPage();

        if (this.totalIndicators !== 0 && page >= this.totalIndicators) {
          page = this.totalIndicators - 1;

          if (this.props.onPageChange) {
            this.props.onPageChange({
              page: page
            });
          } else {
            this.setState({
              page: page
            });
          }

          stateChanged = true;
        }

        totalShiftedItems = page * this.state.numScroll * -1;

        if (isCircular) {
          totalShiftedItems -= this.state.numVisible;
        }

        if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
          totalShiftedItems += -1 * this.remainingItems + this.state.numScroll;
          this.isRemainingItemsAdded = true;
        } else {
          this.isRemainingItemsAdded = false;
        }

        if (totalShiftedItems !== this.state.totalShiftedItems) {
          this.setState({
            totalShiftedItems: totalShiftedItems
          });
          stateChanged = true;
        }

        this.changePosition(totalShiftedItems);
      }

      if (isCircular) {
        if (this.state.page === 0) {
          totalShiftedItems = -1 * this.state.numVisible;
        } else if (totalShiftedItems === 0) {
          totalShiftedItems = -1 * this.props.value.length;

          if (this.remainingItems > 0) {
            this.isRemainingItemsAdded = true;
          }
        }

        if (totalShiftedItems !== this.state.totalShiftedItems) {
          this.setState({
            totalShiftedItems: totalShiftedItems
          });
          stateChanged = true;
        }
      }

      if (prevProps.page !== this.props.page) {
        if (this.props.page > prevProps.page && this.props.page <= this.totalIndicators - 1) {
          this.step(-1, this.props.page);
        } else if (this.props.page < prevProps.page) {
          this.step(1, this.props.page);
        }
      }

      if (!stateChanged && this.isAutoplay()) {
        this.startAutoplay();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.responsiveOptions) {
        this.unbindDocumentListeners();
      }

      if (this.props.autoplayInterval) {
        this.stopAutoplay();
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this4 = this;

      if (this.props.value && this.props.value.length) {
        var isCircular = this.isCircular();
        var clonedItemsForStarting = null;
        var clonedItemsForFinishing = null;

        if (isCircular) {
          var clonedElements = null;
          clonedElements = this.props.value.slice(-1 * this.state.numVisible);
          clonedItemsForStarting = clonedElements.map(function (item, index) {
            var isActive = _this4.state.totalShiftedItems * -1 === _this4.props.value.length + _this4.state.numVisible,
                start = index === 0,
                end = index === clonedElements.length - 1;
            return /*#__PURE__*/_react.default.createElement(CarouselItem, {
              key: index + '_scloned',
              className: "p-carousel-item-cloned",
              template: _this4.props.itemTemplate,
              item: item,
              active: isActive,
              start: start,
              end: end
            });
          });
          clonedElements = this.props.value.slice(0, this.state.numVisible);
          clonedItemsForFinishing = clonedElements.map(function (item, index) {
            var isActive = _this4.state.totalShiftedItems === 0,
                start = index === 0,
                end = index === clonedElements.length - 1;
            return /*#__PURE__*/_react.default.createElement(CarouselItem, {
              key: index + '_fcloned',
              className: "p-carousel-item-cloned",
              template: _this4.props.itemTemplate,
              item: item,
              active: isActive,
              start: start,
              end: end
            });
          });
        }

        var items = this.props.value.map(function (item, index) {
          var firstIndex = isCircular ? -1 * (_this4.state.totalShiftedItems + _this4.state.numVisible) : _this4.state.totalShiftedItems * -1,
              lastIndex = firstIndex + _this4.state.numVisible - 1,
              isActive = firstIndex <= index && lastIndex >= index,
              start = firstIndex === index,
              end = lastIndex === index;
          return /*#__PURE__*/_react.default.createElement(CarouselItem, {
            key: index,
            template: _this4.props.itemTemplate,
            item: item,
            active: isActive,
            start: start,
            end: end
          });
        });
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, clonedItemsForStarting, items, clonedItemsForFinishing);
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      if (this.props.header) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-carousel-header"
        }, this.props.header);
      }

      return null;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.footer) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "p-carousel-footer"
        }, this.props.footer);
      }

      return null;
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this5 = this;

      var items = this.renderItems();
      var height = this.isVertical() ? this.props.verticalViewPortHeight : 'auto';
      var backwardNavigator = this.renderBackwardNavigator();
      var forwardNavigator = this.renderForwardNavigator();
      var containerClassName = (0, _ClassNames.classNames)('p-carousel-container', this.props.containerClassName);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: containerClassName
      }, backwardNavigator, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-carousel-items-content",
        style: {
          'height': height
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this5.itemsContainer = el;
        },
        className: "p-carousel-items-container",
        onTransitionEnd: this.onTransitionEnd,
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd
      }, items)), forwardNavigator);
    }
  }, {
    key: "renderBackwardNavigator",
    value: function renderBackwardNavigator() {
      var isDisabled = (!this.circular || this.props.value && this.props.value.length < this.state.numVisible) && this.getPage() === 0;
      var buttonClassName = (0, _ClassNames.classNames)('p-carousel-prev p-link', {
        'p-disabled': isDisabled
      }),
          iconClassName = (0, _ClassNames.classNames)('p-carousel-prev-icon pi', {
        'pi-chevron-left': !this.isVertical(),
        'pi-chevron-up': this.isVertical()
      });
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: buttonClassName,
        onClick: this.navBackward,
        disabled: isDisabled
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator() {
      var isDisabled = (!this.circular || this.props.value && this.props.value.length < this.state.numVisible) && (this.getPage() === this.totalIndicators - 1 || this.totalIndicators === 0);
      var buttonClassName = (0, _ClassNames.classNames)('p-carousel-next p-link', {
        'p-disabled': isDisabled
      }),
          iconClassName = (0, _ClassNames.classNames)('p-carousel-next-icon pi', {
        'pi-chevron-right': !this.isVertical(),
        'pi-chevron-down': this.isVertical()
      });
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: buttonClassName,
        onClick: this.navForward,
        disabled: isDisabled
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
    }
  }, {
    key: "renderIndicator",
    value: function renderIndicator(index) {
      var _this6 = this;

      var isActive = this.getPage() === index,
          indicatorItemClassName = (0, _ClassNames.classNames)('p-carousel-indicator', {
        'p-highlight': isActive
      });
      return /*#__PURE__*/_react.default.createElement("li", {
        className: indicatorItemClassName,
        key: 'p-carousel-indicator-' + index
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "p-link",
        onClick: function onClick(e) {
          return _this6.onDotClick(e, index);
        }
      }, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)));
    }
  }, {
    key: "renderIndicators",
    value: function renderIndicators() {
      var indicatorsContentClassName = (0, _ClassNames.classNames)('p-carousel-indicators p-reset', this.props.indicatorsContentClassName);
      var indicators = [];

      for (var i = 0; i < this.totalIndicators; i++) {
        indicators.push(this.renderIndicator(i));
      }

      return /*#__PURE__*/_react.default.createElement("ul", {
        className: indicatorsContentClassName
      }, indicators);
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _ClassNames.classNames)('p-carousel p-component', {
        'p-carousel-vertical': this.isVertical(),
        'p-carousel-horizontal': !this.isVertical()
      }, this.props.className);
      var contentClassName = (0, _ClassNames.classNames)('p-carousel-content', this.props.contentClassName);
      this.totalIndicators = this.getTotalIndicators();
      var content = this.renderContent();
      var indicators = this.renderIndicators();
      var header = this.renderHeader();
      var footer = this.renderFooter();
      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.id,
        className: className,
        style: this.props.style
      }, header, /*#__PURE__*/_react.default.createElement("div", {
        className: contentClassName
      }, content, indicators), footer);
    }
  }]);

  return Carousel;
}(_react.Component);

exports.Carousel = Carousel;

_defineProperty(Carousel, "defaultProps", {
  id: null,
  value: null,
  page: 0,
  header: null,
  footer: null,
  style: null,
  className: null,
  itemTemplate: null,
  circular: false,
  autoplayInterval: 0,
  numVisible: 1,
  numScroll: 1,
  responsiveOptions: null,
  orientation: "horizontal",
  verticalViewPortHeight: "300px",
  contentClassName: null,
  containerClassName: null,
  indicatorsContentClassName: null,
  onPageChange: null
});

_defineProperty(Carousel, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.any,
  page: _propTypes.default.number,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  itemTemplate: _propTypes.default.any,
  circular: _propTypes.default.bool,
  autoplayInterval: _propTypes.default.number,
  numVisible: _propTypes.default.number,
  numScroll: _propTypes.default.number,
  responsiveOptions: _propTypes.default.array,
  orientation: _propTypes.default.string,
  verticalViewPortHeight: _propTypes.default.string,
  contentClassName: _propTypes.default.string,
  containerClassName: _propTypes.default.string,
  indicatorsContentClassName: _propTypes.default.string,
  onPageChange: _propTypes.default.func
});