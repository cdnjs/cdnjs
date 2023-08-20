import * as React from 'react';
interface DefaultValidationOption {
    locale?: string;
    reg?: string;
    min?: number;
    max?: number;
    type?: string;
    name?: string;
    check?: boolean;
    showMsg?: boolean;
    length?: number;
    regMsg?: string;
    required?: boolean;
    msgOnError?: string;
    msgOnSuccess?: string;
    customFunc?: Function | undefined;
    shouldRenderMsgAsHtml?: boolean;
}
interface DefaultAsyncMsgObj {
    error?: boolean;
    message?: string;
    showOnError?: boolean;
    showOnSuccess?: boolean;
}
interface AttributesInputObj {
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    maxLength?: number;
}
interface Props {
    attributesWrapper?: React.HTMLAttributes<HTMLDivElement>;
    attributesInput?: AttributesInputObj;
    value?: string;
    disabled?: boolean;
    validate?: boolean;
    classNameInput?: string;
    classNameWrapper?: string;
    classNameContainer?: string;
    customStyleInput?: React.CSSProperties;
    customStyleWrapper?: React.CSSProperties;
    customStyleContainer?: React.CSSProperties;
    validationOption?: DefaultValidationOption;
    asyncMsgObj?: DefaultAsyncMsgObj;
    onChange: (res: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLElement>) => void;
    validationCallback?: (res: boolean) => void;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
