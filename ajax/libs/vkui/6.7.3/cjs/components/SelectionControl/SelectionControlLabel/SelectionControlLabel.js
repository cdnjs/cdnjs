"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectionControlLabel", {
    enumerable: true,
    get: function() {
        return SelectionControlLabel;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _RootComponent = require("../../RootComponent/RootComponent");
const _Footnote = require("../../Typography/Footnote/Footnote");
const _Text = require("../../Typography/Text/Text");
const sizeYClassNames = {
    none: "vkuiSelectionControlLabel--sizeY-none",
    compact: "vkuiSelectionControlLabel--sizeY-compact"
};
function SelectionControlLabel(_param) {
    var { children, titleAfter, description } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "titleAfter",
        "description"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiSelectionControlLabel", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiSelectionControlLabel__titleLayout",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
                        className: "vkuiSelectionControlLabel__title",
                        children: children
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiSelectionControlLabel__titleAfter",
                        children: titleAfter
                    })
                ]
            }),
            (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                className: "vkuiSelectionControlLabel__description",
                children: description
            })
        ]
    }));
}

//# sourceMappingURL=SelectionControlLabel.js.map