"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Epic", {
    enumerable: true,
    get: function() {
        return Epic;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _scrollSaver = require("./ScrollSaver");
var warn = (0, _warnOnce.warnOnce)("Epic");
var Epic = function(props) {
    var scroll = _react.useRef({}).current;
    var activeStory = props.activeStory, tabbar = props.tabbar, children = props.children, className = props.className, restProps = _objectWithoutProperties(props, [
        "activeStory",
        "tabbar",
        "children",
        "className"
    ]);
    var _React_Children_toArray_find;
    var story = (_React_Children_toArray_find = _react.Children.toArray(children).find(function(story) {
        return /*#__PURE__*/ _react.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory;
    })) !== null && _React_Children_toArray_find !== void 0 ? _React_Children_toArray_find : null;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiEpic", tabbar && "vkuiInternalEpic--hasTabbar", className)
    }), /*#__PURE__*/ _react.createElement(_scrollSaver.ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: function(value) {
            return scroll[activeStory] = value;
        }
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map