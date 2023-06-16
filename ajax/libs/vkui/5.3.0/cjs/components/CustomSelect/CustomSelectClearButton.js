"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectClearButton", {
    enumerable: true,
    get: function() {
        return CustomSelectClearButton;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _utils = require("../../lib/utils");
var _iconButton = require("../IconButton/IconButton");
var CustomSelectClearButton = function(param) {
    var className = param.className, onClick = param.onClick;
    return /*#__PURE__*/ _react.createElement(_iconButton.IconButton, {
        className: className,
        Component: "div",
        onClick: function(e) {
            (0, _utils.stopPropagation)(e);
            onClick();
        },
        "aria-label": "Очистить поле",
        onKeyDown: _utils.stopPropagation,
        role: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map