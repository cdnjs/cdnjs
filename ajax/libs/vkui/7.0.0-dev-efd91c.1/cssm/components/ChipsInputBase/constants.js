import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Chip } from "./Chip/Chip.js";
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
    const { label, ...rest } = props;
    return /*#__PURE__*/ _jsx(Chip, {
        removable: !props.disabled,
        ...rest,
        children: label
    });
}

//# sourceMappingURL=constants.js.map