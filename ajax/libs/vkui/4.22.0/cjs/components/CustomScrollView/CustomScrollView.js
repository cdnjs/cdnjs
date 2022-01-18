"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _dom = require("../../lib/dom");

var _utils = require("../../lib/utils");

var CustomScrollView = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(CustomScrollView, _React$Component);

  var _super = (0, _createSuper2.default)(CustomScrollView);

  function CustomScrollView() {
    var _this;

    (0, _classCallCheck2.default)(this, CustomScrollView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "ratio", NaN);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastTrackerTop", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clientHeight", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "trackerHeight", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "scrollHeight", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transformProp", '');
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "startY", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "trackerTop", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "box", (0, _utils.multiRef)(function (e) {
      return (0, _utils.setRef)(e, _this.props.boxRef);
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "barY", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "trackerY", /*#__PURE__*/React.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resize", function () {
      var clientHeight = _this.box.current.clientHeight;
      var scrollHeight = _this.box.current.scrollHeight;
      var ratio = clientHeight / scrollHeight;
      var trackerHeight = Math.max(clientHeight * ratio, 40);
      _this.ratio = ratio;
      _this.clientHeight = clientHeight;
      _this.scrollHeight = scrollHeight;
      _this.trackerHeight = trackerHeight;

      if (ratio >= 1) {
        _this.barY.current.style.display = 'none';
      } else {
        _this.barY.current.style.display = '';
        _this.trackerY.current.style.height = "".concat(trackerHeight, "px");

        _this.setTrackerPositionFromScroll(_this.box.current.scrollTop);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "scroll", function () {
      if (_this.ratio >= 1) {
        return;
      }

      _this.setTrackerPositionFromScroll(_this.box.current.scrollTop);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onDragStart", function (e) {
      e.preventDefault();
      _this.startY = e.clientY;
      _this.trackerTop = _this.lastTrackerTop;

      _this.props.document.addEventListener('mousemove', _this.onMove);

      _this.props.document.addEventListener('mouseup', _this.onUp);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMove", function (e) {
      e.preventDefault();
      var diff = e.clientY - _this.startY;
      var position = Math.min(Math.max(_this.trackerTop + diff, 0), _this.clientHeight - _this.trackerHeight);

      _this.setScrollPositionFromTracker(position);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onUp", function (e) {
      e.preventDefault();

      _this.props.document.removeEventListener('mousemove', _this.onMove);

      _this.props.document.removeEventListener('mouseup', _this.onUp);
    });
    return _this;
  }

  (0, _createClass2.default)(CustomScrollView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.chooseTransformProp();
      this.resize();

      if (this.props.windowResize) {
        this.props.window.addEventListener('resize', this.resize);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.resize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "chooseTransformProp",
    value: function chooseTransformProp() {
      var style = this.trackerY.current.style;
      var prop = '';

      if ('transform' in style) {
        prop = 'transform';
      } else if ('webkitTransform' in style) {
        prop = 'webkitTransform';
      }

      this.transformProp = prop;
    }
  }, {
    key: "setTrackerPosition",
    value: function setTrackerPosition(scrollTop) {
      this.lastTrackerTop = scrollTop;
      this.trackerY.current.style[this.transformProp] = "translate(0, ".concat(scrollTop, "px)");
    }
  }, {
    key: "setTrackerPositionFromScroll",
    value: function setTrackerPositionFromScroll(scrollTop) {
      var progress = scrollTop / (this.scrollHeight - this.clientHeight);
      this.setTrackerPosition((this.clientHeight - this.trackerHeight) * progress);
    }
  }, {
    key: "setScrollPositionFromTracker",
    value: function setScrollPositionFromTracker(trackerTop) {
      var progress = trackerTop / (this.clientHeight - this.trackerHeight);
      this.box.current.scrollTop = (this.scrollHeight - this.clientHeight) * progress;
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "CustomScrollView"
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "CustomScrollView__barY",
        ref: this.barY
      }, (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "CustomScrollView__trackerY",
        ref: this.trackerY,
        onMouseDown: this.onDragStart
      })), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "CustomScrollView__box",
        tabIndex: -1,
        ref: this.box,
        onScroll: this.scroll
      }, this.props.children));
    }
  }]);
  return CustomScrollView;
}(React.Component);

var _default = (0, _dom.withDOM)(CustomScrollView);

exports.default = _default;
//# sourceMappingURL=CustomScrollView.js.map