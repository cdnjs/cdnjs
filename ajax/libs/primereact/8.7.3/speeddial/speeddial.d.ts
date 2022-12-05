import * as React from 'react';
import { MenuItem } from '../menuitem';
import { IconType } from '../utils';

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

export interface SpeedDialProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    model?: MenuItem[];
    visible?: boolean;
    direction?: SpeedDialDirectionType;
    transitionDelay?: number;
    type?: SpeedDialType;
    radius?: number;
    mask?: boolean;
    disabled?: boolean;
    hideOnClickOutside?: boolean;
    buttonStyle?: React.CSSProperties;
    buttonClassName?: string;
    buttonTemplate?: SpeedDialButtonTemplateType;
    maskStyle?: React.CSSProperties;
    maskClassName?: string;
    showIcon?: IconType<SpeedDialProps>;
    hideIcon?: IconType<SpeedDialProps>;
    rotateAnimation?: boolean;
    onVisibleChange?(visible: boolean): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class SpeedDial extends React.Component<SpeedDialProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
}
