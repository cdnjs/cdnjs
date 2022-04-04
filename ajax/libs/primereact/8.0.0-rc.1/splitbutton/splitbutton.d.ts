import * as React from 'react';
import { MenuItem } from '../menuitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import { CSSTransitionProps } from '../csstransition';
import { IconType, TemplateType } from '../utils';

type SplitButtonAppendToType = 'self' | HTMLElement | undefined | null;

export interface SplitButtonProps {
    id?: string;
    label?: string;
    icon?: IconType<SplitButtonProps>;
    model?: MenuItem[];
    disabled?: boolean;
    style?: object;
    className?: string;
    buttonClassName?: string;
    menuStyle?: object;
    menuClassName?: string;
    menuButtonClassName?: string;
    tabIndex?: number;
    appendTo?: SplitButtonAppendToType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    buttonTemplate?: TemplateType<SplitButtonProps>;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: IconType<SplitButtonProps>;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class SplitButton extends React.Component<SplitButtonProps, any> {
    public show(): void;
    public hide(): void;
}
