import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';
import { VirtualScroller, VirtualScrollerProps } from '../virtualscroller';

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

interface AutoCompleteUnselectParams extends AutoCompleteSelectParams {}

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
    appendTo?: AutoCompleteAppendToType;
    autoFocus?: boolean;
    autoHighlight?: boolean;
    children?: React.ReactNode;
    className?: string;
    delay?: number;
    disabled?: boolean;
    dropdown?: boolean;
    dropdownAriaLabel?: string;
    dropdownAutoFocus?: boolean;
    dropdownIcon?: IconType<AutoCompleteProps>;
    dropdownMode?: string;
    emptyMessage?: string;
    field?: string;
    forceSelection?: boolean;
    inputClassName?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputStyle?: React.CSSProperties;
    itemTemplate?: AutoCompleteItemTemplateType;
    maxLength?: number;
    minLength?: number;
    multiple?: boolean;
    selectionLimit?: number;
    name?: string;
    optionGroupChildren?: string;
    optionGroupLabel?: string;
    optionGroupTemplate?: AutoCompleteOptionGroupTemplateType;
    panelClassName?: string;
    panelStyle?: React.CSSProperties;
    placeholder?: string;
    readOnly?: boolean;
    removeIcon?: IconType<AutoCompleteProps>;
    scrollHeight?: string;
    selectedItemTemplate?: AutoCompleteSelectedItemTemplateType;
    showEmptyMessage?: boolean;
    size?: number;
    style?: React.CSSProperties;
    suggestions?: any[];
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: CSSTransitionProps;
    type?: string;
    value?: any;
    virtualScrollerOptions?: VirtualScrollerProps;
    completeMethod?(e: AutoCompleteCompleteMethodParams): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onChange?(e: AutoCompleteChangeParams): void;
    onClear?(event: React.SyntheticEvent): void;
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    onDblClick?(event: React.MouseEvent<HTMLElement>): void;
    onDropdownClick?(e: AutoCompleteDropdownClickParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onHide?(): void;
    onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onSelect?(e: AutoCompleteSelectParams): void;
    onShow?(): void;
    onUnselect?(e: AutoCompleteUnselectParams): void;
}

export declare class AutoComplete extends React.Component<AutoCompleteProps, any> {
    public show(): void;
    public hide(): void;
    public search(event: React.SyntheticEvent, query: string, source: AutoCompleteSourceType): void;
    public getElement(): HTMLSpanElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
    public getVirtualScroller(): VirtualScroller;
}
