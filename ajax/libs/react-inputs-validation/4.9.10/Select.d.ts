import * as React from 'react';
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
export declare const isValidValue: (list: OptionListItem[], value: any) => boolean;
export declare const getItem: (list: OptionListItem[], value: any) => OptionListItem;
export declare const getIndex: (list: OptionListItem[], value: string) => number;
interface OptionListItem {
    id: string;
    name: string;
    icon?: string;
    hidden?: boolean;
    disabled?: boolean;
}
interface Props {
    attributesWrapper?: React.HTMLAttributes<HTMLButtonElement>;
    attributesInput?: {
        id?: string;
        name?: string;
        type?: string;
        placeholder?: string;
        maxLength?: number;
    };
    value?: string | number;
    disabled?: boolean;
    validate?: boolean;
    showSearch?: boolean;
    showArrow?: boolean;
    keyword?: string;
    optionList: OptionListItem[];
    onChange: (res: {
        [key: string]: any;
    }, e: React.MouseEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement> | Event) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    validationOption?: DefaultValidationOption;
    asyncMsgObj?: {
        error?: boolean;
        message?: string;
        showOnError?: boolean;
        showOnSuccess?: boolean;
    };
    classNameWrapper?: string;
    classNameContainer?: string;
    classNameSelect?: string;
    classNameOptionListWrapper?: string;
    classNameOptionListContainer?: string;
    classNameDropdownIconOptionListItem?: string;
    classNameOptionListItem?: string;
    customStyleWrapper?: React.CSSProperties;
    customStyleContainer?: React.CSSProperties;
    customStyleSelect?: React.CSSProperties;
    customStyleOptionListWrapper?: React.CSSProperties;
    customStyleOptionListContainer?: React.CSSProperties;
    customStyleDropdownIcon?: React.CSSProperties;
    customStyleOptionListItem?: React.CSSProperties;
    validationCallback?: (res: boolean) => void;
}
interface OptionProps {
    index?: number;
    id?: string;
    className?: string;
    item?: OptionListItem;
    customStyleOptionListItem?: React.CSSProperties;
    onClick?: (res: OptionListItem, e: React.MouseEvent<HTMLElement>) => void;
    onMouseOver?: (res: number) => void;
    onMouseMove?: () => void;
    onMouseOut?: () => void;
}
export declare const Option: React.FC<OptionProps>;
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
