import * as React from "react";
interface DefaultValidationOption {
    name?: string;
    check?: boolean;
    showMsg?: boolean;
    required?: boolean;
    locale?: string;
    msgOnError?: string;
    msgOnSuccess?: string;
    shouldRenderMsgAsHtml?: boolean;
}
interface DefaultAsyncMsgObj {
    error?: boolean;
    message?: string;
    showOnError?: boolean;
    showOnSuccess?: boolean;
}
export declare const isValidValue: (list: OptionListItem[], value: any) => boolean;
interface OptionListItem {
    id: string;
    name: string;
}
interface AttributesInput {
    id?: string;
    name?: string;
}
interface Props {
    attributesWrapper: React.HTMLAttributes<HTMLDivElement>;
    attributesInputs: AttributesInput[];
    value?: string | number;
    disabled?: boolean;
    validate?: boolean;
    optionList?: OptionListItem[];
    onChange: (res: string, e: React.ChangeEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    validationOption?: DefaultValidationOption;
    asyncMsgObj?: DefaultAsyncMsgObj;
    classNameWrapper?: string;
    classNameInput?: string;
    classNameContainer?: string;
    classNameOptionListItem?: string;
    customStyleWrapper?: React.CSSProperties;
    customStyleContainer?: React.CSSProperties;
    customStyleInput?: React.CSSProperties;
    customStyleOptionListItem?: React.CSSProperties;
    validationCallback?: (res: boolean) => void;
}
interface OptionProps {
    checked?: boolean;
    id?: string;
    optionListItemClass?: string;
    labelClass?: string;
    inputClass?: string;
    value?: string | number;
    disabled?: boolean;
    item?: OptionListItem;
    customStyleOptionListItem?: object;
    customStyleInput?: object;
    attributesInput: AttributesInput;
    onChange?: (res: string, e: React.ChangeEvent<HTMLElement>) => void;
}
export declare const Option: React.FC<OptionProps>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
