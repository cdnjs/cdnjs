"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixedLayout", {
    enumerable: true,
    get: function() {
        return FixedLayout;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var _SplitColContext = require("../SplitCol/SplitColContext");
var _TooltipContainer = require("../Tooltip/TooltipContainer");
var stylesVertical = {
    top: "vkuiFixedLayout--vertical-top",
    bottom: (0, _vkjs.classNames)("vkuiFixedLayout--vertical-bottom", "vkuiInternalFixedLayout--vertical-bottom")
};
var FixedLayout = function(_param) {
    var children = _param.children, style = _param.style, vertical = _param.vertical, getRootRef = _param.getRootRef, getRef = _param.getRef, filled = _param.filled, className = _param.className, useParentWidth = _param.useParentWidth, restProps = _object_without_properties._(_param, [
        "children",
        "style",
        "vertical",
        "getRootRef",
        "getRef",
        "filled",
        "className",
        "useParentWidth"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var ref = (0, _useExternRef.useExternRef)(getRootRef, getRef); // TODO [>=6]: удалить getRef
    var _React_useState = _sliced_to_array._(_react.useState(undefined), 2), width = _React_useState[0], setWidth = _React_useState[1];
    var window = (0, _dom.useDOM)().window;
    var colRef = _react.useContext(_SplitColContext.SplitColContext).colRef;
    var doResize = function() {
        if (useParentWidth && ref.current) {
            var _ref_current_parentElement;
            var parentWidth = (_ref_current_parentElement = ref.current.parentElement) === null || _ref_current_parentElement === void 0 ? void 0 : _ref_current_parentElement.getBoundingClientRect().width;
            setWidth(parentWidth ? "".concat(parentWidth, "px") : undefined);
        } else if (colRef === null || colRef === void 0 ? void 0 : colRef.current) {
            var computedStyle = getComputedStyle(colRef.current);
            setWidth("".concat(colRef.current.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight), "px"));
        } else {
            setWidth(undefined);
        }
    };
    _react.useEffect(doResize, [
        colRef,
        platform,
        ref,
        useParentWidth
    ]);
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "resize", doResize);
    return /*#__PURE__*/ _react.createElement(_TooltipContainer.TooltipContainer, _object_spread_props._(_object_spread._({}, restProps), {
        fixed: true,
        ref: ref,
        className: (0, _vkjs.classNames)("vkuiFixedLayout", platform === _platform.Platform.IOS && "vkuiInternalFixedLayout--ios", filled && "vkuiFixedLayout--filled", vertical && stylesVertical[vertical], className),
        style: _object_spread_props._(_object_spread._({}, style), {
            width: width
        })
    }), children);
};

//# sourceMappingURL=FixedLayout.js.map