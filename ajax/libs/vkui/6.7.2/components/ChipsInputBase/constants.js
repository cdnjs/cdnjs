import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
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
    const { label } = props, rest = _object_without_properties(props, [
        "label"
    ]);
    return /*#__PURE__*/ _jsx(Chip, _object_spread_props(_object_spread({
        removable: !props.disabled
    }, rest), {
        children: label
    }));
}

//# sourceMappingURL=constants.js.map