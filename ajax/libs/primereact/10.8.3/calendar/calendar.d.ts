/**
 *
 * Calendar also known as DatePicker, is a form component to work with dates.
 *
 * [Live Demo](https://www.primereact.org/calendar/)
 *
 * @module calendar
 *
 */
import * as React from 'react';
import { CSSTransitionProps as ReactCSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ComponentHooks } from '../componentbase/componentbase';
import { CSSTransitionProps } from '../csstransition';
import { PassThroughOptions } from '../passthrough';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent, Nullable } from '../ts-helpers';
import { IconType, PassThroughType } from '../utils';

export declare type CalendarPassThroughType<T> = PassThroughType<T, CalendarPassThroughMethodOptions>;
export declare type CalendarPassThroughTransitionType = ReactCSSTransitionProps | ((options: CalendarPassThroughMethodOptions) => ReactCSSTransitionProps) | undefined;

/**
 * Custom passthrough(pt) option method.
 */
export interface CalendarPassThroughMethodOptions {
    props: CalendarProps;
    state: CalendarState;
    context: CalendarContext;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link CalendarProps.pt}
 */
export interface CalendarPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the InputText component.
     */
    input?: CalendarPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    dropdownButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the panel's DOM element.
     */
    panel?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the group container's DOM element.
     */
    groupContainer?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the group's DOM element.
     */
    group?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the header's DOM element.
     */
    header?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    previousButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the previous icon's DOM element.
     */
    previousIcon?: CalendarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the title's DOM element.
     */
    title?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the month title's DOM element.
     */
    monthTitle?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the year title's DOM element.
     */
    yearTitle?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the decade title's DOM element.
     */
    decadeTitle?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the decade title text's DOM element.
     */
    decadeTitleText?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the Button component.
     */
    nextButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the next icon's DOM element.
     */
    nextIcon?: CalendarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the container's DOM element.
     */
    container?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the table's DOM element.
     */
    table?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableElement>>;
    /**
     * Uses to pass attributes to the table header's DOM element.
     */
    tableHeader?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the table header row's DOM element.
     */
    tableHeaderRow?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the week header's DOM element.
     */
    weekHeader?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the table header cell's DOM element.
     */
    tableHeaderCell?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the week label's DOM element.
     */
    weekLabel?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the week day's DOM element.
     */
    weekDay?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the table body's DOM element.
     */
    tableBody?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableSectionElement>>;
    /**
     * Uses to pass attributes to the table body row's DOM element.
     */
    tableBodyRow?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableRowElement>>;
    /**
     * Uses to pass attributes to the week number's DOM element.
     */
    weekNumber?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the week label container's DOM element.
     */
    weekLabelContainer?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the day's DOM element.
     */
    day?: CalendarPassThroughType<React.HTMLAttributes<HTMLTableCellElement>>;
    /**
     * Uses to pass attributes to the day label's DOM element.
     */
    dayLabel?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the month picker's DOM element.
     */
    monthPicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the month's DOM element.
     */
    month?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the year picker's DOM element.
     */
    yearPicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the year's DOM element.
     */
    year?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the time picker's DOM element.
     */
    timePicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the hour picker's DOM element.
     */
    hourPicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the increment icon's DOM element.
     */
    incrementIcon?: CalendarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the increment button's DOM element.
     */
    incrementButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the decrement button's DOM element.
     */
    decrementButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the increment icon's DOM element.
     */
    decrementIcon?: CalendarPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the hour's DOM element.
     */
    hour?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the separatorc ontainer's DOM element.
     */
    separatorContainer?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the separator's DOM element.
     */
    separator?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the minute picker's DOM element.
     */
    minutePicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the minute's DOM element.
     */
    minute?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the second picker's DOM element.
     */
    secondPicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the second's DOM element.
     */
    second?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the ampm picker's DOM element.
     */
    ampmPicker?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the ampm's DOM element.
     */
    ampm?: CalendarPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the buttonbar's DOM element.
     */
    buttonbar?: CalendarPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the Button component.
     * @see {@link CalendarPassThroughType}
     */
    todayButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the Button component.
     * @see {@link CalendarPassThroughType}
     */
    clearButton?: CalendarPassThroughType<React.HTMLAttributes<HTMLButtonElement>>;
    /**
     * Uses to pass attributes to the select's DOM element.
     */
    select?: CalendarPassThroughType<React.HTMLAttributes<HTMLSelectElement>>;
    /**
     * Uses to pass attributes to the option's DOM element.
     */
    option?: CalendarPassThroughType<React.HTMLAttributes<HTMLOptionElement>>;
    /**
     * Used to manage all lifecycle hooks
     * @see {@link ComponentHooks}
     */
    hooks?: ComponentHooks;
    /**
     * Used to control React Transition API.
     */
    transition?: CalendarPassThroughTransitionType;
}

/**
 * Defines current inline state in Calendar component.
 */
export interface CalendarState {
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current overlay visible state as a boolean.
     * @defaultValue false
     */
    overlayVisible: boolean;
    /**
     * Current viewDate state.
     */
    viewDate: Nullable<Date>;
}

/**
 * Defines current options in Calendar component.
 */
export interface CalendarContext {
    /**
     * Current date.
     */
    date: string | Date | string[] | Date[] | undefined | null;
    /**
     * Current today state of the calendar's day.
     * @defaultValue false
     */
    today: boolean;
    /**
     * Current other month state of the calendar's day.
     */
    otherMonth: boolean;
    /**
     * Current selected state of the calendar's day or month or year.
     * @defaultValue false
     */
    selected: boolean;
    /**
     * Current disabled state of the calendar's day or month or year.
     * @defaultValue false
     */
    disabled: boolean;
    /**
     * Current month state.
     */
    month: CalendarMonthOptions;
    /**
     * Current month index state.
     */
    monthIndex: number;
    /**
     * Current year state.
     */
    year: CalendarYearOptions;
    /**
     * Current year index state.
     */
    yearIndex: number;
}

/**
 * Defines cuurent month options.
 */
export interface CalendarMonthOptions {
    /**
     * Month value.
     */
    value: string;
    /**
     * Selectable state of the month.
     */
    selectable: boolean;
}

/**
 * Defines current year options.
 */
export interface CalendarYearOptions {
    /**
     * Year value.
     */
    value: number;
    /**
     * Selectable state of the month.
     */
    selectable: boolean;
}

/**
 * Custom month change event.
 * @see {@link CalendarProps.onMonthChange}
 * @event
 */
interface CalendarMonthChangeEvent {
    /**
     * The number of month
     */
    month: number;
    /**
     * The number of year
     */
    year: number;
}

/**
 * Custom view change event
 * @see {@link CalendarProps.onViewDateChange}
 * @event
 */
interface CalendarViewChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New date
     */
    value: Date;
}

/**
 * Custom Select event
 * @see {@link CalendarProps.onSelect}
 */
interface CalendarSelectEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected date
     */
    value: Nullable<Date | Date[] | string>;
}

/**
 * Custom date template event
 * @see {@link CalendarProps.dateTemplate}
 * @event
 */
interface CalendarDateTemplateEvent {
    /**
     * Current day
     */
    day: number;
    /**
     * Current month
     */
    month: number;
    /**
     * Current year
     */
    year: number;
    /**
     * Whether the date belongs to the other month
     */
    otherMonth: boolean;
    /**
     * Whether the day is today
     */
    today: boolean;
    /**
     * Whether the date is selectable
     */
    selectable: boolean;
}

/**
 * Custom visible change event
 * @see {@link CalendarProps.onVisibleChange}
 * @event
 */
interface CalendarVisibleChangeEvent {
    /**
     * Whether the overlay is opened.
     */
    visible: boolean;
    /**
     * The type of visible action when the overlay is visible/hidden.
     */
    type: 'outside' | 'dateselect' | undefined | null;
    /**
     *  Used to refocus the input field in some cases when the overlay is hidden.
     */
    callback?(): void;
}

/**
 * Custom common navigator template event
 * @hidden
 */
interface CalendarNavigatorTemplateEvent {
    /**
     * Navigator change callback
     * @param {React.SyntheticEvent} event - Browser event
     * @param {string | number | null} [value] - The value of current navigator
     */
    onChange(event: React.SyntheticEvent, value?: string | number | undefined | null): void;
    /**
     * Style class of the navigator.
     */
    className: string;
    /**
     * The value of the current navigator
     */
    value: string | number | undefined | null;
    /**
     * The names of the current navigator
     */
    names: any[];
    /**
     * The options of the current navigator
     */
    options: any[];
    /**
     * The default navigator component
     */
    element: React.ReactNode;
    /**
     * The props of Calendar component
     */
    props: CalendarProps;
}

/**
 * Custom month navigator template event
 * @see {@link CalendarProps.monthNavigatorTemplate}
 * @extends {CalendarNavigatorTemplateEvent}
 * @event
 */
interface CalendarMonthNavigatorTemplateEvent extends CalendarNavigatorTemplateEvent {}

/**
 * Custom year navigator template event
 * @see {@link CalendarProps.yearNavigatorTemplate}
 * @extends {CalendarNavigatorTemplateEvent}
 * @event
 */
interface CalendarYearNavigatorTemplateEvent extends CalendarNavigatorTemplateEvent {}

/**
 * Defines valid base properties in Calendar component.
 */
interface CalendarBaseProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null | (() => HTMLElement);
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @defaultValue false
     */
    autoFocus?: boolean | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * ARIA label for screenreader support.
     */
    ariaLabel?: string | undefined;
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Style class of the clear button.
     * @defaultValue p-secondary-button
     */
    clearButtonClassName?: string | undefined;
    /**
     * Format of the date.
     * @defaultValue mm/dd/yy
     */
    dateFormat?: string | undefined;
    /**
     * Icon to show in each of the decrement buttons.
     */
    decrementIcon?: IconType<CalendarProps> | undefined;
    /**
     * When present, it specifies that the component should have invalid state style.
     * @defaultValue false
     */
    invalid?: boolean | undefined;
    /**
     * When specified, disables the component.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @defaultValue outlined
     */
    variant?: 'outlined' | 'filled' | undefined;
    /**
     * Array with dates to disable.
     */
    disabledDates?: Date[] | undefined;
    /**
     * Array with disabled weekday numbers.
     */
    disabledDays?: number[] | undefined;
    /**
     * Array with dates to enable (all other dates will be disabled).
     */
    enabledDates?: Date[] | undefined;
    /**
     * Whether to hide the overlay on date selection when showTime is enabled.
     * @defaultValue false
     */
    hideOnDateTimeSelect?: boolean | undefined;
    /**
     * Whether to hide the overlay on date selection is completed when selectionMode is range.
     */
    hideOnRangeSelection?: boolean | undefined;
    /**
     * Specifies 12 or 24 hour format.
     * @defaultValue 24
     */
    hourFormat?: '12' | '24' | undefined;
    /**
     * Icon of the calendar button.
     */
    icon?: IconType<CalendarProps> | undefined;
    /**
     * Icon position of the calendar button.
     * @defaultValue right
     */
    iconPos?: 'left' | 'right' | undefined;
    /**
     * Icon to show in each of the increment buttons.
     */
    incrementIcon?: IconType<CalendarProps> | undefined;
    /**
     * When enabled, displays the calendar as inline instead of an overlay.
     * @defaultValue false
     */
    inline?: boolean | undefined;
    /**
     * Style class of the input element.
     */
    inputClassName?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Keep invalid value when input blur.
     * @defaultValue false
     */
    keepInvalid?: boolean | undefined;
    /**
     * Used to display the values ​​of the locale object defined in the Locale API.
     * @defaultValue en
     */
    locale?: string | undefined;
    /**
     * Mask pattern for input element.
     */
    mask?: string | undefined;
    /**
     * Placeholder character in mask.
     * @defaultValue _
     */
    maskSlotChar?: string | undefined;
    /**
     * The maximum selectable date.
     */
    maxDate?: Date | undefined;
    /**
     * Maximum number of selectable dates in multiple mode.
     */
    maxDateCount?: number | undefined;
    /**
     * The minimum selectable date.
     */
    minDate?: Date | undefined;
    /**
     * Whether the month should be rendered as a dropdown instead of text.
     * @defaultValue false
     */
    monthNavigator?: boolean | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Icon to show in the next button.
     */
    nextIcon?: IconType<CalendarProps> | undefined;
    /**
     * Number of months to display.
     * @defaultValue 1
     */
    numberOfMonths?: number | undefined;
    /**
     * Style class of the datetimepicker panel.
     */
    panelClassName?: string | undefined;
    /**
     * Inline style of the datetimepicker panel.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Placeholder text for the input.
     */
    placeholder?: string | undefined;
    /**
     * Icon to show in the previous button.
     */
    prevIcon?: IconType<CalendarProps> | undefined;
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @defaultValue false
     */
    readOnlyInput?: boolean | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @defaultValue false
     */
    selectOtherMonths?: boolean | undefined;
    /**
     * The cutoff year for determining the century for a date.
     * @defaultValue +10
     */
    shortYearCutoff?: string | undefined;
    /**
     * Whether to display today and clear buttons at the footer
     * @defaultValue false
     */
    showButtonBar?: boolean | undefined;
    /**
     * When enabled, displays a button with icon next to input.
     * @defaultValue false
     */
    showIcon?: boolean | undefined;
    /**
     * Whether to show the milliseconds in time picker.
     * @defaultValue false
     */
    showMillisec?: boolean | undefined;
    /**
     * Whether to allow navigation past min/max dates.
     * @defaultValue false
     */
    showMinMaxRange?: boolean | undefined;
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @defaultValue true
     */
    showOnFocus?: boolean | undefined;
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @defaultValue true
     */
    showOtherMonths?: boolean | undefined;
    /**
     * Whether to show the seconds in time picker.
     * @defaultValue false
     */
    showSeconds?: boolean | undefined;
    /**
     * Whether to display timepicker.
     * @defaultValue false
     */
    showTime?: boolean | undefined;
    /**
     * When enabled, calendar will show week numbers.
     * @defaultValue false
     */
    showWeek?: boolean | undefined;
    /**
     * Hours to change per step.
     * @defaultValue 1
     */
    stepHour?: number | undefined;
    /**
     * Milliseconds to change per step.
     * @defaultValue 1
     */
    stepMillisec?: number | undefined;
    /**
     * Minutes to change per step.
     * @defaultValue 1
     */
    stepMinute?: number | undefined;
    /**
     * Seconds to change per step.
     * @defaultValue 1
     */
    stepSecond?: number | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Whether to display timepicker only.
     * @defaultValue false
     */
    timeOnly?: boolean | undefined;
    /**
     * Style class of the today button.
     * @defaultValue p-secondary-button
     */
    todayButtonClassName?: string | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * When enabled, calendar overlay is displayed as optimized for touch devices.
     * @defaultValue false
     */
    touchUI?: boolean | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Type of view to display.
     * @defaultValue date
     */
    view?: 'date' | 'month' | 'year' | undefined;
    /**
     * Date instance whose month and year are used to display the calendar.
     */
    viewDate?: Nullable<Date>;
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Whether the year should be rendered as a dropdown instead of text.
     * @defaultValue false
     */
    yearNavigator?: boolean | undefined;
    /**
     * The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020).
     */
    yearRange?: string | undefined;
    /**
     * Function for overriding default behavior that formats a Date to the string representation.
     * @param {Date} date - Formating date
     * @return {string} Formatted date
     */
    formatDateTime?(date: Date): string;
    /**
     * Function for overriding default behavior that parses text into the Date.
     * @param {string} text - Parsing date
     * @return {Date} Parsed date
     */
    parseDateTime?(text: string): Date;
    /**
     * Function that gets a date information and returns the cell content in datepicker.
     * @param {CalendarDateTemplateEvent} event - Custom date template event
     * @return {React.ReactNode}
     */
    dateTemplate?(event: CalendarDateTemplateEvent): React.ReactNode;
    /**
     * Function that gets a navigator information and returns the decade selections in the panel.
     * @param {number[]} yearValues - The values of years
     * @return {React.ReactNode}
     */
    decadeTemplate?(yearValues: number[]): React.ReactNode;
    /**
     * Custom footer template of overlay.
     * @return {React.ReactNode}
     */
    footerTemplate?(): React.ReactNode;
    /**
     * Custom header template of overlay.
     * @return {React.ReactNode}
     */
    headerTemplate?(): React.ReactNode;
    /**
     * Function that gets a navigator information and returns the navigator element in header.
     * @param {CalendarMonthNavigatorTemplateEvent} event - Custom month navigator template event.
     * @return {React.ReactNode}
     */
    monthNavigatorTemplate?(event: CalendarMonthNavigatorTemplateEvent): React.ReactNode;
    /**
     * Callback to invoke on blur event of input field.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when clear button is clicked.
     * @param {React.MouseEvent<HTMLButtonElement>} event - Browser event
     */
    onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    /**
     * Callback to invoke on focus event of input field.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when overlay panel or modal becomes hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke on input event of input field.
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     */
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when month changes.
     * @param {CalendarMonthChangeEvent} event - Custom month change event
     */
    onMonthChange?(event: CalendarMonthChangeEvent): void;
    /**
     * Callback to invoke when a date is selected.
     * @param {CalendarSelectEvent} event - Custom select event
     */
    onSelect?(event: CalendarSelectEvent): void;
    /**
     * Callback to invoke when overlay panel or modal becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when today button is clicked.
     * @param {React.MouseEvent<HTMLButtonElement>} event - Browser event
     */
    onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    /**
     * Callback to invoke when the displayed month/year is changed.
     * @param {CalendarViewChangeEvent} event - Custom view change event
     */
    onViewDateChange?(event: CalendarViewChangeEvent): void;
    /**
     * Callback to invoke when visible is changed.
     * @param {CalendarVisibleChangeEvent} event - Custom visible change event
     */
    onVisibleChange?(event: CalendarVisibleChangeEvent): void;
    /**
     * Function that gets a navigator information and returns the navigator in header.
     * @param {CalendarYearNavigatorTemplateEvent} event - Custom year navigator template event
     */
    yearNavigatorTemplate?(event: CalendarYearNavigatorTemplateEvent): React.ReactNode;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {CalendarPassThroughOptions}
     */
    pt?: CalendarPassThroughOptions;
    /**
     * Used to configure passthrough(pt) options of the component.
     * @type {PassThroughOptions}
     */
    ptOptions?: PassThroughOptions;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}
/**
 * Defines valid properties in single Calendar component.
 * @group Properties
 */
interface CalendarPropsSingle extends CalendarBaseProps {
    /**
     * Specifies the selection mode either "single", "range", or "multiple";
     * @defaultValue single
     */
    selectionMode?: 'single' | undefined;
    /**
     * Value of the component.
     * @defaultValue null
     */
    value?: Nullable<Date>;
    /**
     * Callback to invoke when value changes.
     * @param { FormEvent<Date>} event - Custom change event
     */
    onChange?(event: FormEvent<Date>): void;
}
/**
 * Defines valid properties in range Calendar component.
 * @group Properties
 */
interface CalendarPropsRange extends CalendarBaseProps {
    /**
     * Specifies the selection mode either "single", "range", or "multiple";
     * @defaultValue single
     */
    selectionMode: 'range';
    /**
     * Value of the component.
     * @defaultValue null
     */
    value?: Nullable<(Date | null)[]>;
    /**
     * Callback to invoke when value changes.
     * @param { FormEvent<(Date | null)[]>} event - Custom change event
     */
    onChange?(event: FormEvent<(Date | null)[]>): void;
}

/**
 * Defines valid properties in multiple Calendar component.
 * @group Properties
 */
interface CalendarPropsMultiple extends CalendarBaseProps {
    /**
     * Specifies the selection mode either "single", "range", or "multiple";
     * @defaultValue single
     */
    selectionMode: 'multiple';
    /**
     * Value of the component.
     * @defaultValue null
     */
    value?: Nullable<Date[]>;
    /**
     * Callback to invoke when value changes.
     * @param {FormEvent<Date[]>} event - Custom change event
     */
    onChange?(event: FormEvent<Date[]>): void;
}

/**
 * Defines valid properties in Calendar component.
 * @group Properties
 */
export type CalendarProps = CalendarPropsRange | CalendarPropsMultiple | CalendarPropsSingle;

/**
 * **PrimeReact - Calendar**
 *
 * _Calendar also known as DatePicker, is a form component to work with dates._
 *
 * [Live Demo](https://www.primereact.org/calendar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Calendar extends React.Component<CalendarProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get the current date.
     * @return {Date | Date[]} Current Date
     */
    public getCurrentDateTime(): Date | Date[];
    /**
     * Used to get the view date.
     * @return {Date | Date[]} View Date
     */
    public getViewDate(): Date | Date[];
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
    /**
     * Used to get overlay element.
     * @return {HTMLElement} Overlay element
     */
    public getOverlay(): HTMLElement;
    /**
     * Used to update the current view date.
     * @param {React.SyntheticEvent | null} event - Browser event.
     * @param {Date | Date[] | null} value - New date.
     */
    public updateViewDate(event: React.SyntheticEvent | null, value: Nullable<Date | Date[]>): void;
}
