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
interface DefaultAsyncMsgObj {
    error?: boolean;
    message?: string;
    showOnError?: boolean;
    showOnSuccess?: boolean;
}
interface Props {
    attributesWrapper?: React.HTMLAttributes<HTMLButtonElement>;
    attributesInput?: {
        id?: string;
        name?: string;
    };
    value?: string | boolean;
    checked?: boolean;
    disabled?: boolean;
    labelHtml?: React.ReactNode;
    validate?: boolean;
    onChange: (res: boolean, e: React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    validationOption?: DefaultValidationOption;
    asyncMsgObj?: DefaultAsyncMsgObj;
    classNameInput?: string;
    classNameWrapper?: string;
    classNameInputBox?: string;
    classNameInputBoxItem?: string;
    classNameContainer?: string;
    customStyleInput?: React.CSSProperties;
    customStyleWrapper?: React.CSSProperties;
    customStyleContainer?: React.CSSProperties;
    customStyleInputBox?: React.CSSProperties;
    validationCallback?: (res: boolean) => void;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
