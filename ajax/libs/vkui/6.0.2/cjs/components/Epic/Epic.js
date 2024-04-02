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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _getNavId = require("../../lib/getNavId");
const _warnOnce = require("../../lib/warnOnce");
const _RootComponent = require("../RootComponent/RootComponent");
const _ScrollSaver = require("./ScrollSaver");
const warn = (0, _warnOnce.warnOnce)('Epic');
const Epic = (_param)=>{
    var { activeStory, tabbar, children } = _param, restProps = _object_without_properties._(_param, [
        "activeStory",
        "tabbar",
        "children"
    ]);
    const scroll = _react.useRef({}).current;
    var _React_Children_toArray_find;
    const story = (_React_Children_toArray_find = _react.Children.toArray(children).find((story)=>/*#__PURE__*/ _react.isValidElement(story) && (0, _getNavId.getNavId)(story.props, warn) === activeStory)) !== null && _React_Children_toArray_find !== void 0 ? _React_Children_toArray_find : null;
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiEpic", tabbar && 'vkuiInternalEpic--hasTabbar')
    }), /*#__PURE__*/ _react.createElement(_ScrollSaver.ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: (value)=>scroll[activeStory] = value
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map