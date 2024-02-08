import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Chip } from './Chip/Chip';
export const DEFAULT_VALUE = [];
export const DEFAULT_INPUT_VALUE = '';
export function getOptionValueDefault(option) {
    return option.value;
}
export function getOptionLabelDefault(option) {
    return option.label;
}
export function getNewOptionDataDefault(value, label) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
        value,
        label
    };
}
export function renderChipDefault(props) {
    const { disabled, label } = props, rest = _object_without_properties(props, [
        "disabled",
        "label"
    ]);
    return /*#__PURE__*/ React.createElement(Chip, _object_spread({
        removable: !disabled
    }, rest), label);
}

//# sourceMappingURL=constants.js.map