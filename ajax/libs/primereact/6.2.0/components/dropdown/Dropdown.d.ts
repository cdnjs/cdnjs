import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface DropdownProps {
    id?: string;
    name?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: boolean;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    style?: object;
    className?: string;
    autoWidth?: boolean;
    scrollHeight?: string;
    filter?: boolean;
    filterBy?: string;
    filterMatchMode?: string;
    filterPlaceholder?: string;
    filterLocale?: string;
    emptyFilterMessage?: any;
    editable?:boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    appendTo?: any;
    tabIndex?: number;
    autoFocus?: boolean;
    filterInputAutoFocus?: boolean;
    resetFilterOnHide?: boolean;
    showFilterClear?: boolean;
    lazy?: boolean;
    panelClassName?: string;
    panelStyle?: object;
    dataKey?: string;
    inputId?: string;
    showClear?: boolean;
    maxLength?: number;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabel?: string,
    ariaLabelledBy?: string,
    valueTemplate?:((option: any, props: object) => any | any);
    itemTemplate?:((option: any) => any | any);
    optionGroupTemplate?:((option: any) => any | any);
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
    onFocus?(e: Event): void;
    onBlur?(e: Event): void;
    onMouseDown?(event: Event): void;
    onContextMenu?(event: Event): void;
}

export class Dropdown extends React.Component<DropdownProps,any> {}
