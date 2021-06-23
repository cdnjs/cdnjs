import * as React from 'react';
declare class JqxValidator extends React.PureComponent<IValidatorProps, IState> {
    protected static getDerivedStateFromProps(props: IValidatorProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: IValidatorProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: IValidatorProps): void;
    getOptions(option: string): any;
    hideHint(id: string): void;
    hide(): void;
    updatePosition(): void;
    validate(htmlElement?: any): void;
    validateInput(id: string): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxValidator;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface IValidatorRule {
    input?: string;
    message?: string;
    action?: string;
    rule?: string | any;
    position?: string;
    hintRender?: any;
}
interface IValidatorOptions {
    arrow?: boolean;
    animation?: 'fade' | 'none';
    animationDuration?: number;
    closeOnClick?: boolean;
    focus?: boolean;
    hintType?: 'tooltip' | 'label';
    onError?: () => void;
    onSuccess?: () => void;
    position?: string;
    rules?: IValidatorRule[];
    rtl?: boolean;
}
export interface IValidatorProps extends IValidatorOptions {
    className?: string;
    style?: React.CSSProperties;
    onValidationError?: (e?: Event) => void;
    onValidationSuccess?: (e?: Event) => void;
}
