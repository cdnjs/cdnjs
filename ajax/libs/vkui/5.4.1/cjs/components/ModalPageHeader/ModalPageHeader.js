"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalPageHeader", {
    enumerable: true,
    get: function() {
        return ModalPageHeader;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _modalPageContext = require("../ModalPage/ModalPageContext");
var _panelHeader = require("../PanelHeader/PanelHeader");
var _separator = require("../Separator/Separator");
var ModalPageHeader = function(_param) {
    var children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? true : _param_separator, getRef = _param.getRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "separator",
        "getRef",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var hasSeparator = separator && platform === _platform.Platform.VKCOM;
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var labelId = _react.useContext(_modalPageContext.ModalPageContext).labelId;
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalPageHeader", platform !== _platform.Platform.VKCOM && "vkuiModalPageHeader--withGaps", isDesktop && "vkuiModalPageHeader--desktop"),
        ref: getRef
    }, /*#__PURE__*/ _react.createElement(_panelHeader.PanelHeader, _objectSpreadProps(_objectSpread({
        className: (0, _vkjs.classNames)("vkuiInternalModalPageHeader__in", className)
    }, restProps), {
        fixed: false,
        separator: false,
        transparent: true
    }), /*#__PURE__*/ _react.createElement(_panelHeader.PanelHeader.Content, {
        Component: "h2",
        id: labelId
    }, children)), hasSeparator && /*#__PURE__*/ _react.createElement(_separator.Separator, {
        wide: true
    }));
};

//# sourceMappingURL=ModalPageHeader.js.map