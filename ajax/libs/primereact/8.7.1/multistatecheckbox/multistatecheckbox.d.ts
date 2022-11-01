import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

type MultiStateCheckboxOptionsType = MultiStateCheckboxOption[] | any[];

type MultiStateCheckboxIconTemplateType = React.ReactNode | ((options: MultiStateCheckboxIconTemplateParams) => React.ReactNode);

interface MultiStateCheckboxOption {
    icon: IconType<MultiStateCheckboxProps>;
    style: React.CSSProperties;
    className: string;
    [key: string]: any;
}

interface MultiStateCheckboxIconTemplateParams {
    option: MultiStateCheckboxOption | undefined | null;
    className: string;
    element: JSX.Element;
    props: MultiStateCheckboxProps;
}

interface MultiStateCheckboxChangeTargetOptions {
    name: string;
    id: string;
    value: boolean | undefined | null;
}

interface MultiStateCheckboxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: MultiStateCheckboxChangeTargetOptions;
}

export interface MultiStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    value?: any;
    options?: MultiStateCheckboxOptionsType;
    optionValue?: string;
    optionLabel?: string;
    iconTemplate?: MultiStateCheckboxIconTemplateType;
    dataKey?: string;
    disabled?: boolean;
    readOnly?: boolean;
    empty?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: MultiStateCheckboxChangeParams): void;
    children?: React.ReactNode;
}

export declare class MultiStateCheckbox extends React.Component<MultiStateCheckboxProps, any> {
    public getElement(): HTMLDivElement;
}
