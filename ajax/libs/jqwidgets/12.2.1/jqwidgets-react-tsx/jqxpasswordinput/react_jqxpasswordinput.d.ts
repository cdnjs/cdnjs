import * as React from 'react';
declare class JqxPasswordInput extends React.PureComponent<IPasswordInputProps, IState> {
    protected static getDerivedStateFromProps(props: IPasswordInputProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IPasswordInputProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IPasswordInputProps): void;
    getOptions(option: string): any;
    renderWidget(): void;
    refresh(): void;
    val(value?: any): any;
    private _manageProps;
    private _wireEvents;
}
export default JqxPasswordInput;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IPasswordInputLocalization {
    passwordStrengthString?: string;
    tooShort?: string;
    weak?: string;
    fair?: string;
    good?: string;
    strong?: string;
}
export interface IPasswordInputStrengthColors {
    tooShort?: string;
    weak?: string;
    fair?: string;
    good?: string;
    strong?: string;
}
export interface IPasswordInputPasswordStrength {
    password?: string | number;
    characters?: object;
    defaultStrength?: string;
}
export interface IPasswordInputStrengthTypeRenderer {
    password?: string | number;
    characters?: object;
    defaultStrength?: string;
}
interface IPasswordInputOptions {
    disabled?: boolean;
    height?: string | number;
    localization?: IPasswordInputLocalization;
    maxLength?: number | string;
    placeHolder?: number | string;
    passwordStrength?: (password: IPasswordInputPasswordStrength['password'], characters: IPasswordInputPasswordStrength['characters'], defaultStrength: IPasswordInputPasswordStrength['defaultStrength']) => string;
    rtl?: boolean;
    strengthColors?: IPasswordInputStrengthColors;
    showStrength?: boolean;
    showStrengthPosition?: 'left' | 'right' | 'top' | 'bottom';
    strengthTypeRenderer?: (password: IPasswordInputStrengthTypeRenderer['password'], characters: IPasswordInputStrengthTypeRenderer['characters'], defaultStrength: IPasswordInputStrengthTypeRenderer['defaultStrength']) => string;
    showPasswordIcon?: boolean;
    theme?: string;
    width?: string | number;
}
export interface IPasswordInputProps extends IPasswordInputOptions {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e?: Event) => void;
}
