import * as React from 'react';
import { MenuItem } from '../menuitem/MenuItem';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/splitbutton' {

    type ButtonTemplateType = React.ReactNode | ((props: SplitButtonProps) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

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
        appendTo?: AppendToType;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        buttonTemplate?: ButtonTemplateType;
        transitionOptions?: object;
        onClick?(event: React.MouseEvent<HTMLElement>): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class SplitButton extends React.Component<SplitButtonProps, any> { }
}
