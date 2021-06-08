import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class Splitter {
    constructor(cd, el) {
        this.cd = cd;
        this.el = el;
        this.stateStorage = "session";
        this.stateKey = null;
        this.layout = "horizontal";
        this.gutterSize = 4;
        this.panelSizes = [];
        this.minSizes = [];
        this.onResizeEnd = new EventEmitter();
        this.nested = false;
        this.panels = [];
        this.dragging = false;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
        this.touchMoveListener = null;
        this.touchEndListener = null;
        this.size = null;
        this.gutterElement = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.nextPanelSize = null;
        this.prevPanelSize = null;
        this._panelSizes = null;
        this.prevPanelIndex = null;
    }
    ngOnInit() {
        this.nested = this.isNested();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'panel':
                    this.panels.push(item.template);
                    break;
                default:
                    this.panels.push(item.template);
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.panels && this.panels.length) {
            let initialized = false;
            if (this.isStateful()) {
                initialized = this.restoreState();
            }
            if (!initialized) {
                let children = [...this.el.nativeElement.children[0].children].filter(child => DomHandler.hasClass(child, 'p-splitter-panel'));
                let _panelSizes = [];
                this.panels.map((panel, i) => {
                    let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
                    let panelSize = panelInitialSize || (100 / this.panels.length);
                    _panelSizes[i] = panelSize;
                    children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
                });
                this._panelSizes = _panelSizes;
            }
        }
    }
    onResizeStart(event, index) {
        this.gutterElement = event.currentTarget;
        this.size = this.horizontal() ? DomHandler.getWidth(this.containerViewChild.nativeElement) : DomHandler.getHeight(this.containerViewChild.nativeElement);
        this.dragging = true;
        this.startPos = this.horizontal() ? (event.pageX || event.changedTouches[0].pageX) : (event.pageY || event.changedTouches[0].pageY);
        this.prevPanelElement = this.gutterElement.previousElementSibling;
        this.nextPanelElement = this.gutterElement.nextElementSibling;
        this.prevPanelSize = 100 * (this.horizontal() ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true)) / this.size;
        this.nextPanelSize = 100 * (this.horizontal() ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true)) / this.size;
        this.prevPanelIndex = index;
        DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.addClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
    }
    onResize(event) {
        let newPos;
        if (this.horizontal())
            newPos = ((event.pageX || event.changedTouches[0].pageX) * 100 / this.size) - (this.startPos * 100 / this.size);
        else
            newPos = ((event.pageY || event.changedTouches[0].pageY) * 100 / this.size) - (this.startPos * 100 / this.size);
        let newPrevPanelSize = this.prevPanelSize + newPos;
        let newNextPanelSize = this.nextPanelSize - newPos;
        if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
            this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
            this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
            this._panelSizes[this.prevPanelIndex] = newPrevPanelSize;
            this._panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
        }
    }
    resizeEnd(event) {
        if (this.isStateful()) {
            this.saveState();
        }
        this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
        DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'p-splitter-resizing');
        this.clear();
    }
    onGutterMouseDown(event, index) {
        this.onResizeStart(event, index);
        this.bindMouseListeners();
    }
    onGutterTouchStart(event, index) {
        if (event.cancelable) {
            this.onResizeStart(event, index);
            this.bindTouchListeners();
            event.preventDefault();
        }
    }
    onGutterTouchEnd(event) {
        this.resizeEnd(event);
        this.unbindTouchListeners();
        if (event.cancelable)
            event.preventDefault();
    }
    validateResize(newPrevPanelSize, newNextPanelSize) {
        if (this.minSizes.length >= 1 && this.minSizes[0] && this.minSizes[0] > newPrevPanelSize) {
            return false;
        }
        if (this.minSizes.length > 1 && this.minSizes[1] && this.minSizes[1] > newNextPanelSize) {
            return false;
        }
        return true;
    }
    bindMouseListeners() {
        if (!this.mouseMoveListener) {
            this.mouseMoveListener = event => this.onResize(event);
            document.addEventListener('mousemove', this.mouseMoveListener);
        }
        if (!this.mouseUpListener) {
            this.mouseUpListener = event => {
                this.resizeEnd(event);
                this.unbindMouseListeners();
            };
            document.addEventListener('mouseup', this.mouseUpListener);
        }
    }
    bindTouchListeners() {
        if (!this.touchMoveListener) {
            this.touchMoveListener = event => this.onResize(event);
            document.addEventListener('touchmove', this.touchMoveListener);
        }
        if (!this.touchEndListener) {
            this.touchEndListener = event => {
                this.resizeEnd(event);
                this.unbindTouchListeners();
            };
            document.addEventListener('touchend', this.touchEndListener);
        }
    }
    unbindMouseListeners() {
        if (this.mouseMoveListener) {
            document.removeEventListener('mousemove', this.mouseMoveListener);
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener) {
            document.removeEventListener('mouseup', this.mouseUpListener);
            this.mouseUpListener = null;
        }
    }
    unbindTouchListeners() {
        if (this.touchMoveListener) {
            document.removeEventListener('touchmove', this.touchMoveListener);
            this.touchMoveListener = null;
        }
        if (this.touchEndListener) {
            document.removeEventListener('touchend', this.touchEndListener);
            this.touchEndListener = null;
        }
    }
    clear() {
        this.dragging = false;
        this.size = null;
        this.startPos = null;
        this.prevPanelElement = null;
        this.nextPanelElement = null;
        this.prevPanelSize = null;
        this.nextPanelSize = null;
        this.gutterElement = null;
        this.prevPanelIndex = null;
    }
    isNested() {
        if (this.el.nativeElement) {
            let parent = this.el.nativeElement.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'p-splitter')) {
                parent = parent.parentElement;
            }
            return parent !== null;
        }
        else {
            return false;
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    getStorage() {
        switch (this.stateStorage) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
        }
    }
    saveState() {
        this.getStorage().setItem(this.stateKey, JSON.stringify(this._panelSizes));
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            this._panelSizes = JSON.parse(stateString);
            let children = [...this.containerViewChild.nativeElement.children].filter(child => DomHandler.hasClass(child, 'p-splitter-panel'));
            children.forEach((child, i) => {
                child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
            });
            return true;
        }
        return false;
    }
    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === "horizontal",
            'p-splitter-vertical': this.layout === "vertical"
        };
    }
    panelContainerClass() {
        return {
            'p-splitter-panel': true,
            'p-splitter-panel-nested': true
        };
    }
    gutterStyle() {
        if (this.horizontal())
            return { width: this.gutterSize + 'px' };
        else
            return { height: this.gutterSize + 'px' };
    }
    horizontal() {
        return this.layout === 'horizontal';
    }
}
Splitter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Splitter, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Splitter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: Splitter, selector: "p-splitter", inputs: { styleClass: "styleClass", panelStyleClass: "panelStyleClass", style: "style", panelStyle: "panelStyle", stateStorage: "stateStorage", stateKey: "stateKey", layout: "layout", gutterSize: "gutterSize", panelSizes: "panelSizes", minSizes: "minSizes" }, outputs: { onResizeEnd: "onResizeEnd" }, host: { properties: { "class.p-splitter-panel-nested": "nested" } }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== (panels.length - 1)" [ngStyle]="gutterStyle()" 
                    (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-splitter{display:flex;flex-wrap:nowrap}.p-splitter-vertical{flex-direction:column}.p-splitter-panel{flex-grow:1}.p-splitter-panel-nested{display:flex}.p-splitter-panel p-splitter{flex-grow:1}.p-splitter-panel .p-splitter{flex-grow:1;border:0}.p-splitter-gutter{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:col-resize}.p-splitter-horizontal.p-splitter-resizing{cursor:col-resize;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-splitter-horizontal>.p-splitter-gutter>.p-splitter-gutter-handle{height:24px;width:100%}.p-splitter-horizontal>.p-splitter-gutter{cursor:col-resize}.p-splitter-vertical.p-splitter-resizing{cursor:row-resize;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-splitter-vertical>.p-splitter-gutter{cursor:row-resize}.p-splitter-vertical>.p-splitter-gutter>.p-splitter-gutter-handle{width:24px;height:100%}"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: Splitter, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-splitter',
                    template: `
        <div #container [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-template ngFor let-panel let-i="index" [ngForOf]="panels">
                <div [ngClass]="panelContainerClass()" [class]="panelStyleClass" [ngStyle]="panelStyle">
                    <ng-container *ngTemplateOutlet="panel"></ng-container>
                </div>
                <div class="p-splitter-gutter" *ngIf="i !== (panels.length - 1)" [ngStyle]="gutterStyle()" 
                    (mousedown)="onGutterMouseDown($event, i)" (touchstart)="onGutterTouchStart($event, i)">
                    <div class="p-splitter-gutter-handle"></div>
                </div>
            </ng-template>
        </div>
    `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styleUrls: ['./splitter.css'],
                    host: {
                        '[class.p-splitter-panel-nested]': 'nested'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], layout: [{
                type: Input
            }], gutterSize: [{
                type: Input
            }], panelSizes: [{
                type: Input
            }], minSizes: [{
                type: Input
            }], onResizeEnd: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container', { static: false }]
            }] } });
export class SplitterModule {
}
SplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: SplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: SplitterModule, declarations: [Splitter], imports: [CommonModule], exports: [Splitter, SharedModule] });
SplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: SplitterModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: SplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Splitter, SharedModule],
                    declarations: [Splitter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXR0ZXIvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBeUQsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaE4sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQXdCMUQsTUFBTSxPQUFPLFFBQVE7SUE0RGpCLFlBQW1CLEVBQXFCLEVBQVUsRUFBYztRQUE3QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFsRHZELGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBRWpDLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsV0FBTSxHQUFXLFlBQVksQ0FBQztRQUU5QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFFMUIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUV2QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTlELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVosYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFekIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRXpCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUV4QixTQUFJLEdBQUcs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c0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zcGxpdHRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXBhbmVsIGxldC1pPVwiaW5kZXhcIiBbbmdGb3JPZl09XCJwYW5lbHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInBhbmVsQ29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNwbGl0dGVyLWd1dHRlclwiICpuZ0lmPVwiaSAhPT0gKHBhbmVscy5sZW5ndGggLSAxKVwiIFtuZ1N0eWxlXT1cImd1dHRlclN0eWxlKClcIiBcbiAgICAgICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbkd1dHRlck1vdXNlRG93bigkZXZlbnQsIGkpXCIgKHRvdWNoc3RhcnQpPVwib25HdXR0ZXJUb3VjaFN0YXJ0KCRldmVudCwgaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc3BsaXR0ZXItZ3V0dGVyLWhhbmRsZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlVXJsczogWycuL3NwbGl0dGVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5wLXNwbGl0dGVyLXBhbmVsLW5lc3RlZF0nOiAnbmVzdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXIge1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3RhdGVTdG9yYWdlOiBzdHJpbmcgPSBcInNlc3Npb25cIjtcblxuICAgIEBJbnB1dCgpIHN0YXRlS2V5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSBcImhvcml6b250YWxcIjtcblxuICAgIEBJbnB1dCgpIGd1dHRlclNpemU6IG51bWJlciA9IDQ7XG5cbiAgICBASW5wdXQoKSBwYW5lbFNpemVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgQElucHV0KCkgbWluU2l6ZXM6IG51bWJlcltdID0gW107XG5cbiAgICBAT3V0cHV0KCkgb25SZXNpemVFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBuZXN0ZWQgPSBmYWxzZTtcblxuICAgIHBhbmVscyA9IFtdO1xuXG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIG1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcblxuICAgIG1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG5cbiAgICB0b3VjaE1vdmVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICB0b3VjaEVuZExpc3RlbmVyID0gbnVsbDtcblxuICAgIHNpemUgPSBudWxsO1xuXG4gICAgZ3V0dGVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBzdGFydFBvcyA9IG51bGw7XG5cbiAgICBwcmV2UGFuZWxFbGVtZW50ID0gbnVsbDtcblxuICAgIG5leHRQYW5lbEVsZW1lbnQgPSBudWxsO1xuXG4gICAgbmV4dFBhbmVsU2l6ZSA9IG51bGw7XG5cbiAgICBwcmV2UGFuZWxTaXplID0gbnVsbDtcblxuICAgIF9wYW5lbFNpemVzID0gbnVsbDtcblxuICAgIHByZXZQYW5lbEluZGV4ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmVzdGVkID0gdGhpcy5pc05lc3RlZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncGFuZWwnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5wdXNoKGl0ZW0udGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5wdXNoKGl0ZW0udGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWxzICYmIHRoaXMucGFuZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplZCA9IHRoaXMucmVzdG9yZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4udGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuXS5maWx0ZXIoY2hpbGQgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XG4gICAgICAgICAgICAgICAgbGV0IF9wYW5lbFNpemVzID0gW107XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbHMubWFwKChwYW5lbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFuZWxJbml0aWFsU2l6ZSA9IHRoaXMucGFuZWxTaXplcy5sZW5ndGggLTEgPj0gaSA/IHRoaXMucGFuZWxTaXplc1tpXTogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhbmVsU2l6ZSA9IHBhbmVsSW5pdGlhbFNpemUgfHwgKDEwMCAvIHRoaXMucGFuZWxzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIF9wYW5lbFNpemVzW2ldID0gcGFuZWxTaXplO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgcGFuZWxTaXplICsgJyUgLSAnICsgKCh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBfcGFuZWxTaXplcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMuZ3V0dGVyRWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSA6IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHRoaXMuaG9yaXpvbnRhbCgpID8gKGV2ZW50LnBhZ2VYIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYKSA6IChldmVudC5wYWdlWSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSk7XG4gICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudCA9IHRoaXMuZ3V0dGVyRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLm5leHRQYW5lbEVsZW1lbnQgPSB0aGlzLmd1dHRlckVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLnByZXZQYW5lbFNpemUgPSAxMDAgKiAodGhpcy5ob3Jpem9udGFsKCkgPyBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5wcmV2UGFuZWxFbGVtZW50LCB0cnVlKTogRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnByZXZQYW5lbEVsZW1lbnQsIHRydWUpKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxTaXplID0gMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSk6IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5uZXh0UGFuZWxFbGVtZW50LCB0cnVlKSkgLyB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBpbmRleDtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNwbGl0dGVyLXJlc2l6aW5nJyk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG5ld1BvcztcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKVxuICAgICAgICAgICAgbmV3UG9zID0gKChldmVudC5wYWdlWCB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCkgICogMTAwIC8gdGhpcy5zaXplKSAtICh0aGlzLnN0YXJ0UG9zICogMTAwIC8gdGhpcy5zaXplKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3UG9zID0gKChldmVudC5wYWdlWSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSkgICogMTAwIC8gdGhpcy5zaXplKSAtICh0aGlzLnN0YXJ0UG9zICogMTAwIC8gdGhpcy5zaXplKTtcblxuICAgICAgICBsZXQgbmV3UHJldlBhbmVsU2l6ZSA9IHRoaXMucHJldlBhbmVsU2l6ZSArIG5ld1BvcztcbiAgICAgICAgbGV0IG5ld05leHRQYW5lbFNpemUgPSB0aGlzLm5leHRQYW5lbFNpemUgLSBuZXdQb3M7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplLCBuZXdOZXh0UGFuZWxTaXplKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50LnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBuZXdQcmV2UGFuZWxTaXplICsgJyUgLSAnICsgKCh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSkgKyAncHgpJztcbiAgICAgICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3TmV4dFBhbmVsU2l6ZSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzW3RoaXMucHJldlBhbmVsSW5kZXhdID0gbmV3UHJldlBhbmVsU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbdGhpcy5wcmV2UGFuZWxJbmRleCArIDFdID0gbmV3TmV4dFBhbmVsU2l6ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUVuZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMub25SZXNpemVFbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHNpemVzOiB0aGlzLl9wYW5lbFNpemVzfSlcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmd1dHRlckVsZW1lbnQsICdwLXNwbGl0dGVyLWd1dHRlci1yZXNpemluZycpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdwLXNwbGl0dGVyLXJlc2l6aW5nJyk7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBvbkd1dHRlck1vdXNlRG93bihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaFN0YXJ0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSl7XG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplU3RhcnQoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYmluZFRvdWNoTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkd1dHRlclRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgdGhpcy51bmJpbmRUb3VjaExpc3RlbmVycygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHZhbGlkYXRlUmVzaXplKG5ld1ByZXZQYW5lbFNpemUsIG5ld05leHRQYW5lbFNpemUpIHtcbiAgICAgICAgaWYgKHRoaXMubWluU2l6ZXMubGVuZ3RoID49IDEgJiYgdGhpcy5taW5TaXplc1swXSAmJiB0aGlzLm1pblNpemVzWzBdID4gbmV3UHJldlBhbmVsU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWluU2l6ZXMubGVuZ3RoID4gMSAmJiB0aGlzLm1pblNpemVzWzFdICYmIHRoaXMubWluU2l6ZXNbMV0gPiBuZXdOZXh0UGFuZWxTaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBiaW5kTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMudG91Y2hNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIgPSBldmVudCA9PiB0aGlzLm9uUmVzaXplKGV2ZW50KVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudG91Y2hFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50b3VjaEVuZExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZFRvdWNoTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRUb3VjaExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy50b3VjaE1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b3VjaEVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsU2l6ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ3V0dGVyRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlBhbmVsSW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIGlzTmVzdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKHBhcmVudCwgJ3Atc3BsaXR0ZXInKSkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50ICE9PSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlzU3RhdGVmdWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlS2V5ICE9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgc3dpdGNoKHRoaXMuc3RhdGVTdG9yYWdlKSB7XG4gICAgICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgICAgICAgICAgIGNhc2UgJ3Nlc3Npb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuc3RhdGVTdG9yYWdlICsgJyBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIHN0YXRlIHN0b3JhZ2UsIHN1cHBvcnRlZCB2YWx1ZXMgYXJlIFwibG9jYWxcIiBhbmQgXCJzZXNzaW9uXCIuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZ2V0U3RvcmFnZSgpLnNldEl0ZW0odGhpcy5zdGF0ZUtleSwgSlNPTi5zdHJpbmdpZnkodGhpcy5fcGFuZWxTaXplcykpO1xuICAgIH1cblxuICAgIHJlc3RvcmVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuICAgICAgICBjb25zdCBzdGF0ZVN0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0YXRlS2V5KTtcblxuICAgICAgICBpZiAoc3RhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXMgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IFsuLi50aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuXS5maWx0ZXIoY2hpbGQgPT4gRG9tSGFuZGxlci5oYXNDbGFzcyhjaGlsZCwgJ3Atc3BsaXR0ZXItcGFuZWwnKSk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNoaWxkLnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyB0aGlzLl9wYW5lbFNpemVzW2ldICsgJyUgLSAnICsgKCh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSkgKyAncHgpJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNwbGl0dGVyIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLWhvcml6b250YWwnOiB0aGlzLmxheW91dCA9PT0gXCJob3Jpem9udGFsXCIsXG4gICAgICAgICAgICAncC1zcGxpdHRlci12ZXJ0aWNhbCc6IHRoaXMubGF5b3V0ID09PSBcInZlcnRpY2FsXCJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYW5lbENvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItcGFuZWwnOiB0cnVlLFxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItcGFuZWwtbmVzdGVkJzogdHJ1ZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGd1dHRlclN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsKCkpXG4gICAgICAgICAgICByZXR1cm4ge3dpZHRoOiB0aGlzLmd1dHRlclNpemUgKyAncHgnfTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHtoZWlnaHQ6IHRoaXMuZ3V0dGVyU2l6ZSArICdweCd9O1xuICAgIH1cblxuICAgIGhvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU3BsaXR0ZXIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXR0ZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyTW9kdWxlIHsgfVxuIl19