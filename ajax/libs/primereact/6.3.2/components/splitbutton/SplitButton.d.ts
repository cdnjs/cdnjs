import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';
import TooltipOptions from '../tooltip/TooltipOptions';

type SplitButtonButtonTemplateType = React.ReactNode | ((props: SplitButtonProps) => React.ReactNode);

type SplitButtonAppendToType = 'self' | HTMLElement | undefined | null;

export interface SplitButtonProps {
    id?: string;
    label?: string;
    icon?: string;
    model?: MenuItem[];
    disabled?: boolean;
    style?: object;
    className?: string;
    menuStyle?: object;
    menuClassName?: string;
    tabIndex?: number;
    appendTo?: SplitButtonAppendToType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    buttonTemplate?: SplitButtonButtonTemplateType;
    transitionOptions?: object;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class SplitButton extends React.Component<SplitButtonProps, any> { }
