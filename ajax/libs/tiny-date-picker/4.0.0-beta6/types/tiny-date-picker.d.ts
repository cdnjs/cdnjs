import { TinyDatePickerOptions } from './types';
export declare class TinyDatePicker {
    opts: TinyDatePickerOptions;
    currentDate: Date;
    selectedDate?: Date;
    root: HTMLElement;
    constructor(opts: TinyDatePickerOptions);
    private redraw;
    setOpts(opts: TinyDatePickerOptions): void;
    submenu(el?: Element): void;
    goto(date: Date): void;
    setSelectedDate(date?: Date): void;
    apply(date?: Date): void;
}
//# sourceMappingURL=tiny-date-picker.d.ts.map