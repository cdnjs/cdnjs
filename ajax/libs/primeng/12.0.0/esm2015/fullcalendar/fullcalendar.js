import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class FullCalendar {
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
export class FullCalendarModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2Z1bGxjYWxlbmRhci9mdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQXNCLEtBQUssRUFBeUIsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0ksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBUTVDLE1BQU0sT0FBTyxZQUFZO0lBZ0JyQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFHLENBQUM7SUFFckMsUUFBUTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztTQUNKO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsSUFBYSxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBRUQsSUFBYSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDOUM7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7O3lHQXRGUSxZQUFZOzZGQUFaLFlBQVksa0pBSlgsb0RBQW9EOzJGQUlyRCxZQUFZO2tCQU54QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxvREFBb0Q7b0JBQzlELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7aUdBR1ksS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBZ0NPLE1BQU07c0JBQWxCLEtBQUs7Z0JBYU8sT0FBTztzQkFBbkIsS0FBSzs7QUE2Q1YsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQTlGbEIsWUFBWSxhQTBGWCxZQUFZLGFBMUZiLFlBQVk7Z0hBOEZaLGtCQUFrQixZQUpsQixDQUFDLFlBQVksQ0FBQzsyRkFJZCxrQkFBa0I7a0JBTDlCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPbkluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NhbGVuZGFyfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZnVsbENhbGVuZGFyJyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPjwvZGl2PicsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksT25Jbml0LEFmdGVyVmlld0NoZWNrZWQge1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgICAgICAgICAgIFxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgICAgICAgICAgXG4gICAgY2FsZW5kYXI6IGFueTtcbiAgICBcbiAgICBjb25maWc6IGFueTtcblxuICAgIF9vcHRpb25zOiBhbnk7XG5cbiAgICBfZXZlbnRzOiBhbnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICB0aGVtZTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbcHJvcF0gPSB0aGlzLm9wdGlvbnNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGV2ZW50cygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIHNldCBldmVudHModmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fZXZlbnRzICYmIHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIucmVtb3ZlQWxsRXZlbnRTb3VyY2VzKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuX2V2ZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXQgb3B0aW9ucyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyAmJiB0aGlzLmNhbGVuZGFyKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPSB0aGlzLl9vcHRpb25zW3Byb3BdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW3Byb3BdID0gb3B0aW9uVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5zZXRPcHRpb24ocHJvcCwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG5ldyBDYWxlbmRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5ldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIucmVtb3ZlQWxsRXZlbnRTb3VyY2VzKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENhbGVuZGFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhcjtcbiAgICB9XG4gICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtGdWxsQ2FsZW5kYXJdLFxuICAgIGRlY2xhcmF0aW9uczogW0Z1bGxDYWxlbmRhcl1cbn0pXG5leHBvcnQgY2xhc3MgRnVsbENhbGVuZGFyTW9kdWxlIHsgfVxuIl19