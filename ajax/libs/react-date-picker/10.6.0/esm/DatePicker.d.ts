import React from 'react';
import makeEventProps from 'make-event-props';
import Calendar from 'react-calendar';
import type { ReactNodeArray } from 'prop-types';
import type { ClassName, CloseReason, Detail, LooseValue, OpenReason, Value } from './shared/types.js';
type Icon = React.ReactElement | ReactNodeArray | null | string | number | boolean;
type IconOrRenderFunction = Icon | React.ComponentType | React.ReactElement;
type CalendarProps = Omit<React.ComponentPropsWithoutRef<typeof Calendar>, 'className' | 'maxDetail' | 'onChange'>;
type EventProps = ReturnType<typeof makeEventProps>;
export type DatePickerProps = {
    /**
     * Automatically focuses the input on mount.
     *
     * @example true
     */
    autoFocus?: boolean;
    /**
     * `aria-label` for the calendar button.
     *
     * @example 'Toggle calendar'
     */
    calendarAriaLabel?: string;
    /**
     * Class name(s) that will be added along with `"react-calendar"` to the main React-Calendar `<div>` element.
     *
     * @example 'class1 class2'
     * @example ['class1', 'class2 class3']
     */
    calendarClassName?: ClassName;
    /**
     * Content of the calendar button. Setting the value explicitly to `null` will hide the icon.
     *
     * @example 'Calendar'
     * @example <CalendarIcon />
     * @example CalendarIcon
     */
    calendarIcon?: IconOrRenderFunction | null;
    /**
     * Class name(s) that will be added along with `"react-date-picker"` to the main React-Date-Picker `<div>` element.
     *
     * @example 'class1 class2'
     * @example ['class1', 'class2 class3']
     */
    className?: ClassName;
    /**
     * `aria-label` for the clear button.
     *
     * @example 'Clear value'
     */
    clearAriaLabel?: string;
    /**
     * Content of the clear button. Setting the value explicitly to `null` will hide the icon.
     *
     * @example 'Clear'
     * @example <ClearIcon />
     * @example ClearIcon
     */
    clearIcon?: IconOrRenderFunction | null;
    /**
     * Whether to close the calendar on value selection.
     *
     * **Note**: It's recommended to use `shouldCloseCalendar` function instead.
     *
     * @default true
     * @example false
     */
    closeCalendar?: boolean;
    /**
     * `data-testid` attribute for the main React-Date-Picker `<div>` element.
     *
     * @example 'date-picker'
     */
    'data-testid'?: string;
    /**
     * `aria-label` for the day input.
     *
     * @example 'Day'
     */
    dayAriaLabel?: string;
    /**
     * `placeholder` for the day input.
     *
     * @default '--'
     * @example 'dd'
     */
    dayPlaceholder?: string;
    /**
     * When set to `true`, will remove the calendar and the button toggling its visibility.
     *
     * @default false
     * @example true
     */
    disableCalendar?: boolean;
    /**
     * Whether the date picker should be disabled.
     *
     * @default false
     * @example true
     */
    disabled?: boolean;
    /**
     * Input format based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). Supported values are: `y`, `M`, `MM`, `MMM`, `MMMM`, `d`, `dd`.
     *
     * **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
     *
     * @example 'y-MM-dd'
     */
    format?: string;
    /**
     * `id` attribute for the main React-Date-Picker `<div>` element.
     *
     * @example 'date-picker'
     */
    id?: string;
    /**
     * Whether the calendar should be opened.
     *
     * @default false
     * @example true
     */
    isOpen?: boolean;
    /**
     * Locale that should be used by the date picker and the calendar. Can be any [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag).
     *
     * **Note**: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client.
     *
     * @example 'hu-HU'
     */
    locale?: string;
    /**
     * Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although React-Date-Picker will ensure that no later date is selected.
     *
     * @example new Date()
     */
    maxDate?: Date;
    /**
     * The most detailed calendar view that the user shall see. View defined here also becomes the one on which clicking an item in the calendar will select a date and pass it to onChange. Can be `"month"`, `"year"`, `"decade"` or `"century"`.
     *
     * @default 'month'
     * @example 'year'
     */
    maxDetail?: Detail;
    /**
     * Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-Date-Picker will ensure that no earlier date is selected.
     *
     * @example new Date()
     */
    minDate?: Date;
    /**
     * `aria-label` for the month input.
     *
     * @example 'Month'
     */
    monthAriaLabel?: string;
    /**
     * `placeholder` for the month input.
     *
     * @default '--'
     * @example 'mm'
     */
    monthPlaceholder?: string;
    /**
     * Input name.
     *
     * @default 'date'
     */
    name?: string;
    /**
     * `aria-label` for the native date input.
     *
     * @example 'Date'
     */
    nativeInputAriaLabel?: string;
    /**
     * Function called when the calendar closes.
     *
     * @example () => alert('Calendar closed')
     */
    onCalendarClose?: () => void;
    /**
     * Function called when the calendar opens.
     *
     * @example () => alert('Calendar opened')
     */
    onCalendarOpen?: () => void;
    /**
     * Function called when the user picks a valid date. If any of the fields were excluded using custom `format`, `new Date(y, 0, 1, 0, 0, 0)`, where `y` is the current year, is going to serve as a "base".
     *
     * @example (value) => alert('New date is: ', value)
     */
    onChange?: (value: Value) => void;
    /**
     * Function called when the user focuses an input.
     *
     * @example (event) => alert('Focused input: ', event.target.name)
     */
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * Function called when the user picks an invalid date.
     *
     * @example () => alert('Invalid date')
     */
    onInvalidChange?: () => void;
    /**
     * Whether to open the calendar on input focus. **Note**: It's recommended to use `shouldOpenCalendar` function instead.
     *
     * @default true
     * @example false
     */
    openCalendarOnFocus?: boolean;
    /**
     * Element to render the calendar in using portal.
     *
     * @example document.getElementById('my-div')
     */
    portalContainer?: HTMLElement | null;
    /**
     * Whether date input should be required.
     *
     * @default false
     * @example true
     */
    required?: boolean;
    /**
     * Which dates shall be passed by the calendar to the onChange function and onClick{Period} functions. Can be `"start"`, `"end"` or `"range"`. The latter will cause an array with start and end values to be passed.
     *
     * @default 'start'
     * @example 'range'
     */
    returnValue?: 'start' | 'end' | 'range';
    /**
     * Function called before the calendar closes. `reason` can be `"buttonClick"`, `"escape"`, `"outsideAction"`, or `"select"`. If it returns `false`, the calendar will not close.
     *
     * @example ({ reason }) => reason !== 'outsideAction'
     */
    shouldCloseCalendar?: (props: {
        reason: CloseReason;
    }) => boolean;
    /**
     * Function called before the calendar opens. `reason` can be `"buttonClick"` or `"focus"`. If it returns `false`, the calendar will not open.
     *
     * @example ({ reason }) => reason !== 'focus'
     */
    shouldOpenCalendar?: (props: {
        reason: OpenReason;
    }) => boolean;
    /**
     * Whether leading zeros should be rendered in date inputs.
     *
     * @default false
     * @example true
     */
    showLeadingZeros?: boolean;
    /**
     * Input value. Note that if you pass an array of values, only first value will be fully utilized.
     *
     * @example new Date(2017, 0, 1)
     * @example [new Date(2017, 0, 1), new Date(2017, 7, 1)]
     * @example ['2017-01-01', '2017-08-01']
     */
    value?: LooseValue;
    /**
     * `aria-label` for the year input.
     *
     * @example 'Year'
     */
    yearAriaLabel?: string;
    /**
     * `placeholder` for the year input.
     *
     * @default '----'
     * @example 'yyyy'
     */
    yearPlaceholder?: string;
} & CalendarProps & Omit<EventProps, 'onChange' | 'onFocus'>;
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
