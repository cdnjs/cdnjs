import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

type CompleteMethodParams = {
    originalEvent: Event,
    query: string
}

interface AutoCompleteProps {
    id?: string;
    value?: any;
    name?: string;
    type?: string;
    suggestions?: any[];
    field?: string;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    forceSelection?: boolean;
    autoHighlight?: boolean;
    scrollHeight?: string;
    dropdown?: boolean;
    dropdownMode?: string;
    multiple?: boolean;
    minLength?: number;
    delay?: number;
    style?: object;
    className?: string;
    inputId?: string;
    inputStyle?: object;
    inputClassName?: string;
    panelClassName?: string;
    panelStyle?: object;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    maxlength?: number;
    size?: number;
    appendTo?: any;
    tabIndex?: number;
    autoFocus?: boolean;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    completeMethod?(e: CompleteMethodParams): void;
    itemTemplate?:((data: any, index: number) => any | any);
    optionGroupTemplate?:((data: any, index: number) => any | any);
    selectedItemTemplate?:((data: any) => any | any);
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
    onFocus?(event: Event): void;
    onBlur?(event: Event): void;
    onSelect?(e: {originalEvent: Event, value: any}): void;
    onUnselect?(e: {originalEvent: Event, value: any}): void;
    onDropdownClick?(e: {originalEvent: Event, query: string}): void;
    onClick?(event:Event): void;
    onDblClick?(event:Event): void;
    onMouseDown?(event:Event): void;
    onKeyUp?(event:Event): void;
    onKeyPress?(event:Event): void;
    onContextMenu?(event:Event): void;
    onClear?(event:Event): void;
}

export class AutoComplete extends React.Component<AutoCompleteProps,any> {}
