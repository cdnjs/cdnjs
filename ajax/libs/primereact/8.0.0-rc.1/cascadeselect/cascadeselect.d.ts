import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';

type CascadeSelectItemTemplateType = React.ReactNode | ((option: any) => React.ReactNode);

type CascadeSelectAppendToType = 'self' | HTMLElement | undefined | null;

interface CascadeSelectChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface CascadeSelectGroupChangeParams extends CascadeSelectChangeParams { }

export interface CascadeSelectProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    style?: object;
    className?: string;
    value?: any;
    name?: string;
    options?: any[];
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
}

export declare class CascadeSelect extends React.Component<CascadeSelectProps, any> { }
