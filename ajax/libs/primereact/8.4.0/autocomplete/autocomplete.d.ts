import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { VirtualScrollerProps, VirtualScroller } from '../virtualscroller';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

type AutoCompleteOptionGroupTemplateType = React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);

type AutoCompleteItemTemplateType = React.ReactNode | ((suggestion: any, index: number) => React.ReactNode);

type AutoCompleteSelectedItemTemplateType = React.ReactNode | ((value: any) => React.ReactNode);

type AutoCompleteAppendToType = 'self' | HTMLElement | undefined | null;

type AutoCompleteSourceType = 'dropdown' | 'input';

interface AutoCompleteChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface AutoCompleteChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: AutoCompleteChangeTargetOptions;
}

interface AutoCompleteSelectParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface AutoCompleteUnselectParams extends AutoCompleteSelectParams { }

interface AutoCompleteDropdownClickParams {
    originalEvent: React.SyntheticEvent;
    query: string;
}

interface AutoCompleteCompleteMethodParams {
    originalEvent: React.SyntheticEvent;
    query: string;
}

export interface AutoCompleteProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'onChange' | 'onSelect' | 'ref'> {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    value?: any;
    name?: string;
    type?: string;
    suggestions?: any[];
    field?: string;
    optionGroupLabel?: string;
    optionGroupChildren?: string;
    optionGroupTemplate?: AutoCompleteOptionGroupTemplateType;
    forceSelection?: boolean;
    autoHighlight?: boolean;
    virtualScrollerOptions?: VirtualScrollerProps;
    scrollHeight?: string;
    dropdown?: boolean;
    dropdownMode?: string;
    dropdownAutoFocus?: boolean;
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
    maxLength?: number;
    size?: number;
    appendTo?: AutoCompleteAppendToType;
    tabIndex?: number;
    autoFocus?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    completeMethod?(e: AutoCompleteCompleteMethodParams): void;
    itemTemplate?: AutoCompleteItemTemplateType;
    selectedItemTemplate?: AutoCompleteSelectedItemTemplateType;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: IconType<AutoCompleteProps>;
    removeIcon?: IconType<AutoCompleteProps>;
    onChange?(e: AutoCompleteChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onSelect?(e: AutoCompleteSelectParams): void;
    onUnselect?(e: AutoCompleteUnselectParams): void;
    onDropdownClick?(e: AutoCompleteDropdownClickParams): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onDblClick?(event: React.MouseEvent<HTMLElement>): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    onClear?(event: React.SyntheticEvent): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class AutoComplete extends React.Component<AutoCompleteProps, any> {
    public search(event:React.SyntheticEvent, query:string, source: AutoCompleteSourceType): void;
    public getElement(): HTMLSpanElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
    public getVirtualScroller(): VirtualScroller;
}
