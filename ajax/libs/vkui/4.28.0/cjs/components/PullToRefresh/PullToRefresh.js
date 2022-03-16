"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _Touch = require("../Touch/Touch");

var _TouchContext = _interopRequireDefault(require("../Touch/TouchContext"));

var _FixedLayout = _interopRequireDefault(require("../FixedLayout/FixedLayout"));

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _getClassName = require("../../helpers/getClassName");

var _PullToRefreshSpinner = _interopRequireDefault(require("./PullToRefreshSpinner"));

var _withPlatform = require("../../hoc/withPlatform");

var _dom = require("../../lib/dom");

var _taptic = require("../../lib/taptic");

var _withContext = require("../../hoc/withContext");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _excluded = ["children", "onRefresh", "isFetching", "platform", "window", "document", "scroll"];

function cancelEvent(event) {
  if (!event) {
    return false;
  }

  while (event.originalEvent) {
    event = event.originalEvent;
  }

  if (event.preventDefault && event.cancelable) {
    event.preventDefault();
  }

  if (event.stopPropagation) {
    event.stopPropagation();
  }

  return false;
}

var PullToRefresh = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(PullToRefresh, _React$PureComponent);

  var _super = (0, _createSuper2.default)(PullToRefresh);

  function PullToRefresh(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PullToRefresh);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "params", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "contentRef", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "waitFetchingTimeout", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchStart", function (e) {
      if (_this.state.refreshing) {
        cancelEvent(e);
      }

      _this.setState({
        touchDown: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onWindowTouchMove", function (event) {
      if (_this.state.refreshing) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchMove", function (e) {
      var _this$props$scroll;

      var isY = e.isY,
          shiftY = e.shiftY;
      var _this$params = _this.params,
          start = _this$params.start,
          max = _this$params.max;
      var pageYOffset = (_this$props$scroll = _this.props.scroll) === null || _this$props$scroll === void 0 ? void 0 : _this$props$scroll.getScroll().y;
      var _this$state = _this.state,
          refreshing = _this$state.refreshing,
          watching = _this$state.watching,
          touchDown = _this$state.touchDown;

      if (watching && touchDown) {
        cancelEvent(e);
        var positionMultiplier = _this.params.positionMultiplier;
        var shift = Math.max(0, shiftY - _this.state.touchY);
        var currentY = Math.max(start, Math.min(_this.params.maxY, start + shift * positionMultiplier));
        var progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;

        _this.setState({
          spinnerY: currentY,
          spinnerProgress: Math.min(80, Math.max(0, progress)),
          canRefresh: progress > 80,
          contentShift: (currentY + 10) * 2.3
        });

        if (progress > 85 && !refreshing && _this.props.platform === _platform.IOS) {
          _this.runRefreshing();
        }
      } else if (isY && pageYOffset === 0 && shiftY > 0 && !refreshing && touchDown) {
        cancelEvent(e);

        _this.setState({
          watching: true,
          touchY: shiftY,
          spinnerY: start,
          spinnerProgress: 0
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTouchEnd", function () {
      _this.setState({
        watching: false,
        touchDown: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRefreshingFinish", function () {
      if (!_this.state.touchDown) {
        _this.resetRefreshingState();
      }
    });
    _this.params = {
      start: props.platform === _platform.ANDROID || props.platform === _platform.VKCOM ? -45 : -10,
      max: props.platform === _platform.ANDROID || props.platform === _platform.VKCOM ? 80 : 50,
      maxY: props.platform === _platform.ANDROID || props.platform === _platform.VKCOM ? 80 : 400,
      refreshing: props.platform === _platform.ANDROID || props.platform === _platform.VKCOM ? 50 : 36,
      positionMultiplier: props.platform === _platform.ANDROID || props.platform === _platform.VKCOM ? 1 : 0.21
    };
    _this.state = {
      watching: false,
      refreshing: false,
      canRefresh: false,
      touchDown: false,
      touchY: 0,
      spinnerY: _this.params.start,
      spinnerProgress: 0,
      contentShift: 0
    };
    _this.contentRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  (0, _createClass2.default)(PullToRefresh, [{
    key: "document",
    get: function get() {
      return this.props.document;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (_dom.canUseDOM) {
        this.document.addEventListener("touchmove", this.onWindowTouchMove, {
          // @ts-ignore
          cancelable: true,
          passive: false
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Здесь нужен последний аргумент с такими же параметрами, потому что
      // некоторые браузеры на странных вендорах типа Meizu не удаляют обработчик.
      // https://github.com/VKCOM/VKUI/issues/444
      if (_dom.canUseDOM) {
        this.document.removeEventListener("touchmove", this.onWindowTouchMove, {
          // @ts-ignore
          cancelable: true,
          passive: false
        });
      }

      if (this.waitFetchingTimeout) {
        clearTimeout(this.waitFetchingTimeout);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.isFetching && !this.props.isFetching) {
        this.onRefreshingFinish();
      }

      if (!prevProps.isFetching && this.props.isFetching && this.waitFetchingTimeout) {
        clearTimeout(this.waitFetchingTimeout);
      }

      if (prevState.touchDown && !this.state.touchDown) {
        var _this$state2 = this.state,
            refreshing = _this$state2.refreshing,
            canRefresh = _this$state2.canRefresh;

        if (!refreshing && canRefresh) {
          this.runRefreshing();
        } else if (refreshing && !this.props.isFetching) {
          // only iOS can start refresh before gesture end
          this.resetRefreshingState();
        } else {
          // refreshing && isFetching: refresh in progress
          // OR !refreshing && !canRefresh: pull was not strong enough
          this.setState({
            spinnerY: refreshing ? this.params.refreshing : this.params.start,
            spinnerProgress: 0,
            contentShift: 0
          });
        }
      }
    }
  }, {
    key: "runRefreshing",
    value: function runRefreshing() {
      if (!this.state.refreshing && this.props.onRefresh) {
        // cleanup if the consumer does not start fetching in 1s
        this.waitFetchingTimeout = setTimeout(this.onRefreshingFinish, 1000);
        this.setState({
          refreshing: true,
          spinnerY: this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? this.params.refreshing : this.state.spinnerY
        });
        this.props.onRefresh();
        (0, _taptic.runTapticImpactOccurred)("light");
      }
    }
  }, {
    key: "resetRefreshingState",
    value: function resetRefreshingState() {
      this.setState({
        watching: false,
        canRefresh: false,
        refreshing: false,
        spinnerY: this.params.start,
        spinnerProgress: 0,
        contentShift: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onRefresh = _this$props.onRefresh,
          isFetching = _this$props.isFetching,
          platform = _this$props.platform,
          window = _this$props.window,
          document = _this$props.document,
          scroll = _this$props.scroll,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var _this$state3 = this.state,
          watching = _this$state3.watching,
          refreshing = _this$state3.refreshing,
          spinnerY = _this$state3.spinnerY,
          spinnerProgress = _this$state3.spinnerProgress,
          canRefresh = _this$state3.canRefresh,
          touchDown = _this$state3.touchDown,
          contentShift = _this$state3.contentShift;
      var spinnerTransform = "translate3d(0, ".concat(spinnerY, "px, 0)");
      var contentTransform = "";

      if (platform === _platform.IOS && refreshing && !touchDown) {
        contentTransform = "translate3d(0, 100px, 0)";
      } else if (platform === _platform.IOS && (contentShift || refreshing)) {
        contentTransform = "translate3d(0, ".concat(contentShift, "px, 0)");
      }

      return (0, _jsxRuntime.createScopedElement)(_TouchContext.default.Provider, {
        value: true
      }, (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({}, restProps, {
        onStart: this.onTouchStart,
        onMove: this.onTouchMove,
        onEnd: this.onTouchEnd,
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("PullToRefresh", platform), {
          "PullToRefresh--watching": watching,
          "PullToRefresh--refreshing": refreshing
        })
      }), (0, _jsxRuntime.createScopedElement)(_FixedLayout.default, {
        vkuiClass: "PullToRefresh__controls"
      }, (0, _jsxRuntime.createScopedElement)(_PullToRefreshSpinner.default, {
        style: {
          transform: spinnerTransform,
          WebkitTransform: spinnerTransform,
          opacity: watching || refreshing || canRefresh ? 1 : 0
        },
        on: refreshing,
        progress: refreshing ? undefined : spinnerProgress
      })), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "PullToRefresh__content",
        ref: this.contentRef,
        style: {
          transform: contentTransform,
          WebkitTransform: contentTransform
        }
      }, children)));
    }
  }]);
  return PullToRefresh;
}(React.PureComponent); // eslint-disable-next-line import/no-default-export


var _default = (0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)(PullToRefresh)), _ScrollContext.ScrollContext, "scroll");

exports.default = _default;
//# sourceMappingURL=PullToRefresh.js.map