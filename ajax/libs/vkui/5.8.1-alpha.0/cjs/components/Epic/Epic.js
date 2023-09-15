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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var _ScrollSaver = require("./ScrollSaver");
var warn = (0, _warnOnce.warnOnce)("Epic");
var Epic = function(_param) {
    var activeStory = _param.activeStory, tabbar = _param.tabbar, children = _param.children, restProps = _object_without_properties._(_param, [
        "activeStory",
        "tabbar",
        "children"
    ]);
    var scroll = _react.useRef({}).current;
    var _React_Children_toArray_find;
    var story = (_React_Children_toArray_find = _react.Children.toArray(children).find(function(story) {
        return /*#__PURE__*/ _react.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory;
    })) !== null && _React_Children_toArray_find !== void 0 ? _React_Children_toArray_find : null;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiEpic", tabbar && "vkuiInternalEpic--hasTabbar")
    }), /*#__PURE__*/ _react.createElement(_ScrollSaver.ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: function(value) {
            return scroll[activeStory] = value;
        }
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map