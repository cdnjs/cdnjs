import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

type CalendarAppendToType = 'self' | HTMLElement | undefined | null;

type CalendarVisibleType = 'outside' | 'dateselect' | undefined | null;

type CalendarIconPosType = 'left' | 'right';

type CalendarEventType = React.SyntheticEvent | undefined | null;

type CalendarValueType = Date | Date[] | string | undefined | null;

interface CalendarChangeTargetOptions {
    name: string;
    id: string;
    value: CalendarValueType;
}

interface CalendarChangeParams {
    originalEvent: React.SyntheticEvent;
    value: CalendarValueType;
    stopPropagation(): void;
    preventDefault(): void;
    target: CalendarChangeTargetOptions;
}

interface CalendarMonthChangeParams {
    month: number;
    year: number;
}

interface CalendarViewChangeParams {
    originalEvent: React.SyntheticEvent;
    value: Date;
}

interface CalendarSelectParams {
    originalEvent: React.SyntheticEvent;
    value: CalendarValueType;
}

interface CalendarDateTemplateParams {
    day: number;
    month: number;
    year: number;
    otherMonth: boolean;
    today: boolean;
    selectable: boolean;
}

interface CalendarVisibleChangeParams {
    visible: boolean;
    type: CalendarVisibleType;
    callback?(): void;
}

type CalendarNavigatorTemplateChangeCallback = (event: React.SyntheticEvent, value: string | number | undefined | null) => void;

interface CalendarNavigatorTemplateParams {
    onChange: CalendarNavigatorTemplateChangeCallback;
    className: string;
    value: string | number | undefined | null;
    names: any[];
    options: any[];
    element: React.ReactNode;
    props: any;
}

interface CalendarMonthNavigatorTemplateParams extends CalendarNavigatorTemplateParams {}

interface CalendarYearNavigatorTemplateParams extends CalendarNavigatorTemplateParams {}

export interface CalendarProps {
    appendTo?: CalendarAppendToType;
    ariaLabelledBy?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    children?: React.ReactNode;
    className?: string;
    clearButtonClassName?: string;
    dateFormat?: string;
    disabled?: boolean;
    disabledDates?: Date[];
    disabledDays?: number[];
    hideOnDateTimeSelect?: boolean;
    hourFormat?: string;
    icon?: IconType<CalendarProps>;
    iconPos?: CalendarIconPosType;
    id?: string;
    inline?: boolean;
    inputClassName?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputStyle?: React.CSSProperties;
    keepInvalid?: boolean;
    locale?: string;
    mask?: string;
    maxDate?: Date;
    maxDateCount?: number;
    minDate?: Date;
    monthNavigator?: boolean;
    name?: string;
    numberOfMonths?: number;
    panelClassName?: string;
    panelStyle?: React.CSSProperties;
    placeholder?: string;
    readOnlyInput?: boolean;
    required?: boolean;
    selectOtherMonths?: boolean;
    selectionMode?: string;
    shortYearCutoff?: string;
    showButtonBar?: boolean;
    showIcon?: boolean;
    showMillisec?: boolean;
    showMinMaxRange?: boolean;
    showOnFocus?: boolean;
    showOtherMonths?: boolean;
    showSeconds?: boolean;
    showTime?: boolean;
    showWeek?: boolean;
    stepHour?: number;
    stepMillisec?: number;
    stepMinute?: number;
    stepSecond?: number;
    style?: React.CSSProperties;
    tabIndex?: number;
    timeOnly?: boolean;
    todayButtonClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    touchUI?: boolean;
    transitionOptions?: CSSTransitionProps;
    value?: CalendarValueType;
    view?: string;
    viewDate?: Date;
    visible?: boolean;
    yearNavigator?: boolean;
    yearRange?: string;
    formatDateTime?(date: Date): string;
    parseDateTime?(text: string): Date;
    dateTemplate?(e: CalendarDateTemplateParams): React.ReactNode;
    decadeTempate?(yearValues: number[]): React.ReactNode;
    footerTemplate?(): React.ReactNode;
    headerTemplate?(): React.ReactNode;
    monthNavigatorTemplate?(e: CalendarMonthNavigatorTemplateParams): React.ReactNode;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onChange?(e: CalendarChangeParams): void;
    onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onHide?(): void;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onMonthChange?(e: CalendarMonthChangeParams): void;
    onSelect?(e: CalendarSelectParams): void;
    onShow?(): void;
    onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onViewDateChange?(e: CalendarViewChangeParams): void;
    onVisibleChange?(e: CalendarVisibleChangeParams): void;
    yearNavigatorTemplate?(e: CalendarYearNavigatorTemplateParams): React.ReactNode;
}

export declare class Calendar extends React.Component<CalendarProps, any> {
    public show(): void;
    public hide(): void;
    public getCurrentDateTime(): Date | Date[];
    public getViewDate(): Date | Date[];
    public getElement(): HTMLSpanElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
    public updateViewDate(event: CalendarEventType, value: Date | Date[]): void;
}
