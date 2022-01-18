import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "slideWidth", "slideIndex", "isDraggable", "onDragStart", "onDragEnd", "onChange", "onEnd", "align", "bullets", "platform", "hasMouse", "showArrows", "window", "document", "getRef", "getRootRef"],
    _excluded2 = ["initialSlideIndex", "children", "timeout", "onChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { Touch } from "../Touch/Touch";
import { classNames } from "../../lib/classNames";
import { withPlatform } from "../../hoc/withPlatform";
import { withDOM } from "../../lib/dom";
import { setRef } from "../../lib/utils";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import HorizontalScrollArrow from "../HorizontalScroll/HorizontalScrollArrow";
import { clamp } from "../../helpers/math";
import { useTimeout } from "../../hooks/useTimeout";
import "./Gallery.css";

var BaseGallery = /*#__PURE__*/function (_React$Component) {
  _inherits(BaseGallery, _React$Component);

  var _super = _createSuper(BaseGallery);

  function BaseGallery(props) {
    var _this;

    _classCallCheck(this, BaseGallery);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "slidesStore", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewport", void 0);

    _defineProperty(_assertThisInitialized(_this), "onStart", function () {
      _this.setState({
        animation: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveX", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "onEnd", function (e) {
      var targetIndex = e.isSlide ? _this.getTarget(e) : _this.props.slideIndex;
      _this.props.onDragEnd && _this.props.onDragEnd(e);

      _this.setState({
        deltaX: 0,
        animation: true
      }, function () {
        return _this.props.onChange(targetIndex);
      });

      if (_this.props.onEnd) {
        _this.props.onEnd({
          targetIndex: targetIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      return _this.initializeSlides({
        animation: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "slideLeft", function () {
      var _this$props = _this.props,
          slideIndex = _this$props.slideIndex,
          onChange = _this$props.onChange;

      if (_this.canSlideLeft) {
        _this.setState({
          deltaX: 0,
          animation: true
        }, function () {
          return onChange(slideIndex - 1);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slideRight", function () {
      var _this$props2 = _this.props,
          slideIndex = _this$props2.slideIndex,
          onChange = _this$props2.onChange;

      if (_this.canSlideRight) {
        _this.setState({
          deltaX: 0,
          animation: true
        }, function () {
          return onChange(slideIndex + 1);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSlideRef", function (id) {
      return function (slide) {
        _this.slidesStore["slide-".concat(id)] = slide;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getViewportRef", function (viewport) {
      _this.viewport = viewport;
      setRef(viewport, _this.props.getRef);
    });

    _defineProperty(_assertThisInitialized(_this), "getRootRef", function (container) {
      _this.container = container;
      setRef(container, _this.props.getRootRef);
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

  _createClass(BaseGallery, [{
    key: "isCenterWithCustomWidth",
    get: function get() {
      return this.props.slideWidth === "custom" && this.props.align === "center";
    }
  }, {
    key: "initializeSlides",
    value: function initializeSlides() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var slides = React.Children.map(this.props.children, function (_item, i) {
        var elem = _this2.slidesStore["slide-".concat(i)];

        return {
          coordX: elem.offsetLeft,
          width: elem.offsetWidth
        };
      });
      var containerWidth = this.container.offsetWidth;
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
            _this2.props.window.requestAnimationFrame(function () {
              return _this2.setState({
                animation: true
              });
            });
          }
        });
      });
    }
  }, {
    key: "calcMin",
    value: function calcMin(_ref) {
      var containerWidth = _ref.containerWidth,
          layerWidth = _ref.layerWidth,
          slides = _ref.slides;
      var viewportWidth = this.viewport.offsetWidth;

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
    }
  }, {
    key: "calcMax",
    value: function calcMax(_ref2) {
      var slides = _ref2.slides;
      var viewportWidth = this.viewport.offsetWidth;

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
          var viewportWidth = this.viewport.offsetWidth;
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
          min = _this$state.min,
          max = _this$state.max;
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
          min = _this$state2.min,
          max = _this$state2.max;

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
      return this.state.layerWidth <= this.state.containerWidth;
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
          max = _this$state3.max;
      var slideIndex = this.props.slideIndex;
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
          layerWidth = _this$state4.layerWidth,
          shiftX = _this$state4.shiftX,
          slides = _this$state4.slides;
      var _this$props3 = this.props,
          align = _this$props3.align,
          slideIndex = _this$props3.slideIndex;
      return !this.isFullyVisible && (align === "left" && containerWidth - shiftX < layerWidth || align !== "left" && slideIndex < slides.length - 1);
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
        this.setState({
          animation: true,
          deltaX: 0,
          shiftX: this.calculateIndent(this.props.slideIndex)
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

      var _this$props4 = this.props,
          children = _this$props4.children,
          slideWidth = _this$props4.slideWidth,
          slideIndex = _this$props4.slideIndex,
          isDraggable = _this$props4.isDraggable,
          onDragStart = _this$props4.onDragStart,
          onDragEnd = _this$props4.onDragEnd,
          onChange = _this$props4.onChange,
          onEnd = _this$props4.onEnd,
          align = _this$props4.align,
          bullets = _this$props4.bullets,
          platform = _this$props4.platform,
          hasMouse = _this$props4.hasMouse,
          showArrows = _this$props4.showArrows,
          window = _this$props4.window,
          document = _this$props4.document,
          getRef = _this$props4.getRef,
          getRootRef = _this$props4.getRootRef,
          restProps = _objectWithoutProperties(_this$props4, _excluded);

      var indent = dragging ? this.calculateDragIndent() : this.calculateIndent(slideIndex);
      var layerStyle = {
        WebkitTransform: "translateX(".concat(indent, "px)"),
        transform: "translateX(".concat(indent, "px)"),
        WebkitTransition: animation ? "-webkit-transform ".concat(duration, "s cubic-bezier(.1, 0, .25, 1)") : "none",
        transition: animation ? "transform ".concat(duration, "s cubic-bezier(.1, 0, .25, 1)") : "none"
      };
      return createScopedElement("div", _extends({}, restProps, {
        vkuiClass: classNames(getClassName("Gallery", platform), "Gallery--".concat(align), {
          "Gallery--dragging": dragging,
          "Gallery--custom-width": slideWidth === "custom"
        }),
        ref: this.getRootRef
      }), createScopedElement(Touch, {
        vkuiClass: "Gallery__viewport",
        onStartX: this.onStart,
        onMoveX: this.onMoveX,
        onEnd: this.onEnd,
        noSlideClick: true,
        style: {
          width: slideWidth === "custom" ? "100%" : slideWidth
        },
        getRootRef: this.getViewportRef
      }, createScopedElement("div", {
        vkuiClass: "Gallery__layer",
        style: layerStyle
      }, React.Children.map(children, function (item, i) {
        return createScopedElement("div", {
          vkuiClass: "Gallery__slide",
          key: "slide-".concat(i),
          ref: _this3.getSlideRef(i)
        }, item);
      }))), bullets && createScopedElement("div", {
        "aria-hidden": "true",
        vkuiClass: classNames("Gallery__bullets", "Gallery__bullets--".concat(bullets))
      }, React.Children.map(children, function (_item, index) {
        return createScopedElement("div", {
          vkuiClass: classNames("Gallery__bullet", {
            "Gallery__bullet--active": index === slideIndex
          }),
          key: index
        });
      })), showArrows && hasMouse && this.canSlideLeft && createScopedElement(HorizontalScrollArrow, {
        direction: "left",
        onClick: this.slideLeft
      }), showArrows && hasMouse && this.canSlideRight && createScopedElement(HorizontalScrollArrow, {
        direction: "right",
        onClick: this.slideRight
      }));
    }
  }]);

  return BaseGallery;
}(React.Component);

_defineProperty(BaseGallery, "defaultProps", {
  slideWidth: "100%",
  children: "",
  align: "left",
  bullets: false,
  isDraggable: true
});

var BaseGalleryAdaptive = withAdaptivity(withDOM(BaseGallery), {
  hasMouse: true
});

var Gallery = function Gallery(_ref3) {
  var _ref3$initialSlideInd = _ref3.initialSlideIndex,
      initialSlideIndex = _ref3$initialSlideInd === void 0 ? 0 : _ref3$initialSlideInd,
      children = _ref3.children,
      timeout = _ref3.timeout,
      onChange = _ref3.onChange,
      props = _objectWithoutProperties(_ref3, _excluded2);

  var _React$useState = React.useState(initialSlideIndex),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      localSlideIndex = _React$useState2[0],
      setSlideIndex = _React$useState2[1];

  var isControlled = typeof props.slideIndex === "number";
  var slideIndex = isControlled ? props.slideIndex : localSlideIndex;
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
  }, [onChange, slideIndex]);
  var autoplay = useTimeout(function () {
    return handleChange((slideIndex + 1) % childCount);
  }, timeout);
  React.useEffect(function () {
    return timeout ? autoplay.set() : autoplay.clear();
  }, [timeout, slideIndex]); // prevent invalid slideIndex
  // any slide index is invalid with no slides, just keep it as is

  var safeSlideIndex = childCount > 0 ? clamp(slideIndex, 0, childCount - 1) : slideIndex; // notify parent in controlled mode

  React.useEffect(function () {
    if (onChange && safeSlideIndex !== slideIndex) {
      onChange(safeSlideIndex);
    }
  }, [safeSlideIndex]);
  return createScopedElement(BaseGalleryAdaptive, _extends({
    isDraggable: isDraggable
  }, props, {
    slideIndex: safeSlideIndex,
    onChange: handleChange
  }), slides);
};

export default withPlatform(Gallery);
//# sourceMappingURL=Gallery.js.map