"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GalleriaThumbnails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

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

var GalleriaThumbnailItem = /*#__PURE__*/function (_Component) {
  _inherits(GalleriaThumbnailItem, _Component);

  var _super = _createSuper(GalleriaThumbnailItem);

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
      var itemClassName = (0, _ClassNames.classNames)(this.props.className, 'p-galleria-thumbnail-item', {
        'p-galleria-thumbnail-item-current': this.props.current,
        'p-galleria-thumbnail-item-active': this.props.active,
        'p-galleria-thumbnail-item-start': this.props.start,
        'p-galleria-thumbnail-item-end': this.props.end
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: itemClassName
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-thumbnail-item-content",
        tabIndex: this.props.active ? 0 : null,
        onClick: this.onItemClick,
        onKeyDown: this.onItemKeyDown
      }, content));
    }
  }]);

  return GalleriaThumbnailItem;
}(_react.Component);

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

_defineProperty(GalleriaThumbnailItem, "propTypes", {
  index: _propTypes.default.number,
  template: _propTypes.default.func,
  item: _propTypes.default.any,
  current: _propTypes.default.bool,
  active: _propTypes.default.bool,
  start: _propTypes.default.bool,
  end: _propTypes.default.bool,
  className: _propTypes.default.string,
  onItemClick: _propTypes.default.func
});

var GalleriaThumbnails = /*#__PURE__*/function (_Component2) {
  _inherits(GalleriaThumbnails, _Component2);

  var _super2 = _createSuper(GalleriaThumbnails);

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
        _DomHandler.default.removeClass(this.itemsContainer, 'p-items-hidden');

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
    value: function onTransitionEnd() {
      if (this.itemsContainer) {
        _DomHandler.default.addClass(this.itemsContainer, 'p-items-hidden');

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
        this.thumbnailsStyle.type = 'text/css';
        document.body.appendChild(this.thumbnailsStyle);
      }

      var innerHTML = "\n            #".concat(this.props.containerId, " .p-galleria-thumbnail-item {\n                flex: 1 0 ").concat(100 / this.state.numVisible, "%\n            }\n        ");

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
          innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        #").concat(this.props.containerId, " .p-galleria-thumbnail-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
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
          _DomHandler.default.removeClass(this.itemsContainer, 'p-items-hidden');

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
        return /*#__PURE__*/_react.default.createElement(GalleriaThumbnailItem, {
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
        var buttonClassName = (0, _ClassNames.classNames)('p-galleria-thumbnail-prev p-link', {
          'p-disabled': isDisabled
        }),
            iconClassName = (0, _ClassNames.classNames)('p-galleria-thumbnail-prev-icon pi', {
          'pi-chevron-left': !this.props.isVertical,
          'pi-chevron-up': this.props.isVertical
        });
        return /*#__PURE__*/_react.default.createElement("button", {
          className: buttonClassName,
          onClick: this.navBackward,
          disabled: isDisabled
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
      }

      return null;
    }
  }, {
    key: "renderForwardNavigator",
    value: function renderForwardNavigator() {
      if (this.props.showThumbnailNavigators) {
        var isDisabled = !this.props.circular && this.props.activeItemIndex === this.props.value.length - 1 || this.props.value.length <= this.state.numVisible;
        var buttonClassName = (0, _ClassNames.classNames)('p-galleria-thumbnail-next p-link', {
          'p-disabled': isDisabled
        }),
            iconClassName = (0, _ClassNames.classNames)('p-galleria-thumbnail-next-icon pi', {
          'pi-chevron-right': !this.props.isVertical,
          'pi-chevron-down': this.props.isVertical
        });
        return /*#__PURE__*/_react.default.createElement("button", {
          className: buttonClassName,
          onClick: this.navForward,
          disabled: isDisabled
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null));
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-thumbnail-container"
      }, backwardNavigator, /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-thumbnail-items-container",
        style: {
          'height': height
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "p-galleria-thumbnail-wrapper"
      }, content);
    }
  }]);

  return GalleriaThumbnails;
}(_react.Component);

exports.GalleriaThumbnails = GalleriaThumbnails;