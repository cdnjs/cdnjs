import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { withDOM } from "../../lib/dom";
import { multiRef, setRef } from "../../lib/utils";
import "./CustomScrollView.css";

var CustomScrollView = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomScrollView, _React$Component);

  var _super = _createSuper(CustomScrollView);

  function CustomScrollView() {
    var _this;

    _classCallCheck(this, CustomScrollView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "ratio", NaN);

    _defineProperty(_assertThisInitialized(_this), "lastTrackerTop", 0);

    _defineProperty(_assertThisInitialized(_this), "clientHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "trackerHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "scrollHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "transformProp", '');

    _defineProperty(_assertThisInitialized(_this), "startY", 0);

    _defineProperty(_assertThisInitialized(_this), "trackerTop", 0);

    _defineProperty(_assertThisInitialized(_this), "box", multiRef(function (e) {
      return setRef(e, _this.props.boxRef);
    }));

    _defineProperty(_assertThisInitialized(_this), "barY", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "trackerY", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "resize", function () {
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

    _defineProperty(_assertThisInitialized(_this), "scroll", function () {
      if (_this.ratio >= 1) {
        return;
      }

      _this.setTrackerPositionFromScroll(_this.box.current.scrollTop);
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e) {
      e.preventDefault();
      _this.startY = e.clientY;
      _this.trackerTop = _this.lastTrackerTop;

      _this.props.document.addEventListener('mousemove', _this.onMove);

      _this.props.document.addEventListener('mouseup', _this.onUp);
    });

    _defineProperty(_assertThisInitialized(_this), "onMove", function (e) {
      e.preventDefault();
      var diff = e.clientY - _this.startY;
      var position = Math.min(Math.max(_this.trackerTop + diff, 0), _this.clientHeight - _this.trackerHeight);

      _this.setScrollPositionFromTracker(position);
    });

    _defineProperty(_assertThisInitialized(_this), "onUp", function (e) {
      e.preventDefault();

      _this.props.document.removeEventListener('mousemove', _this.onMove);

      _this.props.document.removeEventListener('mouseup', _this.onUp);
    });

    return _this;
  }

  _createClass(CustomScrollView, [{
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
      return createScopedElement("div", {
        vkuiClass: "CustomScrollView"
      }, createScopedElement("div", {
        vkuiClass: "CustomScrollView__barY",
        ref: this.barY
      }, createScopedElement("div", {
        vkuiClass: "CustomScrollView__trackerY",
        ref: this.trackerY,
        onMouseDown: this.onDragStart
      })), createScopedElement("div", {
        vkuiClass: "CustomScrollView__box",
        tabIndex: -1,
        ref: this.box,
        onScroll: this.scroll
      }, this.props.children));
    }
  }]);

  return CustomScrollView;
}(React.Component);

export default withDOM(CustomScrollView);
//# sourceMappingURL=CustomScrollView.js.map