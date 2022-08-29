import React from 'react';
export declare enum DEFAULT_TYPES {
    ALPHANUMERTIC = "alphanumeric",
    ALPHA = "alpha",
    NUMBER = "number"
}
export interface ReactCodesInputProps {
    wrapperRef?: React.RefObject<HTMLInputElement>;
    value?: string;
    onChange?: (value: string) => void;
    initialFocus?: boolean;
    codeLength?: number;
    id?: string;
    type?: 'number' | 'alpha' | 'alphanumeric';
    letterCase?: 'upper' | 'lower';
    disabled?: boolean;
    hide?: boolean;
    focusColor?: string;
    classNameComponent?: string;
    classNameWrapper?: string;
    classNameCodeWrapper?: string;
    classNameEnteredValue?: string;
    classNameCode?: string;
    classNameCodeWrapperFocus?: string;
    customStyleComponent?: React.CSSProperties;
    customStyleWrapper?: React.CSSProperties;
    customStyleCodeWrapper?: React.CSSProperties;
    customStyleEnteredValue?: React.CSSProperties;
    customStyleCode?: React.CSSProperties;
    customStyleCodeWrapperFocus?: React.CSSProperties;
    placeholder?: string;
    customStylePlaceholder?: React.CSSProperties;
}
declare const ReactCodesInput: React.FC<ReactCodesInputProps>;
export default ReactCodesInput;
