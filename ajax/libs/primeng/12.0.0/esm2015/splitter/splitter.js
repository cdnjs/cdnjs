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
            newPos = (event.pageX * 100 / this.size) - (this.startPos * 100 / this.size);
        else
            newPos = (event.pageY * 100 / this.size) - (this.startPos * 100 / this.size);
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
            this.touchMoveListener = event => this.onResize(event.changedTouches[0]);
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
Splitter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Splitter, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
Splitter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.4", type: Splitter, selector: "p-splitter", inputs: { styleClass: "styleClass", panelStyleClass: "panelStyleClass", style: "style", panelStyle: "panelStyle", stateStorage: "stateStorage", stateKey: "stateKey", layout: "layout", gutterSize: "gutterSize", panelSizes: "panelSizes", minSizes: "minSizes" }, outputs: { onResizeEnd: "onResizeEnd" }, host: { properties: { "class.p-splitter-panel-nested": "nested" } }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: Splitter, decorators: [{
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
SplitterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SplitterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SplitterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SplitterModule, declarations: [Splitter], imports: [CommonModule], exports: [Splitter, SharedModule] });
SplitterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SplitterModule, imports: [[CommonModule], SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.4", ngImport: i0, type: SplitterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Splitter, SharedModule],
                    declarations: [Splitter]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXR0ZXIvc3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBeUQsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaE4sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQXdCMUQsTUFBTSxPQUFPLFFBQVE7SUE0RGpCLFlBQW1CLEVBQXFCLEVBQVUsRUFBYztRQUE3QyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFsRHZELGlCQUFZLEdBQVcsU0FBUyxDQUFDO1FBRWpDLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsV0FBTSxHQUFXLFlBQVksQ0FBQztRQUU5QixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUsR0FBYSxFQUFFLENBQUM7UUFFMUIsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUV2QixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTlELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFZixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVosYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFekIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRXpCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUV4QixTQUFJLEdBQUcs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UUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7S0FZVDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUM3QixJQUFJLEVBQUU7d0JBQ0YsaUNBQWlDLEVBQUUsUUFBUTtxQkFDOUM7aUJBQ0o7aUlBR1ksVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxlQUFlO3NCQUF2QixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkFFeUIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhO2dCQUVhLGtCQUFrQjtzQkFBNUQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQStTN0MsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkF6VWQsUUFBUSxhQXFVUCxZQUFZLGFBclViLFFBQVEsRUFzVUcsWUFBWTs0R0FHdkIsY0FBYyxZQUpkLENBQUMsWUFBWSxDQUFDLEVBQ0gsWUFBWTsyRkFHdkIsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBQ2pDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNwbGl0dGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcGFuZWwgbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwicGFuZWxDb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhbmVsXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtc3BsaXR0ZXItZ3V0dGVyXCIgKm5nSWY9XCJpICE9PSAocGFuZWxzLmxlbmd0aCAtIDEpXCIgW25nU3R5bGVdPVwiZ3V0dGVyU3R5bGUoKVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25HdXR0ZXJNb3VzZURvd24oJGV2ZW50LCBpKVwiICh0b3VjaHN0YXJ0KT1cIm9uR3V0dGVyVG91Y2hTdGFydCgkZXZlbnQsIGkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNwbGl0dGVyLWd1dHRlci1oYW5kbGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBzdHlsZVVybHM6IFsnLi9zcGxpdHRlci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucC1zcGxpdHRlci1wYW5lbC1uZXN0ZWRdJzogJ25lc3RlZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogc3RyaW5nID0gXCJzZXNzaW9uXCI7XG5cbiAgICBASW5wdXQoKSBzdGF0ZUtleTogc3RyaW5nID0gbnVsbDtcblxuICAgIEBJbnB1dCgpIGxheW91dDogc3RyaW5nID0gXCJob3Jpem9udGFsXCI7XG5cbiAgICBASW5wdXQoKSBndXR0ZXJTaXplOiBudW1iZXIgPSA0O1xuXG4gICAgQElucHV0KCkgcGFuZWxTaXplczogbnVtYmVyW10gPSBbXTtcblxuICAgIEBJbnB1dCgpIG1pblNpemVzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgQE91dHB1dCgpIG9uUmVzaXplRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBuZXN0ZWQgPSBmYWxzZTtcblxuICAgIHBhbmVscyA9IFtdO1xuXG4gICAgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIG1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcblxuICAgIG1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG5cbiAgICB0b3VjaE1vdmVMaXN0ZW5lciA9IG51bGw7XG5cbiAgICB0b3VjaEVuZExpc3RlbmVyID0gbnVsbDtcblxuICAgIHNpemUgPSBudWxsO1xuXG4gICAgZ3V0dGVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBzdGFydFBvcyA9IG51bGw7XG5cbiAgICBwcmV2UGFuZWxFbGVtZW50ID0gbnVsbDtcblxuICAgIG5leHRQYW5lbEVsZW1lbnQgPSBudWxsO1xuXG4gICAgbmV4dFBhbmVsU2l6ZSA9IG51bGw7XG5cbiAgICBwcmV2UGFuZWxTaXplID0gbnVsbDtcblxuICAgIF9wYW5lbFNpemVzID0gbnVsbDtcblxuICAgIHByZXZQYW5lbEluZGV4ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmVzdGVkID0gdGhpcy5pc05lc3RlZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncGFuZWwnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhbmVscy5wdXNoKGl0ZW0udGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLnB1c2goaXRlbS50ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5wYW5lbHMgJiYgdGhpcy5wYW5lbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVkID0gdGhpcy5yZXN0b3JlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IFsuLi50aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5dLmZpbHRlcihjaGlsZCA9PiBEb21IYW5kbGVyLmhhc0NsYXNzKGNoaWxkLCAncC1zcGxpdHRlci1wYW5lbCcpKTtcbiAgICAgICAgICAgICAgICBsZXQgX3BhbmVsU2l6ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxzLm1hcCgocGFuZWwsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhbmVsSW5pdGlhbFNpemUgPSB0aGlzLnBhbmVsU2l6ZXMubGVuZ3RoIC0xID49IGkgPyB0aGlzLnBhbmVsU2l6ZXNbaV06IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYW5lbFNpemUgPSBwYW5lbEluaXRpYWxTaXplIHx8ICgxMDAgLyB0aGlzLnBhbmVscy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBfcGFuZWxTaXplc1tpXSA9IHBhbmVsU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uc3R5bGUuZmxleEJhc2lzID0gJ2NhbGMoJyArIHBhbmVsU2l6ZSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gX3BhbmVsU2l6ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCkge1xuICAgICAgICB0aGlzLmd1dHRlckVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLmhvcml6b250YWwoKSA/IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkgOiBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRQb3MgPSB0aGlzLmhvcml6b250YWwoKSA/IChldmVudC5wYWdlWCB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCkgOiAoZXZlbnQucGFnZVkgfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkpO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEVsZW1lbnQgPSB0aGlzLmd1dHRlckVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxFbGVtZW50ID0gdGhpcy5ndXR0ZXJFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxTaXplID0gMTAwICogKHRoaXMuaG9yaXpvbnRhbCgpID8gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucHJldlBhbmVsRWxlbWVudCwgdHJ1ZSk6IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wcmV2UGFuZWxFbGVtZW50LCB0cnVlKSkgLyB0aGlzLnNpemU7XG4gICAgICAgIHRoaXMubmV4dFBhbmVsU2l6ZSA9IDEwMCAqICh0aGlzLmhvcml6b250YWwoKSA/IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLm5leHRQYW5lbEVsZW1lbnQsIHRydWUpOiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMubmV4dFBhbmVsRWxlbWVudCwgdHJ1ZSkpIC8gdGhpcy5zaXplO1xuICAgICAgICB0aGlzLnByZXZQYW5lbEluZGV4ID0gaW5kZXg7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5ndXR0ZXJFbGVtZW50LCAncC1zcGxpdHRlci1ndXR0ZXItcmVzaXppbmcnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zcGxpdHRlci1yZXNpemluZycpO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdQb3M7XG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWwoKSlcbiAgICAgICAgICAgIG5ld1BvcyA9IChldmVudC5wYWdlWCAqIDEwMCAvIHRoaXMuc2l6ZSkgLSAodGhpcy5zdGFydFBvcyAqIDEwMCAvIHRoaXMuc2l6ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld1BvcyA9IChldmVudC5wYWdlWSAgKiAxMDAgLyB0aGlzLnNpemUpIC0gKHRoaXMuc3RhcnRQb3MgKiAxMDAgLyB0aGlzLnNpemUpO1xuXG4gICAgICAgIGxldCBuZXdQcmV2UGFuZWxTaXplID0gdGhpcy5wcmV2UGFuZWxTaXplICsgbmV3UG9zO1xuICAgICAgICBsZXQgbmV3TmV4dFBhbmVsU2l6ZSA9IHRoaXMubmV4dFBhbmVsU2l6ZSAtIG5ld1BvcztcblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVJlc2l6ZShuZXdQcmV2UGFuZWxTaXplLCBuZXdOZXh0UGFuZWxTaXplKSkge1xuICAgICAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50LnN0eWxlLmZsZXhCYXNpcyA9ICdjYWxjKCcgKyBuZXdQcmV2UGFuZWxTaXplICsgJyUgLSAnICsgKCh0aGlzLnBhbmVscy5sZW5ndGggLSAxKSAqIHRoaXMuZ3V0dGVyU2l6ZSkgKyAncHgpJztcbiAgICAgICAgICAgIHRoaXMubmV4dFBhbmVsRWxlbWVudC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgbmV3TmV4dFBhbmVsU2l6ZSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzW3RoaXMucHJldlBhbmVsSW5kZXhdID0gbmV3UHJldlBhbmVsU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3BhbmVsU2l6ZXNbdGhpcy5wcmV2UGFuZWxJbmRleCArIDFdID0gbmV3TmV4dFBhbmVsU2l6ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2l6ZUVuZChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUmVzaXplRW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBzaXplczogdGhpcy5fcGFuZWxTaXplc30pXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ndXR0ZXJFbGVtZW50LCAncC1zcGxpdHRlci1ndXR0ZXItcmVzaXppbmcnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zcGxpdHRlci1yZXNpemluZycpO1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgb25HdXR0ZXJNb3VzZURvd24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIHRoaXMub25SZXNpemVTdGFydChldmVudCwgaW5kZXgpO1xuICAgICAgICB0aGlzLmJpbmRNb3VzZUxpc3RlbmVycygpO1xuICAgIH1cblxuICAgIG9uR3V0dGVyVG91Y2hTdGFydChldmVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpe1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZVN0YXJ0KGV2ZW50LCBpbmRleCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRUb3VjaExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25HdXR0ZXJUb3VjaEVuZChldmVudCkge1xuICAgICAgICB0aGlzLnJlc2l6ZUVuZChldmVudCk7XG4gICAgICAgIHRoaXMudW5iaW5kVG91Y2hMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSlcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVSZXNpemUobmV3UHJldlBhbmVsU2l6ZSwgbmV3TmV4dFBhbmVsU2l6ZSkge1xuICAgICAgICBpZiAodGhpcy5taW5TaXplcy5sZW5ndGggPj0gMSAmJiB0aGlzLm1pblNpemVzWzBdICYmIHRoaXMubWluU2l6ZXNbMF0gPiBuZXdQcmV2UGFuZWxTaXplKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5taW5TaXplcy5sZW5ndGggPiAxICYmIHRoaXMubWluU2l6ZXNbMV0gJiYgdGhpcy5taW5TaXplc1sxXSA+IG5ld05leHRQYW5lbFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGJpbmRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyID0gZXZlbnQgPT4gdGhpcy5vblJlc2l6ZShldmVudClcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVFbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kVG91Y2hMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy50b3VjaE1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy50b3VjaE1vdmVMaXN0ZW5lciA9IGV2ZW50ID0+IHRoaXMub25SZXNpemUoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0pXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNoTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50b3VjaEVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5kTGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVFbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kVG91Y2hMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZFRvdWNoTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy50b3VjaE1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLnRvdWNoTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvdWNoRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMudG91Y2hFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpemUgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXJ0UG9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxTaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0UGFuZWxTaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5ndXR0ZXJFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2UGFuZWxJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgaXNOZXN0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgIURvbUhhbmRsZXIuaGFzQ2xhc3MocGFyZW50LCAncC1zcGxpdHRlcicpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1N0YXRlZnVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZUtleSAhPSBudWxsO1xuICAgIH1cblxuICAgIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLnN0YXRlU3RvcmFnZSkge1xuICAgICAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgICAgICAgICBjYXNlICdzZXNzaW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnN0YXRlU3RvcmFnZSArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBzdGF0ZSBzdG9yYWdlLCBzdXBwb3J0ZWQgdmFsdWVzIGFyZSBcImxvY2FsXCIgYW5kIFwic2Vzc2lvblwiLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKCkge1xuICAgICAgICB0aGlzLmdldFN0b3JhZ2UoKS5zZXRJdGVtKHRoaXMuc3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHRoaXMuX3BhbmVsU2l6ZXMpKTtcbiAgICB9XG5cbiAgICByZXN0b3JlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5zdGF0ZUtleSk7XG5cbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9wYW5lbFNpemVzID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4udGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGNoaWxkID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoY2hpbGQsICdwLXNwbGl0dGVyLXBhbmVsJykpO1xuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zdHlsZS5mbGV4QmFzaXMgPSAnY2FsYygnICsgdGhpcy5fcGFuZWxTaXplc1tpXSArICclIC0gJyArICgodGhpcy5wYW5lbHMubGVuZ3RoIC0gMSkgKiB0aGlzLmd1dHRlclNpemUpICsgJ3B4KSc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1zcGxpdHRlciBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1zcGxpdHRlci1ob3Jpem9udGFsJzogdGhpcy5sYXlvdXQgPT09IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgJ3Atc3BsaXR0ZXItdmVydGljYWwnOiB0aGlzLmxheW91dCA9PT0gXCJ2ZXJ0aWNhbFwiXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFuZWxDb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLXNwbGl0dGVyLXBhbmVsLW5lc3RlZCc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBndXR0ZXJTdHlsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbCgpKVxuICAgICAgICAgICAgcmV0dXJuIHt3aWR0aDogdGhpcy5ndXR0ZXJTaXplICsgJ3B4J307XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB7aGVpZ2h0OiB0aGlzLmd1dHRlclNpemUgKyAncHgnfTtcbiAgICB9XG5cbiAgICBob3Jpem9udGFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJztcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NwbGl0dGVyLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1NwbGl0dGVyXVxufSlcbmV4cG9ydCBjbGFzcyBTcGxpdHRlck1vZHVsZSB7IH1cbiJdfQ==