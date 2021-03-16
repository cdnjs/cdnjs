import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface MultiSelectProps {
    id?: string;
    name?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: boolean;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    display?: string;
    style?: object;
    className?: string;
    panelClassName?: string;
    panelStyle?: object;
    scrollHeight?: string;
    placeholder?: string;
    fixedPlaceholder?: boolean;
    disabled?: boolean;
    showClear?: boolean;
    filter?: boolean;
    filterBy?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    emptyFilterMessage?: any;
    resetFilterOnHide?: boolean;
    tabIndex?: number;
    dataKey?: string;
    inputId?: string;
    required?: boolean;
    appendTo?: HTMLElement;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    maxSelectedLabels?: number;
    selectionLimit?: number;
    selectedItemsLabel?: string;
    panelHeaderTemplate?: any;
    panelFooterTemplate?: any;
    itemTemplate?(item: any): JSX.Element | undefined;
    optionGroupTemplate?:((option: any) => any | any);
    selectedItemTemplate?(value: any): JSX.Element | undefined;
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
    onFocus?(event: Event): void;
    onBlur?(event: Event): void;
}

export class MultiSelect extends React.Component<MultiSelectProps,any> {}
