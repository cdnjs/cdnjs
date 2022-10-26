import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

interface FieldsetToggleParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    value: boolean;
}

export interface FieldsetProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>, 'ref'> {
    legend?: React.ReactNode;
    toggleable?: boolean;
    collapsed?: boolean;
    transitionOptions?: CSSTransitionProps;
    onExpand?(event: React.MouseEvent<HTMLElement>): void;
    onCollapse?(event: React.MouseEvent<HTMLElement>): void;
    onToggle?(e: FieldsetToggleParams): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export declare class Fieldset extends React.Component<FieldsetProps, any> {
    public getElement(): HTMLFieldSetElement;
    public getContent(): HTMLDivElement;
}
