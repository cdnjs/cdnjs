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
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
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
    const { disabled, label } = props, rest = _object_without_properties._(props, [
        "disabled",
        "label"
    ]);
    return /*#__PURE__*/ _react.createElement(_Chip.Chip, _object_spread._({
        removable: !disabled
    }, rest), label);
}

//# sourceMappingURL=constants.js.map