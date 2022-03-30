import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "onRefresh", "isFetching", "platform", "window", "document", "scroll"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Touch } from "../Touch/Touch";
import TouchRootContext from "../Touch/TouchContext";
import FixedLayout from "../FixedLayout/FixedLayout";
import { classNames } from "../../lib/classNames";
import { IOS, ANDROID, VKCOM } from "../../lib/platform";
import { getClassName } from "../../helpers/getClassName";
import PullToRefreshSpinner from "./PullToRefreshSpinner";
import { withPlatform } from "../../hoc/withPlatform";
import { canUseDOM, withDOM } from "../../lib/dom";
import { runTapticImpactOccurred } from "../../lib/taptic";
import { withContext } from "../../hoc/withContext";
import { ScrollContext } from "../AppRoot/ScrollContext";

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
  _inherits(PullToRefresh, _React$PureComponent);

  var _super = _createSuper(PullToRefresh);

  function PullToRefresh(props) {
    var _this;

    _classCallCheck(this, PullToRefresh);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "params", void 0);

    _defineProperty(_assertThisInitialized(_this), "contentRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "waitFetchingTimeout", undefined);

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
      if (_this.state.refreshing) {
        cancelEvent(e);
      }

      _this.setState({
        touchDown: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onWindowTouchMove", function (event) {
      if (_this.state.refreshing) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchMove", function (e) {
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

        if (progress > 85 && !refreshing && _this.props.platform === IOS) {
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

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function () {
      _this.setState({
        watching: false,
        touchDown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRefreshingFinish", function () {
      if (!_this.state.touchDown) {
        _this.resetRefreshingState();
      }
    });

    _this.params = {
      start: props.platform === ANDROID || props.platform === VKCOM ? -45 : -10,
      max: props.platform === ANDROID || props.platform === VKCOM ? 80 : 50,
      maxY: props.platform === ANDROID || props.platform === VKCOM ? 80 : 400,
      refreshing: props.platform === ANDROID || props.platform === VKCOM ? 50 : 36,
      positionMultiplier: props.platform === ANDROID || props.platform === VKCOM ? 1 : 0.21
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

  _createClass(PullToRefresh, [{
    key: "document",
    get: function get() {
      return this.props.document;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (canUseDOM) {
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
      if (canUseDOM) {
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
          spinnerY: this.props.platform === ANDROID || this.props.platform === VKCOM ? this.params.refreshing : this.state.spinnerY
        });
        this.props.onRefresh();
        runTapticImpactOccurred("light");
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
          restProps = _objectWithoutProperties(_this$props, _excluded);

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

      if (platform === IOS && refreshing && !touchDown) {
        contentTransform = "translate3d(0, 100px, 0)";
      } else if (platform === IOS && (contentShift || refreshing)) {
        contentTransform = "translate3d(0, ".concat(contentShift, "px, 0)");
      }

      return createScopedElement(TouchRootContext.Provider, {
        value: true
      }, createScopedElement(Touch, _extends({}, restProps, {
        onStart: this.onTouchStart,
        onMove: this.onTouchMove,
        onEnd: this.onTouchEnd,
        vkuiClass: classNames(getClassName("PullToRefresh", platform), {
          "PullToRefresh--watching": watching,
          "PullToRefresh--refreshing": refreshing
        })
      }), createScopedElement(FixedLayout, {
        vkuiClass: "PullToRefresh__controls"
      }, createScopedElement(PullToRefreshSpinner, {
        style: {
          transform: spinnerTransform,
          WebkitTransform: spinnerTransform,
          opacity: watching || refreshing || canRefresh ? 1 : 0
        },
        on: refreshing,
        progress: refreshing ? undefined : spinnerProgress
      })), createScopedElement("div", {
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


export default withContext(withPlatform(withDOM(PullToRefresh)), ScrollContext, "scroll");
//# sourceMappingURL=PullToRefresh.js.map