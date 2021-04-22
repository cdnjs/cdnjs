import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace MultiStateCheckbox {

    type OptionsType = Option[] | any[];

    type IconTemplateType = React.ReactNode | ((options: IconTemplateParams) => React.ReactNode);

    interface Option {
        icon: string;
        style: object;
        className: string;
        [key: string]: any;
    }

    interface IconTemplateParams {
        option: Option | undefined | null;
        className: string;
        element: JSX.Element;
        props: MultiStateCheckboxProps;
    }

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: boolean | undefined | null;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface MultiStateCheckboxProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        inputId?: string;
        value?: any;
        options?: OptionsType;
        optionValue?: string;
        iconTemplate?: IconTemplateType;
        dataKey?: string;
        name?: string;
        style?: object;
        className?: string;
        disabled?: boolean;
        readOnly?: boolean;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
    }
}

export declare class MultiStateCheckbox extends React.Component<MultiStateCheckbox.MultiStateCheckboxProps, any> { }
