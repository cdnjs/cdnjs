import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

interface FieldsetToggleParams {
    originalEvent: React.MouseEvent<HTMLElement>;
    value: boolean;
}

export interface FieldsetProps {
    id?: string;
    legend?: React.ReactNode;
    className?: string;
    style?: object;
    toggleable?: boolean;
    collapsed?: boolean;
    transitionOptions?: CSSTransitionProps;
    onExpand?(event: React.MouseEvent<HTMLElement>): void;
    onCollapse?(event: React.MouseEvent<HTMLElement>): void;
    onToggle?(e: FieldsetToggleParams): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Fieldset extends React.Component<FieldsetProps, any> { }
