"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropdownIcon", {
    enumerable: true,
    get: function() {
        return DropdownIcon;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var DropdownIcon = function(_param) {
    var _param_opened = _param.opened, opened = _param_opened === void 0 ? false : _param_opened, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "opened",
        "className"
    ]);
    var sizeY = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)().sizeY;
    var IconCompact = opened ? _icons.Icon20ChevronUp : _icons.Icon20Dropdown;
    var IconRegular = opened ? _icons.Icon24ChevronUp : _icons.Icon24ChevronDown;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, sizeY.compact && /*#__PURE__*/ _react.createElement(IconCompact, _objectSpread({
        className: (0, _vkjs.classNames)(sizeY.compact.className, className)
    }, restProps)), sizeY.regular && /*#__PURE__*/ _react.createElement(IconRegular, _objectSpread({
        className: (0, _vkjs.classNames)(sizeY.regular.className, className)
    }, restProps)));
};

//# sourceMappingURL=DropdownIcon.js.map