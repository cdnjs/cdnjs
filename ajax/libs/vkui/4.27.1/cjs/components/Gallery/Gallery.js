"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _Touch = require("../Touch/Touch");

var _classNames = require("../../lib/classNames");

var _withPlatform = require("../../hoc/withPlatform");

var _dom = require("../../lib/dom");

var _utils = require("../../lib/utils");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _HorizontalScrollArrow = _interopRequireDefault(require("../HorizontalScroll/HorizontalScrollArrow"));

var _math = require("../../helpers/math");

var _useTimeout = require("../../hooks/useTimeout");

var _excluded = ["children", "slideWidth", "slideIndex", "isDraggable", "onDragStart", "onDragEnd", "onChange", "onEnd", "align", "bullets", "platform", "hasMouse", "showArrows", "window", "document", "getRef", "getRootRef"],
    _excluded2 = ["initialSlideIndex", "children", "timeout", "onChange"];

var BaseGallery = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(BaseGallery, _React$Component);

  var _super = (0, _createSuper2.default)(BaseGallery);

  function BaseGallery(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseGallery);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "container", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "slidesStore", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "viewport", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onStart", function () {
      _this.setState({
        animation: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMoveX", function (e) {
      if (_this.props.isDraggable && !_this.isFullyVisible) {
        e.originalEvent.preventDefault();

        if (e.isSlideX) {
          _this.props.onDragStart && _this.props.onDragStart(e);

          if (_this.state.deltaX !== e.shiftX || _this.state.dragging !== e.isSlideX) {
            _this.setState({
              deltaX: e.shiftX,
              dragging: e.isSlideX
            });
          }
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEnd", function (e) {
      var _this$props$slideInde;

      var targetIndex = e.isSlide ? _this.getTarget(e) : (_this$props$slideInde = _this.props.slideIndex) !== null && _this$props$slideInde !== void 0 ? _this$props$slideInde : 0;
      _this.props.onDragEnd && _this.props.onDragEnd(e);

      _this.setState({
        deltaX: 0,
        animation: true
      }, function () {
        var _this$props$onChange, _this$props;

        return (_this$props$onChange = (_this$props = _this.props).onChange) === null || _this$props$onChange === void 0 ? void 0 : _this$props$onChange.call(_this$props, targetIndex);
      });

      if (_this.props.onEnd) {
        _this.props.onEnd({
          targetIndex: targetIndex
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onResize", function () {
      return _this.initializeSlides({
        animation: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "slideLeft", function () {
      var _this$props2 = _this.props,
          _this$props2$slideInd = _this$props2.slideIndex,
          slideIndex = _this$props2$slideInd === void 0 ? 0 : _this$props2$slideInd,
          onChange = _this$props2.onChange;

      if (_this.canSlideLeft) {
        _this.setState({
          deltaX: 0,
          animation: true
        }, function () {
          return onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex - 1);
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "slideRight", function () {
      var _this$props3 = _this.props,
          _this$props3$slideInd = _this$props3.slideIndex,
          slideIndex = _this$props3$slideInd === void 0 ? 0 : _this$props3$slideInd,
          onChange = _this$props3.onChange;

      if (_this.canSlideRight) {
        _this.setState({
          deltaX: 0,
          animation: true
        }, function () {
          return onChange === null || onChange === void 0 ? void 0 : onChange(slideIndex + 1);
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSlideRef", function (id) {
      return function (slide) {
        _this.slidesStore["slide-".concat(id)] = slide;
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getViewportRef", function (viewport) {
      _this.viewport = viewport;

      if (_this.props.getRef) {
        (0, _utils.setRef)(viewport, _this.props.getRef);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getRootRef", function (container) {
      _this.container = container;

      if (_this.props.getRootRef) {
        (0, _utils.setRef)(container, _this.props.getRootRef);
      }
    });
    _this.state = {
      containerWidth: 0,
      deltaX: 0,
      shiftX: 0,
      slides: [],
      animation: true,
      duration: 0.24
    };
    _this.slidesStore = {};
    return _this;
  }

  (0, _createClass2.default)(BaseGallery, [{
    key: "isCenterWithCustomWidth",
    get: function get() {
      return this.props.slideWidth === "custom" && this.props.align === "center";
    }
  }, {
    key: "initializeSlides",
    value: function initializeSlides() {
      var _React$Children$map,
          _this2 = this,
          _this$container$offse,
          _this$container;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var slides = (_React$Children$map = React.Children.map(this.props.children, function (_item, i) {
        var _elem$offsetLeft, _elem$offsetWidth;

        var elem = _this2.slidesStore["slide-".concat(i)];

        return {
          coordX: (_elem$offsetLeft = elem === null || elem === void 0 ? void 0 : elem.offsetLeft) !== null && _elem$offsetLeft !== void 0 ? _elem$offsetLeft : 0,
          width: (_elem$offsetWidth = elem === null || elem === void 0 ? void 0 : elem.offsetWidth) !== null && _elem$offsetWidth !== void 0 ? _elem$offsetWidth : 0
        };
      })) !== null && _React$Children$map !== void 0 ? _React$Children$map : [];
      var containerWidth = (_this$container$offse = (_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.offsetWidth) !== null && _this$container$offse !== void 0 ? _this$container$offse : 0;
      var layerWidth = slides.reduce(function (val, slide) {
        return slide.width + val;
      }, 0);
      var min = this.calcMin({
        containerWidth: containerWidth,
        layerWidth: layerWidth,
        slides: slides
      });
      var max = this.calcMax({
        slides: slides
      });
      this.setState({
        min: min,
        max: max,
        layerWidth: layerWidth,
        containerWidth: containerWidth,
        slides: slides
      }, function () {
        if (_this2.props.slideIndex !== undefined) {
          var shiftX = _this2.calculateIndent(_this2.props.slideIndex);

          if (_this2.state.shiftX === shiftX) {
            return;
          }

          var isValidShift = _this2.state.shiftX === _this2.validateIndent(_this2.state.shiftX);

          var _options$animation = options.animation,
              animation = _options$animation === void 0 ? isValidShift : _options$animation;

          _this2.setState({
            shiftX: shiftX,
            animation: animation
          }, function () {
            if (!_this2.state.animation) {
              var _this2$props$window;

              (_this2$props$window = _this2.props.window) === null || _this2$props$window === void 0 ? void 0 : _this2$props$window.requestAnimationFrame(function () {
                return _this2.setState({
                  animation: true
                });
              });
            }
          });
        }
      });
    }
  }, {
    key: "calcMin",
    value: function calcMin(_ref) {
      var _this$viewport$offset, _this$viewport;

      var containerWidth = _ref.containerWidth,
          _ref$layerWidth = _ref.layerWidth,
          layerWidth = _ref$layerWidth === void 0 ? 0 : _ref$layerWidth,
          slides = _ref.slides;
      var viewportWidth = (_this$viewport$offset = (_this$viewport = this.viewport) === null || _this$viewport === void 0 ? void 0 : _this$viewport.offsetWidth) !== null && _this$viewport$offset !== void 0 ? _this$viewport$offset : 0;

      switch (this.props.align) {
        case "left":
          return containerWidth - layerWidth;

        case "right":
          return viewportWidth - layerWidth;

        case "center":
          if (this.isCenterWithCustomWidth && slides.length) {
            var _slides = slides[slides.length - 1],
                coordX = _slides.coordX,
                width = _slides.width;
            return viewportWidth / 2 - coordX - width / 2;
          } else {
            return viewportWidth - (containerWidth - viewportWidth) / 2 - layerWidth;
          }

      }

      return undefined;
    }
  }, {
    key: "calcMax",
    value: function calcMax(_ref2) {
      var _this$viewport$offset2, _this$viewport2;

      var slides = _ref2.slides;
      var viewportWidth = (_this$viewport$offset2 = (_this$viewport2 = this.viewport) === null || _this$viewport2 === void 0 ? void 0 : _this$viewport2.offsetWidth) !== null && _this$viewport$offset2 !== void 0 ? _this$viewport$offset2 : 0;

      if (this.isCenterWithCustomWidth && slides.length) {
        var _slides$ = slides[0],
            width = _slides$.width,
            coordX = _slides$.coordX;
        return viewportWidth / 2 - coordX - width / 2;
      } else {
        return 0;
      }
    }
    /*
     * Считает отступ слоя галереи
     */

  }, {
    key: "calculateIndent",
    value: function calculateIndent(targetIndex) {
      var slides = this.state.slides;

      if (this.isFullyVisible) {
        return 0;
      }

      var targetSlide = slides.length ? slides[targetIndex] : null;

      if (targetSlide) {
        var coordX = targetSlide.coordX,
            width = targetSlide.width;

        if (this.isCenterWithCustomWidth) {
          var _this$viewport$offset3, _this$viewport3;

          var viewportWidth = (_this$viewport$offset3 = (_this$viewport3 = this.viewport) === null || _this$viewport3 === void 0 ? void 0 : _this$viewport3.offsetWidth) !== null && _this$viewport$offset3 !== void 0 ? _this$viewport$offset3 : 0;
          return viewportWidth / 2 - coordX - width / 2;
        }

        return this.validateIndent(-1 * coordX);
      } else {
        return 0;
      }
    }
    /*
     * Считает отступ слоя галереи во время драга
     */

  }, {
    key: "calculateDragIndent",
    value: function calculateDragIndent() {
      var _this$state = this.state,
          shiftX = _this$state.shiftX,
          deltaX = _this$state.deltaX,
          _this$state$min = _this$state.min,
          min = _this$state$min === void 0 ? 0 : _this$state$min,
          _this$state$max = _this$state.max,
          max = _this$state$max === void 0 ? 0 : _this$state$max;
      var indent = shiftX + deltaX;

      if (indent > max) {
        return max + Number((indent - max) / 3);
      } else if (indent < min) {
        return min + Number((indent - min) / 3);
      }

      return indent;
    }
  }, {
    key: "validateIndent",
    value: function validateIndent(value) {
      var _this$state2 = this.state,
          _this$state2$min = _this$state2.min,
          min = _this$state2$min === void 0 ? 0 : _this$state2$min,
          _this$state2$max = _this$state2.max,
          max = _this$state2$max === void 0 ? 0 : _this$state2$max;

      if (value < min) {
        return min;
      } else if (value > max) {
        return max;
      }

      return value;
    }
  }, {
    key: "isFullyVisible",
    get: function get() {
      var _this$state$layerWidt;

      return ((_this$state$layerWidt = this.state.layerWidth) !== null && _this$state$layerWidt !== void 0 ? _this$state$layerWidt : 0) <= this.state.containerWidth;
    }
    /*
     * Получает индекс слайда, к которому будет осуществлен переход
     */

  }, {
    key: "getTarget",
    value: function getTarget(e) {
      var _this$state3 = this.state,
          slides = _this$state3.slides,
          deltaX = _this$state3.deltaX,
          shiftX = _this$state3.shiftX,
          _this$state3$max = _this$state3.max,
          max = _this$state3$max === void 0 ? 0 : _this$state3$max;
      var _this$props$slideInde2 = this.props.slideIndex,
          slideIndex = _this$props$slideInde2 === void 0 ? 0 : _this$props$slideInde2;
      var expectDeltaX = deltaX / e.duration * 240 * 0.6;
      var shift = shiftX + deltaX + expectDeltaX - max;
      var direction = deltaX < 0 ? 1 : -1; // Находим ближайшую границу слайда к текущему отступу

      var targetIndex = slides.reduce(function (val, item, index) {
        var previousValue = Math.abs(slides[val].coordX + shift);
        var currentValue = Math.abs(item.coordX + shift);
        return previousValue < currentValue ? val : index;
      }, slideIndex);

      if (targetIndex === slideIndex) {
        var targetSlide = slideIndex + direction;

        if (targetSlide >= 0 && targetSlide < slides.length) {
          if (Math.abs(deltaX) > slides[targetSlide].width * 0.05) {
            targetIndex = targetSlide;
          }
        }
      }

      return targetIndex;
    }
  }, {
    key: "canSlideLeft",
    get: function get() {
      // shiftX is negative number <= 0, we can swipe back only if it is < 0
      return !this.isFullyVisible && this.state.shiftX < 0;
    }
  }, {
    key: "canSlideRight",
    get: function get() {
      var _this$state4 = this.state,
          containerWidth = _this$state4.containerWidth,
          _this$state4$layerWid = _this$state4.layerWidth,
          layerWidth = _this$state4$layerWid === void 0 ? 0 : _this$state4$layerWid,
          shiftX = _this$state4.shiftX,
          slides = _this$state4.slides;
      var _this$props4 = this.props,
          align = _this$props4.align,
          _this$props4$slideInd = _this$props4.slideIndex,
          slideIndex = _this$props4$slideInd === void 0 ? 0 : _this$props4$slideInd;
      return !this.isFullyVisible && ( // we can't move right when gallery layer fully scrolled right, if gallery aligned by left side
      align === "left" && containerWidth - shiftX < layerWidth || // otherwise we need to check current slide index (align = right or align = center)
      align !== "left" && slideIndex < slides.length - 1);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initializeSlides({
        animation: false
      });
      this.props.window.addEventListener("resize", this.onResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var widthChanged = this.props.slideWidth !== prevProps.slideWidth;
      var isPropUpdate = this.props !== prevProps;
      var slideCountChanged = React.Children.count(this.props.children) !== React.Children.count(prevProps.children);
      var isCustomWidth = this.props.slideWidth === "custom"; // в любом из этих случаев позиция могла поменяться

      if (widthChanged || slideCountChanged || isCustomWidth && isPropUpdate) {
        this.initializeSlides();
      } else if (this.props.slideIndex !== prevProps.slideIndex) {
        var _this$props$slideInde3;

        this.setState({
          animation: true,
          deltaX: 0,
          shiftX: this.calculateIndent((_this$props$slideInde3 = this.props.slideIndex) !== null && _this$props$slideInde3 !== void 0 ? _this$props$slideInde3 : 0)
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.window.removeEventListener("resize", this.onResize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state5 = this.state,
          animation = _this$state5.animation,
          duration = _this$state5.duration,
          dragging = _this$state5.dragging;
      var _this$props5 = this.props,
          children = _this$props5.children,
          slideWidth = _this$props5.slideWidth,
          _this$props5$slideInd = _this$props5.slideIndex,
          slideIndex = _this$props5$slideInd === void 0 ? 0 : _this$props5$slideInd,
          isDraggable = _this$props5.isDraggable,
          onDragStart = _this$props5.onDragStart,
          onDragEnd = _this$props5.onDragEnd,
          onChange = _this$props5.onChange,
          onEnd = _this$props5.onEnd,
          align = _this$props5.align,
          bullets = _this$props5.bullets,
          platform = _this$props5.platform,
          hasMouse = _this$props5.hasMouse,
          showArrows = _this$props5.showArrows,
          window = _this$props5.window,
          document = _this$props5.document,
          getRef = _this$props5.getRef,
          getRootRef = _this$props5.getRootRef,
          restProps = (0, _objectWithoutProperties2.default)(_this$props5, _excluded);
      var indent = dragging ? this.calculateDragIndent() : this.calculateIndent(slideIndex);
      var layerStyle = {
        WebkitTransform: "translateX(".concat(indent, "px)"),
        transform: "translateX(".concat(indent, "px)"),
        WebkitTransition: animation ? "-webkit-transform ".concat(duration, "s cubic-bezier(.1, 0, .25, 1)") : "none",
        transition: animation ? "transform ".concat(duration, "s cubic-bezier(.1, 0, .25, 1)") : "none"
      };
      return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Gallery", platform), "Gallery--".concat(align), {
          "Gallery--dragging": dragging,
          "Gallery--custom-width": slideWidth === "custom"
        }),
        ref: this.getRootRef
      }), (0, _jsxRuntime.createScopedElement)(_Touch.Touch, {
        vkuiClass: "Gallery__viewport",
        onStartX: this.onStart,
        onMoveX: this.onMoveX,
        onEnd: this.onEnd,
        noSlideClick: true,
        style: {
          width: slideWidth === "custom" ? "100%" : slideWidth
        },
        getRootRef: this.getViewportRef
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "Gallery__layer",
        style: layerStyle
      }, React.Children.map(children, function (item, i) {
        return (0, _jsxRuntime.createScopedElement)("div", {
          vkuiClass: "Gallery__slide",
          key: "slide-".concat(i),
          ref: _this3.getSlideRef(i)
        }, item);
      }))), bullets && (0, _jsxRuntime.createScopedElement)("div", {
        "aria-hidden": "true",
        vkuiClass: (0, _classNames.classNames)("Gallery__bullets", "Gallery__bullets--".concat(bullets))
      }, React.Children.map(children, function (_item, index) {
        return (0, _jsxRuntime.createScopedElement)("div", {
          vkuiClass: (0, _classNames.classNames)("Gallery__bullet", {
            "Gallery__bullet--active": index === slideIndex
          }),
          key: index
        });
      })), showArrows && hasMouse && this.canSlideLeft && (0, _jsxRuntime.createScopedElement)(_HorizontalScrollArrow.default, {
        direction: "left",
        onClick: this.slideLeft
      }), showArrows && hasMouse && this.canSlideRight && (0, _jsxRuntime.createScopedElement)(_HorizontalScrollArrow.default, {
        direction: "right",
        onClick: this.slideRight
      }));
    }
  }]);
  return BaseGallery;
}(React.Component);

(0, _defineProperty2.default)(BaseGallery, "defaultProps", {
  slideWidth: "100%",
  children: "",
  align: "left",
  bullets: false,
  isDraggable: true
});
var BaseGalleryAdaptive = (0, _withAdaptivity.withAdaptivity)((0, _dom.withDOM)(BaseGallery), {
  hasMouse: true
});

var Gallery = function Gallery(_ref3) {
  var _props$slideIndex;

  var _ref3$initialSlideInd = _ref3.initialSlideIndex,
      initialSlideIndex = _ref3$initialSlideInd === void 0 ? 0 : _ref3$initialSlideInd,
      children = _ref3.children,
      _ref3$timeout = _ref3.timeout,
      timeout = _ref3$timeout === void 0 ? 0 : _ref3$timeout,
      onChange = _ref3.onChange,
      props = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);

  var _React$useState = React.useState(initialSlideIndex),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      localSlideIndex = _React$useState2[0],
      setSlideIndex = _React$useState2[1];

  var isControlled = typeof props.slideIndex === "number";
  var slideIndex = isControlled ? (_props$slideIndex = props.slideIndex) !== null && _props$slideIndex !== void 0 ? _props$slideIndex : 0 : localSlideIndex;
  var isDraggable = !isControlled || Boolean(onChange);
  var slides = React.Children.toArray(children).filter(function (item) {
    return Boolean(item);
  });
  var childCount = slides.length;
  var handleChange = React.useCallback(function (current) {
    if (current === slideIndex) {
      return;
    }

    !isControlled && setSlideIndex(current);
    onChange && onChange(current);
  }, [isControlled, onChange, slideIndex]);
  var autoplay = (0, _useTimeout.useTimeout)(function () {
    return handleChange((slideIndex + 1) % childCount);
  }, timeout);
  React.useEffect(function () {
    return timeout ? autoplay.set() : autoplay.clear();
  }, [timeout, slideIndex, autoplay]); // prevent invalid slideIndex
  // any slide index is invalid with no slides, just keep it as is

  var safeSlideIndex = childCount > 0 ? (0, _math.clamp)(slideIndex, 0, childCount - 1) : slideIndex; // notify parent in controlled mode

  React.useEffect(function () {
    if (onChange && safeSlideIndex !== slideIndex) {
      onChange(safeSlideIndex);
    }
  }, [onChange, safeSlideIndex, slideIndex]);
  return (0, _jsxRuntime.createScopedElement)(BaseGalleryAdaptive, (0, _extends2.default)({
    isDraggable: isDraggable
  }, props, {
    slideIndex: safeSlideIndex,
    onChange: handleChange
  }), slides);
}; // eslint-disable-next-line import/no-default-export


var _default = (0, _withPlatform.withPlatform)(Gallery);

exports.default = _default;
//# sourceMappingURL=Gallery.js.map