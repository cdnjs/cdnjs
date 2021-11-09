import * as React from 'react';
import { MenuItem } from '../menuitem';
import TooltipOptions from '../tooltip/tooltipoptions';
import {IconType, TemplateType} from "../utils/Utils";

type SplitButtonAppendToType = 'self' | HTMLElement | undefined | null;

export interface SplitButtonProps {
    id?: string;
    label?: string;
    icon?: IconType<SplitButtonProps>;
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
    buttonTemplate?: TemplateType<SplitButtonProps>;
    transitionOptions?: object;
    dropdownIcon?: IconType<SplitButtonProps>;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class SplitButton extends React.Component<SplitButtonProps, any> { }
