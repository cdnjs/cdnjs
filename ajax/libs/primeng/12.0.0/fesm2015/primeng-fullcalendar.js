import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';

class FullCalendar {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        this.config = {
            theme: true
        };
        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        if (this._options && this.calendar) {
            for (let prop in this._options) {
                let optionValue = this._options[prop];
                this.config[prop] = optionValue;
                this.calendar.setOption(prop, optionValue);
            }
        }
    }
    initialize() {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    }
    getCalendar() {
        return this.calendar;
    }
    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }
    }
}
FullCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendar, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
FullCalendar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: FullCalendar, selector: "p-fullCalendar", inputs: { style: "style", styleClass: "styleClass", events: "events", options: "options" }, ngImport: i0, template: '<div [ngStyle]="style" [class]="styleClass"></div>', isInline: true, directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendar, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-fullCalendar',
                    template: '<div [ngStyle]="style" [class]="styleClass"></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], events: [{
                type: Input
            }], options: [{
                type: Input
            }] } });
class FullCalendarModule {
}
FullCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FullCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendarModule, declarations: [FullCalendar], imports: [CommonModule], exports: [FullCalendar] });
FullCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: FullCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [FullCalendar],
                    declarations: [FullCalendar]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FullCalendar, FullCalendarModule };
//# sourceMappingURL=primeng-fullcalendar.js.map
