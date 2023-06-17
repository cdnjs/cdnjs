"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Group", {
    enumerable: true,
    get: function() {
        return Group;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _modalRootContext = require("../ModalRoot/ModalRootContext");
var _separator = require("../Separator/Separator");
var _spacing = require("../Spacing/Spacing");
var _footnote = require("../Typography/Footnote/Footnote");
var _obj;
var sizeXClassNames = (_obj = {
    none: "vkuiGroup--sizeX-none"
}, _defineProperty(_obj, _adaptivity.SizeType.COMPACT, "vkuiGroup--sizeX-compact"), _defineProperty(_obj, _adaptivity.SizeType.REGULAR, "vkuiGroup--sizeX-regular"), _obj);
var warn = (0, _warnOnce.warnOnce)("TabsItem");
var Group = function(_param) {
    var header = _param.header, description = _param.description, children = _param.children, _param_separator = _param.separator, separator = _param_separator === void 0 ? "auto" : _param_separator, getRootRef = _param.getRootRef, modeProps = _param.mode, _param_padding = _param.padding, padding = _param_padding === void 0 ? "m" : _param_padding, className = _param.className, tabIndexProp = _param.tabIndex, restProps = _objectWithoutProperties(_param, [
        "header",
        "description",
        "children",
        "separator",
        "getRootRef",
        "mode",
        "padding",
        "className",
        "tabIndex"
    ]);
    var isInsideModal = _react.useContext(_modalRootContext.ModalRootContext).isInsideModal;
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeX = _useAdaptivity1.sizeX, sizeX = _useAdaptivity_sizeX === void 0 ? "none" : _useAdaptivity_sizeX;
    var mode = modeProps;
    if (!modeProps) {
        // Подробнее в "none" можно прочитать в ADAPTIVITY_GUIDE.md
        mode = isInsideModal ? "plain" : "none";
    }
    var isTabPanel = restProps.role === "tabpanel";
    if (process.env.NODE_ENV === "development" && isTabPanel && (!restProps["aria-controls"] || !restProps["id"])) {
        warn('При использовании роли "tabpanel" необходимо задать значение свойств "aria-controls" и "id"');
    }
    var tabIndex = isTabPanel && tabIndexProp === undefined ? 0 : tabIndexProp;
    var separatorClassName = (0, _vkjs.classNames)("vkuiGroup__separator", separator === "show" && "vkuiGroup__separator--force");
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement("section", _objectSpreadProps(_objectSpread({}, restProps), {
        tabIndex: tabIndex,
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiGroup", platform === _platform.Platform.IOS && "vkuiGroup--ios", sizeXClassNames[sizeX], mode && ({
            none: (0, _vkjs.classNames)("vkuiGroup--mode-none", "vkuiInternalGroup--mode-none"),
            plain: (0, _vkjs.classNames)("vkuiGroup--mode-plain", "vkuiInternalGroup--mode-plain"),
            card: (0, _vkjs.classNames)("vkuiGroup--mode-card", "vkuiInternalGroup--mode-card")
        })[mode], {
            s: "vkuiGroup--padding-s",
            m: "vkuiGroup--padding-m"
        }[padding], className)
    }), header, children, (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiGroup__description"
    }, description)), separator !== "hide" && /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_spacing.Spacing, {
        className: (0, _vkjs.classNames)(separatorClassName, "vkuiGroup__separator--spacing"),
        size: 16
    }), /*#__PURE__*/ _react.createElement(_separator.Separator, {
        className: (0, _vkjs.classNames)(separatorClassName, "vkuiGroup__separator--separator")
    })));
};

//# sourceMappingURL=Group.js.map