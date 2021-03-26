import { Calendar } from './calendar';
import { ILPConfiguration } from './interfaces';
export declare class Litepicker extends Calendar {
    protected triggerElement: any;
    protected backdrop: any;
    protected preventClick: boolean;
    constructor(options: ILPConfiguration);
    protected scrollToDate(el: any): void;
    private bindEvents;
    private updateInput;
    private isSamePicker;
    private shouldShown;
    private shouldResetDatePicked;
    private shouldSwapDatePicked;
    private shouldCheckLockDays;
    private onClick;
    private showTooltip;
    private hideTooltip;
    private shouldAllowMouseEnter;
    private shouldAllowRepick;
    private isDayItem;
    private onMouseEnter;
    private onMouseLeave;
    private onInput;
}
