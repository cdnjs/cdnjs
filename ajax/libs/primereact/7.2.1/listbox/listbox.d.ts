import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps } from '../virtualscroller';


type ListBoxOptionGroupTemplateType = React.ReactNode | ((option: any, index: number) => React.ReactNode);

type ListBoxItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type ListBoxOptionDisabledType = string | ((option: any) => boolean);

interface ListBoxChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface ListBoxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: ListBoxChangeTargetOptions;
}

interface ListBoxFilterValueChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

export interface ListBoxProps {
    id?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: ListBoxOptionDisabledType;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: ListBoxOptionGroupTemplateType;
    itemTemplate?: ListBoxItemTemplateType;
    style?: object;
    listStyle?: object;
    listClassName?: string;
    className?: string;
    virtualScrollerOptions?: VirtualScrollerProps;
    disabled?: boolean;
    dataKey?: string;
    multiple?: boolean;
    metaKeySelection?: boolean;
    filter?: boolean;
    filterBy?: string;
    filterValue?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: ListBoxChangeParams): void;
    onFilterValueChange?(e: ListBoxFilterValueChangeParams): void;
}

export declare class ListBox extends React.Component<ListBoxProps, any> { }
