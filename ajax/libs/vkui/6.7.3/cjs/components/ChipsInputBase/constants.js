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
    DEFAULT_INPUT_VALUE: function() {
        return DEFAULT_INPUT_VALUE;
    },
    DEFAULT_VALUE: function() {
        return DEFAULT_VALUE;
    },
    getNewOptionDataDefault: function() {
        return getNewOptionDataDefault;
    },
    getOptionLabelDefault: function() {
        return getOptionLabelDefault;
    },
    getOptionValueDefault: function() {
        return getOptionValueDefault;
    },
    renderChipDefault: function() {
        return renderChipDefault;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _Chip = require("./Chip/Chip");
const DEFAULT_VALUE = [];
const DEFAULT_INPUT_VALUE = '';
function getOptionValueDefault(option) {
    return option.value;
}
function getOptionLabelDefault(option) {
    return option.label;
}
function getNewOptionDataDefault(value, label) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
        value,
        label
    };
}
function renderChipDefault(props) {
    const { label } = props, rest = _object_without_properties._(props, [
        "label"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Chip.Chip, _object_spread_props._(_object_spread._({
        removable: !props.disabled
    }, rest), {
        children: label
    }));
}

//# sourceMappingURL=constants.js.map