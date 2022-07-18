import * as React from 'react';
import { MenuItem } from '../menuitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { CSSTransitionProps } from '../csstransition';
import { IconType, TemplateType } from '../utils';

type SplitButtonAppendToType = 'self' | HTMLElement | undefined | null;

export interface SplitButtonProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
    label?: string;
    icon?: IconType<SplitButtonProps>;
    loading?: boolean;
    loadingIcon?: IconType<SplitButtonProps>;
    model?: MenuItem[];
    disabled?: boolean;
    buttonClassName?: string;
    menuStyle?: object;
    menuClassName?: string;
    menuButtonClassName?: string;
    buttonProps?: any;
    menuButtonProps?: any;
    appendTo?: SplitButtonAppendToType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    buttonTemplate?: TemplateType<SplitButtonProps>;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: IconType<SplitButtonProps>;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class SplitButton extends React.Component<SplitButtonProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
}
