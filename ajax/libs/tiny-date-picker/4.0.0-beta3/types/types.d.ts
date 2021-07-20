export interface TinyDatePickerLanguageOptions {
    /**
     * The days of the week. ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
     */
    days: string[];
    /**
     * The months of the year. ['January', ... 'December']
     */
    months: string[];
    /**
     * The apply button text, if time picker is enabled. If this is set to
     * the empty string, the apply button will not be rendered in the time
     * picker footer.
     */
    applyText: string;
}
export interface TinyDatePickerOptions {
    /**
     * The input associated with the picker.
     */
    input?: HTMLInputElement;
    /**
     * The time format, if in time picker mode.
     */
    timeFormat: 24 | 12;
    /**
     * Indicates whether or not to allow time picking.
     */
    pickTime?: boolean;
    /**
     * The dom element the date picker will be added to. This defaults
     * to document.body
     */
    appendTo: Element;
    /**
     * Customize the text that is displayed in the calender. Use this to
     * display a different language or verbiage.
     */
    lang: TinyDatePickerLanguageOptions;
    /**
     * Customize the text representation of dates / times that will be output
     * by the date picker.
     * @param date the date to be formatted
     */
    format(date: Date): string;
    /**
     * The inverse of the format option above. If you specify one, you should
     * specify the other. This parses the string produced by format and returns
     * a date.
     * @param s
     */
    parse(s: string): Date | undefined;
    /**
     * The date that will be highlighted when the date picker is displayed and the associated
     * input (if any) has no value.
     */
    highlightedDate: Date;
    /**
     * The minimum date that can be selected (inclusive). All earlier dates will be disabled.
     */
    min?: Date;
    /**
     * The maximum date that can be selected (inclusive). All later dates will be disabled.
     */
    max?: Date;
    /**
     * Determine whether or not a date should be disabled in the date picker.
     * @param dt the date being evaluated.
     */
    inRange(dt: Date): boolean;
    /**
     * Get the CSS class associated with a date in the picker.
     * e.g. dt.getFullYear() % 2 ? 'odd-date' : 'even-date'
     * @param dt
     */
    dateClass(dt: Date): string;
    /**
     * Specifies which date of the week is considered the first. By default, this is 0 (Sunday).
     * Set it to 1 for Monday, 2 for Tuesday, etc.
     */
    dayOffset: number;
}
//# sourceMappingURL=types.d.ts.map