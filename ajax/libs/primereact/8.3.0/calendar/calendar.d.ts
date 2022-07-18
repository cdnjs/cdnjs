import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

type CalendarAppendToType = 'self' | HTMLElement | undefined | null;

type CalendarVisibleType = 'outside' | 'dateselect' | undefined | null;

type CalendarIconPosType = 'left' | 'right';

type CalendarEventType = React.SyntheticEvent | undefined | null;

interface CalendarChangeTargetOptions {
    name: string;
    id: string;
    value: Date | Date[] | undefined | null;
}

interface CalendarChangeParams {
    originalEvent: React.SyntheticEvent;
    value: Date | Date[] | undefined;
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
    value: Date | Date[];
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

type CalendarNavigatorTemplateChangeCallback = (
    event: React.SyntheticEvent,
    value: string | number | undefined | null
) => void;

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
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    name?: string;
    value?: Date | Date[];
    visible?: boolean;
    viewDate?: Date;
    style?: object;
    className?: string;
    inline?: boolean;
    selectionMode?: string;
    inputId?: string;
    inputStyle?: object;
    inputClassName?: string;
    required?: boolean;
    readOnlyInput?: boolean;
    keepInvalid?: boolean;
    mask?: string;
    disabled?: boolean;
    tabIndex?: number;
    placeholder?: string;
    showIcon?: boolean;
    icon?: IconType<CalendarProps>;
    iconPos?: CalendarIconPosType;
    showOnFocus?: boolean;
    numberOfMonths?: number;
    view?: string;
    touchUI?: boolean;
    showTime?: boolean;
    timeOnly?: boolean;
    showSeconds?: boolean;
    showMillisec?: boolean;
    hourFormat?: string;
    stepHour?: number;
    stepMinute?: number;
    stepSecond?: number;
    stepMillisec?: number;
    shortYearCutoff?: string;
    hideOnDateTimeSelect?: boolean;
    showWeek?: boolean;
    locale?: string;
    dateFormat?: string;
    panelStyle?: object;
    panelClassName?: string;
    monthNavigator?: boolean;
    yearNavigator?: boolean;
    yearRange?: string;
    disabledDates?: Date[];
    disabledDays?: number[];
    minDate?: Date;
    maxDate?: Date;
    maxDateCount?: number;
    showMinMaxRange?: boolean;
    showOtherMonths?: boolean;
    selectOtherMonths?: boolean;
    showButtonBar?: boolean;
    todayButtonClassName?: string;
    clearButtonClassName?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    appendTo?: CalendarAppendToType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    transitionOptions?: CSSTransitionProps;
    dateTemplate?(e: CalendarDateTemplateParams): React.ReactNode;
    decadeTempate?(yearValues: number[]): React.ReactNode;
    headerTemplate?(): React.ReactNode;
    footerTemplate?(): React.ReactNode;
    monthNavigatorTemplate?(e: CalendarMonthNavigatorTemplateParams): React.ReactNode;
    yearNavigatorTemplate?(e: CalendarYearNavigatorTemplateParams): React.ReactNode;
    onVisibleChange?(e: CalendarVisibleChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    onSelect?(e: CalendarSelectParams): void;
    onChange?(e: CalendarChangeParams): void;
    onMonthChange?(e: CalendarMonthChangeParams): void
    onViewDateChange?(e: CalendarViewChangeParams): void;
    onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
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
