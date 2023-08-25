"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AlertHeader: function() {
        return AlertHeader;
    },
    AlertText: function() {
        return AlertText;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _Caption = require("../Typography/Caption/Caption");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var AlertHeader = function(props) {
    var platform = (0, _usePlatform.usePlatform)();
    switch(platform){
        case _platform.Platform.IOS:
            return /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                className: "vkuiAlert__header",
                weight: "1",
                level: "3"
            }, props));
        default:
            return /*#__PURE__*/ _react.createElement(_Title.Title, _object_spread._({
                className: "vkuiAlert__header",
                weight: "2",
                level: "2"
            }, props));
    }
};
var AlertText = function(props) {
    var platform = (0, _usePlatform.usePlatform)();
    switch(platform){
        case _platform.Platform.VKCOM:
            return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, _object_spread._({
                className: "vkuiAlert__text"
            }, props));
        case _platform.Platform.IOS:
            return /*#__PURE__*/ _react.createElement(_Caption.Caption, _object_spread._({
                className: "vkuiAlert__text"
            }, props));
        default:
            return /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread._({
                Component: "span",
                className: "vkuiAlert__text",
                weight: "3"
            }, props));
    }
};

//# sourceMappingURL=AlertTypography.js.map