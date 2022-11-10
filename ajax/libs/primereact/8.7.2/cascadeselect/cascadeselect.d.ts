import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { SelectItemOptionsType } from '../selectitem/selectitem';

type CascadeSelectItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type CascadeSelectAppendToType = 'self' | HTMLElement | undefined | null;

interface CascadeSelectChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface CascadeSelectGroupChangeParams extends CascadeSelectChangeParams {}

export interface CascadeSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    style?: React.CSSProperties;
    className?: string;
    value?: any;
    name?: string;
    options?: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    optionGroupLabel?: string;
    optionGroupChildren?: string[];
    placeholder?: string;
    itemTemplate?: CascadeSelectItemTemplateType;
    disabled?: boolean;
    dataKey?: string;
    inputId?: string;
    tabIndex?: number;
    ariaLabelledBy?: string;
    appendTo?: CascadeSelectAppendToType;
    transitionOptions?: CSSTransitionProps;
    dropdownIcon?: string;
    onChange?(e: CascadeSelectChangeParams): void;
    onGroupChange?(e: CascadeSelectGroupChangeParams): void;
    onBeforeShow?(): void;
    onBeforeHide?(): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class CascadeSelect extends React.Component<CascadeSelectProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
    public getLabel(): HTMLSpanElement;
}
