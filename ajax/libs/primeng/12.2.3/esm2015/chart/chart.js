import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import * as i0 from "@angular/core";
export class UIChart {
    constructor(el) {
        this.el = el;
        this.plugins = [];
        this.responsive = true;
        this.onDataSelect = new EventEmitter();
        this._options = {};
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
        this.reinit();
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        this.reinit();
    }
    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }
    onCanvasClick(event) {
        if (this.chart) {
            const element = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
            const dataset = this.chart.getElementsAtEventForMode(event, 'dataset', { intersect: true }, false);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }
    initChart() {
        let opts = this.options || {};
        opts.responsive = this.responsive;
        // allows chart to resize in responsive mode
        if (opts.responsive && (this.height || this.width)) {
            opts.maintainAspectRatio = false;
        }
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options,
            plugins: this.plugins
        });
    }
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    getBase64Image() {
        return this.chart.toBase64Image();
    }
    generateLegend() {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    }
    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }
    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
}
UIChart.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: UIChart, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
UIChart.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: UIChart, selector: "p-chart", inputs: { type: "type", plugins: "plugins", width: "width", height: "height", responsive: "responsive", data: "data", options: "options" }, outputs: { onDataSelect: "onDataSelect" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: UIChart, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-chart',
                    template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        'class': 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { type: [{
                type: Input
            }], plugins: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], responsive: [{
                type: Input
            }], onDataSelect: [{
                type: Output
            }], data: [{
                type: Input
            }], options: [{
                type: Input
            }] } });
export class ChartModule {
}
ChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChartModule, declarations: [UIChart], imports: [CommonModule], exports: [UIChart] });
ChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChartModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0, type: ChartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [UIChart],
                    declarations: [UIChart]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2hhcnQvY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQW9DLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEtBQUssTUFBTSxlQUFlLENBQUM7O0FBZWxDLE1BQU0sT0FBTyxPQUFPO0lBc0JoQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWxCeEIsWUFBTyxHQUFVLEVBQUUsQ0FBQztRQU1wQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNL0QsYUFBUSxHQUFRLEVBQUUsQ0FBQztJQUlpQixDQUFDO0lBRXJDLElBQWEsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsR0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBYSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBTztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixD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QUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsV0FBVztxQkFDdkI7aUJBQ0o7aUdBR1ksSUFBSTtzQkFBWixLQUFLO2dCQUVHLE9BQU87c0JBQWYsS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTTtnQkFZTSxJQUFJO3NCQUFoQixLQUFLO2dCQVNPLE9BQU87c0JBQW5CLEtBQUs7O0FBbUZWLE1BQU0sT0FBTyxXQUFXOzt3R0FBWCxXQUFXO3lHQUFYLFdBQVcsaUJBcEhYLE9BQU8sYUFnSE4sWUFBWSxhQWhIYixPQUFPO3lHQW9IUCxXQUFXLFlBSlgsQ0FBQyxZQUFZLENBQUM7MkZBSWQsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgQ2hhcnQgZnJvbSAnY2hhcnQuanMvYXV0byc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jaGFydCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlXCIgW3N0eWxlLndpZHRoXT1cInJlc3BvbnNpdmUgJiYgIXdpZHRoID8gbnVsbCA6IHdpZHRoXCIgW3N0eWxlLmhlaWdodF09XCJyZXNwb25zaXZlICYmICFoZWlnaHQgPyBudWxsIDogaGVpZ2h0XCI+XG4gICAgICAgICAgICA8Y2FudmFzIFthdHRyLndpZHRoXT1cInJlc3BvbnNpdmUgJiYgIXdpZHRoID8gbnVsbCA6IHdpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cInJlc3BvbnNpdmUgJiYgIWhlaWdodCA/IG51bGwgOiBoZWlnaHRcIiAoY2xpY2spPVwib25DYW52YXNDbGljaygkZXZlbnQpXCI+PC9jYW52YXM+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBVSUNoYXJ0IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBsdWdpbnM6IGFueVtdID0gW107XG5cbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBPdXRwdXQoKSBvbkRhdGFTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBfZGF0YTogYW55O1xuXG4gICAgX29wdGlvbnM6IGFueSA9IHt9O1xuXG4gICAgY2hhcnQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIEBJbnB1dCgpIGdldCBkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbDphbnkpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcbiAgICAgICAgdGhpcy5yZWluaXQoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXQgb3B0aW9ucyh2YWw6YW55KSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWw7XG4gICAgICAgIHRoaXMucmVpbml0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRDaGFydCgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkNhbnZhc0NsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5jaGFydC5nZXRFbGVtZW50c0F0RXZlbnRGb3JNb2RlKGV2ZW50LCAnbmVhcmVzdCcsIHsgaW50ZXJzZWN0OiB0cnVlIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFzZXQgPSB0aGlzLmNoYXJ0LmdldEVsZW1lbnRzQXRFdmVudEZvck1vZGUoZXZlbnQsICdkYXRhc2V0JywgeyBpbnRlcnNlY3Q6IHRydWUgfSwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50WzBdICYmIGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZWxlbWVudDogZWxlbWVudFswXSwgZGF0YXNldDogZGF0YXNldH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdENoYXJ0KCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0aW9uc3x8e307XG4gICAgICAgIG9wdHMucmVzcG9uc2l2ZSA9IHRoaXMucmVzcG9uc2l2ZTtcblxuICAgICAgICAvLyBhbGxvd3MgY2hhcnQgdG8gcmVzaXplIGluIHJlc3BvbnNpdmUgbW9kZVxuICAgICAgICBpZiAob3B0cy5yZXNwb25zaXZlJiYodGhpcy5oZWlnaHR8fHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICBvcHRzLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLCB7XG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGdldEJhc2U2NEltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFydC50b0Jhc2U2NEltYWdlKCk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVMZWdlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1VJQ2hhcnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1VJQ2hhcnRdXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0TW9kdWxlIHsgfVxuIl19