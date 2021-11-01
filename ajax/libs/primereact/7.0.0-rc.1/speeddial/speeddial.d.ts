import * as React from 'react';
import { MenuItem } from '../menuitem';

type SpeedDialDirectionType = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';

type SpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

type SpeedDialButtonTemplateType = React.ReactNode | ((options: SpeedDialButtonOptions) => React.ReactNode);

interface SpeedDialButtonOptions {
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    className: string;
    iconClassName: string;
    element: JSX.Element;
    props: SpeedDialProps;
    visible: boolean;
}

export interface SpeedDialProps {
    id?: string;
    model?: MenuItem[];
    visible?: boolean;
    style?: object;
    className?: string;
    direction?: SpeedDialDirectionType;
    transitionDelay?: number;
    type?: SpeedDialType;
    radius?: number;
    mask?: boolean;
    disabled?: boolean;
    hideOnClickOutside?: boolean;
    buttonStyle?: object;
    buttonClassName?: string;
    buttonTemplate?: SpeedDialButtonTemplateType;
    maskStyle?: object;
    maskClassName?: string;
    showIcon?: string;
    hideIcon?: string;
    rotateAnimation?: boolean;
    onVisibleChange?(visible: boolean): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class SpeedDial extends React.Component<SpeedDialProps, any> {
    public show(): void;
    public hide(): void;
}
